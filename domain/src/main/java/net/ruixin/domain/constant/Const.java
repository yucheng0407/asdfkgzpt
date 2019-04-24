package net.ruixin.domain.constant;

/**
 * 系统常量
 */
public interface Const {

    /**
     * 当前项目应用code
     */
    String APP_CODE = "HTGL";

    /**
     * 系统默认的管理员密码
     */
    String DEFAULT_PWD = "111";

    /**
     * 管理员角色的名字
     */
    String ADMIN_NAME = "administrator";

    /**
     * 管理员id
     */
    Integer ADMIN_ID = 1;

    /**
     * 超级管理员角色id
     */
    Integer ADMIN_ROLE_ID = 1;

    String USER_SESSION_KEY = "shiroUser";

    String USER_LOGIN_NAME = "user_account";

    String USER_ID = "user_id";

    String USER_NAME = "userName";

    //配置级别：平台
    String CONFIG_LEVEL_PLAT = "1";

    //配置级别：应用
    String CONFIG_LEVEL_APP = "2";

    //配置类型：平台基础
    String CONFIG_TYPE_PLATBASE = "1";

    //配置类型：资源配置
    String CONFIG_TYPE_RESOURCE = "2";

    //配置类型：角色配置
    String CONFIG_TYPE_ROLE = "3";

    //配置类型：工作流配置
    String CONFIG_TYPE_WORKFLOW = "4";

    //配置类型：附件配置
    String CONFIG_TYPE_ATTACHMENT = "5";

    //配置类型：缓存配置
    String CONFIG_TYPE_CACHE = "6";

    //配置类型：应用配置1
    String CONFIG_TYPE_APPBASE1 = "11";

    //配置类型：应用配置2
    String CONFIG_TYPE_APPBASE2 = "12";

    //角色级别：平台管理员
    int ROLE_LEVEL_PLATADMIN = 1;

    //角色级别：系统管理员
    int ROLE_LEVEL_SYSADMIN = 2;

    //角色级别：系统用户
    int ROLE_LEVEL_USER = 3;

    //资源类型：应用
    String RES_TYPE_APP = "app";

    //资源类型：菜单
    String RES_TYPE_MENU = "menu";

    //资源类型：页面
    String RES_TYPE_PAGE = "page";

    //资源类型：功能
    String RES_TYPE_FUNC = "func";
}
