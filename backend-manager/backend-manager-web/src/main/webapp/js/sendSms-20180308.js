var last_sendsmsdate = "";//最后发送时间
var last_salesdate = "";//最后销售时间
$(document).ready(function () {
    //数字计算
    var num = parseInt($(".dxvivwel").text().trim().length - 2);
    num = 63 - num;
    $("#number").text(num)

    $("#sendems").click(function () {
        var sv_us_shortname= $('#sv_us_shortname').val().trim();
        if ($('#sv_us_shortname').val() == null || $('#sv_us_shortname').val() == '') {
            layer.msg("您还没有设置店铺简称，不能发送短信哦！~");
            return;
        }

        if (sv_us_shortname.length < 3 || sv_us_shortname.length > 8) {
            layer.msg("您的店铺简称必须为3到8个字作为签名才能发送短信！");
            return;
        }

        if ($(".usrNameZone>text").length < 1) {
            layer.msg("还没有选择要接收的会员哦！~");
            return;
        }
        if ($(".usrNameZone>text").length < 1) {
            layer.msg("还没有选择要接收的会员哦！~");
            return;
        }

        if ($("#text_txt").val().length < 1) {
            layer.msg("都还没有内容！~");
            return;
        }
        layer.confirm("确认要群发信息吗？一但确认所有信息不能撤回！", { btn: ["确认", "取消"] }, function () {
            layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: '<br>短信在批量发送中，请不要关闭该页面，直到短信发送完成后，会自动关闭！',
                skin: 'layui-layer-demo', //样式类名
                closeBtn: 0, //不显示关闭按钮
                shift: 2,
                shadeClose: false, //开启遮罩关闭
            });
            var dr = [];

            $(".usrNameZone>text").each(function (i) {
                dr[i] = { "moble": $(this).data("mo"), "id": $(this).data("id"), "txt": $(this).text() }

            });
            $.post("/Sms/PubSenDSems", { "MobleKist": JSON.stringify(dr), "mes": $(".dxvivwel").text().trim() }, function (data) {
                layer.closeAll();
                if (data == -3) {
                    layer.msg("系统出错");

                } else if (data == -2) {

                    layer.msg("您的短信数量不够了！");

                } else {
                    $("#shulixns").text(data);
                    layer.msg("操作成功");

                }


            });




        });

    });

    //单个checkbox选中取消
    $(document).on("click", ".check-box", function () {
        if (!$(this).find("input").prop("checked")) {
            $(this).find("input").prop("checked", true);
            $(this).addClass('checkedBox');

            if ($('input[name="subbox"]:checked').length == $('input[name="subbox"]').length) {
                $("#checkAll").find("input").prop("checked", true);
                $("#checkAll").addClass('checkedBox');
            }
        }
        else {
            $(this).find("input").prop("checked", false);
            $(this).removeClass('checkedBox');
            $("#checkAll").find("input").prop("checked", false);
            $("#checkAll").removeClass('checkedBox');
        }


        if ($(this).attr("id") == "checkAll") {

            if (!$("#checkAll").find("input").prop("checked")) {


                $('input[name="subbox"]').prop("checked", false);
                $('input[name="subbox"]').parent().parent().removeClass('checkedBox');

            } else {
                $('input[name="subbox"]').prop("checked", true);
                $('input[name="subbox"]').parent().parent().addClass('checkedBox');
            }
        }

        //.active

        if ($(".checkedBox").length > 0) {
            $(".unlinks li").addClass("active");

        } else {
            $(".unlinks li").removeClass("active");
        }
    });
    $(document).on("click", "#quedingss", function () {
        if ($(".checkedBox").length > 0) {
            if ($("#checkAll").find("input").prop("checked")) {
                $(".usrCount").text($(".checkedBox").length - 1);
            }
            else {
                $(".usrCount").text($(".checkedBox").length);
            }
            $(".usrNameZone").html("");
            //搜索会员
            // $("#query_user").val($(this).parent().parent().data("sv_mr_cardno")).data("id", $(this).parent().parent().data("id"));
            $(".checkedBox").each(function (i) {
                if ($(this).data("id") == 1) {
                    $(".usrNameZone").append("<text data-id='" + $(this).parent().parent().data("id") + "' data-mo='" + $(this).parent().parent().find("td").eq(3).text() + "'>" + $(this).parent().parent().find("td").eq(1).text() + ",</text>");
                }
            });

        }
        layer.closeAll();
    });


    $("#fdxxzhy").click(function () {

        Deke.DeKe_dialog.show_Url2("选择会员", "/Html/sms/GetUser.html?v=" + clearCache, fx, ["750px", "540px"]);

    });

    $(document).on("click", "#queding", function () {
        if ($('#listtemp li.active').length > 0) {
            $("#text_txt").val($('#listtemp li.active').text().replace("【商铺名称】", "" + $('#username').html() + "").trim()).change();
            layer.closeAll();
        } else {
            layer.msg("还没选择短信模板！");
        }
    });

    $(document).on(" keyup  change", "#text_txt", function () {

        $("#showtext").text($("#text_txt").val());

        var num = parseInt($("#number").text().trim().length);
        num = 63 - parseInt($(".dxvivwel").text().trim().length);
        if (num < 0) {
            $("#tiao").text(Math.ceil($(".dxvivwel").text().trim().length / 63));
            $("#number").text("0");
        } else {
            $("#tiao").text(1);
            $("#number").text(num);
        }

    });



    $("#fdxdjdx").click(function () {
        Deke.DeKe_dialog.show_Url2("独家短信", "/Html/sms/abchtml.html?v=" + clearCache + 1, f, ["750px", "520px"]);
    });

    $("#fdxdjdx1").click(function () {

        Deke.DeKe_dialog.show_Url2("独家短信", "/Html/sms/abchtml1.html?v=" + clearCache + 2, f, ["750px", "520px"]);

    });

    $("#fdxdjdx2").click(function () {

        Deke.DeKe_dialog.show_Url2("独家短信", "/Html/sms/abchtml2.html?v=" + clearCache + 3, f, ["750px", "520px"]);

    });

    function f() {
        $('#qixiao').click(function () {
            layer.closeAll();
        });

        $.getJSON("/sms/Getmtemolate/" + $("#xqtabbox li").eq(0).data("id"), function (data) {
            $("#listtemp").html("");
            for (var i = 0; i < data.length; i++) {

                $("#listtemp").append(' <li data-id="' + data[i].sms_mes_id + '"> <div class="setli"> <i></i> </div> <p>' + data[i].sms_mes_text + '</p> </li>');
            }

        });

        //会员详细信息移动TAB事件
        $('#xqtabbox li').hover(function () {
            $(this).addClass('active').siblings().removeClass('active');
            //  alert($(this).data("id"));

            $.getJSON("/sms/Getmtemolate/" + $(this).data("id"), function (data) {
                $("#listtemp").html("");
                for (var i = 0; i < data.length; i++) {

                    $("#listtemp").append(' <li data-id="' + data[i].sms_mes_id + '"> <div class="setli"> <i></i> </div> <p>' + data[i].sms_mes_text + '</p> </li>');
                }

            });

        });

        $('#listtemp').on("click", "li", function () {

            $(this).addClass('active').siblings().removeClass('active');
        });

    }
    sms.List();
});

