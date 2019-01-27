<template>
    <div class="blog_single">
        <div class="center_wrapper">
            <p id="back"><router-link :to="{name: 'blog'}">All posts</router-link></p>
            <h1>{{ title }}</h1>
            <p id="posted_on">Posted on: {{ postedOnString }}</p>
            <div v-html="html"></div>
        </div>
        <MainFooter></MainFooter>
    </div>
</template>

<script>
import axios from 'axios';
import MainFooter from '@/components/MainFooter.vue';

export default {
    props: ['articleName'],
    data: function() {
        return {
            html: '',
            postedOn: undefined,
            title: ''
        }
    },
    components: {
        MainFooter,
    },
    computed: {
        posts: function() {
            return this.$store.state.posts
        },
        postedOnString: function() {
            if (!this.postedOn) {
                return ''
            } else {
                return this.postedOn.customString()
            }
        }
    },
    created: async function() {
        if (this.$store.state.posts.length == 0) {
            await this.$store.dispatch('fetchPostList')
        }

        let currentPost = this.posts.filter(
            (element) => element.slug == this.articleName
        )[0]
        this.postedOn = currentPost.postedOn
        this.title = currentPost.title

        let app = this;
        let response = await axios.get('/html/posts/' + currentPost.src)
        app.html = response.data
    }
}
</script>

<style lang="less">
@import "../variables.less";

div.blog_single {
    padding-top: 4rem;

    h1 {
        margin-bottom: 0;
    }

    p#posted_on {
        color: rgba(0,0,0,0.3);
        font-size: 0.8rem;
        font-weight: bolder;
        margin-top: 0;
        margin-bottom: 1.5rem;
    }

    p#back {
        a {
            background-color: lighten(black, 60%);
            color: white;
            padding: 0.4rem 0.6rem;
            text-transform: uppercase;
            font-size: 0.7rem;
            text-decoration: none;
            transition: 1s background-color;

            &:hover {
                background-color: lighten(black, 50%);
            }
        }
    }

    h2 {
        margin-top: 2.5rem;
    }
    p, li {
        font-size: 1.1rem;
    }
}
</style>
