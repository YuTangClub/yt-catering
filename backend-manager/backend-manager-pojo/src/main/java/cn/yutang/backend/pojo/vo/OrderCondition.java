package cn.yutang.backend.pojo.vo;

import javax.xml.crypto.Data;
import java.io.Serializable;
import java.text.SimpleDateFormat;
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

    public String getOrBegintime() {
        if(orBegintime != null){
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(orBegintime);
        }
        return null;
    }

    public void setOrBegintime(Date orBegintime) {
        this.orBegintime = orBegintime;
    }

    public String getOrEndtime() {
        if (orEndtime != null) {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(orEndtime);
        }
        return null;
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
