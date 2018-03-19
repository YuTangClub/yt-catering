package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.vo.DinnerTableInfo;

import java.util.List;

public interface DinnerTableInfoMapper {
    List<DinnerTableInfo> selectByTtId(Integer ttId);
}
