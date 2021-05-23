<template>
    <div class="hero"><slot></slot></div>
</template>

<script>
export default {}
</script>

<style lang="less">
@import "../variables.less";

div.hero {
    background-color: @light_blue;
    text-align: center;
    padding: 14rem 1rem 10rem;
    box-sizing: border-box;

    h2 {
        color: white;
        font-size: 2.2rem;
        font-weight: bold;
        margin: 0;
        padding: 1rem;

        @media (max-width: @mobile_width) {
            font-size: 1.6rem;
        }

        svg {
            padding-right: 0.5rem;
        }
    }

    h3 {
        color: rgba(255, 255, 255, 0.7);
        margin-top: 0;
    }

    img {
        max-width: 60rem;
        width: 100%;
    }
}
</style>
