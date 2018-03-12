var is_exist_warehouse = false;
function f56(id) {
    $.get("/supplier/GetreturnprocUrementoDall?nober=" + id, function (data) {
        loggin.chklogn(data);

        $("#stockorderinout").html('<a href="javascript:void(0)" data-action="GetprocUrementoDall" data-id="' + data["sv_associated_code"] + '"><i>' + data["sv_associated_code"] + '</i><i class="paleft10">(进货单号)</i></a><a  data-action="GetreturnprocUrementoDall" class="active" data-id="' + data["sv_pc_noid"] + '"  href="javascript:void(0)"><i>' + data["sv_pc_noid"] + '</i><i class="paleft10">(退货单号)</i></a>');

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

    $(document).unbind("click", "#copynew").on("click", "#copynew", function () {
        var iss = $("#sv_pc_noid").text();
        layer.closeAll();
        Deke.DeKe_dialog.show_Url2('新增入库', '/html/procurement/addproc.html?v=' + clearCache, f(1, iss), ['860px', '550px']);
    });
    

    $(document).unbind("click", "#stockorderinout>a").on("click", "#stockorderinout>a", function () {
        $(this).addClass("active").siblings("a").removeClass("active");
        FunGetPrlist($(this).data("id"), $(this).data("action"));
    })
}


function FunGetPrlist(id, action) {
    $.get("/supplier/" + action + "?nober=" + id, function (data) {
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
            $("#sholist").html("");
            for (var i = 0; i < data.Prlist.length; i++) {
                //alert(JSON.stringify(data.Prlist[i]));
                var sv_pc_pnumber = data.Prlist[i].sv_pricing_method == 1 ? data.Prlist[i].sv_p_weight : data.Prlist[i].sv_pc_pnumber;
                $("#sholist").append("<tr> <td><span>" + (i + 1) + "</span></td><td><span>" + data.Prlist[i].sv_p_barcode + "</span></td> <td><span>" + data.Prlist[i].sv_p_name + "</span></td> <td><span>" + data.Prlist[i].sv_p_unit + "</span></td> <td><span>" + sv_pc_pnumber + "</span></td><td><i>¥" + data.Prlist[i].sv_pc_price + "</i></td> <td><i>¥" + data.Prlist[i].sv_pc_combined + "</i></td> </tr>");
            }
        }
    });
}


function f5(id,strid) {
    $("#selectproduct").html("");
    $.get("/supplier/GetprocUrementoDall?nober=" + id, function (data) {
        loggin.chklogn(data);

        //for (var key in data) {

        //    if (key == "sv_pc_date") {
        //        $("#" + key).text(new Date(data[key]).Format("yyyy-MM-dd hh:mm:ss"));

        //    } else {
        //        $("#" + key).text(data[key]);
        //    }


        //}

        $("#sv_suid").val(data.sv_suid);
        $("#sv_orgwarehouse_id").attr("disabled", "disabled");
        $("#sv_orgwarehouse_id").val(data.sv_targetwarehouse_id);
        if (!isNullOrWhiteSpace($("#sv_orgwarehouse_id").val()))
        {
            $("._sv_targetwarehouse_id").hide();
        } else {
            $("._sv_targetwarehouse_id").show();
        }
        $("#sv_pc_date").val(new Date(data.sv_pc_date).Format("yyyy-MM-dd hh:mm:ss"));
        $("#cjesssa").val(data.sv_pc_noid);

        var html = '<tr class="{biaoma} open"  data-pid="{pid}"  data-numshu="{numshu}" data-pricingmethod="{pricingmethod}"  data-sv_pc_productid="{sv_pc_productid}"><td class="cltdd"><span></span><em class="new-kks icon-remove-sign"></em></td><td><span>{biaoma}</span></td> <td><span>{name}</span></td><td><span>{danwei}</span></td><td class="lasselec"><input  onkeyup="clearNoNumber_input(this);" type="text" class="update"  value="{numshu}" data-sv_pricing_method={sv_pricing_method}></td><td class="lasselec"><i><input type="text"  onkeyup="clearNoNum(this);" class="update2" readonly value="{jiage}"></i></td><td class="lasselec"><i><input type="text" readonly value="{zhongjia}"></i></td></tr>';
        if (!data.Prlist) {
            data.Prlist = data.prlist;
        }
        for (var i = 0; i < data.Prlist.length; i++) {
            var sv_pc_pnumber = data.Prlist[i].sv_pricing_method == 1 ? data.Prlist[i].sv_p_weight : data.Prlist[i].sv_pc_pnumber;
            $("#selectproduct").append(
                html.replace("{pid}", data.Prlist[i].product_id)
                .replace("{pricingmethod}", data.Prlist[i].sv_pricing_method)
                .replace("{sv_pc_productid}", data.sv_pc_noid)
                .replace("{biaoma}", data.Prlist[i].sv_p_barcode)
                .replace("{biaoma}", data.Prlist[i].sv_p_barcode)
                .replace("{name}", data.Prlist[i].sv_p_name)
                .replace("{jiage}", data.Prlist[i].sv_pc_price)
                .replace("{zhongjia}", data.Prlist[i].sv_pc_combined)
                .replace("{danwei}", data.Prlist[i].sv_p_unit)
                .replace(/{numshu}/g, sv_pc_pnumber)
                .replace("{sv_pricing_method}", data.Prlist[i].sv_pricing_method));
        }
        heji();
        if (strid != 1) { layer.close(index); }
        
    });


    //$(document).on("click","#copynew",function () {
    //    var iss = $("#sv_pc_noid").text();
    //    layer.closeAll();
    //    Deke.DeKe_dialog.show_Url2('新增入库', '/html/procurement/addproc.html?v=a1', f(1, iss), ['860px', '550px']);


    //});
    //
}

function f(vv, id) {
    
    $.getJSON("/supplier/supplierlist?id=-1&key=", function (data) {
        loggin.chklogn(data);
        var html = '';
        for (var i = 0; i < data.length; i++) {
            $("#sv_suid").append('<option value="' + data[i].sv_suid + '">' + data[i].sv_suname + '</option>');
        }
        $.get("/WarehouseInfo/GetWarehouse", function (data) {
            if (data != null && data != "") {
                var listhtml = '';
                is_exist_warehouse = true;
                for (var theadKey in data) {
                    listhtml += data[theadKey];
                };
                $('#sv_orgwarehouse_id').html(listhtml);
            }
        });
        $("#Purchasepruct").click(function () {
            index = Deke.DeKe_dialog.show_Url2('选择采购单', '/html/procurement/orderlisthtml.html?v=' + clearCache, f2, ['780px', '540px']);
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
        $("#numbier").text("DECS" + new Date().Format("yyyyMMddhhmmssS"));
    });


    //$(document).unbind("click", ".baochun", function () {
    $(document).unbind("click", ".baochun").on("click", ".baochun",function(){
        rukuchuli();
    });

    $(document).on("click", ".clacsse", function () {
        layer.closeAll();
    });

    //订单保存操作
    function rukuchuli() {
        var prname = "";
        var data2 = '[';

        if ($("#selectproduct tr").length < 1) {
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
            if (sv_pc_pnumber<1) {
                layer.msg(name + "退货数必须填写大于零");
                isContinue = false;
                return false;
            }
            if (numshu < sv_pc_pnumber) {
                layer.msg(name + "最多可退【" + numshu + "】");
                isContinue = false;
                return false;
            }
            //  alert($(this).data("pid"));
            data2 += '{"product_id":' + $(this).data("pid") + ',"sv_pc_pnumber":' + sv_pc_pnumber + ',"sv_pc_price":' + sv_pc_price + ',"sv_pc_combined":' + sv_pc_combined + ', "sv_pricing_method":' + $(this).data("pricingmethod") + '},';
            prname += name;
        });
        if (!isContinue)
            return;
        data2 = data2.substring(0, data2.length - 1);
        data2 += "]";
        var data = { "sv_pc_noid": $("#numbier").text(), "sv_orgwarehouse_id": $("#sv_orgwarehouse_id").val() || -1, "sv_pc_Operation": $("#sv_pc_Operation").val(), "sv_suid": $("#sv_suid").val(), "sv_pc_date": $("#sv_pc_date").val(), "sv_pc_note": $("#sv_pc_note").val(), "sv_pc_combined": $("#zhonge").text(), "sv_pc_total": $("#heji").text(), "sv_pc_costs": $("#qitafeiyong").val(), "sv_pc_settlement": $("#sv_pc_settlement").val(), "sv_pc_state": 1, "sv_pc_realpay": $("#shifu").val(), "sv_productname": prname, "sv_associated_code": $("#cjesssa").val(), "Prlist": JSON.parse(data2) };
        $.ajax({
            url: '/supplier/addsv_purchasereturn',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            async: false,
            success: function (data) {
                loggin.chklogn(data);
                if (data > 0) {
                    // getpage('');
                    layer.closeAll();
                    layer.msg("退货单创建成功！");
                    //  alert(news);
                    //if (news == 1) {
                    //    Deke.DeKe_dialog.show_Url2('新增入库', '/html/procurement/addproc.html?v=q74', f, ['860px', '550px']);
                    //}
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
                else {
                    layer.msg("退货失败，有产品库存不足！");
                    layer.close(index);
                }
            }
        });

    }

    ////回击选择产品
    $(document).on("keypress", "#cjesssa", function (e) {
        if (e.keyCode == 13) {
            f5($("#cjesssa").val(),1);
            //$.getJSON("/AjaxProduct/GetProductDetail_bid?id=" + $("#cjesssa").val(), function (data) {
            ////    alert(JSON.stringify());
            //    if (data.sv_p_barcode != null) {
            //        if ($("." + data.sv_p_barcode + "").length == 0) {

            //            $("#selectproduct").append(html.replace("{pid}", data.product_id).replace("{biaoma}", data.sv_p_barcode).replace("{biaoma}", data.sv_p_barcode).replace("{name}", data.sv_p_name).replace("{jiage}", parseFloat(data.sv_p_originalprice)).replace("{zhongjia}", parseFloat(data.sv_p_originalprice)).replace("{danwei}", data.sv_p_unit));
            //        } else {

            //            layer.msg("产品已经在列表中");
            //        }
            //        heji();
            //        $("#cjesssa").val("").focus();
            //    } else {


            //        layer.msg("商品不存在");

            //    }
            //});
        }
    });
}
///选择产品确认方法
function citr() {
    var html = '<tr class="{biaoma} open"  data-pid="{pid}" ><td class="cltdd"><span></span><em class="new-kks icon-remove-sign"></em></td><td><span>{biaoma}</span></td> <td><span>{name}</span></td><td><span>{danwei}</span></td><td class="lasselec"><input  onkeyup="clearNoNum(this);" type="text" value="1" class="update" ></td><td class="lasselec"><i><input type="text"  onkeyup="clearNoNum(this);" class="update2" value="{jiage}"></i></td><td class="lasselec"><i><input type="text" readonly value="{zhongjia}"></i></td></tr>';
    $('input[name="subbox"]:checked').each(function () {
        var sd = $(this).parent().parent().parent().parent().find("td");
        if ($("." + sd.eq(1).text() + "").length == 0) {
            $("#selectproduct").append(html.replace("{pid}", $(this).parent().parent().parent().parent().data("pid")).replace("{biaoma}", sd.eq(1).text()).replace("{biaoma}", sd.eq(1).text()).replace("{name}", sd.eq(2).text()).replace("{jiage}", parseFloat(sd.eq(3).text().replace("¥", ""))).replace("{zhongjia}", parseFloat(sd.eq(3).text().replace("¥", ""))).replace("{danwei}", sd.eq(4).text()));
        }
    });

    heji();
    layer.close(index);
}

//计算专用方法
function heji() {
    var ite = 0.00;
    $("#selectproduct tr").each(function () {
        ite += parseFloat($(this).find("td").eq(6).find("input").val());
    });

    $("#zhonge").text(Math.round(ite * 100) / 100);

    if ($("#qitafeiyong").val() != "") {
        ite += parseFloat($("#qitafeiyong").val());
    }
    ite = Math.round(ite * 100) / 100;
    $("#shifu").val(ite);
    $("#heji").text(ite);
}
//产品方法
function f2() {
    //加载产品分类信息
    $.getJSON("/supplier/get_procurement?page=1&top=200", function (data) {
        var html = "";
        for (var b = 0; b < data.length; b++) {
            if (data[b].sv_pc_state == 1) {
                //   html += '<li class="click_view" data-id="' + data[i].productcategory_id + '"><a href="javascript:void(0);"><i>[' + data[i].productcategory_id + ']</i>' + data[i].sv_pc_name + '</a></li>';
                daye = new Date(data[b].sv_pc_date).Format("yyyy-MM-dd hh:mm:ss");
                html += ' <tr>';
                html += ' <td><span>' + (b + 1) + '</span></td>';
                html += ' <td><span>' + data[b].sv_pc_noid + '</span></td>';
                html += '<td><span>' + data[b].sv_suname + '</span></td>';
                html += ' <td><i>¥' + data[b].sv_pc_combined + '</i></td>';
                html += ' <td><i>¥' + data[b].sv_pc_realpay + '</i></td>';
                html += '  <td><span class="bggreen">' + Getstu(data[b].sv_pc_state) + '</span></td>';
                html += ' <td><span>' + daye + '</span></td>';
                html += ' <td><a href="javascript:void(0);" style="color: #6888ff;" class="select_order" onclick="f5(\'' + data[b].sv_pc_noid + '\')" data-id="' + data[b].sv_pc_noid + '">选择</a></td>';
                html += '</tr>';
            }
        }
        $("#orderlist").html(html);
    });
}

function Getproduct(classid, pageIndex) {
    //查询
    $.getJSON('/AjaxProduct/GetProductList', {
        category: classid,
        pageIndex: pageIndex || 1,
        producttype_id: 0,
        pageSize: 20   //每页记录数
    },
    function (res) { //从第1页开始请求。返回的json格式可以任意定义
        var data = res.list;
        var html = "";
        if (data.length > 0) {

            for (var i = 0; i < data.length; i++) {
                html += '<tr data-pid="' + data[i].product_id + '"><td><div class="check-box "><i><input type="checkbox"  name="subbox"></i></div></td><td>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</td> <td><span>' + (data[i].sv_p_name == null ? "" : data[i].sv_p_name) + '</span></td><td><i>¥' + data[i].sv_p_originalprice + '</i></td><td>' + data[i].sv_p_unit + '</td> </a></tr>';
            }
        }
        $("#product_tbody").html(html);

        //分页
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
                    Getproduct(classid, e.curr);
                }
            }
        });
    });
}

