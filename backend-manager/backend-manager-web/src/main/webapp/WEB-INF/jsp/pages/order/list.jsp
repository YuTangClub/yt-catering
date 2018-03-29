<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<html>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>订单列表-后台管理系统-Admin 1.0</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<div class="weadmin-nav">
			<span class="layui-breadcrumb">
        <a href="">首页</a>
        <a href="">订单管理</a>
        <a><cite>订单列表</cite></a>
      </span>
    <a class="layui-btn layui-btn-sm" style="line-height:1.6em;margin-top:3px;float:right" href="javascript:location.replace(location.href);" title="刷新">
        <i class="layui-icon" style="line-height:30px">ဂ</i></a>
</div>
<div class=weadin-body">
    <span class="layui-badge-rim">本月订单总额：${MonthCount}</span>
    <span class="layui-badge-rim">本日订单总额：${DayCount}</span>
</div>
<div class="weadmin-body">
    <div class="layui-row">
        <form class="layui-form layui-col-md12 we-search" onsubmit="return false">
            <div class="layui-inline">
                <input class="layui-input" placeholder="开始日" name="orBegintime" id="start">
            </div>
            <div class="layui-inline">
                <input class="layui-input" placeholder="截止日" name="orEndtime" id="end">
            </div>
            <div class="layui-inline">
                <input type="text" name="tbId" placeholder="请输入餐桌号" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-inline">
                <input type="text" name="orId" placeholder="请输入订单号" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-input-inline" type="width:100px">
                <select name="pmId" >
                    <option value="">下单方式</option>
                    <c:forEach items="${payMethodSession}" var="mm">
                    <option value="${mm.pmId}">${mm.pmName}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="layui-input-inline" type="width:100px">
                <select name="ctId" >
                    <option value="">客户类型</option>
                    <c:forEach items="${customerSession}" var="cm">
                        <option value="${cm.ctId}">${cm.ctName}</option>
                    </c:forEach>
                </select>
            </div>

            <button class="layui-btn" lay-submit lay-filter="sreach"><i class="layui-icon">&#xe615;</i></button>
        </form>
    </div>
    <table class="layui-hide" id="articleList" ></table>





</div>
<script type="text/html" id="pmTpl">
    {{#  layui.each(d.pm, function(index, item){ }}
        <span>{{ item.pmName }}</span>
    {{#  }); }}
</script>

<script>
    layui.extend({
        admin: '{/}../../static/js/admin'
    });
    layui.use(['laydate','jquery','admin','table','form'], function() {
        var laydate = layui.laydate,
            $ = layui.jquery,
            admin = layui.admin,
            table = layui.table,
            form = layui.form;

        laydate.render({
            elem:'#start',
            type:'datetime'

            })
        laydate.render({
            elem:'#end',
            type:'datetime'

        })
        table.render({
            //容器元素
            elem: '#articleList',
            //最小宽度
            cellMinWidth: 80,

            //列,field\title属于列属性，cols属于表格属性
            cols: [
                [{
                    type: 'checkbox'
                }, {
                    field: 'shopId', title: '门店', sort: true
                }, {
                    field: 'orId', title: '订单号'
                }, {
                    field: 'tbId', title: '餐桌号'
                }, {
                    field: 'pm', title: '下单方式',templet:'#pmTpl'
                }, {
                    field: 'ctName', title: '客户类型'
                }, {
                    field: 'orTotalprice', title: '订单金额'
                }, {
                    field: 'orEndtime', title: '订单时间'
                }, {
                    field: 'orStatus', title: '订单状态'
                }]
            ],
            //通过URL进行数据绑定
            url: 'orderList',
            //是否开启分页
            page: true,
            limit: 5,
            limits: [5, 10, 15],
            done:function () {

                $("[data-field='orStatus']").children().each(function(){
                    if($(this).text()=='1'){
                        $(this).text("已付款")
                    }else if($(this).text()=='2'){
                        $(this).text("未付款")
                    }
                })

            }

        });
        form.on('submit(sreach)',function (data) {
           table.reload('articleList', {
                url: 'orderList'
                ,where: data.field,
               page:{
                    curr:1
               }
            });

        })
    }); 

</script>

</body>

</html>