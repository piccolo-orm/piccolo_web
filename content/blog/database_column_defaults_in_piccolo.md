---
title: Database column defaults in Piccolo
date: 2020-06-26
description: Understanding the design decisions behing default values for database columns in Piccolo.
draft: false
---

When building Piccolo, the issue of database column default values came up,
and it's a surprisingly tricky subject, which required some thought.

Default values serve two very important purposes:

 1. New row defaults - allows certain values to be omitted when inserting new rows.
 1. New column defaults - allows a user to add non-nullable columns to an existing table.

Let's look at these in some more detail.

## 1. New row defaults

When adding a new row to the database we sometimes want to omit certain
values, and let the ORM or database fill it in for us. A common example is
a 'created_on' column, which we want to default to the current date and time.

There are two options for how to handle this. One is for the ORM itself to
provide the defaults, and the other is to let the database provide the
defaults.

The ORM approach sets the defaults before insertion, while the database approach
inserts the defaults during insertion. The benefit of the ORM approach, is let's
say you're building a form, you can pre-populate the form with the default
values, rather than just having them blank. The downside of the ORM approach
is the defaults can become stale. Let's take the 'created_on' example - the
value which is saved isn't when it was inserted into the database, but rather
when the ORM instantiated the default. Most of the time this doesn't matter
much, but I can imagine use cases where storing the precise creation time in
the database would be important.

If we let the database handle the defaults, there are some advantages. The
performance is likely to be marginally better. More of the logic is encoded
in the database, rather than the application layer. This means that if the ORM
is bypassed, there is greater consistency. The downside of letting the database
handle defaults is you don't have as much control, and the previously mentioned
use case of pre-populating defaults in a form.

### Static vs dynamic defaults

Static defaults are very easy for an ORM to handle. Lets say you're building
a game, and need a 'player' table. The 'score' column will have a default of 0,
which will be the same for each player.

Dynamic defaults on the other hand are challenging. In Django, you're able to
provide a function as a default. In some respects this is good, because it
gives the programmer a lot of control. But on the other hand, allowing code
of potentially unlimited complexity as a default can cause issues. For example,
if the default code triggers other database queries. Or if it pulls in a lot of
dependencies.

The last point is most pertinent with migrations. The golden rule of migrations
is we want them to be self contained, and decoupled as much as possible from
the wider application code. This is because we want someone who runs the
migrations in the future to get the exact same results, even if the wider
application code has subsequently changed.

Some dynamic defaults are tricky to avoid - for example timestamps and UUIDs.
But since they're fairly universal, we can handle these use cases without
the user needing to write custom code.

## 2. New column defaults

If you're adding a new column, which is not nullable, you need to set default
values for all existing rows.

The easiest solution is just to the set the ``DEFAULT`` on the ``ADD COLUMN``
statement. For example:

```sql
ALTER TABLE person ADD COLUMN name VARCHAR DEFAULT '';
```

This will then backfill any existing rows with the default value.

If you were only using the ORM to populate defaults, you'd have to add the
column as nullable, use the ORM to populate the new default values, and
then switch it back to being non-nullable.

Alternatively, what Django does is it adds the default value to the ``DEFAULT``
clause on the ``ADD COLUMN`` statement, but then immediately removes it in the
same transaction once the backfill is complete. Like this:

```sql
BEGIN;
ALTER TABLE person ADD COLUMN name VARCHAR DEFAULT '';
ALTER TABLE person ALTER COLUMN name DROP DEFAULT;
COMMIT;
```

## How Piccolo handles defaults

Piccolo takes a hybrid approach.

Piccolo populates the default clause when adding a column to the database, so
if you were to bypass the ORM, the defaults will still be populated.

But when using the ORM to insert new rows, the defaults are populated in Python.
This solves the aforementioned use case of populating forms with default
values. In the future it might be possible to disable this behavior, and to
only ever use the database defaults.

## Piccolo default values

These are the sorts of defaults which Piccolo allows:

 1. Static values - e.g. `1`, `'a'`, `datetime.datetime(year=2020, month=1, day=1)`
 1. Predefined dynamic defaults

### 1. Static values

When defining a Piccolo column, it will check if the default is a static value,
and if it's of the correct type then it's allowed.

### 2. Predefined dynamic defaults

Some column types come with an associated ``Enum``, which covers common dynamic
defaults. For example ``TimestampDefault.now``, which under the hood will call
``datetime.datetime.now``. And ``UUIDDefault.uuid4``, which under the hood
will call ``uuid.uui4``.

By using an ``Enum``, it's easier to serialise the defaults in migrations.

It also means we can translate the default into SQL if necessary. So
``TimestampDefault.now`` maps to ``current_timestamp`` in Postgres.

### What if I have more complex use cases?

If you need very complex default values, these are best handled in the
application code. So for example, an endpoint can detect if a value wasn't
provided, and can add it.

## Conclusions

Hopefully that's been a useful insight into how Piccolo handles defaults.
