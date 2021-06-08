import uniRequest from "../request.js";

// 统计页面跳转
export function getPageJump(config) {
  return uniRequest({
    url: '/transportation/statistics/pageJump',
    method: 'get',
	headers: config
  });
}