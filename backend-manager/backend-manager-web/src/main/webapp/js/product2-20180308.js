$(document).ready(function () {
    GetStorelist();

    $("#Export").click(function () {
        var loadingIndex = commonOpenLoading();
        debugger;
        var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");

        $.getJSON("/intelligent/GetProductAnalysis", { "type": $(".bzhxdaohang li.active").data("id"), "date": $("#date").val(), "date2": $("#date2").val(), "storeid": $("#StoreSearch").val(), "queryLike": memberSeachValue, "isexport": 1 }, function (data) {
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
                                myPrintData: data
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

    $("#woyaochaxue").click(function () {
        getuser(4, $("#date").val(), $("#date2").val(), $("#StoreSearch").val() || "",$("#indexquery_like").val().replace(/\ +/g, ""));
    });
    $(".icon-search").click(function () {
        var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");
        if (memberSeachValue) {
            getuser($(".bzhxdaohang li.active").data("id"), "", "", $("#StoreSearch").val(), memberSeachValue);
        }
        else {
            layer.msg("请输入要查询的内容！");
        }
    });

    $("#indexquery_like").keypress(function (event) {
        if (event.keyCode == 13) {
            var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");
            if (memberSeachValue) {
                getuser($(".bzhxdaohang li.active").data("id"), "", "", $("#StoreSearch").val(), memberSeachValue);
            }
            else {
                layer.msg("请输入要查询的内容！");
            }
        }
    });

    //选择今日 昨天本月 上月的点击事件
    //选择今日 昨天本月 上月的点击事件
    $('.bzhxdaohang li ,.znfxhyxqbox .bzhxdaohang li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $('.znfxhyxqbox .bzhxdaohang li').index(this);
        $('.winlvom>div').eq(index).fadeIn().siblings().fadeOut(0);

        if ($(this).data("id") != 4) {
            getuser($(this).data("id"), "", "", $("#StoreSearch").val() || "",$("#indexquery_like").val().replace(/\ +/g, ""));
            //  alert($(this).data("val"));
            //   getpage($("#payselect").val(), $("#type").val(), $(this).data("val"), $("#keyk").val(), $("#liushui").val());
            //  Getpage($(this).data("val"));
        }
        //点击其他显示时间选择
        if ($('.qitbbb').hasClass('active')) {
            $('.sjxuantime').fadeIn(250);
        } else {
            $('.sjxuantime').hide(150);
        }
    });
    $("#StoreSearch").change(function () {
        getuser($(".bzhxdaohang li.active").data("val"), "", "", $("#StoreSearch").val() || "",$("#indexquery_like").val().replace(/\ +/g, ""));
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

    // 	/会员选择
    $('.stecs i').click(function () {


        $(this).parent().toggleClass('on').siblings().removeClass('on');

        tubai($(".bzhxdaohang li.active").data("id") || 1, $("#StoreSearch").val() || "");
    });
    getuser(1,"","","","");
    //列表统计图切换事件
    $('.lsui').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $('.lsui').index(this);
        $('.huytjresle>div').eq(index).fadeIn().siblings().fadeOut(0);
        tubai($(".bzhxdaohang li.active").data("id") || 1, $("#StoreSearch").val()||"");
    });
});
function getuser(type, date, date2, StoreSearch,queryLike) {
    if (type != 4)
    {
        date = $("#date").val();
        date2 = $("#date2").val();
    }
    page(type, date, date2, StoreSearch, queryLike);
}
function page(type, date, date2, StoreSearch,queryLike) {
    GetList(type, 1, date, date2, StoreSearch, queryLike);
}


function GetList(type, page, date, date2, StoreSearch, queryLike) {
    //列表显示
    if ($('.lsui').eq(0).hasClass("active")) {
        var html = "";
        $("#Listapp").html(html);
        var loadIndex = commonOpenLoading();
        $.getJSON("/intelligent/GetProductAnalysis/0",
            { "type": type, "page": page, "date": date, "date2": date2, "storeid": StoreSearch, "queryLike": queryLike },
            function(result) {
                commonCloseLoading(loadIndex);
                if (result) {
                    //统计数据
                    html = "";
                    if (result.salesTop3 && result.salesTop3.length > 0) {
                        for (var j = 0; j < result.salesTop3.length; j++) {
                            $("#chanssping_top" + (j + 1)).text(result.salesTop3[j]);
                        }
                    }

                    $("#order_receivable").text(parseFloat(result.order_receivable).toFixed(2));
                    $("#sv_p_originalprice").text(parseFloat(result.sv_p_originalprice || 0).toFixed(2));
                    $("#maolili").text(parseFloat((result.maolili || 0)*100).toFixed(2));
                    $("#orderciunt").text(result.orderciunt || 0);

                    //明细数据
                    var data = result.proList;
                    if (data != null && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            html += '<tr>';
                            html += '<td><span>' + data[i].sv_mr_cardno + '</span></td>';
                            html += '<td><span>' + data[i].sv_mr_name + '</span></td>';
                            html += '<td><span>' + data[i].count + '</span></td>';
                            html += '<td><i>¥' + (data[i].order_receivable || 0).toFixed(2) + '</i></td>';
                            html += '<td><i>' + parseFloat(data[i].maolili3 || 0).toFixed(2) + '</i></td>';
                            html += '<td><i>' + parseFloat( data[i].maolili || 0).toFixed(2) + '%</i></td>';
                            html += ' </tr>';
                        }
                    }
                    //绑定页码
                    laypage({
                        cont: $('#pageGro2'), //容器。值支持id名、原生dom对象，jquery对象,
                        pages: result.totalPage, //总页数
                        skin: 'molv', //皮肤
                        first: '首页', //若不显示，设置false即可
                        last: '尾页', //若不显示，设置false即可
                        prev: '上一页', //若不显示，设置false即可
                        next: '下一页', //若不显示，设置false即可
                        curr: page || 1, //当前页,
                        jump: function(e, first) {
                            if (result.totalPage > 0 && result.totalPage < page) {
                                GetList(type, 1, date, date2, StoreSearch,queryLike);
                            }
                            if (!first) {
                                //点击跳页触发函数自身，并传递当前页：obj.curr
                                GetListWithOutTop(type, e.curr, date, date2, StoreSearch, queryLike);
                            }
                        }
                    });

                    $("#Listapp").html(html);

                }
            });
    } else {
        tubai(type, $("#StoreSearch").val() || "");
    }
}

function GetListWithOutTop(type, page, date, date2, StoreSearch, queryLike) {
    var html = "";
    var loadIndex = commonOpenLoading();
    $.getJSON("/intelligent/GetProductAnalysis/0", { "type": type, "page": page, "date": date, "date2": date2, "storeid": StoreSearch,"queryLike":queryLike }, function (result) {
        commonCloseLoading(loadIndex);
        html = "";
        var data = result.proList;
   
        if (data != null && data.length > 0) {
            for (var i = 0; i < data.length; i++)
            {
                html += '<tr>';
                html += '<td><span>' + data[i].sv_mr_cardno + '</span></td>';
                html += '<td><span>' + data[i].sv_mr_name + '</span></td>';
                html += '<td><span>' + data[i].count + '</span></td>';
                html += '<td><i>¥' + data[i].order_receivable + '</i></td>';
                html += '<td><i>' + parseFloat(data[i].maolili3 || 0).toFixed(2) + '</i></td>';
                html += '<td><i>' + parseFloat(data[i].maolili || 0).toFixed(2) + '%</i></td>';
                html += ' </tr>';
            }
        }

        $("#Listapp").html(html);
    });
}
//柱状统计图
//柱状统计图
function tubai(type, StoreSearch) {
    var orderBy = 0;
    if ($(".stecs").eq(0).hasClass("on")) {
        orderBy = 0;
    }else
    {
        orderBy = 1;
    }
    var loadIndex = commonOpenLoading();
    $.getJSON("/intelligent/getprCoutlist/" + orderBy, { "type": type, "page": -1, "storeid": StoreSearch }, function(data) {
        commonCloseLoading(loadIndex);
        var colors = Highcharts.getOptions().colors;
        var rrayObj = new Array();
        var str = [];
        for (var i = 0; i < data.length; i++) {
            rrayObj[i] = data[i].sv_mr_name;
            var param = {};
            param.y = data[i].count;
            param.color = colors[0];
            str.push(param);
        }

        var categories = rrayObj,
name = ' ',

data = str;

        function setChart(name, categories, data, color) {
            chart.xAxis[0].setCategories(categories, false);
            chart.series[0].remove(false);
            chart.addSeries({
                name: name,
                data: data,
                color: color || 'white'
            }, false);
            chart.redraw();
        }

        var chart = $('#zhuxingtjt').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ' '
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                x: 0,
                y: 0,
                padding: 6,
                itemMarginTop: 0
            },

            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: ' '
                }
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    point: {
                        events: {

                        }
                    },
                    dataLabels: {
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    var point = this.point,
                        s = this.x + '<br/>';
                    if (point.drilldown) {

                    } else {
                        s += '产品销售数量' + this.y + '件';
                    }
                    return s;
                }
            },
            series: [{
                name: '(数量：件)',
                data: data,
                color: 'white'
            }],
            exporting: {
                enabled: false
            }
        })
        .highcharts(); // return chart
    });
}
//这是环形的报表
$(function () {
    $('#huanxingbao').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: ' '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            innerSize: '50%',
            type: 'pie',
            name: '收入项占比 ',
            data: [
                ['苹果6S', 45.0],
                ['三星S7', 26.8],
                ['LG G4', 8.5],
                ['小米5', 6.2],
                ['魅族PRO6', 22.7]
            ]
        }]
    });
});
//折线统计图
$(function () {
    $('#zhexiantu').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: ' '
        },
        subtitle: {
            floating: true,
            y: 15
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
        },
        yAxis: {
            title: {
                text: '销售走势 '
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
            }
        },
        plotOptions: {
            area: {
                fillOpacity: 0.6,
                fillColor: '#e3f5f0',
                color: '#00ac82',
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '小李飞刀',
            data: [0, 1, 9, 4, 5, 2, 3, 7]
        }]
    });
});
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
                $("#StoreSearch").html(listhtml);
            }
        }
    });
}