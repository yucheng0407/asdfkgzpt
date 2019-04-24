/**
 * 业务和地图交互操作
 */
var mapGlobal;
var dragCircle;
var drawTool;
getMap({
    list: ["RXMap/dragCircle", "RXMap/mapGlobal", "RXMap/drawTool", "RXMap/layerControl", "RXMap/graphicTool", "RXMap/baseTool","RXMap/dragCircle"],
    callBack: function (global) {
        mapGlobal = global.MapGlobal;
        dragCircle = global.DragCircle;
        drawTool = global.DrawTool;
    }
});

//激活范围查询
function queryFormMap(type,callback){
    //针对绘制的范围先进行移除
    var layer = mapGlobal.map.getLayer("draw");
    if(layer){
        layer.clear();
    }
    drawTool.draw(type,function(evt){
        startQuery(evt.geometry,callback);
    });
}
//开始范围查询接收人员
function startQuery(geometry,callback){

}


