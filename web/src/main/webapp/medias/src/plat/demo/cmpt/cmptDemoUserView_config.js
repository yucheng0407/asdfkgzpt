//视图字段配置
var config = {
    zp_id: {
        type: "file",
        fileConfig: {
            type: "image"
        },
        disabled: true
    },
    fj_id_table: {
        type: "file",
        fileConfig: {
            listName: "表格附件",
            type: "table"
        },
        disabled: true
    },
    fj_id_fl: {
        type: "file",
        fileConfig: {
            listName: "手风琴附件",
            type: "list",
            dictCode: "ZZMMDEMO",
            minNum: 1
        },
        disabled: true
    },
    fj_id_inner: {
        type: "file",
        fileConfig: {
            type: "inner",
            fileType: "*.jpg;*.txt",
            fileSize: "5MB"
        },
        disabled: true
    }
};

//按钮配置
var buttonArr = [];
var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};
