package net.ruixin.util.data;

public class FileInfo {

    /**
     * 文件类型
     */
    String type;

    /**
     * 文件扩展名
     */
    String ext;

    /**
     * 文件全名，包含扩展名
     */
    String fullName;

    /**
     * 文件名，不包含扩展名
     */
    String simpleName;

    /**
     * 文件大小
     */
    long fileSize;

    /**
     * 文件系统保存路径
     */
    String absolutePath;

    /**
     * 缩略图路径
     */
    String thAbsolutePath;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getSimpleName() {
        return simpleName;
    }

    public void setSimpleName(String simpleName) {
        this.simpleName = simpleName;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

    public void setAbsolutePath(String absolutePath) {
        this.absolutePath = absolutePath;
    }

    public String getThAbsolutePath() {
        return thAbsolutePath;
    }

    public void setThAbsolutePath(String thAbsolutePath) {
        this.thAbsolutePath = thAbsolutePath;
    }

    public FileInfo(String type, String ext, String fullName, String simpleName, long fileSize, String absolutePath, String thAbsolutePath) {
        this.type = type;
        this.ext = ext;
        this.fullName = fullName;
        this.simpleName = simpleName;
        this.fileSize = fileSize;
        this.absolutePath = absolutePath;
        this.thAbsolutePath = thAbsolutePath;
    }
}
