package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.FoodType;
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

		//获取菜品种类
		Shop shop = (Shop) session.getAttribute("sessionShop");
		List<FoodType> foodtypeList = foodTypeService.listFoodtypeByShop(shop);
		model.addAttribute("foodtypeList",foodtypeList);
		return "/pages/food/list";
	}

	@ResponseBody
	@RequestMapping("/edit.do")
	public String editFoodDo(Food food){

		//通过id以及可选条件，设置food的属性
		Integer result = foodService.setFoodById(food);
		if(result > 0){
			return "1";
		}

		return "0";
	}

	@ResponseBody
	@RequestMapping("/list.do")
	public MessageResult listFoodDo(HttpSession session, Page page, Food food, Model model){

		//获取商品集合
		Shop shop = (Shop) session.getAttribute("sessionShop");
		List<Food> foodList = foodService.listFoodByPage(page,food);
		Integer count = foodService.countTotal(food);
		//将数据封装如PageResult
		MessageResult<Food> result = new MessageResult();
		result.setCount(count);
		result.setData(foodList);

		return result;
	}
}
