//model渲染方案配置
var config = {
    "list.*.id": {
        display: false
    },
    "list.*.userId": {             //角色id
        display: false
    },
    "list.*.userName": {               //规则名称
        disabled: true
    },
    "list.*.sex": {
        type: "dict",
        dictConfig: {
            dictCode: "SEXDEMO"
        },
        disabled: true
    },
    "list.*.organName": {
        disabled: true
    },
    "list.*.sfyxSt": {
        display: false
    }
};