package cn.yutang.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UserController {

	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String index(){
		return "index";
	}

	@RequestMapping(value = "/{page}",method = RequestMethod.GET)
	public String toPage(@PathVariable String page){
		return page;
	}

	@RequestMapping(value = "/pages/{page}",method = RequestMethod.GET)
	public String toPageOne(@PathVariable String page){
		return "pages/"+page;
	}

	@RequestMapping(value = "/pages/{page1}/{page2}",method = RequestMethod.GET)
	public String toPageTwo(@PathVariable String page1, @PathVariable String page2){
		return "pages/"+page1+"/"+page2;
	}




}
