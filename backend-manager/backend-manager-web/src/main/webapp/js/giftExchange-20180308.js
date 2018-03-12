memberlist = "";
PrintReceiptsData = "";//小票打印数据
PrinTemplate = "";//模板
$(function () {
    //选择礼品的点击事件
    $('.zhankaibtn, #selectGift').click(function () {
        if (isNullOrWhiteSpace($('#member_id').val().trim())) {
            if (isNullOrWhiteSpace($('.sv_mw_availablepoint').html()) && $('.sv_mw_availablepoint').html() > 0) {
                if ($(this).css == '.zhankaibtn') {
                    $(this).hide(0);
                }
                Deke.DeKe_dialog.show_Url3("选择礼品", "/html/Member/GiftExchangeList.html?v=" + clearCache, readGiftList, ['730px', ''], "shoyin2");
            }
            else {
                layer.msg("该会员当前积分不足！");
            }
        }
        else {
            layer.msg("请选泽会员后再进行礼品兑换！");
        }
    });

    $("#cashxzhy").click(function () {
        Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=" + clearCache, readMemberList, ['730px', ''], "shoyin2");
        $("#userid").val("");
    });
    //刷新
    $("#refurbish").click(function () {
        $("#query_user").val("");
        $("#userid").val("");
        pageMemberGiftExchangeList('','', 0, '', '');
    });
    $("#query_user").keyup(function () {
        try {
            $("#userid").val("");
            if ($("#query_user").val() != "") { cliskgetuser() }
            pageMemberGiftExchangeList($("#query_user").val(),'',0,$("#Startdate").val(), $("#Enddate").val());
        } catch (e) {
            layer.msg(e.message);
        }

    });
    setGiftNumber();
    btnGiftList();
    var start = {

        elem: '#Startdate',
        format: 'YYYY/MM/DD',
        //   min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16 23:59:59', //最大日期
        istime: false,
        istoday: false,
        choose: function (datas) {

        }
    };
    var end = {
        elem: '#Enddate',
        format: 'YYYY/MM/DD',
        istime: false,
        istoday: false,
        choose: function (datas) {
            //结束日选好后，重置开始日的最大日期
        }
    };
    laydate(start);
    laydate(end);
    laydate.skin('molv');//主题皮肤
    // 会员选择
    $('.giftData i').click(function () {
        $(this).parent().toggleClass('on').siblings().removeClass('on')
        if ($(this).parent().is(".on")) {
            if ($(this).data("id") != -1 && $(this).data("id")!=0) {
                $("#Startdate").val(""); $("#Enddate").val("");
                $(".sjxuantime").hide();
                pageMemberGiftExchangeList($("#query_user").val(), '', $(this).data("id"),'','');
            } else if ($(this).data("id")== -1) {
                $(".sjxuantime").show();
                return false;

            }
        } else {
            if ($(this).data("id") != 0) { 
            $("#Startdate").val(""); $("#Enddate").val("");
            $(".sjxuantime").hide();
            pageMemberGiftExchangeList($("#query_user").val(),'',0,'','');
            }
        }
    });
    $("#QueryCable").click(function () {
        pageMemberGiftExchangeList($("#query_like").val(), $('#member_id').val(), 0, $("#Startdate").val(), $("#Enddate").val());
    });
    $("#refresh").click(function () {

        pageMemberGiftExchangeList($("#query_user").val(), '', 0, '', '')

    });
});
$(document).on("click", ".check-box", function (e) {
    if (!$(this).find("input").prop("checked")) {
        $(this).find("input").prop("checked", true);
        $(this).addClass('checkedBox');
        if ($('input[name="subbox"]:checked').length == $('input[name="subbox"]').length) {
            $("#checkGiftAll").find("input").prop("checked", true);
            $("#checkGiftAll").addClass('checkedBox');
        }
        if ($(this).attr("id") != "checkGiftAll") {
            if ($(this).find("input").data("sv_giftalready") >= 1) {
                $('#selectGiftNumber').html($('input[name="subbox"]:checked').length);
            } else {
                layer.msg("可兑换数量为0！");
                $(this).find("input").prop("checked", false);
                $(this).removeClass('checkedBox');
                $("#checkGiftAll").find("input").prop("checked", false);
                $("#checkGiftAll").removeClass('checkedBox');
            }
        }
    }
    else {
        $('#selectGiftNumber').html($('input[name="subbox"]:checked').length - 1);

        $(this).find("input").prop("checked", false);
        $(this).removeClass('checkedBox');
        $("#checkGiftAll").find("input").prop("checked", false);
        $("#checkGiftAll").removeClass('checkedBox');
    }

    if ($(this).attr("id") == "checkGiftAll") {
        $('#selectGiftNumber').html($('input[name="subbox"]:checked', false).length);
        if (!$("#checkGiftAll").find("input").prop("checked")) {
            $('input[name="subbox"]').prop("checked", false);
            $('input[name="subbox"]').parent().parent().removeClass('checkedBox');
            $('#selectGiftNumber').html(0);
        }
        else {
            $('#selectGiftNumber').html($('input[name="subbox"]:checked', false).length);
            $('input[name="subbox"]').prop("checked", true);
            $('input[name="subbox"]').parent().parent().addClass('checkedBox');
            var ckList = $('input[name="subbox"]:checked');
            var j = 0;
            $('input[name="subbox"]:checked').each(function () {
                if ($(this).data("sv_giftalready") >= 1)
                {
                    j = j + 1;

                } else if($(this).data("sv_giftalready") <= 0) {
                    $(this).prop("checked", false);
                    $(this).parent().parent().removeClass('checkedBox')
                    $("#checkGiftAll").find("input").prop("checked", false);
                    $("#checkGiftAll").removeClass('checkedBox');
                }
            })
            $('#selectGiftNumber').html(j);
        }
    }

    //.active

    if ($(".checkedBox").length > 0) {
        $(".unlinks li").addClass("active");
    } else {
        $(".unlinks li").removeClass("active");
    }
});
// 会员信息列表回调
function readMemberList() {
    getMemberList("");
    $("#query_like").keyup(function () {
        $("#userid").val("");
        getMemberList($("#query_like").val());
        if (isNullOrWhiteSpace($('#member_id').val())) {
            pageMemberGiftExchangeList($("#query_like").val(), $('#member_id').val(),0,'','');
        }
    });
}

