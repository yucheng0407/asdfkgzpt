/**
 * Created by yucheng on 2017/12/27.
 * 绘制工具
 * 以"_"开头的为私有变量与函数，否则为公有
 */
define([
        "RXMap/mapGlobal",
        "esri/layers/GraphicsLayer",
        "esri/toolbars/draw",
        "esri/graphic",
        "esri/Color",
        "esri/geometry/geometryEngine",
        "esri/geometry/normalizeUtils",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "dojo/_base/declare",
        "esri/toolbars/edit", "dojo/dom-style",
        "dojo/dom-class",
        "dojo/dom-construct", "RXMap/mapUtil", "esri/SnappingManager", "dojo/keys", "esri/sniff", "esri/domUtils","esri/geometry/Point"],
    function (MapGlobal, GraphicsLayer, Draw, Graphic, Color, geometryEngine, normalizeUtils,
              SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Query, QueryTask, declare, Edit, domStyle, domClass, domConstruct, mapUtil, SnappingManager, keys, has, domUtils,Point) {
        var tool = {
            _map: null,   //地图
            _toolbar: null,   //绘制工具
            _callback: null,  //回调
            /**
             * 绘制图形
             * @param tool 图形类型
             * @param callback 回调函数
             * @param option 缓冲区
             * @param edit 编辑模式
             */
            draw: function (tool, callback, option, edit) {
                var me = this;
                option = option ? option : {};
                me._map = MapGlobal.map;
                me._rightCancel();
                me.clearDraw();
                if (edit) {
                    $(".hint").text("单击绘图调用编辑");
                    me._shappingHint(true);
                }
                me._draw = true;
                if (!me._toolbar) {
                    me._toolbar = new Draw(me._map);
                }
                me.keyEvent();//吸附
                me.completeFlag = me._toolbar.on("draw-complete", $.proxy(me._addToMap, me));
                tool = tool.toUpperCase().replace(/ /g, "_");
                me._toolbar.activate(Draw[tool]);
                me._map.hideZoomSlider();
                me._map.disablePan();
                me._callback = callback;
                me._option = option;
                me._isHide = option.isHide;
                me._edit = edit;
            },
            /**
             *添加自定义的悬浮窗
             * @param graphic
             */
            addCustomInfoWindow:function(graphic,infoHtml){
                var screenPoint;
                if (graphic.geometry.type === "point") {
                    screenPoint = MapGlobal.map.toScreen(graphic.geometry);
                } else {
                    var extent = graphic.geometry.getExtent();
                    var _point = new Point((extent.xmin + extent.xmax) / 2, extent.ymax, graphic.geometry.spatialReference);
                    screenPoint = MapGlobal.map.toScreen(_point);
                }
                this.domNode = domConstruct.create("div", null, MapGlobal.map.id + "_root");
                domClass.add(this.domNode, "dextra-bubble-pop");
                this.domNode.innerHTML = '<div>' + infoHtml+ '</div>';
                domUtils.hide(this.domNode);
                domStyle.set(this.domNode, {
                    "left": (screenPoint.x - 142) + "px",
                    "top": (screenPoint.y - this.domNode.offsetHeight - (graphic.symbol.height ? graphic.symbol.height : (graphic.symbol.size ? graphic.symbol.size : 10) + 5)) + "px"
                });
                domUtils.show(this.domNode);
            },

            /**
             * 移出弹出框
             * @private
             */
            hideCustomInfoWindow: function (evt) {
                if (me.domNode) $(me.domNode).remove();
            },
            /**
             * 进入编辑图形
             * @param graphic 图形
             * @param callback 回调
             */
            edit: function (graphic, callback) {
                var me = this;
                me._map = MapGlobal.map;
                if (!graphic.edit) {
                    graphic.edit = callback
                }
                if (me._draw || graphic === me._rollBackGraphic) return;
                me._rightCancel();//监听回滚
                me.clearEdit();
                $(".hint").text("单击绘图调用编辑");
                me._shappingHint(true);
                if (!me.editToolbar) {
                    me.editToolbar = new Edit(MapGlobal.map);//开启编辑
                    me.editToolbar.on("graphic-first-move,rotate-first-move,scale-first-move,vertex-first-move", function () {
                        domUtils.hide(me.domNode);
                    })
                }
                me.keyEvent(graphic.geometry.type);//吸附
                var img = (graphic.symbol.type === "picturemarkersymbol") ? true : false;
                me._rollBackGraphic = graphic;
                me._oldSymbol = mapUtil.clone(graphic.symbol);
                me._oldGeometry = mapUtil.clone(graphic.geometry);
                var layerName = graphic.layerName ? graphic.layerName : "draw";
                if (graphic.textGraphic) MapGlobal.map.getLayer(layerName + "_label").remove(graphic.textGraphic);
                me._mapClickFlag = MapGlobal.map.on("click", function (evt) {
                    if (evt.graphic) return false;
                    me.clearEdit();//退出编辑模式
                    if (callback) {
                        callback(graphic);
                    }
                });
                this.domNode = domConstruct.create("div", null, MapGlobal.map.id + "_root");
                var domNode = this.domNode;
                domNode.innerHTML = '<div>' + "左键地图空白处保存编辑，右键地图空白处回滚" + '</div>';
                domUtils.hide(domNode);
                domClass.add(domNode, "dextra-bubble-edit");
                domStyle.set(domNode, {
                    "width": "100px"
                })
                this._mapMoveFlag = MapGlobal.map.on("mouse-move", function (evt) {
                    domStyle.set(domNode, {
                        "display": "block",
                        "left": evt.pageX + 20 + "px",
                        "top": evt.pageY + "px"
                    });
                });
                var color;
                switch (graphic.geometry.type) {
                    case "point":
                    case "multipoint":
                    case "polyline":
                        if (img) {
                            graphic.setSymbol(new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                                null, new Color("#0505FF")))
                        }
                        color = new Color("#0505FF");
                        break;
                    default:
                        color = new Color([5, 5, 255, 0.4]);
                        break;
                }
                graphic.symbol.color = color;
                MapGlobal.map.getLayer(layerName).refresh();
                activateToolbar();

                function activateToolbar() {
                    var tool = 0;
                    tool = tool | Edit.MOVE;
                    tool = tool | Edit.EDIT_VERTICES;
                    tool = tool | Edit.SCALE;
                    tool = tool | Edit.ROTATE;
                    if (graphic.symbol.declaredClass === "esri.symbol.TextSymbol") {
                        tool = tool | Edit.EDIT_TEXT;
                    }
                    var options = {
                        allowAddVertices: true,//添加顶点
                        allowDeleteVertices: true,//删除顶点
                        uniformScaling: true //调整大小统一缩放
                    };
                    me.editToolbar.activate(tool, graphic, options);
                }
            }
            ,
            _shappingHint: function (type) {
                if (type) {
                    $(".hint").show();
                }
                else {
                    $(".hint").hide();
                }
            }
            ,
            _rollBackEdit: function () {
                var me = this;
                if (me._rollBackGraphic) {
                    me._rollBackGraphic.setGeometry(me._oldGeometry)
                }
            }
            ,
            _updateEditGraphic: function (graphic) {
                var me = this;
                var layerName = graphic.layerName ? graphic.layerName : "draw";
                if (graphic.textGraphic) {
                    var point;
                    switch (graphic.geometry.type) {
                        case 'point': {
                            point = graphic.geometry;
                            break;
                        }
                        case 'polygon': {
                            point = graphic.geometry.getCentroid();
                            break;
                        }
                    }
                    graphic.textGraphic.setGeometry(point);
                    MapGlobal.map.getLayer(layerName + "_label").add(graphic.textGraphic);
                }
                graphic.setSymbol(me._oldSymbol);
            }
            ,
            clearEdit: function () {
                var me = this;
                me._shappingHint(false);
                if (me.editToolbar) me.editToolbar.deactivate();
                if (me._mapClickFlag) me._mapClickFlag.remove();
                if (me._mapMoveFlag) me._mapMoveFlag.remove();
                if (me.domNode) $(me.domNode).remove();
                if (me._rollBackGraphic) {
                    me._updateEditGraphic(me._rollBackGraphic);
                    me._rollBackGraphic = null;
                }
            }
            ,
            clearDraw: function () {
                var me = this;
                me._draw = false;
                me._shappingHint(false);
                if (me._toolbar) me._toolbar.deactivate();
                if (me.completeFlag) me.completeFlag.remove();
            }
            ,
            /**
             * 添加至地图
             * @param evt
             * @private
             */
            _addToMap: function (evt) {
                var me = this;
                var symbol;
                me._draw = false;
                me._toolbar.deactivate();
                me._shappingHint(false);
                $("html").unbind();
                me._map.showZoomSlider();
                me._map.enablePan();
                switch (evt.geometry.type) {
                    case "point":
                    case "multipoint":
                        symbol = new SimpleMarkerSymbol();
                        break;
                    case "polyline":
                        symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1);
                        break;
                    default:
                        symbol = new SimpleFillSymbol();
                        break;
                }
                var graphic;
                if (!me._isHide) {
                    graphic = MapGlobal.GraphicTool.addGeometry(evt.geometry, me._option)
                } else {
                    graphic = new Graphic(evt.geometry, symbol);
                }
                if (me._callback) {
                    me._callback(graphic);
                }
                if (me._edit && !me._isHide) {
                    graphic.edit = me._callback;
                    // me.edit(graphic, me._callback)
                }
            }
            ,
            _editLayer: function (content, fun) {
                layer.open({
                    title: "提示",
                    content: content
                    , btn: ['确定', '取消']
                    , yes: function (index, layero) {
                        fun();
                    }
                    , cancel: function () {
                    }
                });
            }
            ,
            /**
             * 添加缓冲区
             * @param geometry
             * @private
             */
            _addBuffer: function (geometry) {
                var me = this;
                normalizeUtils.normalizeCentralMeridian([geometry]).then(function (normalizedGeometries) {
                    var normalizedGeometry = normalizedGeometries[0];
                    var geo = geometryEngine.geodesicBuffer(normalizedGeometry, me._buffer, "meters");//缓冲200米
                    me._showBuffer(geo);
                });
            }
            ,

            /**
             *添加缓冲样式
             */
            _showBuffer: function (geometry) {
                var me = this;
                var symbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 0, 0, 0.65]), 2
                    ),
                    new Color([0, 0, 0, 0.35])
                );
                var graphic = new Graphic(geometry, symbol);
                me._map.getLayer("draw").add(graphic);
                if (me._edit) {
                    me.edit(graphic, me._callback)
                } else {
                    if (me._callback && me._buffer) {
                        me._callback(graphic)
                    }
                }
            }
            ,
            /**
             * 绘图图层清除
             * @private
             */
            clearAllMap: function () {
                //移除当前的统计图
                $(".myInfoWindow").remove();
                $(".buttonInfoWindow .close").click()
                graphicTool.unsetMap();
                //移除graphic
                for (var i = 0; i < MapGlobal.map.graphicsLayerIds.length; i++) {
                    if (MapGlobal.map.graphicsLayerIds[i].indexOf('notClear') > -1) continue;
                    MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).clear();
                    MapGlobal.map.getLayer(MapGlobal.map.graphicsLayerIds[i]).redraw();
                }
            }
            ,
            /**
             * 取消绘制
             */
            cancel: function () {
                var me = this;
                if (me._toolbar != null) {
                    me._draw = false;
                    me._toolbar.deactivate();
                    me._map.showZoomSlider();
                    me._map.enablePan();
                    MapGlobal.BaseTool.callCancel();
                }
            }
            ,

            /**
             * 绑定右键取消绘制
             */
            _rightCancel: function () {
                var me = this;
                $('html').on('contextmenu', function (e) {//关闭右键菜单
                    $(this).unbind();
                    return false;
                }).mousedown(function (e) {
                    if (e.which === 3) {// 鼠标右键
                        me._rollBackEdit()
                        me.clearDraw();
                        me.clearEdit();
                        me._map.showZoomSlider();
                        me._map.enablePan();
                        MapGlobal.BaseTool.callCancel();
                    }
                });
            },
            keyEvent: function (key) {
                var me = this;
                if (!me.shappingManager) {//吸附
                    me.shappingManager =  me._map.enableSnapping({alwaysSnap: true})
                    //me.shappingManager = me._map.enableSnapping({snapKey: keys.CTRL})
                    // $(".hint").on("click", "[name='shapp']", function () {
                    //     if ($(this).val() === "open") {
                    //         alert(123)
                    //         me._map.enableSnapping({alwaysSnap: true})
                    //     } else {
                    //         me._map.disableSnapping()
                    //     }
                    // })
                    //
                    // me.shappingManager = true;
                    // me.shappingManager.setLayerInfos([{layer:MapGlobal.map.getLayer("draw")}])
                }
                if("point"==key){
                    me._map.disableSnapping();
                    me.shappingManager=null;
                }
            }
        }
        return tool;
    });