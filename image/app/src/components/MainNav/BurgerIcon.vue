<template>
    <ul v-bind:class="{active: active}">
        <li></li>
        <li></li>
    </ul>
</template>

<script>
export default {
    props: {
        active: false
    }
}
</script>

<style scoped lang="less">
@transition_speed: 0.5s;

ul {
    margin-top: 1.5rem;
    width: 25px;

    li {
        height: 1px;
        background-color: white;
        list-style: none;
        margin-bottom: 10px;
        transition: @transition_speed transform;
    }

    &.active {
        li:first-child {
            transform: translate(0, 5px) rotate(-45deg);
        }
        li {
            transform-origin: center;
            transform: translate(0, -5px) rotate(45deg);
            transition: @transition_speed transform;
        }
    }
}
</style>
