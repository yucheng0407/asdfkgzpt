//全局对象声明
var dataAuthVm;   //自定义维护数据权限查询列表对象
$(function () {
    dataAuthVm = new Rxvm({
        widget: RX.Grid,
        el: '#dataDiv',
        settings: tableSettings,
        config: searchConfig,
        afterMount: function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    });
});

/**
 * 新增数据权限
 */
function addDataAuth() {
    RX.page.open({
        title: "新增数据权限",
        url: "/auth/dataAuthEdit"
    });
}

/**
 * 删除数据权限
 */
function delDataAuth() {
    var obj = dataAuthVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
        return false;
    } else {
        RX.confirm(RX.CONFIRM_DELETE, function () {
            $.ajax({
                type: "post",
                url: "/auth/delDataAuth",
                async: false,
                data: {id: obj[0].ID},
                success: function (ar) {
                    if (ar.success) {
                        RX.page.reload();
                        RX.msg(RX.SUCCESS_DELETE);
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        });
    }
}

/**
 * 批量删除某类型的数据
 */
function batchDel() {
    RX.page.open({
        title: "批量删除数据",
        areaType: "small",
        url: "/auth/batchDelSel"
    });
}

/**
 * 获取对象字典数据
 */
function getObjZd() {
    var zdList;
    $.ajax({
        type: "get",
        url: "/auth/getObjList",
        async: false,
        success: function (ar) {
            if (ar.success) {
                zdList = ar.data;
            } else {
                RX.alert(ar.msg);
            }
        }
    });
    return zdList;
}

/**
 * 用户选择，单选
 * 接口和编辑接口，单多选
 */
function userCallbackFunc(id, name) {
    dataAuthVm.autoQuery.set("query.userId", id);
    dataAuthVm.autoQuery.set("query.userName", name);
}

RX.page.reload = function () {
    dataAuthVm.reloadGrid();
};