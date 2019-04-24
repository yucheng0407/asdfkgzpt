$(function(){
    $.ajax({
        url:"/workflow/instance/getBackNodes",
        data:{mergeNodeId: RX.page.param.mergeNodeId},
        success:function(ar){
            if(ar.success){
                var list = ar.data,
                    $nodes = $("#nodes");
                for(var i = 0; i < list.length; i++){
                    $nodes.append('<label class="label_check" for="check'+i+'"><input id="check'+i+'" value="'+list[i].NODE_ID+'" type="checkbox">'+list[i].NAME+'</label><br/>');
                }
            }else{
                RX.alert(ar.msg);
            }
        }
    })
    $("#save").click(function(){
        selectItem();
    })
})
function selectItem() {
    var idArr = [];
    $("#nodes").find("input:checked").each(function(){
        idArr.push($(this).val());
    });
    if (!idArr.length) {
        RX.alert("请选择至少一个环节");
    } else {
        result = RX.page.prevWin().selectBackNodeCallback(idArr.join());
        RX.page.close();
    }
}