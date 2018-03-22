package cn.yutang.backend.controller;


import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrders;
import cn.yutang.backend.pojo.po.FoodOrdersCustom;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.pojo.vo.OrderCondition;
import cn.yutang.backend.service.IFoodOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class FoodOrderController {

    @Autowired
	IFoodOrderService foodOrderService;

    @ResponseBody
    @RequestMapping(value = "/orderList")
    public MessageResult<FoodOrdersCustom> listFoodOrder(HttpSession session,/*分页*/Page page,/*模糊查询*/OrderCondition orderCondition){

        Shop shop = (Shop) session.getAttribute("sessionShop");
        Integer shopId=shop.getShopId();
        orderCondition.setShopId(shopId);
        MessageResult<FoodOrdersCustom> OrderResult = foodOrderService.findOrders(page,orderCondition);

        return OrderResult;
    }

}
