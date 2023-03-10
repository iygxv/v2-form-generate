import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import globalComponent from './components/globalComponents';

Vue.use(ElementUI);
Vue.use(globalComponent);

new Vue({
  render: h => h(App)
}).$mount('#app')