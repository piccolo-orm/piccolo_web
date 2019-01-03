<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div class=main_column>
            <div class="html" v-html="html"></div>
            <p class="edit"><a href="https://github.com/piccolo-orm/piccolo_web/tree/master/image/app/md">Edit on Github</a></p>
            <div class="nav_padding"></div>
            <ul class="nav">
                <li>
                    <router-link
                        v-if="previousTutorialStep"
                        :to="{name: 'tutorial_single', params: {tutorialName: activeTutorial.slug, stepName: previousTutorialStep.slug}}">&larr; Previous</router-link>
                    <span v-else>-</span>
                </li>
                <li>
                    <router-link
                        v-if="nextTutorialStep"
                        :to="{name: 'tutorial_single', params: {tutorialName: activeTutorial.slug, stepName: nextTutorialStep.slug}}">Next &rarr;</router-link>
                    <span v-else>-</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TutorialSidebar from '@/components/Tutorial/TutorialSidebar.vue'
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
        TutorialSidebar
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
        nextTutorialStep: function() {
            return this.$store.getters.nextTutorialStep
        },
        previousTutorialStep: function() {
            return this.$store.getters.previousTutorialStep
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
            document.documentElement.scrollTop = 0
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
                activeTutorialStep = activeTutorial.steps[0]
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
                setTimeout(
                    () => Prism.highlightAll(),
                    0
                )
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

<style lang="less">
@purple: #490188;

div.column_wrapper {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: 4rem;

    aside {
        background-color: @purple;
        min-height: 100%;
        width: 15rem;
    }

    div.main_column {
        position: relative;
        flex: 1;

        p.edit {
            font-size: 0.8rem;
            padding: 0.5rem 1rem 1rem;
        }

        div.html {
            padding: 1rem;

            h2 {
                margin-top: 2.5rem;
                margin-bottom: 0.5rem;
            }

            em {
                background-color: fadeout(@purple, 90%);
                border: 1px solid @purple;
                color: @purple;
                display: block;
                padding: 0.5rem;

                &::before {
                    content: "!";
                    font-weight: bold;
                    font-style: normal;
                    padding: 0.1rem 0.7rem;
                    margin-right: 0.5rem;
                    border: 1px solid @purple;
                    border-radius: 1rem;
                }
            }
        }

        div.nav_padding {
            height: 5rem;
        }

        ul.nav {
            background-color: #2b2b2b;
            margin-bottom: 0;
            padding: 0;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;

            li {
                display: inline-block;
                width: 50%;
                text-align: right;
                min-height: 100%;

                a, span {
                    box-sizing: border-box;
                    color: white;
                    display: block;
                    font-size: 1.1rem;
                    padding: 2rem;
                }

                a {
                    text-decoration: none;
                }

                &:hover {
                    background-color: rgba(255,255,255,0.1);
                }

                &:first-child {
                    text-align: left;
                }
            }
        }
    }
}
</style>
