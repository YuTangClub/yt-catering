<%--
  Created by IntelliJ IDEA.
  User: yu
  Date: 18/3/30
  Time: 上午11:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
  <title>无标题文档</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>

<body>
<div class="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img width="64" height="64" src="${pageContext.request.contextPath}/img/seller_avatar_256px.jpg">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">${sessionShop.shopName}</span>
      </div>
      <div class="description">
        蜂鸟专送/38分钟送达
      </div>
      <div class="support">
        <span class="icon decrease"></span>
        <span class="text">在线支付满28减5</span>
      </div>
    </div>
  </div>
  <div class="bulletin-wrapper">
    <span class="bulletin-title"></span><span class="bulletin-text">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <!-- -->
  <div class="background">
    <img width="100%" height="100%" src="${pageContext.request.contextPath}/img/seller_avatar_256px.jpg">
  </div>
  <div class="detail fade-transition" style="display: none;">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">${sessionShop.shopName}</h1>
        <div class="star-wrapper">
          <div class="star star-48">
            <span class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
          </div>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul class="supports">
          <li class="support-item">
            <span class="icon decrease"></span>
            <span class="text">在线支付满28减5</span>
          </li><li class="support-item">
          <span class="icon discount"></span>
          <span class="text">VC无限橙果汁全场8折</span>
        </li><li class="support-item">
          <span class="icon special"></span>
          <span class="text">单人精彩套餐</span>
        </li><li class="support-item">
          <span class="icon invoice"></span>
          <span class="text">该商家支持发票,请下单写好发票抬头</span>
        </li><li class="support-item">
          <span class="icon guarantee"></span>
          <span class="text">已加入“外卖保”计划,食品安全保障</span>
        </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin">
          <p class="content">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
        </div>
      </div>
    </div>
    <div class="detail-close">
      <i class="icon-close"></i>
    </div>
  </div>
</div>
<div class="main">
  <div class="left-menu"  id="left">
    <ul>
      <li><span>营养套餐</span></li>
      <li><span>实惠炒菜</span></li>
    </ul>
  </div>
  <div class="con">
    <div class="right-con con-active" style="display: none;">
      <ul>
        <li>
          <div class="menu-img"><img src="${pageContext.request.contextPath}/img/pic.png" width="55" height="55"></div>
          <div class="menu-txt">
            <h4 data-icon="00">红烧牛肉</h4>
            <p class="list1">家常菜</p>
            <p class="list2">
              <b>￥</b><b>28</b>
            </p><div class="btn">
            <button class="minus">
              <strong></strong>
            </button>
            <i>0</i>
            <button class="add">
              <strong></strong>
            </button>
            <i class="price">28</i>
          </div>

          </div>
        </li>
        <li>
          <div class="menu-img"><img src="${pageContext.request.contextPath}/img/pic.png" width="55" height="55"></div>
          <div class="menu-txt">
            <h4 data-icon="01">辣子鸡</h4>
            <p class="list1">家常菜</p>
            <p class="list2">
              <b>￥</b><b>25</b>
            </p><div class="btn">
            <button class="minus">
              <strong></strong>
            </button>
            <i>0</i>
            <button class="add">
              <strong></strong>
            </button>
            <i class="price">25</i>
          </div>

          </div>
        </li>
      </ul>
    </div>
    <div class="right-con con-active" style="display: none;">
      <ul>
        <li>
          <div class="menu-img"><img src="${pageContext.request.contextPath}/img/pic.png" width="55" height="55"></div>
          <div class="menu-txt">
            <h4 data-icon="10">宫保鸡丁</h4>
            <p class="list1">家常菜</p>
            <p class="list2">
              <b>￥</b><b>26</b>
            </p><div class="btn">
            <button class="minus">
              <strong></strong>
            </button>
            <i>0</i>
            <button class="add">
              <strong></strong>
            </button>
            <i class="price">26</i>
          </div>

          </div>
        </li>
        <li>
          <div class="menu-img"><img src="${pageContext.request.contextPath}/img/pic.png" width="55" height="55"></div>
          <div class="menu-txt">
            <h4 data-icon="11">回锅肉</h4>
            <p class="list1">家常菜</p>
            <p class="list2">
              <b>￥</b><b>24.5</b>
            </p>
            <div class="btn">
              <button class="minus">
                <strong></strong>
              </button>
              <i>0</i>
              <button class="add">
                <strong></strong>
              </button>
              <i class="price">22</i>
            </div>
          </div>
        </li>
        <li>
          <div class="menu-img"><img src="${pageContext.request.contextPath}/img/pic.png" width="55" height="55"></div>
          <div class="menu-txt">
            <h4 data-icon="12">青椒肉丝</h4>
            <p class="list1">家常菜</p>
            <p class="list2">
              <b>￥</b><b>24</b>
            </p><div class="btn">
            <button class="minus">
              <strong></strong>
            </button>
            <i>0</i>
            <button class="add">
              <strong></strong>
            </button>
            <i class="price">24</i>
          </div>

          </div>
        </li>
        <li>
          <div class="menu-img"><img src="${pageContext.request.contextPath}/img/pic.png" width="55" height="55"></div>
          <div class="menu-txt">
            <h4 data-icon="13">京酱肉丝</h4>
            <p class="list1">家常菜</p>
            <p class="list2">
              <b>￥</b><b>27</b>
            </p>
            <div class="btn">
              <button class="minus">
                <strong></strong>
              </button>
              <i>0</i>
              <button class="add">
                <strong></strong>
              </button>
              <i class="price">27</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="up1"></div>
  <div class="shopcart-list fold-transition" style="">
    <div class="list-header">
      <h1 class="title">购物车</h1>
      <span class="empty">清空</span>
    </div>
    <div class="list-content">
      <ul></ul>
    </div>
  </div>
  <div class="footer">
    <div class="left">已选：
      <span id="cartN">
			<span id="totalcountshow">0</span>份　总计：￥<span id="totalpriceshow">0</span></span>元
    </div>
    <div class="right">
      <a id="btnselect" class="xhlbtn  disable" href="javascript:void(0)">去结算</a>
    </div>
  </div>
</div>
<div class="subFly">
  <div class="up"></div>
  <div class="down">
    <a class="close" href="javascript:">
      <img src="${pageContext.request.contextPath}/img/close.png" alt="">
    </a>
    <dl class="subName">
      <dt>
        <img class="imgPhoto" src="${pageContext.request.contextPath}/img/pic.png" alt="">
      </dt>
      <dd>
        <p data-icon=""></p>
        <p><span>¥ </span><span class="pce" style="font-size: 16px;font-weight: bold"></span></p>
        <p>
          <span>已选：“</span>
          <span class="choseValue"></span>
          <span>”</span>
        </p>
      </dd>
    </dl>
    <dl class="subChose">
      <dt>口味</dt>
      <dd class="m-active">辣味</dd>
      <dd>酸甜</dd>
    </dl>
    <dl class="subCount">
      <dt>购买数量</dt>
      <dd>
        <div class="btn">
          <button class="ms" style="display: inline-block;">
            <strong></strong>
          </button>
          <i style="display: inline-block;">1</i>
          <button class="ad">
            <strong></strong>
          </button>
          <i class="price">25</i>
        </div>
      </dd>
    </dl>
    <div class="foot">
      <span>加入购物车</span>
    </div>
  </div>

</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/add.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/vue.min.js"></script>

</body>
</html>

