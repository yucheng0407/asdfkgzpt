//视图对象
var gridVm;

$(function () {

    //配置渲染页后置
    /*settings.afterLoad = function (rows, total, pageNo) {
        layer.msg("本页条数:" + rows.length + ",总条数" + total + ",当前页码:" + pageNo, {
            icon: 1,
            offset: '50px',
            time: 2000
        });
    };*/
    //配置无数据后置
    settings.afterNoData = function () {
        layer.msg('无数据', {
            icon: 1,
            offset: '50px',
            time: 2000
        });
    };
    //配置异常后置
    settings.afterError = function () {
        layer.msg('请求数据异常', {
            icon: 1,
            offset: 't',
            time: 2000
        });
    };

    //视图对象初始化
    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: settings,
        config: config,
        methods: {
            //双击事件注册
            dblclickItem: function (keypath) {
                RX.page.open({
                    title: "查看示例用户",
                    url: "/demo/cmptDemoUserView?id=" + this.get(keypath).ID
                });
            }
        },
        afterMount:function(){
            //按钮区初始化
            RX.button.init($("#operate"), buttonsJson);
        }
    });

});

//新增按钮事件
function add() {
    RX.page.open({title:"新增示例用户", areaType:"big", url:"/demo/cmptDemoUserEdit?type=xz"});
}

//编辑按钮响应
function edit() {
    var rowData = gridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.open({
            title: "修改示例用户",
            areaType: "big",
            url: "/demo/cmptDemoUserEdit?id=" + rowData[0].ID
        });
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}


//刷新全局接口
RX.page.reload = function (param) {
    gridVm.reloadGrid(param);
}

//性别字典获取接口
function getSexDict2(dictType) {
    return allDictYm[dictType];
}

function getSexDict( ) {
    return [
        {"value": "男", "code": "0"},
        {"value": "女", "code": "1"}
    ];
}
var  allDictYm= {
    "SEX": [
        {"value": "男", "code": "0"},
        {"value": "女", "code": "1"}
    ]
};

function refreshPage(){
    RX.page.refresh(null, true);
}
