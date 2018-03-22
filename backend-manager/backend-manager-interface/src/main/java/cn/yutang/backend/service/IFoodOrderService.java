package cn.yutang.backend.service;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrders;
import cn.yutang.backend.pojo.po.FoodOrdersCustom;
import cn.yutang.backend.pojo.vo.OrderCondition;

public interface IFoodOrderService {

    MessageResult<FoodOrdersCustom> findOrders(Page page, OrderCondition orderCondition);

}
