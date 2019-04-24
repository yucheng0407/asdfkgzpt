var formDefDesign;
var FormDefDesign = function () {
    this.boTree = null;
};

/**
 * 方法
 */
FormDefDesign.prototype = {
    /**
     * 初始化
     */
    init: function () {
        if (this.hasInit) // 是否已初始化
            return false;
        this.hasInit = true;
        var data1;
        var id = RX.page.param.id;
        if (id) {
            $.ajax({
                type: "post",
                url: '/form/getFormDef?id=' + id,
                async: false,
                success: function (ar) {
                    if (ar.success) {
                        data1 = ar.data;
                        data1["extendAttr"] = JSON.parse(data1["extendAttr"]);
                        var fields = data1["fields"];
                        for (var i = 0, maxLength = fields.length; i < maxLength; i++) {
                            fields[i]["fieldOptions"] = JSON.parse(fields[i]["fieldOptions"]);
                        }
                    } else {

                    }
                }
            });
        }
        var defData = data1;
        if (id) {
            this.data = defData;
        } else {
            var preName = RX.page.param.preName || "FORM_KEY_";
            var params = {
                name: RX.page.param.title || "新建表单",
                sfyxSt: "VALID",
                key: preName + getEnglish(RX.page.param.title || "新建表单"),
                preName: preName,
                description: RX.page.param.description || "",
                fields: RX.page.param.fields || []
            };
            //合并多个值
            this.data = $.extend({}, defData, params);
        }

        //初始化布局
        this._initLayout();
        //初始化滚动
        this._initScroll();
        this._initDatabaseTree();
        this.formbuilder(this.data);
        var that = this;
        $(window).resize(function () {
            that._initLayout();
        });
    },
    /**
     * 初始化布局
     */
    _initLayout: function () {
        var layout = $('body').layout({
            applyDefaultStyles: true,
            west: {
                size: 250
            },
            east: {
                size: 300
            },
            onresize: function () {
            }
        });
        //布局加载完成初始化
        $(".layout-header").removeClass("hidden");
        $(".fb-tabs").removeClass("hidden");
        $(".niceScroll").height($(window).height() - 40);
    },
    /**
     * 滚动
     */
    _initScroll: function () {
        $(".niceScroll").niceScroll({
            horizrailenabled: false,
            cursorborder: "0",
            cursorwidth: "6px",
            cursorcolor: "#2A2A2A",
            zindex: "5555",
            autohidemode: true,
            bouncescroll: true,
            mousescrollstep: '40',
            scrollspeed: '100',
            background: "#999",
            cursoropacitymax: "0.6",
            cursorborderradius: "0"
        });
        $(".niceScroll").getNiceScroll().resize();
    },
    formbuilder: function (data) {
        this.fb = new Formbuilder({
            selector: '#form_design',
            //     boDef:JSON.parse( $('#boDefJson').val()),
            formDefDesign: this,
            data: data,
            callback: function (rtn) {
                if (frameElement && frameElement.dialog)
                    frameElement.dialog.callback(true);
                if (!rtn)
                    DialogUtil.close(frameElement.dialog.index);
            }
        });
    },
    addTreeData: function (data, cid) {
        this.rootNode = this.rootNode || this.boTree.getNodes()[0];
        this.boTree.addNodes(this.rootNode, {
            name: data.label,
            code: data.code,
            icon: "",
            parentCid: "0",
            type: "database",
            field: data,
            cid: cid
        });
    },
    /**
     * 初始化数据
     * @private
     */
    _initDatabaseTree: function () {
        //构建ztree数据
        var me = this;
        var setting = {
            async: {enable: false},
            data: {
                key: {name: "name"},
                simpleData: {
                    enable: true,
                    idKey: "cid",
                    pIdKey: "parentCid"
                }
            },
            view: {
                selectedMulti: false,
                showIconFont: true,
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom
            },
            callback: {
                onClick: function (e, treeId, treeNode) {
                    if (treeNode.type === "database") {
                        me.fb.mainView.showDatabaseView(treeNode.cid);
                    } else if (treeNode.type === "table") {
                        me.fb.mainView.activeTab("form_property");
                    }
                }
            }
        };
        var result = [];
        me.boTree = $.fn.zTree.init($("#boTree"), setting, result);
        me.boTree.expandAll(true);
    },
    /**
     * 修改节点数据
     */
    setTreeData: function (cid, field) {
        //获取对应的节点
        var node = this.boTree.getNodeByParam("cid", cid, null);
        if (node && node.name !== field.label) {
            node.name = field.label;
            this.boTree.updateNode(node);
        }
    },
    //触发节点的选中
    clickTreeNode: function (cid) {
        var node = this.boTree.getNodeByParam("cid", cid, null);
        this.boTree.selectNode(node);
        //触发click
        this.fb.mainView.showDatabaseView(cid);
    },
    /**
     * 设置节点的
     * @param title
     */
    setRootNodeTitle: function (title) {
        var node = this.boTree.getNodeByParam("cid", "0", null);
        if (node) {
            if (node.name !== title) {
                node.name = title;
                this.boTree.updateNode(node);
            }
        } else {
            this.boTree.addNodes(null, {
                name: title,
                type: "table",
                icon: "",
                cid: "0"
            })
        }
    }
};

/**
 * 表单设计
 */
$(function () {
    formDefDesign = new FormDefDesign();
    formDefDesign.init();
});

function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    //验证按钮是否存在
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.id).length > 0 || $("#delBtn_" + treeNode.id).length > 0) return;
    if (treeNode.type === "table") {
        //添加按钮
        var addStr = $("<span class='iconfont tree-add' id='addBtn_" + treeNode.id + "' title='新增' onfocus='this.blur();'>&#xe62a;</span>");
        sObj.after(addStr);
        var btn = $("#addBtn_" + treeNode.id);
        if (btn) {
            btn.bind("click", function () {
                formDefDesign.fb.mainView.createField("database", {
                    $replaceEl: null
                }, true);
            });
        }
    } else if (!treeNode.field.columnName && treeNode.type === "database" && treeNode.field.fieldOptions.candelete !== false) {
        var delStr = $("<span class='iconfont tree-close' id='delBtn_" + treeNode.id + "' title='删除' onfocus='this.blur();'>&#xe6a2;</span>");
        sObj.after(delStr);
        var btn = $("#delBtn_" + treeNode.id);
        if (btn) {
            btn.bind("click", function () {
                RX.confirm("确认删除该字段？", function () {
                    formDefDesign.boTree.removeNode(treeNode);
                    var editView = formDefDesign.fb.mainView.editView;
                    editView.model.set("sfyxSt", "UNVALID");
                    editView.remove();
                });

            });
        }
    }
}

function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.id).unbind().remove();
    $("#delBtn_" + treeNode.id).unbind().remove();
}