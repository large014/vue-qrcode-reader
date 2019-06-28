import Vue from 'vue'
import App from './App.vue'
// import VueCameraSwitch from './assets/js/VueCameraSwitch.js'

Vue.config.productionTip = false
// Vue.use(VueCameraSwitch, { addIndicators: true })

new Vue({
  render: h => h(App),
}).$mount('#app')
