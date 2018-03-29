package cn.yutang.backend.controller;


import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrdersCustom;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.pojo.vo.OrderCondition;
import cn.yutang.backend.service.IFoodOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/pages/order")
public class FoodOrderController {

    @Autowired
	IFoodOrderService foodOrderService;

    @ResponseBody
    @RequestMapping(value = "/orderList")
    public MessageResult<FoodOrdersCustom> listFoodOrder(HttpSession session,/*分页*/Page page,/*模糊查询*/OrderCondition orderCondition){

        //获得当前店铺id
        Shop shop = (Shop) session.getAttribute("sessionShop");
        if (shop!=null){ Integer shopId=shop.getShopId();
            orderCondition.setShopId(shopId);
        }


        //所有的order数据封装到messageresult里面
        MessageResult<FoodOrdersCustom> OrderResult = foodOrderService.findOrders(page,orderCondition);


        return OrderResult;
    }

    @RequestMapping(value = "/list")
    public String toOrderList(HttpSession session,Model model){

        Shop shop = (Shop) session.getAttribute("sessionShop");
        Integer shopId=shop.getShopId();

        //日均销售和月均销售统计
        //获得当前的日期
        Date date=new Date();
        SimpleDateFormat allDate=new SimpleDateFormat("yyyy-MM-dd：HH-mm-ss");
        String s = allDate.format(date);
        //获得当前年份
        SimpleDateFormat year1=new SimpleDateFormat("yyyy");
        String s1 = year1.format(date);
        int year = Integer.parseInt(s1);
        //获得当前月份
        SimpleDateFormat ss=new SimpleDateFormat("MM");
        String s2 = ss.format(date);
        int month = Integer.parseInt(s2);

        //获得当前日期
        SimpleDateFormat dayDate=new SimpleDateFormat("yyyy-MM-dd");
        String s3 = dayDate.format(date);
        //进行拼接日期字符串
        String day1 = s3+":00-00-00";
        String day2 = s3+":23-59-59";
        foodOrderService.getDayCount(model,day1,day2);
        //进行拼接日期字符串
        //判断是否是闰年
        if ((year%4==0)&&(year%100!=0)||(year%400==0)){
            String date1=s1+"-"+s2+"-"+"01:00-00-00";
            if (month==1||month==3||month==5||month==7||month==8||month==10||month==12){
            String date2=s1+"-"+s2+"-"+"31:23-59-59";
               foodOrderService.getMonthCount(model,date1,date2);
            }
            if (month==2){
                String date2=s1+"-"+s2+"-"+"29:23-59-59";
                foodOrderService.getMonthCount(model,date1,date2);
            }
            else {
                String date2=s1+"-"+s2+"-"+"30:23-59-59";
                foodOrderService.getMonthCount(model,date1,date2);
            }
        }else {
            String date1=s1+"-"+s2+"-"+"01:00-00-00";
            if (month==1||month==3||month==5||month==7||month==8||month==10||month==12){
                String date2=s1+"-"+s2+"-"+"31:23-59-59";
                foodOrderService.getMonthCount(model,date1,date2);
            }
            if (month==2){
                String date2=s1+"-"+s2+"-"+"28:23-59-59";
                foodOrderService.getMonthCount(model,date1,date2);
            }
            else {
                String date2=s1+"-"+s2+"-"+"31:23-59-59";
                foodOrderService.getMonthCount(model,date1,date2);
            }

        }




        //支付方式和客户类型模糊查询回显
        List payMethod= foodOrderService.getPayMethods(shopId);

        List customer =foodOrderService.getCustomer(shopId);

        model.addAttribute("payMethodSession",payMethod);
        model.addAttribute("customerSession",customer);


        return "pages/order/list";
    }

}
