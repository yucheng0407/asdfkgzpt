var config = {
    id: {display: false}, //主键
    name: {        //字典名称
        rules: {checkSave: ["notNull"]},
        maxLength: 20
    },
    parentName: {
        maxLength: 20
    },
    parentId: {
        maxLength: 20
    },
    description: {      //描述
        maxLength: 100
    },
    sfyxSt: {          //是否有效
        defaultValue: "VALID"
    }
}