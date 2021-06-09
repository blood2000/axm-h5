import uniRequest from "../request.js";

// 首页数据统计
export function getStatisticData(timeType, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/headStatistics',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 首页运输统计
export function getTransportData(timeType, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/transportStatistics',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 首页运费统计
export function getPeeData(timeType, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/shippingStatistics',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 首页用车统计
export function getCarData(timeType, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/carStatistics',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}
