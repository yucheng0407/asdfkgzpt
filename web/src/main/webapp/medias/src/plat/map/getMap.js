/**
 * 返回地图实例，baseTool基本工具
 * @param option(加载外部JS)
 */
function getMap(option) {
    var mapWin = _searchMapWindow("mapIframe");//地图所在页面
     loadMap(mapWin, function () {
        mapWin.require(option.list, function () {
            var obj_callback = {};   //存储返回给使用者的对象
            for (var i = 0; i < option.list.length; i++) {//外部JS
                var str = option.list[i];
                str = str.substr(str.lastIndexOf("/") + 1);//从最后末尾'/'截取
                str = str.replace(str.substr(0,1), str.substr(0,1).toUpperCase());//首字母大写
                obj_callback[str] = arguments[i];
            }
            option.callBack(obj_callback);//回调
        });
 })

}

/**
 * 寻找地图页面
 * @param frameName 地图名称
 * @return 地图页面
 */
function _searchMapWindow(frameName) {
    function _eachWin(frame) {
        if (frame.name === frameName) {
            return frame;
        }
        for (var i = 0; i < frame.frames.length; i++) {
            var win = _eachWin(frame.frames[i]);
            if (win) return win;
        }
    }
    return _eachWin(top);
}

/**
 * 地图页面加载(地图页面调用)
 * @param win 地图名称
 * @param call 回调函数
 * @return 地图页面
 */
function loadMap(win, call) {
    if (!win._loadMap) {
        if(BrowserType()){
            $(win).bind('load', function () {
                win._loadMap = true;
                if (call) call();
            });
        }else{
            setTimeout(function () {
                win._loadMap = true;
                if (call) call();
            },2000);
        }
        // $(win).bind('load', function () {
        //     win._loadMap = true;
        //     if (call) call();
        // });
    } else {
        if (call) call();
    }
}

function BrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    return isChrome;
}