<template>
    <Layout>
        <div class="blog">
            <div class="center_wrapper">
                <h1>Blog</h1>
                <ul>
                    <li
                        v-bind:key="post.node.title"
                        v-for="post in $page.posts.edges"
                    >
                        <g-link :to="post.node.path">{{ post.node.title }}</g-link>
                        <span>{{ post.node.date | customString }}</span>
                    </li>
                </ul>
            </div>
            <MainFooter></MainFooter>
        </div>
    </Layout>
</template>


<page-query>
query {
  posts: allBlogPost {
    edges {
      node {
        title
        path
        date
      }
    }
  }
}
</page-query>


<script>
import MainFooter from "@/components/MainFooter.vue"

export default {
    components: {
        MainFooter
    },
    metaInfo: {
        title: "Blog",
        meta: [
            {
                name: "description",
                content:
                    "Articles about Python, asyncio, databases, the Piccolo ORM, and general development."
            }
        ]
    }
}
</script>


<style lang="less" scoped>
@import "../variables.less";

div.blog {
    min-height: 100vh;
    padding-top: 4rem;
    box-sizing: border-box;

    ul {
        padding: 0;

        li {
            font-size: 1.2rem;
            line-height: 2;
            list-style: none;
            padding: 1rem 0;

            a {
                font-size: 1.2rem;
                font-weight: bolder;
                text-decoration: none;
                color: rgba(0, 0, 0, 0.8);
                border-bottom: 3px solid lighten(@light_blue, 10%);
                padding-bottom: 0.2rem;

                &:hover {
                    border-bottom: 3px solid @light_blue;
                }
            }

            span {
                color: rgba(0, 0, 0, 0.3);
                display: block;
                font-weight: bolder;
                font-size: 0.7em;
            }
        }
    }
}
</style>
