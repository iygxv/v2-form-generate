import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router'

import globalComponent from './components/globalComponents';

Vue.use(ElementUI);
Vue.use(globalComponent);
Vue.use(Router)

new Vue({
  render: h => h(App)
}).$mount('#app')