import uniRequest from "../request.js";
import {
	ApiListStatistics,
	ApiProjectDetails,
	ApiInOutDetails,
	ApiMudtailDetails,
	ApiListVechicleDetails
} from "../api.js";

// 统计首页
export function ListStatistics(data) {
  return uniRequest({
    url: ApiListStatistics,
    method: 'get',
    data: data
  });
}
// 项目统计
export function ProjectDetails(data) {
  return uniRequest({
    url: ApiProjectDetails,
    method: 'get',
    data: data
  });
}
// 出入明细
export function InOutDetails(data) {
  return uniRequest({
    url: ApiInOutDetails,
    method: 'get',
    data: data
  });
}
// 泥尾统计
export function MudtailDetails(data) {
  return uniRequest({
    url: ApiMudtailDetails,
    method: 'get',
    data: data
  });
}
// 车辆明细
export function ListVechicleDetails(data) {
  return uniRequest({
    url: ApiListVechicleDetails,
    method: 'get',
    data: data
  });
}
