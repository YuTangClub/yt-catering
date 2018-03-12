function page(date, date2) {
    $("#moery_count").text();

    // 初始化分页内容
    $.get("/expenditure/GetexpenditureCount/", { "date": date, "date2": date2 }, function (data) {
        //  $("#saa").text(data[0]);
        $("#moery_count").text(data[1]);

        // $("#User_cout").text(data);
        var i = Math.ceil(data[0] / 5);
        // alert(data);
        laypage({
            cont: $('#pageGro'), //容器。值支持id名、原生dom对象，jquery对象,
            pages: i, //总页数
            skin: 'molv', //皮肤
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                pageinxe = e.curr;
                GetList(e.curr, date, date2);
            }
        });
    });
}

function GetList(page, date, date2) {

    var html = '';
    $.getJSON("/expenditure/GetexpenditureList/" + page, { "date": date, "date2": date2 }, function (data) {
        loggin.chklogn(data);
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                html += ' <tr><td> <div class="check-box "><i><input type="checkbox" name="subbox" value="' + data[i].e_expenditureid + '"></i></div> </td><td><span>' + data[i].e_expenditurename + '</span></td> <td><i>¥' + data[i].e_expenditure_money + '</i></td> <td><span>' + new Date(data[i].e_expendituredate).Format("yyyy-MM-dd hh:mm:ss") + '</span></td> <td><span>' + data[i].e_expenditure_operation + '</span></td> <td>' + data[i].e_expenditure_node + '</td></tr>';
            }
        }
        else {
            html = '  <tr class="noshuju" style="display: none;"><td colspan="7" style="background: #ffffe1;text-align: center !important;font-size:17px;color: #f0670b;padding: 50px 0;">[ ' + $("#date").val() + ' 至 ' + $("#date").val() + ' ] 没有记录支出</td></tr>';
        }
        $("#listhtml").html(html);
    });
}

$(document).ready(function () {

    $("#Export").click(function () {
        var loadingIndex = commonOpenLoading();

        $.getJSON("/expenditure/ExportData", { "date": $("#date").val(), "date2": $("#date2").val() }, function (data) {
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

    $("#deletecls").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            layer.confirm("确认要删除选中的信息吗？", { btn: ["确认", "取消删除"] }, function () {
                $.post("/expenditure/deleteexpenditureNo/" + $('input[name="subbox"]:checked').val(), function (data) {
                    if (data > 0) {
                        layer.alert("删除成功");
                        page($("#date").val(), $("#date2").val());
                    }
                    else if (data == -2) {
                        layer.alert("你没有该操作权限");
                        layer.close(index);
                    }
                    else {
                        layer.alert("操作失败，请稍后重试！");
                        layer.close(index);
                    }
                });
            });
        }
        else {
            layer.msg("请选择要删除的信息，不能选择多个");
        }
    });

    var start = {
        elem: '#date',
        format: 'YYYY-MM-DD',
        //   min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16 23:59:59', //最大日期
        istime: false,
        istoday: false,
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };

    var end = {
        elem: '#date2',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        max: laydate.now(),
        istime: false,
        istoday: false,
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    laydate(start);
    laydate(end);

    // 单个checkbox选中取消
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
            }
            else {
                $('input[name="subbox"]').prop("checked", true);
                $('input[name="subbox"]').parent().parent().addClass('checkedBox');
            }
        }

        //.active

        if ($(".checkedBox").length > 0) {
            $(".unlinks li").addClass("active");
        } else {
            $(".unlinks li").removeClass("active");
        }
    });

    $("#chejiusksks").change(function () {
        $.getJSON("/expenditure/GetDate?type=" + $(this).val(), function (data) {
            $("#date").val(data.date);
            $("#date2").val(data.date2);
            $("#tdate").text(data.date);
            $("#tdate2").text(data.date2);
        })
    });

    $("#qurey").click(function () {
        page($("#date").val(), $("#date2").val());
    });

    page($("#date").val(), $("#date2").val());

    $("#Zclru").click(function () {

        Deke.DeKe_dialog.show_Url2("录入支出信息", "/html/expenditure/addexpenditure.html??v=" + clearCache, f, ['410px', '495px']);
    });

    $("#update").click(function () {
        if ($('input[name="subbox"]:checked').length == 1) {
            Deke.DeKe_dialog.show_Url2("修改支出信息", "/html/expenditure/addexpenditure.html?v=" + clearCache + 1, f, ['410px', '495px']);
        }
        else {
            layer.msg("请选择要修改的信息，不能选择多个");
        }
    });

    // 点击日期弹框选择事件
    $('.naconte, .gogobtn').click(function () {
        $('.naconte').toggleClass('active');
        $('.Zcmdakkk').slideToggle(150);
    });
});

