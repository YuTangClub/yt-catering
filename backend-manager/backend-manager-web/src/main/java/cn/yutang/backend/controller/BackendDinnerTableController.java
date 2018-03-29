package cn.yutang.backend.controller;

import cn.yutang.backend.pojo.dto.MessageResult;
import cn.yutang.backend.pojo.dto.Page;
import cn.yutang.backend.pojo.po.DinnerTable;
import cn.yutang.backend.pojo.po.Shop;
import cn.yutang.backend.pojo.util.QrFtpUtils;
import cn.yutang.backend.pojo.vo.DinnerTableCustom;
import cn.yutang.backend.pojo.vo.LikeQuery;
import cn.yutang.backend.service.DinnerTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
public class BackendDinnerTableController {
    @Autowired
    private DinnerTableService dinnerTableService;

    @ResponseBody
    @RequestMapping(value = "/dinnerTable",method = RequestMethod.GET)
    public MessageResult<DinnerTableCustom> listDinnerTableToJson(HttpSession session, Page page, LikeQuery query) {

        Shop sessionShop= (Shop) session.getAttribute("sessionShop");
        if(sessionShop!=null){
            query.setShopId(sessionShop.getShopId());
        }
        //从后台把所有商品的数据查询到List，把List封装MessageResult
        MessageResult<DinnerTableCustom> messageResult = new MessageResult<DinnerTableCustom>();
        try {
            //调用业务逻辑层方法查询所有商品列表(page=? litmit=?)
            List<DinnerTableCustom> dinnerTableList = dinnerTableService.listDinnerTable(page,query);
            //调用业务逻辑层查询所有记录的条数（符合条件：多条件查询，模糊查询，排序等等，）
            //凡是涉及带条件查询的时候，要注意countDinnerTable()的参数
            long count = dinnerTableService.countDinnerTable(query);
            //封装MessageResult
            messageResult.setCode(0);
            messageResult.setCount(count);
            messageResult.setMsg("success");
            messageResult.setData(dinnerTableList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return messageResult;
    }

    @ResponseBody
    @RequestMapping(value = "/dinnerTable/batch",method = RequestMethod.POST)
    public int batchUpdate(@RequestParam("ids[]") List<Long> ids){
        int i = 0;
        try {
            //调用业务逻辑层方法
            i = dinnerTableService.batchUpdate(ids);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return i;
    }
    @ResponseBody
    @RequestMapping(value = "/editStatus")
    public int updateDinnerTableStatus(DinnerTable dinnertable){
        int i = 0;
        try {
            //调用业务逻辑层方法
            i = dinnerTableService.updateDinnerTableStatus(dinnertable);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return i;
    }
    @ResponseBody
    @RequestMapping(value = "/dinnerTableDel")
    public int dinnerTableDel(DinnerTable dinnertable){
        int i = 0;
        try {
            //调用业务逻辑层方法
            dinnertable.setTbStatus(2);
            i = dinnerTableService.updateDinnerTableStatus(dinnertable);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return i;
    }

    @ResponseBody
    @RequestMapping(value = "/searchTbNameOrInsert")
    public String searchTbNameOrInsert(DinnerTable dinnertable){
        Integer i = 0;
        try {
            i=dinnerTableService.searchDinnerTableByTbName(dinnertable);
            //调用业务逻辑层方法
           if(i==0){
               dinnertable.setTbStatus(0);
               dinnerTableService.addDinnerTable(dinnertable);
           }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return i.toString();
    }

    /*
	 * 转到待更新指定餐桌页面
	 */
    @RequestMapping("/toEditDinnerTable")
    public String toEditDinnerTable(HttpServletRequest request, HttpSession session) throws IOException {
       Long tbId= Long.valueOf(request.getParameter("tbId"));

        String realPath = request.getServletContext().getRealPath("/static/attachments/")+"/";

        DinnerTable updateDinnerTable=dinnerTableService.findDinnerTableByTbId(tbId);
        if(updateDinnerTable!=null){
            if(updateDinnerTable.getTbQrcode()!=null){
            }else{
                String filename= QrFtpUtils.qrFtpUpload(updateDinnerTable,realPath);
                String path="http://www.yummm.cn/img/"+filename;
                updateDinnerTable.setTbQrcode(path);
                dinnerTableService.updateDinnerTable(updateDinnerTable);
            }
        }
        session.setAttribute("updateDinnerTable",updateDinnerTable);
        return "pages/dinnertable/edit";
    }
    @ResponseBody
    @RequestMapping(value = "/updateDinnerTable")
    public String updateDinnerTable(DinnerTable dinnertable){
        dinnerTableService.updateDinnerTable(dinnertable);
        return "0";
    }
    @ResponseBody
    @RequestMapping(value = "/qrcodeImgDownload")
    public String qrcodeImgDownload(DinnerTable dinnertable){
        /*Boolean result= QrFtpUtils.qrFtpDownload(dinnertable);
        if(result){
            return "0";
        }else {
        }*/
        return "0";
    }

}
