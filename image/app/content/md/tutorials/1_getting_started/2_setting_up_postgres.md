# Installing Postgres

Make sure Postgres is installed and running before you proceed any further.

## Mac, Ubuntu, Windows

The quickest way to get Postgres up and running on the Mac is using [Postgres.app](https://postgresapp.com/).

On Ubuntu you can use [apt](https://help.ubuntu.com/community/PostgreSQL).

For Windows, you can use a package manager like [chocolatey](https://chocolatey.org/packages/postgresql).

## Postgres version

Piccolo is currently tested against Postgres 9.6, 10.6, and 11.1 so it's recommended to use one of those. To check all supported versions, see the [Travis file](https://github.com/piccolo-orm/piccolo/blob/master/.travis.yml).

## What about other databases?

At the moment the focus is on providing the best Postgres experience possible. Other databases may be supported in the future.
