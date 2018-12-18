import Vue from 'vue'
import Vuex from 'vuex'
import {Post, Tutorial, TutorialStep} from '@/classes'

Vue.use(Vuex)


let defaultStep = new TutorialStep({
    title: 'default',
    src: 'default',
    slug: 'default'
})


export default new Vuex.Store({
    state: {
        posts: [
            new Post({
                title: 'Is Async Worthwhile?',
                src: 'is_async_worthwhile.html',
                slug: 'is-async-worthwhile'
            }),
            new Post({
                title: 'Why use an ORM?',
                src: 'why_use_an_orm.html',
                slug: 'why-use-an-orm'
            }),
            new Post({
                title: 'Why choose Piccolo?',
                src: 'why_choose_piccolo.html',
                slug: 'why-choose-piccolo'
            }),
            new Post({
                title: 'Introduction to ASGI',
                src: 'introduction_to_asgi.html',
                slug: 'introduction-to-asgi'
            }),
            new Post({
                title: 'Should I use Python instead of Golang or Node?',
                src: 'should_i_use_python_instead_of_golang_or_node.html',
                slug: 'should-i-use-python-instead-of-golang-or-node'
            }),
            new Post({
                title: 'Why is an event loop useful?',
                src: 'why_is_an_event_loop_useful.html',
                slug: 'why-is-an-event-loop-useful'
            })
        ],
        tutorials: [
            new Tutorial({
                title: 'Playground',
                slug: 'playground',
                steps: [
                    new TutorialStep({
                        title: 'Installing Piccolo',
                        src: 'playground/installing_piccolo.html',
                        slug: 'installing_piccolo',
                    }),
                    new TutorialStep({
                        title: 'Playground',
                        src: 'playground/playground.html',
                        slug: 'playground',
                    }),
                ]
            }),
            new Tutorial({
                title: 'Getting Started',
                slug: 'getting-started',
                steps: [
                    new TutorialStep({
                        title: 'Step 1 - Schema',
                        src: 'define_schema.html',
                        slug: 'define-schema',
                    }),
                    new TutorialStep({
                        title: 'Step 2 - Adding data',
                        src: 'adding_data.html',
                        slug: 'adding-data',
                    })
                ]
            }),
            new Tutorial({
                title: 'Querying',
                slug: 'querying',
                steps: [
                    new TutorialStep({
                        title: 'Select',
                        src: 'select.html',
                        slug: 'select'
                    }),
                    new TutorialStep({
                        title: 'Joins',
                        src: 'joins.html',
                        slug: 'joins'
                    }),
                    new TutorialStep({
                        title: 'Objects',
                        src: 'objects.html',
                        slug: 'objects'
                    }),
                ]
            }),
            new Tutorial({
                title: 'Migrations',
                slug: 'migrations',
                steps: [
                    new TutorialStep({
                        title: 'Migrations',
                        src: 'migrations/migrations.html',
                        slug: 'migrations',
                    }),
                ]
            })
        ],
        activeTutorial: new Tutorial({
            title: 'default',
            slug: 'default',
            steps: [
                defaultStep
            ]
        }),
        activeTutorialStep: defaultStep,
    },
    getters: {
        nextTutorialStep: function(state) {
            let index = state.activeTutorial.steps.indexOf(state.activeTutorialStep)
            if (index != -1 && index < state.activeTutorial.steps.length) {
                return state.activeTutorial.steps[index + 1]
            } else {
                return null
            }
        },
        previousTutorialStep: function(state) {
            let index = state.activeTutorial.steps.indexOf(state.activeTutorialStep)
            if (index != -1 && index > 0) {
                return state.activeTutorial.steps[index - 1]
            } else {
                return null
            }
        }
    },
    mutations: {
        updateActiveTutorial: function(state, tutorial) {
            this.state.activeTutorial = tutorial
        },
        updateActiveTutorialStep: function(state, step) {
            this.state.activeTutorialStep = step
        },
    },
})
