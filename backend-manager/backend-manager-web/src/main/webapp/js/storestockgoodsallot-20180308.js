var pageSize = 10;
$(document).ready(function () {

    if ($("#Statetype").val() == "0") {
        $("#OutStore").attr("disabled", "disabled");
    }
    GetStorelist();
    if (document.URL.indexOf("StoreStockGoodsAllotlist") > 0) {
        transfersrecord();
    } else {
        //选择店铺查询
        $("#OutStore").change(function () {
            page($("#OutStore").val(), $("#query_like").val());
        });
        $("#query_like").keyup(function () {
            page($("#OutStore").val(), $("#query_like").val());
        });
        page($("#OutStore").val());
    };
});


//获取店铺下拉框信息
function GetStorelist() {
    $.get('/BranchStore/GetStorelist/?type=1&&StorePageState=4', function (data) {
        if (data == -2) {
            layer.msg("您没有该权限！");
        }
        else {
            var listhtml = '';
            if (data == -1) {
                $(".storeinfo").hide();
            } else {
                $(".storeinfo").show();
                for (var theadKey in data) {
                    listhtml += data[theadKey];
                }
                $("#OutStore,#IntoStore").html(listhtml);
            }

        }
    });
}

///分页配置
function page(strstore, search) {
    //初始化分页内容
    $.get("/StoreStockGoodsAllot/GetStockinfoCount/", { strstore: strstore, search: search }, function (data) {

        var i = Math.ceil(data / pageSize);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                getaupplyshopList(strstore, search, e.curr, pageSize);

            }
        });
    });

}

