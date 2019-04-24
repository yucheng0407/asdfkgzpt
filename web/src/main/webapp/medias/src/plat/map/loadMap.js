/**
 * Created by Administrator on 2017/7/26.
 * 地图加载文件
 */
var _list = [
    "RXMap/mapGlobal",
    // "RXMap/PGISLayer",
    "RXMap/TDTLayer",
    "RXMap/ASMapLayer",
    "RXMap/baseTool",
    "RXMap/graphicTool",
    "RXMap/extentTool",
    "RXMap/layerControl",
    "RXMap/mapFunc",
    "esri/map",
    "esri/tasks/GeometryService",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/SpatialReference",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    'dojo/_base/lang',
    'dojo/on',
    "dojo/domReady!"];
define(_list, function (MapGlobal,
                        // PGISLayer,
                        TDTLayer,
                        ASMapLayer,
                        BaseTool,
                        GraphicTool,
                        ExtentTool,
                        LayerControl,
                        MapFunc,
                        Map,
                        GeometryService,
                        GraphicsLayer,
                        Point,
                        SpatialReference,
                        ArcGISDynamicMapServiceLayer,
                        ArcGISTiledMapServiceLayer,
                        lang,
                        on) {
    var tool = {
        _map2: null,     //从属地图
        /**
         * 地图初始化
         * @param mapContainerId  地图大容器
         * @param mapDivId   地图容器
         * @param mapConfig  地图配置
         */
        init: function (mapContainerId, mapDivId, mapConfig) {
            var me = this;
            me._mapConfig = mapConfig;
            me._mapContainerId = mapContainerId;
            // loadMap(window);//地图加载完成
            //初始化地图
            me._map = new Map(mapDivId, {logo: false, slider: false, maxZoom: 15});
            //加载地图
            me._loadBaseMap(mapContainerId, me._map);
            //地图初始位置定位
            me._map.centerAndZoom(new Point({
                "x": parseFloat(me._mapConfig.centerX),
                "y": parseFloat(me._mapConfig.centerY),
                "spatialReference": {"wkid": 4326}
            }), 8);
            //将地图放置到公共空间，供其他功能调用
            MapGlobal.map = me._map;
            //将地图基础工具放置到公共空间，供其他功能调用
            MapGlobal.BaseTool = BaseTool;
            MapGlobal.GraphicTool = GraphicTool;
            //公共基础地图方法启用
            BaseTool.init();
            //加载graphic图层
            me._loadGraphicLayer();
            //加载扩展工具
            me._loadextentTools();
            //注册业务功能
            MapFunc.init();
            //初始化鼠标移动时的弹出窗
            LayerControl.createInfoWindowInstance();
            //加载从属地图
            if (me._mapConfig.hasSubMap) {
                me._createSubMap();
            }
            //sidebar关闭
            $("#" + me._mapContainerId + " .close").click(function () {
                $("#" + me._mapContainerId + " #mapSidebar").hide();
            });
            me._map.on("mouse-move", $.proxy(me._showXY, me));
        },

        _showXY: function (evt) {
            var me = this;
            $('#xy').html("经度：" + evt.mapPoint.x.toFixed(4) + "，纬度：" + evt.mapPoint.y.toFixed(4));
        },

        //加载从属地图
        _createSubMap: function () {
            var me = this;
            me._map2 = new Map("map2", {logo: false});

            me._loadSecondBaseMap("secondMap", me._map2);
            $("#secondMap").hide();
            //关闭从属地图事件
            $(".closeSecondMap").click(function () {
                $("#secondMap").hide();
                $("#mainMap").css("width", "100%");
                $("#secondMap").css("width", "0%");
            });
            //两个地图联动
            var flagMap1 = true, flagMap2 = true;
            me._map.on("extent-change", function () {
                if (flagMap1) {
                    var vExtent = me._map.extent;
                    me._map2.setExtent(vExtent);
                    flagMap2 = false;
                } else if (!flagMap1) {
                    flagMap1 = true;
                }
            });
            me._map2.on("extent-change", function () {
                if (flagMap2) {
                    var iExtent = me._map2.extent;
                    me._map.setExtent(iExtent);
                    flagMap1 = false;
                } else if (!flagMap2) {
                    flagMap2 = true;
                }
            });
        },

        //载入从属地图底图
        _loadSecondBaseMap: function (mapDiv, map) {
            var me = this;
            var str = "";
            var map = map;
            //遍历配置文件的底图配置
            for (var i = 0; i < me._mapConfig.baseMap.length; i++) {
                var curMap = me._mapConfig.baseMap[i];
                var layer;
                if (curMap.type == "PGISLayer") {
                    // layer = new PGISLayer(curMap.url, curMap.id);
                    layer = new TDTLayer(curMap.url, curMap.id);
                }
                if (curMap.type == "ASLayer") {
                    // layer = new PGISLayer(curMap.url, curMap.id);
                    layer = new ASMapLayer(curMap.url, curMap.id);
                }
                if (curMap.type == "ArcGISTiledMapServiceLayer") {
                    layer = new ArcGISTiledMapServiceLayer(curMap.url, {id: curMap.id});
                }
                if (curMap.type == "ArcGISDynamicMapServiceLayer") {
                    layer = new ArcGISDynamicMapServiceLayer(curMap.url, {id: curMap.id});
                }
                if (i >= 1) {
                    layer.visible = false;
                    str += "<div class='maptypeCard' style='background: url(" + curMap.imgUrl + ")  no-repeat 0 0 ' layerId='" + curMap.id + "'><span>" + curMap.name + "</span></div>";
                } else {
                    str += "<div class='maptypeCard select' style='background: url(" + curMap.imgUrl + ")  no-repeat 0 0 ' layerId='" + curMap.id + "'><span>" + curMap.name + "</span></div>";
                }
                map.addLayer(layer);

            }
            //如果底图大于一张，显示底图切换控件
            if (me._mapConfig.baseMap.length > 1) {
                $("#" + mapDiv + " .maptype").append(str);

                $("#" + mapDiv + " .maptype .maptypeCard").click(function (evt) {
                    $("#" + mapDiv + " .maptype .maptypeCard").removeClass("select");
                    $(this).addClass("select");
                });
                on($("#" + mapDiv + " .maptype .maptypeCard"), "click", lang.hitch(me, function (evt) {
                    var me = this;
                    me._changeBaseMap("secondMap", me._map2);
                }));

                //鼠标移入，都显示
                $("#" + mapDiv + " .maptype").mouseenter(function () {
                    $("#" + mapDiv + " .maptypeCard").show();
                });

                //鼠标移出，只显示选中的
                $("#" + mapDiv + " .maptype").mouseleave(function () {
                    $("#" + mapDiv + " .maptypeCard").hide();
                    $("#" + mapDiv + " .maptype .select").show();
                });

                //初次，只显示select的那个
                $("#" + mapDiv + " .maptypeCard").hide();
                $("#" + mapDiv + " .maptype .select").show();
            }
        },

        //载入底图
        _loadBaseMap: function (mapDiv, map) {
            var me = this;
            var str = "";
            var map = map;
            //遍历配置文件的底图配置
            for (var i = 0; i < me._mapConfig.baseMap.length; i++) {
                var curMap = me._mapConfig.baseMap[i];
                var layer;
                if (curMap.type == "PGISLayer") {
                    layer = new TDTLayer(curMap.url, curMap.id);
                    // layer = new PGISLayer(curMap.url, curMap.id);
                }
                if (curMap.type == "ASLayer") {
                    // layer = new PGISLayer(curMap.url, curMap.id);
                    layer = new ASMapLayer(curMap.url, curMap.id);
                }
                if (curMap.type == "ArcGISTiledMapServiceLayer") {
                    layer = new ArcGISTiledMapServiceLayer(curMap.url, {id: curMap.id});
                }
                if (curMap.type == "ArcGISDynamicMapServiceLayer") {
                    layer = new ArcGISDynamicMapServiceLayer(curMap.url, {id: curMap.id});
                }
                if (i >= 1) {
                    layer.visible = false;
                    str += "<div class='maptypeCard' style='background: url(" + curMap.imgUrl + ")  no-repeat 0 0 ' layerId='" + curMap.id + "'><span>" + curMap.name + "</span></div>";
                } else {
                    str += "<div class='maptypeCard select' style='background: url(" + curMap.imgUrl + ")  no-repeat 0 0 ' layerId='" + curMap.id + "'><span>" + curMap.name + "</span></div>";
                }
                map.addLayer(layer);

            }
            //如果底图大于一张，显示底图切换控件
            if (me._mapConfig.baseMap.length > 1) {
                $("#" + mapDiv + " .maptype").append(str);

                $("#" + mapDiv + " .maptype .maptypeCard").click(function (evt) {
                    $("#" + mapDiv + " .maptype .maptypeCard").removeClass("select");
                    $(this).addClass("select");
                });

                on($("#" + mapDiv + " .maptype .maptypeCard"), "click", lang.hitch(me, function (evt) {
                    var me = this;
                    me._changeBaseMap(me._mapContainerId, me._map);
                }));

                //鼠标移入，都显示
                $("#" + mapDiv + " .maptype").mouseenter(function () {
                    $("#" + mapDiv + " .maptypeCard").show();
                });

                //鼠标移出，只显示选中的
                $("#" + mapDiv + " .maptype").mouseleave(function () {
                    $("#" + mapDiv + " .maptypeCard").hide();
                    $("#" + mapDiv + " .maptype .select").show();
                });

                //初次，只显示select的那个
                $("#" + mapDiv + " .maptypeCard").hide();
                $("#" + mapDiv + " .maptype .select").show();
            }
        },

        //底图切换
        _changeBaseMap: function (mapDiv, map) {
            var me = this;
            var layerId = $("#" + mapDiv + " .maptype .select").attr("layerId");
            for (var i = 0; i < me._mapConfig.baseMap.length; i++) {
                var curMap = me._mapConfig.baseMap[i];
                if (curMap.id == layerId) {
                    map.getLayer(curMap.id).setVisibility(true);
                } else {
                    map.getLayer(curMap.id).setVisibility(false);
                }
            }
        },

        //载入graphic图层
        _loadGraphicLayer: function () {
            var me = this;
            //遍历配置文件的graphic配置
            for (var i = 0; i < me._mapConfig.graphicLayers.length; i++) {
                LayerControl.addGraphicLayer(me._mapConfig.graphicLayers[i]);
                // var gLayer = new GraphicsLayer({id: me._mapConfig.graphicLayers[i].id});
                // me._map.addLayer(gLayer);
            }
            //遍历配置文件的graphic组配置
            for (x in me._mapConfig.graphicLayerGroups) {
                var layers = me._mapConfig.graphicLayerGroups[x];
                for (var i = 0; i < layers.length; i++) {
                    LayerControl.addGraphicLayer(layers[i]);
                    // var gLayer = new GraphicsLayer({id: layers[i].id});
                    // me._map.addLayer(gLayer);
                }
            }

        },

        //加载扩展工具
        _loadextentTools: function () {
            var me = this;
            if (me._mapConfig.extentTools.length === 0) {
                $("#" + me._mapContainerId + " .extensionTool").css("display", "none");
                return;
            }
            var str = "";
            for (var i = 0; i < me._mapConfig.extentTools.length; i++) {
                str += "<li><a href='#none' data-tool='" + me._mapConfig.extentTools[i].tool + "' class='map-tool-button'><i class='iconfont'>" + me._mapConfig.extentTools[i].icon + "</i></a></li>";
            }
            $("#" + me._mapContainerId + " .extensionTool ul").append(str);
            ExtentTool.init();
        }
    };
    return tool;
});

// /**
//  * 返回地图实例，baseTool基本工具
//  * @param option(加载外部JS)
//  */
// function getMap(option) {
//     var _list = ["RXMap/mapGlobal"];
//     var c = _list.concat(option.list);//外部JsList
//     require(c, function (MapGlobal) {
//         //内部参数实例存放
//         for (var i = 0; i < option.list.length; i++) {
//             var str = option.list[i];
//             str = str.substr(str.lastIndexOf("/") + 1);//从最后末尾'/'截取
//             str = str.replace(str[0], str[0].toUpperCase());//首字母大写
//             MapGlobal[str] = arguments[_list.length + i];
//         }
//         option.callBack(MapGlobal);//回调
//     });
// }




