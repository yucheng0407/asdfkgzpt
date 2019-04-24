/**
 * 提供全局公用接口封装
 * 创建人：wcy
 * 创建时间：2018/1/25
 * 最后更新人：wcy
 * 最后更新时间：2018/1/26
 *
 * 最后更新人：wcy
 * 最后更新时间：2018/4/8
 * 更新内容：
 * 1、增加全局常量配置
 * 2、部分接口名修改
 */
(function () {
    //注册本窗口别名
    var root = this;

    //重写jquery的ajax方法（主要解决项目路径问题）
    //noinspection UnreachableCodeJS
    var _ajax = $.ajax;
    $.ajax = function (opt) {
        var fn = {};
        var turl = opt.url;
        //备份opt中error和success方法
        var fn = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success: function (data, textStatus) {
            }
        };
        opt.url = RX.handlePath(opt.url);
        if (opt.error) {
            fn.error = opt.error;
        }
        if (opt.success) {
            fn.success = opt.success;
        }

        //扩展增强处理
        var _opt = $.extend(opt, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //错误回调方法增强处理
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function (data, textStatus) {
                //成功回调方法增强处理
                if (data === "session timeout") {
                    _top.location.href = document.location.origin + RX.ctxPath + "/login";
                    return;
                } else if (data === "/global/notFound" || data === "/global/error" || data === "/global/unauthorized") {
                    RX.log(data + " :" + turl);
                    return;
                }
                fn.success(data, textStatus);
            }
        });
        _ajax(_opt);
    };

    //重写jquery的post方法（主要解决项目路径问题）
    var _post = $.post;
    $.post = function (url, data, success, error) {
        //备份opt中error和success方法
        url = RX.handlePath(url);
        var _success = function (data, textStatus, jqXHR) {
            //成功回调方法增强处理
            if (data === "session timeout") {
                _top.location.href = document.location.origin + RX.ctxPath + "/login";
                return;
            } else if (data === "/global/notFound" || data === "/global/error" || data === "/global/unauthorized") {
                RX.log(data + " :" + turl);
                return;
            }
            if (success) {
                success(data, textStatus, jqXHR);
            }
        };
        _post(url, data, _success, error);
    };

    //重写jquery的post方法（主要解决项目路径问题）
    var _get = $.get;
    $.get = function (url, data, success, error) {
        //备份opt中error和success方法
        url = RX.handlePath(url);
        var _success = function (data, textStatus, jqXHR) {
            //成功回调方法增强处理
            if (data === "session timeout") {
                _top.location.href = document.location.origin + RX.ctxPath + "/login";
                return;
            } else if (data === "/global/notFound" || data === "/global/error" || data === "/global/unauthorized") {
                RX.log(data + " :" + turl);
                return;
            }
            if (success) {
                success(data, textStatus, jqXHR);
            }
        };
        _get(url, data, _success, error);
    };

    //重写jquery的val方法（主要解决spanshow值变更，title更新，select2适应）
    $.prototype.val = function (base) {
        return function () {
            var s = this, n = s.next(), t = s.prop("tagName"), a = "value", p = s.attr(a), isset = arguments.length > 0,
                v = isset ? arguments[0] : null;
            //这里调用基类方法，当然基类方法在何时调用或者是否要调用取决于您的业务逻辑，在这里我们是要调用的，因为要保持它原有的功能。
            if (isset && typeof(base) === "function") {
                base.call(s, v);
                if (s.hasClass("spanparent")) {
                    window.CR && CR.updateSpanShow(s, v);
                } else if (t === "SELECT") {
                    //赋值时重新绘制select2
                    if (s.next().hasClass("select2")) {
                        s.trigger('change.RebuildChild');
                    }
                }
                window.CR && CR.updateTitle(s, v);
                return s;
            } else {
                return base.call(s);
            }
        }
        //在这里传入基类方法
    }($.prototype.val);

    //全局统一页面关闭接口(元素id固化为close)
    $(function () {
        //Fixme:页面管理未实现，暂不使用
        $("#close").live &&  $("#close").live("click", function () {
            RX.page.close(1, true, false);
        });
        //esc关闭弹窗
        $(document).keyup(function (e) {
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            switch (code) {
                case 27:
                    //先关闭消息层次，confirm和alert
                    if (!layer.closeMsgWin()) {
                        //关闭最上层页面
                        var upperPage = RX.page.uppermost();
                        if (upperPage) {
                            upperPage.close(1, true);
                        }
                    }
                    break;
            }
        });
        //如果为临时top层，提供缓存配置与用户信息
        if (!RX.checkLastUrl("login") && _tempTop) {
            RX.getShiroUserInfo();
            RX.getConfig();
        }
    });

    /**
     * 列表表单自适应大小
     */
    RX.resizeTable = function () {
        var $list = $(".list_box");
        if($list.length){
            $list.innerHeight($(window).height() - $(".no_p_box").outerHeight() - $(".w_button_box").outerHeight() - 40);
        }else{
            $list = $(".bb_list_box");
            if($list.length){
                $list.innerHeight($(window).height() - $(".no_p_box").outerHeight() - $(".w_button_box").outerHeight() - 40);
            }
        }
    };

    /**
     * form表单自适应大小
     */
    RX.resizeForm = function () {
        $(".form_box").innerHeight($(window).height() - $(".w_button_box").outerHeight());
    };
    /**
     * 自适应左右布局
     */
    RX.resizeMenu = function () {
        $(".right_content").width($(window).width() - $(".left_side").outerWidth() - 1);
    };

    /**
     * 自适应左右布局
     */
    RX.resizeTree = function () {
        $(".right_content").width($(window).width() - $(".left_side_tree").outerWidth() - 1);
    };

    /**
     * 获取地址栏参数
     * @param {string} name 参数名
     * @returns {string}
     */
    RX.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r) {
            return unescape(r[2]);
        }
    };
    /**
     * 解析url中的参数
     * @param {string} url url字符串
     * @returns {object} 参数对象
     */
    RX.getUrlParamAsObj = function (url) {
        var result = {};
        if (url.indexOf("?") !== -1 && url.indexOf("?") !== url.length) {
            var query = url.split("?")[1];
            var queryArr = query.split("&");
            $.each(queryArr, function (i, item) {
                var key = item.split("=")[0];
                result[key] = item.split("=")[1];
                if (typeof result[key] === "string") {
                    result[key] = RX.decode(result[key]);
                }
            })
        }
        return result;
    };

    //继承顶层：本层layer由顶层layer继承
    root.layer = _top.layer;

    /**
     * 弹出信息提示，如不满足请使用layer.msg
     * @param {object} type 提示类型，可缺省，默认为RX.SUCCESS_OPERATE
     * @param {string} msg 提示信息
     */
    RX.msg = function (type, msg) {
        //RX.msg("保存成功")
        if (typeof type === "string") {
            msg = type;
            type = RX.SUCCESS_OPERATE;
        }
        var icon;
        //RX.msg(1,"保存成功")
        if (typeof type === "number") {
            icon = type;
        }
        if (typeof type === "object") {
            icon = type.icon;
            msg = msg || type.msg;
        }
        if (layer) {
            layer.msg(msg, {
                icon: icon,
                time: 2000
            });
        } else {
            alert(msg);
        }
    };

    /**
     * 弹出信息警告,如不满足请使用layer.alert
     * @param {object} type 提示类型，可缺省，默认为 RX.ERROR_OPREATE
     * @param {string} msg 提示信息
     * @param {function} fn 回调函数，可缺省
     */
    RX.alert = function (type, msg, fn) {
        if (typeof type === "string") {
            if (msg) {
                fn = msg;
            }
            msg = type;
            type = RX.ERROR_OPREATE;
        }
        var icon;
        if (typeof type === "object") {
            icon = type.icon;
            msg = msg || type.msg;
        } else {
            msg = type;
        }
        if (layer) {
            layer.alert(msg, {
                icon: icon
            }, function (index) {
                layer.close(index);
                if (fn && typeof fn === "function") {
                    fn();
                }
            });
        } else {
            alert(msg);
            fn && typeof fn === "function" && fn();
        }
    };

    /**
     * 弹出信息确认，如不满足请使用layer.confirm
     * @param {object} type 提示类型，可缺省，默认为RX.DOUBT_OPREATE
     * @param {string} msg 提示信息
     * @param {function} fn1 点击“确认”回调函数，可缺省
     * @param {function} fn2 点击“取消”回调函数，可缺省
     */
    RX.confirm = function (type, msg, fn1, fn2) {
        if (typeof type === "string") {
            if (msg) {
                fn2 = fn1;
                fn1 = msg;
            }
            msg = type;
            type = RX.DOUBT_OPREATE;
        }
        var icon;
        if (typeof type === "object") {
            icon = type.icon;
            if (!(typeof msg === "string")) {
                fn2 = fn1;
                fn1 = msg;
                msg = type.msg;
            }
        } else {
            msg = type;
        }
        if (layer) {
            layer.confirm(msg, {
                icon: icon
            }, function (index) {
                layer.close(index);
                if (fn1 && typeof fn1 === "function") {
                    fn1();
                }
            }, function (index) {
                layer.close(index);
                if (fn2 && typeof fn2 === "function") {
                    fn2();
                }
            });
        } else {
            if (confirm(msg)) {
                fn1 && typeof fn1 === "function" && fn1();
            } else {
                fn2 && typeof fn2 === "function" && fn2();
            }
        }
    };

    var loadingIndex;

    /**
     * 开启loading效果
     * @param time 等待关闭时间，为空则不自动关闭
     */
    RX.loading = function (time) {
        var opt = time ? {time: time} : null;
        loadingIndex = layer.load(0, opt);
    }

    /**
     * 关闭loading效果
     */
    RX.closeLoading = function () {
        if (loadingIndex) {
            layer.close(loadingIndex);
        }
    }

    /**
     * 当页面有ajax请求时，添加遮罩提示(待与loading合并)
     * @param {string} text 提示内容
     * @param {*} inWin 显示窗口
     */
    RX.pageAjax = function (text, inWin) {
        // setTimeout(function () {
        //     if (text) {
        //         if (typeof text === "boolean") {
        //             inWin = true;
        //             text = "数据处理中，请稍候...";
        //         }
        //     } else {
        //         text = "数据处理中，请稍候...";
        //     }
        //     if (_top.ZENG) {
        //         $("body").ajaxStart(function () {
        //             _top.ZENG.msgbox.show(text, 6, 0, null, inWin ? window : null);
        //         }).ajaxStop(function () {
        //             _top.ZENG.msgbox.hide(100, inWin ? window : null);
        //         });
        //     }
        // }, 500);
    };

    /**
     * 初始化按钮点击显示/隐藏列表搜索区效果
     * @param $div 搜索区div元素(jQuery对象)
     * @param $item 控制按钮元素(jQuery对象)
     * @param showTag true：初始展开 false：初始隐藏 ,可缺省，默认值为true。
     */
    RX.toggleSearchView = function ($div, $item, showTag) {
        /**
         * 展开搜索区
         * @param noSpeed 移动速度
         * @private
         */
        function _showView(noSpeed) {
            if (typeof (noSpeed) === "boolean" && noSpeed) {
                $div.show(function () {
                    $(".list_box").innerHeight($(window).height() - $(".operation_box").outerHeight() - $(".query_box").outerHeight());
                });
            } else {
                $div.show("normal", function () {
                    $(".list_box").innerHeight($(window).height() - $(".operation_box").outerHeight() - $(".query_box").outerHeight());
                });
            }
            $item.attr("title", "收起搜索区");
            $item.addClass("rotate");
        }

        /**
         * 收起搜索区
         * @param noSpeed 移动速度
         * @private
         */
        function _hideView(noSpeed) {
            if (typeof (noSpeed) === "boolean" && noSpeed) {
                $div.hide(function () {
                    $(".list_box").innerHeight($(window).height() - $(".operation_box").outerHeight());
                });
            } else {
                $div.hide("normal", function () {
                    $(".list_box").innerHeight($(window).height() - $(".operation_box").outerHeight());
                });
            }
            $item.attr("title", "展开搜索区");
            $item.removeClass("rotate");
        }

        if (typeof showTag === "undefined" || showTag === null) {
            showTag = true;
        }

        if (showTag) {
            _showView(true);
            $item.toggle(_hideView, _showView);
        } else {
            _hideView(true);
            $item.toggle(_showView, _hideView);
        }
    };

    this.startLoadingTime = 0;
    /**
     * 加载页面时出现遮罩层
     * @param options 可选参数，设置sleep、delayTime
     */
    RX.pageLoading = function (options) {
        var now = new Date().getTime();
        if (options || !_top.startLoadingTime || 300 < now - _top.startLoadingTime) {
            _top.startLoadingTime = now;
            $.MyCommon.PageLoading(options);
        }
    };

    /**
     * 隐藏页面加载时遮罩层
     * @param options 可选参数，设置sleep、delayTime
     */
    RX.closePageLoading = function (options) {
        $.MyCommon.hideLoading(options);
    };

    /**
     * 设置cookie
     * @param name cookie名称
     * @param value cookie值
     * @param expires 过期时间
     */
    RX.setCookie = function (name, value, expires) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + expires);
        document.cookie = name + "=" + escape(value) +
            (!expires ? "" : ";expires=" + expireDate.toGMTString());
    };

    /**
     * 根据cookie名称获取cookie值
     * @param {string} name cookie名称
     * @returns {string} cookie值
     */
    RX.getCookie = function (name) {
        var cookie = document.cookie;
        if (cookie.length > 0) {
            var start = cookie.indexOf(name + "=");
            if (start !== -1) {
                start = start + name.length + 1;
                var end = cookie.indexOf(";", start);
                if (end === -1) end = cookie.length;
                return unescape(cookie.substring(start, end));
            }
        }
        return "";
    };
    /**
     * 异步树初始加载第一个子节点数据（注意ztree位置设置id）
     * @param {function} func 传入回调函数
     * @returns {function}
     */
    RX.expandFirstTreeNode = function (func) {
        var firstAsyncSuccessFlag = 0;
        return function (event, treeId, msg) {
            var tree = this.getZTreeObj(treeId);
            if (firstAsyncSuccessFlag === 0)
                try {
                    //调用默认展开第一个结点
                    var nodes = tree.getNodes();
                    tree.expandNode(nodes[0], true);
                    firstAsyncSuccessFlag = 1;
                    if (func && typeof func === "function") {
                        func(treeId, nodes[0]);
                    }
                } catch (e) {
                    RX.log("获取不到ztree，检查设置id");
                }
        }
    };

    /**
     * 同步树搜索对象
     * @param $el {object} 搜索区渲染的位置
     * @param ztreeId {number}  需要关联搜索的树对象
     * @param ztree {object} ztree
     */
    RX.ZTreeSearch = function ($el, ztreeId, ztree, searchName) {
        var ztreeSearch = this,
            searchDataArr = [],
            searchLength = 0,
            index = 0;
        ztreeSearch.$el = $el;
        ztreeSearch.ztreeId = ztreeId;
        ztreeSearch.ztree = ztree;
        searchName = searchName || "name";
        //如果存在不添加
        var $soBox = $el.prev();
        if ($soBox.hasClass("so_box")) {
            $soBox.remove();
        }
        //长度计算el的宽度，进行计算
        //搜索区div
        var $searchBox = $("<div class=\"so_box\"></div>");
        var $earchDiv = $("<div class=\"so_k\"></div>");
        $searchBox.append($earchDiv);
        //搜索input框
        var $searchInput = $("<input type=\"text\" placeholder=\"输入搜索内容\"/>");
        //left_side_tree树定宽220px，考虑下一页正常显示，iuput定死
        if ($el.parent().hasClass("left_side_tree")) {
            $searchInput.css("width", "80px");
        }
        $earchDiv.append($searchInput);
        //分页区
        var $prev = $("<a class=\"prev aidShow\" href=\"javascript:void(0)\" title='上一条' style='color: black;'>\n" +
            "<i class=\"iconfont \">&#xe72b;</i></a>");
        var $next = $("<a class=\"next aidShow\" href=\"javascript:void(0)\" title='下一条' style='color: black;'>\n" +
            "<i class='iconfont'>&#xe72c;</i></a>");
        //显示页数
        var $showDiv = $("<span class=\"aidShow aidArea\"> 第<span class=\"current\">0</span>条 共<span\n" +
            " class=\"countNum\">0</span>条</span>");
        var $div = $("<div class='pagDiv'></div>");
        $div.append($showDiv);
        $div.append($prev);
        $div.append($next);
        $earchDiv.append($div);
        var currentSpan = $showDiv.find(".current"),    //显示目前位置
            countSpan = $showDiv.find(".countNum");            //总数
        $el.before($searchBox);
        var $ztreeParent = $("#" + ztreeId).parent(),
            _top,         //父节点偏移量
            _height = $ztreeParent.height(),  //父节点高度
            //构建搜索区
            timeoutid;
        $searchInput.bind("keyup", function () {
            clearTimeout(timeoutid);
            var text = this.value;
            if (text) {
                timeoutid = setTimeout(function () {
                    if (!_top) {
                        //由于树构建时布局可能会变化
                        _top = $ztreeParent.offset().top;
                    }
                    if (!ztreeSearch.ztree) {
                        ztreeSearch.ztree = $.fn.zTree.getZTreeObj(ztreeId);
                    }
                    var ztreeObj = ztreeSearch.ztree;
                    if (ztreeObj) {
                        //取消选中节点
                        searchDataArr = ztreeObj.getNodesByParamFuzzy(searchName, text);
                        searchLength = searchDataArr.length;
                        if (searchLength > 0) {
                            // selectedNode(searchDataArr[0]);
                            ztreeObj.selectNode(searchDataArr[0], false, _selectedNode);
                            index = 1;
                            currentSpan.text("1");
                            countSpan.text(searchLength);
                        } else {
                            currentSpan.text("0");
                            countSpan.text(0);
                        }
                        _showPageFast();
                    }
                }, 1000);
            } else {
                _hidePageFast();
            }
        });
        $prev.bind("click", function () {
            if (searchLength > 0) {
                if ((index - 1) === 0) {
                    index = searchLength;
                } else {
                    index--;
                }
                currentSpan.text(index);
                ztreeSearch.ztree.selectNode(searchDataArr[index - 1], false, _selectedNode);
            }
        });
        $next.on("click", function () {
            if (searchLength > 0) {
                var next = ++index;
                if (next > searchLength) {
                    index = 1;
                }
                currentSpan.text(index);
                ztreeSearch.ztree.selectNode(searchDataArr[index - 1], false, _selectedNode);
            }
        });

        function _selectedNode(node) {
            //重写ztree的移动位置的方法
            var _scrollTop = $("#" + node.tId).offset().top - _top + $ztreeParent.scrollTop();
            var _addScrollTop = parseInt(_scrollTop / _height) * _height;
            if ((_scrollTop - _addScrollTop) >= _height - 25) {
                _addScrollTop = _addScrollTop + 25;
            }
            $ztreeParent.scrollTop(_addScrollTop);
            $("#" + node.tId + "_a").addClass("curSelectedNode");
        }

        //隐藏分页项
        function _hidePageFast() {
            $prev.hide();
            $next.hide();
            $showDiv.hide();
        }

        //显示分页项
        function _showPageFast() {
            $prev.show();
            $next.show();
            $showDiv.show();
        }
    };

    /**
     * 获取初始用户信息，缓存至窗口data中
     */
    RX.getShiroUserInfo = function () {
        $.ajax({
            url: "/main/getShiroUserInfo?r=" + Math.random(),
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.cache(_top, "USER", ar.data);
                }
            }
        })
    };
    /**
     * 获取初始配置信息，缓存至窗口data中
     */
    RX.getConfig = function () {
        $.ajax({
            url: "/config/getBaseConfig?r=" + Math.random(),
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.cache(_top, "BASE", ar.data.BASE);
                    RX.cache(_top, "WORKFLOW", ar.data.WORKFLOW);
                }
            }
        })
    };

    /**
     * 前端当前window的url最后一段是否相同
     * @param lastUrl 用以比较的url最后一段
     * @returns {boolean}
     */
    RX.checkLastUrl = function (lastUrl) {
        var urlFrag = window.location.href.split("/");
        if (urlFrag.length) {
            var lastUrlFrag = urlFrag.pop();
            if (lastUrlFrag.startWith(lastUrl)) {
                return true;
            }
        }
        return false;
    };

    /**
     * 获取目标文件的大小（单位B）
     * @param target
     * @returns {*|number}
     */
    RX.getFileSize = function (target) {
        var fileSize = 0;
        if (RX.browser.type === "IE" && !target.files) {
            try {
                var filePath = target.value;
                var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
                var file = fileSystem.GetFile(filePath);
                fileSize = file.Size;
            } catch (e) {
                fileSize = 0;
            }
        } else {
            fileSize = target.files[0].size;
        }
        return fileSize;
    };
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }

    /**
     * 向后台请求并下载系统附件
     * @param id
     */
    RX.downloadAttachment = function(id){
        $.ajax({
            type:"post",
            async: false,
            url:"/attachment/checkFileExist",
            data:{id: id},
            success: function(ar){
                if(ar.success){
                    window.open(RX.ctxPath + "/attachment/download?id=" + id);
                }else{
                    RX.alert(ar.msg);
                }
            }
        })
    }

    /**
     * 获取全局方法
     * @param funcOrName 方法本体或全局方法名
     * @returns {*} 方法
     */
    RX.getGlobalFunc = function(funcOrName){
        var func;
        if(typeof funcOrName === "function"){
            func = funcOrName;
        }else if(typeof funcOrName === "string"){
            try{
                func = eval(funcOrName);
            }catch(e){
                func = null;
            }
        }
        return func;
    }

    /**
     * 执行全局方法
     * @param funcOrName 方法本体或全局方法名
     * @param param1
     * @param param2
     * @param param3
     * @param param4
     * @param param5
     * @returns {*} 方法执行结果
     */
    RX.runGlobalFunc = function(funcOrName, param1, param2, param3, param4, param5){
        var func = RX.getGlobalFunc(funcOrName),result;
        if(func){
            result = func(param1, param2, param3, param4, param5);
        }
        return result;
    }

    /**
     * JSON转对象（非严格模式下可不遵循JSON书写规范，即key可不为字符串）
     * @param json JSON字符串
     * @param strictMode 是否为严格模式，默认为否，严格模式下必须严格遵循JSON书写规范
     * @returns {*}
     */
    RX.parseJson = function(json, strictMode){
        var result;
        if(typeof json === "string"){
            if(strictMode){
                result = JSON.parse(json);
            }else{
                try{
                    result = JSON.parse(json);
                }catch(e){
                    try{
                        result = eval("(" + json + ")");
                    }catch(e){}
                }
            }
        }
        return result;
    }
//     if (!document.querySelector) {
//         document.querySelector = function (selectors) {
//             var elements = document.querySelectorAll(selectors);
//             return (elements.length) ? elements[0] : null;
//         };
//     }
//
// // 用于在IE6和IE7浏览器中，支持Element.querySelectorAll方法
//     var qsaWorker = (function () {
//         var idAllocator = 10000;
//
//         function qsaWorkerShim(element, selector) {
//             var needsID = element.id === "";
//             if (needsID) {
//                 ++idAllocator;
//                 element.id = "__qsa" + idAllocator;
//             }
//             try {
//                 return document.querySelectorAll("#" + element.id + " " + selector);
//             }
//             finally {
//                 if (needsID) {
//                     element.id = "";
//                 }
//             }
//         }
//
//         function qsaWorkerWrap(element, selector) {
//             return element.querySelectorAll(selector);
//         }
//
//         // Return the one this browser wants to use
//         return document.createElement('div').querySelectorAll ? qsaWorkerWrap : qsaWorkerShim;
//     })();

}).call(this);




