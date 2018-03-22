package cn.yutang.backend.pojo.vo;

import cn.yutang.backend.pojo.po.DinnerTable;

import java.io.Serializable;

/**
 * User: DHC
 * Date: 2018/3/14
 * Time: 10:11
 * Version:V1.0
 */
public class DinnerTableCustom extends DinnerTable implements Serializable {
    private String ttName;

    private String shopName;
    public String getTtName() {
        return ttName;
    }

    public void setTtName(String ttName) {
        this.ttName = ttName;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }
}

