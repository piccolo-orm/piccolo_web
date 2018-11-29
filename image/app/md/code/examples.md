# Select

<pre><code class="python">await Band.select('name').where(Band.popularity > 100).run()</code></pre>

# Join

<pre><code class="python">await Band.select('name', 'manager.name').run()</code></pre>

# Delete

<pre><code class="python">await Band.delete().where(Band.band_members == 0 || Manager.status == 'disabled').run()</code></pre>

# Update

<pre><code class="python">await Band.update(band_members=5).where(Band.name == 'Pythonistas').run()</code></pre>
