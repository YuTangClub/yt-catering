

import cn.yutang.backend.dao.FoodtypeCustomMapper;
import cn.yutang.backend.dao.ShopMapper;
import cn.yutang.backend.pojo.po.Foodtype;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IShopService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:spring/spring-service.xml","classpath*:spring/spring-dao.xml"})
public class GeneralTest {

	/*@Autowired
	IShopService shopService;

	@Autowired
	ShopMapper shopMapper;

	@Autowired
	FoodtypeCustomMapper foodtypeCustomMapper;

	@Test
	public void verifyShop() {
		Shop shop = new Shop();
		shop.setShopId(1);
		List<Foodtype> foodtypeList = foodtypeCustomMapper.listAllByShop(shop);
	}*/
}