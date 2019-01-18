<template>
    <div class="column_wrapper">
        <TutorialSidebarTab v-on:showSidebar="showSidebar()" />
        <aside v-bind:class="{hidden: hiddenSidebar}">
            <TutorialSidebar v-on:hideSidebar="hideSidebar()" />
        </aside>
        <div class=main_column>
            <slot></slot>
        </div>
    </div>
</template>


<script>
import TutorialSidebar from '@/components/Tutorial/TutorialSidebar.vue'
import TutorialSidebarTab from '@/components/Tutorial/TutorialSidebarTab.vue'

export default {
    data: function() {
        return {
            hiddenSidebar: false
        }
    },
    components: {
        TutorialSidebar,
        TutorialSidebarTab
    },
    methods: {
        hideSidebar: function() {
            this.hiddenSidebar = true;
        },
        showSidebar: function() {
            this.hiddenSidebar = false;
        }
    }
}
</script>


<style scoped lang="less">
@import "../../variables.less";

div.column_wrapper {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;

    aside {
        background-color: @purple;
        min-height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        width: 12rem;

        @media(max-width: @mobile_width) {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            z-index: 100;

            &.hidden {
                display: none;
                right: 100%;
            }
        }
    }

    aside, div.main_column {
        padding-top: 4rem;
    }

    div.main_column {
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;

        p.edit {
            font-size: 0.8rem;
            padding: 0.5rem 1rem 1rem;
        }

        div.html {
            box-sizing: border-box;
            padding: 1rem;

            h2 {
                margin-top: 2.5rem;
                margin-bottom: 0.5rem;
            }

            em {
                background-color: fadeout(@purple, 90%);
                border: 1px solid @purple;
                color: @purple;
                display: block;
                padding: 0.5rem;

                &::before {
                    content: "!";
                    font-weight: bold;
                    font-style: normal;
                    padding: 0.1rem 0.7rem;
                    margin-right: 0.5rem;
                    border: 1px solid @purple;
                    border-radius: 1rem;
                }
            }
        }

        div.nav_padding {
            height: 5rem;
        }
    }
}
</style>
