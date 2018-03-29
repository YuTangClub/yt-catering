package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.ShopOrders;
import cn.yutang.backend.pojo.vo.DinnerTableInfo;
import cn.yutang.backend.service.IDinnerTableService;
import cn.yutang.backend.service.IOrderDishesService;
import cn.yutang.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/pages/cashier")
public class CashierController {

    @Autowired
	IDinnerTableService dinnerTableService;

    @Autowired
	IOrderService orderServiceImpl;

    @Autowired
	IOrderDishesService orderDishesServiceImpl;

    @RequestMapping("/tbList")
    public String tbListPage(){
        return "/pages/cashier/tbList";
    }
    //获得餐桌信息

    @RequestMapping("/allTable.do")
    public String allTables(Page page, Model model){
        MessageResult<DinnerTableInfo> allTable =dinnerTableService.listTables(0,page);
        //return allTable;
        model.addAttribute("allTable",allTable);
        model.addAttribute("allPage",page);
        return "pages/cashier/allTable";
    }
   /* @RequestMapping("/allTable.do")
    @ResponseBody
    public List<DinnerTableInfo> allTables(){
        return dinnerTableService.allTables();
    }*/
    @RequestMapping("/datingTable.do")
    public String datingTables(Page page, Model model){
        MessageResult<DinnerTableInfo> datingTable =dinnerTableService.listTables(1,page);
        model.addAttribute("datingPage",page);
        model.addAttribute("datingTable",datingTable);
        return "pages/cashier/datingTable";
    }
    @RequestMapping("/kabaoTable.do")
    public String kabaoTables(Page page, Model model){
        MessageResult<DinnerTableInfo> kabaoTable = dinnerTableService.listTables(2,page);
        model.addAttribute("kabaoTable",kabaoTable);
        model.addAttribute("kabaoPage",page);
        return "pages/cashier/kabaoTable";
    }
    @RequestMapping("/baoTable.do")
    public String baoTables(Page page, Model model){
        MessageResult<DinnerTableInfo> baoTable = dinnerTableService.listTables(3,page);
        model.addAttribute("baoTable",baoTable);
        model.addAttribute("baoPage",page);
        return "pages/cashier/baoTable";
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
    //结算
    @RequestMapping("/pay4Dishes")
    public  void payForDishes(ShopOrders shopOrders){
        orderDishesServiceImpl.payForDishes(shopOrders);
    }

}

