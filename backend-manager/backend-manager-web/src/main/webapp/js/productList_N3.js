var pagesize = 5;
var deferredObj = $.Deferred();
var productUnitOrDiscountData; //存放商品的信息-----全局变量
var _g_data_package_type = false;//包装组合的类型
var productConfigArray = new Array();//商品自定义数组
var objArr = new Array();//商品自定义头部数组
var thisUrlNumber = 1;//记录当前的页码
//--当前页面缓存变量
var page_g_GetFirstCategory_data = null;   //一级分类
var page_g_GetCategoryById_data = [];   //二级分类

$(document).ready(function () {
    readyInfo.firstCategory();//获取一级分类
    readyInfo.shareClickFn();//公共的点击事件的方法
    readyProductList.shareFilter(null, "NotByName",null);//筛选
    operatingProductStatus.productShelves();//上下架
    operatingProductStatus.deleteProduct();//删除商品
    operatingAddProduct.addNewProduct();//添加商品
    operatingAddProduct.updowmproductlist();//导出导入商品信息  
    operatingAddProduct.uploadproductlist();//导出商品信息  
});

//读取商品信息列表----获取统计信息
var readyProductList = {
    //获取商品列表
    shareFilter: function (pageIndex, searchType, minstorage) {
        if (pageIndex == null) {
            readyProductList.productStatistics();//读出商品的统计
        }
        if (minstorage == "clickOpen") {//库存低于多少的
            var productStatus = "0";
            var firstCategory = "0";
            var storage = "不限-" + $("#lowerThanTotal").text().replace(/\ +/g, "");
            var addproductdate = "0";
            var productSearch = "";
            var secondCategory = "0";
        } else {//默认加载
            var productStatus = "0"; //商品上下架状态
            var firstCategory = "0"; //一级分类
            var storage = "0";       //库存
            var addproductdate = "0";//添加商品的时间
            var productSearch = $("#productSearch").val().replace(/\ +/g, ""); //商品的模糊查询
            var secondCategory = "0";  //二级分类
            var filterSwitch = $("#memberfilter").hasClass("open");//检测是否打开了筛选的下拉
            if (searchType == "NotByName") { //判断是否根据商品信息查询
                if (filterSwitch) {
                    productStatus = $("#chosen").find("[data-name='statusFilter']").data("id") == null ? "0" : $("#chosen").find("[data-name='statusFilter']").data("id");
                    firstCategory = $("#chosen").find("[data-name='firstCategory']").data("id") == null ? "0" : $("#chosen").find("[data-name='firstCategory']").data("id");
                    secondCategory = $("#chosen").find("[data-name='secondCategory']").data("id") == null ? "0" : $("#chosen").find("[data-name='secondCategory']").data("id");
                    storage = $("#chosen").find("[data-name='storageFilter']").data("id") == null ? "0" : $("#chosen").find("[data-name='storageFilter']").data("id");
                    if (storage == -1) {
                        storage = $("#chosen").find("[data-name='storageFilter']").data("number");
                    }
                    addproductdate = $("#chosen").find("[data-name='adddateFilter']").data("id") == null ? "0" : $("#chosen").find("[data-name='adddateFilter']").data("id");
                    if (addproductdate == -1) {
                        addproductdate = $("#chosen").find("[data-name='adddateFilter']").data("querydate");
                    }
                    productSearch = "";
                }
            }
        }
        var checkLength = $("#productlisthtml .selectcheckbox[name='productcheck']:checked").length;
        var allcheckboxLength = $("#productlisthtml .selectcheckbox[name='productcheck']").length;
        if ((allcheckboxLength - checkLength) > 0) {
            pageIndex = thisUrlNumber;
        }
        else {
            if ((thisUrlNumber - 1) > 0) {
                pageIndex = thisUrlNumber - 1;
            } else {
                pageIndex = 1;
            }
        }
        if (productStatus == 1) {
            $("#shelveProductBtn").find("a[data-shelveType='2']").show(0).siblings("a").hide(0);
        }
        else if (productStatus == 2) {
            $("#shelveProductBtn").find("a[data-shelveType='1']").show(0).siblings("a").hide(0);
        }
        var loadingIndex = openLoadingIng();
        $.get("/AjaxProduct/GetProductList", {
            status: productStatus,  //商品上下架状态
            category: firstCategory,//分类
            storage: storage,       //库存
            adddate: addproductdate,//添加商品的时间
            name: productSearch,    //商品的模糊查询
            pageIndex: pageIndex || 1, //当前页
            pageSize: pagesize,     //每页加载商品的条数
            erjicategory: secondCategory //二级分类
        }, function (result) {
            commonCloseLoading(loadingIndex);
            $('.selectcheckbox[data-type="all"]').prop("checked", false);//解除全选按钮被选中的状态
            var data = result.list;
            var productListHtml = '';   //列表形式
            var productListHtml2 = '';  //图文形式
            var _g_old_url = "http://decerp.cc";//旧的图片地址
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    //列表
                    var sv_p_storage = data[i].sv_pricing_method == 1 ? data[i].sv_p_total_weight : data[i].sv_p_storage;
                    var sv_mnemonic_code = data[i].sv_mnemonic_code != null ? data[i].sv_mnemonic_code : '';
                    productListHtml += '<tr>';
                    productListHtml += '<td><input data-product_id = "' + data[i].product_id + '" class="checkinput selectcheckbox" type="checkbox" name="productcheck" id="" value="" /></td>';
                    productListHtml += '<td class="amountcolor2 productdetailedinfo" data-product_id = "' + data[i].product_id + '">' + data[i].sv_p_name + '</td>';
                    productListHtml += '<td class="minhide">' + sv_mnemonic_code + '</td>';
                    productListHtml += '<td>' + (data[i].sv_pc_name == null ? "" : data[i].sv_pc_name) + '</td>';
                    if (_g_sv_uit_cache_name != 'cache_name_catering') {
                        productListHtml += '<td class="minhide">' + (data[i].sv_psc_name == null ? "" : data[i].sv_psc_name) + '</td>';
                    }
                    productListHtml += '<td>' + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) + '</td>';
                    if (_g_sv_uit_cache_name != 'cache_name_catering') {
                        productListHtml += '<td>' + (data[i].sv_p_specs == null ? "" : data[i].sv_p_specs) + '</td>';
                    }
                    productListHtml += '<td class="minhide">' + (data[i].sv_p_unit == null ? "" : data[i].sv_p_unit) + '</td>';
                    productListHtml += '<td class="colorff">' + parseFloat(data[i].sv_p_unitprice).toFixed(2) + '</td>';
                    //productListHtml += '<td>' + data[i].sv_p_unitprice + '</td>';//积分的
                    productListHtml += '<td>' + sv_p_storage + '</td>';
                    productListHtml += '<td>' + new Date(data[i].sv_p_adddate).Format('yyyy-MM-dd') + '</td>';
                    productListHtml += '<td class="changeproduct changeproduct2">';
                    productListHtml += '<button class="btn editproductinfo" data-product_id = "' + data[i].product_id + '">修改</button>';
                    productListHtml += '</td>';
                    productListHtml += '</tr>';

                    //图形
                    var productImg = "";
                    if (data[i].sv_p_images2 != null && data[i].sv_p_images2 != "" && data[i].sv_p_images2 != undefined) {
                        if (data[i].sv_p_images2.indexOf(_g_old_url) > -1) {
                            productImg = data[i].sv_p_images2.replace(_g_old_url, _g_res_images_url);
                        } else if (data[i].sv_p_images2.indexOf(_g_res_images_url) > -1) {
                            productImg = data[i].sv_p_images2;
                        } else {
                            productImg = _g_res_images_url + data[i].sv_p_images2;
                        }
                    } else {
                        productImg = "/images/002.png";
                    }
                    productListHtml2 += '<li class="productlistbox" data-product_id = "' + data[i].product_id + '">';
                    productListHtml2 += '<div class="productimagebox fl">';
                    productListHtml2 += '<img class="productdetailedinfo" data-product_id = "' + data[i].product_id + '" src="' + productImg + '" onerror="this.src=\'/images/002.png\';" alt="" />';
                    productListHtml2 += '</div>';
                    productListHtml2 += '<div class="productcontent">';
                    productListHtml2 += '<p>' + data[i].sv_p_name + '</p>';
                    productListHtml2 += '<p>'  + (data[i].sv_p_barcode == null ? "" : data[i].sv_p_barcode) +  '</p>';
                    productListHtml2 += '<p class="colorff">¥' + data[i].sv_p_unitprice + '</p>';
                    productListHtml2 += '<div class="row">';
                    productListHtml2 += '<p class="stockproduct">';
                    productListHtml2 += '<i class="remaining">剩</i>';
                    productListHtml2 += '<span>' + sv_p_storage + '</span>';
                    productListHtml2 += '</p></div></div>';
                    productListHtml2 += '<i class="selectgift icon-ok"></i>';
                    productListHtml2 += '</li>';
                }
                $("#productlisthtml").html(productListHtml);//列表的形式
                $("#productListHtml2").html(productListHtml2);//图表的形式
                //分页
                laypage({
                    cont: 'layerpage', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageGro"></div>
                    pages: result.total, //通过后台拿到的总页数
                    skip: true,
                    curr: pageIndex || 1, //初始化当前页
                    skin: 'molv', //皮肤颜色
                    first: '首页', //若不显示，设置false即可
                    last: '尾页', //若不显示，设置false即可
                    prev: '上一页', //若不显示，设置false即可
                    next: '下一页', //若不显示，设置false即可
                    //curr: location.hash.replace('#!page=', ''), //获取hash值为fenye的当前页
                    //hash: 'page', //自定义hash值
                    jump: function (e, first) {
                        thisUrlNumber = e.curr;
                        if (!first) {
                            if (minstorage == "clickOpen") {
                                readyProductList.shareFilter(e.curr, "NotByName", "clickOpen");
                            } else {
                                readyProductList.shareFilter(e.curr, "NotByName", null);
                            }
                        }
                        //选择加载的条数
                        if (result.total > 1) {
                            addPageSizeFn("#selectpagesize");
                            $("#pagesize").find("option[value='" + pagesize + "']").attr("selected", true);
                        } else {
                            $("#selectpagesize").html("");
                        }
                    }
                });
            } else {
                var thlength = $("#rowlength").children("th").length;
                $("#productlisthtml").html('<tr><td class="text-center sad" style="text-align:center !important" colspan="' + thlength + '"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>');
                $("#productListHtml2").html('<li style="width:100%;line-height:100px;" class="text-center"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></li>');//图表的形式
            }
        })
    },
    
    //获取统计信息
    productStatistics: function () {
        $.get('/AjaxProduct/GetProductSimpleDesc', function (data) {
            loggin.chklogn(data);
            if (data != null) {
                var topHtml = '';
                for (var key in data) {
                    if (key == "prlist") {
                        if (data[key] && data[key].length > 0) {
                            for (var k = 0; k < data[key].length; k++) {
                                topHtml += '<li class="top-list">';
                                topHtml += '<div class="membertopname fl"><i>' + (k + 1) + '.</i><span>' + data[key][k].product_name + '</span></div>';
                                topHtml += '<div class="membertopmoney fr"><span class="money">' + data[key][k].product_num + '</span><i class="pad">件</i></div>';
                                topHtml += '</li>';
                            }
                        }
                        $("#productTopList").html(topHtml);
                    } else {
                        $("#" + key).html(data[key]);
                        $("." + key).html(data[key]);
                    }
                }
            }
        });
    }
}

