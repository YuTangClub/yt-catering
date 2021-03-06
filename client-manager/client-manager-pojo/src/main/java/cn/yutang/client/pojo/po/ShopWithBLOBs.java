package cn.yutang.client.pojo.po;

import java.io.Serializable;

public class ShopWithBLOBs extends Shop implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Shop.shop_address
     *
     * @mbg.generated
     */
    private String shopAddress;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column Shop.shop_announce
     *
     * @mbg.generated
     */
    private String shopAnnounce;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Shop
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Shop.shop_address
     *
     * @return the value of Shop.shop_address
     *
     * @mbg.generated
     */
    public String getShopAddress() {
        return shopAddress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Shop.shop_address
     *
     * @param shopAddress the value for Shop.shop_address
     *
     * @mbg.generated
     */
    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress == null ? null : shopAddress.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column Shop.shop_announce
     *
     * @return the value of Shop.shop_announce
     *
     * @mbg.generated
     */
    public String getShopAnnounce() {
        return shopAnnounce;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column Shop.shop_announce
     *
     * @param shopAnnounce the value for Shop.shop_announce
     *
     * @mbg.generated
     */
    public void setShopAnnounce(String shopAnnounce) {
        this.shopAnnounce = shopAnnounce == null ? null : shopAnnounce.trim();
    }
}