<template>
    <div>
        <ul>
            <li class="heading" v-on:click.prevent="hideSidebar">
                <router-link :to="{name: 'tutorial'}">Tutorials</router-link>
                <a href="#" class="close">X</a>
            </li>
        </ul>

        <template v-for="tutorial in tutorials">
            <TutorialSidebarItem
                v-on:hideSidebar="hideSidebar"
                v-bind:key="tutorial.slug"
                v-bind:tutorial="tutorial"></TutorialSidebarItem>
        </template>
    </div>
</template>

<script>
import TutorialSidebarItem from './TutorialSidebarItem.vue'

export default {
    components: {
        TutorialSidebarItem,
    },
    computed: {
        tutorials: function() {
            return this.$store.state.tutorials || []
        },
    },
    methods: {
        hideSidebar: function() {
            this.$emit('hideSidebar');
        }
    }
}
</script>

<style scoped lang="less">
@import '../../variables.less';

ul {
    margin: 0;
    padding: 0;

    li {
        color: white;
        list-style: none;
        padding: 1rem;
        text-transform: uppercase;

        a {
            color: white;
            text-decoration: none;
        }
    }

    li.heading {
        a.close {
            float: right;
            padding-right: 1.5rem;

            @media(min-width: @mobile_width) {
                display: none;
            }
        }
    }
}
</style>
