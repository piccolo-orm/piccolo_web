import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BlogList from './views/BlogList.vue'
import BlogSingle from './views/BlogSingle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogList
    },
    {
      path: '/blog/:articleName',
      name: 'blog_single',
      component: BlogSingle
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
