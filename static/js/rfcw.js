Highcharts.chart('container2', {
    chart: {
        type: 'column',
        backgroundColor:'#21252A',
    },

    legend: {
        itemHoverStyle: {
            color: 'white'
        }
    },


    title: {
        text: 'Random Forest Classifier',
        style: {
            color: '#FFFFFF',
            fontWeight: 'bold'
        }
       
    },
    subtitle: {
        text: 'Feature Importances'
    },
    xAxis: {
        categories: [
            
            'Fire Data', 'Fire and Weather Data', 'Fire and Weather w/Agg Temp'

        ],
        labels: {
            style: {
                color: 'white'
            }
        },
    
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Weight of Importance'
        },
        
        labels: {
            style: {
                color: 'white'
            }
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Longitude',
        data: [38.2, 18.7,18.0 ]
    }, {
        name: 'Latitude',
        data: [37.2, 18.0, 17.1]

    }, {
        name: 'Weather: Temp Min AVG',
        data: [null, 15.2, 14.4]

    }, {
        name: 'Weather: Temp Max AVG',
        data: [null, 14.6, 13.9]

    }, {
        name: 'Weather: Average Precipitation',
        data: [null, null, 12.3]

    }, {
        name: 'Fire Year',
        data: [14.5, 8.6, 7.7]

    }, {
        name: 'Weather: Percipitation AVG',
        data: [null, 8.1, null]

    }, {
        name: 'Weather: Snow Depth AVG',
        data: [null, 2.3, 2.2]

    }, {
        name: 'Fuel Model: X',
        data: [1.5, 1.5, 1.4]

    }, {
        name: 'Fuel Model: A',
        data: [0.8, 1.4, 1.4]

    }, {
        name: 'Fuel Model: C',
        data: [.8, 1.3, 1.2]

    }, {
        name: 'Fuel Model: H',
        data: [0.7, 1.3, 1.3]

    }, {
        name: 'Fuel Model: L',
        data: [.7, 1.2, 1.2]

    }, {
        name: 'General Cause: Human',
        data: [.7, 1.2, 1.2]

    }, {
        name: 'Fuel Model: F',
        data: [.6, 0.9, 0.9]

    }, {
        name: 'General Cause: Nature',
        data: [0.7, 0.8, 0.9]

    }, {
        name: 'General Cause: Misc',
        data: [0.5, 0.8, 0.8]
    }, {
        name: 'Fuel Model: J',
        data: [.6, 0.8, 0.8]
    }, {
        name: 'Fuel Model: G',
        data: [0.5, 0.6, 0.6]

    }, {
        name: 'Fuel Model: R',
        data: [0.4, 0.5, 0.6]

    }, {
        name: 'Fuel Model: I',
        data: [0.5, 0.5, 0.6]

    }, {
        name: 'Fuel Model: K',
        data: [0.4, 0.5, 0.4]

    }, {
        name: 'Fuel Model: T',
        data: [0.3, 0.4, 0.5]

    }, {
        name: 'Fuel Model: U',
        data: [0.3, 0.4, 0.4]

    }, {
        name: 'Fuel Model: B',
        data: [0.2, 0.2, 0.3]

    }, {
        name: 'Weather: Snow AVG',
        data: [null, 0.1, 0.1]

    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
});

document.getElementById('small').addEventListener('click', function () {
    chart.setSize(400);
});

document.getElementById('large').addEventListener('click', function () {
    chart.setSize(600);
});

document.getElementById('auto').addEventListener('click', function () {
    chart.setSize(null);
});
