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

data = d3.json("/api/wildfire/severity/5").then(function(data){
    console.log(typeof data[0]['latitude'], data[0]['longitude'].toFixed(2));

    for (var i = 0; i < data.length; i++) {
        lat = data[i]['latitude']
        lng = data[i]['longitude']
        console.log(lat, lng)
        var marker = L.marker(L.latLng(lat, lng)).addTo(map);
    }
});   


// 


// for (var i = 0; i < data.length; i++) {
//     L.marker([data[i]['latitude'], data[i].longitude])
//     .addTo(map);
// }



// Creating a GeoJSON layer with the retrieved data.
