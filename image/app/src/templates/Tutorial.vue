<template>
    <Layout>
        <div>
            <TutorialBase>
                <div class="html">
                    <h1>{{ $page.tutorial.title }}</h1>
                    <div v-html="$page.tutorial.content"></div>
                </div>
            </TutorialBase>
        </div>
    </Layout>
</template>


<page-query>
query Tutorial ($path: String!) {
  tutorial: tutorial (path: $path) {
    title
    content
  }
}
</page-query>


<script>
import TutorialBase from "@/components/Tutorial/TutorialBase.vue"

export default {
    components: {
        TutorialBase
    }
}
</script>
