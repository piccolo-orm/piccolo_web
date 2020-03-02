---
title: Database migrations
date: 2020-03-02
description: A look at different approaches to migrating a database.
draft: false
---

In my experience, one of the most important features for a database library is migrations.

In a team environment, migrations allow developers to share schema changes through source control, which means other developers can easily apply the changes locally, without breaking their flow.

When it's time to deploy to production, migrations provide a simple mechanism for bringing the database up to date.

If using Docker, you can even run the migration command automatically when restarting your application's container (by using a custom entrypoint script), which ensures your code and database are in sync.

Different frameworks implement migrations in different ways, which is what we'll look at now.

## Django style

Django has a robust migration framework. You define your schema in a models.py file. By running `manage.py makemigrations`, Django inspects your models.py for any changes, and creates a corresponding migration file if required. You run the migrations using `manage.py migrate`.

What's great is how automated it is - for most common use cases, as long as you know those two management commands, you don't have to think much more about migrations.

I've personally worked on dozens of Django projects, and have rarely encountered any issues.

## Hand written SQL

Some developers use a standalone migration framework like [Flyway](https://flywaydb.org/). You create migration files manually, and they contain pure SQL. This gives the developer the ultimate control, but is more time consuming than something like Django. Also, if you wanted to write pure SQL migrations using Django, then you can do so using [data migrations](https://docs.djangoproject.com/en/3.0/topics/migrations/#data-migrations). The advantage is Flyway isn't tied to any particular framework, and as it uses plain SQL it's portable, even if you were to completely change your web framework and programming language.

Is it worth the productivity trade-off of having to hand code each migration? For some large enterprise teams it might be worth it, but for simple use cases it's probably overkill if your language or framework of choice provides something more automated.

## Idempotent / diffing / compare / state

There are some tools which take a very different approach. There doesn't seem to be a universal name for them yet, but they work on similar principals. They compare a database with a reference schema, and automatically works out the required DML statements to make them match.

There are a few examples, with varying support for different databases:

 * [Skeema](https://github.com/skeema/skeema)
 * [sqldef](https://github.com/k0kubun/sqldef/)
 * [migra](https://github.com/djrobstep/migra)

In theory, your database could be at any starting state, and it can be migrated to the desired state.

## Which is best?

The best is some kind of hybrid.

A pure state based solution will sort out the schema for you, but sometimes you want to change the data too. Migrations have an advantage here.

I have most experience with the Django style migrations, but will explore the state based migrations more in the near future.

## Resources

Here's a good video comparing different migration approaches:

 * http://dlmconsultants.com/model-vs-mig/

And a mega thread about people's favourite migration systems on Hacker News:

 * https://news.ycombinator.com/item?id=19880334
