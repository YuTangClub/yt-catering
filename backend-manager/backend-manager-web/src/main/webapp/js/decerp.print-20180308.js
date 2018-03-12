var printData = null;
var isDebug = true;
var g_android_print_config = null;
var custormTracePrintSwitch = false;
//----------------打印调用方法（打印数据、模板）
//----------------除默认打印，调用自定义打印模板，需要根据店铺设置来处理打印数据，即店铺可设置自有的打印模板
//----------------打印数据：pfData,配置数据:configData
function test_pushprintData(spfData, sconfig, ptype) {

    //打印时间、销售时间的转换
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "/" + fnW((month + 1)) + "/" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);

    var pfData = JSON.parse(spfData);
    var config = JSON.parse(sconfig);
    if (config && config.cof && config.cof.sv_uc_dayin)
    {
        var PrintConfig = JSON.parse(config.cof.sv_uc_dayin);
        if (PrintConfig != '[]' && PrintConfig != "" && PrintConfig != null)
        {
            ptype = PrintConfig.xiaopiao == 58 ? 0 : 1;
        }
    }
    //if (config && config.cof && config.cof.sv_pfconfig && config.cof.sv_pfconfig.length > 10) {
    if (config && config.cof && config.cof.sv_pfconfig)
    {
        try
        {
            var configData = JSON.parse(config.cof.sv_pfconfig);
            var postData = {
                //-------------头部数据-----------------
                "HeaderList": [],
                //-------------中部数据-----------------
                "BodyList": [],
                //-------------标题数据-----------------
                "TitleList": [],
                //-------------页脚数据-----------------
                "FooterList": [
                ],
                //-------------店铺logo数据-----------------
                "LogoData": null,
                //-------------二维码数据-----------------
                "QRCodeData": null,
                //-----------------1：打印，0：预览---------------
                "Action": 1,
                //-----------------0:58mm,1:80mm-----------------
                "PageType": ptype
            };

            var h_config = configData.h.split(','); //读取"0,0,0,0,0,0,0"的开关配置
            var t_config = configData.b.split(',');
            var b_config = pfData.content;
            var f_config = configData.f.split(',');
            var q_config = configData.q;
            var l_config = configData.l;

            //使用自定义模板配置，替换模板一、二、三
            var default_templete = {
                "a": 1,
                "b": "1,1,0,0,1,1,0,0,0",
                "f": "0,1,1,1,1,1,0,1,1,1,1,1,1",
                "h": "1,0,1,1,1,0,1,1",
                "l": null,
                "p": 0,
                "q": {
                    "Align": 1,
                    "Width": 100,
                    "Height": 100,
                    "ImageString": ""
                },
                "t": ""
            };




            if (h_config && h_config.length > 0)
            {
                if (h_config.length > 0 && h_config[0] == 1)
                    postData.HeaderList.push({ "Content": convertString(config.user.sv_us_name), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                if (h_config.length > 1 && h_config[1] == 1)
                {
                    //取手机号码
                    postData.HeaderList.push({ "Content": "微信:" + convertString(config.user.sv_wechat_number), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                }
                // if (h_config.length > 2 && h_config[2] == 1)
                //postData.HeaderList.push({ "Content":  (new Date()).Format("yyyy.MM.dd hh:mm:ss"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                //if (h_config.length > 3 && h_config[3] == 1)
                //postData.HeaderList.push({ "Content": "Post机号：" , "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (h_config.length > 4 && h_config[4] == 1)
                    postData.HeaderList.push({ "Content": "单号：" + convertString(pfData.order_running_id), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                if (h_config.length > 5 && h_config[5] == 1)
                    postData.HeaderList.push({ "Content": "收银员：" + pfData.userinfo.operator, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (h_config.length > 6 && h_config[6] == 1)
                    postData.HeaderList.push({ "Content": "会员姓名：" + pfData.userinfo.sv_mr_name, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (h_config.length > 7 && h_config[7] == 1)
                    postData.HeaderList.push({ "Content": "会员卡号：" + pfData.userinfo.sv_mr_cardno, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.HeaderList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });


            }

            if (t_config && t_config.length > 0)
            {
                var _t = "";
                if (t_config.length > 0 && t_config[0] == 1)
                {
                    _t += "商品      ";
                    postData.TitleList.push({
                        "Content": "商品  ",
                        "Columns": 1,
                        "RowNum": 1,
                        "RowMaxLength": 10,
                        "Align": 1,
                        "TextFont": 0,
                        "Width": 10
                    });
                }
                if (t_config.length > 2 && t_config[2] == 1)
                {
                    _t += "礼品      ";
                    postData.TitleList.push({ "Content": "礼品", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 10 });
                }
                if (t_config.length > 1 && t_config[1] == 1)
                {
                    _t += "   单价    ";
                    postData.TitleList.push({ "Content": "单价", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 });
                }

                if (t_config.length > 3 && t_config[3] == 1)
                {
                    _t += "   积分    ";
                    postData.TitleList.push({ "Content": "积分", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 });
                }

                if (t_config.length > 4 && t_config[4] == 1)
                {
                    _t += "数量 ";
                    postData.TitleList.push({ "Content": "数量", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 4 });
                }
                if (t_config.length > 5 && t_config[5] == 1)
                {
                    _t += "小计 ";
                    postData.TitleList.push({ "Content": "小计", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 });
                }
                if (t_config.length > 6 && t_config[6] == 1)
                {
                    _t += "合计 ";
                    postData.TitleList.push({ "Content": "合计", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 });
                }
                postData.HeaderList.push({ "Content": _t, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

            }
            var product_number = 0;
            if (b_config && b_config.length > 0)
            {
                for (var i = 0; i < b_config.length; i++)
                {
                    var b_str = "";
                    if (b_config[i].product != undefined && t_config.length > 0 && t_config[0] == 1)
                        b_str = b_config[i].product + ",";
                    if (b_config[i].sv_name != undefined && t_config.length > 2 && t_config[2] == 1)
                        b_str += b_config[i].sv_name + ",";
                    if (b_config[i].unitPrice != undefined && t_config.length > 1 && t_config[1] == 1)
                        b_str += b_config[i].unitPrice + ",";
                    if (b_config[i].sv_integral != undefined && t_config.length > 3 && t_config[3] == 1)
                        b_str += b_config[i].sv_integral + ",";
                    if (b_config[i].sv_number != undefined && t_config.length > 4 && t_config[4] == 1)
                    {
                        b_str += b_config[i].sv_number + ",";
                        product_number += parseInt(b_config[i].sv_number);
                    }
                    if (b_config[i].subtotal != undefined && t_config.length > 5 && t_config[5] == 1)
                        b_str += b_config[i].subtotal + ",";
                    if (b_config[i].sumintegral != undefined && t_config.length > 6 && t_config[6] == 1)
                        b_str += b_config[i].sumintegral + ",";
                    b_str = b_str.replace(/,$/gi, "");
                    postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
            }
            if (f_config && f_config.length > 0)
            {
                postData.FooterList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 1 && f_config[1] == 1)
                    postData.FooterList.push({ "Content": "礼品总数： " + product_number, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 2 && f_config[2] == 1)
                    // postData.FooterList.push({ "Content": "金额合计： ¥ " + pfData.order_receivable, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                    //if (f_config.length > 3 && f_config[3] == 1)
                    // postData.FooterList.push({ "Content": "优惠金额：¥ " + pfData.DiscountAmount, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    if (f_config.length > 4 && f_config[4] == 1)
                        postData.FooterList.push({ "Content": "储值余额：¥ " + pfData.userinfo.sv_mw_availableamount, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                //if (f_config.length > 5 && f_config[5] == 1)
                //postData.FooterList.push({ "Content": "剩余次数：" + pfData.RemainingNumber, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                //if (f_config.length > 6 && f_config[6] == 1)
                //postData.FooterList.push({ "Content": "累计欠款：" + pfData.CumulativeArrears, "Columns": 2, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (f_config.length > 7 && f_config[7] == 1)
                    postData.FooterList.push({ "Content": "支付方式：积分兑换", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 8 && f_config[8] == 1)
                    postData.FooterList.push({ "Content": "积分（本次/剩余）：" + pfData.Finfo.remaining_integral, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 9 && f_config[9] == 1)
                    postData.FooterList.push({ "Content": "销售时间：" + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (f_config.length > 10 && f_config[10] == 1)
                    postData.FooterList.push({ "Content": "电话：" + convertString(config.user.sv_us_phone), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 11 && f_config[11] == 1)
                    postData.FooterList.push({ "Content": "地址：" + convertString(config.user.sv_us_address), "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });


                postData.FooterList.push({ "Content": "打印时间：" + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": "谢谢惠顾，欢迎下次光临", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }
            //打印店铺二维码
            if (q_config && q_config.ImageString)
            {
                postData.FooterList.push({ "Content": "二维码", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.QRCodeData = q_config;
            }

            //打印店铺扩展信息
            PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_ExtraInfo");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0)
            {
                var extra_info = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                if (extra_info)
                {
                    if (extra_info.toLowerCase.indexOf('<br/>') > 0)
                    {
                        var extra_infos = extra_info.split('<br/>');
                        for (var i = 0; i < extra_infos.length; i++)
                        {
                            postData.FooterList.push({ "Content": extra_infos[i], "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        }
                    } else
                    {
                        postData.FooterList.push({ "Content": extra_info, "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
            }


            postData.FooterList.push({ "Content": "—————————————————————————", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            if (l_config && l_config.ImageString)
            {
                postData.FooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (l_config.ImageString.indexOf("http") > 0)
                {
                    postData.LogoData = l_config;
                } else
                {
                    l_config.ImageString = "http://decerp.cc" + l_config.ImageString
                    postData.LogoData = l_config;
                }
            }
            postData.FooterList.push({ "Content": "........................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            //Cef.openMyPc(JSON.stringify(data2), JSON.stringify(configData), 0);
            //------------待扩展，数据注入、校验

            Cef.CustormPrint(JSON.stringify(postData), '' + receptionPtNum + '', receptionPtName);

        } catch (e)
        {
        }
    } else
    {
        layer.msg("礼品小票打印只支持自定义积分打印模板");
    }
}

//totalAmount应收总金额 deserved活动积分赠送现金优惠 givingtype 1积分类型，2减免丶赠送金额,isbackprint是否后台打印，排除收银的打印控制开关
function pushprintData(spfData, sconfig, ptype, totalAmount, deserved, givingtype, isbackprint) {
    var custormConfig = {
        "user_id": "47116375",
        "bt": [1, 0, 0, 0],
        "bb": [0,0,0,0,0,0,0,0,0],
        "bf": [0,0,0,0,0,0,0,0,0,0,0,0,0],
        "bh": [0,0,0,0,0,0,0,0],
        "fontSize":9
    };
    var print_default_config = [
        { "pagesize": 58, "fontSize": 9, "pagetitle": "商品        单价    数量 小计", "meter_Title": "礼品        积分    数量 合计", "pageline": "", "pageTitleWidth": [10, 5, 4, 5] },
        { "pagesize": 58, "fontSize": 12, "pagetitle": "商品     单价 数量 小计", "pageline": "", "pageTitleWidth": [10, 3, 1, 3] },
        { "pagesize": 80, "fontSize": 9, "pagetitle": "商品                      单价   数量  小计", "pageline": "", "pageTitleWidth": [23, 5, 5, 5] },
        { "pagesize": 80, "fontSize": 12, "pagetitle": "商品              单价  数量  小计", "pageline": "", "pageTitleWidth": [14, 5, 4, 5] },
        { "pagesize": 210, "fontSize": 9, "pagetitle": "商品                        单价  数量  小计", "pageline": "", "pageTitleWidth": [25, 5, 4, 5] }];

    var user_print_config = print_default_config[0];
    
    getAndroidPrintConfig();
    var isDefault_templete = true;//是否模板打印模板，区分自定义打印模板
    var isDefault_templeteId = 0;
    //打印时间、销售时间的转换
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "/" + fnW((month + 1)) + "/" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
    var pfData = JSON.parse(spfData);
    var config = JSON.parse(sconfig);
    var strptype = 0;
    var back_catering_product_data = [];//后厨商品信息
    if (config && config.cof && config.cof.sv_uc_dayin)
    {
        var PrintConfig = JSON.parse(config.cof.sv_uc_dayin);
        if (PrintConfig != '[]' && PrintConfig != "" && PrintConfig != null)
        {
            strptype = PrintConfig.xiaopiao == 58 ? 0 : 1;
            if (PrintConfig.xiaopiao == 58)
            {
                strptype = 0;
                if (custormConfig.fontSize == 12) {
                    user_print_config = print_default_config[1];
                } else {

                    user_print_config = print_default_config[0];
                }
            }
            else if (PrintConfig.xiaopiao == 80)
            {
                strptype = 1;
                if (custormConfig.fontSize == 12)
                {
                    user_print_config = print_default_config[3];
                } else
                {

                    user_print_config = print_default_config[2];
                }
            }
            else if (PrintConfig.xiaopiao == 210)
            {
                strptype = 2;
                user_print_config = print_default_config[4];
            }
            else
            {
                user_print_config = print_default_config[0];
                strptype = 0;
            }

            isDefault_templeteId = PrintConfig.mo;

     
        }
    }
    var configData = [];
    var postData = {
        //-------------头部数据-----------------
        "HeaderList": [],
        //-------------中部数据-----------------
        "BodyList": [],
        //-------------标题数据-----------------
        "TitleList": [],
        //-------------页脚数据-----------------
        "FooterList": [
        ],
        //-------------店铺logo数据-----------------
        "LogoData": null,
        //-------------二维码数据-----------------
        "QRCodeData": null,
        //-----------------1：打印，0：预览-----------------
        "Action": 1,
        //-----------------0:58mm,1:80mm-----------------
        "PageType": strptype,
        "PagePadding": 0,
        //---------------小票打印字体，建议打印字体：58->9号字体，80->12号字体
        "FontSize": custormConfig.fontSize,
        //----------------- 打印版本，最新版本v2 ---------
        "PrintVersion": 1
    };

    if (config && config.cof && config.cof.sv_pfconfig && config.cof.sv_pfconfig.length > 10)
    {
        isDefault_templete = false;
        configData = JSON.parse(config.cof.sv_pfconfig);
    } else
    {
        configData = {
            "a": 1,
            "b": "1,1,0,0,1,1,0,0,0",
            "f": "0,1,1,1,1,1,0,1,1,1,1,1,1",
            "h": "1,0,1,1,1,0,1,1",
            "l": null,
            "p": 0,
            "q": {
                "Align": 1,
                "Width": 100,
                "Height": 100,
                "ImageString": ""
            },
            "t": ""
        };

        if (isDefault_templeteId == 1)
        {
            configData.f = "0,1,1,0,0,1,0,0,0,0,0,0,0";
        } else if (isDefault_templeteId == 2)
        {
            configData.f = "0,1,1,1,1,1,0,1,1,1,1,1,1";
        } else if (isDefault_templeteId == 3)
        {
            configData.f = "0,1,1,1,1,1,0,1,1,1,1,1,1";
        }
    }


    //使用自定义模板打印
    //if (config && config.cof && config.cof.sv_pfconfig && config.cof.sv_pfconfig.length > 10)
    //{
    if (config && config.cof)
    {
        try
        {
            var Ismember;
            if (pfData.user && pfData.user.sv_mr_cardno)
            {
                Ismember = isNullOrWhiteSpace(pfData.user.sv_mr_cardno);//判断是否是会员 
            }
            var theintegral = 0;//本次积分
            var money = pfData.order_receivable;//钱，默认合计
            var ratiointegral = 1;//比例积分
            var integral = "";//积分(本次/累计积分)
            var sv_mw_availablepoint = 0;//累计积分
            var pointtocashset = "";//消费积分
            var preferentialMoney = 0;//优惠金额
            if (Ismember)
            {
                if (config.cof.sv_uc_pointtocashset != '[]' && config.cof.sv_uc_pointtocashset != "" && config.cof.sv_uc_pointtocashset != null)
                { pointtocashset = JSON.parse(config.cof.sv_uc_pointtocashset); }
                if (pointtocashset != '[]' && pointtocashset != "" && pointtocashset != null)
                {
                    money = pointtocashset[0];
                    ratiointegral = pointtocashset[1];
                }
                theintegral = parseInt(pfData.order_receivable / money * ratiointegral);
                sv_mw_availablepoint = pfData.user.sv_mw_availablepoint;
                integral = theintegral + "/ " + sv_mw_availablepoint;
                if (givingtype == 1 && givingtype > 0)
                {
                    integral = integral + "(含活动消费赠送" + deserved + "积分)";
                }               
            }
            try
            {
                var preferentialMoney_int = parseInt((totalAmount - pfData.order_receivable) * 100) / 100;
                if (preferentialMoney_int > 0)
                {
                    preferentialMoney = preferentialMoney_int + "";
                }
            } catch (e)
            {

            }
            if (givingtype == 2)
            {
                preferentialMoney = preferentialMoney == 0 ? deserved + "(活动消费减免" + deserved + "元)" : preferentialMoney + "(含活动消费减免" + deserved + "元)";

            }

            var h_config = configData.h.split(','); //读取"0,0,0,0,0,0,0"的开关配置
            var t_config = configData.b.split(',');
            var b_config = pfData.prlist;
            var f_config = configData.f.split(',');
            var q_config = configData.q;
            var l_config = configData.l;
            if (h_config && h_config.length > 0)
            {
                if (h_config.length > 0 && h_config[0] == 1)
                    postData.HeaderList.push({ "Content": convertString(config.user.sv_us_name), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "FontStyleType": custormConfig.bh[0] });
                if (h_config.length > 1 && h_config[1] == 1)
                {
                    //取手机号码
                    postData.HeaderList.push({ "Content": "微信:" + convertString(config.user.sv_wechat_number), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "FontStyleType": custormConfig.bh[1] });
                }
                //if (h_config.length > 2 && h_config[2] == 1)
                //postData.HeaderList.push({ "Content":  (new Date()).Format("yyyy.MM.dd hh:mm:ss"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                //if (h_config.length > 3 && h_config[3] == 1) 
                //postData.HeaderList.push({ "Content": "Post机号：" , "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (_g_sv_uit_cache_name == 'cache_name_catering' && pfData.sv_catering_grade)
                {
                    postData.HeaderList.push({ "Content": "桌/牌号：" + convertString(pfData.sv_catering_grade), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                var danhao = pfData.order_running_id;
                if (pfData.everyday_serialnumber && _g_everyDaySerialNumber)
                {
                    danhao = pfData.everyday_serialnumber;
                }
                if (pfData != null && pfData.meiridanhao != null && pfData.meiridanhao != "")
                {
                    danhao = pfData.meiridanhao;
                }
                if (h_config.length > 4 && h_config[4] == 1)
                    postData.HeaderList.push({ "Content": "单号：" + convertString(danhao), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "FontStyleType": custormConfig.bh[4] });

                if (h_config.length > 5 && h_config[5] == 1)
                    postData.HeaderList.push({ "Content": "收银员：" + sv_current_operato, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "FontStyleType": custormConfig.bh[5] });
                if (h_config.length > 6 && h_config[6] == 1 && Ismember)
                    postData.HeaderList.push({ "Content": "会员姓名：" + pfData.user.sv_mr_name, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "FontStyleType": custormConfig.bh[6] });
                if (h_config.length > 7 && h_config[7] == 1 && Ismember)
                    postData.HeaderList.push({ "Content": "会员卡号：" + pfData.user.sv_mr_cardno, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "FontStyleType": custormConfig.bh[7] });
                if (strptype < 2)
                {
                    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                    {
                        postData.HeaderList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        postData.HeaderList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
            }

            var StrWidth = 0;
            var PagePadding = 0;
            if (strptype == 1)
            {//80mm
                //StrWidth = 2;
                PagePadding = 3;
            } else if (strptype == 2)//A4 210mm
            {
                //StrWidth = 10;
                PagePadding = 10;
                postData.PagePadding = PagePadding;
            }


            var _body_head_string = "";
            if (t_config && t_config.length > 0)
            {
                var _t = "";
                if (t_config.length > 0 && t_config[0] == 1)
                {

                    if (strptype == 1)
                    {
                        _t += "商品              ";
                        _body_head_string += "商品,";
                    }
                    else
                    {
                        _t += "商品     ";
                        _body_head_string += "商品,";
                    }
                    postData.TitleList.push({
                        "Content": "商品",
                        "Columns": 1,
                        "RowNum": 1,
                        "RowMaxLength": 10,
                        "Align": 1,
                        "TextFont": 0,
                        "Width": user_print_config.pageTitleWidth[0], "FontStyleType": custormConfig.bt[0]
                    });
                }

                if (t_config.length > 2 && t_config[2] == 1)
                {
                    if (strptype == 1)
                    {
                        _t += "礼品              ";
                        _body_head_string += "礼品,";
                    }
                    else
                    {
                        _t += "礼品     ";
                        _body_head_string += "礼品,";
                    }
                    postData.TitleList.push({ "Content": "礼品", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": user_print_config.pageTitleWidth[0], "FontStyleType": custormConfig.bt[0] });
                }

                if (t_config.length > 1 && t_config[1] == 1)
                {
                    _t += "   单价    ";
                    _body_head_string += "单价,";
                    postData.TitleList.push({ "Content": "单价", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": user_print_config.pageTitleWidth[1], "FontStyleType": custormConfig.bt[1] });
                }

                if (t_config.length > 3 && t_config[3] == 1)
                {
                    _t += "   积分    ";
                    _body_head_string += "积分,";
                    postData.TitleList.push({ "Content": "积分", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": user_print_config.pageTitleWidth[1], "FontStyleType": custormConfig.bt[1] });
                }

                if (t_config.length > 4 && t_config[4] == 1)
                {
                    if (strptype == 1)
                    {
                        _t += "数量     ";
                    }
                    else
                    {
                        _t += "数量 ";
                    }
                    _body_head_string += "数量,";
                    postData.TitleList.push({ "Content": "数量", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": user_print_config.pageTitleWidth[2], "FontStyleType": custormConfig.bt[2] });
                }

                if (t_config.length > 5 && t_config[5] == 1)
                {
                    _t += "小计 ";
                    _body_head_string += "小计,";
                    postData.TitleList.push({ "Content": "小计", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": user_print_config.pageTitleWidth[3], "FontStyleType": custormConfig.bt[3] });
                }

                if (t_config.length > 6 && t_config[6] == 1)
                {
                    _t += "合计 ";
                    _body_head_string += "合计,";
                    postData.TitleList.push({ "Content": "合计", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": user_print_config.pageTitleWidth[3], "FontStyleType": custormConfig.bt[3] });
                }
                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                } else
                {
                    //if (_body_head_string && _body_head_string.length>0)
                    //{
                    //    _body_head_string = _body_head_string.substring(0, _body_head_string.Length - 1);
                    //    postData.HeaderList.push({ "Content": _t, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    //} else
                    //{
                    //    postData.HeaderList.push({ "Content": _t, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    //}
                    if (t_config.length > 2 && t_config[2] == 1) {
                        //礼品兑换
                        postData.HeaderList.push({ "Content": user_print_config.meter_Title, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else {
                        //普通商品
                        postData.HeaderList.push({ "Content": user_print_config.pagetitle, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }


                }
            }
            var productIdList = "";
            var product_num = 0;//商品总数
            var imeiList = [];//商品串号
            if (b_config && b_config.length > 0)
            {
                var meter_goods = [];//次卡商品 
                for (var i = 0; i < b_config.length; i++)
                {
                    product_num += parseFloat(b_config[i].product_num);
                    if (b_config[i].type == true)
                    {
                        //次卡消费
                        var b_str = b_config[i].product_name + "," + b_config[i].product_num + ",-" + b_config[i].product_num + "," + (b_config[i].cnum - b_config[i].product_num);
                        meter_goods.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        var thisProductName = b_config[i].product_name;
                        if (_g_sv_uit_cache_name == 'cache_name_catering')
                        {
                            if (b_config[i].ProductTasteList && b_config[i].ProductTasteList.length > 0)
                            {
                                thisProductName += " ";
                                for (var j = 0; j < b_config[i].ProductTasteList.length; j++)
                                {
                                    thisProductName += b_config[i].ProductTasteList[j].sv_taste_data_name;
                                }
                            }
                        } else if (_g_sv_uit_cache_name == 'cache_name_mobile_digital' && b_config[i].sv_iemi_no)
                        {
                            imeiList.push(b_config[i].sv_iemi_no);

                        }

                        if (b_config[i].spec)
                        {
                            thisProductName += b_config[i].spec;
                        }
                        //普通消费
                        productIdList += b_config[i].product_id + ",";
                        var b_str = "";
                        var print_price = b_config[i].product_unitprice;
                        if (b_config[i].product_single_untprice)
                        {
                            print_price = b_config[i].product_single_untprice;
                        }

                        if (g_TraceabilityCode )
                        {
                            b_str = thisProductName + "," + print_price + "," + b_config[i].product_num + "," + b_config[i].product_total + "," + b_config[i].product_id + "productid";
                        } else
                        {
                            if (_g_sv_uit_cache_name == 'cache_name_catering')
                            {
                                //处理餐饮版口味价格
                                if (b_config[i].sv_taste_total_money && b_config[i].sv_taste_total_money > 0)
                                {
                                    var l_taste_total_money = parseFloat(b_config[i].product_total) + parseFloat(b_config[i].sv_taste_total_money);
                                    b_str = thisProductName + "," + print_price + "," + b_config[i].product_num + "," + l_taste_total_money.toFixed(2);
                                } else
                                {
                                    b_str = thisProductName + "," + print_price + "," + b_config[i].product_num + "," + b_config[i].product_total;
                                }
                            } else
                            {
                                b_str = thisProductName + "," + print_price + "," + b_config[i].product_num + "," + b_config[i].product_total;
                            }
                        }
                        postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                        //后厨打印商品信息
                        var back_str = thisProductName + "," + b_config[i].product_num;
                        back_catering_product_data.push({ "Content": back_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }

                if (meter_goods && meter_goods.length > 0)
                {
                    var b_str = "项目,次数,实扣,剩余";
                    postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                    for (var j = 0; j < meter_goods.length; j++)
                    {
                        postData.BodyList.push(meter_goods[j]);
                    }
                }
            }
            if (f_config && f_config.length > 0)
            {
                if (strptype < 2)
                {
                    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                    {
                        postData.FooterList.push({ "Content": "............................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        postData.FooterList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
                if (pfData.shipping_fee && pfData.shipping_fee > 0)
                {
                    postData.FooterList.push({ "Content": "配送费用： " + pfData.shipping_fee, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (f_config.length > 1 && f_config[1] == 1)
                    postData.FooterList.push({ "Content": "商品总数： " + product_num, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 2 && f_config[2] == 1)
                    postData.FooterList.push({ "Content": "金额合计： ¥ " + pfData.order_receivable, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 3 && f_config[3] == 1)
                {
                    if (f_config.length > 3 && preferentialMoney && preferentialMoney != "0")
                        postData.FooterList.push({ "Content": "优惠金额：¥ " + preferentialMoney, "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }

                if (f_config.length > 4 && f_config[4] == 1 && Ismember)
                    postData.FooterList.push({ "Content": "储值余额：¥ " + pfData.user.sv_mw_availableamount, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                //if (f_config.length > 4 && f_config[4] == 1 && Ismember)
                //postData.FooterList.push({ "Content": "剩余次数：", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                //if (f_config.length > 5 && f_config[5] == 1)
                //postData.FooterList.push({ "Content": "累计欠款：¥ 200", "Columns": 2, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (f_config.length > 7 && f_config[7] == 1)
                {
                    var order_payment = pfData.order_payment;
                    if (isNullOrWhiteSpace(pfData.order_payment2) && (pfData.order_payment2.indexOf("待") < 0 || pfData.order_payment2 != "待收"))
                    {
                        order_payment = order_payment + "(" + pfData.order_money + ")/" + pfData.order_payment2 + "(" + pfData.order_money2 + ")";
                    }
                    postData.FooterList.push({ "Content": "支付方式：" + order_payment + " ", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (f_config.length > 8 && f_config[8] == 1 && Ismember)
                {
                    postData.FooterList.push({ "Content": "积分（本次/累计）：" + integral, "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (pfData.order_money && pfData.order_money > 0)
                {
                    postData.FooterList.push({ "Content": "收款：¥ " + pfData.order_money, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (pfData.sv_give_change && pfData.sv_give_change > 0)
                {
                    postData.FooterList.push({ "Content": "找零：¥ " + pfData.sv_give_change, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (f_config.length > 10 && f_config[10] == 1)
                    postData.FooterList.push({ "Content": "电话：" + convertString(config.user.sv_us_phone), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 9 && f_config[9] == 1)
                {//order_datetime
                    if (pfData.order_datetime)
                    {
                        time = new Date(pfData.order_datetime).Format("yyyy-MM-dd hh:mm:ss");
                    }
                    postData.FooterList.push({ "Content": "销售时间：" + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (pfData.sv_remarks) {
                    postData.FooterList.push({ "Content": "备注：" + convertString(pfData.sv_remarks), "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                else if (pfData.sv_remark) {
                    postData.FooterList.push({ "Content": "备注：" + convertString(pfData.sv_remark), "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (f_config.length > 11 && f_config[11] == 1)
                    postData.FooterList.push({ "Content": "店铺地址：" + convertString(config.user.sv_us_address), "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (pfData.recipient_name)
                {
                    postData.FooterList.push({ "Content": "收货人： " + pfData.recipient_name, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (pfData.recipient_phone)
                {
                    postData.FooterList.push({ "Content": "联系方式： " + pfData.recipient_phone, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (pfData.sv_hasinvoiced)
                {
                    //发票信息
                    var print_invoice = "【";
                    if (pfData.sv_invoicetitle)
                    {
                        print_invoice += pfData.sv_invoicetitle;
                    }
                    if (pfData.sv_taxpayerid)
                    {
                        print_invoice += pfData.sv_taxpayerid;
                    }
                    print_invoice = print_invoice + "】";
                    postData.FooterList.push({ "Content": "发票：" + print_invoice, "Columns": 1, "RowNum": 3, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                }
                if (pfData.recipient_address)
                {
                    postData.FooterList.push({ "Content": "收货地址：" + pfData.recipient_address, "Columns": 1, "RowNum": 3, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
 

                //postData.FooterList.push({ "Content": "打印时间：" + (new Date()).Format("yyyy.MM.dd hh:mm:ss"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (imeiList && imeiList.length > 0)
                {
                    //打印串号信息
                    for (var i = 0; i < imeiList.length; i++)
                    {
                        postData.FooterList.push({ "Content": "*串号*：" + imeiList[i], "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                    }
                }

                postData.FooterList.push({ "Content": "谢谢惠顾，欢迎下次光临", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }
            if (q_config && q_config.ImageString)
            {
                postData.FooterList.push({ "Content": "二维码", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.QRCodeData = q_config;
            }


            if (strptype < 2)
            {
                postData.FooterList.push({ "Content": "—————————————————————————————-", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }
            if (l_config && l_config.ImageString)
            {
                if (l_config.ImageString.indexOf("http") >= 0)
                {
                    postData.LogoData = l_config;
                    postData.FooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                } else
                {
                    l_config.ImageString = "http://decerp.cc" + l_config.ImageString
                    postData.LogoData = l_configpostData.FooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
            }
            if (strptype < 2)
            {
                //postData.FooterList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }

            //A4纸张类型重新排版<<<3列布局<<<居左布局
            if (strptype == 2)
            {
                //3列布局
                if (postData && postData.HeaderList && postData.HeaderList.length > 0)
                {
                    var columnsStart = 1;
                    //排除第一个和最后一个列
                    for (var i = 1; i < postData.HeaderList.length - 1; i++)
                    {
                        if (columnsStart > 3)
                            columnsStart = 1;
                        postData.HeaderList[i].Align = 0;
                        postData.HeaderList[i].Columns = columnsStart;
                        columnsStart++;
                    }
                }
                //3列布局
                if (postData && postData.FooterList && postData.FooterList.length > 0)
                {
                    var columnsStart = 1;
                    //排除第一个和最后一个列
                    for (var i = 0; i < postData.FooterList.length - 1; i++)
                    {
                        if (columnsStart > 3)
                            columnsStart = 1;
                        postData.FooterList[i].Columns = columnsStart;
                        columnsStart++;
                    }
                }

            }
            //非自定义模板，即自定义模板启用后，才可打印扩展信息
            if (!isDefault_templete || true)
            {
                //打印店铺扩展信息
                PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_ExtraInfo");

                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0)
                {
                    var extra_info = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    if (extra_info)
                    {
                        if (extra_info.toLowerCase().indexOf('<br/>') > 0)
                        {
                            var extra_infos = extra_info.split('<br/>');
                            for (var i = 0; i < extra_infos.length; i++)
                            {
                                postData.FooterList.push({ "Content": extra_infos[i], "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            }
                        } else
                        {
                            postData.FooterList.push({ "Content": extra_info, "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        }
                    }
                }
            }
            //Cef.openMyPc(JSON.stringify(data2), JSON.stringify(configData), 0);
            //------------待扩展，数据注入、校验
            // 前台打印
            if (parseInt(receptionPtNum) > 0 && receptionPtName != null && receptionPtName != '')
            {
                //是否Windows客户端环境
                if (((typeof Cef) !== 'undefined'))
                {
                    if (printSet_network_device_font_islabel)
                    { // 前台标签打印机是否启用    
                        if (b_config && b_config.length > 0)
                        {
                            var order_no = 0;
                            var order_total_num = 0;
                            //获取总数
                            for (var ii = 0; ii < b_config.length; ii++)
                            {
                                order_total_num = parseInt(order_total_num) + parseInt(b_config[ii].product_num);
                            }

                            for (var ii = 0; ii < b_config.length; ii++)
                                 {
                                     for (var iii = 0; iii < b_config[ii].product_num; iii++)
                                     {
                                    var temp_product_name = b_config[ii].product_name;
                                    if (b_config[ii] && b_config[ii].ProductTasteList && b_config[ii].ProductTasteList.length > 0)
                                    {
                                        temp_product_name += " ";
                                        for (var j = 0; j < b_config[ii].ProductTasteList.length; j++)
                                        {
                                            temp_product_name += b_config[ii].ProductTasteList[j].sv_taste_data_name;
                                    }
                                 }
                                         order_no++;
                                         var labelData =[];

                                    var danhao_label = pfData.order_running_id;
                                    if (pfData.everyday_serialnumber && _g_everyDaySerialNumber)
                                    {
                                        danhao_label = pfData.everyday_serialnumber;
                                 }
                                    if (pfData != null && pfData.meiridanhao != null && pfData.meiridanhao != "")
                                    {
                                        danhao_label = pfData.meiridanhao;
                                 }

                                    labelData.push({
                                        "Content": "单号:" + convertString(danhao_label) + " 序号:" + order_no + "/" + order_total_num,
                                        "Columns": 1,
                                        "RowNum": 1,
                                        "RowMaxLength": 10,
                                        "Align": 0,
                                        "TextFont": 0,
                                        "TextFontSize": 8,
                                        "Width": 0
                                 });
                                    labelData.push({
                                        "Content": temp_product_name,
                                        "Columns": 1,
                                        "RowNum": 3,
                                        "RowMaxLength": 10,
                                        "Align": 0,
                                        "TextFont": 0,
                                        "TextFontSize": 10,
                                        "Width": 0
                                 });
                                    labelData.push({
                                        "Content": "",
                                        "Columns": 1,
                                        "RowNum": 1,
                                        "RowMaxLength": 10,
                                        "Align": 0,
                                        "TextFont": 0,
                                        "TextFontSize": 10,
                                        "Width": 0
                                    });
                                    if (_g_sv_uit_cache_name == 'cache_name_catering')
                                    {
                                        if (b_config[ii].sv_taste_total_money > 0)
                                        {
                                            var l_taste_single_money = parseFloat(b_config[ii].product_total) + parseFloat(b_config[ii].sv_taste_total_money);
                                            if (b_config[ii].product_num > 0)
                                            {
                                                l_taste_single_money = parseFloat(l_taste_single_money) / parseFloat(b_config[ii].product_num)
                                            }
                                            labelData.push({
                                                "Content": "￥" + l_taste_single_money.toFixed(2) + "元",
                                                "Columns": 2,
                                                "RowNum": 1,
                                                "RowMaxLength": 10,
                                                "Align": 1,
                                                "TextFont": 0,
                                                "TextFontSize": 8,
                                                "Width": 0
                                            });
                                        } else
                                        {
                                            var l_notaste_single_money = parseFloat(b_config[ii].product_total);
                                            if (b_config[ii].product_num > 0)
                                            {
                                                l_notaste_single_money = parseFloat(l_notaste_single_money) / parseFloat(b_config[ii].product_num)
                                            }
                                            labelData.push({
                                                "Content": "￥" + parseFloat(l_notaste_single_money).toFixed(2) + "元",
                                                "Columns": 2,
                                                "RowNum": 1,
                                                "RowMaxLength": 10,
                                                "Align": 1,
                                                "TextFont": 0,
                                                "TextFontSize": 8,
                                                "Width": 0
                                            });
                                        }
                                    } else
                                    {
                                        var l_notaste_single_money = parseFloat(b_config[ii].product_total);
                                        if (b_config[ii].product_num > 0)
                                        {
                                            l_notaste_single_money = parseFloat(l_notaste_single_money) / parseFloat(b_config[ii].product_num)
                                        }
                                        labelData.push({
                                            "Content": "￥" + parseFloat(l_notaste_single_money).toFixed(2) + "元",
                                            "Columns": 2,
                                            "RowNum": 1,
                                            "RowMaxLength": 10,
                                            "Align": 1,
                                            "TextFont": 0,
                                            "TextFontSize": 8,
                                            "Width": 0
                                        });
                                    }

                                    if ((!(typeof (user_id) == "undefined")) && user_id == '20806328') {
                                        labelData.push({
                                            "Content" : "【" +
                                                convertString(config.user.sv_us_name) +
                                                "】",
                                            "Columns": 1,
                                            "RowNum": 1,
                                            "RowMaxLength": 10,
                                            "Align": 0,
                                            "TextFont": 0,
                                            "TextFontSize": 7,
                                            "Width": 0
                                    });
                                    } else {
                                       labelData.push({
                                        "Content" : "【" +
                                            convertString(config.user.sv_us_name) +
                                            "】",
                                        "Columns": 1,
                                        "RowNum": 1,
                                        "RowMaxLength": 10,
                                        "Align": 0,
                                        "TextFont": 0,
                                        "TextFontSize": 7,
                                        "Width": 0
                                    });

                                       if (convertString(config.user.sv_us_phone))
                                       {
                                           labelData.push({
                                               "Content" : "电话:" +
                                                convertString(config.user.sv_us_phone) + "谢谢惠顾!",
                                               "Columns": 1,
                                               "RowNum": 1,
                                               "RowMaxLength": 10,
                                               "Align": 0,
                                               "TextFont": 0,
                                               "TextFontSize": 7,
                                               "Width": 0
                                       });
                                       } else
                                       {
                                           labelData.push({
                                               "Content": "谢谢惠顾!",
                                               "Columns": 1,
                                               "RowNum": 1,
                                               "RowMaxLength": 10,
                                               "Align": 0,
                                               "TextFont": 0,
                                               "TextFontSize": 7,
                                               "Width": 0
                                       });
                                    }
                                 }


                                    labelData.push({
                                        "Content": hours + ":" +minute,
                                        "Columns": 2,
                                        "RowNum": 1,
                                        "RowMaxLength": 10,
                                        "Align": 1,
                                        "TextFont": 0,
                                        "TextFontSize": 7,
                                        "Width": 0
                                 });
                                    var tempdata = {
                                        "FooterList": labelData,
                                        "QRCodeData": null,
                                        "Action": 1,
                                        "PageType": 4,
                                        "PagePadding": 10
                                 };
                                    if (((typeof Cef) !== 'undefined'))
                                    {
                                        Cef.LabelPrint(JSON.stringify(tempdata),
                                            '' +receptionPtNum + '',
                                            receptionPtName,
                                            false,
                                            40,
                                            30);
                                 }
                                }
                            }
                        }
                    } else {
                        if (g_TraceabilityCode)//追溯码
                        {
                        //追溯码
                                $.ajax({
                                    url: '/AjaxProduct/GetTraceabilityCodeList?id=' + productIdList+"0",
                                    type: 'get',
                                    success: function (data) {
                                        if (data) {
                                            for (var i = 0; i < postData.BodyList.length; i++) {
                                                for (var k = 0; k < data.length; k++) {
                                                    if (postData.BodyList[i].Content.indexOf(data[k].product_id + "productid") > -1) {
                                                        var item = postData.BodyList[i].Content.split(',');
                                                        var str = "";
                                                        for (var h = 0; h < item.length; h++) {
                                                            if(h!=item.length-1){
                                                                str += item[h];
                                                                if (h != item.length-2) {
                                                                    str += ",";
                                                                }
                                                            }
                                                        }
                                                        postData.BodyList[i].Content = "*" + str;
                                                        
                                                        if (data[k].sv_qr_code_image_path != "" || data[k].sv_qr_code_image_path != null || data[k].sv_qr_code_image_path != undefined) {
                                                            postData.BodyList[i].HasTraceUrl = true;
                                                        }
                                                        else {
                                                            postData.BodyList[i].HasTraceUrl = false;
                                                        }
                                                        postData.BodyList[i].TraceTrl = data[k].sv_qr_code_image_path;
                                                        postData.BodyList[i].ImageWidth = 90;
                                                        postData.BodyList[i].ImageHeight = 90;
                                                        postData.BodyList[i].ImageAlign = 1;
                                                        break;
                                                    }
                                                }                                                
                                            }
                                        }

                                        for (var i = 0; i < postData.BodyList.length; i++)
                                        {
                                            if (!postData.BodyList[i].HasTraceUrl || postData.BodyList[i].HasTraceUrl == false)
                                            {
                                                var item = postData.BodyList[i].Content.split(',');
                                                var str = "";
                                                for (var h = 0; h < item.length; h++)
                                                {
                                                    if (h != item.length - 1)
                                                    {
                                                        str += item[h];
                                                        if (h != item.length - 2)
                                                        {
                                                            str += ",";
                                                        }
                                                    }
                                                }
                                                postData.BodyList[i].Content = str;
                                            }
                                        }
                                        if (((typeof Cef) !== 'undefined')) {
                                            Cef.CustormTracePrint(JSON.stringify(postData), '' + 1 + '', receptionPtName);
                                        }
                                    }
                                });
                        } else
                        {
                            for (var i = 0; i < receptionPtNum; i++)
                            {
                                Cef.CustormPrint(JSON.stringify(postData), '' + 1 + '', receptionPtName);
                            }
                        }
                    }
                } else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    //是否Android客户端运行环境
                    try
                    {
                        //Android客户端打印
                        if (g_TraceabilityCode) {//追溯码打印
                            var tracepostData = postData;

                            $.ajax({
                                url: '/AjaxProduct/GetTraceabilityCodeList?id=' + productIdList + "0",
                                type: 'get',
                                success: function(data) {
                                    if (data)
                                    {
                                        for (var i = 0; i < tracepostData.BodyList.length; i++)
                                        {
                                            if (data && data.length > 0)
                                            {
                                                for (var k = 0; k < data.length; k++)
                                                {
                                                    if (tracepostData.BodyList[i].Content.indexOf(data[k].product_id + "productid") > -1)
                                                    {
                                                        var item = tracepostData.BodyList[i].Content.split(',');
                                                        var str = "";
                                                        for (var h = 0; h < item.length; h++)
                                                        {
                                                            if (h != item.length - 1)
                                                            {
                                                                str += item[h];
                                                                if (h != item.length - 2)
                                                                {
                                                                    str += ",";
                                                                }
                                                            }
                                                        }
                                                        tracepostData.BodyList[i].Content = "*" + str;
                                                        tracepostData.BodyList[i].HasTraceUrl = true;
                                                        tracepostData.BodyList[i].TraceTrl = data[k].sv_qr_code_image_path;
                                                        tracepostData.BodyList[i].ImageWidth = 90;
                                                        tracepostData.BodyList[i].ImageHeight = 90;
                                                        tracepostData.BodyList[i].ImageAlign = 1;
                                                        break;
                                                    }
                                                }
                                            }

                                            for (var i = 0; i < postData.BodyList.length; i++)
                                            {
                                                if (!postData.BodyList[i].HasTraceUrl || postData.BodyList[i].HasTraceUrl == false)
                                                {
                                                    var item = postData.BodyList[i].Content.split(',');
                                                    var str = "";
                                                    for (var h = 0; h < item.length; h++)
                                                    {
                                                        if (h != item.length - 1)
                                                        {
                                                            str += item[h];
                                                            if (h != item.length - 2)
                                                            {
                                                                str += ",";
                                                            }
                                                        }
                                                    }
                                                    postData.BodyList[i].Content = str;
                                                }
                                            }
                                            
                                        }
                                    }
                                    tracepostData.FooterList.push({"Content": "注：带“*”商品可进行追溯信息查询", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0});
                                    if (g_android_print_config &&
                                        g_android_print_config.length > 0 &&
                                        g_android_print_config[0].whetherToEnablenable)
                                    {
                                        //安卓收银机（非商米T1）前台USB驱动打印
                                        if (parseInt((g_android_print_config[0].count || 1)) > 1)
                                        {
                                            for (var l = 0; l < parseInt((g_android_print_config[0].count || 1)) ; l++)
                                            {

                                                cordova.plugins.barcodeScanner.barcodexprinter(
                                                    function(result) {
                                                    },
                                                    function(error) {
                                                        alert("打印失败: " + error);
                                                    },
                                                    {
                                                        myPrintData: JSON.stringify(tracepostData),
                                                        printConfig: JSON.stringify({
                                                            "type": "usb", //打印机类型：usb or network
                                                            "name": g_android_print_config[0].ipOrName, //打印机名称或IP
                                                            "copies": g_android_print_config[0].count, //打印份数
                                                            "isLabel": g_android_print_config[0].labelPrinter //是否标签打印
                                                        })
                                                    }
                                                );
                                            }
                                        } else {
                                            cordova.plugins.barcodeScanner.barcodexprinter(
                                                   function(result) {
                                                   },
                                                   function(error) {
                                                       alert("打印失败: " + error);
                                                   },
                                                   {
                                                       myPrintData: JSON.stringify(tracepostData),
                                                       printConfig: JSON.stringify({
                                                           "type": "usb", //打印机类型：usb or network
                                                           "name": g_android_print_config[0].ipOrName, //打印机名称或IP
                                                           "copies": g_android_print_config[0].count, //打印份数
                                                           "isLabel": g_android_print_config[0].labelPrinter //是否标签打印
                                                       })
                                                   }
                                               );
                                        }
                                    } else {
                                        if (parseInt(receptionPtNum) > 0)
                                        {
                                            for (var l = 0; l < parseInt(receptionPtNum) ; l++)
                                            {

                                                cordova.plugins.barcodeScanner.print(
                                                    function(result) {
                                                    },
                                                    function(error) {
                                                        alert("打印失败: " + error);
                                                    },
                                                    {
                                                        myPrintData: JSON.stringify(tracepostData)

                                                    }
                                                );
                                            }
                                        } else
                                        {
                                            cordova.plugins.barcodeScanner.print(
                                                function(result) {
                                                },
                                                function(error) {
                                                    alert("打印失败: " + error);
                                                },
                                                {
                                                    myPrintData: JSON.stringify(tracepostData)

                                                }
                                            );
                                        }
                                    }
                                }
                            });
                        } else
                        {
                            if (g_android_print_config && g_android_print_config.length > 0 && g_android_print_config[0].whetherToEnablenable) {
                                //安卓收银机（非商米T1）前台USB驱动打印
                                if (parseInt((g_android_print_config[0].count || 1)) > 0)
                                {
                                    for (var l = 0; l < parseInt((g_android_print_config[0].count || 1)) ; l++)
                                    {

                                        cordova.plugins.barcodeScanner.barcodexprinter(
                                            function(result) {
                                            },
                                            function(error) {
                                                alert("打印失败: " + error);
                                            },
                                            {
                                                myPrintData: JSON.stringify(postData),
                                                printConfig: JSON.stringify({
                                                    "type": "usb", //打印机类型：usb or network
                                                    "name": g_android_print_config[0].ipOrName, //打印机名称或IP
                                                    "copies": g_android_print_config[0].count, //打印份数
                                                    "isLabel": g_android_print_config[0].labelPrinter //是否标签打印
                                                })
                                            }
                                        );
                                    }
                                } else
                                {
                                    cordova.plugins.barcodeScanner.barcodexprinter(
                                            function(result) {
                                            },
                                            function(error) {
                                                alert("打印失败: " + error);
                                            },
                                        {
                                            myPrintData: JSON.stringify(postData),
                                            printConfig: JSON.stringify({
                                                "type": "usb", //打印机类型：usb or network
                                                "name": g_android_print_config[0].ipOrName, //打印机名称或IP
                                                "copies": g_android_print_config[0].count, //打印份数
                                                "isLabel": g_android_print_config[0].labelPrinter //是否标签打印
                                            })
                                        }
                                    );
                                }
                            } else {
                                //原有打印方式，支持商米T1安卓机
                                if (parseInt(receptionPtNum) > 0)
                                {
                                    for (var l = 0; l < parseInt(receptionPtNum) ; l++)
                                    {

                                        cordova.plugins.barcodeScanner.print(
                                            function(result) {
                                            },
                                            function(error) {
                                                alert("打印失败: " + error);
                                            },
                                            {
                                                myPrintData: JSON.stringify(postData)

                                            }
                                        );
                                    }
                                } else
                                {
                                    cordova.plugins.barcodeScanner.print(
                                        function(result) {
                                        },
                                        function(error) {
                                            alert("打印失败: " + error);
                                        },
                                        {
                                            myPrintData: JSON.stringify(postData)

                                        }
                                    );
                                }
                            }
                            
                        }
                    } catch (e)
                    {
                        alert("打印失败: " + e.message);
                    }
                }
            }
            else
            {
                if (((typeof Cef) !== 'undefined'))
                {
                    Cef.CustormPrint(JSON.stringify(postData));
                }
                    //是否Android客户端运行环境
                else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    try
                    {
                        if (g_android_print_config &&
                            g_android_print_config.length > 0 &&
                            g_android_print_config[0].whetherToEnablenable) {
                            //安卓收银机（非商米T1）前台USB驱动打印
                            if (parseInt((g_android_print_config[0].count || 1)) > 0)
                            {
                                for (var l = 0; l < parseInt((g_android_print_config[0].count || 1)) ; l++)
                                {

                                    cordova.plugins.barcodeScanner.barcodexprinter(
                                        function(result) {
                                        },
                                        function(error) {
                                            alert("打印失败: " + error);
                                        },
                                        {
                                            myPrintData: JSON.stringify(postData),
                                            printConfig: JSON.stringify({
                                                "type": "usb", //打印机类型：usb or network
                                                "name": g_android_print_config[0].ipOrName, //打印机名称或IP
                                                "copies": g_android_print_config[0].count, //打印份数
                                                "isLabel": g_android_print_config[0].labelPrinter //是否标签打印
                                            })
                                        }
                                    );
                                }
                            } else
                            {
                                cordova.plugins.barcodeScanner.barcodexprinter(
                                        function(result) {
                                        },
                                        function(error) {
                                            alert("打印失败: " + error);
                                        },
                                    {
                                        myPrintData: JSON.stringify(postData),
                                        printConfig: JSON.stringify({
                                            "type": "usb", //打印机类型：usb or network
                                            "name": g_android_print_config[0].ipOrName, //打印机名称或IP
                                            "copies": g_android_print_config[0].count, //打印份数
                                            "isLabel": g_android_print_config[0].labelPrinter //是否标签打印
                                        })
                                    }
                                );
                            }
                        } else {
                            //原有打印方式，支持商米T1安卓机
                            //Android客户端打印
                            if (parseInt(receptionPtNum) > 0)
                            {
                                for (var k = 0; k < parseInt(receptionPtNum) ; k++)
                                {
                                    cordova.plugins.barcodeScanner.print(
                                        function(result) {
                                        },
                                        function(error) {
                                            alert("打印失败: " + error);
                                        },
                                        {
                                            myPrintData: JSON.stringify(postData)

                                        }
                                    );
                                }
                            } else
                            {
                                cordova.plugins.barcodeScanner.print(
                                    function(result) {
                                    },
                                    function(error) {
                                        alert("打印失败: " + error);
                                    },
                                    {
                                        myPrintData: JSON.stringify(postData)

                                    }
                                );
                            }
                        }


                    } catch (e)
                    {
                        alert("打印失败: " + e.message);
                    }
                }
            }


            // 后台打印
            if (printSet_network_enable)
            {
                if (printSet_network_device_back_islabel)
                { // 临时给客户打印
                    //是否标签机打印
                    if (backstagePtNum > 0)
                    {
                        //处理标签数据
                        if (b_config && b_config.length > 0)
                        {
                            var order_no = 0;
                            var order_total_num = 0;
                            //获取总数
                            for (var ii = 0; ii < b_config.length; ii++)
                            {
                                order_total_num = parseInt(order_total_num) + parseInt(b_config[ii].product_num);
                            }
                            for (var ii = 0; ii < b_config.length; ii++)
                            {
                                for (var iii = 0; iii < b_config[ii].product_num; iii++)
                                {
                                    var temp_product_name = b_config[ii].product_name;
                                    if (b_config[ii] && b_config[ii].ProductTasteList && b_config[ii].ProductTasteList.length > 0)
                                    {
                                        temp_product_name += " ";
                                        for (var j = 0; j < b_config[ii].ProductTasteList.length; j++)
                                        {
                                            temp_product_name += b_config[ii].ProductTasteList[j].sv_taste_data_name;
                                        }
                                    }
                                    order_no++;
                                    var labelData = [];
                                    var danhao_label = pfData.order_running_id;
                                    if (pfData.everyday_serialnumber && _g_everyDaySerialNumber)
                                    {
                                        danhao_label = pfData.everyday_serialnumber;
                                    }
                                    if (pfData != null && pfData.meiridanhao != null && pfData.meiridanhao != "")
                                    {
                                        danhao_label = pfData.meiridanhao;
                                    }
                                    labelData.push({
                                        "Content": "单号:" + convertString(danhao_label) + "序号:" + order_no + "/" + order_total_num,
                                        "Columns": 1,
                                        "RowNum": 1,
                                        "RowMaxLength": 10,
                                        "Align": 0,
                                        "TextFont": 0,
                                        "TextFontSize": 8,
                                        "Width": 0
                                    });
                                    labelData.push({
                                        "Content": temp_product_name,
                                        "Columns": 1,
                                        "RowNum": 3,
                                        "RowMaxLength": 10,
                                        "Align": 0,
                                        "TextFont": 0,
                                        "TextFontSize": 10,
                                        "Width": 0
                                    });
                                    labelData.push({
                                        "Content": "",
                                        "Columns": 1,
                                        "RowNum": 1,
                                        "RowMaxLength": 10,
                                        "Align": 0,
                                        "TextFont": 0,
                                        "TextFontSize": 10,
                                        "Width": 0
                                    });
                                    if (_g_sv_uit_cache_name == 'cache_name_catering')
                                    {
                                        if (b_config[ii].sv_taste_total_money > 0)
                                        {
                                            var l_taste_total_money = parseFloat(b_config[ii].product_total) + parseFloat(b_config[ii].sv_taste_total_money);
                                            if (b_config[ii].product_num > 0)
                                            {
                                                l_taste_total_money = parseFloat(l_taste_total_money) / parseFloat(b_config[ii].product_num)
                                            }
                                            labelData.push({
                                                "Content": "￥" + l_taste_total_money.toFixed(2) + "元",
                                                "Columns": 2,
                                                "RowNum": 1,
                                                "RowMaxLength": 10,
                                                "Align": 1,
                                                "TextFont": 0,
                                                "TextFontSize": 8,
                                                "Width": 0
                                            });
                                        } else
                                        {
                                            
                                            var l_singletaste_total_money = parseFloat(b_config[ii].product_total);
                                            if (b_config[ii].product_num > 0)
                                            {
                                                l_singletaste_total_money = parseFloat(l_singletaste_total_money) / parseFloat(b_config[ii].product_num)
                                            }
                                            labelData.push({
                                                "Content": "￥" + parseFloat(l_singletaste_total_money).toFixed(2) + "元",
                                                "Columns": 2,
                                                "RowNum": 1,
                                                "RowMaxLength": 10,
                                                "Align": 1,
                                                "TextFont": 0,
                                                "TextFontSize": 8,
                                                "Width": 0
                                            });
                                        }
                                    } else
                                    {
                                        
                                        var l_singletaste_total_money = parseFloat(b_config[ii].product_total);
                                        if (b_config[ii].product_num > 0)
                                        {
                                            l_singletaste_total_money = parseFloat(l_singletaste_total_money) / parseFloat(b_config[ii].product_num)
                                        }
                                        labelData.push({
                                            "Content": "￥" + parseFloat(l_singletaste_total_money).toFixed(2) + "元",
                                            "Columns": 2,
                                            "RowNum": 1,
                                            "RowMaxLength": 10,
                                            "Align": 1,
                                            "TextFont": 0,
                                            "TextFontSize": 8,
                                            "Width": 0
                                        });
                                    }
                                    if ((!(typeof (user_id) == "undefined")) && user_id == '20806328') {
                                        labelData.push({
                                            "Content": "【" + convertString(config.user.sv_us_name) + "】",
                                            "Columns": 1,
                                            "RowNum": 1,
                                            "RowMaxLength": 10,
                                            "Align": 0,
                                            "TextFont": 0,
                                            "TextFontSize": 7,
                                            "Width": 0
                                        });
                                    } else {
                                        labelData.push({
                                            "Content": "【" + convertString(config.user.sv_us_name) + "】",
                                            "Columns": 1,
                                            "RowNum": 1,
                                            "RowMaxLength": 10,
                                            "Align": 0,
                                            "TextFont": 0,
                                            "TextFontSize": 7,
                                            "Width": 0
                                        });
                                        if (convertString(config.user.sv_us_phone))
                                        {
                                            labelData.push({
                                                "Content": "电话:" +
                                                convertString(config.user.sv_us_phone) + "谢谢惠顾!",
                                                "Columns": 1,
                                                "RowNum": 1,
                                                "RowMaxLength": 10,
                                                "Align": 0,
                                                "TextFont": 0,
                                                "TextFontSize": 7,
                                                "Width": 0
                                            });
                                        } else
                                        {
                                            labelData.push({
                                                "Content": "谢谢惠顾!",
                                                "Columns": 1,
                                                "RowNum": 1,
                                                "RowMaxLength": 10,
                                                "Align": 0,
                                                "TextFont": 0,
                                                "TextFontSize": 7,
                                                "Width": 0
                                            });
                                        }
                                    }

                                    labelData.push({
                                        "Content": hours + ":" + minute,
                                        "Columns": 2,
                                        "RowNum": 1,
                                        "RowMaxLength": 10,
                                        "Align": 1,
                                        "TextFont": 0,
                                        "TextFontSize": 7,
                                        "Width": 0
                                    });
                                    var tempdata = {
                                        "FooterList": labelData,
                                        "QRCodeData": null,
                                        "Action": 1,
                                        "PageType": 4,
                                        "PagePadding": 10
                                    };
                                    if (((typeof Cef) !== 'undefined'))
                                    {
                                        for (var i = 0; i < backstagePtNum; i++)
                                        {
                                            Cef.LabelPrint(JSON.stringify(tempdata),
                                          '' + 1 + '',
                                          backstagePtName,
                                          false,
                                          40,
                                          30);
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                else
                {
                    //普通后台打印
                    //postData.FooterList = [{}];
                    var a = [];
                    a.push({ "Content": "后台打印", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                    if (_g_sv_uit_cache_name == 'cache_name_catering' && pfData.sv_catering_grade)
                    {
                        a.push({ "Content": "桌/牌号：" + convertString(pfData.sv_catering_grade), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                    a.push({ "Content": "单号：" + convertString(pfData.order_running_id), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                    a.push(postData.HeaderList[postData.HeaderList.length - 1]);
                    postData.HeaderList = a;

                    //处理餐饮业打印信息
                    if (_g_sv_uit_cache_name == 'cache_name_catering')
                    {//如为餐饮后厨打印，仅打印商品及数量，不显示单价和小计

                        postData.TitleList = [];
                        postData.TitleList.push({ "Content": "商品", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 15 + StrWidth, "TextFontSize": 2 });
                        postData.TitleList.push({ "Content": "数量", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 6 + StrWidth, "TextFontSize": 2 });
                        postData.BodyList = back_catering_product_data;
                        var _tt = "";
                        if (strptype == 1)
                        {
                            _tt += "商品                                    ";
                        }
                        else
                        {
                            _tt += "商品                ";
                        }


                        if (strptype == 1)
                        {
                            _tt += "数量         ";
                        }
                        else
                        {
                            _tt += "数量     ";
                        }
                        postData.HeaderList[postData.HeaderList.length - 1] = { "Content": _tt, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 };
                    }

                    if (backstagePtNum > 0)
                    {
                        var postData_back = {
                            //-------------头部数据-----------------
                            "HeaderList": postData.HeaderList,
                            //-------------中部数据-----------------
                            "BodyList": postData.BodyList,
                            //-------------标题数据-----------------
                            "TitleList": postData.TitleList,
                            //-------------页脚数据-----------------
                            "FooterList": [],
                            //-------------店铺logo数据-----------------
                            "LogoData": postData.LogoData,
                            //-------------二维码数据-----------------
                            "QRCodeData": postData.QRCodeData,
                            //-----------------1：打印，0：预览-----------------
                            "Action": postData.Action,
                            //-----------------0:58mm,1:80mm-----------------
                            "PageType": postData.PageType,
                            "PagePadding": postData.PagePadding
                        };
                        Cef.CustormPrint(JSON.stringify(postData_back), '' + backstagePtNum + '', backstagePtName);
                    }
                }
            }
        } catch (e) {
            //alert(e.message);
        }
    }
    else
    {
        //
        //try {
        //    Cef.openMyPc(spfData, sconfig, ptype, 1, '' + receptionPtNum + '', receptionPtName);
        //    // 后台打印
        //    if (printSet_network_enable && backstagePtNum > 0)
        //    {
        //        Cef.openMyPc(spfData, sconfig, ptype, 1, '' + backstagePtNum + '', backstagePtName);
        //    }
        //} catch (e) {

        //} 
    }
}

//---===============获取商米T1打印数据实体===============---
//totalAmount应收总金额 deserved活动积分赠送现金优惠 givingtype 1积分类型，2减免丶赠送金额,isbackprint是否后台打印，排除收银的打印控制开关
function getsunmipushprintData(spfData, sconfig, ptype, totalAmount, deserved, givingtype, isbackprint) {
    var isDefault_templete = true;//是否模板打印模板，区分自定义打印模板
    var isDefault_templeteId = 0;
    //打印时间、销售时间的转换
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "/" + fnW((month + 1)) + "/" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
    var pfData = JSON.parse(spfData);
    var config = JSON.parse(sconfig);
    var strptype = 0;
    var back_catering_product_data = [];//后厨商品信息
    if (config && config.cof && config.cof.sv_uc_dayin)
    {
        var PrintConfig = JSON.parse(config.cof.sv_uc_dayin);
        if (PrintConfig != '[]' && PrintConfig != "" && PrintConfig != null)
        {
            strptype = PrintConfig.xiaopiao == 58 ? 0 : 1;
            if (PrintConfig.xiaopiao == 58)
            {
                strptype = 0;
            }
            else if (PrintConfig.xiaopiao == 80)
            {
                strptype = 1;
            }
            else if (PrintConfig.xiaopiao == 210)
            {
                strptype = 2;
            }
            else
            {
                strptype = 0;
            }

            isDefault_templeteId = PrintConfig.mo;
        }
    }
    var configData = [];
    var postData = {
        //-------------头部数据-----------------
        "HeaderList": [],
        //-------------中部数据-----------------
        "BodyList": [],
        //-------------标题数据-----------------
        "TitleList": [],
        //-------------页脚数据-----------------
        "FooterList": [
        ],
        //-------------店铺logo数据-----------------
        "LogoData": null,
        //-------------二维码数据-----------------
        "QRCodeData": null,
        //-----------------1：打印，0：预览-----------------
        "Action": 1,
        //-----------------0:58mm,1:80mm-----------------
        "PageType": strptype,
        "PagePadding": 0
    };

    if (config && config.cof && config.cof.sv_pfconfig && config.cof.sv_pfconfig.length > 10)
    {
        isDefault_templete = false;
        configData = JSON.parse(config.cof.sv_pfconfig);
    } else
    {
        configData = {
            "a": 1,
            "b": "1,1,0,0,1,1,0,0,0",
            "f": "0,1,1,1,1,1,0,1,1,1,1,1,1",
            "h": "1,0,1,1,1,0,1,1",
            "l": null,
            "p": 0,
            "q": {
                "Align": 1,
                "Width": 100,
                "Height": 100,
                "ImageString": ""
            },
            "t": ""
        };

        if (isDefault_templeteId == 1)
        {
            configData.f = "0,1,1,0,0,1,0,0,0,0,0,0,0";
        } else if (isDefault_templeteId == 2)
        {
            configData.f = "0,1,1,1,1,1,0,1,1,1,1,1,1";
        } else if (isDefault_templeteId == 3)
        {
            configData.f = "0,1,1,1,1,1,0,1,1,1,1,1,1";
        }
    }


    //使用自定义模板打印
    //if (config && config.cof && config.cof.sv_pfconfig && config.cof.sv_pfconfig.length > 10)
    //{
    if (config && config.cof)
    {
        try
        {
            var Ismember = false;
            var theintegral = 0;//本次积分
            var money = pfData.order_receivable;//钱，默认合计
            var ratiointegral = 1;//比例积分
            var integral = "";//积分(本次/累计积分)
            var sv_mw_availablepoint = 0;//累计积分
            var pointtocashset = "";//消费积分
            var preferentialMoney = 0;//优惠金额

            if (Ismember)
            {
                if (config.cof.sv_uc_pointtocashset != '[]' && config.cof.sv_uc_pointtocashset != "" && config.cof.sv_uc_pointtocashset != null)
                { pointtocashset = JSON.parse(config.cof.sv_uc_pointtocashset); }
                if (pointtocashset != '[]' && pointtocashset != "" && pointtocashset != null)
                {
                    money = pointtocashset[0];
                    ratiointegral = pointtocashset[1];
                }
                theintegral = parseInt(pfData.order_receivable / money * ratiointegral);
                sv_mw_availablepoint = pfData.user.sv_mw_availablepoint;
                integral = theintegral + "/ " + sv_mw_availablepoint;
                if (givingtype == 1 && givingtype > 0)
                {
                    integral = integral + "(含活动消费赠送" + deserved + "积分)";
                }
                preferentialMoney = parseInt((totalAmount - pfData.order_receivable) * 100) / 100 + "";
            }
            if (givingtype == 2)
            {
                preferentialMoney = preferentialMoney == 0 ? deserved + "(活动消费减免" + deserved + "元)" : preferentialMoney + "(含活动消费减免" + deserved + "元)";

            }

            var h_config = configData.h.split(','); //读取"0,0,0,0,0,0,0"的开关配置
            var t_config = configData.b.split(',');
            var b_config = pfData.prlist;
            var f_config = configData.f.split(',');
            var q_config = configData.q;
            var l_config = configData.l;
            if (h_config && h_config.length > 0)
            {
                if (h_config.length > 0 && h_config[0] == 1)
                    postData.HeaderList.push({ "Content": convertString(config.user.sv_us_name), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                if (h_config.length > 1 && h_config[1] == 1)
                {
                    //取手机号码
                    postData.HeaderList.push({ "Content": "微信:" + convertString(config.user.sv_wechat_number), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                }
                //if (h_config.length > 2 && h_config[2] == 1)
                //postData.HeaderList.push({ "Content":  (new Date()).Format("yyyy.MM.dd hh:mm:ss"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                //if (h_config.length > 3 && h_config[3] == 1) 
                //postData.HeaderList.push({ "Content": "Post机号：" , "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (h_config.length > 4 && h_config[4] == 1)
                    postData.HeaderList.push({ "Content": "单号：" + convertString(pfData.order_running_id), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (h_config.length > 5 && h_config[5] == 1)
                    postData.HeaderList.push({ "Content": "收银员：" + sv_current_operato, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (h_config.length > 6 && h_config[6] == 1 && Ismember)
                    postData.HeaderList.push({ "Content": "会员姓名：" + pfData.user.sv_mr_name, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (h_config.length > 7 && h_config[7] == 1 && Ismember)
                    postData.HeaderList.push({ "Content": "会员卡号：" + pfData.user.sv_mr_cardno, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (strptype < 2)
                {
                    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                    {
                        postData.HeaderList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        postData.HeaderList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
            }

            var StrWidth = 0;
            var PagePadding = 0;
            if (strptype == 1)
            {//80mm
                StrWidth = 2;
                PagePadding = 3;
            } else if (strptype == 2)//A4 210mm
            {
                StrWidth = 10;
                PagePadding = 10;
                postData.PagePadding = PagePadding;
            }


            if (t_config && t_config.length > 0)
            {
                var _t = "";
                if (t_config.length > 0 && t_config[0] == 1)
                {

                    if (strptype == 1)
                    {
                        _t += "商品              ";
                    }
                    else
                    {
                        _t += "商品     ";
                    }
                    postData.TitleList.push({
                        "Content": "商品",
                        "Columns": 1,
                        "RowNum": 1,
                        "RowMaxLength": 10,
                        "Align": 1,
                        "TextFont": 0,
                        "Width": 10 + StrWidth
                    });
                }

                if (t_config.length > 2 && t_config[2] == 1)
                {
                    if (strptype == 1)
                    {
                        _t += "礼品              ";
                    }
                    else
                    {
                        _t += "礼品     ";
                    }
                    postData.TitleList.push({ "Content": "礼品", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 10 + StrWidth });
                }

                if (t_config.length > 1 && t_config[1] == 1)
                {
                    _t += "   单价    ";
                    postData.TitleList.push({ "Content": "单价", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 + StrWidth });
                }

                if (t_config.length > 3 && t_config[3] == 1)
                {
                    _t += "   积分    ";
                    postData.TitleList.push({ "Content": "积分", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 + StrWidth });
                }


                if (t_config.length > 4 && t_config[4] == 1)
                {
                    if (strptype == 1)
                    {
                        _t += "数量     ";
                    }
                    else
                    {
                        _t += "数量 ";
                    }
                    postData.TitleList.push({ "Content": "数量", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 4 + StrWidth });
                }

                if (t_config.length > 5 && t_config[5] == 1)
                {
                    _t += "小计 ";
                    postData.TitleList.push({ "Content": "小计", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 + StrWidth });
                }

                if (t_config.length > 6 && t_config[6] == 1)
                {
                    _t += "合计 ";
                    postData.TitleList.push({ "Content": "合计", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 5 + StrWidth });
                }
                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                } else
                {
                    postData.HeaderList.push({ "Content": _t, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }

            }
            var product_num = 0;//商品总数
            if (b_config && b_config.length > 0)
            {
                var meter_goods = [];//次卡商品 
                for (var i = 0; i < b_config.length; i++)
                {
                    product_num += parseFloat(b_config[i].product_num);
                    var print_price = b_config[i].product_unitprice;
                    if (b_config[i].product_single_untprice)
                    {
                        print_price = b_config[i].product_single_untprice;
                    }
                    if (b_config[i].type == true)
                    {
                        //次卡消费
                        var b_str = b_config[i].product_name + "," + b_config[i].product_num + ",-" + b_config[i].product_num + "," + (b_config[i].cnum - b_config[i].product_num);
                        meter_goods.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        //普通消费
                        if (_g_sv_uit_cache_name == 'cache_name_catering')
                        {
                            //处理餐饮版口味价格
                            if (b_config[i].sv_taste_total_money && b_config[i].sv_taste_total_money > 0)
                            {
                                var l_taste_total_money = parseFloat(b_config[i].product_total) + parseFloat(b_config[i].sv_taste_total_money);
                                var b_str = b_config[i].product_name + "," + print_price + "," + b_config[i].product_num + "," + l_taste_total_money.toFixed(2);
                                postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            } else
                            {
                                var b_str = b_config[i].product_name + "," + print_price + "," + b_config[i].product_num + "," + b_config[i].product_total;
                                postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            }
                        } else
                        {
                            var b_str = b_config[i].product_name + "," + print_price + "," + b_config[i].product_num + "," + b_config[i].product_total;
                            postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        }

                        //后厨打印商品信息
                        var back_str = b_config[i].product_name + "," + b_config[i].product_num;
                        back_catering_product_data.push({ "Content": back_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }

                if (meter_goods && meter_goods.length > 0)
                {
                    var b_str = "项目,次数,实扣,剩余";
                    postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                    for (var j = 0; j < meter_goods.length; j++)
                    {
                        postData.BodyList.push(meter_goods[j]);
                    }
                }
            }
            if (f_config && f_config.length > 0)
            {
                if (strptype < 2)
                {
                    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                    {
                        postData.FooterList.push({ "Content": "............................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        postData.FooterList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
                if (f_config.length > 1 && f_config[1] == 1)
                    postData.FooterList.push({ "Content": "商品总数： " + product_num, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 2 && f_config[2] == 1)
                    postData.FooterList.push({ "Content": "金额合计： ¥ " + pfData.order_receivable, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (f_config.length > 3 && f_config[3] == 1)
                {
                    if (f_config.length > 3 && preferentialMoney && preferentialMoney!="0")
                        postData.FooterList.push({ "Content": "优惠金额：¥ " + preferentialMoney, "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }


                if (f_config.length > 4 && f_config[4] == 1 && Ismember)
                    postData.FooterList.push({ "Content": "储值余额：¥ " + pfData.user.sv_mw_availableamount, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                //if (f_config.length > 4 && f_config[4] == 1 && Ismember)
                //postData.FooterList.push({ "Content": "剩余次数：", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                //if (f_config.length > 5 && f_config[5] == 1)
                //postData.FooterList.push({ "Content": "累计欠款：¥ 200", "Columns": 2, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (f_config.length > 7 && f_config[7] == 1)
                {
                    var order_payment = pfData.order_payment;
                    if (isNullOrWhiteSpace(pfData.order_payment2) && (pfData.order_payment2.indexOf("待") < 0 || pfData.order_payment2 != "待收"))
                    {
                        order_payment = order_payment + "(" + pfData.order_money + ")/" + pfData.order_payment2 + "(" + pfData.order_money2 + ")";
                    }
                    postData.FooterList.push({ "Content": "支付方式：" + order_payment + " ", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (f_config.length > 8 && f_config[8] == 1 && Ismember)
                    postData.FooterList.push({ "Content": "积分（本次/累计）：" + integral, "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 9 && f_config[9] == 1)
                    postData.FooterList.push({ "Content": "销售时间：" + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (f_config.length > 10 && f_config[10] == 1)
                    postData.FooterList.push({ "Content": "电话：" + convertString(config.user.sv_us_phone), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                if (f_config.length > 11 && f_config[11] == 1)
                    postData.FooterList.push({ "Content": "地址：" + convertString(config.user.sv_us_address), "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });


                //postData.FooterList.push({ "Content": "打印时间：" + (new Date()).Format("yyyy.MM.dd hh:mm:ss"), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                postData.FooterList.push({ "Content": "谢谢惠顾，欢迎下次光临", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }
            if (q_config && q_config.ImageString)
            {
                postData.FooterList.push({ "Content": "二维码", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.QRCodeData = q_config;
            }


            if (strptype < 2)
            {
                postData.FooterList.push({ "Content": "—————————————————————————————-", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }
            if (l_config && l_config.ImageString)
            {
                if (l_config.ImageString.indexOf("http") >= 0)
                {
                    postData.LogoData = l_config;
                    postData.FooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                } else
                {
                    l_config.ImageString = "http://decerp.cc" + l_config.ImageString
                    postData.LogoData = l_configpostData.FooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
            }


            //非自定义模板，即自定义模板启用后，才可打印扩展信息
            if (!isDefault_templete || true)
            {
                //打印店铺扩展信息
                PreferentialTopUpGivingConfigList("PrintSeting", "PrintSet_ExtraInfo");

                if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0)
                {
                    var extra_info = Preferential_TopUpGiving_ConfigList[0].sv_detail_value;
                    if (extra_info)
                    {
                        if (extra_info.toLowerCase().indexOf('<br/>') > 0)
                        {
                            var extra_infos = extra_info.split('<br/>');
                            for (var i = 0; i < extra_infos.length; i++)
                            {
                                postData.FooterList.push({ "Content": extra_infos[i], "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            }
                        } else
                        {
                            postData.FooterList.push({ "Content": extra_info, "Columns": 1, "RowNum": 2, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        }
                    }
                }
            }


        } catch (e)
        {
        }
    }


    return JSON.stringify(postData);
}



//餐饮打印，可打印 总单(ptype = 1)、后厨 (ptype=2)、收银单据(ptype =3),是否加菜（默认为空,isadd=0，退菜单，isadd=1，加菜单）
function pushcateringprintData(spfData, sconfig, ptype, isadd) {
    var isDefault_templete = true;//是否模板打印模板，区分自定义打印模板
    var isDefault_templeteId = 0;
    //打印时间、销售时间的转换
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "/" + fnW((month + 1)) + "/" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
    var pfData = JSON.parse(spfData);
    var config = JSON.parse(sconfig);
    var strptype = 0;
    var back_catering_product_data = [];//后厨商品信息
    var sLEEP_MILLISECONDS = 200; // for中循环延时执行任务
    if (config && config.cof && config.cof.sv_uc_dayin)
    {
        var PrintConfig = JSON.parse(config.cof.sv_uc_dayin);
        if (PrintConfig != '[]' && PrintConfig != "" && PrintConfig != null)
        {
            strptype = PrintConfig.xiaopiao == 58 ? 0 : 1;
            if (PrintConfig.xiaopiao == 58)
            {
                strptype = 0;
            }
            else if (PrintConfig.xiaopiao == 80)
            {
                strptype = 1;
            }
            else if (PrintConfig.xiaopiao == 210)
            {
                strptype = 2;
            }
            else
            {
                strptype = 0;
            }

            isDefault_templeteId = PrintConfig.mo;
        }
    }
    var configData = [];
    var postData = {
        //-------------头部数据-----------------
        "HeaderList": [],
        //-------------中部数据-----------------
        "BodyList": [],
        //-------------标题数据-----------------
        "TitleList": [],
        //-------------页脚数据-----------------
        "FooterList": [
        ],
        //-------------店铺logo数据-----------------
        "LogoData": null,
        //-------------二维码数据-----------------
        "QRCodeData": null,
        //-----------------1：打印，0：预览-----------------
        "Action": 1,
        //-----------------0:58mm,1:80mm-----------------
        "PageType": strptype,
        "PagePadding": 0
    };

    if (config && config.cof && config.cof.sv_pfconfig && config.cof.sv_pfconfig.length > 10)
    {
        isDefault_templete = false;
        configData = JSON.parse(config.cof.sv_pfconfig);
    } else
    {
        configData = {
            "a": 1,
            "b": "1,1,0,0,1,1,0,0,0",
            "f": "0,1,1,1,1,1,0,1,1,1,1,1,1",
            "h": "1,0,1,1,1,0,1,1",
            "l": null,
            "p": 0,
            "q": {
                "Align": 1,
                "Width": 100,
                "Height": 100,
                "ImageString": ""
            },
            "t": ""
        };


    }


    //使用自定义模板打印
    //if (config && config.cof && config.cof.sv_pfconfig && config.cof.sv_pfconfig.length > 10)
    //{
    if (config && config.cof)
    {
        try
        {
            var Ismember;
            if (pfData.user && pfData.user.sv_mr_cardno)
            {
                Ismember = isNullOrWhiteSpace(pfData.user.sv_mr_cardno);//判断是否是会员 
            }
            var theintegral = 0;//本次积分
            var money = pfData.order_receivable;//钱，默认合计
            var ratiointegral = 1;//比例积分
            var integral = "";//积分(本次/累计积分)
            var sv_mw_availablepoint = 0;//累计积分
            var pointtocashset = "";//消费积分
            var preferentialMoney = 0;//优惠金额
            if (Ismember)
            {
                if (config.cof.sv_uc_pointtocashset != '[]' && config.cof.sv_uc_pointtocashset != "" && config.cof.sv_uc_pointtocashset != null)
                { pointtocashset = JSON.parse(config.cof.sv_uc_pointtocashset); }
                if (pointtocashset != '[]' && pointtocashset != "" && pointtocashset != null)
                {
                    money = pointtocashset[0];
                    ratiointegral = pointtocashset[1];
                }
                theintegral = parseInt(pfData.order_receivable / money * ratiointegral);
                sv_mw_availablepoint = pfData.user.sv_mw_availablepoint;
                integral = theintegral + "/ " + sv_mw_availablepoint;
                //if (givingtype == 1 && givingtype > 0)
                //{
                //    integral = integral + "(含活动消费赠送" + deserved + "积分)";
                //}
                //preferentialMoney = parseInt((totalAmount - pfData.order_receivable) * 100) / 100 + "";
            }
            //if (givingtype == 2)
            //{
            //    preferentialMoney = preferentialMoney == 0 ? deserved + "(活动消费减免" + deserved + "元)" : preferentialMoney + "(含活动消费减免" + deserved + "元)";

            //}

            var h_config = configData.h.split(','); //读取"0,0,0,0,0,0,0"的开关配置
            var t_config = configData.b.split(',');
            var b_config = pfData.prlist;
            var f_config = configData.f.split(',');
            var q_config = configData.q;
            var l_config = configData.l;
            if (h_config && h_config.length > 0)
            {

                if (ptype == 1)
                {
                    postData.HeaderList.push({ "Content": "小票总单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                    postData.HeaderList.push({ "Content": "牌号：" + convertString(pfData.sv_catering_grade), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    postData.HeaderList.push({ "Content": "单号：" + convertString(pfData.order_running_id), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    postData.HeaderList.push({ "Content": "收银：" + sv_current_operato + " " + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                } else if (ptype == 2)
                {
                    if (isadd == 0)
                    {//退菜单
                        postData.HeaderList.push({ "Content": "厨打退菜单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                    } else if (isadd == 1)
                    {//加菜单
                        postData.HeaderList.push({ "Content": "厨打加菜单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                    } else
                    {
                        postData.HeaderList.push({ "Content": "厨打单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                    }
                    postData.HeaderList.push({ "Content": "牌号：" + convertString(pfData.sv_catering_grade), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                    postData.HeaderList.push({ "Content": "单号：" + convertString(pfData.order_running_id), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    postData.HeaderList.push({ "Content": "收银：" + sv_current_operato + " " + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (strptype < 2)
                {
                    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                    {
                        postData.HeaderList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        postData.HeaderList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
            }

            var StrWidth = 0;
            var PagePadding = 0;
            if (strptype == 1)
            {//80mm
                StrWidth = 3;
                PagePadding = 5;
            } else if (strptype == 2)//A4 210mm
            {
                StrWidth = 10;
                PagePadding = 10;
                postData.PagePadding = PagePadding;
            }


            if (t_config && t_config.length > 0)
            {
                var _t = "";
                if (t_config.length > 0 && t_config[0] == 1)
                {

                    if (strptype == 1)
                    {
                        _t += "菜品                                          ";
                    }
                    else
                    {
                        _t += "菜品               ";
                    }
                    if (ptype == 1)
                    {
                        postData.TitleList.push({
                            "Content": "菜品",
                            "Columns": 1,
                            "RowNum": 1,
                            "RowMaxLength": 10,
                            "Align": 1,
                            "TextFont": 0,
                            "Width": 10 + StrWidth
                        });
                    } else if (ptype == 2)
                    {

                        postData.TitleList.push({
                            "Content": "菜品",
                            "Columns": 1,
                            "RowNum": 1,
                            "RowMaxLength": 10,
                            "Align": 1,
                            "TextFont": 0,
                            "Width": 10 + StrWidth,
                            "TextFontSize": 2
                        });
                    }
                }

                if (t_config.length > 4 && t_config[4] == 1)
                {
                    if (ptype == 1)
                    {
                        if (strptype == 1)
                        {
                            _t += "小计     ";
                        }
                        else
                        {
                            _t += "小计 ";
                        }
                    } else
                    {
                        if (strptype == 1)
                        {
                            _t += "数量     ";
                        }
                        else
                        {
                            _t += "数量 ";
                        }
                    }
                    if (ptype == 1)
                    {
                        postData.TitleList.push({ "Content": "小计", "Columns": 1, "RowNum": 1, "RowMaxLength": 5, "Align": 1, "TextFont": 0, "Width": 10 + StrWidth });
                    } else if (ptype == 2)
                    {
                        postData.TitleList.push({ "Content": "数量", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 10 + StrWidth, "TextFontSize": 2 });

                    }
                }

                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                } else
                {
                    if (ptype == 2)
                    {
                        _t = "菜品        数量   ";
                        postData.HeaderList.push({ "Content": _t, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                    } else
                    {
                        postData.HeaderList.push({ "Content": _t, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }

            }
            var product_num = 0;//商品总数
            if (b_config && b_config.length > 0)
            {
                var meter_goods = [];//次卡商品 
                for (var i = 0; i < b_config.length; i++)
                {
                    product_num += parseFloat(b_config[i].product_num);
                    if (b_config[i].type == true)
                    {
                        //次卡消费
                        var b_str = b_config[i].product_name + "," + b_config[i].product_num + ",-" + b_config[i].product_num + "," + (b_config[i].cnum - b_config[i].product_num);
                        meter_goods.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        //处理口味、规格、加料、打包数据

                        var temp_product_name = b_config[i].product_name;
                        if (b_config[i] && b_config[i].ProductTasteList && b_config[i].ProductTasteList.length > 0)
                        {
                            temp_product_name += " ";
                            for (var ii = 0; ii < b_config[i].ProductTasteList.length; ii++)
                            {
                                temp_product_name += b_config[i].ProductTasteList[ii].sv_taste_data_name;
                            }
                        }

                        //普通消费
                        var b_str = temp_product_name + "," + b_config[i].product_num;
                        if (ptype == 1)
                        {
                            if (_g_sv_uit_cache_name == 'cache_name_catering')
                            {
                                //处理餐饮版口味价格
                                if (b_config[i].sv_taste_total_money && b_config[i].sv_taste_total_money > 0)
                                {
                                    var l_taste_total_money = parseFloat(b_config[i].product_total) + parseFloat(b_config[i].sv_taste_total_money);
                                    postData.BodyList.push({ "Content": temp_product_name + "*" + b_config[i].product_num + "," + l_taste_total_money.toFixed(2), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                } else
                                {
                                    postData.BodyList.push({ "Content": temp_product_name + "*" + b_config[i].product_num + "," + b_config[i].product_total, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                }
                            } else
                            {
                                postData.BodyList.push({ "Content": temp_product_name + "*" + b_config[i].product_num + "," + b_config[i].product_total, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            }
                        } else
                        {
                            postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        }


                        //后厨打印商品信息
                        var back_str = temp_product_name + "," + b_config[i].product_num;
                        if (b_config[i] && b_config[i].sv_printer_ip)
                        {
                            if (ptype == 1)
                            {
                                back_catering_product_data.push({ "Content": back_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "PrinterIp": b_config[i].sv_printer_ip, "PrinterPort": b_config[i].sv_printer_port });
                            } else if (ptype == 2)
                            {
                                back_catering_product_data.push({ "Content": back_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "PrinterIp": b_config[i].sv_printer_ip, "PrinterPort": b_config[i].sv_printer_port, "TextFontSize": 2 });
                            }

                        } else
                        {
                            back_catering_product_data.push({ "Content": back_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        }
                    }
                }
            }
            if (f_config && f_config.length > 0)
            {
                if (strptype < 2)
                {
                    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                    {
                        postData.FooterList.push({ "Content": "............................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        postData.FooterList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
                postData.FooterList.push({ "Content": "总数： " + product_num, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }

            if (strptype < 2)
            {
                postData.FooterList.push({ "Content": "—————————————————————————————-", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }
            if (l_config && l_config.ImageString)
            {
                if (l_config.ImageString.indexOf("http") >= 0)
                {
                    postData.LogoData = l_config;
                    postData.FooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                } else
                {
                    l_config.ImageString = "http://decerp.cc" + l_config.ImageString
                    postData.LogoData = l_configpostData.FooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
            }
            if (strptype < 2)
            {
                //postData.FooterList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }

            //Cef.openMyPc(JSON.stringify(data2), JSON.stringify(configData), 0);
            //------------待扩展，数据注入、校验
            // 前台打印
            if (parseInt(receptionPtNum) > 0)
            {
                //是否Windows客户端环境
                if (((typeof Cef) !== 'undefined'))
                {
                    // 总单(ptype = 1)、后厨 (ptype=2)、收银单据(ptype =3)
                    if (ptype == 1)
                    {//总单
                        Cef.CustormPrint(JSON.stringify(postData), '' + 1 + '', receptionPtName);
                    } else if (ptype == 2)
                    {//后厨打印                        
                        //普通后台打印
                        postData.FooterList = [];
                        var a = [];
                        if (isadd == 0)
                        {//退菜单
                            a.push({ "Content": "厨打退菜单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        } else if (isadd == 1)
                        {//加菜单
                            a.push({ "Content": "厨打加菜单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        } else
                        {
                            a.push({ "Content": "厨打单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        }

                        a.push({ "Content": "牌号：" + convertString(pfData.sv_catering_grade), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        a.push({ "Content": "单号：" + convertString(pfData.order_running_id), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        a.push({ "Content": "收银：" + sv_current_operato + " " + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        if (strptype < 2)
                        {
                            if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                            {
                                a.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            } else
                            {
                                a.push({ "Content": ".......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            }
                        }
                        a.push(postData.HeaderList[postData.HeaderList.length - 1]);
                        postData.HeaderList = a;

                        //处理餐饮业打印信息
                        if (_g_sv_uit_cache_name == 'cache_name_catering')
                        {//如为餐饮后厨打印，仅打印商品及数量，不显示单价和小计

                            postData.TitleList = [];
                            postData.TitleList.push({ "Content": "菜品", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 20 + StrWidth, "TextFontSize": 2 });
                            postData.TitleList.push({ "Content": "数量", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 2, "TextFont": 0, "Width": 10 + StrWidth, "TextFontSize": 2 });
                            postData.BodyList = back_catering_product_data;
                            var _tt = "";
                            if (strptype == 1)
                            {
                                _tt += "菜品       ";
                            }
                            else
                            {
                                _tt += "菜品         ";
                            }


                            if (strptype == 1)
                            {
                                _tt += "数量         ";
                            }
                            else
                            {
                                _tt += "数量  ";
                            }
                            postData.HeaderList[postData.HeaderList.length - 1] = { "Content": _tt, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "TextFontSize": 2 };
                        }
                        if (_g_sv_uit_cache_name == 'cache_name_catering' && DishIsPrintedOnce)//1、是否开启后台打印；2、是否一菜一单
                        {
                            var productList = postData.BodyList;
                            if (productList && productList.length > 0)
                            {
                                for (var i = 0; i < productList.length; i++)
                                {
                                    var temp = [];
                                    var tempfooterList = [];
                                    temp.push(productList[i]);
                                    postData.BodyList = temp;
                                    tempfooterList.push({ "Content": "————————————————————————", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                    tempfooterList.push({ "Content": "合计" + productList[i].Content.split(',')[1], "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                    tempfooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                                    postData.FooterList = tempfooterList;
                                    //Cef.CustormPrint(JSON.stringify(postData), '' + backstagePtNum + '', backstagePtName);
                                    if (productList[i].PrinterIp && productList[i].PrinterPort)
                                    {
                                        Cef.NetworkPrint(JSON.stringify(postData), productList[i].PrinterIp, productList[i].PrinterPort, "1");
                                    }
                                }
                            }
                        }
                        else
                        {
                            //多菜一单
                            try
                            {
                                postData.FooterList.push({ "Content": "————————————————————————", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                postData.FooterList.push({ "Content": "合计： " + product_num, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                //Cef.CustormPrint(JSON.stringify(postData), '' + backstagePtNum + '', backstagePtName);
                                var productList = postData.BodyList;
                                if (productList && productList.length > 0)
                                {
                                    var printerIp;
                                    var printerPort;
                                    for (var i = 0; i < productList.length; i++)
                                    {
                                        if (productList[i].PrinterIp && productList[i].PrinterPort)
                                        {
                                            printerIp = productList[i].PrinterIp;
                                            printerPort = productList[i].PrinterPort;
                                            break;
                                        }
                                    }
                                    if (printerIp && printerPort)
                                    {
                                        Cef.NetworkPrint(JSON.stringify(postData), printerIp, printerPort, "1");
                                    }
                                }
                            } catch (e)
                            {
                                console.log(e.message);
                            }
                        }
                    }
                } else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    //是否Android客户端运行环境

                    if (ptype == 1)
                    {
                        //总单
                        try
                        {
                            //Android客户端打印
                            cordova.plugins.barcodeScanner.print(
                                function(result) {
                                },
                                function(error) {
                                    alert("打印失败: " + error);
                                },
                                {
                                    myPrintData: JSON.stringify(postData)
                                }
                            );
                        } catch (e)
                        {
                            alert("打印失败: " + e.message);
                        }
                    } else if (ptype == 2)
                    {
                        //后厨打印
                        postData.FooterList = [];
                        var a = [];
                        if (isadd == 0)
                        {//退菜单
                            a.push({ "Content": "厨打退菜单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        } else if (isadd == 1)
                        {//加菜单
                            a.push({ "Content": "厨打加菜单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        } else
                        {
                            a.push({ "Content": "厨打单", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        }

                        a.push({ "Content": "牌号：" + convertString(pfData.sv_catering_grade), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "TextFontSize": 2 });
                        a.push({ "Content": "单号：" + convertString(pfData.order_running_id), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        a.push({ "Content": "收银：" + sv_current_operato + " " + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                        if (strptype < 2)
                        {
                            if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                            {
                                a.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            } else
                            {
                                a.push({ "Content": ".......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                            }
                        }
                        a.push(postData.HeaderList[postData.HeaderList.length - 1]);
                        postData.HeaderList = a;

                        //处理餐饮业打印信息
                        if (_g_sv_uit_cache_name == 'cache_name_catering')
                        {
                            //如为餐饮后厨打印，仅打印商品及数量，不显示单价和小计

                            postData.TitleList = [];
                            postData.TitleList.push({ "Content": "菜品", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 20 + StrWidth, "TextFontSize": 2 });
                            postData.TitleList.push({ "Content": "数量", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 2, "TextFont": 0, "Width": 10 + StrWidth, "TextFontSize": 2 });
                            postData.BodyList = back_catering_product_data;
                            var _tt = "";
                            if (strptype == 1)
                            {
                                _tt += "菜品                                                        ";
                            }
                            else
                            {
                                _tt += "菜品         ";
                            }


                            if (strptype == 1)
                            {
                                _tt += "数量         ";
                            }
                            else
                            {
                                _tt += "数量  ";
                            }
                            postData.HeaderList[postData.HeaderList.length - 1] = { "Content": _tt, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0, "TextFontSize": 2 };
                        }

                        if (_g_sv_uit_cache_name == 'cache_name_catering' && DishIsPrintedOnce)//1、是否开启后台打印；2、是否一菜一单
                        {
                            var productList = [];
                            if (postData.BodyList && postData.BodyList.length > 0)
                            {
                                for (var i = 0; i < postData.BodyList.length; i++)
                                {
                                    productList.push({ "Content": postData.BodyList[i].Content, "Columns": postData.BodyList[i].Columns, "RowNum": postData.BodyList[i].RowNum, "RowMaxLength": postData.BodyList[i].RowMaxLength, "Align": postData.BodyList[i].Align, "TextFont": postData.BodyList[i].TextFont, "Width": postData.BodyList[i].Width, "PrinterIp": postData.BodyList[i].PrinterIp, "PrinterPort": postData.BodyList[i].PrinterPort, "TextFontSize": postData.BodyList[i].TextFontSize });
                                }
                            }

                            postData.BodyList = [];

                            var t1print = [];
                            if (productList && productList.length > 0)
                            {
                                var temp = [];
                                var tempfooterList = [];
                                for (var i = 0; i < productList.length; i++)
                                {
                                    temp = [];
                                    tempfooterList = [];
                                    postData.BodyList = [];
                                    temp.push({ "Content": productList[i].Content, "Columns": productList[i].Columns, "RowNum": productList[i].RowNum, "RowMaxLength": productList[i].RowMaxLength, "Align": productList[i].Align, "TextFont": productList[i].TextFont, "Width": productList[i].Width, "PrinterIp": productList[i].PrinterIp, "PrinterPort": productList[i].PrinterPort, "TextFontSize": productList[i].TextFontSize });
                                    tempfooterList.push({ "Content": "————————————————————————", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                    tempfooterList.push({ "Content": "合计: " + productList[i].Content.split(',')[1], "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                    tempfooterList.push({ "Content": "", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

                                    postData.FooterList = tempfooterList;
                                    //Cef.CustormPrint(JSON.stringify(postData), '' + backstagePtNum + '', backstagePtName);
                                    if (productList[i].PrinterIp && productList[i].PrinterPort)
                                    {
                                        //Cef.NetworkPrint(JSON.stringify(postData), productList[i].PrinterIp, productList[i].PrinterPort, "1");
                                        var t1PrintData = {
                                            //-------------头部数据-----------------
                                            "HeaderList": postData.HeaderList,
                                            //-------------中部数据-----------------
                                            "BodyList": temp,
                                            //-------------标题数据-----------------
                                            "TitleList": postData.TitleList,
                                            //-------------页脚数据-----------------
                                            "FooterList": postData.FooterList,
                                            //-------------店铺logo数据-----------------
                                            "LogoData": postData.LogoData,
                                            //-------------二维码数据-----------------
                                            "QRCodeData": postData.QRCodeData,
                                            //-----------------1：打印，0：预览-----------------
                                            "Action": postData.Action,
                                            //-----------------0:58mm,1:80mm-----------------
                                            "PageType": postData.PageType,
                                            "PagePadding": postData.PagePadding
                                        };

                                        cordova.plugins.barcodeScanner.cookposprint(
                                            function(result) {
                                            },
                                            function(error) {
                                                alert("打印失败: " + error);
                                            },
                                            {
                                                myPrintData: JSON.stringify(t1PrintData),
                                                myPrintIp: productList[i].PrinterIp,
                                                myPrintPort: productList[i].PrinterPort
                                            }
                                        );
                                    }
                                }
                            }
                        } else
                        {
                            //多菜一单
                            try
                            {
                                postData.FooterList.push({ "Content": "————————————————————————", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                postData.FooterList.push({ "Content": "合计： " + product_num, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                                var printerIp = postData.BodyList[0].PrinterIp;
                                var printerPort = postData.BodyList[0].PrinterPort;

                                if (printerIp && printerPort)
                                {
                                    cordova.plugins.barcodeScanner.cookposprint(
                                               function(result) {
                                               },
                                               function(error) {
                                                   alert("打印失败: " + error);
                                               },
                                               {
                                                   myPrintData: JSON.stringify(postData),
                                                   myPrintIp: printerIp,
                                                   myPrintPort: printerPort

                                               }
                                           );
                                }

                            } catch (e)
                            {
                                console.log(e.message);
                            }
                        }
                    }
                    else
                    {
                        try
                        {
                            //Android客户端打印
                            cordova.plugins.barcodeScanner.print(
                                function(result) {
                                },
                                function(error) {
                                    alert("打印失败: " + error);
                                },
                                {
                                    myPrintData: JSON.stringify(postData)

                                }
                            );
                        } catch (e)
                        {
                            alert("打印失败: " + e.message);
                        }
                    }
                }
            }
            else
            {
                if (((typeof Cef) !== 'undefined'))
                {
                    Cef.CustormPrint(JSON.stringify(postData));
                }
                    //是否Android客户端运行环境
                else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    try
                    {
                        //Android客户端打印
                        cordova.plugins.barcodeScanner.print(
                            function(result) {
                            },
                            function(error) {
                                alert("打印失败: " + error);
                            },
                            {
                                myPrintData: JSON.stringify(postData)

                            }
                        );
                    } catch (e)
                    {
                        alert("打印失败: " + e.message);
                    }
                }
            }

        } catch (e)
        {
        }
    }
    else
    {
        //
        //try {
        //    Cef.openMyPc(spfData, sconfig, ptype, 1, '' + receptionPtNum + '', receptionPtName);
        //    // 后台打印
        //    if (printSet_network_enable && backstagePtNum > 0)
        //    {
        //        Cef.openMyPc(spfData, sconfig, ptype, 1, '' + backstagePtNum + '', backstagePtName);
        //    }
        //} catch (e) {

        //} 
    }
}

//打印充值、冲次表单
function pushSavingData(spfData, sconfig, ptype) {
    //是否模板打印模板，区分自定义打印模板
    var isDefault_templete = true;
    var isDefault_templeteId = 0;
    //打印时间、销售时间的转换
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "/" + fnW((month + 1)) + "/" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
    var pfData = JSON.parse(spfData);
    var config = JSON.parse(sconfig);
    var strptype = 0;
    var actiontype = "充值";
    if (pfData.moedel.sv_mrr_type == 0)
    {
        actiontype = "充值";
    } else if (pfData.moedel.sv_mrr_type == 1)
    {
        actiontype = "扣费";
    } else if (pfData.moedel.sv_mrr_type == 5)
    {
        actiontype = "退还";
    }
    if (config && config.cof && config.cof.sv_uc_dayin)
    {
        var PrintConfig = JSON.parse(config.cof.sv_uc_dayin);
        if (PrintConfig != '[]' && PrintConfig != "" && PrintConfig != null)
        {
            strptype = PrintConfig.xiaopiao == 58 ? 0 : 1;
            if (PrintConfig.xiaopiao == 58)
            {
                strptype = 0;
            }
            else if (PrintConfig.xiaopiao == 80)
            {
                strptype = 1;
            }
            else if (PrintConfig.xiaopiao == 210)
            {
                strptype = 2;
            }
            else
            {
                strptype = 0;
            }

            isDefault_templeteId = PrintConfig.mo;
        }
    }
    var configData = [];
    var postData = {
        //-------------头部数据-----------------
        "HeaderList": [],
        //-------------中部数据-----------------
        "BodyList": [],
        //-------------标题数据-----------------
        "TitleList": [],
        //-------------页脚数据-----------------
        "FooterList": [
        ],
        //-------------店铺logo数据-----------------
        "LogoData": null,
        //-------------二维码数据-----------------
        "QRCodeData": null,
        //-----------------1：打印，0：预览-----------------
        "Action": 1,
        //-----------------0:58mm,1:80mm-----------------
        "PageType": strptype,
        "PagePadding": 0
    };

    configData = {
        "a": 1,
        "b": "1,1,0,0,1,1,0,0,0",
        "f": "0,1,1,1,1,1,0,1,1,1,1,1,1",
        "h": "1,0,1,1,1,0,1,1",
        "l": null,
        "p": 0,
        "q": {
            "Align": 1,
            "Width": 100,
            "Height": 100,
            "ImageString": ""
        },
        "t": ""
    };


    //使用自定义模板打印
    if (config && config.cof)
    {
        try
        {
            var Ismember;
            if (pfData.user.sv_mr_cardno)
            {
                Ismember = isNullOrWhiteSpace(pfData.user.sv_mr_cardno);//判断是否是会员 
            }
            var theintegral = 0;//本次积分
            var money = pfData.order_receivable;//钱，默认合计
            var ratiointegral = 1;//比例积分
            var integral = "";//积分(本次/累计积分)
            var sv_mw_availablepoint = 0;//累计积分
            var pointtocashset = "";//消费积分
            var preferentialMoney = 0;//优惠金额

            var h_config = configData.h.split(','); //读取"0,0,0,0,0,0,0"的开关配置
            var t_config = configData.b.split(',');
            var b_config = pfData.prlist;
            var f_config = configData.f.split(',');
            var q_config = configData.q;
            var l_config = configData.l;
            if (h_config && h_config.length > 0)
            {
                postData.HeaderList.push({ "Content": "欢迎光临", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });

                if (h_config.length > 0 && h_config[0] == 1)
                    postData.HeaderList.push({ "Content": convertString(config.user.sv_us_name), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                if (h_config.length > 1 && h_config[1] == 1)
                {
                    //取手机号码
                    postData.HeaderList.push({ "Content": "微信:" + convertString(config.user.sv_wechat_number), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                }

                postData.HeaderList.push({ "Content": "会员姓名：" + pfData.user.sv_mr_name, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.HeaderList.push({ "Content": "会员卡号：" + pfData.user.sv_mr_cardno, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }

            var StrWidth = 0;
            var PagePadding = 0;
            if (strptype == 1)
            {//80mm
                StrWidth = 3;
                PagePadding = 5;
            } else if (strptype == 2)//A4 210mm
            {
                StrWidth = 10;
                PagePadding = 10;
            }

            if (f_config && f_config.length > 0)
            {
                postData.FooterList.push({ "Content": "类型：" + actiontype, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": actiontype + "金额：" + parseFloat(pfData.moedel.sv_mrr_amountbefore || 0).toFixed(2), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": "赠送金额：" + parseFloat(pfData.moedel.sv_mrr_present || 0).toFixed(2), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": "付款方式：" + pfData.moedel.sv_mrr_payment, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": actiontype + "前金额：" + parseFloat(pfData.data.sv_mrr_amountbefore || 0).toFixed(2), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": actiontype + "后金额：" + parseFloat(pfData.data.sv_mrr_amountafter || 0).toFixed(2), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": actiontype + "时间：" + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (strptype < 2)
                {
                    if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                    {
                        postData.HeaderList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    } else
                    {
                        postData.HeaderList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                    }
                }
                postData.FooterList.push({ "Content": "谢谢惠顾，欢迎下次光临", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }


            //A4纸张类型重新排版<<<3列布局<<<居左布局


            //Cef.openMyPc(JSON.stringify(data2), JSON.stringify(configData), 0);
            //------------待扩展，数据注入、校验
            // 前台打印
            if (parseInt(receptionPtNum) > 0 && receptionPtName != null && receptionPtName != '')
            {
                //是否Windows客户端环境
                if (((typeof Cef) !== 'undefined'))
                {
                    Cef.CustormPrint(JSON.stringify(postData), '' + receptionPtNum + '', receptionPtName);
                } else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    //是否Android客户端运行环境
                    try
                    {
                        //Android客户端打印  打印充值信息
                        cordova.plugins.barcodeScanner.print(
                            function(result) {
                            },
                            function(error) {
                                alert("打印失败: " + error);
                            },
                            {
                                myPrintData: JSON.stringify(postData)

                            }
                        );
                    } catch (e)
                    {
                        alert("打印失败: " + e.message);
                    }
                }
            }
            else
            {
                if (((typeof Cef) !== 'undefined'))
                {
                    Cef.CustormPrint(JSON.stringify(postData));
                }
                    //是否Android客户端运行环境
                else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    try
                    {
                        //Android客户端打印
                        cordova.plugins.barcodeScanner.print(
                            function(result) {
                            },
                            function(error) {
                                alert("打印失败: " + error);
                            },
                            {
                                myPrintData: JSON.stringify(postData)

                            }
                        );
                    } catch (e)
                    {
                        alert("打印失败: " + e.message);
                    }
                }
            }
        } catch (e)
        {
        }
    }
    else
    {
        //
        //try {
        //    Cef.openMyPc(spfData, sconfig, ptype, 1, '' + receptionPtNum + '', receptionPtName);
        //    // 后台打印
        //    if (printSet_network_enable && backstagePtNum > 0)
        //    {
        //        Cef.openMyPc(spfData, sconfig, ptype, 1, '' + backstagePtNum + '', backstagePtName);
        //    }
        //} catch (e) {

        //} 
    }
}

//打印扣次表单
function pushAchargeData(spfData, sconfig, ptype) {
    //是否模板打印模板，区分自定义打印模板
    var isDefault_templete = true;
    var isDefault_templeteId = 0;
    //打印时间、销售时间的转换
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "/" + fnW((month + 1)) + "/" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
    var pfData = JSON.parse(spfData);
    var config = JSON.parse(sconfig);
    var strptype = 0;
    var actiontype = "充次";

    if (config && config.cof && config.cof.sv_uc_dayin)
    {
        var PrintConfig = JSON.parse(config.cof.sv_uc_dayin);
        if (PrintConfig != '[]' && PrintConfig != "" && PrintConfig != null)
        {
            strptype = PrintConfig.xiaopiao == 58 ? 0 : 1;
            if (PrintConfig.xiaopiao == 58)
            {
                strptype = 0;
            }
            else if (PrintConfig.xiaopiao == 80)
            {
                strptype = 1;
            }
            else if (PrintConfig.xiaopiao == 210)
            {
                strptype = 2;
            }
            else
            {
                strptype = 0;
            }

            isDefault_templeteId = PrintConfig.mo;
        }
    }
    var configData = [];
    var postData = {
        //-------------头部数据-----------------
        "HeaderList": [],
        //-------------中部数据-----------------
        "BodyList": [],
        //-------------标题数据-----------------
        "TitleList": [],
        //-------------页脚数据-----------------
        "FooterList": [
        ],
        //-------------店铺logo数据-----------------
        "LogoData": null,
        //-------------二维码数据-----------------
        "QRCodeData": null,
        //-----------------1：打印，0：预览-----------------
        "Action": 1,
        //-----------------0:58mm,1:80mm-----------------
        "PageType": strptype,
        "PagePadding": 0
    };

    configData = {
        "a": 1,
        "b": "1,1,0,0,1,1,0,0,0",
        "f": "0,1,1,1,1,1,0,1,1,1,1,1,1",
        "h": "1,0,1,1,1,0,1,1",
        "l": null,
        "p": 0,
        "q": {
            "Align": 1,
            "Width": 100,
            "Height": 100,
            "ImageString": ""
        },
        "t": ""
    };


    //使用自定义模板打印
    if (config && config.cof)
    {
        try
        {
            var Ismember;
            if (pfData.user.sv_mr_cardno)
            {
                Ismember = isNullOrWhiteSpace(pfData.user.sv_mr_cardno);//判断是否是会员 
            }
            var theintegral = 0;//本次积分
            var money = pfData.order_receivable;//钱，默认合计
            var ratiointegral = 1;//比例积分
            var integral = "";//积分(本次/累计积分)
            var sv_mw_availablepoint = 0;//累计积分
            var pointtocashset = "";//消费积分
            var preferentialMoney = 0;//优惠金额

            var h_config = configData.h.split(','); //读取"0,0,0,0,0,0,0"的开关配置
            var t_config = configData.b.split(',');
            var b_config = pfData.prlist;
            var f_config = configData.f.split(',');
            var q_config = configData.q;
            var l_config = configData.l;
            if (h_config && h_config.length > 0)
            {
                postData.HeaderList.push({ "Content": "欢迎光临", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });
                postData.HeaderList.push({ "Content": convertString(config.user.sv_us_name), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0 });

                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    postData.HeaderList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                } else
                {
                    postData.HeaderList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                if (h_config.length > 1 && h_config[1] == 1)
                {
                    //取手机号码
                    postData.HeaderList.push({
                        "Content": "微信:" + convertString(config.user.sv_wechat_number), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 0
                    });
                }

                postData.HeaderList.push({ "Content": "会员姓名：" + pfData.user.sv_mr_name, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.HeaderList.push({ "Content": "会员卡号：" + pfData.user.sv_mr_cardno, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    postData.HeaderList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                } else
                {
                    postData.HeaderList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }


            }

            var StrWidth = 0;
            var PagePadding = 0;
            if (strptype == 1)
            {//80mm
                StrWidth = 3;
                PagePadding = 5;
            } else if (strptype == 2)//A4 210mm
            {
                StrWidth = 10;
                PagePadding = 10;
            }



            if (t_config && t_config.length > 0)
            {
                var _t = "";
                if (strptype == 1)
                {
                    _t += "项目              ";
                }
                else
                {
                    _t += "项目     ";
                }
                postData.TitleList.push({ "Content": "项目", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 12 + StrWidth });

                if (strptype == 1) { _t += "次数              "; } else { _t += "次数     "; }
                postData.TitleList.push({ "Content": "次数", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 6 + StrWidth });

                if (strptype == 1) { _t += "金额              "; } else { _t += "金额     "; }
                postData.TitleList.push({ "Content": "金额", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 1, "TextFont": 0, "Width": 6 + StrWidth });

                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                } else
                {
                    //postData.HeaderList.push({ "Content": _t, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }

            }
            //充次商品
            postData.BodyList.push({ "Content": "项目,次数,金额", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

            var b_str = pfData.moedel.sv_mcr_productname + "," + pfData.moedel.sv_mcr_count + "," + pfData.moedel.sv_mcr_money;
            postData.BodyList.push({ "Content": b_str, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });

            if (f_config && f_config.length > 0)
            {
                if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    postData.FooterList.push({ "Content": "......................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                } else
                {
                    postData.FooterList.push({ "Content": "..........................................................", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                }
                postData.FooterList.push({ "Content": "付款金额：" + parseFloat(pfData.data.sv_mcr_money || 0).toFixed(2), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": "付款方式：" + pfData.data.sv_mcr_payment, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": actiontype + "前可用：" + parseFloat(pfData.data.sv_mcr_countbefore || 0).toFixed(0), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": actiontype + "后可用：" + parseFloat(pfData.data.sv_mcr_countafter || 0).toFixed(0), "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": actiontype + "时间：" + time, "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
                postData.FooterList.push({ "Content": "谢谢惠顾，欢迎下次光临", "Columns": 1, "RowNum": 1, "RowMaxLength": 10, "Align": 0, "TextFont": 0, "Width": 0 });
            }


            //A4纸张类型重新排版<<<3列布局<<<居左布局


            //Cef.openMyPc(JSON.stringify(data2), JSON.stringify(configData), 0);
            //------------待扩展，数据注入、校验
            // 前台打印
            if (parseInt(receptionPtNum) > 0 && receptionPtName != null && receptionPtName != '')
            {
                //是否Windows客户端环境
                if (((typeof Cef) !== 'undefined'))
                {
                    Cef.CustormPrint(JSON.stringify(postData), '' + receptionPtNum + '', receptionPtName);
                } else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    //是否Android客户端运行环境
                    try
                    {
                        //Android客户端打印  打印充值信息
                        cordova.plugins.barcodeScanner.print(
                            function(result) {
                            },
                            function(error) {
                                alert("打印失败: " + error);
                            },
                            {
                                myPrintData: JSON.stringify(postData)

                            }
                        );
                    } catch (e)
                    {
                        alert("打印失败: " + e.message);
                    }
                }
            }
            else
            {
                if (((typeof Cef) !== 'undefined'))
                {
                    Cef.CustormPrint(JSON.stringify(postData));
                }
                    //是否Android客户端运行环境
                else if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
                {
                    try
                    {
                        //Android客户端打印
                        cordova.plugins.barcodeScanner.print(
                            function(result) {
                            },
                            function(error) {
                                alert("打印失败: " + error);
                            },
                            {
                                myPrintData: JSON.stringify(postData)

                            }
                        );
                    } catch (e)
                    {
                        alert("打印失败: " + e.message);
                    }
                }
            }
        } catch (e)
        {
        }
    }
    else
    {
        //
        //try {
        //    Cef.openMyPc(spfData, sconfig, ptype, 1, '' + receptionPtNum + '', receptionPtName);
        //    // 后台打印
        //    if (printSet_network_enable && backstagePtNum > 0)
        //    {
        //        Cef.openMyPc(spfData, sconfig, ptype, 1, '' + backstagePtNum + '', backstagePtName);
        //    }
        //} catch (e) {

        //} 
    }
}

//------------模板实现----收银
function decerp_print(pfData) {
    try
    {
        Cef.CustrmPrint(JSON.stringify(pfData));
    } catch (e)
    {

    }
}

function convertString(str) {
    if (str) return str;
    else return "";
}

//补位，如果时间为小于两位数的时候，前面加上‘0’
function fnW(str) {
    var num;
    str >= 10 ? num = str : num = "0" + str;
    return num;
}


//---获取安卓设备的USB/网口打印配置
function getAndroidPrintConfig() {
    try
    {
        if (decerpbrowser && decerpbrowser.versions && decerpbrowser.versions.android)
        {
            //g_android_print_config
            PreferentialTopUpGivingConfigList("AndroidPrinterConfig", "AndroidPrinterConfig");
            if (Preferential_TopUpGiving_ConfigList != null && Preferential_TopUpGiving_ConfigList.length > 0)
            {
                var svDetailValue = $.parseJSON(Preferential_TopUpGiving_ConfigList[0].sv_detail_value);
                if (svDetailValue)
                {
                    if (svDetailValue[0].whetherToEnablenable || svDetailValue[1].whetherToEnablenable)
                    {
                        g_android_print_config = svDetailValue;
                        //前台打印机
                        if (svDetailValue[0].printerType == "usb")
                        {
                            //打印机名称         svDetailValue[0].ipOrName
                            //打印份数           svDetailValue[0].count
                            //是否标签打印       svDetailValue[0].labelPrinter
                        } else
                        {
                            $("#AndroidFrontNetwork").prop("checked", true);
                            //网口打印机IP                   svDetailValue[0].ipOrName
                            //网口打印机端口，默认9100        svDetailValue[0].port
                            //打印份数                       svDetailValue[0].count
                            //是否标签打印                   svDetailValue[0].labelPrinter
                        }
                        //后台打印机
                        if (svDetailValue[1].printerType == "usb")
                        {
                            //打印机名称         svDetailValue[1].ipOrName
                            //打印份数           svDetailValue[1].count
                            //是否标签打印       svDetailValue[1].labelPrinter
                        } else
                        {
                            //网口打印机IP                   svDetailValue[1].ipOrName
                            //网口打印机端口，默认9100        svDetailValue[1].port
                            //打印份数                       svDetailValue[1].count
                            //是否标签打印                   svDetailValue[1].labelPrinter
                        }
                    }
                }
            }
        }
    } catch (e)
    {

    }
}