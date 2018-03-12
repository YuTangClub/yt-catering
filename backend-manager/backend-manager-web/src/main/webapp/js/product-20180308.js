//加载文档时
var batch_i = 1;
var strPath = "";
//函数f1里的全局变量，减少服务器访问次数
var data_f1;
var productInfoJson = ''; // 记录当个信息Json
var tbodyhtmltr = "";//配置明细tr
var detailtheadtr = ""//配置明细列头tr
var statusFlag = "0"; // 上下架 默认 0 为已上架 ，2 已下架
var product_lowerThanTotal = 10; // 低于多少库存量
var _g_ImportExecl_productlist_data; // 准备导入的数据
var _g_ImportExecl_productlist_isSuccess = false; // 导入是否成功
var _g_data_package_type = false;
var _g_PrinterAssociated = null;

var _temp_GetProductSimpleDesc = false;
// 获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
// 联动
$(document).on('change', "#productcategory_id", function () {
    if (_g_PrinterAssociated)
    {
        associated(_g_PrinterAssociated);
    }
    else
    {
        $.get('/CateringKitchenPrinter/GetPrinterAssociated', null, function (result) {
            if (result && result.length > 0) {
                _g_PrinterAssociated = result;
                associated(_g_PrinterAssociated);
            }
        });
    }
});
function associated(_g_PrinterAssociated) 
{
    if (_g_PrinterAssociated && _g_PrinterAssociated.length > 0) {
        for (var k = 0; k < _g_PrinterAssociated.length ; k++) {
            var ids = _g_PrinterAssociated[k].procut_category_id.split(',');
            for (var i = 0; i < ids.length - 1; i++) {
                if ($("#productcategory_id").val() == ids[i]) {
                    $('#sv_printer_id').val(_g_PrinterAssociated[k].sv_printer_id);
                }
            }
        }
    }
}
// 读取厨房打印方案
function getCateringKitchenPrinterList() {
    var kitchenPrinterListHtml = '<option value="0">请选择厨打方案</option>';
    $.ajax({
        url: '/CateringKitchenPrinter/GetCateringKitchenPrinterList',
        method: 'get',
        contentType: 'json',
        async: false,
        success: function (data) {
            if (data.values != null) {
                var dataList = data.values;
                for (var i = 0; i < dataList.length; i++) {
                    kitchenPrinterListHtml += '<option value="' + dataList[i].sv_printer_id + '">' + dataList[i].sv_printer_name + '</option>';
                }
            }
            $('#sv_printer_id').html(kitchenPrinterListHtml);
        }
    });
}

