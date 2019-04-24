var config = {
   description: {
       type: "textarea",
       textareaConfig: {
           showNum: false
       },
       maxLength: 160
   }
};

var buttonArr = [
    {
        id: "save",
        name: "保存",
        onClick: "saveEndNode",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};