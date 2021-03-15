---
title: Python contextvars
date: 2020-02-22
description: Understanding the Python contextvars library.
draft: false
---

The [contextvars module](https://docs.python.org/3/library/contextvars.html) was [added in Python 3.7](https://www.python.org/dev/peps/pep-0567/) to solve issues with [thread local data](https://docs.python.org/3/library/threading.html#thread-local-data) in [asyncio](https://docs.python.org/3/library/asyncio.html) programs.

An example where thread local data is in a web server which serves each request in a separate thread. You can store information about the current request in a way which doesn't bleed out to other threads, and it saves you from passing the request information to every function or method which requires it. If you've used [Flask](https://palletsprojects.com/p/flask/) before, this is [basically what it does](https://stackoverflow.com/questions/25887910/what-does-thread-local-objects-mean-in-flask).

With asyncio programs, thread local data is no longer enough. Each thread can be executing several tasks concurrently, and it would be good to scope variables to tasks and not just the thread as a whole. An example is something like a database transaction, which you don't necessarily want to pass around to every function which needs it.

Firstly, it's important to understand what a task is. When you write an asyncio program, you write a bunch of coroutines using `async def`.

```python
import asyncio


async def get_name():
    # To simulate a network call
    await asyncio.sleep(1)
    return 'Bob'


if __name__ == '__main__':
    asyncio.run(get_name())

```

When you ask asyncio to run a coroutine, with any of the following:

 * asyncio.run
 * asyncio.gather
 * asyncio.create_task

It wraps the the coroutine in a task. A coroutine is basically a function which can be suspended - a task adds some useful machinery around it, like being able to cancel it, and add callbacks.

The important thing to understand is your coroutine will always be running inside some task.

<figure>
    <a href="#" class="lightbox">
        <img src="/images/blog/asyncio_contextvars.png" class="medium" alt="asyncio contextvars" />
    </a>
    <figcaption>An example asyncio program</figcaption>
</figure>

In the above diagram, you can see an example asyncio program.

 * The entry point is a coroutine which is run using `asyncio.run`, which wraps it in a task.
 * Whenever a new task is created, a snapshot of the parent context is taken, and this applies to the new task. Any subsequent changes to the parent context don't apply to the child task.

Even though it might seem like lots of things are going on at once in an asyncio program, in reality it's just hopping between different tasks, which have their own context.

We can use context managers to manipulate the context in the task - it won't bleed out to the other existing tasks, as they took a snapshot of the context when they were created.

Here's an example:

 ```python

from contextvars import ContextVar

from my_library import get_connection


# If we don't give it a default, then it raises a LookupError if we try and
# access the value using connection.get(), without having first set a value
# using connection.set(some_value).
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


async def run_in_transaction(sql):
    # We don't have to pass the connection explicitly - we can get it from
    # the context.
    _connection = connection.get()
    if _connection:
        return await _connection.run(sql)


async def main():
    async with Transaction():
        await run_in_transaction('select * from foo')


if __name__ == '__main__':
    asyncio.run(main())

 ```

## Resources

 * [A good article on contextvars](https://www.pythoninsight.com/2019/03/context-variables/)
