var _g_printConfigdata; // 打印配置
//=========外卖页面公共的方法===========//
//筛选按钮
$(document).on("click", '#shuaixuanbit', function () {
    $(this).toggleClass('open');
    $('.shuaixuanbox').slideToggle(300);
});
//筛选时间的
$(document).on("click", ".order-time", function () {
    $(".sjxuantime").toggleClass("active");
});

$(document).ready(function () {
    getCateringOnlineIsAutoOrderAndPrintConfig();
    var start = {
        format: 'YYYY/MM/DD hh:mm:ss',
        min: laydate.now(-365), //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istime: true,
        istoday: false,
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
            selectordertimeFn();
        }
    };
    var end = {
        format: 'YYYY/MM/DD hh:mm:ss',
        min: laydate.now(),
        max: laydate.now(),
        istime: true,
        istoday: false,
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
            start.min = minusSelectDate(datas, 365);
            selectordertimeFn();
        }
    };
    $(document).on("click", "#beginDate", function () {
        laydate(start);
    });

    $(document).on("click", "#endDate", function () {
        laydate(end);
    });
    laydate.skin('molv');//主题皮肤

});

//筛选事件
$(document).on("click", "#distributionStyle>li,#payStyle>li,#paymentStyle>li,#paymentTime>li", function () {
    if (!$(this).is(".active") && !$(this).is(".ordertime")) {
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active");
        if ($(this).find("input").length == 0) {
            if ($(this).data("id") != 4 || $(this).data("id") != -1) {
                $("#yixianzhe").parent().parent().show();
                $("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").remove();
                var ass = $(this).clone(true);
                ass.appendTo("#yixianzhe");
            }
            else {
                $("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").remove();
                if ($("#yixianzhe li").length == 0) {
                    $("#yixianzhe").parent().parent().hide();
                }
            }
        }
    } else {
        //$(this).removeClass("active");
        //$("[data-id='-1'][data-name='" + $(this).data("name") + "']").addClass("active");
        //$("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").remove();
    }
});
$(document).on("click", "#yixianzhe>li", function () {
    $("[data-id='" + $(this).data("id") + "'][data-name='" + $(this).data("name") + "']").removeClass("active");
    $("[data-id='-1'][data-name='" + $(this).data("name") + "']").addClass("active");
    $(this).remove();
    if ($("#yixianzhe li").length == 0) {
        $("#yixianzhe").parent().parent().hide();
    }
});

//其他时间的写入
function selectordertimeFn() {
    if ($("#beginDate").val()) {
        $("#yixianzhe").find("[data-name='paymentTime']").remove();
        var html = '<li class="select active" data-name="paymentTime" data-id="4"><a href="javascript:void(0);">' + $("#beginDate").val() + '至 ' + $("#endDate").val() + '</a></li>';
        $("#yixianzhe").append(html);
        $("#yixianzhe").parent().parent().show();
    } else {

        $("#yixianzhe").find("[data-name='paymentTime']").remove();
        $("[data-id='0'][data-name='paymentTime']").addClass("active");
    }
}

//=========外卖页面公共的方法===========//

//配送状态条件查询
$(document).on("click", "#deliveryStatus>li", function () {
    var deliveryStatus = $(this).attr("data-delivery-status");
    $(this).addClass("active").siblings("li").removeClass("active");
    takeawayOrderPage(null, -1, null, null, deliveryStatus, -1, -1, -1);
});

//筛选框里面的条件查询
$(document).on("click", "#btnOrderQuery", function () {
    var seachStr = null, queryDayType = 0, beginDate = null, endDate = null, distributionStatus = -1, distributionType = -1, onlinePayType = -1, onlinePaymentStatus = -1;
    $("#yixianzhe li").each(function () {
        switch ($(this).data("name")) {

            case "payStyle":
                onlinePayType = $(this).data("id");
                break;
            case "paymentStyle":
                onlinePaymentStatus = $(this).data("id");
                break;
            case "paymentTime":
                if ($(this).data("id") == 4) {
                    queryDayType = "4";
                    beginDate = $("#beginDate").val();
                    endDate = $("#endDate").val();
                } else {
                    queryDayType = $(this).data("id");
                }

                break;
        }
    });
    takeawayOrderPage(seachStr, queryDayType, beginDate, endDate, distributionStatus, distributionType, onlinePayType, onlinePaymentStatus);
});

//查询订单号
$(document).on("click", "#BtnSearchOrder", function () {
    var orderNumber = $("#orderNumberinput").val().trim();
    if (orderNumber) {
        takeawayOrderPage(orderNumber, -1, null, null, 0, -1, -1, -1);
    } else {
        layer.msg("请输入订单号")
    }
});

