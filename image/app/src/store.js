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
            },
            {
                title: 'Why choose Piccolo?',
                src: 'why_choose_piccolo.html',
                slug: 'why-choose-piccolo'
            },
            {
                title: 'Introduction to ASGI',
                src: 'introduction_to_asgi.html',
                slug: 'introduction-to-asgi'
            },
            {
                title: 'Should I use Python instead of Golang or Node?',
                src: 'should_i_use_python_instead_of_golang_or_node.html',
                slug: 'should-i-use-python-instead-of-golang-or-node'
            },
            {
                title: 'Why is an event loop useful?',
                src: 'why_is_an_event_loop_useful.html',
                slug: 'why-is-an-event-loop-useful'
            }
        ],
        tutorials: [
            {
                title: 'Step 1 - Schema',
                src: 'define_schema.html',
                slug: 'define-schema'
            },
            {
                title: 'Step 2 - Migrations',
                src: 'migrations.html',
                slug: 'migrations'
            },
            {
                title: 'Step 3',
                src: 'query_tables.html',
                slug: 'query-tables'
            }
        ]
    },
    mutations: {

    },
    actions: {

    }
})
