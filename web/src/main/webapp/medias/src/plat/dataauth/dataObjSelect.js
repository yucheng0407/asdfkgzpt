$(function () {
    var param = RX.page.param;
    var objId = param.objId,
        func = param.func;
    tableSettings.url = "/auth/getZtObjList?objId=" + objId;
    var dataAuthVm = new Rxvm({
        widget: RX.Grid,
        el: '.base_box',
        template: "loadTpl:noButtonGridTpl",
        settings: tableSettings,
        config: searchConfig
    });
    $("#confirm").click(function () {
        var seObj = dataAuthVm.getSelected();
        if (seObj && seObj[0]) {
            var evalFunc = RX.page.prevWin()[func];
            var userNameArr = [], userIdArr = [];
            $.each(seObj, function (index, value) {
                userNameArr.push(value.OBJ_NAME);
                userIdArr.push(value.ID);
            });
            result = evalFunc(userIdArr, userNameArr);
            if (result || typeof(result) == "undefined") {
                RX.page.close();
            }
        } else {
            RX.alert("请选择至少一条数据");
        }
    });
});