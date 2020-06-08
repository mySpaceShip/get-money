<template>
  <div class="create-block create-block_wrapper">
    <div class="create-block__title">Создать отчёт</div>
    <div class="report-form report-form_wrapper">
      <div class="form-block">
        <label class="report-form__title" for="">Идентификатор</label>
        <input class="report-form__action" v-model="matchType" :placeholder="placeholderType"/>
        <div v-if="errors">
          <div v-for="(error, index) in errors" :key="index">
            <div class="report-form__error">{{error}}</div>
          </div>
        </div>
      </div>
      <div class="form-block">
        <label class="report-form__title" for="">Тип идентификатора</label>
        <select v-model="type" class="report-form__action">
          <option>vin</option>
          <option>грз</option>
          <option>body</option>
        </select>
      </div>
      <button @click="createReport(matchType)" class="btn">
        <span class="btn__text">Создать</span>
      </button>
    </div>

  </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CreateReportForm',
  data() {
    return {
      type: 'грз',
      errors: [],
      progress: ['error', 'progress', 'done'],
      matchType: '',
    };
  },
  computed: {
    placeholderType() {
      let res = '';
      if (this.type === 'vin') {
        res = '4F2YU08102KM26251';
      }
      if (this.type === 'body') {
        res = 'XYZ12-3456789';
      }
      if (this.type === 'грз') {
        res = 'X362AX196';
      }
      return res;
    },
  },
  methods: {
    ...mapMutations(['addReport']),

    createReport() {
      this.errors = [];
      const random = Math.random() * ((this.progress.length - 1) + 1);
      const report = {
        id: this.matchType,
        typeId: this.type,
        date: new Date(),
        progress: this.progress[Math.floor(random)],
      };
      if (!this.matchType) {
        this.errors.push('Поле "индентификатор" пустое');
        return;
      }
      if (!this.isValidType(this.matchType)) {
        this.errors.push('  Неверный тип идентификатора');
        return;
      }
      this.addReport(report);
    },

    isValidType(type) {
      let res = false;
      if (this.type === 'грз') {
        res = this.isValidGrz(type);
      }
      if (this.type === 'vin') {
        res = this.isValidVin(type);
      }
      return res;
    },

    isValidVin(vin) {
      if (!vin.match('^([0-9a-hj-npr-zA-HJ-NPR-Z]{10,17})+$')) {
        return false;
      }
      const letters = [{ k: 'A', v: 1 }, { k: 'B', v: 2 }, { k: 'C', v: 3 },
        { k: 'D', v: 4 }, { k: 'E', v: 5 }, { k: 'F', v: 6 }, { k: 'G', v: 7 },
        { k: 'H', v: 8 }, { k: 'J', v: 1 }, { k: 'K', v: 2 }, { k: 'L', v: 3 },
        { k: 'M', v: 4 }, { k: 'N', v: 5 }, { k: 'P', v: 7 }, { k: 'R', v: 9 },
        { k: 'S', v: 2 }, { k: 'T', v: 3 }, { k: 'U', v: 4 }, { k: 'V', v: 5 },
        { k: 'W', v: 6 }, { k: 'X', v: 7 }, { k: 'Y', v: 8 }, { k: 'Z', v: 9 }];
      const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
      const exclude = ['I', 'O', 'Q'];
      let val = 0;
      for (let idx = 0; idx < vin.length; idx += 1) {
        const item = vin.charAt(idx).toUpperCase();
        if (exclude.find(x => x === item)) {
          return false;
        }
        const pos = (item.match('^[0-9]+$') != null) ? parseInt(item, 10) : letters.filter(letter => letter.k === item)[0].v;
        val += (pos * weights[idx]);
      }
      const checksum = (val % 11);
      return (vin.charAt(8) === (checksum < 10 ? checksum.toString() : 'X'));
    },

    isValidGrz(type) {
      let res = true;
      if (type.length < 8 || type.length > 9) {
        res = false;
      }
      const letters = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х'];
      const regNumber = /\d/;
      for (let i = 0; i < type.length; i += 1) {
        const item = type.charAt(i).toUpperCase();
        if (i === 0 || i === 4 || i === 5) {
          res = letters.filter(letter => letter === item);
          if (!res.length) {
            res = false;
          }
        }
        if (i > 0 && i < 4 && i > 5 && i < 9) {
          if (!item.match(regNumber)) {
            res = false;
          }
        }
        if (i > 5 && i < 9) {
          if (!item.match(regNumber)) {
            res = false;
          }
        }
      }
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>

  .create-block_wrapper {
    background: #FFFFFF;
    border: 1px solid #DFE0EB;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 23px 15px 47px 15px;
  }

  .create-block {
    display: flex;
    flex-direction: column;
  }

  .create-block__title {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
  }

  .report-form {
    display: flex;
    width: 71%;
  }

  .report-form_wrapper {
    margin-top: 23px;
  }

  .form-block {
    width: 33%;
    margin-right: 33px;
    display: flex;
    flex-direction: column;
  }

  .report-form__title {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 7px;
    letter-spacing: 0.3px;
  }

  .report-form__action {
    text-transform: uppercase;
    outline: none;
    border: 2px solid #CECECE;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 9px 0px 9px 15px;

  }

  .report-form__error {
    color: red;
    margin-left: 10px;
  }

  .btn {
    align-self: flex-end;
    outline: none;
    background: #FFD306;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    padding: 9px 35px 9px 35px;
    outline: none;
  }

  .btn__text {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
    letter-spacing: 0.3px;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .report-form {
      width: 93%;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .create-block {
      align-items: center;
    }
    .report-form {
      flex-direction: column;
    }
    .form-block {
      width: 80%;
      margin: auto;
    }
    .btn {
      margin: auto;
      margin-top: 20px;
    }
    .report-form__title {
      margin-top: 22px;
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    .report-form {
      flex-wrap: wrap;
    }
    .form-block {
      width: 100%;
      margin: 0;
    }
    .create-block {
      align-items: center;
    }
    .create-block__title {
    }
    .btn {
      margin: auto;
      margin-top: 20px;

    }
  }

  @media (min-width: 320px) and (max-width: 575px) {
    .report-form {
      flex-wrap: wrap;
      width: 100%;
    }
    .report-form__title {
      margin-top: 15px;
    }
    .form-block {
      width: 100%;
      margin: 0;
    }

    .create-block {
      align-items: center;
    }
    .create-block__title {
    }
    .btn {
      margin: auto;
      margin-top: 20px;

    }
  }


</style>
