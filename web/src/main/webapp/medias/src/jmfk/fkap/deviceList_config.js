var param=RX.page.param;
var equipmentParent=param.equipmentParent;
var equipmentChild=param.equipmentChild;
var deviceIds=param.deviceIds;
//搜索区字段配置
var deviceListConfigs = {
    "query.deviceCode": {
        tagName: "设备编码",
        canClear: true,
    }

};
//规定表头
var columns = [
    {title: '设备编码', id: 'DEVICE_CODE', width: '15%', align: 'center', renderer: "String"},
    {title: '设备名称', id: 'DEVICE_NAME', width: '15%', align: 'center', renderer:'String' },
    {title: '装备大类', id: 'EQUIPMENT_PARENT', width: '12%', align: 'center', renderer: "Dict",dictCode:'EQUIPMENTPARENT'},
    {title: '装备小类', id: 'EQUIPMENT_CHILD', width: '12%', align: 'center', renderer: "Dict",dictCode:'EQUIPMENTCHILD'},
    {title: '所属机构', id: 'DEVICE_ORGAN_NAME', width: '', align: 'center', renderer: "String"}
];

//列表视图设置
var deviceListSettings = {
    url: "/jmfk/getDeviceListPage?equipmentParent="+equipmentParent+"&equipmentChild="+equipmentChild,
    autoQueryBox: {
        enable: true,
        cols: [100, 180],
        property: [
            "deviceCode"
        ]

    },
    autoListBox: {
        enable: true,
        columns: columns,
        mulchose: false //是否多选
    }
};
//按钮配置
var buttonArr = [
    {
        id: "qd",
        name: "确定",
        onClick: "qd",
        style: "c_button"
    }
];

var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};
