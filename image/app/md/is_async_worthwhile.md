# Is async worthwhile?

One of the main motivations for building Piccolo was the lack of options for an asyncio ORM.

## What is asyncio?

asyncio is a library added in Python 3, to provide an event loop implementation in the standard library.

Prior to this, each framework that implemented non-blocking IO via an event loop had their own event loop implementation, limiting interoperability (Twisted and Tornado being by far the most well known).

## Why is an event loop useful?

An event loop is one approach to concurrency. The others are:

 * threads
 * processes
 * greenlets (lightweight, non-system threads)
 * implicit yielding (gevent, and eventlet)

Traditionally, each unit of work which needs to operate concurrently would be assigned to a separate process or thread. Threads and processes are operating system constructs, and are expensive to create. It's up to the operating system when it schedules If a program requires thousands of threads ... It's also very easy to trash a program which operates this way - each connection takes up operating system resources, making a DOS attack trivial.


## What does asyncio give us?

Asyncio provides

## Does my corner shop's website need asyncio?

Most small websites won't get enough traffic to stress even the smallest of servers.

However, for building websites or APIs with at least moderate scale, there are real benefits to using non-blocking IO.

Asyncio will help improve the throughput of a Python application. This means that a given VM can handle more traffic, which can result in real cost savings.

## Is asyncio all about speed?

Non-blocking IO won't make your website faster when under small load. For example, when only dealing with one sequential request at a time.

However, it does improve the throughput of a website, so under high load, a user's request will be queued for less time, and they'll receive a response faster.

An interesting side effect of asyncio is it got library authors thinking about performance. By using efficient HTTP parsing, and Cython-ising slow parts, many asyncio libraries are actually faster than synchronous alternatives, but this isn't due to asyncio itself.

## How much time does Python spend waiting on a database?

Even a simple database operation takes in the order of milliseconds (10^-3) to execute.

This doesn't include the network lag when talking to a remote database, and also additional overhead such as authentication and encryption.

Python isn't a fast language, but basic Python operations take in the order of microseconds (10^-6).

So there is time for Python to do meaningful work when waiting for a database response. The question becomes how much?

This is dependent on the overhead that asyncio imposes. If the asyncio event loop, and associated Python code required to schedule coroutines, is slow then it'll defeat the purpose.

Libraries such as uvloop are important in this regard, since they offer a faster event loop implemention, which is still compatible with asyncio.

## Why use this, and not Node or Go?

Up until ...
