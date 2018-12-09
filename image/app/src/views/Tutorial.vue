<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div>
            <h1>Tutorial</h1>
            <div v-html="html"></div>
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

    div {
        flex: 1;
    }
}
</style>
