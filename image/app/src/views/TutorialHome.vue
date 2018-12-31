<template>
    <div class="column_wrapper">
        <aside>
            <TutorialSidebar></TutorialSidebar>
        </aside>
        <div class=main_column>
            <div class="html">
                <h1>Tutorials</h1>
                <p>Welcome to the Piccolo tutorials. Select a tutorial from the sidebar to get started.</p>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialSidebar from '@/components/Tutorial/TutorialSidebar.vue'

export default {
    components: {
        TutorialSidebar
    }
}
</script>

<style lang="less">
@purple: #490188;

div.column_wrapper {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: 4rem;

    aside {
        background-color: @purple;
        min-height: 100%;
        width: 15rem;
    }

    div.main_column {
        position: relative;
        flex: 1;

        div.html {
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

                a, span {
                    box-sizing: border-box;
                    color: white;
                    display: block;
                    font-size: 1.1rem;
                    padding: 2rem;
                }

                a {
                    text-decoration: none;
                }

                &:hover {
                    background-color: rgba(255,255,255,0.1);
                }

                &:first-child {
                    text-align: left;
                }
            }
        }
    }
}
</style>
