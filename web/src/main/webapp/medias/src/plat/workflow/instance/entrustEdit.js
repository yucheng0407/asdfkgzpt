var id = RX.page.param.id;
var entrustVm;
$(function () {

    entrustVm = new Rxvm({
        el: "#entrustForm",
        config: entrustConfig,
        settings: {
            //获取数据
            getData: {
                url: "/workflow/instance/getEntrustById?id=" + id + "&random=" + Math.random()
            }
        }
    });

    //保存方法
    $("#save").click(function () {
        if (entrustVm.ruleValidate()) {
            $.ajax({
                type: "post",
                url: "/workflow/instance/saveEntrust",
                data: {sysEntrust: entrustVm.getJson()},
                dataType: "json",
                success: function (ar) {
                    if (ar.success) {
                        RX.msg("保存成功");
                        RX.page.close();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
    });
});

//选择委办人回调函数
function entrustUserSelectCallback(name, id) {
    entrustVm.set("entrustUserId", id);
    entrustVm.set("entrustUserName", name);
}


