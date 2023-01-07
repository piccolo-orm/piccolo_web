---
title: Testing Python Type Annotations
date: 2023-01-07
description: Understanding how to test Python's type annotations.
draft: false
---

Piccolo uses type annotations extensively, and we recently gave it a big upgrade by leveraging [``TypeVar``](https://docs.python.org/3/library/typing.html#typing.TypeVar) and [``Generic``](https://docs.python.org/3/library/typing.html#typing.Generic).

With an ORM like Piccolo, when we have a table such as this:

```python
class Band(Table):
    name = Varchar()
```

When we query the table, we expect a list of ``Band`` objects to be returned:

```python
>>> await Band.objects()  # list[Band]
```

Wouldn't it be great if we could write a test, to make sure the type annotations don't break? Just as we write unit tests, we can do something similar for our type annotations.

We do this using ``assert_type``. Here's an example using mypy:

```python
# main.py

# For Python 3.11 and above:
from typing import assert_type

# Otherwise `pip install typing_extensions`, and use the following:
from typing_extensions import assert_type

# The function needs type annotations otherwise mypy will ignore it:
async def test() -> None:
    # This will pass:
    assert_type(await Band.objects(), list[Band])

    # This will fail:
    assert_type(await Band.objects(), str)
```

``mypy`` will show an error if the type assertion fails:

```
>>> mypy main.py
main.py: error: Expression is of type "list[Band]", not "str"  [assert-type]
```

Check out his [type checking file in Piccolo](https://github.com/piccolo-orm/piccolo/blob/fdb703f4abf461dc323776d9f2611a1dc92a6c92/tests/type_checking.py) - we use it to make sure that all sorts of queries have the correct type annotations.

We run the tests as part of our CI pipeline, which lets us know if something breaks.

Not every project will require these kinds of tests, but for libraries, and certain apps, it can be incredibly useful.

## Related

To learn more about ``TypeVar``, check out our [article about it](../advanced-type-annotations-using-python-s-type-var/).
