package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.FoodOrdersCustomMapper;
import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrders;
import cn.yutang.backend.pojo.po.FoodOrdersCustom;
import cn.yutang.backend.pojo.vo.OrderCondition;
import cn.yutang.backend.service.IFoodOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodOrderServiceImpl implements IFoodOrderService {

    @Autowired
	FoodOrdersCustomMapper iFoodOrdersMappers;


    @Override
    public MessageResult<FoodOrdersCustom> findOrders(Page page, OrderCondition orderCondition) {
        MessageResult<FoodOrdersCustom> orderResult=new MessageResult<>();

        try {
            List<FoodOrdersCustom> list=iFoodOrdersMappers.findOrders(page,orderCondition);
            Long count=iFoodOrdersMappers.findCount(orderCondition);
            orderResult.setCode(0);
            orderResult.setCount(count);
            orderResult.setMsg("success");
            orderResult.setData(list);
        }catch (Exception e) {
            e.printStackTrace();
        }

        return orderResult;
    }


}