// 加载会员信息列表
function getMemberList(key) {
    $.get("/ajaxdata/GetMemberList/1", { "key": key, "pageSize": 30 }, function (data) {
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
            if (!isNullOrWhiteSpace(data[i].sv_ml_name)) {
                html += '  <td><span></span></td>';
            } else
                html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
            html += '<td><span>' + data[i].sv_mw_availablepoint + '</span></td>';
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
                    //搜索会员
                    $("#userid").val($(this).parent().parent().data("user_id"));
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
                if ($(this).find("td").eq(7).attr("id") == 1) {
                    layer.msg("此卡已挂失");
                } else {
                    //搜索会员
                    $("#userid").val($(this).data("user_id"));
                    $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));
                    cliskgetuser();
                    layer.closeAll();
                }
            }
            
        });
    });

    $("#guanbinimab").click(function () {

        layer.close(index);
    });

}

// 读取会员信息
function cliskgetuser() {
    $.get("/Ajaxdata/QueryUserModel?id=" + $("#query_user").val() + "&userid=" + $("#userid").val(), function (data) {
        if (data != null)
        {
            if (data.type == 1) {
                Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=42", f4, ['730px', ''], "shoyin2");
                $("#userid").val("");
                memberlist = data.list;
            }
            else {
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
                            }
                            else if (key == "sv_mr_headimg") {
                                $("#sv_mr_headimg").attr("src", data[key]);
                            }
                            else {
                                if (key == "member_id") {
                                    $("#" + key).val(data[key]);
                                    pageMemberGiftExchangeList('', data[key], 0, '', '');
                                }
                                else {
                                    if (key == "user_id") {
                                        $("#" + key).val(data[key]);
                                        $("#userid").val(data[key]);
                                    } else { $("." + key).text(data[key]); }

                                }
                            }
                        }
                    }
                }
               

            }
        }

    });
}

