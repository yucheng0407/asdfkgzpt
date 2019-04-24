var id = RX.page.param.id;
var sysOrganVm;

$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "ck");

    //视图初始化
    sysOrganVm = new Rxvm({
        el: '.form_box',
        template: '#sysOrganForm',
        config: config,
        settings: {
            getData: {
                url: "/organ/getSysOrganById?id=" + id
            }
        },      //子组件声明
        components: {
            "SysGlbRoleGrid": {
                widget: RX.Grid,
                template: '#sysGlbRole'
            },
            "SysGlbPostGrid": {
                widget: RX.Grid,
                template: '#sysGlbPost'
            }
        }
    });
});
