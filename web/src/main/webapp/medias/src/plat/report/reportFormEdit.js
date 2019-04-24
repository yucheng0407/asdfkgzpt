var reportFormVm;
var metaData;   //columns：[{COLUMN_NAME:"", DATA_TYPE:"", COMMENTS:""}]
var id = RX.page.param.id;
$(function () {

    // $("body").droppable({
    //     drop: function (event, ui) {
    //         var $drag = ui.draggable,
    //             code = $drag.attr("data-code");
    //         if(code){
    //             deleteProperty(code);
    //         }
    //     }
    // });
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");

    $("#propertyDropX").droppable({
        activeClass: "drop-default",
        hoverClass: "drop-hover",
        drop: function (event, ui) {
            //暂只支持一个分组字段
            var list = reportFormVm.get("propertyList"), hasXpro = false;
            $.each(list, function (i, t) {
                if (t.sfyxSt != "UNVALID" && t.type == "1") {
                    hasXpro = true;
                    return false;
                }
            })
            if (hasXpro) {
                RX.msg(RX.ICON_ERROR, "分组字段仅允许有一个");
            } else {
                dropItem.call(this, event, ui, "1");
            }
        }
    });

    $("#propertyDropY").droppable({
        activeClass: "drop-default",
        hoverClass: "drop-hover",
        drop: function (event, ui) {
            dropItem.call(this, event, ui, "2");
        }
    });

    reportFormVm = new Rxvm({
        el: "#infoDiv",
        settings: {
            getData: {
                url: id && "/report/getSysReportFormById?id=" + id + "&random=" + Math.random(),
                defaultData: {
                    type: "",
                    propertyList: [],
                    settingList: [],
                    settings: {}
                }
            }
        },
        config: config,
        afterMount: function () {
            renderAll();
        }
    })
});

function renderAll() {
    renderMetaData();

    renderItem();

    var type = reportFormVm.get("type");
    if (!type) {
        setAutoType();
        freshPreview();
    } else {
        $("#type" + type).addClass("selected");
        setAutoType();
        freshPreview();
    }

    $("#typeDiv").children("div").click(function () {
        var $this = $(this),
            type = $this.attr("id").substring(4);
        if ($this.hasClass("disabled")) {
            return false;
        }
        selectType(type);

        freshPreview();
    })

    RX.makeQtip($("#type1"), {
        content: {
            title: "表格",
            text: "1个维度 多个数值<br/>0个维度 多个数值"
        }
    })

    RX.makeQtip($("#type2"), {
        content: {
            title: "柱状图",
            text: "1个维度 多个数值"
        }
    })

    RX.makeQtip($("#type3"), {
        content: {
            title: "折线图",
            text: "1个维度 多个数值"
        }
    })

    RX.makeQtip($("#type4"), {
        content: {
            title: "饼状图",
            text: "1个维度 1个数值"
        }
    })
}

function renderItem() {
    var list = reportFormVm.get("propertyList");
    var $proX = $("#propertyDropX"),
        $proY = $("#propertyDropY");
    $.each(list, function (i, t) {
        if (t.sfyxSt != "UNVALID") {
            var $label = $("<label class='labelItem' data-code='" + t.code + "'>").html("<font>" + (t.name || t.code) + "</font>" +
                "<i class='iconfont' onclick='editProperty(this)'>&#xe605;</i><i class='iconfont' onclick='deleteProperty(this)'>&#xe609;</i>");
            if (t.type == "1") {
                $label.appendTo($proX);
            } else {
                $label.appendTo($proY);
            }
        }
    })
}

