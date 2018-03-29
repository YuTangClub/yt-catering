package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.FoodMenuMapper;
import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class OrderServiceImpl implements IOrderService {

    @Autowired
	FoodMenuMapper foodMenuMapper;
    @Override
    public MessageResult<Food> selectByPage(Page page) {
        MessageResult<Food> messageResult =new MessageResult<>();
        List<Food> list= foodMenuMapper.selectByPage(page);
        int count =foodMenuMapper.selectCount();
        messageResult.setCount(count);
        messageResult.setData(list);
        return messageResult;
    }
}
