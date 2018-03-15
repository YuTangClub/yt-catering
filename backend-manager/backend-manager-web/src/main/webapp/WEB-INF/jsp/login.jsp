<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>管理员登录-后台管理系统-Admin 1.0</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>

</head>
<body class="login-bg">

<div class="login">
    <div class="message">Admin 1.0-管理登录</div>
    <div id="darkbannerwrap"></div>

    <form method="post" class="layui-form" id="loginForm">
        <input name="shopNickname" placeholder="用户名"  type="text" lay-verify="required" class="layui-input" >
        <hr class="hr15">
        <input name="shopPassword" lay-verify="required" placeholder="密码"  type="password" class="layui-input">
        <hr class="hr15">
        <input class="loginin" value="登录" lay-submit lay-filter="login" style="width:100%;" type="submit">
        <hr class="hr20" >
        <div>
            前端静态展示，请随意输入，即可登录。
        </div>
    </form>
</div>

<script type="text/javascript">

    layui.extend({
        admin: '{/}./static/js/admin'
    });
    layui.use(['form','admin','jquery'], function(){
        var form = layui.form
            ,admin = layui.admin
            ,$ = layui.jquery;
        //监听提交
        form.on('submit(login)', function(data){
            $.post(
                "${pageContext.request.contextPath}/user/verify",
                data.field,
                function (result) {
                    if(result == '1'){
                        layer.msg("登录成功",{
                            time:1000
                        },function () {
                            location.href = "${pageContext.request.contextPath}/index";
                        });

                    }else {
                        layer.msg("用户名或密码错误！",{
                            time:1000
                        })
                    }
                }
            );
            return false;
        });
    });
</script>
<!-- 底部结束 -->
</body>
</html>