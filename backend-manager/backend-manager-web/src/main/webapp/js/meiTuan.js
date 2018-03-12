var _g_printConfigdata; // 打印配置
//美团======根据订单Id单号查询订单信息
$(document).unbind("click", "#SearchMeiTuan").on("click", "#SearchMeiTuan", function () {
    var meiTuanOrderId = $("#meiTuanOrderId").val().replace(/\s+/g, "");
    if (meiTuanOrderId) {
        getTakeOutFoodOrderCountByUserId(2, -1, meiTuanOrderId, -1, null, null);
    } else {
        layer.msg("请输入订单单号");
    }
});

//筛选查询
$(document).unbind("click", "#meiTuanTakeawayOrder").on("click", "#meiTuanTakeawayOrder", function () {
    var allSeachStr = null, beginDate = null, endDate = null, queryDayType = -1;
    var takewayType = $("#platformList>li a.active").data("type");//外卖类型
    $("#yixianzhe li").each(function () {
        switch ($(this).data("name")) {

            case "payStyle":
                onlinePayType = $(this).data("id");
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
    getTakeOutFoodOrderCountByUserId(takewayType, -1, allSeachStr, queryDayType, beginDate, endDate);
});

//美团外卖的统计所有订单页码的方法
function getTakeOutFoodOrderCountByUserId(takeOutFoodType, meiTuanStatus, seachStr, queryDayType, beginDate, endDate) {
    $.get("/MeiTuan/GetTakeOutFoodOrderCountByUserId", {
        "takeOutFoodType": takeOutFoodType,//外卖数据类型
        "meiTuanStatus": meiTuanStatus, //美团订单状态
        "seachStr": seachStr,//模糊查询
        "queryDayType": queryDayType,//常用日期查询（今天，昨天，本周，本月，其它）0---4
        "beginDate": beginDate,//查询开始时间
        "endDate": endDate//查询结束时间
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
                getTakeOutFoodOrderPageListByUserId(e.curr, foots_pageSizeCount, takeOutFoodType, meiTuanStatus, seachStr, queryDayType, beginDate, endDate);
            }
        });
    });
}

