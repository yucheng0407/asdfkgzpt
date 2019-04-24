(function () {
    /**
     * 回车事件
     * @param {function} fn 回调函数
     * @param el dom元素，或者为jQuery选择器
     */
    RX.regEnter = function (fn, el) {
        var $el;
        if (el) {
            $el = $(el);
        } else {
            $el = $(document);
        }
        $el.keydown(function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && (e.keyCode == 13 || e.which == 13)) { // enter 键
                fn();
                return false;
            }
        });
    };
    /**
     * 阻止冒泡事件
     * @param {event} e 事件
     */
    RX.stopBubble = function (e) {
        // 如果传入了事件对象，那么就是非ie浏览器
        if (e && e.stopPropagation) {
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        } else {
            //否则我们使用ie的方法来取消事件冒泡
            window.event.cancelBubble = true;
        }
    }

}).call(this);
