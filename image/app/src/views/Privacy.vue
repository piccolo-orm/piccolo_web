<template>
    <div>
        <div class="content">
            <h1>Privacy</h1>
            <p>We use Google Analytics to help improve the quality of the site.</p>
            <p>No sensitive information is stored, and IP addresses are anonymised.</p>
            <p>
                <button v-if="hasAgreed" v-on:click.prevent="blockGA">Block Google Analytics</button>
                <button v-else v-on:click.prevent="allowGA">Allow Google Analytics</button>
            </p>
        </div>
        <MainFooter></MainFooter>
    </div>
</template>

<script>
import MainFooter from '@/components/MainFooter.vue';

export default {
    components: {
        MainFooter
    },
    data: function() {
        return {
            hasAgreed: false
        }
    },
    methods: {
        blockGA: function() {
            localStorage['allowGA'] = false
            this.$ga.disable()
        },
        allowGA: function() {
            localStorage['allowGA'] = true
            this.$ga.enable()
        }
    },
    created: function() {
        this.hasAgreed = (localStorage['allowGA'] == 'true')
    }
}
</script>

<style scoped lang="less">
div {
    padding-top: 5rem;

    div.content {
        margin: 0 auto;
        max-width: 50rem;
    }
}
</style>
