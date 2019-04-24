package net.ruixin.util.file;

import net.ruixin.util.exception.BizExceptionEnum;
import net.ruixin.util.exception.BussinessException;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;

/**
 * @Author: Pitcher
 * @Date: 2018/11/1 16:50
 * @Version 1.0
 */
public class FtpUtils {
    //ftp服务器地址
    private String hostname;
    //ftp服务器端口号默认为21
    private Integer port;
    //ftp登录账号
    private String username;
    //ftp登录密码
    private String password;

    private FTPClient ftpClient = null;

    private static final Logger log = LoggerFactory.getLogger(FtpUtils.class);

    /**
     * 初始化ftp服务器
     */
    private void initFtpClient() {
        ftpClient = new FTPClient();
        try {
            ftpClient.connect(hostname, port); //连接ftp服务器
            ftpClient.login(username, password); //登录ftp服务器
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);  //二进制(图片等格式的文件必须以二进制传输)
            ftpClient.setControlEncoding("GBK");
            ftpClient.enterLocalPassiveMode();
            int replyCode = ftpClient.getReplyCode(); //是否成功登录服务器
            if (!FTPReply.isPositiveCompletion(replyCode)) {
                throw new BussinessException(BizExceptionEnum.FTP_CONNECT);
            }
        } catch (IOException e) {
            log.error("连接服务器失败");
        }
    }

    /**
     * 上传文件
     *
     * @param pathname       ftp服务保存地址
     * @param fileName       上传到ftp的文件名
     * @param originFilename 待上传文件的名称（绝对地址） *
     * @return
     */
    private boolean uploadFile(String pathname, String fileName, String originFilename) {
        boolean flag = false;
        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(new File(originFilename));
            initFtpClient();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            CreateDirecroty(pathname);
            ftpClient.makeDirectory(pathname);
            ftpClient.changeWorkingDirectory(pathname);
            ftpClient.storeFile(fileName, inputStream);
            inputStream.close();
            ftpClient.logout();
            flag = true;
        } catch (Exception e) {
            log.error("文件上传失败");
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    log.error("ftp关闭异常");
                }
            }
            if (null != inputStream) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    log.error("流关闭异常");
                }
            }
        }
        return flag;
    }

    /**
     * 上传文件
     *
     * @param pathname    ftp服务保存地址
     * @param fileName    上传到ftp的文件名
     * @param inputStream 输入文件流
     * @return
     */
    public boolean uploadFile(String pathname, String fileName, InputStream inputStream) {
        boolean flag = false;
        try {
            initFtpClient();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            CreateDirecroty(pathname);
            ftpClient.makeDirectory(pathname);
            ftpClient.changeWorkingDirectory(pathname);
            ftpClient.storeFile(fileName, inputStream);
            inputStream.close();
            ftpClient.logout();
            flag = true;
        } catch (Exception e) {
            log.error("ftp文件上传失败");
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    log.error("ftp关闭失败");
                }
            }
            if (null != inputStream) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    log.error("流关闭失败");
                }
            }
        }
        return flag;
    }

    //改变目录路径
    public boolean changeWorkingDirectory(String directory) {
        boolean flag = true;
        try {
            flag = ftpClient.changeWorkingDirectory(directory);
            if (flag) {

                log.info("进入文件夹" + directory + " 成功！");

            } else {
                log.info("进入文件夹" + directory + " 失败！开始创建文件夹");
            }
        } catch (IOException ioe) {
            log.error("改变目录路径失败");
        }
        return flag;
    }

    //创建多层目录文件，如果有ftp服务器已存在该文件，则不创建，如果无，则创建
    private void CreateDirecroty(String remote) throws IOException {
        String directory = remote + "/";
        // 如果远程目录不存在，则递归创建远程服务器目录
        if (!directory.equalsIgnoreCase("/") && !changeWorkingDirectory(new String(directory))) {
            int start = 0;
            int end = 0;
            if (directory.startsWith("/")) {
                start = 1;
            } else {
                start = 0;
            }
            end = directory.indexOf("/", start);
            String path = "";
            String paths = "";
            while (true) {
                String subDirectory = new String(remote.substring(start, end).getBytes("GBK"), "iso-8859-1");
                path = path + "/" + subDirectory;
                if (!existFile(path)) {
                    if (makeDirectory(subDirectory)) {
                        changeWorkingDirectory(subDirectory);
                    } else {
                        changeWorkingDirectory(subDirectory);
                        throw new BussinessException(BizExceptionEnum.DIR_CREATE_ERROR);
                    }
                } else {
                    changeWorkingDirectory(subDirectory);
                }

                paths = paths + "/" + subDirectory;
                start = end + 1;
                end = directory.indexOf("/", start);
                // 检查所有目录是否创建完毕
                if (end <= start) {
                    break;
                }
            }
        }
    }

    //判断ftp服务器文件是否存在
    private boolean existFile(String path) throws IOException {
        boolean flag = false;
        FTPFile[] ftpFileArr = ftpClient.listFiles(path);
        if (ftpFileArr.length > 0) {
            flag = true;
        }
        return flag;
    }

    //创建目录
    private boolean makeDirectory(String dir) {
        boolean flag = true;
        try {
            flag = ftpClient.makeDirectory(dir);
            if (flag) {
                log.info("创建文件夹" + dir + " 成功！");
            } else {
                throw new BussinessException(BizExceptionEnum.DIR_CREATE_ERROR);
            }
        } catch (Exception e) {
            log.error("创建文件夹" + dir + " 失败！", e);
        }
        return flag;
    }

    public boolean checkFileExit(String pathname, String filename) {
        boolean flag = false;
        initFtpClient();
        //切换FTP目录
        try {
            ftpClient.changeWorkingDirectory(pathname);
            FTPFile[] ftpFiles = ftpClient.listFiles();
            for (FTPFile file : ftpFiles) {
                if (filename.equalsIgnoreCase(file.getName())) {
                    flag = true;
                }
            }
            ftpClient.logout();
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return flag;
    }

    /**
     * 获取ftp文件字节
     *
     * @param pathname FTP服务器文件目录 *
     * @param filename 文件名称 *
     * @return 获取ftp文件字节
     */
    public byte[] getData(String pathname, String filename) {
        ByteArrayOutputStream baos = null;
        InputStream inputStream = null;
        try {
            initFtpClient();
            //切换FTP目录
            ftpClient.changeWorkingDirectory(pathname);
            FTPFile[] ftpFiles = ftpClient.listFiles();
            for (FTPFile file : ftpFiles) {
                if (filename.equalsIgnoreCase(file.getName())) {
                    inputStream = ftpClient.retrieveFileStream(file.getName());
                    try {
                        baos = new ByteArrayOutputStream();
                        byte[] buffer = new byte[1024];
                        int num = inputStream.read(buffer);
                        while (num != -1) {
                            baos.write(buffer, 0, num);
                            num = inputStream.read(buffer);
                        }
                        baos.flush();
                        return baos.toByteArray();
                    } finally {
                        if (inputStream != null) {
                            inputStream.close();
                        }
                        ftpClient.logout();
                    }
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    log.error(e.getMessage());
                }
            }
            if (null != inputStream) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    log.error(e.getMessage());
                }
            }
            if (null != baos) {
                try {
                    baos.close();
                } catch (IOException e) {
                    log.error(e.getMessage());
                }
            }
        }
        return null;
    }


    /**
     * 删除文件 *
     *
     * @param pathname FTP服务器保存目录 *
     * @param filename 要删除的文件名称 *
     * @return
     */
    public boolean deleteFile(String pathname, String filename) {
        boolean flag = false;
        try {
            initFtpClient();
            //切换FTP目录
            ftpClient.changeWorkingDirectory(pathname);
            ftpClient.dele(filename);
            ftpClient.logout();
            flag = true;
        } catch (Exception e) {
            log.error("删除文件失败"+e.getMessage());
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    log.error(e.getMessage());
                }
            }
        }
        return flag;
    }


    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
