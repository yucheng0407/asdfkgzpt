//列配置
var columns = [
    {
        title: '标题', id: 'BT', width: '20%', renderer: function () {
            return "我是标题"
        }
    },
    {
        title: '姓名(String)(居左显示)',
        id: 'USER_NAME',
        width: '20%',
        renderer: function (v, rowData, rowIndex, showPro) {
            showPro.ifSetTitle = true;
            showPro.replaceSymbols = false;
            v = replaceSymbols(v);
            return "<a href='javascript:void(0)' onclick='alert(" + rowData.ID + ")'>" + v + "</a>";
        }
    },
    {
        title: '性别(Function)', id: 'SEX', width: '20%', renderer: function (v) {
            if (v == '0') {
                return "男"
            } else if (v == "1") {
                return "女"
            } else {
                return v;
            }
        }
    },
    {title: '出生日期(Date)', id: 'CSRQ', width: '20%', renderer: "Date", format: "yyyy-MM-dd",canOrder:true},
    {title: '政治面貌(Dict)', id: 'ZZMM', width: '20%', renderer: "Dict", dictCode: "ZZMMDEMO"}
];

//用户列表主配置
var settings = {
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns,
        checkbox: true, //是否显示checkbox
        mulchose: true, //是否多选,
        allPageChose: false //是否开启全页选择
    }
};

var config = {
    "query.USER_NAME": {
        tagName: "姓名",
        canClear:true
    }
}