package net.ruixin.util.exception;

public enum BizExceptionEnum {
    /**
     * 权限和数据问题
     */
    DB_RESOURCE_NULL(400, "数据库中没有该资源"),
    NO_PERMITION(405, "权限异常"),
    REQUEST_INVALIDATE(400, "请求数据格式不正确"),
    INVALID_KAPTCHA(400, "验证码不正确"),
    CANT_DELETE_ADMIN(600, "不能删除超级管理员"),
    CANT_FREEZE_ADMIN(600, "不能冻结超级管理员"),
    CANT_CHANGE_ADMIN(600, "不能修改超级管理员角色"),

    /**
     * 字典
     */
    DICT_EXISTED(400, "字典已经存在"),
    ERROR_CREATE_DICT(500, "创建字典失败"),
    ERROR_WRAPPER_FIELD(500, "包装字典属性失败"),

    /**
     * 其他
     */
    WRITE_ERROR(500, "渲染界面错误"),

    /**
     * 文件上传下载
     */
    File_CODING_ERROR(600, "编码错误"),
    File_DECODING_ERROR(600, "解码错误"),
    FILE_READING_ERROR(600, "文件读取错误"),
    FILE_WRITING_ERROR(600, "文件写入错误"),
    FILE_NOT_FOUND(600, "文件未找到错误"),
    FILE_DOWNLOAD_ERROR(600, "文件下载失败"),
    FILE_UPLOAD_ERROR(600, "文件上传失败"),
    FILE_MKDIRS_ERROR(600, "mkdirs()执行异常"),
    FILE_DELETE_ERROR(600, "文件删除失败"),
    FILE_ALIAS_TOOLONG(600, "文件别名过长"),
    FILE_DESCRIPTION_TOOLONG(600, "文件描述过长"),
    FILE_NULL(600, "上传文件为空"),
    FILE_FILESYS_ERROR(600, "上传至文件系统错误"),
    FILE_DBSYS_ERROR(600, "上传至数据库系统错误"),
    FILE_PATH_ERROR(600, "无效的文件路径"),
    FILE_SLT_ERROR(600, "缩略图生成异常"),
    FILE_EXCEL_ERROR(600, "上传流程excel失败"),
    FILE_CLOSE_ERROR(600, "文件流关闭失败"),

    /**
     * 目录创建失败
     */
    DIR_CREATE_ERROR(500,"创建目录失败"),

    /**
     * 错误的请求
     */
    REQUEST_NULL(400, "请求有错误"),
    SERVER_ERROR(500, "服务器异常"),

    /**
     * 构建tree错误
     */
    TREE_ERROR(500, "树构建错误"),

    /**
     * FTP连接出错
     */
    FTP_CONNECT(500, "ftp连接出错");



    private final int friendlyCode;

    private final String friendlyMsg;

    BizExceptionEnum(int friendlyCode, String friendlyMsg) {
        this.friendlyCode = friendlyCode;
        this.friendlyMsg = friendlyMsg;
    }

    public int getFriendlyCode() {
        return friendlyCode;
    }

    public String getFriendlyMsg() {
        return friendlyMsg;
    }
}
