-----------------------------------------------------------
-- Export file for user PURE@192.168.0.110:1522/BASEORCL --
-- Created by Administrator on 2018-11-12, 10:24:36 -------
-----------------------------------------------------------

set define off
spool procedure.log

prompt
prompt Creating package PKG_BASEPLAT
prompt =============================
prompt
CREATE OR REPLACE PACKAGE PKG_BASEPLAT IS

  --功能：保存机构、岗位、用户时，更新SYS_GLB_ROLE_USER、SYS_GLB_ROLE_POST表数据
  --创建人：wcy
  --创建时间：2017.12.19
  --最后修改人：wcy
  --最后修改时间：2017.12.19
  PROCEDURE P_SAVE_ORGAN_POST_USER(IN_ID     INTEGER, --输入ID
                                   IN_TYPE   VARCHAR2, --操作类型
                                   OUT_ERROR OUT VARCHAR2); --程序运行是否成功

  --功能：生成用户与角色关联关系
  --创建人：wcy
  --创建时间：2017.12.19
  --最后修改人：wcy
  --最后修改时间：2017.12.19
  PROCEDURE P_SET_USER_ROLES(IN_USER_IDS VARCHAR2); --用户ID字符串,逗号拼接

  --功能：保存机构时，新增了角色，当该机构下的用户已经有了该角色，删除用户的这个角色。
  --保存机构时，删除了角色，当某个用户已经有该角色且处于禁用时，且该用户所在的其它机构没有该角色删除该用户的角色，
  --若该用户所在的其它机构也有该角色，怎么不能删除这条禁用关系。
  --创建人：pc
  --创建时间：2018.6.26
  --最后修改人：pc
  --最后修改时间：2018.6.26
  PROCEDURE P_DEL_USER_ROLE_IF_ORGAN_EXIST(IN_ORGAN_ID INTEGER, --当前保存的机构id
                                           ADD_ROLES    VARCHAR2, --该机构新增的角色
                                           DEL_ROLES VARCHAR2,--该机构删除的角色
                                           OUT_ERROR   OUT VARCHAR2); --返回程序运行结果


  --功能：为角色分配关联要素时后置数据处理
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_SAVE_ROLE_RELATIONS(IN_ROLE_ID        INTEGER, --角色ID
                                  IN_ORGANS_ADD     CLOB, --增加机构
                                  IN_ORGANS_DEL     CLOB, --删除机构
                                 /* IN_BASE_POSTS_ADD CLOB, --增加基础岗位
                                  IN_BASE_POSTS_DEL CLOB, --删除基础岗位
                                  IN_POSTS_INCLUDE  CLOB, --包含具体岗位
                                  IN_POSTS_EXCLUDE  CLOB, --排除具体岗位
                                  IN_POSTS_TURN     CLOB, --取消包含、排除具体岗位*/
                                  IN_USERS_INCLUDE  CLOB, --包含用户
                                  IN_USERS_EXCLUDE  CLOB, --排除用户
                                  IN_USERS_TURN     CLOB, --取消包含、排除用户
                                  OUT_ERROR         OUT VARCHAR2); --返回程序运行结果

  --增加机构、基础岗位与角色关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_ADD_ORGAN_OR_BASE_POST(IN_ROLE_ID INTEGER, --角色ID
                                     IN_TYPE    VARCHAR2, --操作类型
                                     IN_ROLE_TYPE VARCHAR2); --角色类型

  --删除机构、基础岗位与角色关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_DEL_ORGAN_OR_BASE_POST(IN_ROLE_ID INTEGER, --角色ID
                                     IN_TYPE    VARCHAR2); --操作类型

  --增加具体岗位、用户与角色包含关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_ADD_POST_OR_USER_INCLUDE(IN_ROLE_ID INTEGER, --角色ID
                                       IN_TYPE    VARCHAR2, --操作类型
                                       IN_ROLE_TYPE VARCHAR2); --角色类型

  --增加具体岗位、用户与角色排除关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_ADD_POST_OR_USER_EXCLUDE(IN_ROLE_ID INTEGER, --角色ID
                                       IN_TYPE    VARCHAR2, --操作类型
                                       IN_ROLE_TYPE VARCHAR2); --角色类型

  --删除具体岗位、用户与角色的包含、排除关系
  PROCEDURE P_DEL_POST_OR_USER_TURN(IN_ROLE_ID INTEGER, --角色ID
                                    IN_TYPE    VARCHAR2); --操作类型

  --生成角色与具体岗位、用户关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_SET_ROLE_POST_AND_USER(IN_ROLE_ID INTEGER, --角色ID
                                     OUT_ERROR  OUT VARCHAR2); --返回程序运行结果

  --删除机构、岗位、基础岗位、用户
  --创建人：wcy
  --创建时间：2018.1
  --最后修改人：wcy
  --最后修改时间：2018.1
  PROCEDURE P_DELETE_ORGAN_POST_USER(IN_ID        INTEGER, --输入ID
                                     IN_TYPE      VARCHAR2, --操作类型
                                     IN_CHANGE_ID INTEGER, --输入变化ID
                                     OUT_ERROR    OUT VARCHAR2); --运行结果

                                     --删除机构、岗位、基础岗位、用户
  --创建人：zxh
  --创建时间：2018.4
  --最后修改人：zxh
  --最后修改时间：2018.4
  PROCEDURE P_DEFAULT_RESOURCE_CONFIG(OUT_ERROR    OUT VARCHAR2); --运行结果

    --更新数据权限
  --创建人：wcy
  --创建时间：2018.3
  --最后修改人：wcy
  --最后修改时间：2018.3
 PROCEDURE P_UPDATE_DATA_AUTH(IN_OBJECT_ID INTEGER, --对象类型ID
                               IN_USER_IDS  CLOB, --用户IDS
                               IN_OIDS      CLOB, --对象IDS
                               IN_USER_ID   INTEGER, --当前用户ID
                               OUT_ERROR    OUT VARCHAR2); --运行结果
  --组合角色分解
  --创建人：dmx
  --创建时间：2018.6.25
 PROCEDURE P_FACTOR_COMBINE_ROLE(IN_ROLE_ID IN INTEGER, --分解角色ID
                                 OUT_ERROR  OUT VARCHAR2);--程序运行结果

  --角色删除后置处理
  --创建人：dmx
  --创建时间：2018.6.28
 PROCEDURE P_AFTER_DELETE_ROLE(IN_ROLE_ID IN INTEGER, --角色ID
                                OUT_ERROR  OUT VARCHAR2); --程序运行结果

END PKG_BASEPLAT;
/

prompt
prompt Creating package PKG_FORM_DEF
prompt =============================
prompt
create or replace package PKG_FORM_DEF is

  -- Author  : MRQ
  -- Created : 2018/8/27 11:53:52
  -- Purpose :

  --创建表
  PROCEDURE P_CREATE_FORMTABLE(IN_TABLE_NAME VARCHAR2, --数据库名称
                            IN_TABLE_SQL VARCHAR2, -- 建表语句
                            OUT_ERROR    OUT VARCHAR2); --返回程序执行情况
end PKG_FORM_DEF;
/

prompt
prompt Creating type REC_NODE
prompt ======================
prompt
CREATE OR REPLACE TYPE REC_NODE IS OBJECT(
    NODE_ID INTEGER)
/

prompt
prompt Creating type TAB_NODE
prompt ======================
prompt
CREATE OR REPLACE TYPE TAB_NODE IS TABLE OF REC_NODE
/

prompt
prompt Creating package PKG_TASK
prompt =========================
prompt
CREATE OR REPLACE PACKAGE PKG_TASK IS

  TYPE MYCURSOR IS REF CURSOR;
  --签收任务 LB 2016.9
  PROCEDURE P_TASK_SIGN(IN_TASK_ID NUMBER, --任务实例ID
                        OUT_STR    OUT VARCHAR2, --返回签收情况信息
                        OUT_ERROR  OUT VARCHAR2); --返回程序执行情况

  --办理任务（提交、退回） LB 2016.9
  PROCEDURE P_TASK_SUBMIT(IN_TASK_ID       NUMBER, --任务实例ID
                          IN_USER_IDS      VARCHAR2, --指定办理人IDS,用逗号分隔
                          IN_DECISION      VARCHAR2, --决策条件
                          IN_BLYJ          VARCHAR2, --任务办理意见
                          IN_FJ_ID         VARCHAR2, --附件ID
                          IN_FLAG          VARCHAR2, --同意，不同意标志位，0：不同意 1：同意
                          IN_BACK_NODE_IDS VARCHAR2, --指定退回的环节IDS
                          OUT_STR          OUT VARCHAR2, --返回的不能提交的业务原因
                          OUT_ERROR        OUT VARCHAR2); --返回程序执行情况

  --退回任务
  PROCEDURE P_TASK_BACK(IN_TASK_ID      NUMBER, --任务ID
                        IN_BLYJ         VARCHAR2, --办理意见
                        IN_BACK_NODE_ID NUMBER, --特送退回环节ID
                        IN_USER_IDS     VARCHAR2, --指定办理用户IDS
                        IN_TASK_INFO    VARCHAR2, --来源任务信息 任务动作,任务ID
                        OUT_STR         OUT VARCHAR2, --返回信息
                        OUT_ERROR       OUT VARCHAR2); --返回程序执行情况

  --撤回任务
  PROCEDURE P_TASK_RECOVER(IN_TASK_ID NUMBER, --回撤任务实例ID
                           OUT_STR    OUT VARCHAR2, --返回信息
                           OUT_ERROR  OUT VARCHAR2); --返回程序执行情况

  --重建TASK任务
  PROCEDURE P_REBUILD_TASK(IN_TASK_ID NUMBER, --撤回任务实例ID
                           OUT_STR    OUT VARCHAR2, --返回信息
                           OUT_ERROR  OUT VARCHAR2); --返回程序执行情况

  --更新委办任务信息，将之前下发的现在委办的任务更新为委办，更新委办任务超出委办期限。需要定时执行
  PROCEDURE P_TASK_WB_UPDATE;

  --更新委办任务信息，新建委办计划的时候将之前下发的现在委办的任务更新为委办，删除委办计划则把委办任务交还给原办理人
  PROCEDURE P_TASK_WB_UPDATE_SS(IN_USER_ID NUMBER, --原办理人ID
                                IN_FLAG    VARCHAR2, --新增删除标志，1.新增 2.删除
                                OUT_STR    OUT VARCHAR2, --返回信息
                                OUT_ERROR  OUT VARCHAR2); --返回程序执行情况

  --维护操作记录
  PROCEDURE P_UPDATE_OPERATION_NOTE(IN_TASK_INS_ID NUMBER, --任务实例ID  标志位为1时  代表流程实例ID
                                    IN_TYPE        CHAR); --标志位 1 流程实例  2 任务实例

  --转办任务 WCY
  PROCEDURE P_TASK_TRANSFER(IN_TASK_ID INTEGER, --任务ID
                            IN_USER_ID INTEGER, --新办理人
                            OUT_STR    OUT VARCHAR2, --执行正常返回信息
                            OUT_ERROR  OUT VARCHAR2); --程序执行结果
  --后处理程序
  PROCEDURE P_FINISH_PROCESS(IN_FLAG      CHAR, --处理类型 1流程启动后处理  2环节结束后处理  3流程结束后处理
                             IN_WF_INS_ID INTEGER, --流程实例ID
                             IN_NODE_ID   INTEGER); --环节ID
  --操作按钮显隐控制
  PROCEDURE P_BUTTON_IFSHOW(IN_TASK_ID INTEGER, --当前任务
                            IN_NODE_ID INTEGER, --当前环节
                            IN_USER_ID INTEGER, --当前登录用户
                            OUT_STR    OUT VARCHAR2, --返回值
                            OUT_ERROR  OUT VARCHAR2); --程序运行结果

  --产生消息、清理消息
  PROCEDURE P_PRODUCE_MESSAGE(IN_TASK_ID INTEGER, --任务ID
                              IN_ACTION  CHAR); --操作类型

  --查找分支环节与聚合环节间的环节ID
  --创建人：wcy
  --创建时间：2018.3
  --修改人：wcy
  --修改时间：2018.3
  FUNCTION F_GET_NATURE_NODES(IN_BRANCH_NODE_ID INTEGER, --分支环节ID
                              IN_MERGE_NODE_ID  INTEGER) --聚合环节ID
   RETURN TAB_NODE
    PIPELINED;

  --验证聚合环节是否可以实例化
  --创建人：wcy
  --创建时间：2018.3
  --修改人：wcy
  --修改时间：2018.3
  FUNCTION F_MERGE_NODE_CAN_INSTANCE(IN_MERGE_NODE_ID INTEGER, --聚合环节ID
                                     IN_WF_INS_ID     INTEGER) --流程实例ID
   RETURN VARCHAR2;

  --获取聚合环节前一环节作为退回环节
  FUNCTION F_GET_BACK_NODES(IN_NODE_ID INTEGER) RETURN MYCURSOR; --聚合环节ID
END PKG_TASK;
/

prompt
prompt Creating package PKG_UTIL
prompt =========================
prompt
CREATE OR REPLACE PACKAGE PKG_UTIL
/**
 * @desc: 工具包
 * @author: dingmx
 * @date: 2018/07/30
 */
 IS
  --全库搜索字符串
  PROCEDURE P_SEARCH_ALL(P_STR IN VARCHAR);

  --全库清理
  PROCEDURE P_CLEAR_ALL;

  --重新编译无效对象
  PROCEDURE P_RECOMPILE_INVALID;

END PKG_UTIL;
/

prompt
prompt Creating package PKG_VALIDATE
prompt =============================
prompt
CREATE OR REPLACE PACKAGE PKG_VALIDATE IS
  PROCEDURE USP_OBJECT_VALIDATE(IN_TABLE_NAME   VARCHAR2, --表物理名
                                IN_COLUMNS_NAME VARCHAR2, --字段物理名多个用逗号隔开
                                OUT_ERRWORD     OUT VARCHAR2, --返回验证的情况
                                OUT_ERROR       OUT VARCHAR2); --返回程序执行情况
/*--------------------------------------*/
---名称/功能：对象和属性验证
---创建人：骆斌
---创建时间：2016.10.11
---修改人：
---修改时间：
---修改内容：
/*--------------------------------------*/
END PKG_VALIDATE;
/

prompt
prompt Creating package PKG_WF
prompt =======================
prompt
CREATE OR REPLACE PACKAGE PKG_WF IS
  TYPE MYCURSOR IS REF CURSOR;
  --启动流程
  PROCEDURE P_WORKFLOW_START(IN_WF_ID   NUMBER, --流程ID
                             IN_USER_ID NUMBER, --流程发起人用户ID(如果是嵌套的话则是环节实例ID)
                             IN_TYPE    NUMBER, --流程发起类型:0是人工，1是嵌套
                             IN_DATAID  NUMBER, --数据ID
                             IN_TITLE   VARCHAR2, --标题
                             IN_SOURCE  VARCHAR2, --对象ID的集合
                             OUT_STR    OUT VARCHAR2, --返回信息
                             OUT_ERROR  OUT VARCHAR2); --返回程序执行情况

  --环节实例化
  PROCEDURE P_WORKFLOW_INSTANCE_NODE(IN_NODE_ID   NUMBER, --本环节ID
                                     IN_USER_IDS  VARCHAR2, --指定办理环节和办理人ID，用逗号分隔
                                     IN_WF_INS_ID NUMBER, --流程实例ID
                                     IN_TASK_INFO VARCHAR2, --来源任务信息 任务动作,任务ID
                                     OUT_STR      OUT VARCHAR2, --返回不能实例化的业务原
                                     OUT_ERROR    OUT VARCHAR2); --返回程序执行情况

  --查找下一环节
  PROCEDURE P_WORKFLOW_NEXT_NODE(IN_NODE_ID   INTEGER, --环节ID
                                 IN_CONDITION VARCHAR2, --决策条件
                                 IN_WF_INS_ID INTEGER, --流程实例ID
                                 OUT_CUR      OUT MYCURSOR, --返回下一环节的ID，NAME集合
                                 OUT_STR      OUT VARCHAR2, --返回信息
                                 OUT_ERROR    OUT VARCHAR2); --返回程序执行情况

  --删除流程
  PROCEDURE P_WORKFLOW_DELETE(IN_WF_ID  NUMBER, --流程ID
                              OUT_STR   OUT VARCHAR2, --执行结果
                              OUT_ERROR OUT VARCHAR2); --返回程序执行情况

  --删除流程实例
  PROCEDURE P_WORKFLOW_INSTANCE_DELETE(IN_WF_INS_ID NUMBER, --流程实例ID
                                       OUT_STR      OUT VARCHAR2, --执行结果
                                       OUT_ERROR    OUT VARCHAR2); --返回程序执行情况

  --功能：查找下一环节办理人、所属机构
  --创建人：lb
  --创建时间：2016.9
  --修改人：wcy
  --修改时间：2018.4
  PROCEDURE P_WF_NEXT_NODE_USER_ORG(IN_TASK_INS_ID INTEGER, --任务实例ID
                                    IN_DECISION    VARCHAR2, --决策条件
                                    IN_FLAG        VARCHAR2, --退回还是提交 0退回 1提交
                                    IN_BACK_NODES  VARCHAR2, --指定的退回环节IDS
                                    OUT_CUR        OUT MYCURSOR, --环节、办理人、所属机构集合
                                    OUT_STR        OUT VARCHAR2, --返回信息
                                    OUT_ERROR      OUT VARCHAR2); --返回程序执行情况

  --批量办理、一键办理程序，返回办理成功数量和办理失败数量和未办理数量 LB
  PROCEDURE P_WORKFLOW_BATCH_HANDLE(IN_WF_INS_IDS VARCHAR2, --流程实例IDS,多个用逗号拼接
                                    IN_USERID     NUMBER, --用户ID
                                    IN_BLYJ       VARCHAR2, --办理意见
                                    IN_FLAG       VARCHAR2, --同意，不同意标志位，0：不同意 1：同意
                                    OUT_STR       OUT VARCHAR2, --执行结果
                                    OUT_ERROR     OUT VARCHAR2); --返回程序执行情况

  --流程特送退回 LB
  PROCEDURE P_WORKFLOW_SPECIAL_BACK(IN_INS_NODE_ID     NUMBER, --当前环节实例ID
                                    IN_SPECIAL_NODE_ID NUMBER, --特送退回环节ID
                                    IN_OPINION         VARCHAR2, --退回意见
                                    IN_FJ_ID           VARCHAR2, ---附件ID
                                    OUT_STR            OUT VARCHAR2, --返回的不能实例化的业务原因
                                    OUT_ERROR          OUT VARCHAR2); --返回程序执行情况

  --流程变量初始化
  PROCEDURE P_WORKFLOW_VARIABLE_INSTANCE(IN_WORKFLOW_ID     NUMBER, --流程ID
                                         IN_WORKFLOW_INS_ID NUMBER); --流程实例ID

  --完成工作流 wcy 2017.8
  PROCEDURE P_WORKFLOW_FINISH(DATA_ID   INTEGER, --业务数据ID
                              WF_CODE   VARCHAR2, --流程编码
                              OUT_ERROR OUT VARCHAR2); --程序运行结构

  --更新流程变量实例
  PROCEDURE P_INIT_WF_VARIABLE(IN_TASK_ID INTEGER, --任务ID
                               IN_WF_VARS VARCHAR2, --流程变量及值
                               OUT_ERROR  OUT VARCHAR2); --程序运行结果

  --功能：获取前面各环节及办理人
  --创建人：wcy
  --创建时间：2018.1
  PROCEDURE P_GET_BLR(IN_TASK_ID INTEGER, --任务ID
                      OUT_CUR    OUT MYCURSOR, --返回信息
                      OUT_ERROR  OUT VARCHAR2); --运行结果

  --功能：根据角色获取环节办理人，并插入临时表
  --创建人：wcy
  --创建时间：2018.4
  --修改人：wcy
  --修改时间：2018.4
  PROCEDURE P_GET_BLR_BY_ROLE(IN_WF_INS_ID INTEGER, --流程实例ID
                              IN_NODE_ID   INTEGER, --环节ID
                              IN_TYPE      CHAR); --1插入临时表TEMP_CONDUCT 2插入临时表TEMP_NODE_USER

  --功能：计算工作流最新版本
  --创建人：dmx
  --创建时间：2018.9.7
  PROCEDURE P_CALC_LATEST_VERSION(OUT_STR   OUT VARCHAR2, --执行结果
                                  OUT_ERROR OUT VARCHAR2); --返回程序执行情况

  --功能：拷贝节点关联对象
  --创建人：wangyang
  --创建时间：2018.9.11
  PROCEDURE P_NODE_COPY_RELATED_OBJECTS(IN_SOURCE_NODE_ID INTEGER, --源节点
                                        IN_TARGET_NODE_ID INTEGER, --目标节点
                                        IN_USER_ID        INTEGER, --操作用户ID
                                        OUT_STR           OUT VARCHAR2, --执行结果
                                        OUT_ERROR         OUT VARCHAR2); --返回程序执行情况

END PKG_WF;
/

prompt
prompt Creating package PKG_WF_DAMIC_USER
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE PKG_WF_DAMIC_USER IS
  TYPE MYCURSOR IS REF CURSOR;

  --查找流程启动人
  PROCEDURE P_WORKFLOW_START_USER(IN_WF_INS_ID NUMBER); --流程实例ID

  --获取环节办理人
  PROCEDURE P_WF_DEFAULT_TRANSACTOR(IN_WF_INS_ID   NUMBER, --流程实例ID
                                    IN_NODE_ID     NUMBER, --当前环节ID
                                    IN_PRE_TASK_ID NUMBER); --前一环节任务实例ID

  --验证动态角色是否能够找到用户
  PROCEDURE P_WORKFLOW_DAMIC_USER_YZ(IN_WORKFLOW_CODE VARCHAR2, --流程代码
                                     IN_DATA_ID       NUMBER, --业务数据ID
                                     OUT_STR          OUT VARCHAR2, --返回信息
                                     OUT_ERROR        OUT VARCHAR2); --返回程序执行情况
END PKG_WF_DAMIC_USER;
/

prompt
prompt Creating type STR_SPLIT
prompt =======================
prompt
CREATE OR REPLACE TYPE STR_SPLIT  IS TABLE OF VARCHAR2 (4000)
/

prompt
prompt Creating function F_DEL_LAST_CHAR
prompt =================================
prompt
CREATE OR REPLACE FUNCTION F_DEL_LAST_CHAR(IN_STR IN VARCHAR2) --入参字符串
 RETURN VARCHAR2 AS
BEGIN
  RETURN SUBSTR(IN_STR, 1, LENGTH(IN_STR) - 1);
END F_DEL_LAST_CHAR;
/

prompt
prompt Creating function GET_DICT_VALUE
prompt ================================
prompt
CREATE OR REPLACE FUNCTION GET_DICT_VALUE(IN_SUBDICT_CODE IN VARCHAR2, --字典项编码
                                          IN_DICT_CODE    IN VARCHAR2) --字典编码
  --根据字典项编码查询字典项值
 RETURN VARCHAR2 AS
  V_VALUE VARCHAR2(200) := '';
  V_SQL   VARCHAR2(4000);
BEGIN
  --当字典编码为null时，使用字典项编码（含字典编码）
  IF IN_DICT_CODE IS NULL THEN
    V_SQL := 'SELECT SS.VALUE FROM SYS_SUBDICT SS WHERE SS.DICT_CODE =
    SUBSTR(:SUBDICT_CODE, 1, INSTR(:SUBDICT_CODE, ''_'') - 1) AND SS.CODE = :SUBDICT_CODE AND SS.SFYX_ST = ''1''';
    EXECUTE IMMEDIATE V_SQL
      INTO V_VALUE
      USING IN_SUBDICT_CODE, IN_SUBDICT_CODE, IN_SUBDICT_CODE;
  ELSE
    --当字典编码不为null时
    V_SQL := 'SELECT SS.VALUE FROM SYS_SUBDICT SS WHERE SS.DICT_CODE = :DICT_CODE AND SS.CODE = :SUBDICT_CODE AND SS.SFYX_ST = ''1''';
    EXECUTE IMMEDIATE V_SQL
      INTO V_VALUE
      USING IN_DICT_CODE, IN_SUBDICT_CODE;
  END IF;
  RETURN V_VALUE;
END GET_DICT_VALUE;
/

prompt
prompt Creating function SPLITSTR
prompt ==========================
prompt
CREATE OR REPLACE FUNCTION SPLITSTR(P_STRING    IN VARCHAR2,
                                    P_DELIMITER IN VARCHAR2)
  RETURN STR_SPLIT
  PIPELINED AS
  V_LENGTH NUMBER := LENGTH(P_STRING);
  V_START  NUMBER := 1;
  V_INDEX  NUMBER;
BEGIN
  WHILE (V_START <= V_LENGTH) LOOP
    V_INDEX := INSTR(P_STRING, P_DELIMITER, V_START);

    IF V_INDEX = 0 THEN
      PIPE ROW(SUBSTR(P_STRING, V_START));
      V_START := V_LENGTH + 1;
    ELSE
      PIPE ROW(SUBSTR(P_STRING, V_START, V_INDEX - V_START));
      V_START := V_INDEX + 1;
    END IF;
  END LOOP;

  RETURN;
END SPLITSTR;
/

prompt
prompt Creating function NUM_AREA_FORMAT
prompt =================================
prompt
CREATE OR REPLACE FUNCTION NUM_AREA_FORMAT(SOURCE_DATA   IN NUMBER, --数据字段
                                           SIDES_SETTING IN VARCHAR2) --范围边界配置，如“0-10,11-20,21-30,31+”
 RETURN VARCHAR2 AS
  V_SIDES   VARCHAR2(51);
  V_C_INDEX NUMBER;
  MIN_SIDE  VARCHAR2(25);
  MAX_SIDE  VARCHAR2(25);
  CURSOR C IS
    SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(SIDES_SETTING, ','));
BEGIN
  OPEN C;

  LOOP
    FETCH C
      INTO V_SIDES;
    MIN_SIDE := null;
    MAX_SIDE := null;
    select instr(V_SIDES, '-', -1) INTO V_C_INDEX from dual;
    IF V_C_INDEX > 0 THEN
      select substr(V_SIDES, 1, V_C_INDEX - 1) INTO MIN_SIDE from dual;
      select substr(V_SIDES, V_C_INDEX + 1) INTO MAX_SIDE from dual;
    ELSE
      select substr(V_SIDES, 1, instr(V_SIDES, '+', -1) - 1)
        INTO MIN_SIDE
        from dual;
    END IF;
    EXIT WHEN((MIN_SIDE <= SOURCE_DATA) AND
              (MAX_SIDE is null OR MAX_SIDE >= SOURCE_DATA)) OR C%NOTFOUND;
  END LOOP;

  CLOSE C;
  RETURN V_SIDES;
END NUM_AREA_FORMAT;
/

prompt
prompt Creating function RX_COUNT
prompt ==========================
prompt
CREATE OR REPLACE FUNCTION RX_COUNT(SOURCE_STR IN VARCHAR2, --传入字符窜
                                    SEARCH_STR IN VARCHAR2, --搜索字符窜
                                    DELIMITER  IN VARCHAR2) --定界符
 RETURN NUMBER AS
  V_NUM NUMBER := 0;
BEGIN
  FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(SOURCE_STR, DELIMITER))) LOOP
    IF K.COLUMN_VALUE = SEARCH_STR THEN
      V_NUM := V_NUM + 1;
    END IF;
  END LOOP;
  RETURN V_NUM;
END RX_COUNT;
/

prompt
prompt Creating function RX_COUNT2
prompt ===========================
prompt
CREATE OR REPLACE FUNCTION RX_COUNT2(SOURCE_STR IN VARCHAR2, --传入字符窜
                                     SEARCH_STR IN VARCHAR2) --搜索字符窜
 RETURN NUMBER AS
  V_NUM NUMBER; --计数
BEGIN
  SELECT (LENGTH(SOURCE_STR) - LENGTH(REPLACE(SOURCE_STR, SEARCH_STR))) /
         LENGTH(SEARCH_STR)
    INTO V_NUM
    FROM DUAL;
  RETURN V_NUM;
END RX_COUNT2;
/

prompt
prompt Creating function RX_GETSTR
prompt ===========================
prompt
CREATE OR REPLACE FUNCTION RX_GETSTR(SOURCE_STR IN VARCHAR2, --逗号隔开的源字符串 如 '1,2,3,4,5'
                                     SORT       IN NUMBER) --检索序号

 RETURN NUMBER AS
  V_ORGAN NUMBER;
  V_COUNT NUMBER := 0;
  CURSOR C IS
    SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(SOURCE_STR, ','));
BEGIN
  OPEN C;

  LOOP
    FETCH C
      INTO V_ORGAN;
    V_COUNT := V_COUNT + 1;
    EXIT WHEN SORT = V_COUNT OR C%NOTFOUND;

  END LOOP;

  CLOSE C;
  RETURN V_ORGAN;
END RX_GETSTR;
/

prompt
prompt Creating function RX_INSTR
prompt ==========================
prompt
CREATE OR REPLACE FUNCTION RX_INSTR(SOURCE_STR  IN VARCHAR2, --逗号隔开的源字符串 如 '1,2,3,4,5'
                                    SEARCH_STR  IN VARCHAR2, --逗号隔开的检索字符串 如 '2,3'
                                    SEARCH_TYPE IN CHAR) --检索类型 1  2
  --检索类型为1 只要 在源字符串中搜索到检索字符串的任意项 就 返回 1
  --检索类型为2 必须 在源字符串中搜索到检索字符串的所有项 才 返回 1
 RETURN CHAR AS

  TAG          CHAR(1);
  V_SOURCE_STR VARCHAR2(4000);
  V_SEARCH_STR VARCHAR2(4000);
  V_TEMP       VARCHAR2(100);
  V_COUNT      NUMBER := 0;
  V_LENGTH     NUMBER;
BEGIN
  V_SOURCE_STR := REPLACE(SOURCE_STR, ' ', '');
  V_SEARCH_STR := REPLACE(SEARCH_STR, ' ', '');
  --V_LENGTH     := LENGTH(V_SOURCE_STR) - LENGTH(REPLACE(V_SOURCE_STR, ',')) + 1;
  SELECT COUNT(1) INTO V_LENGTH FROM TABLE(SPLITSTR(SEARCH_STR, ','));
  IF SEARCH_TYPE = '1' THEN
    FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(V_SEARCH_STR, ','))) LOOP
      V_TEMP := ',' || K.COLUMN_VALUE || ',';
      IF INSTR(',' || V_SOURCE_STR || ',', V_TEMP) > 0 THEN
        V_COUNT := V_COUNT + 1;
      END IF;
    END LOOP;
    IF V_COUNT > 0 THEN
      TAG := '1';
    ELSE
      TAG := '0';
    END IF;
  ELSIF SEARCH_TYPE = '2' THEN
    FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(V_SEARCH_STR, ','))) LOOP
      V_TEMP := ',' || K.COLUMN_VALUE || ',';
      IF INSTR(',' || V_SOURCE_STR || ',', V_TEMP) > 0 THEN
        V_COUNT := V_COUNT + 1;
      END IF;
    END LOOP;
    IF V_COUNT > 0 AND V_COUNT = V_LENGTH THEN
      TAG := '1';
    ELSE
      TAG := '0';
    END IF;
  END IF;

  RETURN TAG;

END RX_INSTR;
/

prompt
prompt Creating function SPLITCLOB
prompt ===========================
prompt
CREATE OR REPLACE FUNCTION SPLITCLOB(P_STRING    IN CLOB,
                                     P_DELIMITER IN VARCHAR2)
  RETURN STR_SPLIT
  PIPELINED AS
  V_LENGTH NUMBER := DBMS_LOB.GETLENGTH(P_STRING);
  V_START  NUMBER := 1;
  V_INDEX  NUMBER;
  V_LAST   NUMBER;
BEGIN
  WHILE (V_START <= V_LENGTH) LOOP
    V_INDEX := DBMS_LOB.INSTR(P_STRING, P_DELIMITER, V_START);
    IF V_INDEX = 0 THEN
      V_LAST := V_LENGTH - V_START + 1;
      PIPE ROW(DBMS_LOB.SUBSTR(P_STRING, V_LAST, V_START));
      V_START := V_LENGTH + 1;
    ELSE
      PIPE ROW(DBMS_LOB.SUBSTR(P_STRING, V_INDEX - V_START, V_START));
      V_START := V_INDEX + 1;
    END IF;
  END LOOP;

  RETURN;
