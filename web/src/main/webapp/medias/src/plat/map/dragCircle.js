/**
 * 可拖动的圆，用于周边资源查询等
 * Created by Administrator on 2018/3/28 0028.
 */
define([
        "RXMap/graphicTool",
        "RXMap/mapGlobal",
        "RXMap/baseTool",
        "esri/graphic",
        "esri/layers/GraphicsLayer",
        "esri/Color",
        "esri/geometry/Point",
        "esri/geometry/Circle",
        "esri/geometry/Polyline",
        "esri/geometry/geometryEngine",
        "esri/symbols/Font",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/TextSymbol",
        "dojo/dom",
        "dojo/query",
        "dojo/_base/lang"
    ],
    function (graphicTool, MapGlobal, BaseTool,
              Graphic, GraphicsLayer,
              Color, Point, Circle, Polyline, geometryEngine, Font, MarkerSymbol, PictureMarkerSymbol, LineSymbol, FillSymbol, TextSymbol, dom, query, lang) {
        var dragCircle = {
            declaredClass: "dextra.dijit.DrawDragCircle",
            defaults: {
                map: MapGlobal.map,
                markerSymbol: new MarkerSymbol(MarkerSymbol.STYLE_SQUARE, 20,
                    new LineSymbol(LineSymbol.STYLE_SOLID,
                        new Color("#DC143C"), 2),
                    new Color("#FFA500")),
                dragButtonSymbol: new PictureMarkerSymbol({
                    "url": "/asdfkgzpt/medias/src/plat/map/mapCss/img/drag.png",
                    "height": 16,
                    "width": 16
                }),
                lineSymbol: new LineSymbol(
                    LineSymbol.STYLE_SOLID,
                    new Color("#FFA500"), 2),
                fillSymbol: new FillSymbol(FillSymbol.STYLE_SOLID,
                    new LineSymbol(LineSymbol.STYLE_SOLID,
                        new Color([0, 155, 255, 0.55]), 2), new Color([163, 245, 255, 0.35])),
            },
            circleGraphic: null,
            circle: null,
            labelGraphic: null,
            dragGraphic: null,
            _measureLayer: null,
            _mapEvents: [],
            callBack: null,
            init: function (options) {
                this.defaults.map = MapGlobal.map;
                //declare.safeMixin(this.defaults, options);
                // this._measureLayer = new GraphicsLayer({id: "dragCircle11"});
                this._measureLayer = MapGlobal.map.getLayer("dragCircle");
                this.defaults.map.addLayer(this._measureLayer);
                this._initialMeasureLayer();

            },
            getGeometry: function () {
                return this.circle;
            },

            //初始化测量图层事件
            _initialMeasureLayer: function () {
                //开始拖拽绘制圆
                this._measureLayer.on("mouse-down", lang.hitch(this, function (evt) {
                    var graphic = evt.graphic;
                    if (graphic.symbol.type == "picturemarkersymbol" && graphic.graphicName == 'dragGraphic') {
                        //初始化数据
                        this.dragGraphic = graphic;
                        this.dragGraphic.isMouseDown = true;
                        this._initDragData(this.dragGraphic.dragData)
                        this.defaults.map.disableMapNavigation();
                        graphic.getDojoShape().moveToFront();
                        this.defaults.map.setMapCursor("pointer");
                    }
                }));

                //提示可以拖拽
                this._measureLayer.on("mouse-over", lang.hitch(this, function (evt) {
                    var graphic = evt.graphic;
                    if (graphic.symbol.type == "picturemarkersymbol" && graphic.graphicName == 'dragGraphic') {
                        this.defaults.map.setMapCursor("pointer");
                    }
                }));

                //恢复鼠标状态
                this._measureLayer.on("mouse-out", lang.hitch(this, function (evt) {
                    this.defaults.map.setMapCursor("default");
                }));
            },

            _initialMapEvents: function () {
                this._mapEvents = [];
                //拖拽绘制圆
                this._mapEvents.push(this.defaults.map.on("mouse-drag", lang.hitch(this, function (evt) {
                    if (this.dragGraphic != null && this.dragGraphic.isMouseDown) {
                        var dragGraphic = this.dragGraphic;
                        var dragPoint = evt.mapPoint;
                        if (this.dragData.centerGraphic.geometry.y != dragPoint.y) {
                            dragPoint.setY(this.dragData.centerGraphic.geometry.y);
                        }
                        var radius = BaseTool._calDistance(this.dragData.centerGraphic.geometry, dragPoint);
                        // if (radius <= this.defaults.maxRadius) {
                        //     this._measureLayer.remove(this.circleGraphic);
                        this.circle = this._createCircle(this.dragData.centerGraphic.geometry, radius / Math.cos(this.dragData.centerGraphic.geometry.y * 0.9973 * (Math.PI / 180))
                        );
                        // this.circle = this._createCircle(this.centerPoint, radius);
                        //  this.circleGraphic = new Graphic(this.circle, this.defaults.fillSymbol);
                        //拖标签
                        dragPoint = this._createDragBtnPoint(this.circle, this.dragData.centerGraphic.geometry);//右边
                        var dragPointMin = this._createDragBtnPointMin(this.circle, this.dragData.centerGraphic.geometry);
                        this.dragData.drag.dragGraphic.setGeometry(dragPoint);
                        this.dragData.drag.dragGraphicMin.setGeometry(dragPointMin);
                        this.dragData.labelGraphic.setGeometry(dragPoint).setSymbol(this._createDistanceSymbol(radius));
                        this.dragData.circleGraphic.setGeometry(this.circle);
                        this.dragData.circleGraphic.getDojoShape().moveToBack();
                        dragGraphic.getDojoShape().moveToFront();
                        // }
                    }
                })));

                //触发"mouse-drag-end，通知拖拽结束
                this._mapEvents.push(this.defaults.map.on("mouse-drag-end", lang.hitch(this, function (evt) {
                    if (this.dragGraphic && this.dragGraphic.isMouseDown) {
                        //  this.emit("drag-end", {circle: this.circle});
                        this.dragGraphic.isMouseDown = false;
                        this.defaults.map.enableMapNavigation();
                        this.defaults.map.setMapCursor("default");
                        //处理绘制的圆，满足查询，通过回调返回给使用者
                        // var realCircle = this._createCircle(this.circle.center, this.circle.radius * Math.cos(this.centerPoint.y * 0.9973 * (Math.PI / 180)));
                        //this.callBack(realCircle);
                        this.callBack(this.circle, this.dragData);
                    }
                })));
            },

            //取消上一次注册的map鼠标事件
            _unregistMapEvents: function () {
                for (var i = 0; i < this._mapEvents; i++) {
                    if (this._mapEvents[i]) {
                        this._mapEvents[i].remove();
                    }
                }
                this._mapEvents = [];
            },

            startDrawCircle: function (x, y, option, callBack) {
                if (!this._measureLayer) {
                    this.init();
                }
                this.callBack = callBack;
                var centerPoint = new Point(x, y, this.defaults.map.spatialReference);
                this._unregistMapEvents();
                this.centerPoint = centerPoint;
                //0.9973是修正系数，本来是地理坐标，而画圆应该用平面坐标，之间转换有误差需要乘上这个系数
                this.circle = this._createCircle(centerPoint, (!option.defaultBufferRange ? 500 : option.defaultBufferRange) / Math.cos(this.centerPoint.y * 0.9973 * (Math.PI / 180)));
                var dragPoint = this._createDragBtnPoint(this.circle, centerPoint);
                var dragPointMin = this._createDragBtnPointMin(this.circle, centerPoint);
                this.circleGraphic = new Graphic(this.circle, this.defaults.fillSymbol);
                var radius = BaseTool._calDistance(geometry, dragPoint);
                this.labelGraphic = new Graphic(dragPoint, this._createDistanceSymbol(radius));//距离标签
                var dragGraphic = new Graphic(dragPoint, this.defaults.dragButtonSymbol);
                var dragGraphicMin = new Graphic(dragPointMin, this.defaults.dragButtonSymbol);
                this.drag = {dragGraphic: dragGraphic, dragGraphicMin: dragGraphicMin};
                dragGraphic.graphicName = 'dragGraphic';
                dragGraphicMin.graphicName = 'dragGraphic';
                option.layerName = "dragCircle";
                this._measureLayer.add(this.circleGraphic);
                this._measureLayer.add(dragGraphic);
                this._measureLayer.add(dragGraphicMin);
                this._measureLayer.add(this.labelGraphic);
                this.centerGraphic = graphicTool.addGeometry(geometry, option);
                this.dragData = {
                    drag: this.drag,
                    labelGraphic: this.labelGraphic,
                    circleGraphic: this.circleGraphic,
                    centerGraphic: this.centerGraphic,
                    callBack: this.callBack
                };
                dragGraphic.dragData = this.dragData;
                dragGraphicMin.dragData = this.dragData;
                MapGlobal.map.setExtent(this.circleGraphic._extent.expand(1.3));//居中
                this.callBack(this.circle, this.dragData);
                this._initialMapEvents();
            },

            startGeoDrawCircle: function (geometry, option, callBack) {
                if (!this._measureLayer) {
                    this.init();
                }
                if (typeof geometry === "string") {
                    geometry = JSON.parse(geometry);
                }
                this.callBack = callBack;
                var centerPoint = new Point(geometry);
                this._unregistMapEvents();
                this.centerPoint = centerPoint;
                //0.9973是修正系数，本来是地理坐标，而画圆应该用平面坐标，之间转换有误差需要乘上这个系数
                this.circle = this._createCircle(centerPoint, (!option.defaultBufferRange ? 500 : option.defaultBufferRange) / Math.cos(this.centerPoint.y * 0.9973 * (Math.PI / 180)));
                var dragPoint = this._createDragBtnPoint(this.circle, centerPoint);
                var dragPointMin = this._createDragBtnPointMin(this.circle, centerPoint);
                this.circleGraphic = new Graphic(this.circle, this.defaults.fillSymbol);
                var radius = BaseTool._calDistance(geometry, dragPoint);
                this.labelGraphic = new Graphic(dragPoint, this._createDistanceSymbol(radius));//距离标签
                var dragGraphic = new Graphic(dragPoint, this.defaults.dragButtonSymbol);
                var dragGraphicMin = new Graphic(dragPointMin, this.defaults.dragButtonSymbol);
                this.drag = {dragGraphic: dragGraphic, dragGraphicMin: dragGraphicMin};
                dragGraphic.graphicName = 'dragGraphic';
                dragGraphicMin.graphicName = 'dragGraphic';
                option.layerName = "dragCircle";
                this._measureLayer.add(this.circleGraphic);
                this._measureLayer.add(dragGraphic);
                this._measureLayer.add(dragGraphicMin);
                this._measureLayer.add(this.labelGraphic);
                this.centerGraphic = graphicTool.addGeometry(geometry, option);
                this.dragData = {
                    drag: this.drag,
                    labelGraphic: this.labelGraphic,
                    circleGraphic: this.circleGraphic,
                    centerGraphic: this.centerGraphic,
                    callBack: this.callBack
                };
                dragGraphic.dragData = this.dragData;
                dragGraphicMin.dragData = this.dragData;
                MapGlobal.map.setExtent(this.circleGraphic._extent.expand(1.3));//居中
                this.callBack(this.circle, this.dragData);
                this._initialMapEvents();
            },

            removeCircle: function (circle) {
                if (circle) {
                    this._measureLayer.remove(circle.drag.dragGraphic);
                    this._measureLayer.remove(circle.drag.dragGraphicMin);
                    this._measureLayer.remove(circle.circleGraphic);
                    this._measureLayer.remove(circle.labelGraphic);
                    this._measureLayer.remove(circle.centerGraphic);
                }
            },
            _initDragData: function (dragData) {
                this.dragData = dragData;
                this.callBack = dragData.callBack;
            },
            _createCircle: function (point, distance) {
                return new Circle(point, {
                    "radius": distance
                    // "geodesic":true
                });
            },

            _createDragBtnPoint: function (geometry, center) {
                var extent = geometry.getExtent();
                var xmax = extent.xmax;
                return new Point([xmax, center.y], center.spatialReference)
            },
            _createDragBtnPointMin: function (geometry, center) {
                var extent = geometry.getExtent();
                var xmin = extent.xmin;
                return new Point([xmin, center.y], center.spatialReference)
            },
            _createDistanceSymbol: function (distance) {
                distance = distance.toFixed(0) + "m";
                var fontColor = new Color("#696969");
                var holoColor = new Color("#fff");
                var font = new Font("10pt", Font.STYLE_ITALIC, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Courier");
                var textSymbol = new TextSymbol(distance, font, fontColor);
                textSymbol.setOffset(10, 20).setHaloColor(holoColor).setHaloSize(2).setDecoration("none");
                textSymbol.setAlign(TextSymbol.ALIGN_MIDDLE);
                return textSymbol;
            }
        };
        return dragCircle;
    });
