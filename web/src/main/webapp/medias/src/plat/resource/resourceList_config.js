//搜索部分资源
var searchConfig = {
    "query.parentName": {
        tagName: "上级资源",
        disabled: true,
        ifForm: false,
        spanShow: false,
        canClear: true
    },
    "query.parentId": {
        display: false,
        canClear: true
    },
    "query.parentType": {
        display: false,
        canClear: true
    },
    "query.name": {
        tagName: "资源名称",
        maxLength: 25,
        canClear: true
    },
    "query.code": {
        tagName: "资源编码",
        maxLength: 25,
        canClear: true
    },
    "query.type": {
        tagName: "资源类型",
        type: "dict",
        dictConfig: {
            dictCode: resourceDict
        },
        canClear: true
    }
};
//表头
var columns = [
    {
        title: '资源名称', id: 'NAME', width: '25%', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
        var rhtml = v;
        if (rowData.UTYPE == 1) {
            showPro.ifSetTitle = true;
            showPro.replaceSymbols = false;
            rhtml = "<img src='" + RX.handlePath("/medias/style/plat/image/resource/home_resource.png") + "'" +
                " style='margin:-4px 5px 0px 0px;' align='absmiddle'/>" + rhtml;
        }
        return rhtml;
    }
    },
    {title: '资源编码', id: 'CODE', width: '25%', align: 'left', renderer: "String"},
    {title: '资源类型', id: 'TYPE', width: '25%', align: 'left', renderer: "Dict", dictCode: resourceDict},
    {title: '修改时间', id: 'XGSJ', width: '25%', align: 'left', renderer: "Date", format: "yyyy-MM-dd HH:mm"}
];

//列表视图设置
var tableSettings = {
    url: "/resource/getResourceList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};
//初始化buttongroup
//按钮区配置
//默认显示
//个性控制的，比如组织机构中，点击删除的数据是恢复，点击未删除的数据是删除等.....
var buttonArr = [
    {
        id: "add",
        name: "新增",
        code:"ADD_RESOURCE",
        icon: "&#xe62a;",
        onClick: "add"              //可以是方法引用，也可以是方法字符串名称
    },
    {
        id: "edit",
        name: "修改",
        code:"EDIT_RESOURCE",
        icon: "&#xe605;",
        onClick: "edit"
    },
    {
        id: "del",
        name: "删除",
        CODE:"DEL_RESOURCE",
        icon: "&#xe606;",
        onClick: "del"
    }
];
//存在默认配置
var buttonsJson = {
    buttons: buttonArr,
    pageCode:"ZYGLYM"
};

