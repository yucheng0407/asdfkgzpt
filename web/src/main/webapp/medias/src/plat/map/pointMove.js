/**
 * Created by yucheng on 2018/3/24.
 * 轨迹播放工具
 */
define(["RXMap/mapGlobal", "RXMap/graphicTool", "esri/geometry/Point", "esri/symbols/PictureMarkerSymbol", "esri/graphic","dojo/text!/asdfkgzpt/map/pointMove"], function (MapGlobal, GraphicTool, Point, PictureMarkerSymbol, Graphic,pointMoveTemplate) {
    var me;
    var pointMove = {
            init: function () {
                me = this;
                me.moveConfig();
                me._bindEvent();
            },
            map: null,
            BaseTool: null,
            //移动状态
            moveType: null,
            //移动图片地址
            url: null,
            //轨迹对象数组[{X:,Y:}......]
            polylineJson: null,
            //越大速度越快(初始速度)
            initSpeed: null,
            //最小速度
            minSpeed: null,
            //最大速度
            maxSpeed: null,
            /**
             * 外部接口归集播放
             * @param polyLine [{X:,Y:,SJ:}...]
             * @param color 线的颜色
             * @param url 移动点图标(图片向上)
             */
            initMove: function (polyLine, color, url) {
                me.url = url ? url : RX.handlePath("/medias/src/plat/map/mapCss/img/car.png");
                me.polylineJson = polyLine;
                GraphicTool.addGeometry(polyLine, {color:"#00A0FF", size:4});
                $("#mapSidebar").show();
                $("#mapSidebarContent").html(pointMoveTemplate);
            }
            ,
            /**
             *轨迹控制配置
             * @private
             */
            moveConfig: function (option) {
                me.initSpeed = option && option.initSpeed ? option.initSpeed : 0.0001;//越大速度越快
                me.minSpeed = me.initSpeed / Math.pow(2, 3);//最小速度
                me.maxSpeed = me.initSpeed * Math.pow(2, 3);//最大速度
            }
            ,
            /**
             * 绑定轨迹工具条
             * @private
             */
            _bindEvent: function () {
                //注册地图工具按钮
                $("body").on("click", ".scroller-content a", function () {
                    switch ($(this).attr("data-itemId")) {
                        case "play": {
                            $("[data-itemId='stop']").parent().attr("hidden", false);
                            $("[data-itemId='continue']").parent().attr("hidden", true);
                            me._play();
                            me.moveType = "continue";
                            // document.getElementById("continueTool").disabled = true;
                            // document.getElementById("returnTool").disabled = true;
                            break;
                        }
                        case "stop": {//暂停
                            if (me._isPlay()) {
                                $("[data-itemId='stop']").parent().attr("hidden", true);
                                $("[data-itemId='continue']").parent().attr("hidden", false);
                                me._stop();
                                me.moveType = "stop";
                            }
                            break;
                        }
                        case "continue": {//继续
                            if (me._isPlay()) {
                                $("[data-itemId='stop']").parent().attr("hidden", false);
                                $("[data-itemId='continue']").parent().attr("hidden", true);
                                me._continue();
                                me.moveType = "continue";
                            }
                            break;
                        }
                        case "up": {//加速
                            if (me._isPlay()) {
                                if (me.speed < me.maxSpeed) {
                                    me.speed = me.speed * 2;
                                } else {
                                    layer.msg("已到最高速");
                                }
                                $("[data-itemId='continue']").click();
                            }
                            break;
                        }
                        case "refresh": {//还原
                            if (me._isPlay()) {
                                me.speed = me.initSpeed;
                                $("[data-itemId='continue']").click();
                            }
                            break;
                        }
                        case "down": {//减速
                            if (me._isPlay()) {
                                if (me.speed > me.minSpeed) {
                                    me.speed = me.speed / 2;
                                } else {
                                    layer.msg("已到最低速");
                                }
                                $("[data-itemId='continue']").click();
                            }
                            break;
                        }
                        case "sjldTool": {//打开工具栏
                            if (me._isPlay()) {
                                $("#sjld").toggle("slow");
                            }
                            break;
                        }
                        case "sjld": {//
                            $("#sjld i").css("color", "rgb(255, 255, 255)");
                            $(this).find("i").css("color", "#08ff04");
                            me._drawSjld($(this).attr("value"));//画时间粒度
                            break;
                        }
                    }
                });
            }
            ,
            /**
             * 判断小车状态
             * @returns {boolean}
             * @private
             */
            _isPlay: function () {
                if (me.play) {
                    return true;
                } else {
                    layer.msg("请先播放", {time: 500});
                }
            }
            ,
            /**
             * 轨迹播放
             * @param
             * @returns {*}
             */
            _play: function () {
                if (me.moving) {
                    clearInterval(me.moving); //清除移动
                    MapGlobal.map.getLayer("draw").remove(me.moveGraphic);//清除移动点
                }
                if (me.polylineJson) {//有值
                    Progress.add("mapProgress", null, function (e) {//渲染进度条
                        me.pro = e.percent;
                        me._moveProgress(me.pro * me.total);
                        if (e.type !== "move" && me.moveType === "continue") $("[data-itemId='continue']").click();
                    });
                    me.play = true;
                    me.speed = me.initSpeed;
                    me.panDuration = esriConfig.defaults.map.panDuration;//单位是毫秒，默认值是250
                    esriConfig.defaults.map.panDuration = 1;
                    me._getRange(me.polylineJson);//计算轨迹总距离
                    var geometry = JSON.stringify({
                        type: 'point',
                        spatialReference: {wkid: 4326},
                        x: me.polylineJson[0].X,
                        y: me.polylineJson[0].Y
                    });
                    me.moveGraphic = GraphicTool.addGeometry(geometry, {
                        imgUrl: me.url,
                        height:32,
                        width:16

                    });//起始位置
                    me.pro = 0;
                    this._move(0, 1);
                }
            }
            ,
            /**
             *  根据两点坐标 进行移动
             * @param start 起点
             * @param end 终点
             * @returns {*}
             */
            _move: function (start, end) {
                var x1 = me.polylineJson[start].X;
                var y1 = me.polylineJson[start].Y;
                var x2 = me.polylineJson[end].X;
                var y2 = me.polylineJson[end].Y;
                var p = (y2 - y1) / (x2 - x1);//斜率
                var v = me.speed;//距离  距离越小 位置越精确
                var angle = me._CalulateXYAnagle(x1, y1, x2, y2); //角度
                var sin = Math.sqrt(1 + p * p);//
                if (angle) me.moveGraphic.symbol.angle = angle;
                me.moving = setInterval(function () {
                    me.startNum = start;
                    me.endNum = end;
                    var endV = Math.sqrt(Math.pow(me.moveGraphic.geometry.x - x2, 2) + Math.pow(me.moveGraphic.geometry.y - y2, 2));
                    if (endV <= v) {//小于切分距离
                        clearInterval(me.moving);
                        me.startNum = start++;
                        me.endNum = end++;
                        me.moveGraphic.geometry.x = x2;
                        me.moveGraphic.geometry.y = y2;
                        me.moveGraphic.setGeometry(me.moveGraphic.geometry);
                        me.pro += (endV / me.total);
                        Progress.load(me.pro);
                        if (end < me.polylineJson.length) {
                            me._move(start, end);
                        } else {//终点
                            esriConfig.defaults.map.panDuration = me.panDuration;//地图平移速度
                        }
                        return;
                    }
                    //分别计算 x,y轴方向速度
                    if (Math.abs(p) === Number.POSITIVE_INFINITY) {//无穷大
                        if (y2 < y1) {
                            me.moveGraphic.geometry.y -= v;
                        } else {
                            me.moveGraphic.geometry.y += v;
                        }
                    }
                    else {
                        if (x2 < x1) {//方向
                            me.moveGraphic.geometry.x -= (1 / sin) * v;
                            me.moveGraphic.geometry.y -= (p / sin) * v;
                        }
                        else {
                            me.moveGraphic.geometry.x += (1 / sin) * v;
                            me.moveGraphic.geometry.y += (p / sin) * v;
                        }
                    }
                    //居中
                    if (!(MapGlobal.map.extent.contains(me.moveGraphic.geometry))) {
                        MapGlobal.map.centerAt(me.moveGraphic.geometry);
                    }
                    //图层刷新
                    me.moveGraphic.setGeometry(me.moveGraphic.geometry);
                    me.pro += (v / me.total);
                    Progress.load(me.pro);
                }, 50);
            }
            ,
            /**
             *  根据两点坐标 计算角度
             * @returns {*}
             */
            _CalulateXYAnagle: function (startx, starty, endx, endy) {
                var tan = Math.atan(Math.abs((endy - starty) / (endx - startx))) * 180 / Math.PI + 90;
                if (endx > startx && endy > starty)//第一象限
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
            }
            ,
            /**
             * 轨迹暂停和播放
             * @param e
             * @returns {*}
             */
            _stop: function () {
                clearInterval(me.moving);
            }
            ,
            /**
             * 轨迹继续
             * @param e
             * @returns {*}
             */
            _continue: function () {
                if (me.moving) {
                    clearInterval(me.moving); //清除移动
                }
                me._move(me.startNum, me.endNum);
            }
            ,
            /**
             * 计算轨迹总距离
             * @param e
             * @returns {*}
             */
            _getRange: function (polyline) {
                me.total = 0;//总距离
                me.rangeList = [];//两点距离数组
                for (var i = 0; i < polyline.length - 1; i++) {
                    var x1 = polyline[i].X;
                    var y1 = polyline[i].Y;
                    var x2 = polyline[i + 1].X;
                    var y2 = polyline[i + 1].Y;
                    var range_x = ( x1 - x2);
                    var range_y = (y1 - y2);
                    var range = Math.sqrt(Math.pow(range_x, 2) + Math.pow(range_y, 2));//虚拟距离
                    MapGlobal.BaseTool._calDistance(new Point(x1, y1), new Point(x2, y2));//arcgis距离
                    me.rangeList.push(range);
                    me.total += range;
                }
                $("[data-itemId='sjld']:first").click();//画时间粒度
                return me.total;
            }
            ,
            /**
             * 时间粒度
             * @param e
             * @returns {*}
             */
            _drawSjld: function (sjld) { //minute
                sjld = Number(sjld);
                if (me.markerList) {
                    for (var ii = 0; ii < me.markerList.length; ii++) {
                        MapGlobal.map.getLayer("draw").remove(me.markerList[ii]);
                    }
                    Progress.clearMarker();
                }
                me.markerList = [];
                if (!sjld) return;
                var sjldList = [me.polylineJson[0]];//初始值
                var i = 0;
                for (var a = 0; a < sjldList.length; a++) {
                    var time = new Date(sjldList[a].SJ * 1000);
                    time.setMinutes(time.getMinutes() + sjld);
                    for (i; i < me.polylineJson.length; i++) {//遍历大于
                        if (me.polylineJson[i].SJ * 1000 >= time) {
                            sjldList.push(me.polylineJson[i]);
                            var graphic = GraphicTool.addGeometry({
                                type: 'point',
                                spatialReference: {wkid: 4326},
                                x: me.polylineJson[i].X,
                                y: me.polylineJson[i].Y
                            },{size:4});//起始位置
                            me.markerList.push(graphic);
                            me._drawSjldProgress(i, (new Date(me.polylineJson[i].SJ * 1000)).Format("yyyy-MM-dd HH:mm:ss"));
                            i++;
                            break;
                        }
                    }
                }
            }
            ,
            /**
             * 时间粒度在进度百分比
             * @param e
             * @returns {*}
             */
            _drawSjldProgress: function (i, title) {
                var _rangeList = me.rangeList.slice(0, i);
                var length = _rangeList.reduce(function (sum, cur) {
                    return sum + cur;
                }, 0);
                Progress.drawMarker(length / me.total, title);
            }
            ,
            /**
             * 根据进度条行进距离找到当前点Index和前进距离
             * @param e
             * @returns {*}
             */
            _curDistance: function (s) {
                var a = me.rangeList;
                var sum = 0;//累加距离
                for (var i = 0; i < a.length; i++) {
                    var cur = a[i];
                    if (s <= cur + sum) {//四舍五入
                        return {i: i, d: (s - sum)};//当前点距离差
                    } else sum += cur;
                }
            }
            ,
            /**
             * 根据行进距离和Index移动点
             * @param e
             * @returns {*}
             */
            _moveProgress: function (a) {
                //分别计算 x,y轴方向速度
                if (me.moving) {
                    clearInterval(me.moving); //清除移动
                }
                var data = me._curDistance(a);
                var x1 = me.polylineJson[data.i].X;
                var y1 = me.polylineJson[data.i].Y;
                var x2 = me.polylineJson[data.i + 1].X;
                var y2 = me.polylineJson[data.i + 1].Y;
                var p = (y2 - y1) / (x2 - x1);//斜率
                var v = data.d;//距离  距离越小 位置越精确
                var angle = me._CalulateXYAnagle(x1, y1, x2, y2); //角度
                if (angle) me.moveGraphic.symbol.angle = angle;
                var sin = Math.sqrt(1 + p * p);//
                me.startNum = data.i;
                me.endNum = data.i + 1;
                if (Math.abs(p) === Number.POSITIVE_INFINITY) {//无穷大
                    if (y2 < y1) {
                        me.moveGraphic.geometry.y = y1 - v;
                    } else {
                        me.moveGraphic.geometry.y = y1 + v;
                    }
                }
                else {
                    if (x2 < x1) {
                        me.moveGraphic.geometry.x = x1 - (1 / sin) * v;
                        me.moveGraphic.geometry.y = y1 - (p / sin) * v;
                        //计算汽车角度
                        //// (Math.PI / 2 - Math.atan(p)) * 180 / Math.PI+180
                    }
                    else {
                        me.moveGraphic.geometry.x = x1 + (1 / sin) * v;
                        me.moveGraphic.geometry.y = y1 + (p / sin) * v;
                        //计算汽车角度
                        ////(Math.PI / 2 - Math.atan(p)) * 180 / Math.PI
                    }
                }
                //图层刷新
                me.moveGraphic.setGeometry(me.moveGraphic.geometry);
                if (!(MapGlobal.map.extent.contains(me.moveGraphic.geometry))) {
                    MapGlobal.map.centerAt(me.moveGraphic.geometry);
                }
            }
        }
    ;
    pointMove.init();
    return pointMove;
})
;