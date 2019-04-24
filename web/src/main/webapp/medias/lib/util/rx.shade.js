/**
 * 未完成（暂时不要使用）
 */
(function ($) {
    //默认设置
    //可设置图片，文字，iconfont
    var defaultOptions = {
        loadingTips: "",
        img: "/medias/plugin/perfectLoad/loading.gif",
        icon: "",
        isAutoClose: false,
        opacity: 5
    };
    //生成遮罩
    $.fn.shade = function (opts) {
        for (var i = 0, maxLength = this.length; i < maxLength; i++) {
            var $el = $(this[i]);
            if (!$el.data("_loadEl")) {
                opts = $.extend(true, defaultOptions, opts);
                var eheight = $el.outerHeight();//元素带px的高宽度
                var ewidth = $el.outerWidth();
                var top = $el.offset().top; // 元素在文档中位置 滚动条不影响
                var left = $el.offset().left;
                var $div = $("<div></div>");
                $div.css({
                    zIndex: 9998,
                    position: "absolute",
                    height: eheight,
                    width: ewidth,
                    top: top,
                    left: left,
                    filter: "alpha(opacity=50)",
                    opacity: 5,
                    dispaly: "block"
                });
                var $contentDiv = $("<div class='contentDiv' style='position:absolute;'></div>");
                if (opts.img) {
                    $contentDiv.append("<img height='30px;' width='30px;' align='absmiddle' src='" + RX.handlePath(opts.img) + "'/>");
                }
                if (opts.loadingTips) {
                    $contentDiv.append("<span>" + opts.loadingTips + "</span>");
                }
                $div.append($contentDiv);
                $("body").append($div);
                var $content = $div.find(".contentDiv");
                var cHeight = $content.outerHeight();
                var cWidth = $content.outerWidth();
                $content.css({
                    top: (eheight - cHeight) / 2,
                    left: (ewidth - cWidth) / 2
                });
                //存储load位置
                $el.data("_loadEl", $div);
            }
        }
    };
    //手动取消遮罩
    $.fn.cancelShade = function () {
        $.each(this, function (i, v) {
            var $rel = $(v).data("_loadEl");
            $rel && $rel.remove() && $(v).data("_loadEl", "");
        });
    };

    //removeAll

})(jQuery);
