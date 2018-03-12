var is_exist_warehouse = false;
function f5(id) {
    $("#stockorderinout").html("");
    $.get("/supplier/GetprocUrementoDall?nober=" + id, function (data) {

        $("#stockorderinout").append('<a  class="active" href="javascript:void(0)" data-action="GetprocUrementoDall" data-id="' + data["sv_pc_noid"] + '"><i>' + data["sv_pc_noid"] + '</i><i class="paleft10">(进货单号)</i></a>');

        $.get("/supplier/GetPurchasereturnList?associatedCode=" + id, function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#stockorderinout").append('<a href="javascript:void(0)" data-action="GetreturnprocUrementoDall"  data-id="' + data[i].sv_pc_noid + '"><i>' + data[i].sv_pc_noid + '</i><i class="paleft10">(退货单号)</i></a>');
            }
        });

        if (data == -2) {
            layer.msg("你没有该操作权限");
            layer.close(index);
        }
        else {
            for (var key in data) {
                if (key == "sv_pc_date") {
                    $("#" + key).text(new Date(data[key]).Format("yyyy-MM-dd hh:mm:ss"));
                } else {
                    $("#" + key).text(data[key]);
                }
            }
            if (!data.Prlist) {
                data.Prlist = data.prlist;
            }
            for (var i = 0; i < data.Prlist.length; i++) {
                //alert(JSON.stringify(data.Prlist[i]));
                var sv_pc_pnumber = data.Prlist[i].sv_pricing_method == 1 ? data.Prlist[i].sv_p_weight : data.Prlist[i].sv_pc_pnumber;
                $("#sholist").append("<tr> <td><span>" + (i + 1) + "</span></td><td><span>" + data.Prlist[i].sv_p_barcode + "</span></td> <td><span>" + data.Prlist[i].sv_p_name + "</span></td> <td><span>" + data.Prlist[i].sv_p_unit + "</span></td> <td><span>" + sv_pc_pnumber + "</span></td><td><i>¥" + data.Prlist[i].sv_pc_price + "</i></td> <td><i>¥" + data.Prlist[i].sv_pc_combined + "</i></td> </tr>");
            }
        }
    });


    $(document).on("click", "#copynew", function () {
        var iss = $("#sv_pc_noid").text();
        layer.closeAll();
        Deke.DeKe_dialog.show_Url2('新增入库', '/html/procurement/addproc.html?v=' + clearCache + 1, f(1, iss, true), ['860px', '550px']);
    });

    $(document).unbind("click", "#stockorderinout>a").on("click", "#stockorderinout>a", function () {
        $(this).addClass("active").siblings("a").removeClass("active");
        FunGetPrlist($(this).data("id"), $(this).data("action"));
    })
}

function FunGetPrlist(id, action) {
    $.get("/supplier/" + action + "?nober=" + id, function (data) {

        loggin.chklogn(data);


        for (var key in data) {

            if (key == "sv_pc_date") {
                $("#" + key).text(new Date(data[key]).Format("yyyy-MM-dd hh:mm:ss"));

            } else {
                $("#" + key).text(data[key]);
            }
        }
        if (!data.Prlist) {
            data.Prlist = data.prlist;

        }

        $("#sholist").html("");
        for (var i = 0; i < data.Prlist.length; i++) {
            var sv_pc_pnumber = data.Prlist[i].sv_pricing_method == 1 ? data.Prlist[i].sv_p_weight : data.Prlist[i].sv_pc_pnumber;
            $("#sholist").append("<tr> <td><span>" + (i + 1) + "</span></td><td><span>" + data.Prlist[i].sv_p_barcode + "</span></td> <td><span>" + data.Prlist[i].sv_p_name + "</span></td> <td><span>" + data.Prlist[i].sv_p_unit + "</span></td> <td><span>" + sv_pc_pnumber + "</span></td><td><i>¥" + data.Prlist[i].sv_pc_price + "</i></td> <td><i>¥" + data.Prlist[i].sv_pc_combined + "</i></td> </tr>");
        }
    });
}

