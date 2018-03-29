package cn.yutang.backend.pojo.util;

import cn.yutang.backend.pojo.po.DinnerTable;
import cn.yutang.commons.converter.IDUtils;
import cn.yutang.commons.converter.MatrixToImageWriter;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.*;

public class QrFtpUtils {

    public  static String qrFtpUpload(DinnerTable dinnerTable, String realPath ) throws IOException {
        //创建FTPClient客户端
        FTPClient ftpClient = new FTPClient();
        //创建FTP连接
        ftpClient.setControlEncoding("UTF-8");
        ftpClient.connect("www.yummm.cn",21);
        //登录
        ftpClient.login("ftpuser","yup123yup");
        //读取本地文件
        String id= IDUtils.genImageName();
        String path=realPath+id+".png";
        String content="http://106.15.95.200/{"+dinnerTable.getTbId()+"}";
        MatrixToImageWriter.encode(content,512,512,realPath+"logo.png",realPath,path);
        FileInputStream fileInputStream = new FileInputStream(new File(path));
        //配置上传参数
        ftpClient.changeWorkingDirectory("/home/ftpuser/www/img");
        ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
        String filename=id+".png";
        //上传文件
        ftpClient.storeFile(filename,fileInputStream);
//        关闭连接
        fileInputStream.close();
        ftpClient.logout();
        return filename;
    }

    /**
     * Description: 从FTP服务器下载文件
     * @paramFTP服务器上的相对路径
     * @param要下载的文件名
     * @param下载后保存到本地的路径
     * @return
     */
    /*public static boolean qrFtpDownload(DinnerTable dinnerTable) {
        String remotePath="http://www.yummm.cn/img/";
        String fileName=dinnerTable.getTbQrcode();
        fileName= fileName.replaceAll(remotePath, "");
        String localPath="C:\\Users\\jinyefei\\Desktop\\";
        boolean result = false;
        //创建FTPClient客户端
        FTPClient ftpClient = new FTPClient();
        try {

            //创建FTP连接
            ftpClient.setControlEncoding("UTF-8");
            ftpClient.connect("106.15.95.200",21);
            //登录
            ftpClient.login("ftpuser","323223jyf123150hjf");
            int reply;
            reply = ftpClient.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftpClient.disconnect();
                return result;
            }
            ftpClient.changeWorkingDirectory("/home/ftpuser/www/images");// 转移到FTP服务器目录
            FTPFile[] fs = ftpClient.listFiles();
            for (FTPFile ff : fs) {
                if (ff.getName().equals(fileName)) {
                    File localFile = new File(localPath + dinnerTable.getTbName()+".png");

                    OutputStream is = new FileOutputStream(localFile);
                    ftpClient.retrieveFile(ff.getName(), is);
                    is.close();
                }
            }

            ftpClient.logout();
            result = true;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
        return result;
    }*/
}
