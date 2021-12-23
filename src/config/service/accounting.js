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
