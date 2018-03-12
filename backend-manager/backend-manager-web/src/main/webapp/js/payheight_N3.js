//滑块移动执行的事件		
var slider = document.getElementById("slider");
var slider_bar = document.getElementById("slider-bar");
var activeliwidth = document.getElementById("activeli");
var liWidth = 120;//每个li的宽度
var sliderStarLeft = 120;
var sliderindex;//当前滑块的index
var index;//滑块过程中的index
if (slider != undefined) {
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
        if ($("#sv_versionid").val() == 4) {
            calculateMoney();
        }
        else {
            calculateMoney_better();
        }
    }
}

//输入改变的事件
$("#yearNumber").change(function () {
    var thisval = parseInt($(this).val() || 0);
    if (thisval <= 0) {
        $("#yearNumber").val(1);
    } else if (thisval > 5) {
        $("#yearNumber").val(5);
    }
    $("#yearNumber").val(parseInt($(this).val()));
    var index = $("#yearNumber").val();
    activeli.style.width = liWidth * index + "px";
    slider.style.left = sliderStarLeft * index - 22 + "px";
    $('#selectyear>li:eq(' + (index - 1) + ')').addClass("active").siblings("li").removeClass("active");
});

//拖拉选择年限
$("#yearNumber").click(function () {
    layer.msg("请拖拉左边滑块选择年限");
});

//高级版选择购买类型
$(".checkedType[name='year-mo']").click(function () {
    var type = $(this).data("type");
    if (type == "year") {
        $(".monthheightversion").hide(0);
        $(".yearheightversion").show(0);
    } else {
        $(".yearheightversion").hide(0);
        $(".monthheightversion").show(0);
    }
    calculateMoney();
});

//高级版计算的金额
function calculateMoney() {
    var subbox = $('input[name="year-mo"]:checked');
    var number = $(".shop_year_counts[name=" + subbox.val() + "]").val();
    var money = parseFloat(subbox.val() || 0) * parseFloat(number || 0);
    $("#pay").text(money);
    $("#pay_show").text(money);
}

//至尊版计算的金额
function calculateMoney_better() {
    if ($("#sv_versionid").val() == 5) {
        var price = $("#versionPrice").val();//版本的金额
        var number = $(".shop_year_counts[name=" + price + "]").val();
        var money = parseFloat(price || 0) * parseFloat(number || 0);
        $("#pay").text(money);
        $("#pay_show").text(money);
        calculateShopNumber(number);
    }
    else {
        var sub = $('input[name="subbox1"]:checked');//1连锁续费，2购买分店
        if (sub.length == 0) {
            var price = $("#versionPrice").val();//版本的金额
            var number = parseInt($(".shop_year_counts[name=" + price + "]").val() || 0) + 1;
            var money = parseFloat(price || 0) * parseFloat(number || 1);
            var yearNumber = parseInt($("#yearNumber").val());//购买的年限
            $("#pay").text(money * yearNumber);
            $("#pay_show").text(money * yearNumber);
            calculateShopNumber(number);
        }
        else {
            var oldShopNumber = parseInt($("#oldShopNumber").val() || 1);//已经购买的店铺数量
            var price = parseFloat($("#versionPrice").val());//版本的金额
            var yearNumber = parseInt($(".shop_year_counts[name=" + price + "]").eq(1).val() || 0);//购买的年限
            var newShopNumber = parseInt($(".shop_year_counts[name=" + price + "]").eq(0).val() || 0);//购买的分店数量
            if (sub.val() == 2) {
                /*
                 * 继续购买分店
                 */
                var money = parseFloat(price || 0) * newShopNumber * yearNumber;
                $("#pay").text(money);
                $("#pay_show").text(money);
                calculateShopNumberNew(newShopNumber);
            } else if (sub.val() == 1) {
                if ($('#StoreSearch option:selected').text() == "所有店铺") {
                    $("#pay").text(oldShopNumber * price * yearNumber);
                    $("#pay_show").text(oldShopNumber * price * yearNumber);
                }
                else {
                    $("#pay").text(price * yearNumber);
                    $("#pay_show").text(price * yearNumber);
                }
            }
        }
    }
}

//计算总分店的数量
function calculateShopNumber(shopNumber) {
    if (shopNumber > 1) {
        $("#Branch").text(shopNumber - 1);
    }
    else {
        $("#headOffice").text(1);
        $("#Branch").text(0);
    }
    
}

//计算总分店的数量--连锁版
function calculateShopNumberNew(shopNumber) {
    $("#headOffice").text(0);
    $("#Branch").text(shopNumber);
}

//购买分店的数的选择
$("#ShopNumber").click(function () {
    if ($("#sv_versionid").val() == 3 && $(this).attr("readonly") == "readonly") {
        $("#StoreSearch").focus();
        layer.msg("请选择总店在购买分店");
    }
});

