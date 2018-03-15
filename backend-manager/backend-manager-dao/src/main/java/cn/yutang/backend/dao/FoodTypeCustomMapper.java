package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.FoodType;
import cn.yutang.backend.pojo.po.Shop;

import java.util.List;

public interface FoodTypeCustomMapper extends FoodTypeMapper {

	//获取特定shop所有foodtype
	List<FoodType> listAllByShop(Shop shop);
}