function fx() {


    $.get("/Ajaxdata/GetUserconfig", function (data) {
        //  alert(data);
        //
        if (!data.GetUserLevel) {

            data.GetUserLevel = data.getUserLevel;
        }
        if (!data.GetMembergroup) {

            data.GetMembergroup = data.getMembergroup;
        }
        if (!data.GetSv_membertag) {

            data.GetSv_membertag = data.getSv_membertag;
        }
        for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
            $("#sv_mr_nick").append("<option value='" + data.sv_uc_callnameList[i] + "'>" + data.sv_uc_callnameList[i] + "</option>");
        }

        ///读取会员级别
        for (var i = 0; i < data.GetUserLevel.length; i++) {
            $("#memberlevel_id").append("<option value='" + data.GetUserLevel[i].memberlevel_id + "'>" + data.GetUserLevel[i].sv_ml_name + "</option>");
        }

        ///读取会员级别
        for (var i = 0; i < data.GetMembergroup.length; i++) {
            $("#membergroup_id").append("<option value='" + data.GetMembergroup[i].membergroup_id + "'>" + data.GetMembergroup[i].sv_mg_name + "</option>");
        }

        for (var i = 0; i < data.GetSv_membertag.length; i++) {
            $("#tag").append("<option value='" + data.GetSv_membertag[i].membertag_id + "'>" + data.GetSv_membertag[i].sv_mt_name + "</option>");
        }

    });
    Getlastdate();
    GetList2($("#mobbile").val(), $("#sv_mr_name").val(), $("#memberlevel_id").val(), $("#membergroup_id").val(), last_sendsmsdate, last_salesdate);

    $("#mobbile").keyup(function () {
        if ($("#mobbile").val().length > 2) {
            Getlastdate();
            GetList2($("#mobbile").val(), $("#sv_mr_name").val(), $("#memberlevel_id").val(), $("#membergroup_id").val(), last_sendsmsdate, last_salesdate);
        }
    });

    $("#memberlevel_id,#membergroup_id,#tag").change(function () {

        Getlastdate();
        GetList2($("#mobbile").val(), $("#memberlevel_id").val(), $("#membergroup_id").val(), $("#tag").val(), last_sendsmsdate, last_salesdate);

    });
    Getstecs();
}


