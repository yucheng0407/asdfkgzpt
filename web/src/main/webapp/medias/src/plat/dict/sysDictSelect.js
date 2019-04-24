var param = RX.page.param;
var sysDictGridVm;
$(function () {
    var config = {
        widget: RX.Grid,
        el: '.base_box',
        settings: sysDictSettings,
        config: sysDictConfig
    };
    if (param.canAdd) {
        config.afterMount = function () {
            RX.button.init($("#operate"), buttonsJson);
        }
    } else {
        config.template = "#noPbox";
    }
    sysDictGridVm = new Rxvm(config);
    $("#confirm").click(function () {
        selectItem();
    });
});

function selectItem() {
    var obj = sysDictGridVm.getSelected();//获取选中行的数据
    if (obj == null || obj.length != 1) {
        RX.alert("请选一条数据");
    } else {
        var evalFunc = RX.page.prevWin().RX.getGlobalFunc(param.func);
        var result = evalFunc(obj[0].DICT_CODE, obj[0].DICT_NAME, obj[0].IS_EMPTY);
        if (result || typeof(result) == "undefined") {
            RX.page.close();
        }
    }
}

/**
 * 新增系统字典表（主表）
 */
function addSysDict() {
    RX.page.open({
        title: "新增系统字典",
        areaType: [700, 540],
        url: "/dict/sysDictEdit"
    });
}

/**
 * 修改系统字典表（主表）
 */
function editSysDict() {
    var rowData = sysDictGridVm.getSelected();
    if (rowData.length === 1) {
        RX.page.open({
            title: "修改系统字典",
            areaType: [700, 540],
            url: "/dict/sysDictEdit",
            param: {
                id: rowData[0].ID
            }
        });
    } else {
        RX.msg(RX.SELECT_EDIT);
    }
}


<!--删除-->
/**
 * 删除系统字典表（主表）
 */
function delSysDict() {
    var obj = sysDictGridVm.getSelected();//获取选中行的数据
    if (obj == null || obj == undefined || obj[0] == null) {
        RX.msg(RX.SELECT_DELETE);
    } else {
        RX.confirm(RX.CONFIRM_DELETE, function (index) {
            $.ajax({
                url: "/dict/delSysDict?id=" + obj[0].ID,
                success: function () {
                    RX.msg(RX.SUCCESS_DELETE);
                    RX.page.reload();
                }
            });
        });
    }
}


//刷新全局接口
RX.page.reload = function (param) {
    sysDictGridVm.reloadGrid(param);
};


