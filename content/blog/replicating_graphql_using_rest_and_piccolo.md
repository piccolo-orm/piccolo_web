---
title: Replicating GraphQL using REST, Piccolo, and FastAPI
date: 2021-12-03
description: A look at how we can replicate a lot of great GraphQL features, using a REST API and Piccolo.
draft: false
---

<iframe width="726" height="400" src="https://www.youtube.com/embed/OUvWn0GUDSI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[GraphQL](https://graphql.org/) is a really powerful approach to building APIs. It allows clients to specify exactly what data they want. Contrast this with most [REST APIs](https://en.wikipedia.org/wiki/Representational_state_transfer), where a given endpoint typically returns the data in the same structure each time.

The advantages of being able to request exactly the data we need are:

- Less data needs to be transferred over the network.
- By giving the client more flexibility, it's less likely a backend engineer will have to make arbitrary changes to the API (for example, adding / removing fields).
- Potentially less load on the API server, if it only has to return what's needed, and not additional data.

The downside though is GraphQL is quite a big investment in terms of setup and learning. Also, a lot of companies already have REST APIs. What if we can replicate some of the advantages of GraphQL using REST? Enter [Piccolo](https://github.com/piccolo-orm/piccolo) and [FastAPI](https://github.com/tiangolo/fastapi).

## PiccoloCRUD

Piccolo has a class called [PiccoloCRUD](https://piccolo-api.readthedocs.io/en/latest/crud/piccolo_crud.html) which basically makes a super endpoint from a Piccolo table. As the name suggests, it supports all of the CRUD operations, and some really powerful filtering.

We recently made some big improvements - namely, being able to request specific fields, and even doing joins. It also integrates seamlessly with [FastAPI](https://piccolo-api.readthedocs.io/en/latest/fastapi/index.html), so the endpoint has automatic Swagger docs.

It's as simple as this:

```python
from fastapi import FastAPI
from piccolo_api.crud.endpoints import PiccoloCRUD
from piccolo_api.fastapi.endpoints import FastAPIWrapper

from movies.tables import Movie


app = FastAPI()


FastAPIWrapper(
    "/movies/",
    app,
    PiccoloCRUD(Movie, read_only=True, exclude_secrets=True, max_joins=1),
)

```

Here is the schema we're using:

```python
from piccolo.columns import (
    ForeignKey,
    Integer,
    Real,
    Varchar,
)
from piccolo.table import Table


class Director(Table):
    name = Varchar(length=300, null=False)
    net_worth = Integer(secret=True, help_text="In millions")


class Movie(Table):
    name = Varchar(length=300)
    rating = Real(help_text="The rating on IMDB.")
    director = ForeignKey(references=Director)

```

You can get the [entire source code on GitHub](https://github.com/piccolo-orm/piccolo_videos/blob/main/making_a_powerful_rest_api_like_graphql/).

## Trying it out

If we query the endpoint, we get a response like:

```json
GET /movies/

{
    "rows": [
        {
            "id": 1
            "name": "Star Wars: A New Hope",
            "rating": 8.6,
            "director": 1
        }
    ]
}
```

Now lets try fetching a subset of fields, using the `__visible_fields` parameter:

```json
GET /movies/?__visible_fields=name,director.name

{
    "rows": [
        {
            "name": "Star Wars: A New Hope",
            "director": {
                "name": "George Lucas"
            }
        }
    ]
}
```

Note how we got a nested object when we specified `director.name` as a field name, as it belongs to a related table. Piccolo performs the necessary joins under the hood.

You can also try this out via FastAPI's Swagger docs:

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/replicating-graphql-using-rest-and-piccolo/swagger_docs.jpg" alt="Swagger docs" />
</a>
<figcaption>All of the filters are visible in the Swagger docs</figcaption>
</figure>

## Security

You'll notice in the table definition that we designated the `Director.net_worth` column as `secret=True`. What this means is the value returned by the API is only ever `null`.

It means we can shield sensitive information from clients if we want to.

We can also limit the number of joins which are allowed, using the `max_joins` parameter on `PiccoloCRUD`. This prevents clients from doing queries which are overly complex, and would potentially slow down our API.

## Conclusions

I hope this illustrates how powerful `PiccoloCRUD` is, and how we're able to build something with very little code which approximates what GraphQL can do.

It's a great way of rapidly building an API, which could save on some bandwidth too!
