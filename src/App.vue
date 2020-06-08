<template>
  <div id="app">
    <orders-table />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import OrdersTable from "./components/OrdersTable";

export default {
  name: "App",
  components: {
    OrdersTable,
  },
};
</script>

<style lang="sass">
@import './assets/scss/main'
</style>
