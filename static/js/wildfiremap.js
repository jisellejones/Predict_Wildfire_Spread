

// Add map tile
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: mapBoxToken
});
console.log(mapBoxToken)

// Add Map
let map = L.map('map', {
	center: [44.058174, -121.315308],
	zoom: 6,
    layers: [dark]
});

function init() {
  // Use the list of sample names to populate the select options
  d3.json("/api/wildfire/1/All Severity/2020").then((data) => {
    let actual = []
    let predicted = []
    for (var i = 0; i < data.length; i++) {
      actual.push(data[i]['actual_fire_severity'])
      predicted.push(data[i]['predicted_fire_severity'])
    };
  
    // Count occurrences of severity 1, 2, 3
    let actual_count1 = actual.filter(x => x === 1).length 
    let actual_count2 = actual.filter(x => x === 2).length 
    let actual_count3 = actual.filter(x => x === 3).length 
    let predicted_count1 = predicted.filter(x => x === 1).length 
    let predicted_count2 = predicted.filter(x => x === 2).length
    let predicted_count3 = predicted.filter(x => x === 3).length 

    console.log(actual_count1, actual_count2, actual_count3, predicted_count1, predicted_count2, predicted_count3)

    Highcharts.chart('graphpredict', {
      chart: {
          type: 'column',
          backgroundColor: '#202020',
          height: 500,
      },
      title: {
          text: `Predicted vs Actual Fire Severity\n2020\nML Model 1`,
          style: {
            color: '#FFFFFF',
          }
      },
      subtitle: {
          text: 'Source: Oregon Department of Forestry'
      },
      xAxis: {
          categories: [
              '1',
              '2',
              '3',
          ],
          title: {
            text: 'Severity'
          },
          crosshair: true
      },
      yAxis: {
          min: 0,
          gridLineWidth: 0,
          title: {
              text: 'Number of Fires'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y} </b></td></tr>',
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
          name: 'Predicted',
          data: [predicted_count1, predicted_count2, predicted_count3]
      }, {
          name: 'Actual',
          data: [actual_count1, actual_count2, actual_count3]
      }]
    });
  });
}

// Initializethe Chart
init()

// Add layer(s) to mapg
let fires = new L.LayerGroup();

// function to update map
function updateMap(model, severity, year) {
  d3.json(`/api/wildfire/${model}/${severity}/${year}`).then(function(data){
      console.log(severity, year)
      // remove all the markers in one go
      fires.clearLayers();
      for (var i = 0; i < data.length; i++) {
          lat = data[i]['latitude']
          lng = data[i]['longitude']
          var marker = L.circle(L.latLng(lat, lng), {
              fillOpacity: .6,
              color: getColor(data[i]['actual_fire_severity']),
              fillColor: getColor(data[i]['actual_fire_severity']),
              weight:1,
              radius:Math.sqrt((data[i]['total_acres']/100) + 2),
              stroke: true
          }).bindPopup('Name: ' + data[i]['fire_name'] + '<br>Year: '+ data[i]['fire_year'] + '<br>Total Acres Burned: ' + data[i]['total_acres']).addTo(fires);
      }
  });
  
  map.addLayer(fires);
}

function filterMap() {
  let filters = {
    model: d3.select('#mlModel').property('value'),
    severity: d3.select('#severity').property('value'),
    year: d3.select('#year').property('value'),
  };
  let model = filters.model
  let severity;
  let year;
  if (filters.severity === "") {
      severity = 'All Severity'
  } else {
    severity = filters.severity
  }
  if (filters.year === "") {
      year = 'All Years'
  } else {
    year = filters.year
  }
  updateMap(model, severity, year);
  updateChart(model, severity, year);
}

// Determines the radius of the fire marker based on the number of acres burned.
function getRadius(acres) {
  radius: Math.sqrt(cases / 100) + 2
    return Math.sqrt(acres / 100) + 2;
  }

// This function determines the color of the marker based on the severity of the fire.
function getColor(severity) {
  if (severity > 2) {
    return "#FF7700";
  }
  if (severity > 1) {
    return "#eecc00";
  }
  return "#00FFFF";
}

// Updates Bar Chart
function updateChart(model, severity, year) {  
  d3.json(`/api/wildfire/${model}/${severity}/${year}`).then(function(data){
    let actual = []
    let predicted = []
    for (var i = 0; i < data.length; i++) {
      actual.push(data[i]['actual_fire_severity'])
      predicted.push(data[i]['predicted_fire_severity'])
    };
  
    let actual_count1 = actual.filter(x => x === 1).length 
    let actual_count2 = actual.filter(x => x === 2).length 
    let actual_count3 = actual.filter(x => x === 3).length 
    let predicted_count1 = predicted.filter(x => x === 1).length 
    let predicted_count2 = predicted.filter(x => x === 2).length
    let predicted_count3 = predicted.filter(x => x === 3).length 

    console.log(actual_count1, actual_count2, actual_count3, predicted_count1, predicted_count2, predicted_count3)

    Highcharts.chart('graphpredict', {
      chart: {
          type: 'column',
          backgroundColor: '#202020',
          height: 500,
      },
      title: {
          text: `Predicted vs Actual Fire Severity \n ${year} ML Model ${model}`,
          style: {
            color: '#FFFFFF',
          }
      },
      subtitle: {
          text: 'Source: Oregon Department of Forestry' 
      },
      xAxis: {
          categories: [
              '1',
              '2',
              '3',
          ],
          labels: {
            style: {
                color: 'white'
            },
            title: {
              text: 'Severity'
            }
          },
          crosshair: true
      },
      yAxis: {
          min: 0,
          gridLineWidth: 0,
          title: {
              text: 'Number of Fires'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y} </b></td></tr>',
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
          name: 'Predicted',
          data: [predicted_count1, predicted_count2, predicted_count3]
      }, {
          name: 'Actual',
          data: [actual_count1, actual_count2, actual_count3]
      }]
    });
  });
}
  

// //Event listener for changes
// d3.select("#year").on("keypress", filterMap);
d3.select("#submitbutton").on("click", filterMap);