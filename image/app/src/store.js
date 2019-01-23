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
                title: 'ORM Design Challenges',
                src: 'orm_design_challenges.html',
                slug: 'orm-design-challenges'
            }),
            new Post({
                title: 'Why Python type annotations are awesome',
                src: 'why_python_type_annotations_are_awesome.html',
                slug: 'why-python-type-annotations-are-awesome'
            }),
            new Post({
                title: 'Plugins for Python projects',
                src: 'plugins_for_python_projects.html',
                slug: 'plugins-for-python-projects'
            }),
            new Post({
                title: 'Asyncio vs Gevent',
                src: 'asyncio_vs_gevent.html',
                slug: 'asyncio-vs-gevent'
            }),
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
                title: 'Getting Started',
                slug: 'getting-started',
                steps: [
                    new TutorialStep({
                        title: 'Installing Piccolo',
                        src: 'getting_started/installing_piccolo.html',
                        slug: 'installing-piccolo',
                    }),
                    new TutorialStep({
                        title: 'Setting up Postgres',
                        src: 'getting_started/setting_up_postgres.html',
                        slug: 'setting-up-postgres',
                    }),
                    new TutorialStep({
                        title: 'Playground',
                        src: 'getting_started/playground.html',
                        slug: 'playground',
                    }),
                    new TutorialStep({
                        title: 'Sync vs Async',
                        src: 'getting_started/sync_vs_async.html',
                        slug: 'sync-vs-async',
                    }),
                ]
            }),
            new Tutorial({
                title: 'Querying',
                slug: 'querying',
                steps: [
                    new TutorialStep({
                        title: 'Select',
                        src: 'querying/select.html',
                        slug: 'select'
                    }),
                    new TutorialStep({
                        title: 'Objects',
                        src: 'querying/objects.html',
                        slug: 'objects'
                    }),
                    new TutorialStep({
                        title: 'Raw',
                        src: 'querying/raw.html',
                        slug: 'raw'
                    }),
                    new TutorialStep({
                        title: 'Delete',
                        src: 'querying/delete.html',
                        slug: 'delete'
                    }),
                    new TutorialStep({
                        title: 'Insert',
                        src: 'querying/insert.html',
                        slug: 'insert'
                    }),
                    new TutorialStep({
                        title: 'Update',
                        src: 'querying/update.html',
                        slug: 'update'
                    }),
                ]
            }),
            new Tutorial({
                title: 'Schema',
                slug: 'schema',
                steps: [
                    new TutorialStep({
                        title: 'Schema',
                        src: 'schema/define_schema.html',
                        slug: 'define-schema',
                    }),
                ]
            }),
            new Tutorial({
                title: 'Migrations',
                slug: 'migrations',
                steps: [
                    new TutorialStep({
                        title: 'Create',
                        src: 'migrations/create.html',
                        slug: 'create',
                    }),
                ]
            }),
            new Tutorial({
                title: 'Extras',
                slug: 'extras',
                steps: [
                    new TutorialStep({
                        title: 'User',
                        src: 'extras/user.html',
                        slug: 'user',
                    })
                ]
            }),
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
