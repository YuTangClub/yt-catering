package cn.yutang.sdd.backend.service.impl;

import cn.yutang.backend.dao.DinnerTableMapper;
import cn.yutang.backend.dao.FoodMapper;
import cn.yutang.backend.dao.FoodOrderDetailMapper;
import cn.yutang.backend.dao.FoodOrdersMapper;
import cn.yutang.backend.pojo.po.*;
import cn.yutang.sdd.backend.service.IOrderDishesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class OrderDishesServiceImpl implements IOrderDishesService {
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    FoodOrderDetailMapper foodOrderDetailMapper;
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    FoodOrdersMapper foodOrdersMapper;
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    DinnerTableMapper dinnerTableMapper;
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    FoodMapper foodMapper;
    @Override
    @Transactional
    public void orderDishes(ShopOrders shopOrders) {
        //1.插入订单
        UUID orUUID=UUID.randomUUID();
        String orId=orUUID.toString().replace("-","");
        shopOrders.setOrId(orId);
        foodOrdersMapper.insert(shopOrders);
        //2.插入菜品订单详情
        List<FoodOrderDetail> foodOrderDetailList = shopOrders.getFoodOrderDetailList();
        for (FoodOrderDetail foodOrderDetail:foodOrderDetailList) {
            UUID uuid=UUID.randomUUID();
            String odtId=uuid.toString().replace("-","");
            foodOrderDetail.setOdtId(odtId);
            foodOrderDetail.setOrId(orId);
            foodOrderDetailMapper.insert(foodOrderDetail);
        }
        //3.更新餐桌信息
        DinnerTable dinnerTable=new DinnerTable();
        dinnerTable.setTbId(shopOrders.getTbId());
        dinnerTable.setTbStatus(1);
        dinnerTable.setOrderDate(shopOrders.getOrBegintime());
        dinnerTableMapper.updateByPrimaryKeySelective(dinnerTable);
    }

    @Override
    @Transactional
    public int untread(ShopOrders shopOrders) {

        return 0;
    }

    @Override
    @Transactional
    public int addDishes(ShopOrders shopOrders) {
        //将加的菜添加到订单详细列表的库中
        List<FoodOrderDetail> foodOrderDetailList = shopOrders.getFoodOrderDetailList();
        for (FoodOrderDetail foodOrderDetail:foodOrderDetailList) {
            //查看点单中是否存在该菜品
            FoodOrderDetailExample example=new FoodOrderDetailExample();
            FoodOrderDetailExample.Criteria criteria=example.createCriteria();
            criteria.andOrIdEqualTo(shopOrders.getOrId());
            criteria.andFdIdEqualTo(foodOrderDetail.getFdId());
            List<FoodOrderDetail> foodOrderDetails =foodOrderDetailMapper.selectByExample(example);
            if(foodOrderDetails.size() == 0){//如果不存在该菜品
                UUID uuid=UUID.randomUUID();
                String odtId=uuid.toString().replace("-","");
                foodOrderDetail.setOdtId(odtId);
                foodOrderDetailMapper.insert(foodOrderDetail);

            }else{
                //set新的数量
                foodOrderDetails.get(0).setFdCount(foodOrderDetails.get(0).getFdCount()+foodOrderDetail.getFdCount());
                foodOrderDetailMapper.updateByExampleSelective(foodOrderDetails.get(0),example);
            }
        }
        return 0;
    }

    @Override
    @Transactional
    public double payForDishes(ShopOrders shopOrders) {
        //获得订单详情
        FoodOrderDetailExample example=new FoodOrderDetailExample();
        FoodOrderDetailExample.Criteria criteria=example.createCriteria();
        criteria.andOrIdEqualTo(shopOrders.getOrId());
        List<FoodOrderDetail> foodOrderDetails=foodOrderDetailMapper.selectByExample(example);
        double sum=0.00; //总价
        //遍历订单详情,计算总价
        for(FoodOrderDetail foodOrderDetail:foodOrderDetails){
            //FoodExample fe=new FoodExample();//fe:foodExample
            //FoodExample.Criteria fc=fe.createCriteria();
            //fc.andFdIdEqualTo(foodOrderDetail.getFdId());
            Food food=foodMapper.selectByPrimaryKey(foodOrderDetail.getFdId());
            double fdPrice=food.getFdPrice();
            int fdCount=foodOrderDetail.getFdCount();
            sum+=fdCount*fdPrice;//非会员总价
        }
        //更新餐桌状态
        DinnerTableExample tbExample=new DinnerTableExample();
        DinnerTableExample.Criteria tbCriteria=tbExample.createCriteria();
        tbCriteria.andTbIdEqualTo(shopOrders.getTbId());//更新餐桌条件tbId
        DinnerTable dinnerTable=new DinnerTable();
        dinnerTable.setTbStatus(0);//更新餐桌状态
        dinnerTableMapper.updateByExampleSelective(dinnerTable,tbExample);
        //更新订单状态
        FoodOrdersExample orExample=new FoodOrdersExample();
        FoodOrdersExample.Criteria orCriteria=orExample.createCriteria();
        criteria.andOrIdEqualTo(shopOrders.getOrId()); //更新订单条件orId
        ShopOrders shopOrder=new ShopOrders();
        shopOrder.setOrStatus(1);//更新订单状态为结账
        shopOrder.setOrTotalprice(sum);//总价
        shopOrder.setOrEndtime(new Date());//结账时间
        foodOrdersMapper.updateByExampleSelective(shopOrder,orExample);
        return sum;
    }
}
