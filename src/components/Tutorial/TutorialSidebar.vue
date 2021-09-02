<template>
    <div>
        <ul>
            <li class="heading" v-on:click.prevent="hideSidebar">
                <g-link to="/tutorial/">Tutorials</g-link>
                <a class="close" href="#">X</a>
            </li>
        </ul>

        <ul>
            <li
                :class="{active: tutorial.node.path == activePath }"
                :key="tutorial.node.title"
                v-for="tutorial in $static.tutorials.edges"
            >
                <g-link :to="tutorial.node.path">{{
                    tutorial.node.title
                }}</g-link>
            </li>
        </ul>
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
export default {
    data() {
        return {
            activePath: "",
        }
    },
    methods: {
        hideSidebar() {
            this.$emit("hideSidebar")
        }
    },
    mounted() {
        this.activePath = window.location.pathname
    },
}
</script>

<style scoped lang="less">
@import "../../variables.less";

ul {
    margin: 0;
    padding: 0;

    li {
        color: white;
        list-style: none;

        a {
            color: white;
            display: block;
            padding: 1rem;
            box-sizing: border-box;
            text-decoration: none;
        }

        &.active,
        &:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }

        &.heading {
            display: flex;
            flex-direction: row;
            text-transform: uppercase;

            a {
                flex-grow: 1;
            }

            a.close {
                flex-grow: 0;
                padding-right: 1.5rem;

                @media (min-width: @mobile_width) {
                    display: none;
                }
            }
        }
    }
}
</style>
