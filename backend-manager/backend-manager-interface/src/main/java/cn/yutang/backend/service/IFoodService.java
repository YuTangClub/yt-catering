package cn.yutang.backend.service;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;

import java.util.List;

public interface IFoodService {

	/**
	 * 通过查询条件返回food的分页数据
	 * @param page
	 * @param food
	 * @return
	 */
	List<Food> listFoodByPage(Page page, Food food);

	/**
	 * 获取符合要求的总数
	 * @param food
	 * @return
	 */
	Integer countTotal(Food food);

	/**
	 * 通过id设置food的可选属性
	 * @param food
	 * @return
	 */
	Integer setFoodByIdSelective(Food food);

	/**
	 * 通过id设置food的所有属性
	 * @param food
	 * @return
	 */
	Integer setFoodById(Food food);

	/**
	 * 通过food id删除food
	 * @param ids
	 * @return
	 */
	Integer deleteFoods(List<Long> ids);

	/**
	 * 通过food id更新food的推荐状态
	 * @param ids
	 * @return
	 */
	Integer setRecommendByIds(List<Long> ids);

	/**
	 * 通过id数字，以及food的状态条件，批量更改food的状态
	 * @param ids food的id
	 * @param food 里面封装了food的状态属性：如上下架状态，是否推荐
	 * @return
	 */
	Integer setFoodStatusByIds(List<Long> ids, Food food);

	/**
	 * 添加食物
	 * @param food
	 * @return
	 */
	Integer addFood(Food food);

	/**
	 * 通过id获取food
	 * @param id
	 * @return
	 */
	Food getFoodById(Integer id);
}
