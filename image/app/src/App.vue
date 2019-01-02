<template>
    <div id="app">
        <nav>
            <h1><router-link to="/">Piccolo</router-link></h1>
            <ul>
                <li><a href="https://github.com/telerytech/piccolo">Github</a></li>
                <li><router-link to="/tutorial">Tutorials</router-link></li>
                <li><router-link to="/blog">Blog</router-link></li>
            </ul>
        </nav>
        <router-view/>
        <PermissionPopup></PermissionPopup>
    </div>
</template>


<script>
import PermissionPopup from './components/PermissionPopup.vue'

export default {
    components: {
        PermissionPopup
    }
}
</script>


<style lang="less">
@purple: #490188;

#app {
    font-family: 'Open Sans', 'Source Sans Pro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
}

html {
   margin: 0px;
   padding: 0px;
   min-height: 100vh;
}

body {
    margin: 0px;
    min-height: 100vh;
    position: relative;
}

a {
    color: lighten(@purple, 15%);
}

nav {
    background-color: black;
    color: white;
    display: flex;
    flex-direction: row;
    position: fixed;
    z-index: 1000;
    width: 100%;

    h1 {
        display: inline-block;
        flex-grow: 1;
        margin: 0;
        padding: 1rem 2rem;

        a {
          color: white;
          text-decoration: none;
        }
    }

    ul {
        display: inline-block;
        flex-grow: 0;
        padding-right: 1rem;

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
</style>
