$(function () {
    $(window).resize(function () {
        PageWeightInit();
    });
    //实例化具体视图
    new Rxvm({
        //视图容器
        el: ".base_box",
        settings: {
            //获取数据
            getData: {
                url: "/config/getConfigListByType"
            }
        },
        //视图方法
        methods: {
            //编辑配置事件响应
            editConfig: function (keypath) {
                RX.page.open({
                    title: "修改配置",
                    url: "/config/configEdit",
                    param: {
                        id: this.get(keypath + ".ID")
                    }
                });
            },
            //删除配置事件响应
            delConfig: function (keypath) {
                var that = this;
                RX.confirm(RX.CONFIRM_DELETE, function (index) {
                    $.ajax({
                        type: "post",
                        url: "/config/delConfig",
                        data: {id: that.get(keypath + ".ID")},
                        success: function (ar) {
                            if (ar.success) {
                                RX.msg(RX.SUCCESS_DELETE);
                                RX.page.refresh();
                            } else {
                                RX.alert(ar.msg);
                            }
                        }
                    });
                });
            }
        },
        //视图绘制完毕事件
        afterMount: function () {
            var appTypeList = this.get("appTypeList");
            var items = [];
            $.each(appTypeList, function (i, t) {
                items.push({
                    title: t.name,
                    cId: "_app" + t.appId
                })
            });
            //tab页控件初始化
            var appTab = new TabPanel({
                renderTo: 'appTab',
                fullTab: true,
                tabWidth: 70,
                active: 0,
                scrolled: true,
                contentScroll: true,
                items: items
            });
            RX.button.init($("#operate"), buttonsJson);
            setTimeout(function () {
                PageWeightInit();
            },0);
        }
    });
});

//页面宽度初始化
function PageWeightInit() {
    $(".tabpanel_content").width($(window).width());
    $("#appTab").height($(window).height() - $(".operation_box").outerHeight());
    $(".list_box").height($(window).height() - $(".operation_box").outerHeight() - 40);
    $(".tabpanel_content").height($(window).height() - $(".operation_box").outerHeight() - $(".tabpanel_tab_content").outerHeight());
}

RX.page.reload = function () {
    RX.page.refresh();
}

//操作按钮的配置
var buttonArr = [{
    id: "add",
    name: "新增",
    icon: "&#xe62a;",
    onClick: "addConfig",
    code: "ADD_CONFIG"
},
    {
        id: "typeShow",
        name: "按列表展示",
        icon: "&#xe605;",
        onClick: "listShow"
    }];

var buttonsJson = {
    tag: ".operation_box",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr,
    pageCode: "PZGLYM"
};

//新增配置
function addConfig() {
    RX.page.open({
        title: "新增配置",
        url: "/config/configAdd"
    });
}

//列表展示
function listShow() {
    RX.page.goto("/config/configList");
}
