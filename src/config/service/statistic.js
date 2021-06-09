import uniRequest from "../request.js";

// 统计首页
export function ListStatistics(data, config) {
  return uniRequest({
    url: '/transportation/statistics/pageStatisticsProject',
    method: 'get',
    data: data,
	headers: config
  });
}
// 项目统计
export function ProjectDetails(data, config) {
  return uniRequest({
    url: '/transportation/statistics/getStatisticsProject',
    method: 'get',
    data: data,
	headers: config
  });
}
// 出入明细
export function InOutDetails(data, config) {
  return uniRequest({
    url: '/transportation/statistics/getInOutDetails',
    method: 'get',
    data: data,
	headers: config
  });
}
// 泥尾统计
export function MudtailDetails(data, config) {
  return uniRequest({
    url: '/transportation/statistics/getStatisticsMudtail',
    method: 'get',
    data: data,
	headers: config
  });
}
// 车辆明细
export function ListVechicleDetails(data, config) {
  return uniRequest({
    url: '/transportation/statistics/listVechicleDetails',
    method: 'get',
    data: data,
	headers: config
  });
}
