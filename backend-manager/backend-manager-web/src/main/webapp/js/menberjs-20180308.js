var GetUserdata = null;
var strPath = "";
var Preferential_TopUpGiving_ConfigList = "";//充值赠送信息
var configleveldata = [];//等级配置信息
var memberlevel_id = "";//等级
//弹出页面变量处理
getGlobalValue();
GetOperaterList();
$('#btn_add_member').click(function () {
    Deke.DeKe_dialog.show_Url2('新增会员', '/member/_PartialMemberOperate?buttonCode=btn_add_member_code', f, ['850px', '580px']);
    
});


var start = {
    elem: '#member_reg_start_date',
    format: 'YYYY/MM/DD hh:mm:ss',
    min: laydate.now(-365), //设定最小日期为当前日期
    max: laydate.now(), //最大日期
    istime: true,
    istoday: false,
    choose: function(datas) {
        end.min = datas; //开始日选好后，重置结束日的最小日期
        end.start = datas //将结束日的初始值设定为开始日
    }
};
var end = {
    elem: '#member_reg_end_date',
    format: 'YYYY/MM/DD 23:59:59',
    min: laydate.now(),
    max: laydate.now(),
    istime: true,
    istoday: false,
    choose: function(datas) {
        start.max = datas; //结束日选好后，重置开始日的最大日期
        start.min = minusSelectDate(datas, 365);
    }
};
laydate(start);
laydate(end);

function f() {
    if (moduleConfigList) {
        PreferentialTopUpGivingConfigList("Preferential", "TopUpGiving");
    }
    $('#btnCancel').click(function () {
        $('.addCustomFieldHtml ').css('display', 'none');
        $('.add-input ').html('');
    });

    $('#showCommonItems').css('display', 'block');
    $('#showInput').css('display', 'block');
    $('#btnaddInput').click(function () {
        var taotal = 10;
        $.getJson('/Ajaxdata/GetCustomFieldTotal', null, function (result) {
            taotal = taotal - result;
        });
        var inputHtml = '<input type="text" value="" name="custom" placeholder="字段名称" /></div>';
        var countlength = parseInt($(".add-input input").length);
        if (countlength < taotal) {
            $('.add-input').append(inputHtml);
        }
        else {
            layer.msg("自定义字段最多只能添加10个！");
        }
    });
    $('#showInput').click(function () {
        $('.addCustomFieldHtml').attr("style", "display:block;");//显示div
        $('#ziduantype').text("自定义字段");
    });
    $('#tixinDateTime').click(function () {
        $('.addCustomFieldHtml').attr("style", "display:block;");//显示div
        $('#ziduantype').text("自定义日期");
    });
    // 添加自定义字段
    $('#btnAddCustom').click(function () {
        var memberCustom = $("#customFieldHtml input");
        var custom = $("input[name=custom]");
        var customList = '';
        var customFieldHtml = '';
        var list = new Array();
        var isTextNull = false;
        $.each(custom, function (i, n) {
            if (!isNullOrEmpty(n.value)) {
                isTextNull = false;
            }
            else if (n.value.length > 10) {
                isTextNull = false;
            }
            else {
                isTextNull = true;
            }
            var sv_is_remind_time = "false";
            if ($('#ziduantype')  ) {
                if ($('#ziduantype').text() == "自定义日期") {
                        sv_is_remind_time = "true";
                    }
            }
            var model = {
                sv_field_name: n.value,
                "sv_is_remind_time": sv_is_remind_time
            };
            list.push(model);
        });
        if (isTextNull == true) {
            $('#customFieldHtml').append(customFieldHtml);
            $("input[name=custom]").val('');
            $.ajax({
                url: '/Ajaxdata/AddMemberCustomField',
                data: JSON.stringify(list),
                type: "POST",
                contentType: "application/json",
                success: function (result) {
                    if (result != false) {
                        for (var i = 0; i < result.length; i++) {
                            customFieldHtml += ' <li style="width:50%; float:left">';
                            if (result[i].sv_field_name.length >= 4) {
                                customFieldHtml += '<span>' + result[i].sv_field_name + '：&thinsp;&thinsp;</span>';
                            } else {
                                customFieldHtml += '<span>' + result[i].sv_field_name + strPlaceholder(4 - result[i].sv_field_name.length) + '：&thinsp;&thinsp;</span>';
                            }
                            if (result[i].sv_is_remind_time) {
                                var values = "";
                                if (result[i].sv_field_values) {
                                    values = result[i].sv_field_values;
                                }
                                customFieldHtml += '<input class="laydate-icon" value="' + values + '" id="sv_mr_remark" onclick="laydate({istime: true, format: \'YYYY-MM-DD\'})" type="text" ziduantype="' + $('ziduantype').text() + '" data-id="' + result[i].sv_field_id + '" name="memberCustom" maxlength="100" style="height:35px" />';
                                if (parseInt(result[i].sv_field_id || 0) > parseInt($("#shijiantixinid").val() || 0)) {
                                    $("#shijiantixinid").val(result[i].sv_field_id);
                                }
                            } else {
                                customFieldHtml += '<input type="text" ziduantype="' + $('ziduantype').text() + '" id="sv_mr_remark" data-id="' + result[i].sv_field_id + '" name="memberCustom" maxlength="100" placeholder="' + result[i].sv_field_name + '" style="height:35px" />';
                            }
                            customFieldHtml += ' </li>';
                        }
                    }
                    else if (result == -1) {
                        layer.msg("自定义字段最多只能添加十个！");
                    }
                    else {
                        alert('添加失败！');
                    }
                    $('.addCustomFieldHtml').css('display', 'none');
                    $('#customFieldHtml').append(customFieldHtml);
                }
            });
        }
        else {
            layer.msg("自定义字段名称不能为空并且字段名称小于10个字符！");
        }
    });

    $('.lisbk a').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $("#sv_mrr_payment").val($(this).text());
    });
    $.get("/Ajaxdata/GetUserconfig", function (data) {
        //  alert(data);
        $("#sv_mr_name,#memberlevel_id,#membergroup_id").empty();
        for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
            $("#sv_mr_nick").append("<option value='" + data.sv_uc_callnameList[i] + "'>" + data.sv_uc_callnameList[i] + "</option>");
            //sv_mr_name
        }

        if (!data.GetUserLevel) {

            data.GetUserLevel = data.getUserLevel;
        }
        if (!data.GetMembergroup) {

            data.GetMembergroup = data.getMembergroup;
        }
        ///读取会员级别
        for (var i = 0; i < data.GetUserLevel.length; i++) {
            $("#memberlevel_id").append("<option value='" + data.GetUserLevel[i].memberlevel_id + "'>" + data.GetUserLevel[i].sv_ml_name + "</option>");
        }


        ///读取会员分组
        for (var i = 0; i < data.GetMembergroup.length; i++) {
            $("#membergroup_id").append("<option value='" + data.GetMembergroup[i].membergroup_id + "'>" + data.GetMembergroup[i].sv_mg_name + "</option>");
        }
    });
    if (Is_open_commission) {

        $("#sv_mrr_operator").click(function () {
            getEmployessinfohtml();
        });
    } else {
        $(".CommissionOperator").hide();
    }
    ///推荐人选择
    $("#sv_recommended_peoplename").click(function () {
        Deke.DeKe_dialog.show_Url3("选择会员", "/html/cash/xianzhehuiy.html?v=" + clearCache, recommendedpeople, ['730px', ''], "shoyin2");
    });
    $("#sv_mr_birthday").val(new Date().Format("yyyy-MM-dd"));

    laydate.skin('molv');//主题皮肤

    laydate({
        elem: '#sv_mr_birthday',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true
        //, //显示节日
        //choose: function (datas) { //选择日期完毕的回调
        //    alert('得到：' + datas);
        //}
    });

    laydate({
        elem: '#sv_mr_deadline',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true,
        min: laydate.now() //设定最小日期为当前日期
        //, //显示节日
        //choose: function (datas) { //选择日期完毕的回调
        //    alert('得到：' + datas);
        //}
    });
    getMemberCustomInfo("");

    // 删除自定义字段
    //$('.delete').click(function () {
    //    var sv_field_id = $(this).data('id');
    //    alert(sv_field_id);
    //});
    $(document).on('.delete', 'click', function () {
        var sv_field_id = $(this).data('id');
    });

    // 设置常用项
    $('#showCommonItems').click(function () {
        Deke.DeKe_dialog.show_Url2('设置常用项', '/Html/Member/memberCustom.html?v=' + clearCache + 100, commonItems, ['470px', '450px']);
    });
    //输入开卡金额
    $("#sv_mrr_money").keyup(function () {

        if (isNullOrWhiteSpace($("#sv_mrr_money").val())
            && parseFloat($("#sv_mrr_money").val()) > 0) {
            if (memberlevel_id != $("#memberlevel_id").val()) {
                GetConfigdataBylevel($("#memberlevel_id").val());
                memberlevel_id = $("#memberlevel_id").val();
            }
            CalculateGiving();
        }
    });
    ///更改会员等级
    $("#memberlevel_id").change(function () {
        if (memberlevel_id != $("#memberlevel_id").val()) {
            GetConfigdataBylevel($("#memberlevel_id").val());
            CalculateGiving();
            memberlevel_id = $("#memberlevel_id").val();
        }
    });
}

// 常用项回调
function commonItems() {
    $(document).on('click', '.commonItems li', function () {
        if ($(this).children().children('span').length == 0) {
            $(this).children("a").append(("<span onclick='DeleteCustom(" + $(this).data('id') + ")' data-id='" + $(this).data('id') + "' class='icon-remove' style='float:right'></span>"));
        }
        $('.notCommonItems ul').append($(this));
        setTimeout(function () {
            $(this).remove();
        }, 200);
    });
    $(document).on('click', '.notCommonItems li', function () {
        $(this).children("a").children("span").remove();
        $('.commonItems ul').append($(this));
        setTimeout(function () {
            $(this).remove();
        }, 200);
    });

    $('#saveCommonItems').click(function () {
        var commonItems = $('#commonItemsHtml li');
        var ids = '';
        if (commonItems.length == 1) {
            ids = $('#commonItemsHtml li').data('id');
        }
        else if (commonItems.length > 1) {
            $('#commonItemsHtml li').each(function () {
                ids += $(this).data('id') + ',';
            });
            ids = ids.substring(0, ids.length - 1);
        }
        $.postAsyncJson('/Ajaxdata/SaveCommonItems', { ids: ids }, function (result) {
            if (result == true) {
                getMemberCustomInfo('');
                layer.msg("保存设置成功！");
                layer.close(index);
            }
            else if (result == -1) {
                layer.msg("您当前还未添加自定义字段！");
            }
            else {
                layer.msg("保存设置失败，请稍后重试！");
            }
        });
    });

    getCommonItems();

    $('#recoveryCommonItems').click(function () {
        getCommonItems();
    });
}

function getCommonItems() {
    setTimeout(function () {
        var commonItemsHtml = '';     // 显示项
        var notCommonItemsHtml = '';  // 隐藏项
        $.getAsyncJson('/Ajaxdata/GetMemberCustomList', null, function (result) {
            if (result != null && result != '') {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].sv_enabled == true) { // 显示项
                        commonItemsHtml += ' <li class="active" id="' + result[i].sv_field_id + '"   data-id="' + result[i].sv_field_id + '"><a href="javascript:void(0);">' + result[i].sv_field_name + '</a> </li>';
                    }
                    else { // 隐藏项
                        notCommonItemsHtml += '<li data-id="' + result[i].sv_field_id + '"><a href="javascript:void(0);">' + result[i].sv_field_name + '<span onclick="DeleteCustom("' + result[i].sv_field_id + '")"  data-id="' + result[i].sv_field_id + '" class="icon-remove" style="float:right"></span></a> </li>';
                    }
                }
            }
            $('#commonItemsHtml').html(commonItemsHtml);
            $('#notCommonItemsHtml').html(notCommonItemsHtml);
        });
        
    }, 100);
}


// 读取自定义字段信息（不带会员Id，则不会读取自定义字段的值）
function getMemberCustomInfo(memberId) {
    setTimeout(function () {
        $.getAsyncJson('/Ajaxdata/GetMemberCustomInfo', { memberId: memberId }, function (result) {
            var customFieldHtml = '';
            if (result != null && result != '') {
                for (var i = 0; i < result.length; i++) {
                    var sv_field_value = result[i].sv_field_value != null && result[i].sv_field_value != '' ? result[i].sv_field_value : '';
                    customFieldHtml += ' <li style="width:50%; float:left">';
                    if (result[i].sv_field_name.length >= 4)
                    { customFieldHtml += '<span style="display:inline-block;width: 80px;">' + result[i].sv_field_name + '</span>'; }
                    else {
                        customFieldHtml += '<span style="display:inline-block;width: 80px;">' + result[i].sv_field_name + strPlaceholder(4 - result[i].sv_field_name.length) + '</span>';
                    }
                    if (result[i].sv_is_remind_time) {
                        var values = "";
                        if (result[i].sv_field_value) {
                            values = result[i].sv_field_value;
                        }
                        customFieldHtml += '<input note="' + result[i].sv_remark + '" class="laydate-icon"  data-relationid="' + result[i].sv_relation_id + '" readonly="" value="' + values + '" onclick="laydate({istime: true, format: \'YYYY-MM-DD\'})" type="text" ziduantype="' + $('ziduantype').text() + '" id="' + result[i].sv_field_id + '" data-id="' + result[i].sv_field_id + '" name="memberCustom" maxlength="100" placeholder="" style="height:35px;width:156px;" />';
                        customFieldHtml += '<button class="btn editmsm" type="button" style="">编辑短信</button>';
                        if (parseInt(result[i].sv_field_id || 0) > parseInt($("#shijiantixinid").val() || 0)) {
                            $("#shijiantixinid").val(result[i].sv_field_id);
                        }
                    } else {
                        customFieldHtml += '<input type="text" value="' + sv_field_value + '" data-relationid="' + result[i].sv_relation_id + '" ziduantype="' + $('ziduantype').text() + '" id="sv_mr_remark" data-id="' + result[i].sv_field_id + '" name="memberCustom" maxlength="100" placeholder="' + result[i].sv_field_name + '" style="height:35px" />';
                    }
                    customFieldHtml += ' </li>';
                }
            }
            $('#customFieldHtml').html(customFieldHtml);
        });
    }, 100);
}

//编辑纪恋日短信
$(document).unbind("click", ".editmsm").on("click", ".editmsm", function () {
    var id = $(this).prev("input").attr("id");
    var content = $(this).prev("input").attr("note");
    Deke.DeKe_dialog.show_Url2('消息内容<input type="hidden" id="gduanxinneirong" value="' + content + '" />', '/html/Member/editmsm.html?v=' + clearCache, null, ['400px', '']);
    $("#ziduanid").val(id);
});

