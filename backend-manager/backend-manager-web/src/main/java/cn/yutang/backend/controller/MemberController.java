package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Member;
import cn.yutang.backend.service.IMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/pages/member")
public class MemberController {

    @Autowired
	IMemberService service;

    @RequestMapping("/memberList")
    public String listFood( Model model){

//        List<Member> memberList = service.queryMemberList();
//        model.addAttribute("memberList",memberList);
        return "/pages/member/list";
    }

    @ResponseBody
    @RequestMapping("/list.do")
    public MessageResult memberlist(Member member, Page page){

        List<Member> memberList= service.listMemberByPage(page,member);
        MessageResult<Member> result = new MessageResult();
        Integer count = service.countTotal(member);
        result.setData(memberList);
        result.setCount(count);
        return result;
    }

}
