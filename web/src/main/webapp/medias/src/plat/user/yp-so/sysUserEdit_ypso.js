/**
 * SysUser(用户表)表单
 */

var param = RX.page.param;
var id = param.id;
var sysUserFormVm;
var sysUserInfo;

var loginUser = RX.cache(top, "USER");//当前登陆用户信息
var loginUserRoleLevel = loginUser.roleLevel,//当前登陆用户最高角色级别
    loginUserRoleLevelId = loginUser.roleLevelId;//当前登陆用户最高角色级别角色id
$(function () {
    //初始化表单按钮控件
    RX.button.init($("#w_butt"), buttonsJson, "xz");

    //视图初始化
    sysUserFormVm = new Rxvm({
        el: '.user_form',
        template: '#sysUserForm',
        config: config,
        settings: {
            getData: {
                url: id && "/user/getSysUserById",
                param: {id: id},
                defaultData: {sysGlbUser: [], sysGlbRoleList: [], sysOrganRoleList: [], sysUserInfo: {}},
                success: function (ar) {
                    if (ar.success) {
                        var glbUser = ar.data.sysGlbUser;
                        if (glbUser.length > 0) {
                            if (glbUser[0].postRoleName) {
                                ar.data.dftOrganName = glbUser[0].organName + "·" + glbUser[0].postRoleName;
                            }
                        }
                        return ar.data;
                    }
                }
            }
        },
        methods: {
            /**
             * 获取用户拥有的角色ids
             * @returns {string}
             */
            getExistRoleIds: function () {
                var vm = this;
                var idArr = [];
                //已经单独关联的角色不可选择
                $.each(vm.get("sysGlbRoleList"), function (i, t) {
                    if (t.sfyxSt !== "UNVALID") {
                        idArr.push(t.roleId);
                    }
                });
                //所在机构已经包含的角色，不可选择
                var organRoles = vm.get("sysOrganRoleList");
                $.each(organRoles, function (i, t) {
                    idArr.push(t.roleId);
                });
                return idArr.join();
            }
        },
        //子组件声明
        components: {
            "SysGlbRoleGrid": { //关联角色组件
                widget: RX.Grid,
                template: '#sysGlbRole',
                config: sysGlbRoleConfig,
                methods: {
                    //添加关联角色
                    addSysGlbRole: function () {
                        var glbRoleList = sysUserFormVm.get("sysGlbRoleList");
                        var param = {
                            ifOwn: "owner",
                            func: "sysRoleSelectCallback",
                            selIds: this.$parent.getExistRoleIds(),
                            notShowType: "3",
                            mulchose: true
                        };
                        if (loginUserRoleLevel == '1') { //平台管理员登陆时
                            var hasAdmin = false;
                            //判断是否包含管理员角色
                            $.each(glbRoleList, function (i, t) {
                                if (t.sfyxSt !== "UNVALID" && t.levels === "2") {
                                    hasAdmin = true;
                                    return false;
                                }
                            });
                            if (hasAdmin) {
                                RX.msg(RX.ICON_WARNING, "该用户已经包含管理员角色,无法添加管理员角色!");
                                return false;
                            }
                            param.roleLevel = '2';
                            param.mulchose = false;
                        }
                        RX.page.open({
                            title: "选择角色",
                            areaType: "medium",
                            url: "/role/roleSelect",
                            param: param
                        });
                    },
                    //删除关联角色
                    deleteSysGlbRole: function (keypath) {
                        this.set(keypath + ".sfyxSt", "UNVALID");
                    }
                }
            },
            "OrganRole": {
                widget: RX.Grid,
                template: '#organRole',
                config: organRoleConfig,
                methods: {
                    //角色禁用
                    disabled: function (keypath, $event) {
                        $($event.originalEvent.currentTarget).parent().parent().addClass("disable");
                        this.set(keypath + ".sfqySt", "UNVALID");
                        return false;
                    },
                    //角色启用
                    able: function (keypath, $event) {
                        $($event.originalEvent.currentTarget).parent().parent().removeClass("disable");
                        this.set(keypath + ".sfqySt", "VALID");
                        return false;
                    }
                }
            }
        },
        afterMount: function () {
            //向主对象中添加loginUserRoleLevel
            this.set("loginUserRoleLevel", loginUserRoleLevel);
            //向主对象中添加loginUserRoleLevelId
            this.set("loginUserRoleLevelId", loginUserRoleLevelId);
            addUserInit();
            sysUserInfo = new Rxvm({
                el: '.user_info',
                template: '#userInfoForm',
                config: userInfoConfig,
                data: sysUserFormVm.get("sysUserInfo")
            })
        }
    });
});


/**
 * 保存方法
 */
