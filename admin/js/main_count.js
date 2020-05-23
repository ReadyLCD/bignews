$(function () {
    // 获取总体的数据
    $.ajax({
        type: 'get',
        url: BigNew.data_info,
        success: function (res) {
            // console.log(res);
            $('.scolor00 em').html(res.totalArticle);
            $('.scolor01 em').html(res.dayArticle);
            $('.scolor02 em').html(res.totalComment);
            $('.scolor03 em').html(res.dayComment);
        }
    })

    // 日新增文章数
    $.ajax({
        type: 'get',
        url: BigNew.day_article,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                loadEchartsOne(res);
            }
        }
    })
    // 折线图Echarts
    function loadEchartsOne(res) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('curve_show'));

        var data = [];
        var date = [];
        for (var i = 0; i < res.date.length; i++) {
            data.push(res.date[i].count);
            date.push(res.date[i].date);
        }

        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '日新增文章数',
            },

            xAxis: {
                name: '日',
                type: 'category',
                boundaryGap: false,
                data: date
            },
            legend: {
                data: ['新增文章'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                },
                right: 50
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            series: [
                {
                    name: '新增文章',
                    type: 'line',
                    smooth: true,
                    // symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#f80'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,136,0,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(255,180,0,0.25)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,222,0,0.00)'
                        }])
                    },
                    data: data
                }
            ],
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    // 分类文章数量比
    $.ajax({
        type: 'get',
        url: BigNew.article_count,
        success: function (res) {
            // console.log(res);
            var data1 = [];
            var data2 = [];
            for (var i = 0; i < res.date.length; i++) {
                data1.push(res.date[i].name);
                data2.push({ value: res.date[i].articles, name: res.date[i].name });
            }
            // console.log(data1);
            // console.log(data2);
            if (res.code == 200) {
                loadEchartsTwo(data1, data2);
            }
        }
    })
    // 环形图Echarts
    function loadEchartsTwo(data1, data2) {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('pie_show'));

        option1 = {
            title: {
                left: 'center',
                text: '分类文章数量比',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                data: data1,
                top: 30
            },
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19'],
            series: [
                {
                    name: '分类名称',
                    type: 'pie',
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '24',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: data2
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
    }

    // 日文章访问量
    $.ajax({
        type: 'get',
        url: BigNew.article_dayvisit,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                var dataOne = [];
                var dataTwo = [];
                for (var key in res.data) {
                    dataOne.push(key);
                    dataTwo.push(res.data[key]);
                }
                // console.log(dataOne);
                // console.log(dataTwo);
                loadEchartsThree(dataOne, dataTwo);
            }
        }
    })
    // 柱状图Echarts
    function loadEchartsThree(dataOne, dataTwo) {
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('column_show'));

        option2 = {
            title: {
                left: 'center',
                text: '日文章访问量',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                },

            },
            legend: {
                data: ['日访问量'],
                top: 30
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: dataOne
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            color: ['#3398DB'],
            series: [
                {
                    name: '日访问量',
                    type: 'bar',
                    barWidth: '50%',
                    data: dataTwo
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
    }
})