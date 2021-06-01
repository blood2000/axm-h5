import uniRequest from "uni-request";
import store from '../store';

// 全局配置
uniRequest.defaults.baseURL = process.env.VUE_APP_BASE_API;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
uniRequest.interceptors.request.use(
	config => {
		// header添加其他信息
		config.headers['Produce-Code'] = '776ca8e240574192b6e0f69b417163df';
		config.headers['App-Code'] = '9d3017728cb34eac947ba350c4e997be';
		config.headers['App-Type'] = '1';
		config.headers['App-Version'] = '2.0';
		config.headers['Terminal-Type'] = 'app';
		// config.headers['Produce-Code'] = store.state.header.headerInfo['Produce-Code'];
		// config.headers['App-Code'] = store.state.header.headerInfo['App-Code'];
		// config.headers['App-Type'] = store.state.header.headerInfo['App-Type'];
		// config.headers['App-Version'] = store.state.header.headerInfo['App-Version'];
		// config.headers['Terminal-Type'] = store.state.header.headerInfo['Terminal-Type'];
		// 请求携带token
		config.headers['Authorization'] = '227dac58-76fa-45a9-94ff-af5e4156c8fa'; // token先写死
		//config.headers['Authorization'] = store.state.header.headerInfo['Authorization'];
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
