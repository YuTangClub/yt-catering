var GetUserLevel = "";//等级信息
var BindingOptions = [];
$(document).ready(function () {
    SaveConfigdetailOperate();
    GetList();
    $(document).on("click", ".swtith i", function () {
        $(this).parent().toggleClass('open');
        $(this).parents('.swtith').parent().next().find("input").removeAttr("readonly", "readonly");
        $(this).parents('.swtith').parent().next().find(".kkbtn").removeClass("disabled");
        if ($(this).parents('.swtith').data("id") != 0) {
            $.post("/UserModuleConfig/ConfigdetailOperate", { id: $(this).parents('.swtith').data("id"), valu: $(this).parents('.swtith').is(".open") }, function (data) {
                if (data) {
                    layer.msg("保存成功");
                }
                else {
                    layer.msg("操作失败，请稍后重试！");
                }
            });
        } else {
            layer.msg("操作成功");
        }
    });
    //提示弹出框
    $(document).on("mouseover", ".tips", function () {
        index = layer.tips($(this).data("content"), $(this), {
            tips: [2, '#3595CC'],
            time: 5000,
            area:['40%','55px']
        });
    });
});
//查询
function GetList()
{
    $.getJSON("/UserModuleConfig/GetUserModuleConfigList", { module_code: $("#sv_user_module_code").val() }, function (data) {

        if (data != null) {
            for (var key in data) {
                GetUserLevel = data["getUserLevel"];
                if (key == "sv_user_module_name") {
                    $("#" + key).text(data[key]);
                    $(".content").show();
                }
                else if (key == "sv_user_module_id") {
                    $("#" + key).val(data[key])
                } else if (key == "childInfolist" && data[key]) {
                    var html1 = "";
                    //循环配置
                    for (var i = 0; i < data[key].length; i++) {
                        var Childhtml = "";
                        var html = '<div class="makstbox mat15" id="configid_ ' + data[key][i].sv_user_config_id + '">';
                        html += '<div class="timsl">';
                        html += '<span>' + data[key][i].sv_user_config_name + ':</span>';

                        if (data[key][i].sv_user_config_name.indexOf("次") < 0 && data[key][i].sv_user_config_name.indexOf("充次")) {
                            html += '<div class="stecs  ChooseType' + data[key][i].sv_user_config_id + '"id=' + data[key][i].sv_user_config_id + "_1" + ' data-val="1" data-name="送积分"  onclick="ChooseTypeOperate(this,' + data[key][i].sv_user_config_id + ')">';
                            html += '<i></i>';
                            html += '<span>送积分</span>';
                        } else {
                            html += '<div class="stecs  ChooseType' + data[key][i].sv_user_config_id + '" id=' + data[key][i].sv_user_config_id + "_1" + ' data-val="1" data-name="送次"  onclick="ChooseTypeOperate(this,' + data[key][i].sv_user_config_id + ')">';
                            html += '<i></i>';
                            html += '<span>送次</span>';
                        }
                        html += '</div>';
                       
                        if (data[key][i].sv_user_config_name.indexOf("充值") >= 0)
                        {
                            html += '<div class="stecs  ChooseType' + data[key][i].sv_user_config_id + '" id=' + data[key][i].sv_user_config_id + "_2" + ' data-val="2" data-name="赠送" onclick="ChooseTypeOperate(this,' + data[key][i].sv_user_config_id + ')" >';
                            html += '<i></i>';
                            html += '<span>赠送</span>';
                        }
                        else
                        {
                            html += '<div class="stecs  ChooseType' + data[key][i].sv_user_config_id + '" id=' + data[key][i].sv_user_config_id + "_2" + ' data-val="2" data-name="立减现金" onclick="ChooseTypeOperate(this,' + data[key][i].sv_user_config_id + ')" >';
                            html += '<i></i>';
                            html += '<span>立减现金</span>';
                        }
                        html += '</div>';
                        html += '<div class="monibod" id="Configdetail' + data[key][i].sv_user_config_id + '">';
                        html += '<div class="mod LevelType">';
                        
                        for (var g = 0; g < GetUserLevel.length; g++) {
                            html += '<div class="stecs LevelType_' + data[key][i].sv_user_config_id + '_' + GetUserLevel[g].memberlevel_id + '"  data-val="' + GetUserLevel[g].memberlevel_id + '" data-name="' + GetUserLevel[g].sv_ml_name + '" onclick="LevelTypeOperate(this,' + data[key][i].sv_user_config_id + ',\'' + data[key][i].sv_user_config_name + '\',0)"><i></i><span>' + GetUserLevel[g].sv_ml_name + '</span></div>'
                        }
                        if (data[key][i].sv_user_config_name.indexOf("充值") >= 0) {
                            html += '<span style="color:red">《赠送》如充值一次满100元，赠送10元，应收100元,合计充值110元</span>'
                        }
                        if (data[key][i].sv_user_config_name.indexOf("充次") >= 0)
                        {
                            html += '<span style="color:red">《立减现金》如:20元/1次充次满10次合计200元,立减10元，应收190元</span>'
                            html += '<span style="color:red">《送次》如:一次性充满10次送1次，累计充次11次</span>'
                        }

                        if (data[key][i].sv_user_config_name.indexOf("消费") >= 0)
                        {
                            html += '<div class="stecs LevelType_' + data[key][i].sv_user_config_id + '_-1"  data-val="-1" data-name="散客" onclick="LevelTypeOperate(this,' + data[key][i].sv_user_config_id + ',\'' + data[key][i].sv_user_config_name + '\',0)"><i></i><span>散客</span></div>'
                            html += '<span style="color:red">会员，散客：《立减现金》如消费满100元,立减10元,收银应收90元丶《送积分》只对会员：一次性消费满1000元，送15积分,如：店铺积分规则为100元/1积分，会员应得积分为15+(1000/100元)*1积分</span>'
                        }
                        html += '</div>';
                        ///子明细 
                        if (data[key][i].childDetailList != null && data[key][i].childDetailList.length > 0) {
                            ChildDetail = data[key][i].childDetailList
                            $("#is_deleteall").val(ChildDetail.length);
                            var Add_operation_button_leveltype_id ="";
                            for (var j = 0; j < ChildDetail.length; j++) {
          
                                var BindingOptionsinfo = {
                                    "sv_user_leveltype_id": ChildDetail[j].sv_user_leveltype_id,
                                    "sv_user_config_id": data[key][i].sv_user_config_id,
                                    "sv_user_givingtype": ChildDetail[j].sv_user_givingtype
                                };
                                BindingOptions.push(BindingOptionsinfo);
                                html += '<div  data-sv_user_configdetail_id=' + ChildDetail[j].sv_user_configdetail_id + '  class="mod  configdetailinfo level_' + ChildDetail[j].sv_user_leveltype_id + '_' + ChildDetail[j].sv_user_config_id + '" data-id=' + ChildDetail[j].sv_user_config_id + '>';
                                html += '<input type="text" name="sv_user_leveltype_id"  readonly="readonly"  data-sv_user_leveltype_id="' + ChildDetail[j].sv_user_leveltype_id + '" id="sv_user_leveltype_id"  value="' + ChildDetail[j].levelName + '" class="mintext sv_user_leveltype_id_' + ChildDetail[j].sv_user_config_id + "_" + ChildDetail[j].sv_user_leveltype_id + '">';
                                if (data[key][i].sv_user_config_name.indexOf("充次") >= 0) {
                                    html += '<span name="sv_user_configdetail_name" data-sv_user_configdetail_name="' + ChildDetail[j].sv_user_configdetail_name.substr(0, 1) + '">' + ChildDetail[j].sv_user_configdetail_name.substr(0, 1) + ':</span>';
                                } else {
                                    html += '<span name="sv_user_configdetail_name" data-sv_user_configdetail_name="' + ChildDetail[j].sv_user_configdetail_name.substr(0, 2) + '">' + ChildDetail[j].sv_user_configdetail_name.substr(0, 2) + ':</span>';
                                }
                                html += '<input onblur="validation(this,\'' + ChildDetail[j].sv_user_leveltype_id + "_" + data[key][i].sv_user_config_id + '\')" onkeyup="clearNoNum(this)" onafterpaste="clearNoNum(this)" type="text" data-id=' + ChildDetail[j].sv_user_leveltype_id + ' name="sv_detali_proportionalue" value=' + ChildDetail[j].sv_detali_proportionalue + ' class="mintext proportionalue_' + data[key][i].sv_user_config_id + ' detali_proportionalue_' + ChildDetail[j].sv_user_leveltype_id + "_" + data[key][i].sv_user_config_id + '" >';
                                if (data[key][i].sv_user_config_name.indexOf("充次") >= 0)
                                {
                                    html += '<span data-sv_user_givingtype=' + ChildDetail[j].sv_user_givingtype + '   name="sv_user_givingtype"  class="ChooseType_' + data[key][i].sv_user_config_id + '">' + ChildDetail[j].sv_user_configdetail_name.substr(1, 5) + '</span>';
                                } else {
                                    html += '<span data-sv_user_givingtype=' + ChildDetail[j].sv_user_givingtype + '   name="sv_user_givingtype"  class="ChooseType_' + data[key][i].sv_user_config_id + '">' + ChildDetail[j].sv_user_configdetail_name.substr(2, 5) + '</span>';
                                }
                                
                                html += '<input onkeyup="clearNoNum(this)" onafterpaste="clearNoNum(this)" name="sv_detail_value" value=' + ChildDetail[j].sv_detail_value + ' type="text" class="mintext">';

                              
                                html += '<select class="form-control win39 unit selectType_' + data[key][i].sv_user_config_id + '" id="sv_p_commissiontype" name="sv_p_commissiontype" style="width: 60px; ' + ((data[key][i].sv_user_config_id == 2 || ChildDetail[j].sv_user_givingtype != 1) ? '' : 'display:none;') + '"> <option value="0" >' + ((data[key][i].sv_user_config_name.indexOf("充次") >= 0 && ChildDetail[j].sv_user_givingtype == 1) ? "次" : "元") + '</option><option value="1" ' + (ChildDetail[j].sv_p_commissiontype == 1 ? 'selected' : '') + ' >%</option>  </select>';

                                html += '<a href="javascript:void(0);" class="delelable" data-id="' + ChildDetail[j].sv_user_configdetail_id + '" onclick="deleteConfigDetailinfo(this,' + ChildDetail[j].sv_user_leveltype_id + ',' + ChildDetail[j].sv_user_config_id + ')"> 删除</a>';
                                if (Add_operation_button_leveltype_id != ChildDetail[j].sv_user_leveltype_id + ChildDetail[j].sv_user_config_id)
                                {
                                    Add_operation_button_leveltype_id = ChildDetail[j].sv_user_leveltype_id + ChildDetail[j].sv_user_config_id;
                                  html += '<a href="javascript:void(0);" class="kkbtn" data-id="' + ChildDetail[j].sv_user_configdetail_id + '"  onclick="LevelTypeOperate(\''+ChildDetail[j].sv_user_config_id + '_' + ChildDetail[j].sv_user_leveltype_id+ '\',' + data[key][i].sv_user_config_id + ',\'' + data[key][i].sv_user_config_name + '\',2)"> 添加</a>';
                                }
                                if (ChildDetail[j].sv_detail_is_enable) {
                                    html += '<span class="swtith open" data-name="configdetailswitch" data-id=' + ChildDetail[j].sv_user_configdetail_id + '><i class=""></i></span>';
                                }
                                else {
                                    html += '<span class="swtith" data-name="configdetailswitch" data-id=' + ChildDetail[j].sv_user_configdetail_id + '><i class=""></i></span>';
                                }

                                html += '</div>';
                            }
                        }
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html1 += html;
                    }
                    $(".configinfo").html(html1);
                    SelectedLevel();
                }

            }
        }
    });

}
//添加明细
function LevelTypeOperate(strthis, config_id, config_name, type) {
    if (type == 2)
    {
        strthis = $(".LevelType_" + strthis);
    }
    var ChooseTypetext = "";
    var ChooseType = 0;
    var _config_name="";
    $(".ChooseType" + config_id).each(function () {
        if ($(this).hasClass('on')) {
            ChooseTypetext = $(this).data("name");
            if (config_name.indexOf("充次") >= 0)
            {
                _config_name = config_name.substr(0, 1)
                if (ChooseTypetext.indexOf("次") >= 0)
                {
                    ChooseTypetext = "次" + ChooseTypetext;
                } else {
                    ChooseTypetext = "元" + ChooseTypetext;
                }
            } else {
                ChooseTypetext = "元" + ChooseTypetext;
                _config_name=config_name.substr(0, 2)
            }  
            ChooseType = $(this).data("val")
        }
    });
    if (isNullOrWhiteSpace(ChooseTypetext)) {
        if (type == 0) { $(strthis).toggleClass("on"); }
        if ($(strthis).hasClass('on')) {
             
            var html = '<div data-sv_user_configdetail_id=0 data-id=' + config_id + ' class="mod configdetailinfo level_' + $(strthis).data("val") + "_" + config_id + '">';
            html += '<input type="text"  readonly="readonly" name="sv_user_leveltype_id"  data-sv_user_leveltype_id="' + $(strthis).data("val") + '" value="' +$(strthis).data("name") + '" class="mintext sv_user_leveltype_id_' +config_id + "_" +$(strthis).data("val") + '">';
            html += '<span name="sv_user_configdetail_name" data-sv_user_configdetail_name="' + _config_name + '">' + _config_name + ':</span>';
            html += '<input onblur="validation(this,\'' + $(strthis).data("val") + '_' + config_id + '\')" onkeyup="clearNoNum(this)" onafterpaste="clearNoNum(this)" type="text" data-id=' + $(strthis).data("val") + ' name="sv_detali_proportionalue"  value="0" class="mintext proportionalue_' + config_id + ' detali_proportionalue_' + $(strthis).data("val") + "_" + config_id + '">';
            html += '<span data-sv_user_givingtype="' + ChooseType + '" name="sv_user_givingtype" class="ChooseType_' + config_id + '">' + ChooseTypetext + '</span>';
            html += '<input onkeyup="clearNoNum(this,0)" onafterpaste="clearNoNum(this,0)" calss="sv_detail_value" name="sv_detail_value" value="0" type="text" class="mintext">';

            html += '<select class="form-control win39 unit selectType_' + config_id + '" id="sv_p_commissiontype" name="sv_p_commissiontype" style="width: 60px;' + ((config_id == 2 || ChooseType != 1) ? '' : 'display:none;') + '"> <option value="0">' + ((ChooseTypetext.indexOf("次") >= 0)?'次':'元') + '</option><option value="1">%</option>  </select>';

            html += '<a href="javascript:void(0);" class="delelable" data-id="0"  onclick="deleteConfigDetailinfo(this,' + $(strthis).data("val") + ',' + config_id + ')"> 删除</a>';
            if (type!=2)
            {
                html += '<a href="javascript:void(0);" class="kkbtn" data-id="0"  onclick="LevelTypeOperate(\'' + config_id + '_' + $(strthis).data("val") + '\',' + config_id + ',\'' + config_name + '\',2)"> 添加</a>';
            }
            html += '<span class="swtith open" data-name="configdetailswitch" data-id="0"><i class=""></i></span></div>';
            if ( type == 2)
            {
                var index = $(".level_" + $(strthis).data("val") + '_' + config_id).length-1;
                $(".level_" + $(strthis).data("val") + '_' + config_id).eq(index).after(html);
            } else {
                $("#Configdetail" + config_id).append(html);
            }
           
        } else {
            $(".level_" + $(strthis).data("val") + "_" + config_id).remove();
        }

    } else {
        layer.msg("请您选择您要赠送的类型！");
        return false;
    }
}
//选择类型操作
function ChooseTypeOperate(strthis, config_id) {
   
    $(strthis).addClass("on").siblings().removeClass("on");
    if ($(strthis).hasClass('on')) {
        
        if ($(strthis).data("name").indexOf("次")>= 0) {
            $(".ChooseType_" + config_id).text("次"+$(strthis).data("name"));
            //$(".selectType_" + config_id).html('<option value="0" >次</option><option value="1" >%</option> ');
            var ops = $(".selectType_" + config_id).find("option");
            for (var i = 0; i < ops.length; i++) {
                if ($(ops[i]).val() == "0") {
                    $(ops[i]).text("次");
                }
            }
        } else {
            $(".ChooseType_" + config_id).text("元" + $(strthis).data("name"));
            
            var ops = $(".selectType_" + config_id).find("option");
            for (var i = 0; i < ops.length; i++) {
                if ($(ops[i]).val() == "0") {
                    $(ops[i]).text("元");
                }
            }
        }
     
        if ($(strthis).data("name").indexOf("送")>=0&& $(strthis).data("val")==1)
        {
            $(".LevelType_" + config_id + '_-1').hide();
            $(".level_-1_" + config_id).remove();
            $(".LevelType_" + config_id + "_-1").removeClass("on");
            if ($(strthis).data("name").indexOf("次") < 0)
                $(".selectType_" + config_id).hide();
        } else {
            $(".LevelType_" + config_id + '_-1').show();
            $(".selectType_" + config_id).show();
        }
    }
};

