package cn.yutang.backend.service;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.vo.DinnerTableInfo;

import java.util.List;

public interface IDinnerTableService {
    MessageResult<DinnerTableInfo> listTables(Integer ttId, Page page);

    MessageResult<DinnerTableInfo> listTables();
    List<DinnerTableInfo> allTables();
}
