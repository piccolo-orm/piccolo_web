<template>
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
</template>


<script>
export default {
    computed: {
        nextTutorialStep: function() {
            return this.$store.getters.nextTutorialStep
        },
        previousTutorialStep: function() {
            return this.$store.getters.previousTutorialStep
        },
        activeTutorial: function() {
            return this.$store.state.activeTutorial
        }
    },
}
</script>


<style scoped lang="less">
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
</style>
