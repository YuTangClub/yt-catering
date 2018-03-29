package cn.yutang.backend.service;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;

public interface IOrderService {
    MessageResult<Food> selectByPage(Page page);
}
