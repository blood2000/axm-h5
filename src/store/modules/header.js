const store = {
    state: {
        headerInfo: {a: 123}
    },
    getters: {
		
    },
    mutations: {
        getLoginInfo: (state, val) => {
            state.headerInfo = { ...val };
        }
    },
    actions: {
        getLoginInfoAction: ({ commit }, val) => {
            commit('getLoginInfo', val)
        }
    }
}
export default store