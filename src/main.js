import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';
import VueMask from 'v-mask'
import { VueMaskDirective } from 'v-mask'

Vue.directive('mask', VueMaskDirective);
Vue.use(VueMask);
/*eslint-disable*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
