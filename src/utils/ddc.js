// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  time = new Date(time);
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]; }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}


export function numberFormat(val){
	let num = 0;
	if(typeof val === "number"){
		if(val > 9999){
			num = (Math.floor(val/100)/100);
		}else{
			num = val;
		}
		let str = num.toString();
		let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
		num =  str.replace(reg,"$1,");
		return num;
	}else{
		return 0
	}
}

export function numberFormatUnit(val){
	if(typeof val === "number"){
		if(val > 9999){
			return '万';
		}else{
			return '';
		}
	}else{
		return '';
	}
}

export function removePropertyOfNull(obj){
  Object.keys(obj).forEach(item=>{
    if(!obj[item] && obj[item]!=0 && typeof(obj[item]) !== 'boolean' ) delete obj[item]
      
    if(Object.prototype.toString.call(obj[item]) === '[object Object]'){
      removePropertyOfNull(obj[item])
    }
    if(Array.isArray(obj[item])){
      obj[item].forEach(e=>{
        removePropertyOfNull(e)
      })
    }
  })
  return obj;
}