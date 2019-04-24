var id = RX.page.param.id;
var sysDictVm;

$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "ck");

    //视图初始化
    sysDictVm = new Rxvm({
        el: '.form_box',
        template: '#sysDictForm',
        config: config,
        settings: {
            getData: {
                url: "/dict/getSysDictById?id=" + id
            }
        },
        components: {
            "SysSubdictGrid": {
                widget: RX.Grid,
                template: '#sysSubdict'
            }
        }
    });
});

function isEmpty() {
    return [{value: "否", code: 0}, {value: "是", code: 1}]

}