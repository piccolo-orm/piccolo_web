# asyncio vs gevent

One solution is to use green threads instead, which are managed by the program itself, and not the operating system. Popular implementations of this approach are gevent and eventlet. Your code is run in greenlets, and the Python socket library is patched, so whenever your program is blocked on a network request it'll switch to another greenlet, and run that instead.

The benefits of green threads, is you can make a traditional synchronous program work asyncronously with little effort. Sometimes you'll get unexpected behaviour, where a third party library doesn't play nice with the patched socket library. It also depends on your preference for implicit vs explicit code. With asyncio, you'll have a bunch of async / await statements, but it makes it clearer when context switches are happening, which does align with the [Zen of Python](https://www.python.org/dev/peps/pep-0020/) - 'Explicit is better than implicit'.
