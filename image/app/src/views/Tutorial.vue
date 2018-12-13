<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div class=main_column>
            <div class="html" v-html="html"></div>
            <ul class="nav">
                <li>
                    <template v-if="previousTutorial">
                        <router-link :to="{name: 'tutorial_single', params: {tutorialName: previousTutorial.slug}}">&larr; Previous</router-link>
                    </template>
                    <template v-else>-</template>
                </li>
                <li>
                    <template v-if="nextTutorial">
                        <router-link :to="{name: 'tutorial_single', params: {tutorialName: nextTutorial.slug}}">Next &rarr;</router-link>
                    </template>
                    <template v-else>-</template>
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
            currentIndex: 0
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
            var currentTutorial = this.tutorials[0]

            if (this.tutorialName != "") {
                currentTutorial = this.tutorials.filter(
                    (element) => element.slug == this.tutorialName
                )[0]
            }

            this.currentIndex = this.tutorials.indexOf(currentTutorial)

            let app = this;
            axios.get('/html/tutorials/' + currentTutorial.src).then(function(response) {
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
            margin-bottom: 0;
            padding: 0;

            li {
                background-color: #2b2b2b;
                color: white;
                display: inline-block;
                box-sizing: border-box;
                padding: 2rem;
                width: 50%;
                text-align: right;

                &:hover {
                    background-color: rgba(0,0,0,0.8);
                }

                &:first-child {
                    text-align: left;
                }
            }
        }
    }
}
</style>
