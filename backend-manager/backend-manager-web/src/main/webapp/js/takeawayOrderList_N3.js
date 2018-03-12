var pagesize = 5;//初始化特免加载条数
var pageIndex = 1;//初始化页码

$(document).ready(function () {
    getTakeOutFoodOrderCount(-1,0);
})

//获取分店店铺信息
//function salesGetShopNameFn() {
//    var type = 0;
//    $.get('/BranchStore/GetStorelist/?type=' + type, function (data) {
//        if (data == -2) {
//            layer.msg("您没有该权限！");
//        }
//        else {
//            if (data == -1) {
//                $("#getshopname").hide();
//            } else {
//                $("#getshopname").show();
//                var shopNameHtml = '';//店铺名称加载
//                for (var theadKey in data) {
//                    shopNameHtml += data[theadKey];
//                }
//                $('#getshopname').html(shopNameHtml);
//            }
//        }
//    });
//}

//获取操作员信息
//function salesGetOperatorFn() {
//    var operatorHtml = '<option value="">操作员</option>';
//    $.getJSON("/Salesclerk/PageList/", { page: 1, pagesize: 100 }, function (data) {
//        if (data != null && data.length > 0) {
//            for (var i = 0; i < data.length; i++) {
//                if (isNullOrWhiteSpace(data[i].sv_employee_name)) {
//                    operatorHtml += '<option value="' + data[i].sp_salesclerkid + '">' + data[i].sv_employee_name + '</option>';
//                }
//                else {
//                    operatorHtml += '<option value=""></option>';
//                }
//            }
//        }
//        $("#getoperator").html(operatorHtml);
//    });
//}

//选择时间查询===0今日，1昨日，2本周，4其他
$(document).unbind("click", "#queryday>li").on("click", "#queryday>li", function () {
    var index = $(this).data("queryday");
    $(this).addClass("active").siblings("li").removeClass("active");
    if (index != 4) {
        $(".querydate").css("display", "none");
        shareQuerySalestakeawayInfoFn();
    } else {
        $(".querydate").css("display", "block");
    }
    //其他日期查询
    $("#otherday").unbind("click").click(function () {
        shareQuerySalestakeawayInfoFn();
    });
});

//时间的插件初始化
$('#begindate').datetimepicker({//开始时间
    language: 'zh',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    endDate: new Date(),//结束时间
    pickerPosition: 'bottom-left',
    // format: 'yyyy-mm-dd hh:mm:ss'
}).on('change', function (ev) {
    var startDate = $('#begindateval').val();
    $("#enddate").datetimepicker('setStartDate', startDate);
    $("#begindate").datetimepicker('hide');
});
$('#enddate').datetimepicker({//结束时间
    language: 'zh',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    startDate: $("#begindateval").val(),
    endDate: new Date(),
    pickerPosition: 'bottom-left',
    // format: 'yyyy-mm-dd hh:mm:ss'
}).on('change', function (ev) {
    var endDate = $("#enddateval").val();
    $("#begindate").datetimepicker('setReturnDate', endDate);
    $("#enddate").datetimepicker('hide');
});

//店铺查询/操作员查询
$("#getshopname,#getoperator").change(function () {
    shareQuerySalestakeawayInfoFn();
});

//列表条数
$(document).on("change", "#pagesize", function () {
    pagesize = $(this).val();
    shareQuerySalestakeawayInfoFn();
});

//=======筛选查询======
//查询点击事件
var chosenHtml = '';//已经选择的代码
$(document).on("click","#takeawayordertype>li",function () {
    var fristOn = $(this).hasClass("on");//判断是否点击是第一个li元素
    var activeLi = $(this).hasClass("active");//判断点击的元素是否有activeClass
    if (!fristOn) {
        if (!activeLi) {
            $("#chosen").show(0);
            $(this).addClass("active").siblings("li").removeClass("active");
            $('#chosen>li[data-name="' + $(this).data("name") + '"').remove();
            chosenHtml = $(this).clone(true);//完全复制当前点击的demo
            chosenHtml.appendTo("#chosen");
        } else {
            $('#chosen>li[data-name="' + $(this).data("name") + '"').remove();
            if ($("#chosen>li").length == 1) {
                $("#chosen").hide(0);
            }
        }
    }
});

//已经选择的查询事件
$(document).on("click", "#chosen>li.active", function () {
    $(this).remove();
    $("[data-name='" + $(this).data("name") + "']").removeClass("active");
    $("[data-queryid='-1'][data-name='" + $(this).data("name") + "']").addClass("active");
    if ($("#chosen>li").length == 1) {
        $("#chosen").hide(0);
    }
});

//筛选查询按钮
$(document).on("click", "#btnOrderQuery", function () {
    shareQuerySalestakeawayInfoFn();
});