// 加载分页插件
function takeawayOrderPage(seachStr, queryDayType, beginDate, endDate, distributionStatus, distributionType, onlinePayType, onlinePaymentStatus) {
    // 初始化分页内容
    $.get("/OnlineOrder/GetCateringOnlineOrderCountByUserId/", {
        seachStr: seachStr,//模糊查询
        queryDayType: queryDayType,//常用日期查询
        beginDate: beginDate,//查询订单的开始时间
        endDate: endDate,//查询订单的结束时间
        DistributionStatus: distributionStatus,//配送状态
        DistributionType: distributionType,//配送的类型
        OnlinePayType: onlinePayType,//订单的类型
        OnlinePaymentStatus: onlinePaymentStatus//付款状态
    }, function (data) {
        var i = Math.ceil(data / foots_pageSizeCount);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                getCateringOnlineOrderPageListByUserId(e.curr, foots_pageSizeCount, seachStr, queryDayType, beginDate, endDate, distributionStatus, distributionType, onlinePayType, onlinePaymentStatus);
            }
        });
    });
}

//餐饮订单详情的全局对象
var myMap = {};//订单详情的数据
function getCateringOnlineOrderPageListByUserId(pageIndex, pageSize, seachStr, queryDayType, beginDate, endDate, distributionStatus, distributionType, onlinePayType, onlinePaymentStatus) {
    var loadIndex = commonOpenLoading();
    $.get('/OnlineOrder/GetCateringOnlineOrderPageListByUserId', {
        pageIndex: pageIndex,//页面的index
        pageSize: pageSize,//显示的个数
        seachStr: seachStr,//模糊查询
        queryDayType: queryDayType,//常用日期查询
        beginDate: beginDate,//查询订单的开始时间
        endDate: endDate,//查询订单的结束时间
        DistributionStatus: distributionStatus,//配送状态
        DistributionType: distributionType,//配送的类型
        OnlinePayType: onlinePayType,//订单的类型
        OnlinePaymentStatus: onlinePaymentStatus//付款状态
    }, function (data) {
        commonCloseLoading(loadIndex);
        var footlisthtml = "";
        var attributes = "";
        var confirmtakewayhtml = '';
        if (data != null && data != '') {
            for (var i = 0; i < data.length; i++) {
                myMap[data[i].sv_without_list_id] = data[i];//订单详情
                if (data[i].sv_shipping_methods == 1) {
                    if (data[i].sv_delivery_status == 0) {
                        footlisthtml += '<li class="bg1" data-sv_without_list_id=' + (data[i].sv_without_list_id || "") + '>';
                        footlisthtml += '<button class="btn takeawayprint" data-orderid="' + data[i].sv_without_list_id + '">打印</button>';
                        confirmtakewayhtml = '<button class="btn confirmtakeway" data-sv_without_list_id=' + (data[i].sv_without_list_id || "") + ' data-sv_delivery_status="' + data[i].sv_delivery_status + '">确认配送</button>';
                    }
                    else if (data[i].sv_delivery_status == 1) {
                        footlisthtml += '<li class="bg2" data-sv_without_list_id=' + (data[i].sv_without_list_id || "") + '>';
                        footlisthtml += '<button class="btn takeawayprint" data-orderid="' + data[i].sv_without_list_id + '">打印</button>';
                        confirmtakewayhtml = '<button class="btn confirmtakeway" data-sv_without_list_id=' + (data[i].sv_without_list_id || "") + ' data-sv_delivery_status="' + data[i].sv_delivery_status + '">确认收货</button>';
                    }
                    else if (data[i].sv_delivery_status == 2 || data[i].sv_delivery_status == 4) {
                        footlisthtml += '<li class="bg3" data-sv_without_list_id=' + (data[i].sv_without_list_id || "") + '>';
                        footlisthtml += '<button class="btn takeawayprint" data-orderid="' + data[i].sv_without_list_id + '">打印</button>';
                    }
                    else {
                        footlisthtml += '<li data-sv_without_list_id=' + (data[i].sv_without_list_id || "") + '>';
                    }
                    footlisthtml += '<div class="takeawayordermain"><div class="style-title"><i class="roud"></i>';
                    footlisthtml += '<span>商家配送</span>';
                    footlisthtml += '<span class="ordertime">' + new Date(data[i].wt_datetime).Format('MM-dd hh:mm:ss') + '</span></div>';

                    if (data[i].sv_receipt_data)
                    {
                        var s_receipt_info = JSON.parse(data[i].sv_receipt_data);
                        footlisthtml += '<div class="style-title"><span>' + (s_receipt_info.s_r_name || '') + '</span>';
                        footlisthtml += '<span class="phonenumber">' + (s_receipt_info.s_r_phone || "") + '</span></div>';
                        footlisthtml += '<div class="useraddress"><span>' + (s_receipt_info.s_r_address || "") + '</span></div>';
                        //运费
                        if (s_receipt_info.sv_move_freight > 0)
                        {
                            $("#meituanfreight").html(s_receipt_info.sv_move_freight.toFixed(2));
                            if (s_receipt_info.sv_move_freight_isfree)
                            {
                                $("#freight_display_none .moneyinfo").css("text-decoration", "line-through");
                            }
                        }

                     } else
                        {
                        footlisthtml += '<div class="style-title"><span>' + (data[i].sv_receipt_name || '') + '</span>';
                        footlisthtml += '<span class="phonenumber">' + (data[i].sv_receipt_phone || "") + '</span></div>';
                        footlisthtml += '<div class="useraddress"><span>' + (data[i].sv_receipt_address || "") + '</span></div>';
                    }

                    
                    footlisthtml += '<div class="useraddress">' + confirmtakewayhtml + '<a class="fr info" href="javascript:void(0);">详情>></a></div></div></div></li>';
                }
            }
            $("#takeawayorderlist").html(footlisthtml);
        } else {
            $("#takeawayorderlist").html('<li style="border: none;">没有该类型的订单。</li>');
        }

    });
}

