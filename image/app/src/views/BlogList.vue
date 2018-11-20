<template>
    <div class="center_wrapper">
        <h1>Blog</h1>
        <ul>
            <li v-for="post in posts" v-bind:key="post.title">
                <router-link :to="{name: 'blog_single', params: {articleName: post.slug}}">{{ post.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'blog',
    data: function() {
        return {}
    },
    computed: {
        posts: function() {
            return this.$store.state.posts
        }
    }
}
</script>


<style lang="less" scoped>
@purple: #490188;

ul {
    padding: 0;

    li {
        font-size: 1.2rem;
        list-style: none;
        padding: 0.5rem 0;

        a {
            color: rgba(0,0,0,0.8);
            text-decoration: none;

            &:hover {
                color: @purple;
            }
        }
    }
}
</style>
