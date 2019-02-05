<template>
  <div>
    <HomeContent></HomeContent>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeContent from "@/components/HomeContent.vue";
import MainFooter from '@/components/MainFooter.vue';

export default {
    name: "home",
    components: {
        HomeContent,
        MainFooter
    },
};
</script>
