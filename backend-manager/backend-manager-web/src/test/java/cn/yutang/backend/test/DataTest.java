package cn.yutang.backend.test;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.FoodOrderDetail;
import cn.yutang.backend.pojo.po.ShopOrders;
import cn.yutang.sdd.backend.service.IDinnerTableService;
import cn.yutang.sdd.backend.service.IOrderDishesService;
import cn.yutang.sdd.backend.service.IOrderService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml","classpath:spring/spring-service.xml"})
public class DataTest {
    @Autowired
    IDinnerTableService dinnerTableServiceImpl;
    @Autowired
    IOrderService orderServiceImpl;
    @Autowired
    IOrderDishesService orderDishesServiceImpl;

    @Test
    public void test1(){
        Page page=new Page();
        page.setLimit(12);
        page.setPage(1);
        dinnerTableServiceImpl.listTables(1,page);
    }
    @Test
    public void test2(){
        Page page=new Page();
        page.setLimit(10);
        page.setPage(2);
        orderServiceImpl.selectByPage(page);
    }
    @Test
    public void test3(){
      ShopOrders shopOrders=new ShopOrders();
        shopOrders.setOrBegintime(new Date());
        //String orId=String.valueOf(UUID.randomUUID());
        //shopOrders.setOrId(orId);
        shopOrders.setShopId(123);
        shopOrders.setOrStatus(0);
        shopOrders.setTbId(11l);
        List<FoodOrderDetail> list=new ArrayList<>();
        // list.add( new FoodOrderDetail("","",1,2,"1",123));
        //list.add( new FoodOrderDetail("","",2,2,"1",123));
        shopOrders.setFoodOrderDetailList(list);
        orderDishesServiceImpl.orderDishes(shopOrders);
    }
    @Test
    public void test4(){
        ShopOrders shopOrders=new ShopOrders();
        //shopOrders.setOrBegintime(new Date());
        //String orId=String.valueOf(UUID.randomUUID());
        shopOrders.setOrId("5b919cfb70e544e7932fce506c9d8460");
        shopOrders.setShopId(123);
        shopOrders.setOrStatus(0);
        shopOrders.setTbId(11l);
        List<FoodOrderDetail> list=new ArrayList<>();
        //list.add( new FoodOrderDetail("","5b919cfb70e544e7932fce506c9d8460",1,2,"1",123));
        //list.add( new FoodOrderDetail("","5b919cfb70e544e7932fce506c9d8460",3,1,"1",123));
        shopOrders.setFoodOrderDetailList(list);
        orderDishesServiceImpl.addDishes(shopOrders);
    }
    @Test
    public void test5(){
        ShopOrders shopOrders=new ShopOrders();
        //shopOrders.setOrBegintime(new Date());
        //String orId=String.valueOf(UUID.randomUUID());
        shopOrders.setOrId("5b919cfb70e544e7932fce506c9d8460");
        shopOrders.setShopId(123);
        shopOrders.setOrStatus(0);
        shopOrders.setTbId(11l);
        double sum=orderDishesServiceImpl.payForDishes(shopOrders);
        System.out.print(sum);
    }
}