END SPLITCLOB;
/

prompt
prompt Creating function SPLITSTR_QC
prompt =============================
prompt
CREATE OR REPLACE FUNCTION SPLITSTR_QC(ACCOUNT_ID_LIST IN VARCHAR2)
/*对逗号分隔的字符串去重再拼接*/
 RETURN VARCHAR2 AS
  V_ACCOUNT_ID_LIST VARCHAR2(4000);
BEGIN
  WITH ACCTS AS
   (SELECT DISTINCT STR
      FROM (SELECT REGEXP_SUBSTR(REPLACE(ACCOUNT_ID_LIST, ', ', ','),
                                 '[^,]+',
                                 1,
                                 LEVEL,
                                 'i') AS STR
              FROM DUAL
            CONNECT BY LEVEL <= LENGTH(REPLACE(ACCOUNT_ID_LIST, ', ', ',')) -
                       LENGTH(REGEXP_REPLACE(REPLACE(ACCOUNT_ID_LIST,
                                                              ', ',
                                                              ','),
                                                      ',',
                                                      '')) + 1))
  SELECT WM_CONCAT(STR) INTO V_ACCOUNT_ID_LIST FROM ACCTS;

  RETURN V_ACCOUNT_ID_LIST;

END SPLITSTR_QC;
/

prompt
prompt Creating procedure ANALYZEALLTABLE
prompt ==================================
prompt
CREATE OR REPLACE PROCEDURE AnalyzeAllTable
IS
--2009-10-18 wallimn
--分析所有表及索引。便于有效的使用CBO优化器
BEGIN
   --分析所有表：analyze table TABLENAME compute statistics
   for cur_item in (select table_name from user_tables) loop
      begin
          execute immediate 'analyze table '|| cur_item.table_name
                               || ' compute statistics';
     exception
       when others then
         dbms_output.put_line('分析表异常：'||sqlerrm);
     end;
   end loop;

  --分析所有索引：analyze index INDEXNAME estimate statistics
   for cur_item in (select index_name from user_indexes) loop
      begin
          execute immediate 'analyze index '|| cur_item.index_name
                                || ' estimate statistics';
     exception
       when others then
         dbms_output.put_line('分析索引异常：'||sqlerrm);
     end;
   end loop;
END AnalyzeAllTable;
/

prompt
prompt Creating procedure USP_DELETE_UNVALID
prompt =====================================
prompt
CREATE OR REPLACE PROCEDURE USP_DELETE_UNVALID AUTHID CURRENT_USER IS
  CURSOR CUR_TABLES IS
    SELECT TABLE_NAME
      FROM SYS.USER_TAB_COLUMNS
     WHERE COLUMN_NAME = 'SFYX_ST'
       AND DATA_TYPE = 'CHAR'
       AND (TABLE_NAME LIKE 'T_%' OR TABLE_NAME LIKE 'SYS_%');
  V_SQL        VARCHAR2(200);
  V_TABLE_NAME VARCHAR2(100);
BEGIN
  OPEN CUR_TABLES;
  LOOP
    FETCH CUR_TABLES
      INTO V_TABLE_NAME;
    EXIT WHEN CUR_TABLES%NOTFOUND;
    V_SQL := 'DELETE FROM ' || V_TABLE_NAME || ' T WHERE T.SFYX_ST=''0'' ';
    EXECUTE IMMEDIATE V_SQL;
    COMMIT;
  END LOOP;
  CLOSE CUR_TABLES;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
END USP_DELETE_UNVALID;
/

prompt
prompt Creating procedure USP_SEQ_CREATE
prompt =================================
prompt
CREATE OR REPLACE PROCEDURE USP_SEQ_CREATE AUTHID CURRENT_USER IS
  CURSOR C IS
    SELECT TABLE_NAME
      FROM SYS.USER_TAB_COLUMNS
     WHERE COLUMN_NAME = 'ID'
       AND DATA_TYPE = 'NUMBER'
       AND (TABLE_NAME LIKE 'T_%' OR TABLE_NAME LIKE 'SYS_%');
  CURSOR S IS
    SELECT T.SEQUENCE_NAME
      FROM SYS.USER_SEQUENCES T
     WHERE T.SEQUENCE_NAME LIKE 'SEQ_T_%'
        OR T.SEQUENCE_NAME LIKE 'SEQ_SYS_%';
  V_SQL VARCHAR2(3000);
  V_TAB VARCHAR2(300);
  V_SEQ VARCHAR2(300);
  V_CT  NUMBER;
  V_ID  NUMBER;
BEGIN
  --删除所有以 SEQ_T_、SEQ_SYS_ 开头的序列
  OPEN S;
  LOOP
    FETCH S
      INTO V_TAB;
    EXIT WHEN S%NOTFOUND;
    EXECUTE IMMEDIATE 'DROP SEQUENCE ' || V_TAB;
  END LOOP;
  CLOSE S;
  --创建新序列
  OPEN C;
  LOOP
    FETCH C
      INTO V_TAB;
    EXIT WHEN C%NOTFOUND;
    --以 SEQ_ 加表名作为默认序列名
    V_SEQ := 'SEQ_' || V_TAB;
    --当序列名长度超过30，只保留30
    IF LENGTH(V_SEQ) > 30 THEN
      V_SEQ := SUBSTR(V_SEQ, 1, 30);
    END IF;
    --查找序列是否存在
    SELECT COUNT(1)
      INTO V_CT
      FROM SYS.USER_SEQUENCES
     WHERE SEQUENCE_NAME = V_SEQ;
    --当序列不存在时，创建序列
    IF V_CT = 0 THEN
      --获取序列起始ID
      V_SQL := 'SELECT NVL(MAX(ID),50)*2 FROM ' || V_TAB;
      EXECUTE IMMEDIATE V_SQL
        INTO V_ID;
      --创建序列
      V_SQL := 'CREATE SEQUENCE ' || V_SEQ || ' INCREMENT BY 1 START WITH ' || V_ID;
      EXECUTE IMMEDIATE V_SQL;
    END IF;
  END LOOP;
  CLOSE C;
END USP_SEQ_CREATE;
/

prompt
prompt Creating package body PKG_BASEPLAT
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE BODY PKG_BASEPLAT IS

  --功能：保存机构、岗位、用户时，更新SYS_GLB_ROLE_USER、SYS_GLB_ROLE_POST表数据
  --创建人：wcy
  --创建时间：2017.12.19
  --最后修改人：wcy
  --最后修改时间：2017.12.19
  PROCEDURE P_SAVE_ORGAN_POST_USER(IN_ID     INTEGER, --输入ID
                                   IN_TYPE   VARCHAR2, --操作类型
                                   OUT_ERROR OUT VARCHAR2) --程序运行是否成功
   AS
    V_USER_IDS VARCHAR2(4000); --用户ID字符串,逗号拼接
  BEGIN
    --默认程序运行成功
    OUT_ERROR := 'SUCCESS';

    --操作类型为ORGAN，输入ID为机构ID
    IF IN_TYPE = 'ORGAN' THEN
      --查找机构下用户
      SELECT WM_CONCAT(OUP.USER_ID)
        INTO V_USER_IDS
        FROM SYS_GLB_USER OUP
       WHERE OUP.ORGAN_ID = IN_ID
         AND OUP.SFYX_ST = '1';
      --生成机构下用户与角色关系
      PKG_BASEPLAT.P_SET_USER_ROLES(V_USER_IDS);

      --操作类型为USER，输入ID为用户ID
    ELSIF IN_TYPE = 'USER' THEN
      --生成用户与角色关系
      PKG_BASEPLAT.P_SET_USER_ROLES(IN_ID);

    ELSE
      OUT_ERROR := '操作类型不匹配，请检查入参：IN_TYPE';
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_SAVE_ORGAN_POST_USER;

  --功能：生成用户与角色关联关系
  --创建人：wcy
  --创建时间：2017.12.19
  --最后修改人：wcy
  --最后修改时间：2017.12.19
  PROCEDURE P_SET_USER_ROLES(IN_USER_IDS VARCHAR2) --用户ID字符串,逗号拼接
   AS
    V_COUNT NUMBER;
  BEGIN
    --对所有的用户ID进行循环处理
    FOR I IN (SELECT COLUMN_VALUE USER_ID
                FROM TABLE(SPLITSTR(IN_USER_IDS, ','))) LOOP
      --删除某个用户所有角色关联数据
      DELETE FROM SYS_GLB_ROLE_USER RU WHERE RU.USER_ID = I.USER_ID;
      --重新插入用户关联角色数据 （关联类型 3:用户  2:组织 4:岗位）
      FOR K IN (
                --用户关联角色
                SELECT ROLE_ID
                  FROM SYS_GLB_ROLE
                 WHERE GL_TYPE = '3'
                   AND SFYX_ST = '1'
                   AND SFQY_ST = '1'
                   AND GL_ID = I.USER_ID
                UNION
                --用户关联的岗位角色
                SELECT OUP.POST_ID ROLE_ID
                  FROM SYS_GLB_USER OUP
                 WHERE OUP.USER_ID = I.USER_ID
                   AND OUP.SFYX_ST = '1'
                   AND OUP.POST_ID IS NOT NULL

                UNION
                --用户关联机构对应角色,但是排除岗位角色
                SELECT GR.ROLE_ID
                  FROM SYS_GLB_USER OUP, SYS_GLB_ROLE GR
                 WHERE OUP.USER_ID = I.USER_ID
                   AND OUP.ORGAN_ID = GR.GL_ID
                   AND GR.GL_TYPE = '2'
                   AND OUP.SFYX_ST = '1'
                   AND GR.SFYX_ST = '1'
                   AND GR.SFQY_ST = '1'
                   AND (GR.ROLE_TYPE='1' OR  GR.ROLE_TYPE='2')
                ) LOOP
        --判断角色是否为禁用关系
        SELECT COUNT(1)
          INTO V_COUNT
          FROM DUAL
         WHERE K.ROLE_ID IN
               (
                --用户关联角色（禁用）
                SELECT ROLE_ID
                  FROM SYS_GLB_ROLE
                 WHERE GL_TYPE = '3'
                   AND SFYX_ST = '1'
                   AND SFQY_ST = '0'
                   AND GL_ID = I.USER_ID
                   AND ROLE_ID = K.ROLE_ID
               );
        --角色未被禁用
        IF V_COUNT = 0 THEN
          INSERT INTO SYS_GLB_ROLE_USER
            (ID, ROLE_ID, USER_ID)
          VALUES
            (SEQ_SYS_GLB_ROLE_USER.NEXTVAL, K.ROLE_ID, I.USER_ID);
        END IF;
      END LOOP;
    END LOOP;
  END P_SET_USER_ROLES;

  --功能：保存机构时，新增了角色，当该机构下的用户已经有了该角色，删除用户的这个角色。
  --保存机构时，删除了角色，当某个用户已经有该角色且处于禁用时，且该用户所在的其它机构没有该角色删除该用户的角色，
  --若该用户所在的其它机构也有该角色，怎么不能删除这条禁用关系。
  --创建人：pc
  --创建时间：2018.6.26
  --最后修改人：pc
  --最后修改时间：2018.6.26
  PROCEDURE P_DEL_USER_ROLE_IF_ORGAN_EXIST(IN_ORGAN_ID INTEGER, --当前保存的机构id
                                           ADD_ROLES   VARCHAR2, --该机构新增的角色
                                           DEL_ROLES   VARCHAR2, --该机构删除的角色
                                           OUT_ERROR   OUT VARCHAR2) AS
    V_USER_IDS          VARCHAR2(4000);
    V_ORGAN_IDS         VARCHAR2(4000);
    V_ORGANS_ROLE_COUNT integer;
  BEGIN
    --获取当前机构下所有的用户
    SELECT WM_CONCAT(USER_ID)
      INTO V_USER_IDS
      FROM SYS_GLB_USER
     WHERE ORGAN_ID = IN_ORGAN_ID;

    FOR I IN (SELECT COLUMN_VALUE ROLE_ID
                FROM TABLE(SPLITSTR(ADD_ROLES, ','))) LOOP
      --删除用户已有的个性该角色
      FOR K IN (SELECT COLUMN_VALUE USER_ID
                  FROM TABLE(SPLITSTR(V_USER_IDS, ','))) LOOP
        DELETE SYS_GLB_ROLE T
         WHERE T.GL_ID = K.USER_ID
           AND T.ROLE_ID = I.ROLE_ID
           AND T.GL_TYPE = '3';
      END LOOP;

    END LOOP;

    FOR I IN (SELECT COLUMN_VALUE ROLE_ID
                FROM TABLE(SPLITSTR(DEL_ROLES, ','))) LOOP

      --删除用户已有的个性该角色
      FOR K IN (SELECT COLUMN_VALUE USER_ID
                  FROM TABLE(SPLITSTR(V_USER_IDS, ','))) LOOP
        SELECT WM_CONCAT(GOUP.ORGAN_ID)
          INTO V_ORGAN_IDS
          FROM SYS_GLB_USER GOUP
         WHERE GOUP.USER_ID = USER_ID; --获取该用户的机构总数

        SELECT COUNT(*)
          into V_ORGANS_ROLE_COUNT
          FROM SYS_GLB_ROLE
         WHERE ROLE_ID = I.ROLE_ID
           AND GL_ID IN (V_ORGAN_IDS);
        IF V_ORGANS_ROLE_COUNT = 1 THEN
          DELETE SYS_GLB_ROLE T
           WHERE T.GL_ID = K.USER_ID
             AND T.ROLE_ID = I.ROLE_ID
             AND T.GL_TYPE = '3';
        end if;

      END LOOP;
    END LOOP;

    OUT_ERROR := 'SUCCESS';
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := 'PROCEDURE:P_SAVE_ROLE_RELATIONS执行异常 ' || SQLERRM;
      ROLLBACK;

  END P_DEL_USER_ROLE_IF_ORGAN_EXIST;

  --功能：为角色分配关联要素时后置数据处理
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_SAVE_ROLE_RELATIONS(IN_ROLE_ID        INTEGER, --角色ID
                                  IN_ORGANS_ADD     CLOB, --增加机构
                                  IN_ORGANS_DEL     CLOB, --删除机构
                                  IN_USERS_INCLUDE  CLOB, --包含用户
                                  IN_USERS_EXCLUDE  CLOB, --排除用户
                                  IN_USERS_TURN     CLOB, --取消包含、排除用户
                                  OUT_ERROR         OUT VARCHAR2) --返回程序运行结果
   AS
     V_ROLE_TYPE VARCHAR2(20); --角色类型
  BEGIN
    OUT_ERROR := 'SUCCESS';
    SELECT ROLE_TYPE
          INTO V_ROLE_TYPE
          FROM SYS_ROLE WHERE ID = IN_ROLE_ID;
    IF IN_ORGANS_ADD IS NOT NULL THEN
      DELETE FROM TEMP_IDS_CLOB;
      INSERT INTO TEMP_IDS_CLOB (IDS) VALUES (IN_ORGANS_ADD);
      --增加机构与角色关系
      PKG_BASEPLAT.P_ADD_ORGAN_OR_BASE_POST(IN_ROLE_ID, 'ORGAN', V_ROLE_TYPE);
    END IF;

    IF IN_ORGANS_DEL IS NOT NULL THEN
      DELETE FROM TEMP_IDS_CLOB;
      INSERT INTO TEMP_IDS_CLOB (IDS) VALUES (IN_ORGANS_DEL);
      --删除机构与角色关系
      PKG_BASEPLAT.P_DEL_ORGAN_OR_BASE_POST(IN_ROLE_ID, 'ORGAN');
    END IF;

    IF IN_USERS_INCLUDE IS NOT NULL THEN
      DELETE FROM TEMP_IDS_CLOB;
      INSERT INTO TEMP_IDS_CLOB (IDS) VALUES (IN_USERS_INCLUDE);
      --增加用户与角色包含关系
      PKG_BASEPLAT.P_ADD_POST_OR_USER_INCLUDE(IN_ROLE_ID, 'USER',V_ROLE_TYPE);
    END IF;

    IF IN_USERS_EXCLUDE IS NOT NULL THEN
      DELETE FROM TEMP_IDS_CLOB;
      INSERT INTO TEMP_IDS_CLOB (IDS) VALUES (IN_USERS_EXCLUDE);
      --增加用户与角色排除关系
      PKG_BASEPLAT.P_ADD_POST_OR_USER_EXCLUDE(IN_ROLE_ID, 'USER',V_ROLE_TYPE);
    END IF;

    IF IN_USERS_TURN IS NOT NULL THEN
      DELETE FROM TEMP_IDS_CLOB;
      INSERT INTO TEMP_IDS_CLOB (IDS) VALUES (IN_USERS_TURN);
      --删除用户与角色的包含、排除关系
      PKG_BASEPLAT.P_DEL_POST_OR_USER_TURN(IN_ROLE_ID, 'USER');
    END IF;

    --生成角色与具体岗位、用户关系
    PKG_BASEPLAT.P_SET_ROLE_POST_AND_USER(IN_ROLE_ID, OUT_ERROR);

  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := 'PROCEDURE:P_SAVE_ROLE_RELATIONS执行异常 ' || SQLERRM;
      ROLLBACK;
  END P_SAVE_ROLE_RELATIONS;

  --增加机构、基础岗位与角色关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_ADD_ORGAN_OR_BASE_POST(IN_ROLE_ID INTEGER, --角色ID
                                     IN_TYPE    VARCHAR2,  --操作类型
                                     IN_ROLE_TYPE VARCHAR2)   --角色类型
   AS
    V_GL_ID NUMBER; --关联ID
    V_NUM   NUMBER; --数量
    V_IDS   CLOB; --CLOB变量
  BEGIN
    SELECT IDS INTO V_IDS FROM TEMP_IDS_CLOB;
    IF V_IDS IS NOT NULL THEN
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITCLOB(V_IDS, ','))) LOOP
        V_GL_ID := TO_NUMBER(K.COLUMN_VALUE);
        SELECT COUNT(1)
          INTO V_NUM
          FROM SYS_GLB_ROLE GR
         WHERE GR.ROLE_ID = IN_ROLE_ID
           AND GR.GL_ID = V_GL_ID
           AND GR.GL_TYPE = DECODE(IN_TYPE,
                                   'ORGAN',
                                   '2',
                                   'USER',
                                   '3')
           AND GR.SFQY_ST = '1'
           AND GR.SFYX_ST = '1';
        IF V_NUM = 0 THEN
          INSERT INTO SYS_GLB_ROLE
            (ID, ROLE_ID, GL_ID, GL_TYPE, SFQY_ST, SFYX_ST,ROLE_TYPE)
          VALUES
            (SEQ_SYS_GLB_ROLE.NEXTVAL,
             IN_ROLE_ID,
             V_GL_ID,
             DECODE(IN_TYPE,
                    'ORGAN',
                    '2',
                    'USER',
                    '3'),
             '1',
             '1',
             IN_ROLE_TYPE);
        END IF;
      END LOOP;
    END IF;
  END P_ADD_ORGAN_OR_BASE_POST;

  --删除机构、基础岗位与角色关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_DEL_ORGAN_OR_BASE_POST(IN_ROLE_ID INTEGER, --角色ID
                                     IN_TYPE    VARCHAR2) --操作类型
   AS
    V_GL_ID NUMBER; --关联ID
    V_IDS   CLOB; --CLOB变量
  BEGIN
    SELECT IDS INTO V_IDS FROM TEMP_IDS_CLOB;
    IF V_IDS IS NOT NULL THEN
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITCLOB(V_IDS, ','))) LOOP
        V_GL_ID := TO_NUMBER(K.COLUMN_VALUE);
        DELETE FROM SYS_GLB_ROLE GR
         WHERE GR.ROLE_ID = IN_ROLE_ID
           AND GR.GL_ID = V_GL_ID
           AND GR.GL_TYPE = DECODE(IN_TYPE,
                                   'ORGAN',
                                   '2',
                                   'USER',
                                   '3');
      END LOOP;
    END IF;
  END P_DEL_ORGAN_OR_BASE_POST;

  --增加具体岗位、用户与角色包含关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_ADD_POST_OR_USER_INCLUDE(IN_ROLE_ID INTEGER, --角色ID
                                       IN_TYPE    VARCHAR2, --操作类型
                                       IN_ROLE_TYPE VARCHAR2 )  --角色类型
   AS
    V_GL_ID NUMBER; --关联ID
    V_NUM   NUMBER; --数量
    V_IDS   CLOB; --CLOB变量
  BEGIN
    SELECT IDS INTO V_IDS FROM TEMP_IDS_CLOB;
    IF V_IDS IS NOT NULL THEN
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITCLOB(V_IDS, ','))) LOOP
        V_GL_ID := TO_NUMBER(K.COLUMN_VALUE);
        SELECT COUNT(1)
          INTO V_NUM
          FROM SYS_GLB_ROLE GR
         WHERE GR.ROLE_ID = IN_ROLE_ID
           AND GR.GL_ID = V_GL_ID
           AND GR.GL_TYPE = DECODE(IN_TYPE,
                                   'ORGAN',
                                   '2',
                                   'USER',
                                   '3')
           AND GR.SFQY_ST = '1'
           AND GR.SFYX_ST = '1';
        IF V_NUM = 0 THEN
          INSERT INTO SYS_GLB_ROLE
            (ID, ROLE_ID, GL_ID, GL_TYPE, SFQY_ST, SFYX_ST,ROLE_TYPE)
          VALUES
            (SEQ_SYS_GLB_ROLE.NEXTVAL,
             IN_ROLE_ID,
             V_GL_ID,
             DECODE(IN_TYPE,
                    'ORGAN',
                    '2',
                    'USER',
                    '3'),
             '1',
             '1',
             IN_ROLE_TYPE);
        END IF;
      END LOOP;
    END IF;
  END P_ADD_POST_OR_USER_INCLUDE;

  --增加具体岗位、用户与角色排除关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_ADD_POST_OR_USER_EXCLUDE(IN_ROLE_ID INTEGER, --角色ID
                                       IN_TYPE    VARCHAR2, --操作类型
                                       IN_ROLE_TYPE VARCHAR2) --角色类型
   AS
    V_GL_ID NUMBER; --关联ID
    V_NUM   NUMBER; --数量
    V_IDS   CLOB; --CLOB变量
  BEGIN
    SELECT IDS INTO V_IDS FROM TEMP_IDS_CLOB;
    IF V_IDS IS NOT NULL THEN
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITCLOB(V_IDS, ','))) LOOP
        V_GL_ID := TO_NUMBER(K.COLUMN_VALUE);
        SELECT COUNT(1)
          INTO V_NUM
          FROM SYS_GLB_ROLE GR
         WHERE GR.ROLE_ID = IN_ROLE_ID
           AND GR.GL_ID = V_GL_ID
           AND GR.GL_TYPE = DECODE(IN_TYPE,
                                   'ORGAN',
                                   '2',
                                   'USER',
                                   '3')
           AND GR.SFQY_ST = '0'
           AND GR.SFYX_ST = '1';
        IF V_NUM = 0 THEN
          INSERT INTO SYS_GLB_ROLE
            (ID, ROLE_ID, GL_ID, GL_TYPE, SFQY_ST, SFYX_ST,ROLE_TYPE)
          VALUES
            (SEQ_SYS_GLB_ROLE.NEXTVAL,
             IN_ROLE_ID,
             V_GL_ID,
             DECODE(IN_TYPE,
                    'ORGAN',
                    '2',
                    'USER',
                    '3'),
             '0',
             '1',
             IN_ROLE_TYPE);
        END IF;
      END LOOP;
    END IF;
  END P_ADD_POST_OR_USER_EXCLUDE;

  --删除具体岗位、用户与角色的包含、排除关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_DEL_POST_OR_USER_TURN(IN_ROLE_ID INTEGER, --角色ID
                                    IN_TYPE    VARCHAR2) --操作类型
   AS
    V_GL_ID NUMBER; --关联ID
    V_IDS   CLOB; --CLOB变量
  BEGIN
    SELECT IDS INTO V_IDS FROM TEMP_IDS_CLOB;
    IF V_IDS IS NOT NULL THEN
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITCLOB(V_IDS, ','))) LOOP
        V_GL_ID := TO_NUMBER(K.COLUMN_VALUE);
        DELETE FROM SYS_GLB_ROLE GR
         WHERE GR.ROLE_ID = IN_ROLE_ID
           AND GR.GL_ID = V_GL_ID
           AND GR.GL_TYPE = DECODE(IN_TYPE,
                                   'ORGAN',
                                   '2',
                                   'USER',
                                   '3');
      END LOOP;
    END IF;
  END P_DEL_POST_OR_USER_TURN;

  --生成角色与具体岗位、用户关系
  --创建人：wcy
  --创建时间：2017.12.29
  --最后修改人：wcy
  --最后修改时间：2017.12.29
  PROCEDURE P_SET_ROLE_POST_AND_USER(IN_ROLE_ID INTEGER, --角色ID
                                     OUT_ERROR  OUT VARCHAR2) --程序运行是否成功
   AS
    V_COUNT NUMBER;
  BEGIN
    OUT_ERROR := 'SUCCESS';
    --删除角色与用户关系
    DELETE FROM SYS_GLB_ROLE_USER GRU WHERE GRU.ROLE_ID = IN_ROLE_ID;
    --重新生成角色与用户关系
    FOR K IN ( --角色关联用户
              SELECT GL_ID USER_ID
                FROM SYS_GLB_ROLE
               WHERE GL_TYPE = '3'
                 AND SFYX_ST = '1'
                 AND SFQY_ST = '1'
                 AND ROLE_ID = IN_ROLE_ID
              UNION
              --角色关联机构下用户
              SELECT OUP.USER_ID
                FROM SYS_GLB_ROLE GR, SYS_GLB_USER OUP
               WHERE GR.ROLE_ID = IN_ROLE_ID
                 AND GR.GL_ID = OUP.ORGAN_ID
                 AND GR.GL_TYPE = '2'
                 AND OUP.SFYX_ST = '1'
                 AND GR.SFYX_ST = '1'
                 AND GR.SFQY_ST = '1') LOOP
      --判断角色是否为禁用关系
      SELECT COUNT(1)
        INTO V_COUNT
        FROM DUAL
       WHERE K.USER_ID IN
             (
              --角色关联用户（禁用）
              SELECT GL_ID
                FROM SYS_GLB_ROLE
               WHERE GL_TYPE = '3'
                 AND SFYX_ST = '1'
                 AND SFQY_ST = '0'
                 AND GL_ID = K.USER_ID
                 AND ROLE_ID = IN_ROLE_ID);
      --角色未被禁用
      IF V_COUNT = 0 THEN
        INSERT INTO SYS_GLB_ROLE_USER
          (ID, ROLE_ID, USER_ID)
        VALUES
          (SEQ_SYS_GLB_ROLE_USER.NEXTVAL, IN_ROLE_ID, K.USER_ID);
      END IF;
    END LOOP;
    --异常处理
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_SET_ROLE_POST_AND_USER;

  --删除机构、岗位角色、用户
  --创建人：wcy
  --创建时间：2018.1
  --最后修改人：pc
  --最后修改时间：2018.6
  PROCEDURE P_DELETE_ORGAN_POST_USER(IN_ID        INTEGER, --输入ID
                                     IN_TYPE      VARCHAR2, --操作类型
                                     IN_CHANGE_ID INTEGER, --输入变化ID
                                     OUT_ERROR    OUT VARCHAR2) --运行结果
   AS
    V_USER_IDS VARCHAR2(4000);
    ERR_DELETE_OPU EXCEPTION;
  BEGIN
    OUT_ERROR := 'SUCCESS';
    --操作类型为USER，输入ID为用户ID
    IF IN_TYPE = 'USER' THEN
      --删除三要素表中用户关联数据
      DELETE FROM SYS_GLB_USER WHERE USER_ID = IN_ID;
      --删除角色关联表中用户关联数据
      DELETE FROM SYS_GLB_ROLE
       WHERE GL_ID = IN_ID
         AND GL_TYPE = '3';
      --删除角色用户分解表中用户关联数据
      DELETE FROM SYS_GLB_ROLE_USER WHERE USER_ID = IN_ID;

      --操作类型为ORGAN，输入ID为机构ID
    ELSIF IN_TYPE = 'ORGAN' THEN
      IF IN_CHANGE_ID IS NOT NULL THEN
        --删除角色关联表数据(包括岗位角色)
        DELETE FROM SYS_GLB_ROLE
         WHERE GL_ID = IN_ID
           AND GL_TYPE = '2';
        --更新机构上级机构
        UPDATE SYS_ORGAN O
           SET O.PARENT_ORG = IN_CHANGE_ID
         WHERE O.PARENT_ORG = IN_ID
           AND O.SFYX_ST = '1';
        --查找机构下用户
        SELECT WM_CONCAT(OUP.USER_ID)
          INTO V_USER_IDS
          FROM SYS_GLB_USER OUP
         WHERE OUP.ORGAN_ID = IN_ID
           AND OUP.SFYX_ST = '1';

        --默认机构的改变（当机构下用户的默认机构，是该机构时，将默认机构改为替换的机构。）
        UPDATE SYS_USER U SET U.DEFAULT_ORGAN_ID=IN_CHANGE_ID WHERE U.DEFAULT_ORGAN_ID=IN_ID;

        --更新三要素表中数据,岗位id为空，机构换成传入的新机构
        UPDATE SYS_GLB_USER OUP
           SET OUP.POST_ID = '', OUP.ORGAN_ID = IN_CHANGE_ID
         WHERE OUP.ORGAN_ID = IN_ID
           AND OUP.SFYX_ST = '1';
        --生成用户与角色关联数据
        PKG_BASEPLAT.P_SET_USER_ROLES(V_USER_IDS);
      ELSE
        OUT_ERROR := '未指定调整后机构';
        RAISE ERR_DELETE_OPU;
      END IF;
    ELSE
      OUT_ERROR := '入参IN_TYPE值非法';
      RAISE ERR_DELETE_OPU;
    END IF;
    --异常处理
  EXCEPTION
    WHEN ERR_DELETE_OPU THEN
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_DELETE_ORGAN_POST_USER;

  --创建人：zxh
  --创建时间：2018.4
  --最后修改人：zxh
  --最后修改时间：2018.4
  PROCEDURE P_DEFAULT_RESOURCE_CONFIG(OUT_ERROR OUT VARCHAR2) --运行结果
   AS
    ERR_DELETE_OPU EXCEPTION;
  BEGIN
    OUT_ERROR := 'SUCCESS';
    EXECUTE IMMEDIATE 'DELETE FROM SYS_CONFIG C WHERE (INSTR(C.CODE, ''res_'') > -0 OR C.CODE = ''resType'') AND C.BIZ_TYPE = 2 AND LEVELS = 1';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''包含资源'', ''resType'', ''app,menu,page,func'', ''包含资源类目，各类资源具体配置以资源res_+类型开头。'', 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源属性：应用'', ''res_app_column'', ''url,icon.bizType'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源属性：菜单'', ''res_menu_column'', ''icon,url'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源属性：页面'', ''res_page_column'', ''url'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源属性：功能'', ''res_func_column'', ''url'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源图标：应用'', ''res_app_icon'', ''/medias/style/plat/image/resource/res_app.png'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源图标：菜单'', ''res_menu_icon'', ''/medias/style/plat/image/resource/res_menu.png'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源图标：页面'', ''res_page_icon'', ''/medias/style/plat/image/resource/res_page.png'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源图标：功能'', ''res_func_icon'', ''/medias/style/plat/image/resource/res_func.png'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源名称：应用'', ''res_app_name'', ''应用'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源名称：菜单'', ''res_menu_name'', ''菜单'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源名称：页面'', ''res_page_name'', ''页面'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源名称：功能'', ''res_func_name'', ''功能'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源上级：应用'', ''res_app_parent'', null, null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源上级：菜单'', ''res_menu_parent'', ''app,menu'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源上级：页面'', ''res_page_parent'', ''menu'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源上级：功能'', ''res_func_parent'', ''page'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源图标选择：应用'', ''res_app_iconpath'', ''/resource/iconfontSelect'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源业务字典：应用'', ''res_app_bizdict'', ''APPBIZTYPE'', ''资源业务字典：app'', 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源图标选择：菜单'', ''res_menu_iconpath'', ''/resource/iconfontSelect'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源灰色图标：页面'', ''res_page_garyicon'', ''/medias/style/plat/image/resource/res_page_gary.png'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';
    EXECUTE IMMEDIATE 'insert into SYS_CONFIG (id, name, code, value, description, cjr_id, cjsj, xgr_id, xgsj, sfyx_st, levels, biz_type, app_id)' ||
                      'values (seq_sys_config.nextval, ''资源地址选择：菜单'', ''res_menu_urlselect'', ''/resource/menuUrlSelect'', null, 286, sysdate, 286, sysdate, ''1'', ''1'', ''2'', null)';

  EXCEPTION
    WHEN ERR_DELETE_OPU THEN
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_DEFAULT_RESOURCE_CONFIG;

  --更新数据权限
  --创建人：wcy
  --创建时间：2018.3
  --最后修改人：wcy
  --最后修改时间：2018.3
  PROCEDURE P_UPDATE_DATA_AUTH(IN_OBJECT_ID INTEGER, --对象类型ID
                               IN_USER_IDS  CLOB, --用户IDS
                               IN_OIDS      CLOB, --对象IDS
                               IN_USER_ID   INTEGER, --当前用户ID
                               OUT_ERROR    OUT VARCHAR2) --运行结果
   AS
    V_USER_ID INTEGER;
    V_NUM     INTEGER;
    V_COUNT   INTEGER;
    ERR_DATA_AUTH EXCEPTION;
  BEGIN
    OUT_ERROR := 'SUCCESS';
    IF IN_OBJECT_ID IS NOT NULL THEN
      IF IN_USER_IDS IS NOT NULL THEN
        FOR K IN (SELECT COLUMN_VALUE
                    FROM TABLE(SPLITCLOB(IN_USER_IDS, ','))) LOOP
          V_USER_ID := TO_NUMBER(K.COLUMN_VALUE);
          --设置部分数据权限
          IF IN_OIDS IS NOT NULL THEN
            --查看原有权限是否为全部数据权限
            SELECT COUNT(1)
              INTO V_NUM
              FROM SYS_DATA_AUTH A
             WHERE A.OBJECT_ID = IN_OBJECT_ID
               AND A.USER_ID = V_USER_ID
               AND A.OIDS IS NULL
               AND A.SFYX_ST = '1';
            --否
            IF V_NUM = 0 THEN
              FOR J IN (SELECT COLUMN_VALUE
                          FROM TABLE(SPLITCLOB(IN_OIDS, ','))) LOOP
                SELECT COUNT(1)
                  INTO V_COUNT
                  FROM SYS_DATA_AUTH A
                 WHERE A.OBJECT_ID = IN_OBJECT_ID
                   AND A.USER_ID = V_USER_ID
                   AND A.OIDS = J.COLUMN_VALUE
                   AND A.SFYX_ST = '1';
                --当用户没有此权限时，新增此权限
                IF V_COUNT = 0 THEN
                  INSERT INTO SYS_DATA_AUTH
                    (ID, OBJECT_ID, USER_ID, OIDS, CJR_ID, CJSJ, SFYX_ST)
                  VALUES
                    (SEQ_SYS_DATA_AUTH.NEXTVAL,
                     IN_OBJECT_ID,
                     V_USER_ID,
                     J.COLUMN_VALUE,
                     IN_USER_ID,
                     SYSDATE,
                     '1');
                END IF;
              END LOOP;
            END IF;
            --设置全部数据权限
          ELSE
            --删除原有权限
            DELETE FROM SYS_DATA_AUTH A
             WHERE A.OBJECT_ID = IN_OBJECT_ID
               AND A.USER_ID = V_USER_ID;
            --设置新权限
            INSERT INTO SYS_DATA_AUTH
              (ID, OBJECT_ID, USER_ID, OIDS, CJR_ID, CJSJ, SFYX_ST)
            VALUES
              (SEQ_SYS_DATA_AUTH.NEXTVAL,
               IN_OBJECT_ID,
               V_USER_ID,
               NULL,
               IN_USER_ID,
               SYSDATE,
               '1');
          END IF;
        END LOOP;
      ELSE
        OUT_ERROR := '未指定用户';
        RAISE ERR_DATA_AUTH;
      END IF;
    ELSE
      OUT_ERROR := '未指定对象类型';
      RAISE ERR_DATA_AUTH;
    END IF;
    --异常处理
  EXCEPTION
    WHEN ERR_DATA_AUTH THEN
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_UPDATE_DATA_AUTH;

  --组合角色分解
  --创建人：dmx
  --创建时间：2018.6.25
  PROCEDURE P_FACTOR_COMBINE_ROLE(IN_ROLE_ID IN INTEGER, --角色ID
                                  OUT_ERROR  OUT VARCHAR2) --程序运行结果
   AS
   IS_COMBINE CHAR(1);--是否是组合角色
  BEGIN
    OUT_ERROR := 'SUCCESS';
    IF IN_ROLE_ID IS NULL OR TRIM(IN_ROLE_ID) IS NULL THEN
      OUT_ERROR := '要分解的角色编号为空';
      RETURN;
    END IF;
    BEGIN
      SELECT R.IS_COMBINE
        INTO IS_COMBINE
        FROM SYS_ROLE R
       WHERE R.ID = IN_ROLE_ID;
      --不是组合角色直接返回
      IF IS_COMBINE = '0' THEN
        RETURN;
      END IF;
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        OUT_ERROR := '不存在角色ID为' || IN_ROLE_ID || '的有效角色';
    END;
    --向上递归查询所有父亲角色
    FOR L_CUR IN (SELECT DISTINCT R.COMBINE_ROLE_ID
                    FROM (SELECT C.COMBINE_ROLE_ID, C.ROLE_ID
                            FROM SYS_GLB_COMBINE_ROLE C
                           WHERE C.SFYX_ST = '1') R
                   WHERE R.COMBINE_ROLE_ID <> IN_ROLE_ID
                   START WITH R.ROLE_ID = IN_ROLE_ID
                  CONNECT BY NOCYCLE PRIOR R.COMBINE_ROLE_ID = R.ROLE_ID
                  UNION ALL
                  SELECT IN_ROLE_ID
                    FROM DUAL) LOOP
      --清除原分解数据
      DELETE FROM SYS_GLB_COMBINE_ROLE_FJ S
       WHERE S.COMBINE_ROLE_ID = L_CUR.COMBINE_ROLE_ID;
      --递归查询组合角色下的普通角色
      FOR LL_CUR IN (SELECT DISTINCT R1.ROLE_ID
                       FROM (SELECT C1.COMBINE_ROLE_ID, C1.ROLE_ID
                               FROM SYS_GLB_COMBINE_ROLE C1
                              WHERE C1.SFYX_ST = '1') R1
                      WHERE R1.ROLE_ID <> L_CUR.COMBINE_ROLE_ID
                      START WITH R1.COMBINE_ROLE_ID = L_CUR.COMBINE_ROLE_ID
                     CONNECT BY NOCYCLE
                      R1.COMBINE_ROLE_ID = PRIOR R1.ROLE_ID) LOOP
        --插入角色分解表
        INSERT INTO SYS_GLB_COMBINE_ROLE_FJ
          (ID, COMBINE_ROLE_ID, ROLE_ID, SFYX_ST)
        VALUES
          (SEQ_SYS_GLB_COMBINE_ROLE_FJ.NEXTVAL,
           L_CUR.COMBINE_ROLE_ID,
           LL_CUR.ROLE_ID,
           '1');
      END LOOP;
    END LOOP;
    --提交数据
    COMMIT;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      --出现异常回滚
      ROLLBACK;
  END P_FACTOR_COMBINE_ROLE;

  --角色删除后置处理
  --创建人：dmx
  --创建时间：2018.6.28
  PROCEDURE P_AFTER_DELETE_ROLE(IN_ROLE_ID IN INTEGER, --角色ID
                                OUT_ERROR  OUT VARCHAR2) --程序运行结果
   AS
  BEGIN
    OUT_ERROR := 'SUCCESS';
    --更新角色关联表
    UPDATE SYS_GLB_ROLE SET SFYX_ST = '0' WHERE ROLE_ID = IN_ROLE_ID;
    --更新角色关联资源表
    UPDATE SYS_GLB_ROLE_RESOURCE
       SET SFYX_ST = '0'
     WHERE ROLE_ID = IN_ROLE_ID;
    --删除角色关联岗位表
   -- DELETE SYS_GLB_ROLE_POST WHERE ROLE_ID = IN_ROLE_ID;
    --删除角色关联用户表
    DELETE SYS_GLB_ROLE_USER WHERE ROLE_ID = IN_ROLE_ID;
    --更新角色关联规则表
    UPDATE SYS_GLB_ROLE_AUTHRULE
       SET SFYX_ST = '0'
     WHERE ROLE_ID = IN_ROLE_ID;
    --更新角色组合
    UPDATE SYS_GLB_COMBINE_ROLE S
       SET S.SFYX_ST = '0'
     WHERE S.COMBINE_ROLE_ID = IN_ROLE_ID;
    --更新父级角色组合
    UPDATE SYS_GLB_COMBINE_ROLE S
       SET S.SFYX_ST = '0'
     WHERE S.ROLE_ID = IN_ROLE_ID;
    --刷新父级角色分解
    P_FACTOR_COMBINE_ROLE(IN_ROLE_ID, OUT_ERROR);
    --删除角色分解
    DELETE SYS_GLB_COMBINE_ROLE_FJ F WHERE F.COMBINE_ROLE_ID = IN_ROLE_ID;
    COMMIT;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      --出现异常回滚
      ROLLBACK;
  END P_AFTER_DELETE_ROLE;

