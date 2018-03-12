//按钮设置
function btnknowFn() {
    $('<button class="btn-success btn btn_know" style="font-size: 12px;margin-left: 10px;background-color:#eaead6;color:#666666;border:none;">结束演示</button>').appendTo(".layui-layer-content");
}
function btn_newuserFn() {
    $('<button class="btn-success btn nex1" style="font-size: 12px;background:#7cd97f;color:#ffffff;border:none;">下一步</button>').appendTo(".layui-layer-content");
}
function nexbtn_newuserFn() {
    $('<button class="btn-success btn nex2" style="font-size: 12px;background-color:#7cd97f;color:#ffffff;border:none;">下一步</button>').appendTo(".layui-layer-content");
}
function nexbtn3_newuserFn() {
    $('<button class="btn-success btn nex3" style="font-size: 12px;color:#ffffff;border:none;float: right;">③ 下一步</button>').appendTo(".layui-layer-content");
}
var switch_newuser = false;
function isFirstFunc(regDate) {
    var isfirst = localStorage.getItem("new_user_first_time");
    var hasshow = localStorage.getItem("new_user_count_time_false");
    var end_show_dome = 0;
    if (isfirst == "1") {
        //检查是否已经引导过、
        //hasshow=0;
        if (hasshow == "0") {
            return;
            
        }
        //开始引导
        switch_newuser = true;
    }
    if (switch_newuser) {
        newswelcome();
        //步骤操作
        $(".nex_").click(function () {
            $(".layui-layer-shade,.welcome_").addClass("active_none");
            $(".demo_5").addClass("more_demo");
            $(".box-black3").css("display", "block");
            layer.tips('1.添加会员 2.会员充次 3.会员充值', '.demo_5', {
                time: 500000,
                tips: 3,
            });
            $(".layui-layer-content").addClass("next_one");
            btn_newuserFn();
            nex_clickFn();
            localStorage.setItem("new_user_first_time",0);
        });
    }
}
if (switch_newuser) {
    newswelcome();
    //步骤操作
    $(".nex_").click(function () {
        $(".layui-layer-shade,.welcome_").addClass("active_none");
        $(".demo_5").addClass("more_demo");
        $(".box-black3").css("display", "block");
        layer.tips('1.添加会员 2.会员充次 3.会员充值', '.demo_5', {
            time: 500000,
            tips: 3,
        });
        $(".layui-layer-content").addClass("next_one");
        btn_newuserFn();
        nex_clickFn();
    });
}

//欢迎语
function newswelcome() {
    layer.open({
        type: 1,
        area: ['350px', '200px'],
        shadeClose: false, //点击遮罩关闭
        content: '\<\p class="block_p"><button class="btn btn-warning nex_">马上开始</button>\<\/p>',
        time: '100000',
        title: 'Hi，欢迎您的到来，我是店铺管家——小德子。现在为 您做功能详解，教您如何轻松管理店铺！',
    });
    $(".layui-layer").css({
        borderRadius: 5,
    });
    $(".layui-layer").addClass("welcome_");
    $(".layui-layer-title").addClass("welcome_title");
    $(".welcome_title").css({
        "padding":"0",
        "height": "100px",
        "line-height": "30px",
        "overflow": "hidden",
        "white-space": "pre-line",
        "position": "relative",
        "top":"-80px",
        "background":"#f7f2e0",
        "padding-left": "10px",
        "padding-right": "10px",
        "border": "none",
        "color": "#666666",
    });
    $(".welcome_").css({
        "background":"#f7f2e0",
    });
    $(".layui-layer-setwin").css("display", "none");
    $(".layui-layer-content").addClass("btn_star");
}
function nex_clickFn() {
    $(".nex1").click(function () {
        $(".demo_5").removeClass("more_demo");
        $(".layui-layer-content").addClass("active_none");
        $(".demo_6").addClass("more_demo");
        layer.tips('1.添加商品分类 2.添加商品', '.demo_6', {
            time: 500000,
            tips: 3,
        });
        $(".layui-layer-content").addClass("next_tow");
        nexbtn_newuserFn();
        $(".nex2").click(function () {
            $(".demo_6").removeClass("more_demo");
            $(".layui-layer-content").addClass("active_none");
            $(".demo_7").addClass("more_demo");
            $(".box_block3").addClass("pointer-events");
            layer.tips('准备就绪，开始收银结算？请点击LOGO图标，切换前后台！', '.demo_7', {
                time: 500000,
                tips: 2,
            });
            $(".layui-layer-content").addClass("tips_css");
            $("#box-black3").css("pointer-events", "none");
            localStorage.setItem("new_user_count_time_false", end_show_dome);
            localStorage.clear("new_user_count_time_false");
            //location.href = "http://localhost:63243/home/index2";
            //if (localStorage.getItem("decerp_demo_newuser")) {
            //    $(".demo_8").addClass("more_demo");
            //    localStorage.clear("decerp_demo_newuser");
            //}
        });
    });
}