// 修改待入库的商品
function f(vv, id, isCopy) {
    checkIdArr = {};
    map = {};
    setTimeout(function () {
        if (vv != 2) {
            $('input[name="subbox"]').prop("checked", false);
            $('input[name="subbox"]').parent().parent().removeClass('checkedBox');
        }
        $.getJSON("/supplier/supplierlist?id=-1&key=", function (data) {
            loggin.chklogn(data);
            var html = '';

            for (var i = 0; i < data.length; i++) {
                $("#sv_suid").append('<option value="' + data[i].sv_suid + '">' + data[i].sv_suname + '</option>');
            }

            $("#Purchasepruct").click(function () {

                index = Deke.DeKe_dialog.show_Url('选择商品', '/html/Product-cate2.html?v=' + clearCache + 10, ["   确定   ", "关闭"], citr, f2, ['860px', '600px']);
            });

            $('#sv_pc_date').val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
            //.datetimepicker({
            //    initialDate: new Date(),
            //    weekStart: 1,
            //    todayBtn: 1,
            //    autoclose: 1,
            //    todayHighlight: 1,
            //    startView: 2,
            //    minView: 1,
            //    forceParse: 0,
            //    format: 'yyyy-MM-dd hh:mm:ss'
            //});
            if (id != "" && id != null && id != undefined && id.indexOf("DEC") >= 0 && isCopy == false) {
                $("#numbier").text(id);
            }
            else if (isCopy == true) {
                $("#numbier").text("DEC" + parseInt(Math.random() * 1000000000000, 10));
            }
            else {
                //$("#numbier").text("DEC" + parseInt(Math.random() * 1000000000000, 10));
            }
        });
        $.get("/WarehouseInfo/GetWarehouse", function (data) {
            if (data != null && data != "") {
                var listhtml = '';
                is_exist_warehouse = true;
                for (var theadKey in data) {
                    listhtml += data[theadKey];
                };
                $('#sv_targetwarehouse_id').html(listhtml);
            }
        });
        $(document).undelegate('.baochun', 'click').delegate('.baochun', 'click', function () {
            var msgHtml = '系统库存';
            var sv_targetwarehouse_id = $('#sv_targetwarehouse_id').val();
            if (isNullOrWhiteSpace(sv_targetwarehouse_id) && parseInt(sv_targetwarehouse_id) > 0) {
                msgHtml = $("#sv_targetwarehouse_id option:selected").text() + '中';
            }
            var contents = '<div class="modal-body"> <h4>提示：</h4><p>【保存】则需要确认审核收货后才会添加到' + msgHtml + '</p><p></p><p>';
            contents += '【入库并审核】货品会直接添加到' + msgHtml + '</p><div class="modal-footer"><button type="button" class="button  ';
            contents += 'button-primary button-rounded button-small BAOCHUNruku" data-sate="0" style="margin-right:10px">保存</button>';
            contents += '<button type="button" class="button  button-primary button-rounded button-small BAOCHUNruku" data-sate="1" ';
            contents += 'style="margin-right:10px">入库并审核</button><button type="button" class="button  button-default button-rounded button-small clacsse" >取消</button></div></div>';
            layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: contents
            });
            var sd = $(this).data("sate");
            //layer.confirm("<p>【直接入库】，货品会直接添加到系统库存</p> <p>【通知前台收货】，则需要前台确认收货后才会添加到系统库存</p> ", { btn: ["直接入库", "通知前台收货", "取消"] },
            //    function () { alert("直接入库") },
            //    function () {  },
            //    function () { });

            $(".BAOCHUNruku").click(function () {
                $(this).attr("disabled","disabled");
                rukuchuli($(this).data("sate"), sd);
            });
        });

        $(document).on("click", ".clacsse", function () {
            layer.closeAll();
        });

        // 回击选择产品
        $(document).on("keypress", "#keySearch", function (e) {

            if (e.keyCode == 13) {
                Getproduct($(".click_view.active").data("id"), 1, $("#keySearch").val());
            }
        });
        // 订单保存操作
        function rukuchuli(str, news) {
            var selectproduct = $('#selectproduct tr');
            if (selectproduct != null && selectproduct != undefined && selectproduct != '' && selectproduct.length > 0) {
                var prname = "";
                var data2 = '[';

                $("#selectproduct tr").each(function () {
                    data2 += '{"sv_pc_productid":' + $(this).data("sv_pc_productid") + ',"product_id":' + $(this).data("pid") + ',"sv_pc_pnumber":' + $(this).find("td").eq(4).find("input").val() + ',"sv_pc_price":' + $(this).find("td").eq(5).find("input").val() + ',"sv_pc_combined":' + $(this).find("td").eq(6).find("input").val() + ', "sv_pricing_method":' + $(this).data("pricingmethod") + ', "sv_paid_in_amount":' + $(this).find("td").eq(7).find("input").val() + '},';
                    prname = $(this).find("td").eq(2).text();
                });

                data2 = data2.substring(0, data2.length - 1);
                data2 += "]";

                var data = { "sv_pc_noid": $("#numbier").text(), "sv_targetwarehouse_id": $("#sv_targetwarehouse_id").val() || -1, "sv_suid": $("#sv_suid").val(), "sv_pc_date": $("#sv_pc_date").val(), "sv_pc_note": $("#sv_pc_note").val(), "sv_pc_combined": $("#zhonge").text(), "sv_pc_total": $("#heji").text(), "sv_pc_costs": $("#qitafeiyong").val(), "sv_pc_settlement": $("#sv_pc_settlement").val(), "sv_pc_state": str, "sv_pc_realpay": $("#shifu").val(), "sv_productname": prname, "Prlist": JSON.parse(data2) };
                // alert(JSON.stringify(data));
                $.ajax({
                    url: '/supplier/addsv_procurement',
                    type: 'post',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    async: false,
                    success: function (data) {
                        loggin.chklogn(data);
                        if (data == true) {
                            // getpage('');
                            layer.closeAll();
                            layer.msg("采购订单创建成功！");
                            //  alert(news);
                            if (news == 1) {
                                Deke.DeKe_dialog.show_Url2('新增入库', '/html/procurement/addproc.html?v=' + clearCache + 100, f(null, null, true), ['860px', '550px']);
                            }
                            pageHtml("", "", 0);
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限");
                        }
                        else {
                            layer.closeAll();
                            layer.msg("保存失败，请刷新重试");
                        }
                    }
                });
            }
            else {
                layer.msg("请添加要采购的商品！");
            }
        }

        var html = '<tr class="{biaoma} {pid} open"  data-pid="{pid}"  data-sv_pc_productid="{sv_pc_productid}" data-pricingmethod ="{pricingmethod}">';
        html += '<td class="cltdd"><span></span><em class="new-kks icon-remove-sign"></em></td><td><span>{biaoma}</span></td> <td><span>{name}</span>';
        html += '</td><td><span>{danwei}</span></td><td class="lasselec"><input  data-sv_pricing_method="{sv_pricing_method}"  onkeyup="clearNoNumber_input(this);" onchange="clearNoNumber_input(this);" type="text" value="{number}" class="update" >';
        html += '</td><td class="lasselec"><i><input type="text"  onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="update2" value="{jiage}"></i></td>';
        html += '<td class="lasselec"><i><input type="text" readonly value="{zhongjia}"></i></td>';
        html += '<td class="lasselec"><i><input type="text" onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="paidInAmount"  value="{zhongjia}"></i></td></tr>';
        // 回击选择产品
        $(document).on("keypress", "#cjesssa", function (e) {
            if (e.keyCode == 13) {
                $.getJSON("/AjaxProduct/GetProductDetail_bid?id=" + $("#cjesssa").val(), function (data) {
                    //    alert(JSON.stringify());
                    if (data.sv_p_barcode != null) {
                        if ($("." + data.sv_p_barcode + "").length == 0) {
                            var h = html.replace(/{sv_pc_productid}/g, 0)
                                .replace(/{pid}/g, data.product_id)
                                .replace(/{pricingmethod}/g, data.sv_pricing_method)
                                .replace(/{biaoma}/g, data.sv_p_barcode)
                                .replace(/{biaoma}/g, data.sv_p_barcode)
                                .replace(/{name}/g, data.sv_p_name)
                                .replace(/{jiage}/g, parseFloat(data.sv_p_originalprice))
                                .replace(/{zhongjia}/g, parseFloat(data.sv_p_originalprice))
                                .replace(/{danwei}/g, data.sv_p_unit)
                                .replace(/{number}/g, 1)
                                .replace(/{sv_pricing_method}/g, data.sv_pricing_method)
                                .replace(/{zhongjia}/g, parseFloat(data.sv_p_originalprice));
                            map[data.product_id] = h;
                            checkIdArr[data.product_id] = data.sv_p_barcode;
                            $("#selectproduct").append(h);
                        } else {
                            layer.msg("产品已经在列表中");
                        }
                        heji();
                        $("#cjesssa").val("").focus();
                    } else {
                        layer.msg("商品不存在");
                    }
                });
            }
        });

        if (vv == 1 || vv == 2) {
            $.get("/supplier/GetprocUrementoDall?nober=" + id, function (data) {
                for (var key in data) {
                    $("#" + key).val(data[key]);
                    if (key == "sv_pc_date") {
                        $("#" + key).val(new Date(data[key]).Format("yyyy-MM-dd hh:mm:ss"));
                    }

                    if (key == "sv_pc_total") {
                        $("#zhonge").text(data[key]);
                    }
                    if (key == "sv_pc_combined") {
                        $("#heji").text(data[key]);
                    }
                    if (key == "sv_pc_realpay") {
                        $("#shifu").val(data[key]);
                    }
                    if (key == "sv_pc_costs") {
                        $("#qitafeiyong").val(data[key]);
                    }
                }
                if (!data.Prlist) {
                    data.Prlist = data.prlist;
                }
                if (vv == 1) {
                    for (var i = 0; i < data.Prlist.length; i++) {
                        var h = html.replace(/{sv_pc_productid}/g, data.Prlist[i].sv_pc_productid)
                            .replace(/{pid}/g, data.Prlist[i].product_id)
                            .replace(/{pricingmethod}/g, data.Prlist[i].sv_pricing_method)
                            .replace(/{biaoma}/g, data.Prlist[i].sv_p_barcode)
                            .replace(/{biaoma}/g, data.Prlist[i].sv_p_barcode)
                            .replace(/{name}/g, data.Prlist[i].sv_p_name)
                            .replace(/{jiage}/g, parseFloat(data.Prlist[i].sv_pc_price))
                            .replace(/{zhongjia}/g, parseFloat(data.Prlist[i].sv_pc_combined))
                            .replace(/{danwei}/g, data.Prlist[i].sv_p_unit)
                            .replace(/{number}/g, 1)
                            .replace(/{sv_pricing_method}/g, data.Prlist[i].sv_pricing_method)
                            .replace(/{zhongjia}/g, parseFloat(data.Prlist[i].sv_pc_combined));

                        map[data.Prlist[i].product_id] = h;
                        checkIdArr[data.Prlist[i].product_id] = data.Prlist[i].sv_p_barcode;

                        $("#selectproduct").append(h);
                    }
                } else if (vv == 2) {
                    for (var i = 0; i < data.Prlist.length; i++) {
                        var sv_pc_pnumber = data.Prlist[i].sv_pricing_method == 1 ? data.Prlist[i].sv_p_weight : data.Prlist[i].sv_pc_pnumber;

                        var h = html.replace(/{sv_pc_productid}/g, data.Prlist[i].sv_pc_productid)
                            .replace(/{pid}/g, data.Prlist[i].product_id)
                            .replace(/{pricingmethod}/g, data.Prlist[i].sv_pricing_method)
                            .replace(/{biaoma}/g, data.Prlist[i].sv_p_barcode)
                            .replace(/{biaoma}/g, data.Prlist[i].sv_p_barcode)
                            .replace(/{name}/g, data.Prlist[i].sv_p_name)
                            .replace(/{jiage}/g, parseFloat(data.Prlist[i].sv_pc_price))
                            .replace(/{zhongjia}/g, parseFloat(data.Prlist[i].sv_pc_combined))
                            .replace(/{danwei}/g, data.Prlist[i].sv_p_unit)
                            .replace(/{number}/g, sv_pc_pnumber)
                            .replace(/{sv_pricing_method}/g, data.Prlist[i].sv_pricing_method)
                            .replace(/{zhongjia}/g, parseFloat(data.Prlist[i].sv_pc_combined));
                        map[data.Prlist[i].product_id] = h;
                        checkIdArr[data.Prlist[i].product_id] = data.Prlist[i].sv_p_barcode;

                        $("#selectproduct").append(h);
                    }
                }
            });
        }
    }, 200);
}

