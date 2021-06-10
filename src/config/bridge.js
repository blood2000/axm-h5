import store from '../store';
import Vue from 'vue'

// 判断 androida or ios
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

// 这是必须要写的，用来初始化一些设置
function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

function iosPromise() {
	return new Promise((resolve, reject) => {
		// OC调JS，需要给OC调用的函数必须写在这个函数里面
		setupWebViewJavascriptBridge(function(bridge) {
			bridge.registerHandler('testJSFunction', function(data, responseCallback) {
				responseCallback('js执行过了');
			})
			resolve();
		})
	})
}

// ios
if (isiOS) {
	setDevice('isiOS');
	let params = {a: 123};
	iosPromise().then(() => {
		Vue.prototype.$WebViewJavascriptBridge = WebViewJavascriptBridge;
		WebViewJavascriptBridge.callHandler('getLoginUserInfo',params,function(response) {
			saveAppParams(response);
		});
	})
}

// Android
if (isAndroid) {
	setDevice('isAndroid');
	if(window.Android !== null && typeof(window.Android) !== 'undefined') {
		const test = window.Android.callAndroid('hello!');
		saveAppParams(JSON.parse(test));
	}
}

// 存到vuex
function saveAppParams(response) {
	store.dispatch('getLoginInfoAction', {
		'Produce-Code': response['Produce-Code'],
		'App-Code': response['App-Code'],
		'App-Type': response['App-Type'],
		'App-Version': response['App-Version'],
		'Terminal-Type': response['Terminal-Type'],
		'Authorization': response['Authorization'],
		'role-type': response['role-type']
	});
	store.dispatch('getStatusBarHeightAction', response['statusBarHeight']);
}
function setDevice(val) {
	store.dispatch('getDeviceAction', val);
}

// 前端开发测试使用 - 货主
// setTimeout(() => {
// 	saveAppParams({
// 		"Authorization":"7db9b30f-29f5-4de9-92b9-a82b3be9c167",
// 		"App-Type":"1",
// 		"App-Code":"9d3017728cb34eac947ba350c4e997be",
// 		"Terminal-Type":"app",
// 		"App-Version":"2.0",
// 		"Produce-Code":"776ca8e240574192b6e0f69b417163df",
// 		"statusBarHeight": 0,
// 		"role-type":3
// 	})
// }, 0)

// 前端开发测试使用 - 司机
// setTimeout(() => {
// 	saveAppParams({
// 		"Authorization":"a35128de-f268-456e-ab51-119112f87011",
// 		"App-Type":"1",
// 		"App-Code":"3f78fbfc13b14fa4b3d78665124ef4bb",
// 		"Terminal-Type":"app",
// 		"App-Version":"2.0",
// 		"Produce-Code":"776ca8e240574192b6e0f69b417163df",
// 		"statusBarHeight": 0,
// 		"role-type":2
// 	})
// }, 0)

// 前端开发测试使用 - 调度者
// setTimeout(() => {
// 	saveAppParams({
// 		"Authorization":"5e318a8c-cf1f-49b3-b677-187f54ca7feb",
// 		"App-Type":"1",
// 		"App-Code":"3f78fbfc13b14fa4b3d78665124ef4bb",
// 		"Terminal-Type":"app",
// 		"App-Version":"2.0",
// 		"Produce-Code":"776ca8e240574192b6e0f69b417163df",
// 		"statusBarHeight": 0,
// 		"role-type":1
// 	})
// }, 0)
