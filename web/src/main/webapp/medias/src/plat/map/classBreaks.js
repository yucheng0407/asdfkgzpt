/**
 * 可拖动的圆，用于周边资源查询等
 * Created by Administrator on 2018/3/28 0028.
 */
define([
        "RXMap/mapGlobal",
        "esri/InfoTemplate", "esri/symbols/SimpleFillSymbol","esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/renderers/ClassBreaksRenderer",
        "esri/Color", "dojo/dom-style", "dojo/domReady!"
    ],
    function (MapGlobal,
              InfoTemplate, SimpleFillSymbol,SimpleMarkerSymbol,SimpleLineSymbol,
              ClassBreaksRenderer,
              Color, domStyle) {
        var classBreaks = {
            //声明变量
            _map: null,

            /**
             * 分级图
             * @param layerName 图层名
             * @param breaks 分级参数
             * @param attributeField 分级字段
             */
            addClassBreaks: function (layerName, breaks, attributeField) {
                var me = this;
                me._map = MapGlobal.map;
                // var graphics = MapGlobal.map.getLayer(layerName).graphics;
                var gLayer = MapGlobal.map.getLayer(layerName);

                var defaultSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255,0,0]), 1),
                    new Color([0,255,0,0.25]));

                // Add five breaks to the renderer.
                // If you have ESRI's ArcMap available, this can be a good way to determine break values.
                // You can also copy the RGB values from the color schemes ArcMap applies, or use colors
                // from a site like www.colorbrewer.org
                //
                // alternatively, ArcGIS Server's generate renderer task could be used
                var renderer = new ClassBreaksRenderer(defaultSymbol, attributeField);
                for (var i = breaks.length - 1; i >= 0; i--) {
                    if (0 == i) {
                        renderer.addBreak(breaks[i].value, Infinity, new SimpleFillSymbol().setColor(new Color(breaks[i].color)));
                    } else {
                        renderer.addBreak(breaks[i].value, breaks[i - 1].value, new SimpleFillSymbol().setColor(new Color(breaks[i].color)));
                    }
                }
                gLayer.setRenderer(renderer);
                gLayer.redraw();
            }
        }
        return classBreaks;
    });
