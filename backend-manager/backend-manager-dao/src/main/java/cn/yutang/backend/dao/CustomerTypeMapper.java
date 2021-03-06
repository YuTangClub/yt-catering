package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.CustomerType;
import cn.yutang.backend.pojo.po.CustomerTypeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CustomerTypeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    long countByExample(CustomerTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int deleteByExample(CustomerTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer ctId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int insert(CustomerType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int insertSelective(CustomerType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    List<CustomerType> selectByExample(CustomerTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    CustomerType selectByPrimaryKey(Integer ctId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") CustomerType record, @Param("example") CustomerTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") CustomerType record, @Param("example") CustomerTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(CustomerType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CustomerType
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(CustomerType record);
}