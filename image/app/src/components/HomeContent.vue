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
                <li>Type annotated, making it work great with tools like VSCode and MyPy</li>
                <li>Fully tested</li>
                <li>Built in migration support</li>
            </ul>
        </div>
    </div>

    <div id="examples">
         <div class="center_wrapper" v-html="examplesHTML"></div>
    </div>

    <div class="neutral">
        <div class="center_wrapper">
            <h1>Getting started</h1>

            <p><a href="https://piccolo-orm.readthedocs.io/en/latest/">Read the docs</a>, and learn the basics in 5 minutes.</p>
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
        axios.get(
            '/html/examples/home_examples.html'
        ).then(function(response) {
            app.examplesHTML = response.data
        })
    }
}
</script>


<style lang="less">
@import "../variables.less";

div.hero {
    background-color: @purple;
    padding-top: 4rem;
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

div#examples {
    background-color: #dadada;
    padding: 1rem;
    box-sizing: border-box;

    h1 {
        color: rgba(0,0,0,0.4);
        font-size: 1.5rem;
    }

    code {
        margin-bottom: 3rem;
    }
}

ul {
    li {
        list-style: square;
    }
}
</style>