// 选择产品确认方法
function citr() {
    //var html = '<tr class="{biaoma} open"  data-pid="{pid}" data-sv_pc_productid="{sv_pc_productid}" data-pricingmethod="{pricingmethod}">';
    //html += '<td class="cltdd"><span></span><em class="new-kks icon-remove-sign"></em></td><td><span>{biaoma}</span></td> ';
    //html += '<td><span>{name}</span></td><td><span>{danwei}</span></td><td class="lasselec">';
    //html += '<input data-sv_pricing_method="{sv_pricing_method}" onkeyup="clearNoNumber_input(this);" onchange="clearNoNumber_input(this);" type="text" value="1" class="update" ></td>';
    //html += '<td class="lasselec"><i><input type="text"  onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="update2" value="{jiage}"></i></td>';
    //html += '<td class="lasselec"><i><input type="text" readonly value="{zhongjia}"></i></td>';
    //html += '<td class="lasselec"><i><input type="text" onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="paidInAmount" value="{zhongjia}"></i></td></tr>';
    //$('input[name="subbox"]:checked').each(function () {
    //    var tr= $(this).parent().parent().parent().parent();
    //    var sd = tr.find("td");
    //    if ((sd.eq(1).text().indexOf("DEC") < 0)) {
    //        if (sd.eq(1).text()) {
    //            if ($("." + sd.eq(1).text() + "").length == 0) {
    //                $("#selectproduct").append(
    //                    html.replace("{sv_pc_productid}", 0)
    //                    .replace(/{pid}/g, tr.data("pid"))
    //                    .replace(/{biaoma}/g, sd.eq(1).text())
    //                    .replace("{name}", sd.eq(2).text())
    //                    .replace("{jiage}", parseFloat(sd.eq(3).text().replace("¥", "")))
    //                    .replace("{danwei}", sd.eq(4).text())
    //                    .replace(/{zhongjia}/g, parseFloat(sd.eq(3).text().replace("¥", "")))
    //                    .replace("{pricingmethod}", tr.data("pricingmethod"))
    //                    .replace("{sv_pricing_method}", tr.data("pricingmethod")));
    //            }
    //        }
    //    }
    //});

    $.each(map, function (_key) {
        if ($("." + _key + "").length == 0) {
            $("#selectproduct").append(map[_key]);
        }
    });

    heji();
    layer.close(index);
}

// 计算专用方法
function heji() {
    var ite = 0.00;
    $("#selectproduct tr").each(function () {
        var money = $(this).find("td").eq(6).find("input").val();
        if (money != null && money != '' && money != undefined) {
            ite += parseFloat(money);
        }
        else {
            $(this).find("td").eq(6).find("input").focus();
            return;
        }
    });

    $("#zhonge").text(Math.round(ite * 100) / 100);
    if ($("#qitafeiyong").val() != "") {
        ite += parseFloat($("#qitafeiyong").val());
    }
    ite = Math.round(ite * 100) / 100;
    $("#shifu").val(ite);
    $("#heji").text(ite);
}
// 产品方法
function f2() {

    $("#divSearch").css('display', 'block');
    //加载产品分类信息
    $.getJSON("/ProductCategory/GetFirstCategory?type=0", function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += '<li class="click_view" data-id="' + data[i].productcategory_id + '"><a href="javascript:void(0);"><i>[' + data[i].productcategory_id + ']</i>' + data[i].sv_pc_name + '</a></li>';
        }
        Getproduct(0, 1, $("#keySearch").val());
        $(".listo").html(html);
        $(".click_view").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            Getproduct($(this).data("id"), 1, $("#keySearch").val());
        });
    });
}

