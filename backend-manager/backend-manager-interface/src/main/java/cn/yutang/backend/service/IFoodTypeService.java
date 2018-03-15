package cn.yutang.backend.service;

import cn.yutang.backend.pojo.po.FoodType;
import cn.yutang.backend.pojo.po.Shop;

import java.util.List;

public interface IFoodTypeService {

	//获得特定shop的所有FoodType
	List<FoodType> listFoodtypeByShop(Shop shop);
}
