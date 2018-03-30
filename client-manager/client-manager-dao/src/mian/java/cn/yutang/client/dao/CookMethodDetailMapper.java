package cn.yutang.client.dao;

import cn.yutang.client.pojo.po.CookMethodDetail;
import cn.yutang.client.pojo.po.CookMethodDetailExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CookMethodDetailMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    long countByExample(CookMethodDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int deleteByExample(CookMethodDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer cmdId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int insert(CookMethodDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int insertSelective(CookMethodDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    List<CookMethodDetail> selectByExample(CookMethodDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    CookMethodDetail selectByPrimaryKey(Integer cmdId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") CookMethodDetail record, @Param("example") CookMethodDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") CookMethodDetail record, @Param("example") CookMethodDetailExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(CookMethodDetail record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethodDetail
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(CookMethodDetail record);
}