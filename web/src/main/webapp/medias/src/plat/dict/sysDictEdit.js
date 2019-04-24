/**
 * SysDict(系统字典表)表单
 */
var id = RX.page.param.id;
var sysDictFormVm;
$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");
debugger
    //视图初始化
    sysDictFormVm = new Rxvm({
        el: '.form_box',
        template: '#sysDictForm',
        config: config,
        settings: {
            getData: {
                url: id && "/dict/getSysDictById",
                param: {id: id},
                defaultData: {sysSubDictList: []}
            }
        },
        methods: {
            //字典项是否为空控制子项显示隐藏
            controlSubState: function () {
                if ('1' === sysDictFormVm.get("isEmpty")) {
                    $("#subDictList").hide();
                } else {
                    $("#subDictList").show();
                }
            },
            changeDictCode: changeDictCode
        },
        afterMount: function () {
            this.controlSubState();
            if (id) {
                sysDictFormVm.setDisabled("dictCode", true);
            }
        },
        //子组件声明
        components: {
            "SysSubdictGrid": {
                widget: RX.Grid,
                template: '#sysSubdict',
                config: sysSubdictConfig,
                settings: {
                    selectType: "single"
                },
                methods: {
                    //添加字典项
                    addSysSubdict: function () {
                        RX.page.open({
                            title: "新增字典项",
                            areaType: [450, 380],
                            url: "/dict/sysSubdictEdit",
                            param: {
                                type: "xz",
                                editFunc: "editSubDict",
                                pdictCode: sysDictFormVm.get("pdictCode") ? sysDictFormVm.get("pdictCode") : "",
                                pdictIsEmpty: sysDictFormVm.get("pdictIsEmpty"),
                                dictCode: sysDictFormVm.get("dictCode") ? sysDictFormVm.get("dictCode") : "",
                                maxSort: getMaxSort(),
                                dictType: sysDictFormVm.get("dictType")
                            }
                        })
                    },
                    //修改字典项
                    editSysSubdict: function () {
                        var choseSubData = this.getSelected();
                        var choseKeyData = this.getSelectedPathObject();
                        if (choseKeyData.length === 1) {
                            RX.page.open({
                                title: "修改字典项",
                                areaType: [450, 380],
                                url: "/dict/sysSubdictEdit",
                                param: {
                                    type: "xg",
                                    editFunc: "editSubDict",
                                    pdictCode: sysDictFormVm.get("pdictCode"),
                                    pdictIsEmpty: sysDictFormVm.get("pdictIsEmpty"),
                                    choseSubData: choseSubData[0], //选中的数据
                                    choseKeyData: choseKeyData[0]
                                }
                            });
                        } else {
                            RX.msg(RX.SELECT_EDIT);
                        }
                    },
                    //删除字典项
                    deleteSysSubdict: function () {
                        var keyData = this.getSelectedPathObject();
                        if (keyData.length > 0) {
                            RX.confirm(RX.CONFIRM_DELETE, function (index) {
                                $.each(keyData, function (i, t) {
                                    sysDictFormVm.$refs.sysSubdictGrid.set(t.key + ".sfyxSt", "UNVALID");
                                })
                            });
                        } else {
                            RX.msg(RX.SELECT_DELETE);
                        }
                    },
                    //更新字典编码
                    updateDictCode: function (code) {
                        var that = this;
                        $.each(that.get("list") || [], function (i, t) {
                            var preCode = that.get("list." + i + ".code");
                            var newCode;
                            if (preCode.indexOf("_") != -1) {
                                newCode = code + "_" + preCode.split("_")[1];
                            } else {
                                newCode = code + "_" + preCode;
                            }

                            that.set("list." + i + ".code", newCode);
                        })
                    }
                }
            }
        }
    })

});


/**
 * 保存方法
 */
