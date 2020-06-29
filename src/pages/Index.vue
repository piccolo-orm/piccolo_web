<template>
    <Layout>
        <div>
            <div class="hero">
                <!--
                Using an inline style to stop the SVG being too large when only
                the static HTML has been loaded.
                -->
                <h2>
                    <font-awesome-icon
                        :icon="['fab', 'python']"
                        style="max-height: 2.2rem;"
                    />A fast, async ORM for Python, that's easy to learn
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
                            <font-awesome-icon
                                icon="check"
                                style="max-height: 1rem;"
                            />
                            <span v-html="benefit"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="examples">
                <div
                    class="center_wrapper"
                    v-html="$page.examples.edges[0].node.content"
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
    </Layout>
</template>


<page-query>
query {
	examples: allExample(limit: 1) {
        edges {
            node {
                content
            }
        }
    }
}
</page-query>


<script>
export default {
    data: function() {
        return {
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
    metaInfo() {
        return {
            title: "Piccolo ORM",
            meta: [
                {
                    key: "description",
                    name: "description",
                    content:
                        "A fast, async ORM for Python, that's easy to learn."
                }
            ]
        }
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

        @media (max-width: @mobile_width) {
            font-size: 1.6rem;
        }

        svg {
            padding-right: 0.5rem;
        }
    }
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

    pre {
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
