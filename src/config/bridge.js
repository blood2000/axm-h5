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
	let params = {a: 123};
	// OC调JS，需要给OC调用的函数必须写在这个函数里面
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.registerHandler('testJSFunction', function(data, responseCallback) {
			responseCallback('js执行过了');
		})
	})
	setTimeout(() => {
		WebViewJavascriptBridge.callHandler('getLoginUserInfo',params,function(response) {
			uni.showToast({
				title: '获取ios传过来数据: ' + JSON.stringify(response),
				icon: 'none',
				duration: 2000
			});
			setHeaderParams(response);
		});
	}, 0)
}

// Android
if (isAndroid) {
	if(window.Android !== null && typeof(window.Android) !== 'undefined') {
		const test = window.Android.callAndroid('hello!');
		uni.showToast({
			title: '获取android传过来数据:' + JSON.stringify(test),
			icon: 'none',
			duration: 2000
		});
	}
}
// 获取android传过来得数据
export const androidroidInfo = function(response){
	uni.showToast({
		title: '获取android传过来数据:' + JSON.stringify(response),
		icon: 'none',
		duration: 2000
	});
	setHeaderParams(response);
}


// 存到vuex
function setHeaderParams(response) {
	store.dispatch('getLoginInfoAction', response)
}
