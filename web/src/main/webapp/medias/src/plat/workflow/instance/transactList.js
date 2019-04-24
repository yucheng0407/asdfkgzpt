$(function () {

    //通过URL获取参数
    var workflowInstanceId = RX.page.param.workflowInstanceId;
    var transactNodeid = RX.page.param.transactNodeid;
    if(!transactNodeid){
        transactNodeid = 0;
    }
    //列表参数
    var columns = [
        {title: '创建时间', id: 'create_date', width: '80', align: 'left',  renderer: "Date",format:"yyyy-MM-dd hh:mm"},
        {title: '完成时间', id: 'finish_date', width: '80', align: 'left', renderer: "Date",format:"yyyy-MM-dd hh:mm"},
        {title: '状态', id: 'status', width: 'autoExpand', align: 'left', renderer: function (v, rowData, rowIndex) {
            var zt=v;
            if (v == "1") {
                zt = "运行";
            }else if(v =="2"){
                zt = "完成";
            }
            return  zt ;
        }}
    ];
    //拼接请求URL  从后台取数据
    var url = "/workflow/instance/getTransactList";
    if (workflowInstanceId != null)
        url = url + "?workflowInstanceId=" + workflowInstanceId+"&transactNodeid="+transactNodeid ;
    else
        url = url + "?workflowInstanceId=" + 0+"&transactNodeid="+0;

    var settings = {
        url: url,
        autoListBox:{
            columns: columns,
            onRowClick: "onRowClick"
        }
    };

    new Rxvm({
        el: "",
        settings: settings,
        afterMount: function(){
            $(".ifrContent").height($(window).height() - 30).width(200);
            $(window).resize(function () {
                $(".ifrContent").height($(window).height() - 30).width(200);
            });
        }
    })
});
function onRowClick(rowIndex, rowData, isSelected, event) {
    $(window.parent.document.getElementById("blist")).attr("src","taskList?id=" + rowData.id);
}