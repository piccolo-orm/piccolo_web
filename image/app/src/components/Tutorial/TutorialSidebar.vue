<template>
    <div>
        <ul>
            <li class="dark"><span class="heading">Tutorials</span></li>
        </ul>

        <template v-for="tutorial in tutorials">
            <TutorialSidebarItem
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
}
</script>

<style scoped lang="less">
ul {
    margin: 0;
    padding: 0;

    li {
        color: white;
        list-style: none;
        padding: 1rem;
        text-transform: uppercase;
    }
}
</style>
