/**
 * RX.dict-0.1
 * RX字典控件：字典数据相关实现
 * 最后更新时间：2018-02-12
 * 最后更新人：Zp
 * 修改内容：完成基础字典获取与缓存
 */

(function (global) {

    //字典池声明
    var dictPool = {};

    /**
     * 内部接口：判断是否数组对象
     * Todo:待统一后使用工具接口
     * @param object 待判断对象
     * @returns {boolean}
     * @private
     */
    function isArray(object) {
        return object && object instanceof Array;
    }

    /**
     * 内部接口：请求系统字典
     * @param {string} code 字典编码
     * @returns {Array} 字典项array
     * @private
     */
    function askDict(code) {
        var items = [];
        $.ajax({
            async: false,  //Todo：未实现字典请求回调，统一为同步请求
            type: "POST",
            url: "/dict/getDictByCodes",
            data: {codeStr: code},
            dataType: "JSON",
            success: function (ar) {
                items = ar;
            }
        });
        return items;
    }

    /**
     * 内部接口：请求url，获取数据
     * @param {string} url 用于请求数据的url，目前参数传递需拼接在url中
     * @returns {Array} url请求获取的原始数据array
     * @private
     */
    function askUrl(url) {
        var data = [];
        $.ajax({
            async: false,   //Todo：未实现字典请求回调，统一为同步请求
            type: "GET",
            url: url,
            dataType: "JSON",
            success: function (ar) {
                if(typeof(ar) === "object"){  //请求值为对象(AjaxReturn)
                    if(ar.success){
                        data = ar.data;
                    }else{
                        RX.alert(ar.msg);
                    }
                }else{  //请求值为数组或空
                    data = ar;
                }
            }
        });
        return data;
    }

    /**
     * 内部接口：转换数据为字典项
     * @param data 待转换数据
     * @param config 字典属性配置(用于参考字典项与数据属性映射)
     * @returns {Array} 由数据转换的字典项array
     * @private
     */
    function parseDictItems(data,config) {
        var items = [];
        if(config && isArray(data)){
            //遍历待转换数据，构造转换字典项
            $.each(data,function(i,t){
                var item = {};
                //构造额外属性信息
                if(isArray(config.other)){
                    $.each(config.other,function(ic,tc){
                        item[tc] = t[tc];
                    })
                }
                //构造编码
                if(config.code){
                    item.code = t[config.code];
                }
                //构造值
                if(config.value){
                    item.value = t[config.value];
                }
                //字典项存储数据项array序号，用于字典项反向查找数据
                item._data_index = i;
                items.push(item);
            })
        }
        return items;
    }

    /**
     * 初始化字典数据对象
     * @param code 字典编码
     * @param config 字典配置
     * @param data 待转换的数据
     * @returns {*} 被处理的字典数据对象
     * @private
     */
    function initDict(code, config, data){
        //字典池中获取字典数据对象
        var dict = dictPool[code] || this;
        //初始化字典数据对象配置
        dict.config = $.extend(true, {}, defaultDictConfig, config || {});
        //初始化字典数据
        dict.data = [];
        //初始化字典项
        dict.items = null;
        //构造字典项
        if(dict.config.url){     //拥有请求url，请求数据，转换为字典项
            dict.data = askUrl(dict.config.url);
            dict.items = parseDictItems(dict.data, dict.config.property);
        }else if(data){     //拥有待转化的数据，转换为字典项
            dict.data = $.extend(true,[],data);    //深度复制，避免引用
            dict.items = parseDictItems(dict.data, dict.config.property);
        }else{   //请求系统字典
            dict.items = askDict(code);
        }
        return dict;
    }

    /**
     * 默认配置：字典数据对象
     */
    var defaultDictConfig = {
        url:null,
        property:{
            code:"code",
            value:"value",
            pcode:"pcode",
            other:[]
        }
    };

    /**
     * 构造器：字典数据对象
     * @param code 字典编码
     * @param config 字典配置
     * @param data 初始化数据
     * @constructor
     */
    var Dict = function (code, config, data) {
        this.code = code;
        dictPool[code] = this;
        initDict(code, config, data);
    };

    /**
     * 构造属性与接口：字典数据对象
     */
    Dict.prototype = {
        /**
         * 重载字典数据对象
         * @param config 重载字典配置
         * @param data 重载数据
         * @returns {*} 处理的字典数据对象
         */
        reload:function(config,data){
            if(!config && !data){
                return this;
            }
            return initDict(this.code, config, data);
        },
        /**
         * 获取字典项属性信息
         * (优先查找字典项属性信息，若不存在，查找字典项关联数据属性信息)
         * @param code 字典项编码
         * @param property 获取信息属性名，默认为“value”
         * @returns {*} 获取到的字典项属性信息
         */
        getValue:function(code,property){
            var dict = this,selItem,result = "";
            if(!code){
                return result;
            }
            property = property || "value";
            if(isArray(dict.items)){
                $.each(dict.items,function(i,t){
                    if(t.code == code){
                        selItem = t;
                        return false;
                    }
                });
                if(selItem){
                    result = selItem[property];
                    if(typeof(result) === "undefined" && selItem._data_index){
                        result = this.data[selItem._data_index][property];
                    }
                }
            }
            return result;
        },
        /**
         * 获取字典项关联数据信息
         * @param code 字典项编码
         * @returns {*} code非空返回相符项关联数据对象，code为空则返回数据对象array
         */
        getData:function(code){
            var dict = this,selItem;
            if(!code){
                return dict.data;
            }
            if(dict.items){
                $.each(dict.items,function(i,t){
                    if(t.code == code){
                        selItem = t;
                        return false;
                    }
                });
                if(selItem){
                    if(selItem._data_index){
                        return dict.data[selItem._data_index];
                    }else{
                        return selItem;
                    }
                }
            }
        },
        /**
         * 销毁字典数据对象
         * @returns {boolean} 是否成功
         */
        destroy: function () {
            delete dictPool[this.code];
            //待丰富
            return true;
        }
    };

    /**
     * 命名空间注册：RX.dict
     */
    RX.dict = {
        /**
         * 对外接口：获取字典
         * (字典对象若存在，则返回字典，字典对象若不存在，则创建字典对象并返回)
         * (若config或data参数存在，则按照config与data自动重载字典数据对象)
         * @param code 字典编码
         * @param config 字典配置
         * @param data 初始化数据
         * @returns {*} 字典数据对象
         */
        get: function (code,config,data) {
            if (!code) {
                return null;
            }
            if(dictPool[code]){
                return dictPool[code].reload(config,data);
            }else{
                return new Dict(code, config, data);
            }
        },
        /**
         * 对外接口：批量初始化字典
         * @param dictSettings 待待初始化字典信息数组（每项为统一结构，可包含code、config、data字段），若为单个字典，可不用放在数组中
         */
        init: function (dictSettings) {
            if(isArray(dictSettings)){
                $.each(dictSettings,function(i,t){
                    if(typeof t === "object"){
                        RX.dict.get(t.code,t.config,t.data);
                    }
                })
            }else if(typeof dictSettings === "object"){
                RX.dict.get(dictSettings.code,dictSettings.config,dictSettings.data);
            }
        },
        /**
         * 对外接口：销毁字典数据对象
         * @param code 字典编码数组，若为单个可直接传入编码字符串
         * @returns {boolean} 是否成功
         */
        destroy: function (code) {
            if(!code){
                return false;
            }
            var result = true;
            var destoryDictByCode = function(scode){
                if(typeof scode === "string" && dictPool[scode]){
                    var tresult = dictPool[scode].destroy();
                    result = !tresult ? tresult : result;
                }
            }
            if(isArray(code)){
               $.each(code,function(i,t){
                   destoryDictByCode(t);
               })
            }else{
                destoryDictByCode(t);
            }
            return result;
        }
    }
})(this);