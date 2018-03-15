package cn.yutang.backend.service;

import cn.yutang.backend.pojo.po.Foodtype;
import cn.yutang.backend.pojo.po.Shop;

import java.util.List;

public interface IFoodTypeService {

	//获得特定shop的所有FoodType
	List<Foodtype> listFoodtypeByShop(Shop shop);
}
