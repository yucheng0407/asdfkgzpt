var id = RX.page.param.id;
var organVm;
$(function () {

    //初始化表单按钮控件
    buttons = RX.button.init($(".w_button_box"), buttonsJson);
    $(".w_button_box").find("input").show();

    //视图初始化
    organVm = new Rxvm({
        el: '.form_box',
        config: organConfig,
        settings: {
            getData: {
                url: id ? "/demoOrgan/getDemoOrganById?id=" + id : null
                // ,defaultData:{
                //     changeFunc: changeFunc
                // }
            }
        },
        methods:{
            enterMethod:function(){
                RX.msg(111);
            }
        },
        //子组件声明
        components: {
            "ProjectGrid": {
                widget: RX.Grid,
                config: projectConfig,
                methods: {
                    addProject: function () {

                        //Case 1
                        this.append("list",{sfyxSt: "VALID"});

                        //Case 2
                        // this.$parent.append("demoProjectList", {sfyxSt: "VALID"});

                    },
                    reloadProject: function () {
                        this.empty("list");
                    },
                    deleteProject: function (keypath) {

                        // Case 1
                        this.set(keypath + ".sfyxSt", "UNVALID");

                        //Case 2
                        // this.$parent.set("demoProjectList." +keypath.split(".").pop() + ".sfyxSt", "UNVALID");

                    }
                }
            }

            ,"LeaderGrid": {
                widget: RX.Grid,
                template: '#leaderGrid',
                config: leaderConfig,
                settings:{
                    selectType:"single"
                },
                methods: {
                    addLeader: function () {
                        RX.page.open({
                            title: "查找", areaType: "medium",
                            param:{
                                dd:11,
                                tt:22
                            },
                            url: "/demo/cmptDemoUserSelect?func=leaderSelectCallback&selIds=" + this.getExistUserIds() + "&flag=disChose"
                        });
                    },
                    deleteLeader: function (keypath) {
                        this.set(keypath + ".sfyxSt", "UNVALID");
                    },
                    getExistUserIds: function () {
                        var idArr = [];
                        $.each(this.get("list"), function (i, t) {
                            if (t.sfyxSt !== "UNVALID" && t.userId) {
                                idArr.push(t.userId);
                            }
                        });
                        return idArr.join();
                    },
                    addSubLeader:function(keypath){
                        this.append(keypath+".subList",{sfyxSt:"VALID"});
                    }
                },
                //子组件声明
                components: {
                    "SubLeaderGrid": {
                        widget: RX.Grid,
                        template: "#subLeaderGrid",
                        methods:{
                            deleteSubLeader:function(keypath){
                                this.set(keypath+".sfyxSt", "UNVALID");
                            }
                        }
                    }
                }
            }
        },
        afterMount: function(){
            if(!id){
                this.setData({organName:"a",barValue:"2", demoProjectList:[{projectName:"p1", projectType:"t1", clrq:"8月1日"}]});
            }
        }
    });

});

//选择领导人回调
function leaderSelectCallback(rows) {
    $.each(rows, function (i, t) {
        organVm.append("demoLeaderList", {
            leaderName: t.USER_NAME,
            sex: t.SEX,
            userId: t.ID,
            sfyxSt: "VALID"
        });
    });
}

//保存按钮回调
function save() {
    if (organVm.ruleValidate() && organVm.$refs.projectGrid.ruleValidate()) {
        $.ajax({
            type: "post",
            url: "/demoOrgan/saveDemoOrgan",
            data: {demoOrgan: organVm.getJson()},
            dataType: "json",
            success: function (ar) {
                if (ar.success) {
                    RX.msg("保存成功");
                    RX.page.close();
                    RX.page.prev().reload();
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
    }
}

//关闭验证事件注册
RX.page.cancelCheck = function () {
    if (organVm.ifChange()) {
        RX.confirm("页面已修改，确认关闭吗", function (index) {
            RX.page.close();
        });
        return false;
    }
    return true;
};

function changeFunc(){
    RX.log(this.get("text"));
}