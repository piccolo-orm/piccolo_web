---
title: Headless Blog
description: Build a headless blog from scratch in just 5 minutes!
---

In this tutorial we're going to build a headless blog in just 5 minutes!

A headless blog exposes its data via an API. This allows a clean separation between the frontend and backend.

You can then build the frontend using the technology of your choice, may that be Vue, React, a native app, or anything else.

**NOTE - built using Piccolo 0.8.3.**

## Step 1 - Schema

```python

# tables.py
from datetime import datetime

from piccolo.tables import Table
from piccolo.columns.column_types import Text, Varchar, Timestamp, ForeignKey


class Author(Table):
    name = Varchar(length=255)
    twitter = Varchar(length=255, default='')
    bio = Text(default='')


class Post(Table):
    title = Varchar(length=255, unique=True)
    content = Text(default='')
    description = Text(default='')
    posted_on = Timestamp()
    created_on = Timestamp(default=datetime.now)
    author = ForeignKey(Author, null=True)

    async def categories(self):
        await return CategoryToPost.select(
            CategoryToPost.category.name
        ).where(
            post=self.id
        ).output(
            as_list=True
        ).run()


class Category(Table):
    name = Varchar(length=100)


class CategoryToPost(Table)
    category = ForeignKey(Category)
    post = ForeignKey(Post)



```
