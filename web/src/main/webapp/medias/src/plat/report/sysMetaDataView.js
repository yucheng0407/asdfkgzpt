var sysMetaDataVm;
var id = RX.page.param.id;

$(function () {

    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson,"ck");

    //视图初始化
    sysMetaDataVm = new Rxvm({
        el: '.form_box',
        template: '#sysMetaDataForm',
        config: config,
        settings: {
            getData: {
                url: "/report/getSysMetaDataById?id=" + id
            }
        },
        afterMount: function () {
            var detail = this.get("detail");
            if(this.get("type") == "2"){
                viewTextShow(detail);
            }else{
                metaDataShow(detail);
            }
        }
    });
});


/**
 * 显示元数据细节查询列表
 */
function metaDataShow(detail) {
    RX.page.resize();
    $("#metadataPreview").attr("src",RX.handlePath("/report/metaDataPreview?detail="+detail));
}

/**
 * 展示视图逻辑
 * @param detail
 */
function viewTextShow(detail){
    if (!detail) {
        return false;
    }
    if(sysMetaDataVm.get("type") == "2"){
        $.ajax({
            type: "post",
            url: "/report/getViewText",
            data: {tableName: detail},
            dataType: "json",
            success: function (ar) {
                if (ar.success) {
                    sysMetaDataVm.set("viewText", ar.data);
                    metaDataShow(detail);
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }else{
        return false;
    }
}