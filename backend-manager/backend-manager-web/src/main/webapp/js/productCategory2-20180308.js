//删除
function c2() { }

function f2() { }

//修改
function c1() {
    if ($("#sv_pc_name").val() == "" || $("#sv_pc_name").val() == null) {
        layer.msg("请输入类别名称");
    }
    else if ($("#parentCategory").val() == "0" && $("#producttype_id").val() == "-1") {
        layer.msg("选择一级类别时，类型为必选项");
    }
    else {
        $.ajax({
            url: "/AjaxProduct/SaveCategory",
            data: JSON.stringify({ productcategory_id: $("#parentCategory").val(), sv_pc_name: $("#sv_pc_name").val(), producttype_id: $("#producttype_id").val(), productsubcategory_id: $('input[name="subbox"]:checked').data("scid") || $('input[name="subbox"]:checked').data("cid") }),
            type: "POST",
            contentType: "application/json",
            success: function (result) {
                if (result == true) {
                    if ($("#parentCategory").val() < 1) {
                        GetCategoryInit();
                        GetProductCategoryList();
                    }
                    else {
                        GetCategoryById($("#parentCategory").val(), 1, 1000)
                        GetProductCategoryList();
                    }
                    layer.msg("保存成功", {
                        icon: 1, //图标
                        time: 1000 ,  //2秒关闭(如果不配置,默认是3秒)
                    }, function () {
                        layer.closeAll();
                    });

                }
                else if (result == -3) {
                    if ($("#parentCategory").val() == 0) {
                        layer.msg("一级分类最多只能添加100个！");
                    }
                    else {
                        layer.msg("当前二级分类最多只能添加100个！");
                    }
                    layer.close(index);
                }
                else if (result == -2) {
                    layer.msg("你没有该操作权限！");
                }
                else {
                    layer.msg("修改类别失败");
                }
            }
        });
    }
}

function f1() {
    var type;
    //类别初始化
    $.ajax({
        url: '/ProductCategory/GetFirstCategory',
        type: 'get',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                for (var i in data) {
                    $("#parentCategory").append("<option value='" + data[i].productcategory_id + "'>" + data[i].sv_pc_name + "</option>");
                }
            }
        }
    });
    //类别类型
    $.ajax({
        url: '/ProductCategory/GetProductType',
        type: 'get',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                for (var i in data)
                {
                    if (data[i].sv_pt_name.indexOf('计时') < 0){
                        $("#producttype_id").append("<option value='" + data[i].producttype_id + "'>" + data[i].sv_pt_name + "</option>");
                    }
                }
            }
        }
    });
    //类别变化时
    $("#parentCategory").change(function () {
        if ($("#parentCategory").val() != "0") {
            $(".producttype_id_ishide").hide();

        }
        else {
            $(".producttype_id_ishide").show();
        }
    });
    //判断是一级类别还是二级类别
    if ($('input[name="subbox"]:checked').data("cid") == null) {
        type = "subc";
    }
    else {
        type = "c";
    }
    //类别绑定
    $.ajax({
        url: '/AjaxProduct/GetInitDialog?id=' + ($('input[name="subbox"]:checked').data("cid") || $('input[name="subbox"]:checked').data("scid")) + "&type=" + type,
        type: 'get',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                for (var i in data) {
                    if (data[i].productcategory_id > 0) {
                        $("#producttype_id").val(data[i].producttype_id);
                        $("#parentCategory").val("0");
                        $("#parentCategory").attr("disabled", "disabled");
                        $("#sv_pc_name").val(data[i].sv_pc_name);
                    }
                    else {
                        $(".producttype_id_ishide").hide();
                        $("#parentCategory").val(data[i].sv_psc_parentid);
                        $("#sv_pc_name").val(data[i].sv_psc_name);
                    }
                }
            }
        }
    });
}

