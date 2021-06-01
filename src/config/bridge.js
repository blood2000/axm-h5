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

// ios
if (isiOS) {
	setDevice('isiOS');
	let params = {a: 123};
	// OC调JS，需要给OC调用的函数必须写在这个函数里面
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.registerHandler('testJSFunction', function(data, responseCallback) {
			responseCallback('js执行过了');
		})
	})
	setTimeout(() => {
		WebViewJavascriptBridge.callHandler('getLoginUserInfo',params,function(response) {
			// setHeaderParams(response);
			setSessionStorage(response);
		});
	}, 0)
}

// Android
if (isAndroid) {
	setDevice('isAndroid');
	if(window.Android !== null && typeof(window.Android) !== 'undefined') {
		const test = window.Android.callAndroid('hello!');
		// setHeaderParams(JSON.parse(test));
		setSessionStorage(JSON.parse(test))
	}
}

// 存到vuex
function setHeaderParams(response) {
	store.dispatch('getLoginInfoAction', response);
}
function setDevice(val) {
	store.dispatch('getDeviceAction', val);
}
// 存到sessionStorage
function setSessionStorage(val) {
	window.sessionStorage.setItem('header', JSON.stringify(val));
}

// 前端开发测试使用
// setTimeout(() => {
// 	setSessionStorage({
// 		'Produce-Code': '776ca8e240574192b6e0f69b417163df',
// 		'App-Code': '9d3017728cb34eac947ba350c4e997be',
// 		'App-Type': '1',
// 		'App-Version': '2.0',
// 		'Terminal-Type': 'app',
// 		'Authorization': 'c1e7393d-bd3a-4393-888f-3f8c90d9a4ae'
// 	})
// }, 0)
