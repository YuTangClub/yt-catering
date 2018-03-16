package cn.yutang.backend.service;

import cn.yutang.backend.pojo.po.Food;
import cn.yutang.commons.page.Page;

import java.util.List;

public interface IFoodService {

	//通过查询条件返回food的分页数据
	List<Food> listFoodByPage(Page page, Food food);

	//获取符合要求的总数
	Integer countTotal(Food food);
}
