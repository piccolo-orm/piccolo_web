---
title: Exception handling in asyncio
date: 2020-02-23
description: A look at asyncio.gather, an important part of the asyncio Python library for concurency.
---

In most situations, exception handling in asyncio is as you'd expect in your typical Python application.

```python
import asyncio


async def bad():
    raise Exception()


def main():
    try:
        asyncio.run(bad())
    except Exception:
        print("Handled exception")


>>> main()
Handled exception
```

However, there are some situations where things get interesting.

## asyncio.gather

You can use [asyncio.gather](http://localhost:8080/blog/asyncio-gather/) to launch several coroutines, which are then executed concurrently.

```python
import asyncio


async def hello():
    # To simulate a network call, or other async work:
    await asyncio.sleep(1)
    print('hello')


async def main():
    await asyncio.gather(
        hello(),
        hello(),
        hello()
    )

>>> asyncio.run(main())
hello
hello
hello
```

What happens if one of the coroutines raises an exception? The default behavior is for the first exception raised by any of the coroutines to be propagated to the call site of asyncio.gather. The other coroutines continue to run.

If more than one of the coroutines raises an exception, you won't be aware of it. If you need to run some clean up code to handle an exception (for example, rolling back a transaction), then you could potentially miss if it a different coroutine raises an exception first.

You might also wonder when the exception is handled - is it as soon as it's raised, or only when all of the coroutines have completed?

Fortunately, asyncio.gather has an option called __return_exceptions__, which returns the exceptions instead of raising them.

```python
import asyncio


async def good():
    return 'OK'


async def bad():
    raise Exception


async def main():
    responses = await asyncio.gather(
        bad(),
        good(),
        bad(),
        return_exceptions=True
    )

    print(responses)


>>> asyncio.run(main())
[Exception(), 'OK', Exception()]
```

We are now aware of every exception which happened. But as a programmer, what do we do with a list of values and exceptions? It feels quite alien.

```python

# Now I need a simple way of saying is the 'TransactionError' in the list

```