//读取商品的分组、分类、筛选商品信息
var readyInfo = {
    //获取一级分类
    firstCategory: function(){
        var test = $.ajax({
            url: '/ProductCategory/GetFirstCategory',
            method: 'get',
            contentType: 'text/html',
            async: false
        })
        .done(function (data) {
            loggin.chklogn(data);
            if (data && data.length > 0) {
                var firstCategoryHtml = '<li class="on">一级类别</li><li class="active" data-id="0" data-name="firstCategory">全部</li>';
                for (var i in data) {
                    firstCategoryHtml += '<li class="cl" data-id="' + data[i].productcategory_id + '" data-name="firstCategory">' + data[i].sv_pc_name + '</li>';
                }
                $("#firstCategory").html(firstCategoryHtml);
            }
        });
    },

    //获取二级分类
    secondCategory: function (id) {
        $.ajax({
            url: '/AjaxProduct/GetCategoryById?cid=' + id + '&pange=1&count=50',
            method: 'get',
            contentType: 'text/html',
            async: false
        })
        .done(function (data) {
            loggin.chklogn(data);
            if (data && data.length > 0) {
                var secondCategoryHtml = '<li class="on">二级类别</li><li class="active" data-id="0" data-name="secondCategory">全部</li>';
                for (var i in data) {
                    secondCategoryHtml += '<li class="" data-id="' + data[i].productsubcategory_id + '" data-name="secondCategory">' + data[i].sv_psc_name + '</li>';
                }
                $("#secondCategory").html(secondCategoryHtml);
            } else {
                secondCategoryHtml = '<li class="on">二级类别</li><li class="active" data-id="0" data-name="secondCategory">全部</li>';
                $("#secondCategory").html(secondCategoryHtml);
            }
        });
    },

    //点击一级分类获取二级分类
    shareClickFn: function () {

        //改变加载的条数
        $(document).on("change", "#pagesize", function () {
            thisUrlNumber = 1;
            pagesize = $("#pagesize").val();
            readyProductList.shareFilter(null, "NotByName", null);
        });

        //---------筛选查询-----------//
        //查询点击事件
        var chosenHtml = '';//已经选择的代码
        $(document).unbind("click", "#statusFilter>li,#firstCategory>li,#secondCategory>li,#storageFilter>li,#adddateFilter>li").on("click", "#statusFilter>li,#firstCategory>li,#secondCategory>li,#storageFilter>li,#adddateFilter>li", function () {
            var fristOn = $(this).hasClass("on");//判断是否点击是第一个li元素
            var activeLi = $(this).hasClass("active");//判断点击的元素是否有activeClass
            var firstCategorySwitch = $(this).hasClass("cl"); // 判断是否为加载第一分类
            var findInputSwitch = $(this).find("input").length;
            if (!fristOn) {
                if (!activeLi) {
                    $("#chosen").show(0);
                    $(this).addClass("active").siblings("li").removeClass("active");
                    if (findInputSwitch == 0) {
                        if (firstCategorySwitch) {
                            var firstCategoryId = $(this).data("id");
                            readyInfo.secondCategory(firstCategoryId);
                        }
                        if ($(this).data("name") == "storageFilter") {
                            $("#minStorage").val("");
                            $("#maxStorage").val("");
                        }
                        if ($(this).data("name") == "adddateFilter") {
                            $("#startDate").val("");
                            $("#endDate").val("");
                        }
                        $('#chosen>li[data-name="' + $(this).data("name") + '"').remove();
                        chosenHtml = $(this).clone(true);//完全复制当前点击的demo
                        chosenHtml.appendTo("#chosen");
                    } else {

                    }
                } else {
                    if ($(this).data("id") != -1) {
                        $(this).removeClass("active");
                        $('#chosen>li[data-name="' + $(this).data("name") + '"').remove();
                        $("[data-id='0'][data-name='" + $(this).data("name") + "']").addClass("active");
                        //if ($("#chosen>li").length == 1) {
                        //    $("#chosen").hide(0);
                        //}
                    }
                }
            }
        });

        //-------点击库存输入框的事件---------//
        $("#maxStorage").keyup(function () {
            $("#storageFilter li").removeClass("active");
            $('#chosen').find("[data-name='storageFilter']").remove();
            if ($("#minStorage").val() != "" && $("#maxStorage").val() != "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="storageFilter" data-number="' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '">' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '</li>');
            }
            else if ($("#minStorage").val() == "" && $("#maxStorage").val() != "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="storageFilter" data-number="不限-' + $("#maxStorage").val() + '">不限-' + $("#maxStorage").val() + '</li>');
            }
            else if ($("#minStorage").val() != "" && $("#maxStorage").val() == "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="storageFilter" data-number="' + $("#minStorage").val() + '-不限">' + $("#minStorage").val() + '-不限</li>');
            }
            else {
                $('#storageFilter').find("[data-id='0']").addClass("active");
            }
        });
        $("#minStorage").keyup(function () {
            $("#storageFilter li").removeClass("active");
            $('#chosen').find("[data-name='storageFilter']").remove();
            if ($("#minStorage").val() != "" && $("#maxStorage").val() != "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="storageFilter" data-number="' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '">' + $("#minStorage").val() + '-' + $("#maxStorage").val() + '</li>');
            }
            else if ($("#minStorage").val() == "" && $("#maxStorage").val() != "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="storageFilter" data-number="不限-' + $("#maxStorage").val() + '">不限-' + $("#maxStorage").val() + '</li>');
            }
            else if ($("#minStorage").val() != "" && $("#maxStorage").val() == "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="storageFilter" data-number="' + $("#minStorage").val() + '-不限">' + $("#minStorage").val() + '-不限</li>');
            }
            else {
                $('#storageFilter').find("[data-id='0']").addClass("active");
            }
        });
        //-------点击库存输入框的事件---------//

        //-------商品添加的时间查询----初始化时间----//
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
            format: 'yyyy/mm/dd'
        }).on('change', function (ev) {
            var startDate = $('#startDate').val();
            $("#enddate").datetimepicker('setStartDate', startDate);

            $("#adddateFilter li").removeClass("active");
            $('#chosen').find("[data-name='adddateFilter']").remove();
            if ($("#startDate").val() != "" && $("#endDate").val() != "") {
                $('#chosen').append('<li class="select active" data-id="-1" data-name="adddateFilter" data-querydate="' + $("#startDate").val() + '-' + $("#endDate").val() + '">' + $("#startDate").val() + '-' + $("#endDate").val() + '</li>');
            }
            else if ($("#startDate").val() == "") {
                $('#chosen').append('<li class="select active" data-id="-1" data-name="adddateFilter" data-querydate="不限-' + $("#endDate").val() + '">不限-' + $("#endDate").val() + '</li>');
            }
            else if ($("#endDate").val() == "") {
                $('#chosen').append('<li class="select active" data-id="-1" data-name="adddateFilter" data-querydate="' + $("#startDate").val() + '-至今">' + $("#startDate").val() + '-至今</li>');
            }

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
            startDate: $("#startDate").val(),
            endDate: new Date(),
            pickerPosition: 'bottom-left',
            format: 'yyyy/mm/dd'
        }).on('change', function (ev) {
            var endDate = $("#endDate").val();
            $("#begindate").datetimepicker('setReturnDate', endDate);

            $("#adddateFilter li").removeClass("active");
            $('#chosen').find("[data-name='adddateFilter']").remove();
            if ($("#startDate").val() != "" && $("#endDate").val() != "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="adddateFilter" data-querydate="' + $("#startDate").val() + '-' + $("#endDate").val() + '">' + $("#startDate").val() + '-' + $("#endDate").val() + '</li>');
            }
            else if ($("#startDate").val() == "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="adddateFilter" data-querydate="不限-' + $("#endDate").val() + '">不限-' + $("#endDate").val() + '</li>');
            }
            else if ($("#endDate").val() == "") {
                $('#chosen').append('<li class="active" data-id="-1" data-name="adddateFilter" data-querydate="' + $("#startDate").val() + '-至今">' + $("#startDate").val() + '-至今</li>');
            }

            $("#enddate").datetimepicker('hide');
        });
        //-------商品添加的时间查询----初始化时间-------//

        //已经选择的查询事件
        $(document).on("click", "#chosen>li.active", function () {
            $(this).remove();
            $("[data-name='" + $(this).data("name") + "']").removeClass("active");
            $("[data-id='0'][data-name='" + $(this).data("name") + "']").addClass("active");
            if ($("#chosen>li").length == 1) {
                $("#chosen").hide(0);
            }
        });

        //点击筛选框查询事件
        $("#searchProduct").click(function () {
            readyProductList.shareFilter(null, "NotByName",null);
        });

        //点击商品搜索的查询事件
        $("#productSearchButton").click(function () {
            thisUrlNumber = 1;
            var productInfo = $("#productSearch").val().replace(/\ +/g, "");
            if (productInfo) {
                readyProductList.shareFilter(null, "",null);
            } else {
                layer.msg("请输入商品信息，在查询！");
            }
        });

        //按键放松事件：按名称、编码查询
        $("#productSearch").keypress(function (event) {
            thisUrlNumber = 1;
            var productInfo = $("#productSearch").val().replace(/\ +/g, "");
            if (event.keyCode == 13) {
                if (productInfo) {
                    readyProductList.shareFilter(null, "",null);
                } else {
                    layer.msg("请输入商品信息，在查询！");
                } 
            }
        });

        $("#fillerproductstorage").click(function () {
            readyProductList.shareFilter(null, "", "clickOpen");
        });

        //全选反选事件
        $(document).unbind("click", ".selectcheckbox").on("click", ".selectcheckbox", function () {
            var selectAll = $(this).attr("data-type");//判断是否是全选的按钮
            if (selectAll == "all") {
                var selectAllStatus = $(this).is(":checked");//判断全选按钮的选中的状态
                if (selectAllStatus) {
                    $("#productlisthtml").find(".selectcheckbox").prop("checked", true);
                } else {
                    $("#productlisthtml").find(".selectcheckbox").prop("checked", false);
                }
            } else {
                var thisSelectStatus = $(this).is(":checked");//当前点击按钮的选中的状态
                var thisSelectAllStatus = $('.selectcheckbox[data-type="all"]').is(":checked");//全选按钮的状态
                if (thisSelectAllStatus) {
                    $('.selectcheckbox[data-type="all"]').prop("checked", false);
                } else {
                    var selectLength = $(".selectcheckbox:checked").length;//被选中的状态的数量
                    var allSelectLength = $(".selectcheckbox").length - 1;//全部选择框的数量
                    if (selectLength == allSelectLength) {
                        $('.selectcheckbox[data-type="all"]').prop("checked", true);
                    }
                }
            }
        });

        //列表2选中状态
        $(document).unbind("click", "#productListHtml2 li").on("click", "#productListHtml2 li", function () {
            $(this).toggleClass("active");
        });
    }
}

//操作商品的状态---上下架---删除---修改
var operatingProductStatus = {
    //上下架
    productShelves: function () {
        $("#shelveProductBtn").delegate(".shareshelveproduct", "click", function () {
            var shelveType = $(this).attr("data-shelveType");//判断上下架的状态 1 == 上架  2 下架
            var productShelveStatus = "putaway";//商品上下架的状态---unshelve（下架）---putaway（上架）
            var productIds = "";//商品id的字符串
            var checkedLength = 0;//被选中的的checked的数量
            if (shelveType > 1) {
                productShelveStatus = "unshelve";//下架
            }
            if ($(".memberlistactive:eq(0)").css("display") == "block") {
                checkedLength = $(".selectcheckbox:checked").length;
                if (checkedLength > 0) {
                    $(".selectcheckbox:checked").each(function () {
                        if ($(this).data("type") != "all") {
                            productIds += $(this).data("product_id") + ",";
                        }
                    });
                }
            } else {
                checkedLength = $("#productListHtml2").find("li.active").length;
                if (checkedLength > 0) {
                    $("#productListHtml2 li.active").each(function () {
                        productIds += $(this).data("product_id") + ",";
                    });
                }
            }
            if (checkedLength > 0) {
                $.ajax({
                    url: '/AjaxProduct/NegativeProduct?ids=' + productIds.substring(0, productIds.length - 1) + '&type=' + productShelveStatus,
                    type: 'post',
                    contentType: 'text/html',
                    success: function (data) {
                        loggin.chklogn(data);
                        if (data == true) {
                            if (productShelveStatus == 'putaway') {
                                layer.msg("上架成功");
                            }
                            else {
                                layer.msg("下架成功");
                            }
                            readyProductList.shareFilter(null, "NotByName",null);
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限！");
                        }
                        else {
                            layer.msg("下架失败");
                        }
                    }
                });
            } else {
                layer.msg("至少选择一个商品！")
            }
        });
    },

    //删除商品----------支持多个商品删除
    deleteProduct: function () {
        $("#deleteProduct").click(function () {
            var productIds = "";//商品id的字符串
            var checkedLength = 0;//被选中的的checked的数量
            if ($(".memberlistactive:eq(0)").css("display") == "block") {
                checkedLength = $(".selectcheckbox:checked").length;
                if (checkedLength > 0) {
                    $(".selectcheckbox:checked").each(function () {
                        if ($(this).data("type") != "all") {
                            productIds += $(this).data("product_id") + ",";
                        }
                    });
                }
            } else {
                checkedLength = $("#productListHtml2").find("li.active").length;
                if (checkedLength > 0) {
                    $("#productListHtml2 li.active").each(function () {
                        productIds += $(this).data("product_id") + ",";
                    });
                }
            }
            if (checkedLength > 0 ) {
                $.ajax({
                    url: '/AjaxProduct/NegativeProduct?ids=' + productIds.substring(0, productIds.length - 1) + '&type=delete',
                    type: 'post',
                    contentType: 'text/html',
                    success: function (data) {
                        loggin.chklogn(data);
                        if (data == true) {
                            layer.msg("删除成功");
                            readyProductList.shareFilter(null, "NotByName",null);
                        }
                        else if (data == -2) {
                            layer.msg("你没有该操作权限");
                        }
                        else {
                            layer.msg("删除失败");
                        }
                    }
                });
            } else {
                layer.msg("至少要选择一个删除的商品");
            }
        });
    }
}

