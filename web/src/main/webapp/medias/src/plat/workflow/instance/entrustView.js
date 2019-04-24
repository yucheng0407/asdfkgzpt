var id = RX.page.param.id;
$(function () {
    new Rxvm({
        el: "#entrustForm",
        settings: {
            //获取数据
            getData: {
                url: "/workflow/instance/getEntrustById?id=" + id + "&random=" + Math.random()
            }
        }
    });
});