function save() {
    if (sysUserFormVm.ruleValidate()) {
        sysUserFormVm.set("sysUserInfo", JSON.parse(sysUserInfo.getJson()));
        $.ajax({
            type: "post",
            url: "/user/saveSysUser",
            data: {sysUser: sysUserFormVm.getJson()},
            dataType: "json",
            async: false,
            success: function (ar) {
                if (ar.success) {
                    RX.msg(RX.SUCCESS_SAVE);
                    RX.page.close();
                    RX.page.prev().reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}

//选择角色回调
function sysRoleSelectCallback(rows) {
    $.each(rows, function (i, t) {
        sysUserFormVm.append("sysGlbRoleList", {
            roleId: t.ID,
            roleName: t.ROLE_NAME,
            roleCode: t.ROLE_CODE,
            glType: '3',
            levels: t.LEVELS,
            roleType: t.ROLE_TYPE,
            roleTypeName: t.ROLE_TYPE_NAME,
            createRoleId: t.CREATE_ROLE_ID
        });
    });
}

/**
 * 从机构岗位树中选择机构岗位 render页面
 * 当有岗位时，需要将岗位保存到SYS_GLB_ROLE 中
 * @param organId
 * @param organName
 * @param postRoleName
 * @param postRoleId
 * @returns {boolean}
 */
function addOrganPost(organId, organName, postRoleName, postRoleId) {
    if (checkIsRepeat(organId, postRoleId)) {
        var models = sysUserFormVm.get("sysGlbUser");
        var flag = true;
        //判断关联表中是否有数据，有数据，默认机构
        for (var i = 0, maxLength = models.length; i < maxLength; i++) {
            if (models[i].sfyxSt == "VALID") {
                flag = false;
                break;
            }
        }
        if (flag) {
            sysUserFormVm.set("defaultOrganId", organId);
            sysUserFormVm.set("dftOrganName", organName);
        }
        sysUserFormVm.append("sysGlbUser", {
            organName: organName,
            postRoleName: postRoleName,
            organId: organId,
            postRoleId: postRoleId,
            sfyxSt: 'VALID'
        });
        //改变机构角色的面板
        changOrganRoleList();
        //同步岗位角色进入SYS_GLB_ROLE
        if (postRoleId) {
            tbPostRole("add", postRoleId);
        }

    } else {
        if (postRoleId) {
            RX.msg(RX.ICON_WARNING, "所选岗位已存在");
        } else {
            RX.msg(RX.ICON_WARNING, "所选机构已存在");
        }
        return false;
    }
}

/**
 * 同步岗位角色进入角色关联表中
 * 新增岗位时，需要将岗位角色添加到角色关联表中
 * 删除岗位时，需要将岗位从角色关联表中剔除
 * @param postRoleId
 */
function tbPostRole(type, postRoleId) {
    var glbRoleList = sysUserFormVm.$refs.sysGlbRoleGrid.get("list");
    if ("add" === type) {
        sysUserFormVm.append("sysGlbRoleList", {
            roleId: postRoleId,
            glType: 3,
            roleType: 3
        });
    } else if ("del" === type) {
        $.each(glbRoleList, function (i, t) {
            if (t.roleType == 3 && postRoleId == t.roleId) {
                sysUserFormVm.$refs.sysGlbRoleGrid.set("list." + i + ".sfyxSt", "UNVALID");
            }
        });
    }
}

//所属机构和岗位验重
function checkIsRepeat(organId, postRoleId) {
    var organPostList = sysUserFormVm.get("sysGlbUser");
    var result = true;
    $.each(organPostList, function (i, t) {
        if (postRoleId == null) {
            if (t.organId === organId && ((t.postRoleId === null || t.postRoleId === "") && t.sfyxSt === "VALID")) {
                result = false;
            }
        } else {
            if (t.organId === organId && t.postRoleId === postRoleId && t.sfyxSt === "VALID") {
                result = false;
            }
        }
    });
    return result;
}

//机构、岗位变动刷新关系列表
function changOrganRoleList() {
    var oIds = "";
    var models = sysUserFormVm.get("sysGlbUser");

    for (var i = 0, maxLength = models.length; i < maxLength; i++) {
        if (models[i].sfyxSt !== "UNVALID") {
            //机构ID
            var oId = models[i].organId;
            oIds += oId + ",";
        }
    }
    var organRoleList = getOrgansLinkRole(oIds);
    renderOrganRole(organRoleList);
}

//添加用户初始化操作
function addUserInit() {
    var param = RX.page.param,
        organId = param.organId, //初始机构id
        organName = param.organName, //初始机构名称
        postRoleName = param.postRoleName, //初始岗位名称
        postRoleId = param.postRoleId;  //岗位ID
    if (organId == "undefined" || organId == -1 || !organId) {//初始机构不存在
        organName = null;
        organId = null;
        postRoleName = null;
        postRoleId = null;
    } else {//初始机构存在
        sysUserFormVm.set("dftOrganName", organName + "▪" + postRoleName);
        sysUserFormVm.set("defaultOrganId", organId);
        if (postRoleId == "undefined" || !postRoleId) { //初始机构存在，初始岗位不存在
            postRoleName = null;
            postRoleId = null;
        }
        sysUserFormVm.append("sysGlbUser", {
            organName: organName,
            postRoleName: postRoleName,
            organId: organId,
            postRoleId: postRoleId
        });
    }
    if (organId) {
        renderAddRole("organ", organId);
    }
}

/**
 * 从树上新增用户时或添加机构时，展示当前要素已经关联的角色
 * @param type organ 机构
 * @param id
 */
function renderAddRole(type, id) {
    var organRoleList = getOrgansLinkRole(id);
    renderOrganRole(organRoleList)
}

/**
 * 渲染用户所属的机构带来的角色
 */
function renderOrganRole(organRoleList) {
    sysUserFormVm.set("sysOrganRoleList", []);
    $.each(organRoleList, function (i, t) {
        //过滤已经存在的角色
        sysUserFormVm.append("sysOrganRoleList", {
            roleId: t.roleId,
            roleName: t.roleName,
            roleCode: t.roleCode,
            roleType: t.roleType,
            roleTypeName: t.roleTypeName,
            organId: t.organId,
            organName: t.organName,
            glType: '3'
        });

        //当机构中包含用户个性定制的角色，去除用户的个性定制的角色
        var list = sysUserFormVm.get("sysGlbRoleList") || [];
        $.each(list, function (j, k) {
            if (t.roleCode === k.roleCode) {
                sysUserFormVm.$refs.sysGlbRoleGrid.set("list." + j + ".sfyxSt", "UNVALID");
            }
        })
    });
}


function organChange() {
    renderOrganRoleAfterDelOrgan();
}

/**
 * 删除机构后重新
 * 渲染用户所属的机构带来的角色
 * 当用户已经有角色禁用时，需要判断将禁用信息加上
 */
function renderOrganRoleAfterDelOrgan(organRoleList) {
    //1.获取当前已经禁用的角色
    var unValidRole = [];
    $.each(sysUserFormVm.get("sysOrganRoleList"), function (i, t) {
        if (t.sfqySt === "UNVALID") {
            unValidRole.push({roleId: t.roleId});
        }
    });
    //2.将当期的机构角色渲染
    sysUserFormVm.set("sysOrganRoleList", []);
    $.each(organRoleList, function (i, t) {
        sysUserFormVm.append("sysOrganRoleList", {
            roleId: t.roleId,
            roleName: t.roleName,
            roleCode: t.roleCode,
            roleType: t.roleType,
            roleTypeName: t.roleTypeName,
            organName: t.organName
        });
    });
    //3.渲染禁用
    $.each(sysUserFormVm.get("sysOrganRoleList"), function (i, t) {
        $.each(unValidRole, function (j, k) {
            if (t.roleId === k.roleId) {
                sysUserFormVm.$refs.organRole.set("list." + i + ".sfqySt", "UNVALID");
            }
        })
    });
}

/**
 *通过机构的ids获取机构的关联角色
 * @param organIds 机构ids
 */
function getOrgansLinkRole(organIds) {
    var roles = [];
    $.ajax({
        url: "/user/getOrgansLinkRole?ids=" + organIds,
        async: false,
        success: function (ar) {
            if (ar.success) {
                roles = ar.data;
            }
        }
    });
    return roles;
}

/**
 * 选择机构和岗位的回调函数
 * 功能：1.向sysGlbUser中插入三要素数据。 2.改变机构角色的面板。
 * @param organId 返回的机构id
 * @param organName 返回的机构名称
 * @param postRoleName 返回的岗位角色名称
 * @param postRoleId  返回的岗位角色Id
 */
function organSelectCallback(organId, organName, postRoleName, postRoleId) {
    sysUserFormVm.set("defaultOrganId", organId);
    if (postRoleName) {
        sysUserFormVm.set("dftOrganName", organName + "·" + postRoleName);
    } else {
        sysUserFormVm.set("dftOrganName", organName);
    }
    //三要素管理信息
    sysUserFormVm.set("sysGlbUser.0.organId", organId);
    sysUserFormVm.set("sysGlbUser.0.postRoleId", postRoleId);
    sysUserFormVm.set("sysGlbUser.0.sfyxSt", "VALID");
    changOrganRoleList();
}


//关闭确认
RX.page.cancelCheck = function () {
    if (sysUserFormVm.ifChange()) {
        RX.confirm(RX.CANCEL_CHECK, function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};