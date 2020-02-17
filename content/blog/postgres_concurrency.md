---
title: Postgres Concurrency
date: 2020-02-16
description: Understanding concurrency in Postgres, and how it relates to async libraries like Piccolo.
---

Let's imagine you have an async web app, and several connections are waiting on database queries - what's actually going on?

The way you execute queries is via a __connection__. You request a connection from the database adapter. In order to provide this connection, the adapter obviously connects to the database server. A database server is configured to only support a certain number of connections at a time. If this limit is exceeded then you'll get an error.

The Postgres server [creates an operating system process for each connection](https://www.postgresql.org/docs/current/tutorial-arch.html). If you hammer a database with connections, and do `ps aux | grep postgres` on the command line, then you'll see them.

## Resources

 * [Good overview of Postgres connections](https://brandur.org/postgres-connections)
