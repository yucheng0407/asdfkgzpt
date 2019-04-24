//规定表头
var columns = [
    {title: '姓名', id: 'USER_NAME', width: '', align: 'center', renderer: "String"}
];

//用户列表主配置
var settings = {
    url: "/demoUser/getDemoUserList?hasDelData=true",
    autoListBox:{
        enable: true,
        columns: columns,
        mulchose:true,
        checkbox:true
    }
};