<template>
    <ul>
        <ul class="overlay" :class="{hidden: isHidden}">
            <li class="dark">
                <a
                    href="#"
                    v-on:click.prevent="isHidden = true">&larr; All Tutorials</a>
            </li>
            <li
                v-if="activeTutorial"
                v-for="step in activeTutorial.steps"
                :key="step.slug"
                :class="{active: (step == activeTutorialStep)}">
                <router-link
                    :to="{name: 'tutorial_single', params: {tutorialName: activeTutorial.slug, stepName: step.slug}}">{{ step.title }}</router-link>
            </li>
        </ul>

        <li
            v-for="tutorial in tutorials"
            :key="tutorial.slug"
            v-on:click="isHidden = false"
            :class="{active: (tutorial == activeTutorial)}">

            <router-link :to="{name: 'tutorial_single', params: {tutorialName: tutorial.slug, stepName: tutorial.steps[0] ? tutorial.steps[0].slug : ''}}">{{ tutorial.title }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    data: function() {
        return {
            isHidden: false
        }
    },
    computed: {
        tutorials: function() {
            return this.$store.state.tutorials || []
        },
        activeTutorial: function() {
            return this.$store.state.activeTutorial
        },
        activeTutorialStep: function() {
            return this.$store.state.activeTutorialStep
        },
    },
}
</script>

<style scoped lang="less">
@purple: #490188;

ul {
    background-color: @purple;
    height: 100%;
    margin: 0;
    padding-left: 0;
    position: relative;

    ul.overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: darken(@purple, 10%);
        transition: 0.7s left;

        &.hidden {
            left: -100% !important;
            transition: 0.7s left;
        }

        li {
            color: white;
        }
    }

    li {
        list-style: none;

        &.dark {
            background-color: darken(@purple, 10%);
        }

        a {
            color: white;
            display: block;
            padding: 1rem;
            text-decoration: none;
        }

        &.active {
            background-color: rgba(255,255,255,0.3);
        }

        &:hover {
            background-color: rgba(255,255,255,0.3);
        }
    }
}
</style>