// 打印
$(document).unbind("click", "#takeawayorderlist>li .takeawayprint").on("click", "#takeawayorderlist>li .takeawayprint", function () {
    var orderId = $(this).attr('data-orderid');
    if (orderId && orderId > 0) {
        if (!_g_printConfigdata) {
            $.getJSON("/system/Getprint", function (printConfigdata) {
                if (printConfigdata) {
                    _g_printConfigdata = printConfigdata;
                    getTakeOutFoodPrintData(orderId, _g_printConfigdata, false);
                }
            });
        }
        else {
            getTakeOutFoodPrintData(orderId, _g_printConfigdata, false);
        }
    }
    return false;
});

//订单详情显示隐藏
var sv_payment_type = "";//支付方式
var sv_shop_payment_status = "";//付款状态
$(document).on("click", "#takeawayorderlist>li", function () {
    $(this).addClass("active").siblings("li").removeClass("active");
    var order_id = $(this).data("sv_without_list_id");//订单id号
    orderinfoFn(order_id);
});

//订单详情的方法
function orderinfoFn(order_id) {
    $("#activeInfo").html("");
    if (myMap[order_id].sv_delivery_status == 0) {
        $("#sv_delivery_status").attr('src', '../images/star2.png');
    } else if (myMap[order_id].sv_delivery_status == 1) {
        $("#sv_delivery_status").attr('src', '../images/center2.png');
    } else if (myMap[order_id].sv_delivery_status == 2) {
        $("#sv_delivery_status").attr('src', '../images/end2.png');
    }
    $("#sv_delivery_status").css("display", "block");
    $("#wt_nober").text(myMap[order_id].wt_nober);
    $("#wt_datetime").text(new Date(myMap[order_id].wt_datetime).Format('MM-dd hh:mm:ss'));
    $("#wt_datetime2").text(new Date(myMap[order_id].wt_datetime).Format('MM-dd hh:mm:ss'));
    if (myMap[order_id].sv_payment_type == 1) {
        sv_payment_type = "微信支付";
    } else if (myMap[order_id].sv_payment_type == 2) {
        sv_payment_type = "储值卡支付";
    } else if (myMap[order_id].sv_payment_type == 3) {
        sv_payment_type = "其它方式支付";
    }
    $("#sv_payment_type").text(sv_payment_type);
    if (myMap[order_id].sv_shop_payment_status == 0) {
        sv_shop_payment_status = "待付款";
    } else if (myMap[order_id].sv_shop_payment_status == 1) {
        sv_shop_payment_status = "已付款";
    } else if (myMap[order_id].sv_shop_payment_status == 2) {
        sv_shop_payment_status = "已取消";
    }
    $("#sv_shop_payment_status").text(sv_shop_payment_status);
    $("#ThisShopName").text($("#username").text());

    if (myMap[order_id].sv_receipt_data)
    {
        var s_receipt_info = JSON.parse(myMap[order_id].sv_receipt_data);
        $("#sv_receipt_name").text(s_receipt_info.s_r_name);
        $("#sv_receipt_phone").text(s_receipt_info.s_r_phone);
        $("#sv_receipt_address").text(s_receipt_info.s_r_address);

    } else
    {
        $("#sv_receipt_name").text(myMap[order_id].sv_receipt_name);
        $("#sv_receipt_phone").text(myMap[order_id].sv_receipt_phone);
        $("#sv_receipt_address").text(myMap[order_id].sv_receipt_address);
    }

    $("#meituanDeliveryMethod").text("商家配送");
    //金额
    $("#sv_order_receivable").text("¥ " + parseFloat(myMap[order_id].sv_order_receivable).toFixed(2));
    $("#sv_order_actual_money").text("¥" + parseFloat(myMap[order_id].sv_order_actual_money).toFixed(2));
    $("#sv_member_discount").text(parseFloat(myMap[order_id].sv_member_discount).toFixed(2) * 100 + "%");
    var discountedPrice = parseFloat(myMap[order_id].sv_order_receivable).toFixed(2) - parseFloat(myMap[order_id].sv_order_actual_money).toFixed(2);
    if (discountedPrice > 0)
    {
        $("#discountedPrice").text(parseFloat(discountedPrice).toFixed(2));
    }
    //商品列表
    var buyProductList = $.parseJSON(myMap[order_id].order_product_json_str);//商品列表
    var buyProducttasteList = buyProductList[0].producttastejson;//口味规格
    var buyProductListHtml = "";
    var oldsrc = "http://decerp.cc";
    var newsrc = "http://res.decerp.cc";
    var buyProducttasteListArray = new Array();
    if (buyProductList && buyProductList.length > 0) {
        for (var i = 0; i < buyProductList.length; i++) {
            var product_img;
            if (buyProductList[i].sv_p_images && buyProductList[i].sv_p_images.length > 0) {
                if (buyProductList[i].sv_p_images[0].code != "" && buyProductList[i].sv_p_images[0].code != null && buyProductList[i].sv_p_images[0].code != undefined) {
                    if (buyProductList[i].sv_p_images[0].code.indexOf(oldsrc) > -1) {
                        product_img = buyProductList[i].sv_p_images[0].code.replace(oldsrc, newsrc);
                    } else if (buyProductList[i].sv_p_images[0].code.indexOf(newsrc) > -1) {
                        product_img = buyProductList[i].sv_p_images[0].code;
                    } else {
                        product_img = _g_res_images_url + buyProductList[i].sv_p_images[0].code;
                    }
                } else {
                    product_img = "";
                }
            }
            if (!product_img) {
                product_img = '/images/002.jpg';
            }
            buyProductListHtml += '<li><div class="imgbox">';
            buyProductListHtml += '<img src=' + product_img + ' alt="" />';
            buyProductListHtml += '</div><div class="foodlistinfo">';
            buyProductListHtml += '<div class="sharename-number">';
            if (buyProductList[i].producttastejson && buyProductList[i].producttastejson.length > 0) {
                for (var j = 0; j < buyProductList[i].producttastejson.length; j++) {
                    buyProducttasteListArray.push("(" + buyProductList[i].producttastejson[j].sv_taste_name + buyProductList[i].producttastejson[j].sv_taste_price + ")");
                }
            } else {

            }
            buyProductListHtml += '<span>' + buyProductList[i].sv_p_name + '<i class="paddingleft10">' + buyProducttasteListArray + '</i></span></div>';
            buyProductListHtml += '<div class="sharename-number"><i class="moneyred">¥' + buyProductList[i].product_unitprice + '</i>';
            buyProductListHtml += '<i class="pad10">x' + buyProductList[i].product_num + '</i></div></div></li>';
        }
        $("#foodlist").html(buyProductListHtml);

        if (myMap[order_id].sv_remark) {
            $("#foodlist").append('<li style="padding-left:0px;height:38px;color:#31c17b;"><div>订单备注:' + myMap[order_id].sv_remark + '</div></li>')
        }

        //加载更多商品
        if (buyProductList.length > 2) {
            $("#productNumber").text(buyProductList.length - 2);
            $(".morenumber").show();
        } else {
            $(".morenumber").hide();
        }
        $("#meituancaution").hide(0);
        $("#memberDiscount").show(0);

        $("#takeawayorderinfobox").show(300).animate({ right: 0 }, 350);
    }
}

