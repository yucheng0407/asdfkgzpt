var param = RX.page.param;
var dictCode = param.dictCode,  //字典编码
    pcode = param.pcode,     //父级字典
    limit = param.limit,    //上传限制
    fileNo = param.fileNo,  //文件字典类别
    fileType = param.fileType, //文件类型
    fileSize = param.fileSize || "20M", //文件大小限制
    uuid = param.uuid;
thumbFlag = param.thumbFlag || true; //上传的附件是否需要生成缩略图,默认生成
var uploadLimit = 999;
var cindex;
if (limit != null) {
    uploadLimit = parseInt(limit);
}
if (!fileType) {
    fileType = "*.gif;*.jpg;*.png;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;*.txt;*.rar;*.zip;*.pdf";
}
$(document).ready(function () {
    var $fileNo = $("#fileNo");
    var $file_upload = $('#file_upload');
    //当已经存在文件字典类别时，禁用类别选择
    if (fileNo) {
        $fileNo.val(fileNo);
        $fileNo.attr("disabled", true);
    }
    //获取设置的上传文件类型 object TODO 每个字典的类型控制
    //当没有字典编码时
    if (!dictCode) {
        $fileNo.val(0);
        $("#TypeTag").hide();
    } else {
        var zdx = RX.getDictByCode(dictCode, pcode);
        for (var i = 0; i < zdx.length; i++) {
            if (zdx[i].value != null && zdx[i].value != "") {
                $fileNo.append("<option value='" + zdx[i].code + "' title='" + zdx[i].value + "'>"
                    + zdx[i].value + "</option>");
            }
        }
    }

    //上传操作
    $("#uploadBtn").click(function () {
        if (dictCode) {
            if ($fileNo.val() != "" && $fileNo.val() != "0") {
                $file_upload.uploadify('upload', '*');
            } else {
                RX.alert("请先选择文件类别");
            }
        } else {
            $file_upload.uploadify('upload', '*');
        }
    });

    //文件
    $file_upload.uploadify({
        'buttonText': '选择文件',
        'width': 70,
        'height': 20,
        'swf': RX.handlePath('/medias/plugin/uploadify/uploadify.swf'),
        'auto': false,
        'uploader': RX.handlePath('/attachment/uploadIE?random=' + Math.random()),
        'fileSizeLimit': fileSize,
        'fileObjName': 'fileData',
        'uploadLimit': uploadLimit,
        'multi': true,
        'formData': {
            'fjlbNo': $("[name='fjlb_no'] option:selected").val(),
            'uuid': uuid
        },
        'fileTypeExts': fileType,
        'fileTypeDesc': "请选择" + fileType + "文件",
        'onUploadStart': function (file) {
            cindex = layer.load();
            $file_upload.uploadify("settings", "formData", {
                'uuid': $("[name='uuid']").val(),
                'fjlbNo': $("#fileNo").val(),
                'thumbFlag': thumbFlag
            });
        },
        'onSelect': function (file) {
        },
        'overrideEvents': ['onSelectError', 'onDialogClose'],
        'onSelectError': function (file, errorCode, errorMsg) {
            switch (errorCode) {
                case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE  :
                    RX.alert("文件为空！");
                    break;
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED :
                    RX.alert("不能上传多个文件！");
                    break;
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT :
                    RX.alert("文件不可超过" + fileSize + "！");
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE  :
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
            var json = RX.parseJson(data);
            if (json.success) {
                RX.cache(_top, "addFileIds", json.addFileIds);
            } else {
                uploadResult += file.name + "_" + json.err + "<br/>";

            }
        },
        'onQueueComplete': function (queueData) {
            layer.close(cindex);
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