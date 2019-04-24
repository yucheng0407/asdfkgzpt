/**
 * 标签点击样式
 */
function clickTagStyle() {
    //搜索框表单
    $('body').on("click", '.query_form tr td input', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.query_form tr td input').removeClass('click');
    });
    $('body').on("click", '.query_form tr td .select2-selection--single', function () {
        $(this).addClass('click');
    });

    $('html').mousedown(function () {
        $('.query_form tr td .select2-selection--single').removeClass('click');
    });
    $('body').on("click", '.query_form tr td textarea:not(.disabled)', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.query_form tr td textarea').removeClass('click');
    });
    $('body').on("click", '.query_form tr td select', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.query_form tr td select').removeClass('click');
    });
    $('body').on("click", '.search', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.search').removeClass('click');
    });

    //普通表单
    $('body').on("click", '.form tr td input', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.form tr td input').removeClass('click');
    });
    $('body').on("click", '.form tr td textarea:not(.disabled)', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.form tr td textarea').removeClass('click');
    });
    $('body').on("click", '.form tr td select', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.form tr td select').removeClass('click');
    });
    $('body').on("click", '.select2-selection--single', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.form tr td .select2-selection--single').removeClass('click');
    });

    //动态列表
    $('body').on("click", '.list tr td input', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.list tr td input').removeClass('click');
    });
    $('body').on("click", '.list tr td textarea:not(.disabled)', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.list tr td textarea').removeClass('click');
    });
    $('body').on("click", '.list tr td select', function () {
        $(this).addClass('click');
    });
    $('body').on("click", '.list tr td .select2-selection--single', function () {
        $(this).addClass('click');
    });
    $('html').mousedown(function () {
        $('.list tr td select').removeClass('click');
    });
}

/**
 * 禁用标签
 * @param el input元素
 */
function disableLabelByInput(el) {
    var $el = $(el);
    if ($el.prop("disabled")) {
        $(el).parent().addClass("disabled");
    } else {
        $(el).parent().removeClass("disabled");
    }
}

/**
 * 初始化单/复选Label效果
 */
function setupLabel() {
    //Step.1    初始化已有label
    if ($('.label_check input').length) {
        $('.label_check').each(function () {
            $(this).removeClass('c_on');
            disableLabelByInput($(this).find("input"));
        });
        $('.label_check input:checked').each(function () {
            $(this).parent('label').addClass('c_on');
        });
    };
    if ($('.label_radio input').length) {
        $('.label_radio').each(function () {
            $(this).removeClass('r_on');
            disableLabelByInput($(this).find("input"));
        });
        $('.label_radio input:checked').each(function () {
            $(this).parent('label').addClass('r_on');
        });
    }

    //Step.2    body增加has-js样式标记
    $('body').addClass('has-js');
    //Step.3    body绑定label点击事件
    $('body').off('click', '.label_check, .label_radio').on('click', '.label_check, .label_radio', function (e) {
        $(this).parent().find('.label_check').each(function () {
            var $checkLabel = $(this);
            if ($checkLabel.find("input").prop("checked")) {
                $checkLabel.addClass('c_on');
            } else {
                $checkLabel.removeClass('c_on');
            }
        })
        $(this).parent().find('.label_radio').each(function () {
            var $radioLabel = $(this);
            if ($radioLabel.find("input").prop("checked")) {
                $radioLabel.addClass('r_on');
            } else {
                $radioLabel.removeClass('r_on');
            }
        })
        e.stopPropagation();
    })
}

/**
 * 手动更新checkLabel样式
 * @param el input元素
 */
function setCheckLabelByInput(el) {
    $(el).parent().parent().find("label").each(function () {
        var $checkLabel = $(this);
        if ($checkLabel.find("input").prop("checked")) {
            $checkLabel.addClass('c_on');
        } else {
            $checkLabel.removeClass('c_on');
        }
    })
}

/**
 * 手动更新radioLabel样式
 * @param el input元素
 */
function setRadioLabelByInput(el) {
    $(el).parent().parent().find("label").each(function () {
        var $radioLabel = $(this);
        if ($radioLabel.find("input").prop("checked")) {
            $radioLabel.addClass('r_on');
        } else {
            $radioLabel.removeClass('r_on');
        }
    })
}

//自动执行：UI相关
$(function () {
    clickTagStyle();
    setupLabel();
    // regEsc();
});

/**
 * Esc退出事件
 */
function regEsc() {
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && (e.keyCode == 13 || e.which == 13)) { // enter 键
            $("#close").trigger();
        }
    };
}
