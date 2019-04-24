var sysOrganLinkVm;
var param = RX.page.param;
var linkData = param.linkData, //关联信息
    func = param.func;
var organType = RX.cache(_top, "BASE").ORGAN_TYPE;
$(function () {

    //视图初始化
    sysOrganLinkVm = new Rxvm({
        el: '.form_box',
        template: '#organLink',
        config: config,
        settings: {
            getData: {
                defaultData: linkData
            }
        },
        //子组件声明
        components: {
            SubOrganList: {
                widget: RX.Grid,
                template: '#subOrganList'
            },
            "LinkPostList": {
                widget: RX.Grid,
                template: '#linkPostList'
            },
            "LinkUserList": {
                widget: RX.Grid,
                template: '#linkUserList'
            },
            "LinkRoleList": {
                widget: RX.Grid,
                template: '#linkRoleList'
            }
        },
        afterMount: function () {
            if (linkData.user.length > 0 || linkData.organ.length > 0) {
                $("#selPosition").show();
                $(".titleMsg").html("删除机构后，该机构下的用户和机构转移至所选机构。是否继续？");
            } else {
                $(".titleMsg").html("是否确认删除该机构？");
            }
            //无岗位，不显示关联的岗位面板
            if(organType==="np-mo"||organType==="np-so"){
                $("#organType").hide();
            }

        }
    });

    $("#yes").click(function () {
        var newOrganId = sysOrganLinkVm.get("newOrganId");
        if ((!newOrganId || newOrganId === "") && (linkData.user.length > 0 || linkData.organ.length > 0)) {
            var $newOrganName = sysOrganLinkVm.getElement("newOrganName");
            $newOrganName.parent().makeTip($newOrganName.parent(), "不可为空");
            return;
        }
        var evalFunc = RX.page.prevWin()[func];
        var result = evalFunc(delOrganId, newOrganId);
        if (result || typeof(result) == "undefined") {
            RX.page.close();
        }
    });
});


//选择移除到指定的位置 回调函数
function selPositionCallback(organId, organName) {
    sysOrganLinkVm.set("newOrganName", organName);
    sysOrganLinkVm.set("newOrganId", organId);
    $("#newOrganId").parent().removeErrorTip();
}

