// 定义一个新的复制对象
var clip = new ZeroClipboard(document.getElementById("copyLink"), {
    moviePath: "/js/zeroclipboard.swf"
});

// 复制内容到剪贴板成功后的操作
clip.on('complete', function (client, args) {
    layer.msg("复制成功到粘贴板！");
});

// 二维码生成
function makeTwoCode() {
    $('#makeTwoCode').click(function () {
        $.postHtml('/WeiXin/Seveqcode', null, function (data) {
            $('#codeImg').attr('src', data);
        });
    });
}

//  重置会员卡图片
function resetCard_img() {
    $('#resetCard_img').click(function () {
        $('#card_img').attr('src', '');
    });
}

//  重置会卡员背景图片
function resetCard_Bgimg() {
    $('#resetCard_bgimg').click(function () {
        $('#card_bgimg').attr('src', '');
    });
}

// 保存会员卡配置信息
function btnSaveCard() {
    $('#btnSaveCard').click(function () {

        var card_viewproject = $(".ritianshu div.on").data("id");
        if ($(".ritianshu div.on").length == 2) {
            card_viewproject = 2;
        }

        var data = {
            card_name: $('#card_name').val().trim(),
            card_live: $('#card_live').val(),
            card_namecolor: $('#card_namecolor').val().trim(),
            card_numcolor: $('#card_numcolor').val().trim(),
            card_bgimg: $('#card_bgimg').attr('src'),
            card_img: $('#card_img').attr('src'),
            card_viewproject: card_viewproject,
            prefix: $('#card_prefix').val().trim(),
            startDigit: $('#card_startDigit').val().trim(),
            digitalLength: $('#card_digitalLength').val().trim(),
            filter: $('#card_filter').val().trim()
        };
        disableButton('btnSaveCard');
        $.postAsyncJson('/WeiXin/SaveCard', data, function (data) {
            if (data == true) {
                enabledButton('btnSaveCard');
                layer.msg("微信会员信息保存成功！");
            }
            else if (data == false) {
                enabledButton('btnSaveCard');
                layer.msg("微信会员信息保存失败，请稍后重试！");
            }
            else if (data == -2) {
                enabledButton('btnSaveCard');
                layer.msg("你没有该操作权限！");
            }
        });
    });
}

// 读取会员卡号规则和设置
function card_rules() {
    //if (!isNullOrWhiteSpace($('#card_prefix').val().trim())) {
    //    $('#autoCard').val(1);
    //    $('#prefix').attr("disabled", "disabled");
    //    $('#startDigit').attr("disabled", "disabled");
    //    $('#digitalLength').attr("disabled", "disabled");
    //    $('#filter').attr("disabled", "disabled");
    //}
    //else {
    //    $('#prefix').val($('#card_prefix').val().trim());
    //    $('#startDigit').val($('#card_startDigit').val().trim());
    //    $('#digitalLength').val($('#card_digitalLength').val().trim());
    //    $('#filter').val($('#card_filter').val().trim());
    //}
    $('#btnCard_rules').click(function () {
        var prefix = $('#prefix').val().trim();
        var startDigit = $('#startDigit').val().trim();
        var digitalLength = $('#digitalLength').val().trim();
        var filter = $('#filter').val().trim();
        if ($('#autoCard').val() == 0) {
            if (!isNullOrWhiteSpace(prefix)) {
                $('#prefix').focus();
                layer.msg("卡号前缀不能为空！");
            }
            else if (!isNullOrWhiteSpace(startDigit)) {
                $('#startDigit').focus();
                layer.msg("卡号起始数字不能为空！");
            }
            else if (!isNullOrWhiteSpace(digitalLength)) {
                $('#digitalLength').focus();
                layer.msg("卡号数字长度不能为空！");
            }
            else if (!isNullOrWhiteSpace(filter)) {
                $('#filter').focus();
                layer.msg("卡号过滤不能为空！");
            }
            else {
                $('#card_prefix').val(prefix);
                $('#card_startDigit').val(startDigit);
                $('#card_digitalLength').val(digitalLength);
                $('#card_filter').val(filter);
                layer.close(index);
            }
        } else {
            $('#card_prefix').val('');
            $('#card_startDigit').val('');
            $('#card_digitalLength').val('');
            $('#card_filter').val('');
            layer.close(index);
        }
    });

    $('#btnCancel').click(function () {
        layer.close(index);
    });

    $('#autoCard').change(function () {
        if ($(this).val() == 0) {
            $('#prefix').attr("disabled", "disabled");
            $('#startDigit').attr("disabled", "disabled");
            $('#digitalLength').attr("disabled", "disabled");
            $('#filter').attr("disabled", "disabled");
            //$('#prefix').val('');
            //$('#startDigit').val('');
            //$('#digitalLength').val('');
            //$('#filter').val('');
        } else {
            $('#prefix').removeAttr("disabled");
            $('#startDigit').removeAttr("disabled");
            $('#digitalLength').removeAttr("disabled");
            $('#filter').removeAttr("disabled");
        }
    });
}

// 设置会员卡卡图片
function setCard_img() {
    $('#btnSetCard_img').click(function () {
        var img = $('.active img').attr('src');
        $('#card_img').attr('src', img);
        $('.card-kp .cradkpshow .carddd.theme ').css("background-image", "url(" + _g_res_images_url + img + ")");
        layer.close(index);
    });
    $('#cancelCard_img').click(function () {
        layer.close(index);
    });
}

