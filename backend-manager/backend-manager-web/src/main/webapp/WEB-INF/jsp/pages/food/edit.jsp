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
            <label for="fdName" class="layui-form-label">
                <span class="we-red">*</span>菜品名称
            </label>
            <div class="layui-input-inline">
                <input type="text" id="fdName" name="fdName" required="" lay-verify="required"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="fdPrice" class="layui-form-label">
                <span class="we-red">*</span>菜品价格
            </label>
            <div class="layui-input-inline">
                <input type="text" id="fdPrice" name="fdPrice" required="" lay-verify="required|number"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="fdMprice" class="layui-form-label">
                <span class="we-red">*</span>会员价格
            </label>
            <div class="layui-input-inline">
                <input type="text" id="fdMprice" name="fdMprice" required="" lay-verify="number"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="fdStock" class="layui-form-label">
                <span class="we-red">*</span>库存
            </label>
            <div class="layui-input-inline">
                <input type="text" id="fdStock" name="fdStock" required="" lay-verify="required|number"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="fdRecommend" class="layui-form-label">
                <span class="we-red">*</span>推荐
            </label>
            <div class="layui-input-inline">
                <input type="checkbox" id="fdRecommend" name="fdRecommend" lay-text="已推荐|OFF"
                       lay-skin="switch" VALUE="1">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="fdStatus" class="layui-form-label">
                <span class="we-red">*</span>上架状态
            </label>
            <div class="layui-input-block">
                <input type="checkbox" id="fdStatus" name="fdStatus" lay-text="正常|下架"
                       autocomplete="off" lay-skin="switch" class="layui-input" VALUE="1">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="fdUnit" class="layui-form-label">
                <span class="we-red">*</span>单位
            </label>
            <div class="layui-input-inline">
                <input type="text" id="fdUnit" name="fdUnit" required="" lay-verify="required"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="fdRemark" class="layui-form-label">
                <span class="we-red">*</span>简介
            </label>
            <div class="layui-input-block">
                <textarea id="fdRemark" name="fdRemark" autocomplete="off" class="layui-textarea"></textarea>
            </div>
        </div>
        <input type="hidden" id="fdId" name="fdId">

        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-filter="edit" lay-submit>
                    修改
                </button>
            </div>
        </div>

    </form>
</div>
<script type="text/javascript">

    layui.use(['form', 'layer', 'jquery'], function () {
        var form = layui.form,
            layer = layui.layer,
            $ = layui.jquery;

        //监听提交
        form.on('submit(edit)', function (data) {

            //debugger
            $.post(
                "edit.do",
                data.field,
                function (msg) {
                    debugger;
                    if (msg == 1) {
                        debugger
                        //var temp = data.field.index;
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        parent.location.reload();
                        layer.msg('修改成功');
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