/**
 * Created by Administrator on 2017/12/27.
 * 添加graphic工具
 * 以"_"开头的为私有变量与函数，否则为公有
 */
define([
        "RXMap/mapGlobal",
        "RXMap/mapConfig",
        "esri/layers/GraphicsLayer",
        "RXMap/infoWindow/InfoWindow",
        "dojo/dom-style",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dojo/dom",
        "dojo/_base/lang",
        "esri/domUtils",
        "dojo/text!/asdfkgzpt/map/buttonTemplate",
        "esri/geometry/Point",
        "RXMap/drawTool",
        "dojo/_base/event"
    ],
    function (MapGlobal, MapConfig, GraphicsLayer, cusInfoWindow, domStyle, domClass, domConstruct, dom, lang, domUtils, buttonTemplate, Point,drawTool,event) {
        var tool = {
            //声明变量
            _map: null,
            _showMouseOverPop: true,
            /**
             * 初始化函数
             */
            _constructor: function () {
                var me = this;
                me._map = MapGlobal.map;

            },

            /**
             * 获取图层
             * @param id
             */
            getLayer: function (id) {
                return MapGlobal.map.getLayer(id);
                // for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                //     if (MapGlobal.map.graphicsLayerIds[i].indexOf(id) > -1) {
                //         MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]);
                //     }
                // }
            },

            /**
             * 显示图层
             * @param id
             */
            showLayer: function (id) {
                var me = this;
                for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                    if (MapGlobal.map.graphicsLayerIds[i].indexOf(id) > -1) {
                        MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).setVisibility(true);
                    }
                }
            },

            /**
             * 隐藏图层
             * @param id
             */
            hideLayer: function (id) {
                var me = this;
                for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                    if (MapGlobal.map.graphicsLayerIds[i].indexOf(id) > -1) {
                        MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).setVisibility(false);
                    }
                }
            },


            removeLayerGroup: function (groupName) {
                var me = this;
                for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                    MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).clear();
                }
            },

            clearLayerById: function (id) {
                MapGlobal.map.getLayer(id).clear();
                $(".buttonInfoWindow .close").click();
                if (MapGlobal.map.getLayer(id + '_label')) {
                    MapGlobal.map.getLayer(id + '_label').clear();
                }
            },

            clearLayerByGroup: function (groupName) {
                $(".buttonInfoWindow .close").click();
                var layers = MapConfig.graphicLayerGroups[groupName];
                for (var i = 0; i < layers.length; i++) {
                    MapGlobal.map.getLayer(layers[i].id).clear();
                    if (MapGlobal.map.getLayer(layers[i].id + '_label')) {
                        MapGlobal.map.getLayer(layers[i].id + '_label').clear();
                    }
                }
            },

            clearAllLayer: function () {
                MapGlobal.BaseTool._clear();
            },

            clearAllBusinessLayer: function () {
                var groups = MapConfig.graphicLayerGroups;
                for (x in groups) {
                    this.clearLayerByGroup(x);
                }
            },

            clearAllLayerAndRebind: function () {
                for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                    MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).clear();
                }
                GraphicTool.unsetMap();
            },

            /**
             * 初始化鼠标移动时的弹出窗，地图加载完成后调用
             */
            _registerMoveInfoWindow: function (gLayer) {
                var me = this;
                //鼠标移入打开浮窗
                gLayer.on("mouse-over", function (evt) {
                    me._overEvent(evt);
                });
                //鼠标移出关闭浮窗
                gLayer.on("mouse-out", function (evt) {
                    me._outEvent(evt);
                });

            },
            /**
             * 添加图层
             */
            addGraphicLayer: function (layerConfig) {
                var me = this;
                var gLayer = new GraphicsLayer({id: layerConfig.id});
                MapGlobal.map.addLayer(gLayer);
                if (layerConfig.showMoveInfoWindow) {
                    me._registerMoveInfoWindow(gLayer);
                }
                if (layerConfig.showClickInfoWindow) {
                    me._registerClickInfoWindow(gLayer);
                }
            },
            /**
             * 依据图层名添加graphic图层,通常用在动态添加图层
             */
            addGraphicLayerBylayerName: function (layerName, groupName) {
                var me = this;
                var gLayer = new GraphicsLayer({id: layerName});
                MapGlobal.map.addLayer(gLayer);
                if (groupName) {
                    var layer = {
                        id: layerName
                    };
                    MapConfig.graphicLayerGroups[groupName].push(layer);
                }
            },

            _registerClickInfoWindow: function (gLayer) {
                var me = this;
                //鼠标点击打开自定义窗口
                gLayer.on("click", function (evt) {
                    me._openWindow(evt);
                });
            },

            _openWindow: function (evt) {
                //event.stop(evt)
                var me = this;
                var graphic = evt.graphic;
                if (graphic && graphic.edit) {
                    drawTool.edit(graphic , graphic.edit)
                }
                if (graphic && graphic.content) {
                    this._showMouseOverPop = false;
                    var showPoint;
                    if (graphic.geometry.type === "point") {
                        showPoint = graphic.geometry;
                    } else {
                        var extent = graphic.geometry.getExtent();
                        var _point = new Point((extent.xmin + extent.xmax) / 2, extent.ymax, graphic.geometry.spatialReference);
                        showPoint = _point;
                    }
                    if (me.customInfo) {
                        me.customInfo.destroy();
                    }
                    me.customInfo = new cusInfoWindow({
                        map: MapGlobal.map,
                        domNode: domConstruct.create("div", null, dom.byId("map_container")),   //放到map_container，在统计图div内移动鼠标，地图也会响应
                        width: graphic.clickInfoWindowWidth ? graphic.clickInfoWindowWidth : 300,
                        height: graphic.clickInfoWindowHeight ? graphic.clickInfoWindowHeight : 200,
                        chartPoint: showPoint,
                        title: "查看"
                    });
                    var buttons = [];
                    graphic.btns = "";
                    var p = 0;//按钮高度
                    if (graphic.buttons) {
                        for (var a = 0; a < graphic.buttons.length; a++) {
                            buttons.push("<li onclick='window.parent." + graphic.buttons[a].id + "(" + JSON.stringify(graphic.attributes) + ")'><a href='javascript:void(0)'>" + graphic.buttons[a].alias + "</a></li>");
                        }
                        graphic.btns = $("<div id=\"btnGroup\"></div>").append('<ul class="link_button">' + buttons.join("") + '</ul>')[0].outerHTML;
                        p = 40;
                    }
                    var scope = {attrTab: graphic.content, btnGroup: graphic.btns};
                    var btnTemplate = lang.replace(buttonTemplate, scope);
                    var h = graphic.clickInfoWindowHeight ? graphic.clickInfoWindowHeight : 200;
                    btnTemplate = $(btnTemplate).find("#attrTab").css({
                        "height": (h - p) + "px",
                        "overflow-y": "auto"
                    }).parents("#buttonTemplate")[0].outerHTML;
                    me.customInfo.setContent(btnTemplate);
                    $(".buttonInfoWindow .close").on("click", $.proxy(me._setShowMouseOverPop, me));
                }
            },

            _setShowMouseOverPop: function () {
                this._showMouseOverPop = true;
            },

            /**
             * 创建弹出框，鼠标移入时显示的
             * @private
             */
            createInfoWindowInstance: function () {
                var me = this;
                this.domNode = domConstruct.create("div", null, MapGlobal.map.id + "_root");
                domClass.add(this.domNode, "dextra-bubble-pop");
                domStyle.set(this.domNode, {
                    width: "300px"
                });
                domUtils.hide(this.domNode);
                MapGlobal.map.on("click", $.proxy(me._hideMouseOverPop, me));
            },

            _hideMouseOverPop: function () {
                var me = this;
                domUtils.hide(this.domNode);
            },

            /**
             * 移到弹出框
             * @private
             */
            _overEvent: function (evt) {
                var graphic = evt.graphic;
                if (graphic && graphic.popup && this._showMouseOverPop) {
                    var screenPoint;
                    if (graphic.geometry.type === "point") {
                        screenPoint = MapGlobal.map.toScreen(graphic.geometry);
                    } else {
                        var extent = graphic.geometry.getExtent();
                        var _point = new Point((extent.xmin + extent.xmax) / 2, extent.ymax, graphic.geometry.spatialReference);
                        screenPoint = MapGlobal.map.toScreen(_point);
                    }
                    var scope = {attrTab: graphic.popup, btnGroup: ""};
                    var btnTemplate = lang.replace(buttonTemplate, scope);
                    this.domNode.innerHTML = '<div>' + btnTemplate + '</div>';
                    domUtils.show(this.domNode);
                    domStyle.set(this.domNode, {
                        "left": (screenPoint.x - 142) + "px",
                        "top": (screenPoint.y - this.domNode.offsetHeight - (graphic.symbol.height ? graphic.symbol.height : (graphic.symbol.size ? graphic.symbol.size : 10) + 5)) + "px"
                    });
                    domUtils.show(this.domNode);
                }
            },

            /**
             * 移出弹出框
             * @private
             */
            _outEvent: function (evt) {
                var graphic = evt.graphic;
                if (graphic && graphic.popup) {
                    domUtils.hide(this.domNode);
                }
            }

        }

        tool._constructor();
        return tool;
    }
)