// 设置会员卡背景图片
function setCard_bgimg() {
    $('#btnSetCard_bgimg').click(function () {
        var img = $('.active img').attr('src');
        $('#card_bgimg').attr('src', img);
        $(".card-kp .cradbg").css("background", "url(" + img + ")");
        layer.close(index);
    });
    $('#cancelCard_bgimg').click(function () {
        layer.close(index);
    });
}

$(document).ready(function () {
    btnSaveCard();
    resetCard_img();
    resetCard_Bgimg();
    makeTwoCode();


    //先读取级别列表

    $("#ziykp").click(function () {
        Deke.DeKe_dialog.show_Url2("选择会员卡", "/Html/UserCard/Select_img.html?v=16756456456", setCard_img, ["700px", "480px;"]);
    });

    $("#ziybjxz").click(function () {
        Deke.DeKe_dialog.show_Url2("选择背景", "/Html/UserCard/Select_Bg.html?v=" + clearCache + 1, setCard_bgimg, ["700px", "480px;"]);
    });

    $("#szkagz").click(function () {
        Deke.DeKe_dialog.show_Url2("会员卡号规则设置", "/Html/UserCard/card_rolrs.html?v=" + clearCache, card_rules, ["500px", "480px;"]);
    });

    // 读取会员卡信息
    $.getJSON("/WeiXin/GetCardCf", function (data) {
        for (var i = 0; i < data.livelist.length; i++) {
            $("#card_live").append('<option value="' + data.livelist[i].memberlevel_id + '">' + data.livelist[i].sv_ml_name + '</option>');
        }
        for (var key in data.list) {
            if (key == "card_numcolor") {
                if (data.list[key] == null || data.list[key] == '') {
                    $("#card_numcolor").minicolors({
                        change: function () {
                            $("#numtitle").css("color", $("#card_numcolor").val());
                        },
                        position: 'top right',
                        defaultValue: '#000000'
                    });
                } else {
                    $("#card_numcolor").minicolors({
                        change: function () {
                            $("#numtitle").css("color", $("#card_numcolor").val());
                        },
                        position: 'top right',
                        defaultValue: data.list[key]
                    });
                }
            }

            if (key == 'card_viewproject') {
                $(".ritianshu div").removeClass("on");
                if (data.list[key] == 2) {
                    $(".ritianshu div").addClass("on");
                } else {
                    $(".ritianshu div").eq(data.list[key]).addClass("on");
                }
            }

            if (key == 'rules') {
                $('#card_prefix').val(data.list[key].prefix);
                $('#card_startDigit').val(data.list[key].startDigit);
                $('#card_digitalLength').val(data.list[key].digitalLength);
                $('#card_filter').val(data.list[key].filter);
            }

            if (key == 'card_img') {
                if (isNullOrWhiteSpace(data.list[key])) {
                    if (data.list[key].indexOf("http://") >= 0) {
                        $('#card_img').attr('src', data.list[key]);
                        $('.card-kp .cradkpshow .carddd.theme ').css("background-image", "url(" + data.list[key] + ")");
                    } else {
                        $('#card_img').attr('src', _g_res_images_url + data.list[key]);
                        $('.card-kp .cradkpshow .carddd.theme ').css("background-image", "url(" + _g_res_images_url + data.list[key] + ")");
                    }
                }
            }
            if (key == 'card_bgimg') {
                if (isNullOrWhiteSpace(data.list[key])) {
                    if (data.list[key].indexOf("http://") >= 0) {
                        $('#card_bgimg').attr('src', data.list[key]);
                        $(".card-kp .cradbg").css("background", "url(" + data.list[key] + ")");
                    } else {
                        $('#card_bgimg').attr('src', _g_res_images_url + data.list[key]);
                        $(".card-kp .cradbg").css("background", "url(" + _g_res_images_url + data.list[key] + ")");
                    }
                }
            }
            if (key == "card_namecolor") {
                if (data.list[key] == null || data.list[key] == '') {
                    $("#card_namecolor").minicolors({
                        change: function () {
                            $("#titlename").css("color", '#000000');
                        },
                        position: 'top right',
                        defaultValue: '#000000'
                    });
                } else {
                    $("#card_namecolor").minicolors({
                        change: function () {
                            $("#titlename").css("color", $("#card_namecolor").val());
                        },
                        position: 'top right',
                        defaultValue: data.list[key]
                    });
                }
            }
            $("#" + key).val(data.list[key]);
        }
        $("#titlename").css("color", $("#card_namecolor").val());
        $("#titlename").text($("#card_name").val());
        $("#numtitle").css("color", $("#card_numcolor").val());
    });

    $("#card_name").keyup(function () {
        $("#titlename").text($("#card_name").val());
    });

    $(document).on("click", ".zdybjuise li", function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('.stecs i').click(function () {
        $(this).parent().toggleClass('on').siblings();
    });

    //选择文件之后执行上传
    $(document).on('change', "#fileCard_bgimg", function () {
        $.commonUploadImg('fileCard_bgimg', "MemberCard", "true", function (resultImgUrl) {
            $('#card_bgimg').attr('src', _g_res_images_url + resultImgUrl);
            $(".card-kp .cradbg").css("background", "url(" + _g_res_images_url + resultImgUrl + ")");
        });
    });

    //选择文件之后执行上传
    $(document).on('change', "#fileCard_img", function () {
        $.commonUploadImg('fileCard_img', "MemberCard", "true", function (resultImgUrl) {
            if (resultImgUrl) {
                $('#card_img').attr('src', _g_res_images_url + resultImgUrl);
                $(".cradkpshow .carddd").css("background", "url(" + _g_res_images_url + resultImgUrl + ")");
            }
        });
    });
});