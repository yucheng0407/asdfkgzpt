/**
 * 头像上传控件
 */
(function () {
    RX.Image = {
        defaultTemplate: "loadTpl:imageTpl",
        data: {
            ctxPath: RX.ctxPath
        },
        methods: {
            //删除照片
            deleteImage: function () {
                var that = this;
                that.set("delFileIds", that.get("zpId"));
                that.set("zpId", "");
            },
            //照片上传后置
            changeImage: function ($event) {
                var that = this;
                var $form = $(this.$el).find("form");
                var file = $(this.$el).find(".myFileUpload")[0];
                var fileSize = RX.getFileSize(file),
                    fileName = file.value.substring(file.value.lastIndexOf("\\") + 1);
                //验证附件类型
                if (!this.checkFileType(fileName.split(".").pop())) {
                    RX.msg(RX.ICON_WARNING, "请上传正确的文件类型（" + this.get("fileType") + "）");
                    that.clearFile(file);
                    return false;
                }
                //验证附件大小
                if (!this.checkFileSize(fileSize)) {
                    RX.msg(RX.ICON_WARNING, "请上传小于" + this.get("fileSize").toUpperCase() + "的文件");
                    that.clearFile(file);
                    return false;
                }

                that.set("delFileIds", that.get("zpId"));
                $form.attr("action", RX.config.ctxPath + "/attachment/uploadImage?uuid=" + that.get("zpId"));
                $form.ajaxSubmit({
                        dataType: "json",
                        success: function (ar) { //表单提交，根据后台Action返回的数据进行相关的操作
                            if (ar.success) {
                                that.set("zpId", ar.imgId);
                                that.set("addFileIds", ar.imgId);
                            }
                        }
                    }
                );

            },
            //验证文件大小
            checkFileSize: function (size) {
                var toSize;
                var fileSize = this.get("fileSize"),
                    result = true;
                if (fileSize && size) {
                    if (fileSize.toUpperCase().endWith("MB")) {
                        toSize = parseInt(fileSize.substring(0, fileSize.length - 2)) * 1024 * 1024;
                    }
                    if (fileSize.toUpperCase().endWith("KB")) {
                        toSize = parseInt(fileSize.substring(0, fileSize.length - 2)) * 1024;
                    }
                    result = false;
                    //TODO：带单位的文件大小比较实现，目前是B
                    if (toSize >= size) {
                        result = true;
                    }
                }
                return result;
            },
            //清除上传附件input内容
            clearFile: function (file) {
                var that = this;
                file = file || $(this.$el).find(".addFile")[0];
                if (RX.browser.type === "IE" && RX.browser.version <= 8) {
                    /*
                    * FixMe:
                    * IE8中input【file】值清空必须使用outerHTML=outerHTML的方式,
                    * 但是操作后change事件会丢失，且无法再此绑定，故通过disabled值得变化，触发视图的整体重绘解决
                    */
                    file.outerHTML = file.outerHTML;
                    that.set("disabled", true);
                    setTimeout(function () {
                        that.set("disabled", false);
                    }, 0);
                } else {
                    file.value = "";
                }
            },
            //验证文件类型
            checkFileType: function (type) {
                var fileType = this.get("fileType"),
                    result = true;
                if (fileType) {
                    var tempResult = false;
                    var fileTypeArr = fileType.toString().split(";");
                    $.each(fileTypeArr, function (i, t) {
                        if (t && t.split(".").pop() === type) {
                            tempResult = true;
                            return false;
                        }
                    });
                    if (!tempResult) {
                        result = false;
                    }
                }
                return result;
            }
        },
        _afterMount: function () {
            //IE8下zpId 数据与历史数据不同步问题修复
            this.set("zpId", this.get("zpId") || "");
        }
    };

}).call(window);

