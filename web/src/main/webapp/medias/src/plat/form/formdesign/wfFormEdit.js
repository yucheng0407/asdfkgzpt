var textVm;
var param = RX.page.param, dataId = param.page.dataId;
$(function () {
    var mainConfig = {
        id: {
            display: false
        }
    };
    var formControl = new FormControl($(".form_box"));
    var url;
    if (dataId) {
        url = "/form/getFormData?id=" + dataId + "&formId=" + param.formId;
    }
    //根据url获取数据
    var data = RX.page.get(url);
    //渲染vm
    textVm = new Rxvm({
        el: '.form_box',
        config: $.extend(mainConfig, formControl.getConfig()),
        data: data
    });
    //设置主Rxvm
    RX.page.setMainVm(textVm);
});

RX.page.submitWf = function () {
    var result = {flg: false};
    $.ajax({
        type: "post",
        url: "/form/saveFormData",
        async: false,
        data: {dataJson: textVm.getJson(), formId: param.formId, param: JSON.stringify(param)},
        success: function (ar) {
            if (ar.success) {
                result.flg = true;
                //如果是主表单返回ywDataId，表单设计的统一按副表单数据处理
                //业务数据ID
                result.dataId = ar.data;
            } else {
                result.msg = ar.msg;
            }
        }
    });
    return result;
};

//供工作流调用：删除业务数据
RX.page.deleteWf = function () {
    return RX.page.del({
        url: "/form/delFormData?formId=" + param.formId + "&id=" + dataId
    });
};
