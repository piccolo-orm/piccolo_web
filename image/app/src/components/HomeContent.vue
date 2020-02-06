<template>
    <div>
        <div class="hero">
            <h2>
                <font-awesome-icon :icon="['fab', 'python']" />A fast, async ORM for Python, that's easy to learn
            </h2>
        </div>

        <div class="neutral">
            <div class="center_wrapper">
                <h1>Benefits</h1>
                <ul id="benefits">
                    <li
                        v-bind:key="benefit"
                        v-for="benefit in benefits"
                    >
                        <font-awesome-icon icon="check" />
                        <span v-html="benefit"></span>
                    </li>
                </ul>
            </div>
        </div>

        <div id="examples">
            <div
                class="center_wrapper"
                v-html="examplesHTML"
            ></div>
        </div>

        <div class="neutral">
            <div class="center_wrapper">
                <h1>Getting started</h1>

                <p>
                    <a href="https://piccolo-orm.readthedocs.io/en/latest/">Read the docs</a>, and learn the basics in 5 minutes.
                </p>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios"

export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    data: function() {
        return {
            examplesHTML: "",
            benefits: [
                "<b>Supports Postgres and SQLite</b>",
                "<b>Async and sync support</b>",
                "<b>A builtin playground</b> - which makes learning a breeze",
                "<b>Tab completion support</b> - works great with iPython and VSCode",
                "<b>Batteries included</b> - a User model, authentication, migrations, an admin, and more",
                "<b>Modern Python</b> - fully type annotated",
                "<b>Built for web developers and data scientists</b>"
            ]
        }
    },
    created: function() {
        let app = this
        axios.get("/html/examples/home_examples.html").then(function(response) {
            app.examplesHTML = response.data
        })
    }
}
</script>


<style lang="less">
@import "../variables.less";

div.hero {
    background-color: @light_blue;
    padding-top: 4rem;
    text-align: center;

    h2 {
        color: white;
        font-size: 2.2rem;
        font-weight: bold;
        margin: 0;
        padding: 10rem 1rem;
        box-sizing: border-box;

        svg {
            padding-right: 0.5rem;
        }
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
    background-color: whitesmoke;
    padding: 1rem;
    box-sizing: border-box;

    h1 {
        color: rgba(0, 0, 0, 0.8);
        font-size: 1rem;
        text-transform: uppercase;
    }

    code {
        margin-bottom: 3rem;
    }
}

ul#benefits {
    padding-left: 0;

    li {
        list-style: none;
        padding: 0.5rem 0;

        svg {
            color: green;
            padding-right: 0.5rem;
        }
    }
}
</style>
