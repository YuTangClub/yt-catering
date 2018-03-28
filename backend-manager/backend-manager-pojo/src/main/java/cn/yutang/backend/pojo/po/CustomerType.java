package cn.yutang.backend.pojo.po;

import java.io.Serializable;

public class CustomerType implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column CustomerType.ct_id
     *
     * @mbg.generated
     */
    private Integer ctId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column CustomerType.ct_name
     *
     * @mbg.generated
     */
    private String ctName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column CustomerType.shop_id
     *
     * @mbg.generated
     */
    private Integer shopId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column CustomerType.ct_id
     *
     * @return the value of CustomerType.ct_id
     *
     * @mbg.generated
     */
    public Integer getCtId() {
        return ctId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column CustomerType.ct_id
     *
     * @param ctId the value for CustomerType.ct_id
     *
     * @mbg.generated
     */
    public void setCtId(Integer ctId) {
        this.ctId = ctId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column CustomerType.ct_name
     *
     * @return the value of CustomerType.ct_name
     *
     * @mbg.generated
     */
    public String getCtName() {
        return ctName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column CustomerType.ct_name
     *
     * @param ctName the value for CustomerType.ct_name
     *
     * @mbg.generated
     */
    public void setCtName(String ctName) {
        this.ctName = ctName == null ? null : ctName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column CustomerType.shop_id
     *
     * @return the value of CustomerType.shop_id
     *
     * @mbg.generated
     */
    public Integer getShopId() {
        return shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column CustomerType.shop_id
     *
     * @param shopId the value for CustomerType.shop_id
     *
     * @mbg.generated
     */
    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }
}