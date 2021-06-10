const cancelRequest = {
    state: {
        cancelTokenArr: [] // 取消请求token数组
    },
    mutations: {
        pushToken(state, payload) {
            state.cancelTokenArr.push(payload.cancelToken)
        },
        clearToken({ cancelTokenArr }) {
            cancelTokenArr.forEach(item => {
            	//取消后会传一个{message: 499}对象下去自己在拦截器里那里做下过滤
                item(499)
            })
            cancelTokenArr = [];
        }
    }
}

export default cancelRequest