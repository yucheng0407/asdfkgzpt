/***********************************************
 * 表单规则验证方法汇总
 * 最后更新时间：2016-02-16
 * 最后更新人：zhan
 ***********************************************/

/**
 * 提示tip统一接口
 *
 * @param num
 * @return
 * @author
 */
jQuery.fn.makePoshTip = function (msg, notClose) {
    var obj = $(this);
    obj.poshytip('destroy');
    obj.poshytip({
        className: 'tip-yellow',
        content: msg,
        showOn: 'null',
        alignTo: 'target',
        alignX: 'left'
    });
    obj.poshytip("show");
    if (!notClose) {
        obj.bind("click", function () {
            obj.poshytip("destroy");
        })
    }
};

//销毁poshtip
jQuery.fn.destroyPoshTip = function () {
    $(this).poshytip('destroy');
};
/***************************新版验证样式****************************/

//展示错误验证图标和验证提醒  输入框，下拉框，textarea,日期,弹窗框
jQuery.fn.makeTip = function (obj, msg) {
    var $this = $(this);
    if (RX.isDoc(this)) {
        $(this).attr("title", msg);
    } else {
        makeValidTip($this, msg);
        if ($this.parent().find(".err").length == 0) {
            var $ibut = null;
            if ($this.parent().children(".auto_ico_box").length == 0) {
                $ibut = $("<div class='auto_ico_box'></div>");
                $this.parent().append($ibut);
            } else {
                $ibut = $(this).parent().children(".auto_ico_box");
            }
            if ($ibut.hasClass("ico_1")) {
                $ibut.removeClass("ico_1").addClass("ico_2");
                $ibut.parent().removeClass("ele_1").addClass("ele_2");
                $ibut.append('<span class="err" ><i class="iconfont">&#xe603;</i></span>');
            } else if ($ibut.hasClass("ico_2")) {
                $ibut.removeClass("ico_2").addClass("ico_3");
                $ibut.parent().removeClass("ele_2").addClass("ele_3");
                $ibut.append('<span class="err" ><i class="iconfont">&#xe603;</i></span>');
            } else {
                $ibut.addClass("ico_1");
                $ibut.parent().addClass("ele_1");
                if ($this[0].tagName === "SELECT") {
                    //select标签验证时添加
                    $ibut.parent().css("padding-right", "28px");
                }
                $ibut.append('<span class="err" ><i class="iconfont">&#xe603;</i></span>');
            }
        }
    }
};

//展示验证图标  图片
jQuery.fn.makeImgTip = function (obj, msg) {
    var $this = $(this);
    makeValidTip($this, msg);
};
//移除错误验证
jQuery.fn.removeErrorTip = function () {
    $("p#vtip").remove();
    var $el = $(this);
    if (RX.isDoc(this)) {
        $el.removeClass("TextBoxErr");
        $el.attr("title", "");
    } else {
        $el.parent().removeAttr("tip");
        $el.parent().unbind("click.Validate.ModelEvent");
        if ($el.parent().children(".auto_ico_box").length > 0) {
            var $ibut = $el.parent().children(".auto_ico_box");
            if ($ibut.find(".err").length > 0) {
                if ($ibut.hasClass("ico_1")) {
                    $ibut.removeClass("ico_1");
                    $ibut.find(".err").remove();
                    $ibut.parent().removeClass("ele_1");
                    if ($el[0].tagName === "SELECT") {
                        //select标签验证时添加
                        $ibut.parent().css("padding-right", "0px");
                    }
                } else if ($ibut.hasClass("ico_2")) {
                    $ibut.removeClass("ico_2").addClass("ico_1");
                    $ibut.find(".err").remove();
                    $ibut.parent().removeClass("ele_2").addClass("ele_1");
                } else {
                    $ibut.removeClass("ico_3").addClass("ico_2");
                    $ibut.find(".err").remove();
                    $ibut.parent().removeClass("ele_3").addClass("ele_2");
                }
            }
        }
    }
};