//$(".takeawayorderinfobox").mouseleave(function () {
//    $(".takeawayorderinfobox").animate({ right: -530 }, 350);
//});
$(".returnbtn").click(function () {
    $("#takeawayorderinfobox").animate({ right: -530 }, 350).hide(300);
    $("#reservationOrderinfobox").animate({ right: -530 }, 350).hide(300);
});

//foodlist高度
var windowH = $(window).height();
$("#foodlistbox").height(windowH - 535);

//加载更多的商品
$(".morenumber").click(function () {
    $("#foodlist>li").fadeIn(150);
    $("#productNumber").text("0");
});

//=================前端收银==================//
//收银端的线上外卖
//$(document).on("click", "#onlineTakeaway", function () {
//    $("#onlineTakeawayPage").show(0);
//    takeawayOrderPage(null, -1, null, null, 0, -1, -1, -1);//初始化页面分页
//    getCateringOnlineIsAutoOrderAndPrintConfig();
//});
//上面的方法[$(document).on("click"]无法解绑click事件，故用这个方法
$("#onlineTakeaway").click(function () {
    $("#onlineTakeawayPage").show(0);
    takeawayOrderPage(null, -1, null, null, 0, -1, -1, -1);//初始化页面分页
    getCateringOnlineIsAutoOrderAndPrintConfig();
})

