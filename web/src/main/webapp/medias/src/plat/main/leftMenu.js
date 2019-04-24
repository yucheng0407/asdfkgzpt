$(function () {
    var index = RX.getUrlParam("index");
    var $nav = $("#nav");
    var $font_nav = $("#font_nav");
    $nav.empty();
    if (index) {
        //子菜单
        var subMenu = parent.menuData[index].CHILD_MENU;
        createSubMenu($nav, subMenu);
        createSimpleMenu($font_nav, subMenu);

    }

    //二级菜单图标切换
    $(".second").click(function () {
        if (!$(this).hasClass("up")) {
            $(".second").removeClass("up");
            $(".second").find(".ico-right").html("&#xe645;")
            $(this).addClass("up");
            $(this).find(".ico-right").html("&#xe615;");
        } else {
            $(this).find(".ico-right").html("&#xe645;");
            $(this).removeClass("up");
        }
    });
    $(".link:not('.second')").click(function () {
        $(".up").find(".ico-right").html("&#xe645;");
        $(".second").removeClass("up");
    })

    //处理菜单没有配置url，点击显示的问题
    $("#nav").on("click", "a:not(.second)", function () {
        var _href = $(this).attr("href");
        if (!_href) {
            //未配置页面
            $(this).attr("href", "/error/404")
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
            $li.append('<a href="' + RX.handlePath(t.url) + '" class="link" menuid="' + t.id + '" target="MainIframeR"><i class="iconfont ico-left">' + (t.icon ? t.icon : '') + '</i>' + t.name + '</a>');
            $nav.append($li);
        }
        else { //存在二级菜单
            flag++;
            var first = (i === 0 ? 'block' : 'none');
            $li.append('<a href="javascript:void(0);" class="link second" menuid="' + t.id + '" ><i class="iconfont ico-left">' + (t.icon ? t.icon : '') + '</i>' + t.name + '<i class="iconfont ico-right">&#xe645;</i></a>');
            var $ul = $('<ul class="er"></ul>');
            $.each(t.CHILD_MENU, function (j, k) {
                var $li = $('<li><a menuid="' + k.id + '"  href="' + RX.handlePath(k.url) + '" target="MainIframeR" ' + '><i class="iconfont">' + (k.MENU_ICON ? k.MENU_ICON : '') + '</i>' + k.name + '</a></li>');
                $ul.append($li);

                //去除三方逻辑
                if (k.url && k.url.indexOf("druid") > -1) {
                    $li.find("a").click(function () {
                        if (RX.browser.type === "IE") {
                            clearD(500);
                        } else {
                            $("#MainIframeR").one("load", function () {
                                clearD(0);
                                clearD(500);
                            })
                        }
                    })
                }
            });
            $li.append($ul);
        }
        if (i === 0) {//初始化右侧页面
            if (t.url) {
                firstUrl = t.url;
                $("#MainIframeR").attr("src", RX.handlePath(firstUrl));
                $li.find("a :first").addClass("xz");
            } else {
                firstUrl = t.CHILD_MENU[0].url;
                var $a = $li.find("a:first");
                //取消含有子菜单的选中样式
                $a.addClass("second");
                //下拉图标改为向上
                $a.addClass("up");
                $a.find(".ico-right").html("&#xe615;");
                var $er = $a.siblings(".er");
                $er.show();
                $er.find("a :first").addClass("sen_x");
                $("#MainIframeR").attr("src", RX.handlePath(firstUrl));
            }
        }
    });

}

/**
 * 创建收缩后的图标菜单
 * @param $font_nav
 * @param subMenu
 */
function createSimpleMenu($font_nav, subMenu) {
    $font_nav.empty();
    $.each(subMenu, function (i, t) {
        if (!t.CHILD_MENU || t.CHILD_MENU.length === 0) {
            var icon1 = t.icon ? t.icon : '&#xe63b;';
            var $no_child_li = $('<li class="nav_second">' +
                '<a href="' + t.url + '" target="MainIframeR" menuid="' + t.id + '" title="' + t.name + '" class="nav_second_level">' +
                '<i class="iconfont">' + icon1 + '</i></a></li>');
            $font_nav.append($no_child_li);
        } else {
            var icon2 = t.icon ? t.icon : '&#xe63b;';
            var $li = $('<li class="nav_second"></li>');
            var $ul = $('<ul></ul>');
            $li.append(' <a href="javascript:void(0)"  menuid="' + t.id + '" class="nav_second_level"><i class="iconfont">' + icon2 + '</i></a>');
            $.each(t.CHILD_MENU, function (j, k) {
                $ul.append('<li><a menuid="' + k.id + '" href="' + k.url + '" target="MainIframeR" class="innerMenu">' + k.name + '</a></li>');
            });
            $li.append($ul);
            $font_nav.append($li);
        }
    })
}




