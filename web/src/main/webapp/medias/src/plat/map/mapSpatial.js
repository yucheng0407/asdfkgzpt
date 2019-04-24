/**
 * 空间查询
 */
define(["RXMap/mapGlobal", "RXMap/drawTool", "dojo/text!/asdfkgzpt/map/mapSpatial"], function (MapGlobal, DrawTool, mapSpatialTemplate) {
    var me;
    var graphic;
    var mapDraw = {
        init: function (win) {
            me = this;
            //注册地图工具按钮
            win.$("body").on("click", ".tubiao a", function () {
                var $template = $(this).parents("#draw");//根据ID判断初始模版
                if (graphic) {
                    MapGlobal.map.getLayer("draw").remove(graphic);
                    graphic = null;
                }
                switch ($(this).attr("data-tool")) {
                    case "cancel": {
                        DrawTool.cancel();
                        break;
                    }
                    default : {   //开始绘制
                        DrawTool.draw($(this).attr("data-tool"), function (_graphic) {
                            if (!($template.attr("id"))) {
                                graphic = _graphic;
                                // me._callBack(geometry)
                            }
                        });
                        break;
                    }
                }
            });
        },

        /**
         * 将绘制面板注入到指定div,并确认回调
         * @param id
         * @param curWin 渲染window窗口
         * @param callBack
         */
        inject: function (id, curWin) {
            curWin.$("#" + id).html(mapSpatialTemplate);
            mapDraw.init(curWin);
        },
        /**
         * 得到地图Geometry
         */
        getGeometry: function () {
            if (graphic && this._selectGraphic(graphic) ) {
                return graphic.geometry;
            }
        },
        /**
         * 寻找Graphic
         */
        _selectGraphic: function (graphic) {
            var a = false;
           var layer= MapGlobal.map.getLayer("draw");
            for (var i = 0; i < layer.graphics.length; i++) {
                if (layer.graphics[i] == graphic) {
                    a=true;
                    break;
                }
            }
            return a;
        }
    };
    mapDraw.init(window);//地图window
    return mapDraw;
});