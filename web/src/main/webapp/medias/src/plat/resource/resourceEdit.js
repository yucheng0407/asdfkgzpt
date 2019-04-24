var resourceVm,
    id = param.id;
$(function () {
    //初始数据
    var defaultData,
        parentId = param.parentId;
    if (!id && parentId) {
        defaultData = {
            parentId: parentId,
            parentName: RX.decode(param.parentName),
            parentType: param.parentType
        };
    }
    //视图初始化
    var resourceData;
    resourceVm = new Rxvm({
        el: '.form_box',
        config: resourceConfig,
        settings: {
            getData: {
                url: id ? "/resource/getResourceById?id=" + id + "&r=" + Math.random() : null,
                defaultData: defaultData,
                success: function (ar) {
                    var data = ar.data;
                    if (data && data.parentType) {
                        data.parentName += " (" + getTypeName(data.parentType) + ")";
                    }
                    resourceData = data;
                    return data;
                }
            }
        },
        afterMount: function () {
            if (resourceType) {
                $("#title").text(getTypeName(resourceType) + "基本信息");
            }
            if (resourceData && resourceData.targetName) {
                $("#targetNameTr").show();
            }
        }
    });
    $("#save").click(function () {
        if (resourceVm.ruleValidate()) {
            $.ajax({
                type: "post",
                url: "/resource/saveResource",
                data: {resource: resourceVm.getJson()},
                success: function (ar) {
                    if (ar.success) {
                        var prevWin = RX.page.prev();
                        prevWin.reload();
                        var reloadTree = prevWin.window.createResourceTree;
                        if (reloadTree && typeof reloadTree === "function") {
                            reloadTree();
                        }
                        if (isPlatAdmin && param.type !== "xg") {
                            RX.confirm("保存成功，是否快捷分配此资源至角色？", function () {
                                RX.page.open({
                                    title: "选择分配的角色",
                                    url: "/role/roleSelect",
                                    param: {
                                        ifOwn: "owner",
                                        notShowType: "2",
                                        isPlatAdmin: true,
                                        resId: ar.data,
                                        endNum: 2,
                                        func: "saveAllotRes"
                                    }
                                });
                            },function(){
                                RX.page.close();
                            });
                        } else {
                            RX.msg(RX.SUCCESS_SAVE);
                            RX.page.close();
                        }
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
    });
});

/**
 * 将资源快速分配给管理的角色
 */
function saveAllotRes(roles, resId) {
    if (roles && roles.length > 0) {
        var chooseIds = [];
        $.each(roles, function (i, t) {
            chooseIds.push(t.ID);
        });
        $.ajax({
            type: "post",
            url: "/resource/saveAllotRes",
            async: false,
            data: {
                roleIds: chooseIds.join(),
                resId: resId
            },
            success: function (ar) {
                if (ar.success) {
                    RX.msg("分配成功");
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}

function selectParentCallback(id, name, type) {
    resourceVm.set("parentId", id);
    resourceVm.set("parentName", name + " (" + getTypeName(type) + ")");
    resourceVm.set("parentType", type);

}

function getTypeName(code) {
    var name = "";
    $.each(resourceDict, function (i, t) {
        if (t.code == code) {
            name = t.value;
            return false;
        }
    });
    return name;
}

function selectIconCallback(url) {
    resourceVm.set("icon", url);
}

function urlSelectCallback(id, name, url) {
    $("#targetNameTr").show();
    resourceVm.set("targetId", id);
    resourceVm.set("targetName", name);
    resourceVm.set("url", url);
}

function urlChangeCallback(model) {
    $("#targetNameTr").hide();
    resourceVm.set("targetId", "");
    resourceVm.set("targetName", "");
}

function urlCheck(model) {
    var id = model.get("id");
    if (id) {
        return "&parentId=" + id;
    } else {
        RX.msg(RX.msg_warning, "新增资源无法选择URL");
        return false;
    }
}

if (param.type !== "xz") {
    RX.page.cancelCheck = function () {
        if (formIfChange()) {
            RX.confirm(RX.CANCEL_CHECK, function () {
                RX.page.close();
            });
            return false;
        }
        return true;
    }
}

function formIfChange() {
    return resourceVm.ifChange();
}
