var memberlist = "";
var StrEmployeelId = "";//员工信息
var Preferential_TopUpGiving_ConfigList = "";//充值赠送信息
var configleveldata = [];//等级配置信息
var wxauthcode_waitfor = false; // 微信或支付宝，扫条码是否需要等待，密码支付
var _g_memberWechatPayCallback = false; // 微信充值循环查询是否正在进行中




$(document).ready(function() {
    if ((typeof decerpbrowser) == "undefined")
    {
        decerpbrowser = {
            versions: function() {
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
        };
    }
    if ((typeof moduleConfigList) == "undefined") {
        moduleConfigList = parent.moduleConfigList;
    }
    if ((typeof g_set_pos_t1_secondscreen_enable) == "undefined")
    {
        g_set_pos_t1_secondscreen_enable = parent.g_set_pos_t1_secondscreen_enable;
    }
    if ((typeof pushSavingData) == "undefined")
    {
        pushSavingData = parent.pushSavingData;
    }
    if ((decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) && (typeof cordova) == "undefined")
    {
        cordova = parent.cordova;
    }
    //





    if (moduleConfigList) {
        PreferentialTopUpGivingConfigList("Preferential", "TopUpGiving");
    }
    if (location.hash != "") {
        var saa = location.hash.substring(1, location.hash.length);
        var sa = saa.split('@')
        $("#query_user").val(sa[0]);
        if (sa.length >= 2) {
            $("#userid").val(sa[1]);
        }
        if (sa.length >= 3 && (typeof Is_open_commission) == "undefined") {
            Is_open_commission = Boolean(parseInt(sa[2]));;
            $("#Is_open_commission_s").val(Is_open_commission);
        }
        cliskgetuser();

    }
    if ((typeof Is_open_commission) == "undefined") {
        Is_open_commission = $("#Is_open_commission_s").val();
    }
    if (Is_open_commission) {
        $(".CommissionOperator").show();
        $("#sv_mrr_operator").click(function () {
            getEmployessinfohtml();
        });
    } else {
        $(".CommissionOperator").hide();
    }
    $("#Cashxzhy").click(function () {
        Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=" + clearCache, f3, ['730px', ''], "shoyin2");
        $("#userid").val("");
    });

    $("#query_user").keydown(function (e) {

        if (e.keyCode == 13) {
            $("#userid").val("");
            cliskgetuser();
        }
    });

    //$("#chongzhi").click(function () {
    $(document).unbind("click", "#chongzhi").on("click", "#chongzhi", function () {
        $("#chongzhi").attr("disabled", "true");
        setTimeout(function () {
            $("#chongzhi").removeAttr("disabled");
        }, 1000);
        if ($("#member_id").val() != "") {
            var sv_mrr_present = $("#sv_mrr_present");
            var sv_mrr_amountbefore = $("#sv_mrr_amountbefore");
            var sv_mrr_desc = $("#sv_mrr_desc");
            if (sv_mrr_amountbefore.val() == "") {
                layer.msg("请输入，充值金额！");
                sv_mrr_amountbefore.focus();
                return;
            }
            var val = sv_mrr_present.val() || 0;
            var cname = $(".on[data-name='type']").data("id") == 1 ? "扣费" : "充值";
            if (cname == "充值") {
                UserSiblings(cname);
            } else {
                verifyenable()
            }

        } else {


            layer.msg("请先查找会员或识别会员卡");

            $("#query_user").focus();
        }



    });



    $('.lisbk a').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //会员选择
    $('.stecs i').click(function () {
        //toggleClass
        if ($(this).data("name") == "type") {
            $(this).parent().addClass('on').siblings().removeClass('on');
        }
        else
            $(this).parent().toggleClass('on').siblings().removeClass('on');

        if ($(this).data("name") != "dayin") {
            if ($(this).siblings().text() == "扣费" && $(this).parent().is(".on")) {
                //扣费
                $(".amountbefore").text($(this).siblings().text() + "金额：");
                $(".present").hide();
            } else if ($(this).parent().data("id") == "0" && $(this).parent().is(".on")) {
                //充值
                $(".amountbefore").text($(this).siblings().text() + "金额：");
                $(".present").show();
            } else if ($(this).parent().data("id") == "5" && $(this).parent().is(".on")) {
                //退还费用
                $(".amountbefore").text($(this).siblings().text() + "金额：");

                $(".present").hide();
            } else if ($(this).data("name") != "tjian") {
                $(".amountbefore").text("充值金额：");
                $(".present").show();
            }
            if ($(this).data("name") != "tjian") {
                CalculateGiving();
            } else if ($(this).data("name") == "tjian") {

                if ($(this).parent().is(".on")) {
                    page($(this).data("id"));
                } else {
                    page(0);

                }

            }
        }

    });

});

function clearNoNum(obj, strobj) {

    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    CalculateGiving(strobj);
}


function GetList(type, page) {
    var html = "";

    $.getJSON("/Ajaxdata/GetSavingsList/" + $("#member_id").val(), { "clas": type, "page": page }, function (data) {

        for (var i = 0; i < data.length; i++) {

            var str = "";
            if (data[i].sv_mrr_type == 1 || data[i].sv_mrr_type == 2 || data[i].sv_mrr_type == 5 || data[i].sv_mrr_type == -2)
                str = "-";
            else
                str = "+";
            html += ' <tr><td><div class="check-box "><i><input type="checkbox" name="subbox"></i></div></td><td>' + $(".sv_mr_cardno").text() + '</td><td>' + cleixin(data[i].sv_mrr_type) + '</td> <td>' + data[i].sv_mrr_payment + '</td>';
            html += ' <td><i>¥' + data[i].sv_mrr_amountbefore + '</i></td><td><i>¥' + str + data[i].sv_mrr_money + '</i></td>   <td><i>¥' + str + data[i].sv_mrr_present + '</i></td>  <td><i>¥' + data[i].sv_mrr_amountafter + '</i></td> <td>' + new Date(data[i].sv_mrr_date).Format("yyyy-MM-dd hh:mm:ss") + '</td>';
            html += ' <td><span title="' + data[i].sv_mrr_desc + '" style="width:80%;overflow:hidden;">' + data[i].sv_mrr_desc + '</span> </td> </tr>';
        }

        $("#Listapp").html(html);
    });


}

function cleixin(type) {
    switch (type) {
        case -1:
            return "扣费退款";
        case -2:
            return "储值退款";
        case 0:
            return "充值";
        case 1:
            return "扣费";
        case 2:
            return "订单消费";
        case 3:
            return "订单退款";
        case 4:
            return "开卡充值";
        case 5:
            return "退还";

    }

}

///分页配置
function page(type) {

    //初始化分页内容
    $.get("/ajaxdata/GetSavingsCount/", { "id": $("#member_id").val(), "clas": type }, function (data) {
        // $("#User_cout").text(data);
        var i = Math.ceil(data / 5);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {

                GetList(type, e.curr);

            }
        });
    });

}


