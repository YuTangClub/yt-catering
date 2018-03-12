// 房台管理（桌位管理)
$(function () {
    getpageCateringRegionList(1, '');
    pageCateringTable(0, '', '');
});

//单个checkbox选中取消
$(document).unbind("click", ".check-box").on("click", ".check-box", function () {
    $("#userid").val($(this).find("input").data("user_id"));
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
        $("#userid").val("");
        $(this).find("input").prop("checked", false);
        $(this).removeClass('checkedBox');
        $("#checkAll").find("input").prop("checked", false);
        $("#checkAll").removeClass('checkedBox');
    }
    if ($(".checkedBox").length > 0) {
        $(".unlinks li").addClass("active");
    } else {
        $(".unlinks li").removeClass("active");
    }
});

// --------- 餐饮店区域信息-------// 

$('#txtCateringRegion').keypress(function (event) {
    if (event.keyCode == 13) {
        $('#btnCateringRegion').click();
    }
});

// 添加区域
$('#btnCateringRegion').click(function () {
    var sv_region_id = $('#txtCateringRegion').attr('data-id');
    var sv_region_name = $('#txtCateringRegion').val().replace(/\ +/g, "");
    if (!isNullOrWhiteSpace(sv_region_name)) {
        $('#txtCateringRegion').focus();
        layer.msg('区域名称不能为空！');
        return;
    }
    if (sv_region_name.length > 25) {
        $('#txtCateringRegion').focus();
        layer.msg('区域名称不能大于25个字符！');
        return;
    }
    $.postAsyncJson('/CateringRegion/OperateCateringRegion', {
        sv_region_id: sv_region_id,
        sv_region_name: sv_region_name,
        sv_enabled: true,
        sv_remark: ''
    }, function (result) {
        if (result.succeed) {
            commondResultMsg('保存成功区域信息', 1, 800);
            $('#txtCateringRegion').val('');
            getpageCateringRegionList(1, '');
        }
        else {
            $('#txtCateringRegion').val('');
            commondResultMsg(result.errmsg, 2, 800);
        }
    });
});


// 读取区域数据列表，暂时不做分页
function getpageCateringRegionList(pageIndex, seachStr) {
    var cateringRegionListHtml = '';
    $.getAsyncJson('/CateringRegion/GetCateringRegionPageList', {
        pageIndex: pageIndex,
        pageSize: 100,
        seachStr: seachStr
    }, function (data) {
        if (data.succeed) {
            var cateringRegionData = data.values;
            if (cateringRegionData && cateringRegionData.length > 0) {
                for (var i = 0; i < cateringRegionData.length; i++) {
                    //cateringRegionListHtml += ' <li data-id="' + cateringRegionData[i].sv_region_id + '" data-name="' + cateringRegionData[i].sv_region_name + '"><a href="javascript:void(0)"><i class="posic "></i>' + cateringRegionData[i].sv_region_name + '</a></li>';
                    cateringRegionListHtml += '<li data-id="' + cateringRegionData[i].sv_region_id + '" data-name="' + cateringRegionData[i].sv_region_name + '">';
                    cateringRegionListHtml += '<div class="bigCategorieslist-name"><i class="icon-stop stop-type"></i><span>' + cateringRegionData[i].sv_region_name + '</span></div>';
                    cateringRegionListHtml += '<div class="editbigCategorieslist">';
                    cateringRegionListHtml += '<a href="javascript:void(0);" class="editcateringRegionList" data-id="' + cateringRegionData[i].sv_region_id + '" data-name="' + cateringRegionData[i].sv_region_name + '"><i class="icon-edit"></i></a>';
                    cateringRegionListHtml += '<a href="javascript:void(0);" class="DeleteCateringRegion " data-id="' + cateringRegionData[i].sv_region_id + '" data-name="' + cateringRegionData[i].sv_region_name + '"><i class="icon-remove"></i></a>';
                    cateringRegionListHtml += '</div></li>';
                }
            }
        }
        else {
            commondResultMsg(data.errmsg);
        }
        $('#cateringRegionListHtml').html(cateringRegionListHtml);
    });
}

// 点击区域名称
$(document).on('click', '#cateringRegionListHtml li', function () {
    $(this).addClass("active").siblings("li").removeClass("active");
    var regionId = $(this).attr('data-id');
    pageCateringTable(regionId, '', '');
});

