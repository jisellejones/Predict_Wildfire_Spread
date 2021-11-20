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

// Reference to fires
let overlays = {
    "Fires": fires,
  };
// put all this in a function
let x = 3

data = d3.json("/api/wildfire/severity/" + x).then(function(data){
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
        }).bindPopup('Year: ' + data[i]['fire_year'] + '<br>Total Acres Burned: ' + data[i]['total_acres']).addTo(map);
    }
});   
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



// Variable to keep track of all the filters as an object.
var filters = {};

// Use this function to update the filters. 
function updateFilters() {

  // Save the element that was changed as a variable.
  let changedElement = d3.select(this);

  // Save the value that was changed as a variable.
  let elementValue = changedElement.property("value");
  console.log(elementValue);

  // Save the id of the filter that was changed as a variable.
  let filterId = changedElement.attr("id");
  console.log(filterId);

  //If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
    filters[filterId] = elementValue;
  } else {
    delete filters[filterId];
  }
  console.log(filters)
  // Call function to apply all filters and rebuild the table
  filterMap(filters);
}
// Filter the table when data is entered.
function filterMap(filterList) {
  
  // Create the filtered data
  let filteredData = {};

  //Loop through all of the filters and keep any data that
  // matches the filter values
  //if the key matches a column then update the value
  for ([key, value] of Object.entries(filterList)) { 
    console.log(key);
    console.log(value); 
    if (key === "datetime") {
      filteredData = filteredData.filter(row => row.datetime === value);
      } else {
        console.log("Year field is blank.")
      }
    if (key === "city") {
      filteredData = filteredData.filter(row => row.city == value);
    } else {
      console.log("City field is blank.")
    }
    if (key === "state") {
      filteredData = filteredData.filter(row => row.state === value);
    } else {
      console.log("State field is blank.")
    }
    if (key === "country") {
      filteredData = filteredData.filter(row => row.country === value);
    } else {
      console.log("Country field is blank.")
    }
    if (key === "shape") {
      filteredData = filteredData.filter(row => row.shape === value);
    } else {
      console.log("Shape field is blank.")
    }
  }
  
  // Finally, rebuild the map using the filtered data??
  buildTable(filteredData);
}

// 2. Attach an event to listen for changes to each filter
d3.select("#datetime").on("change", updateFilters);
d3.select("#city").on("change", updateFilters);
d3.select("#state").on("change", updateFilters);
d3.select("#country").on("change", updateFilters);
d3.select("#shape").on("change", updateFilters);