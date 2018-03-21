

import cn.yutang.backend.dao.FoodCustomMapper;
import cn.yutang.backend.dao.FoodMapper;
import cn.yutang.backend.dao.FoodOrdersCustomMapper;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.vo.OrderCondition;
import cn.yutang.commons.redis.JedisClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

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

		OrderCondition condition = new OrderCondition();
		condition.setShopId(1);
		condition.setOrEndtime(new Date());

		Long count = foodOrdersCustomMapper.findCount(condition);
		/*Food food = new Food();
		food.setFdId(1);
		food.setFdRecommend(0);
		mapper.updateByPrimaryKeySelective(food);*/

	}
}