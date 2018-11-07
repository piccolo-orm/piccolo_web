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
        return {
            posts: [
                {
                    title: 'Is Async Worthwhile?',
                    src: 'is_async_worthwhile.html',
                    slug: 'is-async-worthwhile'
                }
            ]
        }
    }
}
</script>