END PKG_BASEPLAT;
/

prompt
prompt Creating package body PKG_FORM_DEF
prompt ==================================
prompt
create or replace package body PKG_FORM_DEF is

  --功能：创建表
  --创建人：mrq
  --创建时间：2018.8
  PROCEDURE P_CREATE_FORMTABLE(IN_TABLE_NAME VARCHAR2, --数据库名称
                            IN_TABLE_SQL VARCHAR2, --建表sql
                            OUT_ERROR    OUT VARCHAR2) --返回程序执行情况
   AS
    V_NUM        number; --流程实例ID
    V_TABLE_NAME VARCHAR2(50); --表名
    V_SEQ_NAME   VARCHAR2(50); --序列名
  BEGIN
    OUT_ERROR    := 'SUCCESS';
    V_TABLE_NAME := UPPER(IN_TABLE_NAME);
    --删除表
    select count(1)
      into V_NUM
      from user_tables
     where table_name = V_TABLE_NAME;
    if V_NUM > 0 then
      execute immediate CONCAT('drop table ', V_TABLE_NAME);
    end if;
    --删除序列
    V_SEQ_NAME := UPPER(CONCAT('SEQ_', V_TABLE_NAME));
    select count(1)
      into V_NUM
      from user_sequences
     where sequence_name = V_SEQ_NAME;
    if V_NUM > 0 then
      execute immediate CONCAT('drop SEQUENCE ', V_SEQ_NAME);
    end if;
    execute immediate IN_TABLE_SQL;
    execute immediate CONCAT(CONCAT('CREATE SEQUENCE ', V_SEQ_NAME),
                             ' start with 1 increment by 1');
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_CREATE_FORMTABLE;
end PKG_FORM_DEF;
/

