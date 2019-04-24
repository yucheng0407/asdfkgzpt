var gridVm;
$(function () {
    //视图初始化
    gridVm = new Rxvm({
        widget: RX.Grid,
        el: '#fkListDiv',
        template: '#modelDiv',
        filters: {},
        config: searchConfig,
        settings: settings,
        methods: {
            ydztChange: function () {
                debugger
                var that = this;
                that.query();
            },
            fklxChange: function () {
                var that = this;
                that.query();
            },
            fkDetail: function (keypath) {
                var fbid = this.get(keypath + ".FBID");
                var jsid = this.get(keypath + ".JSID");
                var sfkhf = this.get(keypath + ".SFKHF");
                var ydzt = this.get(keypath + ".YDZT");
                openFkDetailPage(fbid, jsid, ydzt, sfkhf);
            },
            locationCurrent: function (keypath) {
            }
        },
        afterMount: function () {

        }
    });
});

function openFkDetailPage(fbid, jsid, ydzt, sfkhf) {
    //1.将阅读状态标记为已读
    if (ydzt == "0") {
        $.ajax({
            type: "post",
            url: "/fkzl/setRead?fbid=" + fbid + "&jsid=" + jsid + "&sfkhf=" + sfkhf,
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                } else {
                    RX.msg(RX.ERROR_OPREATE);
                }
            }
        });
    }
    //2.跳转到详情页面
    RX.page.goto("/fkzl/fkzlFkDetail?fbid=" + fbid + "&jsid=" + jsid + "&sfkhf=" + sfkhf);
}

//刷新全局接口
RX.page.reload = function (param) {
    gridVm.reloadGrid(param);
};

/**
 * 载入数据表格
 * @param param
 */
function reloadTable(param) {
    gridVm.reloadGrid(param);
}