//保存类别        
function c() {
    if ($("#sv_pc_name").val() == "" || $("#sv_pc_name").val() == null) {
        layer.msg("请输入类别名称");
    }
    else if ($("#parentCategory").val() == "0" && $("#producttype_id").val() == "-1") {
        layer.msg("选择一级类别时，类型为必选项");
    }
    else {
        var index = layer.load(1, { shade: [0.1, '#000']}); //0代表加载的风格，支持0-2
        $.ajax({
            url: "/AjaxProduct/SaveCategory",
            data: JSON.stringify({ productcategory_id: $("#parentCategory").val(), sv_pc_name: $("#sv_pc_name").val(), producttype_id: $("#producttype_id").val() }),
            type: "POST",
            contentType: "application/json",
            success: function (result) {
                if (result == true) {
                    if ($("#parentCategory").val() > 0) {
                        GetCategoryById($("#parentCategory").val(), 1, 1000);
                        GetProductCategoryList();
                    }
                    else {
                        GetCategoryInit();
                        GetProductCategoryList();
                    }
                    layer.msg("保存成功", {
                        icon: 1, //图标
                        time: 1000 ,  //2秒关闭(如果不配置,默认是3秒)
                    }, function () {
                        layer.closeAll();
                    });

                }
                else if (result == -3) {
                    if ($("#parentCategory").val() == 0) {
                        layer.msg("一级分类最多只能添加100个！");
                    }
                    else {
                        layer.msg("当前二级分类最多只能添加100个！");
                    }
                    layer.close(index);
                }
                else if (result == -2) {
                    layer.msg("你没有该操作权限！");
                    layer.close(index);
                }
                else {
                    layer.msg("添加类别失败，请刷新重试");
                    layer.close(index);
                }
            }
        });
    }
}

function f() {
    //类别初始化
    $.get("/ProductCategory/GetFirstCategory", function (data) {
        if (data.length > 0) {
            for (var i in data) {
                $("#parentCategory").append("<option value='" + data[i].productcategory_id + "'>" + data[i].sv_pc_name + "</option>");
            }
        }
    });
    //类别类型
    $.get("/ProductCategory/GetProductType", function (data) {
        if (data.length > 0) {
            for (var i in data)
            {
                if (data[i].sv_pt_name.indexOf('计时') < 0)
                {
                    $("#producttype_id").append("<option value='" + data[i].producttype_id + "'>" + data[i].sv_pt_name + "</option>");
                }
            }
        }
    });
    //类别变化时
    $("#parentCategory").change(function () {
        if ($("#parentCategory").val() != "0") {
            $(".producttype_id_ishide").hide();
            $("#sv_pc_name_ID").text("二级分类：");
        }
        else {
            $(".producttype_id_ishide").show();
            $("#sv_pc_name_ID").text("分类名称：");
        }
    });
}

