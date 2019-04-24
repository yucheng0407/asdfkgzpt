$(function () {
    var func = RX.page.param.func;
    var columns = [
        {title: '表单名称', id: 'NAME', width: '30%', align: 'left', renderer: "String"},
        {title: '表单编码', id: 'CODE', width: '30%', align: 'left', renderer: "String"},
        {title: '表单路径', id: 'URL', width: '40%', align: 'left', renderer: "String"}
    ];
    //搜索部分配置
    var SearchConfig = {
        "query.name": {        //主键ID
            type: "normal",
            tagName: "表单名称",
            maxLength: 20
        },
        "query.parentId": {
            display: false,
            defaultValue:RX.page.param.parentId || ""
        }
    };
    //列表视图设置
    var tableSettings = {
        url: "/resource/getMenuUrlList",
        autoQueryBox: {
            enable: true
        },
        autoListBox: {
            enable: true,
            columns: columns
        }
    };
    var resourceVm = new Rxvm({
        widget: RX.Grid,
        el: '.form_box',
        template: "loadTpl:noButtonGridTpl",
        settings: tableSettings,
        config: SearchConfig
    });
    //保存按钮事件
    $("#confirm").click(function () {
        var sel = resourceVm.getSelected();
        if (sel.length > 0) {
            var evalFunc = RX.page.prevWin()[func];
            result = evalFunc(sel[0].ID, sel[0].NAME, sel[0].URL);
            if (result || typeof(result) === "undefined") {
                RX.page.close();
            }
        } else {
            RX.alert("请选择一条数据");
        }
    });
});