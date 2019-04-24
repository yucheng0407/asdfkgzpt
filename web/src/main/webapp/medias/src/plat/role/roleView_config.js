var param = RX.page.param;
//按钮配置
var buttonArr = [
    {
        id: "chooseOrgan",
        name: "关联设置",
        style: "c_button",
        onClick: "chooseOrgan"
    }
];
var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr,
    editButton: isPlatAdmin ? {
        enable: true,
        editUrl: {url: "/role/roleEdit", param: {id: param.id, type: "xg"}}, //默认采用查看页面的View替换Edit,并将id传入
        editTitle: "修改用户" //默认将当前页面标题的"查看"改为"修改"
    } : false
};