function f2() {
    $(".modderlis").height(465);
    $.get("/Ajaxdata/GetUserconfig", function (data) {
        //  alert(data);
        $("#sv_mr_name,#memberlevel_id,#membergroup_id").empty();
        for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
            $("#sv_mr_nick").append("<option value='" + data.sv_uc_callnameList[i] + "'>" + data.sv_uc_callnameList[i] + "</option>");
            //sv_mr_name
        }
        if (!data.GetUserLevel) {

            data.GetUserLevel = data.getUserLevel;
        }
        if (!data.GetMembergroup) {

            data.GetMembergroup = data.getMembergroup;
        }
        ///读取会员级别
        for (var i = 0; i < data.GetUserLevel.length; i++) {
            $("#memberlevel_id").append("<option value='" + data.GetUserLevel[i].memberlevel_id + "'>" + data.GetUserLevel[i].sv_ml_name + "</option>");
        }
        ///读取会员级别
        for (var i = 0; i < data.GetMembergroup.length; i++) {
            $("#membergroup_id").append("<option value='" + data.GetMembergroup[i].membergroup_id + "'>" + data.GetMembergroup[i].sv_mg_name + "</option>");
        }
    });
    laydate.skin('molv');//主题皮肤
    laydate({
        elem: '#sv_mr_birthday',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true
        //, //显示节日
        //choose: function (datas) { //选择日期完毕的回调
        //    alert('得到：' + datas);
        //}
    });
    laydate({
        elem: '#sv_mr_deadline',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true,
        min: laydate.now() //设定最小日期为当前日期
        //, //显示节日
        //choose: function (datas) { //选择日期完毕的回调
        //    alert('得到：' + datas);
        //}
    });
    $(".sv_mrr_money").text("  剩余金额 :");
    $("#sv_mrr_money").attr("readonly", true);
    $("#sv_mr_pwd").attr("readonly", true);
    $("#sv_recommended_peoplename").attr("readonly", true);
    $("#PresenTwayOperator").attr("style", "display:none");
    $(".present_payment_operator").hide();
    $.get("/Ajaxdata/GetUserModel?id=" + $('input[name="subbox"]:checked').val(), function (data) {
        $("#sv_mr_cardno").attr("disabled", "disabled");
        for (var key in data) {
            laydate.skin('molv');//主题皮肤
            if (key == "sv_mr_cardno") {
                $("." + key).val(data[key]);
            }
            if (key == "sv_mr_birthday" || key == "sv_mr_deadline") {
                var t = "";
                if (isNullOrWhiteSpace(data[key])) {
                    t = data[key].substr(0, 4);
                    if (t == 1 || t == 9999) {
                        t = "";
                    } else {
                        t = new Date(data[key]).Format("yyyy-MM-dd");
                    }
                }
                $("#" + key).val(t);

            } else if (key == "sv_mr_headimg") {
                if (data[key]) {
                    $("#upload").attr("src", _g_res_images_url + data[key]);
                }
                $("#" + key).val(data[key]);
            } else {
                if (key != "issupplement_id") {
                    $("#" + key).val(data[key]);
                    if (key == "sv_mw_availableamount") {
                        $("#sv_mrr_money").val(data[key]);
                    }
                }
            }

        }


        GetUserdata = data;

    });
    $('.addCustomFieldHtml').css('display', 'none');
    getMemberCustomInfo($('input[name="subbox"]:checked').val());
}
function f4() {
    $(".modderlis").height(465);
    $.get("/Ajaxdata/GetUserconfig", function (data) {
        $("#sv_mr_name,#memberlevel_id,#membergroup_id").empty();
        for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
            $("#sv_mr_nick").append("<option value='" + data.sv_uc_callnameList[i] + "'>" + data.sv_uc_callnameList[i] + "</option>");
            //sv_mr_name
        }
        if (!data.GetUserLevel) {

            data.GetUserLevel = data.getUserLevel;
        }
        if (!data.GetMembergroup) {

            data.GetMembergroup = data.getMembergroup;
        }
        ///读取会员级别
        for (var i = 0; i < data.GetUserLevel.length; i++) {
            $("#memberlevel_id").append("<option value='" + data.GetUserLevel[i].memberlevel_id + "'>" + data.GetUserLevel[i].sv_ml_name + "</option>");
        }
        ///读取会员级别
        for (var i = 0; i < data.GetMembergroup.length; i++) {
            $("#membergroup_id").append("<option value='" + data.GetMembergroup[i].membergroup_id + "'>" + data.GetMembergroup[i].sv_mg_name + "</option>");
        }
    });
    laydate.skin('molv');//主题皮肤
    laydate({
        elem: '#sv_mr_birthday',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true
    });
    $(".present_payment_operator").hide();
    $(".sv_mrr_money").text("剩余金额 :");
    $("#sv_mrr_money").attr("readonly", true);
    $.get("/Ajaxdata/GetUserModel?id=" + $('input[name="subbox"]:checked').val(), function (data) {
        for (var key in data) {
            laydate.skin('molv');//主题皮肤
            if (key == "sv_mr_birthday" || key == "sv_mr_deadline") {
                var t = "";
                if (isNullOrWhiteSpace(data[key])) {
                    t = data[key].substr(0, 4);
                    if (t == 1 || t == 9999) {
                        t = "";
                    } else {
                        t = new Date(data[key]).Format("yyyy-MM-dd");
                    }
                }
                $("#" + key).val(t);

            } else if (key == "sv_mr_headimg") {
                if (data[key]) {
                    $("#upload").attr("src", _g_res_images_url + data[key]);
                }

                $("#" + key).val(data[key]);


            } else {
                if (key != "issupplement_id")
                    $("#" + key).val(data[key]);

            }

        }


        GetUserdata = data;

    });

    getMemberCustomInfo($('input[name="subbox"]:checked').val());
}

// 数据分页和筛选方法
function getMemberListByFilter(memberlevel_id, membergroup_id, sv_mr_deadline) {
    var data = {
        PageIndex: 1,
        PageSize: 10,
        FiltersList: [{
            FilterName: "memberlevel_id",
            FilterOperater: "=",
            FilterValue: memberlevel_id,
            QueryType: 0
        },
        {
            FilterName: "membergroup_id",
            FilterOperater: "=",
            FilterValue: membergroup_id,
            QueryType: 0
        },
        {
            FilterName: "sv_mr_deadline",
            FilterOperater: "<=",
            FilterValue: sv_mr_deadline,
            QueryType: 0
        }]
    };
    $.post('/Ajaxdata/GetMemberListByFilter', null, function (result) {
        console.log(result);
    });
}

