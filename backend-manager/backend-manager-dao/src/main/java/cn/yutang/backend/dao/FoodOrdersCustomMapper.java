package cn.yutang.backend.dao;


import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrders;
import cn.yutang.backend.pojo.vo.OrderCondition;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FoodOrdersCustomMapper extends FoodOrdersMapper {


   List<FoodOrders> findOrders(@Param("page") Page page, @Param("orderCondition") OrderCondition orderCondition);

   Long findCount(@Param("orderCondition") OrderCondition orderCondition);

}
