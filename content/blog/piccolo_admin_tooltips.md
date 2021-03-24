---
title: Piccolo Admin tooltips
date: 2021-03-23
description: Adding tooltips to the Piccolo admin for help text.
draft: false
---


The [Piccolo Admin](https://github.com/piccolo-orm/piccolo_admin) now has support for tooltips, which can be added for tables and columns.

Here's are some screenshots:

<figure>
<a href="#" class="lightbox">
    <img src="/images/blog/piccolo-admin-tooltips/column_tooltip.png" class="small" alt="column tooltip" />
</a>
</figure>

<figure>
<a href="#" class="lightbox">
    <img src="/images/blog/piccolo-admin-tooltips/table_tooltip.png" class="small" alt="table tooltip" />
</a>
</figure>

Often database tables get quite complex, and providing hints to the user about what a table is for, and what the columns represent, can be very helpful.

Adding them is very simple:

```python
# tables.py
from piccolo.columns import Varchar
from piccolo.table import Table


class Movie(Table, help_text="Movies which were released in cinemas."):
    name = Varchar(help_text="The name it was released under in the USA.")

```

And then we just run the admin as usual:

```python
# app.py
from piccolo_admin.endpoints import create_admin

from tables import Movie


app = create_admin(tables=[Movie])


if __name__ == '__main__':
     import uvicorn
     uvicorn.run(app)
```
