package cn.yutang.backend.service;

import cn.yutang.backend.pojo.vo.DinnerTableInfo;

import java.util.List;

public interface IDinnerTableService {
    List<DinnerTableInfo> listTables(Integer ttId);
}
