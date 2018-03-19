<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
	<!--
	作者：github.com/WangEn
	时间：2018-02-02
	描述：添加文章类别
-->

	<head>
		<meta charset="UTF-8">
		<title>添加分类-后台管理系统-Admin 1.0</title>
		<meta name="renderer" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
		<link rel="stylesheet" href="../../static/css/font.css">
		<link rel="stylesheet" href="../../static/css/weadmin.css">
		<script src="../../lib/layui/layui.js" charset="utf-8"></script>
		<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
		<!--[if lt IE 9]>
	      <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
	      <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
	    <![endif]-->
	</head>

	<body>
		<div class="weadmin-body">

			<form id="form1" class="layui-form">
				<div class="layui-form-item">
					<label class="layui-form-label">父级分类</label>
					<div class="layui-input-inline">
						<select name="pid" id="pid-select" lay-verify="required" lay-filter="pid-select">
							<option value="0" data-level="0">顶级分类</option>
							<option value="1" data-level="0">内容管理</option>
							<option value="2" data-level="1">文章管理</option>
							<option value="3" data-level="2">文章列表</option>
							<option value="4" data-level="2">文章分类</option>
							<option value="5" data-level="2">标签管理</option>
							<option value="6" data-level="0">产品管理</option>
							<option value="7" data-level="1">产品列表</option>
							<option value="8" data-level="1">产品分类</option>
							<option value="9" data-level="1">品牌管理</option>
						</select>
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">分类名称</label>
					<div class="layui-input-block">
						<input type="text" name="title" lay-verify="required" jq-error="请输入分类名称" placeholder="请输入分类名称" autocomplete="off" class="layui-input ">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">排序</label>
					<div class="layui-input-inline">
						<input type="text" name="order" lay-verify="number" value="100" jq-error="排序必须为数字" placeholder="分类排序" autocomplete="off" class="layui-input ">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">状态</label>
					<div class="layui-input-inline">
						<input type="radio" name="switch" title="启用" value="1" checked />
						<input type="radio" name="switch" title="禁用" value="0" />
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block">
						<button class="layui-btn" lay-submit="" lay-filter="add">立即提交</button>
						<button type="reset" class="layui-btn layui-btn-primary">重置</button>
					</div>
				</div>
				<input type="hidden" name="level" value="0" />
			</form>
		</div>
		<script type="text/javascript">
			//加载扩展模块 treeGird
			layui.extend({
				admin: '{/}../../static/js/admin'
			});
			layui.use(['admin','jquery','form', 'layer'], function() {
				var admin = layui.admin,
					$ = layui.jquery,
					form = layui.form,
					layer = layui.layer;

				//自定义验证规则
				form.verify({
					nikename: function(value) {
						if(value.length < 5) {
							return '昵称至少得5个字符啊';
						}
					},
					pass: [/(.+){6,12}$/, '密码必须6到12位'],
					repass: function(value) {
						if($('#L_pass').val() != $('#L_repass').val()) {
							return '两次密码不一致';
						}
					}
				});

				//监听提交
				form.on('submit(add)', function(data) {
					console.log(data.field);
					//发异步，把数据提交给php
					layer.alert("增加成功", {
						icon: 6
					}, function() {
						// 获得frame索引
						var index = parent.layer.getFrameIndex(window.name);
						//关闭当前frame
						parent.layer.close(index);
					});
					return false;
				});
				
				//遍历select option
				$(document).ready(function(){
					$("#pid-select option").each(function (text){
				 	
					 	var level = $(this).attr('data-level');
					 	var text = $(this).text();
					 	console.log(text);
					 	if(level>0){
					 		text = "├　"+ text;
					 		for(var i=0;i<level;i++){
						 		text ="　　"+ text;　//js中连续显示多个空格，需要使用全角的空格
						 		console.log(i+"text:"+text);
						 	}
					 	}
					 	$(this).text(text);
					 	
					});
					 
					form.render('select'); //刷新select选择框渲染
				});

			});
		</script>
	</body>

</html>