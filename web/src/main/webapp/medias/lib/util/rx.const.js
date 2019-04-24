/*****************************************************************
 * rx.const.js
 * 工具：常量
 * 创建时间：2018-06-19
 * 创建人：Zp
 ****************************************************************/

(function () {

    //全局常量配置,建议由项目负责人统一维护
    //图标常量
    RX.ICON_SUCCESS = 1;
    RX.ICON_ERROR = 2;
    RX.ICON_WARNING = 0;
    RX.ICON_DOUBT = 3;
    RX.ICON_LOCK = 4;

    RX.SUCCESS_OPERATE = {icon: RX.ICON_SUCCESS, msg: "操作成功"};
    RX.ERROR_OPREATE = {icon: RX.ICON_ERROR, msg: "操作失败"};
    RX.DOUBT_OPREATE = {icon: RX.ICON_DOUBT, msg: "确认操作？"};

    RX.SELECT_DATA = {icon: RX.ICON_WARNING, msg: "请选择一条数据"};
    RX.SELECT_EDIT = {icon: RX.ICON_WARNING, msg: "请选择一条待修改的数据"};
    RX.SELECT_DELETE = {icon: RX.ICON_WARNING, msg: "请选择一条待删除的数据"};
    RX.SELECT_OPERATE = {icon: RX.ICON_WARNING, msg: "请选择一条待操作的数据"};

    RX.CONFIRM_DELETE = {icon: RX.ICON_DOUBT, msg: "您确定要删除所选吗？"};
    RX.CONFIRM_TGOPERATE = {icon: RX.ICON_DOUBT, msg: "您确定要审核通过所选吗？"};
    RX.CONFIRM_BTGOPERATE = {icon: RX.ICON_DOUBT, msg: "您确定要审核不通过所选吗？"};
    RX.SUCCESS_DELETE = {icon: RX.ICON_SUCCESS, msg: "删除成功"};
    RX.SUCCESS_SAVE = {icon: RX.ICON_SUCCESS, msg: "保存成功"};

    RX.CANCEL_CHECK = {icon: RX.ICON_DOUBT, msg: "页面已修改，确认关闭吗?"};

    RX.DEFAULT_ERROR = {icon: RX.ICON_ERROR, msg: "请求数据出错"};

    RX.SELECT_SHSUCCESS = {icon: RX.ICON_SUCCESS, msg: "审核操作成功"};

    //工作流按钮类型
    //提交
    RX.WF_SUBMIT = "1";
    //退回
    RX.WF_REFUSE = "2";
    //保存草稿
    RX.WF_SAVEDRAFT = "3";
    //撤回
    RX.WF_CANCEL = "4";
    //删除
    RX.WF_DEL = "5";
    //自定义
    RX.WF_DIY = "6";
    //特送退回
    RX.WF_SPECBACK = "7";
    //催办
    RX.WF_PRESS = "8";

    //工作流按钮显示时段
    //办理中
    RX.WFBTN_SHOW_IN = "1";
    //办理后
    RX.WFBTN_SHOW_AFTER = "2";
    //业务控制
    RX.WFBTN_SHOW_DIY = "3";
    //所有时段
    RX.WFBTN_SHOW_All = "4";


    //默认同级别之间选择，增加角色之后可增加配置
    RX.ROLE_LEVEL_COMPINE = {
        //业务用户级别，可选择级别为3的角色
        "3": "3"
    };
}).call(this);




