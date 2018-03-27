package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface FoodCustomMapper extends FoodMapper {

	/**
	 * 通过分页条件查询food
	 * @param page
	 * @param food
	 * @return
	 */
	List<Food> listByPage(@Param("p") Page page, @Param("f") Food food);

	/**
	 * 查询符合条件的food总数
	 * @param food
	 * @return
	 */
	Integer countTotal(@Param("f") Food food);

	/**
	 * 通过id数组删除对应的food
	 * @param ids
	 * @return
	 */
	Integer deleteByIds(List<Long> ids);

	/**
	 * 通过id数组更改对应的food的推荐状态
	 * @param ids
	 * @return
	 */
	Integer setRecommendByIds(List<Long> ids);

	/**
	 * 通过id数字，以及food的状态条件，批量更改food的状态
	 * @param ids food的id
	 * @param food 里面封装了food的状态属性：如上下架状态，是否推荐
	 * @return 返回更新条数
	 */
	Integer updateByPrimaryKeysSelective(@Param("ids") List<Long> ids,@Param("f") Food food);
}
