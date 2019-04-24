//param中其他参数是从后端返回的参数
var param = RX.page.param;   //工作流相关参数
var id = param.workflow.dataId;
var teacherVm;
$(function () {
    //渲染数据
    var teacher = {};
    //如果保存了草稿，以草稿数据渲染
    if (param.tmpData) {
        teacher = JSON.parse(param.tmpData);
        //如果有业务数据，则以业务数据渲染
    } else if (id) {
        $.ajax({
            type: "get",
            url: "/workflow/test/getTeacher?id=" + id + "&random=" + Math.random(),
            async: false,
            success: function (ar) {
                if (ar.success) {
                    teacher = ar.data;
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }

    teacherVm = new Rxvm({
        el: ".form_box",
        data: teacher
    });
});