<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div>
            <h1>Tutorial</h1>
            <p>Coming soon ...</p>
        </div>
    </div>
</template>

<script>
import TutorialSidebar from '@/components/Tutorial/TutorialSidebar.vue'

export default {
    // Want to have a nav in the sidebar ...
    // Fetching tutorials ... put them into Vuex ...
    components: {
        TutorialSidebar
    }
}
</script>

<style lang="less">
div.column_wrapper {
    display: flex;
    flex-direction: row;

    aside {
        width: 10rem;
    }

    div {
        flex: 1;
    }
}
</style>