//筛选查询/店铺查询/操作员查询店铺销售信息的方法===公共方法
function shareQuerySalestakeawayInfoFn() {
    var TakeOutFoodType = "",
        seachStr = $("#orderInfo").val(),//订单查询
        queryDayType = $("#queryday>li.active").data("queryday"),//3=====其他日期
        beginDate = $("#begindateval").val(),//开始日期
        endDate = $("#enddateval").val();
    if ($("#chosen li").length >= 2) {
        $("#chosen li.active").each(function () {
            switch ($(this).data("name")) {
                case "takeawayordertype":
                    TakeOutFoodType = $(this).data("queryid");
                    break;
            }
            getTakeOutFoodOrderCount(TakeOutFoodType, seachStr, queryDayType, beginDate, endDate);
        });
    } else {
        getTakeOutFoodOrderCount(-1, seachStr, queryDayType, beginDate, endDate);
    }
}

//查看备注信息
$(document).unbind("click", ".sv_remarks").on("click", ".sv_remarks", function () {
    layer.open({
        content: $(this).data("sv_remarks"),
        title: null,
        btn: null,
        shift: 5,
        shadeClose: true,
        area: ['420px', '']
    });
});

//获取销售列表数据
//统计所有订单页码的方法
function getTakeOutFoodOrderCount(TakeOutFoodType, seachStr, queryDayType, beginDate, endDate) {
    $.get('/intelligent/GetTakeOutFoodOrderCount', {
        //"pageIndex": pageIndex,//页码
        //"pageSize": pageSize,//分页大小
        "TakeOutFoodType": TakeOutFoodType,//数据类型
        "seachStr": seachStr,//模糊查询
        "queryDayType": queryDayType,//常用日期查询（今天，昨天，本周，本月，其它）
        "beginDate": beginDate,//开始时间
        "endDate": endDate//结束时间
    }, function (data) {
        var i = Math.ceil(data / pagesize);
        laypage({
            cont: $('#layerpage'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            skip: true,
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                getTakeOutFoodOrderPageList(e.curr, pagesize, TakeOutFoodType, seachStr, queryDayType, beginDate, endDate);
                if (i > 1) {
                    addPageSizeFn("#selectpagesize");
                    $("#pagesize").find("option[value='" + pagesize + "']").attr("selected", true);
                } else {
                    $("#selectpagesize").html("");
                }
            }
        });
    });
}

