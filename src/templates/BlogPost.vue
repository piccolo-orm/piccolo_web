<template>
    <Layout>
        <div class="blog_single">
            <div class="hero">
                <div class="center_wrapper">
                    <p id="back">
                        <g-link to="/blog/">
                            <font-awesome-icon icon="chevron-left" />All posts
                        </g-link>
                    </p>
                    <h1>{{ $page.blogPost.title }}</h1>
                </div>
            </div>

            <div class="center_wrapper">
                <div v-html="$page.blogPost.content"></div>
                <p id="posted_on">
                    Posted on: {{ $page.blogPost.date | customString }}
                </p>
            </div>
        </div>

        <p class="discussion">
            <font-awesome-icon icon="comment" />
            Have any comments or feedback on this post?
            <a href="https://github.com/piccolo-orm/piccolo/discussions"
                >Chat with us on GitHub.</a
            >
        </p>

        <Lightbox />
    </Layout>
</template>


<page-query>
query BlogPost ($path: String!) {
  blogPost: blogPost (path: $path) {
    title
    content
    date
    description
  }
}
</page-query>


<script>
import Lightbox from "../components/Blog/Lightbox"

export default {
    metaInfo() {
        return {
            title: this.$page.blogPost.title,
            titleTemplate: "%s - Piccolo Blog",
            meta: [
                {
                    key: "description",
                    name: "description",
                    content: this.$page.blogPost.description,
                },
            ],
        }
    },
    components: {
        Lightbox,
    },
}
</script>

<style lang="less">
@import "../variables.less";

div.blog_single {
    padding-top: 4rem;
    padding-bottom: 8rem;

    div.hero {
        background-color: @blue_grey;
        box-sizing: border-box;
        padding: 1rem 0;

        h1 {
            color: @medium_blue;
            font-size: 2.5rem;
            font-weight: normal;
        }
    }

    a {
        text-decoration: none;
    }

    h1 {
        margin-bottom: 0;
    }

    h2 {
        margin-top: 2.5rem;
    }

    p,
    li {
        code {
            padding: 2px 4px;
            background-color: @blue_grey;
            border-radius: 4px;
        }
    }

    figure {
        margin: 1rem 0;
        text-align: center;

        img {
            max-width: 100%;
            margin: 0 auto;

            &.medium {
                max-width: 100%;
                width: 25rem;
            }

            &.small {
                max-width: 100%;
                width: 15rem;
            }
        }

        figcaption {
            font-size: 0.7rem;
            color: rgb(119, 119, 119);
            display: block;
            padding: 0.2rem;
        }
    }

    p {
        text-align: justify;
    }

    p#posted_on {
        color: lighten(@medium_blue, 20%);
        font-size: 0.8rem;
        font-weight: bolder;
        margin-top: 0;
        margin-bottom: 1.5rem;
    }

    p#back {
        a {
            background-color: @light_blue;
            color: white;
            padding: 0.4rem 0.6rem;
            text-transform: uppercase;
            font-size: 0.7rem;
            text-decoration: none;
            transition: 1s background-color;

            svg {
                padding-right: 0.5rem;
                transition: 0.5s transform;
            }

            &:hover {
                background-color: lighten(@light_blue, 10%);

                svg {
                    transform: translateX(-0.2rem);
                }
            }
        }
    }
}

p.discussion {
    background-color: @blue_grey;
    box-sizing: border-box;
    color: @medium_blue;
    margin: 0;
    padding: 2rem 2rem 3rem;
    text-align: center;

    a {
        color: @light_blue;
    }

    svg {
        padding: 0 0.5rem;
        opacity: 0.5;
    }
}
</style>
