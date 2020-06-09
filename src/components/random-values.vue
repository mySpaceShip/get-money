<template>
  <div class="random">
    <input v-model.number="quantaty" type="number" />
    <button @click="generate" class="random__btn">
      Generate random values
    </button>
  </div>
</template>

<script>
import {uuid} from 'uuidv4'
import { mapActions } from 'vuex'

export default {
  name: "RandomValues",
  data: () => ({
    quantaty: 1,
  }),
  methods: {
    ...mapActions({
      SEND_ORDERS: 'orders/SEND_ORDERS'
    }),
    generate() {
      const mins = [1, 5, 10, 15, 20, 30, 40]
      const maxs = [50, 60, 80, 100, 101, 102, 103]
      const rates = [20, 15, 40, 80, 100, 5, 9]
      const frequencies = ['every two weeks', 'every month', 'by one payment']

      const orders = new Array(this.quantaty).fill().map(() => ({
        id: uuid(),
        min: mins[Math.floor(Math.random() * mins.length)],
        max: maxs[Math.floor(Math.random() * maxs.length)],
        rate: rates[Math.floor(Math.random() * rates.length)],
        frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      }))
      this.SEND_ORDERS(orders)
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #f2b61a;
.random {
  display: flex;
  align-items: center;

  input {
    outline: none;
    border: none;
    border-bottom: 1px solid $orange;
    max-width: 40px;
    margin-right: 20px;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  &__btn {
    padding: 5px 10px;
    color: white;
    background: $orange;
    border: none;
    border-radius: 4px;
    outline: none;

    &:hover, &:active {
      cursor: pointer;
      background: darken($color: $orange, $amount: 6);
    }
  }
}
</style>
