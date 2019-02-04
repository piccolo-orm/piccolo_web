# Why choose Piccolo?

This is a quick overview of the most popular Python ORMs, along with their strengths and weaknesses, and why you might want to choose Piccolo for your project.

## SQLAlchemy

Advantages:

 * The swiss army knife of ORMs - supports a lot of database features.
 * Automatic migrations
 * Standalone

Downsides:

 * Steep learning curve

## Django

Advantages:

 * Automatic migrations
 * Easy to learn the basics, but surprising depth
 * Integration with testing framework
 * Admin integration

Downsides:

 * Tricky to use it standalone.
 * Some unintuitive syntax, such as group by.

## Peewee

Advantages:

 * Simple
 * Standalone

Downsides:

 * Limited migration support (not automatic)

## Piccolo

The main reason you'd pick Piccolo is if you need asyncio support. The Django ORM is the only one which [might support this](https://www.aeracode.org/2018/06/04/django-async-roadmap/) in the future, but traditionally it has been hard to use the Django ORM in a standalone project.

Piccolo prioritises ease of use over supporting a large number of databases and features. It attempts to cover 90% of queries you're likely to do on a database, and encourages you to drop down to SQL when required.

The syntax attempts to be as close to SQL as possible. This lessens the learning curve for people with SQL experience, and means they won't have to learn a bunch of new abstractions on top of something they're already familiar with.

An ORM by itself isn't sufficient, so the following batteries are included:

* Migration support
* A user model
* Test runner

Piccolo also supports the [asyncpg](https://github.com/MagicStack/asyncpg) database driver, which is exceptionally fast.
