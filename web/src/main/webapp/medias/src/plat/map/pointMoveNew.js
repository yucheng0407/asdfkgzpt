/**
 * Created by yucheng on 2018/3/24.
 * 轨迹播放工具
 */
define(["RXMap/mapGlobal", "RXMap/graphicTool", "esri/geometry/Point", "esri/symbols/PictureMarkerSymbol", "esri/graphic", "dojo/text!/asdfkgzpt/map/pointMove"], function (MapGlobal, GraphicTool, Point, PictureMarkerSymbol, Graphic, pointMoveTemplate) {
    /**
     * 绑定轨迹工具条
     * @private
     */
    var objectList = [];
    var _bindEventMove = function () {
        //注册地图工具按钮
        $("body").on("click", ".move a", function () {
                switch ($(this).attr("data-itemId")) {
                    case "play": {
                        $("[data-itemId='stop']").parent().show();
                        $("[data-itemId='continue']").parent().hide();
                        for (var i = 0; i < objectList.length; i++) {
                            objectList[i]._play();
                            objectList[i].moveType = "continue";
                        }

                        // document.getElementById("continueTool").disabled = true;
                        // document.getElementById("returnTool").disabled = true;
                        break;
                    }
                    case "stop": {//暂停
                        for (var i = 0; i < objectList.length; i++) {
                            if (objectList[i]._isPlay()) {
                                $("[data-itemId='stop']").parent().hide();
                                $("[data-itemId='continue']").parent().show();
                                objectList[i]._stop();
                                objectList[i].moveType = "stop";
                            }
                        }
                        break;
                    }
                    case "continue": {//继续
                        for (var i = 0; i < objectList.length; i++) {
                            if (objectList[i]._isPlay()) {
                                $("[data-itemId='stop']").parent().show();
                                $("[data-itemId='continue']").parent().hide();
                                objectList[i]._continue();
                                objectList[i].moveType = "continue";
                            }
                        }
                        break;
                    }
                    case "up": {//加速
                        for (var i = 0; i < objectList.length; i++) {
                            if (objectList[i]._isPlay()) {
                                if (objectList[i].speed < objectList[i].maxSpeed) {
                                    objectList[i].speed = objectList[i].speed * 2;
                                } else {
                                    layer.msg("已到最高速");
                                }
                            }
                        }
                        break;
                    }
                    case "refresh": {//还原
                        for (var i = 0; i < objectList.length; i++) {
                            if (objectList[i]._isPlay()) {
                                objectList[i].speed = objectList[i].initSpeed;
                                $("[data-itemId='continue']").click();
                            }
                        }
                        break;
                    }
                    case "down": {//减速
                        for (var i = 0; i < objectList.length; i++) {
                            if (objectList[i]._isPlay()) {
                                if (objectList[i].speed > objectList[i].minSpeed) {
                                    objectList[i].speed = objectList[i].speed / 2;
                                } else {
                                    layer.msg("已到最低速");
                                }
                                $("[data-itemId='continue']").click();
                            }
                        }
                        break;
                    }
                    case "sjldTool": {//打开工具栏
                        $("#sjld").toggle("slow");
                        break;
                    }
                    case
                    "sjld"
                    : {//
                        $("#sjld i").css("color", "rgb(255, 255, 255)");
                        $(this).find("i").css("color", "#08ff04");
                        for (var i = 0; i < objectList.length; i++) {
                            objectList[i]._drawSjld($(this).attr("value"));//画时间粒度
                        }
                        break;
                    }
                }
            }
        );
        $("#mapSidebar").on("click", "[data-tool=\"track\"] i", function () {
            PointMove.clearMove();
        });
    }
    var PointMove = function (polyLine, color, url,center) {
        this.map = null;
        this.BaseTool = null;
        //移动图片地址
        this.url = null;
        //轨迹对象数组[{X:,Y:}......]
        this.polylineJson = null;
        //越大速度越快(初始速度)
        this.initSpeed = null;
        //最小速度
        this.minSpeed = null;
        //最大速度
        this.maxSpeed = null;
        /**
         *轨迹控制配置
         * @private
         */
        this.moveConfig = function (option) {
            this.initSpeed = option && option.initSpeed ? option.initSpeed : 0.0001;//越大速度越快
            this.minSpeed = this.initSpeed / Math.pow(2, 3);//最小速度
            this.maxSpeed = this.initSpeed * Math.pow(2, 3);//最大速度
        }
        /**
         * 初始化接口归集播放
         * @param polyLine [{X:,Y:,SJ:}...]
         * @param color 线的颜色
         * @param url 移动点图标(图片向上)
         * @param center 居中
         */
        this.initMove = function (polyLine, color, url, center) {
            var me = this;
            me.url = url ? url : RX.handlePath("/medias/src/plat/map/mapCss/img/jcCar1.png");
            var startImg = RX.handlePath("/medias/src/plat/map/mapCss/img/start.png");
            var endImg = RX.handlePath("/medias/src/plat/map/mapCss/img/end.png");
            me.polylineJson = polyLine;
            me.color = color ? color : "#00A0FF";
            var start = {
                type: 'point',
                spatialReference: {wkid: MapGlobal.map.spatialReference.wkid},
                x: me.polylineJson[0].X,
                y: me.polylineJson[0].Y
            };

            var end = {
                type: 'point',
                spatialReference: {wkid: MapGlobal.map.spatialReference.wkid},
                x: me.polylineJson[me.polylineJson.length - 1].X,
                y: me.polylineJson[me.polylineJson.length - 1].Y
            };
            var graphic = GraphicTool.addGeometry(polyLine, {color: me.color, size: 4, layerName: "pointMove"});
            GraphicTool.addGeometry(start, {imgUrl: startImg, imgOffset: [0, 14], layerName: "pointMove",attr:{SJ:new Date(me.polylineJson[0].SJ).Format("yyyy-MM-dd HH:mm:ss")},column:[{name:"开始时间",type:"SJ",isMove:true}]});
            GraphicTool.addGeometry(end, {imgUrl: endImg, imgOffset: [0, 14], layerName: "pointMove",attr:{SJ:new Date(me.polylineJson[me.polylineJson.length - 1].SJ).Format("yyyy-MM-dd HH:mm:ss")},column:[{name:"结束时间",type:"SJ",isMove:true}]});
            if (center) MapGlobal.map.setExtent(graphic._extent.expand(1.3));//居中
            me._getRange(me.polylineJson);//计算轨迹总距离
            me.moveConfig();
            objectList.push(me);
            $("#mapSidebar").show();
            $("#mapSidebarContent").html(pointMoveTemplate);

        };
        /**
         * 判断小车状态(按键)
         * @returns {boolean}
         * @private
         */
        this._isPlay = function () {
            var me = this;
            if (me.play) {
                return true;
            } else {
                layer.msg("请先播放", {time: 500});
            }
        }
            ,
            /**
             * 轨迹播放(按键)
             * @param
             * @returns {*}
             */
            this._play = function () {
                var me = this;
                if (me.moving) {
                    clearInterval(me.moving); //清除移动
                    MapGlobal.map.getLayer("pointMove").remove(me.moveGraphic);//清除移动点
                }
                if (me.polylineJson) {//有值
                    Progress.add("mapProgress", me.color, objectList.length == 1 ? false : true, function (e) {//渲染进度条
                        me.pro = e.percent;
                        me._moveProgress(me.pro * me.total);
                        if (e.type !== "move" && me.moveType === "continue") $("[data-itemId='continue']").click();
                    });
                    me.play = true;
                    me.speed = me.initSpeed;
                    me.panDuration = esriConfig.defaults.map.panDuration;//单位是毫秒，默认值是250
                    esriConfig.defaults.map.panDuration = 1;
                    var geometry = {
                        type: 'point',
                        spatialReference: {wkid: MapGlobal.map.spatialReference.wkid},
                        x: me.polylineJson[0].X,
                        y: me.polylineJson[0].Y
                    };
                    me.moveGraphic = GraphicTool.addGeometry(geometry, {
                        imgUrl: me.url,
                        height: 30,
                        width: 15,
                        layerName: "draw"
                    });//起始位置
                    me.pro = 0;
                    me._move(0, 1);
                }
            }

            ,
            /**
             *  根据两点坐标 进行移动
             * @param start 起点
             * @param end 终点
             * @returns {*}
             */
            this._move = function (start, end) {
                var me = this;
                var x1 = me.polylineJson[start].X;
                var y1 = me.polylineJson[start].Y;
                if (!me.polylineJson[end]) return;
                var x2 = me.polylineJson[end].X;
                var y2 = me.polylineJson[end].Y;
                var p = (y2 - y1) / (x2 - x1);//斜率
                if(isNaN(Math.abs(p))){//停留
                    Progress.showStopMarker(true);
                }else {
                    Progress.showStopMarker(false);
                }
                var v = me.speed;//距离  距离越小 位置越精确
                var angle = me._CalulateXYAnagle(x1, y1, x2, y2); //角度
                var sin = Math.sqrt(1 + p * p);//
                if (!isNaN(angle)) me.moveGraphic.symbol.angle = angle;
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
                        Progress.load(!isNaN(me.pro)?me.pro:0);
                        if (end < me.polylineJson.length) {
                            me._move(start, end);
                        } else {//终点
                            esriConfig.defaults.map.panDuration = me.panDuration;//地图平移速度
                        }
                        return;
                    }
                    //分别计算 x,y轴方向速度
                    if (Math.abs(p) === Number.POSITIVE_INFINITY) {//无穷大
                        me.moveGraphic.geometry.x = x1;
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
                    if (!(MapGlobal.map.extent.contains(me.moveGraphic.geometry)) && objectList.length === 1) {//单量车居中
                        MapGlobal.map.centerAt(me.moveGraphic.geometry);
                    }
                    //图层刷新
                    me.moveGraphic.setGeometry(me.moveGraphic.geometry);
                    me.pro += (v / me.total);
                    Progress.load(me.pro);
                }, 50);
            }
        /**
         *  根据两点坐标 计算角度
         * @returns {*}
         */
        this._CalulateXYAnagle = function (startx, starty, endx, endy) {
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
        }

        /**
         * 轨迹暂停和播放(按键)
         * @param e
         * @returns {*}
         */
        this._stop = function () {
            var me = this;
            clearInterval(me.moving);
        }


        /**
         * 轨迹继续(按键)
         * @param e
         * @returns {*}
         */
        this._continue = function () {
            var me = this;
            if (me.moving) {
                clearInterval(me.moving); //清除移动
            }
            me._move(me.startNum, me.endNum);
        }
        /**
         * 计算轨迹总距离
         * @param e
         * @returns {*}
         */

        this._getRange = function (polyline) {
            var me = this;
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
        /**
         * 时间粒度(按键)
         * @param e
         * @returns {*}
         */
        this._drawSjld = function (sjld) { //minute
            var me = this;
            sjld = Number(sjld);
            if (me.markerList) {
                for (var ii = 0; ii < me.markerList.length; ii++) {
                    MapGlobal.map.getLayer("pointMove").remove(me.markerList[ii]);
                }
                Progress.clearMarker();
            }
            me.markerList = [];
            if (!sjld) return;
            var sjldList = [me.polylineJson[0]];//初始值
            var i = 0;
            for (var a = 0; a < sjldList.length; a++) {
                var time = new Date(sjldList[a].SJ);
                time.setTime(time.getTime()+sjld*60*1000);
                for (i; i < me.polylineJson.length; i++) {//遍历大于
                    if (me.polylineJson[i].SJ >= time) {
                        sjldList.push(me.polylineJson[i]);
                        var dateStr=(new Date(me.polylineJson[i].SJ)).Format("yyyy-MM-dd HH:mm:ss");
                        var graphic = GraphicTool.addGeometry({
                            type: 'point',
                            spatialReference: {wkid: MapGlobal.map.spatialReference.wkid},
                            x: me.polylineJson[i].X,
                            y: me.polylineJson[i].Y
                        }, {
                            color:"#836bff",size: 13, layerName: "pointMove", attr:{SJ:dateStr}, column: [{
                                name: "时间",
                                type: "SJ",isMove: true
                            }]
                        });//起始位置
                        me.markerList.push(graphic);
                        if (me.play) me._drawSjldProgress(i, dateStr);
                        i++;
                        break;
                    }
                }
            }
        }
        /**
         * 时间粒度在进度百分比
         * @param e
         * @returns {*}
         */
        this._drawSjldProgress = function (i, title) {
            var me = this;
            var _rangeList = me.rangeList.slice(0, i);
            var length = _rangeList.reduce(function (sum, cur) {
                return sum + cur;
            }, 0);
            Progress.drawMarker(length / me.total, title);
        }
        /**
         * 根据进度条行进距离找到当前点Index和前进距离
         * @param e
         * @returns {*}
         */
        this._curDistance = function (s) {
            var me = this;
            var a = me.rangeList;
            var sum = 0;//累加距离
            for (var i = 0; i < a.length; i++) {
                var cur = a[i];
                if (s <= cur + sum) {//四舍五入
                    return {i: i, d: (s - sum)};//当前点距离差
                } else sum += cur;
            }
        }
        /**
         * 根据行进距离和Index移动点
         * @param e
         * @returns {*}
         */
        this._moveProgress = function (a) {
            var me = this;
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
            if (!isNaN(angle)) me.moveGraphic.symbol.angle = angle;
            var sin = Math.sqrt(1 + p * p);//
            me.startNum = data.i;
            me.endNum = data.i + 1;
            if (Math.abs(p) === Number.POSITIVE_INFINITY) {//无穷大
                me.moveGraphic.geometry.x = x1;
                if (y2 < y1) {
                    me.moveGraphic.geometry.y = y1 - v;
                } else {
                    me.moveGraphic.geometry.y = y1 + v;
                }
            }
            else {
                if (isNaN(Math.abs(sin)) || isNaN(Math.abs(p))) {
                    me.moveGraphic.geometry.x = x1;
                    me.moveGraphic.geometry.y = y1;
                }
                else if (x2 < x1) {
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
        this.initMove(polyLine, color, url, center);
    };
    /**
     * 外部接口清除
     * @param polyLine [{X:,Y:,SJ:}...]
     * @param color 线的颜色
     * @param url 移动点图标(图片向上)
     */
    PointMove.clearMove = function () {
        for (var i = 0; i < objectList.length; i++) {
            if (objectList[i].moving) {
                clearInterval(objectList[i].moving); //清除移动
                MapGlobal.map.getLayer("draw").remove(objectList[i].moveGraphic);
            }
        }
        objectList = [];
        $("#mapSidebar").hide();
        $("#mapProgress").html("");
        MapGlobal.map.getLayer("pointMove").clear();
    }
    _bindEventMove();
    return PointMove;
})
;