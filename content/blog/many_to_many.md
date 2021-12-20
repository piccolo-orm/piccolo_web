---
title: Many-to-Many relationships
date: 2021-12-20
description: The Piccolo ORM and query builder now has support for Many-To-Many relationships.
draft: false
---

Piccolo has a new API for [Many-To-Many relationships](https://piccolo-orm.readthedocs.io/en/latest/piccolo/schema/m2m.html).

We put a lot of work into making it powerful and user friendly.

Take this schema as an example, where you have bands, and they belong to musical genres:

```python
from piccolo.columns.column_types import (
    ForeignKey,
    LazyTableReference,
    Varchar
)
from piccolo.columns.m2m import M2M


class Band(Table):
    name = Varchar()
    genres = M2M(LazyTableReference("GenreToBand", module_path=__name__))


class Genre(Table):
    name = Varchar()
    bands = M2M(LazyTableReference("GenreToBand", module_path=__name__))


# This is our joining table:
class GenreToBand(Table):
    band = ForeignKey(Band)
    genre = ForeignKey(Genre)
```

We can do all kinds of awesome queries:

```python
>>> await Band.select(Band.name, Band.genres(Genre.name, as_list=True))
[
    {
        "name": "Pythonistas",
        "genres": ["Rock", "Folk"]
    },
    ...
]
```

To get the results as dictionaries:

```python
>>> await Band.select(Band.name, Band.genres(Genre.id, Genre.name))
[
    {
        "name": "Pythonistas",
        "genres": [
            {"id": 1, "name": "Rock"},
            {"id": 2, "name": "Folk"}
        ]
    },
    ...
]
```

We can also use it in reverse, to get all bands which belong to a given genre.

```python
>>> await Genre.select(Genre.name, Genre.bands(Band.name, as_list=True))
[
    {
        "name": "Rock",
        "bands": ["Pythonistas", "C-Sharps"]
    },
    ...
]
```

There are lots of other powerful features - [see the docs](https://piccolo-orm.readthedocs.io/en/latest/piccolo/schema/m2m.html) for more information.
