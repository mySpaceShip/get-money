<template>
  <div id="app">
    <random-values />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import RandomValues from './components/random-values'
export default {
  name: "App",
  components: {
    RandomValues,
  },
};
</script>

<style lang="sass">
@import './assets/scss/main'
</style>
