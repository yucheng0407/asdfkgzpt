/**
 * 手风琴附件控件
 */
(function () {
    RX.ListFile = {
        defaultTemplate: "loadTpl:listFileTpl",
        methods: {
            //初始化附件展示区
            initShow: function () {
                var view = this;
                if (view.get("dictCode")) {
                    if (typeof view.get("dictCode") === "object") {
                        view.set("dictList", dictCode);
                    } else {
                        view.set("dictList", RX.getDictByCode(view.get("dictCode")));
                    }
                }
                if (typeof view.get("minNum") === "number") {
                    view.set("totalMin", view.get("minNum"));
                }
                view.makeAttListData();
            },
            //打开上传附件面板
            addFile: function () {
                var view = this;
                var url = RX.handlePath("/attachment/addFileUpload?random=" + Math.random());
                var layParam = {
                    fileType: view.get("fileType"),
                    fileSize: view.get("fileSize"),
                    uuid: view.get("uuid"),
                    dictCode: view.get("dictCode"),
                    pcode: view.get("pcode")
                };
                RX.page.open({
                    title: "上传资料",
                    url: url,
                    param: layParam,
                    callBacks: {
                        end: function () {
                            var addFileIds = RX.cache(_top, "addFileIds");
                            view.handleFileIds(addFileIds);
                            view.makeAttListData();
                        }
                    }
                });
            },
            //附件预览
            preview: function () {
                RX.msg('附件预览');
            },
            //依据uuid请求附件所有条目
            makeAttListData: function () {
                var that = this,
                    addFileIds;
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
                                var delFileIds = that.get("delFileIds");
                                if (delFileIds) {
                                    $.each(ar.data, function (i, t) {
                                        if (!delFileIds.contains(t.id))
                                            result.push(t);
                                    });
                                } else {
                                    result = ar.data;
                                }
                                var resultList = [];
                                $.each(that.get("dictList"), function (j, k) {
                                    var obj = {list: []};
                                    obj.code = k.code;
                                    obj.value = k.value;
                                    //编码缩略图路径
                                    $.each(result, function (i, t) {
                                        t.sltPath = RX.encode(t.thAbsolutePath);
                                        if (t.extension === "doc" || t.extension === "docx") {
                                            t.showImg = "/medias/style/plat/image/attachment/word.png";
                                        } else if (t.extension === "xls" || t.extension === "xlsx") {
                                            t.showImg = "/medias/style/plat/image/attachment/excel.png";
                                        } else if (t.extension === "zip" || t.extension === "rar") {
                                            t.showImg = "/medias/style/plat/image/attachment/zip.png";
                                        } else if (t.extension === "png" || t.extension === "jpg" || t.extension === "jpeg" || t.extension === "gif") {
                                            t.showImg = "/attachment/getThumbnail?id=" + t.id + "&thPath=" + encodeURI(t.sltPath);
                                        } else {
                                            t.showImg = "/medias/style/plat/image/attachment/pt.png";
                                        }
                                        t.showImg = RX.handlePath(t.showImg);
                                        if (k.code === t.fjlbNo) {
                                            obj.list.push(t);
                                        }
                                        t.fullName=t.name +"."+ t.extension;
                                        t.simpleName = RX.getSubStr(t.fullName, 15);
                                    });
                                    if (RX.isObject(that.get("minNum"))) {
                                        //最小上传的判断
                                        if (that.get("minNum")["zd" + k.code] != null && that.get("minNum")["zd" + k.code] > 0) {
                                            obj.dictMin = that.get("minNum")["zd" + k.code];
                                        }
                                    }
                                    resultList.push(obj);
                                });
                                that.set("resultList", resultList);
                            }
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
            handleFileIds:function(ids) {
                var that = this;
                if (ids) {
                    var idArr = ids.split(",");
                    var temId = that.get("addFileIds") || [];
                    that.set("addFileIds", temId.concat(idArr));
                }
            }
        },
        //视图创建函数
        _afterCreate: function () {
            this.initShow();
        },
        afterMount: function () {
            $(".attachment_header").click(function () {
                var $t = $(this);
                $(".attachment_header").each(function (i, t) {
                    if ($t[0] === $(this)[0]) {
                        $(this).next().toggle("slow");
                    } else {
                        $(this).next().hide("slow");
                    }
                });
            });
            $(".attachment_header").eq(0).next().show();
        }
    };


}).call(window);

