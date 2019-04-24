var vm;
$(function () {
    vm = new Rxvm({
        widget: RX.Grid,
        template:"loadTpl:noButtonGridTpl",
        el:".base_box",
        settings: settings,
        config: config
    });
});