$(document).ready(function () {

    if (location.hash == "#addproduct") {
        Deke.DeKe_dialog.show_Url2('新增', '/Product/_PartialAddProduct?buttonCode=btn_addprodcut_code', f, ['850px', '600px']);
    }
    $(document).on("click", "#SetCommonItem", function () {
        layer.msg("下版功能，敬请期待~");
    });
    $(document).on("click", "#AddSelfDefine", function () {
        layer.msg("下版功能，敬请期待~");
    });
    $(document).on('change', "#fileToUpload", function () {
        $.commonUploadImg('fileToUpload', "Product", "true", function (resultImgUrl) {
            if (resultImgUrl) {
                //把图片替换  
                $("#upload").attr("src", _g_res_images_url + resultImgUrl);
                var sv_p_images = $("#addProductForm input[type='hidden'][name='sv_p_images']").eq(0);
                sv_p_images.val(resultImgUrl);
                $(".Productimag").attr("src", _g_res_images_url + resultImgUrl);
                $('.sv_p_images').val(resultImgUrl);
            }
        });
    });

    $(document).on('change', "#fileToUploadimage", function () {
        $.commonUploadImg('fileToUploadimage', "Product", "true", function (resultImgUrl) {
            if (resultImgUrl) {
                var pic = document.getElementById("sv_p_images");
                var id = document.getElementById("proid").value
                pic.src = _g_res_images_url + resultImgUrl;
                $.ajax({
                    url: '/AjaxProduct/UpImageBy?id=' + id + "&imagestr=" + resultImgUrl,
                    type: 'get',
                    dataType: "json",
                    success: function (data) {
                        if (data > 0) {
                            layer.msg("更换成功");
                        }
                        else {
                            layer.msg("更换失败");
                        }

                    }
                })
            }
        });
    });
    //选择文件之后执行上传  
    $(document).on('change', "#fileToUpload3", function () {
        _g_ImportExecl_productlist_data = null;
        $.commonUploadExelFile('fileToUpload3', '/api/Product/ImportExecl', function (data) {
            debugger;
            if (data.Message == "-2") {
                layer.msg("你没有该操作权限！");
                layer.close(index);
            } else if (data.Message == "-5") {
                layer.msg("上传文件失败,表格存在相同的编码！");
                layer.close(index);
            }
            else if (data.Message == "-6") {
                layer.msg("上传文件失败,表格存在库存数量为负的！");
                layer.close(index);
            }
            else if (data.Success) {
                if (data.Message != "" && data.Message != null && data.Message.indexOf("表格数据有误") >= 0) {
                    layer.msg(data.Url);
                    layer.close(index);
                } else {
                    if (data.Data != "" && data.Data != null) {
                        _g_ImportExecl_productlist_data = data.Data;
                        strPath = data.Url;
                        if (_g_ImportExecl_productlist_data) {
                            Deke.DeKe_dialog.show_Url3("导入列表", "/Html/Product/ProductList.html?v=" + clearCache + 1, productlist, ['80%', ''], "");
                        }

                    } else {
                        layer.msg("上传文件失败,表格数据有误！");
                        layer.close(index);
                    }
                }

            }
            else {
                if (data.Message != "" && data.Message != null && data.Message.indexOf("不属于表") > 0) {
                    layer.msg("上传文件失败！" + data.Message + "请下载最新商品导入模板");
                    layer.close(index);
                } else {
                    layer.msg("上传文件失败！");
                    layer.close(index);
                }
            }
        });
    });
    //库存低于alertvalue件的的"详情"
    $("#sumLessThan10Detail").click(function () {

        product_lowerThanTotal = parseFloat($('#lowerThanTotal').text());
        GetProductListLessThan10(1, product_lowerThanTotal);
    })
    //导出
    $("#Export").click(function () {
        //去出产品列表第一行复选框的选中状态及样式
        $("#checkAll input").prop("checked", false);
        $("#checkAll").removeClass("checkedBox");
        //设置参数
        var statusFlag = "0";
        var categoryFlag = $("#quickFilterC").val();
        var erjicategoryFlag = $("#secondquickFilterC").val();
        var storageFlag = "0";
        var adddateFlag = "0";
        var nameFlag = $("#txtNameSearch").val().replace(/\ +/g, "");
        if ($("#filterBox").css("display") == "block") {
            statusFlag = $('#selectedFilter').find("[data-name='status']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='status']").data("id");
            $('#productState').val(statusFlag);
            if (statusFlag == 2) {
                $('#unshelveProduct span').html('从列表上架');
            }
            else {
                $('#unshelveProduct span').html('从列表下架');
            }
            categoryFlag = $('#selectedFilter').find("[data-name='category']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='category']").data("id");
            storageFlag = $('#selectedFilter').find("[data-name='storage']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='storage']").data("id");
            if (storageFlag == "4") {
                storageFlag = $('#selectedFilter').find("[data-name='storage']").data("html");
            }
            adddateFlag = $('#selectedFilter').find("[data-name='adddate']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='adddate']").data("id");
            if (adddateFlag == "4") {
                adddateFlag = $('#selectedFilter').find("[data-name='adddate']").data("html");
            }
        }
        var loadingIndex = commonOpenLoading();
        $.getJSON("/Product/ExportData", { "status": statusFlag, "category": categoryFlag, "storage": storageFlag, "adddate": adddateFlag, "name": nameFlag, "erjicategory": erjicategoryFlag }, function (data) {
            commonCloseLoading(loadingIndex);
            if (data == -2) {
                layer.msg("你没有该操作权限！");
            } else if (data != 0 && data != null) {
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
                layer.msg("数据导出失败！");
            }
        })
    });
    //获取简单描述
    //GetProductSimpleDesc();

    //按键放松事件：按名称、编码查询
    $("#txtNameSearch").keypress(function (event) {
        if (event.keyCode == 13) {
            var txtNameSearch = $(this).val().replace(/\ +/g, "");
            if (txtNameSearch) {
                GetProductList(null, "");
            }
            else {
                layer.msg("请输入要查询的内容！");
            }
        }
    })

    //按钮事件：按名称、编码查询
    $("#btnNameSearch").on("click", function () {
        GetProductList(null, "");
    })

    //查询
    $("#searchProduct").on("click", function () {
        GetProductList(null, "NotByName");
    })

    //筛选条件的变化效果
    $("#statusFilter,#categoryFilter,#storageFilter,#adddateFilter").on("click", "li", function () {
        if (!$(this).hasClass("active")) {
            if ($(this).find("input").length == 0) {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                $('#selectedFilter').find("[data-name='" + $(this).data("name") + "']").remove();
                if ($(this).data("id") != 0) {//不选"全部"时
                    $('#selectedFilter').append('<li class="select active" data-id="' + $(this).data("id") + '" data-name="' + $(this).data("name") + '"><a href="javascript:void(0);">' + $(this).text() + '<span class="colos">×</span></a></li>');
                }
                //点击"新增时间"下的li时，input清空
                if ($(this).data("name") == "adddate") {
                    $("#startDate").val("");
                    $("#endDate").val("");
                }
                //点击"库存"下的li时，input清空
                if ($(this).data("name") == "storage") {
                    $("#minStorage").val("");
                    $("#maxStorage").val("");
                }
            }
        }
        else {
            $(this).removeClass("active");
            $(this).parent().find("[data-id='0']").addClass("active");
            $('#selectedFilter').find("[data-name='" + $(this).data("name") + "']").remove();
        }
    });

    //"已选择"下的点击删除事件
    $('#selectedFilter').on('click', 'li', function () {
        $(this).remove();
        $("#filterBox").find("[data-name='" + $(this).data("name") + "']").removeClass("active");
        $("#filterBox").find("[data-name='" + $(this).data("name") + "']").parent().find("[data-id='0']").addClass("active");
        //点击"新增时间"下的li时，input清空
        if ($(this).data("name") == "adddate") {
            $("#startDate").val("");
            $("#endDate").val("");
        }
        //点击"库存"下的li时，input清空
        if ($(this).data("name") == "storage") {
            $("#minStorage").val("");
            $("#maxStorage").val("");
        }
    });

    //最大/小库存按键松开事件
    $("#maxStorage").keyup(function () {
        $("#storageFilter li").removeClass("active");
        $('#selectedFilter').find("[data-name='" + $(this).parent("li").data("name") + "']").remove();
        if ($("#minStorage").val() != "" && $("#maxStorage").val() != "") {
            $('#selectedFilter').append('<li class="select active" data-id="' + $(this).parent("li").data("id") + '" data-name="' + $(this).parent("li").data("name") + '" data-html="' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '"><a href="javascript:void(0);">' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '<span class="colos">×</span></a></li>');
        }
        else if ($("#minStorage").val() == "" && $("#maxStorage").val() != "") {
            $('#selectedFilter').append('<li class="select active" data-id="' + $(this).parent("li").data("id") + '" data-name="' + $(this).parent("li").data("name") + '" data-html="不限-' + $("#maxStorage").val() + '"><a href="javascript:void(0);">不限-' + $("#maxStorage").val() + '<span class="colos">×</span></a></li>');
        }
        else if ($("#minStorage").val() != "" && $("#maxStorage").val() == "") {
            $('#selectedFilter').append('<li class="select active" data-id="' + $(this).parent("li").data("id") + '" data-name="' + $(this).parent("li").data("name") + '" data-html="' + $("#minStorage").val() + '-不限"><a href="javascript:void(0);">' + $("#minStorage").val() + '-不限<span class="colos">×</span></a></li>');
        }
        else {
            $('#storageFilter').find("[data-id='0']").addClass("active");
        }
    });
    $("#minStorage").keyup(function () {
        $("#storageFilter li").removeClass("active");
        $('#selectedFilter').find("[data-name='" + $(this).parent("li").data("name") + "']").remove();
        if ($("#minStorage").val() != "" && $("#maxStorage").val() != "") {
            $('#selectedFilter').append('<li class="select active" data-id="' + $(this).parent("li").data("id") + '" data-name="' + $(this).parent("li").data("name") + '" data-html="' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '"><a href="javascript:void(0);">' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '<span class="colos">×</span></a></li>');
        }
        else if ($("#minStorage").val() == "" && $("#maxStorage").val() != "") {
            $('#selectedFilter').append('<li class="select active" data-id="' + $(this).parent("li").data("id") + '" data-name="' + $(this).parent("li").data("name") + '" data-html="不限-' + $("#maxStorage").val() + '"><a href="javascript:void(0);">不限-' + $("#maxStorage").val() + '<span class="colos">×</span></a></li>');
        }
        else if ($("#minStorage").val() != "" && $("#maxStorage").val() == "") {
            $('#selectedFilter').append('<li class="select active" data-id="' + $(this).parent("li").data("id") + '" data-name="' + $(this).parent("li").data("name") + '" data-html="' + $("#minStorage").val() + '-不限"><a href="javascript:void(0);">' + $("#minStorage").val() + '-不限<span class="colos">×</span></a></li>');
        }
        else {
            $('#storageFilter').find("[data-id='0']").addClass("active");
        }
    });
    //开始/结束日期选择后的事件
    laydate({
        elem: '#startDate',
        format: 'YYYY/MM/DD',//分隔符可以任意定义，该例子表示只显示年月,
        isclear: false,//是否显示清空
        istoday: false,//是否显示今天
        issure: false,//是否显示确认
        choose: function (datas) {//选择日期完毕的回调
            $("#adddateFilter li").removeClass("active");
            $('#selectedFilter').find("[data-name='" + $("#startDate").parent("li").data("name") + "']").remove();
            if ($("#startDate").val() != "" && $("#endDate").val() != "") {
                $('#selectedFilter').append('<li class="select active" data-id="' + $("#startDate").parent("li").data("id") + '" data-name="' + $("#startDate").parent("li").data("name") + '" data-html="' + $("#startDate").val() + '-' + $("#endDate").val() + '"><a href="javascript:void(0);">' + $("#startDate").val() + '-' + $("#endDate").val() + '<span class="colos">×</span></a></li>');
            }
            else if ($("#startDate").val() == "") {
                $('#selectedFilter').append('<li class="select active" data-id="' + $("#startDate").parent("li").data("id") + '" data-name="' + $("#startDate").parent("li").data("name") + '" data-html="不限-' + $("#endDate").val() + '"><a href="javascript:void(0);">不限-' + $("#endDate").val() + '<span class="colos">×</span></a></li>');
            }
            else if ($("#endDate").val() == "") {
                $('#selectedFilter').append('<li class="select active" data-id="' + $("#startDate").parent("li").data("id") + '" data-name="' + $("#startDate").parent("li").data("name") + '" data-html="' + $("#startDate").val() + '-至今"><a href="javascript:void(0);">' + $("#startDate").val() + '-至今<span class="colos">×</span></a></li>');
            }
        }
    });
    laydate({
        elem: '#endDate',
        format: 'YYYY/MM/DD',//分隔符可以任意定义，该例子表示只显示年月,
        isclear: false,//是否显示清空
        istoday: false,//是否显示今天
        issure: false,//是否显示确认
        choose: function (datas) {//选择日期完毕的回调
            $("#adddateFilter li").removeClass("active");
            $('#selectedFilter').find("[data-name='" + $("#endDate").parent("li").data("name") + "']").remove();
            if ($("#startDate").val() != "" && $("#endDate").val() != "") {
                $('#selectedFilter').append('<li class="select active" data-id="' + $("#endDate").parent("li").data("id") + '" data-name="' + $("#endDate").parent("li").data("name") + '" data-html="' + $("#startDate").val() + '-' + $("#endDate").val() + '"><a href="javascript:void(0);">' + $("#startDate").val() + '-' + $("#endDate").val() + '<span class="colos">×</span></a></li>');
            }
            else if ($("#startDate").val() == "") {
                $('#selectedFilter').append('<li class="select active" data-id="' + $("#endDate").parent("li").data("id") + '" data-name="' + $("#endDate").parent("li").data("name") + '" data-html="不限-' + $("#endDate").val() + '"><a href="javascript:void(0);">不限-' + $("#endDate").val() + '<span class="colos">×</span></a></li>');
            }
            else if ($("#endDate").val() == "") {
                $('#selectedFilter').append('<li class="select active" data-id="' + $("#endDate").parent("li").data("id") + '" data-name="' + $("#endDate").parent("li").data("name") + '" data-html="' + $("#startDate").val() + '-至今"><a href="javascript:void(0);">' + $("#startDate").val() + '-至今<span class="colos">×</span></a></li>');
            }
        }
    });

    //x删除标识
    //$(document).on('click', '.colos', function () {
    //    $(this).parent().parent("li").remove();
    //});

    //关闭添加弹出框
    $(document).on("click", "#cancel", function () {
        layer.closeAll("page");
    });

    //提示弹出框
    $(document).on("mouseover", ".tips", function () {
        index = layer.tips($(this).data("content"), $(this), {
            tips: [2, '#3595CC'],
            time: 2000
        });
    });

    //刷新
    $("#refreshProduct").click(function () {
        GetProductList(null, "NotByName");
    });

    //删除
    $("#deleteProduct").click(function () {
        var checkedbox = $('input[name="subbox"]:checked');
        var num = checkedbox.length;
        if (num == 1) {
            layer.confirm("是否确认删除该？", { "btn": ["是", "否"] },
                function () {
                    var ids = "";
                    checkedbox.each(function () {
                        ids += $(this).val() + ',';
                    });
                    $.ajax({
                        url: '/AjaxProduct/NegativeProduct?ids=' + ids.substring(0, ids.length - 1) + '&type=delete',
                        type: 'post',
                        contentType: 'text/html',
                        success: function (d) {
                            loggin.chklogn(d);
                            if (d == true) {
                                layer.msg("删除成功");
                                GetProductList(null, "NotByName");
                            }
                            else if (d == -2) {
                                layer.msg("你没有该操作权限");
                            }
                            else {
                                layer.msg("删除失败");
                            }
                        }
                    });
                });
        }
        else if (num > 1) {
            layer.msg("不能同时删除多个");
        }
        else {
            layer.msg("请选择一个");
        }
    });

    // 下架
    $("#unshelveProduct").click(function () {
        var statusFlag = 'unshelve';
        var productmsg = '是否确认下架该';
        if ($('#productState').val() == 2) {
            statusFlag = 'putaway';
            productmsg = '是否确认上架该';
        }
        var checkedbox = $('input[name="subbox"]:checked');
        var num = checkedbox.length;
        if (num > 0) {
            layer.confirm(productmsg, { "btn": ["是", "否"] },
                function () {
                    var ids = "";
                    checkedbox.each(function () {
                        ids += $(this).val() + ',';
                    });
                    $.ajax({
                        url: '/AjaxProduct/NegativeProduct?ids=' + ids.substring(0, ids.length - 1) + '&type=' + statusFlag,
                        type: 'post',
                        contentType: 'text/html',
                        success: function (d) {
                            loggin.chklogn(d);
                            if (d == true) {
                                if (statusFlag == 'unshelve') {
                                    layer.msg("下架成功");
                                }
                                else {
                                    layer.msg("上架成功");
                                }
                                GetProductList(null, "NotByName");
                                GetProductSimpleDesc()
                            }
                            else if (d == -2) {
                                layer.msg("你没有该操作权限！");
                            }
                            else {
                                layer.msg("下架失败");
                            }
                        }
                    });
                });
        }
        else {
            layer.msg("请选择至少一个");
        }
    });

    //绑定一级分类、类别快捷筛选
    $.ajax({
        url: '/ProductCategory/GetFirstCategory',
        method: 'get',
        contentType: 'text/html',
        async: false,
        success: function (data) {
            loggin.chklogn(data);
            if (data.length > 0) {

                for (var i in data) {
                    $("#quickFilterC").append('<option value="' + data[i].productcategory_id + '">' + data[i].sv_pc_name + '</option>');
                    $("#categoryFilter").append('<li class="select" data-id="' + data[i].productcategory_id + '" data-name="category"><a href="javascript:void(0);">' + data[i].sv_pc_name + '</a></li>');
                }
            }
        }
    });
    $("#quickFilterC").change(function () {
        GetProductList(null, "NotByName");
    });

    $("#secondquickFilterC").change(function () {
        GetProductList(null, "NotByName");
    });

    // 提交信息到服务器(isContinue 是否继续操作)
    function savePostProductInfo(isContinue) {
        var isadd = true;
        //var verification_input = /^[A-Za-z0-9]+$/;
        //提成配置是否启用显示
        var sv_p_commissiontype = $("#sv_p_commissiontype").val() || 0;
        var sv_p_commissionratio = $("#sv_p_commissionratio").val();

        if ($("#sv_p_commissionratio").parent().css("display") !== "none") {
            if (sv_p_commissiontype && isNaN(sv_p_commissionratio)) {
                layer.msg("输入的提成配置不是数字，请检查后重新输入!~");
                isadd = false;
                return;
            }
        }

        var productcategory_id = $("#productcategory_id");
        if (productcategory_id.val() == "0") {
            layer.msg("还未选择分类！~");
            isadd = false;
            return;
        }
        var sv_p_barcode = $("#sv_p_barcode");
        $("#sv_p_name").val(ClearBr($("#sv_p_name").val()));
        var sv_p_name = $("#sv_p_name");
        var sv_mnemonic_code = $('#sv_mnemonic_code').val().trim();
        var findsv_p_barcode = $("#sv_p_barcode").val().replace(/\ +/g, "");
        var findsv_p_name = $('#sv_p_name').val().replace(/\ +/g, "");
        if (findsv_p_barcode == "" || findsv_p_barcode == null || findsv_p_barcode == undefined) {
            layer.msg("编码还没有输入！~");
            sv_p_barcode.focus();
            isadd = false;
            return;
        }
        if (findsv_p_barcode.length > 20) {
            layer.msg("编码最多只能输入20位字符！");
            sv_p_barcode.focus();
            isadd = false;
            return;
        }
        //else {
        //    $.ajax({
        //        url: '/AjaxProduct/IsBarcodeExist?customdDetailList=' + CustomdDetailList + 'barcode=' + findsv_p_barcode + '&product_id=' + $("#addProductForm input[type='hidden'][name='product_id']").eq(0).val(),
        //        type: 'post',
        //        contentType: 'application/json',
        //        async: false,
        //        success: function (d) {
        //            loggin.chklogn(d);
        //            if (d.succeed) {
        //                layer.msg("编码重复");
        //                sv_p_barcode.focus();
        //                isadd = false;
        //                return;
        //            }
        //        }
        //    });
        //}

        if (findsv_p_name == "" || findsv_p_name == null || findsv_p_name == undefined) {
            layer.msg("名称还没有输入！~");
            sv_p_name.focus();
            isadd = false;
            return;
        }

        if (sv_mnemonic_code != null && sv_mnemonic_code != '' && sv_mnemonic_code != undefined && sv_mnemonic_code.length > 15) {
            $('#sv_mnemonic_code').focus();
            layer.msg("助词码最多只能输入15位字符！");
            isadd = false;
            return;
        }
        $("#sv_p_name").val(ClearBr($("#sv_p_name").val()));
        if (isadd) {
            // 调整提交json方式
            // 提交自定义字段信息
            var list = new Array();
            var customFieldHtml = $('#customFieldHtml input');
            if (customFieldHtml.length > 0) {
                $('#customFieldHtml input').each(function () {
                    var model = {
                        sv_field_id: $(this).data('id'),
                        sv_field_value: $(this).val(),
                        sv_relation_id: $(this).data('relationid')
                    };
                    list.push(model);
                });
            }

            var memberjson = '{"CustomFieldList":"","productCustomdDetailList":"",';
            var strurl = "";
            var CustomdDetailList = "";
            //新增带多个规格
            if ($(".productdetailtbodytr").length > 0) {
                CustomdDetailList = GetCustomDetail();
                strurl = "AddProductlist";
                memberjson = memberjson.replace(/\,$/, "") + "}";
            } else {
                //默认新增
                $("#sv_p_specs").val($("#product_MoreSpecs").val() || $("#sv_p_specs").val());
                var _fromData = $("#addProductForm").serializeArray();
                $.each(_fromData, function (i, field) {
                    memberjson += '"' + field.name + '":"' + field.value + '",';
                });
                memberjson += '"producttype_id":"' + $("#productcategory_id").find("option[value='" + $("#productcategory_id").val() + "']").attr("data-type") + '"';
                memberjson = memberjson + "}";
                strurl = "AddProduct";
            }
            memberjson = JSON.parse(memberjson);
            list = JSON.stringify(list);
            memberjson.productCustomdDetailList = CustomdDetailList;
            memberjson.CustomFieldList = JSON.parse(list);
            var sv_pricing_method = $(".sv_pricing_method").hasClass('on') == true ? 1 : 0;
            var sv_product_integral = $("#sv_product_integral").val();
            memberjson.sv_product_integral = sv_product_integral;

            memberjson.sv_pricing_method = sv_pricing_method;
            if (!memberjson.product_id) {
                memberjson.product_id = 0;
            }
            if (!memberjson.sv_p_unitprice) {
                memberjson.sv_p_unitprice = 0;
            }
            if (!memberjson.sv_p_originalprice) {
                memberjson.sv_p_originalprice = 0;
            }
            if (!memberjson.sv_p_storage) {
                memberjson.sv_p_storage = 0;
            }
            if (!memberjson.sv_p_discount) {
                memberjson.sv_p_discount = 0;
            }
            if (!memberjson.sv_p_minunitprice) {
                memberjson.sv_p_minunitprice = 0;
            }
            if (!memberjson.sv_p_mindiscount) {
                memberjson.sv_p_mindiscount = 0;
            }
            if (!memberjson.sv_p_memberprice) {
                memberjson.sv_p_memberprice = 0;
            }

            if (!memberjson.sv_cheprod_datenum) {
                memberjson.sv_cheprod_datenum = 0;
            }
            memberjson.sv_p_barcode = findsv_p_barcode; // 编码
            memberjson.sv_p_artno = $("#sv_p_artno").val();
            memberjson.sv_p_isn = $("#sv_p_artno").val();
            memberjson.sv_p_commissiontype = $("#sv_p_commissiontype").val() || 0;
            memberjson.sv_p_commissionratio = $("#sv_p_commissionratio").val();
            memberjson.more_barcode = $("#sv_more_barcode_info").val();
            memberjson.combination = $("#combinationBarcodeInfo").val();//组合商品123456789
            memberjson.combination_type = _g_data_package_type;
            memberjson.sv_qr_code_image_path = $("#sv_product_attr_data").val();

            if (g_TraceabilityCode && $("#sv_product_attr_data").val())
            {
                memberjson.sv_product_attr_data = $("#sv_product_attr_data").val();
                if ($("#sv_product_attr_data").val())
                {
                    memberjson.sv_qr_code_image_path = $("#sv_product_attr_data").val();
                    disableButton('saveProduct');
                    var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-

                    $.ajax({
                        url: '/AjaxProduct/' + strurl,
                        type: 'post',
                        data: JSON.stringify(memberjson),
                        contentType: 'application/json',
                        async: false,
                        cache: false,
                        success: function (data) {
                            if (data == true) {
                                if (g_AutomaticallyGenerateProductBarcode) {
                                    if ($("#product_id").val() == null || $("#product_id").val() == "") { //修改会员时id不自动加一
                                        setAutoIdplusOne("是否自动生成商品编码",
                                            "AutomaticallyGenerateProductBarcode",
                                            "AutomaticallyGenerateProductBarcode");
                                    }
                                }
                                loggin.chklogn(data);
                                GetProductList(null, "NotByName");

                                enabledButton('saveProduct');
                                layer.closeAll();
                                layer.msg("保存成功", {
                                    icon: 1, //图标
                                    time: 800   //2秒关闭(如果不配置,默认是3秒)
                                }, function() {
                                    if (isContinue)
                                    { // 继续操作
                                        $('#addProductBtn').click(); // 清空新增的信息
                                    }
                                    else
                                    {
                                        layer.closeAll();
                                    }
                                });

                            }
                            else if (data == -2)
                            {
                                layer.msg("你没有该操作权限");
                                $('#saveProduct').removeClass("disabled").removeAttr("disabled", "disabled");
                                layer.close(index);
                            }
                            else if (data == -4)
                            {
                                layer.msg("编码重复");
                                sv_p_barcode.focus();
                                $('#saveProduct').removeClass("disabled").removeAttr("disabled", "disabled");
                            }
                            else
                            {
                                layer.msg("操作失败，请刷新重试");
                                $('#saveProduct').removeClass("disabled").removeAttr("disabled", "disabled");
                            }
                        }
                    });
                    layer.close(index);
                    return;
                }
            } else {
                disableButton('saveProduct');
                var index = layer.load(1, { shade: [0.1, '#000'] }); //0代表加载的风格，支持0-
                if (g_AutomaticallyGenerateProductBarcode) {
                    if ($("#product_id").val() == null || $("#product_id").val() == "") {//修改会员时id不自动加一
                        setAutoIdplusOne("是否自动生成商品编码", "AutomaticallyGenerateProductBarcode", "AutomaticallyGenerateProductBarcode");
                    }
                }
                $.ajax({
                    url: '/AjaxProduct/' + strurl,
                    type: 'post',
                    data: JSON.stringify(memberjson),
                    contentType: 'application/json',
                    async: false,
                    cache: false,
                    success: function (data) {
                        if (data == true) {
                            loggin.chklogn(data);
                            GetProductList(null, "NotByName");

                            enabledButton('saveProduct');
                            layer.closeAll();
                            layer.msg("保存成功", {
                                icon: 1, //图标
                                time: 800   //2秒关闭(如果不配置,默认是3秒)
                            }, function () {
                                if (isContinue) { // 继续操作
                                    $('#addProductBtn').click(); // 清空新增的信息
                                }
                                else {
                                    layer.closeAll();
                                }
                            });

                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限");
                            $('#saveProduct').removeClass("disabled").removeAttr("disabled", "disabled");
                            layer.close(index);
                        }
                        else if (data == -4) {
                            layer.msg("编码重复");
                            sv_p_barcode.focus();
                            $('#saveProduct').removeClass("disabled").removeAttr("disabled", "disabled");
                        }
                        else {
                            layer.msg("操作失败，请刷新重试");
                            $('#saveProduct').removeClass("disabled").removeAttr("disabled", "disabled");
                        }
                    }
                });
                layer.close(index);
            }
        }
    }

    // 保存信息并继续操作
    $(document).on('click', '#saveProductContinueOperation', function () {
        savePostProductInfo(true);
    });

    //保存产品信息
    $(document).on("click", "#saveProduct", function () {
        savePostProductInfo(false);
    });
    //选择配置
    $(document).on("click", ".productconfig", function () {
        $(this).toggleClass('on');
        if ($(".ritianshu .on").length < 4) {
            var configid = $(this).data("configid");
            if (!$(this).hasClass('on')) {
                //取消配置移除小类选中项
                $("#" + configid + " .childchoice ").each(function () {
                    if ($(this).hasClass('on')) {
                        $(this).toggleClass('on');
                    }
                });
                $("#" + configid).hide();
            } else {
                //选中配置默认选中第一个小类
                $("#" + configid + " .childchoice ").each(function () {
                    if (!$(this).hasClass('on')) {
                        $(this).toggleClass('on');
                    }
                    return false;
                });
                $("#" + configid).show();
            }
            AddproductConfigdatalist()
        } else {
            $(this).toggleClass('on');
            layer.msg("最多只能选择3种类型");
            return false;
        }
    })
    //小类选择
    $(document).on("click", ".childchoice", function () {
        $(this).toggleClass('on');
        AddproductConfigdatalist();
    });
    //修改多规格
    $(document).on("click", ".productMoreSpecs", function () {
        $("#sv_p_specs").val("");
        var strMoreSpecs = $("#product_MoreSpecs").val();
        var deleteRelationid = $("#deleteRelation_id").val();
        if (!$(this).hasClass('on')) {
            $(this).toggleClass('on')
            strMoreSpecs = strMoreSpecs + "," + $(this).data("detailname");
            deleteRelationid = deleteRelationid.replace($(this).data("relationid"), "");
        } else {
            $(this).toggleClass('on')
            strMoreSpecs = (strMoreSpecs.replace($(this).data("detailname"), ""));
            deleteRelationid = deleteRelationid + "," + $(this).data("relationid");

        }
        strMoreSpecs = strMoreSpecs[0] == ',' ? strMoreSpecs.slice(1) : strMoreSpecs.replace(/\,$/, "")
        deleteRelationid = deleteRelationid[0] == ',' ? deleteRelationid.slice(1) : deleteRelationid.replace(/\,$/, "")
        $("#product_MoreSpecs").val(strMoreSpecs);
        $("#deleteRelation_id").val(deleteRelationid);
    })
    //修改
    $("#updateProduct").click(function () {
        if (statusFlag == "2" || statusFlag == 2) {
            layer.msg("请上架后再进行修改！");
            return;
        }
        var length = $('input[name="subbox"]:checked').length;
        if (length == 1) {
            Deke.DeKe_dialog.show_Url2('修改产品', '/Product/_PartialAddProduct?buttonCode=btn_addprodcut_code', f1, ['850px', '580px']);
        }
        else if (length > 1) {
            layer.msg("不能同时修改多个产品~");
        }
        else {
            layer.msg("请先选中您要修改的产品~");
        }
    });

    //添加
    $(document).unbind("click", "#addProductBtn").on("click", "#addProductBtn", function () {
        Deke.DeKe_dialog.show_Url2('新增', '/Product/_PartialAddProduct?buttonCode=btn_addprodcut_code', f, ['850px', '580px']);
    });

    //右侧眼睛点击显示详情页面
    $('#eyeshown').click(function () {
        $(this).parent('span').toggleClass('open');
        $('#hyxqbtn').toggleToggle(400);
    });

    //批量添加
    $("#addProductBatch").click(function () {
        Deke.DeKe_dialog.show_Url2('批量添加', '/Html/AddProductBatch.html?v= ' + clearCache + 1, f2, ['85%', '600px'])
    });

    //筛选事件的弹出事件

    $('#shuaixuanbit').click(function () {

        $(this).toggleClass('open');
        // $('#filterBox').slideToggle(500);
        if ($("#quickFilterC").css("display") == "none") {
            $("#quickFilterC").show(250);
        }
        else {
            $("#quickFilterC").hide(250);
        }
    });

    GetProductList(null, "NotByName");

});