$(document).ready(function () {
    $("#querryssee").click(function () {
        pageHtml("", $("#dahaono").val(), $("#prcode").val(), $("#ghuoshan").val(), $("#pcname").val());
    });

    $("#qingkong").click(function () {
        $("#dahaono").val('');
        $("#prcode").val(''); $("#ghuoshan").val(''); $("#pcname").val('');
    });

    //高级搜索的点击事件
    $('.gjsearch').on('click', '.Gjsoubtn ', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open').html("高级搜索");
            $('.sideseach').fadeOut('250').find('ul').slideUp('250');
        } else {
            $(this).addClass('open').html("收起搜索");
            $('.sideseach').fadeIn('250').find('ul').slideDown('250');
        }
    });

    $(document).on("change", ".update", function () {
        var bd = $(this).parent().next().find("input").val();
        var p = parseFloat($(this).val());
        p = p * bd;
        p = Math.round(p * 100) / 100
        $(this).parent().next().next().find("input").val(p);
        heji();
    });

    $(document).on("change", ".update2", function () {
        var bd = parseFloat($(this).parent().parent().prev().find("input").val());
        var p = parseFloat($(this).val());
        p = p * bd;
        p = Math.round(p * 100) / 100
        $(this).parent().parent().next().find("input").val(p);
        heji();
    });

    $("#qitafeiyong").change(function () {

        heji();
    });

    $(document).on('click', '.new-kks', function () {
        $(this).parents('tr').slideUp('fast', function () {
            $(this).remove();
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
    });

    $("#key").keypress(function (e) {
        if (e.keyCode == 13) {
            pageHtml($("#key").val(), "", "", "", "");
        }
    });

    $("#refresh").click(function () {
        pageHtml("", "", "", "", "");

    });

    pageHtml("", "", "", "", "");

    ///日期搜索
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

    //会员选择
    $('.stecs i').click(function () {
        $(this).parent().toggleClass('on').siblings().removeClass('on');
        if ($(this).parent().is(".on")) {
            pageHtml("", "", $(this).parent().data("day"));
        } else {
            pageHtml("", "", "", "", "");
        }
    });

    $(document).on("click", ".ruku", function () {
        $.post("/supplier/updatesv_procurement", { "id": $(this).parent().parent().parent().data("id"), "sate": $(this).data("sate") }, function (data) {
            loggin.chklogn(data);
            if (data) {
                layer.msg("操作成功");
                pageHtml("", "", "", "", "");
            } else {
                layer.msg("操作失败");
            }
        });
    });
});

