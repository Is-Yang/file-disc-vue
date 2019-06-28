import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import './assets/css/common.css';
import {
  Toast,
  Dialog 
} from 'vant';

import component from './components/index'
import host from './host'

Vue.use(Vant);
Vue.use(Toast);
Vue.use(Dialog);
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$host = host;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()

Vue.config.productionTip = false

// 注册全局组件
Object.keys(component).forEach(key => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()); // 首字母大写
  Vue.component(`${name}`, component[key]);
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')