//新增商品
var operatingAddProduct = {
    addNewProduct: function () {
        //新增商品
        $("#addNewProduct").click(function () {
            layerpage.Deke_layerpage.show_Url2("1", "新增商品", "/Product/_PartialAddProduct_N3?buttonCode=btn_addprodcut_code", ['790px', '520px'], addNewProductLoadFn);
        });

        //新增商品的方法
        function addNewProductLoadFn() {
            getFirstCategroyFn(); //获取一级分类-- - 与二级联动
            getProductUnitOrDiscountFn();//获取会员的折扣、商品的单位
            getCateringKitchenPrinterList();//获取厨打方案
            getProductCustomInfo(0);//获取自定义字段
            selectexpirationdateTime("sv_p_expirationdate");//过期时间

            //获取自动编码--g_AutomaticallyGenerateProductBarcode默认为false
            if (g_AutomaticallyGenerateProductBarcode) {
                getAutoId($("#sv_p_barcode"), "AutomaticallyGenerateProductBarcode", "AutomaticallyGenerateProductBarcode");
                $("#sv_p_barcode").on("change", function () {
                    manualSettingsId($(this).val().trim());
                });
            }

            //如果是数码行业-----显示批量添加串号字眼
            //if (_g_sv_uit_cache_name == "cache_name_mobile_digital") {
            //    $("#IMEINumber").show();
            //}

        }

        //获取一级分类---与二级联动
        function getFirstCategroyFn() {
            if (page_g_GetFirstCategory_data)
            {
                getFirstCategroyFnCallback(page_g_GetFirstCategory_data);
            } else
            {
            $.ajax({
                url: '/ProductCategory/GetFirstCategory',
                method: 'get',
                contentType: 'text/html',
                async: false
            }).then(function (result) {
                page_g_GetFirstCategory_data = result;
               getFirstCategroyFnCallback(result);
            });
            }
        }


        function getFirstCategroyFnCallback(result) {
            if (result && result.length > 0)
            {
                var html = '';
                for (var i in result)
                {
                    html += '<option value="' + result[i].productcategory_id + '" data-type="' + result[i].producttype_id + '">' + result[i].sv_pc_name + '</option>';
                }
                $(".firstCategory").html(html);
                $("#productcategory_id").change();
            }
        }

        //扫描商品编码-----输入商品编码按下回车键触发的事件
        $(document).unbind("change", "#sv_p_barcode").on("change", "#sv_p_barcode", function () {
            var tiaoMa = $('#sv_p_barcode').val().replace(/\ +/g, "");
            if (tiaoMa.length == 13 || tiaoMa.length == 8) {
                for (i = 0; i < 13; i++) {
                    var char = tiaoMa[i];
                    if (!(char == '0' || char == '1' || char == '2' || char == '3' || char == '4' || char == '5' || char == '6' || char == '7' ||
                        char == '8' || char == '9')) {
                        return;
                    }
                }
                //万码库api
                $.get("http://res.decerp.cc/api/product/GetGoodsInfoByBarcode", { "barcode": tiaoMa }, function (result) {
                    var data = JSON.parse(result);
                    if (data) {
                        $("#sv_p_name").val(data.probarcodelib_goods_name);
                        $("#sv_mnemonic_code").val(codefans_net_CC2PY(data.probarcodelib_goods_name));
                        $("#sv_p_unitprice").val(data.probarcodelib_price);
                        $("#sv_p_specs").val(data.probarcodelib_specifications);
                    }
                });
            }
        });

        //-----------------------------------覃照波写的---------自动生成商品助词码的------------------------------//
        function codefans_net_CC2PY(l1) {
            if (l1 == null || l1.leng == 0) {
                return;
            }
            var l2 = l1.length;
            var I1 = "";
            var reg = new RegExp('[a-zA-Z0-9\- ]');
            for (var i = 0; i < l2; i++) {
                var val = l1.substr(i, 1);
                var name = arraySearch(val, PinYin);
                if (reg.test(val)) {
                    I1 += val[0];
                } else if (name !== false) {
                    I1 += name[0];
                }

            }
            I1 = I1.replace(/ /g, '-');
            while (I1.indexOf('--') > 0) {
                I1 = I1.replace('--', '-');
            }
            return I1.toUpperCase();
        }
        function arraySearch(l1, l2) {
            for (var name in PinYin) {
                if (PinYin[name].indexOf(l1) != -1) {
                    return ucfirst(name); break;
                }
            }
            return false;
        }
        function ucfirst(l1) {
            if (l1.length > 0) {
                var first = l1.substr(0, 1).toUpperCase();
                var spare = l1.substr(1, l1.length);
                return first + spare;
            }
        }

        function sv_p_nameTextChange(obj) {
            $("#sv_mnemonic_code").val(codefans_net_CC2PY($(obj).val()));
        }
        //-----------------------------------覃照波写的---------自动生成商品助词码的--------------------------//

        //一二级分类联动
        $(document).unbind("change", ".firstCategory").on("change", ".firstCategory", function () {
            $(".secondCategory").empty();//移除二级分类所有的子节点
            var firstCategroyId = $(this).val();
            var type = $(".firstCategory option:selected").data("type");

            var bl = false;
            if (page_g_GetCategoryById_data && page_g_GetCategoryById_data.length > 0)
            {
                for (var i = 0; i < page_g_GetCategoryById_data.length; i++)
                {
                    if (page_g_GetCategoryById_data[i].cid == $(".firstCategory").val())
                    {
                        bl = true;
                        GetCategoryByIdCallback(page_g_GetCategoryById_data[i].data);
                        break;
                    }
                }
            }

            if(!bl)//未查询
            {
                $.ajax({
                    url: '/AjaxProduct/GetCategoryById?cid=' + $(".firstCategory").val() + '&pange=1&count=1000',
                    method: 'get',
                    contentType: 'text/html',
                    async: false
                }).done(function(result) {
                    page_g_GetCategoryById_data.push({ cid: $(".firstCategory").val(), data: result });
                    GetCategoryByIdCallback(result);
                });
            }
            
            if (type == 0) {// 一级普通分类改变时--- 0
                fillerProductType(0);
            } else if (type == 1) {
                fillerProductType(1);
            } else {
                $('#customFieldHtml').html('');
            }
            
        });

        function GetCategoryByIdCallback(result) {
            $(".secondCategory").empty();
            $(".secondCategory").append('<option value="0">二级类别</option>');
            for (var i in result)
            {
                $(".secondCategory").append('<option value="' + result[i].productsubcategory_id + '">' + result[i].sv_psc_name + '</option>');
            }
        }


        //获取会员的折扣、商品的单位
        function getProductUnitOrDiscountFn() {
            $("#sv_p_discount").html('');//清空会员折扣
            $("#sv_p_unit").html('');//清空单位
            if (_g_user_config && _g_user_config.sv_userconfig)
            {
                productUnitOrDiscountData = { discount: JSON.parse(_g_user_config.sv_userconfig.sv_uc_saleprediscount), unit: JSON.parse(_g_user_config.sv_userconfig.sv_uc_unit) }
            }
            if (productUnitOrDiscountData == null || productUnitOrDiscountData == undefined || productUnitOrDiscountData == "") {
                $.ajax({
                    url: '/Product/GetUserDiscount',
                    method: 'get',
                    contentType: 'text/html',
                    async: false
                }).done(function(result) {
                    debugger;
                    //折扣
                    if (result && result.discount && result.discount.length > 0) {
                        productUnitOrDiscountData = result;
                        $(productUnitOrDiscountData.discount).each(function (index, data) {
                            //$("#sv_p_discount").append('<option value="' + data + '" selected>' + data + '</option>');
                        });
                    }
                     //单位
                    if (result && result.unit && result.unit.length > 0) {
                        productUnitOrDiscountData = result;
                        var unitHtml = '';
                        $(productUnitOrDiscountData.unit).each(function (index, data) {
                            unitHtml += '<option value="' + data + '" selected>' + data + '</option>';
                        });
                        $("#sv_p_unit").html(unitHtml);
                    }
                });
            } else {
                //折扣
                if (productUnitOrDiscountData && productUnitOrDiscountData.discount && productUnitOrDiscountData.discount.length > 0) {
                    $(productUnitOrDiscountData.discount).each(function (index, data) {
                        //$("#sv_p_discount").append('<option value="' + data + '" selected>' + data + '</option>');
                    });
                }
                //单位
                if (productUnitOrDiscountData && productUnitOrDiscountData.unit && productUnitOrDiscountData.unit.length > 0) {
                    var unitHtml = '';
                    $(productUnitOrDiscountData.unit).each(function (index, data) {
                        unitHtml += '<option value="' + data + '" selected>' + data + '</option>';
                    });
                    $("#sv_p_unit").html(unitHtml);
                }
            }
        }

        // 读取厨房打印方案
        function getCateringKitchenPrinterList() {
            if (_g_sv_uit_cache_name != 'cache_name_catering')
            {
                return;
            }
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

        //添加商品保存按钮事件
        $(document).unbind("click", "#saveProduct").on("click", "#saveProduct", function () {
            operatingAddProduct.saveNewProductInfo(false);
        });

        // 保存信息并继续操作
        $(document).unbind("click", "#saveProductContinueOperation").on("click", "#saveProductContinueOperation", function () {
            operatingAddProduct.saveNewProductInfo(true);
        });

        //输入商品名称自动改变助词码
        $(document).unbind("keyup", "#sv_p_name").on("keyup", "#sv_p_name", function () {
            var productName = $(this).val();
            $("#sv_mnemonic_code").val(codefans_net_CC2PY(productName));
        });

        //设置常用项
        $(document).unbind("click", "#settingproject").on("click", "#settingproject", function () {
            layerpage.Deke_layerpage.show_Url2("2", '设置常用项<input type="hidden" id="layerCloseIndex" value="'+(layer.index + 1)+'" />', "/ajaxHtml_N3/product/setproject.html?=" + getTimeStamp(), ['470px', '450px'], commonItemsFn);
        });

        //设置常用项的方法
        function commonItemsFn()  {
            //获取常用项的方法
            getCommonItemsFn();

            //还原常用项
            $('#recoveryCommonItems').click(function () {
                getCommonItemsFn();
            });

            //移除显示的常用项
            $(document).on('click', '#commonItemsHtml li', function () {
                if ($(this).children().children('span').length == 0) {
                    $(this).children("a").append(("<span data-id='" + $(this).data('id') + "' class='icon-remove deletememberproject'></span>"));
                }
                $('#notCommonItemsHtml').append($(this));
                setTimeout(function () {
                    $(this).remove();
                }, 200);
            });

            //显示常用项
            $(document).on('click', '#notCommonItemsHtml li', function () {
                $(this).children("a").children("span").remove();
                $('#commonItemsHtml').append($(this));
                setTimeout(function () {
                    $(this).remove();
                }, 200);
            });

            //保存常用项
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
                        layer.close(layer.index);
                        layer.msg("保存设置成功！");
                    }
                    else if (result == -1) {
                        layer.msg("您当前还未添加自定义字段！");
                    }
                    else {
                        layer.msg("保存设置失败，请稍后重试！");
                    }
                });
            });
        }

        //获取常用项的方法
        function getCommonItemsFn() {
            $('#commonItemsHtml').empty();
            $('#notCommonItemsHtml').empty();
            var commonItemsHtml = '';     // 显示项
            var notCommonItemsHtml = '';  // 隐藏项
            $.getAsyncJson('/AjaxProduct/GetProductCustomList', null, function (result) {
                if (result != null && result != '') {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].sv_enabled == true) { // 显示项
                            commonItemsHtml += ' <li class="active" id="' + result[i].sv_field_id + '"  data-id="' + result[i].sv_field_id + '"><a href="javascript:void(0);">' + result[i].sv_field_name + '</a></li>';
                        }
                        else { // 隐藏项
                            notCommonItemsHtml += '<li data-id="' + result[i].sv_field_id + '"><a href="javascript:void(0);">' + result[i].sv_field_name + '<span data-id="' + result[i].sv_field_id + '" class="icon-remove deletememberproject"></span></a> </li>';
                        }
                    }
                    $('#commonItemsHtml').html(commonItemsHtml);
                    $('#notCommonItemsHtml').html(notCommonItemsHtml);
                }
            });
        }

        //删除常用项
        $(document).unbind("click", "#notCommonItemsHtml .deletememberproject").on("click", "#notCommonItemsHtml .deletememberproject", function () {
            var strtid = $(this).data("id");
            $.post("/AjaxProduct/UpdateCustomFieldCommonItems?id=" + strtid, function (data) {
                if (data == true) {
                    layer.msg("删除成功");
                    getCommonItemsFn();
                    getProductCustomInfo("");
                }
                else if (data == -2) {
                    layer.msg("你没有该操作权限");
                }
                else {
                    layer.msg("删除失败");
                }
            });
            return false;
        });

        //取消常用项
        $(document).on("click", ".closesetprojectpage", function () {
            layer.close($("#layerCloseIndex").val());
        });

        //读取自定义字段的信息(不带商品id,则不会读取自定义字段的值)---0默认读取--添加的时候
        function getProductCustomInfo(productId) {
            $("#customFieldHtml>li.productcustom").remove();
            $.getAsyncJson('/AjaxProduct/GetProductCustomInfo', { productId: productId }, function (result) {
                var customFieldHtml = '';
                if (result != null && result != '') {
                    for (var i = 0; i < result.length; i++) {
                        var customFieldHtml = '';
                        var sv_field_value = result[i].sv_field_value != null && result[i].sv_field_value != '' ? result[i].sv_field_value : '';
                        customFieldHtml += ' <li class="productcustom">';
                        customFieldHtml += '<label class="labelinfo">' + result[i].sv_field_name + '</label>';
                        customFieldHtml += '<input class="form-control" type="text" id="" value="' + sv_field_value + '" data-id="' + result[i].sv_field_id + '" data-relationid="' + result[i].sv_relation_id + '" name="memberCustom" maxlength="100" placeholder="' + result[i].sv_field_name + '"/>';
                        customFieldHtml += ' </li>';
                        $("#customFieldHtml").append(customFieldHtml);
                    }
                }
            });
        }

        //添加更多的信息
        $(document).on("click", ".more-infolist-btn", function () {
            $(this).parent().hide();
            $(".morenewmemberinfo").slideDown(300);
        });

        //添加自定义项按钮
        $(document).on("click", "#addproject", function () {
            $(".addfieldbox").slideDown(200);
            $(".centercontent").addClass("padbom50");
        });

        //添加自定义项按钮input增加的事件
        $(document).unbind("click", "#addmemberproject").on("click", "#addmemberproject", function () {
            var taotal = 0;
            $.getAsyncJson('/AjaxProduct/GetCustomFieldTotal', null, function (result) {
                taotal = result;
            });
            if (taotal == 10) {
                layer.msg("自定义地段最多添加10个，如需再添加，请删除在添加");
            } else {
                if ($("#projectinputbox").children("input").length > 5) {
                    layer.msg("一次性最多添加6个");
                } else {
                    $("#projectinputbox").append('<input type="text" value="" name="custom" placeholder="字段名称">');
                }
            }
        });

        //添加自定义项X按钮的事件
        $(document).unbind("click","#colosememberproject").on("click","#colosememberproject",function () {
            $(".addfieldbox").hide();
            $("#projectinputbox").html("");
            $(".centercontent").removeClass("padbom50");
        });

        //添加自定义√按钮的事件
        $(document).unbind("click","#confirmaddproject").on("click","#confirmaddproject",function () {
            var projectInputObj = $("#projectinputbox input");
            var addProjectSwitch = false;//添加的开关
            //		var memberProjectList = new Array();				
            if (projectInputObj.length <= 0) {
                layer.msg("添加的自定义项目不能为空！");
            } else {
                var addList = projectInputObj.map(function (i, data) {
                    if (data.value != null && data.value != undefined && data.value != "") {
                        if (data.value.length > 10) {
                            layer.msg("字符的长度最长为10");
                            addProjectSwitch = false;
                        } else {
                            addProjectSwitch = true;
                            return {
                                sv_field_name: $(this).val()
                            }
                        }
                    } else {
                        addProjectSwitch = false;
                        layer.msg("有自定义还没有输入！");
                    }
                }).get();
                if (addProjectSwitch) {
                    $.ajax({
                        url: '/AjaxProduct/AddProductCustomField',
                        data: JSON.stringify(addList),
                        type: "POST",
                        contentType: "application/json"
                    }).success(function (result) {
                        if (result != false) {
                            for (var i = 0; i < result.length; i++) {
                                var customFieldHtml = '';
                                var sv_field_value = result[i].sv_field_value != null && result[i].sv_field_value != '' ? result[i].sv_field_value : '';
                                customFieldHtml += ' <li class="productcustom">';
                                customFieldHtml += '<label class="labelinfo">' + result[i].sv_field_name + '</label>';
                                customFieldHtml += '<input class="form-control" type="text" id="" value="' + sv_field_value + '" data-id="' + result[i].sv_field_id + '" data-relationid="' + result[i].sv_relation_id + '" name="memberCustom" maxlength="100" placeholder="' + result[i].sv_field_name + '"/>';
                                customFieldHtml += ' </li>';
                                $("#customFieldHtml").append(customFieldHtml);
                            }
                            $(".addfieldbox").css("display", "none");
                            $("#projectinputbox").html("");
                        }
                        else if (result == -1) {
                            layer.msg("自定义字段最多只能添加十个！");
                            $(".addfieldbox").css("display", "none");
                            $("#projectinputbox").html("");
                        }
                        else {
                            layer.msg("添加失败！");
                        }
                    });
                }
            }
        });

        //选择分类类型的事件
        $(document).on("click", "#selectCategonriesTypes>li.select", function () {
            $(this).addClass("active").siblings("li").removeClass("active");
        });

        //添加大分类
        $(document).unbind("click", "#addbigCategories").on("click", "#addbigCategories", function () {
            layerpage.Deke_layerpage.show_Url2("1", "新增大分类", "/ajaxHtml_N3/product/addcategories.html?=" + getTimeStamp(), ['430px', '250px'], addProductCategroyFn);
        });

        //添加大分类的方法
        function addProductCategroyFn() {
            $("#saveProductCategroy").unbind("click").click(function () {
                var productCategroyName = $("#productCategroyName").val().replace(/\ +/g, "");
                if (productCategroyName) {
                    disableButtonById("saveProductCategroy");
                    $.ajax({
                        url: '/AjaxProduct/SaveCategory',
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            productcategory_id: 0,//默认一级分类的id
                            sv_pc_name: $("#productCategroyName").val(),//一级分类的名称
                            producttype_id: $("#selectCategonriesTypes>li.active").data("type")//添加一级分类的类型
                        })
                    }).done(function (result) {
                        enabledButtonById("saveProductCategroy");
                        if (result == true) {
                            getFirstCategroyFn(); //获取一级分类-- - 与二级联动
                            layer.close(layer.index);
                            layer.msg("保存成功");
                        }
                    });
                } else {
                    $("#productCategroyName").focus();
                    layer.msg("请输入分类的名称！");
                    enabledButtonById("saveProductCategroy");
                }
            });
        }

        //添加单位
        $(document).on("click", "#addProductUnit", function () {
            layer.prompt({
                title: '添加商品单位',
                formType: 0, //prompt风格，支持0-2
                shift: 5
            }, function (pass) {
                var obj = $("#sv_p_unit").get(0);
                for (var i = 0; i < obj.options.length; i++) {
                    var tmp = obj.options[i].value;
                    if (tmp == pass) {
                        layer.msg("您添加的单位已存在");
                        return false;
                    }
                }
                $.post("/System/Update_danwei", { id: 0, name: pass, name2: "" }, function (data) {
                    if (data.r == true) {
                        layer.close(layer.index);
                        layer.msg("单位添加改成功");
                        productUnitOrDiscountData = "";
                        getProductUnitOrDiscountFn();
                    }
                    else if (data == -2) {
                        layer.msg("你没有该操作权限！");
                        layer.close(layer.index);
                    }
                    else {
                        layer.msg("添加单位失败");
                        layer.close(layer.index);
                    }

                });
            });
        });

        //展示多规格
        $(document).on("click", "#display-specification", function () {
            //3C数码多规格状态，
            if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && $("input.iemeattributes").length>0)
            {
                return;
            }
            $(".more-specification").slideToggle(150);
            if ($(this).hasClass("open")) {
                $(this).text("展开多规格");
                $(this).removeClass("open");
                $("#productdetailthead").empty();
                $("#productDetailBody").empty();
                $("#productIMEINumberBox").hide(0);
                $("#productConfiginfoHtmlBox,#productConfiginfoChildHtml").show();
                productConfigArray = [];
                objArr = [];
            } else {
                $(this).text("隐藏多规格");
                $(this).addClass("open");
                var falg = true;
                $("#productdetailthead").empty();
                $("#productDetailBody").empty();
                $("#productIMEINumberBox").hide(0);
                $("#productConfiginfoHtmlBox,#productConfiginfoChildHtml").show();
                productConfigArray = [];
                getProductConfiginfoFn();
                objArr = [];
            }
        });

        //批量添加串号
        $(document).on("click", "#IMEINumber", function () {
            $(".more-specification").slideToggle(150);
            $("#productIMEINumberBox").show(0);
            if ($(this).hasClass("open")) {
                $(this).text("展开批量添加");
                $(this).removeClass("open");
                $("#productdetailthead").empty();
                $("#productDetailBody").empty();
                $("#display-specification").show();
                $("#productConfiginfoHtmlBox,#productConfiginfoChildHtml").hide();
                productConfigArray = [];
                objArr = [];
            } else {
                $(this).text("隐藏批量添加");
                $(this).addClass("open");
                var falg = true;
                $("#productdetailthead").empty();
                $("#productDetailBody").empty();
                $("#productConfiginfoHtmlBox,#productConfiginfoChildHtml,#display-specification").hide();
                productConfigArray = [];
                objArr = [];
            }
        });

        //获取多规格的自定义属性
        function getProductConfiginfoFn() {
            $.getJSON("/ProductCustomProperties/GetProductAttributeConfiglist", { isSearchEnabled: true })
            .done(function (data) {
                if (data && data.length > 0) {
                    var productConfiginfoHtml = '<div class="setattributes fl"><span>自定义属性</span></div>';//父类的
                    var productConfiginfoChildHtml = '';//子类的
                    for (var i = 0; i < data.length; i++) {
                        productConfiginfoHtml += '<div class="setattributes fl"><input data-configname="' + data[i].sv_configname + '" data-configid="' + data[i].sv_productconfigid + '" type="checkbox" class="checkinput mar" name="" id="' + data[i].sv_productconfigid + '" value="" /><label for="' + data[i].sv_productconfigid + '">' + data[i].sv_configname + '</label></div>';
                        if (data[i].childList != null) {
                            var childList = data[i].childList;
                            productConfiginfoChildHtml += '<li class="id_' + data[i].sv_productconfigid + '"><div class="setattributes fl"><span>' + data[i].sv_configname + '</span></div>';
                            for (var j = 0; j < childList.length; j++) {
                                productConfiginfoChildHtml += '<div class="setattributes fl"><input type="checkbox" data-configid="' + data[i].sv_productconfigid + '" data-detailid="' + childList[j].sv_producdetailid + '" data-configname="' + data[i].sv_configname + '" data-detailname="' + childList[j].sv_productattributename + '" id="' + childList[j].sv_producdetailid + '_" class="checkinput mar" name="" value="" /><label for="' + childList[j].sv_producdetailid + '_">' + childList[j].sv_productattributename + '</label></div>';
                            }
                            productConfiginfoChildHtml += '</li>';
                        }
                    }
         
                    if (_g_sv_uit_cache_name == "cache_name_mobile_digital") //数码行业
                    {
                        productConfiginfoHtml += '<div class=" setattributes fl"><input data-configname="串号" data-configid="0" type="checkbox" class="checkinput mar iemeattributes" name="" id="0" value="" /><label for="0">串号</label></div><input type="text" class="form-control" name="sv_input_iemi" id="sv_input_iemi" style="display:none;" value="" placeholder="输入串号，按Enter键添加">';
                    }
                    //---------------数码行业串号选项--------------


                    $("#productConfiginfoHtml").html(productConfiginfoHtml);
                    $("#productConfiginfoChildHtml").html(productConfiginfoChildHtml);
                    if (_g_sv_uit_cache_name == "cache_name_mobile_digital") //数码行业
                    {
                        $("#sv_input_iemi").keypress(function (event) {
                            if (event.keyCode == 13) {
                                InsetIEMIData($(this).val());
                            }
                        });
                    }
                } else
                {
                    var productConfiginfoHtml = '<div class="setattributes fl"><span>自定义属性</span></div>';//父类的
                    var productConfiginfoChildHtml = '';//子类的

                    if (_g_sv_uit_cache_name == "cache_name_mobile_digital") //数码行业
                    {
                        productConfiginfoHtml += '<div class=" setattributes fl"><input data-configname="串号" data-configid="0" type="checkbox" class="checkinput mar iemeattributes" name="" id="0" value="" /><label for="0">串号</label></div><input type="text" class="form-control" name="sv_input_iemi" id="sv_input_iemi" style="display:none;" value="" placeholder="输入串号，按Enter键添加">';
                    }
                    //---------------数码行业串号选项--------------


                    $("#productConfiginfoHtml").html(productConfiginfoHtml);
                    $("#productConfiginfoChildHtml").html(productConfiginfoChildHtml);
                    if (_g_sv_uit_cache_name == "cache_name_mobile_digital") //数码行业
                    {
                        $("#sv_input_iemi").keypress(function(event) {
                            if (event.keyCode == 13)
                            {
                                InsetIEMIData($(this).val());
                            }
                        });
                    }
                }
            })
        }

        /***控制免费版的串号***/
        function imemNumberFn() {
            if (verify_distributor_id != 1) {
                $("#receiveshopbtn").hide(0);
            }
            $("#text-content").text("当前为免费版，暂不支持串号（IMEI）管理。如需使用，请升级！").css("padding-top", "35px");
            $("#receiveshopbtn").text("立即购买");
            $(document).unbind("click", "#receiveshopbtn").on("click", "#receiveshopbtn", function () {
                location.href = "/home/VersionList_N3";
            });
        }

        //点击商品多规格属性的事件 ----头部
        $(document).delegate("#productConfiginfoHtml .checkinput", "click", function() {
            var thisChecked = $(this).is(":checked");//是否为true; --true显示，----false隐藏
            if ($(this).hasClass("iemeattributes"))
            {
                /***判断是否付费的版本***/
                if (_g_old_sv_versionid < 2) {
                    layerpage.Deke_layerpage.getpage3('', "/html/buyTipspage.html?v=" + getTimeStamp + 200, imemNumberFn, ["380px", "250px"]);
                    $(this).prop("checked", false);
                    return;
                }
                $("#sv_input_iemi").css("display", "block");
                //串号模式
                for (var i = 0; i < $("#productConfiginfoHtml .checkinput").length ; i++)
                {
                    var attrConfigItem = $("#productConfiginfoHtml .checkinput")[i];
                    if (!$(attrConfigItem).hasClass("iemeattributes"))
                    {
                        var attrConfigItem_configid = $(attrConfigItem).data("configid");
                        //removeProductConfigArray(attrConfigItem_configid);
                        $(attrConfigItem).prop("checked", false);
                        //$("#productConfiginfoChildHtml .id_" + $(attrConfigItem).data("configid") + "").find(".checkinput").prop("checked", false);


                        $("#productConfiginfoChildHtml").find(".id_" + attrConfigItem_configid + "").css("display", "none");
                        removeProductConfigTheadArray($(attrConfigItem).data("configname"));
                        appendProductTableInfoFn(objArr);
                        removeProductConfigArray(attrConfigItem_configid);
                        addProductConfigTableRowFn(productConfigArray);
                        $("#productConfiginfoChildHtml .id_" + attrConfigItem_configid + "").find(".checkinput").prop("checked", false);

                    }
                }
            } else
            {
                $("#sv_input_iemi").css("display","none");
                $("#productConfiginfoHtml .iemeattributes.checkinput").prop("checked", false);
                $("#productConfiginfoChildHtml").find(".id_0").css("display", "none");
                removeProductConfigTheadArray("串号");
                appendProductTableInfoFn(objArr);
                removeProductConfigArray("0");
                addProductConfigTableRowFn(productConfigArray);
                $("#productConfiginfoChildHtml .id_0").find(".checkinput").prop("checked", false);

            }
            var checkedLength = $("#productConfiginfoHtml .checkinput:checked");//选中的数量
            var falg = false;//控制是否插入表头
            if (checkedLength.length <= 3)
            {
                if (thisChecked)
                {
                    $("#productConfiginfoChildHtml").find(".id_" + $(this).data("configid") + "").css("display", "block");
                    $("#productConfiginfoChildHtml .id_" + $(this).data("configid") + "").find(".checkinput:eq(0)").prop("checked", true);
                    var checkedInfo = $("#productConfiginfoChildHtml .id_" + $(this).data("configid") + "").find(".checkinput:checked");
                    var model = {};//商品配置数据
                    objArr.push($(this).data("configname"));
                    //------操作数据------//
                    model = {
                        productConfigName: $(this).data("configname"),
                        configId: $(this).data("configid"),
                        info: addProductConfigInfoFn(checkedInfo)
                    }
                    productConfigArray.push(model);
                    addProductConfigTableRowFn(productConfigArray);
                    //------操作数据------//
                    falg = true;
                    appendProductTableInfoFn(objArr);
                } else
                {
                    falg = false;
                    $("#productConfiginfoChildHtml").find(".id_" + $(this).data("configid") + "").css("display", "none");
                    removeProductConfigTheadArray($(this).data("configname"));
                    appendProductTableInfoFn(objArr);
                    removeProductConfigArray($(this).data("configid"));
                    addProductConfigTableRowFn(productConfigArray);
                    $("#productConfiginfoChildHtml .id_" + $(this).data("configid") + "").find(".checkinput").prop("checked", false);
                }
            } else
            {
                layer.msg("至多只能选择三个自定义属性默认值");
                $(this).prop("checked", false);
            }
        });

        //添加多规格商品属性
        function appendProductTableInfoFn(objArr) {
            var theadHtml = '';
            var theadTr = '<th>货号</th><th>售价</th><th>库存</th><th class="text-center">操作</th>';
            if ($("#productConfiginfoHtml .iemeattributes.checkinput").prop("checked"))
            {
                theadTr = '<th>进货价</th><th>售价</th><th>库存</th><th class="text-center">操作</th>';
            }
            $("#productdetailthead").empty();
            if (objArr && objArr.length > 0) {//---------添加
                $.each(objArr, function (i, val) {
                    theadHtml += '<th class="configid' + val + '">' + val + '</th>';
                })
                $("#productdetailthead").prepend(theadHtml + theadTr);
            }
            var checkedLengths = $("#productConfiginfoHtml .checkinput:checked").length;
            if (checkedLengths > 0) {
                $("#productdetailthead").show(0);
            } else {
                $("#productdetailthead").hide(0);
            }
        }

        //点击多规格二级配置的方法
        $(document).delegate("#productConfiginfoChildHtml>li .checkinput", "click", function () {
            var configId = $(this).data("configid");
            var model = {}; //商品配置数据
            var checkedInfo = $("#productConfiginfoChildHtml .id_" + $(this).data("configid") + "").find(".checkinput:checked");
           //removeProductConfigArray(configId);
            if (checkedInfo && checkedInfo.length > 0) {
                model = {
                    productConfigName: $(this).data("configname"),
                    configId: $(this).data("configid"),
                    info: addProductConfigInfoFn(checkedInfo)
                }
                removeOrAddProductConfigArray(configId, model);
            } else {
                removeProductConfigArray(configId);
                removeProductConfigTheadArray($(this).data("configname"));
                appendProductTableInfoFn(objArr);
                //隐藏跟取消选中
                $("#productConfiginfoChildHtml .id_" + $(this).data("configid") + "").hide(0);
                $('#productConfiginfoHtml').find('.checkinput[data-configid="' + configId + '"]').prop("checked", false);
            }
            addProductConfigTableRowFn(productConfigArray);
        });

        //切割商品自定义字段的数组,并插入当前的位置
        function removeOrAddProductConfigArray(id,model) {
            if (productConfigArray && productConfigArray.length > 0) {
                for (i = 0; i < productConfigArray.length; i++) {
                    if (productConfigArray[i].configId == id) {
                        productConfigArray.splice(i,1,model);
                    }
                }
            }
        }

        //切割商品自定义字段的数组,并插入当前的位置
        function removeProductConfigArray(id) {
            if (productConfigArray && productConfigArray.length > 0) {
                for (i = 0; i < productConfigArray.length; i++) {
                    if (productConfigArray[i].configId == id) {
                        productConfigArray.splice(i,1);
                    }
                }
            }
        }

        //切割商品自定义表头的数组
        function removeProductConfigTheadArray(name) {
            if (objArr && objArr.length > 0) {
                for (i = 0; i < objArr.length; i++) {
                    if (objArr[i] == name) {
                        objArr.splice(i, 1);
                    }
                }
            }
        }

        //添加多规格属性的自定义的方法---叠加
        function addProductConfigInfoFn(obj) {
            var info = obj.map(function () {
                return {
                    id: $(this).data("configid"),
                    checkedInfo: $(this).data("detailname"),
                    detailId: $(this).data("detailid")
                }
            }).get();
            return info;
        }

        //添加行列值的转换
        function addProductConfigTableRowFn(productConfigArray) {
            var newProductConfigArray = new Array();
            if (productConfigArray) {
                if (productConfigArray.length == 1) {
                    for (var k = 0; k < productConfigArray[0].info.length; k++) {
                        var list = new Array();
                        list.push({ "configid": productConfigArray[0].configId, "detailid": productConfigArray[0].info[k].detailId, "detailname": productConfigArray[0].info[k].checkedInfo });
                        newProductConfigArray.push(list);
                    }
                }
                else if (productConfigArray.length == 2) {
                    for (var k = 0; k < productConfigArray[0].info.length; k++) {
                        for (var i = 0; i < productConfigArray[1].info.length; i++) {
                            var list = new Array();
                            list.push({ "configid": productConfigArray[0].configId, "detailid": productConfigArray[0].info[k].detailId, "detailname": productConfigArray[0].info[k].checkedInfo });
                            list.push({ "configid": productConfigArray[1].configId, "detailid": productConfigArray[1].info[i].detailId, "detailname": productConfigArray[1].info[i].checkedInfo });
                            newProductConfigArray.push(list);
                        }
                    }
                }
                else if (productConfigArray.length == 3) {
                    for (var k = 0; k < productConfigArray[0].info.length; k++) {
                        for (var i = 0; i < productConfigArray[1].info.length; i++) {
                            for (var j = 0; j < productConfigArray[2].info.length; j++) {
                                var list = new Array();
                                list.push({ "configid": productConfigArray[0].configId, "detailid": productConfigArray[0].info[k].detailId, "detailname": productConfigArray[0].info[k].checkedInfo });
                                list.push({ "configid": productConfigArray[1].configId, "detailid": productConfigArray[1].info[i].detailId, "detailname": productConfigArray[1].info[i].checkedInfo });
                                list.push({ "configid": productConfigArray[2].configId, "detailid": productConfigArray[2].info[j].detailId, "detailname": productConfigArray[2].info[j].checkedInfo });
                                newProductConfigArray.push(list);
                            }
                        }
                    }
                }
            }
            looprInsetProductConfigFn(newProductConfigArray);
        }

        //循环自定义商品插入table中---非数码行业
        function looprInsetProductConfigFn(arr) {

            $("#productDetailBody").empty();
            var productPrice = $("#sv_p_unitprice").val();
            var prdductSv_p_artno = $("#sv_p_artno").val();
            var productSv_p_storage = $("#sv_p_storage").val();
            if (arr && arr.length > 0) {
                var trFooterHtml = '<td><input class="form-control specificationinput2 sv_p_artno" type="text" name="" id="" value="' + prdductSv_p_artno + '" maxlength="20" placeholder="商品货号" /></td><td><input class="form-control specificationinput sv_p_unitprice" type="text" name="" id="" value="' + productPrice + '" placeholder="输入售价" /></td><td><input class="form-control specificationinput sv_p_storage" type="text" name="" id="" value="' + productSv_p_storage + '" placeholder="输入库存" /></td><td class="text-center"><button class="btn deletebtn productconfigdeletebtn">删除</button></td></tr>';//tr尾部的html
                for (var i = 0; i < arr.length; i++) {
                    var trCenterHtml = '';
                    var attributedetail_id = [];
                    var sv_p_specs = [];
                    for (var k = 0; k < arr[i].length; k++) {
                        attributedetail_id.push(arr[i][k].detailid);
                        sv_p_specs.push(arr[i][k].detailname);
                        trCenterHtml += '<td data-detailname="' + arr[i][k].detailname + '" data-detailid="' + arr[i][k].detailid + '" data-configid="' + arr[i][k].configid + '">' + arr[i][k].detailname + '</td>';
                    }
                    $("#productDetailBody").append('<tr class="productdetailtbodytr productdetailtbodytrEdit" data-id="' + i + '" data-attributedetail_id="' + attributedetail_id + '" data-sv_p_specs="' + sv_p_specs + '">' + trCenterHtml + trFooterHtml);//创建行
                }
            }
        }

                //插入串号添加数据---数码行业
        function InsetIEMIData(iemecode) {
            if ($(".productdetailtbodytr[data-sv_p_specs='" + iemecode + "']").length > 0)
            {
                layer.msg("当前串号已存在！");
                return false;
            }
            //检查店铺串号重复
            $.get("/AjaxProduct/CheckProductIEMICodeExist?sv_iemi_no=" + iemecode, function(data) {
                if (data == true)
                {
                    $("#sv_input_iemi").val("")
                    var arr = [[{ "configid": 0, "detailid": 0, "detailname": iemecode }]];
                    var productPrice = $("#sv_p_unitprice").val();
                    var prdductSv_p_originalprice = $("#sv_p_originalprice").val();
                    var productSv_p_storage = $("#sv_p_storage").val();
                    if (arr && arr.length > 0)
                    {
                        var trFooterHtml = '<td><input class="form-control specificationinput2 sv_p_originalprice" type="text" name="" id="" value="' + prdductSv_p_originalprice + '" maxlength="20" placeholder="进货价" /></td><td><input class="form-control specificationinput sv_p_unitprice" type="text" name="" id="" value="' + productPrice + '" placeholder="输入售价" /></td><td><input class="form-control specificationinput sv_p_storage" type="text" name="" id="" readonly="readonly" value="1" placeholder="输入库存" /></td><td class="text-center"><button class="btn deletebtn productconfigdeletebtn">删除</button></td></tr>';//tr尾部的html
                        for (var i = 0; i < arr.length; i++)
                        {
                            var trCenterHtml = '';
                            var attributedetail_id = [];
                            var sv_p_specs = [];
                            for (var k = 0; k < arr[i].length; k++)
                            {
                                attributedetail_id.push(arr[i][k].detailid);
                                sv_p_specs.push(arr[i][k].detailname);
                                trCenterHtml += '<td class="sv_iemi_no" data-detailname="' + arr[i][k].detailname + '" data-detailid="' + arr[i][k].detailid + '" data-configid="' + arr[i][k].configid + '">' + arr[i][k].detailname + '</td>';
                            }
                            $("#productDetailBody").prepend('<tr class="productdetailtbodytr productdetailtbodytrEdit" data-id="' + i + '" data-attributedetail_id="' + attributedetail_id + '" data-sv_p_specs="' + sv_p_specs + '">' + trCenterHtml + trFooterHtml);//创建行
                        }
                    }

                } else
                {
                    layer.msg("店铺已经存在当前串号！");
                    return false;
                }
            });


        }

        //插入串号数据---数码行业
        function InsetIEMIViewData(iemedata) {
            var iemecode = iemedata.sv_iemi_no;
            if (!iemedata.sv_iemi_no)
            {
                return false;
            }
            if ($(".productdetailtbodytr[data-sv_p_specs='" + iemecode + "']").length > 0)
            {
                layer.msg("当前串号已存在！");
                return false;
            }

            var arr = [[{ "configid": 0, "detailid": 0, "detailname": iemecode }]];
            var productPrice = iemedata.sv_p_unitprice;
            var prdductSv_p_originalprice = iemedata.sv_p_originalprice;
            var productSv_p_storage = iemedata.sv_p_storage;
            if (arr && arr.length > 0)
            {
                var trFooterHtml = '<td>' + prdductSv_p_originalprice + '</td><td>' + productPrice + '</td><td>' + productSv_p_storage + '</td><td class="text-center"><button class="btn deletebtn productconfigdeletebtn" bzid="' + iemedata.sv_iemi_id + '">删除</button></td></tr>';//tr尾部的html
                for (var i = 0; i < arr.length; i++)
                {
                    var trCenterHtml = '';
                    var attributedetail_id = [];
                    var sv_p_specs = [];
                    for (var k = 0; k < arr[i].length; k++)
                    {
                        attributedetail_id.push(arr[i][k].detailid);
                        sv_p_specs.push(arr[i][k].detailname);
                        trCenterHtml += '<td class="sv_iemi_no" data-detailname="' + arr[i][k].detailname + '" data-detailid="' + arr[i][k].detailid + '" data-configid="' + arr[i][k].configid + '">' + arr[i][k].detailname + '</td>';
                    }
                    $("#productDetailBody").prepend('<tr class="productdetailtbodytr productdetailtbodytrview" data-id="' + i + '" data-attributedetail_id="' + attributedetail_id + '" data-sv_p_specs="' + sv_p_specs + '">' + trCenterHtml + trFooterHtml);//创建行
                }
            }
        }

        //删除商品自定义行
        $(document).unbind("click","#productDetailBody .productconfigdeletebtn").on("click","#productDetailBody .productconfigdeletebtn", function () {

            var bzid = $(this).attr("bzid");
            if (bzid > 0)
            {
                //删除串号
                $.get('/AjaxProduct/DeleteProductIEMIDetail?id=' + bzid, function(data) {
                    if (data)
                    {
                        //删除成功
                        layer.msg("删除成功");
                        $("#productDetailBody .productconfigdeletebtn[bzid=" + bzid+ "]").parent().parent().remove();

                    } else
                    {
                        layer.msg("删除失败");
                        //删除失败
                    }
                });
            } else
            {
                layer.msg("删除成功");
                $(this).parent().parent().remove();
                if ($("#productDetailBody tr").length == 0 && _g_sv_uit_cache_name != "cache_name_mobile_digital")
                {
                    $("#display-specification").click();
                }
            }

        });

        //数码行业的串号新增--方法
        $(document).unbind("click", "#productIMEINumberAddBtn").on("click", "#productIMEINumberAddBtn", function () {
            var prdductSv_p_artno = $("#productIMEINumberInput").val();
            if (prdductSv_p_artno) {
                $("#productdetailthead").show();
                var trHtml = '<td>串号</td><td>进价</td><td>售价</td><td>数量</td><td>操作</td>';
                $("#productdetailthead").html(trHtml);
                addProductIMEINumberFn();
            }
            else {
                $("#productIMEINumberInput").focus();
                layer.msg("请输入串号，在执行此操作");
            }
        });

        //批量添加串号的方法
        function addProductIMEINumberFn() {
            var productPrice = $("#sv_p_unitprice").val();              //单价
            var prdductSv_p_artno = $("#productIMEINumberInput").val(); //串号
            var sv_p_originalprice = $("#sv_p_originalprice").val();    //进价
            var tdHtml = '<tr class="productdetailtbodytr" data-id="0" data-attributedetail_id="0" data-sv_p_specs="串号">';
            tdHtml += '<td><input class="form-control specificationinput2 sv_p_artno" type="text" name="" id="" value="' + prdductSv_p_artno + '" maxlength="" placeholder="商品串号"></td>';
            tdHtml += '<td><input class="form-control specificationinput sv_p_originalprice" type="text" name="" id="" value="' + sv_p_originalprice + '" placeholder="输入进价"></td>';
            tdHtml += '<td><input class="form-control specificationinput sv_p_unitprice" type="text" name="" id="" value="' + productPrice + '" placeholder="输入售价"></td>';
            tdHtml += '<td><input class="form-control specificationinput sv_p_storage" type="text" name="" id="" value="1" placeholder="输入库存"></td>';
            tdHtml += '<td class="text-center"><button class="btn deletebtn productconfigdeletebtn">删除</button></td></tr>';
            $("#productDetailBody").append(tdHtml);
        }

        //限制最低售价------最低折扣-------会员单价--------只能输入一个
        $(document).on("keyup",".sharelimitinput",function () {
            var thisValue = $(this).val();
            if (thisValue == "") {
                $(this).parent("li").siblings("li").find(".sharelimitinput").val("").prop("readonly", false);
            } else if (thisValue > 0) {
                $(this).parent("li").siblings("li").find(".sharelimitinput").val("0").prop("readonly", "readonly");
            }
            
        });

        //上传商品图片
        $(document).on("change", "#fileToUpload", function () {
            $.commonUploadImg("fileToUpload", "Product", "true", function (resultImgUrl) {
                if (resultImgUrl) {
                    $(".addmemberphoto2").css("display", "none");
                    $("#upload").css("display","block");
                    $("#upload").attr("src", _g_res_images_url + resultImgUrl);
                    var sv_p_images = $("#addProductForm input[type='hidden'][name='sv_p_images']").eq(0);
                    sv_p_images.val(resultImgUrl);
                }
            });
        });

        //修改多规格
        $(document).on("keyup", "#sv_p_specs", function () {
            $("#product_MoreSpecs").val($(this).val());
        });

        //---------------------修改商品信息------------------------//
        var thisProductId = "";//当前的商品的id
        //var productInfoJson = "";//存储当前单个商品的信息---json
        $(document).unbind("click", "#productlisthtml .editproductinfo").on("click", "#productlisthtml .editproductinfo", function () {
            thisProductId = $(this).data("product_id");
            layerpage.Deke_layerpage.show_Url2("1", "修改商品", "/Product/_PartialAddProduct_N3?buttonCode=btn_addprodcut_code", ['790px', '520px'], editProductLoadFn);
        });

        //修改商品的方法
        function editProductLoadFn() {
            getFirstCategroyFn(); //获取一级分类-- - 与二级联动
            getProductUnitOrDiscountFn();//获取会员的折扣、商品的单位
            getCateringKitchenPrinterList();//获取厨打方案
            selectexpirationdateTime("sv_p_expirationdate");//初始化过期时间
            var productInfoJson = getThisProductInfo();//获取修改商品的详细信息
            //-----------隐藏自定义字段-------------//
            $(".determinebtn-closebtn .setting").hide(0);
            $("#saveProductContinueOperation").hide(0);
            //-----------隐藏自定义字段-------------//
            if (productInfoJson != null) {//-----赋值给文本框
                $("#sv_p_storage").attr("readonly", true);
                for (var key in productInfoJson) {
                    if(key == "sv_p_adddate"){
                        var endTime = new Date(productInfoJson[key]).Format("yyyy-MM-dd");
                        var endTime = "";
                        if (endTime == "0001-01-01") {
                            endTime = "";
                        }
                        $("#" + key).val(endTime);
                    }else if(key == "sv_p_expirationdate" && isNullOrWhiteSpace(productInfoJson[key])){
                        if (productInfoJson[key].slice(0, 4) == "0001" || productInfoJson[key].slice(0, 4) == "9999") {
                            $("#" + key).val("");
                        } else {
                            $("#" + key).val(new Date(productInfoJson[key]).Format("yyyy-MM-dd"));
                        }
                    } else if (key == "productsubcategory_id")
                    {
                        var bl = false;
                        if (page_g_GetCategoryById_data && page_g_GetCategoryById_data.length > 0)
                        {
                            for (var i = 0; i < page_g_GetCategoryById_data.length; i++)
                            {
                                if (page_g_GetCategoryById_data[i].cid == productInfoJson["productcategory_id"])
                                {
                                    bl = true;
                                    GetCategoryByIdCallback(page_g_GetCategoryById_data[i].data);
                                    break;
                                }
                            }
                        }

                        if (!bl)//未查询
                        {
                            $.ajax({
                                url: '/AjaxProduct/GetCategoryById?cid=' + productInfoJson["productcategory_id"] + '&pange=1&count=1000',
                                method: 'get',
                                contentType: 'text/html',
                                async: false
                            }).done(function(result) {
                                page_g_GetCategoryById_data.push({ cid: productInfoJson["productcategory_id"], data: result });
                                GetCategoryByIdCallback(result);
                            });
                        }
                        //$.ajax({
                        //    url: '/AjaxProduct/GetCategoryById?cid=' + productInfoJson["productcategory_id"] + '&pange=1&count=1000',
                        //    method: 'get',
                        //    contentType: 'text/html',
                        //    async: false,
                        //    success: function (data) {
                        //        $(".secondCategory").empty();
                        //        $(".secondCategory").append('<option value="0">二级类别</option>');
                        //        for (var i in data) {
                        //            $(".secondCategory").append('<option value="' + data[i].productsubcategory_id + '">' + data[i].sv_psc_name + '</option>');
                        //        }
                        //    }



                        //});
                        $("#" + key).val(productInfoJson[key]);
                    } else if (key == "sv_p_images2") {
                        var sv_p_images = "";
                        if (productInfoJson[key] != null && productInfoJson[key] != '' && productInfoJson[key] != undefined && productInfoJson[key].indexOf('[{') >= 0 && productInfoJson[key].indexOf('}]') > 0) {
                            //子 格式"[{"code": "[]", "isdefault": true}]"
                            var childimage = $.parseJSON(productInfoJson[key]);
                            if (childimage != null && childimage[0].code != '[]' && childimage[0].code.indexOf('//') < 0) {
                                sv_p_images = childimage[0].code;
                            }
                        } else {
                            sv_p_images = productInfoJson[key];
                        }
                        $("#sv_p_images").val(sv_p_images);
                        if (sv_p_images) {
                            $(".addmemberphoto2").hide(0);
                            $("#upload").show(0);
                            $("#upload").attr("src", _g_res_images_url + sv_p_images);
                        }
                    } else if (key == "sv_p_memberprice" && productInfoJson[key] > 0) {
                        $("#" + key).val(productInfoJson[key]);
                        $("#sv_p_minunitprice,#sv_p_mindiscount").attr("readonly", "readonly");
                    } else if (key == "sv_p_minunitprice" && productInfoJson[key] > 0) {
                        $("#" + key).val(productInfoJson[key]);
                        $("#sv_p_memberprice,#sv_p_mindiscount").attr("readonly", "readonly");
                    } else if (key == "sv_p_mindiscount" && productInfoJson[key] > 0) {
                        $("#" + key).val(productInfoJson[key]);
                        $("#sv_p_memberprice,#sv_p_minunitprice").attr("readonly", "readonly");
                    } else if (key == "productMoreSpecs" && productInfoJson["sv_is_morespecs"] && productInfoJson[key].length > 0) {
                        $("#product_MoreSpecs").val(productInfoJson["sv_p_specs"]);
                    } else if (key == "sv_pricing_method") {
                        if (productInfoJson["sv_pricing_method"] > 0) {
                            $("#Weightswitch").prop("checked", true);
                        }
                        $("#Weightswitch").prop("disabled",true);
                    } else if (key == "sv_product_attr_data") {

                    }else {
                        if (!productInfoJson["sv_is_morespecs"]) {
                            $(".More_Specs").show();
                            if (_g_sv_uit_cache_name != "cache_name_mobile_digital") {
                                $("#display-specification").hide(0);
                            }
                            $("#productMoreSpecs").hide(0);
                        }
                        $("#" + key).val(productInfoJson[key]);
                    }
                }
                getProductCustomInfo(productInfoJson["product_id"]);
            }
            //-----------显示串号信息--------------//
            if (_g_sv_uit_cache_name == "cache_name_mobile_digital" && productInfoJson.sv_has_iemino) //数码行业
            {
                var productConfiginfoHtml = '<div class=" setattributes fl"><input data-configname="串号" data-configid="0" type="checkbox" checked readonly disabled class="checkinput mar iemeattributes" name="" id="0" value="" /><label for="0">串号</label></div><input type="text" class="form-control" name="sv_input_iemi" id="sv_input_iemi" value="" placeholder="输入串号，按Enter键添加">';
                $("#productConfiginfoHtml").html(productConfiginfoHtml);
                //显示串号标题信息
                var trHtml = '<td>串号</td><td>进价</td><td>售价</td><td>数量</td><td>操作</td>';
                $("#productdetailthead").html(trHtml);
                $("#productdetailthead").css("display", "table-row");


                $(".more-specification").slideToggle(150);
                for (var i = 0; i < productInfoJson.imeis.length; i++)
                {
                    InsetIEMIViewData(productInfoJson.imeis[i]);
                }

                $("#sv_input_iemi").keypress(function(event) {//添加新的串号
                    if (event.keyCode == 13)
                    {
                        InsetIEMIData($(this).val());
                    }
                });
            }
    }

        //获取修改商品的详细信息
        function getThisProductInfo() {
            var productInfoJson = "";//赋值给当个商品的json数据
            $.ajax({
                url: '/AjaxProduct/GetProductDetail?id=' + thisProductId,
                type: 'get',
                async: false
            }).done(function (data) {
                if (data != null)
                {
                    fillerProductType(data.producttype_id);//根据商品的类型来隐藏某些字段或显示
                    productInfoJson = data;
                }
            });
            return productInfoJson;
        }

        //根据商品的类型来隐藏某些字段或显示
        function fillerProductType(type) {
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
                $('#power_id_sv_pricing_method').hide(0);//计重
                $('#power_id_sv_p_expirationdate').hide(0);//过期时间
                $('#power_id_sv_p_storage').hide(0);//库存
                $('#power_id_sv_p_originalprice').hide(0);//进价
                $("#addProductPackage").hide(0);//计重
            }
        }
        //---------------------修改商品信息------------------------//
    },

    //添加商品的保存方法
    saveNewProductInfo: function (isContinue) {
        //保存商品并新增按钮的事件
        var addProductSwitch = true;    //添加商品的默认开关
        var sv_p_commissiontype = $("#sv_p_commissiontype").val() || 0; //提成配置的类型--- 元、%
        var sv_p_commissionratio = $("#sv_p_commissionratio").val().replace(/\ +/g, "");    //商品提成的金额
        //判断是否开启了提成
        if ($("#sv_p_commissionratio").parent().css("display") !== "none") {
            if (sv_p_commissiontype && isNaN(sv_p_commissionratio)) {
                layer.msg("输入的提成配置不是数字,请重新输入");
                addProductSwitch = false;
                return;
            }
        }
        //选择分类---id
        var fristCategoryId = $("#productcategory_id").val().replace(/\ +/g, "");
        if (fristCategoryId == "0") {
            layer.msg("还未选择分类，请选择分类");
            addProductSwitch = false;
            return;
        }
        //商品编码
        var sv_p_barcode = $("#sv_p_barcode");
        var product_sv_p_barcode = $("#sv_p_barcode").val().replace(/\ +/g, "");
        if (product_sv_p_barcode == "" || product_sv_p_barcode == null || product_sv_p_barcode == undefined) {
            layer.msg("商品编码还没有输入!");
            sv_p_barcode.focus();
            addProductSwitch = false;
            return;
        }

        //--商品编码不为空的时候------并检测商品的编码---长度与是否重复------//
        if (product_sv_p_barcode.length > 20) {
            layer.msg("编码最多只能输入20位字符！");
            sv_p_barcode.focus();
            addProductSwitch = false;
            return;
        } else {
            $.ajax({
                url: '/AjaxProduct/IsBarcodeExist?barcode=' + product_sv_p_barcode + '&product_id=' + $("#addProductForm input[type='hidden'][name='product_id']").eq(0).val(),
                type: 'post',
                contentType: 'application/json',
                async: false
            }).done(function (result) {
                if (result.succeed) {
                    layer.msg("商品编码重复，请修改");
                    sv_p_barcode.focus();
                    addProductSwitch = false;
                    return;
                }
            });
        }

        //商品库存
        var sv_p_storage = $("#sv_p_storage").val().replace(/\ +/g, "");
        if (sv_p_storage > 999999) {
            layer.msg("库存最大不能超过百万");
            return;
        }

        //商品助词码
        var sv_mnemonic_code = $('#sv_mnemonic_code').val().trim();
        if (sv_mnemonic_code != null && sv_mnemonic_code != '' && sv_mnemonic_code != undefined && sv_mnemonic_code.length > 15) {
            $('#sv_mnemonic_code').focus();
            layer.msg("助词码最多只能输入15位字符！");
            addProductSwitch = false;
            return;
        }
        //debugger;
        //商品的名称
        var product_sv_p_name = $('#sv_p_name').val().replace(/\ +/g, "");
        if (product_sv_p_name == "" || product_sv_p_name == null || product_sv_p_name == undefined) {
            layer.msg("商品名称还没有输入，请输入!");
            $('#sv_p_name').focus();
            addProductSwitch = false;
            return;
        }
        $("#sv_p_name").val(ClearBr($("#sv_p_name").val()));
        if (addProductSwitch) {
            //自定义字段
            var customizeList = new Array();
  
            if ($('#customFieldHtml>li.productcustom input').length > 0) {
                customizeList = $('#customFieldHtml>li.productcustom input').map(function (index, value) {
                    return {
                        sv_field_id: $(this).data('id'),
                        sv_field_value: $(this).val(),
                        sv_relation_id: $(this).data('relationid')
                    }
                }).get();
            }
            //是否新增多规格的
            var switchCounts = 0;//模拟新增多规格开关
            var customdDetailList = "";
            var addProductJson = '{"CustomFieldList":"","productCustomdDetailList":"",';//添加商品的json
            var addProductType = "";//添加商品的类型 --AddProductlist多规格，AddProduct默认添加的 ， AddIEMIProduct添加数码IEMI商品
            if ($("#productDetailBody tr").length > 0)
            {//多规格

                if ($("#productConfiginfoHtml .iemeattributes.checkinput").prop("checked"))
                {
                    customdDetailList = getCustomDetailJsonDataFn();
                    $("#sv_p_specs").val($("#product_MoreSpecs").val() || $("#sv_p_specs").val());
                    var _fromData = $("#addProductForm").serializeArray();
                    $.each(_fromData, function(i, field) {
                        addProductJson += '"' + field.name + '":"' + field.value + '",';
                    });
                    addProductJson += '"producttype_id":"' + $("#productcategory_id").find("option[value='" + $("#productcategory_id").val() + "']").attr("data-type") + '"';
                    addProductJson = addProductJson + "}";
                    addProductType = "AddIEMIProduct"; //串号商品添加
                } else
                {
                    customdDetailList = getCustomDetailJsonDataFn();
                    addProductType = "AddProductlist";
                    addProductJson = addProductJson.replace(/\,$/, "") + "}";
                }

            }else{//默认新增的
                $("#sv_p_specs").val($("#product_MoreSpecs").val() || $("#sv_p_specs").val());
                var _fromData = $("#addProductForm").serializeArray();
                $.each(_fromData, function (i, field) {
                    addProductJson += '"' + field.name + '":"' + field.value + '",';
                });
                addProductJson += '"producttype_id":"' + $("#productcategory_id").find("option[value='" + $("#productcategory_id").val() + "']").attr("data-type") + '"';
                addProductJson = addProductJson + "}";
                addProductType = "AddProduct";
            }
            addProductJson = JSON.parse(addProductJson);//转化为json格式
            customizeList = JSON.stringify(customizeList);
            addProductJson.CustomFieldList = JSON.parse(customizeList);
            addProductJson.productCustomdDetailList = customdDetailList;//多规格
            var sv_pricing_method = $("#Weightswitch").is(":checked") == true ? 1 : 0;//是否为计重商品 1计重，0费计重
            var sv_product_integral = $("#sv_product_integral").val();//商品获得的积分
            addProductJson.sv_product_integral = sv_product_integral;//插入积分字段
            addProductJson.sv_pricing_method = sv_pricing_method;//是否为计重字段
            if (!addProductJson.product_id) {
                addProductJson.product_id = 0;
            }
            if (!addProductJson.sv_p_unitprice) {
                addProductJson.sv_p_unitprice = 0;
            }
            if (!addProductJson.sv_p_originalprice) {
                addProductJson.sv_p_originalprice = 0;
            }
            if (!addProductJson.sv_p_storage) {
                addProductJson.sv_p_storage = 0;
            }
            if (!addProductJson.sv_p_discount) {
                addProductJson.sv_p_discount = 0;
            }
            if (!addProductJson.sv_p_minunitprice) {
                addProductJson.sv_p_minunitprice = 0;
            }
            if (!addProductJson.sv_p_mindiscount) {
                addProductJson.sv_p_mindiscount = 0;
            }
            if (!addProductJson.sv_p_memberprice) {
                addProductJson.sv_p_memberprice = 0;
            }

            if (!addProductJson.sv_cheprod_datenum) {
                addProductJson.sv_cheprod_datenum = 0;
            }
            addProductJson.sv_p_barcode = product_sv_p_barcode; // 商品的编码
            addProductJson.sv_has_iemino = $("#productConfiginfoHtml .iemeattributes.checkinput").prop("checked");
            addProductJson.sv_p_artno = $("#sv_p_artno").val().replace(/\ +/g, "");//商品的货号
            addProductJson.sv_p_isn = $("#sv_p_artno").val().replace(/\ +/g, "");
            addProductJson.sv_p_commissiontype = $("#sv_p_commissiontype").val().replace(/\ +/g, "") || 0;//商品提成类型
            addProductJson.sv_p_commissionratio = $("#sv_p_commissionratio").val().replace(/\ +/g, "");//产品提成
            addProductJson.more_barcode = $("#sv_more_barcode_info").val();//一品多码
            addProductJson.combination = $("#combinationBarcodeInfo").val();//组合商品123456789
            addProductJson.combination_type = _g_data_package_type;//包装组合的类型
            addProductJson.sv_qr_code_image_path = $("#sv_product_attr_data").val().trim();//追溯码 
            if (g_TraceabilityCode && $("#sv_product_attr_data").val()) {
                addProductJson.sv_product_attr_data = $("#sv_product_attr_data").val();//追溯码
                if ($("#sv_product_attr_data").val()) {
                    addProductJson.sv_qr_code_image_path = $("#sv_product_attr_data").val();//追溯码
                    disableButtonById('saveProduct');//禁用按钮
                    //post商品
                    $.ajax({
                        url: '/AjaxProduct/' + addProductType,
                        type: 'post',
                        data: JSON.stringify(addProductJson),
                        contentType: 'application/json',
                        async: false,
                        cache: false
                    }).done(function(data) {
                        debugger;
                        if (data == true) {
                            readyProductList.shareFilter(null, "NotByName");
                            enabledButtonById('saveProduct');
                            layer.closeAll();
                            layer.msg("保存成功", {
                                icon: 1, //图标
                                time: 800   //2秒关闭(如果不配置,默认是3秒)
                            }, function () {
                                if (isContinue) { // 继续操作
                                    $('#addNewProduct').click(); // 清空新增的信息
                                }
                                else {
                                    layer.closeAll();
                                }
                            });
                            //--自动编码
                            if (g_AutomaticallyGenerateProductBarcode) {
                                if ($("#product_id").val() == null || $("#product_id").val() == "") {//修改会员时id不自动加一
                                    setAutoIdplusOne("是否自动生成商品编码", "AutomaticallyGenerateProductBarcode", "AutomaticallyGenerateProductBarcode");
                                }
                            }
                        } else if (data == -2) {
                            layer.msg("你没有该操作权限");
                            enabledButtonById('saveProduct');
                            layer.close(index);
                        } else if (data == -4) {
                            layer.msg("编码重复");
                            sv_p_barcode.focus();
                            enabledButtonById('saveProduct');
                        } else
                        {
                            layer.msg("操作失败，请刷新重试");
                            enabledButtonById('saveProduct');
                        }
                    });
                    layer.close(index);
                    return;
                }
            } else {
                disableButtonById('saveProduct');
                //post商品
                $.ajax({
                    url: '/AjaxProduct/' + addProductType,
                    type: 'post',
                    data: JSON.stringify(addProductJson),
                    contentType: 'application/json',
                    async: false,
                    cache: false
                }).done(function (data) {
                    if (data == true) {
                        readyProductList.shareFilter(null, "NotByName");
                        enabledButtonById('saveProduct');
                        layer.closeAll();
                        layer.msg("保存成功", {
                            icon: 1, //图标
                            time: 800   //2秒关闭(如果不配置,默认是3秒)
                        }, function () {
                            if (isContinue) { // 继续操作
                                $('#addNewProduct').click(); // 清空新增的信息
                            }
                            else {
                                layer.closeAll();
                            }
                        });
                        //-----自动编码
                        if (g_AutomaticallyGenerateProductBarcode) {
                            if ($("#product_id").val() == null || $("#product_id").val() == "") {//修改会员时id不自动加一
                                setAutoIdplusOne("是否自动生成商品编码", "AutomaticallyGenerateProductBarcode", "AutomaticallyGenerateProductBarcode");
                            }
                        }
                    } else if (data == -2) {
                        layer.msg("你没有该操作权限");
                        enabledButtonById('saveProduct');
                        layer.close(index);
                    } else if (data == -4) {
                        layer.msg("编码重复");
                        sv_p_barcode.focus();
                        enabledButtonById('saveProduct');
                    } else if (data && data.succeed == false)
                    {
                        layer.msg("操作失败，存在重复串号：【" + data.values + "】");
                        enabledButtonById('saveProduct');
                    } else
                    {
                        layer.msg("操作失败，请刷新重试");
                        enabledButtonById('saveProduct');
                    }
                });
                layer.close(index);
                return;
            }
        }

        //去除空格--换行--单双引号
        function ClearBr(key) {
            //去除换行 
            key = key.replace(/<\/?.+?>/g, "");
            key = key.replace(/[\r\n]/g, "");
            //去除空格 
            key = key.replace(/\s+/g, " ");
            //单引换双引
            // key = key.replace(/'/ig, "''")
            return key;
        }

        //获取商品自定义的json的数据
        function getCustomDetailJsonDataFn() {
            var getCustomDetailJsonData = $("#productDetailBody tr.productdetailtbodytrEdit").map(function(index, data) {
                
                //-------售价--------//
                var productPrice = "";//商品售价
                var price = $(this).find(".sv_p_unitprice").val().replace(/\ +/g, "");
                if (price != null && price != undefined && price != "") {
                    productPrice = price;
                } else {
                    productPrice = $("#sv_p_unitprice").val().replace(/\ +/g, "");
                }
                //-------进货价--------//
                var productsv_p_originalprice = "";//商品售价
                if ($(this).find(".sv_p_originalprice") && $(this).find(".sv_p_originalprice").val())
                {
                    var _sv_p_originalprice = ($(this).find(".sv_p_originalprice").val() || 0).replace(/\ +/g, "");
                    if (_sv_p_originalprice != null && _sv_p_originalprice != undefined && _sv_p_originalprice != "")
                    {
                        productsv_p_originalprice = _sv_p_originalprice;
                    } else
                    {
                        productsv_p_originalprice = ($("#sv_p_originalprice").val() || 0).replace(/\ +/g, "");
                    }
                }
                //-------库存--------//
                var productStorage = "";
                if ($(this).find(".sv_p_storage") && $(this).find(".sv_p_storage").val())
                {
                    var storage = ($(this).find(".sv_p_storage").val() || 0).replace(/\ +/g, "");
                    if (storage != null && storage != undefined && storage != "")
                    {
                        productStorage = storage;
                    } else
                    {
                        productStorage = $("#sv_p_storage").val().replace(/\ +/g, "");
                    }
                }

                //-------货号--------//
                var productArtno = "";
                if ($(this).find(".sv_p_artno") && $(this).find(".sv_p_artno").val())
                {
                    var artno = $(this).find(".sv_p_artno").val().replace(/\ +/g, "");
                    if (artno != null && artno != undefined && artno != "")
                    {
                        productArtno = artno;
                    } else
                    {
                        productArtno = $("#sv_p_artno").val().replace(/\ +/g, "");
                    }
                }
                //debugger;
                var product_sv_iemi_no = "";
                if ($(this).find(".sv_iemi_no") && $(this).find(".sv_iemi_no").html())
                {
                    var sv_iemi_no = $(this).find(".sv_iemi_no").html().replace(/\ +/g, "");
                    if (sv_iemi_no != null && sv_iemi_no != undefined && sv_iemi_no != "")
                    {
                        product_sv_iemi_no = sv_iemi_no;
                    } 
                }
                //-------串号--------//
                return {
                    "attributedetail_id": $(this).data("attributedetail_id"),
                    "productcategory_id": $("#productcategory_id").val(),         //一级分类id
                    "productsubcategory_id": $("#productsubcategory_id").val(),   //二级分类
                    "sv_mnemonic_code": $('#sv_mnemonic_code').val().trim(),      //助词码
                    "sv_p_artno": productArtno,//货号
                    "sv_p_images": $("#sv_p_images").val(),
                    "sv_p_barcode": $("#sv_p_barcode").val(),
                    "sv_p_commissionratio": $("#sv_p_commissionratio").val().replace(/\ +/g, "") || 0,
                    "sv_p_commissiontype": $("#sv_p_commissiontype").val(),
                    "sv_p_expirationdate": $("#sv_p_expirationdate").val(),
                    "sv_p_memberprice": $("#sv_p_memberprice").val().replace(/\ +/g, "") || 0,
                    "sv_p_mindiscount": $("#sv_p_mindiscount").val().replace(/\ +/g, "") || 0,
                    "sv_p_minunitprice": $("#sv_p_minunitprice").val().replace(/\ +/g, "") || 0,
                    "sv_p_name": $("#sv_p_name").val().replace(/\ +/g, ""),
                    "sv_p_originalprice": productsv_p_originalprice || ( $("#sv_p_originalprice").val().replace(/\ +/g, "") || 0),
                    "sv_p_remark": $("#sv_p_remark").val().replace(/\ +/g, ""),
                    "sv_p_specs": $(this).data("sv_p_specs"),//规格信息
                    "sv_p_storage": productStorage || 0,//库存
                    "sv_p_unit": $("#sv_p_unit").val(),
                    "sv_p_unitprice": productPrice || 0,//商品售价
                    "sv_pricing_method": $("#Weightswitch").is(":checked") == true ? 1 : 0,
                    "sv_iemi_no": product_sv_iemi_no
                }
            }).get();
            return getCustomDetailJsonData;
        }
    },

    //导入、导出商品列表
    updowmproductlist: function () {
        var _g_ImportExecl_productlist_data = "";//存储导入的数据信息
        var strPath = "";//上传文件的路径
        //导入商品列表
        $(document).on("click", "#productlistinfo .updowmproductlist", function () {
            layerpage.Deke_layerpage.show_Url2("1", "导入商品", "/ajaxHtml_N3/product/updowmproductlist.html?=" + getTimeStamp(), ['740px', '500px'],null);
        });

        //导入商品
        $(document).on('change', "#fileToUpload3", function () {
            _g_ImportExecl_productlist_data = null;
            $.commonUploadExelFile('fileToUpload3', '/api/Product/ImportExecl', function (data) {

                if (data.Message == "-2") {
                    layer.msg("你没有该操作权限！");
                } else if (data.Message == "-5") {
                    layer.msg("上传文件失败,表格存在相同的编码！");
                }
                else if (data.Message == "-6") {
                    layer.msg("上传文件失败,表格存在库存数量为负的！");
                }
                else if (data.Success) {
                    if (data.Message != "" && data.Message != null && data.Message.indexOf("表格数据有误") >= 0) {
                        layer.msg(data.Url);
                    } else {
                        if (data.Data != "" && data.Data != null) {
                            _g_ImportExecl_productlist_data = data.Data;
                            strPath = data.Url;
                            if (_g_ImportExecl_productlist_data) {
                                layerpage.Deke_layerpage.getpage3("导入商品列表", "/ajaxHtml_N3/Product/dowmproductview.html?v=" + getTimeStamp(), viewProductInfo, ['85%', '520px'], "viewproductpage");
                            }

                        } else {
                            layer.msg("上传文件失败,表格数据有误！");
                        }
                    }

                }
                else {
                    if (data.Message != "" && data.Message != null && data.Message.indexOf("不属于表") > 0) {
                        layer.msg("上传文件失败！" + data.Message + "请下载最新商品导入模板");
                    } else {
                        layer.msg("表格数据有误,上传文件失败！");
                    }
                }
            });
        });

        //保存
        $(document).unbind("click", "#saveProductListbtn").on("click", "#saveProductListbtn", function () {
            saveProductList();
        });

        //保存导入的商品信息
        function saveProductList() {
            disableButtonById("saveProductListbtn");
            $("#progressbarbox .progress").show();
            $.getJSON("/Product/SaveProduct/", { strPath: strPath }, function (data) {
                if (data.success) {
                    if (isNullOrWhiteSpace(data.message)) {
                        if (isNullOrWhiteSpace(data.url)) {
                            layer.msg("保存成功！但是存在错误数据,点击下方连接查看");
                            $("#errordata").show();
                            $("#errordata").val(data.url);
                            $("#errordata").attr("href", data.url);
                            $("#progressbarbox .progress").hide();
                            enabledButtonById("saveProductListbtn");
                        } else {
                            layer.msg("保存失败！请联系负责人");
                            $("#progressbarbox .progress").hide();
                            enabledButtonById("saveProductListbtn");
                        }
                    } else {
                        layer.msg("保存成功", {
                            icon: 1, //图标
                            time: 2000   //2秒关闭(如果不配置,默认是3秒)
                        }, function () {
                            layer.closeAll();
                        });
                        readyProductList.shareFilter(null, "NotByName", null);
                    }
                } else {
                    if (isNullOrWhiteSpace(data.message)) {
                        $("#progressbarbox .progress").hide();
                        enabledButtonById("saveProductListbtn");
                        if (isNullOrWhiteSpace(data.url)) {
                            layer.msg("保存失败！详情请点击下方连接查看");
                            $("#errordata").show();
                            $("#errordata").val(data.url);
                            $("#errordata").attr("href", data.url)
                        } else {
                            layer.msg("保存失败！请联系负责人");
                        }
                    } else {
                        $("#progressbarbox .progress").hide();
                        enabledButtonById("saveProductListbtn");
                        layer.msg("保存失败！" + data.message);
                    }
                }
            });
        }

        //加载导入的商品信息
        function viewProductInfo() {
            $("#viewproductpage .layui-layer-setwin").css("display", "none");//隐藏关闭按钮
            var layerIndex = layer.index;//layerpage的索引----等下取消按钮用到
            var data = _g_ImportExecl_productlist_data;
            var html = "";
            if (data != undefined && data.length>0) {
                for (var i = 0; i < data.length; i++) {
                    html += '<tr data-sv_p_barcode="' + data[i].sv_p_barcode + '" data-sv_p_name="' + data[i].sv_p_name + '" data-sv_p_unitprice="' + data[i].sv_p_unitprice + '" ';
                    html += 'data-sv_p_originalprice="' + data[i].sv_p_originalprice + '" data-sv_p_storage="' + data[i].sv_p_storage + '" data-sv_p_specs="' + data[i].sv_p_specs + '" ';
                    html += 'data-sv_p_adddate="' + data[i].sv_p_adddate + '" data-sv_p_remark="' + data[i].sv_p_remark + '" data-productsubcategory_id="' + data[i].productsubcategory_id + '" ';
                    html += 'data-sv_p_unit ="' + data[i].sv_p_unit + '" data-sv_p_status ="' + data[i].sv_p_status + '" data-sv_p_expirationdate="' + data[i].sv_p_expirationdate + '" data-sv_p_memberprice="' + data[i].sv_p_memberprice + '" ';
                    html += 'data-sv_p_minunitprice="' + data[i].sv_p_minunitprice + '" data-sv_p_mindiscount="' + data[i].sv_p_mindiscount + '" data-sv_pricing_method="' + data[i].sv_pricing_method + '" data-sv_p_total_weight="' + data[i].sv_p_total_weight + '" ';
                    html += 'data-sv_pc_name="' + data[i].sv_pc_name + '">';
                    html += '<td>' + data[i].sv_pc_name + '</td>';
                    html += '<td class="minhide">' + data[i].sv_psc_name + '</td>';
                    html += '<td>' + data[i].sv_product_brand + '</td>';
                    html += '<td>' + data[i].sv_p_barcode + '</td>';
                    html += '<td class="amountcolor2">' + data[i].sv_p_name + '</td>';
                    html += '<td class="minhide">' + data[i].sv_mnemonic_code + '</td>';
                    html += '<td>' + data[i].sv_p_originalprice + '</td>';
                    html += '<td class="colorff">¥' + parseFloat(data[i].sv_p_unitprice).toFixed(2) + '</td>';
                    html += '<td class="minhide">' + data[i].sv_p_unit + '</td>';
                    if (data[i].sv_pricing_method == 1) {
                        html += '<td>' + data[i].sv_p_total_weight + '</td>';
                    } else {
                        html += '<td>' + data[i].sv_p_storage + '</td>';
                    }
                    html += '<td>' + data[i].sv_p_specs + '</td>';
                    if (isNullOrWhiteSpace(data[i].sv_p_expirationdate)) {
                        if (data[i].sv_p_expirationdate.slice(0, 4) == "0001" || data[i].sv_p_expirationdate.slice(0, 4) == "9999") {
                            html += '<td></td>';
                        } else {

                            html += '<td>' + new Date(data[i].sv_p_expirationdate).Format("yyyy-MM-dd") + '</td>';
                        }
                    } else {
                        html += '<td></td>';
                    }
                    html += '<td>' + data[i].sv_p_memberprice + '</td>';
                    html += '<td>' + data[i].sv_p_minunitprice + '</td>';
                    html += '<td>' + data[i].sv_p_mindiscount + '</td>';
                    html += '<td class="minhide">' + data[i].sv_p_remark + '</td>';
                    html += '</tr>';
                }
                $("#viewProductInfoListhtml").html(html);
            }
            closeLayerPageById(layerIndex, "closeviewproduct");
        }
        //导出模板
        $(document).unbind("click", ".producttemplate").on("click", ".producttemplate", function () {
            if (_g_sv_uit_cache_name == 'cache_name_catering') {
                commonDownloadFile("http://decerp.cc/Templete/菜品导入模板.xls");
            } else {
                commonDownloadFile("http://decerp.cc/Templete/商品导入模板.xls");
            }
        });
    },
    uploadproductlist: function () {
        $(document).unbind("click", "#uploadproductlistbtn").on("click", "#uploadproductlistbtn", function () {
            var productStatus = "0"; //商品上下架状态
            var firstCategory = "0"; //一级分类
            var storage = "0";       //库存
            var addproductdate = "0";//添加商品的时间
            var productSearch = $("#productSearch").val().replace(/\ +/g, ""); //商品的模糊查询
            var secondCategory = "0";  //二级分类
            var filterSwitch = $("#memberfilter").hasClass("open");//检测是否打开了筛选的下拉
            if (filterSwitch) {
                productStatus = $("#chosen").find("[data-name='statusFilter']").data("id") == null ? "0" : $("#chosen").find("[data-name='statusFilter']").data("id");
                firstCategory = $("#chosen").find("[data-name='firstCategory']").data("id") == null ? "0" : $("#chosen").find("[data-name='firstCategory']").data("id");
                secondCategory = $("#chosen").find("[data-name='secondCategory']").data("id") == null ? "0" : $("#chosen").find("[data-name='secondCategory']").data("id");
                storage = $("#chosen").find("[data-name='storageFilter']").data("id") == null ? "0" : $("#chosen").find("[data-name='storageFilter']").data("id");
                if (storage == -1) {
                    storage = $("#chosen").find("[data-name='storageFilter']").data("number");
                }
                addproductdate = $("#chosen").find("[data-name='adddateFilter']").data("id") == null ? "0" : $("#chosen").find("[data-name='adddateFilter']").data("id");
                if (addproductdate == -1) {
                    addproductdate = $("#chosen").find("[data-name='adddateFilter']").data("querydate");
                }
                productSearch = "";
            }
            $.getJSON("/Product/ExportData", {
                "status": productStatus,
                "category": firstCategory,
                "storage": storage,
                "adddate": addproductdate,
                "name": productSearch,
                "erjicategory": secondCategory
            }, function (data) {
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
                                    layer.msg("数据导出失败: " + error);
                                },
                                {
                                    myPrintImg: data
                                }
                            );
                        } catch (e) {
                            layer.msg("数据导出失败: " + e.message);
                        }
                    } else {
                        location.href = data;
                    }
                } else {
                    layer.msg("数据导出失败！");
                }
            })

        });
    }
}

