/*****************************************************************
 * rx.page.js
 * 工具：页面管理，页面接口实现与默认操作
 * 最后更新时间：2018-01-29
 * 最后更新人：Zp
 * 更新内容：初步实现新版页面管理控制流，需要补充细节
 *
 * 最后更新时间：2018-01-29
 * 最后更新人：Zp
 * 更新内容：考虑控制窗口管理相关实现的作用域，将Page类移入本作用域
 *
 * 最后更新时间：2018-01-30
 * 最后更新人：Zp
 * 更新内容：实现页面管理与页面基本操作
 *
 * 最后更新时间：2018-01-31
 * 最后更新人：Pc
 * 更新内容：增加了页面的默认自适应（&其他默认操作）、model关联、刷新方法
 *
 * 最后更新时间：2018-01-31
 * 最后更新人：Zp
 * 更新内容：1、register中增加上一历史的model清除
 *          2、register中销毁上一历史的child
 *          3、修改关闭刷新功能
 *          4、自动实现cancelCheck
 *          5、理清全局变量的作用域关系
 *          因为page是由_top层统一创建的，注意其中使用的RX，统一为this.window.RX;
 *          其中_Page中直接定义的方法，因为其中的$为_top层的，需将作用域确定为this.window.document,或者使用this.window.$;
 *          在子页装饰或注入的方法或参数中的方法无需做以上处理，因为其中RX指的即是子页的RX，其中的$指的即是子页的$。
 * ******************************************************************/
