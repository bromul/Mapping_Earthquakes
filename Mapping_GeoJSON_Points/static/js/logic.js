// Add console.log to check to see if our code is working
console.log('working');

// Get data from cities.js
let cityData = cities;

// Load data from GeoJSON.js
let sanFranAir = sanFranAirport;

// Create a map object with a center at San Fran airport
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Grabbing our GeoJSOON data
L.geoJSON(sanFranAir).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'streets-v11'
});

// Grabbing our GeoJSON data with onEachFeature
L.geoJSON(sanFranAir, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup('<h2>Airport Code: ' + feature.properties.faa + '</h2> <hr> <h3>Airport Name: ' + feature.properties.name + '</h3>'); 
    }
}).addTo(map);

// Grabbing our GeoJSON data with pointToLayer
// L.geoJSON(sanFranAir, {
//     // We turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//             .bindPopup('<h2>' + feature.properties.name + '</h2> <hr> <h3>' + feature.properties.city + ', ' + feature.properties.country);
//     }
// }).addTo(map);

// // Coordinates for each point to be used in the line
// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];

// // Create a polyline using the line coordinates and make the line red
// L.polyline(line, {
//     color: 'yellow'
// }).addTo(map);


// Loop through the cities array and create one marker for each city
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population / 200000,
//         color: 'orange',
//         lineweight: 4
//     })
//         .bindPopup('<h2>' + city.city + ', ' + city.state + '</h2> <hr> <h3>Population: ' + city.population.toLocaleString() + '</h3>')
//         .addTo(map);
// });

// Add a circle to the map for Los Angeles, California
// L.circle([34.0522, -118.2437], {
//     radius: 300,
//     color: 'red'
// }).addTo(map);

// Add circle using circleMarker()
// L.circleMarker([34.0522, -118.2347], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1'
// }).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);