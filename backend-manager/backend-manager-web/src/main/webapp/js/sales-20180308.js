var ias = 0; count = 0; jie = 0; order_id = "0"; product_id = 0; pageinxe = 1;
var sales_pagesize = 6;
$(document).ready(function () {
    GetStorelist();
    GetOperaterList();
    //筛选事件的弹出事件	
    $('#shuaixuanbit').click(function () {
        $(this).toggleClass('open');
        $('.shuaixuanbox').slideToggle(500);
    });
    //店铺筛选
    $("#payselect,#type,#StoreSearch,#sellerlist,#order_source_select").change(function () {
        var date = !isNullOrWhiteSpace($("#date").val()) ? "" : $("#date").val();
        var date2 = !isNullOrWhiteSpace($("#date2").val()) ? "" : $("#date2").val();

        getpage($("#payselect").val(), $("#type").val(), $(".bzhxdaohang li.active").data("val"), "", "", date, date2, $('#StoreSearch').val(), $("#sellerlist").val(), $('#order_source_select').val());
    });

    //销售详情的点击更改的事件
    $('.xsqxbtngg').click(function () {
        if ($(this).siblings('.boom').hasClass('minone')) {
            $(this).siblings('.boom').removeClass('minone');
            $(this).siblings('em').addClass('minone');
            $(this).html('保存');

        } else {
            $(this).siblings('.boom').addClass('minone');
            $(this).siblings('em').removeClass('minone');
            $(this).html('更改');

        }
    });
    $("#woyaochaxue").click(function () {
        getpage($("#payselect").val(), $("#type").val(), $(".bzhxdaohang li.active").data("val"), "", "", $("#date").val(), $("#date2").val(), $('#StoreSearch').val(), $("#sellerlist").val(), $('#order_source_select').val());
    });

    getNowFormatDate("date", "date2");
    //选择今日 昨天本月 上月的点击事件
    $('.bzhxdaohang li ,.znfxhyxqbox .bzhxdaohang li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $('.znfxhyxqbox .bzhxdaohang li').index(this);
        $('.winlvom>div').eq(index).fadeIn().siblings().fadeOut(0);

        if ($(this).data("val") != 3) {
            // alert($(this).data("val"));
            getpage($("#payselect").val(), $("#type").val(), $(this).data("val"), $("#txtSalesSeachStr").val(), $("#liushui").val(), "", "", $('#StoreSearch').val(), $("#sellerlist").val(), $('#order_source_select').val());
        }
        //点击其他显示时间选择
        if ($('.qitbbb').hasClass('active')) {

            $('.sjxuantime').fadeIn(250);
        } else {
            $('.sjxuantime').hide(150);
        }
    });

    var start = {
        elem: '#date',
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
    var end = {
        elem: '#date2',
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

    //设置初始时间值


    getpage("", "", 1, "", "", "", "", "");

    $("#saleslist").on("click", ".zxsfxthcl", function () {
        if (!$(this).parent().parent().parent().hasClass("greyRender")) {
            product_id = $(this).data("prid");
            order_id = $(this).data("id");
            Deke.DeKe_dialog.show_Url2("整单退货", "/html/tuhuo/tuhuo.html?v=" + clearCache + 100, f2, ["440px", "270px"]);
        }

    });

    $("#saleslist").on("click", ".xsfxthcl", function () {
        if (!$(this).parent().parent().parent().hasClass("greyRender")) {
            Deke.DeKe_dialog.show_Url2("退货处理", "/html/tuhuo/tuhuo2.html?v=" + clearCache + 200, f($(this).data('pricingmethod'), $(this).data('productnum'), $(this).attr('data-orderprid')), ["440px", "310px"]);
            //   alert($(this).data("id"));
            product_id = $(this).data("prid");
            order_id = $(this).data("id");
        }
    });

    $("#saleslist").on("click", ".dayin", function () {
        // alert("sss");
        var everyday_serialnumber = $(this).parent("div").parent("td").parent("tr").children("td").eq(2).find("span").text();
        if (!$(this).parent().parent().parent().hasClass("greyRender")) {
            $.getJSON("/intelligent/returensalesprint?order_id=" + $(this).data("id"), function (data) {
                data.prdata["user"] = data.myuser;
                //处理称重商品的数量
                var pddata_temp = data.prdata;
                if (pddata_temp && pddata_temp.prlist && pddata_temp.prlist.length > 0) {
                    for (var i = 0; i < pddata_temp.prlist.length; i++) {
                        var product_num = pddata_temp.prlist[i].sv_pricing_method == 1 ? pddata_temp.prlist[i].sv_p_weight : pddata_temp.prlist[i].product_num;
                        pddata_temp.prlist[i].product_num = product_num;
                    }
                }
                if (_g_everyDaySerialNumber) {
                    data.prdata.order_running_id = everyday_serialnumber;
                }
                //Cef.openMyPc(JSON.stringify(data.prdata), JSON.stringify(data.peizhi), 0, 1, '' + receptionPtNum + '', receptionPtName);  //替换为自定义打印
                pushprintData(JSON.stringify(data.prdata), JSON.stringify(data.peizhi), 0, null, null, null, true);

            });
        }
    });
    //导出
    $("#Export").click(function () {
        layer.load();
        $.getJSON("/intelligent/GetIntelligentSalesList/", { "payname": $("#payselect").val(), "type": $("#type").val(), "day": $(".bzhxdaohang li.active").data("val"), "key": $("#txtSalesSeachStr").val(), "liushui": $("#liushui").val(), "date": $("#date").val(), "date2": $("#date2").val(), "storeid": $('#StoreSearch').val(), "isexport": 1, "product": $("#filter_product_info").val() }, function (data) {
            layer.closeAll();
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

    $(document).on("clcik", ".qixiao", function () {

        layer.closeAll();
        product_id = 0;
        order_id = "0";

    });

    $("#txtSalesSeachStr").keydown(function (e) {

        if (e.keyCode == 13) {
            getpage($("#payselect").val(), $("#type").val(), $(".bzhxdaohang li.active").data("val"), $("#txtSalesSeachStr").val(), "", $("#date").val(), $("#date2").val(), $('#StoreSearch').val(), $("#sellerlist").val(), $('#order_source_select').val());
        }
    });

    $("#btn-tiny").click(function () {
        getpage($("#payselect").val(), $("#type").val(), $(".bzhxdaohang li.active").data("val"), $("#keyk").val(), $("#liushui").val(), $("#date").val(), $("#date2").val(), $('#StoreSearch').val(), $("#sellerlist").val(), $('#order_source_select').val());
    });

});


function f(pricingmethod, productnum, order_product_id) {
    setTimeout(function () {
        $("#return_num").attr('data-sv_pricing_method', pricingmethod);
        // 关闭窗口
        $('#btnwindowsClose').click(function () {
            layer.closeAll();
        });

        $("#dantuhuo").click(function () {
            var return_num = $("#return_num").val().trim();
            if (return_num == null || return_num == '' || return_num == undefined) {
                layer.msg("单品退货必须输入数量");
            }
            else if (parseFloat(return_num) > productnum) {
                layer.msg("对不起，您退货的数量超过购买的数量，请核对！");
            }
            else {
                disableButton("dantuhuo");
                $.post("/intelligent/returensales", {
                    "rankDemotion": rankDemotion,
                    "availableIntegralSwitch": availableIntegralSwitch,
                    "rankPromotionIsON": rankPromotionIsON,
                    "MembershipGradeGroupingIsON": MembershipGradeGroupingIsON,
                    "order_id": order_id,
                    "return_cause": $("#return_cause").val(),
                    "return_remark": $("#return_remark").val(),
                    "return_num": $("#return_num").val(),
                    "return_pordcot": product_id,
                    "return_type": 1,
                    "order_product_id": parseInt(order_product_id)
                }, function (data) {
                    if (data == -2) {
                        enabledButton("dantuhuo");
                        layer.msg("对不起，您退货的数量超过购买的数量，请核对！");
                        layer.close(iis);
                    } else if (data == 0) {
                        enabledButton("dantuhuo");
                        layer.msg("对不起，操作退货失败，请刷新重试");
                        layer.close(iis);
                    }
                    else if (data == 1) {
                        $.post("/intelligent/CreditReturnGoods", {
                            "order_id": order_id,
                            "return_cause": $("#return_cause").val(),
                            "return_remark": $("#return_remark").val(),
                            "return_num": $("#return_num").val(),
                            "return_pordcot": product_id,
                            "return_type": 1,
                            "order_product_id": parseInt(order_product_id)
                        }, function (CreditReturnGoodsModel) {
                            if (CreditReturnGoodsModel && parseFloat(CreditReturnGoodsModel.noReimbursement || 0) != 0 && parseFloat(CreditReturnGoodsModel.hasBeenPayment || 0) != 0) {
                                layer.open({
                                    title: '赊账退货'
                                    , content: "共欠金额" + (CreditReturnGoodsModel.noReimbursement + CreditReturnGoodsModel.hasBeenPayment) + "元，已还款" + CreditReturnGoodsModel.hasBeenPayment + "元"
                                });
                            }
                        });

                        enabledButton("dantuhuo");
                        layer.closeAll();
                        layer.msg("操作成功");
                        product_id = 0;
                        order_id = "0";
                        getList($("#payselect").val(), pageinxe, $("#type").val(), 1, "", "", "", "", $('#StoreSearch').val(), $("#sellerlist").val(), $('#order_source_select').val());
                    }
                    else if (data == -3) {
                        enabledButton("dantuhuo");
                        layer.msg("对不起，您没有该功能操作权限，找您的老板开通吧！");
                        layer.close(iis);
                    }
                    else {
                        enabledButton("dantuhuo");
                        layer.msg("操作失败请稍后重试！");
                        layer.close(iis);
                    }
                });
            }
        });
    }, 100);
}


function f2() {
    // 关闭窗口
    $('#btnwindowsClose').click(function () {
        layer.closeAll();
    });

    $("#dantuhuo1").click(function () {
        if ($("#return_num") == "") {
            layer.msg("单品退货必须输入数量");
        }
        else {
            disableButton("dantuhuo1");
            $.post("/intelligent/returensales", { "rankDemotion": rankDemotion, "availableIntegralSwitch": availableIntegralSwitch, "rankPromotionIsON": rankPromotionIsON, "MembershipGradeGroupingIsON": MembershipGradeGroupingIsON, "order_id": order_id, "return_cause": $("#return_cause").val(), "return_remark": $("#return_remark").val(), "return_num": 0, "return_pordcot": 0, "return_type": 0 }, function (data) {
                if (data == -2) {
                    enabledButton("dantuhuo1");
                    layer.msg("对不起，您退货的数量超过购买的数量，请核对！");
                    layer.close(iis);
                } else if (data == 0) {
                    enabledButton("dantuhuo1");
                    layer.msg("对不起，操作退货失败，请刷新重试");
                    layer.close(iis);
                }
                else if (data == -3) {
                    enabledButton("dantuhuo1");
                    layer.msg("你没有该操作权限");
                    layer.close(iis);
                }
                else {
                     $.post("/intelligent/CreditReturnGoods", {
                        "order_id": order_id,
                        "return_cause": $("#return_cause").val(),
                        "return_remark": $("#return_remark").val(),
                        "return_num": 0,
                        "return_pordcot": 0,
                        "return_type": 0
                    }, function (CreditReturnGoodsModel) {
                        if (CreditReturnGoodsModel && parseFloat(CreditReturnGoodsModel.noReimbursement || 0) != 0 && parseFloat(CreditReturnGoodsModel.hasBeenPayment || 0) != 0) {
                            layer.open({
                                title: '赊账退货'
                                , content: "共欠金额" + (CreditReturnGoodsModel.noReimbursement + CreditReturnGoodsModel.hasBeenPayment) + "元，已还款" + CreditReturnGoodsModel.hasBeenPayment + "元"
                            });

                        }
                    });

                    enabledButton("dantuhuo1");
                    layer.closeAll();
                    layer.msg("操作成功");
                    product_id = 0;
                    order_id = "0";
                    getList($("#payselect").val(), pageinxe, $("#type").val(), 1, "", "", "", "", $('#StoreSearch').val(), $("#sellerlist").val(), $('#order_source_select').val());
                }
            });
        }
    });
}

function getpage(payname, type, day, key, liushui, date, date2, storesearch, seller, orderSource) {
    getList(payname, pageinxe, type, day, key, liushui, date, date2, storesearch, seller, orderSource);
}

function getList(payname, page, type, day, key, liushui, date, date2, storesearch, seller, orderSource) {
    var html = '<thead><tr>';
    if (_g_sv_uit_cache_name == 'cache_name_catering') {
        html += '<th>菜品名称</th>';
    }
    else {
        html += '<th>商品名称</th>';
    }
    html += ' <th>单号</th>';
    if (_g_everyDaySerialNumber) {
        html += '<th>每日流水号</th>';
    }
    html += '<th>消费对象</th>';
    html += '<th>商品单价</th><th>折扣类型</th>';
    html += '<th>数量</th><th>销售金额</th>';
    html += '<th>支付方式</th><th>消费店铺</th>';
    html += '<th>所属店铺</th><th>消费时间</th>';
    if (_g_sv_uit_cache_name == 'cache_name_catering') {
        html += '<th>口味</th>';
    }
    html += '<th>备注</th><th>操作</th></tr>';
    html += '</thead>';
    html += '<tbody>';
    var loadIndex = commonOpenLoading(); // loading
    $.getJSON("/intelligent/GetIntelligentSalesList/", {
        "payname": payname, "type": type, "day": day, "key": key, "liushui": liushui, "date": date, "date2": date2, "storeid": storesearch, "seller": seller, "product": $("#filter_product_info").val(), "page": page, "pagesize": sales_pagesize, "orderSource": orderSource
    }, function (result) {
        if (result) {
            commonCloseLoading(loadIndex);
            //统计数据
            var data = [];
            data.push(result.rowCount);
            data.push(result.productCount);
            data.push(result.totalAmount);
            if (data && data != null && data != '') {
                $("#saa").text(data[0]);
                $("#count").text(data[1]);
                $("#jie").text(data[2]);
                // $("#User_cout").text(data);
                pages = Math.ceil(data[0] / sales_pagesize);
                laypage({
                    cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
                    pages: pages, //总页数
                    skin: 'molv', //皮肤
                    first: '首页', //若不显示，设置false即可
                    last: '尾页', //若不显示，设置false即可
                    prev: '上一页', //若不显示，设置false即可
                    next: '下一页', //若不显示，设置false即可
                    curr: pageinxe || 1, //当前页,
                    jump: function (e, first) {
                        if (pages > 0 && pages < pageinxe) {
                            pageinxe = 1;
                            getList(payname, 1, type, day, key, liushui, date, date2, storesearch, seller, orderSource);
                        }
                        if (!first) {
                            //点击跳页触发函数自身，并传递当前页：obj.curr
                            pageinxe = e.curr;
                            getList(payname, e.curr, type, day, key, liushui, date, date2, storesearch, seller, orderSource);
                        }
                    }
                });
            }

            if (result.orderList != null) {
                var data = result.orderList;

                //订单展示
                for (var i = 0; i < data.length; i++) {

                    jie += data[i].order_money + data[i].order_money2;
                    var thisMemberDiscount = parseFloat(data[i].prlist[0].product_discount); // 会员折扣
                    var thisOrderDiscount = parseFloat(data[i].order_discount); // 订单折扣
                    if (data[i].prlist != null && data[i].prlist != '' && data[i].prlist.length > 1) {
                        var discounttype = ''; // 折扣类型
                        var minprice = data[i].prlist[0].sv_p_minunitprice;          // 商品最低价
                        var sv_p_discount = data[i].prlist[0].sv_p_discount;         // 商品折扣
                        var sv_p_mindiscount = data[i].prlist[0].sv_p_mindiscount / 10;    // 商品最低折扣
                        var product_orig_discount = data[i].prlist[0].product_orig_discount; // 订单商品里保存的商品折扣
                        var sv_p_memberprice = data[i].prlist[0].sv_p_memberprice;   // 会员价
                        var product_discount = data[i].prlist[0].product_discount; // 成交折扣
                        var product_unitprice = data[i].prlist[0].product_unitprice; // 销售商品单价
                        var product_price = data[i].prlist[0].product_price;         // 原售单价
                        var discountPrice = parseFloat(product_orig_discount * product_price);
                        var product_num = data[i].prlist[0].product_num;
                        var weight = data[i].prlist[0].sv_p_weight;
                        var minprice_num = 0;
                        if (data[i].prlist[0].sv_pricing_method == 1) { // 计重
                            minprice_num = parseFloat(minprice * weight).toFixed(2);
                        }
                        else {
                            minprice_num = minprice * product_num;
                        }
                        var member_id = data[i].user_cardno != null && data[i].user_cardno != '' && data[i].user_cardno != '0' && data[i].user_cardno != 0 ? data[i].user_cardno : '';  // 会员Id

                        // -----------多笔折叠显示的折扣--------//
                        if (member_id) {               // 会员
                            if (thisOrderDiscount > 0 && thisOrderDiscount < 1 && thisMemberDiscount != 0 && thisMemberDiscount < 1) { // 会员折上折
                                discounttype = '会员折(' + thisMemberDiscount + ')，折扣(' + thisOrderDiscount + ')';
                            }
                            else if (thisOrderDiscount > 0 && thisOrderDiscount < 1) {
                                discounttype = '折扣(' + thisOrderDiscount + ')';
                            }
                            else if (thisMemberDiscount != 0 && thisMemberDiscount < 1) {
                                discounttype = '会员折(' + thisMemberDiscount + ')';
                            }
                            else {
                                discounttype = '无折扣';
                            }
                        }
                        else {                        // 散客
                            if (thisOrderDiscount > 0 && thisOrderDiscount < 1) { // 散客折扣
                                discounttype = '折扣(' + thisOrderDiscount + ')';
                            }
                            else {
                                discounttype = '无折扣';
                            }
                        }
                        // -----------多笔折叠显示的折扣--------/
                        if (data[i].order_state > 0 || data[i].Numcount == 0) {
                            html += '<tr class="danpintr greyRender" data-id="' + data[i].order_id + '"> <td class="curpo">  ';
                        } else {
                            html += '<tr class="danpintr" data-id="' + data[i].order_id + '"> <td class="curpo">  ';
                        }
                        html += ' <div class="imgAdapt"><img src="' + ((data[i].prlist[0].sv_p_images2 == null || data[i].prlist[0].sv_p_images2 == '') ? '' : (_g_res_images_url + data[i].prlist[0].sv_p_images2)) + '" onerror="this.src=\'/images/002.png\';"></div>                      ';
                        html += ' <div class="pull-left pos-r" style="overflow: initial;">               ';
                        html += '<h6 class="word-overflow ">                                        ';
                        html += '<span class="goodsTitle" title="' + data[i].prlist[0].product_name + '">';
                        if (isNullOrWhiteSpace(data[i].prlist[0].product_name) && data[i].prlist[0].product_name.length > 10) {
                            html += '  ' + data[i].prlist[0].product_name.substring(0, 10) + '...... <span class="orange" title="查看规格详情">多笔</span> ';
                        } else {
                            html += '  ' + data[i].prlist[0].product_name + ' <span class="orange" title="查看规格详情">多笔</span> ';
                        }
                        html += '</span>';
                        html += '<i class="icon-circle-arrow-right viii"></i>';
                        html += ' </h6>';
                        html += '     <div class="clearfix"></div> ';
                        html += '     <p class="word-overflow">    ';
                        var sv_p_barcode = data[i].prlist[0].sv_p_barcode != null && data[i].prlist[0].sv_p_barcode != '' ? data[i].prlist[0].sv_p_barcode : '';
                        html += '         <a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_p_barcode + '</a>';
                        html += '             </p>  ';
                        html += '         </div> ';
                        html += '     </td>   ';
                        html += '     <td><span>' + data[i].order_running_id + '</span></td>';
                        if (_g_everyDaySerialNumber) {
                            if (!data[i].order_serial_number) {
                                data[i].order_serial_number = "";
                            }
                            html += '<td><span>' + data[i].order_serial_number + '</span></td>';
                        }
                        if (data[i].user_cardno != "0") {

                            html += '<td class="curpo">';
                            html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                            html += '<h6 class="word-overflow ">';
                            html += '<span class="goodsTitle" title="' + data[i].sv_mr_name + '">';
                            if (data[i].sv_mr_name == null)
                                html += '<img src="/images/001.png" />';
                            else if (isNullOrWhiteSpace(data[i].sv_mr_name) && data[i].sv_mr_name.length > 10) {
                                html += '<span class="goodsTitle padingcen" title="' + data[i].sv_mr_name + '">' + data[i].sv_mr_name.substring(0, 10) + ' </span>';
                            } else {
                                html += '  ' + data[i].sv_mr_name + '  ';
                            }
                            html += '</span> ';
                            html += '</h6>';
                            html += '<div class="clearfix"></div> ';
                            html += '<p class="word-overflow">    ';
                            var sv_mr_cardno = data[i].prlist[0].member_card_no != null && data[i].prlist[0].member_card_no != '' ? data[i].prlist[0].member_card_no : '';
                            if (sv_mr_cardno.length > 10)
                                sv_mr_cardno = '*' + sv_mr_cardno.substring(sv_mr_cardno.length - 10, sv_mr_cardno.length);
                            html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_mr_cardno + '</a>';
                            html += '</p>';
                            html += '</div>';
                            html += '</td>';

                        } else {
                            html += '     <td><span>散客消费</span></td>';
                        }
                        //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                        //html += '<td><span>' + data[i].prlist[0].product_price + '</span></td>';
                        html += '<td><span></span></td>';
                        html += '<td><span>' + discounttype + '</span></td>';
                        html += '<td><span>' + data[i].numcount + '</span></td>';
                        html += '<td><i>¥ ' + data[i].order_receivable + '</i></td>';
                        var bb = "";
                        var isSheZhang = false;
                        if (data[i].order_payment2 != '待收' && data[i].order_payment2 != '待付') {
                            bb = '(' + data[i].order_money + '),' + data[i].order_payment2 + '(' + data[i].order_money2 + ')';
                        }
                        if (data[i].order_payment2 == '赊账' || data[i].order_payment == '赊账') {
                            isSheZhang = true;
                        }
                        html += '<td><span>' + data[i].order_payment + bb + '</span></td>';
                        var consumeusername = isNullOrWhiteSpace(data[i].consumeusername) == true ? data[i].consumeusername : '';
                        var memberuserName = isNullOrWhiteSpace(data[i].memberuserName) == true ? data[i].memberuserName : '';
                        html += '<td><span>' + consumeusername + '</span></td>';
                        html += '<td><span>' + memberuserName + '</span></td> ';
                        html += '<td><span>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td> ';
                        // 餐饮行业显示
                        if (_g_sv_uit_cache_name == 'cache_name_catering') {
                            html += '<td><span></span></td> ';
                        }
                        html += '<td><span>' + data[i].sv_remarks + '</span></td> ';
                        html += '<td>                                   ';
                        html += '<div class="xstbbtn">              ';
                        html += '<a href="javascript:void(0);"  data-id="' + data[i].order_running_id + '"   class="zxsfxthcl" >整单退货 </a> | <a href="javascript:void(0);"  class="dayin" data-id="' + data[i].order_running_id + '" >打印 </a> ';//| <a href="#"> 详情</a>
                        html += '</div>';
                        html += '</td>';
                        html += ' </tr>';
                        if (data[i].order_state == 2 || data[i].Numcount == 0) {
                            html += '<tr class="MoreGoodsSale danpicount greyRender" data-id="' + data[i].order_id + '"> ';
                        } else {

                            html += '<tr class="MoreGoodsSale danpicount" data-id="' + data[i].order_id + '">  ';

                        }

                        html += '<td class="conmios "> ';
                        html += '<span class="pull-left text-main">本次消费数据合计：</span> ';
                        html += '<span class="orange" title="查看规格详情">多笔</span> ';
                        html += '<i class=" icon-angle-down okk"></i>';
                        html += '</td>                                                               ';
                        html += '<td><span>' + data[i].order_running_id + '</span></td>';
                        if (_g_everyDaySerialNumber) {
                            if (!data[i].order_serial_number) {
                                data[i].order_serial_number = "";
                            }
                            html += '<td><span>' + data[i].order_serial_number + '</span></td>';
                        }
                        if (data[i].user_cardno != "0") {
                            html += '<td class="curpo">';
                            html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                            html += '<h6 class="word-overflow ">';
                            html += '<span class="goodsTitle" title="' + data[i].sv_mr_name + '">';
                            if (data[i].sv_mr_name == null)
                                html += '<img src="/images/001.png" />';
                            else if (isNullOrWhiteSpace(data[i].sv_mr_name) && data[i].sv_mr_name.length > 10) {
                                html += '<span class="goodsTitle padingcen" title="' + data[i].sv_mr_name + '">' + data[i].sv_mr_name.substring(0, 10) + ' </span>';
                            } else {
                                html += '  ' + data[i].sv_mr_name + '  ';
                            }

                            html += '</span> ';
                            html += '</h6>';
                            html += '<div class="clearfix"></div> ';
                            html += '<p class="word-overflow">    ';
                            var sv_mr_cardno = data[i].prlist[0].member_card_no != null && data[i].prlist[0].member_card_no != '' ? data[i].prlist[0].member_card_no : '';
                            if (sv_mr_cardno.length > 10)
                                sv_mr_cardno = '*' + sv_mr_cardno.substring(sv_mr_cardno.length - 10, sv_mr_cardno.length);
                            html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_mr_cardno + '</a>';
                            html += '</p>';
                            html += '</div>';
                            html += '</td>';
                        } else {
                            html += '     <td><span>散客消费</span></td>           ';
                        }
                        //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                        html += '<td><span></span></td>';

                        html += '<td><span>' + discounttype + '</span></td>';
                        html += '<td><span>' + data[i].numcount + '</span></td>';
                        html += '<td><i>¥  ' + data[i].order_receivable + '</i></td>  ';
                        html += '<td><span>' + data[i].order_payment + (data[i].order_payment2 != '待收' && data[i].order_payment2 != '待付' ? "(" + data[i].order_money + ")," + data[i].order_payment2 : "") + '</span></td>                                          ';
                        var consumeusername = isNullOrWhiteSpace(data[i].consumeusername) == true ? data[i].consumeusername : '';
                        var memberuserName = isNullOrWhiteSpace(data[i].memberuserName) == true ? data[i].memberuserName : '';
                        html += '<td><span>' + consumeusername + '</span></td>';
                        html += '<td><span>' + memberuserName + '</span></td> ';
                        html += '<td><span>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td>                              ';
                        // 口味+加料+规格总金额
                        if (_g_sv_uit_cache_name == 'cache_name_catering') {
                            html += '<td><span></span></td> ';
                        }
                        html += '<td><span>' + data[i].sv_remarks + '</span></td> ';
                        html += '<td>                                                                ';
                        html += '<div class="xstbbtn">                                           ';
                        html += '<a href="javascript:void(0);"   data-id="' + data[i].order_running_id + '"   class="zxsfxthcl" >整单退货 </a> | <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a>';
                        html += '</div>   ';
                        html += '';
                        html += '</td>        ';
                        html += ' </tr>            ';
                        for (var b = 0; b < data[i].prlist.length; b++) {
                            var discounttype = ''; // 折扣类型
                            var minprice = data[i].prlist[b].sv_p_minunitprice;          // 商品最低价
                            var sv_p_discount = data[i].prlist[b].sv_p_discount;         // 商品折扣
                            var sv_p_mindiscount = data[i].prlist[b].sv_p_mindiscount / 10;    // 商品最低折扣
                            var product_orig_discount = data[i].prlist[b].product_orig_discount; // 订单商品里保存的商品折扣
                            var sv_p_memberprice = data[i].prlist[b].sv_p_memberprice;   // 会员价
                            var product_discount = data[i].prlist[b].product_discount; // 成交折扣
                            var product_unitprice = data[i].prlist[b].product_unitprice; // 销售商品单价
                            var product_price = data[i].prlist[b].product_price;         // 原售单价
                            var discountPrice = parseFloat(product_orig_discount * product_price);
                            var product_num = data[i].prlist[b].product_num;
                            var weight = data[i].prlist[b].sv_p_weight;
                            var minprice_num = 0;
                            if (data[i].prlist[b].sv_pricing_method == 1) { // 计重
                                minprice_num = parseFloat(minprice * weight).toFixed(2);
                            }
                            else {
                                minprice_num = minprice * product_num;
                            }
                            var member_id = data[i].user_cardno != null && data[i].user_cardno != '' && data[i].user_cardno != '0' && data[i].user_cardno != 0 ? data[i].user_cardno : '';  // 会员Id
                            if (isNullOrWhiteSpace(member_id) && sv_p_memberprice > 0) {
                                discounttype = "会员价(" + sv_p_memberprice + ".00)";
                            }
                            else if (isNullOrWhiteSpace(member_id) && sv_p_mindiscount > 0 && product_orig_discount < sv_p_mindiscount) {
                                discounttype = "最低折(" + sv_p_mindiscount + ")";
                            }
                            else if (isNullOrWhiteSpace(member_id) && product_orig_discount > 0 && product_discount <= product_orig_discount && product_discount != 1 && discountPrice > product_unitprice) {
                                discounttype = "会员折(" + product_orig_discount + ")";
                            }
                            else if (isNullOrWhiteSpace(member_id) && discountPrice > 0 && discountPrice < minprice) {
                                discounttype = "最低价(" + minprice_num + ")";
                            }
                            else {
                                discounttype = "无折扣";
                            }

                            count += data[i].prlist[b].product_total;
                            //console.log(count);
                            //greyRender
                            if (data[i].prlist[b].order_stutia > 0) {
                                html += '<tr class="MoreGoodsSale danpinlisttt greyRender"  data-id= "' + data[i].order_id + '">  ';
                            } else {

                                html += '<tr class="MoreGoodsSale danpinlisttt " data-id= "' + data[i].order_id + '">  ';
                            }
                            html += '<td class="curpo">  ';
                            html += '<div class="imgAdapt"><img src="' + ((data[i].prlist[b].sv_p_images2 == null || data[i].prlist[b].sv_p_images2 == '') ? '' : (_g_res_images_url + data[i].prlist[b].sv_p_images2)) + '" onerror="this.src=\'/images/002.png\';"></div>';
                            html += '<div class="pull-left pos-r" style="overflow: initial;">';
                            html += '<h6 class="word-overflow "> ';
                            if (isNullOrWhiteSpace(data[i].prlist[b].product_name) && data[i].prlist[b].product_name.length > 10) {
                                html += '<span class="goodsTitle padingcen" title="' + data[i].prlist[b].product_name + '">' + data[i].prlist[b].product_name.substring(0, 10) + ' </span>';
                            } else {
                                html += '<span class="goodsTitle padingcen" title="' + data[i].prlist[b].product_name + '">' + data[i].prlist[b].product_name + ' </span>';
                            }
                            var sv_mr_cardno = data[i].prlist[b].sv_p_barcode != null && data[i].prlist[b].sv_p_barcode != '' ? data[i].prlist[b].sv_p_barcode : '';
                            html += '<span style="padding-left: 5px;">(' + sv_mr_cardno + ')</span>';
                            html += '<i class="icon-circle-arrow-right viii vkks"></i>';
                            html += '</h6> ';
                            html += '<div class="clearfix"></div>';
                            html += '  </div> ';
                            html += '</td>';
                            html += '<td><span></span></td>';
                            html += '<td><span></span></td>';
                            //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                            if (_g_everyDaySerialNumber) {
                                html += '<td></td>';
                            }
                            html += '<td><span>' + data[i].prlist[b].product_price + '</span></td>';
                            html += '<td><span>' + discounttype + '</span></td>';

                            var product_nums = data[i].prlist[b].sv_pricing_method == 1 ? data[i].prlist[b].sv_p_weight : data[i].prlist[b].product_num; // 商品数量
                            html += '<td><span> ' + product_nums + '</span></td>';
                            html += '<td><i>¥ ' + data[i].prlist[b].product_total + '</i></td>';
                            html += '<td><span></span></td>';
                            html += '<td><span></span></td>';
                            html += '<td><span></span></td>';
                            html += '<td><span></span></td>';
                            if (_g_sv_uit_cache_name == 'cache_name_catering') {
                                // 口味+加料+规格总金额
                                var order_taste_money_detail = eval(data[i].prlist[b].product_taste_money_detail);
                                var taste_money_detailHtml = '';
                                if (order_taste_money_detail != null && order_taste_money_detail.length > 0) {
                                    for (var j = 0; j < order_taste_money_detail.length; j++) {
                                        taste_money_detailHtml += order_taste_money_detail[j].name + '(' + order_taste_money_detail[j].price + ')';
                                    }
                                }
                                html += '<td><span>' + taste_money_detailHtml + '</span></td>';
                            }
                            html += '<td><span></span></td>';
                            html += '<td>';
                            html += '<div class="xstbbtn">';
                            var str = data[i].prlist[b].product_name;
                            if (str.indexOf("(套餐)") == -1) {
                                if (isSheZhang == false) {
                                    html += '<a href="javascript:void(0);" data-productnum="' + product_nums + '" data-pricingmethod = "' + data[i].prlist[b].sv_pricing_method + '" data-prid="' + data[i].prlist[b].product_id + '"  data-id="' + data[i].order_running_id + '" data-orderprId="' + data[i].prlist[b].id + '" class="xsfxthcl" >退换货 </a> ';//| <a href="javascript:void(0);"  data-toggle="modal" data-target="#xsfxxiqing" >详情 </a> 
                                }
                            }
                            html += '</div>';
                            html += '</td> ';
                            html += '</tr> ';
                        }
                    }
                    else { // 单个
                        if (data[i].prlist != null && data[i].prlist != '' && data[i].prlist.length > 0) {
                            var discounttype = ''; // 折扣类型
                            var minprice = data[i].prlist[0].sv_p_minunitprice;          // 商品最低价
                            var sv_p_discount = data[i].prlist[0].sv_p_discount;         // 商品折扣
                            var sv_p_mindiscount = data[i].prlist[0].sv_p_mindiscount / 10;    // 商品最低折扣
                            var product_orig_discount = data[i].prlist[0].product_orig_discount; // 订单商品里保存的商品折扣
                            var sv_p_memberprice = data[i].prlist[0].sv_p_memberprice;   // 会员价
                            var product_discount = data[i].prlist[0].product_discount; // 成交折扣
                            var product_unitprice = data[i].prlist[0].product_unitprice; // 销售商品单价
                            var product_price = data[i].prlist[0].product_price;         // 原售单价
                            var discountPrice = parseFloat(product_orig_discount * product_price);
                            var product_num = data[i].prlist[0].product_num;
                            var weight = data[i].prlist[0].sv_p_weight;
                            var minprice_num = 0;
                            if (data[i].prlist[0].sv_pricing_method == 1) { // 计重
                                minprice_num = parseFloat(minprice * weight).toFixed(2);
                            }
                            else {
                                minprice_num = minprice * product_num;
                            }
                            var member_id = data[i].user_cardno != null && data[i].user_cardno != '' && data[i].user_cardno != '0' && data[i].user_cardno != 0 ? data[i].user_cardno : '';  // 会员Id

                            // ------单笔折扣------//
                            if (member_id) {               // 会员
                                if (thisOrderDiscount > 0 && thisOrderDiscount < 1 && thisMemberDiscount != 0 && thisMemberDiscount < 1) { // 会员折上折
                                    discounttype = '会员折(' + thisMemberDiscount + ')，折扣(' + thisOrderDiscount + ')';
                                }
                                else if (thisOrderDiscount > 0 && thisOrderDiscount < 1) {
                                    discounttype = '折扣(' + thisOrderDiscount + ')';
                                }
                                else if (thisMemberDiscount != 0 && thisMemberDiscount < 1) {
                                    discounttype = '会员折(' + thisMemberDiscount + ')';
                                }
                                else {
                                    discounttype = '无折扣';
                                }
                            }
                            else {                        // 散客
                                if (thisOrderDiscount > 0 && thisOrderDiscount < 1) { // 散客折扣
                                    discounttype = '折扣(' + thisOrderDiscount + ')';
                                }
                                else {
                                    discounttype = '无折扣';
                                }
                            }
                            // ------单笔折扣------//
                            if (data[i].prlist[0].order_stutia > 0) {
                                html += '<tr class="danpinlisttt greyRender" data-id="' + data[i].order_id + '"> ';
                            } else {
                                html += '<tr class="danpinlisttt " data-id="' + data[i].order_id + '"> ';
                            }
                            html += '<td class="curpo"> <div class="imgAdapt"><img src="' + ((data[i].prlist[0].sv_p_images2 == null || data[i].prlist[0].sv_p_images2 == '') ? '' : (_g_res_images_url + data[i].prlist[0].sv_p_images2)) + '" onerror="this.src=\'/images/002.png\';"></div>';
                            html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                            html += '<h6 class="word-overflow ">';
                            html += '<span class="goodsTitle" title="' + data[i].prlist[0].product_name + '">';
                            if (isNullOrWhiteSpace(data[i].prlist[0].product_name) && data[i].prlist[0].product_name.length > 10) {
                                html += '<span class="goodsTitle padingcen" title="' + data[i].prlist[0].product_name + '">' + data[i].prlist[0].product_name.substring(0, 10) + ' </span>';
                            } else {
                                html += '  ' + data[i].prlist[0].product_name + '  ';
                            }

                            html += '</span> ';
                            html += '<i class="icon-circle-arrow-right viii"></i> ';
                            html += '</h6>';
                            html += '<div class="clearfix"></div> ';
                            html += '<p class="word-overflow">    ';
                            var sv_p_barcode = data[i].prlist[0].sv_p_barcode != null && data[i].prlist[0].sv_p_barcode != '' ? data[i].prlist[0].sv_p_barcode : '';
                            html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_p_barcode + '</a>';
                            html += '</p>';
                            html += '</div>';
                            html += '</td>';
                            html += '<td><span>' + data[i].order_running_id + '</span></td>';
                            if (_g_everyDaySerialNumber) {
                                if (!data[i].order_serial_number) {
                                    data[i].order_serial_number = "";
                                }
                                html += '<td><span>' + data[i].order_serial_number + '</span></td>';
                            }
                            if (data[i].user_cardno != "0") {

                                html += '<td class="curpo">';
                                html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                                html += '<h6 class="word-overflow ">';
                                html += '<span class="goodsTitle" title="' + data[i].sv_mr_name + '">';
                                if (data[i].sv_mr_name == null)
                                    html += '<img src="/images/001.png" />';
                                else if (isNullOrWhiteSpace(data[i].sv_mr_name) && data[i].sv_mr_name.length > 10) {
                                    html += '<span class="goodsTitle padingcen" title="' + data[i].sv_mr_name + '">' + data[i].sv_mr_name.substring(0, 10) + ' </span>';
                                } else {
                                    html += '  ' + data[i].sv_mr_name + '  ';
                                }

                                html += '</span> ';
                                html += '</h6>';
                                html += '<div class="clearfix"></div> ';
                                html += '<p class="word-overflow">    ';
                                var sv_mr_cardno = data[i].prlist[0].member_card_no != null && data[i].prlist[0].member_card_no != '' ? data[i].prlist[0].member_card_no : '';
                                if (sv_mr_cardno.length > 10)
                                    sv_mr_cardno = '*' + sv_mr_cardno.substring(sv_mr_cardno.length - 10, sv_mr_cardno.length);
                                html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_mr_cardno + '</a>';
                                html += '</p>';
                                html += '</div>';
                                html += '</td>';


                            } else {
                                html += '<td><span>散客消费</span></td>';
                            }

                            //html += '<td><i>¥ ' + data[i].prlist[0].product_total + '</i></td>';
                            //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                            html += '<td><span>' + data[i].prlist[0].product_price + '</span></td>';
                            html += '<td><span>' + discounttype + '</span></td>';
                            var product_num = data[i].prlist[0].sv_pricing_method == 1 ? data[i].prlist[0].sv_p_weight : data[i].prlist[0].product_num; // 商品数量
                            html += '<td><span>' + product_num + '</span></td>';
                            html += '<td><i>¥ ' + data[i].order_receivable + '</i></td>';
                            html += '<td><span>' + data[i].order_payment + (data[i].order_payment2 != '待收' && data[i].order_payment2 != '待付' ? "(" + parseFloat(data[i].order_money).toFixed(2) + ")" + "," + data[i].order_payment2 + "(" + parseFloat(data[i].order_money2).toFixed(2) + ")" : "") + '</span></td>';
                            var consumeusername = isNullOrWhiteSpace(data[i].consumeusername) == true ? data[i].consumeusername : '';
                            var memberuserName = isNullOrWhiteSpace(data[i].memberuserName) == true ? data[i].memberuserName : '';
                            html += '<td><span>' + consumeusername + '</span></td>';
                            html += '<td><span>' + memberuserName + '</span></td> ';
                            html += '<td><span>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td> ';
                            if (_g_sv_uit_cache_name == 'cache_name_catering') {
                                // 口味+加料+规格总金额
                                var order_taste_money_detail = eval(data[i].prlist[0].product_taste_money_detail);
                                var taste_money_detailHtml = '';
                                if (order_taste_money_detail != null && order_taste_money_detail.length > 0) {
                                    for (var j = 0; j < order_taste_money_detail.length; j++) {
                                        taste_money_detailHtml += order_taste_money_detail[j].name + '(' + order_taste_money_detail[j].price + ')';
                                    }
                                }
                                html += '<td><span>' + taste_money_detailHtml + '</span></td> ';
                            }
                            html += '<td><span>' + data[i].sv_remarks + '</span></td> ';
                            html += '<td>';
                            html += '<div class="xstbbtn">';
                            html += '<a href="javascript:void(0);" data-productnum="' + product_num + '" data-pricingmethod = "' + data[i].prlist[0].sv_pricing_method + '" data-prid="' + data[i].prlist[0].product_id + '"  data-id="' + data[i].order_running_id + '" data-orderprId="' + data[i].prlist[0].id + '" class="xsfxthcl">退换货 </a> | <a href="javascript:void(0);"  class="dayin" data-id="' + data[i].order_running_id + '">打印</a> ';//| <a href="#">详情</a>
                            html += '</div>';
                            html += '</td>';
                            html += '</tr>';
                            count += data[i].prlist[0].product_total;

                        }
                    }
                }
            }
        }
        html += '</tbody>';

        $("#saleslist").html(html);

        var priid = $('.danpintr td:first-child');
        var sacid = $('.danpicount td:first-child');
        //多笔订单展开事件
        priid.click(function () {
            var indexid = $(this).parent().attr('data-id');
            $('.MoreGoodsSale[data-id="' + indexid + '"]').show();
            $('.danpinlisttt[data-id="' + indexid + '"]').addClass('bgf4f4');
            $('.danpinlisttt[data-id="' + indexid + '"]:last').addClass('bot2mon');
            $(this).parent().hide();
        });
        //多笔订单关闭事件
        sacid.click(function () {
            var indexid = $(this).parent().attr('data-id');
            $('.MoreGoodsSale[data-id="' + indexid + '"]').hide();
            $('.danpintr[data-id="' + indexid + '"]').show();
        });
    });
}
function getList_backup(payname, page, type, day, key, liushui, date, date2, storesearch, seller) {
    var html = '';
    $.getJSON("/intelligent/GetsalesList/" + page, { "payname": payname, "type": type, "day": day, "key": key, "liushui": liushui, "date": date, "date2": date2, "storeid": storesearch, "seller": seller, "product": $("#filter_product_info").val() }, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {

                jie += data[i].order_money + data[i].order_money2;
                if (data[i].prlist != null && data[i].prlist != '' && data[i].prlist.length > 1) {
                    var discounttype = ''; // 折扣类型
                    var minprice = data[i].prlist[0].sv_p_minunitprice;          // 商品最低价
                    var sv_p_discount = data[i].prlist[0].sv_p_discount;         // 商品折扣
                    var sv_p_mindiscount = data[i].prlist[0].sv_p_mindiscount / 10;    // 商品最低折扣
                    var product_orig_discount = data[i].prlist[0].product_orig_discount; // 订单商品里保存的商品折扣
                    var sv_p_memberprice = data[i].prlist[0].sv_p_memberprice;   // 会员价
                    var product_discount = data[i].prlist[0].product_discount; // 成交折扣
                    var product_unitprice = data[i].prlist[0].product_unitprice; // 销售商品单价
                    var product_price = data[i].prlist[0].product_price;         // 原售单价
                    var discountPrice = parseFloat(product_orig_discount * product_price);
                    var product_num = data[i].prlist[0].product_num;
                    var weight = data[i].prlist[0].sv_p_weight;
                    var minprice_num = 0;
                    if (data[i].prlist[0].sv_pricing_method == 1) { // 计重
                        minprice_num = parseFloat(minprice * weight).toFixed(2);
                    }
                    else {
                        minprice_num = minprice * product_num;
                    }
                    var member_id = data[i].user_cardno != null && data[i].user_cardno != '' && data[i].user_cardno != '0' && data[i].user_cardno != 0 ? data[i].user_cardno : '';  // 会员Id
                    if (isNullOrWhiteSpace(member_id) && sv_p_memberprice > 0) {
                        discounttype = "会员价(" + sv_p_memberprice + ".00)";
                    }
                    else if (isNullOrWhiteSpace(member_id) && sv_p_mindiscount > 0 && product_orig_discount < sv_p_mindiscount) {
                        discounttype = "最低折(" + sv_p_mindiscount + ")";
                    }
                    else if (isNullOrWhiteSpace(member_id) && product_orig_discount > 0 && product_discount <= product_orig_discount && product_discount != 1 && discountPrice > product_unitprice) {
                        discounttype = "会员折(" + product_orig_discount + ")";
                    }
                    else if (isNullOrWhiteSpace(member_id) && discountPrice > 0 && discountPrice < minprice) {
                        discounttype = "最低价(" + minprice_num + ")";
                    }
                    else {
                        discounttype = "无折扣";
                    }
                    if (data[i].order_state > 0 || data[i].Numcount == 0) {
                        html += '<tr class="danpintr greyRender" data-id="' + data[i].order_id + '"> <td class="curpo">  ';
                    } else {
                        html += '<tr class="danpintr" data-id="' + data[i].order_id + '"> <td class="curpo">  ';
                    }
                    html += ' <div class="imgAdapt"><img src="' + ((data[i].prlist[0].sv_p_images2 == null || data[i].prlist[0].sv_p_images2 == '') ? '' : (_g_res_images_url + data[i].prlist[0].sv_p_images2)) + '" onerror="this.src=\'/images/002.png\';"></div>                      ';
                    html += ' <div class="pull-left pos-r" style="overflow: initial;">               ';
                    html += '<h6 class="word-overflow ">                                        ';
                    html += '<span class="goodsTitle" title="' + data[i].prlist[0].product_name + '">';
                    if (isNullOrWhiteSpace(data[i].prlist[0].product_name) && data[i].prlist[0].product_name.length > 10) {
                        html += '  ' + data[i].prlist[0].product_name.substring(0, 10) + '...... <span class="orange" title="查看规格详情">多笔</span> ';
                    } else {
                        html += '  ' + data[i].prlist[0].product_name + ' <span class="orange" title="查看规格详情">多笔</span> ';
                    }
                    html += '</span>';
                    html += '<i class="icon-circle-arrow-right viii"></i>';
                    html += ' </h6>';
                    html += '     <div class="clearfix"></div> ';
                    html += '     <p class="word-overflow">    ';
                    var sv_p_barcode = data[i].prlist[0].sv_p_barcode != null && data[i].prlist[0].sv_p_barcode != '' ? data[i].prlist[0].sv_p_barcode : '';
                    html += '         <a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_p_barcode + '</a>';
                    html += '             </p>  ';
                    html += '         </div> ';
                    html += '     </td>   ';
                    html += '     <td><span>' + data[i].order_running_id + '</span></td>';
                    if (_g_everyDaySerialNumber) {
                        if (!data[i].order_serial_number) {
                            data[i].order_serial_number = "";
                        }
                        html += '<td><span>' + data[i].order_serial_number + '</span></td>';
                    }
                    if (data[i].user_cardno != "0") {

                        html += '<td class="curpo">';
                        html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                        html += '<h6 class="word-overflow ">';
                        html += '<span class="goodsTitle" title="' + data[i].sv_mr_name + '">';
                        if (data[i].sv_mr_name == null)
                            html += '<img src="/images/001.png" />';
                        else if (isNullOrWhiteSpace(data[i].sv_mr_name) && data[i].sv_mr_name.length > 10) {
                            html += '<span class="goodsTitle padingcen" title="' + data[i].sv_mr_name + '">' + data[i].sv_mr_name.substring(0, 10) + ' </span>';
                        } else {
                            html += '  ' + data[i].sv_mr_name + '  ';
                        }

                        html += '</span> ';
                        html += '</h6>';
                        html += '<div class="clearfix"></div> ';
                        html += '<p class="word-overflow">    ';
                        var sv_mr_cardno = data[i].prlist[0].member_card_no != null && data[i].prlist[0].member_card_no != '' ? data[i].prlist[0].member_card_no : '';
                        if (sv_mr_cardno.length > 10)
                            sv_mr_cardno = '*' + sv_mr_cardno.substring(sv_mr_cardno.length - 10, sv_mr_cardno.length);
                        html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_mr_cardno + '</a>';
                        html += '</p>';
                        html += '</div>';
                        html += '</td>';

                    } else {
                        html += '     <td><span>散客消费</span></td>';
                    }
                    //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                    //html += '<td><span>' + data[i].prlist[0].product_price + '</span></td>';
                    html += '<td><span></span></td>';
                    html += '<td><span>' + discounttype + '</span></td>';
                    html += '<td><span>' + data[i].numcount + '</span></td>';
                    html += '<td><i>¥ ' + data[i].order_receivable + '</i></td>';
                    var bb = "";
                    if (data[i].order_payment2 != '待收' && data[i].order_payment2 != '待付') {
                        bb = '(' + data[i].order_money + '),' + data[i].order_payment2;
                    }
                    html += '<td><span>' + data[i].order_payment + bb + '</span></td>';
                    var consumeusername = isNullOrWhiteSpace(data[i].consumeusername) == true ? data[i].consumeusername : '';
                    var memberuserName = isNullOrWhiteSpace(data[i].memberuserName) == true ? data[i].memberuserName : '';
                    html += '<td><span>' + consumeusername + '</span></td>';
                    html += '<td><span>' + memberuserName + '</span></td> ';
                    html += '<td><span>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td> ';
                    html += '<td><span>' + data[i].sv_remarks + '</span></td> ';
                    html += '<td>                                   ';
                    html += '<div class="xstbbtn">              ';
                    html += '<a href="javascript:void(0);"  data-id="' + data[i].order_running_id + '"   class="zxsfxthcl" >整单退货 </a> | <a href="javascript:void(0);"  class="dayin" data-id="' + data[i].order_running_id + '" >打印 </a> ';//| <a href="#"> 详情</a>
                    html += '</div>';
                    html += '</td>';
                    html += ' </tr>';
                    if (data[i].order_state == 2 || data[i].Numcount == 0) {
                        html += '<tr class="MoreGoodsSale danpicount greyRender" data-id="' + data[i].order_id + '"> ';
                    } else {

                        html += '<tr class="MoreGoodsSale danpicount" data-id="' + data[i].order_id + '">  ';

                    }

                    html += '<td class="conmios "> ';
                    html += '<span class="pull-left text-main">本次消费数据合计：</span> ';
                    html += '<span class="orange" title="查看规格详情">多笔</span> ';
                    html += '<i class=" icon-angle-down okk"></i>';
                    html += '</td>                                                               ';
                    html += '<td><span>' + data[i].order_running_id + '</span></td>';
                    if (_g_everyDaySerialNumber) {
                        if (!data[i].order_serial_number) {
                            data[i].order_serial_number = "";
                        }
                        html += '<td><span>' + data[i].order_serial_number + '</span></td>';
                    }
                    if (data[i].user_cardno != "0") {
                        html += '<td class="curpo">';
                        html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                        html += '<h6 class="word-overflow ">';
                        html += '<span class="goodsTitle" title="' + data[i].sv_mr_name + '">';
                        if (data[i].sv_mr_name == null)
                            html += '<img src="/images/001.png" />';
                        else if (isNullOrWhiteSpace(data[i].sv_mr_name) && data[i].sv_mr_name.length > 10) {
                            html += '<span class="goodsTitle padingcen" title="' + data[i].sv_mr_name + '">' + data[i].sv_mr_name.substring(0, 10) + ' </span>';
                        } else {
                            html += '  ' + data[i].sv_mr_name + '  ';
                        }

                        html += '</span> ';
                        html += '</h6>';
                        html += '<div class="clearfix"></div> ';
                        html += '<p class="word-overflow">    ';
                        var sv_mr_cardno = data[i].prlist[0].member_card_no != null && data[i].prlist[0].member_card_no != '' ? data[i].prlist[0].member_card_no : '';
                        if (sv_mr_cardno.length > 10)
                            sv_mr_cardno = '*' + sv_mr_cardno.substring(sv_mr_cardno.length - 10, sv_mr_cardno.length);
                        html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_mr_cardno + '</a>';
                        html += '</p>';
                        html += '</div>';
                        html += '</td>';
                    } else {
                        html += '     <td><span>散客消费</span></td>           ';
                    }
                    //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                    html += '<td><span></span></td>';
                    html += '<td><span>' + data[i].discounttype + '</span></td>';
                    html += '<td><span>' + data[i].numcount + '</span></td>';
                    html += '<td><i>¥  ' + data[i].order_receivable + '</i></td>  ';
                    html += '<td><span>' + data[i].order_payment + (data[i].order_payment2 != '待收' && data[i].order_payment2 != '待付' ? "(" + data[i].order_money + ")," + data[i].order_payment2 : "") + '</span></td>                                          ';
                    var consumeusername = isNullOrWhiteSpace(data[i].consumeusername) == true ? data[i].consumeusername : '';
                    var memberuserName = isNullOrWhiteSpace(data[i].memberuserName) == true ? data[i].memberuserName : '';
                    html += '<td><span>' + consumeusername + '</span></td>';
                    html += '<td><span>' + memberuserName + '</span></td> ';
                    html += '<td><span>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td>                              ';
                    html += '<td><span>' + data[i].sv_remarks + '</span></td> ';
                    html += '<td>                                                                ';
                    html += '<div class="xstbbtn">                                           ';
                    html += '<a href="javascript:void(0);"   data-id="' + data[i].order_running_id + '"   class="zxsfxthcl" >整单退货 </a> | <a href="javascript:void(0);" data-toggle="modal" data-target="#xsdykj">打印 </a>';
                    html += '</div>   ';
                    html += '';
                    html += '</td>        ';
                    html += ' </tr>            ';
                    for (var b = 0; b < data[i].prlist.length; b++) {
                        var discounttype = ''; // 折扣类型
                        var minprice = data[i].prlist[b].sv_p_minunitprice;          // 商品最低价
                        var sv_p_discount = data[i].prlist[b].sv_p_discount;         // 商品折扣
                        var sv_p_mindiscount = data[i].prlist[b].sv_p_mindiscount / 10;    // 商品最低折扣
                        var product_orig_discount = data[i].prlist[b].product_orig_discount; // 订单商品里保存的商品折扣
                        var sv_p_memberprice = data[i].prlist[b].sv_p_memberprice;   // 会员价
                        var product_discount = data[i].prlist[b].product_discount; // 成交折扣
                        var product_unitprice = data[i].prlist[b].product_unitprice; // 销售商品单价
                        var product_price = data[i].prlist[b].product_price;         // 原售单价
                        var discountPrice = parseFloat(product_orig_discount * product_price);
                        var product_num = data[i].prlist[b].product_num;
                        var weight = data[i].prlist[b].sv_p_weight;
                        var minprice_num = 0;
                        if (data[i].prlist[b].sv_pricing_method == 1) { // 计重
                            minprice_num = parseFloat(minprice * weight).toFixed(2);
                        }
                        else {
                            minprice_num = minprice * product_num;
                        }
                        var member_id = data[i].user_cardno != null && data[i].user_cardno != '' && data[i].user_cardno != '0' && data[i].user_cardno != 0 ? data[i].user_cardno : '';  // 会员Id
                        if (isNullOrWhiteSpace(member_id) && sv_p_memberprice > 0) {
                            discounttype = "会员价(" + sv_p_memberprice + ".00)";
                        }
                        else if (isNullOrWhiteSpace(member_id) && sv_p_mindiscount > 0 && product_orig_discount < sv_p_mindiscount) {
                            discounttype = "最低折(" + sv_p_mindiscount + ")";
                        }
                        else if (isNullOrWhiteSpace(member_id) && product_orig_discount > 0 && product_discount <= product_orig_discount && product_discount != 1 && discountPrice > product_unitprice) {
                            discounttype = "会员折(" + product_orig_discount + ")";
                        }
                        else if (isNullOrWhiteSpace(member_id) && discountPrice > 0 && discountPrice < minprice) {
                            discounttype = "最低价(" + minprice_num + ")";
                        }
                        else {
                            discounttype = "无折扣";
                        }

                        count += data[i].prlist[b].product_total;
                        //greyRender
                        if (data[i].prlist[b].order_stutia > 0) {
                            html += '<tr class="MoreGoodsSale danpinlisttt greyRender"  data-id= "' + data[i].order_id + '">  ';
                        } else {

                            html += '<tr class="MoreGoodsSale danpinlisttt " data-id= "' + data[i].order_id + '">  ';
                        }
                        html += '<td class="curpo">  ';
                        html += '<div class="imgAdapt"><img src="' + ((data[i].prlist[b].sv_p_images2 == null || data[i].prlist[b].sv_p_images2 == '') ? '' : (_g_res_images_url + data[i].prlist[b].sv_p_images2)) + '" onerror="this.src=\'/images/002.png\';"></div>';
                        html += '<div class="pull-left pos-r" style="overflow: initial;">';
                        html += '<h6 class="word-overflow "> ';
                        if (isNullOrWhiteSpace(data[i].prlist[b].product_name) && data[i].prlist[b].product_name.length > 10) {
                            html += '<span class="goodsTitle padingcen" title="' + data[i].prlist[b].product_name + '">' + data[i].prlist[b].product_name.substring(0, 10) + ' </span>';
                        } else {
                            html += '<span class="goodsTitle padingcen" title="' + data[i].prlist[b].product_name + '">' + data[i].prlist[b].product_name + ' </span>';
                        }

                        html += '<i class="icon-circle-arrow-right viii vkks"></i>';
                        html += '</h6> ';
                        html += '<div class="clearfix"></div>';
                        html += '  </div> ';
                        html += '</td>';
                        html += '<td><span></span></td>';
                        html += '<td><span></span></td>';
                        //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                        if (_g_everyDaySerialNumber) {
                            html += '<td></td>';
                        }
                        html += '<td><span>' + data[i].prlist[b].product_price + '</span></td>';
                        html += '<td><span>' + discounttype + '</span></td>';

                        var product_nums = data[i].prlist[b].sv_pricing_method == 1 ? data[i].prlist[b].sv_p_weight : data[i].prlist[b].product_num; // 商品数量
                        html += '<td><span> ' + product_nums + '</span></td>';
                        html += '<td><i>¥ ' + data[i].prlist[b].product_total + '</i></td>';
                        html += '<td><span></span></td>';
                        html += '<td><span></span></td>';
                        html += '<td><span></span></td>';
                        html += '<td><span></span></td>';
                        html += '<td><span></span></td>';
                        html += '<td>';
                        html += '<div class="xstbbtn">';
                        html += '<a href="javascript:void(0);" data-productnum="' + product_nums + '" data-pricingmethod = "' + data[i].prlist[b].sv_pricing_method + '" data-prid="' + data[i].prlist[b].product_id + '"  data-id="' + data[i].order_running_id + '" class="xsfxthcl" >退换货 </a> ';//| <a href="javascript:void(0);"  data-toggle="modal" data-target="#xsfxxiqing" >详情 </a> 
                        html += '</div>';
                        html += '</td> ';
                        html += '</tr> ';
                    }
                }
                else { // 单个
                    if (data[i].prlist != null && data[i].prlist != '' && data[i].prlist.length > 0) {
                        var discounttype = ''; // 折扣类型
                        var minprice = data[i].prlist[0].sv_p_minunitprice;          // 商品最低价
                        var sv_p_discount = data[i].prlist[0].sv_p_discount;         // 商品折扣
                        var sv_p_mindiscount = data[i].prlist[0].sv_p_mindiscount / 10;    // 商品最低折扣
                        var product_orig_discount = data[i].prlist[0].product_orig_discount; // 订单商品里保存的商品折扣
                        var sv_p_memberprice = data[i].prlist[0].sv_p_memberprice;   // 会员价
                        var product_discount = data[i].prlist[0].product_discount; // 成交折扣
                        var product_unitprice = data[i].prlist[0].product_unitprice; // 销售商品单价
                        var product_price = data[i].prlist[0].product_price;         // 原售单价
                        var discountPrice = parseFloat(product_orig_discount * product_price);
                        var product_num = data[i].prlist[0].product_num;
                        var weight = data[i].prlist[0].sv_p_weight;
                        var minprice_num = 0;
                        if (data[i].prlist[0].sv_pricing_method == 1) { // 计重
                            minprice_num = parseFloat(minprice * weight).toFixed(2);
                        }
                        else {
                            minprice_num = minprice * product_num;
                        }
                        var member_id = data[i].user_cardno != null && data[i].user_cardno != '' && data[i].user_cardno != '0' && data[i].user_cardno != 0 ? data[i].user_cardno : '';  // 会员Id
                        if (isNullOrWhiteSpace(member_id) && sv_p_memberprice > 0) {
                            discounttype = "会员价(" + sv_p_memberprice + ".00)";
                        }
                        else if (isNullOrWhiteSpace(member_id) && sv_p_mindiscount > 0 && product_orig_discount < sv_p_mindiscount) {
                            discounttype = "最低折(" + sv_p_mindiscount + ")";
                        }
                        else if (isNullOrWhiteSpace(member_id) && product_orig_discount > 0 && product_discount <= product_orig_discount && product_discount != 1 && discountPrice > product_unitprice) {
                            discounttype = "会员折(" + product_orig_discount + ")";
                        }
                        else if (isNullOrWhiteSpace(member_id) && discountPrice > 0 && discountPrice < minprice) {
                            discounttype = "最低价(" + minprice_num + ")";
                        }
                        else {
                            discounttype = "无折扣";
                        }

                        if (data[i].prlist[0].order_stutia > 0) {
                            html += '<tr class="danpinlisttt greyRender" data-id="' + data[i].order_id + '"> ';
                        } else {

                            html += '<tr class="danpinlisttt " data-id="' + data[i].order_id + '"> ';
                        }
                        html += '<td class="curpo"> <div class="imgAdapt"><img src="' + ((data[i].prlist[0].sv_p_images2 == null || data[i].prlist[0].sv_p_images2 == '') ? '' : (_g_res_images_url + data[i].prlist[0].sv_p_images2)) + '" onerror="this.src=\'/images/002.png\';"></div>';
                        html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                        html += '<h6 class="word-overflow ">';
                        html += '<span class="goodsTitle" title="' + data[i].prlist[0].product_name + '">';
                        if (isNullOrWhiteSpace(data[i].prlist[0].product_name) && data[i].prlist[0].product_name.length > 10) {
                            html += '<span class="goodsTitle padingcen" title="' + data[i].prlist[0].product_name + '">' + data[i].prlist[0].product_name.substring(0, 10) + ' </span>';
                        } else {
                            html += '  ' + data[i].prlist[0].product_name + '  ';
                        }

                        html += '</span> ';
                        html += '<i class="icon-circle-arrow-right viii"></i> ';
                        html += '</h6>';
                        html += '<div class="clearfix"></div> ';
                        html += '<p class="word-overflow">    ';
                        var sv_p_barcode = data[i].prlist[0].sv_p_barcode != null && data[i].prlist[0].sv_p_barcode != '' ? data[i].prlist[0].sv_p_barcode : '';
                        html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_p_barcode + '</a>';
                        html += '</p>';
                        html += '</div>';
                        html += '</td>';
                        html += '<td><span>' + data[i].order_running_id + '</span></td>';
                        if (_g_everyDaySerialNumber) {
                            if (!data[i].order_serial_number) {
                                data[i].order_serial_number = "";
                            }
                            html += '<td><span>' + data[i].order_serial_number + '</span></td>';
                        }
                        if (data[i].user_cardno != "0") {
                            html += '<td class="curpo">';
                            html += ' <div class="pull-left pos-r" style="overflow: initial;">';
                            html += '<h6 class="word-overflow ">';
                            html += '<span class="goodsTitle" title="' + data[i].sv_mr_name + '">';
                            if (data[i].sv_mr_name == null)
                                html += '<img src="/images/001.png" />';
                            else if (isNullOrWhiteSpace(data[i].sv_mr_name) && data[i].sv_mr_name.length > 10) {
                                html += '<span class="goodsTitle padingcen" title="' + data[i].sv_mr_name + '">' + data[i].sv_mr_name.substring(0, 10) + ' </span>';
                            } else {
                                html += '  ' + data[i].sv_mr_name + '  ';
                            }

                            html += '</span> ';
                            html += '</h6>';
                            html += '<div class="clearfix"></div> ';
                            html += '<p class="word-overflow">    ';
                            var sv_mr_cardno = data[i].prlist[0].member_card_no != null && data[i].prlist[0].member_card_no != '' ? data[i].prlist[0].member_card_no : '';
                            if (sv_mr_cardno.length > 10)
                                sv_mr_cardno = '*' + sv_mr_cardno.substring(sv_mr_cardno.length - 10, sv_mr_cardno.length);
                            html += '<a href="javascript:void(0)" class=" fs-12 light no-margin">' + sv_mr_cardno + '</a>';
                            html += '</p>';
                            html += '</div>';
                            html += '</td>';

                        } else {
                            html += '<td><span>散客消费</span></td>';
                        }

                        //html += '<td><i>¥ ' + data[i].prlist[0].product_total + '</i></td>';
                        //html += '<td><span>' + data[i].order_discount + '</span></td> ';
                        html += '<td><span>' + data[i].prlist[0].product_price + '</span></td>';
                        html += '<td><span>' + discounttype + '</span></td>';
                        var product_num = data[i].prlist[0].sv_pricing_method == 1 ? data[i].prlist[0].sv_p_weight : data[i].prlist[0].product_num; // 商品数量
                        html += '<td><span>' + product_num + '</span></td>';
                        html += '<td><i>¥ ' + data[i].order_receivable + '</i></td>';
                        html += '<td><span>' + data[i].order_payment + (data[i].order_payment2 != '待收' && data[i].order_payment2 != '待付' ? "(" + parseFloat(data[i].order_money).toFixed(2) + "," + data[i].order_payment2 : "") + '</span></td>';
                        var consumeusername = isNullOrWhiteSpace(data[i].consumeusername) == true ? data[i].consumeusername : '';
                        var memberuserName = isNullOrWhiteSpace(data[i].memberuserName) == true ? data[i].memberuserName : '';
                        html += '<td><span>' + consumeusername + '</span></td>';
                        html += '<td><span>' + memberuserName + '</span></td> ';
                        html += '<td><span>' + new Date(data[i].order_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td> ';
                        html += '<td><span>' + data[i].sv_remarks + '</span></td> ';
                        html += '<td>';
                        html += '<div class="xstbbtn">';
                        html += '<a href="javascript:void(0);" data-productnum="' + product_num + '" data-pricingmethod = "' + data[i].prlist[0].sv_pricing_method + '" data-prid="' + data[i].prlist[0].product_id + '"  data-id="' + data[i].order_running_id + '" class="xsfxthcl"  >退换货 </a> | <a href="javascript:void(0);"  class="dayin" data-id="' + data[i].order_running_id + '">打印</a> ';//| <a href="#">详情</a>
                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                        count += data[i].prlist[0].product_total;

                    }
                }
            }
        }

        $("#saleslist").html(html);

        var priid = $('.danpintr td:first-child');
        var sacid = $('.danpicount td:first-child');
        //多笔订单展开事件
        priid.click(function () {
            var indexid = $(this).parent().attr('data-id');
            $('.MoreGoodsSale[data-id="' + indexid + '"]').show();
            $('.danpinlisttt[data-id="' + indexid + '"]').addClass('bgf4f4');
            $('.danpinlisttt[data-id="' + indexid + '"]:last').addClass('bot2mon');
            $(this).parent().hide();
        });
        //多笔订单关闭事件
        sacid.click(function () {
            var indexid = $(this).parent().attr('data-id');
            $('.MoreGoodsSale[data-id="' + indexid + '"]').hide();
            $('.danpintr[data-id="' + indexid + '"]').show();
        });
    });
}
//分店信息
function GetStorelist() {
    var type = 0;
    $.get('/BranchStore/GetStorelist/?type=' + type, function (data) {
        if (data == -2) {
            layer.msg("您没有该权限！");
        }
        else {
            if (data == -1) {
                $("#StoreSearch").hide();
            } else {
                $("#StoreSearch").show();
                var listhtml = '';
                for (var theadKey in data) {
                    listhtml += data[theadKey];
                }
                $('#StoreSearch').html(listhtml);
            }
        }
    });
}

//获取操作员信息
function GetOperaterList() {
    var html = '<option value="">操作员</option>';
    $.getJSON("/Salesclerk/PageList/", { page: 1, pagesize: 100 }, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                if (isNullOrWhiteSpace(data[i].sv_employee_name)) {
                    html += '<option value="' + data[i].sp_salesclerkid + '">' + data[i].sv_employee_name + '</option>';
                }
                else {
                    html += '<option value=""></option>';
                }
            }
        }
        $("#sellerlist").html(html);
    });
}