
var memberlist = "";
var strtype = "";
$(function() {
    integralPage('');

    // 弹出会员选择窗口
    $("#cashxzhy").click(function() {
        Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=" + clearCache, f3, ['730px', ''], "shoyin2");
        $("#userid").val("");
    });

    //// 筛选数据
    //$("#query_like").keyup(function () {
    //    integralPage('');
    //});
    $("#query_user").keyup(function() {
        cliskgetuser();
        integralPage();
    });
    // checkbox 选择
    $('.stecs').click(function() {
        $(this).addClass("on").siblings().removeClass("on");
    });
    // 会员选择
    $('.Choice i').click(function() {
        $(this).parent().toggleClass('on').siblings().removeClass('on')
        if ($(this).parent().is(".on"))
        {
            if ($(this).data("id") != -1)
            {
                $("#Startdate").val(""); $("#Enddate").val("");
                $(".sjxuantime").hide();
                integralPage($('#member_id').val(), $(this).data("id"));
            } else
            {
                $(".sjxuantime").show();
                return false;

            }
        } else
        {
            $("#Startdate").val(""); $("#Enddate").val("");
            $(".sjxuantime").hide();
            integralPage($('#member_id').val());
        }
    });
    $("#QueryCable").click(function() {
        integralPage($('#member_id').val(), 0, $("#Startdate").val(), $("#Enddate").val());
    });
    $("#refresh").click(function() {

        $("#query_user").click();

    });
    var start = {

        elem: '#Startdate',
        format: 'YYYY/MM/DD',
        //   min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16 23:59:59', //最大日期
        istime: false,
        istoday: false,
        choose: function(datas) {

        }
    };
    var end = {
        elem: '#Enddate',
        format: 'YYYY/MM/DD',
        istime: false,
        istoday: false,
        choose: function(datas) {
            //结束日选好后，重置开始日的最大日期
        }
    };
    laydate(start);
    laydate(end);
    laydate.skin('molv');//主题皮肤
    // 清空会员积分按钮事件
    $('#btnClearIntegral').click(function() {
        clearIntegral();
    });

    $('#btnSaveIntegral').click(function() {
        var type = $(".on[data-name='type']").data("val");
        if (type == 0)
        {
            if (parseInt($('.sv_mw_availablepoint').html()) < parseInt($('#txtIntergal').val()))
            {
                layer.msg("你当前扣除的积分必须小于或等于该会员积分！");
            } else
            {
                updateIntegral(type, $('#member_id').val(), $('#txtIntergal').val());
            }
        } else
        {
            updateIntegral(type, $('#member_id').val(), $('#txtIntergal').val());
        }
    });
});
function IntegralChange(state) {
    var member_id = $('#member_id').val(); var integral = $('#txtIntergal').val();
    var type = $(".on[data-name='type']").data("val");
    if (state == 1)
    {
        $.postAsyncJson('/Integral/UpdateIntegral', { type: type, member_id: member_id, integral: integral, user_id: $("#userid").val(), rankDemotion: rankDemotion, availableIntegralSwitch: availableIntegralSwitch, isPromote: rankPromotionIsON }, function (data) {
            if (data == true)
            {
                layer.msg("操作成功！");
                $('#txtIntergal').val('');
                integralPage(member_id);
                cliskgetuser();
                layer.close();
            } else if (data == -2)
            {
                layer.msg("你没有该操作权限！");
                setTimeout(function() {
                    layer.closeAll();
                }, 600);
            } else if (data == -3)
            {
                $("#userid").val("");
                layer.msg("当前会员不支持跨店消费");
                setTimeout(function() {
                    layer.closeAll();
                }, 600);
            }
            else
            {
                layer.msg("操作失败，请刷新页面后再重试！");
            }
        });
    }
    else
    {

        layer.confirm("确认要操作该会员积分吗？", { btn: ["确认", "取消"] }, function() {
            if (!inspectCommitRepeatedlyFindIfItExists("Integral variation,Increase or decrease")) {
                $.postAsyncJson('/Integral/UpdateIntegral', { type: type, member_id: member_id, integral: integral, user_id: $("#userid").val(), rankDemotion: rankDemotion, availableIntegralSwitch: availableIntegralSwitch, isPromote: rankPromotionIsON }, function (data) {
                    inspectCommitRepeatedlyGetDeleteId("Integral variation,Increase or decrease");
                    if (data == true) {
                        layer.msg("操作成功！");
                        $('#txtIntergal').val('');
                        integralPage(member_id);
                        cliskgetuser();
                        layer.close();
                    } else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                        setTimeout(function () {
                            layer.closeAll();
                        }, 600);
                    } else if (data == -3) {
                        $("#userid").val("");
                        layer.msg("当前会员不支持跨店消费");
                        setTimeout(function () {
                            layer.closeAll();
                        }, 600);
                    }
                    else {
                        layer.msg("操作失败，请刷新页面后再重试！");
                    }
                });
            }
        });
    }


}
// 回调
function f3() {
    getMemberList("");
    $("#query_like").keyup(function() {
        $("#userid").val("");
        getMemberList($("#query_like").val());
    });
}

