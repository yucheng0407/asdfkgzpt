/**
 * 表单附件控件
 */
(function () {
    RX.InnerFile = {
        defaultTemplate: "loadTpl:innerFileTpl",
        methods: {
            //打开上传附件面板
            changeFile: function () {
                var that = this;
                var file = $(that.$el).find(".addFile")[0],
                    fileSize = RX.getFileSize(file);
                var $form = $(that.$el).find("form");
                var fileName = file.value.substring(file.value.lastIndexOf("\\") + 1);
                //附件最大数的检测
                that.checkFileNum(file);
                //文件名的检测，存在同名不予上传
                if (!that.checkFileName(file, fileName)) {
                    return false;
                }

                if (!this.checkFileType(fileName.split(".").pop())) {
                    RX.msg(RX.ICON_WARNING, "请上传正确的文件类型（" + this.get("fileType") + "）");
                    that.clearFile(file);
                    return false;
                }

                if (!this.checkFileSize(fileSize)) {
                    RX.msg(RX.ICON_WARNING, "请上传小于" + this.get("fileSize") + "的文件");
                    that.clearFile(file);
                    return false;
                }

                $form.attr("action", RX.config.ctxPath + "/attachment/uploadIE?uuid=" + that.get("uuid"));
                //开启loading
                RX.loading();
                $form.ajaxSubmit({
                    dataType: "json",
                    success: function (ar) { //表单提交，根据后台Action返回的数据进行相关的操作
                        RX.closeLoading();
                        if (ar.success) {
                            RX.msg("上传成功");
                            that.clearFile(file);
                            that.handleFileIds(ar.addFileIds);
                            that.makeInnerListData();
                        }
                    },
                    error: function (ar) {
                        RX.closeLoading();
                        RX.msg(RX.ICON_ERROR, "上传失败");
                    }
                });
                that.makeInnerListData();
            },
            //依据uuid请求附件所有条目
            makeInnerListData: function () {
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
                                //获取当前删除的附件ids,展示的时候过滤
                                var delFileIds = that.get("delFileIds");
                                var result = [];
                                if (delFileIds) {
                                    $.each(ar.data, function (i, t) {
                                        if (!delFileIds.contains(t.id))
                                            result.push(t);
                                    });
                                } else {
                                    result = ar.data;
                                }
                                that.set("resultList", result);
                            }
                        }
                    });
                }
            },
            //下载附件
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
                    that.makeInnerListData();
                    RX.msg(RX.SUCCESS_DELETE);
                    that.checkFileNum();
                });
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
            //检测文件最大数目
            checkFileNum: function () {
                var that = this;
                //当前已经上传的文件数目
                var fileNum = $(that.$el).find(".form_file").length;
                var maxNum = that.get("maxNum")||99;
                if (fileNum >= maxNum) {
                    $(that.$el).find(".addFile").hide();
                } else {
                    $(that.$el).find(".addFile").show();
                }
            },
            //检测文件名是否存在
            checkFileName: function (file, fileName) {
                var that = this;
                var nameExist = false;
                $.each(that.get("resultList"), function (i, t) {
                    var tempName = t.name + (t.extension ? "." + t.extension : "");
                    if (tempName === fileName) {
                        RX.msg({icon: RX.ICON_WARNING, msg: "该文件已存在"});
                        nameExist = true;
                        return false;
                    }
                });
                if (nameExist) {
                    that.clearFile(file);
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

