$("#Btnshowshopcode").click(function () {
    $.post('/MobileStore/GenerateCodeToBase64Img', function (data) {
        if (data) {
            var showshopcodehtml = '<div class="shopcodebox"><div class="col-xs-6 wechatshopcode">';
            showshopcodehtml += '<input type="hidden" value="http://shop.decerp.cc/PhoneCatering/Index/' + user_id + '" id="fe_text2">';
            showshopcodehtml += '<img src="' + data + '" alt=""></div><div ';
            showshopcodehtml += 'class="col-xs-6 wechatbtnbox "><a href="' + data + '" target="_blank" type="" class="btn donwcode">';
            showshopcodehtml += '下载店铺二维码</a><a type="" class="btn copycode" id="copycode" data-clipboard-action="copy" data-clipboard-target="#fe_text2" data-url="http://shop.decerp.cc/Home/Index/' + user_id + '">复制店铺网址</a>';
            showshopcodehtml += '</div></div><footer class="determinebtn-closebtn" style="padding-left:20px;padding-right:20px;">';
            showshopcodehtml += '<div class="fl" style="line-height:30px;font-size: 12px;"><span><i class="pad colorff">*</i>';
            showshopcodehtml += '使用微信扫描二维码进入商城</span></div><div class="btnbox fr">';
            showshopcodehtml += '<button type="button" class="btn btn-default closepage">取消</button></div></footer>';
            var index = layer.open({//弹出层的index
                type: 1, //page层
                title: '店铺二维码',//弹框的标题
                shade: 0.6, //遮罩透明度
                moveType: 1, //拖拽风格，0是默认，1是传统拖动
                shift: 0, //0-6的动画形式，-1不开启
                area: ['400px', '330px'], //宽高
                closeBtn: 1,
                content: showshopcodehtml,//html内容
                scrollbar: false,
                shadeClose: true,//点击遮罩层是否关闭弹窗
                success: function(){
                    callbackUrl();
                }
            });

            function callbackUrl() {
                var clipboard = new Clipboard('#copycode', {
                    text: function () {
                        return $("#fe_text2").val();
                    }
                });
                clipboard.on('success', function (e) {
                    layer.msg("复制成功！");
                });

                clipboard.on('error', function (e) {
                    layer.msg("复制失败！");
                });
            }

        }
        else {
            layer.msg('生成二维码失败请稍后再试！');
        }
    });
});

$(function() {
    PreferentialTopUpGivingConfigList("ShopCateringWechatConfig", "ShopCateringWechatConfig");
    if (Preferential_TopUpGiving_ConfigList && Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0)
    {
        g_ShopCateringWechatConfig = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
        var duixiang = JSON.parse(Preferential_TopUpGiving_ConfigList[0].sv_detail_value);
        if (duixiang.BeginDate) {
            var readyBeginDate = $.parseJSON(duixiang.BeginDate);
        }
        if (duixiang.CenterDate) {
            var readyCenterDate = $.parseJSON(duixiang.CenterDate);
        }
        if (duixiang.NightDate) {
            var readyNightDate = $.parseJSON(duixiang.NightDate);
        }
        if (duixiang.TakeOutWayModel) {
            if (!duixiang.TakeOutWayModel.inModel) {
                $("#inModel").prop("checked", true);
            } else {
                $("#inModel").prop("checked", false);
            }
        } else
        {
            $("#inModel").prop("checked", true);
        }
        if (duixiang.TakeOutWayModel) {
            if (!duixiang.TakeOutWayModel.outModel) {
                $("#outModel").prop("checked", true);
            } else
            {
                $("#outModel").prop("checked", false);
            }
        } else
        {
            $("#outModel").prop("checked", true);
        }
        $("#beginDate1").val(readyBeginDate.beginDate);
        $("#endDate1").val(readyBeginDate.endDate);
        $("#beginDate2").val(readyCenterDate.beginDate);
        $("#endDate2").val(readyCenterDate.endDate);
        $("#beginDate3").val(readyNightDate.beginDate);
        $("#endDate3").val(readyNightDate.endDate);
        $("#WIFIName").val(duixiang.WiFiName);
        $("#WIFIPwd").val(duixiang.WiFiPwd);
        if (duixiang.ShopOnlineMsg) {
            $('#txtShopOnlineMsg').val(duixiang.ShopOnlineMsg);
        }
        if (duixiang.TakeOutFoodPay) {
            var takeOutFoodPay = duixiang.TakeOutFoodPay;
            $('#takeOutFoodWecahtPay').attr("checked", takeOutFoodPay.WecahtPay);
            $('#takeOutFoodMemberPay').attr("checked", takeOutFoodPay.MemberPay);
        }
        if (duixiang.ShopPay) {
            var shopPay = duixiang.ShopPay;
            $('#shopsReceptionPay').attr("checked", shopPay.ReceptionPay);
            $('#shopsWecahtPay').attr("checked", shopPay.WecahtPay);
            $('#shopsMemberPay').attr("checked", shopPay.MemberPay);
        }
    }
    if (g_ShopCateringWechatConfig) {
        $("#InBusiness").prop("checked", true);
        $("#InBusinessNO").prop("checked", false);
    } else {
        $("#InBusinessNo").prop("checked", true);
        $("#InBusiness").prop("checked", false);
    }
    $("#user_name").val(_g_user_config.sv_us_name);
    $("#user_us_phone").val(_g_user_config.sv_us_phone);

});

