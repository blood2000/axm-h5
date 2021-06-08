import store from '../store';

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

// 前端开发测试使用
// setTimeout(() => {
// 	saveAppParams({
// 		"Authorization":"e2b040a9-1e0a-42e3-939e-fb8df0d10436",
// 		"App-Type":"1",
// 		"App-Code":"9d3017728cb34eac947ba350c4e997be",
// 		"Terminal-Type":"app",
// 		"App-Version":"2.0",
// 		"Produce-Code":"776ca8e240574192b6e0f69b417163df",
// 		"statusBarHeight": 0,
// 		"role-type":3
// 	})
// }, 0)
