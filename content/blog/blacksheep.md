---
title: BlackSheep
date: 2021-06-10
description: The Piccolo ORM now supports Blacksheep, a Python web framework, which is ASGI compatible.
draft: false
---

Piccolo supports several [ASGI](/blog/introduction-to-asgi/) web frameworks out of the box - just use the `piccolo asgi new` command and it will create you a new web app ([see the docs](https://piccolo-orm.readthedocs.io/en/latest/piccolo/asgi/index.html)).

A Piccolo user recently asked for help integrating with [BlackSheep](https://www.neoteroi.dev/blacksheep/), which is a promising looking ASGI web framework. I decided to add support for it within Piccolo, so it's now an option when using `piccolo asgi new`.

<figure>
    <img src="/images/blog/blacksheep/blacksheep_logo.png" class="medium" />
</figure>

Some interesting features of BlackSheep are:

 * **OpenAPI support** -  BlackSheep can [automatically create OpenAPI docs](https://www.neoteroi.dev/blacksheep/openapi/) from the type annotations of your endpoints, similar to FastAPI.
 * **Performance** - some of the BlackSheep internals are implemented in Cython, which should help deliver good performance.
 * **Flexible design** - endpoints can be class based or function based.

Check out the [docs](https://www.neoteroi.dev/blacksheep/) for more details.
