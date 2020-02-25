---
title: Namespacing Python attributes
date: 2019-09-10
description: Looking at different ways to namespace attributes in Python classes.
draft: false
---

When you have large classes, it can be useful to namespace some of the attributes.

For Piccolo, there are a few large classes, and the one which triggered this thought process was Column.

In Column, there's a bunch of different attributes which we'd like to differentiate:

 * Private vs public
 * Library vs user created

By namespacing our attributes, it makes the intention of the software clearer, and also helps prevent name collisions, which could result in unexpected behaviour.

## _ prefix (private)

The convention in Python is to prefix private attributes with an underscore.

It doesn't actually stop a user from accessing or overriding the attribute, like in some other languages, but it's still helpful.

## __ prefix (mangled)

You might consider prefixing an attribute with two underscores to designate it as ultra private, but this does something special in Python - name mangling. It allows you to prevent attributes being overridden by subclasses. Here's an example:

```python
class Person():
    __name = 'Bob'


class Employee(Person):
    __name = 'Security Guard'


employee = Employee()
>>> employee._Person_name
'Bob'
>>> employee._Employee_name
>>> 'Security Guard'
```

Python automatically modifies the attribute name to contain the name of the class. This prevents collisions.

It's useful for libraries which provide base classes which are meant to be subclassed by users.

It's very cool, but you don't see it used often, most likely because it's not widely known about.

Note, it only works if the attribute name has less than one trailing underscore, to avoid confusion with magic methods (see below).

## Magic methods

Magic methods (also called dunder methods) are attributes which have double underscore prefix and postfix. The one most people know is `__init__` in classes.

It allows Python to implement functionality transparently, without adding additional syntax.

For example, calling an object just calls it's `__call__` method. Instantiating an object just calls its `__init__` method.

It's tempting for library authors to use this dunder syntax for their own variables but it's not recommended. The magic methods are how Python implements some important functionality, and what if they add a new magic method in the future, which clashes with your own variable? It's unlikely, but best to be safe. Consider the dunder namespace to be just for the Python runtime.

## Nested classes

In some libraries you'll see this:

```python
# Representing a database table.
class Table():

    class Meta():
        tablename = 'awesome_table'
```

If we'd done this instead:

```python
class Table():
    tablename = 'awesome_table'
```

It means the user can't subclass `Table`, and define their own tablename variable without breaking the library in some way.

```python
# We can now do this, if we wanted a tablename column on our table:
class MyTable(Table):
    tablename = CharField()

    class Meta():
        tablename = 'awesome_table'
```

But what's actually going on when we define classes inside classes? There's actually nothing weird about this in Python - it's just like declaring any other attribute.

We access them as you'd expect - `MyTable.Meta.tablename` or `MyTable().Meta.tablename`.

One advantage of this approach, is as it's generally just used in libraries, it's unlikely a user would want to define a Meta attribute of their own, which avoids a naming collision.

A disadvantage is the inner class can't access attributes in the outer class (for example, inside a method). In theory you can do some metaclass magic to bind a reference to the outer class in the inner class, but this is seriously advanced / dubious jank. Also, nested classes can seem a bit strange to users at first, who might be confused by it.

### Inheritance

We can use inheritance on the nested class, which is quite interesting:

```python
class Table():
    class Meta():
        foo = 1


class MyTable(Table):

    class Meta(Table.Meta):
        bar = 2

MyTable().Meta.foo
>>> 1
MyTable().Meta.bar
>>> 2
```

## Dictionaries

Alternatively, we can just use a dictionary:

```python
class MyTable(Table):
    tablename = CharField()

    meta = {
        tablename = 'awesome_table'
    }
```

Which works fine if you just want some simple values. Classes allow you to namespace methods too, so are generally preferable.

## Naming conventions

Finally, we can just prefix our attributes with an identifier, in this case `piccolo_`:

```python
class MyTable(Table):
    piccolo_tablename = 'awesome_table'

```

## Conclusions

We've looked at a few different solutions for namespacing attributes. In an ideal world, our classes are simple enough to not need any of these techniques, but in larger libraries like Piccolo it can lead to more understandable and robust code.
