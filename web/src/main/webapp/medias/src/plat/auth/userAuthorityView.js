var roleVm,                 //角色对象
    param = RX.page.param,
    id = param.id;
$(function () {

    //初始化表单按钮控件
    RX.button.init($(".w_button_box"), buttonsJson, "ck");

    roleVm = new Rxvm({
        el: '.form_box',
        settings: {
            getData: {
                url: "/role/getUserAuthorityInfo?userId=" + id + "&random=" + Math.random(),
                defaultData: {
                    authorityList: []
                },
                success: function (ar) {
                    var data = ar.data,
                        info = {
                            userId: data.sysUser.id,
                            userName: data.sysUser.userName,
                            authorityList: data.authorityList || [],
                            otherAuthorityList: data.otherAuthorityList || []
                        };
                    return info;
                }
            }
        },
        //子组件声明
        components: {
            "AuthTags": {
                widget: RX.Tag,
                settings: {
                    height: '110px',
                    tagProperty: "ROLE_NAME",
                    type:"ck"
                }
            },
            "OtherAuthTags": {
                widget: RX.Tag,
                settings: {
                    height: '110px',
                    tagProperty: "ROLE_NAME",
                    type:"ck"
                }
            }
        }
    });

});