package cn.yutang.backend.pojo.util;

import cn.yutang.backend.pojo.po.DinnerTable;
import cn.yutang.commons.converter.IDUtils;
import cn.yutang.commons.converter.QRUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;

import java.io.*;

public class QrFtpUpload{

    public  static String qrFtpUpload(DinnerTable dinnerTable ) throws IOException {
        //创建FTPClient客户端
        FTPClient ftpClient = new FTPClient();
        //创建FTP连接
        ftpClient.setControlEncoding("UTF-8");
        ftpClient.connect("106.15.95.200",21);
        //登录
        ftpClient.login("ftpuser","323223jyf123150hjf");
        //读取本地文件
        String id= IDUtils.genImageName();
        String path="c:\\java\\"+id+".png";
        String content="http://www.baidu.com";
        QRUtils.getQRCode(path,content);
        FileInputStream fileInputStream = new FileInputStream(new File(path));
        //配置上传参数
        ftpClient.changeWorkingDirectory("/home/ftpuser/www/images");
        ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
        String filename=id+".png";
        //上传文件
        ftpClient.storeFile(filename,fileInputStream);
//        关闭连接
        fileInputStream.close();
        ftpClient.logout();
        return filename;
    }
}
