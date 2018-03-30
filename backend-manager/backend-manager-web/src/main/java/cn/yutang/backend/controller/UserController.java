package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IShopService;
import com.aliyuncs.exceptions.ClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
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
	@ResponseBody
	@RequestMapping(value = "/sendAuthCode",method = RequestMethod.POST)
	public String  verifyAccountTel(Shop shop, HttpSession session){
		String  phoneNumber= shop.getShopTel();
		Shop findShop=null;
		findShop=shopService.searchShopByShopTel(phoneNumber);
		if(findShop!=null){
			session.setAttribute("sessionShop",findShop);
			String sendAuthCode=null;
			try {
				sendAuthCode=AliyunMessageUtil.sendMsg(phoneNumber);
				session.setAttribute("sendAuthCode",sendAuthCode);
				return "1";
			} catch (ClientException e) {
				e.printStackTrace();
			}
		}else {
			return "0";
		}
		return "0";
	}
	@ResponseBody
	@RequestMapping(value = "/verifyTel",method = RequestMethod.POST)
	public String verifyTelAccount(Shop shop, HttpSession session){
		Shop sessionShop= (Shop) session.getAttribute("sessionShop");
		String sendAuthCode= (String) session.getAttribute("sendAuthCode");
		if (sessionShop.getShopTel().equals(shop.getShopTel())&&sendAuthCode.equals(shop.getVerifyCode())){
			return "1";
		}

		return "0";
	}
}
