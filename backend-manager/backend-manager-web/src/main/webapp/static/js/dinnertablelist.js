layui.extend({
    admin: '{/}../../static/js/admin'
});

layui.use(['form','table', 'jquery', 'admin'], function () {
    var form = layui.form,
        table = layui.table,
        $ = layui.jquery,
        admin = layui.admin;

    table.render({
        //容器元素
        elem: '#dinnertableList',
        //最小宽度
        cellMinWidth: 80,
        //列,field\title属于列属性，cols属于表格属性
        cols: [
            [{
                type: 'checkbox'
            }, {
                field: 'tbName', title: '餐桌名称', sort: true
            },  {
                field: 'ttName', title: '餐桌类型'
            },  {
                field: 'tbStatus', title: '餐桌状态', templet:'#shelfTpl'
            },{
                field: 'shopName', title: '所属商家'
            }, {
                field: 'operate', title: '操作', toolbar: '#operateTpl', unresize: true
            }]
        ],
        //通过URL进行数据绑定
        url: '../../dinnerTable',
        //是否开启分页
        page: true,
        limits: [10, 50, 100]
    });
    var active = {
        reload:function(){
           var keyWord=$.trim($('#keyWord').val());
           table.reload('dinnertableList',{
               page:{curr:1},
               where:{keyWord:keyWord}
           });
        },
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('dinnertableList'),
                data = checkStatus.data;
            if (data.length > 0) {
                layer.confirm('确认要删除吗？', function (index) {
                    //在前台页面把选中数据删除：找到所有被选中的
                    $(".layui-table-body .layui-form-checked").parents('tr').remove();
                    //形成一个ID的数组
                    var ids = [];
                    for (var i = 0; i < data.length; i++) {
                        ids.push(data[i].tbId);
                    }
                    //发出异步的请求去后台
                    //发出异步请求
                    $.post(
                        //url
                        '../../dinnerTable/batch',
                        //data
                        {'ids[]': ids},
                        //success
                        function (data) {
                            console.log(data);
                        }
                    );
                    //提示用户删除成功
                    layer.msg('删除成功', {
                        icon: 1
                    });
                });
            } else {
                layer.msg("请先选择需要删除的餐桌！");
            }

        }
    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    $('.we-search .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    //修改状态
    //监听上架操作
    form.on('checkbox(lockDemo)', function(obj){
        //this.value是当前列的id
        console.log(this.value)
        //obj.elem.checked 是锁定的状态
        console.log(obj.elem.checked)
        // layer.tips('锁定状态：' + obj.elem.checked, obj.othis);
        var data = null;
        if(obj.elem.checked){
            data = {'tbId':this.value,'tbStatus':0};
        }else {
            data = {'tbId':this.value,'tbStatus':1};
        }
        $.ajax({
            url:'../../editStatus',
            data:data,
            success:function (v) {
                if(v==1){

                    layer.msg('状态修改成功!');
                }else {
                    layer.tips('状态修改失败', obj.othis);
                }
            },
            dataType:'json'
        })
    });
});

