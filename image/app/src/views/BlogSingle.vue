<template>
    <div>
        <h1>This is a blog post ...</h1>
        {{ html }}
    </div>
</template>

<script>
import 'axios';

// TODO ... need to get the parameters from the router...
export default {
    data: function() {
        html: ''
    },
    created: function() {
        let app = this;
        axios.get('/html/is_async_worthwhile.html').then(
            response => app.html = response
        )
    }
}
</script>

<style>

</style>
