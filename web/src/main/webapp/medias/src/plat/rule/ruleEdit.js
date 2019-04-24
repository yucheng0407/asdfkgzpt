var param = RX.page.param,
    type = param.type,
    func = param.func,
    keypath = param.keypath,
    authRuleVm;          //规则权限对象
$(function () {
    var authRule;
    var id = param.id;
    //视图初始化
    authRuleVm = new Rxvm({
        el: '.form_box',
        config: ruleConfig,
        settings: {
            getData: {
                url: id ? "/rule/getAuthRuleById?authRuleId=" + id : null,
                defaultData: {
                    sysBaseRule: {sfyxSt: "VALID"}
                },
                success: function (ar) {
                    authRule = ar.data;
                    return authRule;
                }
            }
        },
        //子组件声明
        components: {
            "ProjectGrid": {
                config: authRuleConfig,
                afterRender:function(){
                    //解决与select控件切换时的事件冲突
                    $("#subject").parent().off("click");
                }
            }
        }
    });
    $("#save").click(function () {
        if (authRuleVm.ruleValidate()) {
            $.ajax({
                type: "post",
                url: "/rule/saveAuthRule",
                data: {sysAuthRule: authRuleVm.getJson()},
                dataType: "json",
                success: function (ar) {
                    if (ar.success) {
                        if (func) {
                            var callback = RX.page.prevWin()[func];
                            callback(ar.data, authRuleVm.$refs["authRuleTpl"].get("sysBaseRule.rule_name"),
                                (new Date()).getTime(), authRuleVm.$refs["authRuleTpl"].get("sysBaseRule.description"), keypath);
                        }
                        RX.page.prev().reload();
                        RX.msg(RX.SUCCESS_SAVE);
                        RX.page.close();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
    });
});

//选择关联对象回调函数
function objectSelectCallback(id, name) {
    authRuleVm.set("objectId").val();
    authRuleVm.set("objectName", name);
}

//  选择关联对象前置函数
function checkObjectSelect() {
    var objId = authRuleVm.get("objectId");
    return "&disId=" + objId;
}

//选择页面回调函数
function pageSelectCallback(ids, names) {
    authRuleVm.set("pageIds", ids);
    authRuleVm.set("pageNames", names);
}

//选择页面前置函数
function checkPageSelect() {
    var pageIds = authRuleVm.get("pageIds");
    return "&ids=" + pageIds;
}

//取消
RX.page.cancelCheck = function () {
    if (authRuleVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};