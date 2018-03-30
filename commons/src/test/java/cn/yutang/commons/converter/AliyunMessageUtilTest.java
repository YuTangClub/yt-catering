package cn.yutang.commons.converter;

import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;


/**
 * Author:   jinyefei
 * Date:     2018/3/26 16:17
 */
public class AliyunMessageUtilTest {
    /*@Test
    public  static void sendMsg() throws ClientException {
        String phoneNumber = "13967026666";
        String randomNum = createRandomNum(6);
        String jsonContent = "{\"code\":\"" + randomNum + "\"}";
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("phoneNumber", phoneNumber);
        paramMap.put("msgSign", "鱼塘餐软");
        paramMap.put("templateCode", "SMS_128885116");
        paramMap.put("jsonContent", jsonContent);
        SendSmsResponse sendSmsResponse = AliyunMessageUtil.sendSms(paramMap);
        if(!(sendSmsResponse.getCode() != null && sendSmsResponse.getCode().equals("OK"))) {
            if(sendSmsResponse.getCode() == null) {
                //这里可以抛出自定义异常
            }
            if(!sendSmsResponse.getCode().equals("OK")) {
                //这里可以抛出自定义异常
            }
        }
    }
    *//**
     * 生成随机数
     * @param code 位数
     * @return
     *//*
    public static String createRandomNum(int code){
        String randomNumStr = "";
        for(int i = 0; i < code;i ++){
            int randomNum = (int)(Math.random() * 10);
            randomNumStr += randomNum;
        }
        return randomNumStr;
    }*/
}