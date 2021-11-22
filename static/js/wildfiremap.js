// Add map tile
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Add Map
let map = L.map('map', {
	center: [44.058174, -121.315308],
	zoom: 6,
    layers: [dark]
});

// Add layer(s) to map
let fires = new L.LayerGroup();

// function to update map
function updateMap(severity, year) {
  d3.json("/api/wildfire/" + severity + "/" + year).then(function(data){
      for (var i = 0; i < data.length; i++) {
          lat = data[i]['latitude']
          lng = data[i]['longitude']
          console.log(lat, lng)
          var marker = L.circle(L.latLng(lat, lng), {
              fillOpacity: .8,
              color: getColor(data[i]['actual_fire_severity']),
              fillColor: getColor(data[i]['actual_fire_severity']),
              weight:1,
              radius:getRadius(data[i]['total_acres']),
              stroke: true
          }).bindPopup('Year: ' + data[i]['fire_year'] + '<br>Total Acres Burned: ' + data[i]['total_acres']).addTo(fires);
      }
  });
  fires.addTo(map);
}

function filterMap() {
  let filters = {
    severity: d3.select('#severity').property('value'),
    year: d3.select('#year').property('value'),
  };

  let severity;
  let year;
  if (filters.severity === "") {
      severity = 'No Severity'
  } else {
    severity = filters.severity
  }
  if (filters.year === "") {
      year = 'No Year'
  } else {
    year = filters.year
  }
  updateMap(severity, year);
}

// Determines the radius of the fire marker based on the number of acres burned.
function getRadius(acres) {
    return acres * 10;
  }

// This function determines the color of the marker based on the severity of the fire.
function getColor(severity) {
    if (severity > 7) {
        return "#781616";
    }
    if (severity > 6) {
        return "#BB2323";
    }
    if (severity > 5) {
      return "#ea2c2c";
    }
    if (severity > 4) {
      return "#ea822c";
    }
    if (severity > 3) {
      return "#ee9c00";
    }
    if (severity > 2) {
      return "#eecc00";
    }
    if (severity > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

//Event listener for changes
d3.select("#button").on("click", filterMap());
