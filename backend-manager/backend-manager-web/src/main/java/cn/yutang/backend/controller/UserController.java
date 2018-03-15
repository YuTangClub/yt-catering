package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	IShopService shopService;


	@ResponseBody
	@RequestMapping(value = "/verify",method = RequestMethod.POST)
	public String verifyAccount(Shop shop, HttpSession session){

		List<Shop> shops = shopService.verifyShop(shop);
		if (shops.size() > 0){
			shop = shops.get(0);
			session.setAttribute("sessionShop",shop);
			return "1";
		}

		return "0";
	}
}
