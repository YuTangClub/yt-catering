package cn.yutang.commons.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class TimeConverter implements Converter<String, Date> {
	@Override
	public Date convert(String s) {
		try {
			if(s != null && !"".equals(s)){
				Date date = new SimpleDateFormat("yyyy-MM-dd").parse(s);
				return date;
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
}
