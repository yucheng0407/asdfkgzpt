
/**
 * 地图配置
 */
define([], function () {
    var mapConfig = {
        //底图
        baseMap: [
            {
                id: "PGIS",
                name: "矢量",
                origin: {
                    "x": -180,
                    "y": 90
                },
                url: "http://192.168.0.117:8080/asstd/",
                type: "PGISLayer",
                imgUrl: "/asdfkgzpt/medias/src/plat/map/mapCss/img/map.png"
            }
            // ,
            // {
            //     id: "dark",
            //     name: "影像",
            //     origin: {
            //         "x": -180,
            //         "y": 90
            //     },
            //     url: "http://53.80.0.241:8080/tdtimg/",
            //     type: "PGISLayer",
            //     imgUrl: "/asdfkgzpt/medias/src/plat/map/mapCss/img/wxmap.png"
            // }
            //下面两种是安顺地图，安顺项目把这两个加上
            // {
            //     id: "ASVec",
            //     name: "矢量",
            //     origin: {
            //         "x": -180,
            //         "y": 90
            //     },
            //     url: "http://10.164.0.84:7001/PGIS_S_TileMapServer/Maps/sl",
            //     type: "ASLayer",
            //     imgUrl: "/asdfkgzpt/medias/src/plat/map/mapCss/img/map.png"
            // }
            // , {
            //     id: "ASImg",
            //     name: "影像",
            //     origin: {
            //         "x": -180,
            //         "y": 90
            //     },
            //     url: "http://10.164.0.84:7001/PGIS_S_TileMapServer/Maps/sy",
            //     type: "ASLayer",
            //     imgUrl: "/asdfkgzpt/medias/src/plat/map/mapCss/img/wxmap.png"
            // }

        ],
        //中心点
        // centerX: 118.386,//芜湖
        // centerY: 31.336,
        centerX: 105.9503,//安顺
        centerY: 25.9564,
        maxZoom:15,//最大层级
        mapWkid:4326,//设置坐标系
        //MBR
        MBR: [117.42, 30.668, 118.821, 31.579],
        //是否有从属地图
        hasSubMap: false,
        //地图聚类开始层级
        levelSegmentation:13,
        //扩展工具
        extentTools: [
            // {
            //     tool:"export",
            //     icon:"&#xe664;"
            // },
            // {
            //     tool:"print",
            //     icon:"&#xe66e;"
            // }
        ],
        //graphic图层
        graphicLayers: [
            {
                id: "gl_hl"   //高亮图层
            },
            {
                id: "pointMove",    //绘制
                showMoveInfoWindow: true
            },
            {
                id: "dragCircle",    //绘制
                showMoveInfoWindow: true
            },
            {
                id: "draw",    //绘制
                showMoveInfoWindow: true,
                showClickInfoWindow:true
            },
            {
                id: "label"    //注记
            },
            {
                id: "sp"    //注记
            },
            {
                id: "notClear"    //不清除图层
            },
            {
                id: "aroundResource",   //绘制
                showMoveInfoWindow: true,
                showClickInfoWindow:true
            }
        ],
        //graphicLayerGroups
        graphicLayerGroups:
            {
                "jqmx": [
                    {
                        id: "zdjq",   //重点警情
                        showMoveInfoWindow: true,
                        showClickInfoWindow:true
                    },
                    {
                        id: "hj",    //火警
                        showMoveInfoWindow: true,
                        showClickInfoWindow:true
                    },
                    {
                        id: "jtsg",    //交通事故
                        showMoveInfoWindow: true,
                        showClickInfoWindow:true
                    },
                    {
                        id: "ybjq",    //一般警情
                        showMoveInfoWindow: true,
                        showClickInfoWindow:true
                    }
                ],
                "jjy": [
                    {
                        id: "jjyLayer",   //绘制
                        showMoveInfoWindow: true
                    }
                ],
                "policeForce": [ //警力警情
                    {
                        id: "policeForceLayer",   //绘制
                        showMoveInfoWindow: true,
                        showClickInfoWindow:true
                    }
                ],
                "fastSearch": [ //快速搜索
                    {
                        id: "fastSearchLayer",   //绘制
                        showMoveInfoWindow: true,
                        showClickInfoWindow:true
                    }
                ],
                // "aroundResource": [ //周边资源
                //     {
                //         id: "aroundResource",   //绘制
                //         showMoveInfoWindow: true,
                //         showClickInfoWindow:true
                //     }
                // ],
                "xfjl":[
                    {
                        id: "xfjl",   //绘制
                        showMoveInfoWindow: true
                    }
                ],
                "lxjk": [
                    {
                        id: "lxjk",   //绘制
                        showMoveInfoWindow: true,
                        showClickInfoWindow:true,
                        clickInfoWindowWidth:300,
                        clickInfoWindowHeight:100
                    }
                ]

            }
    }
    return mapConfig;
});