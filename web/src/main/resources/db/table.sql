-----------------------------------------------------------
-- Export file for user PURE@192.168.0.110:1522/BASEORCL --
-- Created by Administrator on 2018-11-12, 10:21:58 -------
-----------------------------------------------------------

set define off
spool table.log

prompt
prompt Creating table SYS_ACTIVITY_NODE
prompt ================================
prompt
create table SYS_ACTIVITY_NODE
(
  id                    INTEGER not null,
  transact_type         CHAR(1) not null,
  countersign_parameter CHAR(1),
  countersign_value     NUMBER(2),
  is_entrust            CHAR(1),
  converge_type         CHAR(1),
  colony_id             INTEGER,
  disagree_node_id      INTEGER,
  submitname            VARCHAR2(50),
  savename              VARCHAR2(50)
)
;
comment on table SYS_ACTIVITY_NODE
  is '活动环节表';
comment on column SYS_ACTIVITY_NODE.transact_type
  is '多人办理方式 0：抢占 1：会签';
comment on column SYS_ACTIVITY_NODE.countersign_parameter
  is '会签处理参数 0全部 1比例 2固定';
comment on column SYS_ACTIVITY_NODE.countersign_value
  is '会签处理参数值';
comment on column SYS_ACTIVITY_NODE.is_entrust
  is '是否委办（未使用） 0：否 1：是';
comment on column SYS_ACTIVITY_NODE.converge_type
  is '聚合方式（未使用） 0：同步聚合 1：异步聚合 ';
comment on column SYS_ACTIVITY_NODE.colony_id
  is '群组ID（未使用）';
comment on column SYS_ACTIVITY_NODE.disagree_node_id
  is '退回至环节ID';
comment on column SYS_ACTIVITY_NODE.submitname
  is '提交按钮别名';
comment on column SYS_ACTIVITY_NODE.savename
  is '草稿按钮别名';
alter table SYS_ACTIVITY_NODE
  add constraint PK_SYS_ACTIVITY_NODE_ID primary key (ID);

prompt
prompt Creating table SYS_ATTACHMENT
prompt =============================
prompt
create table SYS_ATTACHMENT
(
  id              INTEGER not null,
  type            CHAR(1),
  name            VARCHAR2(100),
  extension       VARCHAR2(100),
  absolute_path   VARCHAR2(500),
  th_absolutepath VARCHAR2(500),
  uuid            VARCHAR2(40),
  description     VARCHAR2(1000),
  alias           VARCHAR2(100),
  filesize        NUMBER,
  fjlb_no         VARCHAR2(30),
  cjr_id          INTEGER,
  cjsj            DATE,
  xgr_id          INTEGER,
  xgsj            DATE,
  sfyx_st         CHAR(1)
)
;
comment on table SYS_ATTACHMENT
  is '附件表（主表）';
comment on column SYS_ATTACHMENT.id
  is '主键';
comment on column SYS_ATTACHMENT.type
  is '附件类型字典项{1：文档，2：图片，3：WORD模板，4：其他}';
comment on column SYS_ATTACHMENT.name
  is '附件名称';
comment on column SYS_ATTACHMENT.extension
  is '附件扩展名';
comment on column SYS_ATTACHMENT.absolute_path
  is '附件物理绝对路径';
comment on column SYS_ATTACHMENT.th_absolutepath
  is '缩略图物理绝对路径';
comment on column SYS_ATTACHMENT.uuid
  is 'UUID';
comment on column SYS_ATTACHMENT.description
  is '描述';
comment on column SYS_ATTACHMENT.alias
  is '附件别名';
comment on column SYS_ATTACHMENT.filesize
  is '附件大小';
comment on column SYS_ATTACHMENT.fjlb_no
  is '附件类别 分类说明';
comment on column SYS_ATTACHMENT.cjr_id
  is '创建人ID';
comment on column SYS_ATTACHMENT.cjsj
  is '创建时间';
comment on column SYS_ATTACHMENT.xgr_id
  is '修改人ID';
comment on column SYS_ATTACHMENT.xgsj
  is '修改时间';
comment on column SYS_ATTACHMENT.sfyx_st
  is '有效状态 |0无效, 1有效, 2,临时状态';
create index IDX_ATTACHMENT_UUID on SYS_ATTACHMENT (UUID);
alter table SYS_ATTACHMENT
  add constraint PK_SYS_ATTACHMENT_ID primary key (ID);

prompt
prompt Creating table SYS_ATTACHMENT_DATA
prompt ==================================
prompt
create table SYS_ATTACHMENT_DATA
(
  id            INTEGER not null,
  attachment_id INTEGER,
  content       BLOB,
  sfyx_st       CHAR(1)
)
;

prompt
prompt Creating table SYS_AUTH_RULE
prompt ============================
prompt
create table SYS_AUTH_RULE
(
  id         INTEGER not null,
  object_id  INTEGER,
  qxlx       VARCHAR2(20),
  gzlx       VARCHAR2(20),
  page_ids   VARCHAR2(100),
  gl_rule_id INTEGER,
  cjr_id     INTEGER,
  cjsj       DATE,
  xgr_id     INTEGER,
  xgsj       DATE,
  sfyx_st    CHAR(1)
)
;
comment on table SYS_AUTH_RULE
  is '数据权限生成规则表';
comment on column SYS_AUTH_RULE.id
  is '主键';
comment on column SYS_AUTH_RULE.object_id
  is '对象类ID';
comment on column SYS_AUTH_RULE.qxlx
  is '权限类型 1查看 2维护';
comment on column SYS_AUTH_RULE.gzlx
  is '规则类型 1数据权限规则 2动态规则';
comment on column SYS_AUTH_RULE.page_ids
  is '页面IDs';
comment on column SYS_AUTH_RULE.gl_rule_id
  is '关联基本规则ID';
comment on column SYS_AUTH_RULE.cjr_id
  is '创建人';
comment on column SYS_AUTH_RULE.cjsj
  is '创建时间';
comment on column SYS_AUTH_RULE.xgr_id
  is '修改人';
comment on column SYS_AUTH_RULE.xgsj
  is '修改时间';
comment on column SYS_AUTH_RULE.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_AUTH_RULE
  add constraint PK_SYS_AUTH_RULE_ID primary key (ID);

prompt
prompt Creating table SYS_BASE_RULE
prompt ============================
prompt
create table SYS_BASE_RULE
(
  id              INTEGER not null,
  rule_name       VARCHAR2(50),
  sxfs            VARCHAR2(20),
  rule_detail     VARCHAR2(4000),
  description     VARCHAR2(200),
  cjr_id          INTEGER,
  cjsj            DATE,
  xgr_id          INTEGER,
  xgsj            DATE,
  sfyx_st         CHAR(1),
  config_type     VARCHAR2(10),
  subject         VARCHAR2(10),
  rule_range      VARCHAR2(10),
  include_subject VARCHAR2(10)
)
;
comment on table SYS_BASE_RULE
  is '基本规则表';
comment on column SYS_BASE_RULE.id
  is '主键';
comment on column SYS_BASE_RULE.rule_name
  is '规则名称';
comment on column SYS_BASE_RULE.sxfs
  is '规则实现方式，字典项   1：sql、2：存储过程、3：Java代码';
comment on column SYS_BASE_RULE.rule_detail
  is '规则实现细节';
comment on column SYS_BASE_RULE.description
  is '规则描述';
comment on column SYS_BASE_RULE.cjr_id
  is '创建人';
comment on column SYS_BASE_RULE.cjsj
  is '创建时间';
comment on column SYS_BASE_RULE.xgr_id
  is '修改人';
comment on column SYS_BASE_RULE.xgsj
  is '修改时间';
comment on column SYS_BASE_RULE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_BASE_RULE.config_type
  is '配置方式 0默认 1自定义';
comment on column SYS_BASE_RULE.subject
  is '规则主体 0流程启动人 1上一环节办理人';
comment on column SYS_BASE_RULE.rule_range
  is '规则范围 0自身 1本层级 2父层级 3直接子级 4所有子级';
comment on column SYS_BASE_RULE.include_subject
  is '包含主体 0不包含 2包含';
alter table SYS_BASE_RULE
  add constraint PK_SYS_BASE_RULE_ID primary key (ID);

prompt
prompt Creating table SYS_COMPOSITE_NODE
prompt =================================
prompt
create table SYS_COMPOSITE_NODE
(
  id              INTEGER not null,
  workflow_id     INTEGER,
  defaultbacknode INTEGER
)
;
comment on table SYS_COMPOSITE_NODE
  is '复合节点表(警卫二期使用)';
comment on column SYS_COMPOSITE_NODE.id
  is '主键';
comment on column SYS_COMPOSITE_NODE.workflow_id
  is '复合流程id';
comment on column SYS_COMPOSITE_NODE.defaultbacknode
  is '默认退回节点id';
alter table SYS_COMPOSITE_NODE
  add constraint PK_SYS_COMPOSITE_NODE_ID primary key (ID);

prompt
prompt Creating table SYS_CONFIG
prompt =========================
prompt
create table SYS_CONFIG
(
  id          INTEGER not null,
  name        VARCHAR2(100),
  code        VARCHAR2(30),
  value       VARCHAR2(300),
  description VARCHAR2(500),
  cjr_id      INTEGER,
  cjsj        DATE,
  xgr_id      INTEGER,
  xgsj        DATE,
  sfyx_st     CHAR(1),
  levels      VARCHAR2(21),
  biz_type    VARCHAR2(21),
  app_id      INTEGER
)
;
comment on table SYS_CONFIG
  is '配置表';
comment on column SYS_CONFIG.id
  is '主键';
comment on column SYS_CONFIG.name
  is '名称';
comment on column SYS_CONFIG.code
  is '代码';
comment on column SYS_CONFIG.value
  is '默认值';
comment on column SYS_CONFIG.description
  is '描述';
comment on column SYS_CONFIG.cjr_id
  is '创建人';
comment on column SYS_CONFIG.cjsj
  is '创建时间';
comment on column SYS_CONFIG.xgr_id
  is '修改人';
comment on column SYS_CONFIG.xgsj
  is '修改时间';
comment on column SYS_CONFIG.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_CONFIG.levels
  is '配置级别';
comment on column SYS_CONFIG.biz_type
  is '业务类型（由实际项目使用时确定）';
comment on column SYS_CONFIG.app_id
  is '应用id';
create index IDX_CONFIG_APP_ID on SYS_CONFIG (APP_ID);
alter table SYS_CONFIG
  add constraint PK_SYS_CONFIG_ID primary key (ID);

prompt
prompt Creating table SYS_DATA_AUTH
prompt ============================
prompt
create table SYS_DATA_AUTH
(
  id        INTEGER not null,
  role_id   INTEGER,
  rule_id   INTEGER,
  user_id   INTEGER,
  object_id INTEGER,
  oids      VARCHAR2(512),
  page_ids  VARCHAR2(512),
  qxlx      CHAR(1),
  cjr_id    INTEGER,
  cjsj      DATE,
  sfyx_st   CHAR(1)
)
;
comment on table SYS_DATA_AUTH
  is '数据权限表';
comment on column SYS_DATA_AUTH.id
  is '主键';
comment on column SYS_DATA_AUTH.role_id
  is '角色ID';
comment on column SYS_DATA_AUTH.rule_id
  is '规则ID';
comment on column SYS_DATA_AUTH.user_id
  is '用户ID';
comment on column SYS_DATA_AUTH.object_id
  is '对象类ID';
comment on column SYS_DATA_AUTH.oids
  is '对象数据IDs';
comment on column SYS_DATA_AUTH.page_ids
  is '页面IDs';
comment on column SYS_DATA_AUTH.qxlx
  is '权限类型 1查看 2维护';
comment on column SYS_DATA_AUTH.cjr_id
  is '创建人';
comment on column SYS_DATA_AUTH.cjsj
  is '创建时间';
comment on column SYS_DATA_AUTH.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_DATA_AUTH
  add constraint PK_SYS_DATA_AUTH_ID primary key (ID);

prompt
prompt Creating table SYS_DECISION_NODE
prompt ================================
prompt
create table SYS_DECISION_NODE
(
  id            INTEGER not null,
  decision_type CHAR(1)
)
;
comment on table SYS_DECISION_NODE
  is '决策环节表';
comment on column SYS_DECISION_NODE.id
  is '主键';
comment on column SYS_DECISION_NODE.decision_type
  is '决策类型 0手动 1自动';
alter table SYS_DECISION_NODE
  add constraint PK_SYS_DECISION_NODE_ID primary key (ID);

