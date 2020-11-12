---
title: Top level await in Python
date: 2020-11-11
description: Ways to use top level await in Python.
draft: false
---

One of the core rules of the `await` keyword in Python is it can only be used within a coroutine.

```python
import asyncio

async def my_coroutine():
    print("Starting")
    await asyncio.sleep(1)
    print("Done")
```

However, there are some situations where you can use top level await.

## python -m asyncio

Using this little trick, it launches a Python interpreter, in which you can use top level await.

It also automatically imports asyncio for you - give `await asyncio.sleep(1)` a go.

## iPython

Recent versions of iPython also support [top level await](https://ipython.readthedocs.io/en/stable/interactive/autoawait.html). You can switch this behavior on and off as follows:

```
%autoawait False
```

It is on by default (as tested in v7.19.0).

## Making your code friendly to top level await

Having top level await is neat, but it can actually cause problems for some code. The way that top level await is achieved is by having an event loop running in the background.

There can only be one event loop running in a thread. If any of your code tries to launch an event loop, perhaps by calling `asyncio.run`, you'll get an error, so be careful with that.