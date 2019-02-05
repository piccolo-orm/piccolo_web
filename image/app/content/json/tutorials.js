module.exports = [
    {
        title: 'Getting Started',
        slug: 'getting-started',
        steps: [
            {
                title: 'Installing Piccolo',
                src: '1_getting_started/1_installing_piccolo.html',
                slug: 'installing-piccolo',
                description: 'How to install Piccolo.'
            },
            {
                title: 'Setting up Postgres',
                src: '1_getting_started/2_setting_up_postgres.html',
                slug: 'setting-up-postgres',
                description: 'How to set up Postgres.'
            },
            {
                title: 'Playground',
                src: '1_getting_started/3_playground.html',
                slug: 'playground',
                description: 'How to install the playground to learn Piccolo.'
            },
            {
                title: 'Sync vs Async',
                src: '1_getting_started/4_sync_vs_async.html',
                slug: 'sync-vs-async',
                description: 'The difference between sync and async in the Piccolo ORM.'
            },
        ]
    },
    {
        title: 'Querying',
        slug: 'querying',
        steps: [
            {
                title: 'Select',
                src: '2_querying/1_select.html',
                slug: 'select',
                description: 'How to run select queries in the Piccolo ORM.'
            },
            {
                title: 'Objects',
                src: '2_querying/2_objects.html',
                slug: 'objects',
                description: 'How to get row objects using the Piccolo ORM.'
            },
            {
                title: 'Raw',
                src: '2_querying/3_raw.html',
                slug: 'raw',
                description: 'How to execute raw SQL queries using the Piccolo ORM.'
            },
            {
                title: 'Delete',
                src: '2_querying/4_delete.html',
                slug: 'delete',
                description: 'How to delete rows using the Piccolo ORM.'
            },
            {
                title: 'Insert',
                src: '2_querying/5_insert.html',
                slug: 'insert',
                description: 'How to insert rows using the Piccolo ORM.'
            },
            {
                title: 'Update',
                src: '2_querying/6_update.html',
                slug: 'update',
                description: 'How to update rows using the Piccolo ORM.'
            },
        ]
    },
    {
        title: 'Schema',
        slug: 'schema',
        steps: [
            {
                title: 'Creating',
                src: '3_schema/1_creating.html',
                slug: 'creating',
                description: 'How to create database tables using the Piccolo ORM.'
            },
        ]
    },
    {
        title: 'Migrations',
        slug: 'migrations',
        steps: [
            {
                title: 'Create',
                src: '4_migrations/1_create.html',
                slug: 'create',
                description: 'How to create database migrations using the Piccolo ORM.'
            },
        ]
    },
    {
        title: 'Extras',
        slug: 'extras',
        steps: [
            {
                title: 'User',
                src: '5_extras/1_user.html',
                slug: 'user',
                description: 'How the user table and authentication works in the Piccolo ORM.'
            }
        ]
    },
]