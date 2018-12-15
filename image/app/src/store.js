import Vue from 'vue'
import Vuex from 'vuex'
import {Post, Tutorial, TutorialStep} from '@/classes'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        posts: [
            new Post({
                id: 1,
                title: 'Is Async Worthwhile?',
                src: 'is_async_worthwhile.html',
                slug: 'is-async-worthwhile'
            }),
            new Post({
                id: 2,
                title: 'Why use an ORM?',
                src: 'why_use_an_orm.html',
                slug: 'why-use-an-orm'
            }),
            new Post({
                id: 3,
                title: 'Why choose Piccolo?',
                src: 'why_choose_piccolo.html',
                slug: 'why-choose-piccolo'
            }),
            new Post({
                id: 4,
                title: 'Introduction to ASGI',
                src: 'introduction_to_asgi.html',
                slug: 'introduction-to-asgi'
            }),
            new Post({
                id: 5,
                title: 'Should I use Python instead of Golang or Node?',
                src: 'should_i_use_python_instead_of_golang_or_node.html',
                slug: 'should-i-use-python-instead-of-golang-or-node'
            }),
            new Post({
                id: 6,
                title: 'Why is an event loop useful?',
                src: 'why_is_an_event_loop_useful.html',
                slug: 'why-is-an-event-loop-useful'
            })
        ],
        tutorials: [
            new Tutorial({
                id: 1,
                title: '1',
                slug: '1'
            })
        ],
        tutorialSteps: [
            new TutorialStep({
                id: 1,
                title: 'Step 1 - Schema',
                src: 'define_schema.html',
                slug: 'define-schema',
                tutorial: 1
            }),
            new TutorialStep({
                id: 2,
                title: 'Step 2 - Migrations',
                src: 'migrations.html',
                slug: 'migrations',
                tutorial: 1
            }),
            new TutorialStep({
                id: 3,
                title: 'Step 3 - Adding data',
                src: 'adding_data.html',
                slug: 'adding-data',
                tutorial: 1
            })
        ],
        activeTutorialId: undefined,
        activeTutorialStepId: undefined,
    },
    getters: {
        activeTutorial: function(state) {
            return state.tutorials.filter(
                element => element.id == state.activeTutorialId
            )[0]
        },
        activeTutorialStep: function(state) {
            return state.tutorialSteps.filter(
                element => element.id == state.activeTutorialStepId
            )[0]
        },
        visibleTutorialSteps: function(state) {
            return state.tutorialSteps.filter(
                element => element.tutorial == state.activeTutorialId
            )[0]
        },
    },
    mutations: {
        updateActiveTutorialId: function(state, id) {
            this.state.activeTutorialId = id
        },
        updateActiveTutorialStepId: function(state, id) {
            this.state.activeTutorialStepId = id
        },
    },
})
