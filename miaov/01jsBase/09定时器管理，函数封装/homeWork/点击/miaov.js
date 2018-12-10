function getStyle(objs,attr){//封装获取元素样式
	if(objs.currentStyle){
		return objs.currentStyle[attr] ;//标准浏览器不兼容
	}else{
		return getComputedStyle(objs)[attr];//不兼容IE8以下的版本
	}	
}

function doMove(obj,attr,dir,endNum,endFn){//让元素移动
	dir = parseInt(getStyle(obj,attr)) > endNum ? -dir : dir;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var step = parseInt(getStyle(obj,attr))+dir;
		if(step > endNum && dir> 0 || step < endNum && dir<0){
			step=endNum;
		}
		obj.style[attr]=step+'px';
		if(step===endNum){
			clearInterval(obj.timer);
			if(endFn){
				endFn();
			}
		}
	},50)
}