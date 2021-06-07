import uniRequest from "../request.js";

// 代收协议
export function getCollection(data, config) {
  return uniRequest({
    url: 'assets/driver/agreement/replaceData',
    method: 'get',
    data: data,
	headers: config
  });
}

// 运输合同-货主/司机
export function getContractByCode(code, config) {
  return uniRequest({
    url: '/transportation/orderContract/' + code,
    method: 'get',
	headers: config
  });
}