prompt
prompt Creating table SYS_DEMO_DICT
prompt ============================
prompt
create table SYS_DEMO_DICT
(
  id        INTEGER not null,
  user_name VARCHAR2(100),
  cjr_id    INTEGER,
  cjsj      DATE,
  xgr_id    INTEGER,
  xgsj      DATE,
  sfyx_st   CHAR(1),
  zzmm      VARCHAR2(20),
  city      VARCHAR2(20),
  hobby     VARCHAR2(200),
  language  VARCHAR2(20),
  mz        VARCHAR2(20),
  ceo       VARCHAR2(200),
  fx        VARCHAR2(200),
  game      VARCHAR2(200),
  fj_id_fl  VARCHAR2(200),
  sheng     VARCHAR2(200),
  shi       VARCHAR2(200)
)
;
comment on column SYS_DEMO_DICT.user_name
  is '用户名称
';
comment on column SYS_DEMO_DICT.cjr_id
  is '创建人';
comment on column SYS_DEMO_DICT.cjsj
  is '创建时间';
comment on column SYS_DEMO_DICT.xgr_id
  is '创建人ID';
comment on column SYS_DEMO_DICT.xgsj
  is '修改时间';
comment on column SYS_DEMO_DICT.sfyx_st
  is '是否有效| 0：无效 1：有效';
comment on column SYS_DEMO_DICT.zzmm
  is '政治面貌';
comment on column SYS_DEMO_DICT.city
  is '城市';
comment on column SYS_DEMO_DICT.hobby
  is '爱好';
comment on column SYS_DEMO_DICT.language
  is '语言';
comment on column SYS_DEMO_DICT.mz
  is '民族';
comment on column SYS_DEMO_DICT.ceo
  is 'CEO';
comment on column SYS_DEMO_DICT.fx
  is '方向';
comment on column SYS_DEMO_DICT.game
  is '游戏';
comment on column SYS_DEMO_DICT.fj_id_fl
  is '分类附件';
comment on column SYS_DEMO_DICT.sheng
  is '省';
comment on column SYS_DEMO_DICT.shi
  is '市';

prompt
prompt Creating table SYS_DEMO_LEADER
prompt ==============================
prompt
create table SYS_DEMO_LEADER
(
  id          INTEGER,
  leader_name VARCHAR2(30),
  sex         VARCHAR2(11),
  cjr_id      INTEGER,
  xgr_id      INTEGER,
  cjsj        DATE,
  xgsj        DATE,
  sfyx_st     CHAR(1),
  organ_id    INTEGER,
  user_id     INTEGER
)
;
comment on column SYS_DEMO_LEADER.leader_name
  is '姓名';
comment on column SYS_DEMO_LEADER.sex
  is '性别';
comment on column SYS_DEMO_LEADER.cjr_id
  is '创建人id';
comment on column SYS_DEMO_LEADER.xgr_id
  is '修改人id';
comment on column SYS_DEMO_LEADER.cjsj
  is '创建时间';
comment on column SYS_DEMO_LEADER.xgsj
  is '修改时间';
comment on column SYS_DEMO_LEADER.sfyx_st
  is '是否有效|1：有效，0：无效';
comment on column SYS_DEMO_LEADER.organ_id
  is '所属机构';
comment on column SYS_DEMO_LEADER.user_id
  is '用户id';

prompt
prompt Creating table SYS_DEMO_ORGAN
prompt =============================
prompt
create table SYS_DEMO_ORGAN
(
  id         INTEGER not null,
  organ_name VARCHAR2(200),
  project_id INTEGER,
  sfyx_st    CHAR(1)
)
;
comment on column SYS_DEMO_ORGAN.id
  is '主键';
comment on column SYS_DEMO_ORGAN.organ_name
  is '名称';
comment on column SYS_DEMO_ORGAN.project_id
  is '项目id';
comment on column SYS_DEMO_ORGAN.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_DEMO_ORGAN
  add constraint PK_SYS_DEMO_ORGAN_ID primary key (ID);

prompt
prompt Creating table SYS_DEMO_PROJECT
prompt ===============================
prompt
create table SYS_DEMO_PROJECT
(
  id           INTEGER not null,
  project_name VARCHAR2(200),
  project_type VARCHAR2(20),
  sfyx_st      CHAR(1),
  organ_id     INTEGER,
  clrq         VARCHAR2(40)
)
;
comment on column SYS_DEMO_PROJECT.id
  is '主键';
comment on column SYS_DEMO_PROJECT.project_name
  is '项目名称';
comment on column SYS_DEMO_PROJECT.project_type
  is '项目类型';
comment on column SYS_DEMO_PROJECT.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_DEMO_PROJECT.organ_id
  is '机构ID';
comment on column SYS_DEMO_PROJECT.clrq
  is '成立日期';
alter table SYS_DEMO_PROJECT
  add constraint PK_SYS_DEMO_PROJECT_ID primary key (ID);

prompt
prompt Creating table SYS_DEMO_USER
prompt ============================
prompt
create table SYS_DEMO_USER
(
  id           INTEGER not null,
  user_name    VARCHAR2(100),
  sex          INTEGER,
  cjr_id       INTEGER,
  cjsj         DATE,
  xgr_id       INTEGER,
  xgsj         DATE,
  sfyx_st      CHAR(1),
  csrq         DATE,
  zzmm         VARCHAR2(20),
  description  VARCHAR2(200),
  organ_id     INTEGER,
  zp_id        VARCHAR2(200),
  fj_id        NVARCHAR2(100),
  city         VARCHAR2(20),
  hobby        VARCHAR2(200),
  language     VARCHAR2(20),
  mz           VARCHAR2(20),
  fruit        VARCHAR2(200),
  fj_id_fl     VARCHAR2(200),
  fj_id_table  VARCHAR2(200),
  fj_id_single VARCHAR2(200),
  fj_id_html5  VARCHAR2(200),
  bir_time     DATE,
  sheng        VARCHAR2(200),
  shi          VARCHAR2(200),
  content      VARCHAR2(4000)
)
;
comment on table SYS_DEMO_USER
  is '用户';
comment on column SYS_DEMO_USER.id
  is '主键';
comment on column SYS_DEMO_USER.user_name
  is '用户名';
comment on column SYS_DEMO_USER.sex
  is '性别';
comment on column SYS_DEMO_USER.cjr_id
  is '创建人';
comment on column SYS_DEMO_USER.cjsj
  is '创建时间';
comment on column SYS_DEMO_USER.xgr_id
  is '修改人';
comment on column SYS_DEMO_USER.xgsj
  is '修改时间';
comment on column SYS_DEMO_USER.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_DEMO_USER.csrq
  is '出生日期';
comment on column SYS_DEMO_USER.zzmm
  is '政治面貌';
comment on column SYS_DEMO_USER.description
  is '描述';
comment on column SYS_DEMO_USER.organ_id
  is '组织';
comment on column SYS_DEMO_USER.zp_id
  is '照片ID';
comment on column SYS_DEMO_USER.fj_id
  is '附件ID';
comment on column SYS_DEMO_USER.city
  is '城市';
comment on column SYS_DEMO_USER.hobby
  is '爱好';
comment on column SYS_DEMO_USER.language
  is '语言';
comment on column SYS_DEMO_USER.mz
  is '民族';
comment on column SYS_DEMO_USER.fruit
  is '水果';
comment on column SYS_DEMO_USER.fj_id_fl
  is '分类附件';
comment on column SYS_DEMO_USER.fj_id_table
  is '表格附件';
comment on column SYS_DEMO_USER.fj_id_single
  is '单个附件';
comment on column SYS_DEMO_USER.fj_id_html5
  is 'html5附件';
comment on column SYS_DEMO_USER.bir_time
  is '出生时间';
comment on column SYS_DEMO_USER.sheng
  is '省';
comment on column SYS_DEMO_USER.shi
  is '市';
comment on column SYS_DEMO_USER.content
  is '内容';
alter table SYS_DEMO_USER
  add constraint PK_SYS_DEMO_USER_ID primary key (ID);

prompt
prompt Creating table SYS_DICT
prompt =======================
prompt
create table SYS_DICT
(
  id          INTEGER not null,
  dict_name   VARCHAR2(200),
  dict_code   VARCHAR2(30),
  dict_type   CHAR(1),
  description VARCHAR2(1000),
  pdict_code  VARCHAR2(30),
  cjr_id      INTEGER,
  xgr_id      INTEGER,
  xgsj        DATE,
  cjsj        DATE,
  sfyx_st     CHAR(1),
  is_empty    CHAR(1)
)
;
comment on table SYS_DICT
  is '系统字典表（主表）';
comment on column SYS_DICT.id
  is '主键';
comment on column SYS_DICT.dict_name
  is '字典名称';
comment on column SYS_DICT.dict_code
  is '字典编码';
comment on column SYS_DICT.dict_type
  is '字典类型  |1平台字典  2业务字典';
comment on column SYS_DICT.description
  is '描述';
comment on column SYS_DICT.pdict_code
  is '上级字典编码';
comment on column SYS_DICT.cjr_id
  is '创建人ID';
comment on column SYS_DICT.xgr_id
  is '修改人ID';
comment on column SYS_DICT.xgsj
  is '修改时间';
comment on column SYS_DICT.cjsj
  is '创建时间';
comment on column SYS_DICT.sfyx_st
  is '有效状态 |0无效 1有效';
comment on column SYS_DICT.is_empty
  is '是否为空 |0否  1是';
alter table SYS_DICT
  add constraint PK_SYS_DICT_ID primary key (ID);

prompt
prompt Creating table SYS_ENTRUST
prompt ==========================
prompt
create table SYS_ENTRUST
(
  id              INTEGER not null,
  user_id         INTEGER not null,
  entrust_user_id INTEGER,
  workflow_id     VARCHAR2(500),
  start_date      DATE,
  end_date        DATE,
  sfyx_st         CHAR(1)
)
;
comment on table SYS_ENTRUST
  is '委办计划表';
comment on column SYS_ENTRUST.id
  is '主键';
comment on column SYS_ENTRUST.user_id
  is '用户ID';
comment on column SYS_ENTRUST.entrust_user_id
  is '委办人ID';
comment on column SYS_ENTRUST.workflow_id
  is '所属流程ID
多个流程ID用逗号分隔';
comment on column SYS_ENTRUST.start_date
  is '委办开始时间';
comment on column SYS_ENTRUST.end_date
  is '委办结束时间';
comment on column SYS_ENTRUST.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_ENTRUST
  add constraint PK_SYS_ENTRUST_ID primary key (ID);

prompt
prompt Creating table SYS_FORM_DEF
prompt ===========================
prompt
create table SYS_FORM_DEF
(
  id          INTEGER not null,
  name        VARCHAR2(64),
  key         VARCHAR2(64),
  description VARCHAR2(512),
  type_id     INTEGER,
  is_main     CHAR(1),
  version     INTEGER,
  extend_attr CLOB,
  cjr_id      INTEGER,
  cjsj        DATE,
  xgr_id      INTEGER,
  xgsj        DATE,
  sfyx_st     CHAR(1),
  table_name  VARCHAR2(64)
)
;
comment on table SYS_FORM_DEF
  is '表单定义';
comment on column SYS_FORM_DEF.name
  is '标题';
comment on column SYS_FORM_DEF.key
  is '表单key';
comment on column SYS_FORM_DEF.description
  is '表单描述';
comment on column SYS_FORM_DEF.type_id
  is '所属分类ID';
comment on column SYS_FORM_DEF.is_main
  is '是否主版本，1是，0否';
comment on column SYS_FORM_DEF.version
  is '表单版本号';
comment on column SYS_FORM_DEF.extend_attr
  is '扩展属性';
comment on column SYS_FORM_DEF.cjr_id
  is '创建人';
comment on column SYS_FORM_DEF.cjsj
  is '创建时间';
comment on column SYS_FORM_DEF.xgr_id
  is '修改时间';
comment on column SYS_FORM_DEF.xgsj
  is '修改时间';
comment on column SYS_FORM_DEF.sfyx_st
  is '有效状态';
comment on column SYS_FORM_DEF.table_name
  is '表名称';

prompt
prompt Creating table SYS_FORM_FIELD
prompt =============================
prompt
create table SYS_FORM_FIELD
(
  id            INTEGER not null,
  form_id       INTEGER,
  parent_id     INTEGER,
  code          VARCHAR2(64),
  label         VARCHAR2(64),
  description   VARCHAR2(512),
  field_type    VARCHAR2(40),
  field_options CLOB,
  sort          INTEGER,
  sfyx_st       CHAR(1),
  column_name   VARCHAR2(64)
)
;
comment on table SYS_FORM_FIELD
  is '表单字段';
comment on column SYS_FORM_FIELD.form_id
  is '表单ID';
comment on column SYS_FORM_FIELD.parent_id
  is '父字段ID';
comment on column SYS_FORM_FIELD.code
  is '字段code';
