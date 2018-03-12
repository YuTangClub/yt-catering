/// <reference path="../html/system/changepwd.html" />
/// <reference path="../html/system/changepwd.html" />
/// <reference path="../html/system/changepwd.html" />

var verificationValue = "decerp.cn";
//ajax--ajaxSetup全局设置的方法
//$.ajaxSetup({
//    beforeSend: function (xhr) {
//        if (!this.url.startsWith('http://'))
//        {
//            //可以设置自定义标头
//            xhr.setRequestHeader('decerp-verification', verificationValue);
//        }
//    }
//});

//更新公告版本号
var _g_update_flag = 22;
//更新公告版本号

var _g_old_url = "http://decerp.cc";//图片之前旧的域名
var thisimgsrc = "";//返回当前的路径
var thisImgArrySrc = new Array();//图片路径的数组
//判断商品图片路径的方法
//data图片的数据
//field字段
//oldsrc旧的地址
//newsrc新的地址
function judgmentimgsrcFn(data, oldsrc, newsrc) {
    if (data) {
        var datalength = data.length;
        for (var i = 0; i < datalength; i++) {
            if (data[i].sv_p_images2 != "" && data[i].sv_p_images2 != null && data[i].sv_p_images2 != undefined) {
                if (data[i].sv_p_images2.indexOf(oldsrc) > -1) {
                    thisimgsrc = data[i].sv_p_images2.replace(oldsrc, newsrc);
                    thisImgArrySrc.push(thisimgsrc);
                } else if (data[i].sv_p_images2.indexOf(newsrc) > -1) {
                    thisimgsrc = data[i].sv_p_images2;
                    thisImgArrySrc.push(thisimgsrc);
                } else {
                    thisimgsrc = _g_res_images_url + data[i].sv_p_images2;
                    thisImgArrySrc.push(thisimgsrc);
                }
            } else {
                thisimgsrc = "/images/002.png";
                thisImgArrySrc.push(thisimgsrc);
            }
        }
        return thisImgArrySrc;
    }
}

//获取当天时间
function getNowFormatDate(selectorStarDate, selectorEndDate) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + "/" + month + "/" + strDate + " " + "23" + ":" + "59" + ":" + "59";
    var starDate = date.getFullYear() + "/" + month + "/" + strDate + " " + "00" + ":" + "00" + ":" + "00";
    $("#" + selectorStarDate).val(starDate);
    $("#" + selectorEndDate).val(currentDate);
}

//编辑器上传图片的改变图片的相对路径
var newphotosrcarray = new Array();
function uploadNewPhotoSrcFn(newphotosrc) {
    if (newphotosrc && newphotosrc.attr("src")) {
        var sv_detail_value_imgsrc = newphotosrc.attr("src");
        if (sv_detail_value_imgsrc.indexOf("http://") > -1) {
            var indexOfUploadImg = sv_detail_value_imgsrc.indexOf("/UploadImg");
            sv_detail_value_imgsrc = newphotosrc.attr("src").substr(indexOfUploadImg);
        } else {
            sv_detail_value_imgsrc = newphotosrc.attr("src");
        }
    } else {
        sv_detail_value_imgsrc = "";
    }
    return newphotosrcarray.push(sv_detail_value_imgsrc);
}

//tip效果
$(document).on("mouseover", ".tips", function () {

    index = layer.tips($(this).data("content"), $(this), {
        tips: [2, '#ffefe3'],
        style: ['background-color:#FFF8ED; color:#000; border:1px solid #FF9900', '#FF9900'],
        maxWidth: 440,
        time: 6000
    });
});
////登录相关操作方法
loggin = {
    chklogn: function (type) {
        if (type == -1) {
            layer.alert("登录已失效，请重新登录！", function () { window.location.href = "/login.html"; });
            return;
        }
    }
};

function setAvailableIntegralSwitch(Switch) {
    var svUserConfigdetailId;
    var svDetailValue;
    var svUserConfigId;
    var svUserModuleId;
    PreferentialTopUpGivingConfigList("availableIntegralSwitch", "availableIntegralSwitch");
    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
        //MembershipGradeGroupingIsON = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable; // 积分规则开关
        svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
        svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
        svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
        svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
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
        "sv_detail_is_enable": Switch,
        "sv_user_configdetail_name": "是否按可用积分晋升",
        "sv_remark": "是否按可用积分晋升"
    };
    detaillist.push(data);

    $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=MembershipGradeGrouping',
            detaillist, function (result) {
                if (result) {
                    if (result == 1) {
                        availableIntegralSwitch = Switch;
                        layer.msg("保存成功");
                        getPrintSetingInfo();
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

//时间 加天数
Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz
    laydate.skin('molv');//主题皮肤
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var dijige = 0;
//仓库相关的
var warehouse = {

    //供应商管理
    supplier: function () {
        getpage("");

        function getpage(key) {

            //初始化分页内容
            $.get("/supplier/suppliercount?key=" + key, function (data) {
                loggin.chklogn(data);
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

                        crts(e.curr, key);

                    }
                });
            });
        }

        //默认加载数据
        function crts(id, key) {

            $.getJSON("/supplier/supplierlist?id=" + id + "&key=" + key, function (data) {
                loggin.chklogn(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var date = new Date(data[i].sv_suaddtime).Format("yyyy-MM-dd hh:mm:ss");
                    html += '<tr><td><div class="check-box "><i><input type="checkbox" name="subbox" value="' + data[i].sv_suid + '"></i></div></td> ';
                    if (isNullOrWhiteSpace(data[i].sv_suname)) {
                        html += '<td class="cour"><span data-id="' + data[i].sv_suid + '" class="showinfo2" >' + data[i].sv_suname + '</span></td>';
                    }
                    else {
                        html += '<td class="cour"><span data-id="' + data[i].sv_suid + '" class="showinfo" ></span></td>';
                    }
                    html += '<td><i>¥' + data[i].arrears + '</i></td>';
                    html += ' <td><i>¥' + data[i].receivable + '</i></td> ';
                    if (isNullOrWhiteSpace(data[i].sv_sulinkmnm)) {
                        html += '<td><span>' + data[i].sv_sulinkmnm + '</span></td>';
                    }
                    else {
                        html += '<td><span></span></td>';
                    }
                    if (isNullOrWhiteSpace(data[i].sv_sumoble)) {
                        html += '<td><span>' + data[i].sv_sumoble + '</span></td>';
                    }
                    else {
                        html += '<td><span></span></td>';
                    }
                    html += '<td><span>' + date + '</span></td>';
                    if (isNullOrWhiteSpace(data[i].sv_suoperation)) {
                        html += '<td><span>' + data[i].sv_suoperation + '</span></td>';//</tr>
                    }
                    else {
                        html += '<td><span></span></td>';//</tr>
                    }
                    //alert(data[i].sv_suid);
                    //html += '<td><div class="xstbbtn"><a href="javascript:void(0);" class="showview"  data-id="' + data[i].sv_suid + '">还款记录</a></div></td>';


                    html += '<td>';
                    html += '<a href="javascript:void(0);" class="supplierrepay"  data-id="' + data[i].sv_suid + '">还款</a>';

                    html += '｜<a href="javascript:void(0);" class="showview"  data-id="' + data[i].sv_suid + '">收付记录</a>';
                    html += '</td>';

                    html += '</tr>';
                }
                $("#newwlist").html(html);
            });
        }





        $(document).on("click", ".showinfo", function () {
            dijige = $(this).data("id");
            Deke.DeKe_dialog.show_Url2('供应商详细信息', '/html/supplier/viewinfo.html?v=17', supplierGet, ['670px', '540px']);

        });

        $(document).on("click", "#supplierBaochun", function () {

            //
            if ($("#sv_suname").val().length < 2) {
                layer.msg("请输入供应商的名字");
                $("#sv_suname").focus();
                return;
            }
            //
            if ($("#sv_sulinkmnm").val().length < 2) {
                layer.msg("请输入联系人的名字");
                $("#sv_sulinkmnm").focus();
                return;
            }

            if ($("#sv_sumoble").val().length < 2) {
                layer.msg("请输入联系电话");
                $("#sv_sumoble").focus();
                return;
            }

            $.ajax({
                url: '/supplier/Addsupplier',
                type: 'post',
                data: JSON.stringify($("#addsupplier").serializeArray()),
                contentType: 'application/json',
                async: false,
                success: function (data) {
                    loggin.chklogn(data);
                    // alert(data);
                    if (data == 1) {
                        getpage('');
                        var index = layer.confirm("供应商操作成功，是否继续操作？", { btn: ["关闭", "继续操作"] },
                              function () {
                                  layer.closeAll();
                              },
                              function () {

                                  layer.close(index);
                              });
                    } else if (data == -2) {
                        layer.msg("供应商已经存在记录中");
                        layer.close(index);
                    }
                    else if (data == -4) {
                        layer.msg("你没有该操作权限");
                        layer.close(index);
                    }
                    else {
                        layer.msg("供应商操作失败，请刷新重试");
                        layer.close(index);
                    }
                }
            });


        });

        //修改供应商
        $("#update").click(function () {

            if ($('input[name="subbox"]:checked').length == 1) {

                Deke.DeKe_dialog.show_Url2('修改供应商', '/html/supplier/editinfo.html?v=15', supplierGet, ['420px', '540px']);

            } else {

                layer.msg("请先择您要修改的供应商，不能选择多个！");
            }
        });

        $("#query_like").keyup(function () {

            getpage($("#query_like").val());
        });

        $("#refresh").click(function () {
            //getpage($("#query_like").val());
            getpage("");
        });

        //删除供应商
        $("[data-name='delete']").click(function () {

            if ($('input[name="subbox"]:checked').length == 1) {

                //  Deke.DeKe_dialog.show_Url2('修改供应商', '/html/supplier/editinfo.html?v=15', supplierGet, ['420px', '540px']);
                layer.confirm("您确认要删除先中的供应商吗？", function () {

                    $.post("/supplier/supplierdelete", { id: $('input[name="subbox"]:checked').val() }, function (data) {
                        loggin.chklogn(data);
                        if (data == -1) {
                            layer.alert("登录已失效，请重新登录！");
                            window.location.href = "/login.html";
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限");
                        }
                        else {
                            layer.msg("删除成功");
                            getpage('');

                        }
                    });

                });

            } else {

                layer.msg("请先择您要修改的供应商，不能选择多个！");
            }
        });
        //
        function supplierGet() {

            if (dijige == 0) {
                dijige = $('input[name="subbox"]:checked').val();
            } else {

                $("#jilulist").html("");
                $("#chchchchchcch").data("id", dijige);

                $.getJSON("/supplier/getsupplierlog?logid=" + $("#chchchchchcch").data("id"), function (data) {
                    for (i = 0; i < data.length; i++) {
                        $("#jilulist").append('<tr><td><span>' + (i + 1) + '</span></td> <td><span>' + new Date(data[i].sv_pc_date).Format("yyyy-MM-dd") + '</span></td><td><span>' + data[i].sv_p_name + '</span></td><td><span>' + data[i].sv_p_unit + '</span></td><td><span>' + data[i].sv_pc_pnumber + '</span></td><td><i>' + data[i].sv_pc_price + '</i></td> </tr>');
                    }

                    $("#gongcjjososos").text(data.length);

                });
                //会员详细信息移动TAB事件
                $('#xqtabbox li').hover(function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    var index = $('#xqtabbox li').index(this);
                    $('.reclxqtab>div').eq(index).fadeIn(50).siblings().fadeOut(0);

                });

                $("#chchchchchcch").keydown(function (e) {
                    if (e.keyCode == "13") {
                        $("#jilulist").html("");
                        $.getJSON("/supplier/getsupplierlog?logid=" + $("#chchchchchcch").data("id") + "&key=" + $(this).val(), function (data) {
                            for (i = 0; i < data.length; i++) {
                                $("#jilulist").append('<tr><td><span>' + (i + 1) + '</span></td> <td><span>' + new Date(data[i].sv_pc_date).Format("yyyy-MM-dd") + '</span></td><td><span>' + data[i].sv_p_name + '</span></td><td><span>' + data[i].sv_p_unit + '</span></td><td><span>' + data[i].sv_pc_pnumber + '</span></td><td><i>' + data[i].sv_pc_price + '</i></td> </tr>');
                            }
                            $("#gongcjjososos").text(data.length);


                        });
                    }
                });


            }
            $.get("/supplier/supplierlist?pp=" + dijige, function (data) {
                loggin.chklogn(data);
                for (var key in data) {
                    if (key == "sv_mr_birthday") {

                        var t = new Date(data[key]).Format("yyyy-MM-dd");
                        if (t == "1-01-01") {
                            t = "";
                        }
                        $("#" + key).val(t);
                        $("." + key).text(t);

                    } else {
                        $("." + key).text(data[key]);
                        $("#" + key).val(data[key]);
                    }
                }

                //   GetUserdata = data;
                dijige = 0;
            });
        }


    },
    //采购页面，采购相关
    procurement: function () {



        //初始货供应商
    }
};

