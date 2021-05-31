import uniRequest from "uni-request";

// 全局配置
uniRequest.defaults.baseURL = process.env.VUE_APP_BASE_API;
// uniRequest.defaults.headers.common['Authorization'] = AUTH_TOKEN;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 获取app请求头数据
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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
	console.log('这是IOS');
	let params = {};
	//这也是固定的， OC 调JS ， 需要给OC调用的函数必须写在这个函数里面
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.registerHandler('testJSFunction', function(data, responseCallback) {
			alert('JS方法被调用:'+data);
			responseCallback('js执行过了');
		})
	})
	WebViewJavascriptBridge.callHandler('getLoginUserInfo',params,function(response) {
		console.log(response);
	});
}
// Android
if (isAndroid) {
	console.log('这是Android');
	let params = {};
	if(Android){
		Android.getLoginUserInfo(params);
	}	
}   

// 请求拦截
uniRequest.interceptors.request.use(
	config => {
		// header添加其他信息
		config.headers['Produce-Code'] = '776ca8e240574192b6e0f69b417163df';
		config.headers['App-Code'] = '9d3017728cb34eac947ba350c4e997be';
		config.headers['App-Type'] = '1';
		config.headers['App-Version'] = '2.0';
		config.headers['Terminal-Type'] = 'app';
		// 请求携带token
		config.headers['Authorization'] = 'b41df53c-81f8-4294-9f2d-2c8750988270'; // token先写死
		return config;
	},
	err => {
		console.log('请求失败');
		return Promise.reject(err);
	}
);

// 响应拦截
uniRequest.interceptors.response.use(
	res => {
		const code = res.data.code || 200;
		const msg = res.data.msg || '系统未知错误,请反馈给管理员';
		if (code === 401) {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			});
			return Promise.reject(new Error(msg));
		} else if (code === 500) {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			});
			return Promise.reject(new Error(msg));
		} else if (code !== 200) {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			});
			return Promise.reject('error');
		} else {
			return res.data;
		}
		return Promise.resolve(response);
	},
	error => {
		return Promise.reject(error);
	}
);

export default uniRequest;
