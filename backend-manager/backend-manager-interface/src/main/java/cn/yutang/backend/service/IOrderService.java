package cn.yutang.backend.service;

import cn.yutang.backend.pojo.po.Food;

import java.util.List;

public interface IOrderService {
    List<Food> selectByExample();
}
