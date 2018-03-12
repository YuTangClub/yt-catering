<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>管理系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keyword" content="网页关键字">
    <meta name="description" content="网页描述文字">
    <meta name="referrer" content="never">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="css/bootstrap-v=IW-m2ufkFbmwZUCZ2zv-8lfKGX8QpmWa_ols-L_APnE.css">
    <link href="css/buttons.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/index-v=20180308.css">
    <link rel="stylesheet" href="css/iconfont.css" />
    <link href="css/introjs.min.css" rel="stylesheet" />
    <link href="css/order.css" rel="stylesheet" />
    <link rel="icon" type="image/png" href="images/title.png" />
    <script src="js/intro.min.js"></script>
    <script src="js/decerp.common-v=20180308.js"></script>
    <script src="js/decerp.print-v=20180308.js"></script>
    <style>.am-color-red {
        color: red;
    }

    .dropdown-menu {
        min-width: 120px;
    }

    .dropdown-menu a {
        text-align: center;
    }

    .modal-body .col-xs-3 {
        text-align: center;
        padding: 20px;
    }

    .modal-body a {
        color: #000;
    }

    .modal-body .col-xs-3 p {
        margin-top: 15px;
    }

    .scale {
        transform: scale(1.1);
        transition: all 0.2s;
    }

    a:hover {
        text-decoration: none;
    }

    .form-group-h1 {
        text-align: center;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .am-formgroup-li {
        padding: 20px 20px 0px 20px;
    }

    .am-img1 {
        width: 20px;
        position: absolute;
        transform: translateY(-21px);
        left: 20px;
        margin-left: 6px;
    }

    body {
        font-family: '微软雅黑';
    }

    .win7 {
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
    }

    .youku1imgbox {
        width: 70px;
        height: 70px;
        margin: auto;
        background: url('images/youkuvideo.png');
    }

    .youku1img1 {
        background-position-y: 0px;
    }

    .youku1img2 {
        background-position-y: -70px;
    }

    .youku1img3 {
        background-position-y: -140px;
    }

    .youku1img4 {
        background-position-y: -210px;
    }

    .youku1img5 {
        background-position-y: -280px;
    }

    .youku1img6 {
        background-position-y: -350px;
    }

    .youku1img7 {
        background-position-y: -420px;
    }

    .youku1img8 {
        background-position-y: -560px;
    }
    </style>
    <link href="am/base.css" rel="stylesheet" />
    <link href="am/attr.css" rel="stylesheet" />
</head>
<body>
<!---头部 start---->
<header class="header green-bg">
    <!--左边LOGO start-->
    <a href="Catering/Cashier.html" id="logoidbox" class="logo" style="margin-top:0px">
        <input type="file" class="flies" style="display:none" id="upLoadImg" name="upLoadImg" />
        <!--<img id="logoid" src="" data-intro="点击LOGO进入前端收银（可切换前后端）" style="height:70px;width:260px" data-step="1" class="demo_7">-->
    </a>
    <!--左边LOGO end--->
    <!--右边显示 start-->
    <div class="top-nav ">
        <div class="showSystemMsg" id="showSystemMsg">
            <div style="background: url('images/arrow-up.png') no-repeat;width: 20px;height: 11px;position: absolute;right: 100px; top: -10px;" class="log-arrow-up"></div>
            <ul id="messagehtml"></ul>
        </div>
        <!--菜单管理  start-->
        <ul class="nav pull-right top-menu">
            <!-----------------进入后台-------------------->
            <li class="dropdown bzzxws">
                <a href="Catering/Cashier.html">
                    <img style="width: 20px;margin-top: 7px;" src="images/returnimg.png" />
                    <span class="username">前台收银</span>
                </a>
            </li>
            <!-----------------进入后台-------------------->
            <!-----------------铃铛  am-------------------->
            <li class="dropdown bzzxws" id="btnShowMesssageBox">
                <a href="javascript:void(0);" style="height: 60px;">
                    <img style="width: 24px;margin-top: 7px;" src="images/dingding.png" />
                    <div class="newcount" id="Messagenumber" style="position:absolute;left:24px;font-size:12px;">0</div>
                    <span class="username">消息</span>
                    <b class="caret"></b>
                </a>
            </li>
            <!--帮助中心  start-->
            <li class="dropdown bzzxws am-san-jian-top" style="display:none;">
                <a data-toggle="dropdown" class="dropdown-toggle" href="index.html#">
                    <i style="font-size:20px; transform: translateX(-117%);" class="icon-question-sign"></i>
                    <span class="username">帮助中心</span>
                    <b class="caret"></b>
                </a>

            </li>
            <li class="dropdown xiaoxi">

                <ul class="dropdown-menu extended inbox">
                    <div class="notify-arrow notify-arrow-yellow"></div>
                    <li>
                        <p class="yellow">你有0条信息</p>
                    </li>
                </ul>
            </li>

            <!--帮助中心  start-->
            <li class="dropdown bzzxws">

            </li>
            <!--帮助中心  end  -->
            <!--登录管理  start-->
            <li onclick="upLoadImg.click();" style="margin-top: 6px;">
                <div class="tximg">
                    <img id="userImg" src="images/001.png" onerror="javascript: this.src = '/images/001.png';">
                </div>
            </li>
            <li class="dropdown am-loger1">
                <a data-toggle="dropdown" class="dropdown-toggle" href="javascript:void(0);">
                    <div class="txrig">
                        <span style="margin-left:5px;" class="username" id="username"></span>
                        <span class="useadmin"><i id="postion"></i><i id="dianzhu"></i></span>
                        <b class="caret"></b>
                    </div>
                </a>
                <ul class="dropdown-menu extended logout">
                    <li id=""><a href="home/Index_N3-software_versionid=3.html"><i class="icon-home"></i>体验新版</a></li>
                    <li id="IsStorePwd"><a id="changePwd" href="javascript:void(0);"><i class="icon-lock"></i>修改密码</a></li>
                    <li id="IsonlineRenewal"><a id="onlineRenewal" href="home/versionList.html"><i class="icon-shopping-cart"></i>在线购买</a></li>
                    <li><a href="javascript:void(0);" onclick="upLoadImg.click()"><i class="icon-user"></i>修改头像</a></li>
                    <li class="handover_hide" hidden="hidden"><a id="handover" href="javascript:void(0);"><i class="icon-off"></i>交接系统</a></li>
                    <li><a id="userLogOut" href="javascript:void(0);"><i class="icon-off"></i>退出系统</a></li>
                </ul>
            </li>
            <!--登录管理   end -->



        </ul>
        <!--菜单管理 end-->
    </div>
</header>
<!---头部 end----->
<!--左侧导航栏 start----->
<aside>
    <section id="sidebar" class="nav-collapse " tabindex="5000" style="outline:none;">
        <ul class="sidebar-menu" style="display: block;">
            <li>
                <a class="sv_func_id " href="Home/Index.html" sv_func_id="7472">
                    <i class="iconfont">&#xe608;</i>
                    <span>&#x9996;&#x9875;</span>
                </a>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe610;</i>
                    <span>&#x4F1A;&#x5458;&#x7BA1;&#x7406;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="member.html#adduser" sv_func_id="7381">&#x65B0;&#x589E;&#x4F1A;&#x5458;</a></li>
                    <li><a class="sv_func_id " href="member/index.html" sv_func_id="7387">&#x4F1A;&#x5458;&#x5217;&#x8868;</a></li>
                    <li><a class="sv_func_id " href="member/savings.html" sv_func_id="7419">&#x4F1A;&#x5458;&#x5145;&#x503C;</a></li>
                    <li><a class="sv_func_id " href="Integral/IntegralChange.html" sv_func_id="7382">&#x79EF;&#x5206;&#x7BA1;&#x7406;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe609;</i>
                    <span>&#x83DC;&#x54C1;&#x7BA1;&#x7406;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="Product/Catering.html" sv_func_id="7424">&#x83DC;&#x54C1;&#x5217;&#x8868;</a></li>
                    <li><a class="sv_func_id " href="ProductCategory/Index.html" sv_func_id="7441">&#x83DC;&#x54C1;&#x5206;&#x7C7B;</a></li>
                    <li><a class="sv_func_id " href="CateringTable/Table.html" sv_func_id="7533">&#x623F;&#x53F0;&#x7BA1;&#x7406;</a></li>
                    <li><a class="sv_func_id " href="CateringTaste/Taste.html" sv_func_id="7534">&#x53E3;&#x5473;&#x7BA1;&#x7406;</a></li>
                    <li><a class="sv_func_id " href="CateringCharging/Charging-type=0.html" sv_func_id="7535">&#x52A0;&#x6599;&#x7BA1;&#x7406;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60a;</i>
                    <span>&#x5E93;&#x5B58;&#x7BA1;&#x7406;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="repertory/procurement.html" sv_func_id="7448">&#x8FDB;&#x8D27;&#x7BA1;&#x7406;</a></li>
                    <li><a class="sv_func_id " href="repertory/tohuo.html" sv_func_id="7470">&#x91C7;&#x8D2D;&#x9000;&#x8D27;</a></li>
                    <li><a class="sv_func_id " href="repertory/check.html" sv_func_id="7471">&#x4EA7;&#x54C1;&#x76D8;&#x70B9;</a></li>
                    <li><a class="sv_func_id " href="repertory/StoreStockGoodsAllot.html" sv_func_id="7469">&#x5E93;&#x5B58;&#x8C03;&#x62E8;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60b;</i>
                    <span>&#x65E5;&#x5E38;&#x652F;&#x51FA;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="expenditure/index.html" sv_func_id="7476">&#x652F;&#x51FA;&#x660E;&#x7EC6;</a></li>
                    <li><a class="sv_func_id " href="expenditure/analyze.html" sv_func_id="7475">&#x652F;&#x51FA;&#x5206;&#x6790;</a></li>
                    <li><a class="sv_func_id " href="expenditure/category.html" sv_func_id="7474">&#x652F;&#x51FA;&#x5206;&#x7C7B;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60c;</i>
                    <span>&#x667A;&#x80FD;&#x5206;&#x6790;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="intelligent/sales.html" sv_func_id="7478">&#x9500;&#x552E;&#x5206;&#x6790;</a></li>
                    <li><a class="sv_func_id " href="intelligent/user.html" sv_func_id="7484">&#x4F1A;&#x5458;&#x5206;&#x6790;</a></li>
                    <li><a class="sv_func_id " href="intelligent/product.html" sv_func_id="7485">&#x4EA7;&#x54C1;&#x5206;&#x6790;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60d;</i>
                    <span>&#x8425;&#x9500;&#x5E73;&#x53F0;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="sms/sendsms.html" sv_func_id="7488">&#x8425;&#x9500;&#x77ED;&#x4FE1;</a></li>
                    <li><a class="sv_func_id " href="weixin/CardUser.html" sv_func_id="7490">&#x5FAE;&#x4FE1;&#x4F1A;&#x5458;</a></li>
                    <li><a class="sv_func_id " href="MobileStore/CateringMobileStore.html" sv_func_id="7487">&#x626B;&#x7801;&#x70B9;&#x9910;</a></li>
                    <li><a class="sv_func_id " href="UserModuleConfig/Index.html" sv_func_id="7489">&#x8425;&#x9500;&#x6D3B;&#x52A8;</a></li>
                    <li><a class="sv_func_id " href="Coupon/Coupon.html" sv_func_id="7627">&#x4F18;&#x60E0;&#x5238;</a></li>
                </ul>
            </li>
            <li>
                <a class="sv_func_id " href="OnlineOrder/TakeawayOrder.html" sv_func_id="7506">
                    <i class="iconfont">&#xe60e;</i>
                    <span>&#x5916;&#x5356;&#x8BA2;&#x5355;</span>
                </a>
            </li>
            <li>
                <a class="sv_func_id " href="system/index.html" sv_func_id="7491">
                    <i class="iconfont">&#xe60f;</i>
                    <span>&#x7CFB;&#x7EDF;&#x7BA1;&#x7406;</span>
                </a>
            </li>

        </ul>
    </section>
</aside>
<!--新添加的漂浮气泡提示框 start----->
<!--<div class="poionimgsss">
    <img src="/images/tstitle.png" />
</div>-->
<div class="box-black active_none"></div>
<div id="box-black3" class="box-black3 active_none"></div>
<!--新添加的漂浮气泡提示框 start----->
<div class="indexpage">

    <!--主体内容导航 start----->
    <section class="main_box">
        <!--首页的磁贴 start-->
        <div class="citiebox">
            <div class="row">
                <div class="col-xs-3 ">
                    <div class="xos1  misu">
                        <a href="Catering/Cashier.html" class="boxsmall bgred hover-shadow"><i class="iconfont">&#xe630;</i><span>前台收银</span></a>
                        <a href="Home/Index_N3-software_versionid=3.html" class="boxin bgshe" style="background-color: #f40f40;"><i class="iconfont fontasssscxc">&#xe634;</i><span><text class="globalText">德客</text> 3.0 正式面向大家公测了,进入体验！</span></a>
                    </div>
                    <div class="misu xos1  ">
                        <a href="member.html#adduser" class="bgbule boxsmall push"><i class="iconfont">&#xe631;</i><span>新增会员</span></a>
                        <a href="GiftExchange/GiftExchange.html" class="bgshe boxsmall  push"><i class="iconfont">&#xe635;</i><span>积分兑换</span></a>
                        <a href="system.html" class="bgjls boxsmall  push"><i class="iconfont">&#xe638;</i><span>数据管理</span></a>
                    </div>
                </div>
                <div class="col-xs-3 ">
                    <div class="xos2  misu">
                        <a href="member/savings/index.html" class="boxbig bgqxl"><i class="iconfont">&#xe647;</i><span>会员充值</span></a>
                        <a href="Coupon/Coupon.html" class="boxbig bhybs"><i class="iconfont fontsss">&#xe64a;</i><span>优惠券</span></a>
                        <a href="intelligent/user.html" class="boxbig bgqlve"><i class="iconfont">&#xe639;</i><span>报表中心</span></a>
                    </div>
                </div>
                <div class="col-xs-3 ">
                    <div class="xos2  misu">
                        <a href="expenditure/index.html" class="boxbig bgtzs"><i class="icon-calendar"></i><span>日常支出</span></a>
                    </div>
                    <div class="xos1 misu mr1em">
                        <a href="sms/sendsms.html" class="boxsmall bgsls"><i class="iconfont fontcccc">&#xe649;</i><span>发短信</span></a>
                    </div>
                    <div class="xos1 misu " style="margin-right: 0;">
                        <a href="MobileStore/CateringMobileStore.html" class="boxsmall bgszs"><i class="icon-home"></i><span>微店管理</span></a>
                    </div>
                    <div class="xos2  misu ">
                        <a href="system.html" class="boxbig bgths"><i class="iconfont fontqjsz">&#xe63b;</i><span>全局设置</span></a>
                    </div>
                </div>
                <div class="col-xs-3 ">
                    <div class="xos1  misu ">
                        <a href="Product/Catering.html" class="boxin bgsclv"><i class="iconfont fontasssscxc">&#xe643;</i><span>新增商品</span></a>
                        <a href="system.html" class="boxsmall bgxxzs"><i class="iconfont">&#xe63a;</i><span>分店管理</span></a>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="row gonggao_1">
            <div class="col-xs-6 col-xs-offset-2" style="padding-left:0;">
                <div class="announcement" style="height: 180px;background-color: #fffff8;width:100%;">
                    <p class="text-center" style="color: #666666; padding-top:8px;">德客软件超时异常退出的修复公告</p>
                    <ul>
                        <li>针对近日少数用户在使用德客软件的过程中因长时间不操作导致系统异常退出的情况，德客研发团队已全面排查并处理，系统现已恢复正常。再次感谢用户的一路陪伴与支持！</li>
                    </ul>
                </div>
            </div>
        </div>-->
        <!--首页的磁贴 end---->
    </section>
    <!--主体内容导航 end------->
    <!----脚部 start-------->
    <footer class="index_footer" id="index_footer"></footer>
    <!----脚部 end-------->

</div>

<style>.floatCtro {
    width: 55px;
    height: 180px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    cursor: pointer;
}

.gonggao_1 {
    display: none;
    font-family: SimHei;
    display: none;
}

.gonggao_1 li {
    min-height: 25px;
    line-height: 25px;
    padding-left: 15px;
    padding-right: 8px;
    color: #666666;
}

.yanshi_btn {
    font-size: 13px;
    width: 50px;
    height: 25px;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    background-color: #31c47b;
    float: right;
    margin-right: 10px;
    border-radius: 3px;
}

.active_block {
    display: block;
}

.active_none {
    display: none;
}

.selectcateringcontent {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
}

.selectcateringcontent .shaerleftrightbox {
    width: 50%;
    float: left;
    height: 100%;
    position: relative;
    transition: 0.35s;
    cursor: pointer;
}

.selectcateringcontent .leftcenter {
    background-color: #31c17b;
}

.selectcateringcontent .rightcenter {
    background-color: #ce8639;
}

.selectcateringcontent .shaerleftrightbox .cateringcenter {
    width: 200px;
    height: 215px;
    position: absolute;
    padding-top: 15px;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
}

.selectcateringcontent .shaerleftrightbox .cateringcenter img {
    transition: 0.35s;
}

.selectcateringcontent .shaerleftrightbox .cateringtitle p.smalltitle {
    font-size: 20px;
    line-height: 38px;
}

.selectcateringcontent .shaerleftrightbox .cateringtitle p {
    line-height: 38px;
    font-size: 16px;
    transition: 0.35s;
}

.selectcateringcontent .shaerleftrightbox .cateringtitle p .ii {
    padding-left: 10px;
}

.selectcateringcontent .shaerleftrightbox:hover img {
    -webkit-animation-name: anam1;
    -moz-animation-name: anam1;
    animation-name: anam1;
    -webkit-animation-duration: 1.5s;
    -moz-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    animation-timing-function: linear;
    -moz-animation-iteration-count: 2;
    -webkit-animation-iteration-count: 2;
    -ms-animation-iteration-count: 2;
    animation-iteration-count: 2;
    animation-direction: reverse;
    -webkit-animation-direction: reverse;
    -moz-animation-direction: reverse;
    -ms-animation-direction: reverse;
}
</style>

<!--主体内容导航 end------->
<!--am-->
<!-- Button trigger modal -->
<!-- Modal -->
<div class="modal fade" id="myModalall" tabindex="-1" role="dialog" aria-labelledby="myModalLabelall">
    <div style="top: 200px;width:620px" class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabelall">视频教程 </h4>
            </div>
            <div class="modal-body modea-img">
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY3MjU5NTg4MA==.html">
                        <div class="youku1imgbox youku1img1"></div>
                        <p>收银记账</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgwMDU1Ng==.html">
                        <div class="youku1imgbox youku1img2"></div>
                        <p>会员管理</p>
                    </a>

                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgwNTMxNg==.html">
                        <div class="youku1imgbox youku1img3"></div>
                        <p>商品管理</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgwOTY1Mg==.html">
                        <div class="youku1imgbox youku1img4"></div>
                        <p>库存管理</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgxMjUzMg==.html">
                        <div class="youku1imgbox youku1img5"></div>
                        <p>日常支出</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgxNTA0NA==.html">
                        <div class="youku1imgbox youku1img6"></div>
                        <p>智能分析</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODg2NDQzNg==.html">
                        <div class="youku1imgbox youku1img7"></div>
                        <p>营销工具</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../www.youku.com/index/y404.html">
                        <div class="youku1imgbox youku1img8"></div>
                        <p>系统设置</p>
                    </a>
                </div>
            </div>
            <div style="border-top:0px;" class="modal-footer">

            </div>
        </div>
    </div>
</div>
<!--am-->
<!---------------------am------------------------>
<div class="am-help1" style="width: 250px;
    display:none;
    position: absolute;
    top: 48px;
    z-index: 100000000;
    right: 146px;">
    <ul style="width: 250px;display: block;" class="dropdown-menu extended logout">
        <div style="background: url('images/arrow-up.png') no-repeat;
    width: 20px;
    height: 11px;
    position: absolute;
    right: 40px;
    top: -10px;" class="log-arrow-up"></div>

        <li class="am-formgroup-li">
            <div class="form-group">

                <h1 class="form-group-h1">帮助</h1>
                <select class="form-control am-returnfalse">
                    <option>向德客团队反馈问题</option>
                </select>
            </div>

            <div class="form-group am-returnfalse">
                <textarea id="userfeedback_content" placeholder="说明您的问题，并留下您的联系方式以便我们与您联系" class="form-control" rows="3"></textarea>
                <img class="am-img1" src="images/am/am-882.png">
            </div>
            <div style="margin:0;padding:0;" class="form-group am-returnfalse">
                <input style="width:0px; height:0px;" type="file" name="upFeedbackImg" id="upFeedbackImg" class="am-file1" onchange="amfile(this)" />
            </div>
            <div style="display:none;" class="form-group am-show1 am-returnfalse">
                <p style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;" class="am-p1"> </p>
            </div>
            <input id="btnAddUserFeedback" style="background:#5cc7f9;border:1px solid #50d6fb;" class="btn btn-primary form-control am-returnfalse" type="submit" value="发送">
            <div class="form">

            </div>
        </li>

        <li>
            <a data-toggle="modal" data-target="#myModalall" href="index.html#">
                视频教程
            </a>
        </li>
        <li>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=961917159&site=qq&menu=yes" target="_blank">
                技术支持
            </a>
        </li>
        <li>
            <a href="../www.decerp.cn/help/manual.html" target="_blank">会员手册</a>
        </li>
        <li>
            <a href="http://www.decerp.cn/res/%E5%BE%B7%E5%AE%A2%E8%BD%AF%E4%BB%B6.exe">客户端下载</a>
        </li>
    </ul>
</div>

<!---------------------am------------------------>

<script src="js/socket.io.js"></script>
<script type="text/javascript" src="js/jquery-2.1.0.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script src="laydate/layer/layer.js"></script>
<script src="laydate/laydate.js"></script>
<script src="laypage/laypage.js"></script>
<script src="laydate/layer/extend/layer.ext.js"></script>
<script src="scripts/deke_data-v=20180308.js"></script>
<script src="js/newuser_welcome.js"></script>
<script src="js/ajaxfileupload.js"></script>
<script src="js/validation.js"></script>
<script src="js/decerp.print.js"></script>
<script>
    //================图片的全局路径
    var _g_res_images_url = "http://res.decerp.cc";//新服务器的图片的路径

    //全局是否代理商客户标识
    var _g_is_distributor_customer = false;
    //-----------------------IC卡
    var _g_is_ic_flag = false;
    var _g_is_ic_userid = "";
    var _g_is_ic_pwd = "";
    var _g_is_ic_type = "0";//IC卡通讯硬件设备类型
    //=======================IC卡

    // ====================== 打印配置
    var receptionPtNum = 1; // 前台打印份数
    var receptionPtName;  // 前台打印机名字
    var backstagePtNum = 0; // 后台打印份数
    var backstagePtName; // 后台打印机名字
    var printSet_network_enable = false; // 是否启用后台打印机
    var printSet_network_device_font_islabel = false; // 前台打印机是否为标签打印机
    var printSet_network_device_back_islabel = false; // 后台打印机是否为标签打印机
    var printSet_network_devive_isandroid_enable = false;//是否启用安卓环境打印

    // ====================== 等级分组
    var MembershipGradeGroupingIsON = true; // 等级分组，默认开启

    //=========================等级晋升
    var rankPromotionIsON = false; //默认不开启

    //==========================是否按可用积分晋升
    var availableIntegralSwitch = true;
    var DishIsPrintedOnce = true;//是否一菜一打
    //==========================是否降级
    var rankDemotion = false;//默认关闭
    var g_TraceabilityCode = false;//是否启用追溯码
    var MultiSpecification = false;//是否显示多规格
    var g_WhetherStartusingConsumptionMarket = false;//是否启用计次消费销售提成
    var automaticDevanning = false;//自动拆箱
    var g_play_sound_queue_url = [];
    var g_play_sound_queue_start = [];
    var g_play_sound_queue_end = [];
    var g_play_sound_queue_html = [];
    var g_PlaySoundTimer;
    var _g_everyDaySerialNumber = false;//每日流水号\
    var liushuihaoDate = "";
    var serialNumberOfDailyExpressions = "";
    var g_liushuihao = 1;
    //==========================是否降级
    // ====================== 安卓商米T1分屏配置
    var g_set_pos_t1_secondscreen_enable = false;
    var g_set_pos_t1_secondscreen_size = "";
    var g_set_pos_t1_secondscreen_style = "";
    var g_set_pos_t1_secondscreen_images = "";
    var g_set_pos_t1_secondscreen_video = "";
    // ====================== 安卓商米T1分屏配置

    var SuccessionSwitch = false;//交接班开关
    var g_memberAutoIdstr;//会员卡号
    var g_memberAutoIdstrOld;//会员卡号
    var sv_user_module_config = null;//用户配置

    var g_ZeroInventorySalesQ = true;//是否允许零库存销售
    var g_SubmitIdList = [];//防止重复提交请求
    var WeighingStableAutomaticDetermine = false;//重量稳定后自动确定

    var _g_uc_dixian = { auto: 0, whether: false };//默认关闭
    // ====================== 打印配置
    var g_DisableManualInput = false;//是否禁用手动输入会员卡卡号
    var g_ShareTheResults = true;//是否平分业绩
    var g_AutomaticallyGenerateProductBarcode = false;//是否自动生成商品编码
    var g_WhetherSendtextMessageRemindMember = false;//会员日期提醒
    var g_AutomaticallyGenerateMemberId = false;//是否自动生成会员id
    var g_ShopCateringWechatConfig = false;//微信点餐店铺信息配置
    var user_id;
    var Is_open_commission = false;//
    var Is_verify_store_version = true//是否验证店铺版本权限
    var sv_current_operato = "";
    var moduleConfigList = "";//营销活动配置
    var is_open_print = "";
    var verify_distributor_id = 1;
    var isOpenMicroMall = false;//是否开启微信商城分店
    var IsStore = false;
    var decerpLogoUrl_270 = "/images/logo.jpg"; // 左侧Logo
    var decerpLogoUrl_80 = "/images/dklogo.png"; // 我的店铺LOGO
    var _g_sv_uit_cache_name; // 行业缓存名称
    var _g_get_cache_name_def = new $.Deferred();
    var _g_Catering_Is_Ceremonial_Eat = 0; // 餐饮版店铺营业模式0--正餐，1--快餐
    var _g_CateringOnlineIsAutoOrderAndPrint = 0;
    var _g_TakeOutFoodPrintIP = ""; // 外卖打印地址IP
    var _g_TakeOutFoodPrintPort = ""; // 外卖打印端口地址
    var _g_ValueAddedServices_Recommend_MALL = false;//是否启用了微商城
    var _g_ValueAddedServices_Recommend_MALL_Date = "";//微商城过期的时间
    var _g_ValueAddedServices_Recommend_TOFoodinOneSet = false;//聚合外卖是否购买
    var _g_ValueAddedServices_Recommend_TOFoodinOneSet_Date = ""; //聚合外卖过期时间

    var _g_ValueAddedServices_Recommend_TOScanOrder = false;//扫码点餐
    var _g_ValueAddedServices_Recommend_TOScanOrder_Date = "";//扫码点餐的过期的时间

    var _g_catering_print_success = false; // 当前是否正在打印
    var _g_catering_print_data_total = 0; // 餐饮当前打印数据总数
    var _g_catering_print_data_index = 0; // 餐饮当前正在打印数据index
    //-----------------------用户信息
    var _g_user_config = '';
    var _g_sv_software_versionid = "";//软件的版本信息//1---免费 2---高级适用版 3---连锁版 4---高级版 5---至尊版 6---餐饮版
    //=======================用户信息
    $(document).ready(function () {
        $.ajax({
            url: '/Ajaxdata/Islogin?ISD=' + new Date(),
            async: false,
            success: function (d) {
                user_id = d.user_id;
                _g_sv_uit_cache_name = d.sv_uit_cache_name;
                _g_get_cache_name_def.resolve();
                _g_sv_software_versionid = d.sv_versionid;
                //-----------------
                //try {
                //    var socket = io('http://139.196.24.17:3000');
                _g_user_config = d;
                //    socket.on('common_connect', function (data) {
                //        if (d != -1) {
                //            socket.emit('i_' + data.sid, _g_user_config);
                //        }
                //    });
                //} catch (e) {
                //    console.log(e.message);
                //}
                //=================
                if (d == -1) {
                    window.location.href = "/login.html";
                } else {
                    if (d.isStore == true) {
                        $("#IsStorePwd").hide();
                    }
                    moduleConfigList = d.moduleConfigList;
                    //检查IC卡配置
                    PreferentialTopUpGivingConfigList("SetTardware", "SetTardware_type");
                    var sv_config_is_enable = false;
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        sv_config_is_enable = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_is_ic_type = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    //IC卡密码
                    PreferentialTopUpGivingConfigList("SetTardware", "SetTardware_pwd");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_is_ic_pwd = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    // 判断是否开启了硬件设置开关
                    if (sv_config_is_enable) {
                        var c_ = typeof Cef;
                        if (c_ !== "undefined") {
                            _g_is_ic_flag = true;
                            _g_is_ic_userid = d.user_id;
                            if (_g_is_ic_type == 1) {
                                _g_is_ic_pwd = GetICCardPwd(d.user_id);
                            }
                        }
                    }

                    PreferentialTopUpGivingConfigList("MembershipGradeGrouping", "MembershipGradeGrouping");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        MembershipGradeGroupingIsON = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 积分规则开关
                    }
                    PreferentialTopUpGivingConfigList("rankPromotion", "rankPromotion");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        rankPromotionIsON = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 积分规则开关
                    }
                    PreferentialTopUpGivingConfigList("availableIntegralSwitch", "availableIntegralSwitch");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        availableIntegralSwitch = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否按可用积分晋升
                    }
                    PreferentialTopUpGivingConfigList("SplitOpenACase", "SplitOpenACase");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        automaticDevanning = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否按可用积分晋升
                    }
                    PreferentialTopUpGivingConfigList("MultiSpecification", "MultiSpecification");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        MultiSpecification = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 显示多规格
                    }
                    PreferentialTopUpGivingConfigList("TraceabilityCode", "TraceabilityCode");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_TraceabilityCode = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; //是否启用追溯码
                    }
                    PreferentialTopUpGivingConfigList("WhetherStartusingConsumptionMarket", "WhetherStartusingConsumptionMarket");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_WhetherStartusingConsumptionMarket = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 显示多规格
                    }

                    PreferentialTopUpGivingConfigList("rankDemotion", "rankDemotion");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        rankDemotion = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("EveryDaySerialNumber", "EveryDaySerialNumber");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_everyDaySerialNumber = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否按可用积分晋升
                        var info = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                        if (null != info && "" != info) {
                            var serialNumberEntity = JSON.parse(info);
                            serialNumberOfDailyExpressions = serialNumberEntity.SerialNumberExpression;
                            g_liushuihao = serialNumberEntity.SerialNumber;
                        }
                    }
                    PreferentialTopUpGivingConfigList("DishIsPrintedOnce", "DishIsPrintedOnce");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        DishIsPrintedOnce = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("succession", "succession");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        SuccessionSwitch = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 交接班
                        if (SuccessionSwitch) {
                            $(".handover_hide").show();
                        } else {
                            $(".handover_hide").hide();
                        }
                    }
                    PreferentialTopUpGivingConfigList("DisableManualInput", "DisableManualInput");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_DisableManualInput = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("ShareTheResults", "ShareTheResults");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_ShareTheResults = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("AutomaticallyGenerateProductBarcode", "AutomaticallyGenerateProductBarcode");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_AutomaticallyGenerateProductBarcode = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("WhetherSendtextMessageRemindMember", "WhetherSendtextMessageRemindMember");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_WhetherSendtextMessageRemindMember = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("AutomaticallyGenerateMemberId", "AutomaticallyGenerateMemberId");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_AutomaticallyGenerateMemberId = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                    }
                    PreferentialTopUpGivingConfigList("WeighingStableAutomaticDetermine", "WeighingStableAutomaticDetermine");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        WeighingStableAutomaticDetermine = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 称重自动确认
                    }
                    PreferentialTopUpGivingConfigList("ZeroInventorySales", "ZeroInventorySales");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_ZeroInventorySalesQ = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 零库存
                    }
                    PreferentialTopUpGivingConfigList("ShopCateringWechatConfig", "ShopCateringWechatConfig");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_ShopCateringWechatConfig = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                    }
                    //获取积分抵线配置信息
                    $.getJSON("/system/GetUserPage", function (data) {
                        _g_uc_dixian = JSON.parse(data.sv_uc_dixian);
                    });
                    // ----------------  读取打印配置（打印机打印份数）
                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_default");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        receptionPtNum = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 前台打印份数
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_default_device");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        receptionPtName = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 前台打印机名字
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_enable");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        printSet_network_enable = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否启用后台打印机
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        backstagePtNum = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 前台打印份数
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_device");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        backstagePtName = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 后台打印机名字
                    }


                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_device_font_islabel");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        printSet_network_device_font_islabel = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 前台标签打印机是否启用
                    }
                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_device_back_islabel");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        printSet_network_device_back_islabel = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 后台标签打印机是否启用
                    }

                    // ----------------  读取打印配置（打印机打印份数）


                    // ----------------  读取安卓商米T1分屏配置（读取分屏配置）
                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Size");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_enable = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        g_set_pos_t1_secondscreen_size = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Style");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_style = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Images");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_images = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Video");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_video = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // ----------------  读取安卓商米T1分屏配置（读取分屏配置）

                    // ---------读取餐饮版店铺营业模式------//
                    PreferentialTopUpGivingConfigList("Catering_Is_Ceremonial_Eat", "Catering_Is_Ceremonial_Eat");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_Catering_Is_Ceremonial_Eat = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // ---------读取餐饮版店铺营业模式------//

                    // ----------餐饮线上订单是否自动接单并且打印--------//
                    PreferentialTopUpGivingConfigList("CateringOnlineIsAutoOrderAndPrint", "CateringOnlineIsAutoOrderAndPrint");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_CateringOnlineIsAutoOrderAndPrint = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // -----------餐饮线上订单是否自动接单并且打印-------//

                    // ----------外卖打印机地址--------//
                    PreferentialTopUpGivingConfigList("TakeOutFoodPrintSet", "TakeOutFoodPrintIPSet");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_TakeOutFoodPrintIP = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    PreferentialTopUpGivingConfigList("TakeOutFoodPrintSet", "TakeOutFoodPrintPortSet");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_TakeOutFoodPrintPort = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // -----------外卖打印机地址-------//

                    //------------微商城是否购买-----------//
                    PreferentialTopUpGivingConfigList("ValueAddedServices", "ValueAddedServices_Recommend_MALL");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        //是否启用微商城  sv_detail_is_enable
                        //判断微商城过期时间   sv_expire_date
                        _g_ValueAddedServices_Recommend_MALL = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_ValueAddedServices_Recommend_MALL_Date = Preferential_TopUpGiving_ConfigList[0].sv_expire_date;
                    }
                    //------------微商城是否购买-----------//

                    //------------扫码点餐是否购买--------//
                    PreferentialTopUpGivingConfigList("ValueAddedServices", "ValueAddedServices_Recommend_TOScanOrder");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        //是否启用微商城  sv_detail_is_enable
                        //判断微商城过期时间   sv_expire_date
                        _g_ValueAddedServices_Recommend_TOScanOrder = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_ValueAddedServices_Recommend_TOScanOrder_Date = Preferential_TopUpGiving_ConfigList[0].sv_expire_date;
                    }
                    //------------扫码点餐是否购买--------//

                    //----------餐饮版的聚合外卖---------//
                    PreferentialTopUpGivingConfigList("ValueAddedServices", "ValueAddedServices_Recommend_TOFoodinOneSet");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        //是否启用聚合外卖  sv_detail_is_enable
                        //判断聚合外卖过期时间   sv_expire_date
                        _g_ValueAddedServices_Recommend_TOFoodinOneSet = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_ValueAddedServices_Recommend_TOFoodinOneSet_Date = Preferential_TopUpGiving_ConfigList[0].sv_expire_date;
                    }
                    //----------餐饮版的聚合外卖---------//

                    sv_current_operato = d.sv_code_Name;
                    Is_open_commission = d.sv_isopen_commission;
                    Is_verify_store_version = d.sv_versionid == 1 ? true : false;
                    is_open_print = d.is_open_print;
                    user_id = d.user_id;
                    verify_distributor_id = d.distributor_id;
                    isOpenMicroMall = d.is_open_micromall;
                    IsStore = d.isStore;
                    if (d.is_open_micromall == false) {
                        $(".isOpenMicroMall").hide();

                    } else {
                        $(".isOpenMicroMall").show();
                    }
                    // LOGO
                    if (d.sv_dc_websitelogo != null && d.sv_dc_websitelogo != '' && d.sv_dc_websitelogo != undefined) {
                        decerpLogoUrl_270 = d.sv_dc_websitelogo; // 左侧Logo
                        decerpLogoUrl_80 = d.sv_dc_websitelogo; // 我的店铺LOGO

                    } else {
                        decerpLogoUrl_270 = "/images/agentLogo_270.jpg"; // 左侧Logo
                        decerpLogoUrl_80 = "/images/agentLogo_80.png"; // 我的店铺LOGO
                    }
                    // LOGO

                    if (d.distributor_id != 1 && d.distributor_id != 100) {
                        //---经销商客户过滤---------------
                        //隐藏QQ技术支持
                        $(".floatCtro").hide();
                        $(".dropdown.bzzxws.am-san-jian-top").hide();
                        _g_is_distributor_customer = true;
                        $(".globalText").text("会员管理软件");
                    } else {
                        $(".dropdown.bzzxws.am-san-jian-top").show();
                        //$("#index_footer").html(' <a href="#">联系我们</a> <a href="#">客服电话：<i>400-0521-131</i></a> <a href="http://www.decerp.cn">©2016 www.decerp.cn</a> <a href="http://www.miitbeian.gov.cn/">粤ICP备13009346</a>');
                    }
                    if ((d.distributor_id != 1 || d.isStore == true) && d.distributor_id != 100) {
                        $("#IsonlineRenewal").hide();
                    }
                    var messagecouts = 0;
                    if (d.msgcount > 99) {
                        messagecouts = 99;
                    } else {
                        messagecouts = d.errmsg;
                    }
                    $("#Messagenumber").text(messagecouts);
                    $("#username").text(d.sv_us_name);
                    $("#dianzhu").text(d.sv_ul_name);
                    $('#postion').text(d.sp_grouping_name);

                    if (isNullOrWhiteSpace(d.sv_us_logo)) {
                        $('#userImg').attr('src', _g_res_images_url + d.sv_us_logo);
                    }
                    if (isNullOrWhiteSpace(d.sv_store_logo)) {
                        //$("#logoid").attr('src', );
                        $("#logoidbox").append('<img id="logoid" src="' + _g_res_images_url + d.sv_store_logo + '" onerror="this.src = "/images/dealerlogo.png";" data-step="1" style="width:260px;height:70px" class="demo_8">');
                    }
                    else {
                        //$("#logoid").attr('src', decerpLogoUrl_270);
                        $("#logoidbox").append('<img id="logoid" src="' + decerpLogoUrl_270 + '" onerror="this.src = "/images/dealerlogo.png";" data-step="1" style="width:260px;height:70px" class="demo_8">');
                    }
                }

                //===============判断用户是否初次登录，检查注册时间，时间差10分钟内的登录，展示引导
                var count_new_time = 1;
                var count_time_false = 1;
                //用户注册的时间
                var sv_ul_regdate = d.sv_ul_regdate;
                var sv_ul_regdate_time = new Date(sv_ul_regdate).getTime();
                //当前的√
                var new_login_time = new Date().getTime() + 28800000;
                //两个时间的差值
                var last_login_time = new_login_time - sv_ul_regdate_time;
                //如果两个时间的差值大于10分钟创建一个本地储存
                if (last_login_time <= 600000) {
                    //表示当前时间段内的首次登录
                    if (localStorage.getItem("new_user_first_time") != "0") {
                        localStorage.setItem("new_user_first_time", count_new_time);
                        localStorage.setItem("new_user_count_time_false", count_time_false);
                        isFirstFunc(d.sv_ul_regdate);
                    }
                }
            }
        });

        // 处理异常图片
        $('#logoid').error(function () {
            $(this).attr('src', decerpLogoUrl_270);
        });
        getMessageBox(user_id);
        //loopReadyNewOrderPrint();

        setInterval(function () {
            getMessageBox(user_id);
        }, 60000);

        // 读取线上餐饮订单厨房打印
        if (_g_sv_uit_cache_name == 'cache_name_catering') {
            if (!_g_catering_print_success && (((typeof Cef) !== 'undefined') || (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)) && _g_CateringOnlineIsAutoOrderAndPrint == 0) {
                $.getJSON("/system/Getprint", function (printdata) {
                    if (printdata) {
                        var interval = setInterval(function () {
                            if (!_g_catering_print_success) {
                                getMobileOrderListPrintByUserId(printdata);
                            }
                        }, 1000 * 5 * 1.5);
                    }
                });
            }
        }
    });

    //加载需要打印的数据
    //function loopReadyNewOrderPrint() {
    //    if (_g_sv_uit_cache_name == 'cache_name_catering') {
    //        if ((((typeof Cef) !== 'undefined') || (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)) && _g_CateringOnlineIsAutoOrderAndPrint == 0) {
    //            $.getJSON("/system/Getprint", function (printdata) {
    //                if (printdata) {
    //                    getMobileOrderListPrintByUserId(printdata);
    //                }
    //            });
    //        }
    //    }
    //}

    // 加载餐饮轮询读取需要打印的数据
    // 读取线上餐饮已付款的订单
    function getMobileOrderListPrintByUserId(printdata) {
        const sLEEP_MILLISECONDS = 200;
        _g_catering_print_success = true;
        $.get('/Catering/GetMobileOrderListPrintByUserId', function (data) {
            if (data && data.length > 0) {
                layer.msg('您有一笔线上订单，已向厨房发送菜品打印', { time: 1500 });
                var printSuccess = false;
                for (var i = 0; i < data.length; i++) {
                    _g_catering_print_data_total = data.length;
                    var record = data[i];
                    (function (record) {
                        setTimeout(function () {
                            var hasNullIp = false;//是否有未配置ip的菜品
                            for (var i = 0; i < record.prlist.length; i++) {
                                if (!(record.prlist[i].sv_printer_ip && record.prlist[i].sv_printer_port)) {
                                    hasNullIp = true;
                                    record.prlist[i].sv_printer_ip = _g_TakeOutFoodPrintIP;
                                    record.prlist[i].sv_printer_port = _g_TakeOutFoodPrintPort;
                                }
                            }
                            if (!hasNullIp || (isNullOrWhiteSpace(_g_TakeOutFoodPrintIP) && isNullOrWhiteSpace(_g_TakeOutFoodPrintPort))) {
                                pushcateringprintData(JSON.stringify(record), JSON.stringify(printdata), 2);
                            }
                            else {
                                layer.msg('请配置好外卖打印机信息后才能进行后厨打印！');
                            }
                            if (record.sv_order_type == 0 || record.sv_order_type == 1) {  // 0 -- 前台挂单数据，1--线上付款
                                pushprintData(JSON.stringify(record), JSON.stringify(printdata), 0, 0, 0, 0);
                            }
                            _g_catering_print_data_index++;
                            if (_g_catering_print_data_total == _g_catering_print_data_index) {
                                _g_catering_print_success = false;
                                _g_catering_print_data_index = 0;
                                _g_catering_print_data_total = 0;
                            }
                        }, i * sLEEP_MILLISECONDS);
                    })(record);
                }
            }
            else {
                _g_catering_print_success = false;
                _g_catering_print_data_index = 0;
                _g_catering_print_data_total = 0;
            }
        });
    }
    // 加载餐饮轮询读取需要打印的数据
    function getMessageBox(user_id) {
        $.getAsyncJson('/MessageBox/InstantMessage?userId=' + user_id, null, function (result) {

            var messagehtml = '';
            if (result.succeed && result.values != null && result.values != '') {
                var data = result.values;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].sv_message_title == "线上订单" && data[i].sv_message_isplay == false) {
                        playList += data[i].sv_message_id + ",";
                    }
                    messagehtml += '<li><a href="/news/MessageHint"><i>' + data[i].sv_message_content + '</i><strong>' + data[i].sv_created_by + '</strong></a></li>';
                }
                var playList = "";
                var data1 = result.values;
                for (var i = 0; i < data1.length; i++) {
                    if (data1[i].sv_message_title == "线上订单" && data1[i].sv_message_isplay == false) {
                        playList += data1[i].sv_message_id + ",";
                    }
                }
                if (playList != "") {
                    AddPlaySound("http://res.decerp.cc/music/jiedan.ogg", null, null, "div");//向播放器队列里添加声音文件
                    playList = playList.substring(0, playList.lastIndexOf(','));
                    $.get('/MessageBox/MarkAsReadMessageBox', { "messageId": playList, "type": "play" }, function (result) {
                    });
                }
                messagehtml += '<li><a href="/news/MessageHint">更多消息</a></li>';
                $('#messagehtml').html(messagehtml);
                var messagecouts = 0;
                if (result.errmsg > 99) {
                    messagecouts = 99;
                } else {
                    messagecouts = result.errmsg;
                }
                $('#Messagenumber').html(messagecouts);
            }
            else {
                $('#btnShowMesssageBox').attr('href', '/news/MessageHint');
            }
        });
    }

    //外卖的即时通讯，还有消息，换成正式环境的ip地址
    _g_get_cache_name_def.then(function () {
        if (_g_sv_uit_cache_name == 'cache_name_catering') {
            try {
                //var socket = io('http://127.0.0.1:3000');
                var socket = io('http://139.196.24.17:3001');
                socket.on('common_alluser', function (data) {
                    if (data && data.id) {
                        socket.emit('reg_shop_event' + data.id, { user_id: user_id });
                    }
                });
                socket.on('decerp_Catering_PcOrPhone_Switch', function (data) {
                    //debugger;
                    if (data.cateringSwitch) {
                        getMessageBox(user_id);
                        //loopReadyNewOrderPrint();
                    }
                });
            } catch (e) {
                console.log(e.message);
            }

        }
    });



    //socket.on('userIpOrId', function (data) {
    //    console.log(data);
    //})
    //function jieshu(obj) {

    //}

    //---------------IC公共方法--------------
    //获取店铺IC卡的秘钥 4442
    function GetICCardPwd(userid) {
        return userid.substring(0, 6);
    }

    //绑定IC卡事件
    function bindICCardEvent(icobj) {
        var c_ = typeof Cef;
        if (c_ !== "undefined") {
            icobj.keydown(function (e) {
                GetICCardEventData(icobj, e);
            });
        }
    }
    //读取IC卡数据
    function GetICCardEventData(icobj, e) {
        if (_g_is_ic_flag && e.keyCode == 113) {
            try {
                var data = { Success: false, Message: "" };
                if (_g_is_ic_type == 1) {
                    data = Cef.ReadICCardNoWithPwd(_g_is_ic_pwd, true);
                } else if (_g_is_ic_type == 0) {
                    data = Cef.URFReadCardNo(_g_is_ic_pwd);
                }
                var result = JSON.parse(data);
                if (result) {
                    if (result.Success || result.Success == "true" || result.Success == "True") {
                        var len = parseInt(result.Message.substring(0, 2));
                        icobj.val(result.Message.substring(2, len + 2));
                    } else {
                        layer.msg("读卡失败：" + result.Message);
                    }
                }
            } catch (e) {

            }
        }
    }

    //---------------IC公共方法--------------
