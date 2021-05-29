---
title: Piccolo column choices
date: 2021-05-29
description: An introduction to the new 'choices' attribute on Piccolo columns.
draft: false
---

A new feature was recently added to Piccolo, which allows [choices to be specified for columns](https://piccolo-orm.readthedocs.io/en/latest/piccolo/schema/advanced.html#choices). It leverages Python's [Enum](https://docs.python.org/3/library/enum.html) support. Here's an example:

```python
from enum import Enum

from piccolo.columns import Varchar
from piccolo.table import Table


class Director(Table):
    class Gender(str, Enum):
        male = 'm'
        female = 'f'
        non_binary = 'n'

    name = Varchar(length=100)
    gender = Varchar(length=1, choices=Gender)

```

You can now do queries like this:

```python
>>> Director.select().where(
>>>     Director.gender == Director.Gender.male
>>> ).run_sync()
[{'id': 1, 'name': 'George Lucas', 'gender': 'm'}, ...]

>>> director = Director(
>>>     name="Brenda Barton",
>>>     gender=Director.Gender.female
>>> )
>>> director.save().run_sync()
```

Piccolo Admin also supports this feature. When a column has choices specified, a select widget is rendered in the UI.

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/column-choices/column-choices-ui.png" alt="Column choices UI" />
</a>
</figure>
