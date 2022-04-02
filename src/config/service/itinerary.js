import uniRequest from "../request.js";
//获取默认车辆
export function getDriverInfo(config) {
  return uniRequest({
    url: '/ddc-job/healthCode/getDriverInfo',
    method: 'get',
    headers: config
  });
}
//车辆行程
export function getTourData(data, config) {
  return uniRequest({
    url: '/schedule/epidemic/searchByCar',
    method: 'post',
    data: data,
    headers: config
  });
}