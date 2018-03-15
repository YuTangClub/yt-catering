package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.Foodtype;
import cn.yutang.backend.pojo.po.Shop;

import java.util.List;

public interface FoodtypeCustomMapper extends FoodtypeMapper {

	//获取特定shop所有foodtype
	List<Foodtype> listAllByShop(Shop shop);
}
