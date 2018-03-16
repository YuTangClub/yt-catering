

import cn.yutang.backend.dao.FoodCustomMapper;
import cn.yutang.backend.dao.FoodMapper;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.commons.page.Page;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:spring/spring-service.xml","classpath*:spring/spring-dao.xml"})
public class GeneralTest {

	@Autowired
	FoodCustomMapper mapper;



	@Test
	public void verifyShop() {
		/*Page page = new Page();
		page.setPage(1);
		page.setLimit(5);
		Food food = new Food();
		food.setFdName("小");
		Integer count = mapper.countTotal(food);*/
	}
}