//点击某行即选中该行checkbox
$(document).on("click", ".select_check-box", function () {
    if (!$(this).find("input").prop("checked")) {
        $('input[name="subbox"]').prop("checked", false);
        $('input[name="subbox"]').parent().parent().removeClass('checkedBox');
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
});


$(document).on("click", ".pcategoryEnabled", function () {

    if (!$(this).find("input").prop("checked")) {
        $(this).find("input").prop("checked", true);
        $(this).addClass('checkedBox');
    }
    else {
        $(this).find("input").prop("checked", false);
        $(this).removeClass('checkedBox');
        $("#checkAll").find("input").prop("checked", false);
        $("#checkAll").removeClass('checkedBox');
    }
});

//点击一级分类获取二级分类
function GetCategoryById(cid, page, count) {
    $.get("/AjaxProduct/GetCategoryById?cid=" + cid + "&page=" + page + "&count=" + count, function (data) {
        $("#checkAll input").prop("checked", false);
        $("#checkAll").removeClass("checkedBox");
        var html = "";
        if (data.length > 0) {
            for (var i in data) {
                html += '<tr class="selectChk"><td><div class="check-box select_check-box"><i><input type="checkbox" name="subbox" data-scid=' + data[i].productsubcategory_id + ' data-parentid=' + data[i].sv_psc_parentid + '></i></div></td>';
                html += '<td>' + (parseInt(i) + 1) + '</td>';
                html += '<td>' + data[i].sv_psc_name + '</td>';
                sv_pt_name = data[i].sv_pt_name || "";
                html += '<td>' + sv_pt_name + '</td>';
                html += '</tr>';
            }
        }
        $(".pcategory").html(html);
    });
}

//点击二级分类获取详情
function GetSubCategoryById(subcid) {
    $.get("/AjaxProduct/GetSubCategoryById?subcid=" + subcid, function (data) {
        $("#checkAll input").prop("checked", false);
        $("#checkAll").removeClass("checkedBox");
        if (data.length > 0) {
            var html = "";
            for (var i in data) {
                html += '<tr class="selectChk"><td><div class="check-box select_check-box"><i><input type="checkbox" name="subbox" data-scid=' + data[i].productsubcategory_id + ' data-parentid=' + data[i].sv_psc_parentid + '></i></div></td>';
                html += '<td>1</td>';
                html += '<td>' + data[i].sv_psc_name + '</td>';
                sv_pt_name = data[i].sv_pt_name || "";
                html += '<td>' + sv_pt_name + '</td>';
                html += '</tr>';
            }
        }
        $(".pcategory").html(html);
    });
}

//分类表格初始化，即所有一级类别
function GetCategoryInit() {
    $.get("/AjaxProduct/GetCategoryInit?page=1&count=1000", function (data) {
        $("#checkAll input").prop("checked", false);
        $("#checkAll").removeClass("checkedBox");
        if (data.length > 0) {
            var html = "";

            for (var i in data) {
                var sv_sort = data[i].sv_sort != null && data[i].sv_sort > 0 ? data[i].sv_sort : (parseInt(i) + 1);
                html += '<tr class="selectChk" id="sort_' + sv_sort + '" data-id="' + data[i].productcategory_id + '" data-sort="' + sv_sort + '" data-enabled="' + data[i].sv_enabled + '"><td><div class="check-box select_check-box"><i><input type="checkbox" name="subbox" data-cid=' + data[i].productcategory_id + '></i></div></td>';
                html += '<td>' + (parseInt(i) + 1) + '</td>';
                html += '<td>' + data[i].sv_pc_name + '</td>';
                html += '<td>' + data[i].sv_pt_name + '</td>';
                if (i == 0) {
                    html += '<td><img style="margin-left:28px;" src="/images/downarrow.svg" class="downarrow" title="向下" data-id="' + data[i].productcategory_id + '" data-sort="' + sv_sort + '"/></td>';
                }
                else if ((parseInt(i) + 1) == data.length) {
                    html += '<td><img src="/images/uparrow.svg" class="uparrow" title="向上" data-id="' + data[i].productcategory_id + '" data-sort="' + sv_sort + '"/></td>';
                }
                else {
                    html += '<td><img src="/images/uparrow.svg" class="uparrow" title="向上" data-id="' + data[i].productcategory_id + '" data-sort="' + sv_sort + '"/><img src="/images/downarrow.svg" class="downarrow" title="向下" data-id="' + data[i].productcategory_id + '" data-sort="' + sv_sort + '"/></td>';
                }
                if (data[i].sv_enabled) {
                    html += '<td><div class="check-box pcategoryEnabled checkedBox" data-id="' + data[i].productcategory_id + '"><i><input type="checkbox" checked="checked" name="enabled"></i></div></td>';
                }
                else {
                    html += '<td><div class="check-box pcategoryEnabled" data-id="' + data[i].productcategory_id + '"><i><input type="checkbox" name="enabled"></i></div></td>';
                }
                html += '</tr>';
            }
        }
        $("#pcategoryHtml").html(html);
    });
}

// 商品分类排序向上操作
$(document).on('click', '#pcategoryHtml .uparrow', function () {
    var sort = parseInt($(this).data('sort'));
    var sort_up = parseInt($(this).data('sort')) - 1;
    if (sort > 1) {
        $('#sort_' + sort + '').data('sort', sort_up);
        $('#sort_' + sort_up + '').data('sort', sort);
        savePcategorySort();
    }
});

// 商品分类排序向上操作
$(document).on('click', '#pcategoryHtml .downarrow', function () {
    var sort = parseInt($(this).data('sort'));
    var sort_up = parseInt($(this).data('sort')) + 1;
    if (sort >= 1) {
        $('#sort_' + sort + '').data('sort', sort_up);
        $('#sort_' + sort_up + '').data('sort', sort);
        savePcategorySort();
    }
});

// 保存排序操作
function savePcategorySort() {
    var pcategoryList = new Array();
    $('#pcategoryHtml tr').each(function () {
        var model = {
            productcategory_id: $(this).data('id'),
            sv_sort: $(this).data('sort')
        };
        pcategoryList.push(model);
    });
    if (pcategoryList != null && pcategoryList.length > 0) {
        $.postAsyncContentJson('/AjaxProduct/SaveCategorySort', pcategoryList, function (result) {
            if (result == true) {
                GetCategoryInit();
                GetProductCategoryList();
            }
            else if (result == false) {
                layer.msg("操作失败，请刷新页面后再试！");
                GetCategoryInit();
                GetProductCategoryList();
            }
            else if (result == -2) {
                layer.msg("你没有该操作权限！");
            }
        });
    }
}

// 商品分类是否在销售时显示
$(document).on('click', '#pcategoryHtml .pcategoryEnabled', function () {
    $.postAsyncJson('/AjaxProduct/SaveCategoryEnabled/', { categoryId: $(this).data('id'), enabled: $(this).find("input").prop("checked") }, function (result) {
        if (result == true) {
        }
        else if (result == false) {
            layer.msg("操作失败，请刷新页面后再试！");
            GetCategoryInit();
        }
        else if (result == -2) {
            layer.msg("你没有该操作权限！");
        }
    });

});

//加载所有类别列表
function GetProductCategoryList() {
    $.get("/ProductCategory/GetProductCategoryList", function (data) {
        $("#checkAll input").prop("checked", false);
        $("#checkAll").removeClass("checkedBox");
        if (data.length > 0) {
            $(".listo").html("");
            var html = "";
            for (var i in data) {

                html += '<li><a class="firstLevelCategory" href="javascript:void(0)" onclick="GetCategoryById(' + data[i].productcategory_id + ',1,1000)"><i class="posic "></i>' + data[i].sv_pc_name + '</a>';

                if (data[i].subcategory != null && data[i].subcategory != "") {
                    if (data[i].subcategory.length > 0) {
                        html += '<ul>';
                        for (var s in data[i].subcategory) {
                            html += '<li><a href="javascript:void(0)" onclick="GetSubCategoryById(' + data[i].subcategory[s].productsubcategory_id + ')">' + data[i].subcategory[s].sv_psc_name + '</a></li>';
                        }
                        html += "</ul>";
                    }
                }

                html += '</li>';
            }
            $(".listo").html(html);
        }
    });
}

$(document).ready(function () {
    //刷新
    $("#refreshCategory").click(function () {
        GetCategoryInit();
    });

    //删除
    $("#deleteCategory").click(function () {
        var boxCheckedNum = $('input[name="subbox"]:checked').length;
        if (boxCheckedNum > 1) {
            layer.msg("不能同时删除两个及以上类别");
        }
        else
            if (boxCheckedNum < 1) {
                layer.msg("请选择一个类别");
            }
            else {
                layer.confirm('是否确认删除该分类？', {
                    btn: ['是', '否'] //按钮
                }, function () {
                    if ($('input[name="subbox"]:checked').data("cid") == null) {
                        type = "subc";
                        $.ajax({
                            url: "/AjaxProduct/DeleteCategory?id=" + $('input[name="subbox"]:checked').data("scid") + "&type=" + type,
                            type: "GET",
                            contentType: "text/html",
                            success: function (result) {
                                if (result.succeed == true) {
                                    layer.msg("删除类别成功");
                                    GetCategoryById($('input[name="subbox"]:checked').data("parentid"), 1, 1000)
                                    GetProductCategoryList();
                                }
                                else {
                                    layer.msg(result.errmsg);
                                }
                            }
                        });
                    }
                    else {
                        type = "c";
                        layer.confirm('删除一级分类，同是会删除其下子分类，是否删除？', {
                            btn: ['是', '否'] //按钮
                        }, function () {
                            $.ajax({
                                url: "/AjaxProduct/DeleteCategory?id=" + $('input[name="subbox"]:checked').data("cid") + "&type=" + type,
                                type: "GET",
                                contentType: "text/html",
                                success: function (result) {
                                    if (result.succeed == true) {
                                        layer.msg("删除类别成功");
                                        GetCategoryInit();
                                        GetProductCategoryList();
                                    }
                                    else {
                                        layer.msg(result.errmsg);
                                    }
                                }
                            });
                        });
                    };
                }, function () {

                });
            }
    })

    //修改
    $("#updateCategory").click(function () {
        var boxCheckedNum = $('input[name="subbox"]:checked').length;
        if (boxCheckedNum > 1) {
            layer.msg("不能同时修改两个及以上类别");
        }
        else if (boxCheckedNum < 1) {
            layer.msg("请选择一个类别");
        }
        else {
            Deke.DeKe_dialog.show_Url('修改分类', '/Html/AddCategory.html?v=' + clearCache + 100, ['保存', '退出'], c1, f1, ['400px', '250px']);
        }
    })

    GetProductCategoryList();

    GetCategoryInit();

    //商品分类左侧分类展开收缩事件
    $(document).on("click", ".firstLevelCategory", function () {
        $(this).parent().toggleClass('active').siblings().removeClass('active');
        if ($('.posic').parents('li').hasClass('active')) {
            $(this).siblings('ul').slideDown(250);
            $(this).parents('li').siblings().children('ul').slideUp(250);;
        } else {
            $('.posic').parents('a').siblings('ul').slideUp(250);
        }
    });

});