comment on column SYS_FORM_FIELD.label
  is '字段标题';
comment on column SYS_FORM_FIELD.description
  is '字段描述';
comment on column SYS_FORM_FIELD.field_type
  is '字段类型';
comment on column SYS_FORM_FIELD.field_options
  is '字段选项';
comment on column SYS_FORM_FIELD.sort
  is '排序';
comment on column SYS_FORM_FIELD.sfyx_st
  is '是否有效';
comment on column SYS_FORM_FIELD.column_name
  is 'column名称';

prompt
prompt Creating table SYS_GLB_BIZ_WF
prompt =============================
prompt
create table SYS_GLB_BIZ_WF
(
  id                     INTEGER not null,
  data_id                INTEGER,
  status                 VARCHAR2(1000),
  workflow_instance_id   INTEGER,
  p_workflow_instance_id INTEGER,
  task_instance_id       INTEGER,
  action                 CHAR(1),
  user_id                INTEGER,
  cjsj                   DATE,
  xgsj                   DATE,
  sfyx_st                CHAR(1),
  workflow_code          VARCHAR2(100),
  todo_users             VARCHAR2(4000),
  organ                  INTEGER,
  organ_level            CHAR(1),
  title                  VARCHAR2(2000),
  done_users             VARCHAR2(4000)
)
;
comment on column SYS_GLB_BIZ_WF.id
  is '主键';
comment on column SYS_GLB_BIZ_WF.data_id
  is '业务数据的ID';
comment on column SYS_GLB_BIZ_WF.status
  is '流程业务状态（业务状态字典，未配置则为环节名称）';
comment on column SYS_GLB_BIZ_WF.workflow_instance_id
  is '流程实例';
comment on column SYS_GLB_BIZ_WF.p_workflow_instance_id
  is '上级流程实例';
comment on column SYS_GLB_BIZ_WF.task_instance_id
  is '任务实例';
comment on column SYS_GLB_BIZ_WF.action
  is '办理动作:1、无动作  2、签收  3、提交  4、退回  5、撤回  6、转办';
comment on column SYS_GLB_BIZ_WF.user_id
  is '最后办理人';
comment on column SYS_GLB_BIZ_WF.cjsj
  is '创建时间';
comment on column SYS_GLB_BIZ_WF.xgsj
  is '修改时间';
comment on column SYS_GLB_BIZ_WF.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_GLB_BIZ_WF.workflow_code
  is '流程编码';
comment on column SYS_GLB_BIZ_WF.todo_users
  is '流程下所有待办人';
comment on column SYS_GLB_BIZ_WF.organ
  is '子流程启动机构（警卫二期使用）';
comment on column SYS_GLB_BIZ_WF.organ_level
  is '机构类型（警卫二期使用）';
comment on column SYS_GLB_BIZ_WF.title
  is '流程实例标题';
comment on column SYS_GLB_BIZ_WF.done_users
  is '流程下所有已办人';
create index IDX_GLBBW_DATA_ID on SYS_GLB_BIZ_WF (DATA_ID);
create index IDX_GLBBW_WFINS_ID on SYS_GLB_BIZ_WF (WORKFLOW_INSTANCE_ID);
alter table SYS_GLB_BIZ_WF
  add constraint PK_SYS_GLB_BIZ_WF_ID primary key (ID);

prompt
prompt Creating table SYS_GLB_COMBINE_ROLE
prompt ===================================
prompt
create table SYS_GLB_COMBINE_ROLE
(
  id              INTEGER not null,
  combine_role_id INTEGER,
  role_id         INTEGER,
  sfyx_st         CHAR(1)
)
;
comment on table SYS_GLB_COMBINE_ROLE
  is '组合角色关联表（与儿子的直接关系）';
comment on column SYS_GLB_COMBINE_ROLE.id
  is '主键';
comment on column SYS_GLB_COMBINE_ROLE.combine_role_id
  is '角色ID';
comment on column SYS_GLB_COMBINE_ROLE.role_id
  is '关联ID';
comment on column SYS_GLB_COMBINE_ROLE.sfyx_st
  is '有效状态1有效0无效';

prompt
prompt Creating table SYS_GLB_COMBINE_ROLE_FJ
prompt ======================================
prompt
create table SYS_GLB_COMBINE_ROLE_FJ
(
  id              INTEGER not null,
  combine_role_id INTEGER,
  role_id         INTEGER,
  sfyx_st         CHAR(1)
)
;
comment on table SYS_GLB_COMBINE_ROLE_FJ
  is '组合角色分解表（与所有后代的直接关系）';
comment on column SYS_GLB_COMBINE_ROLE_FJ.id
  is '主键';
comment on column SYS_GLB_COMBINE_ROLE_FJ.combine_role_id
  is '角色ID';
comment on column SYS_GLB_COMBINE_ROLE_FJ.role_id
  is '关联ID';
comment on column SYS_GLB_COMBINE_ROLE_FJ.sfyx_st
  is '有效状态1有效0无效';

prompt
prompt Creating table SYS_GLB_MESSAGE_USER
prompt ===================================
prompt
create table SYS_GLB_MESSAGE_USER
(
  id           INTEGER not null,
  message_id   INTEGER,
  user_id      INTEGER,
  status       INTEGER,
  receive_time DATE,
  deal_time    DATE,
  sfyx_st      CHAR(1),
  task_id      INTEGER
)
;
comment on table SYS_GLB_MESSAGE_USER
  is '消息用户关联表';
comment on column SYS_GLB_MESSAGE_USER.id
  is '主键ID';
comment on column SYS_GLB_MESSAGE_USER.message_id
  is '消息id';
comment on column SYS_GLB_MESSAGE_USER.user_id
  is '用户id';
comment on column SYS_GLB_MESSAGE_USER.status
  is '状态  1：未阅  2：已阅  3：已办理  4：抢占已阅（工作流）';
comment on column SYS_GLB_MESSAGE_USER.receive_time
  is '接受时间';
comment on column SYS_GLB_MESSAGE_USER.deal_time
  is '办理时间';
comment on column SYS_GLB_MESSAGE_USER.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_GLB_MESSAGE_USER.task_id
  is '任务ID';
create index IDX_GLBMU_MSG_ID on SYS_GLB_MESSAGE_USER (MESSAGE_ID);
create index IDX_GLBMU_USER_ID on SYS_GLB_MESSAGE_USER (USER_ID);
alter table SYS_GLB_MESSAGE_USER
  add constraint PK_SYS_GLB_MESSAGE_USER_ID primary key (ID);

prompt
prompt Creating table SYS_GLB_REPORT_FORM
prompt ==================================
prompt
create table SYS_GLB_REPORT_FORM
(
  id                 INTEGER not null,
  report_form_id     INTEGER not null,
  gl_report_form_id2 INTEGER not null,
  gl_property        VARCHAR2(30),
  show_type          CHAR(1),
  cjr_id             INTEGER,
  cjsj               DATE,
  xgr_id             INTEGER,
  xgsj               DATE,
  sfyx_st            CHAR(1)
)
;
comment on table SYS_GLB_REPORT_FORM
  is '报表关联';
comment on column SYS_GLB_REPORT_FORM.id
  is 'ID';
comment on column SYS_GLB_REPORT_FORM.report_form_id
  is 'ID';
comment on column SYS_GLB_REPORT_FORM.gl_report_form_id2
  is 'ID';
comment on column SYS_GLB_REPORT_FORM.gl_property
  is '配置名称';
comment on column SYS_GLB_REPORT_FORM.show_type
  is '配置编码';
comment on column SYS_GLB_REPORT_FORM.cjr_id
  is '创建人ID';
comment on column SYS_GLB_REPORT_FORM.cjsj
  is '创建时间';
comment on column SYS_GLB_REPORT_FORM.xgr_id
  is '修改人ID';
comment on column SYS_GLB_REPORT_FORM.xgsj
  is '修改时间';
comment on column SYS_GLB_REPORT_FORM.sfyx_st
  is '是否有效，“0”无效，“1”有效';
alter table SYS_GLB_REPORT_FORM
  add constraint PK_SYS_GLB_REPORT_FORM primary key (ID);

prompt
prompt Creating table SYS_GLB_ROLE
prompt ===========================
prompt
create table SYS_GLB_ROLE
(
  id        INTEGER not null,
  role_id   INTEGER,
  gl_id     INTEGER,
  gl_type   CHAR(1),
  sfqy_st   CHAR(1),
  sfyx_st   CHAR(1),
  role_type CHAR(1)
)
;
comment on table SYS_GLB_ROLE
  is '角色关联表';
comment on column SYS_GLB_ROLE.id
  is '主键';
comment on column SYS_GLB_ROLE.role_id
  is '角色ID';
comment on column SYS_GLB_ROLE.gl_id
  is '关联ID';
comment on column SYS_GLB_ROLE.gl_type
  is '关联类型| 2：组织, 3：用户  （1：基础岗位， 4：实际岗位 1、4废弃）';
comment on column SYS_GLB_ROLE.sfqy_st
  is '是否启用 1启用0禁用';
comment on column SYS_GLB_ROLE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_GLB_ROLE.role_type
  is '角色类型 |冗余字段，方便查询  1业务角色 2流程角色 3岗位角色';
create index IDX_GLBR_ROLE_ID on SYS_GLB_ROLE (ROLE_ID);
create index IND_GLBR_GL_ID on SYS_GLB_ROLE (GL_ID);
alter table SYS_GLB_ROLE
  add constraint PK_SYS_GLB_ROLE_ID primary key (ID);

prompt
prompt Creating table SYS_GLB_ROLE_AUTHRULE
prompt ====================================
prompt
create table SYS_GLB_ROLE_AUTHRULE
(
  id      INTEGER not null,
  role_id INTEGER,
  rule_id INTEGER,
  sfyx_st CHAR(1)
)
;
comment on table SYS_GLB_ROLE_AUTHRULE
  is '角色与权限规则关联表';
comment on column SYS_GLB_ROLE_AUTHRULE.id
  is '主键';
comment on column SYS_GLB_ROLE_AUTHRULE.role_id
  is '角色ID';
comment on column SYS_GLB_ROLE_AUTHRULE.rule_id
  is '规则ID';
comment on column SYS_GLB_ROLE_AUTHRULE.sfyx_st
  is '有效状态 0无效 1有效';
create index IDX_GLBRA_ROLE_ID on SYS_GLB_ROLE_AUTHRULE (ROLE_ID);
create index IDX_GLBRA_RULE_ID on SYS_GLB_ROLE_AUTHRULE (RULE_ID);
alter table SYS_GLB_ROLE_AUTHRULE
  add constraint PK_SYS_GLB_ROLE_AUTHRULE_ID primary key (ID);

prompt
prompt Creating table SYS_GLB_ROLE_RESOURCE
prompt ====================================
prompt
create table SYS_GLB_ROLE_RESOURCE
(
  id          INTEGER not null,
  role_id     INTEGER,
  resource_id INTEGER,
  cjr_id      INTEGER,
  cjsj        DATE,
  sfyx_st     CHAR(1)
)
;
comment on column SYS_GLB_ROLE_RESOURCE.id
  is '主键';
comment on column SYS_GLB_ROLE_RESOURCE.role_id
  is '角色id';
comment on column SYS_GLB_ROLE_RESOURCE.resource_id
  is '资源id';
comment on column SYS_GLB_ROLE_RESOURCE.cjr_id
  is '创建人id';
comment on column SYS_GLB_ROLE_RESOURCE.cjsj
  is '创建时间';
comment on column SYS_GLB_ROLE_RESOURCE.sfyx_st
  is '有效状态 0无效 1有效';
create index IDX_GLBRR_RESOURCE_ID on SYS_GLB_ROLE_RESOURCE (RESOURCE_ID);
create index IDX_GLBRR_ROLE_ID on SYS_GLB_ROLE_RESOURCE (ROLE_ID);
alter table SYS_GLB_ROLE_RESOURCE
  add constraint PK_SYS_GLB_ROLE_RESOURCE_ID primary key (ID);

prompt
prompt Creating table SYS_GLB_ROLE_USER
prompt ================================
prompt
create table SYS_GLB_ROLE_USER
(
  id      INTEGER not null,
  role_id INTEGER,
  user_id INTEGER
)
;
comment on table SYS_GLB_ROLE_USER
  is '角色用户分解表（存储过程统一生成）';
comment on column SYS_GLB_ROLE_USER.id
  is '主键';
comment on column SYS_GLB_ROLE_USER.role_id
  is '角色ID';
comment on column SYS_GLB_ROLE_USER.user_id
  is '用户ID';
