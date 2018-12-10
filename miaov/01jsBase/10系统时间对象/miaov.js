/*function getStyle(objs,attr){//封装获取元素样式
	if(objs.currentStyle){
		return objs.currentStyle[attr] ;//标准浏览器不兼容
	}else{
		return getComputedStyle(objs)[attr];//不兼容IE8以下的版本
	}	
}*/

function getStyle(obj,attr){//封装获取元素样式
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function doMove(obj,attr,dir,endPoint,intervalTime,nextFn){//移动
	clearInterval(obj.doMove);
	dir = parseInt(getStyle(obj,attr)) < endPoint ? dir : -dir;
	obj.doMove=setInterval(function(){
		var step=parseInt(getStyle(obj,attr)) + dir;
		if( step >= endPoint && dir > 0 || step <= endPoint && dir < 0 ){
			step=endPoint;
		}
		obj.style[attr] = step +'px';
		if(step==endPoint){
			clearInterval(obj.doMove);
			nextFn&&nextFn();
		}
	},intervalTime)	
}

function doShake(obj,attr,intervalTime,nextFn){//抖动
	if(obj.onoff){return};//判断条件  obj.onoff is undefined  当条件为undefined时为false
	obj.onoff=true;
	var num=0;
	var origin=parseInt(getStyle(obj,attr));
	var array=[]//20,-20,18,-18,16,-16....0
	for(var i=20;i>0;i-=2){
		array.push(i,-i)
	}
	array.push(0);
	clearInterval(obj.doShake);
	obj.doShake=setInterval(function(){
		obj.style[attr]=origin+array[num]+'px';
		num++;
		if(num==array.length){
			clearInterval(obj.doShake);
			nextFn&&nextFn();
			obj.onoff=false;
		}
	},intervalTime);	
};