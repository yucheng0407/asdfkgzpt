//model渲染方案配置
var config = {
    "list.*.id": {
        display: false
    },
    "list.*.roleId": {             //角色id
        display: false
    },
    "list.*.ruleId": {             //规则id
        display: false
    },
    "list.*.ruleName": {               //规则名称
        ifForm: false,
        disabled: true
    },
    "list.*.ruleXgsj": {                  //修改时间
        type: "date",
        ifForm: false,
        disabled: true
    },
    "list.*.description": {           //描述
        ifForm: false,
        disabled: true
    },
    "list.*.sfyxSt": {              //是否有效
        display: false,
        defaultValue: "VALID"
    }
};