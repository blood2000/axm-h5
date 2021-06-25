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
export function getContractByCode(orderCode, config) {
  return uniRequest({
    url: '/transportation/orderContract/replace/' + orderCode,
    method: 'get',
	headers: config
  });
}
