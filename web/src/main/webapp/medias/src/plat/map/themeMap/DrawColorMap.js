
define([
    "RXMap/themeMap/MultiClusterLayer",
    "esri/layers/FeatureLayer",
    "esri/renderers/ClassBreaksRenderer",
    "esri/renderers/HeatmapRenderer",
    "esri/Color",
    "esri/tasks/FeatureSet",
    'esri/geometry/Point',
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    'esri/geometry/Polygon',
    "esri/InfoTemplate"
], function (MultiClusterLayer,FeatureLayer,ClassBreaksRenderer,HeatmapRenderer,Color,FeatureSet,Point, SimpleFillSymbol,SimpleMarkerSymbol,PictureMarkerSymbol, SimpleLineSymbol,Polygon,InfoTemplate) {
    var DrawColorMap = {

        /**
         * 绘制分层设色图
         * @param map  绘制在这个地图上
         * @param graphics  graphic集合
         * @param fieldName  渲染字段
         * @param renderObj  渲染方式
         */
        draw:function(map,graphics,fieldName,renderObj){
            var me=this;
            var symbol= new SimpleFillSymbol();
            symbol.setColor(new Color([150, 150, 150, 0.5]));
            var renderer = new ClassBreaksRenderer(symbol, fieldName);
            for(var i=0;i<renderObj.length;i++){
                var color=new Color(renderObj[i].color);
                color.a=0.5;
                renderer.addBreak(renderObj[i].min,renderObj[i].max,new SimpleFillSymbol().setColor(color));
            }


            for(var i=0;i<graphics.length;i++){
                var infoStr="";
                for (var key in graphics[i].attributes){
                    infoStr +=key+":${"+key+"}<br/>";
                }
                var infoTemplate = new InfoTemplate("详情",infoStr);
                graphics[i].setInfoTemplate(infoTemplate);
                map.getLayer("draw").add( graphics[i]);
            }
            map.getLayer("draw").setRenderer(renderer);
            map.getLayer("draw").redraw();
        },

        /**
         * 绘制热力图
         * @param map 用来绘制的地图
         * @param graphics 绘制的要素
         * @param fieldName 参考字段
         * @param minValue  最小值（色带下端对应的值）
         * @param maxValue  最大值（色带上端对应的值）
         */
        drawHeatMap:function (map,graphics,fieldName,minValue,maxValue) {
            var me=this;
            var heatmapFeatureLayerOptions = {
                mode: FeatureLayer.MODE_SNAPSHOT,
                outFields: ["*"],
                opacity:0.8
            };
            var layerDefinition = {
                "geometryType": "esriGeometryPoint",
                "fields": [{
                    "name": "ID",
                    "type": "esriFieldTypeInteger",
                    "alias": "ID"
                }]
            };
            var featureCollection = {
                layerDefinition: layerDefinition,
                featureSet: null
            };
            var featureLayer = new FeatureLayer(featureCollection, heatmapFeatureLayerOptions);
            featureLayer.graphics=graphics;

            // var heatmapRenderer = new HeatmapRenderer();
            var heatmapRenderer = new HeatmapRenderer({
                field: fieldName,
                // colors: ["rgba(0, 0, 255, 0)","rgb(0, 0, 255)","rgb(255, 0, 255)", "rgb(255, 0, 0)"],
                blurRadius: 9,
                maxPixelIntensity: maxValue,
                minPixelIntensity: minValue
            });
            featureLayer.setRenderer(heatmapRenderer);
            map.addLayer(featureLayer);
        },

        /**
         * 绘制聚合图
         * @param result
         */
        drawClusterMap:function(map,info,levelSegmentation){
            var me=this;
            // cluster layer that uses OpenLayers style clustering
            var clusterLayer = new MultiClusterLayer({
                "data": info.data,
                "distance": 20000000,
                "id":"clusters",
                "labelColor": "#000",
                "labelOffset": -5,
                "resolution": map.extent.getWidth() / map.width,
                "showSingles":false,
                "levelSegmentation":levelSegmentation
            });
            var defaultSym = new SimpleMarkerSymbol().setSize(4);
            var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");

            var symbol1 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 20,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255,200,0]), 1),
                new Color([255,200,200,0.7]));
            var symbol2 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 30,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255,125,3]), 1),
                new Color([255,125,3,0.7]));
            var symbol3 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 35,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255,23,58]), 1),
                new Color([255,23,58,0.5]));
            var symbol4 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,40,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([204,0,184]), 1),
                new Color([204,0,184,0.5]));
            var symbol5 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,45,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([0,0,255]), 1),
                new Color([0,0,255,0.5]));

            renderer.addBreak(0, 1, symbol1);
            renderer.addBreak(1, 50, symbol2);
            renderer.addBreak(50, 150, symbol3);
            renderer.addBreak(150, 500, symbol4);
            renderer.addBreak(500, Infinity, symbol5);

            clusterLayer.setRenderer(renderer);
            map.addLayer(clusterLayer);
            return clusterLayer;
        }
    };
    return DrawColorMap;
});