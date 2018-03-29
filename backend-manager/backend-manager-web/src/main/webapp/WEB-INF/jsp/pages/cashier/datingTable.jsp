<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/3/26
  Time: 9:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.text.*" %>
<%@ page import="java.util.*" %>
<%@ page import="org.springframework.ui.Model" %>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="../../static/css/font.css">
    <link rel="stylesheet" href="../../static/css/weadmin.css">
    <link rel="stylesheet" href="../../static/css/layui.css">
    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="../../lib/layui/layui.js" charset="utf-8"></script>
</head>
<body>
<div id="tbList">

    <c:forEach items="${datingTable.data}" var="dt">
        <div id="${dt.tbId}" type="button"
             style="height: 150px;width: 150px;background: ${dt.tbStatus==0?"#8fb82c":"red"};margin:20px;border:1px;padding:5px;float: left;color: #FFFFFF;">
            <div style=" height: 20px;width: 60px;margin-top: 0px;margin-left: 0px;line-height: 5px;"><p>${dt.tbId}号桌</p></div>
            <div style=" height: 20px;width: 100px; margin-top: 0px;margin-left: 25px;text-align: center;">
                <c:if test="${dt.ttId==1}"><p>大厅(${dt.ttName})</p></c:if>
                <c:if test="${dt.ttId==2}"><p>卡包(${dt.ttName})</p></c:if>
                <c:if test="${dt.ttId==3}"><p>包厢(${dt.ttName})</p></c:if>
            </div>
            <div style=" height: 10px;width: 80px; margin-top: 30px;margin-left: 35px;text-align: center;">
                <c:if test="${dt.tbStatus==0}">
                    <p>空闲</p>
                </c:if>
                <c:if test="${dt.tbStatus!=0}">
                    <p id="_${dt.tbId}"></p>
                    <script>
                        $(function () {
                            var t_${dt.tbId} = orderTime("${dt.orderDate}");
                            $('#_${dt.tbId}').text(t_${dt.tbId});
                            function orderTime(orderDate){
                                var beginTime=new Date(orderDate);
                                var now =new Date();
                                var sec=14*60*60+parseInt(now-beginTime)/1000;//java内CST被认为是美国时间,而不是中国时间,时差为14小时
                                var hour=parseInt(sec/60/60);//取整即小时
                                var min=parseInt(sec/60)%60;//取余即分钟
                                return hour<1?(min+"分"):(hour+"小时"+min+"分");
                            }
                        })
                    </script>
                </c:if>
            </div>
        </div>
    </c:forEach>
</div>
<div class="clear"></div>
<div id="tablePage" style="position: fixed;bottom: ${datingTable.data.size()<6?'30%':'10%'};"></div>
<script>
    layui.use(['layer','laypage'], function(){
        var laypage = layui.laypage,layer = layui.layer;
        var count = ${datingTable.count};
        var curr = ${datingPage.page};
        //执行一个laypage实例
        laypage.render({
            elem: 'tablePage' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: count //数据总数，从服务端得到
            ,curr:curr
            ,jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if(!first){
                    location.href = "${pageContext.request.contextPath}/pages/cashier/datingTable.do?page="+obj.curr+"&limit="+obj.limit;
                }
            }
        });
    });
    function tableController() {
        alert("进来了")
    }
</script>
</body>

</html>
