/**
 * 元数据列表
 */
var sysMetaDataGridVm;
$(function () {

    //注册双击事件
    sysMetaDataSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title:"查看元数据",
            url:"/report/sysMetaDataView",
            areaType:"big",
            param: {id: rowData.ID}
        });
    };

    sysMetaDataGridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        settings: sysMetaDataSettings,
        config: sysMetaDataConfig,
        afterMount: function () {
                //初始化列表按钮控件
                RX.button.init($("#operate"), buttonsJson);
             }
    });

});

/**
 * 新增元数据
 */
function addSysMetaData() {
        RX.page.open({
            title:"新增元数据",
            url:"/report/sysMetaDataEdit",
            areaType:"big"
        });
}

/**
 * 修改元数据
 */
function editSysMetaData() {
    var rowData = sysMetaDataGridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.open({
            title:"修改元数据",
            url:"/report/sysMetaDataEdit",
            areaType:"big",
            param: { id: rowData[0].ID }
        });
    } else {
       RX.msg(RX.SELECT_EDIT);
    }
}


<!--删除-->
/**
 * 删除元数据
 */
function delSysMetaData() {
    var obj = sysMetaDataGridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        RX.confirm(RX.CONFIRM_DELETE, function (index) {
            $.ajax({
                url: "/report/delSysMetaData?id=" + obj[0].ID,
                success: function () {
                     RX.msg(RX.SUCCESS_DELETE);
                     RX.page.prev().reload();
                }
            });
        });
    }
}


//刷新全局接口
RX.page.reload = function(param) {
sysMetaDataGridVm.reloadGrid(param);
};
