---
title: The power of Python descriptors
date: 2022-01-24
description: An introduction to the Python descriptor protocol, with some example use cases.
draft: false
---

There are two features in Python which aren't often needed in everyday programming, but are essential to the inner workings of Piccolo. The first is metaclasses, and the second is the [Python descriptor protocol](https://docs.python.org/3/howto/descriptor.html).

In this article we'll look at the Python descriptor protocol, and why it's so powerful. In fact, it underpins many core Python features such as classmethods.

## What is the descriptor protocol?

The descriptor protocol allows us to implement custom logic when a variable is accessed, or assigned a new value. For example:

```python
class Parent:
    child = Child()

# With the descriptor protocol we can run custom logic:
Parent.child      # when it's accessed
Parent.child = 1  # when we assign a new value to it
```

Like many things in Python, it's implemented using magic methods. In this case `__get__` and `__set__`:

```python
class Child:
    def __get__(self, obj, objtype=None):
        print("I was accessed")

    def __set__(self, obj, value):
        print("I was assigned a new value")

```

Which gives us the following:

```python
Parent.child
>>> I was accessed

Parent.child = 1
>>> I was a assigned a new value
```

There are lots of interesting use cases. When a value is assigned we could:

- Store it in an external database.
- Invalidate a cache.
- Refresh some UI (it's not too dissimilar to how reactivity is handled in Vue JS).

When a value is read we could:

- Calculate the value dynamically.
- Fetch the value from an external source.
- Log the value.

## Context

What makes the descriptor protocol extra interesting is the `obj` argument which is provided to the `__get__` and `__set__` methods.

The `obj` argument is either `None` or a class instance.

- When `obj` is `None`, then the the attribute was accessed on a class (i.e. `Parent.child`).
- When `obj` is a class instance, the attribute was accessed on that instance (i.e. `Parent().child`).

We're able to customise the behaviour depending on where it was called from. A trivial example:

```python
class Child:
    def __get__(self, obj, objtype=None):
        if obj is None:
            print("I was accessed from a class.")
        else:
            print("I was accessed from a class instance.")
```

In an ORM like Piccolo, having this information is incredibly value.

In the example below, the `name` attribute represents the column type:

```python
class Band(Table):
    name = Varchar()
```

But when we do a database query, the name attribute returns the value in the database instead.

```python
band: Band = await Band.objects().first()
>>> band.name
'Pythonistas'
>>> type(band.name)
str
```

Being able to have correct type annotations was a huge head scratcher - how do you have correct type annotations for an attribute which is context dependent?

It turns out we can do this using descriptors:

```python
class Varchar(Column):
    ...

    @typing.overload
    def __get__(self, obj: Table, objtype=None) -> str:
        ...

    @typing.overload
    def __get__(self, obj: None, objtype=None) -> Varchar:
        ...

    def __get__(self, obj, objtype=None):
        # This is Piccolo specific:
        return obj.__dict__[self._meta.name] if obj else self
```

[MyPy](https://mypy.readthedocs.io/en/stable/) now knows when the `name` is a `Varchar`, and when it's a `str`.

## Conclusions

This just scratches the surface of descriptors. As mentioned in the intro, they're not needed every day, but they help us solve really tricky problems, and unlock some interesting design space for Python libraries.

## Resources

- [An official guide on python.org](https://docs.python.org/3/howto/descriptor.html)
