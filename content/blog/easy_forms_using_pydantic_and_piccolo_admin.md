---
title: Easy Forms using Pydantic and Piccolo Admin
date: 2021-09-23
description: Piccolo admin lets you build custom forms really easily using Pydantic, without having to write HTML, CSS, or Javascript.
draft: false
---

We recently added an exciting feature to Piccolo Admin, which lets you [build a form based on a Pydantic model](https://piccolo-admin.readthedocs.io/en/latest/custom_forms/index.html).

<iframe width="735" height="400" src="https://www.youtube.com/embed/xGdZDmGMkaU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

It makes Piccolo Admin a great platform for building internal tools and business apps. It doesn't require any knowledge of HTML, CSS or Javascript.

This is what it looks like:

<figure>
    <a href="#" class="lightbox">
        <img src="/images/blog/easy-forms-using-pydantic-and-piccolo-admin/screenshot_sidebar.jpg" alt="Piccolo Admin screenshot" />
    </a>
    <figcaption>Forms are accessible in the sidebar.</figcaption>
</figure>

<figure>
    <a href="#" class="lightbox">
        <img src="/images/blog/easy-forms-using-pydantic-and-piccolo-admin/screenshot_form.jpg" alt="Piccolo Admin screenshot" />
    </a>
    <figcaption>An example of a form.</figcaption>
</figure>

Here is the `app.py` file:

```python
# app.py
from piccolo_admin.endpoints import create_admin, FormConfig
from fastapi import FastAPI
from starlette.requests import Request
from pydantic import BaseModel, validator


app = FastAPI()


################################################################################


class Order(BaseModel):
    item_name: str
    quantity: int
    customer_name: str

    @validator("quantity")
    def validate_quantity(cls, value):
        if value < 1:
            raise ValueError("You must order at least 1 item!")
        return value


def order_handler(request: Request, model: Order):
    print(
        f"I just got an order from {model.customer_name} for "
        f"{model.quantity} x {model.item_name}"
    )
    return "Processed order"


order_form = FormConfig(
    name="Order Form",
    pydantic_model=Order,
    endpoint=order_handler,
)

################################################################################

app.mount(
    "/",
    create_admin(
        site_name="MyShop.com",
        tables=[],
        forms=[order_form],
    ),
)
```

And `piccolo_conf.py`:

```python
# piccolo_conf.
from piccolo.conf.apps import AppRegistry
from piccolo.engine.postgres import PostgresEngine


DB = PostgresEngine(config={"database": "form_demo", "user": "postgres"})


# A list of paths to piccolo apps
# e.g. ['blog.piccolo_app']
APP_REGISTRY = AppRegistry(apps=["piccolo_admin.piccolo_app"])
```

To run the app:

- Make sure the database exists.
- Install the requirements - `pip install piccolo[all] piccolo_admin`
- Run all migrations - `piccolo migrations forwards all`
- Create a user to login with - `piccolo user create`
- Start the app - `uvicorn app:app`
