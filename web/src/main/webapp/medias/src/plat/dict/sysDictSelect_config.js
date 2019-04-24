//搜索部分配置
var sysDictConfig = {
    "query.dictName": {
        tagName: "字典名称"
    },
    "query.dictCode": {
        tagName: "字典编码"
    },
    "query.dictType": {
        type: "dict",     //字典项
        dictConfig: {
            dictCode: "DICTLX"
        },
        tagName: "字典类型"
    }
};
//规定表头  id需与Dao层中查出的字段名一致
var columns = [
    {title: '字典名称', id: 'DICT_NAME', width: '20%', align: 'center', renderer: "String"},
    {title: '字典编码', id: 'DICT_CODE', width: '20%', align: 'center', renderer: "String"},
    {title: '字典类型', id: 'DICT_TYPE', width: '20%', align: 'center', renderer: "Dict", dictCode: "DICTLX"},
    {title: '描述', id: 'DESCRIPTION', width: '20%', align: 'center', renderer: "String"},
    {title: '修改时间', id: 'XGSJ', width: '20%', align: 'center', renderer: "Date", format: "yyyy-MM-dd"}
];
//列表视图设置
var sysDictSettings = {
    url: "/dict/getSysDictListPage",
    autoQueryBox: {
        enable: true,
        cols: [100, 140, 100, 140, 100, 140]
    },
    autoListBox: {
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "addSysDict",
        name: "新增",
        icon: "&#xe62a;",
        onClick: "addSysDict"
    },
    {
        id: "edit",
        name: "修改",
        icon: "&#xe605;",
        onClick: "editSysDict"
    },
    {
        id: "delSysDict",
        name: "删除",
        icon: "&#xe605;",
        onClick: "delSysDict"
    }
];
var buttonsJson = {
    tag: ".operation_box",
    param: {},
    title: null,
    buttons: buttonArr
};
