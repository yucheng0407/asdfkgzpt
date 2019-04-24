/**
 * 元数据列表
 */
var sysMetaDataGridVm;
var detail = RX.page.param.detail;
$(function () {

    var $show = $(".base_box"),
        settings = {};
    if (!detail) {
        $show.append("<div class='noMetaData'>" +
            "请先  <a href='javascript:void(0);' >选择元数据实现细节</a></div>");
        $show.find("a").click(function () {
            $("*[rx-path='detail']", parent.document).trigger("click");
        })
    }else{
        $.ajax({
            type: "post",
            url: "/report/getSysMetaDataColumnList",
            data: {tableName: detail},
            dataType: "json",
            success: function (ar) {
                if (ar.success) {
                    getTableSettings(ar.data);
                    initShowGrid();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }

    function getTableSettings(detailColumns) {
        var columns = [];
        $.each(detailColumns, function (i, t) {
            var col = {title: t.COLUMN_NAME, id: t.COLUMN_NAME, align: 'left', renderer: "String"};
            if (t.DATA_TYPE == "DATE") {
                col.renderer = "Date";
                col.format = "yyyy-MM-dd HH:mm";
            }
            columns.push(col);
        });
        settings.url = "/report/getSysMetaDataShowListPage?tableName=" + detail;
        settings.autoListBox = {
            enable: true,
            columns: columns,
            allPageChose: false //是否开启全页选择
        }
    }

    function initShowGrid() {
        //视图初始化
        new Rxvm({
            widget: RX.Grid,
            el: $show[0],
            template: '<div class="list_box"></div>',
            settings: settings
        });
    }
});