// 批量操作，兑换礼品
function saveExchange() {
    $('#btnExchanges').click(function () {
        verifyenable($("#member_id").val());
    });
}
function verifyenable(id) {
    $.ajax({
        url: "/System/VerifyEnable?name=" + id + "&userid=" + $("#userid").val(),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data == 1) {
                ExchangeGift();
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
};

function baochuuserpwd() {
    $("#sv_mr_pwd").focus();

    $("#baochuuser").click(function () {
        $.post("/System/VerifyEnable", { name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val() }, function (data) {
            if (data == 1) {
                ExchangeGift(1);
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
                    ExchangeGift(1);
                    layer.close(index);
                    return false;
                }
                else if (data == 4) {
                    layer.msg("会员密码输入有误");
                }
            });
        }
    });

};
//兑换礼品
function ExchangeGift(state) {
    var sv_mw_availablepoint = parseInt($(".sv_mw_availablepoint").text());
    var giftExchangeIntegral = parseInt($("#giftExchangeIntegral").text());//要兑换的积分
    if (giftExchangeIntegral > sv_mw_availablepoint) {
        layer.msg("兑换积分不足！");

    }
    else {
        if (isNullOrWhiteSpace($('.sv_mw_availablepoint').html()) && $('.sv_mw_availablepoint').html() > 0) {
            if (state == 1) {
                var list = exchangeList();
                $.ajax({
                    url: '/GiftExchange/SaveExchange?userid=' + $("#userid").val(),
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(list),
                    async: false,
                    success: function (result) {
                        if (result == true) {
                            layer.msg("兑换礼品成功");
                            if ($(".ExchangeAndPrint").hasClass('on')) {
                                PrintReceipts();
                                $(".ExchangeAndPrint").removeClass('on');
                            } else {
                                location.reload();
                                pageMemberGiftExchangeList($("#query_like").val(), "", 0, "", "");
                            };
                        }
                        else if (result == -2) {
                            layer.msg("你没有该操作权限！");
                        } else if (result == -3) {
                            $("#userid").val("");
                            layer.msg("当前会员不支持跨店消费！");
                        }
                        else {
                            layer.msg("操作失败，请刷新后再重试！");
                        }
                    }
                });
            } else {
                layer.confirm("您确认要兑换礼品吗？", { btn: ["确认兑换", "关闭"] },
            function () {
                var list = exchangeList();
                $.ajax({
                    url: '/GiftExchange/SaveExchange?userid=' + $("#userid").val(),
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(list),
                    async: false,
                    success: function (result) {
                        if (result == true) {
                            layer.msg("兑换礼品成功");
                            if ($(".ExchangeAndPrint").hasClass('on')) {
                                PrintReceipts();
                                $(".ExchangeAndPrint").removeClass('on');
                            } else {
                                location.reload();
                                pageMemberGiftExchangeList($("#query_like").val(), "", 0, "", "");
                            };
                        }
                        else if (result == -2) {
                            layer.msg("你没有该操作权限！");
                        } else if (result == -3) {
                            $("#userid").val("");
                            layer.msg("当前会员不支持跨店消费！");
                        }
                        else {
                            layer.msg("操作失败，请刷新后再重试！");
                        }
                    }
                });
            });
            }
        }
        else {
            layer.msg("该会员当前积分不足！");
        }
    }
};
// 批量兑换礼品数据处理
function exchangeList() {
    var list = new Array();
    PrintReceiptsData = new Array();
    var member_id = $('#member_id').val();
    $("#gifExchangeListhtml .batchTr").each(function () {
        var sv_giftchangenumber = $(this).find("input[name='sv_giftchangenumber']").val();
        var sv_gift_id = $(this).find("input[name='sv_Exgift_id']").val();
        var sv_creditsexchange = $(this).find("input[name='sv_creditsexchange']").val();
        var sv_giftname = $(this).find("input[name='sv_giftname']").val();//商品名称
        var sv_gift_unit = $(this).find("input[name='sv_gift_unit']").val();
        var model = {
            rankDemotion: rankDemotion,
            availableIntegralSwitch: availableIntegralSwitch,
            rankPromotionIsON: rankPromotionIsON,
            MembershipGradeGroupingIsON: MembershipGradeGroupingIsON,
            member_id: member_id,
            sv_giftchangenumber: sv_giftchangenumber,
            sv_gift_id: sv_gift_id,
            sv_creditsexchange: Math.ceil(sv_creditsexchange * sv_giftchangenumber)
        };

        if (member_id > 0 && sv_giftchangenumber > 0 && sv_gift_id > 0 && sv_creditsexchange > 0) {
            list.push(model);
            PrintReceiptsData.push({
                "sv_name": sv_giftname, "sv_integral": sv_creditsexchange, "unit": sv_gift_unit,
                "sv_number": sv_giftchangenumber, "sumintegral": Math.ceil(sv_creditsexchange * sv_giftchangenumber)

            });
        }

    });
    return list;
};

// 点击按钮进入礼品列表
function btnGiftList() {
    $('#').click(function () {
        Deke.DeKe_dialog.show_Url3('选择礼品', '/html/Member/GiftExchangeList.html?v=' + clearCache + 1, readGiftList, ['450px', '500px']);
    });
};

// 回调函数
function readGiftList() {
    getGiftList('');
    // 礼品搜索框，鼠标弹起时搜索数据
    $('#query_giftLike').keyup(function () {
        getGiftList($(this).val().trim());
    });
    selectGiftExchangeList();
};

// 读取礼品列表
function getGiftList(seach) {
    var html = '';
    $.getJSON("/Gift/PageList/", { pageIndex: 1, seach: seach, userid: $("#query_user").data("user_id"), pageSize: -1 }, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                html += '<tr><td><div class="check-box ccc"><i><input   data-sv_giftalready=' + data[i].sv_giftalready + ' type="checkbox" name="subbox" value="' + data[i].sv_gift_id + '"></i></div></td>';
                html += '<td>' + data[i].sv_giftnumber + '</td>';
                html += '<td>' + data[i].sv_giftname + '</td>';
                html += '<td>' + data[i].sv_gift_unit + '</td>';
                html += '<td>' + data[i].sv_giftintegral + '</td>';
                html += '<td>' + data[i].sv_giftalready + '</td>';
                html += '</tr>';
            }
        }
        else {
            html = '';
        }
        $("#giftListhtml").html(html);
    });
};

