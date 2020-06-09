import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/components/Auth.vue';
import OrdersTable from '@/components/OrdersTable';
import OrderEditor from '@/components/OrderEditor';


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Auth,
      meta: { login: true },
    },
    {
      path: '/',
      name: 'orders',
      component: OrdersTable,
      meta: { requiresLogin: true },
    },
    {
      path: '/order*',
      name: 'order',
      component: OrderEditor,
      meta: { requiresLogin: true },
    },
  ],
});
