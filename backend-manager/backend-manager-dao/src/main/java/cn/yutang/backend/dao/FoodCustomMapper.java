package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.dto.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FoodCustomMapper extends FoodMapper {

	//通过分页条件查询food
	List<Food> listByPage(@Param("p") Page page, @Param("f") Food food);

	//查询符合条件的food总数
	Integer countTotal(@Param("f") Food food);
}
