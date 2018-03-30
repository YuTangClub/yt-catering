package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.ShopMapper;
import cn.yutang.backend.dao.ShopMapperCustom;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.pojo.po.ShopExample;
import cn.yutang.backend.service.IShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopServiceImpl implements IShopService {

	@Autowired
	ShopMapper shopMapper;

	@Autowired
	ShopMapperCustom shopMapperCustom;

	@Override
	public List<Shop> verifyShop(Shop shop) {
		ShopExample example = new ShopExample();
		example.createCriteria().andShopNicknameEqualTo(shop.getShopNickname())
				.andShopPasswordEqualTo(shop.getShopPassword());
		return shopMapper.selectByExample(example);
	}

	@Override
	public Shop searchShopByShopTel(String phoneNumber) {
		return shopMapperCustom.searchShopByShopTel(phoneNumber);
	}
}
