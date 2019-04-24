/**
 * Created by PAQ on 2018/3/12.
 * ArcGIS调用省厅地图服务（超图发布）
 * 各级比例尺与分辨率来源于网页中的内容：http://53.1.238.17/iserver/services/map-pgisvec/rest/maps/pgisvec.leaflet
 */
define(["dojo/_base/declare","esri/layers/tiled"],
    function (declare) {
        return declare(esri.layers.TiledMapServiceLayer, {
            constructor: function () {
                this.spatialReference = new esri.SpatialReference({ wkid: 4326 });
                this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-360.0, -180.0, 360.0, 180.0, this.spatialReference));
                this.tileInfo = new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "compressionQuality": 0,
                    "origin": {
                        "x": -180,
                        "y": 90
                    },
                    "spatialReference": {
                        "wkid": 4326
                    },
                    "lods": [
                        {"level": 0, "resolution": 0.703125000000001, "scale": 0.001772264957256825},
                        {"level": 1, "resolution": 0.3515625000000005, "scale": 8.86132478628411E-4},
                        {"level": 2, "resolution": 0.17578124999999997, "scale":  4.430662393142055E-4},
                        {"level": 3, "resolution": 0.08789062499999999, "scale": 2.2153311965710323E-4},
                        {"level": 4, "resolution": 0.04394531250000012, "scale": 1.1076655982855162E-4},
                        {"level": 5, "resolution": 0.02197265625000001, "scale": 5.538327991427581E-5},
                        {"level": 6, "resolution": 0.010986328125000005, "scale": 2.7691639957137904E-5},
                        {"level": 7, "resolution": 0.0054931640624999905, "scale": 1.3845819978568952E-5},
                        {"level": 8, "resolution": 0.0027465820312500074, "scale": 6.9229099892844565E-6},
                        {"level": 9, "resolution": 0.0013732910156250013, "scale": 3.4614549946422405E-6},
                        {"level": 10, "resolution": 6.866455078124993E-4, "scale": 1.7307274973211173E-6},
                        {"level": 11, "resolution": 3.433227539062509E-4, "scale": 8.653637486605571E-7},
                        {"level": 12, "resolution": 1.7166137695312497E-4, "scale": 4.3268187433028044E-7},
                        {"level": 13, "resolution": 8.583068847656249E-5, "scale": 2.1634093716513974E-7},
                        {"level": 14, "resolution": 4.291534423828124E-5, "scale": 1.0817046858256987E-7},
                        {"level": 15, "resolution": 2.145767211914062E-5, "scale": 5.4085234291284816E-8},
                        {"level": 16, "resolution": 1.072883605957031E-5, "scale": 2.7042617145642484E-8},
                        {"level": 17, "resolution": 5.364418029785166E-6, "scale": 1.3521308572821242E-8},
                        {"level": 18, "resolution": 2.682209014892583E-6, "scale": 6.760654286410611E-9},
                        {"level": 19, "resolution": 1.3411045074462895E-6, "scale": 3.3803271432053056E-9}
                    ]
                });
                
                this.visibleScales=[3.3803271432053056E-9, 6.760654286410611E-9, 1.3521308572821242E-8, 2.7042617145642484E-8, 5.4085234291284816E-8, 1.0817046858256987E-7, 2.1634093716513974E-7, 4.3268187433028044E-7, 8.653637486605571E-7, 1.7307274973211173E-6, 3.4614549946422405E-6, 6.9229099892844565E-6, 1.3845819978568952E-5, 2.7691639957137904E-5, 5.538327991427581E-5, 1.1076655982855162E-4, 2.2153311965710323E-4, 4.430662393142055E-4, 8.86132478628411E-4, 0.001772264957256825],


                this.loaded = true;
                this.onLoad(this);
            },

            getTileUrl: function (level, row, col) {                
               var r=row;
               var c=col;
               var scale=this.visibleScales[level];

                // return "http://53.1.238.17//iserver/services/map-pgisvec/rest/maps/pgisvec/tileImage.png?width=256&height=256&redirect=false&transparent=false&cacheEnabled=true&origin=%7B%22x%22:-180,%22y%22:90%7D&overlapDisplayed=false&scale="+scale+"&x="+c+"&y="+r;
                return "http://53.1.238.17/iserver/services/map-bigdata/rest/maps/bigdata/tileImage.png?width=256&height=256&redirect=false&transparent=false&cacheEnabled=true&origin=%7B%22x%22:-180,%22y%22:90%7D&overlapDisplayed=false&scale="+scale+"&x="+c+"&y="+r;

            }

        });
    });