//修改区域的名称
var editcateringRegionListHtml = '<div class="determine"><input type="text" class="form-control" id="_regionName" placeholder="输入房台名称" /></div><footer class="determinebtn-closebtn"><div class="btnbox fr"><button type="button" class="btn btn-success review-btn" id="btnEditRegion">确定</button><button type="button" class="btn btn-default closepage">取消</button></div></footer>';

$(document).unbind("click", ".editcateringRegionList").on("click", ".editcateringRegionList", function () {
    var _regionName = $(this).attr('data-name');
    var _regionId = $(this).attr('data-id');
    layer.open({
        area: ['420px', '240px'],
        btn: false,
        content: editcateringRegionListHtml
    });
    $("#_regionName").val(_regionName);
    $("#_regionName").attr('data-id', _regionId);
    btnEditRegion();
});
//修改区域名称保存
function btnEditRegion() {
    $(document).on("click", "#btnEditRegion", function () {
        var sv_region_id = $('#_regionName').attr('data-id');
        var sv_region_name = $('#_regionName').val().replace(/\ +/g, "");
        if (!isNullOrWhiteSpace(sv_region_name)) {
            $('#_regionName').focus();
            layer.msg('区域名称不能为空！');
            return;
        }
        if (sv_region_name.length > 25) {
            $('#_regionName').focus();
            layer.msg('区域名称不能大于25个字符！');
            return;
        }
        $.postAsyncJson('/CateringRegion/OperateCateringRegion', {
            sv_region_id: sv_region_id,
            sv_region_name: sv_region_name,
            sv_enabled: true,
            sv_remark: ''
        }, function (result) {
            if (result.succeed) {
                commondResultMsg('保存成功区域信息', 1, 800);
                $('#_regionName').val('');
                getpageCateringRegionList(1, '');
            }
            else {
                $('#_regionName').val('');
                commondResultMsg(result.errmsg, 2, 800);
            }
        });
    });
}

//删除区域
$(document).on("click", ".DeleteCateringRegion ", function () {
    var deleteCateringRegion_id = $(this).attr("data-id");
    var region_name = $(this).attr("data-name");
    var data_ = 2;
    if (deleteCateringRegion_id > 0) {
        if (data_ > 0) {
            layer.confirm('是否删除“' + region_name + '”这个区域及区域下所有的房台数据！', {
                btn: ['是', '否'] //按钮
            }, function () {
                $.postAsyncJson('/CateringRegion/DeleteCateringRegion', { regionId: deleteCateringRegion_id }, function (result) {
                    if (result.succeed) {
                        commondResultMsg('删除区域成功！', 1, 1500);
                        getpageCateringRegionList(1, '');
                        pageCateringTable(0, '', '');
                    }
                    else {
                        commondResultMsg(result.errmsg, 2, 1500);
                    }
                });
            }, function () {

            });
        } else {
            commondResultMsg('该区域有房台正在使用中，不能删除！', 3, 1500);
        }
    } else {
        commondResultMsg('请选择要删除的房台', 3, 1500);
    }
});

//鼠标移动桌台区域上的显示的
$(document).on("mouseover", "#cateringRegionListHtml li", function () {
    $(this).addClass("showbg");
    $(this).children(".editbigCategorieslist").addClass("show");
    $(this).children(".bigCategorieslist-name").addClass("paddright");
});

$(document).on("mouseout", "#cateringRegionListHtml li", function () {
    $(this).removeClass("showbg");
    if ($(this).hasClass("active")) {

    } else {
        $(this).children(".editbigCategorieslist").removeClass("show");
        $(this).children(".bigCategorieslist-name").removeClass("paddright");
    }
});

// --------- 餐饮店区域信息-------// 


// --------- 餐饮店房台信息-------// 
// 新增房台
$('#btnOpenTableEditWindows').click(function () {
    Deke.DeKe_dialog.show_Url2('新增房台', '/CateringTable/_PartialOperateTable?tableId=0', areaTnformationFn, ['400px', '350px']);
});

function areaTnformationFn() {
    var _region_id = $("#cateringRegionListHtml li.active").attr("data-id");
    $("#sv_region_id").find('option[value=' + _region_id + ']').attr("selected", true);
}

