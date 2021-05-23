<template>
    <Layout>
        <Hero>
            <h2><font-awesome-icon icon="tools" />Piccolo Admin</h2>
            <h3>A modern web app for managing your data</h3>

            <a href="/images/ecosystem/piccolo_admin.png" class="lightbox"
                ><img src="/images/ecosystem/piccolo_admin.png"
            /></a>
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
                <ul>
                    <li>
                        <a
                            href="https://piccolo-admin.readthedocs.io/en/latest/"
                            >Read the docs</a
                        >
                    </li>
                    <li>
                        <a href="https://github.com/piccolo-orm/piccolo_admin"
                            >Source code</a
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
}
</style>