$(document).ready(function () {
    // getMemberListByFilter(46, 3827, '2017-03-28 23:59:59');
    $('#birthday').click(function () {
        queryClik(0, 0, 0, "", "", "day");
    });
    $('#memberBirthdayCount').click(function () {

        location.hash = '';
        queryClik(0, 0, 0, "", "", "month");
    });

    $('#memberCountA').click(function () {
        queryClik(0, 0, 0, "", "", "");
    });
    $("#setpassword").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            Deke.DeKe_dialog.show_Url2('修改会员密码', '/html/Member/UpdatePassword.html?v=' + clearCache, UpdatePassword, ['400px', '']);
        } else {
            layer.msg("请先择您要修改密码的会员，不能选择多个！");
        }
    });
    //重置
    $("#ResetPassword").click(function () {
        var mydata = { "name": "sv_mr_pwd", "value": "" };
        if ($('input[name="subbox"]:checked').length == 1) {
            $.ajax({
                url: "/Ajaxdata/updateUser_Noe?id=" + $('input[name="subbox"]:checked').val() + "&userid=" + $("#userid").val(),
                data: JSON.stringify(mydata),
                type: "POST",
                contentType: "application/json",
                success: function (result) {
                    loggin.chklogn(result);
                    if (result == true) {
                        layer.close();
                        layer.msg("操作成功！");
                    }
                    else if (result == -2) {
                        layer.close();
                        layer.msg("你没有该操作权限！");
                    } else if (result == -3) {
                        layer.msg("当前会员不支持跨店操作");
                        setTimeout(function () {
                            layer.closeAll();
                        }, 800);
                    }
                    else {
                        layer.close();
                        layer.msg("操作失败，请刷新重试");
                    }
                }
            });
        } else {
            layer.msg("操作失败，请选择要重置密码的会员");
        }
    });
    $("#the_loss").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            var the_loss_sName = $("#the_loss_s").text();
            var the_lossvalue = 1;
            if (the_loss_sName != "挂失") {
                the_lossvalue = 0;
            }
            layer.confirm("您确认要" + the_loss_sName + "该会员吗？", { btn: ["确认" + the_loss_sName, "关闭"] }, function () {
                var mydata = { "name": "sv_mr_status", "value": the_lossvalue };
                $.ajax({
                    url: "/Ajaxdata/updateUser_Noe?id=" + $('input[name="subbox"]:checked').val() + "&userid=" + $("#userid").val(),
                    data: JSON.stringify(mydata),
                    type: "POST",
                    contentType: "application/json",
                    success: function (result) {
                        loggin.chklogn(result);
                        if (result == true) {
                            layer.close();
                            layer.msg("操作成功！");
                            $("#the_loss_s").text("挂失");
                            queryClik(0, 0, 0);
                        }
                        else if (result == -2) {
                            layer.close();
                            layer.msg("你没有该操作权限！");
                            $("#the_loss_s").text(the_loss_sName);
                        } else if (result == -3) {
                            $("#the_loss_s").text(the_loss_sName);
                            layer.msg("当前会员不支持跨店操作");
                            setTimeout(function () {
                                layer.closeAll();
                            }, 800);
                        }
                        else {
                            layer.close();
                            layer.msg("操作失败，请刷新重试");
                            $("#the_loss_s").text(the_loss_sName);
                        }
                    }
                });

            });



        } else {

            layer.msg("请先择您要挂失的会员，不能选择多个！");
        }

    });

    $("#delete").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            if ($('input[name="subbox"]:checked').attr("id") != 1) {
                layer.confirm("您确认要删除该会员吗？", { btn: ["确认删除", "关闭"] }, function () {


                    $.post("/ajaxdata/DeleteUserl?id=" + $('input[name="subbox"]:checked').val() + "&userid=" + $("#userid").val(), function (data) {
                        loggin.chklogn(data);
                        if (data == true) {
                            layer.msg("会员删除成功");

                            queryClik(0, 0, 0);

                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                        } else if (data == -3) {
                            layer.msg("当前会员不支持跨店操作！");
                        }
                        else {

                            layer.msg("会员删除失败");
                        }
                    });
                });
            } else { false; }
        } else {

            layer.msg("请先择您要删除的会员，不能选择多个！");
        }

    });
    $("#Export").click(function () {
        var loadingIndex = commonOpenLoading();
        var dengji = 0, fenzhu = 0, liusi = 0, biaoqian = "";
        $("#yixianzhe li").each(function () {
            switch ($(this).data("name")) {

                case "dengji":
                    dengji = $(this).data("id");
                    break;
                case "fenzhu":
                    fenzhu = $(this).data("id");
                    break;
                case "liusi":
                    liusi = $(this).data("id");
                    break;
                case "biaoqian":
                    biaoqian += $(this).data("id") + ",";
                    break;
            }
        });
        $.getJSON("/member/ExportData", { "dengji": dengji, "fenzhu": fenzhu, "liusi": liusi, "key": $("#indexquery_like").val(), "biaoqian": biaoqian }, function (data) {
            commonCloseLoading(loadingIndex);
            if (data == -2) {
                layer.msg("你没有该操作权限！");
            } else if (data != 0) {
                if (((typeof Cef) !== 'undefined')) {
                    Cef.Download(data);
                } else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
                    try {
                        //Android客户端打印
                        cordova.plugins.barcodeScanner.dwonloadexcel(
                            function (result) {
                            },
                            function (error) {
                                alert("数据导出失败: " + error);
                            },
                            {
                                myPrintImg: data
                            }
                        );
                    } catch (e) {
                        alert("数据导出失败: " + e.message);
                    }
                } else {
                    location.href = data;
                }
            } else {
                layer.msg("数据导出失败!");
            }
        })
    });
    //选择文件之后执行上传  
    $(document).on('change', ".fileToUpload2", function () {
        $.commonUploadImg('fileToUpload2', "Member", "true", function (resultImgUrl) {
            $("#upload").attr("src", _g_res_images_url + resultImgUrl);
            var sv_p_images = $("#sv_mr_headimg");
            sv_p_images.val(resultImgUrl);
        });
    });

    //选择文件之后执行上传  
    $(document).on('change', ".fileToUpload", function () {
        $.commonUploadImg('fileToUpload', "Member", "true", function (resultImgUrl) {
            if (resultImgUrl) {
                $("#upload").attr("src", _g_res_images_url + resultImgUrl);
                var sv_p_images = $("#sv_mr_headimg");
                sv_p_images.val(resultImgUrl);
            }
        });
    });

    //选择文件之后执行上传  
    $(document).on('change', "#fileToUpload3", function () {
        var loadingIndex = commonOpenLoading();
        $.commonUploadExelFile('fileToUpload3', '/api/Member/ImportExecl', function (data) {
            if (data) {
                commonCloseLoading(loadingIndex);
                if (data.Message == "-2") {
                    layer.msg("你没有该操作权限！");
                    layer.close(index);
                    return;
                } else if (data.Message == "-3") {
                    layer.msg("导入失败！");
                    layer.close(index);
                    return;
                } else if (data.Message == "-5") {
                    layer.msg("上传文件失败，表格存在相同卡号！");
                    layer.close(index);
                } else if (data.Message == "-6") {
                    layer.msg("上传文件失败，表格存在相同手机号！");
                    layer.close(index);
                }
                else if (data.Success) {
                    if (data.Message != "" && data.Message != null && data.Message.indexOf("表格数据有误") >= 0) {
                        if (data.Url != "" && data.Url != null && data.Url.indexOf("/") > 0) {
                            layer.msg(data.Message);

                        } else {
                            layer.msg(data.Message);
                        }
                        layer.close(index);
                    } else {
                        if (data.Data != "" && data.Data != null) {
                            g_import_member_data_list = data.Data;
                            Deke.DeKe_dialog.show_Url3("会员导入列表", "/Html/Member/MemberList.html?v=" + clearCache, memberlist, ['80%', ''], "");
                            //memberlist1(data.data)
                            strPath = data.Url;
                        } else {
                            layer.msg("上传文件失败，表格数据有误！");
                            layer.close(index);
                        }
                    }
                }
                else {
                    if (data.Message != "" && data.Message != null && data.Message.indexOf("不属于表") > 0) {
                        layer.msg("上传文件失败！" + data.Message + "请下载最新会员导入模板");
                        layer.close(index);
                    } else {
                        layer.msg("上传文件失败！");
                        layer.close(index);
                    }
                }
            }
        });
    });
    //快的充值
    $("#userbur").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            chsaisi($('input[name="subbox"]:checked').parent().parent().parent().next().text(), $('input[name="subbox"]:checked').data("user_id"));
        } else {

            layer.msg("请先择您要修改的会员，不能选择多个！");
        }
    });

    //打标签按扭

    $("#sbiaoqian").on("click", "li", function () {

        if ($('input[name="subbox"]:checked').length == 1) {
            //alert($(this).data("color"));

            //  Deke.DeKe_dialog.show_Url2('修改会员', '/html/adduser.html?v=15', f2, ['420px', '540px']);
            $.post("/ajaxdata/Update_dan", { "type": 2, "name": $(this).text(), "id": $(this).data("id"), "color": $(this).data("color"), "u_id": $('input[name="subbox"]:checked').val(), "userid": $('input[name="subbox"]:checked').data("user_id") }, function (data) {
                loggin.chklogn(data);
                if (data == true) {
                    layer.msg("会员标签设置成功");

                    queryClik(0, 0, 0);

                } else if (data == -2) {
                    layer.msg("你没有该操作权限！");

                } else if (data == -3) {
                    layer.msg("当前会员不支持跨店打标签！");

                } else {
                    layer.msg("会员标签设置失败");
                }

            });

        } else {

            layer.msg("请先择您要修改的会员，不能选择多个！");
        }


    });

    //分组修改
    $("#sfengzhu").on("click", "li", function () {

        if ($('input[name="subbox"]:checked').length == 1) {
            //alert($(this).data("color"));

            //  Deke.DeKe_dialog.show_Url2('修改会员', '/html/adduser.html?v=15', f2, ['420px', '540px']);
            $.post("/ajaxdata/Update_dan", { "type": 3, "name": $(this).text(), "id": $(this).data("id"), "color": "", "u_id": $('input[name="subbox"]:checked').val(), "userid": $('input[name="subbox"]:checked').data("user_id") }, function (data) {
                loggin.chklogn(data);
                if (data == true) {
                    layer.msg("会员分组设置成功");

                    queryClik(0, 0, 0);

                } else if (data == -2) {
                    layer.msg("你没有该操作权限");
                } else if (data == -3) {
                    layer.msg("当前会员不支持跨店操作");
                }
                else {

                    layer.msg("会员分组设置失败");
                }

            });

        } else {

            layer.msg("请先择您要修改的会员，不能选择多个！");
        }


    });

    //删除标签

    $(document).on("click", ".del-tags", function () {


        //alert($(this).data("color"));

        //  Deke.DeKe_dialog.show_Url2('修改会员', '/html/adduser.html?v=15', f2, ['420px', '540px']);
        $.post("/ajaxdata/Update_dan", { "type": 1, "name": $(this).text(), "id": $(this).data("id"), "color": "", "u_id": $(this).data("uid"), "userid": $(this).data("userid") }, function (data) {
            loggin.chklogn(data);
            if (data == true) {
                layer.msg("会员标签设置成功");

                queryClik(0, 0, 0);

            } else if (data == -2) {
                layer.msg("你没有该操作权限！");

            } else {
                layer.msg("会员标签设置失败");
            }

        });
    });

    if (location.hash == "#adduser") {
        Deke.DeKe_dialog.show_Url2('新增会员', '/member/_PartialMemberOperate?buttonCode=btn_add_member_code', f, ['850px', '580px']);
    }
    //读取会员配置
    $.get("/Ajaxdata/GetUserconfig", function (data) {
        //  alert(data);
        //  $("#sv_mr_name,#memberlevel_id,#membergroup_id").empty();
        //for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
        //    $("#sv_mr_nick").append("<option value='" + data.sv_uc_callnameList[i] + "'>" + data.sv_uc_callnameList[i] + "</option>");
        //    //sv_mr_name
        //}
        ///读取会员级别

        if (!data.GetUserLevel) {

            data.GetUserLevel = data.getUserLevel;
        }
        if (!data.GetMembergroup) {

            data.GetMembergroup = data.getMembergroup;
        }
        if (!data.GetSv_membertag) {

            data.GetSv_membertag = data.getSv_membertag;
        }
        for (var i = 0; i < data.GetUserLevel.length; i++) {
            $("#dengji").append('<li class="select" data-id="' + data.GetUserLevel[i].memberlevel_id + '" data-name="dengji"><a href="javascript:void(0);">' + data.GetUserLevel[i].sv_ml_name + '</a></li>');
        }
        ///读取会员级别
        for (var i = 0; i < data.GetMembergroup.length; i++) {
            $("#fenzhu").append('<li class="select" data-id="' + data.GetMembergroup[i].membergroup_id + '"  data-name="fenzhu"><a href="javascript:void(0);">' + data.GetMembergroup[i].sv_mg_name + '</a></li>');
            $("#sfengzhu").append("<li data-id='" + data.GetMembergroup[i].membergroup_id + "'><span>" + data.GetMembergroup[i].sv_mg_name + "</span></li>");
        }

        for (var i = 0; i < data.GetSv_membertag.length; i++) {
            $("#biaoqian").append('<li class="select" data-id="' + data.GetSv_membertag[i].membertag_id + '" data-name="biaoqian"><a href="javascript:void(0);">' + data.GetSv_membertag[i].sv_mt_name + '</a></li>');
            $("#sbiaoqian").append("<li data-id='" + data.GetSv_membertag[i].membertag_id + "' data-color='" + data.GetSv_membertag[i].sv_mt_color + "'><span>" + data.GetSv_membertag[i].sv_mt_name + "</span></li>");
        }

    });

    queryClik(0, 0, 0);
    $("#indexquery_like").focus();
    //加载会员统计相关信息
    $.get("/Ajaxdata/GetUser_Coutnt", function (data) {

        for (var key in data) {
            $("#" + key).text(Math.round(parseFloat(data[key]) * 100) / 100);
            if (key == "topUser") {
                if (data.topUser) {
                    for (var b = 0; b < data[key].length; b++) {
                        $(".lasticon").append("<p><span>" + (b + 1) + "、" + data[key][b].sv_mr_name + "</span><i>¥ " + data[key][b].sv_mw_sumamount + "</i></p>");
                    }
                }
            }

            if (key == 'usercount') {
                $('#memberCount').html(data[key]);
                $('#usercount2').html(data[key]);
            }
            if (key == 'mbircount') {
                $('#memberBirthday').html(data[key]);
            }

            ////初始化"会员列表"中分店信息绑定页面下拉框
            if (key == 'storelist') {
                var listhtml;
                for (var theadKey in data.storelist) {
                    listhtml += data.storelist[theadKey];
                }
                if (listhtml) {
                    $("#StoreMember").append(listhtml);
                }
            }

            ////初始化"会员列表"中分店信息绑定页面下拉框
            if (key == 'saleclerklist') {
                var html = '<option value="">操作员</option>';
                for (var i = 0; i < data.saleclerklist.length; i++) {
                    if (isNullOrWhiteSpace(data.saleclerklist[i].sv_employee_name)) {
                        html += '<option value="' + data.saleclerklist[i].sp_salesclerkid + '">' + data.saleclerklist[i].sv_employee_name + '</option>';
                    }
                    else {
                        html += '<option value=""></option>';
                    }
                }
                $("#sellerlist").html(html);
            }

        }
    });

    $("#refresh").click(function () {

        $("#query_cha").click();

    });

    //单个checkbox选中取消
    $(document).on("click", ".check-box", function () {
        $("#userid").val($(this).find("input").data("user_id"));
        if (!$(this).find("input").prop("checked")) {
            $('input[name="subbox"]').prop("checked", false);
            $('input[name="subbox"]').parent().parent().removeClass('checkedBox');
            $(this).find("input").prop("checked", true);
            $(this).addClass('checkedBox');

            if ($('input[name="subbox"]:checked').length == $('input[name="subbox"]').length) {
                $("#checkAll").find("input").prop("checked", true);
                $("#checkAll").addClass('checkedBox');
            }
            //移除按钮对应样式
            if ($('input[name="subbox"]:checked').attr("id") != 1) {
                $("#supplement_i").css("color", "gainsboro");
                $("#delete_i,#update_i").removeAttr("style");
                $("#the_loss_s").text("挂失");
            }
            else {
                $("#the_loss_s").text("取消挂失");
                $("#delete_i,#update_i").css("color", "gainsboro");
                $("#supplement_i").removeAttr("style");
            }
        }
        else {
            $("#userid").val("");
            $(this).find("input").prop("checked", false);
            $(this).removeClass('checkedBox');
            $("#checkAll").find("input").prop("checked", false);
            $("#checkAll").removeClass('checkedBox');
            $("#delete_i,#supplement_i,#update_i").removeAttr("style")
            $("#the_loss_s").text("挂失");
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

    //处理搜索选中事件
    $("#fenzhu,#dengji,#liusi").on("click", "li", function () {


        if (!$(this).is(".active")) {
            $(this).parent().find("li").removeClass("active");
            $(this).addClass("active");
            if ($(this).find("input").length == 0) {
                if ($(this).data("id") != 0) {



                    $("#yixianzhe").parent().parent().show();
                    $("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").remove();

                    var ass = $(this).clone(true);
                    //
                    ass = ass.append('<span class="colos">×</span>');
                    ass.appendTo("#yixianzhe");

                }
                else {

                    $("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").remove();
                    if ($("#yixianzhe li").length == 0) {
                        $("#yixianzhe").parent().parent().hide();

                    }
                }
            }
        } else {


            $(this).removeClass("active");
            $("[data-id='0'][data-name='" + $(this).data("name") + "']").addClass("active");
            $("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").remove();
        }
    });

    $("#yixianzhe").on("click", "li", function () {



        $("[data-id='" + $(this).data("id") + "'][data-name='" + $(this).data("name") + "']").removeClass("active");
        $("[data-id='0'][data-name='" + $(this).data("name") + "']").addClass("active");
        $(this).remove();


        if ($("#yixianzhe li").length == 0) {
            $("#yixianzhe").parent().parent().hide();

        }
    });

    //处理搜索选中事件
    $("#biaoqian").on("click", "li", function () {

        if (!$(this).is(".active")) {
            $(this).parent().find("li").eq(0).removeClass("active");
            $(this).addClass("active");
            if ($(this).data("id") != 0) {


                $("#yixianzhe").parent().parent().show();


                var ass = $(this).clone(true);
                //
                ass = ass.append('<span class="colos">×</span>');
                ass.appendTo("#yixianzhe");

            } else {
                $(this).parent().find("li").removeClass("active");
                $(this).parent().find("li").eq(0).addClass("active");

                $("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").remove();
                if ($("#yixianzhe li").length == 0) {
                    $("#yixianzhe").parent().parent().hide();

                }

            }
        } else {


            $(this).removeClass("active");
            $("#yixianzhe").find("[data-id='" + $(this).data("id") + "'][data-name='" + $(this).data("name") + "']").remove();
            if ($("#yixianzhe").find("[data-name='" + $(this).data("name") + "']").length == 0) {
                $("[data-id='0'][data-name='" + $(this).data("name") + "']").addClass("active");
            }



        }

    });

    //写入天数
    $(document).on("keyup change", "#liusitext", function () {

        if ($("#liusitext").val() > 0) {
            $("#yixianzhe").find("[data-name='liusi']").remove();

            var html = '<li class="select active"  data-id="' + $("#liusitext").val() + '" data-name="liusi"><a href="javascript:void(0);">' + $("#liusitext").val() + '天没购买 <span class="colos">×</span></a></li>';

            $("#yixianzhe").append(html);
            $("#yixianzhe").parent().parent().show();
        } else {

            $("#yixianzhe").find("[data-name='liusi']").remove();
            $("[data-id='0'][data-name='liusi']").addClass("active");
        }

    });

    //点击查询
    $("#query_cha").click(function () {

        var dengji = 0, fenzhu = 0, liusi = 0, biaoqian = "";
        $("#yixianzhe li").each(function () {


            switch ($(this).data("name")) {

                case "dengji":
                    dengji = $(this).data("id");
                    break;
                case "fenzhu":
                    fenzhu = $(this).data("id");
                    break;
                case "liusi":
                    liusi = $(this).data("id");
                    break;
                case "biaoqian":
                    biaoqian += $(this).data("id") + ",";
                    break;
            }


        });
        queryClik(dengji, fenzhu, liusi, "", biaoqian);

    });


    $("#indexquery_like").keypress(function (event) {
        if (event.keyCode == 13) {
            var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");
            if (memberSeachValue) {
                queryClik(0, 0, 0, memberSeachValue);
            }
            else {
                layer.msg("请输入要查询的内容！");
            }
        }
    });


    //标签移动事件展示事件
    $('.bq_pfus').hover(function () {
        $(this).addClass('bq_pfus-hover');
    }, function () {
        $(this).removeClass('bq_pfus-hover');
    });

    //删除当前标签事件
    $('.del-tags').click(function () {
        $(this).parent('.bq_pssos').remove();
    });

    //右侧眼睛点击显示详情页面
    $('.ayels').click(function () {

        $(this).toggleClass('open');
        $('#hyxqbtn').slideToggle(400);

    });

    //筛选事件的弹出事件
    $('#shuaixuanbit').click(function () {
        $(this).toggleClass('open');
        $('.shuaixuanbox').slideToggle(500);
    });

    //会员充值-支付选择

    $('.lisbk a').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //会员选择
    $('.stecs i').click(function () {
        if ($(this).data("typedate") != "tjian") {
            $(this).parent().toggleClass('on').siblings().removeClass('on');
        }
    });

    $(document).on("mouseover", "#xqtabbox li", function () {

        $(this).addClass('active').siblings().removeClass('active');
        var index = $('#xqtabbox li').index(this);
        $('.reclxqtab>div').eq(index).fadeIn(50).siblings().fadeOut(0);
    });

    $(document).on("click", "#qixiao", function () {

        layer.closeAll("page");
    });

    // 判断字符串是否为空还是NULL,还是undefined
    function isNullOrEmpty(str) {
        if (str.trim() == null || str.trim() == '' || str.trim() == undefined) {
            return false;
        }
        else {
            return true;
        }
    }


    //添加与修改会员
    $(document).on("click", "#baochuuser", function () {
        var sv_mr_cardno = $("#sv_mr_cardno");
        if (!isNullOrWhiteSpace($(".sv_mr_cardno").val())) {
            $(".sv_mr_cardno").attr("disabled", "disabled");
        }
        var sv_mr_mobile = $("#sv_mr_mobile");
        var sv_mr_name = $("#sv_mr_name");
        if (!isNullOrEmpty(sv_mr_cardno.val())) {
            layer.msg("会员卡号还没有输入！");
            sv_mr_cardno.focus();
            return;
        }
        else if (sv_mr_cardno.val().length > 20) {
            layer.msg("会员卡号长度必须小于20位！");
            sv_mr_cardno.focus();
            return;
        }
        else {
            if ($("#member_id").val() == "") {
                //IC卡发卡
                if (!WriteICCardInfo(sv_mr_cardno.val())) {
                    layer.msg("发卡失败！");
                    return false;
                }
                var dd = false;
                $.ajax({
                    url: '/Ajaxdata/Issv_mr_cardno',
                    data: { sv_mr_cardno: sv_mr_cardno.val() },
                    method: 'POST',
                    async: false,
                    success: function (d) {
                        dd = d;
                    }
                });
                if (!dd) {
                    layer.msg("该卡号已经注册过会员，请查正再输入！");
                    $("#sv_mr_cardno").focus();
                    return dd;
                }
            }
            else {
                if (GetUserdata["sv_mr_cardno"] != sv_mr_cardno.val()) {
                    var dd = false;
                    $.ajax({
                        url: '/Ajaxdata/Issv_mr_cardno',
                        data: { sv_mr_cardno: sv_mr_cardno.val() },
                        method: 'POST',
                        async: false,
                        success: function (d) {
                            dd = d;
                        }
                    });
                    if (!dd) {
                        layer.msg("该卡号已经注册过会员，请查正再输入！");
                        $("#sv_mr_cardno").focus();
                        return dd;
                    }
                }
            }
        }

        if (sv_mr_name.val() == "") {
            layer.msg("还没有输会员姓名！");
            sv_mr_name.focus();
            return;
        }
        else if (sv_mr_name.val().length > 15) {
            layer.msg("会员姓名长度必须小于15位！");
            sv_mr_name.focus();
            return;
        }

        if (sv_mr_mobile.val() == "") {
            layer.msg("请输入会员手机号码！");
            sv_mr_mobile.focus();
            return;
        }
        else {
            if ($("#member_id").val() == "") {
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                if (reg.test(sv_mr_mobile.val())) {
                    var dd = false;
                    $.ajax({
                        url: '/Ajaxdata/IsUserMoble',
                        data: { mobile: sv_mr_mobile.val() },
                        method: 'POST',
                        async: false,
                        success: function (d) {
                            dd = d;
                        }
                    });

                    if (!dd) {
                        layer.msg("该手机号码已经注册过会员！");
                        $("#sv_ul_mobile").focus();
                        return dd;
                    }
                }
                else {
                    layer.msg("请输入正确手机号码！~");
                    sv_mr_mobile.focus();
                    return;
                }
            }
            else {
                if (GetUserdata["sv_mr_mobile"] != sv_mr_mobile.val()) {
                    var reg = /^1[3|4|5|7|8]\d{9}$/;
                    if (reg.test(sv_mr_mobile.val())) {
                        var dd = false;
                        $.ajax({
                            url: '/Ajaxdata/IsUserMoble',
                            data: { mobile: sv_mr_mobile.val() },
                            method: 'POST',
                            async: false,
                            success: function (d) {
                                dd = d;
                            }
                        });

                        if (!dd) {
                            layer.msg("该手机号码已经注册过会员！");
                            $("#sv_ul_mobile").focus();
                            return dd;
                        }
                    }
                    else {
                        layer.msg("请输入正确手机号码！~");
                        sv_mr_mobile.focus();
                        return;
                    }
                }
            }
        }
        var list = new Array();
        var customFieldHtml = $('#customFieldHtml input');
        if (customFieldHtml.length > 0) {
            for (var i = 0; i < customFieldHtml.length; i++) {
                console.log($(customFieldHtml[i]).data('id'));
                var model = {
                    sv_field_id: $(customFieldHtml[i]).data('id'),
                    sv_field_value: $(customFieldHtml[i]).val(),
                    sv_relation_id: $(customFieldHtml[i]).data('relationid')
                };
                list.push(model);
            }
        }
        // alert(JSON.stringify($("#Adduserform").serializeArray()));
        var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
        disableButton('baochuuser');
        $("#sv_mr_cardno").val($("#sv_mr_cardno").val().replace(/(^\s*)|(\s*$)/g, ""));
        var _fromData = $("#Adduserform").serializeArray();
        var memberjson = '{"CustomFieldList":"",';
        $.each(_fromData, function (i, field) {
            memberjson += '"' + field.name + '":"' + field.value + '",';
        });
        memberjson += '"registerrebate":"-1",';//开卡充值返利标识，0默认返利，-1不返利
        memberjson = memberjson.substring(0, memberjson.length - 1) + "}";
        memberjson = JSON.parse(memberjson);
        list = JSON.stringify(list);
        memberjson.CustomFieldList = JSON.parse(list);
        if (!memberjson.sv_mrr_money) {
            memberjson.sv_mrr_money = "0";
        }
        if (!memberjson.sv_mrr_present) {
            memberjson.sv_mrr_present = "0";
        }
        if (!memberjson.sv_mrr_payment) {
            memberjson.sv_mrr_payment = "现金";
        }
        if (memberjson.sv_mr_birthday) {
            memberjson.sv_mr_birthday += " 08:00";
        }
        $.ajax({
            url: "/Ajaxdata/PostAddreg?userid=" + $("#userid").val(),
            data: JSON.stringify(memberjson),
            type: "POST",
            contentType: "application/json",
            success: function (result) {
                enabledButton('baochuuser');
                $("#sv_mr_cardno").removeAttr("disabled");
                if (result == true) {
                    if (g_AutomaticallyGenerateMemberId) {
                        if ($("#member_id").val() == null || $("#member_id").val() == "") { //修改会员时id不自动加一
                            setAutoIdplusOne("是否自动生成会员id",
                                "AutomaticallyGenerateMemberId",
                                "AutomaticallyGenerateMemberId");
                        }
                    }
                    queryClik();
                    GetUserdata = null;
                    $('#sv_mr_cardno').val('');
                    $('#sv_mr_name').val('');
                    $('#sv_mr_mobile').val('');
                    $('#sv_mr_qq').val('');
                    $('#sv_mr_wechat').val('');
                    $('#sv_mr_email').val('');
                    $('#sv_mr_address').val('');
                    $('#sv_mr_favorite').val('');
                    $('#sv_mr_remark').val('');
                    $('#fileToUpload').val('');
                    $('#sv_mr_pwd').val('');

                    layer.msg("保存成功", {
                        icon: 1, //图标
                        time: 1000   //2秒关闭(如果不配置,默认是3秒)
                    }, function () {
                        layer.closeAll();
                    });
                    
                    //加载会员统计相关信息
                    $.getJSON("/Ajaxdata/GetUser_Coutnt", function (data) {
                        for (var key in data) {
                            $("#" + key).text(data[key]);
                            if (key == 'usercount') {
                                $('#memberCount').html(data[key]);
                            }
                            if (key == 'mbircount') {
                                $('#memberBirthday').html(data[key]);
                            }
                        }
                    });
                }
                else if (result == -2) {
                    layer.msg("你没有该操作权限");
                    setTimeout(function () {
                        layer.closeAll();
                    }, 800);

                } else if (result == -4) {
                    layer.msg("会员数已上限");
                    setTimeout(function () {
                        layer.closeAll();
                    }, 800);

                } else if (result == -3) {
                    layer.msg("当前会员不支持跨店操作");
                    setTimeout(function () {
                        layer.closeAll();
                    }, 800);

                }
                else {
                    layer.close(index);
                    //layer.msg("添加员会失败，请刷新重试");
                    //setTimeout(function () {
                    //    layer.closeAll();
                    //}, 800);

                }
            }
        });
    });
    //IC卡发卡
    function WriteICCardInfo(cardNo) {
        if (_g_is_ic_flag && cardNo) {
            try {
                if (cardNo) {
                    if (_g_is_ic_type == 1) {
                        //IC4442 写卡号
                        if (cardNo.length > 9) {
                            cardNo = cardNo.length + cardNo;
                        } else {
                            cardNo = "0" + cardNo.length + cardNo;
                        }
                        layer.msg("发卡卡号：" + cardNo);
                        var data = Cef.WriteICCardNoWithPwd(cardNo, _g_is_ic_pwd);
                        var result = JSON.parse(data);

                        if (result) {
                            if (result.Success || result.Success == "true" || result.Success == "True") {
                                layer.msg("发卡成功");
                                return true;
                            } else {
                                layer.msg("发卡失败：" + result.Message);
                                return false;
                            }
                        }
                        return false;
                    } else if (_g_is_ic_type == 0) {
                        if (cardNo.length > 9) {
                            cardNo = cardNo.length + cardNo;
                        } else {
                            cardNo = "0" + cardNo.length + cardNo;
                        }

                        layer.msg("发卡卡号：" + cardNo);
                        if (cardNo.length < 32) {
                            for (var i = 0; i < 32 - cardNo.length; i++) {
                                cardNo += "0";
                            }
                        }
                        var data = Cef.URFWriteICCardNoWithPwd(cardNo, _g_is_ic_pwd);
                        var result = JSON.parse(data);
                        if (result) {
                            if (result.Success || result.Success == "true" || result.Success == "True") {
                                layer.msg("发卡成功");
                                return true;
                            } else {
                                layer.msg("发卡失败：" + result.Message);
                                return false;
                            }
                        }
                        return false;
                    }
                }
            } catch (e) {
                layer.msg(e.message);
                return false;
            }
        } else {
            return true;
        }
    }
    // 批量添加自定义字段

    //补卡
    $(document).on("click", "#ReissueCard", function () {
        var sv_mr_cardno = $("#sv_mr_cardno");
        var sv_mr_mobile = $("#sv_mr_mobile");
        var sv_mr_name = $("#sv_mr_name");
        if (sv_mr_cardno.val() == "") {
            layer.msg("会员卡号还没有输入！~");
            sv_mr_cardno.focus();
            return;
        }
        else if (sv_mr_cardno.val().length > 20) {
            layer.msg("会员卡号长度必须小于20位！");
            sv_mr_cardno.focus();
            return;
        }
        else {
            if ($("#member_id").val() == "") {
                var dd = false;
                $.ajax({
                    url: '/Ajaxdata/Issv_mr_cardno',
                    data: { sv_mr_cardno: sv_mr_cardno.val() },
                    method: 'POST',
                    async: false,
                    success: function (d) {
                        dd = d;
                    }
                });

                if (!dd) {
                    layer.msg("该卡号已经注册过会员，请查正再输入！");
                    $("#sv_mr_cardno").focus();
                    return dd;
                }


            }
            else {
                if (GetUserdata["sv_mr_cardno"] != sv_mr_cardno.val()) {
                    var dd = false;
                    $.ajax({
                        url: '/Ajaxdata/Issv_mr_cardno',
                        data: { sv_mr_cardno: sv_mr_cardno.val() },
                        method: 'POST',
                        async: false,
                        success: function (d) {
                            dd = d;
                        }
                    });

                    if (!dd) {
                        layer.msg("该卡号已经注册过会员，请查正再输入！");
                        $("#sv_mr_cardno").focus();
                        return dd;
                    }

                }

            }

        }

        if (sv_mr_name.val() == "") {
            layer.msg("还没有输会员姓名！~");
            sv_mr_name.focus();
            return;
        }

        if (sv_mr_mobile.val() == "") {
            layer.msg("请输入会员手机号码！~");
            sv_mr_mobile.focus();
            return;
        }
        else {
            if ($("#member_id").val() == "") {
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                if (reg.test(sv_mr_mobile.val())) {
                    var dd = false;
                    $.ajax({
                        url: '/Ajaxdata/IsUserMoble',
                        data: { mobile: sv_mr_mobile.val() },
                        method: 'POST',
                        async: false,
                        success: function (d) {
                            dd = d;
                        }
                    });

                    if (!dd) {
                        layer.msg("该手机号码已经注册过会员！");
                        $("#sv_ul_mobile").focus();
                        return dd;
                    }

                }
                else {
                    layer.msg("请输入正确手机号码！~");
                    sv_mr_mobile.focus();
                    return;
                }
            }
            else {
                if (GetUserdata["sv_mr_mobile"] != sv_mr_mobile.val()) {
                    var reg = /^1[3|4|5|7|8]\d{9}$/;
                    if (reg.test(sv_mr_mobile.val())) {

                        var dd = false;
                        $.ajax({
                            url: '/Ajaxdata/IsUserMoble',
                            data: { mobile: sv_mr_mobile.val() },
                            method: 'POST',
                            async: false,
                            success: function (d) {
                                dd = d;
                            }
                        });

                        if (!dd) {
                            layer.msg("该手机号码已经注册过会员！");
                            $("#sv_ul_mobile").focus();
                            return dd;
                        }
                    }
                    else {
                        layer.msg("请输入正确手机号码！~");
                        sv_mr_mobile.focus();
                        return;
                    }
                }
            }
        }

        // alert(JSON.stringify($("#Adduserform").serializeArray()));
        var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
        disableButton('ReissueCard');
        var list = new Array();
        var customFieldHtml = $('#customFieldHtml input');
        if (customFieldHtml.length > 0) {
            $('#customFieldHtml input').each(function () {
                var model = {
                    sv_field_id: $(this).data('id'),
                    sv_field_value: $(this).val(),
                    sv_relation_id: $(this).data('relationid')
                };
                list.push(model);
            });
        }

        var _fromData = $("#Adduserform").serializeArray();
        var memberjson = '{"CustomFieldList":"",';
        $.each(_fromData, function (i, field) {
            memberjson += '"' + field.name + '":"' + field.value + '",';
        });
        memberjson = memberjson.substring(0, memberjson.length - 1) + "}";
        memberjson = JSON.parse(memberjson);
        list = JSON.stringify(list);
        memberjson.CustomFieldList = JSON.parse(list);
        if (!memberjson.sv_mrr_money) {
            memberjson.sv_mrr_money = "0";
        }
        if (!memberjson.sv_mrr_present) {
            memberjson.sv_mrr_present = "0";
        }

        //IC卡发卡
        if (!WriteICCardInfo(sv_mr_cardno.val())) {
            layer.msg("发卡失败！");
            return false;
        }
        $.ajax({
            url: "/Ajaxdata/PostAddreg?userid=" + $("#userid").val(),
            data: JSON.stringify(memberjson),
            type: "POST",
            contentType: "application/json",
            success: function (result) {
                if (result == true) {
                    queryClik();
                    GetUserdata = null;
                    $('#sv_mr_cardno').val('');
                    $('#sv_mr_name').val('');
                    $('#sv_mr_mobile').val('');
                    $('#sv_mr_qq').val('');
                    $('#sv_mr_wechat').val('');
                    $('#sv_mr_email').val('');
                    $('#sv_mr_address').val('');
                    $('#sv_mr_favorite').val('');
                    $('#sv_mr_remark').val('');
                    $('#fileToUpload').val('');
                    $('#sv_mr_pwd').val('');
                    layer.msg("补卡成功！");
                    enabledButton('ReissueCard');
                    layer.closeAll();
                    //加载会员统计相关信息
                    $.getJSON("/Ajaxdata/GetUser_Coutnt", function (data) {
                        for (var key in data) {
                            $("#" + key).text(data[key]);
                            if (key == 'usercount') {
                                $('#memberCount').html(data[key]);
                            }
                            if (key == 'mbircount') {
                                $('#memberBirthday').html(data[key]);
                            }
                        }
                    });
                } else if (result == 3) {
                    layer.msg("补卡失败。此卡号已存在,请查询卡号信息重新操作补卡");
                    layer.closeAll('loading');
                    $("#ReissueCard").removeAttr("disabled");
                }
                else if (result == 2) {
                    layer.msg("补卡失败,此卡无效,当前会员已补过此卡号，请重新补卡");
                    layer.closeAll('loading');
                    $("#ReissueCard").removeAttr("disabled");
                }
                else if (result == -2) {
                    layer.msg("你没有该操作权限");
                    layer.close(index);
                } else if (result == -3) {
                    layer.msg("当前会员不支持跨店操作");
                    setTimeout(function () {
                        layer.closeAll();
                    }, 800);
                }

                else {
                    layer.msg("员会补卡失败，请刷新重试");
                    layer.close(index);
                }
            }
        });



        //页面层-自定义
        //ayer.alert('内容', { icon: 6 });
    });

    // 删除自定义字段
    function deleteMemberCustomField(fieldId) {
        layer.confirm("您确认要删除该字段吗？", { btn: ["确认删除", "关闭"] }, function () {
            $.postAsyncJson('/Ajaxdata/DeleteMemberCustomField', { field_id: fieldId }, function (result) {
                if (result == true) {
                    layer.msg("删除成功！");
                }
                else {
                    layer.msg("删除失败，请稍后重试！");
                }
            });
        });
    }

    function f3(id) {

        //$.get("/Ajaxdata/GetUserconfig", function (data) {
        //    //  alert(data);
        //    $("#sv_mr_name,#memberlevel_id,#membergroup_id").empty();
        //    for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
        //        $("#sv_mr_nick").append("<option value='" + data.sv_uc_callnameList[i] + "'>" + data.sv_uc_callnameList[i] + "</option>");
        //        //sv_mr_name
        //    }
        //    ///读取会员级别
        //    for (var i = 0; i < data.GetUserLevel.length; i++) {
        //        $("#memberlevel_id").append("<option value='" + data.GetUserLevel[i].memberlevel_id + "'>" + data.GetUserLevel[i].sv_ml_name + "</option>");
        //    }
        //    ///读取会员级别
        //    for (var i = 0; i < data.GetMembergroup.length; i++) {
        //        $("#membergroup_id").append("<option value='" + data.GetMembergroup[i].membergroup_id + "'>" + data.GetMembergroup[i].sv_mg_name + "</option>");
        //    }
        //});

        $.get("/Ajaxdata/GetUserModel?id=" + id, function (data) {
            if (data && data.sv_mr_platenumber && $("#edit") && _g_sv_uit_cache_name == 'cache_name_auto_beauty') {
                $("#edit").append("<li><span>车牌号码</span><span class='sv_mr_platenumber'>" + data.sv_mr_platenumber + "</span></li>");
            }
            if (data != null && data.sv_mw_credit != null) {
                $(".sv_mw_credit").text(data.sv_mw_credit);
                if (parseFloat(data.sv_mw_credit) <= 0) {
                    $("#collection").text("收款记录");
                }
            }
            for (var key in data) {
                laydate.skin('molv');//主题皮肤
                if (key == "sv_mr_birthday" || key == "sv_mr_adddate" || key == "sv_mw_lastcostdate") {
                    var t = new Date(data[key]).Format("yyyy-MM-dd");
                    if (t == "1-01-01") {
                        t = "";
                    }
                    $("." + key).text(t);

                }
                else if (key == "sv_mr_headimg") {
                    if (data[key]) {
                        $("#sv_mr_headimg,#sv_mr_headimg2").attr("src", _g_res_images_url + data[key]);
                    }
                }
                else if (key == 'sv_registration') {
                    var sv_registration = data[key] == 1 ? '微信' : '线下';
                    $('.sv_registration').text(sv_registration);
                }
                else if (key == 'sv_mw_lastcostday') {
                    if (data[key] <= 0) {
                        $('#consumptionStatistics').html("该会员暂时还没有购物记录！");
                    }
                    else {
                        $('.sv_mw_lastcostday').html(data[key]);
                    }
                }
                else {
                    $("#userid").val(data["user_id"])
                    $("." + key).text(data[key]);
                }
            }
            GetSavings(id);
        });

        setTimeout(function () {
            $.getAsyncJson('/Ajaxdata/GetMemberCustomInfo', { memberId: id }, function (result) {
                var customFieldHtml = '';
                if (result != null && result != '') {
                    for (var i = 0; i < result.length; i++) {
                        var sv_field_value = result[i].sv_field_value != null && result[i].sv_field_value != '' ? result[i].sv_field_value : '';
                        if (result[i].sv_field_name.length >= 4) {
                            customFieldHtml += '<li><span>' + result[i].sv_field_name + '</span>' + sv_field_value + '</span></li>';
                        } else {
                            customFieldHtml += '<li><span>' + result[i].sv_field_name + strPlaceholder(4 - result[i].sv_field_name.length) + '</span><span>' + sv_field_value + '</span></li>';
                        }

                    }
                }
                $('#memberCustomInfoHtml').html(customFieldHtml);
            });

            getSmsSmsTotal(id);
        }, 200);
    }

    // 读取会员发送的短信记录
    function getSmsSmsTotal(id) {
        $.getAsyncJson('/member/GetGetSmsSmsTotal', {
            memberId: id,
            beginDate: null,
            endDate: null,
            state: 0
        }, function (result) {
            var i = Math.ceil(result / 10);
            $('#memberSmsTotal').html(result);
            if (result > 0) {
                laypage({
                    cont: $('#pageSmsSmsList'), //容器。值支持id名、原生dom对象，jquery对象,
                    pages: i, //总页数
                    skin: 'molv', //皮肤
                    first: '首页', //若不显示，设置false即可
                    last: '尾页', //若不显示，设置false即可
                    prev: '上一页', //若不显示，设置false即可
                    next: '下一页', //若不显示，设置false即可
                    curr: location.hash.replace('#!page=', ''), //获取hash值为fenye的当前页
                    hash: 'page', //自定义hash值
                    jump: function (e, first) {
                        getSmsSmsList(id, e.curr);
                    }
                });
            }
        });
    }


    // 分页读取会员短信发送记录
    function getSmsSmsList(id, pageIndex) {
        $.getAsyncJson('/member/GetSmsSmsList', {
            memberId: id,
            pageIndex: pageIndex,
            pageSize: 10,
            beginDate: null,
            endDate: null,
            state: 0
        }, function (result) {
            var memberSmslistHtml = "";
            if (result != null) {
                for (var i = 0; i < result.length; i++) {
                    memberSmslistHtml += '<tr><td data-trigger="hover" data-container="body" data-toggle="popover" data-placement="top">' + result[i].sms_smslist_text + '</td>'
                    memberSmslistHtml += '<td>' + new Date(result[i].sms_smslistdate).Format("yyyy-MM-dd hh:mm:ss") + '</td></tr>';
                }
            }
            $('#memberSmslistHtml').html(memberSmslistHtml);
        });
    }

    //会员资料单个修改
    $(document).on("mouseover mouseleave click", "#edit li:not('.no')", function (type) {
        if (type.type == "mouseover") {
            $(this).addClass('btjl');
        } else if (type.type == "click") {
            var name = $(this).find("span").eq(1);
            layer.prompt({
                title: '修改会员' + $(this).find("span").eq(0).text() + "信息",
                formType: 0, //prompt风格，支持0-2
                value: $(this).find("span").eq(1).text()

            }, function (pass, index) {
                mydata = { "name": name.attr("class"), "value": pass };

                var member_master_user_id;
                var tr = $("#tablelist").children("tr");
                for (var i = 0; i < tr.length; i++) {
                    var info = $(tr[i]).attr("data-id");
                    if (info == $(".member_id").text()) {
                        member_master_user_id = $(tr[i]).find("[name=subbox]").attr("data-user_id");
                        break;
                    }
                }
                if (mydata && mydata.name == 'sv_mr_birthday') {
                    mydata.value += " 08:00";
                }
                $.ajax({
                    url: "/Ajaxdata/updateUser_Noe?id=" + $(".member_id").text() + "&userid=" + member_master_user_id,
                    data: JSON.stringify(mydata),
                    type: "POST",
                    contentType: "application/json",
                    success: function (result) {
                        if (result == true) {
                            layer.msg("修改成功！~");
                            layer.close(index);
                            name.text(pass);
                        }
                        else if (result == -2) {
                            layer.msg("你没有该操作权限");
                            layer.close(index);
                        }
                        else {
                            layer.msg("修改失败，请刷新重试");
                            layer.close(index);
                        }
                    }
                });


                //layer.prompt({ title: '随便写点啥，并确认', formType: 2 }, function (text) {
                //    layer.msg('演示完毕！您的口令：' + pass + ' 您最后写下了：' + text);
                //});
            });

            if ($(this).find("span").eq(1).attr("class") == "sv_mr_birthday") {
                laydate.skin('molv');//主题皮肤
                laydate({
                    elem: '#date_click',
                    format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
                    festival: false
                    //, //显示节日
                    //choose: function (datas) { //选择日期完毕的回调
                    //    alert('得到：' + datas);
                    //}
                });
            }

        }
        else {
            $(this).removeClass('btjl');
        }

    });

    //查看会员详细信息
    $(document).on("click", ".clickinfo", function () {
        $(this).parent().find(".check-box ").click();
        Deke.DeKe_dialog.show_Url2('会员详细信息', '/html/User_info.html?v=29', f3($(this).parent().data("id")), ['790px', '550px']);
    });

    //会员收账
    $(document).unbind("click", "#collection").on("click", "#collection", function () {
        var memberName = $("#sv_mr_name_text").text();
        Deke.DeKe_dialog.show_Url2(memberName, '/html/collection.html?v=30', collectionFn, ['790px', '550px']);
    });

    //会员赊账的方法
    function collectionFn(){
        $(document).unbind("click", "#collectionpage-title>a").on("click", "#collectionpage-title>a", function () {
            var index = $(this).index();
            $(this).addClass("active").siblings("a").removeClass("active");
            if (index > 0) {
                $("#shoppay,#payinfobox,.hidden-btn").hide(0);
                $("#sallinfo").show(0);
            } else {
                $("#sallinfo").hide(0);
                $("#shoppay,#payinfobox,.hidden-btn").show(0);
            }
        });
    }

    //修改会员资料
    $("#update").click(function () {

        if ($('input[name="subbox"]:checked').length == 1) {
            if ($('input[name="subbox"]:checked').attr("id") != 1) {
                Deke.DeKe_dialog.show_Url2('修改会员', '/html/adduser.html?v=' + clearCache + 2, f2, ['850px', '600px']);
            } else {
                false;
            }

        } else {

            layer.msg("请先择您要修改的会员，不能选择多个！");
        }
    });
    $("#supplement").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            if ($('input[name="subbox"]:checked').attr("id") == 1) {
                Deke.DeKe_dialog.show_Url2('会员补卡信息', '/html/UserReissueCard.html?v=15', f4, ['850px', '600px']);
            } else {
                false;
            }
        } else { layer.msg("请先择您要补卡的会员，不能选择多个！") }
    });
});

function queryClik(dengji, fenzhu, liusi, key, biaoqian, memberBirthday) {
    queryPageCount(1, dengji, fenzhu, liusi, key, biaoqian, memberBirthday);
    return;
    var leavename = $("#dengji li.active a").html();
    if (leavename == "全部")
    {
        leavename = "";
    }
    var groupname = $("#fenzhu li.active a").html();
    if (groupname == "全部")
    {
        groupname = "";
    }
    //初始化分页内容
    $.get("/ajaxdata/GetUserCount/", { "dengji": dengji, "fenzhu": fenzhu, "liusi": liusi, "key": key, "biaoqian": biaoqian, memberBirthday: memberBirthday, "levelname": leavename, "groupname": groupname, "store": $('#StoreMember').val(), "creator": $('#sellerlist').val(), "reg_source": $("#sv_reg_source").val() }, function(data) {
        $("#page_member_row_count").html("会员数量:" + data);
        var i = Math.ceil(data / 5);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            curr: location.hash.replace('#!page=', ''), //获取hash值为fenye的当前页
            hash: 'page', //自定义hash值
            jump: function (e, first) {

                GetList(e.curr, dengji, fenzhu, liusi, key, biaoqian, memberBirthday);
            }
        });
    });

}

function queryPageCount(page, dengji, fenzhu, liusi, key, biaoqian, memberBirthday) {
    $("#yixianzhe li").each(function() {
        switch ($(this).data("name"))
        {
            case "dengji":
                dengji = $(this).data("id");
                break;
            case "fenzhu":
                fenzhu = $(this).data("id");
                break;
            case "liusi":
                liusi = $(this).data("id");
                break;
            case "biaoqian":
                biaoqian += $(this).data("id") + ",";
                break;
        }
    });




    var leavename = $("#dengji li.active a").html();
    if (leavename == "全部")
    {
        leavename = "";
    } else
    {
        dengji = $("#dengji li.active").attr("data-id");
    }
    var groupname = $("#fenzhu li.active a").html();
    if (groupname == "全部")
    {
        groupname = "";
    } else
    {
        fenzhu = $("#fenzhu li.active").attr("data-id");
    }
    //初始化分页内容
    $.get("/ajaxdata/GetUserListCount/", { "dengji": dengji, "fenzhu": fenzhu, "liusi": liusi, "key": (key || $("#indexquery_like").val()), "biaoqian": biaoqian, memberBirthday: memberBirthday, "levelname": leavename, "groupname": groupname, "store": ($('#StoreMember').val() || user_id), "creator": $('#sellerlist').val(), "reg_source": $("#sv_reg_source").val(), "reg_start_date": $("#member_reg_start_date").val(), "reg_end_date": $("#member_reg_end_date").val() }, function(data) {
        $("#page_member_row_count").html("记录数:" + data);
        var i = Math.ceil(data / 5);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            curr: location.hash.replace('#!page=', ''), //获取hash值为fenye的当前页
            hash: 'page', //自定义hash值
            jump: function(e, first) {
                if (!first) {
                    GetList(e.curr, dengji, fenzhu, liusi, key, biaoqian, memberBirthday);
                } else {
                    GetList(1, dengji, fenzhu, liusi, key, biaoqian, memberBirthday);
                }
            }
        });
    });

}



