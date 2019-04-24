/**
 * 依据不同的mapConfig加载地图
 * 适用于多个模块使用地图，各个地图独立
 * 每个地图需要一个html,一个mainMap,一个mapConfig
 */
require(["RXMap/loadMap",
        "RXMap/mapConfig2"],
    function (LoadMap,mapConfig) {
    var tool = {
        init: function () {
            LoadMap.init("mainMap","map2",mapConfig);
        }
    };
    tool.init();
});
