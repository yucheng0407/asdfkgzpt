$(function () {
    new Rxvm({
        el: ".form_box"
    });
    RX.button.init($(".w_button_box"), {
        buttons: [
            {
                id: "execImport",
                name: "导入",
                icon: "&#xe62a;",
                onClick: "execImport",
                style: "c_button"
            }]
    });
});

/**
 * 执行导入
 */
function execImport() {
    var $uploadFile = $("#uploadFile");
    var uploadFile = $uploadFile.val();
    if (!uploadFile) {
        RX.alert("请先选择要导入的文件");
    } else {
        var fileArr = uploadFile.split("\\");
        var filePathArr = fileArr[fileArr.length - 1].toLowerCase().split(".");
        var fileType = filePathArr[filePathArr.length - 1];
        //校验文件后缀
        if (fileType && ["bpmn", "xml"].contains(fileType)) {
            RX.page.prev().goto(
                "/workflow/ibps/designer", {
                    defFile: $uploadFile[0].files[0]
                }
            );
            RX.page.close();
        } else {
            RX.alert("目前仅支持导入bpmn和xml文件");
        }
    }
}