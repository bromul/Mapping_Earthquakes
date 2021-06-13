// Add console.log to check to see if our code is working
console.log('working');


// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'light-v10'
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY,
        id: 'dark-v10'
});

// Create a base layer that holds both the maps
let baseMaps = {
    'Day Navigation': light,
    'Night Navigation': dark
};

// Create the map object with center, zoom level, and default layer
let map = L.map('mapid', {
    center: [44.0, -80.0], 
    zoom: 2,
    layers: [dark]
});

// Pass our map layers into our layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing th eToronto airline routes GeoJSON URL
let torontoData = 'https://raw.githubusercontent.com/bromul/Mapping_Earthquakes/main/torontoRoutes.json'

// Create a style for the lines
let myStyle = {
    color: '#ffffa1',
    weight: 2
}

// Grabbing our GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h2>Airline: ' + feature.properties.airline + '</h2> <hr> <h3>Destination: ' + feature.properties.dst + '</h3>');
        }
    }).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);