// 读取会员列表
function getMemberList(key) {
    $.get("/ajaxdata/GetMemberList/1", { "key": key, "pageSize": 30 }, function(data) {
        var html = "";
        for (var i = 0; i < data.length; i++)
        {
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
            if (!isNullOrWhiteSpace(data[i].sv_ml_name))
                html += '  <td><span></span></td>';
            else
                html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
            html += '<td><span>' + data[i].sv_mw_availablepoint + '</span></td>';
            html += '   <td id="' + data[i].sv_mr_status + '"><a href="javascript:void(0);" class="xianzhehuiyan" id="' + data[i].sv_mr_status + '" data-isoverdue="' + data[i].isOverdue + '">选择</a></td>';
            html += '   </tr>';
        }
        $("#usercoutn").html(data.length);
        $("#userlist").html(html);

        $("#userlist").on("click", ".xianzhehuiyan", function() {
            if ($(this).data("isoverdue"))
            {
                layer.msg("此卡已过期");
            } else
            {
                if (this.id == 1)
                {
                    layer.msg("此卡已挂失");
                } else
                {
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
        $("#userlist").on("dblclick", "tr", function() {
            //搜索会员
            if ($(this).data("isoverdue"))
            {
                layer.msg("此卡已过期");
            } else
            {
                if ($(this).find("td").eq(7).attr("id") == 1)
                {
                    layer.msg("此卡已挂失");
                } else
                {
                    $("#userid").val($(this).data("user_id"));
                    $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));
                    // $("#Cashxzhy").find("input").val($(this).data("name"));
                    cliskgetuser()
                    layer.closeAll();
                }
            }

        });
    });

    $("#guanbinimab").click(function() {
        layer.close(index);
    });

}

// 读取会员信息
function cliskgetuser() {
    $.get("/Ajaxdata/QueryUserModel?id=" + $("#query_user").val() + "&userid=" + $("#userid").val(), function(data) {
        if (data != null)
        {
            if (data.type == 1)
            {
                Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=42", f4, ['730px', ''], "shoyin2");
                $("#userid").val("");
                memberlist = data.list;
            }
            else
            {
                if (data.isOverdue)
                {
                    layer.msg("此卡已过期");
                } else
                {
                    if (data.sv_mr_status == 1)
                    {
                        layer.msg("此卡已挂失");
                        return false;
                    } else
                    {
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
                            }
                            else if (key == "sv_mr_headimg")
                            {
                                $("#sv_mr_headimg").attr("src", data[key]);
                            }
                            else
                            {
                                if (key == "member_id")
                                {
                                    $("#" + key).val(data[key]);
                                    integralPage(data[key]);
                                }
                                else
                                {

                                    if (key == "user_id")
                                    {
                                        $("#" + key).val(data[key]);
                                        $("#userid").val(data[key])
                                    } else
                                    { $("." + key).text(data[key]); }
                                }
                            }
                        }
                    }
                }


            }
        }
    });

}

// 加载分页插件
function integralPage(member_id, days, Startdate, Enddate) {
    // 初始化分页内容
    $.get("/Integral/Total/", { seach: $("#query_user").val(), member_id: member_id, days: days, Startdate: Startdate, Enddate: Enddate }, function(data) {
        var i = Math.ceil(data / 10);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function(e, first) {
                getList(e.curr, member_id, days, Startdate, Enddate);
            }
        });
    });
}