function f() {
    if ($('input[name="subbox"]:checked').length == 1) {
        $.getJSON("/expenditure/GetexpenditureNoe/" + $('input[name="subbox"]:checked').val(), function (data) {
            for (var key in data) {
                if (key == "e_expenditureclass") {
                    $("#e_expenditurename").data("id", data[key]);
                }
                else if (key == "e_expendituredate") {
                    $("#" + key).val(new Date(data[key]).Format("yyyy-MM-dd hh:mm:ss"));
                }
                else {
                    $("#" + key).val(data[key]);
                }
            }
        });
    }
    $("#baochun").click(function () {
        if (!isNullOrEmpty($("#e_expenditurename").val())) {
            layer.msg("请输入支出名称");
            return;
        }
        if (!isNullOrEmpty($("#e_expenditure_money").val())) {
            layer.msg("请输入支出金额");
            return;
        }
        if (!isNullOrEmpty($("#e_expendituredate").val())) {
            layer.msg("请输入支出时间");
            return;
        }
        disableButton('baochun');
        $.post("/expenditure/Ppostexpenditure",
            {
                "e_expenditurename": $("#e_expenditurename").val(),
                "e_expenditure_money": $("#e_expenditure_money").val(),
                "e_expendituredate": $("#e_expendituredate").val(),
                "e_expenditureclass": $("#e_expenditurename").data("id"),
                "e_expenditureid": $("#e_expenditureid").val(),
                "e_expenditure_node": $('#e_expenditure_node').val().trim()
            },
            function (data) {
                layer.closeAll();
                if (data > 0) {
                    enabledButton('baochun');
                    layer.msg("操作成功！");
                    page($("#date").val(), $("#date2").val());
                }
                else if (data == -2) {
                    enabledButton('baochun');
                    layer.msg("你没有该操作权限！");
                }
            });
    });

    var start1 = {
        elem: '#e_expendituredate',
        format: 'YYYY/MM/DD hh:mm:ss',
        //  min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16 23:59:59', //最大日期
        istime: true,
        istoday: true
    };

    $("#e_expendituredate").val(new Date().Format("yyyy/MM/dd hh:mm:ss"));
    laydate(start1);

    // 支出录入选择类别弹框
    $('.clickxzcp').click(function () {
        $('.misoblxo').slideToggle(150);
    });
    // $(".Jsuanqi").Calculadora();

    //数量点击数字的时候
    //$(document).on("click", ".calui>li", function () {
    //    $("#jishukuan").val($("#jishukuan").val()+$(this).data("val"));
    //    $("#jishukuan").change();
    //});


    //  $(document).on("change", "#txtResultado", function () { $(this).val("222222"); });

    $(document).on("click", '.abcsssstcl', function () {
        var Signos = ["+", "-", "*", "/"];
        //  alert($("#txtResultado").val());
        //  alert("sss");
        var vTecla = $(this).val();
        var salida = $('#txtResultado');
        //  salida.val('5555');
        //  alert(salida.val());
        //  alert(salida.length);
        if (vTecla == '=') {
            $("#e_expenditure_money").val(eval(salida.val()));
            salida.val(eval(salida.val()));
            $('.Jsuanqi').fadeToggle(150);
        }
        else {
            if ((salida.val() == 0)) {
                if (Signos.indexOf(vTecla) > -1) {
                    salida.val(0)
                }
                else {
                    salida.val(vTecla);
                }
            } else {
                salida.val(salida.val() + vTecla);
            }
        }
    });

    GetCategory('');

    $('#cancel').click(function () {
        layer.closeAll();
    });

    jisuqi('#e_expenditure_money', '.klscolse', '输入支出价格');
}


