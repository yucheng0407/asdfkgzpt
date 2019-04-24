/**
 * 引用历史列表
 */
var GridVm;
var yyobj=null;
$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");
    //注册双击事件
    settings.autoListBox.onRowClick = function (rowIndex, rowData, isSelected, event) {
        var obj = GridVm.getSelected();
        yyobj=obj;
    };
    GridVm = new Rxvm({
        widget: RX.Grid,
        el: '.form_box',
        settings: settings,
        config: config,
        afterMount: function () {

        }
    });
});

//引用历史记录
function  yy() {
    //如果为空提醒
    if(yyobj==null){
        RX.msg({icon: RX.ICON_ERROR, msg: "请选择引用对象"});
        return;
    }
    RX.page.prev().close();
    RX.page.close();
    RX.page.open({
        title: "引用历史",
        url: "/bqgl/bqglEdit?id="+yyobj[0].ID+"&type=yyls"
    });
}