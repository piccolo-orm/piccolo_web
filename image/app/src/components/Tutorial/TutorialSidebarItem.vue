<template>
    <ul>
        <li
            v-bind:class="{active: (tutorial == activeTutorial)}"
            class="dark"
            v-on:click.prevent="visible = (visible ? false : true)">

            <a href="#"><span v-bind:class="{visible: visible}">></span> {{ tutorial.title }}</a>
        </li>
        <li
            v-for="step in tutorial.steps"
            v-if="visible"
            v-bind:key="step.slug">

            <router-link
                :to="{name: 'tutorial_single', params: {tutorialName: tutorial.slug, stepName: step.slug}}">{{ step.title }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['tutorial'],
    data: function() {
        return {
            visible: false
        }
    },
    computed: {
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

    li {
        list-style: none;

        &.dark {
            background-color: darken(@purple, 10%);

            &.dark:hover {
                background-color: darken(@purple, 10%);
            }
        }

        span {
            display: inline-block;
            transition: transform 0.5s;

            &.visible {
                transform: rotate(90deg);
                transition: transform 0.5s;
            }
        }

        .heading {
            color: white;
            font-size: 0.8rem;
            display: block;
            padding: 1rem;
            text-transform: uppercase;
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
