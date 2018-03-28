package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodType;
import cn.yutang.backend.pojo.po.Shop;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FoodTypeCustomMapper extends FoodTypeMapper {

	/**
	 * 获取特定shop所有foodtype
	 * @param shop 封装shopId
	 * @return
	 */
	List<FoodType> listAllByShop(Shop shop);

	/**
	 * 分页显示foodType
	 * @param page 分页信息
	 * @param foodType foodType查询条件
	 * @return
	 */
	List<FoodType> selectByPage(@Param("p") Page page,@Param("f") FoodType foodType);

	/**
	 * 通过foodType封装的属性查询符合的记录数
	 * @param foodType oodType封装的属性
	 * @return
	 */
	Integer countByAttribute(@Param("f") FoodType foodType);
}