create index IDX_GLBRU_ROLE_ID on SYS_GLB_ROLE_USER (ROLE_ID);
create index IDX_GLBRU_USER_ID on SYS_GLB_ROLE_USER (USER_ID);
alter table SYS_GLB_ROLE_USER
  add constraint PK_SYS_GLB_ROLE_USER_ID primary key (ID);

prompt
prompt Creating table SYS_GLB_USER
prompt ===========================
prompt
create table SYS_GLB_USER
(
  id       INTEGER not null,
  post_id  INTEGER,
  user_id  INTEGER,
  organ_id INTEGER,
  sfyx_st  CHAR(1)
)
;
comment on table SYS_GLB_USER
  is '组织用户岗位关联表';
comment on column SYS_GLB_USER.id
  is '主键ID';
comment on column SYS_GLB_USER.post_id
  is '岗位ID';
comment on column SYS_GLB_USER.user_id
  is '用户ID';
comment on column SYS_GLB_USER.organ_id
  is '组织ID';
comment on column SYS_GLB_USER.sfyx_st
  is '有效状态 0无效 1有效';

prompt
prompt Creating table SYS_LOG_EXCEPTION
prompt ================================
prompt
create table SYS_LOG_EXCEPTION
(
  id          INTEGER not null,
  user_id     INTEGER,
  user_name   VARCHAR2(50),
  message     VARCHAR2(4000),
  create_time DATE
)
;
comment on table SYS_LOG_EXCEPTION
  is '异常日志';
comment on column SYS_LOG_EXCEPTION.id
  is 'ID';
comment on column SYS_LOG_EXCEPTION.user_id
  is '用户ID';
comment on column SYS_LOG_EXCEPTION.user_name
  is '用户姓名';
comment on column SYS_LOG_EXCEPTION.message
  is '异常信息';
comment on column SYS_LOG_EXCEPTION.create_time
  is '创建时间';
alter table SYS_LOG_EXCEPTION
  add constraint PK_SYS_LOG_EXCEPTION_ID primary key (ID);

prompt
prompt Creating table SYS_LOG_LOGIN
prompt ============================
prompt
create table SYS_LOG_LOGIN
(
  id         INTEGER not null,
  log_name   VARCHAR2(50),
  user_id    INTEGER,
  success    VARCHAR2(10),
  message    VARCHAR2(200),
  ip         VARCHAR2(50),
  login_time DATE,
  user_name  VARCHAR2(50)
)
;
comment on table SYS_LOG_LOGIN
  is '登录日志表';
comment on column SYS_LOG_LOGIN.id
  is '主键';
comment on column SYS_LOG_LOGIN.log_name
  is '日志名称';
comment on column SYS_LOG_LOGIN.user_id
  is '登录用户';
comment on column SYS_LOG_LOGIN.success
  is '是否执行成功';
comment on column SYS_LOG_LOGIN.message
  is '具体消息';
comment on column SYS_LOG_LOGIN.ip
  is 'IP';
comment on column SYS_LOG_LOGIN.login_time
  is '登录时间';
comment on column SYS_LOG_LOGIN.user_name
  is '登录用户名';
create index IDX_LOGLOGIN_USER_ID on SYS_LOG_LOGIN (USER_ID);
alter table SYS_LOG_LOGIN
  add constraint PK_SYS_LOG_LOGIN_ID primary key (ID);

prompt
prompt Creating table SYS_LOG_OPERATION
prompt ================================
prompt
create table SYS_LOG_OPERATION
(
  id          INTEGER not null,
  log_type    VARCHAR2(50),
  log_name    VARCHAR2(50),
  user_id     INTEGER,
  class_name  VARCHAR2(200),
  method      VARCHAR2(50),
  success     VARCHAR2(10),
  message     VARCHAR2(4000),
  create_time DATE,
  user_name   VARCHAR2(50)
)
;
comment on table SYS_LOG_OPERATION
  is '操作日志表';
comment on column SYS_LOG_OPERATION.id
  is '主键';
comment on column SYS_LOG_OPERATION.log_type
  is '日志类型';
comment on column SYS_LOG_OPERATION.log_name
  is '日志名称';
comment on column SYS_LOG_OPERATION.user_id
  is '用户ID';
comment on column SYS_LOG_OPERATION.class_name
  is '类名称';
comment on column SYS_LOG_OPERATION.method
  is '方法名称';
comment on column SYS_LOG_OPERATION.success
  is '是否成功';
comment on column SYS_LOG_OPERATION.message
  is '具体消息';
comment on column SYS_LOG_OPERATION.create_time
  is '创建时间';
comment on column SYS_LOG_OPERATION.user_name
  is '用户名';
alter table SYS_LOG_OPERATION
  add constraint PK_SYS_LOG_OPERATION_ID primary key (ID);

prompt
prompt Creating table SYS_MESSAGE
prompt ==========================
prompt
create table SYS_MESSAGE
(
  id        INTEGER not null,
  title     VARCHAR2(200),
  content   VARCHAR2(200),
  source    INTEGER,
  type_code VARCHAR2(200),
  param     VARCHAR2(200),
  sfyx_st   CHAR(1)
)
;
comment on table SYS_MESSAGE
  is '系统消息表';
comment on column SYS_MESSAGE.id
  is '主键';
comment on column SYS_MESSAGE.title
  is '标题';
comment on column SYS_MESSAGE.content
  is '内容';
comment on column SYS_MESSAGE.source
  is '来源';
comment on column SYS_MESSAGE.type_code
  is '类型编码';
comment on column SYS_MESSAGE.param
  is '参数';
comment on column SYS_MESSAGE.sfyx_st
  is '有效状态 0无效 1有效';
create index IDX_MSG_TYPECODE on SYS_MESSAGE (TYPE_CODE);
alter table SYS_MESSAGE
  add constraint PK_SYS_MESSAGE_ID primary key (ID);

prompt
prompt Creating table SYS_MESSAGE_TYPE
prompt ===============================
prompt
create table SYS_MESSAGE_TYPE
(
  id           INTEGER not null,
  name         VARCHAR2(200),
  code         VARCHAR2(200),
  urgent_level CHAR(1),
  valid_time   INTEGER,
  skip_type    CHAR(1),
  win_size     VARCHAR2(200),
  operate_type CHAR(1),
  skip_path    VARCHAR2(200),
  sfyx_st      CHAR(1),
  description  VARCHAR2(200)
)
;
comment on table SYS_MESSAGE_TYPE
  is '消息类型表';
comment on column SYS_MESSAGE_TYPE.id
  is '主键';
comment on column SYS_MESSAGE_TYPE.name
  is '名称';
comment on column SYS_MESSAGE_TYPE.code
  is '编码，不可重复';
comment on column SYS_MESSAGE_TYPE.urgent_level
  is '紧急程度  1普通  2重要  3紧急';
comment on column SYS_MESSAGE_TYPE.valid_time
  is '有效时间  ';
comment on column SYS_MESSAGE_TYPE.skip_type
  is '跳转类型  1弹窗  2路径跳转 3无';
comment on column SYS_MESSAGE_TYPE.win_size
  is '窗口尺寸  1大 2中 3小 4树';
comment on column SYS_MESSAGE_TYPE.operate_type
  is '操作类型   1告知 2操作';
comment on column SYS_MESSAGE_TYPE.skip_path
  is '跳转路径';
comment on column SYS_MESSAGE_TYPE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_MESSAGE_TYPE.description
  is '描述';
create index IDX_MSGTYPE_CODE on SYS_MESSAGE_TYPE (CODE);
alter table SYS_MESSAGE_TYPE
  add constraint PK_SYS_MESSAGE_TYPE_ID primary key (ID);

prompt
prompt Creating table SYS_METADATA
prompt ===========================
prompt
create table SYS_METADATA
(
  id      INTEGER not null,
  name    VARCHAR2(50),
  code    VARCHAR2(50),
  type    CHAR(1),
  detail  VARCHAR2(100),
  cjr_id  INTEGER,
  cjsj    DATE,
  xgr_id  INTEGER,
  xgsj    DATE,
  sfyx_st CHAR(1)
)
;
comment on table SYS_METADATA
  is '元数据';
comment on column SYS_METADATA.id
  is 'ID';
comment on column SYS_METADATA.name
  is '元数据名称';
comment on column SYS_METADATA.code
  is '元数据编码';
comment on column SYS_METADATA.type
  is '实现类型，“1”数据表，“2”视图，“3”程序';
comment on column SYS_METADATA.detail
  is '实现细节，数据表名/视图名/程序包+方法名';
comment on column SYS_METADATA.cjr_id
  is '创建人ID';
comment on column SYS_METADATA.cjsj
  is '创建时间';
comment on column SYS_METADATA.xgr_id
  is '修改人ID';
comment on column SYS_METADATA.xgsj
  is '修改时间';
comment on column SYS_METADATA.sfyx_st
  is '是否有效，“0”无效，“1”有效';
alter table SYS_METADATA
  add constraint PK_SYS_METADATA primary key (ID);

prompt
prompt Creating table SYS_NESTED_NODE
prompt ==============================
prompt
create table SYS_NESTED_NODE
(
  id              INTEGER not null,
  workflow_id     INTEGER,
  defaultbacknode INTEGER
)
;
comment on table SYS_NESTED_NODE
  is '嵌套环节表';
comment on column SYS_NESTED_NODE.id
  is '主键';
comment on column SYS_NESTED_NODE.workflow_id
  is '流程ID';
comment on column SYS_NESTED_NODE.defaultbacknode
  is '默认退回环节ID';
alter table SYS_NESTED_NODE
  add constraint PK_SYS_NESTED_NODE_ID primary key (ID);

prompt
prompt Creating table SYS_NODE
prompt =======================
prompt
create table SYS_NODE
(
  id            INTEGER not null,
  name          VARCHAR2(50),
  x             NUMBER(4),
  y             NUMBER(4),
  type          CHAR(1),
  workflow_id   INTEGER,
  sort          INTEGER,
  cjr_id        INTEGER,
  cjsj          DATE,
  sfxscg        CHAR(1),
  sfbxscfj      CHAR(1),
  sfyx_st       CHAR(1),
  nature        CHAR(1),
  ywzt          VARCHAR2(30),
  showorganname CHAR(1),
  sfxstj        CHAR(1),
  code          VARCHAR2(50),
  opinion       VARCHAR2(50),
  sfxscb        CHAR(1),
  description   VARCHAR2(320),
  dom_id        VARCHAR2(64)
)
;
comment on table SYS_NODE
  is '环节表';
comment on column SYS_NODE.id
  is '主键';
comment on column SYS_NODE.name
  is '名称';
comment on column SYS_NODE.x
  is 'x坐标';
comment on column SYS_NODE.y
  is 'y坐标';
comment on column SYS_NODE.type
  is '环节类别：0开始环节 1结束环节 2活动环节 3传阅环节 4决策环节 5嵌套环节 6复合环节';
comment on column SYS_NODE.workflow_id
  is '所属流程id';
comment on column SYS_NODE.sort
  is '序号';
comment on column SYS_NODE.cjr_id
  is '创建人id';
comment on column SYS_NODE.cjsj
  is '创建时间';
comment on column SYS_NODE.sfxscg
  is '是否显示草稿';
comment on column SYS_NODE.sfbxscfj
  is '是否必须上传附件';
comment on column SYS_NODE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_NODE.nature
  is '分支聚合属性 1分支 2聚合 0普通';
comment on column SYS_NODE.ywzt
  is '业务状态 为字典项编码或环节名称';
comment on column SYS_NODE.showorganname
  is '是否显示机构名称（警卫二期时使用）';
comment on column SYS_NODE.sfxstj
  is '是否显示提交按钮';
comment on column SYS_NODE.code
  is '编码';
comment on column SYS_NODE.opinion
  is '环节默认意见';
comment on column SYS_NODE.sfxscb
  is '是否显示催办';
comment on column SYS_NODE.description
  is '环节描述';
comment on column SYS_NODE.dom_id
  is 'DOM元素ID';
create index IDX_NODE_WF_ID on SYS_NODE (WORKFLOW_ID);
alter table SYS_NODE
  add constraint PK_SYS_NODE_ID primary key (ID);

prompt
prompt Creating table SYS_NODE_BUTTON
prompt ==============================
prompt
create table SYS_NODE_BUTTON
(
  id             NUMBER not null,
  name           VARCHAR2(50),
  code           VARCHAR2(50),
  icon           VARCHAR2(50),
  flag           VARCHAR2(50),
  funcname       VARCHAR2(50),
  node_id        NUMBER,
  sfyx_st        CHAR(1),
  cjsj           DATE,
  xgsj           DATE,
  cjr_id         NUMBER,
  xgr_id         NUMBER,
  sort           NUMBER,
  isshowinhandle CHAR(1),
  type           CHAR(1),
  opinion        VARCHAR2(200)
)
;
comment on table SYS_NODE_BUTTON
  is '环节按钮配置表';