function makeValidTip($this, msg) {
    var xOffset = -20; // x distance from mouse
    var yOffset = 20; // y distance from mouse
    $this.parent().attr("tip", msg);
    $this.parent().hover(
        //鼠标滑过
        function (e) {
            if ($(this).attr('tip') != undefined) {
                var y = $this.parent().find(".err").offset().top;
                var x = $this.parent().find(".err").offset().left;
                var top = y + yOffset + 10;
                var left = x - 40;
                // console.log("outwidth="+$this.outerWidth());
                // console.log("top:" + top + "left:" + left);
                $('body').append('<p id="vtip"><img id="vtipArrow" src="' + RX.ctxPath + '/medias/style/plat/image/common/vtip_arrow.png"/>' + $(this).attr('tip') + '</p>');
                $('p#vtip').css("top", top + "px").css("left", left + "px");
                $('p#vtip').bgiframe();
            }
        },
        function () {
            //鼠标移除时就清楚提示
            $("p#vtip").remove();
        }
    );
}

/*************************** ****************************************/
jQuery.fn.makeBeforeTip = function (obj, msg) {
    if (!$(this).prev().hasClass(".invalidtip")) {
        $(this).before("<span class='invalidtip' style='line-height:20px;color:red;width:100%;padding-lerf:5px;'>" + msg + "</span>");
    }
};


jQuery.fn.makeAfterTip = function (obj, msg) {
    if (!$(this).next().hasClass(".invalidtip")) {
        $(this).after("<span class='invalidtip' style='line-height:20px;color:red;width:100%;padding-lerf:5px;'>" + msg + "</span>");
    }
};


jQuery.fn.removeErrorTip2 = function () {
    $(this).removeClass("TextBoxErr");
};

jQuery.fn.removeTip = function (obj, msg) {
    $(this).parent().find(".invalidtip").remove();
};


/**
 * 非空验证
 *
 * @param num
 * @return
 * @author
 */
function notNull(o, noTip) {
    var obj = $(o);
    var type = obj.prop("tagName");
    if (type == "DIV") {
        //div对象需要取下级的checkbox或radio
        if (obj.find('input[type=checkbox]:checked').length > 0
            || obj.find('input[type=radio]:checked').length > 0) {
            $(o).removeClass("TextBoxErr");
            return true;
        } else {
            if (!noTip) {
                $(o).addClass("TextBoxErr");
                $(o).makeTip($(o), "不可为空");
            }
            return false;
        }
    } else {
        //其他控件 输入框
        if (o == null || $.trim($(o).val()) == "") {
            if (!noTip) {
                $(o).addClass("TextBoxErr");
                $(o).makeTip($(o), "不可为空");
            }
            return false;
        } else {
            $(o).removeClass("TextBoxErr");
            return true;
        }
    }
}


/**
 * 模型行数据非空验证
 *
 * @return
 * @author
 */
function modelNotNull(o, noTip) {
    var obj = $(o);
    var type = obj.prop("tagName");

    if (type == "DIV") {
        //div对象需要取下级的checkbox或radio
        if (obj.find('input[type=checkbox]:checked').length > 0
            || obj.find('input[type=radio]:checked').length > 0) {
            $(o).removeClass("TextBoxErr");
            //$(o).attr("title", "");
            return true;
        } else {
            if (!noTip) {
                $(o).addClass("TextBoxErr");
                $(o).makeTip($(o), "行数据不可为空");
            }
            return false;
        }
    } else {
        //其他控件
        if (o == null || $(o).val() == "") {
            if (!noTip) {
                $(o).addClass("TextBoxErr");
                $(o).makeTip($(o), "行数据不可为空");
            }
            return false;
        } else {
            $(o).removeClass("TextBoxErr");
            //$(o).attr("title", "");
            return true;
        }
    }
}

/**
 * 是否为编码（字母、数字、下划线）
 */
function isCode(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^[0-9A-Za-z_]*$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "只能为字母、数字、下划线");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 判断整数num是否等于0
 *
 * @param num
 * @return
 * @author jiqinlin
 */
function isIntEqZero(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    if (num == 0) {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    } else {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "数字不可为0");
        }
        //alert("整数不等于0");
        //$(o).val('');
        //$(o).focus();
        return false;
    }
}

