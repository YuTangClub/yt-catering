//关闭检测(禁用手动输入)
function InputValidationClose() {
    clearTimeout(disableInputvalidationInterval1);
    clearTimeout(disableInputvalidationInterval2);
}
var InputValidationarrs = [];
var disableInputcount = 0;
var _g_disableInputobj;
var _g_disableInputautoClose;
var _g_DisableManualInput = false;
if (!(typeof (g_DisableManualInput) == "undefined")) {
    _g_DisableManualInput = g_DisableManualInput;
}

if ((typeof (g_memberAutoIdstr) == "undefined"))
{
    g_memberAutoIdstr = false;
}
//启动检测(禁用手动输入)
function disableInputvalidation(obj, autoClose) {
    if (_g_DisableManualInput) {
        if (autoClose == null) {
            autoClose = true;
        }
        _g_disableInputobj = obj;
        _g_disableInputautoClose = autoClose;
        var validationFlag = false;
        var oldstr = "";
        if (_g_disableInputobj != null) {
            disableInputvalidationInterval1 = setInterval(function () {
                if (oldstr != $(_g_disableInputobj).val()) {
                    oldstr = $(_g_disableInputobj).val();
                    InputValidationarrs[InputValidationarrs.length] = disableInputcount;
                }
                var sudu = 0;
                if (InputValidationarrs != null && InputValidationarrs.length >= 2) {
                    sudu = InputValidationarrs[1] - InputValidationarrs[0];
                    if (sudu > 10) {
                        $(_g_disableInputobj).val("");
                        oldstr = "";
                        InputValidationarrs = [];
                    } else {
                        for (var i = 1 ; i < InputValidationarrs.length - 1; i++) {
                            if (InputValidationarrs[i + 1] - InputValidationarrs[i] + 10 > sudu && InputValidationarrs[i + 1] - InputValidationarrs[i] - 10 < sudu) {
                                if (_g_disableInputautoClose) {
                                    InputValidationClose();
                                }
                            } else {
                                $(_g_disableInputobj).val("");
                                oldstr = "";
                                InputValidationarrs = [];
                            }
                        }
                    }
                }
            }, "1");
            disableInputvalidationInterval2 = setInterval(function () {
                disableInputcount++;
            }, "1");
        }
    }
}
var disableInputvalidationInterval1;
var disableInputvalidationInterval2;
//获取自动id
function getAutoId(obj, ConfigStr1, ConfigStr2) {
    PreferentialTopUpGivingConfigList(ConfigStr1, ConfigStr2);
    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
        if (g_memberAutoIdstr == null || g_memberAutoIdstr == "") {
            g_memberAutoIdstr = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
        }
        if (g_memberAutoIdstr == null || g_memberAutoIdstr.trim() == "") {
            $(obj).val("000001");
            g_memberAutoIdstrOld = "000002";
        } else {
            $(obj).val(g_memberAutoIdstr);
            var memberAutoId = parseInt(g_memberAutoIdstr) + 1;
            g_memberAutoIdstrOld = memberAutoId.toString();
            var AddLenthid = 6 - g_memberAutoIdstrOld.length;
            if (AddLenthid > 0) {
                var zero = "";
                for (var i = 1; i <= AddLenthid; i++) {
                    zero += "0";
                }
                g_memberAutoIdstrOld = zero + g_memberAutoIdstrOld;
            }
        }

    }
}
//设置自动id加一
function setAutoIdplusOne(beizhu, ConfigStr1, ConfigStr2) {
    if (g_memberAutoIdstrOld != null && g_memberAutoIdstrOld != "") {
        setMemberidAuto(g_memberAutoIdstrOld, beizhu, ConfigStr1, ConfigStr2);
        g_memberAutoIdstr = g_memberAutoIdstrOld;
    }
}
//设置自动id
function manualSettingsId(AutoIdstr) {
    AutoIdstr = DeleteChar(AutoIdstr);
    var memberAutoId = parseInt(AutoIdstr) + 1;
    g_memberAutoIdstrOld = memberAutoId.toString();
    var AddLenthid = 6 - g_memberAutoIdstrOld.length;
    if (AddLenthid > 0) {
        var zero = "";
        for (var i = 1; i <= AddLenthid; i++) {
            zero += "0";
        }
        g_memberAutoIdstrOld = zero + g_memberAutoIdstrOld;
    }
}
//更新数据库
function setMemberidAuto(obj, beizhu, ConfigStr1, ConfigStr2) {
    obj = DeleteChar(obj);
    var svUserConfigdetailId;
    var svDetailValue = obj;
    var svUserConfigId;
    var svUserModuleId;
    PreferentialTopUpGivingConfigList(ConfigStr1, ConfigStr2);
    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {

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
        "sv_detail_is_enable": true,
        "sv_user_configdetail_name": beizhu,
        "sv_remark": beizhu
    };
    detaillist.push(data);
    $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=AutomaticallyGenerateMemberId',
           detaillist, function (result) {
               if (result) {
                   if (result == 1) {

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
//删除0-9以外的字符
function DeleteChar(obj) {
    var str = "";
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] == "0" || obj[i] == "1" || obj[i] == "2" || obj[i] == "3" || obj[i] == "4" || obj[i] == "5" || obj[i] == "6" || obj[i] == "7" || obj[i] == "8" || obj[i] == "9") {
                str += obj[i];
            }
        }
    }
    return str;
}
//检查重复提交(删除id号)
function inspectCommitRepeatedlyGetDeleteId(id) {
    for (var i = 0; i < g_SubmitIdList.length; i++) {
        if (id == g_SubmitIdList[i]) {
            g_SubmitIdList[i] = "";
            return true;
        }
    }
    return false;
}
//检查重复提交(查找id号是否存在)
function inspectCommitRepeatedlyFindIfItExists(id) {
    for (var i = 0; i < g_SubmitIdList.length; i++) {
        if (id == g_SubmitIdList[i]) {
            return true;
        }
    }
    g_SubmitIdList[g_SubmitIdList.length] = id;
    return false;
}