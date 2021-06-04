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