</script>

<script>

    $(document).ready(function () {
        var posifrigth = '<div class="floatCtro"><a  href="tencent://message/?uin=961917159&Site=客服&Menu=yes;" class="tankuangbox"><img src="/images/jszc.png" /></a></div>';
        //生成固定右侧技术支持事件
        if (!_g_is_distributor_customer) {
            $('body').append(posifrigth);
        }
        $(function () {
            var AllHet = $(window).height();
            var mainHet = $('.floatCtro').height();
            var fixedTop = (AllHet - mainHet) / 2.2
            $('div.floatCtro').css({ top: fixedTop + 'px' });

            $(window).scroll(scrolls)
            scrolls()
            function scrolls() {
                var sTop = $(window).scrollTop();
                var topPx = sTop + fixedTop
                $('div.floatCtro').stop().animate({ top: topPx });
            }
        });

        if (_g_sv_uit_cache_name == 'cache_name_catering' && false) {
            $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=Catering_Is_Ceremonial_Eat', function (result) {
                if (result != null)
                {
                    var childInfolist = result.childInfolist;
                    if (childInfolist != null && childInfolist.length > 0) {
                        //选择餐饮版的正餐/外卖
                        var selectcateringhtml = '<div class="selectcateringcontent">';
                        selectcateringhtml += '<div class="shaerleftrightbox leftcenter" data-configid="' + childInfolist[0].sv_user_config_id + '" data-moduleid="' + childInfolist[0].sv_user_module_id + '" data-type="0"  id="btnCateringCeremonial"><div class="cateringcenter"><img src="../../images/selecctcatering2.png" class="selectimgani"/><div class="cateringtitle"><p class="smalltitle">正餐</p><p class="title2">点击选择正餐模式<i class="ii icon-circle-arrow-right"></i></p></div></div></div>';
                        selectcateringhtml += '<div class="shaerleftrightbox rightcenter" data-configid="' + childInfolist[0].sv_user_config_id + '" data-moduleid="' + childInfolist[0].sv_user_module_id + '" data-type="1" id="btnCateringTemporary"><div class="cateringcenter"><img src="../../images/selecctcatering1.png" class="selectimgani"/><div class="cateringtitle"><p class="smalltitle">快餐</p><p class="title2">点击选择快餐模式<i class="ii icon-circle-arrow-right"></i></p></div></div></div>';
                        selectcateringhtml += '</div>';
                        var windowH = $(window).height();
                        layer.open({
                            title: null,
                            type: 1,
                            closeBtn: 0, //不显示关闭按钮
                            anim: 2,
                            shift: -1,
                            area: ['100%', windowH + 'px'],
                            shadeClose: false, //开启遮罩关闭
                            content: selectcateringhtml,
                            success: function () {
                                funcCateringSaveType();
                            }
                        });
                    }
                }
            });
        }
    });

    // 餐饮营业模式选择方法回调
    function funcCateringSaveType() {
        $('.shaerleftrightbox').click(function () {
            var thisSelectCateringType = $(this).attr('data-type');
            var thisConfigid = $(this).attr('data-configid');
            var thisModuleid = $(this).attr('data-moduleid');
            if (thisSelectCateringType && thisConfigid && thisConfigid) {
                var detaillist = [];
                var data = {
                    "sv_user_configdetail_id": 0,
                    "sv_detail_value": thisSelectCateringType,
                    "sv_user_config_id": parseInt(thisConfigid),
                    "sv_user_module_id": parseInt(thisModuleid),
                    "sv_detail_is_enable": true,
                    "sv_user_configdetail_name": '餐饮店铺营业模式',
                    "sv_remark": "餐饮店铺营业模式"
                };
                detaillist.push(data);
                if (detaillist.length != 0) {
                    $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=Catering_Is_Ceremonial_Eat', detaillist, function (result) {
                        if (result) {
                            if (result == 1) {
                                layer.msg("保存成功");
                                location.href = "/Home/Index";
                            }
                            else if (result == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("保存失败");
                            }
                        }
                    });
                }
            }
        });
    }

    //********************付费提醒************************versionId, activefalg, expirationDate, distributor_id//
    renewfeeTipsFn();
    function renewfeeTipsFn() {
        $.get("/Home/ExpirationChecker", function (result) {
            if (!result.success) {
                debugger;
                if (result.userinfo.distributor_id == 1) {  //非代理商版本
                    var data = result.userinfo;
                    if (data.sv_versionid == 1) {//免费版
                        if (data.onecbuyversion || data.sv_us_industrytype != 23) {
                            Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                        }
                    }
                    else if (data.sv_versionid == 2) {//高级试用版
                        var nowDate = new Date();
                        var sv_versionexpiration = new Date(data.sv_versionexpiration);
                        var expirationDays_ = parseInt((sv_versionexpiration.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000));//计算过期的时间
                        if (expirationDays_ <= 2){
                            Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                        }
                    }
                    else if (data.sv_versionid == 3) {//连锁版
                        data.branclist = result.branclist;//分店列表
                        Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                    }
                    else if (data.sv_versionid == 4) {//高级版
                        Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                    }
                    console.log(result.userinfo);

                }
                else {  //代理商版本
                    console.log(result);
                }
            }
        });

        /**提醒方法 btntext1按钮1文案 btntext2按钮2文案 text提醒文字 isOpenStoreList分店的列表 data信息**/
        function renewfeeTipsText(data) {
            console.log(data);
            var nowDate = new Date();
            var sv_versionexpiration = new Date(data.sv_versionexpiration);
            var expirationDays_ = parseInt((sv_versionexpiration.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000));//计算过期的时间
            if (data && data.distributor_id == 1) {//总代理版本
                if (data.sv_versionid == 1) {
                    $("#renewfeeBtn").text("马上升级");
                    $("#renewfeetipstext").html('您好，您的店铺由于到期已恢复成免费版，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (sv_us_industrytype == 23) {
                            layer.closeAll();
                        }
                        else {
                            if (expirationDays_ > 0) {
                                layer.closeAll();
                            }
                            else {
                                $("#userLogOut").click();
                            }
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        if (expirationDays_ <= 0){
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });
                }
                else if (data.sv_versionid == 2) {
                    $("#renewfeeBtn").text("马上升级");
                    if (expirationDays_ > 0) {
                        $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天试用到期，为避免影响店铺的正常运营，请及时升级！咨询电话：400-0521-131');
                    }
                    else {
                        if (data.sv_us_industrytype != 23){
                            $("#renewfeetipstext").html('您好，您的店铺由于试用到期已停用，为避免影响店铺的正常运营，请及时升级！咨询电话：400-0521-131');
                        }
                        else{
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已恢复成免费版，部分功能受到限制，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                    }

                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (sv_us_industrytype == 23) {
                            layer.closeAll();
                        }
                        else {
                            if (expirationDays_ > 0) {
                                layer.closeAll();
                            }
                            else {
                                $("#userLogOut").click();
                            }
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        //window.location.href = "/home/versionList";
                        if (expirationDays_ <= 0) {
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });
                }
                else if (data.sv_versionid == 3) {
                    if (data.isStore) {//分店提醒
                        $("#renewfeeBtn").hide(0).text("马上续费");
                        if (expirationDays_ > 0) {
                            $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                        else {
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已停用，为避免影响店铺的正常运营，请及时通知总店续费！咨询电话：400-0521-131');
                        }
                    }
                    else {
                        if (data.branclist && data.branclist.length > 0) {//有分店总店
                            $("#renewfeetipstext").hide(0);
                            $("#storelist").show(0);
                            $("#renewfeeBtn").text("马上续费");
                            $("#renewfeetipstext3").html("您好，下面是您的店铺列表，有的店铺即将到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131");
                            $("#renewfeetipstext3").show(0);
                            var html = '';
                            html = '<tr><td>1</td><td>' + data.sv_us_shortname + '(总店)</td><td>' + new Date(data.sv_versionexpiration).Format("yyyy-MM-dd") + '</td></tr>';
                            $.each(data.branclist, function (i, d) {
                                var time = "";
                                if (d.sv_versionexpiration == null || d.sv_versionexpiration.slice(0, 4) == "0001"){
                                    time = "已到期";
                                }
                                else {
                                    time = new Date(d.sv_versionexpiration).Format("yyyy-MM-dd");
                                }
                                html += '<tr><td>' + (i+2) + '</td><td>' + d.sv_us_shortname + '</td><td>' + time + '</td></tr>';
                            });
                            $("#storeListHtml").html(html);
                        }
                        else {//无分店总店
                            $("#storelist").hide(0);
                            $("#renewfeeBtn").text("马上续费");
                            if (expirationDays_ > 0) {
                                $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                            }
                            else {
                                $("#renewfeetipstext").html('您好，您的店铺由于到期已停用，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                            }
                        }

                    }

                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (expirationDays_ > 0) {
                            layer.closeAll();
                        }
                        else {
                            $("#userLogOut").click();
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        //window.location.href = "/home/versionList";
                        if (expirationDays_ <= 0) {
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });

                }
                else if (data.sv_versionid == 4) {
                    $("#renewfeeBtn").text("马上续费");
                    if (expirationDays_ > 0){
                        $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                    }
                    else {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (sv_us_industrytype == 23){
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已恢复成免费版，部分功能受到限制，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                        else {
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已停用，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                    }

                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if(sv_us_industrytype == 23){
                            layer.closeAll();
                        }
                        else {
                            if (expirationDays_ > 0) {
                                layer.closeAll();
                            }
                            else {
                                $("#userLogOut").click();
                            }
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        //window.location.href = "/home/versionList";
                        if (expirationDays_ <= 0) {
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });
                }

            }
            else {//代理商版本


            }
        }

    }
    //********************付费提醒************************//
</script>


<script>

    $(document).ready(function () {
        addUserFeedback();
        $('#userLogOut').click(function () {
            $.post('/AjaxUser/LogOut', null, function (data) {
                if (_g_is_distributor_customer || verify_distributor_id == 100) {
                    location.href = '/Dealerlogin.html';
                } else {
                    location.href = '/login.html';
                }
            });
        });


        $("#btnStart").click(function () {
            introJs().setOptions({
                nextLabel: '下一步 &rarr;',
                prevLabel: '&larr; 上一步',
                skipLabel: '跳过',
                doneLabel: "我知道了",
                exitOnOverlayClick: false,
                exitOnEsc: false,
                showBullets: false
            }).start();
        });

        var smenu;
        //左侧点击事件
        $('.sidleabtn').click(function () {
            $(this).parent('li').addClass('active').siblings().removeClass('active').find('.dropdown-menu').fadeOut(0);
            $(this).siblings('.dropdown-menu').fadeIn(10);
        });

        //左侧导航移动事件
        $('.sidleabtn').hover(function () {
            $(this).parent('li').addClass('active').siblings().removeClass('active').find('.dropdown-menu').fadeOut(0);
            $(this).siblings('.dropdown-menu').fadeIn(10);
            clearTimeout(smenu);
        }, function () {

            smenu = setTimeout(function () {
                $(".helodao").hide(0);
            }, 400);
        });
        $(".helodao").hover(function () {
                clearTimeout(smenu);
                $(this).show();
            },
            function () {

                $(this).hide();

            });
    });




    // #sidebar ul.sidebar-menu li
    //“系统管理”子菜单行业特性控制/路径加上sv_func_id参数，用于自动更新sv_func_menubutton中的powercode --lings
    $(document).on('click', '#sidebar .sv_func_id', function () {
        var sv_func_id = $(this).attr("sv_func_id");
        var href = $(this).attr("href");
        var concat = "?";
        if (href.indexOf(concat) >= 0) concat = "&";
        href = href + concat + 'sv_func_id=' + sv_func_id;
        $(this).attr("href", "javascript:void(0)");
        window.location.href = href;
    });


    // 弹出消息窗口
    $(document).on('click', '#btnShowMesssageBox', function () {
        if ($('#showSystemMsg').hasClass('open')) {
            $('#showSystemMsg').css('display', 'none');
            $('#showSystemMsg').removeClass('open');
        }
        else {
            $('#showSystemMsg').addClass('open');
            $('#showSystemMsg').css('display', 'block');
            setTimeout(function () {
                $('#showSystemMsg').css('display', 'none');
            }, 3000);
        }
    });

    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?d11c221d75f50281723db1dd1219e14a";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>


<!-------------------am--------------------->
<script>
    $('.am-img1').click(function () {

        $('.am-file1').click();

    })
    function amfile(t) {
        $('.am-show1').css('display', 'block');
        $('.am-p1').text(t.value);
        $('.am-help1').fadeIn();

    }

    $('.am-san-jian-top').on("click", function () {
        if ($(".am-help1").css("display") == "none") {
            $('.am-help1').fadeIn();
            $('.am-loger1').children(".dropdown-menu").fadeOut(300);

        } else {
            $('.am-help1').fadeOut();
        }
    });


    var t = setTimeout(function () {
        $('.am-help1').fadeOut();
    }, 2000);

    $('.am-help1').hover(function () {
        clearTimeout(t);
    }, function () {
        t = setTimeout(function () {
            $('.am-help1').fadeOut();
        }, 2000);
        $('.win7').css('display', 'block');
    });
    (function ($) {
        $('.am-loger1 .dropdown-menu').hover(function () {
            clearTimeout(t);
        }, function () {
            t = setTimeout(function () {
                $('.am-loger1 .dropdown-menu').fadeOut();
            }, 2000);
            $('.win7').css('display', 'block');
        });
    })(jQuery);
    $('.win7').click(function () {
        $(this).css('display', 'none');
        $('.am-loger1 .dropdown-menu').css('display', 'none');
    });
    $('.am-loger1').click(function () {
        if ($(this).children(".dropdown-menu").css("display") == "none") {
            $(this).children(".dropdown-menu").fadeIn(300);
            $('.am-help1').fadeOut();
        } else {
            $(this).children(".dropdown-menu").fadeOut(300);
        }
    });
    $('.am-returnfalse').click(function () {

    });

    var col_ul_li = $('.col-ul li');
    var col_ul_img = $('.col-ul img');
    var amjsonb = ['-52px', '-609px', '-975px', '-1063px', '-1190px', '-1716px', '-1958px', '-2125px', '-2252px', '-2418px'];
    $(col_ul_li).each(function (index, item) {
        $(item).click(function () {
            $(item).addClass('am-color-red').siblings().removeClass('am-color-red');
            col_ul_img.removeClass('displayblock');
            col_ul_img.eq(index).addClass('displayblock');
            $('#amjsonb').css({ 'transform': 'translateY(' + amjsonb[index] + ')', '-webkit-transform': 'translateY(' + amjsonb[index] + ')' });

        })
    })

</script>



<script>
    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
        //仅在Android真机环境下工作，需启用安卓环境下的打印
        if (true || printSet_network_devive_isandroid_enable) {
            document.write('<scri' + 'pt type="text/javascript" src="/cordova.js"></s' + 'cript>');
        }
    }
</script>
</body>
</html>
<script src="js/playSound.js"></script>
<script>
    //var totak = '';
    //function ajax(url, fnSucc, fnFaild) {
    //    //1.创建Ajax对象
    //    if (window.XMLHttpRequest) {
    //        var oAjax = new XMLHttpRequest();
    //    }
    //    else {
    //        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    //    }

    //    //2.连接服务器
    //    //open(方法, 文件名, 异步传输)
    //    oAjax.open('Post', url, true);

    //    //3.发送请求
    //    oAjax.send();

    //    //4.接收返回
    //    oAjax.onreadystatechange = function () {
    //        //oAjax.readyState	//浏览器和服务器，进行到哪一步了
    //        if (oAjax.readyState == 4)	//读取完成
    //        {
    //            if (oAjax.status == 200)	//成功
    //            {
    //                fnSucc(oAjax.responseText);
    //                totak = oAjax.responseText;
    //                totak = JSON.parse(totak);
    //                paging(totak);
    //            }
    //            else {
    //                if (fnFaild) {
    //                    fnFaild(oAjax.status);
    //                }
    //                //alert('失败:'+oAjax.status);
    //            }
    //        }
    //    };
    //}
    //ajax('/Action/ActionView', function (data) { });
    //function paging(v) {
    //    console.log(v);
    //}
</script>
<script>
    //function getCookie(NameOfCookie)
    //{
    //    // 首先我们检查下cookie是否存在.
    //    // 如果不存在则document.cookie的长度为0
    //    if (document.cookie.length > 0)
    //    {
    //      var begin = document.cookie.indexOf(NameOfCookie+'=');
    //        if (begin != -1)
    //        {
    //            // 说明存在我们的cookie.
    //            begin += NameOfCookie.length+1;//cookie值的初始位置
    //            end = document.cookie.indexOf(';', begin);//结束位置
    //            if (end == -1) end = document.cookie.length;//没有;则end为字符串结束位置
    //            return unescape(document.cookie.substring(begin, end));
    //        }
    //    }
    //    return null;
    //    // cookie不存在返回null
    //}
    //var co = getCookie("app");
    //console.log(sessionStorage.GetALLActionViewsClient);
    //if (sessionStorage.GetALLActionViewsClient == null)
    //{
    //    $.post('/AjaxUser/GetALLActionViewsClient', { 'str': co }, function (data) {
    //        sessionStorage.GetALLActionViewsClient = JSON.stringify(data);;
    //        console.log(sessionStorage.GetALLActionViewsClient);
    //    });
    //}
    //function GetALLActionViewsClient()
    //{
    //    thisSLoc = window.location.pathname;
    //    if (thisSLoc == '/Home/buy')
    //    {
    //        return;
    //    }
    //    if (sessionStorage.GetALLActionViewsClient)
    //    {
    //        var data = JSON.parse(sessionStorage.GetALLActionViewsClient);
    //        var date1 = new Date().toLocaleDateString();
    //        var starttime = date1;
    //        var endtime = data[0].endtime;
    //        var starttimes = starttime.split('-');
    //        var endtimes = endtime.split('-');
    //        var starttimeTemp = starttimes[0];
    //        var endtimesTemp = endtimes[0] + '/' + endtimes[1] + '/' + endtimes[2];
    //        endtimesTemp = endtimesTemp.split('T');
    //        console.log(Date.parse(new Date(starttimeTemp)));
    //        console.log(Date.parse(new Date(endtimesTemp[0])));
    //        if (Date.parse(new Date(starttimeTemp)) > Date.parse(new Date(endtimesTemp[0]))) {
    //            window.location.href = '/Home/buy';
    //        }
    //        else {
    //        }
    //        if (data[0].actionName.match(thisSLoc) != null) {
    //            console.log(data[0].actionName.match(thisSLoc));
    //            console.log('您有这个权限');
    //        } else {
    //            window.location.href = '/Home/buy';
    //        }
    //    }
    //}
    //GetALLActionViewsClient();


    //$(window).click(function () {
    //    $('.tikxm').css('width', '100');
    //    $('.layui-layer').css('display', 'block');
    //    $('body').append('<div class="layui-layer layui-layer-tips  layer-anim" id="layui-layer12" type="tips" times="12" showtime="6000" contype="object" style="z-index: 19891026; position: absolute; left: 101.234px; top: 255.5px;"><div id="" class="layui-layer-content" style="background-color: rgb(255, 239, 227);">消费10人民币自动兑换成1个积分默认：10RMB=1积分<i class="layui-layer-TipsG layui-layer-TipsL" style="border-bottom-color: rgb(255, 239, 227);"></i></div><span class="layui-layer-setwin"></span></div>');
    //    $('#layui-layer12').css('background', 'red');
    //})


    //$('.tikxm').click(function () {
    //    alert('ck');
    //})
    // layui-layer layui-layer-tips  layer-anim
</script><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>管理系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keyword" content="网页关键字">
    <meta name="description" content="网页描述文字">
    <meta name="referrer" content="never">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="css/bootstrap-v=IW-m2ufkFbmwZUCZ2zv-8lfKGX8QpmWa_ols-L_APnE.css">
    <link href="css/buttons.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/index-v=20180308.css">
    <link rel="stylesheet" href="css/iconfont.css" />
    <link href="css/introjs.min.css" rel="stylesheet" />
    <link href="css/order.css" rel="stylesheet" />
    <link rel="icon" type="image/png" href="images/title.png" />
    <script src="js/intro.min.js"></script>
    <script src="js/decerp.common-v=20180308.js"></script>
    <script src="js/decerp.print-v=20180308.js"></script>
    <style>.am-color-red {
        color: red;
    }

    .dropdown-menu {
        min-width: 120px;
    }

    .dropdown-menu a {
        text-align: center;
    }

    .modal-body .col-xs-3 {
        text-align: center;
        padding: 20px;
    }

    .modal-body a {
        color: #000;
    }

    .modal-body .col-xs-3 p {
        margin-top: 15px;
    }

    .scale {
        transform: scale(1.1);
        transition: all 0.2s;
    }

    a:hover {
        text-decoration: none;
    }

    .form-group-h1 {
        text-align: center;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .am-formgroup-li {
        padding: 20px 20px 0px 20px;
    }

    .am-img1 {
        width: 20px;
        position: absolute;
        transform: translateY(-21px);
        left: 20px;
        margin-left: 6px;
    }

    body {
        font-family: '微软雅黑';
    }

    .win7 {
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
    }

    .youku1imgbox {
        width: 70px;
        height: 70px;
        margin: auto;
        background: url('images/youkuvideo.png');
    }

    .youku1img1 {
        background-position-y: 0px;
    }

    .youku1img2 {
        background-position-y: -70px;
    }

    .youku1img3 {
        background-position-y: -140px;
    }

    .youku1img4 {
        background-position-y: -210px;
    }

    .youku1img5 {
        background-position-y: -280px;
    }

    .youku1img6 {
        background-position-y: -350px;
    }

    .youku1img7 {
        background-position-y: -420px;
    }

    .youku1img8 {
        background-position-y: -560px;
    }
    </style>
    <link href="am/base.css" rel="stylesheet" />
    <link href="am/attr.css" rel="stylesheet" />
</head>
<body>
<!---头部 start---->
<header class="header green-bg">
    <!--左边LOGO start-->
    <a href="Catering/Cashier.html" id="logoidbox" class="logo" style="margin-top:0px">
        <input type="file" class="flies" style="display:none" id="upLoadImg" name="upLoadImg" />
        <!--<img id="logoid" src="" data-intro="点击LOGO进入前端收银（可切换前后端）" style="height:70px;width:260px" data-step="1" class="demo_7">-->
    </a>
    <!--左边LOGO end--->
    <!--右边显示 start-->
    <div class="top-nav ">
        <div class="showSystemMsg" id="showSystemMsg">
            <div style="background: url('images/arrow-up.png') no-repeat;width: 20px;height: 11px;position: absolute;right: 100px; top: -10px;" class="log-arrow-up"></div>
            <ul id="messagehtml"></ul>
        </div>
        <!--菜单管理  start-->
        <ul class="nav pull-right top-menu">
            <!-----------------进入后台-------------------->
            <li class="dropdown bzzxws">
                <a href="Catering/Cashier.html">
                    <img style="width: 20px;margin-top: 7px;" src="images/returnimg.png" />
                    <span class="username">前台收银</span>
                </a>
            </li>
            <!-----------------进入后台-------------------->
            <!-----------------铃铛  am-------------------->
            <li class="dropdown bzzxws" id="btnShowMesssageBox">
                <a href="javascript:void(0);" style="height: 60px;">
                    <img style="width: 24px;margin-top: 7px;" src="images/dingding.png" />
                    <div class="newcount" id="Messagenumber" style="position:absolute;left:24px;font-size:12px;">0</div>
                    <span class="username">消息</span>
                    <b class="caret"></b>
                </a>
            </li>
            <!--帮助中心  start-->
            <li class="dropdown bzzxws am-san-jian-top" style="display:none;">
                <a data-toggle="dropdown" class="dropdown-toggle" href="index.html#">
                    <i style="font-size:20px; transform: translateX(-117%);" class="icon-question-sign"></i>
                    <span class="username">帮助中心</span>
                    <b class="caret"></b>
                </a>

            </li>
            <li class="dropdown xiaoxi">

                <ul class="dropdown-menu extended inbox">
                    <div class="notify-arrow notify-arrow-yellow"></div>
                    <li>
                        <p class="yellow">你有0条信息</p>
                    </li>
                </ul>
            </li>

            <!--帮助中心  start-->
            <li class="dropdown bzzxws">

            </li>
            <!--帮助中心  end  -->
            <!--登录管理  start-->
            <li onclick="upLoadImg.click();" style="margin-top: 6px;">
                <div class="tximg">
                    <img id="userImg" src="images/001.png" onerror="javascript: this.src = '/images/001.png';">
                </div>
            </li>
            <li class="dropdown am-loger1">
                <a data-toggle="dropdown" class="dropdown-toggle" href="javascript:void(0);">
                    <div class="txrig">
                        <span style="margin-left:5px;" class="username" id="username"></span>
                        <span class="useadmin"><i id="postion"></i><i id="dianzhu"></i></span>
                        <b class="caret"></b>
                    </div>
                </a>
                <ul class="dropdown-menu extended logout">
                    <li id=""><a href="home/Index_N3-software_versionid=3.html"><i class="icon-home"></i>体验新版</a></li>
                    <li id="IsStorePwd"><a id="changePwd" href="javascript:void(0);"><i class="icon-lock"></i>修改密码</a></li>
                    <li id="IsonlineRenewal"><a id="onlineRenewal" href="home/versionList.html"><i class="icon-shopping-cart"></i>在线购买</a></li>
                    <li><a href="javascript:void(0);" onclick="upLoadImg.click()"><i class="icon-user"></i>修改头像</a></li>
                    <li class="handover_hide" hidden="hidden"><a id="handover" href="javascript:void(0);"><i class="icon-off"></i>交接系统</a></li>
                    <li><a id="userLogOut" href="javascript:void(0);"><i class="icon-off"></i>退出系统</a></li>
                </ul>
            </li>
            <!--登录管理   end -->



        </ul>
        <!--菜单管理 end-->
    </div>
</header>
<!---头部 end----->
<!--左侧导航栏 start----->
<aside>
    <section id="sidebar" class="nav-collapse " tabindex="5000" style="outline:none;">
        <ul class="sidebar-menu" style="display: block;">
            <li>
                <a class="sv_func_id " href="Home/Index.html" sv_func_id="7472">
                    <i class="iconfont">&#xe608;</i>
                    <span>&#x9996;&#x9875;</span>
                </a>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe610;</i>
                    <span>&#x4F1A;&#x5458;&#x7BA1;&#x7406;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="member.html#adduser" sv_func_id="7381">&#x65B0;&#x589E;&#x4F1A;&#x5458;</a></li>
                    <li><a class="sv_func_id " href="member/index.html" sv_func_id="7387">&#x4F1A;&#x5458;&#x5217;&#x8868;</a></li>
                    <li><a class="sv_func_id " href="member/savings.html" sv_func_id="7419">&#x4F1A;&#x5458;&#x5145;&#x503C;</a></li>
                    <li><a class="sv_func_id " href="Integral/IntegralChange.html" sv_func_id="7382">&#x79EF;&#x5206;&#x7BA1;&#x7406;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe609;</i>
                    <span>&#x83DC;&#x54C1;&#x7BA1;&#x7406;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="Product/Catering.html" sv_func_id="7424">&#x83DC;&#x54C1;&#x5217;&#x8868;</a></li>
                    <li><a class="sv_func_id " href="ProductCategory/Index.html" sv_func_id="7441">&#x83DC;&#x54C1;&#x5206;&#x7C7B;</a></li>
                    <li><a class="sv_func_id " href="CateringTable/Table.html" sv_func_id="7533">&#x623F;&#x53F0;&#x7BA1;&#x7406;</a></li>
                    <li><a class="sv_func_id " href="CateringTaste/Taste.html" sv_func_id="7534">&#x53E3;&#x5473;&#x7BA1;&#x7406;</a></li>
                    <li><a class="sv_func_id " href="CateringCharging/Charging-type=0.html" sv_func_id="7535">&#x52A0;&#x6599;&#x7BA1;&#x7406;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60a;</i>
                    <span>&#x5E93;&#x5B58;&#x7BA1;&#x7406;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="repertory/procurement.html" sv_func_id="7448">&#x8FDB;&#x8D27;&#x7BA1;&#x7406;</a></li>
                    <li><a class="sv_func_id " href="repertory/tohuo.html" sv_func_id="7470">&#x91C7;&#x8D2D;&#x9000;&#x8D27;</a></li>
                    <li><a class="sv_func_id " href="repertory/check.html" sv_func_id="7471">&#x4EA7;&#x54C1;&#x76D8;&#x70B9;</a></li>
                    <li><a class="sv_func_id " href="repertory/StoreStockGoodsAllot.html" sv_func_id="7469">&#x5E93;&#x5B58;&#x8C03;&#x62E8;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60b;</i>
                    <span>&#x65E5;&#x5E38;&#x652F;&#x51FA;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="expenditure/index.html" sv_func_id="7476">&#x652F;&#x51FA;&#x660E;&#x7EC6;</a></li>
                    <li><a class="sv_func_id " href="expenditure/analyze.html" sv_func_id="7475">&#x652F;&#x51FA;&#x5206;&#x6790;</a></li>
                    <li><a class="sv_func_id " href="expenditure/category.html" sv_func_id="7474">&#x652F;&#x51FA;&#x5206;&#x7C7B;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60c;</i>
                    <span>&#x667A;&#x80FD;&#x5206;&#x6790;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="intelligent/sales.html" sv_func_id="7478">&#x9500;&#x552E;&#x5206;&#x6790;</a></li>
                    <li><a class="sv_func_id " href="intelligent/user.html" sv_func_id="7484">&#x4F1A;&#x5458;&#x5206;&#x6790;</a></li>
                    <li><a class="sv_func_id " href="intelligent/product.html" sv_func_id="7485">&#x4EA7;&#x54C1;&#x5206;&#x6790;</a></li>
                </ul>
            </li>
            <li class="">
                <a class="sidleabtn " href="javascript:void(0);">
                    <i class="iconfont">&#xe60d;</i>
                    <span>&#x8425;&#x9500;&#x5E73;&#x53F0;</span>
                </a>
                <ul class="dropdown-menu helodao">
                    <div class="log-arrow-left"></div>
                    <li><a class="sv_func_id " href="sms/sendsms.html" sv_func_id="7488">&#x8425;&#x9500;&#x77ED;&#x4FE1;</a></li>
                    <li><a class="sv_func_id " href="weixin/CardUser.html" sv_func_id="7490">&#x5FAE;&#x4FE1;&#x4F1A;&#x5458;</a></li>
                    <li><a class="sv_func_id " href="MobileStore/CateringMobileStore.html" sv_func_id="7487">&#x626B;&#x7801;&#x70B9;&#x9910;</a></li>
                    <li><a class="sv_func_id " href="UserModuleConfig/Index.html" sv_func_id="7489">&#x8425;&#x9500;&#x6D3B;&#x52A8;</a></li>
                    <li><a class="sv_func_id " href="Coupon/Coupon.html" sv_func_id="7627">&#x4F18;&#x60E0;&#x5238;</a></li>
                </ul>
            </li>
            <li>
                <a class="sv_func_id " href="OnlineOrder/TakeawayOrder.html" sv_func_id="7506">
                    <i class="iconfont">&#xe60e;</i>
                    <span>&#x5916;&#x5356;&#x8BA2;&#x5355;</span>
                </a>
            </li>
            <li>
                <a class="sv_func_id " href="system/index.html" sv_func_id="7491">
                    <i class="iconfont">&#xe60f;</i>
                    <span>&#x7CFB;&#x7EDF;&#x7BA1;&#x7406;</span>
                </a>
            </li>

        </ul>
    </section>
</aside>
<!--新添加的漂浮气泡提示框 start----->
<!--<div class="poionimgsss">
    <img src="/images/tstitle.png" />
</div>-->
<div class="box-black active_none"></div>
<div id="box-black3" class="box-black3 active_none"></div>
<!--新添加的漂浮气泡提示框 start----->
<div class="indexpage">

    <!--主体内容导航 start----->
    <section class="main_box">
        <!--首页的磁贴 start-->
        <div class="citiebox">
            <div class="row">
                <div class="col-xs-3 ">
                    <div class="xos1  misu">
                        <a href="Catering/Cashier.html" class="boxsmall bgred hover-shadow"><i class="iconfont">&#xe630;</i><span>前台收银</span></a>
                        <a href="Home/Index_N3-software_versionid=3.html" class="boxin bgshe" style="background-color: #f40f40;"><i class="iconfont fontasssscxc">&#xe634;</i><span><text class="globalText">德客</text> 3.0 正式面向大家公测了,进入体验！</span></a>
                    </div>
                    <div class="misu xos1  ">
                        <a href="member.html#adduser" class="bgbule boxsmall push"><i class="iconfont">&#xe631;</i><span>新增会员</span></a>
                        <a href="GiftExchange/GiftExchange.html" class="bgshe boxsmall  push"><i class="iconfont">&#xe635;</i><span>积分兑换</span></a>
                        <a href="system.html" class="bgjls boxsmall  push"><i class="iconfont">&#xe638;</i><span>数据管理</span></a>
                    </div>
                </div>
                <div class="col-xs-3 ">
                    <div class="xos2  misu">
                        <a href="member/savings/index.html" class="boxbig bgqxl"><i class="iconfont">&#xe647;</i><span>会员充值</span></a>
                        <a href="Coupon/Coupon.html" class="boxbig bhybs"><i class="iconfont fontsss">&#xe64a;</i><span>优惠券</span></a>
                        <a href="intelligent/user.html" class="boxbig bgqlve"><i class="iconfont">&#xe639;</i><span>报表中心</span></a>
                    </div>
                </div>
                <div class="col-xs-3 ">
                    <div class="xos2  misu">
                        <a href="expenditure/index.html" class="boxbig bgtzs"><i class="icon-calendar"></i><span>日常支出</span></a>
                    </div>
                    <div class="xos1 misu mr1em">
                        <a href="sms/sendsms.html" class="boxsmall bgsls"><i class="iconfont fontcccc">&#xe649;</i><span>发短信</span></a>
                    </div>
                    <div class="xos1 misu " style="margin-right: 0;">
                        <a href="MobileStore/CateringMobileStore.html" class="boxsmall bgszs"><i class="icon-home"></i><span>微店管理</span></a>
                    </div>
                    <div class="xos2  misu ">
                        <a href="system.html" class="boxbig bgths"><i class="iconfont fontqjsz">&#xe63b;</i><span>全局设置</span></a>
                    </div>
                </div>
                <div class="col-xs-3 ">
                    <div class="xos1  misu ">
                        <a href="Product/Catering.html" class="boxin bgsclv"><i class="iconfont fontasssscxc">&#xe643;</i><span>新增商品</span></a>
                        <a href="system.html" class="boxsmall bgxxzs"><i class="iconfont">&#xe63a;</i><span>分店管理</span></a>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="row gonggao_1">
            <div class="col-xs-6 col-xs-offset-2" style="padding-left:0;">
                <div class="announcement" style="height: 180px;background-color: #fffff8;width:100%;">
                    <p class="text-center" style="color: #666666; padding-top:8px;">德客软件超时异常退出的修复公告</p>
                    <ul>
                        <li>针对近日少数用户在使用德客软件的过程中因长时间不操作导致系统异常退出的情况，德客研发团队已全面排查并处理，系统现已恢复正常。再次感谢用户的一路陪伴与支持！</li>
                    </ul>
                </div>
            </div>
        </div>-->
        <!--首页的磁贴 end---->
    </section>
    <!--主体内容导航 end------->
    <!----脚部 start-------->
    <footer class="index_footer" id="index_footer"></footer>
    <!----脚部 end-------->

</div>

<style>.floatCtro {
    width: 55px;
    height: 180px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    cursor: pointer;
}

.gonggao_1 {
    display: none;
    font-family: SimHei;
    display: none;
}

.gonggao_1 li {
    min-height: 25px;
    line-height: 25px;
    padding-left: 15px;
    padding-right: 8px;
    color: #666666;
}

.yanshi_btn {
    font-size: 13px;
    width: 50px;
    height: 25px;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    background-color: #31c47b;
    float: right;
    margin-right: 10px;
    border-radius: 3px;
}

.active_block {
    display: block;
}

.active_none {
    display: none;
}

.selectcateringcontent {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
}

.selectcateringcontent .shaerleftrightbox {
    width: 50%;
    float: left;
    height: 100%;
    position: relative;
    transition: 0.35s;
    cursor: pointer;
}

.selectcateringcontent .leftcenter {
    background-color: #31c17b;
}

.selectcateringcontent .rightcenter {
    background-color: #ce8639;
}

.selectcateringcontent .shaerleftrightbox .cateringcenter {
    width: 200px;
    height: 215px;
    position: absolute;
    padding-top: 15px;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
}

.selectcateringcontent .shaerleftrightbox .cateringcenter img {
    transition: 0.35s;
}

.selectcateringcontent .shaerleftrightbox .cateringtitle p.smalltitle {
    font-size: 20px;
    line-height: 38px;
}

.selectcateringcontent .shaerleftrightbox .cateringtitle p {
    line-height: 38px;
    font-size: 16px;
    transition: 0.35s;
}

.selectcateringcontent .shaerleftrightbox .cateringtitle p .ii {
    padding-left: 10px;
}

.selectcateringcontent .shaerleftrightbox:hover img {
    -webkit-animation-name: anam1;
    -moz-animation-name: anam1;
    animation-name: anam1;
    -webkit-animation-duration: 1.5s;
    -moz-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    animation-timing-function: linear;
    -moz-animation-iteration-count: 2;
    -webkit-animation-iteration-count: 2;
    -ms-animation-iteration-count: 2;
    animation-iteration-count: 2;
    animation-direction: reverse;
    -webkit-animation-direction: reverse;
    -moz-animation-direction: reverse;
    -ms-animation-direction: reverse;
}
</style>

<!--主体内容导航 end------->
<!--am-->
<!-- Button trigger modal -->
<!-- Modal -->
<div class="modal fade" id="myModalall" tabindex="-1" role="dialog" aria-labelledby="myModalLabelall">
    <div style="top: 200px;width:620px" class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabelall">视频教程 </h4>
            </div>
            <div class="modal-body modea-img">
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY3MjU5NTg4MA==.html">
                        <div class="youku1imgbox youku1img1"></div>
                        <p>收银记账</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgwMDU1Ng==.html">
                        <div class="youku1imgbox youku1img2"></div>
                        <p>会员管理</p>
                    </a>

                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgwNTMxNg==.html">
                        <div class="youku1imgbox youku1img3"></div>
                        <p>商品管理</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgwOTY1Mg==.html">
                        <div class="youku1imgbox youku1img4"></div>
                        <p>库存管理</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgxMjUzMg==.html">
                        <div class="youku1imgbox youku1img5"></div>
                        <p>日常支出</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODgxNTA0NA==.html">
                        <div class="youku1imgbox youku1img6"></div>
                        <p>智能分析</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../v.youku.com/v_show/id_XMTY1ODg2NDQzNg==.html">
                        <div class="youku1imgbox youku1img7"></div>
                        <p>营销工具</p>
                    </a>
                </div>
                <div class="col-xs-3">
                    <a target="_blank" href="../www.youku.com/index/y404.html">
                        <div class="youku1imgbox youku1img8"></div>
                        <p>系统设置</p>
                    </a>
                </div>
            </div>
            <div style="border-top:0px;" class="modal-footer">

            </div>
        </div>
    </div>
</div>
<!--am-->
<!---------------------am------------------------>
<div class="am-help1" style="width: 250px;
    display:none;
    position: absolute;
    top: 48px;
    z-index: 100000000;
    right: 146px;">
    <ul style="width: 250px;display: block;" class="dropdown-menu extended logout">
        <div style="background: url('images/arrow-up.png') no-repeat;
    width: 20px;
    height: 11px;
    position: absolute;
    right: 40px;
    top: -10px;" class="log-arrow-up"></div>

        <li class="am-formgroup-li">
            <div class="form-group">

                <h1 class="form-group-h1">帮助</h1>
                <select class="form-control am-returnfalse">
                    <option>向德客团队反馈问题</option>
                </select>
            </div>

            <div class="form-group am-returnfalse">
                <textarea id="userfeedback_content" placeholder="说明您的问题，并留下您的联系方式以便我们与您联系" class="form-control" rows="3"></textarea>
                <img class="am-img1" src="images/am/am-882.png">
            </div>
            <div style="margin:0;padding:0;" class="form-group am-returnfalse">
                <input style="width:0px; height:0px;" type="file" name="upFeedbackImg" id="upFeedbackImg" class="am-file1" onchange="amfile(this)" />
            </div>
            <div style="display:none;" class="form-group am-show1 am-returnfalse">
                <p style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;" class="am-p1"> </p>
            </div>
            <input id="btnAddUserFeedback" style="background:#5cc7f9;border:1px solid #50d6fb;" class="btn btn-primary form-control am-returnfalse" type="submit" value="发送">
            <div class="form">

            </div>
        </li>

        <li>
            <a data-toggle="modal" data-target="#myModalall" href="index.html#">
                视频教程
            </a>
        </li>
        <li>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=961917159&site=qq&menu=yes" target="_blank">
                技术支持
            </a>
        </li>
        <li>
            <a href="../www.decerp.cn/help/manual.html" target="_blank">会员手册</a>
        </li>
        <li>
            <a href="http://www.decerp.cn/res/%E5%BE%B7%E5%AE%A2%E8%BD%AF%E4%BB%B6.exe">客户端下载</a>
        </li>
    </ul>
</div>

<!---------------------am------------------------>

<script src="js/socket.io.js"></script>
<script type="text/javascript" src="js/jquery-2.1.0.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script src="laydate/layer/layer.js"></script>
<script src="laydate/laydate.js"></script>
<script src="laypage/laypage.js"></script>
<script src="laydate/layer/extend/layer.ext.js"></script>
<script src="scripts/deke_data-v=20180308.js"></script>
<script src="js/newuser_welcome.js"></script>
<script src="js/ajaxfileupload.js"></script>
<script src="js/validation.js"></script>
<script src="js/decerp.print.js"></script>
<script>
    //================图片的全局路径
    var _g_res_images_url = "http://res.decerp.cc";//新服务器的图片的路径

    //全局是否代理商客户标识
    var _g_is_distributor_customer = false;
    //-----------------------IC卡
    var _g_is_ic_flag = false;
    var _g_is_ic_userid = "";
    var _g_is_ic_pwd = "";
    var _g_is_ic_type = "0";//IC卡通讯硬件设备类型
    //=======================IC卡

    // ====================== 打印配置
    var receptionPtNum = 1; // 前台打印份数
    var receptionPtName;  // 前台打印机名字
    var backstagePtNum = 0; // 后台打印份数
    var backstagePtName; // 后台打印机名字
    var printSet_network_enable = false; // 是否启用后台打印机
    var printSet_network_device_font_islabel = false; // 前台打印机是否为标签打印机
    var printSet_network_device_back_islabel = false; // 后台打印机是否为标签打印机
    var printSet_network_devive_isandroid_enable = false;//是否启用安卓环境打印

    // ====================== 等级分组
    var MembershipGradeGroupingIsON = true; // 等级分组，默认开启

    //=========================等级晋升
    var rankPromotionIsON = false; //默认不开启

    //==========================是否按可用积分晋升
    var availableIntegralSwitch = true;
    var DishIsPrintedOnce = true;//是否一菜一打
    //==========================是否降级
    var rankDemotion = false;//默认关闭
    var g_TraceabilityCode = false;//是否启用追溯码
    var MultiSpecification = false;//是否显示多规格
    var g_WhetherStartusingConsumptionMarket = false;//是否启用计次消费销售提成
    var automaticDevanning = false;//自动拆箱
    var g_play_sound_queue_url = [];
    var g_play_sound_queue_start = [];
    var g_play_sound_queue_end = [];
    var g_play_sound_queue_html = [];
    var g_PlaySoundTimer;
    var _g_everyDaySerialNumber = false;//每日流水号\
    var liushuihaoDate = "";
    var serialNumberOfDailyExpressions = "";
    var g_liushuihao = 1;
    //==========================是否降级
    // ====================== 安卓商米T1分屏配置
    var g_set_pos_t1_secondscreen_enable = false;
    var g_set_pos_t1_secondscreen_size = "";
    var g_set_pos_t1_secondscreen_style = "";
    var g_set_pos_t1_secondscreen_images = "";
    var g_set_pos_t1_secondscreen_video = "";
    // ====================== 安卓商米T1分屏配置

    var SuccessionSwitch = false;//交接班开关
    var g_memberAutoIdstr;//会员卡号
    var g_memberAutoIdstrOld;//会员卡号
    var sv_user_module_config = null;//用户配置

    var g_ZeroInventorySalesQ = true;//是否允许零库存销售
    var g_SubmitIdList = [];//防止重复提交请求
    var WeighingStableAutomaticDetermine = false;//重量稳定后自动确定

    var _g_uc_dixian = { auto: 0, whether: false };//默认关闭
    // ====================== 打印配置
    var g_DisableManualInput = false;//是否禁用手动输入会员卡卡号
    var g_ShareTheResults = true;//是否平分业绩
    var g_AutomaticallyGenerateProductBarcode = false;//是否自动生成商品编码
    var g_WhetherSendtextMessageRemindMember = false;//会员日期提醒
    var g_AutomaticallyGenerateMemberId = false;//是否自动生成会员id
    var g_ShopCateringWechatConfig = false;//微信点餐店铺信息配置
    var user_id;
    var Is_open_commission = false;//
    var Is_verify_store_version = true//是否验证店铺版本权限
    var sv_current_operato = "";
    var moduleConfigList = "";//营销活动配置
    var is_open_print = "";
    var verify_distributor_id = 1;
    var isOpenMicroMall = false;//是否开启微信商城分店
    var IsStore = false;
    var decerpLogoUrl_270 = "/images/logo.jpg"; // 左侧Logo
    var decerpLogoUrl_80 = "/images/dklogo.png"; // 我的店铺LOGO
    var _g_sv_uit_cache_name; // 行业缓存名称
    var _g_get_cache_name_def = new $.Deferred();
    var _g_Catering_Is_Ceremonial_Eat = 0; // 餐饮版店铺营业模式0--正餐，1--快餐
    var _g_CateringOnlineIsAutoOrderAndPrint = 0;
    var _g_TakeOutFoodPrintIP = ""; // 外卖打印地址IP
    var _g_TakeOutFoodPrintPort = ""; // 外卖打印端口地址
    var _g_ValueAddedServices_Recommend_MALL = false;//是否启用了微商城
    var _g_ValueAddedServices_Recommend_MALL_Date = "";//微商城过期的时间
    var _g_ValueAddedServices_Recommend_TOFoodinOneSet = false;//聚合外卖是否购买
    var _g_ValueAddedServices_Recommend_TOFoodinOneSet_Date = ""; //聚合外卖过期时间

    var _g_ValueAddedServices_Recommend_TOScanOrder = false;//扫码点餐
    var _g_ValueAddedServices_Recommend_TOScanOrder_Date = "";//扫码点餐的过期的时间

    var _g_catering_print_success = false; // 当前是否正在打印
    var _g_catering_print_data_total = 0; // 餐饮当前打印数据总数
    var _g_catering_print_data_index = 0; // 餐饮当前正在打印数据index
    //-----------------------用户信息
    var _g_user_config = '';
    var _g_sv_software_versionid = "";//软件的版本信息//1---免费 2---高级适用版 3---连锁版 4---高级版 5---至尊版 6---餐饮版
    //=======================用户信息
    $(document).ready(function () {
        $.ajax({
            url: '/Ajaxdata/Islogin?ISD=' + new Date(),
            async: false,
            success: function (d) {
                user_id = d.user_id;
                _g_sv_uit_cache_name = d.sv_uit_cache_name;
                _g_get_cache_name_def.resolve();
                _g_sv_software_versionid = d.sv_versionid;
                //-----------------
                //try {
                //    var socket = io('http://139.196.24.17:3000');
                _g_user_config = d;
                //    socket.on('common_connect', function (data) {
                //        if (d != -1) {
                //            socket.emit('i_' + data.sid, _g_user_config);
                //        }
                //    });
                //} catch (e) {
                //    console.log(e.message);
                //}
                //=================
                if (d == -1) {
                    window.location.href = "/login.html";
                } else {
                    if (d.isStore == true) {
                        $("#IsStorePwd").hide();
                    }
                    moduleConfigList = d.moduleConfigList;
                    //检查IC卡配置
                    PreferentialTopUpGivingConfigList("SetTardware", "SetTardware_type");
                    var sv_config_is_enable = false;
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        sv_config_is_enable = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_is_ic_type = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    //IC卡密码
                    PreferentialTopUpGivingConfigList("SetTardware", "SetTardware_pwd");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_is_ic_pwd = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    // 判断是否开启了硬件设置开关
                    if (sv_config_is_enable) {
                        var c_ = typeof Cef;
                        if (c_ !== "undefined") {
                            _g_is_ic_flag = true;
                            _g_is_ic_userid = d.user_id;
                            if (_g_is_ic_type == 1) {
                                _g_is_ic_pwd = GetICCardPwd(d.user_id);
                            }
                        }
                    }

                    PreferentialTopUpGivingConfigList("MembershipGradeGrouping", "MembershipGradeGrouping");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        MembershipGradeGroupingIsON = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 积分规则开关
                    }
                    PreferentialTopUpGivingConfigList("rankPromotion", "rankPromotion");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        rankPromotionIsON = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 积分规则开关
                    }
                    PreferentialTopUpGivingConfigList("availableIntegralSwitch", "availableIntegralSwitch");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        availableIntegralSwitch = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否按可用积分晋升
                    }
                    PreferentialTopUpGivingConfigList("SplitOpenACase", "SplitOpenACase");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        automaticDevanning = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否按可用积分晋升
                    }
                    PreferentialTopUpGivingConfigList("MultiSpecification", "MultiSpecification");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        MultiSpecification = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 显示多规格
                    }
                    PreferentialTopUpGivingConfigList("TraceabilityCode", "TraceabilityCode");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_TraceabilityCode = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; //是否启用追溯码
                    }
                    PreferentialTopUpGivingConfigList("WhetherStartusingConsumptionMarket", "WhetherStartusingConsumptionMarket");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_WhetherStartusingConsumptionMarket = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 显示多规格
                    }

                    PreferentialTopUpGivingConfigList("rankDemotion", "rankDemotion");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        rankDemotion = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("EveryDaySerialNumber", "EveryDaySerialNumber");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_everyDaySerialNumber = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否按可用积分晋升
                        var info = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                        if (null != info && "" != info) {
                            var serialNumberEntity = JSON.parse(info);
                            serialNumberOfDailyExpressions = serialNumberEntity.SerialNumberExpression;
                            g_liushuihao = serialNumberEntity.SerialNumber;
                        }
                    }
                    PreferentialTopUpGivingConfigList("DishIsPrintedOnce", "DishIsPrintedOnce");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        DishIsPrintedOnce = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("succession", "succession");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        SuccessionSwitch = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 交接班
                        if (SuccessionSwitch) {
                            $(".handover_hide").show();
                        } else {
                            $(".handover_hide").hide();
                        }
                    }
                    PreferentialTopUpGivingConfigList("DisableManualInput", "DisableManualInput");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_DisableManualInput = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("ShareTheResults", "ShareTheResults");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_ShareTheResults = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("AutomaticallyGenerateProductBarcode", "AutomaticallyGenerateProductBarcode");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_AutomaticallyGenerateProductBarcode = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("WhetherSendtextMessageRemindMember", "WhetherSendtextMessageRemindMember");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_WhetherSendtextMessageRemindMember = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 会员等级降级开关
                    }
                    PreferentialTopUpGivingConfigList("AutomaticallyGenerateMemberId", "AutomaticallyGenerateMemberId");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_AutomaticallyGenerateMemberId = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                    }
                    PreferentialTopUpGivingConfigList("WeighingStableAutomaticDetermine", "WeighingStableAutomaticDetermine");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        WeighingStableAutomaticDetermine = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 称重自动确认
                    }
                    PreferentialTopUpGivingConfigList("ZeroInventorySales", "ZeroInventorySales");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_ZeroInventorySalesQ = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 零库存
                    }
                    PreferentialTopUpGivingConfigList("ShopCateringWechatConfig", "ShopCateringWechatConfig");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_ShopCateringWechatConfig = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                    }
                    //获取积分抵线配置信息
                    $.getJSON("/system/GetUserPage", function (data) {
                        _g_uc_dixian = JSON.parse(data.sv_uc_dixian);
                    });
                    // ----------------  读取打印配置（打印机打印份数）
                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_default");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        receptionPtNum = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 前台打印份数
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_default_device");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        receptionPtName = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 前台打印机名字
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_enable");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        printSet_network_enable = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 是否启用后台打印机
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        backstagePtNum = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 前台打印份数
                    }

                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_device");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        backstagePtName = Preferential_TopUpGiving_ConfigList[0].sv_detail_value; // 后台打印机名字
                    }


                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_device_font_islabel");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        printSet_network_device_font_islabel = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 前台标签打印机是否启用
                    }
                    PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_network_device_back_islabel");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        printSet_network_device_back_islabel = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 后台标签打印机是否启用
                    }

                    // ----------------  读取打印配置（打印机打印份数）


                    // ----------------  读取安卓商米T1分屏配置（读取分屏配置）
                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Size");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_enable = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        g_set_pos_t1_secondscreen_size = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Style");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_style = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Images");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_images = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }

                    PreferentialTopUpGivingConfigList("Set_Pos_T1_SecondScreen", "Set_Pos_T1_SecondScreen_Video");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        g_set_pos_t1_secondscreen_video = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // ----------------  读取安卓商米T1分屏配置（读取分屏配置）

                    // ---------读取餐饮版店铺营业模式------//
                    PreferentialTopUpGivingConfigList("Catering_Is_Ceremonial_Eat", "Catering_Is_Ceremonial_Eat");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_Catering_Is_Ceremonial_Eat = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // ---------读取餐饮版店铺营业模式------//

                    // ----------餐饮线上订单是否自动接单并且打印--------//
                    PreferentialTopUpGivingConfigList("CateringOnlineIsAutoOrderAndPrint", "CateringOnlineIsAutoOrderAndPrint");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_CateringOnlineIsAutoOrderAndPrint = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // -----------餐饮线上订单是否自动接单并且打印-------//

                    // ----------外卖打印机地址--------//
                    PreferentialTopUpGivingConfigList("TakeOutFoodPrintSet", "TakeOutFoodPrintIPSet");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_TakeOutFoodPrintIP = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    PreferentialTopUpGivingConfigList("TakeOutFoodPrintSet", "TakeOutFoodPrintPortSet");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        _g_TakeOutFoodPrintPort = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    }
                    // -----------外卖打印机地址-------//

                    //------------微商城是否购买-----------//
                    PreferentialTopUpGivingConfigList("ValueAddedServices", "ValueAddedServices_Recommend_MALL");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        //是否启用微商城  sv_detail_is_enable
                        //判断微商城过期时间   sv_expire_date
                        _g_ValueAddedServices_Recommend_MALL = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_ValueAddedServices_Recommend_MALL_Date = Preferential_TopUpGiving_ConfigList[0].sv_expire_date;
                    }
                    //------------微商城是否购买-----------//

                    //------------扫码点餐是否购买--------//
                    PreferentialTopUpGivingConfigList("ValueAddedServices", "ValueAddedServices_Recommend_TOScanOrder");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        //是否启用微商城  sv_detail_is_enable
                        //判断微商城过期时间   sv_expire_date
                        _g_ValueAddedServices_Recommend_TOScanOrder = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_ValueAddedServices_Recommend_TOScanOrder_Date = Preferential_TopUpGiving_ConfigList[0].sv_expire_date;
                    }
                    //------------扫码点餐是否购买--------//

                    //----------餐饮版的聚合外卖---------//
                    PreferentialTopUpGivingConfigList("ValueAddedServices", "ValueAddedServices_Recommend_TOFoodinOneSet");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                        //是否启用聚合外卖  sv_detail_is_enable
                        //判断聚合外卖过期时间   sv_expire_date
                        _g_ValueAddedServices_Recommend_TOFoodinOneSet = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
                        _g_ValueAddedServices_Recommend_TOFoodinOneSet_Date = Preferential_TopUpGiving_ConfigList[0].sv_expire_date;
                    }
                    //----------餐饮版的聚合外卖---------//

                    sv_current_operato = d.sv_code_Name;
                    Is_open_commission = d.sv_isopen_commission;
                    Is_verify_store_version = d.sv_versionid == 1 ? true : false;
                    is_open_print = d.is_open_print;
                    user_id = d.user_id;
                    verify_distributor_id = d.distributor_id;
                    isOpenMicroMall = d.is_open_micromall;
                    IsStore = d.isStore;
                    if (d.is_open_micromall == false) {
                        $(".isOpenMicroMall").hide();

                    } else {
                        $(".isOpenMicroMall").show();
                    }
                    // LOGO
                    if (d.sv_dc_websitelogo != null && d.sv_dc_websitelogo != '' && d.sv_dc_websitelogo != undefined) {
                        decerpLogoUrl_270 = d.sv_dc_websitelogo; // 左侧Logo
                        decerpLogoUrl_80 = d.sv_dc_websitelogo; // 我的店铺LOGO

                    } else {
                        decerpLogoUrl_270 = "/images/agentLogo_270.jpg"; // 左侧Logo
                        decerpLogoUrl_80 = "/images/agentLogo_80.png"; // 我的店铺LOGO
                    }
                    // LOGO

                    if (d.distributor_id != 1 && d.distributor_id != 100) {
                        //---经销商客户过滤---------------
                        //隐藏QQ技术支持
                        $(".floatCtro").hide();
                        $(".dropdown.bzzxws.am-san-jian-top").hide();
                        _g_is_distributor_customer = true;
                        $(".globalText").text("会员管理软件");
                    } else {
                        $(".dropdown.bzzxws.am-san-jian-top").show();
                        //$("#index_footer").html(' <a href="#">联系我们</a> <a href="#">客服电话：<i>400-0521-131</i></a> <a href="http://www.decerp.cn">©2016 www.decerp.cn</a> <a href="http://www.miitbeian.gov.cn/">粤ICP备13009346</a>');
                    }
                    if ((d.distributor_id != 1 || d.isStore == true) && d.distributor_id != 100) {
                        $("#IsonlineRenewal").hide();
                    }
                    var messagecouts = 0;
                    if (d.msgcount > 99) {
                        messagecouts = 99;
                    } else {
                        messagecouts = d.errmsg;
                    }
                    $("#Messagenumber").text(messagecouts);
                    $("#username").text(d.sv_us_name);
                    $("#dianzhu").text(d.sv_ul_name);
                    $('#postion').text(d.sp_grouping_name);

                    if (isNullOrWhiteSpace(d.sv_us_logo)) {
                        $('#userImg').attr('src', _g_res_images_url + d.sv_us_logo);
                    }
                    if (isNullOrWhiteSpace(d.sv_store_logo)) {
                        //$("#logoid").attr('src', );
                        $("#logoidbox").append('<img id="logoid" src="' + _g_res_images_url + d.sv_store_logo + '" onerror="this.src = "/images/dealerlogo.png";" data-step="1" style="width:260px;height:70px" class="demo_8">');
                    }
                    else {
                        //$("#logoid").attr('src', decerpLogoUrl_270);
                        $("#logoidbox").append('<img id="logoid" src="' + decerpLogoUrl_270 + '" onerror="this.src = "/images/dealerlogo.png";" data-step="1" style="width:260px;height:70px" class="demo_8">');
                    }
                }

                //===============判断用户是否初次登录，检查注册时间，时间差10分钟内的登录，展示引导
                var count_new_time = 1;
                var count_time_false = 1;
                //用户注册的时间
                var sv_ul_regdate = d.sv_ul_regdate;
                var sv_ul_regdate_time = new Date(sv_ul_regdate).getTime();
                //当前的√
                var new_login_time = new Date().getTime() + 28800000;
                //两个时间的差值
                var last_login_time = new_login_time - sv_ul_regdate_time;
                //如果两个时间的差值大于10分钟创建一个本地储存
                if (last_login_time <= 600000) {
                    //表示当前时间段内的首次登录
                    if (localStorage.getItem("new_user_first_time") != "0") {
                        localStorage.setItem("new_user_first_time", count_new_time);
                        localStorage.setItem("new_user_count_time_false", count_time_false);
                        isFirstFunc(d.sv_ul_regdate);
                    }
                }
            }
        });

        // 处理异常图片
        $('#logoid').error(function () {
            $(this).attr('src', decerpLogoUrl_270);
        });
        getMessageBox(user_id);
        //loopReadyNewOrderPrint();

        setInterval(function () {
            getMessageBox(user_id);
        }, 60000);

        // 读取线上餐饮订单厨房打印
        if (_g_sv_uit_cache_name == 'cache_name_catering') {
            if (!_g_catering_print_success && (((typeof Cef) !== 'undefined') || (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)) && _g_CateringOnlineIsAutoOrderAndPrint == 0) {
                $.getJSON("/system/Getprint", function (printdata) {
                    if (printdata) {
                        var interval = setInterval(function () {
                            if (!_g_catering_print_success) {
                                getMobileOrderListPrintByUserId(printdata);
                            }
                        }, 1000 * 5 * 1.5);
                    }
                });
            }
        }
    });

    //加载需要打印的数据
    //function loopReadyNewOrderPrint() {
    //    if (_g_sv_uit_cache_name == 'cache_name_catering') {
    //        if ((((typeof Cef) !== 'undefined') || (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)) && _g_CateringOnlineIsAutoOrderAndPrint == 0) {
    //            $.getJSON("/system/Getprint", function (printdata) {
    //                if (printdata) {
    //                    getMobileOrderListPrintByUserId(printdata);
    //                }
    //            });
    //        }
    //    }
    //}

    // 加载餐饮轮询读取需要打印的数据
    // 读取线上餐饮已付款的订单
    function getMobileOrderListPrintByUserId(printdata) {
        const sLEEP_MILLISECONDS = 200;
        _g_catering_print_success = true;
        $.get('/Catering/GetMobileOrderListPrintByUserId', function (data) {
            if (data && data.length > 0) {
                layer.msg('您有一笔线上订单，已向厨房发送菜品打印', { time: 1500 });
                var printSuccess = false;
                for (var i = 0; i < data.length; i++) {
                    _g_catering_print_data_total = data.length;
                    var record = data[i];
                    (function (record) {
                        setTimeout(function () {
                            var hasNullIp = false;//是否有未配置ip的菜品
                            for (var i = 0; i < record.prlist.length; i++) {
                                if (!(record.prlist[i].sv_printer_ip && record.prlist[i].sv_printer_port)) {
                                    hasNullIp = true;
                                    record.prlist[i].sv_printer_ip = _g_TakeOutFoodPrintIP;
                                    record.prlist[i].sv_printer_port = _g_TakeOutFoodPrintPort;
                                }
                            }
                            if (!hasNullIp || (isNullOrWhiteSpace(_g_TakeOutFoodPrintIP) && isNullOrWhiteSpace(_g_TakeOutFoodPrintPort))) {
                                pushcateringprintData(JSON.stringify(record), JSON.stringify(printdata), 2);
                            }
                            else {
                                layer.msg('请配置好外卖打印机信息后才能进行后厨打印！');
                            }
                            if (record.sv_order_type == 0 || record.sv_order_type == 1) {  // 0 -- 前台挂单数据，1--线上付款
                                pushprintData(JSON.stringify(record), JSON.stringify(printdata), 0, 0, 0, 0);
                            }
                            _g_catering_print_data_index++;
                            if (_g_catering_print_data_total == _g_catering_print_data_index) {
                                _g_catering_print_success = false;
                                _g_catering_print_data_index = 0;
                                _g_catering_print_data_total = 0;
                            }
                        }, i * sLEEP_MILLISECONDS);
                    })(record);
                }
            }
            else {
                _g_catering_print_success = false;
                _g_catering_print_data_index = 0;
                _g_catering_print_data_total = 0;
            }
        });
    }
    // 加载餐饮轮询读取需要打印的数据
    function getMessageBox(user_id) {
        $.getAsyncJson('/MessageBox/InstantMessage?userId=' + user_id, null, function (result) {

            var messagehtml = '';
            if (result.succeed && result.values != null && result.values != '') {
                var data = result.values;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].sv_message_title == "线上订单" && data[i].sv_message_isplay == false) {
                        playList += data[i].sv_message_id + ",";
                    }
                    messagehtml += '<li><a href="/news/MessageHint"><i>' + data[i].sv_message_content + '</i><strong>' + data[i].sv_created_by + '</strong></a></li>';
                }
                var playList = "";
                var data1 = result.values;
                for (var i = 0; i < data1.length; i++) {
                    if (data1[i].sv_message_title == "线上订单" && data1[i].sv_message_isplay == false) {
                        playList += data1[i].sv_message_id + ",";
                    }
                }
                if (playList != "") {
                    AddPlaySound("http://res.decerp.cc/music/jiedan.ogg", null, null, "div");//向播放器队列里添加声音文件
                    playList = playList.substring(0, playList.lastIndexOf(','));
                    $.get('/MessageBox/MarkAsReadMessageBox', { "messageId": playList, "type": "play" }, function (result) {
                    });
                }
                messagehtml += '<li><a href="/news/MessageHint">更多消息</a></li>';
                $('#messagehtml').html(messagehtml);
                var messagecouts = 0;
                if (result.errmsg > 99) {
                    messagecouts = 99;
                } else {
                    messagecouts = result.errmsg;
                }
                $('#Messagenumber').html(messagecouts);
            }
            else {
                $('#btnShowMesssageBox').attr('href', '/news/MessageHint');
            }
        });
    }

    //外卖的即时通讯，还有消息，换成正式环境的ip地址
    _g_get_cache_name_def.then(function () {
        if (_g_sv_uit_cache_name == 'cache_name_catering') {
            try {
                //var socket = io('http://127.0.0.1:3000');
                var socket = io('http://139.196.24.17:3001');
                socket.on('common_alluser', function (data) {
                    if (data && data.id) {
                        socket.emit('reg_shop_event' + data.id, { user_id: user_id });
                    }
                });
                socket.on('decerp_Catering_PcOrPhone_Switch', function (data) {
                    //debugger;
                    if (data.cateringSwitch) {
                        getMessageBox(user_id);
                        //loopReadyNewOrderPrint();
                    }
                });
            } catch (e) {
                console.log(e.message);
            }

        }
    });



    //socket.on('userIpOrId', function (data) {
    //    console.log(data);
    //})
    //function jieshu(obj) {

    //}

    //---------------IC公共方法--------------
    //获取店铺IC卡的秘钥 4442
    function GetICCardPwd(userid) {
        return userid.substring(0, 6);
    }

    //绑定IC卡事件
    function bindICCardEvent(icobj) {
        var c_ = typeof Cef;
        if (c_ !== "undefined") {
            icobj.keydown(function (e) {
                GetICCardEventData(icobj, e);
            });
        }
    }
    //读取IC卡数据
    function GetICCardEventData(icobj, e) {
        if (_g_is_ic_flag && e.keyCode == 113) {
            try {
                var data = { Success: false, Message: "" };
                if (_g_is_ic_type == 1) {
                    data = Cef.ReadICCardNoWithPwd(_g_is_ic_pwd, true);
                } else if (_g_is_ic_type == 0) {
                    data = Cef.URFReadCardNo(_g_is_ic_pwd);
                }
                var result = JSON.parse(data);
                if (result) {
                    if (result.Success || result.Success == "true" || result.Success == "True") {
                        var len = parseInt(result.Message.substring(0, 2));
                        icobj.val(result.Message.substring(2, len + 2));
                    } else {
                        layer.msg("读卡失败：" + result.Message);
                    }
                }
            } catch (e) {

            }
        }
    }

    //---------------IC公共方法--------------
