//视图对象
var gridVm;
$(function () {

    //配置双击事件响应
    settings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({title: "查看示例用户", areaType: "big", url: "/demo/cmptDemoUserView?id=" + rowData.ID});
    };
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
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });

});

function getColumns(){
    return columns;
}

//新增按钮事件
function add() {
    RX.page.open({title: "新增示例用户", areaType: "big", url: "/demo/cmptDemoUserEdit?type=xz"});
}

//修改按钮事件
function edit() {
    var rowData = gridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.open({title: "修改示例用户", areaType: "big", url: "/demo/cmptDemoUserEdit?id=" + rowData[0].ID});
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}

/**
 * 删除案例用户表
 */
function delDemoUser() {
    var obj = gridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        var ids = '';
        $.each(obj, function (i, item) {
            ids += item.ID + ",";
        });
        RX.confirm(RX.CONFIRM_DELETE, function (index) {
            $.ajax({
                url: "/demoUser/deleteBatch?ids=" + ids,
                success: function (ar) {
                    if (ar.success) {
                        RX.msg(RX.SUCCESS_DELETE);
                        RX.page.prev().reload();
                    } else {
                        RX.alert(ar.msg);
                    }

                }
            });
        });
    }
}

//页面刷新方法
RX.page.reload = function (param) {
    gridVm.reloadCurrent(param);
};

//案例：更改搜索区
function reloadQuery(){
    gridVm.reloadQueryBox({"query.zzmm":{display:false},"query.csrq":{tagName:"禁用",disabled:true,spanShow:false}});
}

//案例：更改列表配置
function setSetting(){
    var tempSetting = gridVm.getSetting();
    tempSetting.autoListBox.mulchose = !tempSetting.autoListBox.mulchose;
    tempSetting.limit = tempSetting.limit + 10;
    gridVm.setSetting(tempSetting);
}

function refreshPage(){
    RX.page.refresh(null, true);
}

function exportGrid(){
    gridVm.exportGrid();
}