prompt
prompt Creating package body PKG_TASK
prompt ==============================
prompt
CREATE OR REPLACE PACKAGE BODY PKG_TASK IS

  V_VALID            CONSTANT CHAR(1) := '1'; --有效状态 有效
  V_SUCCESS_FLAG     CONSTANT VARCHAR2(10) := 'SUCCESS'; --程序运行成功标识 与JAVA代码对应
  V_ACTION_SUBMIT    CONSTANT VARCHAR2(10) := 'SUBMIT'; --任务提交
  V_ACTION_BACK      CONSTANT VARCHAR2(10) := 'BACK'; --任务退回
  V_ACTION_RECOVER   CONSTANT VARCHAR2(10) := 'RECOVER'; --任务撤回
  V_SUBMIT_SUCCESS   CONSTANT VARCHAR2(20) := '提交成功'; --提交成功提示
  V_BACK_SUCCESS     CONSTANT VARCHAR2(20) := '退回成功'; --退回成功提示
  V_RECOVER_SUCCESS  CONSTANT VARCHAR2(20) := '撤回成功'; --撤回成功提示
  V_TRANSFER_SUCCESS CONSTANT VARCHAR2(20) := '转办成功'; --转办成功提示
  V_SIGN_SUCCESS     CONSTANT VARCHAR2(20) := '签收成功'; --签收成功提示

  --功能：签收任务
  --创建人：lb
  --创建时间：2016.9
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_TASK_SIGN(IN_TASK_ID NUMBER, --任务实例ID
                        OUT_STR    OUT VARCHAR2, --返回签收情况信息
                        OUT_ERROR  OUT VARCHAR2) --返回程序执行情况
   AS
    V_NODE_TYPE     CHAR(1); --环节类型
    V_TRANSACT_TYPE CHAR(1); --办理方式，抢占或嵌套
    V_HAS_MSG       CHAR(1); --是否生成消息
    V_USER_IDS      VARCHAR2(200); --任务待办人
    V_WF_INS_ID     INTEGER; --流程实例ID
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --查找任务所在环节类型 流程实例
    SELECT NODE.TYPE, TASK.WORKFLOW_INSTANCE_ID
      INTO V_NODE_TYPE, V_WF_INS_ID
      FROM SYS_TASK_INSTANCE TASK, SYS_NODE NODE, SYS_NODE_INSTANCE S
     WHERE TASK.ID = IN_TASK_ID
       AND S.NODE_ID = NODE.ID
       AND S.ID = TASK.NODE_INSTANCE_ID
       AND TASK.SFYX_ST = V_VALID
       AND NODE.SFYX_ST = V_VALID
       AND S.SFYX_ST = V_VALID;
    IF V_NODE_TYPE = '2' THEN
      --如果是活动环节，再判断是否抢占
      SELECT NODE.TRANSACT_TYPE
        INTO V_TRANSACT_TYPE
        FROM SYS_TASK_INSTANCE TASK,
             SYS_ACTIVITY_NODE NODE,
             SYS_NODE_INSTANCE S
       WHERE TASK.ID = IN_TASK_ID
         AND S.NODE_ID = NODE.ID
         AND S.ID = TASK.NODE_INSTANCE_ID
         AND TASK.SFYX_ST = V_VALID
         AND S.SFYX_ST = V_VALID;
      IF V_TRANSACT_TYPE = '0' THEN
        --如果抢占，则将该环节下其他任务状态置为抢占终止，动作为无动作，是否完成为已完成
        UPDATE SYS_TASK_INSTANCE TA
           SET TA.STATUS      = '3',
               TA.ACTION      = '1',
               TA.IS_FINISH   = '1',
               TA.FINISH_DATE = SYSDATE
         WHERE TA.NODE_INSTANCE_ID IN
               (SELECT S.NODE_INSTANCE_ID
                  FROM SYS_TASK_INSTANCE S
                 WHERE S.ID = IN_TASK_ID
                   AND S.SFYX_ST = V_VALID)
           AND TA.ID <> IN_TASK_ID
           AND TA.SFYX_ST = V_VALID;
      END IF;
    END IF;
    --将该任务状态改为在办，动作为签收
    UPDATE SYS_TASK_INSTANCE
       SET STATUS      = '1',
           ACTION      = '2',
           ACCEPT_DATE = SYSDATE,
           IS_FINISH   = '0'
     WHERE ID = IN_TASK_ID
       AND SFYX_ST = V_VALID;
    --查找当前流程实例下所有待办人
    SELECT WM_CONCAT(TI.USER_ID)
      INTO V_USER_IDS
      FROM SYS_TASK_INSTANCE TI
     WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND TI.IS_FINISH = '0'
       AND TI.SFYX_ST = V_VALID;
    --更新待办人
    UPDATE SYS_GLB_BIZ_WF
       SET TODO_USERS = V_USER_IDS
     WHERE WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND SFYX_ST = V_VALID;
    --返回信息
    OUT_STR := V_SIGN_SUCCESS;
    --是否启用工作流消息（暂未实现）
    SELECT W.HAS_MSG
      INTO V_HAS_MSG
      FROM SYS_WORKFLOW W, SYS_WORKFLOW_INSTANCE WI
     WHERE W.ID = WI.WORKFLOW_ID
       AND WI.ID = V_WF_INS_ID
       AND W.SFYX_ST = V_VALID
       AND WI.SFYX_ST = V_VALID;
    IF V_HAS_MSG = '1' THEN
      PKG_TASK.P_PRODUCE_MESSAGE(IN_TASK_ID, '2');
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_STR   := '签收时出现异常';
      OUT_ERROR := OUT_STR || SQLERRM;
      ROLLBACK;
  END P_TASK_SIGN;

  --功能：办理任务（正常提交或退回）
  --创建人：lb
  --创建时间：2016.9
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_TASK_SUBMIT(IN_TASK_ID       NUMBER, --任务实例ID
                          IN_USER_IDS      VARCHAR2, --指定办理人IDS,用逗号分隔
                          IN_DECISION      VARCHAR2, --决策条件
                          IN_BLYJ          VARCHAR2, --任务办理意见
                          IN_FJ_ID         VARCHAR2, --附件ID
                          IN_FLAG          VARCHAR2, --同意，不同意标志位，0：不同意 1：同意
                          IN_BACK_NODE_IDS VARCHAR2, --指定退回的环节IDS
                          OUT_STR          OUT VARCHAR2, --返回的不能提交的业务原因
                          OUT_ERROR        OUT VARCHAR2) --返回程序执行情况

   AS
    V_HAS_MSG               CHAR(1); --引擎是否产生消息(暂未实现配置)
    V_NATURE                CHAR(1); --环节的分支聚合属性 1分支 2聚合 0普通
    V_TASK_STATUS           CHAR(1); --任务状态
    V_FINISHED              CHAR(1); --是否已完成
    V_TRANSACT_TYPE         CHAR(1); --活动环节办理方式
    V_NEXT_NODE_TYPE        CHAR(1); --下一环节类型
    V_COUNTERSIGN_PARAMETER CHAR(1); --会签处理参数
    V_DECISION_TYPE         CHAR(1); --决策环节的决策类型
    V_CAN_INSTANCE          CHAR(1); --聚合环节是否可以实例化标志
    V_PRE_NODE_NATURE       CHAR(1); --上一环节分支聚合属性
    V_NEXT_NODE_ID          NUMBER; --下一环节ID
    V_NODE_ID               NUMBER; --环节ID
    V_NODE_INS_ID           NUMBER; --环节实例ID
    V_PRE_NODE_INS_ID       NUMBER; --前环节实例ID
    V_WF_ID                 NUMBER; --本流程ID
    V_WF_INS_ID             NUMBER; --本流程实例ID
    V_FINISH_NUM            NUMBER; --环节实例下已完成任务数
    V_TOTAL_NUM             NUMBER; --环节实例下总任务数
    V_NODE_INS_SFWC         NUMBER := 0; --环节实例是否完成  0未完成 1完成
    V_DISAGREE_NODE_ID      NUMBER; --退回至环节ID
    V_NUM                   NUMBER; --计数
    V_COUNT                 NUMBER; --计数
    V_COUNTERSIGN_VALUE     NUMBER; --会签处理参数值
    V_BACK_NODE_INS_ID      NUMBER; --退回环节最大已完成环节实例
    V_OPINION               VARCHAR2(50); --环节默认提交意见
    V_USER_IDS              VARCHAR2(32767); --任务办理人IDS
    V_BRANCHSTR             VARCHAR2(2000); --决策环节后流向分支条件拼接串
    V_SQL                   VARCHAR2(2000); --SQL脚本
    V_JCHJTJ                VARCHAR2(200); --决策环节条件
    V_BRANCH                VARCHAR2(200); --决策环节后流向分支条件
    V_WF_INS_STATUS         VARCHAR2(10); --流程实例状态
    TYPE TYPE_ROUTER IS TABLE OF SYS_ROUTER%ROWTYPE; --流向记录表类型
    V_ROUTER TYPE_ROUTER; --存储流向记录表变量
    ERR_HANDLE_TASK EXCEPTION; --抛出自定义异常
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --更新任务表单实例中的审批意见
    UPDATE SYS_TASK_PAGE_INSTANCE TPI
       SET TPI.TASK_PAGE_OPINION =
           (SELECT T.BLYJ
              FROM TEMP_TASK_PAGE_BLYJ T
             WHERE T.NODE_PAGE_ID = TPI.NODE_PAGE_ID)
     WHERE TPI.TASK_INSTANCE_ID = IN_TASK_ID
       AND TPI.SFYX_ST = V_VALID;
    --清除审批意见临时表数据
    DELETE FROM TEMP_TASK_PAGE_BLYJ;
    --将任务表单实例中的草稿数据JSON清空
    UPDATE SYS_TASK_PAGE_INSTANCE
       SET TMP_DATA_JSON = NULL
     WHERE TASK_INSTANCE_ID = IN_TASK_ID;
    --查找提交任务是否已完成，任务状态，所在流程实例ID
    SELECT TI.IS_FINISH,
           TI.STATUS,
           TI.WORKFLOW_INSTANCE_ID,
           N.NATURE,
           N.OPINION
      INTO V_FINISHED, V_TASK_STATUS, V_WF_INS_ID, V_NATURE, V_OPINION
      FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE NI, SYS_NODE N
     WHERE TI.ID = IN_TASK_ID
       AND TI.NODE_INSTANCE_ID = NI.ID
       AND NI.NODE_ID = N.ID
       AND TI.SFYX_ST = V_VALID
       AND NI.SFYX_ST = V_VALID
       AND N.SFYX_ST = V_VALID;
    --查找是否产生消息
    SELECT W.HAS_MSG
      INTO V_HAS_MSG
      FROM SYS_WORKFLOW W, SYS_WORKFLOW_INSTANCE WI
     WHERE W.ID = WI.WORKFLOW_ID
       AND WI.ID = V_WF_INS_ID
       AND W.SFYX_ST = V_VALID
       AND WI.SFYX_ST = V_VALID;
    --查找办理环节ID,多人办理方式,活动环节实例ID
    SELECT AN.ID,
           AN.TRANSACT_TYPE,
           AN.COUNTERSIGN_PARAMETER,
           AN.COUNTERSIGN_VALUE,
           T.NODE_INSTANCE_ID
      INTO V_NODE_ID,
           V_TRANSACT_TYPE,
           V_COUNTERSIGN_PARAMETER,
           V_COUNTERSIGN_VALUE,
           V_NODE_INS_ID
      FROM SYS_TASK_INSTANCE T, SYS_ACTIVITY_NODE AN, SYS_NODE_INSTANCE N
     WHERE AN.ID = N.NODE_ID
       AND N.ID = T.NODE_INSTANCE_ID
       AND T.ID = IN_TASK_ID
       AND T.SFYX_ST = V_VALID
       AND N.SFYX_ST = V_VALID;
    --已完成任务不能提交
    IF V_FINISHED = '1' THEN
      OUT_STR := '该任务已完成，不能办理';
      --任务未完成
    ELSIF V_FINISHED = '0' THEN
      --提交时点击的是同意
      IF IN_FLAG = '1' THEN
        --任务状态为在办OR待办
        IF V_TASK_STATUS IN ('0', '1') THEN
          --查找本流程实例的状态，如果是未提交，改为运行
          SELECT STATUS
            INTO V_WF_INS_STATUS
            FROM SYS_WORKFLOW_INSTANCE
           WHERE ID = V_WF_INS_ID
             AND SFYX_ST = V_VALID;
          IF V_WF_INS_STATUS = '5' THEN
            UPDATE SYS_WORKFLOW_INSTANCE
               SET STATUS = '2'
             WHERE ID = V_WF_INS_ID
               AND SFYX_ST = V_VALID;
          END IF;
          --如果办理环节ID为空，说明不是办理环节，提示不能提交
          IF V_NODE_ID IS NULL THEN
            OUT_STR := '当前任务所在环节不是活动环节，不能提交';
            --如果找到了办理环节ID，说明是办理环节，继续操作
          ELSE
            --自动办理
            /*IF INSTR(IN_BLYJ, '自动办理') > 0 THEN
              --更新任务表单中的意见默认为同意
              UPDATE SYS_TASK_WF_PAGE_INSTANCE TPI
                 SET TPI.TASK_PAGE_OPINION = '同意'
               WHERE TPI.TASK_INSTANCE_ID = IN_TASK_ID;
              --维护自动办理记录表
              INSERT INTO SYS_WF_AUTO_HANDLE_USER
                (WORKFLOW_INSTANCE_ID, NODE_ID, USER_ID)
                SELECT V_WF_INS_ID, NI.NODE_ID, TI.USER_ID
                  FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE NI
                 WHERE TI.NODE_INSTANCE_ID = NI.ID
                   AND TI.SFYX_ST = V_VALID
                   AND NI.SFYX_ST = V_VALID
                   AND TI.ID = IN_TASK_ID;
            END IF;*/
            IF IN_BLYJ IS NOT NULL THEN
              V_OPINION := IN_BLYJ;
            END IF;
            --更新当前任务实例是否完成为已完成，办理动作为提交
            UPDATE SYS_TASK_INSTANCE T
               SET T.IS_FINISH   = '1',
                   T.STATUS      = '2',
                   T.FINISH_DATE = SYSDATE,
                   T.OPINION     = V_OPINION,
                   T.ACTION      = '3',
                   T.FJ_ID       = IN_FJ_ID
             WHERE T.ID = IN_TASK_ID
               AND T.SFYX_ST = V_VALID;
            --办理方式为抢占
            IF V_TRANSACT_TYPE = '0' THEN
              --更新环节实例下其他任务实例的任务状态为抢占终止，是否完成为完成
              UPDATE SYS_TASK_INSTANCE T
                 SET T.IS_FINISH   = '1',
                     T.STATUS      = '3',
                     T.FINISH_DATE = SYSDATE
               WHERE T.ID <> IN_TASK_ID
                 AND T.IS_FINISH = '0'
                 AND T.NODE_INSTANCE_ID = V_NODE_INS_ID;
              --标记变量设1
              V_NODE_INS_SFWC := 1;
              --办理方式为会签
            ELSIF V_TRANSACT_TYPE = '1' THEN
              --查询当前任务所在的环节实例下的任务总数，与已完成的任务数
              SELECT COUNT(1),
                     SUM(CASE
                           WHEN T.IS_FINISH = '1' THEN
                            1
                           ELSE
                            0
                         END)
                INTO V_TOTAL_NUM, V_FINISH_NUM
                FROM SYS_TASK_INSTANCE T
               WHERE T.NODE_INSTANCE_ID = V_NODE_INS_ID
                 AND T.ACTION <> '5'
                 AND T.SFYX_ST = V_VALID;
              --如果会签处理参数为全部人员
              IF V_COUNTERSIGN_PARAMETER = '0' THEN
                --任务全部完成，
                IF V_FINISH_NUM = V_TOTAL_NUM THEN
                  --标记变量设1
                  V_NODE_INS_SFWC := 1;
                END IF;
                --如果会签处理参数为比例
              ELSIF V_COUNTERSIGN_PARAMETER = '1' THEN
                IF (V_FINISH_NUM / V_TOTAL_NUM) * 100 >=
                   V_COUNTERSIGN_VALUE THEN
                  --将尚未完成任务状态置为4 会签终止  是否完成置为完成  时间
                  UPDATE SYS_TASK_INSTANCE T
                     SET T.IS_FINISH   = '1',
                         T.STATUS      = '4',
                         T.FINISH_DATE = SYSDATE
                   WHERE T.NODE_INSTANCE_ID = V_NODE_INS_ID
                     AND T.IS_FINISH = '0'
                     AND T.SFYX_ST = V_VALID;
                  --标记变量设1
                  V_NODE_INS_SFWC := 1;
                END IF;
               ----如果会签处理参数为固定人数
              ELSIF V_COUNTERSIGN_PARAMETER = '2' THEN
                IF V_FINISH_NUM  >= V_COUNTERSIGN_VALUE THEN
                  --将尚未完成任务状态置为4 会签终止  是否完成置为完成  时间
                  UPDATE SYS_TASK_INSTANCE T
                     SET T.IS_FINISH   = '1',
                         T.STATUS      = '4',
                         T.FINISH_DATE = SYSDATE
                   WHERE T.NODE_INSTANCE_ID = V_NODE_INS_ID
                     AND T.IS_FINISH = '0'
                     AND T.SFYX_ST = V_VALID;
                  --标记变量设1
                  V_NODE_INS_SFWC := 1;
                END IF;
              END IF;
            END IF;
          END IF;
          --标记变量为1，即本环节所有任务已完成
          IF V_NODE_INS_SFWC = 1 THEN
            --更新环节实例状态为完成
            UPDATE SYS_NODE_INSTANCE T
               SET T.STATUS = '2', T.FINISH_DATE = SYSDATE
             WHERE T.ID = V_NODE_INS_ID
               AND T.SFYX_ST = V_VALID;
            --执行环节结束后处理程序
            PKG_TASK.P_FINISH_PROCESS('2', V_WF_INS_ID, V_NODE_ID);

            --初始化临时表数据
            DELETE FROM TEMP_NODE;
            --将办理环节ID插入临时表
            INSERT INTO TEMP_NODE (NODE_ID) VALUES (V_NODE_ID);
            --通过流向查找下一环节，下一环节可能有多个，所以循环查找
            LOOP
              --查找临时表的记录数，如果没有记录，跳出循环
              SELECT COUNT(1) INTO V_COUNT FROM TEMP_NODE;
              EXIT WHEN V_COUNT = 0;
              EXECUTE IMMEDIATE ' SELECT *
                FROM SYS_ROUTER R
               WHERE R.START_NODE_ID IN (SELECT N.NODE_ID FROM TEMP_NODE N) AND SFYX_ST=''1'' ' ||
                                V_JCHJTJ BULK COLLECT
                INTO V_ROUTER;
              --清空临时表数据
              DELETE FROM TEMP_NODE;
              FOR V_I IN 1 .. V_ROUTER.COUNT LOOP
                --查找下一环节ID,环节类型，所属流程ID
                SELECT T.ID, T.TYPE, T.WORKFLOW_ID
                  INTO V_NEXT_NODE_ID, V_NEXT_NODE_TYPE, V_WF_ID
                  FROM SYS_NODE T
                 WHERE T.ID = V_ROUTER(V_I).END_NODE_ID
                   AND T.SFYX_ST = V_VALID;
                --如果下一个环节类型是活动环节
                IF V_NEXT_NODE_TYPE = '2' THEN
                  --自动办理逻辑
                  --判断下一环节是否存在办理表单，如果存在清除该流程实例对应的所有工作流流程自动办理参考表记录
                  /*SELECT COUNT(1)
                    INTO V_COUNT
                    FROM SYS_NODE_PAGE NP
                   WHERE NP.CONTROL = '0'
                     AND NP.NODE_ID = V_ROUTER(V_I).END_NODE_ID
                     AND NP.SFYX_ST = V_VALID;
                  IF V_COUNT > 0 THEN
                    DELETE FROM SYS_WF_AUTO_HANDLE_USER WA
                     WHERE WA.WORKFLOW_INSTANCE_ID = V_WF_INS_ID;
                  END IF;*/
                  --查找活动环节分支聚合属性
                  SELECT N.NATURE
                    INTO V_NATURE
                    FROM SYS_NODE N
                   WHERE N.ID = V_NEXT_NODE_ID
                     AND N.SFYX_ST = V_VALID;
                  --如果是聚合，验证是否可以实例化
                  IF V_NATURE = '2' THEN
                    V_CAN_INSTANCE := F_MERGE_NODE_CAN_INSTANCE(V_NEXT_NODE_ID,
                                                                V_WF_INS_ID);
                    IF V_CAN_INSTANCE = '1' THEN
                      --实例化环节
                      PKG_WF.P_WORKFLOW_INSTANCE_NODE(V_ROUTER(V_I)
                                                      .END_NODE_ID,
                                                      IN_USER_IDS,
                                                      V_WF_INS_ID,
                                                      V_ACTION_SUBMIT || ',' ||
                                                      IN_TASK_ID,
                                                      OUT_STR,
                                                      OUT_ERROR);
                    END IF;
                  ELSE
                    --实例化环节
                    PKG_WF.P_WORKFLOW_INSTANCE_NODE(V_ROUTER(V_I)
                                                    .END_NODE_ID,
                                                    IN_USER_IDS,
                                                    V_WF_INS_ID,
                                                    V_ACTION_SUBMIT || ',' ||
                                                    IN_TASK_ID,
                                                    OUT_STR,
                                                    OUT_ERROR);
                  END IF;
                  --实例化环节成功
                  IF OUT_STR IS NULL THEN
                    OUT_STR := V_SUBMIT_SUCCESS;
                  ELSE
                    --实例化环节失败
                    RAISE ERR_HANDLE_TASK;
                  END IF;
                  --如果下一个环节类型是结束环节
                ELSIF V_NEXT_NODE_TYPE = '1' THEN
                  --将本流程实例状态改为完成
                  UPDATE SYS_WORKFLOW_INSTANCE E
                     SET E.STATUS = '0', E.FINISH_DATE = SYSDATE
                   WHERE E.ID = V_WF_INS_ID
                     AND E.SFYX_ST = V_VALID;
                  --将本流程实例下的所有其他未完成的环节实例是否完成状态改为自动完成。
                  UPDATE SYS_NODE_INSTANCE E
                     SET E.FINISH_DATE = SYSDATE, E.STATUS = '2'
                   WHERE E.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                     AND E.ID <> V_NODE_INS_ID
                     AND E.STATUS = '1'
                     AND E.SFYX_ST = V_VALID;
                  --将本流程实例下的所有未完成任务改为已完成
                  UPDATE SYS_TASK_INSTANCE E
                     SET E.IS_FINISH = '1', E.FINISH_DATE = SYSDATE
                   WHERE E.IS_FINISH = '0'
                     AND E.SFYX_ST = V_VALID
                     AND E.WORKFLOW_INSTANCE_ID = V_WF_INS_ID;
                  --如果是结束环节，将结束环节实例化，插入环节实例表
                  INSERT INTO SYS_NODE_INSTANCE
                    (ID,
                     NODE_ID,
                     WORKFLOW_INSTANCE_ID,
                     STATUS,
                     CJSJ,
                     FINISH_DATE,
                     SFYX_ST)
                  VALUES
                    (SEQ_SYS_NODE_INSTANCE.NEXTVAL,
                     V_NEXT_NODE_ID,
                     V_WF_INS_ID,
                     '2',
                     SYSDATE,
                     SYSDATE,
                     V_VALID);
                  --执行流程结束后处理程序
                  PKG_TASK.P_FINISH_PROCESS('3', V_WF_INS_ID, NULL);
                  OUT_STR := V_SUBMIT_SUCCESS;
                  --如果下一个环节类型是决策环节
                ELSIF V_NEXT_NODE_TYPE = '4' THEN
                  --查找决策环节的决策类型
                  SELECT DECISION_TYPE
                    INTO V_DECISION_TYPE
                    FROM SYS_DECISION_NODE
                   WHERE ID = V_ROUTER(V_I).END_NODE_ID;
                  --决策环节：根据流向上条件，
                  V_NUM       := 1;
                  V_BRANCHSTR := '';
                  FOR V_J IN (SELECT *
                                FROM SYS_ROUTER R
                               WHERE R.START_NODE_ID = V_ROUTER(V_I)
                                    .END_NODE_ID
                                 AND SFYX_ST = V_VALID) LOOP
                    --给决策条件赋值
                    V_BRANCH := V_J.BRANCH;
                    --如果决策方式为自动决策
                    IF V_DECISION_TYPE = '1' THEN
                      --在流程变量实例类中查找变量值，流程变量表里面查名称
                      FOR L IN (SELECT V.VALUE, T.NAME
                                  FROM (SELECT *
                                          FROM (SELECT WORKFLOW_INSTANCE_ID,
                                                       VARIABLE_ID,
                                                       VALUE,
                                                       RANK() OVER(PARTITION BY VARIABLE_ID ORDER BY CJSJ DESC) RN
                                                  FROM SYS_WORKFLOW_VARIABLE_INSTANCE
                                                 WHERE WORKFLOW_INSTANCE_ID =
                                                       V_WF_INS_ID
                                                   AND SFYX_ST = V_VALID)
                                         WHERE RN = 1) V,
                                       SYS_WORKFLOW_VARIABLE T
                                 WHERE V.VARIABLE_ID = T.ID
                                   AND T.WORKFLOW_ID = V_WF_ID
                                   AND T.SFYX_ST = V_VALID) LOOP
                        --如果决策条件里面含有'[WF:' || UPPER(L.NAME) || ']'，将它替换成 '''' || L.VALUE || '''') || ') '
                        IF INSTR(UPPER(V_BRANCH),
                                 '[WF:' || UPPER(L.NAME) || ']') > 0 THEN
                          V_BRANCHSTR := V_BRANCHSTR || ' OR (' ||
                                         REPLACE(UPPER(V_BRANCH),
                                                 '[WF:' || UPPER(L.NAME) || ']',
                                                 '''' || L.VALUE || '''') || ') ';
                        END IF;
                      END LOOP;
                      --如果V_BRANCHSTR不为空
                      IF V_BRANCHSTR IS NOT NULL THEN
                        V_SQL := ' SELECT COUNT(1)  FROM DUAL  WHERE ' ||
                                 LTRIM(V_BRANCHSTR, ' OR');
                        --如果V_BRANCHSTR为空
                      ELSE
                        V_SQL := ' SELECT COUNT(1)FROM DUAL WHERE 1=0';
                      END IF;
                      --执行L_SQL并将值导入V_NUM
                      EXECUTE IMMEDIATE V_SQL
                        INTO V_NUM;
                      IF V_NUM = 1 THEN
                        --赋值
                        INSERT INTO TEMP_NODE
                          (NODE_ID)
                        VALUES
                          (V_ROUTER(V_I).END_NODE_ID);
                        V_JCHJTJ := ' AND BRANCH=''' ||
                                    REPLACE(V_J.BRANCH, '''', '''''') || '''';
                        V_NUM    := 0;
                        --如果变量值和传入变量值不等，进行下一次循环比对
                      ELSE
                        V_NUM := 1;
                      END IF;
                      --传递参数：判断流向上字符串是否等于传递的参数
                    ELSE
                      IF V_BRANCH = IN_DECISION THEN
                        --赋值
                        INSERT INTO TEMP_NODE
                          (NODE_ID)
                        VALUES
                          (V_ROUTER(V_I).END_NODE_ID); --V_J.END_NODE_ID
                        V_JCHJTJ := ' AND BRANCH=''' ||
                                    REPLACE(IN_DECISION, '''', '''''') || '''';
                        V_NUM    := 0;
                      END IF;
                    END IF;
                    EXIT WHEN V_NUM = 0;
                  END LOOP;
                END IF;
              END LOOP;
            END LOOP;
          ELSE
            --对于会签式可能还未完成
            OUT_STR := V_SUBMIT_SUCCESS;
          END IF;
        ELSE
          OUT_STR := '当前任务状态不是在办或待办，不能提交';
        END IF;

        --如果提交的时候点击的是不同意，则退回至配置的环节
      ELSIF IN_FLAG = '0' THEN
        --将任务表单实例中的临时数据JSON清空
        UPDATE SYS_TASK_PAGE_INSTANCE
           SET TMP_DATA_JSON = NULL
         WHERE TASK_INSTANCE_ID = IN_TASK_ID;
        --更新当前任务
        UPDATE SYS_TASK_INSTANCE TI
           SET TI.OPINION     = IN_BLYJ,
               TI.ACTION      = '4',
               TI.STATUS      = '8',
               TI.IS_FINISH   = '1',
               TI.FJ_ID       = IN_FJ_ID,
               TI.FINISH_DATE = SYSDATE
         WHERE TI.ID = IN_TASK_ID
           AND TI.IS_FINISH = '0'
           AND TI.SFYX_ST = V_VALID;
        --更新环节实例下其它任务
        UPDATE SYS_TASK_INSTANCE TI
           SET TI.STATUS      = '8',
               TI.IS_FINISH   = '1',
               TI.FINISH_DATE = SYSDATE
         WHERE TI.ID <> IN_TASK_ID
           AND TI.IS_FINISH = '0'
           AND TI.NODE_INSTANCE_ID = V_NODE_INS_ID
           AND TI.SFYX_ST = V_VALID;
        --更新环节实例状态为完成
        UPDATE SYS_NODE_INSTANCE
           SET STATUS = '2', FINISH_DATE = SYSDATE
         WHERE ID = V_NODE_INS_ID
           AND SFYX_ST = V_VALID;
        --聚合环节退回
        IF V_NATURE = '2' THEN
          FOR K IN (SELECT COLUMN_VALUE
                      FROM TABLE(SPLITSTR(IN_BACK_NODE_IDS, ','))) LOOP
            OUT_STR := '';
            --查找退回环节最大已完成环节实例
            SELECT MAX(NI.ID)
              INTO V_BACK_NODE_INS_ID
              FROM SYS_NODE_INSTANCE NI
             WHERE NI.NODE_ID = K.COLUMN_VALUE
               AND NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
               AND NI.STATUS = '2'
               AND NI.SFYX_ST = V_VALID;
            --查找原任务办理人
            SELECT WM_CONCAT(TI.USER_ID)
              INTO V_USER_IDS
              FROM SYS_TASK_INSTANCE TI
             WHERE TI.NODE_INSTANCE_ID = V_BACK_NODE_INS_ID
               AND TI.SFYX_ST = V_VALID;
            IF V_USER_IDS IS NULL THEN
              OUT_ERROR := '退回时未找到原办理人';
              RAISE ERR_HANDLE_TASK;
            END IF;
            --对退回到的环节进行实例化
            PKG_WF.P_WORKFLOW_INSTANCE_NODE(K.COLUMN_VALUE,
                                            V_USER_IDS,
                                            V_WF_INS_ID,
                                            V_ACTION_BACK || ',' ||
                                            IN_TASK_ID,
                                            OUT_STR,
                                            OUT_ERROR);
            IF OUT_STR IS NULL THEN
              OUT_STR := V_BACK_SUCCESS;
            ELSE
              RAISE ERR_HANDLE_TASK;
            END IF;
          END LOOP;

          --分支环节、普通环节退回
        ELSE
          --查出配置的退回至环节ID
          SELECT DISAGREE_NODE_ID
            INTO V_DISAGREE_NODE_ID
            FROM SYS_ACTIVITY_NODE
           WHERE ID = V_NODE_ID;
          --如果退回至环节ID为空的话默认退回到上一环节
          IF V_DISAGREE_NODE_ID IS NULL THEN
            --查找上一环节ID
            SELECT NODE_ID
              INTO V_DISAGREE_NODE_ID
              FROM (SELECT T.NODE_ID
                      FROM SYS_NODE_INSTANCE T
                     WHERE T.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                       AND T.ID IN
                           (SELECT TI.NODE_INSTANCE_ID
                              FROM SYS_TASK_INSTANCE TI
                             WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                               AND TI.STATUS = '2'
                               AND TI.ACTION = '3'
                               AND TI.IS_FINISH = '1'
                               AND TI.SFYX_ST = '1')
                       AND T.NODE_ID IN
                           (SELECT R.START_NODE_ID
                              FROM SYS_ROUTER R
                             START WITH R.END_NODE_ID = V_NODE_ID
                            CONNECT BY NOCYCLE
                             PRIOR R.START_NODE_ID = R.END_NODE_ID
                                   AND R.SFYX_ST = '1')
                       AND T.NODE_ID <> V_NODE_ID
                       AND T.SFYX_ST = '1'
                     ORDER BY T.ID DESC)
             WHERE ROWNUM = 1;
          END IF;
          --查找前环节实例ID
          SELECT MAX(NI.ID)
            INTO V_PRE_NODE_INS_ID
            FROM SYS_NODE_INSTANCE NI
           WHERE NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
             AND NI.NODE_ID = V_DISAGREE_NODE_ID
             AND NI.STATUS = '2'
             AND NI.SFYX_ST = '1';
          --查找原办理人
          SELECT WM_CONCAT(TI.USER_ID)
            INTO V_USER_IDS
            FROM SYS_TASK_INSTANCE TI
           WHERE TI.NODE_INSTANCE_ID = V_PRE_NODE_INS_ID
             AND TI.SFYX_ST = '1';
          IF V_USER_IDS IS NULL THEN
            OUT_ERROR := '退回时未找到原办理人';
            RAISE ERR_HANDLE_TASK;
          END IF;
          --对退回到的环节进行实例化
          PKG_WF.P_WORKFLOW_INSTANCE_NODE(V_DISAGREE_NODE_ID,
                                          V_USER_IDS,
                                          V_WF_INS_ID,
                                          V_ACTION_BACK || ',' ||
                                          IN_TASK_ID,
                                          OUT_STR,
                                          OUT_ERROR);
          IF OUT_STR IS NULL THEN
            OUT_STR := V_BACK_SUCCESS;
          ELSE
            RAISE ERR_HANDLE_TASK;
          END IF;
          --查找上一环节分支聚合属性
          SELECT N.NATURE
            INTO V_PRE_NODE_NATURE
            FROM SYS_NODE N
           WHERE N.ID = V_DISAGREE_NODE_ID
             AND N.SFYX_ST = V_VALID;
          --上一环节是分支环节
          IF V_PRE_NODE_NATURE = '1' THEN
            --更新其它分支环节任务状态
            UPDATE SYS_TASK_INSTANCE TI
               SET TI.STATUS      = '8',
                   TI.IS_FINISH   = '1',
                   TI.FINISH_DATE = SYSDATE
             WHERE TI.NODE_INSTANCE_ID IN
                   (SELECT NI.ID
                      FROM SYS_NODE_INSTANCE NI
                     WHERE NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                       AND NI.STATUS = '1'
                       AND NI.NODE_ID <> V_DISAGREE_NODE_ID
                       AND NI.SFYX_ST = V_VALID)
               AND TI.IS_FINISH = '0'
               AND TI.SFYX_ST = V_VALID;
            --更新其它分支环节环节实例状态
            UPDATE SYS_NODE_INSTANCE NI
               SET NI.STATUS = '2', NI.FINISH_DATE = SYSDATE
             WHERE NI.ID IN (SELECT NI.ID
                               FROM SYS_NODE_INSTANCE NI
                              WHERE NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                                AND NI.STATUS = '1'
                                AND NI.NODE_ID <> V_DISAGREE_NODE_ID
                                AND NI.SFYX_ST = V_VALID);

          END IF;
        END IF;
      END IF;
    ELSE
      OUT_STR := '任务实例表IS_FINISH字段非法数值';
    END IF;
    --办理任务成功时，更新业务流程关联表
    IF OUT_STR = V_SUBMIT_SUCCESS THEN
      PKG_TASK.P_UPDATE_OPERATION_NOTE(IN_TASK_ID, '2');
      IF V_HAS_MSG = '1' THEN
        PKG_TASK.P_PRODUCE_MESSAGE(IN_TASK_ID, '3');
      END IF;
    ELSIF OUT_STR = V_BACK_SUCCESS THEN
      PKG_TASK.P_UPDATE_OPERATION_NOTE(IN_TASK_ID, '2');
      IF V_HAS_MSG = '1' THEN
        PKG_TASK.P_PRODUCE_MESSAGE(IN_TASK_ID, '4');
      END IF;
    ELSE
      RAISE ERR_HANDLE_TASK;
    END IF;
    --异常处理
  EXCEPTION
    WHEN ERR_HANDLE_TASK THEN
      OUT_ERROR := '办理任务时出现 ' || OUT_STR;
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_ERROR := '办理任务时出现 ' || SQLERRM;
      ROLLBACK;
  END P_TASK_SUBMIT;

  --退回任务
  --创建人：lb
  --创建时间：2016.9
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_TASK_BACK(IN_TASK_ID      NUMBER, --任务ID
                        IN_BLYJ         VARCHAR2, --办理意见
                        IN_BACK_NODE_ID NUMBER, --退回环节ID
                        IN_USER_IDS     VARCHAR2, --指定办理用户IDS
                        IN_TASK_INFO    VARCHAR2, --来源任务信息 任务动作,任务ID
                        OUT_STR         OUT VARCHAR2, --返回信息
                        OUT_ERROR       OUT VARCHAR2) --返回程序执行情况
   IS
    V_NODE_INS_ID NUMBER; --本环节环节实例ID
    V_NODE_ID     NUMBER; --本环节环节ID
    V_WF_INS_ID   NUMBER; --本环节流程实例ID
    ERR_TASK_BACK EXCEPTION; --自定义异常
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --取环节实例ID,环节ID,流程实例ID
    SELECT T.NODE_INSTANCE_ID, N.NODE_ID, T.WORKFLOW_INSTANCE_ID
      INTO V_NODE_INS_ID, V_NODE_ID, V_WF_INS_ID
      FROM SYS_TASK_INSTANCE T, SYS_NODE_INSTANCE N
     WHERE T.NODE_INSTANCE_ID = N.ID
       AND T.ID = IN_TASK_ID
       AND T.SFYX_ST = V_VALID
       AND N.SFYX_ST = V_VALID;
    --将任务表单实例中的临时数据JSON清空
    UPDATE SYS_TASK_PAGE_INSTANCE
       SET TMP_DATA_JSON = NULL
     WHERE TASK_INSTANCE_ID = IN_TASK_ID;
    --将任务实例类的环节意见更改为输入意见
    UPDATE SYS_TASK_INSTANCE S
       SET S.OPINION = IN_BLYJ
     WHERE S.ID = IN_TASK_ID
       AND S.SFYX_ST = V_VALID;
    --更新任务实例状态
    UPDATE SYS_TASK_INSTANCE H
       SET H.STATUS      = '8',
           H.ACTION      = '4',
           H.IS_FINISH   = '1',
           H.FINISH_DATE = SYSDATE
     WHERE H.NODE_INSTANCE_ID = V_NODE_INS_ID
       AND H.IS_FINISH = '0'
       AND SFYX_ST = V_VALID;
    --更新环节实例状态为完成
    UPDATE SYS_NODE_INSTANCE
       SET STATUS = '2', FINISH_DATE = SYSDATE
     WHERE ID = V_NODE_INS_ID
       AND SFYX_ST = V_VALID;
    --对退回到的环节进行实例化
    PKG_WF.P_WORKFLOW_INSTANCE_NODE(IN_BACK_NODE_ID,
                                    IN_USER_IDS,
                                    V_WF_INS_ID,
                                    IN_TASK_INFO,
                                    OUT_STR,
                                    OUT_ERROR);
    --自动办理
    --清除工作流流程自动办理参考表该环节之后的所有记录
    /*DELETE FROM SYS_WF_AUTO_HANDLE_USER WA
    WHERE WA.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
      AND (NODE_ID IN
          (SELECT R.END_NODE_ID
              FROM SYS_ROUTER R
             START WITH R.START_NODE_ID = IN_BACK_NODE_ID
            CONNECT BY NOCYCLE PRIOR R.END_NODE_ID = R.START_NODE_ID
                   AND R.SFYX_ST = V_VALID) OR NODE_ID = IN_BACK_NODE_ID);*/

    --审批意见
    --更新退回任务对应编辑，审核的环节表单的是否显示状态更新为O
    /*UPDATE SYS_TASK_WF_PAGE_INSTANCE TPI
      SET TPI.IF_OPINION_SHOW = '0'
    WHERE TPI.PAGE_ID IN
          (SELECT TPI.PAGE_ID
             FROM SYS_TASK_WF_PAGE_INSTANCE TPI
            WHERE TPI.TASK_INSTANCE_ID = IN_TASK_ID
              AND TPI.SFYX_ST = V_VALID
              AND TPI.NODE_PAGE_ID IN
                  (SELECT ID
                     FROM SYS_NODE_PAGE NP
                    WHERE NP.CONTROL IN ('0', '1')
                      AND NP.SFYX_ST = V_VALID))
      AND TPI.TASK_INSTANCE_ID IN
          (SELECT ID
             FROM SYS_TASK_INSTANCE TI
            WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
              AND TI.SFYX_ST = V_VALID);*/
    IF OUT_STR IS NULL THEN
      OUT_STR := V_BACK_SUCCESS;
    ELSE
      RAISE ERR_TASK_BACK;
    END IF;
    --异常部分
  EXCEPTION
    WHEN ERR_TASK_BACK THEN
      OUT_ERROR := '实例化环节时出现 ' || OUT_STR;
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_STR   := '退回时出现 ' || SQLERRM;
      OUT_ERROR := OUT_STR;
      ROLLBACK;
  END P_TASK_BACK;

  --撤回任务
  --创建人：lb
  --创建时间：2016.9
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_TASK_RECOVER(IN_TASK_ID NUMBER, --撤回任务实例ID
                           OUT_STR    OUT VARCHAR2, --返回信息
                           OUT_ERROR  OUT VARCHAR2) --返回程序执行情况

   AS
    V_ACTION      CHAR(1); --任务动作
    V_NODE_ID     INTEGER; --环节ID
    V_NODE_INS_ID INTEGER; --环节实例ID
    V_WF_INS_ID   INTEGER; --流程实例ID
    V_USER_IDS    VARCHAR2(4000); --办理人IDS
    ERR_TASK_RECOVER EXCEPTION; --自定义异常
    V_NODE_STATUS CHAR(1); --环节状态
    V_NEW_TASK_ID INTEGER; --生成的新任务ID
    V_USER_ID     INTEGER; --办理人
    V_SIGN_OUT_STR VARCHAR2(200);
  BEGIN
    --查找任务的办理动作,环节实例ID,环节ID,流程实例ID,分支聚合属性
    SELECT TI.ACTION,
           TI.NODE_INSTANCE_ID,
           TI.WORKFLOW_INSTANCE_ID,
           NI.STATUS,
           TI.USER_ID,
           NI.NODE_ID
      INTO V_ACTION, V_NODE_INS_ID, V_WF_INS_ID, V_NODE_STATUS, V_USER_ID, V_NODE_ID
      FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE NI
     WHERE TI.NODE_INSTANCE_ID = NI.ID
       AND TI.ID = IN_TASK_ID
       AND TI.SFYX_ST = V_VALID
       AND NI.SFYX_ST = V_VALID;
    IF V_ACTION = '5' THEN
      OUT_ERROR := '该任务已撤回，不能撤回';
      RAISE ERR_TASK_RECOVER;
    END IF;
    --将当前任务动作置为5（撤回）
    UPDATE SYS_TASK_INSTANCE TI
       SET TI.ACTION      = '5'
     WHERE TI.ID = IN_TASK_ID
       AND TI.SFYX_ST = V_VALID;
    ---若环节还未完成
    IF V_NODE_STATUS = '1' THEN
      PKG_TASK.P_REBUILD_TASK(IN_TASK_ID, OUT_STR, OUT_ERROR);
    ELSE
      --分支环节\聚合环节、普通环节撤回（下一环节实例可能多个）
      --将下一环节任务实例状态修改为7（被撤回）
      UPDATE SYS_TASK_INSTANCE TI
         SET TI.STATUS      = '7',
             TI.IS_FINISH   = '1',
             TI.OPINION     = '被撤回',
             TI.FINISH_DATE = SYSDATE
       WHERE TI.NODE_INSTANCE_ID IN
             (SELECT NI.ID
                FROM SYS_NODE_INSTANCE NI
               WHERE NI.FROM_NODE_INS_ID = V_NODE_INS_ID
                 AND NI.SFYX_ST = V_VALID)
         AND TI.SFYX_ST = V_VALID;
      --将下一环节实例状态置为2（完成）
      UPDATE SYS_NODE_INSTANCE NI
         SET NI.STATUS = '2', NI.FINISH_DATE = SYSDATE
       WHERE NI.ID IN (SELECT NI.ID
                         FROM SYS_NODE_INSTANCE NI
                        WHERE NI.FROM_NODE_INS_ID = V_NODE_INS_ID
                          AND NI.SFYX_ST = V_VALID)
         AND NI.SFYX_ST = V_VALID;
      --找出原办理人
      SELECT WM_CONCAT(TI.USER_ID)
        INTO V_USER_IDS
        FROM SYS_TASK_INSTANCE TI
       WHERE TI.NODE_INSTANCE_ID = V_NODE_INS_ID
         AND TI.SFYX_ST = V_VALID;
      --重新实例化该环节
      PKG_WF.P_WORKFLOW_INSTANCE_NODE(V_NODE_ID,
                                      V_USER_IDS,
                                      V_WF_INS_ID,
                                      V_ACTION_RECOVER || ',' || IN_TASK_ID,
                                      OUT_STR,
                                      OUT_ERROR);
    END IF;
    --撤回成功时更新业务流程关联表
    IF OUT_STR IS NULL THEN
      OUT_STR := V_RECOVER_SUCCESS;
      PKG_TASK.P_UPDATE_OPERATION_NOTE(IN_TASK_ID, '2');
      --消息暂未实现
      /*IF V_HAS_MSG = '1' THEN
        PKG_TASK.P_PRODUCE_MESSAGE(IN_TASK_ID, '5');
      END IF;*/
    ELSE
      OUT_ERROR := '撤回时实例化环节出现 ' || OUT_STR;
      RAISE ERR_TASK_RECOVER;
    END IF;
    --COMMIT;
    --撤回后不需要重新签收，自动签收
    --查找新任务ID
    /**SELECT MAX(T.ID)
      INTO V_NEW_TASK_ID
      FROM SYS_TASK_INSTANCE T
     WHERE T.NODE_INSTANCE_ID = V_NODE_INS_ID
       AND T.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND T.USER_ID = V_USER_ID
       AND T.SFYX_ST = V_VALID;
    --调用签收过程,自动签收出错不回滚撤回逻辑
    PKG_TASK.P_TASK_SIGN(V_NEW_TASK_ID, V_SIGN_OUT_STR, OUT_ERROR);**/
    --异常部分
  EXCEPTION
    WHEN ERR_TASK_RECOVER THEN
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_ERROR := '撤回时出现 ' || SQLERRM;
      ROLLBACK;
  END P_TASK_RECOVER;

  --重建TASK任务
  PROCEDURE P_REBUILD_TASK(IN_TASK_ID NUMBER, --撤回任务实例ID
                           OUT_STR    OUT VARCHAR2, --返回信息
                           OUT_ERROR  OUT VARCHAR2) --返回程序执行情况
   AS
   V_TASK_ID INTEGER;
  BEGIN
    OUT_STR := '';
    OUT_ERROR := V_SUCCESS_FLAG;
    --获取新任务号
    SELECT SEQ_SYS_TASK_INSTANCE.NEXTVAL INTO V_TASK_ID FROM DUAL;
    --插入任务
    INSERT INTO SYS_TASK_INSTANCE
      (ID,
       USER_ID,
       NODE_INSTANCE_ID,
       WORKFLOW_INSTANCE_ID,
       STATUS,
       ACTION,
       OPINION,
       BRANCH,
       IS_FINISH,
       CJSJ,
       ACCEPT_DATE,
       FINISH_DATE,
       FJ_ID,
       SFYX_ST,
       IS_WBRW,
       FORMER_USER_ID)
      SELECT V_TASK_ID,
             S.USER_ID,
             S.NODE_INSTANCE_ID,
             S.WORKFLOW_INSTANCE_ID,
             '0',--待办
             '1',--无动作
             '',
             S.BRANCH,
             '0',--未完成
             SYSDATE,
             SYSDATE,
             NULL,
             S.FJ_ID,
             V_VALID,
             S.IS_WBRW,
             S.FORMER_USER_ID
        FROM SYS_TASK_INSTANCE S
       WHERE S.ID = IN_TASK_ID
         AND S.SFYX_ST = V_VALID;
     --插入任务关联表单
      INSERT INTO SYS_TASK_PAGE_INSTANCE
        (ID,
         TASK_INSTANCE_ID,
         WORKFLOW_PAGE_ID,
         DATA_ID,
         TMP_DATA_JSON,
         CJSJ,
         SFYX_ST,
         XGSJ,
         NODE_PAGE_ID,
         PAGE_ID)
        SELECT SEQ_SYS_TASK_PAGE_INSTANCE.NEXTVAL,
               V_TASK_ID,
               WP.ID,
               NULL,
               NULL,
               SYSDATE,
               V_VALID,
               SYSDATE,
               NP.ID,
               NP.PAGE_ID
          FROM SYS_TASK_INSTANCE     TI,
               SYS_NODE_INSTANCE     NI,
               SYS_NODE_PAGE         NP,
               SYS_WORKFLOW_PAGE     WP,
               SYS_WORKFLOW_INSTANCE WI
         WHERE TI.ID = V_TASK_ID
           AND TI.NODE_INSTANCE_ID = NI.ID
           AND TI.WORKFLOW_INSTANCE_ID = WI.ID
           AND WI.WORKFLOW_ID = WP.WORKFLOW_ID
           AND NI.NODE_ID = NP.NODE_ID
           AND WP.PAGE_ID = NP.PAGE_ID
           AND TI.SFYX_ST = V_VALID
           AND NI.SFYX_ST = V_VALID
           AND WI.SFYX_ST = V_VALID
           AND NP.SFYX_ST = V_VALID
           AND WP.SFYX_ST = V_VALID;
   --异常部分
   EXCEPTION
     WHEN OTHERS THEN
      OUT_ERROR := '重建任务时出现 ' || SQLERRM;
      ROLLBACK;
  END;

  --更新委办任务信息，将之前下发的现在委办的任务更新为委办，更新委办任务超出委办期限。需要定时执行
  PROCEDURE P_TASK_WB_UPDATE AS
  BEGIN
    --将之前下发的现在委办的任务更新为委办
    UPDATE SYS_TASK_INSTANCE T
       SET (T.USER_ID, T.IS_WBRW, T.FORMER_USER_ID) =
           (SELECT E.ENTRUST_USER_ID, '1', E.USER_ID
              FROM SYS_ENTRUST E, SYS_WORKFLOW_INSTANCE WI
             WHERE T.USER_ID = E.USER_ID
               AND T.WORKFLOW_INSTANCE_ID = WI.ID
               AND WI.SFYX_ST = V_VALID
               AND INSTR(',' || E.WORKFLOW_ID || ',',
                         ',' || WI.WORKFLOW_ID || ',') > 0
               AND E.SFYX_ST = V_VALID)
     WHERE T.IS_FINISH = '0'
       AND T.SFYX_ST = V_VALID
       AND T.IS_WBRW = '0'
       AND T.USER_ID IN (SELECT USER_ID
                           FROM SYS_ENTRUST E
                          WHERE E.SFYX_ST = V_VALID
                            AND (TRUNC(SYSDATE) BETWEEN TRUNC(E.START_DATE) AND
                                TRUNC(E.END_DATE)));
    --更新委办任务超出委办期限
    UPDATE SYS_TASK_INSTANCE T
       SET (T.USER_ID, T.IS_WBRW, T.FORMER_USER_ID) =
           (SELECT T.FORMER_USER_ID, '0', NULL FROM DUAL)
     WHERE T.IS_FINISH = '0'
       AND T.SFYX_ST = V_VALID
       AND T.IS_WBRW = '1'
       AND T.USER_ID IN
           (SELECT USER_ID
              FROM SYS_ENTRUST E
             WHERE E.SFYX_ST = V_VALID
               AND TRUNC(E.END_DATE) > TRUNC(SYSDATE));
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
  END P_TASK_WB_UPDATE;

  --更新委办任务信息，新建委办计划的时候将之前下发的现在委办的任务更新为委办，删除委办计划则把委办任务交还给原办理人
  PROCEDURE P_TASK_WB_UPDATE_SS(IN_USER_ID NUMBER, --原办理人ID
                                IN_FLAG    VARCHAR2, --新增删除标志，1.新增 2.删除
                                OUT_STR    OUT VARCHAR2, --返回信息
                                OUT_ERROR  OUT VARCHAR2) --返回程序执行情况

   AS
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --如果是新增操作
    IF IN_FLAG = '1' THEN
      --将之前下发的现在委办的任务更新为委办
      UPDATE SYS_TASK_INSTANCE T
         SET (T.USER_ID, T.IS_WBRW, T.FORMER_USER_ID) =
             (SELECT E.ENTRUST_USER_ID, '1', E.USER_ID
                FROM SYS_ENTRUST E
               WHERE T.USER_ID = E.USER_ID
                 AND E.SFYX_ST = V_VALID)
       WHERE T.IS_FINISH = '0'
         AND T.SFYX_ST = V_VALID
         AND T.IS_WBRW = '0'
         AND T.USER_ID = IN_USER_ID
         AND T.WORKFLOW_INSTANCE_ID IN
             (SELECT WI.ID
                FROM SYS_WORKFLOW_INSTANCE WI
               WHERE INSTR(',' || (SELECT E.WORKFLOW_ID
                                     FROM SYS_ENTRUST E
                                    WHERE E.SFYX_ST = V_VALID
                                      AND E.USER_ID = IN_USER_ID) || ',',
                           ',' || WI.WORKFLOW_ID || ',') > 0);
      --如果是删除操作
    ELSIF IN_FLAG = '2' THEN
      --把委办任务交还给原办理人
      UPDATE SYS_TASK_INSTANCE T
         SET (T.USER_ID, T.IS_WBRW, T.FORMER_USER_ID) =
             (SELECT T.FORMER_USER_ID, '0', NULL FROM DUAL)
       WHERE T.IS_FINISH = '0'
         AND T.SFYX_ST = V_VALID
         AND T.IS_WBRW = '1'
         AND T.USER_ID = IN_USER_ID;
    END IF;
    OUT_STR := '委办更新数据成功';
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      OUT_STR   := '委办更新数据失败,失败原因是：' || SQLERRM;
      OUT_ERROR := SQLERRM;
  END P_TASK_WB_UPDATE_SS;

  --功能：维护操作记录（业务流程关联表、中间表）
  --创建人：wcy
  --创建时间：2017.2
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_UPDATE_OPERATION_NOTE(IN_TASK_INS_ID NUMBER, --流程、任务实例ID
                                    IN_TYPE        CHAR) --标志位 1 流程实例  2 任务实例
   AS
    V_NUM        NUMBER; --计数
    V_WF_INS_ID  NUMBER; --流程实例ID
    V_USER_ID    NUMBER; --任务办理人ID
    V_DATA_ID    NUMBER; --业务数据ID
    V_STARTER    NUMBER; --流程启动人
    V_ACTION     CHAR(1); --任务办理动作
    V_WF_STATUS  CHAR(1); --流程实例状态
    V_NODE_NAME  VARCHAR2(1000); --环节名称
    V_DICTCODE   VARCHAR2(30); --业务状态字典code
    V_CODE       VARCHAR2(100); --流程编码
    V_STATUS     VARCHAR2(1000); --业务状态
    V_TODO_USERS VARCHAR2(4000); --任务待办人
    V_DONE_USERS VARCHAR2(4000); --任务已办人
    V_TITLE      VARCHAR2(2000); --流程实例标题
    INSERT_EXP EXCEPTION; --插入数据异常
  BEGIN
    --流程实例
    IF IN_TYPE = '1' THEN
      V_WF_INS_ID := IN_TASK_INS_ID;
      --查找当前流程实例下所有待办人
      SELECT WM_CONCAT(TI.USER_ID)
        INTO V_TODO_USERS
        FROM SYS_TASK_INSTANCE TI
       WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
         AND TI.IS_FINISH = '0'
         AND TI.SFYX_ST = V_VALID;
      --查找流程启动人 实例标题 流程编码 业务ID
      SELECT WI.STARTUP_USER_ID,
             WI.TITLE,
             W.CODE,
             WI.DATA_ID,
             W.WORKFLOWYWZTZD
        INTO V_STARTER, V_TITLE, V_CODE, V_DATA_ID, V_DICTCODE
        FROM SYS_WORKFLOW_INSTANCE WI, SYS_WORKFLOW W
       WHERE WI.WORKFLOW_ID = W.ID
         AND WI.ID = V_WF_INS_ID
         AND WI.SFYX_ST = V_VALID
         AND W.SFYX_ST = V_VALID;
      --查找当前流程实例的状态(运行状态的环节实例对应业务状态)
      SELECT WM_CONCAT(WI.STATUS), WM_CONCAT(N.YWZT), WM_CONCAT(N.NAME)
        INTO V_WF_STATUS, V_STATUS, V_NODE_NAME
        FROM SYS_WORKFLOW_INSTANCE WI, SYS_NODE_INSTANCE NI, SYS_NODE N
       WHERE WI.ID = NI.WORKFLOW_INSTANCE_ID
         AND NI.NODE_ID = N.ID
         AND WI.ID = V_WF_INS_ID
         AND NI.STATUS = '1'
         AND WI.SFYX_ST = V_VALID
         AND NI.SFYX_ST = V_VALID
         AND N.SFYX_ST = V_VALID;
      --当没有配置业务状态字典时，使用环节名称
      IF V_DICTCODE IS NULL THEN
        V_STATUS := V_NODE_NAME;
        IF V_WF_STATUS = '5' THEN
          V_STATUS := '待提交';
        END IF;
        IF V_WF_STATUS = '0' THEN
          V_STATUS := '完成';
        END IF;
      ELSE
        IF V_WF_STATUS = '0' THEN
          SELECT NVL(MAX(CODE), '完成')
            INTO V_STATUS
            FROM SYS_SUBDICT
           WHERE DICT_CODE = V_DICTCODE
             AND VALUE = '完成';
        END IF;
      END IF;
      --向业务流程关联表插入操作记录
      INSERT INTO SYS_GLB_BIZ_WF
        (ID,
         DATA_ID,
         STATUS,
         WORKFLOW_INSTANCE_ID,
         P_WORKFLOW_INSTANCE_ID,
         TASK_INSTANCE_ID,
         ACTION,
         USER_ID,
         CJSJ,
         XGSJ,
         SFYX_ST,
         WORKFLOW_CODE,
         TODO_USERS,
         ORGAN,
         ORGAN_LEVEL,
         TITLE)
      VALUES
        (SEQ_SYS_GLB_BIZ_WF.NEXTVAL,
         V_DATA_ID,
         V_STATUS,
         V_WF_INS_ID,
         NULL,
         NULL,
         NULL,
         V_STARTER,
         SYSDATE,
         SYSDATE,
         V_VALID,
         V_CODE,
         V_TODO_USERS,
         NULL,
         NULL,
         V_TITLE);
      --任务实例
    ELSIF IN_TYPE = '2' THEN
      --查找流程实例ID
      SELECT TI.WORKFLOW_INSTANCE_ID, W.WORKFLOWYWZTZD
        INTO V_WF_INS_ID, V_DICTCODE
        FROM SYS_TASK_INSTANCE TI, SYS_WORKFLOW_INSTANCE WI, SYS_WORKFLOW W
       WHERE TI.ID = IN_TASK_INS_ID
         AND TI.WORKFLOW_INSTANCE_ID = WI.ID
         AND WI.WORKFLOW_ID = W.ID
         AND WI.SFYX_ST = V_VALID
         AND W.SFYX_ST = V_VALID
         AND TI.SFYX_ST = V_VALID;
      --查找关联表中是否已存在该流程实例
      SELECT COUNT(1)
        INTO V_NUM
        FROM SYS_GLB_BIZ_WF GBW
       WHERE GBW.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
         AND GBW.SFYX_ST = V_VALID;
      --非首次提交
      IF V_NUM = 1 THEN
        --查找当前流程实例下所有待办人
        SELECT WM_CONCAT(TI.USER_ID)
          INTO V_TODO_USERS
          FROM SYS_TASK_INSTANCE TI
         WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
           AND TI.IS_FINISH = '0'
           AND TI.SFYX_ST = V_VALID;
        --查找当前流程实例下所有已办人
        SELECT SPLITSTR_QC(WM_CONCAT(TI.USER_ID))
          INTO V_DONE_USERS
          FROM SYS_TASK_INSTANCE TI
         WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
           AND TI.IS_FINISH = '1'
           AND TI.SFYX_ST = V_VALID;
        --查找任务办理人、任务动作
        SELECT TI.USER_ID, TI.ACTION
          INTO V_USER_ID, V_ACTION
          FROM SYS_TASK_INSTANCE TI
         WHERE TI.ID = IN_TASK_INS_ID
           AND TI.SFYX_ST = V_VALID;
        --查找流程实例状态
        SELECT WI.STATUS, WI.DATA_ID, WI.TITLE
          INTO V_WF_STATUS, V_DATA_ID, V_TITLE
          FROM SYS_WORKFLOW_INSTANCE WI
         WHERE WI.ID = V_WF_INS_ID
           AND WI.SFYX_ST = V_VALID;
        --流程已完成
        IF V_WF_STATUS = 0 THEN
          IF V_DICTCODE IS NULL THEN
            V_STATUS := '完成';
          ELSE
            SELECT NVL(MAX(CODE), '完成')
              INTO V_STATUS
              FROM SYS_SUBDICT
             WHERE DICT_CODE = V_DICTCODE
               AND VALUE = '完成';
          END IF;
        ELSE
          --查找当前流程实例环节状态 环节名称
          SELECT WM_CONCAT(N.YWZT), WM_CONCAT(N.NAME)
            INTO V_STATUS, V_NODE_NAME
            FROM SYS_WORKFLOW_INSTANCE WI, SYS_NODE_INSTANCE NI, SYS_NODE N
           WHERE WI.ID = NI.WORKFLOW_INSTANCE_ID
             AND NI.NODE_ID = N.ID
             AND WI.ID = V_WF_INS_ID
             AND NI.STATUS = '1'
             AND WI.SFYX_ST = V_VALID
             AND NI.SFYX_ST = V_VALID
             AND N.SFYX_ST = V_VALID;
          IF V_DICTCODE IS NULL THEN
            V_STATUS := V_NODE_NAME;
            IF V_WF_STATUS = '5' THEN
              V_STATUS := '待提交';
            END IF;
          END IF;
        END IF;
        --更新状态等字段
        UPDATE SYS_GLB_BIZ_WF GBW
           SET GBW.DATA_ID          = V_DATA_ID,
               GBW.STATUS           = V_STATUS,
               GBW.TASK_INSTANCE_ID = IN_TASK_INS_ID,
               GBW.ACTION           = V_ACTION,
               GBW.USER_ID          = V_USER_ID,
               GBW.XGSJ             = SYSDATE,
               GBW.TODO_USERS       = V_TODO_USERS,
               GBW.TITLE            = V_TITLE,
               GBW.DONE_USERS       = V_DONE_USERS
         WHERE GBW.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
           AND GBW.SFYX_ST = V_VALID;
      END IF;
    END IF;
  END P_UPDATE_OPERATION_NOTE;

  --功能：转办任务给他人办理
  --创建人：wcy
  --创建时间：2017.8
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_TASK_TRANSFER(IN_TASK_ID INTEGER, --任务ID
                            IN_USER_ID INTEGER, --新办理人
                            OUT_STR    OUT VARCHAR2, --执行正常返回信息
                            OUT_ERROR  OUT VARCHAR2) --程序执行结果
   AS
    V_WF_INS_ID  INTEGER;
    V_TASK_ID    INTEGER;
    V_TODO_USERS VARCHAR2(4000); --待办人
    V_DONE_USERS VARCHAR2(4000); --已办人
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --更新任务状态为已办，动作为转办，已完成，完成日期
    UPDATE SYS_TASK_INSTANCE TI
       SET TI.STATUS      = '2',
           TI.ACTION      = '6',
           TI.IS_FINISH   = '1',
           TI.FINISH_DATE = SYSDATE
     WHERE TI.ID = IN_TASK_ID
       AND TI.SFYX_ST = V_VALID;
    --生成新办理人的任务
    SELECT SEQ_SYS_TASK_INSTANCE.NEXTVAL INTO V_TASK_ID FROM DUAL;
    INSERT INTO SYS_TASK_INSTANCE
      (ID,
       USER_ID,
       NODE_INSTANCE_ID,
       WORKFLOW_INSTANCE_ID,
       STATUS,
       ACTION,
       OPINION,
       BRANCH,
       IS_FINISH,
       CJSJ,
       ACCEPT_DATE,
       FINISH_DATE,
       FJ_ID,
       IS_WBRW,
       FORMER_USER_ID,
       SFYX_ST)
      SELECT V_TASK_ID,
             IN_USER_ID,
             TI.NODE_INSTANCE_ID,
             TI.WORKFLOW_INSTANCE_ID,
             '0',
             '1',
             '',
             '',
             '0',
             SYSDATE,
             NULL,
             NULL,
             TI.FJ_ID,
             '0',
             NULL,
             V_VALID
        FROM SYS_TASK_INSTANCE TI
       WHERE TI.ID = IN_TASK_ID
         AND TI.SFYX_ST = V_VALID;
    INSERT INTO SYS_TASK_PAGE_INSTANCE
      (ID,
       TASK_INSTANCE_ID,
       WORKFLOW_PAGE_ID,
       DATA_ID,
       TMP_DATA_JSON,
       CJSJ,
       SFYX_ST,
       XGSJ,
       NODE_PAGE_ID,
       PAGE_ID,
       TASK_PAGE_OPINION,
       IF_OPINION_SHOW)
      SELECT SEQ_SYS_TASK_PAGE_INSTANCE.NEXTVAL,
             V_TASK_ID,
             TPI.WORKFLOW_PAGE_ID,
             TPI.DATA_ID,
             TPI.TMP_DATA_JSON,
             SYSDATE,
             V_VALID,
             SYSDATE,
             TPI.NODE_PAGE_ID,
             TPI.PAGE_ID,
             TPI.TASK_PAGE_OPINION,
             TPI.IF_OPINION_SHOW
        FROM SYS_TASK_PAGE_INSTANCE TPI
       WHERE TPI.TASK_INSTANCE_ID = IN_TASK_ID
         AND TPI.SFYX_ST = V_VALID;
    --查找当前流程实例
    SELECT WORKFLOW_INSTANCE_ID
      INTO V_WF_INS_ID
      FROM SYS_TASK_INSTANCE
     WHERE ID = IN_TASK_ID
       AND SFYX_ST = V_VALID;
    --查找当前流程实例下所有待办人
    SELECT WM_CONCAT(TI.USER_ID)
      INTO V_TODO_USERS
      FROM SYS_TASK_INSTANCE TI
     WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND TI.IS_FINISH = '0'
       AND TI.SFYX_ST = V_VALID;
    --查找当前流程实例下所有已办人
    SELECT SPLITSTR_QC(WM_CONCAT(TI.USER_ID))
      INTO V_DONE_USERS
      FROM SYS_TASK_INSTANCE TI
     WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND TI.IS_FINISH = '1'
       AND TI.SFYX_ST = V_VALID;
    --更新业务流程关联表待办人、已办人
    UPDATE SYS_GLB_BIZ_WF
       SET TODO_USERS = V_TODO_USERS,
           DONE_USERS = V_DONE_USERS,
           XGSJ       = SYSDATE
     WHERE WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND SFYX_ST = V_VALID;
    OUT_STR := V_TRANSFER_SUCCESS;
    --TODO 生成消息
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := '转办任务时出现 ' || SQLERRM;
      ROLLBACK;
  END P_TASK_TRANSFER;

  --功能：后处理程序（包括环节后处理、流程后处理）
  --创建人：wcy
  --创建时间：2017.2
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_FINISH_PROCESS(IN_FLAG      CHAR, --处理类型 1流程启动后处理  2环节结束后处理  3流程结束后处理
                             IN_WF_INS_ID INTEGER, --流程实例ID
                             IN_NODE_ID   INTEGER) --环节ID
   AS
    V_FINISH_PROCESS VARCHAR2(4000);
    V_SQLSTR         VARCHAR2(4000);
    V_SQL            VARCHAR2(4000);
    V_NUM            NUMBER;
    V_VAR            VARCHAR2(30);
    V_VALUE          VARCHAR2(30);
  BEGIN
    IF IN_FLAG = '2' THEN
      --查找环节完成后处理程序
      SELECT TN.FINISH_PROCESS
        INTO V_FINISH_PROCESS
        FROM SYS_TRANSACT_NODE TN
       WHERE TN.ID = IN_NODE_ID;
    ELSIF IN_FLAG = '1' THEN
      --查找流程启动后处理程序
      SELECT W.STARTUP_PROCESS
        INTO V_FINISH_PROCESS
        FROM SYS_WORKFLOW W, SYS_WORKFLOW_INSTANCE WI
       WHERE W.ID = WI.WORKFLOW_ID
         AND WI.ID = IN_WF_INS_ID
         AND WI.SFYX_ST = V_VALID;
    ELSIF IN_FLAG = '3' THEN
      --查找流程结束后处理程序
      SELECT W.FINISH_PROCESS
        INTO V_FINISH_PROCESS
        FROM SYS_WORKFLOW W, SYS_WORKFLOW_INSTANCE WI
       WHERE W.ID = WI.WORKFLOW_ID
         AND WI.ID = IN_WF_INS_ID
         AND WI.SFYX_ST = V_VALID;
    END IF;

    --如果后处理程序不为空
    IF V_FINISH_PROCESS IS NOT NULL THEN
      --如果后处理程序是SQL语句
      IF SUBSTR(V_FINISH_PROCESS, 1, 3) = 'SQL' THEN
        --从第5位开始往后截取
        V_SQLSTR := SUBSTR(V_FINISH_PROCESS,
                           5,
                           LENGTH(V_FINISH_PROCESS) - 4);
        FOR I IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(V_SQLSTR, ';'))) LOOP
          V_SQL := I.COLUMN_VALUE;

          LOOP
            V_NUM := (LENGTH(V_SQL) - LENGTH(REPLACE(V_SQL, '[WF:', ''))) / 4;
            EXIT WHEN V_NUM = 0;
            V_VAR := SUBSTR(V_SQL,
                            INSTR(V_SQL, '[WF:') + 4,
                            INSTR(V_SQL, ']') - INSTR(V_SQL, '[WF:') - 4);
            SELECT VI.VALUE
              INTO V_VALUE
              FROM SYS_WORKFLOW_VARIABLE          V,
                   SYS_WORKFLOW_VARIABLE_INSTANCE VI
             WHERE VI.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID
               AND VI.VARIABLE_ID = V.ID
               AND V.NAME = V_VAR
               AND V.SFYX_ST = V_VALID
               AND VI.SFYX_ST = V_VALID;
            V_SQL := REPLACE(V_SQL, '[WF:' || V_VAR || ']', V_VALUE);
          END LOOP;
          EXECUTE IMMEDIATE V_SQL;
        END LOOP;
        --如果后处理程序是存储过程
      ELSIF SUBSTR(V_FINISH_PROCESS, 1, 3) = 'PRO' THEN
        --从第5位开始往后截取
        V_SQLSTR := SUBSTR(V_FINISH_PROCESS,
                           5,
                           LENGTH(V_FINISH_PROCESS) - 4);
        FOR J IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(V_SQLSTR, ';'))) LOOP
          V_SQL := 'BEGIN ' || J.COLUMN_VALUE || ';END;';
          EXECUTE IMMEDIATE V_SQL
            USING IN IN_WF_INS_ID;
        END LOOP;
      ELSE
        NULL;
      END IF;
    END IF;
  END P_FINISH_PROCESS;

  --内置按钮是否显示（提交、退回、草稿、删除、撤回）
  --创建人：wcy
  --创建时间：2017.12
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_BUTTON_IFSHOW(IN_TASK_ID INTEGER, --当前任务
                            IN_NODE_ID INTEGER, --当前环节
                            IN_USER_ID INTEGER, --当前登录用户
                            OUT_STR    OUT VARCHAR2, --返回值
                            OUT_ERROR  OUT VARCHAR2) --程序运行结果
   AS
    V_MAX_FINISH_NODE_INS_ID INTEGER; --最大已完成环节实例ID
    V_WF_INS_ID              INTEGER; --流程实例ID
    V_USER_ID                INTEGER; --办理人
    V_NODE_ID                INTEGER; --环节ID
    V_NODE_INS_ID            INTEGER; --环节实例ID
    V_SFXSCG                 CHAR(1); --是否显示草稿
    V_SFXSCB                 CHAR(1); --是否显示催办
    V_ACTION                 CHAR(1); --任务动作
    V_STATUS                 CHAR(1); --任务状态
    V_WF_STATUS              CHAR(1); --流程实例状态
    V_IS_FINISH              CHAR(1); --任务是否完成
    V_PRE_NODE_TYPE          CHAR(1); --前一环节类型
    V_IS_SIGN                CHAR(1); --是否签收 '1'：签收 '0':未签收
    V_NODE_STATUS            CHAR(1); --环节状态
    V_HAS_OTHER              CHAR(1); --是否含有其他办理人
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    IF IN_TASK_ID IS NULL THEN
            --当前环节为流程启动前第一个活动环节
      SELECT 'submit:' || NVL(S.SFXSTJ, '0') || ',draft:' ||
             NVL(S.SFXSCG, '0') || ','
        INTO OUT_STR
        FROM SYS_NODE S
       WHERE S.ID = IN_NODE_ID;
      --OUT_STR := 'submit:1,draft:1,';
    ELSE
      --查找任务办理人、任务状态、是否完成、环节ID、流程实例状态
      SELECT TI.USER_ID,
             TI.STATUS,
             TI.ACTION,
             TI.IS_FINISH,
             NI.ID,
             NI.NODE_ID,
             WI.ID,
             WI.STATUS,
             NI.STATUS
        INTO V_USER_ID,
             V_STATUS,
             V_ACTION,
             V_IS_FINISH,
             V_NODE_INS_ID,
             V_NODE_ID,
             V_WF_INS_ID,
             V_WF_STATUS,
             V_NODE_STATUS
        FROM SYS_TASK_INSTANCE     TI,
             SYS_NODE_INSTANCE     NI,
             SYS_WORKFLOW_INSTANCE WI
       WHERE TI.WORKFLOW_INSTANCE_ID = WI.ID
         AND TI.NODE_INSTANCE_ID = NI.ID
         AND TI.ID = IN_TASK_ID
         AND TI.SFYX_ST = V_VALID
         AND NI.SFYX_ST = V_VALID
         AND WI.SFYX_ST = V_VALID;
      --查找前一环节类型
      SELECT TO_CHAR(MIN(N.TYPE))
        INTO V_PRE_NODE_TYPE
        FROM SYS_ROUTER R, SYS_NODE N
       WHERE R.END_NODE_ID = V_NODE_ID
         AND R.START_NODE_ID = N.ID
         AND R.SFYX_ST = V_VALID
         AND N.SFYX_ST = V_VALID;
      --流程运行
      IF V_WF_STATUS <> '0' THEN
        --是否显示提交、退回
        IF IN_USER_ID = V_USER_ID AND INSTR('0,1', V_STATUS) > 0 AND
           INSTR('1,2', V_ACTION) > 0 THEN
          OUT_STR := OUT_STR || 'submit:1,';
          --前一环节不是开始环节
          IF V_PRE_NODE_TYPE <> '0' THEN
            OUT_STR := OUT_STR || 'refuse:1,del:0,';
          ELSE
            OUT_STR := OUT_STR || 'refuse:0,';
            --是否显示删除
            IF V_WF_STATUS = '5' THEN
              OUT_STR := OUT_STR || 'del:1,';
            ELSE
              OUT_STR := OUT_STR || 'del:0,';
            END IF;
          END IF;
          --查找该环节是否显示草稿
          SELECT N.SFXSCG
            INTO V_SFXSCG
            FROM SYS_NODE N
           WHERE N.ID = V_NODE_ID
             AND N.SFYX_ST = V_VALID;
            IF V_SFXSCG IS NOT NULL THEN
             OUT_STR := OUT_STR || 'draft:' || V_SFXSCG || ',';
            END IF;
        ELSE
          OUT_STR := OUT_STR || 'submit:0,refuse:0,draft:0,';
        END IF;

        --是否显示催办
        IF IN_USER_ID = V_USER_ID AND V_IS_FINISH = '1' THEN
          --查找该环节是否显示催办
          SELECT N.SFXSCB
            INTO V_SFXSCB
            FROM SYS_NODE N
           WHERE N.ID = V_NODE_ID
             AND N.SFYX_ST = V_VALID;
           IF V_SFXSCB IS NOT NULL THEN
             OUT_STR := OUT_STR || 'press:' || V_SFXSCB || ',';
            END IF;
        END IF;

        --是否显示撤回
        IF IN_USER_ID = V_USER_ID AND V_IS_FINISH = '1' THEN
          --查找最大已完成环节实例ID
          SELECT MAX(NI.ID)
            INTO V_MAX_FINISH_NODE_INS_ID
            FROM SYS_NODE_INSTANCE NI
           WHERE NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
             AND NI.STATUS = '2'
             AND NI.SFYX_ST = V_VALID;
          --查找下一环节是否签收，若签收也不可撤回
          SELECT (CASE
                   WHEN COUNT(1) > 0 THEN
                    '1'
                   ELSE
                    '0'
                 END)
            INTO V_IS_SIGN
            FROM SYS_TASK_INSTANCE T
           WHERE T.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
             AND T.ACTION = '2' --签收
             AND T.SFYX_ST = V_VALID
             AND T.NODE_INSTANCE_ID > V_MAX_FINISH_NODE_INS_ID;
          --查找当前环节是否有其他人办理
          SELECT (CASE
                   WHEN COUNT(1) > 0 THEN
                    '1'
                   ELSE
                    '0'
                 END)
            INTO V_HAS_OTHER
            FROM SYS_TASK_INSTANCE T
           WHERE T.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
             AND T.SFYX_ST = V_VALID
             AND T.STATUS = '2' --已办
             AND T.ACTION = '3' --提交
             AND T.IS_FINISH = '1' --完成
             AND T.NODE_INSTANCE_ID = V_NODE_INS_ID
             AND T.USER_ID <> V_USER_ID;
          --环节未完成可撤回
          --当前任务所属环节实例是最大已完成环节实例以及下一环节未签收 且当前环节没有其他人办理
          IF V_NODE_STATUS = '1' OR
             (V_NODE_INS_ID = V_MAX_FINISH_NODE_INS_ID AND V_IS_SIGN = '0' AND
             V_HAS_OTHER = '0') THEN
            OUT_STR := OUT_STR || 'cancel:1,';
          END IF;
        ELSE
          OUT_STR := OUT_STR || 'cancel:0,';
        END IF;
      ELSE
        --流程结束
        OUT_STR := 'submit:0,refuse:0,draft:0,cancel:0,del:0,';
      END IF;
    END IF;
    OUT_STR := SUBSTR(OUT_STR, 1, LENGTH(OUT_STR) - 1);
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_BUTTON_IFSHOW;

  --产生消息、清理消息
  PROCEDURE P_PRODUCE_MESSAGE(IN_TASK_ID INTEGER, --任务ID
                              IN_ACTION  CHAR) --操作类型 2、签收  3、提交  4、退回  5、撤回  6、转办
   AS
    V_COUNT           INTEGER;
    V_USER_ID         INTEGER;
    V_WF_INS_ID       INTEGER;
    V_MESSAGE_ID      INTEGER;
    V_NODE_INS_ID     INTEGER;
    V_WF_INS_TITLE    VARCHAR2(200);
    V_WF_NAME         VARCHAR2(200);
    V_TITLE           VARCHAR2(200);
    V_CONTENT         VARCHAR2(200);
    V_USER_NAME       VARCHAR2(100);
    V_TODO_USERS      VARCHAR2(200);
    V_TODO_TASKS      VARCHAR2(200);
    V_ACTION          CHAR(1);
    V_NODE_INS_STATUS CHAR(1);
    V_TRANSACT_TYPE   CHAR(1);
  BEGIN
    IF IN_ACTION <> '2' THEN
      --1.产生新消息
      --查找任务办理人、流程实例ID、流程实例标题、流程名称
      SELECT TI.USER_ID, TI.ACTION, WI.ID, WI.TITLE, W.NAME
        INTO V_USER_ID, V_ACTION, V_WF_INS_ID, V_WF_INS_TITLE, V_WF_NAME
        FROM SYS_TASK_INSTANCE TI, SYS_WORKFLOW_INSTANCE WI, SYS_WORKFLOW W
       WHERE TI.ID = IN_TASK_ID
         AND TI.WORKFLOW_INSTANCE_ID = WI.ID
         AND WI.WORKFLOW_ID = W.ID
         AND TI.SFYX_ST = V_VALID
         AND WI.SFYX_ST = V_VALID
         AND W.SFYX_ST = V_VALID;
      --查找任务办理人姓名
      SELECT USER_NAME
        INTO V_USER_NAME
        FROM SYS_USER
       WHERE ID = V_USER_ID
         AND SFYX_ST = V_VALID;
      --办理动作:1、无动作  2、签收  3、提交  4、退回  5、撤回  6、转办
      --查找当前流程实例下所有待办任务、待办人
      SELECT WM_CONCAT(TI.ID), WM_CONCAT(TI.USER_ID)
        INTO V_TODO_TASKS, V_TODO_USERS
        FROM SYS_TASK_INSTANCE TI
       WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
         AND TI.IS_FINISH = '0'
         AND TI.SFYX_ST = V_VALID;
      --拼接消息标题、内容
      V_TITLE   := '[' || V_WF_NAME || ']消息';
      V_CONTENT := V_USER_NAME || (CASE V_ACTION
                     WHEN '2' THEN
                      '签收'
                     WHEN '3' THEN
                      '提交'
                     WHEN '4' THEN
                      '退回'
                     WHEN '5' THEN
                      '撤回'
                     WHEN '6' THEN
                      '转办'
                   END) || V_WF_INS_TITLE || ',请及时办理';
      SELECT SEQ_SYS_MESSAGE.NEXTVAL INTO V_MESSAGE_ID FROM DUAL;
      --插入消息
      INSERT INTO SYS_MESSAGE
        (ID, TITLE, CONTENT, SOURCE, TYPE_CODE, PARAM, SFYX_ST)
      VALUES
        (V_MESSAGE_ID, V_TITLE, V_CONTENT, NULL, 'WORKFLOW', NULL, V_VALID);
      --插入消息用户关联
      V_COUNT := 0;
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(V_TODO_USERS, ','))) LOOP
        V_COUNT := V_COUNT + 1;
        INSERT INTO SYS_GLB_MESSAGE_USER
          (ID,
           MESSAGE_ID,
           USER_ID,
           TASK_ID,
           STATUS,
           RECEIVE_TIME,
           DEAL_TIME,
           SFYX_ST)
        VALUES
          (SEQ_SYS_GLB_MESSAGE_USER.NEXTVAL,
           V_MESSAGE_ID,
           K.COLUMN_VALUE,
           RX_GETSTR(V_TODO_TASKS, V_COUNT),
           '1',
           SYSDATE,
           NULL,
           V_VALID);
      END LOOP;
      --2.清理旧消息
      SELECT NI.STATUS, NI.ID
        INTO V_NODE_INS_STATUS, V_NODE_INS_ID
        FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE NI
       WHERE TI.NODE_INSTANCE_ID = NI.ID
         AND TI.SFYX_ST = V_VALID
         AND NI.SFYX_ST = V_VALID;
      UPDATE SYS_GLB_MESSAGE_USER GMU
         SET GMU.STATUS = '3'
       WHERE GMU.TASK_ID = IN_TASK_ID
         AND GMU.SFYX_ST = V_VALID;
      IF V_NODE_INS_STATUS = '2' THEN
        UPDATE SYS_GLB_MESSAGE_USER GMU
           SET GMU.STATUS = '3'
         WHERE GMU.TASK_ID IN (SELECT TI.ID
                                 FROM SYS_TASK_INSTANCE TI
                                WHERE TI.NODE_INSTANCE_ID = V_NODE_INS_ID
                                  AND TI.IS_FINISH = '0'
                                  AND TI.SFYX_ST = V_VALID)
           AND GMU.SFYX_ST = V_VALID;
      END IF;
    ELSE
      --签收
      UPDATE SYS_GLB_MESSAGE_USER GMU
         SET GMU.STATUS = '2'
       WHERE GMU.TASK_ID = IN_TASK_ID
         AND GMU.SFYX_ST = V_VALID;
      --查找办理方式/环节实例ID
      SELECT AN.TRANSACT_TYPE, NI.ID
        INTO V_TRANSACT_TYPE, V_NODE_INS_ID
        FROM SYS_TASK_INSTANCE TI,
             SYS_ACTIVITY_NODE AN,
             SYS_NODE_INSTANCE NI
       WHERE TI.ID = IN_TASK_ID
         AND NI.NODE_ID = AN.ID
         AND NI.ID = TI.NODE_INSTANCE_ID
         AND TI.SFYX_ST = V_VALID
         AND NI.SFYX_ST = V_VALID;
      --抢占式
      IF V_TRANSACT_TYPE = '0' THEN
        UPDATE SYS_GLB_MESSAGE_USER GMU
           SET GMU.STATUS = '4'
         WHERE GMU.TASK_ID IN (SELECT TI.ID
                                 FROM SYS_TASK_INSTANCE TI
                                WHERE TI.NODE_INSTANCE_ID = V_NODE_INS_ID
                                  AND TI.SFYX_ST = V_VALID)
           AND GMU.TASK_ID <> IN_TASK_ID;
      END IF;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
  END P_PRODUCE_MESSAGE;

  --查找分支环节与聚合环节间的环节ID
  --创建人：wcy
  --创建时间：2018.3
  --修改人：wcy
  --修改时间：2018.3
  FUNCTION F_GET_NATURE_NODES(IN_BRANCH_NODE_ID INTEGER, --分支环节ID
                              IN_MERGE_NODE_ID  INTEGER) --聚合环节ID
   RETURN TAB_NODE
    PIPELINED --
   AS
    V_NODE_REC REC_NODE;
  BEGIN
    FOR K IN (SELECT DISTINCT R.START_NODE_ID
                FROM SYS_ROUTER R
               START WITH R.END_NODE_ID = IN_MERGE_NODE_ID
              CONNECT BY NOCYCLE PRIOR R.START_NODE_ID = R.END_NODE_ID
                     AND R.SFYX_ST = V_VALID
              MINUS
              SELECT DISTINCT R.START_NODE_ID
                FROM SYS_ROUTER R
               START WITH R.START_NODE_ID = IN_BRANCH_NODE_ID
              CONNECT BY NOCYCLE PRIOR R.START_NODE_ID = R.END_NODE_ID
                     AND R.SFYX_ST = V_VALID) LOOP
      V_NODE_REC.NODE_ID := K.START_NODE_ID;
      PIPE ROW(V_NODE_REC);
    END LOOP;
    RETURN;
  END F_GET_NATURE_NODES;

  --验证聚合环节是否可以实例化
  --创建人：wcy
  --创建时间：2018.3
  --修改人：wcy
  --修改时间：2018.3
  FUNCTION F_MERGE_NODE_CAN_INSTANCE(IN_MERGE_NODE_ID INTEGER, --聚合环节ID
                                     IN_WF_INS_ID     INTEGER) --流程实例ID
   RETURN VARCHAR2 --
   AS
    V_BRANCH_NODE_ID INTEGER;
    V_NUM            NUMBER;
    V_CAN_INSTANCE   VARCHAR2(1);
  BEGIN
    --查找聚合环节对应的分支环节ID
    SELECT T.START_NODE_ID
      INTO V_BRANCH_NODE_ID
      FROM (SELECT R.START_NODE_ID, MIN(LEVEL)
              FROM SYS_ROUTER R, SYS_NODE N
             WHERE R.START_NODE_ID = N.ID
               AND N.NATURE = '1'
               AND N.SFYX_ST = V_VALID
               AND R.SFYX_ST = V_VALID
             START WITH R.END_NODE_ID = IN_MERGE_NODE_ID
            CONNECT BY PRIOR R.START_NODE_ID = R.END_NODE_ID
             GROUP BY R.START_NODE_ID
             ORDER BY MIN(LEVEL)) T
     WHERE ROWNUM = 1;
    --查找分支环节与聚合环节之间是否有正在运行的环节实例
    SELECT COUNT(1)
      INTO V_NUM
      FROM SYS_NODE_INSTANCE NI
     WHERE NI.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID
       AND NI.NODE_ID IN
           (SELECT NODE_ID
              FROM TABLE(PKG_TASK.F_GET_NATURE_NODES(V_BRANCH_NODE_ID,
                                                     IN_MERGE_NODE_ID)))
       AND NI.STATUS = '1'
       AND NI.SFYX_ST = V_VALID;
    --有，不能实例化
    IF V_NUM > 0 THEN
      V_CAN_INSTANCE := '0';
    ELSE
      --没有，可以实例化
      V_CAN_INSTANCE := '1';
    END IF;
    RETURN V_CAN_INSTANCE;

  END F_MERGE_NODE_CAN_INSTANCE;

  --获取聚合环节前一环节作为退回环节
  FUNCTION F_GET_BACK_NODES(IN_NODE_ID INTEGER) --聚合环节ID
   RETURN MYCURSOR --
   AS
    V_NODES MYCURSOR;
  BEGIN
    OPEN V_NODES FOR
      SELECT DISTINCT R.START_NODE_ID NODE_ID, LEVEL, N.NAME
        FROM SYS_ROUTER R, SYS_NODE N
       WHERE LEVEL = 1
         AND R.START_NODE_ID = N.ID
         AND N.SFYX_ST = '1'
         AND R.SFYX_ST = '1'
       START WITH R.END_NODE_ID = IN_NODE_ID
      CONNECT BY NOCYCLE PRIOR R.START_NODE_ID = R.END_NODE_ID;

    RETURN V_NODES;
  END F_GET_BACK_NODES;