function GetList2(key, memberlevel_id, membergroup_id, tag, last_sendsmsdate, last_salesdate) {
    $.get("/ajaxdata/GetUserListTop100/1", { "key": key, "memberlevel_id": memberlevel_id, "membergroup_id": membergroup_id, "tag": tag, "pageSize": 50000, "sendsmsdate": last_sendsmsdate, "salesdate": last_salesdate }, function (data) {
        var html = "";

        for (var i = 0; i < data.length; i++) {
            html += '<tr data-id="' + data[i].member_id + '">';
            html += '<td> <div class="check-box "data-id="1"><i><input type="checkbox" name="subbox" ></i></div> </td>';
            html += '<td><span>' + data[i].sv_mr_name + '</span></td>';
            if (isNullOrWhiteSpace(data[i].sv_ml_name)) {
                html += '<td><span>' + data[i].sv_ml_name + '</span></td>';
            } else {
                html += '<td><span></span></td>';
            }
            html += '<td><span>' + data[i].sv_mr_mobile + '</span></td>';
            html += '</tr>';
        }
        //$("#usercoutn").html(data.length);
        $("#userlist").html(html);
    });

    $("#guanbinimab").click(function () {

        layer.close(index);
    });



}

function Getstecs() {
    $('.stecs i').click(function () {
        $(this).parent().toggleClass('on').siblings().removeClass('on');
        Getlastdate();
        GetList2($("#mobbile").val(), $("#memberlevel_id").val(), $("#membergroup_id").val(), $("#tag").val(), last_sendsmsdate, last_salesdate)
    });

}
//过去时间
function Getlastdate() {
    last_sendsmsdate = "";
    last_salesdate = "";
    $('.lastdate').each(function () {
        if ($(this).hasClass('on')) {
            if ($(this).data("id") == "sv_last_sendsmsdate") {
                last_sendsmsdate = $("#" + $(this).data("id")).val();
            } else if ($(this).data("id") == "sv_last_salesdate") {
                last_salesdate = $("#" + $(this).data("id")).val();
            }
        } else {

        }
    });
}
///改变天数
function UpdateDaysEvent(strid) {
    if ($("." + strid).hasClass('on')) {
        Getlastdate();
        GetList2($("#mobbile").val(), $("#memberlevel_id").val(), $("#membergroup_id").val(), $("#tag").val(), last_sendsmsdate, last_salesdate);
    }
}

// 测试短信发送
$('#btnTestSendSms').click(function () {
    var txtMoblie = $('#txtMoblie').val().trim();
    var reg = /^1[3|4|5|7|8]\d{9}$/;
    if (txtMoblie == null || txtMoblie == '') {
        $('#txtMoblie').focus();
        layer.msg("请输入要测试发送的手机号码！");
    }
    else if (!reg.test(txtMoblie)) {
        $('#txtMoblie').focus();
        layer.msg("请输入正确的手机号码！");
    }
    else {
        var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
        $.postAsyncJson('/Sms/TestSendSms', { moblie: txtMoblie }, function (result) {
            if (result == true) {
                layer.msg('短信发送成功！');
                //Pgaelist();
                $('#txtMoblie').val('');
                layer.close(index);
            }
            else if (result == -1) {
                $('#txtMoblie').val('');
                layer.msg('您店铺系统短信不足，请充值后再发送！');
                layer.close(index);
            } else {
                layer.msg('短信发送失败，请稍后重试！');
                layer.close(index);
            }
        });
    }
});