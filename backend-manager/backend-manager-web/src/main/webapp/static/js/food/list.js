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
        skin: 'line',
        cellMinWidth: 80,
        cols: [
            [{
                type: 'checkbox'
            }, {
                field: 'fdImg', title: '图片',width:'10%',style:'',templet:'#imgTpl'
            }, {
                field: 'fdName', title: '菜品名称'
            }, {
                field: 'fdPrice', title: '价格', sort: true
            }, {
                field: 'fdMprice', title: '会员价', sort: true
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
            where: data.field,
            page:{
                curr:1
            }
        });
        return false;
    });

    form.on('switch(fdRecommend)',function (data) {
        debugger;
        var flag = data.elem.checked;
        var fdId = data.value;
        var fdRecommend = -1;
        var Ids = [];
        Ids.push(fdId);
        if(flag){
            fdRecommend = 1;
        }
        $.post(
            "setStatus.do",
            {
                "fdRecommend":fdRecommend,
                "Ids[]":Ids
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
        debugger;
        var flag = data.elem.checked;
        var fdId = data.value;
        var fdStatus = -1;
        var Ids = [];
        Ids.push(fdId);
        if(flag){
            fdStatus = 1;
        }
        $.post(
            "setStatus.do",
            {
                "fdStatus":fdStatus,
                "Ids[]":Ids
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
            var checkStatus = table.checkStatus('foodList'),
                data = checkStatus.data;
            var Ids = [];
            if (data.length > 0) {
                layer.confirm('确认要删除这'+data.length+'条记录吗？', function (index) {
                    for(var i=0; i<data.length;i++){
                        Ids.push(data[i].fdId);
                    }
                    debugger;
                    $.post(
                        "delete.do",
                        {"Ids[]":Ids},
                        function (msg) {
                        },
                        "text"
                    );
                    //找到所有被选中的，发异步进行删除
                    $(".layui-table-body .layui-form-checked").parents('tr').remove();
                    layer.msg('删除成功', {
                        icon: 1,
                        time: 1000
                    },function () {
                        location.reload();
                    });
                });
            } else {
                layer.msg("请先选择菜品！",{
                    time:1500
                });
            }

        }

    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    /**
     * 设置菜品的推荐
     */
    window.setRecommend = function (url,status,msg) {
        var checkStatus = table.checkStatus('foodList'),
            data = checkStatus.data;
        var Ids = [];
        if (data.length > 0) {
            for(var i=0; i<data.length;i++){
                Ids.push(data[i].fdId);
            }
            debugger;
            $.post(
                url,
                {
                    "Ids[]":Ids,
                    "fdRecommend":status
                },
                function (msg) {
                },
                "text"
            );
            debugger;
            // location.reload();
            layer.msg('设置成功', {
                icon: 1,
                time: 1000
            },function () {
                location.reload();
            });
        } else {
            layer.msg("请先选择菜品！", {
                time: 1500
            });
        }
    }

    /**
     * 设置菜品的状态
     */
    window.setStatus = function (url,status,msg) {
        var checkStatus = table.checkStatus('foodList'),
            data = checkStatus.data;
        var Ids = [];
        if (data.length > 0) {
            for(var i=0; i<data.length;i++){
                Ids.push(data[i].fdId);
            }
            debugger;
            $.post(
                url,
                {
                    "Ids[]":Ids,
                    "fdStatus":status
                },
                function (msg) {
                },
                "text"
            );
            debugger;
            layer.msg('设置成功', {
                icon: 1,
                time: 1500
            },function () {
                location.reload();
            });
        } else {
            layer.msg("请先选择菜品！", {
                time: 1500
            });
        }
    }

    /*用户-删除*/
    window.member_del = function (obj, id) {
        layer.confirm('确认要删除吗？', function (index) {
            var fdId = $(obj).parents("tr").find("#fdId").val();
            var Ids = new Array();
            Ids.push(fdId);
            //debugger;
            //发异步删除数据
            $.post(
                "delete.do",
                {"Ids[]":Ids},
                function (msg) {
                    if(msg != 0){
                        $(obj).parents("tr").remove();

                        layer.msg('删除'+msg+'条记录', {
                            icon: 1,
                            time: 2000
                        },function () {
                            location.reload();
                        });
                    }else {
                        layer.msg('请选择元素', {
                            icon: 1,
                            time: 2000
                        });
                    }
                },
                "text"
            );
        });
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