<template>
<div>
    <nav>
        <h1>Piccolo</h1>
        <ul><li><a href="#"><font-awesome-icon icon="github" /> Github</a></li></ul>
    </nav>

    <div class="hero">
        <h2>A fast, async ORM for Python, that's easy to learn</h2>
    </div>

    <div class="neutral">
        <h1>Benefits</h1>
        <ul>
            <li>Type annotated - making it work great with tools like VSCode.</li>
            <li>Fully tested</li>
            <li>Built in migration support</li>
        </ul>
    </div>

    <section class="example" v-for="example in examples" v-bind:key="example[0]">
        <h1>{{ example[0] }}</h1>
        <pre v-highlightjs="example[1]"><code class="javascript"></code></pre>
    </section>

    <div class="neutral">
        <h1>Getting started</h1>
        <ul>
            <li>Installation</li>
            <li>Documentation</li>
            <li>Discuss</li>
        </ul>
    </div>

</div>
</template>


<script>
export default {
    name: 'HelloWorld',
    props: {
    msg: String
    },
    data: function() {
        return {
            examples: [
                [
                    'Select',
                    "await Pokemon.select('name').where(Pokemon.power > 100).run()"
                ],
                [
                    'Join',
                    "await Pokemon.select('trainer.name', 'name').run()"
                ],
                [
                    'Delete',
                    "await Pokemon.delete().where(Pokemon.color == 'red' & Trainer.name == 'Bob').run()"
                ],
                [
                    'Update',
                    "await Pokemon.delete().where(Pokemon.color == 'red' & Trainer.name == 'Bob').run()"
                ]
            ]
        }
    }
}
</script>


<style scoped lang="less">
@dark_purple: #230042;
@pink: rgb(255, 180, 209);
@dark_grey: #404040;

nav {
    background-color: @dark_purple;
    color: white;
    display: flex;
    flex-direction: row;

    h1 {
        display: inline-block;
        flex-grow: 1;
        margin: 0;
        padding: 1rem 2rem;
    }

    ul {
        display: inline-block;
        flex-grow: 0;
        padding-right: 1rem;

        li {
            list-style: none;

            a {
                color: white;
                text-decoration: none;
            }
        }
    }
}

div.hero {
    background-color: @pink;
    text-align: center;

    h2 {
        color: rgba(0,0,0,0.8);
        margin: 0;
        padding: 5rem 0;
    }
}

div.neutral {
    background-color: #f0f0f0;
    padding: 3rem 1rem;
    box-sizing: border-box;

    h1 {
        margin: 0;
        padding: 1rem;
    }

    ul {
        margin: 0;
    }
}

h3 {
  margin: 40px 0 0;
}

section {
    background-color: @dark_grey;
    padding: 1rem;
    box-sizing: border-box;

    h1 {
        color: white;
    }
}

pre {
    font-size: 1.5rem;
}

ul {
    li {
        list-style: square;
    }
}
</style>