// 分页获取数据
function getList(pageIndex, member_id, days, Startdate, Enddate) {
    var html = '';
    $.getJSON("/Integral/PageList/", { pageIndex: pageIndex, seach: $("#query_user").val(), member_id: member_id, user_id: $("#userid").val(), days: days, Startdate: Startdate, Enddate: Enddate }, function(data) {
        if (data != null)
        {
            for (var i = 0; i < data.length; i++)
            {
                html += '<tr>';
                html += '<td>' + data[i].sv_mr_cardno + '</td>';
                html += '<td><span><img src="' + data[i].sv_mr_headimg + '"></span><span>' + data[i].sv_mr_name + '</span></td>';
                if (!isNullOrWhiteSpace(data[i].sv_ml_name))
                    html += '<td></td>';
                else
                    html += '<td>' + data[i].sv_ml_name + '</td>';
                if (data[i].sv_mpr_type == 1)
                {
                    html += '<td>' + "扣除积分" + '</td>';
                    html += '<td>-' + data[i].sv_mpr_pointdif + '</td>';
                } else if (data[i].sv_mpr_type == 0)
                {
                    html += '<td>' + "增加积分" + '</td>';
                    html += '<td>+' + data[i].sv_mpr_pointdif + '</td>';
                } else
                {
                    html += '<td>' + data[i].sv_mpr_type + '</td>';
                }
                html += '<td><span>' + data[i].consumeusername + '</span></td>';
                html += '<td><span>' + data[i].userName + '</span></td> ';
                if (data[i].sv_operatorname != null)
                {
                    html += '<td><span>' + data[i].sv_operatorname + '</span></td> ';
                } else
                {
                    html += '<td><span></span></td> ';
                }
                if (data[i].sv_mpr_date.indexOf('1-01-01') > 0) { html += '<td></td>'; } else {
                    html += '<td>' +
                        //new Date(data[i].sv_mpr_date).Format("yyyy-MM-dd hh:mm:ss")
                    data[i].sv_mpr_date.replace(/([\d\-]+)T(\d+:\d+)\:.*/, "$1 $2") +
                        '</td>'
                };
                if (data[i].sv_mpr_reason == null || data[i].sv_mpr_reason == '')
                {
                    html += '<td></td>';
                }
                else
                {
                    html += '<td>' + data[i].sv_mpr_reason + '</td>';
                }
                html += '</tr>';
            }
        }

        else
        {
            html = '';
        }
        $("#listhtml").html(html);
    });
}

// 根据会员id扣除或增加会员积分，清空会员积分
function updateIntegral(type, member_id, integral) {
    var partten = /^\d+$/;
    if (member_id <= 0)
    {
        layer.msg("请选择会员后再进行积分操作！");
    }
    else if (!isNullOrWhiteSpace($('#txtIntergal').val().trim()))
    {
        layer.msg("请输入变动积分！");
        $('#txtIntergal').focus();
    }
    else if (!partten.test(integral))
    {
        layer.msg("积分只能输入数字！");
        $('#txtIntergal').focus();
    }
    else
    {
        verifyenable($("#member_id").val(), 1);
    }
}

