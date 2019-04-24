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
        el: '.form_box',
        template: '#sysUserForm',
        config: config,
        settings: {
            getData: {
                url: id && "/user/getSysUserById",
                defaultData: {sysGlbUser: [], sysGlbRoleList: [], sysOrganRoleList: [],sysUserInfo: {}},
                param: {id: id},
                success: function (ar) {
                    if (ar.success) {
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
            "SysGlbRoleGrid":
                {
                    widget: RX.Grid,
                    template: '#sysGlbRole',
                    config: sysGlbRoleConfig,
                    methods: {
                        addSysGlbRole: function () {
                            var glbRoleList = sysUserFormVm.get("sysGlbRoleList");
                            var param = {
                                ifOwn: "owner",
                                func: "sysRoleSelectCallback",
                                selIds: this.$parent.getExistRoleIds(),
                                notShowType:"3",
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
                                param.roleLevel = '2';
                                param.mulchose = false;
                            }
                            if (hasAdmin) {
                                RX.msg(RX.ICON_WARNING, "该用户已经包含管理员角色,无法添加管理员角色!");
                                return false;
                            }
                            RX.page.open({
                                title: "选择角色",
                                areaType: "medium",
                                url: "/role/roleSelect",
                                param: param
                            });
                        },
                        deleteSysGlbRole: function (keypath) {
                            this.set(keypath + ".sfyxSt", "UNVALID");
                        },
                        deleteRole: function (keypath) {
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
 * 选择机构回调函数
 * @param organId
 * @param organName
 */
function organSelectCallback(organId, organName) {
    sysUserFormVm.set("defaultOrganId", organId);
    sysUserFormVm.set("dftOrganName", organName);
    sysUserFormVm.set("sysGlbUser.0.organId", organId);
    sysUserFormVm.set("sysGlbUser.0.sfyxSt", "VALID");
    changOrganRoleList();
}

//机构变动刷新角色关系列表
function changOrganRoleList() {
    var organId = sysUserFormVm.get("defaultOrganId");
    var organRoleList = getLinkRole(organId);
    renderOrganRole(organRoleList);
}


/**
 *获取机构的关联角色
 * @param 机构ids
 */
function getLinkRole(organIds) {
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
 * 渲染用户所属的机构带来的角色
 */
function renderOrganRole(organRoleList) {
    //清空机构带来角色
    sysUserFormVm.$refs.organRole.set("list", []);
    $.each(organRoleList, function (i, t) {
        //过滤已经存在的角色
        sysUserFormVm.append("sysOrganRoleList", {
            roleId: t.ID,
            roleName: t.ROLE_NAME,
            roleCode: t.ROLE_CODE,
            roleType: t.ROLE_TYPE,
            roleTypeName: t.ROLE_TYPE_NAME,
            organId: t.ORGAN_ID,
            glType: '3'
        });
        //当机构中包含用户个性定制的角色，去除用户的个性定制的角色
        var list = sysUserFormVm.get("sysGlbRoleList") || [];
        $.each(list, function (j, k) {
            if (t.ROLE_CODE === k.roleCode) {
                sysUserFormVm.$refs.sysGlbRoleGrid.set("list." + j + ".sfyxSt", "UNVALID");
            }
        })
    });
}

/**
 * 机构删除后，清空机构角色列表
 */
function organChange() {
    sysUserFormVm.set("defaultOrganId", "");
    sysUserFormVm.set("sysGlbUser.0.sfyxSt", "UNVALID");
    renderOrganRole([]);
}

//添加用户初始化操作
function addUserInit() {
    var organId = RX.page.param.organId; //初始机构id
    var organName = RX.page.param.organName; //初始机构名称
    if (organId) {
        sysUserFormVm.set("defaultOrganId", organId);
        sysUserFormVm.set("dftOrganName", organName);
        renderAddRole("organ", organId);
        sysUserFormVm.append("sysGlbUser", {
            organId: organId,
            sfyxSt: 'VALID'
        });
    }
}

/**
 * 从树上新增用户时或添加机构时，展示当前要素已经关联的角色
 * @param type organ 机构
 * @param id
 */
function renderAddRole(type, id) {
    var organRoleList = getLinkRole(id);
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

//关闭确认
RX.page.cancelCheck = function () {
    if (sysUserFormVm.ifChange()) {
        RX.confirm("页面已修改，确认关闭吗", function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};