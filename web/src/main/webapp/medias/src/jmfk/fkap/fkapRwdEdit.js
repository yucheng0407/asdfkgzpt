
var param=RX.page.param;
var id = param.id;
var organId=param.organId;
var organName=param.organName;
var deviceIds=[];
var sbzjs=[]
$(function () {
    //视图初始化
    formVm = new Rxvm({
        el: '.form_box',
        template: '#fqapRwd',
        config: config,
        settings: {
            getData: {
                url: "/bqgl/getBqglById",
                param: {id: id}
            }
        },
        afterMount: function () {
            RX.button.init($("#w_butt"), buttonsJson);
            //默认带入点击的机构id如果没有填写默认登录id
            if(organName!=''&&organName!=null&&organName!='undefined'){
                formVm.set("zrdw",organId);
                formVm.set("zrdwmc",organName);
            }
            else {
                //查询用户的登录信息
                $.ajax({
                    type: "post",
                    url: "/bqgl/getDefaultUser",
                    dataType: "json",
                    async:true,
                    success: function (ar) {
                        formVm.set("zrdw",ar.data.zrdw);
                        formVm.set("zrdwmc",ar.data.zrdwmc);
                    }
                });
            }
            RX.page.setData(formVm.get("zrdw"));
            //清除按钮
            $('.eliminate').click(function () {
                var obj=$(this).parent().prev().prev();
                var value=obj.attr('rx-path');
                if(value=='deviceId'){
                    for (var i = 0; i <deviceIds.length ; i++) {
                        if(deviceIds[i]==obj.val()){
                            deviceIds.remove(i);
                            sbzjs.remove(i);
                        }
                    }
                }
            });
            //新增设备
            $("#addAdvice").click(function () {
                var id=$("#deviceId").val();
                var name=$("#deviceName").val();
                var equipmentParent=$('#equipmentParent').attr('title');
                var equipmentChild=$('#equipmentChild').attr('title');
                var sbzsqk=$("#sbzsqk").attr('title');
                var czspqk=$("#czspqk").attr('title')
                if(id==''){
                    return
                }
                $("#deviceTab").show();
                var tr="";
                tr="<tr>"+
                "<th >"+
                "<b>*</b>添加设备"+
                "</th>"+
                 "<td>"+
                    "<div class='element_box'>"+
                    "<input  type='text'  class='i_text' disabled='disabled' value='"+equipmentParent+"'  />"+
                    "</div>"+
                "</td>"+
                 "<td>"+
                    "<div class='element_box'>"+
                    "<input  type='text'  class='i_text' disabled='disabled' value='"+equipmentChild+"'  />"+
                    "</div>"+
                 "</td>"+
                 "<td colspan='1'>" +
                    "<div class='element_box'>"+
                        "<input title='设备ID' type='text' class='i_text' hidden='hidden' value='"+id+"'  />"+
                        "<input title='设备名称' type='text' class='i_text' disabled='disabled' value='"+name+"'/>"+
                    "</div>"+
                "</td>"+
                "<td colspan='2' class='element_box ele_select'>" +
                    "<div class='element_box'>"+
                      "<input type='button' value='设备自检' onclick='sbzj(this,false)'>"+
                       " <div class='ico_1' style='width:2px'>"+
                        "<span class='i_noborder' title='删除' onclick='deleteAdvice(this,"+id+")'>"+
                        "<i class='iconfont'>&#xe606;</i>"+
                        "</span>"+
                    "</div>"+
                "</td>"+
               "</tr>"+
                "<tr>"+
                    "<th>"+
                    "<b>*</b>在线情况"+
                    "</th>"+
                   " <td colspan='5'>"+
                    "<div class='element_box'>"+
                    "<input title='在线情况' type='text' class='i_text'  value='"+sbzsqk+"'  />"
                    "</div>"+
                    "</td>"+
                "</tr>"
                if($('#equipmentParent option:selected').val()=='EQUIPMENTPARENT_1'){
                    tr+= "<tr>"+
                        "<th>"+
                        "<b>*</b>车载视频情况"+
                        "</th>"+
                        " <td colspan='5'>"+
                        "<div class='element_box'>"+
                        "<input title='车载视频情况' type='text' class='i_text'  value='"+czspqk+"'  />"+
                        "</div>"+
                        "</td>"+
                        "</tr>"
                };
                //清空
                formVm.set('deviceId','');
                formVm.set('deviceInfomation','');
                formVm.set('equipmentParent','');
                formVm.set('equipmentChild','');
                formVm.set('sbzsqk','');
                formVm.set('czspqk','');
                //追加
                $("#devices").append(tr);
                $("#equipmentParent").attr('disabled',false);
            })
        }
    })
});