/**
 * 判断整数num是否大于0
 *
 * @param num
 * @return
 * @author jiqinlin
 */
function isIntGtZero(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    if (num > 0) {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    } else {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "数字需大于0");
        }
        //$(o).attr("title", "数字需大于0");
        ////alert("整数需大于0");
        //$(o).val('');
        //$(o).focus();
        return false;
    }
}

/**
 * 判断整数num是否大于0
 *
 * @param num
 * @return
 * @author jiqinlin
 */
function minCheck(o, min) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    if (num.length >= min) {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    } else {
        $(o).addClass("TextBoxErr");
        $(o).makeTip($(o), "最少输入" + min + "位");
        //$(o).attr("title", "数字需大于0");
        ////alert("整数需大于0");
        //$(o).val('');
        //$(o).focus();
        return false;
    }
}

/**
 * 判断整数num是否大于或等于0
 *
 * @param num
 * @return
 * @author jiqinlin
 */
function isIntGteZero(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    if (num > 0) {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    } else {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入大于0的整数");
        }
        //$(o).attr("title", "整数需不小于0");
        ////alert("整数需不小于0");
        //$(o).val('');
        //$(o).focus();
        return false;
    }
}

/**
 * 是否是大于等于0的数
 * @param o
 * @return {boolean}
 */
function isIntGteZero2(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    if (num >= 0) {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    } else {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入大于0的整数");
        }
        //$(o).attr("title", "整数需不小于0");
        ////alert("整数需不小于0");
        //$(o).val('');
        //$(o).focus();
        return false;
    }
}

/**
 * 是否是大于0的整数
 * @param o
 * @return {boolean}
 */
function isIntGte(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    var recStr = /^[1-9]*[1-9][0-9]*$/;
    if (recStr.test(num)) {
        $(o).removeClass("TextBoxErr");
        return true;
    } else {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入大于0的整数");
        }
        return false;
    }
}

/**deprecated
 * 判断浮点数num是否大于0
 *
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
function isFloatGtZero(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    if (num > 0) {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    } else {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入大于0的数");
        }
        return false;
    }
}

/**deprecated
 * 判断数num是否大于等于0
 *
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
function isNumberGtEqZero(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    if (num >= 0) {
        $(o).removeClass("TextBoxErr");
        return true;
    } else {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "输入非负数");
        }
        return false;
    }
}

/**deprecated
 * 判断浮点数num是否大于或等于0
 *
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
//function isFloatGteZero(num) {
//    return num >= 0;
//}
/**
 * 匹配Email地址
 */
function isEmail(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确格式的Email地址");
        }
        //$(o).attr("title", "请输出正确格式的Email地址");
        ////alert("请输出正确格式的Email地址");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {

        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }

}

/**
 * 判断数值类型，包括整数和浮点数
 */
