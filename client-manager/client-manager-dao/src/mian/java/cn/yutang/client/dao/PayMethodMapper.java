package cn.yutang.client.dao;

import cn.yutang.client.pojo.po.PayMethod;
import cn.yutang.client.pojo.po.PayMethodExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PayMethodMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    long countByExample(PayMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int deleteByExample(PayMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer pmId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int insert(PayMethod record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int insertSelective(PayMethod record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    List<PayMethod> selectByExample(PayMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    PayMethod selectByPrimaryKey(Integer pmId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") PayMethod record, @Param("example") PayMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") PayMethod record, @Param("example") PayMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(PayMethod record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayMethod
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(PayMethod record);
}