// 标签打印配置
function saveBackSelectLabel(data) {
    $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=SetTardware', data, function (result) {
        if (result) {
            if (result == 1) {
                layer.msg("保存成功");
                getPrintSetingInfo();
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

// 保存开关设置
function printSetEnable(moduleId, configId, enable, type) {
    $.postAsyncJson('/UserModuleConfig/ConfigdetailOperatePrintSet', {
        moduleId: moduleId,
        configId: configId,
        enable: enable == true ? false : true
    }, function (result) {
        if (result == true) {
            if (enable) {
                $('.PrintSet_network_enable').removeClass('open');
            }
            else {
                $('.PrintSet_network_enable').addClass('open');
            }
            layer.msg('保存设置成功！');
        }
        else {
            layer.msg('保存设置失败，请稍后重试！');
        }
    });
}

// 保存打印设置信息
function savePrintSet() {
    var detaillist = [];
    var reg = new RegExp("^[0-5]*$");
    var reg_default = new RegExp("^[1-5]*$");
    var printSet_network = $('#PrintSet_network').val().trim();
    var printSet_default = $('#PrintSet_default').val().trim();
    var printSet_enable = $('.printSet_enable').hasClass('open');
    var printSet_default_device = $('#PrintSet_default_device').val();
    var printSet_network_device = $('#PrintSet_network_device').val();
    if (!reg.test(printSet_network) || printSet_network > 5) {
        layer.msg("请输入数字，并且最多只能打印5份");
        $('#PrintSet_network').focus();
        return;
    }

    if (!reg_default.test(printSet_default) || printSet_default > 5) {
        layer.msg("请输入数字，前台打印机只能输入1到5份");
        $('#PrintSet_default').focus();
        return;
    }

    $(".form-txtPrint").each(function () {
        var data = {
            "sv_user_configdetail_id": parseInt($(this).attr('data-id') || 0),
            "sv_detail_value": $(this).val(),
            "sv_user_config_id": parseInt($(this).attr("data-configid") || 0),
            "sv_user_module_id": parseInt($(this).attr("data-moduleid") || 0),
            "sv_detail_is_enable": true,
            "sv_user_configdetail_name": $(this).attr('data-name'),
            "sv_remark": "打印机设置"
        };
        if (data.sv_user_config_id != 0) detaillist.push(data);
    });
    if (detaillist.length != 0) {
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=SetTardware', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.msg("保存成功");
                    getPrintSetingInfo();
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
}

// 读取打印机设置
function getPrintSetingInfo() {
    $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=PrintSeting', function (result) {
        if (result != null)
        {
            var childInfolist = result.childInfolist;
            if (childInfolist != null && childInfolist.length > 0) {
                for (var i = 0; i < childInfolist.length; i++)
                {
                    //初始化控件属性
                    $('#' + childInfolist[i].sv_user_config_code).attr('data-id', 0).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);

                    if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0)
                    {
                        var childDetailList = childInfolist[i].childDetailList[0];
                        if (childDetailList != null)
                        {
                            $('#' + childInfolist[i].sv_user_config_code).attr('data-id', childDetailList.sv_user_configdetail_id);//初始化ID
                            if (childDetailList.sv_detail_value) $('#' + childInfolist[i].sv_user_config_code).val(childDetailList.sv_detail_value);//初始化值

                            if (childInfolist[i].sv_user_config_code == 'PrintSet_network_enable')
                            {
                                if (childDetailList.sv_detail_is_enable)
                                {
                                    $('.PrintSet_network_enable').addClass('open');
                                }
                                $('.PrintSet_network_enable').attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                            }

                            if (childInfolist[i].sv_user_config_code == 'PrintSet_default_device' && childDetailList.sv_detail_value != null && childDetailList.sv_detail_value != '')
                            {
                                if ($('#PrintSet_default_device').html() != null && $('#PrintSet_default_device').html() != '')
                                {
                                    $('#PrintSet_default_device').val(childDetailList.sv_detail_value);
                                }
                                else
                                {
                                    $('#' + childInfolist[i].sv_user_config_code).html('<option value="' + childDetailList.sv_detail_value + '">' + childDetailList.sv_detail_value + '</option>');
                                }
                            }
                            if (childInfolist[i].sv_user_config_code == 'PrintSet_network_device' && childDetailList.sv_detail_value != null && childDetailList.sv_detail_value != '')
                            {
                                if ($('#PrintSet_network_device').html() != null && $('#PrintSet_network_device').html() != '')
                                {
                                    $('#PrintSet_network_device').val(childDetailList.sv_detail_value);
                                }
                                else
                                {
                                    $('#' + childInfolist[i].sv_user_config_code).html('<option value="' + childDetailList.sv_detail_value + '">' + childDetailList.sv_detail_value + '</option>');
                                }
                            }
                            // 标签机前台
                            if (childInfolist[i].sv_user_config_code == 'PrintSet_network_device_font_islabel' && childDetailList.sv_detail_value != null && childDetailList.sv_detail_value != '')
                            {
                                if (childDetailList.sv_detail_is_enable == true)
                                {
                                    $('#PrintSet_network_device_font_islabel').addClass('on');
                                }
                            }
                            // 标签机前台
                            if (childInfolist[i].sv_user_config_code == 'PrintSet_network_device_back_islabel' && childDetailList.sv_detail_value != null && childDetailList.sv_detail_value != '')
                            {
                                if (childDetailList.sv_detail_is_enable == true)
                                {
                                    $('#PrintSet_network_device_back_islabel').addClass('on');
                                }
                            }
                        }
                        //else
                        //{
                        //    if (childInfolist[i].sv_user_config_code == 'PrintSet_network_enable')
                        //    {
                        //        $('.PrintSet_network_enable').attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                        //    }
                        //    $('#' + childInfolist[i].sv_user_config_code).attr('data-id', 0).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                        //}
                    }
                        
                }
            }
        }
    });
}

// 保存硬件设置
function saveSetHardware() {
    if ($('#SetTardware_type').val() == '2') {
        layer.msg("暂不支持");
        return;
    }
    var detaillist = [];
    $(".form-setTardware").each(function () {
        var data = {
            "sv_user_configdetail_id": parseInt($(this).attr('data-id')),
            "sv_detail_value": $(this).val(),
            "sv_user_config_id": parseInt($(this).attr("data-configid")),
            "sv_user_module_id": parseInt($(this).attr("data-moduleid")),
            "sv_detail_is_enable": true,
            "sv_user_configdetail_name": $(this).attr('data-name'),
            "sv_remark": "IC卡设置"
        };
        detaillist.push(data);
    });
    if (detaillist.length != 0) {
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=SetTardware', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.msg("保存成功");
                    _g_is_ic_pwd = $("#SetTardware_pwd").val();
                    getUserModuleConfigList();
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
}

// 保存硬件设置--客显配置
function saveSetHardware_CusDisplay() {
    var detaillist = [];
    $(".form-setHardwareCusDisplay").each(function () {
        var data = {
            "sv_user_configdetail_id": parseInt($(this).attr('data-id')),
            "sv_detail_value": $(this).val(),
            "sv_user_config_id": parseInt($(this).attr("data-configid")),
            "sv_user_module_id": parseInt($(this).attr("data-moduleid")),
            "sv_detail_is_enable": true,
            "sv_user_configdetail_name": $(this).attr('data-name'),
            "sv_remark": "客显配置"
        };
        detaillist.push(data);
    });
    if (detaillist.length != 0) {
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=Set_Hardware_CusDisplay', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.msg("保存成功");
                    getUserModuleConfigList();
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
}

// 保存硬件设置--电子秤配置
function saveSetHardware_Scale() {
    var detaillist = [];
    $(".form-Set_Hareware_Scale").each(function () {
        var data = {
            "sv_user_configdetail_id": parseInt($(this).attr('data-id')),
            "sv_detail_value": $(this).val(),
            "sv_user_config_id": parseInt($(this).attr("data-configid")),
            "sv_user_module_id": parseInt($(this).attr("data-moduleid")),
            "sv_detail_is_enable": true,
            "sv_user_configdetail_name": $(this).attr('data-name'),
            "sv_remark": "电子秤设置"
        };
        detaillist.push(data);
    });
    if (detaillist.length != 0) {
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=Set_Hareware_Scale', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.msg("保存成功");
                    getUserModuleConfigList();
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
}


// 保存硬件设置-分屏配置
function saveSetHardware_SecondScreen() {
    var detaillist = [];
    $(".form-Set_Hardware_SecondScreen").each(function () {
        if ($(this).attr("src")) {
            var sv_detail_value_imgsrc = $(this).attr("src");
            if (sv_detail_value_imgsrc.indexOf("http://") > -1) {
                var indexOfUploadImg = $(this).attr("src").indexOf("/UploadImg");
                sv_detail_value_imgsrc = $(this).attr("src").substr(indexOfUploadImg);
            } else {
                sv_detail_value_imgsrc = $(this).attr("src");
            }
        }
        var data = {
            "sv_user_configdetail_id": parseInt($(this).attr('data-id')),
            "sv_detail_value": sv_detail_value_imgsrc,
            "sv_user_config_id": parseInt($(this).attr("data-configid")),
            "sv_user_module_id": parseInt($(this).attr("data-moduleid")),
            "sv_detail_is_enable": true,
            "sv_user_configdetail_name": $(this).attr('data-name'),
            "sv_remark": "分屏设置"
        };
        detaillist.push(data);
    });
    if (detaillist.length != 0) {
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=Set_Hardware_SecondScreen', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.msg("保存成功");
                    getUserModuleConfigList();
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
}


// 保存米T1硬件设置-分屏配置
function saveSetHardware_T1SecondScreen() {
    var loadIndex = layer.load(1, { shade: [0.1, '#000'] });
    var detaillist = [];
    $("#Set_Pos_T1_SecondScreen_Size").attr("data-value", $("#Set_Pos_T1_SecondScreen_Size1").is(':checked'));
    $("#Set_Pos_T1_SecondScreen_Style").attr("data-value", $(".displayblockphoto li.active").index());

    var imglist = "";

    if ($("#uploadfileboxsunmi .photoimagesbox") && $("#uploadfileboxsunmi .photoimagesbox").length > 0) {
        for (var i = 0; i < $("#uploadfileboxsunmi .photoimagesbox").length; i++) {
            if (i == $("#uploadfileboxsunmi .photoimagesbox").length - 1) {
                imglist += $("#uploadfileboxsunmi .photoimagesbox").eq(i).children('img').attr('src');
            } else {
                imglist += $("#uploadfileboxsunmi .photoimagesbox").eq(i).children('img').attr('src') + ",";
            }
        }
    }

    $("#Set_Pos_T1_SecondScreen_Images").attr("data-value", imglist);
    $("#Set_Pos_T1_SecondScreen_Video").attr("data-value", $("#Set_Pos_T1_SecondScreen_Video").val());

    $(".form-Set_Hardware_T1SecondScreen").each(function () {
        var data = {
            "sv_user_configdetail_id": parseInt($(this).attr('data-id')),
            "sv_detail_value": $(this).attr("data-value"),
            "sv_user_config_id": parseInt($(this).attr("data-configid")),
            "sv_user_module_id": parseInt($(this).attr("data-moduleid")),
            "sv_detail_is_enable": true,
            "sv_user_configdetail_name": $(this).attr('data-name'),
            "sv_remark": "安卓商米T1分屏设置"
        };
        detaillist.push(data);
    });
    if (detaillist.length != 0) {
        $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=Set_Pos_T1_SecondScreen', detaillist, function (result) {
            if (result) {
                if (result == 1) {
                    layer.close(loadIndex);
                    layer.msg("保存成功");
                    getUserModuleConfigList();
                }
                else if (result == -2) {
                    layer.close(loadIndex);
                    layer.msg("你没有该操作权限！");
                }
                else {
                    layer.close(loadIndex);
                    layer.msg("保存失败");
                }
            }
        });
    }
}

// 读取IC硬件设置
function getUserModuleConfigList() {
    $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=SetTardware', function (result) {
        if (result != null) {
            var childInfolist = result.childInfolist;
            if (childInfolist != null && childInfolist.length > 0) {
                for (var i = 0; i < childInfolist.length; i++)
                {
                    if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0) {
                        var childDetailList = childInfolist[i].childDetailList[0];
                        if (childDetailList != null)
                        {
                            if (childDetailList.sv_detail_is_enable)
                            {
                                $('#' + childInfolist[i].sv_user_config_code).val(childDetailList.sv_detail_value).attr('data-id', childDetailList.sv_user_configdetail_id).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);

                                $('.setTardware').addClass('open');
                                $('#show_setTardware').css('display', 'block');
                            }
                            else
                            {
                                $('#show_setTardware').css('display', 'none');
                            }
                        }
                        else
                        {
                            $('#' + childInfolist[i].sv_user_config_code).attr('data-id', 0).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                        }
                    }
                }
            }
        }
    });
}

// 读取客显硬件设置
function getUserModuleConfigList_CusDisplay() {
    $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=Set_Hardware_CusDisplay', function (result) {
        if (result != null) {
            var childInfolist = result.childInfolist;
            if (childInfolist != null && childInfolist.length > 0) {
                for (var i = 0; i < childInfolist.length; i++)
                {
                    if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0) {
                        var childDetailList = childInfolist[i].childDetailList[0];
                        if (childDetailList != null)
                        {
                            if (childDetailList.sv_detail_is_enable)
                            {
                                $('#' + childInfolist[i].sv_user_config_code).val(childDetailList.sv_detail_value).attr('data-id', childDetailList.sv_user_configdetail_id).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);

                                $('.setHardwareCusDisplay').addClass('open');
                                $('#show_setHardwareCusDisplay').css('display', 'block');
                            }
                            else
                            {
                                $('#show_setHardwareCusDisplay').css('display', 'none');
                            }
                        }
                        else
                        {
                            $('#' + childInfolist[i].sv_user_config_code).attr('data-id', 0).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                        }
                    }
                }
            }
        }
    });
}

// 读取电子秤硬件设置
function getUserModuleConfigList_Scale() {
    $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=Set_Hareware_Scale', function (result) {
        if (result != null) {
            var childInfolist = result.childInfolist;
            if (childInfolist != null && childInfolist.length > 0) {
                for (var i = 0; i < childInfolist.length; i++)
                {
                    if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0) {
                        var childDetailList = childInfolist[i].childDetailList[0];
                        if (childDetailList != null)
                        {
                            if (childDetailList.sv_detail_is_enable)
                            {
                                $('#' + childInfolist[i].sv_user_config_code).val(childDetailList.sv_detail_value).attr('data-id', childDetailList.sv_user_configdetail_id).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);

                                $('.Set_Hareware_Scale').addClass('open');
                                $('#show_Set_Hareware_Scale').css('display', 'block');
                            }
                            else
                            {
                                $('#show_Set_Hareware_Scale').css('display', 'none');
                            }
                        }
                        else
                        {
                            $('#' + childInfolist[i].sv_user_config_code).attr('data-id', 0).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                        }
                    }
                }
            }
        }
    });
}

// 读取分屏硬件设置
function getUserModuleConfigList_SecondScreen() {
    $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=Set_Hardware_SecondScreen', function (result) {
        if (result != null) {
            var childInfolist = result.childInfolist;
            if (childInfolist != null && childInfolist.length > 0) {
                for (var i = 0; i < childInfolist.length; i++)
                {
                    if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0) {
                        var childDetailList = childInfolist[i].childDetailList[0];
                        if (childDetailList != null)
                        {
                            if (childDetailList.sv_detail_is_enable)
                            {
                                $('#' + childInfolist[i].sv_user_config_code).val(childDetailList.sv_detail_value).attr('data-id', childDetailList.sv_user_configdetail_id).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                                $('#' + childInfolist[i].sv_user_config_code).attr("src", _g_res_images_url + childDetailList.sv_detail_value);
                                $('.Set_Hardware_SecondScreen').addClass('open');
                                $('#show_Set_Hardware_SecondScreen').css('display', 'block');
                            }
                            else
                            {
                                $('#show_Set_Hardware_SecondScreen').css('display', 'none');
                            }
                        }
                        else
                        {
                            $('#' + childInfolist[i].sv_user_config_code).attr('data-id', 0).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                        }
                    }
                }
            }
        }
    });
}

