import Vue from 'vue'
import Vuex from 'vuex'
import {Post, Tutorial, TutorialStep} from '@/classes'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        posts: [
            new Post(
                'Is Async Worthwhile?',
                'is_async_worthwhile.html',
                'is-async-worthwhile'
            ),
            new Post(
                'Why use an ORM?',
                'why_use_an_orm.html',
                'why-use-an-orm'
            ),
            new Post(
                'Why choose Piccolo?',
                'why_choose_piccolo.html',
                'why-choose-piccolo'
            ),
            new Post(
                'Introduction to ASGI',
                'introduction_to_asgi.html',
                'introduction-to-asgi'
            ),
            new Post(
                'Should I use Python instead of Golang or Node?',
                'should_i_use_python_instead_of_golang_or_node.html',
                'should-i-use-python-instead-of-golang-or-node'
            ),
            new Post(
                'Why is an event loop useful?',
                'why_is_an_event_loop_useful.html',
                'why-is-an-event-loop-useful'
            )
        ],
        tutorials: [
            new Tutorial(
                '1',
                '1',
                [
                    new Tutorial(
                        'Step 1 - Schema',
                        'define_schema.html',
                        'define-schema'
                    ),
                    new Tutorial(
                        'Step 2 - Migrations',
                        'migrations.html',
                        'migrations'
                    ),
                    new Tutorial(
                        'Step 3 - Adding data',
                        'adding_data.html',
                        'adding-data'
                    )
                ]
            )
        ],
        activeTutorial: null,
        activeTutorialIndex: 0,
    },
    mutations: {
        updateActiveTutorial: function(state, tutorial) {
            state.activeTutorial = tutorial
            state.activeTutorialIndex = state.tutorials.indexOf(tutorial)
        }
    },
    actions: {

    }
})
