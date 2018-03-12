$("#buySmsMain li").click(function () {
    $(this).addClass('active').siblings("li").removeClass('active');
    $("#pay").text($(this).data("mory"));
    $('#sms_ordenum').val($(this).data("val"));
});

$('#btnPay').click(function () {
    var data = {
        sms_mealname: $('#buySmsMain li.active .nn1').html(),
        sms_mealprice: $('#buySmsMain li.active').data("mory"),
        sms_mealnum: $('#buySmsMain li.active').data("val"),
        sms_mealpayment: $('.pay[name="selectpaystyle"]:checked').val()
    };
    layer.load();
    var orderTime = 0;
    var payType = $('.pay[name="selectpaystyle"]:checked').val();
    $.postJson('/Sms/SaveSns_Order', data, function (data) {
        layer.closeAll();
        if (data.succeed) {
            var scanPay;
            var title = '';
            if (payType == '支付宝') {
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
                    $.getJSON("/sms/Getorderstate?id=" + data.errmsg, function (data) {
                        if (data == 3) {
                            console.log(data);
                            layer.msg("充值成功");
                            //window.location.href = "/sms/sendsms_N3";
                        }
                    });
                }
                else {
                    clearInterval(iCount);
                    alert("您的订单已过期失效！");
                    location.reload();
                }
            }, 3000);
        }
        else {
            layer.msg("订单提交失败,请稍后重试！");
        }
    });

});