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

    <section class="example">
        <div class="center_wrapper" v-html="examplesHTML"></div>
    </section>

    <div class="neutral">
        <div class="center_wrapper">
            <h1>Getting started</h1>
            <ul>
                <li>Installation</li>
                <li>Documentation</li>
                <li>Discuss</li>
            </ul>
        </div>
    </div>

</div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data: function() {
        return {
            examplesHTML: ''
        }
    },
    created: function() {
        let app = this
        axios.get('/html/code/examples.html').then(
            response => app.examplesHTML = response.data
        )
    }
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
        padding: 1rem;
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

pre {
    font-size: 1.5rem;
}

ul {
    li {
        list-style: square;
    }
}
</style>
