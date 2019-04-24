var id = RX.page.param.id;
$(function () {
    //视图初始化
    formVm = new Rxvm({
        el: '.form_box',
        template: '#fqapRwd',
        config: config,
        settings: {
            getData: {
                url: "/jmfk/getFkapRwdById",
                param: {id: id}
            }
        },
        afterMount: function () {
            $("#deviceTab").show();
           var sbs=formVm.get('sbs');
           var tr;
            for (var i = 0; i <sbs.length ; i++) {
                tr= "<tr>"+
                    "<th >"+
                    "<b>*</b>巡防设备"+
                    "</th>"+
                    "<td>"+
                    "<div class='element_box' >"+
                    "<input  title='装备大类' type='text' class='i_text' disabled='disabled' value='"+sbs[i]['EQUIPMENT_PARENT']+"'/>"+
                    "</div>"+
                    "</td>"+
                    "<td>"+
                    "<div class='element_box' >"+
                    "<input  title='装备小类' type='text' class='i_text' disabled='disabled' value='"+sbs[i]['EQUIPMENT_CHILD']+"'/>"+
                    "</div>"+
                    "</td>"+
                    "<td colspan='3'>"+
                    "<div class='element_box' >"+
                    "<input  title='装备名称' type='text' class='i_text' disabled='disabled' value='"+sbs[i]['DEVICE_NAME']+"'/>"+
                    "</div>"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<th >"+
                    "<b>*</b>在线情况"+
                    "</th>"+
                    "<td colspan='2'>"+
                    "<div class='element_box' >"+
                    "<input  title='在线情况' type='text' class='i_text' disabled='disabled' value='"+sbs[i]['SBZXZT']+"'/>"+
                    "</div>"+
                    "</td>";

                if(sbs[i]['CZSHZT']!=null&&sbs[i]['CZSHZT']!=''){
                tr +=   "<th >"+
                        "<b>*</b>车载视频情况"+
                        "</th>"+
                        "<td colspan='2'>"+
                        "<div class='element_box' >"+
                        "<input  title='在线情况' type='text' class='i_text' disabled='disabled' value='"+sbs[i]['CZSHZT']+"'/>"+
                        "</div>"+
                        "</td>";
                }
                tr+="</tr>";
                $('#devices').append(tr);
            }
           var sbs=formVm.get("sbs");
        }
    });
});
function edit() {
    alert('修改');
}
