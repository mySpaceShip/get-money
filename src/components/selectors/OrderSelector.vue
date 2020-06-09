<template>
  <div @click="show = !show" v-click-outside="() => (show = false)" class="selector">
    <button
      :class="{ 'selector__select-btn--active': show }"
      class="selector__select-btn"
    >
      {{ value }}
    </button>
    <div v-if="show">
      <slot />
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  name: "OrderSelector",
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
  },
  data: () => ({
    show: false,
  }),
};
</script>

<style lang="scss" scoped>
$orange: #f2b61a;

.selector {
  position: relative;
  &__select-btn {
    display: flex;
    width: 100%;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    border: 2px solid $orange;
    border-radius: 3px;
    padding: 10px 20px;
    min-height: 41px;
    cursor: unset;
    background: transparent;
    font-size: 14px;
    line-height: 17px;
    color: #5b5e77;
    font-family: "Source Sans Pro", sans-serif;
    outline: none;

    &:after {
      content: "";
      margin: -4px 5px 0 auto;
      border: solid #c6cbd4;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 2px;
      transform: rotate(45deg);
      transition: 0.1s linear;
    }

    &--active:after {
      transform: rotate(-135deg);
      margin-top: 0;
    }
  }
}
</style>
