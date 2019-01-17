<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div class=main_column>
            <slot></slot>
        </div>
    </div>
</template>


<script>
import TutorialSidebar from '@/components/Tutorial/TutorialSidebar.vue'

export default {
    components: {
        TutorialSidebar
    },
}
</script>


<style scoped lang="less">
@purple: #490188;

div.column_wrapper {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    box-sizing: border-box;

    aside {
        background-color: @purple;
        min-height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        width: 12rem;
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
