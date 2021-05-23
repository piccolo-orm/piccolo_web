<template>
    <ul id="benefits">
        <li v-bind:key="benefit" v-for="benefit in benefits">
            <font-awesome-icon icon="check" style="max-height: 1rem" />
            <span v-html="benefit"></span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        benefits: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="less">
ul#benefits {
    padding-left: 0;

    li {
        list-style: none;
        padding: 0.5rem 0;

        svg {
            color: green;
            padding-right: 0.5rem;
        }
    }
}
</style>
