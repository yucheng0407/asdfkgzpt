var regiontemplate;
var queryway;
var querywayArr = ["RECTANGLE","CIRCLE","POLYGON"];
$(function(){

    //视图初始化
    regiontemplate = new Rxvm({
        el: '.regioncom',
        template: '#regiontemplate',
        config: config
    });
});

function mapQuery(type){
    if(queryway!=type)

    {//更改选中样式
        $('#queryway'+type)[0].className = 'selected_icon';
        querywayArr.forEach(function(it){
            if(it!=type)
                $('#queryway'+it)[0].className = '';

        });
    }
    //激活地图绘制事件
    queryFormMap(type);
}

//发送指令事件
function send(){
}