function save() {
    //判断是否为空
    var isEmpty = sysDictFormVm.get("isEmpty");
    if (isEmpty == 1) {
        $.each(sysDictFormVm.$refs.sysSubdictGrid.get("list"), function (i, t) {
            sysDictFormVm.$refs.sysSubdictGrid.set("list." + i + ".sfyxSt", "UNVALID");
        })
    }
    if (sysDictFormVm.ruleValidate()) {
        $.ajax({
            type: "post",
            url: "/dict/saveSysDict",
            data: {
                sysDict: sysDictFormVm.getJson()
            },
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.close();
                    RX.page.prev().reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}

//是否为空配置切换
function changeIsEmpty(model, data) {
    var isEmpty = sysDictFormVm.get("isEmpty");
    //没有字典项
    if (isEmpty === "1") {
        $("#subDictList").hide();
        //有字典项
    } else if (isEmpty === "0") {
        $("#subDictList").show();
    }
}

//noinspection JSUnusedGlobalSymbols   新增、修改属性  回填
function editSubDict(key, modelJson) {
    var json = JSON.parse(modelJson);
    var result = checkIsRepeat(json.code, json.value, json.sort, key);
    if (key) {//key存在为修改状态
        if (result == "1") {
            sysDictFormVm.$refs.sysSubdictGrid.set(key, json);
        } else {
            return result;
        }
    } else {
        if (result == "1") {
            sysDictFormVm.append("sysSubDictList", {
                code: json.code,
                pcode: json.pcode,
                pName: json.pName,
                value: json.value,
                sort: json.sort,
                remark: json.remark,
                sfyxSt: "VALID"
            });
        } else {
            return result;
        }
    }
}

//验证是否重复
function checkIsRepeat(code, value, sort, key) {
    var models = sysDictFormVm.get("sysSubDictList");
    var flag = "1";
    for (var i = 0; i < models.length; i++) {
        if (key && key.split(".")[1] == i) {
            continue;
        }
        if (models[i].code == code && models[i].sfyxSt !== "UNVALID") {
            flag = "2"; //字典项编码重复
            break;
        }
        if (models[i].value == value && models[i].sfyxSt !== "UNVALID") {
            flag = "3"; //字典项值重复
            break;
        }
        if (models[i].sort == sort && models[i].sfyxSt !== "UNVALID") {
            flag = "4"; //字典项序号重复
            break;
        }
    }
    return flag;
}

//上级字典选择回调
function dictSelectCallback(code, name, isEmpty) {
    sysDictFormVm.set("pdictCode", code);
    sysDictFormVm.set("pdictName", name);
    sysDictFormVm.set("pdictIsEmpty", isEmpty);
    $.each(sysDictFormVm.$refs.sysSubdictGrid.get("list"), function (i, t) {
        sysDictFormVm.$refs.sysSubdictGrid.set("list." + i + ".pdictCode", code);
    });

    $.each(sysDictFormVm.get("sysSubDictList"), function (i, t) {
        sysDictFormVm.set("sysSubDictList." + i + ".pdictCode", code);
    })


}

//获取当前最大序号
function getMaxSort() {
    var models = sysDictFormVm.get("sysSubDictList");
    var len = models.length;
    if (len === 0) {
        return 0;
    } else {
        var max = 0;
        for (var i = 0; i < len; i++) {
            if (models[i].sfyxSt === "UNVALID") continue;
            var temp = parseInt(models[i].sort);
            if (temp > max) {
                max = temp;
            }
        }
        return max;
    }
}

//改变字典类型change事件触发函数
function changeDictType() {
    var dictCode = sysDictFormVm.get("dictCode");
    var dictType = sysDictFormVm.get("dictType");
    var models = sysDictFormVm.get("sysSubDictList");
    for (var j = 0, len = models.length; j < len; j++) {
        //非平台字典
        if (dictType !== "1" && dictCode) {
            var newCode = dictCode + "_" + models[j].get("code");
            models[j].setValue("code", newCode);
            //平台字典
        } else {
            newCode = models[j].get("code").replace(dictCode + "_", "");
            models[j].setValue("code", newCode);
        }
    }
}

//字典编码改变触发change事件
function changeDictCode() {
    var isEmpty = $("input[name='isEmpty']:checked").val();
    //有字典项
    if (isEmpty === "0") {
        var dictCode = sysDictFormVm.get("dictCode");
        var pdictCode = sysDictFormVm.get("pdictCode");
        var dictType = sysDictFormVm.get("dictType");
        //更新业务字典项的字典编码
        if(dictType=="2"){
            sysDictFormVm.$refs.sysSubdictGrid.updateDictCode(dictCode);
        }
    }
}

//关闭确认
RX.page.cancelCheck = function () {
    if (sysDictFormVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};