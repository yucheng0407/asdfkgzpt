//页面传参获取
var wfId = RX.page.param.wfId, instId = RX.page.param.instId;
var flowVm;
//视图初始化
$(function () {
    RX.page.resize = function () {
    };
    //暂使用弹出层layer避免遮罩全局页面
    var loadingIndex = layer.load(0);
    var bpmnDefUrl = "/plat/workflow/ibps/getBpmDefLayout?wfId=" + wfId;
    flowVm = new Rxvm({
        el: '.flowImage',
        settings: {
            getData: {
                url: instId ? bpmnDefUrl + "&instId=" + instId : bpmnDefUrl
            }
        }, afterMount: function () {
            var $img = $("#img-workflow");
            var originalWidth = $img.outerWidth();
            $img.load(
                function () {
                    layer.close(loadingIndex);
                }
            );
            //预留100px边距给Qtip
            $(".flowImage").css({
                width: originalWidth + 200,
                position: "absolute",
                top: $(window).height() > $img.outerHeight() ? ($(window).height() - $img.outerHeight()) / 2 - 50 : 10,
                left: $(window).width() > originalWidth + 200 ? ($(window).width() - originalWidth - 200) / 2 : 0
            });
            if (instId) {
                //存在流程实例
                RX.makeQtip($('div[data-node-type="userTask"]'), {
                    content: {
                        text: function (event, api) {
                            $.ajax({
                                url: '/workflow/ibps/taskInstanceView',
                                success: function (html) {
                                    var domNode = $(html);
                                    var taskVm = new Rxvm({
                                        el: domNode[0],
                                        settings: {
                                            getData: {
                                                url: "/workflow/ibps/getTaskInstance",
                                                param: $.extend({}, RX.page.param,
                                                    {nodeDomId: api.target.data("node-domid")})
                                            }
                                        },
                                        afterMount: function () {
                                            var data = this.get("latest");
                                            var list = this.get("list");
                                            if (data) {
                                                api.set({
                                                    'content.title': api.target.data("node-name") + "详情",
                                                    'content.text': domNode.html()
                                                });
                                                //查看更多历史
                                                if (list && list.length && list.length > 1) {
                                                    api.tooltip.find(".more-history").on("click", function () {
                                                        RX.page.open({
                                                            title: api.target.data("node-name") + "历史",
                                                            url: "/workflow/ibps/taskInstanceList",
                                                            param: {list: list}
                                                        });
                                                    });
                                                }
                                            } else {
                                                api.set({
                                                    'content.title': api.target.data("node-name"),
                                                    'content.text': '暂无运行数据'
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                            return '正在加载...';
                        }
                    },
                    position: {
                        container: $(".flowCanvas"),
                        my: 'center left',
                        at: 'center right',
                        effect: false
                    },
                    style: {
                        classes: 'qtip-default qtip qtip-bootstrap qtip-shadow'
                    }
                });
            }
        }
    });
});