data = d3.json("/api/features/fire").then(function(data){

Highcharts.chart('container2', {
    chart: {
        type: 'column',
        backgroundColor: 'black',
    },
    title: {
        text: 'Random Forest Classifier',
        
    },
    subtitle: {
        text: 'Fire Data'
    },
    xAxis: {
        categories: [
            
            'Feature Importances'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percent (%)'
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
        name: '',
        data: []

    }],

responsive: {
    rules: [{
        condition: {
            maxWidth: 400
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