var resourceVm,
    param = RX.page.param,
    id = param.id;
$(function () {
    var resourceData;
    //视图初始化
    resourceVm = new Rxvm({
            el: '.form_box',
            settings: {
                getData: {
                    url: "/resource/getResourceById?id=" + id + "&r=" + Math.random(),
                    success: function (ar) {
                        var data = ar.data;
                        resourceData = data;
                        if (data && data.parentType) {
                            data.parentName += " (" + getTypeName(data.parentType) + ")";
                        }
                        return data;
                    }
                }
            },
            afterMount: function () {
                if (resourceData.targetName) {
                    $("#targetNameTr").show();
                }
                if (resourceType) {
                    $("#title").text(getTypeName(resourceType) + "基本信息");
                }
            }
        }
    );
    $("#editResPage").click(function () {
        var ckUrl = window.location.href;
        window.location.href = ckUrl.replace('View', 'Edit') + "&" + "id=" + id;
        layer.title("修改" + getTypeName(resourceVm.get("type")), layer.getFrameIndex(window.name));
    });
});

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
