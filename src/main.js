import Vue from 'vue'
import App from './App'
import './common/css/icon.scss'
//引入vuex
import store from './store'
//与app桥接
import './config/bridge.js'

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
