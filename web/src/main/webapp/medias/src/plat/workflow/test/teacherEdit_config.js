var config = {
    id: {  //id
    },
    sfyxSt: {         //是否有效
        defaultValue: "VALID"
    },
    name: {  //名称
        rules: {checkValue: [], checkSave: ["notNull"]},
        maxLength: 50
    },
    qjsc:{ //请假时长为大于等于0的整数
        rules: {checkValue: [], checkSave: ["notNull","isIntGteZero"]}
    }
}



