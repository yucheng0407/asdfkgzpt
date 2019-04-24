var func = param.func;     //回调函数
var param=RX.page.param;
var deviceIds=param.deviceIds;
$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");
    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '.form_box',
        settings:  deviceListSettings,
        config: deviceListConfigs,
        afterMount: function () {

        }
    });
});

/**
 * 确定
 * */
function qd() {
    var obj = gridVm.getSelected();
    if (!obj || obj.length === 0) {
        RX.msg(RX.SELECT_OPERATE);
        return;
    }
    var id = obj[0].ID;
    var name = obj[0].DEVICE_NAME;
    var equipmentParent=obj[0].EQUIPMENT_PARENT;
    var equipmentChild=obj[0].EQUIPMENT_CHILD;
    if (deviceIds!=''||deviceIds!=undefined) {
        var arr = deviceIds.split(',');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == id) {
                RX.msg("不要重复选择",RX.ERROR_OPREATE);
                return;
            }
        }
    }
    var evalFunc = RX.page.prev().window[func];
    evalFunc(id,name,equipmentParent,equipmentChild);
    RX.page.close();
}