function Getproduct(classid, pageIndex, name) {
    // 查询
    $.getJSON('/AjaxProduct/GetProductList', {
        category: classid,
        name: name,
        pageIndex: pageIndex || 1,
        producttype_id: 0,
        pageSize: 20   //每页记录数
    },
    function (res) { //从第1页开始请求。返回的json格式可以任意定义
        var data = res.list;
        var html = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var result = checkIdArr[data[i].product_id];

                var c = "";
                var cClass = "";
                if (result != undefined) {
                    c = "checked";
                    cClass = "checkedBox";
                }

                html += '<tr data-pid="' + data[i].product_id + '" data-pricingmethod="' + data[i].sv_pricing_method + '"><td><div class="check-box checknext ' + cClass + ' "><i><input type="checkbox" data-pid="' + data[i].product_id + '" name="subbox" ' + c + '></i></div></td><td>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</td> <td><span>' + (data[i].sv_p_name == null ? "" : data[i].sv_p_name) + '</span></td><td><i>¥' + data[i].sv_p_originalprice + '</i></td><td>' + data[i].sv_p_unit + '</td> <td>' + data[i].sv_p_specs + '</td></a></tr>';
            }
        }

        $("#product_tbody").html(html);

        // 分页
        laypage({
            cont: 'pageGro2', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageGro"></div>
            pages: res.total, //通过后台拿到的总页数
            curr: pageIndex || 1, //初始化当前页
            skin: 'molv', //皮肤颜色
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                if (!first) {
                    Getproduct(classid, e.curr, $("#keySearch").val());
                }
            }
        });
    });
}

var g_get_procurement_date = "";
var g_get_procurement_key = "";
var g_get_procurement_day = "";

var checkIdArr = {};
var map = {};

$(document).ready(function () {

    $("#export_procurement").on("click", function () {
        Glist(0, g_get_procurement_date, g_get_procurement_key, g_get_procurement_day, 0, 1);
    });


    $(document).on("change", ".update", function () {
        var bd = $(this).parent().next().find("input").val();
        if (!bd) {
            bd = 0;
        }
        var number = $(this).val();
        if (number != null && number != '' && number != undefined) {
            var p = parseFloat(number);
            p = p * bd;
            p = Math.round(p * 100) / 100
            $(this).parent().next().next().find("input").val(p);
            $(this).parent().next().next().next().find("input").val(p);
            heji();
        }
        else {
            $(this).focus();
            $(this).val(1);
            $(this).parent().next().next().find("input").val(parseFloat(bd));
            heji();
        }
    });

    // 实收金额列
    $(document).on("change", ".paidInAmount", function () {
        var ite = 0.00;
        $("#selectproduct tr").each(function () {
            ite += parseFloat($(this).find("td").eq(7).find("input").val());
        });

        if ($("#qitafeiyong").val() != "") {
            ite += parseFloat($("#qitafeiyong").val());
        }
        ite = Math.round(ite * 100) / 100;
        $("#shifu").val(ite);
    });


    $(document).on("change", ".update2", function () {
        var bd = parseFloat($(this).parent().parent().prev().find("input").val());
        var p = parseFloat($(this).val());
        p = p * bd;
        p = Math.round(p * 100) / 100
        $(this).parent().parent().next().find("input").val(p);
        $(this).parent().parent().next().next().find("input").val(p);
        heji();
    });

    $("#qitafeiyong").change(function () {
        heji();
    });

    $(document).on('click', '.new-kks', function () {
        $(this).parents('tr').slideUp('fast', function () {
            $(this).remove();
            heji();
        });

        delete checkIdArr[$(this).parents('tr').data("pid")];
        delete map[$(this).parents('tr').data("pid")];

    });

    //单个checkbox选中取消
    $(document).on("click", ".check-box,.checkinputall", function () {

        if ($(this).attr("id") == "checkAll") {
            if ($(this).is(":checked")) {
                $('input[name="subbox"]').prop("checked", true);
                $('.checknext').addClass('checkedBox');
                $('input[name="subbox"]').each(function () {

                    var id = $(this).data("pid");
                    if (id != undefined) {
                        var html = '<tr class="{biaoma} {pid} open"  data-pid="{pid}" data-sv_pc_productid="{sv_pc_productid}" data-pricingmethod="{pricingmethod}">';
                        html += '<td class="cltdd"><span></span><em class="new-kks icon-remove-sign"></em></td><td><span>{biaoma}</span></td> ';
                        html += '<td><span>{name}</span></td><td><span>{danwei}</span></td><td class="lasselec">';
                        html += '<input data-sv_pricing_method="{sv_pricing_method}" onkeyup="clearNoNumber_input(this);" onchange="clearNoNumber_input(this);" type="text" value="1" class="update" ></td>';
                        html += '<td class="lasselec"><i><input type="text"  onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="update2" value="{jiage}"></i></td>';
                        html += '<td class="lasselec"><i><input type="text" readonly value="{zhongjia}"></i></td>';
                        html += '<td class="lasselec"><i><input type="text" onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="paidInAmount" value="{zhongjia}"></i></td></tr>';

                        var tr = $(this).parent().parent().parent().parent();
                        var sd = tr.find("td");

                        map[id] = html.replace(/{sv_pc_productid}/g, 0)
                                        .replace(/{pid}/g, tr.data("pid"))
                                        .replace(/{biaoma}/g, sd.eq(1).text())
                                        .replace(/{name}/g, sd.eq(2).text())
                                        .replace(/{jiage}/g, parseFloat(sd.eq(3).text().replace("¥", "")))
                                        .replace(/{danwei}/g, sd.eq(4).text())
                                        .replace(/{zhongjia}/g, parseFloat(sd.eq(3).text().replace("¥", "")))
                                        .replace(/{pricingmethod}/g, tr.data("pricingmethod"))
                                        .replace(/{sv_pricing_method}/g, tr.data("pricingmethod"))


                        checkIdArr[id] = sd.eq(1).text();

                    }


                });
            } else {
                $('input[name="subbox"]').prop("checked", false);
                $('.checknext').removeClass('checkedBox');
                $('input[name="subbox"]').each(function () {
                    var id = $(this).data("pid");
                    delete checkIdArr[id];
                    delete map[id];
                });
            }
        } else {
            var id = $(this).find("input").data("pid");

            if (!$(this).find("input").is(":checked")) {
                $(this).find("input").prop("checked", true);
                $(this).addClass('checkedBox');
                if ($('input[name="subbox"]:checked').length == $('input[name="subbox"]').length) {
                    $("#checkAll").prop("checked", true);
                    $("#checkAll").addClass('checkedBox');
                }
                if (id != undefined) {
                    var html = '<tr class="{biaoma} {pid} open"  data-pid="{pid}" data-sv_pc_productid="{sv_pc_productid}" data-pricingmethod="{pricingmethod}">';
                    html += '<td class="cltdd"><span></span><em class="new-kks icon-remove-sign"></em></td><td><span>{biaoma}</span></td> ';
                    html += '<td><span>{name}</span></td><td><span>{danwei}</span></td><td class="lasselec">';
                    html += '<input data-sv_pricing_method="{sv_pricing_method}" onkeyup="clearNoNumber_input(this);" onchange="clearNoNumber_input(this);" type="text" value="1" class="update" ></td>';
                    html += '<td class="lasselec"><i><input type="text"  onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="update2" value="{jiage}"></i></td>';
                    html += '<td class="lasselec"><i><input type="text" readonly value="{zhongjia}"></i></td>';
                    html += '<td class="lasselec"><i><input type="text" onkeyup="clearNoNum(this);" onchange="clearNoNum(this);" class="paidInAmount" value="{zhongjia}"></i></td></tr>';

                    var tr = $(this).find("input").parent().parent().parent().parent();
                    var sd = tr.find("td");

                    map[id] = html.replace(/{sv_pc_productid}/g, 0)
                                    .replace(/{pid}/g, tr.data("pid"))
                                    .replace(/{biaoma}/g, sd.eq(1).text())
                                    .replace(/{name}/g, sd.eq(2).text())
                                    .replace(/{jiage}/g, parseFloat(sd.eq(3).text().replace("¥", "")))
                                    .replace(/{danwei}/g, sd.eq(4).text())
                                    .replace(/{zhongjia}/g, parseFloat(sd.eq(3).text().replace("¥", "")))
                                    .replace(/{pricingmethod}/g, tr.data("pricingmethod"))
                                    .replace(/{sv_pricing_method}/g, tr.data("pricingmethod"))

                    checkIdArr[id] = sd.eq(1).text();

                }
            }
            else {
                $(this).find("input").prop("checked", false);
                $(this).removeClass('checkedBox');
                $(".checkinputall").prop("checked", false);

                delete checkIdArr[id];
                delete map[id];
            }
        }
    });

    $("#key").keypress(function (e) {
        if (e.keyCode == 13) {
            pageHtml("", $("#key").val());
        }
    });

    $("#refresh").click(function () {
        pageHtml("", "", 0);

    });

    pageHtml("", "", 0);

    // 日期搜索
    $('#dateselect').val(new Date().Format("yyyy-MM-dd")).datetimepicker({
        initialDate: new Date(),
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: 'yyyy-mm-dd'
    }).on('changeDate', function (ev) {
        pageHtml($('#dateselect').val(), "", 0);
    });

    // 会员选择
    $('.stecs i').click(function () {

        $(this).parent().toggleClass('on').siblings().removeClass('on');
        if ($(this).parent().is(".on")) {
            pageHtml("", "", $(this).parent().data("day"));
        } else {
            pageHtml("", "", 0);
        }
    });

    $(document).on("click", ".ruku", function () {
        $.post("/supplier/updatesv_procurement", { "id": $(this).parent().parent().parent().data("id"), "sate": $(this).data("sate") }, function (data) {
            loggin.chklogn(data);
            if (data == true) {
                layer.msg("操作成功");
                pageHtml("", "", 0);
            } else if (data == -1) {
                layer.msg("该单据已经审核过");
            }
            else if (data == -2) {
                layer.msg("你没有该操作权限");
            }
            else {
                layer.msg("操作失败");
            }
        });
    });

    //删除 
    $("#deleteprocurement").click(function () {
        var ids = "";
        if ($('input[name="subbox"]:checked').length == 1) {
            if ($('input[name="subbox"]:checked').data("state") == 2 || $('input[name="subbox"]:checked').data("state") == 0) {
                $.post("/supplier/detelesv_procurement", { "id": $('input[name="subbox"]:checked').data("id"), "sate": $('input[name="subbox"]:checked').data("state") }, function (data) {
                    loggin.chklogn(data);
                    if (data == true) {
                        layer.msg("操作成功");
                        pageHtml("", "", 0);
                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限");
                    }
                    else {
                        layer.msg("操作失败");
                    }
                });
            } layer.msg("只能删除【待入库,取消】状态的入库单,请重新选择入库单信息！");
            return false;
        } else {
            layer.msg("请先择您要删除的入库单信息，不能选择多个！");
            return false;
        }

    });
    //修改 
    $("#updateprocurement").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            if ($('input[name="subbox"]:checked').data("state") == 0) {
                Deke.DeKe_dialog.show_Url2('修改入库单信息', '/html/procurement/addproc.html?v=a1', f(2, '' + $('input[name="subbox"]:checked').data("id") + '', false), ['860px', '550px']);
            } else {
                layer.msg("只能修改【待入库】状态的入库单,请重新选择入库单信息！");
                return false;
            }
        } else {
            layer.msg("请先择您要修改入库单信息，不能选择多个！");
            return false;
        }

    });

});

