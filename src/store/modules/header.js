const store = {
    state: {
		isAndroid: false,
		isiOS: false,
        headerInfo: {}
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
        }
    },
    actions: {
        getLoginInfoAction: ({ commit }, val) => {
            commit('getLoginInfo', val)
        },
		getDeviceAction: ({ commit }, val) => {
		    commit('getDevice', val)
		},
    }
}
export default store