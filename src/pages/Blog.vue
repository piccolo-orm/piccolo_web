<template>
    <Layout>
        <div class="blog">
            <div class="center_wrapper">
                <h1>Blog</h1>
                <div class="search">
                    <font-awesome-icon icon="search" />
                    <input
                        type="search"
                        placeholder="Filter"
                        v-model="searchTerm"
                        v-on:focus="searchTerm = ''"
                    />
                </div>
                <ul v-if="filteredPosts.length > 0">
                    <li
                        v-bind:key="post.node.title"
                        v-for="post in filteredPosts"
                    >
                        <g-link :to="post.node.path">{{
                            post.node.title
                        }}</g-link>
                        <span>{{ post.node.date | customString }}</span>
                    </li>
                </ul>
                <p v-else>No results</p>
            </div>
            <MainFooter></MainFooter>
        </div>
    </Layout>
</template>


<page-query>
query {
  posts: allBlogPost(filter: { draft: { eq: false }}) {
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
        MainFooter,
    },
    data() {
        return {
            searchTerm: "",
        }
    },
    computed: {
        filteredPosts() {
            let searchTerm = this.searchTerm.toLowerCase()
            return this.$page.posts.edges.filter(
                (post) =>
                    post.node.title.toLowerCase().indexOf(searchTerm) != -1
            )
        },
    },
    metaInfo: {
        title: "Blog",
        meta: [
            {
                key: "description",
                name: "description",
                content:
                    "Articles about Python, asyncio, databases, the Piccolo ORM, and general development.",
            },
        ],
    },
}
</script>


<style lang="less" scoped>
@import "../variables.less";

div.blog {
    min-height: 100vh;
    padding-top: 4rem;
    box-sizing: border-box;

    div.search {
        border-bottom: 2px solid #f0f0f0;
        border-radius: 0.2rem;
        box-sizing: border-box;
        color: @medium_blue;
        display: flex;
        padding-left: 0.5rem;
        align-items: center;

        input {
            border: none;
            color: @medium_blue;
            flex-grow: 1;
            font-size: 1rem;
            margin-right: 0.2rem;
            padding: 0.5rem;

            &:focus {
                outline: none;
            }
        }
    }

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
                color: @medium_blue;
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
