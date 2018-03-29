package cn.yutang.backend.service;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrdersCustom;
import cn.yutang.backend.pojo.vo.OrderCondition;
import org.springframework.ui.Model;

import java.util.List;

public interface IFoodOrderService {

    MessageResult<FoodOrdersCustom> findOrders(Page page, OrderCondition orderCondition);

    List getPayMethods(Integer shopId);

    List getCustomer(Integer shopId);



    void getMonthCount(Model model, String date1, String date2);

    void getDayCount(Model model, String day1, String day2);
}
