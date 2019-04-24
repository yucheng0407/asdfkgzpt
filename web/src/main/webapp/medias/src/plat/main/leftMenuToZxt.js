$(function () {
    var index = RX.getUrlParam("index");
    var $nav = $("#asdfknav");
    $nav.empty();
    if (index) {
        //子菜单
        var subMenu = parent.menuData[index].CHILD_MENU;
        createSubMenu($nav, subMenu);
    }
    $(".asdfklink").click(function () {
        var _href = $(this).attr("href");
        if (!_href) {
            //未配置页面
            $(this).attr("href", "/asdfkgzpt/error/404")
        }
        if (!$(this).hasClass("ClickStyle")) {
            $(".asdfklink").removeClass("ClickStyle");
            $(this).addClass("ClickStyle");
        }
    });
});

function clearD(time) {
    setTimeout(function () {
        $(".brand", window.frames["MainIframeR"].document).remove();
        $("footer", window.frames["MainIframeR"].document).remove();
    }, time || 0);
}

/**
 * 创建菜单
 * @param $nav
 * @param subMenu
 */
function createSubMenu($nav, subMenu) {
    var flag = 0;
    var firstUrl;
    $.each(subMenu, function (i, t) {
        var $li = $("<li></li>");
        $nav.append($li);
        if (!t.CHILD_MENU) {   //一级菜单
            $li.append('<a href="' + RX.handlePath(t.url) + '" class="asdfklink"  menuid="' + t.id + '" target="MainIframeR"><i class="iconfont">' + (t.icon ? t.icon : '') + '</i>' + t.name + '</a>');
            $nav.append($li);
        }
        if (i === 0) {//初始化右侧页面
            if (t.url) {
                firstUrl = t.url;
                $("#MainIframeR").attr("src", RX.handlePath(firstUrl));
                $li.find("a :first").addClass("ClickStyle");
            }
        }
    });

}






