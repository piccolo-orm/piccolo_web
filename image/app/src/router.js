import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import BlogList from '@/views/BlogList.vue'
import BlogSingle from '@/views/BlogSingle.vue'
import Privacy from '@/views/Privacy.vue'
import Tutorial from '@/views/Tutorial.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: Privacy
        },
        {
            path: '/blog',
            name: 'blog',
            component: BlogList
        },
        {
            path: '/blog/:articleName',
            name: 'blog_single',
            component: BlogSingle,
            props: true
        },
        {
            path: '/tutorial',
            name: 'tutorial',
            component: Tutorial
        },
        {
            path: '/tutorial/:tutorialName/:stepName',
            name: 'tutorial_single',
            component: Tutorial,
            props: true
        }
    ]
})