//-------联动修改商品的售价、库存、货号----公共的方法-------//
function changeInputTextFn(obj, val) {
    if (_g_sv_uit_cache_name == "cache_name_mobile_digital") {
        if (obj != "sv_p_storage") {
            $("." + obj).val(val);
        }
    }
    else {
        $("." + obj).val(val);
    }
    
}


//查看商品的详情
$(document).unbind("click", "#productlisthtml .productdetailedinfo").on("click", "#productlisthtml .productdetailedinfo", function () {
    var product_id = $(this).data("product_id");
    layerpage.Deke_layerpage.getpage2("1", '商品《'+ $(this).text() +'》详情', "/ajaxHtml_N3/product/productinfo.html?=" + getTimeStamp(), ['740px', '520px'], getPriductInfo, product_id);
});

//获取商品的详情
function getPriductInfo(parameter) {
    $("#hidden_product_id").val(parameter);
    $.ajax({
        url: '/AjaxProduct/GetProductDetail?id=' + parameter,
        type: 'get',
        dataType: "json",
        success: function(data) {
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
            console.log(data);
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
            getProductTraceData(parameter);//追溯码
            getGyslist(parameter);
            getOrderList(parameter);
            getIEMINoList(parameter)
        }
    });
}

//追溯码
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
                    $('#sv_product_attr_data').text(data);
                }
            }
        });
    } else {
        $('#sv_product_attr_data_li').hide();
    }
}

