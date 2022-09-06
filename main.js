import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// VUEX
import store from './store'
Vue.prototype.$store = store
//API
import api from './common/api/api.js';
Vue.prototype.$api = api
//通用头部标题栏
import Navigation from './pages/navigation/navigation.vue'
Vue.component('Navigation',Navigation)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
