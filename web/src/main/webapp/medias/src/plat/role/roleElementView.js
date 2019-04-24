$(function () {
    var param = RX.page.param,
        id = param.id,
        roleMade = param.roleMade;
    if (roleMade === "1") {
        $(".form_box").show();
        ShowRoleGlObj(id, 6);
    } else {
        $("#ruleElement").show();
        ruleVm = new Rxvm({
            widget: RX.Grid,
            el: "#ruleElement",
            settings: {
                getData: {
                    url: id ? "/role/getRoleGlRule?roleId=" + id + "&&random=" + Math.random() : null,
                    defaultData: {
                        list: []
                    },
                    success: function (ar) {
                        return {
                            list: ar.data
                        }
                    }
                }
            }
        });
    }
});