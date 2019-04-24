/**
 * SysMetaData(元数据)表单
 */
var id = RX.page.param.id;
var sysMetaDataFormVm;
var lastDetail;
$(function () {

    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");

    //视图初始化
    sysMetaDataFormVm = new Rxvm({
        el: '#baseDiv',
        template: '#sysMetaDataForm',
        config: config,
        settings: {
            getData: {
                url: id && "/report/getSysMetaDataById",
                param: {id: id}
            }
        },
        methods: {
            selectView: function () {
                $("*[rx-path='detail']").trigger("click");
            },
            buildView: function () {
                RX.page.open({
                    title: "新建视图",
                    areaType: ["700px", "280px"],
                    url: "/report/dataViewEdit",
                    param: {
                        callback: function (detail) {
                            sysMetaDataFormVm.set("detail", detail);
                            detailSelectCallback(detail);
                        }
                    }
                })
            }
        },
        afterMount: function () {
            var detail = this.get("detail");
            if (this.get("type") == "2") {
                viewTextShow(detail);
            }
            metaDataShow(detail);
            RX.page.resize();
        }
    });
});

/**
 * 显示元数据细节查询列表
 */
function metaDataShow(detail) {

    var $show = $("#metaDataShow"),
        settings = {};
    if (lastDetail == detail) {
        return false;
    }
    RX.page.resize();
    $("#metadataPreview").attr("src",RX.handlePath("/report/metaDataPreview?detail="+detail));
}

/**
 * 展示视图逻辑
 * @param detail
 */
function viewTextShow(detail) {
    if (!detail) {
        return false;
    }
    if (sysMetaDataFormVm.get("type") == "2") {
        $.ajax({
            type: "post",
            url: "/report/getViewText",
            data: {tableName: detail},
            dataType: "json",
            success: function (ar) {
                if (ar.success) {
                    $("#viewText").text(ar.data);
                    RX.page.resize();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    } else {
        return false;
    }
}

/**
 * 类型变更响应方法
 */
function detailCheckFunc() {
    return "&type=" + sysMetaDataFormVm.get("type");
}

/**
 * 细节设置回调
 */
function detailSelectCallback(detail,comment) {
    sysMetaDataFormVm.set("detail", detail);
    if (sysMetaDataFormVm.get("type") == "2") {
        viewTextShow(detail);
    }
    metaDataShow(detail);
}

/**
 * 类型变更响应方法
 */
function typeChangeFunc() {
    sysMetaDataFormVm.set("detail", "");
    metaDataShow("");
}

/**
 * 保存方法
 */
function save() {
    if (sysMetaDataFormVm.ruleValidate()) {
        $.ajax({
            type: "post",
            url: "/report/saveSysMetaData",
            data: {sysMetaData: sysMetaDataFormVm.getJson()},
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.close();
                    RX.page.prev().reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}

//关闭验证
RX.page.cancelCheck = function () {
    if (sysMetaDataFormVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};
