# Why Python type annotations are awesome

For me, the two stand out features of Python 3 are [asyncio](https://docs.python.org/3/library/asyncio.html) and [type annotations](https://docs.python.org/3/library/typing.html).

I think both were essential for keeping Python competitive as a language for building backend systems.

In this article I'll talk about why I think type annotations in particular are awesome, and why Piccolo uses them so heavily.

## Documentation

The first reason to use type annotations is to document your code. Taking this very simple example:

```python
def email_user(user):
    # some code
```

User could be any number of different things - an integer, a User object, a string ... the list does on. It adds cognitive load to someone new to a project, having to work out what's going on.

Before type annotations, this was solved using specially formatted docstrings.

```python
def email_user(user):
    """
    :type user: User
    """
    # some code
```

This is better, but having the type annotation in a string is limiting. Using the Python 3 approach:

```python
def email_user(user: User):
    # some code
```

The advantage here is with code editors like Visual Studio Code you can now `Command + click` on the User annotation. and it'll take you to the definition of User in your project, which is a great usability improvement over doing a manual search.

Declaring your type annotations here makes them available in an `__annotations__` property, which you access using `typing.get_type_hints`.

```python
from typing import get_type_hints

def email_user(user: User):
    # some code

get_type_hints(email_user)
>>> {'user': User}
```

This makes the annotations easier to access than parsing a docstring, and allows for some interesting applications.

## Mypy

[Mypy](http://mypy-lang.org/) uses the type annotations to analyse your code for errors.

```python
def say_hello(name: str):
    print(name)


say_hello(1)  # Error!
```

Visual Studio Code supports it out of the box. Combined with a linter like Flake8, your editing experience is super charged - catching most coding errors you're likely to encounter.

Having type checks provides you with an extra level of confidence that your code is working as expected. This is especially useful when refactoring large projects.

## Progressive enhancement

One criticism you sometimes here is why not just use a statically typed language?

What's nice about MyPy (and also it's companion in the Javascript world - Typescript), is you can add type annotations incrementally. Creating a quick and dirty prototype? Leave the annotations out for now.

A library can use type annotations (like Piccolo), and the user doesn't need to care - they can use Python as they always have. But the library author has that extra level of confidence that their code works as expected.

## Advanced examples

To finish off, here are some examples of the interesting things you can do with type annotations in Python.

```python
import typing as t  # Importing it as an alias makes it less verbose


# You can assign type annotations to variables:
Pet = t.Union[Dog, Cat, Hamster]


# pet can be a Dog, Cat, or Hamster
def say_name(pet: Pet):
    print(pet.name)


# license_number can be None or an int
def create_driver(name: str, license_number: t.Optional[int] = None):
    print(f'Creating {name} with license {license_number}')


class Dog():
    # In Python 3.7 forward references are allowed i.e. the
    # return type can be current class being defined.
    def return_friend(self) -> Dog:
        return some_dog


# If you want to return a type defined in another file, and
# are only importing it for use as a type annotation, you
# can do this:
if t.TYPE_CHECKING:
    import Budgie from animals


# type annotations can also be used on variables
budgies: t.List[Budgie] = []

```

As you can see, the typing module is already very powerful - give it a go!
