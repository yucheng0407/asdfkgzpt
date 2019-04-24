//规定表头
var columns = [
    {title: '机构名称', id: 'ORGAN_NAME', width: '', align: 'center', renderer: "String"}
];

//用户列表主配置
var settings = {
    url: "/demoOrgan/getDemoOrganList?hasDelData=true",
    autoListBox:{
        enable: true,
        columns: columns
    }
};