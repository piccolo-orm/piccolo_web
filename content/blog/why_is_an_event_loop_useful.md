---
title: Why is an event loop useful?
date: 2018-10-10
description: An event loop is an approach to concurrency which doesn't require threads, and bypasses the GIL.
draft: false
---

Traditionally, each unit of work which needs to operate concurrently would be assigned to a separate process or thread. Threads and processes are operating system constructs, and are expensive to create. It's up to the operating system when it schedules them to run, not the program. If a program requires thousands of threads, the constant switching between them can result in poor system performance.

An alternative is to use an event loop, which operates in a single thread. Each task which needs to operate concurrently is registered with the event loop. When one task blocks, it yields control back to the event loop, which will resume another task.

One of the better known programs using an event loop is Nginx, which was originally a proxy, but is now a general purpose web server. By using an event loop it was able to provide breakthrough levels of performance when it first appeared on the scene - being able to serve thousands of web requests concurrently. It contrasted to traditional server architectures at the time, as typified by the Apache web server, which created a thread or process per connection.

In order for an event loop to work, you need to be able to suspend tasks while they're blocked on IO. In Python, this is possible due to generators. Generators have existed in Python for a long time, and conveniently are functions which can be suspended.

```python
def counter():
    i = 0
    while True:
        yield i
        i += 1

_counter = counter()
_counter.__next__()
>>> 0
_counter.__next__()
>>> 1
_counter.__next__()
>>> 2

```

In early versions of asyncio, generators were used directly. Now the async and await keywords are used instead, but the underlying mechanisms are the same.

As well as performance advantages, an event loop also provides some nice abstractions which makes lives easier for developers. In the case of asyncio, you don't have to worry about sockets - they're astracted away. Likewise, you don't have to worry about how a task gets scheduled, the event loop takes care of it too.

One of my favourite features that asyncio provides is the gather function:

```python
import asyncio

async def hello(name):
    # This would usually involve some IO - to a db or something.
    print(f'hello {name}')

async def hello_everyone():
    await asyncio.gather(
        hello('bob'),
        hello('sally'),
        hello('fred')
    )
    print("welcome!")

asyncio.run(hello_everyone())
>>> hello bob
>>> hello sally
>>> hello fred
>>> welcome!

```

With asyncio.gather it makes it very easy to wait until a bunch of tasks have all finished. It's an example of the sorts of nice features which can be built on top of the event loop abstraction.

And last but not least, event loops make a lot of sense in Python due to the Global Interpretter Lock (GIL), which limits the effectiveness of multi-threaded programs. This makes event loops, which provides concurrency using a single thread, more attractive.
