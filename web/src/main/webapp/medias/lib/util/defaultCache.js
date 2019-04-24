/*****************************************************************
 * defaultCache.js
 * 配置：初始化缓存。会自动被_top页面引用并初始化缓存。
 * 最后更新时间：2018-03-23
 * 最后更新人：Zp
 * 更新内容：将原layerManager.js使用参数转换为初始化缓存数据。
 ****************************************************************/
var wfBtn = {};
//提交按钮
wfBtn[RX.WF_SUBMIT] = {
    name: "提交",
    code: "submitWf",
    icon: "&#xe620;",
    type: RX.WF_SUBMIT,
    sort: 1,
    sfyxSt: "VALID"
};
//保存草稿
wfBtn[RX.WF_SAVEDRAFT] = {
    name: "草稿",
    code: "saveDraft",
    icon: "&#xe634;",
    type: RX.WF_SAVEDRAFT,
    sort: 2,
    sfyxSt: "VALID"
};
//退回
wfBtn[RX.WF_REFUSE] = {
    name: "退回",
    code: "refuseWf",
    icon: "&#xe6a3;",
    type: RX.WF_REFUSE,
    sort: 3,
    sfyxSt: "VALID"
};
//撤回
wfBtn[RX.WF_CANCEL] = {
    name: "撤回",
    code: "cancelWf",
    icon: "&#xe642;",
    type: RX.WF_CANCEL,
    sort: 4,
    sfyxSt: "VALID"
};
//删除
wfBtn[RX.WF_DEL] = {
    name: "删除",
    code: "deleteWf",
    icon: "&#xe606;",
    type: RX.WF_DEL,
    sort: 5,
    sfyxSt: "VALID"
};
//特送退回
wfBtn[RX.WF_SPECBACK] = {
    name: "特送退回",
    code: "specialBack",
    icon: "&#xe606;",
    type: RX.WF_SPECBACK,
    sort: 6,
    sfyxSt: "VALID"
};
//催办
wfBtn[RX.WF_PRESS] = {
    name: "催办",
    code: "pressWf",
    icon: "&#xe620;",
    type: RX.WF_PRESS,
    sort: 7,
    sfyxSt: "VALID"
};

//初始化缓存数据定义
var _defaultCache = {
    imageId: null,           //用于图片空间
    property: null,          //工作流设计器属性缓存
    DEFAULT_BUTTON_ARR: [    //默认的工作流button配置，可以从配置中读取
        wfBtn[RX.WF_SUBMIT], wfBtn[RX.WF_SAVEDRAFT], wfBtn[RX.WF_REFUSE], wfBtn[RX.WF_CANCEL], wfBtn[RX.WF_DEL]
    ],
    //工作流按钮字典
    WFBTNDICT: [{value: "提交", code: RX.WF_SUBMIT}, {value: "退回", code: RX.WF_REFUSE}, {
        value: "保存草稿",
        code: RX.WF_SAVEDRAFT
    },
        {value: "撤回", code: RX.WF_CANCEL},
        {value: "删除", code: RX.WF_DEL}, {value: "特送退回", code: RX.WF_SPECBACK}, {
            value: "催办",
            code: RX.WF_PRESS
        }, {value: "自定义", code: RX.WF_DIY}],
    WFBTN: wfBtn
};

//调用初始化缓存接口
RX.initCache(_defaultCache);


