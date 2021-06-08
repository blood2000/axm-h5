import Vue from 'vue'
import App from './App'
import './common/css/index.scss'
//引入vuex
import store from './store'
//与app桥接
import './config/bridge.js'
//自定义指令
import './directive'

Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
})

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
