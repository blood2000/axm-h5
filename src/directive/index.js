import Vue from 'vue';

Vue.directive('number-format', {
    inserted: function(el, binding) {
		let val = binding.value;
		if(typeof val === "number"){
			var str = val.toString();
			var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
			val =  str.replace(reg,"$1,");
			el.innerText = val;
		}else{
			el.innerText = 0;
		}
    }
})