function f3() {

    GetList2("");

    $("#query_like").keyup(function () {
        GetList2($("#query_like").val());

    });

}

// 读取会员列表
function GetList2(key) {
    $.get("/ajaxdata/GetMemberList/1", { "key": key, "pageSize": 30 }, function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {

            html += ' <tr  data-user_id="' + data[i].user_id + '" data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '">';
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


        $("#userlist").on("click", ".xianzhehuiyan", function () {
            if ($(this).data("isoverdue")) {
                layer.msg("此卡已过期");
            } else {
                if (this.id == 1) {
                    layer.msg("此卡已挂失");
                } else {
                    $("#userid").val($(this).parent().parent().data("user_id"));
                    //搜索会员
                    $("#query_user").val($(this).parent().parent().data("sv_mr_cardno")).data("id", $(this).parent().parent().data("id"));
                    //$("#Cashxzhy").find("input").val($(this).parent().parent().data("name"));
                    cliskgetuser();
                    layer.closeAll();
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
                    $("#userid").val($(this).data("user_id"));
                    //搜索会员
                    $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));
                    // $("#Cashxzhy").find("input").val($(this).data("name"));
                    cliskgetuser();
                    layer.closeAll();
                }
            }
        });

        //checkedBox
    });

    $("#guanbinimab").click(function () {

        layer.close(index);
    });

}
function cliskgetuser() {
    $.get("/Ajaxdata/QueryUserModel?id=" + $("#query_user").val() + "&userid=" + $("#userid").val(), function (data) {
        if (data != null) {
            if (data.type == 1) {
                Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=42", f4, ['730px', ''], "shoyin2");
                $("#userid").val("");
                memberlist = data.list;
            } else {
                if (data.isOverdue) {
                    layer.msg("此卡已过期");
                } else {
                    if (data.sv_mr_status == 1) {
                        layer.msg("此卡已挂失");
                        return false;
                    } else {
                        for (var key in data) {
                            if (key == "sv_mr_birthday") {

                                var t = new Date(data[key]).Format("yyyy-MM-dd");
                                if (t == "1-01-01") {
                                    t = "";
                                }
                                $("." + key).text(t);

                            } else if (key == "sv_mr_headimg") {

                                $("#sv_mr_headimg").attr("src", data[key]);
                            } else {

                                if (key == "member_id" || key == "memberlevel_id") {
                                    if (key == "memberlevel_id") { GetConfigdataBylevel(data["memberlevel_id"], data["sv_ml_name"]) }
                                    $("#" + key).val(data[key]);
                                } if (key == "sv_recommended_peopleid") {
                                    $("#" + key).val(data[key]);
                                }
                                else {
                                    if (key == "user_id") {
                                        $("#" + key).val(data[key]);
                                        $("#userid").val(data[key]);
                                    } else {
                                        $("." + key).text(data[key]);
                                    }

                                }
                            }
                        }
                        CalculateGiving();
                    }
                }

            }
            page(0);
        } else
            layer.msg("找不到该会员，请查证再查询");
    });
}
function f4() {
    Getmemberlist(memberlist);
    $("#query_like").keyup(function () {
        GetList2($("#query_like").val());
    });
}

