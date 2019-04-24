/**
 * 扩展图形绘制
 * 主要是军事箭头绘制
 * 该类监听各种交互生成骨架点，具体箭头多边形调用各个箭头文件
 */
define(
    [   "RXMap/mapGlobal",
        "RXMap/mapUtil",
        "RXMap/militaryArrow/GeoStraightArrow",
        "RXMap/militaryArrow/GeoDiagonalArrow",
        "RXMap/militaryArrow/GeoDoubleArrow",
        "RXMap/militaryArrow/GeoDoveTailDiagonalArrow",
        "RXMap/militaryArrow/GeoDoveTailStraightArrow",
        'esri/toolbars/draw',
        'esri/graphic',
        'esri/layers/GraphicsLayer',
        'esri/geometry/Polygon',
        'esri/geometry/Polyline',
        'esri/geometry/Point',
        "esri/symbols/SimpleFillSymbol",
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/on',
        'dojo/dom-construct'
    ],
    function (MapGlobal, MapUtil, GeoStraightArrow, GeoDiagonalArrow, GeoDoubleArrow, GeoDoveTailDiagonalArrow, GeoDoveTailStraightArrow, Draw, Graphic, GraphicsLayer,Polygon, Polyline, Point, SimpleFillSymbol, declare, lang, on, domConstruct) {
        return declare([Draw], {
            mapMouseMoveHandle: null,   //鼠标移动，重绘图形事件
            tipMoveHandle: null,     //鼠标移动，tip跟随移动事件
            tipMoutHandle: null,     //鼠标移出，tip隐藏事件
            dbClickHandle: null,     //双击地图，结束绘制事件
            clickHandle: null,       //点击地图
            controlPt: [],            //控制点，很重要，绘制箭头的“骨架”
            tipDiv: null,            //tooptip框
            _geometryType: null,     //箭头类型

            /**
             * 激活军事标绘
             * @param geometryType  箭头类型
             */
            activate: function (geometryType) {
                var me = this;
                MapGlobal.map.hideZoomSlider();
                MapGlobal.map.disablePan();
                MapGlobal.map.disableDoubleClickZoom();
                me.controlPt = [];
                me._geometryType = geometryType;
                me.tipDiv = domConstruct.create("div", {
                    class: "esriMapTooltip",
                    style: "position: fixed;display:none"
                });
                me.tipDiv.innerHTML = "单击开始绘制图形";
                me.map.root.appendChild(this.tipDiv);
                me.tipMoveHandle = on(me.map, "mouse-move", lang.hitch(me, function (evt) {
                    me.tipDiv.style.left = (evt.screenPoint.x + 10) + "px";
                    me.tipDiv.style.top = (evt.screenPoint.y + 50) + "px";
                    me.tipDiv.style.display = "block";
                }));
                me.tipMoutHandle = on(me.map, "mouse-out", lang.hitch(me, function (evt) {
                    me.tipDiv.style.display = "none";
                }));

                //点击地图
                me.clickHandle = on(me.map, "click", lang.hitch(me, function (evt) {
                    me.controlPt.push(evt.mapPoint);
                    me.tipDiv.innerHTML = "单击继续绘制图形，双击完成绘制";

                    //双箭头，稍作特殊处理
                    if (me._geometryType == "DoubleArrow") {
                        me.tipDiv.innerHTML = "请继续单击" + (4 - me.controlPt.length) + "次绘制图形";
                        if (me.controlPt.length == 4) {
                            me.tipDiv.innerHTML = "双击完成绘制";
                        }
                    }

                    //双击地图
                    me.dbClickHandle = on(me.map, "dbl-click", lang.hitch(me, function (evt) {
                        me.onDrawEnd(evt.mapPoint);
                        MapUtil.layerShift(MapGlobal.map.graphics, me.map.getLayer("draw"));
                        MapGlobal.map.graphics.clear();
                        me.deactivate();
                    }));

                    //鼠标移动
                    me.mapMouseMoveHandle = on(me.map, "mouse-move", lang.hitch(me, function (evt) {
                        MapGlobal.map.graphics.clear();
                        var mapPoint = evt.mapPoint;
                        var tempControlPt = this.controlPt;
                        if (me._geometryType == "DoubleArrow") {
                            var len = tempControlPt.length;
                            if (len == 2) {
                                var offX = tempControlPt[1].x - tempControlPt[0].x;
                                var offY = tempControlPt[1].y - tempControlPt[0].y;
                                //第四个控制点
                                var geometry = new Point(
                                    (mapPoint.x - offX), (mapPoint.y - offY)
                                );
                                tempControlPt = tempControlPt.concat([mapPoint, geometry]);
                            } else if (len == 3) {
                                tempControlPt = tempControlPt.concat([mapPoint]);
                            }
                        } else {
                            tempControlPt = this.controlPt.concat([mapPoint]);
                        }
                        var polygon = this.getPolygon(tempControlPt);
                        var g = new Graphic(polygon, new SimpleFillSymbol());
                        MapGlobal.map.graphics.add(g);
                    }));
                }));
            },

            /**
             * 根据控制点、剪头类型获取多边形
             * @param tempControlPt
             * @returns {*}
             */
            getPolygon: function (tempControlPt) {
                var me = this;
                var polygon;
                switch (me._geometryType) {
                    case "StraightArrow":
                        polygon = GeoStraightArrow.getPolygon(tempControlPt);
                        break;
                    case "DiagonalArrow":
                        polygon = GeoDiagonalArrow.getPolygon(tempControlPt);
                        break;
                    case "DoubleArrow":
                        polygon = GeoDoubleArrow.getPolygon(tempControlPt);
                        break;
                    case "DoveTailDiagonalArrow":
                        polygon = GeoDoveTailDiagonalArrow.getPolygon(tempControlPt);
                        break;
                    case "DoveTailStraightArrow":
                        polygon = GeoDoveTailStraightArrow.getPolygon(tempControlPt);
                        break;
                }
                return polygon;
            },

            /**
             * 绘制结束或取消绘制
             */
            deactivate: function () {
                var me = this;
                me.inherited(arguments);//父类的取消工具
                me.map.showZoomSlider();
                me.map.enablePan();
                me.map.enableDoubleClickZoom();
                //取消我自己加的地图事件
                if (me.mapMouseMoveHandle) {
                    me.mapMouseMoveHandle.remove();
                    me.mapMouseMoveHandle = null;
                }
                if (me.dbClickHandle) {
                    me.dbClickHandle.remove();
                    me.dbClickHandle = null;
                }
                if (me.clickHandle) {
                    me.clickHandle.remove();
                    me.clickHandle = null;
                }
                if (me.tipMoveHandle) {
                    me.tipMoveHandle.remove();
                    me.tipMoveHandle = null;
                }
                if (me.tipMoutHandle) {
                    me.tipMoutHandle.remove();
                    me.tipMoutHandle = null;
                }
                if (me.tipDiv) {
                    me.map.root.removeChild(this.tipDiv);
                    me.tipDiv = null;
                }
            }
        });
    });