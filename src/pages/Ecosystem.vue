<template>
    <Layout>
        <Hero>
            <h2><font-awesome-icon icon="tools" />Piccolo Admin</h2>
            <h3>A modern web app for managing your data</h3>

            <a
                href="/images/ecosystem/piccolo_admin_dark.png"
                class="lightbox"
                v-show="colourMode == 'dark'"
                ><img src="/images/ecosystem/piccolo_admin_dark.png"
            /></a>

            <a
                href="/images/ecosystem/piccolo_admin_light.png"
                class="lightbox"
                v-show="colourMode == 'light'"
                ><img src="/images/ecosystem/piccolo_admin_light.png"
            /></a>

            <a
                style="
                    color: white;
                    text-alight: center;
                    display: block;
                    padding-top: 2rem;
                "
                href="#"
                v-on:click.prevent="
                    colourMode = colourMode == 'light' ? 'dark' : 'light'
                "
                ><font-awesome-icon
                    :icon="colourMode == 'light' ? 'moon' : 'sun'"
                />
                Show {{ colourMode == "light" ? "dark" : "light" }} mode</a
            >
        </Hero>
        <section>
            <div class="center_wrapper">
                <h2>Features</h2>

                <Benefits :benefits="benefits" />
            </div>
        </section>

        <section>
            <div class="center_wrapper">
                <h2>Learn more</h2>
                <ul class="link_blocks">
                    <li>
                        <a
                            href="https://piccolo-admin.readthedocs.io/en/latest/"
                            ><font-awesome-icon icon="file" />Read the docs</a
                        >
                    </li>
                    <li>
                        <a href="https://github.com/piccolo-orm/piccolo_admin">
                            <font-awesome-icon :icon="['fab', 'github']" />View
                            the source code</a
                        >
                    </li>
                </ul>
            </div>
        </section>

        <Lightbox />
    </Layout>
</template>


<script>
import Benefits from "../components/Benefits.vue"
import Hero from "../components/Hero.vue"
import Lightbox from "../components/Lightbox.vue"

export default {
    components: {
        Benefits,
        Hero,
        Lightbox,
    },
    data() {
        return {
            colourMode: "dark",
            benefits: [
                "An alternative to tools like Wordpress and the Django Admin",
                "User friendly and slick design",
                "Fully open source",
                "Built with Vue JS, a popular and cutting edge framework",
                "Dark mode support",
                "CSV exports",
                "Works on mobile and desktop",
                "Powered by the Piccolo ORM",
            ],
        }
    },
    metaInfo: {
        title: "Ecosystem",
        meta: [
            {
                key: "description",
                name: "description",
                content:
                    "The Piccolo Ecosystem, including the Piccolo admin, a modern web GUI for managing your database.",
            },
        ],
    },
}
</script>


<style lang="less" scoped>
@import "../variables.less";

section {
    box-sizing: border-box;
    padding: 5rem 2rem;

    &:nth-child(even) {
        background-color: @blue_grey;
    }

    ul.link_blocks {
        padding: 0;

        li {
            display: inline-block;
            box-sizing: border-box;
            padding: 0 0.2rem 0 0;

            text-align: center;
            width: 50%;

            &:nth-child(even) {
                padding: 0 0 0 0.2rem;
            }

            a {
                background-color: @light_blue;
                color: white;
                display: block;
                padding: 1rem;

                svg {
                    margin-right: 0.5rem;
                }
            }
        }
    }
}
</style>