// 保存房台信息
$(document).unbind("click", "#btnSaveTable").on("click", "#btnSaveTable", function () {
    var isNumber = /^\+?[0-9][0-9]*$/;
    var sv_table_name = $('#sv_table_name').val().replace(/\ +/g, "");
    var sv_table_number = $('#sv_table_number').val().replace(/\ +/g, "");
    var sv_table_sort = $('#sv_table_sort').val().replace(/\ +/g, "");
    var sv_region_id = $('#sv_region_id').val();
    var sv_enabled = $('#sv_enabled').is(':checked');
    var sv_table_id = $('#sv_table_id').val();
    var sv_batch_add_number = $('#sv_batch_add_number').val();
    var isBatchAddTable = eval($('#isBatchAddTable').val());
    if (!isBatchAddTable && !isNullOrWhiteSpace(sv_table_name)) {
        layer.msg('请输入房台名称');
        $('#sv_table_name').focus();
        return;
    }
    if (isBatchAddTable && !isNullOrWhiteSpace(sv_table_name)) {
        layer.msg('请输入房台前缀');
        $('#sv_table_name').focus();
        return;
    }
    if (isBatchAddTable && sv_table_name.length > 2) {
        layer.msg('请输入2个字符以内的数字或字母！');
        $('#sv_table_name').focus();
        return;
    }
    if (!isBatchAddTable && sv_table_name.length > 20) {
        layer.msg('房台名称字符长度不能超过20个字！');
        $('#sv_table_name').focus();
        return;
    }
    if (!isNullOrWhiteSpace(sv_table_number)) {
        layer.msg('请输入容纳人数！');
        $('#sv_table_number').focus();
        return;
    }
    if (parseInt(sv_table_number) <= 0) {
        layer.msg('请输入大于零的容纳人数！');
        $('#sv_table_number').focus();
        return;
    }
    if (!isNumber.test(sv_table_number)) {
        layer.msg('请输入正确的容纳人数且为正整数！');
        $('#sv_table_number').focus();
        return;
    }
    if (isBatchAddTable && !isNullOrWhiteSpace(sv_batch_add_number)) {
        layer.msg('请输入要批量增加房台的数量！');
        $('#sv_batch_add_number').focus();
        return;
    }
    if (isBatchAddTable && (parseInt(sv_batch_add_number) <= 0 || parseInt(sv_batch_add_number) > 100)) {
        layer.msg('批量增加房台的数量只能输入1到100');
        $('#sv_batch_add_number').focus();
        return;
    }
    if (!isNumber.test(sv_table_sort)) {
        layer.msg('请输入正确的排序数字且为正整数！');
        return;
    }
    if (sv_region_id == 0 || sv_region_id == '0') {
        layer.msg('请选择房台所属区域！');
        return;
    }
    var loadIndex = commonOpenLoading();
    $.postAsyncJson('/CateringTable/OperateTable',
    {
        sv_table_id: sv_table_id,
        sv_table_name: sv_table_name,
        sv_table_number: sv_table_number,
        sv_table_sort: sv_table_sort,
        sv_region_id: sv_region_id,
        sv_store_user_id: user_id,
        sv_enabled: sv_enabled,
        sv_batch_add_number: sv_batch_add_number,
        isBatchAddTable: isBatchAddTable
    }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed) {
            if (isBatchAddTable && result.errmsg != null && result.errmsg != '') {
                commondResultMsg(result.errmsg, 1, 3000);
            }
            else {
                commondResultMsg('保存房台信息成功', 1, 2000);
            }
            var region_id = $('#cateringRegionListHtml li.active').attr('data-id');
            if (isNullOrWhiteSpace(region_id)) {
                pageCateringTable(region_id, '', '');
            }
            else {
                pageCateringTable(0, '', '');
            }
            setTimeout(function () {
                layer.closeAll();
            }, 500);
        }
        else {
            if (result.errmsg == null) {
                commondResultMsg('保存失败请稍后重试', 2, 1000);
                setTimeout(function () {
                    layer.closeAll();
                }, 500);
            }
            else {
                commondResultMsg(result.errmsg, 2, 1000);
                setTimeout(function () {
                    layer.closeAll();
                }, 500);
            }
        }
    });
});

