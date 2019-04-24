//视图对象
var gridVm;
$(function () {

    //按钮初始化
    RX.button.init($("#operate"), buttonsJson);

    //双击事件注册
    settings.autoListBox.onRowDblClick = function(rowIndex, rowData, isSelected, event){
        RX.page.open({title:"查看示例组织", url:"/demo/cmptDemoOrganView?id=" + rowData.ID});
    }

    //列表视图初始化
    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: settings
    });
});

//新增按钮事件
function add() {
    RX.page.open({title:"新增示例组织", url:"/demo/cmptDemoOrganEdit?type=xz"});
}

//编辑按钮响应
function edit() {
    //编辑
    var rowData = gridVm.getSelected();
    if (rowData.length == 1) {
        RX.page.open({title:"修改示例组织", url:"/demo/cmptDemoOrganEdit?id=" + rowData[0].ID});
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}

function showDetail(id){
    RX.page.open({title:"查看示例组织", url:"/demo/cmptDemoOrganView?id=" + id});
}

//刷新全局接口
RX.page.reload = function(param) {
    gridVm.reloadGrid(param);
}
