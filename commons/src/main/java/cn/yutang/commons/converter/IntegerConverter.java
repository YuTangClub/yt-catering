package cn.yutang.commons.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class IntegerConverter implements Converter<String,Integer> {
	@Override
	public Integer convert(String s) {
		try {
			if(!"".equals(s)){
				Integer value = Integer.valueOf(s);
				return value;
			}
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
		return null;
	}
}