function deleteAdvice(element,id) {
    for (var i = 0; i <deviceIds.length ; i++) {
        if(deviceIds[i]==id){
            deviceIds.remove(i);
            sbzjs.remove(i);
        }
    }
    var o1=$( element).parent().parent().parent().parent();
    var o2=o1.next();
    var o3=o2.next();
    o1.remove();
    o2.remove();
    o3.remove();
}

//默认选择
function addZrmjSelect() {
    filterId = formVm.get("zrdw");
    return "&filterId=" + filterId;
}
function getZrmjDetail(names,ids) {
    var name="";
    for (var i = 0; i < names.length; i++) {
        name+=names[i];
    }
    var id="";
    for (var i = 0; i < ids.length; i++) {
        id+=ids[i];
    }
    formVm.set("zrmjmcs",name);
    formVm.set("zrmjs",id);
}
//巡区类型
function addXqlxSelect() {
    xqlx = formVm.get("xqlx");
    return "&xqlx=" + xqlx;
}
function getXqDetail(id,xqmc) {
    formVm.set("xqid",id);
    formVm.set("xqmc",xqmc);
}
//巡逻方式
function judgeXffs() {
   var  xlfs=formVm.get("xffs");
   if(xlfs=='1'){
       formVm.set('equipmentParent','EQUIPMENTPARENT_1');
       $("#equipmentParent").attr('disabled','disabled');
   }
   else{
       formVm.set('equipmentParent','');
       $("#equipmentParent").attr('disabled',false);
   }
}
//装备选择
function addEquipmentSelect() {
    var  equipmentParent=formVm.get('equipmentParent');
    var  equipmentChild=formVm.get('equipmentChild');
    return "&equipmentParent=" + equipmentParent+"&equipmentChild="+equipmentChild+"&deviceIds="+deviceIds.join(',');
}
//判断是否有车载视频
function czspSf() {
    var  equipmentParent=formVm.get('equipmentParent');
    if(equipmentParent=='EQUIPMENTPARENT_1'){
        $("#czsp").show();
    }
    else{
        $("#czsp").hide();
    }
}

function getDeviceDetail(deviceId,deviceName,equipmentParent,equipmentChild) {
    formVm.set('deviceInfomation',deviceName) ;
    formVm.set('deviceId',deviceId);
    formVm.set('equipmentParent',equipmentParent);
    formVm.set('equipmentChild',equipmentChild);
    deviceIds.push(deviceId);
}


/**
 * 设备自检
 * */
function sbzj(element,flag){
  //获得装备id
   var obj= $(element).parent().parent().prev().children().children().attr('title','设备ID');
   var value= obj.val();
    for (var i = 0; i <sbzjs.length ; i++) {
        if(sbzjs[i]!=value){
            sbzjs.push(value);
        }
    }
   if(value==null||value==''){
       RX.msg(RX.ICON_ERROR,"请选择自检的设备");
   }
   if(flag){
       //在线情况和车载视频状况
       formVm.set('sbzsqk',"2");
       formVm.set('czspqk',"2");
   }
   else{
         var o=$(element).parent().parent().parent();
         var o1=o.next().children().children().children().val('在线');
         var o2=o.next().next().children().children().children().val('正常');
   }
}
/**
 * 重防时段
 * */
function getZfxqDetail(zfqy,zfqymc,zfkssj,zfjssj) {
    formVm.set('zfqy',zfqy);
    formVm.set('zfqymc',zfqymc);
    var time=""
    var ksTime= zfkssj.split(',');
    var jsTime= zfjssj.split(',');
    for (var i = 0; i <ksTime.length ; i++) {
        time+="<a>"+ ksTime[i]+"--"+jsTime[i]+"</a>&nbsp;&nbsp;"
    }
    $("#zfsd").html(time);
    $("#zfsd").parent().parent().show();
}
function save() {
    //验证必填项是否填写完整
    if (formVm.ruleValidate()) {
        //设备id
        if(deviceIds.length<=0){
           $("#hiddenDevices").show();
           return
        }
        $.ajax({
            type: "post",
            url: "/jmfk/saveFkapRwd",
            data: {fkapRwd: formVm.getJson(),deviceIds:deviceIds.join(','),sbzjs:sbzjs.join(',')},
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
        debugger
        RX.page.reload();
    }
}