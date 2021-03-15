<template>
    <div id="lightbox" v-if="visible">
        <p class="close">
            <a href="#" v-on:click.prevent="visible = false" title="Close popup"
                ><font-awesome-icon icon="times"
            /></a>
        </p>
        <img :src="imageSrc" v-if="imageSrc" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            imageSrc: undefined,
        }
    },
    mounted() {
        let app = this

        let links = document.getElementsByClassName("lightbox")
        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault()
                console.log("I was clicked")

                link.children.forEach((child) => {
                    if (child.tagName == "IMG") {
                        app.imageSrc = child.src
                        app.visible = true
                    }
                })
            })
        })
    },
}
</script>

<style lang="less">
div#lightbox {
    background-color: rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    z-index: 1000;

    p.close {
        flex-grow: 0;
        line-height: 1;
        margin: 0;
        text-align: right;
        padding-bottom: 1rem;

        a {
            color: white;
            font-size: 3rem;
            font-weight: bold;
        }
    }

    img {
        display: block;
        flex-grow: 1;
        margin: 0 auto;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        object-position: top;
        width: 60rem;
    }
}
</style>
