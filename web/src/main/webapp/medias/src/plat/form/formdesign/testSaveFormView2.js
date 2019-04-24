var textVm;
$(function () {
    var param = RX.page.param, dataId = param.id;
    var mainConfig = {
        id: {
            display: false
        }
    };
    var formControl = new FormControl($(".form_box"), "ck");
    //视图初始化
    textVm = new Rxvm({
        el: '.form_box',
        config: $.extend(mainConfig, formControl.getConfig()),
        settings: {
            getData: {
                url: dataId && "/form/getFormData",
                param: {id: dataId, formId: param.formId},
                defaultData: {}
            }
        }
    });
});

