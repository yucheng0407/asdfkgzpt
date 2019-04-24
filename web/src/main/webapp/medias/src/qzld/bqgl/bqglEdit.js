var id = RX.page.param.id;
var type=RX.page.param.type;
var filterId;
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
            //清除按钮
            $('.eliminate').click(function () {
               var obj=$(this).parent().prev();
               var value=obj.attr('rx-path');
               if(value.endsWith('xm')){
                   value=value.replace('xm','');
               }
               else  if(value.endsWith('mcs')){
                   value=value.replace('mcs','s');
               }
               else if(value.endsWith('mc')){
                   value=value.replace('mc','');
               }
                bqglFormVm.set(value,null);
            })
            if(type=='yyls'){
                bqglFormVm.set("zbkssj",'');
                bqglFormVm.set("zbjssj",'');
                bqglFormVm.set('id','');
            }
            //修改页面隐藏添加和引用按钮
            if(id!=null&&id!=''){
                $("#apdr").hide();
                $("#yyls").parent().hide();
            }
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
            //引用历史
            $("#yyls").click(function () {
                var url="/bqgl/getYyls";
                RX.page.open({title: "引用历史记录", url: url});
            });
            //安排多日
            $("#xz").click(function () {
                var value=$("#apdrc1").val();
                if(value==''){
                    return
                }
                var tr="<tr>" +
                    "<td colspan='2'>" +
                    "<div class='element_box' style='text-align: left;'> " +
                    "<input style='width: 300px;' type='text' title='drtime'  disabled='disabled' class='i_text' value='"+value+"' />" +
                    "</div>" +
                    "</td>" +
                    "  <td colspan='2'>"+
                    " <div class='element_box ele_select' style='height: 20px>"+
                     "<div class='ico_5'>"+
                    " <span class='i_noborder' title='删除'  onclick='deletedr(this)'>"+
                      "<i class='iconfont'  >&#xe606;</i>"+
                    "</span>"+
                    "</div>"+
                    "</div>"+
                    "</td>"+
                    "</tr>";
                $("#dateTr").append(tr);
                $("#dateTable").show();
                $("#apdrc1").val('');
            });
        }
    });
});

function deletedr(element) {
   $( element).parent().parent().prev().parent().remove();
}

//获取机构信息
function getOrgan(zrdw,zrdwmc) {
    var obj=bqglFormVm.get("zrdw");
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

//默认选中(值班领导)
function addZbldSelect() {
    filterId = bqglFormVm.get("zbld");
    return "&filterId=" + filterId;
}
//默认选择(值班民警)
function addZbmjSelect() {
    filterId = bqglFormVm.get("zbmjs");
    return "&filterId=" + filterId;
}
//默认选择备勤领导
function addBqldSelect() {
    filterId = bqglFormVm.get("bqld");
    return "&filterId=" + filterId;
}
//默认选择(备勤民警)
function addBqmjSelect() {
    filterId = bqglFormVm.get("bqmjs");
    return "&filterId=" + filterId;
}

//保存
function save() {
    var datas=$(':input');
    var arr=[];
    for (var i = 0; i <datas.length ; i++) {
        if($(datas[i]).attr('title')=='drtime'){
            arr.push($(datas[i]).val());
        }
    }
    if (bqglFormVm.ruleValidate()) {
        //多日
        $.ajax({
            type: "post",
            url: "/bqgl/saveBqgl",
            data: {bqgl: bqglFormVm.getJson(),drs:arr.join(",")},
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.reload();
                    RX.page.close();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}