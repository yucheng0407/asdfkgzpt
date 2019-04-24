var entrustVm;
$(function () {
    settings.autoListBox.onRowDblClick = function onRowDblClick(rowIndex, rowData, isSelected, event) {
        RX.page.open({
            title: "查看委办",
            areaType: "small",
            url: "/workflow/instance/entrustView?id=" + rowData.ID
        })
    };
    entrustVm = new Rxvm({
        widget: RX.Grid,
        el: ".list_box",
        settings: settings,
        afterMount: function() {
            RX.button.init($(".operation_box"), buttonsJson);
        }
    });
});

//新增委办
function addEntrust() {
    RX.page.open({
        title: "新增委办",
        areaType: "small",
        url: "/workflow/instance/entrustEdit"
    });
}

//停止委办计划
function stopEntrust() {
    var obj = entrustVm.getSelected();//获取选中行的数据
    if (!obj ||　RX.trim(obj.toString()) === "") {
        RX.alert("请选择一条数据");
    } else {
        RX.confirm("确定要停用委托计划吗？", function (index) {
            $.ajax({type: "post",
                url: "/workflow/instance/stopEntrust",
                data: {id: obj[0].ID},
                dataType: "json",
                success: function (ar) {
                    if (ar.success) {
                        RX.alert("停止成功");
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
            RX.close(index);
        });
    }
}