// 原有库存信息
function getaupplyshopList(strstore, search, page, pageSize) {
    var html = '';
    $.getJson("/StoreStockGoodsAllot/GetStockinfolist/", { strstore: strstore, search: search, pageIndex: page, pageSize: pageSize }, function (data) {
        if (data != null) {
            var checkCount = 0;
            for (var i = 0; i < data.length; i++) {

                var result = check_val[data[i].product_id];

                var c = "";
                var cClass = "";
                if (result != undefined) {
                    checkCount++;
                    c = "checked";
                    cClass = "checkedBox";
                }


                html += '<tr><td><div class="check-box ccc ' + cClass + '"><i><input type="checkbox" name="subbox" ' + c + '  value="' + data[i].product_id + '" data-pricingmethod="' + data[i].sv_pricing_method + '"></i></div></td>';
                html += '<td id="barcode' + data[i].product_id + '">' + data[i].sv_p_barcode + '</td>';
                if (!isNullOrWhiteSpace(data[i].sv_p_name))
                    html += '<td></td>';
                else {
                    if (data[i].sv_p_name.length > 11)
                        html += '<td  id="name' + data[i].product_id + '"  data-toggle="tooltip" data-placement="top" title="' + data[i].sv_p_name + '">' + data[i].sv_p_name.substring(0, 10) + "......" + '</td>';
                    else
                        html += '<td id="name' + data[i].product_id + '">' + data[i].sv_p_name + '</td>';
                }
                var sv_p_storage = data[i].sv_pricing_method == 1 ? data[i].sv_p_total_weight : data[i].sv_p_storage;

                html += '<td id="storage' + data[i].product_id + '">' + sv_p_storage + '</td>';
                html += '<td>' + data[i].sv_p_originalprice + '</td>';
                if (!isNullOrWhiteSpace(data[i].sv_p_unit))
                    html += '<td></td>';
                else
                    html += '<td>' + data[i].sv_p_unit + '</td>';
                if (!isNullOrWhiteSpace(data[i].sv_p_name))
                    html += '<td></td>';
                else
                    html += '<td>' + data[i].sv_pc_name + '</td>';
                html += '</tr>';
            }

        }
        else {
            html = '';
        }
        if (checkCount == data.length) {
            $("#checkAll").find("input").prop("checked", true);
            $("#checkAll").addClass('checkedBox');
        } else {
            $("#checkAll").find("input").prop("checked", false);
            $("#checkAll").removeClass('checkedBox');
        }

        $("#inventoryDetail").html(html);
    });
}
//多选
// 单个checkbox选中取消
$(document).on("click", ".check-box", function (e) {

    if (!$(this).find("input").prop("checked")) {
        $(this).find("input").prop("checked", true);
        $(this).addClass('checkedBox');


        var id = $(this).find("input").val();
        if (id != 'on')
            check_val[id] = id;

        if ($('input[name="subbox"]:checked').length == $('input[name="subbox"]').length) {
            $("#checkAll").find("input").prop("checked", true);
            $("#checkAll").addClass('checkedBox');
        }
    }
    else {
        $(this).find("input").prop("checked", false);
        $(this).removeClass('checkedBox');
        var id = $(this).find("input").val();
        delete check_val[id];

        $("#checkAll").find("input").prop("checked", false);
        $("#checkAll").removeClass('checkedBox');
    }

    if ($(this).attr("id") == "checkAll") {
        if (!$("#checkAll").find("input").prop("checked")) {
            $('input[name="subbox"]').prop("checked", false);
            $('input[name="subbox"]').parent().parent().removeClass('checkedBox');

            $('input[name="subbox"]').each(function () {
                var id = $(this).val();
                delete check_val[id];
            });
        }
        else {
            $('input[name="subbox"]').prop("checked", true);
            $('input[name="subbox"]').parent().parent().addClass('checkedBox');

            $('input[name="subbox"]').each(function () {
                var id = $(this).val();
                if (id != 'on')
                    check_val[id] = id;
            });
        }
    }

    if ($(".checkedBox").length > 0) {
        $(".unlinks li").addClass("active");
    } else {
        $(".unlinks li").removeClass("active");
    }
});
function gettransfersDetaillist(productid, strstore) {

    var pStr = '';
    for (var key in productid) {
        pStr += key + ',';
    }
    if (pStr.length > 0)
        pStr = pStr.substr(0, pStr.length - 1);
    else {
        layer.msg("请选择要调拨的货物");
        return;
    }
    var html = '';
    $.getJson("/StoreStockGoodsAllot/GetStockinfolist/", { strstore: strstore, search: null, pageIndex: 0, pageSize: 0, productid: pStr }, function (data) {
        if (data != null) {
            j = 0;
            var sv_transfernumber = 1;
            $("#summoney").text("0");
            var list = TransfersList();
            for (var i = 0; i < data.length; i++) {
                sv_transfernumber = 1;
                for (var s = 0; s < list.length; s++) {
                    if (list[s].product_id == data[i].product_id)
                    {
                        sv_transfernumber = list[s].sv_transfernumber;  
                    }
                }
                html += '<tr class="batchTr" id="' + data[i].product_id + '" data-pricingmethod = "' + data[i].sv_pricing_method + '">';
                html += '<td><input type="hidden" name="product_id" value="' + data[i].product_id + '"/>' + data[i].sv_p_barcode + '</td>';
                if (!isNullOrWhiteSpace(data[i].sv_p_name))
                    html += '<td></td>';
                else {
                    if (data[i].sv_p_name.length > 11)
                        html += '<td   data-toggle="tooltip" data-placement="top" title="' + data[i].sv_p_name + '">' + data[i].sv_p_name.substring(0, 10) + "......" + '</td>';
                    else
                        html += '<td>' + data[i].sv_p_name + '</td>';
                }
                var sv_p_storage = data[i].sv_pricing_method == 1 ? data[i].sv_p_total_weight : data[i].sv_p_storage;
                html += '<td><input type="hidden"  id="sv_p_storage_' + data[i].product_id + '" value="' + Math.ceil(sv_p_storage) + '"/>';
                html += '<div class="addshuxl"><span class="addjian"  onclick ="addjian(' + data[i].product_id + ',' + data[i].sv_pricing_method + ')">';
                html += '</span><input data-pricingmethod ="' + data[i].sv_pricing_method + '" onchange="numberonchange(' + data[i].product_id + ',' + data[i].sv_pricing_method + ')" onclick="numberonclick(' + data[i].product_id + ');" name="sv_transfernumber" id="number_' + data[i].product_id + '" type="tel" class="addtext" min="0" max="' + (sv_p_storage - data[i].sv_transfernumber) + '" value="' + sv_transfernumber + '"><span class="addadd" onclick="addadd(' + data[i].product_id + ')"></span></div></td>';
                html
                html += '<td id="sv_p_originalprice_' + data[i].product_id + '">' + data[i].sv_p_originalprice + '</td>';
                if (!isNullOrWhiteSpace(data[i].sv_p_unit))
                    html += '<td></td>';
                else
                    html += '<td>' + data[i].sv_p_unit + '</td>';
                html += '<td id="totalmoney_' + data[i].product_id + '">' + data[i].sv_p_originalprice + '</td>';
                if (!isNullOrWhiteSpace(data[i].sv_pc_name))
                    html += '<td></td>';
                else
                    html += '<td>' + data[i].sv_pc_name + '</td>';
                html += '<td><div class="addshuxl"><span class="addjian"  onclick ="deletetr(' + data[i].product_id + ')"></span></div></td>';
                html += '</tr>';
                $("#sumnumber").text(parseFloat(j) + parseFloat(sv_transfernumber));
                j = j + parseFloat(sv_transfernumber);
                $("#summoney").text((parseFloat($("#summoney").text()) + parseFloat(data[i].sv_p_originalprice)).toFixed(2))
            }
        }
        else {
            html = '';
        }
        $("#transfersDetail").html(html);
    });
    TransfersOperation();
}

