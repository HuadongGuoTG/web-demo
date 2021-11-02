import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import formCreate from '@form-create/element-ui'
import App from './App.vue'
import router from './router'

Vue.use(ElementUI)
Vue.use(formCreate)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
