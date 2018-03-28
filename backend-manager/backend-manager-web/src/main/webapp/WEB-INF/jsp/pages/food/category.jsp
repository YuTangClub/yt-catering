<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<style type="text/css">
</style>
<head>
    <meta charset="UTF-8">
    <title>文章列表-后台管理系统-Admin 1.0</title>
    <meta name="Description" content="基于layUI数据表格操作"/>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/static/js/food/category.js" type="text/javascript"
            charset="utf-8"></script>

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

        body {
            overflow-y: scroll;
        }
    </style>
</head>

<body>
<div class="layui-tab layui-tab-brief">
    <ul class="layui-tab-title">
        <li class="layui-this">菜品分类</li>
    </ul>
    <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
            <div class="weadmin-body layui-col-md12">
                <div class="layui-row">
                    <!-- 搜索条 -->
                    <form class="layui-form layui-col-md12 we-search">
                        <label class="layui-form-label">分类搜索：</label>
                        <div class="layui-inline">
                            <input type="text" name="ftName" placeholder="请输入品类关键字" autocomplete="off"
                                   class="layui-input">
                            <input type="hidden" name="shopId" value="${sessionShop.shopId}">
                        </div>
                        <button class="layui-btn" lay-submit lay-filter="search"><i
                                class="layui-icon">&#xe615;</i></button>
                    </form>
                </div>
                <div class="weadmin-block demoTable">
                    <button class="layui-btn layui-btn-danger" data-type="getCheckData">
                        <i class="layui-icon">&#xe640;</i>批量删除
                    </button>
                    <button class="layui-btn" onclick="addFoodType('添加用户','./category-add',400,200)">
                        <i class="layui-icon">&#xe61f;</i>添加
                    </button>
                    <span class="fr" style="line-height:40px">共有数据：${ftCount} 条</span>
                </div>
                <table class="layui-hide layui-table-cell" id="typeList" lay-filter="searchResult"></table>

            </div>
        </div>
    </div>
</div>

</body>


<script type="text/html" id="operateTpl">
    <a title="编辑" onclick="WeAdminEdit('编辑','./category-add', this, 600, 400)" href="javascript:;">
        <i class="layui-icon">&#xe642;</i>
    </a>
    <a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
        <i class="layui-icon">&#xe640;</i>
    </a>
    <input type="hidden" id="ftId" name="ftId"/>
</script>

</html>