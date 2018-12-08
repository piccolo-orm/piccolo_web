<template>
<div>
    <div class="hero">
        <h2>A fast, async ORM for Python, that's easy to learn</h2>
    </div>

    <div class="neutral">
        <div class="center_wrapper">
            <h1>Benefits</h1>
            <ul>
                <li>Supports asyncio</li>
                <li>Type annotated, making it work great with tools like VSCode</li>
                <li>Fully tested</li>
                <li>Built in migration support</li>
            </ul>
        </div>
    </div>

    <section class="example" v-for="example in examples" v-bind:key="example[0]">
        <div class="center_wrapper">
            <h1>{{ example[0] }}</h1>
            <pre><code class="language-python" v-html="example[1]"></code></pre>
        </div>
    </section>

    <div class="neutral">
        <div class="center_wrapper">
            <h1>Getting started</h1>

            <h2>Installation</h2>

            <pre><code class="language-bash">pip install piccolo</code></pre>

            <h2>Quick start tutorial</h2>

            <p><a href="#">Learn the basics in 5 minutes.</a></p>

            <!-- <ul>
                <li>Documentation</li>
                <li>Discuss</li>
            </ul> -->
        </div>
    </div>

</div>
</template>


<script>

const selectExample = `await Band.select(
    'name'
).where(
    Band.popularity > 100
).run()`

const joinExample = `await Band.select(
    'name',
    'manager.name'
).run()`

const deleteExample = `await Band.delete().where(
    Band.band_members == 0 | Manager.status == 'disabled'
).run()`

const updateExample = `await Band.update(band_members=5).where(
    Band.name == 'Pythonistas'
).run()`

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
                    selectExample
                ],
                [
                    'Join',
                    joinExample
                ],
                [
                    'Delete',
                    deleteExample
                ],
                [
                    'Update',
                    updateExample
                ]
            ]
        }
    },
}
</script>


<style lang="less">
@dark_purple: #230042;
@purple: #490188;
@pink: rgb(255, 180, 209);
@dark_grey: #404040;

div.hero {
    background-color: @purple;
    text-align: center;

    h2 {
        color: white;
        margin: 0;
        padding: 5rem 0;
    }
}

div.center_wrapper {
    max-width: 50rem;
    box-sizing: border-box;
    padding: 1rem;
    margin: 0 auto;
}

div.neutral {
    background-color: white;
    padding: 3rem 1rem;
    box-sizing: border-box;

    h1 {
        margin: 0;
        padding: 1rem 0;
    }

    ul {
        margin: 0;
    }
}

section {
    background-color: #dadada;
    padding: 1rem;
    box-sizing: border-box;

    h1 {
        color: rgba(0,0,0,0.4);
    }
}

ul {
    li {
        list-style: square;
    }
}
</style>
