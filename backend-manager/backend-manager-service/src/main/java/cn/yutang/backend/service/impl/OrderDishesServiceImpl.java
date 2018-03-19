package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.DinnerTableMapper;
import cn.yutang.backend.dao.FoodOrderDetailMapper;
import cn.yutang.backend.dao.FoodOrdersMapper;
import cn.yutang.backend.pojo.po.DinnerTable;
import cn.yutang.backend.pojo.po.FoodOrderDetail;
import cn.yutang.backend.pojo.po.ShopOrders;
import cn.yutang.backend.service.IOrderDishesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Controller
public class OrderDishesServiceImpl implements IOrderDishesService {
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
	FoodOrderDetailMapper foodOrderDetailMapper;
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
	FoodOrdersMapper foodOrdersMapper;
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
	DinnerTableMapper dinnerTableMapper;

    @Override
    @Transactional
    public void orderDishes(ShopOrders shopOrders) {
        foodOrdersMapper.insert(shopOrders);
        List<FoodOrderDetail> foodOrderDetailList = shopOrders.getFoodOrderDetailList();
        for (FoodOrderDetail foodOrderDetail:foodOrderDetailList) {

            foodOrderDetailMapper.insert(foodOrderDetail);

        }
        DinnerTable dinnerTable=new DinnerTable();
        dinnerTable.setTbId(shopOrders.getTbId());
        dinnerTable.setTbStatus(1);
        dinnerTable.setOrderDate(shopOrders.getOrBegintime());
        dinnerTableMapper.updateByPrimaryKeySelective(dinnerTable);
    }
}
