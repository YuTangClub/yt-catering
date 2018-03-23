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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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


	//编辑food
	@ResponseBody
	@RequestMapping("/edit.do")
	public String editFoodSelective(Food food){

		//通过id以及可选条件，设置food的属性
		Integer result = foodService.setFoodByIdSelective(food);
		if(result > 0){
			return "1";
		}

		return "0";
	}

	@ResponseBody
	@RequestMapping("/setRecommend.do")
	public String setRecommend(@RequestParam("Ids[]") List<Long> Ids){

		//批量改变recommend状态
		Integer count = foodService.setRecommendByIds(Ids);
		if(count !=0){
			//如果更改记录大于0，返回1
			return ""+count;
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

		//将count放入model当中
		model.addAttribute("count",count);

		return result;
	}

	@ResponseBody
	@RequestMapping("/delete.do")
	public String deleteFoodDo(@RequestParam("Ids[]") List<Long> Ids){

		//批量删除food
		Integer count = foodService.deleteFoods(Ids);
		if(count !=0){
			//如果删除记录大于0，返回1
			return ""+count;
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping("/onsale.set")
	public String setOnSale(@RequestParam("Ids[]") List<Long> Ids,Food food){

		//批量设置food的状态【可能是上下架，可能是推荐】
		Integer count = foodService.setFoodStatusByIds(Ids,food);
		if(count !=0){
			//如果删除记录大于0，返回1
			return ""+count;
		}
		return "0";
	}
}
