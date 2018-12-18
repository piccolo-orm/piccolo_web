# Playground

Piccolo ships with a handy command called `playground`.

It will create an example schema for you, and populate it with data, then launches an iPython shell.

You can follow along with the tutorials without first learning advanced concepts like migrations.

It's a nice place to experiment with querying / inserting / data using Piccolo, no matter what stage you're at.

<em>Each time you launch the playground it flushes out the existing tables and rebuilds them.</em>

## Installing Postgres

Unfortunately, Playground can't setup Postgres and the database for you, so we need to do that first.

### Mac

The quickest way to get Postgres up and running on the Mac is using [Postgres.app](https://postgresapp.com/).

## Create database

By default the playground expects a local database to exist with the following credentials:
