package cn.yutang.backend.service;

import cn.yutang.backend.pojo.po.ShopOrders;

public interface IOrderDishesService {

    void orderDishes(ShopOrders shopOrders);

    int untread(ShopOrders shopOrders);

    int addDishes(ShopOrders shopOrders);

    double payForDishes(ShopOrders orId);
}