function dropItem(event, ui, type) {
    var $drag = ui.draggable,
        key = $drag.attr("data-column"),
        col;
    $.each(metaData.columns, function (i, t) {
        if (t.COLUMN_NAME == key) {
            col = t;
            return false;
        }
    })
    var tempCode = key, num = 1;
    //获取不重复的code
    while (hasSamePropertyCode(tempCode)) {
        var tarr = tempCode.split("_");
        if (tarr.length == 1) {
            tempCode = tempCode + "_" + (++num);
        } else {
            var ls = tarr.pop();
            if (isNaN(parseInt(ls, 10))) {
                tarr.push(ls);
                tempCode = tarr.join("_") + "_" + (++num);
            } else {
                tarr.push(++num);
                tempCode = tarr.join("_");
            }
        }
    }

    //创建字段，并插入关系中
    var pro = {
        name: col.COMMENTS && col.COMMENTS != "null" ? col.COMMENTS : "",
        code: tempCode,
        metadataColumn: col.COLUMN_NAME,
        dataType: col.DATA_TYPE,
        type: type,
        groupType: "1",
        calculateType: "1",
        orderType: "0",
        sfyxSt: "VALID"
    };
    if(type == "2"){
        pro.name += "计数";
    }
    reportFormVm.append("propertyList", pro);
    var $label = $("<label class='labelItem' data-code='" + pro.code + "'>").html("<font>" + (pro.name || pro.code) + "</font>" +
        "<i class='iconfont' onclick='editProperty(this)'>&#xe605;</i><i class='iconfont' onclick='deleteProperty(this)'>&#xe609;</i>");
    $label.appendTo(this);

    $(this).find(".noDrop").hide();

    setAutoType();

    freshPreview();

}

function setAutoType() {
    var type = reportFormVm.get("type");

    function autoSelectType(arr) {
        if (!type) {
            if (arr.length) {
                selectType(arr[0]);
            }
        } else if (arr.length) {
            var inTag = false;
            $.each(arr, function (i, t) {
                if (t == type) {
                    inTag = true;
                    return false;
                }
            })
            if (!inTag) {
                selectType(arr[0]);
            }
        } else {
            selectType("");
        }
    }

    var list = reportFormVm.get("propertyList");
    if (list.length) {
        var xnum = 0, ynum = 0;
        $.each(list, function (i, t) {
            if (t.sfyxSt != "UNVALID") {
                if (t.type == "1") {
                    xnum++;
                } else {
                    ynum++;
                }
            }
        })
        if (xnum || ynum) {
            if (xnum === 0) {
                disableType([2, 3, 4]);
                autoSelectType([1, 2, 4]);
            } else if (xnum === 1) {
                if (ynum === 0) {
                    disableType([2, 3, 4]);
                    autoSelectType([1]);
                } else if (ynum === 1) {
                    disableType([]);
                    autoSelectType([1, 2, 3, 4]);
                } else {
                    disableType([4]);
                    autoSelectType([1, 2, 3]);
                }
            }
        } else {
            disableType([1, 2, 3, 4]);
            selectType("");
        }
    } else {
        disableType([1, 2, 3, 4]);
        selectType("");
    }
}

function hasSamePropertyCode(code) {
    var list = reportFormVm.get("propertyList"),
        hasSame = false;
    $.each(list, function (i, t) {
        if (t.sfyxSt != "UNVALID" && t.code == code) {
            hasSame = true;
            return false;
        }
    });
    return hasSame;
}

function deleteProperty(obj) {
    var $label = $(obj).parent(),
        $drop = $label.parent(),
        code = $label.attr("data-code");
    $label.remove();

    $.each(reportFormVm.get("propertyList"), function (i, t) {
        if (t.sfyxSt != "UNVALID" && t.code == code) {
            reportFormVm.set("propertyList." + i + ".sfyxSt", "UNVALID");
            return false;
        }
    })
    if(!$drop.find("label").length){
        $drop.find(".noDrop").show();
    }
    setAutoType();
    freshPreview();
}