function isNumber(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result1 = str.match(/^[-\+]?\d+$/);
    var result2 = str.match(/^[-\+]?\d+(\.\d+)?$/);
    if (result1 == null && result2 == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入数字");
        }
        //$(o).attr("title", "请输出数字");
        ////alert("只能为整数和浮点数");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 判断数值类型，包括整数和浮点数(输入时)
 */
function isNumberInput(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result1 = str.match(/^[-\+]?\d+$/);
    var result2 = str.match(/^[-\+]?\d+(\.\d+)?$/);
    var result3 = str.match(/^[-\+]?\d+(\.)?$/);
    if (result1 == null && result2 == null && result3 == null || str < 0 || str == 0) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入大于0的数字");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

function isNumberNotTip(value) {
    if (value == null) return false;
    var str = value;
    var result1 = str.match(/^[-\+]?\d+$/);
    var result2 = str.match(/^[-\+]?\d+(\.\d+)?$/);
    if (result1 == null && result2 == null) {
        return false;
    } else {
        return true;
    }
}

/**
 * 验证小数不超两位
 * @param value
 * @returns {boolean}
 */
function isDoubleJd(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result1 = str.match(/^(\d+(\.\d{1,2})?)$/);
    if (result1 == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "小数位不超过两位");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 只能输入数字[0-9]
 */
function isDigits(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^\d+$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入数字0-9");
        }
        //$(o).attr("title", "请输入数字0-9");
        ////alert("只能输入数字0-9");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配phone
 */
function isPhone(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的固定电话号码");
        }
        //$(o).attr("title", "请输出正确的固定电话号码");
        ////alert("请输出正确的固定电话号码");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配固定电话
 */
function isPhone2(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^(\d{3,4}\-\d{7,8})$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的固定电话号码");
        }
        //$(o).attr("title", "请输出正确的固定电话号码");
        ////alert("请输出正确的固定电话号码");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配mobile
 */
function isMobile(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?((1\d{10}))$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的移动电话号码");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 匹配警务通号码
 */
function isJwthm(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?((1\d{10}))$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的警务通号码");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 联系电话(手机/电话皆可)验证
 */
function isTel(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result1 = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?((1\d{10}))$/);
    var result2 = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/);
    if (result1 == null && result2 == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的电话号码");
        }
        //$(o).attr("title", "请输出正确的电话号码");
        ////alert("请输出正确的电话号码");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配qq
 */
function isQq(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^[1-9]\d{4,12}$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的QQ号");
        }
        //$(o).attr("title", "请输出正确的QQ号");
        ////alert("请输出正确的QQ号");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }

}

/**
 * 匹配english
 */
function isEnglish(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^[A-Za-z]+$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入英文字母");
        }
        //$(o).attr("title", "请输入英文字母");
        ////alert("请输入英文");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配integer
 */
function isInteger(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^[-\+]?\d+$/);
    if (result == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入整数");
        }
        //$(o).attr("title", "请输入整数");
        //alert("请输出整数");
        $(o).val('');
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配double或float
 */
function isDouble(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^[-\+]?\d+(\.\d+)?$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入小数");
        }
        //$(o).attr("title", "请输入小数");
        //alert("请输出浮点数");
        $(o).val('');
        $(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配邮政编码
 */
function isZipCode(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^[0-9]{6}$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的邮政编码");
        }
        //$(o).attr("title", "请输出正确的邮政编码");
        //alert("请输出正确的邮政编码");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配URL
 */
function isUrl(o, noTip) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(re);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的URL地址");
        }
        //$(o).attr("title", "请输出正确的URL地址");
        ////alert("请输出正确的URL地址");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 匹配资源URL
 */
function isResourceUrl(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (!(str.startWith("http://")) && !(str.startWith("https://")) && !(str.startWith("ftp://")) && !(str.startWith("/"))) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的URL地址:以“http”等协议开始的网址或是以“/”打头的绝对路径");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**deprecated
 * 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
 */
//function isPwd(str) {
//    if (str == null || str == "") return false;
//    var result = str.match(/^[a-zA-Z]\\w{6,12}$/);
//    if (result == null)return false;
//    return true;
//}
/**
 * 判断是否为合法字符(a-zA-Z0-9-_)
 */
function isRightfulString(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^[A-Za-z0-9_-]+$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入合法的字符（英文或者数字）");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 判断是否为数字和字母的组合
 */
function isNumAndEnglish(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^[0-9]+[-]*[A-Za-z-]+[-]*[A-Za-z0-9-]*|[A-Za-z]+[-]*[0-9]+[-]*[A-Za-z0-9-]*$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入数字和字母的组合");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

function isIdCardNos(g, dom) {
    g = $.trim(g);
    if (g == null || g.length == 0) {
        return "";
    }
    g = g.toUpperCase();
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(g))) {
        return "输入的身份证号长度不对，或者号码不符合规定\n15位号码应全为数字，18位号码末位可以为数字或X";
    }
    var h, o;
    h = g.length;
    if (h == 15) {
        o = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var n = g.match(o);
        var c = new Date("19" + n[2] + "/" + n[3] + "/" + n[4]);
        var b;
        b = (c.getYear() == Number(n[2])) && ((c.getMonth() + 1) == Number(n[3])) && (c.getDate() == Number(n[4]));
        if (!b) {
            return "输入的身份证号里出生日期不正确";
        } else {
            var k = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var l = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
            var j = 0, f;
            g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
            for (f = 0; f < 17; f++) {
                j += g.substr(f, 1) * k[f];
            }
            g += l[j % 11];
        }
    } else {
        if (h == 18) {
            o = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var n = g.match(o);
            var c = new Date(n[2] + "/" + n[3] + "/" + n[4]);
            var b;
            b = (c.getFullYear() == Number(n[2])) && ((c.getMonth() + 1) == Number(n[3])) && (c.getDate() == Number(n[4]));
            if (!b) {
                return "输入的身份证号里出生日期不正确";
            } else {
                var a;
                var k = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var l = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
                var j = 0, f;
                for (f = 0; f < 17; f++) {
                    j += g.substr(f, 1) * k[f];
                }
                a = l[j % 11];
                if (a != g.substr(17, 1)) {
                    dom.value = $(dom).val().substr(0, 17) + a;
                    return "18位身份证的校验码不正确！最后一位应该为：" + a;
                }
            }
        }
    }
    var e = g.substr(6, 4) + "-" + Number(g.substr(10, 2)) + "-" + Number(g.substr(12, 2));
    var d = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (d[parseInt(g.substr(0, 2))] == null) {
        return "错误的地区码：" + g.substr(0, 2);
    }
    if (Number(g.substr(6, 2)) < 19) {
        return "身份证号码格式有误";
    }
    dom.value = g;
    return "";
}

/**
 * 匹配身份证号码
 */
function isIdCardNo(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var num = $(o).val();
    var msg = isIdCardNos(num, o);
    if (msg != "") {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), msg);
        }
        return false;
    }
    $(o).removeClass("TextBoxErr");
    return true;
}

/**
 * 匹配汉字
 */
function isChinese(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^[\u4e00-\u9fa5]+$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入中文汉字");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 匹配中文(包括汉字和字符)
 */
function isChineseChar(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^[\u0391-\uFFE5]+$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入中文（汉字和字符）");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**
 * 字符验证，只能包含中文、英文、数字、下划线等字符。
 */
function stringCheck(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    //if (str == null || str == "") return false;
    var result = str.match(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入中文、英文、数字、下划线等字符");
        }
        //$(o).attr("title", "请输入中文、英文、数字、下划线等字符");
        //alert("请输出中文、英文、数字、下划线等字符");
        //$(o).val('');
        //$(o).focus();
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        //$(o).attr("title", "");
        return true;
    }
}

/**deprecated
 * 过滤中英文特殊字符，除英文"-_"字符外
 */
//function stringFilter(str) {
//    var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
//    var rs = "";
//    for (var i = 0; i < str.length; i++) {
//        rs = rs + str.substr(i, 1).replace(pattern, '');
//    }
//    return rs;
//}
/**
 * 判断是否包含中英文特殊字符，除英文"-_"字符外
 */
//function isContainsSpecialChar(str) {
//    if (str == null || str == "") return false;
//    var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
//    return reg.test(str);
//}
/**deprecated
 * 验证身份证
 */
//function isCardNo(card) {
//    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
//    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//    if (reg.test(card) === false) {
//        alert("身份证输入不合法");
//        return false;
//    }
//}
/**
 * 验证是否是时间^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$
 * /^(\d+)(-|\/)(\d{1,2})(-|\/)(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
 */
function isDateTime(str) {
    if (str == null) {
        return true;
    }
    var result1 = str.toString().match(/^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/);//判断年月日
    var result2 = str.toString().match(/^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);//判断年月日 时分秒
    var result3 = str.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);//判断时分秒
    var result4 = str.toString().match(/^(\d{4})$/);//判断年
    var result5 = str.toString().match(/^(\d{4})(-|\/)(\d{1,2})$/);//判断年月
    if (result1 == null && result2 == null && result3 == null && result4 == null && result5 == null) {
        //$(o).addClass("TextBoxErr");
        //$(o).makeTip($(o), "请输入正确的时间");
        //alert("请输入正确的时间");
        return false;
    } else {
        //$(o).removeClass("TextBoxErr");
        return true;
    }
}

function isDate(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^(\d{4})(-|\/)(\d{1,2})2(\d{1,2})$/);//判断年月日
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入年月日");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

function isIp(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^((2[01]\d|22[0-3]|1\d{2}|[1-9]\d|[1-9])\.)((25[0-5]|2[0-4]\d|1?\d{1,2})\.){2}((25[0-5]|2[0-4]\d|1?\d{1,2}))$/);
    if (result == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正确的IP地址");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }

}

//判断输入值是否在0-100之间
function inOneAndHundred(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var result = parseFloat($(o).val());
    if (result > 100 || result < 1) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入1-100间的整数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 验证用户名 （4至15位英文和数字或不超过6个汉字）
 * @param o
 * @returns {boolean}
 */
function checkLoginName(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^(([a-zA-Z0-9]{4,15})|([\u4e00-\u9fa5]{1,6}))$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入4至15位英文和数字或不超过6个汉字");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 验证用户密码（以英文开头的6至16位英文字母和数字的组合）
 * @param o
 * @returns {boolean}
 */
function checkLoginPwd(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    // var result = str.match(/^[a-zA-Z][a-zA-Z0-9]{5,15}$/);
    var result = str.match(/[a-zA-Z0-9]{1,15}$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            // $(o).makeTip($(o), "请输入以英文开头的6至16位英文字母和数字的组合");
            $(o).makeTip($(o), "请输入16位以内的字母或数字");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

function checkNumlength(o, iLength, fLength) {
    var $o = $(o);
    if (o == null || $o.val() == "")
        return true;
    if (isNumber(o)) {
        var value = $o.val();
        var i = value.split(".")[0];
        var f = value.split(".")[1];
        if (i.length > iLength || (f && f.length > fLength)) {
            $o.removeTip();
            $o.addClass("TextBoxErr");
            $o.makeTip($o, "数字长度有误");
            return false;
        } else {
            $o.removeClass("TextBoxErr");
            return true;
        }
    } else {
        return false;
    }
}

/**
 * 验证由26个大写英文字母组成的字符串
 */
function isUpperCase(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^[A-Z]+$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "只能为大写字母");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 验证财务大写金额
 */
function isFinancialNum(o, noTip) {
    if (o == null || $(o).val() == "") {
        return true;
    }
    var str = $(o).val();
    var result = str.match(/^[零壹贰叁肆伍陆柒捌玖一二三四五六七八九拾佰仟万亿整元角分]*$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "只能为财务数字大写");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 匹配车牌号
 */
function isCarNo(o, noTip) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    var result = str.match(/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/);
    if (result == null) {
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入车牌号");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

function checkTableFile(o, noTip, config, instance) {
    var result = true, fileConfig = config.fileConfig || {};
    if (config.type === "file" && config.fileConfig.type === "table") {
        var $t = $(o).next(), num = $t.find(".no_data").length ? 0 : $t.find("tbody tr").length;
        if (fileConfig.minNum && num < fileConfig.minNum) {
            result = false;
            if ($t.find(".err").length == 0) {
                $t.addClass("TextBoxErr");
                $t.find('p').append('<span class="err" ><i class="iconfont">&#xe603;</i></span>');
                $t.makeImgTip($t, "至少上传" + fileConfig.minNum + "个附件");
            }
        }
        if (!result) {
            $t.click(function () {
                $t.removeClass("TextBoxErr");
                $t.removeErrorTip();
            })
        }
    }

    return result;
}

/**
 * 手风琴样式验证
 * @param $el 当前的jquery元素
 * @param noTip
 * @param config 当前元素的配置
 * @param instance
 */
function checkListFile($el, noTip, config, instance) {
    var result = true;
    //数目精确到分类的每个类别时验证
    $el.next().find(".attachment_header").each(function (i, head) {
        var minNum = parseInt($(head).attr("min"));
        if (minNum > 0) {
            //当前的数目
            var num = $(head).children("h1").eq(0).children("em").attr("size");
            if (parseInt(num) < minNum) {
                if (!$(head).find("span").hasClass('err')) {
                    $(head).makeImgTip($el, "附件数目不够");
                    $(head).find("p").append('<span class="err" ><i class="iconfont">&#xe603;</i></span>');
                    result = false;
                }
            }
        }
    });
    //附件总数的验证
    var totalMin = parseInt($el.next().find('p').attr("totalMin"));
    if (totalMin) {
        var fileSize = $el.next().find(".attachment_operation").length;
        if (fileSize < totalMin) {
            if ($el.next().find(".page_title").find(".err").length < 1) {
                $el.next().find("p").after('<span class="err" style="margin:8px 0 0 5px"><i class="iconfont">&#xe603;</i></span>');
                $el.next().find("p").next().makeImgTip($el, "附件数目不够");
            }
            result = false;
        }

    }
    return result;
}

/**
 * 验证行内附件（满足最小数目）
 * @param o 当前的jquery元素
 * @param noTip
 * @param config
 * @param instance
 * @returns {boolean}
 */
function checkInnerFile(o, noTip, config, instance) {
    var result = true, fileConfig = config.fileConfig || {};
    if (config.type === "file" && config.fileConfig.type === "inner") {
        var $t = $(o).next(), num = $t.find(".form_file a").length;
        if (fileConfig.minNum && num < fileConfig.minNum) {
            result = false;
            $t.addClass("TextBoxErr");
            $t.makeTip($t, "至少上传" + fileConfig.minNum + "个附件");
        }
        if (!result) {
            $t.click(function () {
                $t.removeClass("TextBoxErr");
                $t.removeErrorTip();
            })
        }
    }
    return result;
}

/**
 * 验证头像附件（不为空）
 * @param o
 * @param noTip
 * @param config
 * @param instance
 * @returns {boolean}
 */
function checkImageFile(o, noTip, config, instance) {
    var result = true;
    if (config.type === "file" && config.fileConfig.type === "image") {
        var keypath = $(o).attr("rx-path"),
            $t = $(o).next();
        if (!instance.get(keypath)) {
            result = false;
            $t.addClass("TextBoxErr");
            $t.makeTip($t, "请上传图片");
            $t.parent().find("img").attr("src", RX.handlePath("/medias/style/plat/image/common/photo_error.jpg"));
        }
        if (!result) {
            $t.click(function () {
                $t.removeClass("TextBoxErr");
                $t.removeErrorTip();
            })
        }
    }
    return result;
}

/**
 * 数字控件值验证
 * 主要验证是否满足大小（根据后期验证修改）
 */
function numberCheck(o, noTip, config, instance) {
    var flg = true;
    var numberConfig = config.numberConfig;
    var $t = $(o), num = parseFloat($t.val());
    if ("" !== num) {
        //暂时不处理
        // if (typeof max === "string") {
        //     //todo 注意子对象，注意字符串
        //     max = instance.get(max);
        // }
        // if (typeof min === "string") {
        //     min = instance.get(min);
        // }
        var tip;
        var max = numberConfig.max, min = numberConfig.min;
        if (null !== max && num > max) {
            flg = false;
            $t.addClass("TextBoxErr");
            if (null !== min) {
                tip = "请输入" + min + "至" + max + "之间的";
            } else {
                tip = "请输入小于" + max + "的";
            }
        }
        if (flg && null !== min && num < min) {
            flg = false;
            $t.addClass("TextBoxErr");
            if (null !== max) {
                tip = "请输入" + min + "至" + max + "之间的";
            } else {
                tip = "请输入大于" + min + "的";
            }
        }
        !flg && $t.makeTip($t, tip + (numberConfig.type === "integer" ? "整数" : "数"));
    }
    return flg;
}

/**
 * 输入时验证数字的小数精度
 *
 * @returns {string}
 */
function checkNumJd(o, noTip, config, instance) {
    var $t = $(o);
    //获取值
    var num = $t.val();
    var sArr = num.split(".");
    if (sArr.length === 2) {
        if (sArr[1].length > config.numberConfig.decimal) {
            //修正值，提示已修正
            return sArr[0] + "." + sArr[1].substring(0, config.numberConfig.decimal)
        } else {
            return true;
        }
    } else if (sArr.length > 2) {
        //数据格式不合法
        $t.addClass("TextBoxErr");
        $t.makeTip($t, "请输入合法小数");
        return false;
    } else {
        return true;
    }
}

/**
 * 输入完成时验证数字的小数精度
 *
 * @returns {string}
 */
function checkNumJdKeyup(o, noTip, config, instance) {
    var $t = $(o);
    //获取值
    var num = $t.val();
    var sArr = num.split(".");
    if (sArr.length === 2) {
        if (sArr[1].length > config.numberConfig.decimal) {
            //修正值，提示已修正
            return sArr[0] + "." + sArr[1].substring(0, config.numberConfig.decimal)
        } else {
            return true;
        }
    } else if (sArr.length > 2) {
        //数据格式不合法
        $t.addClass("TextBoxErr");
        $t.makeTip($t, "请输入合法小数");
        return false;
    } else {
        return true;
    }
}

/********************************************数字验证，分为keyup和checkValue***************************************************/
/**
 * 输入时验证负整数
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkNegativeIntKeyUp(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result = str.match(/^-\d*$/);
    if (result == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入负整数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入完成时验证负整数
 * todo 0要不要考虑？？
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkNegativeInt(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result = str.match(/^-\d+$/);
    if (result == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入负整数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入时验证正整数
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkPlusIntKeyUp(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result = str.match(/^\d+$/);
    if (result == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正整数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

// /**
//  * 输入完成时验证正整数
//  * @param o
//  * @param noTip
//  * @param config
//  * @param instance
//  */
// function checkPlusInt (o, noTip, config, instance) {
//     if (o == null || $(o).val() == "")
//         return true;
//     var str = $(o).val();
//     if (str == null || str == "") return false;
//     var result = str.match(/^[+]?\d+$/);
//     if (result == null) {
//         $(o).removeTip();
//         if (!noTip) {
//             $(o).addClass("TextBoxErr");
//             $(o).makeTip($(o), "请输入正整数");
//         }
//         return false;
//     } else {
//         $(o).removeClass("TextBoxErr");
//         return true;
//     }
// }

/**
 * 输入时验证整数
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkIntKeyUp(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result = str.match(/^[-\+]?\d*$/);
    if (result == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入整数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入完成时验证整数
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkInt(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result = str.match(/^[-\+]?\d+$/);
    if (result == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入负整数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入时验证负数
 * todo
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkNegativeFloatKeyUp(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result1 = str.match(/^-\d*$/);
    var result2 = str.match(/^-\d+.?\d*$/);
    if (result1 == null && result2 == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入负整数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入完成时验证负整数
 * todo 0要不要考虑？？
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkNegativeFloat(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result1 = str.match(/^-\d+$/);
    var result2 = str.match(/^-\d+.?\d+$/);
    if (result1 == null && result2 == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入负数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入时验证正数
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkPlusFloatKeyUp(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result1 = str.match(/^\d*$/);
    var result2 = str.match(/^\d+.?\d*$/);
    if (result1 == null && result2 == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入正数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入完成时验证正数
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkPlusFloat(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result1 = str.match(/^\d+$/);
    var result2 = str.match(/^\d+.?\d+$/);
    if (result1 == null && result2 == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入负数");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入时验证number
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkFloatKeyUp(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result1 = str.match(/^[-/+]?\d*$/);
    var result2 = str.match(/^[-/+]?\d+.?\d*$/);
    if (result1 == null && result2 == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入数字");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}

/**
 * 输入完成时验证number
 * @param o
 * @param noTip
 * @param config
 * @param instance
 */
function checkFloat(o, noTip, config, instance) {
    if (o == null || $(o).val() == "")
        return true;
    var str = $(o).val();
    if (str == null || str == "") return false;
    var result1 = str.match(/^[+/-]?\d+$/);
    var result2 = str.match(/^[+/-]?\d+.?\d+$/);
    if (result1 == null && result2 == null) {
        $(o).removeTip();
        if (!noTip) {
            $(o).addClass("TextBoxErr");
            $(o).makeTip($(o), "请输入数字");
        }
        return false;
    } else {
        $(o).removeClass("TextBoxErr");
        return true;
    }
}








