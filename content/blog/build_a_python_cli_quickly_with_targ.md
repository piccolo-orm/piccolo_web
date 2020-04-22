---
title: Build a Python CLI quickly with targ
date: 2020-04-22
description: Introducing a new library which makes building command line tools in Python really fast and simple.
draft: false
---

Building command line tools is a daily occurrence for many developers, and is also an accessible way for junior programmers to build useful tools, without having to create a GUI.

I wanted to make a library which made building a command line tool as painless as possible. There are also some advanced features I needed from a CLI library for Piccolo, and so [targ](https://github.com/piccolo-orm/targ) was born.

Targ creates a CLI just using type annotations and docstrings, so you can turn your existing functions into a CLI with very little effort.

```python
# main.py
from targ import CLI


def add(a: int, b: int):
    """
    Add the two numbers.

    :param a:
        The first number.
    :param b:
        The second number.
    """
    print(a + b)


if __name__ == "__main__":
    cli = CLI()
    cli.register(add)
    cli.run()
```

And from the command line:

```bash
>>> python main.py add 1 1
2
```

To get documentation:

```bash
>>> python main.py add --help

add
===
Add the two numbers.

Usage
-----
add a b

Args
----
a
The first number.

b
The second number.
```

I encourage you to give it a try.

 * [Github](https://github.com/piccolo-orm/targ)
 * [Read the docs](https://targ.readthedocs.io/en/latest/index.html)

More advanced features are coming soon.
