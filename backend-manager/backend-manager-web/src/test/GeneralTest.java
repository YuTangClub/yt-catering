

import cn.yutang.backend.dao.FoodCustomMapper;
import cn.yutang.backend.dao.FoodMapper;
import cn.yutang.backend.dao.MemberMapper;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.Food;
import cn.yutang.backend.pojo.po.Member;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:spring/spring-service.xml","classpath*:spring/spring-dao.xml"})
public class GeneralTest {

	@Autowired
    MemberMapper memberMapper;



	@Test
	public void verifyShop() {

        Member member=new Member();
        member.setMember_phone("55");
		Page page=new Page();
		page.setPage(1);
		page.setLimit(10);

		memberMapper.listMemberByPage(page,member);



        System.out.println(memberMapper.countTotal(member));


	}
}