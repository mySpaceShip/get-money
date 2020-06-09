import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!JSON.parse(localStorage.getItem('auth'))) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  }
  if (to.matched.some(record => record.meta.login)) {
    if (JSON.parse(localStorage.getItem('auth'))) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
