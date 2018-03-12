//系统配置专用
//USer即会员配置
var System = {
    User: function () {
        //MemberSharedOperate(-1, "", 0);
        //店铺信息
        $.getJSON("/AjaxUser/GetUserinfo/", function (data) {
            if (data) {
                loggin.chklogn(data);
                if (!data.isStore) {
                    $("#OperateMembersShare").show();
                } else {
                    $("#OperateMembersShare").hide();
                }
                var _strname = "";
                if (data.sv_branchrelation == 2) {
                    _strname = "crossShopEdit";
                } else if (data.sv_branchrelation == 3) {
                    _strname = "crossShopConsume";
                }
                MemberSharedOperate(data.sv_branchrelation, _strname, 1);
            }
        });
        //加载积分 
        var grade = '<div name="gradeGroupingBox"  class="GroupingBox" ><div class="monibod" id="jibie"><input type="hidden" name="groupId"><div class="mod"><span>当顾客积分在</span><input type="text" name="sv_ml_initpoint"  value="@sv_ml_initpoint" class="mintext" /><span>到</span> <input name="sv_ml_endpoint" value="@sv_ml_endpoint" type="text" class="mintext" /> <span>之间,</span> <span>可享受</span> <input type="text" name="sv_ml_commondiscount" value="@sv_ml_commondiscount" class="mintext" /> <span>折优惠，</span><span>会员等级</span><input type="text" name="sv_ml_name" value="@sv_ml_name" class="mintext form-control" /> <a href="javascript:void(0);" class="delelable" data-id="@id">删除</a></div></div><div class="monfot"><a href="javascript:void(0)" class="kkadd" id="jiebieadd" name ="addItem"><i class="icon-plus"></i></a><a href="javascript:void(0);" class="kkbtn" id="baochunjibie">保存</a><a href="javascript:void(0);" class="kkbtn" id="deleteGradeGrouping">删除该分组</a></div></div>';
        var jibie = '<div class="mod"><span>当顾客积分在</span><input type="text" name="sv_ml_initpoint"  value="@sv_ml_initpoint" class="mintext" /><span>到</span> <input name="sv_ml_endpoint" value="@sv_ml_endpoint" type="text" class="mintext" /> <span>之间,</span> <span>可享受</span> <input type="text" name="sv_ml_commondiscount" value="@sv_ml_commondiscount" class="mintext" /> <span>折优惠，</span><span>会员等级</span><input type="text" name="sv_ml_name" value="@sv_ml_name" class="mintext form-control" /> <a href="javascript:void(0);" class="delelable" data-id="@id">删除</a></div>';
        var fengzhu = '<a href="javascript:void(0)" class="klisos" data-id="@id" data-name="@dname"> <span>@name</span><i class="poriss  icon-edit faengzhuedit" ></i><em class="porvv icon-trash rovierw"  ></em></a>';
        var biaoqian = '<div class="bq_pssos bg-bule" style="background-color:@color;"> <img src="/images/tag-cover.png" class="tag-mask"><span class="tagInfo">@name</span><img src="/images/tag-delete.png" height="8" class="del-tags" data-id="@id"> </div>';
        $.getJSON("/system/GetUserPage", function (data) {
            if (data) {

                //设置积分
                $("#jifen_M").val(data.sv_uc_pointtocashset[0]);
                $("#jifen").val(data.sv_uc_pointtocashset[1]);

                //  alert(JSON.stringify(data));
                if (!data.GetUserLevel) {
                    data.GetUserLevel = data.getUserLevel;
                }


                if (!data.GetMembergroup) {
                    data.GetMembergroup = data.getMembergroup;
                }

                if (!data.GetSv_membertag) {
                    data.GetSv_membertag = data.getSv_membertag;
                }

                //级别处理
                var group = new Array();//记录已分好组的数据
                for (var i = 0; i < data.GetUserLevel.length; i++) {
                    var gradegroupingno = data.GetUserLevel[i].sv_ml_gradegroupingno;
                    var isAdd = false;
                    for (var k = 0; k < group.length; k++) {
                        var entitys = group[k];
                        if (gradegroupingno == entitys[0].sv_ml_gradegroupingno) {
                            isAdd = true;
                            entitys[entitys.length] = data.GetUserLevel[i];
                        }
                    }
                    if (isAdd == false) {
                        var groupitem = new Array();
                        groupitem[0] = data.GetUserLevel[i];
                        group[group.length] = groupitem;
                    }
                }

                var sequence = new Array();//记录顺序
                for (var i = 0; i < group.length; i++) {
                    var list = group[i];
                    sequence[i] = list[0].sv_ml_gradegroupingno
                }

                for (var i = 0; i < sequence.length; i++) {
                    for (var k = 0; k < sequence.length - i - 1; k++) {
                        if (sequence[k] > sequence[k + 1]) {
                            var temp = sequence[k + 1];
                            sequence[k + 1] = sequence[k];
                            sequence[k] = temp;
                        }
                    }
                }
                var saveAddCount = 0;//记录添加的行数
                for (var h = 0; h < sequence.length; h++) {
                    for (var i = 0; i < group.length; i++) {
                        var list = group[i];
                        if (sequence[h] != list[0].sv_ml_gradegroupingno) continue;
                        for (var j = 0; j < list.length; j++) {
                            if (h == 0) {
                                $("#jibie").append(jibie.replace("@sv_ml_initpoint", list[j].sv_ml_initpoint).replace("@sv_ml_endpoint", list[j].sv_ml_endpoint).replace("@sv_ml_commondiscount", list[j].sv_ml_commondiscount).replace("@sv_ml_name", list[j].sv_ml_name).replace("@id", list[j].memberlevel_id));
                                saveAddCount++;
                                if (j == 0) {
                                    $("#jibie").find("[name='groupId']").val(list[j].sv_ml_gradegroupingno);
                                }
                            }
                            else {
                                if (j == 0) {
                                    $("#GradeGrouping").append(grade.replace("@sv_ml_initpoint", list[j].sv_ml_initpoint).replace("@sv_ml_endpoint", list[j].sv_ml_endpoint).replace("@sv_ml_commondiscount", list[j].sv_ml_commondiscount).replace("@sv_ml_name", list[j].sv_ml_name).replace("@id", list[j].memberlevel_id));
                                    $(document).off("click", "[name='addItem']");
                                    $(document).on("click", "[name='addItem']", function () {

                                        if ($(this).parent().prev().find("div.mod").length < 20) {
                                            $(this).parent().prev().append(jibie.replace("@sv_ml_initpoint", 0).replace("@sv_ml_endpoint", 0).replace("@sv_ml_commondiscount", 0).replace("@sv_ml_name", "").replace("@id", 0));
                                            saveAddCount++;
                                        }
                                        else {
                                            layer.msg("会员等级最多支持20个");
                                            layer.close(index);
                                        }
                                    });

                                    $("#GradeGrouping").find("[name='gradeGroupingBox']:last").find("#jibie").find("[name='groupId']").val(list[j].sv_ml_gradegroupingno);
                                }
                                else {
                                    $("#GradeGrouping").find("[name='gradeGroupingBox']:last").find("#jibie").append(jibie.replace("@sv_ml_initpoint", list[j].sv_ml_initpoint).replace("@sv_ml_endpoint", list[j].sv_ml_endpoint).replace("@sv_ml_commondiscount", list[j].sv_ml_commondiscount).replace("@sv_ml_name", list[j].sv_ml_name).replace("@id", list[j].memberlevel_id));
                                    saveAddCount++;
                                }

                            }
                        }
                    }
                }
                if (saveAddCount == 0) {
                    if ($(this).parent().prev().find("div.mod") != null) {
                        if ($(this).parent().prev().find("div.mod").length < 20) {
                            $(this).parent().prev().append(jibie.replace("@sv_ml_initpoint", 0).replace("@sv_ml_endpoint", 0).replace("@sv_ml_commondiscount", 0).replace("@sv_ml_name", "").replace("@id", 0));
                        }
                        else {
                            layer.msg("会员等级最多支持20个");
                            layer.close(index);
                        }
                    }
                }

                //保存会员级别和折扣设置
                $(document).off("click", "#baochunjibie");
                $(document).on("click", "#baochunjibie", function () {
                    var soso = $(this).parent();
                    var infos = soso.parent().find("div.mod");

                    var bols = true;
                    var jiebiedata = "[";
                    var j = 0;
                    var oldmin;
                    var oldmax;
                    var groupId = 0;
                    if (infos.length > 0) {
                        groupId = $(infos[0]).prev("[name='groupId']").val();
                    }
                    for (var k = 0; k < infos.length; k++) {
                        var thisDiscount = parseFloat($(infos[k]).find("input[name='sv_ml_commondiscount']").val());
                        if (thisDiscount < 0 || thisDiscount > 10) {
                            $(infos[k]).find("input[name='sv_ml_commondiscount']").focus();
                            layer.msg("会员折扣只能输入0--10");
                            bols = false;
                            return;
                        }
                        if (parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0) >= parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0)) {
                            $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                            layer.msg("左边的积分不能大于或等于右边的积分");
                            bols = false;
                            return;
                        }
                        if (k > 0) {
                            //和前一配置对比，检查是否存在重合
                            var max = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                            var min = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);
                            if ((min >= oldmin && min <= oldmax) || (max >= oldmin && max <= oldmax)) {
                                layer.msg("注意:该级积分被包含于其他会员等级");
                                if ((min >= oldmin && min <= oldmax)) {
                                    $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                                } else {
                                    $(infos[k]).find("input[name='sv_ml_endpoint']").focus();
                                }
                                bols = false;
                                return;
                            }
                        }
                        oldmax = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                        oldmin = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);

                        if ($(infos[k]).find("input[name='sv_ml_name']").val() == "") {
                            layer.msg("请输入级别名字");
                            $(infos[k]).find("input[name='sv_ml_name']").focus();
                            bols = false;
                            return;
                        }
                        jiebiedata += '{"sv_ml_gradegroupingno":' + groupId + ',"sv_ml_initpoint":' + $(infos[k]).find("input[name='sv_ml_initpoint']").val() + ',"sv_ml_endpoint":' + $(infos[k]).find("input[name='sv_ml_endpoint']").val() + ',"sv_ml_name":"' + $(infos[k]).find("input[name='sv_ml_name']").val() + '","memberlevel_id":' + $(infos[k]).find(".delelable").data("id") + ',"sv_ml_commondiscount":' + $(infos[k]).find("input[name='sv_ml_commondiscount']").val() + '}';
                        j++;
                        if (k < infos.length - 1)
                        {
                            jiebiedata += ",";
                        }
                    }
                    jiebiedata += "]";
                    if (bols) {
                        if (j <= 20) {
                            $.ajax({
                                url: "/System/Update_Live",
                                data: jiebiedata,
                                type: "POST",
                                contentType: "application/json",
                                success: function (result) {
                                    if (result == true) {
                                        layer.msg("修改成功~");
                                    }
                                    else if (result == -2) {
                                        layer.msg("你没有该操作权限！");
                                        layer.close(index);
                                    } else if (result == -1) {
                                        layer.msg("会员等级最多支持20个,请重新操作");
                                        layer.close(index);
                                    }
                                    else {
                                        layer.msg("添加员会失败，请刷新重试");
                                        layer.close(index);
                                    }
                                }
                            });
                        } else {
                            layer.msg("会员等级最多支持20个,请重新操作");
                            layer.close(index);
                        }
                    }
                });
                //删除等级分组事件绑定
                $(document).off("click", "#deleteGradeGrouping");
                $(document).on("click", "#deleteGradeGrouping", function () {
                    var grous = $("#GradeGrouping").find("[name='gradeGroupingBox']");
                    if (grous.length <= 1) {
                        layer.msg("必须保留一个分组");
                        return;
                    }
                    var soso = $(this).parent();
                    var infos = soso.parent().find("div.mod");
                    var bols = true;
                    var jiebiedata = "[";
                    var j = 0;
                    var oldmin;
                    var oldmax;
                    var groupId = 0;
                    if (infos.length > 0) {
                        groupId = $(infos[0]).prev("[name='groupId']").val();
                    }
                    for (var k = 0; k < infos.length; k++) {
                        var thisDiscount = parseFloat($(infos[k]).find("input[name='sv_ml_commondiscount']").val() || -1);
                        if (thisDiscount < 0 || thisDiscount > 10) {
                            $(infos[k]).find("input[name='sv_ml_commondiscount']").focus();
                            layer.msg("会员折扣只能输入0--10");
                            bols = false;
                            return;
                        }
                        if (parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0) >= parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0)) {
                            $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                            layer.msg("左边的积分不能大于或等于右边的积分");
                            bols = false;
                            return;
                        }
                        if (k > 0) {
                            //和前一配置对比，检查是否存在重合
                            var max = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                            var min = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);
                            if ((min >= oldmin && min <= oldmax) || (max >= oldmin && max <= oldmax)) {
                                layer.msg("注意:该级积分被包含于其他会员等级");
                                if ((min >= oldmin && min <= oldmax)) {
                                    $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                                } else {
                                    $(infos[k]).find("input[name='sv_ml_endpoint']").focus();
                                }
                                bols = false;
                                return;
                            }
                        }
                        oldmax = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                        oldmin = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);

                        if ($(infos[k]).find("input[name='sv_ml_name']").val() == "") {
                            layer.msg("请输入级别名字");
                            $(infos[k]).find("input[name='sv_ml_name']").focus();
                            bols = false;
                            return;
                        }

                        jiebiedata += '{"sv_is_active":true,"sv_ml_gradegroupingno":' + groupId + ',"sv_ml_initpoint":' + $(infos[k]).find("input[name='sv_ml_initpoint']").val() + ',"sv_ml_endpoint":' + $(infos[k]).find("input[name='sv_ml_endpoint']").val() + ',"sv_ml_name":"' + $(infos[k]).find("input[name='sv_ml_name']").val() + '","memberlevel_id":' + $(infos[k]).find(".delelable").data("id") + ',"sv_ml_commondiscount":' + $(infos[k]).find("input[name='sv_ml_commondiscount']").val() + '}';
                        j++;
                        if (k < infos.length - 1) {
                            jiebiedata += ",";
                        }
                    }
                    jiebiedata += "]";
                    if (bols) {
                        if (j <= 20) {
                            $.ajax({
                                url: "/System/Update_Live",
                                data: jiebiedata,
                                type: "POST",
                                contentType: "application/json",
                                success: function (result) {
                                    if (result == true) {
                                        layer.msg("修改成功~");
                                    }
                                    else if (result == -2) {
                                        layer.msg("你没有该操作权限！");
                                        layer.close(index);
                                    } else if (result == -1) {
                                        layer.msg("会员等级最多支持20个,请重新操作");
                                        layer.close(index);
                                    }
                                    else {
                                        layer.msg("添加员会失败，请刷新重试");
                                        layer.close(index);
                                    }
                                }
                            });
                        } else {
                            layer.msg("会员等级最多支持20个,请重新操作");
                            layer.close(index);
                        }
                    }
                    var soso = $(this).parent();
                    soso.parent().remove();
                });
                checkGradeGroupingShow();//显示会员等级分组开关

                for (var i = 0; i < data.GetMembergroup.length; i++) {
                    $("#fengzhu").append(fengzhu.replace("@name", data.GetMembergroup[i].sv_mg_name).replace("@id", data.GetMembergroup[i].membergroup_id));
                }

                for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
                    $("#chengwei").append(fengzhu.replace("@name", data.sv_uc_callnameList[i]).replace("@id", 0).replace("@dname", "chengwei"));
                }

                for (var i = 0; i < data.GetSv_membertag.length; i++) {
                    $("#tag").append(biaoqian.replace("@color", data.GetSv_membertag[i].sv_mt_color).replace("@name", data.GetSv_membertag[i].sv_mt_name).replace("@id", data.GetSv_membertag[i].membertag_id));
                    //sv_mr_name
                }
                $("#fengzhucount").text(data.GetMembergroup.length);
                $("#chengweicount").text(data.sv_uc_callnameList.length);
                $("#tagcount").text(data.GetSv_membertag.length);
                //放在里面执行
                $("#jiebieadd").click(function () {
                    if ($(this).parent().prev().find("div.mod") != null) {
                        if ($(this).parent().prev().find("div.mod").length < 20) {
                            $(this).parent().prev().append(jibie.replace("@sv_ml_initpoint", 0).replace("@sv_ml_endpoint", 0).replace("@sv_ml_commondiscount", 0).replace("@sv_ml_name", "").replace("@id", 0));
                        }
                        else {
                            layer.msg("会员等级最多支持20个");
                            layer.close(index);
                        }
                    }
                });
                //可用积分晋升
                $("#availableIntegral").click(function () {
                    //将availableIntegralSwitch开关设置为true
                    if (MembershipGradeGroupingIsON && rankPromotionIsON) {
                        setAvailableIntegralSwitch(true);
                    }
                });
                //累计积分晋升
                $("#accumulativeIntegral").click(function () {
                    //将availableIntegralSwitch开关设置为false
                    if (MembershipGradeGroupingIsON && rankPromotionIsON) {
                        setAvailableIntegralSwitch(false);
                    }
                });



                checkAvailableIntegralSwitchShow();
                function checkAvailableIntegralSwitchShow() {
                    if (availableIntegralSwitch) {
                        $("#availableIntegral").attr("checked", 'checked');
                    } else {
                        $("#accumulativeIntegral").attr("checked", 'checked');
                    }
                }

                //添加等级分组
                $("#addGradeGrouping").click(function () {
                    var box = $("#GradeGrouping").find("div[name='gradeGroupingBox']");
                    if (box != null) {
                        if (box.length >= 3) {
                            layer.msg("最多添加3组");
                            return;
                        }

                        var hidens = $("#GradeGrouping").find("[name='groupId']");
                        var maxId = -1;
                        if (hidens != null && hidens.length > 0) {
                            maxId = $(hidens[0]).val();
                        }
                        else {
                            maxId = -1;
                        }
                        if (hidens != null) {
                            for (var g = 1; g < hidens.length; g++) {
                                var values = $(hidens[g]).val();
                                if (values > maxId) {
                                    maxId = values;
                                }
                            }
                        }


                        $("#GradeGrouping").append(grade.replace("@sv_ml_initpoint", 0).replace("@sv_ml_endpoint", 0).replace("@sv_ml_commondiscount", 0).replace("@sv_ml_name", "").replace("@id", 0));
                        $(document).off("click", "[name='addItem']");
                        $(document).on("click", "[name='addItem']", function () {
                            if ($(this).parent().prev().length < 20) {
                                $(this).parent().prev().append(jibie.replace("@sv_ml_initpoint", 0).replace("@sv_ml_endpoint", 0).replace("@sv_ml_commondiscount", 0).replace("@sv_ml_name", "").replace("@id", 0));
                            }
                            else {
                                layer.msg("会员等级最多支持20个");
                                layer.close(index);
                            }
                        });
                        //保存会员级别和折扣设置
                        $(document).off("click", "#baochunjibie");
                        $(document).on("click", "#baochunjibie", function () {
                            var soso = $(this).parent();
                            var infos = soso.parent().find("div.mod");

                            var bols = true;
                            var jiebiedata = "[";
                            var j = 0;
                            var oldmin;
                            var oldmax;
                            var groupId = 0;
                            if (infos.length > 0) {
                                groupId = $(infos[0]).prev("[name='groupId']").val();
                            }
                            for (var k = 0; k < infos.length; k++) {
                                var thisDiscount = parseFloat($(infos[k]).find("input[name='sv_ml_commondiscount']").val() || -1);
                                if (thisDiscount < 0 || thisDiscount > 10) {
                                    $(infos[k]).find("input[name='sv_ml_commondiscount']").focus();
                                    layer.msg("会员折扣只能输入0--10");
                                    bols = false;
                                    return;
                                }
                                if (parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0) >= parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0)) {
                                    $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                                    layer.msg("左边的积分不能大于或等于右边的积分");
                                    bols = false;
                                    return;
                                }
                                if (k > 0) {
                                    //和前一配置对比，检查是否存在重合
                                    var max = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                                    var min = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);
                                    if ((min >= oldmin && min <= oldmax) || (max >= oldmin && max <= oldmax)) {
                                        layer.msg("注意:该级积分被包含于其他会员等级");
                                        if ((min >= oldmin && min <= oldmax)) {
                                            $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                                        } else {
                                            $(infos[k]).find("input[name='sv_ml_endpoint']").focus();
                                        }
                                        bols = false;
                                        return;
                                    }
                                }
                                oldmax = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                                oldmin = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);

                                if ($(infos[k]).find("input[name='sv_ml_name']") == null || $(infos[k]).find("input[name='sv_ml_name']").val() == "") {
                                    layer.msg("请输入级别名字");
                                    $(infos[k]).find("input[name='sv_ml_name']").focus();
                                    bols = false;
                                    return;
                                }
                                jiebiedata += '{"sv_ml_gradegroupingno":' + groupId + ',"sv_ml_initpoint":' + $(infos[k]).find("input[name='sv_ml_initpoint']").val() + ',"sv_ml_endpoint":' + $(infos[k]).find("input[name='sv_ml_endpoint']").val() + ',"sv_ml_name":"' + $(infos[k]).find("input[name='sv_ml_name']").val() + '","memberlevel_id":' + $(infos[k]).find(".delelable").data("id") + ',"sv_ml_commondiscount":' + $(infos[k]).find("input[name='sv_ml_commondiscount']").val() + '}';
                                j++;
                                if (k < infos.length - 1) {
                                    jiebiedata += ",";
                                }
                            }
                            jiebiedata += "]";
                            if (bols) {
                                if (j <= 20) {
                                    $.ajax({
                                        url: "/System/Update_Live",
                                        data: jiebiedata,
                                        type: "POST",
                                        contentType: "application/json",
                                        success: function (result) {
                                            if (result == true) {
                                                layer.msg("修改成功~");
                                            }
                                            else if (result == -2) {
                                                layer.msg("你没有该操作权限！");
                                                layer.close(index);
                                            } else if (result == -1) {
                                                layer.msg("会员等级最多支持20个,请重新操作");
                                                layer.close(index);
                                            }
                                            else {
                                                layer.msg("添加员会失败，请刷新重试");
                                                layer.close(index);
                                            }
                                        }
                                    });
                                } else {
                                    layer.msg("会员等级最多支持20个,请重新操作");
                                    layer.close(index);
                                }
                            }
                        });
                        //删除等级分组事件绑定
                        $(document).off("click", "#deleteGradeGrouping");
                        $(document).on("click", "#deleteGradeGrouping", function () {
                            var soso = $(this).parent();
                            var infos = soso.parent().find("div.mod");

                            var bols = true;
                            var jiebiedata = "[";
                            var j = 0;
                            var oldmin;
                            var oldmax;
                            var groupId = 0;
                            if (infos.length > 0) {
                                groupId = $(infos[0]).prev("[name='groupId']").val();
                            }
                            for (var k = 0; k < infos.length; k++) {
                                var thisDiscount = parseFloat($(infos[k]).find("input[name='sv_ml_commondiscount']").val() || -1);
                                if (thisDiscount < 0 || thisDiscount > 10) {
                                    $(infos[k]).find("input[name='sv_ml_commondiscount']").focus();
                                    layer.msg("会员折扣只能输入0--10");
                                    bols = false;
                                    return;
                                }
                                if (parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0) >= parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0)) {
                                    $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                                    layer.msg("左边的积分不能大于或等于右边的积分");
                                    bols = false;
                                    return;
                                }
                                if (k > 0) {
                                    //和前一配置对比，检查是否存在重合
                                    var max = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                                    var min = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);
                                    if ((min >= oldmin && min <= oldmax) || (max >= oldmin && max <= oldmax)) {
                                        layer.msg("注意:该级积分被包含于其他会员等级");
                                        if ((min >= oldmin && min <= oldmax)) {
                                            $(infos[k]).find("input[name='sv_ml_initpoint']").focus();
                                        } else {
                                            $(infos[k]).find("input[name='sv_ml_endpoint']").focus();
                                        }
                                        bols = false;
                                        return;
                                    }
                                }
                                oldmax = parseInt($(infos[k]).find("input[name='sv_ml_endpoint']").val() || 0);
                                oldmin = parseInt($(infos[k]).find("input[name='sv_ml_initpoint']").val() || 0);

                                if ($(infos[k]).find("input[name='sv_ml_name']").val() == "") {
                                    layer.msg("请输入级别名字");
                                    $(infos[k]).find("input[name='sv_ml_name']").focus();
                                    bols = false;
                                    return;
                                }

                                jiebiedata += '{"sv_is_active":true,"sv_ml_gradegroupingno":' + groupId + ',"sv_ml_initpoint":' + $(infos[k]).find("input[name='sv_ml_initpoint']").val() + ',"sv_ml_endpoint":' + $(infos[k]).find("input[name='sv_ml_endpoint']").val() + ',"sv_ml_name":"' + $(infos[k]).find("input[name='sv_ml_name']").val() + '","memberlevel_id":' + $(infos[k]).find(".delelable").data("id") + ',"sv_ml_commondiscount":' + $(infos[k]).find("input[name='sv_ml_commondiscount']").val() + '}';
                                j++;
                                if (k < infos.length - 1) {
                                    jiebiedata += ",";
                                }
                            }
                            jiebiedata += "]";
                            if (bols) {
                                if (j <= 20) {
                                    $.ajax({
                                        url: "/System/Update_Live",
                                        data: jiebiedata,
                                        type: "POST",
                                        contentType: "application/json",
                                        success: function (result) {
                                            if (result == true) {
                                                layer.msg("修改成功~");
                                            }
                                            else if (result == -2) {
                                                layer.msg("你没有该操作权限！");
                                                layer.close(index);
                                            } else if (result == -1) {
                                                layer.msg("会员等级最多支持20个,请重新操作");
                                                layer.close(index);
                                            }
                                            else {
                                                layer.msg("添加员会失败，请刷新重试");
                                                layer.close(index);
                                            }
                                        }
                                    });
                                } else {
                                    layer.msg("会员等级最多支持20个,请重新操作");
                                    layer.close(index);
                                }
                            }
                            var soso = $(this).parent();
                            soso.parent().remove();
                        });
                        $("#GradeGrouping").find("[name='gradeGroupingBox']:last").find("#jibie").find("[name='groupId']").val(parseInt(maxId) + 1);
                    }
                });
                //删除级别

            }
        });

        $(document).on("click", ".delelable", function () {
            var delelablename = $(this);
            var levelNumber;
            if ($(delelablename).parent().siblings() != null) {
                levelNumber = $(delelablename).parent().siblings().length;
            }
            if (levelNumber != null && levelNumber > 1) {
                layer.confirm("确认要删除选中的级别吗，该级别的会员都会转移到默认第一个级别！", function () {

                    if (delelablename.data("id") == 0) {
                        layer.closeAll();
                        delelablename.parent().remove();
                    } else {
                        layer.load();
                        $.post("/System/Update_dalete", { id: delelablename.data("id") }, function (data) {
                            if (data == true) {
                                layer.closeAll();
                                delelablename.parent().remove();
                            }
                            else if (data == -2) {
                                layer.closeAll();
                                layer.msg("你没有该操作权限！");
                            }
                            else {

                                layer.closeAll();
                                layer.msg("删除级别失败,最后一个等级不能删除,请修改！");
                            }
                        });
                    }
                });
            } else {
                layer.msg("最后一个等级不能删除,请修改！");
            }
        });

        //称谓，分级的删除

        $(document).on("click", ".rovierw", function () {

            var thisname = $(this);

            layer.confirm("确认要删除吗？", function () {

                if (thisname.parent().data("id") == 0) {


                    layer.load();
                    $.post("/System/Update_chengwei", { id: 2, name: thisname.prev().prev().text(), name2: "" }, function (data) {
                        if (data.r == true) {
                            $("#chengwei").html("");
                            //  alert(JSON.stringify(data.sv_uc_callnameList));
                            for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
                                $("#chengwei").append(fengzhu.replace("@name", data.sv_uc_callnameList[i]).replace("@id", 0).replace("@dname", "chengwei"));
                            }
                            $("#chengweicount").text(data.sv_uc_callnameList.length);
                            layer.closeAll();
                            layer.msg("称谓删除成功");

                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                            layer.closeAll();
                        }
                        else {
                            layer.msg("添加称谓失败");

                        }

                    });

                } else {

                    layer.load();
                    $.post("/System/Membergroup_dalete", { id: thisname.parent().data("id") }, function (data) {
                        layer.closeAll();
                        if (data == true) {

                            layer.msg("删除分组成功");
                            thisname.parent().remove();
                            $("#fengzhucount").text((parseInt($("#fengzhucount").text()) - 1));
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                            layer.close();
                        }
                        else {
                            layer.msg("删除分组成功");

                        }
                    });
                }

            });
        });


        ///////////////////////////////标签模块//////////////////////////////////////////////
        $(document).on("click", "#addtag", function () {

            layer.prompt({
                title: '添加会员标签',
                formType: 3 //prompt风格，支持0-2
                , value2: '#db913d'
            }, function (pass, b, d, e) {

                // alert(e)
                layer.load();
                $.post("/System/Update_Tag", { id: 0, name: pass, color: e }, function (data) {
                    if (data.r == true) {
                        $("#tag").html("");
                        if (!data.GetSv_membertag) {
                            data.GetSv_membertag = data.getSv_membertag;
                        }
                        for (var i = 0; i < data.GetSv_membertag.length; i++) {
                            $("#tag").append(biaoqian.replace("@color", data.GetSv_membertag[i].sv_mt_color).replace("@name", data.GetSv_membertag[i].sv_mt_name).replace("@id", data.GetSv_membertag[i].membertag_id));
                            //sv_mr_name
                        }
                        $("#tagcount").text(data.GetSv_membertag.length);
                        layer.closeAll();
                        layer.msg("添加标签成功");

                    }
                    else if (data == -2) {
                        layer.closeAll();
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        layer.closeAll();
                        layer.msg("添加标签失败");

                    }
                });
            });
        });
        //删除标签
        $(document).on("click", ".del-tags", function () {
            var delelablename = $(this);
            layer.confirm("确认要删除选中的标签吗？", function () {

                layer.load();
                $.post("/System/Update_Tag", { id: -1, name: delelablename.data("id") }, function (data) {
                    if (data.r == true) {
                        layer.closeAll();
                        delelablename.parent().remove();
                    } else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        layer.msg("删除标签失败");

                    }
                });
            });

        });
        //////////////////////////////////////////////////////////////////////////////////////////////////
        //

        /*
        //添加会员分组
        //
        */
        $(document).on("click", "#fanzhuadd", function () {

            layer.prompt({
                title: '添加会员分组',
                formType: 0 //prompt风格，支持0-2
            }, function (pass) {
                layer.load();
                $.post("/System/Update_Membergroup", { id: 0, name: pass }, function (data) {
                    if (data.r == true) {
                        $("#fengzhu").html("");
                        if (!data.GetMembergroup) {
                            data.GetMembergroup = data.getMembergroup;
                        }
                        for (var i = 0; i < data.GetMembergroup.length; i++) {
                            $("#fengzhu").append(fengzhu.replace("@name", data.GetMembergroup[i].sv_mg_name).replace("@id", data.GetMembergroup[i].membergroup_id));
                        }
                        $("#fengzhucount").text(data.GetMembergroup.length);

                        layer.closeAll();
                        layer.msg("添加分组成功");

                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                        layer.closeAll();
                    }
                    else {
                        layer.msg("添加分组失败"); chengweiadd

                    }
                });
            });
        });

        /*
      //称谓添加
      //
      */
        //称谓添加
        $(document).on("click", "#chengweiadd", function () {

            layer.prompt({
                title: '添加会员称谓',
                formType: 0 //prompt风格，支持0-2
            }, function (pass) {
                layer.load();
                $.post("/System/Update_chengwei", { id: 0, name: pass, name2: "" }, function (data) {
                    if (data.r == true) {
                        $("#chengwei").html("");
                        //  alert(JSON.stringify(data.sv_uc_callnameList));
                        for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
                            $("#chengwei").append(fengzhu.replace("@name", data.sv_uc_callnameList[i]).replace("@id", 0).replace("@dname", "chengwei"));
                        }
                        $("#chengweicount").text(data.sv_uc_callnameList.length);
                        layer.closeAll();
                        layer.msg("称谓添加改成功");

                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                        layer.closeAll();
                    }
                    else {
                        layer.msg("添加称谓失败");
                        layer.closeAll();
                    }
                });
            });
        });

        //
        //修改选中的分组
        $(document).on("click", ".faengzhuedit", function () {
            var ss = $(this).parent();
            var val = $(this).prev().text();
            layer.prompt({
                title: '修改选中的分组',
                value: val,
                formType: 0 //prompt风格，支持0-2
            }, function (pass) {

                if (ss.data("name") == "chengwei") {
                    $.post("/System/Update_chengwei", { id: 1, name: pass, name2: val }, function (data) {
                        if (data.r == true) {
                            $("#chengwei").html("");
                            //  alert(JSON.stringify(data.sv_uc_callnameList));
                            for (var i = 0; i < data.sv_uc_callnameList.length; i++) {
                                $("#chengwei").append(fengzhu.replace("@name", data.sv_uc_callnameList[i]).replace("@id", 0).replace("@dname", "chengwei"));
                            }

                            $("#chengweicount").text(data.sv_uc_callnameList.length);

                            layer.closeAll();
                            layer.msg("称谓修改成功");

                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                            layer.close(index);
                        }
                        else {
                            layer.msg("添加分组失败");

                        }


                    });
                } else {

                    $.post("/System/Update_Membergroup", { id: ss.data("id"), name: pass }, function (data) {
                        if (data.r) {
                            $("#fengzhu").html("");

                            for (var i = 0; i < data.getMembergroup.length; i++) {
                                $("#fengzhu").append(fengzhu.replace("@name", data.getMembergroup[i].sv_mg_name).replace("@id", data.getMembergroup[i].membergroup_id));
                            }
                            $("#fengzhucount").text(data.getMembergroup.length);

                            layer.closeAll();
                            layer.msg("分组修改成功");

                        } else {
                            layer.msg("添加分组失败");

                        }


                    });

                }
            });
        });
        //消费积分规则
        $(document).on("click", "#serv_pointtocashset", function () {
            layer.confirm("确认要修改消费积分规则吗？", { btn: ["是的朕想好了", "没想好，不改了"], icon: 3 }, function () {
                var money = $("#jifen_M").val();
                var integralNum = $("#jifen").val();
                if (isNullOrWhiteSpace(money) && isNullOrWhiteSpace(integralNum)) {
                    if (parseInt(money) <= 0) {
                        $("#jifen_M").focus();
                        layer.msg("请输入正确的金额并且大于0！");
                        return;
                    }
                    if (parseInt(integralNum) <= 0) {
                        $("#jifen").focus();
                        layer.msg("请输入正确的积分并且大于0！");
                        return;
                    }
                    $.post("/System/Update_Pointto", { jifen_M: money, jifen: integralNum }, function (data) {
                        if (data == true) {
                            layer.msg("保存成功，请继续操作！");
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                        }
                        else {
                            layer.msg("保存失败！");
                        }
                    });
                }
                else {
                    layer.msg("请填写金额与兑换积分数量！");
                }
            });

        });
        //等级晋升规则开关显示
        checkrankPromotionShow();
        function checkrankPromotionShow() {
            checkrankDemotionShow();
            if (rankPromotionIsON && MembershipGradeGroupingIsON) {
                if (!$(".swtith[data-name='rankPromotion']").is(".open"))
                    $(".swtith[data-name='rankPromotion']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='rankPromotion']").is(".open"))
                    $(".swtith[data-name='rankPromotion']").toggleClass('open');
            }
        }

        checkrankDemotionShow();//等级降级开关显示
        function checkrankDemotionShow() {
            if (rankDemotion && MembershipGradeGroupingIsON && rankPromotionIsON) {
                if (!$(".swtith[data-name='rankDemotion']").is(".open"))
                    $(".swtith[data-name='rankDemotion']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='rankDemotion']").is(".open"))
                    $(".swtith[data-name='rankDemotion']").toggleClass('open');
            }
        }

        //积分规则开关显示
        function checkGradeGroupingShow() {
            checkrankPromotionShow();
            checkrankDemotionShow();
            if (MembershipGradeGroupingIsON) {
                if (!$(".swtith[data-name='MembershipGradeGrouping']").is(".open"))
                    $(".swtith[data-name='MembershipGradeGrouping']").toggleClass('open');
                $("#addGradeGrouping").show();
            }
            else {
                if ($(".swtith[data-name='MembershipGradeGrouping']").is(".open"))
                    $(".swtith[data-name='MembershipGradeGrouping']").toggleClass('open');
                $("#addGradeGrouping").hide();
            }

        }
        DisableManualInputShow();
        function DisableManualInputShow() {
            if (g_DisableManualInput) {
                if (!$(".swtith[data-name='DisableManualInput']").is(".open"))
                    $(".swtith[data-name='DisableManualInput']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='DisableManualInput']").is(".open"))
                    $(".swtith[data-name='DisableManualInput']").toggleClass('open');
            }
        }

        ShareTheResultsShow();
        function ShareTheResultsShow() {
            if (g_ShareTheResults) {
                if (!$(".swtith[data-name='ShareTheResults']").is(".open"))
                    $(".swtith[data-name='ShareTheResults']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='ShareTheResults']").is(".open"))
                    $(".swtith[data-name='ShareTheResults']").toggleClass('open');
            }
        }

        AutomaticallyGenerateProductBarcodeShow();
        function AutomaticallyGenerateProductBarcodeShow() {
            if (g_AutomaticallyGenerateProductBarcode) {
                if (!$(".swtith[data-name='AutomaticallyGenerateProductBarcode']").is(".open"))
                    $(".swtith[data-name='AutomaticallyGenerateProductBarcode']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='AutomaticallyGenerateProductBarcode']").is(".open"))
                    $(".swtith[data-name='AutomaticallyGenerateProductBarcode']").toggleClass('open');
            }
        }
        AutomaticallyGenerateMemberIdShow();
        function AutomaticallyGenerateMemberIdShow() {
            if (g_AutomaticallyGenerateMemberId) {
                if (!$(".swtith[data-name='AutomaticallyGenerateMemberId']").is(".open"))
                    $(".swtith[data-name='AutomaticallyGenerateMemberId']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='AutomaticallyGenerateMemberId']").is(".open"))
                    $(".swtith[data-name='AutomaticallyGenerateMemberId']").toggleClass('open');
            }
        }
        WhetherSendtextMessageRemindMemberShow();
        function WhetherSendtextMessageRemindMemberShow() {
            if (g_WhetherSendtextMessageRemindMember) {
                if (!$(".swtith[data-name='WhetherSendtextMessageRemindMember']").is(".open"))
                    $(".swtith[data-name='WhetherSendtextMessageRemindMember']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='WhetherSendtextMessageRemindMember']").is(".open"))
                    $(".swtith[data-name='WhetherSendtextMessageRemindMember']").toggleClass('open');
            }
        }
        //开关按钮事件
        $(document).off("click", ".swtith.userswtith i");
        $(document).on("click", ".swtith.userswtith i", function () {
            var pre = $(this).prev();
            var butname = $(pre).val();
            if ("MembershipGradeGrouping" == butname)//此处会员等级分组
            {
                MembershipGradeGroupingIsON = !MembershipGradeGroupingIsON;
                var svUserConfigdetailId;
                var svDetailValue;
                var svUserConfigId;
                var svUserModuleId;
                PreferentialTopUpGivingConfigList("MembershipGradeGrouping", "MembershipGradeGrouping");
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
                    "sv_detail_is_enable": MembershipGradeGroupingIsON,
                    "sv_user_configdetail_name": "等级分组开关",
                    "sv_remark": "等级分组开关"
                };
                detaillist.push(data);

                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=MembershipGradeGrouping',
                        detaillist, function (result) {
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
                checkGradeGroupingShow();

                return;
            }
            if ("rankPromotion" == butname)//此处会员等级晋升
            {
                var svUserConfigdetailId;
                var svDetailValue;
                var svUserConfigId;
                var svUserModuleId;
                PreferentialTopUpGivingConfigList("rankPromotion", "rankPromotion");
                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                    svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
                    svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
                    svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
                }
                rankPromotionIsON = !rankPromotionIsON;
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
                    "sv_detail_is_enable": rankPromotionIsON,
                    "sv_user_configdetail_name": "等级晋升",
                    "sv_remark": "等级晋升"
                };
                detaillist.push(data);

                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=rankPromotion',
                       detaillist, function (result) {
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
                checkGradeGroupingShow();

                return;
            }
            if ("DisableManualInput" == butname)//是否禁用手动输入会员卡卡号
            {
                var svUserConfigdetailId;
                var svDetailValue;
                var svUserConfigId;
                var svUserModuleId;
                PreferentialTopUpGivingConfigList("DisableManualInput", "DisableManualInput");
                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                    svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
                    svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
                    svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
                }
                g_DisableManualInput = !g_DisableManualInput;
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
                    "sv_detail_is_enable": g_DisableManualInput,
                    "sv_user_configdetail_name": "是否禁用手动输入会员卡卡号",
                    "sv_remark": "是否禁用手动输入会员卡卡号"
                };
                detaillist.push(data);

                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=DisableManualInput',
                       detaillist, function (result) {
                           if (result) {
                               if (result == 1) {
                                   layer.msg("保存成功");
                               }
                               else if (result == -2) {
                                   layer.msg("你没有该操作权限！");
                               }
                               else {
                                   layer.msg("保存失败");
                               }
                           }
                       });
                DisableManualInputShow();

                return;
            }
            if ("ShareTheResults" == butname)//是否平分业绩
            {
                var svUserConfigdetailId;
                var svDetailValue;
                var svUserConfigId;
                var svUserModuleId;
                PreferentialTopUpGivingConfigList("ShareTheResults", "ShareTheResults");
                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                    svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
                    svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
                    svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
                }
                g_ShareTheResults = !g_ShareTheResults;
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
                    "sv_detail_is_enable": g_ShareTheResults,
                    "sv_user_configdetail_name": "是否平分业绩",
                    "sv_remark": "是否平分业绩"
                };
                detaillist.push(data);

                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=ShareTheResults',
                       detaillist, function (result) {
                           if (result) {
                               if (result == 1) {
                                   layer.msg("保存成功");
                               }
                               else if (result == -2) {
                                   layer.msg("你没有该操作权限！");
                               }
                               else {
                                   layer.msg("保存失败");
                               }
                           }
                       });
                ShareTheResultsShow();
                return;
            }
            if ("AutomaticallyGenerateProductBarcode" == butname)//是否自动生成商品编码
            {
                var svUserConfigdetailId;
                var svDetailValue;
                var svUserConfigId;
                var svUserModuleId;
                PreferentialTopUpGivingConfigList("AutomaticallyGenerateProductBarcode", "AutomaticallyGenerateProductBarcode");
                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                    svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
                    svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
                    svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
                }
                g_AutomaticallyGenerateProductBarcode = !g_AutomaticallyGenerateProductBarcode;
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
                    "sv_detail_is_enable": g_AutomaticallyGenerateProductBarcode,
                    "sv_user_configdetail_name": "是否自动生成商品编码",
                    "sv_remark": "是否自动生成商品编码"
                };
                detaillist.push(data);

                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=AutomaticallyGenerateProductBarcode',
                       detaillist, function (result) {
                           if (result) {
                               if (result == 1) {
                                   layer.msg("保存成功");
                               }
                               else if (result == -2) {
                                   layer.msg("你没有该操作权限！");
                               }
                               else {
                                   layer.msg("保存失败");
                               }
                           }
                       });
                AutomaticallyGenerateProductBarcodeShow();
                return;
            }
            if ("AutomaticallyGenerateMemberId" == butname)//日期提醒
            {
                var svUserConfigdetailId;
                var svDetailValue;
                var svUserConfigId;
                var svUserModuleId;
                PreferentialTopUpGivingConfigList("AutomaticallyGenerateMemberId", "AutomaticallyGenerateMemberId");
                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                    svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
                    svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
                    svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
                }
                g_AutomaticallyGenerateMemberId = !g_AutomaticallyGenerateMemberId;
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
                    "sv_detail_is_enable": g_AutomaticallyGenerateMemberId,
                    "sv_user_configdetail_name": "是否自动生成会员id",
                    "sv_remark": "是否自动生成会员id"
                };
                detaillist.push(data);

                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=AutomaticallyGenerateMemberId',
                       detaillist, function (result) {
                           if (result) {
                               if (result == 1) {
                                   layer.msg("保存成功");
                               }
                               else if (result == -2) {
                                   layer.msg("你没有该操作权限！");
                               }
                               else {
                                   layer.msg("保存失败");
                               }
                           }
                       });
                AutomaticallyGenerateMemberIdShow();
                return;
            }
            if ("WhetherSendtextMessageRemindMember" == butname)//是否自动生成商品编码
            {
                var svUserConfigdetailId;
                var svDetailValue;
                var svUserConfigId;
                var svUserModuleId;
                PreferentialTopUpGivingConfigList("WhetherSendtextMessageRemindMember", "WhetherSendtextMessageRemindMember");
                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                    svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
                    svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
                    svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
                }
                g_WhetherSendtextMessageRemindMember = !g_WhetherSendtextMessageRemindMember;
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
                    "sv_detail_is_enable": g_WhetherSendtextMessageRemindMember,
                    "sv_user_configdetail_name": "是否发送短信提醒会员",
                    "sv_remark": "是否发送短信提醒会员"
                };
                detaillist.push(data);

                $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=WhetherSendtextMessageRemindMember',
                       detaillist, function (result) {
                           if (result) {
                               if (result == 1) {
                                   layer.msg("保存成功");
                               }
                               else if (result == -2) {
                                   layer.msg("你没有该操作权限！");
                               }
                               else {
                                   layer.msg("保存失败");
                               }
                           }
                       });
                WhetherSendtextMessageRemindMemberShow();
                return;
            }
            if ("rankDemotion" == butname)//此处会员等级降级
            {
                if (MembershipGradeGroupingIsON && rankPromotionIsON) {
                    rankDemotion = !rankDemotion;

                    var svUserConfigdetailId;
                    var svDetailValue;
                    var svUserConfigId;
                    var svUserModuleId;
                    PreferentialTopUpGivingConfigList("rankDemotion", "rankDemotion");
                    if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
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
                        "sv_detail_is_enable": rankDemotion,
                        "sv_user_configdetail_name": "是否禁用手动输入会员卡卡号",
                        "sv_remark": "是否禁用手动输入会员卡卡号"
                    };
                    detaillist.push(data);

                    $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=rankDemotion',
                           detaillist, function (result) {
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
                    checkrankDemotionShow();

                }
                return;
            }

            var branchrelation = 0;
            var strname = "";
            strname = $(this).parents('.swtith').data("name");
            $.post("/System/MemberSharedOperate", { name: $(this).parents('.swtith').data("name"), valu: $(this).parents('.swtith').is(".open") }, function (data) {
                if (data.succeed) {
                    branchrelation = data.values;
                    layer.msg("保存成功，请继续操作！");
                }
                else if (!data.succeed) {
                    if (data.values == -1) {
                        layer.msg("您的店铺还没有分店不允许开启会员共享！");
                    }
                    else {
                        window.location.href = data.values;
                    }
                }
                else {
                    if (cr.values == -1) {
                        layer.msg("您的店铺还没有分店不允许开启会员共享！");
                    }
                    else {
                        layer.msg("操作失败，请稍后重试！");
                    }
                }
                MemberSharedOperate(branchrelation, strname, 0);
                if (strname == "crossShopConsume" && $(".swtith[data-name='crossShopEdit']").is(".open")) {
                    $.post("/System/MemberSharedOperate", { name: "crossShopEdit", valu: false }, function (data) {
                        if (data.succeed) {
                            branchrelation = data.values;
                        }
                    });
                }
            });


        });
        //控制开关方法
        function MemberSharedOperate(branchrelation, name, type) {

        if (branchrelation == 1)
        {
            //会员共享
                if (!$(".swtith[data-name='membersShare']").is(".open"))
                    $(".swtith[data-name='membersShare']").toggleClass('open');
                $(".swtith[data-name='membersShare']").parent().next().find("input").removeAttr("readonly", "readonly");
                $(".swtith[data-name='membersShare']").parent().next().find(".kkbtn").removeClass("disabled");
                $("#CrossShopSwitch").show();
            }
            else if (branchrelation == 2) {
                if (!$(".swtith[data-name='membersShare']").is(".open"))
                    $(".swtith[data-name='membersShare']").toggleClass('open');
                if (name == "crossShopConsume") {//跨店消费
                    if ($(".swtith[data-name='crossShopConsume']").is(".open"))
                        $(".swtith[data-name='crossShopConsume']").toggleClass('open');
                }
                if (name == "crossShopEdit" && type == 1) {
                    $(".swtith[data-name='crossShopConsume']").toggleClass('open');
                }
                //跨店编辑
                if ($(".swtith[data-name='crossShopEdit']").is(".open"))
                    $(".swtith[data-name='crossShopEdit']").toggleClass('open');
                else
                    $(".swtith[data-name='crossShopEdit']").toggleClass('open');
                $("#CrossShopSwitch").show();
                $(".swtith[data-name='membersShare',data-name='crossShopEdit']").parent().next().find("input").removeAttr("readonly", "readonly");
                $(".swtith[data-name='membersShare',data-name='crossShopEdit']").parent().next().find(".kkbtn").removeClass("disabled");
            }
            else if (branchrelation == 3) {  //跨店消费，不编辑
                if (!$(".swtith[data-name='membersShare']").is(".open"))
                    $(".swtith[data-name='membersShare']").toggleClass('open');
                if ($(".swtith[data-name='crossShopEdit']").is(".open"))
                    $(".swtith[data-name='crossShopEdit']").removeClass('open');
                if (!$(".swtith[data-name='crossShopConsume']").is(".open"))
                    $(".swtith[data-name='crossShopConsume']").toggleClass('open');
                else
                    $(".swtith[data-name='crossShopConsume']").toggleClass('open');
                $(".swtith[data-name='membersShare',data-name='crossShopConsume']").parent().next().find("input").removeAttr("readonly", "readonly");
                $(".swtith[data-name='membersShare',data-name='crossShopConsume']").parent().next().find(".kkbtn").removeClass("disabled");
                $("#CrossShopSwitch").show();

            } else if (branchrelation == 4) {
                if (name == "crossShopConsume") {
                    if ($(".swtith[data-name='crossShopConsume']").is(".open"))
                        $(".swtith[data-name='crossShopConsume']").toggleClass('open');
                }
                if (name == "crossShopEdit") {
                    if ($(".swtith[data-name='crossShopEdit']").is(".open"))
                        $(".swtith[data-name='crossShopEdit']").toggleClass('open');
                }
                $(".swtith[data-name='membersShare',data-name='crossShopEdit',data-name='crossShopConsume']").parent().next().find("input").attr("readonly", "readonly");
                $(".swtith[data-name='membersShare',data-name='crossShopEdit',data-name='crossShopConsume']").parent().next().find(".kkbtn").addClass("disabled");
                if (!$(".swtith[data-name='membersShare']").is(".open"))
                { $("#CrossShopSwitch").hide(); }
            }
            else {
                if ($(".swtith[data-name='crossShopConsume']").is(".open"))
                    $(".swtith[data-name='crossShopConsume']").toggleClass('open');
                if ($(".swtith[data-name='crossShopEdit']").is(".open"))
                    $(".swtith[data-name='crossShopEdit']").toggleClass('open');
                if ($(".swtith[data-name='membersShare']").is(".open"))
                    $(".swtith[data-name='membersShare']").toggleClass('open');
                $(".swtith[data-name='membersShare',data-name='crossShopEdit',data-name='crossShopConsume']").parent().next().find("input").attr("readonly", "readonly");
                $(".swtith[data-name='membersShare',data-name='crossShopEdit',data-name='crossShopConsume']").parent().next().find(".kkbtn").addClass("disabled");
                $("#CrossShopSwitch").hide();
            }
        }
    },
    product: function () {
        $(document).off("click");


        var danwei = '<a href="javascript:void(0)" class="klisos" data-id="@id" data-name="@dname"> <span>@name</span><i class="poriss  icon-edit danweiedit" ></i><em class="porvv icon-trash rovierw"  ></em></a>';
        $.getJSON("/system/GetUserPage", function (data) {
            var dd = JSON.parse(data.sv_uc_unit);
            for (var i = 0; i < dd.length; i++) {
                $("#danweiss").append(danwei.replace("@name", dd[i]).replace("@id", 0).replace("@dname", "chengwei"));
            }
        });
        var productconfig = '<a href="javascript:void(0)" class="klisos" data-id="@id" data-name="@name"> <span>@name</span><i class="poriss  icon-edit updateconfig" ></i><em class="porvv icon-trash productconfigdelete"  ></em></a>'
        //产品配置查询
        GetProductConfig(productconfig);
        /*
//添加单位
//
*/
        $(document).on("click", "#danweiadd", function () {

            layer.prompt({
                title: '添加单位',
                formType: 0 //prompt风格，支持0-2
            }, function (pass) {
                layer.load();
                $.post("/System/Update_danwei", { id: 0, name: pass, name2: "" }, function (data) {
                    if (data.r == true) {
                        $("#danweiss").html("");
                        // var dd = JSON.parse(data.sv_uc_unit);
                        //  alert(JSON.stringify(data.sv_uc_callnameList));
                        for (var i = 0; i < data.sv_uc_unit.length; i++) {
                            $("#danweiss").append(danwei.replace("@name", data.sv_uc_unit[i]).replace("@id", 0).replace("@dname", "chengwei"));
                        }
                        //  $("#chengweicount").text(data.sv_uc_callnameList.length);
                        layer.closeAll();
                        layer.msg("单位添加改成功");

                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                        layer.closeAll();
                    }
                    else {
                        layer.msg("添加单位失败");
                        layer.closeAll();
                    }

                });
            });
        });


        //修改选中的分组
        $(document).on("click", ".danweiedit", function () {
            var ss = $(this).parent();
            var val = $(this).prev().text();
            layer.prompt({
                title: '修改选中的单位',
                value: val,
                formType: 0 //prompt风格，支持0-2
            }, function (pass) {


                $.post("/System/Update_danwei", { id: 1, name: pass, name2: val }, function (data) {
                    if (data.r == true) {
                        $("#danweiss").html("");
                        //  var dd = JSON.parse(data.sv_uc_unit);
                        //  alert(JSON.stringify(data.sv_uc_callnameList));
                        for (var i = 0; i < data.sv_uc_unit.length; i++) {
                            $("#danweiss").append(danwei.replace("@name", data.sv_uc_unit[i]).replace("@id", 0).replace("@dname", "chengwei"));
                        }

                        //  $("#chengweicount").text(data.sv_uc_callnameList.length);

                        layer.closeAll();
                        layer.msg("单位修改成功");

                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        layer.msg("单位分组失败");
                        layer.closeAll();
                    }
                });
            });
        });


        //称谓，单位的删除

        $(document).on("click", ".rovierw", function () {

            var thisname = $(this);

            //layer.confirm("确认要删除吗？", function () {               
            //});
            layer.load();
            $.post("/System/Update_danwei", { id: 2, name: thisname.prev().prev().text(), name2: "" }, function (data) {
                if (data.r == true) {
                    $("#danweiss").html("");
                    // var dd = JSON.parse(data.sv_uc_unit);
                    //  alert(JSON.stringify(data.sv_uc_callnameList));
                    for (var i = 0; i < data.sv_uc_unit.length; i++) {
                        $("#danweiss").append(danwei.replace("@name", data.sv_uc_unit[i]).replace("@id", 0).replace("@dname", "chengwei"));
                    }
                    layer.closeAll();
                    layer.msg("单位删除成功");
                }
                else if (data == -2) {
                    layer.closeAll();
                    layer.msg("你没有该操作权限！");
                }
                else {
                    layer.msg("单位失败");
                    layer.closeAll();
                }
            });
        });
        //开关
        $(document).on("click", ".swtith[data-name='InventoryWarning'] i", function () {
            $(this).parents('.swtith').toggleClass('open');
            $.post("/System/Update_repertory", { kaiqi: $(this).parents('.swtith').is(".open") }, function (data) {
                if (data == true) {
                    layer.msg("保存成功，请继续操作！");
                }
                else if (data == -2) {
                    layer.msg("你没有该操作权限！");
                }
                else {
                    layer.msg("操作失败请稍后重试！");
                }
            });

            if ($(this).parents('.swtith[data-name="InventoryWarning"]').is(".open")) {
                $("input").removeAttr("readonly");
                $("#prodcsaver").removeClass("disabled");
            } else {
                $("input").attr("readonly", "readonly");
                $("#prodcsaver").addClass("disabled");
            }


        });

        $.getJSON("/system/GetUserPage", function (data) {
            // alert(JSON.stringify(data));
            //设置积分

            if (data.sv_uc_storagealertis) {
                $(".swtith[data-name='InventoryWarning']").toggleClass('open');
                $("input").removeAttr("readonly");
                $("#prodcsaver").removeClass("disabled");
            } else {
                $("input").attr("readonly", "readonly");
                $("#prodcsaver").addClass("disabled");
            }

            var json = JSON.parse(data.sv_uc_storagealert);
            // alert(data.sv_uc_storagealert);
            $("#alertvalue").val(json.alertvalue);
            $("#alerttime").val(json.alerttime);
            $(".stecs").eq(json.alertmethod).addClass("on").siblings().removeClass("on");
            //
            $(".stecs").click(function () {
                $(this).addClass("on").siblings().removeClass("on");
            });


            $('#alerttime').datetimepicker({
                initialDate: '',
                weekStart: 1,
                todayBtn: 0,
                autoclose: 1,
                todayHighlight: 1,
                startView: 1,
                minView: 0,
                maxView: 1,
                forceParse: 0,
                pickerPosition: "bottom-left",
                format: 'hh:ii'
            });


            $("#prodcsaver").click(function () {


                if (!$(this).hasClass("disabled")) {
                    var i = 0;
                    $(".stecs").each(function (index) {
                        if ($(this).hasClass("on")) {
                            i = index;
                        }
                    });

                    //  var jason = { "alertvalue": $("#alertvalue").val(), "alertmethod": i, "alerttime": $("#alerttime").val() };

                    $.post("/System/Update_repertory2", { dats: JSON.stringify({ "alertvalue": $("#alertvalue").val(), "alertmethod": i, "alerttime": $("#alerttime").val() }) }, function (data) {
                        if (data == true) {
                            layer.msg("保存成功，请继续操作！");
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                        }
                        else {
                            layer.msg("操作失败，请稍后再试！");
                        }
                    });

                }

            });

        });

        //产品配置添加
        $(document).on("click", "#AddConfiginfo", function () {
            layer.prompt({
                title: '添加产品自定义类别',
                formType: 0 //prompt风格，支持0-2
            }, function (pass) {
                layer.load();
                $.post("/ProductCustomProperties/AddProductAttributeConfiginfo", { configname: pass }, function (data) {
                    if (data == true) {
                        $("#Configinfotext").html("");
                        GetProductConfig(productconfig);
                        layer.closeAll();
                        layer.msg("添加配置成功");
                    }
                    else if (data == -2) {
                        layer.closeAll();
                        layer.msg("你没有该操作权限！");

                    } else if (data == -3) {
                        layer.closeAll();
                        layer.msg("名称不能为空！");
                    } else if (data == 3) {
                        layer.closeAll();
                        layer.msg("名称不能重复！");


                    }
                    else {
                        layer.closeAll();
                        layer.msg("添加配置失败！");

                    }

                });
            });
        });
        //产品配置删除
        $(document).on("click", ".productconfigdelete", function () {
            var thisname = $(this);
            layer.confirm("确认要删除吗？", function () {
                layer.load();
                $.post("/ProductCustomProperties/DeleteProductAttributeConfiginfo", { ConfigId: thisname.parent().data("id") }, function (data) {
                    if (data == 1) {
                        $("#Configinfotext").html("");
                        GetProductConfig(productconfig);
                        layer.closeAll();
                        layer.msg("删除配置成功");
                    }
                    else if (data == -2) {
                        layer.closeAll();
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        layer.closeAll();
                        layer.msg("删除配置失败");
                    }
                });
            });
        });
        //产品配置修改
        $(document).on("click", ".updateconfig", function () {
            var _configid = $(this).parent().data("id");
            layer.prompt({
                title: '产品自定义属性配置',
                value: $(this).parent().data("name"),
                formType: 0
            }, function (pass) {
                $.post("/ProductCustomProperties/UpdateProductAttributeConfiginfo", { configid: _configid, configname: pass }, function (data) {
                    if (data == 1) {
                        $("#Configinfotext").html("");
                        GetProductConfig(productconfig);
                        layer.closeAll();
                        layer.msg("产品自定义属性配置修改成功");

                    }
                    else if (data == -2) {
                        layer.closeAll();
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        layer.closeAll();
                        layer.msg("产品自定义属性配置修改");

                    }
                });
            });
        });
        //产品配置开关
        $(document).on("click", "#detailinfo .configopen i", function () {
            $(this).parents('#detailinfo .configopen').toggleClass('open');
            $.post("/ProductCustomProperties/SwitchOperation", { configIid: $(this).parents('#detailinfo .configopen').data("configid"), isswitch: $(this).parents('#detailinfo .configopen').is(".open") }, function (data) {
                if (data == true) {
                    $("#Configinfotext").html("");
                    GetProductConfig(productconfig);
                    layer.msg("保存成功，请继续操作！");
                }
                else if (data == -2) {
                    layer.msg("你没有该操作权限！");
                }
                else {
                    layer.msg("操作失败请稍后重试！");
                }
            });
        });
        //产品配置明细添加
        $(document).on("click", ".attributedetail", function () {
            var _configid = $(this).data("configid");
            layer.prompt({
                title: '产品自定义属性添加',
                formType: 0
            }, function (pass) {
                layer.load();
                $.post("/ProductCustomProperties/AddProductAttributeDetailinfo", { configid: _configid, detailid: 0, detailname: pass, }, function (data) {
                    if (data == true) {
                        GetProductAttributeDetail(_configid);
                        layer.closeAll();
                        layer.msg("添加属性成功");
                    }
                    else if (data == -2) {
                        layer.closeAll();
                        layer.msg("你没有该操作权限！");
                    } else if (data == -3) {
                        layer.closeAll();
                        layer.msg("名称不能为空！");

                    } else if (data == 3) {
                        layer.closeAll();
                        layer.msg("名称不能重复！");

                    }
                    else {
                        layer.closeAll();
                        layer.msg("添加属性失败");
                    }

                });
            });
        });
        //产品配置明细删除
        $(document).on("click", ".detaidelete", function () {
            var thisname = $(this);
            var _configid = thisname.parent().data("configid")
            layer.confirm("确认要删除吗？", function () {
                layer.load();

                $.post("/ProductCustomProperties/DeleteProductAttributeDetailinfo", { configid: _configid, detailid: thisname.parent().data("detailid") }, function (data) {
                    if (data == 1) {
                        GetProductAttributeDetail(_configid);
                        layer.closeAll();
                        layer.msg("删除设置成功");
                    }
                    else if (data == -2) {
                        layer.closeAll();
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        layer.closeAll();
                        layer.msg("删除设置失败");

                    }
                });

            });
        });

        var user_Info_q;
        //产品配置明细修改
        $(document).on("click", ".updatedetai", function () {
            var _configid = $(this).parent().data("configid");
            var _detailid = $(this).parent().data("detailid");

            layer.prompt({
                title: '产品自定义属性修改',
                value: $(this).parent().data("name"),
                formType: 0
            }, function (pass) {
                layer.load();
                $.post("/ProductCustomProperties/AddProductAttributeDetailinfo", { configid: _configid, detailid: _detailid, detailname: pass, }, function (data) {
                    if (data == true) {
                        GetProductAttributeDetail(_configid);
                        layer.closeAll();
                        layer.msg("修改属性成功");
                    }
                    else if (data == -2) {
                        layer.closeAll();
                        layer.msg("你没有该操作权限！");
                    } else if (data == -3) {
                        layer.closeAll();
                        layer.msg("名称不能为空！");

                    } else if (data == 3) {
                        layer.closeAll();
                        layer.msg("名称不能重复！");
                    }
                    else {
                        layer.closeAll();
                        layer.msg("修改属性失败");
                    }

                });
            });
        });

    },
    Isindex: function () {

        // 读取店铺信息
        $.getJSON("/AjaxUser/GetUserinfo/", function (data) {
            if (data) {
                user_Info_q = data;
                if ($("#sv_wechat_number") != null && data.sv_wechat_number != null) {
                    $("#sv_wechat_number").text(data.sv_wechat_number);
                }
                for (key in data) {
                    if (key != "sv_versionname") {
                        if (key == "sv_versionexpiration" && (data[key] == "" || data[key].slice(0, 4) == "0001")) {
                            $("#_" + key).text("");
                            if (data["sv_versionid"] == 1 || data["sv_versionid"] == 5 || data["sv_versionname"].indexOf("至尊") >= 0) {
                                if (data["sv_versionid"] == 1 && _g_sv_uit_cache_name == 'cache_name_catering') { // 判断是否为餐饮版
                                    $("#_sv_versionexpiration").text("免费试用10天");
                                } else {
                                    $("#_sv_versionexpiration").text("永久");
                                }
                            }
                        } else {
                            if (key == "sv_versionexpiration") {
                                if (data["sv_versionid"] != 1) {
                                    $("#_" + key).text(new Date(data[key]).Format('yyyy-MM-dd'));
                                }
                                else {
                                    $("#_sv_versionexpiration").text("永久");
                                }
                            }
                            else if (key == "sv_ul_regdate") {
                                $("#" + key).text(new Date(data[key]).Format('yyyy-MM-dd hh:mm:sss'))
                            } else {
                                $("#_" + key).text(data[key]);
                                $("#" + key).text(data[key]);
                                $("." + key).text(data[key]);
                            }

                        }


                    } else {
                        $("#_" + key).text(data[key]);
                        if (isNullOrWhiteSpace(data[key])) {
                            $("#sv_versionname").addClass("bg-bule");
                            $("#sv_versionname").text("版本：" + data[key]);


                        }
                        else {
                            $("#sv_versionname").addClass("bg-bule");
                            $("#sv_versionname").text("版本：免费版");
                        }

                    }
                    if (key == "isStore" && data[key] == true) {

                        $("#showlogoImg").removeAttr("onclick");
                        $("#logodetails").hide();
                    }
                    if (key == "sv_versionid" && data[key] != 1) {
                        $("#TrialVersion").hide();
                        if (data[key] == 2) {
                            $("#showlogoImg").removeAttr("onclick");
                            $("#logodetails").hide();

                            $("#btnSelectImg").attr("href", "/Home/paylinkage?version=5&distributor=" + data["distributor_id"] + "&gobackpage=system");
                        }
                    } else {
                        if (key == "sv_versionid" && data[key] == 1) {
                            $('#btnRenewVersion').hide();
                            $("#TrialVersion").show();
                            $("#showlogoImg").removeAttr("onclick");
                            $("#logodetails").hide();
                            $("#btnSelectImg").attr("href", "/Home/paylinkage?version=5&distributor=" + data["distributor_id"] + "&gobackpage=system");
                            $("#getTrialVersion").text("领取高级试用版");
                        }

                    }
                    if (key == 'sv_store_logo') {
                        if (isNullOrWhiteSpace(key) && isNullOrWhiteSpace(data[key])) {
                            $("#showlogoImg").attr('src', _g_res_images_url + data[key]);
                            $('#logoid').attr('src', _g_res_images_url + data[key]);
                        }
                        else {
                            $("#showlogoImg").attr('src', decerpLogoUrl_80);
                            $('#logoid').attr('src', decerpLogoUrl_270);
                        }
                    }
                    //else {
                    //    alert('ddd');
                    //    $('#logoid').attr('src', '/images/logo.jpg');
                    //}
                    if (key == 'sv_us_logo' && isNullOrWhiteSpace(key) && isNullOrWhiteSpace(data[key])) {
                        $('#userImg').attr('src', _g_res_images_url + data[key]);
                        $("#showImg").attr('src', _g_res_images_url + data[key]);
                    }
                    if (key == 'user_id') {
                        $('#user_id').html('' + data[key]);
                    }
                }
                $("._sv_versionexpiration").text('有效期间：' + $("#_sv_versionexpiration").text());

                if (_g_sv_uit_cache_name == 'cache_name_catering') {
                    getCateringCeremonial_Eat_Info();
                    $('#Catering_Is_Ceremonial_Eat_li, #CateringOnlineIsAutoOrderAndPrint_li').show();
                }
            }
        });

        // 处理异常图片
        $('#logoid').error(function () {
            $(this).attr('src', decerpLogoUrl_270);
        });

        // 修改店铺信息
        $(document).on("click", "#updainfo", function () {
            var weixin;

            if (user_Info_q != null && user_Info_q.sv_wechat_number != null) {
                weixin = user_Info_q.sv_wechat_number;
            } else {
                weixin = "";
            }
            //   Deke.DeKe_dialog.show_Url2("修改店铺基本信息","",null,[]);
            index = layer.open({
                id: "54321",
                type: 1, //page层
                title: '修改店铺基本信息',
                shade: 0.6, //遮罩透明度
                moveType: 1, //拖拽风格，0是默认，1是传统拖动
                shift: 0, //0-6的动画形式，-1不开启
                area: ['360px', '450px'], //宽高
                closeBtn: 1,
                content: ' <div class="modal-body maodelsbox "> <ul class="modderlis" style="height:320px;"> <li> <input type="hidden"  value="" class="sv_us_industrytype"/> <input type="hidden"  value="" class="sv_us_province"/><input type="hidden"  value="" class="sv_us_district"/><input type="hidden"  value="" class="sv_us_city"/>  <span>店铺名称：</span>  <input type="text" class="sv_us_name" placeholder="还没填写" autofocus="" /> </li> <li> <span>微信账号：</span> <input type="text" class="sv_wechat_number" value = "' + weixin + '"  placeholder="微信账号" /></li> <li>  <span>店主姓名：</span>  <input type="text" class="sv_ul_name" placeholder="还没填写" />'
                            + '</li>  <li> <span>行业类型：</span>  <select id="sv_us_industrytype" name="sv_us_industrytype" class="form-control" size="1"></select> </li><li> <span>店铺简称：</span> <input type="text" class="sv_us_shortname" placeholder="简称" />'
                           + ' </li><li> <span>店铺电话：</span> <input type="text" placeholder="" class="sv_us_phone" /></li><li class="xzsfdiqubox"> <select id="sv_us_province" name="sv_us_province" class="form-control" size="1"> <option value="0">省份</option>  </select> <select id="sv_us_city" name="sv_us_city" class="form-control" size="1"> <option value="0">城市</option>'
                            + ' </select> <select id="sv_us_district" name="sv_us_district" class="form-control" size="1">  <option value="0">地区</option> </select></li><li><span>店铺地址：</span><input type="text" placeholder="" class="sv_us_address"></li> </ul> </div>',
                btn: ["确认", "取消"],
                yes: function (id) {
                    var sv_ul_name = $(".sv_ul_name").val().trim();
                    var sv_us_shortname = $(".sv_us_shortname").val().trim();
                    var sv_us_name = $(".sv_us_name").eq(1).val().trim();
                    if (!isNullOrEmpty(sv_ul_name)) {
                        $(".sv_ul_name").focus();
                        layer.msg("店主姓名不能为空！");
                        return;
                    }
                    if (!isNullOrEmpty(sv_us_shortname)) {
                        $(".sv_us_shortname").focus();
                        layer.msg("店铺简称不能为空！");
                        return;
                    } else {

                        // var strlength = getstrlength(sv_us_shortname)
                        if (sv_us_shortname.length < 2 || sv_us_shortname.length > 8) {
                            layer.msg("店铺简称长度为2-8字符");
                            return;
                        }
                    }
                    if (!isNullOrEmpty(sv_us_name)) {
                        $(".sv_us_name").focus();
                        layer.msg("店铺名称不能为空！");
                        return;
                    }
                    if (!checkTel($(".sv_us_phone").val())) {
                        $(".sv_us_phone").focus();
                        layer.msg("电话号码格式不对");
                        return;
                    }
                    var inde = layer.load();

                    var data = {
                        sv_wechat_number: $(".sv_wechat_number").val(),
                        sv_ul_name: sv_ul_name,
                        sv_us_shortname: sv_us_shortname,
                        sv_us_name: sv_us_name,
                        sv_us_phone: $(".sv_us_phone").val(),
                        sv_us_address: $(".sv_us_address").val(),
                        sv_us_province: $("#sv_us_province").val() || 0,
                        sv_us_city: $("#sv_us_city").val() || 0,
                        sv_us_district: $("#sv_us_district").val() || 0,
                        sv_us_industrytype: $("#sv_us_industrytype").val()
                    };
                    //alert(JSON.stringify(data));
                    $.ajax({
                        url: '/System/UpdaueShopInfo',
                        type: 'post',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        async: false,
                        success: function (data) {
                            // alert(data);
                            if (data == true) {
                                $("#username").text($(".sv_us_name").eq(1).val());
                                $("#dianzhu").text($(".sv_ul_name").val());
                                // getpage('');
                                layer.closeAll();
                                layer.msg("资料修改成功！");

                                $.getJSON("/AjaxUser/GetUserinfo/", function (data) {
                                    loggin.chklogn(data);
                                    for (key in data) {
                                        $("#" + key).text(data[key]);
                                        $("." + key).text(data[key]);
                                    }

                                });
                            }
                            else if (data == -2) {
                                layer.msg("你没有该操作权限！");
                                layer.closeAll();
                            }
                            else {
                                layer.msg("资料修改失败，请刷新重试");
                                layer.closeAll();
                            }
                        }
                    });
                }, success: function () {
                    $.getJSON("/AjaxUser/GetUserinfo/", function (data) {
                        loggin.chklogn(data);
                        for (key in data) {
                            $("." + key).val(data[key]);
                        }

                    });
                    //加载行业类型并赋值
                    $.get("/Ajaxdata/GetIndustryType", function (data) {
                        if (data.length > 0) {
                            for (var i in data) {
                                $("#sv_us_industrytype").append("<option value=\"" + data[i].industrytype_id + "\">" + data[i].sv_uit_name + "</option>");
                            }
                        }

                    });
                    setTimeout(function () {
                        $("#sv_us_industrytype").val($(".sv_us_industrytype").val());
                    }, 200);

                    //页面加载时只需绑定省份下拉框
                    $.get("/Ajaxdata/GetPCD/1", function (data) {
                        if (data.length > 0) {
                            for (var i in data) {
                                $("#sv_us_province").append("<option value=\"" + data[i].code + "\">" + data[i].name + "</option>");
                            }
                        }
                    });



                    setTimeout(function () {
                        $("#sv_us_province").val($(".sv_us_province").val()).change();
                    }, 100);

                    //联动
                    $("#sv_us_province").change(function () {
                        $("#sv_us_district").empty();

                        $.get("/Ajaxdata/GetCityInterlock/" + $("#sv_us_province").val(), function (data1) {

                            $("#sv_us_city").empty();//清空城市下拉框
                            for (var i in data1) {
                                $("#sv_us_city").append("<option value=\"" + data1[i].code + "\">" + data1[i].name + "</option>");
                            }
                        });
                        setTimeout(function () {
                            $("#sv_us_city").val($(".sv_us_city").val());
                            $("#sv_us_city").change();
                        }, 100);
                    });

                    //改变省份
                    $("#sv_us_city").change(function () {
                        $.get("/Ajaxdata/GetDistrictInterlock/" + $("#sv_us_city").val(), function (data) {
                            if (data.length > 0) {
                                $("#sv_us_district").empty();
                                for (var i in data) {
                                    $("#sv_us_district").append("<option value=\"" + data[i].code + "\">" + data[i].name + "</option>");
                                }

                            }
                        });
                        setTimeout(function () {
                            $("#sv_us_district").val($(".sv_us_district").val());
                        }, 100);
                    });

                }

            });
        });

        function checkTel(value) {
            var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            if (value == "") {
                return true;
            }
            if (isMob.test(value) || isPhone.test(value)) {
                return true;
            }
            else {
                return false;
            }
        }
        // 读取餐饮店铺营业模式配置参数
        function getCateringCeremonial_Eat_Info() {
            //营业模式
            $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=Catering_Is_Ceremonial_Eat', function (result) {
                if (result != null) {
                    var childInfolist = result.childInfolist;
                    if (childInfolist && childInfolist.length > 0) {
                        $('#selectCatering_Is_Ceremonial_Eat').attr('data-configid', childInfolist[0].sv_user_config_id).attr('data-moduleid', childInfolist[0].sv_user_module_id);
                        for (var i = 0; i < childInfolist.length; i++)
                        {
                            if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0)
                            {
                                var childDetailList = childInfolist[i].childDetailList[0];
                                if (childDetailList)
                                {
                                    $('#selectCatering_Is_Ceremonial_Eat').attr('data-id', childDetailList.sv_user_configdetail_id).val(childDetailList.sv_detail_value);
                                }
                            }
                        }
                    }
                }
            });
        }
    },
    xiaoshou: function () {
        $.getJSON('/UserModuleConfig/GetUserModuleConfigList?module_code=custom_order_number', function (result) {
            if (result) {
                var childInfolist = result.childInfolist;
                if (childInfolist != null && childInfolist.length > 0) {
                    for (var i = 0; i < childInfolist.length; i++) {
                        if (childInfolist[i].sv_user_config_code == 'custom_order_number') {
                            $('#txtCustomOrderNumber').attr('data-config_id', childInfolist[i].sv_user_config_id).attr('data-module_id', childInfolist[i].sv_user_module_id);
                            if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0) {
                                var childDetailList = childInfolist[i].childDetailList[0];
                                if (childDetailList != null)
                                {
                                    $('#txtCustomOrderNumber').val(childDetailList.sv_detail_value).attr('data-config_id', childDetailList.sv_user_config_id).attr('data-module_id', childDetailList.sv_user_module_id).attr('data-id', childDetailList.sv_user_configdetail_id);
                                }
                            }
                        }
                        else if (childInfolist[i].sv_user_config_code == 'custom_order_number_reset_mode') {
                            $('#select_reset_mode').attr('data-config_id', childInfolist[i].sv_user_config_id).attr('data-module_id', childInfolist[i].sv_user_module_id);
                            if (childInfolist[i].childDetailList && childInfolist[i].childDetailList.length > 0) {
                                var childDetailList = childInfolist[i].childDetailList[0];
                                if (childDetailList != null) {
                                    $('#select_reset_mode').val(childDetailList.sv_detail_value).attr('data-config_id', childDetailList.sv_user_config_id).attr('data-module_id', childDetailList.sv_user_module_id).attr('data-id', childDetailList.sv_user_configdetail_id);
                                }  
                            }
                        }
                    }
                }
            }
        });

        $.getJSON("/system/GetUserPage", function (data) {

            var json = JSON.parse(data.sv_uc_serialnumberset);
            //处理流水号
            if (json.whether) {

                $(".swtith[data-name='sv_uc_serialnumberset']").toggleClass('open');

            } else {
                $(".swtith[data-name='sv_uc_serialnumberset']").parent().next().find("input").attr("readonly", "readonly");
                $(".swtith[data-name='sv_uc_serialnumberset']").parent().next().find(".kkbtn").addClass("disabled");
            }

            // $(".swtith[data-name='sv_uc_serialnumberset']").parent().next().find("input").val(json.nomber);
            $('#txtSysSetAutoNomber').val(json.nomber);

            $(".swtith[data-name='sv_uc_serialnumberset']").parent().next().find(".stecs").eq(json.auto).addClass("on").siblings().removeClass("on");



            ///流水号结束
            json = JSON.parse(data.sv_uc_dixian);
            //积分 抵现设置

            if (json.whether) {

                $(".swtith[data-name='sv_uc_dixian']").toggleClass('open');

            } else {
                $(".swtith[data-name='sv_uc_dixian']").parent().next().find("input").attr("readonly", "readonly");
                $(".swtith[data-name='sv_uc_dixian']").parent().next().find(".kkbtn").addClass("disabled");
            }
            $(".swtith[data-name='sv_uc_dixian']").parent().next().find("input").val(json.auto);

            //积分抵现结束


            ///销售挂零
            json = JSON.parse(data.sv_uc_saletozeroset);

            if (json.whether) {

                $(".swtith[data-name='sv_uc_saletozeroset']").toggleClass('open');

            } else {

                $(".swtith[data-name='sv_uc_saletozeroset']").parent().next().find(".kkbtn").addClass("disabled");
            }


            $(".swtith[data-name='sv_uc_saletozeroset']").parent().next().find(".stecs").eq(json.auto).addClass("on").siblings().removeClass("on");

            ///密码启用
            if (data.sv_uc_isenablepwd) {
                $(".swtith[data-name='sv_uc_isenablepwd']").toggleClass('open');
            }
            //提成启用
            if (data.sv_isopen_commission) {
                $(".swtith[data-name='sv_isopen_commission']").toggleClass('open');
            }
            // $(".swtith[data-name='sv_uc_dixian']").parent().next().find("input").val(json.auto);

            //结束

            // alert(data.sv_uc_saleprediscount);
            $(".kkbtn").click(function () {
                if (!$(this).hasClass("disabled")) {
                    if ($(this).data("name") == "sv_uc_serialnumberset")
                    {
                        var nober_string = $('#txtSysSetAutoNomber').val().trim();
                        if (nober_string == "")
                        {
                            nober_string = "1";
                        }
                        if (!(nober_string) || isNaN(nober_string))
                        {
                            layer.msg("自动流水号必须全部为数字，或改用每日流水号设置非数字前缀。");
                            return;
                        }
                        $.post("/System/updateUserinfo", { name: "sv_uc_serialnumberset", key: "nomber", valu: nober_string }, function(data) {
                            if (data == true) {
                                var i = 0;
                                layer.msg("保存成功，请继续操作！");
                                $(".swtith[data-name='sv_uc_serialnumberset']").parent().next().find(".stecs").each(function (index) {
                                    if ($(this).hasClass("on")) {
                                        i = index;
                                    }
                                });

                                //$.post("/System/updateUserinfo", { name: "sv_uc_serialnumberset", key: "auto", valu: i }, function (data) {
                                //    if (data == true) {
                                //        layer.msg("保存成功，请继续操作！");
                                //    }
                                //    else if (data == -2) {
                                //        layer.msg("你没有该操作权限！");
                                //    }
                                //    else if (data == -5) {
                                //        layer.msg("当前设置的流水号必须大于上次设置的流水号！");
                                //    }
                                //    else {
                                //        layer.msg("操作失败，请稍后重试！");
                                //    }
                                //});
                            }
                            else if (data == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else if (data == -5) {
                                layer.msg("当前设置的流水号必须大于上次设置的流水号！");
                            }
                            else {
                                layer.msg("操作失败，请稍后重试！");
                            }
                        });
                    }

                    if ($(this).data("name") == "sv_uc_dixian") {

                        $.post("/System/updateUserinfo", { name: "sv_uc_dixian", key: "auto", valu: $(".swtith[data-name='sv_uc_dixian']").parent().next().find("input").val() }, function (data) {
                            if (data == true) {
                                layer.msg("保存成功，请继续操作！");
                            }
                            else if (data == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("操作失败，请稍后重试！");
                            }
                        });

                    }
                    if ($(this).data("name") == "sv_uc_saletozeroset") {
                        var i = 0;
                        $(".swtith[data-name='sv_uc_saletozeroset']").parent().next().find(".stecs").each(function (index) {
                            if ($(this).hasClass("on")) {
                                i = index;
                            }
                        });

                        $.post("/System/updateUserinfo", { name: "sv_uc_saletozeroset", key: "auto", valu: i }, function (data) {
                            if (data == true) {
                                layer.msg("保存成功，请继续操作！");
                            }
                            else if (data == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("操作失败，请稍后重试！");
                            }
                        });

                    }
                    if ($(this).data("name") == "sv_uc_isenablepwd") {
                        var i = 0;
                        $(".swtith[data-name='sv_uc_serialnumberset']").parent().next().find(".stecs").each(function (index) {
                            if ($(this).hasClass("on")) {
                                i = index;
                            }
                        });
                        $.post("/System/updateUserinfo", { name: "sv_uc_isenablepwd", key: "auto", valu: i }, function (data) {
                            if (data == true) {
                                layer.msg("保存成功，请继续操作！");
                            }
                            else if (data == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("操作失败，请稍后重试！");
                            }
                        });
                    }

                    if ($(this).data("name") == "sv_isopen_commission") {
                        var i = 0;
                        $(".swtith[data-name='sv_uc_serialnumberset']").parent().next().find(".stecs").each(function (index) {
                            if ($(this).hasClass("on")) {
                                i = index;
                            }
                        });
                        $.post("/System/updateUserinfo", { name: "sv_isopen_commission", key: "auto", valu: i }, function (data) {
                            if (data == true) {
                                layer.msg("保存成功，请继续操作！");
                            }
                            else if (data == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("操作失败，请稍后重试！");
                            }
                        });
                    }

                    if ($(this).data("name") == "customOrderNumber") {
                        var txtCustomOrderNumber = $('#txtCustomOrderNumber').val().trim();
                        var select_reset_mode = $('#select_reset_mode').val();
                        if (isNullOrWhiteSpace(txtCustomOrderNumber)) {
                            var detaillist = [];
                            var data = {
                                "sv_user_configdetail_id": $('#txtCustomOrderNumber').attr('data-id'),
                                "sv_detail_value": txtCustomOrderNumber,
                                "sv_user_config_id": $('#txtCustomOrderNumber').attr('data-config_id'),
                                "sv_user_module_id": $('#txtCustomOrderNumber').attr('data-module_id'),
                                "sv_detail_is_enable": true,
                                "sv_user_configdetail_name": "用户自定义流水号",
                                "sv_remark": "用户自定义流水号，适用用于餐饮行业"
                            };
                            var reset_mode = {
                                "sv_user_configdetail_id": $('#select_reset_mode').attr('data-id'),
                                "sv_detail_value": select_reset_mode,
                                "sv_user_config_id": $('#select_reset_mode').attr('data-config_id'),
                                "sv_user_module_id": $('#select_reset_mode').attr('data-module_id'),
                                "sv_detail_is_enable": true,
                                "sv_user_configdetail_name": "用户自定义流水号",
                                "sv_remark": "用户自定义流水号，适用用于餐饮行业"
                            };
                            detaillist.push(data);
                            detaillist.push(reset_mode);
                            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=custom_order_number', detaillist, function (result) {
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
                        else {
                            layer.msg("请填写自定义流水号");
                            $('#txtCustomOrderNumber').focus();
                        }
                    }
                }
            });

            $(".stecs").click(function () {
                $(this).addClass("on").siblings().removeClass("on");

            });

            //var xiaohtml = '  <a href="#" class="klisos"> <span>@name折</span><i class="poriss  icon-edit"></i> <em class="porvv icon-trash"></em> </a>';
            //json = JSON.parse(data.sv_uc_saleprediscount);

            //for (var i = 0; i < json.length; i++) {
            //    $("#zhekouss").append(xiaohtml.replace("@name", json[i]));
            //    //sv_mr_name
            //}
            //$(document).on("click", "#tianjiazhekoui", function () {

            //    layer.prompt({
            //        title: '添加折扣1-10之间',
            //        formType: 0 //prompt风格，支持0-2

            //    }, function (pass) {

            //        // alert(e)
            //        layer.load();
            //        $.post("/System/Update_discount", { id: 0, name: pass, name2: '' }, function (data) {
            //            if (data.r) {
            //                $("#zhekouss").html("");


            //                for (var i = 0; i < data.sv_uc_saleprediscount.length; i++) {
            //                    $("#zhekouss").append(xiaohtml.replace("@name", data.sv_uc_saleprediscount[i]));
            //                    //sv_mr_name
            //                }
            //                layer.closeAll();

            //                layer.msg("添加折扣成功");

            //            } else {
            //                layer.closeAll();
            //                layer.msg("添加折扣失败");

            //            }
            //        });
            //    });
            //});
        });
        SuccessionSwitchShow();
        function SuccessionSwitchShow() {
            if (SuccessionSwitch) {
                if (!$(".swtith[data-name='sv_succession']").is(".open"))
                    $(".swtith[data-name='sv_succession']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='sv_succession']").is(".open"))
                    $(".swtith[data-name='sv_succession']").toggleClass('open');
            }
        }

        DevanningSwitchShow();
        function DevanningSwitchShow() {
            if (automaticDevanning) {
                if (!$(".swtith[data-name='sv_devanning']").is(".open"))
                    $(".swtith[data-name='sv_devanning']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='sv_devanning']").is(".open"))
                    $(".swtith[data-name='sv_devanning']").toggleClass('open');
            }
        }

        MultiSpecificationShow();
        function MultiSpecificationShow() {
            if (MultiSpecification) {
                if (!$(".swtith[data-name='multi_specification']").is(".open"))
                    $(".swtith[data-name='multi_specification']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='multi_specification']").is(".open"))
                    $(".swtith[data-name='multi_specification']").toggleClass('open');
            }
        }
        zeroInventorySalesSwitchShow();
        function zeroInventorySalesSwitchShow() {
            if (g_ZeroInventorySalesQ) {
                if (!$(".swtith[data-name='sv_zeroInventorySales']").is(".open"))
                    $(".swtith[data-name='sv_zeroInventorySales']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='sv_zeroInventorySales']").is(".open"))
                    $(".swtith[data-name='sv_zeroInventorySales']").toggleClass('open');
            }
        }

        $("#SuccessionSwitch").click(function () {
            SuccessionSwitch = !SuccessionSwitch;
            var svUserConfigdetailId;
            var svDetailValue;
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("succession", "succession");
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
                "sv_detail_is_enable": SuccessionSwitch,
                "sv_user_configdetail_name": "交接班",
                "sv_remark": "交接班"
            };
            detaillist.push(data);

            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=succession',
                    detaillist, function (result) {
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

            SuccessionSwitchShow();

        });

        $("#sv_devanning").click(function () {
            automaticDevanning = !automaticDevanning;
            var svUserConfigdetailId;
            var svDetailValue;
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("SplitOpenACase", "SplitOpenACase");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
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
                "sv_detail_is_enable": automaticDevanning,
                "sv_user_configdetail_name": "是否自动拆箱",
                "sv_remark": "是否自动拆箱"
            };
            detaillist.push(data);

            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=SplitOpenACase',
                    detaillist, function (result) {
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

            DevanningSwitchShow();

        });
        $(".everyDaySerialNumber").click(function () {
            var biaodashi = "";
            if (notNull("liushuihaoqianzhui")) {
                biaodashi += $("#liushuihaoqianzhui").val();
            }
            if (notNull("liushuihaochangdu")) {
                if (!notNull("liushuihaotianchongwei")) {
                    layer.msg("请输入填充字符");
                    return;
                }
            }
            if (notNull("liushuihaotianchongwei")) {
                if (!notNull("liushuihaochangdu")) {
                    layer.msg("请输入最小长度");
                    return;
                }
            }
            if (!notNull("liushuihaotianchongwei") && !notNull("liushuihaochangdu")) {
                biaodashi += "[]";
            }
            if (notNull("liushuihaotianchongwei") && notNull("liushuihaochangdu")) {
                var length = parseInt($("#liushuihaochangdu").val() || 1);
                for (var i = 0; i < length; i++) {
                    biaodashi += "[" + $("#liushuihaotianchongwei").val() + "]";
                }

            }
            if (biaodashi != "[]") {
                $("#everyDaySerialNumberExpressions").val(biaodashi)
            }

            everyDaySerialNumberSave();
        });
        $("#everyDaySerialNumber").click(function () {
            _g_everyDaySerialNumber = !_g_everyDaySerialNumber;
            everyDaySerialNumberSave();
        });
        function notNull(id) {
            id = "#" + id;
            if ($(id) == null) {
                return false;
            }
            if ($(id).val() == "" || $(id).val() == null) {
                return false;
            }
            return true;
        }
        function everyDaySerialNumberSave() {
            var svUserConfigdetailId;
            serialNumberOfDailyExpressions = $("#everyDaySerialNumberExpressions").val();
            if (serialNumberOfDailyExpressions == "") {
                serialNumberOfDailyExpressions = "[0][0][0][0][0][0]";
            }
            var entityliushui;
            var svDetailValue = '';
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("EveryDaySerialNumber", "EveryDaySerialNumber");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                svUserConfigId = Preferential_TopUpGiving_ConfigList[0].sv_user_config_id;
                svUserModuleId = Preferential_TopUpGiving_ConfigList[0].sv_user_module_id;
                svUserConfigdetailId = Preferential_TopUpGiving_ConfigList[0].sv_user_configdetail_id
                svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                if (svDetailValue == "") {
                    svDetailValue = '{"datetime":"' + new Date().getDate() + '","SerialNumberExpression":"' + serialNumberOfDailyExpressions + '","SerialNumber":"' + g_liushuihao + '","tianchong":"' + $("#liushuihaotianchongwei").val() + '","changdu":"' + $("#liushuihaochangdu").val() + '","qianzhui":"' + $("#liushuihaoqianzhui").val() + '"}';
                }
                entityliushui = JSON.parse(svDetailValue);
                entityliushui.SerialNumberExpression = serialNumberOfDailyExpressions;
                entityliushui.qianzhui = $("#liushuihaoqianzhui").val();
                entityliushui.changdu = $("#liushuihaochangdu").val();
                entityliushui.tianchong = $("#liushuihaotianchongwei").val();
            }
            if (sv_user_module_config != null) {
                svUserConfigId = sv_user_module_config.sv_user_config_id;
                svUserModuleId = sv_user_module_config.sv_user_module_id;
            }
            var detaillist = [];
            var data = {
                "sv_user_configdetail_id": svUserConfigdetailId,
                "sv_detail_value": JSON.stringify(entityliushui),
                "sv_user_config_id": svUserConfigId,
                "sv_user_module_id": svUserModuleId,
                "sv_detail_is_enable": _g_everyDaySerialNumber,
                "sv_user_configdetail_name": "是否启用每日流水号",
                "sv_remark": "是否启用每日流水号"
            };
            detaillist.push(data);
            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=EveryDaySerialNumber',
                    detaillist, function (result) {
                        if (result) {
                            if (result == 1) {
                                layer.msg("保存成功");
                            }
                            else if (result == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("保存失败");
                            }
                        }
                    });
            //EveryDaySerialNumberShow();
        }

        EveryDaySerialNumberShow();
        function EveryDaySerialNumberShow() {
            if (_g_everyDaySerialNumber) {
                if (!$(".swtith[data-name='everyDaySerialNumber']").is(".open"))
                    $(".swtith[data-name='everyDaySerialNumber']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='everyDaySerialNumber']").is(".open"))
                    $(".swtith[data-name='everyDaySerialNumber']").toggleClass('open');
            }
            $("#everyDaySerialNumberExpressions").val(serialNumberOfDailyExpressions);
            PreferentialTopUpGivingConfigList("EveryDaySerialNumber", "EveryDaySerialNumber");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                var svDetailValue = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                if (svDetailValue) {
                    var entityliushui = JSON.parse(svDetailValue);
                    $("#liushuihaotianchongwei").val(entityliushui.tianchong);
                    $("#liushuihaochangdu").val(entityliushui.changdu);
                    $("#liushuihaoqianzhui").val(entityliushui.qianzhui);
                }
            }
        }

        $("#multi_specification").click(function () {
            MultiSpecification = !MultiSpecification;
            var svUserConfigdetailId;
            var svDetailValue;
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("MultiSpecification", "MultiSpecification");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
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
                "sv_detail_is_enable": MultiSpecification,
                "sv_user_configdetail_name": "是否显示多规格",
                "sv_remark": "是否显示多规格"
            };
            detaillist.push(data);

            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=MultiSpecification',
                    detaillist, function (result) {
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

            MultiSpecificationShow();

        });
        $("#TraceabilityCode").click(function () {
            g_TraceabilityCode = !g_TraceabilityCode;
            var svUserConfigdetailId;
            var svDetailValue;
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("TraceabilityCode", "TraceabilityCode");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
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
                "sv_detail_is_enable": g_TraceabilityCode,
                "sv_user_configdetail_name": "是否启用追溯码",
                "sv_remark": "是否启用追溯码"
            };
            detaillist.push(data);

            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=TraceabilityCode',
                    detaillist, function (result) {
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
            TraceabilityCodeShow();
        });
        TraceabilityCodeShow();
        function TraceabilityCodeShow() {
            if (g_TraceabilityCode) {
                if (!$(".swtith[data-name='TraceabilityCode']").is(".open"))
                    $(".swtith[data-name='TraceabilityCode']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='TraceabilityCode']").is(".open"))
                    $(".swtith[data-name='TraceabilityCode']").toggleClass('open');
            }
        }
        $("#WhetherStartusingConsumptionMarket").click(function () {
            g_WhetherStartusingConsumptionMarket = !g_WhetherStartusingConsumptionMarket;
            var svUserConfigdetailId;
            var svDetailValue;
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("WhetherStartusingConsumptionMarket", "WhetherStartusingConsumptionMarket");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
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
                "sv_detail_is_enable": g_WhetherStartusingConsumptionMarket,
                "sv_user_configdetail_name": "是否显示多规格",
                "sv_remark": "是否显示多规格"
            };
            detaillist.push(data);

            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=WhetherStartusingConsumptionMarket',
                    detaillist, function (result) {
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

            WhetherStartusingConsumptionMarketShow();

        });
        WhetherStartusingConsumptionMarketShow();
        function WhetherStartusingConsumptionMarketShow() {
            if (g_WhetherStartusingConsumptionMarket) {
                if (!$(".swtith[data-name='WhetherStartusingConsumptionMarket']").is(".open"))
                    $(".swtith[data-name='WhetherStartusingConsumptionMarket']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='WhetherStartusingConsumptionMarket']").is(".open"))
                    $(".swtith[data-name='WhetherStartusingConsumptionMarket']").toggleClass('open');
            }
        }

        $("#zeroInventorySales").click(function () {
            g_ZeroInventorySalesQ = !g_ZeroInventorySalesQ;
            var svUserConfigdetailId;
            var svDetailValue;
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("ZeroInventorySales", "ZeroInventorySales");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
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
                "sv_detail_is_enable": g_ZeroInventorySalesQ,
                "sv_user_configdetail_name": "是否允许零库存销售",
                "sv_remark": "是否允许零库存销售"
            };
            detaillist.push(data);

            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=ZeroInventorySales',
                    detaillist, function (result) {
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
            zeroInventorySalesSwitchShow();
        });


        $(document).off("click");
        //开关按钮事件
        $(document).on("click", ".swtith.xiaosouswtith i", function () {
            $(this).parents('.swtith').toggleClass('open');

            $.post("/System/updateUserinfo", { name: $(this).parents('.swtith').data("name"), key: "whether", valu: $(this).parents('.swtith').is(".open") }, function (data) {
                if (data == true) {
                    layer.msg("保存成功，请继续操作！");
                }
                else if (data == -2) {
                    layer.msg("你没有该操作权限！");
                }
                else {
                    layer.msg("操作失败，请稍后重试！");
                }
            });

            if ($(this).parents('.swtith').is(".open")) {
                $(".swtith[data-name='" + $(this).parents('.swtith').data("name") + "']").parent().next().find("input").removeAttr("readonly", "readonly");
                $(".swtith[data-name='" + $(this).parents('.swtith').data("name") + "']").parent().next().find(".kkbtn").removeClass("disabled");
            } else {
                $(".swtith[data-name='" + $(this).parents('.swtith').data("name") + "']").parent().next().find("input").attr("readonly", "readonly");
                $(".swtith[data-name='" + $(this).parents('.swtith').data("name") + "']").parent().next().find(".kkbtn").addClass("disabled");
            }

        });

        //    $("[data-toggle='popover']").popover();

    },
    sjchulli: function () {
        $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=DataManage', function (data) {
            if (isNullOrWhiteSpace(data)) {
                window.location.href = data;
            }
        });
        $(document).unbind("click", '.uikslx').on("click", '.uikslx', function () {

            $(this).toggleClass('on');
        });


        $(document).on("click", '#queqinchu', function () {

            $("#progress_clear_userdata").attr("aria-valuenow", "45");
            var numberHtml = '<div class="row" style="padding:20px 20px 0 20px;margin: 0;line-height:30px;"><span>验证方式 : </span><span id="phonenumber"></span></div>';
            numberHtml += '<div class="row" style="padding:20px;margin: 0;"><div class="col-xs-8" style="padding: 0;"><input type="text" class="form-control" name="" id="numberVal" value="" placeholder="请输入验证码"/></div><div class="col-xs-4" style="padding: 0 0 0 15px;"><button class="btn" style="background-color:#ff6666;color:#fff;width:96px;" id="determinesendnumber">发送验证码</button></div></div><footer class="determinebtn-closebtn" style="padding:15px 20px 0 20px;"><div class="btnbox fr"><button type="button" class="btn btn-success review-btn" id="initialization">确定</button><button type="button" class="btn btn-default" onclick="layer.closeAll()">取消</button></div></footer>';

            layer.confirm("初始化店铺数据将无法恢复，确认初始化？", { btn: ["确认", "取消"] }, function () {
                var str = "";
                $(".uikslx.on").each(function () { str += $(this).data("id") + ","; });

                if (str == "") {
                    layer.msg("请选择要清除的对象");
                    return false;
                } else {
                    //$.ajax({
                    //    type: "GET",
                    //    url: "/AjaxUser/GetIsAdmin",
                    //    dataType: "json",
                    //    success: function (data) {
                    //        if (true) {//data == null
                    //        } else {
                    //            layer.alert("没有权限初始化，请联系总店管理员");
                    //            return false;
                    //        }
                    //    }
                    //});
                }



                $.getJSON("/system/Getprint", function (data) {
                    layer.open({
                        type: 1,
                        title: "验证密保信息",
                        area: ['350px', '230px'],
                        content: numberHtml,
                        success: function (index) {
                            if (data.user.sv_ul_mobile) {
                                var phonenumber_sv_ul_mobile = data.user.sv_ul_mobile;
                                var sub_phonenumber_sv_ul_mobile = phonenumber_sv_ul_mobile.substr(2, 6);
                                $("#phonenumber").text("密保手机" + phonenumber_sv_ul_mobile.replace(sub_phonenumber_sv_ul_mobile, "******"))
                            }
                            //发送验证码
                            $(document).unbind("click", "#determinesendnumber").on("click", "#determinesendnumber", function () {
                                $.post('http://api.decerp.cc/system/ResendInitializationDataCode?moble=' + data.user.sv_ul_mobile, function (data) {
                                    if (data) {
                                        disableButton("determinesendnumber");
                                        var timesCounts = 60;
                                        var sendMsmTime = setInterval(function () {
                                            if (timesCounts <= 0) {
                                                $("#determinesendnumber").text("发送验证码");
                                                enabledButton("determinesendnumber");
                                                clearInterval(sendMsmTime);
                                            } else {
                                                timesCounts -= 1;
                                                $("#determinesendnumber").text(timesCounts + "秒");
                                            }
                                        }, 1000);
                                    }
                                });
                            });

                            //确定初始化
                            $(document).unbind("click", "#initialization").on("click", "#initialization", function () {
                                var value_number = $("#numberVal").val();
                                if (value_number) {
                                    systemPwd2(value_number, data.user.sv_ul_mobile);
                                } else {
                                    layer.msg("请输入验证码");
                                }
                            });
                        }
                    })


                    //发送短信=======start=====//
                    //$.post('http://api.decerp.cc/system/ResendVerificationCode?moble=' +
                    //    data.user.sv_ul_mobile,
                    //    function() { });
                    //layer.prompt({
                    //    title: '请输入验证码',
                    //    formType: 1,
                    //    cancel: function(index) {
                    //    }
                    //},
                    //    function(value, index, elem) {
                    //        systemPwd2(value, data.user.sv_ul_mobile);
                    //    });

                    //=======end==========//
                });

            });

        });

    },
    // 打印设置
    dayin: function () {

        $("[data-toggle='popover']").popover();
        $("#styerigbox").on("click", ".stecs", function () {
            if (this.id == "product") {
                $(".integral").each(function () {
                    var _hid = "#" + $(this).attr("id");
                    $(this).removeClass("on");
                    $(_hid + "_html").css("display", "none");
                });
                if (!$(this).hasClass('on')) {
                    $("." + this.id).each(function () {
                        $(this).toggleClass("on");
                        var _hid = "#" + $(this).attr("id");
                        $(_hid + "_html").css("display", "table-cell");

                    });
                } else {
                    $("." + this.id).each(function () {
                        var _hid = "#" + $(this).attr("id");
                        $(this).removeClass("on");
                        $(_hid + "_html").css("display", "none");
                    });
                }
            } else if (this.id == "integral") {
                $(".product").each(function () {
                    var _hid = "#" + $(this).attr("id");
                    $(this).removeClass("on");
                    $(_hid + "_html").css("display", "none");
                });
                if (!$(this).hasClass('on')) {

                    $("." + this.id).each(function () {
                        var _hid = "#" + $(this).attr("id");
                        $(this).toggleClass("on");
                        $(_hid + "_html").css("display", "table-cell");
                    });
                } else {
                    $("." + this.id).each(function () {
                        var _hid = "#" + $(this).attr("id");
                        $(this).removeClass("on");
                        $(_hid + "_html").css("display", "none");
                    });
                }
            } else if ($(this).data("strtype") != "product_integral") {
                $(this).toggleClass("on").siblings().removeClass("on");
            }


        });

        $.getJSON("/system/GetUserPage", function (data) {
            var json = JSON.parse(data.sv_uc_dayin);

            $("[data-name='" + json.xiaopiao + "']").click();
            if (json.xianzhe) {
                $("#tan").click();
            }

            if (json.yl) {
                $("#xian").click();
            }
            // mypring.PREVIEW();
            $(".SytemtabUI ul>li").eq((json.mo - 1)).addClass("active").click();

        });

        $("#yinlan").click(function () {
            //  mypring.PREVIEW("/home/printview/" + $(".SytemtabUI ul>li.active").data("id"));
            //读取配置
            $.getJSON("/system/Getprint", function (data) {
                Cef.openMyPc("{}", JSON.stringify(data), 1, $(".SytemtabUI ul>li.active").data("id"), '' + receptionPtNum + '', receptionPtName);
            });
        });


        $(".SytemtabUI ul>li").click(function () {
            if ($(this).data("id") == 4) {
                $(".printui .ritianshu:eq(0) .stecs:eq(2)").css("display", "inline-block");
                $.getJSON("/system/Getprint", function (data) {
                    //显示自定义选项
                    $(".print_custorm_head").each(function (i, m) {
                        //绑定各项的值
                        $(m).css("display", "normal");
                    });
                    //绑定
                    var configData = JSON.parse(data.cof.sv_pfconfig);
                    if (configData) {
                        var h_config = ''; //读取"0,0,0,0,0,0,0"的开关配置
                        if (configData && configData.h && configData.h.split(',')) {
                            h_config = configData.h.split(',');
                        }
                        var t_config = '';
                        if (!t_config) {
                            t_config = configData.b.split(',');
                        }
                        //var b_config = pfData.prlist;
                        var f_config = '';
                        if (!f_config) {
                            f_config = configData.f.split(',');
                        }
                        var q_config = configData.q;
                        var l_config = configData.l;

                        //$($(".print_custorm_head")[0]).
                        for (var i = 0; i < h_config.length; i++) {
                            var _tempId = "#print_custorm_1";
                            if (i > 9) _tempId = _tempId + i;
                            else _tempId = _tempId + "0" + i;
                            if (h_config[i] == 1) {
                                $(_tempId).addClass("on");
                            } else {
                                $(_tempId).removeClass("on");
                                $(_tempId + "_html").css("display", "none");
                            }
                        }
                        for (var i = 0; i < t_config.length; i++) {
                            var _tempId = "#print_custorm_2";
                            if (i > 8) _tempId = _tempId + i;
                            else _tempId = _tempId + "0" + i;
                            if (t_config[i] == 1) {
                                if ($(_tempId).data("statetype") == "integral") {
                                    $("." + $(_tempId).data("statetype")).addClass("on");
                                    $(".product").removeClass("on");
                                } else if ($(_tempId).data("statetype") == "product") {
                                    $("." + $(_tempId).data("statetype")).addClass("on");
                                    $(".integral").removeClass("on");
                                }
                                $(_tempId).addClass("on");
                                $(_tempId + "_html").css("display", "table-cell");
                            }
                            else {
                                $(_tempId).removeClass("on");
                                $(_tempId + "_html").css("display", "none");
                                $(_tempId + "_value").css("display", "none");
                            }
                        }

                        for (var i = 0; i < f_config.length; i++) {
                            var _tempId = "#print_custorm_3";
                            if (i > 14) _tempId = _tempId + i;
                            else _tempId = _tempId + "0" + i;
                            if (f_config[i] == 1) {
                                $(_tempId).addClass("on");
                                if (i == 11) {
                                    $(_tempId + "_html_txt").html(data.user.address);//地址信息
                                } else if (i == 12 || i == 9) {
                                    //销售时间
                                    $(_tempId + "_html_txt").html((new Date()).Format("yyyy.MM.dd hh:mm:ss"));
                                } else if (i == 10) {//电话
                                    $(_tempId + "_html_txt").html(data.user.sv_ul_mobile);
                                }
                            }
                            else {
                                $(_tempId).removeClass("on");
                                $(_tempId + "_html").css("display", "none");
                            }

                        }

                        if (q_config) {
                            $("#print_custorm_401").addClass("on");
                            if (q_config.ImageString) {
                                $("#print_custorm_401_html img").attr('src', q_config.ImageString);
                            }

                        } else {
                            $("#print_custorm_401").removeClass("on");
                            $("#print_custorm_401_html").css("display", "none");
                            $("#print_custorm_401_img").css("display", "none");
                        }
                        if (l_config) {
                            $("#print_custorm_400").addClass("on");
                            //绑定店铺图片
                            $("#print_custorm_400_html img").attr('src', l_config.ImageString);

                        } else {
                            $("#print_custorm_400").removeClass("on");
                            $("#print_custorm_400_html").css("display", "none");
                        }
                    }
                });
            } else {
                //隐藏自定义选项     
                $(".printui .ritianshu:eq(0) .stecs:eq(2)").css("display", "none");
                $(".print_custorm_head").each(function (i, m) {
                    $(m).css("display", "none");
                });
            }
            if ($(this).data("id") != 5) {
                $(this).addClass("active").siblings().removeClass("active");
                $("#mobi" + $(this).data("id")).show().siblings().hide();
                $(".printui").show();
                $(".msanbottom").show();
                $(".PrintShow").show();
                $(".lableprintphoto").hide();
                $(".lableprintfooter").hide();
            } else {
                $(this).addClass("active").siblings().removeClass("active");
                $("#mobi" + $(this).data("id")).show().siblings().hide();
                $(".printui").hide();
                $(".msanbottom").hide();
                $(".PrintShow").hide();
                $(".lableprintphoto").show();
                $(".lableprintfooter").show();

                //点击分类
                $(document).on("click", ".bigclassificationa", function () {
                    $(this).parent().toggleClass('active').siblings().removeClass('active');
                    $(this).children(".selectPiece").addClass("active");
                    if ($(this).parents('li').hasClass('active')) {
                        $(this).siblings('ul').slideDown(250);
                        $(this).parents('li').siblings().children('ul').slideUp(250);
                        $(this).parents('li').siblings().children('a').children('.selectPiece').removeClass("active");
                    } else {
                        $(this).siblings('ul').slideUp(250);
                    }
                });
            }

            // 打印机设置
            if ($(this).data("id") == 6) {
                $('.system_Dyingbox').css("display", "none");
                $('#print_set_all').css("display", "none");
                $(".kitchenPrinting").css("display", "none");
                $('.printSet').css("display", "block");
                try {
                    var printSet_network_device = Cef.GetLocalPrinters();
                    if (printSet_network_device != null && printSet_network_device != '') {
                        var printSet_network_device_json = JSON.parse(printSet_network_device);
                        var printSet_network_device_Html = '';
                        for (var i = 0; i < printSet_network_device_json.length; i++) {
                            printSet_network_device_Html += ' <option value="' + printSet_network_device_json[i] + '">' + printSet_network_device_json[i] + '</option>';
                        }
                    }
                    $('#PrintSet_network_device').html(printSet_network_device_Html);
                    $('#PrintSet_default_device').html(printSet_network_device_Html);
                }
                catch (e) {
                    disableButton('btnTestPrintSet');
                }
                getPrintSetingInfo(); // 读取打印机配置
            } else if ($(this).data("id") == 7) {
                $('.system_Dyingbox').css("display", "none");
                $('#print_set_all').css("display", "none");
                $('.printSet').css("display", "none");
                $(".kitchenPrinting").css("display", "block");
            }
            else {
                $('.system_Dyingbox').css("display", "block");
                $('.printSet').css("display", "none");
                $('#print_set_all').css("display", "block");
            }
        });

        $("#baochunmoban").click(function () {
            var yl = false, xianzhe = false, xiaopiao = "";
            if ($("#xian").hasClass("on")) {
                yl = true;
            }
            if ($("#tan").hasClass("on")) {
                xianzhe = true;
            }

            if ($("[data-name='58']").hasClass("on")) {
                xiaopiao = 58;
            } else if ($("[data-name='80']").hasClass("on")) {
                xiaopiao = 80;
            } else if ($("[data-name='210']").hasClass("on")) {
                xiaopiao = 210;
            } else {
                xiaopiao = 58;
            }

            layer.load();
            if ($(".SytemtabUI li.active").attr("data-id") == 4) {
                //权限验证
                //if (Is_verify_store_version) {
                $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                    if (isNullOrWhiteSpace(data)) {
                        window.location.href = data;
                    } else {
                        var cdata = {
                            "h": "",
                            "b": "",
                            "t": "",
                            "f": "",
                            "l": null,
                            "q": {
                                "ImageString": "",
                                "Width": 100,
                                "Height": 100,
                                "Align": 1
                            },
                            "p": 0,
                            "a": 1
                        };
                        var temp = "";
                        for (var i = 0; i < 8; i++) {
                            var _tempId = "#print_custorm_1";
                            if (i > 9) _tempId = _tempId + i;
                            else _tempId = _tempId + "0" + i;
                            if ($(_tempId).hasClass("on")) {
                                temp += "1" + ",";
                            } else {
                                temp += "0" + ",";
                            }
                        }
                        cdata.h = temp.substring(0, temp.length - 1);

                        temp = "";
                        for (var i = 0; i < 9; i++) {
                            var _tempId = "#print_custorm_2";
                            if (i > 9) _tempId = _tempId + i;
                            else _tempId = _tempId + "0" + i;
                            if ($(_tempId).hasClass("on")) {
                                temp += "1" + ",";
                            } else {
                                temp += "0" + ",";
                            }
                        }
                        cdata.b = temp.substring(0, temp.length - 1);

                        temp = "";
                        for (var i = 0; i < 13; i++) {
                            var _tempId = "#print_custorm_3";
                            if (i > 9) _tempId = _tempId + i;
                            else _tempId = _tempId + "0" + i;
                            if ($(_tempId).hasClass("on")) {
                                temp += "1" + ",";
                            } else {
                                temp += "0" + ",";
                            }
                        }
                        cdata.f = temp.substring(0, temp.length - 1);

                        //店铺图片
                        if ($("#print_custorm_400").hasClass("on") && $("#print_custorm_400_html img").attr('src')) {
                            cdata.l = { "ImageString": $("#print_custorm_400_html img").attr('src').replace('data:image/png;base64,', '').replace('data:image/jpg;base64,', ''), "Width": 50, "Height": 50, "Align": 1 };
                        } else {
                            cdata.l = null;
                        }
                        //二维码
                        if ($("#print_custorm_401").hasClass("on")) {
                            cdata.q = { "ImageString": "", "Width": 100, "Height": 100, "Align": 1 };
                        } else {
                            cdata.q = null;
                        }
                        $.post("/system/updatedayin2", { mo: $(".SytemtabUI ul>li.active").data("id"), yl: yl, bili: $("#bili").val(), xianzhe: xianzhe, xiaopiao: xiaopiao, config: JSON.stringify(cdata) }, function (data) {
                            layer.closeAll();
                            loggin.chklogn(data);
                            if (data == true) {
                                layer.msg("模板设置成功");
                                //----保存打印扩展配置
                                if ($("#cus_print_extra_info").val()) {
                                    $.post("/UserModuleConfig/ConfigdetailUpSetting", { user_config_code: "PrintSet_ExtraInfo", config_value: $("#cus_print_extra_info").val() }, function (data) {
                                        PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_ExtraInfo");
                                        if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0) {
                                            Preferential_TopUpGiving_ConfigList[0].sv_detail_value = $("#cus_print_extra_info").val();
                                        }
                                    });
                                }
                            }
                            else if (data == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("模板设置失败");
                            }
                        });
                    }
                });
                //}
            } else {
                $.post("/system/updatedayin", { mo: $(".SytemtabUI ul>li.active").data("id"), yl: yl, bili: $("#bili").val(), xianzhe: xianzhe, xiaopiao: xiaopiao }, function (data) {
                    layer.closeAll();
                    loggin.chklogn(data);
                    if (data == true) {
                        layer.msg("模板设置成功");
                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        layer.msg("模板设置失败");
                    }
                });
            }
        });
        if (is_open_print != null && is_open_print.split("@").length >= 1) {
            $("#PrintReceipts").val(is_open_print.split("@")[0]);
            if (Boolean(parseInt(is_open_print.split("@")[1]))) {
                $(".PrintReceipts").addClass("open")
            } else {
                $(".PrintReceipts").removeClass("open");
            }
        }

        var c_ = typeof Cef;
        if (c_ == "undefined") {
            //disableButton('btnSavePrintSet');
        }

        // 保存打印设置
        $(document).on('click', '#btnSavePrintSet', function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    savePrintSet();
                }
            });
        });

        // 测试打印
        $(document).on('click', '#btnTestPrintSet', function () {
            try {
                if ($('#PrintSet_network_device').val() != null && $('#PrintSet_network_device').val() != '') {
                    var c_ = typeof Cef;
                    if (c_ !== "undefined") {
                        Cef.TestPrinter($('#PrintSet_network_device').val());
                    }
                }
                else {
                    layer.msg("请选择打印机");
                }
            }
            catch (e) {
                layer.msg("测试打印失败，请下载最新版客户端！");
            }
        });

        // 前台是否标签打印
        $('#PrintSet_network_device_font_islabel').click(function () {
            var printSet_default_device = $('#PrintSet_default_device').val();
            if (printSet_default_device != null && printSet_default_device != '' && printSet_default_device != undefined) {
                var data = {
                    "sv_user_configdetail_id": parseInt($(this).attr('data-id')),
                    "sv_detail_value": printSet_default_device,
                    "sv_user_config_id": parseInt($(this).attr("data-configid")),
                    "sv_user_module_id": parseInt($(this).attr("data-moduleid")),
                    "sv_detail_is_enable": $(this).hasClass('on') == true ? false : true,
                    "sv_user_configdetail_name": $(this).attr('data-name'),
                    "sv_remark": "前台标签打印机设置"
                };
                var list = [];
                list.push(data);
                saveBackSelectLabel(list);
            }
            else {
                layer.msg("请选择设备打印机");
            }
        });

        // 后台是否标签打印
        $('#PrintSet_network_device_back_islabel').click(function () {
            var printSet_network_device = $('#PrintSet_network_device').val();
            if (printSet_network_device != null && printSet_network_device != '' && printSet_network_device != undefined) {
                var data = {
                    "sv_user_configdetail_id": parseInt($(this).attr('data-id')),
                    "sv_detail_value": printSet_network_device,
                    "sv_user_config_id": parseInt($(this).attr("data-configid")),
                    "sv_user_module_id": parseInt($(this).attr("data-moduleid")),
                    "sv_detail_is_enable": $(this).hasClass('on') == true ? false : true,
                    "sv_user_configdetail_name": $(this).attr('data-name'),
                    "sv_remark": "后台标签打印机设置"
                };
                var list = [];
                list.push(data);
                saveBackSelectLabel(list);
            }
            else {
                layer.msg("请选择设备打印机");
            }
        });

        // 开启后台打印份数设置
        $(document).on('click', '.PrintSet_network_enable', function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    printSetEnable($('.PrintSet_network_enable').attr('data-moduleId'), $('.PrintSet_network_enable').attr('data-configId'), $('.PrintSet_network_enable').hasClass('open'), 'network');
                }
            });
        });
    },
    weixin: function () {


        $.getJSON("/system/GetUserLogin", function (data) {

            if (data.weixin_openid != "" && data.weixin_openid != null) {
                $("#wangcheng").show().prev().hide();

            } else {

                $("#wangcheng").hide().prev().show();
            }


        });

        $("#yzweixin").click(function () {

            if ($("#wxyzma").val().length < 4) {
                layer.msg("请输入正确的验证码！~");
            } else {

                $.post("/System/BindWeiXin?yzm=" + $("#wxyzma").val(), function (data) {

                    if (data == null) {
                        layer.msg("BOOS您的验证不正确啊！");
                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                    }
                    else {

                        $("#wangcheng").show().prev().hide();
                    }

                });

            }



        });



        $("#qixiao").click(function () {
            if (confirm("您确认要取消微信的绑定吗？一但取消不能再用微信查账了！")) {


                $.post("/System/QBindWeiXin", function (data) {
                    if (data == -2) {
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        $("#wangcheng").show().prev().hide();
                    }
                });

            }
        });

    },  // 硬件设置
    setHardware: function () {
        //设置IC硬件设置开关
        $(document).unbind("click", ".setTardware i").on("click", ".setTardware i", function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    var values = $('.setTardware').hasClass('open') == true ? false : true;
                    $.postAsyncJson('/UserModuleConfig/ConfigdetailSetHardwareOperate', {
                        valu: values
                    }, function (result) {
                        if (result == true) {
                            if (values) {
                                $('#show_setTardware').css('display', 'block');
                                getUserModuleConfigList();
                                if ($('#SetTardware_port').attr('data-id') == "0") {
                                    saveSetHardware();
                                }
                                $('.setTardware').addClass('open');
                            }
                            else {
                                $('#show_setTardware').css('display', 'none');
                                $('.setTardware').removeClass('open');
                            }
                        }
                        else {
                            layer.msg('设置失败！');
                        }
                    });
                }
            });
        });

        getUserModuleConfigList();

        // 保存IC硬件设置
        $('#btnSaveSetHardware').click(function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    saveSetHardware();
                }
            });
        });

        // 初始化IC卡
        $(document).on("click", "#btnInitialization", function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    try {
                        if (_g_is_ic_type == 1) {
                            var data = Cef.ReadICCardNoWithPwd(_g_is_ic_pwd, true);
                            if (data.indexOf('设备') >= 0) {
                                layer.msg("读卡失败：" + data);
                            } else {
                                var result = JSON.parse(data);
                                if (result) {
                                    if (result.Success || result.Success == "true" || result.Success == "True") {
                                        var str_f = '';
                                        for (var i = 0; i < result.Message.length; i++) {
                                            str_f += 'f';
                                        }
                                        var initialization = Cef.WriteICCardNoWithPwd(str_f, "ffffff");
                                        if (initialization) {
                                        var result_initialization = JSON.parse(initialization);
                                        if (result_initialization) {
                                            if (result_initialization.Success || result_initialization.Success == "true" || result_initialization.Success == "True") {
                                                layer.msg("IC卡初始化成功！");
                                                return true;
                                            } else {
                                                layer.msg("IC卡初始化失败：" + result_initialization.Message);
                                                return false;
                                            }
                                        }
                                        }
                                    } else {
                                        layer.msg("读卡失败：" + result.Message);
                                    }
                                }
                            }
                        } else if (_g_is_ic_type == 0) {
                            //明华330 M1卡初始化
                            var initialization = Cef.URFResetICCard(_g_is_ic_pwd);
                            if (initialization)
                            {
                                var result_initialization = JSON.parse(initialization);
                                if (result_initialization)
                                {
                                    if (result_initialization.Success || result_initialization.Success == "true" || result_initialization.Success == "True")
                                    {
                                        layer.msg("IC卡初始化成功！");
                                        return true;
                                    } else
                                    {
                                        layer.msg("IC卡初始化失败：" + result_initialization.Message);
                                        return false;
                                    }
                                }
                            }
                        }

                    }
                    catch (e) {
                        layer.msg("IC卡初始化失败");
                    }
                }
            })
        });

        // 测试IC卡
        $(document).on("click", "#btnTestICCard", function () {
            try {
                var data = { Success: false };
                if (_g_is_ic_type == 1) {
                    data = Cef.CheckICDevice();
                } else if (_g_is_ic_type == 0) {
                    data = Cef.URFCheckICDevice();
                }
                var result_IC = JSON.parse(data);
                if (result_IC.Success || result_IC.Success == "true" || result_IC.Success == "True") {
                    layer.msg("设备测试连接成功！");
                }
                else {
                    layer.msg("设备测试连接失败！");
                }
            }
            catch (e) {
                layer.msg("设备测试连接失败！");
            }
        });
        //---======================客显==========--------------
        // 客显 设置客显硬件设置开关
        $(document).unbind("click", ".setHardwareCusDisplay i").on("click", ".setHardwareCusDisplay i", function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    var values = $('.setHardwareCusDisplay').hasClass('open') == true ? false : true;
                    $.postAsyncJson('/UserModuleConfig/ConfigdetailSetHardwareOperates', {
                        valu: values, muid: 7
                    }, function (result) {
                        if (result == true) {
                            if (values) {
                                $('#show_setHardwareCusDisplay').css('display', 'block');
                                getUserModuleConfigList_CusDisplay();
                                if ($('#show_setHardwareCusDisplay_port').attr('data-id') == "0") {
                                    saveSetHardware_CusDisplay();
                                }
                                $('.setHardwareCusDisplay').addClass('open');
                            }
                            else {
                                $('#show_setHardwareCusDisplay').css('display', 'none');
                                $('.setHardwareCusDisplay').removeClass('open');
                            }
                        }
                        else {
                            layer.msg('设置失败！');
                        }
                    });
                }
            });
        });

        getUserModuleConfigList_CusDisplay();
        // 客显--------------端口读取
        if (((typeof Cef) !== 'undefined')) {
            var comlist = Cef.GetComList();
            if (comlist) {
                $("#Set_Hardware_CusDisplay_Port").empty();
                var comlistModel = JSON.parse(comlist);
                if (comlistModel && comlistModel.length > 0) {
                    for (var j = 0; j < comlistModel.length; j++) {
                        $("#Set_Hardware_CusDisplay_Port")
                            .append(' <option value="' + comlistModel[j] + '">' + comlistModel[j] + '</option>');
                    }
                }
            }
        } else {

        }
        // 客显--------------启用客显硬件设置
        $('#setHardwareCusDisplay').click(function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    saveSetHardware_CusDisplay();
                }
            });
        });

        // 保存客显硬件设置
        $('#btn_setHardwareCusDisplay_save').click(function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    saveSetHardware_CusDisplay();
                }
            });
        });

        $("#show_setHardwareCusDisplay_demo_price").on("click", function () {
            if (((typeof Cef) !== 'undefined') &&
                $("#Set_Hardware_CusDisplay_Port").val() &&
                $("#Set_Hardware_CusDisplay_Baud").val()) {
                //客显 显示价格
                Cef.CustomerDisplay($("#Set_Hardware_CusDisplay_Port").val(),
                    parseInt($("#Set_Hardware_CusDisplay_Baud").val()),
                    "One",
                    8,
                    1,
                    $("#show_setHardwareCusDisplay_demo_price_value").val());
            }
        });
        $("#show_setHardwareCusDisplay_demo_total").on("click", function () {
            //客显 显示合计
            if (((typeof Cef) !== 'undefined') &&
                $("#Set_Hardware_CusDisplay_Port").val() &&
                $("#Set_Hardware_CusDisplay_Baud").val()) {
                Cef.CustomerDisplay($("#Set_Hardware_CusDisplay_Port").val(),
                    parseInt($("#Set_Hardware_CusDisplay_Baud").val()),
                    "One",
                    8,
                    2,
                    $("#show_setHardwareCusDisplay_demo_total_value").val());
            }
        });
        $("#show_setHardwareCusDisplay_demo_receive").on("click", function () {
            if (((typeof Cef) !== 'undefined') &&
                $("#Set_Hardware_CusDisplay_Port").val() &&
                $("#Set_Hardware_CusDisplay_Baud").val()) {
                //客显 显示收款
                Cef.CustomerDisplay($("#Set_Hardware_CusDisplay_Port").val(),
                    parseInt($("#Set_Hardware_CusDisplay_Baud").val()),
                    "One",
                    8,
                    3,
                    $("#show_setHardwareCusDisplay_demo_receive_value").val());

            }
        });
        $("#show_setHardwareCusDisplay_demo_change").on("click", function () {
            if (((typeof Cef) !== 'undefined') &&
                $("#Set_Hardware_CusDisplay_Port").val() &&
                $("#Set_Hardware_CusDisplay_Baud").val()) {
                //客显 显示找零
                Cef.CustomerDisplay($("#Set_Hardware_CusDisplay_Port").val(),
                    parseInt($("#Set_Hardware_CusDisplay_Baud").val()),
                    "One",
                    8,
                    4,
                    $("#show_setHardwareCusDisplay_demo_change_value").val());

            }
        });
        //---======================电子秤==========--------------
        // 电子秤 设置电子秤硬件设置开关
        getUserModuleConfigList_Scale();
        $(document).unbind("click", ".Set_Hareware_Scale i").on("click", ".Set_Hareware_Scale i", function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    var values = $('.Set_Hareware_Scale').hasClass('open') == true ? false : true;
                    $.postAsyncJson('/UserModuleConfig/ConfigdetailSetHardwareOperates', {
                        valu: values, muid: 9
                    }, function (result) {
                        if (result == true) {
                            if (values) {
                                $('#show_Set_Hareware_Scale').css('display', 'block');
                                getUserModuleConfigList_Scale();
                                if ($('#show_Set_Hareware_Scale_port').attr('data-id') == "0") {
                                    saveSetHardware_Scale();
                                }
                                $('.Set_Hareware_Scale').addClass('open');
                            }
                            else {
                                $('#show_Set_Hareware_Scale').css('display', 'none');
                                $('.Set_Hareware_Scale').removeClass('open');
                            }
                        }
                        else {
                            layer.msg('设置失败！');
                        }
                    });
                }
            });
        });

        // 保存客显硬件设置
        $('#btn_setHardwareScale_save').click(function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    saveSetHardware_Scale();
                }
            });
        });
        //电子秤--------------端口读取
        if (((typeof Cef) !== 'undefined')) {
            var comlist = Cef.GetComList();
            if (comlist) {
                $("#Set_Hareware_Scale_Port").empty();
                var comlistModel = JSON.parse(comlist);
                if (comlistModel && comlistModel.length > 0) {
                    for (var j = 0; j < comlistModel.length; j++) {
                        $("#Set_Hareware_Scale_Port").append(' <option value="' + comlistModel[j] + '">' + comlistModel[j] + '</option>');
                    }
                }
            }
        }

        //自动确认开关
        $(".WeighingStableAutomaticDetermine").click(function () {
            WeighingStableAutomaticDetermine = !WeighingStableAutomaticDetermine;
            var svUserConfigdetailId;
            var svDetailValue;
            var svUserConfigId;
            var svUserModuleId;
            PreferentialTopUpGivingConfigList("WeighingStableAutomaticDetermine", "WeighingStableAutomaticDetermine");
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
                "sv_detail_is_enable": WeighingStableAutomaticDetermine,
                "sv_user_configdetail_name": "称重稳定后是否自动确定",
                "sv_remark": "称重稳定后是否自动确定"
            };
            detaillist.push(data);

            $.postAsyncContentJson('/UserModuleConfig/SaveConfigdetailList?moduleCode=succession',
                    detaillist, function (result) {
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

            WeighingStableAutomaticDetermineShow();

        });

        WeighingStableAutomaticDetermineShow();
        function WeighingStableAutomaticDetermineShow() {
            if (WeighingStableAutomaticDetermine) {
                if (!$(".swtith[data-name='WeighingStableAutomaticDetermine']").is(".open"))
                    $(".swtith[data-name='WeighingStableAutomaticDetermine']").toggleClass('open');
            }
            else {
                if ($(".swtith[data-name='WeighingStableAutomaticDetermine']").is(".open"))
                    $(".swtith[data-name='WeighingStableAutomaticDetermine']").toggleClass('open');
            }
        }


        //电子秤----------Set_Hareware_Scale_demo，测试称重
        $("#Set_Hareware_Scale_demo").on("click", function () {

            if ($("#Set_Hareware_Scale_Port").val() &&
                $("#Set_Hareware_Scale_Baud").val() &&
                (typeof Cef) !== 'undefined') {
                var demo_weight = "";
                var timer1 = setInterval(function () {
                    try {
                        if ($("#Set_Hareware_Scale_Type").val() == 1) {
                            //大华电子秤
                            demo_weight = Cef.DHGetWeight($("#Set_Hareware_Scale_Port").val(), parseInt($("#Set_Hareware_Scale_Baud").val()));
                            if (demo_weight)
                            {
                                
                                if (!$("#Set_Hareware_Scale_demo_value") || $("#Set_Hareware_Scale_demo_value").length == 0) {
                                    clearInterval(timer1);
                                }
                                //大华电子秤
                                var weightModel = demo_weight;
                                if (weightModel) {

                                    weightModel = weightModel.trim();
                                    var weightModelLines = weightModel.split(' ');
                                    if (weightModelLines && weightModelLines.length > 0)
                                    {
                                        var weightData = parseInt(weightModelLines[weightModelLines.length - 1]) / 1000;
                                        $("#Set_Hareware_Scale_demo_value").val(weightData);
                                        if (!isRealNum(weightData))
                                        {
                                            layer.msg("大华电子秤：read=" + demo_weight);
                                        }
                                    }
                                }
                            }
                        } else {
                            //顶尖电子秤
                            demo_weight = Cef.GetWeight($("#Set_Hareware_Scale_Port").val(), parseInt($("#Set_Hareware_Scale_Baud").val()));

                            if (demo_weight)
                            {
                                if (!$("#Set_Hareware_Scale_demo_value") || $("#Set_Hareware_Scale_demo_value").length == 0) {
                                    clearInterval(timer1);
                                }
                                //顶尖电子秤
                                var weightModel = JSON.parse(demo_weight);
                                $("#Set_Hareware_Scale_demo_value").val(weightModel.Weight);
                                if (!isRealNum(weightModel.Weight))
                                {
                                    layer.msg("顶尖电子秤：read=" + demo_weight);
                                }
                            }
                        }

                    } catch (e) {
                        clearInterval(timer1);
                        alert(e.message + "," + demo_weight);
                    }
                },
                    500);
            }
        });

        //---======================分屏设置==========--------------

        getUserModuleConfigList_SecondScreen();
        $(document).unbind("click", ".Set_Hardware_SecondScreen i").on("click", ".Set_Hardware_SecondScreen i", function () {
            var loadingIndex = commonOpenLoading();

            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {

                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    var values = $('.Set_Hardware_SecondScreen').hasClass('open') == true ? false : true;
                    $.postAsyncJson('/UserModuleConfig/ConfigdetailSetHardwareOperates', {
                        valu: values, muid: 8
                    }, function (result) {
                        if (result == true) {
                            if (values) {
                                $('#show_Set_Hardware_SecondScreen').css('display', 'block');
                                //getUserModuleConfigList_Scale();
                                getUserModuleConfigList_SecondScreen();
                                if ($('#show_Set_Hardware_SecondScreen').attr('data-id') == "0") {
                                    //saveSetHardware_Scale();
                                    saveSetHardware_SecondScreen();
                                }
                                $('.Set_Hardware_SecondScreen').addClass('open');
                            }
                            else {
                                $('#show_Set_Hardware_SecondScreen').css('display', 'none');
                                $('.Set_Hardware_SecondScreen').removeClass('open');
                            }
                        }
                        else {
                            layer.msg('设置失败！');
                        }
                        commonCloseLoading(loadingIndex);
                    });
                }
            });
        });

        // 保存分屏硬件设置（图片路径）
        $('#btn_Set_Hardware_SecondScreen_save').click(function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    //saveSetHardware_CusDisplay();
                    saveSetHardware_SecondScreen();
                }
            });
        });

        //---======================安卓硬件设置==========--------------

        getUserModuleConfigList_T1SecondScreen();
        //分屏是否启用按钮
        $(document).unbind("click", ".Set_Pos_T1_SecondScreen_Enable i").on("click", ".Set_Pos_T1_SecondScreen_Enable i", function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    var values = $('.Set_Pos_T1_SecondScreen_Enable').hasClass('open') == true ? false : true;
                    $.postAsyncJson('/UserModuleConfig/ConfigdetailSetHardwareOperates', {
                        valu: values, muid: 17
                    }, function (result) {
                        if (result == true) {
                            var swtith_values = $('.Set_Pos_T1_SecondScreen_Enable').hasClass('open') == true ? false : true;
                            if (swtith_values) {
                                $(this).parent("span").addClass("open");
                                $("#androiddisplay").show(0);
                            } else {
                                $(this).parent("span").removeClass("open");
                                $("#androiddisplay").hide(0);
                            }

                            getUserModuleConfigList_T1SecondScreen();
                        }
                        else {
                            layer.msg('设置失败！');
                        }
                    });
                }
            });

        });

        //屏幕尺寸的选择7/14寸
        //7寸
        $(document).on("click", "#Set_Pos_T1_SecondScreen_Size0", function () {
            if ($(this).is(':checked')) {
                $(".displayblockphoto li").each(function (index, item) {
                    if ($('.displayblockphoto li:eq(' + index + ')').hasClass) {
                        $('.displayblockphoto li:eq(' + index + ')').removeClass("active");
                        $('.displayblockphoto li:eq(0)').addClass("active");
                    }
                });
                $("#uploadfileboxsunmi").hide();
                $(".displayblockphoto").children("li.siez14").hide();
                $(".displayblockphoto li:eq(0)").children().children("img").attr("src", "../../images/screenbg1.png");
            }
        });

        //14寸
        $(document).on("click", "#Set_Pos_T1_SecondScreen_Size1", function () {
            if ($(this).is(':checked')) {
                $(".displayblockphoto li").each(function (index, item) {
                    if ($('.displayblockphoto li:eq(' + index + ')').hasClass) {
                        $('.displayblockphoto li:eq(' + index + ')').removeClass("active");
                        $('.displayblockphoto li:eq(0)').addClass("active");
                    }
                });
                $(".displayblockphoto li:eq(0)").children().children("img").attr("src", "../../images/Size14.png");
                $(".displayblockphoto").children("li").show();
            }
        });

        //选择布局
        $(document).on("click", ".displayblockphoto>li", function () {
            var index = $(this).index();
            $(this).addClass("active").siblings("li").removeClass("active");
            if (index == 2) {
                $(".displayview").html('<span>上传图片</span><span>(已选布局3)</span><i type="button" class="tikxm icon-question-sign tips" data-content="说明：建议的图片大小为1024*600，上传二张或以上为幻灯片图片。" data-original-title="" title=""></i>');
                $("#uploadfileboxsunmi").show();
                $("#uploadfileboxvideo").hide();
            } else if (index == 3) {
                $("#uploadfileboxsunmi").show();
                $("#uploadfileboxvideo").hide();
                $(".displayview").html('<span>上传图片</span><span>(已选布局4)</span><i type="button" class="tikxm icon-question-sign tips" data-content="说明：建议的图片大小为1980*1080，上传二张或以上为幻灯片图片。" data-original-title="" title=""></i>');
            } else if (index == 4) {
                $(".displayview").html('<span>配置视频路径</span><span>(已选布局5)</span>');
                $("#uploadfileboxsunmi").hide();
                $("#uploadfileboxvideo").show();
            } else if (index == 5) {
                $(".displayview").html('<span>配置视频路径</span><span>(已选布局6)</span>');
                $("#uploadfileboxsunmi").hide();
                $("#uploadfileboxvideo").show();
            } else {
                $(".displayview").html('');
                $("#uploadfileboxsunmi").hide();
                $("#uploadfileboxvideo").hide();

            }
        });

        //删除安卓商米T1副屏的图片
        $(document).on("click", ".deletethisimg", function () {
            $(this).parent(".displayimg").remove();
        });

        //保存安卓商米T1分屏配置
        $("#btn_android_SaveSetHardware").on("click", function () {
            $.get('/PermissionsVerify/GetPermissionsVerify?modularName=SystemManage&actionName=CustomPrintVerify', function (data) {
                if (isNullOrWhiteSpace(data)) {
                    window.location.href = data;
                } else {
                    //saveSetHardware_CusDisplay();
                    saveSetHardware_T1SecondScreen();
                }
            });
        });


        //打印测试
        $("#btn_androidhardware_testprint").on("click", function () {
            try {
                //Android客户端打印
                cordova.plugins.barcodeScanner.printtest(
                    function (result) {
                    },
                    function (error) {
                        layer.msg(error.message);
                    },
                    {
                        myPrintData: "打印测试"
                    }
                );
            } catch (e) {
                layer.msg(e.message);
            }
        });

        //打开钱箱
        $("#btn_androidhardware_cashbox").on("click", function () {
            try {
                //Android客户端打印
                cordova.plugins.barcodeScanner.open(
                    function (result) {
                    },
                    function (error) {
                        layer.msg("打印钱箱失败: " + error);
                    },
                    {

                    }
                );
            } catch (e) {
                layer.msg("打印钱箱失败: " + e.message);
            }
        });

        //选择图片
        $("#btn_androidhardware_uploadimg").on("click", function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                MediaType: Camera.MediaType.ALLMEDIA
            });

            function onSuccess(imageURI) {
                //图片上传
                $.postJson('http://qode.decerp.cc/api/Images/SaveBase64Image',
                    { UserId: (user_id || 0), Base64Img: imageURI },
                    function (udata) {
                        if (udata && udata.succeed) {
                            if (udata && udata.values) {
                                if (udata.values.indexOf('http://') < 0)
                                    udata.values = _g_res_images_url + udata.values.replace('\\', '/');
                            }
                            var newItem = '<div class="photoimagesbox displayimg fl"><img src="' + udata.values + '"><button class="deletethisimg btn">删除</button></div>';
                            $(newItem).insertBefore(".filebox.fl");
                        }
                    });
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

        });

        //---======================安卓硬件设置==========--------------
    }
};

