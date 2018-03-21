package cn.yutang.backend.pojo.dto;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Scope(value = "prototype")
public class Page implements Serializable{
	private Integer page = 1;
	private Integer limit;
	private Integer offset;

	public Integer getOffset() {
		return (page-1)*limit;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}
}
