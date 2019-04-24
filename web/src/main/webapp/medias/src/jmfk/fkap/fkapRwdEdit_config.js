var param=RX.page.param
var organName=param.organName;
if(organName==null||organName=='undefined'){
    organName='安顺市公安局';
}
var xz=[];

for (var i = 1; i <=30 ; i++) {
    if(i<10){
        data=organName+"-0"+i;
    }
    else {
        data=organName+"-"+i;
    }
    xz.push({code: data, value: data})
}
var config = {
    id: { // ID
    },
    zrdw:{  //责任单位
        dispaly:false
    },
    zrdwmc: {  //责任单位名称
        rules: {checkSave: ["notNull"]},
        disabled:true
    },
    xz:{  //巡组
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: xz,
        },
    },
    xfkssj:{
        rules: {checkSave: ["notNull"]}, //巡防开始时间（年月日时分秒）
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            minDate: 0,
            maxDate:1
        }
    },
    xfjssj:{
        rules: {checkSave: ["notNull"]},  //巡防结束时间（年月日时分秒）
        type: "date",
        dateConfig: {
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            minDate: 0,
            maxDate:2
        }
    },
    xqid:{
        rules: {checkSave: ["notNull"]}, // 巡区
        type: "layer",
        layerConfig: {
            url:"/jmfk/getXq",
            title: "巡区",
            style: "medium",
            callbackFunc: "getXqDetail",
            checkFunc:'addXqlxSelect',
            canDelete: true,
        }
    },
    xqlx:{ //巡区类型
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "XQLX",
        },
        defaultValue:"1"
    },
    //任务类型
    rwlx:{
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "XFRWLX"
        }
    },
    xffs:{  //巡防方式
        rules: {checkSave: ["notNull"]},
        type: "dict",
        dictConfig: {
            dictCode: "XFFS"
        },
        changeFunc: "judgeXffs" //若巡防方式选择了警车巡，则警车设备必选。
    },
    bz:{    //备注
        maxLength: 1000
    },
    zrmjmcs:{     //民警名称
        rules: {checkSave: ["notNull"]},
        type: "layer",
        layerConfig: {
            url:"/bqgl/getUserTeamTree?type=checkbox",
            title: "责任用户",
            style: "tree",
            callbackFunc: "getZrmjDetail",
            checkFunc:'addZrmjSelect',
            canDelete: true,
        }
    },
    zrmjs:{  //民警
        dispaly:false
    },
    equipmentParent:{  //装备大类
        type: "dict",
        dictConfig: {
            dictCode: "EQUIPMENTPARENT",
            showPlsSelect: false
        },
        changeFunc:"czspSf"
    },
    equipmentChild:{      //装备小类
        type: "dict",
        dictConfig: {
            dependence: "equipmentParent",
            dictCode: "EQUIPMENTCHILD",
            showPlsSelect: false
        }
    },
    deviceInfomation:{ //装备
        type: "layer",
        layerConfig: {
            url:"/jmfk/getDeviceInfomation?",
            title: "装备",
            style: "medium",
            callbackFunc: "getDeviceDetail",
            checkFunc:'addEquipmentSelect',
            canDelete: true,
        }
    },
    sbzsqk:{           //设备在线情况
        type: "dict",
        disabled:true,
        dictConfig: {
            dictCode: "SBZSQK"
        },
        defaultValue:"1"
    },
    czspqk:{  //车载视频
        type: "dict",
        disabled:true,
        dictConfig: {
            dictCode: "CZSPQK"
        },
        defaultValue:"1"

    },
    zfqymc:{ //重防区域名称
        type: "layer",
        layerConfig: {
            url:"/jmfk/getZfxq",
            title: "重防巡区",
            style: "big",
            callbackFunc: "getZfxqDetail",
            canDelete: true,
        }
    },
    zfqy:{   //重防区域

    },
    deviceId:{ //设备id

    },

}

//按钮配置
var buttonArr = [
    {
        id: "save",
        name: "保存",
        onClick: "save",
        style: "c_button"
    }
];
var buttonsJson = {
    tag: ".w_button_box",
    buttons: buttonArr
};