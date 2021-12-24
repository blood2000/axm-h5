import uniRequest from "../request.js";

// 核算规则获取项目
export function getAccountingProjectList(ruleType, config) {
	return uniRequest({
		url: '/transportation/ruleItem/list',
		method: 'get',
		data: {
			ruleType: ruleType
		},
		headers: config
	});
}

// 获取字典
export function getDict(dictType, config) {
	return uniRequest({
		url: '/system/dict/data/listByDict',
		method: 'post',
		params: {
			dictType: dictType,
			dictPid: 0,
		},
		headers: config
	});
}
