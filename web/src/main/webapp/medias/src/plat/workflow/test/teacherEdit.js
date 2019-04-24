var param = RX.page.param;
//获取数据id
var id = param.workflow.dataId;
var teacherVm;
$(function () {
    var url;
    if (id) {
        url = "/workflow/test/getTeacher?id=" + id;
    }
    //根据url获取数据
    var teacher = RX.page.get(url);
    //渲染vm
    teacherVm = new Rxvm({
        el: ".form_box",
        config: config,
        data: teacher
    });
    //设置主Rxvm
    RX.page.setMainVm(teacherVm);
});

//供工作流调用：提交前验证
RX.page.checkWf = function (code) {
    return teacherVm.ruleValidate();
};

RX.page.submitWf = function (code) {
    return RX.page.save({
        url: "/workflow/test/saveTeacher",
        data: {teacher: teacherVm.getJson(), param: JSON.stringify(param)},
        success: function (data, result) {
            //对参数进行处理
            // var msg, wfVars;
            // if (code === "SBSJ") {
            //     wfVars = "SFSBSJ:2";
            //     msg = "上报市局成功";
            // } else if (code === "SBLD") {
            //     wfVars = "SFSBSJ:1";
            //     msg = "上报领导成功";
            // }
            // if (msg)
            //     result.msg = msg;
            // if (wfVars)
            //     result.wfVars = wfVars;
        }
    });
};

//供工作流调用：删除业务数据
RX.page.deleteWf = function () {
    return RX.page.del({
        url: "/workflow/test/delTeacher?id=" + id
    });
};

/**
 * 工作流个性按钮接口
 *
 * @param code
 */
function validateFunc(code){
    RX.alert(111);
}
