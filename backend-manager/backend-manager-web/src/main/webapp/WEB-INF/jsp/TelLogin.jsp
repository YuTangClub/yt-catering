<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>鱼塘餐软 1.0-商家登录</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/weadmin.css">
    <script src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js"></script>

    <style>
        input {
            border: 0 none;
        }

        span {
            float: left;
            display: inline-block;
            height: 50px;
        }

        .span1 {
            width: 220px;
            position: relative;
        }
    </style>
</head>
<body class="login-bg">

<div class="login">
    <div class="message">鱼塘餐软 1.0-商家登录</div>
    <div id="darkbannerwrap"></div>

    <form method="post" class="layui-form" id="loginForm">
        <div class="box">
        <span class="span1">
        <input name="shopTel" id="shopTel" style="position: absolute;width: 220px" placeholder="手机号" type="text"
               lay-verify="shopTel" class="layui-input">
        </span>
            <span class="span2">
            <input type="button" id="sendAuthBT" style="position: absolute;width: 120px;font-size: 15px;height: 50px" value="获取验证码"
                   onclick="clickButton(this);"/>
        </span>
        </div>
        <hr class="hr15">
        <input id="verifyCode"  name="verifyCode" lay-verify="verifyCode" placeholder="验证码" type="text" class="layui-input">
        <hr class="hr15">
        <input class="loginin" value="登录" lay-submit lay-filter="login" style="width:100%;" type="submit">
        <hr class="hr20">
        <div align="right">
            <a class="layui-btn layui-btn-sm" href="${pageContext.request.contextPath}/login">
                账户密码登录
            </a>
        </div>
    </form>
</div>
<script type="text/javascript">

    layui.extend({
        admin: '{/}./static/js/admin'
    });
    layui.use(['form', 'admin', 'jquery'], function () {
        var form = layui.form
            , admin = layui.admin
            , $ = layui.jquery;

        //自定义验证规则
        form.verify({
            verifyCode: [/^\d{6}$/, '验证码必须6位，只能是数字！']
        });
        //监听提交
        form.on('submit(login)', function (data) {
            $.post(
                "${pageContext.request.contextPath}/user/verifyTel",
                data.field,
                function (result) {
                    if(result == '1'){
                        layer.msg("登录成功",{
                            time:1000
                        },function () {
                            location.href = "${pageContext.request.contextPath}/index";
                        });

                    }else {
                        layer.msg("手机号或验证码错误！",{
                            time:1000
                        })
                    }
                }
            );
            return false;
        });
    });
</script>
<script type="text/javascript">
    function clickButton(obj) {
        var sendAuthBT = $(obj);
        var shopTel = document.getElementById('shopTel');
        if (shopTel.value != "") {
            var regex = /^1[3|4|5|7|8][0-9]{9}$/;
            var res = regex.test(shopTel.value);
            if (!res) {
                alert('手机号码格式有误！请重新输入！');
            } else {
                var data = {'shopTel': shopTel.value};
                $.post(
                    '${pageContext.request.contextPath}/user/sendAuthCode',
                    data,
                    function (result) {
                        if(result =="1"){
                            sendAuthBT.attr("disabled", "disabled");
                            var time = 30;
                            var set = setInterval(function () {
                                sendAuthBT.val('已发送（' + --time + 's)');
                            }, 1000);
                            setTimeout(function () {

                                sendAuthBT.attr("disabled", false).val("重新发送");
                                clearInterval(set);
                            }, 30000);
                        }else {
                            alert('手机号码未注册！');
                        }
                    }
                );
            }
        } else {
            alert('请输入手机号码！');
        }
    }
</script>
<!-- 底部结束 -->
</body>
</html>