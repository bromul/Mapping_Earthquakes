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
        id: 'satellite-streets-v11'
});

// Create a base layer that holds both the maps
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
};

// Create the map object with center, zoom level, and default layer
let map = L.map('mapid', {
    center: [39.5, -98.5], 
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the earthquake GeoJSON data
// let earthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'


// Grabbing our GeoJSON data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    
    // Function returns style data. Radius is calculated via the earthquake's magnitude.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: '#000000',
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }

     // Determine the color of the earthquake marker by its magnitude
     function getColor(magnitude) {
        if (magnitude > 5) {
          return "#ea2c2c";
        }
        if (magnitude > 4) {
          return "#ea822c";
        }
        if (magnitude > 3) {
          return "#ee9c00";
        }
        if (magnitude > 2) {
          return "#eecc00";
        }
        if (magnitude > 1) {
          return "#d4ee00";
        }
        return "#98ee00";
      }

    // Determine the radius of earthquake marker by its magnitude 
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

   

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
      // Turn each feature into a circleMarker
        pointToLayer: function(feature, latlng) {
                    console.log(data);
                    return L.circleMarker(latlng);
                },
        // Set style
        style: styleInfo,
        // Create a popup for each marker -- display magnitude and location
        onEachFeature: function(feature, layer) {
          layer.bindPopup(`Magnitude: ${feature.properties.mag} <br>Location: ${feature.properties.place}`);
        }
            }).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);