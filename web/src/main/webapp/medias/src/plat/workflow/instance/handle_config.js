var config = {
    opinion: {
        maxLength: 250,
        rules: {checkSave:["notNull"]}
    }
};

var buttonArr = [
    {
        id: "view",
        name: "上传/查看附件",
        onClick: "uploadOrViewFile",
        style: "c_button"
    },
    {
        id: "sure",
        name: "确定",
        onClick: "submitTask",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};