//（连锁会员共享）刷卡出现多个同卡信息
function Getmemberlist(data) {
    var html = "";
    var html = "";
    for (var i = 0; i < data.length; i++) {

        html += ' <tr  data-user_id="' + data[i].user_id + '" data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '">';
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

    $("#userlist").on("click", ".xianzhehuiyan", function () {
        if ($(this).data("isoverdue")) {
            layer.msg("此卡已过期");
        } else {
            if (this.id == 1) {
                layer.msg("此卡已挂失");
            } else {
                $("#userid").val($(this).parent().parent().data("user_id"));
                //搜索会员
                $("#query_user").val($(this).parent().parent().data("sv_mr_cardno")).data("id", $(this).parent().parent().data("id"));
                cliskgetuser();
                layer.closeAll();
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
                $("#userid").val($(this).data("user_id"));
                //搜索会员
                $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));
                cliskgetuser();
                layer.closeAll();
            }
        }

    });
}

//获取员工信息页面
function getEmployessinfohtml() {

    Deke.DeKe_dialog.show_Url3("选择员工", "/html/system/EmployeesInfo.html?v=422", OpenEmployessinfo, ['230px', '300px'], "employeeshtml");
}

//打开员工信息
function OpenEmployessinfo() {

    $(".btnSalesclerk").show();
    $("#employeeshtml").height($("#employeeshtml").height() + 12);
    //获取员工信息
    var html = '';
    $.getJson("/Employee/GetEmployeePageList/", null, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                if (i % 2 == 0) {
                    if (StrEmployeelId.indexOf(data[i].sv_employee_id) >= 0 && $("#sv_mrr_operator").val().indexOf(data[i].sv_employee_name) >= 0) {
                        html += '<li style="float:left; width:50%;text-align:center; position relative" class="regbtn active" data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    } else {
                        html += '<li style="float:left; width:50%;text-align:center; position relative" class="regbtn " data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    }
                }
                else {

                    if (StrEmployeelId.indexOf(data[i].sv_employee_id) >= 0 && $("#sv_mrr_operator").val().indexOf(data[i].sv_employee_name) >= 0) {
                        html += '<li style="float:right;width:50%;text-align:center; position relative"  class="regbtn active" data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    } else {
                        html += '<li style="float:right;width:50%;text-align:center; position relative"  class="regbtn " data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    }
                }
                // html += '<a href="#" >';
                html += '<i><img  class="img-circle" style="width:49px;height:49px"  src="/images/001.png"  onerror="javascript:this.src ="/images/001.png";"/>';//后期替换头像

                html += '<h2  style="width:90%">' + data[i].sv_employee_name + '</h2></i>';
                // html += '</a>';
                html += '<i class="tick"><img  class="img-circle" style="width:20px;height:20px"  src="/images/tick.svg"  onerror="javascript:this.src ="/images/tick.svg";"/></i></li>';
            }
        }
        else {
            html = '';
        }
        $("#Employeelist").html(html);
    });
    $("#Employeelist li").click(function () {

        $(this).toggleClass('active');
    });
    $("#btnclose").click(function () {
        StrEmployeelId = "";
        $("#sv_mrr_operator").val("");
        layer.closeAll();
    });
    GetEmployessid();

}

