---
title: Postgres - one database to rule them all
date: 2021-04-08
description: The advantages of co-locating data in a single database - time series, spatial data, JSON and more.
draft: false
---

<img src="/images/blog/postgres_one_database/one_ring.jpg" alt="One ring" />

One of the advantages of Postgres is the many high quality extensions which makes it suitable for storing a range of data.

You can store:

 * JSON - [builtin](https://www.postgresql.org/docs/current/functions-json.html)
 * Spatial data - [PostGIS](https://postgis.net/)
 * Time series data - [TimescaleDB](https://www.timescale.com/)
 * Even graph data is in the works - [Apache AGE](https://age.apache.org/)

Without these extensions you would require many different specialised databases. Supporting multiple databases means more maintenance work.

By having all of your data in one place, it makes querying it easier. With a single SQL query you can join together time series data, spatial data, and any other relational data. If this data is spread over many databases, you need to join the data together using code, which is less performant, and more work.

There is also great convenience in only needing to learn one query language - SQL. Many specialist databases have their own query language, which take significant time and effort to learn. It's likely that a large proportion of developers on a team know at least some SQL.

By having all of your data in Postgres, it also means you can use the tools you're familiar with. If your time series data is in a separate database, it's another set of tools you need to learn. Postgres has a huge ecosystem of tools - GUIs such as [PgAdmin](https://www.pgadmin.org/), drivers for most programming languages, and ORMs / query builders like [Piccolo](https://piccolo-orm.com/)!

The extensibility of Postgres is really its killer feature. It's almost an operating system for your data. The fact that it can do so much, and does it so well, is remarkable. This is one of the reasons it's growing so quickly.

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/postgres_one_database/database_rankings.png" alt="Database rankings" />
</a>
<figcaption>Source: <a href="https://db-engines.com/en/ranking">db-engines.com</a></figcaption>
</figure>

When I'm building systems, I argue hard to use Postgres for as much as possible. It results in a more streamlined architecture, with greater developer productivity, and easier onboarding. Postgres was initially released in 1996, but it feels like it's just getting started.
