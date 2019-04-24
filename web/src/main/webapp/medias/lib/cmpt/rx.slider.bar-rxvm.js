/**
 * 滑动条(组件案例)
 */
(function () {

    RX.SliderBar = {
        defaultTemplate: "loadTpl:sliderBarTpl",
        data:{
            text:0,
            min:0,
            max:10,
            changeFunc:null
        },
        methods: {
            changeText:function(){
                var text = parseInt(this.get("text"),10);
                var min = parseInt(this.get("min"),10),
                    max = parseInt(this.get("max"),10);
                if(isNaN(text)){
                    RX.msg(RX.ICON_ERROR,"请输入数字");
                    this.set("text",min);
                }else if(text < min){
                    RX.msg(RX.ICON_ERROR,"请输入"+min+"至"+max+"之间的值");
                    this.set("text",min);
                }else if(text > max){
                    RX.msg(RX.ICON_ERROR,"请输入"+min+"至"+max+"之间的值");
                    this.set("text",max);
                }
                //执行改变函数
                this.runChangeFunc();
                //重新渲染renderBar
                this.renderBar();
            },
            runChangeFunc:function(){
                var changeFunc = this.get("changeFunc");
                if(typeof changeFunc === "function"){
                    changeFunc.call(this);
                }else if(typeof changeFunc === "string"){
                    changeFunc = window[changeFunc];
                    if(typeof changeFunc === "function"){
                        changeFunc.call(this);
                    }
                }
            },
            renderBar: function(){
                var that = this;
                var text = parseInt(this.get("text"), 10);
                var min = parseInt(this.get("min"),10),
                    max = parseInt(this.get("max"),10);
                if(isNaN(min)){
                    min = 0;
                    this.set("min",min);
                }
                if(isNaN(max)){
                    max = min+1;
                    this.set("max",max);
                }
                if(isNaN(text)){
                    text = min;
                }else{
                    $(this.$node.el).find(".slider_bar_box").slider({
                        range: "min",
                        value: text,
                        min: min,
                        max: max,
                        slide: function( event, ui ) {
                            if(that.get("text") != ui.value){
                                that.set("text",ui.value);
                                setTimeout(function(){that.runChangeFunc();},0);
                            }
                        }
                    });
                }
            }
        },
        afterRender: function(){
            this.renderBar();
        }
    };

    Rxvm.component('SliderBar', RX.SliderBar);

}).call(window);

