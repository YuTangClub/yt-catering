$(document).ready(function () {
    GetStorelist();
    $("#woyaochaxue").click(function () {
        var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");
        getuser(4, $("#date").val(), $("#date2").val(), $("#StoreSearch").val(), memberSeachValue);
    });

    $("#Export").click(function () {
        var loadingIndex = commonOpenLoading();
        debugger;
        var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");

        $.getJSON("/intelligent/getUserCoutlist", { "type": $(".bzhxdaohang li.active").data("id"), "date": $("#date").val(), "date2": $("#date2").val(), "storeid": $("#StoreSearch").val(), "key": memberSeachValue, "isexport": 1 }, function (data) {
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
        var strid = !isNullOrWhiteSpace($("#StoreSearch").val()) ? "" : $("#StoreSearch").val()
        if ($(this).data("id") != 4) {
            getuser($(this).data("id"), "", "", strid, $("#indexquery_like").val().replace(/\ +/g, ""));
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
        getuser($(".bzhxdaohang li.active").data("id"), "", "", $("#StoreSearch").val(), $("#indexquery_like").val().replace(/\ +/g, ""));
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


    //列表统计图切换事件
    $('.lsui').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $('.lsui').index(this);
        $('.huytjresle>div').eq(index).fadeIn().siblings().fadeOut(0);
        tubai(0, $("#StoreSearch").val());
    });

    getuser(1, "", "", "");
    // 	图形
    $('.stecs i').click(function () {

        $(this).parent().toggleClass('on').siblings().removeClass('on');

        if ($(this).data("name") == "xiao") {

            tubai(0, $("#StoreSearch").val());
        } else {
            tubai(0, $("#StoreSearch").val());
        }
    });
});

function getuser(type, date, date2, StoreSearch, queryLike) {
    if (type == 4) {
        date = $("#date").val();
        date2 = $("#date2").val();
    }
    $.getJSON("/intelligent/getUserCout/0?type=" + type + "&date=" + date + "&date2=" + date2 + "&storeid=" + StoreSearch + "&queryLike=" + queryLike, function (data) {

        for (var key in data) {
            if (key == "order_receivable" || key == "sv_p_originalprice") {
                $("#" + key).text(data[key]);

            } else {
                $("#" + key).text(data[key]);
            }
        }

    });

    $.getJSON("/intelligent/getUserCout/1?type=" + type + "&date=" + date + "&date2=" + date2 + "&storeid=" + StoreSearch + "&queryLike=" + queryLike, function (data) {

        for (var key in data) {
            if (key == "order_receivable" || key == "sv_p_originalprice") {
                $("#_" + key).text(data[key]);

            } else {
                $("#_" + key).text(data[key]);
            }
        }

    });
    page(type, date, date2, StoreSearch, queryLike);
}

function page(type, date, date2, StoreSearch, queryLike) {
    //初始化分页内容
    $.get("/intelligent/getUserCoutlistcount/", { "id": $("#member_id").val(), "type": type, "date": date, "date2": date2, "storeid": StoreSearch, "queryLike": queryLike }, function (data) {
        //   alert(data);
        // $("#User_cout").text(data);
        var i = Math.ceil(data / 5);
        laypage({
            cont: $('#pageGro2'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                GetList(type, e.curr, date, date2, StoreSearch, queryLike);
            }
        });
    });

}
function GetList(type, page, date, date2, StoreSearch, queryLike) {
    var loadingIndex = commonOpenLoading();
    var html = "";
    $.getJSON("/intelligent/getUserCoutlist/0", { "type": type, "page": page, "date": date, "date2": date2, "storeid": StoreSearch, "queryLike": queryLike }, function (data) {
        commonCloseLoading(loadingIndex);
        html = "";
        for (var i = 0; i < data.length; i++) {

            html += '<tr>';
            html += '               <td><span>' + data[i].sv_mr_cardno + '</span></td>';
            html += '               <td><span>' + data[i].sv_mr_name + '</span></td>';
            html += '                 <td><span>' + data[i].count + '</span></td>';
            html += '                <td><i>¥' + data[i].order_receivable + '</i></td>';
            //html += '               <td><i>¥' + data[i].sv_p_originalprice + '</i></td>';
            html += '<td><span>' + data[i].consumeusername + '</span></td>';
            html += '<td><span>' + data[i].memberuserName + '</span></td> ';
            //html += '               <td><a href="javascript:void(0);" data-toggle="modal" data-target="#znfxhyxqbox">详情</a></td>';
            //if (data[i].sv_isdelete == false)
            //{
            //    html += '               <td><span>正常</span></td>';
            //} else{
            //    html += '               <td><span>删除</span></td>';
            //}
            html += '          </tr>';

        }

        $("#Listapp").html(html);
    });

}
// 柱状统计图
function tubai(type, StoreSearch) {
    $.getJSON("/intelligent/getUserCoutlist/" + type, { "type": ($(".bzhxdaohang li.active").data("id")|| 1), "page": -1, "storeid": StoreSearch }, function(data) {
        var colors = Highcharts.getOptions().colors;
        var rrayObj = new Array();
        var str = [];
        for (var i = 0; i < data.length; i++) {
            rrayObj[i] = data[i].sv_mr_name;
            var param = {};
            param.y = data[i].order_receivable;
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
                        s += '会员销售额' + this.y + '元';
                    }
                    return s;
                }
            },
            series: [{
                name: '(金额：元)',
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

// 折线统计图
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
                text: '金额( 元 ) '
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