<template>
    <Layout>
        <div id="home">
            <div class="hero">
                <!--
                Using an inline style to stop the SVG being too large when only
                the static HTML has been loaded.
                -->
                <h2>
                    <font-awesome-icon
                        :icon="['fab', 'python']"
                        style="max-height: 2.2rem"
                    />A fast, async ORM for Python, that's easy to learn
                </h2>
            </div>

            <section>
                <div class="center_wrapper">
                    <h1>Benefits</h1>
                    <ul id="benefits">
                        <li v-bind:key="benefit" v-for="benefit in benefits">
                            <font-awesome-icon
                                icon="check"
                                style="max-height: 1rem"
                            />
                            <span v-html="benefit"></span>
                        </li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="center_wrapper">
                    <h1>Examples</h1>
                    <div id="examples">
                        <div
                            v-html="$page.examples.edges[0].node.content"
                        ></div>
                    </div>
                </div>
            </section>

            <section>
                <div class="center_wrapper">
                    <h1>Getting started</h1>

                    <p>
                        <a href="https://piccolo-orm.readthedocs.io/en/latest/"
                            >Read the docs</a
                        >, and learn the basics in 5 minutes.
                    </p>
                </div>
            </section>

            <section class="posts">
                <div class="center_wrapper">
                    <h2>Recent Blog Posts</h2>
                    <p v-for="edge in $page.posts.edges" :key="edge.node.title">
                        <g-link :to="edge.node.path">{{
                            edge.node.title
                        }}</g-link>
                    </p>
                    <p><a href="/blog/">View all</a></p>
                </div>
            </section>
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
    posts: allBlogPost(limit: 5, order: DESC, sortBy: "date") {
        edges {
            node {
                title
                path
            }
        }
    }
}
</page-query>


<script>
export default {
    data: function () {
        return {
            benefits: [
                "<b>Supports Postgres and SQLite</b>",
                "<b>Async and sync support</b>",
                "<b>A builtin playground</b> - which makes learning a breeze",
                "<b>Tab completion support</b> - works great with iPython and VSCode",
                "<b>Batteries included</b> - a User model, authentication, migrations, an admin, and more",
                "<b>Modern Python</b> - fully type annotated",
                "<b>Built for web developers and data scientists</b>",
            ],
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
                        "A fast, async ORM for Python, that's easy to learn.",
                },
            ],
        }
    },
}
</script>


<style lang="less">
@import "../variables.less";

div#home {
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

    section {
        box-sizing: border-box;
        padding: 3rem 0;

        h1 {
            margin: 0;
            padding: 1rem 0;
        }

        ul {
            margin: 0;
        }

        &:nth-child(odd) {
            background-color: @blue_grey;
        }
    }

    div#examples {
        h1 {
            font-size: 1rem;
            text-transform: uppercase;
            border-bottom: 0.2rem solid @light_blue;
            display: inline-block;
            padding-bottom: 0;
            margin-bottom: 0.5rem;
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

    section.posts {
        background-color: @extra_dark_blue;

        h2 {
            color: white;
        }

        div {
            padding: 3rem 1rem;
        }

        a {
            border-bottom: 0.2em solid @light_blue;
            color: white;
        }
    }
}
</style>
