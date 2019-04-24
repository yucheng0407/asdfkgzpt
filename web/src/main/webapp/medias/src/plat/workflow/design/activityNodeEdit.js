//获取上个页面缓存的节点工作流数据
var pro = RX.page.param;
var nodeProp = pro.property;
var nodeVm, tabPanel;
$(function () {
    //环节编码
    nodeConfig.nodeCode.dictConfig.dictCode = pro.flow.property.nodeCodeDictCode;
    //环节业务状态
    nodeConfig.ywzt.dictConfig.dictCode = pro.flow.property.workflowYwztZd;
    //初始化按钮
    RX.button.init($('.w_button_box'), buttonsJson);
    // 环节设置
    nodeVm = new Rxvm({
        el: "#box",
        config: nodeConfig,
        data: JSON.parse(JSON.stringify(nodeProp)),
        methods: {
            addRole: function () {
                RX.page.open({
                    title: "新增流程角色",
                    url: "/role/roleEdit?type=xz&wfTag=1&func=roleSelectCallback"
                })
            },
            editRole: function () {
                if (this.get("roleType") == 1) {
                    RX.alert("业务角色不可修改");
                }
                else if (this.get("roleType") == 3) {
                    RX.alert("岗位角色不可修改");
                }
                else {
                    RX.page.open({
                        title: "修改流程角色",
                        url: "/role/roleEdit?type=xg&wfTag=1&id=" + this.get("roleId") + "&func=roleSelectCallback"
                    })
                }
            },
            delRole: function () {
                RX.confirm("确认删除该角色吗？", function () {
                    $.ajax({
                        type: "post",
                        url: "/role/deleteRole",
                        data: {id: this.get("roleId")},
                        dataType: "json",
                        success: function (ar) {
                            if (ar.success) {
                                RX.msg(RX.SUCCESS_DELETE);
                                roleSelectCallback();
                            } else {
                                RX.alert("保存失败");
                            }
                        }
                    });
                });
            },
            changeStatus: function () {
                this.set("countersignValue", "");
                var countersignValue = this.get("countersignParameter");
                if (countersignValue == 0) {
                    this.setDisabled("countersignValue", true);
                } else {
                    this.setDisabled("countersignValue", false);
                }
            },
            clearCountersign: function () {
                this.set("countersignValue", "");
                this.set("countersignParameter", "");
            }
        },
        components: {
            "NodeSheetGrid": {
                config: nodeSheetConfig,
                methods: {
                    addSheet: function () {
                        this.$parent.append("sheets", {
                            sfyxSt: "VALID",
                            spxPrint: "0",
                            sheetMode: "EDIT",
                            sort: getMaxSort(this.get("list")) + 1,
                        });
                    },
                    delSheet: function (keypath) {
                        this.set(keypath + ".sfyxSt", "UNVALID");
                    }
                },
                afterMount: function () {
                }
            },
            "NodeButtonGrid": {
                config: nodeButtonConfig,
                methods: {
                    addButton: function () {
                        this.$parent.append("buttons", {sort: getMaxSort(this.get("list")) + 1, sfyxSt: "VALID"});
                    },
                    delButton: function (keypath) {
                        this.set(keypath + ".sfyxSt", "UNVALID");
                    }
                }
            }
        },
        afterMount: function () {
            //若环节编码为空
            if (!pro.flow.property.nodeCodeDictCode) {
                this.setConfig("nodeCode", {maxLength: 30, type: "normal"});
            }
            // 初始化tabPanel
            tabPanel = new TabPanel({
                renderTo: 'activityTab',
                fullTab: true,
                tabWidth: 70,
                active: 0,
                scrolled: true,
                contentScroll: false,
                heightResizable: true,
                items: [{title: "环节设置", cId: "tab1"}, {title: "办理人", cId: "tab2"},
                    {title: "环节表单", cId: "tab3"}, {title: "后处理", cId: "tab4"}, {title: "高级设置", cId: "tab5"}]
            });
            //设置form_box的高度
            setTimeout(function() {
                $(".form_box").innerHeight($("#box").innerHeight() - 45);
            }, 0);
            $(window).resize(function() {
                $("#box").innerHeight($(window).height() - $(".w_button_box").outerHeight());
                $("#activityTab").innerHeight($("#box").innerHeight());
                $(".form_box").innerHeight($("#box").innerHeight() - 45);
                tabPanel.resize();
            });
            if(this.get("countersignParameter") == 0) {
                this.setDisabled("countersignValue", true);
            }
            /*获取办理人*/
            var id = this.get("roleId");
            if (id && id != "null") {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/role/getRoleById?id=" + id + "&random=" + Math.random(),
                    success: function (ar) {
                        if (ar.success) {
                            roleSelectCallback(ar.data.id, ar.data.roleName, ar.data.roleCode, ar.data.roleType, null, ar.data.roleMade);
                        }
                    }
                });
                this.updateHistory();
            }
        }
    });
});

