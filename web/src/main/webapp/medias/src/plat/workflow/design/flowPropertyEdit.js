var flowVm, tabPanel;
var flowProp = RX.page.prevWin().property;
$(function(){
    //初始化按钮
    RX.button.init($('.w_button_box'), buttonsJson);
    // 基本信息
    flowVm = new Rxvm({
        el: "#box",
        config: flowConfig,
        data: JSON.parse(JSON.stringify(flowProp)),
        methods: {
            changeTitle: function () {
                this.set("instanceTitle", this.get("name"));
            }
        },
        components: {
            "FlowSheetGrid": {
                widget: RX.Grid,
                config: sheetConfig,
                methods: {
                    addSheet: function () {
                        this.append("list", {sort: getMaxSort(this.get("list")) + 1, sfyxSt: "VALID"});
                    },
                    delSheet: function (keypath) {
                        this.set(keypath + ".sfyxSt", "UNVALID");
                    }
                }
            },
            "FlowVariableGrid": {
                widget: RX.Grid,
                config: variableConfig,
                methods: {
                    addVariable:function(){
                        this.append("list",{sfyxSt:"VALID"});
                    },
                    delVariable:function(keypath){
                        this.set(keypath + ".sfyxSt", "UNVALID");
                    }
                }
            }
        },
        afterMount: function () {
            var operatingStatus = this.get('operatingStatus');
            //若为修改或者新版本流程编码不可修改
            if (operatingStatus == '2' || operatingStatus == '3' || operatingStatus == '5') {
                this.setDisabled("code", true);
            }
            //初始tabPanel
            tabPanel = new TabPanel({
                renderTo: 'flowTab',
                fullTab: true,
                tabWidth: 70,
                active: 0,
                scrolled: true,
                contentScroll: false,
                heightResizable: true,
                items: [{title: "基本信息", cId: "tab1"}, {title: "表单", cId: "tab2"},
                    {title: "变量", cId: "tab3"}, {title: "后处理", cId: "tab4"}]
            });
            //设置form_box的高度
            setTimeout(function() {
                $(".form_box").innerHeight($("#box").innerHeight() - 45);
            }, 0);
            $(window).resize(function() {
                $("#box").innerHeight($(window).height() - $(".w_button_box").outerHeight());
                $("#flowTab").innerHeight($("#box").innerHeight());
                $(".form_box").innerHeight($("#box").innerHeight() - 45);
                tabPanel.resize();
            });
        }
    });
});

//保存流程信息
function saveWorkflow() {
    if (flowVm.ruleValidate()) {
        //检查表单序号重复
        if(checkSheetSortRepeat()) {
            tabPanel.show(1);
            RX.alert("表单序号不能重复");
            return;
        }
        //检查变量名称重复
        if(checkVariableNameRepeat()) {
            tabPanel.show(2);
            RX.alert("变量名称不能重复");
            return;
        }
        if (!flowVm.get("workflowYwztZd")) {
            clearYwzt();
        }
        var elem = RX.parseJson(flowVm.getJson());
        for (var key in elem) {
            flowProp[key] = elem[key];
        }
        RX.page.close();
    } else {
        if ($("#tab1").find(".TextBoxErr").length > 0) {
            tabPanel.show(0);
        } else if ($("#tab2").find(".TextBoxErr").length > 0) {
            tabPanel.show(1);
        } else if ($("#tab3").find(".TextBoxErr").length > 0) {
            tabPanel.show(2);
        }
    }
}

//检查表单序号是否重复
function checkSheetSortRepeat() {
    var sheetVm = this.flowVm.$refs.flowSheetGrid;
    var sheetList = sheetVm.get("list");
    if(sheetList && sheetList.length > 0) {
        var sortArr = [];
        for (var i = 0; i < sheetList.length; i++) {
            if(sheetList[i].sfyxSt != "UNVALID") {
                sortArr.push($.trim(sheetList[i].sort.toString()));
            }
        }
        return isRepeat(sortArr);
    }
    return false;
}

