package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.FoodTypeCustomMapper;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodType;
import cn.yutang.backend.pojo.po.FoodTypeExample;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IFoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodTypeServiceImpl implements IFoodTypeService {

	@Autowired
	FoodTypeCustomMapper foodTypeCustomMapper;

	@Override
	public List<FoodType> listFoodtypeByShop(Shop shop) {
		return foodTypeCustomMapper.listAllByShop(shop);
	}

	@Override
	public List<FoodType> listFoodtypeByAttribute(FoodType foodType) {
		FoodTypeExample example = new FoodTypeExample();
		FoodTypeExample.Criteria criteria = example.createCriteria().andShopIdEqualTo(foodType.getShopId());
		if (foodType.getFtName() != null) {
			criteria.andFtNameLike("%" + foodType.getFtName() + "%");
		}
		return foodTypeCustomMapper.selectByExample(example);
	}

	@Override
	public List<FoodType> listFoodTypeByPage(Page page, FoodType foodType) {
		return foodTypeCustomMapper.selectByPage(page,foodType);
	}

	@Override
	public Integer getTotalCount(FoodType foodType) {
		return foodTypeCustomMapper.countByAttribute(foodType);
	}

	@Override
	public Integer addFoodType(FoodType foodType) {
		return foodTypeCustomMapper.insertSelective(foodType);
	}
}
