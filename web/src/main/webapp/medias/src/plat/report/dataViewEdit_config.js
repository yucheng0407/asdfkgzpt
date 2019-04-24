var config = {
    name: {
        rules: {checkSave: ["notNull"]}
    },
    text: {
        rules: {checkSave: ["notNull"]},
        type: "textarea"
    }
};

//按钮配置
var buttonArr = [
    {
        id: "save",
        name: "保存",
        onClick: "save",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};



