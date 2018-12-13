<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div class=main_column>
            <div class="html" v-html="html"></div>
            <ul class="nav">
                <li>
                    <router-link v-if="previousTutorial" :to="{name: 'tutorial_single', params: {tutorialName: previousTutorial.slug}}">&larr; Previous</router-link>
                    <span v-else>-</span>
                </li>
                <li>
                    <router-link v-if="nextTutorial" :to="{name: 'tutorial_single', params: {tutorialName: nextTutorial.slug}}">Next &rarr;</router-link>
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
    },
    components: {
        TutorialSidebar
    },
    data: function() {
        return {
            html: '',
            currentIndex: 0,
            currentTutorial: null
        }
    },
    computed: {
        tutorials: function() {
            return this.$store.state.tutorials
        },
        nextTutorial: function() {
            if (this.currentIndex + 1 == this.tutorials.length) {
                return null
            } else {
                return this.$store.state.tutorials[this.currentIndex + 1]
            }
        },
        previousTutorial: function() {
            if (this.currentIndex == 0) {
                return null
            } else {
                return this.$store.state.tutorials[this.currentIndex - 1]
            }
        }
    },
    methods: {
        scrollToTop: function() {
            document.documentElement.scrollTop = 0
        },
        loadHTML: function() {
            this.currentTutorial = this.tutorials[0]

            if (this.tutorialName != "") {
                this.currentTutorial = this.tutorials.filter(
                    (element) => element.slug == this.tutorialName
                )[0]
            }

            this.currentIndex = this.tutorials.indexOf(this.currentTutorial)

            let app = this;
            axios.get('/html/tutorials/' + this.currentTutorial.src).then(function(response) {
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
        tutorialName: function(value) {
            this.loadHTML()
            this.$store.commit('updateActiveTutorial', this.currentTutorial)
        }
    },
    created: function() {
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
    min-height: 100%;

    aside {
        background-color: @purple;
        min-height: 100%;
        width: 10rem;
    }

    div.main_column {
        flex: 1;

        div.html {
            padding: 1rem;

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

        ul.nav {
            background-color: #2b2b2b;
            margin-bottom: 0;
            padding: 0;

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
