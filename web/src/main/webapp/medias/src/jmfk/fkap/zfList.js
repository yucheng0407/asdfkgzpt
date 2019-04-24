var func = param.func;     //回调函数
$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");
    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '.form_box',
        settings:  xqListSettings,
        config: xqListConfigs,
        afterMount: function () {

        }
    });
})

/**
 * 确定
 * */
function qd() {
    var obj = gridVm.getSelected();
    if (!obj || obj.length === 0) {
        RX.msg(RX.SELECT_OPERATE);
        return;
    }
    var evalFunc = RX.page.prev().window[func];
    evalFunc(obj[0].ID,obj[0].MC,obj[0].ZFKSSJ,obj[0].ZFJSSJ);
    RX.page.close();
}