// 读取安卓商米T1分屏硬件设置
function getUserModuleConfigList_T1SecondScreen() {
    $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=Set_Pos_T1_SecondScreen', function (result) {
        if (result != null) {
            var childInfolist = result.childInfolist;
            if (childInfolist != null && childInfolist.length > 0) {
                for (var i = 0; i < childInfolist.length; i++)
                {
                    if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0) {

                        var childDetailList = childInfolist[i].childDetailList[0];
                        if (childDetailList != null)
                        {
                            if (childDetailList.sv_detail_is_enable)
                            {
                                $('#' + childInfolist[i].sv_user_config_code).val(childDetailList.sv_detail_value).attr('data-id', childDetailList.sv_user_configdetail_id).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                                $('#' + childInfolist[i].sv_user_config_code).attr("data-value", childDetailList.sv_detail_value);
                                $('.Set_Pos_T1_SecondScreen_Enable').addClass('open');
                                $("#androiddisplay").parent("span").addClass("open");
                                $("#androiddisplay").show(0);
                                //屏幕尺寸
                                if (childInfolist[i].sv_user_config_code == "Set_Pos_T1_SecondScreen_Size")
                                {

                                    if (childDetailList.sv_detail_value == "true")
                                    {
                                        $("#Set_Pos_T1_SecondScreen_Size0").removeAttr("checked");
                                        $("#Set_Pos_T1_SecondScreen_Size1").attr("checked", true);
                                        $(".displayblockphoto li:eq(0)").children().children("img").attr("src", "../../images/Size14.png");
                                    } else
                                    {
                                        $("#Set_Pos_T1_SecondScreen_Size0").attr("checked", true);
                                        $("#Set_Pos_T1_SecondScreen_Size1").removeAttr("checked");
                                        $(".displayblockphoto li.siez14").hide();
                                    }
                                }
                                //分屏样式
                                if (childInfolist[i].sv_user_config_code == "Set_Pos_T1_SecondScreen_Style")
                                {
                                    if (childDetailList.sv_detail_value >= 0)
                                    {
                                        $(".displayblockphoto li").eq(childDetailList.sv_detail_value).addClass("active");
                                    }
                                    if (childDetailList.sv_detail_value == 2 || childDetailList.sv_detail_value == 3)
                                    {
                                        $("#uploadfileboxvideo").hide();
                                        $("#uploadfileboxsunmi").show();
                                    } else if (childDetailList.sv_detail_value == 4 || childDetailList.sv_detail_value == 5)
                                    {
                                        $("#uploadfileboxsunmi").hide();
                                        $("#uploadfileboxvideo").show();
                                    } else
                                    {
                                        $("#uploadfileboxsunmi").hide();
                                        $("#uploadfileboxvideo").hide();
                                    }
                                }
                                //轮播图片
                                if (childInfolist[i].sv_user_config_code == "Set_Pos_T1_SecondScreen_Images")
                                {
                                    if (childDetailList.sv_detail_value)
                                    {
                                        var _imgs = childDetailList.sv_detail_value.split(',');
                                        var _imgshtml = '';
                                        $("#uploadfileboxsunmi .photoimagesbox").remove();
                                        for (var j = 0; j < _imgs.length; j++)
                                        {
                                            _imgshtml += '<div class="photoimagesbox displayimg fl">';
                                            _imgshtml += '<img src="' + _imgs[j] + '"><button class="deletethisimg btn">删除</button>';
                                            _imgshtml += '</div>';
                                        }
                                        $("#uploadfileboxsunmi").prepend(_imgshtml);
                                    }
                                }
                                //视频URL
                                if (childInfolist[i].sv_user_config_code == "Set_Pos_T1_SecondScreen_Video")
                                {
                                    $("#Set_Pos_T1_SecondScreen_Video").val(childDetailList.sv_detail_value || "");
                                }
                            }
                            else
                            {
                                $('.Set_Pos_T1_SecondScreen_Enable').removeClass('open');
                                $("#androiddisplay").parent("span").removeClass("open");
                                $("#androiddisplay").hide(0);
                            }
                        }
                        else
                        {
                            $('#' + childInfolist[i].sv_user_config_code).attr('data-id', 0).attr('data-moduleid', result.sv_user_module_id).attr('data-configid', childInfolist[i].sv_user_config_id);
                        }
                    }
                }
            }
        }
    });
}


var index = 0;
var animationMode = 5;//layer弹窗0-6的动画形式，-1不开启

var Deke = {

    /// <signature>
    ///   <summary>弹窗</summary>
    /// </signature>
    DeKe_dialog: {

        /// <signature>
        ///   <summary>创建弹窗</summary>
        /// </signature>
        show_Url: function (title, url, btn, c, f, area) {

            $.get(url, function (data) {
                index = layer.open({
                    type: 1, //page层
                    title: title,
                    shade: 0.6, //遮罩透明度
                    moveType: 1, //拖拽风格，0是默认，1是传统拖动
                    shift: animationMode, //0-6的动画形式，-1不开启
                    area: area || ['620px', '540px'], //宽高
                    closeBtn: 1,
                    content: data,
                    scrollbar: false,
                    btn: btn,//可以无限个按钮
                    yes: c,
                    success: function () {
                        if (f) {
                            f();
                        }
                    }
                });
            });
        },

        show_Url2: function (title, url, f, area) {
            $.get(url, function (data) {
                index = layer.open({
                    type: 1, //page层
                    title: title,
                    shade: 0.6, //遮罩透明度
                    moveType: 1, //拖拽风格，0是默认，1是传统拖动
                    shift: animationMode, //0-6的动画形式，-1不开启
                    area: area || ['620px', '540px'], //宽高
                    closeBtn: 1,
                    content: data,
                    scrollbar: false,
                    success: function () {
                        if (f) {
                            f();
                        }
                    }
                });
            });

        },
        show_Url2WithData: function (title, url, f, area, fdata) {
            $.get(url, function (data) {
                index = layer.open({
                    type: 1, //page层
                    title: title,
                    shade: 0.6, //遮罩透明度
                    moveType: 1, //拖拽风格，0是默认，1是传统拖动
                    shift: animationMode, //0-6的动画形式，-1不开启
                    area: area || ['620px', '540px'], //宽高
                    closeBtn: 1,
                    content: data,
                    scrollbar: false,
                    success: function () {
                        if (f) {
                            f(fdata);
                        }
                    }
                });
            });

        },
        show_Url2WithDataNoCloseBtn: function (title, url, f, area, fdata) {
            $.get(url, function (data) {
                index = layer.open({
                    type: 1, //page层
                    title: title,
                    shade: 0.6, //遮罩透明度
                    moveType: 1, //拖拽风格，0是默认，1是传统拖动
                    shift: animationMode, //0-6的动画形式，-1不开启
                    area: area || ['620px', '540px'], //宽高
                    closeBtn: 0,
                    content: data,
                    scrollbar: false,
                    success: function () {
                        if (f) {
                            f(fdata);
                        }
                    }
                });
            });

        },
        show_Url3: function (title, url, f, area, id) {


            $.get(url, function (data) {
                index = layer.open({
                    id: id,
                    type: 1, //page层
                    title: title,
                    shade: 0.6, //遮罩透明度
                    moveType: 1, //拖拽风格，0是默认，1是传统拖动
                    shift: animationMode, //0-6的动画形式，-1不开启
                    area: area || ['620px', '540px'], //宽高
                    closeBtn: 1,
                    content: data,
                    scrollbar: false,
                    success: function () {
                        if (f) {
                            f();
                        }
                    }

                });
            });

        },
        /// <signature>
        ///   <summary>加载HTML</summary>
        /// </signature>
        loadHtml: function (url, typeid) {

            $("#" + typeid).load(url);

        }





        ////判断是否第一层
        //if ($(".modal-backdrop").length > 0) {
        //    $(".modal-backdrop").each(function () {

        //        $(this).css("z-index", 1010);
        //    });
        //    $(".modal").each(function () {

        //        $(this).css("z-index", 1020);
        //    });

        //}
        ////生成代码
        //var id = Math.floor(Math.random() * 99999 + 1);
        //$('<div class="modal " id="' + id + '"><div class="modal-dialog"><div class="modal-content" id="modal-content' + id + '"></div><!-- /.modal-content --></div><!-- /.modal --> </div>').appendTo(".motaikuang");
        //if (url != null) {

        //    $("#modal-content" + id).load(url);

        //}

        //$('#' + id).modal('show');
        //$('#' + id).on('hide.bs.modal', function () {
        //    $('#' + id).remove();
        //});
        //,
        ///// <signature>
        /////   <summary>确认框（注意，C 是function 方法）</summary>
        ///// </signature>
        //confirm: function (title, mes, c) {

        //    a = title;
        //    title = title || "系统提示";
        //    var html=' <div class="modal " id="Duihgift">';
        //    html+='<div class="modal-dialog" > <div class="modal-content">';
        //    html+=' <div class="modal-header">';
        //    html+='   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        //    html+=' <h4 class="modal-title"> '+title+' </h4>';
        //    html+=' </div>';
        //    html+='<div class="modal-body">';
        //    html+='<div class="titlebox">';
        //    html += '<h3><i class=" icon-question-sign"></i><span>' + mes + '</span></h3>';
        //    html += '</div></div><div class="modal-footer">';
        //    if (a == null) {
        //        html += ' <button type="button" class="button  button-default button-rounded button-small" data-dismiss="modal">我知道了</button>';
        //    }
        //    else {
        //        html += '  <button type="button" class="button  button-primary button-rounded button-small" id="confirmok">确认</button>';
        //        html += ' <button type="button" class="button  button-default button-rounded button-small" data-dismiss="modal">取消</button>';
        //    }
        //    html += ' </div>';
        //    html += ' </div></div> </div>';
        //    $('#Duihgift').on('hide.bs.modal', function () {
        //        $('#Duihgift').remove();
        //    });
        //    $(".motaikuang").append(html);
        //    $('#Duihgift').modal('show');
        //    $("#confirmok").click(c);
        //},
        ///// <signature>
        /////   <summary>Alert提示框</summary>
        ///// </signature>
        //Alert: function (mes)
        //{

        //    Deke.DeKe_dialog.confirm(null,mes,null);
        //}


    }


};

///支出相关
var expenditure = {

    category: function () {


        $.getJSON("/expenditure/GetCategory", function (data) {
            var html = '';

            for (var i = 0; i < data.length; i++) {

                if (data[i].ecategorylive == 0) {
                    html += ' <tr  data-id="' + data[i].ecategoryid + '">';
                    html += '  <td class="textRight">';
                    html += '<ul class="cate_body"><li data-id="' + data[i].ecategoryid + '"><a href="#">' + data[i].ecategoryname + '<i class="poriss  icon-edit " id=' + data[i].ecategoryid + ' + data[b].ecategoryid + ' + '></i><em class="porvv icon-trash delete"  data-id="' + data[i].ecategoryid + '"></em></a></li>';
                    html += '<li class="new_type" data-id="' + data[i].ecategoryid + '">';
                    html += '                       <div style="display: none;">';
                    html += '               <input class="left" value="' + data[i].ecategoryname + '" maxlength="20">';
                    html += '               <i class="icon-ok okbtn1"></i>';
                    html += ' <i class="icon-remove removebtn"></i>';
                    html += ' </div> </li></ul>';
                    html += '</td> <td class="textLeft"> <ul class="cate_body">';
                    for (var b = 0; b < data.length; b++) {

                        if (data[b].superiorecategoryid == data[i].ecategoryid) {
                            html += '<li data-id="' + data[b].ecategoryid + '"><a href="#" id=' + data[b].ecategoryid + '>' + data[b].ecategoryname + '<i class="poriss  icon-edit " id=' + data[b].ecategoryid + '></i><em class="porvv icon-trash delete"  data-id="' + data[b].ecategoryid + '"></em></a></li>';
                            html += '<li class="new_type" data-id="' + data[b].ecategoryid + '">';

                            html += '                       <div style="display: none;">';
                            html += '               <input class="left" value="' + data[b].ecategoryname + '" maxlength="20">';
                            html += '               <i class="icon-ok okbtn1"></i>';
                            html += ' <i class="icon-remove removebtn"></i>';
                            html += ' </div> </li>';
                        }
                    }

                    html += '<li class="new_type">';
                    html += '                     <p class="addSubtype" id=' + data[i].ecategoryid + ' ><i class="icon-plus"></i></p>';
                    html += '                       <div style="display: none;">';
                    html += '               <input class="left" maxlength="20">';
                    html += '               <i class="icon-ok okbtn"></i>';
                    html += ' <i class="icon-remove removebtn"></i>';
                    html += ' </div> </li>';
                    html += '    </ul> </td> </tr>';
                }

            }
            $("#Categorylist").html(html);


        });


        //点击修改
        $(document).on('click', '.icon-edit', function () {

            // alert($(this).parent().parent().next().html());
            //$(this).fadeOut(0).siblings('div').fadeIn(250);

            ////分类添加 的关闭事件
            //$('.removebtn').click(function () {
            //    $(this).parent().fadeOut(0).siblings('p').fadeIn(0);
            //});

            // var val = $(this).prev().text();
            var val = $(this).parent().parent().text();
            var sid = $(this).attr('id');
            layer.prompt({
                formType: 0,
                title: '请输入分类',
                value: val,
                cancel: function (index) {

                    //console.log('弹层的 index', index);
                }
            }, function (value, index, elem) {
                var ecategoryModel = [];
                ecategoryModel.push({
                    name: "model.ecategoryid",
                    value: sid,
                });
                ecategoryModel.push({
                    name: "model.ecategoryname",
                    value: value,
                });
                $.ajax({
                    url: "/expenditure/PpostCategory",
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    data: ecategoryModel,
                    success: function (data) {
                        layer.msg("更新成功");
                        expenditure.category();
                    },
                    error: function () {
                        alert("请求超时！");
                    }

                });
            });
            // $(this).parent().parent().fadeOut(2).next().find("div").show();

        });



        //分类点击添加事件

        $(document).on('click', '.addSubtype', function () {

            //$(this).fadeOut(0).siblings('div').fadeIn(250);
            //var val = $(this).parent().parent().parent().parent().text();
            var superiorecategoryid = null;
            var superiorecategoryid = $(this).attr('id');
            layer.prompt({
                formType: 0,
                title: '请输入分类',
                cancel: function (index) {
                    //console.log('弹层的 index', index);  model.superiorecategoryid
                }
            }, function (value, index, elem) {

                $.post("/expenditure/PpostCategory", { "ecategoryname": value, "ecategorylive": 1, "superiorecategoryid": superiorecategoryid }, function (data) {
                    expenditure.category();
                    if (data > 0) {
                        //var html = '<li data-id="' + data + '"><a href="#">' + inputval + '<i class="poriss  icon-edit "></i><em class="porvv icon-trash delete"  data-id="' + data + '"></em></a> </li>';
                        //html += '<li class="new_type" data-id="' + data + '">';

                        //html += '                       <div style="display: none;">';
                        //html += '               <input class="left" value="' + inputval + '" maxlength="20">';
                        //html += '               <i class="icon-ok okbtn1"></i>';
                        //html += ' <i class="icon-remove removebtn"></i>';
                        //html += ' </div> </li>';
                        //isname.parents('li').before(html);
                        //isname.siblings('input').val('');//清空input的值
                        //isname.parent().fadeOut(0).siblings('p').fadeIn(0);
                        layer.msg("添加成功！");
                        expenditure.category();
                    }
                });
                //$.ajax({
                //    url: "/expenditure/PpostCategory",
                //    type: "POST",
                //    contentType: "application/x-www-form-urlencoded",
                //    dataType: "json",
                //    data: ecategoryModel,
                //    success: function (data) {
                //        layer.msg("添加成功");
                //        expenditure.category();
                //    },
                //    error: function () {
                //        alert("请求超时！");
                //    }

                //});
                // systemPwd(value);
                //systemPwd(value);

                //layer.close(index);
            });
            //分类添加 的关闭事件
            //$('.removebtn').click(function () {

            //    $(this).parent().fadeOut(0).siblings('p').fadeIn(0);
            //});

        });
        $("#xxx").click(function () {
            //prompt层
            layer.prompt({
                title: '输入大分类名称，并确认',
                formType: 0 //prompt风格，支持0-2
            }, function (pass) {
                layer.load();
                $.post("/expenditure/PpostCategory", { "ecategoryname": pass, "ecategorylive": 0 }, function (data) {
                    layer.closeAll();
                    if (data > 0) {
                        var html = '';
                        html += '<tr data-id="' + data + '">';
                        html += '<td class="textRight">';
                        html += '<div class="updateclass">';
                        html += '<p class="type cutlong"  id="' + data + '" >' + pass + '</p>';
                        html += '</div></td> <td class="textLeft"> <ul class="cate_body">';
                        html += '<li class="new_type">';
                        html += '<p class="addSubtype"><i class="icon-plus"></i></p>';
                        html += '<div style="display: none;">';
                        html += '<input class="left" maxlength="20">';
                        html += '<i class="icon-ok okbtn"></i>';
                        html += '<i class="icon-remove removebtn"></i>';
                        html += '</div>';
                        html += '</li> </ul></td> </tr>';
                        $("#Categorylist").append(html);

                        layer.msg("添加成功！");
                        expenditure.category();
                    }


                });

            });
        });


        //$(document).on("click", ".okbtn", function () {
        //    var inputval = $(this).siblings('input').val();
        //    if (inputval.length < 1) {
        //        layer.msg("请输入完整分类");
        //        return;
        //    }
        //    var isname = $(this);
        //    // alert($(this).parent().parent().parent().parent().parent().data("id"));
        //    $.post("/expenditure/PpostCategory", { "ecategoryname": inputval, "ecategorylive": 1, "superiorecategoryid": $(this).parent().parent().parent().parent().parent().data("id") }, function (data) {
        //        layer.closeAll();
        //        if (data > 0) {
        //            var html = '<li data-id="' + data + '"><a href="#">' + inputval + '<i class="poriss  icon-edit "></i><em class="porvv icon-trash delete"  data-id="' + data + '"></em></a> </li>';
        //            html += '<li class="new_type" data-id="' + data + '">';

        //            html += '                       <div style="display: none;">';
        //            html += '               <input class="left" value="' + inputval + '" maxlength="20">';
        //            html += '               <i class="icon-ok okbtn1"></i>';
        //            html += ' <i class="icon-remove removebtn"></i>';
        //            html += ' </div> </li>';
        //            isname.parents('li').before(html);
        //            isname.siblings('input').val('');//清空input的值
        //            isname.parent().fadeOut(0).siblings('p').fadeIn(0);
        //            layer.msg("添加成功！");
        //            expenditure.category();
        //        }
        //    });

        //});


        /////修改二级分类

        //$(document).on("click", ".okbtn1", function () {
        //    var inputval = $(this).siblings('input').val();
        //    //$(this).parent().hide().parent().prev().show().find("a").text(inputval);
        //    // var html = '<li><a href="#">' + inputval + '<i class="poriss  icon-edit "></i><em class="porvv icon-trash "></em></a> </li>';
        //    //$(this).parents('li').before(html);
        //    //$(this).siblings('input').val('');//清空input的值
        //    //$(this).parent().fadeOut(0).siblings('p').fadeIn(0);
        //    // alert($(this).parent().parent().parent().parent().parent().data("id"));


        //    //   alert($(this).parent().data("id"));

        //    $.post("/expenditure/PpostCategory", { "ecategoryname": inputval, "ecategorylive": 1, "superiorecategoryid": $(this).parent().parent().parent().parent().parent().data("id"), "ecategoryid": $(this).parent().parent().data("id") }, function (data) {
        //        layer.closeAll();
        //        expenditure.category();
        //        if (data > 0) {
        //            layer.msg("修改成功！");


        //        }
        //    });



        //});


        //分类添加分类名称事件
        //$('.okbtn').click(function () {
        //    var inputval = $(this).siblings('input').val();
        //    var html = '<li><a href="#">' + inputval + '<i class="poriss  icon-edit "></i><em class="porvv icon-trash "></em></a> </li>';
        //    $(this).parents('li').before(html);
        //    $(this).siblings('input').val('');//清空input的值
        //    $(this).parent().fadeOut(0).siblings('p').fadeIn(0);

        //});
        $(document).on("click", ".delete", function () {
            
            var name = $(this);

            layer.confirm("确认要删除选中的信息吗？", { btn: ["确认", "取消删除"] }, function () {

                $.post("/expenditure/deletecategory/" + name.data("id"), function (data) {
                    if (data > 0) {
                        layer.alert("正在使用中，不能删除");
                        //name.parent().remove();
                        // page($("#date").val(), $("#date2").val()); 
                        return;
                    }
                    else {
                        $.ajax(
                        {
                            type: "GET",
                            url: "/expenditure/deleteCate?id=" + name.data("id"),
                            dataType: "json",
                            success: function (datas) {
                                name.parent().remove();
                                layer.msg("删除成功");
                                //$("#Categorylist").html();
                                expenditure.category();
                            }
                        });
                    }



                });

            });

        });

    }


};

