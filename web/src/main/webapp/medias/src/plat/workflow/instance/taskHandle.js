var tabPanel,
    param,
    taskId,//任务ID
    sort,//序号
    flowCode,//流程编码
    wfId,//流程ID
    wiId,//流程实例ID
    status,//任务状态
    list,//表单list
    taskList,//任务list
    dataId,//业务数据ID
    draft,//是否先存为草稿后提交
    flowViewTag, //是否由流程图查看进入
    toTag,//返回URL
    reloadFlag = false,   //关闭页面是否刷新
    nature,//分支聚合
    nodeId,//所属环节id
    buttons,
    sourceData,   //初始传入的参数，之后流程不能获取
    isMe,    //是否当前登录人任务
    taskObj,
    buttonArr = [];     //功能按钮数组
//内置按钮类型对应的处理函数
var btnFunc = {};
//提交按钮
btnFunc[RX.WF_SUBMIT] = "submitWf";
//退回
btnFunc[RX.WF_REFUSE] = "refuseWf";
//保存草稿
btnFunc[RX.WF_SAVEDRAFT] = "saveDraft";
//撤回
btnFunc[RX.WF_CANCEL] = "cancelWf";
//删除
btnFunc[RX.WF_DEL] = "delWf";
//特送退回
btnFunc[RX.WF_SPECBACK] = "specialBack";
//催办
btnFunc[RX.WF_PRESS] = "pressWf";
// 流程办理页面弹出类型
var workFlowType = RX.cache(_top, "WORKFLOW.workFlowType");
//是否需要签收
var isWorkflowSign = RX.cache(_top, "WORKFLOW.isWorkflowSign") === "true";
//是否有下一环节办理人页面
var hasHandleSubmit = RX.cache(_top, "WORKFLOW.hasHandleSubmit") === "true";
//是否默认展开流程处理意见
var expandOpinion = RX.cache(_top, "WORKFLOW.expandOpinion") === "true";
//意见面板样式
var panelStyle = {
    true: {style: {"marginBottom": "0px"}, text: "关闭"},
    false: {style: {"marginBottom": "-202px"}, text: "查阅"}
};
$(function () {
    var diyButton = [];     //自定义按钮而且不是由业务控制的
    //启动流程参数或者流程图页面双击获得弹出的页面
    param = RX.page.param;
    //启动流程时，传入的源数据存入实例
    sourceData = taskId ? null : param.sourceData;
    flowViewTag = param.flowViewTag;
    taskId = param.taskId;
    flowCode = param.flowCode;
    wfId = param.wfId;
    wiId = param.wiId;
    toTag = param.toTag;
    var url, paramObj;
    if (taskId) {
        url = "/workflow/instance/getTaskHandleJson";
        paramObj = {id: taskId}
    } else if (flowCode) {
        url = "/workflow/instance/getTaskHandleByCode";
        paramObj = {flowCode: flowCode};
    } else {
        RX.alert("流程编码以及任务id不存在！！！，请联系管理员");
        return;
    }
    //根据配置初始化流程处理意见
    $("#bottomPanel").animate(panelStyle[expandOpinion].style, "slow");
    $("#bottomTips").html("<b>点击" + panelStyle[expandOpinion].text + "流程处理意见</b>");
    /**
     * 根据任务id或者没有任务时根据flowCode查找工作流的初始数据，
     * 回调成功后，处理通用逻辑以及页面渲染
     */
    $.ajax({
        type: "post",
        url: url,
        data: paramObj,
        async: false,
        success: function (ar) {
            if (ar.success) {
                taskObj = new WorklfowObj({
                    taskId: taskId
                });
                var data = ar.data;
                flowCode = flowCode || data.flowCode;
                sort = data.sort;
                wiId = data.wiId;
                dataId = data.ywDataId;
                status = taskId ? data.taskStatus : "";
                list = data.list;
                taskList = data.taskList;
                buttons = data.buttons;
                nature = data.nature;
                nodeId = data.nodeId;
                isMe = taskId ? data.isMe : true;
                taskId && isConfirmSign(status, taskId, list);//是否弹出签收
                createInitHtml();
                changeBtn(buttons); //控制按钮显示/隐藏
                initOpinionHtml(taskList);
            } else {
                RX.alert(ar.msg);
            }
        }
    });

    //事件的绑定，
    bindWorkflowEvent();

    //提供的辅助接口
    RX.page.makeup({
        //表单类型，表示为taskhandle.js
        pageType: "handleWf",
        //表单工具
        util: {
            getFrameWindow: function (index) {
                return RX.page.getWfForm(index);
            },
            /**
             * 退回特定节点
             * @param nodeIds
             */
            selectBackNodeCallback: function (nodeIds) {
                handleSubmit("不同意", false, null, nodeIds);
            },
            /**
             *
             * @param buttonCode
             */
            showButton: function (buttonCode) {
                showButton(buttonCode);
            },
            /**
             *
             * @param buttonCode
             */
            hideButton: function (buttonCode) {
                hideButton(buttonCode)
            }
        },
        //基本功能，表单开发勿用
        _base: {
            /**
             * 在第一个页面加载之后触发button渲染
             * @param win
             */
            firstIframeOnload: function (win) {
                changeDiyBtn(win);
            }
        }
    });

    /**
     * 显示页面具有的button
     */
    function changeDiyBtn(win) {
        var showIdArr = [], hideIdArr = [];
        for (var i = 0, maxLength = diyButton.length; i < maxLength; i++) {
            var button = diyButton[i];
            if (typeof win[button.funcName] === "function") {
                showIdArr.push(button.code);
            } else {
                hideIdArr.push(button.code);
            }
        }
        hideButton(hideIdArr);
        showButton(showIdArr);
    }

    //是否弹出签收框
    function isConfirmSign(status, taskId, sheet) {
        if (status === "待办" && isMe) {
            if (isWorkflowSign) {
                var warn = "签收确认";
                var webOfficeTag = false;
                for (var i = 0; i < sheet.length; i++) {
                    if (sheet[i].url.toString().indexOf("webofficePage") >= 0) {
                        webOfficeTag = true;
                    }
                }
                if (webOfficeTag) {
                    if (confirm(warn)) {
                        taskObj.signTask();
                    } else {
                        RX.page.closeAll();
                        if (workFlowType !== "layer") {
                            RX.page.back();
                        }
                    }
                } else {
                    RX.confirm(warn, function () {
                        taskObj.signTask(function () {
                            if (workFlowType !== "layer") {
                                var mainwin = RX.page.prevWin();
                                if (!mainwin && mainwin.reloadTable) {
                                    mainwin.reloadTable();
                                }
                            }
                        });
                    }, function () {
                        if (workFlowType === "layer") {
                            RX.page.close();
                        } else {
                            RX.page.back();
                        }
                    });
                }
            } else {
                taskObj.signTask();
            }
        }
    }

    /**
     * 初始化流程页面
     */
    function createInitHtml() {
        //获取展示页面编码
        var showPageCode = function () {
            var tParam = $.extend(true, {}, param), tempPageCode = "all";
            if (dataId) {
                tParam.dataId = dataId;
            }
            //tParam.wiStatus = wiStatus;
            tParam.sort = sort;
            tParam.param = param;
            var checkFunc = checkObj[flowCode];
            if (checkFunc && typeof checkFunc === "function") {
                tempPageCode = checkFunc(tParam) || "all";
            }
            return tempPageCode;
        }();

        //获取编辑或查看url
        function getEditOrViewUrl(url, sheetMode) {
            var leftUrl = url.substring(0, url.indexOf('?'));
            var rightUrl = url.substr(url.indexOf('?'));
            var newUrl;
            //status为空新建或者待办和在办
            if (sheetMode != 2 && isMe && (status == "" || status == "待办" || status == "在办")) {
                if (leftUrl.endWith('View')) {
                    leftUrl = leftUrl.substr(0, leftUrl.length - 4) + 'Edit';
                    newUrl = leftUrl;
                }
            } else {//查看
                if (leftUrl.endWith('Edit')) {
                    leftUrl = leftUrl.substr(0, leftUrl.length - 4) + 'View';
                    newUrl = leftUrl;
                }
            }
            var isExisit = true;
            if (newUrl) {
                //判断改变的存不存在
                $.ajax({
                    type: "get",
                    url: "/main/checkHasMapping?url=" + newUrl,
                    async: false,
                    success: function (ar) {
                        if (ar.success) {
                            isExisit = ar.data;
                        } else {
                            RX.alert(ar.msg);
                        }
                    }
                });
            }
            if (isExisit) {
                url = leftUrl + rightUrl;
            }
            return url;
        }

        //验证页面tab是否显示
        function checkPageIfShow(pageCode) {
            var result = true;
            if (showPageCode !== "all" && ("," + showPageCode + ",").indexOf("," + pageCode + ",") == -1) {
                result = false;
            }
            return result;
        }

        //获取需要展示的表单
        function getShowSheets() {
            var showSheets = [];
            // list为表单列表
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    if (checkPageIfShow(list[i].pageCode)) {
                        showSheets.push(list[i]);
                    }
                }
            }
            return showSheets;
        }

        //表单展示项数据
        var sheetItems = [], frameList = [];
        //拿到需要展示的表单
        var sheets = getShowSheets();
        if (sheets && sheets.length > 0) {
            for (var i = 0; i < sheets.length; i++) {
                var sheetItem = {};
                sheetItem.id = 'sheet_' + sheets[i].sId;
                sheetItem.title = sheets[i].name;
                sheetItem.tabId = "tab_" + i;
                var url = sheets[i].url;
                if (!(url.indexOf("?") > -1)) url += "?";
                url += "&_pageType=wf";
                url = getEditOrViewUrl(url, sheets[i].sheetMode);
                if (!taskId && sourceData) {
                    sheets[i].sourceData = sourceData;
                    for (var key in sourceData) {
                        url += key + "=" + (sourceData[key] ? RX.encode(JSON.stringify(sourceData[key])) : "") + "&";
                    }
                }
                //个性参数，工作流引擎使用
                var gxParam = {
                    tabTitle: sheetItem.title,
                    tabId: sheetItem.tabId,
                    firstPageFlag: i === 0
                };
                taskObj.addChildWin({name: sheetItem.id}, sheets[i], param, gxParam);
                sheetItem.url = RX.handlePath(url);
                sheetItem.name = sheetItem.id;
                sheetItems.push(sheetItem);
                frameList.push(sheetItem.name);
            }
        }
        // 初始化对象
        new Rxvm({
            el: "#sheetList",
            data: {list: sheetItems},
            afterMount: function () {
                var tabItems = [], sheets = this.get("list");
                if (sheets.length > 1) {
                    if (sheets && sheets.length > 0) {
                        for (var i = 0; i < sheets.length; i++) {
                            var tabItem = {
                                cId: sheets[i].id,
                                title: sheets[i].title,
                                id: sheets[i].tabId,
                                closable: false
                            };
                            tabItems.push(tabItem);
                        }
                    }
                    tabPanel = new TabPanel({
                        renderTo: 'center-tab',
                        fullTab: true,      //是否打满容器
                        active: 0,       //默认显示页签
                        autoResizable: true,        //自适应尺寸
                        items: tabItems,
                        //click事件
                        clickFunc: function (pos, content) {
                            changeDiyBtn(content.find("iframe")[0].contentWindow);
                        }
                    });
                }
                resizePage();
            }
        });
    }

    //初始化流程意见
    function initOpinionHtml(task) {
        /**
         * 截取字符串,后面多的显示省略号
         * @param data
         * @param length
         * @returns {*}
         */
        function getSubStr(data, length) {
            if (data && data.length > length) {
                return data.substring(0, length) + "...";
            } else {
                return data;
            }
        }

        var tbodyHtml = "";
        if (task && task.length > 0) {
            for (var i = 0; i < task.length; i++) {
                var opinion = task[i].pageOpinion || task[i].opinion;
                tbodyHtml += "<tr>" +
                    "<td title=" + task[i].handler + ">" + task[i].handler + "</td>" +
                    "<td title=" + opinion + " >" + getSubStr(opinion, 5000) + "</td>" +
                    "<td title=" + task[i].handleDate + ">" + task[i].handleDate + "</td>" +
                    "<td title=" + task[i].fjs + " onclick=\"lookAttachment('" + (task[i].fj_id || "") + "')\" style=\"cursor: pointer;\"><a>" + task[i].fjs + "</a></td>" +
                    "</tr>";
            }
        }
        $('#bottomPanel').append("<iframe id='opinionIframe' name='opinionIframe' src='" + RX.handlePath('/workflow/instance/opinionTable') + "' frameborder='0' width='100%' height='100%'></iframe>");
        RX.page.setChildParam({name: "opinionIframe"}, {
            opinionHtml: tbodyHtml,
            lookAttachment: lookAttachment
        });
    }

    //控制按钮显示/隐藏
    function changeBtn(buttons) {
        //逻辑需要进行修改，因为存在进入页面才判断是否显示，按钮和页面挂钩
        function addButton(buttons) {
            var addHtml = ["<ul class='action_button'>"];
            for (var i = 0, maxLength = buttons.length; i < maxLength; i++) {
                var button = buttons[i];
                addHtml.push('<li id="' + button.code + '" code="' + button.code + '"');
                //自定义按钮，需要和页面挂钩，有就显示，无就不显示，还要经过按钮显示事件控制
                if (button.type === RX.WF_DIY && button.isShowInHandle !== RX.WFBTN_SHOW_DIY) {
                    diyButton.push(button);
                }
                //业务控制或者自定义按钮的暂不显示
                if (button.isShowInHandle === RX.WFBTN_SHOW_DIY || button.type === RX.WF_DIY) {
                    //业务控制
                    addHtml.push(' style="display:none;cursor: pointer;"> ');
                } else {
                    addHtml.push('style="cursor: pointer;">');
                }
                addHtml.push('<a><i class="iconfont ">' + (button.icon ? button.icon : "") + '</i>');
                addHtml.push(button.name);
                addHtml.push("</a></li>");
            }
            addHtml.push("</ul>");
            $("#operation").append(addHtml.join(""));
        }

        //按钮数组
        if (!flowViewTag) {
            buttonArr = buttonArr.concat(buttons);
            buttonArr.push({name: "流程图", code: "viewWf", icon: "&#xe62f;", funcName: "viewWf"});
        }
        buttonArr.push({name: "关闭", code: "closeWf", icon: "&#xe609;", funcName: "closeWf"});
        addButton(buttonArr);
    }

    /**
     * 显示button
     * @param buttonCode：字符串是一个，数组是多个
     */
    function showButton(buttonCode) {
        if (buttonCode) {
            if (typeof  buttonCode === "string") {
                $("#" + buttonCode).show();
            } else if (buttonCode instanceof Array) {
                for (var i = 0, maxLength = buttonCode.length; i < maxLength; i++) {
                    $("#" + buttonCode[i]).show();
                }
            }
        }
    }

    /**
     * 隐藏button
     * @param buttonCode：字符串是一个，数组是多个
     */
    function hideButton(buttonCode) {
        if (buttonCode) {
            if (typeof  buttonCode === "string") {
                $("#" + buttonCode).hide();
            } else if (buttonCode instanceof Array) {
                for (var i = 0, maxLength = buttonCode.length; i < maxLength; i++) {
                    $("#" + buttonCode[i]).hide();
                }
            }
        }
    }

    /**
     * 事件绑定
     */
    function bindWorkflowEvent() {
        //意见区的事件绑定
        opinionEvent();
        //工作流按钮的事件绑定
        buttonsEvent();
        //resize事件
        $(window).resize(function () {
            resizePage();
        });

        /**
         * 意见区的事件绑定
         */
        function opinionEvent() {
            //意见栏收缩
            $("#bottomTips").hover(
                function () {
                    $(this).addClass("bottomTipsHover")
                },
                function () {
                    $(this).removeClass("bottomTipsHover");
                }).toggle(function () {
                    $("#bottomPanel").animate(panelStyle[!expandOpinion].style, "slow");
                    $(this).html("<b>点击" + panelStyle[!expandOpinion].text + "流程处理意见</b>");
                },
                function () {
                    $("#bottomPanel").animate(panelStyle[expandOpinion].style, "slow");
                    $(this).html("<b>点击" + panelStyle[expandOpinion].text + "流程处理意见</b>");
                });
        }

        /**
         * 工作流按钮的事件绑定
         */
        function buttonsEvent() {
            //从buttons获取button
            function getButtonByCode(code) {
                for (var i = 0, maxLength = buttonArr.length; i < maxLength; i++) {
                    if (buttonArr[i].code == code) {
                        return buttonArr[i];
                    }
                }
            }

            //个性按钮设置
            $("#operation").on("click", "li", function () {
                var button = getButtonByCode(this.getAttribute("code"));
                if (button) {
                    handleWfButton(button);
                }
            });
        }
    }

    //办理任务
    function handleSubmit(opinion, agree, params, backNodeIds, handleOpinion) {
        //流程办理确认页面关闭回调
        var callBackClose = function () {
            if (workFlowType === "layer") {
                reloadPrevWin();
                RX.page.closeAll();
            } else {
                RX.page.goto(toTag, null, true);
                RX.page.closeAll();
            }
        };
        var auditOpinion = "";

        function _taskSubmit(taskOpinion, fjId, layerMsg) {
            taskOpinion = taskOpinion || opinion;
            $.ajax({
                type: "post",
                url: "/workflow/instance/handleTask",
                data: {
                    id: taskId, opinion: taskOpinion,
                    agree: agree, auditOpinion: auditOpinion,
                    fjId: fjId, dataId: dataId, draft: draft,
                    title: result.wfTitle || param.wfTitle,
                    wfVars: result.wfVars,
                    backNodeIds: backNodeIds,
                    dataIds: result.dataIds
                },
                success: function (ar) {
                    if (ar.success) {
                        var tipMsg;
                        if (layerMsg) {
                            tipMsg = layerMsg;
                        } else {
                            if (opinion === "同意") {
                                tipMsg = "审批通过";
                            } else if (opinion === "提交") {
                                tipMsg = "提交成功";
                            } else if (opinion === "不同意") {
                                tipMsg = "退回成功";
                            } else if (opinion) {
                                tipMsg = opinion + "成功";
                            } else {
                                tipMsg = "办理完成";
                            }
                        }
                        RX.msg(RX.SUCCESS_OPERATE, tipMsg);
                        if (workFlowType === "layer") {
                            reloadPrevWin();
                        } else {
                            RX.page.goto(toTag, null, true);
                        }
                        RX.page.closeAll();
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }

        //保存验证通过时提交
        function _submit(layerMsg) {
            //有下一环节办理人提示页面
            if (hasHandleSubmit) {
                var data = (opinion === "提交" && sort == 1) ? {
                    id: taskId,
                    agree: agree,
                    flowCode: param.flowCode || param.buildParam,
                    wfVars: result.wfVars,
                    dataId: dataId,
                    title: result.wfTitle || param.wfTitle,
                    dataIds: result.dataIds
                } : {
                    id: taskId,
                    agree: agree,
                    wfVars: result.wfVars,
                    dataId: dataId,
                    title: result.wfTitle || param.wfTitle,
                    dataIds: result.dataIds
                };
                $.ajax({
                    type: "post",
                    url: "/workflow/instance/getHandleData",
                    async: false,
                    data: data,
                    dataType: "json",
                    success: function (ar) {
                        if (ar.success) {
                            var retVal = ar.data;
                            dataId = retVal.data_id;
                            if (retVal.hasDynamicUser == undefined || retVal.hasDynamicUser) {
                                var buildParam = {
                                    id: taskId,
                                    blrList: retVal.blrList,
                                    nodeName: retVal.nodeName,
                                    info: retVal.info,
                                    sfbxscfj: retVal.sfbxscfj,
                                    agree: agree,
                                    opinion: handleOpinion || "",
                                    sureFunc: _taskSubmit,
                                    callBackCloseFunc: callBackClose,
                                    layerMsg: layerMsg
                                };
                                RX.page.openWin({
                                    title: "办理确认",
                                    areaType: ['450px', '380px'],
                                    url: "/workflow/instance/handle",
                                    param: buildParam
                                });
                            } else {
                                RX.alert(retVal.msg);
                            }
                        } else {
                            RX.alert("获取流程办理页面数据出错");
                        }
                    }
                });
                //没有下一环节办理人提示页面
            } else {
                _taskSubmit(null, null, layerMsg);
            }
        }

        //result.flg 表单保存是否成功 result.ywDataId 业务数据ID result.wfTitle 流程实例标题
        var result;
        if (agree) {
            result = taskObj.checkAndSubmit(params);
        } else {
            result = {
                flg: true
            };
        }
        if (taskId) {
            if (result.flg) {
                if (param.hasFlowAuditOpinion) {
                    if (taskObj.checkAutoOpinion()) {
                        auditOpinion = taskObj.getAutoOpinion();
                    } else {
                        return;
                    }
                }
                if (!dataId) {
                    dataId = result.ywDataId;
                    draft = true;
                }
                _submit(result.msg);
            }
        } else {
            if (result.flg) {
                //有下一环节办理人提示页面
                if (hasHandleSubmit) {
                    $.post("/workflow/instance/startWorkflowAndGetHandleData",
                        {
                            flowCode: flowCode, dataId: result.ywDataId,
                            title: result.wfTitle || param.wfTitle,
                            wfVars: result.wfVars,
                            sourceData: sourceData ? JSON.stringify(sourceData) : "",
                            dataIds: result.dataIds
                        },
                        function (ar) {
                            if (ar.success) {
                                var retVal = ar.data;
                                dataId = retVal.data_id;
                                taskId = retVal.taskId;
                                if (retVal.hasDynamicUser == undefined || retVal.hasDynamicUser) {
                                    var buildParam = {
                                        id: taskId,
                                        blrList: retVal.blrList,
                                        nodeName: retVal.nodeName,
                                        info: retVal.info,
                                        sfbxscfj: retVal.sfbxscfj,
                                        agree: agree,
                                        opinion: handleOpinion || "",
                                        sureFunc: _taskSubmit,
                                        callBackCloseFunc: callBackClose,
                                        layerMsg: result.msg
                                    };
                                    RX.page.openWin({
                                        title: "办理确认",
                                        areaType: ['450px', '380px'],
                                        url: "/workflow/instance/handle",
                                        param: buildParam
                                    });
                                } else {
                                    RX.alert(retVal.msg);
                                }
                            } else {
                                RX.alert("获取流程办理页面数据出错");
                            }
                        })

                    //没有下一环节办理人提示页面
                } else {
                    $.post("/workflow/instance/startWorkflowAndSubmit",
                        {
                            flowCode: flowCode, dataId: result.ywDataId, opinion: opinion,
                            title: result.wfTitle || param.wfTitle, wfVars: result.wfVars,
                            sourceData: sourceData ? JSON.stringify(sourceData) : "",
                            dataIds: result.dataIds
                        },
                        function (ar) {
                            if (ar.success) {
                                RX.msg(RX.SUCCESS_OPERATE, result.msg || "办理完成");
                                if (workFlowType === "layer") {
                                    reloadPrevWin();
                                } else {
                                    RX.page.goto(toTag, null, true);
                                }
                                RX.page.closeAll();
                            } else {
                                RX.alert(ar.msg);
                            }
                        });
                }
            }
        }
    }

    /**************************工作流按钮事件的处理******************************************/
    /**
     * 统一处理按钮事件
     * @param buttonConf
     */
    function handleWfButton(buttonConf) {
        //是自定义按钮
        if (buttonConf.type === RX.WF_DIY) {
            //个性按钮
            var funcName = buttonConf.funcName;
            var frameWin;
            if (tabPanel) {
                frameWin = tabPanel.getActiveTab().content.find("iframe")[0].contentWindow;
            } else {
                frameWin = RX.page.getWfForm(0).win;
            }
            frameWin[funcName] && frameWin[funcName](buttonConf.code);
        } else {
            var func;
            if (buttonConf.type) {
                func = btnFunc[buttonConf.type];
            } else {
                func = buttonConf.funcName;
            }
            var handleFunc;
            try {
                handleFunc = eval(func);
            } catch (e) {
            }
            if (typeof handleFunc === "function") {
                handleFunc(buttonConf);
            }
        }
    }

    /**
     * 工作流提交
     * @param buttonConfig
     */
    function submitWf(buttonConfig) {
        handleSubmit(buttonConfig.defOpinion || buttonConfig.name, true, buttonConfig.code, null, buttonConfig.opinion);
    }

    /**
     * 退回
     * @param buttonConfig
     */
    function refuseWf(buttonConfig) {
        if (nature === "2") {
            RX.page.openWin({
                title: "选择退回节点",
                areaType: ['280px', '200px'],
                url: "/workflow/instance/selectBackNode?mergeNodeId=" + nodeId
            });
        } else {
            handleSubmit(buttonConfig.defOpinion || "不同意", false, buttonConfig.code, null, buttonConfig.opinion);
        }
    }

    /**
     *  草稿
     * @param buttonConfig
     */
    function saveDraft(buttonConfig) {
        /**
         * 保存每个表单的草稿
         */
        function handleTmpData() {
            if (taskObj.tmpDataSave(buttonConfig.code)) {
                reloadFlag = true;
                if (workFlowType === "layer") {
                    reloadPrevWin();
                    RX.page.close();
                } else {
                    RX.page.goto(toTag, null, true);
                }
                RX.msg("保存" + buttonConfig.name + "成功");
            }
        }

        if (taskId) {
            handleTmpData();
        } else {
            taskObj.startWorkflow(flowCode, param.wfTitle, sourceData ? JSON.stringify(sourceData) : "", function (data) {
                taskId = data;
                handleTmpData();
            });
        }
    }

    /**
     * 撤回
     * @param buttonConfig
     */
    function cancelWf(buttonConfig) {
        RX.page.confirm("确认要撤回该任务吗？", function () {
            taskObj.withdrawWf(function () {
                RX.msg(RX.SUCCESS_OPERATE, "撤回成功");
                if (workFlowType === "layer") {
                    var prevWin = RX.page.prevWin();
                    if (prevWin && prevWin.reloadTable) {
                        prevWin.reloadTable();
                    }
                } else {
                    RX.page.goto(toTag);
                }
                RX.page.closeAll();
            });
        });
    }

    /**
     * 删除
     * @param buttonConfig
     */
    function delWf(buttonConfig) {
        RX.page.confirm("确定删除该条记录吗？", function () {
            //记录刷新标志
            reloadFlag = true;
            var result = {flg: true};
            if (dataId) {
                result = taskObj.deleteForm(buttonConfig.code);
            }
            if (result.flg) {
                result = taskObj.deleteFlow(taskId);
            }
            if (workFlowType === "layer") {
                reloadPrevWin();
                RX.page.closeAll();
            } else {
                RX.page.goto(toTag);
            }
        });
    }

    /**
     * 保存
     * ps：功能暂未提供，保留
     */
    function saveWf(buttonConfig) {
        var checkFlag = taskObj.checkForm(buttonConfig.code);
        if (checkFlag.flag) {
            var saveFlag = taskObj.saveForm(buttonConfig.code);
            if (saveFlag.flag) {
                RX.page.alert(saveFlag.msg || ((buttonConfig.name || "保存") + "成功"));
            }
        }
    }

    /**
     * 查看流程图
     */
    function viewWf() {
        // var url = "/workflow/instance/workflowView?flowCode=" + flowCode;
        // if (wiId)
        //     url += "&id=" + wiId;
        // RX.page.openWin({
        //     title: "流程监控",
        //     areaType: ["850px", "550px"],
        //     url: url
        // });
        RX.page.open({
            title: "流程图",
            areaType: "big",
            url: "workflow/ibps/flowImage",
            param: {wfId: wfId, instId: wiId}
        });
    }

    /**
     * 特送退回
     */
    function specialBack() {
        var callBack = function () {
            RX.msg("办理完成");
            if (workFlowType === "layer") {

            } else {
                RX.page.goto(toTag);
            }
            RX.page.closeAll();
        };
        var buildParam = {
            taskId: taskId,
            toTag: toTag,
            callBack: callBack
        };
        RX.page.openWin({
            title: "选择特送退回环节",
            areaType: "small",
            url: "/workflow/instance/specialBack",
            param: buildParam
        });
    }

    /**
     * 催办
     */
    function pressWf() {
        RX.page.openWin({
            title: "填写催办内容",
            areaType: "small",
            url: "/workflow/instance/pressContent",
            param: {
                postPress: function (content) {
                    $.post("/workflow/instance/pressTask", {taskId: taskId, content: content}, function (ar) {
                        if (ar.success) {
                            RX.msg("催办成功");
                        } else {
                            RX.page.alert(ar.msg);
                        }
                    });
                }
            }
        });
    }

    /**
     * 关闭
     */
    function closeWf() {
        if (!flowViewTag) {
            if (workFlowType === "layer") {
                RX.page.close(null, true);
            } else {
                RX.page.goto(toTag);
            }
        } else {
            RX.page.close();
        }
    }

    //刷新前一个面板
    function reloadPrevWin() {
        var prevWin = RX.page.prevWin();
        if (prevWin && prevWin.reloadTable) {
            prevWin.reloadTable();
        }
    }
});

//页面resize
function resizePage() {
    //搜索区布局展示
    $("#sheetList").height($(window).height() - $(".bottomTips").outerHeight() - $(".operation_box").outerHeight());
    tabPanel && tabPanel.resize();
}

RX.page.cancelCheck = function () {
    //判断逻辑错误
    if (!$("#submit").is(":hidden")) {
        var closeTag = true;
        var framesList = RX.page.getWfForm();
        for (var i = 0; i < framesList.length; i++) {
            if (framesList[i].ifChange) {
                if (framesList[i].ifChange()) {
                    closeTag = false;
                    break;
                }
            }
        }
        if (!closeTag) {
            RX.confirm(RX.CANCEL_CHECK, function () {
                RX.page.close();
            });
            return false;
        }
    }
    //刷新页面
    if (workFlowType === "layer" && reloadFlag) {
        //1、是layer风格的，2、保存了通过了
        var mainwin = RX.page.prevWin();
        if (mainwin && mainwin.reloadTable) {
            mainwin.reloadTable();
        }
    }
    return true;
}

//查看附件(意见区-建委)
function lookAttachment(uuid) {
    RX.page.openWin({
        title: '查看附件',
        areaType: ["550px", "400px"],
        url: "/attachment/wfAttachment?fj_id=" + uuid + "&random=" + Math.random() + "&type=ck"
    });
}
