var vm,
    id = RX.page.param.id;
$(function () {
    //视图初始化
    vm = new Rxvm({
        el: '.form_box',
        config: config,
        settings: {
            getData: {
                url: id && "/config/getConfigById",
                param: {id: id}
            }
        },
        afterMount: function () {
            //初始化表单按钮控件
            buttons = RX.button.init($(".w_button_box"), buttonsJson, "xz");
        }
    });
});

//设置所属应用回调
function selectAppCallback(id, name, code) {
    vm.set("appId", id);
    vm.set("appName", name);
}

//保存事件
function save() {
    if (vm.ruleValidate()) {
        $.ajax({
            type: "post",
            url: "/config/saveConfig",
            data: {config: vm.getJson()},
            dataType: "json",
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

//关闭修改验证
RX.page.cancelCheck = function () {
    if (vm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
}
