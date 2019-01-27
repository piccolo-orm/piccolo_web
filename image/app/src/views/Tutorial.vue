<template>
    <TutorialBase>
        <template v-if="!tutorialName">
            <div class="html">
                <h1>Tutorials</h1>
                <p>Welcome to the Piccolo tutorials. Select a tutorial from the menu to get started.</p>
            </div>
        </template>
        <template v-else>
            <div class="html" v-html="html"></div>
            <p class="edit"><a href="https://github.com/piccolo-orm/piccolo_web/tree/master/image/app/md">Edit on Github</a></p>
            <div class="nav_padding"></div>
            <TutorialNav></TutorialNav>
        </template>
    </TutorialBase>
</template>


<script>
import axios from 'axios'
import TutorialBase from '@/components/Tutorial/TutorialBase.vue'
import TutorialNav from '@/components/Tutorial/TutorialNav.vue'
import {Tutorial} from '@/classes.js'

export default {
    props: {
        tutorialName: {
            type: String,
            default: ""
        },
        stepName: {
            type: String,
            default: ""
        },
    },
    components: {
        TutorialBase,
        TutorialNav
    },
    data: function() {
        return {
            html: '',
        }
    },
    computed: {
        tutorials: function() {
            return this.$store.state.tutorials
        },
        activeTutorialStep: function() {
            return this.$store.state.activeTutorialStep
        },
        activeTutorial: function() {
            return this.$store.state.activeTutorial
        }
    },
    methods: {
        scrollToTop: function() {
            window.scrollTo(0,0)
        },
        updateActiveTutorial: function() {
            if (!this.tutorials) {
                return null
            }

            var activeTutorial = null
            var activeTutorialStep = null

            if (this.tutorialName == "") {
                activeTutorial = this.tutorials[0]
            } else {
                activeTutorial = this.tutorials.filter(
                    (element) => element.slug == this.tutorialName
                )[0]
            }
            this.$store.commit('updateActiveTutorial', activeTutorial)

            if (this.stepName == "") {
                activeTutorialStep = null
            } else {
                activeTutorialStep = activeTutorial.steps.filter(
                    (element) => element.slug == this.stepName
                )[0]
            }
            this.$store.commit('updateActiveTutorialStep', activeTutorialStep)
        },
        loadHTML: function() {
            if (!this.activeTutorialStep) {
                return
            }
            let app = this
            axios.get('/html/tutorials/' + this.activeTutorialStep.src).then(function(response) {
                app.html = response.data
                app.scrollToTop()
            })
        }
    },
    watch: {
        stepName: function(value) {
            this.updateActiveTutorial()
            this.loadHTML()
        }
    },
    mounted: function() {
        this.updateActiveTutorial()
        this.loadHTML()
    },
}
</script>
