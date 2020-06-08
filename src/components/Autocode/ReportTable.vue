<template>
  <div class="report-block_wrapper">
    <div class="report-block report-block_border">
      <div class="report-block__title">Все отчёты</div>
      <div class="sheet">
        <div class="title-row">
          <div class="title-left">
            <div class="title-left__text">Идентификатор</div>
            <div class="title-left__text">Тип идентификатора</div>
          </div>
          <div class="title-right">
            <div class="title-right__text ">Дата</div>
            <div class="title-right__text ">Статус</div>
          </div>
        </div>
        <div class="row-items" v-for="(report, index) in allReports" :key="index">
          <div class="left-block">
            <div class="row-items__text ">{{report.id}}</div>
            <div class="row-items__text ">{{report.typeId}}</div>
          </div>
          <div class="block-right">
            <div class="data-block">
              <div class="row-items__text row-items__text-date">{{report.date | date}}</div>
              <div class="progress" :class="{'progress_error': report.progress === 'error',
          'progress_done': report.progress === 'done'}">
                <div class="progress__text">{{report.progress}}</div>
              </div>
            </div>
            <button @click="removeReport(report.date)" class="delete-btn delete-button_wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white"/>
                <path d="M18.75 5.31094H15V4.37344C15 3.61406 14.3859 3 13.6266 3H10.3687C9.61406 3 9 3.61406 9 4.37344V5.31094H5.25V6H6.23906L7.34531 19.6266C7.34531 20.3859 7.95937 21 8.71875 21H15.3281C16.0875 21 16.7016 20.3859 16.7016 19.6266L17.7938 6H18.75V5.31094ZM9.68438 4.37344C9.68438 3.99375 9.99375 3.68437 10.3687 3.68437H13.6266C14.0063 3.68437 14.3109 3.99375 14.3109 4.37344V5.31094H9.68438V4.37344ZM16.0125 19.5891V19.6266C16.0125 20.0063 15.7031 20.3156 15.3281 20.3156H8.71875C8.33906 20.3156 8.03437 20.0063 8.03437 19.6266V19.5891L6.92344 6H17.1047L16.0125 19.5891Z" fill="black"/>
                <path d="M11.6719 7.5H12.3281V18.7969H11.6719V7.5ZM15 7.5H14.3156L13.8141 18.7969H14.4984L15 7.5ZM9.67969 7.5H9L9.50156 18.7969H10.1859L9.67969 7.5Z" fill="black"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ReportTable',
  data() {
    return {
      colors: ['#F12B2C', '#F1A22B', ' #29CC97'],
    };
  },
  filters: {
    date(value) {
      let res = '';
      let data = '';
      if (typeof value === 'object') {
        data = value.toISOString();
      } else {
        data = value;
      }
      const regData = /[-A-Z:.]/gi;
      const arrData = data.split(regData);
      res = `${arrData[0]}.${arrData[1]}.${arrData[2]} `
            + `${arrData[3]}` + `:${arrData[4]}:${arrData[5]}`;
      return res;
    },
  },
  computed: {
    ...mapGetters(['allReports']),
  },
  methods: {
    ...mapActions(['getReports']),
    ...mapMutations(['removeReport']),
  },
  async mounted() {
    this.getReports();
  },
};
</script>

<style lang="scss" scoped>


  .report-block_wrapper {
    margin-top: 25px;
  }

  .report-block_border {
    background: #FFFFFF;
    border: 1px solid #DFE0EB;
    box-sizing: border-box;
    border-radius: 8px;
  }

  .report-block {
    padding-top: 25px;
    padding-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .sheet {
    display: flex;
    flex-direction: column;
  }

  .row-items {
    padding: 15px 69px 15px 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dfe0eb;

    &:hover {
      background: #F7F8FF;
    }
  }

  .title-row {
    padding: 15px 69px 15px 17px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dfe0eb;
    font-weight: bold;
    width: 100%;
  }

  .title-left {
    display: flex;
    justify-content: space-between;
    width: 52%;
  }

  .title-right {
    display: flex;
    justify-content: space-between;
    padding-left: 114px;
    width: 32%;
  }

  .left-block {
    display: flex;
    justify-content: space-between;
    width: 53%;
  }

  .block-right {
    display: flex;
    justify-content: space-between;
    width: 37%;
  }

  .row-items__title {
    width: 35%;
    font-style: normal;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.2px;
  }


  .row-items__title-width {
    width: 21%;
  }

  .data-block {
    display: flex;
    align-items: center;
    width: 88%;
  }

  .report-block__title {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    margin-left: 15px;
    letter-spacing: 0.3px;
  }

  .row-items__text {
    width: 30%;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .row-items__text-date {
    margin-right: 0px;
    width: 50%;
  }

  .progress {
    background: #F1A22B;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 32%;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .progress_done {
    background: #29CC97;
  }

  .progress_error {
    background: #F12B2C;
  }

  .progress__text {
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .delete-button {
    outline: none;
  }

  .delete-button_wrap {
  }

  @media (min-width: 992px) {
    .row-items__text_lg {
      align-items: center;
      text-align: center;
      width: 60%;
    }
    .title-right {
      padding-left: 72px;
      width: 35%;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .row-items {
      padding: 15px 19px 15px 17px;
    }
    .title-left {
      flex-wrap: wrap;
    }
    .title-right {
      padding-left: 20px;
      width: 39%;
    }
    .block-right {
      width: 51%;
    }
    .progress {
      width: 36%;
      padding: 8px 19px 8px 18px;
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    .report-block {
      width: 100%;
    }
  }
  @media (min-width: 576px) and (max-width: 767px) {
    .title-row {
      padding: 15px 17px 15px 17px;
    }
    .title-left {
      flex-wrap: wrap;
    }
    .title-right {
      padding-left: 41px;
    }
    .left-block {
      width: 60%;
    }
    .row-items {
      padding: 15px 17px 15px 17px;
      flex-wrap: wrap;
    }
    .block-right {
      width: 40%;
    }
  }
  @media (min-width: 320px) and (max-width: 575px) {
    .title-row {
      display: none;
    }
    .row-items {
      flex-wrap: wrap;
      padding: 15px 22px 15px 17px;
    }
    .left-block {
      width: 88%;
    }
    .block-right {
      width: 100%;
    }
    .row-items__text-date {
      font-style: italic;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0.2px;
      color: #838383;
    }
    .delete-button_wrap {
      position: absolute;
      right: 10px;
      margin-right: 16px;
      margin-top: -21px;
    }
    .row-items__text-date {
      width: 66%;
    }
    .data-block {
      width: 100%;

    }
    .block-right {
      z-index: 999;
      padding-top: 13px;

    }
    .title-row {
      padding: 15px 22px 15px 18px;
    }
    .progress {
      z-index: 10;
      width: 45%;
    }
    .row-items__text:nth-child(2) {
      text-align: end;
    }
  }


</style>
