/*eslint-disable*/

import { getOrders, addOrders } from '../../api/orders';

const state = () => ({
  orders: [],
});

const getters = {
  ORDERS: state => state.orders,
  PAGINATED_ORDERS: state => (currIndex, lastIndex) => {
    return state.orders.slice(currIndex, lastIndex)
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
      .then(resolve => resolve)
      .catch(err => console.error(err));
    context.commit('SET_ORDERS', response);
  },
  SEND_ORDERS: async (context, orders) => {
    const response = await addOrders(orders)
      .then(resolve => resolve)
      .catch(err => console.error(err));
      console.log(response);
      
    context.commit('SET_ORDERS', response);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
