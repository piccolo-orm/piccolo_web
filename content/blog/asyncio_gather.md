---
title: asyncio.gather
date: 2020-02-15
description: A look at asyncio.gather, an important part of the asyncio Python library for concurency.
---

When it comes to learning the [asyncio](https://docs.python.org/3/library/asyncio.html) library in Python, there are two important functions to be aware of. The first is `run`, which is a simple way to run a coroutine, and the second is `gather`.

`gather` lets you fire off a bunch of coroutines simultaneously, and the current context will resume once all of the coroutines have completed. The return value is a list of responses from each coroutine.

Here's a real life example, where a bunch of API endpoints are accessed concurrently, as a means of load testing a server:

```python
import asyncio

import httpx


ids = [1, 10, 12, 15, 20, 100]


async def main():
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await asyncio.gather(
            *[
                client.get(
                    f"https://foo.com/api/{_id}/",
                ) for _id in ids
            ]
        )

    # Check all of the requests were successful:
    assert set([i.status_code for i in response]) == {200}


if __name__ == "__main__":
    asyncio.run(main())
```

We are using the [httpx](https://github.com/encode/httpx) library to make network requests.

One thing to be aware of is you can potentially open up a lot of connections using `gather`. If you open too many, this can result in errors as operating systems will only let you open a certain number of sockets at a time, so don't go too crazy!

Likewise, when connecting to a database, only a certain number of connections can be open at a time. It's important to use a connection pool to avoid errors.

Here's an example using [Piccolo](http://piccolo-orm.com/):

```python
import asyncio

from piccolo.engine.postgres import PostgresEngine
from piccolo.columns import Varchar
from piccolo.tables import Table


DB = PostgresEngine({
    'host': 'localhost',
    'database': 'my_app',
    'user': 'postgres',
    'password': ''
})


class Person(Table, db=DB):
    name = Varchar()


async def main():
    await DB.start_connnection_pool()

    # This is a contrived example - imagine each of these are different
    # queries:
    await asyncio.gather(*[Person.select().run() for _ in range(500)])

    await DB.close_connnection_pool()


if __name__ == "__main__":
    asyncio.run(main())
```

With Piccolo, if we make sure a connection pool is open then we're fine - if all connections are being used, the coroutine will wait until one becomes available.

As you can see, `gather` is super powerful. It lets us concisely request several resources concurrently, which is a common occurence in web apps.

## asyncio_tools

If you want to take your use of asyncio.gather to the next level, check out [asyncio_tools](https://github.com/piccolo-orm/asyncio_tools).

## Resources

-   [Official docs](https://docs.python.org/3/library/asyncio-task.html#asyncio.gather)
