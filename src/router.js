import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/components/Autocode/Auth.vue';
import report from '@/components/Autocode/Report.vue';

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
      name: 'report',
      component: report,
      meta: { requiresLogin: true },
    },
  ],
});
