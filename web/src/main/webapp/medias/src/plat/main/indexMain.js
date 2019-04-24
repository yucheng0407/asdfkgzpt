/**
 * 平台首页
 */
var menuData;
$(function () {

});

//修改密码
function gotoPtgl(zxtCode) {
    var win = window.open("/asdfkgzpt/index?type=" + compileStr(zxtCode));
    //后续用 win 这个引用执行 focus 方法
    if (!win.closed) {
        win.focus();
    }
}

//修改密码
function changePassword() {
    RX.page.open({
        title: "修改密码",
        areaType: "small",
        url: "/main/password"
    });
}

//个人信息
function personal() {
    var userId = RX.cache(_top, "USER").id;
    RX.page.open({
        title: "个人信息",
        url: "/user/sysUserInfoView",
        param: {
            id: userId
        }
    })
}

//对字符串进行加密
function compileStr(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
}