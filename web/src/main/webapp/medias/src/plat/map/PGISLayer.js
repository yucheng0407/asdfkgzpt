/**
 * PGIS地图加载,芜湖,其余地市需要更换参数
 * Created by PAQ on 2017/12/21.
 */
define(["dojo/_base/declare", "RXMap/mapConfig","esri/layers/WebTiledLayer","esri/layers/tiled"],
    function (declare,mapConfig,WebTiledLayer) {
        return declare(WebTiledLayer, {
            url:null,
            id:null,
            constructor: function (url,id) {
                this.url=url;
                this.id=id;
                this.spatialReference = new esri.SpatialReference({wkid: 4326});
                this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-120.0, -90.0, 180.0, 90.0, this.spatialReference));
                this.tileInfo = new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "compressionQuality": 0,
                    "origin": {     //切片原点
                        "x": -252.3165,
                        "y": 253.7895
                    },
                    "spatialReference": {   //投影坐标系
                        "wkid": 4326
                    },
                    "lods": [     //层级、分辨率、比例尺
                        {"level": 4, "resolution": 0.123769981, "scale": 49152000},
                        {"level": 5, "resolution": 0.061884990, "scale": 24576000},
                        {"level": 6, "resolution": 0.030942495, "scale": 12288000},
                        {"level": 7, "resolution": 0.015471247, "scale": 6144000},
                        {"level": 8, "resolution": 0.007735623, "scale": 3072000},
                        {"level": 9, "resolution": 0.00386781191973003, "scale": 1536000},
                        {"level": 10, "resolution": 0.00193390595986501, "scale": 768000},
                        {"level": 11, "resolution": 0.000966952979932507, "scale": 384000},
                        {"level": 12, "resolution": 0.000483476489966253, "scale": 192000},
                        {"level": 13, "resolution": 0.000241738244983127, "scale": 96000},
                        {"level": 14, "resolution": 0.000120869122491563, "scale": 48000},
                        {"level": 15, "resolution": 6.04346e-005, "scale": 24000},
                        {"level": 16, "resolution": 3.02173e-005, "scale": 12000},
                        {"level": 17, "resolution": 1.51086e-005, "scale": 6000},
                        {"level": 18, "resolution": 7.55432e-006, "scale": 3000},
                        {"level": 19, "resolution": 3.77716e-006, "scale": 1500}
                    ]
                });
                this.loaded = true;
                this.onLoad(this);
            },

            //获取瓦片信息
            getTileUrl: function (level, row, col) {
                r = parseInt(Math.pow(2, level)) - 1 - row;
                c = col;
                return "http://192.168.0.117:8080/Java/proxy.jsp?"+this.url+"&row="+ r + "&col=" + c + "&level=" + level;
                // return "http://10.164.0.84:7001/PGIS_S_TileMapServer/Maps/sl/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col="+c+"&Row="+r+"&Zoom="+level+"&V=0.3&key=";
                //return "http://192.168.0.233/PGIS_S_FlexClient/bin?services=wuhu&row=" + r + "&col=" + c + "&level=" + level;
            }

        });
    });