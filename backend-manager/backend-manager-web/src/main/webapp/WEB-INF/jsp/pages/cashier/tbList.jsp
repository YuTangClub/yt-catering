<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>收银台-后台管理系统-Admin 1.0</title>
		<meta name="Description" content="基于layUI数据表格操作"/>
		<meta name="renderer" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="stylesheet" href="../../static/css/font.css">
		<link rel="stylesheet" href="../../static/css/weadmin.css">
		<link rel="stylesheet" href="../../static/css/layui.css">
		<script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
		<script src="../../lib/layui/layui.js" charset="utf-8"></script>
		<script src="../../static/js/tbList.js" type="text/javascript" charset="utf-8"></script>
		
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
		<!-- 面包屑-->
		<div class="weadmin-nav">
			<span class="layui-breadcrumb">
        <a href="">首页</a>
        <a href="">收银台</a>
        <a>
          <cite>开台管理</cite></a>
      		</span>
			<a class="layui-btn layui-btn-sm" style="line-height:1.6em;margin-top:3px;float:right" href="javascript:location.replace(location.href);" title="刷新">
				<i class="layui-icon" style="line-height:30px">&#x1002;</i></a>
		</div>
		<div class="">
			<div class="layui-tab layui-tab-brief" lay-filter="tt_tab">
				<ul class="layui-tab-title">
					<li class="layui-this">所有餐桌</li>
					<li value="111"><a onclick="renderContent('1')">大厅</a></li>
					<li value="222">卡包</li>
					<li value="333">包厢</li>
				</ul>
				<div class="layui-tab-content">
					<div class="layui-tab-item layui-show">
						<div id="tbId" type="button" style="height: 150px;width: 150px;background: red;margin:20px;border:1px;padding:20px;" >
							<div style=" height: 10px;width: 40px; margin-top: 5px;margin-left: 5px;"><p>桌号</p> </div>
							<div style=" height: 20px;width: 40px; margin-top: 45px;margin-left: 55px;"><p>大厅</p> </div>
							<div style=" height: 10px;width: 50px; margin-top: 30px;margin-left: 45px;"><p>10分钟</p> </div>
						</div>
					</div>
					<div class="layui-tab-item">内容2</div>
					<div class="layui-tab-item">内容3</div>
				</div>
			</div>
			<%--<div class="layui-tab tab" lay-filter="tt_tab">
				<ul class="layui-tab-title">
					<li class=" layui-this" ><a href="">所有餐桌</a></li>
					<li ><a href="">大厅</a></li>
					<li ><a href="">卡包</a></li>
					<li ><a href="">包厢</a></li>
				</ul>
				&lt;%&ndash;<span class="layui-nav-bar" style="left: 162px; top: 55px; width: 0px; opacity: 0;"></span>&ndash;%&gt;
				<div class="layui-tab-content">
					<div class="layui-tab-item layui-show">
						<div id="tbId" type="button" style="height: 150px;width: 150px;background: red;margin:20px;border:1px;padding:20px;" >
							<div style=" height: 10px;width: 40px; margin-top: 5px;margin-left: 5px;"><p>桌号</p> </div>
							<div style=" height: 20px;width: 40px; margin-top: 45px;margin-left: 55px;"><p>大厅</p> </div>
							<div style=" height: 10px;width: 50px; margin-top: 30px;margin-left: 45px;"><p>10分钟</p> </div>
						</div>
					</div>
					<div class="layui-tab-item" >内容2</div>
					<div class="layui-tab-item" >内容3</div>
					<div class="layui-tab-item" >内容4</div>
				</div>
			</div>--%>
		</div>
		<div class="page-content-tb-bg"></div>
	</body>
<script>
    layui.use('element', function(){
        var element = layui.element;

        //…
    });
</script>
</html>