//控制整数和2位小数（应该做公共）
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数

}
//加载列表
function pageHtml(key, dahaono, prcode, ghuoshan, pcname) {
    //  day = day || 0;
    //初始化分页内容
    $.get("/supplier/get_returnprocurementcount/?dahaono=" + dahaono + "&key=" + key + "&prcode=" + prcode + "&ghuoshan=" + ghuoshan + "&pcname=" + pcname, function (data) {
        // $("#User_cout").text(data);
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
                Glist(e.curr, key, dahaono, prcode, ghuoshan, pcname);
            }
        });
    });

}

function Glist(page, key, dahaono, prcode, ghuoshan, pcname) {
    var html = "";
    $.getJSON("/supplier/get_returnprocurement?page=" + page + "&dahaono=" + dahaono + "&key=" + key + "&prcode=" + prcode + "&ghuoshan=" + ghuoshan + "&pcname=" + pcname, function (data) {

        for (b = 0; b < data.length; b++) {
            daye = new Date(data[b].sv_pc_date).Format("yyyy-MM-dd hh:mm:ss");
            //html += '<tr data-id="' + data[b].sv_pc_noid + '"> <td > <div class="check-box "><i><input type="checkbox" name="subbox"></i></div></td> <td  class="showview"><span>' + daye + '</span></td><td class="showview"><span>' + data[b].sv_pc_noid + '</span></td>';
            //html += '<td class="showview" ><span>' + data[b].sv_suname + '</span></td>';
            ////html += ' <td class="showview" ><span>' + data[b].sv_productname + '</span></td>';
            //html += '<td class="showview" ><i>¥' + data[b].sv_pc_combined + '</i></td>';
            //html += '<td class="showview" ><i>¥' + data[b].sv_pc_realpay + '</i></td>';
            //html += '<td class="posi"> <i>' + Getstu(data[b].sv_pc_state) + '</i>';
            //if (data[b].sv_pc_state == 0) {
            //    html += '<div class="positext"><a href="javascript:void(0);" class="ruku" data-sate="1">直接入库</a><a href="javascript:void(0);" class="ruku" data-sate="2" >取消入库</a></div></td>';
            //} else {

            //    html += '<div class="positext"><a href="javascript:void(0);"  class="open">直接入库</a><a href="javascript:void(0);" class="open">已通知前台</a></div></td>';
            //}
            //html += '<td><a href="#" class="nonebg" onclick="Deke.DeKe_dialog.show_Url2(\'新增入库\', \'/html/procurement/addproc.html?v=a1\', f(1,\'' + data[b].sv_pc_noid + '\'), [\'860px\', \'550px\']);">复制新增</a></td>';
            //html += '</tr>';
            data[b].Prlist = data[b].prlist;
            if (data[b].Prlist.length == 1) {
                html += ' <tr class="danpinlisttt" data-id="' + data[b].sv_pc_noid + '">  <td> <div class="check-box "><i><input type="checkbox" name="subbox"></i></div>  </td>';
                html += '     <td><span>' + data[b].sv_pc_noid + '</span></td>';
                if (isNullOrWhiteSpace(data[b].sv_suname)) {
                    html += '     <td><span>' + data[b].sv_suname + '</span></td>';
                }
                else {
                    html += '     <td><span></span></td>';
                }
                if (isNullOrWhiteSpace(data[b].Prlist[0].sv_p_name)) {
                    html += '     <td><span class="text-ovtb">' + data[b].Prlist[0].sv_p_name + '</span></td>';
                }
                else {
                    html += '     <td><span class="text-ovtb"></span></td>';
                }
                html += '     <td><span>' + data[b].Prlist[0].sv_p_barcode + '</span></td>';
                var sv_pc_pnumber = data[b].Prlist[0].sv_pricing_method == 1 ? data[b].Prlist[0].sv_p_weight : data[b].Prlist[0].sv_pc_pnumber;
                html += '     <td><span class="bggreen">' + sv_pc_pnumber + '</span></td>';
                var sv_p_unit = data[b].Prlist[0].sv_p_unit != null && data[b].Prlist[0].sv_p_unit != '' ? data[b].Prlist[0].sv_p_unit : '';
                html += '     <td><span>' + sv_p_unit + '</span></td>';
                html += '     <td><i>¥' + data[b].Prlist[0].sv_pc_combined + '</i></td>';
                html += '     <td><span>' + daye + '</span></td>';
                html += '     <td>';
                html += '         <div class="xstbbtn">';
                html += '             <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a> | <a href="javascript:void(0);" class="showview" data-id="' + data[b].sv_pc_noid + '"> 详情</a>';
                html += '         </div>';
                html += '     </td>';
                html += ' </tr>';

            } else {
                var html2 = "";
                var count = 0;
                for (var i = 0; i < data[b].Prlist.length; i++) {
                    html2 += '<tr class="MoreGoodsSale danpinlisttt" data-id= "' + data[b].sv_pc_noid + '">';
                    html2 += '   	 	   <td></td>';
                    html2 += '		<td><span></span></td>';
                    html2 += '		<td><span></span></td>';
                    html2 += '			<td><span class="text-ovtb">' + data[b].Prlist[i].sv_p_name + '</span></td>';
                    html2 += '			<td><span>' + data[b].Prlist[i].sv_p_barcode + '</span></td>';
                    var sv_pc_pnumber = data[b].Prlist[i].sv_pricing_method == 1 ? data[b].Prlist[i].sv_p_weight : data[b].Prlist[i].sv_pc_pnumber;
                    html2 += '			<td><span class="bggreen">' + sv_pc_pnumber + '</span></td>';
                    var sv_p_unit = data[b].Prlist[i].sv_p_unit != null && data[b].Prlist[i].sv_p_unit != '' ? data[b].Prlist[i].sv_p_unit : ' ';
                    html2 += '		<td><span>' + sv_p_unit + '</span></td>';
                    html2 += '		<td><i>¥' + data[b].Prlist[i].sv_pc_combined + '</i></td>';
                    html2 += '			<td><span></span></td>';
                    html2 += '			<td></td>';
                    html2 += '  </tr>';
                    count += sv_pc_pnumber;
                }



                html += ' <tr class="danpintr  clssssss" data-id="' + data[b].sv_pc_noid + '">';
                html += '      <td>';
                html += '          <div class="check-box "><i><input type="checkbox" name="subbox"></i></div>';
                html += '      </td>';
                html += '      <td><span>' + data[b].sv_pc_noid + ' <span class="orange" title="查看规格详情">多笔</span></span></td>';
                if (isNullOrWhiteSpace(data[b].sv_suname)) {
                    html += '      <td><span>' + data[b].sv_suname + '</span></td>';
                }
                else {
                    html += '      <td><span></span></td>';
                }
                if (data != null && data.length > b && data[b].Prlist != null && data[b].Prlist.length > 0 && data[b].Prlist[0] != null && data[b].Prlist[0].sv_p_name!=null) {
                   
                        html += '      <td><span><span class="text-ovtb">' + data[b].Prlist[0].sv_p_name + '</span></td>';
               
                }
                else {
                    html += '      <td><span></span></td>';
                }
                if (data != null && data.length > b && data[b].Prlist != null && data[b].Prlist.length > 0 && data[b].Prlist[0] != null && data[b].Prlist[0].sv_p_barcode!=null) {
                        html += '      <td><span>' + data[b].Prlist[0].sv_p_barcode + '</span></td>';
                    } else {
                        html += '      <td><span> </span></td>';
                    }
                    var sv_pc_pnumber="";
                    if (data != null && data.length > b && data[b].Prlist != null && data[b].Prlist.length > 0 && data[b].Prlist[0] != null) {
                        sv_pc_pnumber = data[b].Prlist[0].sv_pricing_method == 1 ? data[b].Prlist[0].sv_p_weight : data[b].Prlist[0].sv_pc_pnumber;
                    }
                    html += '      <td><span class="bggreen">' + sv_pc_pnumber + '</span></td>';
                    var sv_p_unit="";
                    if (data != null && data.length > b && data[b].Prlist != null && data[b].Prlist.length > 0 && data[b].Prlist[0] != null) {
                        sv_p_unit = data[b].Prlist[0].sv_p_unit != null && data[b].Prlist[0].sv_p_unit != '' ? data[b].Prlist[0].sv_p_unit : '';
                    }
                    html += '      <td><span>' + sv_p_unit + '</span></td>';
                    if (data != null && data.length > b && data[b].Prlist != null && data[b].Prlist.length > 0 && data[b].Prlist[0] != null && data[b].Prlist[0].sv_pc_combined!=null) {
                        html += '      <td><i>¥' + data[b].Prlist[0].sv_pc_combined + '</i></td>';
                    } else{
                        html += '      <td><i>¥0.00</i></td>';
                    }
                    html += '      <td><span>' + daye + '</span></td>';
                    html += '      <td>';
                    html += '          <div class="xstbbtn">';
                    html += '              <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a> | <a href="javascript:void(0);" class="showview" data-id="' + data[b].sv_pc_noid + '" > 详情</a>';
                    html += '          </div>';
                    html += '      </td>';
                    html += '  </tr>';

                    html += '  <tr class="MoreGoodsSale danpicount clssssss" data-id="' + data[b].sv_pc_noid + '">';
                    html += '      <td>';
                    html += '          <div class="check-box "><i><input type="checkbox" name="subbox"></i></div>';
                    html += '      </td>';
                    html += '      <td><span>' + data[b].sv_pc_noid + '</span></td>';
               
                if (isNullOrWhiteSpace(data[b].sv_suname)) {
                    html += '      <td><span>' + data[b].sv_suname + '</span></td>';
                }
                else {
                    html += '      <td><span></span></td>';
                }
                html += '      <td class="conmios ">';
                html += '          <span class="pull-left text-main">本次退货数据合计：</span>';
                html += '          <span class="orange" title="查看规格详情">多笔</span>';
                html += '          <i class=" icon-angle-down okk"></i>';
                html += '      </td>';
                html += '      <td><span></span></td>';
                html += '      <td><span class="bggreen">' + count + '</span></td>';
                html += '      <td><span></span></td>';
                if (data != null && data.length > b && data[b].Prlist != null && data[b].Prlist.length > 0 && data[b].Prlist[0] != null && data[b].Prlist[0].sv_pc_combined!=null) {
                    html += '      <td><i>¥' + data[b].Prlist[0].sv_pc_combined + '</i></td>';
                } else { 
                    html += '      <td><i>¥0.00</i></td>';
                }
                html += '      <td><span>' + daye + '</span></td>';
                html += '      <td>';
                html += '          <div class="xstbbtn">';
                html += '              <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a> | <a href="javascript:void(0);"  class="showview" data-id="' + data[b].sv_pc_noid + '"> 详情</a>';
                html += '          </div>';
                html += '      </td>';
                html += '  </tr>';
                html += html2;
            
            }
            //<tr style="text-align: left;background-color:#ECECEC;"><td colspan=\"8\" ><table  class="table table-striped  table-hover"><thead><tr><th>序号</th> <th>商品编号</th>  <th>商品名称</th> <th>单位</th><th>数量</th><th>单价</th> <th>合计</th> </tr> </thead>
            //for (var i = 0; i < data[b].Prlist.length; i++) {
            //    //alert(JSON.stringify(data.Prlist[i]));
            //    html +="<tr style=\"height: 32px;\"> <td><span>" + (i + 1) + "</span></td><td style='text-align: left;'><span>" + data[b].Prlist[i].sv_p_barcode + "</span></td> <td><span>" + data[b].Prlist[i].sv_p_name + "</span></td> <td><span>" + data[b].Prlist[i].sv_p_unit + "</span></td> <td><span>" + data[b].Prlist[i].sv_pc_pnumber + "</span></td><td><i>¥" + data[b].Prlist[i].sv_pc_price + "</i></td> <td><i>¥" + data[b].Prlist[i].sv_pc_combined + "</i></td> </tr>";
            //}
            //html += "</table></td></tr>";
        }

        $("#pplist").html(html);
        var priid = $('.danpintr');
        var sacid = $('.danpicount');
        //多笔订单展开事件    
        priid.click(function () {
            var indexid = $(this).data("id");
            $('.MoreGoodsSale[data-id="' + indexid + '"]').show();
            $('.danpinlisttt[data-id="' + indexid + '"]').addClass('bgf4f4');
            $('.danpinlisttt[data-id="' + indexid + '"]:last').addClass('bot2mon');
            $(this).hide();
        });
        //多笔订单关闭事件 	 	  
        sacid.click(function () {
            var indexid = $(this).data("id");
            $('.MoreGoodsSale[data-id="' + indexid + '"]').hide();
            $('.danpintr[data-id="' + indexid + '"]').show();
        });

        $(".showview").click(function () {

            Deke.DeKe_dialog.show_Url2("查看采购退货清单", "/html/procurement/showview2.html?v=" + clearCache + 100, f56($(this).data("id")), ['880px', '550px']);

        });
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