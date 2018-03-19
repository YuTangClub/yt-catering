package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.ShopOrders;
import cn.yutang.backend.pojo.vo.DinnerTableInfo;
import cn.yutang.backend.service.IDinnerTableService;
import cn.yutang.backend.service.IOrderDishesService;
import cn.yutang.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("cashier")
public class CashierController {

    @Autowired
	IDinnerTableService dinnerTableService;

    @Autowired
	IOrderService orderServiceImpl;

    @Autowired
	IOrderDishesService orderDishesServiceImpl;

    @RequestMapping("/getTables")
    public List<DinnerTableInfo> getTables(Integer ttId){
        List<DinnerTableInfo> tableList=dinnerTableService.listTables(ttId);
        System.out.print(tableList);
        return tableList;
    }
    @RequestMapping("/orderController")
    public String foodList(ModelAndView foodModel) {
       List<Food> foods=orderServiceImpl.selectByExample();
       foodModel.addObject("foods",foods);
       return "";
    }

    @RequestMapping("/orderController2")
    public String orderDishes(ShopOrders shopOrders){
        orderDishesServiceImpl.orderDishes(shopOrders);
        return "0";
    }
}
