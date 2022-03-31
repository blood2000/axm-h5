const store = {
	state: {
		isAndroid: false,
		isiOS: false,
		headerInfo: {
			// "Authorization": "b93f2253-ad5d-4323-8d4c-8d0da1b6bfb0",
			// "App-Type": "2",
			// "App-Code": "80bb50e40895928e2dc0d101350a25d0",
			// "Terminal-Type": "app",
			// "App-Version": "2.1.13",
			// "Produce-Code": "776ca8e240574192b6e0f69b417163df",
			// "statusBarHeight": 0,
			// "role-type": 2
		},
		statusBarHeight: 0
	},
	getters: {

	},
	mutations: {
		getLoginInfo: (state, val) => {
			state.headerInfo = {
				...val
			};
		},
		getDevice: (state, val) => {
			if (val === 'isAndroid') {
				state.isAndroid = true;
				state.isiOS = false;
			} else if (val === 'isiOS') {
				state.isAndroid = false;
				state.isiOS = true;
			}
		},
		getStatusBarHeight: (state, val) => {
			state.statusBarHeight = val || 0;
		}
	},
	actions: {
		getLoginInfoAction: ({
			commit
		}, val) => {
			commit('getLoginInfo', val)
		},
		getDeviceAction: ({
			commit
		}, val) => {
			commit('getDevice', val)
		},
		getStatusBarHeightAction: ({
			commit
		}, val) => {
			commit('getStatusBarHeight', val)
		}
	}
}
export default store