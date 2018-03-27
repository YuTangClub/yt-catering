

import cn.yutang.backend.dao.FoodCustomMapper;
import cn.yutang.backend.dao.FoodMapper;
import cn.yutang.backend.dao.FoodOrdersCustomMapper;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.FoodOrders;
import cn.yutang.backend.pojo.vo.OrderCondition;
import cn.yutang.commons.redis.JedisClient;
import cn.yutang.commons.util.*;
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
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:spring/spring-service.xml","classpath*:spring/spring-dao.xml","classpath*:spring/spring-jedis.xml"})
public class GeneralTest {

	@Autowired
	FoodCustomMapper mapper;


	@Autowired
	FoodCustomMapper foodCustomMapper;

	@Test
	public void verifyShop() {

		/*Food food = new Food();
		food.setFdRecommend(-1);
		List<Long> ids = new ArrayList<>();
		ids.add((long)1);
		ids.add((long)2);
		Integer update = foodCustomMapper.updateByPrimaryKeysSelective(ids, food);*/
	}

	@Test
	public void testFtpUpload() throws IOException {


	}
}