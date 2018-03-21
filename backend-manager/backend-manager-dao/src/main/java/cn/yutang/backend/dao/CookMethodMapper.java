package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.po.CookMethod;
import cn.yutang.backend.pojo.po.CookMethodExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CookMethodMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    long countByExample(CookMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int deleteByExample(CookMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer cmId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int insert(CookMethod record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int insertSelective(CookMethod record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    List<CookMethod> selectByExample(CookMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    CookMethod selectByPrimaryKey(Integer cmId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") CookMethod record, @Param("example") CookMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") CookMethod record, @Param("example") CookMethodExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(CookMethod record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table CookMethod
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(CookMethod record);
}