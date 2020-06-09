<template>
  <div class="pagination">
    <div
      class="pagination__btn"
      :class="{ 'pagination__btn--disable': current <= 1 }"
    >
      <a href="#" @click="changePage(prevPage)">
        Prev
    </a>
    </div>
    <ul>
      <li
        v-for="(page, index) in pages"
        :key="index"
        @click="changePage(page)"
        :class="{ 'pagination__btn--active': current === page }"
      >
        <a href="#">
          {{ page }}
        </a>
      </li>
    </ul>
    <div
      class="pagination__btn"
      :class="{ 'pagination__btn--disable': current >= totalPages }"
    >
      <a href="#" @click="changePage(nextPage)">
        Next
      </a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Pagination",
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
    current: {
      type: Number,
      default: 1,
    },
    pageRange: {
      type: Number,
      default: 2,
    },
  },
  data: () => ({}),
  computed: {
    totalPages() {
      return Math.ceil(
        this.$store.getters["orders/ORDERS"].length / this.perPage
      );
    },
    pages() {
      let pages = [];
      for (let i = this.rangeStart; i <= this.rangeStart + this.pageRange; i++) {
        pages.push(i);
      }
      return pages;
    },
    rangeStart() {
      return this.current - this.pageRange > 0
        ? this.current - this.pageRange
        : 1;
    },
    rangeEnd() {
      return this.current + this.pageRange >= this.totalPages
        ? this.totalPages
        : this.current + this.pageRange;
    },
    nextPage() {
      return this.current >= this.totalPages
        ? this.totalPages
        : this.current + 1;
    },
    prevPage() {
      return this.current <= 1 ? 1 : this.current - 1;
    },
  },
  methods: {
    changePage(page) {
      this.$emit("page-changed", page);
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #f2b61a;

.pagination {
  display: flex;
  align-items: center;

  &__btn {
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

    &--active,
    li {
      background: violet !important;
    }

    &--disable {
      background: #B1B5B6;

      &:hover, &:active {
        background: #B1B5B6;
      }

    }

    a {
      color: white;
      text-decoration: none;
    }
  }

  ul {
    padding-inline-start: unset;
    margin-left: 10px;
    margin-right: 10px;
    list-style: none;
    display: flex;
    align-items: center;

    li {
      margin-left: 5px;
      padding: 5px 10px;
      color: white;
      background: $orange;
      border: none;
      border-radius: 4px;
      outline: none;

      &:first-child {
        margin: 0;
      }

      &:hover,
      &:active {
        cursor: pointer;
        background: darken($color: $orange, $amount: 6);
      }
      a {
        color: white;
        text-decoration: none;
      }
    }
  }

  &__btns {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  &__index {
    margin: 0 8px;
  }
}
</style>
