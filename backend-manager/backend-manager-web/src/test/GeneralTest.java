

import cn.yutang.backend.dao.FoodCustomMapper;
import cn.yutang.backend.dao.FoodMapper;
import cn.yutang.backend.dao.FoodOrdersCustomMapper;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.FoodOrders;
import cn.yutang.backend.pojo.vo.OrderCondition;
import cn.yutang.commons.redis.JedisClient;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:spring/spring-service.xml","classpath*:spring/spring-dao.xml","classpath*:spring/spring-jedis.xml"})
public class GeneralTest {

	@Autowired
	FoodCustomMapper mapper;

	@Autowired
	JedisClient jedisClient;

	@Autowired
	FoodOrdersCustomMapper foodOrdersCustomMapper;

	@Test
	public void verifyShop() {



		/*try {
			Page page = new Page();
			page.setPage(1);
			page.setLimit(10);

			OrderCondition condition = new OrderCondition();
			condition.setShopId(1);
			condition.setOrEndtime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2018-03-13 00:01:00"));

			List<FoodOrders> orders = foodOrdersCustomMapper.findOrders(page, condition);
			if (orders != null) {
				System.out.println(orders);
			}else {
				System.out.println("####orders is null####");
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}*/
		/*Food food = new Food();
		food.setFdId(1);
		food.setFdRecommend(0);
		mapper.updateByPrimaryKeySelective(food);*/

	}

	@Test
	public void testFtpUpload() throws IOException {
		//创建FTPClient客户端
		FTPClient ftpClient = new FTPClient();
		//创建FTP连接
		ftpClient.connect("139.224.9.221",21);
		//登录
		ftpClient.login("ftpuser","yup123yup");
		//读取本地文件
		FileInputStream fileInputStream = new FileInputStream(new File("/Users/yu/Pictures/teamviewer.tiff"));
		//配置上传参数
		ftpClient.changeWorkingDirectory("/home/ftpuser/www/img");
		ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
		//上传文件
		ftpClient.storeFile("teamviewer.tiff",fileInputStream);
		//关闭连接
		fileInputStream.close();
		ftpClient.logout();

	}
}