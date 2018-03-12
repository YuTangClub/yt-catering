$(document).ready(function () {
    var storeid = $("#storeid").val();
    var storename = $("#storename").val();
    salesGetShopNameFn(storeid, storename);
});

//获取分店店铺信息
function salesGetShopNameFn(storeid, storename) {
    var type = 0;
    $.get('/BranchStore/GetStorelist/?type=' + type + "&Storeid=" + storeid + "&StoreName=" + storename, function (data) {
        if (data == -2) {
            layer.msg("您没有该权限！");
        }
        else {
            var shopNameHtml = '';
            if (data == -1) {
                $("#getshopname").hide();
            } else {
                $("#getshopname").show();
                for (var theadKey in data) {
                    shopNameHtml += data[theadKey];
                }
                $('#getshopname').html(shopNameHtml);
            }

        }
    });
}

//日期点击选择事件
$(document).unbind("click", "#queryday>li").on("click", "#queryday>li", function () {
    $(this).addClass("active").siblings("li").removeClass("active");
    var ShopName = $('#getshopname option:selected').text();
    var shopId = !isNullOrWhiteSpace($("#getshopname").val()) ? "" : $("#getshopname").val();
    $(this).find("a")[0].href = $(this).find("a")[0].href + "&storeid=" + shopId + "&storeName=" + ShopName;
    //其他时间的查询
    var index = $(this).index();
    if (index == 3) {
        $(".querydate").css("display", "block");
    } else {
        $(".querydate").css("display", "none");
    }
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

//店铺查询筛选
$("#getshopname").change(function () {
    $("#storeid").val(($("#getshopname").val()));
    var ShopName = $('#getshopname option:selected').text();
    var shopId = !isNullOrWhiteSpace($("#getshopname").val()) ? "" : $("#getshopname").val();
    location.href = "/intelligent/Statement_N3?storeid=" + shopId + "&storeName=" + ShopName;
});

//打印每日对账单
