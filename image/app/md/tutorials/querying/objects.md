{
    "title": "Objects",
    "tutorial": "Querying"
}

<!-- start -->

When doing `select` queries, you got data back in the form of a list of dictionaries (where each dictionary represents a row).

This is useful in a lot of situations, but it's also useful to get objects back instead.

In Piccolo, an instance of a Table subclass represents a row. Lets do an example.

<pre><code class="language-python">
# To get all objects:
Band.objects.run_sync()

# To get certain rows:
Band.objects.where(Band.name == 'Pythonistas').run_sync()

# Get the first row
Band.objects.first().run_sync()

</code></pre>

You'll notice that the API is similar to `select` - except it returns all columns.

## Saving objects

Objects have a save method, which is convenient for updating values:

<pre><code class="language-python">
# To get certain rows:
pythonistas = Band.objects.where(
    Band.name == 'Pythonistas'
).first().run_sync()

pythonistas.popularity = 100000
pythonistas.save().run_sync()

</code></pre>
