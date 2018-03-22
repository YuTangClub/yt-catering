package cn.yutang.backend.dao;

import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Member;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MemberMapper {



    List<Member> listMemberByPage(@Param("page") Page page, @Param("member") Member member);

    Integer countTotal(@Param("member") Member member);

}
