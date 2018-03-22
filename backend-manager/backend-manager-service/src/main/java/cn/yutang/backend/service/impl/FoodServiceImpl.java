package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.FoodCustomMapper;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements IFoodService {

	@Autowired
	FoodCustomMapper foodCustomMapper;

	@Override
	public List<Food> listFoodByPage(Page page, Food food) {
		return foodCustomMapper.listByPage(page,food);
	}

	@Override
	public Integer countTotal(Food food) {
		return foodCustomMapper.countTotal(food);
	}

	@Override
	public Integer setFoodByIdSelective(Food food) {
		return foodCustomMapper.updateByPrimaryKeySelective(food);
	}

	@Override
	public Integer setFoodById(Food food) {
		return foodCustomMapper.updateByPrimaryKey(food);
	}
}
