/*****************************************************************
 * RX.button-0.1
 * RX按钮组件
 * 最后更新时间：2017-09-22
 * 最后更新人：Zp
 *
 * 更新时间： 2017-10-23
 * 更新人：mrq
 * 更新内容：在zp的基础上完善button控件
 *
 * 更新时间： 2017-11-01
 * 更新人：mrq
 * 更新内容：增加功能权限控制
 * 配置控制显示逻辑，比如：权限控制，状态控制  功能权限  其它设置
 *****************************************************************/

(function (global) {

    //组件池声明
    var widgetPool = {};

    //内部方法，执行配置回调
    function callFunction(obj, func) {
        var result = true;
        if (typeof(func) == "function" && arguments.length >= 2) {
            result = func.apply(obj, Array.prototype.slice.call(arguments, 2));
        }
        if (typeof(result) != "boolean" || result != false) {
            return true;
        }
        return false;
    }

    var defaultButtonJson = {
        id: "",                  //button对应的标识，唯一
        code: "",                //页面配置的code，如果配置了则由功能权限配置，无则按照自己的配置显示隐藏
        name: "新增",             //显示名称
        icon: null,             //图标，目前支持iconfont的设置
        display: true,          //是否显示，默认显示
        beforeClick: null,      //点击按钮前触发的事件，return false时onClick事件不触发
        onClick: null           //按钮点击事件
    };

    //buttongroup默认配置
    var defaults = {
        param: {},                      //可以个性添加的参数等，用于扩展功能
        title: null,
        className: "action_button",  //样式
        buttons: [                      //配置的button数组
        ],
        closeButton: true,              //页面关闭按钮
        editButton: {
            enable: true, //默认启用
            editUrl: "", //默认采用查看页面的View替换Edit,并将id传入
            editTitle: "" //默认将当前页面标题的"查看"改为"修改"
        },
        pageCode: "",                    //页面id，功能权限使用，配置了则查找相应页面的功能权限
        beforeInit: function (param) {    //初始化事件
            return true
        },
        onInit: function (param) {
        }
    };

    //Button对象类构造声明
    var Button = function (el, initType, json) {
        //填充默认值
        if (typeof(json) === "string") {
            this.hadleJson = json;
        } else {
            this.hadleJson = $.extend(true, {}, defaultButtonJson, json);
        }
        this.el = el;
        if (this.init[initType]) {
            this.init[initType](this);
        }
    };

    //Button对象类属性声明
    Button.prototype = {
        //初始化
        init: {
            operation_box: function (button) {
                var json = button.hadleJson;
                if (typeof(json) === "string") {
                    var $dom = $('<li>' + json + '</li>');
                    button.el.append($dom);
                    return;
                }
                //该节点是否显示
                this.ifShow = json.display;
                //创建dom
                if (json.name.indexOf('删除') !== -1) {
                    var $dom = $('<li style="' + (json.display ? "" : "display:none;") + '"><a href="javascript:void(0)" class="active_del" id="' + json.id + '"><i class="iconfont">' + json.icon + '</i>' + json.name + '</a></li>');
                } else {
                    var $dom = $('<li style="' + (json.display ? "" : "display:none;") + '"><a href="javascript:void(0)" class="' + json.style + '" id="' + json.id + '"><i class="iconfont">' + json.icon + '</i>' + json.name + '</a></li>');
                }
                button.dom = $dom;
                $dom.bind("click", function () {
                    var buttonJson = json;
                    if (buttonJson.beforeClick) {
                        if (RX.runGlobalFunc(buttonJson.beforeClick) === false) {
                            return;
                        }
                    }
                    if (buttonJson.onClick) {
                        RX.runGlobalFunc(buttonJson.onClick);
                    }
                });
                button.el.append($dom);
            },
            w_button_box: function (button) {
                var buttonMsg = button.hadleJson;
                var $bt = '<input type="button" id="' + buttonMsg.id + '" value="' + buttonMsg.name + '" class="' + buttonMsg.style + '"/>';
                $(".button_group").append($bt);
                //事件
                $("#" + buttonMsg.id).on("click", function () {
                    RX.runGlobalFunc(buttonMsg.onClick);
                });
            }
        },
        //显示
        show: function () {
            this.dom.show();
        },
        //隐藏
        hide: function () {
            this.dom.hide();
        },
        //移除
        remove: function () {
            this.dom.remove();
        }
    };

    //ButtonGroup对象类构造声明
    var ButtonGroup = function ($box, options, type) {
        var $obj = $box.find("button_group");
        if ($obj.length) {
            $obj = $obj.eq(0);
        } else {
            $obj = $('<div class="button_group"></div>');
            $box.prepend($obj);
        }
        //1、注册容器
        this.$obj = $obj;
        //2、注册参数
        this.options = $.extend(true, {}, options);
        //3、注册gridId：容器dom的Id，不在则为"_grid"+8位随机数
        this.id = $obj.attr("id");
        this.type = type;
        if (!this.id) {
            this.id = "_button_group_" + Math.floor(Math.random() * 100000000);
            $obj.attr("id", this.id);
        }
        //初始化当前group中的button对象
        this.buttonPool = {};
        //4、向组件池中注册
        widgetPool[this.id] = this;
        //初始显示的buttons
        this.initShowNum = 0;
        //5、布局初始化
        this.init();
    };

    //ButtonGroup对象类属性声明
    ButtonGroup.prototype = {
        init: function () {
            var buttonGroup = this,
                buttonPool = buttonGroup.buttonPool,
                $obj = buttonGroup.$obj,
                options = buttonGroup.options,
                param = options.param,
                closeButton = options.closeButton,
                editButton = options.editButton,
                buttons = options.buttons;
            //渲染的前置函数判断
            if (callFunction(buttonGroup, options.beforeInit, param)) {
                var initType = "";
                if ($obj.parent().hasClass("operation_box")) {
                    //记录子行插入的位置
                    buttonGroup.insertEL = $("<ul class='" + options.className + "'></ul>");
                    $obj.append(buttonGroup.insertEL);
                    initType = "operation_box";
                } else {
                    initType = "w_button_box";
                }
                if (initType === "operation_box") {
                    //处理buttons数据
                    buttonGroup.handleButtons(buttons, options.pageCode);
                    $obj.empty();

                    if (buttons && buttons.length > 0) {
                        var newButton;
                        $.each(buttons, function (i, t) {
                            newButton = new Button(buttonGroup.insertEL, initType, t);
                            buttonPool[t.id] = newButton;
                            newButton.ifShow && buttonGroup.initShowNum++;
                        })
                    }
                }
                if (initType === "w_button_box") {
                    if (buttons && buttons.length > 0) {
                        var newButton;
                        $.each(buttons, function (i, t) {
                            newButton = new Button(buttonGroup.insertEL, initType, t);
                            buttonPool[t.id] = newButton;
                            newButton.ifShow && buttonGroup.initShowNum++;
                        })
                    }
                    if (closeButton) {
                        var $bt = '<input type="button" id="close" value="关闭" class="n_button"/>';
                        $obj.append($bt);
                    }
                    if ((editButton && editButton.enable !== false) && this.type === "ck") {
                        var flag = true;
                        $.each(this.getSysAuthByPage(options.pageCode), function (i, t) {
                            if (t.code === editButton.code) {
                                flag = true;
                                return false;
                            }
                            flag = false;
                        });
                        if (flag) {
                            var $ed = $('<input type="button" id="editPage" value="修改" class="c_button" />');
                            $obj.prepend($ed);
                            //进入编辑页面
                            $ed.on("click", function () {
                                var editUrl = "", editParam = {}, pageTitle = "";
                                if (options.editButton) {
                                    pageTitle = options.editButton.editTitle;
                                    if (typeof  options.editButton.editUrl === "string") {
                                        editUrl = options.editButton.editUrl;
                                    } else if (typeof  options.editButton.editUrl === "object") {
                                        editUrl = options.editButton.editUrl.url;
                                        editParam = options.editButton.editUrl.param;
                                    } else if (typeof  options.editButton.editUrl === "function") {
                                        editUrl = options.editButton.editUrl().url;
                                        editParam = options.editButton.editUrl().param;
                                    }
                                }
                                var id = RX.page.param.id;
                                if (!pageTitle || pageTitle === "") {
                                    var $title = $("#" + window.name, window.parent.document).parent().prev();
                                    pageTitle = $title.text().replace('查看', "修改");
                                }
                                $("#" + window.name, window.parent.document).parent().prev().text(pageTitle);
                                if (!editUrl) {
                                    var viewUrl = window.location.href;
                                    editUrl = viewUrl.replace('View', 'Edit') + "?" + "id=" + id;
                                }
                                RX.page.goto(editUrl, editParam);
                            })
                        }
                    }
                }
                $obj.append(buttonGroup.insertEL);
                callFunction(buttonGroup, options.onInit, param);
            }
        },
        //处理buttons数据，和功能权限对比
        handleButtons: function (buttons, pageCode) {
            //后期通用接口，可以处理功能权限，状态，自定义处理等数据
            this.hanldeButtonsByAuth(buttons, pageCode);
        },
        //功能权限控制
        hanldeButtonsByAuth: function (buttons, pageCode) {
            var buttonAuths = this.getSysAuthByPage(pageCode), maxLength = buttonAuths.length,
                button, buttonLength = buttons.length;
            for (var i = 0; i < buttonLength; i++) {
                button = buttons[i];
                //资源控制
                if (button.code) {
                    var flag = false;
                    for (var j = 0; j < maxLength; j++) {
                        if (button.code == buttonAuths[j].code) {
                            flag = true;
                            //删除
                            buttonAuths.splice(j, 1);
                            maxLength--;
                            break;
                        }
                    }
                    if (!flag) {
                        buttons.splice(i, 1);
                        buttonLength--;
                        i--;
                    }
                }
            }
        },
        getSysAuthByPage: function (pageCode) {
            //先直接从后台获取，之后可以考虑从前端缓存中获取，登录时缓存权限等信息
            var sysAuth = [];
            if (pageCode) {
                $.ajax({
                    type: "get",
                    url: "/resource/getUserResource?type=func&parentCode=" + pageCode + "&r=" + Math.random(),
                    async: false,
                    success: function (ar) {
                        if (ar.success) {
                            sysAuth = ar.data;
                        } else {
                            RX.alert(ar.msg);
                        }
                    }
                });
            }
            return sysAuth;
        },
        //显示
        //无参显示全部 配置的ids，以逗号隔开
        showButtons: function (ids) {
            var buttonGroup = this;
            var buttonPool = buttonGroup.buttonPool;
            if (ids) {
                var codeArr = ids.split(",");
                for (var i = 0, maxLength = codeArr.length; i < maxLength; i++) {
                    buttonPool[codeArr[i]] && buttonPool[codeArr[i]].show();
                }
            } else {
                for (var button in buttonPool) {
                    buttonPool[button].show();
                }
            }
        },
        //隐藏
        //无参隐藏全部 配置的ids，以逗号隔开
        hideButtons: function (ids) {
            var buttonGroup = this;
            var buttonPool = buttonGroup.buttonPool;
            if (ids) {
                var codeArr = ids.split(",");
                for (var i = 0, maxLength = codeArr.length; i < maxLength; i++) {
                    buttonPool[codeArr[i]] && buttonPool[codeArr[i]].hide();
                }
            } else {
                for (var button in buttonPool) {
                    buttonPool[button].hide();
                }
            }
        },
        //添加新的button
        //模板创建的需要知道el，普通不需要传入el
        addButton: function (json, el) {
            var buttonGroup = this;
            if (!el) {
                el = buttonGroup.insertEL;
            }
            if (json) {
                //数组
                if (Object.prototype.toString.apply(json) == "[object Array]") {
                    for (var i = 0, maxLength = json.length; i < maxLength; i++) {
                        buttonGroup.buttonPool[t.id] = new Button(el, json[i]);
                    }
                } else {
                    //字符串
                    buttonGroup.buttonPool[t.id] = new Button(el, json);
                }
            }
        },
        //移除
        removeAll: function () {
            var buttonPool = this.buttonPool;
            for (var i = 0, maxLength = buttonPool.length; i < maxLength; i++) {
                buttonPool[i].remove();
            }
        },
        //初始显示的button数目
        showButtonsNum: function () {
            return this.initShowNum;
        }
    };

    RX.button = {
        //ButtonGroup构建方法
        //参数：$obj （Jquery元素）button的dom容器， options （Json）构建参数
        //返回值：group
        //添加对全部buttongroup的操作
        //type 页面状态类型
        init: function ($obj, options, type) {
            if (!$obj) {
                return null;
            }
            if (!options) {
                options = {};
            }
            return new ButtonGroup($obj, $.extend(true, {}, defaults, options), type);
        },
        //ButtonGroup获取方法
        //参数：buttonGroupId （String）ButtonGroup的dom容器的id
        //返回值：ButtonGroup buttonGroup对象
        get: function (id) {
            return widgetPool[id];
        },
        //ButtonGroup销毁方法
        //参数：buttonGroupId （String）ButtonGroup的dom容器的id
        destroy: function (id) {
            if (widgetPool[id] != undefined) {
                //清除buttons控件
                widgetPool[id].removeAll();
                //存在
                delete widgetPool[id];
            }
        }
    }
})(this);