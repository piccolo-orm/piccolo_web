<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div class=main_column>
            <div class="html" v-html="html"></div>
            <ul class="nav">
                <li>&larr; Previous</li>
                <li>Next &rarr;</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TutorialSidebar from '@/components/Tutorial/TutorialSidebar.vue'

export default {
    props: ['tutorialName'],
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
        }
    },
    created: function() {
        let currentTutorial = this.tutorials.filter(
            (element) => element.slug == this.tutorialName
        )[0]

        let app = this;
        axios.get('/html/tutorials/' + currentTutorial.src).then(function(response) {
            app.html = response.data
            setTimeout(
                () => Prism.highlightAll(),
                0
            )
        })
    }
}
</script>

<style lang="less">
div.column_wrapper {
    display: flex;
    flex-direction: row;
    height: 100%;

    aside {
        background-color: #490188;
        height: 100%;
        width: 10rem;
    }

    div.main_column {
        flex: 1;

        div.html {
            padding: 1rem;
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