// 控制整数和2位小数（应该做公共）
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数

}
// 加载列表
function pageHtml(date, key, day) {
    day = day || 0;
    // 初始化分页内容
    $.get("/supplier/get_procurementcount/?date=" + date + "&key=" + key + "&day=" + day, function (data) {
        var i = Math.ceil(data / 5);
        laypage({
            cont: "pageGro", //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                Glist(e.curr, date, key, day);
            }
        });
    });
}

function Glist(page, date, key, day, top, isexport) {
    g_get_procurement_date = date;
    g_get_procurement_key = key;
    g_get_procurement_day = day;
    if (isexport > 0) {
        var loadingIndex = commonOpenLoading();
    }
    var html = "";
    $.getJSON("/supplier/get_procurement?page=" + page + "&date=" + date + "&key=" + key + "&day=" + day + "&top=" + top + "&isexport=" + isexport, function (data) {
        if (isexport > 0) {

            commonCloseLoading(loadingIndex);
            if (data) {
                //下载Execl文件
                try {
                    if (((typeof Cef) !== 'undefined')) {
                        Cef.Download(data);
                    } else {
                        location.href = data;
                    }

                } catch (e) {

                }

            }
        } else {

            for (b = 0; b < data.length; b++) {
                daye = new Date(data[b].sv_pc_date).Format("yyyy-MM-dd hh:mm:ss");

                if (!data[b].Prlist) {
                    data[b].Prlist = data[b].prlist;

                }

                if (data[b].Prlist && data[b].Prlist.length == 1) {
                    html += ' <tr class="danpinlisttt" data-id="' + data[b].sv_pc_noid + '" data-sv_pc_productid=' + data[b].Prlist[0].sv_pc_productid + '> ';
                    html += '    <td> <div class="check-box checknext "><i><input type="checkbox" name="subbox" data-id="' + data[b].sv_pc_noid + '" data-state=' + data[b].sv_pc_state + '></i></div>  </td>  <td><span>' + data[b].sv_pc_noid + '</span></td>';
                    if (isNullOrWhiteSpace(data[b].sv_suname)) {
                        html += '     <td><span>' + data[b].sv_suname + '</span></td>';
                    }
                    else {
                        html += '     <td><span></span></td>';
                    }
                    html += '     <td><span class="text-ovtb">' + data[b].Prlist[0].sv_p_name + '</span></td>';
                    if (isNullOrWhiteSpace(data[b].Prlist[0].sv_p_unit)) {
                        html += '     <td><span>' + data[b].Prlist[0].sv_p_unit + '</span></td>';
                    } else {
                        html += '     <td><span>无单位</span></td>';
                    }
                    if (data[b].Prlist[0].sv_pc_price > 0) {
                        html += '     <td><span>' + data[b].Prlist[0].sv_pc_price + '</span></td>';
                    } else {
                        html += '     <td><span>0</span></td>';
                    }
                    var sv_pc_pnumber = data[b].Prlist[0].sv_pricing_method == 1 ? data[b].Prlist[0].sv_p_weight : data[b].Prlist[0].sv_pc_pnumber;
                    html += '     <td><span class="bggreen">' + sv_pc_pnumber + '</span></td>';

                    html += '     <td><i>¥' + data[b].sv_pc_combined + '</i></td>';
                    html += '     <td><i>¥' + data[b].sv_pc_realpay + '</i></td>';
                    html += '     <td><span>' + data[b].sv_pc_settlement + '</span></td>';
                    html += '<td class="posi"> <i>' + Getstu(data[b].sv_pc_state) + '</i>';
                    if (data[b].sv_pc_state == 0) {
                        html += '<div class="positext"><a href="javascript:void(0);" class="ruku" data-sate="1">审核</a><a href="javascript:void(0);" class="ruku" data-sate="2" >取消审核</a></div></td>';
                    }
                    html += '	<td><span>' + data[b].userName + '</span></td>';
                    html += '     <td><span>' + daye + '</span></td>';
                    html += '     <td>';
                    html += '         <div class="xstbbtn">';
                    html += '             <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a> | <a href="javascript:void(0);" class="showview" data-id="' + data[b].sv_pc_noid + '"> 详情</a>|<a href="#" class="nonebg" onclick="Deke.DeKe_dialog.show_Url2(\'新增入库\', \'/html/procurement/addproc.html?v=a1\', f(1,\'' + data[b].sv_pc_noid + '\', true), [\'860px\', \'550px\']);">复制新增</a>';
                    if (data[b].sv_pc_state != 0) {
                        if (sv_pc_pnumber <= 0) {
                            html += '<span href="javascript:void(0);">已退货</span>';
                        }
                        else {
                            html += '<a href="javascript:void(0);" data-id="' + data[b].sv_pc_noid + '" class="returnGoods">退货</a>';
                        }
                    }

                    html += '         </div>';
                    html += '     </td>';
                    html += ' </tr>';

                } else {
                    var html2 = "";
                    var count = 0;
                    if (!data[b].Prlist) data[b].Prlist.length = 0;
                    for (var i = 0; i < data[b].Prlist.length; i++) {
                        html2 += '<tr class="MoreGoodsSale danpinlisttt" data-id= "' + data[b].sv_pc_noid + '" data-sv_pc_productid=' + data[b].Prlist[i].sv_pc_productid + '>';
                        html2 += '   	 	   <td></td>';
                        html2 += '		<td><span></span></td>';
                        html2 += '		<td><span></span></td>';
                        html2 += '			<td><span class="text-ovtb">' + data[b].Prlist[i].sv_p_name + '</span></td>';
                        if (isNullOrWhiteSpace(data[b].Prlist[i].sv_p_unit)) {
                            html2 += '     <td><span>' + data[b].Prlist[i].sv_p_unit + '</span></td>';
                        } else {
                            html2 += '     <td><span>无单位</span></td>';
                        }
                        if (data[b].Prlist[i].sv_pc_price > 0) {
                            html2 += '     <td><span>' + data[b].Prlist[i].sv_pc_price + '</span></td>';
                        } else {
                            html2 += '     <td><span>0</span></td>';
                        }
                        var sv_pc_pnumber = data[b].Prlist[i].sv_pricing_method == 1 ? data[b].Prlist[i].sv_p_weight : data[b].Prlist[i].sv_pc_pnumber;
                        html2 += '			<td><span class="bggreen">' + sv_pc_pnumber + '</span></td>';
                        html2 += '		<td><span>¥' + data[b].Prlist[i].sv_pc_combined + '</span></td>';
                        html2 += '     <td><span>¥' + data[b].Prlist[i].sv_paid_in_amount + '</span></td>';
                        html2 += '		<td><i></i></td>';
                        html2 += '			<td><span></span></td>';
                        html2 += '			<td></td>';
                        html2 += '		<td><i></i></td>';
                        html2 += '			<td><span></span></td>';
                        html2 += '  </tr>';
                        count += sv_pc_pnumber;
                    }

                    html += ' <tr class="danpintr  clssssss" data-id="' + data[b].sv_pc_noid + '">';
                    html += '    <td> <div class="check-box checknext  "><i><input type="checkbox" name="subbox" data-id="' + data[b].sv_pc_noid + '" data-state=' + data[b].sv_pc_state + '></i></div>  </td>  <td><span>' + data[b].sv_pc_noid + '<span class="orange" title="查看规格详情">多笔</span></span></td>';
                    if (isNullOrWhiteSpace(data[b].sv_suname)) {
                        html += '     <td><span>' + data[b].sv_suname + '</span></td>';
                    }
                    else {
                        html += '     <td><span></span></td>';
                    }

                    if (data[b].Prlist && data[b].Prlist.length > 0 && data[b].Prlist[0] && isNullOrWhiteSpace(data[b].Prlist[0].sv_p_name)) {
                        html += '<td><span class="text-ovtb">' + data[b].Prlist[0].sv_p_name + '</span></td>';
                    } else {
                        html += '<td><span class="text-ovtb"></span></td>';
                    }


                    if (data[b].Prlist && data[b].Prlist.length > 0 && isNullOrWhiteSpace(data[b].Prlist[0].sv_p_unit)) {
                        html += '     <td><span>' + data[b].Prlist[0].sv_p_unit + '</span></td>';
                    } else {
                        html += '     <td><span>无单位</span></td>';
                    }
                    if (data[b].Prlist[0]) {
                        html += '     <td><span>' + (data[b].Prlist[0].sv_pc_price) + '</span></td>';
                    } else {
                        html += '     <td><span>0</span></td>';
                    }
                    var sv_pc_pnumber = 0;
                    if (data[b].Prlist[0]) {
                        var sv_pc_pnumber = data[b].Prlist[0].sv_pricing_method == 1 ? data[b].Prlist[0].sv_p_weight : data[b].Prlist[0].sv_pc_pnumber;
                    }
                    html += '     <td><span class="bggreen">' + sv_pc_pnumber + '</span></td>';
                    html += '     <td><i>¥' + data[b].sv_pc_combined + '</i></td>';
                    html += '     <td><i>¥' + data[b].sv_pc_realpay + '</i></td>';
                    html += '     <td><span>' + data[b].sv_pc_settlement + '</span></td>';
                    html += '<td class="posi"> <i>' + Getstu(data[b].sv_pc_state) + '</i>';
                    if (data[b].sv_pc_state == 0) {
                        html += '<div class="positext"><a href="javascript:void(0);" class="ruku" data-sate="1">审核</a><a href="javascript:void(0);" class="ruku" data-sate="2" >取消审核</a></div></td>';
                    }

                    html += '	<td><span>' + data[b].userName + '</span></td>';
                    html += '     <td><span>' + daye + '</span></td>';
                    html += '     <td>';
                    html += '         <div class="xstbbtn">';
                    html += '             <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a> | <a href="javascript:void(0);" class="showview" data-id="' + data[b].sv_pc_noid + '"> 详情</a>|<a href="#" class="nonebg" onclick="Deke.DeKe_dialog.show_Url2(\'新增入库\', \'/html/procurement/addproc.html?v=a1\', f(1,\'' + data[b].sv_pc_noid + '\',true), [\'860px\', \'550px\']);">复制新增</a>';

                    if (data[b].sv_pc_state != 0) {
                        if (count <= 0) {
                            html += '<span href="javascript:void(0);">已退货</span>';
                        }
                        else {
                            html += '<a href="javascript:void(0);" data-id="' + data[b].sv_pc_noid + '" class="returnGoods">退货</a>';
                        }
                    }

                    html += '         </div>';
                    html += '     </td>';
                    html += '  </tr>';

                    html += '  <tr class="MoreGoodsSale danpicount clssssss" data-id="' + data[b].sv_pc_noid + '" >';
                    html += '    <td> <div class="check-box checknext  "><i><input type="checkbox" name="subbox1"></i></div>  </td>  <td><span class="pull-left text-main">' + data[b].sv_pc_noid + '  <i class=" icon-angle-down okk"></i></span></td>';
                    if (data[b] && isNullOrWhiteSpace(data[b].sv_suname)) {
                        html += '     <td><span>' + data[b].sv_suname + '</span></td>';
                    }
                    else {
                        html += '     <td><span></span></td>';
                    }
                    html += '      <td class="conmios ">';
                    html += '          <span class="pull-left text-main">本次进货数据合计：</span>';
                    html += '          <span class="orange" title="查看规格详情">多笔</span>';
                    html += '          <i class=" icon-angle-down okk"></i>';
                    html += '      </td>';
                    if (data[b].Prlist[0] && isNullOrWhiteSpace(data[b].Prlist[0].sv_p_unit)) {
                        html += '     <td><span>' + data[b].Prlist[0].sv_p_unit + '</span></td>';
                    } else {
                        html += '     <td><span>无单位</span></td>';
                    }
                    if (data[b].Prlist[0] && data[b].Prlist[0].sv_pc_price > 0) {
                        html += '     <td><span>' + data[b].Prlist[0].sv_pc_price + '</span></td>';
                    } else {
                        html += '     <td><span>0</span></td>';
                    }
                    html += '     <td><span class="bggreen">' + count + '</span></td>';

                    html += '     <td><i>¥' + data[b].sv_pc_combined + '</i></td>';
                    html += '     <td><i>¥' + data[b].sv_pc_realpay + '</i></td>';
                    html += '     <td><span>' + data[b].sv_pc_settlement + '</span></td>';
                    html += '<td class="posi"> <i>' + Getstu(data[b].sv_pc_state) + '</i>';


                    html += '	<td><span>' + data[b].userName + '</span></td>';
                    html += '     <td><span>' + daye + '</span></td>';
                    html += '     <td>';
                    html += '         <div class="xstbbtn">';
                    html += '             <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a> ';
                    html += '| <a href="javascript:void(0);" class="showview" data-id="' + data[b].sv_pc_noid + '"> 详情</a>';
                    html += '|<a href="#" class="nonebg" onclick="Deke.DeKe_dialog.show_Url2(\'新增入库\', \'/html/procurement/addproc.html?v=a1\',';
                    html += ' f(1,\'' + data[b].sv_pc_noid + '\',true), [\'860px\', \'550px\']);">复制新增</a>';
                    if (data[b].sv_pc_state != 0) {
                        if (count <= 0) {
                            html += '<span href="javascript:void(0);">已退货</span>';
                        }
                        else {
                            html += '<a href="javascript:void(0);" data-id="' + data[b].sv_pc_noid + '" class="returnGoods">退货</a>';
                        }
                    }
                    html += '         </div>';
                    html += '     </td>';
                    html += '  </tr>';

                    html += html2;
                }
            }

            $("#pplist").html(html);
            var priid = $('.danpintr td:nth-child(2)');

            var sacid = $('.danpicount');
            //多笔订单展开事件    
            priid.click(function () {
                var indexid = $(this).parent().data("id");
                $('.MoreGoodsSale[data-id="' + indexid + '"]').show();
                $('.danpinlisttt[data-id="' + indexid + '"]').addClass('bgf4f4');
                $('.danpinlisttt[data-id="' + indexid + '"]:last').addClass('bot2mon');
                $(this).parent().hide();
            });
            //多笔订单关闭事件 	 	  
            sacid.click(function () {
                var indexid = $(this).attr('data-id');
                $('.MoreGoodsSale[data-id="' + indexid + '"]').hide();
                $('.danpintr[data-id="' + indexid + '"]').show();
            });

            $(".showview").click(function () {

                Deke.DeKe_dialog.show_Url2("查看采购清单", "/html/procurement/showview2.html?v=" + clearCache, f5($(this).data("id")), ['880px', '550px']);
            });

        }

    });

}
function Getstu(id) {
    switch (id) {
        case 0:
            return "待入库";
        case 2:
            return "取消";
        case 1:
            return "已入库";
    }
}

