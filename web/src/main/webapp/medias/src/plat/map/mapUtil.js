/**
 * 地图共用方法
 */
define(["RXMap/mapGlobal", "esri/geometry/geometryEngine", "esri/graphic", "esri/geometry/Point", "esri/geometry/Circle", "esri/geometry/Polygon","esri/geometry/Polyline"], function (mapGlobal, geometryEngine, Graphic, Point, Circle, Polygon,Polyline) {
    var mapUtil = {
            /**
             * 生成缓冲区
             */
            createBuffer: function (g, distance, unit) {
                var me = this;
                var g = geometryEngine.geodesicBuffer(g, distance, unit);
                return g;
            },
            /**
             * 中心点
             */
            getCenter: function (geometry) {
                return new Polygon(geometry).getCentroid();
            }
            ,
            /**
             * 生成圆
             */
            createCircle: function (g, distance) {
                return new Circle(new Point(g), {
                    "radius": distance
                    // "geodesic":true
                });
            }
            ,

            /**
             * 图层转移
             * @private
             */
            layerShift: function (oldLayer, newLayer) {
                for (var i = 0; i < oldLayer.graphics.length; i++) {
                    var graphic = new Graphic(oldLayer.graphics[i].geometry, oldLayer.graphics[i].symbol);
                    newLayer.add(graphic)
                }
            }
            ,

            /**
             * 获取graphics的extent
             */
            getGraphicsExtent: function (graphics) {
                if (graphics.length == 0) {
                    return;
                }
                var extent = graphics[0]._extent;
                for (var i = 1; i < graphics.length; i++) {
                    extent = extent.union(graphics[i]._extent);
                }
                return extent;
            }
            ,
            clone: function (obj) {
                var me=this;
                var newObj = {};
                if(obj&&obj.type==="polyline"){return new Polyline(JSON.parse(JSON.stringify(obj)))}
                if (obj instanceof Array) {
                    newObj = [];
                }
                for (var key in obj) {
                    var val = obj[key];
                    newObj[key] = typeof val === 'object' ? me.clone(val): val;
                }
                return newObj;
            },
            createBezier1: function (p, l, a) {
                var me = this;
                if (a) {
                    return this.createBezier3(p, a)
                }
                var c = [];
                for (var e = 0; e < p.length; e++) {
                    c[e] = p[e]
                }
                var h;
                var f;
                var g = 0;
                var q;
                var n = c.length;
                var d = [];
                var o = true;
                while (o) {
                    q = true;
                    for (h = 0; h < n - 3; h += 3) {
                        if (this.GetBezierGap(c, h) > l) {
                            q = false;
                            this.InciseBezier(c, h, d);
                            c.splice(h + 1, 2);
                            for (f = 0; f < 5; f++) {
                                c.splice(h + 1 + f, 0, d[f + 1])
                            }
                            h -= 3;
                            n = c.length
                        }
                        if (q) {
                            break
                        }
                    }
                    while (g < n - 1) {
                        if (c[g] === c[g + 1]) {
                            c.splice(g + 1, 1);
                            n--
                        }
                        g++
                    }
                    o = false
                }
                return c;
            }
            ,

            /**
             * 二次贝塞尔曲线插值
             * @param m 点数组
             * @param a 平滑系数，越大越平滑
             * @returns {Array}
             */
            createBezier2: function (m, a) {
                var me = this;
                if (!a) {
                    a = 20
                }
                var c = [];
                var e = 0.05;
                if (a > 0) {
                    e = 1 / a
                }
                for (var g = 0; g < m.length - 2;) {
                    var d = m[g];
                    var p = m[g + 1];
                    var l = m[g + 2];
                    c.push(d);
                    for (var o = 0; o < 1;) {
                        var j = (1 - o) * (1 - o) * d.x + 2 * o * (1 - o) * p.x + o * o * l.x;
                        var h = (1 - o) * (1 - o) * d.y + 2 * o * (1 - o) * p.y + o * o * l.y;
                        var k = new Point(j, h, mapGlobal.map.spatialReference);
                        c.push(k);
                        o += e
                    }
                    g += 2;
                    if (g >= m.length) {
                        c.push(d)
                    }
                }
                var f = c[c.length - 1];
                var n = m[m.length - 1];
                if (!me.pointEquals(f, n)) {
                    c.push(n);
                    //c.push(n.clone())
                }
                return c
            }
            ,

            createBezier3: function (m, a) {
                var me = this;
                if (!a) {
                    a = 20
                }
                var c = [];
                var e = 0.05;
                if (a > 0) {
                    e = 1 / a
                }
                for (var g = 0; g < m.length - 3;) {
                    var d = m[g];
                    var j = m[g + 1];
                    var h = m[g + 2];
                    var n = m[g + 3];
                    c.push(d);
                    for (var q = 0; q < 1;) {
                        var l = (1 - q) * (1 - q) * (1 - q) * d.x + 3 * q * (1 - q) * (1 - q) * j.x + 3 * q * q * (1 - q) * h.x + q * q * q * n.x;
                        var k = (1 - q) * (1 - q) * (1 - q) * d.y + 3 * q * (1 - q) * (1 - q) * j.y + 3 * q * q * (1 - q) * h.y + q * q * q * n.y;
                        var mp = new Point(l, k, mapGlobal.map.spatialReference);
                        c.push(mp);
                        q += e
                    }
                    g += 3;
                    if (g >= m.length) {
                        c.push(d)
                    }
                }
                var f = c[c.length - 1];
                var p = m[m.length - 1];
                if (!me.pointEquals(f, p)) {
                    c.push(p);
                }
                return c
            }
            ,

            GetBezierGap: function (a, c) {
                var e = 0;
                for (var d = 1; d < 4; d++) {
                    if (Math.abs(a[c + d].x - a[c + d - 1].x) > e) {
                        e = Math.abs(a[c + d].x - a[c + d - 1].x)
                    }
                    if (Math.abs(a[c + d].y - a[c + d - 1].y) > e) {
                        e = Math.abs(a[c + d].y - a[c + d - 1].y)
                    }
                }
                return e
            }
            ,

            InciseBezier: function (c, d, f) {
                var a = [];
                a[0] = [];
                a[1] = [];
                a[2] = [];
                var e;
                for (e = 0; e < 3; e++) {
                    a[0][e] = new Point;
                    a[0][e].x = (c[d + e].x + c[d + e + 1].x) / 2;
                    a[0][e].y = (c[d + e].y + c[d + e + 1].y) / 2
                }
                for (e = 0; e < 2; e++) {
                    a[1][e] = new Point;
                    a[1][e].x = (a[0][e].x + a[0][e + 1].x) / 2;
                    a[1][e].y = (a[0][e].y + a[0][e + 1].y) / 2
                }
                a[2][0] = new Point;
                a[2][0].x = (a[1][0].x + a[1][1].x) / 2;
                a[2][0].y = (a[1][0].y + a[1][1].y) / 2;
                f[0] = c[d];
                f[1] = a[0][0];
                f[2] = a[1][0];
                f[3] = a[2][0];
                f[4] = a[1][1];
                f[5] = a[0][2];
                f[6] = c[d + 3];
                return true
            }
            ,

            /**
             * 判断两个点是否相同
             * @param t 点一
             * @param a 点二
             * @returns {boolean}
             */
            pointEquals: function (t, a) {
                var c = false;
                if (a != null) {
                    c = ((t.x === a.x && t.y === a.y) || (isNaN(t.x) && isNaN(t.y) && isNaN(a.x) && isNaN(a.y)))
                }
                return c
            }
            ,

            /**
             * Method: calculateMidpoint
             * 计算两个点所连成的线段的的中点
             *
             * Parameters:
             * pointA - {<SuperMap.Geometry.Point>} 第一个点
             * pointB -  {<SuperMap.Geometry.Point>} 第二个点
             *
             * Returns:
             * {<SuperMap.Geometry.Point>} 返回中点
             */
            calculateMidpoint: function (pointA, pointB) {
                var midPoint = new Point((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2);
                return midPoint;

            }
            ,
            /**
             * APIMethod: calculateParts
             * 通过控制点计算标绘扩展符号所有点 。
             * 每次调用此方法都会重置标绘扩展符号要素的geometry 。
             * 此方法需要子类实现
             */
            calculateParts: function () {
            }
            ,

            /**
             * Method: calculateVector
             * 计算和基准向量v夹角为a、长度为d的目标向量（理论上有两个，一左一右）
             *
             * Parameters:
             * v - {<SuperMap.Geometry.Point>} 基准向量
             * a - {Number} 目标向量和基准向量的夹角，默认为90度，这里的单位使用弧度
             * d - {Number} 目标向量的长度，即模，默认为1，即单位向量
             *
             * Returns:
             * {Array(<SuperMap.Geometry.Point>)} 回目标向量数组（就两个向量，一左一右）
             */
            calculateVector: function (v, a, d) {
                if (!a) a = Math.PI / 2;
                if (!d) d = 1;

                //定义目标向量的头部   x 坐标
                var x_1;
                var x_2;
                //定义目标向量的头部   y 坐标
                var y_1;
                var y_2;
                //定义目标向量，一左一右
                var v_l;
                var v_r;

                //计算基准向量v的模
                var d_v = Math.sqrt(v.x * v.x + v.y * v.y);

                //基准向量的斜率为0时，y值不能作为除数，所以需要特别处理
                if (v.y == 0) {
                    //计算x,会有两个值
                    x_1 = x_2 = d_v * d * Math.cos(a) / v.x;
                    //根据v.x的正负判断目标向量的左右之分
                    if (v.x > 0) {
                        //计算y
                        y_1 = Math.sqrt(d * d - x_1 * x_1);
                        y_2 = -y_1;
                    }
                    else if (v.x < 0) {
                        //计算y
                        y_2 = Math.sqrt(d * d - x_1 * x_1);
                        y_1 = -y_2;
                    }
                    v_l = new Point(x_1, y_1);
                    v_r = new Point(x_2, y_2);
                }
                //此为大多数情况
                else {
                    //转换为y=nx+m形式
                    var n = -v.x / v.y;
                    var m = d * d_v * Math.cos(a) / v.y;
                    //
                    //x*x + y*y = d*d
                    //转换为a*x*x + b*x + c = 0
                    var a = 1 + n * n;
                    var b = 2 * n * m;
                    var c = m * m - d * d;
                    //计算x,会有两个值
                    x_1 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
                    x_2 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
                    //计算y
                    y_1 = n * x_1 + m;
                    y_2 = n * x_2 + m;
                    //当向量向上时
                    if (v.y >= 0) {
                        v_l = new Point(x_1, y_1);
                        v_r = new Point(x_2, y_2);
                    }
                    //当向量向下时
                    else if (v.y < 0) {
                        v_l = new Point(x_2, y_2);
                        v_r = new Point(x_1, y_1);
                    }
                }
                return [v_l, v_r];
            }
            ,

            /**
             * Method: calculateIntersection
             * 计算两条直线的交点
             * 通过向量的思想进行计算，需要提供两个向量以及两条直线上各自一个点
             *
             * Parameters:
             * v_1 - {<SuperMap.Geometry.Point>} 直线1的向量
             * v_2 - {<SuperMap.Geometry.Point>} 直线2的向量
             * points1 - {<SuperMap.Geometry.Point>} 直线1上的任意一点
             * points2 - {<SuperMap.Geometry.Point>} 直线2上的任意一点
             *
             * Returns:
             * {Array(<SuperMap.Geometry.Point>)} 返回交点
             */
            calculateIntersection: function (v_1, v_2, point1, point2) {
                //定义交点的坐标
                var x;
                var y;
                //如果向量v_1和v_2平行
                if (v_1.y * v_2.x - v_1.x * v_2.y == 0) {
                    //平行也有两种情况
                    //同向
                    if (v_1.x * v_2.x > 0 || v_1.y * v_2.y > 0) {
                        //同向直接取两个点的中点
                        x = (point1.x + point2.x) / 2;
                        y = (point1.y + point2.y) / 2;
                    }
                    //反向
                    else {
                        //如果反向直接返回后面的点位置
                        x = point2.x;
                        y = point2.y;
                    }
                }
                else {
                    //
                    x = (v_1.x * v_2.x * (point2.y - point1.y) + point1.x * v_1.y * v_2.x - point2.x * v_2.y * v_1.x) / (v_1.y * v_2.x - v_1.x * v_2.y);
                    if (v_1.x != 0) {
                        y = (x - point1.x) * v_1.y / v_1.x + point1.y;
                    }
                    //不可能v_1.x和v_2.x同时为0
                    else {
                        y = (x - point2.x) * v_2.y / v_2.x + point2.y;
                    }
                }
                return new Point(x, y);

            }
            ,

            /**
             * Method: calculateAngularBisector
             * 计算两个向量的角平分线向量
             *
             * Parameters:
             * v1 - {<SuperMap.Geometry.Point>} 向量1
             * v2 - {<SuperMap.Geometry.Point>} 向量2
             *
             * Returns:
             * {Array(<SuperMap.Geometry.Point>)} 返回角平分线向量
             */
            calculateAngularBisector: function (v1, v2) {
                //计算角平分线的思想是取两个向量的单位向量，然后相加
                var d1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
                var d2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
                return new Point(v1.x / d1 + v2.x / d2, v1.y / d1 + v2.y / d2, mapGlobal.map.spatialReference);
            }
            ,

            /**
             * Method: calculateIntersectionFromTwoCorner
             * 通过三角形的底边两端点坐标以及底边两夹角，计算第三个点坐标
             *
             * Parameters:
             * pointS - {<SuperMap.Geometry.Point>} 底边第一个点
             * pointE - {<SuperMap.Geometry.Point>} 底边第二个点
             * a_S - {Number} 底边和第一个点所在的另一条边的夹角
             * a_E - {Number} 底边和第二个点所在的另一条边的夹角
             *
             * Returns:
             * {Array(<SuperMap.Geometry.Point>)} 返回顶点（理论上存在两个值）
             */
            calculateIntersectionFromTwoCorner: function (pointS, pointE, a_S, a_E) {
                if (!a_S) a_S = Math.PI / 4;
                if (!a_E) a_E = Math.PI / 4;

                //起始点、结束点、交点加起来三个点，形成一个三角形
                //斜边（起始点到结束点）的向量为
                var v_SE = new Point(pointE.x - pointS.x, pointE.y - pointS.y, mapGlobal.map.spatialReference);
                //计算起始点、交点的单位向量
                var v_SI_lr = this.calculateVector(v_SE, a_S, 1);
                //获取
                var v_SI_l = v_SI_lr[0];
                var v_SI_r = v_SI_lr[1];
                //计算结束点、交点的单位向量
                var v_EI_lr = this.calculateVector(v_SE, Math.PI - a_S, 1);
                //获取
                var v_EI_l = v_EI_lr[0];
                var v_EI_r = v_EI_lr[1];
                //求左边的交点
                var pointI_l = this.calculateIntersection(v_SI_l, v_EI_l, pointS, pointE);
                //计算右边的交点
                var pointI_r = this.calculateIntersection(v_SI_r, v_EI_r, pointS, pointE);
                return [pointI_l, pointI_r];
            }
            ,

            /**
             * Method: calculateDistance
             * 计算两点间的距离
             *
             * Parameters:
             * pointA - {<SuperMap.Geometry.Point>} 第一个点
             * pointB -  {<SuperMap.Geometry.Point>} 第二个点
             *
             * Returns:
             * {<SuperMap.Geometry.Point>} 返回两点间的距离值
             */
            calculateDistance: function (pointA, pointB) {
                var distance = Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
                return distance;

            }
            ,


            /**
             * Method: calculateArc
             * 根据圆心、半径，与X轴的起点角和终点角计算圆弧。
             *
             * Parameters:
             * center - {<SuperMap.Geometry.Point>} 圆心
             * radius - {Number}半径
             * startAngle - {Number}起点角,范围为0到2π。
             * endAngle - {Number}终点角,范围为0到2π。
             * direction - {Number}从起点到终点的方向，其值为1：逆时针，其值为-1：顺时针。默认为1，即逆时针。
             * sides - {Number}圆弧所在圆的点数，默认为360个，即每1°一个点。
             *
             * Returns:
             * {Array(<SuperMap.Geometry.Point>)} 圆弧上的点数组
             */
            calculateArc: function (center, radius, startAngle, endAngle, direction, sides) {
                if (!direction || (direction != 1 && direction != -1)) direction = -1;
                if (!sides) sides = 360;
                var step = Math.PI / sides / 2;
                var stepDir = step * direction;
                var length = Math.abs(endAngle - startAngle);
                var points = [];
                for (var radians = startAngle, i = 0; i < length; i += step) {
                    var circlePoint = new Point(Math.cos(radians) * radius + center.x, Math.sin(radians) * radius + center.y);
                    points.push(circlePoint);
                    radians += stepDir;
                    radians = radians < 0 ? (radians + 2 * Math.PI) : radians;
                    radians = radians > 2 * Math.PI ? (radians - 2 * Math.PI) : radians;
                }
                return points;
            }
        }
    ;

    return mapUtil;
});