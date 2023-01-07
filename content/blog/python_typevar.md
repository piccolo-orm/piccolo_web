---
title: Advanced type annotations using Python's TypeVar
date: 2023-01-07
description: Understanding TypeVar in Python's typing module, and how powerful it is.
draft: false
---

Type annotations are very common now in the Python world.

The [``typing``](https://docs.python.org/3/library/typing.html) module has a lot of powerful features, and in this article we'll explore [``TypeVar``](https://docs.python.org/3/library/typing.html#typing.TypeVar), which is essential for annotating certain functions correctly.

## Simple annotations

A simple type annotated function is shown below:

```python
def get_message(name: str) -> str:
    return f'Hello {name}'
```

We pass in a string, and return a string - nice and easy.

## Advanced annotations using ``TypeVar``

There are some situations where we have to get more creative with our type annotations. Consider the function below, which doubles the number we pass into it:

```python
def double(value: int | float | decimal.Decimal):
    return value * 2
```

Several value types are allowed (``int``, ``float`` and ``Decimal``). We could add the following return type:

```python
def double(
    value: int | float | decimal.Decimal
) -> int | float | decimal.Decimal:
    return value * 2
```

But when you think about it, it doesn't really make sense. When we pass in an ``int``, we should get an ``int`` returned. What this type annotation is saying is that when we pass in an ``int``, then we could get back an `int`, `float` or `Decimal`.

This is where `TypeVar` comes in. It allows us to do this:

```python
import decimal
from typing import TypeVar

Number = TypeVar("Number", int, float, decimal.Decimal)

def double(value: Number) -> Number:
    return value * 2
```

This tells static analysis tools like [``mypy``](https://mypy.readthedocs.io/en/stable/) and [``Pylance``](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) that the type returned by the function is the same as the type which was passed in.

It also tells the type checker that values other than ``int``, ``float`` and ``Decimal`` aren't allowed:

```python
double("hello")  # error
```

Piccolo uses ``TypeVar`` extensively - without it, it would be impossible to provide correct types for certain functions. Give it a go!
