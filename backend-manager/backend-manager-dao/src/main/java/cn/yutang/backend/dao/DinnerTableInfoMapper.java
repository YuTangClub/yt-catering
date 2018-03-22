package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.vo.DinnerTableInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DinnerTableInfoMapper {
    List<DinnerTableInfo> selectByPage(@Param("ttId") Integer ttId, @Param("page") Page page);
}
