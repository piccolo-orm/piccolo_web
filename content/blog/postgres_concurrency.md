---
title: Postgres Concurrency
date: 2020-02-16
description: Understanding concurrency in Postgres, and how it relates to async libraries like Piccolo.
---

When using an async ORM, it's good to understand how the underlying database handles concurrency.

When Piccolo makes a query, it gets a connection from the database adapter. The Postgres server spawns a new process to handle each connection it receives. If you open up a bunch of connections to a database server, and enter `ps aux | grep postgres` on the command line, then you'll see the connection processes.

A database server is configured to only support a certain number of connections at a time. If this limit is exceeded then you'll get an error. An async web app will typically open far more database connections than a synchronous one, so it's important to use a connection pool.

In the case of Piccolo, if you configure a connection pool, then it will wait for a connection to become available in the pool, rather than making more and more connections, which will eventually cause an error.

What's really interesting is how Postgres is able to process all of those connections in a performant way. Postgres uses a concurrency model called MVCC (Multiversion Concurrency Control). It's a deep subject, but in a nutshell Postgres maintains several versions of a row internally.

Each row version has an xmin and an xmax value. Each connection is assigned an incrementing transaction ID (txid), and can see rows where xmin <= txid <= xmax. This means that other connections can insert, modify, and delete rows without affecting the other connections, as the new row versions are assigned higher xmin values.

This reduces the amount of locking required during concurrent access, which improves throughput. The downside is the database needs to be vacuumed periodically to remove old versions of rows, which have xmin and xmax which are lower than the current txid values.

In terms of tuning your Postgres server for maximum performance:

 * CPU core count - will increase the number of connection processes which can execute in parallel.
 * RAM - increasing the Postgres server's shared_buffers setting will help reduce disk reads (around 25% of total system memory is recommended).
 * Fast disk - will help prevent IO bottlenecks.

Avoid ramping up the max connection limit too high. Above a certain number it becomes counter productive, as the connections themselves consume RAM, which could otherwise be used by Postgres itself for making queries. The default is 100, which should be sufficient for most needs.

## Resources

 * [Good overview of Postgres connections](https://brandur.org/postgres-connections)
 * [Official Postgres docs](https://www.postgresql.org/docs/current/tutorial-arch.html)
