var searchConfig = {
    "query.userName": {
        rules: {checkSave: ["notNull"]},
        tagName: "用户",
        type: "layer",
        layerConfig: {
            url: "/user/sysUserSelect?multyFlag=false",
            title: "请选择用户",
            callbackFunc: "userCallbackFunc"
        },
        ifForm: false,
        canClear: true
    },
    "query.userId": {
        display: false,
        canClear: true
    },
    "query.objId": {   //项目、标段、单位工程、企业
        tagName: "对象类型",
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            reqInterface: "getObjZd",
            showPlsSelect: false
        },
        canClear: true
    },
    "query.objectName": {
        tagName: "对象名称",
        canClear: true
    }
};
var columns = [
    {title: '用户名称', id: 'USER_NAME', width: '100', align: 'left', renderer: "String"},
    {title: '对象类型', id: 'OBJ_NAME', width: '100', align: 'left', renderer: "String"},
    {
        title: '对象名称', id: 'O_NAME', width: '100', align: 'left', renderer: function (v, rowData, rowIndex, showPro) {
        if (!v) {
            v = "拥有所有" + rowData.OBJ_NAME + "权限"
        }
        showPro.stitle = v;
        showPro.ifSetTitle = true;
        return v;
    }
    }
];

//列表视图设置
var tableSettings = {
    url: "/auth/getDataAuthList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};

var buttonArr = [];
//存在默认配置
var buttonsJson = {
    buttons: [
        {
            id: "addDataAuth",
            name: "新增",
            code:"ADD_DATAAUTH",
            icon: "&#xe62a;",
            onClick: "addDataAuth"
        }, {
            id: "delDataAuth",
            name: "删除",
            code:"DEL_DATAAUTH",
            icon: "&#xe606;",
            onClick: "delDataAuth"
        }, {
            id: "batchDel",
            name: "批量删除",
            code:"BACTHDELDA",
            icon: "&#xe606;",
            onClick: "batchDel"
        }
    ],
    pageCode:"sjqx"
};


