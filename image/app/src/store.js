import axios from 'axios'
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
        posts: [],
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
            state.activeTutorial = tutorial
        },
        updateActiveTutorialStep: function(state, step) {
            state.activeTutorialStep = step
        },
        updatePosts: function(state, posts) {
            state.posts = posts
        }
    },
    actions: {
        fetchPostList: async function(context) {
            let response = await axios.get('/json/posts.json')
            let data = response.data.map(i => {
                i.postedOn = new Date(i.postedOn)
                return i
            }).sort((i, j) => {
                if (i.postedOn > j.postedOn) {
                    return -1
                } else if (j.postedOn >  i.postedOn ) {
                    return 1
                } else {
                    return 0
                }
            })
            context.commit(
                'updatePosts',
                data
            )
        }
    }
})
