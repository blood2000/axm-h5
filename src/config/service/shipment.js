import uniRequest from "../request.js";

// 首页数据统计
export function getStatisticData(data, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryStatisticsData',
    method: 'get',
    data: data,
	headers: config
  });
}

// 首页货源统计
export function getOrderData(data, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQuerySourceStatistics',
    method: 'get',
    data: data,
	headers: config
  });
}

// 首页运输统计
export function getTransportData(data, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryTransportationStatistics',
    method: 'get',
    data: data,
	headers: config
  });
}

// 首页运费统计
export function getFeeData(data, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryFreightStatistics',
    method: 'get',
    data: data,
	headers: config
  });
}

// 首页开票统计
export function getBillData(data, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryBillingStatistics',
    method: 'get',
    data: data,
	headers: config
  });
}