//外卖订单获取方法---查询方法
function getTakeOutFoodOrderPageList(pageIndex, pageSize, TakeOutFoodType, seachStr, queryDayType, beginDate, endDate) {
    $.get('/intelligent/GetTakeOutFoodOrderPageList', {
        "pageIndex": pageIndex,//页码
        "pageSize": pageSize,//分页大小
        "TakeOutFoodType": TakeOutFoodType,//数据类型
        "seachStr": seachStr,//模糊查询
        "queryDayType": queryDayType,//常用日期查询（今天，昨天，本周，本月，其它）
        "beginDate": beginDate,//开始时间
        "endDate": endDate//结束时间
    }, function (result) {
        if (result && result.length > 0) {
            var foodsListHtml = '';//订单数据
            var foodsList;//单条数据单挑的json
            var orderFreight;//订单的优惠金额
            var orderType;//订单来源（0--店内线下订单，1--店内线上订单，2--美团订单，3--饿了么订单，4--百度外卖订单，5--口碑外卖订单）
            var orderName = "";
            var sv_us_name = $("#username").text();//当前店铺的名称
            for (var i = 0; i < result.length; i++) {
                foodsList = $.parseJSON(result[i].orderproductjson);
                orderFreight = result[i].order_receivable - result[i].order_receivable;
                orderType = result[i].sv_order_source;

                if (orderType == 1) {
                    orderName = "店内外卖";
                } else if (orderType == 2) {
                    orderName = "美团外卖";
                } else if (orderType == 3) {
                    orderName = "饿了么";
                } else if (orderType == 4) {
                    orderName = "百度外卖";
                } else if (orderType == 5) {
                    orderName = "口碑外卖";
                }

                if (result[i].sv_isthepen) {
                    foodsListHtml += '<tr class="moreProudct gesture" data-id="' + result[i].meituan_orderid_view + '">';
                    foodsListHtml += '<td class="gesture">';
                    foodsListHtml += '<img class="fl img" src="/images/002.png"></div>';
                    foodsListHtml += '<div class="shareproductinfo fl"><div class="box1">';
                    foodsListHtml += '<span class="productnamespan">' + foodsList[0].product_name + '</span>';
                    foodsListHtml += '<i class="multiplepen">多笔</i></div></div>';
                    foodsListHtml += '<div class="showtext"><i class="colorff">本次消费数据合计:</i>';
                    foodsListHtml += '<i class="bgred">多笔</i><i class="icon-chevron-down male5"></i>';
                    foodsListHtml += '</div></td>';
                    foodsListHtml += '<td><span>' + result[i].meituan_orderid_view + '</span></td>';
                    foodsListHtml += '<td><span></span></td>';
                    foodsListHtml += '<td><span>' + result[i].reduce_fee + '</span></td>';
                    foodsListHtml += '<td><span>' + result[i].sv_product_num + '</span></td>';
                    foodsListHtml += '<td><i>¥ ' + result[i].order_receivable + '</i></td>';
                    foodsListHtml += '<td><span>' + result[i].shipping_fee + '</span></td>';
                    foodsListHtml += '<td><span>' + orderName + '</span></td>';
                    foodsListHtml += '<td><span>' + sv_us_name + '</span></td>';
                    foodsListHtml += '<td><span>' + new Date(result[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td>';
                    if (result[i].sv_remarks) {
                        foodsListHtml += '<td><a class="sv_remarks" data-content="' + result[i].sv_remarks + '">详情</a></td></tr>';
                    } else {
                        foodsListHtml += '<td></td></tr>';
                    }
                    //多笔订单信息
                    for (var j = 0; j < foodsList.length; j++) {
                        foodsListHtml += '<tr class="hideproduct bordertopnone gesture" data-id="' + result[i].meituan_orderid_view + '">';
                        foodsListHtml += '<td class="gesture">';
                        foodsListHtml += '<img class="fl img" src="/images/002.png">';
                        foodsListHtml += '<span class="productnamespan">' + foodsList[j].product_name + '</span></td>';
                        foodsListHtml += '<td><span></span></td>';
                        foodsListHtml += '<td><span>' + foodsList[j].product_price + '</span></td>';
                        foodsListHtml += '<td><span>' + orderFreight + '</span></td>';
                        foodsListHtml += '<td><span>' + foodsList[j].product_num + '</span></td>';
                        foodsListHtml += '<td><i>¥ ' + foodsList[j].product_total + '</i></td>';
                        foodsListHtml += '<td><span></span></td>';
                        foodsListHtml += '<td><span></span></td>';
                        foodsListHtml += '<td><span></span></td>';
                        foodsListHtml += '<td><span></span></td>';
                        foodsListHtml += '<td></td></tr>';
                    }

                } else {
                    foodsListHtml += '<tr class="" data-id="' + result[i].meituan_orderid_view + '">';
                    foodsListHtml += '<td class="curpo">';
                    foodsListHtml += '<img class="img fl" src="/images/002.png">';
                    foodsListHtml += '<span class="productnamespan">' + foodsList[0].product_name + '</span></td>';
                    foodsListHtml += '<td><span>' + result[i].meituan_orderid_view + '</span></td>';
                    foodsListHtml += '<td><span>' + foodsList[0].product_price + '</span></td>';
                    foodsListHtml += '<td><span>' + result[i].reduce_fee + '</span></td>';
                    foodsListHtml += '<td><span>' + result[i].sv_product_num + '</span></td>';
                    foodsListHtml += '<td><i>¥ ' + result[i].order_receivable + '</i></td>';
                    foodsListHtml += '<td><span>' + result[i].shipping_fee + '</span></td>';
                    foodsListHtml += '<td><span>' + orderName + '</span></td>';
                    foodsListHtml += '<td><span>' + sv_us_name + '</span></td>';
                    foodsListHtml += '<td><span>' + new Date(result[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td>';
                    if (result[i].sv_remarks) {
                        foodsListHtml += '<td><a class="sv_remarks" data-content="' + result[i].sv_remarks + '">详情</a></td></tr>';
                    } else {
                        foodsListHtml += '<td></td></tr>';
                    }

                }
            }
            $("#saleslisthtml").html(foodsListHtml);
        } else {
            var thlength = $("#rowlength").children("th").length;
            foodsListHtml = '<tr><td class="text-center sad" style="" colspan="' + thlength + '"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>';
            $("#saleslisthtml").html(foodsListHtml);
        }
    });
}

//展开多笔销售报表数据
$(document).unbind("click", ".moreProudct>td:first-child").on("click", ".moreProudct>td:first-child", function () {
    var indexid = $(this).parent().attr('data-id');
    if ($(this).parent().hasClass("open")) {
        $(this).parent().removeClass("open");
        $(this).children(".shareproductinfo").show(0);
        $(this).children(".showtext").hide(0);
        $('.hideproduct[data-id="' + indexid + '"]').css("display", "none");
    } else {
        $(this).parent().addClass("open");
        $(this).children(".shareproductinfo").hide(0);
        $(this).children(".showtext").show(0);
        $('.hideproduct[data-id="' + indexid + '"]').css("display", "table-row");
    }
});