//获取列表
function GetProductList(pageIndex, type) {
    if (pageIndex == null)
        GetProductSimpleDesc();

    //去出产品列表第一行复选框的选中状态及样式
    $("#checkAll input").prop("checked", false);
    $("#checkAll").removeClass("checkedBox");
    //设置参数
    var categoryFlag = $("#quickFilterC").val();
    var erjicategoryFlag = $("#secondquickFilterC").val();
    var storageFlag = "0";
    var adddateFlag = "0";
    var nameFlag = $("#txtNameSearch").val().replace(/\ +/g, "");
    if (type == "NotByName") {
        if ($("#filterBox").css("display") == "block") {
            statusFlag = $('#selectedFilter').find("[data-name='status']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='status']").data("id");
            $('#productState').val(statusFlag);
            if (statusFlag == 2) {
                $('#unshelveProduct span').html('从列表上架');
            }
            else {
                $('#unshelveProduct span').html('从列表下架');
            }
            categoryFlag = $('#selectedFilter').find("[data-name='category']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='category']").data("id");;
            storageFlag = $('#selectedFilter').find("[data-name='storage']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='storage']").data("id");;
            if (storageFlag == "4") {
                storageFlag = $('#selectedFilter').find("[data-name='storage']").data("html");
            }
            adddateFlag = $('#selectedFilter').find("[data-name='adddate']").data("id") == null ? "0" : $('#selectedFilter').find("[data-name='adddate']").data("id");;
            if (adddateFlag == "4") {
                adddateFlag = $('#selectedFilter').find("[data-name='adddate']").data("html");
            }
            nameFlag = "";
        }
    }
    //查询
    $.get('/AjaxProduct/GetProductList', {
        status: statusFlag,
        category: categoryFlag,
        storage: storageFlag,
        adddate: adddateFlag,
        name: nameFlag,
        pageIndex: pageIndex || 1,
        pageSize: 5,  //每页记录数
        erjicategory: erjicategoryFlag
    },

    function (res) { //从第1页开始请求。返回的json格式可以任意定义
        var data = res.list;
        var html = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var sv_p_storage = data[i].sv_pricing_method == 1 ? data[i].sv_p_total_weight : data[i].sv_p_storage;
                var sv_mnemonic_code = data[i].sv_mnemonic_code != null ? data[i].sv_mnemonic_code : '';
                html += '<tr class="selectChk">';
                html += '<td><div class="check-box"><i><input type="checkbox" name="subbox" value="' + data[i].product_id + '"></i></div></td>';
                html += '<td>' + (parseInt(i) + 1) + '</td>';
                html += '<td onclick="loadProduct(' + data[i].product_id + ')"><span><img src="' + (data[i].sv_p_images2 != null ? (_g_res_images_url + data[i].sv_p_images2) : "") + '"  onerror="this.src=\'/images/002.png\';" alt="pic"></span><span class="text-ovtb">' + data[i].sv_p_name + '</span></td>';
                html += '<td><span>' + (data[i].sv_pc_name == null ? "" : data[i].sv_pc_name) + '</span></td>';
                if (_g_sv_uit_cache_name != 'cache_name_catering') {
                    html += '<td><span>' + (data[i].sv_psc_name == null ? "" : data[i].sv_psc_name) + '</span></td>';
                }

                html += '<td><span>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</span></td>';
                html += '<td><span>' + sv_mnemonic_code + '</span></td>';
                if (_g_sv_uit_cache_name != 'cache_name_catering') {
                    html += '<td class="proutime"><span>' + (data[i].sv_p_specs == null ? "" : data[i].sv_p_specs) + '</span></td>';
                }
                html += '<td class="proutime"><span>' + (data[i].sv_p_unit == null ? "" : data[i].sv_p_unit) + '</span></td>';
                html += '<td><span>' + data[i].sv_p_unitprice + '</span></td>';
                html += '<td class="priconone"><span>' + data[i].sv_p_unitprice + '</span></td>';
                //    html += '<td><span>' + data[i].sv_p_minunitprice + '</span></td>';
                //    html += '<td><span>' + data[i].sv_p_mindiscount + '</span></td>';

                html += '<td><span>' + sv_p_storage + '</span></td>';
                html += '<td class="proutime"><span>' + new Date(data[i].sv_p_adddate).Format('yyyy-MM-dd hh:mm:ss') + '</span></td>';
                html += '</tr>';
            }
        }
        //var baby = $('#product_tbodylist').find('tbody');
        //product_tbodylist
        $(".product_tbody").html(html);
        //分页
        laypage({
            cont: 'pageGro', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageGro"></div>
            pages: res.total, //通过后台拿到的总页数
            curr: pageIndex || 1, //初始化当前页
            skin: 'molv', //皮肤颜色
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                if (!first) {
                    GetProductList(e.curr, type);
                }
            }
        });
    });
}

function loadProduct(pid) {
    Deke.DeKe_dialog.show_Url2('详情', '/html/ProductInfo.html', abcdesf(pid), ['730px', '550px']);

}


function abcdesf(id) {
    setTimeout(function () {
        $("#kyName").keypress(function (e) {
            if (e.keyCode == 13) {
                GetOrderList($("#proid").val());
            }
        });
        $("#gysName").keypress(function (e) {
            if (e.keyCode == 13) {
                var id = $("#proid").val();
                GetGyslist(id);
            }
        });
        $.getAsyncJson('/AjaxProduct/GetProductCustomInfo', { productId: id }, function (result) {
            var customFieldHtml = '';
            if (result != null && result != '') {
                for (var i = 0; i < result.length; i++) {
                    var sv_field_value = result[i].sv_field_value != null && result[i].sv_field_value != '' ? result[i].sv_field_value : '';
                    if (result[i].sv_field_name.length >= 4) {
                        customFieldHtml += '<li><span>' + result[i].sv_field_name + '</span><span>' + sv_field_value + '</span></li>';
                    } else {

                        customFieldHtml += '<li><span>' + result[i].sv_field_name + strPlaceholder(4 - result[i].sv_field_name.length) + '</span><span>' + sv_field_value + '</span></li>';
                    }

                }
            }
            $('#productCustomInfoHtml').html(customFieldHtml);
        });

        $.ajax({
            url: '/AjaxProduct/GetProductDetail?id=' + id,
            type: 'get',
            dataType: "json",
            success: function (data) {
                var sv_p_storage = data["sv_pricing_method"] == 1 ? data["sv_p_total_weight"] : data["sv_p_storage"];
                $("#proid").val(data["product_id"]);
                $("#sv_p_barcode").text(data["sv_p_barcode"]);
                $("#sv_p_name").text(data["sv_p_name"]);
                $("#sv_p_unitprice").text(data["sv_p_unitprice"]);
                $("#sv_p_storage").text(sv_p_storage);
                $("#sv_p_originalprice").text(data["sv_p_originalprice"]);
                $("#sv_p_specs").text(data["sv_p_specs"] || '');
                $("#sv_pc_name").text(data["sv_pc_name"]);
                $("#sv_p_remark").text(data["sv_p_remark"]);
                $('#sv_mnemonic_code').text(data["sv_mnemonic_code"]);
                $('#sv_p_artno').text(data["sv_p_artno"]);

                var imagejson = $.parseJSON(data["sv_p_images"]);
                var sv_p_images2 = '/images/002.png';
                if (imagejson != null && imagejson != "" && imagejson.length > 0) {
                    if (imagejson[0].code.length > 0) {
                        if (imagejson[0].code.indexOf('/UPIMG/product/') >= 0) {
                            sv_p_images2 = _g_res_images_url + imagejson[0].code;
                        } else {
                            var _imagejson = imagejson[0].code;
                            if (_imagejson.length == 0) {
                                sv_p_images2 = '/images/002.png';
                            }
                            else {
                                sv_p_images2 = _g_res_images_url + _imagejson;
                            }
                        }
                    }
                }
                $('#sv_p_images').attr('src', sv_p_images2);
                $('.fff').click(function () {

                    $('#fileToUploadimage').click();
                })
                getProductTraceData(id);
            }
        });

        GetGyslist(id);

        GetOrderList(id);

    }, 200);
    // var id = document.getElementById("proid").value;
}

