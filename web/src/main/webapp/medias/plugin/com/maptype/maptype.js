/**
 * Created by Administrator on 2017/10/19.
 */
var maptype={
    init:function(){debugger;
        var me=this;
        me._fillHtml();
        me._bindEvents();
    },
    _fillHtml:function(){
        var me=this;
        $("#maptype").html('<div class="maptypeCard m1"><span>全景</span></div><div id="div2"><div class="maptypeCard m2"><span>卫星</span></div><div class="maptypeCard m3"><span>地图</span></div></div>');
    },

    _bindEvents:function(){
        var me=this;
        $("#maptype").mouseenter(function(){
            $(".maptype").animate({
                width:'300px'
            }, 500);
            $("#div2").animate({
               width:'show'
           }, 500);
        });

        $("#maptype").mouseleave(function(){
            $(".maptype").animate({
                width:'110px'
            }, 500);
            $("#div2").animate({
               width:'hide'
           }, 500);
        });
    }
};
maptype.init();