//获取选中的员工id
function GetEmployessid() {
    $("#btnSalesclerk").click(function () {
        StrEmployeelId = "";
        var strEmployee_name = "";
        $("#Employeelist li").each(function () {
            if ($(this).hasClass("active")) {
                StrEmployeelId += $(this).data("employee_id") + ",";
                strEmployee_name += $(this).data("employee_name") + " ";
            }
        })
        if (StrEmployeelId != "") {
            StrEmployeelId = StrEmployeelId.replace(/,$/gi, "");
        }
        $("#sv_mrr_operator").val(strEmployee_name);
        layer.closeAll();
    });
}
function UserSiblings(cname) {
    $("#chongzhi").attr("disabled", "true");
    var sv_mrr_present = $("#sv_mrr_present");
    var sv_mrr_amountbefore = $("#sv_mrr_amountbefore").val() || 0;
    var sv_mrr_desc = $("#sv_mrr_desc");
    var _sv_mrr_desc = "";
    if (sv_mrr_desc.val().indexOf("活动充值") < 0) {
        _sv_mrr_desc = sv_mrr_desc.val() + " " + $("#StoredRemark").text();
    }
    var val = sv_mrr_present.val() || 0;
    if ($(".on[data-name='type']").data("id") == 1) {
        cname = "扣费";
    } else if ($(".on[data-name='type']").data("id") == 5) {
        cname = "退还";
    } else {
        cname = cname || "扣费";
    }
    var rechargetype = 0
    if (cname == "充值") rechargetype = 1;

    var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
    var model = {
        "member_id": $("#member_id").val(),
        "sv_mrr_type": $(".on[data-name='type']").data("id"),
        "sv_mrr_payment": $('.lisbk a.active').text(),
        "sv_mrr_amountbefore": sv_mrr_amountbefore,
        "sv_mrr_desc": _sv_mrr_desc,
        "sv_mrr_present": val,
        "user_id": $("#userid").val(),
        "sv_commissionemployes": StrEmployeelId,
        "sv_user_givingtype": $("#sv_user_givingtype").val(), //赠送类型*@
        "sv_detali_proportionalue": $("#sv_detali_proportionalue").val(),//配置比例值*@
        "sv_detail_value": $("#sv_detail_value").val(), //赠送*@    
        "sv_recommended_peopleid": $("#sv_recommended_peopleid").val(),//推荐人
        "rechargetype": rechargetype,//充值类型
    };

    // 微信 ，支付宝支付处理
    if (($('.lisbk a.active').text() == '微信' || $('.lisbk a.active').text() == '支付宝') && cname == '充值') {
        var orderTime = 0;
        var data = {
            member_id: $("#member_id").val(),
            sv_recharge_money: $("#sv_mrr_amountbefore").val(),
            sv_recharge_type: 0,
            sv_payment_method: $('.lisbk a.active').text() == '微信' ? 0 : 1,
            sv_give_money: $("#sv_mrr_present").val(),
            sv_remark: _sv_mrr_desc,
            user_id: $("#userid").val(),
            sv_commissionemployes: StrEmployeelId,
            sv_mrr_type: $(".on[data-name='type']").data("id"),
            sv_user_givingtype: $("#sv_user_givingtype").val(), //赠送类型*@
            sv_detali_proportionalue: $("#sv_detali_proportionalue").val(),//配置比例值*@
            sv_detail_value: $("#sv_detail_value").val() //赠送*@
        };
        $.postAsyncJson('/Ajaxdata/MemberRechargeQRCode', data, function (result) {
            if (result.succeed == true) {
                show_Android_Pos_T1_SecondScreen(($("#sv_mrr_amountbefore").val() || 0), result.values);
                var scanPay = "<div class=\"wxsaosao\"><br><i id=\"txtPayResultMsg\" style=\"margin-left: 100px;color: red;\"></i><br><img src=" + result.values + " width=\"200\" class=\"bbimg\">";
                scanPay += '<input type="text" id="authcode" name="sv_mr_cardno" class="form-control" placeholder="请用扫描枪扫码客户二维码" maxlength="30" autofocus="" /></div>';
                layer.open({
                    type: 1,
                    title: $('.lisbk a.active').text() + "支付",
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
                            async: false,
                            success: function (_data) {
                                if (_data.succeed == true) {
                                    layer.msg("支付成功！");
                                    wxauthcode_waitfor = false;
                                    $("#chongzhi").removeAttr("disabled");
                                    if ($("#dayin").hasClass("on")) {
                                        $.getJSON("/system/Getprint", function (data) {
                                            if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                                _data.values.sv_mrr_payment = _data.values.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                                            };
                                            //Cef.openMyPc(JSON.stringify({ "moedel": model, "data": _data.values, "user": { "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text() } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                                            pushSavingData(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text() } }), JSON.stringify(data));
                                        });
                                    }
                                    $("#sv_mrr_amountbefore,#sv_mrr_desc,#sv_mrr_present").val('');
                                    cliskgetuser();
                                    setTimeout(function () {
                                        layer.closeAll();
                                    }, 650);
                                }
                                else {
                                    if (_data.errmsg == "需要用户输入支付密码" || _data.errmsg == "待买家支付" || _data.errmsg == "等待支付" || _data.errmsg == "正在等待用户确认...")
                                    {
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
                            $.ajax({
                                url: "/Ajaxdata/QueryMemberRechargeOrder?orderNumber=" + result.errmsg + "&barCodePay=" + wxauthcode_waitfor,
                                            type: 'get',
                                            dataType: 'json',
                                            async: true,
                                            cache: false,
                                            success: function(_data) {
                                                if (_data.sate == true) {
                                                    clearInterval(iCount);
                                                    wxauthcode_waitfor = false;
                                                    _g_memberWechatPayCallback = false;
                                                    layer.open({
                                                        type: 1,
                                                        area: ['300px', '200px'],
                                                        shadeClose: false,
                                                        content: '\<\div class="box-center"><div class="success-bg"></div><p id="success-money">支付成功 </p>\<\/div>',
                                                        time: '1500',
                                                    });
                                                    $("#sv_mrr_amountbefore,#sv_mrr_desc,#sv_mrr_present").val('');
                                                    $("#chongzhi").removeAttr("disabled");
                                                    cliskgetuser();
                                                    if ($("#dayin").hasClass("on"))
                                                    {
                                                        $.getJSON("/system/Getprint", function(data) {
                                                            if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0)
                                                            {
                                                                _data.datames.sv_mrr_payment = _data.datames.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                                                            };
                                                            //Cef.openMyPc(JSON.stringify({ "moedel": model, "data": _data.datames, "user": { "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text() } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                                                            pushSavingData(JSON.stringify({
                                                                "moedel": model,
                                                                "data": _data.datames,
                                                                "user":
                                                                {
                                                                    "sv_mr_cardno": $(".sv_mr_cardno").text(),
                                                                    "sv_mr_name": $(".sv_mr_name").text()
                                                                }
                                                            }),
                                                                JSON.stringify(data));
                                                        });
                                                    }
                                                    $(".layui-layer").css({
                                                        borderRadius: 5
                                                    });
                                                    //$(".layui-layer-title, .layui-layer-setwin, .layui-layer-shade").css("display", "none");
                                                    setTimeout(function() {
                                                        layer.closeAll();
                                                        $("#chongzhi").removeAttr("disabled");
                                                    },
                                                        1000);
                                                } else
                                                {
                                                    _g_memberWechatPayCallback = false;
                                                }
                                            },
                                            error: function(e) {
                                                _g_memberWechatPayCallback = false;
                                            }
                                    });
                        }
                    }
                    else {
                        clearInterval(iCount);
                        alert("您的订单已过期失效！");
                        location.reload();
                        $("#chongzhi").removeAttr("disabled");
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
                        if (result.sate == true) {
                            $("#sv_mrr_amountbefore,#sv_mrr_desc,#sv_mrr_present").val('');
                            cliskgetuser();
                            layer.close(index);
                            layer.msg(cname + "成功！");
                            $("#chongzhi").removeAttr("disabled");
                            if ($("#dayin").hasClass("on")) {
                                $.getJSON("/system/Getprint", function (data) {
                                    if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                        result.datames.sv_mrr_payment = result.datames.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                                    };
                                    //Cef.openMyPc(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text() } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                                    pushSavingData(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text() } }), JSON.stringify(data));
                                });
                            }
                        } else if (result == -3) {
                            $("#userid").val("");
                            layer.msg("当前会员卡不支持跨店消费");
                            layer.close(index);
                            $("#chongzhi").removeAttr("disabled");
                        }
                        else if (result == -2) {
                            layer.msg("您没有该操作权限");
                            layer.close(index);
                            $("#chongzhi").removeAttr("disabled");
                        }
                        else if (result == -4) {
                            layer.msg("会员信息不存在");
                            $('#sv_mrr_amountbefore').val('');
                            layer.close(index);
                            $("#chongzhi").removeAttr("disabled");
                        }
                        else if (result == -5) {
                            layer.msg("充值金额错误");
                            $('#sv_mrr_amountbefore').val('');
                            layer.close(index);
                            $("#chongzhi").removeAttr("disabled");
                        }
                        else if (result == -6) {
                            layer.msg("当前扣款会员金额不足！");
                            $('#sv_mrr_amountbefore').val('');
                            layer.close(index);
                            $("#chongzhi").removeAttr("disabled");
                        }
                        else {
                            layer.msg("充值操作失败，请刷新重试");
                            $('#sv_mrr_amountbefore').val('');
                            layer.close(index);
                            $("#chongzhi").removeAttr("disabled");
                        }
                    }
                });
            }
        });
    }
    else {
        $.ajax({
            url: "/Ajaxdata/User_Siblings",
            data: JSON.stringify(model),
            type: "POST",
            contentType: "application/json",
            success: function (result) {
                if (result.sate == true) {
                    $("#sv_mrr_amountbefore,#sv_mrr_desc,#sv_mrr_present").val('');
                    cliskgetuser();
                    layer.close(index);
                    layer.msg(cname + "成功！");
                    $("#chongzhi").removeAttr("disabled");
                    if ($("#dayin").hasClass("on")) {
                        $.getJSON("/system/Getprint", function (data) {
                            if (model.sv_user_givingtype > 0 && model.sv_detail_value > 0) {
                                result.datames.sv_mrr_payment = result.datames.sv_mrr_payment + "(充" + model.sv_mrr_amountbefore + "元送" + model.sv_detail_value + (model.sv_user_givingtype == 1 ? "积分" : "元)") + ")";
                            };
                            //Cef.openMyPc(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text() } }), JSON.stringify(data), 4, 1, '' + receptionPtNum + '', receptionPtName);
                            pushSavingData(JSON.stringify({ "moedel": model, "data": result.datames, "user": { "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text() } }), JSON.stringify(data));

                        });
                    }
                } else if (result == -3) {
                    $("#userid").val("");
                    layer.msg("当前会员卡不支持跨店消费");
                    layer.close(index);
                    $("#chongzhi").removeAttr("disabled");
                }
                else if (result == -2) {
                    layer.msg("您没有该操作权限");
                    layer.close(index);
                    $("#chongzhi").removeAttr("disabled");
                }
                else if (result == -4) {
                    layer.msg("会员信息不存在");
                    $('#sv_mrr_amountbefore').val('');
                    layer.close(index);
                    $("#chongzhi").removeAttr("disabled");
                }
                else if (result == -5) {
                    layer.msg("充值金额错误");
                    $('#sv_mrr_amountbefore').val('');
                    layer.close(index);
                    $("#chongzhi").removeAttr("disabled");
                }
                else if (result == -6) {
                    layer.msg("当前扣款会员金额不足！");
                    $('#sv_mrr_amountbefore').val('');
                    layer.close(index);
                    $("#chongzhi").removeAttr("disabled");
                }
                else {
                    layer.msg("充值操作失败，请刷新重试");
                    $('#sv_mrr_amountbefore').val('');
                    layer.close(index);
                    $("#chongzhi").removeAttr("disabled");
                }
            }
        });
    }
}

function wechatOrAliPay(model) {

}
//密码验证
function verifyenable() {
    $.ajax({
        url: "/System/VerifyEnable?name=" + $("#member_id").val() + "&userid=" + $("#userid").val(),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data == 1) {
                UserSiblings();
                return false;
            }
            else if (data == 2) {
                layer.msg("会员信息错误！");
                return false;
            }
            else if (data == 3) {
                Deke.DeKe_dialog.show_Url2("请输入会员密码", "/html/cash/huiyuanpwd.html?v=215", baochuuserpwd, ['', '230px']);
            }
        }
    });
}

function baochuuserpwd() {
    $("#sv_mr_pwd").focus();
    $("#baochuuser").click(function () {
        $.post("/System/VerifyEnable", { name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val() }, function (data) {
            if (data == 1) {
                UserSiblings();
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
            $.post("/System/VerifyEnable", { name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val() }, function (data) {
                if (data == 1) {
                    UserSiblings();
                    layer.close(index);
                    return false;
                }
                else if (data == 4) {
                    layer.msg("会员密码输入有误");
                }
            });
        }
    });

}

//根据等级获取对应的配置值
function GetConfigdataBylevel(memberlevel,member_name) {
    if (Preferential_TopUpGiving_ConfigList != null) {
        var ConfigList = Preferential_TopUpGiving_ConfigList
        for (var i = 0; i < ConfigList.length; i++) {
            if (ConfigList[i].sv_user_leveltype_id == memberlevel || ConfigList[i].levelName == member_name)
            {
                configleveldata.push(ConfigList[i]);
            }
        }
    }
}
//计算赠送
function CalculateGiving(strobj) {
    var sv_mrr_amountbefore = parseFloat($("#sv_mrr_amountbefore").val() || 0);
    $("#StoredRemark").text("(没优惠)");
    var deserved = 0;
    var detail_value = 0;
    var givingtype = 0;
    if (configleveldata != "" && configleveldata.length > 0 && $(".on[data-name='type']").data("id") == 0) {
        for (var i = 0; i < configleveldata.length; i++) {
            if (configleveldata[i].sv_detail_is_enable) {
                var proportionalue = configleveldata[i].sv_detali_proportionalue;
                var commissiontype = configleveldata[i].sv_p_commissiontype

                if (proportionalue <= sv_mrr_amountbefore) {

                    if (commissiontype == 1)
                        detail_value = parseInt(configleveldata[i].sv_detail_value * sv_mrr_amountbefore / 100);
                    else
                        detail_value = parseInt(configleveldata[i].sv_detail_value);

                    
                    givingtype = configleveldata[i].sv_user_givingtype;
                    deserved = detail_value;
                    $("#sv_user_givingtype").val(givingtype);
                    $("#sv_detali_proportionalue").val(proportionalue);
                    $("#sv_detail_value").val(detail_value)
                    if (deserved > 0) {
                        $("#StoredRemark").text("(充值" + sv_mrr_amountbefore + "元,活动充值" + proportionalue + "元赠送" + deserved + (givingtype == 1 ? "积分)" : ( (commissiontype == 1 ? "(" + parseInt(configleveldata[i].sv_detail_value) + "%)" : "")+ "元储值现金)")));
                        //$("#StoredRemark").text("(充值" + sv_mrr_amountbefore + "元,活动充值" + proportionalue + "元赠送" + parseInt(configleveldata[i].sv_detail_value) + (givingtype == 1 ? (commissiontype == 1 ? "%积分)" : "积分)"): (commissiontype == 1 ? "%储值现金)" : "元储值现金)")));
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
            $("#sv_mrr_present").val(0);
        }
    }
    if (givingtype == 2 && !isNullOrWhiteSpace(strobj)) {
        $("#sv_mrr_present").val(deserved);
    }
    var sv_mrr_present = $("#sv_mrr_present").val() || 0;
    $("#huoji").text(parseFloat(sv_mrr_present) + parseFloat(sv_mrr_amountbefore));
}


// -------======商米T1显示二维码+金额信息=====-------//
function show_Android_Pos_T1_SecondScreen(ymoney, qrstr) {
    //是否Android客户端运行环境
    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
        //处理商米分屏显示
        if (g_set_pos_t1_secondscreen_enable) {
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
                    function(error) {
                        console.log(error);
                    },
                    {
                        myPrintData: JSON.stringify(postData),
                        myPrintImg: qrstr
                    }
                );
            } catch (e)
            {
                console.log(e.message);
            }
        }
    }
}