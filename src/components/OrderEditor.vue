<template>
  <div class="order-editor">
    <div class="order-editor__row">
      <div
        :class="{ 'order-editor__field--disabled': $v.minValue.$error }"
        class="order-editor__field"
      >
        <h3>Min</h3>
        <input
          type="number"
          v-model.number="minValue"
          @focus="$v.minValue.$reset"
          @blur="$v.minValue.$touch"
          placeholder="type here some"
        />
        <div class="order-editor__text">
          Integer number for min: {{ min.from }} and max: {{ min.to }}
        </div>
      </div>
      <div class="order-editor__field">
        <h3>Frequency</h3>
        <div class="order-editor__selector">
          <order-selector-payment
            @changeSelect="(selected) => (frequencyValue = selected)"
            :items="frequency"
            :selected="frequency[0]"
          />
        </div>
      </div>
    </div>
    <div class="order-editor__row">
      <div
        class="order-editor__field"
        :class="{ 'order-editor__field--disabled': $v.rateValue.$error }"
      >
        <h3>Rate</h3>
        <input
          type="number"
          v-model.number="rateValue"
          @focus="$v.rateValue.$reset"
          @blur="$v.rateValue.$touch"
          placeholder="type here some"
        />
        <div class="order-editor__text">
          Integer number for min: {{ rate.from }} and max:
          {{ rate.to }}
        </div>
      </div>
      <div
        class="order-editor__field"
        :class="{ 'order-editor__field--disabled': $v.maxValue.$error }"
      >
        <h3>Max</h3>
        <input
          type="number"
          v-model.number="maxValue"
          @focus="$v.maxValue.$reset"
          @blur="$v.maxValue.$touch"
          placeholder="type here some"
        />
        <div class="order-editor__text">
          Integer number for min: {{ max.from }} and max: {{ max.to }}
        </div>
      </div>
    </div>
    <div class="order-editor__btns">
      <router-link to="/" class="order-editor__btn">
        Cancel
      </router-link>
      <button @click="save" class="order-editor__btn">
        Save
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import OrderSelectorPayment from "./selectors/OrderSelectorPayment";
import { required, between, integer } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { uuid } from "uuidv4";

export default {
  name: "OrderEditor",
  components: {
    OrderSelectorPayment,
  },
  data: () => ({
    uuid: null,
    min: {
      from: 1,
      to: 40,
    },
    minValue: null,
    max: {
      from: 50,
      to: 103,
    },
    maxValue: null,
    rate: {
      from: 5,
      to: 100,
    },
    rateValue: null,
    frequency: ["every two weeks", "every month", "by one payment"],
    frequencyValue: "",
    editMode: false,
  }),
  validations() {
    return {
      minValue: {
        required,
        integer,
        between: between(this.min.from, this.min.to),
      },
      maxValue: {
        required,
        integer,
        between: between(this.max.from, this.max.to),
      },
      rateValue: {
        required,
        integer,
        between: between(this.rate.from, this.rate.to),
      },
    };
  },
  created() {
    if (this.$router.history.current.query.id) {
      const idOrderByArray = this.$router.history.current.query.id;
      this.GET_ORDERS();
      const editOrder = this.$store.getters["orders/ORDERS"][idOrderByArray];
      this.uuid = editOrder.id;
      this.minValue = editOrder.min;
      this.maxValue = editOrder.max;
      this.rateValue = editOrder.rate;
      this.frequencyValue = editOrder.frequency;
      this.editMode = true;
    }
  },
  methods: {
    ...mapActions({
      GET_ORDERS: "orders/GET_ORDERS",
      CHANGE_ORDER: "orders/CHANGE_ORDER",
      SEND_ORDER: "orders/SEND_ORDER",
    }),
    async save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const order = {
        id: this.uuid ? this.uuid : uuid(),
        min: this.minValue,
        max: this.maxValue,
        rate: this.rateValue,
        frequency: this.frequencyValue,
      };

      this.editMode ? await this.CHANGE_ORDER(order) 
          : await this.SEND_ORDER(order);

      this.$router.push('/')
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #f2b61a;

.order-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  padding: 100px 30px 30px 37px;
  width: 100%;
  max-width: 1000px;
  border: 1px solid $orange;
  border-radius: 2px;

  &__row {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
    max-width: 660px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin-right: 20px;

    h3 {
      font-weight: 500;
      margin-bottom: 5px;
    }

    input {
      padding: 10px 20px;
      outline: none;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 10px;
      border: 2px solid $orange;
      border-radius: 3px;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }

    &--disabled {
      input {
        border-color: red;
      }
    }
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__btn {
    min-width: 70px;
    padding: 5px 10px;
    color: white;
    background: $orange;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    &:first-child {
      margin-right: 20px;
    }

    &:hover,
    &:active {
      cursor: pointer;
      background: darken($color: $orange, $amount: 6);
    }
  }
}
</style>
