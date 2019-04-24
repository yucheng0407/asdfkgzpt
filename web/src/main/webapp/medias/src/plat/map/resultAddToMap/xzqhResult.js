define(["RXMap/graphicTool", "RXMap/mapConfig", "RXMap/mapGlobal", "esri/layers/GraphicsLayer"], function (GraphicTool, MapConfig, MapGlobal, GraphicsLayer) {
    var tool = {
        addGeoPolygon: function (geometry) {
            var me = this;
            if (MapGlobal.map.getLayer("xzqh") == null) {
                var graphicLayer = new GraphicsLayer({id: "xzqh"});
                MapGlobal.map.addLayer(graphicLayer,0);
                MapConfig.graphicLayerGroups.xzqhResult.push("xzqh");
            }
            GraphicTool.addGeoPolygon("xzqh", geometry, true);
        },

        /**
         * 隐藏查询结果
         */
        clearPolygon: function () {
            for (var i = 0; i < MapConfig.graphicLayerGroups.xzqhResult.length; i++) {
                MapGlobal.map.getLayer(MapConfig.graphicLayerGroups.xzqhResult[i]).clear();
            }
        },

        /**
         * 寻找Geometry
         */
        getGeometry: function () {
            var geo = null;
            var layer = MapGlobal.map.getLayer("xzqh")
            if (layer&&layer.graphics.length) {
                geo = layer.graphics[0].geometry;
            }
            return geo;
        }
    };
    return tool;
});