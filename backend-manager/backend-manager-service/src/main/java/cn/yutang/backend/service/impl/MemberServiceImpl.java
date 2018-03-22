package cn.yutang.backend.service.impl;

import cn.yutang.backend.dao.MemberMapper;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Member;
import cn.yutang.backend.service.IMemberService;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements IMemberService {

    @Autowired
    MemberMapper memberMapper;

    @Override
    public List<Member> listMemberByPage(Page page, Member member) {
        return memberMapper.listMemberByPage(page,member);
    }

    @Override
    public Integer countTotal(Member member) {
        return memberMapper.countTotal(member);
    }

}