function clearIntegral() {
    if ($('#member_id').val() <= 0)
    {
        layer.msg("请选择会员后再进行积分操作！");
    }
    else if ($('.sv_mw_availablepoint').html() == 0 || $('.sv_mw_availablepoint').html() == null)
    {
        layer.msg("该会员当前积分为0，不需要再做清空操作！");
    }
    else
    {
        verifyenable($("#member_id").val(), 2);
    }
}
function IntegralReset(state) {
    if (state == 1)
    {
        $.postAsyncJson('/Integral/UpdateIntegral', { type: 2, member_id: $('#member_id').val(), user_id: $("#userid").val(), rankDemotion: rankDemotion, availableIntegralSwitch: availableIntegralSwitch, isPromote: rankPromotionIsON }, function (data) {
            if (data == true)
            {
                layer.msg("操作成功！");
                integralPage($('#member_id').val());
                cliskgetuser();
                layer.close();
            } else if (data == -2)
            {
                layer.msg("你没有该操作权限！");
                setTimeout(function() {
                    layer.closeAll();
                }, 600);
            } else if (data == -3)
            {
                layer.msg("当前会员不支持跨店消费");
                setTimeout(function() {
                    layer.closeAll();
                }, 600);
            }
            else
            {
                layer.msg("操作失败，请刷新页面后再重试！");
            }
        });
    }
    else
    {
        layer.confirm("确认要清空该会员积分吗？", { btn: ["确认", "取消"] }, function () {
            if (!inspectCommitRepeatedlyFindIfItExists("Integral variation,empty")) {
            $.postAsyncJson('/Integral/UpdateIntegral', { type: 2, member_id: $('#member_id').val(), user_id: $("#userid").val(), rankDemotion: rankDemotion, availableIntegralSwitch: availableIntegralSwitch, isPromote: rankPromotionIsON }, function (data) {
                inspectCommitRepeatedlyGetDeleteId("Integral variation,empty");
                if (data == true)
                {
                    layer.msg("操作成功！");
                    integralPage($('#member_id').val());
                    cliskgetuser();
                    layer.close();
                } else if (data == -2)
                {
                    layer.msg("你没有该操作权限！");
                    setTimeout(function() {
                        layer.closeAll();
                    }, 600);
                } else if (data == -3)
                {
                    layer.msg("当前会员不支持跨店消费");
                    setTimeout(function() {
                        layer.closeAll();
                    }, 600);
                }
                else
                {
                    layer.msg("操作失败，请刷新页面后再重试！");
                }
            });
        }
        });
    }
}
function f4() {
    Getmemberlist(memberlist);
    $("#query_like").keyup(function() {
        getMemberList($("#query_like").val());
    });
}
function Getmemberlist(data) {
    var index2 = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
    var html = "";
    for (var i = 0; i < data.length; i++)
    {
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
        if (!isNullOrWhiteSpace(data[i].sv_ml_name))
            html += '  <td><span></span></td>';
        else
            html += '  <td><span>' + data[i].sv_ml_name + '</span></td>';
        html += '<td><span>' + data[i].sv_mw_availablepoint + '</span></td>';
        html += '   <td id="' + data[i].sv_mr_status + '"><a href="javascript:void(0);" class="xianzhehuiyan" id="' + data[i].sv_mr_status + '" data-isoverdue="' + data[i].isOverdue + '">选择</a></td>';
        html += '   </tr>';
    }
    $("#usercoutn").html(data.length);
    $("#userlist").html(html);
    layer.close(index2);
    $("#userlist").on("click", ".xianzhehuiyan", function() {
        if ($(this).data("isoverdue"))
        {
            layer.msg("此卡已过期");
        } else
        {
            if (this.id == 1)
            {
                layer.msg("此卡已挂失");
            } else
            {
                $("#userid").val($(this).parent().parent().data("user_id"));
                //搜索会员
                $("#query_user").val($(this).parent().parent().data("sv_mr_cardno")).data("id", $(this).parent().parent().data("id"));

                cliskgetuser();
                layer.closeAll();
            }
        }

    });

    ///
    $("#userlist").on("dblclick", "tr", function() {
        //搜索会员
        if ($(this).data("isoverdue"))
        {
            layer.msg("此卡已过期");
        } else
        {
            if ($(this).find("td").eq(7).attr("id") == 1)
            {
                layer.msg("此卡已挂失");
            } else
            {
                $("#userid").val($(this).data("user_id"));
                $("#query_user").val($(this).data("sv_mr_cardno")).data("id", $(this).data("id")).data("name", $(this).data("name"));

                cliskgetuser()
                layer.closeAll();
            }
        }

    });


    $("#guanbinimab").click(function() {
        layer.close(index);
    });

}


function verifyenable(id, type) {
    strtype = type;
    $.ajax({
        url: "/System/VerifyEnable?name=" + id + "&userid=" + $("#userid").val(),
        dataType: "json",
        async: false,
        success: function(data) {
            if (data == 1)
            {
                if (type == 1) { IntegralChange(0); }
                else {
                    IntegralReset(0);
                }
                return false;
            }
            else if (data == 2)
            {
                layer.msg("会员信息错误！");
                return false;
            }
            else if (data == 3)
            {
                Deke.DeKe_dialog.show_Url2("请输入会员密码", "/html/cash/huiyuanpwd.html?v=215", baochuuserpwd, ['', '230px']);
            }
        }
    });
}

function baochuuserpwd() {
    $("#sv_mr_pwd").focus();
    $("#baochuuser").click(function() {
        $.post("/System/VerifyEnable", { name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val() }, function(data) {
            if (data == 1)
            {
                if (strtype == 1) { IntegralChange(1); }
                else {
                    IntegralReset(1);
                }
                layer.close(index);
                strtype = "";
                return false;
            }
            else if (data == 4)
            {
                layer.msg("会员密码输入有误");
                $("#sv_mr_pwd").val("");
            }
        });
    });
    $("#sv_mr_pwd").keypress(function(event) {
        if (event.which == 13)
        {
            $.post("/System/VerifyEnable", { name: $("#member_id").val(), valu: $("#sv_mr_pwd").val(), userid: $("#userid").val() }, function(data) {
                if (data == 1)
                {
                    if (strtype == 1) { IntegralChange(1); }
                    else {
                        IntegralReset(1);
                    };
                    strtype = "";
                    layer.close(index);
                    return false;
                }
                else if (data == 4)
                {
                    layer.msg("会员密码输入有误");
                }
            });
        }
    });

}