var re = /^[0-9]*[1-9][0-9]*$/;
//增加数量
function addadd(id) {
    var number = parseFloat($("#number_" + id).val());//当前数量
    var sv_p_storage = parseFloat($("#number_" + id).attr('max'));
    var pricingmethod = parseInt($("#number_" + id).attr('data-pricingmethod'));
    var originalprice = parseFloat($("#sv_p_originalprice_" + id).text());//进价
    if (number + 1 > sv_p_storage) {
        layer.msg("数量不能超过原仓库数量！");
        return false;
    }
    else if (pricingmethod == 0 && !re.test(number)) {
        layer.msg("该商品为计件商品，请输入正整数！");
        return;
    }
    else {
        $("#number_" + id).val((number + 1).toFixed(2));//数量叠加
        $("#totalmoney_" + id).text(((number + 1) * originalprice).toFixed(2));//总金额
        $("#summoney").text((parseFloat($("#summoney").text()) + originalprice * 1).toFixed(2));
        $("#sumnumber").text((parseFloat($("#sumnumber").text()) + 1).toFixed(2));
    }
}
//减少数量
function addjian(id) {
    var number = parseFloat($("#number_" + id).val()) - 1;//当前数量
    var pricingmethod = parseInt($("#number_" + id).attr('data-pricingmethod'));
    var originalprice = (parseFloat($("#sv_p_originalprice_" + id).text())).toFixed(2);//进价
    var origtotalmoney = (parseFloat($("#totalmoney_" + id).text())).toFixed(2);//当前总金额
    if (number <= 0) {
        if (pricingmethod == 1) {
            layer.msg("计重商品重量不能少于0.01！");
        } else {
            layer.msg("计件商品数量不能少于1！");
        }
        return false;
    }
    else {
        if (pricingmethod == 0) {
            if (!re.test(number)) {
                layer.msg("该商品为计件商品，请输入正整数！");
                return;
            }
        }
        $("#number_" + id).val(number.toFixed(2));//数量叠加
        $("#totalmoney_" + id).text((origtotalmoney - 1 * originalprice).toFixed(2));//总金额
        $("#summoney").text((parseFloat($("#summoney").text()) - originalprice * 1).toFixed(2));
        $("#sumnumber").text((parseFloat($("#sumnumber").text()) - 1).toFixed(2));

    }
}
//移除行
function deletetr(id) {
    var number = parseFloat($("#number_" + id).val());//当前数量
    var originalprice = parseFloat($("#sv_p_originalprice_" + id).text());//进价
    $("#summoney").text((parseFloat($("#summoney").text()) - originalprice * number).toFixed(2));
    $("#sumnumber").text((parseFloat($("#sumnumber").text()) - number))
    $("#" + id).remove();
    if (parseFloat($("#sumnumber").text()) == 0) {
        page($("#OutStore").val());
    }

    delete check_val[id];
}

