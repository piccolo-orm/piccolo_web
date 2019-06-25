# Playground

Piccolo ships with a handy command called `playground`, which is a great way to learn the basics.

<pre><code class="language-bash">
piccolo playground --help

</code></pre>

It will create an example schema for you, populate it with data, and launch an [iPython](https://ipython.org/) shell.

You can follow along with the tutorials without first learning advanced concepts like migrations.

It's a nice place to experiment with querying / inserting / deleting data using Piccolo, no matter what stage you're at.

<em>Each time you launch the playground it flushes out the existing tables and rebuilds them, so don't use it for anything permanent!</em>

## SQLite

SQLite is used by default, which provides a zero config way of getting started.

A piccolo.sqlite file will get created in the current directory.

## Postgres

If you want to use Postgres instead, you need to create a database first and specify the database flag:

```bash
piccolo playground --engine=postgres
```

### Setting up Postgres

See the [setting up Postgres tutorial](/tutorial/getting-started/setting-up-postgres/).

### Create database

By default the playground expects a local database to exist with the following credentials:

```bash
user: "piccolo"
password: "piccolo"
host: "localhost"  # or 127.0.0.1
database: "piccolo_playground"
port: 5432
```

You can create a database using [pgAdmin](https://www.pgadmin.org/).

If you want to use different credentials, you can pass them into the playground command (use `piccolo playground --help` for details).

## Schema

The schema generated in the playground represents fictional bands and their concerts.

When the playground is started it prints out the available tables.

Give these queries a go:

```python
Band.select.run_sync()
Band.objects.run_sync()
Band.select.columns(Band.name).run_sync()
Band.select.columns(Band.name, Band.manager.name).run_sync()
```

## Auto completion is your friend

Piccolo was designed to make auto completion available in as many situations as possible.

For example, rather than using strings to specify columns, we always refer to the column object on the table.

```python
# We use this:
Band.select.columns(Band.name).run_sync()

# Instead of something like this:
Band.select.columns('name').run_sync()
```

This means you can do `Band. + TAB`  to see the available columns.

Using auto completion will help avoid errors, and speed up your coding - use it!
