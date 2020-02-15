---
title: asyncio vs gevent
date: 2018-11-29
description: A look at two approaches to concurrency in Python, and the pros and cons.
---

An alternative to asyncio is [gevent](http://www.gevent.org/) (and a similar library called [eventlet](http://eventlet.net/)).

Gevent also uses an event loop, but it's hidden from the user. Your code is run in greenlets, which are similar to threads but are scheduled by Python and not the operating system. The Python socket library is patched, so whenever your program is blocked on a network request it'll automatically switch to another greenlet, and run that instead.

The main benefit of gevent is you can make a traditional synchronous program work asyncronously with little effort. For example, a [Django](https://djangoproject.com) app can be run using [Gunicorn](http://docs.gunicorn.org/en/stable/), a popular WSGI framework, which [supports gevent out of the box](http://docs.gunicorn.org/en/stable/settings.html). If your application was previously IO bound, you can expect to see increased throughput.

However, some care is required. Some libraries don't play nicely with the patched socket library, so testing is advised before pushing to production.

It also depends on your preference for implicit vs explicit code. With asyncio, you'll have a bunch of async / await statements, but it makes it clearer when context switches are happening, which does align with the [Zen of Python](https://www.python.org/dev/peps/pep-0020/) - 'Explicit is better than implicit'.

A lot of languages have either adoped async/await (C#, Javascript, Kotlin), or are about to (Swift). By comparison, very few languages support the implicit concurrency model of gevent. This doesn't mean gevent is wrong, but async/await is certainly part of the modern zeitgeist of language design.

In conclusion, both asyncio and gevent are great options for IO bound applications. Part of the strength of Python is it has multiple solutions to various problems. Which to use depends on your personal preferences, and whether you're starting on a brand new project or not.
