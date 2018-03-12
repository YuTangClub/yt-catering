var data = null;

$(document).ready(function () {
    // 会员选择
    $('.stecs i').click(function () {
        $(this).parent().toggleClass('on').siblings().removeClass('on');
        if ($(this).parent().is(".on")) {

            GetProductList(1, 0, $("#yinchang").val(), $(this).parent().data("id"));
        } else {
            GetProductList(1, 0, $("#yinchang").val(), 0);
        }
    });
    var html = '';

    GetProductList(1, 0);

    $("#yinchang").append('<option value="-1">不限</option>');
    // 初始化天数
    for (var i = 1; i < 31; i++) {
        $("#yinchang").append('<option value="' + i + '">' + i + '天</option>');
    }

    $("#yinchang").change(function () {
        if ($(".abckkkkk").parent().is(".on")) {
            GetProductList(1, 0, $("#yinchang").val(),$(this).parent().data("id"));

        } else {
            GetProductList(0, 0, $("#yinchang").val(), 0);
        }
    });


    // 获取商品列表

    // 绑定一级分类、类别快捷筛选
    $.ajax({
        url: '/ProductCategory/GetFirstCategory?type=0',
        method: 'get',
        contentType: 'text/html',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                for (var i in data) {
                    $("#quickFilterC").append('<option value="' + data[i].productcategory_id + '">' + data[i].sv_pc_name + '</option>');
                    $("#categoryFilter").append('<li class="select" data-id="' + data[i].productcategory_id + '" data-name="category"><a href="javascript:void(0);">' + data[i].sv_pc_name + '</a></li>');
                }
            }
        }
    });

    $("#quickFilterC").change(function () {
        if ($(".abckkkkk").parent().is(".on")) {
            GetProductList(1, 0, $("#yinchang").val(), 1);

        } else {
            GetProductList(0, 0, $("#yinchang").val(), 0);
        }
    });

    // 按键放松事件：按商品名称、编码查询
    $("#txtNameSearch").on("keyup", function () {
        GetProductList(null, "");
    });


    $("#Export").click(function () {
        var loadingIndex = commonOpenLoading();
        var isZero = 0;
        if ($(".abckkkkk").parent().is(".on"))
            isZero = 1;
        $.getJSON("/repertory/ExportData", { "isZero": isZero, "hideTime": $("#yinchang").val(), "key": $("#txtNameSearch").val(), "categoryFlag": $('#quickFilterC option:selected').val() }, function (data) {
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

    // 按钮事件：按商品名称、编码查询
    $("#btnNameSearch").on("click", function () {
        GetProductList(null, "");
    });

    // 查询
    $("#searchProduct").on("click", function () {
        GetProductList(null, "NotByName");
    });

    $("#tbody").on("click", ".pandian", function () {
        data = $(this).parent().siblings();
        if ($(this).data("name") == 0) {
            baochu(0);
        } else {
            Deke.DeKe_dialog.show_Url("为产品 " + data.eq(2).text() + " 盘点", "/html/procurement/check.html?v=" + clearCache, ["确认", "取消"], baochu, f, ['500px', '350px']);
        }
    });

    $("#tbody").on("click", ".pandianlog", function () {
        data = $(this).parent().siblings();
        Deke.DeKe_dialog.show_Url2("查看 " + data.eq(1).text() + " 盘点记录", "/html/procurement/check_log.html?v=" + clearCache, f3, ['500px', '350px']);
    });
});

function f() {
    $("#product_name").val(data.eq(1).text());
    $("#sv_cheprod_existing").val(data.eq(4).text());
    $("#product_id").val(data.eq(0).parent().data("id"));
}

function f3() {
    $.getJSON("/supplier/getCheke?logid=" + data.eq(0).parent().data("id"), function (data) {
        for (var i = 0; i < data.length; i++) {
            var sv_cheprod_existing = data[i].sv_pricing_method == 1 ? data[i].sv_weight_cheprod_existing : data[i].sv_cheprod_existing;
            var sv_cheprod_cbem = data[i].sv_pricing_method == 1 ? data[i].sv_weight_cheprod_cbem : data[i].sv_cheprod_cbem;
            $("#loglist").append('<tr><td><span>' + (i + 1) + '</span></td> <td><span class="bggreen">' + sv_cheprod_existing + '</span></td> <td><span class="bgred">' + sv_cheprod_cbem + '</span></td><td><span>' + data[i].sv_cheprod_operator + '</span></td> <td><span>' + new Date(data[i].sv_cheprod_datetime).Format("yyyy-MM-dd hh:mm:ss") + '</span></td></tr>');
        }
    });
}

// 保存
function baochu(dv) {
    if (dv == 0) {
        layer.confirm("您已经确认仓库数据一致了吗？", function () {
            $.post("/supplier/UpdateCheke", {
                "product_id": data.eq(0).parent().data("id"),
                "sv_cheprod_existing": data.eq(4).text(),
                "sv_cheprod_cbem": data.eq(4).text(),
                "sv_cheprod_operator": "管理员",
                "sv_cheprod__noe": "确认数量",
                "pricing_method": data.eq(0).parent().data("pricingmethod")
            }, function (data) {
                loggin.chklogn(data);
                if (data == true) {
                    layer.msg("操作成功");
                    GetProductList(1, 0, -1, 0);
                    layer.close(index);
                }
                else if (data == -2) {
                    layer.msg("你没有该操作权限");
                    layer.close(index);
                }
                else {
                    layer.msg("操作失败");
                    layer.close(index);
                }
            });
        });
    }
    else {
        if ($("#sv_cheprod_cbem").val() == "") {
            $("#sv_cheprod_cbem").focus();
            layer.msg("请输入库存数量！~");
            return;
        }
        $.post("/supplier/UpdateCheke", {
            "product_id": data.eq(0).parent().data("id"),
            "sv_cheprod_existing": data.eq(4).text(),
            "sv_cheprod_cbem": $("#sv_cheprod_cbem").val(),
            "sv_cheprod_operator": $("#sv_cheprod_operator").val(),
            "sv_cheprod__noe": $("#sv_cheprod__noe").val(),
            "pricing_method": data.eq(0).parent().data("pricingmethod")
        }, function (data) {
            loggin.chklogn(data);
            if (data == true) {
                layer.msg("操作成功");
                GetProductList(1, 0, -1, 0);
                layer.close(index);
            }
            else if (data == -2) {
                layer.msg("你没有该操作权限");
            }
            else {
                layer.msg("操作失败");
            }
        });
    }
}

function GetProductList(pageIndex, type, tianshu, storageFlag) {
    // 去出产品列表第一行复选框的选中状态及样式
    $("#checkAll input").prop("checked", false);
    $("#checkAll").removeClass("checkedBox");
    // 设置参数
    var statusFlag = "0";
    var categoryFlag = $("#quickFilterC").val();

    var adddateFlag = "";
    var nameFlag = $("#txtNameSearch").val();
    if ($("#yinchang").val() > 0) {
        tianshu = $("#yinchang").val();
    }
    else
    {
        tianshu = -1;
    }

    // 查询
    $.getJSON('/AjaxProduct/GetProductList?producttype_id=0', {
        status: statusFlag,
        category: categoryFlag,
        storage: storageFlag,
        adddate: adddateFlag,
        name: nameFlag,
        pageIndex: pageIndex || 1,
        pageSize: 15,   // 每页记录数
        tianshu: tianshu,
        source: "storage"
    },
    function (res) { // 从第1页开始请求。返回的json格式可以任意定义
        var data = res.list;
        var html = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                //html += '<tr class="selectChk">';
                //html += '<td><div class="check-box"><i><input type="checkbox" name="subbox" value="' + data[i].product_id + '"></i></div></td>';
                //html += '<td>' + (parseInt(i) + 1) + '</td>';
                //html += '<td><span><img src="' + data[i].sv_p_images + '"  onerror="this.src=\'/images/001.png\';" alt="pic"></span><span>' + data[i].sv_p_name + '</span></td>';
                //html += '<td><span>' + (data[i].sv_pc_name == null ? "" : data[i].sv_pc_name) + '</span></td>';
                //html += '<td><span>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</span></td>';
                //html += '<td><span>' + (data[i].sv_p_specs == null ? "" : data[i].sv_p_specs) + '</span></td>';
                //html += '<td><span>' + (data[i].sv_p_unit == null ? "" : data[i].sv_p_unit) + '</span></td>';
                //html += '<td><span>' + data[i].sv_p_originalprice + '</span></td>';
                //html += '<td><span>' + data[i].sv_p_unitprice + '</span></td>';
                //html += '<td><span>' + data[i].sv_p_minunitprice + '</span></td>';
                //html += '<td><span>' + data[i].sv_p_mindiscount + '</span></td>';
                //html += '<td><span></span></td>';
                //html += '<td><span>' + data[i].sv_p_storage + '</span></td>';
                //html += '<td><span>' + new Date(data[i].sv_p_adddate).Format('yyyy-MM-dd hh:mm:ss') + '</span></td>';
                //html += '</tr>';

                // <td> <div class="check-box "><i><input type="checkbox" name="subbox"></i></div> </td> 

                var sv_p_storage = data[i].sv_pricing_method == 1 ? data[i].sv_p_total_weight : data[i].sv_p_storage;
                html += '<tr data-id="' + data[i].product_id + '" data-pricingmethod="' + data[i].sv_pricing_method + '">';
                html += '<td><span>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</span></td> ';
                html += '<td><span><img src="' + data[i].sv_p_images2 + '" onerror="\'/images/001.png\';" alt="pic"></span><span class="text-ovtb ">' + (data[i].sv_p_name == null ? "" : data[i].sv_p_name) + '</span></td> <td><span>' + (data[i].sv_pc_name == null ? "" : data[i].sv_pc_name) + '</span></td>';


                html += '<td><span>' + (data[i].sv_p_unit == null ? "" : data[i].sv_p_unit) + '</span></td>';
                html += '<td><span class="bggreen">' + sv_p_storage + '</span></td>';
                html += '<td><span>' + new Date(data[i].sv_p_adddate).Format('yyyy-MM-dd hh:mm:ss') + '</span></td>';
                html += '<td><span>' + (data[i].sv_cheprod_datetime == null ? "--" : new Date(data[i].sv_cheprod_datetime).Format('yyyy-MM-dd hh:mm:ss')) + '</span></td>';
                html += '<td><span>' + (data[i].sv_p_specs == null ? "" : data[i].sv_p_specs) + '</span></td>';
                html += '<td><span>管理员</span></td>';
                html += '<td class="Stocktda">';
                html += '<a href="javascript:void(0);" class="pandian" data-name="0">数量确认</a> <a href="javascript:void(0);"  data-name="1" class="pandian" >数量调整</a>   ';
                html += '<a href="javascript:void(0);"  class="pandianlog" >盘点记录</a></td></tr>';
            }
        }
        $("#tbody").html(html);
        // alert(0);
        // 分页
        laypage({
            cont: 'pageGro', // 容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageGro"></div>
            pages: res.total, // 通过后台拿到的总页数
            curr: pageIndex || 1, // 初始化当前页
            skin: 'molv', // 皮肤颜色
            first: '首页', // 若不显示，设置false即可
            last: '尾页', // 若不显示，设置false即可
            prev: '上一页', // 若不显示，设置false即可
            next: '下一页', // 若不显示，设置false即可
            jump: function (e, first) {
                if (!first) {
                    if ($(".abckkkkk").parent().is(".on")) {
                        GetProductList(e.curr, type, $("#yinchang").val(), 1);

                    } else {
                        GetProductList(e.curr, type, $("#yinchang").val(), 0);
                    }

                }
            }
        });
    });
}