//短信相关
var sms = {

    ///短信设置
    smsconfiguration: function () {

        $('.stecs i').click(function () {
            $(this).parent().toggleClass('on').siblings().removeClass('on');
            var is = $(this).parent().hasClass('on') ? 1 : 0;

            $.post("/sms/Update_smskaiguan", { id: is, name: $(this).parent().attr("id") }, function (data) {

                if (data) {
                    //  layer.closeAll();
                    layer.msg("保存成功");
                    // $("#" + data.name).text(data.text);
                }
            });

        });

        $.getJSON("/system/GetUserSv_userconfig", function (data) {
            //  alert(data.sv_smscontion);
            var model = $.parseJSON(data.sv_smscontion);


            if (model.newuser == 1) {
                $("#newuser").addClass("on");

            } else {
                $("#newuser").removeClass("on");
            }

            if (model.chongci == 1) {
                $("#chongci").addClass("on");

            } else {
                $("#chongci").removeClass("on");
            }
            if (model.ischuxu == 1) {
                $("#ischuxu").addClass("on");

            } else {
                $("#ischuxu").removeClass("on");
            }
            if (model.xiaofei == 1) {
                $("#xiaofei").addClass("on");

            } else {
                $("#xiaofei").removeClass("on");
            }

            if (model.syzfu == 1) {
                $("#syzfu").addClass("on");

            } else {
                $("#syzfu").removeClass("on");
            }
            for (var item in model) {
                if (item != "newuser" && item != "ischuxu" && item != "xiaofei" && item != "ischuxu" && item != "chongci" && item != "syzfu")
                    $("#" + item).text(model[item]);

            }

        });

        $(".chetemplate").click(function () {

            classsid = $(this).data("id");
            Deke.DeKe_dialog.show_Url("更换模板", "/Html/sms/smstempate.html", ["保存", "取消"], savetemp, gettemtlp, ["600px", "560px"]);

        });

        function gettemtlp() {
            $.getJSON("/sms/Getmtemolate/" + classsid, function (data) {

                for (var i = 0; i < data.length; i++) {
                    //class="active"
                    $("#listtemp").append(' <li data-id="' + data[i].sms_mes_id + '">  <p>' + data[i].sms_mes_text + '</p> </li>');
                }
                $('.dxpzxxset li').click(function () {
                    $(this).addClass('active').siblings().removeClass('active');
                });

            });
        }

        function savetemp() {
            $.post("/sms/Update_smstemp", { id: $("#listtemp li.active").data("id"), text: $("#listtemp li.active ").text(), classid: classsid }, function (data) {

                if (data.r) {
                    layer.closeAll();
                    layer.msg("保存成功");
                    $("#" + data.name).text(data.mes);

                }

            });
        }
    },
    List: function () {
        page("", "", "", -1);

        $("#sate_satae").change(function () {


            page($(".bzhxdaohang li.active").data("val"), $("#date").val(), $("#date2").val(), $("#sate_satae").val(), -1);
        });
        //点击查询
        $("#woyaochaxue").click(function () {
            page($(".bzhxdaohang li.active").data("val"), $("#date").val(), $("#date2").val(), -1);
        });
        //选择今日 昨天本月 上月的点击事件
        $('.bzhxdaohang li ,.znfxhyxqbox .bzhxdaohang li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $('.znfxhyxqbox .bzhxdaohang li').index(this);
            $('.winlvom>div').eq(index).fadeIn().siblings().fadeOut(0);

            if ($(this).data("val") != 3) {
                //  alert($(this).data("val"));
                page($(this).data("val"));
            }
            //点击其他显示时间选择
            if ($('.qitbbb').hasClass('active')) {

                $('.sjxuantime').fadeIn(250);
            } else {
                $('.sjxuantime').hide(150);
            }
        });
        if ($("#usrCount").length == 0) {
            var start = {

                elem: '#date',
                format: 'YYYY/MM/DD',
                //   min: laydate.now(), //设定最小日期为当前日期
                max: '2099-06-16 23:59:59', //最大日期
                istime: false,
                istoday: false,
                choose: function (datas) {
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };
            var end = {
                elem: '#date2',
                format: 'YYYY/MM/DD',
                min: laydate.now(),
                max: laydate.now(),
                istime: false,
                istoday: false,
                choose: function (datas) {
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };
            laydate(start);
            laydate(end);
            laydate.skin('molv');//主题皮肤
        }
        function page(day, date, date2, sate) {

            //初始化分页内容
            $.get("/Sms/GetCount/", { "day": day, "date": date, "date2": date2, "sate": sate }, function (data) {

                // $("#User_cout").text(data);
                var i = Math.ceil(data / 6);
                // alert(data);
                laypage({
                    cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
                    pages: i, //总页数
                    skin: 'molv', //皮肤
                    first: '首页', //若不显示，设置false即可
                    last: '尾页', //若不显示，设置false即可
                    prev: '上一页', //若不显示，设置false即可
                    next: '下一页', //若不显示，设置false即可

                    jump: function (e, first) {
                        Pgaelist(e.curr, day, date, date2, sate);
                    }
                });
            });
        }

        ////
        function Pgaelist(page, day, date, date2, sate) {

            var namesss = "";
            $.getJSON("/Sms/GetList/" + page, { "day": day, "date": date, "date2": date2, "sate": sate }, function (data) {

                if (data != null) {
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var sms_smslist_text = data[i].sms_smslist_text;
                        if (sms_smslist_text.length > 20) {
                            sms_smslist_text = sms_smslist_text.substring(0, 30) + '...';
                        }
                        html += ' <tr data-text="' + data[i].sms_smslist_text + '" data-moble="' + data[i].sms_smslistmoble + '" ';
                        html += 'data-name="' + data[i].member_name + '"> <td>' + data[i].member_name + '</td> <td><span>' + data[i].sms_smslistmoble + '</span></td><td>';
                        html += '<span>' + sms_smslist_text + '</span></td>  <td><span>已发送</span></td>  <td>';
                        html += '<span>' + new Date(data[i].sms_smslistdate).Format("yyyy-MM-dd hh:mm:ss") + '</span></td> ';
                        html += '<td><a href="javascript:void(0);" class="view_ms" >详情</a></td> </tr>';
                    }
                }

                $("#prlist").html(html);

                $(".view_ms").click(function () {
                    namesss = $(this).parent().parent();
                    Deke.DeKe_dialog.show_Url("查看信息详情", "/Html/sms/viewmes.html", ["关闭"], null, Tf, ["460px", "350px"]);
                });

                function Tf() {
                    $("#text_name").val(namesss.data("name") + "(" + namesss.data("moble") + ")");
                    $("#txt_content").val(namesss.data("text").replace(/【/ig, '').replace(/】/ig, ''));
                }

            });

        }


    }


};

// 数据请求封装
$.extend({
    getJson: function (url, data, success) {//getJson--同步方法---获取会员信息，推荐人
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: false,
            cache: true,
            data: data,
            success: function (result) {
                success(result);
            }
        });
    },
    getAsyncJson: function (url, data, success) {
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: true,
            cache: true,
            data: data,
            success: function (result) {
                success(result);
            }
        });
    },
    getAsyncJson2: function(url, data, success) {
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: true,
            cache: true,
            data: data,
            success: function(result) {
                success(result);
            }
        });
    },
    postAsyncJson: function (url, data, success) {
        return $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            //contentType: "application/json",
            async: true,
            cache: false,
            data: data,
            success: function (result) {
                success(result);
            }
        });
    },
    postAsyncContentJson: function (url, data, success) {
        data = JSON.stringify(data);
        return $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            contentType: "application/json",
            async: true,
            cache: false,
            data: data,
            success: function (result) {
                success(result);
            }
        });
    },
    postJson: function (url, data, success) {
        return $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            async: false,
            cache: false,
            data: data,
            success: function (result) {
                success(result);
            }
        });
    },
    getHtml: function (url, data, success) {
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
            async: false,
            cache: false,
            data: data,
            success: function (result) {
                success(result);
            }
        });
    },
    getAsyncHtml: function (url, data, success) {
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
            async: true,
            cache: false,
            data: data,
            success: function (result) {
                success(result);
            }
        });
    },
    postHtml: function (url, data, success) {
        return $.ajax({
            url: url,
            type: 'post',
            dataType: 'html',
            async: true,
            cache: false,
            data: data,
            success: function (result) {
                success(eval(result));
            }
        });
    },
    commonUploadImg: function (fileToUploadId, uploadFileType, isCompress, success) {
        if (!fileToUploadId) {
            layer.msg('上传控件ID不能为空！');
            return;
        }
        var formData = new FormData();
        var files = $('#' + fileToUploadId)[0].files[0];
        if (!files) {
            layer.msg('请选择图片文件');
            return;
        }
        if (files.size > 5242880) {
            layer.msg('请上传小于5M以下的图片');
            return;
        }
        if (files.type == 'image/jpeg' || files.type == 'image/png') {

        } else {
            layer.msg('请上传图片文件！');
            return;
        }
        formData.append("file", files);
        formData.append("userId", user_id);
        formData.append("uploadFileType", uploadFileType);
        formData.append("isCompress", isCompress);
        $.ajax({
            // url: 'http://localhost:5741/api/UploadImg/CommonImg',
            url: 'http://res.decerp.cc/api/UploadImg/CommonImg',
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            cache: false,
            success: function (data) {
                if (data && data.succeed) {
                    success(data.values);
                }
                else {
                    if (data.errmsg) {
                        layer.msg(data.errmsg);
                    }
                    else {
                        layer.msg('上传图片失败，请稍后再试！');
                    }
                }
            }
        });
    },
    commonUploadExelFile: function (fileToUploadId, uploadFileUrl, success) {
        if (!fileToUploadId) {
            layer.msg('上传控件ID不能为空！');
            return;
        }
        var formData = new FormData();
        var files = $('#' + fileToUploadId)[0].files[0];
        if (!files) {
            layer.msg('请选择exel文件');
            return;
        }
        if (files.size > 5242880) {
            layer.msg('请上传小于5M以下的文件');
            return;
        }
        formData.append("file", files);
        formData.append("userId", user_id);
        formData.append("uploadFileType", 'excel');
        $.ajax({
            url: 'http://qode.decerp.cc' + uploadFileUrl,
            //url: 'http://localhost:5741/' + uploadFileUrl,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            cache: false,
            success: function (data) {
                if (data) {
                    success(JSON.parse(data));
                }
                else {
                    layer.msg('上传文件失败，请稍后再试！');
                }
            }
        });
    }
});

