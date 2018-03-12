/// <reference path="../../views/catering/_partialtaste.cshtml" />
//公共变量
var shortcut_key_json = { "8": "backspace", "9": "tabtab", "12": "clear", "13": "enter", "16": "shift", "17": "control", "18": "alt", "19": "pause", "20": "capslock", "27": "escape", "32": "space", "33": "prior", "34": "next", "35": "end", "36": "home", "37": "←", "38": "↑", "39": "→", "40": "↓", "41": "select", "42": "print", "43": "execute", "45": "insert", "46": "delete", "47": "help", "48": "0", "49": "1", "50": "2", "51": "3", "52": "4", "53": "5", "54": "6", "55": "7", "56": "8", "57": "9", "65": "a", "66": "b", "67": "c", "68": "d", "69": "e", "70": "f", "71": "g", "72": "h", "73": "i", "74": "j", "75": "k", "76": "l", "77": "m", "78": "n", "79": "o", "80": "p", "81": "q", "82": "r", "83": "s", "84": "t", "85": "u", "86": "v", "87": "w", "88": "x", "89": "y", "90": "z", "96": "kp_0", "97": "kp_1", "98": "kp_2", "99": "kp_3", "100": "kp_4", "101": "kp_5", "102": "kp_6", "103": "kp_7", "104": "kp_8", "105": "kp_9", "106": "kp_multiply", "107": "+", "108": "kp_separator", "109": "-", "110": "kp_decimal", "111": "kp_divide", "112": "f1", "113": "f2", "114": "f3", "115": "f4", "116": "f5", "117": "f6", "118": "f7", "119": "f8", "120": "f9", "121": "f10", "122": "f11", "123": "f12", "124": "f13", "125": "f14", "126": "f15", "127": "f16", "128": "f17", "129": "f18", "130": "f19", "131": "f20", "132": "f21", "133": "f22", "134": "f23", "135": "f24", "136": "num_lock", "137": "scroll_lock", "187": "acute", "188": "comma", "189": "minus", "190": "period", "192": "numbersign", "210": "plusminus", "212": "copyright", "213": "guillemotleft", "214": "masculine", "215": "ae", "216": "cent", "217": "questiondown", "218": "onequarter", "220": "lessgreater", "221": "plusasterisk", "227": "multiply", "228": "acircumflex", "229": "ecircumflex", "230": "icircumflex", "231": "ocircumflex", "232": "ucircumflex", "233": "ntilde", "234": "yacute", "235": "oslash", "236": "aring", "237": "ccedilla", "238": "thorn", "239": "eth", "240": "diaeresis", "241": "agrave", "242": "egrave", "243": "igrave", "244": "ograve", "245": "ugrave", "246": "adiaeresis", "247": "ediaeresis", "248": "idiaeresis", "249": "odiaeresis", "250": "udiaeresis", "251": "ssharp", "252": "asciicircum", "253": "sterling", "254": "mode_switch" };
var comon_key_arr = [];
var shortcut_key_repeat = false; // 快捷键是否重复
var osd = 1;
var clikcname = "";
var dataconioctorn = null;
var jiaodianname = "";
var jieshuanid = 0;
var swiper;
var checkSubmitFlg = false;
var memberlist = "";
var productlistJsonList = []; // 拼接订单json
var StrEmployeelId = "";//员工id
var overdue_userecord_id = "";
var member_product_overdue_id = "";
var Preferential_TopUpGiving_ConfigList = "";//充值赠送信息
var configleveldata = [];//等级配置信息
var configleveldata_Topup = "";//等级配置信息[原变量，和满减等用在一起，重新定义]
var isShowWindow = false; // 是否已打开过计重商品窗口
var keyup_Code; // keyup键盘按下的code
var key_close_window = false; // 窗口是否已打开，进行关闭
var capital_letters = true; // 是否为大写字母
var _member_discount = 100; // 会员折扣
var _cache_memberinfo_json; // 单个会员缓存信息
var _common_csshjsbox_window_open = false;
var wxauthcode_waitfor = false; // 微信或支付宝，扫条码是否需要等待，密码支付
var order_query_pending = false; // 微信或支付宝，扫条码的订单查询是否在进行，防止重复查询
var wxauthcode_isSuccess = false; // 微信或支付宝 支付是否成功
var _g_wechatPayNumber = ''; // 微信支付二维码回调
var _g_cateringRegionListCacheJson; // 房台信息缓存
var _g_catering_order_list_print_Json = {}; // 餐饮打印数据
var _g_deductIntegral = 0;
var jifendixiankaiguan = false;//积分抵现开关

var _g_sumorigprice = 0;//折后实收价
var _g_catering_print_success = false; // 当前是否正在打印
var _g_catering_print_data_total = 0; // 餐饮当前打印数据总数
var _g_catering_print_data_index = 0; // 餐饮当前正在打印数据index
var _g_memberWechatPayCallback = false; // 微信充值循环查询是否正在进行中
var _g_withlist_remark = "";//挂单备注

var _g_thisObj_seriaNumber;//串号全局变量
var seriaNumberArray_active_ImemCounts = 0;//不是串号商品的数量
var seriaNumber_imem_obj = {};//已选择串号的商品的对象
var data_order_product_status = {"New":0, "Pendding":1, "Paid":2};//订单订单商品的状态，pendding用于区分，已挂单打印的记录，防止后厨重复打印

//类别初始化
$.getAsyncJson("/ProductCategory/GetSaleProductCategoryList", null, function (data) {
    if (data.length > 0) {
        for (var i in data) {
            $("#classlist").append(' <div class="swiper-slide" data-id="' + data[i].productcategory_id + '">' + data[i].sv_pc_name + '</div>');
        }
        if (data.length < 10) {
            for (var i = 0; i < (10 - data.length) ; i++)
                $("#classlist").append(' <div class="swiper-slide" data-id="-1">&nbsp;</div>');
        }
        //导航滑动的
        var swiper = new Swiper('.Cashtopnav .swiper-container', {
            slidesPerView: 6,
            paginationClickable: true,
            spaceBetween: 4,
            freeMode: true,
            prevButton: '.Cashtopnav .swiper-button-prev',
            nextButton: '.Cashtopnav .swiper-button-next'
        });
    }
});
//-------------------房台、商品数量的取值-------------------------//
var width = $(window).width();
if (width >= 1500 && width < 1697) {
    cash_get_product_number = 30;
} else if (width > 1280 && width < 1500) {
    cash_get_product_number = 24;
} else if (width >= 1270 && width <= 1280) {
    cash_get_product_number = 20;
} else if (width > 960 && width < 1270) {
    cash_get_product_number = 15;
} else if (width > 900 && width <= 960) {
    cash_get_product_number = 15;
} else if (width <= 900) {
    cash_get_product_number = 8;
} else
{
    cash_get_product_number = 42;
}

if (_g_sv_uit_cache_name == 'cache_name_catering') {
    if (width >= 1360 && width < 1697) {
        cateringPageSize = 21;
    } else if (width > 1205 && width <= 1410) {
        cateringPageSize = 12;
    } else if (width <= 1205) {
        cateringPageSize = 10;
    }
}
//-------------------房台、商品数量的取值-------------------------//
//---------------------结束---------------
GetProductList(1, 0, -1, 0, 0, "");

$(function () {
    getkey_settingInfo();
});
function checkSubmit() {
    if (checkSubmitFlg == true) {
        return false;
    }
}

function IntegralToNow() {
    if (_g_uc_dixian != null) {
        $("#jiFenDiXian").attr("checked", jifendixiankaiguan);
        var AfterFoldingPaid_inValue = _g_sumorigprice;//折后实收价
        var MemberOfTheIntegral = parseInt($("#memberintegral").text());//会员积分      
        if (_g_uc_dixian.whether && MemberOfTheIntegral > 0) {
            var str = "最多可使用" + parseInt(_g_uc_dixian.auto) * parseInt(MemberOfTheIntegral / _g_uc_dixian.auto) + "积分抵" + parseInt(MemberOfTheIntegral / _g_uc_dixian.auto) + "元";
            $(".jiFenDiXian").find("#jifendixiantishi").text(str);
            $(".jiFenDiXian").show();
            if (jifendixiankaiguan==false) {
                MemberOfTheIntegral = 0;
            }
            if (parseInt(AfterFoldingPaid_inValue) - parseInt(MemberOfTheIntegral / _g_uc_dixian.auto) < 0)
            {
                    _g_deductIntegral = parseInt(AfterFoldingPaid_inValue) * parseInt(_g_uc_dixian.auto);
                    $('#yinshou').val((AfterFoldingPaid_inValue - parseInt(AfterFoldingPaid_inValue)).toFixed(2));
                    $('#yinshou').change();
            } else {
                    _g_deductIntegral = parseInt(_g_uc_dixian.auto) * parseInt(MemberOfTheIntegral / _g_uc_dixian.auto);
                    $('#yinshou').val((AfterFoldingPaid_inValue - parseInt(MemberOfTheIntegral / _g_uc_dixian.auto)).toFixed(2));
                    $('#yinshou').change();
            }
        }

    }
}
$(document).on("click", "#jiFenDiXian", function () {
    jifendixiankaiguan = !jifendixiankaiguan;
    IntegralToNow();

});

function cliskgetuser(userid, cardno) {

    var is_GetConfigdataBylevel = false;
    if ($("#memberlevel_id").val() != null && $("#memberlevel_id").val() != "" && $("#memberlevel_id").val() >= 1) {
        is_GetConfigdataBylevel = true;
    }
    if (!cardno) {
        cardno = $("#query_user").val();
    }
    if ($("#query_user").val() != "") {
        var _userid = userid != null && userid != '' ? userid : user_id;
        $.get("/Ajaxdata/QueryUserModel?id=" + cardno + "&userid=" + _userid, function (data) {
            if (data == null) {
                layer.msg("找不到该会员，请查证再查询");
                $(".sv_ml_name").text("");
                $(".sv_mw_availableamount").text("");
                $(".sv_mw_availablepoint").text("");
                $(".sv_ml_commondiscount").text("");
                $(".sv_mr_birthday").text("");
                $(".sv_mr_mobile").text("");
                $("#query_user").data("id", "");
                return;
            }
            if (data.type == 1) {
                Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=42", f4, ['730px', ''], "shoyin2");
                $("#userid").val("");
                memberlist = data.list;
            }
            else if (data.isOverdue) {
                layer.msg("此卡已过期");
                $(".sv_ml_name,.sv_mr_name").text("");
                $(".sv_mw_availableamount").text("");
                $(".sv_mw_availablepoint").text("");
                $(".sv_ml_commondiscount").text("");
                $(".sv_mr_birthday").text("");
                $(".sv_mr_mobile").text("");
                $("#query_user").data("id", "");
                return false;
            } else if (data.sv_mr_status == 1) {
                layer.msg("此卡已挂失");
                $(".sv_ml_name,sv_mr_name").text("");
                $(".sv_mw_availableamount").text("");
                $(".sv_mw_availablepoint").text("");
                $(".sv_ml_commondiscount").text("");
                $(".sv_mr_birthday").text("");
                $(".sv_mr_mobile").text("");
                $("#query_user").data("id", "");
                return false;
            }
            else {
                _cache_memberinfo_json = data;
                $("#user_descount").text(_member_discount);
                for (var key in data) {

                    if (key == "sv_mr_birthday") {

                        var t = new Date(data[key]).Format("yyyy-MM-dd");
                        if (t == "1-01-01") {
                            t = "";
                        }
                        $("." + key).text(t);

                    } else {
                        if (key == "member_id") {

                            // alert(data[key]);
                            $("#" + key).val(data[key]);
                            $("#query_user").data("id", data[key]);
                        } else {
                            if (key == "user_id") {
                                $("#" + key).val(data[key]);
                                $("#userid").val(data[key]);
                            } if (key == "sv_recommended_peopleid") {
                                $("#" + key).val(data[key]);
                            }
                            else {
                                if (key == "memberlevel_id") {
                                    $("#" + key).val(data[key]);
                                } else {
                                    $("." + key).text(data[key]);
                                }
                            }
                        }

                        if (key == "sv_mr_name") {
                            $("#Cashxzhy").find("input").val(data[key]);
                            $("#query_user").data("name", data[key]);;
                        }

                        if (key == "sv_ml_commondiscount") {
                            if (parseFloat(data[key]) != 0) {
                                $("#yinshou").val(returnFloat(parseFloat($("#yinshou").data("val")) * (parseFloat(data[key]) / 10)));
                                $("#xianjin").val($("#yinshou").val()).change();
                                $("#order_discount").val(parseFloat(data[key]));
                            }
                        }

                    }

                }

                if (!is_GetConfigdataBylevel && $("#memberlevel_id").val() != null && $("#memberlevel_id").val() != "") {
                    GetConfigdataBylevel($("#memberlevel_id").val());
                }

            }
        });
    }

    //
}

function clickSinglegetuser(userid, memberid) {

    var is_GetConfigdataBylevel = false;
    if ($("#memberlevel_id").val() != null && $("#memberlevel_id").val() != "" && $("#memberlevel_id").val() >= 1)
    {
        is_GetConfigdataBylevel = true;
    }

    if ($("#query_user").val() != "")
    {
        $.getAsyncJson('/Ajaxdata/GetUserModel', { id: memberid }, function(data) {
            if (data == null)
            {
                layer.msg("找不到该会员，请查证再查询");
                $(".sv_ml_name").text("");
                $(".sv_mw_availableamount").text("");
                $(".sv_mw_availablepoint").text("");
                $(".sv_ml_commondiscount").text("");
                $(".sv_mr_birthday").text("");
                $(".sv_mr_mobile").text("");
                $("#query_user").data("id", "");
                return;
            }
            _cache_memberinfo_json = data;
            $("#user_descount").text(_member_discount);
            for (var key in data)
            {

                if (key == "sv_mr_birthday")
                {

                    var t = new Date(data[key]).Format("yyyy-MM-dd");
                    if (t == "1-01-01")
                    {
                        t = "";
                    }
                    $("." + key).text(t);

                } else
                {
                    if (key == "member_id")
                    {

                        // alert(data[key]);
                        $("#" + key).val(data[key]);
                        $("#query_user").data("id", data[key]);
                    } else
                    {
                        if (key == "user_id")
                        {
                            $("#" + key).val(data[key]);
                            $("#userid").val(data[key]);
                        } if (key == "sv_recommended_peopleid")
                        {
                            $("#" + key).val(data[key]);
                        }
                        else
                        {
                            if (key == "memberlevel_id")
                            {
                                $("#" + key).val(data[key]);
                            } else
                            {
                                $("." + key).text(data[key]);
                            }
                        }
                    }

                    if (key == "sv_mr_name")
                    {
                        $("#Cashxzhy").find("input").val(data[key]);
                        $("#query_user").data("name", data[key]);;
                    }

                    if (key == "sv_ml_commondiscount")
                    {
                        if (parseFloat(data[key]) != 0)
                        {
                            $("#yinshou").val(returnFloat(parseFloat($("#yinshou").data("val")) * (parseFloat(data[key]) / 10)));
                            $("#xianjin").val($("#yinshou").val()).change();
                            $("#order_discount").val(parseFloat(data[key]));
                        }
                    }

                }

            }

            if (!is_GetConfigdataBylevel && $("#memberlevel_id").val() != null && $("#memberlevel_id").val() != "")
            {
                GetConfigdataBylevel($("#memberlevel_id").val());
            }
        });
    }

    //
}


function f11() {
    var html = '';
    overdue_userecord_id = "";
    var f11_user_order_reocords = "";
    member_product_overdue_id = "";
    $("#Cashlefsit > li").each(function () {
        if ($(this).hasClass("product_type")) {
            html += ' <tr class="MouseMobile" data-id="' + this.id + '" id="Overdue_tr_' + this.id + '"><td>' + $(this).find(".nn1").text() + '</td><td>' + $(this).find(".nump").text() + '</td><td>' + $(this).find(".jiage").text() + '</td> <td>-' + $(this).find(".nump").text() + '次</td><td>储值卡</td><td> <a id="Overdue_' + this.id + '"  href="javascript:void(0);" style="display:none" ><span onclick="DeleteOverdue(' + this.id + ')" data-id="' + this.id + '" class="icon-remove"></span></a></td></tr>';
        } else {
            var jiege = parseFloat($(this).find(".jiage").text()) * (parseFloat(_member_discount) / 100);
            var jiege2 = jiege * parseFloat($(this).find(".nump").text());
            html += ' <tr ><td>' + $(this).find(".nn1").text() + '</td><td>' + $(this).find(".nump").text() + '</td><td>' + jiege + '</td> <td>' + jiege2 + '</td><td>待选择</td></tr>';
        }

        f11_user_order_reocords += this.id;
    });

    $("#liulist").html(html);
    // jieshuajie2
    $("#yinfu").text($("#jieshuajie2").text());
    html = "";
    $.getJSON("/Ajaxdata/GetCharge/" + $('#huiyuan_id').attr('data-id'), { "clas": 0, "page": -1 }, function (data) {

        for (var i = 0; i < data.length; i++) {
            if (data[i].sv_mcc_leftcount > 0) {
                var adsd = "";
                if (isNullOrWhiteSpace(data[i].validity_date)) {
                    adsd = new Date(data[i].validity_date).Format("yyyy-MM-dd");
                };
                if (data[i].getvalidity) {
                    if (member_product_overdue_id.indexOf(data[i].product_id) < 0) {
                        member_product_overdue_id += data[i].product_id + ",";
                        if (f11_user_order_reocords.indexOf(data[i].product_id) >= 0) {
                            overdue_userecord_id += data[i].product_id + ",";
                        }
                        $(".diaobox").append('<li calss="toptop_' + data[i].product_id + '" style="background:#f2c210"><div class="toptop"><span>' + data[i].sv_p_name + '</span> <a href="javascript:void(0)" onclick="chsaisi2($(\'#sv_mr_cardno\').text(),\'' + data[i].product_id + '\',\'' + data[i].sv_p_name + '\')" class="milefts">充次</a> </div><div class="botbot"><p>剩余次数 <span>' + data[i].sv_mcc_leftcount + '次</span></p><p>有效日期 <span style="background: #ff6668; color: #fff;">' + adsd + '(已逾期)</span></p></div></li>');
                    }
                } else {
                    $(".diaobox").append('<li><div class="toptop"><span>' + data[i].sv_p_name + '</span> <a href="javascript:void(0)" onclick="chsaisi2($(\'#sv_mr_cardno\').text(),\'' + data[i].product_id + '\',\'' + data[i].sv_p_name + '\')" class="milefts">充次</a> </div><div class="botbot"><p>剩余次数 <span>' + data[i].sv_mcc_leftcount + '次</span></p><p>有效日期 <span>' + adsd + '</span></p></div></li>');
                }

            }
        }
        overdue_userecord_id = overdue_userecord_id.replace(/,$/gi, "");
    });

    $("#CAshjsuan").click(function () {
        var cm = true;
        jifendixiankaiguan = false;
        if (!isNullOrWhiteSpace(overdue_userecord_id)) {
            if ($("#Cashlefsit li:not('.product_type')").length == 0) {
                cm = confirm("您确认帐单没有问题了吗？");
                //layer.confirm('您确认帐单没有问题了吗？', {
                //    btn: ['确定', '取消'], //按钮
                //}, function () {
                //    return cm = true;
                //}, function () {
                //    return cm = false;
                //});
            }
            if (cm) {
                if ($("#liulist .MouseMobile").length >= 1) {
                    Deke.DeKe_dialog.show_Url3("", "/html/cash/jieshuan2.html?v=" + getTimeStamp(), f2, ['877px', ''], "shoyin2");
                }
                else {
                    layer.msg("请选择您要结算的订单！");
                }

            }
        } else {
            layer.msg("当前订单存在逾期信息！");
            return false;
        }

    });
    $(".MouseMobile").each(function () {
        this.onmouseover = function () {
            $("#Overdue_" + $(this).data("id")).show();
        };
        this.onmouseout = function () {
            $("#Overdue_" + $(this).data("id")).hide();
        };
    });


}

function f10() {
    $(".product_type").remove();
    if ($("#query_user").data("id") == undefined || $("#query_user").data("id") == "") {
        $("#huiyuan_id").text("").data("id", "0").data("jiekou", "100");
        $("#yuecount").text("0.00").attr('data-money', 0);
        _member_discount = 100;
        zhonger();
    } else {
        //  alert($("#query_user").data("name"));

        $.getJSON("/Ajaxdata/branchrelation", { userid: $("#userid").val() }, function (data) {
            if (data == -3) {
                $("#userid").val("");
                layer.msg("当前会员不支持跨店消费");
                setTimeout(function () {
                    layer.closeAll();
                }, 800);
            } else {
                //$("#userid").val($("#userid").val());
                var memberscode = $("#query_user").val();
                $("#sv_mr_cardno").val($("#query_user").val());
                if (memberscode && memberscode != "" && memberscode != undefined && memberscode != null) {
                    memberscode = memberscode.length > 4 ? "**" + memberscode.slice(-4) : memberscode;
                }
                else {
                    layer.msg("未获取到会员信息，请刷新重试");
                    return;
                }
                member_product_overdue_id = "";
                var membersname = $(".sv_mr_name").text();
                membersname = membersname.length > 3 ? membersname.slice(0, 2) + "*" + membersname.slice(-1) : membersname;
                $("#huiyuan_id").text(membersname + "(" + memberscode + ")").attr("data-id", $("#query_user").data("id")).data("jiekou", $(".sv_ml_commondiscount").text());
                $("#yuecount").text(returnFloat($(".sv_mw_availableamount").text())).attr('data-money', returnFloat($(".sv_mw_availableamount").text()));;
                var this_member_discount = 100;
                if ($('.sv_ml_commondiscount').text() != null && $('.sv_ml_commondiscount').text() != undefined && $('.sv_ml_commondiscount').text() != '') {
                    this_member_discount = parseFloat($('.sv_ml_commondiscount').text()) * 10
                }
                $('#user_descount').text(this_member_discount);
                if (this_member_discount > 0) {
                    _member_discount = this_member_discount;
                }
                var discort = parseFloat($(".sv_ml_commondiscount").text());

                if (discort == 0 || $(".sv_ml_commondiscount").text() == "") {
                    discort = 10;
                }
                $("#user_descount").text(returnFloat(discort * 10));
                //读取会员所有次卡的列表
                $.getJSON("/Ajaxdata/GetCharge/" + $("#query_user").data("id"), { "clas": 0, "page": -1 }, function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].sv_mcc_leftcount > 0 && !data[i].Getvalidity) {
                            $("#" + data[i].product_id).remove();
                            $("#Cashlefsit").prepend(' <li id="' + data[i].product_id + '" data-prname="' + data[i].sv_p_name + '" data-untprice="0" data-pricingmethod="0" class="product_type" data-salesmode="0"><div class="naerigh">  <p class="nn1">' + data[i].sv_p_name + '</p><p class="nn2"><span class="fl">' + data[i].product_id + '</span><span class="fr">数量 <text class="nump" data-cnum="' + data[i].sv_mcc_leftcount + '">1</text>(' + data[i].sv_mcc_leftcount + ')</span></p> <p class="nn3"><span class="fl">¥<text class="jiage" data-rjia="0">0</text></span><span class="fr">¥ <text class="zhong" data-zhekou="1" data-sv_p_originalprice="0"> 0</span></p></div> </li>');
                            inspectCommodityWhetherZeroStock();
                            osd++;
                        }
                    }
                    zhonger();
                });

                layer.closeAll();
            }
        })
    }
    //cnum
}

function fukuanfashi() {
    if ($(".opgol.open").length == 0 || ($(".paywaylist").find(".selectpaytype.active").length < 2)) {

        $("#xianjinname").html($(".paywaylist").find(".selectpaytype.active span").eq(0).html());
        $("#daoshouname").html("待收");

    } else {

        $(".paywaylist").find(".selectpaytype.active").each(function (i) {

            if (i == 0) {
                $("#xianjinname").html($(this).children("span").html());
            } else {

                $("#daoshouname").html($(this).children("span").html());
            }

        });

    }

}

// 选择会员
$(document).unbind("click", "#userlist .xianzhehuiyan").on("click", "#userlist .xianzhehuiyan", function () {
    if ($(this).data("isoverdue")) {
        layer.msg("此卡已过期");
    } else {
        if (this.id == 1) {
            layer.msg("此卡已挂失");
        }
            //搜索会员
        else {
            $("#userid").val($(this).parent().parent().data("user_id"));
            $("#query_user").val($(this).parent().parent().data("sv_mr_cardno")).data("id", $(this).parent().parent().data("id"));

            var csshjsbox_window_open = $('#csshjsbox_window_open').val();
            if (csshjsbox_window_open) {
                paySelectMemberFn($(this).attr('data-sv_mr_cardno'), $(this).attr('data-user_id'), $(this).attr('data-level'));
            }
            else {
                clickSinglegetuser($(this).parent().parent().data("user_id"), $(this).parent().parent().data("id"));
            }
            if ($("#layerclose_hidden").val()) {
                layer.close($("#layerclose_hidden").val());
            } else {
                layer.close(index);
            }
            //try {
            //    layer.close(jieshuajie);
            //} catch (e) {

            //}
        }
    }
});

// 会员列表
function GetList(key) {
    $.get("/ajaxdata/GetMemberList/1", { "key": key, "pageSize": 30 }, function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {

            html += ' <tr data-user_id="' + data[i].user_id + '" data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '" >';

            html += '    <td><span>' + data[i].sv_mr_cardno + '</span></td>';
            html += '    <td><span>' + data[i].sv_mr_name + '</span></td>';
            html += '    <td><span>' + data[i].sv_mr_mobile + '</span></td>';
            html += '   <td><i>¥' + data[i].sv_mw_availableamount + '</i></td>';
            if (data[i] != null && data[i].sv_mw_credit != null) {
                html += '  <td><i>¥' + data[i].sv_mw_credit + '</i></td>';
            } else {
                html += '  <td><i>¥0.00</i></td>';
            }
            if (isNullOrWhiteSpace(data[i].sv_ml_name))
                html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
            else html += '  <td><span></span></td>';
            html += '  <td><span>' + data[i].sv_mw_availablepoint + '</span></td>';
            html += '   <td id="' + data[i].sv_mr_status + '"><a href="javascript:void(0);" class="xianzhehuiyan" id="' + data[i].sv_mr_status + '" data-isoverdue="' + data[i].isOverdue + '">选择</a></td>';
            html += '   </tr>';
        }
        $("#usercoutn").html(data.length);
        $("#userlist").html(html);

        $(".check-box").click(function () {
            $(".check-box").removeClass("checkedBox");
            $(this).addClass("checkedBox");
        });
        //checkedBox
    });
    $("#guanbinimab").click(function () {
        layer.close(index);
    });

    ///
    $("#userlist").on("dblclick", "tr", function () {
        if ($(this).data("isoverdue")) {
            layer.msg("此卡已过期");
        } else {
            if ($(this).find("td").eq(6).attr("id") == 1) {
                layer.msg("此卡已挂失");
            } else {
                //搜索会员
                $("#userid").val($(this).data("user_id"))
                $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));
                // $("#Cashxzhy").find("input").val($(this).data("name"));
                cliskgetuser($(this).data("user_id"));
            }
        }


    });

}

//（连锁会员共享）刷卡出现多个同卡信息
function Getmemberlist(data) {
    $("#layerclose_hidden").val(layer.index);
    console.log(layer.index);
    var html = "";
    for (var i = 0; i < data.length; i++) {

        html += ' <tr data-user_id="' + data[i].user_id + '" data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '">';

        html += '    <td><span>' + data[i].sv_mr_cardno + '</span></td>';
        html += '    <td><span>' + data[i].sv_mr_name + '</span></td>';
        html += '    <td><span>' + data[i].sv_mr_mobile + '</span></td>';
        html += '   <td><i>¥' + data[i].sv_mw_availableamount + '</i></td>';
        if (data[i] != null && data[i].sv_mw_credit != null) {
            html += '  <td><i>¥' + data[i].sv_mw_credit + '</i></td>';
        } else {
            html += '  <td><i>¥0.00</i></td>';
        }
        if (isNullOrWhiteSpace(data[i].sv_ml_name))
            html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
        else html += '  <td><span></span></td>';
        html += '   <td id="' + data[i].sv_mr_status + '"><a href="javascript:void(0);" class="xianzhehuiyan" id="' + data[i].sv_mr_status + '" data-isoverdue="' + data[i].isOverdue + '">选择</a></td>';
        html += '   </tr>';
    }
    $("#usercoutn").html(data.length);
    $("#userlist").html(html);

    $(".check-box").click(function () {
        $(".check-box").removeClass("checkedBox");
        $(this).addClass("checkedBox");
    });

    $("#guanbinimab").click(function () {

        layer.close(index);
    });

    $("#userlist").on("click", ".xianzhehuiyan", function () {

        if ($(this).data("isoverdue")) {
            layer.msg("此卡已过期");
        } else {
            if (this.id == 1) {
                layer.msg("此卡已挂失");
            }
                //搜索会员
            else {
                $("#userid").val($(this).parent().parent().data("user_id"))
                $("#query_user").val($(this).parent().parent().data("sv_mr_cardno")).data("id", $(this).parent().parent().data("id"));

                clickSinglegetuser($(this).parent().parent().data("user_id"), $(this).parent().parent().data("id"));
                layer.close(index);
            }
        }
    });
    ///
    $("#userlist").on("dblclick", "tr", function () {

        if ($(this).data("isoverdue")) {
            layer.msg("此卡已过期");
        } else {
            if ($(this).find("td").eq(6).attr("id") == 1) {
                layer.msg("此卡已挂失");
            } else {
                //搜索会员
                $("#userid").val($(this).data("user_id"))
                $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));
                cliskgetuser($(this).data("user_id"));
                layer.close(index);
            }
        }


    });

}
function f4() {
    Getmemberlist(memberlist);
    $("#query_like").keyup(function () {
        GetList($("#query_like").val());
    });
    jieshuajie = index;
}
function f3() {

    GetList($("#query_user").val());

    $("#query_like").keyup(function () {
        GetList($("#query_like").val());
    });
    jieshuajie = index;
}

// 结算时，文本框值改变，计算金额
function settlementInputChange() {

    //var xianjin = $("#xianjin").val() || 0;
    //var receivable = $("#yinshou").val();
    //if (receivable != null && receivable != '' && receivable != undefined && receivable != 0) {
    //    var yins = Math.round((parseFloat(xianjin) - parseFloat(receivable || 0)) * 100) / 100;
    //    var collect = 0; // 待收金额
    //    if (parseFloat($("#yinshou").val() || 0) > 0) {
    //        collect = Math.round((parseFloat($("#yinshou").val() || 0) - (parseFloat(xianjin))) * 100) / 100;
    //    }
    //    //现金小于应收，更新待收
    //    if (parseFloat(xianjin) < parseFloat($("#yinshou").val() || 0)) {
    //        $("#daishou").val(returnFloat(collect));
    //        $("#zhaoling").val("0.00");
    //    } else {
    //        //现金大于应收，更新找零
    //        if (yins < 0)
    //            yins = 0;
    //        $("#zhaoling").val(returnFloat(yins));
    //        $("#daishou").val("0.00");
    //    }
    //}

}
//推送分屏 实收
function push_sunmiT1_second_receivable() {
    //推送分屏
    if ((decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) && g_set_pos_t1_secondscreen_size == "false") { //7寸屏幕
        if (g_set_pos_t1_secondscreen_style > 1) {
            g_set_pos_t1_secondscreen_style = 0;
        }

        if (g_set_pos_t1_secondscreen_style == 0) {
            var postData = {
                "FooterList": [
                ]
            };
            postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            postData.FooterList.push({ "Content": "实收金额：¥" + ($("#xianjin").val() || "0.00"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

            try {
                //Android客户端打印
                cordova.plugins.barcodeScanner.showsecond(
                    function (result) {
                    },
                    function (error) {
                    },
                    {
                        myPrintData: JSON.stringify(postData)
                    }
                );
            } catch (e) {
            }
        } else {
        }
    }
}
//推送分屏 清屏幕
function push_sunmiT1_second_clear() {
    try {
        //推送分屏
        if ((decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) && g_set_pos_t1_secondscreen_size == "false") { //7寸屏幕
            if (g_set_pos_t1_secondscreen_style > 1) {
                g_set_pos_t1_secondscreen_style = 0;
            }

            if (g_set_pos_t1_secondscreen_style == 0) {
                var postData = {
                    "FooterList": [
                    ]
                };
                postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": "实收金额：¥" + ($("#xianjin").val() || "0.00"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                try {
                    //Android客户端打印
                    cordova.plugins.barcodeScanner.clearseconddesk(
                        function (result) {
                        },
                        function (error) {
                        },
                        {
                            myPrintData: JSON.stringify(postData)
                        }
                    );
                } catch (e) {
                }
            } else {
            }
        }
    } catch (e) {

    }

}


// 结算
function f2() {
    checkSubmit();
    $("#ttuser_descount").change(function () {
        var receivable = $("#jieshuajie2").text();
        if (receivable != null && receivable != undefined && receivable != '' && receivable > 0) {
            var jiekou = parseFloat($(this).val()) / 100 * parseFloat(receivable);
            $("#yinshou").val(returnFloat(jiekou));
            $("#xianjin").val(returnFloat(jiekou)).change();

            //推送分屏
            push_sunmiT1_second_receivable();
        }
    });

    // 现金文本框
    $('#xianjin').bind('change', '#xianjin', function () {
        var cashValue = $(this).val().trim();
        if (!isNullOrWhiteSpace(cashValue)) {
            if (cashValue.indexOf('.') > -1) {
                if (cashValue.length > 9) {
                    layer.msg("金额长度不能超过7位数");
                }
            }
            else {
                if (cashValue.length >= 8) {
                    layer.msg("金额长度不能超过7位数");
                }
            }
        }
    });
    _common_csshjsbox_window_open = $('#csshjsbox_window_open').val(); // 标志结算窗口已打开

    // 应收值改变 [实收金额改变]
    $("#yinshou").data("val", $("#jieshuajie2").text()).val($("#jieshuajie2").text()).bind('change keyup', function () {
        var receivable = $("#jieshuajie2").text();//应收金额
        if (receivable) {
            if (receivable > 0) {
                var jiekou = parseFloat($(this).val() || 0) / parseFloat(receivable);
                if (jiekou && jiekou > 0) {
                    jiekou = parseFloat(jiekou.toFixed(4));
                }
                $("#ttuser_descount").val((jiekou * 100).toFixed(2));
                var cash = $("#xianjin").val();
                //settlementInputChange();
                $("#xianjin").val($(this).val()).change();
            } else {
                //应收为0特殊处理，以实收  *  折扣计算
                var discount = (parseFloat($("#ttuser_descount").val() || 0)).toFixed(2);
                $("#xianjin").val(((parseFloat($(this).val() || 0) * discount) / 100).toFixed(2)).change();
            }
            push_sunmiT1_second_receivable();
        }
    });
    $("#zhaoling").val("0.00");
    $("#xianjin").val($("#jieshuajie2").text());
    cashFocus();
    $("#daishou").val("0.00");
    //备注
    if ($(".ssteater").val()) {
        $("#order_remark").val($(".ssteater").val());
    }
    ShowCusDisplay(2, $("#yinshou").val());
    CalculateGiving();
    if (is_open_print != null && !Boolean(parseInt(is_open_print.split("@")[1]))) {
        $(".biglis").removeClass("open");
    }

    //几次商品的选择的swiper的互动参数的配置/等下要放在搜索会员的里面
    swiper = new Swiper('.producttimesbox .swiper-container', {
        slidesPerView: 6,
        paginationClickable: true,
        spaceBetween: 5,
        freeMode: true
    });
    //  alert($('.showiimb .swiper-slide').length);

    //导航点击事件
    $('.paywaylist').on('click', '.selectpaytype', function () {
        var classInfo = $('#shezhang').attr('class');
        if ($(".opgol.open").length == 0) {
            $(this).addClass('active').siblings().removeClass('active');
        } else {
            if ($(this).hasClass("active")) {
                $(this).toggleClass('active');
            } else {
                if ($(".paywaylist").find(".active").length >= 1) {
                    for (var k = 0; k < $(".paywaylist").find("li").length; k++) {
                        $(".paywaylist").find("li").eq(k).removeClass('active');
                    }
                }

                $(this).toggleClass('active');
            }
            $('#s_cashPay').addClass('active');
        }
        if ($("#memberNamep").text() == null || $("#memberNamep").text() == "") {
            classInfo = $('#shezhang').attr('class');
            if (classInfo.indexOf('active') != -1) {
                layer.msg("请选择会员！");
            }
            $('#shezhang').removeClass('active');
        }
        if ($('#shezhang').attr('class').indexOf('active') != -1) {
            if ($(".paywaylist").find(".selectpaytype.active").length < 2) {
                $("#xianjinname").text("赊账");
            } else {
                $("#daoshouname").text("赊账");
            }
        }

        fukuanfashi();
    });
    if ($('#huiyuan_id').attr('data-id') != "0" && $('#huiyuan_id').attr('data-id') != "" && $('#huiyuan_id').attr('data-id') != null && $('#huiyuan_id').attr('data-id') != undefined) {
        var data = _cache_memberinfo_json;
        if (data != null && data != '' && data != undefined) {
            $('#btnMemberRecharge').attr('data-userId', data.user_id).attr('data-cardno', data.sv_mr_cardno).attr("data-level", data.memberlevel_id);
            $('#member_photo').attr('src', data.sv_mr_headimg);
            $('#huiyuan_id').attr('data-id', data.member_id);
            $("#memberNamenumber").html(data.sv_mr_mobile);
            if (data.sv_ml_commondiscount > 0 && data.sv_ml_commondiscount < 10) {
                $("#memberdIscount").html('折扣:' + (parseFloat(data.sv_ml_commondiscount) * 10).toFixed(2) + '%');
            } else {
                $("#memberdIscount").html('折扣:100%');
            }
            $("#membercatagory").html(data.sv_ml_name);
            $("#memberbalance").html(data.sv_mw_availableamount);
            $("#memberconsumptiongrand").html(data.sv_mw_sumamount);
            $("#memberintegral").html(data.sv_mw_availablepoint);
            $("#memberbirthday").html(new Date(data.sv_mr_birthday).Format("MM-dd"));
            $("#memberNamep").html(data.sv_mr_name);

            $('#member_id').val(data.member_id);
            $('#userid').val(data.user_id);
            $('.sv_mr_cardno').text(data.sv_mr_cardno);
            $('.sv_mr_name').text(data.sv_mr_name);
            $("#yuecount").attr('data-money', data.sv_mw_availableamount);
            $('.sv_mw_availableamount').text(data.sv_mw_availableamount);
            $('.paywaylist .selectpaytype').eq(1).click();
            //$('#ttuser_descount').val($('#user_descount').text());

            //$('#ttuser_descount').val('100');

            $('.paywaylist .selectpaytype').eq(1).click();
        }
        IntegralToNow();
    }
    // 处理异常图片
    $('#member_photo').error(function () {
        $(this).attr('src', '/images/001.png');
    });
    $(".opgol").click(function () {
        var member_id = $('#huiyuan_id').attr('data-id');
        if (member_id != null && member_id != undefined && member_id != '' && member_id != "0" && member_id != 0) {

        }
        $(this).toggleClass("open");
        if ($(this).hasClass('open')) {
            $('.selectpaytype').removeClass('active');
            $('#s_cashPay').addClass('active');
        }
        else {
            $('.selectpaytype').removeClass('active');
            $('#s_cashPay').addClass('active');
        }
        fukuanfashi();
    });
    //收银界面 数字点击
    var _xianjin_first = true;
    $(document).off("click", "#cash_dialog .nnrmskk>li,.calui>li");
    $(document).on("click", "#cash_dialog .nnrmskk>li,.calui>li", function () {
        if (_xianjin_first) {
            if ($(this).data("val") >= 0) {
                $("#xianjin").val($(this).data("val")).change();
            }
            _xianjin_first = false;
            return;
        }


        if ($(this).data("val") >= 0) {
            if ($(this).data("val") > 9) {
                if (jiaodianname) {
                    jiaodianname.val($(this).data("val")).change();
                } else {
                    $("#xianjin").val($(this).data("val")).change();
                }
                //cashFocus();
            } else {
                if (jiaodianname) {
                    jiaodianname.val(jiaodianname.val() + $(this).data("val")).change();
                } else {
                    $("#xianjin").val($("#xianjin").val() + $(this).data("val")).change();

                }
                //cashFocus();
            }
        } else if ($(this).data("val") == ".") {
            if (jiaodianname) {
                jiaodianname.val(jiaodianname.val() + $(this).data("val")).change();
            } else {
                $("#xianjin").val($("#xianjin").val() + $(this).data("val")).change();

            }
            //cashFocus();
        }
    });


    //删除键

    $("#deletenum").click(function () {
        if (jiaodianname) {
            jiaodianname.val('').focus();
        }
    });

    $("input").focus(function () {
        jiaodianname = $(this);
        _xianjin_first = false;
    });

    //$("#xianjin,#daishou,#yinshou,#sv_mrr_amountbefore,#sv_mrr_present").blur(function() {
    //    jiaodianname = $(this);
    //});
    var _xianjin_first = true;

    $("#xianjin").on("keydown", function () {
        if (_xianjin_first) {
            $("#xianjin").val('');
            _xianjin_first = false;
        }
    });

    //现金改变
    $("#xianjin").on("focus change keyup", function () {
        var xianjin = $("#xianjin").val() || 0;
        var cashMoney = parseFloat($("#xianjin").val() || 0);
        var receivableMoney = parseFloat($("#yinshou").val() || 0);
        if (xianjin != null && xianjin != '' && xianjin != undefined) {
            xianjin = cashMoney.toFixed(2);
        }
        var yins = Math.round((parseFloat(xianjin) - parseFloat($("#yinshou").val() || 0)) * 100) / 100;

        if (parseFloat(xianjin) < parseFloat($("#yinshou").val() || 0)) {
            yins = Math.round((parseFloat($("#yinshou").val() || 0) - (parseFloat(xianjin))) * 100) / 100;
        }
        if (parseFloat(xianjin) < parseFloat($("#yinshou").val() || 0)) {
            $("#daishou").val(returnFloat(yins));
            $("#zhaoling").val("0.00");
        } else {
            $("#zhaoling").val(returnFloat(yins));
            $("#daishou").val("0.00");
        }
    });

    $("#lohei").click(function () {
        var lisjsd = JSON.parse(dataconioctorn.sv_uc_saletozeroset);
        var tempMoney = $("#yinshou").val() || 0;
        if (lisjsd.whether) {
            if (lisjsd.auto == 0) {
                //抹角
                $("#yinshou").val(parseInt($("#yinshou").val() || 0));
                $("#xianjin").val($("#yinshou").val() || 0).change();

                cashFocus();
            }
            else if (lisjsd.auto == 1) {
                //抹分
                $("#yinshou").val(parseInt(($("#yinshou").val() || 0) * 10) / 10);
                $("#xianjin").val($("#yinshou").val() || 0);
                $("#xianjin").chang();
                cashFocus();
            } else if (lisjsd.auto == 2) {
                //抹元
                $("#yinshou").val(parseInt(($("#yinshou").val() || 0) / 10) * 10);
                $("#xianjin").val($("#yinshou").val() || 0).change();
                cashFocus();
            }

            $("#jieshuaanniu").attr("freechange", (parseFloat(tempMoney) - parseFloat($("#yinshou").val() || 0)).toFixed(2));

        } else {
            layer.msg("没有开启抺零功能");
        }
    });

    //   搜索会员
    $("#query_user").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#userid").val("");
            cliskgetuser("");
        }
    });

    //刷卡
    bindICCardEvent($("#query_user"));

    //点击结算按扭

    $("#jieshuaanniu").click(function () {
        shuxin();//刷新流水号
        var revenueLength = parseFloat($("#yinshou").val() || 0);
        if (revenueLength) {
            if (revenueLength > 999999) {
                layer.msg("单笔交易金额不可大于100万");
                return;
            }
        }
        try {
            //客显
            var change = parseFloat($("#zhaoling").val());
            if (change > 0) {
                //显示找零
                ShowCusDisplay(4, $("#zhaoling").val());
            } else {
                //显示收款
                ShowCusDisplay(3, $("#yinshou").val());
            }
            //分屏
            SendSecondScreenData(true);
        } catch (e) {

        }
        if (!checkSubmitFlg) {
            jieshu();
        }
    });
    if ($("#Cashlefsit li:not('.product_type')").length == 0) {
        if (!g_WhetherStartusingConsumptionMarket) {
            $("#jieshuaanniu").click();
        }
    }
    if (Is_open_commission) {
        getEmployessinfohtml();
    }
    else {
        $("#shoyin2").parent().width($("#shoyin2").parent().width() - 110);
        $(".paymemberlist3").hide();
        $(".paymemberlist1").removeClass("col-xs-5").addClass("col-xs-6");
        $(".paymemberlist2").removeClass("col-xs-5").addClass("col-xs-6");
    }

    $('#btnSelectmemberlist').click(function () {
        if (!g_DisableManualInput) {
            Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=20178965", selectmemberlist, ['730px', '450px']);
        } else {
            layer.msg('已禁用！');
        }
    });

    // 新版结算弹窗中的充值操作
    $(document).on('click', '#btnMemberRecharge', function () {
        var user_id = $(this).attr('data-userId'); // 店铺Id
        var member_cardno = $(this).attr('data-cardno'); // 会员卡号
        var memberlevel_id = $(this).attr('data-level');
        if ($('#huiyuan_id').attr('data-id') == 0 || $('#huiyuan_id').attr('data-id') == '' || $('#huiyuan_id').attr('data-id') == null) {
            layer.msg("还没有选择会员");
        }
        else {
            Deke.DeKe_dialog.show_Url3("会员充值", "/html/cash/chongzhu2.html?v=20170314", func_MemberRecharge(member_cardno, user_id, memberlevel_id), ['730px', ''], "chuxi");
        }
    });


    //打开钱箱
    $(document).unbind("click", "#cash_func_cashbox").on("click", "#cash_func_cashbox", function () {
        try {
            if (((typeof Cef) !== 'undefined')) {
                //打开钱箱
                Cef.OpenCashBox();
            } else {
                //是否Android客户端运行环境
                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
                    try {
                        //Android客户端打印
                        cordova.plugins.barcodeScanner.open(
                            function (result) {
                            },
                            function (error) {
                                layer.msg("打开钱箱失败: " + error);
                            },
                            {
                            }
                        );
                    } catch (e) {
                        layer.msg("打开钱箱失败: " + e.message);
                    }
                }
            }
        } catch (e) {

        }

    });



    //商米分屏-应收显示
    //是否Android客户端运行环境
    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
        try {
            //处理商米分屏显示
            if (g_set_pos_t1_secondscreen_enable) {
                var givingtype = $("#sv_user_givingtype").val();
                var deserved = $("#sv_sumobtain_value").val();
                var user_cardno = "0";
                if ($('#huiyuan_id').attr('data-id') != null &&
                    $('#huiyuan_id').attr('data-id') != '' &&
                    !$('#huiyuan_id').attr('data-id') != undefined) {
                    user_cardno = $('#huiyuan_id').attr('data-id');
                }

                var _order_remark = $('#order_remark').val().trim();

                if (_order_remark.indexOf("'") > 0) {
                    //特殊字符串过滤：'
                    _order_remark = _order_remark.replace("'", "''");
                }

                var data2 = {
                    "everyday_serialnumber": GetDailySerialNumber(true),
                    "availableIntegralSwitch": availableIntegralSwitch,
                    "rankDemotion": rankDemotion,
                    "MembershipGradeGroupingIsON": MembershipGradeGroupingIsON,
                    "rankPromotionIsON": rankPromotionIsON,
                    "prlist": productlistJsonList,
                    "order_running_id": $("#danhao").text(),
                    "order_receivable": $("#yinshou").val(),
                    "order_payment": $("#xianjinname").text(),
                    "order_money": $("#xianjin").val(),
                    "order_payment2": $("#daoshouname").text(),
                    "order_money2": $("#daishou").val(),
                    "order_change": $("#yinshou").val(),
                    "user_cardno": user_cardno,
                    "order_discount": (parseFloat($("#ttuser_descount").val()) / 100).toFixed(5),
                    "order_receivabley": $("#yinshou").data("val"),
                    "sv_remarks": _order_remark,
                    "givingtype": givingtype,
                    "deserved": deserved,
                    sv_recommended_peopleid: $("#sv_recommended_peopleid").val(),
                    free_change: $('#jieshuaanniu').attr("freechange"),
                    sv_member_discount: (parseFloat($("#user_descount").text()) / 100).toFixed(2),
                    sv_member_total_money: parseFloat($('#jieshuajie2').text()),
                    sv_order_total_money: parseFloat($('#jieshuajie').text()),
                    sv_give_change: parseFloat($('#zhaoling').val()),
                    authcode: "",
                    type: "", // 微信或支付宝支付类型（扫条码，扫二维码）
                    WhetherAsCatering: true, // 临时标记为餐饮
                    sv_table_id: ($('#catering_CateringGrade').attr('data-tableid') || 0), // 房台id 
                    sv_catering_grade: ($('#catering_CateringGrade').text() || ''),
                    sv_coupon_amount: ($('#hidden_coupon_amount').val() || 0), // 优惠券金额
                    sv_coupon_discount: ($('#hidden_coupon_discount').val() || 0), // 优惠券折扣 ，
                    sv_without_list_id: ($('#catering_CateringGrade').attr('data-withListId') || 0),
                    sv_person_num: ($('#catering_CateringGrade').attr('data-personNum') || 0), // 就餐人数
                    sv_order_source: 0, // 订单来源
                    sv_record_id: ($('#hidden_coupon_record_id').val() || 0)
                };

                if (g_set_pos_t1_secondscreen_size == "false") { //7寸屏幕
                    if (g_set_pos_t1_secondscreen_style > 1) {
                        g_set_pos_t1_secondscreen_style = 0;
                    }

                    if (g_set_pos_t1_secondscreen_style == 0) {
                        var postData = {
                            "FooterList": [
                            ]
                        };
                        postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        postData.FooterList.push({ "Content": "应收金额：¥" + ($("#xianjin").val() || "0.00"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                        try {
                            //Android客户端打印
                            cordova.plugins.barcodeScanner.showsecond(
                                function (result) {
                                },
                                function (error) {
                                },
                                {
                                    myPrintData: JSON.stringify(postData)
                                }
                            );
                        } catch (e) {
                        }
                    } else {
                    }

                } else {
                    try {
                        $.getJSON("/system/Getprint",
                            function (data) {
                                var smsg =
                                    getsunmipushprintData(JSON.stringify(data2),
                                        JSON.stringify(data),
                                        0,
                                        0,
                                        deserved,
                                        givingtype);
                                if (g_set_pos_t1_secondscreen_style == 0) {
                                    //14寸屏幕SHOWLIST   样式  14-1  14寸清单
                                    cordova.plugins.barcodeScanner.showlist(
                                        function (result) {
                                        },
                                        function (error) {
                                            layer.msg(error);
                                        },
                                        {
                                            myPrintData: (smsg)
                                        }
                                    );
                                } else if (g_set_pos_t1_secondscreen_style == 1) {
                                    //14寸屏幕二维码显示   样式  14-2  
                                } else if (g_set_pos_t1_secondscreen_style == 2) {
                                    //14寸屏幕SHOWLIST   样式  14-3  14寸轮播图 + 清单
                                    if (g_set_pos_t1_secondscreen_images) {
                                        var _imgs = g_set_pos_t1_secondscreen_images.split(',');
                                        var _imgslist = [];
                                        for (var i = 0; i < _imgs.length; i++) {
                                            if (_imgs[i].indexOf('http://') >= 0) {

                                                _imgslist.push(_imgs[i]);
                                            } else {
                                                _imgslist.push(_g_res_images_url + "/" + _imgs[i]);
                                            }
                                        }
                                        cordova.plugins.barcodeScanner.playbannerwithlist(
                                            function (result) {
                                            },
                                            function (error) {
                                                layer.msg(error);
                                            },
                                            {
                                                myPrintData: (smsg),
                                                myPrintImg: _imgslist
                                            }
                                        );
                                    }
                                } else if (g_set_pos_t1_secondscreen_style == 3) {
                                    //14寸屏幕SHOWLIST   样式  14-4  14寸轮播图
                                    if (g_set_pos_t1_secondscreen_images) {
                                        var _imgs = g_set_pos_t1_secondscreen_images.split(',');
                                        var _imgslist = [];
                                        for (var i = 0; i < _imgs.length; i++) {
                                            if (_imgs[i].indexOf('http://') >= 0) {
                                                _imgslist.push(_imgs[i]);
                                            } else {
                                                _imgslist.push(_g_res_images_url + "/" + _imgs[i]);
                                            }
                                        }
                                        cordova.plugins.barcodeScanner.playbannerimg(
                                            function (result) {
                                            },
                                            function (error) {
                                                layer.msg(error);
                                            },
                                            {
                                                myPrintData: (smsg),
                                                myPrintImg: _imgslist
                                            }
                                        );
                                    }
                                } else if (g_set_pos_t1_secondscreen_style == 4) {
                                    //14寸屏幕showlistwithvideo 样式5 
                                    if (g_set_pos_t1_secondscreen_video) {
                                        var _imgslist = [];
                                        _imgslist.push(g_set_pos_t1_secondscreen_video);
                                        cordova.plugins.barcodeScanner.showlistwithvideo(
                                            function (result) {
                                            },
                                            function (error) {
                                                layer.msg(error);
                                            },
                                            {
                                                myPrintData: (smsg),
                                                myPrintImg: _imgslist
                                            }
                                        );
                                    }
                                } else if (g_set_pos_t1_secondscreen_style == 5) {
                                    //14寸屏幕playvideo 样式6 视频+清单 
                                    if (g_set_pos_t1_secondscreen_video) {
                                        var _imgslist = [];
                                        _imgslist.push(g_set_pos_t1_secondscreen_video);
                                        cordova.plugins.barcodeScanner.playvideo(
                                            function (result) {
                                            },
                                            function (error) {
                                                layer.msg(error);
                                            },
                                            {
                                                myPrintData: (smsg),
                                                myPrintImg: _imgslist
                                            }
                                        );
                                    }
                                } else {//默认不处理

                                }


                            });
                    } catch (e) {
                        layer.msg(e.message);
                    }
                }
            }
        } catch (e) {
            layer.msg(e.message);
        }
    }
}

// 提交会员充值数据
function postMemberRecharge(model) {
    $.ajax({
        url: "/Ajaxdata/User_Siblings",
        data: JSON.stringify(model),
        type: "POST",
        contentType: "application/json",
        success: function (result) {
            if (result == -3) {
                $("#userid").val("");
                layer.msg("当前会员不支持跨店操作！");
                layer.close(index);
            } else if (result == -2) {
                layer.msg("没有权限操作！");
                layer.close(index);
            } else {
                if (result.sate) {
                    $("#sv_mrr_amountbefore,#sv_mrr_desc,#sv_mrr_present").val('');
                    layer.close(index);
                    layer.msg("充值成功！");
                    layer.closeAll('loading');
                    getMemberInfoByMemberId($('#memberNamenumber').text());
                    if ($(".swtith ").hasClass("open")) {
                        $.getJSON("/system/Getprint", function (data) {
                            if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                result.datames.sv_mrr_payment = result.datames.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                            };
                            var sv_mr_cardno = $(".sv_mr_cardno").text() || $(".sv_mr_cardno").val();
                            var sv_mr_name = $($(".sv_mr_name")[0]).text() || $(".sv_mr_name").val();
                            Cef.openMyPc(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": sv_mr_cardno, "sv_mr_name": sv_mr_name } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                        });
                    }
                }
                else {
                    layer.msg("充值操作失败，请刷新重试");
                    layer.close(index);
                }
            }

        }
    });
}

// 新版结算弹窗中的充值回调方法
function func_MemberRecharge(member_cardno, user_id, memberlevel_id) {
 
    setTimeout(function () {
        $('#member_id').val($('#huiyuan_id').attr('data-id')); // 会员Id
        $('.sv_mr_cardno').text(member_cardno);
        $('.sv_mr_name').text($('#memberNamep').text());
        $('.sv_mw_availableamount').text($('#memberbalance').text());
    }, 200);

    PreferentialTopUpGivingConfigList("Preferential", "TopUpGiving");
    GetConfigdataTopConfigBylevel(memberlevel_id);
    $(document).undelegate('#clickMoneyNum_new li', 'click').delegate('#clickMoneyNum_new li', 'click', function () {
        if ($(this).data("val") >= 0) {
            $("#sv_mrr_amountbefore").val($("#sv_mrr_amountbefore").val() + $(this).data("val"));
        }
    });


    //计算赠送 sv_mrr_amountbefore


    // 充值操作
    $(document).undelegate('#chongzhi', 'click').delegate('#chongzhi', 'click', function () {
        if ($(".layui-layer-loading") && $(".layui-layer-loading").length > 0) {
            return;
        }
        if ($("#member_id").val() != "0") {
            var sv_mrr_present = $("#sv_mrr_present");
            var sv_mrr_amountbefore = $("#sv_mrr_amountbefore");
            var sv_mrr_desc = $("#sv_mrr_desc");
            if (sv_mrr_amountbefore.val() == "") {
                layer.msg("请输入，充值金额！");
                sv_mrr_amountbefore.focus();
                return;
            }
            var val = sv_mrr_present.val() || 0;
            var cname = "充值";

            var isname = "";
            if ($(".sv_mr_name").length > 0) {

                isname = $(".sv_mr_name").text();
            } else {
                isname = $("#Cashxzhy").find("input").val();
            }
            var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
            var model = {
                "member_id": $("#member_id").val(),
                "sv_mrr_type": $(".on[data-name='type']").data("id"),
                "sv_mrr_payment": $('.CSczpayui li.active').text(),
                "sv_mrr_amountbefore": sv_mrr_amountbefore.val(),
                "sv_mrr_desc": sv_mrr_desc.val(),
                "sv_mrr_present": val,
                "user_id": $("#userid").val(),
                "sv_user_givingtype": $("#sv_user_givingtype").val(), //赠送类型*@
                "sv_detali_proportionalue": $("#sv_detali_proportionalue").val(),//配置比例值*@
                "sv_detail_value": $("#sv_detail_value").val(), //赠送*@
                "sv_recommended_peopleid": $("#sv_recommended_peopleid").val(),//推荐人
            };
            if ($('.CSczpayui li.active').data('id') == '微信' || $('.CSczpayui li.active').data('id') == '支付宝') {
                var orderTime = 0;
                var data = {
                    member_id: $("#member_id").val(),
                    sv_recharge_money: sv_mrr_amountbefore.val(),
                    sv_recharge_type: 0,
                    sv_payment_method: $('.CSczpayui li.active').data('id') == '微信' ? 0 : 1,
                    sv_give_money: val,
                    sv_remark: sv_mrr_desc.val(),
                    user_id: $("#userid").val(),
                    sv_mrr_type: 1
                };

                $.postAsyncJson('/Ajaxdata/MemberRechargeQRCode', data, function (result) {
                    if (result.succeed == true) {
                        var scanPay = "<div class=\"wxsaosao\"><br><i id=\"txtPayResultMsg\" style=\"margin-left: 100px;color: red;\"></i><br><img src=" + result.values + " width=\"200\" class=\"bbimg\">";
                        scanPay += '<input type="text" id="authcode" name="sv_mr_cardno" class="form-control" placeholder="请用扫描枪扫码客户二维码" maxlength="30" autofocus="" /></div>';
                        layer.open({
                            type: 1,
                            title: $('.CSczpayui li.active').data('id') + "支付",
                            area: ['380px', '360px'],
                            content: scanPay
                        });
                        $('#authcode').keypress(function (event) {
                            if (event.keyCode == 13) {
                                data.authcode = $('#authcode').val();
                                $.ajax({
                                    url: '/Ajaxdata/MemberBarCodePay',
                                    type: 'post',
                                    data: data,
                                    dataType: 'json',
                                    async: true,
                                    success: function (_data) {
                                        if (_data.succeed == true) {
                                            layer.msg("支付成功！");
                                            layer.closeAll('loading');
                                            getMemberInfoByMemberId($('#memberNamenumber').text());
                                            if ($(".swtith ").hasClass("open")) {
                                                $.getJSON("/system/Getprint", function (data) {
                                                    if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                                        _data.values.sv_mrr_payment = _data.values.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                                                    };
                                                    var sv_mr_cardno = $(".sv_mr_cardno").text() || $(".sv_mr_cardno").val();
                                                    var sv_mr_name = $($(".sv_mr_name")[0]).text() || $(".sv_mr_name").val();
                                                    Cef.openMyPc(JSON.stringify({ "moedel": model, "data": _data.values, "user": { "sv_mr_cardno": sv_mr_cardno, "sv_mr_name": sv_mr_name } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                                                });
                                            }
                                            setTimeout(function () {
                                                layer.closeAll();
                                            }, 650);
                                        }
                                        else {
                                            if (_data.errmsg == "需要用户输入支付密码" || _data.errmsg == "待买家支付" || _data.errmsg == "等待支付" || _data.errmsg == "正在等待用户确认...") {
                                                result.errmsg = _data.values;
                                                wxauthcode_waitfor = true;
                                                data.isWaitingPwd = true;
                                                $('#authcode').attr('disabled', 'disabled');
                                                $('#txtPayResultMsg').text('正在等待用户输入支付密码，请稍后...');
                                            }
                                            else {
                                                $("#wxauthcode").val("");
                                                layer.closeAll('loading');
                                                $('#errorMsg').html(_data.errmsg);
                                            }
                                        }
                                    }
                                });
                            }
                        });

                        $('.layui-layer-close').click(function () {
                            layer.close(index);
                            clearInterval(iCount);
                        });

                        var iCount = setInterval(function () {
                            orderTime += 3;
                            if (orderTime <= 600) {
                                if (!_g_memberWechatPayCallback) {
                                    _g_memberWechatPayCallback = true;
                                    $.getJSON("/Ajaxdata/QueryMemberRechargeOrder?orderNumber=" + result.errmsg + "&barCodePay=" + wxauthcode_waitfor, function (_data) {
                                        if (_data.sate == true) {
                                            wxauthcode_waitfor = false;
                                            getMemberInfoByMemberId($('#memberNamenumber').text());
                                            clearInterval(iCount);
                                            layer.closeAll('loading');
                                            layer.open({
                                                type: 1,
                                                area: ['300px', '200px'],
                                                shadeClose: false,
                                                content:
                                                    '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">支付成功 </p>\<\/div>',
                                                time: '1500',
                                            });
                                            cliskgetuser($("#userid").val());
                                            if ($(".swtith ").hasClass("open")) {
                                                $.getJSON("/system/Getprint",
                                                    function(data) {
                                                        if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                                            _data.datames
                                                                .sv_mrr_payment =
                                                                _data.datames.sv_mrr_payment +
                                                                "(充" +
                                                                model.sv_mrr_amountbefore +
                                                                "元送" +
                                                                model.sv_detail_value +
                                                                (model.sv_user_givingtype == 1 ? "积分" : "元)") +
                                                                ")";
                                                        };
                                                        var
                                                            sv_mr_cardno =
                                                                $(".sv_mr_cardno").text() || $(".sv_mr_cardno").val();
                                                        var
                                                            sv_mr_name =
                                                                $($(".sv_mr_name")[0]).text() || $(".sv_mr_name").val();
                                                        Cef
                                                            .openMyPc(JSON
                                                                .stringify({
                                                                    "moedel": model,
                                                                    "data": _data.datames,
                                                                    "user":
                                                                    {
                                                                        "sv_mr_cardno": sv_mr_cardno,
                                                                        "sv_mr_name": sv_mr_name
                                                                    }
                                                                }),
                                                                JSON.stringify(data),
                                                                4,
                                                                1,
                                                                '' + receptionPtNum + '',
                                                                receptionPtName);
                                                    });
                                            }
                                            $(".layui-layer").css({
                                                borderRadius: 5,
                                            });
                                            //$(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                                            setTimeout(function() {
                                                    layer.closeAll();
                                                },
                                                1000);
                                        } else {
                                            _g_memberWechatPayCallback = false;
                                        }
                                    });
                                }
                            }
                            else {
                                clearInterval(iCount);
                                console.log('您的订单已过期失效');
                                //alert("您的订单已过期失效！");
                                //                        layer.alert('您的订单已过期失效！', {
                                //                            skin: 'layui-layer-molv' //样式类名
                                //, closeBtn: 0
                                //                        }, function () {
                                //                            layer.close(layer.index);
                                //                        });
                                //location.reload();
                            }
                        }, 5000);
                        //Deke.DeKe_dialog.show_Url2("扫码支付", "/html/cash/barCodePay.html?v=250", barCodePay, ['550px', '380px']);         // 微信或支付宝扫码支付
                    }
                    else { //发起支付失败，继续操作
                        layer.msg($('.CSczpayui li.active').data('id') + "支付失败");
                        layer.closeAll('loading');
                    }
                });
            }
            else { // 现金，银行卡支付
                postMemberRecharge(model);
            }

        } else {
            $("#Cashxzhy").click();
            layer.msg("请先查找会员或识别会员卡");
        }
    });

    $(document).on('click', '.CSczpayui li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    //开关按钮事件
    $(document).on('click', '.swtith i', function () {
        $(this).parents('.swtith').toggleClass('open');
    });
}

function chuxikachuli(val) {
    if ($('#huiyuan_id').attr('data-id') == 0 || $('#huiyuan_id').attr('data-id') == '' || $('#huiyuan_id').attr('data-id') == null) {
        layer.msg("还没有选择会员");
        return false;
    }
    else {
        var ji = parseFloat($("#yuecount").attr('data-money'));

        if (parseFloat(val) > ji) {
            layer.msg("会员卡余额不足");
            return false;
        }
    }
    return true;
}

function jieshu() {
    var vl = true;
    if ($("#xianjinname").text() == "储值卡") {
        vl = chuxikachuli($("#xianjin").val());
    }
    //
    if ($("#daoshouname").text() == "储值卡") {

        vl = chuxikachuli($("#daishou").val());
    }
    if ($('#xianjin').val().trim() == null || $('#xianjin').val().trim() == '' || $('#xianjin').val().trim() == null) {
        vl = false; +
        layer.msg($('#xianjinname').text() + "不能为空！");
        $('#xianjin').focus();
        return;
    }
    if ($('#yinshou').val().trim() == null || $('#yinshou').val().trim() == '' || $('#yinshou').val().trim() == null) {
        vl = false;
        layer.msg("应收金额不能为空！");
        $('#yinshou').focus();
        return;
    }
    if (vl) {
        var falg = true;
        if ($("#xianjinname").text() == "储值卡") {
            verifyenable($('#huiyuan_id').attr('data-id'));

        } else {
            jiesuan($("#xianjinname").text());
        }

    }
}

//打开输入数量的工具
function f() {
    setTimeout(function () {
        if (clikcname == 'shulian') {
            //$('#updateNum_en').css('display', 'none');
            //$('#updateNum').css('width', '190px');
        }
    }, 100);
    $("#jishukuan").val("");
    $("#jishukuan").focus();
    $(".posia").click(function () {
        $("#jishukuan").val("");
        $("#jishukuan").focus();
    });

    $("#woquren").click(function () {
        if ($("#jishukuan").val() != "") {
            var memberprice = parseFloat($("#Cashlefsit .active").find(".memberprice").text());//会员价
            var mindiscount = parseFloat($("#Cashlefsit .active").find(".mindiscount").text());//最低折扣
            var minunitprice = parseFloat($("#Cashlefsit .active").find(".minunitprice").text());//最低价
            //数量处理
            if (clikcname == "shulian") {
                var number_serialNumber_text = parseInt($("#jishukuan").val() || 0);
                if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && number_serialNumber_text > seriaNumberArray_active_ImemCounts && seriaNumberArray_active_ImemCounts > 0) {
                    layer.msg("无串号商品库存不足，最大数量为" + seriaNumberArray_active_ImemCounts + "件");
                    return;
                }
                if ($("#Cashlefsit .active").hasClass("product_type")) {
                    var sdaa = parseInt($("#Cashlefsit .active").find(".nump").data("cnum"));
                    if ($("#jishukuan").val() > sdaa) {
                        layer.msg("会员该项目次数不够，若刚充值，请重新选择会员");
                        return;
                    }
                }
                $("#Cashlefsit .active").find(".nump").text($("#jishukuan").val());
                jiagesss = parseFloat(parseFloat($("#Cashlefsit .active").find(".jiage").text()) * parseFloat($("#jishukuan").val()) * 100) / 100;
                $("#Cashlefsit .active").find(".zhong").text(jiagesss);
                $("#Cashlefsit .active").find(".minunitprice")
                    .text(returnFloat($("#Cashlefsit .active")
                            .data("minunitprice")));
                $("#Cashlefsit .active").find(".memberprice")
                    .text(returnFloat($("#Cashlefsit .active")
                            .data("memberprice")));

            } else if (clikcname == "zhekou") {
                if (parseFloat($("#jishukuan").val()) < 11 && parseFloat($("#jishukuan").val()) > 0) {
                    if (mindiscount > 0 && mindiscount > parseFloat($("#jishukuan").val()) * 10) {
                        layer.msg("折扣不能低于商品最低折扣");
                    } else {
                        //处理折扣
                        zhekouuval = Math.round(parseFloat($("#jishukuan").val()) * 100) / 100 / 10;
                        jiagesss = Math.round(parseFloat($("#Cashlefsit .active").find(".jiage").data("rjia")) * zhekouuval * 100) / 100;
                        var sumprice = jiagesss * parseFloat($("#Cashlefsit .active").find(".nump").text())
                        if (memberprice > 0 && sumprice < memberprice) {
                            layer.msg("折扣后的金额不能低于商品会员价");
                        } else {
                            if (minunitprice > 0 && minunitprice > sumprice) {
                                layer.msg("折扣后的金额不能低于商品最低价");
                            } else {
                                $("#Cashlefsit .active").find(".jiage").text(returnFloat(jiagesss));
                                $("#Cashlefsit .active").find(".zhong").data("zhekou", zhekouuval).text(sumprice);
                                $("#Cashlefsit .active").attr("data-untprice", jiagesss);
                            }
                        }
                    }
                } else {
                    layer.msg("折扣不能大于10");
                    return;
                }
            } else if (clikcname == "gaijia") {
                //价格处理
                jiagesss = $("#jishukuan").val();
                if (memberprice > 0 && jiagesss < memberprice) {
                    layer.msg("修改后的价不能低于商品会员价");
                } else {
                    if (minunitprice > 0 && jiagesss < minunitprice) {
                        layer.msg("修改后的价不能低于商品最低价");
                    } else {
                        var updateafterdiscount = jiagesss / $("#Cashlefsit .active").find(".jiage").data("rjia");
                        if (mindiscount > 0 && updateafterdiscount < mindiscount / 100) {
                            layer.msg("修改后的价折扣不能低于不能低于商品最低折扣");
                        } else {
                            $("#Cashlefsit .active").find(".jiage").text(returnFloat($("#jishukuan").val()));
                            $("#Cashlefsit .active").find(".zhong").text(returnFloat(jiagesss * returnFloat($("#Cashlefsit .active").find(".nump").text()) * 100) / 100);
                            //改价要换算折扣
                            //以折扣为准
                            jiagesss = jiagesss / $("#Cashlefsit .active").find(".jiage").data("rjia");
                            jiagesss = Math.round(parseFloat(jiagesss) * 100) / 100;
                            $("#Cashlefsit .active").find(".zhong").data("zhekou", jiagesss);
                            $("#Cashlefsit .active").attr("data-untprice", $("#Cashlefsit .active").find(".jiage").text());
                        }
                    }
                }
            }
            layer.close(index);
            zhonger();
        } else {
            layer.msg("没有设置任何值哦");
            $("#jishukuan").focus();
        }
        inspectCommodityWhetherZeroStock();
    });

    ///
    $("#jishukuan").keydown(function (key) {

        if (key.keyCode == "13") {
            $("#woquren").click();
        } else if (key.keyCode == "27") {
            layer.closeAll();
        }

    });
}

if (!(_g_homeGetUserConfigData)) {
    shuxin();
} else
{
    shuxinCallBack(_g_homeGetUserConfigData);
}

// 获取流水号
function shuxin() {
    //读取配置    GetStoreSerialnumberset
    $.getJson("/system/GetStoreSerialnumberset", null, function(data) {
        shuxinCallBack(data);
    });
}
//页面流水号递增
function shuxin_add(nomber) {
    if (nomber) {
        if (nomber.length > 0) {
            var nomber_len = nomber.length;
            try {
                var last_number = (parseInt(nomber.substring(nomber_len - 1)) + 1);
                if (!isNaN(last_number)) {
                    var new_nomber = nomber.substring(0, nomber_len - 1) + "" + last_number;
                    $("#danhao").text(new_nomber);
                    $("#meiridanhao").text(GetDailySerialNumber(false));
                }
            } catch (e) {

            }
        }
    }
}


function shuxinCallBack(data) {
    var json = JSON.parse(data.sv_uc_serialnumberset);
    if (json && json.nomber) {
        dataconioctorn = data;
        $("#danhao").text(json.nomber);
        $("#meiridanhao").text(GetDailySerialNumber(false));
    }
}

//增加最低单价、商品数量（称重）
function zhonger() {
    GetEmployessid();
    var sumorigprice = 0.00;
    var summemberprice = 0;//会员价
    var sumorigpricemembe = 0;//计算会员价时的原售价
    var summinprice = 0;//最低价
    var sumorigpricemmin = 0;//计算最低价时的原售价
    var summindiscountprice = 0;//最低折扣价
    var sumorigpricediscoun = 0;//计算最低折扣价时的原售价
    var id = $("#huiyuan_id").attr('data-id');//会员
    var origmemberprice = 0;//原会员折后价
    var sumnocodingprice = 0;//无码金额
    var AllProductOrtherMoney = 0;//加料+口味+打包=其他总价格(不参与打折总价格)
    var descount = 1;
    if (_member_discount != null && _member_discount != undefined && _member_discount != '' && _member_discount != 0 && _member_discount != "0" && id != '0' && id > 0) {
        descount = parseFloat(_member_discount) / 100;//会员折扣
    }

    productlistJsonList = [];  // 清空拼接订单信息
    $("#Cashlefsit > li").each(function() {
        var thisProductNum = parseFloat($(this).find(".nump").text()); // 当前商品数量
        // 读取口味信息--餐饮计算金额
        var this_order_productId = $(this).attr('id');
        var productTasteList = []; // 口味信息集合
        var sv_product_tasteprice = 0; // 口味，加料，规格总价
        var productSpecTotalMoney = 0; // 本次订单商品多规格总金额 
        var productPackTotalMoney = 0; //本次订单商品打包总金额
        var productChargingTotalMoney = 0; // 本次订单商品加料总金额
        var productTasteTotalMoney = 0;  // 本次订单商品口味总金额

        var thisProductAllPackTotalMoney = 0; //本次订单商品打包总金额 * 数量
        var thisProductAllChargingTotalMoney = 0; // 本次订单商品加料总金额 * 数量
        var thisProductAllTasteTotalMoney = 0;  // 本次订单商品口味总金额 * 数量
        var thisProductAllSpecTotalMoney = 0;  // 本次订单商品规格总金额 * 数量
        var thisProductOrtherMoney = 0;//加料+口味+打包=其他总价格(单个不参与打折价格)

        var productTasteListHtmlObj = $(this).find('.catering_taste_list i');
        $(productTasteListHtmlObj).each(function (i, item) {
            var productTasteModel = {
                sv_taste_id: $(this).attr('data-id'),
                sv_taste_price: $(this).attr('data-price'),
                product_id: this_order_productId,
                sv_taste_data_type: $(this).attr('data-type'),
                sv_taste_data_name: $(this).html()
            };
            if ($(this).attr('data-type') == 0) { // 口味
                productTasteTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计口味总金额
                thisProductAllTasteTotalMoney += parseFloat($(this).attr('data-price') || 0) * thisProductNum; // 累计口味总金额
            }
            else if ($(this).attr('data-type') == 1) { // 加料
                productChargingTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计加料总金额
                thisProductAllChargingTotalMoney += parseFloat($(this).attr('data-price') || 0) * thisProductNum;// 累计加料总金额
            }
            else if ($(this).attr('data-type') == 2) { // 规格
                productSpecTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计规格总金额
                thisProductAllSpecTotalMoney += parseFloat($(this).attr('data-price') || 0) * thisProductNum; // 累计规格总金额
            }
            else if ($(this).attr('data-type') == 3) { // 打包
                productPackTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计打包总金额
                thisProductAllPackTotalMoney += parseFloat($(this).attr('data-price') || 0) * thisProductNum;
            }
            sv_product_tasteprice += parseFloat($(this).attr('data-price') || 0);
            productTasteList.push(productTasteModel);
        });
        thisProductOrtherMoney = thisProductAllSpecTotalMoney + thisProductAllPackTotalMoney + thisProductAllChargingTotalMoney + thisProductAllTasteTotalMoney;
        AllProductOrtherMoney += thisProductOrtherMoney;
        //console.log(thisProductOrtherMoney);
        // 读取口味信息--餐饮计算金额
        var memberprice = parseFloat($(this).attr('data-memberprice')); // 会员单价
        var thisProductTotalPrice = parseFloat($(this).find('.zhong').text()) - thisProductOrtherMoney;// 当前商品总价
        //最低价计算
        var minprice = parseFloat($(this).attr('data-minunitprice')) * parseFloat($(this).find(".nump").text());
        origmemberprice = parseFloat(thisProductTotalPrice) * descount; // 本次商品折扣后的总价
        //最低折扣价计算
        var mindiscount = parseFloat($(this).attr('data-mindiscount')) / 10;

        //var thisSettlementProductPrice = parseFloat($(this).attr('data-untprice')) - thisProductOrtherMoney; // 结算单价
        var thisSettlementProductPrice = parseFloat($(this).attr('data-untprice')) - (productTasteTotalMoney + productChargingTotalMoney + productSpecTotalMoney + productPackTotalMoney); // 结算单价

        var thisSettlementProductDiscount = descount;
        var thisSettlementProductTotalPrice = origmemberprice;
        //会员价计算
        var thisOriginalPriceTotal = parseFloat($(this).find(".zhong").text()) - thisProductOrtherMoney; // 当前商品总计价格
        if (isNullOrWhiteSpace(id) && id != "0" && id != 0 && memberprice > 0)
        {//会员价
            //【会员价】计算
            summemberprice += parseFloat($(this).find(".memberprice").text() * parseFloat($(this).find(".nump").text()));
            sumorigpricemembe += thisProductTotalPrice;
            thisSettlementProductTotalPrice = parseFloat($(this).find(".memberprice").text() * parseFloat($(this).find(".nump").text()));
            thisSettlementProductPrice = memberprice;// 会员单价价
        }
        else if (mindiscount > 0 && id != "0" && id != 0 && isNullOrWhiteSpace(id) && descount < mindiscount) {
            //【最低折扣价】计算 会员折扣小于最低折扣，按最低折扣计算
            sumorigpricediscoun += thisProductTotalPrice;
            summindiscountprice += mindiscount * thisOriginalPriceTotal;
            thisSettlementProductPrice = (mindiscount * thisSettlementProductPrice).toFixed(2); // 最低折扣单价
            thisSettlementProductDiscount = mindiscount; // 订单商品折扣
            thisSettlementProductTotalPrice = ((thisSettlementProductPrice) * thisProductNum).toFixed(2);
        }
        //else if (isNullOrWhiteSpace(id) && id != "0" && id != 0 && mindiscount >= 0 && descount > mindiscount) {
        else if (isNullOrWhiteSpace(id) && id != "0" && id != 0 && descount >= mindiscount && origmemberprice > minprice) {  // 会员折扣价
            sumorigpricediscoun += thisProductTotalPrice;
            summindiscountprice += descount * thisOriginalPriceTotal;
            thisSettlementProductPrice = (descount * thisSettlementProductPrice).toFixed(2); // 计算出会员折扣后的结算单价
            thisSettlementProductTotalPrice = ((descount * thisOriginalPriceTotal)).toFixed(2); // 计算出会员折扣后的结算单价
        }
        else if (minprice > 0 && isNullOrWhiteSpace(id) && id != "0" && id != 0 && origmemberprice < minprice) { //最低价计算 会员价小于最低价
            sumorigpricemmin += thisProductTotalPrice;
            summinprice += minprice;
            thisSettlementProductPrice = parseFloat($(this).attr('data-minunitprice') || 0); // 最低单价
            thisSettlementProductTotalPrice = (minprice).toFixed(2); // 最低总价
        }
        else if (minprice > 0 && isNullOrWhiteSpace(id) && id != "0" && id != 0 && origmemberprice > minprice && memberprice > minprice) { // 会员价条件
            sumorigpricemmin += thisProductTotalPrice;
            summinprice += origmemberprice;
            thisSettlementProductPrice = (memberprice).toFixed(2);  // 会员单价
            thisSettlementProductTotalPrice = (origmemberprice).toFixed(2);
        }

        //else if (Number(this.id) == 0) {
        //    sumnocodingprice += parseFloat($(this).find(".zhong").text())*descount;
        //}
        sumorigprice += thisProductTotalPrice;

        //// 读取口味信息
        //var this_order_productId = $(this).attr('id');
        //var productTasteList = []; // 口味信息集合
        //var sv_product_tasteprice = 0; // 口味，加料，规格总价
        //var productSpecTotalMoney = 0; // 本次订单商品多规格总金额 
        //var productPackTotalMoney = 0; //本次订单商品打包总金额
        //var productChargingTotalMoney = 0; // 本次订单商品加料总金额
        //var productTasteTotalMoney = 0;  // 本次订单商品口味总金额
        //var productTasteListHtmlObj = $(this).find('.catering_taste_list i');
        //$(productTasteListHtmlObj).each(function (i, item) {
        //    var productTasteModel = {
        //        sv_taste_id: $(this).attr('data-id'),
        //        sv_taste_price: $(this).attr('data-price'),
        //        product_id: this_order_productId,
        //        sv_taste_data_type: $(this).attr('data-type'),
        //        sv_taste_data_name: $(this).html()
        //    };
        //    if ($(this).attr('data-type') == 0) { // 口味
        //        productTasteTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计口味总金额
        //    }
        //    else if ($(this).attr('data-type') == 1) { // 加料
        //        productChargingTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计加料总金额
        //    }
        //    else if ($(this).attr('data-type') == 2) { // 规格
        //        productSpecTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计规格总金额
        //    }
        //    else if ($(this).attr('data-type') == 3) { // 打包
        //        productPackTotalMoney += parseFloat($(this).attr('data-price') || 0) // 累计打包总金额
        //    }
        //    sv_product_tasteprice += parseFloat($(this).attr('data-price') || 0)
        //    productTasteList.push(productTasteModel);
        //});


        var thisProductModel = {
            sv_product_type: $(this).attr('data-sv_product_type'),
            product_id: $(this).attr('id'),
            product_name: replaceStr($(this).attr('data-prname'), "''"),
            product_num: $(this).find(".nump").text(),
            product_unitprice: thisSettlementProductPrice,
            product_discount: thisSettlementProductDiscount,
            product_total: thisSettlementProductTotalPrice,
            product_pleased: $(this).find('.zhong').attr('data-sv_p_originalprice'),
            product_orig_discount: thisSettlementProductDiscount,
            product_single_untprice: $(this).find(".jiage").attr("data-rjia"),//单价
            sv_commissionemployes: StrEmployeelId,
            sv_pricing_method: $(this).attr('data-pricingmethod'),
            ProductTasteList: productTasteList, // 口味信息,
            sv_product_tasteprice: parseFloat(sv_product_tasteprice * thisProductNum),
            sv_taste_total_money: parseFloat(sv_product_tasteprice * thisProductNum),
            productSpecTotalMoney: parseFloat(productSpecTotalMoney * thisProductNum),
            productPackTotalMoney: parseFloat(productPackTotalMoney * thisProductNum),
            productChargingTotalMoney: parseFloat(productChargingTotalMoney * thisProductNum),
            productTasteTotalMoney: parseFloat(productTasteTotalMoney * thisProductNum),
            sv_printer_ip: ($(this).attr('data-printerip') || null),
            sv_printer_port: ($(this).attr('data-printerport') || null),
            sv_p_commissiontype: ($(this).attr("data-sv_p_commissiontype") || 0),
            sv_p_commissionratio: ($(this).attr("data-sv_p_commissionratio") || ""),
            sv_product_integral: ($(this).attr("data-sv_product_integral") || ""),
            cnum: ($(this).find(".nump").data("cnum") || 0),
            type: $(this).hasClass("product_type") || false ,
            spec: ($(this).attr("data-spec") || ""),   //多规格
            sv_has_iemino: ($(this).attr("data-sv_has_iemino") || false),
            sv_iemi_no: ($(this).attr("data-sv_iemi_no") || '')
        };
        productlistJsonList.push(thisProductModel);
    });
    $("#jieshuajie, .cateringProductTotalPrice").text(returnFloat(sumorigprice));
    if (summemberprice > 0) {   //会员价
        sumorigprice = (sumorigprice - sumorigpricemembe)
    } if (summinprice > 0) {
        sumorigprice = (sumorigprice - sumorigpricemmin)
    } if (summindiscountprice > 0) {
        sumorigprice = (sumorigprice - sumorigpricediscoun)
    }
    //if (sumnocodingprice > 0)
    //{ sumorigprice = (sumorigprice -sumnocodingprice) }
    sumorigprice = sumorigprice * descount + summemberprice + summinprice + summindiscountprice + AllProductOrtherMoney;
    $("#jieshuajie2,.cateringProductTotalPrice").text(returnFloat(sumorigprice));//餐饮版选择会员之后加上显示金额
    $('#xianjin').val(returnFloat(sumorigprice));
    $('#yinshou').val(returnFloat(sumorigprice));
    _g_sumorigprice = sumorigprice;
    IntegralToNow();

    //数据变化，每次都会触发
    SendSecondScreenData(false);

    if ($("#Cashlefsit > li").length > 0) {
        $('#guadaiclick').text('下单');
    }
    else {
        $('#guadaiclick').text('取单');
    }
}

SendSecondScreenDataClear(true);

//发送数据到分屏
function SendSecondScreenData(isClear) {
    try {
        if ((typeof Cef) !== "undefined") {
            //检查用户分屏设置
            if (hardware_secondscreen_enable) {
                if (isClear) { //清屏
                    var orderData = { "ProList": [], "TotalAmount": "￥0.00", "DisCount": "100%", "RealAmount": "￥0.00", "isClear": true };

                    Cef.SecondScreenOrderSend(JSON.stringify(orderData));
                } else {
                    //更新分屏

                    var orderData = { "ProList": [], "TotalAmount": "￥" + $("#jieshuajie").html(), "DisCount": _member_discount + "%", "RealAmount": "￥" + $("#jieshuajie2").html(), "isClear": false };
                    //var productData = { "ID": "1", "ProName": "无码收银2222", "ProCode": " ", "ProNum": 2, "ProPrice": "￥555.00", "Amount": "￥1110", "SpPrice": "", "ImgUrl": "", "ExtrlString": "", "IsGood": true };
                    //获取商品数据
                    $("#Cashlefsit > li").each(function () {
                        var productData = { "ID": "1", "ProName": ($(this).find(".nn1").text() || $(this).find(".cateringProductName").text()), "ProCode": $(this).find(".nn2 span.fl").text(), "ProNum": parseInt($(this).find(".nump").text()), "ProPrice": $(this).find(".jiage").text(), "Amount": $(this).find(".zhong").text(), "SpPrice": "", "ImgUrl": "", "ExtrlString": "", "IsGood": true };
                        orderData.ProList.push(productData);
                    });
                    Cef.SecondScreenOrderSend(JSON.stringify(orderData));
                }
            }
        }
    } catch (e) {

    }
}

function SendSecondScreenDataClear(isClear) {
    try {
        if ((typeof Cef) !== "undefined") {
            if (isClear) { //清屏
                var orderData = { "ProList": [], "TotalAmount": "￥0.00", "DisCount": "100%", "RealAmount": "￥0.00", "isClear": true };

                Cef.SecondScreenOrderSend(JSON.stringify(orderData));
            }

        }
    } catch (e) {

    }
}

//充值专用

function f6() {
    $("input").focus(function () {
        jiaodianname = $(this);
    });
    PreferentialTopUpGivingConfigList("Preferential", "TopUpGiving");
    var userid = $("#userid").val();
    if ($("#memberlevel_id").val() != null && $("#memberlevel_id").val() != "")
    { GetConfigdataTopConfigBylevel($("#memberlevel_id").val()); }
    $("#userid").val(userid);
    $("#Cashxzhy").click(function () {

        Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=42", f3, ['730px', ''], "shoyin2");
        $("#userid").val("");
    });

    //后其修整
    cliskgetuser(userid);
    //数字点击
    $(document).off("click", '.calui>li');
    $(document).on('click', '.calui>li', function () {
        if ($(this).data("val") >= 0) {
            if (jiaodianname) {
                jiaodianname.val(jiaodianname.val() + $(this).data("val")).change().focus();
            } else {
                $("#sv_mrr_amountbefore").val($("#sv_mrr_amountbefore").val() + $(this).data("val")).change().focus();
            }
        }
    });
    //   搜索会员
    $("#query_user").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#userid").val("");
            cliskgetuser("");
        }
    });
    $("#chongzhi").unbind("click").click(function () {
        if ($(".layui-layer-loading") && $(".layui-layer-loading").length > 0) {
            return;
        }
        if ($("#member_id").val() != "0") {
            var sv_mrr_present = $("#sv_mrr_present");
            var sv_mrr_amountbefore = $("#sv_mrr_amountbefore");
            var sv_mrr_desc = $("#sv_mrr_desc");
            if (sv_mrr_amountbefore.val() == "") {
                layer.msg("请输入，充值金额！");
                sv_mrr_amountbefore.focus();
                return;
            }
            var val = sv_mrr_present.val() || 0;
            var cname = "充值";

            var isname = "";
            if ($(".sv_mr_name").length > 0) {

                isname = $(".sv_mr_name").text();
            } else {
                isname = $("#Cashxzhy").find("input").val();
            }
            var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
            var model = {
                "member_id": $("#member_id").val(),
                "sv_mrr_type": $(".on[data-name='type']").data("id"),
                "sv_mrr_payment": $('.CSczpayui li.active').text(),
                "sv_mrr_amountbefore": sv_mrr_amountbefore.val(),
                "sv_mrr_desc": sv_mrr_desc.val(),
                "sv_mrr_present": val,
                "user_id": $("#userid").val(),
                "sv_user_givingtype": $("#sv_user_givingtype").val(), //赠送类型*@
                "sv_detali_proportionalue": $("#sv_detali_proportionalue").val(),//配置比例值*@
                "sv_detail_value": $("#sv_detail_value").val(), //赠送*@
                "sv_recommended_peopleid": $("#sv_recommended_peopleid").val(),//推荐人
            };
            if ($('.CSczpayui li.active').data('id') == '微信' || $('.CSczpayui li.active').data('id') == '支付宝') {
                var orderTime = 0;
                var data = {
                    member_id: $("#member_id").val(),
                    sv_recharge_money: sv_mrr_amountbefore.val(),
                    sv_recharge_type: 0,
                    sv_payment_method: $('.CSczpayui li.active').data('id') == '微信' ? 0 : 1,
                    sv_give_money: val,
                    sv_remark: sv_mrr_desc.val(),
                    user_id: $("#userid").val(),
                    sv_mrr_type: 1
                };

                $.postAsyncJson('/Ajaxdata/MemberRechargeQRCode', data, function (result) {
                    if (result.succeed == true) {
                        var scanPay = "<div class=\"wxsaosao\"><br><i id=\"txtPayResultMsg\" style=\"margin-left: 100px;color: red;\"></i><br><img src=" + result.values + " width=\"200\" class=\"bbimg\">";
                        scanPay += '<input type="text" id="authcode" name="sv_mr_cardno" class="form-control" placeholder="请用扫描枪扫码客户二维码" maxlength="30" autofocus="" /></div>';
                        layer.open({
                            type: 1,
                            title: $('.CSczpayui li.active').data('id') + "支付",
                            area: ['380px', '360px'],
                            content: scanPay
                        });
                        $('#authcode').keypress(function (event) {
                            if (event.keyCode == 13) {
                                data.authcode = $('#authcode').val();
                                $.ajax({
                                    url: '/Ajaxdata/MemberBarCodePay',
                                    type: 'post',
                                    data: data,
                                    dataType: 'json',
                                    async: true,
                                    success: function (_data) {
                                        if (_data.succeed == true) {
                                            layer.msg("支付成功！");
                                            cliskgetuser($("#userid").val());
                                            if ($(".swtith ").hasClass("open")) {
                                                $.getJSON("/system/Getprint", function (data) {
                                                    if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                                        _data.values.sv_mrr_payment = _data.values.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                                                    };
                                                    var sv_mr_cardno = $(".sv_mr_cardno").text() || $(".sv_mr_cardno").val();
                                                    var sv_mr_name = $($(".sv_mr_name")[0]).text() || $(".sv_mr_name").val();
                                                    Cef.openMyPc(JSON.stringify({ "moedel": model, "data": _data.values, "user": { "sv_mr_cardno": sv_mr_cardno, "sv_mr_name": sv_mr_name } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                                                });
                                            }
                                            setTimeout(function () {
                                                layer.closeAll();
                                            }, 650);
                                        }
                                        else {
                                            if (_data.errmsg == "需要用户输入支付密码" || _data.errmsg == "待买家支付" || _data.errmsg == "等待支付" || _data.errmsg == "正在等待用户确认...") {
                                                result.errmsg = _data.values;
                                                wxauthcode_waitfor = true;
                                                data.isWaitingPwd = true;
                                                $('#authcode').attr('disabled', 'disabled');
                                                $('#txtPayResultMsg').text('正在等待用户输入支付密码，请稍后...');
                                            }
                                            else {
                                                $("#wxauthcode").val("");
                                                layer.closeAll('loading');
                                                $('#errorMsg').html(_data.errmsg);
                                            }
                                        }
                                    }
                                });
                            }
                        });

                        $('.layui-layer-close').click(function () {
                            layer.close(index);
                            clearInterval(iCount);
                        });

                        var iCount = setInterval(function () {
                            orderTime += 3;
                            if (orderTime <= 600) {
                                if (!_g_memberWechatPayCallback) {
                                    _g_memberWechatPayCallback = true;
                                    $.getJSON("/Ajaxdata/QueryMemberRechargeOrder?orderNumber=" + result.errmsg + "&barCodePay=" + wxauthcode_waitfor, function (_data) {

                                        if (_data.sate == true) {
                                            clearInterval(iCount);
                                            layer.open({
                                                type: 1,
                                                area: ['300px', '200px'],
                                                shadeClose: false,
                                                content:
                                                    '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">支付成功 </p>\<\/div>',
                                                time: '1500',
                                            });
                                            cliskgetuser($("#userid").val());
                                            if ($(".swtith ").hasClass("open")) {
                                                $.getJSON("/system/Getprint",
                                                    function(data) {
                                                        if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                                            _data.datames
                                                                .sv_mrr_payment =
                                                                _data.datames.sv_mrr_payment +
                                                                "(充" +
                                                                model.sv_mrr_amountbefore +
                                                                "元送" +
                                                                model.sv_detail_value +
                                                                (model.sv_user_givingtype == 1 ? "积分" : "元)") +
                                                                ")";
                                                        };
                                                        var
                                                            sv_mr_cardno =
                                                                $(".sv_mr_cardno").text() || $(".sv_mr_cardno").val();
                                                        var
                                                            sv_mr_name =
                                                                $($(".sv_mr_name")[0]).text() || $(".sv_mr_name").val();
                                                        Cef
                                                            .openMyPc(JSON
                                                                .stringify({
                                                                    "moedel": model,
                                                                    "data": _data.datames,
                                                                    "user":
                                                                    {
                                                                        "sv_mr_cardno": sv_mr_cardno,
                                                                        "sv_mr_name": sv_mr_name
                                                                    }
                                                                }),
                                                                JSON.stringify(data),
                                                                4,
                                                                1,
                                                                '' + receptionPtNum + '',
                                                                receptionPtName);
                                                    });
                                            }
                                            $(".layui-layer").css({
                                                borderRadius: 5,
                                            });
                                            //$(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                                            setTimeout(function() {
                                                    layer.closeAll();
                                                },
                                                1000);
                                        } else {
                                            _g_memberWechatPayCallback = false;
                                        }
                                    });
                                }
                            }
                            else {
                                clearInterval(iCount);
                                //alert("您的订单已过期失效！");
                                //layer.alert('您的订单已过期失效！', {
                                //    skin: 'layui-layer-molv' //样式类名
                                //    , closeBtn: 0
                                //}, function () {
                                //    layer.close(layer.index);
                                //});
                                //location.reload();
                            }
                        }, 5000);
                        //Deke.DeKe_dialog.show_Url2("扫码支付", "/html/cash/barCodePay.html?v=250", barCodePay, ['550px', '380px']);         // 微信或支付宝扫码支付
                    } else {
                        // 失败
                        $.ajax({
                            url: "/Ajaxdata/User_Siblings",
                            data: JSON.stringify(model),
                            type: "POST",
                            contentType: "application/json",
                            success: function (result) {
                                if (result == -3) {
                                    $("#userid").val("");
                                    layer.close(index);
                                    layer.msg("当前会员不支持跨店操作！");
                                } else if (result == -2) {
                                    layer.close(index);
                                    layer.msg("没有权限操作！");
                                } else {
                                    if (result.sate) {
                                        //GetList(1);
                                        $("#sv_mrr_amountbefore,#sv_mrr_desc,#sv_mrr_present").val('');
                                        // cliskgetuser();
                                        layer.close(index);
                                        //GetUserdata = null;
                                        layer.msg("充值成功！");
                                        cliskgetuser($("#userid").val());
                                        if ($(".swtith ").hasClass("open")) {
                                            $.getJSON("/system/Getprint", function (data) {
                                                if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                                    result.datames.sv_mrr_payment = result.datames.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                                                };
                                                var sv_mr_cardno = $(".sv_mr_cardno").text() || $(".sv_mr_cardno").val();
                                                var sv_mr_name = $($(".sv_mr_name")[0]).text() || $(".sv_mr_name").val();
                                                Cef.openMyPc(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": sv_mr_cardno, "sv_mr_name": sv_mr_name } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                                            });
                                        }
                                    }
                                    else {
                                        layer.msg("充值操作失败，请刷新重试");
                                        layer.close(index);
                                    }
                                }

                            }
                        });
                    }
                });
            }
            else {
                //  alert(JSON.stringify(model));
                $.ajax({
                    url: "/Ajaxdata/User_Siblings",
                    data: JSON.stringify(model),
                    type: "POST",
                    contentType: "application/json",
                    success: function (result) {
                        if (result == -3) {
                            $("#userid").val("");
                            layer.msg("当前会员不支持跨店操作！");
                            layer.close(index);
                        } else if (result == -2) {
                            layer.msg("没有权限操作！");
                            layer.close(index);
                        } else {
                            if (result.sate) {
                                //GetList(1);
                                $("#sv_mrr_amountbefore,#sv_mrr_desc,#sv_mrr_present").val('');
                                // cliskgetuser();
                                layer.close(index);
                                //GetUserdata = null;
                                layer.msg("充值成功！");
                                cliskgetuser($("#userid").val());
                                if ($(".swtith ").hasClass("open")) {
                                    $.getJSON("/system/Getprint", function (data) {
                                        if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                            result.datames.sv_mrr_payment = result.datames.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                                        };
                                        var sv_mr_cardno = $(".sv_mr_cardno").text() || $(".sv_mr_cardno").val();
                                        var sv_mr_name = $($(".sv_mr_name")[0]).text() || $(".sv_mr_name").val();
                                        if (((typeof Cef) !== 'undefined')) {
                                            Cef.openMyPc(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": sv_mr_cardno, "sv_mr_name": sv_mr_name } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                                        }
                                    });
                                }
                            }
                            else {
                                layer.msg("充值操作失败，请刷新重试");
                                layer.close(index);
                            }
                        }

                    }
                });
            }

        } else {
            $("#Cashxzhy").click();
            layer.msg("请先查找会员或识别会员卡");
        }
    });
    $('.CSczpayui li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    //开关按钮事件
    $('.swtith i').click(function () {
        $(this).parents('.swtith').toggleClass('open');
    });
}

// 整单打包
$("input[name=cateringSettlementType]").change(function () {
    var thisType = $(this).attr('data-type');
    var orderListHtmlObj = $('#Cashlefsit>li');
    if (orderListHtmlObj && orderListHtmlObj.length > 0) {
        $.each(orderListHtmlObj, function (item) {
            var thisProductNum = parseFloat($(this).find(".nump").text() || 0);
            var thisPrice = parseFloat($(this).find(".jiage").text() || 0);
            var packPrice = parseFloat($(this).attr('data-packprice') || 0);
            var oldProductTotalMoney = parseFloat($(this).find('.jiage').text() || 0);
            var thisProductTotalMoney = parseFloat((thisPrice + packPrice) * thisProductNum);
            var thisPackPriceTotal = parseFloat(packPrice * thisProductNum);
            var cancelProductTotalMoney = parseFloat(oldProductTotalMoney - (thisPackPriceTotal));
            var catering_taste_listHtmlObj = $(this).find('.catering_taste_list');
            if (catering_taste_listHtmlObj) {
                var packHtmlObj = catering_taste_listHtmlObj.find('.productblae');
                if (packHtmlObj && packHtmlObj.length == 1) { // 存在打包，则不再计算
                    if (thisType != 2) {
                        catering_taste_listHtmlObj.find('.productblae').remove();
                        $(this).find('.zhong').text(cancelProductTotalMoney);
                        $(this).find('.jiage').text(thisPrice - thisPackPriceTotal);
                    }
                }
                else {
                    var catering_taste_listHtml = '<i class="productblae" data-id="0" data-price="' + packPrice + '" data-type="3">打包(' + packPrice + ')</i>';
                    if (thisType == 2) {
                        $(this).find('.catering_taste_list').append(catering_taste_listHtml);
                        $(this).find('.zhong').text(thisProductTotalMoney);
                        $(this).find('.jiage').text(thisPrice + packPrice);
                    }
                }
            }
            else {
                var catering_taste_listHtml = '<i class="productblae" data-id="0" data-price="' + packPrice + '" data-type="3">打包(' + packPrice + ')</i>';
                if (thisType == 2) {
                    $(this).find('.catering_taste_list').html(catering_taste_listHtml);
                    $(this).find('.zhong').text(thisProductTotalMoney);
                    $(this).find('.jiage').text(thisPrice + packPrice);
                }
            }
        });
        zhonger();
    }
    else {
        layer.msg('请选择菜品！');
        $("input[name='cateringSettlementType']:eq(0)").click();
    }
});

function f9() {
    $("#query_user").focus();
    $("#Cashxzhy").click(function () {
        if (!g_DisableManualInput) {
            Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=20166", f3, ['730px', ''], "shoyin2");
            $("#userid").val("");
        } else {
            layer.msg('已禁用！');
        }
    });
    var _query_user_last_search = "";
    $("#query_user").keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#query_user").val()) {
                if (_query_user_last_search != $("#query_user").val()) {
                    //重新检索会员卡
                    $("#userid").val("");
                    cliskgetuser();
                } else {
                    //选取会员卡
                    $(".layui-layer-btn0").trigger("click");
                }
                _query_user_last_search = $("#query_user").val();
            }
        } else if (e.keyCode == 113) //F2
        {
            var c_ = typeof Cef;
            if (c_ !== "undefined") {
                GetICCardEventData($("#query_user"), e);
                if ($("#query_user").val()) {
                    if (_query_user_last_search != $("#query_user").val()) {
                        //重新检索会员卡
                        $("#userid").val("");
                        cliskgetuser();
                    } else {
                        //选取会员卡
                        $(".layui-layer-btn0").trigger("click");
                    }
                    _query_user_last_search = $("#query_user").val();
                }
            }
        }
    });

    $("#query_user").change(function (e) {
        if ($("#query_user").val().length > 0) {
            $("#userid").val("");
            cliskgetuser("");
        }
    });

    $("#huiyuan_click > li").click(function () {
        $("#query_user").data("id", "");

        if ($(this).hasClass("cdbule")) {

            var str = $("#query_user").val();
            $("#query_user").val(str.substring(0, str.length - 1));

        } else if ($(this).text() == "OK") {

            $("#query_user").change();
        } else {
            $("#query_user").val($("#query_user").val() + $(this).text());
        }
        $("#query_user").focus();
    });

}

// 点击挂单
$(document).unbind("click", "#catering_order_list li").on("click", "#catering_order_list li", function () {
    $("#catering_order_list li").removeClass('active').removeClass('joove');
    $(this).addClass('active');
});

// 根据挂单主键id读取挂单信息
function getGuanList(withlistid, isprint) {
    // -------------------------------拼接餐饮打印数据---------------------------------- //
    var catering_order_product_json = [];
    _g_catering_order_list_print_Json = {
        prlist: [],
        order_running_id: $("#catering_order_list li.active").data("id"),
        sv_catering_grade: $("#catering_order_list li.active").attr('data-grade'),
        sv_person_num: $("#catering_order_list li.active").attr('data-personnum'),
        sv_without_list_id: $("#catering_order_list li.active").attr('data-withlistid')
    };

    // -------------------------------拼接餐饮打印数据---------------------------------- //
    $.getJSON("/settle/GetGuanList?order_id=" + withlistid, function (data) {
        htmlaa = "";
        if (data) {
            var withorder_prnum = 0;
            var withorder_totalmoney = 0;
            for (var i = 0; i < data.length; i++) {
                var number = 0;
                var prnumber = 0;
                if (data[i].sv_pricing_method == 1) {
                    number = data[i].sv_p_weight;
                    prnumber = data[i].sv_p_total_weight;
                }
                else {
                    number = data[i].product_num;
                    prnumber = data[i].sv_p_storage;
                }
                withorder_prnum = withorder_prnum  + number;
                withorder_totalmoney =withorder_totalmoney +data[i].product_total;

                if (_g_sv_uit_cache_name == 'cache_name_catering') { // 餐饮版
                    var catering_productTasteList_print = []; // 口味信息集合打印用
                    var cateringTasteOderListHtml = '<td style="display:none;" class="cateringTasteOderListHtml">';
                    var orderProductRemarksHtml = '';
                    if (data[i].productTasteJson != null && data[i].productTasteJson.length > 0) {
                        var productTasteList = eval(data[i].productTasteJson);
                        for (var j = 0; j < productTasteList.length; j++) { // 口味
                            // ------------------------处理打印数据-----------//
                            var productTasteModel = {
                                sv_taste_price: productTasteList[j].sv_taste_price,
                                sv_taste_data_type: 0,
                                sv_taste_data_name: productTasteList[j].sv_taste_name + '(' + productTasteList[j].sv_taste_price + ')'
                            };
                            catering_productTasteList_print.push(productTasteModel);
                            // ------------------------处理打印数据--------------------//
                            cateringTasteOderListHtml += '<i data-id="' + productTasteList[j].sv_taste_id + '" data-price="' + productTasteList[j].sv_taste_price + '" data-type="0" class="productTaste">' + productTasteList[j].sv_taste_name + '(' + productTasteList[j].sv_taste_price + ')</i>';
                        }
                    }
                    if (data[i].cateringChargingJson && data[i].cateringChargingJson.length > 0) {  // 加料
                        var cateringChargingJson = eval(data[i].cateringChargingJson);
                        for (var j = 0; j < cateringChargingJson.length; j++) {
                            // ------------------------处理打印数据-----------//
                            var productTasteModel = {
                                sv_taste_price: cateringChargingJson[j].sv_taste_price,
                                sv_taste_data_type: 1,
                                sv_taste_data_name: cateringChargingJson[j].sv_charging_name + '(' + cateringChargingJson[j].sv_taste_price + ')'
                            };
                            catering_productTasteList_print.push(productTasteModel);
                            // ------------------------处理打印数据--------------------//

                            var data_type = cateringChargingJson[j].sv_charging_type == 0 ? 1 : 2;
                            var chargingCass = cateringChargingJson[j].sv_charging_type == 0 ? 'addFoods' : 'addFoodSpec';
                            cateringTasteOderListHtml += '<i data-id="' + cateringChargingJson[j].sv_taste_id + '" data-price="' + cateringChargingJson[j].sv_taste_price + '" data-type="' + data_type + '" class="addFoodSpec">' + cateringChargingJson[j].sv_charging_name + '(' + cateringChargingJson[j].sv_taste_price + ')</i>';
                        }
                    }
                    if (data[i].sv_is_packing) { // 读取打包价格 
                        // ------------------------处理打印数据-----------//
                        var productTasteModel = {
                            sv_taste_price: data[i].sv_packing_charges,
                            sv_taste_data_type: 2,
                            sv_taste_data_name: '打包' + '(' + data[i].sv_packing_charges + ')'
                        };
                        catering_productTasteList_print.push(productTasteModel);
                        // ------------------------处理打印数据--------------------//

                        cateringTasteOderListHtml += '<i data-id="0" data-price="' + data[i].sv_packing_charges + '" data-type="3" class="productblae">打包(' + data[i].sv_packing_charges + ')</i>';
                    }
                    cateringTasteOderListHtml += '</td>';

                    htmlaa += '<tr data-mindiscount="' + data[i].sv_p_mindiscount + '" data-minunitprice="' + data[i].sv_p_minunitprice + '" ';
                    htmlaa += 'data-untprice ="' + data[i].product_unitprice + '" data-originalprice="' + data[i].sv_p_originalprice + '" data-memberprice="' + data[i].sv_p_memberprice + '" data-id="' + data[i].product_id + '" data-url ="' + loadProductImgUrl(data[i]) + '"';
                    htmlaa += 'data-num="' + number + '" data-prnumber="' + prnumber + '" data-productotal="' + data[i].product_total + '" data-pricingmethod="' + data[i].sv_pricing_method + '" ';
                    htmlaa += 'data-categoryId="' + data[i].productcategory_id + '" data-name ="' + data[i].product_name + '" data-packprice="' + data[i].sv_packing_unitprice + '" ';
                    htmlaa += 'data-printerip="' + data[i].sv_printer_ip + '" data-printerport="' + data[i].sv_printer_port + '">';
                    htmlaa += cateringTasteOderListHtml;
                    htmlaa += '<td style="width: 160px;">' + data[i].product_name + '</td><td>' + number + '</td><td>' + data[i].product_unitprice + '</td><td>' + data[i].product_total + '</td>';
                    htmlaa += '<td class="cutfoods" style="width: 95px;"><button data-type="0" data-id="' + data[i].sv_without_product_id + '" ';
                    htmlaa += ' class="cutfoodsbtn btn"><i class="icon-minus-sign"></i></button><span>' + number + '</span><button data-type="1" data-id="' + data[i].sv_without_product_id + '" class="addfoodsbtn btn"><i class="icon-plus-sign">';
                    htmlaa += '</i></button></td> <td class="printbox"><a href="javascript:void(0);" class="print" data-id="' + data[i].sv_without_product_id + '">补打</a></td>';
                    htmlaa += '</tr>';
                    var thisProductModel = {
                        product_name: data[i].product_name,
                        product_num: number,
                        product_unitprice: data[i].product_unitprice,
                        product_discount: data[i].product_discount,
                        product_total: data[i].product_total,
                        ProductTasteList: catering_productTasteList_print, // 口味信息,
                        sv_printer_ip: data[i].sv_printer_ip,
                        sv_printer_port: data[i].sv_printer_port,
                        sv_without_product_id: data[i].sv_without_product_id
                    };
                    catering_order_product_json.push(thisProductModel);
                }
                else {
                    var temp_sv_product_integral = "";
                    if (data[i].sv_product_integral === null) {
                        temp_sv_product_integral = "";
                    } else if (data[i].sv_product_integral >= 0) {
                        temp_sv_product_integral = data[i].sv_product_integral;
                    }
                    else {
                        temp_sv_product_integral = "";
                    }
                    htmlaa += '<tr data-mindiscount="' + data[i].sv_p_mindiscount + '" data-minunitprice="' + data[i].sv_p_minunitprice + '" ';
                    htmlaa += 'data-untprice ="' + data[i].product_unitprice + '" data-num="' + number + '" data-prnumber="' + prnumber + '" data-name ="' + data[i].product_name + '" data-memberprice="' + data[i].sv_p_memberprice + '" data-id="' + data[i].product_id + '" data-url ="' + loadProductImgUrl(data[i]) + '"';
                    htmlaa += 'data-pricingmethod="' + data[i].sv_pricing_method + '" data-unitprice ="' + data[i].product_unitprice + '" data-categoryId="' + data[i].productcategory_id + '" data-sv_p_commissiontype="' + (data[i].sv_p_commissiontype || 0)
                        + '" data-sv_product_integral="' + (temp_sv_product_integral || "") + '" data-sv_p_commissionratio="' + (data[i].sv_p_commissionratio || "") + '"><td>' + (i + 1) + '</td><td>' + data[i].product_nober + '</td> ';
                    htmlaa += '<td>' + data[i].product_name + '</td> <td>' + number + '</td> <td>' + data[i].product_unitprice + '</td><td>' + data[i].product_total + '</td></tr>';
                }
            }

            _g_catering_order_list_print_Json.prlist = catering_order_product_json;
            //显示订单备注
            _g_withlist_remark = $("#catering_order_list li.active .withorder_listremarks").text();
            if (_g_withlist_remark && _g_withlist_remark!="null")
            {
                $("#withlist_singleOrderRemark").text(_g_withlist_remark);
                $("#withlist_singleOrderRemark_div").show();
            } else
            {
                $("#withlist_singleOrderRemark").text("");
                $("#withlist_singleOrderRemark_div").hide();
            }
            $("#withlist_singleOrderNumber").text(withorder_prnum);
            $("#withlist_singleOrderMoney").text(withorder_totalmoney);


            if (isprint && isprint == true) { // 是否打印
                $.getJSON("/system/Getprint", function (data) {
                    if (data) {
                        pushcateringprintData(JSON.stringify(_g_catering_order_list_print_Json), JSON.stringify(data), 2);
                        pushcateringprintData(JSON.stringify(_g_catering_order_list_print_Json), JSON.stringify(data), 1);
                        layer.msg('已向厨房发送菜品打印', { time: 1500 });
                    }
                });
            }
        }
        $("#guanprlist, #catering_order_product").html(htmlaa);
    });
}

//共用的挂单系统的函数
function orderSharedFn(active_id) {
    _g_catering_order_list_print_Json = {}; // 初始化打印数据
    if (_g_sv_uit_cache_name == 'cache_name_catering') { // 餐饮
        $('#btnCateringOrderTotals').show();
        $('#btnCateringOrderPrint').show();
        $('#btnCancelMobileOrder').show();
        $('#btnAcceptMobileOrder').show();
        //$('#btnChangeCateringGrade').show();
        $('#general_order_list_container').hide();
        $('#catering_order_list_container').show();
    }
    else {
        $('#general_order_list_container').show();
        $('#catering_order_list_container').hide();
    }
    // 读取挂单列表
    $.getJSON("/settle/Getguandan", { pageIndex: 1, pageSize: 100 }, function (data) {
        var htmlaa = "";
        for (var i = 0; i < data.length; i++) {
            var member_id = "";
            var remark = "";
            if (data[i].member_id != null && data[i].member_id != undefined && data[i].member_id != '') {
                member_id = data[i].member_id;
            }
            if (data[i].sv_remark != null && data[i].sv_remark != undefined && data[i].sv_remark != '') {
                remark = data[i].sv_remark;
            }
            if (_g_sv_uit_cache_name == 'cache_name_catering') { // 餐饮版   
                var active_class = "";
                if (active_id && active_id == data[i].sv_without_list_id) {
                    active_class = "class=\"active\"";
                }
                htmlaa += '<li data-id="' + data[i].wt_nober + '" data-personNum ="' + data[i].sv_person_num + '" ';
                htmlaa += 'data-withListId="' + data[i].sv_without_list_id + '" data-memberId = "' + member_id + '" ';
                htmlaa += 'data-tableid="' + data[i].sv_table_id + '" data-grade="' + (data[i].sv_catering_grade || '') + '" ';
                htmlaa += 'data-ordersource="' + data[i].sv_order_source + '" data-isaccept ="' + data[i].sv_mobile_order_is_accept + '" ' + active_class + '>';
                htmlaa += '<div class="cateringPendingOrderlistNumber"><span>' + (data[i].sv_catering_grade || '') + '</span></div>';
                htmlaa += '<div class="cateringPendingOrderlistinformation">';
                htmlaa += '<div class="cateringPendingOrderNumber"><span>' + data[i].wt_nober + '</span>';
                htmlaa += '<span class="withorder_listremarks" style="display:none;">' + data[i].sv_remark + '</span>';
                if (data[i].sv_order_print_status == 2) { // 订单已打印
                    htmlaa += '<span class="sharestyle hasbeenprinted">已打印</span>';
                }
                else if (data[i].sv_order_source == 1 && data[i].sv_payment_type == 0) {
                    if (data[i].sv_mobile_order_is_accept == 0) {
                        htmlaa += '<span class="sharestyle toorder">待接单</span>';
                    }
                    else if (data[i].sv_mobile_order_is_accept == 1) {
                        htmlaa += '<span class="sharestyle orderstatus">已接单</span>';
                    }
                }
                htmlaa += '</div>';
                htmlaa += '<div class="cateringPendingOrderTime"><span class="fl">' + new Date(data[i].wt_datetime).Format("MM-dd hh:mm:ss") + '</span>';
                htmlaa += '<span class="fr"><i class="orderPeopleNumber">' + data[i].sv_person_num + '人</i>';
                if (data[i].sv_order_source == 0) { // 来自PC端
                    htmlaa += '<i class="icon-laptop orderTypr"></i>';
                }
                else {
                    htmlaa += '<i class="icon-mobile-phone orderTypr"></i>';
                }
                htmlaa += ' </span></div></div></li>';
            }
            else {
                //htmlaa += '<tr data-id="' + data[i].wt_nober + '" data-memberId = "' + member_id + '"><td>' + (i + 1) + '</td><td>' + data[i].wt_nober + '</td> </tr> ';
                htmlaa += '<li data-tableid="0" data-grade="0" data-id="' + data[i].wt_nober + '" data-memberId = "' + member_id + '" data-personnum="0" data-withlistid="' + data[i].sv_without_list_id + '" data-tableid="0" data-grade="">';
                htmlaa += '<div class="nalefisfristbox"><span>单号:</span><span>' + data[i].wt_nober + '</span><span>' + new Date(data[i].wt_datetime).Format("hh:mm:ss") + '</span>';
                htmlaa += '</div><div class="nalefisfristbox"><span>备注:</span><span class="listremarks">' + remark + '</span></div><input type="radio" id="" name="productName" class="member-check"></li>';
                htmlaa += '';
            }
        }

        $("#guandanlist, #catering_order_list").html(htmlaa);

        if (active_id && active_id > 0 && _g_sv_uit_cache_name == 'cache_name_catering') {
            $('#btnAcceptMobileOrder').attr('disabled', 'disabled');
            $('#btnCancelMobileOrder').attr('disabled', 'disabled');
            $('#Takeasingle').removeAttr('disabled');
            $('#btnCateringOrderTotals').removeAttr('disabled');
            $('#btnCateringOrderPrint').removeAttr('disabled');
            getGuanList(active_id, true);
        }

        // 点击挂单列表读取挂单详情
        $("#guandanlist li, #catering_order_list li").click(function () {
            $(this).toggleClass("joove").siblings().removeClass("joove");
            $(this).toggleClass("active").siblings().removeClass("active");
            var withlistid = $(this).attr("data-withlistid");
            if (withlistid > 0) {
                // 禁用相关按钮
                var ordersource = $(this).attr('data-ordersource'); // 订单来源
                var sv_mobile_order_is_accept = $(this).attr('data-isaccept'); // 订单待接单
                if (ordersource == 0) {
                    $('#btnAcceptMobileOrder').attr('disabled', 'disabled');
                    $('#btnCancelMobileOrder').attr('disabled', 'disabled');
                    $('#Takeasingle').removeAttr('disabled');
                    $('#btnCateringOrderTotals').removeAttr('disabled');
                    $('#btnCateringOrderPrint').removeAttr('disabled');
                }
                else if (ordersource == 1 && sv_mobile_order_is_accept == 0) {
                    $('#btnAcceptMobileOrder').removeAttr('disabled');
                    $('#btnCancelMobileOrder').removeAttr('disabled');
                    $('#Takeasingle').attr('disabled', 'disabled');
                    $('#btnCateringOrderTotals').attr('disabled', 'disabled');
                    $('#btnCateringOrderPrint').attr('disabled', 'disabled');
                }
                else if (ordersource == 1 && sv_mobile_order_is_accept == 1) {
                    $('#btnAcceptMobileOrder').attr('disabled', 'disabled');
                    $('#btnCancelMobileOrder').attr('disabled', 'disabled');
                    $('#Takeasingle').removeAttr('disabled');
                    $('#btnCateringOrderTotals').removeAttr('disabled');
                    $('#btnCateringOrderPrint').removeAttr('disabled');
                }
                else {
                    $('#btnAcceptMobileOrder').attr('disabled', 'disabled');
                    $('#btnCancelMobileOrder').attr('disabled', 'disabled');
                    $('#Takeasingle').removeAttr('disabled');
                    $('#btnCateringOrderTotals').removeAttr('disabled');
                    $('#btnCateringOrderPrint').removeAttr('disabled');
                }
                getGuanList(withlistid);
            }
        });
    });

    // 删除挂单信息
    $("#btnDeleteWithLists").click(function () {
        if ($("#guandanlist li.joove, #catering_order_list li.active").length == 1) {
            var deleteWithListId = $("#guandanlist li.joove, #catering_order_list li.active").attr("data-withlistid");
            if (deleteWithListId > 0) {
                //确认拼桌的弹窗
                var confirmAddFoodshtml = '<div>确定删除挂单信息？</div><div class="modal-footer product-modal-footer selectBtn" style="bottom: 0;padding: 0;height: 34px;border:none;margin-left: -20px;"><button type="button" class="text-center btn fl closeallpage">取消</button><button type="button" class="text-center btn fl selectSuccess" id="btnConfirmDeleteWithList">确定</button></div>'
                index = layer.open({
                    title: ' ',
                    content: confirmAddFoodshtml,
                    btn: false,
                    area: ['300px', '180px']
                });
            }
            else {
                layer.msg("还没有选中要删除的订单");
            }
        }
        else {
            layer.msg("还没有选中要删除的订单");
        }
    });

    // 取消
    $('#btnOrderCancel').click(function () {
        layer.closeAll();
    });
}

// 一键取单
$(document).unbind("click", "#Takeasingle").on("click", "#Takeasingle", function () {
    if ($("#guandanlist li.joove, #catering_order_list li.active").length == 1) {
        var member_id = $('#guandanlist tr.joove, #catering_order_list tr.joove').attr('data-memberid');
        $.post("/settle/TakeASingle?wtNober=" + $("#guandanlist li.joove, #catering_order_list li.active").data("id"), function (data) {
            if (data)
            {
                var thisSelectLiActiveObj = $("#guandanlist li.joove, #catering_order_list li.active");
                setCateringGradeInfo(thisSelectLiActiveObj.attr('data-grade'), thisSelectLiActiveObj.attr('data-tableid'), thisSelectLiActiveObj.attr('data-withListId'), thisSelectLiActiveObj.attr('data-personnum'), false, false);
                $("#Cashlefsit").html("");

                if (_g_sv_uit_cache_name == 'cache_name_catering') { // #catering_order_product tr  餐饮版取单操作
                    var settlementColumnHtml = '';
                    $("#catering_order_product tr").each(function (i) {
                        var orderProductRemarksHtml = ''; // 读取备注信息
                        if ($(this).find('.product_remarks').text()) {
                            orderProductRemarksHtml = '<p class="foodsRemarks"><span style="padding-right:5px;">备注:</span><span class="orderProductRemarks">' + $(this).find('.product_remarks').text() + '</span></p>';
                        }
                        var str = '';
                        var sv_pricing_method = parseInt($(this).data("pricingmethod")); // 商品是计件还是计重（0 -- 计件，1--计重）
                        var minunitprice = returnFloat($(this).data("minunitprice")) == 0 ? "" : returnFloat($(this).data("minunitprice"));
                        var mindiscount = returnFloat($(this).data("mindiscount")) == 0 ? "" : returnFloat($(this).data("mindiscount"));
                        var memberprice = returnFloat($(this).data("memberprice")) == 0 ? "" : returnFloat($(this).data("memberprice"));
                        var number = $(this).find("td").eq(3).text() || 1;
                        var prnumber = parseInt($(this).data("prnumber") || 0);
                        if (memberprice > 0)
                        {
                            str = '<p class="nn4" style="color:red"><span class="fl">会员单价¥ <text class="memberprice">' + returnFloat(memberprice) + '</text></span></p>';
                        } else if (mindiscount > 0)
                        {
                            str = '<p class="nn4" style="color:red"><span class="fl">最低折扣 <text class="mindiscount">' + mindiscount * 10 + '</text>%</span></p>';
                        } else if (minunitprice > 0)
                        {
                            str = '<p class="nn4" style="color:red"><span class="fl">最低单价¥ <text class="minunitprice">' + returnFloat(minunitprice) + '</text></span></p>';
                        }


                        settlementColumnHtml += '<li data_order_product_status="' + data_order_product_status.Pendding + '" data-mindiscount="' + $(this).data("mindiscount") + '" data-minunitprice="' + $(this).data("minunitprice") + '" ';
                        settlementColumnHtml += 'data-memberprice="' + $(this).attr("data-memberprice") + '" id="' + $(this).attr("data-id") + '" data-pricingmethod="' + $(this).attr("data-pricingmethod") + '" ';
                        settlementColumnHtml += 'data-prname ="' + $(this).attr("data-name") + '" data-untprice="' + $(this).attr('data-untprice') + '" ';
                        settlementColumnHtml += 'data-categoryId="' + $(this).attr("data-categoryId") + '" data-url ="' + $(this).attr("data-url") + '" data-packprice="' + $(this).attr('data-packprice') + '" ';
                        settlementColumnHtml += 'data-printerip="' + $(this).attr("data-printerip") + '" data-printerport="' + $(this).attr("data-printerport") + '" >';
                        settlementColumnHtml += '<div class="cateringProductNamebox"><p class="cateringProductName">' + $(this).attr('data-name') + '</p></div>';
                        settlementColumnHtml += '<div class="cateringProductNumberbox">';
                        settlementColumnHtml += '<button class="btn catering_minus"><i class="icon-minus-sign"></i></button><span class="cateringProductNumber nump">' + $(this).attr('data-num') + '</span>';
                        settlementColumnHtml += '<button class="btn catering_plus"><i class="icon-plus-sign"></i></button></div>';
                        settlementColumnHtml += '<div class="cateringProductpricebox"><span class="cateringProductprice"><i>¥</i><i class="zhong" data-sv_p_originalprice="' + $(this).attr('data-originalprice') + '">' + parseFloat($(this).attr('data-productotal')).toFixed(2) + '</i></span></div>';
                        settlementColumnHtml += '<text style="display:none;" class="jiage" data-rjia="' + $(this).attr('data-untprice') + '"> ' + $(this).attr('data-untprice') + '</text>';
                        settlementColumnHtml += '<div class="cateringProductMoreinfo catering_taste_list">' + $(this).children("td").eq(0).html() + '</div>';
                        settlementColumnHtml += '<div class="cateringProductMoreinfo catering_taste_remarks">' + orderProductRemarksHtml + '</div>';
                        settlementColumnHtml += '<div class="cateringProductMoreinfo">' + str + '</div>';
                        settlementColumnHtml += '</li>';
                    });
                    $("#Cashlefsit").html(settlementColumnHtml);
                    $("#danhao").text($("#guandanlist li.joove, #catering_order_list li.active").data("id"));
                    $("#meiridanhao").text(GetDailySerialNumber(false));
                }
                else {
                    $("#guanprlist tr").each(function(i) {
                        var str = '';
                        var sv_pricing_method = parseInt($(this).data("pricingmethod")); // 商品是计件还是计重（0 -- 计件，1--计重）
                        var minunitprice = returnFloat($(this).data("minunitprice")) == 0 ? "" : returnFloat($(this).data("minunitprice"));
                        var mindiscount = returnFloat($(this).data("mindiscount")) == 0 ? "" : returnFloat($(this).data("mindiscount"));
                        var memberprice = returnFloat($(this).data("memberprice")) == 0 ? "" : returnFloat($(this).data("memberprice"));
                        var number = $(this).find("td").eq(3).text() || 1;
                        var prnumber = parseInt($(this).data("prnumber") ||0);
                        if (memberprice > 0) {
                            str = '<p class="nn4" style="color:red"><span class="fl">会员单价¥ <text class="memberprice">' + returnFloat(memberprice) + '</text></span></p>';
                        } else if (mindiscount > 0) {
                            str = '<p class="nn4" style="color:red"><span class="fl">最低折扣 <text class="mindiscount">' + mindiscount * 10 + '</text>%</span></p>';
                        } else if (minunitprice > 0) {
                            str = '<p class="nn4" style="color:red"><span class="fl">最低单价¥ <text class="minunitprice">' + returnFloat(minunitprice) + '</text></span></p>';
                        }
                        $("#Cashlefsit").append(' <li id="' + $(this).data("id") + '" data-prnumber="' + (prnumber) + '" data-prname="' + $(this).attr("data-name") + '" data-mindiscount="' + $(this).data("mindiscount") + '" data-minunitprice="' + $(this).data("minunitprice") + '" data-memberprice="' + $(this).data("memberprice") + '" data-pricingmethod="' + $(this).data("pricingmethod") + '" data-categoryId ="' + $(this).attr("data-categoryId") + '" data-url ="' + $(this).attr("data-url") + '" data-untprice="' + $(this).attr("data-untprice") + '" data-sv_p_commissiontype="' + $(this).attr("data-sv_p_commissiontype") + '" data-sv_product_integral="' + $(this).attr("data-sv_product_integral") + '" data-sv_p_commissionratio="' + $(this).attr("data-sv_p_commissionratio") + '"><div class="naerigh">  <p class="nn1">' + $(this).find("td").eq(2).text() + '</p><p class="nn2"><span class="fl">' + $(this).find("td").eq(1).text() + '</span><span class="fr">数量 <text class="nump" data-cnum="0">' + $(this).find("td").eq(3).text() + '</text></span></p> <p class="nn3"><span class="fl">¥<text class="jiage"> ' + returnFloat($(this).find("td").eq(4).text()) + '</text></span><span class="fr">¥ <text class="zhong" data-sv_p_originalprice="' + returnFloat($(this).find("td").eq(5).text()) + '"> ' + returnFloat($(this).find("td").eq(5).text()) + '</span></p>' + str + '</div> </li>');
                    });
                    $("#danhao").text($("#guandanlist li.joove, #catering_order_list li.active").data("id"));
                    $("#meiridanhao").text(GetDailySerialNumber(false));
                }
                zhonger();
                
                layer.closeAll();
            }
        });
        if (member_id != null && member_id != undefined && member_id != '') {
            $.getJson('/Ajaxdata/GetUserModel', { id: member_id }, function (result_data) {
                $("#huiyuan_id").text(result_data.sv_mr_name).data("id", result_data.member_id).data("jiekou", result_data.sv_ml_commondiscount);
                $("#yuecount").text(returnFloat(result_data.sv_mw_availableamount)).attr('data-money', returnFloat(result_data.sv_mw_availableamount));
                var descount = parseFloat(result_data.sv_ml_commondiscount);
                if (data.sv_ml_commondiscount != null && data.sv_ml_commondiscount != undefined && data.sv_ml_commondiscount != '' && data.sv_ml_commondiscount != 0 && data.sv_ml_commondiscount != "0") {
                    _member_discount = parseFloat(data.sv_ml_commondiscount) * 10;
                }
                else {
                    _member_discount = 100;
                }
                zhonger();
            });
        }
    }
    else {
        layer.msg("还没有选中要取的订单");
    }
    return false;
});

// 确定删除订单操作
$(document).unbind("click", "#btnConfirmDeleteWithList").on("click", "#btnConfirmDeleteWithList", function () {
    var deleteWithListId = $("#guandanlist li.joove, #catering_order_list li.active").attr("data-withlistid");
    $.post('/settle/DeleteWithOrderList', { withListId: deleteWithListId }, function (result) {
        if (result.succeed) {
            orderSharedFn();
            $('#catering_order_product').html('');
            layer.close(index);
            layer.msg('删除成功');
        }
        else {
            layer.msg(result.errmsg);
        }
    });
});

// 检查牌号是否已被使用，如果已被使用则返回订单主键Id,不存在返回0
function existsCateringGrade(gradeName) {
    var cateringWithlistid = 0;
    $.getJSON('/Catering/ExistsCateringGrade', { gradeName: gradeName }, function (result) {
        if (result > 0) { // 牌号已在使用中
            cateringWithlistid = result;
            //确认拼桌的弹窗
            var confirmAddFoodshtml = '<div>该牌号已在使用中，是否向该牌号中添加菜品？</div><div class="modal-footer product-modal-footer selectBtn" style="bottom: 0;padding: 0;height: 34px;border:none;margin-left: -20px;"><button type="button" class="text-center btn fl closeallpage">取消</button><button type="button" class="text-center btn fl selectSuccess" id="btnConfirmCateringAddOrderFoods">确定</button></div>'
            layer.open({
                title: ' ',
                content: confirmAddFoodshtml,
                btn: false,
                area: ['300px', '180px'],
                success: function () {
                    $('#btnConfirmCateringAddOrderFoods').click(function () {
                        $('#catering_CateringGrade').attr('data-addFood', true);
                        $('#catering_CateringGrade').attr('data-withlistid', cateringWithlistid);
                        var catering_CateringGrade = $('#catering_CateringGrade').attr('data-withlistid');
                        if (isNullOrWhiteSpace(catering_CateringGrade)) {
                            funcSaveWithOrderListInfo();
                        }
                    });
                }
            });
        }
        else {
            $('#catering_CateringGrade').text(gradeName);
            var catering_CateringGrade = $('#catering_CateringGrade').text();
            funcSaveWithOrderListInfo();
        }
    });
}

// 设置就餐牌号
function funcSetCateringGrade() {
    $("#jishukuan").val('');
    $('#updateNum_en').hide();
    $('#updateNum').css('width', '190px');
    $("#woquren").click(function () {
        if ($("#jishukuan").val().replace(/\ +/g, "")) {;
            var gradeNum = $("#jishukuan").val().replace(/\ +/g, "");
            if (gradeNum && gradeNum > 0) {
                $('#catering_CateringGrade').text(gradeNum);
                layer.close(index);
            }
            else {
                layer.msg('请输入正确的牌号！');
            }
        }
        else {
            $("#jishukuan").focus();
            layer.msg('请输入牌号！');
        }
    });

}

// 操作挂单菜品数量
function operateWithOrderFoodNumber(orderProductId, num, operateType) {
    var catering_order_list_obj = $('#catering_order_list li.active');
    var data_isaccept = catering_order_list_obj.attr('data-isaccept'); // 0 --待接单，1--已接单
    var ordersource = catering_order_list_obj.attr('data-ordersource');
    if (data_isaccept == 0 && ordersource == 1) {
        layer.msg('该手机订单还未确认接单不能进行数量操作');
        return;
    }
    var loadIndex = commonOpenLoading();
    $('#catering_order_product button').addClass("disabled").attr("disabled", "disabled");
    $.post('/Catering/OperateWithOrderFoodNumber', { orderProductId: orderProductId, num: num, operateType: operateType }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed) {
            singleOrderProductPrint(orderProductId, operateType);
            if (result.values == "Last") {
                $('#catering_order_product').html('');
                orderSharedFn();
            }
            else {
                setTimeout(function () {
                    getGuanList($('#catering_order_list>li.active').attr('data-withlistid'));
                }, 200);
            }

            if ($("#Cashlefsit li").length > 0) {
                var activeTableId = $(".cateringTableList-ul>li.active").attr("data-id");
                var activeTableName = $(".cateringTableList-ul>li.active").attr("data-name");
                if (activeTableId > 0) {
                    getGuandanmModelByTableId(activeTableId, activeTableName, 0, 0);
                }
            }
        }
        else {
            layer.msg(result.errmsg);
        }
    });

}

// 操作菜品挂单数量
$(document).unbind("click", "#catering_order_product .btn").on("click", "#catering_order_product .btn", function () {
    var thisOrderProductId = $(this).attr('data-id');
    var thisOperateType = $(this).attr('data-type');
    if (thisOrderProductId > 0) {
        operateWithOrderFoodNumber(thisOrderProductId, 0, thisOperateType);
    }
});

// 操作房台退餐
$("#btnRetreatOrcutFoods").click(function () {
    var thisOrderProductRetreatId = $("#Cashlefsit").find("li.active").attr("data-sv_without_product_id");
    if (thisOrderProductRetreatId != null && thisOrderProductRetreatId != undefined) {
        operateWithOrderFoodNumber(thisOrderProductRetreatId, 0, 0);
    } else {
        layer.msg("请选择要退的菜品！");
    }
});

// 单个菜品打印
$(document).unbind("click", "#catering_order_product .print").on("click", "#catering_order_product .print", function () {
    var thisWithOrderProductId = parseInt($(this).attr('data-id') || 0);
    var catering_order_list_obj = $('#catering_order_list li.active');
    var data_isaccept = catering_order_list_obj.attr('data-isaccept'); // 0 --待接单，1--已接单
    var ordersource = catering_order_list_obj.attr('data-ordersource');
    if (data_isaccept == 0 && ordersource == 1) {
        layer.msg('该手机订单还未确认接单不能进行打印操作');
        return;
    }
    singleOrderProductPrint(thisWithOrderProductId, -1);
});

// 处理单个菜品打印(type =0 减少菜品，1--增加菜品)
function singleOrderProductPrint(withOrderProductId, type) {
    var singleOrderProductPrint = {
        prlist: [],
        order_running_id: _g_catering_order_list_print_Json.order_running_id,
        sv_catering_grade: _g_catering_order_list_print_Json.sv_catering_grade,
        sv_person_num: _g_catering_order_list_print_Json.sv_person_num
    };
    if (withOrderProductId > 0 && singleOrderProductPrint != null) {
        var prlist = _g_catering_order_list_print_Json.prlist;
        var oldPrlist = [];
        if (prlist && prlist.length > 0) {
            for (var i = 0; i < prlist.length; i++) {
                if (prlist[i].sv_without_product_id == withOrderProductId) { // 不是当前的id则移除操作
                    var productMoney = parseFloat(prlist[i].product_unitprice || 0);
                    var thisProductNum = parseFloat(prlist[i].product_num || 0);
                    singleOrderProductPrint.prlist.push(prlist[i]);
                    if (type == 0) {
                        if (thisProductNum == 1) {
                            prlist.splice(i, 1);
                        }
                        else {
                            prlist[i].thisProductNum = thisProductNum - 1;
                            prlist[i].product_total = (prlist[i].thisProductNum * productMoney);
                        }
                    }
                    else if (type == 1) {
                        prlist[i].thisProductNum = thisProductNum + 1;
                        prlist[i].product_total = (prlist[i].thisProductNum * productMoney);
                    }
                    break;
                }
            }
        }
        else {
            var productTasteListI = $("#Cashlefsit>li.active .catering_taste_list").find("i");
            var productTasteList = [];
            if (productTasteListI.length > 0) {
                $(productTasteListI).each(function (i, item) {
                    var thisProductTasteList = {
                        sv_taste_data_name: $(this).text(),
                        sv_taste_data_type: $(this).attr("data-type"),
                        sv_taste_price: $(this).attr("data-price"),
                    }
                    productTasteList.push(thisProductTasteList);
                });
            }
            singleOrderProductPrint = {
                prlist: [{
                    ProductTasteList: productTasteList,
                    product_discount: $("#Cashlefsit>li.active").attr("data-product_discount"),
                    product_name: $("#Cashlefsit>li.active").attr("data-prname"),
                    product_num: $("#Cashlefsit>li.active").attr("data-product_number"),
                    product_total: $("#Cashlefsit>li.active").attr("data-product_total"),
                    product_unitprice: $("#Cashlefsit>li.active").attr("data-minunitprice"),
                    sv_printer_ip: $("#Cashlefsit>li.active").attr("data-printerip"),
                    sv_printer_port: $("#Cashlefsit>li.active").attr("data-printerport"),
                    sv_without_product_id: $("#Cashlefsit>li.active").attr("data-sv_without_product_id")
                }],
                order_running_id: $("#danhao").text(),
                sv_catering_grade: $("#catering_CateringGrade").text(),
                sv_person_num: $("#catering_CateringGrade").attr("data-personnum")
            }
        }
    }
    if (type != -1) {
        singleOrderProductPrint.prlist[0].product_num = 1;
    }
    var loadIndex = commonOpenLoading();
    if (singleOrderProductPrint && singleOrderProductPrint.prlist && singleOrderProductPrint.prlist.length > 0) {
        $.getJSON("/system/Getprint", function (data) {
            pushcateringprintData(JSON.stringify(singleOrderProductPrint), JSON.stringify(data), 2, type);
            setTimeout(function () {
                commonCloseLoading(loadIndex);
            }, 800);
            layer.msg('已向厨房发送菜品打印', { time: 1500 });
        });
    }
    else {
        layer.msg('请选择打印数据');
    }
}

// 保存挂单信息
function funcSaveWithOrderListInfo() {
    if (!isNullOrWhiteSpace($("#danhao").text())) { // 流水号不存在情况重新获取流水号
        shuxin();
    }
    var pendingModel = {
        member_id: $('#huiyuan_id').attr('data-id'),
        sv_remark: $("#remarks").val(),
        prlist: [],
        wt_nober: $("#danhao").text(),
        sv_table_id: $('#catering_CateringGrade').attr('data-tableId'),
        sv_catering_grade: $('#catering_CateringGrade').text(),
        sv_person_num: $('#catering_CateringGrade').attr('data-personNum'),
        sv_order_source: 0, // 默认PC
        sv_without_list_id: ($('#catering_CateringGrade').attr('data-withlistid') || 0), // 读取挂单主键id
        sv_table_is_together: ($('#catering_CateringGrade').attr('data-together') || false), // 是否拼台
        ContinueToAddFood: ($('#catering_CateringGrade').attr('data-addFood') || false) // true 继续加菜

    };

    var pendingPrintModel = JSON.parse(JSON.stringify(pendingModel));
    // 挂单信息
    $("#Cashlefsit > li").each(function () {
        var productTasteList = []; // 口味信息集合
        var productId = $(this).attr('id');
        var sv_product_tasteprice = 0; // 口味，加料，规格总价
        var productTasteListHtmlObj = ($(this).find('.catering_taste_list i') || []);
        var _sv_is_packing = false; // 默认不打包
        var _sv_packing_charges = 0;  // 打包价格
        var _orderProductRemarks = ($(this).find('.catering_taste_remarks .orderProductRemarks').text() || '');
        $(productTasteListHtmlObj).each(function (i, item) {
            var dataType = $(this).attr('data-type'); // 特殊处理打包信息 dataType == 3
            if (dataType == 3) {
                _sv_is_packing = true;
                _sv_packing_charges = $(this).attr('data-price');
            }
            else {
                var productTasteModel = {
                    sv_taste_id: $(this).attr('data-id'),
                    sv_taste_price: $(this).attr('data-price'),
                    product_id: productId,
                    sv_taste_data_type: dataType,
                    sv_taste_data_name: $(this).text() || ''
                };
                productTasteList.push(productTasteModel);
            }
            sv_product_tasteprice += parseFloat($(this).attr('data-price') || 0)
        });
        var thisProductlist = {
            product_nober: $('#danhao').text(),
            product_id: $(this).attr("id"),
            product_name: replaceStr($(this).attr('data-prname'), "''"),
            product_num: $(this).find(".nump").text(),
            product_unitprice: $(this).find(".jiage").text(),
            product_discount: 0,
            product_total: $(this).find(".zhong").text(),
            sv_pricing_method: $(this).attr("data-pricingmethod"),
            ProductTasteList: productTasteList, // 口味信息,
            sv_product_tasteprice: sv_product_tasteprice,
            sv_is_packing: _sv_is_packing,
            sv_packing_charges: _sv_packing_charges,
            sv_remark: _orderProductRemarks,
            product_price: $(this).find("text.jiage").attr("data-rjia"),
            sv_packing_unitprice: $(this).attr('data-packprice') || 0, // 原有菜品的打包单价
            sv_printer_ip: ($(this).attr('data-printerip') || ''),
            sv_printer_port: ($(this).attr('data-printerport') || ''),
            sv_p_commissiontype: $(this).attr("data-sv_p_commissiontype") || 0,
            sv_p_commissionratio: $(this).attr("data-sv_p_commissionratio") || null,
            sv_product_integral: $(this).attr("data-sv_product_integral") || null  //商品积分可为空
        };

        if (!($(this).attr("data_order_product_status") == 1))
        {
            //从取单获取的信息，不加入后厨打印
            pendingPrintModel.prlist.push(thisProductlist);
        }
        pendingModel.prlist.push(thisProductlist);
    });
    //console.log(pendingModel);
    var i2 = layer.load(1, { shade: [0.1, '#000'] });
    $.ajax({
        url: '/settle/Post_guadan',
        type: 'post',
        data: JSON.stringify(pendingModel),
        contentType: 'application/json',
        async: true,
        success: function (data) {
            if (data.succeed) {
                shuxin();
                $("#Cashlefsit").html("");
                layer.closeAll();
                layer.msg("下单操作成功！");
                commondCleanOderInfos();
                if (_g_sv_uit_cache_name == 'cache_name_catering') {
                    $.getJSON("/system/Getprint", function(data) {
                        if (pendingPrintModel && pendingPrintModel.prlist && pendingPrintModel.prlist.length > 0)
                        {
                            //不打印取单（从挂单或房台获取的已打印商品）
                            pushcateringprintData(JSON.stringify(pendingPrintModel), JSON.stringify(data), 2);
                            layer.msg('已向厨房发送菜品打印', { time: 1500 });
                        }
                    });
                }
            }
            else {
                if (data.errmsg) {
                    layer.close(i2);
                    layer.msg(data.errmsg);
                } else {
                    layer.close(i2);
                    layer.msg("操作失败！");
                }
            }
        }
    });
    layer.close(i2);
}

$(document).ready(function () {
    $(document).on("click", ".biglis", function () {
        $(this).toggleClass("open");
    });
    //取消密码输入
    $(document).on("click", "#quxiao", function () {

        layer.closeAll("page");
    });

    $("#Cashchongzhi").click(function () {
        $("#userid").val("");
        Deke.DeKe_dialog.show_Url("选择会员", "/html/cash/huiyuanka.html?v=2040", ["确认选择会员", "关闭"], f10, f9, ['630px', '']);
        $("#userid").val("");
    });

    $("#Cashlefsit").on("click", "li", function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    queryProductFocus();
    $("#guadaiclick").click(function () {
        if ($("#Cashlefsit li").length == 0) {
            //Deke.DeKe_dialog.show_Url("挂单系统", "/html/cash/guadan.html?v=2036", ["取出选中订单", "关闭"], f8, f7, ['780px', '']);
            Deke.DeKe_dialog.show_Url2("挂单系统", "/html/cash/guadan.html?v=2036", orderSharedFn, ['860px', '520px']);
        }
        else if (_g_sv_uit_cache_name == 'cache_name_catering')
        { // 餐饮版的相应操作

            var tableId = $('#catering_CateringGrade').attr('data-tableId');
            var cateringWithlistid = $('#catering_CateringGrade').attr('data-withlistid');
            var catering_CateringGradeName = $('#catering_CateringGrade').text();
            if (_g_Catering_Is_Ceremonial_Eat == 1) {
                existsCateringGrade(catering_CateringGradeName);
            }
            else if (_g_Catering_Is_Ceremonial_Eat == 0) { // 正餐
                if (cateringWithlistid > 0 || tableId > 0) {// 开台方式
                    funcSaveWithOrderListInfo();
                    socket.emit('common_by_shop_refresh_desk_server', { user_id: user_id });//刷新房台的socket.io
                }
                else {
                    layer.msg("请开台后再继续下单操作");
                }
            }
        }
        else {
            layer.confirm("", { btn: ["确认挂单", "取单", "关闭"] },
                 function () {
                     funcSaveWithOrderListInfo();
                 }, function () {

                     //Deke.DeKe_dialog.show_Url("挂单系统", "/html/cash/guadan.html?v=2036", ["取出选中订单", "关闭"], f8, f7, ['730px', '']);
                     Deke.DeKe_dialog.show_Url2("挂单系统", "/html/cash/guadan.html?v=2036", orderSharedFn, ['860px', '520px']);
                 }
            );
            $(".layui-layer-content").html('<input type="text" id="remarks" value="" placeholder="请输入备注信息(可不输入)" style="width: 100%;"/>');
            $('#remarks').focus();
        }
    });

    $(document).on("click", "#Czjsje", function () {
        if ($("#query_user").val() != "") {
            Deke.DeKe_dialog.show_Url3("会员充值", "/html/cash/chongzhu2.html?v=2031", f6, ['730px', ''], "chuxi");
            $("#userid").val($("#userid").val())
        } else {

            layer.msg("请先选择会员");
        }

    });

    $("#chongji").click(function () {
        Deke.DeKe_dialog.show_Url3("会员充值", "/html/cash/chongzhu.html?v=2031", f6, ['730px', ''], "chuxi");
        $("#userid").val($("#userid").val())
    });


    $("#userbur").click(function () {
        layer.open({
            type: 2,
            title: '会员管理',
            shadeClose: true,
            shade: 0.8,
            area: ['80%', '90%'],
            content: '/member/?x=1' //iframe的url
        });
        //$("#userid").val("");
        //Deke.DeKe_dialog.show_Url("选择会员", "/html/cash/huiyuanka.html?v=2040", ["确认选择会员", "关闭"], f10, f9, ['630px', '']);
        //$("#userid").val("");
    });

    function CashlebtnFunc(vkey) {
        if (vkey == 13 && $("#queryproduct").is(":focus")) {
            return;
        }
    }
    $("#Cashlebtn").click(function () {
        // 关闭房台
        $('#openCateringTableContent').hide(0);
        //隐藏加菜，退菜
        $("#btnAddfoodsOrCutfoods").hide(0);
        $("#btnRestaurantOrBale").show(0);
        closeCateringFunc(-1);
        if ($("#Cashlefsit > li").length > 0) {
            GetConfigdataBylevel($("#memberlevel_id").val());
            //  Deke.DeKe_dialog.show_Url3("收银结算", "/html/cash/yilang.html?v=20212", f2, ['730px', ''], "shoyin");

            if ($(".product_type").length > 0) {

                Deke.DeKe_dialog.show_Url3("收银结算", "/html/cash/yilang.html?v=" + getTimeStamp(), f11, ['730px', ''], "shoyin");
            }
            else {
                jifendixiankaiguan = false;
                Deke.DeKe_dialog.show_Url3("", "/html/cash/jieshuan2.html?v=" + getTimeStamp(), f2, ['877px', ''], "shoyin2");
            }
        }
        else {
            layer.msg("请选择商品后再进行结算！");
        }
    });

    //数量点击数字的时候
    $(document).on("click", ".calui>li", function () {
        $("#jishukuan").val($("#jishukuan").val() + $(this).data("val"));
        $("#jishukuan").change();
    });

    //点击数量按扭，改价，折扣
    $(".shudian").click(function () {
        if ($("#Cashlefsit .active").length > 0) {
            var switck_sv_iemi_no = $("#Cashlefsit .active").data("sv_iemi_no");
            clikcname = $(this).data("name");
            name = "";
            switch (clikcname) {
                case "shulian":
                    name = "修改产品数量";
                    break;
                case "zhekou":
                    name = "修改产品折扣 1~10之间";
                    break;
                case "gaijia":
                    name = "修改产品价格";
                    break;
            }
            if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && switck_sv_iemi_no != "" && clikcname == "shulian") {
                layer.msg("串号商品不支持修改数量");
            }
            else {
                Deke.DeKe_dialog.show_Url2(name, "/html/cash/jishu.html?v=25", f, ['310px', '']);
            }
        } else {
            layer.msg("还没有选中产品");
        }
    });

    //搜索框的计算的弹窗
    $(".search-product-buy").click(function () {
        Deke.DeKe_dialog.show_Url2('条码/助词码（大写）/价格（0~100000)', "/html/cash/jishu.html?v=25", searchproductFn, ['310px', '']);
    });
    function searchproductFn() {
        $("#woquren").click(function () {
            if ($("#jishukuan").val()) {
                $("#queryproduct").val($("#jishukuan").val());
                if (!isNaN(parseFloat($("#jishukuan").val())) && isFinite($("#jishukuan").val())) {
                    $("#nocoding").removeClass("disabled");
                }
            }
            queryProductFocus();
            layer.closeAll();
        });
        $(".posia").click(function () {
            $("#jishukuan").val("");
        });
    };

    //时间变动
    setInterval(function () {
        var date = new Date();
        //$("#date_ss").text("系统时间：" + new Date().Format("yyyy年MM月dd日 hh:mm:ss"));
        var year = date.getFullYear();//当前年份
        var month = date.getMonth();//当前月份
        var data = date.getDate();//天
        var hours = date.getHours();//小时
        var minute = date.getMinutes();//分
        var second = date.getSeconds();//秒
        var time = year + "年" + fnW((month + 1)) + "月" + fnW(data) + "日 " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
        var timeouts = fnW((month + 1)) + "月" + fnW(data) + "日 " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
        $("#date_ss").text('销售时间：' + time);
        $("#date_ss2").text(timeouts);
    }, 1000);
    //补位 当某个字段不是两位数时补0
    function fnW(str) {
        var num;
        str >= 10 ? num = str : num = "0" + str;
        return num;
    }
    //点击加号
    $("#num_jia").click(function() {

        var sda = parseInt($("#Cashlefsit .active").find(".nump").text());
        var switck_sv_iemi_no = $("#Cashlefsit .active").data("sv_iemi_no");
        sda++;
        if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && switck_sv_iemi_no == "") {
            if (sda > seriaNumberArray_active_ImemCounts) {
                layer.msg("无串号商品库存不足，最大数量为" + seriaNumberArray_active_ImemCounts + "件");
                return;
            }
        }
        if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && switck_sv_iemi_no) {
            layer.msg("串号商品不可调整数量");
                return;
        }

        if ($("#Cashlefsit .active").hasClass("product_type")) {
            var sdaa = parseInt($("#Cashlefsit .active").find(".nump").data("cnum"));
            if (sda > sdaa)
            {
                layer.msg("会员该项目次数不够，若刚充值，请重新选择会员");
                return;
            }
        }

        $("#Cashlefsit .active").find(".nump").text(sda);
        $("#Cashlefsit .active").find(".zhong").text(returnFloat(Math.round($("#Cashlefsit .active").find(".jiage").text() * sda * 100) / 100));
        $("#Cashlefsit .active").find(".minunitprice").text(returnFloat($("#Cashlefsit .active").data("minunitprice")))
        $("#Cashlefsit .active").find(".memberprice").text(returnFloat($("#Cashlefsit .active").data("memberprice")))
        zhonger();
        inspectCommodityWhetherZeroStock();
    });

    //点击减号
    $("#num_jian").click(function () {
        var sda = parseInt($("#Cashlefsit .active").find(".nump").text());
        sda--;
        if (sda < 1) {
            //  layer.alert("ssss");
            layer.confirm("您要删除该产品吗？", { btn: ["确认", "取消"] }, function () {

                $("#Cashlefsit .active").remove();
            });
            sda = 1;
        }
        $("#Cashlefsit .active").find(".nump").text(sda);
        $("#Cashlefsit .active").find(".zhong").text(returnFloat(Math.round($("#Cashlefsit .active").find(".jiage").text() * sda * 100) / 100));
        $("#Cashlefsit .active").find(".minunitprice").text(returnFloat($("#Cashlefsit .active").data("minunitprice")))
        $("#Cashlefsit .active").find(".memberprice").text(returnFloat($("#Cashlefsit .active").data("memberprice")))
        zhonger();
        layer.closeAll();
        inspectCommodityWhetherZeroStock();
    });


    ///删除产品

    $("#delete_p").click(function () {
        if ($("#Cashlefsit .active").length > 0) {
            var imem_id = $("#Cashlefsit .active").data("sv_iemi_no");//串号编码
            var is_imem_product = $("#Cashlefsit .active").data("sv_has_iemino");
            if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && is_imem_product == true) {
                if (imem_id) {
                    delete seriaNumber_imem_obj[imem_id];
                }
                else {
                    delete seriaNumber_imem_obj[0];
                }
                $("#Cashlefsit .active").remove();
            } else {
                $("#Cashlefsit .active").remove();
            }
            layer.closeAll();
            zhonger();
        } else {
            //layer.confirm("您真的要删除的产品吗？", function () {
            var imem_id = $("#Cashlefsit li").eq(0).data("sv_iemi_no");//串号编码
            var is_imem_product = $("#Cashlefsit li").eq(0).data("sv_has_iemino");
            if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && is_imem_product == true) {
                if (imem_id) {
                    delete seriaNumber_imem_obj[imem_id];
                }
                else {
                    delete seriaNumber_imem_obj[0];
                }
                $("#Cashlefsit li").eq(0).remove();
            } else {
                $("#Cashlefsit li").eq(0).remove();
            }
            layer.closeAll();
            zhonger();
            //});

        }
    });

    $("#queryproduct").keyup(function (key) {
        var txtSeachProductStr = $("#queryproduct").val().replace(/\ +/g, "");
        //var inputval = parseFloat($("#queryproduct").val() || 0);
        ////无码0到100000
        //if (inputval > 0 && inputval < 100001) {
        //    $("#nocoding").css("display", "block");
        //} else {
        //    $("#nocoding").css("display", "none");
        //}
        fastCash();
        if (key.keyCode == 13) {

            if (txtSeachProductStr) {
                if (capital_letters) {
                    GetProductList(1, 0, 0, 0, 0, txtSeachProductStr);
                    queryProductFocus();
                    $("#classlist .swiper-slide").eq(0).addClass("active").siblings().removeClass("active");
                }
            }
        }

    });
    var _key_input = "";
    var _key_input_time_flag = false;
    var _key_input_old = "";
    $("#queryproduct").on("focus", function () {
        _key_input_time_flag = true;
        setInterval(function () {
            if (_key_input_time_flag) {
                _key_input_time_flag = false;
                _key_input = $("#queryproduct").val().replace(/\ +/g, "");
                if (($("#queryproduct").val().replace(/\ +/g, "") && $("#queryproduct").val().replace(/\ +/g, "") == _key_input && _key_input != _key_input_old)) {
                    _key_input_old = _key_input;
                    $("#queryproduct").change();
                } else {
                    _key_input = $("#queryproduct").val().replace(/\ +/g, "");
                    setTimeout(function () { _key_input_time_flag = true; }, 1000);
                }
            }
        }, 200);
    });

    nocodingAdd();//无码商品
    //这个是充值弹框支付点击事件
    $('.CSczpayui li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    //开关按钮事件
    $('.swtith i').click(function () {
        $(this).parents('.swtith').toggleClass('open');
    });

    //右侧导航栏的点击事件

    $('.maska').click(function () {
        $(this).parents('li').toggleClass('active').siblings().removeClass('active');
        if ($(this).parents('li').hasClass('active')) {
            $(this).siblings('.urlsk').slideDown(200);
            $(this).parents('li').siblings().removeClass('active').find('.urlsk').slideUp(200);
        } else {
            $(this).parents('li').find('.urlsk').slideUp(200);
        }
    });

    //导航点击事件
    $('.Cashtopnav').on('click', '.swiper-slide', function () {
        if ($(this).data("id") > -1) {
            $(this).addClass('active').siblings().removeClass('active');
            GetProductList(1, 0, -1, 0, $(this).data("id"), "");
        }
    });

    //快速收银 无码收银 快收
    function fastCash() {
        var inputval = parseFloat($("#queryproduct").val().replace(/\ +/g, "") || 0);
        //无码0到100000
        if (inputval > 0 && inputval < 100001) {
            //$("#nocoding").css("display", "block");
            $("#nocoding").removeClass("disabled");
        } else {
            $("#nocoding").addClass("disabled");
            //$("#nocoding").css("display", "none");
        }
    }
    //结算弹框选择支付移动事件
    //var swiper = new Swiper('.showiimb .swiper-container', {
    //    slidesPerView: 4,
    //    paginationClickable: true,
    //    spaceBetween: 5,
    //    freeMode: true,
    //    prevButton: '.showiimb .swiper-button-prev',
    //    nextButton: '.showiimb .swiper-button-next'
    //});

    //导航点击事件
    $('.paywaylist').on('click', '.selectpaytype', function () {
        $(this).addClass('active').siblings().removeClass('active');

    });

    // 处理计重商品
    function weightProduct(productInfo) {
        setTimeout(function () {
            $('#txtproduct_unitPrice').val(parseFloat(productInfo.find(".jiage").text()));
            //$('#txtproduct_unitPrice').val (productInfo.find(".jiage").text());
            $('#weightProductName').html(productInfo.find(".name").text());
            $('#txtproduct_weight').focus();


            if (((typeof Cef) !== 'undefined')) {
                if (hardware_secondscreen_enable) {
                    Cef.ShowWeightPanel("0.00," + ($('#txtproduct_unitPrice').val() || 0.00) + ",0.00");
                }
            }

            // 称重量
            $('#txtproduct_weight').bind('keyup', function () {
                var unitPrice = parseFloat($('#txtproduct_unitPrice').val());
                var product_weight = isNullOrEmpty($(this).val()) == true ? parseFloat($(this).val().trim()) : 0;

                //$('#product_Total').val((product_weight * unitPrice).toFixed(2));

                try {
                    if (((typeof Cef) !== 'undefined')) {
                        if (hardware_secondscreen_enable) {
                            Cef.ShowWeightPanel(product_weight + "," + (unitPrice || 0.00) + "," + $('#product_Total').val());
                        }
                    }
                } catch (e) {

                }

            });

            $('#txtproduct_weight').keydown(function (key) {
                if (key.keyCode == "13") {
                    try {
                        if (((typeof Cef) !== 'undefined')) {
                            if (hardware_secondscreen_enable) {
                                Cef.HideWeightPanel();
                            }
                        }
                    } catch (e) {

                    }
                    $('#btnWeightProduct').click();
                }
            });

            // 确定
            $('#btnWeightProduct').click(function () {
                var product_weight = isNullOrEmpty($('#txtproduct_weight').val()) == true ? parseFloat($('#txtproduct_weight').val().trim()) : 0;
                var product_Total = isNullOrEmpty($('#product_Total').val()) == true ? parseFloat($('#product_Total').val().trim()) : 0;
                if (product_weight > 0) {// && product_Total > 0) {
                    var new_unit_price = isNullOrEmpty($('#txtproduct_unitPrice').val()) == true ? parseFloat($('#txtproduct_unitPrice').val().trim()) : 0;
                    showCommonLeftProductList(productInfo, product_weight, new_unit_price);
                }
                else if (product_weight == 0) {
                    layer.msg('请输入正确的商品重量');
                    $('#txtproduct_weight').focus();
                }
                else {
                    layer.msg('请输入商品重量');
                    $('#txtproduct_weight').focus();
                }

            });
        }, 200);
    }

    //点击产品加入结算栏
    $(document).unbind("click", "#productlist .textlistbox").on("click", "#productlist .textlistbox", function () {
        var noHasSeriaNumber_LiObj = $(this).data("sv_iemi_no");
        if ((noHasSeriaNumber_LiObj == undefined || noHasSeriaNumber_LiObj == "" || noHasSeriaNumber_LiObj == null) && _g_sv_uit_cache_name == "cache_name_mobile_digital") {
            _g_thisObj_seriaNumber = $(this);
        }
        var run = true;
        var InventoryCount = $(this).find(".goodsNumber").val();
        if (_g_sv_uit_cache_name == 'cache_name_catering') {
            run = true;
        }
        if (run)
        {
            var cashlefsitLength = $('#Cashlefsit li').length;
            var cashlefsit_Active = "";
            var str = "";
            var sv_pricing_method = parseInt($(this).data("pricingmethod")); // 商品是计件还是计重（0 -- 计件，1--计重）
            var minunitprice = returnFloat($(this).data("minunitprice")) == 0 ? "" : returnFloat($(this).data("minunitprice"));
            var mindiscount = returnFloat($(this).data("mindiscount")) == 0 ? "" : returnFloat($(this).data("mindiscount"));
            var memberprice = returnFloat($(this).data("memberprice")) == 0 ? "" : returnFloat($(this).data("memberprice"));

            /*****串号参数*****/
            var id = $(this).data("prid");//商品id
            var blan_id = $(this).data("id");//商品编码
            var productName = $(this).find(".name").text();//商品名称
            var spec = $(this).find(".spec").text();//商品规格
            var goodsNumber = $(this).find(".goodsNumber").val();
            var thisObj = $(this);
            var parameter = {
                "id": id,
                "blan_id": blan_id,
                "productName": productName,
                "spec": spec,
                "goodsNumber": goodsNumber
            }
            /*****串号参数*****/
            // 处理计重商品
            if (sv_pricing_method == 1 && isShowWindow == false) {
                isShowWindow = true;
                Deke.DeKe_dialog.show_Url2("", "/html/cash/weight.html?v=5565663", weightProduct($(this)), ['360px', '470px']);
                return;
            } else if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && $(this).data("sv_has_iemino") == true && !$(this).data("sv_iemi_no"))
            {
                Deke.DeKe_dialog.show_Url2WithDataNoCloseBtn("", "/html/cash/serialNumber.html?v=556565", imemNumberLoadFn, ['768px', '520px'], parameter);
                return;
            }
            else if (isShowWindow == false) {
                showCommonLeftProductList($(this), 1);
            }
            if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && $(this).data("sv_has_iemino") == true && $(this).data("sv_iemi_no"))
            {
                //非IEMI串号检索，弹出选择框$("#productlist").html("");***清空右边商品列表
                $("#productlist").html("");
            }
        }

    });

    if (moduleConfigList) {
        PreferentialTopUpGivingConfigList("Preferential", "ConsumptionReduction");
    }
});

/***********串号加载的方法s_product_stock_text**********/
function imemNumberLoadFn(parameter, name) {
    if (!name) {
        $("#s_product_name_text").text(parameter.productName);
        $("#s_product_blane_text").text(parameter.blan_id);
        $("#s_product_spec_text").text(parameter.spec);
        $("#s_product_stock_text").text(parameter.goodsNumber);
    }
    $("#s_product_id_IMEM").val(parameter.id);
    $.get("/AjaxProduct/Getsv_productIEMIListForSales", {
        id: parameter.id,
        pageIndex: 1,
        name: name
    }, function (result) {
        console.log(result);
        var counts = Math.ceil(result.total / 36);
        laypage({
            cont: $('#s_pageList'),
            pages: counts, //总页数
            skin: 'molv', //皮肤
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            //curr: location.hash.replace('#!page=', ''), //获取hash值为fenye的当前页
            //hash: 'page', //自定义hash值
            jump: function (e, first) {
                getProductIEMIListForList(parameter.id, e.curr, parameter.goodsNumber, result.total,name);
            }
        });
    })
}

/*
 * counts --总库存（包括串号与非串号）
 * listCount -- 串号库存
 * thisObj -- this收银商品对象
 */
function getProductIEMIListForList(id, pageIndex, counts, listCount, name) {
    $("#serialNumberList").empty();
    seriaNumberArray_active_ImemCounts = parseInt((counts - listCount) || 0);
    //console.log(seriaNumberArray_active_ImemCounts);
    $.get("/AjaxProduct/Getsv_productIEMIListForSales", {
        id: id,
        pageIndex: pageIndex,
        pageSize: 36,
        name: name
    }, function (result) {
        var html = '';
        if (result && result.dataList && result.dataList.length > 0) {
            var data = result.dataList;
            if (counts > listCount) {
                var isNohasSeriaNumber = seriaNumber_imem_obj[0];
                if (isNohasSeriaNumber != undefined && isNohasSeriaNumber == id) {
                    html += '<li class="active" data-product_id="' + id + '" data-imem="0" class="text-center">无串码销售</li>';
                }
                else {
                    html += '<li data-product_id="' + id + '" data-imem="0" class="text-center">无串号销售</li>';
                }
            }
            $.each(data, function (i, d) {
                var activeImem = seriaNumber_imem_obj[d.sv_iemi_no];
                if (activeImem != undefined) {
                    html += '<li class="active" data-product_id="' + d.product_id + '" data-imem="' + d.sv_iemi_no + '" data-price="' + d.sv_p_unitprice + '"><div class="imemnumber">' + d.sv_iemi_no + '</div><div class="price_p">¥' + parseFloat(d.sv_p_unitprice).toFixed(2) + '</div></li>';
                }
                else {
                    html += '<li data-product_id="' + d.product_id + '" data-imem="' + d.sv_iemi_no + '" data-price="' + d.sv_p_unitprice + '"><div class="imemnumber">' + d.sv_iemi_no + '</div><div class="price_p">¥' + parseFloat(d.sv_p_unitprice).toFixed(2) + '</div></li>';
                }
            });
            $("#serialNumberList").html(html);
        }
        else {
            if (name == undefined) {
                html += '<li data-product_id="' + id + '" data-imem="0" class="text-center">无串号销售</li>';
                $("#serialNumberList").html(html);
            }
        }
    });
}

/**操作串号商品逻辑**/
$(document).unbind("click", "#serialNumberList li").on("click", "#serialNumberList li", function () {
    var activeSwitch = $(this).hasClass("active");
    var imem_id = $(this).data("imem");
    var pr_id = $(this).data("product_id");
    if (activeSwitch) {
        if (pr_id > 0) {
            $(this).removeClass("active");
        }
        if (imem_id == 0) {
            $("#Cashlefsit").find("li[data-sv_iemi_no='']").remove();//移除无串号商品
        } else {
            $("#Cashlefsit").find("li[data-sv_iemi_no='" + imem_id + "']").remove();//移除有串号商品
        }
        delete seriaNumber_imem_obj[imem_id];
        //console.log(seriaNumber_imem_obj);
    }
    else {
        if (imem_id != 0) {
            seriaNumber_imem_obj[imem_id] = imem_id;//添加对象
        }
        else {
            seriaNumber_imem_obj[imem_id] = pr_id;//添加对象
        }
        //console.log(seriaNumber_imem_obj);
        $(this).addClass("active");
        if (imem_id == 0) {
            showCommonLeftProductList(_g_thisObj_seriaNumber, 1);
        }
        else {
            GetProductList(1, 0, 0, 0, 0, imem_id);
        }
    }
});

$(document).unbind("click", "#closeSeriaNumberBtn,#determineSeriaNumberBtn").on("click", "#closeSeriaNumberBtn,#determineSeriaNumberBtn", function () {
    layer.closeAll();
    $("#classlist div.swiper-slide.active").click();
});

$(document).unbind("click", "#seria_number_imem_Btn").on("click", "#seria_number_imem_Btn", function () {
    var textsearch = $("#seria_number_imem_text").val();
    if (textsearch) {
        var id = $("#s_product_id_IMEM").val();
        var parameter = {
            "id": id,
            "goodsNumber": 1
        }
        imemNumberLoadFn(parameter, textsearch);
    }
    else {
        layer.msg("请输入要搜索的信息")
    }
});

/**操作串号商品逻辑**/

// 点击商品加到结算栏
//增加自定义价格设置（称重改价）
function showCommonLeftProductList(productInfo, productNum, cus_unit_price) {
    var IsClose = true;
    if (_g_sv_uit_cache_name == "cache_name_mobile_digital") {
        IsClose = false;
    }
    var InventoryCount = parseInt($(productInfo).find(".goodsNumber").val() || 0);//库存数量
    var str = "";
    var settlementColumnHtml = '';
    var minunitprice = parseFloat(productInfo.data("minunitprice")) == 0 ? "" : parseFloat(productInfo.data("minunitprice"));
    var mindiscount = parseFloat(productInfo.data("mindiscount")) == 0 ? "" : parseFloat(productInfo.data("mindiscount"));
    var memberprice = parseFloat(productInfo.data("memberprice")) == 0 ? "" : parseFloat(productInfo.data("memberprice"));
    var unitprice = parseFloat(productInfo.find(".jiage").text());

    if (cus_unit_price && cus_unit_price >= 0) {
        unitprice = cus_unit_price;
    }
    if (memberprice > 0) {
        str = '<p class="nn4" style="color:red"><span class="fl">会员单价¥ <text class="memberprice">' + (memberprice).toFixed(2) + '</text></span></p>';
    } else if (mindiscount > 0) {
        str = '<p class="nn4" style="color:red"><span class="fl">最低折扣 <text class="mindiscount">' + (mindiscount * 10).toFixed(2) + '</text>%</span></p>';
    } else if (minunitprice > 0) {
        str = '<p class="nn4" style="color:red"><span class="fl">最低单价¥ <text class="minunitprice">' + (minunitprice).toFixed(2) + '</text></span></p>';
    }
    if (_g_sv_uit_cache_name == 'cache_name_catering') {  // 行业版_g_sv_uit_cache_name == '' 餐饮行业
        $("#Cashlefsit li").removeClass('active');
        settlementColumnHtml += '<li  class="active" data-mindiscount="' + productInfo.data("mindiscount") + '" data-minunitprice="' + productInfo.data("minunitprice") + '" ';
        settlementColumnHtml += 'data-sv_product_type="' + productInfo.attr("data-sv_product_type") + '" ';
        settlementColumnHtml += 'data-memberprice="' + productInfo.data("memberprice") + '" id="' + productInfo.data("prid") + '" data-pricingmethod="' + productInfo.data("pricingmethod") + ' " ';
        settlementColumnHtml += 'data-prname="' + productInfo.find(".name").text() + '" data-untprice="' + unitprice + '" ';
        settlementColumnHtml += 'data-categoryId="' + productInfo.attr("data-categoryId") + '" data-url ="' + productInfo.attr("data-url") + '" data-packprice="' + productInfo.attr('data-packprice') + '" ';
        settlementColumnHtml += 'data-printerip="' + (productInfo.attr('data-printerip') || '') + '" data-printerport="' + (productInfo.attr('data-printerport') || '') + '" ';
        settlementColumnHtml += 'data-sv_p_commissiontype="' + productInfo.data("sv_p_commissiontype") + '" data-sv_p_commissionratio="' + productInfo.data("sv_p_commissionratio") + '" data-sv_product_integral="' + productInfo.data("sv_product_integral") + '" >';
        settlementColumnHtml += '<div class="cateringProductNamebox"><p class="cateringProductName">' + productInfo.find(".name").text() + '</p></div>';
        settlementColumnHtml += '<div class="cateringProductNumberbox">';
        settlementColumnHtml += '<button class="btn catering_minus"><i class="icon-minus-sign"></i></button><span class="cateringProductNumber nump">' + productNum + '</span>';
        settlementColumnHtml += '<button class="btn catering_plus"><i class="icon-plus-sign"></i></button></div>';
        settlementColumnHtml += '<div class="cateringProductpricebox"><span class="cateringProductprice"><i>¥</i><i class="zhong" data-sv_p_originalprice="' + productInfo.find(".jiage").data("sv_p_originalprice") + '">' + (unitprice * productNum).toFixed(2) + '</i></span></div>';
        settlementColumnHtml += '<text style="display:none;" class="jiage" data-rjia="' + unitprice + '"> ' + unitprice + '</text>';
        settlementColumnHtml += '<div class="cateringProductMoreinfo catering_taste_list"></div>';
        settlementColumnHtml += '<div class="cateringProductMoreinfo catering_taste_remarks"></div>';
        settlementColumnHtml += '<div class="cateringProductMoreinfo">' + str + '</div>';
        settlementColumnHtml += '</li>';
        $("#Cashlefsit").prepend(settlementColumnHtml);
    }
    else {
        var insertNewProduct = false;
        //计次处理salesmodesalesmode
        if ($("#" + productInfo.data("prid")) && $("#" + productInfo.data("prid")).data("salesmode") == '0') {
            //存在当前计次商品
            //检查次数
            //已选择数量
            var hasChecknumber = !isNullOrWhiteSpace($("#" + productInfo.data("prid")).find(".nump").text()) ? 1 : parseFloat($("#" + productInfo.data("prid")).find(".nump").text());
            var totalChecknumber = !isNullOrWhiteSpace($("#" + productInfo.data("prid")).find(".nump")
                    .attr("data-cnum"))
                ? 1
                : parseFloat($("#" + productInfo.data("prid")).find(".nump").attr("data-cnum"));
            if (hasChecknumber >= totalChecknumber) {
                //当新商品插入
                insertNewProduct = true;
            }
        }

        //商超IEMI商品检索  单独插入数据
        if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && $(productInfo).data("sv_has_iemino") == true)
        {
            insertNewProduct = true;
        } else if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && $("#" + productInfo.data("prid")).length>0)
        {
            //左侧已加入有串号商品
            if ($("#" + productInfo.data("prid")).attr("data-sv_has_iemino")==true && $("#" + productInfo.data("prid")).attr("data-sv_iemi_no"))
            {
                insertNewProduct = true;
            }
        }
        //通用版本
        if ($("#" + productInfo.data("prid")).length == 0 || insertNewProduct)
        {//单个商品
            var cashleftTempName = (productInfo.find(".name").text() || '');
            var cashleftTempSpec = productInfo.find(".spec").text() || '';
            if (cashleftTempSpec)
            {
                cashleftTempSpec = "(" + productInfo.find(".spec").text().replace(/,/g, ".") + ")";
                cashleftTempName += cashleftTempSpec;
            }
            var cashlefsitHtml = '<li data-mindiscount="' + productInfo.data("mindiscount") + '" ';
            cashlefsitHtml += 'data-minunitprice="' + parseFloat(productInfo.data("minunitprice")).toFixed(2) + '" ';
            cashlefsitHtml += 'data-pricingmethod="' + productInfo.data("pricingmethod") + '" data-categoryId="' + productInfo.attr("data-categoryId") + '" data-url ="' + productInfo.attr("data-url") + '" ';
            cashlefsitHtml += 'data-sv_product_type="' + productInfo.attr("data-sv_product_type") + '" data-prcombinationid="' + productInfo.attr("data-prcombinationid") + '"  data-pricingmethod="' + productInfo.attr("data-pricingmethod") + '"  data-prname="' + productInfo.find(".name").text() + '"data-prnumber="' + productInfo.find('.goodsNumber').val() + ' " data-untprice="' + unitprice + '" ';
            cashlefsitHtml += 'data-memberprice="' + parseFloat(productInfo.data("memberprice")).toFixed(2) + '" id="' + productInfo.data("prid") + '" ';
            cashlefsitHtml += ' data-sv_p_commissiontype="' + productInfo.data("sv_p_commissiontype") + '" data-sv_p_commissionratio="' + productInfo.data("sv_p_commissionratio") + '" data-sv_product_integral="' + productInfo.data("sv_product_integral") + '" data-spec="' + cashleftTempSpec + '" ';
            cashlefsitHtml += ' data-sv_has_iemino="' + $(productInfo).data("sv_has_iemino") + '" data-sv_iemi_no="' + ($(productInfo).data("sv_iemi_no")||'') + '" '
            cashlefsitHtml += '><div class="naelfe">' + osd + '';
            cashlefsitHtml += '</div><div class="naerigh"><p class="nn1"><span>' + cashleftTempName + '</span>';
            if (_g_sv_uit_cache_name == "cache_name_mobile_digital") {
                if ($(productInfo).data("sv_iemi_no") != "") {
                    cashlefsitHtml += '<span>【' + $(productInfo).data("sv_iemi_no") + '】</span>';
                }
                else {
                    cashlefsitHtml += '<span>【无串号】</span>';
                }
            }
            cashlefsitHtml += '';
            cashlefsitHtml += '</p><p class="nn2"><span class="fl">';
            cashlefsitHtml += '' + productInfo.data("id") + '</span><span class="fr">数量 <text class="nump" data-cnum="0">' + productNum + '</text></span></p> <p class="nn3">';
            cashlefsitHtml += '<span class="fl">¥<text class="jiage" data-rjia="' + unitprice + '"> ';
            cashlefsitHtml += '' + parseFloat(unitprice).toFixed(2) + '</text></span><span class="fr">¥ <text class="zhong" data-zhekou="1" ';
            cashlefsitHtml += 'data-sv_p_originalprice="' + productInfo.find(".jiage").data("sv_p_originalprice") + '"> ';
            cashlefsitHtml += '' + (unitprice * productNum).toFixed(2) + '</span></p>' + str + '</div> </li>';
            $("#Cashlefsit").prepend(cashlefsitHtml);
        }
        else {//多个商品
            $("#" + productInfo.data("prid")).find(".nump").text((parseFloat($("#" + productInfo.data("prid")).find(".nump").text()) + productNum).toFixed(2));
            var number = !isNullOrWhiteSpace($("#" + productInfo.data("prid")).find(".nump").text()) ? 1 : parseFloat($("#" + productInfo.data("prid")).find(".nump").text());
            jiagesss = returnFloat((parseFloat(number) * parseFloat($("#" + productInfo.data("prid")).find(".jiage").text()) * 100).toFixed(2) / 100);
            $("#" + productInfo.data("prid")).find(".zhong").text(jiagesss);
            if (parseFloat(minunitprice) > 0) {
                $("#" + productInfo.data("prid")).find(".minunitprice").text((minunitprice).toFixed(2));
            }
            else {
                $("#" + productInfo.data("prid")).find(".minunitprice").text('');
            }
            $("#" + productInfo.data("prid")).find(".memberprice").text(memberprice);
        }
    }
    isShowWindow = false; // 初始化计重商品弹窗显示标志
    if (IsClose) {
        layer.closeAll();
    }
    $("#queryproduct").val("");
    zhonger();
    queryProductFocus();
    inspectCommodityWhetherZeroStock();
}

// 处理图片读取
function loadProductImgUrl(productData) {
    var imagejson;
    var imgageUrl = '/images/omg1.jpg';
    if (productData.sv_p_images != null && productData.sv_p_images != '{}' && productData.sv_p_images != '[]') {
        imagejson = $.parseJSON(productData.sv_p_images);
        if (imagejson[0].code.indexOf('[{') >= 0 && imagejson[0].code.indexOf('}]') > 0) {
            var childimage = $.parseJSON(imagejson[0].code);
            if (childimage != null && childimage[0].code != '[]' && imagejson[0].code.indexOf('//') < 0) {
                imgageUrl = childimage[0].code;
            }
        }
        else if (imagejson[0].code.indexOf('[{') < 0 && imagejson[0].code != "" && imagejson[0].code != null && imagejson[0].code.indexOf('//') < 0) {
            if (imagejson[0].code == '[]' || imagejson[0].code == 'default') {
                imgageUrl = '/images/omg1.jpg';
            } else {
                imgageUrl = imagejson[0].code;
            }
        }
    }
    if (!isNullOrWhiteSpace(imgageUrl)) {
        imgageUrl = '/images/omg1.jpg';
    }
    return imgageUrl;
}

var PageCount = 0;
var thisPage = 1;
var _g_current_swiper_page_index = 0;

//var mySwiper = new Swiper('.Cashbotobx .swiper-container', {});
var mySwiper = new Swiper('.Cashbotobx2 .swiper-container', {
    threshold: 30,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper
    onSlideChangeStart: function (swiper) {
        try {
            _g_current_swiper_page_index = swiper.activeIndex;
            upCommonGetProductImg(_g_current_swiper_page_index);
        } catch (e) {

        }
    }
});
var _g_fast_query_isn = "";
var _g_productList_data = [];
function GetProductList(pageIndex, type, tianshu, storageFlag, categoryFlag, nameFlag) {
    $("#productlist").html("");
    var statusFlag = "0";
    var adddateFlag = "0";
    var multipleproductnumber = 0;
    var isn = "";
    //称内码检查条件：1、商超行业；2、13位条码
    //例：条码组成（全数字）：2+5+5+1，如：9902538004059，2031848017903
    if (_g_sv_uit_cache_name == "cache_name_clothing_and_shoes") {
        isn = nameFlag;
    }
    else if (nameFlag && nameFlag.length == 13 && !isNaN(nameFlag)) {
        isn = nameFlag.substring(2, 7);
        _g_fast_query_isn = nameFlag;
    }
    var html = ' ';
    if ((typeof cash_get_product_number=='undefined') || cash_get_product_number == 0)
    {
        cash_get_product_number = 42;
    }
    //商超行业，检查串号使用
    if (_g_sv_uit_cache_name == "cache_name_mobile_digital")
    {
        if (nameFlag && $("#Cashlefsit li[data-sv_iemi_no='" + nameFlag + "']").length > 0)
        {
            layer.msg("已添加串号【" + nameFlag + "】商品");
            return false;
        }
    }
    $.ajax({
        url: "/AjaxProduct/GetSalesProductList?producttype_id=-1",
        data: {
            status: statusFlag,
            category: categoryFlag,
            storage: storageFlag,
            adddate: adddateFlag,
            name: nameFlag,
            pageIndex: Math.ceil(160 / cash_get_product_number),
            pageSize: (cash_get_product_number||42),   //每页记录数
            tianshu: -1,
            isn: isn
        },
        dataType: "json",
        async: true,
        cache: true,
        success: function (res2) {
            var list = res2.list;
            _g_productList_data = list;
            if (list.length > 0) {
                CommonGetProduct(list, nameFlag);
            } else {
                layer.msg("找不到相关产品");
                return;
            }
        }
    });
}


function upCommonGetProductImg(page) {
    if (page >= 0) {
        if (_g_productList_data[page]) {
            for (var i = 0; i < _g_productList_data[page].length; i++) {
                $("#img_" + _g_productList_data[page][i].product_id + "_pimg").attr('src', _g_res_images_url + loadProductImgUrl(_g_productList_data[page][i]));
            }
        }
    }
}


//收银查询结果
var stockClass = '';//库存的样式
function CommonGetProduct(list, nameFlag) {
    for (var j = 0; j < list.length; j++) {
        html = ' <li class="swiper-slide productlistboxaaa">';
        multipleproductnumber = list[j].length;
        for (var i = 0; i < list[j].length; i++)
        {
            var temp_sv_product_integral = "";
            if (list[j][i].sv_product_integral === null) {
                temp_sv_product_integral = "";
            } else if (list[j][i].sv_product_integral >= 0) {
                temp_sv_product_integral = list[j][i].sv_product_integral;
            }
            else {
                temp_sv_product_integral = "";
            }
            html += '<div data-mindiscount="' + list[j][i].sv_p_mindiscount + '" data-minunitprice="' + list[j][i].sv_p_minunitprice + '" ';
            html += 'data-memberprice="' + list[j][i].sv_p_memberprice + '" class="textlistbox" data-id="' + list[j][i].sv_p_barcode + '"  ';
            html += 'data-prid="' + list[j][i].product_id + '" data-pricingmethod="' + list[j][i].sv_pricing_method + '" '; // 打包价格
            html += 'data-prcombinationid="' + list[j][i].sv_is_combination + '" ';
            html += 'data-sv_product_type="' + list[j][i].sv_product_type + '" ';
            html += 'data-packprice="' + list[j][i].sv_packing_charges + '" data-printerip="' + (list[j][i].sv_printer_ip || '') + '" data-printerport="' + (list[j][i].sv_printer_port || '') + '" ';
            html += 'data-categoryId="' + list[j][i].productcategory_id + '" data-url="' + loadProductImgUrl(list[j][i]) + '" ';
            html += 'data-sv_p_commissiontype="' + (list[j][i].sv_p_commissiontype || "") + '" data-sv_p_commissionratio="' + (list[j][i].sv_p_commissionratio || "") + '" data-sv_product_integral="' + (temp_sv_product_integral) + '" ';
            html += 'data-sv_has_iemino="' + list[j][i].sv_has_iemino + '" data-sv_iemi_no="' + (list[j][i].sv_iemi_no||'') + '"';
            html += '>';
            html += '<input type="hidden" class="SelectAreaGoodsId" value="' + list[j][i].product_id + '">';
            html += '<a href="javascript:void(0);">';
            //html += ' <div class="teimg"><img src="' + _g_res_images_url + loadProductImgUrl(list[j][i]) + '" onerror="this.src=\'/images/omg1.jpg\';" >';
            html += ' <div class="teimg"><img id="img_' + list[j][i].product_id + '_pimg" src="" onerror="this.src=\'/images/omg1.jpg\';" >';
            html += '</div><div class="teitext">';
            var prodct_name = list[j][i].sv_p_name;
            if (prodct_name != null && prodct_name != '' && prodct_name != undefined) {
                if (prodct_name.length > 0) {
                    prodct_name = list[j][i].sv_p_name;
                }
            }
            else {
                prodct_name = "";
            }
            html += '<p class="productpicename"><span class="name">' + prodct_name + '</span></p>';
            if (MultiSpecification) {
                if (!list[j][i].sv_p_specs || list[j][i].sv_p_specs == "null") {
                    list[j][i].sv_p_specs = "";
                }
                html += '<div class="spec">' + list[j][i].sv_p_specs + '</div>';
                html += '<div class="productpice productpice2">¥<span class="jiage" data-sv_p_originalprice="' + list[j][i].sv_p_originalprice + '">' + returnFloat(list[j][i].sv_p_unitprice) + '</span>元';
                stockClass = "stockbottom10";
            } else {
                html += '<div class="productpice productpice1">¥<span class="jiage" data-sv_p_originalprice="' + list[j][i].sv_p_originalprice + '">' + returnFloat(list[j][i].sv_p_unitprice) + '</span>元';
                stockClass = "stockbottom0";
            }

            if (_g_sv_uit_cache_name != 'cache_name_catering') {
                html += '<div class="producttotal fr ' + stockClass + '" style="">';
                var sv_p_storage = (list[j][i].sv_p_storage || 0);
                var goodsNumber = (list[j][i].sv_p_storage || 0);
                if (list[j][i].sv_pricing_method == 1) { // sv_pricing_method == 1 计重商品
                    sv_p_storage = list[j][i].sv_p_total_weight;
                    goodsNumber = list[j][i].sv_p_total_weight;
                }

                if (sv_p_storage > 99) {
                    sv_p_storage = 99 + "+";
                    html += '<input type="hidden" class="goodsNumber" value="' + goodsNumber + '"> <i class="producttotaltype">库</i>';
                } else if (sv_p_storage < 0) {
                    html += ' <input type="hidden" class="goodsNumber" value="' + goodsNumber + '">  <i class="producttotaltype active">库</i>';
                } else {
                    html += ' <input type="hidden" class="goodsNumber" value="' + goodsNumber + '">  <i class="producttotaltype">库</i>';
                }

                html += '<span class="sv_p_storage">' + sv_p_storage + '</span></div>';
            }
            html += '</div></div></a></div> ';
        }
        html += ' </li>';
        $("#productlist").append(html);

        //商品图片高度
        var teming = $('.teimg img').width();
        $('.teimg img').height(teming);
        if (nameFlag != "" && multipleproductnumber == 1) {
            //检索是否按商品编码
            //当检索结果唯一，自动添加至清单
            //$("#productlist.swiper-wrapper li").eq(0).children(".textlistbox[data-id='" + nameFlag + "']").click();
            //按条码检索到唯一结果，并且非商品条码，表示为秤码
            if (_g_fast_query_isn && list[0][0] && _g_fast_query_isn.substring(2, 7) == list[0][0].sv_p_artno && $("#productlist.swiper-wrapper li").eq(0).children(".textlistbox[data-id='" + nameFlag + "']").length == 0) {
                //读取总价/数量并添加
                var str = "";
                var minunitprice = parseFloat(list[0][0].sv_p_minunitprice) || 0;
                var mindiscount = parseFloat(list[0][0].sv_p_mindiscount) || 0;
                var memberprice = parseFloat(list[0][0].sv_p_memberprice) || 0;
                var unitprice = parseFloat(list[0][0].sv_p_unitprice) || 0;
                //保留2位小数
                var _l_product_Total = (parseFloat(_g_fast_query_isn.substring(7, 12)) || 0) / 100;
                var _l_product_weight = 0;
                if (unitprice > 0) {
                    //条码打印，取销售价进行计算重量
                    _l_product_weight = parseFloat(_l_product_Total / unitprice).toFixed(2) || 0;
                }
                if (memberprice > 0) {
                    str = '<p class="nn4" style="color:red"><span class="fl">会员单价¥ <text class="memberprice">' + (memberprice).toFixed(2) + '</text></span></p>';
                } else if (mindiscount > 0) {
                    str = '<p class="nn4" style="color:red"><span class="fl">最低折扣 <text class="mindiscount">' + (mindiscount * 10).toFixed(2) + '</text>%</span></p>';
                } else if (minunitprice > 0) {
                    str = '<p class="nn4" style="color:red"><span class="fl">最低单价¥ <text class="minunitprice">' + (minunitprice).toFixed(2) + '</text></span></p>';
                }

                if (_l_product_Total > 0) {
                    //新增为
                    if ($("#" + list[0][0].product_id).length == 0 || true) {
                        var cashlefsitHtml = '<li data-mindiscount="' + mindiscount + '" data-minunitprice="' + parseFloat(minunitprice).toFixed(2) + '" ';
                        cashlefsitHtml += 'data-sv_product_type="' + list[0][0].sv_product_type + '" ';
                        cashlefsitHtml += 'data-prcombinationid="' + list[0][0].prcombinationid + '" ';
                        cashlefsitHtml += 'data-prname="' + list[0][0].sv_p_name + '" ';
                        cashlefsitHtml += 'data-prnumber="' + _l_product_weight + '" ';
                        cashlefsitHtml += 'data-untprice="' + list[0][0].sv_p_unitprice + '" ';
                        cashlefsitHtml += 'data-memberprice="' + parseFloat(memberprice).toFixed(2) + '" id="' + list[0][0].product_id + '" data-pricingmethod="' + 1 + '" data-categoryId="' + list[0][0].productcategory_id + '" data-url="' + loadProductImgUrl(list[0][0]) + '" data-sv_p_commissiontype="' + (list[0][0].sv_p_commissiontype || "") + '" data-sv_p_commissionratio="' + (list[0][0].sv_p_commissionratio || "")
                            + '" data-sv_product_integral="' + (list[0][0].sv_product_integral || "") + '"><div class="naelfe">' + osd + '';
                        cashlefsitHtml += '</div> <div class="naerigh"><p class="nn1">' + list[0][0].sv_p_name + '</p><p class="nn2"><span class="fl">';
                        cashlefsitHtml += '' + list[0][0].product_id + '</span><span class="fr">数量 <text class="nump" data-cnum="0">' + _l_product_weight + '</text></span></p> <p class="nn3">';
                        cashlefsitHtml += '<span class="fl">¥<text class="jiage" data-rjia="' + parseFloat(unitprice) + '"> ';
                        cashlefsitHtml += '' + parseFloat(unitprice).toFixed(2) + '</text></span><span class="fr">¥ <text class="zhong" data-zhekou="1" ';
                        cashlefsitHtml += 'data-sv_p_originalprice="' + parseFloat(unitprice).toFixed(2) + '"> ';
                        cashlefsitHtml += '' + _l_product_Total + '</span></p>' + str + '</div> </li>';
                        $("#Cashlefsit").prepend(cashlefsitHtml);
                        inspectCommodityWhetherZeroStock();
                    }
                    $("#queryproduct").val("");
                    zhonger();
                    queryProductFocus();
                }
            }
            else
            {
                //默认添加单件商品
                $("#productlist.swiper-wrapper li").eq(0).children(".textlistbox").click();
            }
        }
        _key_input_time_flag = true;
        mySwiper.updateSlidesSize();
        mySwiper.slideTo(0);
    }
    setTimeout(function () { upCommonGetProductImg(0); }, 500);
}


function returnFloat(value) {
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}

function clearNoNum(obj, strid) {
    if (obj != null && obj.value != null) {
        obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        CalculateGiving_topup(strid);
        // obj.value = returnFloat(obj.value);
    }
}


function clearNoNumSinglePage(obj, strid,pageid) {
    if (obj != null && obj.value != null)
    {
        obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        CalculateGiving_topupSinglePage(strid,pageid);
        // obj.value = returnFloat(obj.value);
    }
}

function verifyenable(id) {
    $.ajax({
        url: "/System/VerifyEnable?name=" + id + "&userid=" + $("#userid").val(),
        dataType: "json",
        async: true,
        success: function (data) {
            if (data == 1) {
                jiesuan($("#xianjinname").text());
                return false;
            }
            else if (data == 2) {
                layer.msg("会员信息错误！");
                return false;
            }
            else if (data == 3) {
                Deke.DeKe_dialog.show_Url2("请输入会员密码", "/html/cash/huiyuanpwd.html?v=489498498", baochuuserpwd, ['', '230px']);
            }
        }
    });
}

function baochuuserpwd() {
    $("#member_id").val($('#huiyuan_id').attr('data-id'));
    $("#sv_mr_pwd").focus();

    $("#baochuuser").click(function () {
        $.post("/System/VerifyEnable", {
            name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val()
        }, function (data) {
            if (data == 1) {
                jiesuan($("#xianjinname").text())
                layer.close(index);
                return false;
            }
            else if (data == 4) {
                layer.msg("会员密码输入有误");
                $("#sv_mr_pwd").val("");
            }
        });
    });
    $("#sv_mr_pwd").keypress(function (event) {
        if (event.which == 13) {
            var memberPwd = $("#sv_mr_pwd").val();
            if (isNullOrWhiteSpace(memberPwd)) {
                $.post("/System/VerifyEnable", {
                    name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val()
                }, function (data) {
                    if (data == 1) {
                        jiesuan($("#xianjinname").text(), 1)
                        layer.close(index);
                        return false;
                    }
                    else if (data == 4) {
                        layer.msg("会员密码输入有误！");
                    }
                });
            }
            else {
                layer.msg("请输入会员密码！");
            }
        }
    });

}

// 拼接订单json
function orderlistJson() {
    GetEmployessid();
    productlist = '';
    productlist += '[';
    $("#Cashlefsit > li").each(function () {
        //折扣处理
        var descount = 0;
        var origprice = 0;
        var newdescount = 0;
        var product_orig_discount = 0;
        var member_id = $('#huiyuan_id').attr('data-id'); // 会员Id
        //alert($(this).find(".zhong").data("zhekou"));
        if (parseFloat(_member_discount) != 1 && $(this).attr("id") > 0) {
            var number = $(this).find(".nump").text();//数量
            descount = (parseFloat(_member_discount) / 100);
            product_orig_discount = descount;
            var origprice = parseFloat($(this).find(".jiage").text());//原商品单价
            //-----------------------------会员售价，最低折扣，最低售价

            if (member_id != null && member_id != '' && member_id != '0' && member_id != undefined) {
                //最低价计算
                var minprice = parseFloat($(this).data("minunitprice"));
                //最低总价=最低价*数量
                var mintotalprice = parseFloat(minprice * number);
                //最低折扣价计算
                var mindiscount = parseFloat($(this).data("mindiscount")) / 10;
                //原总价=原单价*数量*会员折扣
                origtotalprice = parseFloat(origprice * number * descount);
                //会员价计算
                var memberprice = parseFloat($(this).data("memberprice"));
                if (memberprice > 0) {
                    //会员价商品
                    origprice = memberprice;
                    descount = 1;
                } else if (mindiscount > 0 && descount < mindiscount) {
                    //最低折扣商品：会员折扣小于最低折扣
                    descount = mindiscount;
                } else if (minprice > 0 && origtotalprice < mintotalprice) {
                    ///最低价商品：最低价计算 会员价小于最低价
                    origprice = minprice;
                    descount = 1;
                }
                //--------------------------
                origprice = parseFloat(origprice * descount);
            }
        } else {
            if ($(this).attr("id") == 0 && parseFloat(_member_discount) != 1) {
                origprice = parseFloat($(this).find(".jiage").text() * (parseFloat(_member_discount) / 100));

            } else {
                origprice = parseFloat($(this).find(".jiage").text());
            }
        }
        productlist += '{"product_id":' + $(this).attr("id") + ',"product_name":"' + replaceStr($(this).find(".nn1").text(), "''") + '","product_num":' + $(this).find(".nump").text() + ',"product_unitprice":' + origprice + ',"product_discount":' + descount + ',"product_total":' + origprice * parseFloat($(this).find(".nump").text()) + ',"product_pleased":' + $(this).find(".zhong").data("sv_p_originalprice") + ',"type":' + $(this).hasClass("product_type") + ',"cnum":' + $(this).find(".nump").data("cnum") + ',"product_orig_discount":' + product_orig_discount + ', "sv_commissionemployes":"' + StrEmployeelId + '","sv_pricing_method":' + $(this).attr("data-pricingmethod") + ',"sv_p_commissiontype":"' + ($(this).attr("data-sv_p_commissiontype") || 0) + '","sv_p_commissionratio":"' + ($(this).attr("data-sv_p_commissionratio") || "") + '" ,"sv_product_integral":"' + ($(this).attr("data-sv_product_integral") || "") + '"},';

    });
    productlist = productlist.substring(0, productlist.length - 1);

    productlist += "]";
    // $("body").append();z
    productlist = JSON.parse(productlist);
}
/*字符串替换*/
function replaceStr(str, targetstr) {
    if (isNullOrWhiteSpace(str) && str.indexOf('\'') > -1) {
        str = str.replace(/'/ig, targetstr);
        return str;
    }
    else {
        return str;
    }
}

// 清除房台牌号人数信息
function commondCleanCateringGrade(state) {
    $('#catering_CateringGrade').text('').attr('data-tableId', 0).attr('data-withListId', 0).attr('data-personNum', 0).attr('data-together', false).attr('data-addFood', false);
    productlistJsonList = [];
    // $('#openCateringTableContent').hide();
    if (state) {
        closeCateringFunc(state);
    }
    else {
        closeCateringFunc(-1);
    }
}

// 对房台牌号进行赋值操作
function setCateringGradeInfo(text, tableId, withListId, personNum, together, addFood) {
    $('#catering_CateringGrade').text(text).attr('data-tableId', tableId).attr('data-withListId', withListId).attr('data-personNum', personNum).attr('data-together', together).attr('data-addFood', addFood);
}

// 结算
function jiesuan(xianjinname, j) {

    GetEmployessid();
    //判断是否有其他窗口遮挡
    var ischongzhuWindows = $('#ischongzhuWindows').val();
    if (ischongzhuWindows)
        return;


    var money = $("#yinshou").val();
    var daishou = $('#daishou').val();
    var orderMoney = $('#xianjin').val();
    var order_payment = $("#xianjinname").text();
    var totalAmount = $("#jieshuajie").text();
    var givingtype = $("#sv_user_givingtype").val();
    var deserved = $("#sv_sumobtain_value").val();
    // orderlistJson();
    if (productlistJsonList == null || productlistJsonList.length == 0) {
        zhonger();
    }

    var cm = true;
    //if ($("#Cashlefsit li:not('.product_type')").length > 0) {}
    var payment2 = $("#daoshouname").text(); // 组合支付中的第二种方式 判断.text是否为微信支付，或者支付宝支付、扫码支付
    var _order_remark = $('#order_remark').val();
    if (payment2 == '待收') {
        if (parseFloat(money) > parseFloat(orderMoney) && parseFloat(daishou) > 0) {
            layer.msg('请检查当前待收金额和实收金额是否正确！');
            $("#yinshou").focus();
            return;
        }
    }

    if (_order_remark && _order_remark.indexOf("'") > 0) {
        //特殊字符串过滤：'
        _order_remark = _order_remark.replace("'", "''");
    }
    var user_cardno = "0";
    if ($('#huiyuan_id').attr('data-id') != null && $('#huiyuan_id').attr('data-id') != '' && !$('#huiyuan_id').attr('data-id') != undefined) {
        user_cardno = $('#huiyuan_id').attr('data-id');
    }
    if (!isNullOrWhiteSpace($("#danhao").text())) { // 流水号不存在情况重新获取流水号
        shuxin();
    }

    //提成员工信息
    if (productlistJsonList && productlistJsonList.length > 0) {
        for (var i = 0; i < productlistJsonList.length; i++) {
            if (productlistJsonList && productlistJsonList.length > 0) {
                productlistJsonList[i].sv_commissionemployes = StrEmployeelId;
            }
        }
    }

    if (!productlistJsonList || (productlistJsonList && productlistJsonList.length == 0))
    {
        layer.msg("订单商品信息异常，请刷新后重试！");
        return;
    }

    var data2 = {
        "everyday_serialnumber": GetDailySerialNumber(true),
        "integral": _g_deductIntegral,
        "availableIntegralSwitch": availableIntegralSwitch,
        "rankDemotion": rankDemotion,
        "MembershipGradeGroupingIsON": MembershipGradeGroupingIsON,
        "rankPromotionIsON": rankPromotionIsON,
        "prlist": productlistJsonList,
        "order_running_id": $("#danhao").text(),
        "order_receivable": $("#yinshou").val(),
        "order_payment": $("#xianjinname").text(),
        "order_money": $("#xianjin").val(),
        "order_payment2": $("#daoshouname").text(),
        "order_money2": $("#daishou").val(),
        "order_change": $("#yinshou").val(),
        "user_cardno": user_cardno,
        "order_discount": (parseFloat($("#ttuser_descount").val()) / 100).toFixed(5),
        "order_receivabley": $("#yinshou").data("val"),
        "sv_remarks": _order_remark,
        "givingtype": givingtype,
        "deserved": (deserved || 0),
        sv_recommended_peopleid: $("#sv_recommended_peopleid").val(),
        free_change: $('#jieshuaanniu').attr("freechange"),
        sv_member_discount: (parseFloat($("#user_descount").text()) / 100).toFixed(2),
        sv_member_total_money: parseFloat($('#jieshuajie2').text()),
        sv_order_total_money: parseFloat($('#jieshuajie').text()),
        sv_give_change: parseFloat($('#zhaoling').val()),
        authcode: "",
        type: "", // 微信或支付宝支付类型（扫条码，扫二维码）
        WhetherAsCatering: true, // 临时标记为餐饮
        sv_table_id: ($('#catering_CateringGrade').attr('data-tableid') || 0),// 房台id 
        sv_catering_grade: ($('#catering_CateringGrade').text() || ''),
        meiridanhao: $("#meiridanhao").text(),
        sv_coupon_amount: ($('#hidden_coupon_amount').val() || 0),// 优惠券金额
        sv_coupon_discount: ($('#hidden_coupon_discount').val() || 0), // 优惠券折扣 ，
        sv_without_list_id: ($('#catering_CateringGrade').attr('data-withListId') || 0),
        sv_person_num: ($('#catering_CateringGrade').attr('data-personNum') || 0),// 就餐人数
        sv_order_source: 0, // 订单来源
        sv_record_id: ($('#hidden_coupon_record_id').val() || 0)
    };



    if (StrEmployeelId) {
        data2.sv_commissionemployes = StrEmployeelId;
    }
    var printflat = $(".biglis").hasClass("open");
    //现金、储值卡支付
    if ((xianjinname == '微信支付' || payment2 == '微信支付') && sv_enable_wechatpay == true) {
        layer.closeAll('loading');
        if (payment2 == '微信支付' && isNullOrWhiteSpace(daishou) && parseFloat(daishou) <= 0) {
            layer.msg('微信支付金额必须大于0');
            return;
        }
        weChatPay(data2); // 微信二维码支付
    }
    else if (xianjinname == '扫码支付' || payment2 == '扫码支付') {
        layer.closeAll('loading');
        if (payment2 == '扫码支付' && isNullOrWhiteSpace(daishou) && parseFloat(daishou) <= 0) {
            layer.msg('扫码支付支付金额必须大于0');
            return;
        }
        Deke.DeKe_dialog.show_Url2WithData("扫码支付", "/html/cash/barCodePay.html?v=250", barCodePay, ['550px', '380px'], data2);         // 微信或支付宝扫码支付
    }
    else if ((xianjinname == '支付宝' || payment2 == '支付宝') && sv_enable_alipay == true) {
        layer.closeAll('loading');
        if (payment2 == '支付宝' && isNullOrWhiteSpace(daishou) && parseFloat(daishou) <= 0) {
            layer.msg('支付宝支付金额必须大于0');
            return;
        }
        alliPay(data2); // 支付宝扫码支付
    }
    else {
        var loadIndex = layer.msg("正在提交数据请稍后...", {
            icon: 16, shade: 0.01, time: 0
        });
        disableButton("jieshuaanniu");
        if (j == 1 || $("#Cashlefsit li:not('.product_type')").length == 0) {
            $.ajax({
                url: '/settle/Post_settle',
                type: 'post',
                data: JSON.stringify(data2),
                contentType: 'application/json',
                async: false,
                success: function (data) {
                    enabledButton("jieshuaanniu");
                    layer.close(loadIndex);
                    if (data.bl) {
                        resetSettlementInformation(); // 清除信息
                        layer.closeAll();
                        layer.open({
                            type: 1,
                            area: ['300px', '200px'],
                            shadeClose: false,
                            content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + money + '</p><p>' + order_payment + '结算 交易成功 </p>\<\/div>',
                            time: '1500',
                        })
                        $(".layui-layer").css({
                            borderRadius: 5,
                        });
                        $(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                        //读取配置
 
                        if (printflat) {
                            data2["user"] = data.user;
                            $.getJSON("/system/Getprint", function (data) {
                                pushprintData(JSON.stringify(data2), JSON.stringify(data), 0, totalAmount, deserved, givingtype);
                                cateringPrint(data2, data);
                            });
                        }
                        queryProductFocus();
                    }
                    else {
                        layer.msg("操作失败！");
                    }
                }
            });
        }
        else {
            disableButton("jieshuaanniu");
            $.ajax({
                url: '/settle/Post_settle',
                type: 'post',
                data: JSON.stringify(data2),
                contentType: 'application/json',
                async: false,
                success: function (data) {
                    layer.close(loadIndex);
                    enabledButton("jieshuaanniu");
                    if (data.bl) {
                        resetSettlementInformation(); // 清除信息
                        layer.closeAll();
                        //layer.msg("结算成功！");
                        layer.open({
                            type: 1,
                            area: ['300px', '200px'],
                            shadeClose: false,
                            content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + money + '</p><p>' + order_payment + '结算 交易成功 </p>\<\/div>',
                            time: '1500',
                        })
                        $(".layui-layer").css({
                            borderRadius: 5,
                        });
                        $(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                        //读取配置

                        if (printflat) {
                            data2["user"] = data.user;
                            $.getJSON("/system/Getprint", function (data) {
                                pushprintData(JSON.stringify(data2), JSON.stringify(data), 0, totalAmount, deserved, givingtype);
                                cateringPrint(data2, data);
                            });
                        }
                        queryProductFocus();
                    }
                    else {
                        layer.msg("操作失败！");
                    }
                }
            });
        }
    }
}

// 微信二维码支付
function weChatPay(data2) {
    if (data2) {
        var money = $("#yinshou").val();
        var printflat = $(".biglis").hasClass("open");
        var order_payment = $("#xianjinname").text();
        var totalAmount = $("#jieshuajie").text();
        var givingtype = $("#sv_user_givingtype").val();
        var deserved = $("#sv_sumobtain_value").val();
        var orderTime = 0;
        var user_cardno = "0";
        if ($('#huiyuan_id').attr('data-id') != null && $('#huiyuan_id').attr('data-id') != '' && !$('#huiyuan_id').attr('data-id') != undefined) {
            user_cardno = $('#huiyuan_id').attr('data-id');
        }
        data2.type = "scan"; // 标记为扫二维码支付操作
        // 切换为扫码支付       
        disableButton("jieshuaanniu");
        $.ajax({
            url: '/settle/WeChatPay',
            type: 'post',
            data: JSON.stringify(data2),
            contentType: 'application/json',
            async: false,
            success: function (data) {
                if (data.succeed == true) {
                    var scanPay = "<div id=\"wechatPayImgShow\" data-value=\"true\" class=\"wxsaosao\"><img src=\"/images/WePayLogo.png\" width=\"100\" class=\"kkimg\"><img src=" + data.values + " width=\"200\" class=\"bbimg\"></div>";
                    //商米分屏显示二维码+应收
                    show_Android_Pos_T1_SecondScreen(money, data.values);
                    layer.open({
                        type: 1,
                        title: "微信扫一扫支付",
                        area: ['420px', '440px'],
                        content: scanPay
                    });
                    var wechatPayImgShow = $('#wechatPayImgShow').attr('data-value');
                    order_query_pending = false;
                    var iCount = setInterval(function() {
                        console.log("iCount=" + iCount);
                        orderTime += 3;
                        if (orderTime <= 600 && wechatPayImgShow) {
                            wechatPayImgShow = $('#wechatPayImgShow').attr('data-value');
                            if (g_dec_payment_method == "5" || g_dec_payment_method == "6") {
                                data2.user_id = user_id;
                                data2.order_number = data.errmsg;
                                if (!order_query_pending) {
                                    order_query_pending = true;
                                    $.ajax({
                                        url: 'http://api.decerp.cc/api/OrderQuery',
                                        type: 'post',
                                        dataType: "json",
                                        contentType: 'application/json; charset=UTF-8',
                                        data: JSON.stringify(data2),
                                        success: function(result) {
                                            if (result.succeed) {
                                                clearInterval(iCount);
                                                resetSettlementInformation(); // 清除信息
                                                layer.closeAll();
                                                layer.open({
                                                    type: 1,
                                                    area: ['300px', '200px'],
                                                    shadeClose: false,
                                                    content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + money + '</p><p>' + order_payment + '结算 交易成功 </p>\<\/div>',
                                                    time: '1500'
                                                });
                                                if (printflat) {
                                                    $.getJSON("/system/Getprint", function (data) {
                                                            pushprintData(JSON.stringify(data2), JSON.stringify(data), 0, totalAmount, deserved, givingtype);
                                                            cateringPrint(data2, data);
                                                        });
                                                }
                                                $(".layui-layer").css({
                                                    borderRadius: 5,
                                                });
                                                $(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                                                queryProductFocus();
                                                layer.closeAll();
                                            }
                                            order_query_pending = false;
                                        },
                                        error: function(e) {
                                            order_query_pending = false;
                                        }
                                    });
                                }
                            } else
                            {
                                if (!order_query_pending)
                                {
                                    order_query_pending = true;

                                    $.ajax({
                                        url: "/settle/GetPaymentResult?orderNumber=" + data.errmsg,
                                        type: 'get',
                                        dataType: 'json',
                                        async: true,
                                        cache: false,
                                        success: function(_data) {
                                            if (_data.succeed == true)
                                            {
                                                clearInterval(iCount);
                                                resetSettlementInformation(); // 清除信息
                                                layer.closeAll();
                                                layer.open({
                                                    type: 1,
                                                    area: ['300px', '200px'],
                                                    shadeClose: false,
                                                    content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + money + '</p><p>' + order_payment + '结算 交易成功 </p>\<\/div>',
                                                    time: '1500',
                                                });
                                                if (printflat)
                                                {
                                                    if (_data && _data.values && _data.values.user)
                                                    {
                                                        data2["user"] = _data.values.user;
                                                    }
                                                    $.getJSON("/system/Getprint", function(data) {
                                                        pushprintData(JSON.stringify(data2), JSON.stringify(data), 0, totalAmount, deserved, givingtype);
                                                        cateringPrint(data2, data);
                                                    });
                                                }
                                                $(".layui-layer").css({
                                                    borderRadius: 5,
                                                });
                                                $(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                                                queryProductFocus();
                                                layer.closeAll();
                                            }
                                            order_query_pending = false;
                                        },
                                        error: function(e) {
                                            order_query_pending = false;
                                        }
                                    });


                                }
                            }
                        }
                        else {
                            clearInterval(iCount);
                            //--增加迅联支付订单的取消操作
                            order_query_pending = false;
                            //alert("您的订单已过期失效！");
                            if (g_dec_payment_method == "3") {
                                try {//迅联支付
                                    var payConifg = JSON.parse(g_dec_payment_config);
                                    if (payConifg) {
                                        $.post('http://qcode.decerp.cc/api/XLPay/CancelPay',
                                        { "inscd": payConifg.inscd, "mchntid": payConifg.mchntid, "signKey": payConifg.signKey, "outOrderNum": data.errmsg },
                                        function () { });
                                    }
                                } catch (e) {

                                }

                            }
                            //location.reload();
                        }
                    }, 5000);
                }
                else {
                    $("#wxauthcode").val("");
                    layer.closeAll('loading');
                    //layer.msg(data.errmsg);
                    var err_msg= "发起微信支付失败，请检查支付配置后重新发起交易！" ;

                    layer.confirm(err_msg, {
                        btn: ["确认", "取消"]
                    }, function() {
                        enabledButton("jieshuaanniu");
                        layer.close(layer.index);
                    });
                }
            }
        });
    }
}

// 微信或支付宝扫码支付
function barCodePay(data2) {
    var orderTime = 0;
    data2.user_id = user_id;
    $("#authcode").focus();
    var iCount;
    var totalAmount = $("#jieshuajie").text();
    var givingtype = $("#sv_user_givingtype").val();
    var deserved = $("#sv_sumobtain_value").val();
    setTimeout(function () {
        $('#authcode').keypress(function (event) {
            var authcode = $(this).val().trim();
            if (event.keyCode == 13) {
                wxauthcode_waitfor = false;
                wxauthcode_isSuccess = false;
                if (authcode != null && authcode != undefined && authcode != '' && authcode.length > 10) {
                    //if (authcode.substring(0, 2) == 13) {
                    //    if (data2.order_payment == '扫码支付') {
                    //        data2.order_payment = '微信支付';
                    //    }
                    //    if (data2.order_payment2 == '扫码支付')
                    //    {
                    //        data2.order_payment2 = '微信支付';
                    //    }
                    //} else if (authcode.substring(0, 2) == 28) {
                    //    if (data2.order_payment == '扫码支付')
                    //    {
                    //        data2.order_payment = '支付宝';
                    //    }
                    //    if (data2.order_payment2 == '扫码支付')
                    //    {
                    //        data2.order_payment2 = '支付宝';
                    //    }
                    //}
                    if (wxauthcode_isSuccess) {
                        wxauthcode_isSuccess = false;
                        clearInterval(iCount);
                    }
                    else if (!wxauthcode_waitfor && !wxauthcode_isSuccess) {
                        authcode_pay(data2);
                        if (wxauthcode_waitfor) {
                            order_query_pending = false;
                            setTimeout(function () {
                                iCount = setInterval(function () {
                                    var isShowbarCodePayWindows = $('#isShowbarCodePayWindows').val();
                                    if (isShowbarCodePayWindows) {
                                        orderTime += 3;
                                        if (orderTime <= 800)
                                        {
                                            if (!order_query_pending) {
                                                order_query_pending = true;
                                                
                                                if (g_dec_payment_method == "3") //----迅联支付通道,查询
                                                {
                                                    $.ajax({
                                                        url: 'http://api.decerp.cc/api/OrderQuery',
                                                        type: 'post',
                                                        dataType: "json",
                                                        contentType: 'application/json; charset=UTF-8',
                                                        data: JSON.stringify(data2),
                                                        success: function (result) {
                                                            if (result.succeed) {
                                                                clearInterval(iCount);
                                                                $("#wxauthcode").val("");
                                                                layer.closeAll();
                                                                layer.open({
                                                                    type: 1,
                                                                    area: ['300px', '200px'],
                                                                    shadeClose: false,
                                                                    content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + data2.order_receivable + '</p><p>结算 交易成功 </p>\<\/div>',
                                                                    time: '1500',

                                                                });
                                                                $.getJSON("/system/Getprint", function (data) {
                                                                        pushprintData(JSON.stringify(data2), JSON.stringify(data), 0, totalAmount, deserved, givingtype);
                                                                        cateringPrint(data2, data);
                                                                    });
                                                                resetSettlementInformation();
                                                                // 清除信息                                                                                             
                                                            }
                                                            order_query_pending = false;
                                                        },
                                                        error: function(e) {
                                                            order_query_pending = false;
                                                        }
                                                    });
                                                } else if (g_dec_payment_method == "5" || g_dec_payment_method == "6") {
                                                    $.ajax({
                                                        url: 'http://api.decerp.cc/api/OrderQuery',
                                                        type: 'post',
                                                        dataType: "json",
                                                        contentType: 'application/json; charset=UTF-8',
                                                        data: JSON.stringify(data2),
                                                        success: function (result) {
                                                            if (result.succeed) {
                                                                clearInterval(iCount);
                                                                $("#wxauthcode").val("");
                                                                layer.closeAll();
                                                                layer.open({
                                                                    type: 1,
                                                                    area: ['300px', '200px'],
                                                                    shadeClose: false,
                                                                    content:
                                                                        '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + data2.order_receivable + '</p><p>结算 交易成功 </p>\<\/div>',
                                                                    time: '1500',

                                                                });
                                                                $.getJSON("/system/Getprint",
                                                                    function(data) {
                                                                        pushprintData(JSON.stringify(data2),
                                                                            JSON.stringify(data),
                                                                            0,
                                                                            totalAmount,
                                                                            deserved,
                                                                            givingtype);
                                                                        cateringPrint(data2, data);
                                                                    });
                                                                resetSettlementInformation();
// 清除信息                                                                                             
                                                            } 
                                                            order_query_pending = false;
                                                        },
                                                        error: function(e) {
                                                            order_query_pending = false;
                                                        }
                                                    });
                                                }
                                                else {  //-----默认支付通道

                                                    $.ajax({
                                                        url: 'http://api.decerp.cc/api/OrderQuery',
                                                        type: 'post',
                                                        dataType: "json",
                                                        contentType: 'application/json; charset=UTF-8',
                                                        data: JSON.stringify(data2),
                                                        success: function (result) {
                                                            if (result.succeed) {
                                                                clearInterval(iCount);
                                                                $("#wxauthcode").val("");
                                                                layer.closeAll();
                                                                layer.open({
                                                                    type: 1,
                                                                    area: ['300px', '200px'],
                                                                    shadeClose: false,
                                                                    content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + data2.order_receivable + '</p><p>结算 交易成功 </p>\<\/div>',
                                                                    time: '1500',

                                                                });
                                                                $.getJSON("/system/Getprint",
                                                                    function(data) {
                                                                        pushprintData(JSON.stringify(data2),
                                                                            JSON.stringify(data),
                                                                            0,
                                                                            totalAmount,
                                                                            deserved,
                                                                            givingtype);
                                                                        cateringPrint(data2, data);
                                                                    });
                                                                resetSettlementInformation();
// 清除信息                                                                                             
                                                            } 
                                                            order_query_pending = false;
                                                        },
                                                        error: function(e) {
                                                            order_query_pending = false;
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        else {
                                            //console.log(new Date().Format("hh:mm:ss"));
                                            clearInterval(iCount);
                                            $('#errorMsg').html("您的订单已过期失效！");
                                            $('#authcode').removeAttr("disabled");
                                            $('#authcode').val('');
                                            order_query_pending = false;
                                        }
                                    }
                                    else {
                                        clearInterval(iCount);
                                        order_query_pending = false;
                                    }
                                }, 3000);
                            }, 1000);
                        }
                    }
                }
                else {
                    $('#errorMsg').html("请填写正确的支付码！");
                }
            }
        });
    }, 150);
}

// 微信或支付宝扫码支付方法
function authcode_pay(data2) {
    if (data2) {
        $('#authcode').attr("disabled", "disabled");
        var totalAmount = $("#jieshuajie").text();
        var givingtype = $("#sv_user_givingtype").val();
        var deserved = $("#sv_sumobtain_value").val();
        var printflat = $(".biglis").hasClass("open");
        var user_cardno = "0";
        var totalOrderMoney = $("#yinshou").val();
        if ($('#huiyuan_id').attr('data-id') != null && $('#huiyuan_id').attr('data-id') != '' && !$('#huiyuan_id').attr('data-id') != undefined) {
            user_cardno = $('#huiyuan_id').attr('data-id');
        }
        data2.type = "";
        data2.authcode = $('#authcode').val().trim(); // 微信或支付宝条码
        disableButton("jieshuaanniu");
        $.ajax({
            url: '/settle/BarCodePay',
            type: 'post',
            data: JSON.stringify(data2),
            contentType: 'application/json',
            async: false,
            success: function (_data) {
                enabledButton("jieshuaanniu");
                if (_data.succeed == true) {
                    wxauthcode_isSuccess = true;
                    wxauthcode_waitfor = false; // 不需要等待密码输入
                    $('#authcode').removeAttr("disabled");
                    resetSettlementInformation(); // 清除信息
                    $("#wxauthcode").val("");
                    layer.closeAll();
                    layer.open({
                        type: 1,
                        area: ['300px', '200px'],
                        shadeClose: false,
                        content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + totalOrderMoney + '</p><p>结算 交易成功 </p>\<\/div>',
                        time: '1500',
                    });
                    //读取配置
                    if (printflat) {
                        if (_data.values && _data.values.user && _data.values.user != undefined) {
                            data2["user"] = _data.values.user;
                        }                        
                        $.getJSON("/system/Getprint", function (data) {
                            pushprintData(JSON.stringify(data2), JSON.stringify(data), 0, totalAmount, deserved, givingtype);
                            cateringPrint(data2, data);
                        });
                    }
                    queryProductFocus();
                }
                else {
                    $("#wxauthcode").val("");
                    layer.closeAll('loading');
                    if (_data.errmsg == "需要用户输入支付密码" || _data.errmsg == "待买家支付" || _data.errmsg == "等待支付" || _data.errmsg == "正在等待用户确认...") {
                        wxauthcode_waitfor = true;
                        $('#errorMsg').html("正在等待用户输入密码！");
                        data2.order_number = _data.values;
                        data2.isWaitingPwd = true;
                    }
                    else {
                        $('#authcode').removeAttr("disabled");
                        wxauthcode_waitfor = false;
                        $('#errorMsg').html(_data.errmsg);
                    }
                }
            }
        });
    }
}

// 支付宝二维码支付
function alliPay(data2) {
    if (data2) {
        var money = $("#yinshou").val();
        var printflat = $(".biglis").hasClass("open");
        var order_payment = $("#xianjinname").text();
        var totalAmount = $("#jieshuajie").text();
        var givingtype = $("#sv_user_givingtype").val();
        var deserved = $("#sv_sumobtain_value").val();
        var orderTime = 0;
        var user_cardno = "0";
        if ($('#huiyuan_id').attr('data-id') != null && $('#huiyuan_id').attr('data-id') != '' && !$('#huiyuan_id').attr('data-id') != undefined) {
            user_cardno = $('#huiyuan_id').attr('data-id');
        }
        data2.type = "scan";
        disableButton("jieshuaanniu");
        $.ajax({
            url: '/settle/AliBarCodePay',
            type: 'post',
            data: JSON.stringify(data2),
            contentType: 'application/json',
            async: false,
            success: function (data) {
                enabledButton("jieshuaanniu");
                if (data.succeed == true && isNullOrWhiteSpace(data.values)) {
                    var scanPay = "<div id=\"aliPayImgShow\" data-value=\"true\" class=\"wxsaosao\"><img src=\"/images/alipaylogo.png\" width=\"100\" class=\"kkimg\"><img src=" + data.values + " width=\"200\" class=\"bbimg\"></div>";
                    //商米分屏显示二维码+应收
                    show_Android_Pos_T1_SecondScreen(money, data.values);
                    layer.open({
                        type: 1,
                        title: "支付宝扫一扫支付",
                        area: ['420px', '440px'],
                        content: scanPay
                    });
                    var aliPayImgShow = $('#aliPayImgShow').attr('data-value');
                    setTimeout(function() {
                        order_query_pending = false;
                        var iCount = setInterval(function () {
                            orderTime += 3;
                            if (orderTime <= 600 && aliPayImgShow) {
                                aliPayImgShow = $('#aliPayImgShow').attr('data-value');
                                if (g_dec_payment_method == "5" || g_dec_payment_method == "6")
                                {
                                    data2.user_id = user_id;
                                    data2.order_number = data.errmsg;
                                    if (!order_query_pending)
                                    {
                                        order_query_pending = true;
                                        $.ajax({
                                            url: 'http://api.decerp.cc/api/OrderQuery',
                                            type: 'post',
                                            dataType: "json",
                                            contentType: 'application/json; charset=UTF-8',
                                            data: JSON.stringify(data2),
                                            success: function(result) {
                                                if (result.succeed)
                                                {
                                                    clearInterval(iCount);
                                                    layer.closeAll();
                                                    layer.open({
                                                        type: 1,
                                                        area: ['300px', '200px'],
                                                        shadeClose: false,
                                                        content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + money + '</p><p>' + order_payment + '结算 交易成功 </p>\<\/div>',
                                                        time: '1500'
                                                    }).then(function() {
                                                        resetSettlementInformation(); // 清除信息
                                                    });
                                                    if (printflat)
                                                    {
                                                        $.getJSON("/system/Getprint", function(data) {
                                                            pushprintData(JSON.stringify(data2), JSON.stringify(data), 0, totalAmount, deserved, givingtype);
                                                            cateringPrint(data2, data);
                                                        });
                                                    }
                                                    $(".layui-layer").css({
                                                        borderRadius: 5,
                                                    });
                                                    $(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                                                    layer.closeAll();
                                                }
                                                order_query_pending = false;
                                            },
                                            error: function(e) {
                                                order_query_pending = false;
                                            }
                                        });
                                    }
                                } else
                                {
                                    if (!order_query_pending)
                                    {
                                        order_query_pending = true;
                                        $.ajax({
                                            url: "/settle/GetPaymentResult?orderNumber=" + data.errmsg,
                                            type: 'get',
                                            dataType: 'json',
                                            async: true,
                                            cache: false,
                                            success: function(_data) {
                                                if (_data.succeed == true)
                                                {
                                                    clearInterval(iCount);
                                                    //alert("支付成功");
                                                    layer.closeAll();
                                                    layer.open({
                                                        type: 1,
                                                        area: ['300px', '200px'],
                                                        shadeClose: false,
                                                        content:
                                                            '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">￥' + money + '</p><p>' + order_payment + '结算 交易成功 </p>\<\/div>',
                                                        time: '1500',
                                                    }).then(function() {
                                                        resetSettlementInformation(); // 清除信息
                                                    });

                                                    if (printflat)
                                                    {
                                                        if (_data && _data.values && _data.values.user)
                                                        {
                                                            data2["user"] = _data.values.user;
                                                        }
                                                        $.getJSON("/system/Getprint",
                                                            function(data) {
                                                                pushprintData(JSON.stringify(data2),
                                                                    JSON.stringify(data),
                                                                    0,
                                                                    totalAmount,
                                                                    deserved,
                                                                    givingtype);
                                                                cateringPrint(data2, data);
                                                            });
                                                    }
                                                    $(".layui-layer").css({
                                                        borderRadius: 5,
                                                    });
                                                    $(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade")
                                                        .css("display", "none");

                                                    layer.closeAll();
                                                }

                                                order_query_pending = false;
                                            },
                                            error: function(e) {
                                                order_query_pending = false;
                                            }
                                        });
                                    }
                                }
                            }
                            else {
                                clearInterval(iCount);
                                order_query_pending = false;
                                //alert("您的订单已过期失效！");
                                if (g_dec_payment_method == "3") {
                                    //迅联支付
                                    try {
                                        var payConifg = JSON.parse(g_dec_payment_config);
                                        if (payConifg) {
                                            $.post('http://qcode.decerp.cc/api/XLPay/CancelPay',
                                            { "inscd": payConifg.inscd, "mchntid": payConifg.mchntid, "signKey": payConifg.signKey, "outOrderNum": data.errmsg },
                                            function () { });
                                        }
                                    } catch (e) {

                                    }
                                }

                                //location.reload();
                            }
                        }, 3000);
                    }, 2000);
                }
                else {
                    $("#wxauthcode").val("");
                    layer.closeAll('loading');
                    //layer.msg(data.errmsg);
                    var err_msg= "发起支付宝支付失败，请检查支付配置后重新发起交易！";

                  layer.confirm(err_msg, {
                        btn: ["确认", "取消"]
                    }, function() {
                        enabledButton("jieshuaanniu");
                        layer.close(layer.index);
                    });
                }
            }
        });
    }
}
//添加无码
function nocodingAdd() {
    $("#nocoding").click(function () {
        var nocodingCash = parseFloat($("#queryproduct").val().replace(/\ +/g, "") || 0);
        if (nocodingCash > 0 && nocodingCash < 100001) {
            if ($(".nocoding_" + nocodingCash).length == 0) {
                var nocodingAddHtml = '<li data-mindiscount=0"' + '" data-minunitprice=0 data-prnumber="1"  data-memberprice=0  id=0  data-pricingmethod="0" ';
                nocodingAddHtml += 'class=nocoding_' + nocodingCash + ' data-categoryId="0" data-url="" ';
                nocodingAddHtml += 'data-prname="无码收银" data-untprice="' + returnFloat(nocodingCash) + '" ';
                nocodingAddHtml += 'data-sv_p_commissiontype="" data-sv_p_commissionratio="" data-sv_product_integral="" ';
                nocodingAddHtml += '><div class="naerigh"><p class="nn1">无码收银</p>';
                nocodingAddHtml += '<p class="nn2"><span class="fl"></span><span class="fr">数量 <text class="nump" data-cnum="0">1</text></span>';
                nocodingAddHtml += '</p> <p class="nn3"><span class="fl">¥<text class="jiage" data-rjia="' + returnFloat(nocodingCash) + '"> ';
                nocodingAddHtml += '' + returnFloat(nocodingCash) + '</text></span><span class="fr">¥ <text class="zhong" data-zhekou="1" ';
                nocodingAddHtml += 'data-sv_p_originalprice="' + nocodingCash + '"> ' + returnFloat(nocodingCash) + '</span></p></div> </li>';
                $("#Cashlefsit").prepend(nocodingAddHtml);
                inspectCommodityWhetherZeroStock();
                osd++;
            } else {
                $(".nocoding_" + nocodingCash).find(".nump").text(parseInt($(".nocoding_" + nocodingCash).find(".nump").text()) + 1);
                var number = !isNullOrWhiteSpace($(".nocoding_" + nocodingCash).find(".nump").text()) ? 1 : parseFloat($(".nocoding_" + nocodingCash).find(".nump").text());
                jiagesss = returnFloat(Math.round(parseFloat(number) * parseFloat($(".nocoding_" + nocodingCash).find(".jiage").text()) * 100) / 100);
                $(".nocoding_" + nocodingCash).find(".zhong").text(jiagesss);
            }
            $("#queryproduct").val("");
            zhonger();
            $("#nocoding").addClass("disabled");
            queryProductFocus();
        } else {
            layer.msg("无码现金收银金额金额不能超过100000！");
            $("#nocoding").addClass("disabled");
        }
    });
}

//获取员工信息页面
function getEmployessinfohtml() {
    $.ajax({
        url: '/Html/system/EmployeesInfo.html',
        type: 'get',
        async: false,
        success: function (data) {
            //$("#shoyin2").parent().width($("#shoyin2").parent().width() + 110);
            //$("#operatingMember").html(data);
            //$(".Employeelist").attr("style", "max-height:" + $("#shoyin2").height() + "px;overflow:overlay");
            setTimeout(function () {
                OpenEmployessinfo();
            }, 200);
        }
    });
}
//本地提成员工信息
var _g_employee_list = [];

//打开员工信息
function OpenEmployessinfo() {
    //获取员工信息
    var html = '';
    var list_employee_name = '';
    if (_g_employee_list && _g_employee_list.length > 0) {
        cashDisplayEmployeeInfo(_g_employee_list);
    } else {
        $.getJson("/Employee/GetEmployeePageList/", null, function (data) {
            cashDisplayEmployeeInfo(data);
        });
    }
    //结算选择操作员的按钮
    $('#operatingMember li').click(function () {
        $(this).toggleClass("active");
    });
}

function cashDisplayEmployeeInfo(data) {
    var html = '';
    var list_employee_name = '';
    if (data != null) {
        //缓存数据
        _g_employee_list = data;
        for (var i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                html += '<li data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
            }
            else {
                html += '<li data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
            }
            // html += '<a href="#" >';
            html += '<div class="operatinguserphoto"><img src="/images/001.png"  onerror="javascript:this.src ="/images/001.png";"/>';//后期替换头像
            if (data[i].sv_employee_name.length > 4) {
                var lengthName = data[i].sv_employee_name;
                list_employee_name = lengthName.substring(0, 4) + '..';
            } else {
                list_employee_name = data[i].sv_employee_name;
            }

            html += '</div><p class="operatingusername">' + list_employee_name + '</p><i></i></li>';
        }
    }
    else {
        html = '';
    }
    if (isNullOrWhiteSpace(html)) {
        $("#operatingMember").html(html);
    } else {
        $("#play-settlement-box").parent().width($("#play-settlement-box").parent().width() - 110);
    }
}




//获取选中的员工id
function GetEmployessid() {
    StrEmployeelId = "";
    $("#operatingMember li").each(function () {
        if ($(this).hasClass("active")) {
            StrEmployeelId += $(this).attr("data-employee_id") + ",";
        }
    })
    if (StrEmployeelId != "") {
        StrEmployeelId = StrEmployeelId.replace(/,$/gi, "");
    }
}
//移除过期充次产品
function DeleteOverdue(strtid) {
    overdue_userecord_id = overdue_userecord_id.replace(strtid, "");
    $("#" + strtid).remove();
    $("#Overdue_tr_" + strtid).remove();
    overdue_userecord_id = overdue_userecord_id.replace(/^,*|,*$/g, '');//去首尾
    zhonger();
};

//启用充次方法
function chsaisi2(id, pid, pname, user_id) {
    var str_Is_open_commission = Is_open_commission == false ? 0 : 1;
    user_id = user_id || $("#userid").val();
    id = id || $("#sv_mr_cardno").val();
    layer.open({
        type: 2,
        title: '会员管理',
        shadeClose: true,
        shade: 0.8,
        area: ['80%', '90%'],
        content: '/member/acharge/?x=1#' + id + "@" + pid + "@" + pname + "@" + str_Is_open_commission + "@" + user_id//iframe的url
    });
}

//根据等级获取对应的配置值
function GetConfigdataBylevel(memberlevel) {
    configleveldata = [];
    PreferentialTopUpGivingConfigList("Preferential", "ConsumptionReduction");
    if (Preferential_TopUpGiving_ConfigList != null) {
        var ConfigList = Preferential_TopUpGiving_ConfigList;
        for (var i = 0; i < ConfigList.length; i++) {
            if (ConfigList[i].sv_user_leveltype_id == memberlevel) {
                configleveldata.push(ConfigList[i]);
            }
        }
    }
}

//根据等级获取对应的配置值【充值配置】
function GetConfigdataTopConfigBylevel(memberlevel) {
    configleveldata_Topup = [];
    configleveldata = [];
    PreferentialTopUpGivingConfigList("Preferential", "TopUpGiving");
    if (Preferential_TopUpGiving_ConfigList != null) {
        var ConfigList = Preferential_TopUpGiving_ConfigList;
        for (var i = 0; i < ConfigList.length; i++) {
            if (ConfigList[i].sv_user_leveltype_id == memberlevel) {
                //configleveldata.push(ConfigList[i]);
                configleveldata_Topup.push(ConfigList[i]);
            }
        }
    }
}

//计算赠送（消费）
function CalculateGiving() {
    //-------修复散客不满减问题
    //if (!($("#huiyuan_id").data("id")) || $("#huiyuan_id").data("id") == "0" || $("#huiyuan_id").data("id") == "")
    //{
    //    return;
    //}
    var proportionalue = 0;
    var deserved = 0;
    var givingtype = 0;
    var commissiontype = 0;
    var yinshou = parseFloat($("#yinshou").val() || 0);
    if (configleveldata && configleveldata.length > 0) {
        for (var i = 0; i < configleveldata.length; i++) {
            if (configleveldata[i].sv_detali_proportionalue <= yinshou
                && proportionalue <= configleveldata[i].sv_detali_proportionalue
                && configleveldata[i].sv_detail_is_enable) {
                proportionalue = configleveldata[i].sv_detali_proportionalue;

                givingtype = configleveldata[i].sv_user_givingtype;

                commissiontype = configleveldata[i].sv_p_commissiontype

                if (commissiontype == 1)
                    deserved = parseInt((configleveldata[i].sv_detail_value || 0) * yinshou / 100);
                else
                    deserved = parseInt((configleveldata[i].sv_detail_value || 0));

                $("#sv_user_givingtype").val(givingtype); // 写入隐藏域 ，赠送类型（1 赠送积分，2赠送金额）
                $("#sv_sumobtain_value").val(deserved); // 写入隐藏域 ，赠送金额或积
                if (deserved > 0) {
                    var strRemark = "";
                    $("#Stored_Giving_Remark").show();
                    if (givingtype == 1) {
                        strRemark = "*应收" + yinshou + "元,活动消费满" + proportionalue + "元赠送" + deserved + (commissiontype == 1 ? "(" + (parseInt((configleveldata[i].sv_detail_value || 0)) + ")%") : "") + (givingtype == 1 ? "积分" : "元储值现金")
                        //strRemark = "*应收" + yinshou + "元,活动消费满" + proportionalue + "元赠送" + parseInt((configleveldata[i].sv_detail_value || 0)) + (commissiontype == 1 ? "%" : "") + (givingtype == 1 ? "积分" : "元储值现金")
                    }
                    if (givingtype == 2) {
                        strRemark = "*应收" + yinshou + "元,活动消费满" + proportionalue + "元立减" + deserved + (commissiontype == 1 ? "(" + (parseInt((configleveldata[i].sv_detail_value || 0)) + ")%") : "") + (givingtype == 1 ? "积分" : "元现金")
                        //strRemark = "*应收" + yinshou + "元,活动消费满" + proportionalue + "元立减" + parseInt((configleveldata[i].sv_detail_value || 0)) + (commissiontype == 1 ? "%" : "") + (givingtype == 1 ? "积分" : "元现金")
                    }
                    $("#StoredRemark").text(strRemark);
                } else {
                    $("#Stored_Giving_Remark").hide();
                }

            }
            else {
                $("#StoredRemark").hide(0);
            }
        }
    } else {
        $("#StoredRemark").hide(0);
        $("#Stored_Giving_Remark").hide(0);
        $("#sv_user_givingtype").val(0);
        $("#sv_sumobtain_value").val(0);
    }
    if (givingtype == 2) {
        yinshou = yinshou - deserved;
    }

    $("#yinshou").val(yinshou.toFixed(2));
    $("#xianjin").val(yinshou.toFixed(2));
    _g_sumorigprice = yinshou;
    // 计算优惠后的折扣
    var receivable = $("#jieshuajie2").text();
    if (receivable != null && receivable != undefined && receivable != '' && receivable > 0) {
        receivable = parseFloat(receivable);
        var jiekou = parseFloat($("#yinshou").val() || 0) / receivable;
        $("#ttuser_descount").val((jiekou * 100).toFixed(2));
    }
}

//计算赠送（充值）
function CalculateGiving_topup(strobj) {
    var sv_mrr_amountbefore = parseFloat($("#sv_mrr_amountbefore").val() || 0);
    var deserved = 0;
    var detail_value = 0;
    var givingtype = 0;
    if (configleveldata_Topup != "" && configleveldata_Topup.length > 0)
    {
        for (var i = 0; i < configleveldata_Topup.length; i++)
        {
            if (configleveldata_Topup[i].sv_detail_is_enable)
            {
                var proportionalue = configleveldata_Topup[i].sv_detali_proportionalue;
                if (proportionalue <= sv_mrr_amountbefore) {
                    detail_value = parseInt(configleveldata_Topup[i].sv_detail_value);
                    givingtype = configleveldata_Topup[i].sv_user_givingtype;
                    deserved = detail_value;
                    $("#sv_user_givingtype").val(givingtype);
                    $("#sv_detali_proportionalue").val(proportionalue);
                    $("#sv_detail_value").val(detail_value)
                    if (deserved > 0) {
                        $("#StoredRemark").text("(充值" + sv_mrr_amountbefore + "元,活动充值" + proportionalue + "元赠送" + deserved + (givingtype == 1 ? "积分" : "元储值现金)"));
                    }
                }
            }
        }

    } else {

        $("#sv_user_givingtype").val(0);
        $("#sv_detali_proportionalue").val(0);
        $("#sv_detail_value").val(0)
    }
    if (deserved <= 0 && detail_value <= 0 && givingtype <= 0) {
        $("#sv_user_givingtype").val(0);
        $("#sv_detali_proportionalue").val(0);
        $("#sv_detail_value").val(0)
        if (!isNullOrWhiteSpace(strobj)) {
            $("#sv_mrr_present").val(0)
        };
    }
    if (givingtype == 2 && !isNullOrWhiteSpace(strobj)) {
        $("#sv_mrr_present").val(deserved);
    }
    var sv_mrr_present = $("#sv_mrr_present").val() || 0;
    $("#huoji").text(parseFloat(sv_mrr_present) + parseFloat(sv_mrr_amountbefore));
}


//计算赠送（充值）------只同步当前页面
function CalculateGiving_topupSinglePage(strobj,pageid) {
    var sv_mrr_amountbefore = parseFloat($("#sv_mrr_amountbefore").val() || 0);
    var deserved = 0;
    var detail_value = 0;
    var givingtype = 0;
    if (configleveldata_Topup != "" && configleveldata_Topup.length > 0)
    {
        for (var i = 0; i < configleveldata_Topup.length; i++)
        {
            if (configleveldata_Topup[i].sv_detail_is_enable)
            {
                var proportionalue = configleveldata_Topup[i].sv_detali_proportionalue;
                if (proportionalue <= sv_mrr_amountbefore)
                {
                    detail_value = parseInt(configleveldata_Topup[i].sv_detail_value);
                    givingtype = configleveldata_Topup[i].sv_user_givingtype;
                    deserved = detail_value;
                    $("#" + pageid + " " + "#sv_user_givingtype").val(givingtype);
                    $("#" + pageid + " " + "#sv_detali_proportionalue").val(proportionalue);
                    $("#" + pageid + " " + "#sv_detail_value").val(detail_value);
                    if (deserved > 0)
                    {
                        $("#" + pageid + " " + "#StoredRemark").text("(充值" + sv_mrr_amountbefore + "元,活动充值" + proportionalue + "元赠送" + deserved + (givingtype == 1 ? "积分" : "元储值现金)"));
                    }
                }
            }
        }

    } else
    {

        $("#sv_user_givingtype").val(0);
        $("#sv_detali_proportionalue").val(0);
        $("#sv_detail_value").val(0)
    }
    if (deserved <= 0 && detail_value <= 0 && givingtype <= 0)
    {
        $("#sv_user_givingtype").val(0);
        $("#sv_detali_proportionalue").val(0);
        $("#sv_detail_value").val(0)
        if (!isNullOrWhiteSpace(strobj))
        {
            $("#sv_mrr_present").val(0)
        };
    }
    if (givingtype == 2 && !isNullOrWhiteSpace(strobj))
    {
        $("#sv_mrr_present").val(deserved);
    }
    var sv_mrr_present = $("#sv_mrr_present").val() || 0;
    $("#huoji").text(parseFloat(sv_mrr_present) + parseFloat(sv_mrr_amountbefore));
}

//显示客显数据
//type   1:显示单价，2：显示合计，3：显示收款，4：显示找零
function ShowCusDisplay(type, showinfo) {
    try {
        if (((typeof Cef) !== 'undefined') &&
            hardware_cusdisplay_enable &&
            hardware_cusdisplay_port &&
            hardware_cusdisplay_baud) {
            Cef.CustomerDisplay(hardware_cusdisplay_port,
                parseInt(hardware_cusdisplay_baud),
                "One",
                8,
                type,
                showinfo);
        }

    } catch (e) {

    }
}

// 快捷键设置
$('#keysetting').click(function () {
    Deke.DeKe_dialog.show_Url3('快捷键设置', "/html/cash/keysetting.html?v=" + clearCache, keysetting, ['595px', '440px'], "shoyin2");

});

// 
function keysetting() {
    // 读取快捷键设置 val
    setTimeout(function () {
        disableButton('btnSaveKeySetting');
        if (shortcut_key_json_str != null && shortcut_key_json_str != '' && shortcut_key_json_str != undefined) {
            for (var key in shortcut_key_json_str) {
                if (shortcut_key_json_str[key] != null && shortcut_key_json_str[key] != '' && shortcut_key_json_str[key] != undefined) {
                    $('#' + key).val(shortcut_key_json_str[key]);
                    $('#' + key +'_2').val(shortcut_key_json_str[key]);
                }
            }
        }
    }, 200);

    // 快捷键data-value
    setTimeout(function () {
        if (shortcut_key_json_ascii_index != null && shortcut_key_json_ascii_index != '' && shortcut_key_json_ascii_index != undefined) {
            for (var key in shortcut_key_json_ascii_index) {
                $('#' + key).attr('data-value', shortcut_key_json_ascii_index[key]);
                $('#' + key + '_2').attr('data-value', shortcut_key_json_ascii_index[key]);
            }
        }

    }, 200);

    $('.layui-layer-setwin').css('display', 'none');
    //关闭快捷键设置弹窗的事件
    $("#close-keypage").click(function () {
        layer.closeAll();
    });
    //快捷键设置启用的事件
    $('#settingkeybtn').click(function () {
        enabledButton('btnSaveKeySetting');
        $('.setting-key li a>input').removeAttr("disabled");
        $('#key_zero_price').focus();
    });

    // 保存快捷键配置信息
    $('#btnSaveKeySetting').click(function () {
        if (shortcut_key_repeat) {
            layer.msg("快捷键有重复！");
            return;
        }
        comon_key_arr = [];
        var arr_input = $('.setting-key>li a input');
        for (var i = 0; i < arr_input.length; i++) {
            var data_value = $('.setting-key>li a input:eq(' + i + ')').attr('data-value');
            if (data_value != null && data_value != '' && data_value != undefined) {
                comon_key_arr.push(data_value);
            }
            else {
                layer.msg("快捷键必须填写！");
                return;
            }
        }
        var detaillist = [];
        var data = {
            "sv_user_configdetail_id": sv_user_configdetail_key_id,
            "sv_detail_value": comon_key_arr.join(","),
            "sv_user_config_id": shortcut_key_user_config_id,
            "sv_user_module_id": shortcut_key_user_module_id,
            "sv_detail_is_enable": true,
            "sv_user_configdetail_name": "快捷键设置",
            "sv_remark": "快捷键设置"
        };
        detaillist.push(data);
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=Set_SysFastKey', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.msg("保存成功");
                    setTimeout(function () {
                        location.reload();
                    }, 600);
                }
                else if (result == -2) {
                    layer.msg("你没有该操作权限！");
                }
                else {
                    layer.msg("保存失败");
                }
            }
        });
    });

    // 恢复默认设置
    $(document).on('click', '#default_keysetting', function () {
        enabledButton('btnSaveKeySetting');
        if (default_shortcut_key_json_str != null && shortcut_key_json_str != '' && shortcut_key_json_str != undefined) {
            for (var key in default_shortcut_key_json_str) {
                if (default_shortcut_key_json_str[key] != null && default_shortcut_key_json_str[key] != '' && default_shortcut_key_json_str[key] != undefined) {
                    $('#' + key).val(default_shortcut_key_json_str[key]);
                }
            }
        }

        if (default_shortcut_key_json_ascii_index != null && default_shortcut_key_json_ascii_index != '' && default_shortcut_key_json_ascii_index != undefined) {
            for (var key in default_shortcut_key_json_ascii_index) {
                $('#' + key).attr('data-value', default_shortcut_key_json_ascii_index[key]);
            }
        }
        $('#btnSaveKeySetting').click();
    });
}
var input_change = $('.setting-key>li a input');

// 键盘按下时间
$(document).on('keydown', '.setting-key>li a input', function (event) {
    var isShowThisWindows = $('#isShowThisWindows').val();
    if (isShowThisWindows) {
        var isInputDisabled = $('.setting-key li a>input').is("disabled");
        var inputFocusId = document.activeElement.id;
        var keyCodeStr = shortcut_key_json[event.keyCode];
        var lastshortcut_key_value = shortcut_key_json[$('#' + inputFocusId).attr('data-value')];
        var keyCode_num = event.keyCode;
        if (keyCode_num >= 48 && keyCode_num <= 57) {
            setTimeout(function () { $('#' + inputFocusId).val(lastshortcut_key_value); }, 100);
            layer.msg("数字不能作为快捷键");
            return;
        }
        else {
            var inputValue = $(this).attr('data-value');
            var input_id = $(this).attr('id');
            var input_change = $('.setting-key>li a input');
            for (var i = 0; i < input_change.length; i++) {
                var this_input_id = $('.setting-key>li a input:eq(' + i + ')').attr('id');
                var this_inputValue = $('.setting-key>li a input:eq(' + i + ')').attr('data-value');
                if (keyCode_num == this_inputValue && input_id != this_input_id) {
                    shortcut_key_repeat = true;
                    //$(this).val('');
                    layer.msg("该键已被占用，请重新设置该快捷键");
                    event.preventDefault();
                    return;
                }
                else {
                    shortcut_key_repeat = false;
                }
            }
            if (!shortcut_key_repeat) {
                var thisInputValue = $('#' + inputFocusId).val();
                $('#' + inputFocusId).val(keyCodeStr).attr('data-value', keyCode_num);
            }
        }
    }
});

// 读取快捷键配置信息
function getkey_settingInfo() {
    if (shortcut_key_json_str != null && shortcut_key_json_str != '' && shortcut_key_json_str != undefined) {
        for (var key in shortcut_key_json_str) {
            $('.' + key + ' i').html(shortcut_key_json_str[key]);
        }
    }
}

// 读取快捷键设置，并触发相应的功能
$(document).keypress(function (event) {
    var isShowThisWindows = $('#isShowThisWindows').val();
    var keypress_Code = event.keyCode;
    if (keypress_Code != null && keypress_Code != '' && keypress_Code != undefined) {
        if ((keypress_Code >= 65 && keypress_Code <= 90 && !isShowThisWindows) || keypress_Code == 46) {//大写字母，符号.
            capital_letters = true;
        }
        else if (keypress_Code >= 48 && keypress_Code <= 57 && !isShowThisWindows) {//数字
            capital_letters = true;
        }
        else if ((keypress_Code >= 97 && keypress_Code <= 122) || keypress_Code == 32) {//小写字母 32 空格键
            capital_letters = false;
            var is_layui_layer_open = $('.layui-layer').hasClass('layui-layer-page');
            var csshjsbox_window_open = $('#csshjsbox_window_open').val();
            if ((!isShowThisWindows && !is_layui_layer_open) || csshjsbox_window_open) {
                // 读取快捷配置信息
                if (shortcut_key_json_ascii_index != null && shortcut_key_json_ascii_index != undefined && shortcut_key_json_ascii_index != '') {
                    for (var key in shortcut_key_json_ascii_index) {
                        if (key == 'key_close_window' && shortcut_key_json_ascii_index[key] == keypress_Code - 32) {
                            layer.closeAll();
                            event.preventDefault();
                            return;
                        } else if (key == 'key_member' && keypress_Code - 32 == shortcut_key_json_ascii_index[key]) {
                            $("." + key).click();
                            event.preventDefault();
                            return;
                        } else if (key == 'key_product_code' && keypress_Code - 32 == shortcut_key_json_ascii_index[key]) {
                            var switchKeyPageLength = $(".layui-layer-shade").length;
                            if (switchKeyPageLength <= 0) {
                                $("#queryproduct").focus();
                                event.preventDefault();
                            }
                            return;
                        }
                        else if (key == 'key_minus_num' && keypress_Code - 32 == shortcut_key_json_ascii_index[key]) {
                            $("." + key).click();
                            key_close_window = true;
                            event.preventDefault();
                            return;
                        }
                        else if (keypress_Code - 32 == shortcut_key_json_ascii_index[key]) {
                            $("." + key).click();
                            key_close_window = true;
                            event.preventDefault();
                            return;
                        }
                        else if (keypress_Code == 32 && key == 'key_settlement') {
                            if (!csshjsbox_window_open) {
                                $("." + key).click();
                                key_close_window = true;
                                event.preventDefault();
                                return;
                            }
                        }
                    }
                }
            }
            else if (key_close_window) {
                if (shortcut_key_json_ascii_index != null && shortcut_key_json_ascii_index != undefined && shortcut_key_json_ascii_index != '') {
                    for (var key in shortcut_key_json_ascii_index) {
                    }
                }
            }
            else if (isShowThisWindows) {
                //？？？？？
            }
            else {
                capital_letters = true;
                $('#queryproduct').focus();
            }
            event.preventDefault();
            return;
        }
        else if (keypress_Code >= 37 && keypress_Code <= 40)//方向键 左37上38右39下40
        {
            //上下键控制清单的上下选择
            //左右键控制右侧商品分页（左右滑动）
            event.preventDefault();
            return;
        }
        else //其他非大写字母、数字、小写字母 的按键
        {
            ////event.preventDefault();
            //return;
        }
    }
});

// 快捷键触发
function shortcut_key(key_Code, event) {
    if (shortcut_key_json_ascii_index != null && shortcut_key_json_ascii_index != undefined && shortcut_key_json_ascii_index != '' && key_Code != undefined && key_Code != null && key_Code != '') {
        for (var key in shortcut_key_json_ascii_index) {
            if (shortcut_key_json_ascii_index[key] == key_Code) {
                $("." + key).click();
                event.preventDefault();
                return;
            }

        }
    }
}

var cashlefsit_move_index = 0;
// 快捷键中的其它键盘
$(document).keyup(function (key) {
    var getFocusId = document.activeElement.id; // 获得焦点控件的Id
    var selectMemberWindowds = $('#selectMemberWindowds').val();
    var isShowThisWindows = $('#isShowThisWindows').val();
    var this_keyup_code = key.keyCode;
    if (this_keyup_code >= 112 && this_keyup_code <= 123 && !isShowThisWindows) { // f3 ---f12 键
        shortcut_key(this_keyup_code, key);
    }
    else if (this_keyup_code >= 37 && this_keyup_code <= 40) { // 上下左右键
        var cashlefsitlength = $('#Cashlefsit li').length;
        if (this_keyup_code == 38) { // 上移
            if (cashlefsit_move_index > 0) {
                cashlefsit_move_index--;
                $('#Cashlefsit li').removeClass('active');
                $('#Cashlefsit li:eq(' + cashlefsit_move_index + ')').addClass('active');
            }
        }
        else if (this_keyup_code == 40) { // 下移
            if (cashlefsitlength > cashlefsit_move_index) {
                cashlefsit_move_index++;
                $('#Cashlefsit li').removeClass('active');
                $('#Cashlefsit li:eq(' + cashlefsit_move_index + ')').addClass('active');
            }
        }
    }
    else if (this_keyup_code == 107 || this_keyup_code == 109) { // 加减
        shortcut_key(this_keyup_code, key);
    }
    else if (this_keyup_code == 27 || this_keyup_code == 13) {
        var is_layui_layer_open = $('.layui-layer, layui-layer-title').hasClass('layui-layer-page');
        var layer_title = $('.layui-layer-title');
        if (is_layui_layer_open || layer_title) {
            if (this_keyup_code == 27) {
                layer.closeAll(); // 关闭弹窗
                isShowWindow = false;
            }
            else if (this_keyup_code == 13) {
                var isShowbarCodePayWindows = $('#isShowbarCodePayWindows').val();
                if (getFocusId == "txtPayselectmember" || getFocusId == "query_like" || selectMemberWindowds || getFocusId == "authcode" || isShowbarCodePayWindows) {

                }
                else {
                    $('.com_key_confirm_enter').click(); // 触发公共的回车键
                    $('.layui-layer-btn0').click();
                }
            }
        }
    }
    else if (this_keyup_code == 112 || this_keyup_code == 113) { // F1 --F2 
        if (isShowThisWindows) {
            if (this_keyup_code == 112) {
                $('#default_keysetting').click();
            }
            else if (this_keyup_code == 113) {
                $('#settingkeybtn').click(); // 快捷键启用编辑
            }
        }
    }
});

//判断设备类型
var decerpbrowser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }()
}
//-- 收银快收、商品编码、助记码输入框 焦点控制
function queryProductFocus() {
    //安卓环境下，不自动触发焦点，优化前端事件
    if ($("#queryproduct") && $("#queryproduct").length > 0) {
        if (!decerpbrowser.versions.android || user_id == "59258584") {
            $("#queryproduct").focus();
        }
    }
}

//收银界面焦点控制
function cashFocus() {
    debugger;
    //安卓环境下，不自动触发焦点，优化前端事件
    if ($("#xianjin") && $("#xianjin").length > 0) {
        if (!decerpbrowser.versions.android) {
            if (jiaodianname) {
                $("#xianjin").focus();
            } else {
                $("#xianjin").focus();
            }
        }
    }
}


//清除条码助码输入框的value值
$("#deletebtn").on("click", function () {
    $("#queryproduct").val("");
});

//收银选择会员
function paySelectMemberFn(memberSeachstr, userid, memberlevel_id) {

    clearSelectMemberInfo();
    var is_GetConfigdataBylevel = false;
    if (memberlevel_id != null && memberlevel_id != "" && memberlevel_id >= 1) {
        is_GetConfigdataBylevel = true;
    }
    var payselectmember = memberSeachstr;
    if (payselectmember != null && payselectmember != '' && payselectmember != undefined) {
        $.get("/Ajaxdata/QueryUserModel?id=" + payselectmember + "&userid=" + userid, function (data) {
            if (data == null) {
                layer.msg("找不到该会员，请查证再查询");
                return;
            }
            else if (data.type == 1) {
                Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=42", f4, ['730px', ''], "shoyin2");
            }
            else if (data.isOverdue) {
                layer.msg("此卡已过期");

                return false;
            }
            else if (data.sv_mr_status == 1) {
                layer.msg("此卡已挂失");
                $("#memberNamep").html("");
                $("#memberNamenumber").html("");
                $("#membercatagory").html("");
                $("#memberintegral").html("");
                $("#memberbalance").html("");
                $("#memberconsumptiongrand").html("");
                $("#memberbirthday").html("");
                $('#txtPayselectmember').val('');
                $("#yuecount").attr('data-money', 0);
                $('#member_photo').attr('src', '/images/001.png');
                return false;
            }
            else {
                _cache_memberinfo_json = data;
                $('#txtPayselectmember').blur();

                $("#sv_mr_cardno").val(memberSeachstr);
                $("#memberlevel_id").val(data.memberlevel_id);

                //如果会员的名字为空的话就读取会员的ID
                if (data.sv_mr_name != null && data.sv_mr_name != "" && data.sv_mr_name != undefined) {
                    $("#memberNamep").html(data.sv_mr_name);
                } else {
                    $("#memberNamep").html(data.member_id);
                }
                $('#btnMemberRecharge').attr('data-userId', data.user_id).attr('data-cardno', data.sv_mr_cardno).attr("data-level", data.memberlevel_id);
                $('#member_photo').attr('src', data.sv_mr_headimg);
                $('#huiyuan_id').attr('data-id', data.member_id);
                $("#memberNamenumber").html(data.sv_mr_mobile);
                if (data.sv_ml_commondiscount > 0 && data.sv_ml_commondiscount < 10) {
                    $("#memberdIscount").html('折扣:' + (parseFloat(data.sv_ml_commondiscount) * 10).toFixed(2) + '%');
                } else {
                    $("#memberdIscount").html('折扣:100%');
                }
                $("#membercatagory").html(data.sv_ml_name);
                $("#memberintegral").html(data.sv_mw_availablepoint);
                $("#memberbalance").html(data.sv_mw_availableamount);
                $("#memberconsumptiongrand").html(data.sv_mw_sumamount);
                $("#memberbirthday").html(new Date(data.sv_mr_birthday).Format("MM-dd"));

                $('#member_id').val(data.member_id);
                $('#userid').val(data.user_id);
                $('.sv_mr_cardno').text(data.sv_mr_cardno);
                $('.sv_mr_name').text(data.sv_mr_name);
                $("#yuecount").attr('data-money', data.sv_mw_availableamount).text(data.sv_mw_availableamount);
                $('.sv_mw_availableamount').text(data.sv_mw_availableamount);
                if (data.sv_ml_commondiscount != null && data.sv_ml_commondiscount != undefined && data.sv_ml_commondiscount != '' && data.sv_ml_commondiscount != 0 && data.sv_ml_commondiscount != "0") {
                    _member_discount = parseFloat(data.sv_ml_commondiscount) * 10;
                }
                else {
                    _member_discount = 100;
                }
                $("#huiyuan_id").text(data.sv_mr_name).data("id", data.member_id).data("jiekou", _member_discount);
                $('#ttuser_descount').val("100");
                $('#user_descount').text(_member_discount);
                if ($("#memberlevel_id").val() != null && $("#memberlevel_id").val() != "") {
                    GetConfigdataBylevel($("#memberlevel_id").val());
                }
                $('.paywaylist .selectpaytype').eq(1).click();


                zhonger();
                //settlementInputChange();
                $("#xianjin").change();
                CalculateGiving(); // 计算满赠送
                IntegralToNow();
            }
            // 处理异常图片
            $('#member_photo').error(function () {
                $(this).attr('src', '/images/001.png');
            });
        });
    }
    else {
        layer.msg("请输入手机号码或卡号");
    }
}

//会员现在初始化为未选择
function clearSelectMemberInfo() {
    $('#btnMemberRecharge').attr('data-userId', "").attr('data-cardno', "").attr("data-level", "");
    $("#huiyuan_id").text("").attr("data-id", "0").data("jiekou", "100");
    $("#yuecount").text(returnFloat(0)).attr('data-money', 0);
    $("#user_descount").text("100");
    _cache_memberinfo_json = null;
    _member_discount = 100;
    $('#jieshuajie2').text($('#jieshuajie').text());

    $("#memberdIscount").html('');
    $("#huiyuan_id").text("").attr("data-id", "0").data("jiekou", "100");
    $("#memberNamep").html("");
    $("#memberNamenumber").html("");
    $("#membercatagory").html("");
    $("#memberintegral").html("");
    $("#memberbalance").html("");
    $("#memberconsumptiongrand").html("");
    $("#memberbirthday").html("");
    $('#payselectmember').val('');
    $('#member_photo').attr('src', '/images/001.png');
}

// 搜索会员
$(document).on("keyup", "#txtPayselectmember", function (event) {
    var _query_user_last_search = "";
    var this_memberValue = $(this).val().replace(/\ +/g, "");
    if (event.keyCode == "13") {
        paySelectMemberFn(this_memberValue, '', '');
    }
    else if (event.keyCode == "113") {
        var c_ = typeof Cef;
        if (c_ !== "undefined") {
            GetICCardEventData($("#txtPayselectmember"), event);
            if ($("#txtPayselectmember").val()) {
                if (_query_user_last_search != $("#txtPayselectmember").val()) {
                    //重新检索会员卡
                    $("#userid").val("");
                    paySelectMemberFn($(this).val().trim(), '', '');
                } else {
                    //选取会员卡
                }
                _query_user_last_search = $("#txtPayselectmember").val();
            }
        }
    }
});

$(document).on("click", ".paywaylist .disabledbtn", function () {
    layer.msg("此功能正在开发中!");
})

//清除数字
$(document).on("click", ".pay-settlement-input .clean", function () {
    $(this).siblings("input").val("");
    $(this).siblings("input").focus();
});

// 选择会员列表
function selectmemberlist() {
    getMemberListBySeachStr($("#payselectmember").val());

    //   搜索会员
    $("#query_like").keypress(function (e) {
        var thisValue = $(this).val();
        if (thisValue != null && thisValue != undefined && thisValue != '') {
            var query_member_list_is_success = $('#query_member_list_is_success').val();
            if (e.keyCode == 13 && (query_member_list_is_success == 0 || query_member_list_is_success == '0')) {
                getMemberListBySeachStr(thisValue);
            }
        }
    });
}

function getmemberlist(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {

        html += ' <tr data-user_id="' + data[i].user_id + '" data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '">';

        html += '    <td><span>' + data[i].sv_mr_cardno + '</span></td>';
        html += '    <td><span>' + data[i].sv_mr_name + '</span></td>';
        html += '    <td><span>' + data[i].sv_mr_mobile + '</span></td>';
        html += '   <td><i>¥' + data[i].sv_mw_availableamount + '</i></td>';
        if (data[i] != null && data[i].sv_mw_credit != null) {
            html += '  <td><i>¥' + data[i].sv_mw_credit + '</i></td>';
        } else {
            html += '  <td><i>¥0.00</i></td>';
        }
        if (isNullOrWhiteSpace(data[i].sv_ml_name))
            html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
        else html += '  <td><span></span></td>';
        html += '   <td id="' + data[i].sv_mr_status + '"><a href="javascript:void(0);" class="xianzhehuiyan" id="' + data[i].sv_mr_status + '" data-isoverdue="' + data[i].isOverdue + '">选择</a></td>';
        html += '   </tr>';
    }
    $("#usercoutn").html(data.length);
    $("#userlist").html(html);
}

// 会员列表
function getMemberListBySeachStr(key) {
    $("#query_like").val(key);
    var loadIndex = commonOpenLoading();
    $('#query_member_list_is_success').val(1);
    $.get("/ajaxdata/GetMemberList/1", { "key": key, "pageSize": 30 }, function (data) {
        commonCloseLoading(loadIndex);
        $('#query_member_list_is_success').val(0);
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += ' <tr data-user_id="' + data[i].user_id + '" data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '" >';
            html += '    <td><span>' + data[i].sv_mr_cardno + '</span></td>';
            html += '    <td><span>' + data[i].sv_mr_name + '</span></td>';
            html += '    <td><span>' + data[i].sv_mr_mobile + '</span></td>';
            html += '   <td><i>¥' + data[i].sv_mw_availableamount + '</i></td>';
            if (data[i] != null && data[i].sv_mw_credit != null) {
                html += '  <td><i>¥' + data[i].sv_mw_credit + '</i></td>';
            } else {
                html += '  <td><i>¥0.00</i></td>';
            }
            if (isNullOrWhiteSpace(data[i].sv_ml_name))
                html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
            else html += '  <td><span></span></td>';
            html += '  <td><span>' + data[i].sv_mw_availablepoint + '</span></td>';
            html += '   <td id="' + data[i].sv_mr_status + '"><a href="javascript:void(0);" class="xianzhehuiyan select" ';
            html += ' id="' + data[i].sv_mr_status + '" data-user_id="' + data[i].user_id + '" ';
            html += ' data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" ';
            html += 'data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '" data-level="' + data[i].memberlevel_id + '">选择</a></td>';
            html += '</tr>';
        }
        $("#usercoutn").html(data.length);
        $("#userlist").html(html);
    });
}

// 刷新结算窗口会员信息
function getMemberInfoByMemberId(sv_mr_cardno, userid) {
    if (userid == null || userid == undefined || userid == '') {
        userid = user_id;
    }
    $.get("/Ajaxdata/QueryUserModel?id=" + sv_mr_cardno + "&userid=" + userid, function (data) {
        if (data == null) {
            layer.msg("找不到该会员，请查证再查询");
            return;
        }
        else if (data.type == 1) {
            Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=42", f4, ['730px', ''], "shoyin2");
        }
        else if (data.isOverdue) {
            layer.msg("此卡已过期");

            return false;
        }
        else if (data.sv_mr_status == 1) {
            layer.msg("此卡已挂失");
            $("#memberNamep").html("");
            $("#memberNamenumber").html("");
            $("#membercatagory").html("");
            $("#memberintegral").html("");
            $("#memberbalance").html("");
            $("#memberconsumptiongrand").html("");
            $("#memberbirthday").html("");
            $('#txtPayselectmember').val('');
            $("#yuecount").attr('data-money', 0);
            $('#member_photo').attr('src', '/images/001.png');
            return false;
        }
        else {
            _cache_memberinfo_json = data;
            $('#txtPayselectmember').blur();
            //如果会员的名字为空的话就读取会员的ID
            if (data.sv_mr_name != null && data.sv_mr_name != "" && data.sv_mr_name != undefined) {
                $("#memberNamep").html(data.sv_mr_name);
            } else {
                $("#memberNamep").html(data.member_id);
            }
            $('#btnMemberRecharge').attr('data-userId', data.user_id).attr('data-cardno', data.sv_mr_cardno).attr("data-level", data.memberlevel_id);
            $('#member_photo').attr('src', data.sv_mr_headimg);
            $('#huiyuan_id').attr('data-id', data.member_id);
            $("#memberNamenumber").html(data.sv_mr_mobile);
            if (data.sv_ml_commondiscount > 0 && data.sv_ml_commondiscount < 10) {
                $("#memberdIscount").html('折扣:' + (parseFloat(data.sv_ml_commondiscount) * 10).toFixed(2) + '%');
            } else {
                $("#memberdIscount").html('折扣:100%');
            }
            $("#membercatagory").html(data.sv_ml_name);
            $("#memberintegral").html(data.sv_mw_availablepoint);
            $("#memberbalance").html(data.sv_mw_availableamount);
            $("#memberconsumptiongrand").html(data.sv_mw_sumamount);
            $("#memberbirthday").html(new Date(data.sv_mr_birthday).Format("MM-dd"));

            $('#member_id').val(data.member_id);
            $('#userid').val(data.user_id);
            $('.sv_mr_cardno').text(data.sv_mr_cardno);
            $('.sv_mr_name').text(data.sv_mr_name);
            $("#yuecount").attr('data-money', data.sv_mw_availableamount).text(data.sv_mw_availableamount);
            $('.sv_mw_availableamount').text(data.sv_mw_availableamount);
            if (data.sv_ml_commondiscount != null && data.sv_ml_commondiscount != undefined && data.sv_ml_commondiscount != '' && data.sv_ml_commondiscount != 0 && data.sv_ml_commondiscount != "0") {
                _member_discount = parseFloat(data.sv_ml_commondiscount) * 10;
            }
            else {
                _member_discount = 100;
            }
            $("#huiyuan_id").text(data.sv_mr_name).data("id", data.member_id).data("jiekou", _member_discount);
            $('#ttuser_descount').val("100");
            $('#user_descount').text(_member_discount);
            $('.paywaylist .selectpaytype').eq(1).click();
            IntegralToNow();
        }
        // 处理异常图片
        $('#member_photo').error(function () {
            $(this).attr('src', '/images/001.png');
        });
    });
}

//餐饮版加菜/点菜/查看
$(document).on("click", "#showoperatinglist", function () {
    $("#operatinglist").slideToggle(300);
});

// 确认清桌
$(document).unbind("click", "#btnConfirmCloseCateringTable").on("click", "#btnConfirmCloseCateringTable", function () {
    //修改
    var tableId = $(".cateringTableList-ul>li.active").attr('data-id');
    var state = $(".cateringTableList-ul>li.active").attr('data-state');
    var tableType = $(".cateringTableList-ul>li.active").attr('data-type');
    var mergeparentid = $(".cateringTableList-ul>li.active").attr('data-mergeparentid');
    //修改
    if (tableId > 0 && state == 1) {
        if (tableType == 1 && mergeparentid > 0) {// 并台
            tableId = mergeparentid;
        }
        operateCateringTableByOperateType(tableId, 0, 0, 0, 1);
    }
});

// 点击房台做相应的操作 //===修改====//
$(document).unbind("click", ".cateringTableList-ul>li").on("click", ".cateringTableList-ul>li", function () {
    $('#Cashlefsit').html('');
    commondCleanCateringGrade();
    zhonger();
    shuxin();  // 获取最新的流水号   
    $(".cateringTableList-ul>li").removeClass('active');//修改过
    $(this).addClass('active');
    $("#btnAddfoodsOrCutfoods").css("display", "none");//显示加菜退菜按钮
    $("#btnRestaurantOrBale").css("display", "block");//显示加菜退菜按钮
    var tableId = $(this).attr('data-id');
    var state = $(this).attr('data-state');
    var tableType = $(this).attr('data-type');// 0 普通房台， 1--并台房，2 -- 拼台房
    var mergeparentid = $(this).attr('data-mergeparentid');
    var tableName = $(this).attr('data-name');
    var personNum = $(this).attr('data-personNum');
    if (state == 2 && tableId > 0) {
        if (tableType == 2) { // 拼台
            Deke.DeKe_dialog.show_Url2(tableName + "订单", "/Catering/_PartialFightCateringTable", fightCateringTableOrderList, ['550px', '360px']);
        }
        else {
            if (tableType == 1 && mergeparentid > 0) { // 并台
                tableId = mergeparentid;
            }
            $("#btnRestaurantOrBale").css("display", "none");//显示打包/餐厅吃饭
            $("#btnAddfoodsOrCutfoods").css("display", "block");//显示加菜退菜按钮
            getGuandanmModelByTableId(tableId, tableName, 0, 0); // 根据房台读取挂单信息
            closeCateringFunc(state);
        }
    }
    else {
        // 点餐
        if (state == 1 && tableId > 0) {
            if (tableType == 1 && mergeparentid > 0) { // 1--并台房
                tableId = mergeparentid; // 挂单时存主桌
            }
            setCateringGradeInfo(tableName, tableId, 0, personNum, false, false);
            $('#catering_CateringGrade').text(tableName).attr('data-tableid', tableId).attr('data-personNum', personNum);
        }
        closeCateringFunc(state);
    }
});

// 读取拼台订单
function fightCateringTableOrderList() {
    var tableId = $(".cateringTableList-ul>li.active").attr('data-id');//修改
    var cateringTableOrderListHtml = '';
    $.getJSON('/Catering/GetWithoutListByTableId', {
        tableId: tableId
    }, function (data) {
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cateringTableOrderListHtml += '<li data-id="' + data[i].wt_nober + '" data-personNum ="' + data[i].sv_person_num + '"';
                cateringTableOrderListHtml += ' data-withListId="' + data[i].sv_without_list_id + '" ';
                cateringTableOrderListHtml += 'data-tableid="' + data[i].sv_table_id + '" data-grade="' + data[i].sv_catering_grade + '">';
                cateringTableOrderListHtml += '<div class="tablename"><span>' + data[i].sv_catering_grade + '(' + data[i].sv_person_num + '人)</span></div>';
                cateringTableOrderListHtml += '<div class="tablename ordernumber"><span>' + data[i].wt_nober + '</span></div>';
                cateringTableOrderListHtml += '<div class="tablename orderTime"><span>' + new Date(data[i].wt_datetime).Format("MM-dd hh:mm:ss") + '</span></div>';
                cateringTableOrderListHtml += '</li>';
            }
        }
        $('#cateringTableOrderListHtml').html(cateringTableOrderListHtml);
    });
}

// 拼桌，点击某个订单信息
$(document).unbind("click", "#cateringTableOrderListHtml>li").on("click", "#cateringTableOrderListHtml>li", function () {
    $(this).addClass("active").siblings("li").removeClass("active");
});

// 拼桌，确认选择订单，读取订单信息
$(document).unbind("click", ".btnConfirmSelectionCateringOrder").on("click", ".btnConfirmSelectionCateringOrder", function () {
    var activeSelectionCateringOrderId = $("#cateringTableOrderListHtml>li.active").attr('data-withlistid');
    var selectGradeName = $("#cateringTableOrderListHtml>li.active").attr('data-grade');
    var thisBtnType = parseInt($(this).attr('data-type') || 0);
    if (thisBtnType == 1) {
        $('#btnCateringFightCateringTable').click();
    }
    else {
        if (activeSelectionCateringOrderId > 0) {
            switch (thisBtnType) {
                case 0: // 加菜
                    getGuandanmModelByTableId(0, selectGradeName, activeSelectionCateringOrderId, 1); // 根据房台读取挂单信息
                    closeCateringFunc(-1);
                    layer.closeAll();
                    $('#openCateringTableContent').hide();
                    break;
                case 2: // 转台
                    $('#btnCateringChangeCateringTableFoods').click();
                    break;
                case 3: // 取单
                    getGuandanmModelByTableId(0, selectGradeName, activeSelectionCateringOrderId, 1); // 根据房台读取挂单信息
                    closeCateringFunc(-1);
                    layer.closeAll();
                    break;
                default:
            }
        }
        else {
            layer.msg('请选择订单');
        }
    }
});

// 根据房台读取挂单信息
function getGuandanmModelByTableId(tableId, sv_catering_grade, withoutListId, queryType) {
    var use_tableid = $('#catering_CateringGrade').attr('data-tableid'); // 读取正在使用的房台
    if (use_tableid > 0 && use_tableid == tableId) { // 如果并台的信息存在，则不再重复查询
        $('#catering_CateringGrade').text(sv_catering_grade);
    }
    else {

    }
    //改动------------退菜
    var settlementColumnHtml = '';
    $.getJSON('/Catering/GetGuandanmModelByTableId', {
        tableId: tableId, withoutListId: withoutListId, queryType: queryType
    }, function (data) {
        if (data != null) {
            setCateringGradeInfo(sv_catering_grade, data.sv_table_id, data.sv_without_list_id, data.sv_person_num, false, false);
            $("#danhao").text(data.wt_nober); // 读取单号
            $("#Cashlefsit").html("");
            var prlist = data.prlist;
            if (prlist.length > 0) {
                for (var i = 0; i < prlist.length; i++) {
                    var number = 0;
                    if (prlist[i].sv_pricing_method == 1) {
                        number = prlist[i].sv_p_weight;
                    }
                    else {
                        number = prlist[i].product_num;
                    }
                    var cateringTasteOderListHtml = '';
                    var orderProductRemarksHtml = ''; // 备注信息
                    if (prlist[i].productTasteJson != null && prlist[i].productTasteJson.length > 0) {// 读取口味信息
                        var productTasteList = eval(prlist[i].productTasteJson);
                        for (var j = 0; j < productTasteList.length; j++) {
                            cateringTasteOderListHtml += '<i data-id="' + productTasteList[j].sv_taste_id + '" data-price="' + productTasteList[j].sv_taste_price + '" data-type="0" class="productTaste">' + productTasteList[j].sv_taste_name + '(' + productTasteList[j].sv_taste_price + ')</i>';
                        }
                    }
                    if (prlist[i].cateringChargingJson && prlist[i].cateringChargingJson.length > 0) { // 读取加料规格信息
                        var cateringChargingJson = eval(prlist[i].cateringChargingJson);
                        for (var j = 0; j < cateringChargingJson.length; j++) {
                            var data_type = cateringChargingJson[j].sv_charging_type == 0 ? 1 : 2;
                            var chargingCass = cateringChargingJson[j].sv_charging_type == 0 ? 'addFoods' : 'addFoodSpec';
                            cateringTasteOderListHtml += '<i data-id="' + cateringChargingJson[j].sv_taste_id + '" data-price="' + cateringChargingJson[j].sv_taste_price + '" data-type="' + data_type + '" class="addFoodSpec">' + cateringChargingJson[j].sv_charging_name + '(' + cateringChargingJson[j].sv_taste_price + ')</i>';
                        }
                    }
                    if (prlist[i].sv_is_packing) { // 读取打包价格
                        cateringTasteOderListHtml += '<i data-id="0" data-price="' + prlist[i].sv_packing_charges + '" data-type="3" class="productblae">打包(' + prlist[i].sv_packing_charges + ')</i>';
                    }
                    if (prlist[i].sv_remark) {
                        orderProductRemarksHtml = '<p class="foodsRemarks"><span style="padding-right:5px;">备注:</span><span class="orderProductRemarks">' + prlist[i].sv_remark + '</span></p>';
                    }
                    //-----从房台获取挂单商品会员价--
                    var minunitprice = returnFloat(prlist[i].sv_p_minunitprice) == 0 ? "" : returnFloat(prlist[i].sv_p_minunitprice);
                    var mindiscount = returnFloat(prlist[i].sv_p_mindiscount) == 0 ? "" : returnFloat(prlist[i].sv_p_mindiscount);
                    var memberprice = returnFloat(prlist[i].sv_p_memberprice) == 0 ? "" : returnFloat(prlist[i].sv_p_memberprice);
                    var str = "";
                    if (memberprice > 0)
                    {
                        str = '<p class="nn4" style="color:red"><span class="fl">会员单价¥ <text class="memberprice">' + returnFloat(memberprice) + '</text></span></p>';
                    } else if (mindiscount > 0)
                    {
                        str = '<p class="nn4" style="color:red"><span class="fl">最低折扣 <text class="mindiscount">' + mindiscount * 10 + '</text>%</span></p>';
                    } else if (minunitprice > 0)
                    {
                        str = '<p class="nn4" style="color:red"><span class="fl">最低单价¥ <text class="minunitprice">' + returnFloat(minunitprice) + '</text></span></p>';
                    }




                    settlementColumnHtml += '<li data_order_product_status="' + data_order_product_status.Pendding + '" data-product_total="' + prlist[i].product_total + '" data-mindiscount="' + prlist[i].sv_p_mindiscount + '" data-minunitprice="' + prlist[i].sv_p_minunitprice + '" ';
                    settlementColumnHtml += 'data-memberprice="' + prlist[i].sv_p_memberprice + '" id="' + prlist[i].product_id + '" data-product_discount="' + prlist[i].product_discount + '"';
                    settlementColumnHtml += 'data-pricingmethod="' + prlist[i].sv_pricing_method + '" data-product_number="' + number + '"';
                    settlementColumnHtml += 'data-prname ="' + prlist[i].product_name + '" data-untprice="' + prlist[i].product_unitprice + '" ';
                    settlementColumnHtml += 'data-categoryId="' + prlist[i].productcategory_id + '" data-url ="" data-packprice="' + prlist[i].sv_packing_unitprice + '" data-printerip="' + prlist[i].sv_printer_ip + '" data-printerport="' + prlist[i].sv_printer_port + '" data-sv_without_product_id = "' + prlist[i].sv_without_product_id + '">';
                    settlementColumnHtml += '<div class="cateringProductNamebox"><p class="cateringProductName">' + prlist[i].product_name + '</p></div>';
                    settlementColumnHtml += '<div class="cateringProductNumberbox">';
                    settlementColumnHtml += '<span class="cateringProductNumber nump">' + number + '</span>';
                    settlementColumnHtml += '</div>';
                    settlementColumnHtml += '<div class="cateringProductpricebox"><span class="cateringProductprice"><i>¥</i><i class="zhong" ';
                    settlementColumnHtml += ' data-sv_p_originalprice="' + prlist[i].sv_p_originalprice + '">' + parseFloat(prlist[i].product_total).toFixed(2) + '</i></span></div>';

                    settlementColumnHtml += '<text style="display:none;" class="jiage" data-rjia="' + prlist[i].product_unitprice + '"> ' + prlist[i].product_unitprice + '</text>';
                    settlementColumnHtml += '<div class="cateringProductMoreinfo catering_taste_list">' + cateringTasteOderListHtml + '</div>';
                    settlementColumnHtml += '<div class="cateringProductMoreinfo catering_taste_remarks">' + orderProductRemarksHtml + '</div>';

                    settlementColumnHtml += '<div class="cateringProductMoreinfo">' + str + '</div>';
                    settlementColumnHtml += '</li>';

                }
            }
            $("#Cashlefsit").html(settlementColumnHtml);
            zhonger();
        } else {
            $("#Cashlefsit").html("");
            getCashierRegionTableInfo(0, true, true, 0, -1);
        }
    });
}

// 输入就餐人数回调
function eatNumberFn(tableId, type) {
    setTimeout(function () {
        $("#jishukuan").val("").focus();
        $('#updateNum_en').hide();
        $(".posia").click(function () {
            $("#jishukuan").val("");
        });

        var tableName = $(".cateringTableList-ul>li.active").attr('data-name');//修改过

        $("#woquren").click(function () {
            if ($("#jishukuan").val().replace(/\ +/g, "")) {;
                var tableNum = $("#jishukuan").val().replace(/\ +/g, "");
                if (type == 0) {
                    operateCateringTableByOperateType(tableId, tableNum, 0, 0, 0); // 开台
                }
                if (type == 1) {// 拼桌
                    setCateringGradeInfo(tableName, tableId, 0, tableNum, true, false);
                    closeCateringFunc(-1);
                    $('#openCateringTableContent').hide();
                    shuxin();  // 获取最新的流水号 
                    $('#Cashlefsit').html('');
                    zhonger();
                    layer.closeAll();
                }
            }
            else {
                layer.msg('请输入就餐人数！');
                $("#jishukuan").focus();
            }
        });
    }, 200);
}

//刷新房台的事件
try {
    socket.on('decerp_refresh_desk_Switch', function (data) {
        if (data.refreshDeskSwitch) {
            getCashierRegionTableInfo(0, true, true, 0, -1);
        }
    });
} catch (e) {
    console.log(e.messsage);
}

// 开台操作
$(document).unbind("click", "#btnCateringOpenCateringTable").on("click", "#btnCateringOpenCateringTable", function () {
    var tableId = $(".cateringTableList-ul>li.active").attr('data-id');
    Deke.DeKe_dialog.show_Url2("用餐人数", "/html/cash/jishu.html?v=25", eatNumberFn(tableId, 0), ['310px', '']);
});

// 转台 并台
$(document).unbind("click", "#btnCateringChangeCateringTable, #btnCateringChangeCateringTableFoods,#btnCateringAndCateringTable").on("click", "#btnCateringChangeCateringTable, #btnCateringChangeCateringTableFoods, #btnCateringAndCateringTable", function () {
    var tableId = $(".cateringTableList-ul>li.active").attr('data-id');
    var table_state = $(".cateringTableList-ul>li.active").attr('data-state');
    var showTitle = '转台';
    if (table_state == 0) {
        showTitle = '并台';
    }
    Deke.DeKe_dialog.show_Url2(showTitle, "/Catering/_PartialChangeCateringTable", cateringChangeCateringTable(tableId), ['600px', '500px']);
});

// 转台回调方法
function cateringChangeCateringTable(tableId) {
    setTimeout(function () {
        var cateringRegionListHtml = '<li data-id="-1" class="active">全部</li>';
        if (_g_cateringRegionListCacheJson && _g_cateringRegionListCacheJson.length > 0) {
            for (var i = 0; i < _g_cateringRegionListCacheJson.length; i++) {
                cateringRegionListHtml += '<li data-id="' + _g_cateringRegionListCacheJson[i].sv_region_id + '" >' + _g_cateringRegionListCacheJson[i].sv_region_name + '</li>';
            }
            $('#catering_tableArealist_html').html(cateringRegionListHtml);
        }
        getCashierRegionTableInfo(2, false, false, 0, 0); // 读取全部空闲房台
    }, 100);
}

// 清桌
$(document).unbind("click", "#btnCateringCloseCateringTable").on("click", "#btnCateringCloseCateringTable", function () {
    var tableType = $(".cateringTableList-ul>li.active").attr('data-type');
    var title = '请确认是否清台？';
    if (tableType == 1) {
        title = '当前是并台，清台操作会清除相关并台信息，请确认是否清台？';
    }
    var confirmCleanTablehtml = '<div>' + title + '</div><div class="modal-footer product-modal-footer selectBtn" style="bottom: 0;padding: 0;height: 34px;border:none;margin-left: -20px;"><button type="button" class="text-center btn fl closeallpage">取消</button><button type="button" class="text-center btn fl selectSuccess" id="btnConfirmCloseCateringTable">确定</button></div>'
    layer.open({
        title: ' ',
        content: confirmCleanTablehtml,
        btn: false,
        area: ['250px', '150px'],
        style: 'text-align:center;'
    });
});

// 关闭窗口
$(document).unbind("click", ".closeallpage").on("click", ".closeallpage", function () {
    layer.closeAll();
});

//关闭打开最新的窗口
$(document).unbind("click", ".closenewpage").on("click", ".closenewpage", function () {
    layer.close(layer.index);
});

// 清空所有与订单相关的信息
function commondCleanOderInfos() {
    resetSettlementInformation(); //清除所有结算信息
    commondCleanCateringGrade();// 清除房台信息
}

// 清空订单信息
$(document).unbind("click", "#btnCateringCashlefsitInfo").on("click", "#btnCateringCashlefsitInfo", function () {
    commondCleanOderInfos();
});

// 下单点餐
$(document).unbind("click", "#btnCateringAddPlaceOrderFoods").on("click", "#btnCateringAddPlaceOrderFoods", function () {
    $('#openCateringTableContent').hide();
    closeCateringFunc(-1);// 关闭所有房台相关功能按钮
});

// 拼桌
$(document).unbind("click", "#btnCateringFightCateringTable").on("click", "#btnCateringFightCateringTable", function () {
    //确认拼桌的弹窗
    var confirmAddFoodshtml = '<div>拼桌将会在当前桌位增加新订单 是否用新订单点菜？</div><div class="modal-footer product-modal-footer selectBtn" style="bottom: 0;padding: 0;height: 34px;border:none;margin-left: -20px;"><button type="button" class="text-center btn fl closeallpage">取消</button><button type="button" class="text-center btn fl selectSuccess" id="btnConfirmCateringFightTable">确定</button></div>'
    layer.open({
        title: ' ',
        content: confirmAddFoodshtml,
        btn: false,
        area: ['300px', '180px']
    });
});

// 确认拼桌，弹出输入就餐人数
$(document).unbind("click", "#btnConfirmCateringFightTable").on("click", "#btnConfirmCateringFightTable", function () {
    var tableId = $(".cateringTableList-ul>li.active").attr('data-id');
    Deke.DeKe_dialog.show_Url2("用餐人数", "/html/cash/jishu.html?v=25", eatNumberFn(tableId, 1), ['310px', '']);
});

// 继续加菜
$(document).unbind("click", "#btnCateringContinueAddFoods").on("click", "#btnCateringContinueAddFoods", function () {
    $('#openCateringTableContent').hide();
    $('#funcCateringAlreadyOpen_Table_foods').hide();
    $('#funcCateringDefault').show();
    $("#btnAddfoodsOrCutfoods").hide(0);//
    $("#btnRestaurantOrBale").show(0);//
    $('#catering_CateringGrade').attr('data-addFood', true); // 标记为继续加菜
    $('#Cashlefsit').html('');
});

//餐饮版，点击区域
$(document).unbind("click", "#cateringRegionNavListHtml>li").on("click", "#cateringRegionNavListHtml>li", function () {
    $(this).addClass("swiper-slide-active").siblings("li").removeClass("swiper-slide-active");
    var region_id = $(this).attr('data-id');
    if (region_id > 0) {
        getCashierRegionTableInfo(1, false, false, region_id, -1);
    }
    else {
        getCashierRegionTableInfo(0, true, true, 0, -1);
    }
});

// 打开开台
$('#openCateringTable').click(function () {
    $('#openCateringTableContent').show(0);
    getCashierRegionTableInfo(0, true, true, 0, -1);
});

// 关闭房台
$('#closeCateringTableContent').click(function () {
    commondCleanCateringGrade(-1);
    commondCleanOderInfos();
    $('#openCateringTableContent').hide();
    $("#btnRestaurantOrBale").show(0);
    $("#btnAddfoodsOrCutfoods").hide(0);
});

// 控制所有房台相关功能按钮
function closeCateringFunc(type) {
    $('#funcCateringFistFreeTable').hide();
    $('#funcCateringAlreadyOpen_Table').hide();
    $('#funcCateringAlreadyOpen_Table_foods').hide();
    $('#funcCateringDefault').hide();
    if (type == -1) {

        $('#funcCateringDefault').show();
    }
    else if (type == 0) { // 空闲

        $('#funcCateringDefault').show();
        $('#btnCateringOpenCateringTable').click();
        // $('#funcCateringFistFreeTable').show();
    }
    else if (type == 1) { //已开台
        $('#funcCateringAlreadyOpen_Table').show();
    }
    else if (type == 2) { //正在使用中
        $('#funcCateringAlreadyOpen_Table_foods').show();
    }
}

// 加载房台信息
function getCashierRegionTableInfo(queryType, queryRegion, queryTableCount, regionId, using_state) {
    var cateringRegionNavListHtml = '<li data-id="-1" class="swiper-slide activ"><span>全部</span></li>'; // 区域HTML
    var cateringTableListHtml = ''; // 全部房台 html
    var cateringPageCount;//房台总的页数
    var tableCountSize;//房台加载当前的页数的数量
    var tablePageSize;
    $.getJSON('/Catering/GetCashierRegionTableInfo', {
        QueryType: queryType || 0,
        PageIndex: 1,
        PageSize: 200,
        queryRegion: queryRegion,
        queryTableCount: queryTableCount,
        regionId: regionId,
        using_state: using_state
    }, function (result) {
        var tablePageList = result.cateringTablePageList;
        if (queryType < 2) { // 默认查询全部状态的房台
            var cateringTableCount = result.cateringTableCount;
            if (queryType == 0) { // 第一次打开加载区域信息、全部房台、房台统计信息
                var regionList = result.cateringRegionList;
                if (regionList != null && regionList.length > 0) {
                    _g_cateringRegionListCacheJson = regionList;
                    for (var i = 0; i < regionList.length; i++) {
                        cateringRegionNavListHtml += '<li data-id="' + regionList[i].sv_region_id + '" class="swiper-slide"><span>' + regionList[i].sv_region_name + '</span></li>';
                    }
                }
                $('#cateringRegionNavListHtml').html(cateringRegionNavListHtml);
                setTimeout(function () {
                    var mySwiper = new Swiper('.swiper-container_table', {
                        slidesPerView: 6,
                        paginationClickable: true,
                        spaceBetween: 4,
                        freeMode: true,
                        //nextButton: '.swiper-button-next',
                        //prevButton: '.swiper-button-prev',
                    });
                }, 200);
            }
            else if (queryType == 1) {// 点击区域加载、全部房台、或房台统计信息

            }
            if (tablePageList != null && tablePageList.length > 0) {
                cateringPageCount = Math.ceil(tablePageList.length / cateringPageSize);
                for (var j = 0; j < cateringPageCount; j++) {
                    if (j == cateringPageCount - 1) {
                        tableCountSize = cateringPageSize * (j + 1) - (cateringPageSize * (j + 1) - tablePageList.length);
                    } else {
                        tableCountSize = cateringPageSize * (j + 1);
                    }
                    tablePageSize = j * cateringPageSize;
                    cateringTableListHtml += '<div class="swiper-slide"><ul class="tablelist-ul cateringTableList-ul" style="min-height:340px;">';
                    for (var i = tablePageSize; i < tableCountSize; i++) {
                        var using_stateClass = ''; // 加载房台状态class
                        var using_stateText = '';
                        var table_type_text = '';
                        var table_type = 0; // 普通房台
                        var sv_table_use_number = tablePageList[i].sv_table_number;
                        if (tablePageList[i].sv_table_using_state == 0) { // 空闲
                            using_stateClass = 'tableidle';
                            using_stateText = '空闲';
                        }
                        else if (tablePageList[i].sv_table_using_state == 1) { // 已开台，等待客户点餐
                            using_stateClass = 'orderdishes';
                            using_stateText = '点菜';
                            sv_table_use_number = tablePageList[i].sv_table_use_number;
                        }
                        else if (tablePageList[i].sv_table_using_state == 2) { // 正在使用中
                            using_stateClass = 'tableuseing';
                            using_stateText = minuteByDateTimeTemp(tablePageList[i].sv_table_begindate);
                            //using_stateText = '正在使用中';
                            sv_table_use_number = tablePageList[i].sv_table_use_number;
                        }
                        if (tablePageList[i].sv_table_is_merge) { // 并桌
                            table_type_text = '并台';
                            table_type = 1; // 并台
                        }
                        else if (tablePageList[i].sv_table_is_together) {
                            table_type_text = '拼台';
                            table_type = 2; //拼台 
                        }

                        cateringTableListHtml += '<li data-id="' + tablePageList[i].sv_table_id + '" data-personNum ="' + tablePageList[i].sv_table_use_number + '" data-name="' + tablePageList[i].sv_table_name + '" ';
                        cateringTableListHtml += 'data-mergeparentid="' + tablePageList[i].sv_table_merge_parentid + '" data-type="' + table_type + '" data-state="' + tablePageList[i].sv_table_using_state + '" class="' + using_stateClass + '">';
                        cateringTableListHtml += '<div class="peoplenumber"><span>' + sv_table_use_number + '人桌</span></div>';
                        cateringTableListHtml += '<div class="tablenumber"><span>' + tablePageList[i].sv_table_name + '</span></div>';
                        cateringTableListHtml += '<div class="tablestatus"><span>' + using_stateText + '</span><span class="addtablenumber">' + table_type_text + '</span></div></li>';
                    }
                    cateringTableListHtml += '</ul></div>';
                }
            }
            else {
                cateringTableListHtml += '<li class="addtable"><a href="/CateringTable/Table">添加房台</a></li>';
            }
            for (var key in cateringTableCount) {
                $('#' + key).html(cateringTableCount[key]);
            }
            $('#cateringTableListHtml').html(cateringTableListHtml);
        }
        else if (queryType == 2) {// 查询空闲房台
            var excludeTableId = $(".cateringTableList-ul>li.active").attr('data-id');
            var catering_free_tableList_html = '';
            if (tablePageList.length > 0) {
                for (var i = 0; i < tablePageList.length; i++) {
                    if (excludeTableId != tablePageList[i].sv_table_id) {
                        console.log(tablePageList);
                        catering_free_tableList_html += '<li data-id="' + tablePageList[i].sv_table_id + '" data-personNum ="' + tablePageList[i].sv_table_use_number + '"';
                        catering_free_tableList_html += 'data-state="' + tablePageList[i].sv_table_using_state + '" data-name="' + tablePageList[i].sv_table_name + '" >';
                        catering_free_tableList_html += '<div class="peopleNumber"><span>' + tablePageList[i].sv_table_number + '人桌</span></div>';
                        catering_free_tableList_html += '<div class="tableNumber"><span>' + tablePageList[i].sv_table_name + '</span></div>';
                        catering_free_tableList_html += '<div class="tablestat"><span>空闲</span></div>';
                        catering_free_tableList_html += '</li>';
                    }
                }
            }
            $('#catering_free_tableList').html(catering_free_tableList_html);
        }
    });
}

// 房台操作（operateType=0 开台, 1 -- 关台或叫清桌, 2 -- 点餐, 3--换台, 4--拼台, 5 --并台）
function operateCateringTableByOperateType(operateTableId, openTableNum, andCateringTableIds, changeOrFightCateringTableId, operateType) {
    var operateData = {
        OperateTableId: operateTableId, // 操作房台Id
        OpenTableNum: openTableNum, // 开台或拼台人数
        AndCateringTableIds: andCateringTableIds, // 多个并台数据
        ChangeOrFightCateringTableId: changeOrFightCateringTableId,//换台Id 拼台Id
        OperateType: operateType
    };
    var verificationNum = /^[1-9]*[1-9][0-9]*$/;
    var cateringTableName = $('.cateringTableList-ul>li.active').attr('data-name');
    if (operateData.OperateTableId == null || operateData.OperateTableId == '' || operateData.OperateTableId == undefined || operateData.OperateTableId <= 0) {
        layer.msg('请选择要操作的房台');
    }
    else if (operateData.OperateType == 0 && !verificationNum.test(operateData.OpenTableNum)) { // 点餐
        layer.msg('请输入正确的就餐人数！');
        $("#jishukuan").val("").focus();
    }
    else if ((operateData.OperateType == 3 || operateData.OperateType == 4) && (operateData.ChangeOrFightCateringTableId <= 0 || operateData.ChangeOrFightCateringTableId == null || operateData.ChangeOrFightCateringTableId == undefined || operateData.ChangeOrFightCateringTableId == '')) { // 换台
        if (operateData.OperateType == 3) {
            layer.msg('请请选择房台！');
        }
        else {
            layer.msg('请请选择房台！');
        }
    }
    else if (operateData.OperateType == 5 && operateData.AndCateringTableIds.length <= 0) { // 并台
        layer.msg('请请选择房台！');
    }
    else {
        $.post('/Catering/OperateCateringTableByOperateType', operateData, function (result) {
            if (result.succeed) {
                if (operateData.OperateType == 0) {
                    $('#catering_CateringGrade').text(cateringTableName).attr('data-tableId', operateTableId).attr('data-withListId', 0).attr('data-personNum', openTableNum).attr('data-together', false).attr('data-addFood', false);
                    setTimeout(function () {
                        layer.closeAll();
                        $('#openCateringTableContent').hide();
                    }, 300);
                }
                else if (operateData.OperateType == 1) {
                    commondCleanCateringGrade();
                    layer.closeAll();
                    getCashierRegionTableInfo(0, true, true, 0, -1);
                    $('#operatinglist').hide();
                }
                else if (operateType == 5 || operateType == 3) {
                    commondCleanCateringGrade();
                    $('#Cashlefsit').html('');
                    zhonger();
                    shuxin();  // 获取最新的流水号    
                    setTimeout(function () {
                        layer.closeAll();
                    }, 300);
                    getCashierRegionTableInfo(0, true, true, 0, -1);
                    $('#operatinglist').hide();
                }
            }
            else {
                layer.msg(result.errmsg);
                getCashierRegionTableInfo(0, true, true, 0, -1);
            }
            //-----开台成功，通知其他客户端刷新----//
            try {
                socket.emit('common_by_shop_refresh_desk_server', { user_id: user_id });//刷新房台的socket.io
            } catch (e) {
                console.log(e.message);
            }
        });
    }
}

$("#addCateringTaste").click(function () {
    var productId = $("#Cashlefsit .active").attr('id');
    if (productId > 0) {
        Deke.DeKe_dialog.show_Url2("选择口味", "/Catering/_PartialTaste", loadCateringTasteInfo, ['560px', '520px']);
    }
    else {
        layer.msg('您还没有选中菜品！');
    }
});

// 加载商品相应口味信息
function loadCateringTasteInfo() {
    // 读取菜品信息
    var productId = $("#Cashlefsit .active").attr('id');
    var productcategoryId = $("#Cashlefsit .active").attr('data-categoryid');
    $('#cateringProductName').html($("#Cashlefsit .active").attr('data-prname'));
    $('#cateringProductPrice').html($("#Cashlefsit .active").find(".jiage").text());
    $('#cateringProductNowPrice').html($("#Cashlefsit .active").find(".jiage").text());
    $('#cateringProductNum').html($("#Cashlefsit .active").find(".nump").text());//nump
    $('#cateringProductTotalPrice').html($("#Cashlefsit .active").find(".zhong").text());
    $('#cateringProductImgUrl').attr('src', _g_res_images_url + $("#Cashlefsit .active").attr('data-url'));
    $('#cateringPackingCharges').html($("#Cashlefsit .active").attr('data-packprice'));
    var ckPackPriceObj = $('#Cashlefsit li.active').find('.catering_taste_list i.productblae');
    var orderProductRemarks = $('#Cashlefsit li.active').find('.catering_taste_remarks .orderProductRemarks').text(); // 读取备注
    // 打包是否选择
    if (ckPackPriceObj && ckPackPriceObj.length == 1) {
        $('#ckCateringIsPacking').attr("checked", 'true');
    }
    if (orderProductRemarks) {
        $('#txtOrderProductRemarks').val(orderProductRemarks);
    }
    var cateringTasteListHtml = '';
    var cateringChargingListHtml = '';
    var cateringSpecLstHtml = '';
    $.getJSON('/Catering/GetCashierTasteInfoQueryByProductId', {
        productId: productId, productcategoryId: productcategoryId
    }, function (data) {
        if (data) {
            var tasteList = data.tasteList;
            var chargingList = data.chargingList;
            var specList = data.specList;
            // 口味区
            if (tasteList.length > 0) {
                cateringTasteListHtml += '<div class="title">口味：</div><ul>';
                for (var i = 0; i < tasteList.length; i++) {
                    cateringTasteListHtml += '<li class="' + selectProductTasteActive(tasteList[i].id, 0) + '" data-id="' + tasteList[i].id + '" data-name="' + tasteList[i].name + '" data-price="' + tasteList[i].price + '">' + tasteList[i].name + " " + tasteList[i].price + '</li>';
                }
                cateringTasteListHtml += '</ul>';
            }
            // 加料区
            if (chargingList.length > 0) {
                cateringChargingListHtml += '<div class="title">加料：</div><ul>';
                for (var i = 0; i < chargingList.length; i++) {
                    cateringChargingListHtml += '<li class="' + selectProductTasteActive(chargingList[i].id, 1) + '" data-id="' + chargingList[i].id + '" data-name="' + chargingList[i].name + '" data-price="' + chargingList[i].price + '">' + chargingList[i].name + " " + chargingList[i].price + '</li>';
                }
                cateringChargingListHtml += '</ul>';
            }
            // 规格区
            if (specList.length > 0) {
                cateringSpecLstHtml += '<div class="title">规格：</div><ul>';
                for (var i = 0; i < specList.length; i++) {
                    cateringSpecLstHtml += '<li class="' + selectProductTasteActive(specList[i].id, 2) + '" data-id="' + specList[i].id + '" data-name="' + specList[i].name + '" data-price="' + specList[i].price + '">' + specList[i].name + " " + specList[i].price + '</li>';
                }
                cateringSpecLstHtml += '</ul>';
            }
        }
        $('#cateringTasteListHtml').html(cateringTasteListHtml);
        $('#cateringChargingListHtml').html(cateringChargingListHtml);
        $('#cateringSpecLstHtml').html(cateringSpecLstHtml);
    });
}

// 判断口味是否被选中
function selectProductTasteActive(tasteId, type) {
    var oldProductTasteListObjHtml = $('#Cashlefsit li.active').find('.catering_taste_list i');
    var oldProductTasteList = [];
    if (oldProductTasteListObjHtml.length > 0) {
        $.each(oldProductTasteListObjHtml, function () {
            var productTasteModel = {
                sv_taste_id: $(this).attr('data-id'),
                sv_taste_data_type: $(this).attr('data-type')
            };
            oldProductTasteList.push(productTasteModel);
        });
    }
    var isActive = '';
    if (oldProductTasteList.length > 0) {
        for (var j = 0; j < oldProductTasteList.length; j++) {
            if (tasteId == oldProductTasteList[j].sv_taste_id && oldProductTasteList[j].sv_taste_data_type == type) {
                isActive = 'active';
            }
        }
    }
    return isActive;
}

// 点击口味
$(document).unbind("click", "#cateringTasteListHtml li").on("click", "#cateringTasteListHtml li", function () {
    changeCateringProductTotalPrice($(this), false);
});

// 点击加料
$(document).unbind("click", "#cateringChargingListHtml li").on("click", "#cateringChargingListHtml li", function () {
    changeCateringProductTotalPrice($(this), false);
});

// 点击规格
$(document).unbind("click", "#cateringSpecLstHtml li").on("click", "#cateringSpecLstHtml li", function () {
    changeCateringProductTotalPrice($(this), false);
});

// 增加菜品数量
$(document).unbind("click", "#Cashlefsit li.active .catering_plus").on("click", "#Cashlefsit li.active .catering_plus", function () {
    $('#num_jia').click();
});

// 减少菜品数量
$(document).unbind("click", "#Cashlefsit li.active .catering_minus").on("click", "#Cashlefsit li.active .catering_minus", function () {
    $('#num_jian').click();
});

// 选中是否打包
$(document).unbind("click", "#ckCateringIsPacking").on("click", "#ckCateringIsPacking", function () {
    var ckCateringIsPacking = $(this).is(':checked');
    var cateringProductNum = parseFloat($('#cateringProductNum').text() || 0);
    var cateringProductNowPrice = parseFloat($('#cateringProductNowPrice').text() || 0);
    var packprice = parseFloat($("#Cashlefsit .active").attr('data-packprice') || 0);
    packprice = parseFloat(cateringProductNum * packprice);
    var cateringProductTotalPrice = parseFloat($('#cateringProductTotalPrice').text() || 0);
    if (ckCateringIsPacking) {
        cateringProductTotalPrice = parseFloat(packprice + cateringProductTotalPrice);
        $('#cateringPackingChargesTotalPrice').html(packprice.toFixed(2));
    }
    else {
        cateringProductTotalPrice = parseFloat(cateringProductTotalPrice - packprice);
        $('#cateringPackingChargesTotalPrice').html(0.00);
    }
    $('#cateringProductTotalPrice').text(cateringProductTotalPrice.toFixed(2));
});

// 确认选择口味项
$(document).unbind("click", "#btnSelectCateringTaste").on("click", "#btnSelectCateringTaste", function () {
    var tasteListObjHtml = $('#cateringTasteListHtml li.active');
    var chargingListObjHtml = $("#cateringChargingListHtml li.active");
    var specListObjHtml = $("#cateringSpecLstHtml li.active");
    var remarks = $('#txtOrderProductRemarks').val().replace(/\ +/g, "");
    var ckCateringIsPacking = $("#ckCateringIsPacking").is(':checked'); // 是否打包
    var packingChargesTotalPrice = ($('#cateringPackingCharges').text() || 0); // 打包金额
    var selectHtml = '';
    var remarksHtml = '';
    if (tasteListObjHtml.length > 0) { // 口味
        $.each(tasteListObjHtml, function (i, item) {
            selectHtml += '<i data-id="' + $(this).attr('data-id') + '" data-price = "' + $(this).attr('data-price') + '" data-type="0" class="productTaste">' + $(this).attr('data-name') + '(' + $(this).attr('data-price') + ')</i>';
        });
    }
    if (chargingListObjHtml.length > 0) { // 加料
        $.each(chargingListObjHtml, function (i, item) {
            selectHtml += '<i data-id="' + $(this).attr('data-id') + '" data-price = "' + $(this).attr('data-price') + '" data-type="1" class="addFoods">' + $(this).attr('data-name') + '(' + $(this).attr('data-price') + ')</i>';
        });
    }
    if (specListObjHtml.length == 1) { // 规格
        selectHtml += '<i data-id="' + specListObjHtml.attr('data-id') + '" data-price = "' + specListObjHtml.attr('data-price') + '" data-type="2" class="addFoodSpec">' + specListObjHtml.attr('data-name') + '(' + specListObjHtml.attr('data-price') + ')</i>';
    }
    if (ckCateringIsPacking) { // 打包
        selectHtml += '<i class="productblae" data-id="0" data-price="' + packingChargesTotalPrice + '" data-type="3">打包(' + packingChargesTotalPrice + ')</i>';
    }
    if (isNullOrWhiteSpace(remarks)) { // 获取备注信息
        remarksHtml = '<p class="foodsRemarks"><span style="padding-right:5px;">备注:</span><span class="orderProductRemarks">' + remarks + '</span></p>';
    }
    var cateringProductTotalPrice = parseFloat($('#cateringProductTotalPrice').text() || 0); // 总价
    var cateringProductNum = parseFloat($('#cateringProductNum').text() || 0); // 数量
    var averagePrice = (cateringProductTotalPrice / cateringProductNum).toFixed(2); // 计算平均价格
    $('#Cashlefsit li.active').find('.zhong').text(cateringProductTotalPrice);
    $('#Cashlefsit li.active').find('.jiage').text(averagePrice); // 得到平均价格
    $("#Cashlefsit .active").attr("data-untprice", averagePrice); // 得到口味后的单价
    $('#Cashlefsit li.active').find('.catering_taste_list').html(selectHtml);
    $('#Cashlefsit li.active').find('.catering_taste_remarks').html(remarksHtml); // 得到备注信息
    zhonger();
    layer.closeAll();
});

// 口味选择元素操作及价格操作
function changeCateringProductTotalPrice(priceObj, selects) {
    var isActive = priceObj.hasClass('active');
    var thisTastePrice = parseFloat(priceObj.attr('data-price') || 0);
    var thisId = priceObj.attr('data-id');
    var cateringProductTotalPrice = parseFloat($('#cateringProductTotalPrice').text() || 0);
    var cateringProductNowPrice = parseFloat($('#cateringProductNowPrice').text() || 0);
    var cateringProductNum = parseFloat($('#cateringProductNum').text() || 0);
    if (selects) {
        var prevActive = $("#cateringSpecLstHtml li.active").attr('data-price');
        var prevId = $("#cateringSpecLstHtml li.active").attr('data-id');
        if (prevActive > 0 && thisId != prevId) {
            cateringProductTotalPrice = cateringProductTotalPrice - parseFloat(prevActive);
        }
        $("#cateringSpecLstHtml li").removeClass('active');
    }
    if (isActive) {
        priceObj.removeClass('active');
        cateringProductTotalPrice = cateringProductTotalPrice - (thisTastePrice * cateringProductNum);
    }
    else {
        priceObj.addClass('active');
        cateringProductTotalPrice = cateringProductTotalPrice + (thisTastePrice * cateringProductNum);
    }
    $('#cateringProductTotalPrice').text((cateringProductTotalPrice).toFixed(2));
}

//选择换桌/拼桌/换台
$(document).unbind("click", ".cateringSelecttarget>li").on("click", ".cateringSelecttarget>li", function () {
    $(this).addClass("active").siblings("li").removeClass("active");
});

//选择区域
$(document).unbind("click", "#catering_tableArealist_html>li").on("click", "#catering_tableArealist_html>li", function () {
    var active_region_id = $(this).attr('data-id');
    $(this).addClass("active").siblings("li").removeClass("active");
    if (active_region_id > 0) {
        getCashierRegionTableInfo(2, false, false, active_region_id, 0); // 根据区域读取空闲房台
    }
    else {
        getCashierRegionTableInfo(2, false, false, 0, 0); // 读取全部空闲房台
    }
});

//选择房台
$(document).unbind("click", "#catering_free_tableList>li").on("click", "#catering_free_tableList>li", function () {
    var table_state = $(".cateringTableList-ul>li.active").attr('data-state');
    if (table_state == 0) { // 空闲
        if ($(this).hasClass('active')) {
            $(this).removeClass("active");
        }
        else {
            $(this).addClass("active");
        }
    }
    else {
        $(this).addClass("active").siblings("li").removeClass("active");
    }
});

// 确认选择房台btnCateringSelectTableInfo
$(document).unbind("click", "#btnCateringSelectTableInfo").on("click", "#btnCateringSelectTableInfo", function () {
    var selectTableListId = [];
    var catering_free_tableList = $('#catering_free_tableList>li.active');
    var newTableId = $('#catering_free_tableList>li.active').attr('data-id');// 换台id
    var table_state = $(".cateringTableList-ul>li.active").attr('data-state');
    var tableType = $(".cateringTableList-ul>li.active").attr('data-type'); // 房台类型
    var mainTableId = $(".cateringTableList-ul>li.active").attr('data-id'); // 拼桌或并台房台的id
    if (tableType == 2) { // 拼桌已在就餐的人进行换桌操作
        var withOrderListId = $('#cateringTableOrderListHtml>li.active').attr('data-withlistid');
        $.post('/Catering/FightTableChangeToNewTable', {
            mainTableId: mainTableId, orderListId: withOrderListId, newTableId: newTableId
        }, function (result) {
            if (result.succeed) {
                commondCleanCateringGrade();
                setTimeout(function () {
                    layer.closeAll();
                }, 300);
                getCashierRegionTableInfo(0, true, true, 0, -1);
            }
            else {
                layer.msg(result.errmsg);
            }
        });
    }
    else {
        if (table_state == 0) { // 空闲时只有并台操作
            if (catering_free_tableList.length > 0) {
                $.each(catering_free_tableList, function (item) {
                    var model = {
                        OperateTableId: $(this).attr('data-id')
                    };
                    selectTableListId.push(model);
                });
                if (selectTableListId.length > 0 && table_state == 0) {
                    Deke.DeKe_dialog.show_Url2("用餐人数", "/html/cash/jishu.html?v=25", saveCateringSelectTableInfo(selectTableListId), ['310px', '']);
                }
            }
            else {
                layer.msg('请选择房台');
            }
        }
        else if (table_state == 1 || table_state == 2) { // 待点餐状态或已点餐状态可以进行换台操作
            if (catering_free_tableList.length == 1) {
                var thisChangeId = $(".cateringTableList-ul>li.active").attr('data-id'); // 当前选中的房台Id，或旧的房台Id
                operateCateringTableByOperateType(thisChangeId, 0, 0, newTableId, 3); // 转台
            }
            else {
                layer.msg('请选择一个目标房台！');
            }
        }
    }
});

// 确认并台操作
function saveCateringSelectTableInfo(tableListId) {
    setTimeout(function () {
        $("#woquren").click(function () {
            if ($("#jishukuan").val().replace(/\ +/g, "")) {;
                var thisChangeId = $(".cateringTableList-ul>li.active").attr('data-id'); // 当前选中的房台Id，或旧的房台Id
                var tableNum = $("#jishukuan").val().replace(/\ +/g, "");
                if (tableNum > 0) {
                    operateCateringTableByOperateType(thisChangeId, tableNum, tableListId, 0, 5); // 并台
                }
                else {
                    layer.msg('请输入就餐人数！');
                    $("#jishukuan").focus();
                }
            }
            else {
                layer.msg('请输入就餐人数！');
                $("#jishukuan").focus();
            }
        });
    }, 100);
}

$("#cateringChangeTable").click(function () {
    Deke.DeKe_dialog.show_Url2("选择房台", "/Catering/_PartialChangeCateringTable", null, ['790px', '520px']);
});

// -----------------------餐饮打印-----------------------//
// 打印给客户单子
$('#btnCateringCustomerPrint').click(function () {
    if (productlistJsonList && productlistJsonList.length > 0) {
        //餐饮打印
        var _print_user = [];
        var order_receivabley = parseFloat($(".cateringProductTotalPrice").html() || 0).toFixed(2);
        var data2 = {
            "everyday_serialnumber": GetDailySerialNumber(true),
            "prlist": productlistJsonList,
            "order_running_id": $("#danhao").text(),
            "order_receivable": order_receivabley,
            "order_payment": "待收",
            "order_money": order_receivabley,
            "order_payment2": "",
            "order_money2": 0,
            "order_change": 0,
            "user_cardno": "",
            "order_discount": 1,
            "order_receivabley": order_receivabley,
            "sv_remarks": "",
            "givingtype": "",
            "deserved": "",
            sv_recommended_peopleid: "",
            free_change: 0,
            sv_member_discount: 1,
            sv_member_total_money: order_receivabley,
            sv_order_total_money: order_receivabley,
            sv_give_change: 0,
            authcode: "",
            type: "", // 微信或支付宝支付类型（扫条码，扫二维码）
            WhetherAsCatering: true, // 临时标记为餐饮
            sv_table_id: ($('#catering_CateringGrade').attr('data-tableid') || 0),// 房台id 
            sv_catering_grade: ($('#catering_CateringGrade').text() || ''),   //房牌桌号
            sv_coupon_amount: ($('#sv_coupon_amount').val() || 0),// 优惠券金额
            sv_coupon_discount: ($('#sv_coupon_discount').val() || 0), // 优惠券折扣 ，
            sv_without_list_id: ($('#catering_CateringGrade').attr('data-withListId') || 0),
            sv_person_num: ($('#catering_CateringGrade').attr('data-personNum') || 0),// 就餐人数
            sv_order_source: 0, // 订单来源

        };
        $.getJSON("/system/Getprint", function (data) {
            data2["user"] = data.user;
            pushcateringprintData(JSON.stringify(data2), JSON.stringify(data), 1);
        });
    }
    else {
        layer.msg('请选择需要打印的菜品！');
    }
});

// 厨房打印
$(document).unbind("click", "#btnCateringOrderPrint").on("click", "#btnCateringOrderPrint", function () {
    if (_g_catering_order_list_print_Json && _g_catering_order_list_print_Json.prlist && _g_catering_order_list_print_Json.prlist.length > 0) {
        $.getJSON("/system/Getprint", function (data) {
        pushcateringprintData(JSON.stringify(_g_catering_order_list_print_Json), JSON.stringify(data), 2);
            layer.msg('已向厨房发送菜品打印', { time: 1500 });
        });
    }
    else {
        layer.msg('请选择打印数据');
    }
});

// 总单打印
$(document).unbind("click", "#btnCateringOrderTotals").on("click", "#btnCateringOrderTotals", function () {
    if (_g_catering_order_list_print_Json && _g_catering_order_list_print_Json.prlist && _g_catering_order_list_print_Json.prlist.length > 0) {
        $.getJSON("/system/Getprint", function (data) {
        pushcateringprintData(JSON.stringify(_g_catering_order_list_print_Json), JSON.stringify(data), 1);
            layer.msg('已发送打印数据！', { time: 1500 });
        });
    }
    else {
        layer.msg('请选择打印数据');
    }
});

// -----------------------餐饮打印-----------------------//

//------------------- 餐饮模块------------------------//

// ------------------ 优惠券处理---------------------//

//优惠券的弹窗
$(document).unbind("click", "#orderCouponBtn").on("click", "#orderCouponBtn", function () {
    Deke.DeKe_dialog.show_Url2("选择优惠券", "/Catering/_PartialCoupon", couponList, ['620px', '450px']);
});

// 优惠券回调信息
function couponList() {
    var memberId = $('#huiyuan_id').attr('data-id');
    if (isNullOrWhiteSpace(memberId) && memberId > 0) {
        getCouponListByMemberIdOrCouponCode(memberId, null, 0);
    }
}

// 读取优惠券
function getCouponListByMemberIdOrCouponCode(memberId, couponCode, queryType) {
    var coupon_record_id = $('#hidden_coupon_record_id').val();
    var couponListHtml = '';
    $.getJSON('/Coupon/GetCouponListByMemberIdOrCouponCode', {
        memberId: memberId,
        couponCode: couponCode,
        queryType: queryType
    }, function (data) {
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var activeClass = "";
                if (data[i].sv_record_id == coupon_record_id) {
                    activeClass = "class=\"active\"";
                }
                var dateTime = '';
                var endDateTimeTamp = 0;
                if (data[i].sv_coupon_termofvalidity_type == 0) { // 日期
                    endDateTimeTamp = Date.parse(new Date(data[i].sv_coupon_enddate));
                    endDateTimeTamp = endDateTimeTamp / 1000;
                    dateTime = new Date(data[i].sv_coupon_bendate).Format("yyyy-MM-dd") + '-' + new Date(data[i].sv_coupon_enddate).Format("yyyy-MM-dd");
                }
                else {
                    var dateNow = new Date(); // sv_coupon_numday
                    endDateTimeTamp = dateNow.setDate(dateNow.getDate() + data[i].sv_coupon_numday);
                }
                couponListHtml += '<li data-id ="' + data[i].sv_record_id + '" data-money="' + data[i].sv_coupon_money + '" data-type="' + data[i].sv_coupon_type + '" data-conditions="' + data[i].sv_coupon_use_conditions + '" data-time="' + endDateTimeTamp + '" ' + activeClass + '><i class="selectcoupon"></i>';
                couponListHtml += '<div class="searchcouponlistinfo"><div class="couponinfo">';
                couponListHtml += '<span>' + data[i].sv_coupon_name + '</span></div><div class="coupontime">';
                couponListHtml += '<span>有效期：<i>' + dateTime + '</i></span></div></div>';
                couponListHtml += '<div class="couponmoney"><span></span><i class="moneytype">' + data[i].sv_coupon_money + '</i>';
                couponListHtml += '</div></li>';
            }
        }
        $('#couponListHtml').html(couponListHtml);
    });
}

// 点击优惠券
$(document).unbind("click", "#couponListHtml>li").on("click", "#couponListHtml>li", function () {
    $(this).addClass("active").siblings("li").removeClass("active");
});

// 根据优惠码搜索 txtSeachCouponCode

$(document).unbind("keypress", "#txtSeachCouponCode").on("keypress", "#txtSeachCouponCode", function (event) {
    var txtSeachCouponCode = $(this).val().replace(/\ +/g, "");
    if (event.keyCode == 13) {
        if (isNullOrWhiteSpace(txtSeachCouponCode)) {
            getCouponListByMemberIdOrCouponCode(null, txtSeachCouponCode, 1);
        }
        else {
            layer.msg('请输入优惠券码！');
            $(this).focus();
        }
    }
});

// 确认选择优惠券 btnConfirmSelectionCoupon
$(document).unbind("click", "#btnConfirmSelectionCoupon").on("click", "#btnConfirmSelectionCoupon", function (event) {
    var selectCouponRecordId = ($('#couponListHtml>li.active').attr('data-id') || 0);
    var couponMoney = parseFloat($('#couponListHtml>li.active').attr('data-money') || 0); // 优惠券金额或折扣
    var couponType = $('#couponListHtml>li.active').attr('data-type');
    var conditionsMoney = parseFloat($('#couponListHtml>li.active').attr('data-conditions') || 0); // 使用条件
    var couponTermOfvalidit = parseInt($('#couponListHtml>li.active').attr('data-time') || 0);
    var coupon_record_id = $('#hidden_coupon_record_id').val();
    var amountReceivable = $('#yinshou').val(); // 
    var discountAmount = 0; // 优惠后的金额
    var timestamp = Date.parse(new Date().Format("yyyy-MM-dd 00:00:00"));
    timestamp = timestamp / 1000;
    if (coupon_record_id && coupon_record_id > 0) {
        layer.msg('你已经使用了一张优惠券，不能叠加！');
        return;
    }
    if (timestamp > couponTermOfvalidit && couponTermOfvalidit > 0) {
        layer.msg('该优惠券已过期');
        return;
    }
    if (isNullOrWhiteSpace(amountReceivable)) {
        amountReceivable = parseFloat(amountReceivable.replace(/\ +/g, "") || 0);
    }
    if (selectCouponRecordId > 0) {
        if (amountReceivable >= conditionsMoney && couponMoney > 0) {
            if (couponType == 0) { // 优惠金额
                discountAmount = parseFloat(amountReceivable - couponMoney);
                $('#hidden_coupon_amount').val(couponMoney);
            }
            else if (couponType == 1 && couponMoney < 100) { // 优惠折扣
                discountAmount = parseFloat(amountReceivable * (couponMoney / 100));
                $('#hidden_coupon_discount').val(couponMoney);
            }
            $('#yinshou').val(discountAmount).change();
            layer.close(index);
            $('#hidden_coupon_record_id').val(selectCouponRecordId);
        }
        else {
            layer.msg('当前订单金额不满足该优惠券');
        }
    }
    else {
        layer.msg('请选择优惠券！');
    }
});

// ------------------ 优惠券处理---------------------//


//-------------------交易查询，及处理订单退货-------------//
//查看交易
$("#viewTheTransaction").click(function () {
    Deke.DeKe_dialog.show_Url2("查看单日交易", "/Catering/_PartialViewTheTransaction", viewTheTransaction, ['780px', '520px']);
});

// 查询交易回调方法
function viewTheTransaction() {
    getCashierOrderListPagelist(0, 1, 500, null);
}

// 点击订单信息查询订单商品信息
$(document).unbind("click", "#cashierOrderListHtml>li").on("click", "#cashierOrderListHtml>li", function () {
    $(this).addClass("active").siblings("li").removeClass("active");
    var order_id = $(this).attr('data-id');
    var order_state = $(this).attr('data-state');
    if (isNullOrWhiteSpace(order_id)) {
        if (order_state == 1 || order_state == 2) {
            $('#btnOrderAllReturnGoods').attr('disabled', 'disabled');
            $('#btnOrderListPrint').attr('disabled', 'disabled');
        }
        else {
            $('#btnOrderAllReturnGoods').removeAttr('disabled');
            $('#btnOrderListPrint').removeAttr('disabled');
        }
        getCashierOrderListPagelist(2, 1, 500, null, order_id);
    }
});

// 根据相应的条件读取订单或商品信息
function getCashierOrderListPagelist(queryType, pageIndex, pageSize, seachStr, order_id) {
    var orderListHtml = '';
    var orderProductHtml = '';
    var loadIndex = commonOpenLoading();
    $.getJSON('/settle/GetCashierOrderListPagelist', {
        QueryType: queryType || 0,
        pageIndex: 1,
        pageSize: 500,
        seachStr: seachStr,
        queryDayType: 0,
        IsQueryPageList: true,
        beginDate: null,
        endDate: null,
        order_id: order_id
    }, function (data) {
        commonCloseLoading(loadIndex);
        if (data) {
            if (queryType == 0) { // 查询订单信息
                var orderList = data.orderList;
                if (orderList && orderList.length > 0) {
                    for (var i = 0; i < orderList.length; i++) {
                        orderListHtml += '<li data-id="' + orderList[i].order_running_id + '" data-state="' + orderList[i].order_state + '">';
                        orderListHtml += '<div class="cateringPendingOrderlistNumber">';
                        if (_g_sv_uit_cache_name == 'cache_name_catering') { // 餐饮版
                            orderListHtml += '<span>' + (orderList[i].sv_catering_grade || '') + '</span></div>';
                        }
                        else {
                            orderListHtml += '<span>' + (i + 1) + '</span></div>';
                        }
                        orderListHtml += '<div class="cateringPendingOrderlistinformation">';
                        orderListHtml += '<div class="cateringPendingOrderNumber"><span>' + orderList[i].order_running_id + '</span></div>';
                        orderListHtml += '<div class="cateringPendingOrderTime"><span class="fl">' + new Date(orderList[i].order_datetime).Format("MM-dd hh:mm:ss") + '</span>';
                        orderListHtml += '<span class="cateringPendingOrderRemarks" style="display:none;">' + orderList[i].sv_remarks + '</span>';
                        if (orderList[i].order_state == 1) {
                            orderListHtml += '<span class="fr"><i class="orderPeopleNumber">有退货</i></span></div>';
                        }
                        else if (orderList[i].order_state == 2) {
                            orderListHtml += '<span class="fr"><i class="orderPeopleNumber">已退货</i></span></div>';
                        }
                        orderListHtml += '</div></li>';
                    }
                }
                $('#cashierOrderListHtml').html(orderListHtml);
            }
            else if (queryType == 2) {// 查询订单商品信息
                var orderProduct = data.orderProductList;
                var singleOrderNumber = 0;
                var singleOrderMoney = 0;
                if (orderProduct && orderProduct.length > 0) {
                    orderProductHtml += '<thead><tr><th>序号</th>';
                    if (_g_sv_uit_cache_name == 'cache_name_catering') { // 餐饮版
                        orderProductHtml += '<th>菜品</th>';
                    }
                    else {
                        orderProductHtml += '<th>商品</th>';
                    }
                    orderProductHtml += '<th>数量</th><th>单价</th><th>售价</th><th>操作</th></tr></thead>';//<th>口味加价</th>

                    orderProductHtml += '<tbody id="catering_order_product">';
                    for (var i = 0; i < orderProduct.length; i++) {
                        //填充加料数据
                        var taste_string = "";
                        try
                        {
                            if (orderProduct[i].cateringChargingJson) {
                                var tates = JSON.parse(orderProduct[i].cateringChargingJson);
                                for (var j = 0; j < tates.length; j++)
                                {
                                    taste_string += tates[j].sv_taste_name + "(" + tates[j].sv_taste_price + ")";
                                }
                            }
                        } catch (e)
                        {

                        }


                        var sv_p_name = (orderProduct[i].sv_p_name || "无码收银");
                        if (taste_string && taste_string.length > 1)
                        {
                            sv_p_name += taste_string;
                        }
                        var singleNumber = orderProduct[i].sv_pricing_method == 1 ? orderProduct[i].sv_p_weight : orderProduct[i].product_num;
                        orderProductHtml += '<tr> <td>' + (i + 1) + '</td><td>' + sv_p_name + '</td>';
                        orderProductHtml += '<td>' + singleNumber + '</td>';
                        orderProductHtml += '<td>' + orderProduct[i].product_unitprice + '</td> <td>' + orderProduct[i].product_total + '</td>';
                        orderProductHtml += '';
                        if (orderProduct[i].order_stutia == 2) {
                            orderProductHtml += '<td>已退货</td>';
                        }
                        else {
                            orderProductHtml += '<td><a href="javascript:void(0)" data-id="' + orderProduct[i].id + '" data-num="' + (orderProduct[i].sv_pricing_method == 1 ? orderProduct[i].sv_p_weight : orderProduct[i].product_num) + '" order_state="' + orderProduct[i].order_stutia + '" data-pricingmethod="' + orderProduct[i].sv_pricing_method + '" data-prid="' + orderProduct[i].product_id + '" class="remarksDetails">退款</a></td></tr>';
                        }
                        singleOrderMoney += orderProduct[i].product_total;//单个售价
                        singleOrderNumber += singleNumber;//单个数量
                    }
                    orderProductHtml += '</tbody>';
                }
                $("#singleOrderMoney").text(singleOrderMoney);
                $("#singleOrderNumber").text(singleOrderNumber);
                $("#showordermoneybox").show();
                //备注
                var page_order_remarks = $("#cashierOrderListHtml li.active .cateringPendingOrderRemarks").html();
                if (page_order_remarks) {
                    $("#singleOrderRemark").text($("#cashierOrderListHtml li.active .cateringPendingOrderRemarks")
                        .html());
                    $("#singleOrderRemark_div").show();
                } else
                {
                    $("#singleOrderRemark_div").hide();
                }
                $('#cashierOrderProductHtml').html(orderProductHtml);
            }
        }
    });
}

// 整单退货
$(document).unbind("click", "#btnOrderAllReturnGoods").on("click", "#btnOrderAllReturnGoods", function () {
    var orderId = $("#cashierOrderListHtml>li.active").attr('data-id');
    var order_state = $("#cashierOrderListHtml>li").attr('data-state');
    index = Deke.DeKe_dialog.show_Url2("整单退货", "/html/tuhuo/tuhuo.html?v=" + clearCache + 100, orderAllReturnGoods(orderId), ["440px", "270px"]);
});

// 整单退货
function orderAllReturnGoods(orderId) {
    setTimeout(function () {
        // 关闭窗口
        $('#btnwindowsClose').click(function () {
            layer.closeAll();
        });

        $("#dantuhuo1").click(function () {
            if ($("#return_num") == "") {
                layer.msg("单品退货必须输入数量");
            }
            else {
                disableButton("dantuhuo1");
                $.post("/intelligent/returensales", {
                    "order_id": orderId,
                    "return_cause": $("#return_cause").val(),
                    "return_remark": $("#return_remark").val(),
                    "return_num": 0,
                    "return_pordcot": 0,
                    "return_type": 0
                }, function (data) {
                    if (data == -2) {
                        enabledButton("dantuhuo1");
                        layer.msg("对不起，您退货的数量超过购买的数量，请核对！");
                        layer.close(index);
                    } else if (data == 0) {
                        enabledButton("dantuhuo1");
                        layer.msg("对不起，操作退货失败，请刷新重试");
                        layer.close(index);
                    }
                    else if (data == -3) {
                        enabledButton("dantuhuo1");
                        layer.msg("你没有该操作权限");
                        layer.close(index);
                    }
                    else {
                        enabledButton("dantuhuo1");
                        layer.msg("操作成功");
                        product_id = 0;
                        order_id = "0";
                        layer.close(index);
                        getCashierOrderListPagelist(0, 1, 500, null);
                    }
                });
            }
        });
    }, 100);

}

//单个商品退货
$(document).unbind("click", "#cashierOrderProductHtml .remarksDetails").on("click", "#cashierOrderProductHtml .remarksDetails", function () {
    var pricingmethod = $(this).attr('data-pricingmethod');
    var productnum = $(this).attr('data-num');
    var order_product_id = $(this).attr('data-id');
    var productId = $(this).attr('data-prid');
    index = Deke.DeKe_dialog.show_Url2("退货处理", "/html/tuhuo/tuhuo2.html?v=" + clearCache + 200, returnProduct(pricingmethod, productnum, order_product_id, productId), ["440px", "310px"]);
});

// 单个商品退货回调
function returnProduct(pricingmethod, productnum, order_product_id, productId) {
    setTimeout(function () {
        $("#return_num").attr('data-sv_pricing_method', pricingmethod);
        // 关闭窗口
        $('#btnwindowsClose').click(function () {
            layer.closeAll();
        });

        $("#dantuhuo").click(function () {
            var return_num = $("#return_num").val().trim();
            if (return_num == null || return_num == '' || return_num == undefined) {
                layer.msg("单品退货必须输入数量");
            }
            else if (parseFloat(return_num) > productnum) {
                layer.msg("对不起，您退货的数量超过购买的数量，请核对！");
            }
            else {
                var order_id = $('#cashierOrderListHtml>li.active').attr('data-id');
                disableButton("dantuhuo");
                $.post("/intelligent/returensales", {
                    "order_id": order_id,
                    "return_cause": $("#return_cause").val(),
                    "return_remark": $("#return_remark").val(),
                    "return_num": $("#return_num").val(),
                    "return_pordcot": productId,
                    "return_type": 1,
                    "order_product_id": parseInt(order_product_id)
                }, function (data) {
                    if (data == -2) {
                        enabledButton("dantuhuo");
                        layer.msg("对不起，您退货的数量超过购买的数量，请核对！");
                        layer.close(index);
                    } else if (data == 0) {
                        enabledButton("dantuhuo");
                        layer.msg("对不起，操作退货失败，请刷新重试");
                        layer.close(index);
                    }
                    else if (data == 1) {
                        enabledButton("dantuhuo");
                        layer.msg("操作成功");
                        product_id = 0;
                        layer.close(index);
                        getCashierOrderListPagelist(2, 1, 500, null, order_id);
                    }
                    else if (data == -3) {
                        enabledButton("dantuhuo");
                        layer.msg("对不起，您没有该功能操作权限，找您的老板开通吧！");
                        layer.close(index);
                    }
                    else {
                        enabledButton("dantuhuo");
                        layer.msg("操作失败请稍后重试！");
                        layer.close(index);
                    }
                });
            }
        });
    }, 100);
}

// 根据交易单号查询
$(document).unbind("click", "#btnQueryOderNumber").on("click", "#btnQueryOderNumber", function () {
    var txtQueryOderNumber = $('#txtQueryOderNumber').val().replace(/\ +/g, "");
    if (isNullOrWhiteSpace(txtQueryOderNumber)) {
        getCashierOrderListPagelist(0, 1, 500, txtQueryOderNumber, null);
    }
    else {
        layer.msg('请输入交易单号');
    }
});

// 交易单号文本框回车查询
$(document).unbind("keypress", "#txtQueryOderNumber").on("keypress", "#txtQueryOderNumber", function (event) {
    if (event.keyCode == 13) {
        $("#btnQueryOderNumber").click();
    }
});

// 处理订单打印
$(document).unbind("click", "#btnOrderListPrint").on("click", "#btnOrderListPrint", function () {
    var oderId = ($('#cashierOrderListHtml li.active').attr('data-id') || 0);
    if (oderId > 0) {
        $.getJSON("/intelligent/SalesLogPrint?order_id=" + oderId, function(data) {
            data.prdata["user"] = data.myuser;
            //处理称重商品的数量
            var pddata_temp = data.prdata;
            if (pddata_temp && pddata_temp.prlist && pddata_temp.prlist.length > 0) {
                for (var i = 0; i < pddata_temp.prlist.length; i++) {
                    if (pddata_temp.prlist[i].cateringChargingJson) {
                        //填充加料数据
                        var taste_string = "";
                        try
                        {
                            if (pddata_temp.prlist[i].cateringChargingJson) {
                                var tates = JSON.parse(pddata_temp.prlist[i].cateringChargingJson);
                                for (var j = 0; j < tates.length; j++) {
                                    taste_string += tates[j].sv_taste_name + "(" + tates[j].sv_taste_price + ")";
                                }
                            }
                        } catch (e)
                        {

                        }
                        if (taste_string && taste_string.length > 1)
                        {
                            pddata_temp.prlist[i].product_name +=  taste_string;
                        }
                    }
                    var product_num = pddata_temp.prlist[i].sv_pricing_method == 1 ? pddata_temp.prlist[i].sv_p_weight : pddata_temp.prlist[i].product_num;
                    pddata_temp.prlist[i].product_num = product_num;
                }
            }
            //Cef.openMyPc(JSON.stringify(data.prdata), JSON.stringify(data.peizhi), 0, 1, '' + receptionPtNum + '', receptionPtName);  //替换为自定义打印
            pushprintData(JSON.stringify(data.prdata), JSON.stringify(data.peizhi), 0, null, null, null, true);
        });
    }
    else {
        layer.msg('请选择需要打印的单据！');
    }
});

//-------------------交易查询，及处理订单退货-------------//

// -------------结算后清除相关信息-------------//

function resetSettlementInformation() {
    $("#Cashlefsit").html(""); // 清除商品信息
    $("#huiyuan_id").text("").data("id", "0").data("jiekou", "100"); // 清除会员信息
    $("#huiyuan_id").text("").attr("data-id", "0").attr("data-jiekou", "100");
    $("#yuecount").text(returnFloat(0)).attr('data-money', 0); // 清除订单折扣信息
    $("#user_descount").text("100"); // 清除会员折扣信息
    _member_discount = 100; // 清除会员折扣信息
    queryProductFocus();
    _cache_memberinfo_json = null;
    commondCleanCateringGrade(); // 清除信息
    shuxin_add($("#danhao").text());//shuxin(); // 重新获取流水号
    zhonger();// 重新计算结算金额
    if (_g_sv_uit_cache_name == 'cache_name_catering') {
        // 恢复餐饮相关按钮位置
        $("input[name='cateringSettlementType']:eq(0)").click();
        var openCateringTableContent = $('#openCateringTableContent').is(':hidden');
        if (_g_Catering_Is_Ceremonial_Eat == 0 && openCateringTableContent) {    // 正餐
            $('#openCateringTable').click();
            //刷新房台操作
            socket.emit('common_by_shop_refresh_desk_server', { user_id: user_id });//刷新房台的socket.io
        }
    }

    //--商米T1客显清屏
    push_sunmiT1_second_clear();
}

// -------------结算后清除相关信息-------------//

// -------------线上餐饮接单处理-------------//

// 手机接单操作
$(document).unbind("click", "#btnAcceptMobileOrder").on("click", "#btnAcceptMobileOrder", function () {
    var withlistid = $("#guandanlist li.joove, #catering_order_list li.active").attr('data-withlistid');
    if (withlistid && withlistid > 0) {
        $.post('/Catering/OperateCateringMobileOrder', { withOutOrderId: withlistid, operateType: 0 }, function (result) {
            if (result.succeed) {
                layer.msg('手机接单成功！');
                //手机接单成功后，将订单标识为已打印
                signOrderListPrintStateById(withlistid,0,0);
                orderSharedFn(withlistid);
                socket.emit('common_by_shop_refresh_desk_server', { user_id: user_id });//刷新房台的socket.io
            }
            else {
                if (result.errmsg) {
                    layer.msg(result.errmsg);
                }
                else {
                    layer.msg('操作失败，请稍后再试！');
                }
            }
        });
    }
    else {
        layer.msg('请选择需要接单的数据！');
    }
});

// 手机拒绝接单操作
$(document).unbind("click", "#btnCancelMobileOrder").on("click", "#btnCancelMobileOrder", function () {
    var withlistid = $("#guandanlist li.joove, #catering_order_list li.active").attr('data-withlistid');
    if (withlistid && withlistid > 0) {
        $.post('/Catering/OperateCateringMobileOrder', { withOutOrderId: withlistid, operateType: 1 }, function (result) {
            if (result.succeed) {
                layer.msg('手机拒单成功！');
                orderSharedFn();
            }
            else {
                if (result.errmsg) {
                    layer.msg(result.errmsg);
                }
                else {
                    layer.msg('操作失败，请稍后再试！');
                }
            }
        });
    }
    else {
        layer.msg('请选择需要拒单的数据！');
    }
});

// 标记挂单数据已打印
function signOrderListPrintStateById(orderId, orderProductId, type) {
    $.post('/Catering/SignOrderListPrintStateById', { orderId: orderId, orderProductId: orderProductId, type: type }, function (result) {
        if (result) {
            if (type == 0) {
                var html = '<span class="sharestyle hasbeenprinted">已打印</span>';
                if ($('#catering_order_list>li.active .cateringPendingOrderNumber .hasbeenprinted').length == 0) {
                    $('#catering_order_list>li.active .cateringPendingOrderNumber').append(html);
                }
            }
        }
        else {
            layer.msg('操作失败，请刷新页面后再试！');
        }
    });
}

$(function () {
    var printCogig;
    // 读取线上餐饮订单厨房打印

    if (_g_sv_uit_cache_name == 'cache_name_catering') {
        getMobileOrderToPayCountByUserId(); // 读取线上订单统计
        if (!_g_catering_print_success && (((typeof Cef) !== 'undefined') || (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)) && _g_CateringOnlineIsAutoOrderAndPrint == 0) {
            $.getJSON("/system/Getprint", function (printdata) {
                if (printdata) {
                    var interval = setInterval(function () {
                        if (!_g_catering_print_success) {
                            getMobileOrderListPrintByUserId(printdata);
                            getMobileOrderToPayCountByUserId(); // 读取线上订单统计
                        }
                    }, 1000 * 5 * 1.5);
                }
            });
        }

        if (_g_Catering_Is_Ceremonial_Eat == 0) {    // 正餐
            $('#openCateringTable').click();
            $('#btnAddCateringGradeNmae').hide();
        }
        else if (_g_Catering_Is_Ceremonial_Eat == 1) {  // 快餐
            $('#btnAddCateringGradeNmae').show();
            $('#openCateringTable').hide();
        }
    }

    try {
        socket.on('common_by_android_refresh_Switch', function (data) {
            if (_g_sv_uit_cache_name == 'cache_name_catering') {
                if (!_g_catering_print_success && (((typeof Cef) !== 'undefined') || (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)) && _g_CateringOnlineIsAutoOrderAndPrint == 0) {
                    $.getJSON("/system/Getprint", function (printdata) {
                        if (printdata) {
                            if (!_g_catering_print_success) {
                                getMobileOrderListPrintByUserId(printdata);
                                getMobileOrderToPayCountByUserId(); // 读取线上订单统计
                            }
                        }
                    });
                }
            }
        });
    } catch (e) {
        console.log(e.messsage);
    }
});
// 读取线上餐饮已付款的订单
function getMobileOrderListPrintByUserId(printdata) {
    const sLEEP_MILLISECONDS = 200;
    _g_catering_print_success = true;
    $.get('/Catering/GetMobileOrderListPrintByUserId', function (data) {
        if (data && data.length > 0) {
            layer.msg('您有一笔线上订单，已向厨房发送菜品打印', { time: 1500 });
            //layer.msg("打印");
            var printSuccess = false;
            for (var i = 0; i < data.length; i++) {
                _g_catering_print_data_total = data.length;
                var record = data[i];
                (function (record) {
                    setTimeout(function () {
                        var hasNullIp = false;//是否有未配置ip的菜品

                        for (var i = 0; i < record.prlist.length; i++)
                        {
                            if (record.prlist[i].product_name)
                            {
                                record.prlist[i].product_name = record.prlist[i].product_name.replace(',', '.');
                            }

                             if (!(record.prlist[i].sv_printer_ip && record.prlist[i].sv_printer_port)) {
                                 hasNullIp = true;
                                record.prlist[i].sv_printer_ip = _g_TakeOutFoodPrintIP;
                                record.prlist[i].sv_printer_port = _g_TakeOutFoodPrintPort;
                             }
                            ////填充加料数据
                            var taste_string = "";
                            try
                            {
                                if (record.prlist[i].cateringChargingJson) {
                                    var tates = JSON.parse(record.prlist[i].cateringChargingJson);
                                    for (var j = 0; j < tates.length; j++)
                                    {
                                        taste_string += tates[j].sv_taste_name + "(" + tates[j].sv_taste_price + ")";
                                    }
                                    var sv_p_name = (record.prlist[i].product_name || "无码收银");
                                    if (taste_string && taste_string.length > 1)
                                    {
                                        record.prlist[i].product_name = sv_p_name + taste_string;    
                                    }
                                }
                                
                            } catch (e)
                            {
                                
                            }
                        }
                        //前台打印机
                        if (record.sv_order_type == 0 || record.sv_order_type == 1) {  // 0 -- 前台挂单数据，1--线上付款
                            pushprintData(JSON.stringify(record), JSON.stringify(printdata), 0, 0, 0, 0);
                        }
                        //后台打印机

                        if (!hasNullIp || (isNullOrWhiteSpace(_g_TakeOutFoodPrintIP) && isNullOrWhiteSpace(_g_TakeOutFoodPrintPort))) {
                            pushcateringprintData(JSON.stringify(record), JSON.stringify(printdata), 2);
                        }
                        else {
                            layer.msg('请配置好外卖打印机信息后才能进行后厨打印！');
                        }
                        
                        //signOrderListPrintStateById(record.sv_without_list_id, 0, 2);
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

// 统计线上订单待确认订单数量
function getMobileOrderToPayCountByUserId() {
    $.get('/Catering/GetMobileOrderToPayCountByUserId', {}, function (data) {
        if (data != null && data != undefined && typeof (data) == "number") {
            $('#cateringOnlineTotal').text(data);
        }
    });
}
// -------------结算后清除相关信息-------------//

// -------======商米T1显示二维码+金额信息=====-------//
function show_Android_Pos_T1_SecondScreen(ymoney, qrstr) {

    //是否Android客户端运行环境
    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
        try {
            //处理商米分屏显示
            if (g_set_pos_t1_secondscreen_enable) {
                var givingtype = $("#sv_user_givingtype").val();
                var deserved = $("#sv_sumobtain_value").val();
                var user_cardno = "0";
                if ($('#huiyuan_id').attr('data-id') != null &&
                    $('#huiyuan_id').attr('data-id') != '' &&
                    !$('#huiyuan_id').attr('data-id') != undefined) {
                    user_cardno = $('#huiyuan_id').attr('data-id');
                }

                var _order_remark = $('#order_remark').val().trim();

                if (_order_remark.indexOf("'") > 0) {
                    //特殊字符串过滤：'
                    _order_remark = _order_remark.replace("'", "''");
                }

                var data2 = {
                    "everyday_serialnumber": GetDailySerialNumber(true),
                    "availableIntegralSwitch": availableIntegralSwitch,
                    "rankDemotion": rankDemotion,
                    "MembershipGradeGroupingIsON": MembershipGradeGroupingIsON,
                    "rankPromotionIsON": rankPromotionIsON,
                    "prlist": productlistJsonList,
                    "order_running_id": $("#danhao").text(),
                    "order_receivable": $("#yinshou").val(),
                    "order_payment": $("#xianjinname").text(),
                    "order_money": $("#xianjin").val(),
                    "order_payment2": $("#daoshouname").text(),
                    "order_money2": $("#daishou").val(),
                    "order_change": $("#yinshou").val(),
                    "user_cardno": user_cardno,
                    "order_discount": (parseFloat($("#ttuser_descount").val()) / 100).toFixed(5),
                    "order_receivabley": $("#yinshou").data("val"),
                    "sv_remarks": _order_remark,
                    "givingtype": givingtype,
                    "deserved": deserved,
                    sv_recommended_peopleid: $("#sv_recommended_peopleid").val(),
                    free_change: $('#jieshuaanniu').attr("freechange"),
                    sv_member_discount: (parseFloat($("#user_descount").text()) / 100).toFixed(2),
                    sv_member_total_money: parseFloat($('#jieshuajie2').text()),
                    sv_order_total_money: parseFloat($('#jieshuajie').text()),
                    sv_give_change: parseFloat($('#zhaoling').val()),
                    authcode: "",
                    type: "", // 微信或支付宝支付类型（扫条码，扫二维码）
                    WhetherAsCatering: true, // 临时标记为餐饮
                    sv_table_id: ($('#catering_CateringGrade').attr('data-tableid') || 0), // 房台id 
                    sv_catering_grade: ($('#catering_CateringGrade').text() || ''),
                    sv_coupon_amount: ($('#hidden_coupon_amount').val() || 0), // 优惠券金额
                    sv_coupon_discount: ($('#hidden_coupon_discount').val() || 0), // 优惠券折扣 ，
                    sv_without_list_id: ($('#catering_CateringGrade').attr('data-withListId') || 0),
                    sv_person_num: ($('#catering_CateringGrade').attr('data-personNum') || 0), // 就餐人数
                    sv_order_source: 0, // 订单来源
                    sv_record_id: ($('#hidden_coupon_record_id').val() || 0)
                };

                try {
                    $.getJSON("/system/Getprint",
                        function (data) {
                            var smsg =
                                getsunmipushprintData(JSON.stringify(data2),
                                    JSON.stringify(data),
                                    0,
                                    0,
                                    deserved,
                                    givingtype);
                            var postData = {
                                "FooterList": [
                                ]
                            };
                            postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            postData.FooterList.push({ "Content": ".", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            postData.FooterList.push({ "Content": "应收金额：¥" + (ymoney || "0.00"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                            try {
                                //Android客户端打印
                                cordova.plugins.barcodeScanner.showsecond(
                                    function (result) {
                                    },
                                    function (error) {
                                    },
                                    {
                                        myPrintData: JSON.stringify(postData),
                                        myPrintImg: qrstr
                                    }
                                );
                            } catch (e) {
                            }

                        });


                } catch (e) {
                    layer.msg(e.message);
                }
            }
        } catch (e) {
            layer.msg(e.message);
        }
    }
}

// 快餐收银厨房打印小票
function cateringPrint(orderList, printConfig) {
    if (_g_sv_uit_cache_name == 'cache_name_catering') {
        if (orderList) {
            if (orderList.sv_without_list_id == 0 || !orderList.sv_without_list_id || orderList.sv_without_list_id == "0") {
                pushcateringprintData(JSON.stringify(orderList), JSON.stringify(printConfig), 2);
            }
        }
    }
}

// 读取餐饮挂单打印数据（一菜多打）
function getCateringProductsPrintListByUserId() {
    if (_g_sv_uit_cache_name == 'cache_name_catering') {
        $.get('/Catering/GetCateringProductsPrintListByUserId', { pageIndex: 1, pageSize: 50, queryType: -1 }, function (data) {
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].order_product_list_json) {
                        var order_product_list_json = JSON.parse(data[i].order_product_list_json);
                        if (order_product_list_json && order_product_list_json.length > 0) {
                            for (var j = 0; j < order_product_list_json.length; j++) {
                                if (order_product_list_json[j].producttastejson) {

                                }
                                if (order_product_list_json[j].cateringchargingjson) {

                                }
                            }
                        }
                    }
                }
            }
        });
    }
}

// 根据餐饮线上用户ID和流水号读取线上下单信息（收货地址信息）
function getCateringOnlineWithOutListInfo(orderNober, shopUserId) {
    $.get('/Catering/GetCateringOnlineWithOutListInfo', { orderNober: orderNober, shopUserId: shopUserId }, function (data) {
        if (data) {

        }
    });
}

$(document).unbind("click", "#btnAddCateringGradeNmae").on("click", "#btnAddCateringGradeNmae", function () {
    Deke.DeKe_dialog.show_Url2("请输入牌号", "/html/cash/jishu.html?v=25", funcSetCateringGrade, ['310px', '']);
});

function funcSetCateringGrades() {

}

//var g_ZeroInventorySalesQ = true;
//零库存销售
//商品列表有变动就要调用该方法
function inspectCommodityWhetherZeroStock() {
    if (!g_ZeroInventorySalesQ) {
        //循环商品列表
        var lis = $("#Cashlefsit").children("li");
        if (_g_sv_uit_cache_name != 'cache_name_catering') {
            for (var i = 0; i < lis.length; i++) {
                var prnumber = parseFloat($(lis[i]).attr("data-prnumber") || 0);
                var ordernumber = parseFloat($(lis[i]).find(".nump").text() || 0);
                if ($(lis[0]).data("salesmode") != "0") { //排除计次商品
                    if (ordernumber > prnumber) {
                        //拆箱
                        if ($(lis[i]).attr("data-prcombinationid") != null &&
                            $(lis[i]).attr("data-prcombinationid").trim() != '0') {
                            ProductDevanning_temp($(lis[i]).attr("id"),
                                $(lis[i]).attr("data-pricingmethod"),
                                $(lis[i]).attr("data-prcombinationid"),
                                ordernumber - prnumber,
                                ProductDevanning_tem_onsuccess,
                                $(lis[i]),
                                prnumber);
                            for (var k = 0; k < splitOpenCaseList.length; k++) {
                                if ($(lis[i])
                                    .attr("id") !=
                                    null &&
                                    splitOpenCaseList[k] == $(lis[i]).attr("id").trim()) {
                                    $(lis[i]).find(".nump").text(parseFloat(prnumber).toFixed(2));
                                    if (prnumber <= 0) {
                                        $(lis[i]).remove();
                                    }
                                    layer.msg("该商品没有库存了");
                                }
                            }
                        } else {
                            $(lis[i]).find(".nump").text(parseFloat(prnumber).toFixed(2))
                            if (prnumber <= 0) {
                                $(lis[i]).remove();
                            }
                            layer.msg("该商品没有库存了");
                        }
                    }
                }
            }
        }
        zhonger();
    }
}

function ProductDevanning_tem_onsuccess(li, prnumber) {

    var ordernumber = 0;
    if ($(li) != null && $(li).find(".nump") != null && $(li).find(".nump").text() != null) {
        ordernumber = parseFloat($(li).find(".nump").text().trim() || 0);
    }
    $(li).attr("data-prnumber", parseFloat(prnumber));
    if (ordernumber > prnumber) {
        $(li).find(".nump").text(parseFloat(prnumber).toFixed(2))
        if (prnumber <= 0) {
            $(li).remove();
        }
        layer.msg("该商品没有库存了");
    }
}

var splitOpenCaseList = [];
//库存不够时拆箱
function ProductDevanning_temp(id, ountway, parentid, ordernumber, onsuccess, obj, prnumber) {
    if (automaticDevanning) {
        for (var i = 0; i < splitOpenCaseList.length; i++) {
            if (splitOpenCaseList[i] == id) {
                return 0;
            }
        }
        var number = -1;
        var yanshi = 0;
        $.ajax({
            type: "POST",
            url: "/AjaxProduct/ProductDevanning?product=" + id + "&userid=" + user_id + "&addpeople=" + _g_user_config.order_operator + "&ountway=" + ountway + "&parentid=" + parentid + "&ordernumber=" + ordernumber,
            dataType: "json",
            async: false,
            success: function (result) {
                number = result;
                if (number <= 0) {
                    var flag = true;
                    for (var i = 0; i < splitOpenCaseList.length; i++) {
                        if (splitOpenCaseList[i] == id) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        splitOpenCaseList[splitOpenCaseList.length] = id;
                    }
                } else {
                    var chaixiangdivs = $(".productlistboxaaa").children("div");
                    if (chaixiangdivs != null && chaixiangdivs.length > 0) {
                        for (var i = 0; i < chaixiangdivs.length; i++) {
                            var chaixiangitemid = $(chaixiangdivs[i]).attr("data-prid");

                            if (chaixiangitemid == id) {
                                var chaixiangnumber = parseFloat($(chaixiangdivs[i]).find(".sv_p_storage").text());
                                if (chaixiangnumber + parseFloat(number) > 99) {
                                    $(chaixiangdivs[i]).find(".sv_p_storage").text("99+");
                                } else {
                                    $(chaixiangdivs[i]).find(".sv_p_storage").text(chaixiangnumber + parseFloat(number));
                                }

                                $(chaixiangdivs[i]).find(".goodsNumber").val(chaixiangnumber + parseFloat(number));
                            }
                            if (chaixiangitemid == parentid) {
                                var chaixiangnumber = parseFloat($(chaixiangdivs[i]).find(".sv_p_storage").text());
                                $(chaixiangdivs[i]).find(".sv_p_storage").text(chaixiangnumber - parseFloat(1));
                                $(chaixiangdivs[i]).find(".goodsNumber").val(chaixiangnumber - parseFloat(1));
                            }
                        }
                    }
                }

                onsuccess(obj, prnumber + number);
            }
        });
    }
}

