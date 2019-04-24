$(function () {

    var id = RX.page.param.id || 0;
    // console.log(window.name + ":"+id);

    //实例化具体视图
    new Rxvm({
        //视图容器
        el: "#tabContent",
        //基础配置
        settings: {
            //获取数据
            getData: {
                url: "/config/getConfigListByType"
            }
        },
        //视图方法
        methods:{
            //编辑配置事件响应
            editConfig:function(keypath){
                RX.page.open({title:"修改配置",url:"/config/configEdit?type=xg&id=" + this.get(keypath+".ID")});
            },
            //删除配置事件响应
            delConfig:function(keypath){
                RX.confirm("确定要删除所选记录吗？", function (index) {
                    $.ajax({
                        type: "post",
                        url: "/config/delConfig",
                        data: {id: this.get(keypath+".ID")},
                        async: false,
                        success: function (ar) {
                            if (ar.success) {
                                RX.msg("删除成功");
                                window.location.href = "/demo/cmptConfigTypeShow";
                            } else {
                                RX.alert(ar.msg);
                            }
                        }
                    });
                });
            }
        },
        //视图绘制完毕事件
        afterMount:function(){
            //页面自适应
            PageWeightInit();
            $(window).resize(function () {
                PageWeightInit();
            });

            var appTypeList = this.get("appTypeList");
            var items = [];
            $.each(appTypeList,function(i,t){
                items.push({
                    title: t.name,
                    cId: "_app"+t.appId
                })
            });
            //tab页控件初始化
            var appTab = new TabPanel({
                renderTo: 'appTab',
                fullTab: true,
                tabWidth: 70,
                active: 0,
                scrolled: true,
                contentScroll:true,
                items: items
            });
        }
    })
})

function PageWeightInit() {
    $(".tabpanel_content").width($(window).width());
    $("#appTab").height($(window).height() - $(".operation_box").outerHeight());
    $(".list_box").height($(window).height() - $(".operation_box").outerHeight()-40);
    $(".tabpanel_content").height($(window).height() - $(".operation_box").outerHeight() - $(".tabpanel_tab_content").outerHeight());
}