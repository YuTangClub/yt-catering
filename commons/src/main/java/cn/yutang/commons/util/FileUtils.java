package cn.yutang.commons.util;

import com.alibaba.druid.sql.visitor.functions.Char;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

/**
 * 文件处理工具类
 * author:peter
 */
public class FileUtils {

	/**
	 * 获取文件的后缀名，包含"."
	 * @param file 文件
	 * @return 文件后缀名
	 */
	public static String getFileSuffix(File file){
		return getFileSuffix(file.getName());
	}

	/**
	 * 获取文件的后缀名，包含"."
	 * @param filename 文件名
	 * @return 文件后缀名
	 */
	public static String getFileSuffix(String filename){
		StringBuffer filenameSb = new StringBuffer(filename);
		int index = getDotIndex(filenameSb);
		String suffix = getSuffix(filenameSb,index);
		return suffix;
	}

	/**
	 * 给文件生成随机命名
	 * @param filename 文件名
	 * @return 随机名
	 */
	public static String createRandomeName(String filename){

		String suffix = getFileSuffix(filename);

		return IDUtils.genImageName()+suffix;
	}

	/**
	 * 给文件名以UUID重命名
	 * @param filename 文件名
	 * @return UUID名
	 */
	public static String createUUIDName(String filename){

		String suffix = getFileSuffix(filename);

		return UUIDUtils.getUUIDString()+suffix;
	}

	/**
	 * 给文件以UUID重命名
	 * @param file 文件
	 * @return UUID名
	 */
	public static String createUUIDName(File file){
		return createUUIDName(file.getName());
	}

	/**
	 * 给文件生成随机命名
	 * @param file 文件
	 * @return 随机名
	 */
	public static String createRandomeName(File file){
		return createRandomeName(file.getName());
	}

	/**
	 * 文件ftp上传
	 * @param filename 文件名
	 * @param inputStream 文件输入流
	 * @param properties classpath路径下面的ftp上传配置文件
	 * @return
	 */
	public static boolean uploadFile(String filename,InputStream inputStream,String properties){
		boolean flag = false;
		try {
			Prop prop = new Prop(properties);
			String imgHost = prop.get("img.host");
			String ftpHost = prop.get("ftp.host");
			int ftpPort = Integer.parseInt(prop.get("ftp.port"));
			String ftpUsername = prop.get("ftp.username");
			String ftpPassword = prop.get("ftp.password");
			String ftpBasePath = prop.get("ftp.basePath");
			String ftpFilePath = prop.get("ftp.filePath");
			flag = FtpUtils.uploadFile(ftpHost, ftpPort, ftpUsername, ftpPassword,
					ftpBasePath, ftpFilePath, filename, inputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 获取字符串的后缀
	 * @param filename
	 * @param index
	 * @return
	 */
	private static String getSuffix(StringBuffer filename, int index) {
		StringBuffer sb = new StringBuffer();
		for (int i = index; i < filename.length(); i++) {
			 sb.append(filename.charAt(i));
		}
		return sb.toString();
	}

	/**
	 * 获取"."的位置
	 * @param filename
	 * @return
	 */
	private static int getDotIndex(StringBuffer filename) {

		for (int i = filename.length()-1; i >= 0; i--) {
			char c = filename.charAt(i);
			if('.' == c){
			 	return i;
			 }
		}
		return 0;
	}
}
