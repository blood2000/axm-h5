import uniRequest from "../request.js";

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