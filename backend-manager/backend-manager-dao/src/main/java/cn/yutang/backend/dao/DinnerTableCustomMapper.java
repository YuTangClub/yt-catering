package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.DinnerTable;
import cn.yutang.backend.pojo.vo.DinnerTableCustom;
import cn.yutang.backend.pojo.vo.LikeQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * User: DHC
 * Date: 2018/3/13
 * Time: 15:12
 * Version:V1.0
 */
public interface DinnerTableCustomMapper {

    List<DinnerTableCustom> selectByPage(@Param("page") Page page, @Param("query") LikeQuery query);

    long countDinnertable(@Param("query") LikeQuery query);

    int searchDinnerTableByTbName(DinnerTable dinnertable);
}
