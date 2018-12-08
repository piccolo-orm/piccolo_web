<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MainFooter from '@/components/MainFooter.vue';

export default {
    name: "home",
    components: {
        HelloWorld,
        MainFooter
    },
    mounted: function() {
        Prism.highlightAll()
    }
};
</script>
