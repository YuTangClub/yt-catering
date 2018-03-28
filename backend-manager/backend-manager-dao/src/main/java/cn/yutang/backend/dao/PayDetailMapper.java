package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.PayDetail;
import cn.yutang.backend.pojo.po.PayDetailExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PayDetailMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    long countByExample(PayDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int deleteByExample(PayDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(String pdId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int insert(PayDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int insertSelective(PayDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    List<PayDetail> selectByExample(PayDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    PayDetail selectByPrimaryKey(String pdId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") PayDetail record, @Param("example") PayDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") PayDetail record, @Param("example") PayDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(PayDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PayDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(PayDetail record);
}