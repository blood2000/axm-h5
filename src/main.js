import Vue from 'vue'
import App from './App'
import './common/css/index.scss'
import './common/css/common.scss'
//引入vuex
import store from './store'
//与app桥接
import './config/bridge.js'
//自定义指令
import './directive'
import {
	parseTime,
	numberFormat,
	numberFormatUnit
} from './utils/ddc.js';
//复制到剪贴板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import {
	VueJsonp
} from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
})
Vue.prototype.parseTime = parseTime;
Vue.prototype.numberFormat = numberFormat;
Vue.prototype.numberFormatUnit = numberFormatUnit;
Vue.prototype.$store = store;
Vue.config.productionTip = false;

App.mpType = 'app'


// 高德地图vue组件库
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: '2066cb0dafaa492aee47fa1090227a38', // 高德企业key
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.Driving', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Marker','AMap.CitySearch','AMap.Geocoder'],
//   v: '1.4.4',
//   uiVersion: '1.1.1'
// });
import VueAMap from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
	key: '2066cb0dafaa492aee47fa1090227a38'
});

const app = new Vue({
	...App,
	store
})
app.$mount()