//ordername
$(document).on("click", "#ordername", function () {

    var id = $("#proid").val();
    GetOrderList(id);
});

function GetOrderList(id) {
    var name = $("#kyName").val();
    $.ajax({
        url: '/AjaxProduct/Getsv_productOrderList?id=' + id + '&name=' + name,
        type: 'get',
        dataType: "json",
        success: function (data) {
            var baby = $('#orderlist').find('tbody');
            var htmls = "";
            for (var i = 0; i < data.length; i++) {
                var uname = "";
                if (data[i].sv_mr_name == null) {
                    uname = "";
                }
                else {
                    uname = data[i].sv_mr_name
                }
                htmls += "<tr>";
                htmls += "<td>" + (i + 1) + "</td>";
                htmls += "<td>" + data[i].order_datetime + "</td>";
                htmls += "<td>" + uname + "</td>";
                htmls += "<td>" + data[i].sv_p_specs + "</td>";

                if (data[i].sv_pricing_method == 1)
                {
                    htmls += "<td>" + data[i].sv_p_weight + "</td>";
                } else
                {
                    htmls += "<td>" + data[i].product_num + "</td>";
                }
                htmls += "<td>" + data[i].product_price + "</td>";
                htmls += "</tr>";
            }

            baby.html(htmls);

        }
    });
}

$(document).on("click", "#gyslist", function () {
    var id = $("#proid").val();
    GetGyslist(id);
});

function GetGyslist(id) {

    var name = $("#gysName").val();
    $.ajax({
        url: '/AjaxProduct/Getv_procurement_prlist?id=' + id + '&name=' + name,
        type: 'get',
        dataType: "json",
        success: function (data) {
            var baby = $('#dataitemList').find('tbody');
            var htmls = "";
            for (var i = 0; i < data.length; i++) {
                var uname = "";
                if (data[i].sv_suname == null) {
                    uname = "";
                }
                else {
                    uname = data[i].sv_suname
                }
                htmls += "<tr>";
                htmls += "<td>" + i + 1 + "</td>";
                htmls += "<td>" + data[i].sv_pc_date + "</td>";
                htmls += "<td>" + uname + "</td>";
                htmls += "<td>" + data[i].sv_p_specs + "</td>";
                htmls += "<td>" + data[i].sv_pc_pnumber + "</td>";
                htmls += "<td>" + data[i].sv_pc_price + "</td>";
                htmls += "</tr>";
            }

            baby.html(htmls);

        }
    });
}
//点击某行即选中该行checkbox
$(document).on("click", ".selectChk", function () {
    if ($(this).children().find('div').find("input").prop("checked")) {
        $(this).children().find('div').find("input").prop("checked", false);
        $(this).children().find('div').removeClass('checkedBox');
        //取消全选
        $("#checkAll").find("input").prop("checked", false);
        $("#checkAll").removeClass('checkedBox');
        //debugger;
    }
    else {
        $(this).children().find('div').find("input").prop("checked", true);
        $(this).children().find('div').addClass('checkedBox');
        //如果checkbox全选中了，选中全选按钮
        if ($('input[name="subbox"]:checked').length == $('input[name="subbox"]').length) {
            $("#checkAll").find("input").prop("checked", true);
            $("#checkAll").addClass('checkedBox');
        }
    }
});

//全选复选框
$(document).on("click", "#checkAll", function () {
    //全选
    if ($("#checkAll input").prop("checked")) {
        $("#checkAll").find("input").prop("checked", false);
        $("#checkAll").removeClass('checkedBox');
        $('input[name="subbox"]').prop("checked", false);
        $('input[name="subbox"]').parent().parent().removeClass('checkedBox');
    }
    else {
        $("#checkAll").find("input").prop("checked", true);
        $("#checkAll").addClass('checkedBox');
        $('input[name="subbox"]').prop("checked", true);
        $('input[name="subbox"]').parent().parent().addClass('checkedBox');
    }
});

//获取库存低于10件的列表
function GetProductListLessThan10(pageIndex, p_storage) {
    //去出产品列表第一行复选框的选中状态及样式
    $("#checkAll input").prop("checked", false);
    $("#checkAll").removeClass("checkedBox");
    //查询
    $.getJSON('/AjaxProduct/GetProductListLessThan10', {
        pageIndex: pageIndex || 1,
        pageSize: 5,  //每页记录数
        p_storage: p_storage
    },
    function (res) { //从第1页开始请求。返回的json格式可以任意定义
        loggin.chklogn(res);
        var data = res.list;
        var html = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var sv_p_storage = data[i].sv_pricing_method == 1 ? data[i].sv_p_total_weight : data[i].sv_p_storage;
                html += '<tr class="selectChk">';
                html += '<td><div class="check-box"><i><input type="checkbox" name="subbox" value="' + data[i].product_id + '"></i></div></td>';
                html += '<td>' + (parseInt(i) + 1) + '</td>';
                html += '<td onclick="loadProduct(' + data[i].product_id + ')"><span><img src="' + ((data[i].sv_p_images2 == null || data[i].sv_p_images2 == '') ? '' : (_g_res_images_url + data[i].sv_p_images2)) + '"  onerror="this.src=\'/images/002.png\';" ></span><span class="text-ovtb">' + data[i].sv_p_name + '</span></td>';
                html += '<td><span>' + (data[i].sv_pc_name == null ? "" : data[i].sv_pc_name) + '</span></td>';
                html += '<td><span>' + (data[i].sv_psc_name == null ? "" : data[i].sv_psc_name) + '</span></td>';
                html += '<td class="proutime"><span>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</span></td>';

                html += '<td><span>' + (data[i].sv_mnemonic_code != null ? data[i].sv_mnemonic_code : '') + '</span></td>';

                html += '<td><span>' + (data[i].sv_p_specs == null ? "" : data[i].sv_p_specs) + '</span></td>';

                html += '<td><span>' + (data[i].sv_p_unit == null ? "" : data[i].sv_p_unit) + '</span></td>';
                html += '<td><span>' + data[i].sv_p_unitprice + '</span></td>';
                html += '<td class="priconone"><span>' + data[i].sv_p_unitprice + '</span></td>';

                html += '<td><span>' + sv_p_storage + '</span></td>';
                html += '<td class="proutime"><span>' + new Date(data[i].sv_p_adddate).Format('yyyy-MM-dd hh:mm:ss') + '</span></td>';
                html += '</tr>';
            }
        }
        $(".product_tbody").html(html);
        //分页
        laypage({
            cont: 'pageGro', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageGro"></div>
            pages: res.total, //通过后台拿到的总页数
            curr: pageIndex || 1, //初始化当前页
            skin: 'molv', //皮肤颜色
            first: '首页', //若不显示，设置false即可
            last: '尾页', //若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function (e, first) {
                if (!first) {
                    GetProductListLessThan10(e.curr, product_lowerThanTotal);
                }
            }
        });
    });
}

//获取简单描述
function GetProductSimpleDesc() {
    $.get('/AjaxProduct/GetProductSimpleDesc', function (data) {
        loggin.chklogn(data);
        if (data != null) {
            $(".lasticon").html("");
            for (var key in data) {

                if (key == "prlist") {

                    for (var b = 0; b < data[key].length; b++) {
                        $(".lasticon").append("<p><span>" + (b + 1) + "、</span><i>" + data[key][b].product_name + "(" + data[key][b].product_num + ")</i></p>");

                    }

                } else {
                    $("#" + key).html(data[key]);
                    $("." + key).html(data[key]);
                }
            }
        }
    });
}

//打开弹出层时
function f() {
    //获取明细内容tr&&列tr
    if (tbodyhtmltr == "" && detailtheadtr == "") {
        tbodyhtmltr = $("#productdetailtbody").html();
        detailtheadtr = $("#productdetailthead").html()
    }
    $(".productdetailtbodytr").remove();
    $(".productdetailtheadtr").remove();
    $(".More_Specs").show();
    $("#productMoreSpecs").hide();
    GetDiscount();
    //一级分类
    $.ajax({
        url: '/ProductCategory/GetFirstCategory',
        method: 'get',
        contentType: 'text/html',
        async: false,
        success: function (data) {
            loggin.chklogn(data);
            if (data.length > 0) {
                for (var i in data) {
                    $(".firstCategory").append('<option value="' + data[i].productcategory_id + '" data-type="' + data[i].producttype_id + '">' + data[i].sv_pc_name + '</option>');
                }
            }
        }
    });
    //二级分类
    $.ajax({
        url: '/AjaxProduct/GetCategoryById?cid=' + $(".firstCategory").val() + '&pange=1&count=1000',
        method: 'get',
        contentType: 'text/html',
        async: false,
        success: function (data) {
            loggin.chklogn(data);
            $(".secondCategory").empty();
            for (var i in data) {
                $(".secondCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
            }
        }
    });
    //一级类别变动时
    $(".firstCategory").change(function () {
        //类别联动
        $(".secondCategory").empty();
        $.ajax({
            url: '/AjaxProduct/GetCategoryById?cid=' + $(".firstCategory").val() + '&pange=1&count=1000',
            method: 'get',
            contentType: 'text/html',
            async: false,
            success: function (data) {
                loggin.chklogn(data);
                $(".secondCategory").append('<option value="0">二级类别</option>');
                for (var i in data) {
                    $(".secondCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                }
            }
        });
        showProductParam('insert');
        GetDiscount();

        //查询条码
        $("#sv_p_barcode").on("change", function (key) {
            var first = $("#sv_p_barcode").val();
            if (first == $("#sv_p_barcode").val() && $("#productCode").val() != $("#sv_p_barcode").val()) {
                //GetProductBarcode();
            }
        });
    });
    $('#btnCancel').click(function () {
        $('.addCustomFieldHtml ').css('display', 'none');
        $('.add-input ').html('');
    });

    $('#showCommonItems').css('display', 'block');
    $('#showInput').css('display', 'block');
    $('#btnaddInput').click(function () {
        var taotal = 10;
        $.getJson('/AjaxProduct/GetCustomFieldTotal', null, function (result) {
            taotal = taotal - result;
        });
        var inputHtml = '<input type="text" value="" name="custom" placeholder="字段名称" /></div>';
        var countlength = parseInt($(".add-input input").length);
        if (countlength < taotal) {
            $('.add-input').append(inputHtml);
        }
        else {
            layer.msg("自定义字段最多只能添加10个！");
        }
    });
    $('#showInput').click(function () {
        $('.addCustomFieldHtml').attr("style", "display:block;");//显示div
    });

    //是否特价商品
    $(".sv_special").on("click", function () {
        $(this).toggleClass("on");
    });

    // 添加自定义字段
    $('#btnAddCustom').click(function () {
        var memberCustom = $("#customFieldHtml input");
        var custom = $("input[name=custom]");
        var customList = '';
        var customFieldHtml = '';
        var list = new Array();
        var isTextNull = false;
        $.each(custom, function (i, n) {
            if (!isNullOrEmpty(n.value)) {
                isTextNull = false;
            }
            else if (n.value.length > 10) {
                isTextNull = false;
            }
            else {
                isTextNull = true;
            }
            var model = {
                sv_field_name: n.value
            };
            list.push(model);
        });
        if (isTextNull == true) {
            $('#customFieldHtml').append(customFieldHtml);
            $("input[name=custom]").val('');
            $.ajax({
                url: '/AjaxProduct/AddProductCustomField',
                data: JSON.stringify(list),
                type: "POST",
                contentType: "application/json",
                success: function (result) {
                    if (result != false) {
                        for (var i = 0; i < result.length; i++) {
                            customFieldHtml += ' <li style="width:50%; float:left">';
                            if (result[i].sv_field_name.length >= 4)
                            { customFieldHtml += '<span>' + result[i].sv_field_name + '：&nbsp;</span>'; }
                            else {
                                customFieldHtml += '<span>' + result[i].sv_field_name + strPlaceholder(4 - result[i].sv_field_name.length) + '：&nbsp;</span>';
                            }
                            customFieldHtml += '<input type="text" id="sv_mr_remark" data-id="' + result[i].sv_field_id + '" name="memberCustom" maxlength="100" placeholder="' + result[i].sv_field_name + '" style="height:35px" />';
                            customFieldHtml += ' </li>';
                        }
                    }
                    else if (result == -1) {
                        layer.msg("自定义字段最多只能添加十个！");
                    }
                    else {
                        layer.msg("添加失败！");
                    }
                    $('.addCustomFieldHtml').css('display', 'none');
                    $('#customFieldHtml').append(customFieldHtml);
                }
            });
        }
        else {
            layer.msg("自定义字段名称不能为空并且字段名称小于10个字符！");
        }
    });

    // 设置常用项
    $('#showCommonItems').click(function () {
        Deke.DeKe_dialog.show_Url2('设置常用项', '/Html/Member/memberCustom.html?v=' + clearCache + 100, commonItems, ['470px', '450px']);
    });

    if ($('#product_id').val() != null && product_id != undefined && product_id != '') {
        $('#saveProductContinueOperation').show();
    }

    expirationdate();
    getCateringKitchenPrinterList(); // 读取厨房打印方案
    getProductCustomInfo(0);// 读取自定义信息
    addProductPackageFn();//商品套餐包装组合
}

function clearNoNumber_input(obj) {
    if (obj != null && obj != '' && obj != undefined && obj.value != null && obj.value != '' && obj.value != undefined) {
        // if ($("input[name=sv_pricing_method]:checked")) {
        if (!$(".sv_pricing_method").hasClass('on')) {
            obj.value = parseFloat(obj.value || 0)
            obj.value = obj.value.replace(/[^\-\d]/g, '');  //清除“数字
        } else {
            // obj.value = obj.value.replace(/[^\d\.]/g, '')
            obj.value = obj.value.replace(/[^\-\d\.]/g, "");  //清除“数字”和“.”以外的字符
            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
            //obj.value = parseFloat(obj.value||0);
        }
        // }
    }
}

// 常用项回调
function commonItems() {
    $(document).on('click', '.commonItems li', function () {
        if ($(this).children().children('span').length == 0) {
            $(this).children("a").append(("<span onclick='DeleteCustom(" + $(this).data('id') + ")' data-id='" + $(this).data('id') + "' class='icon-remove' style='float:right'></span>"));
        }
        $('.notCommonItems ul').append($(this));
        setTimeout(function () {
            $(this).remove();
        }, 200);
    });
    $(document).on('click', '.notCommonItems li', function () {
        $(this).children("a").children("span").remove();
        $('.commonItems ul').append($(this));
        setTimeout(function () {
            $(this).remove();
        }, 200);
    });

    $('#saveCommonItems').click(function () {
        var commonItems = $('#commonItemsHtml li');
        var ids = '';
        if (commonItems.length == 1) {
            ids = $('#commonItemsHtml li').data('id');
        }
        else if (commonItems.length > 1) {
            $('#commonItemsHtml li').each(function () {
                ids += $(this).data('id') + ',';
            });
            ids = ids.substring(0, ids.length - 1);
        }
        $.postAsyncJson('/AjaxProduct/SaveCommonItems', { ids: ids }, function (result) {
            if (result == true) {
                getProductCustomInfo(0);
                layer.msg("保存设置成功！");
                layer.close(index);
            }
            else if (result == -1) {
                layer.msg("您当前还未添加自定义字段！");
            }
            else {
                layer.msg("保存设置失败，请稍后重试！");
            }
        });
    });

    getCommonItems();

    $('#recoveryCommonItems').click(function () {
        getCommonItems();
    });
}

function getCommonItems() {
    setTimeout(function () {
        var commonItemsHtml = '';     // 显示项
        var notCommonItemsHtml = '';  // 隐藏项
        $.getAsyncJson('/AjaxProduct/GetProductCustomList', null, function (result) {
            if (result != null && result != '') {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].sv_enabled == true) { // 显示项
                        commonItemsHtml += ' <li class="active" id="' + result[i].sv_field_id + '"  data-id="' + result[i].sv_field_id + '"><a href="javascript:void(0);">' + result[i].sv_field_name + '</a></li>';
                    }
                    else { // 隐藏项
                        notCommonItemsHtml += '<li data-id="' + result[i].sv_field_id + '"><a href="javascript:void(0);">' + result[i].sv_field_name + '<span onclick="DeleteCustom("' + result[i].sv_field_id + '")"  data-id="' + result[i].sv_field_id + '" class="icon-remove" style="float:right"></span></a> </li>';
                    }
                }
            }
        });
        $('#commonItemsHtml').html(commonItemsHtml);
        $('#notCommonItemsHtml').html(notCommonItemsHtml);
    }, 100);
}