function GetList(page, dengji, fenzhu, liusi, key, biaoqian, memberBirthday) {
    // var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
    var leavename = $("#dengji li.active a").html();
    if (leavename == "全部") {
        leavename = "";
    } else {
        dengji = $("#dengji li.active").attr("data-id");
    }
    var groupname = $("#fenzhu li.active a").html();
    if (groupname == "全部") {
        groupname = "";
    } else {
        fenzhu = $("#fenzhu li.active").attr("data-id");
    }
    $.get("/ajaxdata/GetUserList/" + page, { "dengji": dengji, "fenzhu": fenzhu, "liusi": liusi, "key": (key || $("#indexquery_like").val()), "biaoqian": biaoqian, "memberBirthday": memberBirthday, "levelname": leavename, "groupname": groupname, "store": $('#StoreMember').val(), "creator": $('#sellerlist').val(), "reg_source": $("#sv_reg_source").val(), "reg_start_date": $("#member_reg_start_date").val(), "reg_end_date": $("#member_reg_end_date").val() }, function(data) {
        var html = "";
        if (data) {
            for (var i = 0; i < data.length; i++) {
                // alert(data[i].sv_mr_status);
                html += '<tr  data-id="' + data[i].member_id + '">';
                html += ' <td>';
                html += ' <div class="check-box "><i><input type="checkbox" data-user_id="' + data[i].user_id + '" id="' + data[i].sv_mr_status + '" value="' + data[i].member_id + '" name="subbox"></i></div>';
                html += ' </td>';
                if (data[i].isOverdue) {
                    html += ' <td>' + data[i].sv_mr_cardno + '<span style="color:red;">(已过期)</span></td>';
                } else {
                    if (data[i].sv_mr_status == 1) {
                        html += ' <td>' + data[i].sv_mr_cardno + '<span style="color:red;">(已挂失)</span></td>';
                    } else {
                        html += ' <td >' + data[i].sv_mr_cardno + '</td>';
                    }
                }
                if (isNullOrWhiteSpace(data[i].sv_mr_nick)) {
                    html += '<td class="clickinfo textleft"  ><span><img src="' + ((data[i].sv_mr_headimg == null || data[i].sv_mr_headimg == '') ? "":(_g_res_images_url + data[i].sv_mr_headimg) ) + '"  onerror="this.src=\'/images/001.png\';" ></span><span class="text-ovtb">' + data[i].sv_mr_name + '(' + data[i].sv_mr_nick + ')</span></td>';
                }
                else {
                    html += '<td class="clickinfo textleft"  ><span><img src="' + ((data[i].sv_mr_headimg == null || data[i].sv_mr_headimg=='') ? "":(_g_res_images_url + data[i].sv_mr_headimg) ) + '"  onerror="this.src=\'/images/001.png\';" ></span><span class="text-ovtb">' + data[i].sv_mr_name + '</span></td>';
                }
                html += '<td class="bqbox">';
                html += '<div class="bq_pfus ">';

                if (data[i].membertag) {
                    var lista = JSON.parse(data[i].membertag);


                    for (var it = 0; it < lista.length; it++) {

                        html += '<div class="bq_pssos yellow"  style="background-color:' + lista[it].clord + ';">';
                        html += '<img src="/images/tag-cover.png" class="tag-mask">';
                        html += '<span class="tagInfo">' + lista[it].name + '</span>';
                        html += '<img src="/images/tag-delete.png" height="8" class="del-tags"  data-uid="' + data[i].member_id + '"  data-id="' + lista[it].tab + '" data-userid="' + data[i].user_id + '">';
                        html += '</div>';
                    }
                }

                html += '</div>';
                html += '</td>';
                html += '<td><span>' + data[i].sv_mr_mobile + '</span></td>';
                if (!isNullOrWhiteSpace(data[i].sv_mg_name))
                    html += '<td><span></span></td>';
                else
                    html += '<td><span>' + data[i].sv_mg_name + '</span></td>';
                if (!isNullOrWhiteSpace(data[i].sv_ml_name))
                    html += '<td><span></span></td>';
                else
                    html += '<td><span>' + data[i].sv_ml_name + '</span></td>';
                html += '<td><span>' + data[i].sv_mw_availablepoint + '</span></td>';
                html += '<td><i>¥' + data[i].sv_mw_availableamount + '</i></td>';
                //html += '<td><a href="#">记账</a></td>';
                if (isNullOrWhiteSpace(data[i].sv_mr_address)) {
                    html += '<td>' + data[i].sv_mr_address + '</td>';
                }
                else {
                    html += '<td></td>';
                }
                html += '<td><span>' + data[i].userName + '</span></td>';
                var sv_registration = data[i].sv_registration == 1 ? '微信' : '线下';
                html += '<td><span>' + sv_registration + '</span></td>';
                html += '</tr>';
            }
        }
        $("#tablelist").html(html);
        //标签移动事件展示事件
        $('.bq_pfus').hover(function () {
            $(this).addClass('bq_pfus-hover');
        }, function () {
            $(this).removeClass('bq_pfus-hover');
        });
        //layer.close(index);
    });
}

