<template>
    <div v-if="visible">
        <p class="title">Allow Google Analytics?</p>
        <p>This helps us improve the website. You can change your <router-link to="privacy">preference</router-link> at any time.</p>
        <ul>
            <li>
                <button
                    class="primary"
                    v-on:click.prevent="allowGA">OK</button>
            </li>
            <li>
                <button v-on:click.prevent="blockGA">No thanks</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            visible: true
        }
    },
    methods: {
        allowGA: function() {
            localStorage['allowGA'] = true
            if (process.env.NODE_ENV == 'production') {
                this.$ga.enable()
            }
            this.visible = false
        },
        blockGA: function() {
            localStorage['allowGA'] = false
            if (process.env.NODE_ENV == 'production') {
                this.$ga.disable()
            }
            this.visible = false
        }
    },
    created: function() {
        this.visible = (localStorage['allowGA'] == undefined)
    }
}
</script>

<style scoped lang="less">
div {
    box-shadow: 1px 1px 1px black;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.8);
    padding: 2rem;
    z-index: 100;

    p {
        color: white;
        font-size: 0.8rem;
        text-align: center;

        a {
            color: white;
        }

        &.title {
            font-size: 1.2rem;
            margin-bottom: 0.2rem;
        }
    }

    p + p {
        margin-top: 0;
    }

    ul {
        padding: 0;
        text-align: center;

        li {
            display: inline-block;
            margin: 0.2rem;
        }
    }

    button {
        background: none;
        border: 1px solid #ddd !important;
        color: white;
        display: inline-block;
        font-size: 1rem;
        padding: 0.5rem;
        border: none;
        width: 10rem;

        &.primary {
            background-color: #FF8787;
            border: 1px solid #FF8787 !important;
        }
    }
}
</style>