comment on column SYS_NODE_BUTTON.id
  is '主键';
comment on column SYS_NODE_BUTTON.name
  is '名称';
comment on column SYS_NODE_BUTTON.code
  is '编码';
comment on column SYS_NODE_BUTTON.icon
  is '图标';
comment on column SYS_NODE_BUTTON.flag
  is '标志位（）';
comment on column SYS_NODE_BUTTON.funcname
  is '处理函数';
comment on column SYS_NODE_BUTTON.node_id
  is '环节ID';
comment on column SYS_NODE_BUTTON.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_NODE_BUTTON.cjsj
  is '创建时间';
comment on column SYS_NODE_BUTTON.xgsj
  is '修改时间';
comment on column SYS_NODE_BUTTON.cjr_id
  is '创建人ID';
comment on column SYS_NODE_BUTTON.xgr_id
  is '修改人ID';
comment on column SYS_NODE_BUTTON.sort
  is '序号';
comment on column SYS_NODE_BUTTON.isshowinhandle
  is '显示时段 1办理中 2办理后 3业务控制';
comment on column SYS_NODE_BUTTON.type
  is '按钮类型：目前为1：提交，2：退回，3：草稿，4：撤回，5：删除，6：自定义';
comment on column SYS_NODE_BUTTON.opinion
  is '默认办理意见';
alter table SYS_NODE_BUTTON
  add constraint PK_SYS_NODE_BUTTON_ID primary key (ID);

prompt
prompt Creating table SYS_NODE_INSTANCE
prompt ================================
prompt
create table SYS_NODE_INSTANCE
(
  id                    INTEGER not null,
  node_id               INTEGER,
  workflow_instance_id  INTEGER,
  status                CHAR(1),
  finish_date           DATE,
  cjsj                  DATE,
  sfyx_st               CHAR(1),
  record                VARCHAR2(2000),
  submit_organ          INTEGER,
  back_organ            INTEGER,
  composite_node_ins_id INTEGER,
  type                  VARCHAR2(20),
  from_node_sort        INTEGER,
  from_node_ins_id      INTEGER
)
;
comment on table SYS_NODE_INSTANCE
  is '环节实例表';
comment on column SYS_NODE_INSTANCE.id
  is '主键';
comment on column SYS_NODE_INSTANCE.node_id
  is '所在环节ID';
comment on column SYS_NODE_INSTANCE.workflow_instance_id
  is '所在流程实例ID';
comment on column SYS_NODE_INSTANCE.status
  is '状态：1运行 2完成';
comment on column SYS_NODE_INSTANCE.finish_date
  is '完成时间';
comment on column SYS_NODE_INSTANCE.cjsj
  is '创建时间';
comment on column SYS_NODE_INSTANCE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_NODE_INSTANCE.record
  is '操作记录（机构:操作类型）（警卫二期使用）';
comment on column SYS_NODE_INSTANCE.submit_organ
  is '提交机构（警卫二期使用）';
comment on column SYS_NODE_INSTANCE.back_organ
  is '退回机构（警卫二期使用）';
comment on column SYS_NODE_INSTANCE.composite_node_ins_id
  is '复合环节实例ID（警卫二期使用）';
comment on column SYS_NODE_INSTANCE.type
  is '环节实例化类型(FIRST:首次提交  SUBMIT:提交  BACK:退回  RECOVER:撤回)';
comment on column SYS_NODE_INSTANCE.from_node_sort
  is '前办理环节序号';
comment on column SYS_NODE_INSTANCE.from_node_ins_id
  is '前环节实例ID';
create index IDX_NODEINS_NODE_ID on SYS_NODE_INSTANCE (NODE_ID);
create index IDX_NODEINS_WFINS_ID on SYS_NODE_INSTANCE (WORKFLOW_INSTANCE_ID);
alter table SYS_NODE_INSTANCE
  add constraint PK_SYS_NODE_INSTANCE_ID primary key (ID);

prompt
prompt Creating table SYS_NODE_PAGE
prompt ============================
prompt
create table SYS_NODE_PAGE
(
  id          INTEGER not null,
  title       VARCHAR2(50),
  node_id     INTEGER,
  page_id     INTEGER,
  control     CHAR(1),
  sort        INTEGER,
  cjr_id      INTEGER,
  cjsj        DATE,
  sfyx_st     CHAR(1),
  spx_name    VARCHAR2(100),
  spx_sort    INTEGER,
  spx_print   CHAR(1),
  diy_form_id INTEGER
)
;
comment on table SYS_NODE_PAGE
  is '环节页面表';
comment on column SYS_NODE_PAGE.id
  is '注解';
comment on column SYS_NODE_PAGE.title
  is '标题';
comment on column SYS_NODE_PAGE.node_id
  is '所属环节ID';
comment on column SYS_NODE_PAGE.page_id
  is '页面ID';
comment on column SYS_NODE_PAGE.control
  is '表单控制 0办理 1审批 2查看 3签章';
comment on column SYS_NODE_PAGE.sort
  is '序号';
comment on column SYS_NODE_PAGE.cjr_id
  is '创建人id';
comment on column SYS_NODE_PAGE.cjsj
  is '创建时间';
comment on column SYS_NODE_PAGE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_NODE_PAGE.spx_name
  is '审批项名称';
comment on column SYS_NODE_PAGE.spx_sort
  is '审批项序号';
comment on column SYS_NODE_PAGE.spx_print
  is '审批项是否打印 0否 1是';
comment on column SYS_NODE_PAGE.diy_form_id
  is 'page中的formId（冗余字段）';
create index IDX_NODEPAGE_NODE_ID on SYS_NODE_PAGE (NODE_ID);
alter table SYS_NODE_PAGE
  add constraint PK_SYS_NODE_PAGE_ID primary key (ID);

prompt
prompt Creating table SYS_NODE_RULE_ROLE
prompt =================================
prompt
create table SYS_NODE_RULE_ROLE
(
  id       INTEGER not null,
  node_id  INTEGER,
  rule_id  INTEGER,
  role_ids VARCHAR2(1000),
  cjr_id   INTEGER,
  cjsj     DATE,
  sfyx_st  CHAR(1)
)
;
comment on table SYS_NODE_RULE_ROLE
  is '环节办理人配置';
comment on column SYS_NODE_RULE_ROLE.id
  is 'ID';
comment on column SYS_NODE_RULE_ROLE.node_id
  is '所属环节ID';
comment on column SYS_NODE_RULE_ROLE.rule_id
  is '规则ID';
comment on column SYS_NODE_RULE_ROLE.role_ids
  is '角色ID';
comment on column SYS_NODE_RULE_ROLE.cjr_id
  is '创建人id';
comment on column SYS_NODE_RULE_ROLE.cjsj
  is '创建时间';
comment on column SYS_NODE_RULE_ROLE.sfyx_st
  is '有效状态 0无效 1有效';
create index IDX_NODERULEROLE_NODEID on SYS_NODE_RULE_ROLE (NODE_ID);
alter table SYS_NODE_RULE_ROLE
  add constraint PK_NODE_RULE_ROLE_ID primary key (ID);

prompt
prompt Creating table SYS_NODE_VARIABLE
prompt ================================
prompt
create table SYS_NODE_VARIABLE
(
  id           INTEGER not null,
  name         VARCHAR2(50),
  code         VARCHAR2(50),
  value        VARCHAR2(50),
  assign_logic VARCHAR2(500),
  node_id      INTEGER,
  sfyx_st      CHAR(1),
  workflow_id  INTEGER
)
;
comment on table SYS_NODE_VARIABLE
  is '环节变量（用于决策环节配置）';
comment on column SYS_NODE_VARIABLE.value
  is '默认值';
comment on column SYS_NODE_VARIABLE.assign_logic
  is '赋值逻辑';
comment on column SYS_NODE_VARIABLE.node_id
  is '环节id';
comment on column SYS_NODE_VARIABLE.workflow_id
  is '流程id';

prompt
prompt Creating table SYS_NODE_VARIABLE_ASSIGN
prompt =======================================
prompt
create table SYS_NODE_VARIABLE_ASSIGN
(
  id          INTEGER not null,
  variable_id INTEGER,
  node_id     INTEGER,
  expression  VARCHAR2(50),
  sfyx_st     CHAR(1)
)
;
comment on table SYS_NODE_VARIABLE_ASSIGN
  is '流程变量环节赋值表';
comment on column SYS_NODE_VARIABLE_ASSIGN.id
  is '主键';
comment on column SYS_NODE_VARIABLE_ASSIGN.variable_id
  is '流程变量ID';
comment on column SYS_NODE_VARIABLE_ASSIGN.node_id
  is '所属环节ID';
comment on column SYS_NODE_VARIABLE_ASSIGN.expression
  is '表达式';
comment on column SYS_NODE_VARIABLE_ASSIGN.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_NODE_VARIABLE_ASSIGN
  add constraint PK_SYS_NODE_VARIABLE_ASSIGN_ID primary key (ID);

prompt
prompt Creating table SYS_OBJECT
prompt =========================
prompt
create table SYS_OBJECT
(
  id          INTEGER not null,
  obj_name    VARCHAR2(50),
  obj_code    VARCHAR2(20),
  db_name     VARCHAR2(50),
  type        CHAR(1),
  description VARCHAR2(200),
  cjr_id      INTEGER,
  cjsj        DATE,
  xgr_id      INTEGER,
  xgsj        DATE,
  sfyx_st     CHAR(1),
  show_name   VARCHAR2(50)
)
;
comment on table SYS_OBJECT
  is '对象表';
comment on column SYS_OBJECT.id
  is 'ID';
comment on column SYS_OBJECT.obj_name
  is '对象名';
comment on column SYS_OBJECT.obj_code
  is '对象编码';
comment on column SYS_OBJECT.db_name
  is '数据库表名';
comment on column SYS_OBJECT.type
  is '对象类型 1:基础对象 2:业务对象 3:接口对象 4:实现对象 5:枚举对象 6:其它';
comment on column SYS_OBJECT.description
  is '描述';
comment on column SYS_OBJECT.cjr_id
  is '创建人';
comment on column SYS_OBJECT.cjsj
  is '创建时间';
comment on column SYS_OBJECT.xgr_id
  is '修改人';
comment on column SYS_OBJECT.xgsj
  is '修改时间';
comment on column SYS_OBJECT.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_OBJECT.show_name
  is '显示字段';

prompt
prompt Creating table SYS_ORGAN
prompt ========================
prompt
create table SYS_ORGAN
(
  id          INTEGER not null,
  organ_code  VARCHAR2(50),
  organ_name  VARCHAR2(100),
  full_name   VARCHAR2(200),
  parent_org  INTEGER,
  sort_num    INTEGER,
  description VARCHAR2(200),
  cjr_id      INTEGER,
  cjsj        DATE,
  xgr_id      INTEGER,
  xgsj        DATE,
  sfyx_st     CHAR(1),
  organ_level CHAR(1)
)
;
comment on table SYS_ORGAN
  is '机构';
comment on column SYS_ORGAN.id
  is '主键ID';
comment on column SYS_ORGAN.organ_code
  is '机构代码';
comment on column SYS_ORGAN.organ_name
  is '机构名称';
comment on column SYS_ORGAN.full_name
  is '组织机构全称';
comment on column SYS_ORGAN.parent_org
  is '上级机构';
comment on column SYS_ORGAN.sort_num
  is '显示顺序';
comment on column SYS_ORGAN.description
  is '备注';
comment on column SYS_ORGAN.cjr_id
  is '创建人';
comment on column SYS_ORGAN.cjsj
  is '创建时间';
comment on column SYS_ORGAN.xgr_id
  is '修改人';
comment on column SYS_ORGAN.xgsj
  is '修改时间';
comment on column SYS_ORGAN.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_ORGAN.organ_level
  is '组织机构级别';
create index IDX_ORGAN_PARENT_ORG on SYS_ORGAN (PARENT_ORG);
alter table SYS_ORGAN
  add constraint PK_SYS_ORGAN_ID primary key (ID);

prompt
prompt Creating table SYS_REPORT_FORM
prompt ==============================
prompt
create table SYS_REPORT_FORM
(
  id          INTEGER not null,
  name        VARCHAR2(50),
  metadata_id INTEGER,
  type        VARCHAR2(2),
  url         VARCHAR2(200),
  rule_type   CHAR(1),
  cjr_id      INTEGER,
  cjsj        DATE,
  xgr_id      INTEGER,
  xgsj        DATE,
  sfyx_st     CHAR(1)
)
;
comment on table SYS_REPORT_FORM
  is '报表';
comment on column SYS_REPORT_FORM.id
  is 'ID';
comment on column SYS_REPORT_FORM.name
  is '报表名称';