function GetSavings(id) {

    $.getJSON("/Ajaxdata/GetSavingsList/" + id + "?page=-1", function (data) {
        var html = ' ';

        var cid = 0.00;
        for (var i = 0; i < data.length; i++) {

            var str = "";
            if (data[i].sv_mrr_type == 0 || data[i].sv_mrr_type == 3 || data[i].sv_mrr_type == 4) {
                str = "+";
                cid += parseFloat(data[i].sv_mrr_money);
            }
            else {
                str = "-";
                // cid -= parseFloat(data[i].sv_mrr_money);
            }

            html += '<tr><td>' + new Date(data[i].sv_mrr_date).Format("yyyy-MM-dd hh:mm:ss") + '</td> <td>' + str + parseFloat(data[i].sv_mrr_money).toFixed(2) + '</td> <td>' + data[i].sv_mrr_present + '</td> <td>' + data[i].consumeusername + '</td><td>' + data[i].memberuserName + '</td></tr>';

        }

        $("#chongji").html(html);
        $(".chongji").text(parseFloat(cid).toFixed(2));
    });

    var xxjili = 0.00;
    // 查询会员消费记录,改查销售订单
    // 默认查询本月，3个月和全部的消费记录
    getMemberSalesList(30);
    //$.getJSON("/settle/Getxiaofei/" + id + "", function (data) {
    //    html = ' ';
    //    for (var i = 0; i < data.length; i++) {
    //        var product_num = data[i].sv_pricing_method == 1 ? data[i].sv_p_weight : data[i].product_num;
    //        html += '<tr><td style="text-align:left;max-width:200px;">' + data[i].product_name + '</td> <td>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</td><td><i>' + data[i].product_unitprice + '</i></td> <td>' + product_num + '</td><td>1</td><td><i>' + data[i].product_total + '</i></td> <td>' + data[i].consumeusername + '</td>  </tr>';
    //        xxjili += data[i].product_total;
    //    }

    //    //alert(JSON.stringify(data));
    //    $("#xxjili").text(Math.round(xxjili * 100) / 100);
    //    $("#xiaofeijilu").html(html);
    //});


    $("#li_user_info_get_sales_30").on("click", function () {
        if (!$("#li_user_info_get_sales_30").hasClass("active")) {
            $("#li_user_info_get_sales_30").addClass("active");
        }
        if ($("#li_user_info_get_sales_90").hasClass("active")) {
            $("#li_user_info_get_sales_90").removeClass("active");
        }
        if ($("#li_user_info_get_sales_all").hasClass("active")) {
            $("#li_user_info_get_sales_all").removeClass("active");
        }
        getMemberSalesList(30);
    });
    $("#li_user_info_get_sales_90").on("click", function () {
        if ($("#li_user_info_get_sales_30").hasClass("active")) {
            $("#li_user_info_get_sales_30").removeClass("active");
        }
        if (!$("#li_user_info_get_sales_90").hasClass("active")) {
            $("#li_user_info_get_sales_90").addClass("active");
        }
        if ($("#li_user_info_get_sales_all").hasClass("active")) {
            $("#li_user_info_get_sales_all").removeClass("active");
        }
        getMemberSalesList(90);
    });
    $("#li_user_info_get_sales_all").on("click", function () {
        if ($("#li_user_info_get_sales_30").hasClass("active")) {
            $("#li_user_info_get_sales_30").removeClass("active");
        }
        if ($("#li_user_info_get_sales_90").hasClass("active")) {
            $("#li_user_info_get_sales_90").removeClass("active");
        }
        if (!$("#li_user_info_get_sales_all").hasClass("active")) {
            $("#li_user_info_get_sales_all").addClass("active");
        }
        getMemberSalesList("");
    });

    function getMemberSalesList(day) {
        var loadIndex = commonOpenLoading();
        $.getJSON("/intelligent/GetIntelligentSalesList/?payname=&day=" + day + "&type=1&key=" + id + "&liushui=&page=1&pagesize=20&storeid=-1&memberId=" + id + "", function(result) {
            commonCloseLoading(loadIndex);
            if (result && result.orderList) {
                var data = result.orderList;
                var product_Number = '';
                html = ' ';
                for (var i = 0; i < data.length; i++) {
                    var data_prlist = result.orderList[i].prlist;
                    var moreProducthtml = '';//销售商品列表
                    html += '<tr>';
                    html += '<td>' + data[i].order_id + '</td>';//订单号
                    html += '<td class="moreProduct">';//商品名称和数量
                    for (var j = 0; j < data_prlist.length ; j++) {
                        if (data_prlist[j].sv_pricing_method == 0) {
                            product_Number = data_prlist[j].product_num;
                        } else {
                            product_Number = data_prlist[j].sv_p_weight;
                        }
                        moreProducthtml += '<p>' + data_prlist[j].product_name + '*' + product_Number + '</p></br>';//商品名称
                    }
                    html += '' + moreProducthtml + '</td><td>' + (data[i].order_receivable || 0).toFixed(2) + '</td>';//消费金额
                    html += '<td>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</td>';//店铺的时间
                    html += '<td style="text-align:center;max-width:200px;">' + data[i].consumeusername + '</td>';//店铺名称
                    html += '</tr>';
                }

                $("#xxjili").text(result.totalAmount);
                $("#xiaofeijilu").html(html);
            }
        });
    }


    $.getJSON("/Ajaxdata/GetChargeList/" + id, { "clas": "", "page": -1 }, function (data) {
        html = "";
        for (var i = 0; i < data.length; i++) {

            html += '<tr>';
            html += '<td>' + data[i].sv_mcr_productname + '</td>';
            html += '<td>' + data[i].sv_mcr_count + '</td>';
            html += '<td>' + data[i].sv_mcr_countafter + '</td>';
            html += '<td>' + data[i].sv_mcr_date + '</td>';
            html += '<td>' + data[i].consumeusername + '</td>';
            html += '<td>' + data[i].memberuserName + '</td>';
            html += ' </tr>';

        }

        $("#cilog").html(html);
    });


    $.getJSON("/Ajaxdata/GetCharge/" + id, function (data) {

        //<p>有效日期 <span>2016-05-17</span></p>
        $("#diaobox").append(' <li> <a href="javascript:void(0)"  onclick="chsaisi2($(\'.sv_mr_cardno\').text(),\'\',\'\')" class="fibbtn"><i class="icon-plus"></i>  <span>新增计次项目</span> </a></li>');

        for (var i = 0; i < data.length; i++) {
            var adsd = data[i].getvalidity == true ? "已到期" : new Date(data[i].validity_date).Format("yyyy-MM-dd");
            $("#diaobox").append('  <li><div class="toptop"><span>' + data[i].sv_p_name + '</span> <a href="javascript:void(0)" onclick="chsaisi2($(\'.sv_mr_cardno\').text(),\'' + data[i].product_id + '\',\'' + data[i].sv_p_name + '\')" class="milefts">充次</a> </div><div class="botbot"><p>剩余次数 <span>' + data[i].sv_mcc_leftcount + '次</span></p><p>有效日期 <span>' + adsd + '</span></p></div></li>');
        }

    });


    $.getJSON("/Ajaxdata/GetCreditsLog/" + id, function (data) {
        if (data) {
            //<p>有效日期 <span>2016-05-17</span></p>
            for (var i = 0; i < data.length; i++) {
                var sv_mpr_pointdif = "";
                if (data[i].sv_mpr_type == 0) {
                    sv_mpr_pointdif = '+' + data[i].sv_mpr_pointdif;
                } else {
                    sv_mpr_pointdif = '-' + data[i].sv_mpr_pointdif;
                }
                $("#jifenlog").append('<tr><td>' + sv_mpr_pointdif + '</td> <td>' + data[i].sv_mpr_reason + '</td> <td>' + new Date(data[i].sv_mpr_date).Format("yyyy-MM-dd hh:mm:ss") + '</td><td>' + data[i].consumeusername + '</td><td>' + data[i].memberuserName + '</td></tr>');
            }
        }

    });

}
//启用充值方法
function chsaisi(id, useriid) {
    useriid = useriid || $("#userid").val();
    id = id || $(".sv_mr_cardno").text();
    var str_Is_open_commission = Is_open_commission == false ? 0 : 1;
    layer.open({
        type: 2,
        title: '会员管理',
        shadeClose: true,
        shade: 0.8,
        area: ['80%', '90%'],
        content: '/member/savings/?x=1#' + id + "@" + useriid + "@" + str_Is_open_commission //iframe的url
    });
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

function ImportData() {

};
//会员导入加载数据
function memberlist(data) {
    if (!data) {
        data = g_import_member_data_list;
    }
    var html = "";
    if (data != undefined) {
        for (var i = 0; i < data.length; i++) {
            html += '<tr data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-member_id="' + data[i].member_id + i + '" ';
            html += 'data-sv_mr_name="' + data[i].sv_mr_name + '" data-sv_mr_mobile="' + data[i].sv_mr_mobile + '" ';
            html += 'data-sv_mr_nick = "' + data[i].sv_mr_nick + '" data-sv_mg_name="' + data[i].sv_mg_name + '" ';
            html += 'data-sv_mr_qq="' + data[i].sv_mr_qq + '" data-sv_mr_wechat="' + data[i].sv_mr_wechat + '" data-sv_mr_email = "' + data[i].sv_mr_email + '" ';
            html += 'data-sv_mr_address = "' + data[i].sv_mr_address + '" data-sv_mr_birthday="' + data[i].sv_mr_birthday + '" ';
            html += 'data-sv_mr_favorite = "' + data[i].sv_mr_favorite + '" data-sv_mr_remark="' + data[i].sv_mr_remark + '" data-sv_mw_availableamount="' + data[i].sv_mw_availableamount + '" ';
            html += 'data-sv_mw_sumamount="' + data[i].sv_mw_sumamount + '" data-sv_mw_availablepoint = "' + data[i].sv_mw_availablepoint + '" data-sv_mw_sumpoint = "' + data[i].sv_mw_sumpoint + '" ';
            html += 'data-sv_mr_adddate= "' + data[i].sv_mr_adddate + '" data-sv_mr_deadline="' + data[i].sv_mr_adddate + '" ';
            html += '>';
            html += '    <td id="sv_mr_cardno_' + i + '">' + data[i].sv_mr_cardno + '</td>';
            html += '    <td id="sv_mr_name_' + i + '">' + data[i].sv_mr_name + '</td>';
            html += '    <td  id="sv_mr_mobile_' + i + '">' + data[i].sv_mr_mobile + '</td>';
            html += '    <td id="sv_mr_nick_' + i + '">' + data[i].sv_mr_nick + '</td>';
            html += '    <td id="sv_ml_name_' + i + '">' + data[i].sv_ml_name + '</td>';
            html += '    <td id="sv_mg_name_' + i + '">' + data[i].sv_mg_name + '</td>';
            html += '    <td id="sv_mr_qq_' + i + '">' + data[i].sv_mr_qq + '</td>';
            html += '    <td id="sv_mr_wechat_' + i + '">' + data[i].sv_mr_wechat + '</td>';
            html += '    <td id="sv_mr_email_' + i + '">' + data[i].sv_mr_email + '</td>';
            html += '    <td id="sv_mr_address_' + i + '">' + data[i].sv_mr_address + '</td>';
            if (data[i].sv_mr_birthday == null)
                html += '<td id="sv_mr_birthday_' + i + '"></td>';
            else
                html += '<td id="sv_mr_birthday_' + i + '">' + data[i].sv_mr_birthday.replace(/([\d\-]+)T(\d+:\d+)\:.*/, "$1 $2") + '</td>';
            html += '    <td id="sv_mr_favorite_' + i + '" >' + data[i].sv_mr_favorite + '</td>';
            html += '    <td id="sv_mr_remark_' + i + '">' + data[i].sv_mr_remark + '</td>';
            html += '    <td id="sv_mw_availableamount_' + i + '">' + data[i].sv_mw_availableamount + '</td>';
            html += '    <td id="sv_mw_sumamount_' + i + '">' + data[i].sv_mw_sumamount + '</td>';
            html += '    <td id="sv_mw_availablepoint_' + i + '">' + data[i].sv_mw_availablepoint + '</td>';
            html += '    <td id="sv_mw_sumpoint_' + i + '">' + data[i].sv_mw_sumpoint + '</td>';
            if (data[i].sv_mr_adddate == null)
                html += '    <td></td>';
            else
                html += '    <td>' + data[i].sv_mr_adddate.replace(/([\d\-]+)T(\d+:\d+)\:.*/, "$1 $2") + '</td>';
            if (data[i].sv_mr_deadline == null || data[i].sv_mr_deadline.substr(0, 4) == '9999' || data[i].sv_mr_deadline.substr(0, 4) == '0001')
                html += '    <td ></td>';
            else
                html += '    <td >' + data[i].sv_mr_deadline.replace(/([\d\-]+)T(\d+:\d+)\:.*/, "$1 $2") + '</td>';
            //html += '   <td style = "width:60px;"><a href="javascript:void(0);" class="updatetr"  onclick="updatetr(this)">编辑</a></td>';
            html += '   </tr>';
        }
        $("#momberListhtml").html(html);
    }
};

var g_import_member_data_list = [];
function memberlist1(data) {
    memberlist(data);
};
//关闭窗口
function shutDown() {
    layer.closeAll("page");
};
//编辑修改
function updatetr(btn) {
    //
    //sv_mr_nick_
    //sv_ml_name_
    //sv_mg_name_
    var tr = btn.parentElement.parentElement;
    var tdnumber = $(tr).find("td").length;
    var inputnumber = tr.getElementsByTagName('input');
    if (inputnumber.length <= 0) {
        for (var i = 0; i < tdnumber - 1; i++) {
            var td = tr.cells[i];
            if (td.id.indexOf("sv_mr_nick_") > 0) {
                var select = document.createElement("select");
                select.calss = "form-control";
                select.id = td.id;
                select.name = td.id;
                td.appendChild(select);
                selectBox(td.id);
                var t1 = $("#" + td.id);
                for (i = 0; i < t1.length; i++) {//给select赋值  
                    if (selectValue == t1.options[i].value) {
                        t1.options[i].selected = true
                    }
                }
                td.innerHTML = ""

            }
            else if (td.id.indexOf("sv_ml_name_") >= 0) {
                var select = document.createElement("select");
                select.calss = "form-control";
                select.id = td.id;
                select.name = td.id;
                td.appendChild(select);
                selectBox(td.id);
                var t1 = $("#" + td.id);
                for (i = 0; i < t1.length; i++) {//给select赋值  
                    if (selectValue == t1.options[i].value) {
                        t1.options[i].selected = true
                    }
                }
                td.innerHTML = ""
            }
            else if (td.id.indexOf("sv_mg_name_") >= 0) {
                var select = document.createElement("select");
                select.calss = "form-control";
                select.id = td.id;
                select.name = td.id;
                td.appendChild(select);
                selectBox(td.id);
                var t1 = $("#" + td.id);
                for (i = 0; i < t1.length; i++) {//给select赋值  
                    if (selectValue == t1.options[i].value) {
                        t1.options[i].selected = true
                    }
                }
                td.innerHTML = ""
            }
            else {
                var txt = document.createElement("input");
                txt.type = "text";
                txt.style = "width:60px;";
                txt.value = td.innerHTML;
                td.innerHTML = "";
                td.appendChild(txt);
            }
        }
    };
};
//改变时间文本框
function updatedate(id) {
    var start = {
        elem: '#' + id.id,
        format: 'YYYY/MM/DD hh:mm:ss',
        max: '2099-06-16 23:59:59', //最大日期
        istime: false,
        istoday: false,
        choose: function (datas) {
        }
    };
    laydate(start);
    laydate.skin('molv');//主题皮肤
};
//会员称谓	会员等级	会员分组 选择框加载
function selectBox(id) {
    $.get("/Ajaxdata/GetUserconfig", function (data) {
        //  alert(data);
        $("#" + id.id).empty();
        for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
            $("#" + id).append("<option value='" + data.sv_uc_callnameList[i] + "'>" + data.sv_uc_callnameList[i] + "</option>");

        }

        if (!data.GetUserLevel) {

            data.GetUserLevel = data.getUserLevel;
        }
        if (!data.GetMembergroup) {

            data.GetMembergroup = data.getMembergroup;
        }
        ///读取会员级别
        for (var i = 0; i < data.GetUserLevel.length; i++) {
            $("#" + id).append("<option value='" + data.GetUserLevel[i].memberlevel_id + "'>" + data.GetUserLevel[i].sv_ml_name + "</option>");
        }
        ///读取会员分组
        for (var i = 0; i < data.GetMembergroup.length; i++) {
            $("#" + id).append("<option value='" + data.GetMembergroup[i].membergroup_id + "'>" + data.GetMembergroup[i].sv_mg_name + "</option>");
        }
    });
};

