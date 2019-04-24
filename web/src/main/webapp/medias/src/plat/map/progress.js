/**
 * Created by yucheng on 2018/3/24.
 * 进度条插件，主要实现拖拽和点击回调和根据百分比渲染
 */
var Progress = {
    _click: true,
    add: function (id, color, hide, callBack) {
        var color = color ? color : "#ff1170";
        var html = '<div id="bar">' +
            '<div id="progress" style="background-color:' + color + '" class="progress"><div id="progress-value" class="progress-value">0%</div><div  id="progress-cur" style="border-color:' + color + '"  class="progress-cur"></div><div class="progress-stop-value">停留</div></div></div>';
        if (hide) $("#" + id).hide();
        $("#" + id).html(html);
        $("#bar,.progress-value,.progress-cur,.progress-marker").on("click", Progress._onclickProgress);
        $("#progress").on("click mouseover mouseout", ".progress-marker", function (e) {
            switch (e.type) {
                case 'click': {
                    var per = Number($(this).attr("per"));
                    Progress.load(per);
                    Progress.callBack({percent: per, type: "click"});
                    return false;
                }
                case 'mouseover': {
                    $(this).find(".progress-marker-value").show();
                    break;
                }
                case 'mouseout': {
                    $(this).find(".progress-marker-value").hide();
                    break;
                }

            }
        });
        Progress._dragProgress("progress-cur");
        Progress.callBack = callBack;
    },

    /**
     * 单击百分比加载进度条
     * @param e
     * @returns {*}
     */
    _onclickProgress: function (e) {
        if (this.id !== "bar" || !Progress._click) return false;
        var per = (e.offsetX / this.offsetWidth);//百分比
        Progress.load(per);
        Progress.callBack({percent: per, type: "click"});
    },

    /**
     * 百分比加载进度条
     * @param e
     * @returns {*}
     */
    load: function (per) {
        per = (per * 100).toFixed(1);
        if (per >= 100) {
            per = 100;
        } else if (per <= 0) {
            per = 0;
        }
        document.getElementById("progress").style.width = per + "%";
        document.getElementById("progress-value").innerText = per + "%";
    },

    /**
     * 百分比画标签
     * @param e
     * @returns {*}
     */
    drawMarker: function (per, title) {
        per = (per * 100).toFixed(1);
        if (per >= 100) {
            per = 100;
        } else if (per <= 0) {
            per = 0;
        }
        var left = per / 100 * document.getElementById("bar").offsetWidth;
        $("#progress").append('<div per="' + per / 100 + '" style="left:' + (-2 + left)
            + 'px"   class="progress-marker">' +
            '<div class="progress-marker-value">' + title + '</div></div>');
    },
    /**
     * 停留标签
     * @param show
     * @returns {*}
     */
    showStopMarker: function (show) {
        if (show) {
            $(".progress-stop-value").show()
        }
        else {
            $(".progress-stop-value").hide()
        }
    },
    clearMarker: function () {
        $("#progress .progress-marker").remove();
    },

    /**
     * 拖动进度条
     * @param id
     * @returns {*}
     */
    _dragProgress: function (id) {
        var oDiv = document.getElementById(id);
        var disX = 0;
        var disY = 0;
        var per = 0;//返回百分值
//封装一个函数用于获取鼠标坐标
        function getPos(ev) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return {x: ev.clientX + scrollLeft, y: ev.clientY + scrollTop};
        }

        oDiv.onmousedown = function (ev) {
            var move = false;
            var oEvent = ev || event;
            var pos = getPos(oEvent);  //这样就可以获取鼠标坐标，比如pos.x表示鼠标横坐标
            disX = pos.x;
            disY = pos.y;
            Progress._click = false;//防止误点
            var curProgress = document.getElementById("progress").offsetWidth;//当前进度
            document.onmousemove = function (ev)
                /*由于要防止鼠标滑动太快跑出div，这里应该用document.
                 因为触发onmousemove时要重新获取鼠标的坐标，不能使用父函数上的pos.x和pos.y，所以必须写var oEvent=ev||event;var pos=getPos(oEvent);*/ {
                move = true;
                var oEvent = ev || event;
                var curPos = getPos(oEvent);
                //防止div跑出可视框
                var l = curPos.x - disX + curProgress;//计算鼠标距离
                var t = curPos.y - disY;
                if (l < 0) {
                    l = 0;
                }
                else if (l > document.getElementById("bar").offsetWidth) {//最大长度
                    l = document.getElementById("bar").offsetWidth;
                }
                per = l / document.getElementById("bar").offsetWidth;
                Progress.load(per);
                Progress.callBack({percent: per, type: "move"});
            };

            document.onmouseup = function () {
                document.onmousemove = null; //将move清除
                document.onmouseup = null;
                Progress._click = true;//
                if (move) Progress.callBack({percent: per, type: "up"});
            };
            return false;  //火狐的bug，要阻止默认事件
        }
    }
};


