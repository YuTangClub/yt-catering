//滑块移动执行的事件		
var slider = document.getElementById("slider");
var slider_bar = document.getElementById("slider-bar");
var activeliwidth = document.getElementById("activeli");
var liWidth = 120;//每个li的宽度
var sliderStarLeft = 120;
var sliderindex;//当前滑块的index
var index;//滑块过程中的index
slider.onmousedown = function () {
    var e = window.event || event;
    var sliderL = event.clientX - slider.offsetLeft;
    document.onmousemove = function () {
        var e = window.event || event;
        var mouseX = event.clientX;
        var x = mouseX - sliderL;
        if (x > 578) {
            x = 578;
        }
        if (x <= 98) {
            x = 98;
        }
        slider.style.left = x + "px";
        activeli.style.width = 22 + x + "px";
        index = (slider.offsetLeft + slider.offsetWidth) / 120 - 1;
        if (index == 0) {
            $('#selectyear>li:eq(0)').addClass("active").siblings("li").removeClass("active");
        } else if (index > 0 && index <= 1) {
            $('#selectyear>li:eq(1)').addClass("active").siblings("li").removeClass("active");
            sliderindex = 2;
        } else if (index > 1 && index <= 2) {
            $('#selectyear>li:eq(2)').addClass("active").siblings("li").removeClass("active");
            sliderindex = 3;
        } else if (index > 2 && index <= 3) {
            $('#selectyear>li:eq(3)').addClass("active").siblings("li").removeClass("active");
            sliderindex = 4;
        } else if (index > 3 && index <= 4) {
            $('#selectyear>li:eq(4)').addClass("active").siblings("li").removeClass("active");
            sliderindex = 5;
        }
        onmouseupFn();
        return false;
    }
}
//鼠标弹起执行的事件
function onmouseupFn() {
    document.onmouseup = function () {
        document.onmousemove = null;
        //背景的动画
        if (index && index > 0) {
            activeli.style.width = liWidth * sliderindex + "px";
            slider.style.left = sliderStarLeft * sliderindex - 22 + "px";
            $("#yearNumber").val(sliderindex);
        } else {
            $("#yearNumber").val(1);
        }
        addMoney();
    }
}

//计算金额
function addMoney(){
    var singleMoney = parseFloat($("#needMoney").val() || 0);//功能的单价
    var number = parseFloat($("#yearNumber").val() || 0);//购买的年限
    $("#pay").text((singleMoney * number));
}

//点击输入年限的提示
$("#yearNumber").click(function () {
    layer.msg("请拖拉左边的滑块选择购买的年限");
});

//确认支付按钮事件
$("#btnPay").click(function () {
    var singleMoney = $("#needMoney").val();//功能的单价
    var number = $("#yearNumber").val();//购买的年限
    var sv_totalprice = parseFloat($("#pay").text() || 0);//购买的总金额
    var sv_order_type = $("#sv_order_type").val();//购买的类型
    var sv_services_name = $("#slider-bar li a.active").text();//购买的名称
    var sv_paytype = $(".pay[name='selectpaystyle']:checked").val();//支付类型
    var isfree = false;//是否免费
    var sv_remark = "购买" + sv_services_name + ": 开通" + sv_services_name;//备注

    var data = {
        sv_services_name: sv_services_name,
        sv_number: number,
        sv_unitprice: singleMoney,
        sv_totalprice: sv_totalprice,
        sv_order_state: 0,
        sv_paytype: sv_paytype,
        sv_order_type: sv_order_type,
        sv_remark: sv_remark,
        sv_levelNumber: $(".levelNumber").val(),
        isfree: isfree//是否免费
    }
    console.log(data);
    layer.load();
    var orderTime = 0;
    if (singleMoney > 0 && sv_totalprice > 0 && number > 0) {
        $.postJson('/ValueAdded/ValueAdded_Order', data, function (data) {
            layer.closeAll();
            if (data.succeed) {
                var scanPay;
                var title = '';
                if (sv_paytype == '支付宝') {
                    scanPay = "<div class=\"wxsaosao\"><div class=\"text-ceneter padding20\"><img style='margin:auto;display:block;' src=\"/images/alipaylogo.png\" width=\"100\" class=\"kkimg\"></div><div class=\"text-ceneter\"><img style='margin:auto;display:block;' src=" + data.values + " width=\"200\" class=\"bbimg\"></div></div>";
                    title = '支付宝扫一扫支付';
                }
                else {
                    scanPay = "<div class=\"wxsaosao\"><div class=\"text-ceneter padding20\"><img style='margin:auto;display:block;' src=\"/images/WePayLogo.png\" width=\"100\" class=\"kkimg\"></div><div class=\"text-ceneter\"><img style='margin:auto;display:block;' src=" + data.values + " width=\"200\" class=\"bbimg\"></div></div>";
                    title = '微信扫一扫支付';
                }
                layer.open({
                    type: 1,
                    title: title,
                    area: ['380px', '380px'],
                    content: scanPay
                });
                var iCount = setInterval(function () {
                    orderTime += 3;
                    if (orderTime <= 600) {
                        $.getJSON("/ValueAdded/Getorderstate?id=" + data.errmsg, function (data) {
                            if (data) {
                                layer.closeAll();
                                layer.msg("购买成功，您现在可以使用该功能了");
                            }
                        });
                    }
                    else {
                        clearInterval(iCount);
                        layer.msg("您的订单已过期失效！");
                    }
                }, 3000);
            }
            else {
                layer.msg("订单提交失败,请稍后重试！");
            }
        });
    } else {
        layer.msg("订单信息有误，请刷新重试！")
    }
});

