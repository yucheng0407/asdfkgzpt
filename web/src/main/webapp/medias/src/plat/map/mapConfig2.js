/**
 * 地图配置
 */
define([], function() {
    var mapConfig = {
        //底图
        baseMap:[
            {
                id:"PGIS",
                name:"PGIS",
                origin:{
                    "x": -252.3165,
                    "y": 253.7895
                },
                url:"http://192.168.0.233/PGIS_S_FlexClient/bin?services=wuhu",
                type:"PGISLayer",
                imgUrl:"/asdfkgzpt/medias/src/plat/map/mapCss/img/map.png"
            },
            {
                id:"dark",
                name:"深色",
                url:"http://192.168.0.117:6080/arcgis/rest/services/research/wuhu_dark/MapServer",
                type:"ArcGISDynamicMapServiceLayer",
                imgUrl:"/asdfkgzpt/medias/src/plat/map/mapCss/img/wxmap.png"
            },
            {
                id:"light",
                name:"浅色",
                url:"http://192.168.0.117:6080/arcgis/rest/services/research/wuhu_light/MapServer",
                type:"ArcGISDynamicMapServiceLayer",
                imgUrl:"/asdfkgzpt/medias/src/plat/map/mapCss/img/map.png"
            }
        ],
        //中心点
        centerX:118.286,
        centerY:31.266,
        //MBR
        MBR:[117.42, 30.668, 118.821, 31.579],
        //是否有从属地图
        hasSubMap:false,
        //扩展工具
        extentTools:[
            {
                tool:"export",
                icon:"&#xe664;"
            },
            {
                tool:"print",
                icon:"&#xe66e;"
            }
        ],
        //graphic图层
        graphicLayers:[
            {
                id:"draw"
            }
        ]
    };

    return mapConfig;
});