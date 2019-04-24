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
    //按钮配置
    var buttonArr = [
    ];

    var buttonsJson = {
        tag: ".w_button_box",
        buttons: buttonArr,
        editButton: {
            enable: true,
            editUrl: {url: "/form/testSaveFormEdit", param: {id: dataId, formId: param.formId}}, //默认采用查看页面的View替换Edit,并将id传入
            code: "EDIT_USER"
        }
    };
    RX.button.init($("#w_butt"), buttonsJson, "ck");
});

function save() {
    if (textVm.ruleValidate()) {
        $.ajax({
            type: "post",
            url: "/form/saveFormData",
            data: {
                dataJson: textVm.getJson(),
                formId: RX.page.param.formId
            },
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.prev().reload();
                    RX.page.close();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}