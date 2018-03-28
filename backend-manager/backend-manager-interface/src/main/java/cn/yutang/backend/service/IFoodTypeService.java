package cn.yutang.backend.service;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodType;
import cn.yutang.backend.pojo.po.Shop;

import java.util.List;

public interface IFoodTypeService {

	/**
	 * 获得特定shop的所有FoodType
	 * @param shop
	 * @return
	 */
	List<FoodType> listFoodtypeByShop(Shop shop);

	/**
	 * 获得特定属性的foodType
	 * @param foodType
	 * @return
	 */
	List<FoodType> listFoodtypeByAttribute(FoodType foodType);

	/**
	 * 按分页查询foodType
	 * @param page
	 * @param foodType
	 * @return
	 */
	List<FoodType> listFoodTypeByPage(Page page, FoodType foodType);

	/**
	 * 获取foodType总数，需要传shopId
	 * @param foodType
	 * @return
	 */
	Integer getTotalCount(FoodType foodType);

	/**
	 * 通过foodType属性增加新条目
	 * @param foodType
	 * @return
	 */
	Integer addFoodType(FoodType foodType);
}