//检查变量名称是否重复
function checkVariableNameRepeat() {
    var variableVm = this.flowVm.$refs.flowVariableGrid;
    var varList = variableVm.get("list");
    if(varList && varList.length > 0) {
        var nameArr = [];
        for (var i = 0; i < varList.length; i++) {
            if(varList[i].sfyxSt != "UNVALID") {
                nameArr.push($.trim(varList[i].name.toString()));
            }
        }
        return isRepeat(nameArr);
    }
    return false;
}

// 检查数组重复
function isRepeat(arr) {
    if (arr && arr.length > 0) {
        var sArr = arr.sort();
        for (var i = 0; i < sArr.length - 1; i++) {
            if (sArr[i] == sArr[i + 1]) {
                return true;
            }
        }
    }
    return false;
}

//选择表单回调
function sheetCallback(sheetId, sheetName, keyPath) {
    var sheetVm = this.flowVm.$refs.flowSheetGrid;
    var sheetSort = sheetVm.get(sheetVm.replacePath(keyPath, "sort"));
    var sheetTitle = sheetVm.get(sheetVm.replacePath(keyPath, "title"));
    if(!sheetSort || $.trim(sheetSort.toString()) === "") {
        sheetVm.set(sheetVm.replacePath(keyPath, "sort"), getMaxSort(sheetVm.get("list")) + 1);
    }
    if(!sheetTitle || $.trim(sheetTitle.toString()) === "") {
        sheetVm.set(sheetVm.replacePath(keyPath, "title"), sheetName);
    }
    sheetVm.set(sheetVm.replacePath(keyPath, "sheet_id"), sheetId);
    sheetVm.set(sheetVm.replacePath(keyPath, "name"), sheetName);
}
//取最大的序号
function getMaxSort(sheetList) {
    var maxSort = 0;
    if(sheetList && sheetList.length > 0) {
        for (var i = 0; i < sheetList.length; i++) {
            if (sheetList[i].sfyxSt != "UNVALID") {
                var tempSort = parseInt(sheetList[i].sort);
                if (tempSort > maxSort) maxSort = tempSort;
            }
        }
    }
    return maxSort;
}
//设置表单禁选
function setDisabledChoose() {
    var selIds = '';
    var sheetVm = this.flowVm.$refs.flowSheetGrid;
    var sheetList = sheetVm.get("list");
    if (sheetList && sheetList.length > 0) {
        for (var i = 0; i < sheetList.length; i++) {
            if(sheetList[i].sfyxSt != "UNVALID") {
                selIds += sheetList[i].sheet_id.toString() + ",";
            }
        }
    }
    if (selIds !== '') {
        selIds = selIds.substr(0, selIds.length - 1);
    }
    return '&selIds=' + selIds;
}

//选择流程类型回调
function workflowTypeCallback(typeId, typeName) {
    flowVm.set("type", typeId);
    flowVm.set("typeName", typeName);
}

//业务状态字典选择回调接口
function ywzdSelectCallBack(code, name) {
    flowVm.set("workflowYwztZd", code);
    flowVm.set("workflowYwztZdName", name);
}

function clearYwztZd() {
    flowVm.set("workflowYwztZd", "");
    flowVm.set("workflowYwztZdName", "");
}

//环节编码字典选择回调接口
function nodeCodeDictSelectCallBack(code, name) {
    flowVm.set("nodeCodeDictCode", code);
    flowVm.set("nodeCodeDictName", name);
}

function clearNodeCode() {
    flowVm.set("nodeCodeDictCode", "");
    flowVm.set("nodeCodeDictName", "");
}

//清空环节业务状态
function clearYwzt() {
    var nodes = flowProp.nodes;
    for (var i = 0, nodesLength = nodes.length; i < nodesLength; i++) {
        //是活动环节或者嵌套环节
        nodes[i].ywzt = "";
    }
}

RX.page.cancelCheck = function () {
    if (flowVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
}