function clearNoNumber_input(id, pricingmethod) {
    //if (obj != null && obj != '' && obj != undefined && obj.value != null && obj.value != '' && obj.value != undefined) {
    //    if ($("input[name=sv_pricing_method]:checked")) {
    //        if ($("input[name=sv_pricing_method]:checked").val() == "0") {
    //            obj.value = parseFloat(obj.value || 0)
    //            obj.value = obj.value.replace(/[^\-\d]/g, '');  //清除“数字
    //        } else {
    //            // obj.value = obj.value.replace(/[^\d\.]/g, '')
    //            obj.value = obj.value.replace(/[^\-\d\.]/g, "");  //清除“数字”和“.”以外的字符
    //            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    //            //obj.value = parseFloat(obj.value||0);
    //        }
    //    }
    //}
}
var _number = 0;
//数量触发事件
function numberonchange(id, pricingmethod) {
    var pricingmethod = parseInt($("#number_" + id).attr('data-pricingmethod'));
    var number = parseFloat($("#number_" + id).val());//当前数量
    if (pricingmethod == 1) {
        number = parseFloat(number.toFixed(2));
    }
    var sv_p_storage = parseFloat($("#number_" + id).attr('max'));//剩余数量
    var originalprice = parseFloat($("#sv_p_originalprice_" + id).text());//进价
    var origtotalmoney = parseFloat($("#totalmoney_" + id).text());//当前总金额
    if (!isNaN(number)) {
        if (_number != 0 && number > _number) {
            number = _number + (number - _number);

        } else if (_number != 0 && number < _number && pricingmethod == 0) {
            number = _number - (_number - number);
        } else if (_number != 0 && _number == 1 && number < _number && pricingmethod == 1) {
            number = number;
        } else if (_number != 0 && number < _number) {
            number = _number - (_number - number);

        }
        if (number == 0) {
            $("#number_" + id).val(1);//数量叠加
            if (_number > 0) {
                $("#sumnumber").text((parseFloat($("#sumnumber").text()) - _number + 1).toFixed(2));
                $("#totalmoney_" + id).text((_number * originalprice).toFixed(2));//总金额
                $("#summoney").text((parseFloat($("#summoney").text()) - origtotalmoney + originalprice * _number).toFixed(2));
            } else {
                $("#totalmoney_" + id).text((1 * originalprice).toFixed(2));//总金额
            }
            if (pricingmethod == 0)
            { layer.msg("计件商品数量不能少于1！"); }
            else {
                layer.msg("计重商品重量不能少于0.01！");
            }
            return false;
        }
        else if (pricingmethod == 0 && !re.test(number)) {
            layer.msg("该商品为计件商品，请输入正整数！");
            $("#number_" + id).val(1);
            return false;
        }
        else if (number > sv_p_storage) {
            $("#number_" + id).val(1);//数量叠加
            $("#sumnumber").text((parseFloat($("#sumnumber").text()) - _number + 1).toFixed(2));
            $("#summoney").text((parseFloat($("#summoney").text()) - origtotalmoney + originalprice * parseFloat($("#number_" + id).val())).toFixed(2));
            $("#totalmoney_" + id).text(1 * originalprice);//总金额
            layer.msg("数量不能超过原库存数量！");
            return false;

        } else {
            $("#number_" + id).val(number.toFixed(2));//数量叠加
            $("#sumnumber").text((parseFloat($("#sumnumber").text()) - _number + number).toFixed(2));
            $("#summoney").text((parseFloat($("#summoney").text()) - origtotalmoney + originalprice * number).toFixed(2));
            $("#totalmoney_" + id).text((number * originalprice).toFixed(2));//总金额
        }
    } else {
        layer.msg("数量输入有误！");
        return false;
    }
}


