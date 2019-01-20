<template>
    <nav>
        <div class="inner">
            <div class="burger_wrapper">
                <a href="#" v-on:click.prevent="burgerVisible = burgerVisible ? false : true">
                    <img src="@/assets/images/burger_menu.png" />
                </a>
                <LinkList v-if="burgerVisible" v-on:navigating="burgerVisible = false" />
            </div>
            <h1><router-link to="/">Piccolo</router-link></h1>
            <div class="link_wrapper">
                <LinkList/>
            </div>
        </div>
        <div class="overlay" v-if="burgerVisible"></div>
    </nav>
</template>

<script>
import LinkList from './LinkList.vue'

export default {
    components: {
        LinkList
    },
    data: function() {
        return {
            burgerVisible: false
        }
    }
}
</script>

<style lang="less">
@import "../../variables.less";
@overlay_color: lighten(black, 10%);

nav {
    background-color: black;
    color: white;
    position: fixed;
    z-index: 1000;
    width: 100%;

    div.overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: @overlay_color;
    }

    div.inner {
        position: relative;
        display: flex;
        flex-direction: row;
        z-index: 1000;
    }

    h1 {
        display: inline-block;
        flex-grow: 1;
        margin: 0;
        padding: 1rem 1.5rem;

        @media(max-width: @mobile_width) {
            text-align: center;
            padding-right: 3rem;
        }

        a {
          color: white;
          text-decoration: none;
        }
    }

    div.burger_wrapper {
        flex-grow: 0;

        @media(min-width: @mobile_width) {
            display: none;
        }

        img {
            padding-left: 1rem;
            padding-top: 1.1rem;
        }

        ul {
            background-color: @overlay_color;
            position: absolute;
            margin: 0;
            top: 100%;
            right: 0;
            width: 100%;
            text-align: right;

            li {
                display: block;
                text-align: center;

                a {
                    color: white;
                    display: block;
                    padding: 1.5rem 2rem;
                    text-decoration: none;

                    &:hover {
                        background-color: rgba(255,255,255, 0.05)
                    }
                }
            }
        }
    }

    div.link_wrapper {
        flex-grow: 0;

        @media(max-width: @mobile_width) {
            display: none;
        }

        ul {
            display: inline-block;

            padding-right: 2rem;
            margin-top: 1.2rem;

            li {
                display: inline-block;
                list-style: none;
                padding-left: 1.5rem;

                a {
                    color: white;
                    text-decoration: none;
                }
            }
        }
    }
}

</style>
