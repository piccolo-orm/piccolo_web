<template>
    <div class="center_wrapper">
        <p><router-link :to="{name: 'blog'}">All posts</router-link></p>
        <div v-html="html"></div>
    </div>
</template>

<script>
import axios from 'axios';

// TODO ... need to get the parameters from the router...
export default {
    data: function() {
        return {
            html: ''
        }
    },
    created: function() {
        let app = this;
        axios.get('/html/is_async_worthwhile.html').then(
            response => app.html = response.data
        )
    }
}
</script>

<style>

</style>
