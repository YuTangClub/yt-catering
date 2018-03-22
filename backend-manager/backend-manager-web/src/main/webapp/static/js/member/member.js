

layui.use(['table', 'jquery'], function () {
    var table = layui.table,
        $ = layui.jquery;

    table.render({
        //容器元素
        elem: '#memberList',
        //最小宽度
        cellMinWidth: 80,
        //列
        cols: [
            [{
                type: 'checkbox'
            }, {
                field: 'member_id', title: 'ID', sort: true
            },{
                field: 'member_name', title: '用户名'
            },{
                field: 'member_password', title: '密码'
            },{
                field: 'member_phone', title: '手机'
            },{
                field: 'member_gender', title: '性别'
            },{
                field: 'member_level', title: '等级',sort: true
            }]
        ],
        //通过URL进行数据绑定
        url:'list.do',
        //是否开启分页
        page: true,
        limit:10,
        limits:[10,50,100]
    });
    var active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('memberList'),
                data = checkStatus.data;
            if (data.length > 0) {
                layer.confirm('确认要删除吗？' + JSON.stringify(data), function (index) {
                    layer.msg('删除成功', {
                        icon: 1
                    });
                    //找到所有被选中的，发异步进行删除
                    $(".layui-table-body .layui-form-checked").parents('tr').remove();
                });
            } else {
                layer.msg("请先选择需要删除的商品！");
            }

        }
    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    /*用户-删除*/
    // window.member_del = function (obj, id) {
    //     layer.confirm('确认要删除吗？', function (index) {
    //         //发异步删除数据
    //         $(obj).parents("tr").remove();
    //         layer.msg('已删除!', {
    //             icon: 1,
    //             time: 1000
    //         });
    //     });
    // }

});

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