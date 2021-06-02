import uniRequest from "../request.js";
import {
	ApiListStatistics,
	ApiProjectDetails,
	ApiInOutDetails,
	ApiMudtailDetails,
	ApiListVechicleDetails
} from "../api.js";

// 统计首页
export function ListStatistics(data, config) {
  return uniRequest({
    url: ApiListStatistics,
    method: 'get',
    data: data,
	headers: config
  });
}
// 项目统计
export function ProjectDetails(data, config) {
  return uniRequest({
    url: ApiProjectDetails,
    method: 'get',
    data: data,
	headers: config
  });
}
// 出入明细
export function InOutDetails(data, config) {
  return uniRequest({
    url: ApiInOutDetails,
    method: 'get',
    data: data,
	headers: config
  });
}
// 泥尾统计
export function MudtailDetails(data, config) {
  return uniRequest({
    url: ApiMudtailDetails,
    method: 'get',
    data: data,
	headers: config
  });
}
// 车辆明细
export function ListVechicleDetails(data, config) {
  return uniRequest({
    url: ApiListVechicleDetails,
    method: 'get',
    data: data,
	headers: config
  });
}
