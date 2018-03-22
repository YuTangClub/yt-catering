<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>会员列表-后台管理系统-Admin 1.0</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/member/member.js" charset="utf-8"></script>
</head>

<body>
<div class="weadmin-nav">
			<span class="layui-breadcrumb">
        <a href="">首页</a>
        <a href="">会员管理</a>
        <a>
          <cite>会员列表</cite></a>
      </span>
    <a class="layui-btn layui-btn-sm" style="line-height:1.6em;margin-top:3px;float:right" href="javascript:location.replace(location.href);" title="刷新">
        <i class="layui-icon" style="line-height:30px">&#x1002;</i></a>
</div>
<div class="weadmin-body">
    <div class="layui-row">
        <form class="layui-form layui-col-md12 we-search" >
            会员搜索：
            <div class="layui-inline">
                <input type="text" name="member_phone" placeholder="请输入手机号" autocomplete="off" class="layui-input">
            </div>
            <button class="layui-btn" lay-submit  lay-filter="sreach"><i class="layui-icon">&#xe615;</i></button>
        </form>
    </div>
    <%--  <div class="weadmin-block">
         <button class="layui-btn layui-btn-danger" onclick="delAll()"><i class="layui-icon"></i>批量删除</button>
         <button class="layui-btn" onclick="WeAdminShow('添加用户','./add',600,400)"><i class="layui-icon"></i>添加</button>
         <span class="fr" style="line-height:40px">共有数据：88 条</span>
     </div>--%>
     <table class="layui-hide" id="memberList"></table>
</div>
<script type="text/javascript">

    layui.use(['laydate','jquery','form','table'], function() {
        var form=layui.form,
            table=layui.table,
            $ = layui.jquery;


        form.on('submit(sreach)', function(data){
            console.log(data.field)
           table.reload('memberList',{
               url:'list.do'
               ,where:data.field
           });
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });


    });

</script>
</body>

</html>