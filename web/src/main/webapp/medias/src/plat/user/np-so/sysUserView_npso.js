var sysUserVm;var id = RX.page.param.id;
$(function () {
    //初始化表单按钮控件
    RX.button.init($(".w_button_box"), buttonsJson, "ck");

    //视图初始化
    sysUserVm = new Rxvm({
        el: '.form_box',
        template: '#sysUserForm',
        config: config,
        settings: {
            getData: {
                url: "/user/getSysUserById?id=" + id,
                success: function (ar) {
                    return ar.data;
                }
            }
        },
        //子组件声明
        components: {
            "SysGlbRoleGrid": {
                widget: RX.Grid,
                template: '#sysGlbRole'
            },
            "SysGlbUser": {
                widget: RX.Grid,
                template: '#sysGlbUser'
            },
            "OrganRole": {
                widget: RX.Grid,
                template: '#organRole'
            }
        },
        afterMount:function () {
        }
    });
});

function getBlock() {
    return [{code: "0", value: "否"}, {code: "1", value: "是"}]

}
