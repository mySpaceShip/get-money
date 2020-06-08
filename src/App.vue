<template>
  <div id="app">
    <!-- <orders-table /> -->
    <!-- <order-editor /> -->
    <router-view></router-view>
  </div>
</template>

<script>
/*eslint-disable*/
import OrdersTable from "./components/OrdersTable";
import OrderEditor from "./components/OrderEditor";


export default {
  name: "App",
  components: {
    OrdersTable,
    OrderEditor
  },
};
</script>

<style lang="sass">
@import './assets/scss/main'
</style>
