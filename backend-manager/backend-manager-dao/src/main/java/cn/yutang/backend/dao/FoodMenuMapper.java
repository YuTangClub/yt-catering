package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;

import java.util.List;

public interface FoodMenuMapper {
    List<Food> selectByPage(Page page);
}
