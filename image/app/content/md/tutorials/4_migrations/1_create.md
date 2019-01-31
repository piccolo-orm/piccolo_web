{
    "title": "Create your first migration",
    "draft": false
}

<!-- start -->

Migrations are used to create the tables in the database.

<pre><code class="language-bash">
piccolo new

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

<pre><code class="language-python">
from ..tables import Band

ID = '2018-09-04T19:44:09'


async def forwards():
    transaction = Band.Meta.db.transaction()

    transaction.add(
        Band.create_without_columns(),

        Band.alter().add(
            'name',
            Varchar(length=100)
        ),
    )

    await transaction.run()


async def backwards():
    await Band.drop().run()

</code></pre>

## Running migrations

When the migration is run, the forwards function is executed. To do this:

<pre><code class="language-bash">
piccolo forwards

</code></pre>

Inspect your database, and a ```band``` table should now exist.

## Reversing migrations

To reverse the migration, run this:

<pre><code class="language-bash">
piccolo backwards 2018-09-04T19:44:09

</code></pre>

This executes the backwards function.

You can try going forwards and backwards a few times to make sure it works as expected.
