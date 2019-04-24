var param = RX.page.param;
var id = RX.page.param.id;
var formUrl = RX.page.param.formUrl;
$(function () {

    if (formUrl) {
        $("#formUrl").show().find("input").val(formUrl);
    }
    if (id) {
        $.ajax({
            type: 'post',
            url: '/report/getFormPreviewDataById',
            data: {id: id},
            success: function (ar) {
                if (ar.success) {
                    renderForm(ar.data, ar.data.type);
                } else {
                    showError();
                }
            },
            error: function () {
                showError();
            }
        })
    } else {
        var parentWin = RX.page.parentWin(),
            prevWin = RX.page.prevWin();
        if (typeof parentWin.getFormData === "function") {
            var form = parentWin.getFormData();
            if (form.type && form.propertyList.length) {
                showPreview(form);
            } else {
                showNoChart();
            }
        } else if (typeof prevWin.getFormData === "function") {
            var form = prevWin.getFormData();
            if (form.type && form.propertyList.length) {
                showPreview(form);
            } else {
                showNoChart();
            }
        } else {
            showNoChart();
        }
    }

});

function showPreview(form) {
    $("#noChart").hide();
    $.ajax({
        type: 'post',
        url: '/report/getFormPreviewData',
        data: {json: JSON.stringify(form)},
        success: function (ar) {
            if (ar.success) {
                renderForm(ar.data, form.type);
            } else {
                showError();
            }
        },
        error: function () {
            showError();
        }
    })
}

function renderForm(data, type) {
    try {
        if (type == "1") {
            renderChartGrid(data);
        } else if (type == "2") {
            renderChartColumn(data);
        } else if (type == "3") {
            renderChartLine(data);
        } else if (type == "4") {
            renderChartPie(data);
        } else {
            showNoChart();
        }
    } catch (e) {
        showError();
    }
}

function showNoChart() {
    $("#chartGrid").hide();
    $("#chartColumn").hide();
    $("#chartLine").hide();
    $("#chartPie").hide();
    $("#noChart").text("没有数据").show();
}

function showError() {
    $("#chartGrid").hide();
    $("#chartColumn").hide();
    $("#chartLine").hide();
    $("#chartPie").hide();
    $("#noChart").text("数据异常").show();
}

function renderChartGrid(data) {
    $("#chartGrid").show();
    var gridHead = ["<thead>", "<tr>", "<th style='width:45px'>序号</th>"],
        gridBody = ["<tbody>", "{{#each list:index}}", "<tr>", "<td class='orderTag'></td>"];
    if (data.columns && data.columns.length) {
        $.each(data.columns, function (i, t) {
            gridHead.push("<th>" + t.title + "</th>");
            gridBody.push("<td>{{" + t.id + "}}</td>");
        })
    }
    gridHead.push("</tr>");
    gridHead.push("</thead>");
    gridBody.push("</tr>");
    gridBody.push("{{/each}}");
    gridBody.push("</tbody>");
    //初始化机构VM
    var gridVm = new Rxvm({
        widget: RX.Grid,
        partials: {
            gridHead: gridHead.join(""),
            gridBody: gridBody.join("")
        },
        el: '#chartGrid',
        data: {
            title: data.settings.title,
            list: data.rows
        }
    });
}

function renderChartColumn(data) {
    $("#chartColumn").show();
    // 图表配置
    var options = {
        chart: {
            type: 'column'                          //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: data.settings.title || ""                // 标题
        },
        xAxis: {
            title: {
                text: data.settings.xTitle || ""                // x 轴标题
            },
            categories: []
        },
        yAxis: {
            title: {
                text: data.settings.yTitle || ""                // y 轴标题
            }
        }
        // series: [{                              // 数据列
        //     name: yPro.title,                        // 数据列名
        //     data: []                     // 数据
        // }]
    };
    var hasXpro = !!(data.xPro), xPro = data.xPro;
    var yPros = data.yPros, series = [];
    $.each(yPros, function (i, t) {
        series.push({name: t.title, data: []});
    });
    $.each(data.rows, function (i, t) {
        if (hasXpro) {
            options.xAxis.categories.push(t[xPro.id]);
        }
        $.each(yPros, function (is, yPro) {
            var value = parseInt(t[yPro.id], 10);
            value = isNaN(value) ? 0 : value;
            series[is].data.push(value);
        });
    });
    options.series = series;
    // 图表初始化函数
    var chart = Highcharts.chart('chartColumn', options);
}

function renderChartLine(data) {
    $("#chartLine").show();
    var xPro = data.xPro, yPro = data.yPro;
    // 图表配置
    var options = {
        chart: {
            type: 'line'                          //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: data.settings.title || ""                 // 标题
        },
        xAxis: {
            title: {
                text: data.settings.xTitle || ""                // x 轴标题
            },
            categories: []
        },
        yAxis: {
            title: {
                text: data.settings.yTitle || ""                // y 轴标题
            }
        }
        // series: [{                              // 数据列
        //     name: yPro.title,                        // 数据列名
        //     data: []                     // 数据
        // }]
    };

    var hasXpro = !!(data.xPro), xPro = data.xPro;
    var yPros = data.yPros, series = [];
    $.each(yPros, function (i, t) {
        series.push({name: t.title, data: []});
    });
    $.each(data.rows, function (i, t) {
        if (hasXpro) {
            options.xAxis.categories.push(t[xPro.id]);
        }
        $.each(yPros, function (is, yPro) {
            var value = parseInt(t[yPro.id], 10);
            value = isNaN(value) ? 0 : value;
            series[is].data.push(value);
        });
    });
    options.series = series;

    // 图表初始化函数
    var chart = Highcharts.chart('chartLine', options);
}

function renderChartPie(data) {
    $("#chartPie").show();
    var xPro = data.xPro, yPro = data.yPros[0];
    // 图表配置
    var options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: data.settings.title || ""
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
                        mouseOver: function () {
                            this.slice();
                        },
                        // 鼠标移出时，收回突出显示
                        mouseOut: function () {
                            this.slice();
                        },
                        // 默认是点击突出，这里屏蔽掉
                        click: function () {
                            return false;
                        }
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: yPro.title,
            data: []
        }]
    };
    $.each(data.rows, function (i, t) {
        var value = parseInt(t[yPro.id], 10);
        value = isNaN(value) ? 0 : value;
        options.series[0].data.push([t[xPro.id], value]);
    });
    // 图表初始化函数
    var chart = Highcharts.chart('chartPie', options);
}