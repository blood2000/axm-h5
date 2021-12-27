import uniRequest from "uni-request";
import store from '../store';

// 全局配置
uniRequest.defaults.baseURL = process.env.VUE_APP_BASE_API;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
//const headerInfo = store.state.header.headerInfo;
uniRequest.interceptors.request.use(
	config => {
		// header添加其他信息
		//config.headers['Produce-Code'] = headerInfo['Produce-Code'];
		//config.headers['App-Code'] = headerInfo['App-Code'];
		//config.headers['App-Type'] = headerInfo['App-Type'];
		//config.headers['App-Version'] = headerInfo['App-Version'];
		//config.headers['Terminal-Type'] = headerInfo['Terminal-Type'];
		// 请求携带token
		//config.headers['Authorization'] = headerInfo['Authorization'];
		if(config.data && config.data.isArrayQuery){
			if (config.data.isArrayQuery) {
				try{
					config.data = JSON.parse(config.data.isArrayQuery)
				}catch(e){
					//TODO handle the exception
				}
			}
		}
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
			return
			// uni.showToast({
			// 	title: msg,
			// 	icon: 'none',
			// 	duration: 2000
			// });
			// return Promise.reject(new Error(msg));
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
