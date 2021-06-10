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

// 车辆报表
export function getVehicleReport(timeType, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/vehicleReport',
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
    url: '/transportation/driverStatistics/transportReportHaveDataMonth',
    method: 'get',
	data: {
		year: ''
	},
	headers: config
  });
}

// 运输报表头部
export function getTransHead(timeType, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/transportReportHeadStatistics',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 运输报表月数据
export function getTransData(yearMonth, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/transportReportMonthData',
    method: 'get',
	data: {
		yearMonth: yearMonth
	},
	headers: config
  });
}

// 费用报表月份
export function getCostMonth(config) {
  return uniRequest({
    url: '/transportation/driverStatistics/costReportHaveDataMonth',
    method: 'get',
	data: {
		year: ''
	},
	headers: config
  });
}

// 费用报表头部
export function getCostHead(timeType, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/costReportHeadStatistics',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 费用报表月数据
export function getCostData(yearMonth, config) {
  return uniRequest({
    url: '/transportation/driverStatistics/costReportMonthData',
    method: 'get',
	data: {
		yearMonth: yearMonth
	},
	headers: config
  });
}
