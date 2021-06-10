---
title: Frozen queries
date: 2021-06-10
description: An introduction to the frozen query feature in the Piccolo ORM, which aids performance.
draft: false
---

<img src="/images/blog/frozen-queries/sql.jpg" />

A feature which was recently added to Piccolo is [frozen queries](https://piccolo-orm.readthedocs.io/en/latest/piccolo/query_clauses/freeze.html).


The purpose of an ORM / query builder like Piccolo is pretty simple - it converts a query defined in Python code into SQL. This process takes a little bit of time, which makes queries slightly slower than writing SQL by hand.

In a typical web application, you'll usually have some queries which are run over and over again. Converting those queries into SQL each time they are run is a little bit wasteful.

To tackle this, Piccolo queries can now be 'frozen'. This precalculates the SQL, so it only has to be calculated once, irrespective of how many times the query is run. Once a query is frozen, you can't apply any more clauses to it (`where`, `order_by` etc), as this would cause the SQL to be different.

Here's an example:

```python
LATEST_ARTICLES = Article.select(
    Article.id,
    Article.title
).order_by(
    Article.published_on,
    ascending=False
).limit(
    10
).output(
    as_json=True
).freeze()

# In the corresponding view/endpoint of whichever web framework
# you're using:
async def latest_articles(self, request):
    return await LATEST_ARTICLES.run()
```

Bear in mind that most of the time spent running a query is waiting for a response from the database, so end users won't notice much difference if your queries are frozen or not.  But for apps which require high throughput, every little helps, and it makes sense to use frozen queries where possible.