//导航移动事件
$(document).unbind('click', '#memberinfolistnav>li').on('click', '#memberinfolistnav>li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var index = $('#memberinfolistnav li').index(this);
    $('.memberinfocontent').eq(index).fadeIn(100).siblings().fadeOut(0);
    var liLen = 92.5;//宽度
    var left = $(this).index() * liLen + 1;//跟随的位置的左距离
    $('.border-bottom').animate({ left: left + 'px' }, 300);
});

//获取商品销售信息
function getGyslist(id) {
    var name = $("#gysName").val();
    $.ajax({
        url: '/AjaxProduct/Getv_procurement_prlist?id=' + $("#hidden_product_id").val() + '&name=' + name,
        type: 'get',
        dataType: "json",
        success: function (data) {
            if (data && data.length>0) {
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
                    htmls += "<td>" + (i + 1) + "</td>";
                    htmls += "<td>" + data[i].sv_pc_date + "</td>";
                    htmls += "<td>" + uname + "</td>";
                    htmls += "<td>" + data[i].sv_p_specs + "</td>";
                    htmls += "<td>" + data[i].sv_pc_pnumber + "</td>";
                    htmls += "<td>" + data[i].sv_pc_price + "</td>";
                    htmls += "</tr>";
                }
                $('#orderlist').html(htmls);
            } else {
                $("#orderlist").html('<tr><td class="text-center sad" style="text-align:center !important" colspan="6"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>');
            }
        }
    });
}