function numberonclick(id) {
    var sum_number = 0
    var pricingmethod = parseInt($("#number_" + id).attr('data-pricingmethod'));
    if (pricingmethod == 0) {
        _number = parseInt($("#number_" + id).val());//当前数量
    } else {
        _number = parseFloat($("#number_" + id).val());//当前数量
    }
    if (_number <= 0) {
        $("#transfersDetail inpt[name=sv_transfernumber]").each(function () {
            sum_number = sum_number + parseFloat($(this).val());
        });
        if (sum_number > 0) {
            _number = (parseFloat($("#sumnumber").text()) - parseFloat(sum_number)).toFixed(2);
        }
        else {
            _number = 0;
        }

    }
}
//选择
function ChooseProduct() {
    var OutStore = $("#OutStore").val(), IntoStore = $("#IntoStore").val();
    if (OutStore != IntoStore && isNullOrWhiteSpace(IntoStore)) {
        $.getJson("/BranchStore/GetStoreRelation/", { IntoStore: IntoStore, OutStore: OutStore }, function (data) {
            if (data != null) {
                if (data.av_shopstate == 1 && data.sv_deliveryway > 0) {
                    if ((data.sv_deliveryway == 1)
                        || (data.sv_deliveryway == 2 && data.sv_subbranch_id == IntoStore)) {

                        selectGiftExchangeList();
                    } else {
                        layer.msg("《" + $('#OutStore option:selected').text() + "》店铺 \n 与《" + $('#IntoStore option:selected').text() + "》店铺的调拨方式为：《" + data.sv_deliverywayName + "》");
                    }
                } else {
                    layer.msg("请先设置分店店铺状态，以及调拨方法");
                }
                //&&data.sv_subbranch_id
            } else {
                layer.msg("《" + $('#OutStore option:selected').text() + "》店铺 \n 与《" + $('#IntoStore option:selected').text() + "》店铺是同一级关系店铺")
            };
        });


    } else {
        layer.msg("库存调入店铺与调出店铺不能相同,请选择对应的店铺");
    };

}
var check_val = {};
function selectGiftExchangeList() {

    var ckList = $('input[name="subbox"]:checked');
    var obj = document.getElementsByName("subbox");

    var msg = "";
    for (var k in obj) {
        if (obj[k].checked)
            if (obj[k].value != 'on') {
                if ($("#storage" + obj[k].value).text() >= 1)
                    check_val[obj[k].value] = obj[k].value;
                else
                    msg += "《" + $("#name" + obj[k].value).text() + "》；"
            }
    }
    if (check_val != {}) {
        if (msg != "") {
            layer.msg(msg + "库存不足");
            return;
        }
        gettransfersDetaillist(check_val, $("#OutStore").val());

    }
    else {
        if (msg != "")
            layer.msg(msg + "库存不足")
        layer.msg('每次所选调拨数量不能低于《1》，请选择调拨数据！');
    }
}
///调拨
function TransfersOperation() {
    var IntoStore = $('#IntoStore').val(), OutStore = $('#OutStore').val();
    $('#Transfers').click(function () {
        $.getJson("/BranchStore/GetStoreRelation/", { IntoStore: IntoStore, OutStore: OutStore }, function (data) {
            if (data != null) {
                if (data.av_shopstate == 1 && data.sv_deliveryway > 0) {
                    if ((data.sv_deliveryway == 1)
                        || (data.sv_deliveryway == 2 && data.sv_subbranch_id == IntoStore)) {
                        var list = TransfersList();
                        layer.confirm("您确认要把《" + $('#OutStore option:selected').text() + "》店铺库存调拨到《" + $('#IntoStore option:selected').text() + "》店铺库存去吗？", { btn: ["确认调拨", "关闭"] }, function () {
                            var list = TransfersList();
                            $.ajax({
                                url: '/StoreStockGoodsAllot/SaveStoreStockLotted',
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify(list),
                                async: false,
                                success: function (result) {
                                    if (result.succeed == true) {
                                        layer.msg(result.values);
                                        location.reload();
                                        page($("#OutStore").val());
                                        $("tr[class=batchTr]").remove();
                                    }
                                    else if (result == -2) {
                                        layer.msg("你没有该操作权限！");
                                    }
                                    else {
                                        layer.msg(result.values);
                                    }
                                }
                            });
                        });

                    } else {
                        layer.msg("《" + $('#OutStore option:selected').text() + "》店铺 \n 与《" + $('#IntoStore option:selected').text() + "》店铺的调拨方式为：《" + data.sv_deliverywayName + "》");
                    }
                } else {
                    layer.msg("请先设置分店店铺状态，以及调拨方法");
                }

            } else {
                layer.msg("《" + $('#OutStore option:selected').text() + "》店铺 \n 与《" + $('#IntoStore option:selected').text() + "》店铺是同一级关系店铺")
            }

        });
    });
}
//获取调拨商品id 调拨数量
function TransfersList() {
    var list = new Array();
    var av_aupplyshop_id = $('#OutStore').val();
    var sv_targetshop_id = $('#IntoStore').val()
    var sv_remarks = $("#sv_remarks").val();
    $("#transfersDetail .batchTr").each(function () {
        var sv_transfernumber = $(this).find("input[name='sv_transfernumber']").val();
        var product_id = $(this).find("input[name='product_id']").val();
        var model = {
            sv_transfernumber: sv_transfernumber,
            product_id: product_id,
            sv_targetshop_id: sv_targetshop_id,
            av_aupplyshop_id: av_aupplyshop_id,
            sv_remarks: sv_remarks,
            sv_pricing_method: $(this).attr('data-pricingmethod')
        };

        if (av_aupplyshop_id > 0 && sv_transfernumber > 0) {
            list.push(model);
        }
    });
    if (list.length == 0) {
        layer.msg("请选择要调拨的库存数据！");
    }
    return list;
}

