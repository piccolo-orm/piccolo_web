<template>
    <div class="tutorial_column_wrapper">
        <TutorialSidebarTab v-on:showSidebar="showSidebar()" />
        <aside v-bind:class="{ hidden: hiddenSidebar }">
            <TutorialSidebar v-on:hideSidebar="hideSidebar()" />
        </aside>
        <div class="main_column">
            <slot></slot>
        </div>
    </div>
</template>


<static-query>
query {
  tutorials: allTutorial {
    edges {
      node {
        title
        path
        content
      }
    }
  }
}
</static-query>


<script>
import TutorialSidebar from "@/components/Tutorial/TutorialSidebar.vue"
import TutorialSidebarTab from "@/components/Tutorial/TutorialSidebarTab.vue"

export default {
    data: function () {
        return {
            hiddenSidebar: true,
        }
    },
    components: {
        TutorialSidebar,
        TutorialSidebarTab,
    },
    methods: {
        hideSidebar: function () {
            this.hiddenSidebar = true
        },
        showSidebar: function () {
            this.hiddenSidebar = false
        },
    },
}
</script>


<style lang="less">
@import "../../variables.less";

div.tutorial_column_wrapper {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;

    aside {
        background-color: @dark_blue;
        min-height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        width: 12rem;

        @media (max-width: @mobile_width) {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: scroll;
            width: 100%;
            z-index: 100;

            &.hidden {
                display: none;
                right: 100%;
            }
        }
    }

    aside,
    div.main_column {
        box-sizing: border-box;
        padding-top: 4rem;
    }

    div.main_column {
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;

        @media (max-width: @mobile_width) {
            padding-top: 6rem;
        }

        p.edit {
            font-size: 0.8rem;
            padding: 0.5rem 1rem 1rem;
        }

        div.html {
            box-sizing: border-box;
            max-width: 50rem;
            padding: 3rem 1rem 5rem;
            margin: 0 auto;

            hr {
                border: none;
                background-color: #f0f0f0;
                height: 2px;
                margin: 2rem 0;
            }

            iframe {
                padding: 1rem 0;
                width: 100%;
                display: block;
                margin: 0 auto;
            }

            p {
                code {
                    padding: 2px 4px;
                    background-color: @blue_grey;
                    border-radius: 4px;
                }
            }

            h2 {
                margin-top: 2.5rem;
                margin-bottom: 0.5rem;
            }

            em {
                background-color: fadeout(@light_blue, 90%);
                border: 1px solid @light_blue;
                color: @light_blue;
                display: block;
                padding: 0.5rem;

                &::before {
                    content: "!";
                    font-weight: bold;
                    font-style: normal;
                    padding: 0.1rem 0.7rem;
                    margin-right: 0.5rem;
                    border: 1px solid @light_blue;
                    border-radius: 1rem;
                }
            }
        }

        div.nav_padding {
            height: 7rem;
        }
    }
}
</style>