//连锁店铺的选择
$("#StoreSearch").change(function () {    
    if ($("#StoreSearch").val() == $("#User_id").val()) {
        $("#ShopNumber").removeAttr("readonly");
        $("#buycheckbox").removeAttr("disabled").prop("checked", true);
    }else{
        $("#ShopNumber").prop("readonly", true);
        $("#buycheckbox").prop("disabled", true).prop("checked", false);
        $("#buyshop").prop("checked", true);
    }
    var sub = $('input[name="subbox1"]:checked');//1连锁续费，2购买分店
    var oldShopNumber = parseInt($("#oldShopNumber").val() || 1);//已经购买的店铺数量
    var price = parseFloat($("#versionPrice").val());//版本的金额
    var yearNumber = parseInt($(".shop_year_counts[name=" + price + "]").eq(1).val() || 0);//购买的年限
    var newShopNumber = parseInt($(".shop_year_counts[name=" + price + "]").eq(0).val() || 0);//购买的分店数量
    if (sub.val() == 1) {
        if ($('#StoreSearch option:selected').text() == "所有店铺") {
            $("#pay").text(oldShopNumber * price * yearNumber);
            $("#pay_show").text(oldShopNumber * price * yearNumber);
        }
        else {
            $("#pay").text(price * yearNumber);
            $("#pay_show").text(price * yearNumber);
        }
    }
    else if (sub.val() == 2 && $("#StoreSearch").val() == $("#User_id").val()) {
        $("#pay").text(price * yearNumber * newShopNumber);
        $("#pay_show").text(price * yearNumber * newShopNumber);
    }
});

//选择总店之后切换模式
$(".checkinput[name='subbox1']").click(function () {
    var sub = $('input[name="subbox1"]:checked');//1连锁续费，2购买分店
    var oldShopNumber = parseInt($("#oldShopNumber").val() || 1);//已经购买的店铺数量
    var price = parseFloat($("#versionPrice").val());//版本的金额
    var yearNumber = parseInt($(".shop_year_counts[name=" + price + "]").eq(1).val() || 0);//购买的年限
    var newShopNumber = parseInt($(".shop_year_counts[name=" + price + "]").eq(0).val() || 0);//购买的分店数量
    if (sub.val() == 1) {
        $("#pay").text(price * yearNumber);
        $("#pay_show").text(price * yearNumber);
    } else {
        $("#pay").text(price * yearNumber * newShopNumber);
        $("#pay_show").text(price * yearNumber * newShopNumber);
    }
});

//确定支付
/*
 * isaddshop = 0;        //单个分店续费
 * isaddshop = 1;       //总店续费
 * isaddshop = 2;      //总店购买分店
 * isaddshop = 3;     //全部续费
 * isaddshop = 4;    //总店开通版本套餐及购买分店数
 * isaddshop = 6;   //新开通套餐版本
 * isaddshop = 7;  //购买至尊版
 * isaddshop = 8; //再次购买至尊版
 */
