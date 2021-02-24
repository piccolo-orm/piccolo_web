---
title: What is the maximum number of coroutines you should run concurrently?
date: 2021-02-23
description: Finding the limits of how many coroutines you should run concurrently in Python with asyncio, before having to batch them up.
draft: false
---

When you use threads for concurrency, it's commonly understood that if you use too many threads, performance can actually suffer. This is because the operating system has to spend a lot of time context switching.

One of the advantages of coroutines in asyncio is they are more lightweight than threads, and in theory you can have many more coroutines than threads. But there must be a limit, after which the event loop which has to schedule the coroutines is overwhelmed.

I wrote a simple test to try and work out whether it's more efficient to batch up your coroutines, and to let one batch finish before adding another batch to the event loop.

```python
import asyncio
import time


# We will tweak this number to see when it's more efficient to batch up
# coroutines vs running them all in one go.
COROUTINE_COUNT = 100000


async def test_coroutine():
    """
    A simple coroutine - the sleep statements represent waiting for network
    calls.
    """
    await asyncio.sleep(0.1)
    await asyncio.sleep(0.1)
    await asyncio.sleep(0.1)


def get_coroutines():
    return [test_coroutine() for i in range(COROUTINE_COUNT)]


async def run():
    """
    Run the coroutines without batching.
    """
    coroutines = get_coroutines()
    await asyncio.gather(*coroutines)


async def run_batched():
    """
    Batch up the coroutines, so the event loop isn't overwhelmed.
    """
    coroutines = get_coroutines()
    iterations = 5
    chunk_size = int(len(coroutines) / iterations)

    remainder = len(coroutines) - (chunk_size * iterations)
    if remainder > 0:
        iterations += math.ceil(remainder / chunk_size)

    for i in range(iterations):
        chunk = coroutines[i * chunk_size : (i + 1) * chunk_size]
        await asyncio.gather(*chunk)


if __name__ == "__main__":
    for test in (run, run_batched):
        start = time.time()
        asyncio.run(test())
        end = time.time()
        delta = end - start
        print(delta)
```

With `COROUTINE_COUNT=10000`:

 * Unbatched: 0.51 seconds
 * Batched: 1.69 seconds

With `COROUTINE_COUNT=100000`:

 * Unbatched: 6.24 seconds
 * Batched: 5.86 seconds

This was run on a 2.6 GHz Intel Core i7 (9th Gen) processor, with 16 GB of RAM.

You'll see that batching up coroutines is much slower, unless we get to incredibly high numbers of coroutines (100,000).

I didn't expect this. I thought the event loop would struggle much sooner. Let's try the experiment again, but replacing `asyncio.sleep` with actual network calls.

```python
import httpx

async def test_coroutine():
    """
    Doing actual network calls now.
    """
    async with httpx.AsyncClient() as client:
        response = await client.get("https://www.google.co.uk")
        assert response.status_code == 200
```

With `COROUTINE_COUNT=100`:

 * Unbatched: 2.12 seconds
 * Batched: 2.90 seconds

As you can see, batching is also slower in this case.

When trying with `COROUTINE_COUNT=1000` I started getting network timeouts. In this situation, batching does make sense - if you run all of the coroutines at once you're more likely to encounter network issues.

The same is true when connecting to a database - unless you're using a connection pool, you will start seeing errors if Postgres has more than 100 open connections.

## Conclusions

The asyncio event loop is surprisingly good at handling large numbers of coroutines concurrently. However, be wary of scheduling too many coroutines which require network access, as you'll hit other bottlenecks (rate limiting, network etc).