///移除名称
function deleteConfigDetailinfo(strthis, levelid, config_id) {
    var html = "";
    if ($(strthis.nextElementSibling).text().indexOf("添加") >= 0) {
        html =strthis.nextElementSibling;
    }
    $(strthis).parent().remove();
    if ($(".level_" + levelid + "_" + config_id).length <= 0)
    {
        $(".LevelType_" + config_id + "_" + levelid).removeClass("on");
    } else if (html!="") {
        $(html.outerHTML).insertAfter($(".level_" + levelid + "_" + config_id + " .delelable")[0]);//防止删除带添加的div
    }

    //$(".level_" + levelid + "_" + config_id).remove();
}
//选中等级
function SelectedLevel() {
    if (BindingOptions != null && BindingOptions.length > 0) {
        for (var i = 0; i < BindingOptions.length; i++) {
            if (BindingOptions[i].sv_user_givingtype == 1) {
                $(".LevelType_" + BindingOptions[i].sv_user_config_id + '_-1').hide();
            } else {
                $(".LevelType_" + BindingOptions[i].sv_user_config_id + '_-1').show();
            }
            $("#" + BindingOptions[i].sv_user_config_id + "_" + BindingOptions[i].sv_user_givingtype).addClass("on");
            $(".LevelType_" + BindingOptions[i].sv_user_config_id + "_" + BindingOptions[i].sv_user_leveltype_id).addClass("on");
            
           
        }
    }


}