//线上外卖订单隐藏页面
$("#closeOnlineTakeawayPage").click(function () {
    $("#onlineTakeawayPage").hide(0);
    $("#takeawayorderinfobox").animate({ right: -530 }, 350).hide(0);
});

//确认发货的订单的按钮
$(document).unbind("click", ".confirmtakeway").on("click", ".confirmtakeway", function () {
    var confirmtakeway_order_id = $(this).data("sv_without_list_id");
    var confirmtakeway = $(this).data("sv_delivery_status");
    var querytype = $("#deliveryStatus>li.active").data("delivery-status");
    $.postJson('/OnlineOrder/HandleCateringOrderDeliverGoodsByOrderId', {
        orderId: confirmtakeway_order_id,
        operateType: confirmtakeway
    }, function (result) {
        if (result) {
            layer.msg("订单处理成功！");
            takeawayOrderPage(null, -1, null, null, querytype, -1, -1, -1);//初始化页面分页
        }
        else {
            layer.msg("操作失败，请刷新页面后再试！");
        }
    });
    return false;
});



// 餐饮线上订单是否自动接单并且打印
$(document).on("change", "#selectCateringOnlineIsAutoOrderAndPrint", function () {
    var thisValue = $(this).is(':checked');
    if (thisValue) {
        thisValue = 0;
    }
    else {
        thisValue = 1;
    }
    var detaillist = [];
    var data = {
        "sv_user_configdetail_id": parseInt($("#selectCateringOnlineIsAutoOrderAndPrint").attr('data-id')),
        "sv_detail_value": thisValue,
        "sv_user_config_id": parseInt($("#selectCateringOnlineIsAutoOrderAndPrint").attr("data-configid")),
        "sv_user_module_id": parseInt($("#selectCateringOnlineIsAutoOrderAndPrint").attr("data-moduleid")),
        "sv_detail_is_enable": true,
        "sv_user_configdetail_name": $("#selectCateringOnlineIsAutoOrderAndPrint").attr('data-name'),
        "sv_remark": "餐饮线上订单是否自动接单并且打印"
    };
    detaillist.push(data);
    if (detaillist.length != 0) {
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=SetTardware', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.msg("保存成功");
                    automaticSwitch = !automaticSwitch;
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
});

function getCateringOnlineIsAutoOrderAndPrintConfig() {
    // 餐饮线上订单是否自动接单并且打印
    $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=CateringOnlineIsAutoOrderAndPrint', function (result) {
        if (result != null) {
            var childInfolist = result.childInfolist;
            if (childInfolist != null && childInfolist.length > 0) {
                $('#selectCateringOnlineIsAutoOrderAndPrint').attr('data-configid', childInfolist[0].sv_user_config_id).attr('data-moduleid', childInfolist[0].sv_user_module_id);
                for (var i = 0; i < childInfolist.length; i++)
                {
                    if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length) {
                        var childDetailList = childInfolist[i].childDetailList[0];
                        if (childDetailList)
                        {
                            $('#selectCateringOnlineIsAutoOrderAndPrint').attr('data-id', childDetailList.sv_user_configdetail_id);
                            if (childDetailList.sv_detail_value && childDetailList.sv_detail_value == 0)
                            {
                                $('#selectCateringOnlineIsAutoOrderAndPrint').prop("checked", true);
                                automaticSwitch = true;
                            }
                            else
                            {
                                $('#selectCateringOnlineIsAutoOrderAndPrint').prop("checked", false);
                                automaticSwitch = false;
                            }
                        }
                    }
                }
            }
        }
    });
}


