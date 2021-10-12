---
title: Python's graphlib is awesome
date: 2021-12-06
description: An introduction to the the graphlib module which got added to the Python standard library in version 3.9.
draft: false
---

The [`graphlib` module](https://docs.python.org/3/library/graphlib.html) was added in Python 3.9, and it's a great addition to the standard library. Piccolo [uses it a lot](https://github.com/piccolo-orm/piccolo/blob/14af797c4f613b4490fad3942b73a69dde512a88/piccolo/table.py#L1051).

As the name suggests, `graphlib` is used for sorting data which is in a graph-like structure.

For example, in Piccolo we often need to sort tables based on their foreign key columns.

Take this schema as an example:

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/pythons-graphlib-is-awesome/schema_graph_small.png" alt="Example database schema" />
</a>
<figcaption>A simple database schema</figcaption>
</figure>

When creating the tables, we need to make sure that the `Manager` table is created before the `Band` table, as there's a foreign key from `Band` to `Manager`. In the parlance of graphs, each table is a node, and each foreign key is an edge.

You might think, OK - let's just use Python's built-in [`sorted` function](https://docs.python.org/3/library/functions.html#sorted) to determine the correct order. For complex graphs, with multiple nodes and edges, the sort function just doesn't work.

The `sorted` function works in situations like this:

```python
>>> sorted([1,3,2,5,4])
[1,2,3,4,5]
```

When sorting more complex types, you can pass a `key` argument to `sorted`, telling it how to compare the various elements. But when each element in the list has complex relationships to other elements in the list, the output won't be what you expect.

Thankfully `graphlib` comes to the rescue. Tools such as `graphlib` have existing for a long time (for example [NetworkX](https://networkx.org/)), but having something in the standard library which solves common use cases is very welcome.

All we have to do to sort the above schema is this:

```python
from graphlib import TopologicalSorter

# The graph is a dictionary mapping nodes to a set of connected nodes.
graph = {'band': {'manager'}, 'manager': set()}
sorter = TopologicalSorter(graph)
ordered = tuple(sorter.static_order())
>>> print(ordered)
('manager', 'band')
```

That was a trivial example, here's a slightly more complex schema:

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/pythons-graphlib-is-awesome/schema_graph.png" alt="Example database schema" />
</a>
<figcaption>A slightly more complex database schema</figcaption>
</figure>

```python
from graphlib import TopologicalSorter

graph = {
    'band': {'manager'},
    'manager': set(),
    'concert': {'band', 'venue'},
    'venue': set(),
}
sorter = TopologicalSorter(graph)
ordered = tuple(sorter.static_order())
>>> print(ordered)
('manager', 'venue', 'band', 'concert')
```

I encourage you to check `graphlib` out - it's really useful, and quite fun.