(function () {
    //注册RX空间
    window.RX = window.RX || {};

    //注册别名：window/global
    var root = this;

    /**
     * 私有方法：获取页面id
     * @param win 获取层window
     * @returns {string} 页面id
     * @private
     */
    var _getPageId = function (win) {
        if (win == _top) {
            return win.name || "*top";
        } else {
            return _getPageId(win.parent) + "_" + win.name;
        }
    };

    var _isObject = function (value) {
        // 低版本 IE 会把 null 和 undefined 当作 object
        return value && typeof value === 'object';
    }

    /**
     * 获取最小px值
     * @param value1
     * @param value2
     * @returns {*} 自小px值
     * @private
     */
    var _minPx = function (value1, value2) {
        var num1 = parseInt(value1);
        num1 = !isNaN(num1) ? num1 : 10;
        var num2 = parseInt(value2);
        num2 = !isNaN(num2) ? num2 : 10;
        if (num1 < num2) {
            return value1;
        } else {
            return value2;
        }
    }

    /**
     * 窗口管理体系定义
     */
    //引入页为顶层
    if (root == _top) {

        //注册闭包变量：顶层页面池
        var _pagePool = {};

        //FIXME：调试用临时代码：页面池
        RX._pagePool = _pagePool;

        /**
         * @description 通过{@link RX.page}获取
         * @class 页面类
         * @extends RX.Base
         */
        RX.Page = RX.Base.extend(
            /**
             * @lends RX.Page.prototype
             */
            {
                /**
                 * 页面基础属性:主键
                 * @property
                 **/
                id: null,
                /**
                 * 页面基础属性:所属页面window对象
                 * @property
                 **/
                window: null,
                /**
                 * 页面基础属性:层次类型（"frame"嵌套层、"stack"弹出层）
                 * @property
                 **/
                type: null,
                /**
                 * 页面基础属性:当前url
                 * @property
                 **/
                url: null,
                /**
                 * 页面基础属性:参数
                 * @property
                 **/
                param: {},
                /**
                 * 页面基础属性:url历史堆栈
                 * @property
                 **/
                history: [],
                /**
                 * 页面基础属性:关联对象
                 * @property
                 **/
                model: null,
                /**
                 * 页面关系属性:上层页面对象
                 * @property
                 **/
                _prev: null,
                /**
                 * 页面关系属性:下层页面对象数组
                 * @property
                 **/
                _next: [],
                /**
                 * 页面关系属性:父层页面对象
                 * @property
                 **/
                _parent: null,
                /**
                 * 页面关系属性:子层页面对象数组
                 * @property
                 **/
                _child: [],
                /**
                 * 关系方法：获取上层页面
                 * @returns {RX.Page}
                 */
                prev: function () {
                    var prev;
                    if (this._prev) {     //存在本页的上层
                        prev = this._prev;
                    } else if (this._parent) {  //存在本页的父页
                        var parent = this._parent;
                        while (parent && !(prev = parent._prev)) {
                            parent = parent._parent;
                        }
                    }
                    if (!prev) {
                        prev = this;
                    }
                    return prev;
                },
                /**
                 * 关系方法：获取上层页面window
                 * @returns {window}
                 */
                prevWin: function () {
                    return this.prev().window;
                },
                /**
                 * 关系方法：获取父页面
                 * @returns {RX.Page}
                 */
                parent: function () {
                    var parent;
                    if (this._parent) {     //存在本页的父页
                        parent = this._parent;
                    } else {  //未找到，返回本页
                        parent = this;
                    }
                    return parent;
                },
                /**
                 * 关系方法：获取父页面window
                 * @returns {window}
                 */
                parentWin: function () {
                    return this.parent().window;
                },
                /**
                 * 关系方法：获取下层页面
                 * @param options 获取参数，为{index：0}则按位置查找，为{winName:"iframeR"}则按window名称查找，为{pageId:"iframeR_frame1"}则按页面id查找
                 * @returns {RX.Page}
                 */
                next: function (options) {
                    var _next = this._next,
                        next = this;
                    if (_isObject(options)) {
                        var index = options.index, winName, pageId;
                        if ((index || index === 0) && _next.length > index) {
                            next = _next[index];
                        } else if (winName = option.winName) {
                            $.each(_next, function (i, t) {
                                if (t.window.name == winName) {
                                    next = t;
                                    return false;
                                }
                            })
                        } else if (pageId = option.pageId) {
                            $.each(_next, function (i, t) {
                                if (t.id == pageId) {
                                    next = t;
                                    return false;
                                }
                            })
                        }
                    }
                    return next;
                },
                /**
                 * 关系方法：获取下层页面window
                 * @param options 获取参数，为{index：0}则按位置查找，为{winName:"iframeR"}则按window名称查找，为{pageId:"iframeR_frame1"}则按页面id查找
                 * @returns {window}
                 */
                nextWin: function (options) {
                    return this.next(options).window;
                },
                /**
                 * 关系方法：获取子页面
                 * @param options 获取参数，为{index：0}则按子关系数组位置查找，为{winName:"iframeR"}则按window名称查找，为{pageId:"iframeR_frame1"}则按页面id查找
                 * @returns {RX.Page}
                 */
                child: function (options) {
                    var _child = this._child,
                        child = this;
                    if (_isObject(options)) {
                        var index = options.index, winName, pageId;
                        if ((index || index === 0) && _child.length > index) {
                            child = _child[index];
                        } else if (winName = options.winName) {
                            $.each(_child, function (i, t) {
                                if (t.window.name == winName) {
                                    child = t;
                                    return false;
                                }
                            })
                        } else if (pageId = options.pageId) {
                            $.each(_child, function (i, t) {
                                if (t.id == pageId) {
                                    child = t;
                                    return false;
                                }
                            })
                        }
                    }
                    return child;
                },
                /**
                 * 关系方法：获取子页面window
                 * @param options 获取参数，为{index：0}则按位置查找，为{winName:"iframeR"}则按window名称查找，为{pageId:"iframeR_frame1"}则按页面id查找
                 * @returns {window}
                 */
                childWin: function (options) {
                    return this.child(options).window;
                },
                /**
                 * 关系方法：获取兄弟页面
                 * @param options 获取参数，为{index：0}则按位置查找，为{winName:"iframeR"}则按window名称查找，为{pageId:"iframeR_frame1"}则按页面id查找
                 * @returns {RX.Page}
                 */
                brother: function (options) {
                    return this.parent().child(options);
                },
                /**
                 * 关系方法：获取兄弟页面window
                 * @param options 获取参数，为{index：0}则按位置查找，为{winName:"iframeR"}则按window名称查找，为{pageId:"iframeR_frame1"}则按页面id查找
                 * @returns {window}
                 */
                brotherWin: function (options) {
                    return this.brother(options).window;
                },
                /**
                 * 关系方法：获取最上层页面
                 * @returns {RX.Page}
                 */
                uppermost: function () {
                    var uppermostWin = this.uppermostWin();
                    if (uppermostWin) {
                        return RX.getPage(_getPageId(uppermostWin));
                    }
                },
                /**
                 * 关系方法：获取最上层页面window
                 * @returns {window}
                 */
                uppermostWin: function () {
                    var uppermostIndex = -1,
                        $uppermost;
                    $(".layui-layer*[type='iframe']", _top.document).each(function (i, t) {
                        var $t = $(t),
                            id = $t.attr("id"),
                            index = parseInt(id.substring(11), 10);
                        if (index > uppermostIndex) {
                            uppermostIndex = index;
                            $uppermost = $t;
                        }
                    })
                    if (uppermostIndex > -1) {
                        return _top[$uppermost.find('iframe')[0]['name']];
                    }
                },
                /**
                 * 初始化方法
                 * @param targetWin 页面对应window
                 * @param type  页面层次类型
                 * @param openWin   打开该层的window
                 * @param param  页面参数
                 * @returns {RX.Page} 页面实例
                 */
                initialize: function (targetWin, type, openWin, param) {
                    //页面基础属性初始化
                    this.window = targetWin = targetWin || _top;
                    this.id = targetWin.id || _getPageId(targetWin);
                    this.type = type = type || "frame";
                    this._initParam = param || {};
                    this.history = [];
                    this._next = [];
                    this._child = [];

                    RX.log(this.id + "_initialize", RX.logType.FORM);

                    //若当前层为顶层，无需构建关系
                    if (_top.name === targetWin.name) {
                        return this;
                    }

                    //依据页面层次类型，进行页面关系属性初始化
                    //Case_frame:嵌套层
                    if (type === "frame") {
                        //Step_frame:获取嵌套父层，实现父子关系
                        var openPage = RX.getPage(_getPageId(openWin || targetWin.parent));
                        if (openPage) {
                            this._parent = openPage;
                            openPage._child.push(this);
                        }
                    } else if (type === "stack") {  //Case_stack:弹出层
                        //Step_frame:获取弹出上层，实现上下关系
                        var openPage = RX.getPage(_getPageId(openWin));
                        if (openPage) {
                            this._prev = openPage;
                            openPage._next.push(this);
                        }
                    }

                    return this;
                },
                /**
                 * 注册方法（计划页面页面运行时执行，更新关联窗口实例，插入实际对应窗口）
                 * @param targetWin
                 * @returns {RX.Page} 页面实例
                 */
                register: function (targetWin) {
                    RX.log(this.id + "_register", RX.logType.FORM);
                    var that = this;

                    that.resize = null;

                    //窗口更新
                    that.window = targetWin;

                    //路径记录
                    that.url = targetWin.document.location.href;

                    //清空上一历史注册的数据
                    that.model = null;

                    //销毁上一历史存在的child
                    $.each(that._child, function (i, t) {
                        t && t.destory && t.destory();
                    });

                    //url参数解析，并整合param
                    if (that.history.length && that.history.last().url === that.url && !that._initParam) {
                        //解决浏览器刷新参数自动传递
                        that._initParam = that.history.last().param;
                    }
                    that.param = $.extend(true, {}, RX.getUrlParamAsObj(that.url), that._initParam || {});
                    that._initParam = null;

                    //执行注册后置
                    that.afterRegister.apply(that, arguments);

                    //记录历史区的url、参数param、预加载data
                    that.history.push({url: that.url, param: $.extend(true, {}, that.param), data: that._initData});

                    //清除预加载data临时数据
                    that._initData = null;

                    that._registed = true;

                    return that;
                },
                /**
                 * 注册方法后置
                 */
                afterRegister: function () {
                },
                /**
                 * 页面布局自适应
                 */
                // resize: function () {
                //     return this;
                // },
                /**
                 * 页面刷新方法
                 */
                reload: function () {
                },
                /**
                 * 将model传给页面
                 * @param model
                 */
                setModel: function (model) {
                    var page = this;
                    if (model) {
                        page.model = model;
                    }
                },
                /**
                 * 子页传参方法
                 * （若子页页面实例存在，则调整其页面参数；若子页页面实例不存在，则初始化子页页面实例）
                 * @param childWin
                 * @param param
                 * @returns {*}
                 */
                setChildParam: function (childWin, param) {
                    var childId = (this.id + "_" + childWin.name),
                        page = _pagePool[childId];
                    if (page) {
                        if (page._registed) {
                            page.param = $.extend(true, {}, page.param, param);
                            page.history[page.history.length - 1].param = $.extend(true, {}, page.param);
                        } else {
                            page._initParam = $.extend(true, {}, param);
                        }

                    } else {
                        page = new RX.Page(
                            {id: childId},
                            "frame", this.window, param);
                        _pagePool[page.id] = page;
                    }
                    return page;
                },
                /**
                 * 获取窗口打开的大小
                 * @param areaType
                 * @param offset
                 */
                _getLayerArea: function (areaType, offset) {
                    function getMinPx(value1, value2) {
                        var num1 = parseInt(value1);
                        num1 = !isNaN(num1) ? num1 : 10;
                        var num2 = parseInt(value2);
                        num2 = !isNaN(num2) ? num2 : 10;
                        if (num1 < num2) {
                            return value1;
                        } else {
                            return value2;
                        }
                    }

                    var area;
                    if (areaType === "small") {
                        area = [450, 350];
                    } else if (areaType === "medium") {
                        area = [700, 500];
                    } else if (areaType === "big") {
                        area = [900, 600];
                    } else if (areaType === "tree") {
                        area = [400, 600];
                    } else {
                        area = [parseFloat(areaType[0]), parseFloat(areaType[1])];
                    }
                    var topWidth = $(_top).width(), topHeight = $(_top).height();
                    //如果不偏移的话宽度和高度，和最大高度宽度比较
                    area = [getMinPx(topWidth, area[0]), getMinPx(topHeight, area[1])];
                    if (offset) {
                        if (typeof offset === "object") {
                            offset = [parseFloat(offset[0]), parseFloat(offset[1])];
                        } else {
                            var offSetNum = parseFloat(offset);
                            //可能是快捷方式，如t表示快捷设置顶部坐标
                            if (!offSetNum.isNaN()) {
                                offset = [offSetNum]
                            }
                        }
                    } else {
                        /*
                        *   需要自动设置偏移量的情况
                        *   打开的窗口完全覆盖了父亲的窗口
                        * */
                        var upperWin = RX.page.uppermostWin();
                        if (upperWin) {
                            var layerIndex = layer.getFrameIndex(upperWin.name);
                            //上一层存在layer的弹窗
                            if (layerIndex) {
                                //获取layer所在位置
                                var $uppsetLayer = $("#layui-layer" + layerIndex);
                                var parentWidth = $uppsetLayer.width(), parentHeight = $uppsetLayer.height();
                                if ((area[0] >= parentWidth - 20 && area[0] <= parentWidth + 20) && (area[1] >= parentHeight - 20 && area[1] <= parentHeight + 20)) {
                                    var offsetobj = $uppsetLayer.offset();
                                    //覆盖了，需要进行偏移量的设置，向下和右边移动40
                                    offset = [(offsetobj.top + 40), (offsetobj.left + 40)];
                                }
                            }
                        }
                    }
                    var returnObj = {};
                    //字符串表示快捷方式，数组表示确定的数据
                    //偏移之后可能会超过最大高度和宽度
                    if (offset && typeof offset === "object") {
                        //加上偏移量不能大于window的大小
                        //offset[0]是top
                        //area[1]是高度
                        if (offset[1]) {
                            //超过了最大高度
                            var heightOffset1 = area[1] + offset[0] - topHeight;
                            if (heightOffset1 > 0) {
                                //不应该直接减，在底部即可
                                area[1] = area[1] - heightOffset1;
                            }
                            var widthOffset = area[0] + offset[1] - topWidth;
                            if (widthOffset > 0) {
                                area[0] = area[0] - widthOffset;
                            }
                            returnObj.offset = [offset[0] + "px", offset[1] + "px"];
                        } else {
                            var heightOffset2 = area[0] + offset[0] - topWidth;
                            if (heightOffset2 > 0) {
                                area[0] = area[0] - heightOffset2;
                            }
                            returnObj.offset = offset[0] + "px";
                        }
                    }
                    else {
                        returnObj.offset = offset;
                    }
                    returnObj.area = [area[0] + "px", area[1] + "px"];
                    return returnObj;
                },
                /**
                 * 打开弹出层
                 * @param options 弹出参数
                 * 具体参数说明：options= {
                 *      openWin: window, //弹出层关联的window，默认为本页window
                 *      param:{},   //传入弹出页的参数,必须以object的方式传入
                 *      title: "",  //弹出层标题
                 *      url: "",  //弹出层url
                 *      //弹出层样式类型，默认为"medium"，可选值：“small”（小）、“medium”（中）、“big”（大）、“tree”（树）或是个性配置,两项的字符串数组，如：["200px","300px"]。
                 *      areaType: "medium",
                 *      offset：'auto', //偏移值,默认为'auto'即垂直水平居中；若为类似'100px'，则只定义top坐标，水平保持居中；若为 ['100px', '50px']，则同时定义top、left坐标；
                 *                      //若为't'，则快捷设置顶部坐标；若为 'r'，则快捷设置右边缘坐标，若为'b'，则快捷设置底部坐标；若为'l'，则快捷设置左边缘坐标；
                 *                      //若为'lt'，则快捷设置左上角；若为'lb'，则快捷设置左下角；若为'rt'，则快捷设置右上角；若为'rb'，则快捷设置右下角。
                 *      shade： true,    //开启遮蔽，默认为true
                 *      id：null,    //弹出层id，如设置id不为空，则同id弹出层不会被多次弹出
                 *      callBacks:{     //个性回调注册
                 *          success:function(){},  //弹出页面加载成功(onload)
                 *          cancel:function(){},    //弹出页面点击叉号
                 *          end:function(){}    //弹出页面关闭(类似于onunload)
                 *      }
                 * }
                 * @returns {*} 弹出层index
                 */
                 open: function (options) {
                    options = $.extend(true, {}, options);
                    options.openWin = this.window;
                    var url = options.url || "",
                        winOrigin = document.location.origin,
                        crossOriginTag = url.startWith("http") && !url.startWith(winOrigin + RX.ctxPath), //带弹出页跨域标志
                        callBacks = options.callBacks,
                        areaType = options.areaType || "medium",
                        area;
                    var areaObj = this._getLayerArea(areaType, options.offset);
                    area = areaObj.area;
                    var offset = areaObj.offset;
                    var targetPage = null;
                    var openSettings = {
                        moveOut: true,
                        type: 2,
                        title: options.title,
                        area: area,
                        maxmin: true,
                        content: RX.handlePath(url),
                        success: function (layero, index) {
                            if (crossOriginTag) {
                                if (callBacks && typeof(callBacks.success) === "function") {
                                    callBacks.success(layero, index);
                                }
                                return;
                            } else {
                                var iframeWin = window[layero.find('iframe')[0]['name']];
                                targetPage = RX.getPage(_getPageId(iframeWin));
                                if (callBacks && typeof(callBacks.success) === "function") {
                                    callBacks.success(layero, index);
                                }
                            }
                        },
                        end: function () {
                            if (crossOriginTag) {
                                if (callBacks && typeof(callBacks.end) === "function") {
                                    callBacks.end();
                                }
                                return;
                            } else {
                                if (_top.ZENG)
                                    _top.ZENG.msgbox.hide();
                                if (targetPage) {
                                    targetPage.destory();
                                }
                                if (callBacks && typeof(callBacks.end) === "function") {
                                    callBacks.end();
                                }
                            }
                        },
                        cancel: function () {
                            if (crossOriginTag) {
                                if (callBacks && typeof(callBacks.cancel) === "function") {
                                    callBacks.cancel();
                                }
                                return true;
                            } else {
                                if (targetPage) {
                                    if (!targetPage.cancelCheck()) {
                                        return false;
                                    }
                                }
                                if (callBacks && typeof(callBacks.cancel) === "function") {
                                    callBacks.cancel();
                                }
                                return true;
                            }
                        }
                    };
                    if (offset) {
                        openSettings.offset = offset;
                    }
                    if (typeof(options.shade) !== "undefined") {
                        openSettings.shade = options.shade;
                    }
                    if (typeof(options.id) !== "undefined") {
                        openSettings.id = options.id;
                    }
                    var index = _top.layer.open(openSettings);

                    var page = new RX.Page(
                        {id: (_top.name || "*top") + "_" + "layui-layer-iframe" + index},
                        "stack", options.openWin, options.param);
                    _pagePool[page.id] = page;
                    return index;
                },
                /**
                 * 页面跳转
                 * @param url 待跳转地址
                 * @param param 初始参数
                 * @param loadHistory 是否加载同url历史数据，默认为false
                 */
                goto: function (url, param, loadHistory) {
                    if (url) {
                        this._initParam = $.extend(true, {}, param);
                        if(loadHistory){
                            this.presetData(this.findHistoryData(url));
                        }
                        this.window.location = RX.handlePath(url);
                    }
                },
                /**
                 * 路径回退(默认加载历史记录)
                 * @param num 回退次数，默认为1
                 * @param runCancelTag 是否执行关闭验证，默认为false
                 * @param loadHistory 是否加载同url历史数据，默认为true
                 */
                back: function (num, runCancelTag, loadHistory) {
                    num = num || 1;
                    if(typeof loadHistory !== "boolean"){
                        loadHistory = true;
                    }
                    var history = this.history,
                        canBack = true, backObj;
                    if (!RX.exist(runCancelTag)) {
                        runCancelTag = false;
                    }
                    if (runCancelTag) {
                        canBack = this.cancelCheck();
                    }
                    if (canBack && history.length) {
                        for (var i = 0; i <= num; i++) {
                            if (history.length) {
                                backObj = history.pop();
                            }
                        }
                        if (backObj) {
                            if(loadHistory){
                                this.presetData(backObj.data);
                            }
                            this.goto(backObj.url, backObj.param);
                        }
                    }
                },
                /**
                 * 页面刷新
                 * @param param 待传递参数
                 * @param loadHistory 是否加载同url历史数据，默认为false
                 */
                refresh: function (param, loadHistory) {
                    if (this.history.length) {
                        var hisObj = this.history.pop();
                        param = param ||hisObj.param;
                        if(loadHistory){
                            this.presetData(hisObj.data);
                        }
                        this.goto(hisObj.url, param);
                    }
                },
                /**
                 * 页面关闭验证
                 * @returns {boolean}
                 */
                cancelCheck: function () {
                    // var page = this;
                    // if (page.model && page.model._modelType === "detail" && page.model.changeValidate()) {
                    //     layer.confirm("页面已修改，确认关闭吗", function (index) {
                    //         layer.close(index);
                    //         page.close();
                    //     });
                    //     return false;
                    // }
                    return true;
                },
                /**
                 * 关闭弹出层（本层开始）
                 * @param num 关闭层数，默认为1
                 * @param runCancelTag 是否执行关闭验证，默认不执行
                 */
                close: function (num, runCancelTag) {
                    /**
                     * 私有方法：向父层页面查找弹出层页面
                     * @param childPage 子层页面
                     */
                    var _findParentStack = function (childPage) {
                        var parentPage = childPage;
                        while (parentPage) {
                            if (parentPage.type === "stack") {
                                return parentPage;
                            } else {
                                parentPage = parentPage._parent;
                            }
                        }
                        return null;
                    };

                    if (!RX.exist(runCancelTag)) {
                        runCancelTag = false;
                    }
                    // if (!RX.exist(reloadPrevTag)) {
                    //     reloadPrevTag = true;
                    // }
                    num = num || 1;
                    var closeStack = [], targetPage = this, prevestPage = targetPage._prev;
                    for (var i = 0; i < num; i++) {
                        if (!targetPage) {
                            break;
                        }
                        if (targetPage.type === "stack") {
                            closeStack.push(targetPage);
                            prevestPage = targetPage._prev;
                            targetPage = _findParentStack(prevestPage);
                        } else if (targetPage.type === "frame") {
                            var targetPage = _findParentStack(targetPage);
                            if (!targetPage) {
                                break;
                            }
                            closeStack.push(targetPage);
                            prevestPage = targetPage._prev;
                            targetPage = _findParentStack(targetPage);
                        }
                    }
                    var ifCanClose = true;

                    function closeWins() {
                        $.each(closeStack, function (i, t) {
                            if (!runCancelTag || t.cancelCheck()) {
                                debugger
                                layer.close(layer.getFrameIndex(t.window.name));
                            } else {
                                ifCanClose = false;
                                return false;
                            }
                        });
                    }

                    if (RX.browser.type === "IE") {
                        setTimeout(function () {
                            closeWins();
                        })
                    } else {
                        closeWins();
                    }

                    return ifCanClose;
                    // if (reloadPrevTag && prevestPage && prevestPage.reload) {
                    //     prevestPage.reload();
                    // }
                },
                /**
                 * 关闭所有弹出层
                 */
                closeAll: function () {
                    if (RX.browser.type === "IE") {
                        setTimeout(function () {
                            layer.closeAll('iframe');
                        })
                    } else {
                        layer.closeAll('iframe');
                    }
                },
                /**
                 * 销毁页面实例
                 */
                destory: function () {
                    RX.log(this.id + "_destory", RX.logType.FORM);
                    var page = this;
                    //step_1:按情况清除对外关系
                    //case_1_prev:存在上层
                    if (page._prev) {
                        //step_1_prev_1:清除上层中本层的关系
                        $.each(page._prev._next, function (i, t) {
                            if (t.id === page.id) {
                                page._prev._next.splice(i, 1);
                                return false;
                            }
                        });
                        //case_1_prev_next:存在下层
                        if (page._next.length) {
                            //step_1_prev_next_1:将本层的下层关系赋予上层
                            $.each(page._next, function (i, t) {
                                t._prev = page._prev;
                                page._prev._next.push(t);
                            })
                        }
                    } else {  //case_1_!_prev:不存在上层
                        //case_1_!prev_next:存在下层
                        if (page._next.length) {
                            //step_1_!prev_next_1:销毁本层的下层
                            //(因本层已不存在，且无上层可以赋予关系，可以直接销毁下层)
                            $.each(page._next, function (i, t) {
                                t.destory();
                            })
                        }
                    }
                    //case_1_child:存在子层
                    if (page._child.length) {
                        //step_1_children:销毁本层的子层
                        //(父层控制子层生命周期，父层销毁，子层html销毁，子层无效)
                        $.each(page._child, function (i, t) {
                            //t.destory();
                        })
                    }
                    //case_1_parent:存在父层
                    if (page._parent) {
                        //step_1_parent_1:销毁父层中本层的关系
                        $.each(page._parent._child, function (i, t) {
                            if (t.id === page.id) {
                                page._parent._child.splice(i, 1);
                                return false;
                            }
                        })
                    }
                    //step_2:从页面池中删除自身
                    delete _pagePool[page.id];
                },
                //*************页面数据操作接口*****************Zp.20180919
                /**
                 * 设置当前页历史数据
                 * @param data
                 */
                setData: function(data) {
                    var history = this.history;
                    history.last().data = data;
                },
                /**
                 * 获取当前页历史数据
                 */
                getData: function(){
                    return this.history.last().data;
                },
                /**
                 * 清除当前页历史数据
                 */
                clearData: function() {
                    this.history.last().data = null;
                },
                /**
                 * 预设置跳转页历史数据
                 * @param data 待设置数据
                 */
                presetData: function(data) {
                    if(data){
                        data = $.extend(true, {}, data);
                    }
                    this._initData = data;
                },
                /**
                 * 查找历史数据
                 * @param url 待查找的相同url
                 * @returns {*}
                 */
                findHistoryData: function(url) {
                    var history = this.history,
                        data;
                    if(history.length > 1){
                        for (var i = history.length - 1; i >= 0; i--){
                            if(url == history[i].url){
                                data = history[i].data;
                                break;
                            }
                        }
                    }

                    return data;
                },
                /**
                 * 清除历史数据
                 * @param url 待清除历史数据url，若为空，则清除所有历史数据
                 */
                clearHistoryData: function(url) {
                    var history = this.history;
                    if(history.length){
                        for (var i = 0; i < history.length; i++){
                            if(!url || url == history[i].url){
                                history[i].data = null;
                            }
                        }
                    }
                }
            }
        );

        /**
         * 顶层页面方法：通过id获取页面实例
         * @param id 页面实例的id
         * @returns {*} 页面实例
         */
        RX.getPage = function (id) {
            return _pagePool[id];
        };

        /**
         * 顶层页面方法：新增页面实例
         * @param targetWin 待新增页面关联的window，默认为本层window
         * @returns {*} 页面实例
         */
        RX.addPage = function (targetWin) {
            //默认为本层
            targetWin = targetWin || root;
            //获取或创建初始化的页面实例
            var page = RX.getPage(_getPageId(targetWin)) || new RX.Page(targetWin);
            //注册页面池
            _pagePool[page.id] = page;
            return page;
        }

        /**
         * 加载时自动构建当前页页面实例
         */
        RX.page = new RX.Page(root);
        //注册页面池
        _pagePool[RX.page.id] = RX.page;

    } else {    //引入页非顶层

        //注册别名：顶层RX命名空间
        var tRX = _top.RX;

        /**
         * 子层页面方法：通过id获取页面实例
         * @param id 页面实例的id
         * @returns {*} 页面实例
         */
        RX.getPage = function (id) {
            return tRX.getPage(id);
        };

        /**
         * 加载时由_top自动构建当前页页面实例
         */
        RX.page = tRX.addPage(root);
    }



    //默认操作：装饰本层页面实例
    RX.page.makeup({
        needLoading: false,
        loadingBgColor: "#e5eaf3",
        loadingDelayTime: 100,
        _loadingPool: [],
        showLoading: function (tag) {
            if (!this.needLoading) {
                return;
            }
            tag = (tag && tag.toString()) || "body";
            if ($.inArray(tag, this._loadingPool) < 0) {
                this._loadingPool.push(tag);
                var $loading = $("#_sync_show_stack");
                if (!$loading.length) {
                    document.write("<div id='_sync_show_stack' style='position:absolute;top:0px; left: 0px; background-color: " +
                        (this.loadingBgColor || "#fff") + ";z-index: 9999;width:100%;height:100%;'></div>");
                } else {
                    $loading.show();
                }
            }
        },
        hideLoading: function (tag) {
            tag = (tag && tag.toString()) || "body";
            var index = $.inArray(tag, this._loadingPool);
            if (index > -1) {
                this._loadingPool.splice(index, 1);
            }
            var $loading = $("#_sync_show_stack");
            if (!this._loadingPool.length && $loading.length) {
                var that = this;
                setTimeout(function () {
                    if (!that._loadingPool.length && $loading.length) {
                        $loading.hide();
                    }
                }, that.loadingDelayTime);

            }
        },
        _autoResize: function () {
            var that = this;
            if (typeof that.resize !== "function" || that._tempResize === that.resize) {
                var funcArr = [];
                if ($(".left_side").length > 0 && $(".right_content").length > 0) {
                    funcArr.push(RX.resizeMenu);
                }
                if ($(".left_side_tree").length > 0 && $(".right_content").length > 0) {
                    funcArr.push(RX.resizeTree);
                }
                if ($(".form_box").length > 0) {
                    funcArr.push(RX.resizeForm);
                }
                if ($(".base_box").length > 0) {
                    funcArr.push(RX.resizeTable);
                }
                that._tempResize = that.resize = function () {
                    $.each(funcArr, function (i, t) {
                        t();
                    })
                }
            }

            if (typeof that.resize === "function") {
                that.resize();
            }
        },
        afterRegister: function () {
            var that = this;
            this.showLoading();
            $(function () {
                RX.log(this.id + " resize", RX.logType.FORM);

                that._autoResize();

                $(window).resize(function () {
                    if (typeof that.resize === "function") {
                        that.resize();
                    }
                });

                that.hideLoading();
                // RX.pageAjax();
            });
        }
    });
    //默认操作：注册本层页面实例
    RX.page.register(root);

}).call(this);