/**
 * SysSubdict(系统字典表（从表）)表单
 */

var dictCode = RX.page.param.dictCode;//字典编码
var pdictCode = RX.page.param.pdictCode;//父级字典编码
var pdictIsEmpty = RX.page.param.pdictIsEmpty; //父级字典是否为空 todo
var editSubDict = RX.page.param.editFunc; //
var getSubDict = RX.page.param.getFunc;
var dictType = RX.page.param.dictType;
var maxSort = RX.page.param.maxSort;
var choseSubData = RX.page.param.choseSubData || {}; //修改是选择的子数据
var choseKeyData = RX.page.param.choseKeyData || {}; //修改是选择的子数据
var type = RX.page.param.type; //状态
var sysSubdictFormVm;
$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");
    //视图初始化
    sysSubdictFormVm = new Rxvm({
        el: '.form_box',
        template: '#sysSubdictForm',
        data: choseSubData,
        config: config,
        afterMount: function () {
            //非平台字典
            if (dictType !== "1" && dictCode) {
                sysSubdictFormVm.getElement("code").bind("blur", function () {
                    var code = sysSubdictFormVm.get("code");
                    if (!code.startWith(dictCode + "_")) {
                        sysSubdictFormVm.getElement("code").val("请以" + dictCode + "_开头");
                    }
                });
            }
        }
    });
    //不存在上级字典
    if (!pdictCode) {
        sysSubdictFormVm.set("flag", 'input');
        sysSubdictFormVm.setConfig("pcode", {maxLength: 30, type: "normal"});
    }

    if (type === "xz") {
        //非平台字典
        if (dictType !== "1" && dictCode) {
            sysSubdictFormVm.set("code", dictCode + "_" + (parseInt(maxSort) + 1));
            sysSubdictFormVm.set("sort", (parseInt(maxSort) + 1));
        } else {
            //平台字典
            sysSubdictFormVm.set("sort", (parseInt(maxSort) + 1));
        }
    }

});


/**
 * 保存方法
 */
function save() {
    if (sysSubdictFormVm.ruleValidate()) {
        var result;
        var evalFunc = RX.page.prevWin()[editSubDict];
        //上级字典的名称
        var pName="";
        if(pdictCode){
             pName = sysSubdictFormVm.getElement("pcode")[0].title;
        }
        sysSubdictFormVm.set("pName", pName);
        result = evalFunc(choseKeyData.key, sysSubdictFormVm.getJson());
        // result = evalFunc(choseKeyData);
        if (result == "2") {
            RX.msg(RX.ICON_WARNING, "字典项编码已存在");
        } /*else if (result == "3") {
            RX.msg(RX.ICON_WARNING, "字典项值已存在");
        }*/ else if (result == "4") {
            RX.msg(RX.ICON_WARNING, "字典项序号已存在");
        } else {
            RX.page.close();
        }
    }
}

RX.page.cancelCheck = function () {
    if (sysSubdictFormVm.ifChange()) {
        RX.confirm("页面已修改，确认关闭吗", function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};

function getParentDict() {
    if (pdictCode && pdictIsEmpty == 0) {
        return RX.getDictByCode(pdictCode, null);
    } else {
        RX.log("没有上级字典，或上级字典为空");
    }
}
