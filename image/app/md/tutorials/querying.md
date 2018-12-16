# Querying

## Select

Using this schema:

<pre><code class="language-python">
from piccolo.table import Table
from piccolo.columns import ForeignKey, Varchar


class Manager(Table):
    name = Varchar(max_length=100)


class Band(Table):
    name = Varchar(max_length=100)
    manager = Varchar(max_length=100)

</code></pre>

Here are some ways we can query it.

<pre><code class="language-python">
"""
All of these work with .run() as well inside co-routines.
"""

# To get all rows:
await Band.select().run_sync()

# To get certain rows:
await Band.select('name').run_sync()

# Using column objects instead of strings
await Band.select(Band.name).run_sync()

# Or making an alias to make it shorter
b = Band
await Band.select(b.name).run_sync()

</code></pre>

The advantage of using column objects is your text editor can provide code completion, and a linter can help catch errors.

## Renaming columns

...

## Getting objects

...
