/**
 * SysMetaData(元数据)表单
 */
var viewFormVm;
var lastDetail;
$(function () {

    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");

    //视图初始化
    viewFormVm = new Rxvm({
        el: '.form_box',
        config: config
    });
});

/**
 * 保存方法
 */
function save() {
    if (viewFormVm.ruleValidate()) {
        var name = viewFormVm.get("name");
        $.ajax({
            type: "post",
            url: "/report/getViewText",
            data: {tableName: viewFormVm.get("name")},
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                    if(ar.data){
                        RX.confirm("视图名已存在,确认覆盖？",function(){
                            submitView();
                        })
                    }else{
                        submitView();
                    }
                } else {
                    RX.alert(ar.msg);
                }
            }
        })
    }
}

/**
 * 提交视图
 */
function submitView(){
    var sql = "CREATE OR REPLACE VIEW " + viewFormVm.get("name") + " AS " + viewFormVm.get("text");
    $.ajax({
        type: "post",
        url: "/report/createView",
        data: {text: sql},
        dataType: "json",
        async: false,
        success: function (ar) {
            if (ar.success) {
                RX.msg("视图创建成功");
                RX.page.param.callback(viewFormVm.get("name"));
                RX.page.close();
            } else {
                RX.alert(ar.msg);
            }
        }
    });
}

//关闭验证
RX.page.cancelCheck = function () {
    if (viewFormVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};
