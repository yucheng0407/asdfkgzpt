/*****************************************************************
 * rx.cache.js
 * 工具：缓存
 * 最后更新时间：2018-03-23
 * 最后更新人：Zp
 * 更新内容：实现缓存主接口（获取、存储）和初始化缓存接口
 ****************************************************************/

(function () {

    //注册别名：window/global
    var root = this;

    //当前页缓存池
    var cachePool = {};

    /**
     * 私有方法：获取缓存
     * @param key 下标，如果为多层下标，则用“.”连接，如“DEFAULT_BUTTON_ARR.0.code”
     * @returns {{}}
     * @private
     */
    var _getCache = function(key){
        var keyArr = key.split("."),
            value = cachePool;
        for(var i = 0; i < keyArr.length; i++){
            if(keyArr[i] === ""){
                continue;
            }else{
                if(typeof(value) === "undefined" || value === null){
                    RX.log("RX.cache获取缓存异常,"+keyArr.slice(0,i).join(".")+"为null或未定义");
                    break;
                }else{
                    value = value[keyArr[i]];
                }
            }
        }
        return value;
    }

    /**
     * 私有方法：设置缓存
     * @param key 下标，如果为多层下标，则用“.”连接，如“DEFAULT_BUTTON_ARR.0.code”
     * @param value 值
     * @returns {{}}
     * @private
     */
    var _setCache = function(key,value){
        var keyArr = key.split("."),
            temp = cachePool,
            result = true;
        for(var i = 0; i < keyArr.length; i++){
            if(keyArr[i] === ""){
                continue;
            }else{
                if(typeof(temp) === "undefined" || temp === null){
                    RX.log("RX.cache设置缓存异常,"+keyArr.slice(0,i).join(".")+"为null或未定义");
                    result = false;
                    break;
                }else if(i === keyArr.length - 1){
                    temp[keyArr[i]] = value;
                }else{
                    temp = temp[keyArr[i]];
                }
            }
        }
        return result;
    };

    /**
     * 缓存主接口
     * 存在value则为设置缓存，不存在value则为获取缓存
     * @param win 缓存存在的window，默认为本页面，可缺省，若为顶层，则填写_top
     * @param key 下标，如果为多层下标，则用“.”连接，如“DEFAULT_BUTTON_ARR.0.code”
     * @param value 值
     * @returns {{}}
     * @private
     */
    RX.cache = function (win,key,value) {
        var _options = {};

        //处理可缺省参数win、key、value
        if(typeof(win) === "object"){
            _options.win = win;
            _options.key = key;
            if(typeof(value) !== "undefined"){
                _options.value = value;
            }
        }else{
            _options.win = root;
            _options.key = win;
            if(typeof(key) !== "undefined"){
                _options.value = key;
            }
        }

        //适应性调用具体私有接口或具体窗口cache主接口
        if(typeof(_options.key) === "string"){
           if(_options.win.RX && _options.win.RX.cache){
                if(root == _options.win){
                    if(typeof(_options.value) === "undefined"){
                        return _getCache(_options.key);
                    }else{
                        return _setCache(_options.key,_options.value);
                    }
                }else{
                    return _options.win.RX.cache.apply(this,arguments);
                }
            }
        }

        //若无返回，统一提示参数不合法
        RX.log("RX.cache方法调用参数不合法");
    };


    /**
     * 初始化缓存
     * 遍历defaultCache，分别将下标和值存入本层缓存池
     * @param defaultCache 待初始化的缓存json
     */
    RX.initCache = function (defaultCache) {
        if(typeof(defaultCache) === "object"){
            for(var key in defaultCache){
                _setCache(key,defaultCache[key]);
            }
        }
    };

}).call(this);




