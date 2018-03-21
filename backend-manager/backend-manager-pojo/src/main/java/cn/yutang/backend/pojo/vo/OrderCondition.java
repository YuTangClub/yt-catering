package cn.yutang.backend.pojo.vo;

import javax.xml.crypto.Data;
import java.io.Serializable;
import java.util.Date;

public class OrderCondition  implements Serializable {

    private Date orBegintime;
    private Date orEndtime;
    private Integer tbId;
    private String orId;
    private Integer shopId;

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Date getOrBegintime() {
        return orBegintime;
    }

    public void setOrBegintime(Date orBegintime) {
        this.orBegintime = orBegintime;
    }

    public Date getOrEndtime() {
        return orEndtime;
    }

    public void setOrEndtime(Date orEndtime) {
        this.orEndtime = orEndtime;
    }

    public Integer getTbId() {
        return tbId;
    }

    public void setTbId(Integer tbId) {
        this.tbId = tbId;
    }

    public String getOrId() {
        return orId;
    }

    public void setOrId(String orId) {
        this.orId = orId;
    }

    @Override
    public String toString() {
        return "OrderCondition{" +
                "orBegintime=" + orBegintime +
                ", orEndtime=" + orEndtime +
                ", tbId=" + tbId +
                ", orId='" + orId + '\'' +
                ", shopId=" + shopId +
                '}';
    }
}
