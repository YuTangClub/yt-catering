package cn.yutang.backend.pojo.po;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.Serializable;
@Component
@Scope(value = "prototype")
public class Foodorderdetail implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrderDetail.odt_id
     *
     * @mbg.generated
     */
    private String odtId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrderDetail.or_id
     *
     * @mbg.generated
     */
    private String orId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrderDetail.fd_id
     *
     * @mbg.generated
     */
    private String fdId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrderDetail.fd_count
     *
     * @mbg.generated
     */
    private Integer fdCount;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrderDetail.cook_method
     *
     * @mbg.generated
     */
    private String cookMethod;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column FoodOrderDetail.shop_id
     *
     * @mbg.generated
     */
    private String shopId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrderDetail.odt_id
     *
     * @return the value of FoodOrderDetail.odt_id
     *
     * @mbg.generated
     */
    public String getOdtId() {
        return odtId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrderDetail.odt_id
     *
     * @param odtId the value for FoodOrderDetail.odt_id
     *
     * @mbg.generated
     */
    public void setOdtId(String odtId) {
        this.odtId = odtId == null ? null : odtId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrderDetail.or_id
     *
     * @return the value of FoodOrderDetail.or_id
     *
     * @mbg.generated
     */
    public String getOrId() {
        return orId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrderDetail.or_id
     *
     * @param orId the value for FoodOrderDetail.or_id
     *
     * @mbg.generated
     */
    public void setOrId(String orId) {
        this.orId = orId == null ? null : orId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrderDetail.fd_id
     *
     * @return the value of FoodOrderDetail.fd_id
     *
     * @mbg.generated
     */
    public String getFdId() {
        return fdId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrderDetail.fd_id
     *
     * @param fdId the value for FoodOrderDetail.fd_id
     *
     * @mbg.generated
     */
    public void setFdId(String fdId) {
        this.fdId = fdId == null ? null : fdId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrderDetail.fd_count
     *
     * @return the value of FoodOrderDetail.fd_count
     *
     * @mbg.generated
     */
    public Integer getFdCount() {
        return fdCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrderDetail.fd_count
     *
     * @param fdCount the value for FoodOrderDetail.fd_count
     *
     * @mbg.generated
     */
    public void setFdCount(Integer fdCount) {
        this.fdCount = fdCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrderDetail.cook_method
     *
     * @return the value of FoodOrderDetail.cook_method
     *
     * @mbg.generated
     */
    public String getCookMethod() {
        return cookMethod;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrderDetail.cook_method
     *
     * @param cookMethod the value for FoodOrderDetail.cook_method
     *
     * @mbg.generated
     */
    public void setCookMethod(String cookMethod) {
        this.cookMethod = cookMethod == null ? null : cookMethod.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column FoodOrderDetail.shop_id
     *
     * @return the value of FoodOrderDetail.shop_id
     *
     * @mbg.generated
     */
    public String getShopId() {
        return shopId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column FoodOrderDetail.shop_id
     *
     * @param shopId the value for FoodOrderDetail.shop_id
     *
     * @mbg.generated
     */
    public void setShopId(String shopId) {
        this.shopId = shopId == null ? null : shopId.trim();
    }
}