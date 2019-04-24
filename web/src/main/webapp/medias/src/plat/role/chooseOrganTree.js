var param = RX.page.param,
    roleId = param.roleId,       //第一次树展开的数据id
    type = param.type;
$(function () {
    if (type !== "ck") {
        $("#confirm").show();
    }
    var objUtils = {
        isCheck: function (arr, obj, biz) {
            //biz默认为id
            var checkFlag = -1;
            if (arr) {
                if (!biz) {
                    biz = "id";
                }
                var bizArr = biz.split(","), bizLength = bizArr.length, j = 0, flag,
                    i = 0, maxLength = arr.length, arrObj;
                for (; i < maxLength; i++) {
                    arrObj = arr[i];
                    flag = true;
                    for (j = 0; j < bizLength; j++) {
                        if (arrObj[bizArr[j]] != obj[bizArr[j]]) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        checkFlag = i;
                        break;
                    }
                }
            }
            return checkFlag;
        }
    };
    var saveOrgans = [], gxOrgans = [];
    //获取已经选择的机构
    var ztreeConfig = {
        check: {
            enable: true,
            chkboxType: {"Y": "", "N": ""},
            chkDisabledInherit: type === "ck"
        },
        callback: {
            onCheck: function (event, treeId, treeNode) {
                var checkFlag = treeNode.checked;
                //对于已经保存的数据改变saveValue
                //没保存的数据改变checkFlag，勾选状态
                //处理当前节点，即机构节点
                if (treeNode.saveFlag) {
                    treeNode.saveValue = checkFlag ? "2" : "1";
                    var index = objUtils.isCheck(saveOrgans, treeNode);
                    if (index > -1) {
                        saveOrgans[index].saveValue = checkFlag ? "2" : "1";
                    } else {
                        RX.log("树节点显示已经保存的机构数据和查出来的数据不一致");
                    }
                } else {
                    treeNode.checkFlag = checkFlag;
                    if (checkFlag) {
                        //先判断存不存在数据池中，不存在添加
                        var index = objUtils.isCheck(gxOrgans, treeNode);
                        if (index === -1) {
                            gxOrgans.push(treeNode);
                        }
                    } else {
                        var index = objUtils.isCheck(gxOrgans, treeNode);
                        if (index > -1) {
                            //删除
                            gxOrgans.splice(index, 1);
                        } else {
                            RX.log("添加数据出错");
                        }
                    }
                }
            }
        },
        view: {
            expandSpeed: "",
            selectedMulti: false
        }
    };
    //获取已经保存的数据
    if (roleId) {
        $.ajax({
            type: "post",
            url: "/role/getGlbOrganByRole",
            data: {roleId: roleId},
            success: function (ar) {
                if (ar.success) {
                    saveOrgans = ar.data.organs;
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
    $.ajax({
        type: "post",
        url: "/tree/tbOrganTree?roleId=" + roleId,
        success: function (ar) {
            if (ar) {
                if (type === "ck") {
                    //设置节点禁选
                    for (var i = 0, maxLength = ar.length; i < maxLength; i++) {
                        ar[i].chkDisabled = true;
                    }
                }
                if (ar[0].children) {
                    ar[0].open = true;
                }
            }
            $.fn.zTree.init($("#tree"), ztreeConfig, ar);
        }
    });
    $("#confirm").click(function () {
        //获取需要删除的数据，包含的变成排除的
        var delOrganArr = [];
        for (var i = 0, maxLength = saveOrgans.length; i < maxLength; i++) {
            if (saveOrgans[i].saveValue === "1") {
                delOrganArr.push(saveOrgans[i].id);
            }
        }
        //获取本次新增的organ数据
        var addOrganArr = [];
        for (var i = 0, maxLength = gxOrgans.length; i < maxLength; i++) {
            addOrganArr.push(gxOrgans[i].id);
        }
        if (addOrganArr.length || delOrganArr.length) {
            $.ajax({
                type: "post",
                url: "/role/saveRoleGlxx",
                data: {
                    roleId: roleId,
                    organsAdd: addOrganArr.join(","),
                    organsDel: delOrganArr.join(",")
                },
                success: function (ar) {
                    if (ar.success) {
                        RX.msg(RX.SUCCESS_SAVE);
                        RX.page.close(param.closeParentTag ? 2 : "");
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        } else {
            RX.msg("未修改");
        }
    });
});
