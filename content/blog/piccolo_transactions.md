---
title: Piccolo Transactions
date: 2020-02-26
description: A look at how the Piccolo ORM handles database transactions using asyncio.
draft: false
---

Transactions are an essential feature of any database library, but in an async world they can be quite tricky.

## Solution 1 - Atomic

This is the original solution offered by Piccolo.

```python

import asyncio

from piccolo.columns import Varchar, ForeignKey
from piccolo.tables import Table


class Employer(Table):
    name = Varchar(length=100)


class Person(Table):
    name = Varchar(length=100)
    employer = ForeignKey(Employer)


async def main():
    # Each table class has a reference to the engine, in this case Person._meta.db
    transaction = Person._meta.db.atomic()
    transaction.add(Employer.create_table())
    transaction.add(Person.create_table())
    await transaction.run()


if __name__ == '__main__':
    asyncio.run(main())

```

It's useful if you just want to fire off a bunch of queries, but not if you want the results of one query to influence a subsequent query (e.g. fetching a value in one query, and inserting it in a subsequent query).

This is still kept in Piccolo though, despite the limitations, as it's useful if you want to dynamically build a transaction - you can pass it around, and can keep on adding queries to it, until you're ready to run it.

## Solution 2 - Pass the transaction into each run method

What if we used a context manager instead for creating / closing the transaction, and we pass it into each query.

```python
async def main():
    async with Person._meta.db.transaction() as transaction:
        Employer.create_table().run(transaction=transaction)
        Person.create_table().run(transaction=transaction)

```

On the surface, this seems like a good solution - it's very explicit, and seems to do everything we want.

The downside is you have to keep on passing around the current transaction. Imagine that we wanted to get the data from some other functions:

```python

async def fetch_employers(transaction):
    await Employer.select().run(transaction=transaction)


async def fetch_people(transaction):
    await Person.select().run(transaction=transaction)


async def main():
    async with Person._meta.db.transaction() as transaction:
        await fetch_employers(transaction)
        await fetch_people(transaction)

```

Soon enough, a lot of your code needs to be aware of transactions.

## Solution 3 - Contextvars

In Python 3.7, the contextvars module was added. This allows variables to be scoped to the current task.

```python

async def main():
    async with Person._meta.db.transaction():
        await fetch_employers()
        await fetch_people()

```

In the context manager we're assigning the connection with the transaction to the current context.

```python
connection = ContextVar(connection, default=None)


# This is similar to what Piccolo does:
class Transaction():

    async def __aenter__(self):
        self.connection = await get_connection()
        self.transaction = await connection.get_transaction()
        self.token = connection.set(self.connection)
        await self.transaction.start()

    async def __aexit__(self, exception_type, exception, traceback):
        if exception:
            await self.transaction.rollback()
        else:
            await self.transaction.commit()

        await self.connection.close()

        # This removes the connection from the current context:
        connection.unset(self.token)

```

This solution saves us from passing the transaction around explicitly.
