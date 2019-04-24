/**
 * 元数据列表
 */
var sysMetaDataGridVm;
$(function () {

    sysMetaDataGridVm = new Rxvm({
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
        var rows = sysMetaDataGridVm.getSelected();
        if (rows.length > 0) {
            var result = RX.page.param.callback(rows[0].ID);
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
    sysMetaDataGridVm.reloadGrid(param);
};
