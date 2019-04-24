var id = RX.page.param.id;
$(function () {
    //视图初始化
    bqglFormVm = new Rxvm({
        el: '.form_box',
        template: '#bqglForm',
        config: config,
        settings: {
            getData: {
                url: "/bqgl/getBqglById",
                param: {id: id}
            }
        },
        afterMount: function () {
            RX.button.init($("#w_butt"), buttonsJson);
            //查询用户的登录信息
            $.ajax({
                type: "post",
                url: "/bqgl/getDefaultUser",
                dataType: "json",
                async:true,
                success: function (ar) {
                    bqglFormVm.set("zrdw",ar.data.zrdw);
                    bqglFormVm.set("zrdwmc",ar.data.zrdwmc);
                    RX.page.setData(ar.data.zrdw);
                }
            });
        }
    });
});


//获取机构信息
function getOrgan(zrdw,zrdwmc) {
    bqglFormVm.set("zrdw",zrdw);
    bqglFormVm.set("zrdwmc",zrdwmc);
    RX.page.setData(zrdw);
}
//值班领导
function  getZbldDetail(names,ids) {
    var name="";
    for (var i = 0; i < names.length; i++) {
        name+=names[i];
    }
    var id="";
    for (var i = 0; i < ids.length; i++) {
        id+=ids[i];
    }
    bqglFormVm.set("zbld",id);
    bqglFormVm.set("zbldxm",name);
}

//值班民警
function  getZbmjDetail(names,ids) {
    var name="";
    for (var i = 0; i < names.length; i++) {
        name+=names[i];
    }
    var id="";
    for (var i = 0; i < ids.length; i++) {
        id+=ids[i];
    }
    bqglFormVm.set("zbmjs",id);
    bqglFormVm.set("zbmjmcs",name);
}
//备勤领导
function getBqldDetail(names,ids) {
    var name="";
    for (var i = 0; i < names.length; i++) {
        name+=names[i];
    }
    var id="";
    for (var i = 0; i < ids.length; i++) {
        id+=ids[i];
    }
    bqglFormVm.set("bqld",id);
    bqglFormVm.set("bqldmc",name);
}
//备勤民警
function getBqmjDetail(names,ids) {
    var name="";
    for (var i = 0; i < names.length; i++) {
        name+=names[i];
    }
    var id="";
    for (var i = 0; i < ids.length; i++) {
        id+=ids[i];
    }
    bqglFormVm.set("bqmjs",id);
    bqglFormVm.set("bqmjmcs",name);
}

//保存
function edit() {
  var id= bqglFormVm.get('id');
    RX.page.open({
        title: "修改任务",
        url: "/bqgl/bqglEdit",
        param: {id: id}
    });
    RX.page.close();
}