// -------退货处理 ----- // 

$(document).unbind("click", "#pplist .returnGoods").on("click", "#pplist .returnGoods", function () {
    var id = $(this).attr('data-id');
    Deke.DeKe_dialog.show_Url2('采购退货', '/html/procurement/productReturnGoods.html?v=' + clearCache, productReturnGoods(id), ['860px', '550px']);
});

// 采购退货弹窗回调方法
function productReturnGoods(id) {
    setTimeout(function () {
        productReturnGoodsInfo(id, '');
    }, 150);
}

// 加载退货单信息
function productReturnGoodsInfo(id, strid) {
    $("#btnReturnGoods").removeClass("baochun");
    $("#selectproduct").html("");

    $("#numbier").text("DETH" + new Date().Format("yyyyMMddhhmmssS"));
    $('#numbier').html(id);
    $.get("/supplier/GetprocUrementoDall?nober=" + id, function (data) {
        $("#sv_suid").val(data.sv_suid);
        $("#sv_orgwarehouse_id").attr("disabled", "disabled");
        $("#sv_orgwarehouse_id").val(data.sv_orgwarehouse_id);
        if (!isNullOrWhiteSpace($("#sv_orgwarehouse_id").val())) {
            $("._sv_targetwarehouse_id").hide();
        } else {
            $("._sv_targetwarehouse_id").show();
        }
        $("#sv_pc_date").val(new Date(data.sv_pc_date).Format("yyyy-MM-dd hh:mm:ss"));
        $("#cjesssa").val(data.sv_pc_noid);

        var html = '<tr class="{biaoma} {pid} open"  data-pid="{pid}" data-numshu="{numshu}" data-pricingmethod="{pricingmethod}"  data-sv_pc_productid="{sv_pc_productid}"><td class="cltdd"><span></span><em class="new-kks icon-remove-sign"></em></td><td><span>{biaoma}</span></td> <td><span>{name}</span></td><td><span>{danwei}</span></td><td class="lasselec"><input  onkeyup="clearNoNumber_input(this);" type="text" class="update"  value="{numshu}" data-sv_pricing_method={sv_pricing_method}></td><td class="lasselec"><i><input type="text"  onkeyup="clearNoNum(this);" class="update2" readonly value="{jiage}"></i></td><td class="lasselec"><i><input type="text" readonly value="{zhongjia}"></i></td></tr>';
        if (!data.Prlist) {
            data.Prlist = data.prlist;
        }
        for (var i = 0; i < data.Prlist.length; i++) {
            var sv_pc_pnumber = data.Prlist[i].sv_pricing_method == 1 ? data.Prlist[i].sv_p_weight : data.Prlist[i].sv_pc_pnumber;
            $("#selectproduct").append(html.replace(/{pid}/g, data.Prlist[i].product_id)
                .replace(/{pricingmethod}/g, data.Prlist[i].sv_pricing_method)
                .replace(/{sv_pc_productid}/g, data.sv_pc_noid)
                .replace(/{biaoma}/g, data.Prlist[i].sv_p_barcode)
                .replace(/{biaoma}/g, data.Prlist[i].sv_p_barcode)
                .replace(/{name}/g, data.Prlist[i].sv_p_name)
                .replace(/{jiage}/g, data.Prlist[i].sv_pc_price)
                .replace(/{zhongjia}/g, data.Prlist[i].sv_pc_combined)
                .replace(/{danwei}/g, data.Prlist[i].sv_p_unit)
                .replace(/{numshu}/g, sv_pc_pnumber)
                .replace(/{sv_pricing_method}/g, data.Prlist[i].sv_pricing_method));
        }
        if (key == "sv_pc_date") {
            $("#" + key).val(new Date(data[key]).Format("yyyy-MM-dd hh:mm:ss"));
        }


        $("#zhonge").text(data.sv_pc_combined);

        $("#heji").text(data.sv_pc_total);

        $("#shifu").val(data.sv_pc_realpay);

        $("#sv_pc_note").val(data.sv_remark);
        $("#qitafeiyong").val(data.sv_pc_costs);
        $("#sv_pc_settlement").val(data.sv_pc_settlement);

        //heji();
        //if (strid != 1) { layer.close(index); }

    });
}