END PKG_TASK;
/

prompt
prompt Creating package body PKG_UTIL
prompt ==============================
prompt
CREATE OR REPLACE PACKAGE BODY PKG_UTIL
/**
 * @desc: 工具包
 * @author: dingmx
 * @date: 2018/07/30
 */
 IS
  --全库搜索字符串
  PROCEDURE P_SEARCH_ALL(P_STR IN VARCHAR) AS
    V_SQL     VARCHAR2(500);
    V_CURSOR  SYS_REFCURSOR;
    V_COL_VAL VARCHAR2(200);
  BEGIN
    IF P_STR IS NULL OR TRIM(P_STR) IS NULL THEN
      DBMS_OUTPUT.PUT_LINE('请输入查询字符串');
      RETURN;
    END IF;
    FOR L_CUR IN (SELECT T.TABLE_NAME FROM USER_TABLES T) LOOP
      FOR LL_CUR IN (SELECT C.COLUMN_NAME
                       FROM USER_TAB_COLUMNS C
                      WHERE C.TABLE_NAME = L_CUR.TABLE_NAME) LOOP
        BEGIN
          V_SQL := 'SELECT ' || LL_CUR.COLUMN_NAME || ' FROM ' ||
                   L_CUR.TABLE_NAME || ' WHERE ' || LL_CUR.COLUMN_NAME ||
                   ' LIKE ''%' || P_STR || '%''';
          OPEN V_CURSOR FOR V_SQL;
          LOOP
            FETCH V_CURSOR
              INTO V_COL_VAL;
            EXIT WHEN V_CURSOR%NOTFOUND;
            DBMS_OUTPUT.PUT_LINE('[' || L_CUR.TABLE_NAME || '][' ||
                                 LL_CUR.COLUMN_NAME || ']' || V_COL_VAL);
          END LOOP;
        EXCEPTION
          WHEN OTHERS THEN
            NULL;
        END;
      END LOOP;
    END LOOP;
  END P_SEARCH_ALL;

  --全库清理
  PROCEDURE P_CLEAR_ALL AS
  BEGIN
    --暂未实现
    DBMS_OUTPUT.PUT_LINE('P_CLEAR_ALL');
  END P_CLEAR_ALL;

  --重新编译无效对象
  PROCEDURE P_RECOMPILE_INVALID AS
  BEGIN
    FOR L_CUR IN (SELECT A.OBJECT_NAME, A.OBJECT_TYPE
                    FROM USER_OBJECTS A
                   WHERE A.STATUS = 'INVALID') LOOP
      BEGIN
        IF UPPER(L_CUR.OBJECT_TYPE) = 'PACKAGE BODY' THEN
          EXECUTE IMMEDIATE 'ALTER PACKAGE ' || L_CUR.OBJECT_NAME ||
                            ' COMPILE BODY';
        ELSE
          EXECUTE IMMEDIATE 'ALTER ' || L_CUR.OBJECT_TYPE || ' ' ||
                            L_CUR.OBJECT_NAME || ' COMPILE';
        END IF;
        DBMS_OUTPUT.PUT_LINE(L_CUR.OBJECT_TYPE || ':' || L_CUR.OBJECT_NAME ||
                             ' RECOMPLIED SUCCESSFULLY');
      EXCEPTION
        WHEN OTHERS THEN
          DBMS_OUTPUT.PUT_LINE(L_CUR.OBJECT_TYPE || ':' ||
                               L_CUR.OBJECT_NAME ||
                               ' RECOMPLIED UNSUCCESSFULLY');
      END;
    END LOOP;
  END;

