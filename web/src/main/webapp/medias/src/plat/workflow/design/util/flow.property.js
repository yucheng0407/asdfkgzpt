function workflowProperty() {
    this.id = "";

    this.version = '';

    this.code = '';

    this.name = '';

    this.description = '';

    // 操作状态:新建、修改、复制结构、新版本、另存、导入
    this.operatingStatus = OperatingStatus.MODIFY;

    this.startup = {};

    this.monitor = {};

    this.manager = {};

    this.type = '';

    this.typeName = '';

    this.issueMode = '1';

    this.autoIssueDate = '';

    this.status = '';

    this.priority = 'high';

    this.startupProcessSql = '';

    this.finishProcessSql = '';

    this.backStartupProcessSql = '';

    this.backFinishProcessSql = '';

    this.transactLimitedUnit = 0;

    this.transactLimitedValue = '';

    this.alertLimitedUnit = 0;

    this.alertLimitedValue = '';

    this.isForceTerminated = false;

    this.isReissued = false;

    this.instanceTitle = '';

    this.organization = '';

    this.stopSql = "";

    this.deleteSql = "";

    this.sfyxSt = "VALID";

    this.nodes = [];

    this.routers = [];

    this.variables = [];

    this.sheets = [];

    this.delNodes = [];

    this.delRouters = [];

    this.delVariables = [];

    this.deleteRouterDoms = [];

    this.delSheets = [];

    //业务状态字典
    this.workflowYwztZd = '';

    //业务状态字典名称
    this.workflowYwztZdName = '';

    //环节编码字典 编码
    this.nodeCodeDictCode = '';

    //环节编码字典 名称
    this.nodeCodeDictName = '';

    //分支聚合属性 1分支 2聚合 0普通
    this.nature = '0';

    this.addNode = function (node) {
        this.nodes.push(node);
    };

    this.addRouter = function (router) {
        this.routers.push(router);
    };

    this.addVariable = function (variable) {
        this.variables.push(variable);
    };

    this.addSheet = function (workflowSheet) {
        this.sheets.push(workflowSheet);
    };

    this.removeNode = function (index) {
        var node;
        if (index < this.nodes.length)
            node = this.nodes[index];

        this.nodes.logicRemove(index);
        if(node){
            for (var i = 0; i < this.routers.length; i++) {
                if (this.routers[i]) {
                    if (this.routers[i].startNodeId == node.domid) {
                        this.routers.logicRemove(i);
                    } else if (this.routers[i].endNodeId == node.domid) {
                        this.routers.logicRemove(i);
                    }
                }
            }
        }

//        if (node != null && node.id.toString().length > 0) {
//            this.delNodes.push(node.id);
//        }
    };

    this.removeRouter = function (domid) {
        var idx = -1;
        for (var i = 0; i < this.routers.length; i++) {
            if (this.routers[i].domid == domid) {
                idx = i;
                break;
            }
        }
        if (idx > -1) {
            this.routers.logicRemove(idx);
        }
    };

    this.removeVariable = function (index) {
        var variable;
        if (index < this.variables.length)
            variable = this.variables[index];

        this.variables.logicRemove(index);

//        if (variable != null && variable.id.toString().length > 0) {
//            this.delVariables.push(variable.id);
//        }
    };

    this.removeSheet = function (index) {
        var sheet;
        if (index < this.sheets.length)
            sheet = this.sheets[index];

        this.sheets.logicRemove(index);

//        if (sheet != null && sheet.id.toString().length > 0) {
//            this.delSheets.push(sheet.id);
//        }
    };

    this.editVariable = function (index, variable) {
        if (index >= this.variables.length) {
            return;
        }
        var findedVar = this.variables[index];
        if (findedVar) {
            findedVar.name = variable.name;
            findedVar.value = variable.value;
        }
    };

    this.editSheet = function (index, sheet) {
        if (index >= this.sheets.length) {
            return;
        }
        var findedSheet = this.sheets[index];
        if (findedSheet) {
            findedSheet.name = sheet.name;
            findedSheet.title = sheet.title;
            findedSheet.sheet_id = sheet.sheet_id;
            findedSheet.sort = sheet.sort;
        }
    }

}

function workflowVariable(id, name, value) {
    this.id = id || "";

    this.name = name == undefined ? '' : name;

    this.value = value == undefined ? '' : value;

    this.sfyxSt = "VALID";
}