// 读取自定义字段信息（不带会员Id，则不会读取自定义字段的值）
function getProductCustomInfo(productId) {
    setTimeout(function () {
        $.getAsyncJson('/AjaxProduct/GetProductCustomInfo', { productId: productId }, function (result) {
            var customFieldHtml = '';
            if (result != null && result != '') {
                for (var i = 0; i < result.length; i++) {
                    var sv_field_value = result[i].sv_field_value != null && result[i].sv_field_value != '' ? result[i].sv_field_value : '';
                    customFieldHtml += ' <li style="width:50%; float:left">';

                    if (result[i].sv_field_name.length >= 4) {
                        customFieldHtml += '<span>' + result[i].sv_field_name + '：&nbsp;</span>';
                    }
                    else {
                        customFieldHtml += '<span>' + result[i].sv_field_name + strPlaceholder(4 - result[i].sv_field_name.length) + '：&nbsp;</span>';
                    }
                    customFieldHtml += '<input type="text" id="sv_mr_remark" value="' + sv_field_value + '" data-id="' + result[i].sv_field_id + '" data-relationid="' + result[i].sv_relation_id + '" name="memberCustom" maxlength="100" placeholder="' + result[i].sv_field_name + '" style="height:35px" />';
                    customFieldHtml += ' </li>';
                }
            }
            $('#customFieldHtml').html(customFieldHtml);
        });
    }, 100);
}


// 加载日期
function expirationdate() {
    //过期时间
    laydate.skin('molv');//主题皮肤

    laydate({
        elem: '#sv_p_expirationdate',
        format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true
    });
}
// 加载日期
function expirationdate1() {
    ////过期时间
    //laydate.skin('molv');//主题皮肤

    //laydate({
    //    elem: '.sv_p_expirationdate',
    //    format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
    //    festival: true
    //});
}
//显示产品类型或者服务类型界面
function showProductParam(type) {
    var firstCategory = $(".firstCategory option:selected").data("type");
    var firstCategoryValue = $(".firstCategory option:selected").val();
    var findCategory = $("#findCategory").val(); //
    if ($(".firstCategory option:selected").data("type") == 0) { // 一级普通分类改变时
        fieldIsHidOrShowByProductType(0);
    }
    else if ($(".firstCategory option:selected").data("type") == 1) { // 一级服务类改变时
        fieldIsHidOrShowByProductType(1);
    }
    else {
        $('#customFieldHtml').html('');
        $("#diffProductType").html("");
    }
    if (type == 'edit' || type == 'update') {
        if (productInfoJson != null && productInfoJson != '') {
            getProductInfoJson(productInfoJson, firstCategoryValue);
        }
    }
}

//获取折扣及单位
function GetDiscount() {
    $("#sv_p_discount").html('');
    $("#sv_p_unit").html('');
    $.ajax({
        url: '/Product/GetUserDiscount',
        method: 'get',
        contentType: 'text/html',
        async: false,
        success: function (data) {
            //loggin.chklogn(data);
            if (data && data.discount && data.discount.length > 0) {
                for (var i in data.discount) {
                    if (data_f1) {

                        if (data_f1 && data.discount[i] == data_f1.sv_p_discount) {
                            $("#sv_p_discount").append('<option value="' + data.discount[i] + '" selected>' + data.discount[i] + '</option>');
                        } else {
                            $("#sv_p_discount").append('<option value="' + data.discount[i] + '">' + data.discount[i] + '</option>');
                        }
                    }
                }
            }
            if (data && data.unit != null && data.unit.length > 0) {
                for (var i in data.unit) {
                    if (data_f1 && data.unit[i] == data_f1.sv_p_unit) {
                        $("#sv_p_unit").append('<option value="' + data.unit[i] + '" selected>' + data.unit[i] + '</option>');
                    } else {
                        $("#sv_p_unit").append('<option value="' + data.unit[i] + '">' + data.unit[i] + '</option>');
                    }
                }
            }
        }
    });
}