// 保存会员导入数据
function savememberlist() {
    var loadIndex = commonOpenLoading();
    $.getJSON("/member/SaveMember/", { strPath: strPath }, function (data)
        //var postdata = { strPath: strPath, membergroup_id: ($("#membergroup_import_id").val()), memberlevel_id: ($("#memberlevel_import_id").val()), data: JSON.stringify(g_import_member_data_list) };

        //$.post("/member/SaveMemberById", postdata, function(data)
    {
        commonCloseLoading(loadIndex);
        if (data.success) {
            if (isNullOrWhiteSpace(data.message)) {
                if (isNullOrWhiteSpace(data.url) && data.message != "-4") {
                    layer.msg("保存成功！但是存在错误数据,点击下方连接查看");
                    $("#errordata").show();
                    $("#errordata").val(data.url);
                    $("#errordata").attr("href", data.url)
                } else {
                    if (data.message == "-4") {
                        layer.msg("保存失败，超出会员上限，请升级高级版本");
                    }
                    else { layer.msg("保存失败！请联系负责人"); }

                }
            } else {
                layer.msg("保存成功！");
                layer.close(index);
                queryClik(0, 0, 0)
            }
        } else {
            if (isNullOrWhiteSpace(data.message)) {
                if (isNullOrWhiteSpace(data.url) && data.message != "-4") {
                    layer.msg("保存失败！详情请点击下方连接查看");
                    $("#errordata").show();
                    $("#errordata").val(data.url);
                    $("#errordata").attr("href", data.url)
                } else {
                    if (data.message == "-4") {
                        layer.msg("保存失败，超出会员上限，请升级高级版本");
                    }
                    else { layer.msg("保存失败！请联系负责人"); }
                }
            } else {
                layer.msg("保存失败！");
            }
        }
    })
    //var date = "[";
    //var trrows = $("#momberListhtml tr");
    //for (var i = 0; i < trrows.length; i++)//循环遍历所有的tr行
    //{
    //    date += "{"
    //    for (var j = 0; j < trrows[i].cells.length; j++)//取得第几行下面的td个数，再次循环遍历该行下面的td元素
    //    {
    //        var cell = trrows[i].cells[j];//获取某行下面的某个td元素

    //        date += '"' + cell.id.substr(0, cell.id.indexOf('@')) + '"' + ":" + cell.innerHTML + ",";

    //    };
    //    date += +"}";
    //};
    //    date+="]";
};

function errordataDownload() {
    Cef.Download($("#errordata").val())
}
function membersTemplete(url) {
    location.href = url;
    Cef.Download(url);
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
                    if ($("#sv_commissionemployes").val().indexOf(data[i].sv_employee_id) >= 0 && $("#sv_mrr_operator").val().indexOf(data[i].sv_employee_name) >= 0) {
                        html += '<li style="float:left; width:50%;text-align:center; position relative" class="regbtn active" data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    } else {
                        html += '<li style="float:left; width:50%;text-align:center; position relative" class="regbtn " data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    }
                }
                else {

                    if ($("#sv_commissionemployes").val().indexOf(data[i].sv_employee_id) >= 0 && $("#sv_mrr_operator").val().indexOf(data[i].sv_employee_name) >= 0) {
                        html += '<li style="float:right;width:50%;text-align:center; position relative"  class="regbtn active" data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    } else {
                        html += '<li style="float:right;width:50%;text-align:center; position relative"  class="regbtn " data-employee_id="' + data[i].sv_employee_id + '" data-configtype="' + data[i].sv_configtype + '" data-employee_name="' + data[i].sv_employee_name + '">';
                    }
                }

                html += '<i><img  class="img-circle" style="width:49px;height:49px"  src="/images/001.png"  onerror="javascript:this.src ="/images/001.png";"/>';//后期替换头像
                html += '<h2  style="width:90%">' + data[i].sv_employee_name + '</h2></i>';
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
        $("#sv_commissionemployes").val("");
        $("#sv_mrr_operator").val("");
        layer.close(index);
    });
    GetEmployessid();
}
//获取选中的员工id
function GetEmployessid() {

    $("#btnSalesclerk").click(function () {
        var StrEmployeelId = "";
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
        $("#sv_commissionemployes").val(StrEmployeelId);
        $("#sv_mrr_operator").val(strEmployee_name);
        layer.close(index);
    });
}

function DeleteCustom(strtid) {
    $("#" + strtid).remove();
    $.post("/AjaxProduct/UpdateCustomFieldCommonItems?id=" + strtid, function (data) {
        if (data == true) {
            layer.msg("删除成功");
        }
        else if (data == -2) {
            layer.msg("你没有该操作权限");
        }
        else {
            layer.msg("删除失败");
        }
    });
}

function UpdatePassword() {
    $('#btnSaveChangePwd').click(function () {
        var oldPassword = $('#oldPassword').val() || "";
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();
        var pa = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,15}$/;
        //if (!isNullOrWhiteSpace(oldPassword)) {
        //    layer.msg("原密码不能为空！");
        //    $('#oldPassword').focus();
        //}else
        if (!isNullOrWhiteSpace(newPassword)) {
            layer.msg("新密码不能为空！");
            $('#newPassword').focus();
        }
        else if (newPassword == oldPassword) {
            layer.msg("新密码不能和旧密码相同！");
            $('#newPassword').focus();
        }
            //else if (!pa.test(newPassword)) {
            //    layer.msg("新密码输入必须是6-15位字母、数字或特殊符号组成！");
            //    $('#newPassword').focus();
            //}
        else if (!isNullOrWhiteSpace(confirmPassword)) {
            layer.msg("确认新密码不能为空");
            $('#confirmPassword').focus();
        }
        else if (newPassword != confirmPassword) {
            layer.msg("两次输入的新密码不一致！");
            $('#confirmPassword').focus();
        }
        else {
            $.postAsyncJson('/Ajaxdata/updateUserPassword', { "oldPassword": oldPassword, "newPassword": newPassword, "userid": $("#userid").val(), "menberid": $('input[name="subbox"]:checked').val() }, function (data) {
                if (data == 1) {
                    layer.msg("密码修改成功！");
                    layer.close(index);
                }
                else if (data == -5) {
                    $('#oldPassword').focus();
                    layer.msg("原密码输入错误！");
                } else if (data == -3) {
                    layer.msg("当前会员不支持跨店操作");
                    setTimeout(function () {
                        layer.closeAll();
                    }, 800);
                }
                else if (data == -2) {
                    layer.msg("你没有该操作权限！");
                    layer.close(index);
                }
                else {
                    layer.msg("密码修改失败,请刷新后再重试！");
                    layer.close(index);
                }
            });
        }
    });



}

//侦听F3按键
if ((typeof bindICCardEvent) == "undefined") {
    parent.bindICCardEvent($("#indexquery_like"));
} else {
    bindICCardEvent($("#indexquery_like"));
}

