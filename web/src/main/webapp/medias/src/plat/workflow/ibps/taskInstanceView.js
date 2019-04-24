var taskVm;
$(function () {
    taskVm = new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: "/workflow/ibps/getTaskInstance",
                param: RX.page.param
            }
        },
        afterMount: function () {
            var data = this.get();
            if (data && data[0]) {
                this.set("latest", data[0]);
            }
        }
    });
});