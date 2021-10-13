<template>
    <Layout>
        <div class="blog_single">
            <div class="blog_hero">
                <div class="center_wrapper">
                    <p id="back">
                        <g-link to="/blog/" class="nav_button left">
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

                <div class="post_navigation">
                    <a
                        class="nav_button left"
                        v-if="previousPost"
                        :href="previousPost.node.path"
                        ><font-awesome-icon icon="chevron-left" />{{
                            previousPost.node.title
                        }}</a
                    >

                    <a
                        class="nav_button right"
                        v-if="nextPost"
                        :href="nextPost.node.path"
                        >{{ nextPost.node.title
                        }}<font-awesome-icon icon="chevron-right"
                    /></a>
                </div>
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
    path
  }
  allBlogPosts: allBlogPost(sortBy: "date") {
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
import Lightbox from "../components/Lightbox"

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
    computed: {
        nextPost() {
            let path = this.$page.blogPost.path
            let allBlogPosts = this.$page.allBlogPosts.edges
            let element = allBlogPosts.filter(
                (element) => element.node.path == path
            )[0]
            let index = allBlogPosts.indexOf(element)
            if (index == 0) {
                return null
            } else {
                return allBlogPosts[index - 1]
            }
        },
        previousPost() {
            let path = this.$page.blogPost.path
            let allBlogPosts = this.$page.allBlogPosts.edges
            let element = allBlogPosts.filter(
                (element) => element.node.path == path
            )[0]
            let index = allBlogPosts.indexOf(element)
            if (index + 1 == allBlogPosts.length) {
                return null
            } else {
                return allBlogPosts[index + 1]
            }
        },
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

    div.blog_hero {
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

    iframe {
        max-width: 100%;
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

            &.extra_small {
                max-width: 100%;
                width: 10rem;
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

    a.nav_button {
        background-color: @light_blue;
        color: white;
        padding: 0.4rem 0.6rem;
        box-sizing: border-box;
        text-transform: uppercase;
        font-size: 0.7rem;
        max-width: 50%;
        text-decoration: none;
        transition: 1s background-color;

        &.left {
            margin-right: 0.5rem;

            svg {
                padding-right: 0.5rem;
            }

            &:hover {
                svg {
                    transform: translateX(-0.2rem);
                }
            }
        }

        &.right {
            margin-left: 0.5rem;

            svg {
                padding-left: 0.5rem;
            }

            &:hover {
                svg {
                    transform: translateX(0.2rem);
                }
            }
        }

        svg {
            transition: 0.5s transform;
        }

        &:hover {
            background-color: lighten(@light_blue, 10%);
        }
    }

    div.post_navigation {
        a {
            display: inline-block;
            margin-bottom: 0.5rem;
        }

        a:last-child {
            float: right;
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
