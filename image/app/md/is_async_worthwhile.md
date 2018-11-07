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

## What does asyncio give us?

Asyncio provides

## Does my corner shop's website need asyncio?

Most small websites won't get enough traffic to stress even the smallest of servers.

However, for building websites or APIs with at least moderate scale, there are real benefits to using non-blocking IO.

Asyncio will help improve the throughput of a Python application. This means that a given VM can handle more traffic, which can result in real cost savings.

## Is asyncio all about speed?

Non-blocking IO won't make your website faster.

However, most frameworks built on top of asyncio have sought to increase performance, but through other means (efficient HTTP parsing, Cython-ising slow parts) ...

## How much time does Python spend waiting on a database?

...

## Why use this, and not Node or Go?

Up until ...