//确认初始化数据
function confirmInit() {
    layer.confirm("初始化店铺数据将无法恢复，确认初始化？", { btn: ["确认", "取消"] }, function () {
        var str = "";
        $(".uikslx.on").each(function () {
            str += $(this).data("id") + ",";
        });
        layer.close(layer.index);

        if (str == "") {
            layer.msg("请选择要清除的对象");
            return;
        }

        var totalCount = 0;//删除总量
        var curTotalCount = 0;//删除总量
        var percent = 0;//进度
        var vpercent = 0;//虚拟进度
        var resultdata = null;//初始化结果

        var defExcute = $.Deferred();//执行初始化的延迟
        var defError = $.Deferred();//异常的延迟
        var doA = $.Deferred();//执行前置条件的延迟
        var hasPrompt = false;

        //查询会员及其它数据量
        $.get("/System/GetClearDataRowCount2", { seid: str }, function (data) {
            if (data && data > 0) {
                totalCount = data;
            }
            doA.resolve();
        });

        doA.then(function () {
            if (totalCount > 0) {

            }
            else if (totalCount == -2 || totalCount == -5) {
                layer.close();
                layer.msg("你没有该操作权限！");
                return;
            }
            else if (totalCount == 0) {
                layer.close();
                layer.msg("没有可清除的数据！");
                return;
            }
            else {
                layer.close();
                layer.msg("删除失败");
                return;
            }

            //执行清理
            if (totalCount > 0) {
                layer.close();
                layer.closeAll();
                $("#progress_clear_userdata_text_alert").html("正在初始化数据");
                //开始执行清理
                $.post("/System/ClearAllDataBySize", { seid: str, pageSize: 100 }, function (data, status) {
                    if (status == "success") {
                        resultdata = data;
                        defExcute.resolve();
                    } else {
                        resultdata = data;
                        defExcute.reject();
                    }
                });
            }
            else {
                layer.closeAll();
                layer.msg("清除数据已成功！！");
                return;
            }
        }).done(function () {
            if (totalCount <= 0) return;

            //动态设置刷新进度条的时间间隔
            var timeBlock = 2000;
            if (totalCount > 10000) timeBlock = 3000;
            if (totalCount > 20000) timeBlock = 4000;
            if (totalCount > 50000) timeBlock = 5000;
            if (totalCount > 100000) timeBlock = 6000;
            if (totalCount > 150000) timeBlock = 8000;

            //layer.msg(timeBlock);
            if (curTotalCount <= 0) {
                vpercent = vpercent + 1;
                $("#progress_clear_userdata").css("width", vpercent + "%");
                $("#progress_clear_userdata_text_alert").html("请稍等，正在执行数据初始化...");
            }

            var tempCount = 0;
            var tempEqNum = 0;//计数器,初始化的过程中，如果连续10次刷新没有进展[这个时候可能是服务器端出问题了]，则触发异常
            var i = 0;
            //刷新进度条
            var t = setInterval(function () {
                i = i + 1;
                $("#progress_clear_userdata").css("width", vpercent + "%");
                //查询会员及其它数据量
                $.get("/System/GetClearDataRowCount2", { seid: str }, function (data, status) {
                    //alert(status);
                    if (data && data > 0) {
                        curTotalCount = data;
                        if (curTotalCount != tempCount) {
                            tempCount = curTotalCount;
                        }
                        else {
                            tempEqNum = tempEqNum + 1;
                            //初始化的过程中，如果连续10次刷新没有进展[这个时候可能是服务器端出问题了]，则触发异常
                            if (tempEqNum >= 10) { defError.resolve(); }
                        }
                        if (percent < 100) {
                            percent = parseInt(((totalCount - curTotalCount) / totalCount) * 100);
                            if (percent == 0) percent = 1;
                            if (percent > vpercent) vpercent = percent;
                            if (percent < vpercent) percent = vpercent;
                            $("#progress_clear_userdata").css("width", percent + "%");
                            $("#progress_clear_userdata_text_alert").html(i + "请稍等，正在执行数据初始化..." + (totalCount - curTotalCount) + "/" + totalCount + "[进度:" + percent + "%]");
                            //alert(i);
                        }
                    } else {
                        curTotalCount = 0;
                        setTimeout(function () {
                            if (hasPrompt == false) successprompt();
                            //hasPrompt = true;//回调还可触发
                        }, 3000);
                        clearInterval(t);
                    }
                });
                vpercent = vpercent + 1;
            }, timeBlock);

            var successprompt = function () {

                setTimeout(function () {
                    clearInterval(t);
                    layer.msg("初始化成功！");
                    percent = 100;
                    $("#progress_clear_userdata").css("width", percent + "%");
                    if (resultdata != null) {
                        $("#progress_clear_userdata_text_alert").html("初始化成功[耗时:" + i * timeBlock / 1000 + "Sec]：" + (totalCount - curTotalCount) + "/" + totalCount + resultdata.msg);
                    } else {
                        $("#progress_clear_userdata_text_alert").html("初始化成功![耗时:" + i * timeBlock / 1000 + "Sec]" + (totalCount - curTotalCount) + "/" + totalCount);
                    }
                    $("#progress_clear_userdata").removeClass("active");
                }, timeBlock + 1000)

            }

            var errorprompt = function () {
                clearInterval(t);
                if (curTotalCount > 0) {//数据未删完
                    $("#progress_clear_userdata_text_alert").html("存在异常[eprompt]：已清理：" + +(totalCount - curTotalCount) + "/" + totalCount + "行数据，但清理过程中出现异常，请稍后重新执行清理！");
                } else {//数据已删完
                    $("#progress_clear_userdata_text_alert").html("初始化成功![eprompt]" + (totalCount - curTotalCount) + "/" + totalCount);
                }
            }

            //如果初始化程序反回成功
            $.when(defExcute).done(function () {
                if (hasPrompt == false) successprompt();
                hasPrompt = true;
            })
            .fail(function () {
                errorprompt();
            })

            //如果初始化程序长时间没有反回状态
            $.when(defError).done(function () {
                errorprompt();
            });


        });
    });
};

//数据初始化
function systemPwd2(newPassword, moble) {
    $.ajax({
        type: "POST",
        url: "http://api.decerp.cc/system/CheckoutCode?moble=" + moble + "&code=" + newPassword,
        dataType: "json",
        success: function(data) {
            if (data.succeed != true)
            {
                layer.msg("验证码不正确");
                return false;
            }
            else {
                confirmInit();
            }
        }
    });

}

/**
*判断是否是数字
*
**/
function isRealNum(val) {
    if (val === "" || val == null)
    {
        return false;
    }
    if (!isNaN(val))
    {
        return true;
    } else
    {
        return false;
    }
}