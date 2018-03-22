package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.DinnerTableCustomMapper;
import cn.yutang.backend.dao.DinnerTableMapper;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.DinnerTable;
import cn.yutang.backend.pojo.po.DinnerTableExample;
import cn.yutang.backend.pojo.vo.DinnerTableCustom;
import cn.yutang.backend.pojo.vo.LikeQuery;
import cn.yutang.backend.service.DinnerTableService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("dinnerTableService")
public class DinnerTableServiceImpl implements DinnerTableService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //TbItemMapper逆向自动生成的，TbItemCustomMapper自定义的，作为补充
    @Autowired
    private DinnerTableCustomMapper dinnerTableCustomDao;
    @Autowired
    private DinnerTableMapper dinnerTableDao;

    @Override
    public List<DinnerTableCustom> listDinnerTable(Page page, LikeQuery query) {
        List<DinnerTableCustom> dinnerTableList = null;
        try {
            dinnerTableList = dinnerTableCustomDao.selectByPage(page,query);
        } catch (Exception e) {
            logger.debug(e.getMessage(), e);
        }
        return dinnerTableList;
    }

    @Override
    public long countDinnerTable(LikeQuery query) {
        long count = 0;
        try {
            count = dinnerTableCustomDao.countDinnertable(query);
        } catch (Exception e) {
            logger.debug(e.getMessage(), e);
        }
        return count;
    }

    @Override
    public int batchUpdate(List<Long> ids) {
        int i = 0;
        try {
            //创建对象用于更新
            DinnerTable record = new DinnerTable();
            record.setTbStatus(2);
            //创建模板
            DinnerTableExample example = new DinnerTableExample();
            //创建内部类实例
            DinnerTableExample.Criteria criteria = example.createCriteria();
            criteria.andTbIdIn(ids);
            //执行更新
            //i就是受到影响的行数
            i = dinnerTableDao.updateByExampleSelective(record, example);
        } catch (Exception e) {
            logger.debug(e.getMessage(), e);
        }
        return i;
    }

    @Override
    public int updateDinnerTableStatus(DinnerTable dinnertable) {
        int i = 0;
        try {
            //i就是受到影响的行数
            i = dinnerTableDao.updateByPrimaryKeySelective(dinnertable);
        } catch (Exception e) {
            logger.debug(e.getMessage(), e);
        }
        return i;
    }

    @Override
    public int searchDinnerTableByTbName(DinnerTable dinnertable) {
        int i = 0;
        try {
            //i就是受到影响的行数
            i = dinnerTableCustomDao.searchDinnerTableByTbName(dinnertable);
        } catch (Exception e) {
            logger.debug(e.getMessage(), e);
        }
        return i;
    }

    @Override
    public void addDinnerTable(DinnerTable dinnertable) {
        dinnerTableDao.insert(dinnertable);
    }

    @Override
    public DinnerTable findDinnerTableByTbId(Long tbId) {
        return dinnerTableDao.selectByPrimaryKey(tbId);
    }

    @Override
    public void updateDinnerTable(DinnerTable dinnertable) {
        dinnerTableDao.updateByPrimaryKeySelective(dinnertable);
    }
}
