//规定表头
var columns = [
    {title: '用户名称', id: 'USER_NAME', width: '', align: 'center', renderer: "String"},
    {title: '登录账号', id: 'LOGIN_NAME', width: '20%', align: 'center', renderer: "String"},
    {title: '创建时间', id: 'CJSJ', width: '20%', align: 'center', renderer: "Date", format: "yyyy-MM-dd"},
    {
        title: '是否封锁', id: 'IS_BLOCKED', width: '15%', align: 'center', renderer: function (v) {
            if (v == '1') {
                return '是';
            } else {
                return '否';
            }
        }
    }
];
//用户列表主配置
var settings = {
    url: "/user/getSysUserListPage",
    autoQueryBox:{
        enable:true,
        property:["user_name","loginName"]
    },
    autoListBox:{
        enable: true,
        columns: columns,
        checkbox: true, //是否显示checkbox
        mulchose: true, //是否多选,
        allPageChose: false, //是否开启全页选择,
        onRowDblClick: function (index){
            RX.msg(index);
        }
    }
};

var config = {
    "query.user_name":{
        tagName:"用户名称"
    },
    "query.loginName":{
        tagName:"登录账号"
    }
}