define([
    "RXMap/mapGlobal",
    "RXMap/mapUtil",
    'esri/geometry/Point',
    "esri/symbols/SimpleFillSymbol",
    'esri/geometry/Polygon'
], function (mapGlobal, MapUtil, Point, SimpleFillSymbol, Polygon) {
    var GeoDoveTailStraightArrow = {
        /**
         * Property: _ratio
         * 箭头长度与宽度的比值，箭头三角形需要占用总长度的1/_ratio
         */
        _ratio: 6,

        /**
         * Property: _tailRatio
         * 箭头起始两个节点长度与箭头尾巴的比值
         */
        _tailRatio: 5,

        /**
         * 获取燕尾直箭头
         * @param tempControlPt
         */
        getPolygon: function (tempControlPt) {
            var me = this;
            var polygon = null;
            if (tempControlPt.length == 2) {
                polygon = me._getPolygonBy2Pt(tempControlPt);
            } else if (tempControlPt.length > 2) {
                polygon = me._getPolygonByManyPt(tempControlPt);
            }
            return polygon;
        },

        /**
         * 计算两个控制点时燕尾直箭头的所有绘制点
         * 两个控制点的燕尾直箭头绘制点只需要7个就可以构成
         */
        _getPolygonBy2Pt: function (tempControlPt) {
            var controlPois = tempControlPt;
            //取出第一和第二两个点
            var pointS = controlPois[0];
            var pointE = controlPois[1];
            //计算箭头总长度，即两个控制点的距离
            var l = Math.sqrt((pointE.y - pointS.y) * (pointE.y - pointS.y) + (pointE.x - pointS.x) * (pointE.x - pointS.x));
            //计算燕尾直箭头的宽
            var w = l / this._ratio;

            //计算三角形的底边中心点坐标
            var x_ = pointS.x + (pointE.x - pointS.x) * (this._ratio - 1) / this._ratio;
            var y_ = pointS.y + (pointE.y - pointS.y) * (this._ratio - 1) / this._ratio;
            //计算与基本向量夹角90度的，长度为w/2的向量数组
            var v_lr = MapUtil.calculateVector(new Point(pointE.x - pointS.x, pointE.y - pointS.y), Math.PI / 2, w / 2);
            //获取左右向量
            var v_l = v_lr[0];
            var v_r = v_lr[1];
            //左1点
            var point1 = new Point(pointS.x + v_l.x, pointS.y + v_l.y);
            //左2点
            var point2 = new Point(x_ + point1.x - pointS.x, y_ + point1.y - pointS.y);
            //左3点
            var point3 = new Point(2 * point2.x - x_, 2 * point2.y - y_);
            //顶点
            var point4 = new Point(pointE.x, pointE.y);
            //右3点
            var point7 = new Point(pointS.x + v_r.x, pointS.y + v_r.y);
            //右2点
            var point6 = new Point(x_ + point7.x - pointS.x, y_ + point7.y - pointS.y);
            //右1点
            var point5 = new Point(2 * point6.x - x_, 2 * point6.y - y_);
            //在尾部两个中间插入一个点，是pointS往pointE平移的一个点，为了制作尾巴的效果
            var point_tail = new Point((pointE.x - pointS.x) / this._tailRatio + pointS.x, (pointE.y - pointS.y) / this._tailRatio + pointS.y);

            var poly = new Polygon(mapGlobal.map.spatialReference);
            var pts = [point_tail, point1, point2, point3, point4, point5, point6, point7];
            var rings = [];
            for (var i = 0; i < pts.length; i++) {
                rings.push([pts[i].x, pts[i].y]);
            }
            poly.addRing(rings);
            return poly;
        },

        /**
         * 计算三个或三个以上的控制点时的所有绘制点
         * 由于中间的控制点之间会进行差值，产生曲线效果，所以所需绘制点会很多
         * 这里使用的思想是将所有用户控制点连接起来形成一条折线段，
         * 然后在拐角进行曲线化处理（二次贝塞尔曲线差值），就形成了效果比较好的箭头
         *
         */
        _getPolygonByManyPt: function (tempControlPt) {
            var controlPois = tempControlPt;

            //计算箭头总长度
            var l = 0;
            //计算燕尾直箭头的宽
            var w = 0;
            //在尾部两个中间插入一个点，是pointS往pointE平移的一个点，为了制作尾巴的效果
            var point_tail;
            for (var i = 0; i < controlPois.length - 1; i++) {
                //取出首尾两个点
                var pointS = controlPois[i];
                var pointE = controlPois[i + 1];
                l += Math.sqrt((pointE.y - pointS.y) * (pointE.y - pointS.y) + (pointE.x - pointS.x) * (pointE.x - pointS.x));
                if (i == 0) {
                    point_tail = new Point((pointE.x - pointS.x) / this._tailRatio + pointS.x, (pointE.y - pointS.y) / this._tailRatio + pointS.y);
                }
            }
            w = l / this._ratio;
            //定义左右控制点集合
            var points_C_l = [];
            var points_C_r = [];
            //定义尾部左右的起始点
            var point_t_l = Point();
            var point_t_r = Point();
            //计算中间的所有交点
            for (var j = 0; j < controlPois.length - 2; j++) {
                var pointU_1 = controlPois[j];//第一个用户传入的点
                var pointU_2 = controlPois[j + 1];//第二个用户传入的点
                var pointU_3 = controlPois[j + 2];//第三个用户传入的点

                //计算向量
                var v_U_1_2 = new Point(pointU_2.x - pointU_1.x, pointU_2.y - pointU_1.y);
                var v_U_2_3 = new Point(pointU_3.x - pointU_2.x, pointU_3.y - pointU_2.y);

                var v_lr_1_2 = MapUtil.calculateVector(v_U_1_2, Math.PI / 2, w / 2);
                var v_l_1_2 = v_lr_1_2[0];
                var v_r_1_2 = v_lr_1_2[1];
                var v_lr_2_3 = MapUtil.calculateVector(v_U_2_3, Math.PI / 2, w / 2);
                var v_l_2_3 = v_lr_2_3[0];
                var v_r_2_3 = v_lr_2_3[1];
                //获取左右
                var point_l_1 = new Point(pointU_1.x + v_l_1_2.x, pointU_1.y + v_l_1_2.y);
                var point_r_1 = new Point(pointU_1.x + v_r_1_2.x, pointU_1.y + v_r_1_2.y);
                var point_l_2 = new Point(pointU_2.x + v_l_2_3.x, pointU_2.y + v_l_2_3.y);
                var point_r_2 = new Point(pointU_2.x + v_r_2_3.x, pointU_2.y + v_r_2_3.y);
                //向量v_U_1_2和向量v-point_l_1和point_r_1是平行的
                //如果向量a=(x1，y1)，b=(x2，y2)，则a//b等价于x1y2－x2y1=0
                //得到(x-point_l_1.x)*v_U_1_2.y=v_U_1_2.x*(y-point_l_1.y)
                //得到(point_l_2.x-x)*v_U_2_3.y=v_U_2_3.x*(point_l_2.y-y)
                //可以求出坐边的交点(x,y)，即控制点
                var point_C_l = MapUtil.calculateIntersection(v_U_1_2, v_U_2_3, point_l_1, point_l_2);
                var point_C_r = MapUtil.calculateIntersection(v_U_1_2, v_U_2_3, point_r_1, point_r_2);
                //定义中间的控制点
                var point_C_l_c;
                var point_C_r_c;
                if (j == 0) {
                    //记录下箭头尾部的左右两个端点
                    point_t_l = point_l_1;
                    point_t_r = point_r_1;
                    //计算第一个曲线控制点
                    point_C_l_c = new Point((point_t_l.x + point_C_l.x) / 2, (point_t_l.y + point_C_l.y) / 2);
                    point_C_r_c = new Point((point_t_r.x + point_C_r.x) / 2, (point_t_r.y + point_C_r.y) / 2);
                    //添加两个拐角控制点中间的中间控制点
                    points_C_l.push(point_C_l_c);
                    points_C_r.push(point_C_r_c);
                }
                else {
                    //获取前一个拐角控制点
                    var point_C_l_q = points_C_l[points_C_l.length - 1];
                    var point_C_r_q = points_C_r[points_C_r.length - 1];
                    //计算两个拐角之间的中心控制点
                    point_C_l_c = new Point((point_C_l_q.x + point_C_l.x) / 2, (point_C_l_q.y + point_C_l.y) / 2);
                    point_C_r_c = new Point((point_C_r_q.x + point_C_r.x) / 2, (point_C_r_q.y + point_C_r.y) / 2);
                    //添加两个拐角控制点中间的中间控制点
                    points_C_l.push(point_C_l_c);
                    points_C_r.push(point_C_r_c);
                }
                //添加后面的拐角控制点
                points_C_l.push(point_C_l);
                points_C_r.push(point_C_r);
            }
            //计算

            //进入计算头部
            //计算一下头部的长度
            var pointU_E2 = controlPois[controlPois.length - 2];//倒数第二个用户点
            var pointU_E1 = controlPois[controlPois.length - 1];//最后一个用户点
            //
            var v_U_E2_E1 = new Point(pointU_E1.x - pointU_E2.x, pointU_E1.y - pointU_E2.y);
            var head_d = Math.sqrt(v_U_E2_E1.x * v_U_E2_E1.x + v_U_E2_E1.y * v_U_E2_E1.y);
            //定义头部的左右两结束点
            var point_h_l;
            var point_h_r;

            //头部左右两向量数组
            var v_lr_h = [];
            var v_l_h = Point();
            var v_r_h = Point();
            //定义曲线最后一个控制点，也就是头部结束点和最后一个拐角点的中点
            var point_C_l_e = Point();
            var point_C_r_e = Point();
            //定义三角形的左右两个点
            var point_triangle_l = Point();
            var point_triangle_r = Point();

            //获取当前的最后的控制点，也就是之前计算的拐角点
            var point_C_l_eq = points_C_l[points_C_l.length - 1];
            var point_C_r_eq = points_C_r[points_C_r.length - 1];

            //三角的高度都不够
            if (head_d <= w) {
                v_lr_h = MapUtil.calculateVector(v_U_E2_E1, Math.PI / 2, w / 2);
                v_l_h = v_lr_h[0];
                v_r_h = v_lr_h[1];
                //获取头部的左右两结束点
                point_h_l = new Point(pointU_E2.x + v_l_h.x, pointU_E2.y + v_l_h.y);
                point_h_r = new Point(pointU_E2.x + v_r_h.x, pointU_E2.y + v_r_h.y);


                //计算最后的控制点
                point_C_l_e = new Point((point_C_l_eq.x + point_h_l.x) / 2, (point_C_l_eq.y + point_h_l.y) / 2);
                point_C_r_e = new Point((point_C_r_eq.x + point_h_r.x) / 2, (point_C_r_eq.y + point_h_r.y) / 2);

                //添加最后的控制点（中心点）
                points_C_l.push(point_C_l_e);
                points_C_r.push(point_C_r_e);


                //计算三角形的左右两点
                point_triangle_l = new Point(2 * point_h_l.x - pointU_E2.x, 2 * point_h_l.y - pointU_E2.y);
                point_triangle_r = new Point(2 * point_h_r.x - pointU_E2.x, 2 * point_h_r.y - pointU_E2.y);
            }
            //足够三角的高度
            else {
                //由于够了三角的高度，所以首先去掉三角的高度

                //计算向量
                var v_E2_E1 = new Point(pointU_E1.x - pointU_E2.x, pointU_E1.y - pointU_E2.y);
                //取模
                var v_E2_E1_d = Math.sqrt(v_E2_E1.x * v_E2_E1.x + v_E2_E1.y * v_E2_E1.y);
                //首先需要计算三角形的底部中心点
                var point_c = new Point(pointU_E1.x - v_E2_E1.x * w / v_E2_E1_d, pointU_E1.y - v_E2_E1.y * w / v_E2_E1_d);
                //计算出在三角形上底边上头部结束点

                v_lr_h = MapUtil.calculateVector(v_U_E2_E1, Math.PI / 2, w / 2);
                v_l_h = v_lr_h[0];
                v_r_h = v_lr_h[1];
                //获取头部的左右两结束点
                point_h_l = new Point(point_c.x + v_l_h.x, point_c.y + v_l_h.y);
                point_h_r = new Point(point_c.x + v_r_h.x, point_c.y + v_r_h.y);

                //计算最后的控制点
                point_C_l_e = new Point((point_C_l_eq.x + point_h_l.x) / 2, (point_C_l_eq.y + point_h_l.y) / 2);
                point_C_r_e = new Point((point_C_r_eq.x + point_h_r.x) / 2, (point_C_r_eq.y + point_h_r.y) / 2);

                //添加最后的控制点（中心点）
                points_C_l.push(point_C_l_e);
                points_C_r.push(point_C_r_e);

                //计算三角形的左右点
                point_triangle_l = new Point(2 * point_h_l.x - point_c.x, 2 * point_h_l.y - point_c.y);
                point_triangle_r = new Point(2 * point_h_r.x - point_c.x, 2 * point_h_r.y - point_c.y);
            }

            //使用控制点计算差值
            //计算贝塞尔的控制点
            var points_BC_l = MapUtil.createBezier2(points_C_l);
            var points_BC_r = MapUtil.createBezier2(points_C_r);
            //组合左右点集和三角形三个点
            var pointsR = [point_t_l];
            //首先连接左边的差值曲线
            pointsR = pointsR.concat(points_BC_l);
            //添加左边头部结束点
            pointsR.push(point_h_l);
            //添加三角形左边点
            pointsR.push(point_triangle_l);
            //添加三角形顶点
            pointsR.push(pointU_E1);
            //添加三角形右边点
            pointsR.push(point_triangle_r);
            //添加右边头部结束点
            pointsR.push(point_h_r);
            //合并右边的所有点（先把右边的点倒序）
            pointsR = pointsR.concat(points_BC_r.reverse());

            //添加右边尾部起始点
            pointsR.push(point_t_r);
            //添加尾巴点
            pointsR.push(point_tail);

            var poly = new Polygon(mapGlobal.map.spatialReference);
            var rings = [];
            for (var i = 0; i < pointsR.length; i++) {
                rings.push([pointsR[i].x, pointsR[i].y]);
            }
            poly.addRing(rings);
            return poly;
        }
    };

    return GeoDoveTailStraightArrow;
});