function GetCategory(typeName) {
    $.getJSON("/expenditure/GetCategory?types=" + typeName, function (data) {
        var html = '<div style="overflow: hidden; padding-bottom: 10px; display: block;" id="divSearch"><div class="inlk secrch_ios" style="clean:both;"><input style="width: 100%; display: inline-block; height: 30px;  border: none; line-height: 20px; font-size: 12px; outline: none; padding-left: 42px;" type="text" id="indexquery_like" placeholder="输入类别名称" value="' + typeName + '"> <button id="btnSearch"><i class="icon-search"></i></button></div></div>';
        for (var i = 0; i < data.length; i++) {
            if (data[i].ecategorylive == 0) {
                html += ' <p class="type cutlong" data-id="' + data[i].ecategoryid + '">' + data[i].ecategoryname + '</p>';
                html += '  <ul class="category" data-id="' + data[i].ecategoryid + '" data-name="' + data[i].ecategoryname + '">';
                for (var b = 0; b < data.length; b++) {
                    if (data[b].superiorecategoryid == data[i].ecategoryid) {
                        html += ' <li  data-id="' + data[b].ecategoryid + '" class="select_zclb cutlong left" style="_white-space: nowrap;"><p title="' + data[b].ecategoryname + '" class="">' + data[b].ecategoryname + '</p></li>';
                    }
                }
                html += '<li class="new_type left">';
                html += '  <p class="addSubtype">';
                html += '  <i class="icon-plus"></i>';
                html += '       </p>';
                html += '        <div style="display: none;">';
                html += '   <input class="left" maxlength="20">';
                html += '                <i class="icon-ok okbtn"></i>';
                html += '   <i class="icon-remove removebtn"></i>';
                html += '         </div>';
                html += '   </li>';
                html += '</ul>';
                html += ' <p class="outgoTypeLine"> </p>';
            }
        }
        $("#misoblxo").html(html);

        // 分类点击添加事件
        $('.new_type').on('click', '.addSubtype', function () {
            $(this).fadeOut(0).siblings('div').fadeIn(250);
        });
        $('#btnSearch').click(function () {
            var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");
            GetCategory(memberSeachValue);
        });

        $("#indexquery_like").keypress(function (event) {
            if (event.keyCode == 13) {
                var memberSeachValue = $("#indexquery_like").val().replace(/\ +/g, "");
                GetCategory(memberSeachValue);
            }
        });
        // 分类添加分类名称事件
        $('.okbtn').click(function () {
            var inputval = $(this).siblings('input').val();
            if (inputval.length < 1) {
                layer.msg("请输入完整分类名称");
                return;
            }
            var isname = $(this);
            $.post("/expenditure/PpostCategory", { "ecategoryname": inputval, "ecategorylive": 1, "superiorecategoryid": $(this).parent().parent().parent().data("id") }, function (data) {
                if (data > 0) {
                    var html = '<li class="select_zclb cutlong left" style="_white-space: nowrap;" data-id="' + data + '"><a href="#">' + inputval + '</a> </li>';
                    isname.parents('.category').find("li:last-child").before(html);
                    isname.siblings('input').val('');//清空input的值
                    isname.parent().fadeOut(0).siblings('p').fadeIn(0);
                    layer.msg("添加成功！");
                }
                else if (data == -2) {
                    layer.msg("你没有该操作权限！");
                    layer.close(index);
                }
                else {
                    layer.msg("操作失败，请稍后重试！");
                    layer.close(index);
                }
            });
        });

        // 分类添加 的关闭事件
        $('.removebtn').click(function () {
            $(this).parent().fadeOut(0).siblings('p').fadeIn(0);
        });

        $('.select_zclb').click(function () {
            $("#e_expenditurename").data("id", $(this).data("id")).val($(this).parent().data("name") + "-" + $(this).text());
            $('.misoblxo').slideToggle(150);
        });
    });

}