//根据等级获取对应的配置值
function GetConfigdataBylevel(memberlevel) {
    configleveldata = [];
    if (Preferential_TopUpGiving_ConfigList != null) {
        var ConfigList = Preferential_TopUpGiving_ConfigList
        for (var i = 0; i < ConfigList.length; i++) {
            if (ConfigList[i].sv_user_leveltype_id == memberlevel) {
                configleveldata.push(ConfigList[i]);
            }
        }
    }
}
//计算赠送
function CalculateGiving() {
    var sv_mrr_amountbefore = parseFloat($("#sv_mrr_money").val() || 0);
    $("#StoredRemark").text("");
    var deserved = 0;
    var detail_value = 0;
    var givingtype = 0;
    if (configleveldata != "" && configleveldata.length > 0) {
        for (var i = 0; i < configleveldata.length; i++) {
            if (configleveldata[i].sv_detail_is_enable) {
                var proportionalue = configleveldata[i].sv_detali_proportionalue;
                if (proportionalue <= sv_mrr_amountbefore) {
                    detail_value = parseInt(configleveldata[i].sv_detail_value);
                    givingtype = configleveldata[i].sv_user_givingtype;
                    deserved = detail_value;
                    $("#sv_user_givingtype").val(givingtype);
                    $("#sv_detali_proportionalue").val(proportionalue);
                    $("#sv_detail_value").val(detail_value)
                    if (deserved > 0) {
                        $("#StoredRemark").text("*充值" + sv_mrr_amountbefore + "元,活动充值" + proportionalue + "元赠送" + deserved + (givingtype == 1 ? "积分" : "元储值现金"));
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
        $("#sv_mrr_present").val(0);

    }
    if (givingtype == 2) {
        $("#sv_mrr_present").val(deserved);
    }
    var sv_mrr_present = $("#sv_mrr_present").val() || 0;
    $("#huoji").text(parseFloat(sv_mrr_present) + parseFloat(sv_mrr_amountbefore));
}
//推荐人选择回调
function recommendedpeople() {
    GetList2("");
    $("#query_like").keyup(function () {
        GetList2($("#query_like").val());
    });


}
//推荐人选择
function GetList2(key) {
    var index2 = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
    $.get("/ajaxdata/GetMemberList/1", { "key": key, "pageSize": 30 }, function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += ' <tr data-user_id="' + data[i].user_id + '"  data-sv_mr_cardno="' + data[i].sv_mr_cardno + '" data-id="' + data[i].member_id + '" data-name="' + data[i].sv_mr_name + '" data-isoverdue="' + data[i].isOverdue + '">';
            html += '    <td><span>' + data[i].sv_mr_cardno + '</span></td>';
            html += '    <td><span>' + data[i].sv_mr_name + '</span></td>';
            html += '    <td><span>' + data[i].sv_mr_mobile + '</span></td>';
            html += '   <td><i>¥' + data[i].sv_mw_availableamount + '</i></td>';
            if (data[i] != null && data[i].sv_mw_credit != null) {
                html += '  <td><i>¥' + data[i].sv_mw_credit + '</i></td>';
                if (parseFloat( data[i].sv_mw_credit||0) <= 0) {
                    $("#collection").text("收款记录");
                }
            } else {
                html += '  <td><i>¥0.00</i></td>';
                $("#collection").text("收款记录");
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
        layer.close(index2);
        //点击选择
        $("#userlist").on("click", ".xianzhehuiyan", function () {
            if ($(this).data("isoverdue")) {
                layer.msg("此卡已过期");
            } else {
                if (this.id == 1) {
                    layer.msg("此卡已挂失");
                } else {
                    //$("#userid").val($(this).parent().parent().data("user_id"));
                    //搜索会员
                    $("#sv_recommended_peopleid").val($(this).parent().parent().data("id"));
                    $("#sv_recommended_peoplename").val($(this).parent().parent().data("name"));
                    layer.close(index);
                }
            }
        });

        //双击行
        $("#userlist").on("dblclick", "tr", function () {
            //搜索会员
            if ($(this).data("isoverdue")) {
                layer.msg("此卡已过期");
            } else {
                if ($(this).find("td").eq(6).attr("id") == 1) {
                    layer.msg("此卡已挂失");
                } else {
                    //$("#userid").val($(this).data("user_id"));
                    $("#sv_recommended_peopleid").val($(this).data("id"));
                    $("#sv_recommended_peoplename").val($(this).data("name"));
                    layer.close(index);
                }
            }

        });
    });
    $("#guanbinimab").click(function () {
        layer.close(index);
    });
}

//导入会员默认选择会员等级，会员分组---重复调用接口改动
//(function ($) {
//    $.get("/Ajaxdata/GetUserconfig", function (data) {
//        $("#memberlevel_import_id,#membergroup_import_id").empty();
//        if (!data.GetUserLevel) {

//            data.GetUserLevel = data.getUserLevel;
//        }
//        if (!data.GetMembergroup) {

//            data.GetMembergroup = data.getMembergroup;
//        }
//        ///读取会员级别
//        for (var i = 0; i < data.GetUserLevel.length; i++) {
//            $("#memberlevel_import_id").append("<option value='" + data.GetUserLevel[i].memberlevel_id + "'>" + data.GetUserLevel[i].sv_ml_name + "</option>");
//        }
//        ///读取会员分组
//        for (var i = 0; i < data.GetMembergroup.length; i++) {
//            $("#membergroup_import_id").append("<option value='" + data.GetMembergroup[i].membergroup_id + "'>" + data.GetMembergroup[i].sv_mg_name + "</option>");
//        }
//    });
//})(jQuery);

function collectionpage() {
    $("#creditquedin").unbind("click").bind("click", function () {
        if (infoListHuanKuan.length > 0) {
            for (var i = 0; i < infoListHuanKuan.length; i++) {
                infoListHuanKuan[i].sv_payment_method_name = $("#sv_payment_method_name").val();
            }
            $.ajax({
                url: "/Ajaxdata/Repayment",
                data: JSON.stringify(infoListHuanKuan),
                type: "POST",
                contentType: "application/json",
                success: function (result) {
                    if (result == true) {
                        for (var k = 0; k < infoListHuanKuan.length; k++) {
                            var trs = $("#huankuanTBody").children("tr");
                            if (trs && trs.length > 0) {
                                for (var i = 0; i < trs.length; i++) {
                                    var orderId = $(trs[i]).children("td").eq(1).text();
                                    if (orderId == infoListHuanKuan[k].orderId) {
                                        var huankuanzonge = parseFloat($(".sv_mw_credit").text());
                                        var huankuanjine = parseFloat($(trs[i]).children("td").eq(4).find("input").val());
                                        if (infoListHuanKuan[k].maximum == huankuanjine) {
                                            $(trs[i]).remove();
                                        } else {
                                            $(trs[i]).children("td").eq(4).find("input").val((parseFloat(infoListHuanKuan[k].maximum || 0) - huankuanjine).toFixed(2));
                                            $(trs[i]).children("td").eq(3).text((parseFloat(infoListHuanKuan[k].maximum || 0) - huankuanjine).toFixed(2));
                                        }
                                        $(".sv_mw_credit").text((huankuanzonge - huankuanjine).toFixed(2));
                                        if ((huankuanzonge - huankuanjine).toFixed(2) <= 0) {
                                            $("#collection").text("收款记录");
                                        }
                                    }
                                }
                            }
                        }
                        infoListHuanKuan = [];
                        layer.msg("还款成功！");
                    } else {
                        if ($("#sv_payment_method_name").val().indexOf( "储值卡")!=-1) {
                            layer.msg("还款失败,储值卡金额不足！");
                        } else {
                            layer.msg("还款失败！");
                        }
                    }
                    selectChange();
                }
            });
        } else {
            layer.msg("请选择还款订单");
        }
    });
    var sv_pay_record_id = [];
   
    $("#GetRepaymentList").unbind("click").bind("click", function () {
        $("#deleteshezhangjilu").show();
        $("#deleteshezhangjilu").unbind("click").bind("click", function () {
            $.ajax({
                url: "/Ajaxdata/DeleteArrearsList",
                data: JSON.stringify(sv_pay_record_id),
                type: "POST",
                contentType: "application/json",
                success: function (result) {
                    if (result == true) {
                        layer.msg("删除成功！");
                        for (var i = 0; i < sv_pay_record_id.length; i++) {
                            var trs = $("#RepaymentList").children("tr");
                            if (trs && trs.length > 0) {
                                for (var k = 0; k < trs.length; k++) {
                                    var deleteidlist =$(trs[k]).children("td").eq(0).find(".checkinput").attr("sv_pay_record_id");
                                    if (deleteidlist == sv_pay_record_id[i]) {
                                        $(trs[k]).remove();
                                        break;
                                    }
                                }
                            }
                        }
                        sv_pay_record_id=[];
                    } else {
                        layer.msg("删除失败！");
                    }
                }
            });
        });
        $.get("/Ajaxdata/GetRepaymentList?memberid=" + $(".member_id").text()
           , function (data) {
               if (data) {
                   var html = "";
                   for (var i = 0; i < data.length; i++) {
                       html += '<tr><td><input type="checkbox" sv_pay_record_id=' + data[i].sv_pay_record_id + ' class="checkinput" name="name" value="" /></td>';
                       html += '<td>' + data[i].sv_order_id + '</td><td>¥' + data[i].sv_money + '</td><td>' + data[i].sv_payment_method_name + '</td><td>' + new Date(data[i].sv_date).Format("yyyy-MM-dd hh:mm:ss") + '</td>';
                       html += '<td class="text-center">';
                       if (data[i].sv_note) {
                           html += '<i class="icon-info-sign tips" data-content="' + data[i].sv_note + '"></i>';
                       }
                       html += '</td></tr>';
                   }
                   $("#RepaymentList").html(html);
                  
                   $(".checkinput").unbind("click").bind("click", function () {
                       sv_pay_record_id = [];
                       var trs = $("#RepaymentList").children("tr");
                       if (trs && trs.length > 0) {
                           for (var i = 0; i < trs.length; i++) {
                               if ($(trs[i]).children("td").eq(0).find(".checkinput").is(':checked')) {
                                   sv_pay_record_id[sv_pay_record_id.length] = $(trs[i]).children("td").eq(0).find(".checkinput").attr("sv_pay_record_id");
                               } else {
                                   $("#jiluselectall").prop('checked', false)
                               }
                           }
                       }
                   });
                   $("#jiluselectall").unbind("click").bind("click", function () {
                       var trs = $("#RepaymentList").children("tr");
                       if ($("#jiluselectall").is(':checked')) {
                           if (trs && trs.length > 0) {
                               for (var i = 0; i < trs.length; i++) {
                                   $(trs[i]).children("td").eq(0).find(".checkinput").prop('checked', true);
                               }
                           }
                       } else {
                           if (trs && trs.length > 0) {
                               for (var i = 0; i < trs.length; i++) {
                                   $(trs[i]).children("td").eq(0).find(".checkinput").prop('checked', false);
                               }
                           }
                       }
                       sv_pay_record_id = [];
                       var trs = $("#RepaymentList").children("tr");
                       if (trs && trs.length > 0) {
                           for (var i = 0; i < trs.length; i++) {
                               if ($(trs[i]).children("td").eq(0).find(".checkinput").is(':checked')) {
                                   sv_pay_record_id[sv_pay_record_id.length] = $(trs[i]).children("td").eq(0).find(".checkinput").attr("sv_pay_record_id");
                               } else {
                                   $("#jiluselectall").prop('checked', false)
                               }
                           }
                       }
                   });
               }
           });
    });
    $("#deleteshezhangjilu").hide();
    $.get("/Ajaxdata/GetArrearsList?memberid=" + $(".member_id").text(), function (data) {
        var html = "";
        if (data) {
            for (var i = 0; i < data.length; i++) {
                html += ' <tr><td><input type="checkbox" class="checkinput creditcheckbox" name="name" value="" /></td>' +
                    '<td style="cursor:pointer;" shezhangdindanhao="' + data[i].sv_mw_order_id + '" class="ordertoptr" >' + data[i].sv_mw_order_id + '</td><td>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</td><td>' + data[i].order_money2 + '</td><td><input type="text" onchange="inputvaluechange(this);" style="display:inline-block;width:160px;margin-left:5px;" class="form-control receivableamount" maximum="' + data[i].order_money2 + '" value="' + data[i].order_money2 + '"/></td>'
                   ' </tr>';

                for (var k = 0; k < data[i].order_product.length; k++) {
                    html += ' <tr class="children" hidden="hidden"  shezhangdindanhao="' + data[i].sv_mw_order_id + '"><td></td>' +
                    '<td>' + data[i].order_product[k].product_name + '</td><td></td><td>' + data[i].order_product[k].product_total + '</td><td></td>' +
                   '</tr>';
                }
            }
        }
        $("#huankuanTBody").html(html);
       
        
        $(".ordertoptr").bind("click", function () {
            if ($(this).attr("showitem") == null || $(this).attr("showitem") == "hide") {
                $(this).attr("showitem", "show");
                $(this).parent("tr").addClass("open");
            } else {
                $(this).attr("showitem", "hide");
                $(this).parent("tr").removeClass("open");
            }
            var trs = $("#huankuanTBody").children("tr");
            if (trs && trs.length > 0) {
                for (var i = 0; i < trs.length; i++) {
                    if ($(trs[i]).attr("shezhangdindanhao") == $(this).attr("shezhangdindanhao") && $(trs[i]).attr("showitem") == null) {
                        var segdhsdsd = $(this).attr("showitem");
                        if ($(this).attr("showitem") == "show" || $(this).attr("showitem") == null) {
                            $(trs[i]).show();
                        } else {
                            $(trs[i]).hide();
                        }
                        
                    } 
                }
            }
        });
        shijianbangdin();
    });
}
function inputvaluechange(obj) {
    if ($(obj) != null && parseFloat($(obj).attr("maximum") || 0) < parseFloat($(obj).val() || 0)) {
        $(obj).val($(obj).attr("maximum"));
        layer.msg("收账金额不能大于" + $(obj).attr("maximum") + "！");
    }
    if (parseFloat($(obj).val() || 0) <= 0) {
        $(obj).val($(obj).attr("maximum"));
        layer.msg("收账金额不能小于等于0！");
    }
    selectChange();
}

var infoListHuanKuan = [];
//循环赊账列表，看选择了哪些订单
//计算收款金额
function selectChange() {
    infoListHuanKuan = [];
    var sum = 0;
    var dindan = "";
    var trs = $("#huankuanTBody").children("tr");
    if (trs && trs.length > 0) {
        for (var i = 0; i < trs.length; i++) {
            if ($(trs[i]).children("td").eq(0).find(".checkinput").is(':checked')) {
                var info = {
                    orderId: $(trs[i]).children("td").eq(1).text(),
                    money: $(trs[i]).children("td").eq(4).find("input").val(),
                    memberid: $(".member_id").text(),
                    sv_payment_method_name: $("#sv_payment_method_name").val(),
                    sv_note: $("#sv_note").val(),
                    sv_money: $(trs[i]).children("td").eq(4).find("input").val(),
                    sv_operator: _g_user_config.order_operator,
                    maximum: $(trs[i]).children("td").eq(3).text()
                }
                infoListHuanKuan[infoListHuanKuan.length] = info;
                dindan += $(trs[i]).children("td").eq(1).text() + ",";
                sum += parseFloat($(trs[i]).children("td").eq(4).find("input").val() || 0);
            } else {
                if ($(trs[i]).children("td").eq(0).find("input").length>0) {
                    $("#huankuanSelectAll").prop('checked', false);
                }
            }
        }
    }
    $("#huankuanjiner").text(sum.toFixed(2));
    $("#huankuandindan").val(dindan);
}

function shijianbangdin() {
    $("#deleteshezhangjilu").hide();
    $(".creditcheckbox").unbind("click").bind("click", function () {
        selectChange();
    });
    $("#huankuanSelectAll").unbind("click").bind("click", function () {
        var trs = $("#huankuanTBody").children("tr");
        var flag = false;
        if ($(this).is(':checked')) {
            flag = true;
        }
        if (trs && trs.length > 0) {
            for (var i = 0; i < trs.length; i++) {
                $(trs[i]).children("td").eq(0).find(".checkinput").prop('checked', flag)
            }
        }
        selectChange();
    });
}
GetStorelistShaiXuan();
//分店信息
function GetStorelistShaiXuan() {
    //$.get('/BranchStore/GetStorelist/?type=' + 0, function (data) {
    //    if (data == -2) {
    //    }
    //    else {
    //        var listhtml;
    //        for (var theadKey in data) {
    //            listhtml += data[theadKey];
    //        }
    //        if (listhtml) {
    //            $("#StoreMember").append(listhtml);
    //        }
    //    }
    //});
    $("#StoreMember").on("change", function () {
        //GetList(1, 0, 0, 0, "", "", "");
        queryPageCount(1, 0, 0, 0, "", "", "");
    });
}
$("#sv_reg_source").on("change", function() {
    //GetList(1, 0, 0, 0, "", "", "");
    queryPageCount(1, 0, 0, 0, "", "", "");
});

//获取操作员信息
function GetOperaterList() {
    //var html = '<option value="">操作员</option>';
    //$.getJSON("/Salesclerk/PageList/", { page: 1, pagesize: 100 }, function(data) {
    //    if (data != null)
    //    {
    //        for (var i = 0; i < data.length; i++)
    //        {
    //            if (isNullOrWhiteSpace(data[i].sv_employee_name))
    //            {
    //                html += '<option value="' + data[i].sp_salesclerkid + '">' + data[i].sv_employee_name + '</option>';
    //            }
    //            else
    //            {
    //                html += '<option value=""></option>';
    //            }
    //        }
    //    }
    //    $("#sellerlist").html(html);
    //});

    $("#sellerlist").on("change", function() {
        //GetList(1, 0, 0, 0, "", "", "");
        queryPageCount(1, 0, 0, 0, "", "", "");
    });
}