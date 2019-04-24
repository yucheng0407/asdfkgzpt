var candidateVm;
var func = RX.page.param.func;
var candidate = RX.page.param.candidate;
var pKeypath = RX.page.param.keypath;
$(function () {
    candidateVm = new Rxvm({
        el: '.form_box',
        config: config,
        data: candidate ? {
            id: candidate.id,
            ruleId: candidate.rule.id,
            ruleName: candidate.rule.ruleName,
            roleList: candidate.roleList
        } : {},
        components: {
            "RoleTags": {
                widget: RX.Tag,
                settings: {
                    height: '55px',
                    tagProperty: "roleName"
                },
                methods: {
                    selectTag: function () {
                        RX.page.open({
                            title: "选择办理角色",
                            url: "/role/authorityRoleSelect",
                            param: {
                                selIds: this.getSelIds(),
                                func: "roleSelectCallback",
                                notShowType: "2",
                                mulchose: true
                            }
                        });
                    },
                    removeTag: function (tag) {
                        this.$tag.removeTag(tag);
                    },
                    getSelIds: function () {
                        var idArr = [];
                        $.each(this.get("list") || [], function (i, t) {
                            if (t.sfyxSt !== "UNVALID" && t.roleId) {
                                idArr.push(t.roleId);
                            }
                        });
                        return idArr.join();
                    }
                }
            }
        }

    });

    $("#confirm").click(function () {
        if (candidateVm.ruleValidate()) {
            var evalFunc = RX.page.prevWin().RX.getGlobalFunc(func);
            var result = evalFunc(candidateVm.get(), pKeypath);
            if (result || typeof(result) == "undefined") {
                RX.page.close();
            }
        }
    });
});

/**
 * 选择规则回调
 * @param id
 * @param name
 */
function ruleCallbackFunc(id, name) {
    candidateVm.set("ruleId", id);
    candidateVm.set("ruleName", name);
}

/**
 * 选择角色回调
 * @param roles
 */
function roleSelectCallback(roles) {
    $.each(roles, function (i, t) {
        candidateVm.$refs["roleTags"].addTag({
            roleName: t.ROLE_NAME,
            roleId: t.ROLE_ID,
            sfyxSt: "VALID"
        });
    });
}