<template>
  <div class="sheet-block">
    <create-report-form></create-report-form>
    <report-table></report-table>
  </div>
</template>

<script>
import CreateReportForm from './CreateReportForm.vue';
import ReportTable from './ReportTable.vue';

export default {
  name: 'ReportView',
  components: { ReportTable, CreateReportForm },
};
</script>

<style lang="scss" scoped>
.sheet-block {
  padding: 25px 15px 50px 15px;
  overflow: auto;
  background-color: #F7F8FC;
  width: 100%;
}

  @media (min-width: 320px) and (max-width: 576px)  {
    .sheet-block {
    }
  }
</style>
