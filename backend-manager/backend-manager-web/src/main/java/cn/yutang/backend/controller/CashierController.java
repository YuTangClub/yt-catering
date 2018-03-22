package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.ShopOrders;
import cn.yutang.backend.pojo.vo.DinnerTableInfo;
import cn.yutang.sdd.backend.service.IDinnerTableService;
import cn.yutang.sdd.backend.service.IOrderDishesService;
import cn.yutang.sdd.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("cashier")
public class CashierController {

    @Autowired
    IDinnerTableService dinnerTableService;

    @Autowired
    IOrderService orderServiceImpl;

    @Autowired
    IOrderDishesService orderDishesServiceImpl;

    //获得餐桌信息
    @RequestMapping("/getTables")
    public MessageResult<DinnerTableInfo> getTables(Integer ttId, Page page){

        MessageResult<DinnerTableInfo> messageResult = null;
        try {
            messageResult =dinnerTableService.listTables(ttId,page);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return messageResult;
    }
    //获得菜单
    @RequestMapping("/dishesMenu")
    public MessageResult<Food> foodList(Page page) {
        MessageResult<Food> messageResult = null;
        try {
            messageResult =orderServiceImpl.selectByPage(page);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return messageResult;
    }
    //点菜
    @RequestMapping("/orderDishes")
    public String orderDishes(ShopOrders shopOrders){
        orderDishesServiceImpl.orderDishes(shopOrders);
        return "0";
    }
    //加菜
    @RequestMapping("/addDishes")
    public void addDishes(ShopOrders shopOrders){
        orderDishesServiceImpl.addDishes(shopOrders);
    }
    //退菜
    @RequestMapping("/untread")
    public void untread(ShopOrders shopOrders){
        orderDishesServiceImpl.untread(shopOrders);
    }
    @RequestMapping("/pay4Dishes")
    public  void payForDishes(ShopOrders shopOrders){
        orderDishesServiceImpl.payForDishes(shopOrders);
    }

}