// 修改商品回调方法
function f1() {

    //一级分类
    $.ajax({
        url: '/ProductCategory/GetFirstCategory',
        method: 'get',
        contentType: 'text/html',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                for (var i in data) {
                    $(".firstCategory").append('<option value="' + data[i].productcategory_id + '" data-type="' + data[i].producttype_id + '">' + data[i].sv_pc_name + '</option>');
                }
            }
        }
    });
    //类别联动
    $(".firstCategory").change(function () {
        $(".secondCategory").empty();
        $.ajax({
            url: '/AjaxProduct/GetCategoryById?cid=' + $(".firstCategory").val() + '&pange=1&count=1000',
            method: 'get',
            contentType: 'text/html',
            async: false,
            success: function (data) {
                $(".secondCategory").append('<option value="0">二级类别</option>');
                for (var i in data) {
                    $(".secondCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                }
            }
        });
        showProductParam('update');
    });

    getCateringKitchenPrinterList(); // 读取厨房打印方案

    //初始化类别
    //setTimeout(function () {
    initDialogWhenUpdate();
    getProductCustomInfo($('input[name="subbox"]:checked').val());
    //}, 100);

    //根据类别显示展示页面
    showProductParam('update');
    //获取明细内容tr&&列tr
    if (tbodyhtmltr == "" && detailtheadtr == "") {
        tbodyhtmltr = $("#productdetailtbody").html();
        detailtheadtr = $("#productdetailthead").html()
    }
    $(".productdetailtbodytr").remove();
    $(".productdetailtheadtr").remove();
    $("#productMoreSpecs").show();
    //获取折扣及单位
    GetDiscount();
    //获取折扣及单位
    //用data_f1初始化所选产品内容
    if (data_f1 != null) {
        $("#sv_p_storage").attr("readonly", true);
        for (var key in data_f1) {
            if (key == "sv_p_adddate") {
                var t = new Date(data_f1[key]).Format("yyyy-MM-dd");
                if (t == "0001-01-01") {
                    t = "";
                }

                $("#" + key).val(t);


            } else if (key == "sv_p_expirationdate" && isNullOrWhiteSpace(data_f1[key])) {
                if (data_f1[key].slice(0, 4) == "0001" || data_f1[key].slice(0, 4) == "9999") {
                    $("#" + key).val("");
                } else {
                    $("#" + key).val(new Date(data_f1[key]).Format("yyyy-MM-dd"));
                }

            }
            else if (key == "productsubcategory_id") {
                //二级分类
                $.ajax({
                    url: '/AjaxProduct/GetCategoryById?cid=' + data_f1["productcategory_id"] + '&pange=1&count=1000',
                    method: 'get',
                    contentType: 'text/html',
                    async: false,
                    success: function (data) {
                        loggin.chklogn(data);
                        $(".secondCategory").empty();
                        $(".secondCategory").append('<option value="0">二级类别</option>');
                        for (var i in data) {
                            $(".secondCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                        }
                    }
                });
                $("#" + key).val(data_f1[key]);
            }
            else if (key == "sv_product_attr_data") {
            }
            else {

                if (key == "sv_p_images2") {

                    var sv_p_images = "";
                    if (data_f1[key] != null && data_f1[key] != '' && data_f1[key] != undefined && data_f1[key].indexOf('[{') >= 0 && data_f1[key].indexOf('}]') > 0) {
                        //子 格式"[{"code": "[]", "isdefault": true}]"
                        var childimage = $.parseJSON(data_f1[key]);
                        if (childimage != null && childimage[0].code != '[]' && childimage[0].code.indexOf('//') < 0) {
                            sv_p_images = childimage[0].code;
                        }
                    } else {
                        sv_p_images = data_f1[key];
                    }
                    $("#sv_p_images").val(sv_p_images);
                    if (sv_p_images) {
                        $("#upload").attr("src", _g_res_images_url + sv_p_images);
                    }

                } else {
                    if (key == "sv_p_memberprice" && data_f1[key] > 0) {
                        $("#" + key).val(data_f1[key]);
                        $("#sv_p_minunitprice,#sv_p_mindiscount").attr("readonly", "readonly");
                    }
                    else if (key == "sv_p_minunitprice" && data_f1[key] > 0) {
                        $("#" + key).val(data_f1[key]);
                        $("#sv_p_memberprice,#sv_p_mindiscount").attr("readonly", "readonly");
                    }
                    else if (key == "sv_p_mindiscount" && data_f1[key] > 0) {
                        $("#" + key).val(data_f1[key]);
                        $("#sv_p_memberprice,#sv_p_minunitprice").attr("readonly", "readonly");
                    }
                    else {
                        if (key == "productMoreSpecs" && data_f1["sv_is_morespecs"] && data_f1[key].length > 0) {
                            $("#product_MoreSpecs").val(data_f1["sv_p_specs"]);
                            var childhtml = "";
                            for (var i = 0; i < data_f1[key].length; i++) {
                                childhtml += '<div class="productMoreSpecs  on " data-relationid="' + data_f1[key][i].sv_relation_id + '" data-configid="' + data_f1[key][i].sv_productconfigid + '" data-detailid="' + data_f1[key][i].sv_attributedetail_id + '" data-detailname="' + data_f1[key][i].sv_productattributename + '"><a href="javascript:void(0);" ></a><span style="font-size:12px">' + data_f1[key][i].sv_productattributename + '</span> </div>';
                            }
                            $("#" + key).html(childhtml);
                        } else {
                            if (!data_f1["sv_is_morespecs"]) {
                                $(".More_Specs").show();
                                $("#productMoreSpecs,#MoreSpecs").hide();
                            }
                            $("#" + key).val(data_f1[key]);
                        }

                    }

                }
            }
        }
    }
    //过期时间
    expirationdate();
    expirationdate1();
}

//修改时初始化弹出框
function initDialogWhenUpdate() {
    debugger;
    var sv_p_storage = 0;
    var sv_pricing_method = 0; // 计重还是计件
    $.getJSON('/AjaxProduct/GetProductDetail?id=' + $('input[name="subbox"]:checked').val(), function () {
        if (data != null) {
            for (var key in data) {
                $('#sv_mnemonic_code').text(data["sv_mnemonic_code"]);
                $('#sv_p_artno').text(data["sv_p_artno"]);
                if (key == "sv_p_adddate") {
                    var t = new Date(data[key]).Format("yyyy-MM-dd");
                    if (t == "0001-01-01") {
                        t = "";
                    }
                    $("#" + key).val(t);
                }
                else if (key == "sv_p_expirationdate" && isNullOrWhiteSpace(data[key])) {
                    if (data[key].slice(0, 4) == "0001" || data[key].slice(0, 4) == "9999")
                    { $("#" + key).val("") }
                    else {
                        $("#" + key).val(new Date(data[key]).Format("yyyy-MM-dd"));
                    }
                }
                else if (key == "productsubcategory_id") {
                    //二级分类
                    $.ajax({
                        url: '/AjaxProduct/GetCategoryById?cid=' + data["productcategory_id"] + '&pange=1&count=1000',
                        method: 'get',
                        contentType: 'text/html',
                        async: false,
                        success: function (data) {
                            $(".secondCategory").empty();
                            $(".secondCategory").append('<option value="0">二级类别</option>');
                            for (var i in data) {
                                $(".secondCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                            }
                        }
                    });
                    $("#" + key).val(data[key]);
                }
                else if (key == "sv_pricing_method") {
                    if (data["sv_pricing_method"] == 1) {
                        sv_p_storage = data["sv_p_total_weight"];
                        sv_pricing_method = data["sv_pricing_method"];
                    }
                }
                else {

                    if (key == "productMoreSpecs" && data["sv_is_morespecs"] && data[key].length > 0) {
                        $("#product_MoreSpecs").val(data["sv_p_specs"]);
                        var childhtml = "";
                        for (var i = 0; i < data[key].length; i++) {
                            childhtml += '<div class="productMoreSpecs  on" data-relationid="' + data[key][i].sv_relation_id + '" data-configid="' + data[key][i].sv_productconfigid + '" data-detailid="' + data[key][i].sv_attributedetail_id + '" data-detailname="' + data[key][i].sv_productattributename + '"><a href="javascript:void(0);" ></a><span>' + data[key][i].sv_productattributename + '</span> </div>';
                        }
                        $("#" + key).html(childhtml);
                    } else {
                        if (!data["sv_is_morespecs"]) {
                            $(".More_Specs").show();
                            $("#productMoreSpecs,#MoreSpecs").hide();
                        }
                        $("#" + key).val(data[key]);
                    }

                }
            }
            data_f1 = data;
            getProductTraceData($('input[name="subbox"]:checked').val());
        }
    });


    setTimeout(function () {
        $('#sv_p_storage').attr('disabled', 'disabled');
        if (sv_pricing_method == 1) {
            $("#sv_p_storage").val(sv_p_storage);
            // $(".sv_pricing_method_1").hide();
            //$("input[name=sv_pricing_method]").attr("checked", '1');
            $(".sv_pricing_method").toggleClass('on');
            $('#sv_p_storage').attr("placeholder", "请输入重量");
            $('#span_storage').html("库存重量：");
        }
        else {
            //  $(".sv_pricing_method_2").hide();
        }
    }, 200);
}


// 详情json
function getProductInfoJson(data, value) {
    for (var key in data) {
        $('#sv_mnemonic_code').text(data["sv_mnemonic_code"]);
        $('#sv_p_artno').text(data["sv_p_artno"]);
        if (key == "sv_p_adddate") {
            var t = new Date(data[key]).Format("yyyy-MM-dd");
            if (t == "0001-01-01") {
                t = "";
            }
            $("#" + key).val(t);
        }
        else if (key == "sv_p_expirationdate" && isNullOrWhiteSpace(data[key])) {
            if (data[key].slice(0, 4) == "0001" || data[key].slice(0, 4) == "9999")
            { $("#" + key).val("") }
            else {
                $("#" + key).val(new Date(data[key]).Format("yyyy-MM-dd"));
            }
        }
        else if (key == "productsubcategory_id") {
            var productcategory_id = isNullOrEmpty(value) ? value : data["productcategory_id"];
            //二级分类
            $.ajax({
                url: '/AjaxProduct/GetCategoryById?cid=' + productcategory_id + '&pange=1&count=1000',
                method: 'get',
                contentType: 'text/html',
                async: false,
                success: function (data) {
                    $(".secondCategory").empty();
                    $(".secondCategory").append('<option value="0">二级类别</option>');
                    for (var i in data) {
                        $(".secondCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                    }
                }
            });
            $("#" + key).val(data[key]);
        }
        else if (key == 'sv_p_images2') {
            var images = data[key] != null && data[key] != '' ? data[key] : null;
            if (images != null) {
                $('#upload').attr('src', _g_res_images_url + images);
                $("#sv_p_images").val(images);
            }
        }
        else if (key == 'sv_product_attr_data') {
        }
        else {
            $("#" + key).val(data[key]);
        }
        if (key == 'productcategory_id' && value != null && value != '') {
            $("#productcategory_id").val(value);
        }
        $("#sv_p_unit").val(data["sv_p_unit"]);
    }
    data_f1 = data;
}

function getProductTraceData(pid) {
    if (g_TraceabilityCode) {//是否启用追溯码
        $.ajax({
            type: "get",
            url: "/Ajaxproduct/GetTraceabilityCode?id=" + pid,
            cache: false,
            async: false,
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $('#sv_product_attr_data_li').show();
                    $('#sv_product_attr_data').val(data);
                }
            }
        });
    } else {
        $('#sv_product_attr_data_li').hide();
    }

}
function initDialogWhenUpdate() {
    debugger;
    $.ajax({
        url: '/AjaxProduct/GetProductDetail?id=' + $('input[name="subbox"]:checked').val(),
        type: 'get',
        async: false,
        success: function (data) {
            if (data != null) {
                fieldIsHidOrShowByProductType(data.producttype_id);
                productInfoJson = data;
                getProductInfoJson(data, '');
                getProductTraceData($('input[name="subbox"]:checked').val());
            }
        }
    });
    $('#findCategory').val($(".firstCategory option:selected").data("type"));


}

var BatchHtml = "";
BatchHtml += '<tr class="batchTr">';
BatchHtml += '<td>{batch_i}</td>';
BatchHtml += '<td><select class="batchCategory"></select></td>';
BatchHtml += '<td><select class="batchSubCategory"></select></td>';
BatchHtml += '<td><input type="text" name="batchBarcode" class="batchBarcode" placeholder="编码为必填项"></td>';
BatchHtml += '<td><input class="win140" type="text" name="batchName" placeholder="名称为必填项"></td>';
BatchHtml += '<td><input type="text" name="batchUnitPrice" onkeyup="clearNoNum(this);"></td>';
BatchHtml += '<td><input type="text" name="batchOriginalPrice" onkeyup="clearNoNum(this);"></td>';
BatchHtml += '<td><select class="batchUnit"><option value="无单位">无单位</option></select></td>';
BatchHtml += '<td><input type="text" name="batchMinUnitPrice" onkeyup="clearNoNum(this);"></td>';
BatchHtml += '<td><input type="text" name="batchMinDiscount" onkeyup="clearNoNum(this);"></td>';
//html += '<td><input type="text" name="batchPoint"></td>';
BatchHtml += '</tr>';
function GetBatchHtml() {
    batch_i = 0;
    $("#addbatch_tbody").html("");
    for (batch_i; batch_i < 6; batch_i++) {
        $("#addbatch_tbody").append(BatchHtml.replace("{batch_i}", batch_i));
    }

}

function f2() {
    //批量添加时初始化显示行数  
    GetBatchHtml();
    //新增行
    $("#addRow").click(function () {
        $("#addbatch_tbody").append(BatchHtml.replace("{batch_i}", batch_i));
        initBatch();
        batch_i++;
    });

    initBatch();
    function initBatch() {
        //一级分类
        $.ajax({
            url: '/ProductCategory/GetFirstCategory',
            method: 'get',
            contentType: 'text/html',
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    for (var i in data) {
                        $(".batchCategory").append('<option value="' + data[i].productcategory_id + '">' + data[i].sv_pc_name + '</option>');
                    }
                }
            }
        });
        //二级分类
        $.ajax({
            url: '/AjaxProduct/GetCategoryById?cid=' + $(".batchCategory").val() + '&pange=1&count=1000',
            method: 'get',
            contentType: 'text/html',
            async: false,
            success: function (data) {
                loggin.chklogn(data);
                for (var i in data) {
                    $(".batchSubCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                }
            }
        });
        //类别联动
        $(".batchCategory").change(function () {
            var subcategory = $(this).parent().siblings().find(".batchSubCategory");
            subcategory.empty();
            $.ajax({
                url: '/AjaxProduct/GetCategoryById?cid=' + $(this).val() + '&pange=1&count=1000',
                method: 'get',
                contentType: 'text/html',
                async: false,
                success: function (data) {
                    loggin.chklogn(data);
                    for (var i in data) {
                        subcategory.append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                    }
                }
            });
        });
        //会员折扣及单位
        $.get("/Product/GetUserDiscount", function (data) {

            if (data.discount != null && data.discount.length > 0) {
                for (var i in data.discount) {
                    $(".batchDiscount").append('<option value="' + data.discount[i] + '">' + data.discount[i] + '</option>');
                }
            }
            if (data.unit != null && data.unit.length > 0) {
                for (var i in data.unit) {
                    $(".batchUnit").append('<option value="' + data.unit[i] + '">' + data.unit[i] + '</option>');
                }
            }
        });
    }

    //关闭批量添加弹出框
    $(document).on("click", "#cancelBatch", function () {
        layer.closeAll("page");
    });

    //保存批量添加
    $(document).on("click", "#saveBatch", function () {
        var list = initBatchParam();
        if (list.length != 0) {
            $.ajax({
                url: '/AjaxProduct/AddProductBatch',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(list),
                async: false,
                success: function (d) {
                    loggin.chklogn(d);
                    if (d.succeed == true) {
                        GetProductList(null, "NotByName");

                        layer.msg("批量添加成功");
                        GetBatchHtml();
                        initBatch();
                    }
                    else if (d == -2) {
                        layer.msg("你没有该操作权限！");
                    }
                    else {
                        if (d.values == "diffcode") {
                            layer.msg("输入的编码存在重复项");
                        }
                        else {
                            layer.msg("批量添加失败");
                        }
                    }
                }
            });
        }
    });

    function initBatchParam() {
        var list = new Array();
        $("#addbatch_tbody .batchTr").each(function () {
            //设置参数
            var productcategory_id = parseInt($(this).find(".batchCategory").val());
            var productsubcategory_id = $(this).find(".batchSubCategory").val() || 0;
            var sv_p_barcode = $(this).find("input[name='batchBarcode']").val();
            var sv_p_name = $(this).find("input[name='batchName']").val();
            var sv_p_unitprice = $(this).find("input[name='batchUnitPrice']").val();

            sv_p_unitprice = parseFloat(sv_p_unitprice);

            var sv_p_originalprice = $(this).find("input[name='batchOriginalPrice']").val();

            sv_p_originalprice = parseFloat(sv_p_originalprice);

            var sv_p_unit = $(this).find(".batchUnit").val();
            var sv_p_minunitprice = $(this).find("input[name='batchMinUnitPrice']").val();


            sv_p_minunitprice = parseFloat(sv_p_minunitprice);


            var sv_p_mindiscount = $(this).find("input[name='batchMinDiscount']").val();
            sv_p_mindiscount = parseFloat(sv_p_mindiscount);

            var model = {
                productcategory_id: productcategory_id, productsubcategory_id: productsubcategory_id, sv_p_barcode: sv_p_barcode, sv_p_name: sv_p_name,
                sv_p_unitprice: sv_p_unitprice, sv_p_originalprice: sv_p_originalprice,
                sv_p_unit: sv_p_unit, sv_p_minunitprice: sv_p_minunitprice, sv_p_mindiscount: sv_p_mindiscount
            };

            if (sv_p_barcode.length != 0 && sv_p_name.length != 0) {
                list.push(model);
            }
        });
        return list;
    }

    //验证编码是否重复
    $(document).on("blur", ".batchBarcode", function () {
        var a = $(this);
        $.ajax({
            url: '/AjaxProduct/IsBarcodeExist?barcode=' + ClearBr(a.val().trim()),
            type: 'post',
            contentType: 'application/json',
            success: function (d) {
                loggin.chklogn(d);
                if (d.succeed) {
                    a.val(d.values);
                    layer.msg("编号重复，系统自动为您生成了一个有效编码");
                }
            }
        });
    });
}

function clearNoNum(obj) {

    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数

}
//回调
function productlist1(data) {
    productlist(data)
};
//导入加载数据
function productlist() {
    var data = _g_ImportExecl_productlist_data;
    var html = "";
    if (data != undefined) {
        for (var i = 0; i < data.length; i++) {
            html += '<tr data-sv_p_barcode="' + data[i].sv_p_barcode + '" data-sv_p_name="' + data[i].sv_p_name + '" data-sv_p_unitprice="' + data[i].sv_p_unitprice + '" ';
            html += 'data-sv_p_originalprice="' + data[i].sv_p_originalprice + '" data-sv_p_storage="' + data[i].sv_p_storage + '" data-sv_p_specs="' + data[i].sv_p_specs + '" ';
            html += 'data-sv_p_adddate="' + data[i].sv_p_adddate + '" data-sv_p_remark="' + data[i].sv_p_remark + '" data-productsubcategory_id="' + data[i].productsubcategory_id + '" ';
            html += 'data-sv_p_unit ="' + data[i].sv_p_unit + '" data-sv_p_status ="' + data[i].sv_p_status + '" data-sv_p_expirationdate="' + data[i].sv_p_expirationdate + '" data-sv_p_memberprice="' + data[i].sv_p_memberprice + '" ';
            html += 'data-sv_p_minunitprice="' + data[i].sv_p_minunitprice + '" data-sv_p_mindiscount="' + data[i].sv_p_mindiscount + '" data-sv_pricing_method="' + data[i].sv_pricing_method + '" data-sv_p_total_weight="' + data[i].sv_p_total_weight + '" ';
            html += 'data-sv_pc_name="' + data[i].sv_pc_name + '">';
            html += '    <td>' + data[i].sv_pc_name + '</td>';
            html += '    <td>' + data[i].sv_psc_name + '</td>';
            html += '    <td>' + data[i].sv_p_barcode + '</td>';
            html += '    <td>' + data[i].sv_p_name + '</td>';
            html += '    <td>' + data[i].sv_mnemonic_code + '</td>';
            html += '    <td>' + data[i].sv_p_artno + '</td>';
            html += '    <td>' + data[i].sv_p_unitprice + '</td>';
            html += '    <td>' + data[i].sv_p_originalprice + '</td>';
            html += '    <td>' + data[i].sv_p_unit + '</td>';
            if (data[i].sv_pricing_method == 1) {
                html += '    <td>' + data[i].sv_p_total_weight + '</td>';
            } else {
                html += '    <td>' + data[i].sv_p_storage + '</td>';
            }
            html += '    <td>' + data[i].sv_p_specs + '</td>';
            if (isNullOrWhiteSpace(data[i].sv_p_expirationdate)) {
                if (data[i].sv_p_expirationdate.slice(0, 4) == "0001" || data[i].sv_p_expirationdate.slice(0, 4) == "9999") {
                    html += '    <td></td>';
                } else {

                    html += '    <td>' + new Date(data[i].sv_p_expirationdate).Format("yyyy-MM-dd") + '</td>';
                }
            } else {
                html += '    <td></td>';
            }
            html += '    <td>' + data[i].sv_p_memberprice + '</td>';
            html += '    <td>' + data[i].sv_p_minunitprice + '</td>';
            html += '    <td>' + data[i].sv_p_mindiscount + '</td>';
            html += '    <td>' + data[i].sv_p_remark + '</td>';
            html += '   </tr>';
        }
        $("#productlisthtml").html(html);
    }
};

//保存
function saveproductlist() {
    var loadingIndex = commonOpenLoading();
    $.getJSON("/Product/SaveProduct/", { strPath: strPath }, function (data) {
        commonCloseLoading(loadingIndex);
        if (data.success) {
            if (isNullOrWhiteSpace(data.message)) {
                if (isNullOrWhiteSpace(data.url)) {
                    layer.msg("保存成功！但是存在错误数据,点击下方连接查看");
                    $("#errordata").show();
                    $("#errordata").val(data.url);
                    $("#errordata").attr("href", data.url);
                } else {
                    layer.msg("保存失败！请联系负责人");
                }
            } else {
                layer.msg("保存成功", {
                    icon: 1, //图标
                    time: 3000   //2秒关闭(如果不配置,默认是3秒)
                }, function () {
                    layer.closeAll();
                });
                layer.close(index);
                GetProductList(null, "");
            }
        } else {
            if (isNullOrWhiteSpace(data.message)) {
                if (isNullOrWhiteSpace(data.url)) {
                    layer.msg("保存失败！详情请点击下方连接查看");
                    $("#errordata").show();
                    $("#errordata").val(data.url);
                    $("#errordata").attr("href", data.url)
                } else {
                    layer.msg("保存失败！请联系负责人");
                }
            } else {
                layer.msg("保存失败！" + data.message);
            }
        }
    })
};

//关闭
function shutDown() {
    layer.closeAll("page");
};

function errordataDownload() {
    Cef.Download($("#errordata").val())
}
function ProductTemplete(url) {
    location.href = url;
    Cef.Download(url);
}



//标签移动事件展示事件
$('.bq_pfus').hover(function () {
    $(this).addClass('bq_pfus-hover');
}, function () {
    $(this).removeClass('bq_pfus-hover');
});
//删除当前标签事件
$('.del-tags').click(function () {
    $(this).parent('.bq_pssos').remove();
});

//右侧眼睛点击显示详情页面
$('#eyeshown').click(function () {

    $(this).parent('a').toggleClass('open');
    $('#hyxqbtn').slideToggle(400);

});

//筛选事件的弹出事件	
$('#shuaixuanbit').click(function () {
    $('.shuaixuanbox').slideToggle(500);
});



//会员充值-支付选择

$('.lisbk a').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});

//会员选择
$('.stecs i').click(function () {
    $(this).parent().toggleClass('on').siblings().removeClass('on');
});

//分类左侧分类展开收缩事件

$('.posic').parents('a').click(function () {
    $(this).parent().toggleClass('active').siblings().removeClass('active');
    if ($('.posic').parents('li').hasClass('active')) {
        $(this).siblings('ul').slideDown(250);
        $(this).parents('li').siblings().children('ul').slideUp(250);;
    } else {
        $('.posic').parents('a').siblings('ul').slideUp(250);
    }
});


$(document).on("mouseover", "#xqtabbox li", function () {

    $(this).addClass('active').siblings().removeClass('active');
    var index = $('#xqtabbox li').index(this);
    $('.reclxqtab>div').eq(index).fadeIn(50).siblings().fadeOut(0);
});

//一级类别变动时
$("#quickFilterC").change(function () {
    //类别联动
    $("#secondquickFilterC").empty();
    $.ajax({
        url: '/AjaxProduct/GetCategoryById?cid=' + $("#quickFilterC").val() + '&pange=1&count=50',
        method: 'get',
        contentType: 'text/html',
        async: false,
        success: function (data) {
            loggin.chklogn(data);
            $("#secondquickFilterC").append('<option value="0">二级类别</option>');
            for (var i in data) {
                $("#secondquickFilterC").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
            }
        }
    });
});

function pricechange(id, _id, thisid, strthis) {
    var price = $(strthis).val();
    price = price == "" ? 0 : price;
    var prevAlllength = $(strthis).parents(".productdetailtbodytr").prevAll().length;
    if (price > 0) {
        if (thisid == "sv_p_mindiscount" && (price > 10 || price < 0)) {
            layer.msg("折扣最大不能过10,最小不能小于0");
            if (prevAlllength >= 1) {
                $("input", $(strthis).parent().siblings()).each(function () {
                    if (($(this).attr("class") == id || $(this).attr("class") == _id)) {
                        $(this).removeAttr("readonly", "readonly");
                        $(this).val("");
                    }
                    $(strthis).val("");
                })
            } else {
                $("#" + id + ",#" + _id + ",." + id + ",." + _id).removeAttr("readonly", "readonly");
                $("#" + id + ",#" + _id + ",." + id + ",." + _id + ",#" + thisid + ",." + thisid).val("");
            }
        } else if (prevAlllength <= 0) {
            $("#" + id + ",#" + _id + ",." + id + ",." + _id).val(0);
            $("#" + id + ",#" + _id + ",." + id + ",." + _id).attr("readonly", "readonly");
        } else {
            if (prevAlllength >= 1) {
                $("input", $(strthis).parent().siblings()).each(function () {
                    if (($(this).attr("class") == id || $(this).attr("class") == _id)) {
                        $(this).attr("readonly", "readonly");
                        $(this).val(0);
                    }
                })
            }
        }
    } else if (prevAlllength <= 0) {
        $("#" + id + ",#" + _id + ",." + id + ",." + _id).removeAttr("readonly", "readonly");
        $("#" + id + ",#" + _id + ",." + id + ",." + _id).val("");
    } else {
        if (prevAlllength >= 1) {
            $("input", $(strthis).parent().siblings()).each(function () {
                if (($(this).attr("class") == id || $(this).attr("class") == _id)) {
                    $(this).removeAttr("readonly", "readonly");
                    $(this).val("");
                }
                $(strthis).val("");
            })
        }
    }
}
function ClearBr(key) {
    //去除换行 
    key = key.replace(/<\/?.+?>/g, "");
    key = key.replace(/[\r\n]/g, "");
    //去除空格 
    key = key.replace(/\s+/g, " ")
    //单引换双引
    // key = key.replace(/'/ig, "''")
    return key;
}
//查询产品配置信息
function getproductconfiginfo() {

    var is_open_configtr = false;
    var html = '<div class="ygmitopt">';
    html += '<div  class="printrigth" style="background: #f6f6f6">';
    html += '<ul class="printui" >';
    html += '<li style="margin-bottom:0px">';
    html += '<span class="milefts" style="margin-left:-8px">自定义规格:</span>';
    html += '<div class="ritianshu" >';
    var childhtml = "";
    $.getJSON("/ProductCustomProperties/GetProductAttributeConfiglist", { isSearchEnabled: true }, function (data) {
        if (data != null && data.length >= 1) {
            is_open_configtr = true;
        }
        for (var i = 0; i < data.length; i++) {
            html += '<div class="stecs productconfig " data-configname="' + data[i].sv_configname + '" data-configid="' + data[i].sv_productconfigid + '"><a  href="#" ></a><span>' + data[i].sv_configname + '</span> </div>';
            ///配置
            if (data[i].childList != null) {
                var childList = data[i].childList;
                //配置明细
                childhtml += '<div class="detaildata"   data-configname="' + data[i].sv_configname + '" id="' + data[i].sv_productconfigid + '" data-configid="' + data[i].sv_productconfigid + '" style="display:none">'
                childhtml += '<span class="milefts">' + data[i].sv_configname + ':</span>';
                childhtml += '<div class="child"  >';
                for (var j = 0; j < childList.length; j++) {
                    childhtml += '<div class="childchoice " data-configid="' + data[i].sv_productconfigid + '" data-detailid="' + childList[j].sv_producdetailid + '" data-detailname="' + childList[j].sv_productattributename + '"><a href="javascript:void(0);" ></a><span>' + childList[j].sv_productattributename + '</span> </div>';
                }
                childhtml += '</div>';
                childhtml += '</div>';
            }
        }
        html += '</div>';
        html += '</li>';
        html += '</ul>';
        html += '<div id="childList"></div>';
        html += '</div>';
        html += '</div>';
        if (is_open_configtr) {
            $(".ygmiveiwl").html(html);
            $("#childList").html(childhtml);
        }
    });
}

///动态添加产品配置数据
function AddproductConfigdatalist() {

    var configArray = new Array()
    //选中配置的数量
    $("#childList .detaildata").each(function () {
        var detailArray = new Array();
        var configname = $(this).data("configname");
        if ($("#" + $(this).data("configid")).is(":visible")) {
            $("#" + $(this).data("configid") + " .childchoice").each(function () {
                if ($(this).hasClass('on')) {
                    detailArray.push({ "configname": configname, "configid": $(this).data("configid"), "detailname": $(this).data("detailname"), "detailid": $(this).data("detailid") });
                }
            })
            configArray.push(detailArray)
        }
    });
    AddCollist(configArray);
}
//添加行列值转换
function AddCollist(configArray) {
    var _detailArray = "";
    if (configArray.length > 3) {
        layer.msg("最多只能选择3种类型");
        return false;
    }
    if (configArray.length == 2) {
        for (var i = 0; i < configArray.length - 1 ; i++) {
            _detailArray = AddTd2(configArray[i], configArray[i + 1]);
        }
    }
    else if (configArray.length == 3) {
        for (var i = 0; i < configArray.length - 2 ; i++) {
            _detailArray = AddTd3(configArray[i], configArray[i + 1], configArray[i + 2]);
        }
    } else {
        for (var i = 0; i < configArray.length ; i++) {
            _detailArray = AddTd1(configArray[i]);
        }
    }
    AddCol();
    AddRowCollist(_detailArray);

}

//默认一种类型
function AddTd1(arr) {
    var detailArray = new Array();
    for (var i = 0; i < arr.length; i++) {
        var detaiinfolArray = new Array();
        detaiinfolArray.push({ "configid": arr[i].configid, "detailid": arr[i].detailid, "detailname": arr[i].detailname })
        detailArray.push(detaiinfolArray);
    }
    return detailArray;

}
//两种类型
function AddTd2(arr, arr2) {//1|红色,2|尺码
    var detailArray = new Array();
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            var detaiinfolArray = new Array();
            detaiinfolArray.push({ "configid": arr[i].configid, "detailid": arr[i].detailid, "detailname": arr[i].detailname })
            detaiinfolArray.push({ "configid": arr2[j].configid, "detailid": arr2[j].detailid, "detailname": arr2[j].detailname });
            detailArray.push(detaiinfolArray);
        }
    }
    return detailArray;

}
//三种类型
function AddTd3(arr, arr2, arr3) {
    var detailArray = new Array();
    for (var i = 0; i < arr.length; i++) {
        var first = arr[i];
        for (var j = 0; j < arr2.length; j++) {
            for (var g = 0; g < arr3.length; g++) {
                var detaiinfolArray = new Array();
                detaiinfolArray.push({ "configid": arr[i].configid, "detailid": arr[i].detailid, "detailname": arr[i].detailname })
                detaiinfolArray.push({ "configid": arr2[j].configid, "detailid": arr2[j].detailid, "detailname": arr2[j].detailname });
                detaiinfolArray.push({ "configid": arr3[g].configid, "detailid": arr3[g].detailid, "detailname": arr3[g].detailname });
                detailArray.push(detaiinfolArray);
            }
        }
    }
    return detailArray;

}
//添加表头列
function AddCol() {
    //循环分类
    var theadhtml = "";
    $(".productconfig").each(function () {
        $('.configid' + $(this).data("configid")).remove();//每次选中先移除
        if ($(this).hasClass('on')) {
            theadhtml += '<th class="configid' + $(this).data("configid") + '">' + $(this).data("configname") + '</th>';
        }
    });
    if (theadhtml != "") {
        $('#attrTable').show();
        $(".productdetailtheadtr").remove();//移除所有列重新添加
        $("#productdetailthead").append(detailtheadtr);//添加列
        $("#productdetailthead tr").prepend(theadhtml);//追加添加列头
    } else {
        $(".productdetailtheadtr").remove();//移除列
        $('#attrTable').hide();
    }
}
//添加明细行列
function AddRowCollist(_detailArray) {
    //循环行并且添加行列
    $(".productdetailtbodytr").remove();//移除所有行
    for (var g = 0; g < _detailArray.length; g++) {
        var tbodyhtml = "";
        for (var j = 0; j < _detailArray[g].length; j++) {
            tbodyhtml += '<td class="' + _detailArray[g][j].detailid + '" style="padding:5px;"><span class="attributedetail_id"  data-configid="' + _detailArray[g][j].configid + '" data-detailname="' + _detailArray[g][j].detailname + '"  data-detailid="' + _detailArray[g][j].detailid + '" >' + _detailArray[g][j].detailname + '</span></td>'
        }
        var tbodyhtml_newtr = $(tbodyhtmltr).attr("data-id", g).prepend(tbodyhtml);
        $("#productdetailtbody").append(tbodyhtml_newtr);//创建行
    }
    GetIsAssignment();

    //if ($(".firstCategory option:selected").data("type") == 0) {
    //    $('input[name=sv_pricing_method]:checked').click();
    //}
}
//移除配置明细
function removedetail(stthis) {

    stthis.parentElement.parentElement.remove()
    if ($(".productdetailtbodytr").length == 0) {
        $(".productdetailtheadtr").remove();//移除所有列重新添加
        $(".productconfig ").each(function () {
            if ($(this).hasClass('on')) {
                $(this).toggleClass('on');
                var configid = $(this).data("configid");
                $("#" + configid + " .childchoice ").each(function () {
                    if ($(this).hasClass('on')) {
                        $(this).toggleClass('on');
                    }
                });
                $("#" + configid).hide();

            }
        });
    }
}

//获取自定义明细
function GetCustomDetail() {
    var product_custom_detail_json = "";//拼接产品自定义明细json
    $(".productdetailtbodytr").each(function () {
        var sv_p_specs = "";
        var attributedetail_id = "";
        $("span", this).each(function () {
            attributedetail_id += $(this).data("detailid");
            attributedetail_id += ",";
            sv_p_specs += $(this).data("detailname") + ",";
        });
        var _product_custom_detail_json = "";
        $("input", this).each(function () {

            var strval = "";
            if ($(this).attr("class") != "sv_p_images") {
                strval = $(this).val() || $("#" + $(this).attr("class")).val() || 0;
            } else {
                strval = $(this).val() || $("#" + $(this).attr("class")).val();

            }
            strval = '"' + strval + '"';
            _product_custom_detail_json += '"' + $(this).attr("class") + '":' + strval;
            _product_custom_detail_json += ",";

        });
        attributedetail_id = attributedetail_id.replace(/\,$/, "");
        sv_p_specs = sv_p_specs.replace(/\,$/, "");
        var sv_pricing_method = $(".sv_pricing_method").hasClass('on') == true ? 1 : 0;//$('input[name=sv_pricing_method]:checked').val();
        var sv_p_expirationdate = $("#sv_p_expirationdate").val() == undefined ? "" : $("#sv_p_expirationdate").val();
        var sv_p_unit = $("#sv_p_unit").val() == undefined ? "" : $("#sv_p_unit").val()
        _product_custom_detail_json = _product_custom_detail_json.replace(/\,$/, "");

        _product_custom_detail_json += ',"productcategory_id":' + $("#productcategory_id").val() + ',"productsubcategory_id":' + $("#productsubcategory_id").val();
        _product_custom_detail_json += ',"sv_p_name":"' + $("#sv_p_name").val() + '","sv_p_unit":"' + sv_p_unit + '"';
        _product_custom_detail_json += ',"sv_p_remark":"' + $("#sv_p_remark").val() + '","sv_p_expirationdate":"' + sv_p_expirationdate + '"';
        _product_custom_detail_json += ',"sv_p_specs":"' + sv_p_specs + '", "sv_pricing_method":' + sv_pricing_method + ',"sv_p_commissiontype":' + ($("#sv_p_commissiontype").val() || 0);
        _product_custom_detail_json += ',"sv_p_commissionratio":"' + $("#sv_p_commissionratio").val()+'"' ;

        if ($("#sv_product_integral").val()!='')
            _product_custom_detail_json+= ',"sv_product_integral":' + ($("#sv_product_integral").val() || 0);


        product_custom_detail_json += '{"attributedetail_id":"' + attributedetail_id + '",' + _product_custom_detail_json + '}';
        product_custom_detail_json += ",";
    });
    product_custom_detail_json = '[' + product_custom_detail_json.replace(/\,$/, "") + ']';
    return JSON.parse(product_custom_detail_json);
}
//联动事件
function linkageevent(type, strthis, type1, type2) {
    var prevAlllength = $(strthis).parents(".productdetailtbodytr").prevAll().length;
    var nextAllldata = $(strthis).parents(".productdetailtbodytr").nextAll();
    if (type1 != undefined && type2 != undefined) {
        if ($(strthis).val() > 0 && prevAlllength <= 0) {
            $("." + type1 + ", ." + type2).attr("readonly", "readonly");
            $("." + type1 + ", ." + type2).val(0);
            $("." + type).val($(strthis).val());
        } else if (prevAlllength <= 0) {
            $("." + type + ",." + type1 + ", ." + type2).removeAttr("readonly", "readonly");
            $("." + type + ",." + type1 + " ,." + type2).val("");
            $("." + type).val($(strthis).val())
        } else {
            $("input", $(strthis).parent().siblings()).each(function () {
                if (($(this).attr("class") == type1 || $(this).attr("class") == type2) && $(strthis).val() > 0) {
                    $(this).attr("readonly", "readonly");
                    $(this).val(0);
                } else if (($(this).attr("class") == type1 || $(this).attr("class") == type2) && $(strthis).val() <= 0) {
                    $(this).removeAttr("readonly", "readonly");
                    $(this).val("");
                }
            })
        }
    } else {
        if (nextAllldata.length >= 1 && prevAlllength >= 1) {
            ($(strthis).parents(".productdetailtbodytr").nextAll()).each(function () {
                $("input", $(this)).each(function () {
                    if ($(this).attr("class") == type) {
                        $(this).val($(strthis).val());
                    }
                });

            });
        }
        if (prevAlllength <= 0) { $("." + type).val($(strthis).val()); }
    }


}

//添加产品规格查询是否需要赋值
function GetIsAssignment() {
    $(".productdetailtbodytr input").each(function () {
        var strType = $(this).attr("class");
        var strValue = $("#" + strType).val();
        if (strValue != 0 && strValue != "" && $(this).val() == "") {

            $(this).val(strValue);
            if (strType == "sv_p_images") {
                $(".Productimag").attr("src", _g_res_images_url + strValue);
            }
        }
        if (strValue == 0 && (strType == 'sv_p_memberprice' || strType == 'sv_p_minunitprice' || strType == 'sv_p_mindiscount')) {
            $(this).val(strValue);
            $(this).attr("readonly", "readonly");
        }
    });
}

var str_thisval = "";
///自定义规格图片上传
function SingleProductUploadImg(type, type1, strthis) {
    if (str_thisval == "") {
        str_thisval = strthis;
    }
    $(".SingleProductUpload").click();
    //自定义规格图片上传
    $(document).on('change', "#SingleProductUpload", function () {
        $.commonUploadImg('SingleProductUpload', "Product", "true", function (resultImgUrl) {
            if (resultImgUrl) {
                var prevAlllength = $(str_thisval).parent().parent().parents(".productdetailtbodytr").prevAll().length;
                if (prevAlllength <= 0) {
                    //把图片替换  
                    $("." + type).attr("src", _g_res_images_url + resultImgUrl);
                    $('.' + type1).val(resultImgUrl);
                    str_thisval = "";
                } else {
                    $(str_thisval).attr("src", resultImgUrl);
                    $(str_thisval).parent().prev().val(resultImgUrl);
                    var nextAlldata = $(str_thisval).parent().parent().parents(".productdetailtbodytr").nextAll();
                    if (nextAlldata.length > 0) {
                        nextAlldata.each(function () {
                            $("img", $(this)).each(function () {
                                if ($(this).attr("class") == type) {
                                    $(this).attr("src", _g_res_images_url + resultImgUrl);
                                    return false;
                                }
                            });
                            $("input", $(this)).each(function () {
                                if ($(this).attr("class") == type1) {
                                    $(this).val(resultImgUrl);
                                    return false;
                                }
                            });
                        });
                    }
                    str_thisval = "";
                }
            }
        });
    });
}

///多规格显示隐藏
function MoreSpecsEvent(strthis) {
    if ($(strthis).hasClass('stateid')) {
        $(strthis).toggleClass('stateid')
        $(".ygmiveiwl").show();
        $(strthis).text("隐藏多规格")
        $("#sv_p_specs").attr("readonly", "readonly");
        getproductconfiginfo();//产品自定义配置初始化绑定
    } else {
        $(".ygmiveiwl").hide();
        $(strthis).text("展示多规格")
        $(strthis).toggleClass('stateid')
        $("#sv_p_specs").removeAttr("readonly", "readonly");
        $(".productdetailtheadtr,.productdetailtbodytr").remove();
    }

}

// 去空格
function deleteSpace(key) {
    return key.replace(/\s/g, "");
}


///查询条码
function GetProductBarcode() {
    var barcode = $("#sv_p_barcode").val().trim().replace(/\s/g, "");
    $.ajax({
        url: '/Product/getChinaProductData?productCode=' + barcode,
        type: 'post',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            if (data != null && data != 0) {
                if (data == true) {
                    layer.msg("编码重复");

                } else if (data != false) {
                    if (data.itemName != null && data.itemName != "" && data.itemName.indexOf("未公开") < 0 && data.itemName != "无" && data.firmStatus == "有效") {
                        // 编码
                        $("#productCode").val($("#sv_p_barcode").val());
                        // 名称   
                        $("#sv_p_name").val(data.itemName);
                        //  规格     
                        $("#sv_p_specs").val(data.itemSpecification);
                    } else {
                        $("#productCode").val($("#sv_p_barcode").val())
                        $("#productCode,#itemName,#sv_p_name,#itemSpecification,#sv_p_specs").val("");
                    }
                    cash_search_flag = true;
                } else {
                    $("#productCode").val($("#sv_p_barcode").val())
                    $("#productCode,#itemName,#sv_p_name,#itemSpecification,#sv_p_specs").val("");
                }

            } else if (data == 0) {
                $("#productCode").val($("#sv_p_barcode").val())
                $("#productCode,#itemName,#sv_p_name,#itemSpecification,#sv_p_specs").val("");
                cash_search_flag = true;
            } else {
                $("#productCode").val($("#sv_p_barcode").val())
                $("#productCode,#itemName,#sv_p_name,#itemSpecification,#sv_p_specs").val("");
            }
        }
    });
}
function DeleteCustom(strtid) {
    $("#" + strtid).remove();
    $.post("/AjaxProduct/UpdateCustomFieldCommonItems?id=" + strtid, function (data) {
        if (data == true) {
            layer.msg("删除成功");
        }
        else if (data == -2) {
            layer.msg("你没有该操作权限");
        }
        else {
            layer.msg("删除失败");
        }
    });
}

