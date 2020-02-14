<template>
    <Layout>
        <div class="wrapper">
            <div class="content">
                <h1>Privacy</h1>
                <p>We use Google Analytics to help improve the quality of the site.</p>
                <p>No sensitive information is stored, and IP addresses are anonymised.</p>
                <p>
                    <button
                        v-if="hasAgreed"
                        v-on:click.prevent="blockGA"
                    >Block Google Analytics</button>
                    <button
                        class="primary"
                        v-else
                        v-on:click.prevent="allowGA"
                    >Allow Google Analytics</button>
                </p>
            </div>
        </div>
    </Layout>
</template>

<script>
export default {
    data: function() {
        return {
            hasAgreed: false
        }
    },
    methods: {
        blockGA: function() {
            if (process.isClient) {
                localStorage["allowGA"] = false
                this.$ga.disable()
                this.hasAgreed = false
            }
        },
        allowGA: function() {
            if (process.isClient) {
                localStorage["allowGA"] = true
                this.$ga.enable()
                this.hasAgreed = true
            }
        }
    },
    created: function() {
        if (process.isClient) {
            this.hasAgreed = localStorage["allowGA"] == "true"
        }
    }
}
</script>

<style scoped lang="less">
div.wrapper {
    padding: 8rem 1rem;

    div.content {
        margin: 0 auto;
        max-width: 50rem;
    }

    button {
        background: none;
        border: 1px solid #4e4e4e !important;
        color: #4e4e4e;
        display: inline-block;
        font-size: 1rem;
        padding: 0.5rem;
        border: none;

        &.primary {
            background-color: #ff8787;
            border: 1px solid #ff8787 !important;
            color: white;
        }
    }
}
</style>