// 读取礼品列表用于兑换礼品用
function getGiftExchangeList(ids) {
    var html = '';
    var numberintegral = 0;
    $.getJson("/Gift/PageList/", { ids: ids.join(',') }, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                html += '<tr class="batchTr" id="batchTr_' + data[i].sv_gift_id + '">';
                html += '<td><input type="hidden" name="sv_Exgift_id" value="' + data[i].sv_gift_id + '"/>' + Math.ceil(i + 1) + '</td>';
                html += '<td ><input type="hidden" name="sv_giftname" value="' + data[i].sv_giftname + '"/>' + data[i].sv_giftname + '</td>';
                html += '<td data-name="" data-val="' + data[i].sv_gift_unit + '"><input type="hidden" name="sv_gift_unit" value="' + data[i].sv_gift_unit + '"/>' + data[i].sv_gift_unit + '</td>';
                html += '<td><input type="hidden" name="sv_creditsexchange" id="sv_creditsexchange_' + data[i].sv_gift_id + '" value="' + Math.ceil(data[i].sv_giftintegral) + '"/>' + data[i].sv_giftintegral + '</td>';
                html += '<td id="sv_giftalready_' + data[i].sv_gift_id + '">' + data[i].sv_giftalready + '</td>';
                html += '<td><div class="addshuxl"><span class="addjian"  onclick ="addjian(' + data[i].sv_gift_id + ')"></span><input onchange="numberonchange(' + data[i].sv_gift_id + ')" onclick="numberonclick(' + data[i].sv_gift_id + ');" name="sv_giftchangenumber" id="number_' + data[i].sv_gift_id + '" type="tel" class="addtext" min="0" max="' + Math.ceil(data[i].sv_giftquantity - data[i].sv_giftalready) + '" value="1"><span class="addadd" onclick="addadd(' + data[i].sv_gift_id + ')"></span></div></td>';
                html += '<td><div class="addshuxl"><span class="addjian"  onclick ="deletetr(' + data[i].sv_gift_id + ')"></span></div></td>';
                html += '</tr>';
                numberintegral += data[i].sv_giftintegral * 1;//动态获取数据以及积分
            }
        }
        else {
            html = '';
        }
        $("#gifExchangeListhtml").html(html);
        $("#giftExchangeIntegral").text(numberintegral)
        //$('#giftExchangeIntegral').html();
    });

    saveExchange();
};

// 在弹出窗口中勾选要兑换的礼品，可以选多个
function selectGiftExchangeList() {
    $('#btnSelectGiftExchange').click(function () {
        var ckList = $('input[name="subbox"]:checked');
        var obj = document.getElementsByName("subbox");
        var check_val = [];
        $('input[name="subbox"]:checked').each(function () {
            if ($(this).data("sv_giftalready") != 0 && $(this).data("sv_giftalready") != undefined && $(this).val()>0) {
                check_val.push($(this).val());
            }
        });
        if (ckList.length >= 1 && ckList.length <= 10) {
            if (check_val != "[]") {
                getGiftExchangeList(check_val);
                layer.close(index);
                $(this).parents('tr').siblings().show(0);
                $('.xezlibtn').show(0);
            }
        }
        else {
            layer.msg('请选择1到10个礼品进行兑换设置！');
        }
    });

    $('#btnclose').click(function () {
        layer.closeAll();
    });
};