//保存环节属性
function saveNodeProp() {
    if (nodeVm.ruleValidate()) {
        //检查表单重复
        if (checkSheetIdRepeat()) {
            tabPanel.show(2);
            RX.alert("环节表单不能重复");
            return;
        }
        //检查表单序号重复
        if (checkSheetSortRepeat()) {
            tabPanel.show(2);
            RX.alert("环节表单序号不能重复");
            return;
        }
        if (nodeProp) {
            var elem = JSON.parse(nodeVm.getJson());
            for (var key in elem) {
                nodeProp[key] = elem[key];
            }
            //给dom赋新名字
            var obj = pro._obj;
            if (obj != null) {
                var newName = elem.name;
                obj.attr("title", newName);
                var text = obj.data("enclosedText");
                if (text != null) {
                    pro.textWrap2(text, 60, newName, 36);
                    text.attr("title", newName);
                }
            }
        }
        RX.page.close();
    } else {
        if ($("#tab1").find(".TextBoxErr").length > 0) {
            tabPanel.show(0);
        } else if ($("#tab3").find(".TextBoxErr").length > 0) {
            tabPanel.show(2);
        } else if ($("#tab5").find(".TextBoxErr").length > 0) {
            tabPanel.show(4);
        }
    }
}

//检查表单序号是否重复
function checkSheetSortRepeat() {
    var sheetVm = this.nodeVm.$refs.nodeSheetGrid;
    var sheetList = sheetVm.get("list");
    if (sheetList && sheetList.length > 0) {
        var sortArr = [];
        for (var i = 0; i < sheetList.length; i++) {
            if (sheetList[i].sfyxSt != "UNVALID") {
                sortArr.push($.trim(sheetList[i].sort.toString()));
            }
        }
        return isRepeat(sortArr);
    }
    return false;
}

