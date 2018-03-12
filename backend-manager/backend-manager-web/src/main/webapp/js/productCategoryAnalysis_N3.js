//(querytype, date_start, date_end, user_id)
$(document).ready(function () {
    productCategoryAnalysis.getShopNameFn();//获取分店的信息   
    productCategoryAnalysis.GetProductCategoryAnalysis(1, "", "", user_id,"");//初始化页面
    productCategoryAnalysis.clickOrchangeOperatingFn();//操作
    productCategoryAnalysis.exportSalesReport();//导出
});

var productEchartDef = new $.Deferred();
var _g_categoryId = "";

var productCategoryAnalysis = {
    //获取分店的信息
    getShopNameFn: function () {
        var type = 0;
        $.get('/BranchStore/GetStorelist/?type=' + type, function (data) {
            if (data == -2) {
                layer.msg("您没有该权限！");
            }
            else {
                if (data == -1) {
                    $("#getshopname").hide();
                } else {
                    $("#getshopname").show();
                    var shopNameHtml = '';
                    for (var theadKey in data) {
                        shopNameHtml += data[theadKey];
                    }
                    $("#getshopname").html(shopNameHtml);
                }
            }
        });
    },

    //获取统计的方法(int type, int isexport, string user_id, string date_start, string date_end)
    GetProductCategoryAnalysis: function (querytype, date_start, date_end, user_id, categoryids) {
        $.getJSON("/intelligent/GetProductCategoryAnalysis", {
            "type": querytype,  //查询日期的类型
            "date_start": date_start,  //查询开始的日期
            "date_end": date_end,   //查询结束的日期
            "user_id": user_id, //店铺的id
            "categoryids": categoryids
        }, function (result) {
            //加载列表
            var data = result;
            var money = 0;
            var productCategoryName = new Array();
            var productCategorySalesMoney = new Array();
            if (data != null && data.length > 0) {
                var productsaleslisthtml = '';
                for (var i = 0; i < data.length; i++) {
                    productsaleslisthtml += '<tr>';
                    productsaleslisthtml += '<td>' + data[i].sv_pc_name + '</td>';
                    productsaleslisthtml += '<td>' + data[i].category_num + '</td>';
                    productsaleslisthtml += '<td class="colorff">¥' + parseFloat(data[i].category_total || 0).toFixed(2) + '</td>';
                    productsaleslisthtml += '<td><i>' + parseFloat(data[i].percent || 0).toFixed(2) + '%</i></td>';
                    productsaleslisthtml += '</tr>';
                    money += data[i].category_total;
                    if (data[i].category_total) {
                        var model = {
                            value: data[i].category_total,
                            name: data[i].sv_pc_name
                        }
                        productCategoryName.push(data[i].sv_pc_name);
                        productCategorySalesMoney.push(model);
                    }
                }
                $("#productsaleslist").html(productsaleslisthtml);
                var allData = {
                    productCategoryName: productCategoryName,
                    productCategorySalesMoney: productCategorySalesMoney,
                    money: money
                }
                productEchart(allData);
            } else {
                var allData = {
                    productCategoryName: productCategoryName,
                    productCategorySalesMoney: productCategorySalesMoney,
                    money: money
                }
                productEchart(allData);
                var thlength = $("#rowlength").children("th").length;
                $("#productsaleslist").html('<tr><td class="text-center sad" style="" colspan="' + thlength + '"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>');
            }
        });

        //图表分析
        function productEchart(data) {
            var shopWeekPerformance = echarts.init(document.getElementById('productCategorySalesMoneyEachat'));//最近七天的销售数据统计图的实例对象
            var option = {
                backgroundColor: '#fff',
                title: {
                    text: data.money.toFixed(2),
                    subtext: '总消费',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#666'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                grid: {
                    left: '0%',
                    containLabel: true
                },
               
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    itemWidth: 14,
                    itemHeight: 14,
                    align: 'left',
                    data: data.productCategoryName,
                    textStyle: {
                        color: '#666'
                    }
                },
                series: [
                    {
                        name: '销售金额',
                        type: 'pie',
                        radius: ['25%', '45%'],
                        color: ['#ff8a75', '#cca0fb', '#b0e378', '#80c8fe', '#fac364', "#f40f40", '#31c17b', '#ffc8c8', '#ee35ab' ,'#3077b7', '#9a8169', '#22C3AA', '#5de3e1', '#ee35df'],
                        label: {
                            normal: {
                                //position: 'inner',
                                formatter: '¥{c}\n{d}%\n{b}',
                                textStyle: {
                                    color: '#444',
                                    fontWeight: '400',
                                    fontSize: 12
                                }
                            }
                        },
                        data: data.productCategorySalesMoney
                    }
                ]
            };
            shopWeekPerformance.setOption(option);
        };

    },

    //获取列表(querytype, date_start, date_end, user_id)
    getShareProductSalesListFn: function () {
        var queryDate = $("#queryday>li.active").data("queryday"),
            begindate = $("#begindateval").val() || "",
            enddate = $("#enddateval").val() || "",
            categoryids = _g_categoryId,
            StoreSearch = $("#getshopname").val() || ""
        productCategoryAnalysis.GetProductCategoryAnalysis(queryDate, begindate, enddate, StoreSearch,categoryids);//加载列表
    },

    //日期、店铺、加载数量操作的方法
    clickOrchangeOperatingFn: function () {
        //日期
        $(document).unbind("click", "#queryday>li").on("click", "#queryday>li", function () {
            var index = $(this).data("queryday");//日期的类型
            var shopId = $("#getshopname").val();//店铺的id
            $(this).addClass("active").siblings("li").removeClass("active");
            if (index != 4) {
                $(".querydate").css("display", "none");
                productCategoryAnalysis.getShareProductSalesListFn();
            } else {
                $(".querydate").css("display", "block");
            }
            //其他日期查询
            $("#otherday").unbind("click").click(function () {
                productCategoryAnalysis.getShareProductSalesListFn();
            });
        });

        //时间的插件初始化
        $('#begindate').datetimepicker({//开始时间
            language: 'zh',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            endDate: new Date(),//结束时间
            pickerPosition: 'bottom-left',
            format: 'yyyy-mm-dd'
        }).on('change', function (ev) {
            var startDate = $('#begindateval').val();
            $("#enddate").datetimepicker('setStartDate', startDate);
            $("#begindate").datetimepicker('hide');
        });
        $('#enddate').datetimepicker({//结束时间
            language: 'zh',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            startDate: $("#begindateval").val(),
            endDate: new Date(),
            pickerPosition: 'bottom-left',
            format: 'yyyy-mm-dd'
        }).on('change', function (ev) {
            var endDate = $("#enddateval").val();
            $("#begindate").datetimepicker('setReturnDate', endDate);
            $("#enddate").datetimepicker('hide');
        });

        //店铺
        $(document).on("change", "#getshopname", function () {
            productCategoryAnalysis.getShareProductSalesListFn();
        });

        //按分类筛选
        $("#productScreeningBtn").click(function () {
            layerpage.Deke_layerpage.show_Url2("1", "分类筛选", "/ajaxHtml_N3/sales/productScreening.html", ["790px", "520px"], getProductCategory);
        });

        //加载分类
        function getProductCategory() {
            $.get("/ProductCategory/GetFirstCategory", function (data) {
                if (data && data.length > 0) {
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html += '<li data-id="' + data[i].productcategory_id + '">' + data[i].sv_pc_name + '</li>';
                    }
                    $("#productCategoryList").html(html);
                }
            });
        }

        //选择分类
        $(document).unbind("click", "#productCategoryList li").on("click", "#productCategoryList li", function () {
            $(this).toggleClass("active");
        });

        //确定选择分类在查询
        $(document).unbind("click", "#determineSlectProductCategory").on("click", "#determineSlectProductCategory", function () {
            var ids = "";
            var listObj = $("#productCategoryList li.active");
            if (listObj.length > 0) {
                for (var i = 0; i < listObj.length; i++) {
                    ids += $(listObj[i]).attr("data-id") + ","
                }
                _g_categoryId = ids.substr(0, ids.length - 1);
                productCategoryAnalysis.getShareProductSalesListFn();
                layer.closeAll();
            }
            else {
                layer.msg("请选择分类");
            }
        });

    },




    //导出
    exportSalesReport: function () {
        $("#exportsalesreport").click(function () {
            disableButtonById("exportsalesreport");
            $.getJSON("/intelligent/GetProductCategoryAnalysis", {
                "type": $("#queryday>li.active").data("queryday"),
                "date_start": $("#begindateval").val() || "",
                "date_end": $("#enddateval").val() || "",
                "user_id": $("#getshopname").val() || "",
                "categoryids": _g_categoryId,
                "isexport":1
            }, function (data) {
                if (data == -2) {
                    enabledButtonById("exportsalesreport");
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
                                    enabledButtonById("exportsalesreport");
                                },
                                {
                                    myPrintData: data
                                }
                            );
                        } catch (e) {
                            alert("数据导出失败: " + e.message);
                            enabledButtonById("exportsalesreport");
                        }
                    } else {
                        location.href = data;
                        enabledButtonById("exportsalesreport");
                    }
                } else {
                    enabledButtonById("exportsalesreport");
                    layer.msg("数据导出失败!");
                }
            });
        });
    }
}