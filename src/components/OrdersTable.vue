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
          <pagination
            :current="pageSettings.currPage"
            :pageRange="3"
            @page-changed="(page) => (pageSettings.currPage = page)"
          />
        </div>
      </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div
          v-for="(title, index) in titles"
          :key="index"
          class="table-header__item"
          :class="{
            'table-header__item--active': title.type === activeTitle,
            'table-header__item--low': title.sortMax,
          }"
        >
          <h2 @click="selectTitle(title.type, index)" class="table-header__title">
            {{ title.type | singBy }}
          </h2>
          <span @click="sortOrders(title.type, title.sortMax, index)"> &#8593; </span>
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
    activeTitle: "",
    titleId: 0,
    orders: [],
    titles: [],
    paginatedOrders: [],
    pageSettings: {
      pages: [10, 20, 15, 5, 4, 3, 2, 17],
      perPage: 10,
      currPage: 1,
    },
  }),
  computed: {
    ordersList() {
      const firstIndex =
        (this.pageSettings.currPage - 1) * this.pageSettings.perPage;
      const lastIndex = firstIndex + this.pageSettings.perPage;
      let items = this.PAGINATED_ORDERS()(firstIndex, lastIndex);
      if (this.activeTitle !== '' && this.titles.length > 0) {
        items = this.titles[this.titleId].sortMax
            ? _.orderBy(items, [this.titles[this.titleId].type], ["desc"])
            : _.orderBy(items, [this.titles[this.titleId].type], ["asc"]);
      }
      return items;
    },
  },
  async created() {
    await this.GET_ORDERS();
    this.orders = await this.ORDERS();
    this.setTitles()
  },
  methods: {
    ...mapGetters({
      ORDERS: "orders/ORDERS",
      PAGINATED_ORDERS: "orders/PAGINATED_ORDERS",
    }),
    ...mapActions({
      GET_ORDERS: "orders/GET_ORDERS",
    }),
    setTitles() {
      if (this.orders[0]) {
        this.titles = Object.keys(this.orders[0]);
        this.titles = this.titles
          .filter((el) => el !== "id")
          .map((el) => {
            return { type: el, sortMax: false };
          });
      }
    },
    selectTitle(title, id) {
      this.titleId = id
      this.activeTitle = title === this.activeTitle ? "" : title;
    },
    sortOrders(title, sortMax, id) {
      this.titles[id].sortMax = !this.titles[id].sortMax
      if (this.activeTitle != title) {
        this.titles[id].sortMax = false
      } 
    }
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
        cursor: pointer;
        line-height: 29px;
        font-size: 26px;
        margin-right: 5px;
        color: #282136;
        text-transform: capitalize;
        font-weight: 500;
      }

      span {
        cursor: pointer;
      }

      &--active {
        h2 {
          color: $orange;
        }
      }

      &--low {
        span {
          transform: rotate(180deg);
        }
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
}
</style>

<style lang="scss">
.popup {
  max-width: 254px;
  left: 0;
  top: 60px;
}
</style>
