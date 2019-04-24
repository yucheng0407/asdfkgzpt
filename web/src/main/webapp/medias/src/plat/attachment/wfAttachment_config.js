var config ={
    id: {        //主键ID
        display: false
    },
    sfyxSt: {    //是否有效
        display: false,
        defaultValue: "VALID"
    },
    fj_id: {        //附件id
        type: "file",
        fileConfig: {     //在类型为file时才有fileConfig
            type: "table",
            listName: "资料附件上传"
        }
    }
};