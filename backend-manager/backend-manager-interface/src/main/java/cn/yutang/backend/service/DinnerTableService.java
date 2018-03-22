package cn.yutang.backend.service;


import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.DinnerTable;
import cn.yutang.backend.pojo.vo.DinnerTableCustom;
import cn.yutang.backend.pojo.vo.LikeQuery;

import java.util.List;

/**
 * 商品的业务逻辑层接口
 */
public interface DinnerTableService {
    /**
     *
     * @param page
     * @return
     */
    List<DinnerTableCustom> listDinnerTable(Page page, LikeQuery query);

    /**
     *
     * @return
     */
    long countDinnerTable(LikeQuery query);

    /**
     *
     * @param ids
     * @return
     */
    int batchUpdate(List<Long> ids);

    int updateDinnerTableStatus(DinnerTable dinnertable);

    int searchDinnerTableByTbName(DinnerTable dinnertable);

    void addDinnerTable(DinnerTable dinnertable);

    DinnerTable findDinnerTableByTbId(Long tbId);

    void updateDinnerTable(DinnerTable dinnertable);
}
