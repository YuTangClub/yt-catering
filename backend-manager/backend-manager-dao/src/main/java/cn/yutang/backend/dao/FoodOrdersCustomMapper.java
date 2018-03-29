package cn.yutang.backend.dao;


import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrdersCustom;
import cn.yutang.backend.pojo.vo.OrderCondition;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FoodOrdersCustomMapper extends FoodOrdersMapper {


   List<FoodOrdersCustom> findOrders(@Param("page") Page page, @Param("orderCondition") OrderCondition orderCondition);

   Long findCount(@Param("orderCondition") OrderCondition orderCondition);

    List findMethod(@Param("shopId") Integer shopId);

    List findCustomer(@Param("shopId") Integer shopId);

    Double getMonthCount(@Param("date1") String date1, @Param("date2") String date2);

    Double getDayCount(@Param("day1") String day1, @Param("day2") String day2);
}
