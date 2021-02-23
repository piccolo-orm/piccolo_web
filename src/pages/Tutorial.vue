<template>
    <Layout>
        <div>
            <TutorialBase>
                <div class="html">
                    <h1>Tutorials</h1>
                    <p>
                        Welcome to the Piccolo tutorials. Select a tutorial from
                        the menu to get started.
                    </p>
                </div>
            </TutorialBase>
        </div>
    </Layout>
</template>


<script>
import TutorialBase from "@/components/Tutorial/TutorialBase.vue"

export default {
    props: {
        tutorialName: {
            type: String,
            default: "",
        },
        stepName: {
            type: String,
            default: "",
        },
    },
    components: {
        TutorialBase,
    },
    data: function () {
        return {
            html: "",
        }
    },
    metaInfo: {
        title: "Tutorials",
        meta: [
            {
                key: "description",
                name: "description",
                content: "Piccolo ORM Tutorials",
            },
        ],
    },
}
</script>