// 设置礼品兑换数量
function setGiftNumber() {
    $('#add').click(function () {
        moneyTotal();
    });

    $('#delete').click(function () {
        moneyTotal();
    });
};

// 点击增加或递减兑换礼品数量按钮处理总价格方法
function moneyTotal() {
    var moneyTotal = 0;

    $("#giftList").each(function () {
        var sv_giftchangenumber = $('#sv_giftchangenumber').val().trim();
        var sv_giftintegral = $('#sv_giftintegral').val().trim();

        if (sv_giftchangenumber > 0 && sv_giftintegral > 0) {
            moneyTotal = Math.ceil(sv_giftchangenumber * sv_giftintegral);
            moneyTotal = Math.ceil(moneyTotal + moneyTotal);
        }
    });

    $('#').html(moneyTotal);;
}

// 礼品兑换列表
function pageMemberGiftExchangeList(seach, member_id, dateday, Startdate, Enddate) {
    // 初始化分页内容
    $.get("/GiftExchange/Total/", {seach:seach, member_id: member_id, dateday:dateday, Startdate:Startdate, Enddate:Enddate }, function (data) {
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
                memberGiftExchangeList(e.curr, seach, member_id, dateday, Startdate, Enddate);
            }
        });
    });
}

// 读取会员兑换礼品记录
function memberGiftExchangeList(page, seach, member_id, dateday, Startdate, Enddate) {
    var html = '';
    $.getJSON("/GiftExchange/PageList/", { pageIndex: page, seach: seach, member_id: member_id, dateday: dateday, Startdate: Startdate, Enddate: Enddate }, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';
                html += '<td>' + data[i].sv_mr_cardno + '</td>';
                html += '<td>' + data[i].sv_mr_name + '</td>';
                html += '<td><span><img src="' + data[i].sv_giftpicture + '"></span><span>' + data[i].sv_giftname + '</span></td>';
                html += '<td>' + data[i].sv_giftchangenumber + data[i].sv_gift_unit + '</td>';
                html += '<td>' + data[i].sv_creditsexchange + '</td>';
                html += '<td>' + data[i].sv_mw_availablepoint + '</td>';
                if (data[i].sv_operatorname == null || data[i].sv_operatorname == '') {
                    html += '<td></td>';
                }
                else {
                    html += '<td>' +data[i].sv_operatorname + '</td>';
                }
                html += '<td><span>' +data[i].consumeusername + '</span></td>';
                html += '<td><span>' +data[i].memberuserName + '</span></td> ';
                html += '<td>' + new Date(data[i].sv_creationdate).Format("yyyy-MM-dd hh:mm:ss") + '</td>';
                html += '</tr>';
            }
        }
        else {
            html = '';
        }
        $("#giftExchangelisthtml").html(html);
    });
};

//动态积分
function calculationIntegral(integral) {
    var giftExchangeIntegral = parseInt($("#giftExchangeIntegral").text());
    $("#giftExchangeIntegral").text(giftExchangeIntegral + integral);
};
//增加数量
function addadd(id) {
    var numberintegral = parseInt($("#sv_creditsexchange_" + id).val());//当前积分
    var number = parseInt($("#number_" + id).val());//当前数量
    var sv_giftalready = parseInt($("#sv_giftalready_" + id).text());
    if (number > sv_giftalready) {
        layer.msg("数量不能超过多剩余数量！");
        return false;
    } else {
        calculationIntegral(numberintegral * 1);
        $("#number_" + id).val(number + 1);//数量叠加
    }

};
//减少数量
function addjian(id) {
    var numberintegral = parseInt($("#sv_creditsexchange_" + id).val());//当前积分
    var number = parseInt($("#number_" + id).val());//当前数量
    if (number == 1) {
        layer.msg("数量不能少于1！");
        return false;
    }
    else {
        calculationIntegral(-numberintegral * 1);
        $("#number_" + id).val(number - 1);//数量叠加
    }
};
//移除行
function deletetr(id) {
    var numberintegral = parseInt($("#sv_creditsexchange_" + id).val());//当前积分
    var number = parseInt($("#number_" + id).val());//当前数量
    calculationIntegral(-numberintegral * number);
    $("#batchTr_" + id).remove();

};
//数量触发事件
function numberonchange(id) {
    var numberintegral = parseInt($("#sv_creditsexchange_" + id).val());//当前积分
    var _numberintegral = 0;
    var number = parseInt($("#number_" + id).val());//当前数量
    var sv_giftalready = parseInt($("#sv_giftalready_" + id).text());//剩余数量
    if (!isNaN(number)) {
        if (_number != 0 && number > _number) {
            number = _number + (number - _number);
            _numberintegral = numberintegral * number - (numberintegral * _number);
        } else if (_number != 0 && number < _number) {
            number = _number - (_number - number);
            _numberintegral = (numberintegral * number - (numberintegral * _number));
        } else if (_number != 0) {
            _numberintegral = numberintegral * 1;
        }
        if (number == 0) {
            $("#number_" + id).val(_number);//数量叠加
            layer.msg("数量不能少于1！");
            return false;
        }
        else if (number > sv_giftalready) {
            $("#number_" + id).val(_number);//数量叠加
            layer.msg("数量不能超过多剩余数量！");
            return false;

        } else {

            calculationIntegral(_numberintegral);
            $("#number_" + id).val(number);//数量叠加
        }
    } else {
        layer.msg("数量输入有误！");
        return false;
    }
};
var _number = 0;
function numberonclick(id) {
    _number = parseInt($("#number_" + id).val());//当前数量
};