</script>

<script>

    $(document).ready(function () {
        var posifrigth = '<div class="floatCtro"><a  href="tencent://message/?uin=961917159&Site=客服&Menu=yes;" class="tankuangbox"><img src="/images/jszc.png" /></a></div>';
        //生成固定右侧技术支持事件
        if (!_g_is_distributor_customer) {
            $('body').append(posifrigth);
        }
        $(function () {
            var AllHet = $(window).height();
            var mainHet = $('.floatCtro').height();
            var fixedTop = (AllHet - mainHet) / 2.2
            $('div.floatCtro').css({ top: fixedTop + 'px' });

            $(window).scroll(scrolls)
            scrolls()
            function scrolls() {
                var sTop = $(window).scrollTop();
                var topPx = sTop + fixedTop
                $('div.floatCtro').stop().animate({ top: topPx });
            }
        });

        if (_g_sv_uit_cache_name == 'cache_name_catering' && false) {
            $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=Catering_Is_Ceremonial_Eat', function (result) {
                if (result != null)
                {
                    var childInfolist = result.childInfolist;
                    if (childInfolist != null && childInfolist.length > 0) {
                        //选择餐饮版的正餐/外卖
                        var selectcateringhtml = '<div class="selectcateringcontent">';
                        selectcateringhtml += '<div class="shaerleftrightbox leftcenter" data-configid="' + childInfolist[0].sv_user_config_id + '" data-moduleid="' + childInfolist[0].sv_user_module_id + '" data-type="0"  id="btnCateringCeremonial"><div class="cateringcenter"><img src="../../images/selecctcatering2.png" class="selectimgani"/><div class="cateringtitle"><p class="smalltitle">正餐</p><p class="title2">点击选择正餐模式<i class="ii icon-circle-arrow-right"></i></p></div></div></div>';
                        selectcateringhtml += '<div class="shaerleftrightbox rightcenter" data-configid="' + childInfolist[0].sv_user_config_id + '" data-moduleid="' + childInfolist[0].sv_user_module_id + '" data-type="1" id="btnCateringTemporary"><div class="cateringcenter"><img src="../../images/selecctcatering1.png" class="selectimgani"/><div class="cateringtitle"><p class="smalltitle">快餐</p><p class="title2">点击选择快餐模式<i class="ii icon-circle-arrow-right"></i></p></div></div></div>';
                        selectcateringhtml += '</div>';
                        var windowH = $(window).height();
                        layer.open({
                            title: null,
                            type: 1,
                            closeBtn: 0, //不显示关闭按钮
                            anim: 2,
                            shift: -1,
                            area: ['100%', windowH + 'px'],
                            shadeClose: false, //开启遮罩关闭
                            content: selectcateringhtml,
                            success: function () {
                                funcCateringSaveType();
                            }
                        });
                    }
                }
            });
        }
    });

    // 餐饮营业模式选择方法回调
    function funcCateringSaveType() {
        $('.shaerleftrightbox').click(function () {
            var thisSelectCateringType = $(this).attr('data-type');
            var thisConfigid = $(this).attr('data-configid');
            var thisModuleid = $(this).attr('data-moduleid');
            if (thisSelectCateringType && thisConfigid && thisConfigid) {
                var detaillist = [];
                var data = {
                    "sv_user_configdetail_id": 0,
                    "sv_detail_value": thisSelectCateringType,
                    "sv_user_config_id": parseInt(thisConfigid),
                    "sv_user_module_id": parseInt(thisModuleid),
                    "sv_detail_is_enable": true,
                    "sv_user_configdetail_name": '餐饮店铺营业模式',
                    "sv_remark": "餐饮店铺营业模式"
                };
                detaillist.push(data);
                if (detaillist.length != 0) {
                    $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=Catering_Is_Ceremonial_Eat', detaillist, function (result) {
                        if (result) {
                            if (result == 1) {
                                layer.msg("保存成功");
                                location.href = "/Home/Index";
                            }
                            else if (result == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("保存失败");
                            }
                        }
                    });
                }
            }
        });
    }

    //********************付费提醒************************versionId, activefalg, expirationDate, distributor_id//
    renewfeeTipsFn();
    function renewfeeTipsFn() {
        $.get("/Home/ExpirationChecker", function (result) {
            if (!result.success) {
                debugger;
                if (result.userinfo.distributor_id == 1) {  //非代理商版本
                    var data = result.userinfo;
                    if (data.sv_versionid == 1) {//免费版
                        if (data.onecbuyversion || data.sv_us_industrytype != 23) {
                            Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                        }
                    }
                    else if (data.sv_versionid == 2) {//高级试用版
                        var nowDate = new Date();
                        var sv_versionexpiration = new Date(data.sv_versionexpiration);
                        var expirationDays_ = parseInt((sv_versionexpiration.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000));//计算过期的时间
                        if (expirationDays_ <= 2){
                            Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                        }
                    }
                    else if (data.sv_versionid == 3) {//连锁版
                        data.branclist = result.branclist;//分店列表
                        Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                    }
                    else if (data.sv_versionid == 4) {//高级版
                        Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/ajaxHtml_N3/share/payTips.html", renewfeeTipsText, ['480px', '350px'], data);
                    }
                    console.log(result.userinfo);

                }
                else {  //代理商版本
                    console.log(result);
                }
            }
        });

        /**提醒方法 btntext1按钮1文案 btntext2按钮2文案 text提醒文字 isOpenStoreList分店的列表 data信息**/
        function renewfeeTipsText(data) {
            console.log(data);
            var nowDate = new Date();
            var sv_versionexpiration = new Date(data.sv_versionexpiration);
            var expirationDays_ = parseInt((sv_versionexpiration.getTime() - nowDate.getTime()) / (24 * 60 * 60 * 1000));//计算过期的时间
            if (data && data.distributor_id == 1) {//总代理版本
                if (data.sv_versionid == 1) {
                    $("#renewfeeBtn").text("马上升级");
                    $("#renewfeetipstext").html('您好，您的店铺由于到期已恢复成免费版，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (sv_us_industrytype == 23) {
                            layer.closeAll();
                        }
                        else {
                            if (expirationDays_ > 0) {
                                layer.closeAll();
                            }
                            else {
                                $("#userLogOut").click();
                            }
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        if (expirationDays_ <= 0){
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });
                }
                else if (data.sv_versionid == 2) {
                    $("#renewfeeBtn").text("马上升级");
                    if (expirationDays_ > 0) {
                        $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天试用到期，为避免影响店铺的正常运营，请及时升级！咨询电话：400-0521-131');
                    }
                    else {
                        if (data.sv_us_industrytype != 23){
                            $("#renewfeetipstext").html('您好，您的店铺由于试用到期已停用，为避免影响店铺的正常运营，请及时升级！咨询电话：400-0521-131');
                        }
                        else{
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已恢复成免费版，部分功能受到限制，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                    }

                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (sv_us_industrytype == 23) {
                            layer.closeAll();
                        }
                        else {
                            if (expirationDays_ > 0) {
                                layer.closeAll();
                            }
                            else {
                                $("#userLogOut").click();
                            }
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        //window.location.href = "/home/versionList";
                        if (expirationDays_ <= 0) {
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });
                }
                else if (data.sv_versionid == 3) {
                    if (data.isStore) {//分店提醒
                        $("#renewfeeBtn").hide(0).text("马上续费");
                        if (expirationDays_ > 0) {
                            $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                        else {
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已停用，为避免影响店铺的正常运营，请及时通知总店续费！咨询电话：400-0521-131');
                        }
                    }
                    else {
                        if (data.branclist && data.branclist.length > 0) {//有分店总店
                            $("#renewfeetipstext").hide(0);
                            $("#storelist").show(0);
                            $("#renewfeeBtn").text("马上续费");
                            $("#renewfeetipstext3").html("您好，下面是您的店铺列表，有的店铺即将到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131");
                            $("#renewfeetipstext3").show(0);
                            var html = '';
                            html = '<tr><td>1</td><td>' + data.sv_us_shortname + '(总店)</td><td>' + new Date(data.sv_versionexpiration).Format("yyyy-MM-dd") + '</td></tr>';
                            $.each(data.branclist, function (i, d) {
                                var time = "";
                                if (d.sv_versionexpiration == null || d.sv_versionexpiration.slice(0, 4) == "0001"){
                                    time = "已到期";
                                }
                                else {
                                    time = new Date(d.sv_versionexpiration).Format("yyyy-MM-dd");
                                }
                                html += '<tr><td>' + (i+2) + '</td><td>' + d.sv_us_shortname + '</td><td>' + time + '</td></tr>';
                            });
                            $("#storeListHtml").html(html);
                        }
                        else {//无分店总店
                            $("#storelist").hide(0);
                            $("#renewfeeBtn").text("马上续费");
                            if (expirationDays_ > 0) {
                                $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                            }
                            else {
                                $("#renewfeetipstext").html('您好，您的店铺由于到期已停用，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                            }
                        }

                    }

                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (expirationDays_ > 0) {
                            layer.closeAll();
                        }
                        else {
                            $("#userLogOut").click();
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        //window.location.href = "/home/versionList";
                        if (expirationDays_ <= 0) {
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });

                }
                else if (data.sv_versionid == 4) {
                    $("#renewfeeBtn").text("马上续费");
                    if (expirationDays_ > 0){
                        $("#renewfeetipstext").html('您好，您的店铺还有<i style="color:red;padding:0 5px;">' + expirationDays_ + '</i>天到期，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                    }
                    else {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if (sv_us_industrytype == 23){
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已恢复成免费版，部分功能受到限制，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                        else {
                            $("#renewfeetipstext").html('您好，您的店铺由于到期已停用，为避免影响店铺的正常运营，请及时续费！咨询电话：400-0521-131');
                        }
                    }

                    //关闭按钮的事件
                    $("#closerenewfeePage").click(function () {
                        var sv_us_industrytype = data.sv_us_industrytype;
                        if(sv_us_industrytype == 23){
                            layer.closeAll();
                        }
                        else {
                            if (expirationDays_ > 0) {
                                layer.closeAll();
                            }
                            else {
                                $("#userLogOut").click();
                            }
                        }
                    });

                    //马上续费按钮事件
                    $("#renewfeeBtn").click(function () {
                        //window.location.href = "/home/versionList";
                        if (expirationDays_ <= 0) {
                            window.location.href = '/Home/NewPayheight_N3?id=' + data.sv_versionid + '';
                        }
                        else {
                            window.location.href = "/home/versionList";
                        }
                    });
                }

            }
            else {//代理商版本


            }
        }

    }
    //********************付费提醒************************//
</script>


<script>

    $(document).ready(function () {
        addUserFeedback();
        $('#userLogOut').click(function () {
            $.post('/AjaxUser/LogOut', null, function (data) {
                if (_g_is_distributor_customer || verify_distributor_id == 100) {
                    location.href = '/Dealerlogin.html';
                } else {
                    location.href = '/login.html';
                }
            });
        });


        $("#btnStart").click(function () {
            introJs().setOptions({
                nextLabel: '下一步 &rarr;',
                prevLabel: '&larr; 上一步',
                skipLabel: '跳过',
                doneLabel: "我知道了",
                exitOnOverlayClick: false,
                exitOnEsc: false,
                showBullets: false
            }).start();
        });

        var smenu;
        //左侧点击事件
        $('.sidleabtn').click(function () {
            $(this).parent('li').addClass('active').siblings().removeClass('active').find('.dropdown-menu').fadeOut(0);
            $(this).siblings('.dropdown-menu').fadeIn(10);
        });

        //左侧导航移动事件
        $('.sidleabtn').hover(function () {
            $(this).parent('li').addClass('active').siblings().removeClass('active').find('.dropdown-menu').fadeOut(0);
            $(this).siblings('.dropdown-menu').fadeIn(10);
            clearTimeout(smenu);
        }, function () {

            smenu = setTimeout(function () {
                $(".helodao").hide(0);
            }, 400);
        });
        $(".helodao").hover(function () {
                clearTimeout(smenu);
                $(this).show();
            },
            function () {

                $(this).hide();

            });
    });




    // #sidebar ul.sidebar-menu li
    //“系统管理”子菜单行业特性控制/路径加上sv_func_id参数，用于自动更新sv_func_menubutton中的powercode --lings
    $(document).on('click', '#sidebar .sv_func_id', function () {
        var sv_func_id = $(this).attr("sv_func_id");
        var href = $(this).attr("href");
        var concat = "?";
        if (href.indexOf(concat) >= 0) concat = "&";
        href = href + concat + 'sv_func_id=' + sv_func_id;
        $(this).attr("href", "javascript:void(0)");
        window.location.href = href;
    });


    // 弹出消息窗口
    $(document).on('click', '#btnShowMesssageBox', function () {
        if ($('#showSystemMsg').hasClass('open')) {
            $('#showSystemMsg').css('display', 'none');
            $('#showSystemMsg').removeClass('open');
        }
        else {
            $('#showSystemMsg').addClass('open');
            $('#showSystemMsg').css('display', 'block');
            setTimeout(function () {
                $('#showSystemMsg').css('display', 'none');
            }, 3000);
        }
    });

    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?d11c221d75f50281723db1dd1219e14a";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>


<!-------------------am--------------------->
<script>
    $('.am-img1').click(function () {

        $('.am-file1').click();

    })
    function amfile(t) {
        $('.am-show1').css('display', 'block');
        $('.am-p1').text(t.value);
        $('.am-help1').fadeIn();

    }

    $('.am-san-jian-top').on("click", function () {
        if ($(".am-help1").css("display") == "none") {
            $('.am-help1').fadeIn();
            $('.am-loger1').children(".dropdown-menu").fadeOut(300);

        } else {
            $('.am-help1').fadeOut();
        }
    });


    var t = setTimeout(function () {
        $('.am-help1').fadeOut();
    }, 2000);

    $('.am-help1').hover(function () {
        clearTimeout(t);
    }, function () {
        t = setTimeout(function () {
            $('.am-help1').fadeOut();
        }, 2000);
        $('.win7').css('display', 'block');
    });
    (function ($) {
        $('.am-loger1 .dropdown-menu').hover(function () {
            clearTimeout(t);
        }, function () {
            t = setTimeout(function () {
                $('.am-loger1 .dropdown-menu').fadeOut();
            }, 2000);
            $('.win7').css('display', 'block');
        });
    })(jQuery);
    $('.win7').click(function () {
        $(this).css('display', 'none');
        $('.am-loger1 .dropdown-menu').css('display', 'none');
    });
    $('.am-loger1').click(function () {
        if ($(this).children(".dropdown-menu").css("display") == "none") {
            $(this).children(".dropdown-menu").fadeIn(300);
            $('.am-help1').fadeOut();
        } else {
            $(this).children(".dropdown-menu").fadeOut(300);
        }
    });
    $('.am-returnfalse').click(function () {

    });

    var col_ul_li = $('.col-ul li');
    var col_ul_img = $('.col-ul img');
    var amjsonb = ['-52px', '-609px', '-975px', '-1063px', '-1190px', '-1716px', '-1958px', '-2125px', '-2252px', '-2418px'];
    $(col_ul_li).each(function (index, item) {
        $(item).click(function () {
            $(item).addClass('am-color-red').siblings().removeClass('am-color-red');
            col_ul_img.removeClass('displayblock');
            col_ul_img.eq(index).addClass('displayblock');
            $('#amjsonb').css({ 'transform': 'translateY(' + amjsonb[index] + ')', '-webkit-transform': 'translateY(' + amjsonb[index] + ')' });

        })
    })

</script>



<script>
    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
        //仅在Android真机环境下工作，需启用安卓环境下的打印
        if (true || printSet_network_devive_isandroid_enable) {
            document.write('<scri' + 'pt type="text/javascript" src="/cordova.js"></s' + 'cript>');
        }
    }
</script>
</body>
</html>
<script src="js/playSound.js"></script>
<script>
    //var totak = '';
    //function ajax(url, fnSucc, fnFaild) {
    //    //1.创建Ajax对象
    //    if (window.XMLHttpRequest) {
    //        var oAjax = new XMLHttpRequest();
    //    }
    //    else {
    //        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    //    }

    //    //2.连接服务器
    //    //open(方法, 文件名, 异步传输)
    //    oAjax.open('Post', url, true);

    //    //3.发送请求
    //    oAjax.send();

    //    //4.接收返回
    //    oAjax.onreadystatechange = function () {
    //        //oAjax.readyState	//浏览器和服务器，进行到哪一步了
    //        if (oAjax.readyState == 4)	//读取完成
    //        {
    //            if (oAjax.status == 200)	//成功
    //            {
    //                fnSucc(oAjax.responseText);
    //                totak = oAjax.responseText;
    //                totak = JSON.parse(totak);
    //                paging(totak);
    //            }
    //            else {
    //                if (fnFaild) {
    //                    fnFaild(oAjax.status);
    //                }
    //                //alert('失败:'+oAjax.status);
    //            }
    //        }
    //    };
    //}
    //ajax('/Action/ActionView', function (data) { });
    //function paging(v) {
    //    console.log(v);
    //}
</script>
<script>
    //function getCookie(NameOfCookie)
    //{
    //    // 首先我们检查下cookie是否存在.
    //    // 如果不存在则document.cookie的长度为0
    //    if (document.cookie.length > 0)
    //    {
    //      var begin = document.cookie.indexOf(NameOfCookie+'=');
    //        if (begin != -1)
    //        {
    //            // 说明存在我们的cookie.
    //            begin += NameOfCookie.length+1;//cookie值的初始位置
    //            end = document.cookie.indexOf(';', begin);//结束位置
    //            if (end == -1) end = document.cookie.length;//没有;则end为字符串结束位置
    //            return unescape(document.cookie.substring(begin, end));
    //        }
    //    }
    //    return null;
    //    // cookie不存在返回null
    //}
    //var co = getCookie("app");
    //console.log(sessionStorage.GetALLActionViewsClient);
    //if (sessionStorage.GetALLActionViewsClient == null)
    //{
    //    $.post('/AjaxUser/GetALLActionViewsClient', { 'str': co }, function (data) {
    //        sessionStorage.GetALLActionViewsClient = JSON.stringify(data);;
    //        console.log(sessionStorage.GetALLActionViewsClient);
    //    });
    //}
    //function GetALLActionViewsClient()
    //{
    //    thisSLoc = window.location.pathname;
    //    if (thisSLoc == '/Home/buy')
    //    {
    //        return;
    //    }
    //    if (sessionStorage.GetALLActionViewsClient)
    //    {
    //        var data = JSON.parse(sessionStorage.GetALLActionViewsClient);
    //        var date1 = new Date().toLocaleDateString();
    //        var starttime = date1;
    //        var endtime = data[0].endtime;
    //        var starttimes = starttime.split('-');
    //        var endtimes = endtime.split('-');
    //        var starttimeTemp = starttimes[0];
    //        var endtimesTemp = endtimes[0] + '/' + endtimes[1] + '/' + endtimes[2];
    //        endtimesTemp = endtimesTemp.split('T');
    //        console.log(Date.parse(new Date(starttimeTemp)));
    //        console.log(Date.parse(new Date(endtimesTemp[0])));
    //        if (Date.parse(new Date(starttimeTemp)) > Date.parse(new Date(endtimesTemp[0]))) {
    //            window.location.href = '/Home/buy';
    //        }
    //        else {
    //        }
    //        if (data[0].actionName.match(thisSLoc) != null) {
    //            console.log(data[0].actionName.match(thisSLoc));
    //            console.log('您有这个权限');
    //        } else {
    //            window.location.href = '/Home/buy';
    //        }
    //    }
    //}
    //GetALLActionViewsClient();


    //$(window).click(function () {
    //    $('.tikxm').css('width', '100');
    //    $('.layui-layer').css('display', 'block');
    //    $('body').append('<div class="layui-layer layui-layer-tips  layer-anim" id="layui-layer12" type="tips" times="12" showtime="6000" contype="object" style="z-index: 19891026; position: absolute; left: 101.234px; top: 255.5px;"><div id="" class="layui-layer-content" style="background-color: rgb(255, 239, 227);">消费10人民币自动兑换成1个积分默认：10RMB=1积分<i class="layui-layer-TipsG layui-layer-TipsL" style="border-bottom-color: rgb(255, 239, 227);"></i></div><span class="layui-layer-setwin"></span></div>');
    //    $('#layui-layer12').css('background', 'red');
    //})


    //$('.tikxm').click(function () {
    //    alert('ck');
    //})
    // layui-layer layui-layer-tips  layer-anim
</script>