comment on column SYS_REPORT_FORM.metadata_id
  is '元数据ID';
comment on column SYS_REPORT_FORM.type
  is '报表类型，”1“表格，”2“柱状图，”3“折线图，”4“饼状图';
comment on column SYS_REPORT_FORM.url
  is '报表地址';
comment on column SYS_REPORT_FORM.rule_type
  is '规则类型';
comment on column SYS_REPORT_FORM.cjr_id
  is '创建人ID';
comment on column SYS_REPORT_FORM.cjsj
  is '创建时间';
comment on column SYS_REPORT_FORM.xgr_id
  is '修改人ID';
comment on column SYS_REPORT_FORM.xgsj
  is '修改时间';
comment on column SYS_REPORT_FORM.sfyx_st
  is '是否有效，“0”无效，“1”有效';
alter table SYS_REPORT_FORM
  add constraint PK_SYS_REPORT_FORM primary key (ID);

prompt
prompt Creating table SYS_REPORT_PROPERTY
prompt ==================================
prompt
create table SYS_REPORT_PROPERTY
(
  id              INTEGER not null,
  report_form_id  INTEGER,
  name            VARCHAR2(50),
  code            VARCHAR2(50),
  metadata_column VARCHAR2(30),
  type            CHAR(1),
  group_type      CHAR(1),
  calculate_type  CHAR(1),
  order_type      CHAR(1),
  cjr_id          INTEGER,
  cjsj            DATE,
  xgr_id          INTEGER,
  xgsj            DATE,
  sfyx_st         CHAR(1),
  data_type       VARCHAR2(20)
)
;
comment on table SYS_REPORT_PROPERTY
  is '报表字段';
comment on column SYS_REPORT_PROPERTY.id
  is 'ID';
comment on column SYS_REPORT_PROPERTY.report_form_id
  is '所属报表ID';
comment on column SYS_REPORT_PROPERTY.name
  is '字段名称';
comment on column SYS_REPORT_PROPERTY.code
  is '字段编码';
comment on column SYS_REPORT_PROPERTY.metadata_column
  is '元数据字段';
comment on column SYS_REPORT_PROPERTY.type
  is '字段类型，“1”分组字段，“2”运算字段';
comment on column SYS_REPORT_PROPERTY.group_type
  is '分组方式，“1”按值分组，“2”按范围分组';
comment on column SYS_REPORT_PROPERTY.calculate_type
  is '运算方式，“1”计数，“2”合计，“3”平均值，“4”最大值，“5”最小值，“6”中位数';
comment on column SYS_REPORT_PROPERTY.order_type
  is '排序方式，“0”默认，“1”升序，“2”降序';
comment on column SYS_REPORT_PROPERTY.cjr_id
  is '创建人ID';
comment on column SYS_REPORT_PROPERTY.cjsj
  is '创建时间';
comment on column SYS_REPORT_PROPERTY.xgr_id
  is '修改人ID';
comment on column SYS_REPORT_PROPERTY.xgsj
  is '修改时间';
comment on column SYS_REPORT_PROPERTY.sfyx_st
  is '是否有效，“0”无效，“1”有效';
comment on column SYS_REPORT_PROPERTY.data_type
  is '数据类型，由元数据字段数据类型设置值';
alter table SYS_REPORT_PROPERTY
  add constraint PK_SYS_REPORT_PROPERTY primary key (ID);

prompt
prompt Creating table SYS_REPORT_SETTING
prompt =================================
prompt
create table SYS_REPORT_SETTING
(
  id             INTEGER not null,
  report_form_id INTEGER,
  name           VARCHAR2(50),
  code           VARCHAR2(50),
  value          VARCHAR2(100),
  cjr_id         INTEGER,
  cjsj           DATE,
  xgr_id         INTEGER,
  xgsj           DATE,
  sfyx_st        CHAR(1)
)
;
comment on table SYS_REPORT_SETTING
  is '报表配置';
comment on column SYS_REPORT_SETTING.id
  is 'ID';
comment on column SYS_REPORT_SETTING.report_form_id
  is '所属报表ID';
comment on column SYS_REPORT_SETTING.name
  is '配置名称';
comment on column SYS_REPORT_SETTING.code
  is '配置编码';
comment on column SYS_REPORT_SETTING.value
  is '配置值';
comment on column SYS_REPORT_SETTING.cjr_id
  is '创建人ID';
comment on column SYS_REPORT_SETTING.cjsj
  is '创建时间';
comment on column SYS_REPORT_SETTING.xgr_id
  is '修改人ID';
comment on column SYS_REPORT_SETTING.xgsj
  is '修改时间';
comment on column SYS_REPORT_SETTING.sfyx_st
  is '是否有效，“0”无效，“1”有效';
alter table SYS_REPORT_SETTING
  add constraint PK_SYS_REPORT_SETTING primary key (ID);

prompt
prompt Creating table SYS_RESOURCE
prompt ===========================
prompt
create table SYS_RESOURCE
(
  id             INTEGER not null,
  name           VARCHAR2(50),
  code           VARCHAR2(50),
  type           VARCHAR2(10),
  parent_id      INTEGER,
  sort           INTEGER,
  url            VARCHAR2(200),
  icon           VARCHAR2(10),
  biz_type       VARCHAR2(21),
  cjr_id         INTEGER,
  cjsj           DATE,
  xgr_id         INTEGER,
  xgsj           DATE,
  sfyx_st        CHAR(1),
  description    VARCHAR2(200),
  parent_type    VARCHAR2(10),
  show_parent_id INTEGER,
  target_id      INTEGER,
  form_id        INTEGER
)
;
comment on table SYS_RESOURCE
  is '资源表';
comment on column SYS_RESOURCE.id
  is '主键';
comment on column SYS_RESOURCE.name
  is '资源名称';
comment on column SYS_RESOURCE.code
  is '资源编码';
comment on column SYS_RESOURCE.type
  is '资源类型 app应用 menu菜单 page页面 func功能';
comment on column SYS_RESOURCE.parent_id
  is '上级资源id';
comment on column SYS_RESOURCE.sort
  is '序号';
comment on column SYS_RESOURCE.url
  is '访问url';
comment on column SYS_RESOURCE.icon
  is '图标';
comment on column SYS_RESOURCE.biz_type
  is '业务类型';
comment on column SYS_RESOURCE.cjr_id
  is '创建人id';
comment on column SYS_RESOURCE.cjsj
  is '创建时间';
comment on column SYS_RESOURCE.xgr_id
  is '修改人id';
comment on column SYS_RESOURCE.xgsj
  is '修改时间';
comment on column SYS_RESOURCE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_RESOURCE.description
  is '描述';
comment on column SYS_RESOURCE.parent_type
  is '上级资源类型';
comment on column SYS_RESOURCE.show_parent_id
  is '树显示父级id';
comment on column SYS_RESOURCE.target_id
  is '目标下级资源id（目前用来处理url）';
comment on column SYS_RESOURCE.form_id
  is '表单设计器设计的表单id';
create index IDX_RESOURCE_PARENT_ID on SYS_RESOURCE (PARENT_ID);
alter table SYS_RESOURCE
  add constraint PK_SYS_RESOURCE_ID primary key (ID);

prompt
prompt Creating table SYS_ROLE
prompt =======================
prompt
create table SYS_ROLE
(
  id             INTEGER not null,
  role_name      VARCHAR2(50),
  role_code      VARCHAR2(20),
  role_type      VARCHAR2(20),
  description    VARCHAR2(200),
  cjr_id         INTEGER,
  cjsj           DATE,
  xgr_id         INTEGER,
  xgsj           DATE,
  sfyx_st        CHAR(1),
  auth_type      CHAR(1),
  levels         VARCHAR2(10),
  role_made      VARCHAR2(20),
  is_combine     CHAR(1) default '0',
  create_role_id INTEGER
)
;
comment on table SYS_ROLE
  is '角色表';
comment on column SYS_ROLE.id
  is '主键';
comment on column SYS_ROLE.role_name
  is '角色名称';
comment on column SYS_ROLE.role_code
  is '角色代码';
comment on column SYS_ROLE.role_type
  is '角色类型 | 1业务角色 2流程角色 3岗位角色';
comment on column SYS_ROLE.description
  is '描述';
comment on column SYS_ROLE.cjr_id
  is '创建人';
comment on column SYS_ROLE.cjsj
  is '创建时间';
comment on column SYS_ROLE.xgr_id
  is '修改人';
comment on column SYS_ROLE.xgsj
  is '修改时间';
comment on column SYS_ROLE.sfyx_st
  is '有效状态 | 0无效 1有效';
comment on column SYS_ROLE.auth_type
  is '权限类型';
comment on column SYS_ROLE.levels
  is '级别 | 1系统管理员 2业务管理员 3业务用户';
comment on column SYS_ROLE.role_made
  is '角色组成类别 |  1固定用户 2动态逻辑';
comment on column SYS_ROLE.is_combine
  is '是否组合角色  | 1是 0否';
comment on column SYS_ROLE.create_role_id
  is '创建的角色id：管理员级别可以创建角色，记录此管理员id';
alter table SYS_ROLE
  add constraint PK_SYS_ROLE_ID primary key (ID);

prompt
prompt Creating table SYS_ROUTER
prompt =========================
prompt
create table SYS_ROUTER
(
  id            INTEGER not null,
  name          VARCHAR2(50),
  branch        VARCHAR2(100),
  start_node_id INTEGER,
  end_node_id   INTEGER,
  workflow_id   INTEGER,
  cjr_id        INTEGER,
  cjsj          DATE,
  sfyx_st       CHAR(1),
  dom_id        VARCHAR2(64)
)
;
comment on table SYS_ROUTER
  is '流向表';
comment on column SYS_ROUTER.id
  is '主键';
comment on column SYS_ROUTER.name
  is '名称';
comment on column SYS_ROUTER.branch
  is '分支条件';
comment on column SYS_ROUTER.start_node_id
  is '上一环节ID';
comment on column SYS_ROUTER.end_node_id
  is '下一环节ID';
comment on column SYS_ROUTER.workflow_id
  is '所属流程ID';
comment on column SYS_ROUTER.cjr_id
  is '创建人';
comment on column SYS_ROUTER.cjsj
  is '创建时间';
comment on column SYS_ROUTER.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_ROUTER.dom_id
  is 'DOM元素ID';
create index IDX_ROUTER_END_ID on SYS_ROUTER (END_NODE_ID);
create index IDX_ROUTER_START_ID on SYS_ROUTER (START_NODE_ID);
create index IDX_ROUTER_WF_ID on SYS_ROUTER (WORKFLOW_ID);
alter table SYS_ROUTER
  add constraint PK_SYS_ROUTER_ID primary key (ID);

prompt
prompt Creating table SYS_ROUTER_INSTANCE
prompt ==================================
prompt
create table SYS_ROUTER_INSTANCE
(
  id                     INTEGER not null,
  router_id              INTEGER,
  start_node_instance_id INTEGER,
  end_node_instance_id   INTEGER,
  workflow_instance_id   INTEGER,
  cjsj                   DATE,
  sfyx_st                CHAR(1)
)
;
comment on table SYS_ROUTER_INSTANCE
  is '流向实例表（暂未使用）';
comment on column SYS_ROUTER_INSTANCE.id
  is '主键';
comment on column SYS_ROUTER_INSTANCE.router_id
  is '流向ID';
comment on column SYS_ROUTER_INSTANCE.start_node_instance_id
  is '开始环节实例ID';
comment on column SYS_ROUTER_INSTANCE.end_node_instance_id
  is '结束环节实例ID';
comment on column SYS_ROUTER_INSTANCE.workflow_instance_id
  is '所属流程实例ID';
comment on column SYS_ROUTER_INSTANCE.cjsj
  is '创建时间';
comment on column SYS_ROUTER_INSTANCE.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_ROUTER_INSTANCE
  add constraint PK_SYS_ROUTER_INSTANCE_ID primary key (ID);

prompt
prompt Creating table SYS_SUBDICT
prompt ==========================
prompt
create table SYS_SUBDICT
(
  id         INTEGER not null,
  dict_code  VARCHAR2(30),
  code       VARCHAR2(30),
  value      VARCHAR2(100),
  sort       INTEGER,
  pcode      VARCHAR2(30),
  pdict_code VARCHAR2(30),
  remark     VARCHAR2(200),
  cjr_id     INTEGER,
  cjsj       DATE,
  xgr_id     INTEGER,
  xgsj       DATE,
  sfyx_st    CHAR(1),
  dict_id    INTEGER
)
;
comment on table SYS_SUBDICT
  is '系统字典表（从表）';
comment on column SYS_SUBDICT.id
  is '主键';
