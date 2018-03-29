package cn.yutang.backend.service.impl;


import cn.yutang.backend.dao.DinnerTableInfoMapper;
import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.vo.DinnerTableInfo;
import cn.yutang.backend.service.IDinnerTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DinnerTableServiceImplSdd implements IDinnerTableService {
    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
	DinnerTableInfoMapper tableInfoDao;

    //分页查询所有台桌数据,并封装到pageResult中
    @Override
    public MessageResult<DinnerTableInfo> listTables(Integer ttId, Page page ) {
        MessageResult<DinnerTableInfo> messageResult =new MessageResult<>();
        List<DinnerTableInfo> list=tableInfoDao.selectByPage(ttId,page);
        int count=tableInfoDao.selectCountByTtId(ttId);
        messageResult.setCount(count);
        messageResult.setData(list);
        return messageResult;
    }

    @Override
    public MessageResult<DinnerTableInfo> listTables() {
        List<DinnerTableInfo> tableList = tableInfoDao.listAll();
        MessageResult<DinnerTableInfo> messageResult =new MessageResult<>();
        messageResult.setData(tableList);
        return messageResult;
    }

    @Override
    public List<DinnerTableInfo> allTables() {
        return tableInfoDao.listAll();
    }
}
