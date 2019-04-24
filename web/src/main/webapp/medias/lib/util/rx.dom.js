/**
 * dom相关接口
 * 创建人:Pitcher
 * 创建时间：2018：1/25
 * 最后更新人：Pitcher
 */
(function () {
    /**
     *  获取表单jqery元素
     * @param {string} modelName 模型名称
     * @param {string} property
     * @param {string} type
     */
    RX.getEle = function (modelName, property, type) {
        if (type === "layer") {
            return $("*[layer-model=" + modelName + "][link-property=" + property + "]");
        } else {
            return $("*[data-model=" + modelName + "][data-property=" + property + "]");
        }
    };

    /**
     * 隐藏表单元素
     * @returns {jQuery}
     */
    jQuery.fn.hideEle = function () {
        this.addClass("hideElement");
        return $el;
    };
    /**
     * @param {jQuery} $el
     * 隐藏表单元素与其标志td
     */
    jQuery.fn.hideEleAndTag = function () {
        this.parent().parent().addClass("hideElement");
        this.parent().parent().prev().addClass("hideElement");
        return this;
    };
    /**
     * 改变表单的Tag
     * @param {string} value
     * @returns {jQuery|HTMLElement}
     */
    jQuery.fn.changeTag = function (value) {
        $(this).parent().parent().prev().html(value);
        return $(this);
    };
    /**
     * 在页面上设置select选中的值
     * @param {string} value
     */
    jQuery.fn.setSelectVal = function (value) {
        if (value === 0) {
            value = "0";
        } else if (!value) {
            value = "";
        } else {
            value = value.toString();
        }
        var $this = $(this),
            validVal = "";

        function setValidVal() {
            var hasValid = false,
                $options =  $this.find("option");
            $options.each(function (i, t) {
                var oval = $(t).val();
                if (!oval && oval !== "0" && !value) {
                    validVal = "";
                    hasValid = true;
                } else if (oval === value) {
                    validVal = oval;
                    hasValid = true;
                }
                if(hasValid){
                   return false;
                }
            })
            if(!hasValid && $options.length){
                validVal = $options.eq(0).val() || "";
            }
        }

        setValidVal();
        $(this).val(validVal);

        return validVal;
    };

    /**
     * iframe跳转接口（兼容ie6性能优化）
     * @param {object} obj  iframe的元素
     * @param {string} url
     */
    RX.gotoUrl = function (obj, url) {
        var el = obj[0], iframe = el.contentWindow;
        if (iframe) {
            if (iframe.closeFunc) {
                iframe.closeFunc();
            }
        }
        if (el) {
            if (isIE) {
                el.src = 'about:blank';
                try {
                    iframe.document.write('');
                    iframe.close();
                } catch (e) {
                }
            }
            el.src = RX.handlePath(url);
        }
    };
    /**
     *  展示图片
     * @param {string} src 图片地址
     * @param {string} title 图片标题
     * @param {string} description 图片描述
     */
    RX.prettyPhotoShow = function (src, title, description) {
        if ($("#_rx_pretty_frame").length == 0) {
            $("body").append("<iframe frameborder='0' id='_rx_pretty_frame' name='_rx_pretty_frame' style='position:absolute;top:0;left:0;width:100%;z-index:19999999;'></iframe>");
            $("#_rx_pretty_frame").height($(window).height());
            $(window).resize(function () {
                $("#_rx_pretty_div").height($(window).height());
            });
            var iframeElement = window.document.getElementById("_rx_pretty_frame");
            iframeElement.setAttribute('allowTransparency', 'true');
            var iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
            var baseUrl = "";
            if (RX && RX.ctxPath) {
                baseUrl = RX.ctxPath;
            }
            iframeDoc.open();
            iframeDoc.write('<!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
                ' <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />' +
                '<link rel="stylesheet" type="text/css" href=' + baseUrl + '"/medias/plugin/prettyPhoto/prettyPhoto.css"/>' +
                '<script type="text/javascript" src=' + baseUrl + '"/medias/lib/common/jquery-1.8.3.js"></script>' +
                '<script type="text/javascript" src=' + baseUrl + '"/medias/plugin/prettyPhoto/jquery.prettyPhoto.js"></script>' +
                '<script type="text/javascript" src=' + baseUrl + '"/medias/plugin/prettyPhoto/photoShow.js"></script>' +
                '</head><body style="background-color:transparent"><script>' +
                'window.onload = function(){$("area[rel^=\'prettyPhoto\']").prettyPhoto();' +
                'window.showPhoto = function(src){$.prettyPhoto.open(src);};' +
                'showPhoto(' + JSON.stringify(src) + ');' +
                '} </script></body></html>');
            iframeDoc.close();
        } else {
            $("#_rx_pretty_frame").show();
            window.frames["_rx_pretty_frame"].showPhoto(src);
        }
    };
    /**
     * 清除iframe
     * @param {string} _iframe  iframe元素
     */
    RX.removeIframe = function (_iframe) {
        if (_iframe instanceof jQuery) {
            _iframe = _iframe[0];
        }
        if (!_iframe) {
            return false;
        }
        _iframe.contentWindow.document.write(""), _iframe.contentWindow.close(), _iframe.parentNode.removeChild(_iframe);
    };
    /**
     * 页面滚动到第一个错误位置,且错误位置位于窗口中间
     */
    RX.scrollToError = function () {
        var scrollTo = $(".err").eq(0), container = $(".form_box").eq(0);
        if (container.length && scrollTo.length) {
            container.scrollTop(
                scrollTo.offset().top - container.offset().top + container.scrollTop() - $(window).height() / 2
            );
        }
    };
    /**
     *滚动到底
     */
    RX.scrollToEnd = function () {
        $(".form_box").scrollTop($(window).height() + 20);
    };
    /**
     * 滚动到指定元素
     */
    RX.mScroll = function ($el) {
        if (!$el) {
            $el = $(this);
        }
        $("html,body").stop(true);
        $("html,body").animate({scrollTop: $el.offset().top}, 1000);
    };
    jQuery.fn.mScroll = RX.mScroll;

    /**
     * 是否文本区控件（待定）
     * @param obj {jQuery|HTMLElement}
     */
    //判断是否文本段落字段
    RX.isDoc = function (obj) {
        var $obj = $(obj);
        if ($obj.hasClass("doc_text") || $obj.hasClass("doc_layer") || $obj.hasClass("doc_date") ||
            $obj.hasClass("doc_textarea") || $obj.hasClass("doc_select") || $obj.hasClass("doc_radio") ||
            $obj.hasClass("doc_checkbox") || $obj.hasClass("doc_file")) {
            return true;
        }
        return false;
    }


    //文本框长度验证
    RX.textareachk = function (obj, name, showError) {
        var maxl = 0;
        if ($(obj).attr("readOnly")) {
            return;
        }
        var maxLength = parseInt($(obj).attr("maxLength") || $(obj).prop("maxLength"));
        if (obj != null && maxLength > 0) {
            if (maxl === 0) maxl = maxLength; //总长
            var s = obj.value.length;
            var v = obj.value;
            var len = s;
            if (len >= maxl) {
                obj.value = obj.value.substr(0, maxl);
                if ($("#" + name)[0] != undefined) {
                    $("#" + name)[0].innerHTML = "<strong "+(showError?"style='color:red'":"")+">" + maxl + "/" + maxl + "</strong>";
                }
            }
            else {
                if ($("#" + name)[0] != undefined) {
                    $("#" + name)[0].innerHTML = "<strong>" + len + "/" + maxl + "</strong>";
                }
            }
        }
    }
}).call();