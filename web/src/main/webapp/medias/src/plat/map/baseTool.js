/**
 * Created by yc on 2017/7/12.
 * 基本地图工具栏
 * 以"_"开头的为私有变量与函数，否则为公有
 */
define(["RXMap/mapGlobal",
        "RXMap/graphicTool",
        "RXMap/drawTool",
        "RXMap/mapConfig",
        "RXMap/html2canvas",
        "esri/layers/GraphicsLayer",
        "esri/graphic",
        "esri/Color",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/Font",
        "esri/symbols/TextSymbol",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/geometry/geometryEngine",
        "esri/geometry/Extent"],
    function (MapGlobal, GraphicTool, DrawTool, MapConfig, Html2canvas, GraphicsLayer, Graphic, Color, SimpleMarkerSymbol, SimpleLineSymbol, Font, TextSymbol, Point, Polyline, geometryEngine, Extent) {
        var tool = {
            _stopPoints: [],//测距的每个节点数组
            _stopDistances: [],//测距用每一段距离数组
            _mapClickFlag: null,//地图打点计算距离事件
            _textGraphicMove: null,//每个测量点的距离文本
            _mapMoveFlag: null,//鼠标移动更新距离事件
            _drawComFlag: null,//测距完成事件

            init: function () {
                var me = this;
                me._bindEvent();
            },

            /**
             * 绑定地图工具条
             * @private
             */
            _bindEvent: function () {
                var me = this;
                //注册地图工具按钮
                $(".map-tool-button").click(function () {
                    switch ($(this).attr("data-tool")) {
                        case "expand": {      //放大
                            me._expand();
                            break
                        }
                        case "reduce": {    //缩小
                            me._reduce();
                            break
                        }
                        case "allExtent": {       //全图
                            me._all();
                            break
                        }
                        case "clearMap": {     //清除graphic
                            me._clear();
                            GraphicTool.bindClearCallBack();
                            break;
                        }
                        case "measureDistance": {    //测距
                            me.callCancel();
                            me._startMeasureDistance();
                            break;
                        }
                        case "mapGlobalasureArea": {     //测面积
                            me._startMeasureArea();
                            break;
                        }
                        case "screenShot": {      //截图
                            me._screenShoot();
                            break
                        }
                        case "mapLabel": {      //截图
                            me._changeLabelShow();
                            break
                        }
                    }
                });
            },

            /**
             * 放大
             * @private
             */
            _expand: function () {
                var map = MapGlobal.map;
                var disX = (map.extent.xmax - map.extent.xmin) / 4;
                var disY = (map.extent.ymax - map.extent.ymin) / 4;
                var xmin = map.extent.xmin + disX;
                var xmax = map.extent.xmax - disX;
                var ymin = map.extent.ymin + disY;
                var ymax = map.extent.ymax - disY;
                var extent = new Extent(xmin, ymin, xmax, ymax, map.extent.spatialReference);
                map.setExtent(extent);
            },

            /**
             * 缩小
             * @private
             */
            _reduce: function () {
                var map = MapGlobal.map;
                var disX = (map.extent.xmax - map.extent.xmin) / 2;
                var disY = (map.extent.ymax - map.extent.ymin) / 2;
                var xmin = map.extent.xmin - disX;
                var xmax = map.extent.xmax + disX;
                var ymin = map.extent.ymin - disY;
                var ymax = map.extent.ymax + disY;
                var extent = new Extent(xmin, ymin, xmax, ymax, map.extent.spatialReference);
                map.setExtent(extent);
            },

            /**
             * 全图
             * @private
             */
            _all: function () {
                var map = MapGlobal.map;
                map.setExtent(new Extent(MapConfig.MBR[0], MapConfig.MBR[1], MapConfig.MBR[2], MapConfig.MBR[3], map.spatialReference));
            },

            /**
             * 绘图图层清除
             * @private
             */
            _clear: function () {
                //移除当前的统计图
                $(".myInfoWindow").remove();
                $(".buttonInfoWindow .close").click()
                GraphicTool.unsetMap();
                DrawTool.clearEdit();
                //移除graphic
                for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                    if (MapGlobal.map.graphicsLayerIds[i].indexOf('notClear') > -1) continue;
                    MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).clear();
                    MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).redraw();
                }
            },

            /**
             * 开启地图测距
             * @private
             */
            _startMeasureDistance: function () {
                var me = this;
                DrawTool.draw("POLYLINE");//开启绘图工具add
                me._addMoveGraphic();//开启地图移动和点击事件
            },

            /**
             * 开启测量面积
             * @private
             */
            _startMeasureArea: function () {
                var me = this;
                DrawTool.draw("POLYGON", function (e) {//编辑成功回调
                    me._addAreaGraphic(e.geometry);
                });
            },

            /**
             * 添加测量textGraphic
             * @param polygon
             */
            _addAreaGraphic: function (geometry) {
                var me = this;
                var area = me._calArea(geometry);
                if (area > 1000000) {
                    area = (area / 1000000).toFixed(2) + "平方千米";
                } else {
                    area = area.toFixed(2) + "平方米";
                }
                var center = geometry.getCentroid();
                var textSymbol = me._createTextSymbol(area);
                textSymbol.setOffset(30, 10);
                var textGraphic = new Graphic(center, textSymbol);
                MapGlobal.map.getLayer("draw").add(textGraphic);
            },

            /**
             * 开启地图移动和点击事件(动态测距)
             * @private
             */
            _addMoveGraphic: function () {
                var me = this;
                var _map = MapGlobal.map;
                me._completeMapMove();
                me._stopPoints = [];//点
                me._stopDistances = [];//距离
                var stopPoints = me._stopPoints;
                var stopDistances = me._stopDistances;
                //地图打点计算距离
                me._mapClickFlag = _map.on("click", function (evt) {
                    var distance = 0;
                    var stopPoint = evt.mapPoint;
                    if (stopPoints.length > 0) {
                        var startPoint = stopPoints[stopPoints.length - 1];
                        distance = me._calDistance(startPoint, stopPoint);
                        if (me._stopDistances.length > 0) {//累加距离
                            distance += me._stopDistances[me._stopDistances.length - 1];
                        }
                        stopDistances.push(distance);
                    }
                    stopPoints.push(stopPoint);//存放最后点
                    var stopGraphic = new Graphic(stopPoint, new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, null, null, new Color([0, 0, 0, 1])));
                    var textGraphic = me._getStopPointGraphic(stopPoint, distance);
                    //存地图最上层
                    _map.graphics.add(stopGraphic);
                    _map.graphics.add(textGraphic);
                    if (!me._mapMoveFlag || !me._mapMoveFlag.advice) {
                        me._mapMoveFlag = _map.on("mouse-move", function (evt) {
                            if (me._textGraphicMove) {
                                _map.graphics.remove(me._textGraphicMove);
                            }
                            var point = evt.mapPoint;
                            var startPoint = stopPoints[stopPoints.length - 1];
                            var distance = me._calDistance(startPoint, point);
                            if (me._stopDistances.length !== 0) {
                                distance += me._stopDistances[me._stopDistances.length - 1];
                            }
                            me._textGraphicMove = me._getStopPointGraphic(point, distance);
                            _map.graphics.add(me._textGraphicMove);
                        });
                    }
                });
            },

            /**
             * 计算面积
             * @private
             */
            _calArea: function (polygon) {
                var spatialReference = MapGlobal.map.spatialReference;
                if (spatialReference.wkid == "4326" || spatialReference.isWebMercator()) {
                    return geometryEngine.geodesicArea(polygon, "square-meters")
                } else {
                    return geometryEngine.planarArea(polygon, "square-meters")
                }
            },

            /**
             * 两点距离（米）
             * @private
             */
            _calDistance: function (point1, point2) {
                var line = new Polyline(MapGlobal.map.spatialReference);
                line.addPath([point1, point2]);
                if (MapGlobal.map.spatialReference.wkid == "4326" || MapGlobal.map.spatialReference.isWebMercator()) {//在web麦卡托投影和WGS84坐标系下的计算方法
                    return geometryEngine.geodesicLength(line, "meters");
                } else {//在其他投影坐标系下的计算方法
                    return geometryEngine.planarLength(line, "meters")
                }
            },

            /**
             * 图层转移
             * @private
             */
            _layerShift: function (oldLayer, newLayer) {
                for (var i = 0; i < oldLayer.graphics.length; i++) {
                    var graphic = new Graphic(oldLayer.graphics[i].geometry, oldLayer.graphics[i].symbol);
                    newLayer.add(graphic)
                }
            },

            /**
             * (右键清除)回调监听和最顶层
             */
            callCancel: function () {
                var me = this;
                MapGlobal.map.graphics.clear();
                if (me._mapClickFlag) me._mapClickFlag.remove();
                if (me._mapMoveFlag) me._mapMoveFlag.remove();
                if (me._drawComFlag) me._drawComFlag.remove();
            },

            /**
             * 测距完成时事件
             * @private
             */
            _completeMapMove: function () {
                var me = this;
                var _map = MapGlobal.map;
                me._drawComFlag = DrawTool._toolbar.on("draw-complete", function (evt) {
                    _map.graphics.remove(me._textGraphicMove);
                    var graphic = new Graphic(evt.geometry, new SimpleLineSymbol());
                    _map.getLayer("draw").add(graphic);
                    me._layerShift(_map.graphics, _map.getLayer("draw"))//临时图层转正式
                    me.callCancel();//清除图层和事件;
                });
            },

            /**
             * 获取测量点的Graphics
             * @private
             */
            _getStopPointGraphic: function (stopPoint, distance) {
                var me = this;
                var textSymbol = me._createTextSymbol("起点");
                if (distance > 0 && distance >= 1000) {
                    textSymbol = textSymbol.setText((distance / 1000).toFixed(2) + "km");
                } else if (distance > 0 && distance < 1000) {
                    textSymbol = textSymbol.setText(distance.toFixed() + "m");
                }
                return new Graphic(stopPoint, textSymbol);
            },

            /**
             * 文字标记
             * @private
             */
            _createTextSymbol: function (text) {
                var fontColor = new Color("#0626ff");
                var holoColor = new Color("#fff");
                var font = new Font("10pt", Font.STYLE_ITALIC, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Courier");
                var textSymbol = new TextSymbol(text, font, fontColor);
                textSymbol.setOffset(10, 10).setHaloColor(holoColor).setHaloSize(2).setDecoration("none");
                textSymbol.setAlign(TextSymbol.ALIGN_MIDDLE);
                return textSymbol;
            },

            /**
             * 截图
             * @private
             */
            _screenShoot: function () {
                var targetDom = $("#mainMap");
                //克隆截图区域
                var copyDom = targetDom.clone();
                copyDom.width(targetDom.width() + "px");
                copyDom.height(targetDom.height() + "px");
                copyDom.attr("id", "copyDom");
                $("body").append(copyDom);
                //对eCharts对象处理
                var eChartsCanvas = $("#copyDom div[id^='nodeTestPie']");
                for (var i = 0; i < eChartsCanvas.length; i++) {
                    var myChart = echarts.init(eChartsCanvas[i]);
                    myChart.setOption(myChart.getOption());
                    var ec = myChart.getRenderedCanvas();
                    eChartsCanvas[i].parentNode.appendChild(ec);
                }
                //移除不需要截图的区域
                $("#copyDom #map_zoom_slider").remove();
                $("#copyDom .mapTool").remove();
                $("#copyDom .extensionTool").remove();
                $("#copyDom .maptype").remove();
                $("#copyDom #mapSidebar").remove();
                $("#copyDom .mapApp").remove();
                var pathName = document.location.pathname;
                var ctxPath = pathName.substring(1, pathName.substr(1).indexOf('/') + 1);
                Html2canvas(copyDom[0], {
                    useCORS: true,
                    imageTimeout: 0
                    //, proxy: "/" + ctxPath + "/proxy/proxyScreenShot"
                }).then(function (canvas) {
                    var url = canvas.toDataURL();
                    //创建下载a标签
                    var a = document.createElement("a");
                    a.setAttribute("id", "download");
                    document.body.appendChild(a);
                    //以下代码为下载此图片功能
                    var triggerDownload = $("#download").attr("href", url).attr("download", "img.png");
                    triggerDownload[0].click();
                    //移除下载a标签
                    document.body.removeChild(a);
                    //克隆DOM删除
                    copyDom.remove();
                });
            },

            // Converts canvas to an image
            // convertCanvasToImage: function (canvas) {
            //     var image = new Image();
            //     image.src = canvas.toDataURL("image/png", 1);
            //     return image;
            // },
            // Converts image to canvas; returns new canvas element
            // convertImageToCanvas: function (image, startX, startY, width, height) {
            //     var canvas = document.createElement("canvas");
            //     canvas.width = width;
            //     canvas.height = height;
            //     canvas.getContext("2d").drawImage(image, startX, startY, width, height, 0, 0, width, height);
            //     return canvas;
            // }
            _changeLabelShow: function () {
                var me = this;
                for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                    if (MapGlobal.map.graphicsLayerIds[i].indexOf('_label') > -1) {//标签图层
                        var label = MapGlobal.map.graphicsLayerIds[i];
                        var isShow = MapGlobal.map.getLayer(label).visible;
                        if (MapGlobal.map.getLayer(label).notChangeShow) continue;
                        if (isShow) {
                            MapGlobal.map.getLayer(label).setVisibility(false);
                        } else {
                            MapGlobal.map.getLayer(label).setVisibility(true);
                        }
                    }
                }

            }
        };
        return tool;
    });