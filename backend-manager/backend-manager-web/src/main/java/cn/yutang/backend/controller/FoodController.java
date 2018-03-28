package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.FoodType;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.service.IFoodService;
import cn.yutang.backend.service.IFoodTypeService;
import cn.yutang.commons.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
		session.setAttribute("foodtypeList",foodtypeList);

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

	//编辑food
	@ResponseBody
	@RequestMapping("/add.do")
	public String addFood(Food food){

		//通过id以及可选条件，设置food的属性
		Integer result = foodService.addFood(food);
		if(result > 0){
			return "1";
		}

		return "0";
	}

	//编辑food
	@ResponseBody
	@RequestMapping("/addcategory.do")
	public String addFoodType(FoodType foodType){

		//通过id以及可选条件，设置food的属性
		Integer result = foodTypeService.addFoodType(foodType);
		if(result > 0){
			return "1";
		}

		return "0";
	}

	@ResponseBody
	@RequestMapping("upload")
	public Map<String,Object> upload(MultipartFile file){

		Map<String,Object> map = new HashMap<>();
		try {
			Prop prop = new Prop("db.properties");
			String imgHost = prop.get("img.host");
			String filename = FileUtils.createRandomeName(file.getOriginalFilename());
			InputStream inputStream = file.getInputStream();
			boolean flag = FileUtils.uploadFile(filename,inputStream,"db.properties");
			if (flag) {
				map.put("code",0);
				map.put("src",imgHost+filename);
				map.put("imgName",file.getOriginalFilename());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return map;
	}

	@ResponseBody
	@RequestMapping("/list.do")
	public MessageResult listFoodDo(HttpSession session, Page page, Food food){

		//获取商品集合
		Shop shop = (Shop) session.getAttribute("sessionShop");
		List<Food> foodList = foodService.listFoodByPage(page,food);
		Integer count = foodService.countTotal(food);

		//将数据封装如PageResult
		MessageResult<Food> result = new MessageResult();
		result.setCount(count);
		result.setData(foodList);

		//将count放入model当中
		session.setAttribute("count",count);

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

	//设置food的状态
	@ResponseBody
	@RequestMapping("/setStatus.do")
	public String setStatus(@RequestParam("Ids[]") List<Long> Ids,Food food){

		//批量设置food的状态【可能是上下架，可能是推荐】
		Integer count = foodService.setFoodStatusByIds(Ids,food);
		if(count !=0){
			//如果删除记录大于0，返回1
			return ""+count;
		}
		return "0";
	}

	//封装foodType，返回给前台
	@ResponseBody
	@RequestMapping("clist.do")
	public MessageResult<FoodType> listFoodTypeDo(HttpSession session, Page page, FoodType foodType){

		MessageResult<FoodType> result = new MessageResult<>();
		Shop shop = (Shop) session.getAttribute("sessionShop");
		foodType.setShopId(shop.getShopId());
		List<FoodType> foodTypeList = foodTypeService.listFoodTypeByPage(page,foodType);
		Integer count = foodTypeService.getTotalCount(foodType);
		result.setCount(count);
		result.setData(foodTypeList);
		session.setAttribute("ftCount",count);
		return result;
	}
}
