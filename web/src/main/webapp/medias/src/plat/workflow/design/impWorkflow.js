$(document).ready(function () {
    $("#typeId").val(RX.page.param.typeId);
    $("#uploadBtn").click(function () {
        $('#file_upload').uploadify('upload', '*');
    });

    //删除
    $("#deleteBtn").click(function () {
        $.post("deleteAttachment", {}, function (data) {
        });
    });

    //取消
    $("#cancel").click(function () {
        var func = RX.page.param.func;
        if(func != undefined && func.toString().trim() != "") {
            var callBack = RX.page.prevWin().RX.getGlobalFunc(func);
            callBack();
        }
        RX.page.close();
    });

    $("#file_upload").uploadify({
        'buttonText': '选择文件',
        'width': 70,
        'height': 20,
        'swf': RX.handlePath('/medias/plugin/uploadify/uploadify.swf'),
        'auto': false,
        'uploader': RX.handlePath('/workflow/design/importWorkflow?random=' + Math.random()),
        'fileSizeLimit': '10MB',
        'fileObjName': 'filedata',
        'uploadLimit': 1,
        'multi': false,
        'formData': {
            'typeId': $("#typeId").val()
        },
        'onUploadStart': function (file) {
            $("#file_upload").uploadify("settings", "formData", {
                'typeId': $("#typeId").val()
            });
        },
        'onSelect': function (file) {
            // $("#uploadBtn").omButton('enable');
        },
        'overrideEvents': ['onSelectError', 'onDialogClose'],
        'onSelectError': function (file, errorCode, errorMsg) {
            switch (errorCode) {
                case -120 :
                    RX.alert("文件为空！");
                    break;
                case -100 :
                    RX.alert("不能上传多个文件！");
                    break;
                case -110 :
                    RX.alert("文件不可超过10M！");
                    break;
                case -130 :
                    RX.alert("文件类型不正确！");
                    break;
                default :
                    RX.alert("出现错误，不能上传");
            }
        },
        'onFallback': function () {
            RX.alert("您未安装FLASH控件，无法上传！请下载flash插件");
        },
        'onUploadSuccess': function (file, data, response) {
            var data = RX.parseJson(data);
            if (data.success) {
                //uploadResult += file.name + data.msg + "<br/>";
                panel().getWorkflow(data.data);
                panel().getPanel().flow.property.operatingStatus = '6';//导入
            }
        },
        'onQueueComplete': function (queueData) {
            RX.page.close();
            if (queueData.uploadsErrored > 0) {
                RX.alert(queueData.uploadsErrored + "个文件上传失败");
            } else {
                if (uploadResult) {
                    RX.alert(uploadResult);
                } else {
                    RX.msg("上传成功");
                }
                uploadResult = '';
            }
        }
    });
});

//拿到流程图绘制面板
function panel() {
    return $("#flow-panel", RX.page.prevWin().document)[0].contentWindow;
}