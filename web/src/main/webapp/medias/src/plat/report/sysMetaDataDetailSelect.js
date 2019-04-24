/**
 * 元数据列表
 */
var sysMetaDataDetailGridVm;
var func = RX.page.param.func;
$(function () {

    // //注册双击事件
    // sysMetaDataSettings.autoListBox.onRowDblClick = function (rowIndex, rowData, isSelected, event) {
    //     RX.page.open({
    //         title:"查看元数据",
    //         url:"/report/sysMetaDataView",
    //         param: {id: rowData.ID}
    //     });
    // };

    sysMetaDataDetailGridVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        data: {
            query: {
                type: RX.page.param.type
            }
        },
        template: "loadTpl:noButtonGridTpl",
        settings: sysMetaDataSettings,
        config: sysMetaDataConfig
    });

    $("#confirm").click(function () {
        var rows = sysMetaDataDetailGridVm.getSelected();
        if (rows.length > 0) {
            var evalFunc = RX.page.prevWin().RX.getGlobalFunc(func);
            var result = evalFunc(rows[0].TABLE_NAME, rows[0].COMMENTS || "");
            if (result || typeof(result) == "undefined") {
                RX.page.close();
            }
        } else {
            RX.msg(RX.SELECT_DATA);
        }
    })
});

//刷新全局接口
RX.page.reload = function (param) {
    sysMetaDataDetailGridVm.reloadGrid(param);
};
