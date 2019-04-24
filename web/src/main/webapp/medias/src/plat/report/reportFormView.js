var param = RX.page.param;
$(function () {
    $.ajax({
        type:'post',
        url:'/report/getReportFormData',
        success:function(ar){
            if(ar.success){
                renderChartGrid(ar.data);
                renderChartColumn(ar.data);
                renderChartLine(ar.data);
                renderChartPie(ar.data);
            }else{
                RX.alert(ar.msg);
            }
        }
    })
});

function renderChartGrid(data){
    //初始化机构VM
    var gridVm = new Rxvm({
        widget: RX.Grid,
        el: '#chartGrid',
        data:{list:data}
    });
}

function renderChartColumn(data){
    // 图表配置
    var options = {
        chart: {
            type: 'column'                          //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: '柱状图'                 // 标题
        },
        xAxis: {
            title: {
                text: '年龄区间（岁）'                // y 轴标题
            },
            categories: []
        },
        yAxis: {
            title: {
                text: '人数'                // y 轴标题
            }
        },
        series: [{                              // 数据列
            name: '人数',                        // 数据列名
            data: []                     // 数据
        }]
        // series: [{                              // 数据列
        //     data: []                     // 数据
        // }]
    };
    $.each(data, function(i,t){
        options.xAxis.categories.push(t["AGE_AREA"]);
        var value = parseInt(t["USER_NAME_NUM"], 10);
        value = isNaN(value) ? 0 : value;
        options.series[0].data.push(value);
    });
    // 图表初始化函数
    var chart = Highcharts.chart('chartColumn', options);
}

function renderChartLine(data){
    // 图表配置
    var options = {
        chart: {
            type: 'line'                          //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: '折线图'                 // 标题
        },
        xAxis: {
            title: {
                text: '年龄区间（岁）'                // y 轴标题
            },
            categories: []
        },
        yAxis: {
            title: {
                text: '人数'                // y 轴标题
            }
        },
        series: [{                              // 数据列
            name: '人数',                        // 数据列名
            data: []                     // 数据
        }]
        // series: [{                              // 数据列
        //     data: []                     // 数据
        // }]
    };
    $.each(data, function(i,t){
        options.xAxis.categories.push(t["AGE_AREA"]);
        var value = parseInt(t["USER_NAME_NUM"], 10);
        value = isNaN(value) ? 0 : value;
        options.series[0].data.push(value);
    });
    // 图表初始化函数
    var chart = Highcharts.chart('chartLine', options);
}

function renderChartPie(data){
    // 图表配置
    var options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '饼状图'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>' +
            '占比: <b>{point.percentage:.1f}%</b><br>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                states: {
                    hover: {
                        enabled: false
                    }
                },
                slicedOffset: 20,         // 突出间距
                point: {                  // 每个扇区是数据点对象，所以事件应该写在 point 下面
                    events: {
                        // 鼠标滑过是，突出当前扇区
                        mouseOver: function() {
                            this.slice();
                        },
                        // 鼠标移出时，收回突出显示
                        mouseOut: function() {
                            this.slice();
                        },
                        // 默认是点击突出，这里屏蔽掉
                        click: function() {
                            return false;
                        }
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '人数',
            data: []
        }]
    };
    $.each(data, function(i,t){
        var value = parseInt(t["USER_NAME_NUM"], 10);
        value = isNaN(value) ? 0 : value;
        options.series[0].data.push([t["AGE_AREA"], value]);
    });
    // 图表初始化函数
    var chart = Highcharts.chart('chartPie', options);
}