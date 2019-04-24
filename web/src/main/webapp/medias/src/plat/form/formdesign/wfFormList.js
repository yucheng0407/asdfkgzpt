var flTree;
var config = {
    "query.flowName": {
        tagName: "流程",
        disabled: true,
        spanShow: false,
        canClear: true
    },
    "query.title": {
        tagName: "标题",
        canClear: true,
        maxLength: 20
    },
    "query.flowCode": {
        display: false,
        // defaultValue: flowCode,
        canClear: true
    },
    "query.flowId": {
        display: false,
        // defaultValue: flowCode,
        canClear: true
    },
    // //动态表单的相关属性
    // "query.options": {
    //     display: false,
    //     defaultValue: options && JSON.stringify(options)
    // }
};
//
// //按钮配置
var buttonArr = [];

// if (flowCode) {
    buttonArr.push(
        {
            id: "startFlow",
            name: "发起",
            icon: "&#xe62a;",
            onClick: "startFlow"
        })
// }


var buttonsJson = {
    buttons: buttonArr
};
//
// //列配置
//column：流程基本展示+配置展示
// 获取设计的表单信息
var columns = [
    {title: '流程标题', id: 'TITLE', width: '100', align: 'left', renderer: "String"}
];
// // var optionMap
// if (options) {
//     for (var key in options) {
//         var fields = options[key];
//         for (var i = 0, maxLength = fields.length; i < maxLength; i++) {
//             var field = fields[i];
//             var columnObj = $.extend({
//                 //不同类型的配置不一样，先全部是一样的
//                 //  {title: '规则名称', id: 'RULE_NAME', width: '40%', align: 'left', renderer: "String"},
//                 title: field.label,
//                 id: field.code.toUpperCase(),
//                 width: '100',
//                 align: 'left',
//                 renderer: "String"
//             }, fieldControl.getColumnConfig(field.fieldType, field.fieldOptions, field));
//             columns.push(columnObj);
//             var fieldOptions = field.fieldOptions;
//             if (fieldOptions["show_search"] == true) {
//                 $.extend(config, fieldControl.getSearchConfig(field["fieldType"], field["code"].toUpperCase(), fieldOptions, field));
//             }
//         }
//     }
// }
// if (ywztzd) {
//     columns.push(
//         //读取流程的配置属性，看存不存在流程状态字典，或者是sql直接查找出来
//         {title: '流程状态', id: 'STATUS', width: '100', align: 'left', renderer: "Dict", dictCode: ywztzd}
//     );
// } else {
    columns.push(
        //读取流程的配置属性，看存不存在流程状态字典，或者是sql直接查找出来
        {title: '流程状态', id: 'STATUS', width: '100', align: 'left', renderer: "String"}
    );
// }
columns.push({title: '最后办理人', id: 'USER_NAME', width: '100', align: 'left', renderer: "String"});
columns.push(
    {title: '修改时间', id: 'XGSJ', width: '100', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"});
//
// //视图设置
var settings = {
    url: "/form/getWfInsList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};
var teacherVm;
$(function () {
    settings.autoListBox.onRowDblClick = function onRowDblClick(rowIndex, rowData, isSelected, event) {
        handleWorkflowByWiId(rowData.WF_INS_ID, rowData.WF_ID);
    };
    teacherVm = new Rxvm({
        widget: RX.Grid,
        el: ".base_box",
        config: config,
        settings: settings,
        afterMount: function () {
            //初始化按钮
            RX.button.init($("#operate"), buttonsJson);
        }
    });
    createFlowDefTree();
});

function createFlowDefTree() {
    $.get("/workflow/design/getFlowTypeAndFlowTree", {c: Math.random}, function (ar) {
        flTree = $.fn.zTree.init($("#tree"), {
            data: {
                simpleData: {
                    enable: true,
                    idKey: "handleId",
                    pIdKey: "pId",
                    rootPId: 0
                }
            },
            view: {
                selectedMulti: false
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    if ("workflow" === treeNode.type) {
                        teacherVm.autoQuery.set("query.flowName", treeNode.name);
                        teacherVm.autoQuery.set("query.flowCode", treeNode.code);
                        teacherVm.autoQuery.set("query.flowId", treeNode.id);
                        reloadTable();
                    }
                }
            }
        }, ar);
    }, 'json');
}


/**
 * 载入数据表格
 * @param param
 */
function reloadTable(param) {
    teacherVm.reloadGrid();
}

function startFlow() {
    var code = teacherVm.get("query.flowCode");
    if (code) {
        confirmWorkflowStart({
            title: "发起" + (teacherVm.get("query.flowName") || "") + "流程",
            flowCode: code,
            type: "xz",
            wfId: teacherVm.get("query.flowId")
        });
    } else {
        RX.msg("请先从左侧树中选择一个流程");
    }
}