function workflowSheet(id, name, title, sheet_id, sort) {
    this.id = id || "";

    this.name = name || '';

    this.title = title || '';

    this.sheet_id = sheet_id || '';

    this.sort = sort || '';

    this.sfyxSt = "VALID";
}

function nodeButton(id, name, code, icon, flag, funcName, sort, isShowInHandle, type, opinion) {
    this.id = id || "";
    this.name = name || "";
    this.code = code || "";
    this.icon = icon || "";
    this.flag = flag || "";
    this.funcName = funcName || "";
    this.sort = sort || "";
    this.isShowInHandle = isShowInHandle || "";
    this.type = type || "";
    this.opinion = opinion || "";
    this.sfyxSt = "VALID";
}

function nodeProperty() {
    this.domid = '';

    this.id = "";

    this.name = '';

    this.nodeSort = '';

    this.sfxscg = '1';

    this.sfxscb = '0';

    this.sfbxscfj = '0';

    this.x = '';

    this.y = '';

    this.type = '';

    this.transactUser = {};

    this.transferUser = {};

    this.transactLimitedUnit = 0;

    this.transactLimitedValue = '';

    this.alertLimitedUnit = 0;

    this.alertLimitedValue = '';

    this.startupProcessSql = '';

    this.backStartupProcessSql = '';

    this.finishProcessSql = '';

    this.autoHandleSql = '';

    this.backFinishProcessSql = '';

    this.eleOpinion = '';

    this.eleTransactUser = '';

    this.eleFinishDate = '';

    this.transactType = '';

    this.countersignParameter = 0;

    this.countersignValue = '';

    this.convergeType = 2;

    this.isSpecialSend = false;

    this.isSpecialReturn = false;


    this.childWorkflow = null;


    this.url = '';


    this.processSql = '';

    this.backProcessSql = '';

    this.sfyxSt = "VALID";

    this.decisionType = 1;

    this.sheets = [];

    this.delSheets = [];

    this.variables = [];

    this.buttons = RX.cache(_top, "DEFAULT_BUTTON_ARR");

    //提交个性设置名称
    this.submitName = '';

    //保存个性设置名称
    this.saveName = '';

    //是否显示提交按钮，控制或者1显示
    this.sfxstj = '1';

    //环节描述
    this.description = '';

    this.addSheet = function (nodeSheet) {
        for (var i = 0; i < this.sheets.length; i++) {
            if (parseInt(nodeSheet.sheet_id, 10) == parseInt(this.sheets[i].sheet_id, 10)) {
                this.editSheet(i, nodeSheet);
                this.delSheets.push(nodeSheet.id);
                return;
            }
        }
        this.sheets.push(nodeSheet);
    };

    this.removeSheet = function (index) {
        var sheet;
        if (index < this.sheets.length)
            sheet = this.sheets[index];

        this.sheets.logicRemove(index);

//        if (sheet != null && sheet.id.toString().length > 0) {
//            this.delSheets.push(sheet.id);
//        }
    };

    this.editSheet = function (index, sheet) {
        if (index >= this.sheets.length) {
            return;
        }
        var findedSheet = this.sheets[index];
        if (findedSheet) {
            findedSheet.sort = sheet.sort;
            findedSheet.name = sheet.name;
            findedSheet.title = sheet.title;
            findedSheet.sheet_id = sheet.sheet_id;
            findedSheet.sheetMode = sheet.sheetMode;
            findedSheet.spxName = sheet.spxName;
            findedSheet.spxSort = sheet.spxSort;
            findedSheet.spxPrint = sheet.spxPrint;
            findedSheet.sheetControls = sheet.sheetControls;
        }
    };

    this.addVariable = function (variable) {
        this.variables.push(variable);
    };

    this.removeVariable = function (index) {
        this.variables.logicRemove(index);
    };

    this.editVariable = function (index, variable) {
        if (index >= this.variables.length) return;
        var findedVar = this.variables[index];
        if (findedVar) {
            findedVar.name = variable.name;
            findedVar.value = variable.value;
        }
    };

    this.addButton = function (button) {
        this.buttons.push(button);
    }
}

