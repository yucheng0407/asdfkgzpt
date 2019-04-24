/**
 * 表格附件类型上传
 */
(function () {
    RX.TableFile = {
        defaultTemplate: "loadTpl:tableFileTpl",
        methods: {
            //依据uuid请求附件所有条目
            makeAttListData: function () {
                var that = this, addFileIds;
                if (that.get("addFileIds")) {
                    addFileIds = that.get("addFileIds").join();
                }
                var jsonMap = {
                    uuid: that.get("uuid"),
                    addFileIds: addFileIds || ""
                };
                if (jsonMap.uuid) {
                    $.ajax({
                        type: "post",
                        url: "/attachment/getAttachmentList",
                        data: {"map": JSON.stringify(jsonMap)},
                        async: false,
                        dataType: "json",
                        success: function (ar) {
                            if (ar.success) {
                                var result = [];
                                //获取当前删除的附件ids,展示的时候过滤
                                var delFileIds = that.get("delFileIds");
                                if (delFileIds) {
                                    $.each(ar.data, function (i, t) {
                                        if (!delFileIds.contains(t.id))
                                            result.push(t);
                                    });
                                } else {
                                    result = ar.data;
                                }
                                that.set("list", result);

                                $.each(result, function (i, t) {
                                    if (t.extension === "doc" || t.extension === "docx") {
                                        t.showImg = "/medias/style/plat/image/attachment/word.png";
                                    } else if (t.extension === "xls" || t.extension === "xlsx") {
                                        t.showImg = "/medias/style/plat/image/attachment/excel.png";
                                    } else if (t.extension === "zip" || t.extension === "rar") {
                                        t.showImg = "/medias/style/plat/image/attachment/zip.png";
                                    } else if (t.extension === "png" || t.extension === "jpg" || t.extension === "jpeg" || t.extension === "gif") {
                                        t.showImg = "/medias/style/plat/image/attachment/image.png";
                                    } else {
                                        t.showImg = "/medias/style/plat/image/attachment/pt.png";
                                    }
                                    t.showImg = RX.handlePath(t.showImg);
                                })
                            }
                        }
                    });
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
            },
            //验证文件大小
            checkFileSize: function (size) {
                var toSize;
                var fileSize = this.get("fileSize"),
                    result = true;
                if (fileSize && size) {
                    if (fileSize.endWith("MB")) {
                        toSize = parseInt(fileSize.substring(0, fileSize.length - 2)) * 1024 * 1024;
                    }
                    if (fileSize.endWith("KB")) {
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
            //上传图片响应方法
            changeFile: function () {
                var that = this;
                //去除验证
                $(that.$el).find(".err").remove();

                //检测最大数目
                if (!this.checkFileNum()) {
                    return false;
                }

                if (!this.get("disabled")) {
                    var $form = $(this.$el).find("form");
                    var file = $(this.$el).find(".addFile")[0],
                        fileSize = RX.getFileSize(file),
                        fileName = file.value.substring(file.value.lastIndexOf("\\") + 1),
                        nameExist = false;

                    $.each(that.get("list"), function (i, t) {
                        var tempName = t.name + (t.extension ? "." + t.extension : "");
                        if (tempName === fileName) {
                            RX.msg({icon: RX.ICON_WARNING, msg: "文件名已存在"});
                            nameExist = true;
                            return false;
                        }
                    });
                    if (nameExist) {
                        that.clearFile(file);
                        return false;
                    }
                    //验证附件类型
                    if (!this.checkFileType(fileName.split(".").pop())) {
                        RX.msg({icon: RX.ICON_WARNING, msg: "请上传正确的文件类型（" + this.get("fileType") + "）"});
                        that.clearFile(file);
                        return false;
                    }
                    //验证附件大小
                    if (!this.checkFileSize(fileSize)) {
                        RX.msg({icon: RX.ICON_WARNING, msg: "请上传小于" + this.get("fileSize").toUpperCase() + "的文件"});
                        that.clearFile(file);
                        return false;
                    }

                    $form.attr("action", RX.config.ctxPath + "/attachment/uploadIE?uuid=" + that.get("uuid"));
                    //开启loading
                    RX.loading();
                    $form.ajaxSubmit({
                        dataType: "json",
                        success: function (ar) { //表单提交，根据后台Action返回的数据进行相关的操作
                            that.clearFile(file);
                            RX.closeLoading();
                            if (ar.success) {
                                RX.msg("上传成功");
                                that.handleFileIds(ar.addFileIds);
                                that.makeAttListData();
                            }
                        },
                        error: function (ar) {
                            that.clearFile(file);
                            RX.closeLoading();
                            RX.msg(RX.ICON_ERROR, "上传失败");
                        }
                    });
                }
            },
            //下载事件响应方法
            downloadFile: function (keypath) {
                RX.downloadAttachment(this.get(this.pushPath(keypath, "id")));
            },
            //删除事件响应方法
            deleteFile: function (keypath) {
                var that = this;
                var delFileIds = that.get("delFileIds") || [];
                RX.confirm(RX.CONFIRM_DELETE, function () {
                    delFileIds.push(that.get(that.pushPath(keypath, "id")));
                    that.set("delFileIds", delFileIds);
                    that.makeAttListData();
                    RX.msg(RX.SUCCESS_DELETE);
                })
            },
            //检测文件数目
            checkFileNum: function () {
                var fileNum = $(this.$el).find(".filename").length;
                var maxNum = this.get("maxNum") || 99;
                if (fileNum >= maxNum) {
                    RX.msg(RX.ICON_WARNING, "文件上传数目已达上限");
                    return false;
                }
                return true;
            },
            handleFileIds: function (ids) {
                var that = this;
                var idArr = ids.split(",");
                var temId = that.get("addFileIds") || [];
                that.set("addFileIds", temId.concat(idArr));
            }
        }
    };

}).call(window);