function editProperty(obj) {
    function updatePropertyDom(data, lastCode) {
        var $pro = $("*[data-code='" + lastCode + "']");
        $pro.find("font").text(data.name);
        $pro.attr("data-code", data.code);
    }

    var $label = $(obj).parent(),
        code = $label.attr("data-code"),
        pro;
    $.each(reportFormVm.get("propertyList"), function (i, t) {
        if (t.sfyxSt != "UNVALID" && t.code == code) {
            pro = t;
            return false;
        }
    })

    RX.page.open({
        title: "报表字段设计",
        url: "/report/sysReportPropertyEdit",
        areaType: [450, 400],
        param: {
            data: pro,
            callback: function (data, lastCode) {
                if (data.code != lastCode && hasSamePropertyCode(data.code)) {
                    return false;
                } else {
                    $.each(reportFormVm.get("propertyList"), function (i, t) {
                        if (t.sfyxSt != "UNVALID" && t.code == lastCode) {
                            reportFormVm.set("propertyList." + i, data);
                            updatePropertyDom(data, lastCode);
                            return false;
                        }
                    })
                    setAutoType();
                    freshPreview();
                    return true;
                }
            }
        }
    })
}

function selectMetaData() {
    function openSelect() {
        RX.page.open({
            url: "/report/sysMetaDataSelect",
            param: {
                callback: function (metaDataId) {
                    reportFormVm.set("metadataId", metaDataId);
                    renderMetaData();
                }
            }
        });
    }

    if (reportFormVm.get("propertyList").length) {
        RX.confirm("切换元数据，将会丢失已经设计的报表字段，是否继续？", function () {
            openSelect();
        })
    } else {
        openSelect();
    }
}

function viewMetaData(metadataId) {
    RX.page.open({
        title: "查看元数据",
        url: "/report/sysMetaDataView",
        areaType: "big",
        param: {id: metadataId}
    });
}

