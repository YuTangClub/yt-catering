$(document).ready(function () {
    tableAnalysis.getTableAnalysis(1);//列表
    tableAnalysis.salesGetOperatorFn();//操作方法
    tableAnalysis.listExport();//导出
});

var tableAnalysis =  {
    getTableAnalysis: function (dateType, startDate, endDate) {
        $.get("/intelligent/GetTableAnalysis", {
            type: dateType,
            isexport: 0,
            user_id: user_id,
            date_start: $("#begindateval").val(),
            date_end: $("#enddateval").val()
        }, function (result) {
            if (result && result.length > 0) {
                var html = '';
                console.log(result);
                $.each(result, function (i,data) {
                    html += '<tr>';
                    html += '<td>' + data.sv_region_name + '</td>';
                    html += '<td>' + data.sv_table_name + '</td>';
                    html += '<td>' + data.order_num + '</td>';
                    html += '<td>' + data.sv_person_num + '</td>';
                    html += '<td class="colorff">¥' + parseFloat(data.order_receivable).toFixed(2) + '</td>';
                    html += '<td>' + parseFloat(data.person_avg).toFixed(2) + '</td>';
                    html += '<td>' + data.table_avg + '</td>';
                    html += '</tr>';
                });
                $("#DiningTablelisthtml").html(html);
            }
            else {
                $("#DiningTablelisthtml").html('<tr><td class="text-center sad" style="" colspan="7"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>');
            }
        });
    },

    //
    salesGetOperatorFn: function () {
        //选择时间查询===1今日，-1昨日，2本周，3其他，30本月，90近三个月
        $(document).unbind("click", "#queryday>li").on("click", "#queryday>li", function () {
            var index = $(this).data("queryday");
            $(this).addClass("active").siblings("li").removeClass("active");
            if (index != 4) {
                $(".querydate").css("display", "none");
                tableAnalysis.getTableAnalysis(index);//列表
            } else {
                $(".querydate").css("display", "block");
            }
            //其他日期查询
            $("#otherday").unbind("click").click(function () {
                tableAnalysis.getTableAnalysis(index);//列表
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
    },



    //导出
    listExport: function () {
        $("#exportsalesreport").click(function () {
            disableButtonById("exportsalesreport");
            $.getJSON("/intelligent/GetTableAnalysis", {
                type: $("#queryday>li.active").data("queryday"),
                isexport: 1,
                user_id: user_id,
                date_start: $("#begindateval").val(),
                date_end: $("#enddateval").val()
            }, function (result) {
                enabledButtonById("exportsalesreport");
                if (result == -2) {
                    layer.msg("你没有该操作权限！");
                }
                else if (result != 0) {
                    if (((typeof Cef) !== 'undefined')) {
                        Cef.Download(result);
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
                                    myPrintImg: result
                                }
                            );
                        } catch (e) {
                            alert("数据导出失败: " + e.message);
                        }
                    } else {
                        location.href = result;
                    }
                }
                else {
                    layer.msg("数据导出失败!");
                }
            });
        });
    }

}