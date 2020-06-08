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

    
    <div
      @click="opened = true"
      class="table-row__delete-block"
    >
      <img src="../../public/images/rubbish-bin.svg" />
      <span>delete</span>
      <popup
        class="table-row__popup"
      >
        <p>Are you sure you want to <strong>delete item?</strong></p>
      </popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Popup from "./popup";

export default {
  name: 'TableRowOrders',
  components: {
    Popup,
  },
  props: {
    id: {
      type: String,
      default: '-1',
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
      type: Number,
      default: 0,
    },
  },
  data: () => ({
  }),
  computed: {
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style lang="scss">
.table-row {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 18px 22px 17px 37px;
  box-sizing: border-box;

  &:hover {
    .table-row__delete-block {
      opacity: 1;
    }
  }

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

  &__delete-block {
    position: absolute;
    display: flex;
    align-items: center;
    right: 33px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 1;
    z-index: 5;

    span {
      font-size: 14px;
      color: #5b5e77;
    }

    img {
      width: 12px;
      height: 16px;
      margin-right: 6px;
    }
  }

  &__popup {
    p {
      white-space: nowrap;
    }
  }
}
</style>
