# ORM design challenges

Building ORMs isn't the easiest thing in the world. Based on past experience working on similar projects, I knew it wasn't impossible though.

Fundamentally an ORM is just a mechanism for converting Python objects into SQL strings, sending them to a database adapter, and converting the response back into Python objects. However, there are some subtleties which are challenging.

## Designing a nice API

This is perhaps the most important consideration when designing an ORM. Making something as user friendly and powerful as possible.

## SQL injection prevention

When generating SQL strings, the ORM needs to be careful not to include raw user input within the string - instead it should be parameterised.

```sql
-- This is OK:
SELECT * from user WHERE username = $1

-- If username = "1; DROP TABLE users", and the query wasn't parameterised:
SELECT * from user WHERE username = 1; DROP TABLE users
```

This sounds simple enough, but is quite challenging.

## Joins

There's two options for joins - either let the user specify joins explicitly, or do it for them automatically.

In Piccolo, joins are done automatically.

```python
Band.select.columns(Band.manager_1.name).run_sync()
```

In order to get the name of `manager_1`, a join is required. There are other situations which require joins. For example:

```python
Band.select.where(Band.manager_1.name == 'Guido').run_sync()
```

Piccolo has to manage the joins under the hood to make this happen.

## Large selects

Queries such as this:

```python
Band.select.run_sync()
```

Which fetch all rows from a table, could return thousands or millions of rows. The ORM needs to handle this under the hood using cursors - fetching data in chunks.

## Documentation and testing

Believe it or not, documentation is also a big challenge. ORMs are fairly large projects, with a broad API. Documenting all of the features and subtleties in an easy to understand way is time consuming. The same is true for tests - which need to be extensive.

## Avoiding complexity explosion

Keeping the codebase maintainable is a challenge. Many existing ORMs are almost completely impenetrable for newcomers who want to deep dive into the code base.

## Conclusions

None of these challenges are insumountable, but I thought it would be an interesting read for others, to help explain some of the challenges of ORM design.
