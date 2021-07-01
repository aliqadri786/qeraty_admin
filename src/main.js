import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'jsbarcode/dist/JsBarcode.all.min.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VeeValidate from 'vee-validate'
import store from './store'
import util from './utility/util'
import toast from './services/toast'
import VueHtmlToPaper from 'vue-html-to-paper';
import Navbar from '@/components/Navbar';
import EmptyLayout from '@/components/EmptyLayout';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [

    './assets/printStyle.css',

  ]
}
Vue.component('sidebar_layout', Navbar)
Vue.component('empty_layout', EmptyLayout)

Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
  }
});

Vue.use(VueHtmlToPaper, options);

Vue.use(toast)
Vue.use(util)
Vue.component('v-select', vSelect)

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
})

export const logout = function() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  router.push("/login");
};
export const defaultRoute = function() {
  router.push("/");
};

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
