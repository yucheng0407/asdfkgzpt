/**
 * 绘制扩展图形
 */
define(["RXMap/mapGlobal","RXMap/DrawExt"], function(MapGlobal,DrawExt) {
    var militaryDraw = {
        init:function () {
            var me=this;
            var drawExt=new DrawExt(MapGlobal.map);
            //注册地图工具按钮
            $("#militaryDraw a").click(function () {
                switch ($(this).attr("data-tool")) {
                    case "StraightArrow": {
                        drawExt.deactivate();
                        drawExt.activate("StraightArrow");
                        break
                    }
                    case "DiagonalArrow": {
                        drawExt.deactivate();
                        drawExt.activate("DiagonalArrow");
                        break
                    }
                    case "DoubleArrow": {
                        drawExt.deactivate();
                        drawExt.activate("DoubleArrow");
                        break
                    }
                    case "DoveTailStraightArrow": {
                        drawExt.deactivate();
                        drawExt.activate("DoveTailStraightArrow");
                        break;
                    }
                    case "DoveTailDiagonalArrow": {
                        drawExt.deactivate();
                        drawExt.activate("DoveTailDiagonalArrow");
                        break;
                    }
                    case "cancel": {
                        drawExt.deactivate();
                        break;
                    }
                }
            });
        }
    };

    return militaryDraw;
});