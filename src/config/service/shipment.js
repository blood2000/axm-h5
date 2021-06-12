import uniRequest from "../request.js";

// 首页数据统计
export function getStatisticData(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/queryStatisticsData',
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
    url: '/transportation/bulkCargoStatistics/querySourceStatistics',
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
    url: '/transportation/bulkCargoStatistics/queryTransportationStatistics',
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
    url: '/transportation/bulkCargoStatistics/queryFreightStatistics',
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
    url: '/transportation/bulkCargoStatistics/queryBillingStatistics',
    method: 'get',
    data: {
    	timeType: timeType
    },
	headers: config
  });
}

// 项目报表
export function getProjectReport(config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndTimeQueryStatisticsDataGroup',
    method: 'get',
	data: {},
	headers: config
  });
}

// 货源报表
export function getOrderReport(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndReceiveTimeQuerySourceOfGoodsStatistics',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 运输报表月份
export function getTransMonth(config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeQueryTransportationReportMonth',
    method: 'get',
	data: {},
	headers: config
  });
}

// 运输报表头部
export function getTransHead(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndReceiveTimeQueryTransportationReport',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 运输报表月数据
export function getTransData(month, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeQueryTransportationReportMonthData',
    method: 'get',
	data: {
		month: month
	},
	headers: config
  });
}

// 费用报表月份
export function getCostMonth(config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeQueryExpenseReportMonth',
    method: 'get',
	data: {},
	headers: config
  });
}

// 费用报表头部
export function getCostHead(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndReceiveTimeQueryExpenseReport',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 费用报表月数据
export function getCostData(month, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeQueryExpenseReportMonthData',
    method: 'get',
	data: {
		month: month
	},
	headers: config
  });
}

// 开票报表月份
export function getBillingMonth(config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeQueryExpenseReportMonth',
    method: 'get',
	data: {},
	headers: config
  });
}

// 开票报表头部
export function getBillingHead(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeAndReceiveTimeQueryExpenseReport',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 开票报表月数据
export function getBillingData(month, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/shipperCodeQueryExpenseReportMonthData',
    method: 'get',
	data: {
		month: month
	},
	headers: config
  });
}
