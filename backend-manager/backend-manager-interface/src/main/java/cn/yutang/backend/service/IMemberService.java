package cn.yutang.backend.service;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Member;

import java.util.List;

public interface IMemberService {

    // 由查询条件返回Member的分页数据
    List<Member> listMemberByPage(Page page, Member member);

    //获取符合要求的总数
    Integer countTotal(Member member);
}
