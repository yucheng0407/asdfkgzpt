/**
 * 防控指令（发送）
 */
var sendTemplate;
var clickItem;
$(function () {

    //初始化视图
    sendTemplate = new Rxvm({
        el:".three_tab_box",
        template: '#sendTemplate',
        data:{
            list:sendWayDics
        }
    });
    setTab(document.getElementById("tab_region"));
    //初始化内容区域高度
    $(".lib_Contentbox").height($(window).height() - $(".three_tab_box").outerHeight());

});

//页面大小改变时，触发jquery的resize方法，自适应拖拽
$(window).resize(function() {
    $(".lib_Contentbox").height($(window).height() - $(".three_tab_box").outerHeight());
});

function setTab(item) {
    if(clickItem==item)//点击对象是否为当前视图
        return;
    clickItem = item;
    sendWayDics.forEach(function(it){
        var menu = document.getElementById("tab_" + it.code);
        menu.className = item.id == ("tab_" + it.code) ? "zl" : "";
        if (item.id == ("tab_" + it.code)){
            $('#zlcontent').attr('src',RX.handlePath(RX.ctxPath+it.templateUrl));
        }
    });
}

