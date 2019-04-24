//1、获取路径以及资源
var username = RX.handlePath(decodeURIComponent(GetQueryString("username")));
var password = RX.handlePath(decodeURIComponent(GetQueryString("password")));
var from = RX.handlePath(decodeURIComponent(GetQueryString("from")));
var code = "";
if (from == "out") {
    code = RX.handlePath(decodeURIComponent(GetQueryString("code")));
}
var el = document.getElementById("MainIframeR");
//把数据传给后台进行登陆验证
$.post("/loginVali", {
    username: username,
    password: password,
    loginType: "Account"
}, function (data) {
    if (data === "SUCCESS") {
        checkFwdy();
    } else {
        failTips("用户信息验证失败！")
    }
});

/**
 * 采用正则表达式获取地址栏参数
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//服务订阅信息验证
function checkFwdy() {
    var previousUrl = document.referrer;
    if (previousUrl == "") {
        failTips("订阅对象IP验证失败！")
    } else {
        $.ajax({
            type: "get",
            url: "/fwdy/getDyxxByCode?code=" + code,
            success: function (ar) {
                if (ar.success && ar.data.length > 0) {
                    //验证订阅对象IP
                    if (previousUrl.indexOf(ar.data[0].DYDXIP) != -1) {
                        //验证任务是否有效
                        if (ar.data[0].RWSFYX == "1") {
                            //验证任务是否启用
                            if (ar.data[0].RWZT == "2") {
                                var doubleSjqx = ar.data[0].DYSJQX + "," + ar.data[0].RWSJQX;
                                var sjqx = "";
                                if (doubleSjqx.match(/2/g) != null && doubleSjqx.match(/2/g).length == 2) {
                                    sjqx += "2,"
                                }
                                if (doubleSjqx.match(/3/g) != null && doubleSjqx.match(/3/g).length == 2) {
                                    sjqx += "3,"
                                }
                                if (doubleSjqx.match(/4/g) != null && doubleSjqx.match(/4/g).length == 2) {
                                    sjqx += "4,"
                                }
                                if (sjqx == "") {
                                    failTips("访问权限不足！")
                                } else {
                                    RX.cache(_top,"fwdyRwmc",ar.data[0].RWMC);
                                    RX.cache(_top,"fwdyFormId",ar.data[0].FORM_ID);
                                    RX.cache(_top,"fwdyCjlx",ar.data[0].CJLX);
                                    el.src = "/asdfkgzpt?sjqx=" + sjqx;
                                }
                            } else {
                                failTips("订阅采集任务未启用！");
                            }
                        } else {
                            failTips("订阅采集任务已删除！");
                        }
                    } else {
                        failTips("订阅对象IP验证失败！");
                    }
                } else {
                    failTips("订阅验证码有误，请重新配置！");
                }
            }
        })
    }
}

function getLength(num, str) {
    if (/[num]/i.test(str)) {
        return str.match(/[a-z]/ig).length;
    }
    return 0;
}

//验证不通过，打开提示信息
function failTips(tips) {
    $("#MainIframeR").hide();
    $("#tips").text(tips);
    $("#errTips").show();
}