//--------------------------------------------------调拨记录----------------------------------
//调拨记录
function transfersrecord() {
    //时间
    $("#endDate").val(new Date().Format("yyyy-MM-dd"));
    laydate.skin('molv');//主题皮肤
    laydate({
        elem: '#startDate',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true
    });
    laydate({
        elem: '#endDate',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true
    });
    $("#query_like").keyup(function () {
        transfersrecordpage($("#OutStore").val(), $("#IntoStore").val(), $("#query_like").val(), $("#startDate").val(), $("#endDate").val());
    });
    transfersrecordpage("", "", "", "", "")
    getTransfers();
    $("#Refresh").click(function () {
        transfersrecordpage("", "", "", "", "")
    });
    $("#query_like").keyup(function () {
        page($("#OutStore").val(), $("#IntoStore").val(), $("#query_like").val(), $("#startDate").val(), $("#endDate").val());
    });
}
//-----分页
///分页配置
function transfersrecordpage(aupplyshop_id, targetshop_id, search, startDate, endDate) {
    //初始化分页内容
    var searchconditions = { aupplyshop_id: aupplyshop_id, targetshop_id: targetshop_id, search: search, startDate: startDate, endDate: endDate, pageSize: pageSize }
    searchconditions = JSON.stringify(searchconditions)
    $.get("/StoreStockGoodsAllot/GetTransfersRecordList/", { searchconditions: searchconditions, pageIndex: 0 }, function (data) {
        var sumnumber = 0;
        if (data != null && data.sumnumber != null) {
            sumnumber = data.sumnumber
        }
        var i = Math.ceil(sumnumber / pageSize);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                transfersrecordList(searchconditions, e.curr);

            }
        });
    });

}
//调拨记录
function transfersrecordList(searchconditions, pageIndex) {
    var html = '';
    $.getJson("/StoreStockGoodsAllot/GetTransfersRecordList/", { searchconditions: searchconditions, pageIndex: pageIndex }, function (data) {
        if (data != null && data.list != null) {
            for (var i = 0; i < data.list.length; i++) {
                html += '<tr id=' + data.list[i].record_id + '><td>' + (i + 1) + '</td>';

                if (!isNullOrWhiteSpace(data.list[i].newp_barcode)) {
                    if (!isNullOrWhiteSpace(data.list[i].origp_barcode))
                        html += '<td></td>';
                    else
                        html += '<td>' + data.list[i].origp_barcode + '</td>';
                }
                else
                    html += '<td>' + data.list[i].newp_barcode + '</td>';
                if (!isNullOrWhiteSpace(data.list[i].newp_name)) {
                    if (data.list[i].origp_name.length > 11)
                        html += '<td   data-toggle="tooltip" data-placement="top" title="' + data.list[i].origp_name + '">' + data.list[i].origp_name.substring(0, 10) + "......" + '</td>';
                    else
                        html += '<td>' + data.list[i].origp_name + '</td>';

                }
                else {
                    if (data.list[i].newp_name.length > 11)
                        html += '<td   data-toggle="tooltip" data-placement="top" title="' + data.list[i].newp_name + '">' + data.list[i].newp_name.substring(0, 10) + "......" + '</td>';
                    else
                        html += '<td>' + data.list[i].newp_name + '</td>';
                }
                if (!isNullOrWhiteSpace(data.list[i].origp_barcode))
                    html += '<td></td>';
                else
                    html += '<td>' + data.list[i].origp_barcode + '</td>';
                if (!isNullOrWhiteSpace(data.list[i].origp_name))
                    html += '<td></td>';
                else {
                    if (data.list[i].origp_name.length > 11)
                        html += '<td   data-toggle="tooltip" data-placement="top" title="' + data.list[i].origp_name + '">' + data.list[i].origp_name.substring(0, 10) + "......" + '</td>';
                    else
                        html += '<td>' + data.list[i].origp_name + '</td>';
                }
                if (data.list[i].sv_pricing_method == 1) {
                    html += '<td>' + data.list[i].sv_transferweight + '</td>';
                    html += '<td id=' + data.list[i].av_aupplyshop_id + '>' + data.list[i].av_aupplyshop_name + '</td>';
                    html += '<td>' + data.list[i].sv_aupplyshoptransfrontweight + '</td>';
                    html += '<td>' + data.list[i].sv_aupplyshoptransfterweight + '</td>';
                    html += '<td id=' + data.list[i].sv_targetshop_id + '>' + data.list[i].sv_targetshop_name + '</td>';
                    html += '<td>' + data.list[i].sv_targetshopallotfrontweight + '</td>';
                    html += '<td>' + data.list[i].sv_targetshopallotfterweight + '</td>';
                }
                else {
                    html += '<td>' + data.list[i].sv_transfernumber + '</td>';
                    html += '<td id=' + data.list[i].av_aupplyshop_id + '>' + data.list[i].av_aupplyshop_name + '</td>';
                    html += '<td>' + data.list[i].sv_aupplyshoptransfrontnumber + '</td>';
                    html += '<td>' + data.list[i].sv_aupplyshoptransfternumber + '</td>';
                    html += '<td id=' + data.list[i].sv_targetshop_id + '>' + data.list[i].sv_targetshop_name + '</td>';
                    html += '<td>' + data.list[i].sv_targetshopallotfrontnumber + '</td>';
                    html += '<td>' + data.list[i].sv_targetshopallotfternumber + '</td>';
                }
                html += '<td>' + data.list[i].sv_employee_name + '</td>';
                html += '<td class="proutime"><span>' + new Date(data.list[i].sv_transferdate).Format('yyyy-MM-dd hh:mm:ss') + '</span></td>';
                if (isNullOrWhiteSpace(data.list[i].sv_remarks) && data.list[i].sv_remarks.length > 11) {
                    html += '<td   data-toggle="tooltip" data-placement="top" title="' + data.list[i].sv_remarks + '">' + data.list[i].sv_remarks.substring(0, 10) + "......" + '</td>';
                } else {
                    html += '<td>' + data.list[i].sv_remarks + '</td>';
                }
                html += '</tr>';

            }
        }
        else {
            html = '';
        }
        $("#stockrecordlist").html(html);
    });
}
function getTransfers() {
    $("#Transfers").click(function () {
        var _aupplyshop_id = $("#OutStore").val();
        var _targetshop_id = $("#IntoStore").val();
        var _startDate = $("#startDate").val();
        var _endDate = $("#endDate").val();
        var _search = $("#query_like").val();
        transfersrecordpage(_aupplyshop_id, _targetshop_id, _search, _startDate, _endDate)
    });
}