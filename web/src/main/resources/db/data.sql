prompt PL/SQL Developer import file
prompt Created on 2018年11月12日 星期一 by Administrator
set feedback off
set define off
prompt Loading SYS_AUTH_RULE...
insert into SYS_AUTH_RULE (id, object_id, qxlx, gzlx, page_ids, gl_rule_id, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (2, null, null, null, null, 2, 286, to_date('23-10-2017 17:07:23', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-11-2018 18:06:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_AUTH_RULE (id, object_id, qxlx, gzlx, page_ids, gl_rule_id, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (353, null, null, '2', null, 377, 815, to_date('30-10-2018 15:43:16', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-10-2018 15:43:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_AUTH_RULE (id, object_id, qxlx, gzlx, page_ids, gl_rule_id, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (354, null, null, '2', null, 378, 815, to_date('30-10-2018 16:07:24', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('12-11-2018 09:33:21', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_AUTH_RULE (id, object_id, qxlx, gzlx, page_ids, gl_rule_id, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (355, null, null, '2', null, 379, 815, to_date('01-11-2018 18:11:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-11-2018 18:05:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_AUTH_RULE (id, object_id, qxlx, gzlx, page_ids, gl_rule_id, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (356, null, null, '2', null, 380, 815, to_date('09-11-2018 08:24:02', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-11-2018 08:24:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_AUTH_RULE (id, object_id, qxlx, gzlx, page_ids, gl_rule_id, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (351, null, null, '2', null, 375, 815, to_date('30-10-2018 15:08:42', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-11-2018 18:05:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_AUTH_RULE (id, object_id, qxlx, gzlx, page_ids, gl_rule_id, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (352, null, null, '2', null, 376, 815, to_date('30-10-2018 15:19:19', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-10-2018 15:19:19', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 7 records loaded
prompt Loading SYS_BASE_RULE...
insert into SYS_BASE_RULE (id, rule_name, sxfs, rule_detail, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, config_type, subject, rule_range, include_subject)
values (2, '流程启动人', '2', 'PKG_WF_DAMIC_USER.P_WF_DEFAULT_TRANSACTOR', null, 1, to_date('05-06-2017 10:15:44', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-11-2018 18:06:01', 'dd-mm-yyyy hh24:mi:ss'), '1', '0', '0', '0', null);
insert into SYS_BASE_RULE (id, rule_name, sxfs, rule_detail, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, config_type, subject, rule_range, include_subject)
values (378, 'dqfqf', '2', 'dqfqf', null, 815, to_date('30-10-2018 16:07:24', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('12-11-2018 09:33:21', 'dd-mm-yyyy hh24:mi:ss'), '0', null, null, null, null);
insert into SYS_BASE_RULE (id, rule_name, sxfs, rule_detail, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, config_type, subject, rule_range, include_subject)
values (379, '上一环节办理人所在组织', null, 'PKG_WF_DAMIC_USER.P_WF_DEFAULT_TRANSACTOR', null, 815, to_date('01-11-2018 18:11:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-11-2018 18:05:45', 'dd-mm-yyyy hh24:mi:ss'), '1', '0', '1', '1', '0');
insert into SYS_BASE_RULE (id, rule_name, sxfs, rule_detail, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, config_type, subject, rule_range, include_subject)
values (380, '流程启动人所在组织', null, 'PKG_WF_DAMIC_USER.P_WF_DEFAULT_TRANSACTOR', null, 815, to_date('09-11-2018 08:24:02', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-11-2018 08:24:02', 'dd-mm-yyyy hh24:mi:ss'), '1', '0', '0', '1', '0');
insert into SYS_BASE_RULE (id, rule_name, sxfs, rule_detail, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, config_type, subject, rule_range, include_subject)
values (375, '上一环节办理人', '2', 'PKG_WF_DAMIC_USER.P_WF_DEFAULT_TRANSACTOR', null, 815, to_date('30-10-2018 15:08:42', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-11-2018 18:05:59', 'dd-mm-yyyy hh24:mi:ss'), '1', '0', '1', '0', null);
insert into SYS_BASE_RULE (id, rule_name, sxfs, rule_detail, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, config_type, subject, rule_range, include_subject)
values (376, '测试保存', '2', 'abc', null, 815, to_date('30-10-2018 15:19:19', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-10-2018 15:19:19', 'dd-mm-yyyy hh24:mi:ss'), null, null, null, null, null);
commit;
prompt 6 records loaded
prompt Loading SYS_CONFIG...
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4301, '新增用户默认角色', 'DEFAULT_ROLE', 'DEFAULT_ROLE', '新增用户默认赋予的角色，若新增用户添加了角色或所在机构存在角色，则该不赋予该角色。', 815, to_date('19-07-2018 14:14:13', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-07-2018 14:14:13', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '3', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4361, '流程处理意见默认展开', 'expandOpinion', 'false', '流程处理意见是否默认展开', 815, to_date('24-10-2018 14:47:12', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('24-10-2018 15:11:01', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '4', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4362, 'FTP服务器IP', 'FTP_IP', '172.28.1.36', null, 815, to_date('01-11-2018 17:20:00', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:20:00', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '11', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4363, 'FTP服务器端口号', 'FTP_PORT', '21', 'ftp服务器端口号默认为21', 815, to_date('01-11-2018 17:21:31', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:21:31', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '11', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4364, 'FTP登录账号', 'FTP_ACCOUNT', 'ha', null, 815, to_date('01-11-2018 17:22:12', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:22:12', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '11', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4365, 'FTP登录密码', 'FTP_PASSWORD', '1', null, 815, to_date('01-11-2018 17:23:13', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:23:13', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '11', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (109, '用户图标(树)', 'userIcon', '/medias/style/plat/default/css/image/tree/user.png', null, 1, to_date('07-09-2017 11:36:29', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-09-2018 17:29:40', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (105, '附件存放路径', 'attachmentPath', 'D:\platFile\file', '附件存放的文件夹路径', 1, to_date('07-09-2017 11:29:31', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 18:17:10', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '5', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (110, '菜单图标(树)', 'menuIcon', '/medias/style/plat/image/tree/menu.png', null, 1, to_date('07-09-2017 11:37:11', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('28-08-2018 11:22:23', 'dd-mm-yyyy hh24:mi:ss'), '0', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (103, '文件扩展名', 'docExt', 'doc,docx,xls,xlsx,ppt,pptx,txt,pdf,zip,rar', '非图片文件', 1, to_date('07-09-2017 11:23:22', 'dd-mm-yyyy hh24:mi:ss'), 1, to_date('14-09-2017 11:02:47', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '5', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (104, '图片扩展名', 'imgExt', 'bmp,jpg,jpeg,png,gif', '图片文件', 1, to_date('07-09-2017 11:24:04', 'dd-mm-yyyy hh24:mi:ss'), 1, to_date('14-09-2017 11:29:26', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '5', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (106, '缩略图存放路径', 'thumbnailPath', 'D:\platFile\thumb', '缩略图存放的文件夹路径', 1, to_date('07-09-2017 11:31:34', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 18:17:17', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '5', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (107, '机构图标(树)', 'organIcon', '/medias/style/plat/default/css/image/tree/organ.png', null, 1, to_date('07-09-2017 11:33:42', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-09-2018 17:29:28', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (108, '岗位图标(树)', 'postIcon', '/medias/style/plat/default/css/image/tree/post.png', null, 1, to_date('07-09-2017 11:34:58', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-09-2018 17:29:03', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (102, '附件存放方式', 'attachmentPosition', 'FTP', 'FILE_SYSTEM:文件系统' || chr(10) || 'DATA_BASE:数据库' || chr(10) || 'FTP:ftp服务器' || chr(10) || 'FILE_SYSTEM,DATA_BASE :文件系统和数据库' || chr(10) || 'ALL:以上皆保存。' || chr(10) || '', 1, to_date('07-09-2017 11:20:00', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 18:51:23', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '5', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (120, '是否启用岗位', 'isPostExist', 'false', 'true：存在' || chr(10) || 'false:不存在' || chr(10) || '', 1, to_date('22-09-2017 16:51:49', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 09:40:22', 'dd-mm-yyyy hh24:mi:ss'), '0', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (121, '可删除机构', 'deleteCascadeOrgan', 'true', '可删除有级联数据的组织机构标志，当有子要素的时候：若为true，可以确认删除；若为false，则不可删除', 1, to_date('22-09-2017 16:54:04', 'dd-mm-yyyy hh24:mi:ss'), 1, to_date('22-09-2017 16:54:04', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (122, '是否签收', 'isWorkflowSign', 'true', '工作流中是否需要签收 若为true，用户需签收；若为false，则不签收', 1, to_date('22-09-2017 16:55:18', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-07-2018 14:09:30', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '4', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (220, '最大活跃数', 'maxActive', '200', '最大活跃数', 286, to_date('19-10-2017 14:36:07', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 17:17:43', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '6', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (221, 'maxIdle', 'maxIdle', '20', null, 286, to_date('19-10-2017 14:36:18', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-12-2017 10:29:58', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '6', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (223, 'redisIp ', 'redisIp', '127.0.0.1', null, 286, to_date('19-10-2017 14:36:42', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 16:53:18', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '6', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (224, 'redisPort', 'redisPort', '6379', null, 286, to_date('19-10-2017 14:36:54', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('26-10-2017 10:24:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '6', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (320, '用户默认密码', 'defaultPassword', '111', '123', 286, to_date('31-10-2017 16:39:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 09:50:07', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (340, '是否存在无机构人员', 'existNoOrganUser', 'true', 'true :存在无机构人员' || chr(10) || 'false:不存在无机构人员', 286, to_date('28-12-2017 20:29:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 09:04:57', 'dd-mm-yyyy hh24:mi:ss'), '0', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (461, '流程类别图标路径', 'flowType', '/medias/plugin/ztree/css/img/flowType.gif', null, 286, to_date('09-03-2018 09:37:36', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 17:06:15', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '4', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (460, '流程图标路径', 'flow', '/medias/plugin/ztree/css/img/flow.gif', null, 286, to_date('09-03-2018 09:37:08', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 16:53:52', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '4', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (1907, '是否MD5密码加密', 'MD5', 'false', 'true:使用' || chr(10) || 'false:不使用' || chr(10) || '' || chr(10) || '', 286, to_date('20-04-2018 14:20:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 17:26:38', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '1', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4248, '包含资源', 'resType', 'app,menu,page,func', '包含资源类目，各类资源具体配置以资源res_+类型开头。', 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4249, '资源属性：应用', 'res_app_column', 'url,icon.bizType', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4250, '资源属性：菜单', 'res_menu_column', 'icon,url', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 18:45:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4251, '资源属性：页面', 'res_page_column', 'url', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4252, '资源属性：功能', 'res_func_column', 'url', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 17:31:13', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4253, '资源图标：应用', 'res_app_icon', '/medias/style/plat/image/resource/res_app.png', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 17:34:09', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4254, '资源图标：菜单', 'res_menu_icon', '/medias/style/plat/image/resource/res_menu.png', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4255, '资源图标：页面', 'res_page_icon', '/medias/style/plat/image/resource/res_page.png', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4256, '资源图标：功能', 'res_func_icon', '/medias/style/plat/image/resource/res_func.png', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 17:37:03', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4257, '资源名称：应用', 'res_app_name', '应用', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 18:30:55', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4258, '资源名称：菜单', 'res_menu_name', '菜单', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4259, '资源名称：页面', 'res_page_name', '页面', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 18:10:44', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4260, '资源名称：功能', 'res_func_name', '功能', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 18:10:35', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4261, '资源上级：应用', 'res_app_parent', null, null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4262, '资源上级：菜单', 'res_menu_parent', 'app,menu', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4263, '资源上级：页面', 'res_page_parent', 'menu', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 18:42:30', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4264, '资源上级：功能', 'res_func_parent', 'page', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4265, '资源图标选择：应用', 'res_app_iconpath', '/resource/iconfontSelect', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 18:42:49', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4266, '资源业务字典：应用', 'res_app_bizdict', 'APPBIZTYPE', '资源业务字典：app', 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-09-2018 18:42:58', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4267, '资源图标选择：菜单', 'res_menu_iconpath', '/resource/iconfontSelect', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4268, '资源灰色图标：页面', 'res_page_garyicon', '/medias/style/plat/image/resource/res_page_gary.png', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4269, '资源地址选择：菜单', 'res_menu_urlselect', '/resource/menuUrlSelect', null, 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-06-2018 09:57:50', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '2', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4302, '是否有下一环节办理人提示页面', 'hasHandleSubmit', 'true', '是否显示下一环节办理人提示页面', 815, to_date('26-07-2018 10:34:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('10-08-2018 13:02:00', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '4', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4303, '工作流弹出风格', 'workFlowType', 'layer', '工作流弹出风格' || chr(10) || '可选项有layer和iframe' || chr(10) || 'layer：弹出层' || chr(10) || 'iframe:内嵌页面风格', 815, to_date('26-07-2018 10:36:46', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('29-09-2018 14:36:59', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '4', null);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4341, 'dd333', 'dd', 'dff', null, 815, to_date('06-09-2018 15:11:12', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:13:04', 'dd-mm-yyyy hh24:mi:ss'), '0', '2', '12', 3031);
insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)
values (4321, '组织机构方式', 'ORGAN_TYPE', 'yp-mo', 'np-so     :  无岗位一人一机构' || chr(10) || 'np-mo   :  无岗位一多机构' || chr(10) || 'yp-so     :  有岗位一人一机构' || chr(10) || 'yp-mo   :  有岗位一人多机构' || chr(10) || '', 815, to_date('07-08-2018 18:31:12', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-09-2018 14:35:44', 'dd-mm-yyyy hh24:mi:ss'), '1', '1', '1', null);
commit;
prompt 53 records loaded
prompt Loading SYS_DATA_AUTH...
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (434, null, null, 7847, 100, '14946', null, null, 286, to_date('09-08-2018 19:31:31', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (321, null, null, 7812, 100, null, null, null, 286, to_date('26-07-2018 16:18:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (465, null, null, 7855, 100, '29978', null, null, 286, to_date('13-08-2018 14:02:25', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (443, null, null, 7845, 100, '14945', null, null, 286, to_date('10-08-2018 08:56:11', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (444, null, null, 7845, 100, '14945', null, null, 286, to_date('10-08-2018 08:56:52', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (340, null, null, 7818, 100, null, null, null, 286, to_date('27-07-2018 16:01:35', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (458, null, null, 7854, 100, '29978', null, null, 815, to_date('13-08-2018 10:24:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (376, null, null, 7824, 100, '29958', null, null, 286, to_date('30-07-2018 14:20:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (392, null, null, 7816, 100, '14945', null, null, 286, to_date('01-08-2018 10:47:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (459, null, null, 7854, 100, '14946', null, null, 815, to_date('13-08-2018 10:24:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (468, null, null, 7857, 100, '14947', null, null, 286, to_date('13-08-2018 14:10:08', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (395, null, null, 7821, 100, '29958', null, null, 286, to_date('01-08-2018 10:47:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (396, null, null, 7808, 100, null, null, null, 286, to_date('01-08-2018 10:47:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (397, null, null, 7815, 100, null, null, null, 286, to_date('01-08-2018 10:48:06', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (398, null, null, 7826, 100, null, null, null, 286, to_date('01-08-2018 11:00:19', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (418, null, null, 7841, 100, '2', null, null, 286, to_date('08-08-2018 11:58:31', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (467, null, null, 7857, 100, '29958', null, null, 286, to_date('13-08-2018 14:10:08', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (469, null, null, 7855, 100, '29978', null, null, 286, to_date('13-08-2018 14:18:00', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (470, null, null, 7858, 100, '29978', null, null, 286, to_date('13-08-2018 14:20:03', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (539, null, null, 7860, 100, '14945', null, null, 286, to_date('11-09-2018 09:26:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (540, null, null, 7858, 100, null, null, null, 286, to_date('11-09-2018 09:34:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (541, null, null, 7961, 100, null, null, null, 286, to_date('11-09-2018 17:23:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (542, null, null, 7962, 100, '29998', null, null, 286, to_date('11-09-2018 17:37:21', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (543, null, null, 7963, 100, '29998', null, null, 286, to_date('11-09-2018 18:34:06', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (551, null, null, 7965, 100, null, null, null, 286, to_date('12-09-2018 10:58:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (576, null, null, 7825, 100, '14944', null, null, 286, to_date('17-09-2018 10:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (577, null, null, 7988, 100, '30018', null, null, 286, to_date('17-09-2018 10:54:54', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (581, null, null, 7989, 100, '30018', null, null, 286, to_date('17-09-2018 11:06:25', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (586, null, null, 7988, 100, null, null, null, 286, to_date('17-09-2018 14:40:17', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (587, null, null, 7989, 100, null, null, null, 286, to_date('17-09-2018 15:20:04', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (588, null, null, 7990, 100, null, null, null, 286, to_date('17-09-2018 15:20:26', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (635, null, null, 7819, 100, null, null, null, 286, to_date('20-09-2018 14:16:33', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (636, null, null, 7819, 100, '63', null, null, 286, to_date('20-09-2018 14:17:05', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (637, null, null, 7819, 100, null, null, null, 286, to_date('20-09-2018 14:17:27', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (638, null, null, 7819, 100, '63', null, null, 286, to_date('20-09-2018 14:18:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (644, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:26:20', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (647, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:28:31', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (649, null, null, 8003, 100, '30018', null, null, 286, to_date('20-09-2018 16:29:35', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (651, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:35:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (713, null, null, 8042, 100, '2', null, null, 286, to_date('01-11-2018 14:42:15', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (714, null, null, 8042, 100, '2', null, null, 286, to_date('06-11-2018 16:29:21', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (401, null, null, 7819, 100, '63', null, null, 286, to_date('01-08-2018 18:32:26', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (399, null, null, 7819, 100, '63', null, null, 286, to_date('01-08-2018 18:31:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (426, null, null, 7846, 100, null, null, null, 286, to_date('09-08-2018 16:41:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (427, null, null, 7847, 100, '14946', null, null, 286, to_date('09-08-2018 16:41:46', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (428, null, null, 7847, 100, '14946', null, null, 286, to_date('09-08-2018 16:43:02', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (429, null, null, 7845, 100, '14945', null, null, 286, to_date('09-08-2018 16:43:02', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (430, null, null, 7847, 100, '14946', null, null, 286, to_date('09-08-2018 18:54:51', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (431, null, null, 7847, 100, '14946', null, null, 286, to_date('09-08-2018 18:55:35', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (432, null, null, 7847, 100, '14946', null, null, 286, to_date('09-08-2018 18:56:50', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (531, null, null, 7922, 100, '2', null, null, 286, to_date('11-09-2018 08:56:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (532, null, null, 7859, 100, '29978', null, null, 286, to_date('11-09-2018 08:56:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (491, null, null, 7920, 100, '2', null, null, 286, to_date('03-09-2018 09:13:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (492, null, null, 7921, 100, null, null, null, 286, to_date('03-09-2018 10:00:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (533, null, null, 7859, 100, '29979', null, null, 286, to_date('11-09-2018 08:56:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (534, null, null, 7859, 100, '14946', null, null, 286, to_date('11-09-2018 08:56:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (589, null, null, 7993, 100, '14944', null, null, 286, to_date('18-09-2018 15:44:49', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (590, null, null, 7993, 100, null, null, null, 286, to_date('18-09-2018 15:45:05', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (591, null, null, 7993, 100, '14944', null, null, 286, to_date('18-09-2018 15:45:16', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (611, null, null, 7848, 100, '2', null, null, 286, to_date('20-09-2018 12:02:17', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (612, null, null, 7962, 100, '29998', null, null, 286, to_date('20-09-2018 12:02:17', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (613, null, null, 7963, 100, '29998', null, null, 286, to_date('20-09-2018 12:02:17', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (614, null, null, 7970, 100, '63', null, null, 286, to_date('20-09-2018 12:02:17', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (615, null, null, 7848, 100, '2', null, null, 286, to_date('20-09-2018 12:03:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (634, null, null, 8000, 100, '63', null, null, 286, to_date('20-09-2018 14:16:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (654, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:00:18', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (656, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:04:35', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (657, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:05:04', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (658, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:05:19', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (659, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:05:26', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (660, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:08:00', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (661, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:08:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (662, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:11:27', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (664, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:25:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (691, null, null, 7840, 100, null, null, null, 286, to_date('29-09-2018 16:59:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (733, null, null, 8060, 100, '14944', null, null, 286, to_date('07-11-2018 10:16:59', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (734, null, null, 8060, 100, '14944', null, null, 286, to_date('07-11-2018 10:17:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (735, null, null, 8061, 100, '14944', null, null, 286, to_date('07-11-2018 10:49:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (736, null, null, 8062, 100, '14944', null, null, 286, to_date('07-11-2018 11:45:28', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (758, null, null, 8063, 100, '14945', null, null, 286, to_date('07-11-2018 20:36:50', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (802, null, null, 8114, 100, '63', null, null, 286, to_date('09-11-2018 09:30:37', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (803, null, null, 8115, 100, '63', null, null, 286, to_date('09-11-2018 09:36:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (330, null, null, 7811, 100, null, null, null, 286, to_date('27-07-2018 11:09:23', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (316, null, null, 7810, 100, null, null, null, 286, to_date('26-07-2018 11:05:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (312, null, null, 7806, 100, null, null, null, 286, to_date('25-07-2018 16:47:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (313, null, null, 7807, 100, null, null, null, 286, to_date('25-07-2018 16:48:04', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (324, null, null, 7813, 100, null, null, null, 286, to_date('27-07-2018 11:06:34', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (423, null, null, 7843, 100, '2', null, null, 286, to_date('08-08-2018 16:53:19', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (424, null, null, 7844, 100, '29958', null, null, 286, to_date('09-08-2018 12:02:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (433, null, null, 7847, 100, '14946', null, null, 286, to_date('09-08-2018 19:20:07', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (445, null, null, 7845, 100, '14945', null, null, 286, to_date('10-08-2018 09:06:07', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (446, null, null, 7845, 100, '14945', null, null, 286, to_date('10-08-2018 09:06:31', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (455, null, null, 7854, 100, '29978', null, null, 815, to_date('13-08-2018 10:18:50', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (456, null, null, 7854, 100, '14946', null, null, 815, to_date('13-08-2018 10:18:50', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (462, null, null, 7854, 100, '29978', null, null, 815, to_date('13-08-2018 11:09:23', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (463, null, null, 7854, 100, '14946', null, null, 815, to_date('13-08-2018 11:09:35', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (464, null, null, 7854, 100, null, null, null, 286, to_date('13-08-2018 13:58:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (466, null, null, 7856, 100, null, null, null, 286, to_date('13-08-2018 14:03:43', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (471, null, null, 7859, 100, '29979', null, null, 286, to_date('13-08-2018 14:22:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (472, null, null, 7859, 100, '29979', null, null, 286, to_date('13-08-2018 14:24:11', 'dd-mm-yyyy hh24:mi:ss'), '0');
commit;
prompt 100 records committed...
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (473, null, null, 7859, 100, '29978', null, null, 286, to_date('13-08-2018 14:44:39', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (474, null, null, 7859, 100, '29979', null, null, 286, to_date('13-08-2018 14:44:39', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (475, null, null, 7859, 100, '14946', null, null, 286, to_date('13-08-2018 14:44:39', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (537, null, null, 7860, 100, '14945', null, null, 286, to_date('11-09-2018 09:26:30', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (538, null, null, 7860, 100, '14945', null, null, 286, to_date('11-09-2018 09:26:39', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (552, null, null, 7857, 100, '29958', null, null, 286, to_date('12-09-2018 15:26:17', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (562, null, null, 7857, 100, null, null, null, 286, to_date('12-09-2018 16:42:06', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (563, null, null, 7970, 100, '63', null, null, 286, to_date('13-09-2018 17:43:43', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (411, null, null, 7819, 100, '63', null, null, 286, to_date('07-08-2018 15:39:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (422, null, null, 7843, 100, '29958', null, null, 286, to_date('08-08-2018 16:41:59', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (564, null, null, 7971, 100, '2', null, null, 286, to_date('14-09-2018 11:22:34', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (623, null, null, 8000, 100, '63', null, null, 286, to_date('20-09-2018 14:10:07', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (645, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:27:46', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (646, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:27:51', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (648, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:28:50', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (650, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:35:41', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (652, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:36:04', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (653, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:42:14', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (655, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:00:36', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (663, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 19:14:28', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (671, null, null, 7820, 100, null, null, null, 815, to_date('26-09-2018 14:47:35', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (715, null, null, 8042, 100, '2', null, null, 286, to_date('06-11-2018 16:35:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (716, null, null, 8043, 100, '2', null, null, 286, to_date('06-11-2018 16:52:07', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (717, null, null, 8044, 100, '29998', null, null, 286, to_date('06-11-2018 16:55:54', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (718, null, null, 8045, 100, '2', null, null, 286, to_date('06-11-2018 16:58:52', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (719, null, null, 8046, 100, '29998', null, null, 286, to_date('06-11-2018 17:00:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (720, null, null, 8047, 100, '2', null, null, 286, to_date('06-11-2018 17:05:28', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (737, null, null, 8063, 100, '14945', null, null, 286, to_date('07-11-2018 11:49:14', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (739, null, null, 8065, 100, '14945', null, null, 286, to_date('07-11-2018 13:11:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (740, null, null, 8066, 100, '14945', null, null, 286, to_date('07-11-2018 13:37:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (742, null, null, 8068, 100, '14945', null, null, 286, to_date('07-11-2018 13:39:30', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (743, null, null, 8069, 100, '14945', null, null, 286, to_date('07-11-2018 13:48:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (744, null, null, 8070, 100, '14945', null, null, 286, to_date('07-11-2018 13:52:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (745, null, null, 8071, 100, '14945', null, null, 286, to_date('07-11-2018 14:06:01', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (757, null, null, 8074, 100, '14945', null, null, 286, to_date('07-11-2018 16:34:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (770, null, null, 8085, 100, '63', null, null, 286, to_date('08-11-2018 11:28:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (801, null, null, 8113, 100, '14944', null, null, 286, to_date('09-11-2018 08:40:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (804, null, null, 8055, 100, '29958', null, null, 286, to_date('09-11-2018 10:06:28', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (415, null, null, 7840, 100, '14946', null, null, 286, to_date('08-08-2018 11:39:41', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (416, null, null, 7840, 100, '14946', null, null, 286, to_date('08-08-2018 11:45:57', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (319, null, null, 7809, 100, null, null, null, 286, to_date('26-07-2018 16:02:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (417, null, null, 7841, 100, '63', null, null, 286, to_date('08-08-2018 11:46:33', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (332, null, null, 7814, 100, null, null, null, 286, to_date('27-07-2018 11:35:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (425, null, null, 7845, 100, '14945', null, null, 286, to_date('09-08-2018 16:40:29', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (311, null, null, 286, 100, null, null, null, 286, to_date('23-07-2018 16:26:43', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (495, null, null, 7816, 100, '14945', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (346, null, null, 7817, 100, null, null, null, 286, to_date('30-07-2018 09:29:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (347, null, null, 7822, 100, null, null, null, 286, to_date('30-07-2018 09:36:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (493, null, null, 7922, 100, '2', null, null, 286, to_date('03-09-2018 10:02:10', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (494, null, null, 7841, 100, null, null, null, 286, to_date('04-09-2018 15:18:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (512, null, null, 7825, 100, '14944', null, null, 7841, to_date('04-09-2018 15:27:10', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (497, null, null, 7840, 100, '14946', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (498, null, null, 7845, 100, '14945', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (499, null, null, 7847, 100, '14946', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (500, null, null, 7852, 100, '14945', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (373, null, null, 7819, 100, '63', null, null, 286, to_date('30-07-2018 10:41:40', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (692, null, null, 7847, 100, null, null, null, 286, to_date('29-09-2018 17:06:23', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (414, null, null, 7840, 100, '2', null, null, 286, to_date('08-08-2018 11:39:41', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (501, null, null, 7852, 100, '63', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (502, null, null, 7852, 100, '14946', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (503, null, null, 7855, 100, '29978', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (504, null, null, 7857, 100, '29958', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (505, null, null, 7857, 100, '14947', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (506, null, null, 7858, 100, '29978', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (507, null, null, 7859, 100, '29978', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (508, null, null, 7859, 100, '29979', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (509, null, null, 7859, 100, '14946', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (510, null, null, 7860, 100, '14945', null, null, 286, to_date('04-09-2018 15:20:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (535, null, null, 7857, 100, '29958', null, null, 286, to_date('11-09-2018 09:13:05', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (536, null, null, 7857, 100, '14947', null, null, 286, to_date('11-09-2018 09:13:05', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (544, null, null, 7964, 100, null, null, null, 286, to_date('11-09-2018 18:36:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (545, null, null, 7963, 100, '29998', null, null, 286, to_date('11-09-2018 18:38:04', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (546, null, null, 7962, 100, '29998', null, null, 286, to_date('11-09-2018 18:39:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (547, null, null, 7962, 100, '29998', null, null, 286, to_date('11-09-2018 18:39:51', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (548, null, null, 7965, 100, '29998', null, null, 286, to_date('11-09-2018 18:40:09', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (549, null, null, 7963, 100, '29998', null, null, 286, to_date('11-09-2018 18:40:31', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (550, null, null, 7963, 100, '29998', null, null, 286, to_date('12-09-2018 10:08:38', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (571, null, null, 7980, 100, '29978', null, null, 286, to_date('14-09-2018 15:48:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (572, null, null, 7980, 100, '29958', null, null, 286, to_date('14-09-2018 15:48:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (578, null, null, 7988, 100, null, null, null, 286, to_date('17-09-2018 10:55:04', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (579, null, null, 7988, 100, '30018', null, null, 286, to_date('17-09-2018 10:57:26', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (580, null, null, 7988, 100, null, null, null, 286, to_date('17-09-2018 11:02:58', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (582, null, null, 7990, 100, '30018', null, null, 286, to_date('17-09-2018 11:08:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (583, null, null, 7988, 100, '30018', null, null, 286, to_date('17-09-2018 14:39:38', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (584, null, null, 7988, 100, null, null, null, 286, to_date('17-09-2018 14:39:46', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (585, null, null, 7988, 100, '30018', null, null, 286, to_date('17-09-2018 14:40:08', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (616, null, null, 7962, 100, '29998', null, null, 286, to_date('20-09-2018 14:03:06', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (617, null, null, 7963, 100, '29998', null, null, 286, to_date('20-09-2018 14:03:06', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (618, null, null, 7970, 100, '63', null, null, 286, to_date('20-09-2018 14:03:06', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (619, null, null, 7993, 100, null, null, null, 286, to_date('20-09-2018 14:09:02', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (620, null, null, 7993, 100, '14944', null, null, 286, to_date('20-09-2018 14:09:14', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (621, null, null, 8000, 100, '63', null, null, 286, to_date('20-09-2018 14:09:43', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (622, null, null, 8000, 100, null, null, null, 286, to_date('20-09-2018 14:09:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (624, null, null, 8000, 100, null, null, null, 286, to_date('20-09-2018 14:10:30', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (625, null, null, 7962, 100, '29998', null, null, 286, to_date('20-09-2018 14:11:18', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (626, null, null, 7963, 100, '29998', null, null, 286, to_date('20-09-2018 14:11:18', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (627, null, null, 7970, 100, '63', null, null, 286, to_date('20-09-2018 14:11:18', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (628, null, null, 7962, 100, '29998', null, null, 286, to_date('20-09-2018 14:11:41', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (629, null, null, 7963, 100, '29998', null, null, 286, to_date('20-09-2018 14:11:41', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (630, null, null, 7970, 100, '63', null, null, 286, to_date('20-09-2018 14:11:41', 'dd-mm-yyyy hh24:mi:ss'), '0');
commit;
prompt 200 records committed...
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (631, null, null, 7962, 100, '29998', null, null, 286, to_date('20-09-2018 14:11:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (632, null, null, 7963, 100, '29998', null, null, 286, to_date('20-09-2018 14:11:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (633, null, null, 7970, 100, '63', null, null, 286, to_date('20-09-2018 14:11:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (642, null, null, 8001, 100, '29958', null, null, 286, to_date('20-09-2018 16:20:34', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (643, null, null, 8002, 100, '29958', null, null, 286, to_date('20-09-2018 16:20:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (711, null, null, 8040, 100, null, null, null, 286, to_date('31-10-2018 15:34:30', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (712, null, null, 8041, 100, null, null, null, 286, to_date('31-10-2018 15:35:04', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (759, null, null, 8063, 100, '14945', null, null, 286, to_date('08-11-2018 08:12:55', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (763, null, null, 8078, 100, null, null, null, 286, to_date('08-11-2018 10:18:17', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (764, null, null, 8079, 100, null, null, null, 286, to_date('08-11-2018 10:20:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (765, null, null, 8080, 100, '14944', null, null, 286, to_date('08-11-2018 10:22:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (766, null, null, 8081, 100, null, null, null, 286, to_date('08-11-2018 10:23:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (767, null, null, 8082, 100, null, null, null, 286, to_date('08-11-2018 10:24:33', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (768, null, null, 8083, 100, null, null, null, 286, to_date('08-11-2018 10:28:22', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (769, null, null, 8084, 100, '14944', null, null, 286, to_date('08-11-2018 10:35:27', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (772, null, null, 8086, 100, '14945', null, null, 286, to_date('08-11-2018 14:52:52', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (773, null, null, 8087, 100, '14945', null, null, 286, to_date('08-11-2018 14:55:12', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (775, null, null, 8088, 100, '29998', null, null, 286, to_date('08-11-2018 15:37:03', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (777, null, null, 8090, 100, '29998', null, null, 286, to_date('08-11-2018 16:02:55', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (778, null, null, 8091, 100, '29998', null, null, 286, to_date('08-11-2018 16:13:20', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (781, null, null, 8094, 100, '29998', null, null, 286, to_date('08-11-2018 16:19:12', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (785, null, null, 8098, 100, '29998', null, null, 286, to_date('08-11-2018 16:26:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (786, null, null, 8099, 100, '29998', null, null, 286, to_date('08-11-2018 16:27:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (787, null, null, 8100, 100, '29998', null, null, 286, to_date('08-11-2018 16:28:07', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (790, null, null, 8103, 100, '29998', null, null, 286, to_date('08-11-2018 16:29:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (792, null, null, 8105, 100, '29998', null, null, 286, to_date('08-11-2018 16:31:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (793, null, null, 8106, 100, null, null, null, 286, to_date('08-11-2018 16:51:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (794, null, null, 8107, 100, null, null, null, 286, to_date('08-11-2018 16:55:30', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (412, null, null, 7840, 100, '2', null, null, 286, to_date('08-08-2018 09:25:33', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (413, null, null, 7840, 100, '2', null, null, 286, to_date('08-08-2018 09:29:08', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (419, null, null, 7841, 100, '2', null, null, 286, to_date('08-08-2018 15:12:22', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (450, null, null, 7852, 100, '63', null, null, 286, to_date('10-08-2018 16:02:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (421, null, null, 7842, 100, '63', null, null, 815, to_date('08-08-2018 15:34:12', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (451, null, null, 7852, 100, '14946', null, null, 286, to_date('10-08-2018 16:02:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (441, null, null, 7845, 100, '14945', null, null, 286, to_date('09-08-2018 19:42:43', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (442, null, null, 7845, 100, '14945', null, null, 286, to_date('09-08-2018 19:44:15', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (375, null, null, 7823, 100, null, null, null, 286, to_date('30-07-2018 13:59:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (400, null, null, 7819, 100, '63', null, null, 286, to_date('01-08-2018 18:31:58', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (452, null, null, 7853, 100, '14944', null, null, 286, to_date('10-08-2018 16:06:40', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (448, null, null, 7848, 100, '14944', null, null, 286, to_date('10-08-2018 15:57:57', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (449, null, null, 7852, 100, '14945', null, null, 286, to_date('10-08-2018 16:02:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (453, null, null, 7853, 100, null, null, null, 286, to_date('10-08-2018 16:08:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (553, null, null, 7857, 100, '29958', null, null, 286, to_date('12-09-2018 15:27:07', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (554, null, null, 7857, 100, '14947', null, null, 286, to_date('12-09-2018 15:27:07', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (555, null, null, 7857, 100, '29958', null, null, 286, to_date('12-09-2018 15:27:14', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (556, null, null, 7857, 100, '14947', null, null, 286, to_date('12-09-2018 15:27:14', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (557, null, null, 7857, 100, '29958', null, null, 286, to_date('12-09-2018 15:27:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (558, null, null, 7857, 100, '14947', null, null, 286, to_date('12-09-2018 15:27:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (559, null, null, 7857, 100, '29958', null, null, 286, to_date('12-09-2018 15:55:55', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (560, null, null, 7857, 100, '2', null, null, 286, to_date('12-09-2018 15:55:55', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (561, null, null, 7857, 100, '14947', null, null, 286, to_date('12-09-2018 15:55:55', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (573, null, null, 7980, 100, '29978', null, null, 286, to_date('17-09-2018 10:16:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (574, null, null, 7980, 100, '29958', null, null, 286, to_date('17-09-2018 10:16:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (575, null, null, 7980, 100, '2', null, null, 286, to_date('17-09-2018 10:16:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (639, null, null, 7993, 100, null, null, null, 286, to_date('20-09-2018 14:35:33', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (640, null, null, 7993, 100, '14944', null, null, 286, to_date('20-09-2018 14:35:50', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (641, null, null, 7993, 100, null, null, null, 286, to_date('20-09-2018 14:36:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (721, null, null, 8048, 100, '29998', null, null, 286, to_date('06-11-2018 17:27:12', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (722, null, null, 8049, 100, '29998', null, null, 286, to_date('06-11-2018 17:43:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (723, null, null, 8050, 100, '29998', null, null, 286, to_date('06-11-2018 17:45:35', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (724, null, null, 8051, 100, '29998', null, null, 286, to_date('06-11-2018 17:46:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (725, null, null, 8052, 100, '14945', null, null, 286, to_date('06-11-2018 17:48:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (726, null, null, 8053, 100, '63', null, null, 286, to_date('06-11-2018 18:13:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (727, null, null, 8054, 100, '63', null, null, 286, to_date('06-11-2018 18:42:55', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (728, null, null, 8055, 100, '29958', null, null, 286, to_date('06-11-2018 18:56:45', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (729, null, null, 8056, 100, '14946', null, null, 286, to_date('06-11-2018 19:02:26', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (730, null, null, 8057, 100, '14947', null, null, 286, to_date('06-11-2018 19:04:54', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (731, null, null, 8058, 100, '63', null, null, 286, to_date('06-11-2018 19:17:12', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (732, null, null, 8059, 100, '14946', null, null, 286, to_date('06-11-2018 19:36:19', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (738, null, null, 8064, 100, '14945', null, null, 286, to_date('07-11-2018 12:01:06', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (741, null, null, 8067, 100, '14945', null, null, 286, to_date('07-11-2018 13:39:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (746, null, null, 8071, 100, '14945', null, null, 286, to_date('07-11-2018 14:06:26', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (747, null, null, 8071, 100, '14945', null, null, 286, to_date('07-11-2018 14:10:30', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (748, null, null, 8071, 100, '14945', null, null, 286, to_date('07-11-2018 14:11:26', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (749, null, null, 8063, 100, '14945', null, null, 286, to_date('07-11-2018 14:51:34', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (750, null, null, 8063, 100, '14945', null, null, 286, to_date('07-11-2018 15:15:04', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (751, null, null, 8072, 100, '14945', null, null, 286, to_date('07-11-2018 15:52:05', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (752, null, null, 8072, 100, '14945', null, null, 286, to_date('07-11-2018 15:52:12', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (753, null, null, 8073, 100, '14945', null, null, 286, to_date('07-11-2018 16:06:49', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (754, null, null, 8073, 100, '14945', null, null, 286, to_date('07-11-2018 16:07:47', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (755, null, null, 8074, 100, '14945', null, null, 286, to_date('07-11-2018 16:22:54', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (756, null, null, 8074, 100, '14945', null, null, 286, to_date('07-11-2018 16:23:08', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (760, null, null, 8075, 100, null, null, null, 286, to_date('08-11-2018 09:23:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (761, null, null, 8076, 100, '14944', null, null, 286, to_date('08-11-2018 09:31:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (762, null, null, 8077, 100, '14944', null, null, 286, to_date('08-11-2018 09:55:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (771, null, null, 8086, 100, '14945', null, null, 286, to_date('08-11-2018 14:52:28', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (774, null, null, 8087, 100, '14945', null, null, 286, to_date('08-11-2018 14:55:20', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (776, null, null, 8089, 100, '29998', null, null, 286, to_date('08-11-2018 15:54:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (779, null, null, 8092, 100, '29998', null, null, 286, to_date('08-11-2018 16:14:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (780, null, null, 8093, 100, '29998', null, null, 286, to_date('08-11-2018 16:18:19', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (782, null, null, 8095, 100, '29998', null, null, 286, to_date('08-11-2018 16:22:31', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (783, null, null, 8096, 100, '29998', null, null, 286, to_date('08-11-2018 16:23:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (784, null, null, 8097, 100, '29998', null, null, 286, to_date('08-11-2018 16:24:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (788, null, null, 8101, 100, '29998', null, null, 286, to_date('08-11-2018 16:28:19', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (789, null, null, 8102, 100, '29998', null, null, 286, to_date('08-11-2018 16:28:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (791, null, null, 8104, 100, '29998', null, null, 286, to_date('08-11-2018 16:30:26', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (795, null, null, 8108, 100, '14944', null, null, 286, to_date('08-11-2018 16:59:15', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (796, null, null, 8109, 100, '14944', null, null, 286, to_date('08-11-2018 17:05:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (797, null, null, 8110, 100, '14944', null, null, 286, to_date('08-11-2018 17:08:39', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (798, null, null, 8110, 100, '14944', null, null, 286, to_date('08-11-2018 17:09:06', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 300 records committed...
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (799, null, null, 8111, 100, '14944', null, null, 286, to_date('08-11-2018 17:13:12', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (800, null, null, 8112, 100, '14944', null, null, 286, to_date('08-11-2018 17:28:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_DATA_AUTH (id, role_id, rule_id, user_id, object_id, oids, page_ids, qxlx, cjr_id, cjsj, sfyx_st)
values (805, null, null, 8116, 100, '63', null, null, 286, to_date('09-11-2018 10:26:33', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 303 records loaded
prompt Loading SYS_DEMO_DICT...
prompt Table is empty
prompt Loading SYS_DEMO_LEADER...
prompt Table is empty
prompt Loading SYS_DEMO_ORGAN...
insert into SYS_DEMO_ORGAN (id, organ_name, project_id, sfyx_st)
values (7850, '测试1', null, '1');
insert into SYS_DEMO_ORGAN (id, organ_name, project_id, sfyx_st)
values (7851, '测试2', null, '1');
commit;
prompt 2 records loaded
prompt Loading SYS_DEMO_PROJECT...
prompt Table is empty
prompt Loading SYS_DEMO_USER...
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7837, '333我3444', null, 815, to_date('01-08-2018 11:44:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:23:16', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '2', '333', null, '1288', null, null, null, null, null, null, '9B027763-8227-4C3F-A9D7-51984777442E', 'D7684CF8-A76D-4600-AAF7-8056858D550C', '4E2FBC8F-372D-4B1B-A79E-80DC207E7004', null, to_date('09-08-2018 11:42:14', 'dd-mm-yyyy hh24:mi:ss'), null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7849, '新案例用户', null, 815, to_date('10-08-2018 10:32:06', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:23:20', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '9833F29C-266B-4E0B-AFD2-21F98FC33DEF', 'C7514E9E-900E-4B49-8368-288A1322BDE4', 'CD9EF8F6-8BF1-4A30-9E3B-A27351459838', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7900, '新案例用户', null, 815, to_date('24-08-2018 11:54:38', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:56:12', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'CFB5EE52-3662-41A5-94AC-CFEB8F9FE20A', 'A22F5E10-9701-4ED6-AF74-12C2D8060BF6', 'D774AE69-E6B9-4A4F-96D4-D1A6D5F4DFED', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7901, '新案例用户333', null, 815, to_date('28-08-2018 14:12:43', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:02:36', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'BF552B4A-3AB4-446A-92E2-C19BF9A40F20', '4ECF1C80-63E1-4366-BA8F-3F3F837D12AC', '77CED068-D83F-46F3-A35D-32D9639DEF4D', null, to_date('28-08-2018', 'dd-mm-yyyy'), null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7902, '新案例用户', null, 815, to_date('28-08-2018 14:23:21', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:06:20', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'C69E6AA9-83E2-481E-ACD2-93C597CA3429', '8857DAAF-2661-465D-830E-D7D4EC9F4F4A', 'E0372AF1-E4C8-42D0-973F-1A3AADD0CED1', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7941, '新案例用户', null, 815, to_date('11-09-2018 10:22:21', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '2EA29FDF-914D-42ED-AE11-9BEFE332E1A0', 'EA1F0C9B-8195-4866-A115-D8FCB1345EF0', '990352C2-E5BF-430F-87B3-7F9920D5AE62', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7942, '新案例用户', null, 815, to_date('11-09-2018 10:23:09', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '5EFEDDCA-6541-436C-8895-2ECDFA4CBDBE', '7E3DB488-87CE-4AFA-80F4-D9D62E2D151C', '65551ADF-1E0F-417C-B00B-D58D47117918', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7943, '新案例用户', null, 815, to_date('11-09-2018 10:23:11', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '6AA3F054-B8D8-4FEF-8ABE-ADFBC2A86E90', 'C699028D-CC83-481A-A663-721A484F85A0', 'F18422A8-364E-4BE2-B87A-1AB93DF95ADA', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7836, '新案例用户', null, 815, to_date('01-08-2018 11:40:21', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:22:26', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, '1252', null, null, null, null, null, null, '4E794782-EA1F-4645-AFB7-47EE21E14746', '37158921-2969-4C66-8AE1-03FFD7A46D2A', 'AECA0926-8AFF-43B3-89A2-AE3B0591B6B2', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7944, 'werr', null, 815, to_date('11-09-2018 10:52:21', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'A402223F-D9A5-4B2B-8CA0-096DD2DFF608', '8D3A6812-9D54-4294-8955-F24F1F6FF868', '1CAF3C3D-55C8-49B4-896A-E0950CC02260', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7945, '新案例用户', null, 815, to_date('11-09-2018 10:52:51', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 17:25:34', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'A91F15FD-A923-415A-9519-2072385B3E04', 'AAFEF187-F9F0-4152-A61C-CF97C20DFCCC', '6C7519B6-BE2B-4EFE-ACD6-EA7A1C011383', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7946, '新案例用户', null, 815, to_date('11-09-2018 10:54:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '411D07BD-92F3-40BF-B985-155F5FD5C668', '9FA842BB-D069-4D17-AB4A-D0B195F5345F', '19D0ED00-DEC3-429A-830B-692C2B72BF87', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7947, '新案例用户2', null, 815, to_date('11-09-2018 10:56:00', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'C3B21677-49DD-401F-97E9-5C7210A3C0CD', '4A25CC1D-7FEA-45B8-87C4-567BAE8329C6', 'AD06874A-B245-4021-8EEE-FA31C08485F6', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7948, '新案例用户', null, 815, to_date('11-09-2018 11:02:31', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('13-09-2018 11:18:17', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, 'EF75D502-68F4-4290-9089-D2CFDF1EC5C3', '18B36AE1-8AAF-40B9-9AF7-407E133EC2DE', 'D0665A71-0909-41E6-B26E-E71B22CA5D3D', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7949, '新案例用户', null, 815, to_date('11-09-2018 11:02:46', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '37FEA251-28C7-48CF-BAFF-E99F0D3FECFF', '0C02F17D-40C3-41E2-9177-4DC30964CA8F', '3EE07425-1743-4FB6-9172-E1C0EE6F82BC', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7950, '新案例用户', null, 815, to_date('11-09-2018 11:02:49', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '0679295C-AD6D-49A8-810B-21D414A0D1DC', 'FE1A7367-CBDF-425B-A077-75840A37F156', '5497D020-4C33-4A33-8879-DA6960B8CFA3', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7951, '新案例用户', null, 815, to_date('11-09-2018 11:02:51', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'DBF61CBD-E3E8-40A2-8343-1DE6A1692393', 'D3F973B8-4BAC-430B-8AB9-ED5DEEECEA15', 'F7327DBE-4DB0-410B-817D-9D99AEB36308', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7952, '新案例用户', null, 815, to_date('11-09-2018 11:02:53', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 10:10:57', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '1D574ECE-BF8C-4E87-A201-92054988D268', '4A64228F-6E2C-4760-9356-F7F70A7ECA7D', '818AF51D-1E21-4372-9D14-CD93A20B76A4', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7953, '新案例用户', null, 815, to_date('11-09-2018 11:02:55', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:02:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, '19C490CE-5B56-4CF3-8F59-F877E968328F', '358CEE1B-8D5C-4B01-8573-CAE550860F26', '88DA96D3-13EA-44E1-B253-42D0EFBAB127', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7954, '新案例用户', null, 815, to_date('11-09-2018 11:02:57', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:02:57', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, 'D09D8391-93A6-47A1-8714-83B772044F88', 'DCCB0B30-2F26-47C8-9BC3-0CCEC7A81788', '0B106E69-421B-49FF-B5B9-24FFBEBE40D6', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7955, '新案例用户', null, 815, to_date('11-09-2018 11:02:59', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:02:59', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, '4C1730AE-2547-4C01-A140-07D2BA091C14', '4C06DB96-5E2F-4E8C-8B2F-B54E69CAFEFC', '0E83C836-62F4-47BD-A557-E2BD2416A259', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7956, '新案例用户', null, 815, to_date('11-09-2018 11:03:01', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:03:01', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, 'E88330F9-1E81-439E-801C-EC8DBD006C38', 'CC9ED72A-D00E-490B-9175-E3433DA02A26', 'A4B35D7F-6560-40B6-B25F-844B3B498B68', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7957, '新案例用户', null, 815, to_date('11-09-2018 11:03:04', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:03:04', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, '34B1C3FA-055B-4383-9605-EBC9EE500EF6', 'DC3D4C9C-A7E2-415B-99B6-69D927638258', '0A9905BD-F0F6-4B96-826B-6C692D82B8D8', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7958, '新案例用户', null, 815, to_date('11-09-2018 11:03:06', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:03:06', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, 'F148B589-971F-4F7C-A4F1-0C4E75808005', 'C79BB9D7-C7A7-48C5-925E-1D1555BB2FE8', 'B27573F3-E9E8-4D6B-9D9F-8A06D094D273', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7959, '新案例用户', null, 815, to_date('11-09-2018 11:03:08', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:03:08', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, '9FD022CA-366E-4948-B0B6-CC9E85B51491', 'E5A81C77-D040-44B9-80A9-62B9B0B33925', '181C1362-DAC9-4739-9FFF-FB891295C3B6', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7960, '新案例用户', null, 815, to_date('11-09-2018 11:03:10', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:03:10', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, '39C02320-1113-4637-A407-59CA657C913D', 'FF6924DC-28E4-460E-9395-00B440BDB32F', '7000CB87-67CD-48A2-B869-989B911D2358', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7981, 'rrr', null, 815, to_date('17-09-2018 09:01:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 09:01:48', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, '0', null, null, 'DAB3A984-2A45-4A6F-8C9C-3098F08B248F', '81EA97DE-31BD-45AF-A82F-B3CBA1C70042', 'D1B7F9B4-C9E8-4876-8A0B-01F10609F5B4', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7982, '新案例用户', null, 815, to_date('17-09-2018 09:10:32', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 09:10:32', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, '0', null, null, '69E7520F-6113-489E-9151-CAF2C5CD0361', 'A7B74A40-1A3A-41DD-AB05-373DB8467957', '4D13836D-C57D-449E-8394-CACC234EB5D7', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7983, 'ee', null, 815, to_date('17-09-2018 09:21:26', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 09:21:26', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, '0', null, null, '3E0C34B2-BE26-4312-89C3-FA0CC314E866', '89152BF9-0458-42C2-9EA2-342D8FB77CA7', 'C1E23E1E-2449-4F44-A52F-A79DBFED7CE4', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7984, 'wq', null, 815, to_date('17-09-2018 09:29:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 09:29:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, '1395', null, null, null, '0', null, null, '804AE312-1BB3-4B67-9D1F-1B098ADBEBE3', 'EA1F2BF0-584D-4C09-81FF-75E52FD27620', 'F0FCC521-8B80-49A3-8706-F61263CE1B3B', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7985, 'qqqw', null, 815, to_date('17-09-2018 09:30:14', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 09:30:14', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, '1396', null, null, null, '0', null, null, '0C632693-9CD6-4CE3-A854-F080239AC494', 'EDE2EC55-F4A7-4975-B1B8-67D3AF689178', '921D3D00-64AA-4CCC-A989-387F12F650D3', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7986, '新案例用户', null, 815, to_date('17-09-2018 09:33:57', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 09:33:57', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, '1401', null, null, null, '0', null, null, '97419678-1222-4B38-8CD7-ECFDBE4F7002', '41445794-C5AC-492E-918B-63575B1FF8BE', 'AA92828A-BC68-4B11-8635-7055A44B7D6E', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7987, 'eeeeeeeeeeeeeeeeeeeeeeeeee', null, 815, to_date('17-09-2018 09:36:12', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-11-2018 17:04:57', 'dd-mm-yyyy hh24:mi:ss'), '1', to_date('09-10-2018', 'dd-mm-yyyy'), '1', null, null, '1413', null, null, null, '1', null, null, 'BA87592E-A4CE-45E3-BEBD-54CF64FAC73B', '04796383-515A-48FA-B2A4-A64C56618405', 'DC900FB9-5E00-456E-8594-10C41796ABE3', null, to_date('08-10-2018 15:32:49', 'dd-mm-yyyy hh24:mi:ss'), null, null, 'gfbdfhtyghdfg htdyhrtyghdgfh<img alt="大笑" src="/plat/medias/plugin/xheditor/xheditor_emot/default/laugh.gif" /><img alt="发火" src="/plat/medias/plugin/xheditor/xheditor_emot/default/angry.gif" /><img alt="发火" src="/plat/medias/plugin/xheditor/xheditor_emot/default/angry.gif" />');
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7991, '新案例用户', null, 815, to_date('17-09-2018 15:00:25', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-09-2018 15:00:25', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, '0', null, null, '684BDF1E-2EEB-4034-9015-E599A1DD1A65', '24AE742C-D83F-47E7-A720-09A7F181C905', 'CF9B104C-595F-42E4-9956-BDB7367E0C78', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7797, '新案例用户', null, 815, to_date('18-07-2018 09:04:47', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:23:22', 'dd-mm-yyyy hh24:mi:ss'), '0', to_date('23-07-2018', 'dd-mm-yyyy'), '1', null, null, '1246', null, null, null, null, null, null, 'CF4D51C8-E10C-4C5A-9E43-ED05EF7017F6', '55B0F3F1-213A-4929-83DD-DAE28E0DD920', 'CFAE244F-D40C-4C53-BA78-69BFDCEE9559', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7966, null, null, 815, to_date('12-09-2018 17:38:14', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-09-2018 17:38:14', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, 'E4962F1A-CCBD-47B9-ADDB-A64292EA94E4', '390047AF-0732-4F1E-A155-77B1794756A0', '47F6779B-94FC-47DC-85C7-E438569BC104', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7969, '新案例用户', null, 815, to_date('13-09-2018 17:06:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('14-09-2018 10:03:16', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, '0', null, null, '7A0EF4DA-A38A-40EE-BFEB-C477A09DFA9E', '6F07B47A-59CE-46E8-98A5-8B94F7DF85B3', 'E9DDF4B9-3B59-4728-B377-01A4B57D3D3D', null, null, null, null, '<h1><span style="font-family:SimSun;">是物权法第七1非rfterhryuygr3t</span></h1><h1><span style="font-family:SimSun;">r6ujh6tyk</span></h1><h1><span style="font-family:SimSun;">jyik,dqfr</span></h1><h1><u><span style="color:#993300;"><span style="font-family:SimSun;font-size: 12px;">edsfewrf</span><span style="font-size: 12px;">dsadwqrew</span></span></u></h1>');
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7796, '张三ww', 0, 815, to_date('16-07-2018 10:20:02', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:21:16', 'dd-mm-yyyy hh24:mi:ss'), '0', to_date('16-07-2018', 'dd-mm-yyyy'), '1', null, null, '1176', null, '1', null, '1', null, null, '0CA5280A-E038-41A8-BD4F-DDD291F7FC71', 'A7E4E2B1-9CC9-46E1-A9DE-2F2063149FB7', '1B93AC2D-A717-469A-A52F-14ECDDF7FB51', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7881, '新案例用户', null, 815, to_date('20-08-2018 19:28:14', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:53:06', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, '1D7E5387-D9A4-40AB-9170-C97B0C283B1B', 'AC54177B-65D4-4A06-A41A-32EFEA015B91', 'A5CA5CAA-BCA6-4FE8-B921-DB8DDBA71DA4', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7882, '新案例用户', null, 815, to_date('21-08-2018 11:47:30', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:54:10', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, '1316', null, null, null, null, null, null, '085F8594-C145-4F44-98CA-3CA0420B81CC', '5E9B6D4E-2477-4F1F-B92B-2DCA2BD38435', '8533A432-D154-4CE4-9212-AE9E4DDFBA90', null, to_date('15-08-2018 00:10:00', 'dd-mm-yyyy hh24:mi:ss'), null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7940, 'aa', 0, 815, to_date('10-09-2018 14:36:09', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 11:06:22', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'A9ED199B-5E8E-467B-AEA1-B176AEC4297E', '978643C4-7813-40AA-8EAB-7632B1128BCF', 'CE1C949F-ED61-4890-B9B0-D8EDBAA9B38A', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7880, '新案例用户', null, 815, to_date('20-08-2018 18:34:45', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-09-2018 10:52:28', 'dd-mm-yyyy hh24:mi:ss'), '0', null, '1', null, null, null, null, null, null, null, null, null, 'AA65020B-94DE-4E96-BD0D-FFEA16328576', 'A1CC5482-5505-47E0-8B3F-0C2A911D7FDA', '985BAF87-9A2B-423B-8B6F-63426ADC5C84', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7967, '新案例用户', null, 815, to_date('13-09-2018 12:00:39', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('13-09-2018 12:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, '64AE1356-84B0-4A94-A7A3-683F2B71B939', '4BF24B4A-747D-48CF-91A8-3C2B2F1A4F0C', 'FD183C65-DB7E-443D-8930-4CB71057DD85', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7968, '新案例用户', null, 815, to_date('13-09-2018 12:01:01', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('13-09-2018 12:01:01', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, null, null, null, '7B75A67F-50ED-46DA-98EE-16BCD0B957A4', 'A730C3E5-E4FD-4A6D-84C9-240490DE3B31', 'EA77F587-E856-4F2E-BE29-D5BE9BB111BA', null, null, null, null, null);
insert into SYS_DEMO_USER (id, user_name, sex, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, csrq, zzmm, description, organ_id, zp_id, fj_id, city, hobby, language, mz, fruit, fj_id_fl, fj_id_table, fj_id_single, fj_id_html5, bir_time, sheng, shi, content)
values (7992, '新案例用户', null, 815, to_date('18-09-2018 08:26:24', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('18-09-2018 08:27:03', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '1', null, null, null, null, null, null, '2', null, null, 'D4BF314D-506D-4F43-A500-6775D726213D', 'B01ABF97-6075-4EF3-B963-64726A8548AE', '68D4CDBD-F2BB-4A75-8C41-140E70605D5B', null, null, null, null, null);
commit;
prompt 45 records loaded
prompt Loading SYS_DICT...
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6050, '流程发布状态', 'WORKFLOWSTATUS', '1', '流程发布状态 0 草稿 1启用 2未启用', null, 815, 815, to_date('12-10-2018 17:39:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('29-09-2018 14:57:58', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1130, '消息紧急程度', 'XXJJCD', '1', 'SYS', null, 286, 815, to_date('11-07-2018 15:41:55', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-10-2017 15:04:41', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1131, '消息操作类型', 'XXCZLX', '1', 'SYS', null, 286, 286, to_date('25-10-2017 15:50:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-10-2017 15:07:41', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1132, '消息跳转类型', 'XXTZLX', '1', 'SYS', null, 286, 286, to_date('25-10-2017 15:49:57', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-10-2017 15:11:14', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1133, '消息跳转窗口尺寸', 'WINSIZE', '1', 'SYS', null, 286, 815, to_date('26-06-2018 10:40:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-10-2017 15:39:49', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1230, '案例：性别', 'SEXDEMO', '1', 'SYS_DEMO', null, 286, 286, to_date('16-05-2018 20:55:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-10-2017 16:57:12', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1250, '应用业务类型', 'APPBIZTYPE', '2', 'SYS', null, 286, 815, to_date('25-06-2018 11:14:25', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-10-2017 18:49:31', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1310, '请假流程业务状态', 'QJLCZT', '2', '1', 'BLFS', 286, 286, to_date('23-02-2018 16:58:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-11-2017 14:31:59', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (282, '数据权限类型', 'SJQXLX', '1', 'SYS', null, 1, 815, to_date('25-06-2018 11:13:20', 'dd-mm-yyyy hh24:mi:ss'), to_date('26-09-2017 11:43:54', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (162, '会签方式', 'HQFS', '1', 'SYS', null, 1, 286, to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2017 10:41:27', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (182, '办理方式', 'BLFS', '1', 'SYS', null, 1, 286, to_date('27-01-2018 18:05:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2017 11:10:59', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (41, '权限类型字典', 'QXLX', '1', 'SYS', null, null, 286, to_date('25-10-2017 15:55:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (43, '字段类型字典', 'ZDLX', '1', 'SYS', null, null, 286, to_date('25-10-2017 15:52:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1330, '角色组成类型', 'JSZCLX', '1', 'SYS', null, 286, 286, to_date('29-11-2017 11:20:43', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-11-2017 13:58:06', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (49, '字典类型字典', 'DICTLX', '1', 'SYS', null, null, 286, to_date('25-10-2017 16:39:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (51, '角色类型字典', 'JSLX', '1', 'SYS', null, null, 815, to_date('26-07-2018 09:12:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (54, '对象类型字典', 'DXLX', '1', 'SYS', null, null, 286, to_date('25-10-2017 15:52:00', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (64, '页面类型字典', 'YMLX', '1', 'SYS', null, null, 286, to_date('25-10-2017 15:55:40', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (68, '规则类型字典', 'GZLX', '1', 'SYS', null, null, 286, to_date('25-10-2017 15:51:47', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (70, '规则实现方式字典', 'GZSXFS', '1', 'SYS', null, null, 286, to_date('25-10-2017 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (564, '案例：民族', 'MZDEMO', '2', 'SYS_DEMO', null, 3, 286, to_date('16-05-2018 20:55:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('11-08-2017 19:26:13', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (563, '案例：爱好', 'HOBBYSDEMO', '1', 'SYS_DEMO', null, 3, 286, to_date('16-05-2018 20:55:53', 'dd-mm-yyyy hh24:mi:ss'), to_date('11-08-2017 19:15:49', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (502, '案例：城市', 'CITYDEMO', '1', 'SYS_DEMO', null, 3, 286, to_date('16-05-2018 20:55:46', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-07-2017 11:07:54', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (463, '案例：政治面貌', 'ZZMMDEMO', '1', 'SYS_DEMO', 'CESHI', 3, 815, to_date('13-07-2018 08:32:58', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-07-2017 14:18:27', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1210, '配置级别', 'CONFIGLEVEL', '1', '配置级别', null, 286, 815, to_date('09-07-2018 10:24:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-10-2017 12:32:48', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (40, '任务状态字典', 'TASKSTATUS', '1', 'SYS', null, 1, 286, to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (39, '任务办理动作字典', 'TASKACTION', '1', 'SYS', null, 1, 286, to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1150, '系统级别', 'SYSLEVEL', '1', '角色操作级别，辅助平台基本功能操作的权限控制。', null, 286, 815, to_date('30-07-2018 09:41:54', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-10-2017 15:52:26', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1151, '配置类别', 'CONFIGTYPE', '1', '配置类别', 'CONFIGLEVEL', 286, 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-10-2017 15:55:48', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (1390, '表单功能', 'BDGN', '1', null, null, 286, 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (2968, '案例：省', 'SHENGDEMO', '1', 'SYS_DEMO', null, 286, 815, to_date('11-07-2018 15:39:13', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-05-2018 20:38:36', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (2970, '案例：公司', 'COMPANYDEMO', '1', 'SYS_DEMO', null, 286, 286, to_date('17-05-2018 09:00:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-05-2018 08:52:25', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (2971, '案例：领导者', 'LEADERDEMO', '2', 'SYS_DEMO', null, 286, 286, to_date('17-05-2018 09:00:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-05-2018 08:53:51', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (2969, '案例：市', 'SHIDEMO', '2', 'SYS_DEMO', 'SHENGDEMO', 286, 815, to_date('11-07-2018 15:39:50', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-05-2018 20:57:19', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6074, '规则范围', 'RULERANGE', '1', null, null, 815, 815, to_date('01-11-2018 17:30:34', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-11-2018 16:55:41', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6070, '规则配置方式', 'RULECONFIGTYPE', '1', null, null, 815, 815, to_date('01-11-2018 15:51:10', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-11-2018 15:51:10', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6071, '规则主体', 'RULESUBJECT', '1', null, null, 815, 815, to_date('01-11-2018 15:52:25', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-11-2018 15:52:25', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6072, '规则组织层级', 'RULEORGANLEVEL', '1', null, null, 815, 815, to_date('01-11-2018 16:53:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-11-2018 15:57:50', 'dd-mm-yyyy hh24:mi:ss'), '0', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (2995, '通用是否', 'SF', '1', '1是，0否', null, 815, 815, to_date('20-06-2018 09:15:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('20-06-2018 09:15:42', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6010, '元数据实现类型', 'YSJSXLX', '1', null, null, 815, 815, to_date('20-08-2018 09:20:43', 'dd-mm-yyyy hh24:mi:ss'), to_date('20-08-2018 09:20:43', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6030, '报表字段数值类型', 'BBZDSZLX', '1', null, null, 815, 815, to_date('23-08-2018 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), to_date('23-08-2018 16:07:37', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6031, '报表字段分组类型', 'BBZDFZLX', '1', null, null, 815, 815, to_date('23-08-2018 16:11:34', 'dd-mm-yyyy hh24:mi:ss'), to_date('23-08-2018 16:11:34', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
insert into SYS_DICT (id, dict_name, dict_code, dict_type, description, pdict_code, cjr_id, xgr_id, xgsj, cjsj, sfyx_st, is_empty)
values (6073, '包含规则主体', 'INCLUDESUBJECT', '1', null, null, 815, 815, to_date('01-11-2018 16:44:35', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-11-2018 16:44:35', 'dd-mm-yyyy hh24:mi:ss'), '1', '0');
commit;
prompt 43 records loaded
prompt Loading SYS_GLB_COMBINE_ROLE...
prompt Table is empty
prompt Loading SYS_GLB_COMBINE_ROLE_FJ...
prompt Table is empty
prompt Loading SYS_GLB_MESSAGE_USER...
insert into SYS_GLB_MESSAGE_USER (id, message_id, user_id, status, receive_time, deal_time, sfyx_st, task_id)
values (220, 251, 286, 1, to_date('16-10-2018 09:36:52', 'dd-mm-yyyy hh24:mi:ss'), null, '1', null);
insert into SYS_GLB_MESSAGE_USER (id, message_id, user_id, status, receive_time, deal_time, sfyx_st, task_id)
values (219, 250, 286, 1, to_date('16-10-2018 09:36:52', 'dd-mm-yyyy hh24:mi:ss'), null, '1', null);
commit;
prompt 2 records loaded
prompt Loading SYS_GLB_REPORT_FORM...
prompt Table is empty
prompt Loading SYS_GLB_ROLE...
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31204, 2845, 7813, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31235, 2845, 7818, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31236, 2845, 7819, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31280, 2845, 7826, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31282, 2845, 7827, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31345, 2845, 7858, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31420, 2845, 7988, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31483, 2845, 8042, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31424, 2845, 7989, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (15236, 274, 815, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (30722, 32, 286, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31226, 2845, 7815, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31276, 2845, 7825, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31299, 2845, 7843, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31301, 2845, 7844, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31346, 2845, 7859, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31398, 2845, 7971, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31489, 2845, 8046, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31487, 2845, 8044, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31198, 2845, 7811, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31425, 2845, 7990, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31448, 2845, 8002, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31447, 2845, 8001, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31192, 2845, 7805, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31234, 2845, 7817, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31254, 2845, 7821, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31296, 2845, 7840, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31491, 2845, 8048, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31492, 2845, 8049, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31493, 2845, 8050, '3', '1', '1', '1');
insert into SYS_GLB_ROLE (id, role_id, gl_id, gl_type, sfqy_st, sfyx_st, role_type)
values (31494, 2845, 8051, '3', '1', '1', '1');
commit;
prompt 31 records loaded
prompt Loading SYS_GLB_ROLE_AUTHRULE...
insert into SYS_GLB_ROLE_AUTHRULE (id, role_id, rule_id, sfyx_st)
values (87, 3, 2, '1');
commit;
prompt 1 records loaded
prompt Loading SYS_GLB_ROLE_RESOURCE...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7957, 3024, 241, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7958, 3024, 381, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7959, 3024, 382, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7960, 3024, 201, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7961, 3024, 44, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7962, 3024, 50, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7963, 3024, 105, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7964, 3024, 2826, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7965, 3024, 2829, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7966, 3024, 2830, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7967, 3024, 2831, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7968, 3024, 49, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7969, 3024, 103, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7970, 3024, 2832, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7971, 3024, 2833, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7972, 3024, 2834, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7973, 3024, 55, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7974, 3024, 2824, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7975, 3024, 109, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7976, 3024, 2839, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7977, 3024, 102, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7978, 3024, 108, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7979, 3024, 2840, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7980, 3024, 2841, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7981, 3024, 2842, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7907, 3023, 241, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7908, 3023, 201, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7909, 3023, 44, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7910, 3023, 50, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7911, 3023, 105, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7912, 3023, 2826, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7913, 3023, 2829, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7914, 3023, 2830, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7915, 3023, 2831, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7916, 3023, 49, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7917, 3023, 103, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7918, 3023, 2832, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7919, 3023, 2833, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7920, 3023, 2834, 7921, to_date('03-09-2018 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7982, 3024, 65, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7983, 3024, 159, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7984, 3024, 401, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7985, 3024, 402, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7986, 3024, 403, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7987, 3024, 1368, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7988, 3024, 1369, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7989, 3024, 2843, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7990, 3024, 2844, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7991, 3024, 2845, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7992, 3024, 2911, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7993, 3024, 2912, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7994, 3024, 46, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7995, 3024, 58, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7996, 3024, 121, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7997, 3024, 145, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7998, 3024, 57, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7999, 3024, 107, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8000, 3024, 2995, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8001, 3024, 2996, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8002, 3024, 3011, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8003, 3024, 3012, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8004, 3024, 2825, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8005, 3024, 52, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8006, 3024, 111, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8007, 3024, 361, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8008, 3024, 362, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8009, 3024, 363, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8010, 3024, 53, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8011, 3024, 112, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8012, 3024, 2835, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8013, 3024, 54, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8014, 3024, 110, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8015, 3024, 2846, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8016, 3024, 2847, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8017, 3024, 2848, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8018, 3024, 2849, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8019, 3024, 61, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8020, 3024, 62, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8021, 3024, 141, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8022, 3024, 63, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8023, 3024, 101, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8024, 3024, 321, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8025, 3024, 322, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8026, 3024, 2969, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8027, 3024, 2970, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8028, 3024, 2971, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8029, 3024, 2981, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8030, 3024, 2982, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8031, 3024, 2985, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8032, 3024, 2983, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8033, 3024, 2984, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8034, 3024, 3013, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8035, 3024, 47, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8036, 3024, 1344, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8037, 3024, 1365, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8038, 3024, 2827, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6900, 2890, 241, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6901, 2890, 201, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6902, 2890, 44, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6903, 2890, 49, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 100 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6904, 2890, 103, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6905, 2890, 2832, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6906, 2890, 2833, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6907, 2890, 2834, 7808, to_date('27-07-2018 16:58:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8039, 3024, 1362, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8040, 3024, 1349, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8041, 3024, 1345, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8042, 3024, 1301, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8043, 3024, 1303, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8044, 3024, 1302, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8045, 3024, 1304, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8046, 3024, 1305, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8047, 3024, 1307, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8048, 3024, 1306, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8049, 3024, 1308, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8050, 3024, 1309, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8051, 3024, 1310, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8052, 3024, 1311, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8053, 3024, 43, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8054, 3024, 2964, 815, to_date('04-09-2018 15:19:00', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8055, 3024, 2965, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8056, 3024, 2987, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8057, 3024, 2988, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8058, 3024, 3009, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8059, 3024, 3010, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8060, 3024, 2989, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8061, 3024, 2990, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8062, 3024, 2972, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8063, 3024, 2973, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8064, 3024, 2974, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8065, 3024, 2975, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8066, 3024, 2991, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8067, 3024, 2992, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8068, 3024, 2993, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8069, 3024, 2994, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8070, 3024, 2976, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8071, 3024, 2977, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8072, 3024, 2979, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7096, 2879, 241, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7097, 2879, 201, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7098, 2879, 55, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7099, 2879, 2824, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7100, 2879, 109, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7101, 2879, 2839, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7102, 2879, 102, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7103, 2879, 108, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7104, 2879, 2840, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7105, 2879, 2841, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7106, 2879, 2842, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7107, 2879, 65, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7108, 2879, 159, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7109, 2879, 401, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7110, 2879, 402, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7111, 2879, 403, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7112, 2879, 1368, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7113, 2879, 1369, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7114, 2879, 2843, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7115, 2879, 2844, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7116, 2879, 2845, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7117, 2879, 2911, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7118, 2879, 2912, 7808, to_date('27-07-2018 17:17:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6505, 2849, 201, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6506, 2849, 55, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6507, 2849, 2824, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6508, 2849, 109, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6509, 2849, 2839, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6510, 2849, 2911, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6511, 2849, 2912, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6604, 2875, 241, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6605, 2875, 201, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6606, 2875, 44, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6607, 2875, 50, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6503, 2874, 241, 7812, to_date('26-07-2018 16:57:54', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6504, 2849, 241, 815, to_date('27-07-2018 09:07:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6608, 2875, 105, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6609, 2875, 2826, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6610, 2875, 2829, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6611, 2875, 2830, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6612, 2875, 2831, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6613, 2875, 49, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6614, 2875, 103, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6615, 2875, 2832, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6616, 2875, 2833, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6617, 2875, 2834, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6618, 2875, 55, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6619, 2875, 2824, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6620, 2875, 109, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6621, 2875, 2839, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6622, 2875, 102, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6623, 2875, 108, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6624, 2875, 2840, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6625, 2875, 2841, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6626, 2875, 2842, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6627, 2875, 65, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6628, 2875, 159, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6629, 2875, 401, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6630, 2875, 402, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6631, 2875, 403, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6632, 2875, 1368, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6633, 2875, 1369, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 200 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6634, 2875, 2843, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6635, 2875, 2844, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6636, 2875, 2845, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6637, 2875, 2911, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6638, 2875, 2912, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6639, 2875, 46, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6640, 2875, 58, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6641, 2875, 121, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6642, 2875, 145, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6643, 2875, 57, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6644, 2875, 107, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6645, 2875, 2825, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6646, 2875, 52, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6647, 2875, 111, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6648, 2875, 361, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6649, 2875, 362, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6650, 2875, 363, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6651, 2875, 53, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6652, 2875, 112, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6653, 2875, 2835, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6654, 2875, 54, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6655, 2875, 110, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6656, 2875, 2846, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6657, 2875, 2847, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6658, 2875, 2848, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6659, 2875, 2849, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6660, 2875, 61, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6661, 2875, 62, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6662, 2875, 141, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6663, 2875, 63, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6664, 2875, 101, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6665, 2875, 321, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6666, 2875, 322, 815, to_date('27-07-2018 14:32:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7119, 2876, 241, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7120, 2876, 201, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7121, 2876, 44, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7122, 2876, 50, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7123, 2876, 105, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7124, 2876, 2826, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7125, 2876, 2829, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7126, 2876, 2830, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7127, 2876, 2831, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7128, 2876, 49, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7129, 2876, 103, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7130, 2876, 2832, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7131, 2876, 2833, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7132, 2876, 2834, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7133, 2876, 55, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7134, 2876, 2824, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7135, 2876, 109, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7136, 2876, 2839, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7137, 2876, 102, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7138, 2876, 108, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7139, 2876, 2840, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7140, 2876, 2841, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7141, 2876, 2842, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7142, 2876, 65, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7143, 2876, 159, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7144, 2876, 401, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7145, 2876, 402, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7146, 2876, 403, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7147, 2876, 1368, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7148, 2876, 1369, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7149, 2876, 2843, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7150, 2876, 2844, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7151, 2876, 2845, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7152, 2876, 2911, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7153, 2876, 2912, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7154, 2876, 46, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7155, 2876, 58, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7156, 2876, 121, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7157, 2876, 145, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7158, 2876, 57, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7159, 2876, 107, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7160, 2876, 2825, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7161, 2876, 52, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7162, 2876, 111, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7163, 2876, 361, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7164, 2876, 362, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7165, 2876, 363, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7166, 2876, 53, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7167, 2876, 112, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7168, 2876, 2835, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7169, 2876, 54, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7170, 2876, 110, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7171, 2876, 2846, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7172, 2876, 2847, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7173, 2876, 2848, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7174, 2876, 2849, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7175, 2876, 47, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7176, 2876, 43, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7177, 2876, 2916, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7178, 2876, 2914, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7179, 2876, 2920, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7180, 2876, 2918, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7181, 2876, 2917, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7182, 2876, 2915, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7183, 2876, 2913, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7184, 2876, 2919, 815, to_date('27-07-2018 17:28:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7185, 2895, 241, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 300 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7186, 2895, 201, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7187, 2895, 2825, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7188, 2895, 54, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7189, 2895, 110, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7190, 2895, 2846, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7191, 2895, 2847, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7192, 2895, 2848, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7193, 2895, 2849, 7808, to_date('27-07-2018 17:29:59', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7398, 2955, 201, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7399, 2955, 44, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7400, 2955, 50, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7401, 2955, 105, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7402, 2955, 2826, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7403, 2955, 2829, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7404, 2955, 2830, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7405, 2955, 2831, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7406, 2955, 49, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7407, 2955, 103, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7408, 2955, 2832, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7222, 2911, 241, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7223, 2911, 201, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7224, 2911, 55, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7225, 2911, 102, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7226, 2911, 108, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7227, 2911, 2840, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7228, 2911, 2841, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7229, 2911, 2842, 7823, to_date('30-07-2018 14:00:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7230, 2910, 241, 815, to_date('30-07-2018 14:00:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7231, 2910, 201, 815, to_date('30-07-2018 14:00:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7232, 2910, 55, 815, to_date('30-07-2018 14:00:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7233, 2910, 2824, 815, to_date('30-07-2018 14:00:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7234, 2910, 109, 815, to_date('30-07-2018 14:00:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7235, 2910, 2839, 815, to_date('30-07-2018 14:00:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7383, 2951, 241, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7384, 2951, 201, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7385, 2951, 44, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7386, 2951, 50, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7387, 2951, 105, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7388, 2951, 2826, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7389, 2951, 2829, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7390, 2951, 2830, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7391, 2951, 2831, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7392, 2951, 49, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7393, 2951, 103, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7394, 2951, 2832, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7395, 2951, 2833, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7396, 2951, 2834, 815, to_date('08-08-2018 15:11:42', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7397, 2955, 241, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7409, 2955, 2833, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7410, 2955, 2834, 815, to_date('08-08-2018 15:18:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7579, 2967, 241, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7580, 2967, 201, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7581, 2967, 44, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7582, 2967, 50, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7583, 2967, 105, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7584, 2967, 2826, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7585, 2967, 2829, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7586, 2967, 2830, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7587, 2967, 2831, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7588, 2967, 49, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7589, 2967, 103, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7590, 2967, 2832, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7591, 2967, 2833, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7592, 2967, 2834, 815, to_date('10-08-2018 16:09:48', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7593, 2967, 55, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7594, 2967, 2824, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7595, 2967, 109, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7596, 2967, 2839, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7597, 2967, 102, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7598, 2967, 108, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7599, 2967, 2840, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7600, 2967, 2841, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7601, 2967, 2842, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7602, 2967, 65, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7603, 2967, 159, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7604, 2967, 401, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7605, 2967, 402, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7606, 2967, 403, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7607, 2967, 1368, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7608, 2967, 1369, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7609, 2967, 2843, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7610, 2967, 2844, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7611, 2967, 2845, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7612, 2967, 2911, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7613, 2967, 2912, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7614, 2967, 46, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7615, 2967, 58, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7616, 2967, 121, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7617, 2967, 145, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7618, 2967, 57, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7619, 2967, 107, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7620, 2967, 2825, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7621, 2967, 52, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7622, 2967, 111, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7623, 2967, 361, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7624, 2967, 362, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8818, 3055, 201, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8819, 3055, 44, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8820, 3055, 50, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8821, 3055, 105, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 400 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8822, 3055, 2826, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8823, 3055, 49, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8824, 3055, 103, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8825, 3055, 2832, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8753, 3053, 241, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8754, 3053, 201, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8755, 3053, 44, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8756, 3053, 50, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8757, 3053, 105, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8758, 3053, 2826, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8759, 3053, 2830, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8760, 3053, 2831, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8761, 3053, 49, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8762, 3053, 103, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8763, 3053, 2832, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8764, 3053, 2834, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8765, 3053, 55, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8766, 3053, 2824, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8767, 3053, 109, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8768, 3053, 2839, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8769, 3053, 102, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8770, 3053, 108, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8771, 3053, 2840, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8772, 3053, 2841, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8773, 3053, 2842, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8774, 3053, 65, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8775, 3053, 159, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8776, 3053, 401, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8777, 3053, 402, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8778, 3053, 403, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8779, 3053, 1368, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8780, 3053, 1369, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8781, 3053, 2843, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8782, 3053, 2844, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8783, 3053, 2845, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8784, 3053, 2911, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8785, 3053, 2912, 815, to_date('17-09-2018 15:18:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8786, 3056, 241, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8787, 3056, 201, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8788, 3056, 44, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8789, 3056, 50, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8790, 3056, 105, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8791, 3056, 2830, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8792, 3056, 2831, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8793, 3056, 49, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8794, 3056, 103, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8795, 3056, 2834, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8796, 3056, 55, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8797, 3056, 2824, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8798, 3056, 109, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8799, 3056, 2839, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8800, 3056, 102, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8801, 3056, 108, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8802, 3056, 2840, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8803, 3056, 2841, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8804, 3056, 2842, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8805, 3056, 65, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8806, 3056, 159, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8807, 3056, 401, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8808, 3056, 402, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8809, 3056, 403, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8810, 3056, 1368, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8811, 3056, 1369, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8812, 3056, 2843, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8813, 3056, 2844, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8814, 3056, 2845, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8815, 3056, 2911, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8816, 3056, 2912, 815, to_date('17-09-2018 15:18:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8817, 3055, 241, 815, to_date('17-09-2018 15:18:44', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8583, 3051, 241, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6443, 2859, 201, 815, to_date('26-07-2018 09:30:21', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6444, 2859, 61, 815, to_date('26-07-2018 09:30:22', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7715, 2973, 201, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7363, 2933, 241, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7364, 2933, 201, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7365, 2933, 44, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7366, 2933, 50, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7367, 2933, 105, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6442, 2859, 241, 815, to_date('26-07-2018 09:30:21', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6445, 2859, 62, 815, to_date('26-07-2018 09:30:22', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6446, 2859, 141, 815, to_date('26-07-2018 09:30:22', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7368, 2933, 2826, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7369, 2933, 2829, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7370, 2933, 2830, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7371, 2933, 2831, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7372, 2933, 49, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7373, 2933, 103, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7374, 2933, 2832, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7375, 2933, 2833, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7376, 2933, 2834, 7826, to_date('01-08-2018 11:12:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7716, 2973, 44, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7717, 2973, 50, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7718, 2973, 105, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7719, 2973, 2826, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7720, 2973, 2829, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7721, 2973, 2830, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7722, 2973, 2831, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7723, 2973, 2825, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7724, 2973, 52, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7725, 2973, 111, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 500 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7726, 2973, 361, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7727, 2973, 362, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7728, 2973, 363, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7729, 2973, 53, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7730, 2973, 112, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7731, 2973, 2835, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7732, 2973, 54, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7733, 2973, 110, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7734, 2973, 2846, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7735, 2973, 2847, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7736, 2973, 2848, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7625, 2967, 363, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7626, 2967, 53, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7627, 2967, 112, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7628, 2967, 2835, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7629, 2967, 54, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7630, 2967, 110, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7631, 2967, 2846, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7632, 2967, 2847, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7633, 2967, 2848, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7634, 2967, 2849, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7635, 2967, 61, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7636, 2967, 62, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7637, 2967, 141, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7638, 2967, 63, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7639, 2967, 101, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7640, 2967, 321, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7641, 2967, 322, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7642, 2967, 2969, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7643, 2967, 2970, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7644, 2967, 2971, 815, to_date('10-08-2018 16:09:49', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7714, 2973, 241, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7737, 2973, 2849, 7854, to_date('13-08-2018 14:39:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8073, 3024, 2980, 815, to_date('04-09-2018 15:19:01', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8074, 3025, 241, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8075, 3025, 201, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8076, 3025, 44, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8077, 3025, 50, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8078, 3025, 105, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8079, 3025, 2826, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8080, 3025, 2829, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8081, 3025, 2830, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8082, 3025, 2831, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8083, 3025, 49, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8084, 3025, 103, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8085, 3025, 2832, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8086, 3025, 2833, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8087, 3025, 2834, 7841, to_date('04-09-2018 15:19:56', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8109, 3034, 241, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8110, 3034, 381, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7318, 2932, 241, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7319, 2932, 201, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7320, 2932, 44, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7321, 2932, 50, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7322, 2932, 105, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7323, 2932, 2826, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7324, 2932, 2829, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7325, 2932, 2830, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7326, 2932, 2831, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7327, 2932, 49, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7328, 2932, 103, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7329, 2932, 2832, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7330, 2932, 2833, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7331, 2932, 2834, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7332, 2932, 55, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7333, 2932, 2824, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7334, 2932, 109, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7335, 2932, 2839, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7336, 2932, 102, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7337, 2932, 108, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7338, 2932, 2840, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7339, 2932, 2841, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7340, 2932, 2842, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7341, 2932, 65, 815, to_date('01-08-2018 11:09:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7342, 2932, 159, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7343, 2932, 401, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7344, 2932, 402, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7345, 2932, 403, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7346, 2932, 2911, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7347, 2932, 2912, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7348, 2932, 2825, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7349, 2932, 52, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7350, 2932, 111, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7351, 2932, 361, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7352, 2932, 362, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7353, 2932, 363, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7354, 2932, 53, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7355, 2932, 112, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7356, 2932, 2835, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7357, 2932, 54, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7358, 2932, 110, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7359, 2932, 2846, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7360, 2932, 2847, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7361, 2932, 2848, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7362, 2932, 2849, 815, to_date('01-08-2018 11:09:14', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8111, 3034, 382, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8112, 3034, 201, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8113, 3034, 44, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8114, 3034, 50, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8115, 3034, 105, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 600 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8116, 3034, 2826, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8117, 3034, 2829, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8118, 3034, 2830, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8119, 3034, 2831, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8120, 3034, 49, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8121, 3034, 103, 815, to_date('11-09-2018 17:24:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8122, 3034, 2832, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8123, 3034, 2833, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8124, 3034, 2834, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8125, 3034, 55, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8126, 3034, 2824, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8127, 3034, 109, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8128, 3034, 2839, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8129, 3034, 102, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8130, 3034, 108, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8131, 3034, 2840, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8132, 3034, 2841, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8133, 3034, 2842, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8134, 3034, 65, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8135, 3034, 159, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8136, 3034, 401, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8137, 3034, 402, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8138, 3034, 403, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8139, 3034, 1368, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8140, 3034, 1369, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8141, 3034, 2843, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8142, 3034, 2844, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8143, 3034, 2845, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8144, 3034, 2911, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8145, 3034, 2912, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8146, 3034, 46, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8147, 3034, 58, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8148, 3034, 121, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8149, 3034, 145, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8150, 3034, 57, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8151, 3034, 107, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8152, 3034, 3011, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8153, 3034, 3012, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8154, 3034, 2996, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8155, 3034, 2825, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8156, 3034, 52, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8157, 3034, 111, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8158, 3034, 361, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8159, 3034, 362, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8160, 3034, 363, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8161, 3034, 53, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8162, 3034, 112, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8163, 3034, 2835, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8164, 3034, 54, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8165, 3034, 110, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8166, 3034, 2846, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8167, 3034, 2847, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8168, 3034, 2848, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8169, 3034, 2849, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8170, 3034, 61, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8171, 3034, 62, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8172, 3034, 141, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8173, 3034, 63, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8174, 3034, 101, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8175, 3034, 321, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8176, 3034, 322, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8177, 3034, 2969, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8178, 3034, 2970, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8179, 3034, 2971, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8180, 3034, 2981, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8181, 3034, 2982, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8182, 3034, 2985, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8183, 3034, 2983, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8184, 3034, 2984, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8185, 3034, 3013, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8186, 3034, 47, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8187, 3034, 1344, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8188, 3034, 1365, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8189, 3034, 2827, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8190, 3034, 1362, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8191, 3034, 1349, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8192, 3034, 1345, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8193, 3034, 1301, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8194, 3034, 1303, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8195, 3034, 1302, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8196, 3034, 1304, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8197, 3034, 1305, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8198, 3034, 1307, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8199, 3034, 1306, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8200, 3034, 1308, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8201, 3034, 1309, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8202, 3034, 1310, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8203, 3034, 1311, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8204, 3034, 43, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8205, 3034, 2979, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8206, 3034, 2980, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8207, 3034, 2989, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8208, 3034, 2990, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8209, 3034, 3009, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8210, 3034, 3010, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8211, 3034, 2976, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8212, 3034, 2977, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8213, 3034, 2993, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8214, 3034, 2994, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8215, 3034, 2974, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 700 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8216, 3034, 2975, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8217, 3034, 2972, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8218, 3034, 2973, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8219, 3034, 2987, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8220, 3034, 2988, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6490, 2872, 241, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6491, 2872, 201, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6492, 2872, 44, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6493, 2872, 50, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6494, 2872, 105, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6495, 2872, 2826, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6496, 2872, 2829, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6497, 2872, 2830, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6498, 2872, 2831, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6499, 2872, 55, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6500, 2872, 2824, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6501, 2872, 109, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6502, 2872, 2839, 815, to_date('26-07-2018 16:33:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7200, 2907, 241, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7201, 2907, 201, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7202, 2907, 55, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7203, 2907, 2824, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7204, 2907, 109, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7205, 2907, 2839, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7206, 2907, 102, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7207, 2907, 108, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7208, 2907, 2840, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7209, 2907, 2841, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7210, 2907, 2842, 815, to_date('30-07-2018 11:16:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8221, 3034, 2964, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8222, 3034, 2965, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8223, 3034, 2991, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8224, 3034, 2992, 815, to_date('11-09-2018 17:24:11', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8225, 3036, 241, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8226, 3036, 381, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8227, 3036, 382, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8228, 3036, 201, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7559, 2966, 241, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7560, 2966, 201, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7561, 2966, 44, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7562, 2966, 50, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7563, 2966, 105, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7564, 2966, 2826, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7565, 2966, 2829, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7566, 2966, 2830, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7567, 2966, 2831, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7568, 2966, 49, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7569, 2966, 103, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7570, 2966, 2832, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7571, 2966, 2833, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7572, 2966, 2834, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7573, 2966, 46, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7574, 2966, 58, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7575, 2966, 121, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7576, 2966, 145, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7577, 2966, 57, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7578, 2966, 107, 286, to_date('10-08-2018 15:56:41', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7829, 3020, 241, 286, to_date('03-09-2018 09:13:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7830, 3020, 201, 286, to_date('03-09-2018 09:13:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7831, 3020, 55, 286, to_date('03-09-2018 09:13:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7832, 3020, 2824, 286, to_date('03-09-2018 09:13:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7833, 3020, 109, 286, to_date('03-09-2018 09:13:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7834, 3020, 2839, 286, to_date('03-09-2018 09:13:57', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8229, 3036, 44, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8230, 3036, 50, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8231, 3036, 105, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8232, 3036, 2826, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8233, 3036, 2829, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8234, 3036, 2830, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8235, 3036, 2831, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8236, 3036, 49, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8237, 3036, 103, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8238, 3036, 2832, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8239, 3036, 2833, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8240, 3036, 2834, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8241, 3036, 55, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8242, 3036, 2824, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8243, 3036, 109, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8244, 3036, 2839, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8245, 3036, 102, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8246, 3036, 108, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8247, 3036, 2840, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8248, 3036, 2841, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8249, 3036, 2842, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8250, 3036, 65, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8251, 3036, 159, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8252, 3036, 401, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8253, 3036, 402, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8254, 3036, 403, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8255, 3036, 1368, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8256, 3036, 1369, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8257, 3036, 2843, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8258, 3036, 2844, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8259, 3036, 2845, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8260, 3036, 2911, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8261, 3036, 2912, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8262, 3036, 46, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8263, 3036, 58, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8264, 3036, 121, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8265, 3036, 145, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 800 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8266, 3036, 57, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8267, 3036, 107, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8268, 3036, 3011, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8269, 3036, 3012, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8270, 3036, 2996, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8271, 3036, 2825, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8272, 3036, 52, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8273, 3036, 111, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8274, 3036, 361, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8275, 3036, 362, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8276, 3036, 363, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8277, 3036, 53, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8278, 3036, 112, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8279, 3036, 2835, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8280, 3036, 54, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8281, 3036, 110, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8282, 3036, 2846, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8283, 3036, 2847, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8284, 3036, 2848, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8285, 3036, 2849, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8286, 3036, 61, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8287, 3036, 62, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8288, 3036, 141, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8289, 3036, 63, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8290, 3036, 101, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8291, 3036, 321, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8292, 3036, 322, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8293, 3036, 2969, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8294, 3036, 2970, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8295, 3036, 2971, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8296, 3036, 2981, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8297, 3036, 2982, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8298, 3036, 2985, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8299, 3036, 2983, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8300, 3036, 2984, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8301, 3036, 3013, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8302, 3036, 47, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8303, 3036, 1344, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8304, 3036, 1365, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8305, 3036, 2827, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8306, 3036, 1362, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8307, 3036, 1349, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8308, 3036, 1345, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8309, 3036, 1301, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8310, 3036, 1303, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8311, 3036, 1302, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8312, 3036, 1304, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8313, 3036, 1305, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8314, 3036, 1307, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8315, 3036, 1306, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8316, 3036, 1308, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8317, 3036, 1309, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8318, 3036, 1310, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8319, 3036, 1311, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8320, 3036, 43, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8321, 3036, 3009, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8322, 3036, 3010, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8323, 3036, 2964, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8324, 3036, 2965, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8325, 3036, 2989, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8326, 3036, 2990, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8327, 3036, 2987, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8328, 3036, 2988, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8329, 3036, 2993, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8330, 3036, 2994, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8331, 3036, 2976, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8332, 3036, 2977, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8333, 3036, 2979, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8334, 3036, 2980, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8335, 3036, 2991, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8336, 3036, 2992, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8337, 3036, 2974, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8338, 3036, 2975, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8339, 3036, 2972, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8340, 3036, 2973, 7961, to_date('11-09-2018 17:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8341, 3035, 241, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8342, 3035, 381, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8343, 3035, 382, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8344, 3035, 201, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8345, 3035, 44, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8346, 3035, 50, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8347, 3035, 105, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8348, 3035, 2826, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8349, 3035, 2829, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8350, 3035, 2830, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8351, 3035, 2831, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8352, 3035, 49, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8353, 3035, 103, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8354, 3035, 2832, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8355, 3035, 2833, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8356, 3035, 2834, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8357, 3035, 55, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8358, 3035, 2824, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8359, 3035, 109, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8360, 3035, 2839, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8361, 3035, 102, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8362, 3035, 108, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8363, 3035, 2840, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8364, 3035, 2841, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8365, 3035, 2842, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 900 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8366, 3035, 65, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8367, 3035, 159, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8368, 3035, 401, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8369, 3035, 402, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8370, 3035, 403, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8371, 3035, 1368, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8372, 3035, 1369, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8373, 3035, 2843, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8374, 3035, 2844, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8375, 3035, 2845, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8376, 3035, 2911, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8377, 3035, 2912, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8378, 3035, 46, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8379, 3035, 58, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8380, 3035, 121, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8381, 3035, 145, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8382, 3035, 57, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8383, 3035, 107, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8384, 3035, 3011, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8385, 3035, 3012, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8386, 3035, 2996, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8387, 3035, 2825, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8388, 3035, 52, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8389, 3035, 111, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8390, 3035, 361, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8391, 3035, 362, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8392, 3035, 363, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8393, 3035, 53, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8394, 3035, 112, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8395, 3035, 2835, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8396, 3035, 54, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8397, 3035, 110, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8398, 3035, 2846, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8399, 3035, 2847, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8400, 3035, 2848, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8401, 3035, 2849, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8402, 3035, 61, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8403, 3035, 62, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8404, 3035, 141, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8405, 3035, 63, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6456, 2869, 201, 815, to_date('26-07-2018 11:02:58', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6457, 2869, 55, 815, to_date('26-07-2018 11:02:58', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6458, 2869, 2824, 815, to_date('26-07-2018 11:02:58', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6459, 2869, 109, 815, to_date('26-07-2018 11:02:58', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6460, 2869, 2839, 815, to_date('26-07-2018 11:02:58', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6452, 2868, 241, 815, to_date('26-07-2018 11:02:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6453, 2868, 381, 815, to_date('26-07-2018 11:02:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6454, 2868, 382, 815, to_date('26-07-2018 11:02:50', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6455, 2869, 241, 815, to_date('26-07-2018 11:02:58', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8104, 3032, 201, 815, to_date('11-09-2018 10:40:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8105, 3032, 46, 815, to_date('11-09-2018 10:40:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8106, 3032, 58, 815, to_date('11-09-2018 10:40:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8107, 3032, 121, 815, to_date('11-09-2018 10:40:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8108, 3032, 145, 815, to_date('11-09-2018 10:40:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7236, 2877, 241, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7237, 2877, 201, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7238, 2877, 2825, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7239, 2877, 54, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7240, 2877, 110, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7241, 2877, 2846, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7242, 2877, 2847, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7243, 2877, 2848, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7244, 2877, 2849, 7808, to_date('01-08-2018 10:44:02', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8406, 3035, 101, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8407, 3035, 321, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8408, 3035, 322, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8409, 3035, 2969, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8410, 3035, 2970, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8411, 3035, 2971, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8412, 3035, 2981, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8413, 3035, 2982, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8414, 3035, 2985, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8415, 3035, 2983, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8416, 3035, 2984, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8417, 3035, 3013, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8418, 3035, 47, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8419, 3035, 1344, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8420, 3035, 1365, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8421, 3035, 2827, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8422, 3035, 1362, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8423, 3035, 1349, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8424, 3035, 1345, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8425, 3035, 1301, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8426, 3035, 1303, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8427, 3035, 1302, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8428, 3035, 1304, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8429, 3035, 1305, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8430, 3035, 1307, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8431, 3035, 1306, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8432, 3035, 1308, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8433, 3035, 1309, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8434, 3035, 1310, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8435, 3035, 1311, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8436, 3035, 43, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8437, 3035, 2979, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8438, 3035, 2980, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8439, 3035, 2989, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8440, 3035, 2990, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8441, 3035, 3009, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8442, 3035, 3010, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 1000 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8443, 3035, 2976, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8444, 3035, 2977, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8445, 3035, 2993, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8446, 3035, 2994, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8447, 3035, 2974, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8448, 3035, 2975, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8449, 3035, 2972, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8450, 3035, 2973, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8451, 3035, 2987, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8452, 3035, 2988, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8453, 3035, 2964, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8454, 3035, 2965, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8455, 3035, 2991, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8456, 3035, 2992, 815, to_date('11-09-2018 18:37:39', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8457, 3037, 241, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8458, 3037, 381, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8459, 3037, 382, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8460, 3037, 201, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8461, 3037, 44, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8462, 3037, 50, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8463, 3037, 105, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8464, 3037, 2826, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8465, 3037, 2829, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8466, 3037, 2830, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8467, 3037, 2831, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8468, 3037, 49, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8469, 3037, 103, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8470, 3037, 2832, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8471, 3037, 2833, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8472, 3037, 2834, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8473, 3037, 55, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8474, 3037, 2824, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8475, 3037, 109, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8476, 3037, 2839, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8477, 3037, 102, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8478, 3037, 108, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8479, 3037, 2840, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8480, 3037, 2841, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8481, 3037, 2842, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8482, 3037, 65, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8483, 3037, 159, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7659, 2972, 55, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7660, 2972, 2824, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6694, 2892, 241, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6695, 2892, 201, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6696, 2892, 44, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6697, 2892, 50, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6698, 2892, 105, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6699, 2892, 2826, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6700, 2892, 2829, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6701, 2892, 2830, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6702, 2892, 2831, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6703, 2892, 49, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6704, 2892, 103, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6705, 2892, 2832, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6706, 2892, 2833, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6707, 2892, 2834, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6708, 2892, 55, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6709, 2892, 2824, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6710, 2892, 109, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6711, 2892, 2839, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6712, 2892, 102, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6713, 2892, 108, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6714, 2892, 2840, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6715, 2892, 2841, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6716, 2892, 2842, 815, to_date('27-07-2018 16:37:18', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7661, 2972, 109, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7662, 2972, 2839, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7663, 2972, 102, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7664, 2972, 108, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7665, 2972, 2840, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7666, 2972, 2841, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7667, 2972, 2842, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7668, 2972, 65, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7669, 2972, 159, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7670, 2972, 401, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7671, 2972, 402, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7672, 2972, 403, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7673, 2972, 1368, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7674, 2972, 1369, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7675, 2972, 2843, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7676, 2972, 2844, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7677, 2972, 2845, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7678, 2972, 2911, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7679, 2972, 2912, 7854, to_date('13-08-2018 14:20:36', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7680, 2971, 241, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7681, 2971, 201, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7682, 2971, 2825, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7683, 2971, 52, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7684, 2971, 111, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7685, 2971, 361, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7686, 2971, 362, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7687, 2971, 363, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7688, 2971, 53, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7689, 2971, 112, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7690, 2971, 2835, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7691, 2971, 54, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7692, 2971, 110, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7693, 2971, 2846, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7694, 2971, 2847, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 1100 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7695, 2971, 2848, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7696, 2971, 2849, 7854, to_date('13-08-2018 14:24:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8103, 3032, 241, 815, to_date('11-09-2018 10:40:16', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6448, 2866, 201, 7806, to_date('26-07-2018 10:19:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6449, 2866, 61, 7806, to_date('26-07-2018 10:19:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6450, 2866, 62, 7806, to_date('26-07-2018 10:19:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6451, 2866, 141, 7806, to_date('26-07-2018 10:19:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6669, 2881, 241, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6670, 2881, 201, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6671, 2881, 44, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6430, 2850, 241, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6431, 2850, 201, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6432, 2850, 44, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6433, 2850, 49, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6434, 2850, 103, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6435, 2850, 2832, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6436, 2850, 2833, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6437, 2850, 2834, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6438, 2850, 55, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6439, 2850, 2824, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6440, 2850, 109, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6441, 2850, 2839, 815, to_date('26-07-2018 09:24:40', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6447, 2866, 241, 7806, to_date('26-07-2018 10:19:25', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6672, 2881, 50, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6673, 2881, 105, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6674, 2881, 2826, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6675, 2881, 2829, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6676, 2881, 2830, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6677, 2881, 2831, 7813, to_date('27-07-2018 15:45:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6678, 2880, 241, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6679, 2880, 201, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6680, 2880, 44, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6681, 2880, 49, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6682, 2880, 103, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6683, 2880, 2832, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6684, 2880, 2833, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6685, 2880, 2834, 7813, to_date('27-07-2018 15:45:46', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6686, 2888, 55, 7813, to_date('27-07-2018 15:46:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6687, 2888, 2824, 7813, to_date('27-07-2018 15:46:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6688, 2888, 109, 7813, to_date('27-07-2018 15:46:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6689, 2888, 102, 7813, to_date('27-07-2018 15:46:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (6690, 2888, 108, 7813, to_date('27-07-2018 15:46:09', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7939, 3022, 241, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7940, 3022, 201, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7941, 3022, 44, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7942, 3022, 49, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7943, 3022, 103, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7944, 3022, 2832, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7835, 3019, 241, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7836, 3019, 201, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7837, 3019, 44, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7838, 3019, 50, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7839, 3019, 105, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7840, 3019, 2826, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7841, 3019, 2829, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7842, 3019, 2830, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7843, 3019, 2831, 815, to_date('03-09-2018 09:35:24', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7844, 3017, 241, 815, to_date('03-09-2018 09:35:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7845, 3017, 201, 815, to_date('03-09-2018 09:35:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7846, 3017, 55, 815, to_date('03-09-2018 09:35:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7847, 3017, 2824, 815, to_date('03-09-2018 09:35:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7848, 3017, 109, 815, to_date('03-09-2018 09:35:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7849, 3017, 2839, 815, to_date('03-09-2018 09:35:32', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7945, 3022, 2833, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7946, 3022, 2834, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7947, 3022, 55, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7948, 3022, 2824, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7949, 3022, 109, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7950, 3022, 2839, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7951, 3022, 102, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7952, 3022, 108, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7953, 3022, 2840, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7954, 3022, 2841, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7955, 3022, 2842, 815, to_date('03-09-2018 10:05:05', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (7956, 3022, 3030, 815, to_date('03-09-2018 11:43:10', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8584, 3051, 201, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8585, 3051, 44, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8586, 3051, 50, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8587, 3051, 105, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8588, 3051, 2826, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8589, 3051, 2829, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8590, 3051, 2830, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8591, 3051, 2831, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8592, 3051, 49, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8593, 3051, 103, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8594, 3051, 2832, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8595, 3051, 2833, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8596, 3051, 2834, 286, to_date('14-09-2018 15:42:45', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8876, 3092, 241, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8877, 3092, 201, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8878, 3092, 46, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8879, 3092, 58, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8880, 3092, 121, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8881, 3092, 145, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8882, 3092, 57, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8883, 3092, 107, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8884, 3092, 3111, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8885, 3092, 3112, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8886, 3092, 3011, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8887, 3092, 2996, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 1200 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8888, 3092, 3012, 815, to_date('29-09-2018 17:24:21', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8903, 32, 241, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8904, 32, 381, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8905, 32, 382, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8906, 32, 201, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8907, 32, 44, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8908, 32, 50, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8909, 32, 105, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8910, 32, 2826, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8911, 32, 2829, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8912, 32, 2830, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8913, 32, 2831, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8914, 32, 49, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8915, 32, 103, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8916, 32, 2832, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8917, 32, 2833, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8918, 32, 2834, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8919, 32, 55, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8920, 32, 2824, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8921, 32, 109, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8922, 32, 2839, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8923, 32, 102, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8924, 32, 108, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8925, 32, 65, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8926, 32, 159, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8927, 32, 401, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8928, 32, 402, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8929, 32, 403, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8930, 32, 1368, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8931, 32, 1369, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8932, 32, 2911, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8933, 32, 2912, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8934, 32, 46, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8935, 32, 58, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8936, 32, 121, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8937, 32, 145, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8938, 32, 57, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8939, 32, 107, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8940, 32, 3111, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8941, 32, 3112, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8942, 32, 3011, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8943, 32, 2996, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8944, 32, 3012, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8945, 32, 2825, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8946, 32, 52, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8947, 32, 111, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8948, 32, 363, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8949, 32, 53, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8950, 32, 112, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8951, 32, 54, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8952, 32, 110, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8953, 32, 61, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8954, 32, 62, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8955, 32, 141, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8956, 32, 63, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8957, 32, 101, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8958, 32, 321, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8959, 32, 322, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8960, 32, 2985, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8961, 32, 2983, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8962, 32, 2984, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8963, 32, 3013, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8964, 32, 47, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8965, 32, 1344, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8966, 32, 1362, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8967, 32, 1365, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8968, 32, 1349, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8969, 32, 1345, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8970, 32, 3056, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8971, 32, 3109, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8972, 32, 1301, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8973, 32, 1303, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8974, 32, 1302, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8975, 32, 1304, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8976, 32, 1305, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8977, 32, 1307, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8978, 32, 1306, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8979, 32, 1308, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8980, 32, 1309, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8981, 32, 1310, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8982, 32, 1311, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8983, 32, 43, 815, to_date('19-10-2018 14:25:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9024, 3118, 241, 815, to_date('07-11-2018 09:08:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9025, 3118, 201, 815, to_date('07-11-2018 09:08:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9026, 3118, 46, 815, to_date('07-11-2018 09:08:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9027, 3118, 3111, 815, to_date('07-11-2018 09:08:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9028, 3118, 3112, 815, to_date('07-11-2018 09:08:29', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9029, 3119, 241, 8041, to_date('07-11-2018 09:21:23', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9030, 3119, 201, 8041, to_date('07-11-2018 09:21:23', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9031, 3119, 46, 8041, to_date('07-11-2018 09:21:23', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9032, 3119, 3111, 8041, to_date('07-11-2018 09:21:23', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9033, 3119, 3112, 8041, to_date('07-11-2018 09:21:23', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9052, 3064, 241, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9053, 3064, 381, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9054, 3064, 382, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9055, 3064, 3167, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9056, 3064, 3168, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9057, 3064, 3169, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9058, 3064, 3170, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9059, 3064, 3171, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 1300 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9060, 3064, 3172, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9061, 3064, 3173, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9062, 3064, 3174, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9063, 3064, 3175, 815, to_date('08-11-2018 14:01:51', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8864, 3091, 201, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8865, 3091, 46, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8866, 3091, 58, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8867, 3091, 121, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8868, 3091, 145, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8869, 3091, 57, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8870, 3091, 107, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8871, 3091, 3111, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8872, 3091, 3112, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8873, 3091, 3011, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8874, 3091, 2996, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8875, 3091, 3012, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8997, 3111, 241, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8998, 3111, 201, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8999, 3111, 46, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9000, 3111, 58, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9001, 3111, 121, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9002, 3111, 145, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9003, 3111, 57, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9004, 3111, 107, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9005, 3111, 3111, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9006, 3111, 3112, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9007, 3111, 3011, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9008, 3111, 2996, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9009, 3111, 3012, 286, to_date('22-10-2018 15:22:08', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (9023, 2868, 3165, 815, to_date('06-11-2018 17:53:38', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8863, 3091, 241, 815, to_date('29-09-2018 16:59:56', 'dd-mm-yyyy hh24:mi:ss'), '0');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8484, 3037, 401, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8485, 3037, 402, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8486, 3037, 403, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8487, 3037, 1368, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8488, 3037, 1369, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8489, 3037, 2843, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8490, 3037, 2844, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8491, 3037, 2845, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8492, 3037, 2911, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8493, 3037, 2912, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8494, 3037, 46, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8495, 3037, 58, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8496, 3037, 121, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8497, 3037, 145, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8498, 3037, 57, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8499, 3037, 107, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8500, 3037, 3011, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8501, 3037, 3012, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8502, 3037, 2996, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8503, 3037, 2825, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8504, 3037, 52, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8505, 3037, 111, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8506, 3037, 361, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8507, 3037, 362, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8508, 3037, 363, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8509, 3037, 53, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8510, 3037, 112, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8511, 3037, 2835, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8512, 3037, 54, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8513, 3037, 110, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8514, 3037, 2846, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8515, 3037, 2847, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8516, 3037, 2848, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8517, 3037, 2849, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8518, 3037, 61, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8519, 3037, 62, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8520, 3037, 141, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8521, 3037, 63, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8522, 3037, 101, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8523, 3037, 321, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8524, 3037, 322, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8525, 3037, 2969, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8526, 3037, 2970, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8527, 3037, 2971, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8528, 3037, 2981, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8529, 3037, 2982, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8530, 3037, 2985, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8531, 3037, 2983, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8532, 3037, 2984, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8533, 3037, 3013, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8534, 3037, 47, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8535, 3037, 1344, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8536, 3037, 1365, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8537, 3037, 2827, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8538, 3037, 1362, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8539, 3037, 1349, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8540, 3037, 1345, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8541, 3037, 1301, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8542, 3037, 1303, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8543, 3037, 1302, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8544, 3037, 1304, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8545, 3037, 1305, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8546, 3037, 1307, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8547, 3037, 1306, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8548, 3037, 1308, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8549, 3037, 1309, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8550, 3037, 1310, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8551, 3037, 1311, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8552, 3037, 43, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 1400 records committed...
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8553, 3037, 3009, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8554, 3037, 3010, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8555, 3037, 2964, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8556, 3037, 2965, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8557, 3037, 2989, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8558, 3037, 2990, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8559, 3037, 2987, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8560, 3037, 2988, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8561, 3037, 2993, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8562, 3037, 2994, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8563, 3037, 2976, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8564, 3037, 2977, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8565, 3037, 2979, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8566, 3037, 2980, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8567, 3037, 2991, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8568, 3037, 2992, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8569, 3037, 2974, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8570, 3037, 2975, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8571, 3037, 2972, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
insert into SYS_GLB_ROLE_RESOURCE (id, role_id, resource_id, cjr_id, cjsj, sfyx_st)
values (8572, 3037, 2973, 7964, to_date('11-09-2018 18:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 1420 records loaded
prompt Loading SYS_GLB_ROLE_USER...
insert into SYS_GLB_ROLE_USER (id, role_id, user_id)
values (7473, 274, 815);
insert into SYS_GLB_ROLE_USER (id, role_id, user_id)
values (18889, 32, 286);
commit;
prompt 2 records loaded
prompt Loading SYS_GLB_USER...
insert into SYS_GLB_USER (id, post_id, user_id, organ_id, sfyx_st)
values (3382, null, 286, 2, '1');
commit;
prompt 1 records loaded
prompt Loading SYS_MESSAGE...
insert into SYS_MESSAGE (id, title, content, source, type_code, param, sfyx_st)
values (251, '11', '111', 815, 'XFZQDQ', 'param', '1');
insert into SYS_MESSAGE (id, title, content, source, type_code, param, sfyx_st)
values (250, '11', '111', 815, 'XFZQDQ', 'param', '1');
commit;
prompt 2 records loaded
prompt Loading SYS_MESSAGE_TYPE...
insert into SYS_MESSAGE_TYPE (id, name, code, urgent_level, valid_time, skip_type, win_size, operate_type, skip_path, sfyx_st, description)
values (222, '巡防周期到期', 'XFZQDQ', '1', 60, '1', '2', '1', 'www.baidu.com', '1', null);
commit;
prompt 1 records loaded
prompt Loading SYS_METADATA...
prompt Table is empty
prompt Loading SYS_OBJECT...
insert into SYS_OBJECT (id, obj_name, obj_code, db_name, type, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, show_name)
values (100, '组织机构', 'organ', 'sys_organ', '1', null, null, null, null, null, '1', 'ORGAN_NAME');
commit;
prompt 1 records loaded
prompt Loading SYS_ORGAN...
insert into SYS_ORGAN (id, organ_code, organ_name, full_name, parent_org, sort_num, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, organ_level)
values (2, 'AHRX', '瑞信软件', '安徽瑞信软件有限公司', null, 1, null, null, null, 286, to_date('22-06-2018 15:24:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null);
insert into SYS_ORGAN (id, organ_code, organ_name, full_name, parent_org, sort_num, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, organ_level)
values (63, 'XSB', '销售部', '销售部', 2, 8, '销售部', 286, to_date('13-11-2017 11:29:55', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('25-06-2018 10:18:15', 'dd-mm-yyyy hh24:mi:ss'), '1', null);
insert into SYS_ORGAN (id, organ_code, organ_name, full_name, parent_org, sort_num, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, organ_level)
values (14944, 'KFB', '开发部', '开发部', 2, 1, '开发部', 286, to_date('24-04-2018 14:10:16', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-06-2018 08:35:48', 'dd-mm-yyyy hh24:mi:ss'), '1', null);
insert into SYS_ORGAN (id, organ_code, organ_name, full_name, parent_org, sort_num, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, organ_level)
values (14946, 'ZAZ', '治安组', '治安组', 14944, 1, '治安组', 286, to_date('24-04-2018 14:11:42', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-06-2018 08:25:30', 'dd-mm-yyyy hh24:mi:ss'), '1', null);
insert into SYS_ORGAN (id, organ_code, organ_name, full_name, parent_org, sort_num, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, organ_level)
values (14947, 'JDZ', '监督组', '监督组', 14944, 1, '监督组', 286, to_date('24-04-2018 14:40:18', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('25-06-2018 10:17:07', 'dd-mm-yyyy hh24:mi:ss'), '1', null);
insert into SYS_ORGAN (id, organ_code, organ_name, full_name, parent_org, sort_num, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, organ_level)
values (14945, 'JWZ', '建委组', '建委组', 14944, 1, '建委组', 286, to_date('24-04-2018 14:11:13', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-06-2018 08:35:28', 'dd-mm-yyyy hh24:mi:ss'), '1', null);
commit;
prompt 6 records loaded
prompt Loading SYS_RESOURCE...
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2972, '附件表（主表）', 'SysAttachmentMenu', 'menu', 43, 1, '/attachment/sysAttachmentList', null, null, 286, to_date('15-08-2018 09:49:17', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('15-08-2018 09:49:17', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2973, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2830, '删除用户', 'DEL_USER', 'func', 105, 3, '/user/delUser', null, null, 815, to_date('04-07-2018 19:43:36', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 18:15:27', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 105, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2831, '封锁用户', 'BLOCK_USER', 'func', 105, 4, '/user/blockUser', null, null, 815, to_date('04-07-2018 19:45:29', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 18:15:41', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 105, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2833, '修改机构', 'EDIT_ORGAN', 'func', 103, 2, '/organ/sysOrganEdit', null, null, 815, to_date('04-07-2018 19:50:01', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 18:22:53', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 103, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2973, '附件表（主表）页面', 'SysAttachmentPage', 'page', 2972, 1, '/attachment/sysAttachmentList', null, null, 286, to_date('15-08-2018 09:49:17', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('15-08-2018 09:49:17', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2972, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2982, '测试动态表单页面', 'testpageform', 'page', 2981, 1, '/form/ckFormData?formId=89', null, null, 815, to_date('17-08-2018 14:52:46', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-09-2018 11:23:19', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2981, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2985, '自定义报表', 'easyReportForm', 'menu', 201, 7, null, '&#xe60e;', null, 815, to_date('20-08-2018 09:28:05', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('24-08-2018 10:52:54', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3029, '测试菜单', 'dqdqwdq', 'menu', 201, 8, null, '&#xe63d;', null, 815, to_date('03-09-2018 11:14:05', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('03-09-2018 11:41:28', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3030, '测试资源', 'sadwqd', 'app', null, 2, null, '&#xe63d;', null, 815, to_date('03-09-2018 11:43:06', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('03-09-2018 11:43:06', 'dd-mm-yyyy hh24:mi:ss'), '0', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3032, '流程页面01', 'adeqwf', 'page', null, 3, '/form/wfFormEdit?formId=58', null, null, 815, to_date('07-09-2018 09:12:31', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('07-09-2018 09:12:31', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3095, '员工信息管理', 'YgxxglMenu', 'menu', 43, 1, '/xtgl/ygxxglList', null, null, 286, to_date('21-09-2018 16:08:39', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:08:39', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 43, 3096, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3096, '员工信息管理页面', 'YgxxglPage', 'page', 3095, 1, '/xtgl/ygxxglList', null, null, 286, to_date('21-09-2018 16:08:40', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:08:40', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3095, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3112, '测试111', 'swwww', 'page', 3111, 1, '/form/wfFormList?flowCode=testflow0927', null, null, 815, to_date('27-09-2018 10:34:58', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('27-09-2018 10:34:58', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3111, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3151, '个人信息表v(1)', 'diy_personal_informat1', 'page', null, null, '/form/formEdit?formId=166', null, null, 815, to_date('19-10-2018 14:11:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-10-2018 14:11:50', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 166);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2835, '新增配置', 'ADD_CONFIG', 'func', 112, 1, '/config/configEdit', null, null, 286, to_date('05-07-2018 11:27:17', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 11:46:57', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 112, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2969, '表单管理', 'form', 'menu', 201, 6, null, '&#xe607;', null, 815, to_date('09-08-2018 15:11:59', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 15:11:59', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2840, '新增资源', 'ADD_RESOURCE', 'func', 108, 1, '/resource/resourceTypeSelect', null, null, 815, to_date('06-07-2018 08:51:29', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 08:51:41', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 108, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1301, '平台UI', 'PLATUI', 'menu', 47, 2, null, '&#xe91e;', null, 286, to_date('11-05-2018 14:01:10', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:59:40', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 47, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1303, '门户', 'SYMENU', 'menu', 1301, 1, '/demo/mh', null, null, 815, to_date('11-05-2018 14:05:42', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:50:22', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1301, 1302, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1304, '卡片列表', 'KPLBMENU', 'menu', 1301, 2, '/demo/cardList', null, null, 815, to_date('11-05-2018 14:06:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:50:52', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1301, 1305, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1307, '统计报表', 'TJBBMENU', 'menu', 1301, 3, '/demo/tjList', null, null, 815, to_date('11-05-2018 14:08:47', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:51:14', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1301, 1306, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1309, '分步表单页面', 'FBBDPAGE', 'page', 1308, 1, '/demo/fbbd', null, null, 815, to_date('11-05-2018 14:10:21', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:51:44', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1308, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1311, '导航列表页面', 'DHLBPAGE', 'page', 1310, 1, '/demo/dhList', null, null, 815, to_date('11-05-2018 14:11:57', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 09:34:02', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1310, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1345, '用户案例（卡片列表）', 'zjgridal', 'menu', 1344, 4, '/demo/gridCmptDemo', null, null, 815, to_date('29-05-2018 16:42:12', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 10:31:21', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1344, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2971, '表单列表', 'formList', 'page', 2970, 1, '/form/formdesignList', null, null, 815, to_date('09-08-2018 15:13:22', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 15:13:22', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2970, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3013, '报表管理', 'reportFormList', 'menu', 2985, 4, '/report/sysReportFormList', null, null, 815, to_date('23-08-2018 11:22:05', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 11:22:05', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2985, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2842, '删除资源', 'DEL_RESOURCE', 'func', 108, 3, '/resource/delResource', null, null, 815, to_date('06-07-2018 08:53:25', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 08:53:25', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 108, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1349, '组织案例（关系表单）', 'zhzjal', 'menu', 1344, 3, '/demo/cmptDemoOrganList', null, null, 815, to_date('29-05-2018 16:45:02', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 10:31:45', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1344, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2848, '删除消息类型', 'DEL_MSGTYPE', 'func', 110, 3, '/messageType/deleteMessageType', null, null, 815, to_date('06-07-2018 09:09:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 09:09:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 110, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3034, '流程测试页面01', 'wfcs01', 'page', null, 5, '/form/wfFormEdit?formId=61', null, null, 815, to_date('13-09-2018 10:27:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('13-09-2018 10:27:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3049, '测试流程表单v(3)', 'diy_Test_flow_form', 'page', null, null, '/form/formEdit?formId=82', null, null, 815, to_date('18-09-2018 11:25:51', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('18-09-2018 11:25:51', 'dd-mm-yyyy hh24:mi:ss'), null, null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3050, '测试流程表单v(4)', 'diy_Test_flow_form', 'page', null, null, '/form/formEdit?formId=83', null, null, 815, to_date('18-09-2018 11:29:08', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('18-09-2018 11:29:08', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3081, '用户表', 'YouSysUserMenu', 'menu', 43, 1, '/youuser/youSysUserList', null, null, 286, to_date('21-09-2018 14:01:43', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 14:01:43', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 3082, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1362, '用户案例（列表/表单）', 'cmptDemoUserList', 'menu', 1344, 1, '/demo/cmptDemoUserList', null, null, 815, to_date('31-05-2018 09:40:33', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 10:31:03', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1344, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3082, '用户表页面', 'YouSysUserPage', 'page', 3081, 1, '/youuser/youSysUserList', null, null, 286, to_date('21-09-2018 14:01:43', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 14:01:43', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 3081, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3129, '测试表单0927v(2)', 'diy_test_form_09272', 'page', null, null, '/form/formEdit?formId=141', null, null, 815, to_date('29-09-2018 15:51:46', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('29-09-2018 15:51:46', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 141);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3130, '请假表单v(1)', 'diy_leave_form1', 'page', null, null, '/form/formEdit?formId=142', null, null, 815, to_date('29-09-2018 16:19:17', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('29-09-2018 16:19:17', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 142);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3153, '个人附加信息v(1)', 'diy_personal_addition1', 'page', null, null, '/form/formEdit?formId=168', null, null, 815, to_date('22-10-2018 16:02:09', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 16:02:09', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 168);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3154, '个人信息1022v(2)', 'diy_kmno10222', 'page', null, null, '/form/formEdit?formId=170', null, null, 815, to_date('22-10-2018 16:12:02', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 16:12:02', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 170);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3155, '新建表单v(1)', 'diy_s88kd1', 'page', null, null, '/form/formEdit?formId=171', null, null, 815, to_date('22-10-2018 16:18:14', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 16:18:14', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 171);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3156, '个人基本信息v(1)', 'diy_personal_basic_in1', 'page', null, null, '/form/formEdit?formId=172', null, null, 815, to_date('22-10-2018 16:45:54', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 16:45:54', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 172);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3157, '确认v(1)', 'diy_confirm1', 'page', null, null, '/form/formEdit?formId=174', null, null, 815, to_date('22-10-2018 16:48:38', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 16:48:38', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 174);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3158, '附加信息v(1)', 'diy_addition_inform21', 'page', null, null, '/form/formEdit?formId=173', null, null, 815, to_date('22-10-2018 16:48:40', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 16:48:40', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 173);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3160, '测试hide1v(1)', 'diy_test_hide_One1', 'page', null, null, '/form/formEdit?formId=176', null, null, 815, to_date('23-10-2018 09:10:17', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-10-2018 09:10:17', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 176);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3163, '新建表单v(1)', 'diy_ibbXN1', 'page', null, null, '/form/formEdit?formId=180', null, null, 815, to_date('31-10-2018 11:53:25', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('31-10-2018 11:53:25', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 180);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3164, 'JUSTv(1)', 'diy_just1', 'page', null, null, '/form/formEdit?formId=181', null, null, 815, to_date('31-10-2018 17:26:47', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('31-10-2018 17:26:47', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 181);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3168, '待办工作', 'DBGZ', 'menu', 3167, 1, null, null, null, 815, to_date('08-11-2018 10:16:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:16:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3170, '地图定位', 'DTDW', 'menu', 3167, 3, null, null, null, 815, to_date('08-11-2018 10:17:25', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:17:25', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3172, '施工日志', 'SSRZ', 'menu', 3167, 5, null, null, null, 815, to_date('08-11-2018 10:17:44', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:17:44', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3174, '个人中心', 'GRZX', 'menu', 3167, 7, null, null, null, 815, to_date('08-11-2018 10:18:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:18:03', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (44, '组织管理', 'ZZJG', 'menu', 201, 1, null, '&#xe61a;', null, 286, to_date('23-10-2017 11:20:20', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('04-07-2018 14:50:14', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (46, '流程管理', 'LCGL', 'menu', 201, 3, null, '&#xe633;', null, 286, to_date('23-10-2017 11:21:09', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('04-07-2018 14:50:39', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (47, '案例', 'AL', 'menu', 241, 3, null, '&#xe721;', null, 286, to_date('23-10-2017 11:21:26', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('10-01-2018 18:07:35', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 241, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (49, '机构管理', 'JGGL', 'menu', 44, 2, '/organ/sysOrganList', null, null, 286, to_date('23-10-2017 11:23:22', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-01-2018 19:48:35', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 44, 103, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (50, '用户管理', 'YHGL', 'menu', 44, 1, '/user/sysUserList', null, null, 286, to_date('23-10-2017 11:24:17', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-10-2017 11:24:17', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 44, 105, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (241, '后台管理', 'HTGL', 'app', null, 1, null, null, null, 286, to_date('26-10-2017 19:12:48', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('26-10-2017 19:12:48', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (52, '字典管理', 'ZDGL', 'menu', 2825, 1, '/dict/sysDictList', '&#xe602;', null, 286, to_date('23-10-2017 11:26:02', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-01-2018 09:27:23', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2825, 111, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (53, '配置管理', 'PZGL', 'menu', 2825, 2, '/config/configTypeShow', '&#xe607;', null, 286, to_date('23-10-2017 11:26:22', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('12-01-2018 10:24:31', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2825, 112, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (54, '消息管理', 'XXGL', 'menu', 2825, 3, '/message/messageTypeList', '&#xe611;', null, 286, to_date('23-10-2017 11:26:41', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-01-2018 09:27:46', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2825, 110, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (55, '权限管理', 'QXGL', 'menu', 201, 2, null, '&#xe61d;', null, 286, to_date('23-10-2017 11:27:16', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 16:54:15', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (101, '操作日志页面', 'CZRZYM', 'page', 63, null, '/log/operateLogList', null, null, 286, to_date('24-10-2017 08:39:51', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 14:20:28', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 63, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (102, '资源管理', 'ZYGL', 'menu', 55, 2, '/resource/resourceList', '&#xe60e;', null, 286, to_date('24-10-2017 08:41:23', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-01-2018 09:25:30', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 55, 108, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (362, '字典修改', 'EDIT_DICT', 'func', 111, 2, '/dict/sysDictEdit', null, null, 286, to_date('01-11-2017 11:45:27', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 11:51:09', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 111, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (159, '规则管理页面', 'ruleList', 'page', 65, 2, '/rule/ruleList', null, null, 1, to_date('05-06-2017 12:00:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-06-2018 16:33:22', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 65, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (381, '首页', 'index', 'menu', 241, 1, '/main/center.html', '&#xe608;', null, 286, to_date('02-11-2017 16:21:22', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('10-01-2018 18:06:19', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 241, 382, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (103, '机构管理页面', 'JGGLYM', 'page', 49, 1, '/organ/sysOrganList', null, null, 286, to_date('24-10-2017 08:42:24', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('05-07-2018 11:34:47', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 49, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (105, '用户管理页面', 'YHGLYM', 'page', 50, 1, '/user/sysUserList', null, null, 286, to_date('24-10-2017 08:44:03', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('05-07-2018 11:31:40', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 50, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (107, '工作流设计', 'GZLSJ', 'page', 57, null, '/workflow/design/flow', null, null, 286, to_date('24-10-2017 08:46:52', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-06-2018 11:45:51', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 57, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (108, '资源管理页面', 'ZYGLYM', 'page', 102, null, '/resource/resourceList', null, null, 286, to_date('24-10-2017 08:47:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 12:01:28', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 102, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (201, '基础管理', 'JCGL', 'menu', 241, 2, null, '&#xe624;', null, 286, to_date('26-10-2017 10:10:35', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('10-01-2018 18:07:46', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 241, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (62, '登录日志', 'DLRZ', 'menu', 61, 2, '/log/loginLogList', null, null, 286, to_date('23-10-2017 11:32:33', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-10-2017 11:32:33', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 61, 141, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (63, '操作日志', 'CZRZ', 'menu', 61, 3, '/log/operateLogList', null, null, 286, to_date('23-10-2017 11:33:03', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-10-2017 11:33:03', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 61, 101, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (109, '角色管理页面', 'JSGLYM', 'page', 2824, 1, '/role/roleList', null, null, 286, to_date('24-10-2017 09:28:21', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('24-10-2017 09:28:21', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2824, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (110, '消息管理页面', 'XXGLYM', 'page', 54, null, '/message/messageTypeList', null, null, 286, to_date('24-10-2017 09:29:11', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('24-10-2017 09:29:11', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 54, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (111, '字典管理页面', 'ZDGLYM', 'page', 52, null, '/dict/sysDictList', null, null, 286, to_date('24-10-2017 09:30:18', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('05-07-2018 21:07:30', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 52, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (112, '配置管理页面', 'PZGLYM', 'page', 53, null, '/config/configTypeShow', null, null, 286, to_date('24-10-2017 09:31:14', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('24-10-2017 09:31:14', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 53, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (401, '新增规则', 'ADDRULE', 'func', 159, 1, '/rule/authRuleAdd', null, null, 286, to_date('06-11-2017 09:21:49', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 15:07:26', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 159, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (402, '修改规则', 'EDITRULE', 'func', 159, 2, '/rule/authRuleEdit', null, null, 286, to_date('06-11-2017 09:22:15', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-11-2017 09:22:15', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 159, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (403, '删除规则', 'DELRULE', 'func', 159, 3, '/rule/delAuthRule', null, null, 286, to_date('06-11-2017 09:22:51', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-11-2017 09:22:51', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 159, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2974, '活动环节表', 'SysActivityNodeMenu', 'menu', 43, 1, '/activity/sysActivityNodeList', null, null, 286, to_date('15-08-2018 15:07:05', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('15-08-2018 15:07:05', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2975, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2975, '活动环节表页面', 'SysActivityNodePage', 'page', 2974, 1, '/activity/sysActivityNodeList', null, null, 286, to_date('15-08-2018 15:07:05', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('15-08-2018 15:07:05', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2974, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2912, '用户权限管理列表', 'YHQXGL_LB', 'page', 2911, 1, '/role/userAuthorityList', null, null, 815, to_date('23-07-2018 16:25:26', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-07-2018 16:25:26', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2911, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (57, '流程设计(旧版)', 'LCSJ', 'menu', 46, 2, '/workflow/design/flow', null, null, 286, to_date('23-10-2017 11:29:13', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-09-2018 10:54:58', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 46, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (58, '流程测试', 'LCCS', 'menu', 46, 1, '/workflow/test/teacherList', null, null, 286, to_date('23-10-2017 11:29:34', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('04-07-2018 09:36:03', 'dd-mm-yyyy hh24:mi:ss'), '0', '流程测试', 'menu', 46, 121, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2976, '业务知识', 'YwzsMenu', 'menu', 43, 1, '/mh/ywzsList', null, null, 286, to_date('17-08-2018 11:23:25', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-08-2018 11:23:25', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2977, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2977, '业务知识页面', 'YwzsPage', 'page', 2976, 1, '/mh/ywzsList', null, null, 286, to_date('17-08-2018 11:23:25', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-08-2018 11:23:25', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2976, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (61, '运行监控', 'YXJK', 'menu', 201, 5, null, '&#xe605;', null, 286, to_date('23-10-2017 11:31:25', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('10-01-2018 18:07:13', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (141, '登录日志页面', 'DLRZYM', 'page', 62, 1, '/log/loginLogList', null, null, 286, to_date('25-10-2017 14:18:30', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 14:19:26', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 62, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (321, '数据监控', 'xtjk', 'menu', 61, 4, '/druid', null, null, 286, to_date('27-10-2017 16:21:24', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('27-10-2017 16:21:24', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 61, 322, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (322, '数据监控页面', 'sjjkym', 'page', 321, 1, '/druid', null, null, 286, to_date('27-10-2017 16:22:42', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('27-10-2017 16:22:42', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 321, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (382, '门户页面', 'MHYM', 'page', 381, 1, '/main/center.html', null, null, 286, to_date('02-11-2017 16:22:30', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('02-11-2017 16:24:33', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 381, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2826, '新增用户', 'ADD_USER', 'func', 105, 1, '/user/sysUserAdd', null, null, 815, to_date('04-07-2018 16:54:12', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 12:01:18', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 105, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2829, '修改用户', 'EDIT_USER', 'func', 105, 2, '/user/sysUserEdit', null, null, 815, to_date('04-07-2018 19:42:47', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 18:14:53', 'dd-mm-yyyy hh24:mi:ss'), '1', '修改用户', 'page', 105, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2981, '测试资源添加', 'testsaaA', 'menu', 2969, 2, '/form/ckFormData?formId=89', null, null, 815, to_date('17-08-2018 14:50:23', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-09-2018 16:42:09', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2969, 2982, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2996, '流程设计器', 'LCSJQ', 'page', 3011, 1, '/workflow/ibps/designer', null, null, 815, to_date('21-08-2018 17:27:09', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-09-2018 08:20:41', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3011, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (121, '工作流测试页面', 'GZLCSYM', 'page', 58, 1, '/workflow/test/teacherList', null, null, 286, to_date('24-10-2017 17:58:54', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('07-09-2018 09:29:00', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 58, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (65, '规则管理', 'GZGL', 'menu', 55, 3, '/rule/ruleList', '&#xe616;', null, 286, null, 286, to_date('11-01-2018 09:29:01', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 55, 159, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (145, '员工请假单', 'JSCD', 'page', 58, 2, '/workflow/test/teacherEdit', null, null, 286, null, 815, to_date('14-09-2018 17:57:18', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 58, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (361, '新增字典', 'ADD_DICT', 'func', 111, 1, '/dict/sysDictAdd', null, null, 286, to_date('01-11-2017 11:32:28', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 11:50:57', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 111, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (363, '删除字典', 'DEL_DICT', 'func', 111, 3, '/dict/deleteDict', null, null, 286, to_date('01-11-2017 11:53:51', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('04-07-2018 20:28:58', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 111, null, null);
commit;
prompt 100 records committed...
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2832, '新增机构', 'ADD_ORGAN', 'func', 103, 1, '/organ/sysOrganAdd', null, null, 815, to_date('04-07-2018 19:49:47', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 11:50:33', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 103, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2834, '删除机构', 'DEL_ORGAN', 'func', 103, 3, '/organ/deleteOrgan', null, null, 815, to_date('04-07-2018 19:50:14', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 18:16:48', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 103, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3009, '机构', 'SysOrganMenu', 'menu', 43, 1, '/organ/sysOrganList', null, null, 286, to_date('22-08-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('22-08-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 43, 3010, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3010, '机构页面', 'SysOrganPage', 'page', 3009, 1, '/organ/sysOrganList', null, null, 286, to_date('22-08-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('22-08-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3009, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3011, '流程设计', 'LCSJLIST', 'menu', 46, 4, '/workflow/ibps/flowDefList', null, null, 815, to_date('23-08-2018 11:13:27', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-09-2018 10:55:10', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 46, 3012, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3014, '测试111', 'xsdwdq', 'menu', 2969, 3, null, null, null, 815, to_date('23-08-2018 15:11:01', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 15:11:01', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2969, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3031, 'dd', 'dd', 'app', null, 2, null, null, null, 815, to_date('06-09-2018 15:10:29', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-09-2018 15:10:29', 'dd-mm-yyyy hh24:mi:ss'), '0', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3033, 'dqdqd', 'dwfqdfqf', 'page', null, 4, null, null, null, 815, to_date('07-09-2018 10:21:38', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('07-09-2018 10:21:38', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3053, '流程列表测试', 'testflowlistpage', 'page', 3052, 1, '/form/wfFormList?flowCode=testflow0919', null, null, 815, to_date('18-09-2018 17:06:04', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-09-2018 17:39:20', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3052, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3056, '用户案例（本地数据）', 'dataGridCmptDemo', 'menu', 1344, 5, '/demo/dataGridCmptDemo', null, null, 815, to_date('20-09-2018 09:24:59', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-09-2018 09:24:59', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1344, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3073, '用户表', 'SysUserMenu', 'menu', 43, 1, '/user/sysUserList', null, null, 286, to_date('21-09-2018 10:16:09', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 10:16:09', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 3074, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3074, '用户表页面', 'SysUserPage', 'page', 3073, 1, '/user/sysUserList', null, null, 286, to_date('21-09-2018 10:16:09', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 10:16:09', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 3073, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1302, '门户页面', 'MHPAGE', 'page', 1303, 1, '/demo/mh', null, null, 815, to_date('11-05-2018 14:05:16', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:50:15', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1303, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1305, '卡片列表页面', 'KPLBPAGE', 'page', 1304, 1, '/demo/cardList', null, null, 815, to_date('11-05-2018 14:07:28', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:50:46', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1304, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1306, '统计报表页面', 'TJBBPAGE', 'page', 1307, 1, '/demo/tjList', null, null, 815, to_date('11-05-2018 14:08:15', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:51:06', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1307, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3079, '用户表', 'MySysUserMenu', 'menu', 43, 1, '/myuser/mySysUserList', null, null, 286, to_date('21-09-2018 11:58:18', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 11:58:18', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 3080, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3080, '用户表页面', 'MySysUserPage', 'page', 3079, 1, '/myuser/mySysUserList', null, null, 286, to_date('21-09-2018 11:58:18', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 11:58:18', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 3079, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (43, '代码生成', 'AUTOCODE', 'menu', 47, 3, null, null, null, 286, to_date('12-04-2018 16:13:32', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 09:33:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 47, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1308, '分步表单', 'FBBDMENU', 'menu', 1301, 4, '/demo/fbbd', null, null, 815, to_date('11-05-2018 14:09:47', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('11-05-2018 14:51:56', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1301, 1309, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1310, '导航列表', 'DHLB', 'menu', 1301, 5, '/demo/dhList', null, null, 815, to_date('11-05-2018 14:11:35', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 09:36:45', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1301, 1311, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3109, '统计报表（多行表头）', 'statisticDataList', 'menu', 1344, 6, '/demo/statisticDataList', null, null, 815, to_date('26-09-2018 16:43:20', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-09-2018 16:43:20', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1344, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3150, '新建表单111v(1)', 'diy_Newly_build_form_1', 'page', null, null, '/form/formEdit?formId=162', null, null, 815, to_date('19-10-2018 09:20:38', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-10-2018 09:20:38', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 162);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3152, '个人信息1022v(1)', 'diy_kmno10221', 'page', null, null, '/form/formEdit?formId=167', null, null, 815, to_date('22-10-2018 15:12:34', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 15:12:34', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 167);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3165, '1', '1', 'menu', 3031, 1, null, null, null, 815, to_date('06-11-2018 17:53:31', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-11-2018 17:53:31', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'app', 3031, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1344, '开发案例', 'newrxal', 'menu', 47, 1, null, '&#xe7cf;', null, 815, to_date('29-05-2018 16:40:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 09:50:21', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 47, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3167, 'app', 'app', 'app', null, 6, null, null, null, 815, to_date('08-11-2018 10:15:44', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:15:44', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1365, '配置案例（模板开发）', 'pzaljc', 'menu', 1344, 2, '/demo/cmptConfigTypeShow', null, null, 286, to_date('06-06-2018 17:58:07', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 10:30:09', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1344, 2827, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1368, '数据权限管理', 'sjqxgl', 'menu', 55, 4, '/auth/dataAuthList', '&#xe60e;', null, 286, to_date('11-06-2018 14:45:49', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('21-06-2018 16:22:31', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 55, 1369, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (1369, '数据权限', 'sjqx', 'page', 1368, 11, '/auth/dataAuthList', null, null, 286, to_date('11-06-2018 14:48:54', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-06-2018 14:50:32', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1368, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2824, '角色管理', 'JSGL', 'menu', 55, 1, '/role/roleList', null, null, 815, to_date('04-07-2018 14:44:51', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('04-07-2018 14:45:04', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 55, 109, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2844, '删除数据权限', 'DEL_DATAAUTH', 'func', 1369, 2, '/auth/delDataAuth', null, null, 815, to_date('06-07-2018 08:55:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 08:55:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 1369, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2964, '员工信息管理', 'YgxxglMenu', 'menu', 43, 1, '/xtgl/ygxxglList', null, null, 286, to_date('30-07-2018 19:06:17', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('30-07-2018 19:06:17', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2965, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2965, '员工信息管理页面', 'YgxxglPage', 'page', 2964, 1, '/xtgl/ygxxglList', null, null, 286, to_date('30-07-2018 19:06:17', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('30-07-2018 19:06:17', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2964, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2978, '简单报表Demo', 'easyReportDemo', 'menu', 2985, 2, '/report/reportFormView', null, null, 815, to_date('17-08-2018 11:31:11', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('17-08-2018 11:31:11', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2985, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2979, '示例组织', 'MhorganMenu', 'menu', 43, 1, '/kk/mhorganList', null, null, 286, to_date('17-08-2018 11:41:30', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-08-2018 11:41:30', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2980, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2980, '示例组织页面', 'MhorganPage', 'page', 2979, 1, '/kk/mhorganList', null, null, 286, to_date('17-08-2018 11:41:30', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-08-2018 11:41:30', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2979, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3012, '流程设计列表页面', 'LCSJLISTPAGE', 'page', 3011, 2, '/workflow/ibps/flowDefList', null, null, 815, to_date('23-08-2018 11:14:25', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 11:14:25', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3011, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3015, '测试111', 'sdewfewf', 'menu', 201, 7, null, null, null, 815, to_date('23-08-2018 15:24:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 15:24:48', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2911, '用户权限管理', 'YHQXGL', 'menu', 55, 5, '/role/userAuthorityList', null, null, 815, to_date('23-07-2018 16:24:38', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-07-2018 16:25:46', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 55, 2912, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3016, 'xcwqcwcq', 'cqcqfcqf', 'menu', 2969, 3, null, null, null, 815, to_date('23-08-2018 15:44:34', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 15:44:34', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2969, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3069, '配置表', 'SysConfigMenu', 'menu', 43, 1, '/config/sysConfigList', null, null, 286, to_date('21-09-2018 09:45:03', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 09:45:03', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 3070, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3070, '配置表页面', 'SysConfigPage', 'page', 3069, 1, '/config/sysConfigList', null, null, 286, to_date('21-09-2018 09:45:04', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 09:45:04', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 3069, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3093, '用户表', 'YourSysUserMenu', 'menu', 43, 1, '/youruser/yourSysUserList', null, null, 286, to_date('21-09-2018 16:03:07', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:03:07', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 43, 3094, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3094, '用户表页面', 'YourSysUserPage', 'page', 3093, 1, '/youruser/yourSysUserList', null, null, 286, to_date('21-09-2018 16:03:07', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:03:07', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3093, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3097, '示例组织', 'MhorganMenu', 'menu', 43, 1, '/kk/mhorganList', null, null, 286, to_date('21-09-2018 16:09:55', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:09:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 43, 3098, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3098, '示例组织页面', 'MhorganPage', 'page', 3097, 1, '/kk/mhorganList', null, null, 286, to_date('21-09-2018 16:09:55', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:09:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3097, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3110, '测试表单0927v(1)', 'diy_test_form_09271', 'page', null, null, '/form/formEdit?formId=121', null, null, 815, to_date('27-09-2018 10:31:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('27-09-2018 10:31:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 121);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3111, '流程测试', 'test111', 'menu', 46, 3, '/form/wfFormList?flowCode=testflow0927', null, null, 815, to_date('27-09-2018 10:34:20', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-11-2018 09:51:02', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 46, 3112, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3161, '桥梁采集任务v(1)', 'diy_bridge_collecti_t1', 'page', null, null, '/form/formEdit?formId=177', null, null, 815, to_date('30-10-2018 10:57:55', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-10-2018 10:57:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 177);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3162, '测试数字1v(1)', 'diy_test_number_One1', 'page', null, null, '/form/formEdit?formId=179', null, null, 815, to_date('30-10-2018 15:24:24', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-10-2018 15:24:24', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 179);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3171, '视频监控', 'SPJK', 'menu', 3167, 4, null, null, null, 815, to_date('08-11-2018 10:17:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:17:35', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3175, '任务管理', 'RWGL', 'menu', 3167, 8, null, null, null, 815, to_date('08-11-2018 10:18:11', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:18:11', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2827, '配置类型展示页面', 'pzlxzsPage', 'page', 1365, 1, '/demo/cmptConfigTypeShow', null, null, 815, to_date('04-07-2018 17:14:32', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('06-07-2018 10:26:13', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 1365, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2839, '新增角色', 'ADD_ROLE', 'func', 109, 1, '/role/roleAdd', null, null, 815, to_date('06-07-2018 08:49:10', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 15:07:04', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 109, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2841, '修改资源', 'EDIT_RESOURCE', 'func', 108, 2, '/resource/resourceEdit', null, null, 815, to_date('06-07-2018 08:52:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 08:52:37', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 108, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2825, '通用管理', 'TYGL', 'menu', 201, 4, null, '&#xe616;', null, 815, to_date('04-07-2018 14:48:45', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('04-07-2018 14:53:21', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 201, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2843, '新增数据权限', 'ADD_DATAAUTH', 'func', 1369, 1, '/auth/dataAuthEdit', null, null, 815, to_date('06-07-2018 08:54:54', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 08:54:54', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 1369, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2845, '批量删除', 'BACTHDELDA', 'func', 1369, 3, '/auth/batchDelSel', null, null, 815, to_date('06-07-2018 08:56:34', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 08:56:34', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 1369, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2846, '新增消息类型', 'ADD_MSGTYPE', 'func', 110, 1, '/message/messageTypeAdd', null, null, 815, to_date('06-07-2018 09:08:14', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-07-2018 15:07:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 110, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2847, '修改消息类型', 'EDIT_MSGTYPE', 'func', 110, 2, '/message/messageTypeEdit', null, null, 815, to_date('06-07-2018 09:09:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 09:09:03', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 110, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2849, '发送消息', 'SENDMSG', 'func', 110, 4, '/message/messageEdit', null, null, 815, to_date('06-07-2018 09:10:08', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('06-07-2018 09:10:08', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'page', 110, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2970, '表单管理', 'formcontrol', 'menu', 2969, 1, '/form/formdesignList', null, null, 815, to_date('09-08-2018 15:12:36', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 15:15:30', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2969, 2971, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2983, '元数据管理', 'SysMetaDataMenu', 'menu', 2985, 1, '/report/sysMetaDataList', null, null, 286, to_date('20-08-2018 09:16:01', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-08-2018 09:26:43', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2985, 2984, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2984, '元数据列表页面', 'SysMetaDataPage', 'page', 2983, 1, '/report/sysMetaDataList', null, null, 286, to_date('20-08-2018 09:16:01', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-08-2018 09:26:55', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2983, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2986, '报表设计器', 'reportFormEdit', 'menu', 2985, 3, '/report/reportFormEdit', null, null, 815, to_date('21-08-2018 11:55:24', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('21-08-2018 13:52:23', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2985, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2987, '报表', 'SysReportFormMenu', 'menu', 43, 1, '/report/sysReportFormList', null, null, 286, to_date('21-08-2018 14:03:03', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:03:03', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 43, 2988, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2988, '报表页面', 'SysReportFormPage', 'page', 2987, 1, '/report/sysReportFormList', null, null, 286, to_date('21-08-2018 14:03:03', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:03:03', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2987, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2989, '报表字段', 'SysReportPropertyMenu', 'menu', 43, 1, '/report/sysReportPropertyList', null, null, 286, to_date('21-08-2018 14:04:33', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:04:33', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2990, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2990, '报表字段页面', 'SysReportPropertyPage', 'page', 2989, 1, '/report/sysReportPropertyList', null, null, 286, to_date('21-08-2018 14:04:33', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:04:33', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2989, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2991, '报表配置', 'SysReportSettingMenu', 'menu', 43, 1, '/report/sysReportSettingList', null, null, 286, to_date('21-08-2018 14:04:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:04:49', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2992, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2992, '报表配置页面', 'SysReportSettingPage', 'page', 2991, 1, '/report/sysReportSettingList', null, null, 286, to_date('21-08-2018 14:04:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:04:49', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2991, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2993, '报表关联', 'SysGlbReportFormMenu', 'menu', 43, 1, '/glb/sysGlbReportFormList', null, null, 286, to_date('21-08-2018 14:05:06', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:05:06', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 2994, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2994, '报表关联页面', 'SysGlbReportFormPage', 'page', 2993, 1, '/glb/sysGlbReportFormList', null, null, 286, to_date('21-08-2018 14:05:06', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 14:05:06', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 2993, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (2995, '流程设计(新)', 'LCSJNEW', 'menu', 46, 4, '/workflow/ibps/designer', null, null, 815, to_date('21-08-2018 17:26:31', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-08-2018 17:43:26', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 46, 2996, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3051, '测试流程表单v(1)', 'diy_test_Technologica', 'page', null, null, '/form/formEdit?formId=85', null, null, 815, to_date('18-09-2018 15:25:05', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('18-09-2018 15:25:05', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 85);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3052, '流程列表测试', 'testflowlist', 'menu', 2969, 3, '/form/wfFormList?flowCode=testflow0919', null, null, 815, to_date('18-09-2018 17:05:09', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('18-09-2018 17:29:22', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 2969, 3053, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3054, '流程测试0919v(1)', 'diy_Technological_pro', 'page', null, null, '/form/formEdit?formId=86', null, null, 815, to_date('19-09-2018 11:01:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-09-2018 11:01:48', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 86);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3055, '流程测试0919v(2)', 'diy_Technological_pro', 'page', null, null, '/form/formEdit?formId=87', null, null, 815, to_date('19-09-2018 11:12:46', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('19-09-2018 11:12:46', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 87);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3057, '测试搜索区v(1)', 'diy_test_search_area', 'page', null, null, '/form/formEdit?formId=88', null, null, 815, to_date('20-09-2018 10:05:23', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-09-2018 10:05:23', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 88);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3058, '测试搜索区v(2)', 'diy_test_search_area', 'page', null, null, '/form/formEdit?formId=89', null, null, 815, to_date('20-09-2018 10:18:19', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-09-2018 10:18:19', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 89);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3071, '测试搜索区1v(3)', 'diy_test_search_area3', 'page', null, null, '/form/formEdit?formId=104', null, null, 815, to_date('21-09-2018 10:02:33', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('21-09-2018 10:02:33', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 104);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3072, '测试搜索区1v(4)', 'diy_test_search_area4', 'page', null, null, '/form/formEdit?formId=105', null, null, 815, to_date('21-09-2018 10:04:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('21-09-2018 10:04:48', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 105);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3075, '用户表', 'MySysUserMenu', 'menu', 43, 1, '/myuser/mySysUserList', null, null, 286, to_date('21-09-2018 10:22:51', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 10:22:51', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 3076, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3076, '用户表页面', 'MySysUserPage', 'page', 3075, 1, '/myuser/mySysUserList', null, null, 286, to_date('21-09-2018 10:22:51', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 10:22:51', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 3075, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3077, '用户表', 'YouSysUserMenu', 'menu', 43, 1, '/youuser/youSysUserList', null, null, 286, to_date('21-09-2018 11:07:28', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 11:07:28', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 43, 3078, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3078, '用户表页面', 'YouSysUserPage', 'page', 3077, 1, '/youuser/youSysUserList', null, null, 286, to_date('21-09-2018 11:07:28', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 11:07:28', 'dd-mm-yyyy hh24:mi:ss'), '0', null, 'menu', 3077, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3089, '用户信息', 'MySysUserMenu', 'menu', 43, 1, '/myuser/mySysUserList', null, null, 286, to_date('21-09-2018 15:53:25', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 15:53:25', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 43, 3090, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3090, '用户信息页面', 'MySysUserPage', 'page', 3089, 1, '/myuser/mySysUserList', null, null, 286, to_date('21-09-2018 15:53:26', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 15:53:26', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3089, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3091, '用户表', 'SysUserMenu', 'menu', 43, 1, '/user/sysUserList', null, null, 286, to_date('21-09-2018 16:00:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:00:49', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 43, 3092, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3092, '用户表页面', 'SysUserPage', 'page', 3091, 1, '/user/sysUserList', null, null, 286, to_date('21-09-2018 16:00:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('21-09-2018 16:00:49', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'menu', 3091, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3149, '新建表单v(1)', 'diy_o5Rk71', 'page', null, null, '/form/formEdit?formId=161', null, null, 815, to_date('15-10-2018 15:22:40', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('15-10-2018 15:22:40', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 161);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3159, '确认v(2)', 'diy_confirm2', 'page', null, null, '/form/formEdit?formId=175', null, null, 815, to_date('22-10-2018 17:21:16', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('22-10-2018 17:21:16', 'dd-mm-yyyy hh24:mi:ss'), '1', null, null, null, null, 175);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3166, 'app', 'app', 'menu', null, 6, null, null, null, 815, to_date('08-11-2018 10:14:22', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:14:22', 'dd-mm-yyyy hh24:mi:ss'), '0', null, null, null, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3169, '数据统计', 'SJTJ', 'menu', 3167, 2, null, null, null, 815, to_date('08-11-2018 10:17:11', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:17:11', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
insert into SYS_RESOURCE (id, name, code, type, parent_id, sort, url, icon, biz_type, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, description, parent_type, show_parent_id, target_id, form_id)
values (3173, '岗前培训', 'GQPX', 'menu', 3167, 6, null, null, null, 815, to_date('08-11-2018 10:17:54', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('08-11-2018 10:17:54', 'dd-mm-yyyy hh24:mi:ss'), '1', null, 'app', 3167, null, null);
commit;
prompt 195 records loaded
prompt Loading SYS_ROLE...
insert into SYS_ROLE (id, role_name, role_code, role_type, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, auth_type, levels, role_made, is_combine, create_role_id)
values (274, '平台管理员', 'platadmin', '1', '平台管理员，系统顶级管理员。', 286, to_date('20-10-2017 14:10:05', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 14:46:15', 'dd-mm-yyyy hh24:mi:ss'), '3', null, '1', '1', '0', null);
insert into SYS_ROLE (id, role_name, role_code, role_type, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, auth_type, levels, role_made, is_combine, create_role_id)
values (32, '后台管理员', 'sysadmin', '1', null, 1, to_date('05-06-2017 14:32:27', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-08-2018 19:31:47', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '2', '1', '0', 274);
insert into SYS_ROLE (id, role_name, role_code, role_type, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, auth_type, levels, role_made, is_combine, create_role_id)
values (3, '流程启动人', 'LCQDR_DT', '2', '11', 1, to_date('05-06-2017 10:37:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('18-07-2018 10:32:04', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '3', '2', '0', null);
insert into SYS_ROLE (id, role_name, role_code, role_type, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, auth_type, levels, role_made, is_combine, create_role_id)
values (2845, '默认角色', 'DEFAULT_ROLE', '1', null, 815, to_date('24-07-2018 16:06:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('24-07-2018 16:06:35', 'dd-mm-yyyy hh24:mi:ss'), '1', null, '3', '1', '0', null);
commit;
prompt 4 records loaded
prompt Loading SYS_SUBDICT...
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7024, 'WORKFLOWSTATUS', '0', '草稿', 2, null, null, null, 815, to_date('29-09-2018 14:57:58', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-10-2018 17:39:38', 'dd-mm-yyyy hh24:mi:ss'), '1', 6050);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7025, 'WORKFLOWSTATUS', '1', '启用', 1, null, null, null, 815, to_date('29-09-2018 14:57:58', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-10-2018 17:39:38', 'dd-mm-yyyy hh24:mi:ss'), '1', 6050);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7026, 'WORKFLOWSTATUS', '2', '未启用', 3, null, null, null, 815, to_date('29-09-2018 14:57:58', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('12-10-2018 17:39:38', 'dd-mm-yyyy hh24:mi:ss'), '1', 6050);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1685, 'QJLCZT', 'QJLCZT_2', '组长审批', 2, null, 'BLFS', null, 286, to_date('23-02-2018 16:58:02', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-02-2018 16:58:02', 'dd-mm-yyyy hh24:mi:ss'), '1', 1310);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1686, 'QJLCZT', 'QJLCZT_3', '经理审批', 3, null, 'BLFS', null, 286, to_date('23-02-2018 16:58:02', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-02-2018 16:58:02', 'dd-mm-yyyy hh24:mi:ss'), '1', 1310);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1264, 'XXJJCD', '1', '普通', 1, null, null, null, 286, to_date('18-10-2017 15:04:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:41:55', 'dd-mm-yyyy hh24:mi:ss'), '1', 1130);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1265, 'XXJJCD', '2', '重要', 2, null, null, null, 286, to_date('18-10-2017 15:04:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:41:55', 'dd-mm-yyyy hh24:mi:ss'), '1', 1130);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1266, 'XXJJCD', '3', '紧急', 3, null, null, null, 286, to_date('18-10-2017 15:04:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:41:55', 'dd-mm-yyyy hh24:mi:ss'), '1', 1130);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1267, 'XXCZLX', '1', '告知型', 1, null, null, null, 286, to_date('18-10-2017 15:07:41', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:50:06', 'dd-mm-yyyy hh24:mi:ss'), '1', 1131);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1268, 'XXCZLX', '2', '操作型', 2, null, null, null, 286, to_date('18-10-2017 15:07:41', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:50:06', 'dd-mm-yyyy hh24:mi:ss'), '1', 1131);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1269, 'XXTZLX', '1', '弹窗', 1, null, null, null, 286, to_date('18-10-2017 15:11:14', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:49:57', 'dd-mm-yyyy hh24:mi:ss'), '1', 1132);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1270, 'XXTZLX', '2', '路径跳转', 2, null, null, null, 286, to_date('18-10-2017 15:11:14', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:49:57', 'dd-mm-yyyy hh24:mi:ss'), '1', 1132);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1271, 'XXTZLX', '3', '无', 3, null, null, null, 286, to_date('18-10-2017 15:11:14', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:49:57', 'dd-mm-yyyy hh24:mi:ss'), '1', 1132);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1272, 'WINSIZE', '1', '大[''900px'', ''600px'']', 1, null, null, '["900px", "600px"]', 286, to_date('18-10-2017 15:39:49', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-06-2018 10:40:06', 'dd-mm-yyyy hh24:mi:ss'), '1', 1133);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1273, 'WINSIZE', '2', '中[''700px'', ''500px'']', 2, null, null, '["700px", "500px"]', 286, to_date('18-10-2017 15:42:07', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-06-2018 10:40:06', 'dd-mm-yyyy hh24:mi:ss'), '1', 1133);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1274, 'WINSIZE', '3', '小[''450px'', ''350px'']', 3, null, null, '["450px", "350px"]', 286, to_date('18-10-2017 15:42:07', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-06-2018 10:40:06', 'dd-mm-yyyy hh24:mi:ss'), '1', 1133);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1275, 'WINSIZE', '4', '树[''400px'', ''600px'']', 4, null, null, '[''400px'', ''600px'']', 286, to_date('18-10-2017 15:42:07', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-06-2018 10:40:06', 'dd-mm-yyyy hh24:mi:ss'), '1', 1133);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1424, 'APPBIZTYPE', 'APPBIZTYPE_1', '工作类', 1, null, null, null, 286, to_date('25-10-2017 18:49:31', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('25-06-2018 11:14:25', 'dd-mm-yyyy hh24:mi:ss'), '1', 1250);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1425, 'APPBIZTYPE', 'APPBIZTYPE_2', '管理类', 2, null, null, null, 286, to_date('25-10-2017 18:49:31', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('25-06-2018 11:14:25', 'dd-mm-yyyy hh24:mi:ss'), '1', 1250);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (225, 'SJQXLX', '2', '机构', 2, null, null, null, 1, to_date('26-09-2017 11:47:33', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('25-06-2018 11:13:20', 'dd-mm-yyyy hh24:mi:ss'), '1', 282);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (226, 'SJQXLX', '3', '全部', 3, null, null, null, 1, to_date('26-09-2017 11:47:33', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('25-06-2018 11:13:20', 'dd-mm-yyyy hh24:mi:ss'), '1', 282);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1444, 'CONFIGTYPE', '6', '缓存配置', 6, '1', 'CONFIGLEVEL', null, 286, to_date('26-10-2017 10:22:32', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1484, 'JSZCLX', '1', '固定用户', 1, null, null, null, 286, to_date('27-11-2017 13:58:06', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-11-2017 11:20:43', 'dd-mm-yyyy hh24:mi:ss'), '1', 1330);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1485, 'JSZCLX', '2', '动态逻辑', 2, null, null, null, 286, to_date('27-11-2017 13:58:06', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('29-11-2017 11:20:43', 'dd-mm-yyyy hh24:mi:ss'), '1', 1330);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (224, 'SJQXLX', '1', '个人', 1, null, null, null, 1, to_date('26-09-2017 11:43:54', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('25-06-2018 11:13:20', 'dd-mm-yyyy hh24:mi:ss'), '1', 282);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (630, 'MZDEMO', 'MZDEMO_1', '汉族', 1, null, null, null, 3, to_date('11-08-2017 19:26:13', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:30', 'dd-mm-yyyy hh24:mi:ss'), '1', 564);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (631, 'MZDEMO', 'MZDEMO_2', '少数', 2, null, null, null, 3, to_date('11-08-2017 19:26:13', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:30', 'dd-mm-yyyy hh24:mi:ss'), '1', 564);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (627, 'HOBBYSDEMO', '1', '篮球', 1, null, null, null, 3, to_date('11-08-2017 19:15:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:53', 'dd-mm-yyyy hh24:mi:ss'), '1', 563);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (628, 'HOBBYSDEMO', '2', '音乐', 2, null, null, null, 3, to_date('11-08-2017 19:15:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:53', 'dd-mm-yyyy hh24:mi:ss'), '1', 563);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (629, 'HOBBYSDEMO', '3', '游戏', 3, null, null, null, 3, to_date('11-08-2017 19:15:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:53', 'dd-mm-yyyy hh24:mi:ss'), '1', 563);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (544, 'CITYDEMO', '1', '芜湖', 1, null, null, null, 3, to_date('25-07-2017 11:07:54', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:46', 'dd-mm-yyyy hh24:mi:ss'), '1', 502);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (545, 'CITYDEMO', '2', '北京', 2, null, null, null, 3, to_date('25-07-2017 11:07:54', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:46', 'dd-mm-yyyy hh24:mi:ss'), '1', 502);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (546, 'CITYDEMO', '3', '上海', 3, null, null, null, 3, to_date('25-07-2017 11:07:54', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:46', 'dd-mm-yyyy hh24:mi:ss'), '1', 502);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (506, 'ZZMMDEMO', '2', '团员', 2, null, 'CESHI', '2', 3, to_date('24-07-2017 14:19:31', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('13-07-2018 08:32:58', 'dd-mm-yyyy hh24:mi:ss'), '1', 463);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (84, 'HQFS', '0', '全部', 1, null, null, null, 1, to_date('01-09-2017 10:41:27', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), '1', 162);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (85, 'HQFS', '1', '比例', 2, null, null, null, 1, to_date('01-09-2017 10:41:27', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), '1', 162);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (86, 'HQFS', '2', '固定', 3, null, null, null, 1, to_date('01-09-2017 10:41:27', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:04', 'dd-mm-yyyy hh24:mi:ss'), '1', 162);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (104, 'BLFS', '0', '抢占式', 1, null, null, null, 1, to_date('01-09-2017 11:10:59', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('27-01-2018 18:05:21', 'dd-mm-yyyy hh24:mi:ss'), '1', 182);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (105, 'BLFS', '1', '会签式', 2, null, null, null, 1, to_date('01-09-2017 11:10:59', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('27-01-2018 18:05:21', 'dd-mm-yyyy hh24:mi:ss'), '1', 182);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3, 'QXLX', '1', '查看权限', 1, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:55:16', 'dd-mm-yyyy hh24:mi:ss'), '1', 41);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (4, 'QXLX', '2', '维护权限', 2, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:55:16', 'dd-mm-yyyy hh24:mi:ss'), '1', 41);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (5, 'ZDLX', '1', '主键字段', 1, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:52:24', 'dd-mm-yyyy hh24:mi:ss'), '1', 43);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (6, 'ZDLX', '2', '普通字段', 2, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:52:24', 'dd-mm-yyyy hh24:mi:ss'), '1', 43);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7, 'ZDLX', '3', '检索字段', 3, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:52:24', 'dd-mm-yyyy hh24:mi:ss'), '1', 43);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (11, 'DICTLX', '1', '平台字典', 1, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 16:39:30', 'dd-mm-yyyy hh24:mi:ss'), '1', 49);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (12, 'DICTLX', '2', '业务字典', 2, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 16:39:30', 'dd-mm-yyyy hh24:mi:ss'), '1', 49);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (13, 'JSLX', '1', '业务角色', 1, '1', null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-07-2018 09:12:39', 'dd-mm-yyyy hh24:mi:ss'), '1', 51);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (14, 'JSLX', '2', '流程角色', 2, '2', null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-07-2018 09:12:39', 'dd-mm-yyyy hh24:mi:ss'), '1', 51);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (22, 'YMLX', '1', '列表', 1, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:55:40', 'dd-mm-yyyy hh24:mi:ss'), '1', 64);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (23, 'YMLX', '2', '表单', 2, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:55:40', 'dd-mm-yyyy hh24:mi:ss'), '1', 64);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (24, 'YMLX', '3', '签章', 3, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:55:40', 'dd-mm-yyyy hh24:mi:ss'), '1', 64);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (25, 'YMLX', '4', '提醒', 4, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:55:40', 'dd-mm-yyyy hh24:mi:ss'), '1', 64);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (26, 'GZLX', '1', '数据权限规则', 1, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:47', 'dd-mm-yyyy hh24:mi:ss'), '1', 68);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (27, 'GZLX2', '2', '动态规则', 2, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:47', 'dd-mm-yyyy hh24:mi:ss'), '1', null);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (28, 'GZSXFS', '1', 'SQL', 1, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), '1', 70);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (29, 'GZSXFS', '2', 'PROCEDURE', 2, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), '1', 70);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (30, 'GZSXFS', '3', 'JAVA', 3, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), '1', 70);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (31, 'GZSXFS', '4', '其他', 4, null, null, null, null, to_date('16-11-2016 15:27:29', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('25-10-2017 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), '1', 70);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (64, 'ZZMMDEMO', '1', '党员', 1, null, 'CESHI', '1', 1, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('13-07-2018 08:32:58', 'dd-mm-yyyy hh24:mi:ss'), '1', 463);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1384, 'CONFIGTYPE', '12', '应用配置2', 12, '2', 'CONFIGLEVEL', null, 286, to_date('25-10-2017 15:42:57', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1290, 'CONFIGTYPE', '4', '工作流配置', 4, '1', 'CONFIGLEVEL', null, 286, to_date('19-10-2017 17:25:45', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1291, 'CONFIGTYPE', '5', '附件配置', 5, '1', 'CONFIGLEVEL', null, 286, to_date('19-10-2017 17:25:45', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1364, 'CONFIGLEVEL', '1', '平台', 1, null, null, null, 286, to_date('25-10-2017 12:32:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-07-2018 10:24:16', 'dd-mm-yyyy hh24:mi:ss'), '1', 1210);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1365, 'CONFIGLEVEL', '2', '应用', 2, null, null, null, 286, to_date('25-10-2017 12:32:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('09-07-2018 10:24:16', 'dd-mm-yyyy hh24:mi:ss'), '1', 1210);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1366, 'CONFIGTYPE', '11', 'FTP配置', 11, '1', 'CONFIGLEVEL', null, 286, to_date('25-10-2017 12:34:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (39, 'TASKSTATUS', '7', '被撤回', 8, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (34, 'TASKSTATUS', '2', '已办', 3, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (33, 'TASKSTATUS', '1', '在办', 2, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (32, 'TASKSTATUS', '0', '待办', 1, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (38, 'TASKSTATUS', '6', '异步终止', 7, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (37, 'TASKSTATUS', '5', '传阅终止', 6, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (36, 'TASKSTATUS', '4', '会签终止', 5, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (35, 'TASKSTATUS', '3', '抢占终止', 4, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (40, 'TASKSTATUS', '8', '被退回', 9, null, null, null, null, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 40);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (46, 'TASKACTION', '6', '转办', 6, null, null, null, 1, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 39);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (45, 'TASKACTION', '5', '撤回', 5, null, null, null, 1, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 39);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (44, 'TASKACTION', '4', '退回', 4, null, null, null, 1, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 39);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (43, 'TASKACTION', '3', '提交', 3, null, null, null, 1, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 39);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (42, 'TASKACTION', '2', '签收', 2, null, null, null, 1, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 39);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (41, 'TASKACTION', '1', '无动作', 1, null, null, null, 1, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('14-08-2017 18:37:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 39);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1284, 'SYSLEVEL', '1', '系统管理员', 1, '1', null, null, 286, to_date('19-10-2017 15:52:26', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-07-2018 09:41:54', 'dd-mm-yyyy hh24:mi:ss'), '1', 1150);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1285, 'SYSLEVEL', '2', '业务管理员', 2, '2', null, null, 286, to_date('19-10-2017 15:52:26', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-07-2018 09:41:54', 'dd-mm-yyyy hh24:mi:ss'), '1', 1150);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1286, 'SYSLEVEL', '3', '业务用户', 3, '3', null, null, 286, to_date('19-10-2017 15:52:26', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('30-07-2018 09:41:54', 'dd-mm-yyyy hh24:mi:ss'), '1', 1150);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1287, 'CONFIGTYPE', '1', '平台基础', 1, '1', 'CONFIGLEVEL', null, 286, to_date('19-10-2017 15:55:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1288, 'CONFIGTYPE', '2', '资源配置', 2, '1', 'CONFIGLEVEL', null, 286, to_date('19-10-2017 15:55:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1289, 'CONFIGTYPE', '3', '角色配置', 3, '1', 'CONFIGLEVEL', null, 286, to_date('19-10-2017 15:55:48', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:08:41', 'dd-mm-yyyy hh24:mi:ss'), '1', 1151);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1544, 'BDGN', 'EDIT', '办理', 1, null, null, null, 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 1390);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1545, 'BDGN', 'EXAMINE', '审批', 2, null, null, null, 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 1390);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1546, 'BDGN', 'VIEW', '查看', 3, null, null, null, 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 1390);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1547, 'BDGN', 'SEAL', '签章', 4, null, null, null, 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-01-2018 16:05:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 1390);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1524, 'SEXDEMO', '1', '男', 1, null, null, '1', 286, to_date('26-12-2017 14:06:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:38', 'dd-mm-yyyy hh24:mi:ss'), '1', 1230);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1525, 'SEXDEMO', '2', '女', 2, null, null, '2', 286, to_date('26-12-2017 14:06:49', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('16-05-2018 20:55:38', 'dd-mm-yyyy hh24:mi:ss'), '1', 1230);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1644, 'QJLCZT', 'QJLCZT_1', '待申请', 1, null, 'BLFS', null, 286, to_date('29-01-2018 11:13:36', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('23-02-2018 16:58:02', 'dd-mm-yyyy hh24:mi:ss'), '1', 1310);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3433, 'SHENGDEMO', '1', '安徽省', 1, null, null, null, 286, to_date('16-05-2018 20:38:36', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1', 2968);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3434, 'SHENGDEMO', '2', '江苏省', 2, null, null, null, 286, to_date('16-05-2018 20:38:36', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1', 2968);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3439, 'COMPANYDEMO', '1', '阿里巴巴', 1, null, null, null, 286, to_date('17-05-2018 08:59:01', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:30', 'dd-mm-yyyy hh24:mi:ss'), '1', 2970);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3440, 'COMPANYDEMO', '2', '腾讯', 2, null, null, null, 286, to_date('17-05-2018 08:59:01', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:30', 'dd-mm-yyyy hh24:mi:ss'), '1', 2970);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3441, 'COMPANYDEMO', '3', '百度', 3, null, null, null, 286, to_date('17-05-2018 08:59:01', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:30', 'dd-mm-yyyy hh24:mi:ss'), '1', 2970);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3442, 'LEADERDEMO', 'LEADERDEMO_1', '马云', 1, null, null, null, 286, to_date('17-05-2018 09:00:12', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2971);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3443, 'LEADERDEMO', 'LEADERDEMO_2', '彭蕾', 2, null, null, null, 286, to_date('17-05-2018 09:00:12', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2971);
commit;
prompt 100 records committed...
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3444, 'LEADERDEMO', 'LEADERDEMO_3', '马化腾', 3, null, null, null, 286, to_date('17-05-2018 09:00:12', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2971);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3445, 'LEADERDEMO', 'LEADERDEMO_4', '张小龙', 4, null, null, null, 286, to_date('17-05-2018 09:00:12', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2971);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3446, 'LEADERDEMO', 'LEADERDEMO_5', '李彦宏', 5, null, null, null, 286, to_date('17-05-2018 09:00:12', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2971);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3447, 'LEADERDEMO', 'LEADERDEMO_6', '马东敏', 6, null, null, null, 286, to_date('17-05-2018 09:00:12', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('17-05-2018 09:00:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2971);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3435, 'SHIDEMO', 'SHIDEMO_1', '合肥市', 1, '1', 'SHENGDEMO', null, 286, to_date('16-05-2018 20:57:19', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 2969);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3436, 'SHIDEMO', 'SHIDEMO_2', '芜湖市', 2, '1', 'SHENGDEMO', null, 286, to_date('16-05-2018 20:57:19', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 2969);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3437, 'SHIDEMO', 'SHIDEMO_3', '南京市', 3, '2', 'SHENGDEMO', null, 286, to_date('16-05-2018 20:58:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 2969);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3438, 'SHIDEMO', 'SHIDEMO_4', '常州市', 4, '2', 'SHENGDEMO', null, 286, to_date('16-05-2018 20:58:03', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 2969);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7055, 'RULERANGE', '1', '本层级', 2, null, null, null, 815, to_date('01-11-2018 16:55:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:30:34', 'dd-mm-yyyy hh24:mi:ss'), '1', 6074);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (1687, 'QJLCZT', 'QJLCZT_4', '完成', 4, null, 'BLFS', null, 286, to_date('29-01-2018', 'dd-mm-yyyy'), 286, to_date('23-02-2018', 'dd-mm-yyyy'), '1', 1310);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7056, 'RULERANGE', '2', '父层级', 3, null, null, null, 815, to_date('01-11-2018 16:55:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:30:34', 'dd-mm-yyyy hh24:mi:ss'), '1', 6074);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (6949, 'SHENGDEMO', '3', '湖南省', 3, null, null, null, 815, to_date('11-07-2018 15:39:13', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:13', 'dd-mm-yyyy hh24:mi:ss'), '1', 2968);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3457, 'JSLX', '3', '岗位角色', 3, '3', null, null, 815, to_date('20-06-2018 09:43:51', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('26-07-2018 09:12:39', 'dd-mm-yyyy hh24:mi:ss'), '1', 51);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (6950, 'SHIDEMO', 'SHIDEMO_5', '岳阳市', 5, '3', null, null, 815, to_date('11-07-2018 15:39:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('11-07-2018 15:39:50', 'dd-mm-yyyy hh24:mi:ss'), '1', 2969);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7057, 'RULERANGE', '3', '直接子级', 4, null, null, null, 815, to_date('01-11-2018 16:55:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:30:34', 'dd-mm-yyyy hh24:mi:ss'), '1', 6074);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7058, 'RULERANGE', '4', '所有子级', 5, null, null, null, 815, to_date('01-11-2018 16:55:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:30:34', 'dd-mm-yyyy hh24:mi:ss'), '1', 6074);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7054, 'RULERANGE', '0', '自身', 1, null, null, null, 815, to_date('01-11-2018 16:55:41', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 17:30:34', 'dd-mm-yyyy hh24:mi:ss'), '1', 6074);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7044, 'RULECONFIGTYPE', '0', '默认', 1, null, null, null, 815, to_date('01-11-2018 15:51:10', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 15:51:10', 'dd-mm-yyyy hh24:mi:ss'), '1', 6070);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7047, 'RULESUBJECT', '1', '上一环节办理人', 2, null, null, null, 815, to_date('01-11-2018 15:52:25', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 15:52:25', 'dd-mm-yyyy hh24:mi:ss'), '1', 6071);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7045, 'RULECONFIGTYPE', '1', '自定义', 2, null, null, null, 815, to_date('01-11-2018 15:51:10', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 15:51:10', 'dd-mm-yyyy hh24:mi:ss'), '1', 6070);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7046, 'RULESUBJECT', '0', '流程启动人', 1, null, null, null, 815, to_date('01-11-2018 15:52:25', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 15:52:25', 'dd-mm-yyyy hh24:mi:ss'), '1', 6071);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7048, 'RULEORGANLEVEL', '0', '本层级', 1, null, null, null, 815, to_date('01-11-2018 15:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 16:53:03', 'dd-mm-yyyy hh24:mi:ss'), '0', 6072);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7049, 'RULEORGANLEVEL', '1', '父层级', 2, null, null, null, 815, to_date('01-11-2018 15:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 16:53:03', 'dd-mm-yyyy hh24:mi:ss'), '0', 6072);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7050, 'RULEORGANLEVEL', '2', '直接子级', 3, null, null, null, 815, to_date('01-11-2018 15:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 16:53:03', 'dd-mm-yyyy hh24:mi:ss'), '0', 6072);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7051, 'RULEORGANLEVEL', '3', '所有子级', 4, null, null, null, 815, to_date('01-11-2018 15:57:50', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 16:53:03', 'dd-mm-yyyy hh24:mi:ss'), '0', 6072);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3455, 'SF', '0', '否', 1, null, null, null, 815, to_date('20-06-2018 09:15:42', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-06-2018 09:15:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2995);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (3456, 'SF', '1', '是', 2, null, null, null, 815, to_date('20-06-2018 09:15:42', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-06-2018 09:15:42', 'dd-mm-yyyy hh24:mi:ss'), '1', 2995);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7005, 'BBZDSZLX', '2', '合计', 2, null, null, null, 815, to_date('23-08-2018 16:07:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 6030);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7006, 'BBZDSZLX', '3', '平均值', 3, null, null, null, 815, to_date('23-08-2018 16:07:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 6030);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7007, 'BBZDSZLX', '4', '最大值', 4, null, null, null, 815, to_date('23-08-2018 16:07:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 6030);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7008, 'BBZDSZLX', '5', '最小值', 5, null, null, null, 815, to_date('23-08-2018 16:07:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 6030);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (6984, 'YSJSXLX', '1', '数据表', 1, null, null, null, 815, to_date('20-08-2018 09:20:43', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-08-2018 09:20:43', 'dd-mm-yyyy hh24:mi:ss'), '1', 6010);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (6985, 'YSJSXLX', '2', '视图', 2, null, null, null, 815, to_date('20-08-2018 09:20:43', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('20-08-2018 09:20:43', 'dd-mm-yyyy hh24:mi:ss'), '1', 6010);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7004, 'BBZDSZLX', '1', '计数', 1, '1', null, null, 815, to_date('23-08-2018 16:07:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 6030);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7009, 'BBZDSZLX', '6', '中位数', 6, null, null, null, 815, to_date('23-08-2018 16:07:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), '1', 6030);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7010, 'BBZDFZLX', '1', '值分组', 1, null, null, null, 815, to_date('23-08-2018 16:11:34', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('23-08-2018 16:11:34', 'dd-mm-yyyy hh24:mi:ss'), '1', 6031);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7052, 'INCLUDESUBJECT', '0', '不包含', 1, null, null, null, 815, to_date('01-11-2018 16:44:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 16:44:35', 'dd-mm-yyyy hh24:mi:ss'), '1', 6073);
insert into SYS_SUBDICT (id, dict_code, code, value, sort, pcode, pdict_code, remark, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, dict_id)
values (7053, 'INCLUDESUBJECT', '1', '包含', 2, null, null, null, 815, to_date('01-11-2018 16:44:35', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('01-11-2018 16:44:35', 'dd-mm-yyyy hh24:mi:ss'), '1', 6073);
commit;
prompt 138 records loaded
prompt Loading SYS_USER...
insert into SYS_USER (id, login_name, login_pwd, user_name, default_organ_id, sort, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, is_blocked, sex, info_id)
values (815, 'plat', '111', '平台管理员', 22, null, 286, to_date('26-10-2017 19:19:18', 'dd-mm-yyyy hh24:mi:ss'), 286, to_date('03-05-2018 15:41:08', 'dd-mm-yyyy hh24:mi:ss'), '3', '0', '1', null);
insert into SYS_USER (id, login_name, login_pwd, user_name, default_organ_id, sort, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, is_blocked, sex, info_id)
values (286, 'admin', '111', '后台管理员', 2, null, 1, to_date('15-09-2017 09:27:37', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('24-07-2018 15:12:40', 'dd-mm-yyyy hh24:mi:ss'), '1', '0', '1', 10);
commit;
prompt 2 records loaded
prompt Loading SYS_USER_INFO...
insert into sys_user_info (ID, SFZHM, SFYX_ST, USER_ID, XGSJ, CJSJ, XGR_ID, AGE)
values (10, '111', '1', null, to_date('13-09-2018 17:21:13', 'dd-mm-yyyy hh24:mi:ss'), null, 815, 80);
commit;
prompt Loading SYS_WORKFLOW_TYPE...
insert into SYS_WORKFLOW_TYPE (id, name, parent_id, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st)
values (2, '业务流程', null, 'dfsf', 1, to_date('24-05-2017 20:32:45', 'dd-mm-yyyy hh24:mi:ss'), 815, to_date('02-07-2018 17:03:35', 'dd-mm-yyyy hh24:mi:ss'), '1');
commit;
prompt 1 records loaded
set feedback on
set define on
prompt Done.