nodeProperty.create = function (node, x, y, domid, id) {
    var n = new nodeProperty();
    n.domid = domid;
    n.id = id;
    n.x = x;
    n.y = y;

    if (node.constructor == StartNode) {
        n.type = "0";
        n.name = "开始";
    }
    else if (node.constructor == EndNode) {
        n.type = "1";
        n.name = "结束";
    }
    else if (node.constructor == DecisionNode) {
        n.type = "4";
        n.name = "决策环节";
    }
    else if (node.constructor == ActivityNode) {
        n.type = "2";
        n.name = "活动环节";
    }
    else if (node.constructor == CirculationNode) {
        n.type = "3";
        n.name = "传阅环节";
    }
    else if (node.constructor == ClusterNode) {
        n.type = "5";
        n.name = "嵌套环节";
    }

    node.flow.property.addNode(n);
    return n;
};


function nodeSheet() {
    this.id = "";

    this.name = '';

    this.title = '';

    this.sheet_Id = '';

    this.sheetMode = '';

    this.spxName = '';

    this.spxSort = '';

    this.spxPrint = '0';

    this.sheetControls = [];

    this.sort = '';

    this.sfyxSt = "VALID";

    this.addSheetControl = function (sheetControl) {
        this.sheetControls.push(sheetControl);
    }
}

function sheetControl() {
    this.fieldName = '';

    this.status = 1;

    this.value = '';

    this.isManager = false;

    this.sfyxSt = "VALID";
}

function routerProperty() {
    this.domid = '';

    this.id = "";

    this.name = '';

    this.description = '';

    this.branch = "";

    this.startNodeId = '';

    this.endNodeId = '';

    this.variables = [];

    this.sfyxSt = "VALID";
    this.addVariable = function (variable) {
        this.variables.push(variable);
    };

    this.removeVariable = function (index) {
        this.variables.remove(index);
    };

    this.editVariable = function (index, variable) {
        if (index >= this.variables.length) return;

        var findedVar = this.variables[index];
        if (findedVar) {
            findedVar.name = variable.name;
            findedVar.value = variable.value;
        }
    }

}

routerProperty.create = function (workflow, start, end, domid, id) {
    var r = new routerProperty();
    r.domid = domid;
    r.id = id;
    r.startNodeId = start.domid;
    r.endNodeId = end.domid;
    workflow.addRouter(r);
    return r;
};

function sysColony(id) {
    this.id = id;

    this.name = '';

    this.includeUsers = [];

    this.includeOrgans = [];

    this.includePosts = [];

    this.includeDyna = [];

    this.excludeUsers = [];

    this.excludeOrgans = [];

    this.excludePosts = [];

    this.excludeDyna = [];

    this.sfyxSt = "VALID";

    this.addIncludeUser = function (includeUser) {
        this.includeUsers.push(includeUser);
    };

    this.removeIncludeUser = function (index) {
        this.includeUsers.remove(index);
    };

    this.addIncludeOrgan = function (includeOrgan) {
        this.includeOrgans.push(includeOrgan);
    };

    this.removeIncludeOrgan = function (index) {
        this.includeOrgans.remove(index);
    };

    this.addIncludePost = function (includePost) {
        this.includePosts.push(includePost);
    };

    this.removeIncludePost = function (index) {
        this.includePosts.remove(index);
    };

    this.addExcludeUser = function (excludeUser) {
        this.excludeUsers.push(excludeUser);
    };

    this.removeExcludeUser = function (index) {
        this.excludeUsers.remove(index);
    };

    this.addExcludeOrgan = function (excludeOrgan) {
        this.excludeOrgans.push(excludeOrgan);
    };

    this.removeExcludeOrgan = function (index) {
        this.excludeOrgans.remove(index);
    };

    this.addExcludePost = function (excludePost) {
        this.excludePosts.push(excludePost);
    };

    this.removeExcludePost = function (index) {
        this.excludePosts.remove(index);
    }
}

function sysColonyUser() {
    this.id = '';

    this.name = '';

    this.sfyxSt = "VALID";
}

// 操作状态
var OperatingStatus = {
    CREATED: '1', // 新建
    MODIFY: '2', // 修改
    NEWVERSION: '3', // 新版本
    COPYSTRUCTURE: '4', // 复制结构
    SAVEAS: '5', // 另存：新版本+复制结构
    IMPORTING: '6'// 导入
};