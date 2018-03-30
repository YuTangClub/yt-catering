package cn.yutang.client.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BackendIndexController {

	@RequestMapping(value = "/")
	public String index(){
		return "index";
	}

	@RequestMapping(value = "/{page}")
	public String toPage(@PathVariable String page){
		return page;
	}

	@RequestMapping(value = "/pages/{page}")
	public String toPageOne(@PathVariable String page){
		return "pages/"+page;
	}

	@RequestMapping(value = "/pages/{page1}/{page2}")
	public String toPageTwo(@PathVariable String page1, @PathVariable String page2){
		return "pages/"+page1+"/"+page2;
	}
}

