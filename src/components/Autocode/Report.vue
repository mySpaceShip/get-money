<template>
  <div class="report-block">
    <left-sidebar></left-sidebar>
    <report-view></report-view>
  </div>

</template>

<script>
import LeftSidebar from './LeftSidebar.vue';
import ReportView from './ReportView.vue';

export default {
  name: 'Report',
  components: { ReportView, LeftSidebar },
};
</script>

<style lang="scss" scoped>
  .report-block {
    display: flex;
    width: 1440px;
    justify-content: center;
    background: linear-gradient(0deg, #067EFF, #067EFF);
  }
  @media (min-width: 576px) and (max-width: 767px) {
    .report-block {
      width: 100%;
    }
  }
  @media (min-width: 320px) and (max-width: 575px) {
    .report-block {
      width: 100%;
    }
  }
</style>
