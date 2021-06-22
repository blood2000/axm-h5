import uniRequest from "../request.js";

// 获取加油站品牌
export function getGasStationList(query, config) {
  return uniRequest({
    url: '/transportation/petrolStation/getPetrolStationInfo',
    method: 'get',
	data: query,
	headers: config
  });
}

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
	data: data,
	headers: {
		...config,
		'Content-Type': 'application/json'
	}
  });
}

// 获取车辆列表
export function getVehicleList(driverCode, config) {
  return uniRequest({
    url: '/assets/vehicle/list',
    method: 'get',
	data: {
		driverCode: driverCode
	},
	headers: config
  });
}