//批量增加房台
$(document).on("click", "#btnBatchOpenTableEditWindows", function () {
    Deke.DeKe_dialog.show_Url2('批量增加房台', '/CateringTable/_PartialOperateTable?tableId=0&&isBatchAdd=true', funcBatchOpenTable, ['400px', '410px']);
});

// 批量增加房台回调
function funcBatchOpenTable() {
    var region_id = $('#cateringRegionListHtml li.active').attr('data-id');
    if (isNullOrWhiteSpace(region_id)) {
        $('#sv_region_id').val(region_id);
    }
}

// 加载分页插件
function pageCateringTable(regionId, seachStr, storeUserId) {
    var pageSize = 16;
    // 初始化分页内容
    $.get("/CateringTable/GetCateringTableTotal/", {
        regionId: regionId,
        seachStr: seachStr,
        storeUserId: storeUserId
    }, function (data) {
        if (data.succeed) {
            var i = Math.ceil(data.values / pageSize);
            laypage({
                cont: $('#pageCateringTableList'), //容器。值支持id名、原生dom对象，jquery对象,
                pages: i, //总页数
                skin: 'molv', //皮肤
                first: '首页', //若不显示，设置false即可
                last: '尾页', //若不显示，设置false即可
                prev: '上一页', //若不显示，设置false即可
                next: '下一页', //若不显示，设置false即可
                jump: function (e, first) {
                    getCateringTablePageList(regionId, e.curr, pageSize, seachStr, storeUserId);
                }
            });
        }
    });
}

// 分页读取房台数据
function getCateringTablePageList(regionId, pageIndex, pageSize, seachStr, storeUserId) {
    var cateringTableListHtml = '';
    var loadIndex = commonOpenLoading();
    $.getAsyncJson('/CateringTable/GetCateringTablePageList', {
        regionId: regionId,
        pageIndex: pageIndex,
        pageSize: pageSize,
        seachStr: seachStr,
        storeUserId: storeUserId
    }, function (result) {
        commonCloseLoading(loadIndex);
        if (result.succeed && result.values != null && result.values.length > 0) {
            var cateringTableData = result.values;
            for (var i = 0; i < cateringTableData.length; i++) {
                var sv_enabled = cateringTableData[i].sv_enabled == true ? '启用' : '停用';
                var sv_table_using_state = cateringTableData[i].sv_table_using_state == 0 ? '空闲' : '营业中';
                cateringTableListHtml += '<li class="col-xs-4 col-sm-4 col-md-3">';
                cateringTableListHtml += '<div class="tablelcenter">';
                cateringTableListHtml += '<span class="number">' + cateringTableData[i].sv_table_name + '</span>';
                cateringTableListHtml += '<div class="edittablel">';
                cateringTableListHtml += '<i class="icon-edit edittype updateCateringTable" data-state="' + sv_table_using_state + '" data-id="' + cateringTableData[i].sv_table_id + '"></i>';
                cateringTableListHtml += '<i class="icon-remove edittype btnDeleteCateringTable" data-state="' + sv_table_using_state + '" data-id="' + cateringTableData[i].sv_table_id + '"></i>';
                cateringTableListHtml += '</div>';
                if (cateringTableData[i].sv_enabled) {
                    cateringTableListHtml += '<div class="shopstatus"><span class="enabled">' + sv_enabled + '</span></div>';
                } else {
                    cateringTableListHtml += '<div class="shopstatus"><span class="stop">' + sv_enabled + '</span></div>';
                }
                cateringTableListHtml += '<div class="Businessstatus" style="width: 50%;"><span class="use">' + sv_table_using_state + '</span></div>';
                cateringTableListHtml += '<div class="Businessstatus1" style="width: 50%;"><button type="button" class="btn  icon-qrcode" data-id="' + cateringTableData[i].sv_table_id + '" data-name="' + cateringTableData[i].sv_table_name + '"></button></div>';
                cateringTableListHtml += '</div></li>';
            }
            $('#cateringTableListHtml').html(cateringTableListHtml);
        }
        else {
            //commondResultMsg(result.errmsg, 1, 600);
            var region_id = $('#cateringRegionListHtml li.active').attr('data-id');
            if (region_id > 0) {
                $('#cateringTableListHtml').html('<li>该区域还没有添加房台！</li>');
            }
            else {
                $('#cateringTableListHtml').html('<li>还没有添加房台！</li>');
            }
        }
    });
}

