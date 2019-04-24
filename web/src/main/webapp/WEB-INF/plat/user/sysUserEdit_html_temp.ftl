<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>用户表</title>
    <script src="${ctxPath}/medias/rx.load.js"></script>
    <script type="text/javascript">
        RX.loadCSS({template: "platMain"});
    </script>
    <style>
        html, body {
            height: 100%;
            overflow: hidden;
            background: #fff;
        }
    </style>
</head>
<body>
<!--基础布局-->
<div class="form_box">
    <div class="user_form"></div>
</div>


<!--表单模板-->
<script type="text/template" id="sysUserForm">
    <div>
        <div class="p_box">
            <div class="page_title">
                <h1>用户表</h1>
            </div>
            <table class="form" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                    <th><b>*</b>用户名</th>
                    <td>
                        <div class="element_box">
                            <input title="" type="text" class="i_text" model="userName"/>
                        </div>
                    </td>
                    <th>性别</th>
                    <td>
                        <div class="element_box">
                            <div model="sex"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><b>*</b>登录账号</th>
                    <td>
                        <div class="element_box">
                            <input title="" type="text" class="i_text" model="loginName"/>
                        </div>
                    </td>
                    <#if organType=='ym'||organType=='nm'><#--一人多机构-->
                    <th class="defOrgan">默认机构</th>
                    <td class="defOrgan">
                        <div class="element_box">
                            <span class="span_show_ellipsis" title="{{dftOrganName||''}}">{{dftOrganName||""}}</span>
                        </div>
                    </td>
                    <#elseif organType=='ys'||organType=='ns'> <#--一人一机构-->
                    <th class="defOrgan">所属机构</th>
                    <td colspan="3"  class="defOrgan">
                        <div class="element_box">
                            <input title="" type="text" class="i_layer" model="dftOrganName"/>
                        </div>
                    </td>
                    </#if>
                </tr>
                <tr>
                    <th>身份证号码</th>
                    <td colspan="3" class="user_info"></td>
                </tr>
                </tbody>
            </table>
        </div>
        <#if organType=='ym'||organType=='nm'><#--一人多机构-->
        <!--机构岗位用户关联列表-->
        <SysGlbUser ref="sysGlbUser" list="{{sysGlbUser}}" defaultOrganId="{{defaultOrganId}}"/>
        </#if>

        <!--用户所在机构的角色关联列表-->
        <OrganRole ref="organRole" list="{{sysOrganRoleList}}"/>

        <!--角色关联表动态列表-->
        <SysGlbRoleGrid ref="sysGlbRoleGrid" list="{{sysGlbRoleList}}"/>
    </div>
</script>

<!--用户扩展信息-->
<script type="text/template" id="userInfoForm">
    <#list userInfo as item>
    <div class="element_box">
        <input title="" type="text" class="i_text" model="sfzhm"/>
    </div>
    </#list>
</script>

