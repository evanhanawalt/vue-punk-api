import Vue from 'vue'
import App from './App.vue'
import VueSpinners from 'vue-spinners'
import VModal from 'vue-js-modal'

Vue.use(VueSpinners)
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
