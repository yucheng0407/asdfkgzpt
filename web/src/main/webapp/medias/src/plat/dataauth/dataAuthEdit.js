var dataAuthVm;  //数据权限对象
var selIdArr;
$(function () {
    dataAuthVm = new Rxvm({
        el: '#info',
        config: config
    });
    //新增数据权限
    $("#dataAuthList").on("click", ".add", function () {
        RX.page.open({
            title: "选择" + getTypeName(),
            url: "/auth/dataObjSelect",
            param: {
                objId: getTypeId(),
                func: "selObjCallback"
            }
        });
    });

    //保存按钮事件
    $("#save").click(function () {
        if (dataAuthVm.ruleValidate()) {
            var $selIdDom = $("#dataAuthList :checkbox:checked");
            var oIds = [];
            if ($selIdDom.length) {
                $.each($selIdDom, function (index, el) {
                    oIds.push(selIdArr[$(el).attr("index")]);
                })
            }
            $.ajax({
                type: "post",
                url: "/auth/saveDataAuth",
                data: {
                    userIds: dataAuthVm.get("userIds"),
                    objId: dataAuthVm.get("objectId"),
                    oIds: oIds.join(",")
                },
                success: function (ar) {
                    if (ar.success) {
                        RX.page.prev().reload();
                        RX.msg(RX.SUCCESS_SAVE);
                        RX.page.close();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            })
        }
    });
});

function getTypeName() {
    return dataAuthVm.getElement("objectId").text();
}

function getTypeId() {
    return dataAuthVm.get("objectId");
}

/**
 * 渲染数据展示table
 * @param dataNameArr
 * @param dataIdArr
 */
function renderDataTable(dataNameArr, dataIdArr) {
    var title = getTypeName();
    var $dataAuthList = $("#dataAuthList");
    if (!$dataAuthList.find(".page_title").length) {
        createTable($dataAuthList, title, dataNameArr, dataIdArr);
    } else {
        setDataTitle($dataAuthList.find("h1"), title);
        setTbody($dataAuthList.find("table"), dataNameArr, dataIdArr);
    }
}

function setDataTitle($el, title) {
    $el.html(title);
}

function setTbody($el, dataNameArr, dataIdArr) {
    $el.find("tbody").html(getTbodyHtml(dataNameArr, dataIdArr));
}

function createTable($el, title, dataNameArr, dataIdArr) {
    var controlDiv = "<div class='page_title'><h1>" + title + "</h1>";
    controlDiv += "<ul class='action_button to_right'>" +
        "<li><a class='add'><i class='iconfont'>&#xe62a;</i>新增</a></li>" +
        "</ul></div>";
    var $pBox = $("<div class='p_box'></div>");
    $pBox.append(controlDiv);
    var $table = $("<table class='list'  cellpadding=\"0\" cellspacing=\"0\" border=\"0\"></table>");
    $table.append(getThead());
    $table.append(gettbody(dataNameArr, dataIdArr));
    $pBox.append($table);
    $el.append($pBox);
}

function getThead() {
    var $thead = $("<thead></thead>");
    $thead.append($("<tr><th>序号</th><th>名称</th><th>id</th></tr>"));
    return $thead;
}

function gettbody(nameAee, idArr) {
    var $tbody = $("<tbody></tbody>");
    $tbody.append(getTbodyHtml(nameAee, idArr));
    return $tbody;
}

function getTbodyHtml(nameArr, idArr) {
    var html = "";
    if (nameArr) {
        $.each(nameArr, function (index, value) {
            html += "<tr><td><input class='tdData' type='checkbox' checked='checked'  index='" + index + "'>" + (index + 1) + "</td><td>" + value + "</td><td>" + idArr[index] + "</td></tr>";
        });
    } else {
        html += "<tr><td colspan='3' style='text-align: center;'>包含该对象所有权限</td></tr>";
    }
    return html;
}

/**
 * 清空展示table
 */
function clearDataTable() {
    $("#dataAuthList").empty();
}

function userCallbackFunc(ids, names) {
    dataAuthVm.set("userIds", ids);
    dataAuthVm.set("userNames", names);
}

function objectChangeFunc() {
    var objId = dataAuthVm.get("objectId");
    if (objId) {
        renderDataTable();
    } else {
        clearDataTable();
    }
}

/**
 * 获取对象字典数据
 */
function getObjZd() {
    var zdList;
    $.ajax({
        type: "get",
        url: "/auth/getObjList",
        async: false,
        success: function (ar) {
            if (ar.success) {
                zdList = ar.data;
            } else {
                RX.alert(ar.msg);
            }
        }
    });
    return zdList;
}

/**
 * 选择对象回调
 * @param name
 * @param id
 */
function selObjCallback(id, name) {
    selIdArr = id;
    renderDataTable(name, id);
}

//取消
RX.page.cancelCheck = function () {
    if (dataAuthVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};