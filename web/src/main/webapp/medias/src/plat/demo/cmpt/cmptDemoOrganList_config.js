
//表头
var columns = [
    {title: '机构名称', id: 'ORGAN_NAME', width: '', align: 'center', renderer: "String"},
    {
        title: '机构名称',
        id: 'ORGAN_NAME',
        width: '',
        align: 'center',
        renderer: function (v, rowData, rowIndex, showPro) {
            showPro.ifSetTitle = true;
            showPro.replaceSymbols = false;
            v = replaceSymbols(v);
            return "<a href='javascript:void(0)' onclick='showDetail(" + rowData.ID + ")'>" + v + "</a>";
        }
    }
];

//视图设置
var settings = {
    url: "/demoOrgan/getDemoOrganList",
    paged:false,
    autoListBox:{
        enable: true,
        columns: columns,
        afterLoad:function(rows){
            if(RX.isArray(rows)){
                $(this).find(".list tbody").append("<tr><th colspan='2'>合计(总数)</th><td align='center'>"+rows.length+"</td></tr>")
            }
        }
    }
};

//操作按钮的配置
var buttonArr = [
    {
        id: "add",
        name: "新增",
        icon: "&#xe62a;",
        onClick: "add"
    },
    {
        id: "edit",
        name: "修改",
        icon: "&#xe605;",
        onClick: "edit"
    }
];
var buttonsJson = {
    tag: "._rx_grid_control",
    tpl: null,
    param: {},
    title: null,
    buttons: buttonArr,
    beforeInit: function (param) {
        return true
    },
    onInit: function (param) {
    }
};