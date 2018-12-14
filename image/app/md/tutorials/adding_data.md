# Adding data

We can now use insert data into our table.

There are two ways to do this, both of which are shown below.

<pre><code class="language-python">
"""
tables.py
"""
from piccolo.tables import Table
from piccolo.columns import Varchar

class Band(Table):
    name = Varchar(length=100)

</code></pre>

You can run your