comment on column SYS_SUBDICT.dict_code
  is '字典编码';
comment on column SYS_SUBDICT.code
  is '字典项编码';
comment on column SYS_SUBDICT.value
  is '字典项值';
comment on column SYS_SUBDICT.sort
  is '字典项序号';
comment on column SYS_SUBDICT.pcode
  is '上级字典项编码';
comment on column SYS_SUBDICT.pdict_code
  is '上级字典编码';
comment on column SYS_SUBDICT.remark
  is '备注';
comment on column SYS_SUBDICT.cjr_id
  is '创建人id';
comment on column SYS_SUBDICT.cjsj
  is '创建时间';
comment on column SYS_SUBDICT.xgr_id
  is '修改人id';
comment on column SYS_SUBDICT.xgsj
  is '修改时间';
comment on column SYS_SUBDICT.sfyx_st
  is '有效状态 |0无效 1有效';
comment on column SYS_SUBDICT.dict_id
  is '字典ID 对应SYS_DICT表主键(ID)';
create index IDX_SUBDICT_DICT_ID on SYS_SUBDICT (DICT_ID);
alter table SYS_SUBDICT
  add constraint PK_SYS_SYS_SUBDICT_ID primary key (ID);

prompt
prompt Creating table SYS_TASK_INSTANCE
prompt ================================
prompt
create table SYS_TASK_INSTANCE
(
  id                   INTEGER not null,
  user_id              INTEGER,
  node_instance_id     INTEGER,
  workflow_instance_id INTEGER,
  status               CHAR(1),
  action               CHAR(1),
  opinion              VARCHAR2(500),
  branch               VARCHAR2(500),
  is_finish            CHAR(1),
  cjsj                 DATE,
  accept_date          DATE,
  finish_date          DATE,
  fj_id                VARCHAR2(40),
  sfyx_st              CHAR(1),
  is_wbrw              CHAR(1),
  former_user_id       INTEGER
)
;
comment on table SYS_TASK_INSTANCE
  is '任务实例表';
comment on column SYS_TASK_INSTANCE.id
  is '主键';
comment on column SYS_TASK_INSTANCE.user_id
  is '办理人';
comment on column SYS_TASK_INSTANCE.node_instance_id
  is '所在环节实例';
comment on column SYS_TASK_INSTANCE.workflow_instance_id
  is '所在流程实例';
comment on column SYS_TASK_INSTANCE.status
  is '任务状态 0待办1在办2已办3抢占终止4会签终止5传阅终止6异步终止7被撤回8被退回';
comment on column SYS_TASK_INSTANCE.action
  is '办理动作 1无动作  2签收  3提交  4退回  5撤回  6转办';
comment on column SYS_TASK_INSTANCE.opinion
  is '环节意见';
comment on column SYS_TASK_INSTANCE.branch
  is '所选择的决策条件';
comment on column SYS_TASK_INSTANCE.is_finish
  is '是否完成 0未完成  1完成';
comment on column SYS_TASK_INSTANCE.cjsj
  is '创建(派发)时间';
comment on column SYS_TASK_INSTANCE.accept_date
  is '签收时间';
comment on column SYS_TASK_INSTANCE.finish_date
  is '结束时间';
comment on column SYS_TASK_INSTANCE.fj_id
  is '附件ID';
comment on column SYS_TASK_INSTANCE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_TASK_INSTANCE.is_wbrw
  is '是否委办任务 0否 1是';
comment on column SYS_TASK_INSTANCE.former_user_id
  is '原办理人ID';
create index IDX_TASKINS_NODEINS_ID on SYS_TASK_INSTANCE (NODE_INSTANCE_ID);
create index IDX_TASKINS_WFINS_ID on SYS_TASK_INSTANCE (WORKFLOW_INSTANCE_ID);
alter table SYS_TASK_INSTANCE
  add constraint PK_SYS_TASK_INSTANCE_ID primary key (ID);

prompt
prompt Creating table SYS_TASK_PAGE_INSTANCE
prompt =====================================
prompt
create table SYS_TASK_PAGE_INSTANCE
(
  id                INTEGER not null,
  task_instance_id  INTEGER,
  workflow_page_id  INTEGER,
  data_id           INTEGER,
  tmp_data_json     CLOB,
  cjsj              DATE,
  sfyx_st           CHAR(1),
  xgsj              DATE,
  node_page_id      INTEGER,
  page_id           INTEGER,
  task_page_opinion VARCHAR2(500),
  if_opinion_show   CHAR(1),
  path              VARCHAR2(400)
)
;

prompt
prompt Creating table SYS_TEACHER
prompt ==========================
prompt
create table SYS_TEACHER
(
  id      INTEGER not null,
  name    VARCHAR2(100),
  xgsj    DATE,
  sfyx_st CHAR(1),
  qjsc    INTEGER
)
;
comment on table SYS_TEACHER
  is '教师表（流程测试使用）';
comment on column SYS_TEACHER.id
  is '主键';
comment on column SYS_TEACHER.name
  is '名称';
comment on column SYS_TEACHER.xgsj
  is '修改时间';
comment on column SYS_TEACHER.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_TEACHER.qjsc
  is '请假时长';
alter table SYS_TEACHER
  add constraint PK_SYS_TEACHER_ID primary key (ID);

prompt
prompt Creating table SYS_TEMP_FBT
prompt ===========================
prompt
create global temporary table SYS_TEMP_FBT
(
  schema      VARCHAR2(32),
  object_name VARCHAR2(32),
  object#     NUMBER,
  rid         UROWID(4000),
  action      CHAR(1)
)
on commit preserve rows;

prompt
prompt Creating table SYS_TRANSACT_NODE
prompt ================================
prompt
create table SYS_TRANSACT_NODE
(
  id              INTEGER not null,
  role_id         INTEGER,
  startup_process VARCHAR2(2000),
  finish_process  VARCHAR2(2000),
  auto_process    VARCHAR2(2000)
)
;
comment on table SYS_TRANSACT_NODE
  is '办理环节表';
comment on column SYS_TRANSACT_NODE.id
  is '主键';
comment on column SYS_TRANSACT_NODE.role_id
  is '角色ID';
comment on column SYS_TRANSACT_NODE.startup_process
  is '前处理程序';
comment on column SYS_TRANSACT_NODE.finish_process
  is '后处理程序';
comment on column SYS_TRANSACT_NODE.auto_process
  is '自动办理（未使用）';
alter table SYS_TRANSACT_NODE
  add constraint PK_SYS_TRANSACT_NODE_ID primary key (ID);

prompt
prompt Creating table SYS_USER
prompt =======================
prompt
create table SYS_USER
(
  id               INTEGER not null,
  login_name       VARCHAR2(50),
  login_pwd        VARCHAR2(128),
  user_name        VARCHAR2(100),
  default_organ_id INTEGER,
  sort             INTEGER,
  cjr_id           INTEGER,
  cjsj             DATE,
  xgr_id           INTEGER,
  xgsj             DATE,
  sfyx_st          CHAR(1),
  is_blocked       CHAR(1),
  sex              VARCHAR2(30),
  info_id          INTEGER
)
;
comment on table SYS_USER
  is '用户表';
comment on column SYS_USER.login_name
  is '登录名';
comment on column SYS_USER.login_pwd
  is '登录密码';
comment on column SYS_USER.user_name
  is '用户名';
comment on column SYS_USER.default_organ_id
  is '默认组织';
comment on column SYS_USER.sort
  is '序号';
comment on column SYS_USER.cjr_id
  is '创建人';
comment on column SYS_USER.cjsj
  is '创建时间';
comment on column SYS_USER.xgr_id
  is '修改时间';
comment on column SYS_USER.xgsj
  is '修改时间';
comment on column SYS_USER.sfyx_st
  is '有效状态';
comment on column SYS_USER.is_blocked
  is '是否封锁 0否 1是';
comment on column SYS_USER.sex
  is '性别';
comment on column SYS_USER.info_id
  is '个人信息';
alter table SYS_USER
  add constraint PK_SYS_USER_ID primary key (ID);

prompt
prompt Creating table SYS_USER_INFO
prompt ============================
prompt
create table SYS_USER_INFO
(
  id      INTEGER,
  sfzhm   VARCHAR2(18),
  sfyx_st CHAR(1),
  user_id INTEGER,
  xgsj    DATE,
  cjsj    DATE,
  xgr_id  INTEGER,
  age     NUMBER(3) default 0
)
;
comment on table SYS_USER_INFO
  is '用户信息';
comment on column SYS_USER_INFO.sfzhm
  is '身份证号码';
comment on column SYS_USER_INFO.sfyx_st
  is '是否有效';
comment on column SYS_USER_INFO.user_id
  is '用户id';
comment on column SYS_USER_INFO.xgsj
  is '修改时间';
comment on column SYS_USER_INFO.cjsj
  is '创建时间';
comment on column SYS_USER_INFO.xgr_id
  is '创建人';
comment on column SYS_USER_INFO.age
  is '年龄，简单报表测试用（误删）';

prompt
prompt Creating table SYS_WF_AUTO_HANDLE_USER
prompt ======================================
prompt
create table SYS_WF_AUTO_HANDLE_USER
(
  workflow_instance_id INTEGER,
  node_id              INTEGER,
  user_id              INTEGER
)
;
comment on table SYS_WF_AUTO_HANDLE_USER
  is '流程自动办理参考表';
comment on column SYS_WF_AUTO_HANDLE_USER.workflow_instance_id
  is '流程实例ID';
comment on column SYS_WF_AUTO_HANDLE_USER.node_id
  is '环节ID';
comment on column SYS_WF_AUTO_HANDLE_USER.user_id
  is '办理人ID';

prompt
prompt Creating table SYS_WORKFLOW
prompt ===========================
prompt
create table SYS_WORKFLOW
(
  id                  INTEGER not null,
  code                VARCHAR2(50),
  name                VARCHAR2(50),
  type_id             INTEGER,
  priority            CHAR(1),
  startup_process     VARCHAR2(2000),
  finish_process      VARCHAR2(2000),
  instance_title      VARCHAR2(50),
  version             INTEGER,
  workflow_id         INTEGER,
  description         VARCHAR2(100),
  cjr_id              INTEGER,
  cjsj                DATE,
  sfyx_st             CHAR(1),
  workflowywztzd      VARCHAR2(50),
  workflow_type       CHAR(1),
  has_msg             CHAR(1),
  node_code_dict_code VARCHAR2(50),
  islatestversion     CHAR(1),
  bpmn_def            CLOB,
  status              CHAR(1)
)
;
comment on table SYS_WORKFLOW
  is '流程表';
comment on column SYS_WORKFLOW.id
  is '主键';
comment on column SYS_WORKFLOW.code
  is '编码';
comment on column SYS_WORKFLOW.name
  is '名称';
comment on column SYS_WORKFLOW.type_id
  is '所属流程类别ID';
comment on column SYS_WORKFLOW.priority
  is '优先级 0高 1中 2低';
comment on column SYS_WORKFLOW.startup_process
  is '前处理程序';
comment on column SYS_WORKFLOW.finish_process
  is '后处理程序';
comment on column SYS_WORKFLOW.instance_title
  is '初始流程实例标题';
comment on column SYS_WORKFLOW.version
  is '版本号（暂未实现）';
comment on column SYS_WORKFLOW.workflow_id
  is '原始流程ID';
comment on column SYS_WORKFLOW.description
  is '描述';
comment on column SYS_WORKFLOW.cjr_id
  is '创建人';
comment on column SYS_WORKFLOW.cjsj
  is '创建时间';
comment on column SYS_WORKFLOW.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_WORKFLOW.workflowywztzd
  is '业务状态字典编码';
comment on column SYS_WORKFLOW.workflow_type
  is '是否复合流程（警卫二期使用）';
comment on column SYS_WORKFLOW.has_msg
  is '是否产生消息（暂未实现）';
comment on column SYS_WORKFLOW.node_code_dict_code
  is '环节编码字典编码';
comment on column SYS_WORKFLOW.islatestversion
  is '是否为最新版 0:不是 1:是';
comment on column SYS_WORKFLOW.bpmn_def
  is 'BPMN定义';
comment on column SYS_WORKFLOW.status
  is '状态 0草稿 1启用 2未启用';
create index IDX_WF_TYPE_ID on SYS_WORKFLOW (TYPE_ID);
alter table SYS_WORKFLOW
  add constraint PK_SYS_WORKFLOW_ID primary key (ID);

