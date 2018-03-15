package cn.yutang.backend.service;

import cn.yutang.backend.pojo.po.Shop;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IShopService {

	//验证Shop是否存在
	List<Shop> verifyShop(Shop shop);
}
