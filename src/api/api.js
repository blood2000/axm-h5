const apiUrl = {
  getRepairList: '/fmsapp/repair/repairRecord/v1/repairRecordList',
  updateStatus: '/fmsapp/repair/repairRecord/v1/updateStatus',
  getDriverInfo: '/ddc-job/healthCode/getDriverInfo',
  getTourData: '/schedule/epidemic/searchByCar',
  login: '/tools-web/login',
  searchByCar: '/tools-web/searchByCar',
  getCaptcha: '/tools-web/kaptchaBase64', //验证码
};
export default { ...apiUrl }