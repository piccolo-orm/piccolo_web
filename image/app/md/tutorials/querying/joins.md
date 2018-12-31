# Joins

One of the most powerful things about select is it's support for joins.

<pre><code class="language-python">
b = Band
b.select.columns(
    b.manager.name
).run_sync()

</code></pre>
