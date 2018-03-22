<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>鱼塘餐饮 后台管理 v1.0</title>
    <meta name="Description" content="基于layUI数据表格操作"/>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/dinnertablelist.js" charset="utf-8"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/lib/layui/lay/modules/form.js"></script>
    <!--<script type="text/javascript" src="../../static/js/admin.js"></script>-->
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>


    <![endif]-->
    <style type="text/css">
        .layui-form-switch {
            width: 55px;
        }
        .layui-form-switch em {
            width: 40px;
        }
        .layui-form-onswitch i {
            left: 45px;
        }
        body{overflow-y: scroll;}
    </style>
</head>

<body>
<div class="weadmin-nav">
			<span class="layui-breadcrumb">
        <a href="">首页</a>
        <a href="">餐桌管理</a>
        <a>
          <cite>餐桌列表</cite></a>
      </span>
    <a class="layui-btn layui-btn-sm" style="line-height:1.6em;margin-top:3px;float:right" href="javascript:location.replace(location.href);" title="刷新">
        <i class="layui-icon" style="line-height:30px">&#x1002;</i></a>
</div>
<div class="weadmin-body">
    <div class="layui-row">
        <form class="layui-form layui-col-md12 we-search" onsubmit="return false;">
            餐桌搜索：
            <div class="layui-inline">
                <input type="text" id="keyWord" name="keyWord" placeholder="请输入餐桌名关键字" autocomplete="off" class="layui-input">
            </div>
            <button class="layui-btn" lay-submit="" lay-filter="search" data-type="reload"><i class="layui-icon">&#xe615;</i></button>
        </form>
    </div>
    <div class="weadmin-block demoTable">
        <button class="layui-btn layui-btn-danger" data-type="getCheckData"><i class="layui-icon">&#xe640;</i>批量删除</button>
        <button class="layui-btn" onclick="WeAdminShow('添加餐桌','${pageContext.request.contextPath}/pages/dinnertable/add',600,400)"><i class="layui-icon">&#xe61f;</i>添加</button>
    </div>
    <table class="layui-hide" id="dinnertableList"></table>



    <script type="text/html" id="operateTpl">
        <a title="编辑" onclick="WeAdminEdit('编辑','${pageContext.request.contextPath}/toEditDinnerTable?tbId={{d.tbId}}', 2, 600, 400)" href="javascript:;">
            <i class="layui-icon">&#xe642;</i>
        </a>
        <a title="删除" onclick="dinnerTable_del(this,'{{d.tbId}}')" href="javascript:;">
            <i class="layui-icon">&#xe640;</i>
        </a>
    </script>
    <script type="text/html" id="shelfTpl">
        <form class="layui-form" onsubmit="return false;">
        <input type="checkbox" value="{{d.tbId}}" lay-filter="lockDemo"  lay-skin="switch" lay-text="空闲|使用中" {{ 0==d.tbStatus?'checked':''}}/>
        </form>
    </script>

</div>
</body>

</html>