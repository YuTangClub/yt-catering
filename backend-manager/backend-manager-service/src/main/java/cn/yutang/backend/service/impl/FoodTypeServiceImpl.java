package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.FoodTypeCustomMapper;
import cn.yutang.backend.pojo.po.FoodType;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IFoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodTypeServiceImpl implements IFoodTypeService {

	@Autowired
	FoodTypeCustomMapper foodTypeCustomMapper;

	@Override
	public List<FoodType> listFoodtypeByShop(Shop shop) {
		return foodTypeCustomMapper.listAllByShop(shop);
	}
}
