/****************************************
 *工作流返回对象
 ****************************************/
/**
 * 工作流返回类型
 * 最基本的返回类型
 * @constructor
 */
function WorkflowReturn(flg, msg) {
    this.flg = typeof flg === "boolean" ? flg : false;
    this.msg = msg;
}

/**
 * 工作流提交form返回的对象
 *  @param flg 是否成功
 * @param ywDataId  业务数据id
 * @param wfVars   流程变量
 * @param wfTitle  流程实例标题
 * @param msg 个性提示语
 * @constructor
 */
function SubmitReturn(flg, msg, ywDataId, wfVars, wfTitle) {
    WorkflowReturn.call(this, flg, msg);
    this.ywDataId = ywDataId;
    this.wfVars = wfVars;
    this.wfTitle = wfTitle;
    this.msg = msg;
}

SubmitReturn.prototype = new WorkflowReturn();