END PKG_UTIL;
/

prompt
prompt Creating package body PKG_VALIDATE
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE BODY PKG_VALIDATE IS
  PROCEDURE USP_OBJECT_VALIDATE(IN_TABLE_NAME   VARCHAR2, --表物理名
                                IN_COLUMNS_NAME VARCHAR2, --字段物理名多个用逗号隔开
                                OUT_ERRWORD     OUT VARCHAR2, --返回验证的情况
                                OUT_ERROR       OUT VARCHAR2) --返回程序执行情况
    /*--------------------------------------*/
    ---名称/功能：对象和属性验证
    ---创建人：骆斌
    ---创建时间：2016.10.11
    ---修改人：
    ---修改时间：
    ---修改内容：
    /*--------------------------------------*/
   AS
    V_CT     NUMBER; --计数
    V_NUMBER NUMBER := 0; --计数
  BEGIN
    OUT_ERROR   := 'SUCCESS';
    OUT_ERRWORD := '';
    --验证表是否存在
    SELECT COUNT(1)
      INTO V_CT
      FROM USER_TAB_COLUMNS
     WHERE TABLE_NAME = UPPER(IN_TABLE_NAME);
    IF V_CT = 0 THEN
      OUT_ERRWORD := '数据库表' || UPPER(IN_TABLE_NAME) || '不存在';
    ELSE
      --验证对象属性是否存在
      FOR I IN (SELECT COLUMN_VALUE COLUMN_NAME
                  FROM TABLE(splitstr(IN_COLUMNS_NAME, ','))) LOOP
        SELECT COUNT(1)
          INTO V_CT
          FROM USER_TAB_COLUMNS
         WHERE TABLE_NAME = UPPER(IN_TABLE_NAME)
           AND COLUMN_NAME = UPPER(I.COLUMN_NAME);
        IF V_CT = 0 THEN
          V_NUMBER    := V_NUMBER + 1;
          OUT_ERRWORD := OUT_ERRWORD || ',' || UPPER(I.COLUMN_NAME);
        END IF;
      END LOOP;
      IF V_NUMBER > 0 THEN
        OUT_ERRWORD := '数据库表'||UPPER(IN_TABLE_NAME)||'存在，表中字段' || OUT_ERRWORD || '不存在';
      END IF;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      OUT_ERROR := SQLERRM;
  END USP_OBJECT_VALIDATE;
END PKG_VALIDATE;
/

