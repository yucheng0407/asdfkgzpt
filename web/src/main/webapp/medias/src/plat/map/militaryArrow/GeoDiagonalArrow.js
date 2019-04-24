define([
    "RXMap/mapGlobal",
    "RXMap/mapUtil",
    'esri/geometry/Point',
    "esri/symbols/SimpleFillSymbol",
    'esri/geometry/Polygon'
], function (mapGlobal, MapUtil, Point, SimpleFillSymbol, Polygon) {
    var GeoDiagonalArrow = {
        /**
         * Property: _ratio
         * 箭头长度与宽度的比值，箭头三角形需要占用总长度的1/_ratio
         */
        _ratio: 6,

        /**
         * 获取斜箭头
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
         * 计算两个控制点时直箭头的所有绘制点
         * 两个控制点的直箭头绘制点只需要7个就可以构成
         */
        _getPolygonBy2Pt: function (tempControlPt) {
            var controlPois = tempControlPt;
            //取出首尾两个点
            var pointS = controlPois[0];
            var pointE = controlPois[1];
            //计算箭头总长度
            var l = Math.sqrt((pointE.y - pointS.y) * (pointE.y - pointS.y) + (pointE.x - pointS.x) * (pointE.x - pointS.x));
            //计算直箭头的宽
            var w = l / this._ratio;

            //计算三角形的底边中心点坐标
            var x_ = pointS.x + (pointE.x - pointS.x) * (this._ratio - 1) / this._ratio;
            var y_ = pointS.y + (pointE.y - pointS.y) * (this._ratio - 1) / this._ratio;

            //计算
            var v_lr_ = MapUtil.calculateVector(new Point(pointE.x - pointS.x, pointE.y - pointS.y), Math.PI / 2, w / 2);
            //获取左边尾部向量
            var v_l_ = v_lr_[0];
            //获取右边尾部向量
            var v_r_ = v_lr_[1];
            //获取左边尾部点
            var point_l = new Point(v_l_.x + pointS.x, v_l_.y + pointS.y);
            //获取右边尾部点
            var point_r = new Point(v_r_.x + pointS.x, v_r_.y + pointS.y);

            var point_h_l = new Point(v_l_.x / this._ratio + x_, v_l_.y / this._ratio + y_);
            var point_h_r = new Point(v_r_.x / this._ratio + x_, v_r_.y / this._ratio + y_);

            //计算三角形左边点
            var point_a_l = new Point(point_h_l.x * 2 - point_h_r.x, point_h_l.y * 2 - point_h_r.y);
            //计算三角形右边点
            var point_a_r = new Point(point_h_r.x * 2 - point_h_l.x, point_h_r.y * 2 - point_h_l.y);

            var poly = new Polygon(mapGlobal.map.spatialReference);
            var pts = [point_l, point_h_l, point_a_l, pointE, point_a_r, point_h_r, point_r];
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
            //计算直箭头的宽
            var w = 0;
            for (var i = 0; i < controlPois.length - 1; i++) {
                //取出首尾两个点
                var pointS = controlPois[i];
                var pointE = controlPois[i + 1];
                l += Math.sqrt((pointE.y - pointS.y) * (pointE.y - pointS.y) + (pointE.x - pointS.x) * (pointE.x - pointS.x));
            }
            w = l / this._ratio;

            var a = Math.atan(w / (2 * l));

            //定义左右控制点集合
            var points_C_l = [];
            var points_C_r = [];
            //定义尾部左右的起始点
            var point_t_l = new Point();
            var point_t_r = new Point();


            //计算中间的所有交点
            for (var j = 0; j < controlPois.length - 2; j++) {
                var pointU_1 = controlPois[j];//第一个用户传入的点
                var pointU_2 = controlPois[j + 1];//第二个用户传入的点
                var pointU_3 = controlPois[j + 2];//第三个用户传入的点

                //计算向量
                var v_U_1_2 = new Point(pointU_2.x - pointU_1.x, pointU_2.y - pointU_1.y);
                var v_U_2_3 = new Point(pointU_3.x - pointU_2.x, pointU_3.y - pointU_2.y);


                //定义左边第一个控制点
                var point_l_1 = new Point();
                //定义右边第一个控制点
                var point_r_1 = new Point();
                //如果j=0时，左右第一个控制点需要计算
                if (j == 0) {
                    var v_lr_ = MapUtil.calculateVector(v_U_1_2, Math.PI / 2, w / 2);
                    //获取左边尾部点
                    var v_l_ = v_lr_[0];
                    //获取右边尾部点
                    var v_r_ = v_lr_[1];
                    //获取左边尾部点
                    point_t_l = point_l_1 = new Point(v_l_.x + pointU_1.x, v_l_.y + pointU_1.y);
                    //获取右边尾部点
                    point_t_r = point_r_1 = new Point(v_r_.x + pointU_1.x, v_r_.y + pointU_1.y);
                }
                //否则获取上一次的记录
                else {
                    point_l_1 = points_C_l[points_C_l.length - 1];
                    point_r_1 = points_C_r[points_C_r.length - 1];
                }
                var v_lr = MapUtil.calculateVector(v_U_1_2, a, 1);
                //这里的向量需要反过来
                //获取左边向量
                var v_l = v_lr[1];
                //获取右边向量
                var v_r = v_lr[0];
                //定义角平分线向量
                var v_angularBisector = MapUtil.calculateAngularBisector(new Point(-v_U_1_2.x, -v_U_1_2.y), v_U_2_3);
                //求交点
                //计算左边第二个控制点
                var point_l_2 = MapUtil.calculateIntersection(v_l, v_angularBisector, point_l_1, pointU_2);
                var point_r_2 = MapUtil.calculateIntersection(v_r, v_angularBisector, point_r_1, pointU_2);


                //添加后面的拐角控制点
                points_C_l.push(new Point((point_l_1.x + point_l_2.x) / 2, (point_l_1.y + point_l_2.y) / 2));
                points_C_l.push(point_l_2);
                points_C_r.push(new Point((point_r_1.x + point_r_2.x) / 2, (point_r_1.y + point_r_2.y) / 2));
                points_C_r.push(point_r_2);
            }

            //进入计算头部
            //计算一下头部的长度
            var pointU_E2 = controlPois[controlPois.length - 2];//倒数第二个用户点
            var pointU_E1 = controlPois[controlPois.length - 1];//最后一个用户点
            var head_d = Math.sqrt((pointU_E2.x - pointU_E1.x) * (pointU_E2.x - pointU_E1.x) + (pointU_E2.y - pointU_E1.y) * (pointU_E2.y - pointU_E1.y));
            //定义头部的左右两结束点
            var point_h_l = new Point();
            var point_h_r = new Point();
            //三角形左右两点数组
            var point_lr_t = [];
            //定义曲线最后一个控制点，也就是头部结束点和最后一个拐角点的中点
            var point_C_l_e = new Point();
            var point_C_r_e = new Point();
            //定义三角形的左右两个点
            var point_triangle_l = new Point();
            var point_triangle_r = new Point();

            //获取当前的最后的控制点，也就是之前计算的拐角点
            var point_C_l_eq = points_C_l[points_C_l.length - 1];
            var point_C_r_eq = points_C_r[points_C_r.length - 1];
            //申明三角形的两边向量
            var v_l_t = new Point();
            var v_r_t = new Point();
            //三角的高度都不够
            if (head_d <= w) {
                point_lr_t = MapUtil.calculateVector(new Point(pointU_E1.x - pointU_E2.x, pointU_E1.y - pointU_E2.y), Math.PI / 2, w / 2);
                //获取三角形左右两个向量
                v_l_t = point_lr_t[0];
                v_r_t = point_lr_t[1];

                point_h_l = new Point(v_l_t.x / this._ratio + pointU_E2.x, v_l_t.y / this._ratio + pointU_E2.y);
                point_h_r = new Point(v_r_t.x / this._ratio + pointU_E2.x, v_r_t.y / this._ratio + pointU_E2.y);
                //计算三角形的左右两点
                point_triangle_l = new Point(point_h_l.x * 2 - point_h_r.x, point_h_l.y * 2 - point_h_r.y);
                point_triangle_r = new Point(point_h_r.x * 2 - point_h_l.x, point_h_r.y * 2 - point_h_l.y);


                //计算最后的控制点
                point_C_l_e = new Point((point_C_l_eq.x + point_h_l.x) / 2, (point_C_l_eq.y + point_h_l.y) / 2);
                point_C_r_e = new Point((point_C_r_eq.x + point_h_r.x) / 2, (point_C_r_eq.y + point_h_r.y) / 2);

                //添加最后的控制点（中心点）
                points_C_l.push(point_C_l_e);
                points_C_r.push(point_C_r_e);

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
                point_lr_t = MapUtil.calculateVector(new Point(pointU_E1.x - point_c.x, pointU_E1.y - point_c.y), Math.PI / 2, w / 2);
                //获取三角形左右两个向量
                v_l_t = point_lr_t[0];
                v_r_t = point_lr_t[1];

                point_h_l = new Point(v_l_t.x / this._ratio + point_c.x, v_l_t.y / this._ratio + point_c.y);
                point_h_r = new Point(v_r_t.x / this._ratio + point_c.x, v_r_t.y / this._ratio + point_c.y);
                //计算三角形的左右两点
                point_triangle_l = new Point(point_h_l.x * 2 - point_h_r.x, point_h_l.y * 2 - point_h_r.y);
                point_triangle_r = new Point(point_h_r.x * 2 - point_h_l.x, point_h_r.y * 2 - point_h_l.y);

                //计算最后的控制点
                point_C_l_e = new Point((point_C_l_eq.x + point_h_l.x) / 2, (point_C_l_eq.y + point_h_l.y) / 2);
                point_C_r_e = new Point((point_C_r_eq.x + point_h_r.x) / 2, (point_C_r_eq.y + point_h_r.y) / 2);

                //添加最后的控制点（中心点）
                points_C_l.push(point_C_l_e);
                points_C_r.push(point_C_r_e);
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
            //合并右边的所有点
            for (var k = points_BC_r.length - 1; k >= 0; k--) {
                pointsR.push(points_BC_r[k]);
            }
            //添加右边尾部起始点
            pointsR.push(point_t_r);

            var poly = new Polygon(mapGlobal.map.spatialReference);
            var rings = [];
            for (var i = 0; i < pointsR.length; i++) {
                rings.push([pointsR[i].x, pointsR[i].y]);
            }
            poly.addRing(rings);
            return poly;
        }
    };

    return GeoDiagonalArrow;
});