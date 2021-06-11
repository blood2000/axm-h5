import uniRequest from "../request.js";

// 首页数据统计
export function getStatisticData(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryStatisticsData',
    method: 'get',
    data: {
		timeType: timeType
	},
	headers: config
  });
}

// 首页货源统计
export function getOrderData(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQuerySourceStatistics',
    method: 'get',
    data: {
    	timeType: timeType,
		topNumber: 3
    },
	headers: config
  });
}

// 首页运输统计
export function getTransportData(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryTransportationStatistics',
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
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryFreightStatistics',
    method: 'get',
    data: {
    	timeType: timeType
    },
	headers: config
  });
}

// 首页开票统计
export function getBillData(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryBillingStatistics',
    method: 'get',
    data: {
    	timeType: timeType
    },
	headers: config
  });
}
