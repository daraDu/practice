
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }

}

function startMove(obj, json, fnEnd) {

    function move() {
        var bStop = true; //假设：所有值都已经到了
        for (var attr in json) {
            var cur = 0;
                if (attr == 'opacity') {
                    cur = Math.round(parseFloat(getStyle(obj, [attr])) * 100); //四舍五入
                } else {
                    cur = parseInt(getStyle(obj, [attr]));
                };
                var speed = (json[attr] - cur) / 3;
                //记得取整
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    
                if (cur != json[attr]) {
    
                    bStop = false;
                };
    
                if (attr == 'opacity') {
    
                    //??(有bug,在IE5,6,7,8中，放上鼠标opacity:100,拿开鼠标还是100).奇怪的是，视频里演示时没问题，我用原始代码演示就出问题了。 
                    //已解决，多了一个分号。错误代码：obj.style.filter = 'alpha:(opacity:' + (cur + speed) + ')';
                    obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                    obj.style.opacity = (cur + speed) / 100;
                    
                } else {
    
                    obj.style[attr] = cur + speed + 'px';
    
                };
        

        };

            if (bStop == true) { //也可以写成if(bStop)
                clearInterval(obj.timer);
                
                if (fnEnd) fnEnd();
                
            };

    };

    clearInterval(obj.timer);
    obj.timer = setInterval(move, 30);
}