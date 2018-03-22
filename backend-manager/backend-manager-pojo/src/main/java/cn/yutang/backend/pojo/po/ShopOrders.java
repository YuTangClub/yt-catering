package cn.yutang.backend.pojo.po;

import java.io.Serializable;
import java.util.List;

public class ShopOrders extends FoodOrders implements Serializable{
    private static final long serialVersionUID = 1L;
    private List<FoodOrderDetail> foodOrderDetailList;

    public List<FoodOrderDetail> getFoodOrderDetailList() {
        return foodOrderDetailList;
    }

    public void setFoodOrderDetailList(List<FoodOrderDetail> foodOrderDetailList) {
        this.foodOrderDetailList = foodOrderDetailList;
    }


}
