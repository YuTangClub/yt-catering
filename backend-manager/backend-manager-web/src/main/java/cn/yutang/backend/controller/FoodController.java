package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.po.Foodtype;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IFoodService;
import cn.yutang.backend.service.IFoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/pages/food")
public class FoodController {

	@Autowired
	IFoodService foodService;
	
	@Autowired
	IFoodTypeService foodTypeService;
	
	@RequestMapping("/list")
	public String listFood(HttpSession session, Model model){

		Shop shop = (Shop) session.getAttribute("sessionShop");
		List<Foodtype> foodtypeList = foodTypeService.listFoodtypeByShop(shop);
		model.addAttribute("foodtypeList",foodtypeList);
		return "/pages/food/list";
	}
}
