//视图字段配置
var config = {};

//按钮配置
var buttonArr = [];
var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr,
    pageCode: "YHGLYM",
    editButton: {
        enable: true,
        editUrl: {url: "/user/sysUserEdit", param: {id: RX.page.param.id}}, //默认采用查看页面的View替换Edit,并将id传入
        editTitle: "修改用户", //默认将当前页面标题的"查看"改为"修改",
        code: "EDIT_USER"
    }
};