//保存
function SaveConfigdetailOperate() {
    $("#SaveConfigdetail").click(function () {
        var detaillist = [];
        var sv_user_givingtype = 0;
        var config = 0;
        $(".configdetailinfo").each(function () {
            if (config != $(this).data("id")) {
                config = $(this).data("id");
                $(".ChooseType" + $(this).data("id")).each(function () {
                    if ($(this).hasClass('on')) {
                        sv_user_givingtype = $(this).data("val");
                    }
                });
            }

            var detailinfo = {
                "sv_user_configdetail_id": $(this).data("sv_user_configdetail_id"),
                "sv_user_configdetail_name": $(this).find("span[name=sv_user_configdetail_name]").data("sv_user_configdetail_name") + $(this).find("span[name=sv_user_givingtype]").text(),
                "sv_user_givingtype": sv_user_givingtype,
                "sv_user_leveltype_id": $(this).find("input[name=sv_user_leveltype_id]").data("sv_user_leveltype_id"),
                "sv_detail_value": $(this).find("input[name=sv_detail_value]").val(),
                "sv_p_commissiontype": (sv_user_givingtype == 1 && config !=2) ? 0 : $(this).find("select[name=sv_p_commissiontype]").val(),
                "sv_detali_proportionalue": $(this).find("input[name=sv_detali_proportionalue]").val(),
                "sv_user_config_id": $(this).data("id"),
                "sv_user_module_id": $("#sv_user_module_id").val(),
                "sv_detail_is_enable": $(this).find(".swtith[data-name=configdetailswitch]").is(".open"),
                "sv_remark": $(this).find("input[name=sv_user_leveltype_id]").val() + ":" + $(this).find("span[name=sv_user_configdetail_name]").data("sv_user_configdetail_name") + "" + $(this).find("input[name=sv_detali_proportionalue]").val() + "" + $(this).find("span[name=sv_user_givingtype]").text() + "" + $(this).find("input[name=sv_detail_value]").val()
            };
            detaillist.push(detailinfo);
        });
        if (sv_user_givingtype == 0)
        {
            sv_user_givingtype = $("#is_deleteall").val();
        }
        if (sv_user_givingtype > 0) {
            //if (detaillist.length != 0) {
                $.ajax({
                    url: '/UserModuleConfig/SaveConfigdetailList?moduleCode=' + $("#sv_user_module_code").val() + "&is_deleteall=" + $("#is_deleteall").val(),
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(detaillist),
                    async: false,
                    success: function (data) {
                        if (data == 1) {
                            layer.msg("保存成功");
                            GetList();
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                        }
                        else {
                            layer.msg("保存失败");
                        }
                    }
                });
            //} else {
                //layer.msg("保存失败");
                //return false;
            //}
        } else {
            layer.msg("请您选择您要赠送的类型！");
            return false;
        }
    });
}
function clearNoNum(obj) {
   
    obj.value = parseFloat(obj.value || 0)
    obj.value=obj.value.replace(/[^\d]/g, '');
    obj.value=obj.value.replace(/[^\d]/g, '');

}
function validation(obj, type)
{
    var i = 0;
    var maxvalu = obj.value;
    if (type != 0) {
        $(".detali_proportionalue_" + type).each(function () {

            if ($(this).val() == obj.value) {
                i++
            };
            if (maxvalu < $(this).val()) {
                maxvalu = $(this).val();
            }
        });
    }
    if (i >= 2) {
        var strmag = $(obj).prev().text() == "充:" ? "充次:" : $(obj).prev().text();
        layer.msg("同等级，" + strmag + "范围不能出现一样的配置值,请重新输入");
        obj.value = parseFloat(parseFloat(maxvalu) + 1);
        return false;
    };
}