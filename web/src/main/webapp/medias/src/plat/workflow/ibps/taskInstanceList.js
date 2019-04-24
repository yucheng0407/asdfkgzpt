var taskInsVm;
$(function () {
    taskInsVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        data: {list: RX.page.param.list},
        settings: taskInsSettings
    });
});