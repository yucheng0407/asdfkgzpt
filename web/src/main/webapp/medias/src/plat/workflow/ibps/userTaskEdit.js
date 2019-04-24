//获取当前环节的node数据
var pro, nodeSetting, nodeRole, nodeSheet, nodeAfterHandler, nodeExtra;
var nodeJson = getCurrentBpmnElementData(), flowJson = getFlowData();
$(function () {
    if (nodeJson.fromServer) {
        //从服务端获取
        $.ajax({
            url: "/workflow/ibps/getBpmnUserTask",
            type: "post",
            data: {wfId: bpmnProcId, domid: nodeJson.domid},
            success: function (data) {
                //前后端属性对应
                data.finishProcessSql = data.finishProcess;
                initRxvm(data);
            }
        });
    } else {
        initRxvm(nodeJson);
    }
});

function initRxvm(json) {
    //node基础设置
    //环节编码
    nodeConfig.nodeCode.dictConfig.dictCode = flowJson.nodeCodeDictCode;
    //环节业务状态
    nodeConfig.ywzt.dictConfig.dictCode = flowJson.workflowYwztZd;
    nodeSetting = new Rxvm({
        el: $("[data-tab='task-settings']")[0],
        config: nodeConfig,
        data: json,
        methods: {
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
        afterMount: function () {
            //设置序号
            if (!this.get("sort") && nodeJson.sort) {
                this.set("sort", nodeJson.sort);
            }
        }
    });

    //办理人设置
    nodeCandidate = new Rxvm({
        el: $("[data-tab='assignee']")[0],
        config: candidateCondig,
        widget: RX.Grid,
        data: {list: json.candidates},
        methods: {
            addCandidate: function () {
                RX.page.open({
                    title: "新增办理人",
                    url: "/workflow/ibps/userTaskCandidateEdit",
                    param: {
                        func: "candidateCallbackFunc"
                    }
                });
            },
            editCandidate: function (keypath) {
                RX.page.open({
                    title: "修改办理人",
                    url: "/workflow/ibps/userTaskCandidateEdit",
                    param: {
                        keypath: keypath,
                        candidate: this.get(keypath),
                        func: "candidateCallbackFunc"
                    }
                });
            },
            delCandidate: function (keypath) {
                this.set(keypath + ".sfyxSt", "UNVALID");
            }
        },
        filters: {
            joinRoleName: function (roleList) {
                var roleNames = [];
                if (roleList && roleList.length) {
                    $.each(roleList, function (i, e) {
                        if (e.sfyxSt !== "UNVALID") {
                            roleNames.push(e.roleName);
                        }
                    })
                }
                return roleNames.join(",");
            }
        }
    });

    //角色设置
    // nodeRole = new Rxvm({
    //     el: $("[data-tab='assignee']")[0],
    //     config: nodeRoleConfig,
    //     data: json,
    //     methods: {
    //         addRole: function () {
    //             RX.page.open({
    //                 title: "新增流程角色",
    //                 url: "/role/roleEdit?type=xz&wfTag=1&func=roleSelectCallback"
    //             })
    //         },
    //         editRole: function () {
    //             if (this.get("roleType") == 1) {
    //                 RX.alert("业务角色不可修改");
    //             }
    //             else if (this.get("roleType") == 3) {
    //                 RX.alert("岗位角色不可修改");
    //             }
    //             else {
    //                 RX.page.open({
    //                     title: "修改流程角色",
    //                     url: "/role/roleEdit?type=xg&wfTag=1&id=" + this.get("roleId") + "&func=roleSelectCallback"
    //                 })
    //             }
    //         }
    //     },
    //     afterMount: function () {
    //         /*获取办理人*/
    //         var id = this.get("roleId");
    //         var that = this;
    //         if (id && id !== "null") {
    //             $.ajax({
    //                 type: "get",
    //                 url: "/role/getRoleById?id=" + id + "&random=" + Math.random(),
    //                 success: function (ar) {
    //                     if (ar.success) {
    //                         roleSelectCallback(ar.data.id, ar.data.roleName, ar.data.roleCode, ar.data.roleType, null, ar.data.roleMade);
    //                         that.updateHistory();
    //                     }
    //                 }
    //             });
    //         }
    //     }
    // });

    //表单设置
    nodeSheet = new Rxvm({
        el: $("[data-tab='forms']")[0],
        config: nodeSheetConfig,
        data: {sheets: json.sheets},
        methods: {
            addSheet: function () {
                this.append("sheets", {
                    sfyxSt: "VALID",
                    spxPrint: "0",
                    sheetMode: "EDIT",
                    sort: getMaxSort(this.get("sheets")) + 1
                });
            },
            delSheet: function (keypath) {
                this.set(keypath + ".sfyxSt", "UNVALID");
                reRenderSheetId();
            }
        }
    });

    //后处理
    nodeAfterHandler = new Rxvm({
        el: $("[data-tab='afterHandler']")[0],
        data: json,
        config: nodeAfterConfig
    });

    //高级设置
    nodeExtra = new Rxvm({
        el: $("[data-tab='extra-settings']")[0],
        config: nodeButtonConfig,
        data: {buttons: (json.buttons && json.buttons.length) || json.id ? json.buttons : RX.cache(_top, "DEFAULT_BUTTON_ARR")},
        methods: {
            addButton: function () {
                this.append("buttons", {sort: getMaxSort(this.get("buttons")) + 1, sfyxSt: "VALID"});
            },
            delButton: function (keypath) {
                this.set(keypath + ".sfyxSt", "UNVALID");
            }
        }
    });
}


//获取退回环节编码
function getDisagreeNodeDict(model) {
    var dNodeDict = [], nodes = getAllNodes();
    var inTag = false;
    for (var i = 0; i < nodes.length; i++) {
        var tnode = nodes[i];
        if (tnode.domid && tnode.sfyxSt != "UNVALID" && model.get("domid") != tnode.domid
            && tnode.type == "2" && tnode.name) {
            dNodeDict.push({"code": tnode.domid, "value": tnode.name});
            //匹配初始化选中
            if (model.get("disagreeNodeDomid") == tnode.domid) {
                inTag = true;
            }
        }
    }
    if (!inTag) {
        model.set("disagreeNodeDomid", "");
    }
    return dNodeDict;
}

/**
 * 设置办理人回调
 * @param candidate
 * @param keypath
 */
function candidateCallbackFunc(candidate, keypath) {
    if (keypath) {
        nodeCandidate.set(keypath, {
            id: candidate.id,
            rule: {id: candidate.ruleId, ruleName: candidate.ruleName},
            roleList: candidate.roleList
        });
    } else {
        nodeCandidate.append("list", {
            rule: {id: candidate.ruleId, ruleName: candidate.ruleName},
            roleList: candidate.roleList
        });
    }
}

/**
 * 重新渲染所属表单字典项
 */
function reRenderSheetId() {
    var sheets = nodeSheet.get("sheets");
    for (var i = 0, maxLength = sheets.length; i < maxLength; i++) {
        if (sheets[i].sfyxSt !== "UNVALID") {
            nodeSheet.setConfig("sheets." + i + ".sheet_id");
        }
    }
}

//节点表单字典项获取
function getNodePageDict(vm, keypath) {
    var sheetDict = [], flowData = getFlowData(), sheets = flowData.sheets, sheetId = vm.get(keypath);
    if (sheets) {
        //获取已经选择的数据，而且不是自己的数据
        var hasSheets = nodeSheet.get("sheets"), idArr = [];
        for (var j = 0, maxLength = hasSheets.length; j < maxLength; j++) {
            if (hasSheets[j].sfyxSt !== "UNVALID") {
                var hasSheetId = hasSheets[j]["sheet_id"];
                if (hasSheetId && hasSheetId !== sheetId) {
                    idArr.push(hasSheetId);
                }
            }
        }
        for (var i = 0; i < sheets.length; i++) {
            if (sheets[i].sheet_id && sheets[i].sfyxSt != "UNVALID" && sheets[i].name) {
                //获取自己+没有选择的数据，意见被选择的不显示
                if (!idArr.contains(sheets[i].sheet_id)) {
                    sheetDict.push({
                        "code": sheets[i].sheet_id,
                        "value": sheets[i].name,
                        "data-title": sheets[i].title
                    });
                }
            }
        }
    }
    return sheetDict;
}

//@ 选择角色回调方法
function roleSelectCallback(id, name, code, roleType, roleTypeName, roleMade) {
    nodeRole.set("roleId", id);
    nodeRole.set("roleName", name);
    nodeRole.set("roleCode", code);
    nodeRole.set("roleType", roleType);
    nodeRole.set("roleMade", roleMade);
    var typeName = "";
    if (roleType == "1") {
        typeName = "业务角色";
    } else if (roleType == "2") {
        typeName = "流程角色";
    } else if (roleType == "3") {
        typeName = "岗位角色";
    }
    nodeRole.set("roleTypeName", typeName);
    reloadRoleDetail(id, roleMade);
}

//加载角色关联要素
function reloadRoleDetail(id, roleMade) {
    if (id) {
        $("#roleElementFrame").show();
        $("#roleElementFrame").attr("src", RX.handlePath("/role/roleElementView?id=" + id + "&roleMade=" + roleMade + "&skin=default"));
    } else {
        $("#roleElementFrame").hide();
    }
}

//办理角色清空
function roleChangeFunc(model) {
    nodeRole.set({roleId: "", roleName: "", roleCode: "", roleType: "", roleTypeName: ""});
    reloadRoleDetail();
}

//取最大的序号
function getMaxSort(sheetList) {
    var maxSort = 0;
    if (sheetList && sheetList.length > 0) {
        for (var i = 0; i < sheetList.length; i++) {
            if (sheetList[i].sfyxSt !== "UNVALID") {
                var tempSort = parseInt(sheetList[i].sort);
                if (tempSort > maxSort) maxSort = tempSort;
            }
        }
    }
    return maxSort;
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

//检查表单是否重复
function checkSheetIdRepeat() {
    var sheetList = nodeSheet.get("sheets");
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

//选择表单触发事件
function sheetIdChangeFunc(instance, keypath) {
    var $option = $(instance.getElement(keypath)).find("option:selected");
    var sheetName = $option.text();
    //流程配置的表单title
    var sheetTitle = $option.data("title");
    var sort = instance.get(instance.replacePath(keypath, "sort"));
    var title = instance.get(instance.replacePath(keypath, "title"));
    if (!sort || $.trim(sort.toString()) == "") {
        var sheetList = instance.get("sheets");
        instance.set(instance.replacePath(keypath, "sort"), getMaxSort(sheetList) + 1);
    }
    if (!title || $.trim(title.toString()) == "") {
        //未配置环节title
        if (sheetTitle && $.trim(sheetTitle.toString()) !== "") {
            //配置了流程title
            instance.set(instance.replacePath(keypath, "title"), sheetTitle);
        } else {
            //默认使用表单name
            instance.set(instance.replacePath(keypath, "title"), sheetName);
        }
    }
    instance.set(instance.replacePath(keypath, "name"), sheetName);
    reRenderSheetId();
}

/**
 * 更新值，可在保存时或者保存时调用，之后获取总体的数据，统一接口名称
 */
function updateNodeAttr(operate) {
    //当非移除操作时更新缓存数据
    if (!operate || operate !== "remove") {
        updateValue(nodeConfig, nodeSetting.get(), nodeJson);
        // updateValue(nodeRoleConfig, nodeRole.get(), nodeJson);
        //更新办理人配置
        nodeJson["candidates"] = JSON.parse(nodeCandidate.getJson())["list"];
        //更新表单
        var sheets = nodeSheet.get("sheets");
        //过滤无效表单数据
        if (sheets) {
            nodeJson["sheets"] = sheets.filter(function (sheet) {
                return checkIsValidate(sheet) && sheet["sheet_id"] || sheets["title"];
            });
        }
        //更新后处理
        updateValue(nodeAfterConfig, nodeAfterHandler.get(), nodeJson);
        //更新按钮
        nodeJson["buttons"] = JSON.parse(nodeExtra.getJson())["buttons"];
        //更新最大环节序号
        var nodeMaxSort = bpmnProcessData["nodeMaxSort"];
        var nodeSort = parseInt(nodeJson.sort);
        if (nodeSort && nodeSort > nodeMaxSort) {
            bpmnProcessData["nodeMaxSort"] = nodeSort;
        }
    }
}