# Schema

## Defining the schema

The first step is to define your schema. Create a file called tables.py.

This reflects the tables in your database. Each table consists of several columns.

<pre><code class="language-python">
"""
tables.py
"""
from piccolo.tables import Table
from piccolo.columns import Varchar


class Band(Table):
    name = Varchar(length=100)

</code></pre>

For a full list of columns, <a href="#">see here</a>.

## Connecting to the database

In order to create the tables in the database you need to provide Piccolo with your connection details.

You do this by creating an Engine instance, and providing it to your Table's Meta.

<pre><code class="language-python">
from piccolo.engine.postgres import PostgresEngine

# Replace these with your local DB credentials.
DB = PostgresEngine({
    'host': 'localhost',
    'database': 'piccolo_tutorial',
    'user': 'postgres',
    'password': ''
})

</code></pre>

Here I'd like to show all of the files at this point ...
