/**
 * rx.yox.ext
 * Rxvm扩展
 * 创建时间：2018-05-17
 * 创建人：Zp
 * 创建内容：增加表单验证触发接口（简单实现）
 * 更新时间：2018-05-21
 * 更新人：Zp
 * 更新内容：增加平台Yox组件注册、获取、实例化接口
 */
(function () {

    /**********内部变量、方法声明**********START**********/
    var componentPool = {}, //内部变量，全局组件池
        instancePool = {};  //内部变量，全局实例池
    /**
     * 内部方法：整合组件内容与个性化内容
     * @param cmptOptions   组件内容
     * @param options       个性化内容
     * @returns {*}         合并内容（methods、settings取并集，其他字段以options中为准）
     * @private
     */
    function buildComponentOption(cmptOptions, options) {
        cmptOptions = cmptOptions || {};
        options = options || {};
        var initOptions = cmptOptions["initOptions"];
        if (initOptions && typeof initOptions === "function") {
            return initOptions(cmptOptions, options);
        } else {
            return $.extend(true, {}, cmptOptions, options);
        }
    }

    /**
     * 内部方法：翻译路径，将"[","]"替换为"."
     * @param keypath
     * @returns {string}
     */
    function parseKeypath(keypath) {
        keypath = keypath ? keypath.toString() : "";
        return keypath.replace(/\[/g, ".").replace(/]/g, ".");
    }

    /**
     * 内部方法：判断路径相等（可包含*号，*代表任何值）
     * @param keypath1
     * @param keypath2
     * @returns {boolean}
     */
    function equalPathXing(keypath1, keypath2) {
        var keypathArr1 = (keypath1 || "").split("."),
            keypathArr2 = (keypath2 || "").split("."),
            k1length = keypathArr1.length,
            k2length = keypathArr2.length,
            result = true;
        if (k1length === k2length) {
            var k1, k2;
            for (var i = 0; i < k2length; i++) {
                k1 = keypathArr1[i];
                k2 = keypathArr2[i];
                if (k1 === "*" || k2 === "*") {
                    continue;
                }
                if (k1 !== k2) {
                    result = false;
                    break;
                }
            }
        } else {
            result = false;
        }
        return result;
    }

    /**
     * 内部方法：获取受影响路径
     * @param pathArr
     * @param data
     * @returns {Array}
     */
    // function getAffectedPaths(pathArr, data) {
    //     var affectedArr = [];
    //     var arrLen = pathArr.length;
    //     if (arrLen > 1) {
    //         var path = pathArr.pop();
    //         for (var key in data) {
    //             if (path === "*" || path == key) {
    //                 var tempArr = getAffectedPaths(pathArr, data[key]);
    //                 $.each(tempArr, function (i, t) {
    //                     affectedArr.push(key + "." + t);
    //                 })
    //             }
    //         }
    //     } else {
    //         var path = pathArr.pop();
    //         for (var key in data) {
    //             if (path === "*" || path == key) {
    //                 affectedArr.push(key);
    //             }
    //         }
    //     }
    //     return affectedArr;
    // }

    /**
     * 内部方法：获取组合配置
     * @param oldConf
     * @param newConf
     * @returns {*}
     */
    Rxvm.prototype._getCombineConfig = function (oldConf, newConf) {
        oldConf = $.extend(true, {}, oldConf);
        newConf = newConf || {};
        //遍历字段属性
        for (var key in newConf) {
            if (newConf.hasOwnProperty(key)) {
                //如属性是type
                if (key === "type") {
                    var newConfigName = newConf.type + "Config";
                    //先比对type是否变化，若变化，则将原有Config删除，type和Config替换成新配置内容
                    if (oldConf.type !== newConf.type) {
                        var oldConfigName = oldConf.type + "Config";
                        if (oldConf[oldConfigName]) {
                            delete oldConf[oldConfigName];
                        }
                        if (newConf[newConfigName]) {
                            oldConf[newConfigName] = newConf[newConfigName];
                        }
                        oldConf.type = newConf.type;
                    } else { //若type未变化，则比对Config内部属性，将变化字段更换
                        if (newConf[newConfigName]) {
                            for (var configKey in newConf[newConfigName]) {
                                if (newConf[newConfigName].hasOwnProperty(configKey)) {
                                    oldConf[newConfigName][configKey] = newConf[newConfigName][configKey];
                                }
                            }
                        }
                    }
                } else if (key.indexOf("Config") > 0) { //如属性是Config
                    if (!newConf.type) {//如未配置type属性，等同于type未变化，则比对Config内部属性，将变化字段更换
                        if (newConf[key]) {
                            for (var configKey in newConf[key]) {
                                if (newConf[key].hasOwnProperty(configKey)) {
                                    oldConf[key][configKey] = newConf[key][configKey];
                                }
                            }
                        }
                    }
                } else if (key === "rules") {//规则参数
                    if (!oldConf.rules) {
                        oldConf.rules = {};
                    }
                    for (var ruleKey in newConf.rules) {
                        if (newConf.rules.hasOwnProperty(ruleKey)) {
                            if (typeof(newConf.rules[ruleKey]) !== "undefined") {
                                oldConf.rules[ruleKey] = newConf.rules[ruleKey];
                            }
                        }
                    }
                } else {//基础属性，直接更换
                    oldConf[key] = newConf[key];
                }
            }
        }
        return oldConf;
    }

    /**
     * 内部方法：获取有效状态
     * @param keypath
     * @param allState
     * @returns {*}
     */
    function getValidState(keypath, allState) {
        function compareEachFloor(keyArr, computedArr, index) {
            var rightArr = [],
                likeArr = [],
                rightStopArr = [],
                likeStopArr = [];
            $.each(computedArr, function (i, t) {
                if (keyArr[index] === t.pathArr[index]) {
                    if (index === t.arrLength) {
                        rightStopArr.push(t);
                    } else {
                        rightArr.push(t);
                    }
                } else if (t.pathArr[index] === "*") {
                    if (index === t.arrLength) {
                        likeStopArr.push(t);
                    } else {
                        likeArr.push(t);
                    }
                }
            });
            if (rightArr.length) {
                return compareEachFloor(keyArr, rightArr, ++index);
            } else if (rightStopArr.length) {
                return rightStopArr;
            } else if (likeArr.length) {
                return compareEachFloor(keyArr, likeArr, ++index);
            } else if (likeStopArr.length) {
                return likeStopArr;
            } else {
                return null;
            }
        }

        keypath = parseKeypath(keypath);
        var keyArr = keypath.split("."),
            result;
        if (keyArr.length) {
            result = compareEachFloor(keyArr, allState._computedState || [], 0);
            if (result && result.length) {
                result = result[0];
            }
        }
        return result;
    }

    /**
     * 内部方法：初始化状态
     * @param allState
     */
    function initState(allState) {
        if (!allState._computedState) {
            var computedArr = allState._computedState = [],
                disableArr = allState.disable,
                enableArr = allState.enable;
            allState._defaultEnable = true;

            if (disableArr instanceof Array) {
                allState._defaultEnable = true;
                $.each(disableArr, function (i, t) {
                    if (typeof t === "string") {
                        var arr = parseKeypath(t).split(".");
                        var item = {
                            enable: false,
                            path: t,
                            pathArr: arr,
                            arrLength: arr.length
                        };
                        computedArr.push(item);
                    }
                })
            } else if (enableArr instanceof Array) {
                allState._defaultEnable = false;
                $.each(enableArr, function (i, t) {
                    if (typeof t === "string") {
                        var arr = parseKeypath(t).split(".");
                        var item = {
                            enable: true,
                            path: t,
                            pathArr: arr,
                            arrLength: arr.length
                        };
                        computedArr.push(item);
                    }
                })
            }
            delete allState.enable;
            delete allState.disable;
        }
    }

    /**
     * 内部方法：更新路径状态
     * @param keypath
     * @param enable
     * @param allState
     */
    function updatePathState(keypath, enable, allState) {
        var result = getValidState(keypath, allState);
        keypath = parseKeypath(keypath);
        enable = (enable === true || enable === "true");
        if (result) {
            if (result.path === keypath) {
                result.enable = enable;
                return;
            }
        }
        var arr = keypath.split(".");
        allState._computedState.push({
            enable: enable,
            path: keypath,
            pathArr: arr,
            arrLength: arr.length
        })
    }

    /**
     * 内部方法：验证规则
     * @param rule
     * @param $t
     * @returns {boolean}
     */
    function validateRule(rule, $t, noTip) {
        var result = true;
        if (rule) {
            var func = RX.getGlobalFunc(rule);
            if (func) {
                result = func($t, noTip);
            }
        }
        return result;
    }

    /**
     * 内部方法：判断非空数据
     * @param arr
     * @returns {boolean}
     */
    function isNotEmptyArray(arr) {
        return arr instanceof Array && arr.length > 0;
    }

    /**
     * 获取数据类型，数组“array”、对象“object”、空值“null”、其他“normal”
     * @param obj
     * @returns {string}
     */
    function getType(obj) {
        var type = "normal";
        if (typeof obj === "function") {
            type = "function";
        } else if (typeof obj === "object") {
            if (!obj) {
                type = "null";
            } else if (obj instanceof Array) {
                type = "array";
            } else {
                type = "object";
            }
        }
        return type;
    }

    /**********内部变量、方法声明**********END**********/

    /**********实例功能扩展**************START**********/

    /**
     * RX.Form内部方法：备份RX.Form实例
     * @param instance  实例
     * @private
     */
    Rxvm._backupViewModel = function (instance) {
        if (instance.cid) {
            instancePool[instance.cid] = instance;
        }
    };

    /**
     * RX.Form方法：获取实例
     * @param cid 实例cid
     * @returns {*}
     */
    Rxvm.getViewModel = function (cid) {
        return instancePool[cid];
    };

    /**
     * 实例扩展方法：获取路径配置
     * @param keypath
     * @returns {*}
     */
    Rxvm.prototype.getConfig = function (keypath) {
        var config = this.$options.config,
            result,
            xingResult;
        keypath = parseKeypath(keypath);
        result = config[keypath];
        for (var key in config) {
            if (config.hasOwnProperty(key) && equalPathXing(keypath, key)) {
                xingResult = config[key];
                break;
            }
        }
        return this._getCombineConfig(xingResult, result);
    };

    /**
     * 实例扩展方法：设置（更新）路径配置
     * @param keypath
     * @param value
     */
    Rxvm.prototype.setConfig = function (keypath, value) {
        var that = this,
            config = that.$options.config;

        function setPathConfig(keypath, value) {
            keypath = parseKeypath(keypath);
            if (keypath) {
                // var pathConfig = config[keypath] = that._getCombineConfig(config[keypath], value);
                // pathConfig._hasChecked = false;
                // var affectedArr = getAffectedPaths(keypath.split("."), that.get());
                // $.each(affectedArr, function (i, t) {
                //     $("*[rx-cid='" + that.cid + "'][rx-path='" + t + "']").each(function (i2, t2) {
                //         that._renderConfig(t2, pathConfig, true);
                //     });
                // })
                config[keypath] = that._getCombineConfig(config[keypath], value);
                $("*[rx-cid='" + that.cid + "'][rx-path]").each(function (i2, t2) {
                    var $t2 = $(t2),
                        path = $t2.attr("rx-path");
                    if (equalPathXing(path, keypath)) {
                        that._renderConfig(t2, that.getConfig(path), true);
                    }
                });
            }
        }

        if (typeof(keypath) === "object") {
            for (var key in keypath) {
                if (keypath.hasOwnProperty(key)) {
                    setPathConfig(key, keypath[key]);
                }
            }
        } else {
            setPathConfig(keypath, value);
        }
    };

    // /**
    //  * 实例扩展方法：获取路径状态
    //  * @param keypath
    //  * @returns {*}
    //  */
    // Rxvm.prototype.getState = function (keypath) {
    //     var allState = this.$options.state;
    //     var result = getValidState(keypath, allState);
    //     return result ? result.enable : allState._defaultEnable;
    // };
    //
    // /**
    //  * 实例扩展方法：更新路径状态
    //  * @param keypath
    //  * @param enable
    //  * @param needUpdate
    //  * @returns {*}
    //  */
    // Rxvm.prototype.setState = function (keypath, enable, needUpdate) {
    //     var that = this;
    //     if (typeof needUpdate !== "boolean") {
    //         needUpdate = true;
    //     }
    //     if (typeof keypath === "object" && !(keypath instanceof Array)) {
    //         var allState = that.$options.state = $.extend(true, {}, keypath);
    //         initState(allState);
    //     } else if (typeof keypath === "string") {
    //         updatePathState(keypath, enable, that.$options.state);
    //     }
    //     if (needUpdate) {
    //         $("*[rx-cid='" + that.cid + "'][rx-path]").each(function (i, t) {
    //             var $t = $(t);
    //             that._renderConfig($t, that.getConfig($t.attr("rx-path")), true);
    //         });
    //     }
    // };

    /**
     * 获取路径对应页面jq元素
     */
    Rxvm.prototype.getElement = function (keypath) {
        var el = this.$node && this.$node.el;
        if (typeof keypath === "string" && keypath && el) {
            var element = $(el).find("*[rx-cid='" + this.cid + "'][rx-path='" + keypath + "']");
            if (element.length) {
                return element;
            }
        }
    };

    /**
     * 实例扩展方法：禁用字段
     * @param keypath {string|array}  禁用字段（字符串或数组）
     * @param disabled  是否禁用，默认为false
     */
    Rxvm.prototype.setDisabled = function (keypath, disabled) {
        var that = this,
            disabled = disabled ? true : false;

        function disabledPath(keypath, disabled) {
            if (typeof keypath === "string") {
                that.setConfig(keypath, {disabled: disabled});
            }
        }

        if (keypath instanceof Array) {
            $.each(keypath, function (i, t) {
                disabledPath(t, disabled);
            })
        } else {
            disabledPath(keypath, disabled);
        }
    };

    /**
     * 实例扩展方法：清空字段
     * @param keypath {string|array}  待清空字段（字符串或数组）
     */
    Rxvm.prototype.empty = function (keypath) {
        var that = this;

        function emptyData(emptyPath) {
            if (emptyPath) {
                var data = that.get(emptyPath),
                    dataType = getType(data);
                if (dataType === "normal") {
                    var path = emptyPath.split(".").pop().toUpperCase();
                    if (path !== "ID" && path !== "SFYXST" && path !== "SFYX_ST") {
                        that.set(emptyPath, "");
                    }
                } else if (dataType === "array") {
                    that.removeAll(emptyPath);
                } else if (dataType === "object") {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            emptyData(emptyPath + "." + key);
                        }
                    }
                }
            }
        }

        if (keypath instanceof Array) {
            $.each(keypath, function (i, t) {
                if (typeof t === "string") {
                    emptyData(t);
                }
                $.each(keypath, function (i, t) {
                    that.setConfig(t);
                })
            })
        } else {
            if (typeof keypath === "string") {
                emptyData(keypath);
                that.setConfig(keypath);
            }
        }
    };

    /**
     * 实例扩展方法：触发表单验证
     * @param options
     * 具体参数说明：options= {
     *      type:["checkSave"], //验证类型数组，默认包含"checkSave"，可缺省
     *      validateChild: true, //同时验证子组件，默认为true，可缺省
     *      properties:[],   //个性验证字段数组，若为验证所有组件，则各组件字段均可填入，可缺省，缺省则验证所有组件字段
     *      notPassStopAll: false,  //验证不通过时，是否继续其他字段执行验证，默认为false，可缺省
     *      notPassStopProperty: false,  //字段验证不通过时，是否执行字段其他验证，默认为false，可缺省
     *      noTip: false   //是否不展示Error标记，默认为否（要展示），可缺省
     * }
     * @returns {boolean} 验证是否通过
     */
    Rxvm.prototype.ruleValidate = function (options) {
        var that = this,
            result = true,
            validateAll = false;
        if (typeof options !== "object" || options instanceof Array) {
            options = {};
        }
        //默认验证不通过时，继续其他字段执行验证
        if (typeof options.validateChild !== "boolean") {
            options.validateChild = true;
        }
        //判断是否验证全部
        if (!isNotEmptyArray(options.properties)) {
            validateAll = true;
        }
        //默认验证不通过时，继续其他字段执行验证
        if (typeof options.notPassStopAll !== "boolean") {
            options.notPassStopAll = false;
        }
        //默认字段验证不通过时，不执行字段其他验证
        if (typeof options.notPassStopProperty !== "boolean") {
            options.notPassStopProperty = true;
        }

        //是否不展示Error标记，默认为否（要展示）
        if (typeof options.noTip !== "boolean") {
            options.noTip = false;
        }

        //默认验证类型为checkSave
        if (!options.type || !isNotEmptyArray(options.type)) {
            options.type = ["checkSave"];
        } else if (typeof options.type === "string" && options.type.trim()) {
            options.type = [options.type];
        }

        function validateRule(rule, $t, noTip, config, instance) {
            var result = true;
            if (rule) {
                var func = RX.getGlobalFunc(rule);
                if (func) {
                    result = func($t, noTip, config, instance);
                }
            }
            return result;
        }

        function checkProperty(instance, $t, result$t) {
            var myConfig = instance.getConfig($t.attr("rx-path"));
            if (myConfig) {
                if (myConfig.rules) {
                    $.each(options.type, function () {
                        var typeRules = myConfig.rules[arguments[1]];
                        if (typeRules instanceof Array && typeRules.length) {
                            $.each(typeRules, function () {
                                if (!validateRule(arguments[1], $t, options.noTip, myConfig, instance)) {
                                    result$t = false;
                                    return result$t || !options.notPassStopProperty;
                                }
                            })
                        }
                        return result$t || !options.notPassStopProperty;
                    })
                }
            }

            return result$t;
        }

        function checkVmAll(instance) {
            var $pathEls = $("*[rx-cid=" + instance.cid + "][rx-path]");
            $pathEls.each(function (i, t) {
                var $t = $(t);
                $t.removeErrorTip();
                $t.removeErrorTip2();
            });
            $pathEls.each(function (i, t) {
                var $t = $(t),
                    result$t = true;
                if (!$t.parent().eq(0).hasClass("hideElement") && !$t.hasClass("disabled")) {
                    result$t = checkProperty(instance, $t, result$t);
                }
                if (!result$t) {
                    result = false;
                }
                return result || !options.notPassStopAll;
            });
            if (options.validateChild && instance.$children) {
                $.each(instance.$children, function (i, t) {
                    checkVmAll(t);
                    return result || !options.notPassStopAll;
                })
            }
        }

        function checkVmProperties(instance) {
            var $pathEls = $("*[rx-cid=" + instance.cid + "][rx-path]");
            $pathEls.each(function (i, t) {
                var $t = $(t);
                $t.removeErrorTip();
                $t.removeErrorTip2();
            });
            $pathEls.each(function (i, t) {
                var $t = $(t),
                    result$t = true;
                if (!$t.parent().eq(0).hasClass("hideElement") && !$t.hasClass("disabled")) {
                    var hasTag = false,
                        keypath = $t.attr("rx-path");

                    //判断元素是否符合验证字段要求
                    $.each(options.properties, function (pi, pt) {
                        if (equalPathXing(keypath, pt)) {
                            hasTag = true;
                            return false;
                        }
                    })
                    if (!hasTag) {
                        return true;
                    }
                    result$t = checkProperty(instance, $t, result$t);

                }
                if (!result$t) {
                    result = false;
                }
                return result || !options.notPassStopAll;
            });
            if (options.validateChild && instance.$children) {
                $.each(instance.$children, function (i, t) {
                    checkVmProperties(t);
                    return result || !options.notPassStopAll;
                })
            }
        }

        if (validateAll) {
            checkVmAll(that);
        } else {
            checkVmProperties(that);
        }

        if (!result) {
            RX.scrollToError();
        }

        return result;
    };

    /**
     * 设置数据
     * @param data data区待赋值的数据，object类型，参数内字段会逐个覆盖vm中data区字段
     */
    Rxvm.prototype.setData = function(data){
        var that = this;
        if(getType(data) === "object"){
            RX.eachObject(data,function(k,v){
                that.set(k,v);
            })
        }
    }

    /**
     * 获取数据（将子组件数据同步并复制到新建对象中）
     * @param includeNotFormTag 是否包含字段配置中ifForm为false的字段，默认为false
     */
    Rxvm.prototype.getData = function (includeNotFormTag) {
        function removeIfNotForm(instance, data, parentKey, childHandledKeys) {
            if (parentKey && childHandledKeys.contains(parentKey.substring(0, parentKey.length - 1))) {
                return;
            }
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var pro = data[key],
                        proType = getType(pro);
                    if (proType === "object" || proType === "array") {
                        removeIfNotForm(instance, pro, parentKey + key + ".", childHandledKeys);
                    } else if (proType === "normal" || proType === "null") {
                        var config = instance.getConfig(parentKey + key);
                        var ukey = key.toUpperCase();
                        if (config) {
                            if (typeof config.ifForm === "boolean" && !config.ifForm) {
                                delete data[key];
                            }
                        }
                    }
                }
            }
        }

        function removeIfNotVALID(instance, data, parentKey) {
            var dataType = getType(data);
            if (dataType === "object") {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var pro = data[key],
                            proType = getType(pro);
                        if (proType === "object") {
                            var delTag = false;
                            if ((typeof pro["id"] != "undefined" && !pro["id"]) || (typeof pro["ID"] != "undefined" && !pro["ID"])) {
                                if (typeof pro["sfyxSt"] != "undefined" && pro["sfyxSt"] === "UNVALID") {
                                    delete data[key];
                                    delTag = true;
                                }
                            }
                            if (!delTag) {
                                removeIfNotVALID(instance, pro, parentKey + key + ".");
                            }
                        } else if (proType === "array") {
                            removeIfNotVALID(instance, pro, parentKey + key + ".");
                        }
                    }
                }
            } else if (dataType === "array") {
                for (var i = 0; i < data.length;) {
                    var pro = data[i],
                        proType = getType(pro),
                        delTag = false;
                    if (proType === "object") {
                        if ((typeof pro["id"] != "undefined" && !pro["id"]) || (typeof pro["ID"] != "undefined" && !pro["ID"])) {
                            if (typeof pro["sfyxSt"] != "undefined" && pro["sfyxSt"] === "UNVALID") {
                                data.splice(i, 1);
                                delTag = true;
                            }
                        }
                        if (!delTag) {
                            removeIfNotVALID(instance, pro, parentKey + i + ".");
                        }
                    } else if (proType === "array") {
                        removeIfNotVALID(instance, pro, parentKey + i + ".");
                    }
                    if (!delTag) {
                        i++;
                    }
                }
            }

        }

        function getChildData(instance) {

            instance._syncRichArea();

            var data = $.extend(true, {}, instance.get()),
                childs = instance.$children,
                childHandledKeys = [];

            $.each(childs || [], function (i, t) {
                if (t && t.$syncKey) {
                    var childData = getChildData(t);
                    for (var key in t.$syncKey) {
                        data[t.$syncKey[key]] = childData[key];
                        childHandledKeys.push(t.$syncKey[key]);
                    }
                }
            });

            removeIfNotVALID(instance, data, "");

            if (typeof includeNotFormTag !== "boolean" || !includeNotFormTag) {
                removeIfNotForm(instance, data, "", childHandledKeys);
            }
            data.fjUpdateIds = instance.getFjUpdateId();
            return data;
        }

        var data = getChildData(this);
        return data;
    };

    /**
     * 实例扩展方法：获取Json字符串（将getData数据转为json字符串）
     * @param includeNotFormTag 是否包含字段配置中ifForm为false的字段，默认为false
     * @returns {string}
     */
    Rxvm.prototype.getJson = function (includeNotFormTag) {
        return JSON.stringify(this.getData(includeNotFormTag));
    };

    /**
     * 实例扩展方法：更新历史数据
     */
    Rxvm.prototype.updateHistory = function () {
        this.$historyData = $.extend(true, {}, this.getData(true));
    };

    /**
     * 实例扩展方法：是否改变
     * 目前规则（data相对$historyData子键数目等，且值等）
     */
    Rxvm.prototype.ifChange = function () {

        var debugMode = false;

        function checkSame(data, historyData) {
            var type = getType(data),
                historyType = getType(historyData);
            result = true;
            if (type === historyType) {
                if (type === "normal") {
                    result = (data == historyData);
                } else if (type === "array") {
                    if (data.length === historyData.length) {
                        $.each(data, function (i, t) {
                            result = checkSame(t, historyData[i]);
                            return result;
                        })
                    } else {
                        result = false;
                    }
                } else if (type === "object") {
                    // var keyNum = 0,
                    //     historyKeyNum = 0;
                    // for (var key in data) {
                    //     if (data.hasOwnProperty(key)) {
                    //         keyNum++;
                    //     }
                    // }
                    // for (var hKey in historyData) {
                    //     if (historyData.hasOwnProperty(hKey)) {
                    //         historyKeyNum++;
                    //     }
                    // }
                    // if (keyNum === historyKeyNum) {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            result = checkSame(data[key], historyData[key]);
                            if (!result) {
                                if (debugMode) {
                                    RX.log("-- not same: " + key);
                                    RX.log("|  old type: " + typeof historyData[key]);
                                    RX.log("|  old value: " + JSON.stringify(historyData[key]));
                                    RX.log("|  new type: " + typeof data[key]);
                                    RX.log("-- new value: " + JSON.stringify(data[key]));
                                }
                                break;
                            }
                        }
                    }
                    // } else {
                    //     result = false;
                    // }
                }
            } else {
                if (type === "null" && historyData !== 0) {
                    result = (!historyData === !data);
                } else if (historyType === "null" && data !== 0) {
                    result = (!historyData === !data);
                } else {
                    result = false;
                }
            }
            return result;
        }

        //20180726 Zp edit： 比较历史数据仅能比较需要提交的数据，因为列表的状态值等非提交数据不会被记录到历史区中
        // return !checkSame(this.getData(true), this.$historyData);
        return !checkSame(this.getData(), this.$historyData);
    }

    // 全局注册Yox指令：o-tag，自动字段名称（依据字段的con1ig.tagName渲染）
    Rxvm.directive({
        tag: function (_ref) {
            var el = _ref.el,
                node = _ref.node,
                instance = _ref.instance;
            // directives = _ref.directives,
            // attrs = _ref.attrs,
            // component = _ref.component;

            var keypath = node.value;
            if (keypath) {

                var $el = $(el);
                $el.attr("rx-tag", keypath);
                $el.attr("rx-cid", instance.cid);

                return function () {
                };
            }
        }
    });

    /**
     * 日期转换方法
     * @param date
     * @param format
     * @returns {*|string}
     */
    function formatDate(date, format) {
        format = format || 'yyyy-MM-dd';
        var formatDate = date || "";
        if (date != null && $.trim(date.toString()) !== "") {
            var dateStr = date.toString();
            var dateFloat = parseFloat(date);
            if (dateFloat.toString() === dateStr && dateFloat > 86400000) {
                //是日期
                formatDate = new Date(parseFloat(dateStr)).Format(format);
            }
        }
        return formatDate;
    }

    //注册日期转换响应方法
    Rxvm.filter('date', formatDate);

    /**
     * 字典值获取转换方法
     * @param code
     * @param dictCode
     * @returns {string}
     */
    function getDictValue(code, dictCode) {
        var zdx;

        if (!code && code !== 0 && code !== "0") {
            return "";
        }

        if (typeof dictCode === "string") {
            var leftKuo = dictCode.indexOf("("),
                rightKuo = dictCode.indexOf(")");
            if (leftKuo > 0 && rightKuo > leftKuo) {
                try{
                    zdx = eval(dictCode);
                }catch(e){}
            } else {
                zdx = CR.getZdDict(dictCode) || [];
            }
        }

        if (zdx instanceof Array && zdx.length) {
            var valueArr = [];
            var cprCode = "," + code + ",";
            $.each(zdx, function (i, t) {
                if (cprCode.indexOf("," + t.code + ",") > -1) {
                    valueArr.push(t.value);
                }
            });
            return valueArr.join();
        } else {
            return "";
        }
    }

    //注册字典值获取转换方法
    Rxvm.filter('dict', getDictValue);

    /**
     * 可直接展示html文本转换方法
     * @param text
     * @returns {string | *}
     */
    function formatHtml(text) {
        if (text) {
            text = text.toString().replace(/ /g, "&nbsp;");
            text = text.toString().replace(/\n/g, "<br/>");
            return text;
        }
    }

    //注册可直接展示html文本转换方法
    Rxvm.filter('html', formatHtml);

    /**
     * 判断字符串包含
     * @param text
     * @returns {string | *}
     */
    function instr(str, searchItem) {
        var result = false;
        if (str && searchItem) {
            result = (str.indexOf(searchItem) > -1);
        }
        return result;
    }

    //注册判断字符串包含过滤方法
    Rxvm.filter('instr', instr);

    /**
     * 实例扩展私有方法：处理初始值
     * @param newTag
     * @param keypath
     * @param value
     */
    Rxvm.prototype._renderDefaultValue = function (newTag, keypath, value) {
        var that = this,
            config = that.$options.config;

        function initDataSource(data, config, pathArr, newTag) {
            pathArr = pathArr || [];
            if (data) {
                if (data && typeof data === "object") {
                    for (var key in data) {
                        if (data.hasOwnProperty(key) && data[key] && typeof data[key] === "object") {
                            initDataSource(data[key], config, pathArr.concat(key), newTag);
                        }
                    }
                    var notExistId = !data["id"] && !data["ID"];
                    for (var cKey in config) {
                        // if (config.hasOwnProperty(cKey)) {
                        //     var cKeyArr = cKey.split(".");
                        //     var pro = cKeyArr.pop();
                        //     if (pro !== "*" && (newTag ? (!data[pro] && data[pro] !== 0) : typeof data[pro] === "undefined") && equalPathXing(pathArr.join("."), cKeyArr.join("."))) {
                        //         if (pathArr.length) {
                        //             that.set(pathArr.join(".") + "." + pro, notExistId ? (config[cKey].defaultValue || "") : "");
                        //         } else {
                        //             that.set(pro, notExistId ? (config[cKey].defaultValue || "") : "");
                        //         }
                        //     }
                        // }
                        if (config.hasOwnProperty(cKey)) {
                            var cKeyArr = cKey.split(".");
                            var pro = cKeyArr.pop();
                            if (pro !== "*" && (newTag ? (!data[pro] && data[pro] !== 0) : typeof data[pro] === "undefined") && equalPathXing(pathArr.join("."), cKeyArr.join("."))) {
                                if(notExistId && config[cKey].defaultValue){
                                    if (pathArr.length) {
                                        that.set(pathArr.join(".") + "." + pro, config[cKey].defaultValue);
                                    } else {
                                        that.set(pro, config[cKey].defaultValue);
                                    }
                                }else if(!newTag){
                                    if (pathArr.length) {
                                        that.set(pathArr.join(".") + "." + pro, config[cKey].defaultValue || "");
                                    } else {
                                        that.set(pro, config[cKey].defaultValue || "");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        // for (var key in config) {
        //     var pathConfig = config[key];
        //     if (pathConfig && pathConfig.defaultValue) {
        //         that.set(key, pathConfig.defaultValue);
        //     }
        // }
        newTag = (typeof newTag === "boolean" ? newTag : false);
        var data = that.$observer.data;
        var pathArr = [];
        if (!newTag && keypath) {
            data = value;
            pathArr = keypath.split(".");
        }
        initDataSource(data, config, pathArr, newTag);
    };

    /**
     * 实例扩展私有方法：处理初始值
     * @param newTag
     * @param keypath
     * @param value
     */
    Rxvm.prototype._syncData = function () {
        var that = this;

        if(that.$parent && that.$syncKey){
            for(var key in that.$syncKey){
                that.$parent.set(that.$syncKey[key], that.get(key));
            }
        }
    };

    /**
     * 实例扩展私有方法：渲染配置
     * @param el
     * @param config
     * @param reRenderFlag
     * @param instance
     */
    Rxvm.prototype._renderConfig = function (el, config, reRenderFlag, instance) {
        instance = instance || this;
        if (config) {
            CR.checkPropertyJson(config);
            CR.renderProperty(el, config, reRenderFlag, instance);
        }
    };

    /**
     * 实例扩展私有方法：按照选择表达式获取虚拟节点
     * @selector {string} 选择表达式
     * @private
     */
    Rxvm.prototype._findNodes = function (selector) {
        var that = this;

        function findChildNode(parent) {
            var result = [];
            if (parent.parent) {
                return result;
            } else if ($(parent.el).is(selector)) {
                result.push(parent);
            } else if (parent.children) {
                $.each(parent.children, function (i, t) {
                    result = result.concat(findChildNode(t));
                })
            }
            return result;
        }

        var nodes = findChildNode(that.$node);
        return nodes.length ? nodes : null;
    };

    /**
     * 实例扩展私有方法：注册富文本字段实例
     * @param keypath 字段path
     * @param editor 富文本实例
     * @private
     */
    Rxvm.prototype._registerRichArea = function (keypath, editor) {
        var richPool = this.$richPool = this.$richPool || {};
        richPool[keypath] = editor;
    }

    /**
     * 实例扩展私有方法：同步富文本字段
     * @param keypath 同步字段，为空则同步vm所有富文本字段
     * @private
     */
    Rxvm.prototype._syncRichArea = function (keypath) {
        if (!this.$richPool) {
            return;
        }
        var richPool = this.$richPool = this.$richPool,
            that = this;

        function richData(key) {
            if (richPool.hasOwnProperty(key)) {
                try {
                    that.set(key, richPool[key].getSource());
                } catch (e) {
                }

            }
        }

        if (keypath) {
            richData(keypath);
        } else {
            for (var key in richPool) {
                richData(key);
            }
        }
    }

    /**
     * 实例扩展私有方法：注册附件字段视图对象
     * @param keypath 字段path
     * @param editor 富文本实例
     * @private
     */
    Rxvm.prototype._registerFileVm = function (keypath, vm) {
        var addFileIds = [], delFileIds = [];

        //重新渲染的操作数据恢复
        var oldVm = this.$fileVmPool[keypath];
        if(oldVm){
            addFileIds = oldVm.get("addFileIds") || [];
            delFileIds = oldVm.get("delFileIds") || [];
        }
        //data自带的操作数据恢复（可能是由别的json携带并设置为data部分）
        var fjUpdateIds = this.get("fjUpdateIds");
        if(fjUpdateIds){
            if(fjUpdateIds.addFileIds){
                addFileIds = addFileIds.concat(fjUpdateIds.addFileIds.split(","));
            }
            if(fjUpdateIds.delFileIds){
                delFileIds = delFileIds.concat(fjUpdateIds.delFileIds.split(","));
            }
        }

        //更新当前vm的操作记录
        vm.set("addFileIds", addFileIds);
        vm.set("delFileIds", delFileIds);

        //注册至附件vm池
        this.$fileVmPool[keypath] = vm;
    };

    /**
     *
     */
    Rxvm.prototype.getFjUpdateId = function () {
        var addIds = [], delIds = [];

        function getChildFileChange(instance) {
            RX.eachObject(instance.$fileVmPool, function (key, vm) {
                addIds = addIds.concat(vm.get("addFileIds") || []);
                delIds = delIds.concat(vm.get("delFileIds") || []);
            });

            if (instance.$children) {
                RX.eachArray(instance.$children, function (i, child) {
                    getChildFileChange(child);
                })
            }
        }

        getChildFileChange(this);
        return {addIds: addIds.join(), delIds: delIds.join()}
    };

    /**
     * 实例扩展方法：保存附件变化
     */
    Rxvm.prototype.saveFileChange = function () {
        var updateIds = this.getFjUpdateId();
        var addIds = updateIds.addIds, delIds = updateIds.delIds;
        if (addIds.length || delIds.length) {
            $.ajax({
                url: "/attachment/updateFiles",
                data: {
                    addFileIds: addIds,
                    delFileIds: delIds
                },
                success: function (ar) {
                }
            })
        }
    };
    /**********实例功能扩展****************END**********/

    /**********相关工具方法**************START**********/
    /**
     * 工具方法，替换相似位置的路径。
     * @example Rxvm.replacePath("list.1.userName", "userId"); 返回值："list.1.userId"
     * @param path
     * @param replaceStr
     * @returns {*}
     */
    Rxvm.prototype.replacePath = function (path, replaceStr) {
        var pathArr = parseKeypath(path).split(".");
        var reArr = parseKeypath(replaceStr).split(".");
        if (pathArr.length - reArr.length >= 0) {
            var rLen = reArr.length;
            while (rLen--) {
                pathArr.pop();
            }
            return pathArr.concat(reArr).join(".");
        } else {
            return replaceStr;
        }
    };

    /**
     * 工具方法，去除keypath中最后一段
     * @example Rxvm.popPath("list.1.userName"); 返回值："list.1"
     * @param path
     * @returns {*}
     */
    Rxvm.prototype.popPath = function (path) {
        var pathArr = parseKeypath(path).split(".");
        if (pathArr.length > 0) {
            pathArr.pop();
            return pathArr.join(".");
        } else {
            return path;
        }
    };

    /**
     * 工具方法，keypath中增加一段
     * @example Rxvm.pushPath("list.1", "userId"); 返回值："list.1.userId"
     * @param path
     * @param replaceStr
     * @returns {*}
     */
    Rxvm.prototype.pushPath = function (path, pushStr) {
        var pathArr = parseKeypath(path).split(".");
        if (pushStr) {
            pathArr.push(pushStr);
        }
        return pathArr.join(".");
    };
    /**********相关工具方法****************END**********/

}).call(window);