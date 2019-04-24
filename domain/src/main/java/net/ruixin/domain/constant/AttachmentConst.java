package net.ruixin.domain.constant;

/**
 * 附件常量实体
 *
 * @author Pitcher
 */
public interface AttachmentConst {
    /**
     * 文件保存方式
     */
    String FILE_SYSTEM = "FILE_SYSTEM"; //文件系统

    String DATA_BASE = "DATA_BASE";//数据库

    String FTP = "FTP"; //FTP服务器

    String ALL = "ALL";//都保存

    /**
     * 附件类型
     */
    String DOC = "1";
    String PIC = "2";
    String OTHER = "4";
}
