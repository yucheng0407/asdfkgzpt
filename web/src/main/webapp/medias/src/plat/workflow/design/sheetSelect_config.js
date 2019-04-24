//搜索区字段配置
var config = {
    "query.pageName":{
        tagName: "表单名称",
        canClear:true
    },
    "query.pageCode":{
        tagName: "表单编码",
        canClear:true
    }
}

//列配置
var columns = [
    {title: '表单名称', id: 'NAME', width: '30%', align: 'left', renderer: "String"},
    {title: '表单编码', id: 'CODE', width: '30%', align: 'left', renderer: "String"},
    {title: '表单路径', id: 'URL', width: '40%', align: 'left', renderer: "String"}
];

//列表视图设置
var settings = {
    url: "/workflow/design/getPageList",
    autoQueryBox:{
        enable:true,
        property:["pageName", "pageCode"]
    },
    autoListBox:{
        enable: true,
        columns: columns,
        checkbox: false, //是否显示checkbox
        allPageChose: false, //是否开启全页选择
        dischose: true,    //开启数据禁选
        disObject: {},      //默认禁选内容
    }
};

var buttonArr = [
    {
        id: "confirm",
        name: "确定",
        onClick: "selectSheetItem",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};