import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [
            {
                title: 'Is Async Worthwhile?',
                src: 'is_async_worthwhile.html',
                slug: 'is-async-worthwhile'
            },
            {
                title: 'Why use an ORM?',
                src: 'why_use_an_orm.html',
                slug: 'why-use-an-orm'
            }
        ]
    },
    mutations: {

    },
    actions: {

    }
})
