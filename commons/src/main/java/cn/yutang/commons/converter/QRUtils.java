package cn.yutang.commons.converter;

import com.swetake.util.Qrcode;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class QRUtils {
    /**
     * 获取二维码
     * @param path 二维码图片保存路径
     * @param content 二维码里的内容
     */
    public static void getQRCode(String path,String content){
        //创建一个QRCode对象
        Qrcode qrcode=new Qrcode();
        //设置纠错能力:四个级别
        //L%7 M%15 Q%25 H%30 等级越高，纠错信息占用越多，二维码可以存储信息越少
        qrcode.setQrcodeErrorCorrect('M');//第二级别
        //以二进制的形式存储内容
        qrcode.setQrcodeEncodeMode('B');
        //设置二维码的版本 40
        /**
         * 1== 21*21 2=25*25
         */
        qrcode.setQrcodeVersion(7);
        //content内容转换成byte[]
        byte[] bt={};
        try {
            //字符编码
            bt= new String(content.getBytes("ISO-8859-1"),"UTF-8").getBytes();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        //创建一个图像数据缓冲区（创建一张纸）
        BufferedImage image=new BufferedImage(140,140,BufferedImage.TYPE_INT_RGB);
        //创建一支笔
        Graphics2D g= image.createGraphics();
        //设置二维码图片的背景颜色为白色
        g.setBackground(Color.WHITE);
        //填充颜色到纸上
        g.fillRect(0,0,140,140);
        //设置二维码的前景色
        g.setColor(Color.BLACK);
        //判断bt的长度
        if(bt.length>0){
            boolean[][] booleans=qrcode.calQrcode(bt);
            for (int i=0;i<booleans.length;i++){
                for(int j=0;j<booleans.length;j++){
                    if(booleans[j][i]){
                        g.fillRect(j*3+2,i*3+2,3,3);
                    }
                }
            }
        }
        File file=new File(path);
        try {
            ImageIO.write(image,"png",file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}





















