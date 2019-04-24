var id = RX.page.param.id;
var userVm;
$(function () {

    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");

    //视图初始化
    userVm = new Rxvm({
        el: '.form_box',
        config: config,
        settings: {
            getData: {
                url: id && "/demoUser/getDemoUserById",     //获取数据post请求的url，若url为空，则自动将defaultData作为vm的数据
                param: {id: id},                            //获取数据post请求的参数，可省略
                defaultData: {                                   //无请求时的默认数据，可省略
                    userName: "新案例用户"
                },
                success: function (ar, defaultData) {           //成功获取数据时，对数据的加工接口，返回加工后数据，可省略
                    var data = ar.data;
                    //若存在city值，则置sheng、shi为空
                    if (data && data.city) {
                        data.sheng = "";
                        data.shi = "";
                    }
                    return data;
                }
            }
        }
    });
});

//组织机构回调函数
function organSelectCallback(cid, keypath, organName, organId) {
    var cmpt = Rxvm.getViewModel(cid);
    cmpt.set(keypath, organName);
    cmpt.set(cmpt.replacePath(keypath, "organId"), organId);
}

//语言字典项获取接口
function getLanguage() {
    return [
        {"value": "java", "code": "0"},
        {"value": "javaScript", "code": "1"},
        {"value": "html", "code": "2"}
    ];
}

//城市变更事件
function changeCity(vm) {
    if (userVm.get("city")) {
        userVm.empty(["sheng", "shi"]);
        userVm.setDisabled(["sheng", "shi"], true);
        // userVm.setDisabled(["organName"], true);
        // userVm.set("organName","aaa");
        // userVm.setDisabled(["content"], true);
    } else {
        userVm.setDisabled(["sheng", "shi"], false);
        // userVm.setDisabled(["content"], false);
    }
}

/**
 * 保存方法
 */
function save() {
    if (userVm.ruleValidate()) {
        $.ajax({
            type: "post",
            url: "/demoUser/saveDemoUser",
            data: {demoUser: userVm.getJson()},
            dataType: "json",
            success: function (ar) {
                if (ar.success) {
                    // userVm.saveFileChange();
                    RX.msg("保存成功");
                    RX.page.close();
                    RX.page.prev().reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
    // userVm.setConfig("zp_id")
}

//关闭验证事件注册
RX.page.cancelCheck = function () {
    if (userVm.ifChange()) {
        RX.confirm("页面已修改，确认关闭吗", function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};

/**
 * 联想输入
 * @param value 页面的输入值
 */
function lxFunc(value) {
    // return ["张三", "李四", "王五"];
    //或者
    return [{NAME: "张三", ID: "11"}, {NAME: "李四", ID: "22"}, {NAME: "王五", ID: "33"}];
    //如果设置了linkId的清空，需要传入ID值
}