prompt
prompt Creating package body PKG_WF
prompt ============================
prompt
CREATE OR REPLACE PACKAGE BODY PKG_WF IS

  V_VALID         CONSTANT CHAR(1) := '1'; --有效状态 有效
  V_SUCCESS_FLAG  CONSTANT VARCHAR2(10) := 'SUCCESS'; --程序运行成功标识
  V_START_SUCCESS CONSTANT VARCHAR2(20) := '流程启动成功'; --流程启动成功提示信息
  V_ACTION_FIRST  CONSTANT VARCHAR2(10) := 'FIRST'; --启动流程，实例化第一环节
  V_ACTION_TSBACK CONSTANT VARCHAR2(10) := 'TS_BACK'; --任务特送退回

  --功能：启动流程
  --创建人：lb
  --创建时间：2016.9
  --修改人：wcy
  --修改时间：2018.3
  PROCEDURE P_WORKFLOW_START(IN_WF_ID   NUMBER, --流程ID
                             IN_USER_ID NUMBER, --流程发起人(用户ID、环节实例ID)
                             IN_TYPE    NUMBER, --流程发起类型 0:人工 1:嵌套
                             IN_DATAID  NUMBER, --业务数据ID
                             IN_TITLE   VARCHAR2, --流程实例标题
                             IN_SOURCE  VARCHAR2, --对象ID的集合
                             OUT_STR    OUT VARCHAR2, --返回信息
                             OUT_ERROR  OUT VARCHAR2) --返回程序执行情况
   AS
    V_WF_ID      INTEGER; --流程ID
    V_START_NODE INTEGER; --开始环节ID
    V_NEXT_NODE  INTEGER; --开始环节下一环节ID
    V_WF_INS_ID  INTEGER; --流程实例ID
    V_COUNT      NUMBER; --统计数量
    ERR_START_WORKFLOW EXCEPTION; --自定义异常
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --根据原始版本流程ID查找流程ID,找出原始版本最大的版本号对应的流程ID
    /*SELECT ID
     INTO V_WF_ID
     FROM SYS_WORKFLOW
    WHERE WORKFLOW_ID = IN_WF_ID
      AND VERSION = (SELECT MAX(VERSION)
                       FROM SYS_WORKFLOW
                      WHERE WORKFLOW_ID = IN_WF_ID)
      AND SFYX_ST = V_VALID;*/
    --目前传入参数IN_WF_ID即为最新版本流程
    V_WF_ID := IN_WF_ID;
    --不已原流程编号为标准而已流程编码为标准创建新版本
    /*WITH TMP AS
    (SELECT CODE FROM SYS_WORKFLOW WHERE ID = IN_WF_ID)
    SELECT W.ID INTO V_WF_ID
    FROM SYS_WORKFLOW W
    WHERE (W.CODE, W.VERSION) = (SELECT S.CODE, MAX(S.VERSION)
                                   FROM SYS_WORKFLOW S, TMP T
                                  WHERE S.SFYX_ST = '1'
                                    AND S.CODE = T.CODE
                                  GROUP BY S.CODE);
    AND W.SFYX_ST = '1'*/
    /*SELECT W.ID INTO V_WF_ID
    FROM SYS_WORKFLOW W
    WHERE (W.CODE, W.VERSION) IN (SELECT W1.CODE, MAX(W1.VERSION)
                                 FROM SYS_WORKFLOW W1, SYS_WORKFLOW W2
                                WHERE W1.SFYX_ST = '1'
                                  AND W2.SFYX_ST = '1'
                                  AND W1.CODE = W2.CODE
                                  AND W2.ID = IN_WF_ID
                                GROUP BY W1.CODE)
    AND W.SFYX_ST = '1'*/
    --查找开始环节的数量 环节类别：0开始环节 1结束环节 2活动环节 3传阅环节 4决策环节 5嵌套环节
    SELECT COUNT(*)
      INTO V_COUNT
      FROM SYS_NODE S
     WHERE S.WORKFLOW_ID = V_WF_ID
       AND S.TYPE = '0'
       AND S.SFYX_ST = V_VALID;
    --如果只有一个开始环节正常流程实例化
    IF V_COUNT = 1 THEN
      --查找开始环节的环节ID
      SELECT ID
        INTO V_START_NODE
        FROM SYS_NODE S
       WHERE S.WORKFLOW_ID = V_WF_ID
         AND S.TYPE = '0'
         AND S.SFYX_ST = V_VALID;
      --实例化流程，判断办理类型，如果是人工办理则插入人员ID，若嵌套则插入环节ID
      SELECT SEQ_SYS_WORKFLOW_INSTANCE.NEXTVAL INTO V_WF_INS_ID FROM DUAL;
      IF IN_TYPE = 0 THEN
        INSERT INTO SYS_WORKFLOW_INSTANCE
          (ID,
           WORKFLOW_ID,
           TITLE,
           INITIAL_VALUE,
           STATUS,
           STARTUP_USER_ID,
           DATA_ID,
           SOURCE_DATA,
           STARTUP_TYPE,
           CJSJ,
           SFYX_ST)
        VALUES
          (V_WF_INS_ID,
           V_WF_ID,
           IN_TITLE,
           NULL,
           '5', --未提交
           IN_USER_ID,
           IN_DATAID,
           IN_SOURCE,
           0, --启动类型 0：人工  1：嵌套
           SYSDATE,
           V_VALID);
      ELSIF IN_TYPE = 1 THEN
        INSERT INTO SYS_WORKFLOW_INSTANCE
          (ID,
           WORKFLOW_ID,
           TITLE,
           INITIAL_VALUE,
           STATUS,
           STARTUP_USER_ID,
           DATA_ID,
           SOURCE_DATA,
           STARTUP_TYPE,
           CJSJ,
           SFYX_ST)
        VALUES
          (V_WF_INS_ID,
           V_WF_ID,
           IN_TITLE,
           NULL,
           '5',
           IN_USER_ID,
           IN_DATAID,
           IN_SOURCE,
           1, --启动类型 0：人工  1：嵌套
           SYSDATE,
           V_VALID);
      END IF;
      --流程变量初始化
      PKG_WF.P_WORKFLOW_VARIABLE_INSTANCE(V_WF_ID, V_WF_INS_ID);
      --在流程流向表中查找下一环节ID
      SELECT END_NODE_ID
        INTO V_NEXT_NODE
        FROM SYS_ROUTER
       WHERE START_NODE_ID = V_START_NODE --开始环节ID
         AND SFYX_ST = V_VALID;

      --调用环节实例化存储过程
      PKG_WF.P_WORKFLOW_INSTANCE_NODE(V_NEXT_NODE,
                                      IN_USER_ID,
                                      V_WF_INS_ID,
                                      V_ACTION_FIRST,
                                      OUT_STR,
                                      OUT_ERROR);
      IF OUT_STR IS NULL THEN
        OUT_STR := V_START_SUCCESS || ',' || V_WF_INS_ID;
        --执行流程启动后处理程序
        PKG_TASK.P_FINISH_PROCESS('1', V_WF_INS_ID, NULL);
        --更新业务流程关联表数据
        PKG_TASK.P_UPDATE_OPERATION_NOTE(V_WF_INS_ID, '1');
      ELSE
        RAISE ERR_START_WORKFLOW;
      END IF;
    ELSE
      OUT_ERROR := '开始环节数量不唯一';
    END IF;
    --异常处理
  EXCEPTION
    WHEN ERR_START_WORKFLOW THEN
      OUT_ERROR := OUT_STR;
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_ERROR := '启动流程时出现 ' || SQLERRM;
      ROLLBACK;
  END P_WORKFLOW_START;

  --实例化环节
  --创建人：lb
  --创建时间：2016.9
  --修改人：wy
  --修改时间：2018.11
  PROCEDURE P_WORKFLOW_INSTANCE_NODE(IN_NODE_ID   NUMBER, --本环节ID
                                     IN_USER_IDS  VARCHAR2, --指定办理人IDS，用逗号分隔
                                     IN_WF_INS_ID NUMBER, --流程实例ID
                                     IN_TASK_INFO VARCHAR2, --来源任务信息 任务动作,任务ID
                                     OUT_STR      OUT VARCHAR2, --返回信息
                                     OUT_ERROR    OUT VARCHAR2) --返回程序执行情况
   AS
    V_S_NODE_TYPE CHAR(1); --上一环节环节类型
    V_NODE_NATURE CHAR(1); --环节的分支聚合属性 1分支 2聚合 0普通
    --V_CT1              NUMBER;
    --V_CT2              NUMBER;
    V_INDEX           NUMBER; --逗号位置
    V_NODE_TYPE       NUMBER; --环节类型
    V_NODE_INS_ID     NUMBER; --本环节实例ID
    V_DBOZB           NUMBER; --待办OR在办
    V_ROLE_ID         NUMBER; --角色ID
    V_COUNT           NUMBER; --数据总数
    V_DATA_ID         NUMBER; --业务数据ID
    V_TASK_INS_ID     NUMBER; --任务实例ID
    V_WF_ID           NUMBER; --流程ID
    V_USER_NUM        NUMBER; --用户数量
    V_PRE_NODE_SORT   NUMBER; --前办理环节序号
    V_PRE_TASK_ID     NUMBER; --前任务ID
    V_PRE_NODE_INS_ID NUMBER; --前环节实例ID
    V_ACTION          VARCHAR2(20); --前任务办理动作
    V_ROLE_MADE       VARCHAR2(20); --角色组成类别
    V_PROCEDURE       VARCHAR2(4000); --动态执行的存储过程
    V_SQL             VARCHAR2(4000); --动态执行的SQL语句
    CUR_USER          MYCURSOR;
    TYPE_USER_ROW     SYS_USER%ROWTYPE;
    ERR_INSTANCE_NODE EXCEPTION; --异常信息
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --查找本环节的环节类型、分支聚合属性
    SELECT N.TYPE, N.NATURE
      INTO V_NODE_TYPE, V_NODE_NATURE
      FROM SYS_NODE N
     WHERE N.ID = IN_NODE_ID
       AND SFYX_ST = V_VALID;
    --如果本环节不是活动环节，提示不能实例化
    IF V_NODE_TYPE <> '2' THEN
      OUT_STR := '该环节不是活动环节，不能实例化 ';
      RAISE ERR_INSTANCE_NODE;
    END IF;
    --检测逗号位置，取出任务办理动作、任务ID
    V_INDEX := INSTR(IN_TASK_INFO, ',');
    IF V_INDEX > 0 THEN
      V_ACTION      := SUBSTR(IN_TASK_INFO, 1, V_INDEX - 1);
      V_PRE_TASK_ID := SUBSTR(IN_TASK_INFO, V_INDEX + 1);
      --查找前办理环节序号
      SELECT N.SORT, TI.NODE_INSTANCE_ID
        INTO V_PRE_NODE_SORT, V_PRE_NODE_INS_ID
        FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE NI, SYS_NODE N
       WHERE TI.NODE_INSTANCE_ID = NI.ID
         AND NI.NODE_ID = N.ID
         AND TI.SFYX_ST = '1'
         AND NI.SFYX_ST = '1'
         AND N.SFYX_ST = '1'
         AND TI.ID = V_PRE_TASK_ID;
      --没有任务ID，说明是启动流程实例化第一办理环节
    ELSE
      V_ACTION := IN_TASK_INFO;
      --前办理环节是开始环节
      SELECT N.SORT
        INTO V_PRE_NODE_SORT
        FROM SYS_NODE N
       WHERE N.WORKFLOW_ID = (SELECT SN.WORKFLOW_ID
                                FROM SYS_NODE SN
                               WHERE SN.ID = IN_NODE_ID
                                 AND SN.SFYX_ST = '1')
         AND N.TYPE = '0'
         AND N.SFYX_ST = '1';
    END IF;
    --查找工作流ID
    SELECT T.WORKFLOW_ID
      INTO V_WF_ID
      FROM SYS_WORKFLOW_INSTANCE T
     WHERE T.ID = IN_WF_INS_ID
       AND T.SFYX_ST = V_VALID;
    --新建环节实例ID
    SELECT SEQ_SYS_NODE_INSTANCE.NEXTVAL INTO V_NODE_INS_ID FROM DUAL;
    --实例化本环节，将实例化信息插入环节实例类表
    INSERT INTO SYS_NODE_INSTANCE
      (ID,
       NODE_ID,
       WORKFLOW_INSTANCE_ID,
       STATUS,
       CJSJ,
       SFYX_ST,
       TYPE,
       FROM_NODE_SORT,
       FROM_NODE_INS_ID)
    VALUES
      (V_NODE_INS_ID,
       IN_NODE_ID,
       IN_WF_INS_ID,
       '1',
       SYSDATE,
       V_VALID,
       V_ACTION,
       V_PRE_NODE_SORT,
       V_PRE_NODE_INS_ID);

    --清空临时表数据
    DELETE FROM TEMP_CONDUCT;
    DELETE FROM TEMP_USER;
    --如果指定了环节办理人 把人员ID插入临时表
    IF IN_USER_IDS IS NOT NULL AND UPPER(IN_USER_IDS) <> 'NULL' THEN
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(IN_USER_IDS, ','))) LOOP
        --判断截取的字符串在用户表中是否存在
        SELECT COUNT(1)
          INTO V_COUNT
          FROM SYS_USER U
         WHERE U.ID = K.COLUMN_VALUE
           AND (U.SFYX_ST = V_VALID OR U.SFYX_ST = '3');
        --如果只有一条记录
        IF V_COUNT = 1 THEN
          --将记录插入临时表
          INSERT INTO TEMP_CONDUCT (USER_ID) VALUES (K.COLUMN_VALUE);
        ELSE
          OUT_STR := '用户不存在 ';
          RAISE ERR_INSTANCE_NODE;
        END IF;
      END LOOP;
      --未指定环节办理人则根据角色ID找到人员ID
    ELSE
      --调用存储过程获取
      PKG_WF_DAMIC_USER.P_WF_DEFAULT_TRANSACTOR(IN_WF_INS_ID,
                                                IN_NODE_ID,
                                                V_PRE_TASK_ID);
      INSERT INTO TEMP_CONDUCT
        (USER_ID)
        SELECT USER_ID FROM TEMP_USER;
    END IF;
    --验证是否有任务办理人
    SELECT COUNT(1) INTO V_USER_NUM FROM TEMP_CONDUCT;
    IF V_USER_NUM = 0 THEN
      OUT_STR := '没有任务办理人 ';
      RAISE ERR_INSTANCE_NODE;
    END IF;
    --查找上一环节的环节类型
    SELECT TO_CHAR(MIN(N.TYPE))
      INTO V_S_NODE_TYPE
      FROM SYS_NODE N, SYS_ROUTER R
     WHERE R.START_NODE_ID = N.ID
       AND R.END_NODE_ID = IN_NODE_ID
       AND N.SFYX_ST = V_VALID
       AND R.SFYX_ST = V_VALID;
    --清除委办人员临时表
    DELETE FROM TEMP_CONDUCT_WB;
    --上一环节若不是开始环节则进行委办的处理
    IF V_S_NODE_TYPE <> '0' THEN
      --往委办人员临时表中插入数据
      INSERT INTO TEMP_CONDUCT_WB
        (USER_ID, WB_USER_ID, IS_WB)
        SELECT DISTINCT C.USER_ID,
                        E.ENTRUST_USER_ID,
                        DECODE(E.ID, NULL, '0', '1')
          FROM TEMP_CONDUCT C
          LEFT JOIN SYS_ENTRUST E
            ON C.USER_ID = E.USER_ID
           AND (TRUNC(SYSDATE) BETWEEN TRUNC(E.START_DATE) AND
               TRUNC(E.END_DATE))
           AND INSTR(',' || E.WORKFLOW_ID || ',', ',' || V_WF_ID || ',') > 0
           AND E.SFYX_ST = V_VALID;
      --第一个提交环节不允许委办
    ELSE
      INSERT INTO TEMP_CONDUCT_WB
        (USER_ID, WB_USER_ID, IS_WB)
        SELECT DISTINCT C.USER_ID, NULL, '0' FROM TEMP_CONDUCT C;
    END IF;
    --查看上一环节是否是开始环节，是则产生的任务是在办，不是产生的任务为待办
    IF V_S_NODE_TYPE <> '0' THEN
      --任务状态为待办
      V_DBOZB := '0';
      --将流程实例状态改为运行
      UPDATE SYS_WORKFLOW_INSTANCE
         SET STATUS = '2'
       WHERE ID = IN_WF_INS_ID;
    ELSE
      --任务状态为在办
      V_DBOZB := '1';
      --将流程实例状态改为未提交
      UPDATE SYS_WORKFLOW_INSTANCE
         SET STATUS = '5'
       WHERE ID = IN_WF_INS_ID;
    END IF;
    --实例化任务
    FOR V_I IN (SELECT E.USER_ID, E.WB_USER_ID, E.IS_WB
                  FROM TEMP_CONDUCT_WB E) LOOP
      SELECT SEQ_SYS_TASK_INSTANCE.NEXTVAL INTO V_TASK_INS_ID FROM DUAL;
      INSERT INTO SYS_TASK_INSTANCE
        (ID,
         NODE_INSTANCE_ID,
         WORKFLOW_INSTANCE_ID,
         USER_ID,
         ACCEPT_DATE,
         CJSJ,
         FINISH_DATE,
         STATUS,
         ACTION,
         BRANCH,
         OPINION,
         IS_FINISH,
         SFYX_ST,
         IS_WBRW,
         FORMER_USER_ID)
        SELECT V_TASK_INS_ID,
               V_NODE_INS_ID,
               IN_WF_INS_ID,
               DECODE(V_I.IS_WB, '0', V_I.USER_ID, V_I.WB_USER_ID),
               DECODE(V_DBOZB, '1', SYSDATE, ''),
               SYSDATE,
               '',
               DECODE(V_DBOZB, '1', '1', '0'),
               DECODE(V_DBOZB, '1', '2', '1'),
               '',
               '',
               '0',
               V_VALID,
               V_I.IS_WB,
               DECODE(V_I.IS_WB, '0', NULL, V_I.USER_ID)
          FROM DUAL;
      --实例化任务流程环节关系
      INSERT INTO SYS_TASK_PAGE_INSTANCE
        (ID,
         TASK_INSTANCE_ID,
         WORKFLOW_PAGE_ID,
         DATA_ID,
         TMP_DATA_JSON,
         CJSJ,
         SFYX_ST,
         XGSJ,
         NODE_PAGE_ID,
         PAGE_ID)
        SELECT SEQ_SYS_TASK_PAGE_INSTANCE.NEXTVAL,
               V_TASK_INS_ID,
               WP.ID,
               NULL,
               NULL,
               SYSDATE,
               V_VALID,
               SYSDATE,
               NP.ID,
               NP.PAGE_ID
          FROM SYS_TASK_INSTANCE     TI,
               SYS_NODE_INSTANCE     NI,
               SYS_NODE_PAGE         NP,
               SYS_WORKFLOW_PAGE     WP,
               SYS_WORKFLOW_INSTANCE WI
         WHERE TI.ID = V_TASK_INS_ID
           AND TI.NODE_INSTANCE_ID = NI.ID
           AND TI.WORKFLOW_INSTANCE_ID = WI.ID
           AND WI.WORKFLOW_ID = WP.WORKFLOW_ID
           AND NI.NODE_ID = NP.NODE_ID
           AND WP.PAGE_ID = NP.PAGE_ID
           AND TI.SFYX_ST = V_VALID
           AND NI.SFYX_ST = V_VALID
           AND WI.SFYX_ST = V_VALID
           AND NP.SFYX_ST = V_VALID
           AND WP.SFYX_ST = V_VALID;

      IF V_PRE_TASK_ID IS NOT NULL THEN
        --同步更新签章模板路径
        FOR K IN (SELECT TPI.PAGE_ID, TPI.PATH
                    FROM SYS_TASK_PAGE_INSTANCE TPI
                   WHERE TPI.TASK_INSTANCE_ID = V_PRE_TASK_ID
                     AND TPI.SFYX_ST = '1') LOOP
          UPDATE SYS_TASK_PAGE_INSTANCE TPI
             SET TPI.PATH = K.PATH
           WHERE TPI.TASK_INSTANCE_ID = V_TASK_INS_ID
             AND TPI.PAGE_ID = K.PAGE_ID
             AND TPI.SFYX_ST = '1';
        END LOOP;
      END IF;
      /*--判断该任务对应的表单是不是有审核表单且没有办理表单
      SELECT COUNT(1)
        INTO V_CT1
        FROM SYS_TASK_PAGE_INSTANCE TPI, SYS_NODE_PAGE NP
       WHERE TPI.NODE_PAGE_ID = NP.ID
         AND TPI.SFYX_ST = V_VALID
         AND NP.SFYX_ST = V_VALID
         AND NP.CONTROL = V_VALID
         AND TPI.TASK_INSTANCE_ID = V_TASK_INSTANCE_ID;
      SELECT COUNT(1)
        INTO V_CT2
        FROM SYS_TASK_PAGE_INSTANCE TPI, SYS_NODE_PAGE NP
       WHERE TPI.NODE_PAGE_ID = NP.ID
         AND TPI.SFYX_ST = V_VALID
         AND NP.SFYX_ST = V_VALID
         AND NP.CONTROL = '0'
         AND TPI.TASK_INSTANCE_ID = V_TASK_INSTANCE_ID;
      --如果该任务表单有审核表单且没有办理表单，判断自动办理记录表中有无该人之前的办理记录
      IF V_CT1 > 0 AND V_CT2 = 0 THEN
        SELECT COUNT(1)
          INTO V_CT
          FROM SYS_WF_AUTO_HANDLE_USER WA, SYS_TASK_INSTANCE TI
         WHERE WA.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID
           AND TI.ID = V_TASK_INSTANCE_ID
           AND TI.USER_ID = WA.USER_ID
           AND TI.SFYX_ST = V_VALID;
        --如果自动办理记录表中有该人之前的办理记录，则自动办理
        IF V_CT > 0 THEN
          PKG_TASK.P_TASK_SUBMIT(V_TASK_INSTANCE_ID,
                                   NULL,
                                   NULL,
                                   '自动办理：同意',
                                   NULL,
                                   '1',
                                   OUT_ERRWORD,
                                   OUT_ERROR);
        END IF;
      END IF;
      --维护自动办理记录表
      INSERT INTO SYS_WF_AUTO_HANDLE_USER
        (WORKFLOW_INSTANCE_ID, NODE_ID, USER_ID)
        SELECT IN_WF_INS_ID, NI.NODE_ID, TI.USER_ID
          FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE NI
         WHERE TI.NODE_INSTANCE_ID = NI.ID
           AND TI.SFYX_ST = V_VALID
           AND NI.SFYX_ST = V_VALID
           AND TI.ID = V_TASK_INSTANCE_ID;*/
    END LOOP;

    --异常处理
  EXCEPTION
    WHEN ERR_INSTANCE_NODE THEN
      OUT_ERROR := OUT_STR;
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_STR   := '实例化环节出现 ' || SQLERRM;
      OUT_ERROR := OUT_STR;
      ROLLBACK;
  END P_WORKFLOW_INSTANCE_NODE;

  --查找下一环节
  PROCEDURE P_WORKFLOW_NEXT_NODE(IN_NODE_ID   INTEGER, --环节ID
                                 IN_CONDITION VARCHAR2, --决策条件
                                 IN_WF_INS_ID INTEGER, --流程实例ID
                                 OUT_CUR      OUT MYCURSOR, --返回下一环节的ID，NAME集合
                                 OUT_STR      OUT VARCHAR2, --返回信息
                                 OUT_ERROR    OUT VARCHAR2) --返回程序执行情况
   AS
    V_NUM            NUMBER;
    V_COUNT          NUMBER;
    V_NEXT_NODE_ID   INTEGER;
    V_WF_ID          INTEGER;
    V_JCHJTJ         VARCHAR2(200); --决策环节条件
    V_BRANCHSTR      VARCHAR2(200);
    V_SQL            VARCHAR2(300);
    V_BRANCH         SYS_ROUTER.BRANCH%TYPE;
    V_NEXT_NODE_TYPE SYS_NODE.TYPE%TYPE;
    V_DECISION_TYPE  SYS_DECISION_NODE.DECISION_TYPE%TYPE;
    TYPE TYPE_ROUTER IS TABLE OF SYS_ROUTER%ROWTYPE; --流程流向记录表
    V_ROUTER TYPE_ROUTER;
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --清空临时表数据
    DELETE FROM TEMP_NODE;
    --将环节ID插入临时表
    INSERT INTO TEMP_NODE (NODE_ID) VALUES (IN_NODE_ID);
    LOOP
      --查找临时表的记录数，如果没有记录，跳出循环
      SELECT COUNT(1) INTO V_COUNT FROM TEMP_NODE;
      EXIT WHEN V_COUNT = 0;
      EXECUTE IMMEDIATE ' SELECT * FROM SYS_ROUTER R
               WHERE R.START_NODE_ID IN (SELECT N.NODE_ID FROM TEMP_NODE N) AND SFYX_ST=''1'' ' ||
                        V_JCHJTJ BULK COLLECT
        INTO V_ROUTER;
      --清空临时表数据
      DELETE FROM TEMP_NODE;
      --通过流向查找下一环节，下一环节可能有多个，所以循环查找
      FOR K IN 1 .. V_ROUTER.COUNT LOOP
        --查找下一环节的ID,环节类型，所属流程ID
        SELECT N.ID, N.TYPE, N.WORKFLOW_ID
          INTO V_NEXT_NODE_ID, V_NEXT_NODE_TYPE, V_WF_ID
          FROM SYS_NODE N
         WHERE N.ID = V_ROUTER(K).END_NODE_ID
           AND N.SFYX_ST = V_VALID;
        --下一环节是活动环节
        IF V_NEXT_NODE_TYPE = '2' THEN
          OPEN OUT_CUR FOR
            SELECT N.ID, N.NAME
              FROM SYS_NODE N
             WHERE N.ID = V_ROUTER(K).END_NODE_ID
               AND N.SFYX_ST = V_VALID;
          OUT_STR := '下一环节非结束、决策，取出成功';
          --下一环节是结束环节
        ELSIF V_NEXT_NODE_TYPE = '1' THEN
          OPEN OUT_CUR FOR
            SELECT ID, NAME FROM SYS_NODE WHERE 1 = 2;
          OUT_STR := '下一环节为结束环节，取出空值';
          --下一环节是决策环节
        ELSIF V_NEXT_NODE_TYPE = '4' THEN
          --查找决策环节的决策类型
          SELECT DECISION_TYPE
            INTO V_DECISION_TYPE
            FROM SYS_DECISION_NODE
           WHERE ID = V_ROUTER(K).END_NODE_ID;
          FOR J IN (SELECT *
                      FROM SYS_ROUTER R
                     WHERE R.START_NODE_ID = V_ROUTER(K).END_NODE_ID
                       AND SFYX_ST = V_VALID) LOOP
            V_BRANCH := J.BRANCH;
            --自动决策
            IF V_DECISION_TYPE = '1' THEN
              V_BRANCHSTR := '';
              --在流程变量实例类中查找变量值，流程变量表里面查名称
              FOR L IN (SELECT V.VALUE, T.NAME
                          FROM (SELECT *
                                  FROM (SELECT WORKFLOW_INSTANCE_ID,
                                               VARIABLE_ID,
                                               VALUE,
                                               RANK() OVER(PARTITION BY VARIABLE_ID ORDER BY CJSJ DESC) RN
                                          FROM SYS_WORKFLOW_VARIABLE_INSTANCE
                                         WHERE WORKFLOW_INSTANCE_ID =
                                               IN_WF_INS_ID
                                           AND SFYX_ST = V_VALID)
                                 WHERE RN = 1) V,
                               SYS_WORKFLOW_VARIABLE T
                         WHERE V.VARIABLE_ID = T.ID
                           AND T.WORKFLOW_ID = V_WF_ID
                           AND T.SFYX_ST = V_VALID) LOOP
                --如果决策条件里面含有'[WF:' || UPPER(L.NAME) || ']'，将它替换成 '''' || L.VALUE || '''') || ') '
                IF INSTR(UPPER(V_BRANCH), '[WF:' || UPPER(L.NAME) || ']') > 0 THEN
                  V_BRANCHSTR := V_BRANCHSTR || ' OR (' ||
                                 REPLACE(UPPER(V_BRANCH),
                                         '[WF:' || UPPER(L.NAME) || ']',
                                         '''' || L.VALUE || '''') || ') ';
                END IF;
              END LOOP;
              IF V_BRANCHSTR IS NOT NULL THEN
                V_SQL := ' SELECT COUNT(1) FROM DUAL WHERE ' ||
                         LTRIM(V_BRANCHSTR, ' OR');
              ELSE
                V_SQL := ' SELECT COUNT(1) FROM DUAL WHERE 1=0';
              END IF;
              --执行L_SQL并将值导入V_NUM
              EXECUTE IMMEDIATE V_SQL
                INTO V_NUM;
              IF V_NUM = 1 THEN
                --赋值
                INSERT INTO TEMP_NODE
                  (NODE_ID)
                VALUES
                  (V_ROUTER(K).END_NODE_ID);
                V_JCHJTJ := ' AND BRANCH=''' ||
                            REPLACE(J.BRANCH, '''', '''''') || '''';
                V_NUM    := 0;
              ELSE
                V_NUM := 1;
              END IF;

              --手动决策
            ELSIF V_DECISION_TYPE = '0' THEN
              IF V_BRANCH = IN_CONDITION THEN
                INSERT INTO TEMP_NODE
                  (NODE_ID)
                VALUES
                  (V_ROUTER(K).END_NODE_ID);
                V_JCHJTJ := ' AND BRANCH=''' ||
                            REPLACE(IN_CONDITION, '''', '''''') || '''';
                V_NUM    := 0;
              END IF;
            END IF;
            EXIT WHEN V_NUM = 0;
          END LOOP;
        END IF;
      END LOOP;
    END LOOP;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := '查找下一活动环节异常 ' || SQLERRM;
      ROLLBACK;
  END P_WORKFLOW_NEXT_NODE;

  --删除流程
  PROCEDURE P_WORKFLOW_DELETE(IN_WF_ID  NUMBER, --流程ID
                              OUT_STR   OUT VARCHAR2, --执行结果
                              OUT_ERROR OUT VARCHAR2) --返回程序执行情况
   IS
    V_NUM NUMBER;
  BEGIN
    OUT_ERROR := 'SUCCESS';
    --查找是否有当前流程
    SELECT COUNT(1) INTO V_NUM FROM SYS_WORKFLOW T WHERE T.ID = IN_WF_ID;
    IF V_NUM = 1 THEN
      --删除当前流程
      DELETE FROM SYS_WORKFLOW T WHERE T.ID = IN_WF_ID;
      --删除流程变量
      DELETE SYS_WORKFLOW_VARIABLE WV WHERE WV.WORKFLOW_ID = IN_WF_ID;
      --删除流程表单
      DELETE SYS_WORKFLOW_PAGE P WHERE P.WORKFLOW_ID = IN_WF_ID;
      --删除流程的所有环节
      DELETE SYS_NODE N WHERE N.WORKFLOW_ID = IN_WF_ID;
      --删除活动环节
      DELETE SYS_ACTIVITY_NODE A
       WHERE NOT EXISTS (SELECT 1 FROM SYS_NODE N WHERE N.ID = A.ID);
      --删除决策环节
      DELETE SYS_DECISION_NODE D
       WHERE NOT EXISTS (SELECT 1 FROM SYS_NODE N WHERE N.ID = D.ID);
      --删除办理环节
      DELETE SYS_TRANSACT_NODE T
       WHERE NOT EXISTS (SELECT 1 FROM SYS_NODE N WHERE N.ID = T.ID);
      --删除嵌套环节
      DELETE SYS_NESTED_NODE NE
       WHERE NOT EXISTS (SELECT 1 FROM SYS_NODE N WHERE N.ID = NE.ID);
      --删除环节按钮
      DELETE SYS_NODE_BUTTON B
       WHERE NOT EXISTS (SELECT 1 FROM SYS_NODE N WHERE N.ID = B.NODE_ID);
      --删除环节变量
      DELETE SYS_NODE_VARIABLE_ASSIGN VA
       WHERE NOT EXISTS (SELECT 1 FROM SYS_NODE N WHERE N.ID = VA.NODE_ID);
      --删除环节表单
      DELETE SYS_NODE_PAGE NP
       WHERE NOT EXISTS (SELECT 1 FROM SYS_NODE N WHERE N.ID = NP.NODE_ID);
      --删除流向
      DELETE SYS_ROUTER R WHERE R.WORKFLOW_ID = IN_WF_ID;
      OUT_STR := '流程删除成功';
    ELSE
      OUT_STR   := '流程已删除，不能再次删除 ';
      OUT_ERROR := OUT_STR;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_STR   := '删除流程时出现 ' || SQLERRM;
      OUT_ERROR := OUT_STR;
      ROLLBACK;
  END P_WORKFLOW_DELETE;

  --删除流程实例
  PROCEDURE P_WORKFLOW_INSTANCE_DELETE(IN_WF_INS_ID NUMBER, --流程实例ID
                                       OUT_STR      OUT VARCHAR2, --执行结果
                                       OUT_ERROR    OUT VARCHAR2) --返回程序执行情况
   IS
    V_NUM NUMBER;
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --查找是否有当前流程实例
    SELECT COUNT(1)
      INTO V_NUM
      FROM SYS_WORKFLOW_INSTANCE T
     WHERE T.ID = IN_WF_INS_ID
       AND T.SFYX_ST = V_VALID;
    IF V_NUM = 1 THEN
      --删除当前流程实例
      DELETE FROM SYS_WORKFLOW_INSTANCE T WHERE T.ID = IN_WF_INS_ID;
      --删除流程变量实例
      DELETE FROM SYS_WORKFLOW_VARIABLE_INSTANCE WVI
       WHERE WVI.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID;
      --删除流程实例下的所有环节实例
      DELETE FROM SYS_NODE_INSTANCE T
       WHERE T.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID;
      --删除流程实例下所有任务
      DELETE FROM SYS_TASK_INSTANCE T
       WHERE T.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID;
      --删除任务表单实例
      DELETE FROM SYS_TASK_PAGE_INSTANCE TPI
       WHERE TPI.TASK_INSTANCE_ID IN
             (SELECT ID
                FROM SYS_TASK_INSTANCE TI
               WHERE TI.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID
                 AND TI.SFYX_ST = V_VALID);
      --删除业务流程中间表流程实例
      DELETE FROM SYS_GLB_BIZ_WF GBW
       WHERE GBW.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID;
      OUT_STR := '流程删除成功';
    ELSE
      OUT_STR   := '流程已删除，不能再次删除 ';
      OUT_ERROR := OUT_STR;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_STR   := '删除流程时出现 ' || SQLERRM;
      OUT_ERROR := OUT_STR;
      ROLLBACK;
  END P_WORKFLOW_INSTANCE_DELETE;

  --功能：查找下一环节办理人、所属机构
  --创建人：lb
  --创建时间：2016.9
  --修改人：wcy
  --修改时间：2018.4
  PROCEDURE P_WF_NEXT_NODE_USER_ORG(IN_TASK_INS_ID INTEGER, --任务实例ID
                                    IN_DECISION    VARCHAR2, --决策条件
                                    IN_FLAG        VARCHAR2, --退回还是提交 0退回 1提交
                                    IN_BACK_NODES  VARCHAR2, --指定的退回环节IDS
                                    OUT_CUR        OUT MYCURSOR, --环节、办理人、所属机构集合
                                    OUT_STR        OUT VARCHAR2, --返回信息
                                    OUT_ERROR      OUT VARCHAR2) --返回程序执行情况

   AS
    EXP_TYPE                  CHAR(1); --异常类型
    V_NATURE                  CHAR(1); --环节分支聚合属性 1分支 2聚合 0普通
    V_S_NODE_TYPE             CHAR(1); --上一环节环节类型
    V_NEXT_NODE_TYPE          CHAR(1); --下一环节类型
    V_DECISION_NODE_TYPE      CHAR(1); --决策环节的决策类型
    V_DECISION_NEXT_NODE_TYPE CHAR(1); --决策环节下一环节的环节类型
    V_NODE_ID                 NUMBER; --本环节ID
    V_NODE_INS_ID             NUMBER; --本环节实例ID
    V_WF_ID                   NUMBER; --流程ID
    V_WF_INS_ID               NUMBER; --流程实例ID
    V_NEXT_NODE_ID            NUMBER; --下一环节ID
    V_NEXT_TRANSACT_NODE_ID   NUMBER := 0; --下一办理环节ID
    V_DECISION_NEXT_NODE_ID   NUMBER := 0; --决策环节的下一环节ID
    V_END                     NUMBER; --循环退出条件
    V_SUCCESS                 NUMBER; --判断条件
    V_NEXT_TRANSACT_NODE_NAME VARCHAR2(500); --下一办理环节名称
    V_BRANCHSTR               VARCHAR2(500); --分支条件
    V_BRANCH_STR              VARCHAR2(500); --分支条件
    V_SQL                     VARCHAR2(1000); --执行的SQL语句
    --定义一个RECORD表类型存放下一环节的ID和分支条件
    TYPE REC_BRANCH IS RECORD(
      ID     SYS_ROUTER.END_NODE_ID%TYPE,
      BRANCH SYS_ROUTER.BRANCH%TYPE);
    TYPE TAB_BRANCH IS TABLE OF REC_BRANCH INDEX BY BINARY_INTEGER;
    BRANCH_TAB TAB_BRANCH;
    ERR_NEXT_NODE_USER_ORG EXCEPTION; --抛出自定义异常

  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --先打开游标，确保游标在整个程序中打开过，以免程序报错
    OPEN OUT_CUR FOR
      SELECT NULL FROM DUAL;
    --查找环节ID、流程实例ID、流程ID、环节实例ID
    SELECT NI.NODE_ID,
           TI.WORKFLOW_INSTANCE_ID,
           WI.WORKFLOW_ID,
           TI.NODE_INSTANCE_ID
      INTO V_NODE_ID, V_WF_INS_ID, V_WF_ID, V_NODE_INS_ID
      FROM SYS_TASK_INSTANCE     TI,
           SYS_NODE_INSTANCE     NI,
           SYS_WORKFLOW_INSTANCE WI
     WHERE TI.NODE_INSTANCE_ID = NI.ID
       AND TI.WORKFLOW_INSTANCE_ID = WI.ID
       AND TI.ID = IN_TASK_INS_ID
       AND TI.SFYX_ST = V_VALID
       AND NI.SFYX_ST = V_VALID
       AND WI.SFYX_ST = V_VALID;
    --查找环节的分支聚合属性
    SELECT N.NATURE
      INTO V_NATURE
      FROM SYS_NODE N
     WHERE N.ID = V_NODE_ID
       AND N.SFYX_ST = '1';

    --提交
    IF IN_FLAG = '1' THEN
      --分支环节
      IF V_NATURE = '1' THEN
        --清空临时表
        DELETE FROM TEMP_NODE_USER;
        DELETE FROM TEMP_USER;
        --遍历分支环节所有下一办理环节
        FOR K IN (SELECT R.END_NODE_ID NODE_ID
                    FROM SYS_ROUTER R
                   WHERE LEVEL = 1
                     AND R.SFYX_ST = '1'
                   START WITH R.START_NODE_ID = V_NODE_ID
                  CONNECT BY NOCYCLE PRIOR R.START_NODE_ID = R.END_NODE_ID) LOOP
          --找出每个办理环节的办理人并插入临时表TEMP_NODE_USER
          PKG_WF.P_GET_BLR_BY_ROLE(V_WF_INS_ID, K.NODE_ID, '2');
        END LOOP;
        --从临时表获取数据
        OPEN OUT_CUR FOR
          SELECT N.NAME NEXT_NODE_NAME, U.USER_NAME, O.ORGAN_NAME
            FROM TEMP_NODE_USER NU
           INNER JOIN SYS_USER U
              ON NU.USER_ID = U.ID
             AND U.SFYX_ST = V_VALID
           INNER JOIN SYS_NODE N
              ON NU.NODE_ID = N.ID
             AND N.SFYX_ST = V_VALID
            LEFT JOIN SYS_ORGAN O
              ON U.DEFAULT_ORGAN_ID = O.ID
             AND O.SFYX_ST = V_VALID;
        --抛出异常，结束查找
        EXP_TYPE := 2;
        RAISE ERR_NEXT_NODE_USER_ORG;
        --非分支环节
      ELSE
        --查找下一环节的环节ID和环节类型
        SELECT N.ID, N.TYPE
          INTO V_NEXT_NODE_ID, V_NEXT_NODE_TYPE
          FROM SYS_ROUTER R, SYS_NODE N
         WHERE R.END_NODE_ID = N.ID
           AND R.START_NODE_ID = V_NODE_ID
           AND R.SFYX_ST = V_VALID
           AND N.SFYX_ST = V_VALID;
        --如果下一环节是结束环节则抛出异常，结束查找
        IF V_NEXT_NODE_TYPE = '1' THEN
          EXP_TYPE := 1;
          RAISE ERR_NEXT_NODE_USER_ORG;
        END IF;
        --如果下一环节是活动环节取出办理人和办理人所在的机构名称
        IF V_NEXT_NODE_TYPE = '2' THEN
          V_NEXT_TRANSACT_NODE_ID := V_NEXT_NODE_ID;
          --如果下一环节是决策环节且为自动决策取出决策环节的下一办理环节ID
        ELSIF V_NEXT_NODE_TYPE = '4' THEN
          LOOP
            EXIT WHEN V_NEXT_NODE_TYPE <> '4';
            --查找决策环节的决策类型
            SELECT DECISION_TYPE
              INTO V_DECISION_NODE_TYPE
              FROM SYS_DECISION_NODE
             WHERE ID = V_NEXT_NODE_ID;
            --如果是自动决策找出决策环节的下一环节
            IF V_DECISION_NODE_TYPE = '1' THEN
              V_BRANCHSTR := '';
              --取决策环节下一环节ID，分支条件放入表类型中
              SELECT S.END_NODE_ID, S.BRANCH
                BULK COLLECT
                INTO BRANCH_TAB
                FROM SYS_ROUTER S
               WHERE S.START_NODE_ID = V_NEXT_NODE_ID
                 AND S.SFYX_ST = V_VALID;
              --循环判断哪条分支条件是否满足，则取这个分支的下一环节并退出循环（判断下一环节）
              FOR I IN 1 .. BRANCH_TAB.COUNT LOOP
                V_BRANCH_STR := BRANCH_TAB(I).BRANCH;
                --解析分支条件，替换变量名为变量值
                FOR L IN (SELECT V.VALUE, T.NAME
                            FROM (SELECT *
                                    FROM (SELECT WORKFLOW_INSTANCE_ID,
                                                 VARIABLE_ID,
                                                 VALUE,
                                                 RANK() OVER(PARTITION BY VARIABLE_ID ORDER BY CJSJ DESC) RN
                                            FROM SYS_WORKFLOW_VARIABLE_INSTANCE
                                           WHERE WORKFLOW_INSTANCE_ID =
                                                 V_WF_INS_ID)
                                   WHERE RN = 1) V,
                                 SYS_WORKFLOW_VARIABLE T
                           WHERE V.VARIABLE_ID = T.ID
                             AND T.WORKFLOW_ID = V_WF_ID) LOOP
                  --如果决策条件里面含有'[WF:' || UPPER(L.NAME) || ']'，将它替换成 '''' || L.VALUE || '''') || ') '
                  IF INSTR(UPPER(V_BRANCH_STR),
                           '[WF:' || UPPER(L.NAME) || ']') > 0 THEN
                    V_BRANCHSTR := V_BRANCHSTR || ' OR (' ||
                                   REPLACE(UPPER(V_BRANCH_STR),
                                           '[WF:' || UPPER(L.NAME) || ']',
                                           '''' || L.VALUE || '''') || ') ';
                  END IF;
                END LOOP;
                --如果V_BRANCHSTR不为空
                IF V_BRANCHSTR IS NOT NULL THEN
                  V_SQL := ' SELECT COUNT(1)  FROM DUAL  WHERE ' ||
                           LTRIM(V_BRANCHSTR, ' OR');
                  --如果V_BRANCHSTR为空
                ELSE
                  V_SQL := ' SELECT COUNT(1)FROM DUAL WHERE 1=0';
                END IF;
                --执行L_SQL并将值导入V_SUCCESS
                EXECUTE IMMEDIATE V_SQL
                  INTO V_SUCCESS;
                IF V_SUCCESS = 1 THEN
                  --赋值
                  V_DECISION_NEXT_NODE_ID := BRANCH_TAB(I).ID;
                  V_END                   := 1;
                  --如果变量值和传入变量值不等，进行下一次循环比对
                ELSE
                  V_END := 0;
                END IF;
                EXIT WHEN V_END = 1;
              END LOOP;
              --手动决策
            ELSIF V_DECISION_NODE_TYPE = '0' THEN
              --取决策环节下一环节ID，分支条件放入表类型中
              SELECT S.END_NODE_ID, S.BRANCH
                BULK COLLECT
                INTO BRANCH_TAB
                FROM SYS_ROUTER S
               WHERE S.START_NODE_ID = V_NEXT_NODE_ID
                 AND S.SFYX_ST = V_VALID;
              --循环判断哪条分支条件是否满足，则取这个分支的下一环节并退出循环（判断下一环节）
              FOR I IN 1 .. BRANCH_TAB.COUNT LOOP
                V_BRANCH_STR := BRANCH_TAB(I).BRANCH;
                IF IN_DECISION = V_BRANCH_STR THEN
                  V_DECISION_NEXT_NODE_ID := BRANCH_TAB(I).ID;
                  V_END                   := 1;
                END IF;
                EXIT WHEN V_END = 1;
              END LOOP;
            END IF;
            --找到决策环节下一环节ID、类型
            IF V_DECISION_NEXT_NODE_ID <> 0 THEN
              SELECT N.TYPE
                INTO V_DECISION_NEXT_NODE_TYPE
                FROM SYS_NODE N
               WHERE N.ID = V_DECISION_NEXT_NODE_ID
                 AND N.SFYX_ST = V_VALID;
            END IF;
            V_NEXT_NODE_TYPE := V_DECISION_NEXT_NODE_TYPE;
            V_NEXT_NODE_ID   := V_DECISION_NEXT_NODE_ID;
          END LOOP;
          --决策环节后找到活动环节
          IF V_NEXT_NODE_TYPE = '2' THEN
            V_NEXT_TRANSACT_NODE_ID := V_NEXT_NODE_ID;
            --决策环节后找到结束环节,抛出异常来结束查找
          ELSIF V_NEXT_NODE_TYPE = '1' THEN
            EXP_TYPE := 1;
            RAISE ERR_NEXT_NODE_USER_ORG;
          END IF;
        END IF;
        --如果找到了下一办理环节，则根据办理环节ID找出办理人姓名和所在的组织名称
        IF V_NEXT_TRANSACT_NODE_ID = 0 THEN
          OUT_STR := '找不到下一办理环节';
        ELSE
          --查找下一办理环节名称
          SELECT N.NAME
            INTO V_NEXT_TRANSACT_NODE_NAME
            FROM SYS_NODE N
           WHERE N.ID = V_NEXT_TRANSACT_NODE_ID;
          --清空临时表
          DELETE FROM TEMP_CONDUCT;
          DELETE FROM TEMP_USER;
          --找出下一办理环节的办理人并插入临时表TEMP_CONDUCT
          PKG_WF.P_GET_BLR_BY_ROLE(V_WF_INS_ID,
                                   V_NEXT_TRANSACT_NODE_ID,
                                   '1');
        END IF;
      END IF;

      --退回
    ELSIF IN_FLAG = '0' THEN
      --聚合环节
      IF V_NATURE = '2' THEN
        FOR K IN (SELECT COLUMN_VALUE
                    FROM TABLE(SPLITSTR(IN_BACK_NODES, ','))) LOOP
          --找出各环节原办理人并插入临时表TEMP_NODE_USER
          INSERT INTO TEMP_NODE_USER
            (USER_ID, NODE_ID)
            SELECT TI.USER_ID, K.COLUMN_VALUE
              FROM SYS_TASK_INSTANCE TI
             WHERE TI.NODE_INSTANCE_ID =
                   (SELECT MAX(NI.ID)
                      FROM SYS_NODE_INSTANCE NI
                     WHERE NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                       AND NI.NODE_ID = K.COLUMN_VALUE
                       AND NI.STATUS = '2'
                       AND NI.SFYX_ST = V_VALID);
        END LOOP;
        --从临时表获取数据
        OPEN OUT_CUR FOR
          SELECT N.NAME NEXT_NODE_NAME, U.USER_NAME, O.ORGAN_NAME
            FROM TEMP_NODE_USER NU
           INNER JOIN SYS_USER U
              ON NU.USER_ID = U.ID
             AND U.SFYX_ST = V_VALID
           INNER JOIN SYS_NODE N
              ON NU.NODE_ID = N.ID
             AND N.SFYX_ST = V_VALID
            LEFT JOIN SYS_ORGAN O
              ON U.DEFAULT_ORGAN_ID = O.ID
             AND O.SFYX_ST = V_VALID;
        --抛出异常，结束查找
        EXP_TYPE := 2;
        RAISE ERR_NEXT_NODE_USER_ORG;
        --非聚合环节
      ELSE
        --查出配置的退回至环节ID、环节名称
        SELECT MAX(A.DISAGREE_NODE_ID), MAX(N.NAME)
          INTO V_NEXT_TRANSACT_NODE_ID, V_NEXT_TRANSACT_NODE_NAME
          FROM SYS_ACTIVITY_NODE A, SYS_NODE N
         WHERE A.ID = V_NODE_ID
           AND A.DISAGREE_NODE_ID = N.ID;
        --如果为空,默认退回到上一环节
        IF V_NEXT_TRANSACT_NODE_ID IS NULL THEN
          --查找上一环节ID、名称
          SELECT NODE_ID
            INTO V_NEXT_TRANSACT_NODE_ID
            FROM (SELECT T.NODE_ID
                    FROM SYS_NODE_INSTANCE T
                   WHERE T.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                     AND T.ID IN
                         (SELECT TI.NODE_INSTANCE_ID
                            FROM SYS_TASK_INSTANCE TI
                           WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                             AND TI.STATUS = '2'
                             AND TI.ACTION = '3'
                             AND TI.IS_FINISH = '1'
                             AND TI.SFYX_ST = '1')
                     AND T.NODE_ID IN
                         (SELECT R.START_NODE_ID
                            FROM SYS_ROUTER R
                           START WITH R.END_NODE_ID = V_NODE_ID
                          CONNECT BY NOCYCLE
                           PRIOR R.START_NODE_ID = R.END_NODE_ID
                                 AND R.SFYX_ST = '1')
                     AND T.NODE_ID <> V_NODE_ID
                     AND T.SFYX_ST = '1'
                   ORDER BY T.ID DESC)
           WHERE ROWNUM = 1;
        END IF;
        SELECT N.NAME
          INTO V_NEXT_TRANSACT_NODE_NAME
          FROM SYS_NODE N
         WHERE N.ID = V_NEXT_TRANSACT_NODE_ID
           AND N.SFYX_ST = V_VALID;
        --清空临时表数据
        DELETE FROM TEMP_CONDUCT;
        --查出最大的退回至环节ID对应任务的办理人
        INSERT INTO TEMP_CONDUCT
          (USER_ID)
          SELECT T.USER_ID
            FROM SYS_TASK_INSTANCE T
           WHERE T.NODE_INSTANCE_ID IN
                 (SELECT MAX(ID)
                    FROM SYS_NODE_INSTANCE NI
                   WHERE NI.NODE_ID = V_NEXT_TRANSACT_NODE_ID
                     AND NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                     AND NI.SFYX_ST = V_VALID)
             AND T.SFYX_ST = V_VALID;
      END IF;
    END IF;
    --非分支、聚合时的情况，加入考虑委办的情况，从委办临时表中获取数据
    --查找上一环节的环节类型
    SELECT TO_CHAR(MIN(N.TYPE))
      INTO V_S_NODE_TYPE
      FROM SYS_NODE N, SYS_ROUTER R
     WHERE R.START_NODE_ID = N.ID
       AND R.END_NODE_ID = V_NEXT_TRANSACT_NODE_ID
       AND N.SFYX_ST = V_VALID
       AND R.SFYX_ST = V_VALID;
    --清除委办人员临时表
    DELETE FROM TEMP_CONDUCT_WB;
    --上一环节若不是开始环节则进行委办
    IF V_S_NODE_TYPE <> '0' THEN
      --往委办人员临时表中插入数据
      INSERT INTO TEMP_CONDUCT_WB
        (USER_ID, WB_USER_ID, IS_WB)
        SELECT DISTINCT C.USER_ID,
                        E.ENTRUST_USER_ID,
                        DECODE(E.ID, NULL, '0', '1')
          FROM TEMP_CONDUCT C
          LEFT JOIN SYS_ENTRUST E
            ON C.USER_ID = E.USER_ID
           AND (TRUNC(SYSDATE) BETWEEN TRUNC(E.START_DATE) AND
               TRUNC(E.END_DATE))
           AND INSTR(',' || E.WORKFLOW_ID || ',', ',' || V_WF_ID || ',') > 0
           AND E.SFYX_ST = V_VALID;
      --第一个提交环节不允许委办
    ELSE
      INSERT INTO TEMP_CONDUCT_WB
        (USER_ID, WB_USER_ID, IS_WB)
        SELECT C.USER_ID, NULL, '0' FROM TEMP_CONDUCT C;
    END IF;
    --根据人员ID把人员姓名和所在的组织名称返回到列表中
    OPEN OUT_CUR FOR
      SELECT DISTINCT S.USER_NAME,
                      O.ORGAN_NAME,
                      V_NEXT_TRANSACT_NODE_NAME NEXT_NODE_NAME
        FROM TEMP_CONDUCT_WB T
       INNER JOIN SYS_USER S
          ON T.USER_ID = S.ID
        LEFT JOIN SYS_ORGAN O
          ON S.DEFAULT_ORGAN_ID = O.ID
       WHERE T.IS_WB = '0'
      UNION ALL
      SELECT DISTINCT S.USER_NAME,
                      O.ORGAN_NAME,
                      V_NEXT_TRANSACT_NODE_NAME NEXT_NODE_NAME
        FROM TEMP_CONDUCT_WB T
       INNER JOIN SYS_USER S
          ON T.WB_USER_ID = S.ID
        LEFT JOIN SYS_ORGAN O
          ON S.DEFAULT_ORGAN_ID = O.ID
       WHERE T.IS_WB = '1';
    OUT_STR := '取出成功' || ',' || V_NEXT_TRANSACT_NODE_NAME;
  EXCEPTION
    WHEN ERR_NEXT_NODE_USER_ORG THEN
      CASE EXP_TYPE
        WHEN 2 THEN
          OUT_STR := '取出成功';
        WHEN 1 THEN
          OUT_STR := '下一环节是结束环节';
      END CASE;
    WHEN OTHERS THEN
      OUT_STR   := '取出失败';
      OUT_ERROR := OUT_STR || SQLERRM;
      ROLLBACK;
  END P_WF_NEXT_NODE_USER_ORG;

  --批量办理、一键办理程序，返回办理成功数量和办理失败数量和未办理数量 LB
  PROCEDURE P_WORKFLOW_BATCH_HANDLE(IN_WF_INS_IDS VARCHAR2, --流程实例IDS,多个用逗号拼接
                                    IN_USERID     NUMBER, --用户ID
                                    IN_BLYJ       VARCHAR2, --办理意见
                                    IN_FLAG       VARCHAR2, --同意，不同意标志位，0：不同意 1：同意
                                    OUT_STR       OUT VARCHAR2, --执行结果
                                    OUT_ERROR     OUT VARCHAR2) --返回程序执行情况
   AS
    V_WF_INS_IDS VARCHAR2(4000); --流程实例IDS,多个用逗号拼接
    V_ZS         NUMBER; --总任务数
    V_XYBLSL     NUMBER; --需要办理的数量
    V_BLCGSL     NUMBER := 0; --办理成功数量
    V_BLSBSL     NUMBER := 0; --办理失败数量
    V_WBLSL      NUMBER; --未办理数量
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --如果流程实例IDS是空的话说明是一键办理，查找出需要办理的流程实例IDS
    IF IN_WF_INS_IDS IS NULL THEN
      SELECT WM_CONCAT(WI.ID)
        INTO V_WF_INS_IDS　
        FROM SYS_WORKFLOW_INSTANCE WI, SYS_TASK_INSTANCE TI
       WHERE WI.ID = TI.WORKFLOW_INSTANCE_ID
         AND TI.USER_ID = IN_USERID
         AND TI.IS_FINISH = '0'
         AND WI.SFYX_ST = V_VALID
         AND TI.SFYX_ST = V_VALID;
    ELSE
      V_WF_INS_IDS := IN_WF_INS_IDS;
    END IF;
    --查找总任务数
    SELECT LENGTH(REGEXP_REPLACE(V_WF_INS_IDS || ',', '[^,]+', ''))
      INTO V_ZS
      FROM DUAL;
    --查找需要办理的任务数量
    SELECT COUNT(1)
      INTO V_XYBLSL
      FROM SYS_TASK_INSTANCE
     WHERE WORKFLOW_INSTANCE_ID IN
           (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(V_WF_INS_IDS, ',')))
       AND SFYX_ST = V_VALID
       AND IS_FINISH = '0'
       AND USER_ID = IN_USERID;
    --获取未办理的数量
    V_WBLSL := V_ZS - V_XYBLSL;
    --对需要办理的任务进行循环处理
    FOR I IN (SELECT ID TASK_INS_ID
                FROM SYS_TASK_INSTANCE
               WHERE WORKFLOW_INSTANCE_ID IN
                     (SELECT COLUMN_VALUE
                        FROM TABLE(SPLITSTR(V_WF_INS_IDS, ',')))
                 AND SFYX_ST = V_VALID
                 AND IS_FINISH = '0'
                 AND USER_ID = IN_USERID) LOOP
      --调用任务提交的程序
      PKG_TASK.P_TASK_SUBMIT(I.TASK_INS_ID,
                             NULL,
                             NULL,
                             IN_BLYJ,
                             NULL,
                             IN_FLAG,
                             NULL,
                             OUT_STR,
                             OUT_ERROR);
      --更新任务表单意见
      UPDATE SYS_TASK_PAGE_INSTANCE TPI
         SET TPI.TASK_PAGE_OPINION = IN_BLYJ
       WHERE TPI.TASK_INSTANCE_ID = I.TASK_INS_ID
         AND TPI.SFYX_ST = V_VALID;
      --如果任务提交成功则办理成功数量+1，如果任务提交失败则办理失败数量+1
      IF OUT_ERROR = 'SUCCESS' THEN
        V_BLCGSL := V_BLCGSL + 1;
      ELSE
        V_BLSBSL := V_BLSBSL + 1;
      END IF;
    END LOOP;
    OUT_STR := '总任务数:' || V_ZS || '</br>办理成功任务数:' || V_BLCGSL ||
               '</br>办理失败任务数:' || V_BLSBSL || '</br>未办理任务数:' || V_WBLSL;
    --异常部分
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      OUT_STR   := '批量办理失败 ';
      OUT_ERROR := OUT_STR || SQLERRM;
  END P_WORKFLOW_BATCH_HANDLE;

  --流程特送退回 LB
  PROCEDURE P_WORKFLOW_SPECIAL_BACK(IN_INS_NODE_ID     NUMBER, --当前环节实例ID
                                    IN_SPECIAL_NODE_ID NUMBER, --特送退回环节ID
                                    IN_OPINION         VARCHAR2, --退回意见
                                    IN_FJ_ID           VARCHAR2, --附件ID
                                    OUT_STR            OUT VARCHAR2, --返回的不能实例化的业务原因
                                    OUT_ERROR          OUT VARCHAR2) --返回程序执行情况
   IS
    V_INS_WF_ID NUMBER; --流程实例ID
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --当前环节实例所在的流程实例
    SELECT N.WORKFLOW_INSTANCE_ID
      INTO V_INS_WF_ID
      FROM SYS_NODE_INSTANCE N
     WHERE N.ID = IN_INS_NODE_ID
       AND N.SFYX_ST = V_VALID;
    --更改当前流程实例下的未完成环节实例状态为完成
    UPDATE SYS_NODE_INSTANCE T
       SET T.STATUS = '2', T.FINISH_DATE = SYSDATE
     WHERE T.STATUS <> '2'
       AND T.WORKFLOW_INSTANCE_ID = V_INS_WF_ID
       AND T.SFYX_ST = V_VALID;
    --更改当前流程实例下未完成任务实例状态为完成，动作为无动作
    UPDATE SYS_TASK_INSTANCE T
       SET T.STATUS      = '2',
           T.ACTION      = '0',
           T.FINISH_DATE = SYSDATE,
           T.IS_FINISH   = '1',
           T.FJ_ID       = IN_FJ_ID
     WHERE T.STATUS IN ('1', '0')
       AND T.WORKFLOW_INSTANCE_ID = V_INS_WF_ID
       AND T.SFYX_ST = V_VALID;
    --实例化特送的办理环节
    PKG_WF.P_WORKFLOW_INSTANCE_NODE(IN_SPECIAL_NODE_ID,
                                    NULL,
                                    V_INS_WF_ID,
                                    V_ACTION_TSBACK,
                                    OUT_STR,
                                    OUT_ERROR);
    UPDATE SYS_TASK_INSTANCE T
       SET T.OPINION = IN_OPINION
     WHERE T.NODE_INSTANCE_ID = IN_INS_NODE_ID
       AND T.SFYX_ST = V_VALID;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_STR   := '流程特送退回失败 ';
      OUT_ERROR := OUT_STR || SQLERRM;
  END P_WORKFLOW_SPECIAL_BACK;

  --流程变量初始化 wcy 2017.4
  PROCEDURE P_WORKFLOW_VARIABLE_INSTANCE(IN_WORKFLOW_ID     NUMBER, --流程ID
                                         IN_WORKFLOW_INS_ID NUMBER) --流程实例ID
   AS
  BEGIN
    INSERT INTO SYS_WORKFLOW_VARIABLE_INSTANCE
      (ID, WORKFLOW_INSTANCE_ID, VARIABLE_ID, VALUE, CJSJ, SFYX_ST)
      SELECT SEQ_SYS_WORKFLOW_VARIABLE_INST.NEXTVAL,
             IN_WORKFLOW_INS_ID,
             WV.ID,
             WV.INITIAL_VALUE,
             SYSDATE,
             V_VALID
        FROM SYS_WORKFLOW_VARIABLE WV
       WHERE WV.WORKFLOW_ID = IN_WORKFLOW_ID
         AND WV.SFYX_ST = V_VALID;
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
  END P_WORKFLOW_VARIABLE_INSTANCE;

  --完成工作流 wcy 2017.8
  PROCEDURE P_WORKFLOW_FINISH(DATA_ID   INTEGER, --业务数据ID
                              WF_CODE   VARCHAR2, --流程编码
                              OUT_ERROR OUT VARCHAR2) --程序运行结构
   AS
    V_WF_INS_ID INTEGER;
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --查找流程实例ID
    SELECT MAX(WI.ID)
      INTO V_WF_INS_ID
      FROM SYS_WORKFLOW W, SYS_WORKFLOW_INSTANCE WI
     WHERE W.ID = WI.WORKFLOW_ID
       AND W.CODE = WF_CODE
       AND WI.DATA_ID = DATA_ID
       AND W.SFYX_ST = V_VALID
       AND WI.SFYX_ST = V_VALID;
    --将未完成流程实例状态设为完成
    UPDATE SYS_WORKFLOW_INSTANCE WI
       SET WI.STATUS = '0', WI.FINISH_DATE = SYSDATE
     WHERE WI.ID = V_WF_INS_ID
       AND WI.STATUS <> '0'
       AND WI.SFYX_ST = V_VALID;
    --将流程实例下所有运行环节实例状态设为完成
    UPDATE SYS_NODE_INSTANCE NI
       SET NI.STATUS = '2', NI.FINISH_DATE = SYSDATE
     WHERE NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND NI.STATUS = '1'
       AND NI.SFYX_ST = V_VALID;
    --将未完成任务状态设为完成
    UPDATE SYS_TASK_INSTANCE TI
       SET TI.STATUS      = '2',
           TI.ACTION      = '1',
           TI.IS_FINISH   = '1',
           TI.FINISH_DATE = SYSDATE
     WHERE TI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND TI.IS_FINISH = '0'
       AND TI.SFYX_ST = V_VALID;
    --将业务流程中间表状态设为完成，待办人置为空
    UPDATE SYS_GLB_BIZ_WF GBW
       SET GBW.STATUS = '0', GBW.TODO_USERS = NULL
     WHERE GBW.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
       AND GBW.SFYX_ST = V_VALID;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_WORKFLOW_FINISH;

  --更新流程变量实例
  --创建人：wcy
  --创建时间：2018.1.3
  PROCEDURE P_INIT_WF_VARIABLE(IN_TASK_ID INTEGER, --任务ID
                               IN_WF_VARS VARCHAR2, --流程变量及值
                               OUT_ERROR  OUT VARCHAR2) --程序运行结果
   AS
    V_CT        NUMBER; --数量
    V_WF_ID     INTEGER; --流程ID
    V_WF_INS_ID INTEGER; --流程实例ID
    V_VAR_ID    INTEGER; --流程变量ID
    V_KEY       VARCHAR2(100); --流程变量名
    V_VALUE     VARCHAR2(100); --流程变量值
    ERR_NUM EXCEPTION; --自定义异常
    ERR_VAR EXCEPTION; --自定义异常
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    IF IN_WF_VARS IS NOT NULL THEN
      --根据任务ID查找流程实例ID
      SELECT TI.WORKFLOW_INSTANCE_ID, WI.WORKFLOW_ID
        INTO V_WF_INS_ID, V_WF_ID
        FROM SYS_TASK_INSTANCE TI, SYS_WORKFLOW_INSTANCE WI
       WHERE TI.ID = IN_TASK_ID
         AND TI.WORKFLOW_INSTANCE_ID = WI.ID
         AND WI.SFYX_ST = V_VALID
         AND TI.SFYX_ST = V_VALID;
      --循环更新每个流程变量
      FOR K IN (SELECT COLUMN_VALUE FROM TABLE(SPLITSTR(IN_WF_VARS, ','))) LOOP
        V_KEY   := SUBSTR(K.COLUMN_VALUE, 1, INSTR(K.COLUMN_VALUE, ':') - 1);
        V_VALUE := SUBSTR(K.COLUMN_VALUE, INSTR(K.COLUMN_VALUE, ':') + 1);
        --根据流程ID 变量名查找变量ID
        SELECT MAX(WV.ID)
          INTO V_VAR_ID
          FROM SYS_WORKFLOW_VARIABLE WV
         WHERE WV.WORKFLOW_ID = V_WF_ID
           AND WV.NAME = V_KEY
           AND WV.SFYX_ST = V_VALID;
        IF V_VAR_ID IS NULL THEN
          RAISE ERR_VAR;
        END IF;
        --根据流程实例ID 变量ID查找流程变量实例
        SELECT COUNT(1)
          INTO V_CT
          FROM SYS_WORKFLOW_VARIABLE_INSTANCE WVI
         WHERE WVI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
           AND WVI.VARIABLE_ID = V_VAR_ID
           AND WVI.SFYX_ST = V_VALID;
        --当不存在时，插入流程变量实例
        IF V_CT = 0 THEN
          INSERT INTO SYS_WORKFLOW_VARIABLE_INSTANCE
            (ID, WORKFLOW_INSTANCE_ID, VARIABLE_ID, VALUE, CJSJ, SFYX_ST)
          VALUES
            (SEQ_SYS_WORKFLOW_VARIABLE_INST.NEXTVAL,
             V_WF_INS_ID,
             V_VAR_ID,
             V_VALUE,
             SYSDATE,
             V_VALID);
          --当存在时，更新流程变量实例
        ELSIF V_CT = 1 THEN
          UPDATE SYS_WORKFLOW_VARIABLE_INSTANCE WVI
             SET WVI.VALUE = V_VALUE
           WHERE WVI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
             AND WVI.VARIABLE_ID = V_VAR_ID
             AND WVI.SFYX_ST = V_VALID;
          --当数量大于1时，抛出异常信息
        ELSE
          RAISE ERR_NUM;
        END IF;
      END LOOP;
    END IF;
    --异常处理
  EXCEPTION
    WHEN ERR_VAR THEN
      OUT_ERROR := '流程中未配置该变量';
      ROLLBACK;
    WHEN ERR_NUM THEN
      OUT_ERROR := '流程变量实例数量异常';
      ROLLBACK;
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_INIT_WF_VARIABLE;

  --功能：获取前面各环节及办理人(监督项目时增加)
  --创建人：wcy
  --创建时间：2018.1
  PROCEDURE P_GET_BLR(IN_TASK_ID INTEGER, --任务ID
                      OUT_CUR    OUT MYCURSOR, --返回信息
                      OUT_ERROR  OUT VARCHAR2) --运行结果
   AS
    V_WF_INS_ID   INTEGER;
    V_NODE_INS_ID INTEGER;
    V_NODE_ID     INTEGER;
  BEGIN
    OUT_ERROR := V_SUCCESS_FLAG;
    --查找流程实例ID、环节实例ID、环节ID
    SELECT TI.WORKFLOW_INSTANCE_ID, TI.NODE_INSTANCE_ID, NI.NODE_ID
      INTO V_WF_INS_ID, V_NODE_INS_ID, V_NODE_ID
      FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE NI, SYS_NODE N
     WHERE TI.ID = IN_TASK_ID
       AND TI.NODE_INSTANCE_ID = NI.ID
       AND NI.NODE_ID = N.ID
       AND TI.SFYX_ST = V_VALID;
    --打开光标
    OPEN OUT_CUR FOR
      SELECT T.ID, T.NAME, T.SORT, WM_CONCAT(TI.USER_ID)
        FROM (SELECT N.ID, N.NAME, N.SORT, MAX(NI.ID) NODE_INS_ID
                FROM SYS_NODE_INSTANCE NI, SYS_NODE N
               WHERE NI.NODE_ID = N.ID
                 AND N.ID IN
                     (SELECT DISTINCT R.START_NODE_ID
                        FROM SYS_ROUTER R
                       START WITH R.END_NODE_ID = V_NODE_ID
                      CONNECT BY NOCYCLE PRIOR R.START_NODE_ID = R.END_NODE_ID
                             AND R.SFYX_ST = V_VALID)
                 AND NI.WORKFLOW_INSTANCE_ID = V_WF_INS_ID
                 AND NI.STATUS = '2'
               GROUP BY N.ID, N.NAME, N.SORT) T,
             SYS_TASK_INSTANCE TI
       WHERE T.NODE_INS_ID = TI.NODE_INSTANCE_ID
         AND TI.SFYX_ST = V_VALID
       GROUP BY T.ID, T.NAME, T.SORT;
    --异常处理
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
  END P_GET_BLR;

  --功能：根据角色获取环节办理人，并插入临时表
  --创建人：wcy
  --创建时间：2018.4
  --修改人：wy
  --修改时间：2018.11
  PROCEDURE P_GET_BLR_BY_ROLE(IN_WF_INS_ID INTEGER, --流程实例ID
                              IN_NODE_ID   INTEGER, --环节ID
                              IN_TYPE      CHAR) --1插入临时表TEMP_CONDUCT 2插入临时表TEMP_NODE_USER
   AS
  BEGIN
    PKG_WF_DAMIC_USER.P_WF_DEFAULT_TRANSACTOR(IN_WF_INS_ID,
                                              IN_NODE_ID,
                                              null);
    IF IN_TYPE = '1' THEN
      INSERT INTO TEMP_CONDUCT
        (USER_ID)
        SELECT USER_ID FROM TEMP_USER;
    ELSIF IN_TYPE = '2' THEN
      INSERT INTO TEMP_NODE_USER
        (USER_ID, NODE_ID)
        SELECT USER_ID, IN_NODE_ID FROM TEMP_USER;
    END IF;
  END P_GET_BLR_BY_ROLE;

  --功能：计算工作流最新版本
  --创建人：dmx
  --创建时间：2018.9.7
  PROCEDURE P_CALC_LATEST_VERSION(OUT_STR   OUT VARCHAR2, --执行结果
                                  OUT_ERROR OUT VARCHAR2) --返回程序执行情况
   AS
  BEGIN
    OUT_STR := V_SUCCESS_FLAG;
    UPDATE SYS_WORKFLOW S SET S.ISLATESTVERSION = '0';
    UPDATE SYS_WORKFLOW S
       SET S.ISLATESTVERSION = '1'
     WHERE S.SFYX_ST = '1'
       AND (S.CODE, S.VERSION) IN (SELECT W.CODE, MAX(W.VERSION)
                                     FROM SYS_WORKFLOW W
                                    WHERE W.SFYX_ST = '1'
                                    GROUP BY W.CODE);
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_CALC_LATEST_VERSION;

  --功能：拷贝节点关联对象
  --创建人：wangyang
  --创建时间：2018.9.11
  PROCEDURE P_NODE_COPY_RELATED_OBJECTS(IN_SOURCE_NODE_ID INTEGER, --源节点
                                        IN_TARGET_NODE_ID INTEGER, --目标节点
                                        IN_USER_ID        INTEGER, --操作用户ID
                                        OUT_STR           OUT VARCHAR2, --执行结果
                                        OUT_ERROR         OUT VARCHAR2) --返回程序执行情况
   AS
  BEGIN
    --拷贝表单
    INSERT INTO SYS_NODE_PAGE
      (ID,
       TITLE,
       NODE_ID,
       PAGE_ID,
       CONTROL,
       SORT,
       CJR_ID,
       CJSJ,
       SFYX_ST,
       SPX_NAME,
       SPX_SORT,
       SPX_PRINT)
      SELECT SEQ_SYS_NODE_PAGE.NEXTVAL,
             TITLE,
             IN_TARGET_NODE_ID,
             PAGE_ID,
             CONTROL,
             SORT,
             IN_USER_ID,
             SYSDATE,
             SFYX_ST,
             SPX_NAME,
             SPX_SORT,
             SPX_PRINT
        FROM SYS_NODE_PAGE T
       WHERE NODE_ID = IN_SOURCE_NODE_ID
         AND SFYX_ST = '1';

    --拷贝按钮
    INSERT INTO SYS_NODE_BUTTON
      (ID,
       NAME,
       CODE,
       ICON,
       FLAG,
       FUNCNAME,
       NODE_ID,
       SFYX_ST,
       CJSJ,
       XGSJ,
       CJR_ID,
       XGR_ID,
       SORT,
       ISSHOWINHANDLE,
       TYPE,
       OPINION)
      SELECT SEQ_SYS_NODE_BUTTON.NEXTVAL,
             NAME,
             CODE,
             ICON,
             FLAG,
             FUNCNAME,
             IN_TARGET_NODE_ID,
             SFYX_ST,
             SYSDATE,
             SYSDATE,
             IN_USER_ID,
             IN_USER_ID,
             SORT,
             ISSHOWINHANDLE,
             TYPE,
             OPINION
        FROM SYS_NODE_BUTTON T
       WHERE NODE_ID = IN_SOURCE_NODE_ID
         AND SFYX_ST = '1';

    --拷贝变量赋值
    INSERT INTO SYS_NODE_VARIABLE_ASSIGN
      (ID, VARIABLE_ID, NODE_ID, EXPRESSION, SFYX_ST)
      SELECT SEQ_SYS_NODE_VARIABLE_ASSIGN.NEXTVAL,
             VARIABLE_ID,
             IN_TARGET_NODE_ID,
             EXPRESSION,
             SFYX_ST
        FROM SYS_NODE_VARIABLE_ASSIGN T
       WHERE NODE_ID = IN_SOURCE_NODE_ID
         AND SFYX_ST = '1';
    OUT_STR   := V_SUCCESS_FLAG;
    OUT_ERROR := V_SUCCESS_FLAG;
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := SQLERRM;
      ROLLBACK;
  END P_NODE_COPY_RELATED_OBJECTS;

