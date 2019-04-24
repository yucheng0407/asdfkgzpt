var columns = [
    {title: '委办人', id: 'ENTRUSTUSERNAME', width: '100', align: 'left', renderer: "String"},
    {title: '开始时间', id: 'START_DATE', width: '100', align: 'left', renderer: "Date", format: "yyyy-MM-dd"},
    {title: '结束时间', id: 'END_DATE', width: '100', align: 'left', renderer: "Date",format: "yyyy-MM-dd"}
];

var settings = {
    url: "/testFlow/getEntrustList",
    autoListBox:{
        enable: true,
        columns: columns,
        allPageChose: false //是否开启全页选择
    }
};

var buttonArr = [
    {
        id: "add",
        name: "新增",
        onClick:"addEntrust"
    },
    {
        id: "stop",
        name: "停止",
        onClick:"stopEntrust"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};