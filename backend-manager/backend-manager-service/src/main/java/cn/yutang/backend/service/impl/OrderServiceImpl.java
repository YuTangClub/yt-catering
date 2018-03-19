package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.FoodMapper;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class OrderServiceImpl implements IOrderService {

    @Autowired
	FoodMapper foodMapper;
    @Override
    public List<Food> selectByExample() {
        return foodMapper.selectByExample(null);
    }
}
