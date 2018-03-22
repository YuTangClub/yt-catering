<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>鱼塘餐饮 后台管理 v1.0</title>
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
    <form class="layui-form" id="myform">
        <div class="layui-form-item">
            <label for="L_tabelname" class="layui-form-label">
                <span class="we-red">*</span>餐桌编辑
            </label>
            <div class="layui-input-inline">
                <input type="text" id="L_tabelname" name="tbName" lay-verify="required|tbName" value="${updateDinnerTable.tbName}" autocomplete="off" class="layui-input" readonly="readonly">
            </div>
            <div class="layui-form-mid layui-word-aux">
                餐桌名不可修改！
            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_type" class="layui-form-label">餐桌类型</label>
            <div class="layui-input-block" id="L_type">

                <input type="radio" name="ttId" value="1" title="4人桌" <c:if test="${updateDinnerTable.ttId==1}">checked="checked"</c:if>/>
                <input type="radio" name="ttId" value="2" title="8人桌" <c:if test="${updateDinnerTable.ttId==2}">checked="checked"</c:if>/>
                <input type="radio" name="ttId" value="3" title="12人桌"<c:if test="${updateDinnerTable.ttId==3}">checked="checked"</c:if>/>
                <input type="radio" name="ttId" value="4" title="16人桌"<c:if test="${updateDinnerTable.ttId==4}">checked="checked"</c:if>/><br>
                <input type="radio" name="ttId" value="5" title="20人桌"<c:if test="${updateDinnerTable.ttId==5}">checked="checked"</c:if>/>

            </div>
        </div>
        <div class="layui-form-item">
            <label for="L_QRCODE" class="layui-form-label">餐桌二维码</label>
            <div class="layui-input-block" id="L_QRCODE">
                <img src="${updateDinnerTable.tbQrcode}">
            </div>
        </div>
        <div class="layui-form-item" >
            <input type="hidden" value="${updateDinnerTable.tbQrcode}" name="tbQrcode"/>
            <input type="hidden" value="${updateDinnerTable.tbId}" name="tbId"/>
            <input type="hidden" value="${sessionShop.shopId}" name="shopId"/>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <button class="layui-btn" lay-filter="update" lay-submit > &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;确定   &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</button>
        </div>
    </form>
</div>

<script>

    layui.use(['form', 'jquery','util', 'layer'], function() {
        var form = layui.form,
            $ = layui.jquery,
            util = layui.util,
            layer = layui.layer;

        //监听提交
        form.on('submit(update)', function(data) {
            var index = parent.layer.getFrameIndex(window.name);
            //关闭当前frame
            $.ajax({
                url:'${pageContext.request.contextPath}/updateDinnerTable',
                data:data.field,
                type:'POST',
                success : function(rec) {
                    if(rec=='0'){
                        parent.layer.close(index);
                        parent.location.reload();
                    }else{
                        parent.layer.msg('更新失败!', {
                            time: 2000
                        });
                    }

                },
                error:function (data) {
                },
                dataType:'text',
                async:false
            })


        });

    });
</script>
</body>

</html>