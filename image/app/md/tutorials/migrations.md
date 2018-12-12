# Migrations

## Create your first migration

Migrations are used to create the tables in the database.

<pre><code class="language-bash">
migration new

</code></pre>

This creates a migrations folder, along with a migration file.

The migration filename is a timestamp, which also serves as the migration ID.

<pre><code class="language-bash">
migrations/
    2018-09-04T19:44:09.py

</code></pre>

The contents of the migration file look like this:

<pre><code class="language-python">
ID = '2018-09-04T19:44:09'


async def forwards():
    pass


async def backwards():
    pass

</code></pre>

## Populating the migration

At the moment, this migration does nothing when run - we need to populate the forwards and backwards functions.

<em>In the future, migrations will be populated automatically.</em>

## Running migration

When the migration is run, the forwards function is executed. To do this:

<pre><code class="language-bash">
migration.py forwards
</code></pre>

## Reversing migrations

To reverse the migration, run this:

<pre><code class="language-bash">
migration.py backwards 2018-09-04T19:44:09
</code></pre>

This executes the backwards function.

You can try going forwards and backwards a few times to make sure it works as expected.