END PKG_WF;
/

prompt
prompt Creating package body PKG_WF_DAMIC_USER
prompt =======================================
prompt
CREATE OR REPLACE PACKAGE BODY PKG_WF_DAMIC_USER IS
  PROCEDURE P_WORKFLOW_START_USER(IN_WF_INS_ID NUMBER) ----流程实例ID
    /*--------------------------------------*/
    ---名称/功能：查找流程启动人
    ---创建人：骆斌
    ---创建时间：2016.11-29
   IS
  BEGIN
    INSERT INTO TEMP_USER
      SELECT WI.STARTUP_USER_ID
        FROM SYS_WORKFLOW_INSTANCE WI
       WHERE WI.ID = IN_WF_INS_ID
         AND WI.STARTUP_TYPE = '0'
         AND WI.SFYX_ST = '1';

  END P_WORKFLOW_START_USER;

  PROCEDURE P_WORKFLOW_START_USER_MANAGER(IN_WF_INS_ID NUMBER) IS
    V_START_USER_ID       NUMBER; -- 启动人ID
    V_START_USER_ORGAN_ID NUMBER; --启动人机构ID
  BEGIN
    SELECT U.ID, U.DEFAULT_ORGAN_ID
      INTO V_START_USER_ID, V_START_USER_ORGAN_ID
      FROM SYS_USER U, SYS_WORKFLOW_INSTANCE WI
     WHERE U.ID = WI.STARTUP_USER_ID
       AND WI.ID = IN_WF_INS_ID
       AND WI.SFYX_ST = '1'
       AND WI.STARTUP_TYPE = '0'
       AND U.SFYX_ST = '1';

    INSERT INTO TEMP_USER
      SELECT G.USER_ID
        FROM SYS_GLB_USER G
       WHERE G.ORGAN_ID = V_START_USER_ORGAN_ID
         AND G.SFYX_ST = '1'
      INTERSECT
      SELECT GR.USER_ID
        FROM SYS_GLB_ROLE_USER GR, SYS_ROLE R
       WHERE GR.ROLE_ID = R.ID
         AND R.SFYX_ST = '1'
         AND R.ROLE_CODE = 'JINGLI';

  END;

  --获取环节办理人
  --创建人：wangyang
  --创建时间：2018.11
  PROCEDURE P_WF_DEFAULT_TRANSACTOR(IN_WF_INS_ID   NUMBER,
                                    IN_NODE_ID     NUMBER,
                                    IN_PRE_TASK_ID NUMBER) IS
    V_CONFIG_TYPE     SYS_BASE_RULE.CONFIG_TYPE%TYPE; --配置方式
    V_SUBJECT         SYS_BASE_RULE.SUBJECT%TYPE; --规则主体
    V_SUBJECT_USERID  INTEGER;
    V_RULE_RANGE      SYS_BASE_RULE.RULE_RANGE%TYPE; --规则范围
    V_INCLUDE_SUBJECT SYS_BASE_RULE.INCLUDE_SUBJECT%TYPE; --是否包含主体
    V_ORGAN_ID        INTEGER;
    V_SQL             VARCHAR2(4000);
    V_ERROR           VARCHAR2(4000);
  BEGIN
    --根据环节实例获取关联的规则与角色
    FOR C_NRR IN (SELECT NRR.RULE_ID, NRR.ROLE_IDS, NRR.NODE_ID
                    FROM SYS_NODE_RULE_ROLE NRR
                   WHERE NRR.NODE_ID = IN_NODE_ID
                     AND NRR.SFYX_ST = '1') LOOP
      --获取规则配置
      SELECT BR.CONFIG_TYPE, BR.SUBJECT, BR.RULE_RANGE, BR.INCLUDE_SUBJECT
        INTO V_CONFIG_TYPE, V_SUBJECT, V_RULE_RANGE, V_INCLUDE_SUBJECT
        FROM SYS_AUTH_RULE AR, SYS_BASE_RULE BR
       WHERE AR.ID = C_NRR.RULE_ID
         AND AR.GL_RULE_ID = BR.ID(+);
      --默认配置
      IF V_CONFIG_TYPE = '0' THEN
        --先获取主体
        IF V_SUBJECT = '0' THEN
          --流程启动人
          SELECT WI.STARTUP_USER_ID
            INTO V_SUBJECT_USERID
            FROM SYS_WORKFLOW_INSTANCE WI
           WHERE WI.ID = IN_WF_INS_ID;
        ELSIF V_SUBJECT = '1' THEN
          --上一环节办理人
          IF IN_PRE_TASK_ID IS NULL THEN
            SELECT TI.USER_ID
              INTO V_SUBJECT_USERID
              FROM SYS_TASK_INSTANCE TI, SYS_NODE_INSTANCE N
             WHERE TI.NODE_INSTANCE_ID = N.ID
               AND N.WORKFLOW_INSTANCE_ID = IN_WF_INS_ID
               AND N.SFYX_ST = '1'
               AND N.STATUS = '1';
          ELSE
            SELECT TI.USER_ID
              INTO V_SUBJECT_USERID
              FROM SYS_TASK_INSTANCE TI
             WHERE TI.ID = IN_PRE_TASK_ID;
          END IF;
        END IF;

        IF V_SUBJECT_USERID IS NOT NULL THEN
          --主体自身
          IF V_RULE_RANGE = '0' THEN
            INSERT INTO TEMP_USER VALUES (V_SUBJECT_USERID);
          ELSE
            SELECT U.DEFAULT_ORGAN_ID
              INTO V_ORGAN_ID
              FROM SYS_USER U
             WHERE U.ID = V_SUBJECT_USERID;
            --根据配置拼接SQL
            V_SQL := 'INSERT INTO TEMP_USER SELECT SU.ID
          FROM SYS_USER SU WHERE SU.SFYX_ST <> ''0''';
            --判断规则范围
            IF V_RULE_RANGE = '1' THEN
              --本层级
              V_SQL := V_SQL || ' AND SU.DEFAULT_ORGAN_ID =:ORGAN ';
            ELSIF V_RULE_RANGE = '2' THEN
              --父层级
              V_SQL := V_SQL ||
                       ' AND SU.DEFAULT_ORGAN_ID=(SELECT O.PARENT_ORG FROM SYS_ORGAN O WHERE O.ID=:ORGAN) ';
            ELSIF V_RULE_RANGE = '3' THEN
              --直接下级
              V_SQL := V_SQL ||
                       ' AND SU.DEFAULT_ORGAN_ID in (SELECT O.ID FROM SYS_ORGAN O WHERE O.PARENT_ORG=:ORGAN)';
            END IF;
            --限定角色
            IF C_NRR.ROLE_IDS IS NOT NULL THEN
              V_SQL := V_SQL ||
                       ' AND SU.ID in (SELECT G.USER_ID FROM SYS_GLB_ROLE_USER G WHERE G.ROLE_ID IN (' ||
                       C_NRR.ROLE_IDS || '))';
            END IF;
          END IF;
          EXECUTE IMMEDIATE V_SQL
            USING V_ORGAN_ID;
        END IF;
      END IF;
    END LOOP;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      V_ERROR := '找不到办理角色或者上一环节办理人所属机构: ' || SQLERRM;
  END;

  PROCEDURE P_WORKFLOW_DAMIC_USER_YZ(IN_WORKFLOW_CODE VARCHAR2, --流程代码
                                     IN_DATA_ID       NUMBER, --业务数据ID
                                     OUT_STR          OUT VARCHAR2, --返回信息
                                     OUT_ERROR        OUT VARCHAR2) --返回程序执行情况
    /*--------------------------------------*/
    ---名称/功能：验证工作流中sql维护的动态角色是否都能找到办理人
    /*--------------------------------------*/
   IS
    V_WORKFLOW_ID NUMBER; --流程ID
    V_CT          NUMBER; --计数
    V_ROLE_SQL    VARCHAR2(4000); --执行的动态SQL
  BEGIN
    OUT_ERROR := 'SUCCESS';
    --找出流程ID
    SELECT MAX(ID)
      INTO V_WORKFLOW_ID
      FROM SYS_WORKFLOW
     WHERE CODE = IN_WORKFLOW_CODE
       AND SFYX_ST = '1';
    --查出该工作流是否维护了SQL规则的动态角色
    SELECT COUNT(1)
      INTO V_CT
      FROM SYS_NODE              N,
           SYS_TRANSACT_NODE     TN,
           SYS_ROLE              R,
           SYS_GLB_ROLE_AUTHRULE T,
           SYS_AUTH_RULE         A,
           SYS_BASE_RULE         B
     WHERE N.WORKFLOW_ID = V_WORKFLOW_ID
       AND N.ID = TN.ID
       AND TN.ROLE_ID = R.ID
       AND T.ROLE_ID = R.ID
       AND T.RULE_ID = A.ID
       AND A.GL_RULE_ID = B.ID
       AND N.SFYX_ST = '1'
       AND R.SFYX_ST = '1'
       AND T.SFYX_ST = '1'
       AND A.SFYX_ST = '1'
       AND B.SFYX_ST = '1'
       AND B.SXFS = '1';
    --如果没有维护SQL规则的动态角色则返回无，如果有维护的话则查找是否有办理人
    IF V_CT = 0 THEN
      OUT_STR := '无';
    ELSE
      OUT_STR := '有';
      --找出所有的规则并对规则是否查出办理人进行判断
      FOR I IN (SELECT B.RULE_DETAIL, R.ROLE_NAME
                  FROM SYS_NODE              N,
                       SYS_TRANSACT_NODE     TN,
                       SYS_ROLE              R,
                       SYS_GLB_ROLE_AUTHRULE T,
                       SYS_AUTH_RULE         A,
                       SYS_BASE_RULE         B
                 WHERE N.WORKFLOW_ID = V_WORKFLOW_ID
                   AND N.ID = TN.ID
                   AND TN.ROLE_ID = R.ID
                   AND T.ROLE_ID = R.ID
                   AND T.RULE_ID = A.ID
                   AND A.GL_RULE_ID = B.ID
                   AND N.SFYX_ST = '1'
                   AND R.SFYX_ST = '1'
                   AND T.SFYX_ST = '1'
                   AND A.SFYX_ST = '1'
                   AND B.SFYX_ST = '1'
                   AND B.SXFS = '1') LOOP
        V_ROLE_SQL := REPLACE(UPPER(I.RULE_DETAIL), ':DATA_ID', IN_DATA_ID);
        V_ROLE_SQL := REPLACE(V_ROLE_SQL, '<BR>', ' ');
        V_ROLE_SQL := 'SELECT COUNT(1) FROM ( ' || V_ROLE_SQL || ')';
        EXECUTE IMMEDIATE V_ROLE_SQL
          INTO V_CT;
        IF V_CT = 0 THEN
          OUT_STR := OUT_STR || ',' || I.ROLE_NAME || '未找到相关人员';
        END IF;
      END LOOP;
    END IF;
    IF OUT_STR <> '有' AND OUT_STR <> '无' THEN
      OUT_STR := OUT_STR || ',' || '请维护好相关人员后再发起流程';
    END IF;
    --异常处理
  EXCEPTION
    WHEN OTHERS THEN
      OUT_ERROR := '验证sql维护的动态角色时发生异常: ' || SQLERRM;
      ROLLBACK;
  END P_WORKFLOW_DAMIC_USER_YZ;

END PKG_WF_DAMIC_USER;
/


spool off

--generate sequence
exec usp_seq_create;
--recompile package and body
exec pkg_util.p_recompile_invalid;
