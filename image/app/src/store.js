import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import {Post, Tutorial, TutorialStep} from '@/classes'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        posts: [],
        tutorials: [],
        activeTutorial: undefined,
        activeTutorialStep: undefined,
        tutorialsLoaded: false
    },
    getters: {
        nextTutorialStep: function(state) {
            if (!state.tutorialsLoaded) {
                return null
            }
            let index = state.activeTutorial.steps.indexOf(state.activeTutorialStep)
            if (index != -1 && index < state.activeTutorial.steps.length) {
                return state.activeTutorial.steps[index + 1]
            } else {
                return null
            }
        },
        previousTutorialStep: function(state) {
            if (!state.tutorialsLoaded) {
                return null
            }
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
        },
        updateTutorialsList: function(state, tutorials) {
            state.tutorials = tutorials
        },
        updateTutorialsLoaded: function(state, bool) {
            state.tutorialsLoaded = bool
        }
    },
    actions: {
        fetchTutorialList: async function(context) {
            let response = await axios.get('/json/tutorials.json')
            context.commit('updateTutorialsList', response.data)
            context.commit('updateActiveTutorial', response.data[0])
            context.commit('updateActiveTutorialStep', response.data[0].steps[0])
            context.commit('updateTutorialsLoaded', true)
        },
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
