---
title: Improving tab completion in Python libraries
date: 2019-07-22
description: How to optimise your Python code to support tab completion.
draft: false
---

One of the main design goals for [Piccolo](https://github.com/piccolo-orm/piccolo) is to support tab completion as fully as possible.

Tab completion helps developers write code faster, with fewer errors. This is particularly useful with ORMs, where typos could create some unexpected SQL queries.

There are two tools which I rely on heavily each day, and they are [iPython](https://github.com/ipython/ipython) and [VSCode](https://code.visualstudio.com/). Both of them support tab completion, and use the [Jedi](https://github.com/davidhalter/jedi) library under the hood.

The main use cases I want to support with tab completion are:

 1. Being able to see all available methods on a table, for example: `MyTable.select()`, `MyTable.select().first()`, `MyTable.delete()`, and many more.
 1. Being able to navigate through foreign key relationships, for example: `Band.manager.name`, where `manager` is a foreign key to a Manager table, and `name` is a column.

Jedi is very powerful, but it can't perform miracles. If we write our code intelligently, we can get the best possible tab completion experience for the user.

## Add type hints

Jedi understands all sorts of type hints. As well as the native type hints introduced in [PEP 484](https://www.python.org/dev/peps/pep-0484/), Jedi can also understand type hints within docstrings.

I use native type hints throughout Piccolo. The most important type hint, for the purposes of tab completion, is the return type of functions and methods.

```python
def my_function() -> Select:
    # lots of code
    return Select()
```

The reason this so useful, is a tool like Jedi can easily infer the return type, without having to work it out from the actual function body. It's really important for methods which are part of a fluent API. It allows tab completion in situations like this:

```python
# We can continue using tab completion even after a method call:
Band.select().where(Band.name == 'Radiohead').first().run_sync()
```

## Mixins can be problematic

Piccolo originally consisted of a bunch of Query subclasses like `Select`, `Insert`, `Delete` etc. Shared functionality like 'where' clauses were implemented via mixins.

```python
# Some early Piccolo pseudo-code
class WhereMixin():

    def where(self, values):
        # do some stuff
        return self


class Select(Query, WhereMixin):
    pass
```

You'll see here that mixins are problematic - since the `WhereMixin` can be used anywhere, the return type of the `where` method could be anything. This is clearly a big problem for tab completion.

The way around this is to not use Mixins, and use composition instead.

```python
# Some early Piccolo pseudo-code
class WhereDelegate():

    def where(self, values):
        # do some stuff
        return


class Select(Query):

    def __init__(self):
         self.where_delegate = WhereDelegate()

    def where(self, values) -> Select:
        self.where_delegate.where(values)
        return self
```

Now we're able to specify a concrete return type.

## Decorators can be deceiving

If decorators aren't implemented correctly, they can mask the signature of the function being decorated.

Take this example:

```python
def my_decorator(func):
    def wrapper():
        print('I am wrapped')
        func()
    return wrapper


@my_decorator
def hello_world() -> str:
    return 'hello world'


hello_world()
>>> I am wrapped

hello_world.__name__
>>> 'wrapper'
hello_world.__annotations__
>>> {}
```

In the example above, the annotations and original function name have been lost. It's effectively giving false information to any introspection tools, like Jedi. You can fix this though:

```python
from functools import wraps


def my_decorator(func):
    @wraps(func)
    def wrapper():
        print('I am wrapped')
        func()
    return wrapper


@my_decorator
def hello_world() -> str:
    return 'hello world'


hello_world.__annotations__
>>> {'return': str}
hello_world.__name__
>>> 'hello_world'
```

If tab completion is a high priority, keep decorators simple and make sure you use `wraps`. The `wraps` function copies some important attributes from the wrapped function to the decorator (including `__name__`, `__annotations__`, and `__doc__`).

Making decorators accurately reflect the wrapped function is a surprisingly deep subject. This is a great [article](http://blog.dscpl.com.au/2014/01/how-you-implemented-your-python.html) on the subject, which is part of an entire series of [articles](https://github.com/GrahamDumpleton/wrapt/tree/develop/blog).

## Some setattr magic

This is something particular to Piccolo, and not every project will require it.

When you enter say `Band.manager` (where `manager` is a foreign key), it would be nice to be able to keep on using tab completion to see the columns on the `Manager` table. And likewise, if the `Manager` table contains any foreign keys, to be able to follow them using tab completion as well. With other ORMs, you would express this using a string. For example, in Django it would be a string like `'manager__name'`. This is fine, but when you have large, complex models, it's nice to have tab completion.

The way Piccolo achieves this is when you call `Band.manager`, the constructor creates an attribute on the object for each column in the table the foreign key points to. So for the `name` column, a `name` attribute is created on on the object - allowing you to do `Band.manager.name`.

## Conclusions

Tab completion is a powerful tool for developers, and with a bit of thought we can create libraries which leverage it to its fullest.
