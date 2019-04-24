var id = RX.page.param.id;
var userVm;

$(function () {

    //初始化表单按钮控件
    buttons = RX.button.init($("#w_butt"), buttonsJson, "ck");

    //视图初始化
    userVm = new Rxvm({
        el: '.form_box',
        config: config,
        settings: {
            getData: {
                url: "/demoUser/getDemoUserById?id=" + id
            }
        }
    });
});

//获取语言字典
function getLanguageDict() {
    return [
        {"value": "java", "code": "0"},
        {"value": "javaScript", "code": "1"},
        {"value": "html", "code": "2"}
    ];
}

//获取性别字典
function getSexDict() {
    return [
        {"value": "男", "code": "0"},
        {"value": "女", "code": "1"}
    ];
}

//获取水果字典
function getFruitDict() {
    return [{code: "0", value: "梨"}, {code: "1", value: "桃"}, {code: "2", value: "苹果"}];
}

//获取省份字典
function getShengDict() {
    return [{code: "PROVINCE_1", value: "安徽省"}, {code: "PROVINCE_2", value: "江苏省"}];
}

//获取城市字典
function getShiDict() {
    return [{code: "CITY_1", pcode: "PROVINCE_1", value: "合肥市"},
        {code: "CITY_2", pcode: "PROVINCE_1", value: "芜湖市"},
        {code: "CITY_3", pcode: "PROVINCE_2", value: "南京市"},
        {code: "CITY_4", pcode: "PROVINCE_2", value: "常州市"}];
}