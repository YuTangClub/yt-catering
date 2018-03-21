layui.extend({
    admin: '{/}../../static/js/admin'
});

layui.use(['table', 'jquery', 'admin', 'layer', 'form'], function () {
    var table = layui.table,
        $ = layui.jquery,
        admin = layui.admin
        , layer = layui.layer
        , form = layui.form;


    table.render({
        elem: '#foodList',
        cellMinWidth: 80,
        cols: [
            [{
                type: 'checkbox'
            }, {
                field: 'fdImg', title: '图片', sort: true
            }, {
                field: 'fdName', title: '菜品名称', templet: '#usernameTpl'
            }, {
                field: 'fdPrice', title: '价格', sort: true, templet: '#priceTpl', style: "text-align:center"
            }, {
                field: 'fdMprice', title: '会员价', sort: true, templet: '#mpriceTpl', style: "text-align:center"
            }, {
                field: 'fdRecommend', title: '推荐', sort: true, templet: '#recommendTpl'
            }, {
                field: 'fdStock', title: '库存', sort: true
            }, {
                field: 'fdStatus', title: '状态', templet: '#statusTpl'
            }, {
                field: 'fdUnit', title: '单位'
            }, {
                field: 'fdRemark', title: '简介'
            }, {
                field: 'operate', title: '操作', toolbar: '#operateTpl', unresize: true
            }]
        ],
        url: "list.do",
        event: true,
        page: true,
        limit: 5,
        limits: [5, 10, 20, 50]
    });


    /*
    * 查询结果分页
    * */
    form.on('submit(search)', function (data) {
        //debugger
        table.reload('foodList', {
            url: "list.do",
            where: data.field
        });
        return false;
    });

    form.on('switch(fdRecommend)',function (data) {
        //debugger;
        var flag = data.elem.checked;
        var fdId = data.value;
        var fdRecommend = 0;
        if(flag){
            fdRecommend = 1;
        }
        $.post(
            "edit.do",
            {
                "fdRecommend":fdRecommend,
                "fdId":fdId
            },
            function (msg) {
                if(msg == "1"){
                    layer.msg('设置成功',{icon:1,time:1000})
                }
            },
            "text"
        );
    })


    form.on('switch(fdStatus)',function (data) {
        //debugger;
        var flag = data.elem.checked;
        var fdId = data.value;
        var fdStatus = 0;
        if(flag){
            fdStatus = 1;
        }
        $.post(
            "edit.do",
            {
                "fdStatus":fdStatus,
                "fdId":fdId
            },
            function (msg) {
                if(msg == "1"){
                    layer.msg('设置成功',{icon:1,time:1000})
                }
            },
            "text"
        );
    })


    var active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('articleList'),
                data = checkStatus.data;
            //console.log(data);
            //layer.alert(JSON.stringify(data));
            if (data.length > 0) {
                layer.confirm('确认要删除吗？' + JSON.stringify(data), function (index) {
                    layer.msg('删除成功', {
                        icon: 1
                    });
                    //找到所有被选中的，发异步进行删除
                    $(".layui-table-body .layui-form-checked").parents('tr').remove();
                });
            } else {
                layer.msg("请先选择需要删除的文章！");
            }

        },
        Recommend: function () {
            var checkStatus = table.checkStatus('articleList'),
                data = checkStatus.data;
            if (data.length > 0) {
                layer.msg("您点击了推荐操作");
                for (var i = 0; i < data.length; i++) {
                    console.log("a:" + data[i].recommend);
                    data[i].recommend = "checked";
                    console.log("aa:" + data[i].recommend);
                    form.render();
                }

            } else {
                console.log("b");
                layer.msg("请先选择");
            }

            //$(".layui-table-body .layui-form-checked").parents('tr').children().children('input[name="zzz"]').attr("checked","checked");
        },
        Top: function () {
            layer.msg("您点击了置顶操作");
        },
        Review: function () {
            layer.msg("您点击了审核操作");
        },
        setRecommend:function () {
            debugger
            var fdRecommend = $(this).val();
            if (fdRecommend == 1) {
                fdRecommend = 0;
            } else {
                fdRecommend = 1;
            }
            $.post(
                "setFoodInfo",
                {'fdRecommend': fdRecommend},
                function (data) {
                    if (data == 1) {
                        layer.msg('修改成功', {
                            timeout: 1500
                        })
                    }
                },
                "text"
            );
        }

    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });



    // $('.recommend').on('click', function () {
    //     debugger
    //     var fdRecommend = $(this).val();
    //     if (fdRecommend == 1) {
    //         fdRecommend = 0;
    //     } else {
    //         fdRecommend = 1;
    //     }
    //     $.post(
    //         "setFoodInfo",
    //         {'fdRecommend': fdRecommend},
    //         function (data) {
    //             if (data == 1) {
    //                 layer.msg('修改成功', {
    //                     timeout: 1500
    //                 })
    //             }
    //         },
    //         "text"
    //     );
    // })

    /*用户-删除*/
    window.member_del = function (obj, id) {
        layer.confirm('确认要删除吗？', function (index) {
            //发异步删除数据
            $(obj).parents("tr").remove();
            layer.msg('已删除!', {
                icon: 1,
                time: 1000
            });
        });
    }

    /*
    * 修改推荐属性
    * */
    window.setRecommend = function (obj) {
        debugger
        var fdRecommend = $(obj).val();
        if (fdRecommend == 1) {
            fdRecommend = 0;
        } else {
            fdRecommend = 1;
        }
        $.post(
            "setFoodInfo",
            {'fdRecommend': fdRecommend},
            function (data) {
                if (data == 1) {
                    layer.msg('修改成功', {
                        timeout: 1500
                    })
                }
            },
            "text"
        );
    }

});

layui.define(['jquery'],function () {
    var $ = layui.jquery;

    function setFoodInfo() {
        debugger
        var fdRecommend = $(this).val();
        if (fdRecommend == 1) {
            fdRecommend = 0;
        } else {
            fdRecommend = 1;
        }
        $.post(
            "setFoodInfo",
            {'fdRecommend': fdRecommend},
            function (data) {
                if (data == 1) {
                    layer.msg('修改成功', {
                        timeout: 1500
                    })
                }
            },
            "text"
        );
    }
})

function delAll(argument) {
    var data = tableCheck.getData();
    layer.confirm('确认要删除吗？' + data, function (index) {
        //捉到所有被选中的，发异步进行删除
        layer.msg('删除成功', {
            icon: 1
        });
        $(".layui-form-checked").not('.header').parents('tr').remove();
    });

}