//获取供应商信息
function getOrderList(id) {
    var name = $("#kyName").val();
    $.ajax({
        url: '/AjaxProduct/Getsv_productOrderList?id=' + $("#hidden_product_id").val() + '&name=' + name,
        type: 'get',
        dataType: "json",
        success: function (data) {
            if (data && data.length > 0) {
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
                    htmls += "<td>" + data[i].product_num + "</td>";
                    htmls += "<td>" + data[i].product_unitprice + "</td>";
                    htmls += "<td>" + (data[i].sv_remark || "") + "</td>";
                    htmls += "</tr>";
                }
                $('#dataitemList').html(htmls);
            } else {
                $("#dataitemList").html('<tr><td class="text-center sad" style="text-align:center !important" colspan="6"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>');
            }
        }
    });
}

$(document).on("keyup", "#kyName", function(e) {
    if (e.keyCode == 13)
    {
        getOrderList();
    }
});

$(document).on("keyup", "#gysName", function(e) {
    if (e.keyCode == 13)
    {
        getGyslist();
    }
});

$(document).on("keyup", "#iemino", function(e) {
    if (e.keyCode == 13)
    {
        getIEMINoList();
    }
});
//----获取IEMI串号列表
function getIEMINoList(id) {
    var name = $("#iemino").val();
    $.ajax({
        url: '/AjaxProduct/Getsv_productIEMIList?id=' + $("#hidden_product_id").val() + '&name=' + name,
        type: 'get',
        dataType: "json",
        success: function(data) {
            if (data && data.length > 0) {
                var htmls = "";
                for (var i = 0; i < data.length; i++) {
                    htmls += "<tr>";
                    htmls += "<td>" + (i + 1) + "</td>";
                    htmls += "<td>" + data[i].sv_iemi_no + "</td>";
                    htmls += "<td>" + data[i].sv_p_originalprice + "</td>";
                    htmls += "<td>" + data[i].sv_p_unitprice + "</td>";
                    htmls += "<td>" + data[i].sv_p_storage + "</td>";
                    if (data[i].sv_creation_date)
                    {
                        htmls += "<td>" +(new Date(data[i].sv_creation_date).Format("yyyy-MM-dd hh:mm:ss") || '') + "</td>";
                    } else {

                        htmls += "<td></td>";
                    }

                    htmls += "</tr>";
                }
                $('#ieminolist').html(htmls);
            } else {
                $("#ieminolist").html('<tr><td class="text-center sad" style="text-align:center !important" colspan="6"><img src="../skin_N3/images/sad.png" /><i class="padd0">暂无数据</i></td></tr>');
            }
        }
    });
}