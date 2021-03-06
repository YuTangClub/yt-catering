package cn.yutang.client.pojo.po;

import java.io.Serializable;
import java.util.Date;

public class FoodOrders implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.or_id
     *
     * @mbg.generated
     */
    private String orId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.tb_id
     *
     * @mbg.generated
     */
    private Long tbId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.or_beginTime
     *
     * @mbg.generated
     */
    private Date orBegintime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.or_endTime
     *
     * @mbg.generated
     */
    private Date orEndtime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.or_status
     *
     * @mbg.generated
     */
    private Integer orStatus;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.or_totalPrice
     *
     * @mbg.generated
     */
    private Double orTotalprice;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.ct_id
     *
     * @mbg.generated
     */
    private Integer ctId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.shop_id
     *
     * @mbg.generated
     */
    private Integer shopId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrders.or_pcount
     *
     * @mbg.generated
     */
    private Integer orPcount;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.or_id
     *
     * @return the value of FoodOrders.or_id
     *
     * @mbg.generated
     */
    public String getOrId() {
        return orId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.or_id
     *
     * @param orId the value for FoodOrders.or_id
     *
     * @mbg.generated
     */
    public void setOrId(String orId) {
        this.orId = orId == null ? null : orId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.tb_id
     *
     * @return the value of FoodOrders.tb_id
     *
     * @mbg.generated
     */
    public Long getTbId() {
        return tbId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.tb_id
     *
     * @param tbId the value for FoodOrders.tb_id
     *
     * @mbg.generated
     */
    public void setTbId(Long tbId) {
        this.tbId = tbId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.or_beginTime
     *
     * @return the value of FoodOrders.or_beginTime
     *
     * @mbg.generated
     */
    public Date getOrBegintime() {
        return orBegintime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.or_beginTime
     *
     * @param orBegintime the value for FoodOrders.or_beginTime
     *
     * @mbg.generated
     */
    public void setOrBegintime(Date orBegintime) {
        this.orBegintime = orBegintime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.or_endTime
     *
     * @return the value of FoodOrders.or_endTime
     *
     * @mbg.generated
     */
    public Date getOrEndtime() {
        return orEndtime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.or_endTime
     *
     * @param orEndtime the value for FoodOrders.or_endTime
     *
     * @mbg.generated
     */
    public void setOrEndtime(Date orEndtime) {
        this.orEndtime = orEndtime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.or_status
     *
     * @return the value of FoodOrders.or_status
     *
     * @mbg.generated
     */
    public Integer getOrStatus() {
        return orStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.or_status
     *
     * @param orStatus the value for FoodOrders.or_status
     *
     * @mbg.generated
     */
    public void setOrStatus(Integer orStatus) {
        this.orStatus = orStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.or_totalPrice
     *
     * @return the value of FoodOrders.or_totalPrice
     *
     * @mbg.generated
     */
    public Double getOrTotalprice() {
        return orTotalprice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.or_totalPrice
     *
     * @param orTotalprice the value for FoodOrders.or_totalPrice
     *
     * @mbg.generated
     */
    public void setOrTotalprice(Double orTotalprice) {
        this.orTotalprice = orTotalprice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.ct_id
     *
     * @return the value of FoodOrders.ct_id
     *
     * @mbg.generated
     */
    public Integer getCtId() {
        return ctId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.ct_id
     *
     * @param ctId the value for FoodOrders.ct_id
     *
     * @mbg.generated
     */
    public void setCtId(Integer ctId) {
        this.ctId = ctId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.shop_id
     *
     * @return the value of FoodOrders.shop_id
     *
     * @mbg.generated
     */
    public Integer getShopId() {
        return shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.shop_id
     *
     * @param shopId the value for FoodOrders.shop_id
     *
     * @mbg.generated
     */
    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrders.or_pcount
     *
     * @return the value of FoodOrders.or_pcount
     *
     * @mbg.generated
     */
    public Integer getOrPcount() {
        return orPcount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrders.or_pcount
     *
     * @param orPcount the value for FoodOrders.or_pcount
     *
     * @mbg.generated
     */
    public void setOrPcount(Integer orPcount) {
        this.orPcount = orPcount;
    }
}