prompt
prompt Creating table SYS_WORKFLOW_INSTANCE
prompt ====================================
prompt
create table SYS_WORKFLOW_INSTANCE
(
  id              INTEGER not null,
  workflow_id     INTEGER,
  title           VARCHAR2(2000),
  initial_value   VARCHAR2(1500),
  status          CHAR(1),
  startup_user_id INTEGER,
  data_id         INTEGER,
  source_data     VARCHAR2(4000),
  startup_type    CHAR(1),
  finish_date     DATE,
  bz              VARCHAR2(100),
  cjsj            DATE,
  sfyx_st         CHAR(1),
  organ           INTEGER
)
;
comment on table SYS_WORKFLOW_INSTANCE
  is '流程实例表';
comment on column SYS_WORKFLOW_INSTANCE.id
  is '主键';
comment on column SYS_WORKFLOW_INSTANCE.workflow_id
  is '所属流程ID';
comment on column SYS_WORKFLOW_INSTANCE.title
  is '实例标题';
comment on column SYS_WORKFLOW_INSTANCE.initial_value
  is '初始值';
comment on column SYS_WORKFLOW_INSTANCE.status
  is '状态：0完成（正常结束）1挂起 2运行 3终止（异常结束） 4未正常启动 5未提交';
comment on column SYS_WORKFLOW_INSTANCE.startup_user_id
  is '流程启动人ID';
comment on column SYS_WORKFLOW_INSTANCE.data_id
  is '数据ID';
comment on column SYS_WORKFLOW_INSTANCE.source_data
  is '对象ID的集合';
comment on column SYS_WORKFLOW_INSTANCE.startup_type
  is '启动类型 0人工  1嵌套';
comment on column SYS_WORKFLOW_INSTANCE.finish_date
  is '结束时间';
comment on column SYS_WORKFLOW_INSTANCE.bz
  is '备注';
comment on column SYS_WORKFLOW_INSTANCE.cjsj
  is '创建时间';
comment on column SYS_WORKFLOW_INSTANCE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_WORKFLOW_INSTANCE.organ
  is '机构ID  子流程启动时维护（警卫二期）';
create index IDX_WFINS_DATA_ID on SYS_WORKFLOW_INSTANCE (DATA_ID);
alter table SYS_WORKFLOW_INSTANCE
  add constraint PK_SYS_WORKFLOW_INSTANCE_ID primary key (ID);

prompt
prompt Creating table SYS_WORKFLOW_PAGE
prompt ================================
prompt
create table SYS_WORKFLOW_PAGE
(
  id          INTEGER not null,
  name        VARCHAR2(50),
  workflow_id INTEGER,
  page_id     INTEGER,
  sort        INTEGER,
  sfyx_st     CHAR(1),
  diy_form_id INTEGER
)
;
comment on table SYS_WORKFLOW_PAGE
  is '流程页面表';
comment on column SYS_WORKFLOW_PAGE.id
  is '主键';
comment on column SYS_WORKFLOW_PAGE.name
  is '名称';
comment on column SYS_WORKFLOW_PAGE.workflow_id
  is '所属流程ID';
comment on column SYS_WORKFLOW_PAGE.page_id
  is '页面ID';
comment on column SYS_WORKFLOW_PAGE.sort
  is '序号';
comment on column SYS_WORKFLOW_PAGE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_WORKFLOW_PAGE.diy_form_id
  is '页面ID中form_id（冗余字段，为了快速获取）';
create index IDX_WFPAGE_WF_ID on SYS_WORKFLOW_PAGE (WORKFLOW_ID);
alter table SYS_WORKFLOW_PAGE
  add constraint PK_SYS_WORKFLOW_PAGE_ID primary key (ID);

prompt
prompt Creating table SYS_WORKFLOW_PAGE_DATA_INS
prompt =========================================
prompt
create table SYS_WORKFLOW_PAGE_DATA_INS
(
  id                   INTEGER not null,
  workflow_instance_id INTEGER,
  page_id              INTEGER,
  data_id              INTEGER,
  form_id              INTEGER,
  sfyx_st              CHAR(1)
)
;
comment on table SYS_WORKFLOW_PAGE_DATA_INS
  is '流程中资源页面id和数据关联表';
comment on column SYS_WORKFLOW_PAGE_DATA_INS.id
  is 'id';
comment on column SYS_WORKFLOW_PAGE_DATA_INS.workflow_instance_id
  is '流程实例id';
comment on column SYS_WORKFLOW_PAGE_DATA_INS.page_id
  is '页面id';
comment on column SYS_WORKFLOW_PAGE_DATA_INS.data_id
  is '数据id';
comment on column SYS_WORKFLOW_PAGE_DATA_INS.form_id
  is '表单设计器中的表单id';

prompt
prompt Creating table SYS_WORKFLOW_RULE_ROLE
prompt =====================================
prompt
create table SYS_WORKFLOW_RULE_ROLE
(
  id          INTEGER not null,
  role_id     INTEGER,
  rule_id     INTEGER,
  sfyx_st     CHAR(1),
  workflow_id INTEGER
)
;
comment on table SYS_WORKFLOW_RULE_ROLE
  is '规则与业务角色关联表';
comment on column SYS_WORKFLOW_RULE_ROLE.id
  is '主键';
comment on column SYS_WORKFLOW_RULE_ROLE.role_id
  is '角色ID';
comment on column SYS_WORKFLOW_RULE_ROLE.rule_id
  is '规则ID';
comment on column SYS_WORKFLOW_RULE_ROLE.sfyx_st
  is '有效状态 0无效 1有效';
comment on column SYS_WORKFLOW_RULE_ROLE.workflow_id
  is '流程ID';
create index IDX_GLB_FRR_ROLE_ID on SYS_WORKFLOW_RULE_ROLE (ROLE_ID);
create index IDX_GLB_FRR_RULE_ID on SYS_WORKFLOW_RULE_ROLE (RULE_ID);
create index IDX_GLB_FRR_WORKFLOW_ID on SYS_WORKFLOW_RULE_ROLE (WORKFLOW_ID);
alter table SYS_WORKFLOW_RULE_ROLE
  add constraint PK_SYS_GLB_BIZROLE_AUTHRULE_ID primary key (ID);

prompt
prompt Creating table SYS_WORKFLOW_TYPE
prompt ================================
prompt
create table SYS_WORKFLOW_TYPE
(
  id          INTEGER not null,
  name        VARCHAR2(50),
  parent_id   INTEGER,
  description VARCHAR2(100),
  cjr_id      INTEGER,
  cjsj        DATE,
  xgr_id      INTEGER,
  xgsj        DATE,
  sfyx_st     CHAR(1)
)
;
comment on table SYS_WORKFLOW_TYPE
  is '流程类别表';
comment on column SYS_WORKFLOW_TYPE.id
  is '主键';
comment on column SYS_WORKFLOW_TYPE.name
  is '名称';
comment on column SYS_WORKFLOW_TYPE.parent_id
  is '上级类别ID';
comment on column SYS_WORKFLOW_TYPE.description
  is '描述';
comment on column SYS_WORKFLOW_TYPE.cjr_id
  is '创建人ID';
comment on column SYS_WORKFLOW_TYPE.cjsj
  is '创建时间';
comment on column SYS_WORKFLOW_TYPE.xgr_id
  is '修改人ID';
comment on column SYS_WORKFLOW_TYPE.xgsj
  is '修改时间';
comment on column SYS_WORKFLOW_TYPE.sfyx_st
  is '有效状态 0无效 1有效';
create index IDX_WFTYPE_PARENT_ID on SYS_WORKFLOW_TYPE (PARENT_ID);
alter table SYS_WORKFLOW_TYPE
  add constraint PK_SYS_WORKFLOW_TYPE_ID primary key (ID);

prompt
prompt Creating table SYS_WORKFLOW_VARIABLE
prompt ====================================
prompt
create table SYS_WORKFLOW_VARIABLE
(
  id            INTEGER not null,
  name          VARCHAR2(50),
  workflow_id   INTEGER,
  initial_value VARCHAR2(100),
  cjr_id        INTEGER,
  cjsj          DATE,
  sfyx_st       CHAR(1)
)
;
comment on table SYS_WORKFLOW_VARIABLE
  is '流程变量表';
comment on column SYS_WORKFLOW_VARIABLE.id
  is '主键';
comment on column SYS_WORKFLOW_VARIABLE.name
  is '名称';
comment on column SYS_WORKFLOW_VARIABLE.workflow_id
  is '所属流程ID';
comment on column SYS_WORKFLOW_VARIABLE.initial_value
  is '初始值';
comment on column SYS_WORKFLOW_VARIABLE.cjr_id
  is '创建人ID';
comment on column SYS_WORKFLOW_VARIABLE.cjsj
  is '创建时间';
comment on column SYS_WORKFLOW_VARIABLE.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_WORKFLOW_VARIABLE
  add constraint PK_SYS_WORKFLOW_VARIABLE_ID primary key (ID);

prompt
prompt Creating table SYS_WORKFLOW_VARIABLE_INSTANCE
prompt =============================================
prompt
create table SYS_WORKFLOW_VARIABLE_INSTANCE
(
  id                   INTEGER not null,
  workflow_instance_id INTEGER,
  variable_id          INTEGER,
  value                VARCHAR2(100),
  cjsj                 DATE,
  sfyx_st              CHAR(1)
)
;
comment on table SYS_WORKFLOW_VARIABLE_INSTANCE
  is '流程变量实例表';
comment on column SYS_WORKFLOW_VARIABLE_INSTANCE.id
  is '主键';
comment on column SYS_WORKFLOW_VARIABLE_INSTANCE.workflow_instance_id
  is '所属流程实例ID';
comment on column SYS_WORKFLOW_VARIABLE_INSTANCE.variable_id
  is '所属变量ID';
comment on column SYS_WORKFLOW_VARIABLE_INSTANCE.value
  is '变量值';
comment on column SYS_WORKFLOW_VARIABLE_INSTANCE.cjsj
  is '创建时间';
comment on column SYS_WORKFLOW_VARIABLE_INSTANCE.sfyx_st
  is '有效状态 0无效 1有效';
alter table SYS_WORKFLOW_VARIABLE_INSTANCE
  add constraint PK_SYS_WF_VAR_INSTANCE_ID primary key (ID);

prompt
prompt Creating table TEMP_CONDUCT
prompt ===========================
prompt
create table TEMP_CONDUCT
(
  user_id NUMBER
)
;
comment on table TEMP_CONDUCT
  is '工作流临时表（存放任务办理人）';
comment on column TEMP_CONDUCT.user_id
  is '用户ID';

prompt
prompt Creating table TEMP_CONDUCT_WB
prompt ==============================
prompt
create table TEMP_CONDUCT_WB
(
  user_id    NUMBER,
  wb_user_id NUMBER,
  is_wb      CHAR(1)
)
;
comment on table TEMP_CONDUCT_WB
  is '工作流临时表（存放任务办理人）';
comment on column TEMP_CONDUCT_WB.user_id
  is '原办理人';
comment on column TEMP_CONDUCT_WB.wb_user_id
  is '委办人';
comment on column TEMP_CONDUCT_WB.is_wb
  is '是否委办 0 否 1是';

prompt
prompt Creating table TEMP_IDS_CLOB
prompt ============================
prompt
create table TEMP_IDS_CLOB
(
  ids CLOB
)
;

prompt
prompt Creating table TEMP_NODE
prompt ========================
prompt
create table TEMP_NODE
(
  node_id NUMBER
)
;
comment on table TEMP_NODE
  is '工作流临时表（查找下一环节ID时使用）';
comment on column TEMP_NODE.node_id
  is '环节ID';

prompt
prompt Creating table TEMP_NODE_USER
prompt =============================
prompt
create table TEMP_NODE_USER
(
  node_id INTEGER,
  user_id INTEGER
)
;
comment on column TEMP_NODE_USER.node_id
  is '环节ID';
comment on column TEMP_NODE_USER.user_id
  is '用户ID';

prompt
prompt Creating table TEMP_ROLE
prompt ========================
prompt
create table TEMP_ROLE
(
  role_id NUMBER
)
;
comment on column TEMP_ROLE.role_id
  is '角色ID';

prompt
prompt Creating table TEMP_TASK_PAGE_BLYJ
prompt ==================================
prompt
create table TEMP_TASK_PAGE_BLYJ
(
  node_page_id NUMBER,
  blyj         VARCHAR2(500)
)
;
comment on table TEMP_TASK_PAGE_BLYJ
  is '工作流临时表（存放审批意见）';
comment on column TEMP_TASK_PAGE_BLYJ.node_page_id
  is '环节页面ID';
comment on column TEMP_TASK_PAGE_BLYJ.blyj
  is '办理意见';

prompt
prompt Creating table TEMP_USER
prompt ========================
prompt
create table TEMP_USER
(
  user_id NUMBER
)
;
comment on table TEMP_USER
  is '工作流临时表（存放存储过程查找的动态用户）';
comment on column TEMP_USER.user_id
  is '用户ID';


spool off