// 根据类型来隐藏还是显示某些字段
function fieldIsHidOrShowByProductType(type) {
    if (type == 0) { // 普通类
        if (!$('#power_id_sv_pricing_method').hasClass('hide')) {
            $('#power_id_sv_pricing_method').show();
        }

        if (!$('#power_id_sv_p_expirationdate').hasClass('hide')) {
            $('#power_id_sv_p_expirationdate').show();
        }

        if (!$('#power_id_sv_p_storage').hasClass('hide')) {
            $('#power_id_sv_p_storage').show();
        }

        if (!$('#power_id_sv_p_originalprice').hasClass('hide')) {
            $('#power_id_sv_p_originalprice').show();
        }
    }
    else if (type == 1) {
        $('#power_id_sv_pricing_method').hide();
        $('#power_id_sv_p_expirationdate').hide();
        $('#power_id_sv_p_storage').hide();
        $('#power_id_sv_p_originalprice').hide();
    }
}

// 导入
$('#btnImportPrductWindows').click(function () {
    $('#Productdaoru').modal('show');
});


//商品导入的选择一级分类，二级分类
//(function ($) {
//    //一级分类
//    $.ajax({
//        url: '/ProductCategory/GetFirstCategory',
//        method: 'get',
//        contentType: 'text/html',
//        async: false,
//        success: function (data) {
//            loggin.chklogn(data);
//            if (data.length > 0) {
//                for (var i in data) {
//                    $("#produCtcategory_import_id").append('<option value="' + data[i].productcategory_id + '" data-type="' + data[i].producttype_id + '">' + data[i].sv_pc_name + '</option>');
//                }
//            }
//        }
//    });
//    //二级分类
//    $("#produCtcategory_import_id").change(function () {
//        var check_ctcategory_id = $("#produCtcategory_import_id").val();
//        $("#productTwoCategory_import_id").empty();
//        $.ajax({
//            url: '/AjaxProduct/GetCategoryById?cid=' + check_ctcategory_id + '&pange=1&count=50',
//            method: 'get',
//            contentType: 'text/html',
//            async: false,
//            success: function (data) {
//                loggin.chklogn(data);
//                $("#productTwoCategory_import_id").append('<option value="0">二级类别</option>');
//                for (var i in data) {
//                    $("#productTwoCategory_import_id").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
//                }
//            }
//        });
//    });
//})(jQuery);

//商品的包装/套餐组合
function addProductPackageFn() {
    $(document).unbind("click", "#addProductPackage>.ritianshu>.shareradiobox").on("click", "#addProductPackage>.ritianshu>.shareradiobox", function () {
        $(this).addClass("on").parent().siblings(".ritianshu").children(".shareradiobox").removeClass("on");
    });
}
