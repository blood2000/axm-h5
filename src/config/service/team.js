import uniRequest from "../request.js";

// 首页数据统计
export function getStatisticData(timeType, config) {
  return uniRequest({
    url: '/transportation/team-app/statistics/getTeamOfCarAndDriver',
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
    url: '/transportation/team-app/statistics/getTeamWaybillCount',
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
    url: '/transportation/team-app/statistics/getTeamWaybillFreight',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 首页车辆统计
export function getCarData(timeType, config) {
  return uniRequest({
    url: '/transportation/team-app/statistics/getTeamVehicleRanking',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 首页司机统计
export function getDriverData(timeType, config) {
  return uniRequest({
    url: '/transportation/team-app/statistics/getTeamDriverRanking',
    method: 'get',
	data: {
		timeType: timeType
	},
	headers: config
  });
}

// 司机报表
export function getDriverReport(queryDate, config) {
  return uniRequest({
    url: '/transportation/team-app/statistics/getTeamDriverDetails',
    method: 'get',
	data: queryDate,
	headers: config
  });
}

// 车辆报表
export function getVehicleReport(queryDate, config) {
  return uniRequest({
    url: '/transportation/team-app/statistics/getTeamVehicleDetails',
    method: 'get',
	data: queryDate,
	headers: config
  });
}

// 运输报表月份
export function getTransMonth(config) {
  return uniRequest({
    url: '/transportation/team-app/statistics/getTeamTransportHaveDataMonth',
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
    url: '/transportation/team-app/statistics/getTeamTransportReportHead',
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