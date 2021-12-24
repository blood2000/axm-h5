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

// 核算规则分页
export function getAccountingList(config) {
  return uniRequest({
    url: '/transportation/ruleInfoShipment-app/list',
    method: 'get',
	headers: config
  });
}

// 删除规则
export function getDeleteAccounting(ruleType, config) {
  return uniRequest({
    url: '/transportation/ruleInfoShipment-app/delete',
    method: 'delete',
	data: {
		ruleType: ruleType
	},
	headers: config
  });
}