$("#paymentBtn").click(function () {
    var type = $("#slider-bar li a.active").data("type");
    var sub = $('input[name="subbox1"]:checked');//1连锁续费，2购买分店
    var isaddshop = 0;
    var _g_price = 0;//版本金额
    var yearCounts = 0;//年数
    var shopnumber = 1;//店铺的数量
    var number = 0;//店铺的数量与年限
    if (sub.length == 1) {
        isaddshop = sub.val();
    }
    var userid = "";
    if (type == 4) {//高级版
        var subbox = $('input[name="year-mo"]:checked');
        _g_price = subbox.val();//版本的金额
        if (parseInt($(".shop_year_counts[name=" + _g_price + "]").val()) > 0 && $("#sv_versionid").val() == 4) {
            userid = $("#userid").val();
            shopnumber = 1;
            isaddshop = 6; //新开通套餐版本
            number = $(".shop_year_counts[name=" + _g_price + "]").val();
        }
    }
    else if (type == 3) {//连锁版
        if (isNullOrWhiteSpace($('#StoreSearch').val()) && sub.val() != 2) {
            userid = $('#StoreSearch').val();
        }
        _g_price = $("#versionPrice").val();//版本的金额
        var number = $(".shop_year_counts[name=" + _g_price + "]").eq(1).val();//购买的年数

        //购买店铺
        if (sub.length == 0 && parseInt(number || 0) == 0 && isNullOrWhiteSpace($('#StoreSearch option:selected').text()) == false
        && parseInt(_g_price) > 0 && $("#sv_versionid").val() != 5) {
            userid = $("#userid").val();
            shopnumber = 1;
            isaddshop = 6; //新开通套餐版本
            number = number;
        }
        else if(sub.length == 1 && sub.val() == 1 && (shopnumber <= 1 && isNullOrWhiteSpace($('#StoreSearch').val())
            && $("#StoreSearch").val() == $("#User_id").val())) {
            shopnumber = 1;
            isaddshop = 1;//总店续费
        }
        else if (shopnumber >= 1 && sub.val() == 1 && isNullOrWhiteSpace($('#StoreSearch').val())
            && $('#StoreSearch option:selected').text() != "所有店铺") {
            shopnumber = 1;
            isaddshop = 0; //单个分店续费
        }
        else if ((shopnumber >= 1 && parseInt(number || 0) >= 1 && sub.length == 1 && sub.val() == 2)) {
            shopnumber = $(".shop_year_counts[name=" + _g_price + "]").eq(0).val();//购买的数量
            isaddshop = 2; //总店购买分店
            userid = $("#userid").val();
        }
        else if (sub.val() == 1 && userid.length <= 5 && isNullOrWhiteSpace($('#StoreSearch').val())
            && $('#StoreSearch option:selected').text() == "所有店铺") {
            shopnumber = $(".ShopNumber").val() == 0 ? 1 : $(".ShopNumber").val();
            isaddshop = 3; //全部续费
            userid = $("#userid").val();
        }
        else if (isNullOrWhiteSpace(number) && parseInt(_g_price) > 0 && parseInt(number || 0) > 0 && sub.length == 0 && !isNullOrWhiteSpace($('#StoreSearch option:selected').text())) {
            shopnumber = $(".shop_year_counts[name=" + _g_price + "]").eq(0).val() || 0;//购买的数量
            isaddshop = 4; //总店开通版本套餐及购买分店数
            userid = $("#userid").val();
        }
    }
    else if (type == 5) {//至尊版
        _g_price = $("#versionPrice").val();//版本的金额
        if (($("#sv_versionid").val() == 5 || $("#sv_versionname").val().indexOf("至尊") > 0) && $("#is_Supreme_Special").val() == "") {
            isaddshop = 7;//购买至尊版
            userid = $("#userid").val();
            number = $(".shop_year_counts[name=" + _g_price + "]").val();//购买的数量
        } else if (($("#sv_versionid").val() == 5 || $("#sv_versionname").val().indexOf("至尊") > 0) && $("#is_Supreme_Special").val() != "") {
            isaddshop = 8;//再次购买至尊版
            userid = $("#userid").val();
            number = $(".shop_year_counts[name=" + _g_price + "]").val();//购买的数量
        }
    }

    var payType = $(".payType_[name='selectpaystyle']:checked");//支付类型
    if (payType.length == 1 && parseFloat(_g_price) > 0 && parseInt(shopnumber) >= 0) {
        if (isaddshop == 7 || isaddshop == 8) {
            shopnumber = number;
            number = 1;
        }
        var sumprice = parseFloat($("#pay").text());
        if (sumprice > 1) {
            if (isaddshop != 2 && isaddshop != 3 && isaddshop != 4 && isaddshop != 7 && isaddshop != 8) {
                shopnumber = 0;
            }
            var data =
            {
                sv_do_price: sumprice,
                sv_paytype: payType.val(),
                order_count: parseInt(number),
                sv_salesversion: $("#sv_versionname").val(),
                sv_salesversionid: $("#sv_versionid").val(),
                sv_versionunit: $("#versionunit_" + _g_price).val(),
                user_id: userid,
                IsAddShop: isaddshop,
                ShopNumber: shopnumber
            }
            $.postJson('/pay/SaveOrder', data, function (data) {
                //layer.closeAll();
                var datetime = 0;
                if (data.succeed) {
                    var scanPay;
                    var title = '';
                    if (payType.val() == '支付宝支付') {
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
                    var setInt = setInterval(function () {
                        datetime = +3;
                        if (datetime <= 800) {
                            $.getJSON("/pay/Getorderstatus?ordercode=" + data.errmsg, function (data) {
                                if (data == 2) {
                                    layer.msg("支付成功,请重新登录新功能生效！！");
                                    setTimeout(function () {
                                        layer.confirm("<h4>提示：</h4><p>支付成功,下次登录新功能生效，是否重新登录</p>", {
                                            btn: ["是", "否"]
                                        }, function () {
                                            $.post('/AjaxUser/LogOut', null, function (data) {
                                                if (_g_is_distributor_customer) {
                                                    location.href = '/Dealerlogin.html';

                                                } else {
                                                    location.href = '/login.html';
                                                }
                                            });
                                        });
                                        window.location.href = "/";
                                    }, 2000);

                                }
                            });
                        } else {
                            clearInterval(setInt);
                            layer.msg("您的订单已过期失效！");
                            window.location.href = "/Home/payheight?id=" + $("#sv_versionid").val();
                        }
                    }, 3000);
                }
                else {
                    layer.msg(data.errmsg || "");
                }
            });

        } else {
            layer.msg("金额有误!");
        }
    }
    else {
        layer.msg("请输入购买店铺的数量或订单金额价格有误");
    }
});


//分店信息
GetStorelist();
function GetStorelist() {
    $.get('/BranchStore/GetStorelist/?StorePageState=3&userid=' + $("#userid").val() + "&versionid=" + $("#sv_versionid").val(), function (data) {
        if (data == -2) {
            layer.msg("您没有该权限！");
        }
        else {
            var listhtml = '';
            if (data == -1) {
                $("#StoreSearch").hide();
                $("#storeRenewal").hide();
            } else {
                $("#StoreSearch").show();
                for (var theadKey in data) {
                    listhtml += data[theadKey];
                }
                $('#StoreSearch').html(listhtml);
            }

        }
    });
}
