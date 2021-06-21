import uniRequest from "../request.js";

// 获取加油站品牌
export function getBrandList(config) {
  return uniRequest({
    url: '/transportation/petrolStation/getBrandList',
    method: 'get',
	headers: config
  });
}

// 获取加油站油类
export function getOilsList(config) {
  return uniRequest({
    url: '/transportation/petrolStation/getOilsList',
    method: 'get',
	headers: config
  });
}

// 获取加油站油类
export function getDriver(userCode, config) {
  return uniRequest({
    url: '/assets/driver/getDriverByUserCode/' + userCode,
    method: 'get',
	headers: config
  });
}

// 获取付款二维码
export function getRefuelInfo(data, config) {
  return uniRequest({
    url: '/iot/nucarf/getRefuelInfo',
    method: 'post',
	headers: config,
	data: data
  });
}