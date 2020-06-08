<template>
  <div class="table__wrapper">
    <div class="table__panel">
      <h1 class="table__title">
        get you money right now
      </h1>
      <div class="table__add-block">
        <div class="table__generate">
          <random-values />
        </div>
        <!-- will be router link for new component -->
        <button class="table__add-btn">
          Add
        </button>
        <div class="table__pagination">
          <pagination />
        </div>
      </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div
          v-for="(title, index) in titles"
          :key="index"
          @click="selectTitle"
          :class="{ 'table-header__title--active': activeTitle === title }"
          class="table-header__item"
        >
          <h2 class="table-header__title">
            {{ title | singBy }}
          </h2>
          <span> &#8593; </span>
        </div>
      </div>
      <div class="table__rows">
        <div v-for="order in ordersList" :key="order.id" class="table__row">
          <row
            :id="order.id"
            :min="order.min"
            :max="order.max"
            :rate="order.rate"
            :frequency="order.frequency"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import RandomValues from "./random-values";
import Pagination from "./Pagination";
import Row from "./OrdersTableRow";
import Popup from "./popup";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "OrdersTable",
  components: {
    RandomValues,
    Pagination,
    Row,
    Popup,
  },
  filters: {
    singBy(val) {
      const sign = "(%)";
      val = val === "rate" ? val + " " + sign : val;
      return val;
    },
  },
  data: () => ({
    activeTitle: "min",
    orders: [],
    paginatedOrders: [],
    pageSettings: {
      pages: [10, 20, 15, 5, 4, 3, 2, 17],
      perPage: 10,
      currPage: 1,
      firstIndex: 0,
      lastIndex: 10,
    },
    titles: ["min", "max", "rate", "frequency"],
    sortMax: true,
  }),
  computed: {
    ordersList() {
      return this.PAGINATED_ORDERS(0, 10)();
    },
    orderTitles() {
      const titles = Object.keys(this.orders[0]);
      return this.orders;
    },
  },
  async created() {
    await this.GET_ORDERS();
    this.orders = await this.ORDERS();
  },
  methods: {
    ...mapGetters({
      ORDERS: "orders/ORDERS",
      PAGINATED_ORDERS: "orders/PAGINATED_ORDERS",
    }),
    ...mapActions({
      GET_ORDERS: "orders/GET_ORDERS",
    }),
    selectTitle() {
      this.sele;
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #f2b61a;

.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 0 0;
  border-top: 1px solid #ededed;

  &__wrapper {
    position: relative;
    width: 100%;
    max-width: 1140px;
    padding: 60px 30px 0 0;
  }

  &__panel {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    text-transform: capitalize;
    text-align: left;
    margin-right: 20px;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }

  &__add {
    &-block {
      display: flex;
      align-items: center;
    }

    &-btn {
      min-width: 70px;
      padding: 5px 10px;
      color: white;
      background: $orange;
      border: none;
      border-radius: 4px;
      outline: none;

      &:hover,
      &:active {
        cursor: pointer;
        background: darken($color: $orange, $amount: 6);
      }
    }
  }

  &__generate {
    margin-right: 20px;
  }

  &-header {
    display: flex;
    align-items: center;
    padding: 0 0 16px 37px;
    width: 100%;
    border-bottom: 1px solid #ededed;

    &__item {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 150px;

      h2 {
        line-height: 29px;
        font-size: 26px;
        margin-right: 5px;
        color: #282136;
        text-transform: capitalize;
        font-weight: 500;
      }
    }
  }

  &__rows {
    width: 100%;
  }

  &__row {
    &:hover,
    &:active {
      cursor: pointer;
      background: rgba(0, 161, 30, 0.07) !important;
    }

    &:nth-child(even) {
      background: #f8f9fa;
    }
  }
  &-checkbox {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: 14px;
    line-height: 24px;
    user-select: none;
    color: #5b5e77;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    &--active {
      &.table-checkbox__checkmark {
        background-color: #00a11e;
      }
      &.table-checkbox__checkmark:after {
        display: block;
      }
    }

    &__checkmark {
      display: block;
      flex-shrink: 0;
      margin-right: 8px;
      height: 14px;
      width: 14px;
      background-color: white;
      border: 1px solid #d5dae0;
      border-radius: 2px;
      &::after {
        content: "";
        position: absolute;
        left: 6px;
        top: 3px;
        width: 4px;
        height: 7px;
        border: solid white;
        border-width: 0 1px 1px 0;
        transform: rotate(45deg);
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.popup {
  max-width: 254px;
  left: 0;
  top: 60px;
}
</style>
