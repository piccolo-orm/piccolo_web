<template>
    <ul>
        <ul class="overlay" :class="{hidden: isHidden}"></ul>
        <li class="dark">
            <a
                href="#"
                v-on:click.prevent="isHidden = (isHidden && false)">&larr; All Tutorials</a>
        </li>
        <li
            v-for="tutorial in tutorials"
            :key="tutorial.slug"
            :class="{active: isActive(tutorial)}">
            <router-link
                :to="{name: 'tutorial_single', params: {tutorialName: tutorial.slug}}">{{ tutorial.title }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    data: function() {
        return {
            isHidden: true
        }
    },
    computed: {
        tutorials: function() {
            return this.$store.state.tutorials
        },
        activeTutorial: function() {
            return this.$store.state.activeTutorial
        }
    },
    methods: {
        isActive: function(tutorial) {
            return tutorial == this.activeTutorial
        }
    }
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
