package cn.yutang.backend.pojo.po;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class FoodOrdersCustom implements Serializable {

    private String orId;


    private Long tbId;


    private Date orBegintime;


    private Date orEndtime;


    private Integer orStatus;


    private Double orTotalprice;


    private Integer shopId;


    private List<PayDetail> pd;


    private List<PayMethod> pm;


    private String ctName;


    private static final long serialVersionUID = 1L;


    public String getOrId() {
        return orId;
    }


    public void setOrId(String orId) {
        this.orId = orId == null ? null : orId.trim();
    }


    public Long getTbId() {
        return tbId;
    }


    public void setTbId(Long tbId) {
        this.tbId = tbId;
    }


    public String getOrBegintime() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(orBegintime);
    }


    public void setOrBegintime(Date orBegintime) {
        this.orBegintime = orBegintime;
    }


    public String getOrEndtime() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(orEndtime);
    }


    public void setOrEndtime(Date orEndtime) {
        this.orEndtime = orEndtime;
    }


    public Integer getOrStatus() {
        return orStatus;
    }


    public void setOrStatus(Integer orStatus) {
        this.orStatus = orStatus;
    }


    public Double getOrTotalprice() {
        return orTotalprice;
    }


    public void setOrTotalprice(Double orTotalprice) {
        this.orTotalprice = orTotalprice;
    }


    public Integer getShopId() {
        return shopId;
    }


    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }


    public List<PayDetail> getPd() {
        return pd;
    }

    public void setPd(List<PayDetail> pd) {
        this.pd = pd;
    }

    public String getCtName() {
        return ctName;
    }

    public void setCtName(String ctName) {
        this.ctName = ctName;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public List<PayMethod> getPm() {

      return pm;
    }

    public void setPm(List<PayMethod> pm) {
        this.pm = pm;
    }
}