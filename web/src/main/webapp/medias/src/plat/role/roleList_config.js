//搜索部分配置
var SearchConfig = {
    "query.roleName": {
        tagName: "角色名称",
        canClear: true,
        maxLength: 25
    },
    "query.roleCode": {
        tagName: "角色编码",
        canClear: true,
        maxLength: 20
    },
    "query.roleType": {
        type: "dict",
        dictConfig: {
            dictCode: "JSLX"
        },
        tagName: "角色类型",
        canClear: true
    },
    "query.isCombine": {
        type: "dict",
        dictConfig: {
            dictCode: "SF"
        },
        tagName: "是否组合",
        canClear: true
    },
    //查询自己所属的角色
    "query.ifOwn": {
        display: false,
        defaultValue: "own"
    }
};
//规定表头
var columns = [
    {title: '角色名称', id: 'ROLE_NAME', width: '20%', align: 'left', renderer: "String"},
    {title: '角色编码', id: 'ROLE_CODE', width: '15%', align: 'left', renderer: "String"},
    {title: '角色类型', id: 'ROLE_TYPE', width: '15%', align: 'left', renderer: "Dict", dictCode: "JSLX"},
    {
        title: '是否组合',
        id: 'IS_COMBINE',
        width: '10%',
        align: 'left',
        renderer: "Dict",
        dictCode: "SF"
    },
    {
        title: '修改时间',
        id: 'XGSJ',
        width: '20%',
        align: 'left',
        renderer: "Date",
        format: "yyyy-MM-dd HH:mm"
    },
    {
        title: '操作', id: 'OPERS', width: '20%', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
        var rhtml = "";
        showPro.ifSetTitle = true;
        showPro.stitle = "";
        showPro.replaceSymbols = false;
        if (isPlatAdmin) {
            if (rowData.LEVELS !== "1") {
                rhtml = "<a class='active_1' onclick='editRow(" + rowData.ID + ")'>修改</a> <a class='active_2' onclick='delRow(" + rowData.ID + ")'>删除</a>";
                if (rowData.ROLE_TYPE == "1" || rowData.ROLE_TYPE == "3") {
                    rhtml += " <a class='active_1' onclick='resourceRow(" + rowData.ID + ")'>关联资源</a>";
                }
            }
        } else {
            if (rowData.LEVELS != "1" && rowData.LEVELS != "2") {
                if (rowData.ROLE_TYPE !== "2") {
                    rhtml = "<a class='active_1' onclick='editRow(" + rowData.ID + ")'>修改</a> <a class='active_2' onclick='delRow(" + rowData.ID + ")'>删除</a>";
                    if (rowData.ROLE_TYPE == "1" || rowData.ROLE_TYPE == "3") {
                        rhtml += " <a class='active_1' onclick='resourceRow(" + rowData.ID + ")'>关联资源</a>";
                    }
                }
            }
        }
        return rhtml;
    }
    }
];
//列表视图设置
var tableSettings = {
    url: "/role/getRoleListByRole",
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
        code: "ADD_ROLE",
        icon: "&#xe62a;",
        onClick: "add"              //可以是方法引用，也可以是方法字符串名称
    }
];
//存在默认配置
var buttonsJson = {
    buttons: buttonArr,
    pageCode: "JSGLYM"
};
