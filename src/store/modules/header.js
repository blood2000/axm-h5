const store = {
    state: {
		isAndroid: false,
		isiOS: false,
        headerInfo: {},
		statusBarHeight: 0
    },
    getters: {
		
    },
    mutations: {
        getLoginInfo: (state, val) => {
            state.headerInfo = { ...val };
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
        getLoginInfoAction: ({ commit }, val) => {
            commit('getLoginInfo', val)
        },
		getDeviceAction: ({ commit }, val) => {
		    commit('getDevice', val)
		},
		getStatusBarHeightAction: ({ commit }, val) => {
		    commit('getStatusBarHeight', val)
		}
    }
}
export default store