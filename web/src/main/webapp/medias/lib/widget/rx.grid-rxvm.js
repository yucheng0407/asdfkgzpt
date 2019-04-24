/**
 * rx.yox.grid
 * gird组件封装
 * 创建时间：2018-05-21
 * 创建人：Zp
 * 创建内容：新增文件，简单实现
 */
(function () {

    //构建自动搜索区
    function buildAutoQueryBox(instance) {
        var $queryBox = instance.$queryBox;
        if ($queryBox) {
            instance.autoQuery = new Rxvm({
                widget: RX.AutoQuery,
                data: {
                    query: instance.get("query")
                },
                el: $queryBox.el,
                config: instance.$options.config,
                settings: instance.$options.settings.autoQueryBox,
                methods: {
                    query: function () {
                        instance.query.call(instance);
                    },
                    clear: function () {
                        instance.clear.call(this);
                    }
                },
                _afterSetValue: function () {
                    instance.set("query", this.get("query"));
                }
            });
            //是否绑定回车事件，默认绑定
            if (instance.$options.settings.autoQueryBox.canEnter) {
                RX.regEnter(function () {
                    instance.query.call(instance);
                }, $queryBox.el);
            }
        }
    }

    var buildPageBox = function (instance) {
        var settings = instance.$options.settings,
            queryList = instance.get("queryList"),
            total = queryList.length,
            limit = settings.limit;

        $(instance.$listBox.el).children(".rx-paging").remove();

        if (!settings.paged || limit == 0 || total == 0) {
            return;
        }

        var total = queryList.length;

        var limit = settings.limit;
        var pageNo = instance.get("pageNo") || 1;

        if (total != null && total !== 0) {
            var pageTotal = Math.ceil(total / limit); //页数
            var $paging, $pageUl, $pageDiv, $fristLi, $lastLi;//jq对象
            var sLi = "";//分页li拼接字符串

            function buildPages() {
                sLi = "";
                //构造pagenate结构拼接字符串
                var sPageing = "<div class='rx-paging'>" +
                    "<ul class='rx-pagenate'><li class='rx-first paged'>首页</li>" +
                    "<li class='rx-pageRoll'>" +
                    "<div class='rx-pRoll' style='width: 175px;'>" +
                    "<ul class='rx-pRollUl'>";
                var start = 1;
                var end = pageTotal;
                if (pageTotal <= 7) {
                    start = 1;
                    end = pageTotal;
                } else if (pageTotal - pageNo <= 3) {
                    start = pageTotal - 6;
                    end = pageTotal;
                } else {
                    start = Math.max(1, pageNo - 3);
                    end = Math.min(pageTotal, Math.max(pageNo + 3, 7));
                }
                if (start > 1) {
                    sLi += "<li class='pagedn'>...</li>";
                }
                for (var i = start; i <= end; i++) {
                    if (i == pageNo)
                        sLi += "<li class='clicked paged'>" + i + "</li>";
                    else
                        sLi += "<li class='paged'>" + i + "</li>";
                }
                if (end < pageTotal) {
                    sLi += "<li class='pagedn'>...</li>";
                }
                sPageing += sLi + "</ul></div></li>" +
                    "<li class='rx-last paged'>末页</li></ul>" +
                    "<span style='display:block;width:auto;float:right;padding:0 10px;height:30px;font-size: 12px;text-indent: 15px;line-height:30px;color: #999'>" +
                    "共<b style='padding:0 3px;color:#666;font-weight:normal;'>" + Math.ceil(total / limit) + "</b>页" +
                    "<b style='padding:0 3px;color:#666;font-weight:normal;'>" + total + "</b>条数据</span>" +
                    "</div><div style='clear:both'></div>";
                $paging = $(sPageing);
                $(instance.$listBox.el).append($paging);
                $pageUl = $('ul.rx-pagenate ', $paging);
                $pageDiv = $('div.rx-pRoll', $paging);
                $fristLi = $("li.rx-first", $paging);
                $lastLi = $("li.rx-last", $paging);
                if (pageNo > 1) {
                    $fristLi.removeClass("disabled");
                } else {
                    $fristLi.addClass("disabled");
                }
                if (pageNo < pageTotal) {
                    $lastLi.removeClass("disabled");
                } else {
                    $lastLi.addClass("disabled");
                }

                var width = $paging.find(".rx-pRollUl").find("li.paged").length * 29
                    + $paging.find(".rx-pRollUl").find("li.pagedn").length * 28;
                $pageUl.css("width", "auto");
                $pageDiv.css('width', width);
            }

            buildPages();

            function _bindBigLisEvents() {
                // $pageUl.on("click mouseenter mouseleave", "li.paged", function (event) {
                $pageUl.on("click", "li.paged", function (event) {
                    var $clkedLi = $(this);
                    if (event.type === "mouseenter") {
                        if (!$clkedLi.hasClass("clicked") && !$clkedLi.hasClass("disabled"))
                            $clkedLi.addClass("hover");
                    } else if (event.type === "mouseleave") {
                        $clkedLi.removeClass("hover");
                    } else if (!$clkedLi.hasClass("disabled")) {
                        //add by zl
                        if ($clkedLi.hasClass("rx-first")) {
                            pageNo = 1;
                        } else if ($clkedLi.hasClass("rx-last")) {
                            pageNo = pageTotal;
                        } else {
                            pageNo = $clkedLi.text();
                            $clkedLi.addClass("clicked");
                        }

                        instance.set("pageNo", pageNo);

                        instance.renderGrid();
                    }
                });
            }

            _bindBigLisEvents();
        }
    };

    //获取控件需要的postData型数据
    function getPostData(obj) {
        //如需更新数据，调用同步dom模型数据接口
        var jsonstr = "[";
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                value = value ? value : "";
                // value = RX.replaceStrChar(value, "\"", "\\\"");
                // value = RX.replaceStrChar(value, "\"", "\\\"");
                jsonstr += '{"zdName":"' + key + '","value":"' + encodeURI(encodeURI(value)) + '"' + '},';
            }
        }
        if (jsonstr.length > 1) {
            jsonstr = jsonstr.substr(0, jsonstr.length - 1);
        }
        jsonstr += "]";
        return jsonstr;
    }

    //自动渲染listBox逻辑
    function renderAutoListBox(instance, param) {
        var c = $(instance.$listBox.el),
            o = {},
            settings = instance.$options.settings || {},
            listSettings = settings.autoListBox || {};
        for (var i in listSettings) {
            if (listSettings.hasOwnProperty(i) && listSettings[i] !== undefined) {
                o[i] = listSettings[i];
            }
        }
        o.ModelName = instance.cid;
        o.url = settings.url.replace(/#/g, "%23").replace(/(' + 'random' + '=)([^&]*)/gi, 'random' + '=' + Math.random());
        param = param || instance.get("query") || {};
        o.postData = getPostData(param);
        o.pagination = settings.paged;
        o.limit = settings.limit;
        o.canCopy = listSettings.canCopy;
        o.fastPagenate = false;
        //Zp.20180910.传递页码，用于刷新当前页
        o.pageNo = instance.get("pageNo");
        //Zp.20180917.增加传入提示信息配置msg
        o.msg = listSettings.msg;
        //Zp.20180918.新版生命周期注册
        o.onLoad = listSettings.onLoad;
        o.afterLoad = listSettings.afterLoad || settings.afterLoad;
        o.afterError = settings.afterError;
        o.afterNoData = settings.afterNoData;
        //Zp.20180920.本地数据载入
        if(!o.url){
            o.localData = instance.get("queryList") || [];
        }
        //Zp.20180927.列表类型载入
        o.gridType = instance.$gridType;
        c.datagrid(o, !instance.get("passValidate"));
    }

    //获取分页数据
    function getPagedData(instance) {
        var settings = instance.$options.settings,
            queryList = instance.get("queryList");
        if (settings.paged && settings.limit) {
            var pageNo = instance.get("pageNo") || 1,
                limit = settings.limit,
                start = (pageNo - 1) * limit,
                end = pageNo * limit;
            if (start >= queryList.length) {
                instance.set("pageList", []);
                instance.set("msg", (settings.msg && settings.msg.noData) || "");
            } else {
                instance.set("pageList", queryList.slice(start, end));
            }
        } else {
            instance.set("pageList", instance.get("queryList"));
        }
        buildPageBox(instance);

        if(!instance.get("pageList").length){
            instance.set("status", "noData");
        }else{
            instance.set("status", "success");
        }
    }

    //获取Url对应数据
    function getUrlData(instance) {
        var that = instance,
            settings = instance.$options.settings;

        if (that.get("needQuery")) {
            that.set("queryList", []);
            that.set("msg", (settings.msg && settings.msg.loading) || "");
            $.ajax({
                type: "post",
                url: that.$options.settings.url,
                dataType: "json",
                data: {params: getPostData(that.get("query") || {}), allPage: true},
                success: function (ar) {
                    if (ar.success) {
                        var list = ar.data.rows;
                        if (list && list.length) {
                            that.set("queryList", list);
                        } else {
                            that.set("queryList", []);
                            that.set("pageList", []);
                            that.set("msg", (settings.msg && settings.msg.noData) || "");
                        }
                        getPagedData(that);
                        //数据驱动视图的变化，所有需要等视图渲染完成
                    } else {
                        that.set("msg", (settings.msg && settings.msg.error) || "");
                        that.set("status", "error");
                    }
                },
                error: function(){
                    that.set("msg", (settings.msg && settings.msg.error) || "");
                    that.set("status", "error");
                }
            });
            that.set("needQuery", false);
        } else {
            getPagedData(that);
        }
    }

    //默认前端查找逻辑
    function defaultQueryData(instance) {
        var that = instance,
            settings = instance.$options.settings;

        if (instance.get("needQuery")) {
            var query = instance.get("query") || {},
                list = instance.get("list") || [],
                queryList = [],
                onQueryData = instance.$options.settings && instance.$options.settings.onQueryData;
            if(typeof onQueryData === "function"){
                queryList = onQueryData.call(instance, list, query);
            }else{
                queryList = list;
            }
            if (queryList.length) {
                instance.set("queryList", queryList);
            } else {
                instance.set("queryList", []);
                instance.set("pageList", []);
                that.set("msg", (settings.msg && settings.msg.noData) || "");
            }
            getPagedData(instance);
            instance.set("needQuery", false);
        } else {
            getPagedData(instance);
        }
    }

    RX.Grid = {
        data: {
            selectAll: false,
            query: {},
            list: [],
            queryList: [],
            pageList: [],
            // msg: "数据加载中……",
            pageNo: 1,
            needQuery: true,
            passValidate: true,
            status: ""
        },
        config: {
            "list.*.selected": {ifForm: false},
            "queryList.*.selected": {ifForm: false},
            "pageList.*.selected": {ifForm: false}
        },
        defaultTemplate: "loadTpl:gridTpl",
        methods: {
            /**
             * 对外接口：查询列表数据
             */
            queryData: function () {
                var that = this;
                if (that.$options.settings.url) {
                    getUrlData(that);
                } else {
                    defaultQueryData(that);
                }
            },
            /**
             * 对外接口：渲染列表
             */
            renderGrid: function (param) {
                //执行渲染时事件
                if (typeof this.onRenderGrid === "function") {
                    var result = this.onRenderGrid(param);
                    if (RX.isBooleanFalse(result)) {
                        return false;
                    }
                }

                if (param) {
                    this.set("query", param);
                }

                if (!this.$listBox) {
                    return false;
                }

                var queryVm = this.autoQuery || this;
                this.set("passValidate", queryVm.ruleValidate({noTip: true}));

                if (this.$options.settings.autoListBox.enable) {
                    if(!this.$options.settings.url){
                        var onQueryData = this.$options.settings.onQueryData, list = this.get("list");
                        if(typeof onQueryData === "function"){
                            var queryList = onQueryData.call(this, list, this.get("query")) || [];
                        }else{
                            queryList = list;
                        }
                        this.set("queryList", queryList);
                    }
                    renderAutoListBox(this);
                } else if (typeof this.queryData === "function") {
                    this.queryData();
                }
            },
            /**
             * 对外接口：刷新列表
             */
            reloadGrid: function (param) {
                this.set("pageNo", 1);
                this.set("needQuery", true);
                this.renderGrid(param);
            },
            /**
             * 对外接口：刷新当前页
             */
            reloadCurrent: function (param) {
                this.set("needQuery", true);
                this.renderGrid(param);
            },
            /**
             * 对外接口：获取选中项
             */
            getSelected: function () {
                var that = this,
                    selectArr = [];
                if (that.$options.settings.autoListBox.enable) {
                    var c = $(that.$listBox.el);
                    selectArr = c.datagrid('getSelected', true);
                } else {
                    //FixMe:逻辑存在漏洞，可能是查询无数据的queryList，且select区待调整
                    var selList = that.get("pageList");
                    if (!selList.length) {
                        selList = that.get("queryList");
                    }
                    if (!selList.length) {
                        selList = that.get("list");
                    }
                    $.each(selList, function (i, t) {
                        if (t.selected && t.sfyxSt !== "UNVALID") {
                            selectArr.push(t);
                        }
                    })
                }
                // console.log("选中项", selectArr);
                return selectArr;
            },
            /**
             * 对外接口：获取选中项object(key为path，对自动列表无效，返回getSelected值)
             */
            getSelectedPathObject: function () {
                var that = this,
                    selectItem = [];
                if (that.$options.settings.autoListBox.enable) {
                    var c = $(that.$listBox.el);
                    selectItem = c.datagrid('getSelected', true);
                } else {
                    //FixMe:逻辑存在漏洞，可能是查询无数据的queryList，且select区待调整
                    var selList = that.get("pageList"),
                        path = "pageList.";
                    if (!selList.length) {
                        selList = that.get("queryList");
                        path = "queryList.";
                    }
                    if (!selList.length) {
                        selList = that.get("list");
                        path = "list.";
                    }
                    if (!selList.length) {
                        selectItem = [];
                    } else {
                        selectItem = [];
                        $.each(selList, function (i, t) {
                            var temp = {};
                            if (t.selected) {
                                temp.key = path + i;
                                temp.value = t;
                                selectItem.push(temp);
                                // selectItem[path + i] = t;
                            }
                        })
                    }
                }
                return selectItem;
            },
            /**
             * 对外接口：序号渲染
             */
            renderOrder: function () {
                var orderTag = ".orderTag",
                    node = this.$node;
                if (orderTag && node && node.el) {
                    var $el = $(node.el);
                    $el.find("tbody").each(function () {
                        $(this).find(orderTag).each(function (i, t) {
                            $(t).text(i + 1);
                        });
                    });
                }
            },
            /**
             * 内置事件响应：点击查询按钮
             */
            query: function () {
                //记录搜索区操作
                var historyKey = this.$historyKey;
                if (historyKey) {
                    var data = RX.page.getData();
                    data[historyKey].query = this.get("query");
                }
                this.reloadGrid();
            },
            /**
             * 内置事件响应：点击清空按钮
             */
            clear: function () {
                //执行清空时事件
                if (typeof this.onClearSearch === "function") {
                    var result = this.onClearSearch();
                    if (typeof result === "boolean" && !result) {
                        return false;
                    }
                }

                var config = this.$options.config || {};
                var clearPathArr = [];
                var that = this;
                for (var key in config) {
                    if (config.hasOwnProperty(key) && key.startWith("query.")) {
                        if (config[key].canClear) {
                            clearPathArr.push(key);
                        }
                    }
                }
                if (clearPathArr.length) {
                    this.empty(clearPathArr);
                }

                setTimeout(function () {
                    that.query.call(this);
                }, 100);

            },
            /**
             * 内置事件响应：选中/反选
             */
            select: function ($keypath, $event) {
                var that = this,
                    oldValue = this.get($keypath + ".selected"),
                    selectType = this.$options.settings.selectType;
                if (!oldValue) {
                    if (selectType === "single") {
                        var usingList = $keypath.split(".")[0];
                        $.each(that.get(usingList), function (i) {
                            that.set(usingList + "." + i + ".selected", false);
                        });
                        $.each(that._findNodes(".selectRow") || [], function (i, t) {
                            $(t.el).removeClass("selectRow");
                        })
                    }
                    this.set($keypath + ".selected", true);
                    $($event.originalEvent.currentTarget).addClass("selectRow");
                } else {
                    this.set($keypath + ".selected", false);
                    $($event.originalEvent.currentTarget).removeClass("selectRow");
                }
                return false;
            },
            /**
             * 导出列表
             * (目前仅支持自动列表)
             */
            exportGrid: function () {
                function exportSubmit(url, params, columns) {
                    url = url || "";
                    //创建form域
                    var $form = $('<form>');
                    $form.attr('sytle', 'display:none').attr('target', '').attr('method', 'post')
                        .attr('action', RX.ctxPath + '/main/exportGrid');
                    //创建参数域
                    var $input = $('<input/>');
                    $input.attr('type', 'hidden').attr('name', 'url').attr('value', url).appendTo($form);
                    //创建参数域
                    var $input2 = $('<input/>');
                    $input2.attr('type', 'hidden').attr('name', 'params').attr('value', params).appendTo($form);
                    //创建参数域
                    var $input3 = $('<input/>');
                    $input3.attr('type', 'hidden').attr('name', 'columns').attr('value', JSON.stringify(columns))
                        .appendTo($form);
                    $('body').append($form);
                    //提交
                    $form.submit();
                    //移除
                    $form.remove();
                }

                function rendererFilter(cols){
                    $.each(cols, function (i, t) {
                        if(!t.renderer && t.children){
                            rendererFilter(t.children);
                        }else if (t.renderer != "String" && t.renderer != "Dict" && t.renderer != "Date") {
                            t.renderer = "String";
                        }
                    })
                }

                var settings = this.$options.settings;
                var url = settings.url,
                    columns = settings.autoListBox.columns;
                if (url && columns) {
                    var transColumns = $.extend(true, [], columns);
                    rendererFilter(transColumns);
                    exportSubmit(url, getPostData(this.get("query")), transColumns);
                } else {
                    RX.alert("无法导出");
                }
            },
            /**
             * 获取当前列表组件配置信息
             */
            getSetting:function (){
                return this.$options.settings;
            },
            /**
             * 设置当前列表组件配置信息
             * @param setting 新列表配置
             */
            setSetting:function (setting){
                if(RX.isObject(setting)){
                    this.$options.settings = this.$options.settings = setting;
                    this.$historyKey = this.$options.settings.historyKey || "_grid_vm_" + this.cid;
                    this.reloadGrid();
                }
            },
            /**
             * 自动搜索区模式下，调用该方法可以重置搜索区
             * @param newConfig 新渲染配置
             */
            reloadQueryBox: function (newConfig){
                if (settings.autoQueryBox.enable) {
                    if(newConfig){
                        this.setConfig(newConfig);
                    }
                    buildAutoQueryBox(this);
                }
            }
        },
        settings: {
            url: "",     //数据请求地址
            paged: true,     //是否分页
            limit: 10,       //每页数目
            selectType: "multi",  //可选值single单选，multi多选
            autoQueryBox: {         //自动搜索区配置，与视图中".query_box"元素对应
                enable: false,      //是否开启自动搜索区
                property: [],      //搜索区显示字段与排序
                canClear: true,      //是否显示清空按钮（若为false则不显示；若为true且显示字段config存在canClear为true，则显示）
                cols: [80, 150, 80, 150, 80, 150],   //搜索区列宽设置
                canEnter: true     //是否添加enter搜索功能，默认为true
            },
            autoListBox: {          //自动列表区配置，与视图中".list_box"元素对应
                enable: false,        //是否开启自动列表区
                columns: null,        //表头配置，如果为数组，则直接使用该配置，展示列表列；如果为方法或方法的字符串名称，则使用方法执行后返回的数组，展示列表列
                url: "",            //表体
                tempPageSize: 5,    //数据缓冲区大小
                ordinal: true,      //是否有序号
                mulchose: false,    //是否多选
                checkbox: false,    //是否显示checkbox
                columnResize: false,  //列是否可拖动修改宽度
                allPageChose: true, //是否开启全页选择
                stretch: false,     //是否有详情
                dischose: false,    //是否开启禁用
                disObject: {},      //默认禁选内容
                selObject: {},      //默认选中内容
                newThead: null,      //自定义表头
                canCopy: false       //列表数据是否可选中复制
            },
            historyKey: "",           //页面管理历史区钥匙，若为空，则不开启历史操作记录功能
            msg: {                                  //列表相关提示
                noData: "无数据",                  //无数据时提示
                needSetting: "请先设置搜索条件",    //搜索区验证不通过时提示
                loading: "数据加载中",               //加载中提示
                error: "请求数据异常"                 //异常时提示
            },
            /**
             * 渲染列表页后置
             * @param pageList 当前页数据
             * @param total 数据总条数
             * @param pageNo 当前页码
             * @returns {boolean}
             *
             * 方法的this：在自动列表使用时，为$panel列表容器；在模板个性写法中，为rxvm实例。
             */
            afterLoad: function (pageList, total, pageNo) {},
            /**
             * 发生异常后置
             *
             * 方法的this：在自动列表使用时，为$panel列表容器；在模板个性写法中，为rxvm实例。
             */
            afterError: function () {},
            /**
             * 无数据后置
             *
             * 方法的this在自动列表使用时，为$panel列表容器；在模板个性写法中，为rxvm实例。
             */
            afterNoData: function () {},
            /**
             * 查询本地数据前置
             * (包含默人逻辑：比对相同字段值)
             * @param dataList 初始数据
             * @param queryParam 查询条件
             * @returns {boolean} 返回满足条件的数据list
             *
             * 方法的this：rxvm实例。
             */
            onQueryData: function (dataList, queryParam) {
                var queryList = [], config = this.$options.config;
                if (dataList && dataList.length) {
                    $.each(dataList, function (i, t) {
                        var rightTag = true;
                        for (var key in queryParam) {
                            if (queryParam.hasOwnProperty(key) && queryParam[key]) {
                                var type = config["query."+key] && config["query."+key].type;
                                if(!type || type === "normal"){
                                    //输入型，开启模糊匹配
                                    if ((t[key] || "").toString().indexOf(queryParam[key].toString()) === -1) {
                                        rightTag = false;
                                        break;
                                    }
                                }else{
                                    //非输入型，值匹配
                                    if (t[key] !== queryParam[key]) {
                                        rightTag = false;
                                        break;
                                    }
                                }
                            }
                        }
                        if (rightTag) {
                            queryList.push(t);
                        }
                    })
                }
                return queryList;
            }
        },
        initOptions: function (widgetOptions, options) {
            var tempOptions = $.extend(true, {}, widgetOptions, options);
            if (options && options.settings && options.settings.autoQueryBox && options.settings.autoQueryBox.cols) {
                tempOptions.settings.autoQueryBox.cols = options.settings.autoQueryBox.cols;
            }
            return tempOptions;
        },
        //绘制后置，自动执行渲染列表
        _afterMount: function () {
            var that = this,
                settings = that.$options.settings,
                listBoxNode = that._findNodes(".list_box"),
                queryBoxNode = that._findNodes(".query_box"),
                historyKey = this.$historyKey = settings.historyKey || "_grid_vm_" + that.cid;

            if (historyKey) {
                //获取历史操作记录
                var pageData = RX.page.getData();
                if (pageData) {
                    var hisData = pageData[historyKey];
                    if (hisData) {
                        this.set("query", hisData["query"] || {});
                        this.set("pageNo", hisData["pageNo"] || 1);
                    }
                }else{
                    pageData = {};
                    RX.page.setData(pageData);
                }

                //注册操作记录观察器
                if (!pageData[historyKey]) {
                    pageData[historyKey] = {pageNo: 1, query: {}};
                }
                this.watch(
                    'pageNo',
                    function (newValue, oldValue, keypath) {
                        pageData[historyKey].pageNo = newValue || "";
                    }
                )
            }

            //识别并渲染搜索区
            if (queryBoxNode) {
                that.$queryBox = queryBoxNode[0];
                if (settings.autoQueryBox.enable) {
                    buildAutoQueryBox(that);
                }
            }

            //识别并渲染列表区
            if (listBoxNode) {
                that.$listBox = listBoxNode[0];
                var queryVm = this.autoQuery || this;
                that.$gridType = "list";
                setTimeout(function () {
                    that.renderGrid();
                    RX.page.resize();
                }, 0);
            }else{
                //识别并渲染列表区（报表类型）
                listBoxNode = that._findNodes(".bb_list_box");
                if (listBoxNode) {
                    that.$listBox = listBoxNode[0];
                    that.$gridType = "bbList";
                    var queryVm = this.autoQuery || this;
                    setTimeout(function () {
                        that.renderGrid();
                        RX.page.resize();
                    }, 0);
                }else{
                    that.$gridType = "custom";
                }
            }

            if(!(settings.autoListBox && settings.autoListBox.enable) && settings){
                this.watch("status", function(newValue, oldValue){
                    if(newValue){
                        if(newValue === "success" && typeof settings.afterLoad === "function"){
                            settings.afterLoad.call(that, that.get("pageList"), that.get("queryList").length, that.get("pageNo"));
                        }else if(newValue === "error" && typeof settings.afterError === "function"){
                            settings.afterError.call(that);
                        }else if(newValue === "noData" && typeof settings.afterNoData === "function"){
                            settings.afterNoData.call(that);
                        }
                    }
                    this.set("status", "");
                })
            }
        },
        //渲染后置，自动执行渲染序号
        _afterRender: function () {
            this.renderOrder();
        }
    };

}).call(window);