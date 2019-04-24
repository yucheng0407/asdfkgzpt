//视图对象
var gridVm;
$(function () {

    //视图对象初始化
    gridVm = new Rxvm({
        widget: RX.Grid,
        config: config,
        el: '.base_box',
        settings: settings,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });

});

//页面刷新方法
RX.page.reload = function (param) {
    gridVm.reloadCurrent(param);
};

function exportGrid(){
    gridVm.exportGrid();
}