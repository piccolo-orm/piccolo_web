# Select

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

Here are some simple queries:

<pre><code class="language-python">
"""
All of these work with .run() as well inside co-routines.
"""

# To get all rows:
Band.select.run_sync()
>>> [{'id': 1, 'name': 'Pythonistas', 'manager': 1, 'popularity': 1000},
>>> {'id': 2, 'name': 'Rustaceans', 'manager': 2, 'popularity': 500}]


# To get certain rows:
Band.select.columns(Band.name).run_sync()
>>> [{'name': 'Rustaceans'}, {'name': 'Pythonistas'}]


# Or making an alias to make it shorter
b = Band
b.select.columns(b.name).run_sync()

</code></pre>

The advantage of using column objects over say strings, is your text editor can provide code completion, and a linter can help catch errors.

<em>Following along - install Piccolo and run `piccolo playground`.</em>

## Data returned

You use a select query when you want to get data back in the form of a list of dictionaries (where each dictionary represents a row).
