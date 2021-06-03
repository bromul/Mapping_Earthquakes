// Add console.log to check to see if our code is working
console.log('working');


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'streets-v11'
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY,
        id: 'satellite-street-v11'
});

// Create a base layer that holds both the maps
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
};

// Create the map object with center, zoom level, and default layer
let map = L.map('mapid', {
    center: [43.7, -79.3], 
    zoom: 11,
    layers: [streets]
});

// Pass our map layers into our layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing th eToronto airline routes GeoJSON URL
let torontoHoods = 'https://raw.githubusercontent.com/bromul/Mapping_Earthquakes/main/torontoNeighborhoods.json'

// Create a style for the lines
let myStyle = {
    color: 'blue',
    weight: 1,
    fillColor: 'yellow'
}

// Grabbing our GeoJSON data
d3.json(torontoHoods).then(function(data, layer) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h2>Neighborhood: ' + feature.properties.AREA_NAME + '</h2>');
        }
    }).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);