<template>
    <ul class="nav">
        <li>
            <router-link
                v-if="previousTutorialStep"
                :to="{name: 'tutorial_single', params: {tutorialName: activeTutorial.slug, stepName: previousTutorialStep.slug}}">
                <span><font-awesome-icon icon="chevron-circle-left" />Previous</span><span class="subtle">{{ previousTutorialStep.title }}</span></router-link>
        </li>
        <li>
            <router-link
                v-if="nextTutorialStep"
                :to="{name: 'tutorial_single', params: {tutorialName: activeTutorial.slug, stepName: nextTutorialStep.slug}}">
                <span>Next <font-awesome-icon icon="chevron-circle-right" /></span><span class="subtle">{{ nextTutorialStep.title }}</span></router-link>
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
@arrow_spacing: 0.5rem;

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

        svg {
            padding-left: @arrow_spacing;
        }

        a {
            box-sizing: border-box;
            color: white;
            display: block;
            font-size: 1.1rem;
            padding: 2rem;
            text-decoration: none;
        }

        span {
            display: block;

            &.subtle {
                color: rgba(255,255,255,0.6);
                font-size: 0.8em;
                padding-right: 2rem;
            }
        }

        &:hover {
            background-color: rgba(255,255,255,0.1);
        }

        &:first-child {
            text-align: left;

            svg {
                padding-right: @arrow_spacing;
            }

            span.subtle {
                padding-right: 0;
                padding-left: 2rem;
            }
        }
    }
}
</style>