function f4() {
    Getmemberlist(memberlist);
    $("#query_like").keyup(function () {
        getMemberList($("#query_like").val());
        pageMemberGiftExchangeList($("#query_like").val(), '', 0, $("#Startdate").val(), $("#Enddate").val());
    });
};
// 加载会员信息列表
function Getmemberlist(data) {
    var index2 = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
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
        if (!isNullOrWhiteSpace(data[i].sv_ml_name)) {
            html += '  <td><span></span></td>';
        } else
            html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
        html += '<td><span>' + data[i].sv_mw_availablepoint + '</span></td>';
        html += '   <td id="' + data[i].sv_mr_status + '"><a href="javascript:void(0);" class="xianzhehuiyan" id="' + data[i].sv_mr_status + '" data-isoverdue="' + data[i].isOverdue + '">选择</a></td>';
        html += '   </tr>';
    }
    $("#usercoutn").html(data.length);
    $("#userlist").html(html);
    layer.close(index2);


    $("#userlist").on("click", ".xianzhehuiyan", function () {
        if ($(this).data("isoverdue")) {
            layer.msg("此卡已过期");
        } else {
            if (this.id == 1) {
                layer.msg("此卡已挂失");
            } else {
                //搜索会员
                $("#userid").val($(this).parent().parent().data("user_id"));
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
if ($(this).find("td").eq(7).attr("id") == 1) {
            layer.msg("此卡已挂失");
        } else {
            //搜索会员
            $("#userid").val($(this).data("user_id"));
            $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));
            cliskgetuser();
            layer.closeAll();
        }
        }
        
    });

    $("#guanbinimab").click(function () {

        layer.close(index);
    });

}

function verifyenable(id) {
    $.ajax({
        url: "/System/VerifyEnable?name=" + id + "&userid=" + $("#userid").val(),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data == 1) {
                ExchangeGift();
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
    $("#quxiao").click(function () {
        layer.close(index);
    });
    $("#sv_mr_pwd").focus();

    $("#baochuuser").click(function () {
        $.post("/System/VerifyEnable", { name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val() }, function (data) {
            if (data == 1) {
                ExchangeGift(1);
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
                    ExchangeGift(1);
                    layer.close(index);
                    return false;
                }
                else if (data == 4) {
                    layer.msg("会员密码输入有误");
                }
            });
        }
    });

};

//打印小票
function PrintReceipts() {
    if (PrintReceiptsData != "") {
        $.getJSON("/system/Getprint", function (data) {
            PrinTemplate = data;
            var spfData = JSON.stringify({
                "content": PrintReceiptsData, "userinfo": {
                    "sv_mr_cardno": $(".sv_mr_cardno").text(), "sv_mr_name": $(".sv_mr_name").text(),
                    "operator": $("#dianzhu").text(), "sv_mw_availableamount": $(".sv_mw_availableamount").text()
                }, "Finfo": { "remaining_integral": $("#giftExchangeIntegral").text() + "/" + (parseFloat($(".sv_mw_availablepoint").text()) - parseFloat($("#giftExchangeIntegral").text())) }
            });
            var sconfig = JSON.stringify(PrinTemplate);
            test_pushprintData(spfData, sconfig, 0);
            pageMemberGiftExchangeList($("#query_like").val(), "", 0, "", "");
            setTimeout(function () {
                location.reload();
            }, 1000); 
        });
    }
};