/**
 * 功能集合
 */
define(["RXMap/graphicTool",
        "RXMap/mapGlobal",
        "RXMap/mapSpatial",
        "RXMap/militaryDraw",
        "RXMap/themeMap/DrawColorMap",
        "RXMap/InfoWindow",
        "esri/request",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/webMercatorUtils",
        "dojo/dom-construct",
        "dojo/dom",
        "dojo/_base/array",
        'dojo/_base/lang',
        "dojo/text!/asdfkgzpt/map/mapDraw",
        "dojo/text!/asdfkgzpt/map/militaryDraw",
        "dojo/text!/asdfkgzpt/map/pointMove",
        "dojo/text!/asdfkgzpt/map/pcsXqTemplate",
        "esri/geometry/Extent",
        "RXMap/mapConfig",
        "dojo/_base/connect",
        "RXMap/layerControl", "RXMap/mapUtil"],
    function (GraphicTool, MapGlobal, MapSpatial, MilitaryDraw, DrawColorMap, ChartInfoWindow, esriRequest, Query, QueryTask, webMercatorUtils, domConstruct, dom, arrayUtils, lang, mapDrawTemplate, militaryDrawTemplate, pointMoveTemplate, pcsXqTemplate, Extent, MapConfig, connect, layerControl, mapUtil) {
        var tool = {
            init: function () {
                var me = this;
                me._bindEvent();
                // me._openPcs();
                me.addToolPcsXq();
            },

            /**
             * 注册地图功能函数
             * @private
             */
            _bindEvent: function () {
                var me = this;
                $("[data-tool=track]").on("click", function () {
                    me._openTrack();
                });
                $("[data-tool=mapDraw]").on("click", function () {
                    me._openDraw();
                });
                $("[data-tool=militaryDraw]").on("click", function () {
                    me._openMilitaryDraw();
                });
                $("[data-tool=doubleMap]").on("click", function () {
                    me._openDoubleMap();
                });
                $("[data-tool=colormap]").on("click", function () {
                    me._openDrawColorMap();
                });
                $("[data-tool=heatMap]").on("click", function () {
                    me._openDrawHeatMap();
                });
                $("[data-tool=pieMap]").on("click", function () {
                    me._openPieMap();
                });
                $("[data-tool=columnMap]").on("click", function () {
                    me._openColumnMap();
                });
                $("[data-tool=cluster]").on("click", function () {
                    me._openCluster();
                });
                $("[data-tool=xzqh]").on("click", function () {
                    me._openXzqh();
                });
            },

            /**
             * 绘制常规图形
             * @private
             */
            _openDraw: function () {
                var me = this;
                $("#mapSidebar").show();
                $("#mapSidebarContent").html(mapDrawTemplate);
            },

            /**
             * 绘制军事箭头
             * @private
             */
            _openMilitaryDraw: function () {
                var me = this;
                $("#mapSidebar").show();
                $("#mapSidebarContent").html(militaryDrawTemplate);
                MilitaryDraw.init();
            },

            /**
             * 地图轨迹
             * @private
             */
            _openTrack: function () {
                var me = this;
                $("#mapSidebar").show();
                $("#mapSidebarContent").html(pointMoveTemplate);
            },

            /**
             * 双屏
             * @private
             */
            _openDoubleMap: function () {
                var me = this;
                $("#secondMap").show();
                $("#mainMap").css("width", "50%");
                $("#secondMap").css("width", "50%");
            },

            /**
             * 分层设色图（示例）
             * @private
             */
            _openDrawColorMap: function () {
                var me = this;
                var queryTask = new QueryTask("http://192.168.0.117:6080/arcgis/rest/services/research/wuhu_dark/MapServer/0");
                var query = new Query();
                query.returnGeometry = true;
                query.where = "1=1";
                query.outFields = ["*"];
                queryTask.execute(query, lang.hitch(me, function (evt) {
                    var me = this;
                    me._drawColorMap(evt.features);
                }));
            },

            /**
             * 调用方法绘制分层设色图
             * @private
             */
            _drawColorMap: function (res) {
                var me = this;
                var renderObj = [
                    {
                        "min": 0,
                        "max": 0.75,
                        "color": "#38A800"
                    },
                    {
                        "min": 0.75,
                        "max": 1.25,
                        "color": "#8B1D00"
                    },
                    {
                        "min": 1.25,
                        "max": 2.4,
                        "color": "#FFFF00"
                    },
                    {
                        "min": 2.4,
                        "max": 3,
                        "color": "#FF8000"
                    }
                ];
                DrawColorMap.draw(MapGlobal.map, res, "Shape_Leng", renderObj);
            },

            /**
             * 热力图示例
             * @private
             */
            _openDrawHeatMap: function () {
                var me = this;
                var query = new Query();
                var queryTask = new QueryTask("http://172.28.1.131:6080/arcgis/rest/services/JLZY/MapServer/0");
                query.where = "1=1";
                query.returnGeometry = true;
                query.outFields = ["*"];
                (function (me) {
                    queryTask.execute(query, function (result) {
                        me._drawHeatMap(result.features);
                    });
                })(me);
            },

            /**
             * 调用方法绘制热力图
             * @private
             */
            _drawHeatMap: function (result) {
                var me = this;
                DrawColorMap.drawHeatMap(MapGlobal.map, result, "ID", 0, 2600);
            },

            /**
             * 打开饼图，模拟数据请求
             * @private
             */
            _openPieMap: function () {
                var me = this;
                var queryTask = new QueryTask("http://192.168.0.117:6080/arcgis/rest/services/research/wuhu_dark/MapServer/0");
                var query = new Query();
                query.returnGeometry = true;
                query.where = "1=1";
                query.outFields = ["*"];
                queryTask.execute(query, lang.hitch(me, function (evt) {
                    var me = this;
                    me._drawPieMap(evt.features);
                }));
            },

            /**
             * 绘制饼图
             * @param features  绘制对象（模拟）
             * @private
             */
            _drawPieMap: function (features) {
                var me = this;
                //移除当前的统计图
                $(".myInfoWindow").remove();
                //统计图大小
                var width = 180;
                var height = 120;
                //模拟数据
                jsonPieData = [
                    {
                        GDP1: 89414,
                        GDP2: 82684,
                        GDP3: 635687,
                        GDP4: 536598,
                        GDP5: 66549,
                        UNIT: "万元",
                        x: features[0].geometry.getCentroid().x,
                        y: features[0].geometry.getCentroid().y
                    },
                    {
                        GDP1: 111414,
                        GDP2: 62684,
                        GDP3: 735687,
                        GDP4: 636598,
                        GDP5: 126549,
                        UNIT: "万元",
                        x: features[1].geometry.getCentroid().x,
                        y: features[1].geometry.getCentroid().y
                    },
                    {
                        GDP1: 23614,
                        GDP2: 72684,
                        GDP3: 835687,
                        GDP4: 736598,
                        GDP5: 136549,
                        UNIT: "万元",
                        x: features[2].geometry.getCentroid().x,
                        y: features[2].geometry.getCentroid().y
                    },
                    {
                        GDP1: 93414,
                        GDP2: 132684,
                        GDP3: 935687,
                        GDP4: 126598,
                        GDP5: 146549,
                        UNIT: "万元",
                        x: features[3].geometry.getCentroid().x,
                        y: features[3].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[4].geometry.getCentroid().x,
                        y: features[4].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[5].geometry.getCentroid().x,
                        y: features[5].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[6].geometry.getCentroid().x,
                        y: features[6].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[7].geometry.getCentroid().x,
                        y: features[7].geometry.getCentroid().y
                    }
                ];

                for (var i = 0; i < jsonPieData.length; i++) {
                    var chartData = null;
                    chartData = [];
                    var nodeChart = null;
                    //创建一个空div,来装统计图
                    nodeChart = domConstruct.create("div", {
                        id: "nodeTestPie" + i,
                        style: "width:" + width + "px;height:" + height + "px;"
                    }, dom.byId("map_container"));
                    var myChart = echarts.init(document.getElementById("nodeTestPie" + i));
                    //创建饼状图
                    option = {
                        tooltip: {
                            trigger: 'item',
                            z: 999,
                            formatter: "{a}(万元) <br/>{b} : {c} ({d}%)"
                        },
                        calculable: false,
                        series: [
                            {
                                name: "生产总值",
                                type: "pie",
                                radius: "60%",
                                center: ["50%", "50%"],
                                data: [
                                    {value: jsonPieData[i].GDP1, name: "13年"},
                                    {value: jsonPieData[i].GDP2, name: "14年"},
                                    {value: jsonPieData[i].GDP3, name: "15年"},
                                    {value: jsonPieData[i].GDP4, name: "16年"},
                                    {value: jsonPieData[i].GDP5, name: "17年"}
                                ],
                                label: {
                                    // fontWeight:'bolder',
                                    // fontSize:15,
                                    backgroundColor: "#FFFFFF"

                                }
                            }
                        ],
                        animation: false
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);

                    var chartPoint = null;
                    chartPoint = new esri.geometry.Point(jsonPieData[i].x, jsonPieData[i].y, MapGlobal.map.spatialReference);
                    var chartInfo = new ChartInfoWindow({
                        map: MapGlobal.map,
                        domNode: domConstruct.create("div", null, dom.byId("map_container")),   //放到map_container，在统计图div内移动鼠标，地图也会响应
                        chartPoint: chartPoint,
                        width: width,
                        height: height
                    });
                    chartInfo.setContent(nodeChart);
                }
            },

            /**
             * 绘制警力饼图
             * @param jsonPieData 需满足数据格式 [{seriesName:"",seriesData:[{value:"",name:""},{},...],x:"",y:""},{},...]
             * @private
             */
            _drawPieMap2: function (jsonPieData) {
                var me = this;
                me._removePie();
                //统计图大小
                var width = 200;
                var height = 120;
                for (var i = 0; i < jsonPieData.length; i++) {
                    var chartData = null;
                    chartData = [];
                    var nodeChart = null;
                    //创建一个空div,来装统计图
                    nodeChart = domConstruct.create("div", {
                        id: "nodeTestPie" + i,
                        style: "width:" + width + "px;height:" + height + "px;"
                    }, dom.byId("map_container"));
                    var myChart = echarts.init(document.getElementById("nodeTestPie" + i));
                    //创建饼状图
                    option = {
                        tooltip: {
                            trigger: 'item',
                            z: 999,
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        calculable: false,
                        series: [
                            {
                                name: jsonPieData[i].seriesName,
                                type: "pie",
                                radius: "40%",
                                center: ["50%", "50%"],
                                data: jsonPieData[i].seriesData,
                                label: {
                                    // fontWeight:'bolder',
                                    // fontSize:15,
                                    backgroundColor: "#FFFFFF"

                                }
                            }
                        ],
                        animation: false
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);

                    var chartPoint = null;
                    chartPoint = new esri.geometry.Point(jsonPieData[i].x, jsonPieData[i].y, MapGlobal.map.spatialReference);
                    var chartInfo = new ChartInfoWindow({
                        map: MapGlobal.map,
                        domNode: domConstruct.create("div", null, dom.byId("map_container")),   //放到map_container，在统计图div内移动鼠标，地图也会响应
                        chartPoint: chartPoint,
                        width: width,
                        height: height
                    });
                    chartInfo.setContent(nodeChart);
                }
                //设置到全图
                MapGlobal.map.setExtent(new Extent(MapConfig.MBR[0], MapConfig.MBR[1], MapConfig.MBR[2], MapConfig.MBR[3], map.spatialReference));
            },

            /**
             * 移除当前的统计图
             * @private
             */
            _removePie: function () {
                $(".myInfoWindow").remove();
            },

            /**
             * 打开柱状图，模拟数据请求
             * @private
             */
            _openColumnMap: function () {
                var me = this;
                var queryTask = new QueryTask("http://192.168.0.117:6080/arcgis/rest/services/research/wuhu_dark/MapServer/0");
                var query = new Query();
                query.returnGeometry = true;
                query.where = "1=1";
                query.outFields = ["*"];
                queryTask.execute(query, lang.hitch(me, function (evt) {
                    var me = this;
                    me._drawColumnMap(evt.features);
                }));
            },

            /**
             * 绘制柱状图
             * @param features  绘制对象（模拟）
             * @private
             */
            _drawColumnMap: function (features) {
                var me = this;
                //移除当前的统计图
                $(".myInfoWindow").remove();
                //统计图大小
                var width = 180;
                var height = 120;
                //模拟数据
                jsonBarData = [
                    {
                        GDP1: 89414,
                        GDP2: 82684,
                        GDP3: 635687,
                        GDP4: 536598,
                        GDP5: 66549,
                        UNIT: "万元",
                        x: features[0].geometry.getCentroid().x,
                        y: features[0].geometry.getCentroid().y
                    },
                    {
                        GDP1: 111414,
                        GDP2: 62684,
                        GDP3: 735687,
                        GDP4: 636598,
                        GDP5: 126549,
                        UNIT: "万元",
                        x: features[1].geometry.getCentroid().x,
                        y: features[1].geometry.getCentroid().y
                    },
                    {
                        GDP1: 23614,
                        GDP2: 72684,
                        GDP3: 835687,
                        GDP4: 736598,
                        GDP5: 136549,
                        UNIT: "万元",
                        x: features[2].geometry.getCentroid().x,
                        y: features[2].geometry.getCentroid().y
                    },
                    {
                        GDP1: 93414,
                        GDP2: 132684,
                        GDP3: 935687,
                        GDP4: 126598,
                        GDP5: 146549,
                        UNIT: "万元",
                        x: features[3].geometry.getCentroid().x,
                        y: features[3].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[4].geometry.getCentroid().x,
                        y: features[4].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[5].geometry.getCentroid().x,
                        y: features[5].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[6].geometry.getCentroid().x,
                        y: features[6].geometry.getCentroid().y
                    },
                    {
                        GDP1: 63414,
                        GDP2: 222684,
                        GDP3: 145687,
                        GDP4: 116598,
                        GDP5: 156549,
                        UNIT: "万元",
                        x: features[7].geometry.getCentroid().x,
                        y: features[7].geometry.getCentroid().y
                    }
                ];

                for (var i = 0; i < jsonBarData.length; i++) {
                    var chartData = null;
                    chartData = [];
                    var nodeChart = null;
                    //创建一个空div,来装统计图
                    nodeChart = domConstruct.create("div", {
                        id: "nodeTestPie" + i,
                        style: "width:" + width + "px;height:" + height + "px;"
                    }, dom.byId("map_container"));
                    var myChart = echarts.init(document.getElementById("nodeTestPie" + i));
                    //创建饼状图
                    var option = {
                        tooltip: {
                            show: true
                        },
                        grid: {
                            x: '40%',
                            x2: '1%',
                            y: '10%',
                            y2: '1%',
                            borderWidth: '0'//网格边框

                        },
                        xAxis: [
                            {
                                type: 'category',
                                splitLine: {show: false},//网格线
                                data: ["13年", "14年", "15年", "16年", "17年"],
                                axisLabel: {//颜色字体
                                    show: true,
                                    //rotate:30,
                                    textStyle: {
                                        color: 'rgba(0,0,0,0.6)'
                                    }
                                },
                                axisTick: {//x轴刻度
                                    show: false
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {show: false},//网格线
                                name: '(万元)',
                                axisLabel: {//颜色字体
                                    show: true,
                                    textStyle: {
                                        color: 'rgba(0,0,0,0.6)'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                "name": "生产总值",
                                "type": "bar",
                                "barWidth": 8,
                                itemStyle: {normal: {color: '#2466c9'}},//设置颜色
                                "data": [jsonBarData[i].GDP1,
                                    jsonBarData[i].GDP2,
                                    jsonBarData[i].GDP3,
                                    jsonBarData[i].GDP4,
                                    jsonBarData[i].GDP5]
                            }
                        ],
                        animation: false
                    };
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                    var chartPoint = null;
                    chartPoint = new esri.geometry.Point(jsonBarData[i].x, jsonBarData[i].y, MapGlobal.map.spatialReference);
                    var chartInfo = new ChartInfoWindow({
                        map: MapGlobal.map,
                        domNode: domConstruct.create("div", null, dom.byId("map_container")),   //放到map_container，在统计图div内移动鼠标，地图也会响应
                        chartPoint: chartPoint,
                        width: width,
                        height: height
                    });
                    chartInfo.setContent(nodeChart);
                }
            },

            /**
             * 绘制聚类图（模拟请求数据）
             * @private
             */
            _openCluster: function () {
                var me = this;
                var query = new Query();
                //http://localhost:63342/layers_point_clustering/data/1000-photos.json
                var queryTask = new QueryTask("http://172.28.1.131:6080/arcgis/rest/services/JLZY/MapServer/0");
                query.where = "1=1";
                query.returnGeometry = true;
                query.outFields = ["*"];
                (function (me) {
                    queryTask.execute(query, function (result) {
                        me._drawClusterMap(result.features);
                    });
                })(me);
            },

            /**
             * 绘制聚类图
             * @private
             */
            _drawClusterMap: function (result) {
                var me = this;
                var info = {};
                var wgs = new esri.SpatialReference({
                    "wkid": 4326
                });
                info.data = arrayUtils.map(result, function (p) {
                    var latlng = new esri.geometry.Point(p.geometry.x, p.geometry.y, wgs);
                    // var latlng = new  esri.geometry.Point(parseFloat(p.lng), parseFloat(p.lat), wgs);
                    var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                    var attributes = {
                        "type": "aaa"
                    };
                    return {
                        "x": webMercator.x,
                        "y": webMercator.y,
                        "attributes": attributes
                    };
                });
                info.data = info.data.concat(arrayUtils.map(result, function (p) {
                    var latlng = new esri.geometry.Point(p.geometry.x + 0.2, p.geometry.y + 0.3, wgs);
                    // var latlng = new  esri.geometry.Point(parseFloat(p.lng), parseFloat(p.lat), wgs);
                    var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                    var attributes = {
                        "type": "bbb"
                    };
                    return {
                        "x": webMercator.x,
                        "y": webMercator.y,
                        "attributes": attributes
                    };
                }));
                DrawColorMap.drawClusterMap(MapGlobal.map, info, "sp");
            },
            /**
             * 调用方法绘制热力图
             * @private
             */
            _openXzqh: function () {
                var me = this;
                $.ajax({
                    url: "/medias/src/plat/code/mapEcharts/t_xzqh_wuhu.json",
                    async: false,
                    type: "GET",
                    dataType: "json", //指定服务器返回的数据类型
                    success: function (data) {
                        for (var i = 0; i < data.features.length; i++) {
                            var list = data.features[i].geometry.coordinates;
                            if (list.length > 1) {
                                var _list = [];
                                for (var j = 0; j < list.length; j++) {
                                    _list = _list.concat(list[j])
                                }
                                list = _list;
                            }
                            var geo = {
                                type: 'polygon',
                                spatialReference: {wkid: 4326},
                                rings: list
                            };
                            GraphicTool.addGeometry(geo, {layerName: "draw", color: "#489aff"})
                        }

                        //  GraphicTool
                    }
                })
            },
            /**
             * 派出所图层
             * @private
             */
            _openPcs: function () {
                var me = this;
                var pcsData;

                var option = {//巡防单位
                    size: 15,
                    imgUrl: RX.handlePath("/medias/src/plat/map/mapCss/img/pcs1.png"),
                    column: [{
                        name: "单位名称",
                        type: "SBBH", isLabel: true
                    }],
                    layerName: "notClear",
                    notChangeShow: true,
                    fontColor: "#0000ff",
                    holoColor: "#fff",
                    fontSize: "1px",
                    fontStyle: "STYLE_NORMAL",
                    // fontWeight: "WEIGHT_NORMAL",
                    offset: [-30, 10],
                    hasLabel: true
                }
                $.ajax({
                    url: RX.handlePath("/jjy/openPcs"),
                    async: true,
                    type: "POST",
                    success: function (data) {
                        pcsData = data.data;
                        //  GraphicTool
                    }
                })
                me._map = MapGlobal.map;
                connect.disconnect(me._zoomEnd);
                addPcs();
                me._zoomEnd = connect.connect(me._map, "onZoomEnd", me, function () {
                    addPcs();
                });

                function addPcs() {
                    layerControl.clearLayerById("notClear");
                    if (me._map.getLevel() >= 14) {
                        var pcsOption = JSON.parse(JSON.stringify(option));
                        pcsOption.fontColor = "#ff0000";
                        GraphicTool.addGeometrys(pcsData, null, {'qt': option, 'pcs': pcsOption})
                        return false;
                    }
                    if (me._map.getLevel() >= 12) {   //显示聚类
                        GraphicTool.addGeometrys(pcsData, null, {'qt': option})
                    }
                }
            }
            , addToolPcsXq: function (option) {
                $(".Maptools").prepend(pcsXqTemplate);
                $.ajax({
                    async: true,
                    type: "POST",
                    url: "/fkzl/getXzqh",
                    dataType: "JSON",
                    success: function (ar) {
                        renderXzqh(convert(ar.data)[0])
                    }
                });
                // renderXzqh([]);
                addXzqhEvent();//绑定监听
                function convert(rows) {
                    function exists(rows, pId) {
                        for (var i = 0; i < rows.length; i++) {
                            if (rows[i].id == pId) return true;
                        }
                        return false;
                    }

                    var nodes = [];
                    // get the top level nodes
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (!exists(rows, row.pId)) {
                            nodes.push(row);
                        }
                    }

                    var toDo = [];
                    for (var i = 0; i < nodes.length; i++) {
                        toDo.push(nodes[i]);
                    }
                    while (toDo.length) {
                        var node = toDo.shift();	// the parent node
                        // get the children nodes
                        for (var i = 0; i < rows.length; i++) {
                            var row = rows[i];
                            if (row.pId == node.id) {
                                var child = row;
                                if (node.children) {
                                    node.children.push(child);
                                } else {
                                    node.children = [child];
                                }
                                toDo.push(child);
                            }
                        }
                    }
                    return nodes;
                }

                function renderXzqh(data) {
                    var html = "";
                    //派出所
                    var pcsHtml =
                        function (pcsList) {
                            var _html = "";
                            if (!pcsList) return _html;
                            var $td = $('<td></td>');
                            for (var i = 0; i < pcsList.length; i++) {
                                var isLayer = pcsList[i].SHOW_GEOMETRY ? " isLayer" : "";
                                $td.append($('<a class="pcs' + isLayer + '" href = "#none" id="' + pcsList[i].id + '">' + pcsList[i].name + '</a>').data("attr", pcsList[i]))
                            }
                            return $td;
                        };
                    //县分局
                    for (var i = 0; i < data.children.length; i++) {
                        //     html += '<tr> <th><a class="xzqh" href = "#none" id="' + data.children[i].id + '">' + data.children[i].name + ':</a></th>' + pcsHtml(data.children[i].children) + '</tr>'
                        $("table").append($('<tr> <th><a class="fj" href = "#none" id="' + data.children[i].id + '">' + data.children[i].name + ':</a></th></tr>').append(pcsHtml(data.children[i].children)));
                    }
                    //市局
                    $("#city").append('<a class="sj" href="#none" id="' + data.id + '" class="datop xzqh">' + data.name + '</a>');
                    // $("table").append(html);
                }

// 派出所图层事件
                function addXzqhEvent() {
                    function setExtent(_graphicList) {
                       if(_graphicList.length===pcsLayerLength) MapGlobal.map.setExtent(mapUtil.getGraphicsExtent(_graphicList).expand(1.3));//居中
                    }
                    var _graphicList;
                    var pcsLayerLength;
                    $("#pcsXqTemplate").on('click', '.sj,.fj,.pcs', function (e) {
                            if (this.className.indexOf("sj") > -1) {//市局
                                var $pcsLayerAll = $(".isLayer");
                                if ($pcsLayerAll.length) {
                                    _graphicList = [];
                                    pcsLayerLength=$pcsLayerAll.length;
                                    $pcsLayerAll.click();
                                } else {
                                    alert("没找到辖区");
                                }
                            }
                            else if (this.className.indexOf("fj") > -1) {//分局
                                var $pcsLayer = $(this).parents("tr").find(".isLayer");
                                if ($pcsLayer.length) {
                                    _graphicList = [];
                                    pcsLayerLength=$pcsLayer.length;
                                    $pcsLayer.click();
                                } else {
                                    alert("没找到辖区");
                                }
                            }
                            else if (this.className.indexOf("pcs") > -1) {//派出所
                                var fjClick = !e.originalEvent;
                                var $click = $(this);
                                var data = $click.data("attr");
                                if (data._graphic) {
                                    if (fjClick) {
                                        _graphicList.push(data._graphic);
                                        setExtent(_graphicList)//居中
                                        return;
                                    }
                                    var layerName = "draw";
                                    $click.removeClass("select");
                                    MapGlobal.map.getLayer(layerName).remove(data._graphic);
                                    MapGlobal.map.getLayer(layerName + "_label").remove(data._graphic.textGraphic);
                                    delete data._graphic;
                                } else {
                                    if (!data.SHOW_GEOMETRY) {
                                        if (!fjClick) alert("没找到辖区")
                                        return;
                                    }
                                    $click.addClass("select");
                                    var option = {//巡防单位
                                        column: [{
                                            name: "单位名称",
                                            type: "name", isLabel: true
                                        }],
                                        color: [128, 120, 15, 0.35],
                                        center: !fjClick ? true : null,
                                        hasLabel: true,
                                        fontColor: "#0626ff",
                                        attr: data
                                    }
                                    data._graphic = GraphicTool.addGeometry(data.SHOW_GEOMETRY, option);
                                    if (fjClick) {//分局
                                        _graphicList.push(data._graphic);
                                        setExtent(_graphicList)//居中
                                    }
                                }
                                // var list = $click.attr("id").split(".");
                                // $.ajax({
                                //     async: true,
                                //     type: "POST",
                                //     url: "/seo/getXzqhGeometry",
                                //     data: {tableName: list[0], id: list[1]},
                                //     dataType: "JSON",
                                //     success: function (ar) {
                                //         window.parentWin.addPolygon(JSON.parse(ar.data.SHOW_GEOMETRY));
                                //         window.parentWin.$("#xzqh").val($click.text().replace(":", ""));
                                //         closeWin();
                                //     }
                                // });
                            }
                        }
                    )
                }
            }
        }
        return tool;
    });