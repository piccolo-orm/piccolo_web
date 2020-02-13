<template>
    <Layout>
        <div class="blog_single">
            <div class="center_wrapper">
                <p id="back">
                    <g-link to="/blog/">
                        <font-awesome-icon icon="chevron-left" />All posts
                    </g-link>
                </p>
                <h1>{{ $page.blogPost.title }}</h1>
                <div v-html="$page.blogPost.content"></div>
                <p id="posted_on">Posted on: {{ $page.blogPost.date|customString }}</p>
            </div>
        </div>
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
export default {
    metaInfo() {
        return {
            title: `${this.$page.blogPost.title} - Piccolo Blog`,
            meta: [
                {
                    description: this.$page.blogPost.description
                }
            ]
        }
    }
}
</script>

<style lang="less">
@import "../variables.less";

div.blog_single {
    padding-top: 4rem;
    padding-bottom: 8rem;

    a {
        text-decoration: none;
    }

    h1 {
        margin-bottom: 0;
    }

    p#posted_on {
        color: rgba(0, 0, 0, 0.3);
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
            }

            &:hover {
                background-color: lighten(@light_blue, 10%);
            }
        }
    }

    h2 {
        margin-top: 2.5rem;
    }
    p,
    li {
        font-size: 1.1rem;
    }
}
</style>