$("#wechatshoplistSave").on("click", function () {
    var isRun = true;

    if ($("#InBusiness").is(':checked')) {
        g_ShopCateringWechatConfig = true;
    } else {
        if (g_ShopCateringWechatConfig == false) {
            isRun = false;
        }
        g_ShopCateringWechatConfig = false;
    }
    var beginDatejson = {
        beginDate: $("#beginDate1").val(),
        endDate: $("#endDate1").val()
    };
    var centerDatejson = {
        beginDate: $("#beginDate2").val(),
        endDate: $("#endDate2").val()
    };
    var nightDatejson = {
        beginDate: $("#beginDate3").val(),
        endDate: $("#endDate3").val()
    };
    var takeOutFoodPay = {
        WecahtPay: $('#takeOutFoodWecahtPay').is(":checked"),
        MemberPay: $('#takeOutFoodMemberPay').is(":checked")
    };
    var shopPay = {
        ReceptionPay: $('#shopsReceptionPay').is(':checked'),
        WecahtPay: $('#shopsWecahtPay').is(':checked'),
        MemberPay: $('#shopsMemberPay').is(':checked')
    };
    var TakeOutWayModel = {
        inModel: !$("#inModel").is(':checked'),
        outModel: !$("#outModel").is(':checked')
    };

    if (!shopPay.ReceptionPay && !shopPay.WecahtPay && !shopPay.MemberPay) {
        layer.msg('店内订单支付方式必须选择一种！');
        return;
    }
    if (!takeOutFoodPay.WecahtPay && !takeOutFoodPay.MemberPay) {
        layer.msg('外卖订单支付方式必须选择一种！');
        return;
    }
    var cateringConfigJson = {
        EnableDoBusiness: g_ShopCateringWechatConfig,
        BeginDate: JSON.stringify(beginDatejson),
        CenterDate: JSON.stringify(centerDatejson),
        NightDate: JSON.stringify(nightDatejson),
        WiFiName: $("#WIFIName").val(),
        WiFiPwd: $("#WIFIPwd").val(),
        ShopOnlineMsg: $('#txtShopOnlineMsg').val().trim(),
        TakeOutFoodPay: takeOutFoodPay,
        ShopPay: shopPay,
        TakeOutWayModel: TakeOutWayModel
    };
    if (isRun) {
        var svUserConfigdetailId;
        var svDetailValue = JSON.stringify(cateringConfigJson);
        var svUserConfigId;
        var svUserModuleId;
        PreferentialTopUpGivingConfigList("ShopCateringWechatConfig", "ShopCateringWechatConfig");
        if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
            svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
            svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
            svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
            var a = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
        }
        if (sv_user_module_config != null) {
            svUserConfigId = sv_user_module_config.sv_user_config_id;
            svUserModuleId = sv_user_module_config.sv_user_module_id;
        }
        var detaillist = [];
        var data = {
            "sv_user_configdetail_id": svUserConfigdetailId,
            "sv_detail_value": svDetailValue,
            "sv_user_config_id": svUserConfigId,
            "sv_user_module_id": svUserModuleId,
            "sv_detail_is_enable": g_ShopCateringWechatConfig,
            "sv_user_configdetail_name": "微信点餐店铺信息配置",
            "sv_remark": "微信点餐店铺信息配置"
        };
        detaillist.push(data);

        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=ShopCateringWechatConfig',
               detaillist, function (result) {
                   if (result) {
                       if (result == 1) {
                           layer.msg("保存成功");
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
    else {
        layer.msg("保存成功");
    }
});

//领取扫码点餐
$(document).ready(function () {
    if (_g_ValueAddedServices_Recommend_TOScanOrder) {
        var new_Date = Math.round(new Date().getTime() / 1000);//现在的时间
        var expiration_Date = Math.round(new Date(_g_ValueAddedServices_Recommend_TOScanOrder_Date).getTime() / 1000);//过期时间
        if (new_Date > expiration_Date) {
            Deke.DeKe_dialog.show_Url2('', "/html/buyTipspage.html?v=" + clearCache + 200, receiveshopbtn2Fn, ["380px", "250px"]);
        }
    } else {
        Deke.DeKe_dialog.show_Url2('', "/html/buyTipspage.html?v=" + clearCache + 200, receiveshopbtn2Fn, ["380px", "250px"]);
    }
});
function receiveshopbtnFn() {
    //$("#warmthtips").text("扫码点餐限时免费，请前往领取！");
    $("#codeimg").attr("src", "../images/caeteringcode.png");
    $(document).unbind("click", "#receiveshopbtn").on("click", "#receiveshopbtn", function () {
        location.href = "/ValueAdded/Index/ValueAddedServices_Recommend_TOScanOrder";
    });
}

function receiveshopbtn2Fn() {
    //$("#warmthtips").text("扫码点餐使用期限到期，请前往领取或者购买！");
    $("#codeimg").attr("src", "../images/caeteringcode.png");
    $(document).unbind("click", "#receiveshopbtn").on("click", "#receiveshopbtn", function () {
        location.href = "/ValueAdded/Index/ValueAddedServices_Recommend_TOScanOrder";
    });
}

//封装时间选择的方法
function selectDateTimeFn(Selector) {
    var selectoroffLeft = Selector.offset().left;
    var selectoroffTop = Selector.offset().top + 34;
    var Time = new Date();
    var newHours = Time.getHours();
    var newMinutes = Time.getMinutes();
    $("#datebox").css("left", selectoroffLeft).css("top", selectoroffTop).css("display", "block");
    var hourshtml = '';
    var minutehtml = '';
    for (var i = 0; i < 24; i++) {
        if (i < 10) {
            if (i == newHours) {
                hourshtml += '<li data-hours="0' + i + '" class="active">0' + i + '</li>';
            } else {
                hourshtml += '<li data-hours="0' + i + '">0' + i + '</li>';
            }
        }
        else {
            if (i == newHours) {
                hourshtml += '<li data-hours="' + i + '" class="active">' + i + '</li>';
            } else {
                hourshtml += '<li data-hours="' + i + '">' + i + '</li>';
            }
        }
    }
    for (var i = 0; i < 60; i++) {
        if (i < 10) {
            if (i == newMinutes) {
                minutehtml += '<li data-minute="0' + i + '" class="active">0' + i + '</li>';
            } else {
                minutehtml += '<li data-minute="0' + i + '">0' + i + '</li>';
            }
        } else {

            if (i == newMinutes) {
                minutehtml += '<li data-minute="' + i + '" class="active">' + i + '</li>';
            } else {
                minutehtml += '<li data-minute="' + i + '">' + i + '</li>';
            }
        }
    }
    $("#datehours").html(hourshtml);
    $("#dateminute").html(minutehtml);

    $("#datehours>li,#dateminute>li").click(function () {
        $(this).addClass("active").siblings("li").removeClass("active");
    });

    $("#determine").unbind("click").on("click", function () {
        var hoursval = $("#datehours>li.active").data("hours");
        var minuteval = $("#dateminute>li.active").data("minute");
        Selector.val(hoursval + ":" + minuteval);
        $("#datebox").hide(0);
    });

    $("#hidebox").click(function () {
        $("#datebox").hide(0);
    });
}

$($("#beginDate1")).on("click", function () {
    selectDateTimeFn($("#beginDate1"));
});
$($("#endDate1")).on("click", function () {
    selectDateTimeFn($("#endDate1"));
});
$($("#beginDate2")).on("click", function () {
    selectDateTimeFn($("#beginDate2"));
});
$($("#endDate2")).on("click", function () {
    selectDateTimeFn($("#endDate2"));
});
$($("#beginDate3")).on("click", function () {
    selectDateTimeFn($("#beginDate3"));
});

$($("#endDate3")).on("click", function () {
    selectDateTimeFn($("#endDate3"));
});

