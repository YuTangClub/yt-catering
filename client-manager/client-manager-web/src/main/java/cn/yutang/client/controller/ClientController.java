package cn.yutang.client.controller;

import cn.yutang.client.pojo.po.Food;
import cn.yutang.backend.service.IFoodService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class ClientController {

	@Resource
	IFoodService foodServiceDb;

//	//访问点餐首页
//	@RequestMapping(value = "/",method = RequestMethod.GET)
//	public String index(Shop shop, DinnerTable dinnerTable, HttpSession session){
//
//		shop = shopService.getShopById(shop);
//		dinnerTable = dinnerTableService.getTableById(dinnerTable);
//		session.setAttribute("sessionShop",shop);
//		session.setAttribute("sessionTable",dinnerTable);
//
//		return "index";
//	}

	@ResponseBody
	@RequestMapping("/food/{id}")
	public Food getFoodById(@PathVariable("id") int id){


		Food food = foodServiceDb.getFoodById(id);


		return food;
	}
}
