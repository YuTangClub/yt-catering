package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.FoodtypeCustomMapper;
import cn.yutang.backend.dao.FoodtypeMapper;
import cn.yutang.backend.pojo.po.Foodtype;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IFoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodTypeServiceImpl implements IFoodTypeService {

	@Autowired
	FoodtypeCustomMapper foodtypeCustomMapper;

	@Override
	public List<Foodtype> listFoodtypeByShop(Shop shop) {
		return foodtypeCustomMapper.listAllByShop(shop);
	}
}
