<template>
  <div class="table-row">
    <div class="table-row__item">
      {{ min }}
    </div>
    <div class="table-row__item">
      {{ max }}
    </div>
    <div class="table-row__item">
      {{ rate }}
    </div>
    <div class="table-row__item">
      {{ frequency }}
    </div>
    <div class="table-row__btns">
      <button @click="deleteOrder()">delete</button>
      <button @click="setEditedOrder">
        edit
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";

export default {
  name: "TableRowOrders",
  props: {
    id: {
      type: String,
      default: "-1",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      default: 0,
    },
    frequency: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      DELETE_ORDER: "orders/DELETE_ORDER",
    }),
    async deleteOrder() {
      await this.DELETE_ORDER({
        id: this.id,
        min: this.min,
        max: this.max,
        rate: this.rate,
        frequency: this.frequency,
      });
    },
    setEditedOrder() {
      const orders = this.$store.getters["orders/ORDERS"];
      const orderIdByArray = orders.findIndex((el) => el.id === this.id);
      window.open("/order?id=" + `${orderIdByArray}`, "_blank");
    },
  },
};
</script>

<style lang="scss">
$blue: #409cff;
$orange: #f2b61a;


.table-row {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 18px 22px 17px 37px;
  box-sizing: border-box;

  &__item {
    margin-right: 5px;
    font-size: 18px;
    width: 100%;
    max-width: 145px;
    &--lg {
      width: 100%;
      max-width: 200px;
    }
  }

  &__checkbox {
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
      top: 50%;
      margin-top: -19%;
      width: 4px;
      height: 7px;
      border: solid white;
      border-width: 0 1px 1px 0;
      transform: rotate(45deg);
    }

    &--active {
      &.table-row__checkmark {
        background-color: #00a11e;
      }
      &.table-row:after {
        display: block;
      }
    }
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 73px;
    max-width: 163px;
    width: 100%;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 70px;
      padding: 5px 10px;
      color: white;
      background: $blue;
      border: none;
      border-radius: 4px;
      outline: none;
      text-decoration: none;

      &:hover,
      &:active {
        cursor: pointer;
        background: darken($color: $orange, $amount: 6);
      }
    }
  }
}
</style>
