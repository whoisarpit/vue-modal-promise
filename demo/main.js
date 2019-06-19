import Vue from 'vue';
import App from './Demo.vue';
import ShowModal from '../src';


Vue.config.productionTip = false;

Vue.use(ShowModal);

new Vue({
  render: h => h(App),
}).$mount('#app');
