var textVm;
$(function () {
    var formControl = new FormControl($(".form_box"));
    //视图初始化
    textVm = new Rxvm({
        el: '.form_box',
        config: formControl.getConfig(),
        settings: {
            getData: {
                url: null,   //通过事件自动获取
                //存在关联需要注意
                defaultData: {}
            }
        }
    });
});

