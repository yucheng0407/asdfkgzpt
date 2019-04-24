/**
 * Created by Administrator on 2017/12/27.
 * 添加graphic工具
 * 以"_"开头的为私有变量与函数，否则为公有
 */
define([
        "RXMap/mapGlobal",
        "RXMap/themeMap/DrawColorMap",
        "RXMap/themeMap/MultiLineTextSymbol",
        "RXMap/mapConfig",
        "RXMap/layerControl",
        "RXMap/infoWindow/InfoWindow",
        "esri/layers/GraphicsLayer",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/Font",
        "esri/symbols/TextSymbol",
        "esri/domUtils",
        "esri/Color",
        "esri/graphic",
        "esri/geometry/Point",
        "esri/geometry/Multipoint",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon",
        "esri/geometry/webMercatorUtils",
        "esri/InfoTemplate",
        "dojo/dom-style",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dojo/_base/connect",
        "dojo/_base/array",
        "dojo/dom",
        "dojo/_base/lang"
    ],
    function (MapGlobal, DrawColorMap, MultiLineTextSymbol, MapConfig, layerControl, cusInfoWindow, GraphicsLayer, PictureMarkerSymbol, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Font, TextSymbol, domUtils, Color, Graphic, Point, Multipoint, Polyline, Polygon, webMercatorUtils, InfoTemplate, domStyle, domClass, domConstruct, connect, arrayUtils, dom, lang) {
        var tool = {
            //声明变量
            _map: null,
            _plotIsDraw: false,
            _clearCallBackList: [],
            /**
             * 外部参数(例子)
             */
            _option: {
                layerName: null,//层级名称
                imgUrl: null,//图片地址
                attr: null, //属性
                color: null, //颜色
                // select: {bind: null, imgUrl: null},//被选中时（bind可以绑定监听或buttons方法）
                size: null, //大小
                title: null, //标题(如查看详情单点）
                content: null, //弹出框内容(支持dom单点）
                popup: null, //提示框(单点）
                hasLabel: null, //是否添加注记
                fontColor: "#3c4a5d",//字体颜色
                labelFieldName: null,  //注记字段名
                notChangeShow: false,//是否不受注机控制
                textSymbol: null,//text名字
                fontSize: 1,//字体大小
                buttons: {
                    id: "fun",
                    alias: "自定义"
                },
                imgOffset: [-30, 10],//图标偏移
                offset: [-30, 10],//字体偏移
                //多图元加载时配置(调用addPoints()必填)
                column: [{name: "视频地址", type: "SPMC", isMove: true}, {
                    name: "经度",
                    type: "X", isClick: true, isLabel: false
                }, {name: "维度", type: "Y", isClick: true, isLabel: false}]
            },
            /**
             * 初始化函数
             */
            _constructor: function () {

            },


            /**
             * 新建layer
             * @private
             */
            // addLayer: function (id) {
            //     var graphicLayer = new GraphicsLayer({id: id});
            //     MapGlobal.map.addLayer(graphicLayer);
            //     //提示可以拖拽
            //     graphicLayer.on("mouse-over", function (evt) {
            //         me._overEvent(evt);
            //     });
            //     //恢复鼠标状态
            //     graphicLayer.on("mouse-out", function (evt) {
            //         me._outEvent(evt);
            //     });
            // },

            /**
             * 返回点graphic
             * @private
             */
            _getPoint: function (geometry, option) {
                var me = this;
                var _MarkerSymbol;
                me._map = MapGlobal.map;
                if (option && (option.imgUrl || option.textSymbol)) {
                    if (option.imgUrl) {
                        var height, width;
                        if (option.height && option.width) {
                            height = option.height;
                            width = option.width;
                        } else if (option.size) {
                            height = width = option.size;
                        } else {
                            height = width = 25;
                        }
                        _MarkerSymbol = new PictureMarkerSymbol({
                            "url": option.imgUrl,
                            "height": height,
                            "width": width,
                            "type": "esriPMS"
                        });
                        if (option.imgOffset) {
                            _MarkerSymbol.setOffset(option.imgOffset && option.imgOffset[0] ? option.imgOffset[0] : 0, option.imgOffset && option.imgOffset[1] ? option.imgOffset[1] : 0)
                        }
                        if (option.angle) {
                            _MarkerSymbol.setAngle(option.angle)
                        }
                    } else if (option.textSymbol) {
                        _MarkerSymbol = MapGlobal.BaseTool._createTextSymbol(option.textSymbol)
                    }
                }
                else {
                    if (option) {
                        _MarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, option.size ? option.size : 12,
                            null, new Color(option.color ? option.color : "#ff3107"));
                    }
                    else {
                        _MarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                            null, new Color("#ff3107"));
                    }
                }
                return new Graphic(new Point(geometry), _MarkerSymbol);
            },
            /**
             * 添加注记
             * @param geometry
             * @param multiLineText
             * @param layerName
             * @param fontColor 字体颜色
             * @param fontSize 字体大小
             * @param offset
             * @param offset
             * @private fontStyle
             * @private fontWeight
             * @private holoColor 背景颜色
             */
            _addTextGraphic: function (geometry, multiLineText, layerName, fontColor, fontSize, offset, fontStyle, fontWeight, holoColor) {
                var me = this;
                var point;
                if (typeof geometry === "string") {
                    geometry = JSON.parse(geometry);
                }
                switch (geometry.type) {
                    case 'point': {
                        point = me._getPoint(geometry).geometry;
                        break;
                    }
                    case 'polygon': {
                        point = me._getPolygon(geometry).geometry.getCentroid();
                        break;
                    }
                }
                var fontColor = new Color(!fontColor ? "#3c4a5d" : fontColor);
                var font = new Font(fontSize ? fontSize : "10pt", fontStyle ? Font[fontStyle] : Font.STYLE_NORMAL, Font.VARIANT_NORMAL, fontWeight ? Font[fontWeight] : Font.WEIGHT_BOLD, "微软雅黑");
                var textSymbol = new TextSymbol(multiLineText, font, fontColor);
                textSymbol.setOffset(offset && offset[0] ? offset[0] : 20, offset && offset[1] ? offset[1] : 3).setHaloSize(2).setDecoration("none");
                if (holoColor) {
                    textSymbol.setHaloColor(new Color(holoColor));
                }
                textSymbol.setAlign(TextSymbol.ALIGN_START);
                var textGraphic = new Graphic(point, textSymbol);
                MapGlobal.map.getLayer(!layerName ? "label" : layerName).add(textGraphic);
                return textGraphic;

            },

            /**
             * 返回多边形graphic
             * @private
             */
            _getPolygon: function (geometry, option) {
                var me = this;
                me._map = MapGlobal.map;
                var simpleFillSymbol;
                if (option && option.color) {
                    simpleFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color([30, 155, 30, 0.4]), 2), new Color(option.color ? JSON.parse(JSON.stringify(option.color)) : [30, 155, 30, 0.4]));
                } else {
                    simpleFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([30, 155, 30, 0.4]), 2), new Color([30, 155, 30, 0.4]));
                }
                return new Graphic(new Polygon(geometry), simpleFillSymbol);
            },

            _getPolyline: function (geometry, option) {
                var me = this;
                me._map = MapGlobal.map;
                var simpleLineSymbol;
                if (option && option.color) {
                    simpleLineSymbol = new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color(option.color ? option.color : [30, 155, 30, 0.4]),
                        4
                    );
                } else {
                    simpleLineSymbol = new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 0, 0]),
                        4
                    );
                }
                return new Graphic(new Polyline(geometry), simpleLineSymbol);
            },

            /**
             * 单图元上图
             * @param geometry
             * @param option * @return {*}
             */
            addGeometry: function (geometry, option) {
                var me = this;
                var graphic;
                me._map = MapGlobal.map;
                if (typeof geometry === "string") {
                    geometry = JSON.parse(geometry);
                }
                switch (geometry.type) {
                    case 'point': {
                        graphic = me._getPoint(geometry, option);
                        _addGraphic();
                        if (option && option.center) {
                            MapGlobal.map.centerAt(graphic.geometry);//居中
                        }
                        break;
                    }
                    case 'polyline': {
                        graphic = me._getPolyline(geometry, option);
                        _addGraphic();
                        if (option && option.center) {
                            MapGlobal.map.setExtent(graphic._extent.expand(1.3));//居中
                        }
                        break;
                    }
                    case 'polygon': {
                        graphic = me._getPolygon(geometry, option);
                        _addGraphic();
                        if (option && option.center) {
                            MapGlobal.map.setExtent(graphic._extent.expand(1.3));//居中
                        }
                        break;
                    }
                    default: {
                        if (
                            geometry && typeof geometry === 'object' && geometry.propertyIsEnumerable(length)) {//点数组构成线
                            graphic = me.pointsToPolyLine(geometry, option);
                        }
                        break;
                    }
                }

                function _addGraphic() {
                    //点击弹出框
                    var content = [];
                    var popup = [];
                    var multiLineText = "";
                    if (option && option.column) {
                        for (var a = 0; a < option.column.length; a++) {
                            var _value = (option.attr)[option.column[a].type] ? (option.attr)[option.column[a].type] : "暂无";
                            if (option.column[a].isClick) {
                                content.push("<tr><th>" + option.column[a].name + "</th><td>" + _value + "</td></tr>");
                            }
                            if (option.column[a].isMove) {
                                popup.push("<tr><th>" + option.column[a].name + "</th><td>" + _value + "</td></tr>");
                            }
                            if (option.column[a].isLabel && _value !== '暂无' && _value !== "无巡组") {
                                multiLineText += _value + "\n";
                            }
                        }
                        if (option.hasLabel) {
                            var lableName = option.layerName ? option.layerName + '_label' : "draw_label";//标签图层
                            if (!MapGlobal.map.getLayer(lableName)) {
                                var gLayer = new GraphicsLayer({id: lableName});
                                MapGlobal.map.addLayer(gLayer);
                            }
                            if (option.notChangeShow) MapGlobal.map.getLayer(lableName).notChangeShow = true;
                            graphic.textGraphic = me._addTextGraphic(geometry, multiLineText, lableName, option.fontColor, option.fontSize, option.offset, option.fontStyle, option.fontWeight, option.holoColor);
                        }
                        option.content = content.join("");
                        option.popup = popup.join("");
                    }

                    if (option && option.content) {
                        graphic.content = option.content;
                        if (option.clickInfoWindowWidth) {
                            graphic.clickInfoWindowWidth = option.clickInfoWindowWidth;
                        }
                        if (option.clickInfoWindowHeight) {
                            graphic.clickInfoWindowHeight = option.clickInfoWindowHeight;
                        }
                        // var infoTemplate = new InfoTemplate();
                        // infoTemplate.setTitle(option.title ? option.title : "查看详情");
                        // infoTemplate.setContent(option.content);
                        // graphic.setInfoTemplate(infoTemplate);
                    }
                    if (option) {
                        graphic.attributes = option.attr;
                        graphic.layerName = option.layerName;
                        graphic.popup = option.popup;
                        graphic.buttons = option.buttons;
                        MapGlobal.map.getLayer(option.layerName ? option.layerName : "draw").add(graphic);
                    }
                    else {
                        MapGlobal.map.getLayer("draw").add(graphic);
                    }
                }

                return graphic;
            },


            /**
             * 多图元上图（不聚合）
             * @param points 数组
             * @param option 单一配置,此项不为null,散点上图时不分层
             * @param options 多层配置，option与options至少一个为null，此项不为null,散点分层上图，每个points元素应有一个optionName属性指明采用option数组的哪个
             * @return {*}
             */
            addGeometrys: function (points, option, options) {
                var me = this;
                me._map = MapGlobal.map;
                for (var i = 0; i < points.length; i++) {
                    if (option) {
                        option.attr = points[i];
                        me.addGeometry(points[i].SHOW_GEOMETRY, option);
                    }
                    else if (options) {
                        var op = options[points[i].optionName];
                        if (!op) continue;
                        op.attr = points[i];
                        me.addGeometry(points[i].SHOW_GEOMETRY, op);
                    }
                    else {
                        me.addGeometry(points[i].SHOW_GEOMETRY, option);
                    }
                }
            },
            addGeometryToEdit: function (point, option, options) {
                var me = this;
                me._map = MapGlobal.map;
                if (option) {
                    option.attr = point;
                    return me.addGeometry(point.SHOW_GEOMETRY, option);
                }
                else if (options) {
                    var op = options[point.optionName];
                    if (op) {
                        op.attr = point;
                        return me.addGeometry(point.SHOW_GEOMETRY, op);
                    }else{
                        return null;
                    }
                }
                else {
                    return me.addGeometry(point.SHOW_GEOMETRY, option);
                }
            },

            /**
             * 取消图层监听
             */
            unsetMap: function () {
                var me = this;
                connect.disconnect(this._zoomEnd);
                if (me._clusterLayer) {
                    me._clusterLayer.disconnect();
                }
            },

            /**
             * 多图元上图（聚合）
             * @param points 数组                 *
             * @param levelSegmentation 聚合层级
             * @param option 单一配置,此项不为null,散点上图时不分层
             * @param options 多层配置，option与options至少一个为null，此项不为null,散点分层上图，每个points元素应有一个optionName属性指明采用option数组的哪个
             * @return {*}
             */
            addGeometrysByLevel: function (points, levelSegmentation, attrClassName, option, options) {
                var me = this;
                me._map = MapGlobal.map;
                connect.disconnect(me._zoomEnd);
                me._zoomEnd = connect.connect(me._map, "onZoomEnd", me, function () {
                    if (me._map.getLevel() <= levelSegmentation) {   //显示聚类
                        me._addPointsByLevel(points, levelSegmentation, attrClassName, option, options);
                        me._plotIsDraw = false;
                    }
                    else if (!me._plotIsDraw) {     //显示全部，_plotIsDraw是散点图绘制标志，防止重复绘制
                        me.addGeometrys(points, option, options);
                        me._plotIsDraw = true;
                    }
                });
                me._addPointsByLevel(points, levelSegmentation, attrClassName, option, options);
            },

            /**
             * 根据图层渲染结果(供外部调用的入口)
             * @param points 点的数组
             * @param levelSegmentation 地图层级分割，小于改值聚类，大于等于显示全部
             * @param option 单一配置,此项不为null,散点上图时不分层
             * @param options 多层配置，option与options至少一个为null，此项不为null,散点分层上图，每个points元素应有一个optionName属性指明采用option数组的哪个
             */
            _addPointsByLevel: function (points, levelSegmentation, attrClassName, option, options) {
                var me = this;
                if (me._map.getLayer("clusters")) {
                    me._map.removeLayer(me._map.getLayer("clusters"));
                }
                layerControl.clearAllBusinessLayer();
                if (me._map.getLevel() <= levelSegmentation) {
                    if(option){
                        layerControl.clearLayerById(option.layerName);
                    }else{
                        for(var key in options){
                            if(key){
                                layerControl.clearLayerById(options[key].layerName);
                            }
                        }
                    }
                    //显示聚类
                    var info = {};
                    info.data = arrayUtils.map(points, function (p) {
                        var latlng = new esri.geometry.Point(JSON.parse(p.SHOW_GEOMETRY));
                        if(latlng.type!="point"){
                            latlng = new esri.geometry.Point(JSON.parse(p.SHOW_CENTER));
                        }
                        var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                        var attributes = {
                            "type": p[attrClassName]
                        };
                        return {
                            "x": webMercator.x,
                            "y": webMercator.y,
                            "attributes": attributes
                        };
                    });
                    me._clusterLayer = DrawColorMap.drawClusterMap(me._map, info, levelSegmentation);
                }
                else {
                    me.addGeometrys(points, option, options);
                }
            },
            /**
             * 添加实线线
             * @param points [{X:,Y:,SJ:}...]
             * @param option
             */
            pointsToPolyLine: function (points, option) {
                if (points) {
                    if (!option) option = {};
                    var list = [];
                    var symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color(option.color ? option.color : "#ff3107"), option.size ? option.size : 2);
                    for (var i = 0; i < points.length; i++) {
                        list.push([points[i].X, points[i].Y]);
                    }
                    var singlePathPolyline = new Polyline(list);
                    var graphic = new Graphic(singlePathPolyline, symbol);
                    MapGlobal.map.getLayer(option.layerName ? option.layerName : "draw").add(graphic);
                    if (option.arrow) this.addArrow(points, option);
                return graphic;
                }
            },
            addArrow: function (points, option) {
                for (var i = 0; i < points.length; i++) {
                    var j;
                    if (points.length > 4) {
                        j = 4;
                    } else {
                        j = 1;
                    }
                    if (i !== points.length - 1 && (i % j === 0)) {
                        var x1 = points[i].X;
                        var y1 = points[i].Y;
                        var x2 = points[i + 1].X;
                        var y2 = points[i + 1].Y;
                        var angle = this._CalulateXYAnagle(x1, y1, x2, y2);
                        if (!isNaN(angle)) {
                            var geometry = {
                                type: 'point',
                                spatialReference: {wkid: MapGlobal.map.spatialReference.wkid},
                                x: (x1 + x2) / 2,
                                y: (y1 + y2) / 2
                            };
                            this.addGeometry(geometry, {
                                imgUrl: RX.handlePath("/medias/src/plat/map/mapCss/img/arrow_1.png"),
                                layerName: option.layerName,
                                angle: angle,
                                size: 10
                            })
                        }
                    }
                }
            },
            /**
             *  根据两点坐标 计算角度
             * @returns {*}
             */
            _CalulateXYAnagle : function (startx, starty, endx, endy) {
            var tan = Math.atan(Math.abs((endy - starty) / (endx - startx))) * 180 / Math.PI + 90;
            if (endx >= startx && endy >= starty)//第一象限
            {
                return -tan + 180;
            }
            else if (endx > startx && endy < starty)//第二象限
            {
                return tan;
            }
            else if (endx < startx && endy > starty)//第三象限
            {
                return tan - 180;
            }
            else {
                return -tan;
            }
        },
            /**
             * 高亮点
             * @param X
             * @param Y
             * @param title infoTemplate的标题
             * @param attr infoTemplate的属性
             */
            // highLight: function (X, Y, title, attr) {
            //     var me = this;
            //     // me.addPoint(X, Y, title, attr);
            //     me._FlickerFlag = true;
            //
            //     if (me._map.getLayer("gl_hl") == null) {
            //         var graphicLayerHighLight = new GraphicsLayer({id: "gl_hl"});
            //         me._map.addLayer(graphicLayerHighLight);
            //         MapGlobal.graphicLayerHighLight = graphicLayerHighLight;
            //     }
            //     MapGlobal.graphicLayerHighLight.clear();
            //
            //     var sym = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 35,
            //         new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            //             new Color([255, 0, 0]), 2),
            //         new Color([0, 255, 0, 0]));
            //     var graphic = new Graphic(new Point(X, Y, me._map.spatialReference), sym);
            //
            //     MapGlobal.graphicLayerHighLight.add(graphic);
            //     me._map.centerAndZoom(new esri.geometry.Point({
            //         "x": X,
            //         "y": Y,
            //         "spatialReference": {"wkid": 4326}
            //     }), 16);
            //     for (var i = 1; i <= 6; i++) {
            //         setTimeout(function () {
            //             me._graphicFlicker();
            //         }, i * 500);
            //     }
            // },

            /**
             * 高亮显示graphic并闪烁
             * @param layerName 图层名
             * @param fieldName 字段名
             * @param fieldContent 字段内容
             */
            highLight: function (layerName, fieldName, fieldContent) {
                var me = this;
                var layer = MapGlobal.map.getLayer(layerName);
                var graphics = layer.graphics;
                var g;
                for (var i = 0; i < graphics.length; i++) {
                    if (graphics[i].attributes && fieldContent == graphics[i].attributes[fieldName]) {
                        g = graphics[i];
                    }
                }
                if (g) {
                    MapGlobal.map.centerAndZoom(g.geometry, 15);
                    for (var i = 1; i <= 6; i++) {
                        setTimeout(function () {
                            me._graphicFlicker(g);
                        }, i * 500);
                    }
                }
            },

            /**
             * 闪烁
             * @private
             */
            _graphicFlicker: function (g) {
                var me = this;
                if (g.visible == false) {
                    g.show();
                } else if (g.visible == true) {
                    g.hide();
                }
            },

            getGraphic: function (layerName, fieldName, fieldContent) {
                var me = this;
                var layer = MapGlobal.map.getLayer(layerName);
                var graphics = layer.graphics;
                for (var i = 0; i < graphics.length; i++) {
                    if (graphics[i].attributes) {
                        if (fieldContent == graphics[i].attributes[fieldName]) {
                            return graphics[i];
                        }
                    }
                }
            }, clearCallBack: function (fun) {
                var me = this;
                me._clearCallBackList.push(fun);
            }, bindClearCallBack: function () {
                var me = this;
                for (var i = 0; i < me._clearCallBackList.length; i++) {
                    me._clearCallBackList[i]();
                }

            }
        }

        tool._constructor();
        return tool;
    }
)
