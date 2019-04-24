(function () {
    window.dictPoolData = {};
    /**
     * 替换字符
     * @param {string}str 被操作的字符串
     * @param {string}reallyDo 被替换的字符
     * @param {string}replaceWith 替代的字符
     * @returns {string} 替换后的字符串
     * @example RX.replaceStrChar("HELLO JAVA","JAVA","JAVASCRIPT")
     */
    RX.replaceStrChar = function (str, reallyDo, replaceWith) {
        var e = new RegExp(reallyDo, "g");
        var words = str;
        if (str && typeof str === 'string') {
            words = str.toString().replace(e, replaceWith);
        }
        return words;
    };

    /**
     * 去除字符串前后空格
     * @param {string} str 处理字符
     * @type {String.trim}
     */
    RX.trim = String.prototype.trim;

    /**
     * 截取字符串,后面多的显示省略号
     * @param {string}  data
     * @param {string}  length
     * @returns {*}
     */
    RX.getSubStr = function (data, length) {
        if (data && data.length > length) {
            return data.substring(0, length) + "...";
        } else {
            return data;
        }
    };

    /**
     * 通过字典编码和父字典获取字典
     * @param {string}  dictCode 字典编码
     * @param {string}  pcode    父字典编码
     * @returns {Array} 字典数组
     * @example RX.getDictByCode("CODE","PCODE");
     */
    RX.getDictByCode = function (dictCode, pcode) {
        var dictData = [], newData = [];
        if (window.dictPoolData) {
            if (window.dictPoolData[dictCode]) {
                dictData = window.dictPoolData[dictCode];
            } else {
                dictData = RX.getDictFromCon(dictCode);
                //存储数据
                window.dictPoolData[dictCode] = dictData;
            }
        } else {
            window.dictPoolData = {};
            dictData = RX.getDictFromCon(dictCode);
            //存储数据
            window.dictPoolData[dictCode] = dictData;
        }
        if (pcode) {
            if (typeof(pcode) === "object") {
                if (pcode.length > 0) {
                    for (var m = 0; m < pcode.length; m++) {
                        $.each(dictData, function (i, item) {
                            if (item.pcode == pcode[m]) {
                                newData.push(item);
                            }
                        });
                    }
                }
            } else {
                $.each(dictData, function (i, item) {
                    if (item.pcode == pcode) {
                        newData.push(item);
                    }
                });
            }

            return newData;
        } else if (pcode === "") {
            $.each(dictData, function (i, item) {
                if (!item.pcode) {
                    item.pcode = "";
                    newData.push(item);
                }
            });
            return newData;
        } else {
            return dictData;
        }
    };
    /**
     * 处理缓存字典
     * @return {Function}
     */
    RX.handleCacheDict = function () {
        /**
         *缓存字典项
         * @param dictCode like "dictCode1+dictCode2,dictCode3+dictCode4+dictCode5,..."
         */
        function cacheDict(dictCode) {
            var cacheDictCode = [];
            if (!window.dictPoolData) {
                window.dictPoolData = {};
            }
            for (var i = 0, maxLength = dictCode.length; i < maxLength; i++) {
                if (!window.dictPoolData[dictCode[i]]) {
                    cacheDictCode.push(dictCode[i]);
                }
            }
            if (cacheDictCode.length > 0) {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/dict/getDictsByCodes",
                    data: {codeStr: cacheDictCode.join(",")},
                    dataType: "JSON",
                    success: function (ar) {
                        $.extend(true, window.dictPoolData, ar);
                    }
                });
            }
        }

        var handleArr = [],
            length = 0;
        return function (objJson) {
            if (objJson) {
                var flag = true;
                for (var i = 0; i < length; i++) {
                    if (handleArr[i] == objJson) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    handleArr.push(objJson);
                    length++;
                    var dictCode = [];
                    var obj;
                    var subObj;
                    for (var code in objJson) {
                        obj = objJson[code];
                        for (var no in obj) {
                            subObj = obj[no];
                            if (subObj.dictConfig && subObj.dictConfig.dictCode && typeof subObj.dictConfig.dictCode === "string") {
                                dictCode.push(subObj.dictConfig.dictCode);
                            }
                        }
                    }
                    cacheDict(dictCode);
                }
            }
        }
    };
    /**
     * 通过CODE从后端获取字典
     * @param {string} dictCode
     * @returns {Array}
     */
    RX.getDictFromCon = function (dictCode) {
        var dictData = [];
        $.ajax({
            async: false,
            type: "POST",
            url: "/dict/getDictByCodes",
            data: {codeStr: dictCode},
            dataType: "JSON",
            success: function (ar) {
                dictData = ar;
            }
        });
        return dictData;
    };

    /**
     * 判断数据是否存在
     * @param data 待判断数据
     * @returns {boolean} 存在返回true,不存在返回false
     */
    RX.exist = function (data) {
        if (typeof(data) === "undefined" || data === null) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 获取随机uuid
     * @param len
     * @param radix
     * @returns {string}
     */
    RX.uuid = function (len, radix) {
        var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
            uuid[14] = "4";
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join("");
    }

    /**
     * 遍历数组
     *
     * @param {Array} array
     * @param {Function} callback 返回 false 可停止遍历
     * @param {?boolean} reversed 是否逆序遍历
     */
    RX.eachArray = function (array$$1, callback, reversed) {
        var length = array$$1.length;
        if (length) {
            if (reversed) {
                for (var i = length - 1; i >= 0; i--) {
                    if (callback(i, array$$1[i]) === false) {
                        break;
                    }
                }
            } else {
                for (var _i = 0; _i < length; _i++) {
                    if (callback(_i, array$$1[_i]) === false) {
                        break;
                    }
                }
            }
        }
    }

    /**
     * 获取对象的 key 的数组
     *
     * @param {Object} object
     * @return {Array}
     */
    function keys(object$$1) {
        return Object.keys(object$$1);
    }

    /**
     * 遍历对象
     *
     * @param {Object} object
     * @param {Function} callback 返回 false 可停止遍历
     */
    RX.eachObject = function (object$$1, callback) {
        RX.eachArray(keys(object$$1), function (key, value) {
            return callback(value, object$$1[value]);
        });
    };

    /**
     * 判断是否为数组
     *
     * @param value
     * @returns {*|arg is Array<any>}
     */
    RX.isArray = function (value) {
        return value && Array.isArray(value);
    }

    /**
     * 判断是否为对象
     * @param value
     * @returns {*|boolean}
     */
    RX.isObject = function (value) {
        // 低版本 IE 会把 null 和 undefined 当作 object
        return value && typeof value === 'object';
    }

    RX.isBooleanFalse = function(value) {
        return typeof value === "boolean" && !value;
    }
    /**
     * 拷贝对象
     *
     * @param {*} object
     * @param {?boolean} deep 是否需要深拷贝
     * @return {*}
     */
    RX.copy = function (object$$1, deep) {
        var result = object$$1;
        if (RX.isArray(object$$1)) {
            if (deep) {
                result = [];
                RX.eachArray(object$$1, function (item, index) {
                    result[index] = RX.copy(item, deep);
                });
            } else {
                result = object$$1.slice();
            }
        } else if (RX.isObject(object$$1)) {
            result = {};
            RX.eachObject(object$$1, function (key, value) {
                result[key] = deep ? RX.copy(value, deep) : value;
            });
        }
        return result;
    }


}).call();