// 编辑房台信息
$(document).on("click", ".updateCateringTable", function () {
    var id = $(this).attr('data-id');
    if (id > 0) {
        Deke.DeKe_dialog.show_Url2('修改房台', '/CateringTable/_PartialOperateTable?tableId=' + id, tableEditInfo(), ['400px', '350px']);
    }
    else {
        commondResultMsg('请选择编辑的房台', 3, 3000);
    }
});

function tableEditInfo() {

}


// 删除房台信息
$(document).on("click", ".btnDeleteCateringTable", function () {
    var id = $(this).attr('data-id');
    var state = $(this).attr('data-state');
    if (id > 0) {
        layer.confirm('是否确认删除该房台？', {
            btn: ['是', '否'] //按钮
        }, function () {
            if (state == 1) {
                commondResultMsg('该房台正在营业中不能进行删除操作！', 2, 1500);
            }
            else {
                $.postAsyncJson('/CateringTable/DeleteTable', { tableId: id }, function (result) {
                    if (result.succeed) {
                        commondResultMsg('删除房台成功！', 1, 1500);

                        var region_id = $('#cateringRegionListHtml li.active').attr('data-id');
                        if (isNullOrWhiteSpace(region_id)) {
                            pageCateringTable(region_id, '', '');
                        }
                        else {
                            pageCateringTable(0, '', '');
                        }
                    }
                    else {
                        commondResultMsg(result.errmsg, 2, 1500);
                    }
                });
            }
        }, function () {

        });
    }
    else {
        commondResultMsg('请选择要删除的房台', 3, 1500);
    }
});

// 刷新房台信息
$('#refreshCateringTable').click(function () {
    pageCateringTable(0, '', '');
});

// 取消添加或编辑
$(document).unbind("click", "#btnCancel").on("click", "#btnCancel", function () {
    layer.closeAll();
});

// 按店铺筛选房台
$('#StoreShopList').change(function () {
    var storeShopListUserId = $(this).val();
    var region_id = $('#cateringRegionListHtml li.active').attr('data-id');
    if (isNullOrWhiteSpace(region_id)) {
        pageCateringTable(region_id, '', storeShopListUserId);
    }
    else {
        pageCateringTable(0, '', storeShopListUserId);
    }
});

// 查询房台信息
$('#btnSeachTable').keypress(function (event) {
    if (event.keyCode == 13) {
        var seachStr = $(this).val().replace(/\ +/g, "");
        if (isNullOrWhiteSpace(seachStr)) {
            pageCateringTable(0, seachStr, '');
        }
        else {
            commondResultMsg('请输入要查询的房台名称', 3, 800);
        }
    }
});
// --------- 餐饮店房台信息-------// 

// 生成房台扫码图片
// GenerateCodeToBase64Img

$(document).unbind("click", "#cateringTableListHtml>li .icon-qrcode").on("click", "#cateringTableListHtml>li .icon-qrcode", function () {
    var tableId = $(this).attr('data-id');
    var tableName = $(this).attr('data-name');
    if (tableId > 0) {
        $.post('/CateringTable/GenerateCodeToBase64Img', { tableId: tableId }, function (data) {
            if (data) {
                var scanPay = "<div class=\"wxsaosao\"><div><br></div><img src=" + data + " width=\"240\" class=\"bbimg\"><div style=\"text-align:center;\"><a href=" + data + " target=\"_blank\">下载图片</a></div></div>";
                layer.open({
                    type: 1,
                    title: tableName + '二维码',
                    area: ['400px', '400px'],
                    content: scanPay
                });
            }
            else {
                layer.msg('生成二维码失败，请刷新后再试');
            }
        });
    }
});

// 批量下载房台二维码压缩文件
$('#btnBatchOpenTableDownLoad').click(function () {
    var loadIndex = commonOpenLoading();
    $.post('https://res.decerp.cc/api/Images/DownLoadCateringTableImgs?userId=' + user_id, function (result) {
        commonCloseLoading(loadIndex);
        if (result && result.succeed) {
            commonDownloadFile("https://res.decerp.cc" + result.values);
        }
        else {
            layer.msg('下载失败，请稍后再试！');
        }
    });
});