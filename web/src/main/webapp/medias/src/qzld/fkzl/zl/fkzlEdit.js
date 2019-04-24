var zltemplate;
var clickItem;//当前点击对象
$(function() {
    //初始化模板
    zltemplate = new Rxvm({
        el:".two_tab",         //模板的外包容器
        template:"#zltemplate",//模板标识
        data:{                 //模板数据源
            list:tabdics
        }
    });
    //初始化内容区域高度
    $(".lib_Contentbox").height($(window).height() - $(".two_tab").outerHeight());
    setTab(document.getElementById("tab_send"));
});
//页面大小改变时，触发jquery的resize方法，自适应拖拽
$(window).resize(function() {
    $(".lib_Contentbox").height($(window).height() - $(".two_tab").outerHeight());
});

function setTab(item) {
    if (item==clickItem)//判断点击是否为当前元素
        return;
    clickItem = item;
    tabdics.forEach(function(it){
        var menu = document.getElementById("tab_" + it.code);
        menu.className = item.id == ("tab_" + it.code) ? "qh" : "";
        if (item.id == ("tab_" + it.code)){
            $('#zlframe').attr('src',RX.handlePath(RX.ctxPath+it.templateUrl));
        }
    });
}