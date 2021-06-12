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

// 项目报表
export function getProjectReport(config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/queryProjectReport',
    method: 'get',
	data: {},
	headers: config
  });
}

// 货源报表
export function getOrderReport(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/querySourceReport',
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
    url: '/transportation/bulkCargoStatistics/queryTransportationReportMonth',
    method: 'get',
	data: {},
	headers: config
  });
}

// 运输报表头部
export function getTransHead(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/queryTransportationReport',
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
    url: '/transportation/bulkCargoStatistics/queryTransportationReportMonthData',
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
    url: '/transportation/bulkCargoStatistics/queryExpenseReportMonth',
    method: 'get',
	data: {},
	headers: config
  });
}

// 费用报表头部
export function getCostHead(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/queryExpenseReport',
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
    url: '/transportation/bulkCargoStatistics/queryExpenseReportMonthData',
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
    url: '/transportation/bulkCargoStatistics/queryBillingReportMonth',
    method: 'get',
	data: {},
	headers: config
  });
}

// 开票报表头部
export function getBillingHead(timeType, config) {
  return uniRequest({
    url: '/transportation/bulkCargoStatistics/queryBillingReport',
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
    url: '/transportation/bulkCargoStatistics/queryBillingReportMonthData',
    method: 'get',
	data: {
		month: month
	},
	headers: config
  });
}
