<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>会员资料编辑-后台管理系统-Admin 1.0</title>
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
<div class="weadmin-body">
    <form class="layui-form" action="${pageContext.request.contextPath}/pages/member/editMember">
        <div class="layui-form-item">
            <label for="L_username" class="layui-form-label">
                <span class="we-red">*</span>会员名
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_username" name="username" lay-verify="required|nikename" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_pass" class="layui-form-label">
                <span class="we-red">*</span>密码
            </label>
            <div class="layui-input-inline">
                <input type="password" id="L_pass" name="pass" lay-verify="required|pass" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">
                6到16个字符
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_phone" class="layui-form-label">
                <span class="we-red">*</span>手机
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_phone" name="phone" lay-verify="required|phone" autocomplete="" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_sex" class="layui-form-label">性别</label>
            <div class="layui-input-block" id="L_sex">
                <input type="radio" name="sex" value="男" title="男" checked>
                <input type="radio" name="sex" value="女" title="女">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_level" class="layui-form-label">
                <span class="we-red">*</span>等级
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_level" name="level" lay-verify="level" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
            </label>
            <button class="layui-btn" lay-filter="update" lay-submit="">确定</button>
            <input type="hidden" name="dataId" id="dataId" value="" />
        </div>
    </form>
</div>
<script type="text/javascript">
    layui.extend({
        admin: '{/}../../static/js/admin'
    });
    layui.use(['form', 'jquery','layer'], function() {
        var form = layui.form,
            $ = layui.jquery,
            admin = layui.admin,
            layer = layui.layer;

        //自定义验证规则
        form.verify({
            nikename: function(value) {
                if(value.length < 2) {
                    return '昵称不少于2个字符';
                }
            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
        });
        //页面初始化加载
        $(function(){
            setTimeout(function(){
                var dataId = $('input[name="dataId"]').val();
                var index = parent.layer.getFrameIndex(window.name);
                parent.$("#memberList tr").each(function(){
                    if($(this).attr('data-id')==dataId){
                        var tdArr=$(this).children('td');
                        var username = tdArr.eq(2).text(); //姓名
                        var password = tdArr.eq(3).text(); //密码
                        var phone = tdArr.eq(4).text(); //手机
                        var sex = tdArr.eq(5).text(); //性别
                        var level = tdArr.eq(6).text(); //等级

                        $('input[name="username"]').val(username);
                        $('input[name="password"]').val(password);
                        $('input[name="phone"]').val(phone);
                        $('input[name="sex"][value="'+sex+'"]').attr("checked",true);
                        $('input[name="level"]').val(level);
                    }else{
                    }
                });
            },1000);
        });
        //监听提交
        form.on('submit(update)', function(data) {
            //发异步，把数据提交给php
            $.ajax({
                url:"${pageContext.request.contextPath}/pages/member/editMember",
                dataType:"JSON",
                async:false,
                success:function (data) {
                    layer.alert("修改成功", {
                        icon: 6
                    }, function() {
                        // 获得frame索引
                        var index = parent.layer.getFrameIndex(window.name);
                        //关闭当前frame
                        parent.layer.close(index);
                    });
                }
            });
            return false;
        });
    });
</script>
</body>

</html>