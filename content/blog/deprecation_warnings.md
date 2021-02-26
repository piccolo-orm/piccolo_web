---
title: Deprecation warnings in Python code
date: 2021-02-24
description: A look at how deprecation warnings can be implemented in Python code.
draft: false
---

When working on Python libraries like Piccolo, it's important to evolve it in a graceful way.

Over time code will get added which is regrettable (for example, function names with typos), or is superceded by more modern approaches, and needs to be retired.

Python has a builtin way of handling this, with the `warnings` module. If a function is going to be retired, we can do this:

```python
# app.py
import warnings


def my_regrettable_function():
    warnings.warn(
        "my_regrettable_function will be retired in version 1.0, please "
        "use my_awesome_function instead.",
        DeprecationWarning,
        stacklevel=2
    )
    return "oops"


if __name__ == "__main__":
    my_regrettable_function()

```

When we execute the script, you can see that the Python outputs the warning to stderr:

```bash
>>> python app.py
app.py:16: DeprecationWarning: my_regrettable_function will be retired in version 1.0, please use my_awesome_function instead.
  my_regrettable_function()
```

If you like, you can redirect stderr into a different file, to capture all of the warnings:

```
>>> python app.py 2> warnings.txt
```

Or just straight up ignore the warnings all together:

```
>>> python -W ignore app.py
```

One other cool thing you can do is to turn the warnings into exceptions, to be sure you're not running any deprecated code:

```
>>> python -W error app.py

```

The issue here, is any deprecated code within Python itself will start raising Exceptions. To just target warnings within a given module:

```
>>> python -W error::DeprecationWarning:__main__ app.py
Traceback (most recent call last):
  File "app.py", line 17, in <module>
    my_regrettable_function()
  File "app.py", line 6, in my_regrettable_function
    warnings.warn(
DeprecationWarning: my_regrettable_function will be retired in version 1.0, please use my_awesome_function instead.
```