//美团外卖订单获取方法---查询方法
function getTakeOutFoodOrderPageListByUserId(pageIndex, pageSize, takeOutFoodType, meiTuanStatus, seachStr, queryDayType, beginDate, endDate) {
    $.get("/MeiTuan/GetTakeOutFoodOrderPageListByUserId", {
        "takeOutFoodType": takeOutFoodType,//外卖数据类型
        "meiTuanStatus": meiTuanStatus, //美团订单状态
        "pageIndex": pageIndex,//页码
        "pageSize": pageSize,//分页大小
        "seachStr": seachStr,//模糊查询
        "queryDayType": queryDayType,//常用日期查询（今天，昨天，本周，本月，其它）0---4
        "beginDate": beginDate,//查询开始时间
        "endDate": endDate//查询结束时间
    }, function (data) {
        var shareTakeawayOrderHtml = '';
        var meiTuanOrderStatus = '';//判断按钮的状态、订单的转态 美团订单状态（2--待商家配送 4--商家已确认，6--已配送，8--已完成，9--已取消）
        var statusButtonhtml = '';//订单状态按钮
        var statusText = ""; //配送方式文字
        var logistics_code = "";//配送方式返回的状态码
        var meiTuanTakeawayOrdertype;//sv_order_source 0--店内线下订单，1--店内线上订单，2--美团订单，3--饿了么订单，4--百度外卖订单，5--口碑外卖订单
        if (data != null && data != '')
        {
            for (var i = 0; i < data.length; i++) {
                meiTuanTakeawayOrdertype = data[i].sv_order_source;
                statusButtonhtml = '';//重置按钮的html
                if (meiTuanTakeawayOrdertype == 0) {

                } else if (meiTuanTakeawayOrdertype == 1) {

                } else if (meiTuanTakeawayOrdertype == 2) {
                    meiTuanOrderStatus = data[i].meituan_status;
                    logistics_code = data[i].logistics_code;
                    if (meiTuanOrderStatus == 2) {
                        shareTakeawayOrderHtml += '<li class="bg0 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                        statusButtonhtml = '<button class="btn shareconfirmbtn meituanconfirmbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>接单</button><button class="btn sharecancelbtn meituancancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>拒单</button>';
                    } else if (meiTuanOrderStatus == 4) {
                        if (data[i].meituan_reserve_state) {
                            shareTakeawayOrderHtml += '<li class="bg1 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            statusButtonhtml = '<button class="btn shareconfirmbtn cancelMeiTuanZhongBao" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消众包配送</button><button class="btn sharecancelbtn addMeiTuanZhongBaoTip" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>加小费</button><button class="btn sharecancelbtn meituancancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                            statusText = "(众包预下单成功)";
                        } else if (data[i].notify_type == 1) {
                            shareTakeawayOrderHtml += '<li class="bg5 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            statusButtonhtml = '<button class="btn shareconfirmbtn agreerefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>同意</button><button class="btn sharecancelbtn refuserefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>拒绝</button>';
                        } else {
                            shareTakeawayOrderHtml += '<li class="bg1 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            statusButtonhtml = '<button class="btn shareconfirmbtn selfdistributionbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>自配送</button><button class="btn sharecancelbtn meiTuanDistributionbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>美团配送</button><button class="btn sharecancelbtn meituancancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                        }

                    } else if (meiTuanOrderStatus == 6) {
                        if (data[i].notify_type == 1) {
                            shareTakeawayOrderHtml += '<li class="bg5 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            if (logistics_code == 1001 || logistics_code == 1002 || logistics_code == 1004 || logistics_code == 3001) {
                                statusButtonhtml = '<button class="btn shareconfirmbtn agreerefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>同意</button><button class="btn sharecancelbtn refuserefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>拒绝</button>';
                                statusText = "(美团专送)";
                            } else if (logistics_code == 1003) {
                                statusButtonhtml = '<button class="btn shareconfirmbtn agreerefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>同意</button><button class="btn sharecancelbtn refuserefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>拒绝</button>';
                                statusText = "(美团众包)";
                            }
                        }
                        else {
                            shareTakeawayOrderHtml += '<li class="bg2 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            if (logistics_code == 0000) {
                                statusButtonhtml = '<button class="btn sharecancelbtn meituancancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                                statusText = "(自配送)";
                            } else if (logistics_code == 1001 || logistics_code == 1002 || logistics_code == 1004 || logistics_code == 3001) {
                                statusButtonhtml = '<button class="btn shareconfirmbtn cancelMeiTuanZhongBao" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消美团配送</button><button class="btn sharecancelbtn meituancancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                                statusText = "(美团专送)";
                            } else if (logistics_code == 1003) {
                                statusButtonhtml = '<button class="btn shareconfirmbtn cancelMeiTuanZhongBao" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消众包配送</button><button class="btn sharecancelbtn addMeiTuanZhongBaoTip" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>加小费</button><button class="btn sharecancelbtn meituancancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                                statusText = "(美团众包)";
                            }
                        }
                    } else if (meiTuanOrderStatus == 8) {
                        if (data[i].notify_type == 1) {
                            shareTakeawayOrderHtml += '<li class="bg5 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            statusButtonhtml = '<button class="btn shareconfirmbtn agreerefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>同意</button><button class="btn sharecancelbtn refuserefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>拒绝</button>';
                        } else {
                            shareTakeawayOrderHtml += '<li class="bg3 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                        }
                        statusText = "(自配送)";
                    } else if (meiTuanOrderStatus == 9) {
                        shareTakeawayOrderHtml += '<li class="bg4 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                    }
                    else {
                        if (data[i].notify_type == 1) {
                            shareTakeawayOrderHtml += '<li class="bg2 meituan" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            if (logistics_code == 1001 || logistics_code == 1002 || logistics_code == 1004 || logistics_code == 3001) {
                                statusButtonhtml = '<button class="btn shareconfirmbtn agreerefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>同意</button><button class="btn sharecancelbtn refuserefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>拒绝</button>';
                                statusText = "(美团专送)";
                            } else if (logistics_code == 1003) {
                                statusButtonhtml = '<button class="btn shareconfirmbtn agreerefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>同意</button><button class="btn sharecancelbtn refuserefunds" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>拒绝</button>';
                                statusText = "(美团众包)";
                            }
                        }
                    }
                    shareTakeawayOrderHtml += '<button class="btn takeawayprint" data-orderid="' + data[i].order_id + '">打印</button><div class="takeawayordermain"><div class="style-title"><i class="roud"></i>';
                    shareTakeawayOrderHtml += '<span>美团外卖<i>' + statusText + '</i></span>';
                    shareTakeawayOrderHtml += '<span class="ordertime">' + new Date(data[i].sv_creation_date).Format('MM-dd hh:mm:ss') + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="style-title"><span>' + (data[i].recipient_name || '') + '</span>';
                    shareTakeawayOrderHtml += '<span class="phonenumber">' + (data[i].recipient_phone || "") + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="useraddress"><span>' + (data[i].recipient_address || "") + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="useraddress">' + statusButtonhtml + '<a class="fr info" href="javascript:void(0);">详情>></a></div></div></div><input type="hidden" class="hiddeninput" value="' + data[i].meituan_orderid_view + '" /></li>';
                }
                else if (meiTuanTakeawayOrdertype == 3) {
                    meiTuanOrderStatus = data[i].meituan_status;
                    logistics_code = data[i].logistics_code;
                    if (meiTuanOrderStatus == 2) {
                        shareTakeawayOrderHtml += '<li class="bg0 eleme" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>';
                        statusButtonhtml = '<button class="btn shareconfirmbtn eleconfirmbtn" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>接单</button><button class="btn sharecancelbtn elecancelbtn" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>拒单</button>';
                    } else if (meiTuanOrderStatus == 4) {
                        if (data[i].notify_type == 1) {
                            shareTakeawayOrderHtml += '<li class="bg5 eleme" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>';
                            statusButtonhtml = '<button class="btn shareconfirmbtn eleAgreeRetire" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>同意退单</button><button class="btn sharecancelbtn eleRefusedReturn" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>拒绝退单</button>';
                        } else {
                            shareTakeawayOrderHtml += '<li class="bg1 eleme" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>';
                            statusButtonhtml = '<button class="btn shareconfirmbtn elecalldistribution" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>呼叫配送</button><button class="btn sharecancelbtn elemyselefdistribution" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>自配送</button><button class="btn sharecancelbtn elecancelbtn" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>取消订单</button>';
                        }
                    } else if (meiTuanOrderStatus == 8) {
                        if (data[i].notify_type == 1) {
                            shareTakeawayOrderHtml += '<li class="bg5 eleme" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>';
                            statusButtonhtml = '<button class="btn shareconfirmbtn eleAgreeRetire" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>同意退单</button><button class="btn sharecancelbtn eleRefusedReturn" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>拒绝退单</button>';
                        } else {
                            shareTakeawayOrderHtml += '<li class="bg3 eleme" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>';
                        }
                    } else if (meiTuanOrderStatus == 9) {
                        shareTakeawayOrderHtml += '<li class="bg4 eleme" data-ele_order_id=' + (data[i].meituan_orderid_view || "") + '>';
                    }
                    else {

                    }
                    shareTakeawayOrderHtml += '<button class="btn takeawayprint" data-orderid="' + data[i].order_id + '">打印</button><div class="takeawayordermain"><div class="style-title"><i class="roud"></i>';
                    shareTakeawayOrderHtml += '<span>饿了么外卖<i>' + statusText + '</i></span>';
                    shareTakeawayOrderHtml += '<span class="ordertime">' + new Date(data[i].sv_creation_date).Format('MM-dd hh:mm:ss') + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="style-title"><span>' + (data[i].recipient_name || '') + '</span>';
                    shareTakeawayOrderHtml += '<span class="phonenumber">' + (data[i].recipient_phone || "") + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="useraddress"><span>' + (data[i].recipient_address || "") + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="useraddress">' + statusButtonhtml + '<a class="fr info" href="javascript:void(0);">详情>></a></div></div></div><input type="hidden" class="hiddeninput" value="' + data[i].meituan_orderid_view + '" /></li>';
                }
                else if (meiTuanTakeawayOrdertype == 4) {
                    meiTuanOrderStatus = data[i].meituan_status;
                    logistics_code = data[i].logistics_code;//配送状态1百度，2自配送
                    if (meiTuanOrderStatus == 1 || meiTuanOrderStatus == 2) {
                        shareTakeawayOrderHtml += '<li class="bg0 baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                        statusButtonhtml = '<button class="btn shareconfirmbtn baiduconfirmbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>接单</button><button class="btn sharecancelbtn baiducancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                    }
                    else if (meiTuanOrderStatus == 4) {
                        if (logistics_code == 1) {
                            shareTakeawayOrderHtml += '<li class="bg1 baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            statusButtonhtml = '<button class="btn sharecancelbtn baiducancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                        }
                        else if (logistics_code == 2) {
                            shareTakeawayOrderHtml += '<li class="bg1 baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            statusButtonhtml = '<button class="btn sharecancelbtn baiducancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                        }
                        else {
                            shareTakeawayOrderHtml += '<li class="bg1 baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                            statusButtonhtml = '<button class="btn sharecancelbtn baiducancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                        }
                    }
                    else if (meiTuanOrderStatus == 6) {
                        shareTakeawayOrderHtml += '<li class="bg2 baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                        statusButtonhtml = '<button class="btn sharecancelbtn baiducancelbtn" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>取消</button>';
                    }
                    else if (meiTuanOrderStatus == 8) {
                        shareTakeawayOrderHtml += '<li class="bg3 baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                    }
                    else if (meiTuanOrderStatus == 9) {
                        shareTakeawayOrderHtml += '<li class="bg4 baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                    }
                    else {
                        shareTakeawayOrderHtml += '<li class="baidu" data-meituan_order_id=' + (data[i].meituan_order_id || "") + '>';
                    }
                    shareTakeawayOrderHtml += '<button class="btn takeawayprint" data-orderid="' + data[i].order_id + '">打印</button><div class="takeawayordermain"><div class="style-title"><i class="roud"></i>';
                    shareTakeawayOrderHtml += '<span>百度外卖<i>' + statusText + '</i></span>';
                    shareTakeawayOrderHtml += '<span class="ordertime">' + new Date(data[i].sv_creation_date).Format('MM-dd hh:mm:ss') + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="style-title"><span>' + (data[i].recipient_name || '') + '</span>';
                    shareTakeawayOrderHtml += '<span class="phonenumber">' + (data[i].recipient_phone || "") + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="useraddress"><span>' + (data[i].recipient_address || "") + '</span></div>';
                    shareTakeawayOrderHtml += '<div class="useraddress">' + statusButtonhtml + '<a class="fr info" href="javascript:void(0);">详情>></a></div></div></div><input type="hidden" class="hiddeninput" value="' + data[i].meituan_orderid_view + '" /></li>';
                }
                else if (meiTuanTakeawayOrdertype == 5) {

                }
            }
        } else {
            shareTakeawayOrderHtml = "没有该类型数据！";
        }
        $("#shareTakeawayOrderHtml").html(shareTakeawayOrderHtml);
    });
}

//外卖订单查询的类型
$(document).unbind("click", "#takeawayordertype>li").on("click", "#takeawayordertype>li", function () {
    $(this).addClass("active").siblings("li").removeClass("active");
    var takewayType = $("#platformList>li a.active").data("type");//外卖类型
    var meituanOrderType = $(this).data("order-status");
    getTakeOutFoodOrderCountByUserId(takewayType, meituanOrderType, null, -1, null, null);
});

//根据美团订单号确认订单
$(document).unbind("click", ".meituanconfirmbtn").on("click", ".meituanconfirmbtn", function () {
    var meituanOrderId = $(this).data("meituan_order_id");///=======10的时候就是查询退单的
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");
    $.post("/MeiTuan/ConfirmOrderByOrderId", { orderId: meituanOrderId }, function (result) {
        if (result.data && result.data == "ok") {
            layer.msg("订单处理成功");
        } else if (result.error) {
            layer.msg(result.error.message);
        }
        setTimeout(function () {
            getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
        }, 500);
    });
    return false;
});

//根据美团订单号取消订单
$(document).unbind("click", ".meituancancelbtn").on("click", ".meituancancelbtn", function () {
    var meituanOrderId = $(this).data("meituan_order_id");//订单的id
    var index = "";//layerpage的index
    index = Deke.DeKe_dialog.show_Url2('取消订单(' + meituanOrderId + ')<input type="hidden" id="meiTuanOrdercleanId" value="' + meituanOrderId + '" />', "/OnlineOrder/_PartialOrderCancel?v=" + clearCache + 200, meiTuanCancelFn, ["440px", "310px"]);
    return false;
});

function meiTuanCancelFn() {
    var reasonCode = "1001";//退货原因的状态码默认第一个1001
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    //改变状态码
    $(document).unbind("change", "#reasoncode").on("change", "#reasoncode", function () {
        reasonCode = $("#reasoncode option:selected").val();
    });
    //确认取消按钮
    $("#meituanconfirmcanclebtn").click(function () {
        var reason = $("#orderremarks").val();
        if (reason) {
            $.post("/MeiTuan/CancelOrderByOrderId", {
                orderId: $("#meiTuanOrdercleanId").val(),//订单号
                reasonCode: reasonCode,//订单取消原因code【reasonCode】
                reason: reason,//取消订单原因
            }, function (result) {
                if (result.data && result.data == "ok") {
                    layer.closeAll();
                    layer.msg("订单处理成功");
                } else if (result.error) {
                    layer.msg(result.error.message);
                }
                setTimeout(function () {
                    getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
                }, 500);
            });
        } else {
            $("#orderremarks").focus();
            layer.msg("请填写取消订单原因")
        }
    });
}

//美团根据单号自配送
$(document).unbind("click", ".selfdistributionbtn").on("click", ".selfdistributionbtn", function () {
    var meituanOrderId = $(this).data("meituan_order_id");//美团单号id
    Deke.DeKe_dialog.show_Url2('自配送信息<input type="hidden" id="meiTuanOrdercleanId" value="' + meituanOrderId + '" />', "/OnlineOrder/_PartialSelfDistribution?v=" + clearCache + 200, meiTuanDistributionFn, ["440px", "250px"]);
    return false;
});
var i = 0;
function meiTuanDistributionFn() {
    var reg = /^1[3|4|5|7|8]\d{9}$/;//检测手机号码是否正确    
    $("#determineDistributionbtn").click(function () {
        var distributionName = $("#distributionname").val();//自配送员名字(必填)
        var distributionPhone = $("#distributionphone").val();//自配送员的电话号码
        var meituanOrderId = $("#meiTuanOrdercleanId").val();//美团订单id
        var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
        if (distributionName == "") {
            layer.msg("请输入配送员姓名！");
            return;
        }
        $.post("/MeiTuan/DeliveringOrderByOrderId", {
            orderId: meituanOrderId,//美团订单id
            courierName: distributionName,//自配送人姓名
            courierPhone: distributionPhone//自配送人电话号码
        }, function (result) {
            if (result.data && result.data == "ok") {
                layer.closeAll();
                layer.msg("订单处理成功");
            } else if (result.error) {
                layer.msg(result.error.message);
            }
            setTimeout(function () {
                getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
            }, 500);
        });

    });
}

//美团自配送确认收货
$(document).unbind("click", ".selfConfirmReceiptbtn").on("click", ".selfConfirmReceiptbtn", function () {
    var meituanOrderId = $(this).data("meituan_order_id");
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    $.post("/MeiTuan/DeliveredOrderByOrderId", { orderId: meituanOrderId }, function (result) {
        if (result.data && result.data == "ok") {
            layer.closeAll();
            layer.msg("订单处理成功");
        } else if (result.error) {
            layer.msg(result.error.message);
        }
        setTimeout(function () {
            getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
        }, 500);
    });
});

//美团专送、众包配送
$(document).unbind("click", ".meiTuanDistributionbtn").on("click", ".meiTuanDistributionbtn", function () {
    var meituanOrderId = $(this).data("meituan_order_id");//美团单号id
    Deke.DeKe_dialog.show_Url2('选择美团配送方式<input type="hidden" id="meiTuanOrdercleanId" value="' + meituanOrderId + '" />', "/OnlineOrder/_PartialMeiTuanDistribution?v=" + clearCache + 200, dispatchShipByOrderId, ["440px", "340px"]);
    return false;
});

//美团专送的方法=======众包配送========美团配送
function dispatchShipByOrderId() {
    //查询配送费
    $.get("/MeiTuan/GetQueryZbShippingFeeByOrderIds", {
        "orderIds": $("#meiTuanOrdercleanId").val()//订单id
    }, function (result) {
        if (result.data) {
            $("#meituanshippingFee").val(result.data[0].shippingFee);
        }
    });

    //选择配送的方式
    var meiTuanDistribution_type = $("#meiTuandistribution>li.active").attr("data-meiTuandistributiontype");//美团配送的类型
    $("#meiTuandistribution>li").click(function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        meiTuanDistribution_type = $(this).attr("data-meiTuandistributiontype");
        if (meiTuanDistribution_type > 0) {
            $(".inputmeiTuanDistributionbox").show(0);
        } else {
            $(".inputmeiTuanDistributionbox").hide(0);
        }
    });

    //美团配送确认的方法 1=====美团众包配送 0=======美团专送
    $("#meituandetermineDistributionbtn").click(function () {
        var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
        if (meiTuanDistribution_type > 0) {
            console.log($("#meituanshippingFee").val(), $("#meituanzhongbaotipAmount").val(), $("#meiTuanOrdercleanId").val())
            $.post("/MeiTuan/PrepareZbDispatchByOrderId", {
                "orderId": $("#meiTuanOrdercleanId").val(),//订单id,
                "shippingFee": $("#meituanshippingFee").val(),//配送费用
                "tipAmount": $("#meituanzhongbaotipAmount").val()//美团众包小费
            }, function (result) {
                if (result.data && result.data == "ok") {
                    layer.closeAll();
                    layer.msg("订单处理成功");
                } else if (result.error) {
                    layer.msg(result.error.message);
                }
                setTimeout(function () {
                    getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
                }, 500);
            });

        } else {
            $.post("/MeiTuan/DispatchShipByOrderId", {
                orderId: $("#meiTuanOrdercleanId").val()
            }, function (result) {
                if (result.data && result.data == "ok") {
                    layer.closeAll();
                    layer.msg("订单处理成功");
                } else if (result.error) {
                    layer.msg(result.error.message);
                }
                setTimeout(function () {
                    getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
                }, 500);
            });
        }
    });
}

//取消众包配送
$(document).unbind("click", ".cancelMeiTuanZhongBao").on("click", ".cancelMeiTuanZhongBao", function () {
    var meituanOrderId = $(this).data("meituan_order_id");//美团单号id
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    $.post("/MeiTuan/CancelDispatchByOrderId", { "orderId": meituanOrderId }, function (result) {
        if (result.data && result.data == "ok") {
            layer.closeAll();
            layer.msg("订单处理成功");
        } else if (result.error) {
            layer.msg(result.error.message);
        }
        setTimeout(function () {
            getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
        }, 500);
    });
    return false;
});

//众包配送的小费
var addMeiTuanZhongBaoTipHtml = '<div class="reasonhtmlcontent"><p class="shuoming">从发配送到骑手抢单前，这段时间都可以追加小费，小费只能增，不能减。</p>';
addMeiTuanZhongBaoTipHtml += '<input type="number" class="form-control" id="addmoney" placeholder="请输入小费金额" value="" /></div>';
addMeiTuanZhongBaoTipHtml += '<div class="modal-footer"><button type="button" class="btn sharebtn sharebtn5" id="addMeiTuanZhongBaoTipBtn">确认</button>';
addMeiTuanZhongBaoTipHtml += '<button type="button" class="btn sharebtn" id="" onclick="layer.closeAll();">取消</button></div>';
$(document).unbind("click", ".addMeiTuanZhongBaoTip").on("click", ".addMeiTuanZhongBaoTip", function () {
    var meituanOrderId = $(this).data("meituan_order_id");//美团单号id
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    layer.open({
        type: 1,
        shift: 5,
        title: "众包加小费",
        area: ['440px', '270px'],
        content: addMeiTuanZhongBaoTipHtml,
        success: function () {
            addMeiTuanZhongBaoTipFn(meituanOrderId, meituanOrderType);
        }
    });
    return false;
});

//小费
function addMeiTuanZhongBaoTipFn(meituanOrderId, meituanOrderType) {
    $("#addMeiTuanZhongBaoTipBtn").click(function () {
        var addMoney = $("#addmoney").val();//小费的费用
        if (addMoney) {
            $.post("/MeiTuan/UpdateZbDispatchTipByOrderId", {
                "orderId": meituanOrderId,
                "tipAmount": addMoney
            }, function (result) {
                if (result.data && result.data == "ok") {
                    layer.closeAll();
                    layer.msg("订单处理成功");
                } else if (result.error) {
                    layer.msg(result.error.message);
                }
                setTimeout(function () {
                    getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
                }, 500);
            });
        } else {
            layer.msg("请输入小费金额");
        }

    });
}

//同意退款操作
$(document).unbind("click", ".agreerefunds").on("click", ".agreerefunds", function () {
    var meituanOrderId = $(this).data("meituan_order_id");//美团单号id
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    var reason = "同意退款";
    $.post("/MeiTuan/AgreeRefundByOrderId", {
        "orderId": meituanOrderId,
        "reason": reason
    }, function (result) {
        if (result.data && result.data == "ok") {
            layer.closeAll();
            layer.msg("订单处理成功");
        } else if (result.error) {
            layer.msg(result.error.message);
        }
        setTimeout(function () {
            getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
        }, 500);
    });
    return false;
});

//拒绝退款操作
var reasonhtml = '<div class="reasonhtmlcontent"><p class="shuoming">拒绝退款可能导致用户申诉，请慎重操作</p><select class="form-control" id="selectreason">';
reasonhtml += '<option value="已和用户沟通一致不退款">已和用户沟通一致不退款</option><option value="正在配送途中，请耐心等待">正在配送途中，请耐心等待</option>';
reasonhtml += '<option value="用户已发货">用户已发货</option><option value="其他原因">其他原因</option></select></div>';
reasonhtml += '<div class="modal-footer"><button type="button" class="btn sharebtn sharebtn5" id="refuserefundsBtn">确认</button>';
reasonhtml += '<button type="button" class="btn sharebtn" id="" onclick="layer.close(layer.index);">取消</button></div>';
$(document).unbind("click", ".refuserefunds").on("click", ".refuserefunds", function () {
    var meituanOrderId = $(this).data("meituan_order_id");//美团单号id
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    layer.open({
        type: 1,
        shift: 5,
        title: "拒绝退款",
        area: ['440px', '250px'],
        content: reasonhtml,
        success: function () {
            refuseRefundsFn(meituanOrderId, meituanOrderType);
        }
    });
    return false;
});
//操作退款
function refuseRefundsFn(meituanOrderId, meituanOrderType) {
    var selectreason = $("#selectreason").val();
    $("#selectreason").change(function () {
        selectreason = $("#selectreason").val();
    });

    $("#refuserefundsBtn").click(function () {
        $.post("/MeiTuan/RejectRefundByOrderId", {
            "orderId": meituanOrderId,
            "reason": selectreason
        }, function (result) {
            if (result.data && result.data == "ok") {
                layer.closeAll();
                layer.msg("订单处理成功");
            } else if (result.error) {
                layer.msg(result.error.message);
            }
            setTimeout(function () {
                getTakeOutFoodOrderCountByUserId(2, meituanOrderType, null, -1, null, null);
            }, 500);
        });
    });
}

//美团----查看订单的详情
$(document).unbind("click", "#shareTakeawayOrderHtml>li.meituan").on("click", "#shareTakeawayOrderHtml>li.meituan", function () {
    $(this).addClass("active").siblings("li.meituan").removeClass("active");
    var meiTuanOrderId = $(this).data("meituan_order_id");
    var viewOrderId = $(this).children(".hiddeninput").val();//展示id
    var orderFoodsDetails = {};//订单详情
    var orderFoodSreduce_fee = {};//优惠活动
    var orderFoodsDetailsStatus;//订单状态
    var orderFoodsDetailsHtml = '';//加载商品html
    $.get("/MeiTuan/GetQueryOrderInfoById", { orderId: meiTuanOrderId }, function (result) {
        if (result.data) {
            $("#activeInfo").html("");//重置饿了么活动消息
            orderFoodsDetails = $.parseJSON(result.data.detail);//订单商品详情
            orderFoodSreduce_fee = $.parseJSON(result.data.extras);//订单优惠活动
            orderFoodsDetailsStatus = result.data.status;//订单的状态
            orderFoodsDetailsPayType = result.data.payType;//支付类型（1：货到付款；2：在线支付）
            orderFoodsDetailslogisticsCode = result.data.logisticsCode;//配送方式的状态码
            //0000	商家自配送
            //0002	趣活
            //0016	达达
            //0033	E代送
            //1001	美团专送-加盟
            //1002	美团专送-自建
            //1003	美团配送-众包
            //1004	美团专送-城市代理
            //2001	角马
            //2002	快送
            //3001	美团专送－混合送
            $("#wt_nober").text(viewOrderId);//订单id
            $("#wt_datetime").text(new Date(result.data.cTime * 1000).Format("MM-dd hh:mm:ss"));//下订单时间
            $("#sv_delivery_status").css("display", "none");

            if (orderFoodsDetailsPayType == 1) {
                $("#sv_payment_type").text("货到付款");
                $("#sv_shop_payment_status").text("待付款");
            } else {
                $("#sv_payment_type").text("在线支付");
                $("#sv_shop_payment_status").text("已付款");
            }

            if (orderFoodsDetailslogisticsCode == 0000) {
                $("#meituanDeliveryMethod").html("自配送");
            } else if (orderFoodsDetailslogisticsCode == 1001 || orderFoodsDetailslogisticsCode == 1002 || orderFoodsDetailslogisticsCode == 1004 || orderFoodsDetailslogisticsCode == 3001) {
                $("#meituanDeliveryMethod").text("美团专送");
            } else if (orderFoodsDetailslogisticsCode == 1003) {
                $("#meituanDeliveryMethod").text("美团配送 - 众包");
            } else {
                $("#meituanDeliveryMethod").text("其他配送");
            }

            $("#ThisShopName").text(result.data.poiName);//门店名称
            $("#sv_receipt_name").text(result.data.recipientName);//收货人名称
            $("#sv_receipt_phone").text(result.data.recipientPhone);//电话
            $("#sv_receipt_address").text(result.data.recipientAddress);//地址

            //循环读出下单商品信息
            if (orderFoodsDetails && orderFoodsDetails.length > 0) {
                for (var i = 0; i < orderFoodsDetails.length; i++) {
                    orderFoodsDetailsHtml += '<li class="meituanfoods"><div class="foodslistcontent">';
                    orderFoodsDetailsHtml += '<span class="fl meituanfoodsname">' + orderFoodsDetails[i].food_name + '<i class="paddingleft10">' + orderFoodsDetails[i].food_property + '</i></span>';
                    orderFoodsDetailsHtml += '<span class="fr"><i class="ff6666">¥' + orderFoodsDetails[i].price + '</i>';
                    orderFoodsDetailsHtml += '<i class="pad10">x' + orderFoodsDetails[i].quantity + '</i></span></div></li>';
                }
                $("#foodlist").html(orderFoodsDetailsHtml);
            }

            if (orderFoodsDetails.length > 3) {
                $("#productNumber").text(orderFoodsDetails.length - 3);
                $(".morenumber").show();
            } else {
                $(".morenumber").hide();
            }
            //订单备注
            if (result.data.caution || result.data.dinnersNumber) {
                $("#meituancaution").css("display", "block");
                $("#meituancautioninfo").text("订单备注：" + '' + result.data.caution + '');
                $("#meituanSreduce_fee").text("");
                if (result.data.dinnersNumber == 0) {
                    $("#meituandinnersNumber").text("就餐人数：没填写就餐人数");
                } else {
                    $("#meituandinnersNumber").text("就餐人数：" + '' + result.data.dinnersNumber + '');
                }
            }
            else {
                $("#meituancaution").css("display", "none");
            }
            var originalPrice = parseFloat(result.data.originalPrice).toFixed(2);//合计
            var shippingFee = parseFloat(result.data.shippingFee).toFixed(2);//运费
            var meiTuanTotal = parseFloat(result.data.total).toFixed(2);//实付
            $("#sv_order_receivable").text("¥" + '' + originalPrice + '');
            $("#meituanfreight").text(shippingFee);
            $("#sv_order_actual_money").text(meiTuanTotal);
            $("#memberDiscount").hide(0);
            //优惠活动
            if (orderFoodSreduce_fee && orderFoodSreduce_fee.length > 1) {
                var meiTuanDiscountedPrice = 0;
                var meiTuanDiscountedPriceActive = [];
                for (var k = 0; k < orderFoodSreduce_fee.length; k++) {
                    if (orderFoodSreduce_fee[k].reduce_fee) {
                        meiTuanDiscountedPrice += orderFoodSreduce_fee[k].reduce_fee
                        meiTuanDiscountedPriceActive.push(orderFoodSreduce_fee[k].remark)
                    }
                }
                $("#discountedPrice").text(parseFloat(meiTuanDiscountedPrice).toFixed(2));
                $("#meituanSreduce_fee").text("优惠活动：" + '' + meiTuanDiscountedPriceActive + '');
                $("#meituancaution").css("display", "block");
            } else {
                $("#discountedPrice").text("0.00");
            }
            $("#takeawayorderinfobox").show(300).animate({ right: 0 }, 350);

        }
    });
});

// 打印订单信息
$(document).unbind("click", "#shareTakeawayOrderHtml>li .takeawayprint").on("click", "#shareTakeawayOrderHtml>li .takeawayprint", function () {
    var orderId = $(this).attr('data-orderid');
    if (orderId && orderId > 0) {
        if (!_g_printConfigdata) {
            $.getJSON("/system/Getprint", function (printConfigdata) {
                if (printConfigdata) {
                    _g_printConfigdata = printConfigdata;
                    getTakeOutFoodPrintData(orderId, _g_printConfigdata, true);
                }
            });
        }
        else {
            getTakeOutFoodPrintData(orderId, _g_printConfigdata, true);
        }
    }
    return false;
});

// 根据订单ID读取打印数据
function getTakeOutFoodPrintData(orderId, printConfigdata, isTakeOutFoodOrder) {
    $.get('/MeiTuan/GetTakeOutFoodPrintData', { orderId: orderId, isTakeOutFoodOrder: isTakeOutFoodOrder }, function (data) {
        if (data) {
            debugger;
            var prlist = data.prlist;
            for (var i = 0; i < prlist.length; i++) {
                prlist[i].sv_printer_ip = _g_TakeOutFoodPrintIP;
                prlist[i].sv_printer_port = _g_TakeOutFoodPrintPort;
                if (data.sv_remarks) {
                    var producttastejson = {
                        sv_taste_data_name: data.sv_remarks
                    };
                    prlist[i].ProductTasteList = [];
                    prlist[i].ProductTasteList.push(producttastejson);
                }
            }
            if (isNullOrWhiteSpace(_g_TakeOutFoodPrintIP) && isNullOrWhiteSpace(_g_TakeOutFoodPrintPort)) {
                pushcateringprintData(JSON.stringify(data), JSON.stringify(printConfigdata), 2);
            }
            else {
                layer.msg('请配置好外卖打印机信息后才能进行后厨打印！');
            }
            pushprintData(JSON.stringify(data), JSON.stringify(printConfigdata), 0, 0, 0, 0);
            layer.msg('已向打印机发送打印信息！');
        }
    });
}

//=======饿了么==========//

//确认订单
$(document).unbind("click", ".eleconfirmbtn").on("click", ".eleconfirmbtn", function () {
    var eleOrderType = $("#takeawayordertype>li.active").data("order-status");//饿了么订单状态
    $.post("/EleMe/ConfirmOrderLite", { orderId: $(this).data("ele_order_id") }, function (data) {
        if (data) {
            if (data.error) {
                layer.msg(data.error.message);
            } else {
                layer.msg("订单处理成功");
            }
        }
        setTimeout(function () {
            getTakeOutFoodOrderCountByUserId(3, eleOrderType, null, -1, null, null);
        }, 500);
    });
    return false;
});

//取消订单
$(document).unbind("click", ".elecancelbtn").on("click", ".elecancelbtn", function () {
    var eleOrderId = $(this).data("ele_order_id");//订单的id
    index = Deke.DeKe_dialog.show_Url2('取消订单(' + eleOrderId + ')<input type="hidden" id="eleOrdercleanId" value="' + eleOrderId + '" />', "/OnlineOrder/_PartialEleOrderCancel?v=" + clearCache + 200, eleCancelFn, ["440px", "370px"]);
    return false;
});

//取消订单方法
function eleCancelFn() {
    var reasonCode = "others";
    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    var eleOrderType = $("#takeawayordertype>li.active").data("order-status");
    //改变状态码
    $(document).unbind("change", "#reasoncode").on("change", "#reasoncode", function () {
        reasonCode = $("#reasoncode option:selected").val();
    });
    $("#eleconfirmcanclebtn").click(function () {
        var remark = $("#orderremarks").val();
        if (remark) {
            $.post("/EleMe/CancelOrderLite", {
                orderId: $("#eleOrdercleanId").val(),//订单号
                type: reasonCode,//订单取消原因code【reasonCode】
                remark: remark,//取消订单原因
            }, function (data) {
                if (data) {
                    if (data.error) {
                        layer.msg(data.error.message);
                    } else {
                        layer.closeAll();
                        layer.msg("订单处理成功");
                    }
                    setTimeout(function () {
                        getTakeOutFoodOrderCountByUserId(3, eleOrderType, null, -1, null, null);
                    }, 500);
                }
            });
        } else {
            layer.msg("填写备注信息");
        }
    });
}

//呼叫配送

var distributionhtml = '<div class="reasonhtmlcontent" style="overflow:hidden;"><p style="line-height:38px;color:#ff6666;padding-bottom:15px;">请输入小费,1-8之间的整数</p><div style="line-height:34px;padding:0;" class="col-xs-3">配送小费：</div>';
distributionhtml += '<div class="col-xs-9"><input type="number" placeholder="输入费用" class="form-control" id="distributionfree"></div></div>';
distributionhtml += '<div class="modal-footer"><button type="button" class="btn sharebtn sharebtn5" id="elecalldistributionBtn">确认</button>';
distributionhtml += '<button type="button" class="btn sharebtn" id="" onclick="layer.close(layer.index);">取消</button></div>';

$(document).unbind("click", ".elecalldistribution").on("click", ".elecalldistribution", function () {
    var eleOrderId = $(this).data("ele_order_id");//美团单号id
    var eleOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
    layer.open({
        type: 1,
        shift: 5,
        title: "呼叫配送",
        area: ['440px', '235px'],
        content: distributionhtml,
        success: function () {
            callDistributionFn(eleOrderId, eleOrderType);
        }
    });
    return false;
});

//呼叫配送的方法
function callDistributionFn(eleOrderId, eleOrderType) {
    $("#elecalldistributionBtn").click(function () {
        var distributionFree = $("#distributionfree").val();//配送费用的值
        $.post("/EleMe/CallDelivery", { "orderId": eleOrderId, "fee": distributionFree }, function (data) {
            if (data) {
                if (data.error) {
                    layer.msg(data.error.message);
                } else {
                    layer.msg("订单处理成功");
                }
            }
        });
    });
}

//饿了么自配送
$(document).unbind("click", ".elemyselefdistribution").on("click", ".elemyselefdistribution", function () {
    var eleOrderId = $(this).data("ele_order_id");//美团单号id
    $.post("/EleMe/DeliveryBySelfLite", { "orderId": eleOrderId }, function (data) {
        if (data) {
            if (data.error) {
                layer.msg(data.error.message);
            } else {
                layer.msg("订单处理成功");
            }
        }
    });
    return false;
});

//饿了么同意退单
$(document).unbind("click", ".eleAgreeRetire").on("click", ".eleAgreeRetire", function () {
    var eleOrderId = $(this).data("ele_order_id");//美团单号id
    $.post("/EleMe/AgreeRefundLite", { "orderId": eleOrderId }, function (data) {
        if (data) {
            if (data.error) {
                layer.msg(data.error.message);
            } else {
                layer.msg("订单处理成功");
            }
        }
    });
});

//饿了么拒绝退单
$(document).unbind("click", ".eleRefusedReturn").on("click", ".eleRefusedReturn", function () {
    var eleOrderId = $(this).data("ele_order_id");//美团单号id
    //$.post("/EleMe/AgreeRefundLite", { "orderId": eleOrderId ,"reason":}, function (data) {
    //    if (data) {
    //        if (data.error) {
    //            layer.msg(data.error.message);
    //        } else {
    //            layer.msg("订单处理成功");
    //        }
    //    }
    //});
});

//饿了么过程中取消订单
//$(document).unbind("click", ".eleprocesscancelbtn").on("click", ".eleprocesscancelbtn", function () {
//    var eleOrderId = $(this).data("ele_order_id");//订单的id
//    index = Deke.DeKe_dialog.show_Url2('取消订单(' + eleOrderId + ')<input type="hidden" id="eleOrdercleanId" value="' + eleOrderId + '" />', "/OnlineOrder/_PartialEleOrderCancel?v=" + clearCache + 200, eleProcessCancelFn, ["440px", "370px"]);
//    return false;
//});

//饿了么过程中取消订单的方法
//function eleProcessCancelFn() {
//    var reasonCode = "others";
//    var meituanOrderType = $("#takeawayordertype>li.active").data("order-status");//当前选择的状态
//    var eleOrderType = $("#takeawayordertype>li.active").data("order-status");
//    //改变状态码
//    $(document).unbind("change", "#reasoncode").on("change", "#reasoncode", function () {
//        reasonCode = $("#reasoncode option:selected").val();
//    });
//    $("#eleconfirmcanclebtn").click(function () {
//        if (reasonCode) {
//            $.post("/EleMe/AgreeRefundLite", { orderId: $("#eleOrdercleanId").val() }, function (data) {
//                if (data.error) {
//                    layer.msg(data.error.message);
//                } else {
//                    layer.msg("订单处理成功");
//                }
//                setTimeout(function () {
//                    getTakeOutFoodOrderCountByUserId(3, eleOrderType, null, -1, null, null);
//                }, 500);
//            })
//        } else {
//            layer.msg("请选择取消订单原因");
//        }
//    });
//}



//饿了么根据订单id查询订单
$(document).unbind("click", "#shareTakeawayOrderHtml>li.eleme").on("click", "#shareTakeawayOrderHtml>li.eleme", function () {
    var eleOrderId = $(this).data("ele_order_id");//获取饿了么订单的id
    $(this).addClass("active").siblings("li.eleme").removeClass("active");
    $.get("/EleMe/GetOrder", {
        orderId: eleOrderId
    }, function (data) {
        if (data && data.result) {
            var data = data.result;
            var orderFoodsDetailsHtml = '';
            $("#activeInfo").html("");
            $("#wt_nober").text(data.id);//订单Id
            $("#meituanDeliveryMethod").text();//配送方式
            $("#wt_datetime").text(data.activeAt.replace("T", " "));//订单时间
            if (data.onlinePaid) {
                $("#sv_payment_type").text("在线支付");//支付方式
                $("#sv_shop_payment_status").text("已付款");
            } else {
                $("#sv_payment_type").text("货到付款");//支付方式
                $("#sv_shop_payment_status").text("待付款");
            }
            $("#ThisShopName").text(data.shopName);//店铺名称
            $("#sv_receipt_name").text(data.consignee);//收货人的名称
            $("#sv_receipt_phone").text(data.phoneList);//收货人的电话
            $("#sv_receipt_address").text(data.deliveryPoiAddress);//收货人的地址
            var foodsList = data.groups[0].items;//订单商品列表
            if (foodsList && foodsList.length > 0) {
                for (var i = 0; i < foodsList.length; i++) {
                    orderFoodsDetailsHtml += '<li class="meituanfoods"><div class="foodslistcontent">';
                    orderFoodsDetailsHtml += '<span class="fl meituanfoodsname">' + foodsList[i].name + '</span>';
                    orderFoodsDetailsHtml += '<span class="fr"><i class="ff6666">¥' + parseFloat(foodsList[i].price).toFixed(2) + '</i>';
                    orderFoodsDetailsHtml += '<i class="pad10">x' + foodsList[i].quantity + '</i></span></div></li>';
                }
                if (foodsList.length > 3) {
                    $(".morenumber").show(0);
                    $("#productNumber").text(foodsList.length - 3);
                } else {
                    $(".morenumber").hide(0);
                }
                $("#foodlist").html(orderFoodsDetailsHtml);//加载列表
            }

            var originalPrice = parseFloat(data.originalPrice).toFixed(2);//合计
            var deliverFee = parseFloat(data.deliverFee).toFixed(2);//运费
            var totalPrice = parseFloat(data.totalPrice).toFixed(2);//实付
            $("#sv_order_receivable").text("¥" + '' + originalPrice + '');//合计
            $("#meituanfreight").text(deliverFee);//运费
            $("#sv_order_actual_money").text(totalPrice);//实付
            $("#discountedPrice").text(parseFloat(originalPrice - totalPrice).toFixed(2));
            $("#memberDiscount").hide(0);
            if (data.serviceFee) {
                $("#activeInfo").append('<dd>饿了么服务费:' + data.serviceFee + '</dd>');
            }
            if (data.hongbao) {
                $("#activeInfo").append('<dd>订单中红包金额:' + data.hongbao + '</dd>');
            }
            if (data.packageFee) {
                $("#activeInfo").append('<dd>餐盒费用:' + data.packageFee + '</dd>');
            }
            if (data.activityTotal) {
                $("#activeInfo").append('<dd>订单活动总额:' + data.activityTotal + '</dd>');
            }

            $("#takeawayorderinfobox").show(300).animate({ right: 0 }, 350);
        } else {
            if (data) {
                layer.msg(data.error.message);
            }
        }
    });
});


//--------百度外卖---------//

//接单
$(document).unbind("click", "#shareTakeawayOrderHtml .baiduconfirmbtn").on("click", "#shareTakeawayOrderHtml .baiduconfirmbtn", function () {
    var baiduOrderId = $(this).data("meituan_order_id");
    $.post("http://119.23.132.106:98/TakeOutFoodCallback/BaiDuConfirmOrder?orderId=" + baiduOrderId, function (result) {
        if (result) {
            var result = JSON.parse(result);
            if (result.data == true) {
                layer.msg("确认成功");
                getTakeOutFoodOrderCountByUserId(4, 2, null, -1, null, null);//外卖订单的初始化页面
            }
            else {
                layer.msg(result.error);
            }
        }
    });
});

//取消
$(document).unbind("click", "#shareTakeawayOrderHtml .baiducancelbtn").on("click", "#shareTakeawayOrderHtml .baiducancelbtn", function () {
    var baiduOrderId = $(this).data("meituan_order_id");//订单的id
    index = Deke.DeKe_dialog.show_Url2('取消订单(' + baiduOrderId + ')<input type="hidden" id="baiduOrdercleanId" value="' + baiduOrderId + '" />', "/OnlineOrder/_PartialBaiDuOrderCancel?v=" + clearCache + 200, eleCancelFn, ["440px", "305px"]);
    return false;
});

//确认取消
$(document).unbind("click", "#baiduconfirmcanclebtn").on("click", "#baiduconfirmcanclebtn", function () {
    var baiduOrdercleanId = $("#baiduOrdercleanId").val();
    var type = $("#reasoncode").val();
    var reason = $("#orderremarks").val();
    var orderType = $("#takeawayordertype li.active").data("order-status");
    $.post("http://119.23.132.106:98/TakeOutFoodCallback/BaiDuCancelOrder", {
        orderId: baiduOrdercleanId,
        type: type,
        reason: reason
    }, function (result) {
        if (result != null && result != "") {
            var result = JSON.parse(result);
            if (result.data == true) {
                layer.closeAll();
                layer.msg("确认成功");
                setTimeout(function () {
                    getTakeOutFoodOrderCountByUserId(4, orderType, null, -1, null, null);//外卖订单的初始化页面
                }, 2000);
            }
            else {
                layer.msg(result.error);
            }
        }
    });
});

//搜索
$(document).unbind("click", "#SearchBaiDu").on("click", "#SearchBaiDu", function () {
    var meiTuanOrderId = $("#meiTuanOrderId").val().replace(/\s+/g, "");
    if (meiTuanOrderId) {
        getTakeOutFoodOrderCountByUserId(4, -1, meiTuanOrderId, -1, null, null);
    } else {
        layer.msg("请输入订单单号");
    }
});


//饿了么根据订单id查询订单
$(document).unbind("click", "#shareTakeawayOrderHtml>li.baidu").on("click", "#shareTakeawayOrderHtml>li.baidu", function () {
    var baiduOrderId = $(this).data("meituan_order_id");//获取百度订单的id
    $(this).addClass("active").siblings("li.baidu").removeClass("active");
    $.get("http://119.23.132.106:98/TakeOutFoodCallback/BaiDuOrderDetail?orderId=" + baiduOrderId,
    function (data) {
        if (data && data != null && data != undefined) {
            console.log(data);
            $("#takeawayorderinfobox").show(300).animate({ right: 0 }, 350);
            var orderFoodsDetailsHtml = '';
            var orderInfon = data.order;//订单具体内容
            $("#activeInfo").html("");
            $("#wt_nober").text(orderInfon.order_id);//订单Id
            var delivery_party = orderInfon.delivery_party == 1 ? "百度配送" : "自配送";//配送方式1百度，2自配送
            $("#meituanDeliveryMethod").text(delivery_party);//配送方式
            var create_time = parseInt(orderInfon.create_time * 1000);
            $("#wt_datetime").text(new Date(create_time).Format('yyyy-MM-dd hh:mm:ss'));//订单时间
            if (orderInfon.pay_type == 2) {
                $("#sv_payment_type").text("在线支付");//支付方式
                $("#sv_shop_payment_status").text("已付款");
            } else {
                $("#sv_payment_type").text("货到付款");//支付方式
                $("#sv_shop_payment_status").text("待付款");
            }
            $("#ThisShopName").text(data.shop.name);//店铺名称
            $("#sv_receipt_name").text(data.user.name);//收货人的名称
            $("#sv_receipt_phone").text(data.user.phone);//收货人的电话
            $("#sv_receipt_address").text(data.user.address);//收货人的地址
            var foodsList = data.products;//订单商品列表
            var product_features = new Array();//商品规格
            if (foodsList && foodsList.length > 0) {
                for (var i = 0; i < foodsList.length; i++) {
                    for (var k = 0; k < foodsList[i].length; k++) {
                        product_features = [];
                        if (foodsList[i][k].product_features && foodsList[i][k].product_features.length > 0) {
                            for (var j = 0; j < foodsList[i][k].product_features.length; j++) {
                                product_features.push("("+foodsList[i][k].product_features[j].option+")");
                            }
                        }
                        orderFoodsDetailsHtml += '<li class="meituanfoods" style="display:block;"><div class="foodslistcontent">';
                        orderFoodsDetailsHtml += '<span class="fl meituanfoodsname">' + foodsList[i][k].product_name + '<i class="colorff">'+ product_features +'</i></span>';
                        orderFoodsDetailsHtml += '<span class="fr"><i class="ff6666">¥' + parseFloat((foodsList[i][k].product_price / 100)).toFixed(2) + '</i>';
                        orderFoodsDetailsHtml += '<i class="pad10">x' + foodsList[i][k].product_amount + '</i></span></div></li>';
                    }
                }
                //if (foodsList.length > 3 || true) {
                //    $(".morenumber").show(0);
                //    $("#productNumber").text(foodsList.length - 3);
                //} else {
                //    $(".morenumber").hide(0);
                //}
                $(".morenumber").hide(0);
                $("#foodlist").html(orderFoodsDetailsHtml);//加载列表
            }
            $("#sv_order_receivable").text("¥"+ (orderInfon.total_fee / 100));//合计，总金额
            $("#meituanfreight").text((orderInfon.send_fee / 100));//运费
            $("#sv_order_actual_money").text("¥" + (orderInfon.user_fee / 100));//实付
            $("#discountedPrice").text((orderInfon.discount_fee/ 100));//优惠总金额
            $("#memberDiscount").hide(0);

            if (orderInfon.package_fee > 0) {
                $("#activeInfo").append('<dd>餐盒费用:' + (orderInfon.package_fee / 100) + '</dd>');
            }
            if (orderInfon.remark) {
                $("#activeInfo").append('<dd>订单备注:' + orderInfon.remark + '</dd>');
            }
        }
    });
});