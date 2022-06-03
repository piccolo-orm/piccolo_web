---
title: A guide to managed PostgreSQL services
date: 2022-05-23
description: Why you might want to use a managed Postgres service, and which cloud provider you should use (AWS, DigitalOcean, OVH etc).
draft: false
---

In this article we're going to look at some of the managed Postgres services which are available, and why you might use one.

![Postgres managed servives](/images/blog/managed-postgres/guide_to_managed_postgres.png)

## Why consider a managed Postgres service?

Installing Postgres on a Linux server couldn't be simpler. In the case of Ubuntu, we just need to run `apt install postgresql`.

However, creating a robust production setup requires several additional steps:

- Setting up regular backups (perhaps using [pgBackRest](https://pgbackrest.org/) or [Barman](https://pgbarman.org/))
- Tuning Postgres (using [PGTune](https://pgtune.leopard.in.ua/#/))
- Installing [PgBouncer](https://www.pgbouncer.org/) for connection pooling
- Creating certificates, if you want clients to [connect over SSL](https://www.postgresql.org/docs/current/ssl-tcp.html)
- Mounting a volume, so the storage available can be scaled in the future

Things get even trickier when we need to run a cluster of Postgres servers, with a [warm standby](https://www.postgresql.org/docs/current/warm-standby.html).

This isn't a fault of Postgres - running a robust production setup is challenging, no matter which database you're using. To solve this problem there are many managed Postgres services now, offered by most major cloud providers.

## The importance of backups

When using a managed Postgres service, backups are created automatically. If you were to create your own backup system from scratch, you would have to do the following:

- Backup the data
- Monitor that your backup system is working
- Periodically test that the backups can be restored

So building a robust backup system is a fair chunk of work.

The importance of backups for databases can't be overstated. Even though you could run Postgres in production for a decade, and in 99.9% of cases experience no issues, having backups helps mitigate many disaster scenarios:

- The server hardware fails
- The [data center burns down](https://www.techradar.com/uk/news/remember-the-ovhcloud-data-center-fire-heres-why-it-was-so-bad)
- A malicious actor manages to delete or corrupt data, for example via a [SQL injection attack](https://owasp.org/www-community/attacks/SQL_Injection)
- [Human error](https://www.reddit.com/r/cscareerquestions/comments/6ez8ag/accidentally_destroyed_production_database_on/) when running a routine database query

Database backups are the last line of defence when things have gone terribly wrong.

## Different approaches to backups

You need to be careful because some cloud providers have more robust backup systems than others.

Some cloud providers just do a daily backup of your database. If the backups are taken at midnight, and we are unfortunate enough to have a problem at 11pm, then we will lose 23 hours of data. If the database is powering a simple blog, then it's not a big issue. But if it's something like a [SAAS](https://en.wikipedia.org/wiki/Software_as_a_service) app, then losing that much customer data would be unacceptable.

A better approach is point in time recovery (PITR). Postgres uses [WAL files (Write Ahead Log)](https://www.postgresql.org/docs/current/wal-intro.html) as a record of database changes. If the cloud provider regularly backs up these files (typically every 5 minutes), then Postgres can recreate a database's state for a given date and time by replaying the daily backup along with the WAL files.

Most major cloud providers support this. I've personally checked the following:

- [AWS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html)
- [DigitalOcean](https://docs.digitalocean.com/products/databases/postgresql/how-to/restore-from-backups/#restore-a-postgresql-cluster-from-backups)
- [OVH](https://www.ovhcloud.com/en-gb/public-cloud/postgresql/)

If your cloud provider of choice doesn't support PITR, then you're getting a substantially worse service.

## Accessing a backup

You might imagine that you can go to the admin page of your cloud provider, and download the database backup. This is rarely how it works. To access a backup, the cloud provider will create a new database server, using the data from the backup. You can then use `pg_dump`, targeting the new database server to download the backup.

## The cost of managed databases

A common criticism of managed databases is you get poor value compared to installing Postgres manually on a virtual machine.

For example, the 5 USD droplet from DigitalOcean has the following specs (as of May 2022):

- 1 vCPU, 1 GB RAM, 25 GB disk

Compared to the managed Postgres service, which starts at 15 USD, and only offers the following specs:

- 1 vCPU, 1 GB RAM, 10 GB storage

Bear in the mind the additional storage that the cloud provider is using for backups. DigitalOcean stores backups for 7 days, which means it could use quite a bit more than 10 GB of storage.

Still, database storage is very expensive compared to block storage and object storage. If your business requires huge amounts of database storage (perhaps you're using [TimescaleDB](https://www.timescale.com/) with terabytes of data) then the cost of a managed database will be substantial.

## Reasons not to use a Postgres service

Besides the cost implications outlined above, there are some other downsides with using Postgres services. For example, there are usually limitations around which Postgres extensions you can install, and you don't have direct control over the many parameters which can be used to tune Postgres performance. If you have very specific requirements, or a particularly demanding application, then managed services might not be the best option.

## Things to look out for

If you've decided to use a managed Postgres service, here are some things to be aware of when comparing cloud providers:

### Storage provided

When cloud providers show the amount of storage available, some are referring to the actual storage available for Postgres, and others are referring to the total capacity of the VM which is running Postgres (by the time you deduct the storage used by the operating system, and other system software, you get less capacity for Postgres itself).

### Hidden costs

Some cloud services include a free bandwidth allowance, and others don't. So doing large queries on your cloud databases from a local machine, and frequently downloading backups, can add to your bill.

### Lack of flexibility

The hyperscale clouds, like AWS, are incredibly flexible with their managed database offerings. You can specify:

- The number of CPU cores
- The amount of RAM
- The amount of storage
- The type of storage - e.g. SSD or hard drive
- How long backups are kept for
- Which availability zones to use for read replicas

The smaller providers are typically far less flexible. For example, DigitalOcean keeps backups for 7 days, and there's no way to configure it to be longer or shorter. In a staging environment, we typically don't need backups, so are paying for something we don't want.

### Automatic Postgres upgrades

Most of the cloud providers allow you to automatically upgrade your Postgres version. This is a huge time saver vs doing it yourself. Often self managed databases will stay on older versions of Postgres for many years due to the pain of upgrading.

### Monitoring

A hosted database is useless unless the cloud provider also provides an effective monitoring solution to let you know when the disk is almost full, and CPU / RAM usage is over a certain threshold.

## Let's look at some providers

All of the following offer a managed Postgres service:

- [Amazon Web Services](https://aws.amazon.com/rds/postgresql/)
- [Azure](https://azure.microsoft.com/en-gb/services/postgresql/#overview)
- [DigitalOcean](https://www.digitalocean.com/products/managed-databases-postgresql)
- [Google Cloud](https://cloud.google.com/sql/docs/postgres)
- [Heroku](https://www.heroku.com/postgres)
- [OVH](https://www.ovhcloud.com/en-gb/public-cloud/postgresql/)
- [UpCloud](https://upcloud.com/products/managed-databases/)

With the following coming soon (as of May 2022):

- [Linode](https://www.linode.com/products/databases/)
- [Vultr](https://www.vultr.com/products/managed-databases/)

There are also some companies who will setup a managed Postgres cluster for you, on one of the hyperscale cloud providers:

- [Aiven](https://aiven.io/postgresql)
- [Crunchy Data](https://www.crunchydata.com/products/crunchy-bridge)
- [ElephantSQL](https://www.elephantsql.com/)
- [EnterpriseDB](https://www.enterprisedb.com/products/biganimal-cloud-postgresql)
- [ScaleGrid](https://scalegrid.io/postgresql.html)

### Which should I use?

Switching cloud providers is a drastic move, so the natural choice is to use your current provider's Postgres service.

But if you're starting from scratch, it mostly depends on your budget and the expected scale of your application.

Without a doubt, the hyperscale providers (in particular AWS) have very complete offerings, with lots of control. But the smaller providers are often cheaper, and easier to understand from a billing perspective.

You might also consider which other services the cloud provider offers. In my case, having an affordable managed Kubernetes service is also important, and weighs into the decision on which cloud provider to pick.

For my personal projects, where I favour ease of use and cost effectiveness, I've had good results from DigitalOcean. When Vultr and Linode release their own managed Postgres services, they will be strong competitors to DigitalOcean's offering in terms of price / performance.

Every medium to large enterprise I've worked with has favoured a hyperscale provider like AWS, Google, or Azure. The range of different services on offer, and familiarity amongst devops professionals, are usually contributing factors.

## Conclusions

Managed Postgres services are a great way to get started, and include essential features like automated backups. You lose some control compared to hosting Postgres yourself, and pay a price premium, but the abundance of new cloud providers offering this service shows there is clearly demand from users.
