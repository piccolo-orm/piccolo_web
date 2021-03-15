<template>
    <div id="lightbox" v-if="visible">
        <p class="close">
            <a href="#" v-on:click.prevent="visible = false" title="Close popup"
                ><font-awesome-icon icon="times"
            /></a>
        </p>
        <div class="content">
            <img :src="imageSrc" v-if="imageSrc" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: true,
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
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 1000;

    p.close {
        box-sizing: border-box;
        flex-grow: 0;
        line-height: 1;
        margin: 0;
        padding: 2rem;
        text-align: right;

        a {
            color: white;
            font-size: 3rem;
            font-weight: bold;
        }
    }

    div.content {
        box-sizing: border-box;
        flex-grow: 0;
        padding: 1rem;

        img {
            display: block;
            margin: 0 auto;
            max-height: 100%;
            max-width: 100%;
            width: 60rem;
        }
    }
}
</style>