//检查表单是否重复
function checkSheetIdRepeat() {
    var sheetVm = this.nodeVm.$refs.nodeSheetGrid;
    var sheetList = sheetVm.get("list");
    if (sheetList && sheetList.length > 0) {
        var sortId = [];
        for (var i = 0; i < sheetList.length; i++) {
            if (sheetList[i].sfyxSt != "UNVALID") {
                sortId.push($.trim(sheetList[i].sheet_id.toString()));
            }
        }
        return isRepeat(sortId);
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

//节点表单字典项获取
function getNodePageDict() {
    var sheetDict = [], sheets;
    if (pro && (sheets = pro.flow.property.sheets)) {
        for (var i = 0; i < sheets.length; i++) {
            if (sheets[i].sheet_id && sheets[i].sfyxSt != "UNVALID" && sheets[i].name) {
                sheetDict.push({"code": sheets[i].sheet_id, "value": sheets[i].name});
            }
        }
    }
    return sheetDict;
}

//获取退回环节编码
function getDisagreeNodeDict(model) {
    var dNodeDict = [], nodes;
    var inTag = false;
    if (pro && (nodes = pro.flow.property.nodes)) {
        for (var i = 0; i < nodes.length; i++) {
            var tnode = nodes[i];
            if (tnode.domid && tnode.sfyxSt != "UNVALID" && model.get("domid") != tnode.domid
                && nodes[i].type == "2" && nodes[i].name) {
                dNodeDict.push({"code": nodes[i].domid, "value": nodes[i].name});
                if (model.get("disagreeNodeDomid") == tnode.domid) {
                    inTag = true;
                }
            }
        }
    }
    if (!inTag) {
        model.set("disagreeNodeDomid", "");
    }
    return dNodeDict;
}

//选择表单触发事件
function sheetIdChangeFunc(instance, keypath) {
    var sheetId = instance.get(keypath);
    var sheetName = $(instance.getElement(keypath)).find("option:selected").text();
    var sort = instance.get(instance.replacePath(keypath, "sort"));
    var title = instance.get(instance.replacePath(keypath, "title"));
    if (!sort || $.trim(sort.toString()) == "") {
        var sheetList = instance.get("list");
        instance.set(instance.replacePath(keypath, "sort"), getMaxSort(sheetList) + 1);
    }
    if (!title || $.trim(title.toString()) == "") {
        instance.set(instance.replacePath(keypath, "title"), sheetName);
    }
    instance.set(instance.replacePath(keypath, "name"), sheetName);
}

//取最大的序号
function getMaxSort(sheetList) {
    var maxSort = 0;
    if (sheetList && sheetList.length > 0) {
        for (var i = 0; i < sheetList.length; i++) {
            if (sheetList[i].sfyxSt != "UNVALID") {
                var tempSort = parseInt(sheetList[i].sort);
                if (tempSort > maxSort) maxSort = tempSort;
            }
        }
    }
    return maxSort;
}

//办理角色切换事件
function roleChangeFunc(model) {
    nodeVm.set({roleId: "", roleName: "", roleCode: "", roleType: "", roleTypeName: ""});
    reloadRoleDetail();
}

// 选择角色回调方法
function roleSelectCallback(id, name, code, roleType, roleTypeName, roleMade) {
    nodeVm.set("roleId", id);
    nodeVm.set("roleName", name);
    nodeVm.set("roleCode", code);
    nodeVm.set("roleType", roleType);
    nodeVm.set("roleMade", roleMade);
    var typeName = "";
    if (roleType == "1") {
        typeName = "业务角色";
    } else if (roleType == "2") {
        typeName = "流程角色";
    } else if (roleType == "3") {
        typeName = "岗位角色";
    }
    nodeVm.set("roleTypeName", typeName);
    reloadRoleDetail(id, roleMade);
}

//加载角色关联要素
function reloadRoleDetail(id, roleMade) {
    if (id) {
        $("#roleElementFrame").show();
        $("#roleElementFrame").attr("src", RX.handlePath("/role/roleElementView?id=" + id + "&roleMade=" + roleMade));
    } else {
        $("#roleElementFrame").hide();
    }
}

/**
 * 按钮配置中类型改变事件，设置默认值
 * ps：目前可以定制的为提交型和自定义型
 * 提交型：传入不同参数，判断分支；自定义型：调用页面函数；其它是为了快速添加系统按钮。
 */
function changeButtonType(vm, keypath) {
    var objPath = keypath.substring(0, keypath.length - 5);
    var obj = vm.get(objPath);
    var btnTypeVal = obj.type;
    //自定义按钮
    if (btnTypeVal === RX.WF_DIY) {
        !obj.isShowInHandle && vm.set(objPath + ".isShowInHandle", "3");
    } else {
        //按钮名称默认
        !obj.name && vm.set(objPath + ".name", vm.getElement(objPath + ".type").find("option:selected").text());
        vm.set(objPath + ".isShowInHandle", "");
        var btnConfig = RX.cache(_top, "WFBTN")[btnTypeVal];
        !obj.code && vm.set(objPath + ".code", btnConfig.code);
        !obj.icon && vm.set(objPath + ".icon", btnConfig.icon);
    }
}

RX.page.cancelCheck = function () {
    if (nodeVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
}