/**
 * 附件编辑页面
 * Created by admin on 2017-2-16.
 */
$(function () {
    var type = RX.page.param.type;
    //获取初值
    var uuid = RX.page.param.fj_id;
    //依据参数确定选择的状态配置
    var fjVm = new Rxvm({
        el: ".form_box",
        config: config
    })
    fjVm.set("fj_id", uuid);
});




