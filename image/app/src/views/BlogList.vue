<template>
    <div class="blog">
        <div class="center_wrapper">
            <h1>Blog</h1>
            <ul>
                <li
                    v-bind:key="post.title"
                    v-for="post in posts"
                >
                    <router-link
                        :to="{name: 'blog_single', params: {articleName: post.slug}}"
                    >{{ post.title }}</router-link>
                    <span>{{ post.postedOn.customString() }}</span>
                </li>
            </ul>
        </div>
        <MainFooter></MainFooter>
    </div>
</template>


<script>
import MainFooter from "@/components/MainFooter.vue"

export default {
    name: "blog",
    data: function() {
        return {}
    },
    components: {
        MainFooter
    },
    computed: {
        posts: function() {
            return this.$store.state.posts
        }
    },
    created: function() {
        if (this.$store.state.posts.length == 0) {
            this.$store.dispatch("fetchPostList")
        }
        this.$seo.updateTags({
            title: `Piccolo ORM Blog`,
            description:
                "Articles about Python, asyncio, databases, the Piccolo ORM, and general development."
        })
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
                padding-top: 0.8rem;
            }
        }
    }
}
</style>
