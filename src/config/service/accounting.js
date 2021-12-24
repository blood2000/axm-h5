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

// 核算规则分页
export function getAccountingList(config) {
  return uniRequest({
    url: '/transportation/ruleInfoShipment-app/list',
    method: 'get',
	headers: config
  });
}

// 删除规则
export function deleteAccounting(code, config) {
  return uniRequest({
    url: '/transportation/ruleInfoShipment-app/delete',
    method: 'delete',
	data: {
		code: code
	},
	headers: config
  });
}

// 修改默认规则选项
export function updateAccountingIsDefault(code, isDefault, config) {
  return uniRequest({
    url: '/transportation/ruleInfoShipment-app/updateIsDefault',
    method: 'put',
	data: {
		code: code,
		isDefault: isDefault,
	},
	headers: {
	...config,
	'Content-Type': 'application/json'
	}
  });
}