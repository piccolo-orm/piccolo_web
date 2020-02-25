---
title: Python contextvars
date: 2020-02-22
description: Understanding the Python contextvars library.
draft: true
---

The [contextvars module](https://docs.python.org/3/library/contextvars.html) was [added in Python 3.7](https://www.python.org/dev/peps/pep-0567/) to solve issues with [thread local data](https://docs.python.org/3/library/threading.html#thread-local-data) in asyncio programs.

An example where thread local data is in a web server which serves each request in a separate thread. You can store information about the current request in a way which doesn't bleed out to other threads, and it saves you from passing the request information to every function or method which requires it. If you've used [Flask](https://palletsprojects.com/p/flask/) before, this is [basically what it does](https://stackoverflow.com/questions/25887910/what-does-thread-local-objects-mean-in-flask).

With asyncio programs, thread local data is no longer enough. Each thread can be executing several coroutines concurrently, and it would be good to scope variables to coroutines and not just the thread as a whole. An example is something like a database transaction, which you don't necessarily want to pass around to every function which needs it.
