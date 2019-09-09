# Namespacing Python class attributes

When you have large classes, it can be useful for namespace some of the attributes.

For Piccolo, there are a few large classes, and the one which triggered this thought process was Column.

In Column, there's a bunch of different attributes which we'd like to differentiate:

 * Private vs public
 * Library vs user created

## _ prefix (private)

The convention in Python is to prefix private attributes with an underscore.

It doesn't actually stop a user from accessing the attribute, like in some other languages, but it's still helpful.

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

It's useful for libraries which provides base classes which are meant to be subclassed by users.

Note, it only works if the attribute name has less than trailing one underscore, so prevent issues with magic methods, which use a double underscore prefix and postfix.
