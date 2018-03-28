<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>欢迎页面-后台管理系统-Admin 1.0</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
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
<div class="weadmin-body">
    <form class="layui-form">
        <div class="layui-form-item">
            <label for="ftName" class="layui-form-label">
                <span class="we-red">*</span>品类名称
            </label>
            <div class="layui-input-inline">
                <input type="text" id="ftName" name="ftName" required="" lay-verify="required"
                       autocomplete="off" class="layui-input" >
            </div>
        </div>

        <input type="hidden" id="shopId" name="shopId" value="${sessionShop.shopId}">

        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-filter="edit" lay-submit>
                    提交
                </button>
            </div>
        </div>

    </form>
</div>
<script type="text/javascript">

    layui.use(['form', 'layer', 'jquery','upload'], function () {
        var form = layui.form,
            layer = layui.layer,
            $ = layui.jquery,
            upload = layui.upload;


        //监听提交
        form.on('submit(edit)', function (data) {

            debugger
            $.post(
                "addcategory.do",
                data.field,
                function (msg) {
                    debugger;
                    if (msg == 1) {
                        debugger
                        //var temp = data.field.index;
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        parent.location.reload();
                        layer.msg('添加成功');
                    }
                },
                "text"
            );
            return false;
        });



    });
</script>
</body>

</html>