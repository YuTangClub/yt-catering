var pageSize = 10;

$(document).ready(function () {
    getOverduAchargePageFn("");
});

//获取分页
function getOverduAchargePageFn(days) {
    var Startdate = "";
    var Enddate = "";
    //初始化分页内容
    $.get("/Ajaxdata/GetOverdueChargeCount/", { "days": days, "Startdate": Startdate, "Enddate": Enddate }, function (data) {
        var i = Math.ceil(data / pageSize);
        laypage({
            cont: $('#pageGroOverdue'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            skip: true,
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                getOverduAchargeListFn(e.curr, days);
            }
        });
    });
}

//获取会员充次过期的列表
function getOverduAchargeListFn(pageIndex, days) {
    $.getJSON("/Ajaxdata/GetOverdueCharge/", {
        "pageIndex": pageIndex,
        "days": days,
        "pageSize": pageSize,
        "Startdate": "",
        "Enddate": ""
    }, function (data) {
        if (data && data.length > 0) {
            var html = "";
            var nowDate = new Date().Format("yyyy-MM-dd");
            for (var i = 0; i < data.length; i++) {
                var expirationDate = new Date(data[i].validity_date).Format("yyyy-MM-dd");
                if (isNullOrWhiteSpace(data[i].validity_date) && expirationDate == nowDate) {
                    //当天过期
                    html += '<tr>';
                    html += '<td><span>' + data[i].sv_mr_name + '</span></td>';
                    html += '<td class="amountcolor2"><span>' + data[i].sv_mr_cardno + '</span></td>';
                    html += '<td><span>' + data[i].sv_mr_mobile + '</span></td>';
                    html += '<td>' + data[i].sv_p_name + '<span class="red">(今天过期)</span></td>';
                    html += '<td><span>' + data[i].sv_mcc_sumcount + '</span></td>';
                    html += '<td><span class="colorff">' + data[i].sv_mcc_leftcount + '</span></td>';
                    if (isNullOrWhiteSpace(data[i].validity_date)) {
                        html += '<td><span>' + new Date(data[i].validity_date).Format("yyyy-MM-dd") + '</span></td>';
                    } else {
                        html += '<td><span></span></td>';
                    }
                    html += '<td class="operatinglist"><a class="fl" href="javascript:chsaisi2(\'' + data[i].sv_mr_cardno + '\',' + data[i].product_id + ',\'' + data[i].sv_p_name + '\',\'' + data[i].user_id + '\')"  class="xianzhecchs" data-id="' + data[i].product_id + '"  data-name="' + data[i].sv_p_name + '">续充</a>';
                    html += '<a class="fl extensionDate" data-infoArray="' + data[i].member_id + "," + data[i].product_id + "," + data[i].userecord_id + "," + user_id + "," + data[i].sv_mcc_leftcount + '"  class="" data-id="' + data[i].product_id + '"  data-name="' + data[i].sv_p_name + '">延期</a></td>';
                    html += '</tr>';
                } else if (data[i].getvalidity) {
                    //已过期
                    html += '<tr>';
                    html += '<td><span>' + data[i].sv_mr_name + '</span></td>';
                    html += '<td class="amountcolor2"><span>' + data[i].sv_mr_cardno + '</span></td>';
                    html += '<td><span>' + data[i].sv_mr_mobile + '</span></td>';
                    html += '<td>' + data[i].sv_p_name + '<span class="color999">(已过期)</span></td>';
                    html += '<td><span>' + data[i].sv_mcc_sumcount + '</span></td>';
                    html += '<td><span class="colorff">' + data[i].sv_mcc_leftcount + '</span></td>';
                    if (isNullOrWhiteSpace(data[i].validity_date)) {
                        html += '<td><span>' + new Date(data[i].validity_date).Format("yyyy-MM-dd") + '</span></td>';
                    } else {
                        html += '<td><span></span></td>';
                    }
                    html += '<td class="operatinglist"><a class="fl" href="javascript:chsaisi2(\'' + data[i].sv_mr_cardno + '\',' + data[i].product_id + ',\'' + data[i].sv_p_name + '\',\'' + data[i].user_id + '\')"  class="xianzhecchs" data-id="' + data[i].product_id + '"  data-name="' + data[i].sv_p_name + '">续充</a>';
                    html += '<a class="fl extensionDate" data-infoArray="' + data[i].member_id + "," + data[i].product_id + "," + data[i].userecord_id + "," + user_id + "," + data[i].sv_mcc_leftcount + '" data-id="' + data[i].product_id + '"  data-name="' + data[i].sv_p_name + '">延期</a></td>';
                    html += '</tr>';
                } else {
                    html += '<tr>';
                    html += '<td><span>' + data[i].sv_mr_name + '</span></td>';
                    html += '<td class="amountcolor2"><span>' + data[i].sv_mr_cardno + '</span></td>';
                    html += '<td><span>' + data[i].sv_mr_mobile + '</span></td>';
                    html += '<td>' + data[i].sv_p_name + '<i class="yellow">(即将过期)</i></td>';
                    html += '<td><span>' + data[i].sv_mcc_sumcount + '</span></td>';
                    html += '<td><span class="colorff">' + data[i].sv_mcc_leftcount + '</span></td>';
                    if (isNullOrWhiteSpace(data[i].validity_date)) {
                        html += '<td><span>' + new Date(data[i].validity_date).Format("yyyy-MM-dd") + '</span></td>';
                    } else {
                        html += '<td><span></span></td>';
                    }
                    html += '<td class="operatinglist"><a class="fl" href="javascript:chsaisi2(\'' + data[i].sv_mr_cardno + '\',' + data[i].product_id + ',\'' + data[i].sv_p_name + '\',\'' + data[i].user_id + '\')"  class="xianzhecchs" data-id="' + data[i].product_id + '"  data-name="' + data[i].sv_p_name + '">续充</a>';
                    html += '</tr>';
                }
            }
            $("#overduelist").html(html);
        } else {
            var thlength = $("#rowlength").children("th").length;
            $("#overduelist").html('<tr><td class="text-center sad" style="text-align:center !important;" colspan="' + thlength + '"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>');
        }
    });
}

