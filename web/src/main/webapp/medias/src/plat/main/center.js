var mainPage;
$(function () {
    $("#contentGdt").outerHeight($(window).height());
    $(window).resize(function () {
        $("#contentGdt").outerHeight($(window).height());
    });
    var data1 = [
        {
            type: "layout", height: "90px", children: [
            {
                type: "layout",
                width: "50",
                children:
                    [
                        {
                            type: "content",
                            renderType: "gxShow1",
                            renderData: [{name: "治安检查", icon: "&#xe631;", num: 121,color:"#ff6f9f;"},
                                {name: "退回案件", icon: "&#xe621;", num: 57,color:"#0e9aef;"},
                                {name: "监督考察", icon: "&#xe638;", num: 100,color:"#1ecbd9;"},
                                {name: "人口信息", icon: "&#xe612;", num: 9,color:"#ff9974;"}
                            ],
                            code: "code55"
                        }
                    ]
            }
        ]
        },
        {
            type: "layout", height: "300px", children:
            [
                {
                    type: "layout",
                    width: "50",
                    buttons: [{name: "更多", icon: "&#xe6a4;", click: "reloadTable1"},{name: "更多",click: "reloadTable1"}],
                    children:
                        [
                            {
                                type: "content",
                                title: "通知公告",
                                renderType: "dbrw",
                                code: "code1",
                                click: "showTb"
                            },
                            {type: "content", renderType: "li", title: "通知公告2", click: "aaa", code: "code2"}
                        ]
                },
                {
                    type: "layout", width: "50", children:
                    [
                        {
                            type: "content", renderType: "gxShow2", title: "消息提醒", click: "aaa", code: "code3",
                            renderData: [{name: "治安检查", icon: "&#xe631;", num: 121},
                                {name: "退回案件", icon: "&#xe621;", num: 57},
                                {name: "监督考察", icon: "&#xe638;", num: 100},
                                {name: "人口信息", icon: "&#xe612;", num: 9}
                            ],
                        }
                    ]
                }
            ]
        },
        {
            type: "layout", height: "200px", children: [
            {
                type: "layout",
                width: "50",
                children:
                    [
                        {
                            type: "content",
                            title: "业务应用",
                            renderType: "image",
                            limit: "10",
                            url: "/mainPage/getImageRes",
                            code: "code1",
                            click: "showTb"
                        }
                    ]
            }
        ]
        }
    ];
    mainPage = renderMainPage($("#contentGdt"), data1);
});

function reloadTable1() {
    mainPage.reload("code1");
}

function showTb(data) {
    RX.alert(data.name);
}

function reloadTable2() {
    RX.alert(12222);
}


function aaa(data) {
    RX.alert(data.name);
}

function bbb(data) {
    RX.alert(data.name);
}

function ccc(data) {
    RX.alert(data.name);
}

/**
 * 个性render
 * @param data
 * @param options
 * @param $el
 */
function gxRender(data, options, $el) {
    $.each(data, function (index, value) {
        $el.append(value.name);
    });
}

/**
 * 个性显示类型1
 */
function gxShow1(data, options, $el) {
    //实例化具体视图
    new Rxvm({
        //视图容器
        el: $el[0],
        //视图模板
        template: "#gxTpl1",
        //基础配置
        settings: {
            //获取数据
            getData: {
                defaultData: {data: data}
            }
        }
    });
}

function gxShow2(data, options, $el){
    //实例化具体视图
    new Rxvm({
        //视图容器
        el: $el[0],
        //视图模板
        template: "#gxTpl2",
        //基础配置
        settings: {
            //获取数据
            getData: {
                defaultData: {data: data}
            }
        }
    });
}
