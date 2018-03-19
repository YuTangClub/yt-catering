package cn.yutang.backend.service.impl;


import cn.yutang.backend.dao.DinnerTableInfoMapper;
import cn.yutang.backend.pojo.vo.DinnerTableInfo;
import cn.yutang.backend.service.IDinnerTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DinnerTableServiceImplSdd implements IDinnerTableService {
    @Autowired
	DinnerTableInfoMapper tableInfoDao;

    @Override
    public List<DinnerTableInfo> listTables(Integer ttId) {

        return tableInfoDao.selectByTtId(ttId);
    }
}