//日期查询
$("#selectDateType li").click(function () {
    var dateType = $(this).data("datetype");
    if (dateType != 0) {
        getOverduAchargePageFn(dateType);
    } else {
        getOverduAchargePageFn("");
    }
    $(this).addClass("active").siblings("li").removeClass("active");
});

//延长过期时间
$(document).unbind("click", ".extensionDate").on("click", ".extensionDate", function () {
    var info = $(this).attr("data-infoarray");
    layerpage.Deke_layerpage.show_Url2("1", '延长过期时间<input type="hidden" name="validity_hidden" id="validity_hidden" value="' + info + '" />', "/ajaxHtml_N3/member/rechargeExpiration.html?=" + getTimeStamp(), ['450px', '240px'], extensionDateFn);
});

//延长过期时间回调
function extensionDateFn() {
    var nowDate = new Date();
    var nowAddOneYear = nowDate.setFullYear(nowDate.getFullYear() + 1);
    $("#validity_date2").val(new Date(nowAddOneYear).Format("yyyy-MM-dd"));
    selectexpirationdateTime("validity_date2");
}

//确认延长过期时间
$(document).unbind("click", "#confirmExtensionDate").on("click", "#confirmExtensionDate", function () {
    var validity_value = $("#validity_hidden").val();
    var infoArray = validity_value.split(",");
    var modelData = {
        member_id: infoArray[0],
        product_id: infoArray[1],
        userecord_id: infoArray[2],
        user_id: infoArray[3],
        validity_date: $("#validity_date2").val().trim()
    }
    if (infoArray[4] > 0) {
        $.ajax({
            url: "/Ajaxdata/UpdateTimedelayDate",
            data: JSON.stringify(modelData),
            type: "POST",
            contentType: "application/json",
            success: function (result) {
                if (result == true) {
                    var dateType = $(this).data("datetype");
                    getOverduAchargePageFn(dateType);
                    layer.closeAll();
                    layer.msg("延时成功！");
                } else if (result == -1) {
                    layer.closeAll();
                    layer.msg("操作失败，时间格式有误！");
                }
                else {
                    layer.closeAll();
                    layer.msg("操作失败，产品有误！");
                }
            }

        });
    } else {
        layer.closeAll();
        layer.msg("当前产品已没有可用次数！");
    }
});


//延长过期时间
$(document).unbind("click", "#rechargeExpirationDate>a").on("click", "#rechargeExpirationDate>a", function () {
    $(this).addClass("active").siblings("a").removeClass("active");
    var dateType = $(this).attr("data-dateType");
    selectValidityDateFn(dateType);
});

//选择过期时间方法
/*
 * 0--一个月，1--半年，2一年，3--长期
 */
function selectValidityDateFn(dateType) {
    var nowDate = new Date();
    if (dateType == 0) {
        nowDate.addDays(30);
        $("#validity_date2").val(nowDate.Format("yyyy-MM-dd"));
    }
    else if (dateType == 1) {
        nowDate.addDays(182);
        $("#validity_date2").val(nowDate.Format("yyyy-MM-dd"));
    }
    else if (dateType == 2) {
        nowDate.setFullYear(nowDate.getFullYear() + 1);
        $("#validity_date2").val(nowDate.Format("yyyy-MM-dd"));
    }
    else if (dateType == 3) {
        nowDate.setFullYear(nowDate.getFullYear() + 10);
        $("#validity_date2").val(nowDate.Format("yyyy-MM-dd"));
    }
    else if (dateType == 4) {
        nowDate.addDays(92);
        $("#validity_date2").val(nowDate.Format("yyyy-MM-dd"));
    }
}

//启用充次方法
function chsaisi2(id, pid, pname, user_id) {
    var str_Is_open_commission = Is_open_commission == false ? 0 : 1;
    user_id = user_id || $("#userid").val();
    id = id || $(".sv_mr_cardno").text();
    var _receptionPtNum;
    if (typeof (receptionPtNum) == "undefined") {
        _receptionPtNum = 1;
    } else {
        _receptionPtNum = receptionPtNum;
    }
    var _receptionPtName;
    if (typeof (receptionPtNum) == "undefined") {
        _receptionPtName = "";
    } else {
        _receptionPtName = receptionPtName;
    }
    layer.open({
        type: 2,
        title: '会员管理',
        shadeClose: true,
        shade: 0.8,
        area: ['80%', '90%'],
        content: '/member/acharge/?x=1#' + id + "@" + pid + "@" + pname + "@" + str_Is_open_commission + "@" + user_id + "@" + _receptionPtNum + "@" + _receptionPtName //iframe的url
    });
}