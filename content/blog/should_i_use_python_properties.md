---
title: Should I use Python properties?
date: 2019-08-08
description: When to use Python properties, and when the avoid them.
---

Python properties have been surprisingly divisive amongst developers I've worked with.

In simple use cases, they're great.

```python
class User():
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'


>>> User('Shirley', 'Jones').full_name
Shirley Jones
```

The problem is they can cause confusion.

```python
class User():
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    @property
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'


# Feels weird:
>>> User('Shirley', 'Jones').get_full_name
Shirley Jones
```

Just by changing the method name, it feels unnatural for this to be a property. Calling `my_user.get_full_name` feels like it should have brackets after it, because it sounds like a function. So naming is definitely important when using properties.

Also, properties work great if you're confident you won't need to add any arguments in the future.

Imagine we wanted to modify `get_full_name` so it had an `include_title` argument.

If we implemented it as a property, we'll break everyone's code, because now it'll have to be called as a function to work properly:

```python
class User():
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def get_full_name(self, include_title=False):
        fullname = f'{self.first_name} {self.last_name}'
        if include_title:
            fullname = f'Madam {fullname}'

        return fullname


# We broke our existing code:
>>> User('Shirley', 'Jones').get_full_name
Error!
```

This might not matter much in small projects, but if you're a library author you don't want to introduce a breaking change just by adding an argument to a property.

In API design, properties can be overused too. If you're designing a fluent interface, you don't want to add a cognitive load to a programmer by making them consider 'is this a property or a method?'.

Take this example:

```python
class Select(Query):

    def where(self, query) -> Select:
        # do stuff
        return self

    @property
    def first(self) -> Select:
        # do stuff
        return self

    def run(self):
        return 'some data'

```

To use this API:

```python
select = Select().where(some_query).first.run()

```

Rather than having to remember that `first` is a property, it's cleaner to have them all as plain methods.

```python
select = Select().where(some_query).first().run()

```

Sure, it takes a couple more key strokes, but sometimes consistency is king.

And lastly, perhaps the main way properties can be abused is if a really heavy piece of computation, or a long network request, is done to generate the response. A developer could unexpectedly cripple their app's performance by calling an innocent looking property too many times.

So in conclusion, properties can be great - but consider if you really need them, and if so keep them simple.
