<template>
    <ul>
        <li
            v-bind:class="{active: (tutorial == activeTutorial)}"
            v-on:click.prevent="visible = (visible ? false : true)"
        >
            <a href="#">
                <span v-bind:class="{visible: visible}">
                    <font-awesome-icon icon="caret-right" />
                </span>
                {{ tutorial.title }}
            </a>
        </li>
        <transition-group name="steps">
            <li
                class="dark"
                v-bind:class="{active_step: step == activeTutorialStep}"
                v-bind:key="step.slug"
                v-for="step in tutorial.steps"
                v-if="visible"
                v-on:click="hideSidebar"
            >
                <router-link
                    :to="{name: 'tutorial_single', params: {tutorialName: tutorial.slug, stepName: step.slug}}"
                >{{ step.title }}</router-link>
            </li>
        </transition-group>
    </ul>
</template>

<script>
export default {
    props: ["tutorial"],
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
        }
    },
    methods: {
        hideSidebar: function() {
            // Give a delay for the background content to load.
            let app = this
            setTimeout(function() {
                app.$emit("hideSidebar")
            }, 200)
        }
    },
    created: function() {
        this.visible = this.activeTutorial == this.tutorial
    }
}
</script>

<style scoped lang="less">
@import "../../variables.less";

.steps-enter {
    opacity: 0;
    transition: opacity 0.8s;
}
.steps-enter-to {
    opacity: 1;
    transition: opacity 0.8s;
}
.steps-leave {
    opacity: 1;
    transition: opacity 0.2s;
}
.steps-leave-to {
    opacity: 0;
    transition: opacity 0.2s;
}

ul {
    height: 100%;
    margin: 0;
    padding-left: 0;
    position: relative;

    li {
        box-sizing: border-box;
        list-style: none;

        &.active_step {
            border-left: 2px solid @lighter_blue !important;
        }

        &.dark {
            border-left: 2px solid @dark_blue;
            background-color: darken(@dark_blue, 5%);

            &.dark:hover {
                background-color: darken(@dark_blue, 5%);
            }
        }

        span {
            display: inline-block;
            margin-right: 0.4em;
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
    }
}
</style>
