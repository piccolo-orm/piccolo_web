# Step 1 - Define schema

<pre><code class="language-python">
from piccolo.tables import Table
from piccolo.columns import Varchar

class Band(Table):
    name = Varchar(length=100)


</code></pre>