// 判断字符串是否为null，还是空或是空字符串,返回true或false
function isNullOrWhiteSpace(str) {
    try {
        if (str != null || str != undefined)
            str = str.replace(/\ +/g, "");
        if (str == null || str == '' || str == undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (ex) {
        return false;
    }
}

// 判断字符串是否为空还是NULL,还是undefined
function isNullOrEmpty(str) {
    if (str==null || str.trim() == null || str.trim() == '' || str.trim() == undefined) {
        return false;
    }
    else {
        return true;
    }
}

var money = '';

// 调用计数器方法
function jisuqi(txtmoneyId, jsbutton, title) {
    money = txtmoneyId;

    if (isNullOrWhiteSpace(jsbutton)) {
        $(jsbutton).click(function () {
            Deke.DeKe_dialog.show_Url2(title, "/html/cash/jishu.html?v=25", huidiao, ['310px', '']);
        });
    }

    $("#jishukuan").val($("#jishukuan").val());
}

// 回调
function huidiao() {
    $('.calui li').click(function () {
        $("#jishukuan").val($("#jishukuan").val() + $(this).data("val"));
    });

    $("#jishukuan").val("");
    $("#jishukuan").focus();
    $(".posia").click(function () {
        $("#jishukuan").val("");
        $("#jishukuan").focus();
    });

    $("#woquren").click(function () {
        $(money).val($("#jishukuan").val());
        layer.close(index);
    });

    $("#quxiao i").click(function () {
        layer.close(index);
    });

    $("#jishukuan").keydown(function (key) {
        if (key.keyCode == "13") {
            $("#woquren").click();
        } else if (key.keyCode == "27") {
            layer.close(index);
        }
    });
}

// 省市区联动下拉（省id，市Id,区Id）
function provincialCity(provinceId, cityId, districtId) {
    //页面加载时只需绑定省份下拉框
    $.get("/Ajaxdata/GetPCD/1", function (data) {
        if (data.length > 0) {
            for (var i in data) {
                $(provinceId).append("<option value=\"" + data[i].code + "\">" + data[i].name + "</option>");
            }
            $(provinceId).val($(provinceId).val()).change();
        }
    });

    //联动
    $(provinceId).change(function () {
        $(districtId).empty();
        $.get("/Ajaxdata/GetCityInterlock/" + $(provinceId).val(), function (data1) {
            $(cityId).empty();//清空城市下拉框
            for (var i in data1) {
                $(cityId).append("<option value=\"" + data1[i].code + "\">" + data1[i].name + "</option>");
            }
            $(cityId).val($(cityId).val());
            $(cityId).change();
        });
    });

    //改变省份
    $(cityId).change(function () {
        $.get("/Ajaxdata/GetDistrictInterlock/" + $(cityId).val(), function (data) {
            if (data.length > 0) {
                $(districtId).empty();
                for (var i in data) {
                    $(districtId).append("<option value=\"" + data[i].code + "\">" + data[i].name + "</option>");
                }
                $(districtId).val($(districtId).val());
            }
        });
    });
}

/// <summary>
/// checkbox全选反选
/// </summary>
/// <param name="checkAllId">全选checkbox的Id</param>
/// <param name="checkListName">要全选的checkbox列表名称Name</param>
function checkboxAll(checkAllId, checkListName) {
    var coAll = document.getElementById(checkAllId);
    var coll = document.getElementsByName(checkListName);
    $('#' + checkAllId + '').click(function () {
        if (coAll.checked) {
            for (var i = 0; i < coll.length; i++) {
                coll[i].checked = true;
            }
        } else {
            for (var i = 0; i < coll.length; i++) {
                coll[i].checked = false;
            }
        }
    });

    $(coll).click(function () {
        if ($(this).prop("checked")) {
            setTimeout(function () {
                if ($('input[name=' + checkListName + ']:checked').length == $('input[name=' + checkListName + ']').length) {
                    $(coAll).prop('checked', true);
                }
            }, 200);

        } else {
            $(coAll).prop('checked', false);
        }
    });
}

// 勾选子项复选框
function checkBoxSon(checkAllId, checkListId) {
    $('#' + checkAllId).click(function () {
        var checkAll = document.getElementById(checkAllId);
        var checkList = $('#' + checkListId + ' input:checkbox');
        if (checkAll.checked) {
            $('#' + checkListId + ' input:checkbox').each(function () {
                $(this).prop('checked', true);
            });
        }
        else {
            $('#' + checkListId + ' input:checkbox').each(function () {
                $(this).prop('checked', false);
            });
        }
    });

    $('#' + checkListId + ' input:checkbox').click(function () {
        if ($(this).prop("checked")) {
            $('#' + checkAllId).prop('checked', true);
        }
    });
}

// 单击修改密码按钮
$('#changePwd').click(function () {
    Deke.DeKe_dialog.show_Url3("修改密码", "/html/system/ChangePwd.html?v=60", changePwd, ['400px', '']);
});

// 修改密码回调方法  
function changePwd() {
    $('#btnSaveChangePwd').click(function () {
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();
        var pa = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,15}$/;
        if (!isNullOrWhiteSpace(oldPassword)) {
            layer.msg("原密码不能为空！");
            $('#oldPassword').focus();
        }
        else if (!isNullOrWhiteSpace(newPassword)) {
            layer.msg("新密码不能为空！");
            $('#newPassword').focus();
        }
        else if (newPassword == oldPassword) {
            layer.msg("新密码不能和旧密码相同！");
            $('#newPassword').focus();
        }
        else if (!pa.test(newPassword)) {
            layer.msg("新密码输入必须是6-15位字母、数字或特殊符号组成！");
            $('#newPassword').focus();
        }
        else if (!isNullOrWhiteSpace(confirmPassword)) {
            layer.msg("确认新密码不能为空");
            $('#confirmPassword').focus();
        }
        else if (newPassword != confirmPassword) {
            layer.msg("两次输入的新密码不一致！");
            $('#confirmPassword').focus();
        }
        else {
            $.postAsyncJson('/AjaxUser/ChangePwd', { oldPassword: oldPassword, newPassword: newPassword }, function (data) {
                if (data == 1) {
                    layer.msg("密码修改成功,请重新用新密码登录！");
                    layer.close(index);
                    setTimeout(function () {
                        $.post('/AjaxUser/LogOut', null, function (data) {
                            //location.href = '/login.html';
                            if (_g_is_distributor_customer || verify_distributor_id == 100) {
                                location.href = '/Dealerlogin.html';

                            } else {
                                location.href = '/login.html';
                            }
                        });
                    }, 2000);
                }
                else if (data == -3) {
                    $('#oldPassword').focus();
                    layer.msg("原密码输入错误！");
                }
                else if (data == -5) {
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
//领取试用版
$(document).on("click", "#TrialVersion", function () {
    $.get('/AjaxUser/GetTrialVersionPermissions/', function (data) {
        if (data == 1) {
            layer.msg("您已领取过了！！");
        } else {
            $.post("/AjaxUser/ReceiveTrialVersion", function (data) {
                if (data == 1) {
                    layer.msg("恭喜您，成功领取了高级试用版,退出重新登录即可享受高级版功能");
                }
                else if (data == 2) {
                    layer.msg("领取失败，刷新重新试领");
                }
                else if (data == 2) {
                    layer.msg("您已领取过了！！");
                }
            });
        }
    });
});


// 初始化密码回调方法
function systemPwd(newPassword) {
    if (!isNullOrWhiteSpace(newPassword)) {
        alert("密码不能为空！");
        $('#newPassword').focus();
        return false;
    }
    $.ajax({
        type: "GET",
        url: "/AjaxUser/CheckPwd?passWord=" + newPassword,
        dataType: "json",
        success: function (data) {
            if (data == "0") {
                alert("输入密码不正确");
            }
            else {
                layer.confirm("初始化店铺数据将无法恢复，确认初始化？", { btn: ["确认", "取消"] }, function () {
                    var str = "";
                    $(".uikslx.on").each(function () {
                        str += $(this).data("id") + ",";
                    });
                    layer.close(layer.index);

                    //初始化会员信息
                    if (str && str.indexOf('1') >= 0) {
                        $.get("/System/GetClearDataRowCount", { seid: str }, function (data) {
                            if (data > 0) {
                                layer.close();
                                //查询总的清理记录行数，如有40000个会员，每次清理100个，分40次，每次比例0.25%
                                var clear_rowPageSize = parseInt((data / 100) || 0) + 1;
                                var clear_rowPageCount = parseInt(clear_rowPageSize / 100) + 1;
                                var ii = 0;
                                $("#progress_clear_userdata_text").html("正在初始化数据");

                                var t = setInterval(function () {
                                    ii = parseFloat(parseFloat(ii) + 1 / clear_rowPageCount).toFixed(2);
                                    $("#progress_clear_userdata").css("width", ii + "%");
                                    $.post("/System/ClearDataBySize", { seid: str, pageSize: 100 }, function (data) {
                                    });
                                    console.log("正在清理：" + clear_rowPageCount);
                                    $("#progress_clear_userdata_text").html("正在初始化数据 " + ii + "%");
                                    if (ii >= 100) {
                                        clearInterval(t);
                                        $("#progress_clear_userdata_text").html("清理成功");
                                        layer.close();
                                        layer.msg("清除成功");
                                    }
                                }, 5000);
                            }
                            else if (data == -2 || data == -5) {
                                layer.close();
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.close();
                                layer.msg("删除失败");
                            }
                        });
                    } else {
                        if (str != "") {
                            $.post("/System/UpdatedataClor", { seid: str }, function (data) {
                                loggin.chklogn(data);
                                if (data == true) {
                                    layer.close();
                                    layer.msg("清除成功");
                                }
                                else if (data == -2 || data == -5) {
                                    layer.close();
                                    layer.msg("你没有该操作权限！");
                                }
                                else {
                                    layer.close();
                                    layer.msg("删除失败");
                                }
                            });
                        } else {
                            layer.msg("请选择要清除的对象");
                        }
                    }

                });
            }
        }
    });
}
//上传店铺LOGO图片
$(document).on('change', "#uplogoImg", function () {
    $.commonUploadImg('uplogoImg', "ShopLogo", "true", function (resultImgUrl) {
        if (resultImgUrl) {
            $.post('/AjaxUser/UploadLogo?id=1&imgurl=' + resultImgUrl, function (data) {
                if (data.id == true) {
                    $('#logoid').attr('src', _g_res_images_url + resultImgUrl);
                    $('#showlogoImg').attr('src', _g_res_images_url + resultImgUrl);
                }
                else {
                    layer.msg(data.name);
                }
            });
        }
    });
});

// 上传店铺头像图片
$(document).on('change', "#upLoadImg", function () {
    $.commonUploadImg('upLoadImg', "ShopLogo", "true", function (resultImgUrl) {
        $.post('/AjaxUser/UploadLogo?id=2&imgurl=' + resultImgUrl, function (data) {
            if (data.id == true) {
                $('#userImg').attr('src', _g_res_images_url + resultImgUrl);
                $('#showImg').attr('src', _g_res_images_url + resultImgUrl);
            }
            else {
                layer.msg(data.name);
            }
        });
    });
});

// 提交用户反馈信息
function addUserFeedback() {
    $('#btnAddUserFeedback').click(function () {
        var uploadImgUrl;
        // 上传反馈图片
        //$.commonUploadImg('upFeedbackImg', "Feedback", "true", function (resultImgUrl) {
        //    if (resultImgUrl) {

        //    }
        //});
        if (isNullOrWhiteSpace($('#userfeedback_content').val()) && $('#userfeedback_content').val().trim().length >= 8) {
            $.post('/AjaxData/AddUserFeedback', { userfeedback_content: $('#userfeedback_content').val().trim(), picture: uploadImgUrl }, function (data) {
                if (data) {
                    if (data.imgurl == false) {
                        $('#userfeedback_content').val('');
                        $('#upFeedbackImg').val('');
                        $('.am-p1').html('');
                        layer.msg("上传图片失败");
                    }
                    else if (data.imgurl == -3) {
                        layer.msg("您上传的图片过大，请选择小于500kb以下的图片");
                    }
                    else if (data.imgurl) {
                        $('#userfeedback_content').val('');
                        $('#upFeedbackImg').val('');
                        $('.am-p1').html('');
                        layer.msg("数据已提交，感谢您的反馈！");
                    }
                }
            });
        }
        else {
            $('#userfeedback_content').focus();
            layer.msg('提交内容不能少于8个字！');
        }
    });
}

//am
var amtabsildes = function () {
    this.active = 'active';
}
amtabsildes.prototype.init = function (obj) {
    var tabheader1 = $(obj.a);
    var vs = $(obj.b);
    var This = this;
    tabheader1.each(function (index, item) {
        $(item).hover(function () {
            $(this).addClass(This.active).siblings().removeClass(This.active);
            vs.eq(index).addClass(This.active).siblings().removeClass(This.active);
        })
    })
}
var amtabsildes1 = new amtabsildes();
amtabsildes1.init({ 'a': '#tab-header1 li', 'b': '#tab-content1>div' });

// 生成时间戳，清除每次发布后的js，css缓存
var clearCache = new Date().Format("yyyyMMddhhmmss");

// 最新时间戳
function getTimeStamp() {
    var date = new Date();
    //$("#date_ss").text("系统时间：" + new Date().Format("yyyy年MM月dd日 hh:mm:ss"));
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "" + fnW((month + 1)) + "" + fnW(data) + "" + fnW(hours) + "" + fnW(minute) + "" + fnW(second);
    //return new Date().Format("yyyyMMddhhmmss");
    return time;
}

//补位 当某个字段不是两位数时补0
function fnW(str) {
    var num;
    str >= 10 ? num = str : num = "0" + str;
    return num;
}

// 通过Id启用按钮通用方法
function enabledButton(buttonId) {
    $('#' + buttonId).removeClass("disabled").removeAttr("disabled", "disabled");
}

// 通过Id禁用按钮通用方法
function disableButton(buttonId) {
    $('#' + buttonId).addClass("disabled").attr("disabled", "disabled");
}

// 通过Class启用按钮通用方法
function enabledButtonByClass(buttonClass) {
    $('.' + buttonClass).removeClass("disabled").removeAttr("disabled", "disabled");
}

// 通过Class禁用按钮通用方法
function disableButtonByClass(buttonClass) {
    $('.' + buttonClass).addClass("disabled").attr("disabled", "disabled");
}

// 通过Id启用链接按钮通用方法
function enabledLinkButtonById(buttonId) {
    $('#' + buttonId).attr('href', 'javascript:void(0);');
    //$('#' + buttonId).bind('click');
    $('#' + buttonId).removeAttr('disabed');
    //$('#' + buttonId).click();
}

// 通过Id禁用链接按钮通用方法
function disableButtonById(buttonId) {
    //$('#' + buttonId).unbind('click');
    $('#' + buttonId).removeAttr('onclick');
    $('#' + buttonId).attr('disabed', true);
    $('#' + buttonId).removeAttr('href');
}
//写cookies
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return (arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


// 写入LocalStorage
function setLocalStorage(name, value) {
    if (!window.localStorage) {
        return false;
    }
    else {
        var storage = window.localStorage;
        storage.setItem(name, value);
    }
}

// 读取LocalStorage
function getLocalStorage(name) {
    if (!window.localStorage) {
        return false;
    }
    else {
        var storage = window.localStorage;
        return storage.getItem(name);
    }
}

function removeLocalStorage(name) {
    if (!window.localStorage) {
        return false;
    }
    else {
        if (name != null && name != '' && name != undefined) {
            var storage = window.localStorage;
            storage.removeItem(name);
        }
    }
}

///产品自定义属性配置绑定
function GetProductConfig(productconfig) {

    var is_open_detai_info = false;
    $(".detailinfo").html("");
    var html = ' <div class="makstbox mat15"  id="detailinfo">';
    html += ' <h3 class="timsl">  <span>产品自定义属性设置</span>';
    html += '<i type="button" class="tikxm icon-question-sign tips" data-content="可设置商品自定义属性如：颜色(红色，蓝色...)，规格(S165/155,M170/160...)..."></i>';
    html += '</h3>';
    //产品配置查询
    $.getJSON("/ProductCustomProperties/GetProductAttributeConfiglist", function (data) {
        if (data != null && data.length >= 1) {
            is_open_detai_info = true;

            for (var i = 0; i < data.length; i++) {

                $("#Configinfotext").append(productconfig.replace("@name", data[i].sv_configname).replace("@id", data[i].sv_productconfigid).replace("@name", data[i].sv_configname));
                html += '<div class="makstbox mat15" id="configid_' + data[i].sv_productconfigid + '">';
                html += ' <h3 class="timsl"><span>' + data[i].sv_configname + '</span>';
                if (data[i].sv_is_open) {
                    html += '<span class="swtith configopen open" style="float:none" data-configid="' + data[i].sv_productconfigid + '"><i></i></span>';
                } else {
                    html += '<span class="swtith configopen" style="float:none" data-configid="' + data[i].sv_productconfigid + '"><i></i></span>';
                }
                html += '</h3>';
                html += '<div class="monfot">';
                html += '<text id="attributedetailtext' + data[i].sv_productconfigid + '">';
                if (data[i].childList != null) {
                    for (var j = 0; j < data[i].childList.length; j++) {
                        html += '<a href="javascript:void(0)" class="klisos" data-detailid="' + data[i].childList[j].sv_producdetailid + '" data-name="' + data[i].childList[j].sv_productattributename + '" data-code="' + data[i].childList[j].sv_productattributecode + '" data-configid="' + data[i].sv_productconfigid + '">';
                        html += '<span>' + data[i].childList[j].sv_productattributename + '</span>';
                        html += '<i class="poriss  icon-edit updatedetai"></i><em class="porvv icon-trash detaidelete"  ></em></a>';
                    }
                }
                html += '</text>';
                html += '<a href="javascript:void(0)" class="kkadd attributedetail" data-configid=' + data[i].sv_productconfigid + '  id="attributedetail' + data[i].sv_productconfigid + '"><i class="icon-plus"></i></a>'
                html += '</div></div>';
            }
        }
        html += ' </div>';
        if (is_open_detai_info) {
            $(".detailinfo").append(html);
        }
    });
}
//产品自定义属性设置绑定
function GetProductAttributeDetail(_configid) {
    $("#attributedetailtext" + _configid).html("");
    var html = "";
    $.getJSON("/ProductCustomProperties/GetProductAttributeDetaillist", { configid: _configid }, function (data) {
        if (data != null && data.length >= 1) {
            for (var j = 0; j < data.length; j++) {
                html += '<a href="javascript:void(0)" class="klisos" data-detailid="' + data[j].sv_producdetailid + '" data-name="' + data[j].sv_productattributename + '" data-code="' + data[j].sv_productattributecode + '" data-configid="' + data[j].sv_productconfigid + '">';
                html += '<span>' + data[j].sv_productattributename + '</span>';
                html += '<i class="poriss  icon-edit updatedetai" ></i><em class="porvv icon-trash detaidelete"  ></em></a>';
            }
        }
        $("#attributedetailtext" + _configid).html(html);
    });

}
//获取字符长度
function getstrlength(strname) {

    return strname.replace(/[^\x00-\xFF]/g, '**').length;
}

/** 
* convertImgToBase64 
* @param {String} url 
* @param {Function} callback 
* @param {String} [outputFormat='image/png'] 
* @author HaNdTriX 
* @example 
convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){ 
console.log('IMAGE:',base64Img); 
}) 
*/
function convertImgToBase64(url, callback, outputFormat) {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        // Clean up 
        canvas = null;
    };
    img.src = url;
}

// 保留两位小数
function round(v, e) {
    var t = 1;
    for (; e > 0; t *= 10, e--);
    for (; e < 0; t /= 10, e++);
    return Math.round(v * t) / t;
}
//引导页面
//更新公告栏
var switch0 = false;
if (_g_update_flag > 0) {
    //1、检查当前配置的更新值
    //2、检查客户端的更新值
    var _l_update_flag = localStorage.getItem("update_demo");
    if (_g_update_flag > _l_update_flag) {
        switch0 = true;
        localStorage.setItem("update_demo", _g_update_flag);
    }
}
function btnknowFn() {
    $('<button class="btn-success btn btn_know" style="font-size: 12px;margin-left: 10px;background-color:#eaead6;color:#666666;border:none;">结束演示</button>').appendTo(".layui-layer-content");
}
function btn_newuserFn() {
    $('<button class="btn-success btn nex1" style="font-size: 12px;background:#7cd97f;color:#ffffff;border:none;">① 下一步</button>').appendTo(".layui-layer-content");
}
function nexbtn_newuserFn() {
    $('<button class="btn-success btn nex2" style="font-size: 12px;background-color:#7cd97f;color:#ffffff;border:none;">② 下一步</button>').appendTo(".layui-layer-content");
}
function nexbtn3_newuserFn() {
    $('<button class="btn-success btn nex3" style="font-size: 12px;color:#ffffff;border:none;float: right;">③ 下一步</button>').appendTo(".layui-layer-content");
}
if (switch0) {
    $(".gonggao_1").addClass("active_block");
    $(".citiebox").css("margin-top", "4%");
    var settimefadIn = setTimeout(function () {
        $(".gonggao_1").removeClass("active_block");
        $(".citiebox").css("margin-top", "7%");
    }, 13000);

} else {
    $(".gonggao_1").css("display", "none");
    $(".citiebox").css("margin-top", "7%");
}
//演示按钮事件
$(".yanshi_btn").click(function () {
    $(".box-black").css("display", "block");
    $(".demo_2").addClass("more_demo");
    layer.tips('①请点击微信营销', '.demo_2', {
        time: 500000,
        tips: 1,
    });
    btnknowFn();
    closeFn_end();
    $(".demo_2").click(function () {
        localStorage.setItem("decerp_demo_result", switch0);
    });
});
//第二步按钮设置
if (localStorage.getItem("decerp_demo_result")) {
    $(".box-black2").css("display", "block");
    $(".demo_3").addClass("more_demo");
    localStorage.clear("decerp_demo_result");
    layer.tips('②请点击微信消息绑定', '.demo_3', {
        time: 500000,
        tips: 3,
    });
    btnknowFn();
    closeFn_end();
    $(".demo_3").click(function () {
        $(".box-black2").css("display", "block");
        $(".demo_3").removeClass("more_demo");
        $(".layui-layer-content").addClass("active_none");
        localStorage.clear("update_demo");
        setTimeout(function () {
            $(".demo_4").addClass("more_demo");
            layer.tips('第三步', '.demo_4', {
                time: 500000,
                tips: 3,
            });
            btnknowFn();
            closeFn_end();
            $(".demo_4").click(function () {
                $(".box-black2").css("display", "none");
                $(".demo_4").removeClass("more_demo");
                $(".layui-layer-content").addClass("active_none");
            })
        }, 60);
    });
}
function closeFn_end() {
    $(".btn_know").click(function () {
        localStorage.clear("update_demo");
        $(".box-black2 ,.box-black").css("display", "none");
        $(".demo_3,.demo_2,.demo_4").removeClass("more_demo");
        $(".layui-layer-content").addClass("active_none");
    });
}

// 通用消息提醒
function layerMsg(icon, text) {
    layer.msg(text, {
        icon: icon, //图标
        time: 2000   //2秒关闭(如果不配置,默认是3秒)
    }, function () {
        layer.closeAll();
    });
}

//----设置
function setDemoItem(key, data) {
    localStorage.setItem("decerp_demo_result", switch0);
}
function getDemoItem(key) {
    localStorage.getItem("decerp_demo_result");
}
//获取配置信息
function PreferentialTopUpGivingConfigList(strmodule_code, config_code) {
    Preferential_TopUpGiving_ConfigList = "";
    if ((typeof moduleConfigList) != "undefined" && moduleConfigList != null && moduleConfigList.length > 0) {
        for (var i = 0; i < moduleConfigList.length; i++) {
            if (moduleConfigList[i].sv_user_module_code == strmodule_code)
            {
                if ((typeof moduleConfigList[i].ChildInfolist) != 'undefined')
                {
                    if (moduleConfigList[i].ChildInfolist != null && moduleConfigList[i].ChildInfolist.length > 0) {
                        var childlist = moduleConfigList[i].ChildInfolist;
                        for (var j = 0; j < childlist.length; j++) {
                            if (childlist[j].sv_user_config_code == config_code) {
                                sv_user_module_config = childlist[j];
                                if (childlist[j].ChildDetailList != null && childlist[j].ChildDetailList.length > 0) {
                                    is_exist_Preferential_TopUpGiving_ConfigList = true;
                                    Preferential_TopUpGiving_ConfigList = childlist[j].ChildDetailList;
                                }
                            }
                        }
                    }
                } else if((typeof moduleConfigList[i].childInfolist) != 'undefined')
                {
                    if (moduleConfigList[i].childInfolist != null && moduleConfigList[i].childInfolist.length > 0)
                    {
                        var childlist = moduleConfigList[i].childInfolist;
                        for (var j = 0; j < childlist.length; j++)
                        {
                            if (childlist[j].sv_user_config_code == config_code)
                            {
                                sv_user_module_config = childlist[j];
                                if (childlist[j].childDetailList != null && childlist[j].childDetailList.length > 0)
                                {
                                    is_exist_Preferential_TopUpGiving_ConfigList = true;
                                    Preferential_TopUpGiving_ConfigList = childlist[j].childDetailList;
                                }
                            }
                        }
                    }

                }

            }
        }

    }
}

//获取配置启用开关信息
function GetConfigStatusInfo(strmodule_code) {
    if ((typeof moduleConfigList) != "undefined" && moduleConfigList != null && moduleConfigList.length > 0) {
        for (var i = 0; i < moduleConfigList.length; i++) {
            if (moduleConfigList[i].sv_user_module_code == strmodule_code) {
                return moduleConfigList[i].sv_detail_is_enable;
            }
        }
    }
    return false;
}


function Timedelay(member_id, product_id, userecord_id, user_id, sv_mcc_leftcount) {

    if (sv_mcc_leftcount > 0) {
        var htmldiv = '<input id="TimedelayDate" style="margin-top:40px;margin-left:30px" type="text" class="laydate-icon" value="">';
        htmldiv += '</div>';
        htmldiv += '<div class="layui-layer-btn">';
        htmldiv += '<button type="button" class="button  button-primary button-rounded button-small" data-loading-text="正在操作中.." id="saveimedelay">确定</button>'
        htmldiv += '<button type="button" class="button  button-default button-rounded button-small" id="cancel">取消</button>'
        layer.open({
            type: 1,
            title: "过期产品延期",
            area: ['220px', '180px'],
            content: htmldiv
        });
        laydate({
            elem: '#TimedelayDate',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true,
            min: laydate.now() //设定最小日期为当前日期
        });
        laydate.skin('molv');//主题皮肤
        var datea = new Date();
        datea.setMonth(datea.getMonth() + 1)
        $("#TimedelayDate").val(datea.Format("yyyy-MM-dd"));
        //关闭
        $("#cancel").click(function () {
            layer.closeAll("page");
        });

        $("#saveimedelay").click(function () {
            var modeldata = { member_id: member_id, product_id: product_id, userecord_id: userecord_id, user_id: user_id, validity_date: $("#TimedelayDate").val() }
            $.ajax({
                url: "/Ajaxdata/UpdateTimedelayDate",
                data: JSON.stringify(modeldata),
                type: "POST",
                contentType: "application/json",
                success: function (result) {
                    if (result == true) {
                        layer.closeAll("page");
                        layer.msg("延时成功！");
                        page();
                    } else if (result == -1) {
                        layer.closeAll("page");
                        layer.msg("操作失败，时间有误！");

                    }
                    else {
                        layer.closeAll("page");
                        layer.msg("操作失败，产品有误！");
                    }
                }

            });

        });
    } else {
        layer.close();
        layer.msg("当前产品已没有可用次数！");
    }
}

// 验证数字和计重小数
function textBoxNumberVerification(txtValue, pricingmethod) {
    if (txtValue != null && txtValue != '' && txtValue != undefined) {
        if (pricingmethod == 1) { // 计重验证
            return txtValue.value.replace(/^\d+(\.\d+)?$/i, '');
        }
        else { // 计件验证
            return txtValue.value.replace(/^\d+$/, '');
        }
    }
}

//-------弹出页面变量处理，通用全局变量通用方法
//-------弹出页面，获取全局变量异常
//-------gkey：全局变量名称，glev：层次，默认1，表示一级弹窗
function getGlobalValue(glev) {
    //收银界面->会员列表页
    if ((typeof moduleConfigList) == "undefined") {
        moduleConfigList = parent.moduleConfigList;
    }
    if ((typeof Is_open_commission) == "undefined") {
        Is_open_commission = parent.Is_open_commission;
    }
    if ((typeof _g_is_ic_flag) == "undefined") {
        _g_is_ic_flag = parent._g_is_ic_flag;
    }
    if ((typeof g_AutomaticallyGenerateMemberId) == "undefined") {
        g_AutomaticallyGenerateMemberId = parent.g_AutomaticallyGenerateMemberId;
    }
    if ((typeof user_id) == "undefined")
    {
        try
        {
            user_id = parent.user_id;
        } catch (e) {

        } 
    }
}


//验证数量和重量data-sv_pricing_method=
function clearNoNumber_input(obj) {
    if (obj != null && obj != '' && obj != undefined && obj.value != null && obj.value != '' && obj.value != undefined) {
        if ($(obj).data("sv_pricing_method") == "0") {
            obj.value = parseFloat(obj.value || 0)
            obj.value = obj.value.replace(/[^\-\d]/g, '');  //清除“数字
        } else {
            obj.value = obj.value.replace(/[^\-\d\.]/g, "");  //清除“数字”和“.”以外的字符
            obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
            obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
            obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数

        }

    }
}
//占位符通用icount占位长度
function strPlaceholder(icount) {
    var istr = "";
    if (icount > 0) {
        for (var i = 0; i < icount; i++) {
            istr += "&emsp;";
        }
    }
    return istr;
}

// 去除空格
function clearInputSpace(obj) {
    if (obj != null && obj != '' && obj != undefined && obj.value != null && obj.value != '' && obj.value != undefined) {
        obj.value = obj.value.replace(/\s/g, "");
    }



}


// 时间天数减法
function minusSelectDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() - days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = d.getFullYear() + "/" + month + "/" + day + " 00:00:00";
    return val;
}

// 时间天数减法
function addSelectDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = d.getFullYear() + "/" + month + "/" + day + " 00:00:00";
    return val;
}

// 加载loading，返回loading Index
function commonOpenLoading(content) {
    var loadIndex = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-2
    return loadIndex;
}

// 关闭loading
function commonCloseLoading(index) {
    layer.close(index);
}

function commondResultMsg(text, icon, time) {
    layer.msg(text, {
        icon: icon || 1, //图标
        time: time || 800  //2秒关闭(如果不配置,默认是3秒)
    }, function () {
        //setTimeout(function () {
        layer.closeAll();
        //}, 800);
    });
}

function minuteByDateTime(date) {
    var timestamp = Date.parse(new Date(date));
    date = timestamp / 1000;
    //获取js 时间戳
    var time = new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time = parseInt((time - date * 1000) / 1000);
    //存储转换值 
    var s;
    if (time < 60 * 1) {//十分钟内
        return '刚刚';
    } else if ((time < 60 * 60)) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟";
    } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时";
    } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
        //超过1天少于3天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天";
    } else {
        //超过3天
        var date = new Date(parseInt(date) * 1000);
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }
}

// 把时间转换为分钟
function minuteByDateTimeTemp(date) {
    var timestamp = Date.parse(new Date(date));
    date = timestamp / 1000;
    //获取js 时间戳
    var time = new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time = parseInt((time - date * 1000) / 1000);
    if (time < 60 * 1) {//十分钟内
        return '刚刚';
    }
    else {
        return Math.floor(time / 60) + '分钟';
    }
}

// 获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

function stopDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault(); //阻止默认浏览器动作(W3C) 
    } else {
        window.event.returnValue = false; //IE中阻止函数器默认动作的方式 
    }
    return false;
}

$("#handover").unbind("click");
$("#handover").click(function () {
    if (SuccessionSwitch) {
        var gonghao = "";
        if (_g_user_config.sv_code_Name == null) { gonghao = "管理员" } else { gonghao = _g_user_config.sv_code_Name }//_g_user_config.order_operator
        Deke.DeKe_dialog.show_Url2("员工工号:" + gonghao, "/employeeHandover/_PartialEmployeeHandover", employeeHandover, ['650px', '520px']);
    }
    else {
        layer.msg("未开启交接班功能！");
    }
});

var successionPrintModel = null;
//交接班对账按钮
$(document).off("click", "#successionReconciliation");
$(document).on('click', "#successionReconciliation", function () {
    SuccessionMethods($("#selectDate-money").val(), $("#selectDate-money2").val())
});

//交接班打印按钮
$(document).off("click", "#successionPrint");
$(document).on('click', "#successionPrint", function () {

    if ($(this).hasClass("open")) {
        $(this).removeClass("open");
    } else {
        $(this).addClass("open");
    }
});

function PrintSuccessionInfo() {
    if (successionPrintModel == null) {
        return;
    }
    //安卓交接班打印
    var sunmi_mzdzd_postData = {
        //-------------头部数据-----------------
        "HeaderList": [],
        //-------------中部数据-----------------
        "BodyList": [],
        //-------------标题数据-----------------
        "TitleList": [],
        //-------------页脚数据-----------------
        "FooterList": [
        ],
        //-------------店铺logo数据-----------------
        "LogoData": null,
        //-------------二维码数据-----------------
        "QRCodeData": null,
        //-----------------1：打印，0：预览-----------------
        "Action": 1,
        //-----------------0:58mm,1:80mm-----------------
        "PageType": 1
    };

    if (((typeof Cef) !== 'undefined') || true) {

        var printdata = {
            "HeadDataList": [
                {
                    "Content": "",
                    "XCoordinates": 0,
                    "YCoordinates": 5,
                    "Align": 1,
                    "width": 188,
                    "height": 48
                },
                {
                    "Content": "",
                    "XCoordinates": 0,
                    "YCoordinates": 76,
                    "Align": 1,
                    "width": 188,
                    "height": 51
                },
                {
                    "Content": "0(人)",
                    "XCoordinates": 49,
                    "YCoordinates": 127,
                    "Align": 1,
                    "width": 139,
                    "height": 51
                },
                {
                    "Content": "0(人)",
                    "XCoordinates": 49,
                    "YCoordinates": 178,
                    "Align": 1,
                    "width": 139,
                    "height": 51
                }
            ],
            "AddMembersList": [
                {
                    "Content": "0个(默认等级)",
                    "XCoordinates": 49,
                    "YCoordinates": 229,
                    "Align": 1,
                    "width": 139,
                    "height": 28
                }
            ],
            "BottomDataList": [
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 453,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 481,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 509,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 537,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 565,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 593,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 621,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 649,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 707,
                    "Align": 1,
                    "width": 139,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 791,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 819,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 847,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 875,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 93,
                    "YCoordinates": 903,
                    "Align": 1,
                    "width": 95,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 931,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 959,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 987,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 1015,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 49,
                    "YCoordinates": 1043,
                    "Align": 1,
                    "width": 61,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 93,
                    "YCoordinates": 1071,
                    "Align": 1,
                    "width": 95,
                    "height": 28
                },
                {
                    "Content": "0(次)",
                    "XCoordinates": 93,
                    "YCoordinates": 1099,
                    "Align": 1,
                    "width": 95,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 93,
                    "YCoordinates": 1127,
                    "Align": 1,
                    "width": 95,
                    "height": 28
                },
                {
                    "Content": "0(件)",
                    "XCoordinates": 93,
                    "YCoordinates": 1155,
                    "Align": 1,
                    "width": 95,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 55,
                    "YCoordinates": 1211,
                    "Align": 1,
                    "width": 133,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 93,
                    "YCoordinates": 1267,
                    "Align": 1,
                    "width": 95,
                    "height": 28
                },
                {
                    "Content": "￥0",
                    "XCoordinates": 93,
                    "YCoordinates": 1295,
                    "Align": 1,
                    "width": 95,
                    "height": 28
                }
            ],
            "Images":
            [
                {
                    "H": "http://decerp.cc/printimages/h.jpg",
                    "M": "http://decerp.cc/printimages/1.jpg",
                    "T": "http://decerp.cc/printimages/t.jpg",
                }
            ],
            "PageType": 0
        };
        var frontImageHeight = 233;
        var width = 188;
        //店铺名称
        var HeadDataList = [];
        if ($("#username") != null && $("#username").text() != null && $("#username").text() != "") {
            HeadDataList.push({
                "Content": $("#username").text(),
                "XCoordinates": 0,
                "YCoordinates": 5,
                "Align": 1,
                "width": width,
                "height": 48
            });
            sunmi_mzdzd_postData.HeaderList.push({
                "Content": $("#username").text(),
                "XCoordinates": 0,
                "YCoordinates": 5,
                "Align": 1,
                "width": width,
                "height": 48
            });
        } else {
            HeadDataList.push({
                "Content": $("#StoreSearch").find("option:selected").text(),
                "XCoordinates": 0,
                "YCoordinates": 5,
                "Align": 1,
                "width": width,
                "height": 48
            });
            sunmi_mzdzd_postData.HeaderList.push({
                "Content": $("#StoreSearch").find("option:selected").text(),
                "XCoordinates": 0,
                "YCoordinates": 5,
                "Align": 1,
                "width": width,
                "height": 48
            });
        }
        var searchDate = $("#selectDate-money").val();
        searchDate += "至\r\n";
        searchDate += $("#selectDate-money2").val();
        HeadDataList.push({
            "Content": searchDate,
            "XCoordinates": 0,
            "YCoordinates": 76,
            "Align": 0,
            "width": width,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": searchDate,
            "XCoordinates": 0,
            "YCoordinates": 76,
            "Align": 0,
            "width": width,
            "height": 51
        });
        HeadDataList.push({
            "Content": successionPrintModel.individual + "人",
            "XCoordinates": 49,
            "YCoordinates": 127,
            "Align": 1,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "......................................",
            "Align": 0
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "散客消费：" + successionPrintModel.individual + "人",
            "XCoordinates": 49,
            "YCoordinates": 127,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        HeadDataList.push({
            "Content": successionPrintModel.userindividual + "人",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 1,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "会员消费：" + successionPrintModel.userindividual + "人",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        printdata.HeadDataList = HeadDataList;
        var lives = null;
        if (successionPrintModel.live != null) {
            lives = successionPrintModel.live.Count;
        }

        var AddMembersList = [];
        if (lives <= 0) {
            lives = 1;
            var nullMemeber = {
                "Content": 0 + "个()",
                "XCoordinates": 49,
                "YCoordinates": frontImageHeight + 11,
                "Align": 1,
                "width": 139,
                "height": 32
            };
            frontImageHeight = frontImageHeight + 20;
            AddMembersList.push(nullMemeber);

        } else {
            var lives_info = successionPrintModel.live;
            if (lives == 1) {
                for (var i = 0; i < lives_info.length; i++) {
                    var nullMemeber = {
                        "Content": lives_info[i].count + "个(" + lives_info[i].name + ")",
                        "XCoordinates": 49,
                        "YCoordinates": frontImageHeight + 11,
                        "Align": 1,
                        "width": 139,
                        "height": 32
                    };
                    frontImageHeight = frontImageHeight + 20;
                    AddMembersList.push(nullMemeber);
                }

            } else if (lives == 2) {
                for (var i = 0; i < lives_info.length; i++) {
                    var nullMemeber = {
                        "Content": lives_info[i].count + "个(" + lives_info[i].name + ")",
                        "XCoordinates": 49,
                        "YCoordinates": i == 0 ? frontImageHeight + 11 : frontImageHeight + 57,
                        "Align": 1,
                        "width": 139,
                        "height": 32
                    };
                    if (i == lives_info.length - 1) {
                        frontImageHeight = nullMemeber.YCoordinates;
                    }
                    AddMembersList.push(nullMemeber);


                    sunmi_mzdzd_postData.HeaderList.push({
                        "Content": "新增：," + lives_info[i].count + "个(" + lives_info[i].name + ")会员",
                        "XCoordinates": 49,
                        "YCoordinates": 178,
                        "Align": 0,
                        "width": 139,
                        "height": 51
                    });


                }

            } else {
                for (var i = 0; i < lives_info.length; i++) {
                    var nullMemeber = {
                        "Content": lives_info[i].count + "个(" + lives_info[i].name + ")",
                        "XCoordinates": 49,
                        "YCoordinates": frontImageHeight + (28 * i),
                        "Align": 1,
                        "width": 139,
                        "height": 32
                    };
                    if (i == lives_info.length - 1) {
                        frontImageHeight = nullMemeber.YCoordinates;
                    }

                    AddMembersList.push(nullMemeber);
                    sunmi_mzdzd_postData.HeaderList.push({
                        "Content": "新增：," + lives_info[i].count + "个(" + lives_info[i].name + ")会员",
                        "XCoordinates": 49,
                        "YCoordinates": 178,
                        "Align": 0,
                        "width": 139,
                        "height": 51
                    });
                }
            }
        }

        printdata.AddMembersList = [];
        var BottomDataList = [];
        //会员储值 开始
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.xmoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "会员储值：",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "现金（" + "¥" + successionPrintModel.xmoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.wmoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "微信（" + "¥" + successionPrintModel.wmoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.ymoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 3,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "银行卡（" + "¥" + successionPrintModel.ymoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.zmoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 4,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "支付宝（" + "¥" + successionPrintModel.zmoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        //-------------会员储值 结束

        BottomDataList.push({
            "Content": "¥" + successionPrintModel.qxmoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 5,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "充次储值",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "现金（" + "¥" + successionPrintModel.qxmoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.qwxmoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 6,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "微信（" + "¥" + successionPrintModel.qxmoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.qymoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 7,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "银行卡（" + "¥" + successionPrintModel.qymoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.qzmoney.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 8,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "支付宝（" + "¥" + successionPrintModel.qzmoney.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });

        // --- 会员总收入
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.deposit.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + (28 * 7) + 86,
            "Align": 1,
            "width": 188 - 49,
            "height": 28
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "会员总收入：" + "¥" + successionPrintModel.deposit.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "......................................",
            "Align": 0
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "消费数据统计",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "--散客消费",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.sxreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 13 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "现金（" + "¥" + successionPrintModel.sxreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.swreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 14 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "微信（" + "¥" + successionPrintModel.swreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.syreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 15 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "银行卡（" + "¥" + successionPrintModel.syreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.szreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 16 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "支付宝（" + "¥" + successionPrintModel.szreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.xk_receivable.toFixed(2),
            "XCoordinates": 93,
            "YCoordinates": frontImageHeight + 28 * 17 + 2,
            "Align": 1,
            "width": 188 - 93,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "散客消费总额：" + "¥" + successionPrintModel.xk_receivable.toFixed(2) + "",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "--会员消费",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });

        BottomDataList.push({
            "Content": "¥" + successionPrintModel.xreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 18 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "现金（" + "¥" + successionPrintModel.xreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.wreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 19 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "微信（" + "¥" + successionPrintModel.wreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.yreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 20 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "银行卡（" + "¥" + successionPrintModel.yreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.creceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 21 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "储值卡（" + "¥" + successionPrintModel.creceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.zreceivable.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": frontImageHeight + 28 * 22 + 2,
            "Align": 2,
            "width": 127 - 49,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "支付宝（" + "¥" + successionPrintModel.zreceivable.toFixed(2) + "）",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 2,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "会员消费总额：" + "¥" + successionPrintModel.hy_receivable.toFixed(2) + "",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.hy_receivable.toFixed(2),
            "XCoordinates": 93,
            "YCoordinates": frontImageHeight + 28 * 23 + 2,
            "Align": 2,
            "width": 188 - 93,
            "height": 32
        });
        BottomDataList.push({
            "Content": successionPrintModel.jici + "次",
            "XCoordinates": 93,
            "YCoordinates": frontImageHeight + 28 * 24 + 2,
            "Align": 2,
            "width": 188 - 93,
            "height": 32
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "计次消费总次：" + successionPrintModel.jici + "次",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": '¥0.00',
            "XCoordinates": 93,
            "YCoordinates": frontImageHeight + 28 * 25 + 2,
            "Align": 2,
            "width": 188 - 93,
            "height": 32
        });
        BottomDataList.push({
            "Content": '¥0.00',
            "XCoordinates": 93,
            "YCoordinates": frontImageHeight + 28 * 26 + 2,
            "Align": 2,
            "width": 188 - 93,
            "height": 32
        });
        BottomDataList.push({
            "Content": "¥" +
            (parseFloat(successionPrintModel.xk_receivable || 0) +
                parseFloat(successionPrintModel.hy_receivable || 0) +
                (parseFloat(successionPrintModel.xmoney || 0) +
                    parseFloat(successionPrintModel.wmoney || 0) +
                    parseFloat(successionPrintModel.ymoney || 0) +
                    parseFloat(successionPrintModel.zmoney || 0) +
                    parseFloat(successionPrintModel.qxmoney || 0) +
                    parseFloat(successionPrintModel.qwxmoney || 0) +
                    parseFloat(successionPrintModel.qymoney || 0) +
                    parseFloat(successionPrintModel.qzmoney || 0))).toFixed(2),
            "XCoordinates": 55,
            "YCoordinates": frontImageHeight + 28 * 28 + 2,
            "Align": 2,
            "width": 188 - 55,
            "height": 28
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "综合总输入：" + "¥" +
            (parseFloat(successionPrintModel.xk_receivable || 0) +
                parseFloat(successionPrintModel.hy_receivable || 0) +
                (parseFloat(successionPrintModel.xmoney || 0) +
                    parseFloat(successionPrintModel.wmoney || 0) +
                    parseFloat(successionPrintModel.ymoney || 0) +
                    parseFloat(successionPrintModel.zmoney || 0) +
                    parseFloat(successionPrintModel.qxmoney || 0) +
                    parseFloat(successionPrintModel.qwxmoney || 0) +
                    parseFloat(successionPrintModel.qymoney || 0) +
                    parseFloat(successionPrintModel.qzmoney || 0))).toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        BottomDataList.push({
            "Content": "¥" + successionPrintModel.ase_expenditure_money.toFixed(2),
            "XCoordinates": 93,
            "YCoordinates": frontImageHeight + 28 * 30 + 2,
            "Align": 2,
            "width": 188 - 93,
            "height": 32
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "门店支出：" + "¥" + successionPrintModel.ase_expenditure_money.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        var total = parseFloat(successionPrintModel.xmoney || 0) +
            parseFloat(successionPrintModel.qxmoney || 0) +
            parseFloat(successionPrintModel.sxreceivable || 0) +
            parseFloat(successionPrintModel.xreceivable || 0);
        BottomDataList.push({
            "Content": "¥" + total.toFixed(2),
            "XCoordinates": 93,
            "YCoordinates": frontImageHeight + 28 * 31 + 2,
            "Align": 2,
            "width": 188 - 93,
            "height": 32
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "现金结存：" + "¥" + total.toFixed(2),
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "_____________________________________",
            "Align": 0
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "",
            "Align": 0
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "收银签字：",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "",
            "Align": 0
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "",
            "Align": 0
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "店长签字：",
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });

        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "",
            "Align": 0
        });
        var date = new Date();
        var strdate = date.getFullYear() +
            "-" +
            date.getMonth() +
            "-" +
            date.getDay() +
            "  " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
        BottomDataList.push({
            "Content": "打印时间：\r\n" + strdate,
            "XCoordinates": 0,
            "YCoordinates": frontImageHeight + 28 * 34 + 2,
            "Align": 0,
            "width": 188,
            "height": 28 * 2
        });
        sunmi_mzdzd_postData.HeaderList.push({
            "Content": "打印时间：" + strdate,
            "XCoordinates": 49,
            "YCoordinates": 178,
            "Align": 0,
            "width": 139,
            "height": 51
        });

        printdata.BottomDataList = BottomDataList;
        var images = [];
        lives = 1;
        images.push({
            "H": "http://decerp.cc/images/printimages/h.jpg",
            "M": "http://decerp.cc/images/printimages/" + lives + ".jpg",
            "T": "http://decerp.cc/images/printimages/t.jpg",
        });
        //images.push({
        //    "H":"http://192.168.1.220:86/images/printimages/h.jpg",
        //    "M":"http://192.168.1.220:86/images/printimages/"+lives+".jpg",
        //    "T":"http://192.168.1.220:86/images/printimages/t.jpg",
        //})
        printdata.PageType = 0;
        printdata.Images = images;


        try
        {
            if (((typeof Cef) !== 'undefined')) {
                Cef.MRDZDPrint(JSON.stringify(printdata));
            }else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
            {
                cordova.plugins.barcodeScanner.print(
                                                function(result) {
                                                },
                                                function(error) {
                                                    alert("打印失败: " + error);
                                                },
                                                {
                                                    myPrintData: JSON.stringify(sunmi_mzdzd_postData)

                                                }
                                            );
            }
        } catch (e) {
            console.log(e.message);

            layer.msg("请去官网下载最新客户端");
        }
    } else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
    {
        try
        {
          


            cordova.plugins.barcodeScanner.print(
                                            function(result) {
                                            },
                                            function(error) {
                                                alert("打印失败: " + error);
                                            },
                                            {
                                                myPrintData: JSON.stringify(sunmi_mzdzd_postData)

                                            }
                                        );
        } catch (e) {
            
        } 
    }
    //退出系统
    var ajaxTimeoutTest = $.ajax({
        url: '/AjaxUser/LogOut',  //请求的URL
        timeout: 5000, //超时时间设置，单位毫秒
        type: 'post',  //请求方式，get或post
        data: { order_operator: _g_user_config.order_operator, startDate: $("#selectDate-money").val(), endDate: $("#selectDate-money2").val(), flag: "exit" },  //请求所传参数，json格式
        dataType: 'json',//返回的数据格式
        success: function (data) { //请求成功的回调函数

            if (_g_is_distributor_customer || verify_distributor_id == 100) {
                location.href = '/Dealerlogin.html';

            } else {
                location.href = '/login.html';
            }

        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                ajaxTimeoutTest.abort();
                layer.msg("交接班请求超时");
                preventTheRepeatClick = true;
            }
        }
    });

}
var preventTheRepeatClick = true;//用于防止重复点击交接版退出按钮
//交接班并退出
//$(document).off("click", "#successionAndExit");
$(document).on('click', "#successionAndExit", function () {
    if (preventTheRepeatClick) {
        preventTheRepeatClick = false;
        //记录交接班信息
        if ($("#successionPrint").hasClass("open")) {
            PrintSuccessionInfo();
        } else {
            var ajaxTimeoutTest = $.ajax({
                url: '/AjaxUser/LogOut',  //请求的URL
                timeout: 5000, //超时时间设置，单位毫秒
                type: 'post',  //请求方式，get或post
                data: { order_operator: _g_user_config.order_operator, startDate: $("#selectDate-money").val(), endDate: $("#selectDate-money2").val(), flag: "exit" },  //请求所传参数，json格式
                dataType: 'json',//返回的数据格式
                success: function (data) { //请求成功的回调函数

                    if (_g_is_distributor_customer || verify_distributor_id == 100) {
                        location.href = '/Dealerlogin.html';

                    } else {
                        location.href = '/login.html';
                    }

                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    if (status == 'timeout') {//超时,status还有success,error等值的情况
                        ajaxTimeoutTest.abort();
                        layer.msg("交接班请求超时");
                        preventTheRepeatClick = true;
                    }
                }
            });
        }
    }
});

//交接班的函数
function employeeHandover() {
    //开始时间
    var start = {
        elem: '#selectDate-money',
        format: 'YYYY/MM/DD hh:mm:ss',
        min: laydate.now(-365), //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istime: true,
        istoday: false,
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };

    //结束时间
    var end = {
        elem: '#selectDate-money2',
        format: 'YYYY/MM/DD hh:mm:ss',
        min: laydate.now(),
        max: laydate.now(),
        istime: true,
        istoday: false,
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
            start.min = minusSelectDate(datas, 365);
        }
    };
    laydate(start);
    laydate(end);
    laydate.skin('molv');//主题皮肤
    SuccessionMethods("", "");
}


//交接班数据查询并显示到窗口
function SuccessionMethods(startDate, endDate) {
    var loadIndex = commonOpenLoading();
    $.getJSON("/intelligent/Succession", { order_operator: _g_user_config.order_operator, startDate: startDate, endDate: endDate }, function (data) {
        commonCloseLoading(loadIndex);
        if (data != null) {
            successionPrintModel = data;

            $("#Succession_individual").html(data.individual);//散客消费人数
            $("#Succession_userindividual").html(data.userindividual);//会员消费人数
            //会员
            $("#Succession_xreceivable").html(data.xreceivable);//现金
            $("#Succession_wreceivable").html(data.wreceivable);//微信
            $("#Succession_yreceivable").html(data.yreceivable);//银行卡
            $("#Succession_creceivable").html(data.creceivable);//储值卡
            $("#Succession_zreceivable").html(data.zreceivable);//支付宝

            $("#Succession_mreceivable").html(data.mreceivable);//美团
            $("#Succession_kreceivable").html(data.kreceivable);//口碑
            $("#Succession_sreceivable").html(data.sreceivable);//闪惠
            $("#Succession_sszreceivable").html(data.sszreceivable);//赊账

            $("#Succession_hy_receivable").html(data.hy_receivable);//总额

            //散客
            $("#Succession_sxreceivable").html(data.sxreceivable);//现金
            $("#Succession_swreceivable").html(data.swreceivable);//微信
            $("#Succession_syreceivable").html(data.syreceivable);//银行卡
            $("#Succession_szreceivable").html(data.szreceivable);//支付宝
            $("#Succession_smreceivable").html(data.smreceivable);//美团
            $("#Succession_skreceivable").html(data.skreceivable);//口碑
            $("#Succession_ssreceivable").html(data.ssreceivable);//闪惠
            $("#Succession_xk_receivable").html(data.xk_receivable);//总额

            $("#Succession_jici").html(data.jici);//计次

            var total = (data.xk_receivable + (data.xmoney + data.wmoney + data.ymoney + data.zmoney + data.qxmoney + data.qwxmoney + data.qymoney + data.qzmoney + data.xreceivable + data.wreceivable + data.yreceivable + data.zreceivable));
            $("#Succession_totalRevenue").html(total);//总收入
            $("#successionStartTime").html(data.startTime);
            $("#successionEndTime").html(data.endTime);
            $("#selectDate-money").val(data.startTime);
            $("#selectDate-money2").val(data.endTime);

        }
    });
}
//获取没日流水号
function GetDailySerialNumber(plusone) {
    var entityliushui;
    var svUserConfigdetailId;
    var svUserConfigId;
    var svUserModuleId;
    var svUserConfigenable =false;
    try {
        PreferentialTopUpGivingConfigList("EveryDaySerialNumber", "EveryDaySerialNumber");
        if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0)
        {
            svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
            svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
            svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id;
            svUserConfigenable = Preferential_TopUpGiving_ConfigList[0].sv_detail_is_enable;
            if (!svUserConfigenable)
            {
                return "";
            }
            var svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;

            if (svDetailValue) {
                entityliushui = JSON.parse(svDetailValue);
                if (entityliushui.datetime != new Date().getDate().toString() &&
                    liushuihaoDate != new Date().getDate().toString()) {
                    liushuihaoDate = new Date().getDate().toString();
                    g_liushuihao = "1";
                }
            }
        }
        var serialNumberstr = serialNumberOfDailyExpressions;
        var ABC = [
            '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        var abc = [
            '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'
        ];
        var returnSerialNumber = "";
        //查找表达式
        if (serialNumberstr.indexOf("{") >= 0) {
            var biaodashi = "";
            var bdcflag = false;
            for (var i = 0; i < serialNumberstr.length; i++) {
                if (serialNumberstr[i] == '}') {
                    var newStr = "";
                    bdcflag = false;
                    //在此处识别表达式
                    //收索关键字，now、week、.toABC
                    if (biaodashi.indexOf("now") >= 0) {
                        var myDate = new Date();
                        if (biaodashi.indexOf("now.m") >= 0) {
                            newStr = myDate.getMonth() + 1;
                        }
                        if (biaodashi.indexOf("now.y") >= 0) {
                            newStr = myDate.getFullYear();
                        }
                        if (biaodashi.indexOf("now.d") >= 0) {
                            newStr = myDate.getDate();
                        }
                    }
                    if (biaodashi.indexOf("week") >= 0) {
                        var myDate = new Date();
                        newStr = myDate.getDay();
                    }
                    if (biaodashi.indexOf(".toABC") >= 0) {
                        var n = parseInt(newStr);
                        var s = "";
                        while (n > 0) {
                            var m = n % 26;
                            if (m == 0) m = 26;
                            s = ABC[m] + s;
                            n = (n - m) / 26;
                        }
                        newStr = s;
                    }
                    if (biaodashi.indexOf(".toabc") >= 0) {
                        var n = parseInt(newStr);
                        var s = "";
                        while (n > 0) {
                            var m = n % 26;
                            if (m == 0) m = 26;
                            s = abc[m] + s;
                            n = (n - m) / 26;
                        }
                        newStr = s;
                    }
                    serialNumberstr = serialNumberstr.replace("{" + biaodashi + "}", newStr + "");
                    biaodashi = "";
                    i = 0;
                }
                if (bdcflag) {
                    biaodashi += serialNumberstr[i];
                }
                if (serialNumberstr[i] == '{') {
                    bdcflag = true;
                }
            }
        }
        //查找填充符
        if (serialNumberstr.indexOf("[") >= 0) {
            var str = g_liushuihao.toString();
            var count = 0;
            for (var i = 0; i < serialNumberstr.length; i++) {
                if (serialNumberstr[i] == '[') {
                    count++;
                }
            }
            var copyserialNumber = "";
            var copycount = 0;
            for (var i = 0; i < serialNumberstr.length; i++) {
                if (serialNumberstr[i] != '[' && serialNumberstr[i] != ']') {
                    copyserialNumber += serialNumberstr[i];
                } else {
                    copycount++;
                    if ((count - str.length) * 2 <= copycount) {
                        break;
                    }
                }
            }
            copyserialNumber += str;
            if (serialNumberstr.lastIndexOf("]") != -1) {
                copyserialNumber += serialNumberstr.substr(serialNumberstr.lastIndexOf("]") + 1);
            }
            serialNumberstr = copyserialNumber;
        }
        if (plusone)
        {
            g_liushuihao = parseInt(g_liushuihao) + 1;
            //流水号加1

            if (entityliushui) {
                entityliushui.SerialNumber = g_liushuihao;
                if (entityliushui.datetime != new Date().getDate().toString()) {
                    entityliushui.datetime = new Date().getDate().toString();
                    entityliushui.SerialNumber = 1;
                }
                var svDetailValue = JSON.stringify(entityliushui);
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
                    "sv_detail_is_enable": _g_everyDaySerialNumber,
                    "sv_user_configdetail_name": "是否启用每日流水号",
                    "sv_remark": "是否启用每日流水号"
                };
                detaillist.push(data);
                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=EveryDaySerialNumber',
                    detaillist,
                    function (result) {
                        if (result) {
                            if (result == 1) {

                            } else if (result == -2) {
                                layer.msg("每日流水号你没有该操作权限！");
                            } else {
                                layer.msg("每日流水号自增长保存失败！");
                            }
                        }
                    });
            }
        }
        return serialNumberstr;
    } catch (e) {

    }
    return "";
}

// 通用文件下载
function commonDownloadFile(fileUrl) {
    // PC客户端下载
    if (((typeof Cef) !== 'undefined')) {
        Cef.Download(fileUrl);
    }
    else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android) {
        try {
            //Android客户端下载
            cordova.plugins.barcodeScanner.dwonloadexcel(
                function (result) {
                },
                function (error) {
                    layer.msg("下载失败！" );
                },
                {
                    myPrintImg: fileUrl
                }
            );
        }
        catch (e) {
            layer.msg("下载失败!");
        }
    }
    else {
        location.href = fileUrl;
    }
}