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

If more than one of the coroutines raises an exception, you won't be aware of it. If you need to run some clean up code to handle an exception (for example, rolling back a transaction), then you could potentially miss it if a different coroutine raises an exception first.

You might also wonder when the exception is handled - is it as soon as it's raised, or only when all of the coroutines have completed?

Fortunately, asyncio.gather has an option called **return_exceptions**, which returns the exceptions instead of raising them.

```python
import asyncio


async def good():
    return 'OK'


async def bad():
    raise ValueError()


async def main():
    responses = await asyncio.gather(
        bad(),
        good(),
        bad(),
        return_exceptions=True
    )

    print(responses)
    # >>> [ValueError(), 'OK', ValueError()]

```

We are now aware of every exception which happened. But as a programmer, what do we do with a list of values and exceptions? It feels quite alien.

To solve this problem, I created a library called [asyncio_tools](https://github.com/piccolo-orm/asyncio_tools), which wraps `gather` to make it more user friendly.

```python
import asyncio_tools


async def good():
    return 'OK'


async def bad():
    raise ValueError()


async def main():
    response = await asyncio_tools.gather(
        bad(),
        good(),
        bad(),
    )

    # We can easily get just the successful results
    print(response.successes)
    # >>> ['OK']

    # And the exceptions.
    print(response.exceptions)
    # >>> [ValueError(), ValueError()]

    # We can easily check if we got a certain type of exception
    if ValueError in response.exception_types:
        print('Received a ValueError exception')

    # We can combine all of the exceptions into a 'CompoundException':
    exception = response.compound_exception()
    if exception:
        raise exception()

```

If we raise a `CompoundException`, it allows us to return information about several
exceptions. When we catch such an exception, we can do the following:

```python

async def main():
    try:
        await some_coroutine()
    except asyncio_tools.CompoundException as exception:
        print(exception)
        # >>> 'CompoundException, 2 errors [ValueError, ValueError]'

        if ValueError in exception.exception_types:
            print('Caught a ValueError')

```

This makes handling exceptions in concurrent code easier - I encourage you to check it out.
