package cn.yutang.client.dao;

import cn.yutang.client.pojo.po.FoodOrderDetail;
import cn.yutang.client.pojo.po.FoodOrderDetailExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface FoodOrderDetailMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    long countByExample(FoodOrderDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int deleteByExample(FoodOrderDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(String odtId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int insert(FoodOrderDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int insertSelective(FoodOrderDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    List<FoodOrderDetail> selectByExample(FoodOrderDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    FoodOrderDetail selectByPrimaryKey(String odtId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") FoodOrderDetail record, @Param("example") FoodOrderDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") FoodOrderDetail record, @Param("example") FoodOrderDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(FoodOrderDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(FoodOrderDetail record);
}