<!--角色关联表子模板-->
<script type="text/template" id="sysGlbRole">
    <div class="p_box">
        <div class="page_title"><h1>角色信息列表</h1>
            <ul class="action_button to_right">
                <li><a on-click="addSysGlbRole()"><i class="iconfont"></i>新增</a></li>
            </ul>
        </div>
        <table cellpadding="0" cellspacing="0" border="0" class="list">
            <thead>
            <tr>
                <th style="width:45px">序号</th>
                <th style="">角色名称</th>
                <th style="width:25%">角色编码</th>
                <th style="width:30%">角色类型</th>
                <th style="width:15%">操作</th>
            </tr>
            </thead>
            <tbody>
            {{#if list.length>0}}
            {{#each list:index}}
            {{#if sfyxSt !== "UNVALID" && roleType!=3}}
            <tr class="rx-grid-tr">
                <td align="left" class="orderTag"></td>
                <td align="left" title='{{roleName||""}}'>{{roleName||""}}</td>
                <td align="left" title='{{roleCode||""}}'>{{roleCode||""}}</td>
                <td align="left" title="{{roleTypeName||''}}">{{roleTypeName||''}}</td>
                <td align="left" ><a href="javascript:void(0);" title="删除" class="active_2" on-click="deleteRole($keypath)">删除</a></td>
            </tr>
            {{/if}}
            {{/each}}
            {{else}}
            <tr><td align="center" colspan="5" class="no_data">无数据</td></tr>
            {{/if}}
            </tbody>
        </table>
    </div>
</script>

<#if organType=='ym'||organType=='nm'><#--一人多机构-->
<!--所属机构岗位子模板-->
<script type="text/template" id="sysGlbUser">
    <div class="p_box">
        <div class="page_title"><h1>所属机构<#if organType=='ym'>岗位</#if>信息</h1>
            <ul class="action_button to_right">
                <li><a on-click="addOrganPost()"><i class="iconfont">{{{"&#xe62a;"}}}</i>新增</a></li>
                <li><a on-click="setDefaultOrgan()"><i class="iconfont">{{{"&#xe616;"}}}</i>设为默认机构</a></li>
            </ul>
        </div>
        <table cellpadding="0" cellspacing="0" border="0" class="list">
            <thead>
            <tr>
                <th style="width:45px">序号</th>
                <th style="">所属机构</th>
            <#if organType=='ym'>
                <th style="width:35%">所属岗位</th>
             </#if>
                <th style="width:20%">操作</th>
            </tr>
            </thead>
            <tbody>
            {{#if list.length>0}}
            {{#each list:index}}
            {{#if sfyxSt !== "UNVALID"}}
            <tr class="rx-grid-tr" on-click="select($keypath,$event)">
                <td align="left" class="orderTag"></td>
                <td align="left" title="{{organName||''}}">
                    {{#if organId==defaultOrganId}}
                    <div class="unique_box">{{organName||""}}</div>
                    <div class="right_tag">
                        <span class="tag_1">默认机构</span>
                    </div>
                    {{else}}
                    {{organName||""}}
                    {{/if}}
                </td>
            <#if organType=='ym'>
                <td align="left" title="{{postRoleName||''}}">
                    {{postRoleName||""}}
                </td>
            </#if>
                <td align="left"><a href="javascript:void(0);" title="删除" class="active_2" on-click="deleteOrganPost($keypath)">删除</a></td>
            </tr>
            {{/if}}
            {{/each}}
            {{else}}
            <tr><td align="center" colspan="<#if organType=='ym'>4<#else>3</#if>" class="no_data">无数据</td></tr>
            {{/if}}
            </tbody>
        </table>
    </div>
</script>
</#if>

<#--固定代码-->
<!--所在机构的角色信息-->
<script type="text/template" id="organRole">
    <div class="p_box">
        <div class="page_title"><h1>所在机构的角色信息</h1>
        </div>
        <table cellpadding="0" cellspacing="0" border="0" class="list">
            <thead>
            <tr>
                <th style="width:45px">序号</th>
                <th style="">角色名称</th>
                <th style="width:18%">角色编码</th>
                <th style="width:18%">角色类型</th>
                <th style="width:18%">角色来源</th>
                <th style="width:20%">操作</th>
            </tr>
            </thead>
            <tbody>
            {{#if list.length>0}}
            {{#each list:index}}
            {{#if sfyxSt !== "UNVALID"}}
            <tr class="rx-grid-tr"  {{#if sfqySt == "UNVALID"}} class="disable"{{/if}}>
            <td align="left" class="orderTag"></td>
            <td align="left" title="{{roleName||''}}">{{roleName||""}}</td>
            <td align="left" title={{roleCode||''}}>{{roleCode||""}}</td>
            <td align="left" title='{{roleTypeName||""}}'>{{roleTypeName||""}}</td>
            <td align="left" title="{{organName||''}}">{{organName||''}}</td>
            <td align="left"> {{#if sfqySt == "UNVALID"}} <i on-click="able($keypath,$event)" title="启用" class="iconfont lb_icon jy_icon">{{{"&#xe6c3;"}}}</i> {{else}} <i on-click="disabled($keypath,$event)" title="禁用" class="iconfont lb_icon qy_icon">{{{"&#xe6c4;"}}}</i>{{/if}}</td>
            </tr>
            {{/if}}
            {{/each}}
            {{else}}
            <tr><td align="center" colspan="6" class="no_data">无数据</td></tr>
            {{/if}}
            </tbody>
        </table>
    </div>
</script>

<!-- 下面按钮 -->
<div class="w_button_box" id="w_butt">
</div>
<script type="text/javascript">
    RX.load({
        template: "form",
        module: [
            "/medias/src/plat/user/yp-mo/sysUserEdit_config.js",
            "/medias/src/plat/user/yp-mo/sysUserEdit.js"]
    });
</script>
</body>
</html>