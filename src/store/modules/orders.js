
import {
  getOrders,
  addOrders,
  addOrder,
  deleteOrder,
  changeOrder,
} from "../../api/orders";
import _ from "lodash";

const state = () => ({
  orders: [],
  order: {},
});

const getters = {
  ORDER: (state) => state.order,
  ORDERS: (state) => state.orders,
  PAGINATED_ORDERS: (state) => (firstIndex, lastIndex) => {
    return state.orders.slice(firstIndex, lastIndex);
  },
};
const mutations = {
  SET_ORDERS: (state, orders) => {
    state.orders = orders;
    localStorage.setItem("orders", JSON.stringify(orders));
  },
};
const actions = {
  GET_ORDERS: async (context) => {
    let response = [];
    if (localStorage.getItem("orders")) {
      response = JSON.parse(localStorage.getItem("orders"));
    } else {
      response = await getOrders()
        .then((resolve) => resolve)
        .catch((err) => console.error(err));
    }
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
  /*eslint-disable*/
  DELETE_ORDER: async (context, mathcOrder) => {
    const response = await deleteOrder()
      .then((resolve) => resolve)
      .catch((err) => console.error(err));
    const orders = _.remove(
      context.state.orders,
      (order) => order.id !== mathcOrder.id
    );
    context.commit("SET_ORDERS", orders);
  },
  CHANGE_ORDER: async (context, mathcOrder) => {
    /*eslint-disable*/
    const response = await changeOrder()
      .then((resolve) => resolve)
      .catch((err) => console.error(err));
    const orders = context.state.orders.map((item) =>
      item.id == mathcOrder.id ? mathcOrder : item
    );
    context.commit("SET_ORDERS", orders);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
