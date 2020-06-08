/*eslint-disable*/

import { getOrders, addOrders, addOrder } from "../../api/orders";

const state = () => ({
  orders: [],
});

const getters = {
  ORDERS: (state) => state.orders,
  PAGINATED_ORDERS: (state) => (firstIndex, lastIndex) => {
    return state.orders.slice(firstIndex, lastIndex);
  },
};

const mutations = {
  SET_ORDERS: (state, orders) => {
    state.orders = orders;
  },
};

const actions = {
  GET_ORDERS: async (context) => {
    const response = await getOrders()
      .then((resolve) => resolve)
      .catch((err) => console.error(err));
    context.commit("SET_ORDERS", response);
  },
  SEND_ORDERS: async (context, orders) => {
    const response = await addOrders(orders)
      .then((resolve) => resolve)
      .catch((err) => console.error(err));
    context.commit("SET_ORDERS", response);
  },
  SEND_ORDER: async (context, order) => {
    const response = await addOrder(order)
      .then((resolve) => resolve)
      .catch((err) => console.error(err));
    context.commit("SET_ORDERS", response);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
