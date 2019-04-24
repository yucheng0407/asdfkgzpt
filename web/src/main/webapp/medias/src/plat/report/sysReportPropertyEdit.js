/**
 * SysMetaData(元数据)表单
 */
var formVm;
var param = RX.page.param;
var lastCode = param.data.code;
var calDictObj = {};

$(function () {
    var calDict = CR.getZdDict("BBZDSZLX");
    if(calDict){
        $.each(calDict,function(i,t){
            calDictObj[t["code"]] = t["value"];
        })
    }

    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");

    if (param.data.dataType != "NUMBER") {
        config.calculateType.dictConfig.pcode = "1";
    }
    //视图初始化
    formVm = new Rxvm({
        el: '.form_box',
        config: config,
        data: param.data
    });
});

function changeName(){
    var name = (formVm.get("name") || "").trim().toString();
    var calType = formVm.get("calculateType");
    if(name){
        if(name.endWith("计数") || name.endWith("合计")){
            name = name.substring(0, name.length - 2);
        }else if(name.endWith("平均值") || name.endWith("最大值")
            || name.endWith("最小值") || name.endWith("中位数")){
            name = name.substring(0, name.length - 3);
        }
    }
    name += calDictObj[calType];
    formVm.set("name", name);
}
/**
 * 保存方法
 */
function save() {
    if (formVm.ruleValidate()) {
        var result = param.callback(formVm.getData(), lastCode);
        if (typeof result === "boolean" && !result) {
            RX.msg(RX.ICON_ERROR, "字段编码不可重复");
        } else {
            RX.page.close();
        }
    }
}

//关闭验证
RX.page.cancelCheck = function () {
    if (formVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};

