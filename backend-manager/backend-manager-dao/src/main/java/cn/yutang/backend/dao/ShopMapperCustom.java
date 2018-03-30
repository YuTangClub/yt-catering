package cn.yutang.backend.dao;


import cn.yutang.backend.pojo.po.Shop;

public interface ShopMapperCustom {

    Shop searchShopByShopTel(String phoneNumber);
}