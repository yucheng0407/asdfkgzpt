var type = "xg", id = 122;
var organVm;    //机构视图
var organ = {};   //机构json对象
$(function () {

    $("#validate").click(function () {
        RX.msg(organVm.ruleValidate({notPassStopAll: true}));
    })

});

//主表单渲染方法
function renderForm() {
    organVm = new Rxvm({
        el: '.form_box',
        data: organ,
        config: config,
        state: xzState,
        settings: {
            getData:{
                url:"/organ/getOrganById?id=" + id
            }
        },
        methods: {
            delPost: function ($keypath) {
                this.set($keypath + ".sfyxSt", "UNVALID");
            },
            addPost: function () {
                RX.page.open({title:"选择岗位", url:"/post/basePostSelect?type=xz&func=addPostCallback&postIds=" + this.existBasePostIds()});
            },
            existBasePostIds: function () {
                var idArr = [];
                $.each(this.get("sysPostList", []), function (i, t) {
                    idArr.push(t.basePostId);
                });
                return idArr.join();
            }
        }
    });
}

//所选岗位的回调函数
function addPostCallback(posts) {
    var tempList = organVm.get("sysPostList", []);
    $.each(posts, function (i, t) {
        t.sfyxSt = "VALID";
    });
    tempList = tempList.concat(posts);
    organVm.set("sysPostList", tempList);
}

//选择上级机构机构回调函数
function sjmbSelectCallback(modelName, name, id) {
    organVm.set("parentOrg", id);
    organVm.set("parentName", name);
}

//添加树类型，过滤id
function addOrganId() {
    var organId = organVm.get("parentOrg", "");
    var str = "&filterId=" + organId + "&treeType=" + 1 + "&filterLx=jg";
    return str;
}

//清空上级机构
function emptyParent() {
    organVm.set("parentOrg", "");
    organVm.set("parentName", "");
}