function renderMetaData() {
    function renderDataArea() {
        var $info = $("#metaDataInfo");
        $info.empty();
        if (metaData.columns) {
            $.each(metaData.columns, function (i, t) {
                $info.append("<label class='labelItem' data-column='" + t.COLUMN_NAME + "'>" +
                    t.COLUMN_NAME + (t.COMMENTS && t.COMMENTS != "NULL" ? "(" + t.COMMENTS + ")" : "") + "</label>")
            })
            $("#metaDataInfo .labelItem").draggable({
                appendTo: "body",
                helper: "clone"
            });
        }
        $("#metaDataName").html("元数据：<a onclick='viewMetaData(" + metaData.id + ")' href='javascript:void(0);' style='color:#508bc4;font-weight:bold';>" +
            metaData.name + "</a>");
    }

    var metadataId = reportFormVm.get("metadataId");
    if (metadataId) {
        $("#noMetaData").hide();
        $("#metaDataInfo").show();
        $.ajax({
            type: "post",
            url: "/report/getMetaDataAndColumns",
            data: {metadataId: metadataId},
            dataType: "json",
            success: function (ar) {
                if (ar.success) {
                    if (metaData && metaData.id != ar.data.id) {
                        clearProperty();
                    }
                    if(!$("#propertyDropX").find("label").length){
                        $("#noDropX").show();
                    }else{
                        $("#noDropX").hide();
                    }
                    if(!$("#propertyDropY").find("label").length){
                        $("#noDropX").show();
                    }else{
                        $("#noDropX").hide();
                    }
                    metaData = ar.data;
                    if(!reportFormVm.get("name")){
                        reportFormVm.set("name", metaData.name);
                    }
                    renderDataArea();
                    setAutoType();
                    freshPreview();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    } else {
        // $("#metaDataInfo").hide();
        $("#noMetaData").show();
        $("#metaDataName").html("选择元数据");
        $("#noDropX").show();
        $("#noDropY").show();
        metaData = null;
    }
}

function autoTitle(){
    var title = (reportFormVm.get("settings.title") || "").trim().toString();
    var type = reportFormVm.get("type");
    if(title){
        if(title.endWith("表格")){
            title = title.substring(0, title.length - 2);
        }else if(title.endWith("柱状图") || title.endWith("折线图") || title.endWith("饼状图")){
            title = title.substring(0, title.length - 3);
        }
        if(type == "1"){
            title += "表格";
        }else if(type == "2"){
            title += "柱状图";
        }else if(type == "3"){
            title += "折线图";
        }else if(type == "4"){
            title += "饼状图";
        }
        reportFormVm.set("settings.title", title);
    }else{
        var name = (reportFormVm.get("name") || "").trim().toString();
        if(type == "1"){
            name += "表格";
        }else if(type == "2"){
            name += "柱状图";
        }else if(type == "3"){
            name += "折线图";
        }else if(type == "4"){
            name += "饼状图";
        }
        reportFormVm.set("settings.title", name);
    }
}

function clearProperty() {
    var list = reportFormVm.get("propertyList");
    $.each(list, function (i, t) {
        t.sfyxSt = "UNVALID";
    })
    reportFormVm.set("propertyList", list);
    $("#propertyDropX").find(".labelItem").remove();
    $("#propertyDropY").find(".labelItem").remove();
}

function freshPreview() {
    $("#formPreview").attr("src", RX.handlePath("/report/reportFormPreview"));
}

function openPreview() {
    RX.page.open({
        title: "报表预览",
        url: $("#formPreview").attr("src"),
        areaType: "big"
    });
}

function getFormData() {
    var data = reportFormVm.getData();
    for (var i = 0; i < data.propertyList.length;) {
        if (data.propertyList[i].sfyxSt == "UNVALID") {
            data.propertyList.remove(i);
        } else {
            i++;
        }
    }
    return data;
}

function disableType(validArr) {
    var $div = $("#typeDiv");
    $div.children("div").removeClass("disabled");
    $.each(validArr, function (i, t) {
        $("#type" + t).addClass("disabled");
    })
    var $sel = $div.find(".selected");
    if ($sel.length && $sel.hasClass("disabled")) {
        selectType("");
    }
}

function selectType(type) {
    $(".selected").removeClass("selected");
    if (type) {
        $("#type" + type).addClass("selected");
    }
    if(!type || type == "1"){
        reportFormVm.set("settings.rownum", 50);
    }else{
        reportFormVm.set("settings.rownum", 20);
    }
    reportFormVm.set("type", type || "");
    autoTitle();
    var xTitle, yTitle;
    if(type == "2" || type == "3"){
        $.each(reportFormVm.get("propertyList"), function(i,t){
            if(!xTitle && t.sfyxSt != "UNVALID" && t.type == "1"){
                xTitle = t.name;
            }
            if(!yTitle && t.sfyxSt != "UNVALID" && t.type == "2"){
                yTitle = t.name;
            }
        });
    }
    if(xTitle){
        reportFormVm.set("settings.xTitle", xTitle);
    }
    if(yTitle){
        reportFormVm.set("settings.yTitle", yTitle);
    }
}

function checkBelongMetaData(o, noTip, config, instance) {
    var result = true;
    var $o = $(o);
    var value = $o.val();
    if (!value) {
        result = false;
    } else {
        if (metaData) {
            var inTag = false;
            $.each(metaData.columns, function (i, t) {
                if (t.COLUMN_NAME == value) {
                    inTag = true;
                    return false;
                }
            })
            result = inTag;
        } else {
            result = false;
            $o.addClass("TextBoxErr");
            $o.makeTip($(o), "请先选择元数据");
            return result;
        }
    }
    if (result) {
        $o.removeClass("TextBoxErr");
    } else {
        if (!noTip) {
            $o.addClass("TextBoxErr");
            $o.makeTip($(o), "请输入元数据包含的列");
        }
    }
    return result;
}

function save() {
    if (reportFormVm.ruleValidate()) {
        $.ajax({
            type: "post",
            url: "/report/saveSysReportForm",
            data: {sysReportForm: reportFormVm.getJson()},
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.goto("/report/sysReportFormList");
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}

//关闭验证
RX.page.cancelCheck = function () {
    if (reportFormVm.ifChange()) {
        RX.confirm("报表已修改，确认返回吗？", function (index) {
            RX.page.goto("/report/sysReportFormList");
        });
        return false;
    }
    return true;
};

function back() {
    if (RX.page.cancelCheck()) {
        RX.page.goto("/report/sysReportFormList");
    }
}