$(document).unbind("click", ".clacsse").on("click", ".clacsse", function () {
    layer.closeAll();
});

$(document).unbind("click", "#btnReturnGoods").on("click", "#btnReturnGoods", function () {
    rukuchuli();
});

//退货信息保存操作
function rukuchuli() {
    var prname = "";
    var data2 = '[';
    if ($("#selectproduct tr").length < 1)
    {
        layer.msg("没有任何可退的物质！");
        return;
    }

    var isContinue = true;
    $("#selectproduct tr").each(function () {
        //  alert($(this).data("pid"));
        var sv_pc_pnumber = $(this).find("td").eq(4).find("input").val();
        var sv_pc_price = $(this).find("td").eq(5).find("input").val();
        var sv_pc_combined = $(this).find("td").eq(6).find("input").val();
        var numshu = $(this).data("numshu");
        var name = $(this).find("td").eq(2).text() + "," + $(this).find("td").eq(1).text() + ",";
        if (sv_pc_pnumber<1)
        {
            layer.msg(name + "退货数必须填写大于零");
            isContinue = false;
            return;
        }
        if (numshu < sv_pc_pnumber)
        {
            layer.msg(name + "最多可退【" + numshu + "】");
            isContinue = false;
            return;
        }
        
        data2 += '{"product_id":' + $(this).data("pid") + ',"sv_pc_pnumber":' + sv_pc_pnumber + ',"sv_pc_price":' + sv_pc_price + ',"sv_pc_combined":' + sv_pc_combined + ', "sv_pricing_method":' + $(this).data("pricingmethod") + '},';
        prname += name;
    });

    if (!isContinue)
        return;
    data2 = data2.substring(0, data2.length - 1);
    data2 += "]";
    var data = {
        "sv_pc_noid": "DETH" + new Date().Format("yyyyMMddhhmmssS"),
        "sv_orgwarehouse_id": $("#sv_orgwarehouse_id").val() || -1,
        "sv_pc_Operation": $("#sv_pc_Operation").val(),
        "sv_suid": $("#sv_suid").val(),
        "sv_pc_date": $("#sv_pc_date").val(),
        "sv_pc_note": $("#sv_pc_note").val(),
        "sv_pc_combined": $("#zhonge").text(),
        "sv_pc_total": $("#heji").text(),
        "sv_pc_costs": $("#qitafeiyong").val(),
        "sv_pc_settlement": $("#sv_pc_settlement").val(),
        "sv_pc_state": 1,
        "sv_pc_realpay": $("#shifu").val(),
        "sv_productname": prname,
        "sv_associated_code": $("#numbier").text(),    //"DEC" + parseInt(Math.random() * 1000000000000, 10),
        "Prlist": JSON.parse(data2)
    };
    $.ajax({
        url: '/supplier/addsv_purchasereturn',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        async: false,
        success: function (data) {

            loggin.chklogn(data);
            if (data > 0) {
                layer.closeAll();
                layer.msg("退货成功！");
                pageHtml("", "", "", "", "");
            }
            else if (data == -3) {
                layer.msg("其中有产品已经失效！");
            }
            else if (data == -6) {
                layer.msg("仓库不存在！");
            }
            else if (data == -4) {
                layer.msg("当前仓库不存在该商品！");
            }
            else if (data == -7 || data == -2) {
                layer.msg("退货失败，有产品库存不足！");
            }
            else if (data == -8) {
                layer.msg("填写的退货数量都是零！");
            }
            else {
                layer.msg("退货失败！");
                layer.close(index);
            }
        }
    });
}
// -------退货处理 ----- // 