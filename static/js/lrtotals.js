Highcharts.chart('container1', {
    chart: {
        type: 'line',
        backgroundColor: '#21252A',
        
    
    },

    title: {
        text: 'Total Acres Burned By Year: 1990 - 2020',
        style: {
            color: '#FFFFFF',
            fontWeight: 'bold'
        }
       
    },
    subtitle: {
        text: 'Source: Oregon Department of Forestry'
    },
    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 1990 to 2020'
        }
    },
    yAxis: {
        title: {
            text: 'Total Acres'
        }
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 1990
        }
    },
    series: [{
        name: 'Acres Burned',
        data: [11517, 8147, 54174, 3089, 64552, 8046, 229744, 3013, 6823, 15508, 113334, 75994, 1258496, 123391, 6418, 71253, 120377, 371617, 17217, 65699, 18015, 18298, 220812, 128307, 287143, 386125, 50499, 493379, 461506, 17243, 845088]
   
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